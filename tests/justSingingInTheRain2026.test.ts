import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { enabledLocaleCodes } from '../lib/i18n/localeRegistry';
import {
  getJustSingingDinnerWhatsappUrl,
  getJustSingingEventbriteUrl,
  getJustSingingRainContent,
  getJustSingingWhatsappConfirmUrl,
  isJustSingingRainActive,
  JUST_SINGING_EVENTBRITE_URLS,
  JUST_SINGING_RAIN_END_MS,
  JUST_SINGING_RAIN_EXTRA_ASSET_KEYS,
  JUST_SINGING_RAIN_FLOW_ASSET_KEYS,
  JUST_SINGING_RAIN_POSTER_SRC,
  JUST_SINGING_RAIN_SLUGS_35,
  JUST_SINGING_RAIN_START_MS,
  justSingingRainHreflangAlternates,
  justSingingRainPath,
  justSingingRainSlug,
  resolveJustSingingRainSlug,
} from '../lib/just-singing-rain/justme35';
import { resolveLegacyOrExpiredEventRedirect } from '../lib/i18n/localizedSlugs35';
import { getDateSensitiveEvents } from '../lib/dateSensitiveView';
import { getTopPriorityVenueRecommendations } from '../lib/priorityVenueRecommendations';
import { resolveSuggestedEventsForVertical } from '../lib/verticalsHubData';

const REPO_ROOT = path.resolve(__dirname, '..');

test('Just Singing in the Rain (Nov 25, 2026): 35 unique slugs, hreflang, middleware safety, and legacy Xceed #249169 resolution', () => {
  assert.equal(enabledLocaleCodes.length, 35);
  const slugValues = Object.values(JUST_SINGING_RAIN_SLUGS_35);
  assert.equal(slugValues.length, 35);
  assert.equal(new Set(slugValues).size, 35, 'Every locale must have a distinct slug');

  const hreflang = justSingingRainHreflangAlternates('https://nightlifemilan.com');
  assert.equal(Object.keys(hreflang).length, 36, '35 locales + x-default');
  assert.ok(hreflang['x-default'].endsWith(justSingingRainPath('en')));

  for (const loc of enabledLocaleCodes) {
    const slug = justSingingRainSlug(loc);
    assert.equal(resolveJustSingingRainSlug(slug), true);
    assert.equal(resolveLegacyOrExpiredEventRedirect(slug, loc), null, `[${loc}] middleware must not redirect canonical slug`);
  }
  assert.equal(resolveJustSingingRainSlug('249169'), true);
  assert.equal(resolveJustSingingRainSlug('wednesday-night-justme-milano-2026-11-25'), true);
  assert.equal(resolveJustSingingRainSlug('wednesday-night-225-249169'), true);
  assert.equal(resolveJustSingingRainSlug('capodanno-pineta-milano'), false);
});

