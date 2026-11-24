import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {
  CAPODANNO_EVENTS,
  getCapodannoEventBySlug,
  getCapodannoEventForClub,
} from '../lib/capodannoEvents';
import { getBischeriNyeContent } from '../lib/capodanno/bischeri35';
import {
  GATE_NYE_OFFER_PRICES_EUR,
  getGateNyeContent,
  getGateNyePageCopy,
} from '../lib/capodanno/gate35';
import { getCapodannoLocalizedEventContent } from '../lib/capodanno/i18n';
import { CAPODANNO_EVENT_BASE_SLUGS, capodannoEventPath } from '../lib/capodanno/routes';
import { getTomNyeContent } from '../lib/capodanno/tom35';
import { getChurch81NyeContent, getFiftyFiveNyeContent } from '../lib/capodanno/church81And55_35';
import { getCarlsbergOlNyeContent } from '../lib/capodanno/carlsbergOl35';
import { getVenueIdByEventSlug } from '../lib/single-pass/catalog';
import {
  ALL_35_LOCALES,
  resolveLegacyOrExpiredEventRedirect,
} from '../lib/i18n/localizedSlugs35';

const REPO_ROOT = path.resolve(__dirname, '..');
const FORBIDDEN_THIRD_PARTY_RE = /331[\s\-]?478[\s\-]?8258|umberto-falcone|perreoxl\.com|origgigallery|gatemilano\.it/i;

test('Capodanno 2027 catalog reconciled cleanly to 125 events (T-032 + WA Audit + Church 81 - Stage Entertainment takedown)', () => {
  assert.equal(CAPODANNO_EVENT_BASE_SLUGS.length, 125);
  assert.equal(CAPODANNO_EVENTS.length, 125);
  assert.ok(CAPODANNO_EVENT_BASE_SLUGS.includes('capodanno-carlsberg-ol-milano'));
  assert.ok(CAPODANNO_EVENT_BASE_SLUGS.includes('capodanno-bischeri-milano'));
  assert.ok(CAPODANNO_EVENT_BASE_SLUGS.includes('capodanno-tom-the-ordinary-market-milano'));
  assert.ok(CAPODANNO_EVENT_BASE_SLUGS.includes('capodanno-gate-milano'));
  assert.ok(CAPODANNO_EVENT_BASE_SLUGS.includes('capodanno-church-81-milano'));

  for (const rel of [
    'components/OctoberEntry.tsx',
    'lib/capodannoEvents.ts',
    'lib/capodanno/i18n.ts',
    'lib/seoEventImages.ts',
  ]) {
    const txt = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    assert.doesNotMatch(
      txt,
      /(?:113\s+(?:event|événements|eventos|silvester)|73\s+(?:locali|milan\s+venues|milan\s+clubs)|\(73\))/i,
      `Found stale 113/73 count in ${rel}`,
    );
  }
});

