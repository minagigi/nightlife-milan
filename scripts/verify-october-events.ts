import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { getConciergeBookingUrl } from '../lib/conciergeBooking';
import { getLocalizedDir35 } from '../lib/i18n/dirTokens35';
import { enabledLocaleCodes, localePrefix } from '../lib/i18n/locales';
import { getLocalizedEventSlug35 } from '../lib/i18n/localizedSlugs35';
import { getOctoberEventCopy, getOctoberEventSlug } from '../lib/october-events/copy';
import routeSlugs from '../lib/october-events/routeSlugs.json';
import { OCTOBER_EVENTS } from '../lib/octoberEvents';
import { buildOctoberEventGraph } from '../lib/octoberEventSeo';
import { sanitizePublicEventJsonLd } from '../lib/publicOutboundLinks';

const LEAK_RE = /55milano\.com|fiftyfivemilano\.com|3939204246|ciao\s+marco|55clubmilano/i;

function main(): number {
  const repoRoot = path.resolve(__dirname, '..');
  const slugSet = new Set<string>(routeSlugs);
  const errors: string[] = [];

  for (const event of OCTOBER_EVENTS) {
    const enSlug = getOctoberEventSlug(event);
    const is55Event =
      event.id.startsWith('55m-') || event.venue.id === 'v-55milano' || event.venue.id === 'v-55';

    if (!slugSet.has(enSlug)) {
      errors.push(`${event.id}: missing slug in routeSlugs.json (${enSlug})`);
    }

    const relImg = event.image.src.replace(/^\//, '');
    const absImg = path.join(repoRoot, 'public', relImg);
    if (!fs.existsSync(absImg)) {
      errors.push(`${event.id}: missing image on disk (${absImg})`);
    } else {
      const buf = fs.readFileSync(absImg);
      if (buf.byteLength < 512 || buf.byteLength > 300_000) {
        errors.push(`${event.id}: image byteLength ${buf.byteLength} out of [512..300000] (${absImg})`);
      }
      const actualSha = crypto.createHash('sha256').update(buf).digest('hex');
      if (is55Event) {
        if (typeof event.image.bytes !== 'number' || typeof event.image.sha256 !== 'string') {
          errors.push(`${event.id}: 55 Milano event image missing required bytes/sha256 fields`);
        }
      }
      if (typeof event.image.bytes === 'number' && event.image.bytes !== buf.byteLength) {
        errors.push(`${event.id}: image.bytes ${event.image.bytes} != disk ${buf.byteLength}`);
      }
      if (typeof event.image.sha256 === 'string' && event.image.sha256 !== actualSha) {
        errors.push(`${event.id}: image.sha256 mismatch`);
      }
    }

    for (const loc of enabledLocaleCodes) {
      const copy = getOctoberEventCopy(event, loc);
      if (copy.metaTitle.length > 62) {
        errors.push(`${event.id}/${loc}: metaTitle length ${copy.metaTitle.length} > 62`);
      }
      if (copy.metaDescription.length > 158) {
        errors.push(`${event.id}/${loc}: metaDescription length ${copy.metaDescription.length} > 158`);
      }
      const expectedSlug = getLocalizedEventSlug35(enSlug, loc);
      if (copy.slug !== expectedSlug) {
        errors.push(`${event.id}/${loc}: copy.slug "${copy.slug}" !== "${expectedSlug}"`);
      }
      if (event.id.startsWith('55m-') && loc === 'it') {
        const expectedIt = `festa-milano-${enSlug}`;
        if (copy.slug !== expectedIt) {
          errors.push(`${event.id}/it: expected slug "${expectedIt}", got "${copy.slug}"`);
        }
      }

      const dirTok = getLocalizedDir35('events', loc);
      const pagePath = `${localePrefix(loc)}/${dirTok}/${copy.slug}`;
      const waUrl = getConciergeBookingUrl(loc, copy.title, pagePath);
      if (!waUrl.startsWith('https://wa.me/393519127047?text=')) {
        errors.push(`${event.id}/${loc}: invalid WhatsApp base URL (${waUrl})`);
      } else {
        const parsed = new URL(waUrl);
        const decoded = parsed.searchParams.get('text') || '';
        const expectedFullUrl = `https://nightlifemilan.com${pagePath}`;
        if (!decoded.includes(expectedFullUrl)) {
          errors.push(`${event.id}/${loc}: WhatsApp URL missing page link ${expectedFullUrl}`);
        }
      }

      if (is55Event) {
        const graph = sanitizePublicEventJsonLd(buildOctoberEventGraph(event, loc, copy));
        const auditBlob = JSON.stringify({
          title: copy.title,
          metaTitle: copy.metaTitle,
          metaDescription: copy.metaDescription,
          summary: copy.summary,
          sections: copy.sections,
          faqs: copy.faqs,
          offers: event.offers,
          ...(event.id.startsWith('55m-')
            ? { provenance: event.provenance, sourceUrl: event.sourceUrl }
            : {}),
          graph,
        });
        if (LEAK_RE.test(auditBlob)) {
          errors.push(`${event.id}/${loc}: third-party or sender contact leak in copy/offers/JSON-LD`);
        }
      }
    }
  }

  if (errors.length > 0) {
    console.error(`verify-october-events FAILED (${errors.length} errors):`);
    for (const err of errors.slice(0, 30)) {
      console.error(`  - ${err}`);
    }
    return 1;
  }

  console.log(
    `OK verify-october-events: ${OCTOBER_EVENTS.length} events x ${enabledLocaleCodes.length} locales verified (0 errors).`,
  );
  return 0;
}

process.exit(main());
