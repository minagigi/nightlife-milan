import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import {
  getEventBatchProfile,
  getEventBatchSlug,
  isEventBatchLocaleHttpIndexable,
} from '../lib/eventBatchProfiles';
import { getEventVisualGallery } from '../lib/eventVisualGallery';
import { enabledLocaleCodes, indexedLocaleCodes, localePrefix } from '../lib/i18n/locales';
import { getLocalizedEventContent, getLocalizedEventSeed } from '../lib/localizedEventContent';
import { WORLD_CUP_FINAL_LOCALE_COPIES, validateWorldCupFinalLocaleCopies } from '../lib/worldCupFinalLocaleCopies';
import { WORLD_CUP_FINAL_CANONICAL_SLUG, WORLD_CUP_FINAL_PHONE } from '../lib/worldCupFinalIt';

test('World Cup pages resolve natively in all enabled locales', () => {
  validateWorldCupFinalLocaleCopies();
  const profile = getEventBatchProfile(WORLD_CUP_FINAL_CANONICAL_SLUG);
  assert.ok(profile);
  assert.deepEqual(profile.siteLocales, enabledLocaleCodes);
  assert.equal(new Set(enabledLocaleCodes.map((locale) => getEventBatchSlug(profile, locale))).size, enabledLocaleCodes.length);

  for (const locale of enabledLocaleCodes) {
    const copy = WORLD_CUP_FINAL_LOCALE_COPIES[locale];
    const content = getLocalizedEventContent(copy.slug, locale);
    const seed = getLocalizedEventSeed(copy.slug, locale);
    assert.ok(content, `${locale}: missing content`);
    assert.ok(seed, `${locale}: missing event seed`);
    assert.equal(content.locale, locale);
    assert.equal(content.faqs.length, 25);
    assert.ok(content.metaTitle && [...content.metaTitle].length <= 62);
    assert.ok(content.metaDescription && [...content.metaDescription].length <= 158);
    assert.match(content.metaDescription, /\+39 351 912 7047/);
    assert.equal(seed.localizedContent.slug[locale], copy.slug);
    assert.equal(getEventBatchSlug(profile, locale), copy.slug);
  }
});

test('all complete World Cup locales enter search surfaces without widening global indexing', async () => {
  const page = await readFile(path.join(process.cwd(), 'app', '[locale]', 'events', '[slug]', 'page.tsx'), 'utf8');
  const sitemap = await readFile(path.join(process.cwd(), 'app', 'sitemap.ts'), 'utf8');
  assert.match(page, /indexedSiteLocales/);
  assert.match(page, /eventProfile\?\.indexedLocales/);
  assert.match(page, /generateEventSchema/);
  assert.match(page, /'@type': 'FAQPage'/);
  assert.match(sitemap, /SITE_ONLY_EVENT_PROFILES/);
  assert.match(sitemap, /profile\.indexedLocales/);

  const profile = getEventBatchProfile(WORLD_CUP_FINAL_CANONICAL_SLUG)!;
  assert.deepEqual(profile.indexedLocales, enabledLocaleCodes);
  // Policy corrente: 6 lingue core indicizzate globalmente; gli EVENTI completi
  // allargano a tutte le 35 via indexedLocales di profilo (event-scoped).
  assert.deepEqual(indexedLocaleCodes, ['en', 'it', 'es', 'fr', 'de', 'pt']);
  assert.equal(enabledLocaleCodes.length, 35);
  const indexedUrls = profile.indexedLocales!.map(
    (locale) => `${localePrefix(locale)}/events/${getEventBatchSlug(profile, locale)}`,
  );
  assert.equal(indexedUrls.length, 35);
  assert.equal(new Set(indexedUrls).size, 35);
});

