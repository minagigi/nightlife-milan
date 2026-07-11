import { NextResponse } from 'next/server';
import { getEventbriteToken } from '@/lib/eventbriteToken';
import { fetchEventbriteEvents } from '@/lib/eventbriteSync';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const EB = 'https://www.eventbriteapi.com/v3';
const ORG = '2988002072164';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!(process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = getEventbriteToken();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || 'white-party-just-me-milano-friday-july-10-2026-2026-07-10';

  // 1) stati grezzi degli eventi org (conteggio per status, cerca white-party)
  const byStatus: Record<string, number> = {};
  let found: { name?: string; status?: string; start?: string } | null = null;
  let url: string | null = `${EB}/organizations/${ORG}/events/?status=all&page_size=200&order_by=start_asc`;
  let pages = 0;
  while (url && pages < 6) {
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) { byStatus['_fetchError'] = r.status; break; }
    const d = await r.json();
    for (const ev of (d.events || []) as { name?: { text?: string }; status?: string; start?: { local?: string }; description?: { html?: string } }[]) {
      byStatus[ev.status || '?'] = (byStatus[ev.status || '?'] || 0) + 1;
      if (ev.description?.html?.includes(`slug-en=${slug}`) && !found) {
        found = { name: ev.name?.text, status: ev.status, start: ev.start?.local };
      }
    }
    url = d.pagination?.has_more_items && d.pagination?.continuation
      ? `${EB}/organizations/${ORG}/events/?status=all&page_size=200&order_by=start_asc&continuation=${d.pagination.continuation}`
      : null;
    pages++;
  }

  // 2) fetchEventbriteEvents(true) trova lo slug?
  let mappedFound = false, mappedTotal = 0, mappedErr: string | undefined;
  try {
    const evs = await fetchEventbriteEvents(true);
    mappedTotal = evs.length;
    mappedFound = evs.some((e) => e.localizedContent.slug.en === slug);
  } catch (e) { mappedErr = (e as Error).message; }

  return NextResponse.json({ slug, byStatus, foundInOrg: found, mappedTotal, mappedFound, mappedErr });
}
