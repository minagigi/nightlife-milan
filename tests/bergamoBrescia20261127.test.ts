import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import {
  BERGAMO_BRESCIA_ACTIVE_NIGHTS,
  bergamoBresciaNightPath,
  getBergamoBresciaActiveNightCards,
  getBergamoBresciaNightLocalized,
  resolveBergamoBresciaNightId,
} from '../lib/bergamo-brescia/activeNights35';
import { BERGAMO_BRESCIA_VENUE_IDS, bergamoBresciaVenueBatch } from '../lib/bergamo-brescia/clubsSeed';
import { getBergamoBresciaHomeLabels35, getBergamoBresciaHubCopy35 } from '../lib/bergamo-brescia/hubCopy35';
import { BERGAMO_BRESCIA_NYE_SLUGS, getBergamoBresciaNyeContent } from '../lib/capodanno/bergamoBresciaNye35';
import { capodannoEventPath, resolveCapodannoEventBaseSlugByLocalizedSlug } from '../lib/capodanno/routes';
import { getCapodannoEventBySlug } from '../lib/capodannoEvents';
import { enabledLocaleCodes } from '../lib/i18n/locales';
import {
  getLocalizedSeoPagePath35,
  getLocalizedVenueSlug35,
  resolveSeoHubPathToCanonical,
} from '../lib/i18n/localizedSlugs35';

test('Bergamo & Brescia hub localizes natively across all 35 enabled locales without em-dashes', () => {
  assert.equal(enabledLocaleCodes.length, 35);
  assert.equal(getLocalizedSeoPagePath35('/bergamo-brescia', 'en'), '/bergamo-brescia');
  assert.equal(getLocalizedSeoPagePath35('/bergamo-brescia', 'it'), '/discoteche-bergamo-brescia');

  const uniquePaths = new Set<string>();
  for (const loc of enabledLocaleCodes) {
    const locPath = getLocalizedSeoPagePath35('/bergamo-brescia', loc);
    uniquePaths.add(`${loc}:${locPath}`);
    assert.equal(
      resolveSeoHubPathToCanonical(locPath, loc),
      '/bergamo-brescia',
      `Reverse hub lookup failed for ${loc}: ${locPath}`,
    );

    const copy = getBergamoBresciaHubCopy35(loc);
    assert.ok(copy.h1.length >= 18, `Short H1 for ${loc}`);
    assert.equal(copy.chapters.length, 4, `Expected 4 long-form chapters for ${loc}`);
    assert.equal(copy.faqs.length, 10, `Expected 10 FAQs for ${loc}`);
    assert.ok(!copy.h1.includes('\u2014') && !copy.quickAnswer.includes('\u2014'), `Em-dash in hub copy (${loc})`);

    const homeLabels = getBergamoBresciaHomeLabels35(loc);
    assert.ok(homeLabels.heading.length > 10);
    assert.ok(!homeLabels.heading.includes('\u2014') && !homeLabels.subtitle.includes('\u2014'));
  }
  assert.equal(uniquePaths.size, 35);
});

