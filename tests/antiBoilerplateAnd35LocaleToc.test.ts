import assert from 'node:assert/strict';
import test from 'node:test';
import { ENABLED_LOCALES } from '../lib/i18n/locales';
import { getLocalizedDir35 } from '../lib/i18n/dirTokens35';
import {
  detectIsSingleGuideRoute,
  getContextualLocalePack35,
  getTocHeading35,
  getTocLabel35,
  resolveContextualSiloCards,
} from '../lib/i18n/contextualSilo35';

const BANNED_NON_PARTNER_SUBSTRINGS = [
  'alcatraz',
  'fabrique',
  'the-beach',
  'old-fashion',
  'the-sanctuary',
];

test('35-locale parity: every enabled locale has native TOC and Silo headings without English fallback', () => {
  assert.ok(ENABLED_LOCALES.length >= 35, `Expected >= 35 locales, got ${ENABLED_LOCALES.length}`);

  for (const def of ENABLED_LOCALES) {
    const code = def.code;
    const pack = getContextualLocalePack35(code);
    const tocHeading = getTocHeading35(code);

    assert.ok(tocHeading.length >= 2, `Empty TOC heading for ${code}`);
    assert.ok(pack.exploreCta.length >= 2, `Empty exploreCta for ${code}`);
    assert.equal(pack.homeOverviewPillars.length, 4, `Expected 4 home pillars for ${code}`);

    if (code !== 'en') {
      const lowToc = tocHeading.toLowerCase();
      assert.notEqual(lowToc, 'on this page', `English TOC fallback leaked onto ${code}`);
      assert.ok(!lowToc.includes('table of contents'), `English 'Table of Contents' leaked onto ${code}`);
      assert.notEqual(
        getTocLabel35(code, 'related').toLowerCase(),
        'related clubs & guides',
        `English related label leaked onto ${code}`,
      );
      assert.notEqual(
        pack.siloHeading.services.toLowerCase(),
        'complementary concierge services & official partner clubs',
        `English siloHeading leaked onto ${code}`,
      );
    }
  }
});

test('Anti-boilerplate: concise overview renders strictly on Homepage (pageKey === "/") and never on internal or undefined keys', () => {
  const homeIt = resolveContextualSiloCards('it', '/', '/it');
  assert.equal(homeIt.isHomePage, true);
  assert.equal(homeIt.cluster, 'home');

  for (const internalKey of [
    undefined,
    '',
    '/clubs',
    '/clubs/pineta-milano',
    '/vip-tables',
    '/guest-lists',
    '/single-pass',
    '/events',
    '/events/capodanno-2027',
    '/guides/guida-dress-code-milano',
  ]) {
    const model = resolveContextualSiloCards('it', internalKey, internalKey || '/it/events/test');
    assert.equal(
      model.isHomePage,
      false,
      `Expected isHomePage === false for internal key ${String(internalKey)}`,
    );
  }
});

test('Dynamic Contextual Silo: promotes only official partner clubs, excludes self-links, and flags single guides across all 35 locales', () => {
  const routes = [
    { key: '/', path: '/it' },
    { key: '/clubs/pineta-milano', path: '/it/locali/pineta-milano' },
    { key: '/zones/navigli', path: '/it/quartieri/navigli' },
    { key: '/genres/techno', path: '/it/generi/techno' },
    { key: '/vip-tables', path: '/it/vip-tables' },
    { key: '/guest-lists', path: '/it/guest-lists' },
    { key: '/events/tonight', path: '/it/events/tonight' },
  ];

  const signatures = new Set<string>();
  for (const r of routes) {
    const model = resolveContextualSiloCards('it', r.key, r.path);
    assert.equal(model.cards.length, 4, `Expected 4 contextual silo cards on ${r.key}`);
    for (const card of model.cards) {
      assert.notEqual(card.href.toLowerCase(), r.path.toLowerCase(), `Self-link detected on ${r.key}`);
      const hay = `${card.href} ${card.title}`.toLowerCase();
      for (const banned of BANNED_NON_PARTNER_SUBSTRINGS) {
        assert.ok(!hay.includes(banned), `Banned non-partner venue '${banned}' found in Silo on ${r.key}`);
      }
    }
    signatures.add(model.cards.map((c) => c.href).join('|'));
  }
  assert.ok(signatures.size >= 5, `Expected dynamic variation across route clusters, got ${signatures.size}`);

  for (const def of ENABLED_LOCALES) {
    const gDir = getLocalizedDir35('guides', def.code);
    const localizedGuidePath = `${def.code === 'en' ? '' : `/${def.code}`}/${gDir}/sample-guide-slug`;
    assert.equal(
      detectIsSingleGuideRoute(def.code, `/guides/sample-guide-slug`, localizedGuidePath),
      true,
      `Expected single guide detection for ${def.code} (${localizedGuidePath})`,
    );
    assert.equal(
      detectIsSingleGuideRoute(def.code, undefined, localizedGuidePath),
      true,
      `Expected path-only single guide detection for ${def.code} (${localizedGuidePath})`,
    );
    assert.equal(
      detectIsSingleGuideRoute(def.code, '/guides', `${def.code === 'en' ? '' : `/${def.code}`}/${gDir}`),
      false,
      `Guides hub should NOT be flagged as single guide for ${def.code}`,
    );
  }
});
