import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import {
  BAD_BUNNY_ARIA_ADDRESS,
  BAD_BUNNY_ARIA_AFFILIATE_URL,
  BAD_BUNNY_ARIA_CANONICAL_SLUG,
  BAD_BUNNY_ARIA_KEYWORDS_IT,
  BAD_BUNNY_ARIA_PHONE,
  getBadBunnyAriaImagePath,
} from '../lib/badBunnyAria';
import { badBunnyAriaConfirmationFieldComplete, buildBadBunnyAriaEventbritePayloads } from '../lib/badBunnyAriaEventbrite';
import { getBadBunnyAriaLocalizedContent } from '../lib/badBunnyAriaLocales';
import { BAD_BUNNY_ARIA_EDITORIAL_COPY } from '../lib/badBunnyAriaEditorialCopy';
import { getEventVisualGallery } from '../lib/eventVisualGallery';
import { enabledLocaleCodes } from '../lib/i18n/locales';
import sitemap from '../app/sitemap';

test('Bad Bunny Aria Eventbrite package has ten distinct Italian keyword variants', () => {
  const payloads = buildBadBunnyAriaEventbritePayloads();
  assert.equal(payloads.length, 10);
  assert.equal(new Set(payloads.map((payload) => payload.keyword)).size, 10);
  assert.deepEqual(payloads.map((payload) => payload.keyword), [...BAD_BUNNY_ARIA_KEYWORDS_IT]);
  assert.equal(new Set(payloads.map((payload) => payload.marker)).size, 10);

  for (const payload of payloads) {
    assert.doesNotMatch(`${payload.keyword} ${payload.title} ${payload.descriptionHtml}`, /\{[a-zA-Z][^}]*\}/u);
    assert.match(payload.title, /Bad Bunny/);
    assert.ok([...payload.title].length <= 75);
    assert.ok([...payload.summary].length <= 140);
    assert.ok(payload.descriptionHtml.includes(BAD_BUNNY_ARIA_EDITORIAL_COPY.it.independentNotice));
    assert.ok(payload.descriptionHtml.includes(BAD_BUNNY_ARIA_AFFILIATE_URL));
    assert.ok(payload.descriptionHtml.includes(BAD_BUNNY_ARIA_ADDRESS));
    assert.ok(payload.descriptionHtml.includes(BAD_BUNNY_ARIA_PHONE));
    assert.equal((payload.descriptionHtml.match(/data-event-faq="true"/g) || []).length, 25);
    assert.equal((payload.descriptionHtml.match(/<img\b/g) || []).length, 5);
    assert.equal((payload.descriptionHtml.match(/display:block;width:100%;max-width:100%;height:auto/g) || []).length, 5);
    assert.equal(/<br\s*\/?\s*>/i.test(payload.descriptionHtml), false);
    assert.equal(/\p{Extended_Pictographic}/u.test(payload.descriptionHtml), false);
  }
});

test('Bad Bunny Aria canonical content is native, explicit and complete in all 35 locales', () => {
  assert.equal(enabledLocaleCodes.length, 35);
  for (const locale of enabledLocaleCodes) {
    const content = getBadBunnyAriaLocalizedContent(locale);
    assert.match(content.title, /Bad Bunny/);
    assert.equal(content.faqs.length, 25);
    assert.equal(content.programme.length, 3);
    assert.equal(content.offers.length, 6);
    assert.equal(content.affiliateUrl, BAD_BUNNY_ARIA_AFFILIATE_URL);
    assert.ok(`${content.answerFirst} ${content.bookingIntro}`.includes(BAD_BUNNY_ARIA_PHONE));
    assert.ok(content.answerFirst?.includes(BAD_BUNNY_ARIA_EDITORIAL_COPY[locale].independentNotice));
    assert.equal(content.faqs[0].question, BAD_BUNNY_ARIA_EDITORIAL_COPY[locale].performanceQuestion);
    assert.equal(content.faqs[0].answer, BAD_BUNNY_ARIA_EDITORIAL_COPY[locale].independentNotice);
    assert.ok((content.metaTitle || '').length <= 62);
    assert.ok((content.metaDescription || '').length <= 158);
  }
});

