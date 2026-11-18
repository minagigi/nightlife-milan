import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getAllCalendarEvents } from '../lib/calendarEvents';
import { getPaymentTerms35 } from '../lib/capodanno/paymentTerms35';
import { mockVenues } from '../lib/data';
import { enabledLocaleCodes } from '../lib/i18n/localeRegistry';
import {
  getLocalizedEventSlug35,
  resolveEventSlugToCanonical,
  resolveLegacyOrExpiredEventRedirect,
} from '../lib/i18n/localizedSlugs35';
import {
  getPartenopeaJustMeContent,
  PARTENOPEA_JUSTME_AFFILIATE_URL,
  PARTENOPEA_JUSTME_FLOW_ASSET_KEYS,
  PARTENOPEA_JUSTME_LEGACY_RAW_SLUG,
  PARTENOPEA_JUSTME_MENU_CARD_SRC,
  PARTENOPEA_JUSTME_POSTER_SRC,
  PARTENOPEA_JUSTME_SHUTTLE_MAP_URL,
  PARTENOPEA_JUSTME_SLUGS_35,
  PARTENOPEA_JUSTME_SOURCE_URL,
  PARTENOPEA_JUSTME_TABLES_CARD_SRC,
  PARTENOPEA_JUSTME_XCEED_ID,
  PARTENOPEA_JUSTME_XCEED_RAW_SLUG,
  partenopeaJustMePath,
  partenopeaJustMeSlug,
  resolvePartenopeaJustMeSlug,
} from '../lib/partenopea/justme35';
import { SINGLE_PASS_SKUS, validateAgeForSkus } from '../lib/single-pass/catalog';
import { buildEventsSitemapEntries } from '../lib/sitemapBuilder';
import { resolveVenueEventsForCarousel } from '../lib/venueDossiers35';

const REPO_ROOT = path.resolve(__dirname, '..');

function collectTextForContent(loc: string): string {
  const c = getPartenopeaJustMeContent(loc);
  const terms = getPaymentTerms35(loc);
  const chunks: string[] = [
    c.h1,
    c.subtitle,
    c.description,
    c.overviewHeading,
    ...c.overviewParagraphs,
    c.timelineHeading,
    c.timelineSubheading,
    ...c.timelineSteps.flatMap((s) => [s.time, s.title, s.detail]),
    c.dinnerHeading,
    c.dinnerSubheading,
    ...c.culinaryHighlights.flatMap((h) => [h.badge, h.title, h.detail]),
    c.restaurantConciergeNote,
    c.tiersHeading,
    c.tiersSubheading,
    ...c.tiers.flatMap((t) => [t.title, t.price, t.badge, t.summary, ...t.bullets]),
    c.vipConciergeNote,
    c.dressShuttleHeading,
    ...c.dressCodeOkItems,
    ...c.dressCodeNoItems,
    c.shuttleHighlightTitle,
    c.shuttleHighlightDesc,
    c.logisticsHeading,
    ...c.logisticsParagraphs,
    ...c.logisticsFacts.flatMap((f) => [f.label, f.value]),
    c.venueBannerEyebrow,
    c.venueBannerTitle,
    c.venueBannerDesc,
    c.thanksgivingBannerEyebrow,
    c.thanksgivingBannerTitle,
    c.thanksgivingBannerDesc,
    c.dec31BannerEyebrow,
    c.dec31BannerTitle,
    c.dec31BannerDesc,
    c.orthodoxBannerEyebrow,
    c.orthodoxBannerTitle,
    c.orthodoxBannerDesc,
    c.mapHeading,
    c.faqHeading,
    ...c.faqs.flatMap((f) => [f.q, f.a]),
    terms.heading,
    terms.subtitle,
    terms.methodsBadge,
    ...terms.steps,
    terms.note,
  ];
  return chunks.join(' ');
}

function segmenterWordCount(text: string, loc: string): number {
  const Segmenter = (
    Intl as unknown as {
      Segmenter?: new (
        locale: string,
        opts: { granularity: 'word' },
      ) => { segment: (input: string) => Iterable<{ isWordLike?: boolean }> };
    }
  ).Segmenter;
  if (!Segmenter) return text.split(/\s+/).filter(Boolean).length;
  const seg = new Segmenter(loc, { granularity: 'word' });
  let count = 0;
  for (const part of seg.segment(text)) {
    if (part.isWordLike) count += 1;
  }
  return count;
}

