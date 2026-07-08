import { NextResponse } from 'next/server';
import { scoutThirdPartyEvents } from '@/lib/eventScout';
import { buildLedger, filterNewCandidates, missingLangsForCandidate } from '@/lib/importLedger';
import { rewriteEvent } from '@/lib/eventRewriter';
import type { Lang } from '@/lib/eventRewriter';
import { resolveWhatsappOnly } from '@/lib/brandSanitizer';
import { addToBlacklist } from '@/lib/promoterBlacklist';
import { processPoster } from '@/lib/posterPipeline';
import { publishEvent, PUBLISH_RATE_LIMIT_MS } from '@/lib/eventPublisher';
import { notifyUrl } from '@/lib/googleIndexing';
import { XCEED_VENUE_IDS } from '@/lib/xceedScout';
import { sleep, pollSitePageUntilLive, sitePageUrlFor, getLastManualRunAt, isRecentManualRun } from '@/lib/importShared';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// FASE G5/B: con corpo gold-standard bilingue (2 chiamate AI + 2 publish EN+IT
// + poll sito) ogni evento costa ~4-6 min — con maxDuration 300 il cap sicuro
// per run è ~3. Il cron notturno smaltisce il backlog su più notti.
const DEFAULT_MAX_PER_RUN = 3;
// FASE L2 (piano local-pipeline-no-api): vedi import-xceed/route.ts.
const MANUAL_RUN_GRACE_HOURS = 36;

