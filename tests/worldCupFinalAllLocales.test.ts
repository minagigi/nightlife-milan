import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import { EVENT_BATCH_LOCALE_FALLBACKS } from '../lib/eventBatchLocaleFallbacks';
import { getEventBatchProfile, getEventBatchSlug } from '../lib/eventBatchProfiles';
import { getEventLocalePack } from '../lib/eventLocalePacks';
import { getEventVisualGallery } from '../lib/eventVisualGallery';
import { enabledLocaleCodes, indexedLocaleCodes, localePrefix } from '../lib/i18n/locales';
import { getLocalizedEventContent, getLocalizedEventSeed } from '../lib/localizedEventContent';
import { WORLD_CUP_FINAL_LOCALE_COPIES, validateWorldCupFinalLocaleCopies } from '../lib/worldCupFinalLocaleCopies';
import { getWorldCupFinalLocalizedContent } from '../lib/worldCupFinalLocales';
import { buildWorldCupEventbriteLocalePayloads, validateWorldCupEventbriteLocalePayload } from '../lib/worldCupEventbriteLocales';
import { WORLD_CUP_FINAL_CANONICAL_SLUG, WORLD_CUP_FINAL_PHONE } from '../lib/worldCupFinalIt';
import {
  getWorldCupFinalGalleryImageCopy,
  getWorldCupFinalGeneratedImagePath,
  WORLD_CUP_FINAL_GALLERY_KINDS,
  WORLD_CUP_FINAL_VISUAL_REVISION,
} from '../lib/worldCupFinalVisuals';
import { eventText } from '../lib/eventPageLocale';

test('World Cup final has one complete canonical website page in every enabled locale', () => {
  validateWorldCupFinalLocaleCopies();
  const profile = getEventBatchProfile(WORLD_CUP_FINAL_CANONICAL_SLUG);
  assert.ok(profile);
  assert.deepEqual(profile.siteLocales, enabledLocaleCodes);
  assert.equal(new Set(enabledLocaleCodes.map((locale) => getEventBatchSlug(profile, locale))).size, 35);

  for (const locale of enabledLocaleCodes) {
    const copy = WORLD_CUP_FINAL_LOCALE_COPIES[locale];
    const content = getLocalizedEventContent(copy.slug, locale);
    const seed = getLocalizedEventSeed(copy.slug, locale);
    assert.ok(content, `${locale} content missing`);
    assert.ok(seed, `${locale} seed missing`);
    assert.deepEqual(content, getWorldCupFinalLocalizedContent(locale));
    assert.equal(content.locale, locale);
    assert.equal(content.title, locale === 'en' || locale === 'it' ? content.title : copy.eventName);
    assert.equal(content.sections.length, 4);
    assert.equal(content.programme.length, 6, `${locale} complete programme`);
    assert.equal(content.faqs.length, 25);
    assert.equal(new Set(content.faqs.map((faq) => faq.question)).size, 25);
    assert.ok(content.metaTitle && [...content.metaTitle].length <= 62, `${locale} meta title`);
    assert.ok(content.metaDescription && [...content.metaDescription].length <= 158, `${locale} meta description`);
    assert.ok([...content.seoSummary].length <= 140, `${locale} summary`);
    assert.match(content.seoSummary, /\+39 351 912 7047/);
    assert.ok(content.answerFirst);
    assert.ok(content.bookingIntro);
    assert.match(content.bookingIntro, /Eventbrite/i);
    assert.ok(content.bookingIntro.includes(WORLD_CUP_FINAL_PHONE));
    assert.ok(content.venueDescription);
    assert.equal(content.leadPosterAfterBooking, true);
    assert.equal(content.programmeBeforeSections, true);
    assert.equal(copy.keywordIntents.length, 5);
    assert.equal(new Set(copy.keywordIntents).size, 5);
    if (locale !== 'en' && locale !== 'it') {
      assert.ok(content.answerFirst.includes('19:30'), `${locale} opening in lead`);
      assert.ok(content.answerFirst.includes('21:00'), `${locale} kick-off in lead`);
      assert.ok(content.metaTitle.includes('19.07.2026'), `${locale} date in title`);
      assert.ok(content.metaTitle.includes('Just Me'), `${locale} venue in title`);
      assert.ok(content.seoSummary.includes('19:30') && content.seoSummary.includes('21:00'), `${locale} times in summary`);
      assert.ok(content.metaDescription.includes('19:30') && content.metaDescription.includes('21:00'), `${locale} times in description`);
      assert.deepEqual(content.programme.slice(0, 4).map((slot) => slot.start), ['19:30', '20:15', '20:45', '21:00']);
      assert.doesNotMatch(JSON.stringify(content), /DJ\.\s*,/u, `${locale} malformed DJ punctuation`);
      copy.keywordIntents.forEach((intent, index) => {
        assert.ok(content.faqs[index].question.toLocaleLowerCase(locale).includes(intent.toLocaleLowerCase(locale)));
      });
    }
  }
});

