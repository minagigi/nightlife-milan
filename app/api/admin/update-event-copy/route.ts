import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';

/**
 * Protected Eventbrite copy patch.
 *
 * No AI, no translation, no generation. This endpoint only submits operator-
 * prepared copy to an existing Eventbrite event.
 */
export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!okCron) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  let body: { eventId?: string; title?: string; summary?: string; descriptionHtml?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { eventId, title, summary, descriptionHtml } = body;
  if (!eventId) return NextResponse.json({ ok: false, error: 'eventId required' }, { status: 400 });

  const eventPatch: Record<string, unknown> = {};
  if (title) eventPatch.name = { html: title.slice(0, 75) };
  if (summary) eventPatch.summary = summary.slice(0, 140);
  if (descriptionHtml) eventPatch.description = { html: descriptionHtml };

  if (Object.keys(eventPatch).length === 0) {
    return NextResponse.json({ ok: false, error: 'No copy fields supplied' }, { status: 400 });
  }

  const res = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ event: eventPatch }),
  });
  const text = await res.text();
  if (!res.ok) {
    return NextResponse.json({ ok: false, status: res.status, body: text.slice(0, 600) }, { status: 502 });
  }

  const verify = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const current = await verify.json().catch(() => null);

  return NextResponse.json({
    ok: true,
    eventId,
    current: {
      title: current?.name?.text,
      summary: current?.summary,
      descriptionLength: current?.description?.html?.length || 0,
    },
  });
}
