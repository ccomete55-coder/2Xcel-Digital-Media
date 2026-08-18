# SiteOne Audit Service

An HTTP job API wrapping the [SiteOne Crawler](https://github.com/janreges/siteone-crawler) binary, deployed on Render.

## Why this exists

SiteOne Crawler is a CLI tool with no server mode — it runs a crawl and exits.
Render's Web Service type requires a process that binds `$PORT` and answers
health checks. Deploying the bare crawler repo directly crash-loops: the
container starts, the CLI prints `--help` (or runs once) and exits, Render
never sees a healthy port, and it restarts forever. This service fixes that
by wrapping the binary in a small Express job API.

## API

All routes except `/health` require an `x-api-key` header matching
`AUDIT_SERVICE_API_KEY`.

- `GET /health` — liveness check, no auth.
- `POST /audit` — body `{ "url": "https://client-site.com", "maxPages"?: 150 }`.
  Starts a crawl in the background. Returns `202 { jobId, status: "running", pollUrl }`
  immediately — a real crawl can take minutes, well past any normal HTTP
  timeout, so this is async by design.
- `GET /audit/:id` — poll status: `{ status: "running" | "done" | "error" | "timeout", ... }`.
  Once `done`, includes `reportJsonUrl` and `reportHtmlUrl`.
- `GET /audit/:id/report.json` — the crawler's structured JSON report (quality
  scores, findings by severity, per-page results — see
  [docs/JSON-OUTPUT.md](https://github.com/janreges/siteone-crawler/blob/main/docs/JSON-OUTPUT.md)
  upstream). This is what the audit routine should read to verify findings and
  draft recommendations.
- `GET /audit/:id/report.html` — the human-readable interactive report, useful
  if you want to link a client to the raw audit.

## Deploying to Render

1. Push this repo (or this subdirectory) to GitHub.
2. In Render: New → Web Service → connect the repo. If it lives inside the
   `2Xcel-Digital-Media` monorepo, set **Root Directory** to
   `siteone-audit-service`.
3. Runtime: **Docker** (it will pick up the `Dockerfile` automatically).
4. Set the environment variable `AUDIT_SERVICE_API_KEY` to a long random
   value (`openssl rand -hex 32`) — whatever calls this service (the audit
   routine) needs the same value.
5. Health check path: `/health`.
6. Plan: the free tier spins the instance down after ~15 minutes idle and
   takes ~30-60s to wake back up on the next request (you'll see Render's
   "waking up" loading page — that's normal cold start, not a crash, as long
   as it resolves). For a live lead-magnet in the request path of a sales
   call, consider the Starter plan to avoid that delay.

## Example

```bash
curl -X POST https://siteone-audit-service.onrender.com/audit \
  -H "x-api-key: $AUDIT_SERVICE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
# -> {"jobId":"...", "status":"running", "pollUrl":"/audit/..."}

curl https://siteone-audit-service.onrender.com/audit/<jobId> \
  -H "x-api-key: $AUDIT_SERVICE_API_KEY"
# -> poll until "status":"done", then fetch reportJsonUrl
```

## Local dev

```bash
npm install
# You'll also need the siteone-crawler binary on your PATH, or set
# CRAWLER_BIN to point at it (see Dockerfile for how the release binary
# is fetched).
cp .env.example .env   # fill in AUDIT_SERVICE_API_KEY
npm run dev
```
