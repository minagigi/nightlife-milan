import { NextResponse } from 'next/server';
import { fetchEventbriteEvents, debugEventbrite } from '@/lib/eventbriteSync';
import {
  notifyUrls,
  revalidateAllSitemapRoutes,
  submitAllProductionSitemaps,
} from '@/lib/googleIndexing';
import { pingIndexNowUrls } from '@/lib/indexNow';
import { mockEvents } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { indexedLocaleCodes, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedEventSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getLocalizedText } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const BASE = (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, '');
const LOCALES: readonly LocaleCode[] = indexedLocaleCodes;
const MAX_GOOGLE_NOTIFY_URLS_PER_SYNC = 40;

/**
 * The 08:00 UTC cron refreshes Eventbrite data, purges ISR caches for all 6
 * sitemaps, and pings IndexNow. With ?sitemapOnly=1 it also resubmits all 6
 * production sitemaps to Google Search Console.
 *
 * Auth: Authorization: Bearer CRON_SECRET  (Vercel cron automatic)
 *    or ?secret=INDEXING_SECRET            (manual trigger)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');

  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;

  if (!okCron && !okSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const revalidatedRoutes = revalidateAllSitemapRoutes();

  if (searchParams.get('sitemapOnly') === '1') {
    const indexingConfigured = Boolean(process.env.GOOGLE_INDEXING_CREDENTIALS);
    const sitemapBatch = indexingConfigured
      ? await submitAllProductionSitemaps(BASE)
      : { ok: false, status: 0, error: 'Google credentials are not configured', feeds: [] };

    if (!sitemapBatch.ok) {
      console.error('[events/sync] sitemap submission failed', {
        status: sitemapBatch.status,
        error: sitemapBatch.error,
      });
    }

    return NextResponse.json({
      ok: sitemapBatch.ok,
      sitemapOnly: true,
      indexingConfigured,
      revalidatedRoutes,
      sitemap: {
        ok: sitemapBatch.ok,
        status: sitemapBatch.status,
        ...(sitemapBatch.error ? { error: sitemapBatch.error } : {}),
      },
      sitemaps: sitemapBatch.feeds,
      updated: new Date().toISOString(),
    }, { status: sitemapBatch.ok ? 200 : 503 });
  }

  if (searchParams.get('debug') === '1') {
    const info = await debugEventbrite();
    return NextResponse.json(info);
  }

  const ebEvents = await fetchEventbriteEvents();
  const rawUrls: string[] = [];
  const priorityNotifyCandidates: string[] = [];

  ebEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      const rawSlug = getLocalizedText(ev.localizedContent.slug, locale);
      if (!rawSlug) return;
      const slug = getLocalizedEventSlug35(rawSlug, locale);
      const url = `${BASE}${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${slug}`;
      rawUrls.push(url);
      if (locale === 'it' || locale === 'en') {
        priorityNotifyCandidates.push(url);
      }
    });
  });

  mockEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      const rawSlug = getLocalizedText(ev.localizedContent.slug, locale);
      if (!rawSlug) return;
      const slug = getLocalizedEventSlug35(rawSlug, locale);
      rawUrls.push(`${BASE}${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${slug}`);
    });
  });

  weeklyEvents.forEach((ev) => {
    LOCALES.forEach((locale) => {
      const rawSlug = `${ev.clubSlug}-${ev.day}-${ev.eventSlug}`;
      const slug = getLocalizedEventSlug35(rawSlug, locale);
      rawUrls.push(`${BASE}${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${slug}`);
    });
  });

  const urls = Array.from(new Set(rawUrls));
  const cappedNotifySlice = Array.from(new Set([...priorityNotifyCandidates, ...urls])).slice(
    0,
    MAX_GOOGLE_NOTIFY_URLS_PER_SYNC,
  );

  let indexing: { total: number; succeeded: number; failed: number } = { total: 0, succeeded: 0, failed: 0 };

  if (process.env.GOOGLE_INDEXING_CREDENTIALS && cappedNotifySlice.length > 0) {
    const indexResults = await notifyUrls(cappedNotifySlice, 'URL_UPDATED');
    indexing = {
      total: indexResults.length,
      succeeded: indexResults.filter((r) => r.ok).length,
      failed: indexResults.filter((r) => !r.ok).length,
    };
  }

  const indexNow = await pingIndexNowUrls(cappedNotifySlice, BASE);

  return NextResponse.json({
    ok: true,
    ebEventsFound: ebEvents.length,
    revalidatedRoutes,
    indexing,
    indexNow,
    updated: new Date().toISOString(),
    preview: ebEvents.slice(0, 3).map((e) => ({
      id: e.id,
      titleEn: e.localizedContent.title.en,
      titleIt: e.localizedContent.title.it,
      slugEn: e.localizedContent.slug.en,
    })),
  });
}
