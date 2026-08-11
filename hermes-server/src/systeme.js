// ============================================================================
// SYSTEME.IO CONTACTS API INTEGRATION
// Creates/updates a contact and (optionally) applies a tag so a systeme.io
// automation rule ("when tag added, enroll in campaign X") can pick it up
// and start the email sequence.
// ============================================================================

const API_BASE = 'https://api.systeme.io/api';

function apiKey() {
  const key = process.env.SYSTEMEIO_API_KEY;
  if (!key) throw new Error('SYSTEMEIO_API_KEY not set');
  return key;
}

async function systemeFetch(path, options = {}) {
  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey(),
      ...(options.headers || {}),
    },
  });
}

export async function findContactByEmail(email) {
  const res = await systemeFetch(`/contacts?email=${encodeURIComponent(email)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data?.items?.[0] || null;
}

/**
 * Create a contact in systeme.io. Custom fields (phone, industry, etc.) are
 * sent best-effort — if those custom fields haven't been created in the
 * systeme.io account yet, systeme.io rejects the whole payload, so we retry
 * with just the fields guaranteed to exist rather than losing the lead.
 */
export async function upsertContact({
  email,
  firstName,
  phone,
  industry,
  serviceInterested,
  googleMeetLink,
  meetingTime,
}) {
  if (!email) throw new Error('Email required');

  const fields = [];
  if (firstName) fields.push({ slug: 'first_name', value: firstName });
  if (phone) fields.push({ slug: 'phone_number', value: phone });
  if (industry) fields.push({ slug: 'industry', value: industry });
  if (serviceInterested) fields.push({ slug: 'service_interested', value: serviceInterested });
  if (googleMeetLink) fields.push({ slug: 'google_meet_link', value: googleMeetLink });
  if (meetingTime) fields.push({ slug: 'meeting_time', value: meetingTime });

  const attempt = (payloadFields) =>
    systemeFetch('/contacts', {
      method: 'POST',
      body: JSON.stringify({ email, fields: payloadFields }),
    });

  let res = await attempt(fields);

  if (res.status === 409) {
    // Contact already exists — look it up so the caller can still tag it.
    const existing = await findContactByEmail(email);
    if (existing) return existing;
  }

  if (res.status === 422) {
    // Most likely one of the custom field slugs doesn't exist in this
    // systeme.io account yet. Retry with only the built-in field so the
    // lead is still recorded, then log so it can be fixed in the dashboard.
    console.error('[systeme] contact create rejected fields, retrying with first_name only:', await res.text().catch(() => ''));
    res = await attempt(firstName ? [{ slug: 'first_name', value: firstName }] : []);

    if (res.status === 409) {
      const existing = await findContactByEmail(email);
      if (existing) return existing;
    }
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`systeme.io contact create failed (${res.status}): ${body}`);
  }

  return res.json();
}

export async function tagContact(contactId) {
  const tagId = process.env.SYSTEMEIO_TAG_ID;
  if (!tagId || !contactId) return;

  const res = await systemeFetch(`/contacts/${contactId}/tags`, {
    method: 'POST',
    body: JSON.stringify({ tagId: Number(tagId) }),
  });

  if (!res.ok) {
    console.error(`[systeme] failed to tag contact ${contactId}:`, res.status, await res.text().catch(() => ''));
  }
}
