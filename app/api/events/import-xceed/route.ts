import { NextResponse } from 'next/server';
import { scoutXceedEvents } from '@/lib/xceedScout';
import { buildXceedLedger, filterNewXceedCandidates } from '@/lib/xceedLedger';
import { rewriteXceedEvent } from '@/lib/eventRewriter';
import { sanitize } from '@/lib/brandSanitizer';
import { processPoster } from '@/lib/posterPipeline';
import { publishXceedEvent, sleep, PUBLISH_RATE_LIMIT_MS } from '@/lib/eventPublisher';
import { putRichContent } from '@/lib/richContentStore';
import { notifyUrl } from '@/lib/googleIndexing';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

// FASE X4/G5: 2 chiamate AI lunghe + poster + poll sito per evento (~3-4 min) —
// cap conservativo, il backlog dei 3 venue affiliati si smaltisce su più notti.
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

/**
 * Cron NOTTURNO (vercel.json: 0 3 * * *) — pipeline Xceed (FASE X4, piano
 * .claude/plans/2026-07-07-xceed-affiliate-pipeline.md).
 *
 * Trova eventi nei 3 venue dove siamo Ambassador Xceed (dati UFFICIALI:
 * prezzi/orari/dress code/età reali, non scraping di terzi), li riscrive in
 * chiave gold-standard con claude-sonnet-5 (corpo + 25 FAQ), scrive il
 * contenuto ricco su Vercel Blob (letto dalla pagina sito), pulisce/edita la
 * locandina ufficiale, pubblica su Eventbrite (teaser con link affiliate in
 * testa) e notifica Google Indexing dopo aver verificato che la pagina sito
 * sia viva.
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

  const published: { title: string; url: string; imageSource?: string; sitePageUrl?: string; sitePageLive?: boolean; indexed?: boolean; blobWritten?: boolean }[] = [];
  const skipped: { title: string; reason: string }[] = [];
  const errors: string[] = [];

  // 1. Scout — eventi ufficiali dei 3 venue affiliati Xceed
  let scouted: Awaited<ReturnType<typeof scoutXceedEvents>> = [];
  try {
    scouted = await scoutXceedEvents(days);
  } catch (e) {
    return NextResponse.json({ ok: false, error: `Xceed scout failed: ${(e as Error).message}` }, { status: 500 });
  }

  // 2. Dedupe — marker nlm:src=xc-{xceedId} sugli eventi già pubblicati
  let ledger;
  try {
    ledger = await buildXceedLedger();
  } catch (e) {
    return NextResponse.json({ ok: false, error: `Xceed ledger build failed: ${(e as Error).message}` }, { status: 500 });
  }
  const newCandidates = filterNewXceedCandidates(scouted, ledger).slice(0, maxPerRun);

  // 3-7. Per ogni candidato: rewrite → sanitize → blob → poster → publish → poll → index
  for (const candidate of newCandidates) {
    try {
      const rewritten = await rewriteXceedEvent(candidate);

      if (rewritten.needsReview) {
        skipped.push({ title: candidate.name, reason: 'needsReview: AI rewrite failed or incomplete' });
        continue;
      }

      // Nessun promoter/organizer di terzi da ripulire qui (fonte ufficiale del
      // venue, non un promoter esterno) — sanitize resta comunque una seconda
      // linea di difesa deterministica sul placeholder {{WHATSAPP}}.
      const sanitizedDescription = sanitize(rewritten.descriptionPlainEn, []);

      let poster;
      try {
        poster = await processPoster(candidate.imageUrl, candidate.venueId, rewritten.imageSlug);
      } catch (e) {
        skipped.push({ title: candidate.name, reason: `needsReview: poster pipeline failed — ${(e as Error).message}` });
        continue;
      }

      // FASE X2: il corpo gold (sezioni/programma/25 FAQ/offers reali) va sul
      // blob PRIMA del publish — la pagina sito deve poterlo leggere appena
      // il poll (sotto) la raggiunge.
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

      const result = await publishXceedEvent(candidate, rewritten, sanitizedDescription, poster, dryRun);

      if (result.ok) {
        const entry: (typeof published)[number] = { title: rewritten.titleEn, url: result.url || '', imageSource: result.imageSource, blobWritten };

        // FASE G4B/X2: poll della pagina sito (slug deterministico) finché è
        // viva (ora renderizza il gold dal blob), poi notifica Google Indexing
        // SOLO per un URL confermato 200.
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
        skipped.push({ title: candidate.name, reason: `needsReview: ${result.reason}` });
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
