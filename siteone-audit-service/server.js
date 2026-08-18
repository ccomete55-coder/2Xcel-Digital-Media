// ============================================================================
// SITEONE AUDIT SERVICE
// HTTP wrapper around the SiteOne Crawler binary (a CLI-only tool with no
// server mode of its own). Render needs a process that binds $PORT and
// answers health checks; the raw CLI just runs once and exits, which is why
// deploying the bare repo as a Web Service crash-loops. This gives it a job
// API: POST /audit starts a crawl in the background, GET /audit/:id polls it.
// ============================================================================

import express from 'express';
import { spawn } from 'child_process';
import { randomUUID } from 'crypto';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 10000;
const BINARY = process.env.CRAWLER_BIN || '/usr/local/bin/siteone-crawler';
const API_KEY = process.env.AUDIT_SERVICE_API_KEY;
const JOBS_DIR = path.join(process.cwd(), 'tmp', 'jobs');
const JOB_TIMEOUT_MS = Number(process.env.JOB_TIMEOUT_MS || 8 * 60 * 1000);
const DEFAULT_MAX_PAGES = Number(process.env.DEFAULT_MAX_PAGES || 150);
const JOB_RETENTION_MS = 24 * 60 * 60 * 1000;

fs.mkdirSync(JOBS_DIR, { recursive: true });

app.use(express.json({ limit: '256kb' }));

/** @type {Map<string, {status:string, url:string, startedAt:string, finishedAt?:string, error?:string, dir:string}>} */
const jobs = new Map();

// ---------------------------------------------------------------------------
// Auth — every route except /health requires the shared secret. This service
// spends real compute/bandwidth per request, so it isn't left open on a
// public Render URL.
// ---------------------------------------------------------------------------
function requireApiKey(req, res, next) {
  if (!API_KEY) {
    return res.status(500).json({ error: 'AUDIT_SERVICE_API_KEY is not configured on the server' });
  }
  if (req.get('x-api-key') !== API_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'siteone-audit-service', time: new Date().toISOString() });
});

// ---------------------------------------------------------------------------
// POST /audit { url, maxPages? }
// Starts a crawl in the background. Returns immediately with a jobId to poll
// — a real audit can take minutes, far past any sane HTTP request timeout.
// ---------------------------------------------------------------------------
app.post('/audit', requireApiKey, (req, res) => {
  const { url, maxPages } = req.body || {};

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return res.status(400).json({ error: 'A valid absolute url is required, e.g. https://example.com' });
  }
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return res.status(400).json({ error: 'url must be http or https' });
  }

  const id = randomUUID();
  const dir = path.join(JOBS_DIR, id);
  fs.mkdirSync(dir, { recursive: true });

  const jsonPath = path.join(dir, 'report.json');
  const htmlPath = path.join(dir, 'report.html');

  const cappedMaxPages = Math.min(Number(maxPages) || DEFAULT_MAX_PAGES, 500);

  const args = [
    `--url=${parsed.toString()}`,
    '--output=json',
    `--output-json-file=${jsonPath}`,
    `--output-html-report=${htmlPath}`,
    `--max-visited-urls=${cappedMaxPages}`,
    '--workers=5',
    '--timeout=15',
    '--no-color',
  ];

  const job = { status: 'running', url: parsed.toString(), startedAt: new Date().toISOString(), dir };
  jobs.set(id, job);

  const child = spawn(BINARY, args, { cwd: dir });

  let stderr = '';
  child.stderr.on('data', (d) => {
    stderr += d.toString();
    if (stderr.length > 8000) stderr = stderr.slice(-8000);
  });

  const killTimer = setTimeout(() => {
    if (job.status === 'running') {
      child.kill('SIGKILL');
      job.status = 'timeout';
      job.finishedAt = new Date().toISOString();
      job.error = `Crawl exceeded ${JOB_TIMEOUT_MS}ms and was killed`;
    }
  }, JOB_TIMEOUT_MS);

  child.on('close', (code) => {
    clearTimeout(killTimer);
    if (job.status !== 'running') return; // already marked as timeout
    job.finishedAt = new Date().toISOString();
    if (code === 0 && fs.existsSync(jsonPath)) {
      job.status = 'done';
    } else {
      job.status = 'error';
      job.error = stderr || `siteone-crawler exited with code ${code}`;
    }
  });

  child.on('error', (err) => {
    clearTimeout(killTimer);
    job.status = 'error';
    job.finishedAt = new Date().toISOString();
    job.error = `Failed to start crawler: ${err.message}`;
  });

  res.status(202).json({ jobId: id, status: 'running', pollUrl: `/audit/${id}` });
});

// ---------------------------------------------------------------------------
// GET /audit/:id — poll job status. Once done, points at the JSON + HTML
// report endpoints rather than inlining the (potentially large) report body.
// ---------------------------------------------------------------------------
app.get('/audit/:id', requireApiKey, (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job) return res.status(404).json({ error: 'not found' });

  const out = {
    jobId: req.params.id,
    status: job.status,
    url: job.url,
    startedAt: job.startedAt,
    finishedAt: job.finishedAt,
  };
  if (job.status === 'error' || job.status === 'timeout') out.error = job.error;
  if (job.status === 'done') {
    out.reportJsonUrl = `/audit/${req.params.id}/report.json`;
    out.reportHtmlUrl = `/audit/${req.params.id}/report.html`;
  }
  res.json(out);
});

app.get('/audit/:id/report.json', requireApiKey, (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job || job.status !== 'done') return res.status(404).json({ error: 'report not ready' });
  res.sendFile(path.join(job.dir, 'report.json'));
});

app.get('/audit/:id/report.html', requireApiKey, (req, res) => {
  const job = jobs.get(req.params.id);
  if (!job || job.status !== 'done') return res.status(404).send('report not ready');
  res.sendFile(path.join(job.dir, 'report.html'));
});

// ---------------------------------------------------------------------------
// Best-effort cleanup of old job directories so disk doesn't grow unbounded
// on a long-lived instance.
// ---------------------------------------------------------------------------
setInterval(() => {
  const now = Date.now();
  for (const [id, job] of jobs) {
    const finishedAt = job.finishedAt ? new Date(job.finishedAt).getTime() : null;
    if (finishedAt && now - finishedAt > JOB_RETENTION_MS) {
      fs.rm(job.dir, { recursive: true, force: true }, () => {});
      jobs.delete(id);
    }
  }
}, 60 * 60 * 1000).unref();

app.listen(PORT, () => {
  console.log(`[siteone-audit-service] listening on :${PORT}`);
  console.log(`[siteone-audit-service] binary: ${BINARY}`);
});
