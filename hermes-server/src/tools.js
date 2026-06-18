// ============================================================================
// HERMES TOOL HANDLERS
// Each function here is a "tool" the voice assistant can call mid-conversation.
// Backend-only: real vendor names are fine here. The assistant's spoken replies
// and any client-facing output must stay white-labeled (see vapi-assistant.md).
//
// Phase 0/1: structure + stubs. Real integrations land in later phases:
//   - capture_lead   -> Systeme.io  (Phase 2)
//   - request_site_audit -> Taskade review agent + email  (Phase 3)
//   - generate_promo_clip -> Higgsfield  (Phase 5)
// ============================================================================

/**
 * Route a named tool call to its handler.
 * @returns a JSON-serializable result the assistant can speak back from.
 */
export async function handleToolCall(name, args, ctx) {
  console.log(`[hermes] tool: ${name}`, args);
  const handler = TOOLS[name];
  if (!handler) {
    return { ok: false, message: `Unknown tool: ${name}` };
  }
  try {
    return await handler(args, ctx);
  } catch (err) {
    console.error(`[hermes] tool ${name} failed:`, err);
    return { ok: false, message: 'That step failed on our end — we will follow up by email.' };
  }
}

const TOOLS = {
  // --- Phase 2: push a captured lead into the CRM (Systeme.io) -------------
  async capture_lead(args) {
    const { name, email, phone, interest } = args || {};
    if (!email) return { ok: false, message: 'An email is required to save the lead.' };

    // TODO(Phase 2): POST to Systeme.io contacts API using SYSTEMEIO_API_KEY.
    // const r = await fetch('https://api.systeme.io/api/contacts', { ... });
    console.log('[hermes] (stub) capture_lead ->', { name, email, phone, interest });

    return { ok: true, message: `Saved ${email}. A specialist will follow up.` };
  },

  // --- Phase 3: kick off a website review and email it to the prospect ----
  async request_site_audit(args) {
    const { email, website } = args || {};
    if (!email || !website) {
      return { ok: false, message: 'Need both a website and an email to send the audit.' };
    }

    // TODO(Phase 3): trigger the Taskade review agent, then email the report
    // from an @2xcel.net sender (NO vendor branding in the email).
    console.log('[hermes] (stub) request_site_audit ->', { email, website });

    return {
      ok: true,
      message: `Your site review for ${website} is running — it will land in ${email} shortly.`,
    };
  },

  // --- Phase 5: generate a short promo clip (Higgsfield) -------------------
  async generate_promo_clip(args) {
    // TODO(Phase 5): verify Higgsfield API availability before relying on this.
    console.log('[hermes] (stub) generate_promo_clip ->', args);
    return { ok: true, message: 'A sample clip is being produced and will be emailed over.' };
  },
};

export { TOOLS };
