import { NextResponse } from 'next/server';
import { fetchEventbriteEvents, debugEventbrite } from '@/lib/eventbriteSync';
import { notifyUrls } from '@/lib/googleIndexing';
import { mockEvents } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const BASE = process.env.APP_URL || 'https://nightlifemilan.com';
const LOCALES = ['en', 'it'] as const;

/**
 * Daily cron (vercel.json: 0 8 * * *) — syncs Eventbrite events and pings
 * Google Indexing API for every indexable URL in one shot.
 *
 * Auth: Authorization: Bearer CRON_SECRET  (Vercel cron automatic)
 *    or ?secret=INDEXING_SECRET             (manual trigger)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');

  const okCron   = process.env.CRON_SECRET    && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;

  if (!okCron && !okSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Debug mode: just check Eventbrite token
  if (searchParams.get('debug') === '1') {
    const info = await debugEventbrite();
    return NextResponse.json(info);
  }

  // 1. Fetch live Eventbrite events (runs AI SEO rewrite per event)
  const ebEvents = await fetchEventbriteEvents();

  // 2. Build all indexable event URLs (Eventbrite + static + weekly)
  const rawUrls: string[] = [];

  ebEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      const slug = locale === 'it'
        ? (ev.localizedContent.slug.it || ev.localizedContent.slug.en)
        : ev.localizedContent.slug.en;
      if (slug) rawUrls.push(`${BASE}${prefix}/events/${slug}`);
    });
  });

  mockEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      const slug = locale === 'it' && ev.localizedContent.slug.it
        ? ev.localizedContent.slug.it
        : ev.localizedContent.slug.en;
      if (slug) rawUrls.push(`${BASE}${prefix}/events/${slug}`);
    });
  });

  weeklyEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      const prefix = locale === 'en' ? '' : `/${locale}`;
      rawUrls.push(`${BASE}${prefix}/events/${ev.clubSlug}-${ev.day}-${ev.eventSlug}`);
    });
  });

  const urls = Array.from(new Set(rawUrls));

  // 3. Ping Google Indexing API (only if credentials are configured)
  let indexing: { total: number; succeeded: number; failed: number } = { total: 0, succeeded: 0, failed: 0 };
  if (process.env.GOOGLE_INDEXING_CREDENTIALS) {
    const results = await notifyUrls(urls, 'URL_UPDATED');
    indexing = {
      total:     results.length,
      succeeded: results.filter((r) => r.ok).length,
      failed:    results.filter((r) => !r.ok).length,
    };
  }

  return NextResponse.json({
    ok: true,
    ebEventsFound: ebEvents.length,
    urlsBuilt: urls.length,
    indexingConfigured: !!process.env.GOOGLE_INDEXING_CREDENTIALS,
    indexing,
    updated: new Date().toISOString(),
    preview: ebEvents.slice(0, 3).map((e) => ({
      id: e.id,
      titleEn: e.localizedContent.title.en,
      titleIt: e.localizedContent.title.it,
      slugEn: e.localizedContent.slug.en,
    })),
  });
}
