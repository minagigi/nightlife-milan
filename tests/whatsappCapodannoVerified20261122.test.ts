import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getCapodannoEventBySlug } from '@/lib/capodannoEvents';
import { getCapodannoLocalizedEventContent } from '@/lib/capodanno/i18n';
import { getVenueIdByEventSlug, getSkusForVenue } from '@/lib/single-pass/catalog';
import { LOCALES } from '@/lib/i18n/localeRegistry';

const REPO_ROOT = process.cwd();
const FORBIDDEN_LEAKS_RE = /327[\s.\-]?608[\s.\-]?8565|351[\s.\-]?963[\s.\-]?7758|BRAIN\s+GROUP|IT\s*17\s*M\s*08454|08454|\u2014|!/i;

test('WhatsApp-verified NYE 2027 venues (TOM, Mood Live, Coco Beach, Carroponte, Mascara, Circus, 4 TBAs) pass 35-locale hygiene & assets', () => {
  const assets = [
    'public/images/events/capodanno-2027-posters/capodanno-tom-the-ordinary-market-milano.webp',
    'public/images/events/capodanno-2027-menus/tom-nye-2027-menu-carne-pesce-150.webp',
    'public/images/events/capodanno-2027-menus/tom-nye-2027-bottle-list.webp',
    'public/images/events/capodanno-2027-posters/capodanno-lago-di-garda-sesto-senso-coco-beach.webp',
    'public/images/events/capodanno-2027-menus/coco-beach-nye-2027-menu-gala-120.webp',
    'public/images/events/capodanno-2027-posters/capodanno-mood-live-milano.webp',
    'public/images/events/capodanno-2027-menus/mood-live-garden-club-nye-2027-buffet-65.webp',
    'public/images/seo-events/master/mood-live-garden-01.webp',
    'public/images/seo-events/master/mood-live-garden-02.webp',
    'public/images/seo-events/master/mood-live-garden-03.webp',
    'public/images/seo-events/master/mood-live-garden-04.webp',
  ];
  for (const rel of assets) {
    const abs = path.join(REPO_ROOT, rel);
    assert.ok(fs.existsSync(abs), `Missing asset ${rel}`);
    assert.ok(fs.statSync(abs).size <= 300 * 1024, `Oversized asset ${rel}`);
  }

  // TOM is PARTNER -> WhatsApp only, ZERO Single Pass checkout
  const tom = getCapodannoEventBySlug('capodanno-tom-the-ordinary-market-milano');
  assert.ok(tom);
  assert.equal(tom.partner, true);
  assert.equal(tom.priceFromEur, 30);
  assert.equal(getVenueIdByEventSlug(tom.slug), null);

  // Mood Live / Garden Club is non-partner -> €65 Royal Buffet SKU
  const mood = getCapodannoEventBySlug('capodanno-mood-live-milano');
  assert.ok(mood);
  assert.equal(mood.partner, false);
  assert.equal(mood.priceFromEur, 65);
  assert.equal(getVenueIdByEventSlug(mood.slug), 'mood-live-garden');
  assert.ok(getSkusForVenue('mood-live-garden').some((s) => s.id === 'mood-live-royal-buffet-65' && s.basePriceCents === 6500));

  // Carro Social Club / Carroponte -> €55 Buffet SKU
  const carro = getCapodannoEventBySlug('capodanno-carroponte-sesto-san-giovanni');
  assert.ok(carro);
  assert.equal(carro.partner, false);
  assert.equal(carro.priceFromEur, 55);
  assert.equal(getVenueIdByEventSlug(carro.slug), 'carro-social-club');
  assert.ok(getSkusForVenue('carro-social-club').some((s) => s.id === 'carro-social-club-buffet-55' && s.basePriceCents === 5500));

  // Coco Beach -> 4 SKUs (120€, 15€, 20€, 25€)
  const coco = getCapodannoEventBySlug('capodanno-lago-di-garda-sesto-senso-coco-beach');
  assert.ok(coco);
  assert.equal(getVenueIdByEventSlug(coco.slug), 'coco-beach');
  assert.equal(getSkusForVenue('coco-beach').length, 4);

  // Circus Beatclub Closed + 4 TBAs have priceFromEur === 0 (zero fake 40/70/140 placeholders)
  for (const slug of [
    'capodanno-brescia-art-club-desenzano-circus-beatclub',
    'capodanno-volt-club-milano',
    'capodanno-the-beach-milano',
    'capodanno-oneway-club-milano',
    'capodanno-bergamo-bolgia-osio-sopra',
  ]) {
    const ev = getCapodannoEventBySlug(slug);
    assert.ok(ev, `Missing ${slug}`);
    assert.equal(ev.priceFromEur, 0, `${slug} must have priceFromEur 0`);
  }

  // 35-locale hygiene & zero leaks check across all 10 slugs
  const allSlugs = [
    'capodanno-tom-the-ordinary-market-milano',
    'capodanno-mood-live-milano',
    'capodanno-lago-di-garda-sesto-senso-coco-beach',
    'capodanno-carroponte-sesto-san-giovanni',
    'capodanno-mantova-mascara-all-music-vanita',
    'capodanno-brescia-art-club-desenzano-circus-beatclub',
    'capodanno-volt-club-milano',
    'capodanno-the-beach-milano',
    'capodanno-oneway-club-milano',
    'capodanno-bergamo-bolgia-osio-sopra',
  ];
  for (const slug of allSlugs) {
    const ev = getCapodannoEventBySlug(slug)!;
    for (const locale of LOCALES.map((l) => l.code)) {
      const content = getCapodannoLocalizedEventContent(ev, locale);
      const blob = JSON.stringify(content);
      assert.doesNotMatch(blob, FORBIDDEN_LEAKS_RE, `Forbidden leak or punctuation in ${slug} (${locale})`);
    }
  }
});
