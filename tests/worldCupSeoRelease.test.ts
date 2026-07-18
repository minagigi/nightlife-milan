import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import { getEventBatchProfile, getEventBatchSlug } from '../lib/eventBatchProfiles';
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
  assert.deepEqual(indexedLocaleCodes, ['en', 'it', 'es', 'fr', 'de', 'pt']);
  assert.equal(enabledLocaleCodes.length, 35);
  const indexedUrls = profile.indexedLocales!.map(
    (locale) => `${localePrefix(locale)}/events/${getEventBatchSlug(profile, locale)}`,
  );
  assert.equal(indexedUrls.length, 35);
  assert.equal(new Set(indexedUrls).size, 35);
});

test('event prerendering and ticket Offer integrity are preserved', async () => {
  const page = await readFile(path.join(process.cwd(), 'app', '[locale]', 'events', '[slug]', 'page.tsx'), 'utf8');
  const seo = await readFile(path.join(process.cwd(), 'lib', 'seo.ts'), 'utf8');

  assert.match(page, /mockEvents\.forEach/);
  assert.match(page, /weeklyEvents\.forEach/);
  assert.match(page, /SITE_ONLY_EVENT_PROFILES\.forEach/);
  assert.match(page, /fetchEventbriteEvents\(\)/);
  assert.doesNotMatch(page, /generateStaticParams\(\)[\s\S]{0,100}return \[\]/);
  assert.match(page, /url: localizedEventContent\.affiliateUrl/);
  assert.doesNotMatch(seo, /buildOfferSchema\(event\.pricing, eventUrl, event\.dateISO\)/);
  assert.doesNotMatch(seo, /validFrom/);
});

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

test('the HTTPS sitemap is submitted through the protected daily cron at 18:00 UTC', async () => {
  const vercelConfig = JSON.parse(await readFile(path.join(process.cwd(), 'vercel.json'), 'utf8')) as {
    crons?: Array<{ path: string; schedule: string }>;
  };
  const syncRoute = await readFile(
    path.join(process.cwd(), 'app', 'api', 'events', 'sync', 'route.ts'),
    'utf8',
  );
  const sitemapCrons = (vercelConfig.crons || []).filter(
    (cron) => cron.path === '/api/events/sync?sitemapOnly=1',
  );

  assert.deepEqual(sitemapCrons, [
    {
      path: '/api/events/sync?sitemapOnly=1',
      schedule: '0 18 * * *',
    },
  ]);
  assert.match(syncRoute, /searchParams\.get\('sitemapOnly'\) === '1'/);
  assert.equal((syncRoute.match(/await submitSitemap\(/g) || []).length, 1);
  assert.match(syncRoute, /`sc-domain:\$\{new URL\(BASE\)\.hostname\.replace/);
  assert.match(syncRoute, /submitSitemap\(SEARCH_CONSOLE_SITE_URL/);
  assert.doesNotMatch(syncRoute, /notifyUrls/);
  assert.match(syncRoute, /searchNotifications: 'disabled_for_ordinary_pages'/);
});
