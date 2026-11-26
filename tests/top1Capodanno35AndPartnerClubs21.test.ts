import assert from 'node:assert/strict';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { NextRequest } from 'next/server';
import sharp from 'sharp';
import { CAPODANNO_MASTER_SEO_35, getCapodannoMasterSeo35 } from '../lib/capodanno/capodannoMasterSeo35';
import { capodannoCategoryPath, capodannoEventPath } from '../lib/capodanno/routes';
import { getCapodannoEventForClub } from '../lib/capodannoEvents';
import {
  buildClubHighCtrDescription,
  buildClubHighCtrTitle,
  OFFICIAL_SERP_NAME_BY_ID,
} from '../lib/clubSeoMeta35';
import { mockVenues } from '../lib/data';
import { getLocalizedDir35 } from '../lib/i18n/dirTokens35';
import { enabledLocaleCodes, localePrefix } from '../lib/i18n/locales';
import { getLocalizedVenueSlug35, SLUG_TOKENS_35 } from '../lib/i18n/localizedSlugs35';
import { generateClubSchema, getLocalizedText } from '../lib/seo';
import { buildCoreHubSitemapEntries, buildEventsSitemapEntries } from '../lib/sitemapBuilder';
import {
  buildCityQualifiedVenueH1,
  buildVenueAuthorityFaqs,
  getVenueAuthoritySpec,
} from '../lib/venueAuthority33';
import { middleware } from '../middleware';

const OFFICIAL_21_PARTNER_SPECS = [
  { id: 'v-justme', stem: 'Just Me', capSlug: 'capodanno-justme-milano-torre-branca' },
  { id: 'v-pineta', stem: 'Pineta', capSlug: 'capodanno-pineta-milano' },
  { id: 'v-voya', stem: 'Voya Rooftop', capSlug: 'capodanno-voya-rooftop-milano' },
  { id: 'v-repvblic', stem: 'REPVBLIC', capSlug: 'capodanno-repvblic-milano' },
  { id: 'v-55milano', stem: '55 Milano', capSlug: 'capodanno-55-milano' },
  { id: 'v-magazzini', stem: 'Magazzini Generali', capSlug: 'capodanno-magazzini-generali-milano' },
  { id: 'v-bobino', stem: 'Bobino', capSlug: 'capodanno-bobino-milano' },
  { id: 'v-theclub', stem: 'The Club', capSlug: 'capodanno-the-club-milano' },
  { id: 'v-carlsbergol', stem: 'Carlsberg Øl', capSlug: 'capodanno-carlsberg-ol-milano' },
  { id: 'v-tocqueville', stem: 'Tocqueville 13', capSlug: 'capodanno-tocqueville-13-milano' },
  { id: 'v-tom', stem: 'TOM. The Ordinary Market', capSlug: 'capodanno-tom-the-ordinary-market-milano' },
  { id: 'v-mibmilano', stem: 'MIB', capSlug: 'capodanno-mib-milano-piazza-affari' },
  { id: 'v-dazi', stem: 'Dazi', capSlug: 'capodanno-dazi-milano-arco-della-pace' },
  { id: 'v-bischeri', stem: 'I Bischeri', capSlug: 'capodanno-bischeri-milano' },
  { id: 'v-gate', stem: 'Gate', capSlug: 'capodanno-gate-milano' },
  { id: 'v-pelledoca', stem: 'Pelledoca', capSlug: 'capodanno-pelledoca-milano' },
  { id: 'v-aria', stem: 'Aria Club', capSlug: 'capodanno-aria-club-milano' },
  { id: 'v-hollywood', stem: 'Hollywood', capSlug: 'capodanno-hollywood-milano' },
  { id: 'v-11clubroom', stem: '11Clubroom', capSlug: 'capodanno-11clubroom-milano' },
  { id: 'v-gattopardo', stem: 'Il Gattopardo', capSlug: 'capodanno-il-gattopardo-milano' },
  { id: 'v-justme-garda', stem: 'JustMe Garda Lake', capSlug: 'capodanno-justme-garda-lake' },
] as const;