test('Cena Spettacolo Partenopea @ JustMe Milano (Nov 27, 2026) 35-locale routing, copy, e-commerce, calendar & assets', async () => {
  assert.equal(Object.keys(PARTENOPEA_JUSTME_SLUGS_35).length, 35);
  const slugs = enabledLocaleCodes.map((loc) => partenopeaJustMeSlug(loc));
  assert.equal(new Set(slugs).size, 35, 'Expected 35 unique canonical slugs');

  const paths = enabledLocaleCodes.map((loc) => partenopeaJustMePath(loc));
  assert.equal(new Set(paths).size, 35, 'Expected 35 unique localized paths');

  // Disambiguation: Pineta Club Milano Nov 27 must NEVER resolve to JustMe Partenopea
  assert.equal(
    resolvePartenopeaJustMeSlug('friday-night-pineta-milano-2026-11-27'),
    false,
    'Pineta Club Via Messina Nov 27 slug must NOT resolve to JustMe Partenopea',
  );

  for (const loc of enabledLocaleCodes) {
    const canonSlug = partenopeaJustMeSlug(loc);
    assert.equal(resolvePartenopeaJustMeSlug(canonSlug), true, `Unresolved slug for ${loc}`);
    assert.equal(resolveEventSlugToCanonical(canonSlug, loc), canonSlug);
    assert.equal(resolveEventSlugToCanonical(PARTENOPEA_JUSTME_XCEED_RAW_SLUG, loc), canonSlug);
    assert.equal(resolveEventSlugToCanonical(PARTENOPEA_JUSTME_LEGACY_RAW_SLUG, loc), canonSlug);
    assert.equal(getLocalizedEventSlug35(PARTENOPEA_JUSTME_SLUGS_35.en, loc), canonSlug);
    assert.equal(resolveLegacyOrExpiredEventRedirect(canonSlug, loc), null);
  }

  assert.equal(PARTENOPEA_JUSTME_SHUTTLE_MAP_URL, 'https://maps.app.goo.gl/dPGebEjXXzg9Lyhi9');

  const banned = ['stripe', 'magister mida', 'wyoming', 'luigi minaudo', 'cavalli', '\u2014'];
  for (const loc of enabledLocaleCodes) {
    const c = getPartenopeaJustMeContent(loc);
    assert.ok(c.metaTitle.length <= 65, `${loc} metaTitle exceeded 65 chars: ${c.metaTitle.length}`);
    assert.ok(
      c.metaDescription.length <= 158,
      `${loc} metaDescription exceeded 158 chars: ${c.metaDescription.length}`,
    );
    assert.ok(c.metaDescription.includes('+39 351 912 7047'), `${loc} missing WhatsApp phone in metaDescription`);
    assert.equal(c.tiers.length, 8, `${loc} expected 8 offer tiers (70 EUR Menu + 7 Xceed)`);
    assert.ok(c.tocItems.length >= 7, `${loc} expected >= 7 TOC items`);
    assert.equal(c.faqs.length, 12, `${loc} expected 12 FAQs`);

    const fullText = collectTextForContent(loc);
    const wsWords = fullText.split(/\s+/).filter(Boolean).length;
    const segWords = segmenterWordCount(fullText, loc);
    assert.ok(wsWords >= 1650, `${loc} whitespace words too low: ${wsWords}`);
    assert.ok(segWords >= 1700, `${loc} segmenter words too low: ${segWords}`);

    const low = fullText.toLowerCase();
    for (const term of banned) {
      assert.equal(low.includes(term), false, `${loc} contains banned token ${JSON.stringify(term)}`);
    }
  }

  const sitemapUrls = new Set(buildEventsSitemapEntries().map((entry) => entry.url));
  for (const loc of enabledLocaleCodes) {
    const full = `https://nightlifemilan.com${partenopeaJustMePath(loc)}`;
    assert.ok(sitemapUrls.has(full), `Missing sitemap URL for ${loc}: ${full}`);
  }
  assert.equal(
    sitemapUrls.has(`https://nightlifemilan.com/events/${PARTENOPEA_JUSTME_XCEED_RAW_SLUG}`),
    false,
    'Raw Xceed slug must not appear alongside canonical 35-locale URLs in sitemap',
  );
  assert.equal(
    sitemapUrls.has(`https://nightlifemilan.com/events/${PARTENOPEA_JUSTME_LEGACY_RAW_SLUG}`),
    false,
    'Legacy raw slug must not appear in sitemap',
  );

  const invRaw = fs.readFileSync(path.join(REPO_ROOT, 'lib/october-events/inventory.json'), 'utf8');
  const inv = JSON.parse(invRaw) as {
    events: Array<{
      id: string;
      officialName: string;
      sourceUrl: string;
      affiliateUrl: string;
      performers: Array<{ name: string }>;
      offers: Array<{ price: number | null; url: string }>;
    }>;
  };
  const ev = inv.events.find((item) => item.id === PARTENOPEA_JUSTME_XCEED_ID);
  assert.ok(ev, 'Missing event 249217 in inventory.json');
  assert.equal(ev.officialName, 'Cena Spettacolo Partenopea');
  assert.equal(ev.sourceUrl, PARTENOPEA_JUSTME_SOURCE_URL);
  assert.equal(ev.affiliateUrl, PARTENOPEA_JUSTME_AFFILIATE_URL);
  assert.equal(ev.offers.length, 7);
  assert.equal(ev.performers.length, 4);
  for (const o of ev.offers) {
    assert.equal(o.url, PARTENOPEA_JUSTME_AFFILIATE_URL);
  }
  const offerPrices = new Set(ev.offers.map((o) => o.price));
  for (const p of [15, 20, 320, 640, 1280, 3200, 5000]) {
    assert.ok(offerPrices.has(p), `Missing price €${p} in inventory 249217`);
  }

  const cspSkus = SINGLE_PASS_SKUS.filter((s) => s.venueId === 'justme-partenopea');
  assert.equal(cspSkus.length, 6, 'Expected 6 confirmed native checkout SKUs for justme-partenopea');
  const skuPrices = new Set(cspSkus.map((s) => s.basePriceCents));
  for (const cents of [7000, 1500, 2000, 32000, 64000, 128000]) {
    assert.ok(skuPrices.has(cents), `Missing native SKU price ${cents} cents`);
  }
  for (const sku of cspSkus) {
    assert.equal(Boolean(sku.requiresDietary), false, `SKU ${sku.id} must NOT require Terra/Mare option`);
    assert.equal(sku.eventDateLabel, '2026-11-27');
  }

  const under18 = validateAgeForSkus(cspSkus, 17);
  assert.equal(under18.ok, false);
  if (!under18.ok) assert.equal(under18.errorCode, 'UNDER_18');
  const under21 = validateAgeForSkus(cspSkus, 19);
  assert.equal(under21.ok, false);
  if (!under21.ok) {
    assert.equal(under21.errorCode, 'UNDER_21_JUSTME');
  }
  assert.equal(validateAgeForSkus(cspSkus, 21).ok, true);

  const calendarItems = await getAllCalendarEvents();
  const weeklyFriNov27 = calendarItems.find(
    ({ event }) => event.id === 'weekly-justme-friday-2026-11-27',
  );
  assert.equal(weeklyFriNov27, undefined, 'Weekly Friday must be suppressed on 2026-11-27');
  const staleFlowerPower = calendarItems.find(
    ({ event }) => event.id === 'e-justme-flower-power-0612',
  );
  assert.equal(staleFlowerPower, undefined, 'Stale mock e-justme-flower-power-0612 must be suppressed');
  const cspCalItem = calendarItems.find(({ event }) => event.id === 'partenopea-justme-2026');
  assert.ok(cspCalItem, 'Canonical partenopea-justme-2026 calendar item missing');

  const justMeVenue = mockVenues.find((v) => v.id === 'v-justme');
  assert.ok(justMeVenue, 'Missing v-justme in mockVenues');
  const dossier = resolveVenueEventsForCarousel(justMeVenue, 'it');
  const idxTg = dossier.future.findIndex((c) => c.id === 'thanksgiving-justme-2026');
  const idxCsp = dossier.future.findIndex((c) => c.id === 'partenopea-justme-2026');
  assert.ok(idxCsp >= 0, 'Missing partenopea-justme-2026 in JustMe dossier future events');
  if (idxTg >= 0) {
    assert.ok(idxTg < idxCsp, 'Expected 2026-11-26 Thanksgiving before 2026-11-27 Partenopea chronologically');
  }

  const assetPaths = [
    PARTENOPEA_JUSTME_POSTER_SRC,
    PARTENOPEA_JUSTME_MENU_CARD_SRC,
    PARTENOPEA_JUSTME_TABLES_CARD_SRC,
    ...PARTENOPEA_JUSTME_FLOW_ASSET_KEYS.map((k) => `/images/seo-events/master/${k}.webp`),
  ];
  for (const rel of assetPaths) {
    const abs = path.join(REPO_ROOT, 'public', rel.replace(/^\/+/, ''));
    assert.ok(fs.existsSync(abs), `Missing public image asset: ${rel}`);
    const size = fs.statSync(abs).size;
    assert.ok(size >= 20_000 && size <= 300 * 1024, `Asset size out of range for ${rel}: ${size}`);
  }
});