test('capodanno-bischeri-milano has confirmed 140€ Terra/Mare menus, 40€ dopocena, DJ Gigi Zeus, and assets', () => {
  const ev = getCapodannoEventBySlug('capodanno-bischeri-milano');
  assert.ok(ev, 'Missing capodanno-bischeri-milano');
  assert.equal(ev.venueName, 'Bischeri Milano');
  assert.equal(ev.priceFromEur, 40);
  assert.equal(ev.hours, '20:30 – 05:00');
  assert.equal(ev.startISO, '2026-12-31T20:30:00+01:00');
  assert.equal(ev.endISO, '2027-01-01T05:00:00+01:00');
  assert.equal(ev.xceedUrl, undefined);
  assert.match(ev.address, /Viale Gorizia 8/i);
  assert.equal(getCapodannoEventForClub('bischeri-milano')?.slug, 'capodanno-bischeri-milano');

  const posterPath = path.join(REPO_ROOT, 'public/images/events/capodanno-2027-posters/capodanno-bischeri-milano.webp');
  assert.ok(fs.existsSync(posterPath));
  assert.ok(fs.statSync(posterPath).size <= 300 * 1024);

  for (const mFile of [
    'public/images/events/capodanno-2027-menus/bischeri-nye-2027-menu-terra-140.webp',
    'public/images/events/capodanno-2027-menus/bischeri-nye-2027-menu-mare-140.webp',
    'public/images/seo-events/master/bischeri-milano-01.webp',
    'public/images/seo-events/master/bischeri-milano-02.webp',
    'public/images/seo-events/master/bischeri-milano-03.webp',
    'public/images/seo-events/master/bischeri-milano-04.webp',
  ]) {
    const p = path.join(REPO_ROOT, mFile);
    assert.ok(fs.existsSync(p), `Missing asset ${mFile}`);
  }

  for (const locale of ALL_35_LOCALES) {
    const content = getBischeriNyeContent(locale);
    assert.equal(getCapodannoLocalizedEventContent(ev, locale).title, content.title);
    assert.equal(content.tiers.length, 2, `Expected 2 tiers for Bischeri in ${locale}`);
    assert.equal(content.menus?.length, 2, `Expected 2 menus for Bischeri in ${locale}`);
    assert.equal(content.menus?.[0]?.courses.length, 4);
    assert.equal(content.menus?.[1]?.courses.length, 4);
    assert.equal(content.schedule?.length, 4);
    const allStr = [
      content.title,
      content.subtitle,
      content.description,
      content.priceSummary,
      content.sourceBasis,
      ...content.tiers.flatMap((t) => [t.label, t.price, t.details]),
      ...content.menus!.flatMap((m) => [m.title, m.subtitle, m.beverages, ...m.courses.map((c) => `${c.course} ${c.dish}`)]),
    ].join(' ');
    assert.doesNotMatch(allStr, /!/, `Unexpected exclamation mark in bischeri35 (${locale})`);
    assert.doesNotMatch(allStr, FORBIDDEN_THIRD_PARTY_RE, `Third-party contact leak in bischeri35 (${locale})`);
  }
});

test('capodanno-gate-milano (PERREO XL) is party-only across 35 locales with zero third-party leaks', () => {
  const ev = getCapodannoEventBySlug('capodanno-gate-milano');
  assert.ok(ev, 'Missing capodanno-gate-milano');
  assert.equal(ev.venueName, 'Gate Milano');
  assert.equal(ev.priceFromEur, 20);
  assert.equal(ev.hours, '23:00 – 05:00');
  assert.equal(ev.startISO, '2026-12-31T23:00:00+01:00');
  assert.equal(ev.endISO, '2027-01-01T05:00:00+01:00');
  assert.equal(ev.xceedUrl, undefined);
  assert.match(ev.address, /Via Valtellina 21/i);
  assert.deepEqual(ev.formulas, ['dopocena', 'tavolo-vip']);
  assert.ok(!ev.subCategories.includes('capodanno-locali-cenone-milano'));
  assert.ok(!ev.subCategories.includes('capodanno-techno-elettronica-milano'));
  assert.ok(ev.subCategories.includes('capodanno-latino-reggaeton-hiphop-milano'));

  const posterPath = path.join(REPO_ROOT, 'public/images/events/capodanno-2027-posters/capodanno-gate-milano.webp');
  assert.ok(fs.existsSync(posterPath));
  assert.ok(fs.statSync(posterPath).size <= 300 * 1024);

  for (const locale of ALL_35_LOCALES) {
    const content = getGateNyeContent(locale);
    const pageCopy = getGateNyePageCopy(locale);
    assert.equal(getCapodannoLocalizedEventContent(ev, locale).title, content.title);
    assert.equal(content.tiers.length, GATE_NYE_OFFER_PRICES_EUR.length);
    assert.equal(pageCopy.shots.length, 4);
    const combined = [
      content.title,
      content.subtitle,
      content.description,
      content.musicAndFormat,
      content.priceSummary,
      content.sourceBasis,
      ...content.tiers.flatMap((t) => [t.label, t.price, t.details]),
      pageCopy.alertTitle,
      pageCopy.alertBody,
      pageCopy.bookingSubtitle,
      ...pageCopy.shots,
    ].join(' ');
    assert.doesNotMatch(combined, /cenone|royal buffet|dinner|bottigl|bottle|sold out|!/i, `Invalid copy in gate35 (${locale})`);
    assert.doesNotMatch(combined, FORBIDDEN_THIRD_PARTY_RE, `Third-party contact leak in gate35 (${locale})`);
  }
});

