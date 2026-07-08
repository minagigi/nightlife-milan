import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';

/**
 * FASE F4 (piano fix-i18n-posters-redo-justme) — cancella un evento Eventbrite
 * legacy (architettura pre-pivot, prima dei "due eventi separati") prima di
 * ripubblicarlo da zero con la pipeline corrente. `POST /events/{id}/cancel/`
 * è l'unica azione supportata sugli eventi live/passati (niente DELETE per
 * eventi con registrazioni — Eventbrite lo rifiuta con 403).
 *
 * Auth: Authorization: Bearer CRON_SECRET
 * Uso: ?eventId=<id eventbrite>
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');
  const ok = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const eventId = searchParams.get('eventId');
  if (!eventId) return NextResponse.json({ ok: false, error: 'eventId query param required' }, { status: 400 });

  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ ok: false, error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  try {
    const cancelRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/cancel/`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const cancelBody = await cancelRes.text();
    return NextResponse.json({
      ok: cancelRes.ok,
      status: cancelRes.status,
      body: cancelBody.slice(0, 500),
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