test('Bad Bunny Aria Eventbrite package has 350 localized keyword listings', () => {
  const payloads = enabledLocaleCodes.flatMap((locale) => buildBadBunnyAriaEventbritePayloads(locale));
  assert.equal(payloads.length, 350);
  assert.equal(new Set(payloads.map((payload) => payload.marker)).size, 350);
  for (const locale of enabledLocaleCodes) {
    const localized = payloads.filter((payload) => payload.locale === locale);
    assert.equal(localized.length, 10);
    assert.equal(new Set(localized.map((payload) => payload.keyword)).size, 10);
    assert.ok(localized.every((payload) => payload.title.includes('Bad Bunny')));
    assert.ok(localized.every((payload) => payload.descriptionHtml.includes(BAD_BUNNY_ARIA_EDITORIAL_COPY[locale].independentNotice)));
  }
});

test('Eventbrite confirmation gate validates each native field case-insensitively', () => {
  const confirmation = buildBadBunnyAriaEventbritePayloads()[0].orderConfirmation;
  assert.equal(badBunnyAriaConfirmationFieldComplete(confirmation), true);
  assert.equal(badBunnyAriaConfirmationFieldComplete(confirmation.toLocaleLowerCase('it')), true);
  assert.equal(badBunnyAriaConfirmationFieldComplete(confirmation.replace(BAD_BUNNY_ARIA_AFFILIATE_URL, 'https://xceed.me/wrong')), false);
  assert.equal(badBunnyAriaConfirmationFieldComplete(''), false);
});

test('Bad Bunny Aria galleries use 210 exact localized assets', async () => {
  for (const locale of enabledLocaleCodes) {
    const gallery = getEventVisualGallery(BAD_BUNNY_ARIA_CANONICAL_SLUG, locale);
    assert.ok(gallery?.hero);
    assert.equal(gallery.images.length, 5);
    const plans = [
      { src: getBadBunnyAriaImagePath(locale, 'cover'), width: 2000, height: 1000 },
      ...(['poster', 'venue', 'aperitivo', 'club', 'tables'] as const).map((kind) => ({ src: getBadBunnyAriaImagePath(locale, kind), width: 1600, height: 1280 })),
    ];
    for (const plan of plans) {
      const file = path.join(process.cwd(), 'public', plan.src.replace(/^\//, ''));
      const [metadata, info] = await Promise.all([sharp(file).metadata(), stat(file)]);
      assert.equal(metadata.width, plan.width);
      assert.equal(metadata.height, plan.height);
      assert.ok(info.size >= 100_000 && info.size <= 5_000_000);
    }
  }
});

test('Bad Bunny Aria contributes exactly 35 canonical URLs to the sitemap', async () => {
  const rows = await sitemap();
  const matches = rows.filter((row) => row.url.includes(`/events/${BAD_BUNNY_ARIA_CANONICAL_SLUG}`));
  assert.equal(matches.length, 35);
  assert.equal(new Set(matches.map((row) => row.url)).size, 35);
});

test('Bad Bunny publisher isolates cross-locale title collisions by exact marker', async () => {
  const route = await readFile(path.join(process.cwd(), 'app/api/events/publish-bad-bunny-aria/route.ts'), 'utf8');
  const runner = await readFile(path.join(process.cwd(), 'scripts/publish-bad-bunny-aria-locales.ps1'), 'utf8');
  assert.match(route, /belongsToAnotherExpectedSatellite/);
  assert.match(route, /nlm:curated=bad-bunny-aria-v\\d\+/);
  assert.match(route, /hydrateStartCandidates\(token, inventory, sourcePayloads\)/);
  assert.match(route, /titles\.has\(String\(event\.name\?\.text/);
  assert.match(route, /refreshExistingLive/);
  assert.match(route, /restoreLiveSnapshot/);
  assert.match(route, /confirmation\/music\/final readback failed and the previous live state was restored/);
  assert.match(route, /automatic rollback readback verification failed/);
  assert.match(route, /requestUrl\.searchParams\.get\('audit'\) === '1'/);
  assert.match(route, /expectedMarkerCount: expected\.length/);
  assert.match(route, /\['live', 'started'\]\.includes\(String\(event\.status/);
  assert.match(runner, /Invoke-AuditChunk/);
  assert.match(runner, /observedExpected\.Count -ne 350/);
  assert.match(runner, /Remove-EphemeralSecret/);
  assert.match(runner, /Assert-SecretRevoked/);
  assert.match(runner, /status -ne 401/);
});
