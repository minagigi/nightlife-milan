import { NextResponse } from 'next/server';
import { notifyUrl, notifyUrls } from '@/lib/googleIndexing';
import { mockEvents } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';

export const dynamic = 'force-dynamic';

const BASE = process.env.APP_URL || 'https://nightlifemilan.com';
const LOCALES = ['en', 'it'] as const;

/** All indexable event URLs (one-off + weekly), both locales. */
function allEventUrls(): string[] {
  const urls: string[] = [];

  mockEvents.forEach((event) => {
    LOCALES.forEach((locale) => {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      const slug =
        locale === 'it' && event.localizedContent.slug.it
          ? event.localizedContent.slug.it
          : event.localizedContent.slug.en;
      urls.push(`${BASE}${prefix}/events/${slug}`);
    });
  });

  weeklyEvents.forEach((event) => {
    LOCALES.forEach((locale) => {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      const slug = `${event.clubSlug}-${event.day}-${event.eventSlug}`;
      urls.push(`${BASE}${prefix}/events/${slug}`);
    });
  });

  return Array.from(new Set(urls));
}

/**
 * Google Indexing API trigger.
 *
 *   GET /api/indexing?secret=XXX                 → notify every event URL
 *   GET /api/indexing?secret=XXX&url=https://... → notify one URL
 *   GET /api/indexing?secret=XXX&url=...&type=URL_DELETED → notify removal
 *
 * Auth: ?secret= must match INDEXING_SECRET, OR Authorization: Bearer <CRON_SECRET>.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const authHeader = request.headers.get('authorization');

  const okSecret = process.env.INDEXING_SECRET && secret === process.env.INDEXING_SECRET;
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!okSecret && !okCron) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const type = searchParams.get('type') === 'URL_DELETED' ? 'URL_DELETED' : 'URL_UPDATED';
  const single = searchParams.get('url');

  try {
    if (single) {
      const result = await notifyUrl(single, type);
      return NextResponse.json({ ok: result.ok, result });
    }

    const urls = allEventUrls();
    const results = await notifyUrls(urls, type);
    const succeeded = results.filter((r) => r.ok).length;
    return NextResponse.json({
      ok: succeeded > 0,
      total: results.length,
      succeeded,
      failed: results.length - succeeded,
      results: results.filter((r) => !r.ok).slice(0, 10), // surface first failures only
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
