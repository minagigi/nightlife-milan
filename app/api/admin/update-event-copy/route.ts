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

  const basePatch: Record<string, unknown> = {};
  if (title) basePatch.name = { html: title.slice(0, 75) };
  if (summary) basePatch.summary = summary.slice(0, 140);

  if (Object.keys(basePatch).length === 0 && !descriptionHtml) {
    return NextResponse.json({ ok: false, error: 'No copy fields supplied' }, { status: 400 });
  }

  const headers = { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
  const patches: Array<{ label: string; event: Record<string, unknown> }> = [];
  // Eventbrite may regenerate summary from the description write. Apply the
  // operator-authored title/summary last so those fields remain authoritative.
  if (descriptionHtml) patches.push({ label: 'description', event: { description: { html: descriptionHtml } } });
  if (Object.keys(basePatch).length > 0) patches.push({ label: 'base', event: basePatch });

  const results: Array<{ label: string; status: number; ok: boolean }> = [];
  for (const patch of patches) {
    const res = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ event: patch.event }),
    });
    const text = await res.text();
    results.push({ label: patch.label, status: res.status, ok: res.ok });
    if (!res.ok) {
      return NextResponse.json({ ok: false, failedAt: patch.label, status: res.status, body: text.slice(0, 600), results }, { status: 502 });
    }
  }

  const verify = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const current = await verify.json().catch(() => null);

  return NextResponse.json({
    ok: true,
    eventId,
    results,
    current: {
      title: current?.name?.text,
      summary: current?.summary,
      descriptionLength: current?.description?.html?.length || 0,
    },
  });
}
