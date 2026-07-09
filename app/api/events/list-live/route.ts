import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';

/**
 * Diagnostica one-off (come spike-g0/spike-x1): elenca id/nome/data/venue/logo
 * di tutti gli eventi live, per pianificare FASE P2 (redo locandine) senza
 * dover portare EVENTBRITE_TOKEN in locale. Solo GET, nessuna scrittura.
 *
 * Auth: Authorization: Bearer CRON_SECRET
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!okCron) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const token = getEventbriteToken();
  if (!token) return NextResponse.json({ error: 'EVENTBRITE_TOKEN not set' }, { status: 500 });

  const res = await fetch(
    `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&expand=venue,logo&order_by=start_asc&time_filter=current_future`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) return NextResponse.json({ error: `Eventbrite HTTP ${res.status}` }, { status: 502 });

  const data = await res.json();
  interface RawEv {
    id: string;
    name?: { text?: string };
    start?: { local?: string };
    venue?: { name?: string };
    logo?: { url?: string; original?: { url?: string } };
  }
  const events = ((data.events || []) as RawEv[]).map((ev) => ({
    id: ev.id,
    name: ev.name?.text,
    start: ev.start?.local,
    venue: ev.venue?.name,
    logoUrl: ev.logo?.original?.url || ev.logo?.url,
  }));

  return NextResponse.json({ count: events.length, events });
}
