import { NextResponse } from 'next/server';
import { scoutThirdPartyEvents } from '@/lib/eventScout';
import { buildLedger, filterNewCandidates } from '@/lib/importLedger';
import { rewriteEvent } from '@/lib/eventRewriter';
import { sanitize } from '@/lib/brandSanitizer';
import { addToBlacklist } from '@/lib/promoterBlacklist';
import { processPoster } from '@/lib/posterPipeline';
import { publishEvent, sleep, PUBLISH_RATE_LIMIT_MS } from '@/lib/eventPublisher';
import { notifyUrl } from '@/lib/googleIndexing';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// FASE G5: con corpo gold-standard (2 chiamate AI lunghe + poster + poll sito)
// ogni evento costa ~3-4 min — con maxDuration 300 il cap sicuro per run è ~3.
// Il cron notturno smaltisce il backlog su più notti.
const DEFAULT_MAX_PER_RUN = 3;
const SITE_BASE = process.env.APP_URL || 'https://nightlifemilan.com';

/** Polla la pagina sito finché risponde 200 (o scade il timeout) — FASE G4B:
 * mai notificare Google Indexing per un URL ancora morto. */
async function pollSitePageUntilLive(url: string, maxMs: number, intervalMs: number): Promise<boolean> {
  const deadline = Date.now() + maxMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) return true;
    } catch {
      // riprova al prossimo giro
    }
    await sleep(intervalMs);
  }
  return false;
}

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

  const published: { title: string; url: string; imageSource?: string; sitePageUrl?: string; sitePageLive?: boolean; indexed?: boolean }[] = [];
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

      const sanitizedDescription = sanitize(rewritten.descriptionPlainEn, knownOrganizers);

      let poster;
      try {
        poster = await processPoster(candidate.posterUrl, candidate.venueId, rewritten.imageSlug);
      } catch (e) {
        skipped.push({ title: candidate.rawTitle, reason: `needsReview: poster pipeline failed — ${(e as Error).message}` });
        continue;
      }

      const result = await publishEvent(candidate, rewritten, sanitizedDescription, poster, dryRun);

      if (result.ok) {
        const entry: (typeof published)[number] = { title: rewritten.titleEn, url: result.url || '', imageSource: result.imageSource };

        // FASE G4B: backlink Eventbrite→sito — poll della pagina sito (slug
        // deterministico, generato dal rewriter) finché è viva, poi notifica
        // Google Indexing SOLO per un URL confermato 200 (mai un link morto).
        if (!dryRun && rewritten.slugEn) {
          const sitePageUrl = `${SITE_BASE}/events/${rewritten.slugEn}`;
          entry.sitePageUrl = sitePageUrl;
          entry.sitePageLive = await pollSitePageUntilLive(sitePageUrl, 6 * 60 * 1000, 30 * 1000);
          if (entry.sitePageLive && process.env.GOOGLE_INDEXING_CREDENTIALS) {
            const idx = await notifyUrl(sitePageUrl, 'URL_UPDATED');
            entry.indexed = idx.ok;
          }
        }

        published.push(entry);
      } else {
        skipped.push({ title: candidate.rawTitle, reason: `needsReview: ${result.reason}` });
      }

      if (!dryRun) await sleep(PUBLISH_RATE_LIMIT_MS);
    } catch (e) {
      errors.push(`${candidate.rawTitle}: ${(e as Error).message}`);
    }
  }

  // Nota Google Indexing: da FASE G4B lo slug è deterministico (generato dal
  // rewriter, non più dall'AI a lettura) e notificato subito sopra dopo il poll
  // 200 sulla pagina sito. Il cron /api/events/sync (08:00 UTC) resta come rete
  // di sicurezza per eventi il cui poll fosse scaduto senza successo.

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