test('Deliverable A: CAPODANNO_MASTER_SEO_35 puts native Capodanno Milano keyword at index 0 across all 35 languages', () => {
  assert.equal(enabledLocaleCodes.length, 35);
  const seenTitles = new Set<string>();

  for (const loc of enabledLocaleCodes) {
    const entry = CAPODANNO_MASTER_SEO_35[loc];
    assert.ok(entry, `Missing CAPODANNO_MASTER_SEO_35 entry for ${loc}`);
    assert.equal(getCapodannoMasterSeo35(loc), entry);

    assert.ok(
      entry.metaTitle.startsWith(entry.primaryKeyword),
      `${loc} metaTitle "${entry.metaTitle}" must start at index 0 with "${entry.primaryKeyword}"`,
    );
    assert.ok(
      entry.h1.startsWith(entry.primaryKeyword),
      `${loc} h1 "${entry.h1}" must start at index 0 with "${entry.primaryKeyword}"`,
    );
    const minLen = loc === 'zh' ? 28 : 44;
    assert.ok(
      entry.metaTitle.length >= minLen && entry.metaTitle.length <= 62,
      `${loc} metaTitle length ${entry.metaTitle.length} outside [${minLen}..62]: "${entry.metaTitle}"`,
    );
    assert.ok(
      entry.metaDescription.length >= 115 && entry.metaDescription.length <= 160,
      `${loc} metaDescription length ${entry.metaDescription.length} outside [115..160]: "${entry.metaDescription}"`,
    );
    assert.ok(
      entry.metaDescription.includes('+39 351 912 7047'),
      `${loc} metaDescription missing official WhatsApp +39 351 912 7047`,
    );
    for (const field of [
      entry.metaTitle,
      entry.metaDescription,
      entry.h1,
      entry.footerAnchor,
      entry.partnerTitle,
      entry.partnerIntro,
    ]) {
      assert.ok(!field.includes('!'), `${loc} contains exclamation mark: "${field}"`);
      assert.ok(!field.includes('\u2014'), `${loc} contains em-dash: "${field}"`);
    }
    assert.ok(!seenTitles.has(entry.metaTitle), `Duplicate metaTitle across locales: "${entry.metaTitle}"`);
    seenTitles.add(entry.metaTitle);
  }
});

