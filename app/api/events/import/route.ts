import { NextResponse } from 'next/server';
import { scoutThirdPartyEvents } from '@/lib/eventScout';
import { buildLedger, filterNewCandidates } from '@/lib/importLedger';
import { rewriteEvent } from '@/lib/eventRewriter';
import { sanitize } from '@/lib/brandSanitizer';
import { addToBlacklist } from '@/lib/promoterBlacklist';
import { processPoster } from '@/lib/posterPipeline';
import { publishEvent, sleep, PUBLISH_RATE_LIMIT_MS } from '@/lib/eventPublisher';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const DEFAULT_MAX_PER_RUN = 15;

/**
 * Cron NOTTURNO (vercel.json: 0 2 * * *) — Fase 6 del piano auto-import.
 *
 * Trova eventi di terzi nei nostri 18 venue (scout), scarta i già-importati
 * (ledger), riscrive ogni candidato in chiave SEO con claude-sonnet-5 (rewriter,
 * incorpora le regole anti-AI-tell della skill humanizer), rimuove ogni
 * contatto/brand di terzi (sanitizer), ripulisce/edita la locandina originale
 * o usa il fallback venue (posterPipeline, Gemini Nano Banana 2), pubblica
 * sulla nostra org Eventbrite (publisher) e notifica Google Indexing.
 *
 * Auth: Authorization: Bearer CRON_SECRET  (Vercel cron automatico)
 *    o  ?secret=INDEXING_SECRET             (trigger manuale)
 *
 * Query: ?dryRun=1 esegue tutto tranne la pubblicazione (ritorna il piano).
 *        ?max=N     override del cap eventi/run (default 15).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');

  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  const okSecret = process.env.INDEXING_SECRET && searchParams.get('secret') === process.env.INDEXING_SECRET;

  if (!okCron && !okSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dryRun = searchParams.get('dryRun') === '1';
  const maxParam = parseInt(searchParams.get('max') || '', 10);
  const maxPerRun = Number.isFinite(maxParam) && maxParam > 0 ? maxParam : DEFAULT_MAX_PER_RUN;

  const published: { title: string; url: string; imageSource?: string }[] = [];
  const skipped: { title: string; reason: string }[] = [];
  const errors: string[] = [];

  // 1. Scout — trova eventi di terzi nei 18 venue (this-week + next-week feed pubblici)
  let scouted: Awaited<ReturnType<typeof scoutThirdPartyEvents>> = [];
  try {
    scouted = await scoutThirdPartyEvents();
  } catch (e) {
    return NextResponse.json({ ok: false, error: `Scout failed: ${(e as Error).message}` }, { status: 500 });
  }

  // 2. Dedupe — scarta eventi già pubblicati (fingerprint venue+data o marker src:ebId)
  let ledger;
  try {
    ledger = await buildLedger();
  } catch (e) {
    return NextResponse.json({ ok: false, error: `Ledger build failed: ${(e as Error).message}` }, { status: 500 });
  }
  const newCandidates = filterNewCandidates(scouted, ledger).slice(0, maxPerRun);

  const knownOrganizers = addToBlacklist(scouted.map((s) => s.rawOrganizer).filter(Boolean));

  // 3-6. Per ogni candidato: rewrite → sanitize → poster → publish
  for (const candidate of newCandidates) {
    try {
      const rewritten = await rewriteEvent(candidate);

      if (rewritten.needsReview) {
        skipped.push({ title: candidate.rawTitle, reason: 'needsReview: AI rewrite failed or incomplete' });
        continue;
      }

      const sanitizedHtmlIt = sanitize(rewritten.descriptionHtmlIt, knownOrganizers);
      const sanitizedHtmlEn = sanitize(rewritten.descriptionHtmlEn, knownOrganizers);

      let poster;
      try {
        poster = await processPoster(candidate.posterUrl, candidate.venueId, rewritten.imageSlug);
      } catch (e) {
        skipped.push({ title: candidate.rawTitle, reason: `needsReview: poster pipeline failed — ${(e as Error).message}` });
        continue;
      }

      const result = await publishEvent(candidate, rewritten, sanitizedHtmlIt, sanitizedHtmlEn, poster, dryRun);

      if (result.ok) {
        published.push({ title: rewritten.titleIt, url: result.url || '', imageSource: result.imageSource });
      } else {
        skipped.push({ title: candidate.rawTitle, reason: `needsReview: ${result.reason}` });
      }

      if (!dryRun) await sleep(PUBLISH_RATE_LIMIT_MS);
    } catch (e) {
      errors.push(`${candidate.rawTitle}: ${(e as Error).message}`);
    }
  }

  // Nota Google Indexing: gli URL del NOSTRO sito per i nuovi eventi (slug incluso)
  // sono generati solo a lettura da fetchEventbriteEvents()/rewriteEventSEO() —
  // non calcolabili qui senza duplicare quella pipeline. Il cron esistente
  // /api/events/sync (08:00 UTC, vercel.json) li troverà entro poche ore e li
  // notificherà a Google — nessuna azione aggiuntiva necessaria qui.

  return NextResponse.json({
    ok: true,
    dryRun,
    scouted: scouted.length,
    new: newCandidates.length,
    published,
    skipped,
    errors,
    googleIndexingNote: published.length > 0
      ? 'New events will be picked up and submitted to Google by the existing /api/events/sync cron (08:00 UTC)'
      : undefined,
    geminiKeyPresent: !!process.env.GEMINI_API_KEY,
    anthropicKeyPresent: !!process.env.ANTHROPIC_API_KEY,
    ranAt: new Date().toISOString(),
  });
}