test('capodanno-tom-the-ordinary-market-milano resolves cleanly with The Midnight Ball and master images', () => {
  const ev = getCapodannoEventBySlug('capodanno-tom-the-ordinary-market-milano');
  assert.ok(ev, 'Missing capodanno-tom-the-ordinary-market-milano');
  assert.equal(ev.venueName, 'TOM. The Ordinary Market');
  assert.equal(ev.priceFromEur, 30);
  assert.equal(ev.partner, true);
  assert.equal(getVenueIdByEventSlug('capodanno-tom-the-ordinary-market-milano'), null);
  assert.equal(ev.hours, '20:30 – 05:00');
  assert.equal(ev.xceedUrl, undefined);
  assert.match(ev.address, /Via Molino delle Armi 16/i);
  assert.equal(getCapodannoEventForClub('tom-milano')?.slug, 'capodanno-tom-the-ordinary-market-milano');

  const shortRedirect = resolveLegacyOrExpiredEventRedirect('capodanno-tom-milano-2027', 'it');
  assert.equal(shortRedirect, capodannoEventPath('capodanno-tom-the-ordinary-market-milano', 'it'));

  for (const rel of [
    'public/images/events/capodanno-2027-posters/capodanno-tom-the-ordinary-market-milano.webp',
    'public/images/seo-events/master/tom-milano-01.webp',
    'public/images/seo-events/master/tom-milano-02.webp',
    'public/images/seo-events/master/tom-milano-03.webp',
    'public/images/seo-events/master/tom-milano-04.webp',
  ]) {
    assert.ok(fs.existsSync(path.join(REPO_ROOT, rel)), `Missing TOM asset ${rel}`);
  }

  for (const locale of ALL_35_LOCALES) {
    const content = getTomNyeContent(locale);
    assert.equal(getCapodannoLocalizedEventContent(ev, locale).title, content.title);
    assert.equal(content.tiers.length, 3);
    assert.match(content.title, /Midnight Ball/i);
    const combined = [
      content.title,
      content.subtitle,
      content.description,
      content.priceSummary,
      content.sourceBasis,
      ...content.tiers.flatMap((t) => [t.label, t.price, t.details]),
    ].join(' ');
    assert.doesNotMatch(combined, /!/, `Unexpected exclamation mark in tom35 (${locale})`);
    assert.doesNotMatch(combined, FORBIDDEN_THIRD_PARTY_RE, `Third-party contact leak in tom35 (${locale})`);
  }
});

test('October inventory entry 247797 carries remediated NYE Perreo XL poster with matching SHA-256', () => {
  const invPath = path.join(REPO_ROOT, 'lib/october-events/inventory.json');
  const inv = JSON.parse(fs.readFileSync(invPath, 'utf8'));
  const entry = (inv.events || []).find((e: { id?: string }) => String(e.id) === '247797');
  assert.ok(entry?.image?.src, 'Missing Xceed event 247797 image in inventory.json');
  const diskPath = path.join(REPO_ROOT, 'public', entry.image.src.replace(/^\/+/, ''));
  assert.ok(fs.existsSync(diskPath), `Missing inventory poster at ${diskPath}`);
  const bytes = fs.readFileSync(diskPath);
  assert.ok(bytes.length <= 300 * 1024);
  const sha = crypto.createHash('sha256').update(bytes).digest('hex');
  assert.equal(entry.image.sha256, sha);
});

