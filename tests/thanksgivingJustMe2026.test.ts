import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getAllCalendarEvents } from '../lib/calendarEvents';
import { getPaymentTerms35 } from '../lib/capodanno/paymentTerms35';
import { enabledLocaleCodes } from '../lib/i18n/localeRegistry';
import {
  getLocalizedEventSlug35,
  resolveEventSlugToCanonical,
  resolveLegacyOrExpiredEventRedirect,
} from '../lib/i18n/localizedSlugs35';
import { SINGLE_PASS_SKUS } from '../lib/single-pass/catalog';
import { buildEventsSitemapEntries } from '../lib/sitemapBuilder';
import {
  getThanksgivingJustMeContent,
  THANKSGIVING_JUSTME_AFFILIATE_URL,
  THANKSGIVING_JUSTME_BUFFET_CARD_SRC,
  THANKSGIVING_JUSTME_FLOW_ASSET_KEYS,
  THANKSGIVING_JUSTME_LEGACY_RAW_SLUG,
  THANKSGIVING_JUSTME_POSTER_SRC,
  THANKSGIVING_JUSTME_SHUTTLE_MAP_URL,
  THANKSGIVING_JUSTME_SLUGS_35,
  THANKSGIVING_JUSTME_TABLES_CARD_SRC,
  THANKSGIVING_JUSTME_XCEED_ID,
  THANKSGIVING_JUSTME_XCEED_RAW_SLUG,
  thanksgivingJustMePath,
  thanksgivingJustMeSlug,
  resolveThanksgivingJustMeSlug,
} from '../lib/thanksgiving/justme35';

const REPO_ROOT = path.resolve(__dirname, '..');