test('Deliverable A: /new-years-eve and duplicate mockEvents consolidate in 1-hop 308 across all 35 locales with zero sitemap leaks', async () => {
  const mkBotReq = (pathname: string) =>
    new NextRequest(`https://nightlifemilan.com${pathname}`, {
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
    });

  for (const loc of enabledLocaleCodes) {
    const prefix = localePrefix(loc);
    const tk = SLUG_TOKENS_35[loc];
    const targetMaster = capodannoCategoryPath('capodanno-2027', loc);

    const legacyPaths = new Set<string>([
      `${prefix}/new-years-eve`,
      `${prefix}/${tk.newYearsEve}-${tk.milan}`,
    ]);
    if (loc === 'it') {
      legacyPaths.add('/it/capodanno-milano');
      legacyPaths.add('/it/capodanno-milano-discoteche');
    }

    for (const src of legacyPaths) {
      const res = await middleware(mkBotReq(src));
      assert.equal(res.status, 308, `${loc}: ${src} must issue 308`);
      assert.equal(
        new URL(res.headers.get('location')!).pathname,
        targetMaster,
        `${loc}: ${src} must redirect in 1 hop to ${targetMaster}`,
      );
    }

    const masterRes = await middleware(mkBotReq(targetMaster));
    assert.equal(masterRes.status, 200, `${loc}: ${targetMaster} must settle to 200 OK`);
    assert.equal(masterRes.headers.get('location'), null);
  }

  // Duplicate mockEvents NYE 2027 slugs redirect in 1 hop to canonical Capodanno event sheets
  for (const [src, dest] of [
    ['/events/new-years-eve-2027-grand-gala-just-me-milano', capodannoEventPath('capodanno-justme-milano-torre-branca', 'en')],
    ['/it/eventi/capodanno-2027-gran-gala-torre-branca-just-me-milano', capodannoEventPath('capodanno-justme-milano-torre-branca', 'it')],
    ['/events/new-years-eve-2027-winter-dome-aria-club-milano', capodannoEventPath('capodanno-aria-club-milano', 'en')],
    ['/it/eventi/capodanno-2027-san-siro-winter-dome-aria-club-milano', capodannoEventPath('capodanno-aria-club-milano', 'it')],
    ['/events/new-years-eve-2027-skyline-fireworks-voya-rooftop-milan', capodannoEventPath('capodanno-voya-rooftop-milano', 'en')],
  ] as const) {
    const res = await middleware(mkBotReq(src));
    assert.equal(res.status, 308, `${src} expected 308`);
    assert.equal(new URL(res.headers.get('location')!).pathname, dest);
  }

  const coreUrls = buildCoreHubSitemapEntries().map((e) => e.url);
  assert.ok(
    coreUrls.every((u) => !u.endsWith('/new-years-eve') && !u.includes('/capodanno-milano-discoteche')),
    'sitemap-core.xml must not contain legacy /new-years-eve hub URLs',
  );

  const eventUrls = buildEventsSitemapEntries().map((e) => e.url);
  assert.ok(
    eventUrls.every(
      (u) =>
        !u.includes('new-years-eve-2027-grand-gala-just-me') &&
        !u.includes('new-years-eve-2027-winter-dome-aria') &&
        !u.includes('new-years-eve-2027-skyline-fireworks-voya'),
    ),
    'sitemap-events.xml must not contain duplicate mockEvents NYE 2027 URLs',
  );
});

