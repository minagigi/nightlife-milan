import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getCapodannoEventBySlug } from '../lib/capodannoEvents';
import { getCapodannoLocalizedEventContent } from '../lib/capodanno/i18n';
import { getPaymentTerms35 } from '../lib/capodanno/paymentTerms35';
import { enabledLocaleCodes } from '../lib/i18n/localeRegistry';
import {
  getLocalizedEventSlug35,
  resolveEventSlugToCanonical,
  resolveLegacyOrExpiredEventRedirect,
} from '../lib/i18n/localizedSlugs35';
import {
  getOrthodoxNyeJustMeContent,
  ORTHODOX_NYE_JUSTME_AFFILIATE_URL,
  ORTHODOX_NYE_JUSTME_FLOW_ASSET_KEYS,
  ORTHODOX_NYE_JUSTME_GOLD_MENU_SRC,
  ORTHODOX_NYE_JUSTME_POSTER_SRC,
  ORTHODOX_NYE_JUSTME_SILVER_MENU_SRC,
  ORTHODOX_NYE_JUSTME_SLUGS_35,
  ORTHODOX_NYE_JUSTME_XCEED_ID,
  ORTHODOX_NYE_JUSTME_XCEED_RAW_SLUG,
  orthodoxNyeJustMePath,
  orthodoxNyeJustMeSlug,
  resolveOrthodoxNyeJustMeSlug,
} from '../lib/orthodox-nye/justme35';
import { buildEventsSitemapEntries } from '../lib/sitemapBuilder';

const REPO_ROOT = path.resolve(__dirname, '..');

