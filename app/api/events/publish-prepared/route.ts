import { NextResponse } from 'next/server';
import type { RewrittenEvent, Lang } from '@/lib/eventRewriter';
import type { ScoutedEvent } from '@/lib/eventScout';
import type { XceedEvent } from '@/lib/xceedScout';
import type { PosterResult, PosterSource } from '@/lib/posterPipeline';
import { resolveWhatsappOnly } from '@/lib/brandSanitizer';
import { publishEvent, publishXceedEvent } from '@/lib/eventPublisher';
import { putRichContent } from '@/lib/richContentStore';
import { notifyUrl } from '@/lib/googleIndexing';
import { buildLedger, missingLangsForCandidate } from '@/lib/importLedger';
import { buildXceedLedger, missingLangsForXceedCandidate } from '@/lib/xceedLedger';
import { pollSitePageUntilLive, sitePageUrlFor, setLastManualRunAt } from '@/lib/importShared';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

/**
 * Route manuale — FASE L1 (piano .claude/plans/2026-07-08-local-pipeline-no-api.md).
 *
 * Riceve contenuto GIÀ pronto (riscritto in locale da Claude Code in sessione,
 * coperto dall'abbonamento Max, zero costo API) e fa SOLO la meccanica che
 * richiede i secret: blob, upload immagine, publish EN+IT su Eventbrite, poll
 * sito, Google Indexing. Riusa esattamente le stesse funzioni dei cron
 * (`publishEvent`/`publishXceedEvent`), stesso dedupe per-lingua, stesso
 * formato di risposta — l'unica differenza è la fonte del `rewritten`
 * (locale invece che una chiamata server-side ad Anthropic).
 *
 * Auth: Authorization: Bearer CRON_SECRET (stesso secret delle route cron —
 * noto in locale via .env.local, mai gli altri secret).
 */

interface PublishPreparedBody {
  source: 'xceed' | 'scout';
  candidate: XceedEvent | ScoutedEvent;
  rewritten: RewrittenEvent;
  posterBase64: string;
  posterContentType: string;
  posterFilename: string;
  posterSource: PosterSource;
  langsToPublish?: Lang[];
}

function isXceedCandidate(source: string, c: XceedEvent | ScoutedEvent): c is XceedEvent {
  return source === 'xceed';
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization');
  const okCron = process.env.CRON_SECRET && authHeader === `Bearer ${process.env.CRON_SECRET}`;
  if (!okCron) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: PublishPreparedBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const { source, candidate, rewritten, posterBase64, posterContentType, posterFilename, posterSource } = body;

  if (!source || !candidate || !rewritten) {
    return NextResponse.json({ ok: false, error: 'Missing source/candidate/rewritten' }, { status: 400 });
  }
  if (rewritten.needsReview) {
    return NextResponse.json({ ok: false, error: 'rewritten.needsReview is true — refusing to publish (same rule as the cron pipelines)' }, { status: 400 });
  }
  if (!rewritten.descriptionEn || !rewritten.descriptionIt || !rewritten.slugEn) {
    return NextResponse.json({ ok: false, error: 'rewritten is missing descriptionEn/descriptionIt/slugEn' }, { status: 400 });
  }
  if (!posterBase64 || !posterContentType) {
    return NextResponse.json({ ok: false, error: 'Missing posterBase64/posterContentType' }, { status: 400 });
  }

  const poster: PosterResult = {
    buffer: Buffer.from(posterBase64, 'base64'),
    contentType: posterContentType,
    filename: posterFilename || `${rewritten.imageSlug}.jpg`,
    source: posterSource || 'poster-clean',
  };

  const dryRun = false;
  const published: Array<{
    title: string; lang: Lang; url: string; imageSource?: string;
    sitePageUrl?: string; sitePageLive?: boolean; indexed?: boolean; blobWritten?: boolean;
  }> = [];
  const skipped: { title: string; reason: string }[] = [];

  try {
    // 1. Dedupe server-side autorevole — mai fidarsi ciecamente di
    // langsToPublish passato dal client, ricalcolarlo dal ledger reale.
    let langsToPublish: Lang[];
    if (isXceedCandidate(source, candidate)) {
      const ledger = await buildXceedLedger();
      langsToPublish = missingLangsForXceedCandidate(candidate, ledger);
    } else {
      const ledger = await buildLedger();
      langsToPublish = missingLangsForCandidate(candidate, ledger);
    }
    if (body.langsToPublish?.length) {
      langsToPublish = langsToPublish.filter((l) => body.langsToPublish!.includes(l));
    }
    if (langsToPublish.length === 0) {
      return NextResponse.json({ ok: true, published: [], skipped: [{ title: rewritten.titleEn, reason: 'both languages already published (ledger)' }] });
    }

    // 2. Solo {{WHATSAPP}} va risolto qui — vedi lib/brandSanitizer.ts.
    const sanitizedDescriptionEn = resolveWhatsappOnly(rewritten.descriptionEn);
    const sanitizedDescriptionIt = resolveWhatsappOnly(rewritten.descriptionIt);

    // 3. Blob (solo sorgente Xceed — il contenuto gold della pagina sito).
    let blobWritten = false;
    if (isXceedCandidate(source, candidate)) {
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
        console.error(`[publish-prepared] Blob write failed for "${candidate.name}": ${blobResult.error}`);
      }
    }

    // 4. Publish EN+IT (o solo le lingue mancanti).
    const results = isXceedCandidate(source, candidate)
      ? await publishXceedEvent(candidate, rewritten, sanitizedDescriptionEn, sanitizedDescriptionIt, poster, dryRun, langsToPublish)
      : await publishEvent(candidate, rewritten, sanitizedDescriptionEn, sanitizedDescriptionIt, poster, dryRun, langsToPublish);

    const candidateTitle = isXceedCandidate(source, candidate) ? candidate.name : candidate.rawTitle;

    for (const lang of langsToPublish) {
      const result = results[lang];
      if (!result) continue;

      if (result.ok) {
        const entry: (typeof published)[number] = {
          title: lang === 'en' ? rewritten.titleEn : rewritten.titleIt,
          lang, url: result.url || '', imageSource: result.imageSource, blobWritten,
        };

        const sitePageUrl = sitePageUrlFor(rewritten.slugEn, lang);
        entry.sitePageUrl = sitePageUrl;
        entry.sitePageLive = await pollSitePageUntilLive(sitePageUrl, 6 * 60 * 1000, 30 * 1000);
        if (entry.sitePageLive && process.env.GOOGLE_INDEXING_CREDENTIALS) {
          const idx = await notifyUrl(sitePageUrl, 'URL_UPDATED');
          entry.indexed = idx.ok;
        }

        published.push(entry);
      } else {
        skipped.push({ title: `${candidateTitle} (${lang})`, reason: `needsReview: ${result.reason}` });
      }
    }

    if (published.length > 0) {
      await setLastManualRunAt(new Date().toISOString());
    }

    return NextResponse.json({ ok: true, published, skipped, ranAt: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 500 });
  }
}
