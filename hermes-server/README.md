# Hermes Server

The 2XceL voice-agent orchestration service. Runs on its **own Hostinger VPS**
(e.g. `https://hermes.2xcel.net`). It is the only place vendor API keys live —
the public website never holds a secret.

```
website (2xcel.net)  ──Vapi public key──▶  Vapi (voice)  ──tool webhooks──▶  hermes.2xcel.net  ──▶  Systeme.io / Taskade / Higgsfield
```

## What's here
- `src/index.js` — Express app: `/health` + `/vapi/tools` webhook (secret-checked).
- `src/tools.js` — tool handlers (`capture_lead`, `request_site_audit`, …) — stubs in Phase 0/1.
- `.env.example` — copy to `.env` on the VPS and fill in.
- `ecosystem.config.cjs` — pm2 process config.
- `deploy/nginx.hermes.conf` — reverse-proxy sample.
- `vapi-assistant.md` — the white-label assistant prompt + tool schemas for the Vapi dashboard.

## Phases
- **Phase 0 (done):** service skeleton, health check, secured tool webhook.
- **Phase 1 (done):** on-page voice widget on the website (`src/components/VoiceConcierge.tsx`).
- **Phase 2:** `capture_lead` → Systeme.io.
- **Phase 3:** `request_site_audit` → Taskade review → white-labeled email from `@2xcel.net`.
- **Phase 4:** inbound/outbound phone.
- **Phase 5:** `generate_promo_clip` → Higgsfield (verify API first).

## Deploy (one-time, on the VPS)

```sh
# 0. DNS: point an A record  hermes.2xcel.net -> <VPS_IP>  (Hostinger DNS)

# 1. Install Node 20 + pm2
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm i -g pm2

# 2. Copy this folder to the VPS, then:
cd hermes-server
npm install
cp .env.example .env      # then edit .env with the real keys

# 3. Start under pm2
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup

# 4. Nginx + TLS
sudo cp deploy/nginx.hermes.conf /etc/nginx/sites-available/hermes
sudo ln -s /etc/nginx/sites-available/hermes /etc/nginx/sites-enabled/hermes
sudo nginx -t && sudo systemctl reload nginx
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d hermes.2xcel.net   # issues + auto-renews TLS

# 5. Verify
curl https://hermes.2xcel.net/health   # -> {"status":"ok",...}
```

## Connect the website
In the Vapi dashboard, create the assistant from `vapi-assistant.md`, set its
Server URL to `https://hermes.2xcel.net/vapi/tools` with the same secret as
`VAPI_WEBHOOK_SECRET`. Then put the **public key** + **assistant id** into the
website's `.env.local`:

```
VITE_VAPI_PUBLIC_KEY="pk_..."
VITE_VAPI_ASSISTANT_ID="..."
```

The concierge button appears automatically once both are set.

## Security notes
- `.env` stays on the VPS only — never commit it.
- CORS is locked to `ALLOWED_ORIGINS`.
- The tool webhook rejects any request without the matching `x-vapi-secret`.
