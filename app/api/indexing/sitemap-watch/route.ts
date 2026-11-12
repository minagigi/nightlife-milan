import { NextResponse } from 'next/server';
import {
  revalidateAllSitemapRoutes,
  submitAllProductionSitemaps,
} from '@/lib/googleIndexing';
import { pingIndexNowUrls } from '@/lib/indexNow';
import {
  buildAllSitemapEntriesAsync,
  renderSitemapXml,
} from '@/lib/sitemapBuilder';
import {
  acquireSitemapWatchLease,
  extractSitemapUrls,
  readSitemapWatchState,
  runSitemapWatchCycle,
  sitemapWatchStorageConfigured,
  writeSitemapWatchState,
} from '@/lib/sitemapWatcher';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const BASE = (process.env.APP_URL || 'https://nightlifemilan.com').replace(/\/+$/, '');
const SITEMAP_URL = `${BASE}/sitemap.xml`;

function authorized(request: Request): boolean {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');
  const cron = Boolean(process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`);
  const manual = Boolean(
    process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET,
  );
  return cron || manual;
}

async function buildFreshObservedSitemapXml(): Promise<string> {
  const entries = await buildAllSitemapEntriesAsync();
  return renderSitemapXml(entries, { compact: true });
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const force = searchParams.get('force') === '1';
  const revalidatedRoutes = revalidateAllSitemapRoutes();

  if (!process.env.GOOGLE_INDEXING_CREDENTIALS) {
    return NextResponse.json(
      { ok: false, error: 'Google Search Console credentials are not configured', revalidatedRoutes },
      { status: 503 },
    );
  }

  if (!sitemapWatchStorageConfigured()) {
    if (!force) {
      return NextResponse.json(
        { ok: false, error: 'Sitemap watcher storage is not configured', revalidatedRoutes },
        { status: 503 },
      );
    }
    try {
      const checkedAt = new Date().toISOString();
      const observedUrls = extractSitemapUrls(await buildFreshObservedSitemapXml(), BASE);
      const submission = await submitAllProductionSitemaps(BASE);
      const indexNow = await pingIndexNowUrls(observedUrls.slice(0, 500), BASE);
      return NextResponse.json({
        ok: submission.ok,
        action: submission.ok ? 'submitted-stateless-force' : 'submission-failed',
        checkedAt,
        revalidatedRoutes,
        observedUrlCount: observedUrls.length,
        sitemaps: submission.feeds,
        indexNow,
      }, { status: submission.ok ? 200 : 502 });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return NextResponse.json({ ok: false, error: message, revalidatedRoutes }, { status: 502 });
    }
  }

  try {
    const checkedAt = new Date().toISOString();
    let submittedFeeds: Awaited<ReturnType<typeof submitAllProductionSitemaps>>['feeds'] = [];
    const result = await runSitemapWatchCycle({
      acquire: acquireSitemapWatchLease,
      observe: async () => extractSitemapUrls(await buildFreshObservedSitemapXml(), BASE),
      read: async () => {
        const prev = await readSitemapWatchState();
        if (force && prev) {
          return { ...prev, submittedAt: undefined };
        }
        return prev;
      },
      save: writeSitemapWatchState,
      submit: async () => {
        const batch = await submitAllProductionSitemaps(BASE);
        submittedFeeds = batch.feeds;
        return {
          ok: batch.ok,
          status: batch.status,
          ...(batch.error ? { error: batch.error } : {}),
        };
      },
      sitemapUrl: SITEMAP_URL,
      now: () => checkedAt,
    });

    const urlsForIndexNow = result.addedUrls.length > 0
      ? result.addedUrls
      : (force ? [BASE, `${BASE}/it`, `${BASE}/clubs`, `${BASE}/it/discoteche`] : []);
    const indexNow = urlsForIndexNow.length > 0
      ? await pingIndexNowUrls(urlsForIndexNow, BASE)
      : { ok: true, submittedCount: 0, batches: 0, statuses: [] };

    return NextResponse.json({
      ...result,
      checkedAt,
      revalidatedRoutes,
      sitemaps: submittedFeeds,
      indexNow,
      addedUrls: result.addedUrls.slice(0, 50),
      removedUrls: result.removedUrls.slice(0, 50),
      addedUrlCount: result.addedUrls.length,
      removedUrlCount: result.removedUrls.length,
    }, { status: result.ok ? 200 : 502 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[sitemap-watch]', message);
    return NextResponse.json({ ok: false, error: message, revalidatedRoutes }, { status: 502 });
  }
}
