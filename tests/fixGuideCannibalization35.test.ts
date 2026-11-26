import assert from 'node:assert/strict';
import test from 'node:test';
import { NextRequest } from 'next/server';
import { middleware } from '../middleware';
import { enabledLocaleCodes, localePrefix } from '../lib/i18n/locales';
import { getLocalizedDir35 } from '../lib/i18n/dirTokens35';
import {
  ALL_35_LOCALES,
  getExistingGuideSlug35,
  isConsolidatedNyeMasterGuideId,
  localizeInternalHref,
  resolveExistingGuideId,
} from '../lib/i18n/localizedSlugs35';
import { GUIDE_100_SLUGS_MAP } from '../lib/i18n/guideSlugs100Map';
import { LEGACY_HYBRID_GUIDE_SLUGS_TO_ID } from '../lib/i18n/legacyHybridGuideSlugs';
import { capodannoCategoryPath } from '../lib/capodanno/routes';
import { buildGuidesTaxonomySitemapEntries } from '../lib/sitemapBuilder';
import { getGuideBySlug, mockGuides } from '../lib/data';

test('consolidated generic NYE guides (g-new-years-eve-2027 & g-86) 1-hop 308 to Master Hub across all 35 locales and are excluded from sitemap-guides.xml', async () => {
  assert.equal(isConsolidatedNyeMasterGuideId('g-new-years-eve-2027'), true);
  assert.equal(isConsolidatedNyeMasterGuideId('g-86'), true);
  assert.equal(isConsolidatedNyeMasterGuideId('g-87'), false);
  assert.equal(isConsolidatedNyeMasterGuideId('g-88'), false);

  const sitemapEntries = buildGuidesTaxonomySitemapEntries();
  const sitemapUrls = sitemapEntries.map((e) => e.url);
  for (const url of sitemapUrls) {
    assert.ok(!url.includes('new-years-eve-milan-clubs-guide'), `Consolidated g-new-years-eve-2027 leaked in sitemap: ${url}`);
    assert.ok(!url.includes('guida-capodanno-milano-discoteche-cenone-tavoli'), `Consolidated IT g-new-years-eve-2027 leaked in sitemap: ${url}`);
    assert.ok(!url.includes('guida-capodanno-discoteca-milano-31-dicembre-cenone-vip'), `Consolidated IT g-86 leaked in sitemap: ${url}`);
    assert.ok(!url.includes('capodanno-31-dicembre-cenone'), `Hybrid g-86 leaked in sitemap: ${url}`);
  }

  const mkBotReq = (pathname: string, acceptLang = 'it-IT,it;q=0.9', cookie?: string) =>
    new NextRequest(`https://nightlifemilan.com${pathname}`, {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)',
        'accept-language': acceptLang,
        ...(cookie ? { cookie } : {}),
      },
    });

  for (const loc of enabledLocaleCodes) {
    const prefix = localePrefix(loc);
    const guidesDir = getLocalizedDir35('guides', loc);
    const g14Slug = getExistingGuideSlug35('g-new-years-eve-2027', loc);
    const g86Slug = getExistingGuideSlug35('g-86', loc);
    const expectedMaster = capodannoCategoryPath('capodanno-2027', loc);

    for (const src of [
      `${prefix}/${guidesDir}/${g14Slug}`,
      `${prefix}/guides/${g14Slug}`,
      `${prefix}/${guidesDir}/${g86Slug}`,
      `${prefix}/guides/${g86Slug}`,
    ]) {
      const res = await middleware(mkBotReq(src));
      assert.equal(res.status, 308, `${src} expected 308, got ${res.status}`);
      assert.equal(new URL(res.headers.get('location')!).pathname, expectedMaster, `${src} wrong target`);
      const hop2 = await middleware(mkBotReq(expectedMaster));
      assert.equal(hop2.status, 200, `${expectedMaster} did not settle to 200 on hop 2`);
      assert.equal(hop2.headers.get('location'), null);
    }

    assert.equal(localizeInternalHref(`${prefix}/guides/new-years-eve-milan-clubs-guide`, loc), expectedMaster);
    assert.equal(localizeInternalHref(`${prefix}/guides/new-years-eve-clubs-milan-december-31-vip-guide`, loc), expectedMaster);
  }

  // Human browser with Cookie: NEXT_LOCALE=it clicking explicit /en/guides/new-years-eve-milan-clubs-guide -> 1-hop 308 to EN Master Hub + NEXT_LOCALE=en
  const enExplicit = await middleware(
    new NextRequest('https://nightlifemilan.com/en/guides/new-years-eve-milan-clubs-guide', {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0',
        'accept-language': 'it-IT,it;q=0.9',
        cookie: 'NEXT_LOCALE=it',
      },
    }),
  );
  assert.equal(enExplicit.status, 308);
  assert.equal(new URL(enExplicit.headers.get('location')!).pathname, capodannoCategoryPath('capodanno-2027', 'en'));
  assert.match(enExplicit.headers.get('set-cookie') || '', /NEXT_LOCALE=en/);

  // Human browser with Accept-Language: it (no cookie) hitting unprefixed /guides/new-years-eve-milan-clubs-guide -> 1-hop straight to IT Master Hub!
  const humanRootIt = await middleware(
    new NextRequest('https://nightlifemilan.com/guides/new-years-eve-milan-clubs-guide', {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0',
        'accept-language': 'it-IT,it;q=0.9',
      },
    }),
  );
  assert.equal(new URL(humanRootIt.headers.get('location')!).pathname, capodannoCategoryPath('capodanno-2027', 'it'));
});