test('World Cup event-scoped HTTP indexability requires the exact localized event path', async () => {
  const middleware = await readFile(path.join(process.cwd(), 'middleware.ts'), 'utf8');
  const profile = getEventBatchProfile(WORLD_CUP_FINAL_CANONICAL_SLUG)!;

  for (const locale of enabledLocaleCodes) {
    assert.equal(isEventBatchLocaleHttpIndexable(locale, getEventBatchSlug(profile, locale)), true);
  }

  assert.equal(isEventBatchLocaleHttpIndexable('nl', 'flower-power-ibiza-justme-12-06-2026'), false);
  assert.equal(isEventBatchLocaleHttpIndexable('nl', getEventBatchSlug(profile, 'it')), false);
  assert.equal(isEventBatchLocaleHttpIndexable('invalid', getEventBatchSlug(profile, 'nl')), false);
  assert.match(middleware, /isEventBatchLocaleHttpIndexable/);
  assert.match(middleware, /localizedEventPageRe/);
  assert.equal(enabledLocaleCodes.length, 35);
  // Policy corrente: 6 lingue core indicizzate globalmente; gli EVENTI completi
  // allargano a tutte le 35 via indexedLocales di profilo (event-scoped).
  assert.deepEqual(indexedLocaleCodes, ['en', 'it', 'es', 'fr', 'de', 'pt']);
});

// NOTA merge 20 lug 2026: il vecchio test "event prerendering and ticket Offer
// integrity" codificava l'architettura precedente (prerender con fetch
// Eventbrite in build, niente validFrom). L'architettura corrente è l'opposto
// ed è coperta da tests/eventPageBuildIsolation.test.ts (generateStaticParams
// vuoto + risoluzione on-demand via ISR).

test('World Cup galleries use complete full-frame production assets', async () => {
  for (const locale of enabledLocaleCodes) {
    const slug = WORLD_CUP_FINAL_LOCALE_COPIES[locale].slug;
    const gallery = getEventVisualGallery(slug, locale);
    assert.ok(gallery?.hero, `${locale}: missing hero`);
    assert.equal(gallery.hero.aspect, 'landscape');
    assert.equal(gallery.images.length, 5);
    assert.ok(gallery.images.every((image) => image.aspect === 'five-four'));

    for (const image of [gallery.hero, ...gallery.images]) {
      const file = path.join(process.cwd(), 'public', image.src.replace(/^\//, ''));
      await access(file);
      const metadata = await sharp(file).metadata();
      assert.ok(metadata.width && metadata.height);
      const expected = image.aspect === 'landscape' ? 2 : 1.25;
      assert.ok(Math.abs(metadata.width / metadata.height - expected) < 0.001, `${locale}: ${image.src}`);
    }
  }
});

test('World Cup conversion data keeps the verified contact', () => {
  for (const locale of enabledLocaleCodes) {
    const content = getLocalizedEventContent(WORLD_CUP_FINAL_LOCALE_COPIES[locale].slug, locale)!;
    assert.match(content.bookingIntro || '', new RegExp(WORLD_CUP_FINAL_PHONE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(content.affiliateUrl, /\/channel\/nightlifemilan-1$/);
  }
});

test('favicon assets and canonical host redirect are release-gated', async () => {
  const iconSvg = await readFile(path.join(process.cwd(), 'app', 'icon.svg'), 'utf8');
  const favicon = await readFile(path.join(process.cwd(), 'app', 'favicon.ico'));
  const appleIcon = await sharp(path.join(process.cwd(), 'app', 'apple-icon.png')).metadata();
  const nextConfig = await readFile(path.join(process.cwd(), 'next.config.ts'), 'utf8');

  assert.match(iconSvg, /width="96" height="96"/);
  assert.equal(favicon.readUInt16LE(2), 1);
  assert.equal(favicon.readUInt16LE(4), 1);
  assert.equal(favicon.readUInt8(6), 96);
  assert.equal(favicon.readUInt8(7), 96);
  assert.equal(favicon.readUInt32LE(18), 22);
  assert.deepEqual([...favicon.subarray(22, 30)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(appleIcon.width, 180);
  assert.equal(appleIcon.height, 180);
  assert.match(nextConfig, /type: 'host', value: 'www\.nightlifemilan\.com'/);
  assert.match(nextConfig, /destination: 'https:\/\/nightlifemilan\.com\/:path\*'/);
  assert.match(nextConfig, /permanent: true/);
});

// NOTA merge 20 lug 2026: il vecchio test sul cron "sync?sitemapOnly=1" è stato
// sostituito dal watcher protetto dedicato (/api/indexing/sitemap-watch, 18:00
// UTC, con validazione della sitemap e idempotenza per giorno di Milano) —
// coperto da tests/sitemapWatcher.test.ts.
