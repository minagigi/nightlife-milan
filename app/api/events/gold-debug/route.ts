import { NextResponse } from 'next/server';
import { fetchEventbriteEvents, getEventGoldHtml } from '@/lib/eventbriteSync';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!(process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || 'white-party-just-me-milano-friday-july-10-2026-2026-07-10';

  let total = 0, found = false, err: string | undefined;
  const slugs: string[] = [];
  try {
    const evs = await fetchEventbriteEvents(true);
    total = evs.length;
    for (const e of evs) slugs.push(e.localizedContent.slug.en);
    found = slugs.includes(slug);
  } catch (e) { err = (e as Error).message; }

  const gold = await getEventGoldHtml(slug, 'en');

  return NextResponse.json({ slug, total, found, err, goldLen: gold ? gold.length : 0, slugs });
}
