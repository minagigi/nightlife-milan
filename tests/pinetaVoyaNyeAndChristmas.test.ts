import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getCapodannoEventBySlug } from '../lib/capodannoEvents';
import { getCapodannoLocalizedEventContent } from '../lib/capodanno/i18n';
import { getPaymentTerms35 } from '../lib/capodanno/paymentTerms35';
import { getPinetaNyeContent } from '../lib/capodanno/pineta35';
import { getVoyaNyeContent } from '../lib/capodanno/voya35';
import {
  CHRISTMAS_VOYA_SLUGS_35,
  christmasVoyaPath,
  getChristmasVoyaContent,
} from '../lib/christmas/voya35';
import { enabledLocaleCodes } from '../lib/i18n/localeRegistry';
import { buildEventsSitemapEntries } from '../lib/sitemapBuilder';

const REPO_ROOT = path.resolve(__dirname, '..');

test('Pineta NYE 2027 has €40 buffet & club entry, €160 Gala, 6 VIP tables, and Xceed link across all 35 locales', () => {
  const ev = getCapodannoEventBySlug('capodanno-pineta-milano');
  assert.ok(ev, 'Missing capodanno-pineta-milano event');
  assert.equal(ev.priceFromEur, 40);
  assert.equal(ev.hours, '20:30 – 05:00');
  assert.equal(
    ev.xceedUrl,
    'https://xceed.me/en/milano/event/capodanno-2027-moulin-rouge-pineta-club-milano/252170/channel/nightlifemilan-1',
  );
  assert.equal(ev.tiersIt.length, 9);
  assert.equal(ev.tiersEn.length, 9);

  for (const loc of enabledLocaleCodes) {
    const content = getPinetaNyeContent(loc);
    const localized = getCapodannoLocalizedEventContent(ev, loc);
    assert.equal(localized.title, content.title);
    assert.equal(content.tiers.length, 9, `Expected 9 Pineta tiers for ${loc}`);
    assert.equal(content.menus?.length, 2, `Expected 2 Pineta menus for ${loc}`);
    assert.equal(content.schedule?.length, 6, `Expected 6 schedule steps for ${loc}`);

    const joined = [
      content.title,
      content.subtitle,
      content.description,
      content.priceSummary,
      ...content.tiers.map((t) => `${t.label} ${t.price}`),
      ...(content.menus || []).map((m) => `${m.title} ${m.price}`),
    ].join(' ');

    assert.match(joined, /Moulin Rouge|红磨坊|مولان روج/i, `Missing Moulin Rouge theme in ${loc}`);
    for (const token of [/40/, /160/, /300/, /600/, /900/, /1[.,]?000/, /1[.,]?200/, /1[.,]?500/]) {
      assert.match(joined, token, `Missing Pineta tier token ${token} in ${loc}`);
    }
  }
});

test('Voya NYE 2027 has single confirmed €300 rate, 6+ courses, Christmas link, and zero stale prices across 35 locales', () => {
  const ev = getCapodannoEventBySlug('capodanno-voya-rooftop-milano');
  assert.ok(ev, 'Missing capodanno-voya-rooftop-milano event');
  assert.equal(ev.priceFromEur, 300);
  assert.equal(ev.tiersIt.length, 1);
  assert.equal(ev.tiersEn.length, 1);

  const stalePriceRe =
    /\b(?:70|80|140|190|280|350|1[.,]?200|2[.,]?500)\s*€|€\s*(?:70|80|140|190|280|350|1[.,]?200|2[.,]?500)\b/;

  for (const loc of enabledLocaleCodes) {
    const content = getVoyaNyeContent(loc);
    const localized = getCapodannoLocalizedEventContent(ev, loc);
    assert.equal(localized.title, content.title);
    assert.equal(content.tiers.length, 1, `Expected single tier for Voya NYE in ${loc}`);
    assert.equal(content.menus?.length, 1, `Expected 1 menu card for Voya NYE in ${loc}`);
    assert.ok((content.menus?.[0].courses.length || 0) >= 6, `Expected >= 6 Voya NYE courses in ${loc}`);
    assert.equal(content.relatedHolidayBanner?.href, christmasVoyaPath(loc));

    const combined = [
      content.title,
      content.subtitle,
      content.description,
      content.priceSummary,
      content.sourceBasis,
      ...content.tiers.map((t) => `${t.label} ${t.price} ${t.details}`),
      ...(content.menus || []).map((m) => `${m.title} ${m.price} ${m.beverages}`),
    ].join(' ');

    assert.match(combined, /300/, `Missing 300€ rate in Voya NYE ${loc}`);
    assert.match(combined, /85|20/, `Missing 20th floor / 85m mention in Voya NYE ${loc}`);
    assert.doesNotMatch(combined, stalePriceRe, `Stale unconfirmed Voya NYE price found in ${loc}`);
  }
});