test('all 64 active former-hybrid guides have 0 Italian word leaks in 33 foreign locales, 1:1 mockGuides parity, and 1-hop 308 from legacy hybrid slugs', async () => {
  const forbiddenForeignItRe = /(?:^|-)(capodanno|dicembre|cenone|panoramici|vista-fuochi|compleanno|addio-al-celibato|addio-al-nubilato|eventi-aziendali|cena-cantata|cena-spettacolo|dopo-partita|dopo-concerto|parcheggi|autostrada|settimana|febbraio|ottobre|agosto|laurea)(?:-|$)/i;

  for (const loc of ALL_35_LOCALES) {
    const seenInLoc = new Map<string, string>();
    for (const g of mockGuides) {
      if (isConsolidatedNyeMasterGuideId(g.id)) continue;
      const mapSlug = getExistingGuideSlug35(g.id, loc);
      const modelSlug = g.slugs[loc];
      assert.equal(mapSlug, modelSlug, `${g.id} (${loc}) mismatch between GUIDE_100_SLUGS_MAP (${mapSlug}) and mockGuides (${modelSlug})`);
      assert.ok(!seenInLoc.has(mapSlug), `Duplicate slug in ${loc}: ${mapSlug} shared by ${seenInLoc.get(mapSlug)} and ${g.id}`);
      seenInLoc.set(mapSlug, g.id);
      if (loc !== 'it') {
        assert.equal(
          forbiddenForeignItRe.test(mapSlug),
          false,
          `${g.id} (${loc}) leaked raw Italian token in foreign slug: ${mapSlug}`,
        );
      }
      assert.equal(getGuideBySlug(mapSlug, loc)?.id, g.id);
    }
  }

  // Sample legacy hybrid slugs (g-87 DE, g-88 FR, g-60 ES, g-41 PT) -> 1-hop 308 to clean localized slug -> 200 OK
  assert.ok(Object.keys(LEGACY_HYBRID_GUIDE_SLUGS_TO_ID).length >= 1800);
  const mkBot = (p: string) =>
    new NextRequest(`https://nightlifemilan.com${p}`, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)' },
    });

  for (const [oldPath, loc, gid] of [
    ['/de/ratgeber/guide-capodanno-panoramici-vista-fuochi-mailand-vip-tische', 'de', 'g-87'],
    ['/fr/guides-pratiques/guide-capodanno-cenone-cantato-dinner-show-milan-tables-vip', 'fr', 'g-88'],
    ['/es/guias/guia-cena-spettacolo-cena-cantata-migliori-milan-mesas-vip', 'es', 'g-60'],
    ['/pt/guias/guia-laurea-bocconi-milao-mesas-vip', 'pt', 'g-41'],
  ] as const) {
    assert.equal(resolveExistingGuideId(oldPath.split('/').pop()!), gid);
    const expectedNew = `/${loc}/${getLocalizedDir35('guides', loc)}/${GUIDE_100_SLUGS_MAP[gid][loc]}`;
    const r1 = await middleware(mkBot(oldPath));
    assert.equal(r1.status, 308, `${oldPath} expected 308`);
    assert.equal(new URL(r1.headers.get('location')!).pathname, expectedNew);
    const r2 = await middleware(mkBot(expectedNew));
    assert.equal(r2.status, 200, `${expectedNew} expected 200 internal rewrite`);
    assert.equal(r2.headers.get('location'), null);
  }
});