test('All 6 Bergamo & Brescia clubs, 21 active nights, and 6 Capodanno 2027 sheets resolve in 35 locales', () => {
  assert.equal(bergamoBresciaVenueBatch.length, 6);
  assert.equal(BERGAMO_BRESCIA_VENUE_IDS.length, 6);
  assert.equal(BERGAMO_BRESCIA_ACTIVE_NIGHTS.length, 21);
  assert.equal(BERGAMO_BRESCIA_NYE_SLUGS.length, 6);

  for (const venue of bergamoBresciaVenueBatch) {
    for (const loc of enabledLocaleCodes) {
      const slug = getLocalizedVenueSlug35(venue.slugs.en, loc);
      assert.ok(slug.length > 4, `Empty club slug for ${venue.id} in ${loc}`);
    }
  }

  for (const night of BERGAMO_BRESCIA_ACTIVE_NIGHTS) {
    assert.equal(night.assetKeys.length, 4, `Expected 4 assetKeys for ${night.id}`);
    for (const loc of enabledLocaleCodes) {
      const data = getBergamoBresciaNightLocalized(night.id, loc);
      assert.ok(data, `Missing localized night data for ${night.id} in ${loc}`);
      assert.equal(resolveBergamoBresciaNightId(data.slug), night.id, `Slug reverse lookup failed for ${data.slug} (${loc})`);
      assert.ok(bergamoBresciaNightPath(night.id, loc).endsWith(`/${data.slug}`));
      assert.equal(data.faqs.length, 6, `Expected 6 FAQs for ${night.id}`);
      assert.ok(!data.h1.includes('\u2014') && !data.quickAnswer.includes('\u2014'), `Em-dash in night ${night.id} (${loc})`);
    }
  }

  const refNow = new Date('2026-11-27T12:00:00+01:00');
  const activeCardsIt = getBergamoBresciaActiveNightCards('it', refNow);
  assert.equal(activeCardsIt.length, 21, 'All 21 weekly + Dec 2026 nights should be active on Nov 27, 2026');

  for (const nyeSlug of BERGAMO_BRESCIA_NYE_SLUGS) {
    const seed = getCapodannoEventBySlug(nyeSlug);
    assert.ok(seed, `Missing Capodanno seed for ${nyeSlug}`);
    assert.equal(seed.partner, false, `${nyeSlug} must have partner: false`);
    assert.equal(seed.priceFromEur, 0, `${nyeSlug} must use priceFromEur: 0 (upon request, never invented)`);

    for (const loc of enabledLocaleCodes) {
      const p = capodannoEventPath(nyeSlug, loc);
      const slugPart = p.split('/').pop()!;
      const resolved = resolveCapodannoEventBaseSlugByLocalizedSlug(slugPart, loc);
      assert.equal(resolved, nyeSlug, `Failed resolving NYE slug ${slugPart} (${loc})`);
      const content = getBergamoBresciaNyeContent(nyeSlug, loc);
      assert.ok(content && (content.customFaqs?.length || 0) >= 3, `Missing 35-locale NYE copy for ${nyeSlug} (${loc})`);
    }
  }
});

test('All 58 Bergamo & Brescia Flow assets exist with exact 1080x1350 and 1920x1080 dimensions', async () => {
  const posterPaths = new Set<string>([
    '/images/events/weekly-posters/bergamo-brescia-hub-2026.webp',
    ...BERGAMO_BRESCIA_ACTIVE_NIGHTS.map((n) => n.posterSrc),
    ...BERGAMO_BRESCIA_NYE_SLUGS.map((s) => `/images/events/capodanno-2027-posters/${s}.webp`),
    ...bergamoBresciaVenueBatch.map((v) => v.image!),
    ...bergamoBresciaVenueBatch.map((v) => v.gallery![0]!),
  ]);

  for (const rel of posterPaths) {
    const abs = path.join(process.cwd(), 'public', rel.replace(/^\//, ''));
    await access(abs);
    const meta = await sharp(abs).metadata();
    assert.equal(meta.width, 1080, `${rel} must be 1080px wide`);
    assert.equal(meta.height, 1350, `${rel} must be 1350px tall`);
  }

  for (const prefix of ['setai', 'capogiro', 'tiky', 'zeroclub', 'qiclubbing', 'numberone']) {
    for (const idx of ['01', '02', '03', '04']) {
      const rel = `/images/seo-events/master/${prefix}-${idx}.webp`;
      const abs = path.join(process.cwd(), 'public', rel.replace(/^\//, ''));
      await access(abs);
      const meta = await sharp(abs).metadata();
      assert.equal(meta.width, 1920, `${rel} must be 1920px wide`);
      assert.equal(meta.height, 1080, `${rel} must be 1080px tall`);
    }
  }
});