function collectTextForContent(loc: string): string {
  const c = getOrthodoxNyeJustMeContent(loc);
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
    c.menusHeading,
    c.menusSubheading,
    c.silverMenuTitle,
    c.silverMenuPrice,
    c.silverBeverages,
    ...c.silverCourses.flatMap((course) => [course.course, course.dish, course.details]),
    c.goldMenuTitle,
    c.goldMenuPrice,
    c.goldBeverages,
    ...c.goldCourses.flatMap((course) => [course.course, course.dish, course.details]),
    c.ticketsHeading,
    c.ticketsSubheading,
    ...c.tiers.flatMap((t) => [t.title, t.price, t.badge, t.summary, ...t.bullets]),
    c.vipConciergeNote,
    c.contestHeading,
    c.contestSubheading,
    ...c.contestParagraphs,
    c.contestPrizeBadge,
    c.contestPrizeTitle,
    c.contestPrizeDetails,
    c.dressCodeOkTitle,
    ...c.dressCodeOkItems,
    c.dressCodeNoTitle,
    ...c.dressCodeNoItems,
    c.logisticsHeading,
    ...c.logisticsParagraphs,
    ...c.logisticsFacts.flatMap((f) => [f.label, f.value]),
    c.venueBannerEyebrow,
    c.venueBannerTitle,
    c.venueBannerDesc,
    c.dec31BannerEyebrow,
    c.dec31BannerTitle,
    c.dec31BannerDesc,
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

test('Orthodox NYE 2027 @ JustMe Milano has 35 unique slugs, clean redirects, and full resolution parity', () => {
  assert.equal(Object.keys(ORTHODOX_NYE_JUSTME_SLUGS_35).length, 35);
  const slugs = enabledLocaleCodes.map((loc) => orthodoxNyeJustMeSlug(loc));
  assert.equal(new Set(slugs).size, 35, 'Expected 35 unique canonical slugs');

  const paths = enabledLocaleCodes.map((loc) => orthodoxNyeJustMePath(loc));
  assert.equal(new Set(paths).size, 35, 'Expected 35 unique localized paths');

  for (const loc of enabledLocaleCodes) {
    const canonSlug = orthodoxNyeJustMeSlug(loc);
    const canonPath = orthodoxNyeJustMePath(loc);

    assert.equal(resolveOrthodoxNyeJustMeSlug(canonSlug), true, `Unresolved slug for ${loc}`);
    assert.equal(resolveEventSlugToCanonical(canonSlug, loc), canonSlug);
    assert.equal(
      resolveEventSlugToCanonical(ORTHODOX_NYE_JUSTME_XCEED_RAW_SLUG, loc),
      canonSlug,
    );
    assert.equal(getLocalizedEventSlug35(ORTHODOX_NYE_JUSTME_SLUGS_35.en, loc), canonSlug);

    assert.equal(
      resolveLegacyOrExpiredEventRedirect(canonSlug, loc),
      null,
      `Canonical slug must not redirect for ${loc}`,
    );

    assert.equal(
      resolveLegacyOrExpiredEventRedirect(ORTHODOX_NYE_JUSTME_XCEED_RAW_SLUG, loc),
      null,
      `Raw Xceed slug is handled by EventPage permanentRedirect for ${loc}`,
    );
    assert.equal(resolveOrthodoxNyeJustMeSlug(ORTHODOX_NYE_JUSTME_XCEED_RAW_SLUG), true);
    assert.notEqual(ORTHODOX_NYE_JUSTME_XCEED_RAW_SLUG, canonSlug);
  }
});

test('Orthodox NYE 2027 @ JustMe Milano meets SEO metadata, pricing, menus, >=1650 words, and zero forbidden strings across all 35 locales', () => {
  const forbiddenRe = /Cavalli|NIGHT FASHION|Michela Malauti|cv2\.inpaint|\u2014/;

  for (const loc of enabledLocaleCodes) {
    const c = getOrthodoxNyeJustMeContent(loc);

    assert.ok(
      c.metaTitle.length >= 20 && c.metaTitle.length <= 65,
      `metaTitle out of [20..65] in ${loc} (${c.metaTitle.length}): ${c.metaTitle}`,
    );
    assert.ok(
      c.metaDescription.length >= 80 && c.metaDescription.length <= 160,
      `metaDescription out of [80..160] in ${loc} (${c.metaDescription.length}): ${c.metaDescription}`,
    );

    assert.ok(c.silverCourses.length >= 3, `Expected >=3 Silver courses in ${loc}`);
    assert.ok(c.goldCourses.length >= 4, `Expected >=4 Gold courses in ${loc}`);
    assert.ok(c.faqs.length >= 8, `Expected >=8 FAQs in ${loc}`);
    assert.equal(c.tiers.length, 4, `Expected 4 booking tiers (Club, Silver, Gold, VIP) in ${loc}`);

    const allText = collectTextForContent(loc);
    assert.doesNotMatch(allText, forbiddenRe, `Forbidden term/em-dash detected in ${loc}`);

    for (const token of [/20/, /60/, /80/, /19:30/, /23:30/, /05:00/, /Nazar Radchuk/i, /JustMe/i]) {
      assert.match(allText, token, `Missing required fact ${token} in ${loc}`);
    }

    const wsWords = allText.split(/\s+/).filter(Boolean).length;
    const segWords = segmenterWordCount(allText, loc);
    assert.ok(
      wsWords >= 1650,
      `Whitespace word count too low in ${loc}: ${wsWords} < 1650`,
    );
    assert.ok(
      segWords >= 1700,
      `Segmenter word count too low in ${loc}: ${segWords} < 1700`,
    );
  }
});

test('Orthodox NYE 2027 @ JustMe Milano is properly linked in sitemap, Dec 31 JustMe banner, inventory.json, and <=300KB WebP assets', () => {
  assert.equal(
    ORTHODOX_NYE_JUSTME_AFFILIATE_URL,
    `https://xceed.me/en/milano/event/il-ritorno-di-cappuccetto-rosso/${ORTHODOX_NYE_JUSTME_XCEED_ID}/channel/nightlifemilan-1`,
  );

  const sitemapUrls = new Set(buildEventsSitemapEntries().map((entry) => entry.url));
  for (const loc of enabledLocaleCodes) {
    const full = `https://nightlifemilan.com${orthodoxNyeJustMePath(loc)}`;
    assert.ok(sitemapUrls.has(full), `Missing sitemap URL for ${loc}: ${full}`);
  }
  assert.equal(
    sitemapUrls.has(`https://nightlifemilan.com/events/${ORTHODOX_NYE_JUSTME_XCEED_RAW_SLUG}`),
    false,
    'Raw Xceed slug must not remain in sitemap alongside canonical 35-locale URLs',
  );

  const nyeJustMe = getCapodannoEventBySlug('capodanno-justme-milano-torre-branca');
  assert.ok(nyeJustMe, 'Missing Dec 31 capodanno-justme-milano-torre-branca event');
  for (const loc of enabledLocaleCodes) {
    const localized = getCapodannoLocalizedEventContent(nyeJustMe, loc);
    assert.equal(localized.relatedHolidayBanner?.href, orthodoxNyeJustMePath(loc));
  }

  const invRaw = fs.readFileSync(path.join(REPO_ROOT, 'lib/october-events/inventory.json'), 'utf8');
  const inv = JSON.parse(invRaw) as {
    events: Array<{ id: string; affiliateUrl: string; offers: Array<{ price: number | null }> }>;
  };
  const ev = inv.events.find((item) => item.id === ORTHODOX_NYE_JUSTME_XCEED_ID);
  assert.ok(ev, 'Missing event 251019 in inventory.json');
  assert.equal(ev.affiliateUrl, ORTHODOX_NYE_JUSTME_AFFILIATE_URL);
  const prices = new Set(ev.offers.map((o) => o.price));
  for (const p of [20, 60, 80]) {
    assert.ok(prices.has(p), `Missing price €${p} in inventory 251019`);
  }

  const assetPaths = [
    ORTHODOX_NYE_JUSTME_POSTER_SRC,
    '/images/events/october-2026/251019-5cfdcappuccetto.webp',
    ORTHODOX_NYE_JUSTME_SILVER_MENU_SRC,
    ORTHODOX_NYE_JUSTME_GOLD_MENU_SRC,
    ...ORTHODOX_NYE_JUSTME_FLOW_ASSET_KEYS.map((k) => `/images/seo-events/master/${k}.webp`),
  ];
  for (const rel of assetPaths) {
    const abs = path.join(REPO_ROOT, 'public', rel.replace(/^\/+/, ''));
    assert.ok(fs.existsSync(abs), `Missing public image asset: ${rel}`);
    const size = fs.statSync(abs).size;
    assert.ok(size >= 20_000 && size <= 300 * 1024, `Asset size out of range for ${rel}: ${size}`);
  }
});
