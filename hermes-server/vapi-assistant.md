# Lumen — Vapi Assistant Configuration

Paste this into the Vapi dashboard when creating the assistant. The website only
needs the resulting **public key** + **assistant id** (put them in the site's
`.env.local` as `VITE_VAPI_PUBLIC_KEY` / `VITE_VAPI_ASSISTANT_ID`).

> **Lumen** is the client-facing voice persona. The underlying model/setup is
> internal ("Hermes") and is never named to a prospect.

## Server URL (tools)
- **Server URL:** `https://hermes.2xcel.net/vapi/tools`
- **Secret:** set a strong value; put the SAME value in the VPS `.env` as `VAPI_WEBHOOK_SECRET`.

## First message (paste into the assistant's "First Message")

```
Hi there, I’m Lumen—thanks for dropping by. And just to put it out there right away, I’m actually an AI voice agent running live on the site here. I know that sounds a bit wild, but I’m here to show you exactly how we take the heavy lifting out of your web, video, and marketing workflows. What kind of business are you running, and what's the biggest bottleneck slowing your team down right now?
```

## System prompt (paste as-is)

**Canonical source:** [`lumen-system-prompt.md`](./lumen-system-prompt.md) — paste its full contents into the Vapi assistant's **System Prompt** field. Edit that file (not this one) to change Lumen's behavior, so the two never drift.

> Note: the `INFRASTRUCTURE` line in that file is internal context only. Lumen is
> instructed never to speak any vendor/tool name to a prospect (Core Rule + Jargon
> Translation Guide). Keep the `request_site_audit` tool in mind — it's not in the
> canonical prompt's tool list yet; add it to the prompt if you want Lumen to email
> a live site review (Phase 3).

## Tools (function schemas)

```json
[
  {
    "type": "function",
    "function": {
      "name": "capture_lead",
      "description": "Save a prospective client's contact details for follow-up.",
      "parameters": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
          "email": { "type": "string" },
          "phone": { "type": "string" },
          "interest": { "type": "string", "description": "Which service they're most interested in" }
        },
        "required": ["email"]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "request_site_audit",
      "description": "Run a free website review and email the report to the prospect.",
      "parameters": {
        "type": "object",
        "properties": {
          "email": { "type": "string" },
          "website": { "type": "string", "description": "The prospect's website URL" }
        },
        "required": ["email", "website"]
      }
    }
  }
]
```

> The model/voice selection happens here in the Vapi dashboard. "Hermes" is the
> client-facing name; the underlying model stays internal and is never spoken.
