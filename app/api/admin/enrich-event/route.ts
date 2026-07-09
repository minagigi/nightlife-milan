import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';

/**
 * FASE M2 (piano eventbrite-enrichment): completa i campi Eventbrite oggi
 * vuoti su un listing già pubblicato — summary, categoria/formato,
 * music_properties (età/door time/presented_by). Nessun campo tocca
 * titolo/ticket/date/slug/marker del listing.
 *
 * Auth: Authorization: Bearer CRON_SECRET
 * Body JSON: {
 *   eventId, summary?, categoryId?, subcategoryId?, formatId?,
 *   ageRestriction?, doorTime?, presentedBy?
 * }
 */
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!okCron) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });
  const jsonHeaders = { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };

  let body: {
    eventId?: string;
    summary?: string;
    categoryId?: string;
    subcategoryId?: string;
    formatId?: string;
    ageRestriction?: string;
    doorTime?: string;
    presentedBy?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const { eventId, summary, categoryId, subcategoryId, formatId, ageRestriction, doorTime, presentedBy } = body;
  if (!eventId) return NextResponse.json({ ok: false, error: 'eventId required' }, { status: 400 });

  const results: Record<string, unknown> = {};

  // Campi base (summary/categoria/formato) — annidati su POST /events/{id}/,
  // stesso endpoint usato per date/description (confermato funzionante).
  const eventPatch: Record<string, unknown> = {};
  if (summary) eventPatch.summary = summary;
  if (categoryId) eventPatch.category_id = categoryId;
  if (subcategoryId) eventPatch.subcategory_id = subcategoryId;
  if (formatId) eventPatch.format_id = formatId;

  if (Object.keys(eventPatch).length > 0) {
    const res = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
      method: 'POST', headers: jsonHeaders,
      body: JSON.stringify({ event: eventPatch }),
    });
    results.eventPatch = { status: res.status, ok: res.ok };
  }

  // music_properties — DEVE andare dopo il patch sopra (mai prima di un
  // publish, ma qui l'evento è già live: nessun problema di ordine).
  if (ageRestriction || doorTime || presentedBy) {
    const mpPatch: Record<string, string> = {};
    if (ageRestriction) mpPatch.age_restriction = ageRestriction;
    if (doorTime) mpPatch.door_time = doorTime;
    if (presentedBy) mpPatch.presented_by = presentedBy;

    const mpRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/music_properties/`, {
      method: 'POST', headers: jsonHeaders,
      body: JSON.stringify({ music_properties: mpPatch }),
    });
    results.musicPropertiesPatch = { status: mpRes.status, ok: mpRes.ok };
  }

  const verifyRes = await fetch(
    `${EVENTBRITE_API}/events/${eventId}/?expand=music_properties,category,format`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const verifyBody = await verifyRes.json().catch(() => null);

  return NextResponse.json({
    ok: true,
    eventId,
    results,
    current: {
      summary: verifyBody?.summary,
      category_id: verifyBody?.category_id,
      subcategory_id: verifyBody?.subcategory_id,
      format_id: verifyBody?.format_id,
      music_properties: verifyBody?.music_properties,
    },
  });
}