test('percent-encoded native-script World Cup slugs resolve to their canonical profile', () => {
  for (const locale of ['el', 'uk', 'mk'] as const) {
    const slug = WORLD_CUP_FINAL_LOCALE_COPIES[locale].slug;
    const profile = getEventBatchProfile(encodeURIComponent(slug));
    assert.ok(profile, `${locale} encoded slug did not resolve`);
    assert.equal(getEventBatchSlug(profile, locale), slug);
  }
});

test('World Cup booking controls are localized in every enabled locale', () => {
  for (const locale of enabledLocaleCodes) {
    const heading = eventText(locale, 'Tickets, admission and WhatsApp', 'Prenotazioni, biglietti e WhatsApp', 'Bilhetes, entrada e WhatsApp');
    const confirmation = eventText(locale, 'Confirm on WhatsApp', 'Conferma su WhatsApp', 'Confirmar no WhatsApp');
    assert.ok(heading.length > 8, `${locale} booking heading`);
    assert.ok(confirmation.length > 5, `${locale} WhatsApp CTA`);
    if (locale !== 'en' && locale !== 'it') {
      assert.notEqual(heading, 'Tickets, admission and WhatsApp', `${locale} booking heading fallback`);
      assert.notEqual(confirmation, 'Confirm on WhatsApp', `${locale} WhatsApp CTA fallback`);
    }
  }
});

test('every World Cup locale has a 2:1 cover plan, a 5:4 poster and four localized GPT editorial visuals', () => {
  for (const locale of enabledLocaleCodes) {
    const copy = WORLD_CUP_FINAL_LOCALE_COPIES[locale];
    const gallery = getEventVisualGallery(copy.slug, locale);
    assert.ok(gallery, `${locale} gallery missing`);
    assert.equal(gallery.hero?.aspect, 'landscape');
    assert.equal(gallery.images.length, 5);
    assert.ok(gallery.images.every((image) => image.aspect === 'five-four'));
    assert.equal(new Set(gallery.images.map((image) => image.title)).size, 5);
    assert.equal(new Set(gallery.images.map((image) => image.alt)).size, 5);
    assert.ok(gallery.images.every((image) => image.alt.length > 20));
    WORLD_CUP_FINAL_GALLERY_KINDS.forEach((kind, index) => {
      assert.equal(gallery.images[index + 1].src, getWorldCupFinalGeneratedImagePath(locale, kind));
    });
    if (locale !== 'en' && locale !== 'it') {
      assert.equal(gallery.hero?.src, `/images/events/generated/just-me-world-cup-final-cover-2x1-${locale}-v1.jpg`);
      assert.equal(gallery.images[0].src, `/images/events/generated/just-me-world-cup-final-poster-5x4-${locale}-v1.jpg`);
    }
  }
});

test('all 140 GPT editorial assets and their reproducibility manifest are complete', async () => {
  const generatedDir = path.join(process.cwd(), 'public', 'images', 'events', 'generated');
  const files = await readdir(generatedDir);
  const editorialAssets = files.filter((file) => /^just-me-world-cup-final-(?:programme|target|dress|afterparty)-5x4-[a-z]{2}-v3\.jpg$/.test(file));
  assert.equal(editorialAssets.length, enabledLocaleCodes.length * WORLD_CUP_FINAL_GALLERY_KINDS.length);

  for (const locale of enabledLocaleCodes) {
    for (const kind of WORLD_CUP_FINAL_GALLERY_KINDS) {
      const assetPath = path.join(generatedDir, getWorldCupFinalGeneratedImagePath(locale, kind).split('/').pop()!);
      const [metadata, fileStat] = await Promise.all([sharp(assetPath).metadata(), stat(assetPath)]);
      assert.equal(metadata.format, 'jpeg', `${locale}/${kind} format`);
      assert.equal(metadata.width, 1600, `${locale}/${kind} width`);
      assert.equal(metadata.height, 1280, `${locale}/${kind} height`);
      assert.ok(fileStat.size >= 100_000 && fileStat.size <= 5_000_000, `${locale}/${kind} byte budget`);
    }
  }

  const manifest = JSON.parse(await readFile(
    path.join(process.cwd(), 'artifacts', 'just-me-world-cup-final-2026-draft', 'imagegen-gallery-manifest.json'),
    'utf8',
  )) as { source?: string; assets?: Array<{ locale: string; kind: string; sha256: string }> };
  assert.equal(manifest.source, 'OpenAI built-in imagegen');
  assert.equal(manifest.assets?.length, 140);
  assert.equal(new Set(manifest.assets?.map((asset) => `${asset.locale}/${asset.kind}`)).size, 140);
  assert.ok(manifest.assets?.every((asset) => /^[a-f0-9]{64}$/.test(asset.sha256)));
});