test('Voya Christmas 2026 covers 35 unique slugs, €100 5-course menu, zero invented hours, and sitemap inclusion', () => {
  assert.equal(Object.keys(CHRISTMAS_VOYA_SLUGS_35).length, 35);
  const paths35 = enabledLocaleCodes.map((loc) => christmasVoyaPath(loc));
  assert.equal(new Set(paths35).size, 35, 'Expected 35 unique localized Voya Christmas paths');

  const inventedHoursRe = /\b(?:12|13|14|15|19|20|21|22)[:.][03]0\b/;

  for (const loc of enabledLocaleCodes) {
    const c = getChristmasVoyaContent(loc);
    assert.equal(c.courses.length, 5, `Expected 5 Christmas courses in ${loc}`);
    const coreCopy = [c.title, c.subtitle, c.description, c.scheduleValue, c.priceCardDetails].join(' ');
    assert.doesNotMatch(coreCopy, inventedHoursRe, `Invented clock hour found in Voya Christmas ${loc}`);

    const withMeta = [coreCopy, c.priceBadge, c.priceCardAmount, c.highlights.join(' '), c.bookingSubtitle].join(' ');
    assert.match(withMeta, /100/, `Missing €100 price in Voya Christmas ${loc}`);
    assert.match(withMeta, /\+39 351 912 7047|24\/7|24/, `Missing 24/7 WhatsApp concierge in Voya Christmas ${loc}`);
  }

  const sitemapUrls = new Set(buildEventsSitemapEntries().map((entry) => entry.url));
  for (const relPath of paths35) {
    const fullUrl = `https://nightlifemilan.com${relPath}`;
    assert.ok(sitemapUrls.has(fullUrl), `Missing Voya Christmas URL in sitemap: ${fullUrl}`);
  }
});

test('6-step 100% prepayment protocol is present and accurate across all 35 locales', () => {
  for (const loc of enabledLocaleCodes) {
    const terms = getPaymentTerms35(loc);
    assert.equal(terms.steps.length, 6, `Expected 6 payment steps in ${loc}`);
    assert.ok(terms.steps[0].includes('+39 351 912 7047'), `Step 1 missing WhatsApp number in ${loc}`);
    assert.ok(terms.steps[3].includes('+39 351 912 7047'), `Step 4 missing WhatsApp number in ${loc}`);
    assert.match(terms.steps[0], /24/, `Step 1 missing 24/7 response mention in ${loc}`);
    assert.match(terms.steps[2], /100%|%100/, `Step 3 missing 100% prepayment in ${loc}`);
    assert.match(terms.steps[2], /Stripe/i, `Step 3 missing Stripe in ${loc}`);
    assert.match(terms.methodsBadge, /100%|%100/, `methodsBadge missing 100% in ${loc}`);
    assert.match(terms.methodsBadge, /Stripe/i, `methodsBadge missing Stripe in ${loc}`);
  }
});

test('All 10 bonified Pineta & Voya WebP poster and menu assets exist within budget', () => {
  const posters = [
    'public/images/events/capodanno-2027-posters/capodanno-pineta-milano.webp',
    'public/images/events/capodanno-2027-posters/capodanno-voya-rooftop-milano.webp',
    'public/images/events/christmas-2026-posters/natale-voya-rooftop-milano-2026.webp',
  ];
  const menus = [
    'public/images/events/capodanno-2027-menus/pineta-nye-2027-programma.webp',
    'public/images/events/capodanno-2027-menus/pineta-nye-2027-menu-gala-160.webp',
    'public/images/events/capodanno-2027-menus/pineta-nye-2027-menu-buffet-40.webp',
    'public/images/events/capodanno-2027-menus/voya-nye-2027-menu-it.webp',
    'public/images/events/capodanno-2027-menus/voya-nye-2027-menu-en.webp',
    'public/images/events/christmas-2026-menus/voya-natale-2026-menu-it.webp',
    'public/images/events/christmas-2026-menus/voya-natale-2026-menu-en.webp',
  ];

  for (const rel of posters) {
    const abs = path.join(REPO_ROOT, rel);
    assert.ok(fs.existsSync(abs), `Missing poster WebP: ${rel}`);
    const stat = fs.statSync(abs);
    assert.ok(stat.size > 8_000 && stat.size <= 300 * 1024, `Poster size out of range for ${rel}: ${stat.size}`);
  }
  for (const rel of menus) {
    const abs = path.join(REPO_ROOT, rel);
    assert.ok(fs.existsSync(abs), `Missing menu WebP: ${rel}`);
    const stat = fs.statSync(abs);
    assert.ok(stat.size > 8_000, `Menu asset too small for ${rel}: ${stat.size}`);
  }
});
