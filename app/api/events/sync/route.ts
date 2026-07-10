import { NextResponse } from 'next/server';
import { fetchEventbriteEvents, debugEventbrite } from '@/lib/eventbriteSync';
import { notifyUrls, submitSitemap } from '@/lib/googleIndexing';
import { mockEvents } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';
import { indexedLocaleCodes, localePrefix } from '@/lib/i18n/locales';
import { getLocalizedText } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const BASE = process.env.APP_URL || 'https://nightlifemilan.com';
// Lingue attive dal registry unico (lib/i18n/locales.ts).
const LOCALES: readonly string[] = indexedLocaleCodes;

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
      const slug = getLocalizedText(ev.localizedContent.slug, locale);
      if (slug) rawUrls.push(`${BASE}${localePrefix(locale)}/events/${slug}`);
    });
  });

  mockEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      const slug = getLocalizedText(ev.localizedContent.slug, locale);
      if (slug) rawUrls.push(`${BASE}${localePrefix(locale)}/events/${slug}`);
    });
  });

  weeklyEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      rawUrls.push(`${BASE}${localePrefix(locale)}/events/${ev.clubSlug}-${ev.day}-${ev.eventSlug}`);
    });
  });

  const urls = Array.from(new Set(rawUrls));

  // 3. Ping Google Indexing API + submit sitemap (only if credentials are configured)
  let indexing: { total: number; succeeded: number; failed: number } = { total: 0, succeeded: 0, failed: 0 };
  let sitemap: { ok: boolean; status: number; error?: string } = { ok: false, status: 0 };

  if (process.env.GOOGLE_INDEXING_CREDENTIALS) {
    const [indexResults, sitemapResult] = await Promise.all([
      notifyUrls(urls, 'URL_UPDATED'),
      submitSitemap(`${BASE}/`, `${BASE}/sitemap.xml`),
    ]);
    indexing = {
      total:     indexResults.length,
      succeeded: indexResults.filter((r) => r.ok).length,
      failed:    indexResults.filter((r) => !r.ok).length,
    };
    sitemap = sitemapResult;
  }

  return NextResponse.json({
    ok: true,
    ebEventsFound: ebEvents.length,
    urlsBuilt: urls.length,
    indexingConfigured: !!process.env.GOOGLE_INDEXING_CREDENTIALS,
    indexing,
    sitemap,
    updated: new Date().toISOString(),
    preview: ebEvents.slice(0, 3).map((e) => ({
      id: e.id,
      titleEn: e.localizedContent.title.en,
      titleIt: e.localizedContent.title.it,
      slugEn: e.localizedContent.slug.en,
    })),
  });
}