test('the four GPT masters are full-bleed 5:4 photographs without an opaque information panel', async () => {
  const mastersDir = path.join(process.cwd(), 'artifacts', 'just-me-world-cup-final-2026-draft', 'imagegen-masters');
  for (const kind of WORLD_CUP_FINAL_GALLERY_KINDS) {
    const master = path.join(mastersDir, `world-cup-${kind}-5x4-fullbleed-master-v2.png`);
    const metadata = await sharp(master).metadata();
    assert.ok(metadata.width && metadata.height, `${kind} master dimensions`);
    assert.ok(Math.abs(metadata.width / metadata.height - 1.25) < 0.01, `${kind} master ratio`);
    const bottomStart = Math.floor(metadata.height * 0.65);
    const bottomStats = await sharp(master).extract({
      left: 0,
      top: bottomStart,
      width: metadata.width,
      height: metadata.height - bottomStart,
    }).stats();
    assert.ok(bottomStats.entropy > 5.9, `${kind} bottom area must retain photographic detail`);
  }
});

test('every World Cup locale maps dress, target and afterparty copy by meaning', () => {
  for (const locale of enabledLocaleCodes) {
    const content = getWorldCupFinalLocalizedContent(locale);
    const visualCopy = getWorldCupFinalGalleryImageCopy(locale);
    const pack = getEventLocalePack(locale)!;
    assert.equal(content.sections.length, 4, `${locale} semantic sections`);
    if (locale !== 'en' && locale !== 'it') {
      assert.equal(content.sections[0].body, EVENT_BATCH_LOCALE_FALLBACKS[locale].elegantDressLongTrousers, `${locale} dress body`);
    }
    assert.notEqual(content.sections[0].title, pack.sectionTitles.access, `${locale} dress title must be specific`);
    assert.ok(content.sections[1].title.length > 5, `${locale} target title`);
    assert.match(content.sections[1].title, /21/, `${locale} target title age`);
    assert.doesNotMatch(content.sections[1].title, /18/, `${locale} target title must not contradict 21+`);
    assert.match(content.sections[1].body, /21/, `${locale} target body`);
    if (locale !== 'en' && locale !== 'it') {
      assert.equal(content.sections[3].title, content.programme[4].title, `${locale} afterparty title`);
      assert.ok(content.sections[3].body.includes(content.programme[5].title), `${locale} afterparty body`);
    }
    assert.ok(content.sections[3].body.includes('Uptown Nights'), `${locale} afterparty body`);
    assert.ok(visualCopy.find((image) => image.kind === 'target')?.title.includes(content.sections[1].title), `${locale} target visual`);
    assert.ok(visualCopy.find((image) => image.kind === 'dress')?.description.includes(EVENT_BATCH_LOCALE_FALLBACKS[locale].elegantDressLongTrousers), `${locale} dress visual`);
    assert.ok(visualCopy.find((image) => image.kind === 'afterparty')?.title.includes(content.sections[3].title), `${locale} afterparty visual`);
  }
});

test('all 66 newly localized World Cup assets exist with exact dimensions and visible poster artwork', async () => {
  const remaining = enabledLocaleCodes.filter((locale) => locale !== 'en' && locale !== 'it');
  const generatedDir = path.join(process.cwd(), 'public', 'images', 'events', 'generated');
  const files = await readdir(generatedDir);
  const generatedAssets = files.filter((file) => /^just-me-world-cup-final-(?:cover-2x1|poster-5x4)-[a-z]{2}-v1\.jpg$/.test(file));
  assert.equal(generatedAssets.filter((file) => !/-en-v1\.jpg$/.test(file)).length, 66);

  for (const locale of remaining) {
    const coverPath = path.join(generatedDir, `just-me-world-cup-final-cover-2x1-${locale}-v1.jpg`);
    const posterPath = path.join(generatedDir, `just-me-world-cup-final-poster-5x4-${locale}-v1.jpg`);
    const [coverMeta, posterMeta, coverStat, posterStat] = await Promise.all([
      sharp(coverPath).metadata(),
      sharp(posterPath).metadata(),
      stat(coverPath),
      stat(posterPath),
    ]);
    assert.deepEqual([coverMeta.width, coverMeta.height], [2000, 1000], `${locale} cover dimensions`);
    assert.deepEqual([posterMeta.width, posterMeta.height], [1600, 1280], `${locale} poster dimensions`);
    assert.ok(coverStat.size >= 100_000 && coverStat.size <= 5_000_000, `${locale} cover bytes`);
    assert.ok(posterStat.size >= 100_000 && posterStat.size <= 5_000_000, `${locale} poster bytes`);

    const logo = await sharp(posterPath)
      .extract({ left: 450, top: 20, width: 700, height: 190 })
      .greyscale()
      .raw()
      .toBuffer();
    const brightLogoPixels = logo.reduce((count, value) => count + (value >= 205 ? 1 : 0), 0);
    assert.ok(brightLogoPixels > 18_000, `${locale} poster logo/date area is unexpectedly dark`);
  }
});