test('capodanno-church-81-milano & capodanno-55-milano (La Dolce Vita 2027) pass 35-locale hygiene, assets & WA-only bounds', () => {
  const ch = getCapodannoEventBySlug('capodanno-church-81-milano');
  assert.ok(ch, 'Missing capodanno-church-81-milano');
  assert.equal(ch.priceFromEur, 90);
  assert.equal(ch.hours, '20:30 – 04:00');
  assert.equal(ch.partner, false);
  assert.match(ch.address, /Via della Chiesa Rossa 81/i);
  assert.equal(getCapodannoEventForClub('church-81')?.slug, 'capodanno-church-81-milano');
  assert.equal(getVenueIdByEventSlug('capodanno-church-81-milano'), null);

  const ff = getCapodannoEventBySlug('capodanno-55-milano');
  assert.ok(ff, 'Missing capodanno-55-milano');
  assert.equal(ff.priceFromEur, 30);
  assert.equal(ff.hours, '20:30 – 05:00');
  assert.equal(ff.partner, true);
  assert.equal(getVenueIdByEventSlug('capodanno-55-milano'), null);

  for (const rel of [
    'public/images/events/capodanno-2027-posters/capodanno-church-81-milano.webp',
    'public/images/events/capodanno-2027-menus/church-81-nye-2027-menu-pesce-90.webp',
    'public/images/events/capodanno-2027-menus/church-81-nye-2027-menu-carne-90.webp',
    'public/images/events/capodanno-2027-posters/capodanno-55-milano.webp',
    'public/images/events/capodanno-2027-menus/55-milano-nye-2027-menu-gala-160.webp',
    'public/images/events/capodanno-2027-menus/55-milano-nye-2027-menu-buffet-100.webp',
  ]) {
    const p = path.join(REPO_ROOT, rel);
    assert.ok(fs.existsSync(p), `Missing asset ${rel}`);
    assert.ok(fs.statSync(p).size <= 300 * 1024, `Oversized asset ${rel}`);
  }

  for (const locale of ALL_35_LOCALES) {
    const cCh = getChurch81NyeContent(locale);
    const cFf = getFiftyFiveNyeContent(locale);
    assert.equal(getCapodannoLocalizedEventContent(ch, locale).title, cCh.title);
    assert.equal(getCapodannoLocalizedEventContent(ff, locale).title, cFf.title);
    assert.equal(cCh.tiers.length, 2);
    assert.equal(cCh.menus?.length, 2);
    assert.equal(cFf.tiers.length, 5);
    assert.equal(cFf.menus?.length, 2);
    const blob = JSON.stringify({ cCh, cFf });
    assert.doesNotMatch(blob, /!/, `Unexpected exclamation mark in church81And55 (${locale})`);
    assert.doesNotMatch(blob, /\u2014|335\s*529\s*0025|capodannodimilano|\bstripe\b|70[–-]75|130[–-]140/i, `Forbidden token in church81And55 (${locale})`);
  }
});


test('capodanno-carlsberg-ol-milano passes 35-locale hygiene, €75 all-in menu & WA-only bounds', () => {
  const cb = getCapodannoEventBySlug('capodanno-carlsberg-ol-milano');
  assert.ok(cb, 'Missing capodanno-carlsberg-ol-milano');
  assert.equal(cb.priceFromEur, 75);
  assert.equal(cb.hours, '20:30 – 03:00');
  assert.equal(cb.partner, false);
  assert.match(cb.address, /Bastioni di Porta Nuova 9/i);
  assert.equal(getCapodannoEventForClub('carlsberg-ol')?.slug, 'capodanno-carlsberg-ol-milano');
  assert.equal(getVenueIdByEventSlug('capodanno-carlsberg-ol-milano'), null);

  for (const rel of [
    'public/images/events/capodanno-2027-posters/capodanno-carlsberg-ol-milano.webp',
    'public/images/events/cards-4x5/capodanno-2027-posters/capodanno-carlsberg-ol-milano.webp',
    'public/images/events/capodanno-2027-menus/carlsberg-ol-nye-2027-menu-cenone-75.webp',
    'public/images/seo-events/master/carlsberg-ol-01.webp',
    'public/images/seo-events/master/carlsberg-ol-02.webp',
    'public/images/seo-events/master/carlsberg-ol-03.webp',
    'public/images/seo-events/master/carlsberg-ol-04.webp',
  ]) {
    const p = path.join(REPO_ROOT, rel);
    assert.ok(fs.existsSync(p), `Missing asset ${rel}`);
    assert.ok(fs.statSync(p).size <= 300 * 1024, `Oversized asset ${rel}`);
  }

  for (const locale of ALL_35_LOCALES) {
    const cCb = getCarlsbergOlNyeContent(locale);
    assert.equal(getCapodannoLocalizedEventContent(cb, locale).title, cCb.title);
    assert.equal(cCb.tiers.length, 1);
    assert.equal(cCb.menus?.length, 1);
    assert.equal(cCb.menus?.[0]?.courses.length, 5);
    assert.deepEqual(cCb.offerPricesEur, [75]);
    const blob = JSON.stringify(cCb);
    assert.doesNotMatch(blob, /!/, `Unexpected exclamation mark in carlsbergOl35 (${locale})`);
    assert.doesNotMatch(blob, /\u2014|335\s*529\s*0025|capodannodimilano|\bstripe\b|commissione|commission/i, `Forbidden token in carlsbergOl35 (${locale})`);
  }
});