test('Deliverable B: all 21 Official Partner Venues rank-ready on bare brand name in 35 locales + Garda geo isolation', async () => {
  for (const partner of OFFICIAL_21_PARTNER_SPECS) {
    const venue = mockVenues.find((v) => v.id === partner.id);
    assert.ok(venue, `Missing partner venue ${partner.id} in mockVenues`);
    assert.equal(venue.isManaged, true, `${partner.id} must have isManaged: true`);

    const spec = getVenueAuthoritySpec(partner.id);
    assert.ok(spec, `Missing authority spec for ${partner.id}`);
    const officialBrand = OFFICIAL_SERP_NAME_BY_ID[partner.id];
    assert.ok(officialBrand && officialBrand.startsWith(partner.stem), `${partner.id} official brand mismatch`);

    // Hero asset exists on disk, 1080x1350, <= 300 KB
    assert.ok(venue.image, `${partner.id} missing hero image`);
    const diskPath = path.join(process.cwd(), 'public', venue.image.replace(/^\//, ''));
    const st = await stat(diskPath);
    assert.ok(st.size > 1000 && st.size <= 300_000, `${partner.id} hero size ${st.size}B out of bounds`);
    const meta = await sharp(diskPath).metadata();
    assert.equal(meta.width, 1080, `${partner.id} hero width !== 1080`);
    assert.equal(meta.height, 1350, `${partner.id} hero height !== 1350`);

    // Exact bidirectional Capodanno 2027 match
    const matchedCap = getCapodannoEventForClub(venue.slugs.en, getLocalizedText(venue.localizedContent.name, 'en'));
    assert.ok(matchedCap, `${partner.id} did not resolve a Capodanno event`);
    assert.equal(matchedCap.slug, partner.capSlug, `${partner.id} mapped to wrong Capodanno slug ${matchedCap.slug}`);

    // All 35 locales: <title> starts at index 0 with bare brand stem, <= 62 chars, valid club route
    for (const loc of enabledLocaleCodes) {
      const locName = getLocalizedText(venue.localizedContent.name, loc);
      const locDesc = getLocalizedText(venue.localizedContent.description, loc);
      const title = buildClubHighCtrTitle(venue, loc, locName);
      assert.ok(
        title.startsWith(partner.stem),
        `${partner.id} (${loc}) title "${title}" must start at index 0 with "${partner.stem}"`,
      );
      assert.ok(title.length <= 62, `${partner.id} (${loc}) title > 62 chars: "${title}"`);

      const desc = buildClubHighCtrDescription(venue, loc, locName, locDesc);
      assert.ok(desc.includes('351 912 7047'), `${partner.id} (${loc}) description missing WhatsApp`);

      const locSlug = getLocalizedVenueSlug35(venue.id, loc);
      if (partner.id === 'v-justme-garda') {
        assert.doesNotMatch(locSlug, /milan|milano|mailand|mediolan/i, `Garda slug in ${loc} leaked Milan: ${locSlug}`);
        assert.doesNotMatch(title, /milan|milano|mailand|mediolan/i, `Garda title in ${loc} leaked Milan: ${title}`);
        assert.doesNotMatch(desc, /\b(?:Milano|Milan|Milán|Mailand|Mediolan)\b/, `Garda desc in ${loc} leaked Milan: ${desc}`);
      }

      const clubPath = `${localePrefix(loc)}/${getLocalizedDir35('clubs', loc)}/${locSlug}`;
      const res = await middleware(
        new NextRequest(`https://nightlifemilan.com${clubPath}`, {
          headers: { 'user-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
        }),
      );
      assert.equal(res.status, 200, `${partner.id} (${loc}) ${clubPath} must return 200 OK`);
      assert.equal(res.headers.get('location'), null);
      if (loc !== 'en') {
        const rewritten = res.headers.get('x-middleware-rewrite');
        assert.ok(rewritten, `${partner.id} (${loc}) expected x-middleware-rewrite`);
        assert.equal(
          new URL(rewritten).pathname,
          `/${loc}/clubs/${venue.slugs.en}`,
          `${partner.id} (${loc}) internal rewrite must pass venue.slugs.en without ClubPage redirect loop`,
        );
      }
    }
  }

  // Verify Garda schema & FAQs geo isolation
  const garda = mockVenues.find((v) => v.id === 'v-justme-garda')!;
  const gardaSpec = getVenueAuthoritySpec('v-justme-garda')!;
  const gardaSchema = generateClubSchema({
    venue: garda,
    locale: 'it',
    canonicalUrl: 'https://nightlifemilan.com/it/locali/justme-garda-lake-lago-di-garda-tavoli-vip',
    name: OFFICIAL_SERP_NAME_BY_ID['v-justme-garda'],
    description: garda.localizedContent.description.it || '',
    schemaType: gardaSpec.schemaType,
    alternateNames: gardaSpec.alternateNames,
    neighborhoodName: gardaSpec.neighborhoodIt,
    openingHoursSpec: gardaSpec.openingHoursSpec,
  }) as any;
  assert.equal(gardaSchema.address.addressLocality, 'Lonato del Garda');
  assert.equal(gardaSchema.address.addressRegion, 'BS');
  assert.doesNotMatch(gardaSchema.containedInPlace.name, /Milano/i);

  const gardaH1It = buildCityQualifiedVenueH1(garda, 'it', 'JustMe Garda Lake');
  assert.doesNotMatch(gardaH1It, /Milano|Milan/i);
  const gardaFaqsIt = buildVenueAuthorityFaqs(garda, 'it', 'JustMe Garda Lake', 'Smart Elegant');
  assert.doesNotMatch(gardaFaqsIt[0].q + ' ' + gardaFaqsIt[0].a, /25017 Milano|a Milano/i);
});