test('only indexed World Cup locales enter hreflang and sitemap while all 35 remain navigable', async () => {
  const [pageSource, sitemapSource] = await Promise.all([
    readFile(path.join(process.cwd(), 'app', '[locale]', 'events', '[slug]', 'page.tsx'), 'utf8'),
    readFile(path.join(process.cwd(), 'app', 'sitemap.ts'), 'utf8'),
  ]);
  assert.match(pageSource, /filter\(\(siteLocale\) => indexedLocaleCodes\.includes\(siteLocale\)\)/);
  assert.match(pageSource, /getLocaleDef\(siteLocale\)\?\.hreflang/);
  assert.match(pageSource, /normalizeEventBatchSlug\(slug\) !== canonicalSlug/);
  assert.match(pageSource, /just-me-world-cup-final-cover-2x1-/);
  assert.match(pageSource, /width: 2000, height: 1000/);
  assert.match(sitemapSource, /filter\(\(siteLocale\) => indexedLocaleCodes\.includes\(siteLocale\)\)/);
  assert.deepEqual(indexedLocaleCodes, ['en', 'it', 'es', 'fr', 'de', 'pt']);

  const profile = getEventBatchProfile(WORLD_CUP_FINAL_CANONICAL_SLUG)!;
  const indexedUrls = indexedLocaleCodes.map((locale) => `${localePrefix(locale)}/events/${getEventBatchSlug(profile, locale)}`);
  assert.equal(new Set(indexedUrls).size, indexedLocaleCodes.length);
});

test('the 33 missing Eventbrite locale packs prepare exactly 165 unique keyword variants', () => {
  const remaining = enabledLocaleCodes.filter((locale) => locale !== 'en' && locale !== 'it');
  const payloads = remaining.flatMap((locale) => buildWorldCupEventbriteLocalePayloads(locale));
  assert.equal(remaining.length, 33);
  assert.equal(payloads.length, 165);
  assert.equal(new Set(payloads.map((payload) => payload.marker)).size, 165);
  assert.equal(new Set(payloads.map((payload) => `${payload.locale}:${payload.variant}`)).size, 165);

  for (const locale of remaining) {
    const localePayloads = payloads.filter((payload) => payload.locale === locale);
    assert.equal(localePayloads.length, 5);
    assert.equal(new Set(localePayloads.map((payload) => payload.keyword)).size, 5);
    assert.equal(new Set(localePayloads.map((payload) => payload.title)).size, 5);
  }

  for (const payload of payloads) {
    validateWorldCupEventbriteLocalePayload(payload);
    assert.ok([...payload.title].length <= 75);
    assert.ok([...payload.summary].length <= 140);
    assert.ok(payload.summary.includes(WORLD_CUP_FINAL_PHONE));
    assert.ok(payload.coverImage.src.includes('cover-2x1'));
    assert.equal((payload.descriptionHtml.match(/<img\b/g) || []).length, 5);
    assert.equal((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length, 25);
    assert.equal((payload.descriptionHtml.match(/style="display:block;width:100%;max-width:100%;height:auto"/g) || []).length, 5);
    assert.ok(payload.descriptionHtml.includes(`nlm:visuals=${WORLD_CUP_FINAL_VISUAL_REVISION}`));
    assert.ok(payload.descriptionHtml.includes(payload.canonicalSiteUrl));
    assert.ok(payload.orderConfirmation.includes('21:00'));
    assert.doesNotMatch(payload.descriptionHtml, /<br\s*\/?\s*>/i);
    assert.doesNotMatch(payload.descriptionHtml, /\p{Extended_Pictographic}/u);
    assert.throws(() => validateWorldCupEventbriteLocalePayload(payload, true), /Eventbrite CDN images required/);
  }
});
