// ============================================================================
// HERMES — 2XceL voice agent orchestration service
// Runs on its own Hostinger VPS (e.g. https://hermes.2xcel.net).
// This is the ONLY place vendor API keys live. The public website never sees them.
// Backend may reference vendors by name freely; nothing here is client-facing.
// ============================================================================

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { handleToolCall } from './tools.js';
import { createStrategyCallEvent } from './google-calendar.js';
import { upsertContact, tagContact } from './systeme.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Keep the raw body around for webhook signature checks if we add them later.
app.use(express.json({ limit: '1mb' }));

// Only allow the website origin to hit this service from a browser.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://2xcel.net')
  .split(',')
  .map((o) => o.trim());
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow same-origin / server-to-server (no origin) and whitelisted origins.
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Origin not allowed'));
    },
  })
);

// ---------------------------------------------------------------------------
// Health check — used by uptime monitoring and to confirm TLS/deploy is live.
// ---------------------------------------------------------------------------
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'hermes', time: new Date().toISOString() });
});

// ---------------------------------------------------------------------------
// Strategy call booking — creates Google Calendar event + Google Meet link.
// POST /api/book-meeting with { firstName, email, phone, industry, selectedDate, selectedTime, serviceInterested }
// Returns { eventId, meetLink, calendarLink, startTime }
// ---------------------------------------------------------------------------
app.post('/api/book-meeting', async (req, res) => {
  try {
    const { firstName, email, phone, industry, selectedDate, selectedTime, serviceInterested } =
      req.body;

    // Validate required fields
    if (!firstName || !email || !phone || !industry || !selectedDate || !selectedTime) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['firstName', 'email', 'phone', 'industry', 'selectedDate', 'selectedTime'],
      });
    }

    // Create the calendar event
    const booking = await createStrategyCallEvent({
      firstName,
      email,
      phone,
      industry,
      selectedDate,
      selectedTime,
      serviceInterested,
    });

    res.json({
      ok: true,
      eventId: booking.eventId,
      meetLink: booking.meetLink,
      calendarLink: booking.calendarLink,
      startTime: booking.startTime,
      message: `Strategy call scheduled for ${selectedDate} at ${selectedTime} MST. Google Meet link sent to ${email}.`,
    });
  } catch (err) {
    console.error('[hermes] booking error:', err);
    res.status(500).json({
      error: 'Failed to create booking',
      message: err.message,
    });
  }
});

// ---------------------------------------------------------------------------
// Lead capture — records the contact in systeme.io and (if SYSTEMEIO_TAG_ID
// is set) tags it so a systeme.io automation rule can start the email
// sequence. Used by both the site's lead form and the booking flow.
// POST /api/lead with { firstName, email, phone, industry, serviceInterested, googleMeetLink?, meetingTime? }
// ---------------------------------------------------------------------------
app.post('/api/lead', async (req, res) => {
  try {
    const { firstName, email, phone, industry, serviceInterested, googleMeetLink, meetingTime } =
      req.body;

    if (!firstName || !email) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['firstName', 'email'],
      });
    }

    const contact = await upsertContact({
      email,
      firstName,
      phone,
      industry,
      serviceInterested,
      googleMeetLink,
      meetingTime,
    });

    await tagContact(contact?.id);

    res.json({ ok: true, contactId: contact?.id });
  } catch (err) {
    console.error('[hermes] lead error:', err);
    res.status(500).json({
      error: 'Failed to record lead',
      message: err.message,
    });
  }
});

// ---------------------------------------------------------------------------
// Vapi tool webhook.
// The voice assistant calls "tools" mid-conversation; Vapi POSTs them here.
// We verify a shared secret (set the same value as the assistant's Server URL
// secret in the Vapi dashboard) before doing anything.
// ---------------------------------------------------------------------------
app.post('/vapi/tools', async (req, res) => {
  const expected = process.env.VAPI_WEBHOOK_SECRET;
  const provided = req.get('x-vapi-secret');
  if (expected && provided !== expected) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  try {
    const message = req.body?.message;

    // Vapi batches tool calls under message.toolCalls (or legacy functionCall).
    const toolCalls = message?.toolCalls || message?.tool_calls || [];

    if (!toolCalls.length) {
      // Not a tool-call event (status updates, end-of-call-report, etc.).
      // Acknowledge so Vapi doesn't retry.
      return res.json({ received: true });
    }

    const results = [];
    for (const call of toolCalls) {
      const name = call.function?.name || call.name;
      let args = call.function?.arguments ?? call.arguments ?? {};
      if (typeof args === 'string') {
        try { args = JSON.parse(args); } catch { args = {}; }
      }
      const result = await handleToolCall(name, args, { message });
      results.push({ toolCallId: call.id, result });
    }

    // Vapi expects { results: [{ toolCallId, result }] }
    return res.json({ results });
  } catch (err) {
    console.error('[hermes] tool webhook error:', err);
    return res.status(500).json({ error: 'tool_failed' });
  }
});

app.listen(PORT, () => {
  console.log(`[hermes] listening on :${PORT}`);
  console.log(`[hermes] allowed origins: ${allowedOrigins.join(', ')}`);
});
