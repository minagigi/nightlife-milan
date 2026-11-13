import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { CAPODANNO_EVENTS, getCapodannoEventBySlug } from '../lib/capodannoEvents';
import { getCapodannoLocalizedEventContent } from '../lib/capodanno/i18n';
import { getRepvblicNyeContent } from '../lib/capodanno/repvblic35';
import { ALL_35_LOCALES } from '../lib/i18n/localizedSlugs35';

const REPO_ROOT = path.resolve(__dirname, '..');

test('capodanno-repvblic-milano has exact confirmed 2027 official facts and zero cenone/buffet claims', () => {
  const ev = getCapodannoEventBySlug('capodanno-repvblic-milano');
  assert.ok(ev, 'Missing capodanno-repvblic-milano event');
  assert.equal(ev.venueName, 'REPVBLIC Milano');
  assert.equal(ev.priceFromEur, 45);
  assert.equal(ev.hours, '23:00 – 05:00');
  assert.equal(ev.startISO, '2026-12-31T23:00:00+01:00');
  assert.equal(ev.endISO, '2027-01-01T05:00:00+01:00');
  assert.match(ev.address, /Piazza della Repubblica, 12.*20124 Milano/i);
  assert.equal(ev.image, '/images/events/capodanno-2027-posters/capodanno-repvblic-milano.webp');

  assert.equal(ev.tiersIt.length, 3);
  assert.equal(ev.tiersEn.length, 3);
  assert.match(ev.tiersIt[0].price, /45€/);
  assert.match(ev.tiersIt[1].price, /600€.*6/);
  assert.match(ev.tiersIt[2].price, /1\.200€.*10/);
  assert.match(ev.tiersEn[0].price, /€45/);
  assert.match(ev.tiersEn[1].price, /€600.*6/);
  assert.match(ev.tiersEn[2].price, /€1,200.*10/);

  assert.deepEqual(ev.formulas, ['dopocena', 'tavolo-vip']);
  assert.ok(!ev.subCategories.includes('capodanno-locali-cenone-milano'));

  const cenoneCat = CAPODANNO_EVENTS.filter((e) => e.subCategories.includes('capodanno-locali-cenone-milano'));
  assert.ok(!cenoneCat.some((e) => e.slug === 'capodanno-repvblic-milano'));

  const combined = [
    ev.titleIt,
    ev.titleEn,
    ev.subtitleIt,
    ev.subtitleEn,
    ev.descriptionIt,
    ev.descriptionEn,
    ev.sourceBasisIt,
    ev.sourceBasisEn,
    ev.priceSummaryIt,
    ev.priceSummaryEn,
  ].join(' ');
  assert.doesNotMatch(combined, /prezzi passati|past prices|cenone|royal buffet|mecenate|fantoli|ripamonti|dinner show/i);
});

test('capodanno-repvblic-milano localizes cleanly across all 35 supported locales', () => {
  const ev = getCapodannoEventBySlug('capodanno-repvblic-milano');
  assert.ok(ev);
  assert.equal(ALL_35_LOCALES.length, 35);

  for (const locale of ALL_35_LOCALES) {
    const pack = getRepvblicNyeContent(locale);
    const localized = getCapodannoLocalizedEventContent(ev, locale);
    assert.ok(pack.title.length > 10, `Empty title for ${locale}`);
    assert.equal(localized.title, pack.title);
    assert.equal(localized.tiers.length, 3, `Expected 3 tiers for ${locale}`);
    assert.match(localized.priceSummary, /45/);
    assert.match(localized.priceSummary, /600/);
    assert.match(localized.priceSummary, /1[\s.,]?200/);
    assert.ok(localized.sourceBasis.includes('+39 351 912 7047'), `Missing WhatsApp for ${locale}`);
    assert.doesNotMatch(
      [localized.title, localized.subtitle, localized.description, localized.priceSummary, localized.sourceBasis].join(' '),
      /mecenate|fantoli|ripamonti|prezzi passati|past prices|dinner show|royal buffet/i
    );
  }
});

test('REPVBLIC Capodanno 2027 official poster exists and stays under 300KB', () => {
  const posterPath = path.join(REPO_ROOT, 'public/images/events/capodanno-2027-posters/capodanno-repvblic-milano.webp');
  assert.ok(fs.existsSync(posterPath), 'Missing Couture Noir WebP poster');
  const stat = fs.statSync(posterPath);
  assert.ok(stat.size > 10_000 && stat.size <= 300 * 1024, `Unexpected poster size: ${stat.size}`);
});

test('no stale Mecenate/Fantoli/Dinner Show strings remain on REPVBLIC cards across repo surfaces', () => {
  const filesToCheck = [
    'components/OctoberEntry.tsx',
    'components/GlobalSearch.tsx',
    'components/EditorialPageSections.tsx',
    'components/VibeFinder.tsx',
    'lib/venuesData.ts',
    'public/llms.txt',
    'public/llms-full.txt',
  ];
  for (const rel of filesToCheck) {
    const content = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i += 1) {
      if (!/repvblic/i.test(lines[i])) continue;
      // Skip multi-venue aggregate sentences (e.g. "1. Just Me ... 6. Repvblic")
      if (/just me.*pineta/i.test(lines[i])) continue;
      // Only inspect lines inside the same object/bullet before the next entry opens
      const slice: string[] = [lines[i]];
      for (let j = i + 1; j < Math.min(lines.length, i + 6); j += 1) {
        if (/^\s*\{|\bname\s*:|\bv-armani|\bv-gattopardo|\bv-pineta|\bv-justme|\bv-55milano|\bfabrique\b/i.test(lines[j])) break;
        slice.push(lines[j]);
      }
      const nearby = slice.join(' ');
      if (/just me.*pineta/i.test(nearby)) continue;
      assert.doesNotMatch(
        nearby,
        /via mecenate|via fantoli|fantoli 9|ripamonti \/ mecenate|dinner show.*repvblic|repvblic.*dinner show/i,
        `Stale REPVBLIC reference in ${rel}:${i + 1}`
      );
    }
  }
});