function collectTextForContent(loc: string): string {
  const c = getThanksgivingJustMeContent(loc);
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
    c.buffetHeading,
    c.buffetSubheading,
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

test('Thanksgiving 2026 & Vida Loca @ JustMe Milano has 35 unique slugs, legacy resolution, and zero Dec-03 interference', () => {
  assert.equal(Object.keys(THANKSGIVING_JUSTME_SLUGS_35).length, 35);
  const slugs = enabledLocaleCodes.map((loc) => thanksgivingJustMeSlug(loc));
  assert.equal(new Set(slugs).size, 35, 'Expected 35 unique canonical slugs');

  const paths = enabledLocaleCodes.map((loc) => thanksgivingJustMePath(loc));
  assert.equal(new Set(paths).size, 35, 'Expected 35 unique localized paths');

  for (const loc of enabledLocaleCodes) {
    const canonSlug = thanksgivingJustMeSlug(loc);

    assert.equal(resolveThanksgivingJustMeSlug(canonSlug), true, `Unresolved slug for ${loc}`);
    assert.equal(resolveEventSlugToCanonical(canonSlug, loc), canonSlug);
    assert.equal(resolveEventSlugToCanonical(THANKSGIVING_JUSTME_XCEED_RAW_SLUG, loc), canonSlug);
    assert.equal(resolveEventSlugToCanonical(THANKSGIVING_JUSTME_LEGACY_RAW_SLUG, loc), canonSlug);
    assert.equal(getLocalizedEventSlug35(THANKSGIVING_JUSTME_SLUGS_35.en, loc), canonSlug);
    assert.equal(
      resolveLegacyOrExpiredEventRedirect(canonSlug, loc),
      null,
      `Canonical slug must not redirect for ${loc}`,
    );
  }

  assert.equal(resolveThanksgivingJustMeSlug('249216'), true);
  assert.equal(resolveThanksgivingJustMeSlug('giovedi-sera-justme-milano-2026-11-26'), true);
  assert.equal(resolveThanksgivingJustMeSlug('thursday-night-justme-milano-2026-12-03'), false);
  assert.equal(resolveThanksgivingJustMeSlug('justme-thursday-viziatissima'), false);
});

test('Thanksgiving 2026 @ JustMe Milano meets SEO metadata, 7 offers, >=1650 words, and zero forbidden strings across all 35 locales', () => {
  const forbiddenRe = /Stripe|Magister|Wyoming|Cheyenne|FBRA|Luigi\s+Minaudo|447\s+Broadway|Cavalli|cv2\.inpaint|\u2014/i;

  for (const loc of enabledLocaleCodes) {
    const c = getThanksgivingJustMeContent(loc);

    assert.ok(
      c.metaTitle.length >= 25 && c.metaTitle.length <= 62,
      `metaTitle out of [25..62] in ${loc} (${c.metaTitle.length}): ${c.metaTitle}`,
    );
    assert.ok(
      c.metaDescription.length >= 100 && c.metaDescription.length <= 158,
      `metaDescription out of [100..158] in ${loc} (${c.metaDescription.length}): ${c.metaDescription}`,
    );
    assert.match(
      c.metaDescription,
      /\+39 351 912 7047/,
      `metaDescription must include +39 351 912 7047 in ${loc}`,
    );

    assert.equal(c.tiers.length, 7, `Expected all 7 verified tiers in ${loc}`);
    assert.ok(c.tocItems.length >= 7, `Expected >=7 TOC anchors in ${loc}`);
    assert.ok(c.faqs.length >= 12, `Expected >=12 FAQs in ${loc}`);

    const allText = collectTextForContent(loc);
    assert.doesNotMatch(allText, forbiddenRe, `Forbidden term or em-dash detected in ${loc}`);

    for (const token of [
      /15\s*€|€\s*15|\b15\b/,
      /320/,
      /640/,
      /1\.280|1,280|1280/,
      /3\.200|3,200|3200/,
      /5\.000|5,000|5000/,
      /19:30/,
      /22:30/,
      /05:00/,
      /21\+/,
      /Old Turkey/i,
      /Vida Loca/i,
    ]) {
      assert.match(allText, token, `Missing required fact ${token} in ${loc}`);
    }

    const wsWords = allText.split(/\s+/).filter(Boolean).length;
    const segWords = segmenterWordCount(allText, loc);
    assert.ok(wsWords >= 1650, `Whitespace word count too low in ${loc}: ${wsWords} < 1650`);
    assert.ok(segWords >= 1700, `Segmenter word count too low in ${loc}: ${segWords} < 1700`);

    if (loc !== 'en') {
      const englishFallbackRe =
        /frequently asked questions|page index|overview & night schedule|event overview|all 7 official|getting to justme|not permitted/i;
      const headingsToCheck = [
        c.h1,
        c.tocTitle,
        c.overviewHeading,
        c.buffetHeading,
        c.tiersHeading,
        c.dressShuttleHeading,
        c.logisticsHeading,
        c.mapHeading,
        c.faqHeading,
        ...c.tocItems.map((item) => item.label),
      ];
      for (const heading of headingsToCheck) {
        assert.doesNotMatch(
          heading,
          englishFallbackRe,
          `English fallback H2/TOC detected in ${loc}: ${heading}`,
        );
      }
    }
  }
});

test('Thanksgiving 2026 @ JustMe Milano is wired in sitemap, inventory 249216, native e-commerce, weekly pause, and 7 <=300KB WebP assets', async () => {
  assert.equal(
    THANKSGIVING_JUSTME_AFFILIATE_URL,
    `https://xceed.me/en/milano/event/vida-loca-13/${THANKSGIVING_JUSTME_XCEED_ID}/channel/nightlifemilan-1`,
  );
  assert.match(THANKSGIVING_JUSTME_SHUTTLE_MAP_URL, /maps\.app\.goo\.gl\/dPGebEjXXzg9Lyhi9/);

  const sitemapUrls = new Set(buildEventsSitemapEntries().map((entry) => entry.url));
  for (const loc of enabledLocaleCodes) {
    const full = `https://nightlifemilan.com${thanksgivingJustMePath(loc)}`;
    assert.ok(sitemapUrls.has(full), `Missing sitemap URL for ${loc}: ${full}`);
  }
  assert.equal(
    sitemapUrls.has(`https://nightlifemilan.com/events/${THANKSGIVING_JUSTME_XCEED_RAW_SLUG}`),
    false,
    'Raw Xceed slug must not appear alongside canonical 35-locale URLs in sitemap',
  );
  assert.equal(
    sitemapUrls.has(`https://nightlifemilan.com/events/${THANKSGIVING_JUSTME_LEGACY_RAW_SLUG}`),
    false,
    'Legacy raw slug must not appear in sitemap',
  );

  const invRaw = fs.readFileSync(path.join(REPO_ROOT, 'lib/october-events/inventory.json'), 'utf8');
  const inv = JSON.parse(invRaw) as {
    events: Array<{ id: string; sourceUrl: string; affiliateUrl: string; offers: Array<{ price: number | null; url: string }> }>;
  };
  const ev = inv.events.find((item) => item.id === THANKSGIVING_JUSTME_XCEED_ID);
  assert.ok(ev, 'Missing event 249216 in inventory.json');
  assert.equal(ev.sourceUrl, 'https://xceed.me/en/milano/event/vida-loca-13/249216');
  assert.equal(ev.affiliateUrl, THANKSGIVING_JUSTME_AFFILIATE_URL);
  assert.equal(ev.offers.length, 7);
  for (const o of ev.offers) {
    assert.equal(o.url, THANKSGIVING_JUSTME_AFFILIATE_URL);
  }
  const offerPrices = new Set(ev.offers.map((o) => o.price));
  for (const p of [15, 320, 640, 1280, 3200, 5000]) {
    assert.ok(offerPrices.has(p), `Missing price €${p} in inventory 249216`);
  }

  const tgSkus = SINGLE_PASS_SKUS.filter((s) => s.venueId === 'justme-thanksgiving');
  assert.equal(tgSkus.length, 5, 'Expected 5 confirmed native checkout SKUs for justme-thanksgiving');
  for (const sku of tgSkus) {
    assert.equal(Boolean(sku.requiresDietary), false, `SKU ${sku.id} must NOT require Terra/Mare dietary option`);
    assert.equal(sku.eventDateLabel, '2026-11-26');
  }

  const calendarItems = await getAllCalendarEvents();
  const weeklyVizNov26 = calendarItems.find(
    ({ event }) =>
      event.venueId === 'v-justme' &&
      event.dateISO.startsWith('2026-11-26') &&
      event.id.startsWith('weekly-justme-thursday'),
  );
  assert.equal(weeklyVizNov26, undefined, 'Weekly Viziatissima must remain paused on 2026-11-26');

  const assetPaths = [
    THANKSGIVING_JUSTME_POSTER_SRC,
    THANKSGIVING_JUSTME_BUFFET_CARD_SRC,
    THANKSGIVING_JUSTME_TABLES_CARD_SRC,
    ...THANKSGIVING_JUSTME_FLOW_ASSET_KEYS.map((k) => `/images/seo-events/master/${k}.webp`),
  ];
  for (const rel of assetPaths) {
    const abs = path.join(REPO_ROOT, 'public', rel.replace(/^\/+/, ''));
    assert.ok(fs.existsSync(abs), `Missing public image asset: ${rel}`);
    const size = fs.statSync(abs).size;
    assert.ok(size >= 20_000 && size <= 300 * 1024, `Asset size out of range for ${rel}: ${size}`);
  }
});
