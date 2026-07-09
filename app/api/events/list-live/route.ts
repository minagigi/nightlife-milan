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

  const { searchParams } = new URL(request.url);
  const auth = { Authorization: `Bearer ${token}` };

  // FASE M1 (piano eventbrite-enrichment): ?fields=1 espande i campi che ci
  // interessa censire (summary/category/format/music_properties) invece del
  // solo elenco base usato per FASE P2.
  const expand = searchParams.get('fields') === '1'
    ? 'venue,logo,category,format,music_properties'
    : 'venue,logo';

  const res = await fetch(
    `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&expand=${expand}&order_by=start_asc&time_filter=current_future`,
    { headers: auth }
  );
  if (!res.ok) return NextResponse.json({ error: `Eventbrite HTTP ${res.status}` }, { status: 502 });

  const data = await res.json();
  interface RawEv {
    id: string;
    name?: { text?: string };
    summary?: string;
    start?: { local?: string };
    venue?: { name?: string };
    logo?: { url?: string; original?: { url?: string } };
    category_id?: string | null;
    subcategory_id?: string | null;
    format_id?: string | null;
    music_properties?: { age_restriction?: string | null; door_time?: string | null; presented_by?: string | null } | null;
  }
  const rawEvents = (data.events || []) as RawEv[];

  if (searchParams.get('fields') !== '1') {
    const events = rawEvents.map((ev) => ({
      id: ev.id,
      name: ev.name?.text,
      start: ev.start?.local,
      venue: ev.venue?.name,
      logoUrl: ev.logo?.original?.url || ev.logo?.url,
    }));
    return NextResponse.json({ count: events.length, events });
  }

  const events = rawEvents.map((ev) => ({
    id: ev.id,
    name: ev.name?.text,
    venue: ev.venue?.name,
    missing: {
      summary: !ev.summary,
      category_id: !ev.category_id,
      subcategory_id: !ev.subcategory_id,
      format_id: !ev.format_id,
      age_restriction: !ev.music_properties?.age_restriction,
      door_time: !ev.music_properties?.door_time,
      presented_by: !ev.music_properties?.presented_by,
    },
  }));

  // Probe one-off: /tags/ esiste davvero come endpoint pubblico? Mai testato.
  let tagsProbe: unknown = null;
  if (rawEvents[0]) {
    const tagsRes = await fetch(`${EVENTBRITE_API}/events/${rawEvents[0].id}/tags/`, { headers: auth });
    tagsProbe = { status: tagsRes.status, ok: tagsRes.ok, body: await tagsRes.text() };
  }

  // Elenco categorie reali (per scegliere gli id giusti in FASE M1/M2).
  const catRes = await fetch(`${EVENTBRITE_API}/categories/`, { headers: auth });
  const catBody = await catRes.json().catch(() => null);
  const categories = (catBody?.categories || []).map((c: { id: string; name: string; short_name?: string }) => ({ id: c.id, name: c.name }));

  const formatRes = await fetch(`${EVENTBRITE_API}/formats/`, { headers: auth });
  const formatBody = await formatRes.json().catch(() => null);
  const formats = (formatBody?.formats || []).map((f: { id: string; name: string }) => ({ id: f.id, name: f.name }));

  const subcatRes = await fetch(`${EVENTBRITE_API}/subcategories/`, { headers: auth });
  const subcatBody = await subcatRes.json().catch(() => null);
  const allSubcategories = (subcatBody?.subcategories || []) as Array<{ id: string; name: string; parent_category?: { id: string } }>;
  const musicSubcategories = allSubcategories
    .filter((s) => s.parent_category?.id === '103')
    .map((s) => ({ id: s.id, name: s.name }));

  return NextResponse.json({ count: events.length, events, tagsProbe, categories, formats, musicSubcategories });
}
