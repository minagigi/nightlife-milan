#!/usr/bin/env npx tsx
/**
 * Assemblaggio locale — FASE L3 (piano local-pipeline-no-api). PURA
 * trasformazione, nessuna chiamata di rete: prende il BodyResult/FaqResult
 * scritti a mano da Claude Code in sessione (stessi identici prompt di
 * BODY_SYSTEM_PROMPT/FAQ_SYSTEM_PROMPT in lib/eventRewriter.ts) e produce lo
 * STESSO OGGETTO RewrittenEvent che produrrebbe rewriteEvent()/rewriteXceedEvent()
 * lato server — stesso slug, stessa sanitizzazione hook, stesso assemblaggio
 * description, stesso marker. Mai reimplementato a mano: solo import diretto
 * delle funzioni di lib/eventRewriter.ts.
 *
 * Input (stdin o --in file.json):
 *   {
 *     "source": "xceed" | "scout",
 *     "candidate": { ... XceedEvent o ScoutedEvent, così com'è dallo scout },
 *     "body": { ...BodyResult },
 *     "faq": { "faqLong": [ ...25 voci... ] },
 *     "knownOrganizers"?: string[]   (solo source=scout)
 *   }
 *
 * Output (stdout o --out file.json): RewrittenEvent completo, pronto per
 * scripts/publish-event.ts.
 */
import { readFileSync, writeFileSync } from 'fs';
import { getVenueMeta } from '../lib/seoRewrite';
import { sanitize } from '../lib/brandSanitizer';
import {
  clamp, slugify, isBodyMissing, assembleBothDescriptions,
  type BodyResult, type FaqResult, type RewrittenEvent,
} from '../lib/eventRewriter';
import type { XceedEvent } from '../lib/xceedScout';
import type { ScoutedEvent } from '../lib/eventScout';

interface Input {
  source: 'xceed' | 'scout';
  candidate: XceedEvent | ScoutedEvent;
  body: BodyResult;
  faq: FaqResult;
  knownOrganizers?: string[];
}

function argValue(name: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  return idx !== -1 ? process.argv[idx + 1] : undefined;
}

function readInput(): Input {
  const inPath = argValue('in');
  const raw = inPath ? readFileSync(inPath, 'utf-8') : readFileSync(0, 'utf-8');
  return JSON.parse(raw) as Input;
}

function isXceed(source: string, c: XceedEvent | ScoutedEvent): c is XceedEvent {
  return source === 'xceed';
}

function main() {
  const input = readInput();
  const { source, candidate, body, faq, knownOrganizers = [] } = input;

  if (isBodyMissing(body)) {
    throw new Error('body is missing required fields (same BODY_REQUIRED check as the server) — needsReview, do not publish');
  }
  if (!faq?.faqLong || !Array.isArray(faq.faqLong) || faq.faqLong.length < 15) {
    throw new Error('faq.faqLong has fewer than 15 entries — needsReview, do not publish');
  }

  const meta = getVenueMeta(candidate.venueId);
  const dateISO = isXceed(source, candidate) ? candidate.startISO : candidate.dateISO;
  const dateSlugPart = dateISO.slice(0, 10);
  const rawName = isXceed(source, candidate) ? candidate.name : candidate.rawTitle;

  const titleEn = clamp(body.titleEn, 75);
  const slugEn = slugify(`${titleEn}-${dateSlugPart}`) || slugify(`${meta.name}-${dateSlugPart}`);

  const sanitizedBody: BodyResult = {
    ...body,
    hook: sanitize(body.hook, knownOrganizers),
    hookIt: sanitize(body.hookIt, knownOrganizers),
  };
  const faq25 = faq.faqLong.slice(0, 25);

  const ebIdBase = isXceed(source, candidate) ? `xc-${candidate.xceedId}` : candidate.ebId;
  const affiliateUrl = isXceed(source, candidate) ? candidate.affiliateUrl : undefined;

  const { descriptionEn, descriptionIt } = assembleBothDescriptions(sanitizedBody, faq25, slugEn, ebIdBase, affiliateUrl);

  const rewritten: RewrittenEvent = {
    titleEn, titleIt: clamp(body.titleIt, 75),
    summaryEn: clamp(body.summaryEn, 140), summaryIt: clamp(body.summaryIt, 140),
    hook: sanitizedBody.hook, hookIt: sanitizedBody.hookIt,
    sections: body.sections,
    programme: body.programme,
    faqLong: faq25,
    seoTags: body.seoTags.slice(0, 24), seoTagsIt: body.seoTagsIt.slice(0, 24),
    ebTags: body.ebTags.slice(0, 18),
    imageAltEn: clamp(body.imageAltEn, 125), imageAltIt: clamp(body.imageAltIt, 125),
    imageSlug: slugify(body.imageSlug || `${meta.name}-${rawName}-${dateSlugPart}`),
    slugEn,
    descriptionEn, descriptionIt,
    needsReview: false,
  };

  const output = JSON.stringify(rewritten, null, 2);
  const outPath = argValue('out');
  if (outPath) {
    writeFileSync(outPath, output);
    console.error(`[prepare-event] Written to ${outPath}`);
  } else {
    console.log(output);
  }
}

main();
