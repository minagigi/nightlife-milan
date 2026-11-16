import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getBobinoNyeContent } from '../lib/capodanno/bobino35';
import { getCapodannoLocalizedEventContent } from '../lib/capodanno/i18n';
import { getCapodannoEventBySlug, getCapodannoEventForClub } from '../lib/capodannoEvents';
import { ALL_35_LOCALES } from '../lib/i18n/localizedSlugs35';
import { selectMasterAssetKeys } from '../lib/seoEventImages';
import {
  CONFIRMED_CAPODANNO_SLUGS,
  SINGLE_PASS_SKUS,
  getVenueIdByEventSlug,
} from '../lib/single-pass/catalog';

const REPO_ROOT = path.resolve(__dirname, '..');
const FORBIDDEN_LEAK_RE = /bobino\.it|371[\s\-]?408[\s\-]?5303|contact@bobino\.it|\bstripe\b/i;

test('capodanno-bobino-milano has verified BOBINO LEGENDS facts, 20:30-04:00 hours, and zero stale Buffet claims', () => {
  const ev = getCapodannoEventBySlug('capodanno-bobino-milano');
  assert.ok(ev, 'Missing capodanno-bobino-milano in CAPODANNO_EVENTS');
  assert.equal(ev.venueName, 'Bobino Milano');
  assert.equal(ev.priceFromEur, 30);
  assert.equal(ev.hours, '20:30 – 04:00');
  assert.equal(ev.startISO, '2026-12-31T20:30:00+01:00');
  assert.equal(ev.endISO, '2027-01-01T04:00:00+01:00');
  assert.match(ev.address, /Piazzale Stazione Genova,\s*4/i);
  assert.equal(ev.formulas.includes('buffet'), false, 'Bobino 2027 has no NYE buffet formula');
  assert.equal(getCapodannoEventForClub('bobino-milano')?.slug, 'capodanno-bobino-milano');

  assert.equal(CONFIRMED_CAPODANNO_SLUGS.has('capodanno-bobino-milano'), true);
  assert.equal(getVenueIdByEventSlug('capodanno-bobino-milano'), 'bobino');
  const bobinoSkus = SINGLE_PASS_SKUS.filter((s) => s.venueId === 'bobino');
  assert.equal(bobinoSkus.length, 4);
  assert.equal(bobinoSkus.find((s) => s.id === 'bobino-legends-dinner')?.basePriceCents, 12000);
  assert.equal(bobinoSkus.find((s) => s.id === 'bobino-after-dinner-party')?.basePriceCents, 3000);
  assert.equal(bobinoSkus.find((s) => s.id === 'bobino-dinner-table-keep')?.basePriceCents, 20000);
  assert.equal(bobinoSkus.find((s) => s.id === 'bobino-after-dinner-table')?.basePriceCents, 25000);

  const keys = selectMasterAssetKeys('capodanno-bobino-milano', 'Bobino Milano');
  assert.deepEqual(keys, ['bobino-milano', 'bobino-milano-cena-01', 'bobino-milano-live-01', 'bobino-milano-party-01']);

  for (const rel of [
    'public/images/events/capodanno-2027-posters/capodanno-bobino-milano.webp',
    'public/images/events/capodanno-2027-menus/bobino-nye-2027-menu-legends-120.webp',
    'public/images/events/capodanno-2027-menus/bobino-nye-2027-party-legends-30.webp',
    'public/images/seo-events/master/bobino-milano.webp',
    'public/images/seo-events/master/bobino-milano-cena-01.webp',
    'public/images/seo-events/master/bobino-milano-live-01.webp',
    'public/images/seo-events/master/bobino-milano-party-01.webp',
  ]) {
    const abs = path.join(REPO_ROOT, rel);
    assert.ok(fs.existsSync(abs), `Missing Bobino WebP asset: ${rel}`);
    assert.ok(fs.statSync(abs).size <= 300 * 1024, `Asset exceeds 300KB WhatsApp cap: ${rel}`);
  }
});

test('BOBINO LEGENDS 35-locale content matches verified dishes/DJs with zero leaks or exclamation marks', () => {
  const ev = getCapodannoEventBySlug('capodanno-bobino-milano')!;
  const it = getBobinoNyeContent('it');
  const itAll = JSON.stringify(it);
  for (const token of [
    'BOBINO LEGENDS',
    'Piazzale Stazione Genova',
    '120€',
    '30€',
    '35€',
    '40€',
    '50€',
    '200€',
    '250€',
    'Matthew Brown',
    'Roberto Milani',
    'Ferrari Maximum Brut',
    'Ribolla Gialla',
    'Pinot Nero',
    'Tortelli di zucca',
    'Grosseti',
  ]) {
    assert.ok(itAll.includes(token), `Missing IT verified token: ${token}`);
  }

  for (const locale of ALL_35_LOCALES) {
    const content = getBobinoNyeContent(locale);
    assert.equal(getCapodannoLocalizedEventContent(ev, locale).title, content.title);
    assert.equal(content.tiers.length, 4, `Expected 4 tiers for Bobino in ${locale}`);
    assert.equal(content.menus?.length, 2, `Expected 2 visual cards/menus in ${locale}`);
    assert.equal(content.schedule?.length, 5, `Expected 5 schedule steps in ${locale}`);
    const serialized = JSON.stringify(content);
    assert.equal(serialized.includes('!'), false, `Exclamation mark found in ${locale}`);
    assert.equal(serialized.includes('\u2014'), false, `Em-dash found in ${locale}`);
    assert.equal(FORBIDDEN_LEAK_RE.test(serialized), false, `Third-party/Stripe leak in ${locale}`);
  }
});

test('Stale Alzaia Naviglio Grande 116 address is completely removed across lib/ and components/', () => {
  for (const rel of [
    'components/EditorialPageSections.tsx',
    'lib/venueAuthority33.ts',
    'lib/seoStandard21Copy.ts',
    'lib/guides100Catalog.ts',
    'lib/capodannoEvents.ts',
    'lib/capodanno/bobino35.ts',
  ]) {
    const text = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    assert.equal(
      /Alzaia Naviglio Grande\s*116/i.test(text),
      false,
      `Found stale Alzaia Naviglio Grande 116 in ${rel}`,
    );
  }
});