test('Just Singing in the Rain: mandatory offer formula in title, H1, metaDescription, and first line across 35 locales', () => {
  const expectedTitles: Record<string, string> = {
    it: 'Just Singing in the Rain · Ingresso Gratis + Drink Offerto',
    en: 'Just Singing in the Rain · Free Entry + Free Drink',
    es: 'Just Singing in the Rain · Entrada Gratis + Copa Gratis',
    de: 'Just Singing in the Rain · Freier Eintritt + Gratis-Drink',
    fr: 'Just Singing in the Rain · Entrée Gratuite + Verre Offert',
  };

  for (const [loc, expected] of Object.entries(expectedTitles)) {
    const c = getJustSingingRainContent(loc);
    assert.equal(c.metaTitle, expected);
  }

  const forbiddenTerms = [
    /\bgene\s+kelly\b/i,
    /\bdebbie\s+reynolds\b/i,
    /\bdonald\s+o['’]?connor\b/i,
    /\bcavalli\b/i,
    /\bteatro\s+lirico\b/i,
    /\bteatro\s+nazionale\b/i,
    /\b21\+\b/i,
    /\bxceed\b/i,
    /\bstripe\b/i,
    /\+20%/,
    /tel:/i,
    /__PENDING_/i,
    /\u2014/,
  ];

  for (const loc of enabledLocaleCodes) {
    const c = getJustSingingRainContent(loc);
    assert.ok(
      c.metaTitle.length >= 25 && c.metaTitle.length <= 68,
      `[${loc}] metaTitle length out of bounds (${c.metaTitle.length}): ${c.metaTitle}`,
    );
    assert.ok(
      c.metaDescription.length >= 90 && c.metaDescription.length <= 165,
      `[${loc}] metaDescription length out of bounds (${c.metaDescription.length}): ${c.metaDescription}`,
    );
    assert.ok(c.metaTitle.includes(c.offerPhrase), `[${loc}] metaTitle missing offerPhrase`);
    assert.ok(c.h1.includes(c.offerPhrase), `[${loc}] h1 missing offerPhrase`);
    assert.ok(c.metaDescription.includes(c.offerPhrase), `[${loc}] metaDescription missing offerPhrase`);
    assert.ok(c.metaDescription.includes('+39 351 912 7047'), `[${loc}] metaDescription missing WhatsApp`);
    assert.ok(c.subtitle.includes(c.offerPhrase), `[${loc}] subtitle missing offerPhrase`);
    assert.ok(
      c.overviewParagraphs[0].startsWith(c.offerPhrase) || c.overviewParagraphs[0].includes(c.offerPhrase),
      `[${loc}] first description paragraph missing offerPhrase`,
    );
    assert.equal(c.faqs.length, 12, `[${loc}] expected 12 FAQs`);

    const waConfirm = getJustSingingWhatsappConfirmUrl(loc);
    const waDinner = getJustSingingDinnerWhatsappUrl(loc);
    assert.ok(waConfirm.startsWith('https://wa.me/393519127047?text='), `[${loc}] invalid waConfirm`);
    assert.ok(waDinner.startsWith('https://wa.me/393519127047?text='), `[${loc}] invalid waDinner`);

    if (loc !== 'en') {
      const en = getJustSingingRainContent('en');
      assert.notEqual(c.h1, en.h1, `[${loc}] leaked English H1`);
      assert.notEqual(c.overviewHeading, en.overviewHeading, `[${loc}] leaked English overviewHeading`);
    }

    const fullText = JSON.stringify(c);
    for (const re of forbiddenTerms) {
      assert.equal(re.test(fullText), false, `[${loc}] matched forbidden pattern ${re}`);
    }
  }
});

test('Just Singing in the Rain: auto-expiry at 2026-11-26T05:00:00+01:00 (!isPastEvent) and #1 tonight sorting', () => {
  assert.equal(isJustSingingRainActive(JUST_SINGING_RAIN_START_MS), true);
  assert.equal(isJustSingingRainActive(JUST_SINGING_RAIN_END_MS - 1), true);
  assert.equal(isJustSingingRainActive(JUST_SINGING_RAIN_END_MS), false);
  assert.equal(isJustSingingRainActive(JUST_SINGING_RAIN_END_MS + 60_000), false);

  // Even against an 18:00 event on the same day, Just Singing in the Rain sorts #1
  const sortedTonight = getDateSensitiveEvents(
    [
      { id: 'early-aperitivo', dateISO: '2026-11-25T18:00:00+01:00', endDateISO: '2026-11-25T22:00:00+01:00' },
      { id: '000-just-singing-in-the-rain-2026', dateISO: '2026-11-25T19:30:00+01:00', endDateISO: '2026-11-26T05:00:00+01:00' },
    ],
    'tonight',
    new Date('2026-11-25T16:30:00+01:00'),
  );
  assert.equal(sortedTonight[0]?.id, '000-just-singing-in-the-rain-2026');

  if (isJustSingingRainActive()) {
    for (const loc of ['it', 'en', 'es', 'de', 'fr', 'pt', 'pl', 'ar', 'zh']) {
      const topRecs = getTopPriorityVenueRecommendations(loc, 6);
      assert.equal(topRecs[0]?.id, '000-just-singing-in-the-rain-2026', `[${loc}] not #1 in top priority recommendations`);
      const vertAll = resolveSuggestedEventsForVertical('all', loc);
      assert.equal(vertAll[0]?.id, 'vert-just-singing-in-the-rain-2026', `[${loc}] not #1 in vertical suggestions (all)`);
      const vertOcc = resolveSuggestedEventsForVertical('occasions', loc);
      assert.equal(vertOcc[0]?.id, 'vert-just-singing-in-the-rain-2026', `[${loc}] not #1 in vertical suggestions (occasions)`);
    }
  }
});

test('Just Singing in the Rain: single-source Eventbrite fallback & real 4:5 WebP assets on disk', () => {
  for (const lang of ['it', 'en', 'es', 'de', 'fr'] as const) {
    const raw = JUST_SINGING_EVENTBRITE_URLS[lang];
    assert.equal(raw.includes('__PENDING_'), false, `Eventbrite URL for ${lang} contains placeholder: ${raw}`);
    const resolved = getJustSingingEventbriteUrl(lang);
    if (raw.trim()) {
      assert.ok(/^https:\/\/www\.eventbrite\./i.test(raw), `Invalid Eventbrite URL for ${lang}: ${raw}`);
      assert.equal(resolved, raw.trim());
    } else {
      assert.ok(resolved === null || /^https:\/\/www\.eventbrite\./i.test(resolved));
    }
  }

  const posterDisk = path.join(REPO_ROOT, 'public', JUST_SINGING_RAIN_POSTER_SRC.replace(/^\//, ''));
  assert.ok(fs.existsSync(posterDisk), `Missing poster on disk: ${posterDisk}`);
  const posterSize = fs.statSync(posterDisk).size;
  assert.ok(posterSize > 20_000 && posterSize <= 307_200, `Poster size ${posterSize} exceeds 300 KB`);

  for (const key of [...JUST_SINGING_RAIN_FLOW_ASSET_KEYS, ...JUST_SINGING_RAIN_EXTRA_ASSET_KEYS]) {
    const masterDisk = path.join(REPO_ROOT, 'public/images/seo-events/master', `${key}.webp`);
    assert.ok(fs.existsSync(masterDisk), `Missing Flow gallery asset: ${masterDisk}`);
    const stat = fs.statSync(masterDisk);
    assert.ok(stat.size > 20_000 && stat.size <= 307_200, `Flow asset ${key} size ${stat.size} out of bounds`);
  }
});
