// ============================================================================
// GOOGLE CALENDAR API INTEGRATION
// Creates calendar events and generates Google Meet links for strategy calls
// ============================================================================

import { google } from 'googleapis';

let calendarClient = null;

function getCalendarClient() {
  if (calendarClient) return calendarClient;

  try {
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON not set');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(serviceAccountJson),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    calendarClient = google.calendar({ version: 'v3', auth });
    return calendarClient;
  } catch (err) {
    console.error('[google-calendar] initialization error:', err);
    throw err;
  }
}

/**
 * Create a calendar event with Google Meet and return the Meet link
 * @param {Object} options - { firstName, email, phone, industry, selectedDate, selectedTime, serviceInterested }
 * @returns {Promise<{ eventId, meetLink, calendarLink }>}
 */
export async function createStrategyCallEvent(options) {
  const {
    firstName,
    email,
    phone,
    industry,
    selectedDate,
    selectedTime,
    serviceInterested,
  } = options;

  if (!email) throw new Error('Email required');
  if (!selectedDate || !selectedTime) throw new Error('Date and time required');

  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const timezone = process.env.GOOGLE_CALENDAR_TIMEZONE || 'America/Edmonton';

  // Parse the selected time (e.g., "09:00 AM", "11:00 AM")
  const [timeStr] = selectedTime.split(' ');
  const [hours, minutes] = timeStr.split(':').map(Number);
  const isPM = selectedTime.includes('PM') && hours !== 12;
  const adjustedHours = isPM ? hours + 12 : hours === 12 ? 0 : hours;

  // Parse selected date (e.g., "Wed, Jun 17")
  // Create a proper ISO date string for the event
  const now = new Date();
  const eventDate = new Date(selectedDate + ' ' + now.getFullYear());
  eventDate.setHours(adjustedHours, minutes, 0, 0);

  const startTime = eventDate.toISOString();
  const endTime = new Date(eventDate.getTime() + 60 * 60 * 1000).toISOString(); // 1 hour later

  const eventBody = {
    summary: `2XceL Strategy Call: ${serviceInterested || 'Custom Web Design'}`,
    description: `
Strategy Call with ${firstName} (${email})
Phone: ${phone}
Industry: ${industry}
Service: ${serviceInterested || 'Custom Web Design'}

This meeting includes a Google Meet video conference.
    `.trim(),
    start: {
      dateTime: startTime,
      timeZone: timezone,
    },
    end: {
      dateTime: endTime,
      timeZone: timezone,
    },
    conferenceData: {
      createRequest: {
        requestId: `meet-${Date.now()}`,
        conferenceSolution: {
          key: {
            conferenceType: 'hangoutsMeet',
          },
        },
      },
    },
    attendees: [
      {
        email,
        displayName: firstName,
        responseStatus: 'needsAction',
      },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 1440 }, // 24 hours before
        { method: 'email', minutes: 60 }, // 1 hour before
      ],
    },
  };

  try {
    const event = await calendar.events.insert({
      calendarId,
      resource: eventBody,
      conferenceDataVersion: 1,
      sendUpdates: 'all', // Send invite to attendee
    });

    const meetLink = event.data.conferenceData?.entryPoints?.find(
      (ep) => ep.entryPointType === 'video'
    )?.uri;

    console.log('[google-calendar] event created:', {
      eventId: event.data.id,
      meetLink,
      attendee: email,
    });

    return {
      eventId: event.data.id,
      meetLink,
      calendarLink: event.data.htmlLink,
      startTime: startTime,
    };
  } catch (err) {
    console.error('[google-calendar] failed to create event:', err);
    throw err;
  }
}

/**
 * Cancel a calendar event (in case user needs to reschedule)
 */
export async function cancelStrategyCallEvent(eventId) {
  if (!eventId) throw new Error('Event ID required');

  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  try {
    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: 'all',
    });

    console.log('[google-calendar] event cancelled:', eventId);
    return { ok: true };
  } catch (err) {
    console.error('[google-calendar] failed to cancel event:', err);
    throw err;
  }
}
