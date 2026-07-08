import { NextResponse } from 'next/server';
import { scoutXceedEvents } from '@/lib/xceedScout';
import { buildXceedLedger, filterNewXceedCandidates, missingLangsForXceedCandidate } from '@/lib/xceedLedger';
import { rewriteXceedEvent } from '@/lib/eventRewriter';
import type { Lang } from '@/lib/eventRewriter';
import { resolveWhatsappOnly } from '@/lib/brandSanitizer';
import { processPoster } from '@/lib/posterPipeline';
import { publishXceedEvent, sleep, PUBLISH_RATE_LIMIT_MS } from '@/lib/eventPublisher';
import { putRichContent } from '@/lib/richContentStore';
import { notifyUrl } from '@/lib/googleIndexing';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// FASE X4/B: 2 chiamate AI lunghe + poster + 2 publish (EN+IT) + poll sito per
// evento reale (~4-6 min) — cap conservativo, il backlog dei 3 venue affiliati
// si smaltisce su più notti.
const DEFAULT_MAX_PER_RUN = 3;
const SITE_BASE = process.env.APP_URL || 'https://nightlifemilan.com';

/** Polla la pagina sito finché risponde 200 (o scade il timeout) — FASE G4B/X2:
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

function sitePageUrlFor(slugEn: string, lang: Lang): string {
  return lang === 'en' ? `${SITE_BASE}/events/${slugEn}` : `${SITE_BASE}/it/events/${slugEn}`;
}

/**
 * Cron NOTTURNO (vercel.json: 0 3 * * *) — pipeline Xceed (FASE X4/B, piani
 * .claude/plans/2026-07-07-xceed-affiliate-pipeline.md e
 * .claude/plans/2026-07-08-bilingual-everywhere.md).
 *
 * Trova eventi nei 3 venue dove siamo Ambassador Xceed (dati UFFICIALI:
 * prezzi/orari/dress code/età reali, non scraping di terzi), li riscrive in
 * chiave gold-standard con claude-sonnet-5 in ENTRAMBE le lingue (corpo + 25
 * FAQ, EN e IT indipendenti), scrive il contenuto ricco su Vercel Blob (letto
 * dalla pagina sito, bilingue), pulisce/edita la locandina ufficiale UNA
 * volta (condivisa dalle due lingue), pubblica DUE eventi Eventbrite separati
 * (uno interamente EN, uno interamente IT — non un'unica description mista)
 * e notifica Google Indexing per entrambe le pagine sito dopo averle
 * verificate vive.
 *
 * Auth: Authorization: Bearer CRON_SECRET  (Vercel cron automatico)
 *    o  ?secret=INDEXING_SECRET             (trigger manuale)
 *
 * Query: ?dryRun=1 esegue tutto tranne pubblicazione/scrittura blob.
 *        ?max=N     override del cap eventi/run (default 3).
 *        ?days=N    finestra scout in giorni (default 7).
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
  const days = parseInt(searchParams.get('days') || '7', 10);

  const published: Array<{
    title: string; lang: Lang; url: string; imageSource?: string;
    sitePageUrl?: string; sitePageLive?: boolean; indexed?: boolean; blobWritten?: boolean;
  }> = [];
  const skipped: { title: string; reason: string }[] = [];
  const errors: string[] = [];

  // 1. Scout — eventi ufficiali dei 3 venue affiliati Xceed
  let scouted: Awaited<ReturnType<typeof scoutXceedEvents>> = [];
  try {
    scouted = await scoutXceedEvents(days);
  } catch (e) {
    return NextResponse.json({ ok: false, error: `Xceed scout failed: ${(e as Error).message}` }, { status: 500 });
  }

  // 2. Dedupe — marker nlm:src=xc-{xceedId}-{lang}: un candidato è "nuovo" se
  // manca ANCHE una sola delle due lingue (FASE B "eventi separati").
  let ledger;
  try {
    ledger = await buildXceedLedger();
  } catch (e) {
    return NextResponse.json({ ok: false, error: `Xceed ledger build failed: ${(e as Error).message}` }, { status: 500 });
  }
  const newCandidates = filterNewXceedCandidates(scouted, ledger).slice(0, maxPerRun);

  // 3-7. Per ogni candidato: rewrite (bilingue) → blob → poster (condiviso) →
  // publish (una o due lingue, quelle mancanti) → poll → index
  for (const candidate of newCandidates) {
    try {
      const langsToPublish = missingLangsForXceedCandidate(candidate, ledger);
      const rewritten = await rewriteXceedEvent(candidate);

      if (rewritten.needsReview) {
        skipped.push({ title: candidate.name, reason: `needsReview: ${rewritten.debugError || 'AI rewrite failed or incomplete'}` });
        continue;
      }

      // Solo il placeholder {{WHATSAPP}} va risolto qui — il resto della
      // description (contatti/link affiliate/legal/marker) è codice, non
      // testo di terzi: passarlo per sanitize() lo corromperebbe (bug reale:
      // la regex telefono matchava le date nello slug, e l'URL affiliate
      // Xceed veniva rimosso perché non riconosciuto come "nostro"). Gli
      // hook AI sono già stati sanitizzati dentro rewriteXceedEvent.
      const sanitizedDescriptionEn = resolveWhatsappOnly(rewritten.descriptionEn);
      const sanitizedDescriptionIt = resolveWhatsappOnly(rewritten.descriptionIt);

      let poster;
      try {
        poster = await processPoster(candidate.imageUrl, candidate.venueId, rewritten.imageSlug);
      } catch (e) {
        skipped.push({ title: candidate.name, reason: `needsReview: poster pipeline failed — ${(e as Error).message}` });
        continue;
      }

      // FASE X2: il corpo gold bilingue (sezioni/programma/25 FAQ EN+IT/offers
      // reali) va sul blob PRIMA del publish — entrambe le pagine sito
      // (/events/ e /it/events/) devono poterlo leggere appena il poll le raggiunge.
      let blobWritten = false;
      if (!dryRun && rewritten.slugEn) {
        const blobResult = await putRichContent(rewritten.slugEn, {
          rewritten,
          offers: candidate.offers,
          affiliateUrl: candidate.affiliateUrl,
          venueId: candidate.venueId,
          dressCode: candidate.dressCode,
          ageRange: candidate.ageRange,
          doorsOpen: candidate.doorsOpen,
          imageUrl: candidate.imageUrl,
        });
        blobWritten = blobResult.ok;
        if (!blobResult.ok) {
          console.error(`[import-xceed] Blob write failed for "${candidate.name}": ${blobResult.error}`);
        }
      }

      const results = await publishXceedEvent(candidate, rewritten, sanitizedDescriptionEn, sanitizedDescriptionIt, poster, dryRun, langsToPublish);

      for (const lang of langsToPublish) {
        const result = results[lang];
        if (!result) continue;

        if (result.ok) {
          const entry: (typeof published)[number] = {
            title: lang === 'en' ? rewritten.titleEn : rewritten.titleIt,
            lang, url: result.url || '', imageSource: result.imageSource, blobWritten,
          };

          // FASE G4B/X2: poll della pagina sito nella lingua corrispondente
          // (slug deterministico, stesso per entrambe le lingue) finché è
          // viva, poi notifica Google Indexing SOLO per un URL confermato 200.
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
          skipped.push({ title: `${candidate.name} (${lang})`, reason: `needsReview: ${result.reason}` });
        }
      }

      if (!dryRun) await sleep(PUBLISH_RATE_LIMIT_MS);
    } catch (e) {
      errors.push(`${candidate.name}: ${(e as Error).message}`);
    }
  }

  return NextResponse.json({
    ok: true,
    dryRun,
    scouted: scouted.length,
    new: newCandidates.length,
    published,
    skipped,
    errors,
    geminiKeyPresent: !!process.env.GEMINI_API_KEY,
    anthropicKeyPresent: !!process.env.ANTHROPIC_API_KEY,
    blobTokenPresent: !!process.env.BLOB_READ_WRITE_TOKEN,
    ranAt: new Date().toISOString(),
  });
}