/**
 * Cron NOTTURNO (vercel.json: 0 2 * * *) — Fase 6 del piano auto-import.
 *
 * Trova eventi di terzi nei nostri venue non-Xceed (scout), scarta i
 * già-importati (ledger, per lingua), riscrive ogni candidato in chiave SEO
 * gold-standard con claude-sonnet-5 in ENTRAMBE le lingue (rewriter, incorpora
 * le regole anti-AI-tell), rimuove ogni contatto/brand di terzi (sanitizer),
 * ripulisce/edita la locandina originale o usa il fallback venue
 * (posterPipeline, condivisa dalle due lingue), pubblica DUE eventi Eventbrite
 * separati (EN + IT, FASE B "eventi separati") e notifica Google Indexing per
 * entrambe le pagine sito.
 *
 * Auth: Authorization: Bearer CRON_SECRET  (Vercel cron automatico)
 *    o  ?secret=INDEXING_SECRET             (trigger manuale)
 *
 * Query: ?dryRun=1 esegue tutto tranne la pubblicazione (ritorna il piano).
 *        ?max=N     override del cap eventi/run (default 3).
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
  const force = searchParams.get('force') === '1';
  const maxParam = parseInt(searchParams.get('max') || '', 10);
  const maxPerRun = Number.isFinite(maxParam) && maxParam > 0 ? maxParam : DEFAULT_MAX_PER_RUN;

  // FASE L2: la pipeline manuale locale (publish-prepared) copre già questa
  // finestra recente — non consumare credito API per lo stesso lavoro.
  if (!force) {
    const lastManualRunAt = await getLastManualRunAt();
    if (isRecentManualRun(lastManualRunAt, MANUAL_RUN_GRACE_HOURS)) {
      return NextResponse.json({
        ok: true,
        skippedBecause: 'manual run recent',
        lastManualRunAt,
        ranAt: new Date().toISOString(),
      });
    }
  }

  const published: Array<{
    title: string; lang: Lang; url: string; imageSource?: string;
    sitePageUrl?: string; sitePageLive?: boolean; indexed?: boolean;
  }> = [];
  const skipped: { title: string; reason: string }[] = [];
  const errors: string[] = [];

  // 1. Scout — trova eventi di terzi nei 18 venue (this-week + next-week feed pubblici)
  let scouted: Awaited<ReturnType<typeof scoutThirdPartyEvents>> = [];
  try {
    scouted = await scoutThirdPartyEvents();
  } catch (e) {
    return NextResponse.json({ ok: false, error: `Scout failed: ${(e as Error).message}` }, { status: 500 });
  }

  // 2. Dedupe — marker per-lingua: un candidato è "nuovo" se manca almeno una lingua
  let ledger;
  try {
    ledger = await buildLedger();
  } catch (e) {
    return NextResponse.json({ ok: false, error: `Ledger build failed: ${(e as Error).message}` }, { status: 500 });
  }
  // FASE X4 regola 5: i 3 venue affiliati Xceed hanno una pipeline dedicata
  // con dati ufficiali (prezzi/orari/età reali) — escluderli qui evita
  // doppioni dalla fonte peggiore (scraping di terzi vs dati del venue stesso).
  const nonXceedScouted = scouted.filter((s) => !XCEED_VENUE_IDS.includes(s.venueId));
  const newCandidates = filterNewCandidates(nonXceedScouted, ledger).slice(0, maxPerRun);

  const knownOrganizers = addToBlacklist(scouted.map((s) => s.rawOrganizer).filter(Boolean));

  // 3-6. Per ogni candidato: rewrite (bilingue) → sanitize → poster (condiviso) → publish (lingue mancanti)
  for (const candidate of newCandidates) {
    try {
      const langsToPublish = missingLangsForCandidate(candidate, ledger);
      const rewritten = await rewriteEvent(candidate, knownOrganizers);

      if (rewritten.needsReview) {
        skipped.push({ title: candidate.rawTitle, reason: `needsReview: ${rewritten.debugError || 'AI rewrite failed or incomplete'}` });
        continue;
      }

      // Solo il placeholder {{WHATSAPP}} va risolto qui — il resto della
      // description (contatti/link/legal/marker) è codice, non testo di terzi:
      // passarlo per sanitize() lo corromperebbe (bug reale, vedi brandSanitizer.ts).
      const sanitizedDescriptionEn = resolveWhatsappOnly(rewritten.descriptionEn);
      const sanitizedDescriptionIt = resolveWhatsappOnly(rewritten.descriptionIt);

      let poster;
      try {
        poster = await processPoster(candidate.posterUrl, candidate.venueId, rewritten.imageSlug);
      } catch (e) {
        skipped.push({ title: candidate.rawTitle, reason: `needsReview: poster pipeline failed — ${(e as Error).message}` });
        continue;
      }

      const results = await publishEvent(candidate, rewritten, sanitizedDescriptionEn, sanitizedDescriptionIt, poster, dryRun, langsToPublish);

      for (const lang of langsToPublish) {
        const result = results[lang];
        if (!result) continue;

        if (result.ok) {
          const entry: (typeof published)[number] = {
            title: lang === 'en' ? rewritten.titleEn : rewritten.titleIt,
            lang, url: result.url || '', imageSource: result.imageSource,
          };

          // FASE G4B: backlink Eventbrite→sito — poll della pagina sito nella
          // lingua corrispondente (slug deterministico) finché è viva, poi
          // notifica Google Indexing SOLO per un URL confermato 200.
          if (!dryRun && rewritten.slugEn) {
            const sitePageUrl = sitePageUrlFor(rewritten.slugEn, lang);
            entry.sitePageUrl = sitePageUrl;
            entry.sitePageLive = await pollSitePageUntilLive(sitePageUrl, 6 * 60 * 1000, 30 * 1000);
            if (entry.sitePageLive && process.env.GOOGLE_INDEXING_CREDENTIALS) {
              const idx = await notifyUrl(sitePageUrl, 'URL_UPDATED');
              entry.indexed = idx.ok;
            }
          }

          published.push(entry);
        } else {
          skipped.push({ title: `${candidate.rawTitle} (${lang})`, reason: `needsReview: ${result.reason}` });
        }
      }

      if (!dryRun) await sleep(PUBLISH_RATE_LIMIT_MS);
    } catch (e) {
      errors.push(`${candidate.rawTitle}: ${(e as Error).message}`);
    }
  }

  return NextResponse.json({
    ok: true,
    dryRun,
    scouted: nonXceedScouted.length,
    new: newCandidates.length,
    published,
    skipped,
    errors,
    geminiKeyPresent: !!process.env.GEMINI_API_KEY,
    anthropicKeyPresent: !!process.env.ANTHROPIC_API_KEY,
    ranAt: new Date().toISOString(),
  });
}
