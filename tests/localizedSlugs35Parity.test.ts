import assert from 'node:assert/strict';
import test from 'node:test';
import { NextRequest } from 'next/server';
import {
  ENABLED_LOCALES,
  enabledLocaleCodes,
  getLocaleDef,
  localePrefix,
  canonicalPageUrl,
  hreflangAlternates,
} from '../lib/i18n/locales';
import {
  DIR_AND_SUB_TOKENS_35,
  getLocalizedDir35,
  resolveLocalizedDirToCanonical,
} from '../lib/i18n/dirTokens35';
import {
  getLocalizedSeoPagePath35,
  resolveSeoHubPathToCanonical,
  localizeInternalHref,
  getLocalizedVenueSlug35,
  getLocalizedZoneSlug35,
  getLocalizedGenreSlug35,
  getLocalizedEventSlug35,
  isKnownActiveVenueSlug,
  isLegacyUnlistedClubSlug,
} from '../lib/i18n/localizedSlugs35';
import {
  CAPODANNO_CATEGORY_IDS,
  capodannoCategoryPath,
  capodannoEventPath,
} from '../lib/capodanno/routes';
import { CAPODANNO_EVENTS } from '../lib/capodannoEvents';
import { halloweenPath } from '../lib/halloween/routes';
import { OCTOBER_EVENTS } from '../lib/octoberEvents';
import { getOctoberEventCopy, getOctoberEventSlug } from '../lib/october-events/copy';
import { octoberEventCanonical } from '../lib/octoberEventSeo';
import { mockVenues, mockZones, mockGuides } from '../lib/data';
import { getLocalizedGuideSlug35 } from '../lib/guides100Catalog';
import { middleware } from '../middleware';

const STATIC_HUB_PATHS = [
  '/vip-tables',
  '/aperitivo',
  '/bottle-prices',
  '/door-policy',
  '/faq',
  '/concierge',
  '/rooftops',
  '/private-parties',
  '/guest-lists',
  '/fashion-week',
  '/milan-fashion-week',
  '/milan-fashion-week/calendar',
  '/football-afterparties',
  '/concert-afterparties',
  '/new-years-eve',
  '/clubs',
  '/events',
  '/events/tonight',
  '/events/this-week',
  '/events/special',
  '/events/best',
  '/events/past',
  '/events/october-2026',
  '/events/18-plus',
  '/events/21-plus',
  '/events/international',
  '/events/university-erasmus',
  '/zones',
  '/guides',
  '/genres',
  '/calendar/tonight',
  '/calendar/this-week',
  '/booking/success',
  '/privacy',
  '/terms',
] as const;

const FORBIDDEN_ENGLISH_DIRS = new Set([
  'clubs',
  'events',
  'zones',
  'guides',
  'genres',
  'calendar',
  'booking',
]);

test('all 35 locales have unique, non-colliding, non-English parent directory tokens', () => {
  assert.equal(enabledLocaleCodes.length, 35);
  for (const loc of enabledLocaleCodes) {
    const row = DIR_AND_SUB_TOKENS_35[loc];
    assert.ok(row, `Missing dirTokens row for ${loc}`);
    const dirs = [
      ['clubs', getLocalizedDir35('clubs', loc)],
      ['events', getLocalizedDir35('events', loc)],
      ['zones', getLocalizedDir35('zones', loc)],
      ['guides', getLocalizedDir35('guides', loc)],
      ['genres', getLocalizedDir35('genres', loc)],
      ['calendar', getLocalizedDir35('calendar', loc)],
      ['booking', getLocalizedDir35('booking', loc)],
    ] as const;
    const seen = new Set<string>();
    for (const [canonicalDir, localizedDir] of dirs) {
      assert.ok(localizedDir.length > 0, `${loc}:${canonicalDir} empty`);
      assert.ok(!seen.has(localizedDir), `${loc} duplicate dir token: ${localizedDir}`);
      seen.add(localizedDir);
      assert.equal(resolveLocalizedDirToCanonical(localizedDir), `/${canonicalDir}`);
      if (loc !== 'en') {
        assert.ok(
          !FORBIDDEN_ENGLISH_DIRS.has(localizedDir),
          `${loc}:${canonicalDir} leaked English dir token "${localizedDir}"`,
        );
      }
    }
  }
});

test('all static SEO hubs round-trip 1:1 across all 35 locales with canonicalPageUrl === hreflang', () => {
  const baseUrl = 'https://nightlifemilan.com';
  for (const canonicalPath of STATIC_HUB_PATHS) {
    const hreflangs = hreflangAlternates(baseUrl, canonicalPath);
    assert.equal(hreflangs['x-default'], `${baseUrl}${canonicalPath}`);
    for (const loc of enabledLocaleCodes) {
      const localizedSubpath = getLocalizedSeoPagePath35(canonicalPath, loc);
      assert.equal(
        resolveSeoHubPathToCanonical(localizedSubpath, loc),
        canonicalPath,
        `${loc}: ${localizedSubpath} did not round-trip to ${canonicalPath}`,
      );
      if (loc !== 'en') {
        assert.notEqual(
          localizedSubpath,
          canonicalPath,
          `${loc}: ${canonicalPath} was not localized (${localizedSubpath})`,
        );
      }
      const expectedCanonical = canonicalPageUrl(baseUrl, loc, canonicalPath);
      const bcp47 = getLocaleDef(loc)!.hreflang;
      assert.equal(
        hreflangs[bcp47],
        expectedCanonical,
        `${loc} (${bcp47}): hreflang ${hreflangs[bcp47]} !== canonical ${expectedCanonical}`,
      );
    }
  }
});

test('dynamic 2-segment routes localize both parent directory and leaf slug in all 35 locales', () => {
  const sampleVenue = mockVenues[0];
  const sampleZone = mockZones[0];
  const sampleGuide = mockGuides[0];
  const sampleGenre = 'techno';
  const sampleOct = OCTOBER_EVENTS[0];
  const sampleCapEv = CAPODANNO_EVENTS[0];

  for (const loc of enabledLocaleCodes) {
    const prefix = localePrefix(loc);
    const clubHref = localizeInternalHref(`${prefix}/clubs/${sampleVenue.slugs.en}`, loc);
    assert.equal(
      clubHref,
      `${prefix}/${getLocalizedDir35('clubs', loc)}/${getLocalizedVenueSlug35(sampleVenue.id, loc)}`,
    );
    assert.equal(
      resolveSeoHubPathToCanonical(clubHref.slice(prefix.length), loc),
      `/clubs/${sampleVenue.slugs.en}`,
    );

    const zoneHref = localizeInternalHref(`${prefix}/zones/${sampleZone.slug}`, loc);
    assert.equal(
      zoneHref,
      `${prefix}/${getLocalizedDir35('zones', loc)}/${getLocalizedZoneSlug35(sampleZone.slug, loc)}`,
    );
    assert.equal(
      resolveSeoHubPathToCanonical(zoneHref.slice(prefix.length), loc),
      `/zones/${sampleZone.slug}`,
    );

    const guideHref = localizeInternalHref(`${prefix}/guides/${sampleGuide.slugs.en}`, loc);
    assert.equal(
      guideHref,
      `${prefix}/${getLocalizedDir35('guides', loc)}/${getLocalizedGuideSlug35(sampleGuide, loc)}`,
    );
    assert.equal(
      resolveSeoHubPathToCanonical(guideHref.slice(prefix.length), loc),
      `/guides/${sampleGuide.slugs.en}`,
    );

    const genreHref = localizeInternalHref(`${prefix}/genres/${sampleGenre}`, loc);
    assert.equal(
      genreHref,
      `${prefix}/${getLocalizedDir35('genres', loc)}/${getLocalizedGenreSlug35(sampleGenre, loc)}`,
    );
    assert.equal(
      resolveSeoHubPathToCanonical(genreHref.slice(prefix.length), loc),
      `/genres/${sampleGenre}`,
    );

    for (const catId of CAPODANNO_CATEGORY_IDS) {
      const capCat = capodannoCategoryPath(catId, loc);
      assert.ok(capCat.startsWith(`${prefix}/${getLocalizedDir35('events', loc)}/`));
      assert.equal(localizeInternalHref(capCat, loc), capCat);
    }

    const capEv = capodannoEventPath(sampleCapEv.slug, loc);
    assert.ok(capEv.startsWith(`${prefix}/${getLocalizedDir35('events', loc)}/`));
    assert.equal(localizeInternalHref(capEv, loc), capEv);

    const hw = halloweenPath(loc);
    assert.ok(hw.startsWith(`${prefix}/${getLocalizedDir35('events', loc)}/`));
    assert.equal(localizeInternalHref(hw, loc), hw);

    const octCanonical = octoberEventCanonical(sampleOct, loc);
    const expectedOctSlug = getLocalizedEventSlug35(getOctoberEventSlug(sampleOct), loc);
    assert.equal(
      octCanonical,
      `https://nightlifemilan.com${prefix}/${getLocalizedDir35('events', loc)}/${expectedOctSlug}`,
    );
  }
});

test('middleware issues 1-hop 308 redirects on legacy English paths and rewrites canonical localized paths cleanly', () => {
  const mkReq = (pathname: string, acceptLang = 'it-IT,it;q=0.9') =>
    new NextRequest(`https://nightlifemilan.com${pathname}`, {
      headers: { 'accept-language': acceptLang },
    });

  // 1. Legacy non-EN static hub -> 1-hop 308 to localized URL
  const r1 = middleware(mkReq('/it/vip-tables'));
  assert.equal(r1.status, 308);
  assert.equal(new URL(r1.headers.get('location')!).pathname, '/it/tavoli-vip-milano');

  // 2. Canonical localized non-EN static hub -> internal rewrite (200, no redirect loop)
  const r2 = middleware(mkReq('/it/tavoli-vip-milano'));
  assert.equal(r2.status, 200);
  assert.equal(r2.headers.get('location'), null);
  assert.equal(
    new URL(r2.headers.get('x-middleware-rewrite')!).pathname,
    '/it/vip-tables',
  );

  // 3. Legacy non-EN dynamic club -> 1-hop 308 to localized dir + localized slug
  const r3 = middleware(mkReq('/it/clubs/just-me'));
  assert.equal(r3.status, 308);
  assert.equal(
    new URL(r3.headers.get('location')!).pathname,
    `/it/${getLocalizedDir35('clubs', 'it')}/${getLocalizedVenueSlug35('v-justme', 'it')}`,
  );

  // 4. Canonical localized non-EN dynamic club -> internal rewrite (200, no loop)
  const itClubPath = `/it/${getLocalizedDir35('clubs', 'it')}/${getLocalizedVenueSlug35('v-justme', 'it')}`;
  const r4 = middleware(mkReq(itClubPath));
  assert.equal(r4.status, 200);
  assert.equal(r4.headers.get('location'), null);
  assert.equal(
    new URL(r4.headers.get('x-middleware-rewrite')!).pathname,
    '/it/clubs/just-me-milano',
  );

  // 5. Legacy /it/events/capodanno-2027 -> 1-hop 308 to /it/eventi/eventi-capodanno-milano-2027
  const r5 = middleware(mkReq('/it/events/capodanno-2027'));
  assert.equal(r5.status, 308);
  assert.equal(new URL(r5.headers.get('location')!).pathname, capodannoCategoryPath('all', 'it'));

  // 6. Canonical /it/eventi/eventi-capodanno-milano-2027 -> internal rewrite to /it/events/... (no loop!)
  const r6 = middleware(mkReq(capodannoCategoryPath('all', 'it')));
  assert.equal(r6.status, 200);
  assert.equal(r6.headers.get('location'), null);
  assert.ok(
    new URL(r6.headers.get('x-middleware-rewrite')!).pathname.startsWith('/it/events/'),
  );

  // 7. Dated Xceed event legacy /es/events/<en-slug> -> 1-hop 308 to /es/eventos/<es-slug>
  const oct = OCTOBER_EVENTS[0];
  const octEnSlug = getOctoberEventSlug(oct);
  const octEsSlug = getOctoberEventCopy(oct, 'es').slug;
  const r7 = middleware(mkReq(`/es/events/${octEnSlug}`));
  assert.equal(r7.status, 308);
  assert.equal(
    new URL(r7.headers.get('location')!).pathname,
    `/es/${getLocalizedDir35('events', 'es')}/${octEsSlug}`,
  );

  // 8. Canonical /es/eventos/<es-slug> -> internal rewrite to /es/events/<en-slug> (no loop!)
  const r8 = middleware(mkReq(`/es/${getLocalizedDir35('events', 'es')}/${octEsSlug}`));
  assert.equal(r8.status, 200);
  assert.equal(r8.headers.get('location'), null);
  assert.equal(
    new URL(r8.headers.get('x-middleware-rewrite')!).pathname,
    `/es/events/${octEnSlug}`,
  );
});

test('anti-sabotage: bots, auditors and social unfurlers never trigger 307 or Set-Cookie', () => {
  const botUAs = [
    'Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)',
    'Mozilla/5.0 (Linux; Android 11; moto g power) AppleWebKit/537.36 Chrome-Lighthouse',
    'WhatsApp/2.24.10.76 A',
    'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    'Twitterbot/1.0',
    'Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)',
    'Mozilla/5.0 (compatible; PerplexityBot/1.0)',
  ];
  for (const ua of botUAs) {
    const rootRes = middleware(
      new NextRequest('https://nightlifemilan.com/', {
        headers: { 'user-agent': ua, 'accept-language': 'it-IT,it;q=0.9' },
      }),
    );
    assert.equal(rootRes.status, 200, `Bot UA "${ua}" was redirected on /`);
    assert.equal(rootRes.headers.get('location'), null);
    assert.equal(rootRes.headers.get('set-cookie'), null, `Bot UA "${ua}" received Set-Cookie on /`);

    const itRes = middleware(
      new NextRequest('https://nightlifemilan.com/it/tavoli-vip-milano', {
        headers: { 'user-agent': ua, 'accept-language': 'it-IT,it;q=0.9' },
      }),
    );
    assert.equal(itRes.status, 200);
    assert.equal(itRes.headers.get('set-cookie'), null, `Bot UA "${ua}" received Set-Cookie on /it/tavoli-vip-milano`);
  }

  // Human visiting /en/clubs with NEXT_LOCALE=it persists NEXT_LOCALE=en on 308 redirect (no bounce back to /it)
  const enSwitch = middleware(
    new NextRequest('https://nightlifemilan.com/en/clubs', {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0',
        'accept-language': 'it-IT,it;q=0.9',
        cookie: 'NEXT_LOCALE=it',
      },
    }),
  );
  assert.equal(enSwitch.status, 308);
  assert.equal(new URL(enSwitch.headers.get('location')!).pathname, '/clubs');
  assert.match(enSwitch.headers.get('set-cookie') || '', /NEXT_LOCALE=en/);
});

test('anti-sabotage: bare dirs, unlisted clubs, past GSC events, mockEvents and fake 404s resolve cleanly in <= 1 hop', () => {
  const mkBotReq = (pathname: string, acceptLang = 'it-IT,it;q=0.9') =>
    new NextRequest(`https://nightlifemilan.com${pathname}`, {
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; Google-InspectionTool/1.0;)',
        'accept-language': acceptLang,
      },
    });

  // Bare localized directories and short aliases -> 1-hop 308 to 200 OK canonical hub
  for (const [src, dest] of [
    ['/it/locali', '/it/discoteche-locali-milano'],
    ['/it/eventi', '/it/eventi-serate-milano'],
    ['/it/guide', '/it/guide-vita-notturna-milano'],
    ['/it/quartieri', '/it/quartieri-vita-notturna-milano'],
    ['/it/generi', '/it/generi-musicali-discoteche-milano'],
    ['/it/calendario', '/it/eventi/questa-settimana-milano'],
    ['/it/prenotazione', '/it/concierge-vip-milano'],
    ['/it/prenota', '/it/concierge-vip-milano'],
    ['/it/eventi/stasera', '/it/eventi/stasera-milano'],
    ['/it/capodanno-milano', '/it/capodanno-milano-discoteche'],
    ['/sr/klub-milano', '/sr/klub-milano'],
    ['/it/milan-fashion-week/events/some-runway-party', '/it/milano-fashion-week-eventi'],
  ] as const) {
    const r = middleware(mkBotReq(src));
    if (src === dest) {
      assert.equal(r.status, 200, `${src} should serve 200`);
    } else {
      assert.equal(r.status, 308, `${src} expected 308, got ${r.status}`);
      assert.equal(new URL(r.headers.get('location')!).pathname, dest, `${src} wrong target`);
      const hop2 = middleware(mkBotReq(dest));
      assert.equal(hop2.status, 200, `${dest} (from ${src}) did not settle to 200 on hop 2`);
      assert.equal(hop2.headers.get('location'), null);
    }
  }

  // Unlisted catalog + historical GSC clubs -> 1-hop 308 to localized /clubs hub (both /clubs/* and localized dir)
  assert.equal(isKnownActiveVenueSlug('just-me-milano'), true);
  assert.equal(isKnownActiveVenueSlug('bobino-milano'), true);
  assert.equal(isKnownActiveVenueSlug('gate-milano'), false);
  assert.equal(isLegacyUnlistedClubSlug('gate-club-milano-tavoli-vip'), true);
  assert.equal(isLegacyUnlistedClubSlug('encanto-club-latino'), true);

  for (const [src, dest] of [
    ['/clubs/gate-milano', '/clubs'],
    ['/it/clubs/gate-milano', '/it/discoteche-locali-milano'],
    ['/it/locali/gate-club-milano-tavoli-vip', '/it/discoteche-locali-milano'],
    ['/it/clubs/encanto-club-latino', '/it/discoteche-locali-milano'],
    ['/es/discotecas/old-fashion-milan-mesas-vip', '/es/discoteca-milan'],
  ] as const) {
    const r = middleware(mkBotReq(src));
    assert.equal(r.status, 308, `${src} expected 308`);
    assert.equal(new URL(r.headers.get('location')!).pathname, dest);
  }

  // Static mockEvents pre-registered at module load (Edge == Node parity, e.g. keinemusik on /ro/)
  const roKeine = middleware(mkBotReq('/ro/events/keinemusik-milano-25-settembre-2026'));
  assert.equal(roKeine.status, 308);
  assert.equal(
    new URL(roKeine.headers.get('location')!).pathname,
    '/ro/evenimente/keinemusik-milan-25-september-2026-milano-petrecere',
  );
  const roKeine2 = middleware(mkBotReq('/ro/evenimente/keinemusik-milan-25-september-2026-milano-petrecere'));
  assert.equal(roKeine2.status, 200);
  assert.equal(roKeine2.headers.get('location'), null);

  // MONDAY_NIGHT_PROFILE (siteLocales: ['en', 'it']) does NOT loop when Accept-Language is 'es'
  const esMonday = middleware(
    new NextRequest('https://nightlifemilan.com/es/eventos/just-me-milano-monday-night-july-20-2026', {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0',
        'accept-language': 'es-ES,es;q=0.9',
      },
    }),
  );
  assert.equal(esMonday.status, 308);
  const esMondayTarget = new URL(esMonday.headers.get('location')!).pathname;
  assert.equal(esMondayTarget, '/events/just-me-milano-monday-night-july-20-2026');
  const enMondayFollow = middleware(
    new NextRequest(`https://nightlifemilan.com${esMondayTarget}`, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0',
        'accept-language': 'es-ES,es;q=0.9',
      },
    }),
  );
  assert.equal(enMondayFollow.status, 200);
  assert.equal(enMondayFollow.headers.get('location'), null);

  // University Party PT serves 200 on /pt/eventos/... and 1-hop 308s from non-PT locales
  const ptUni = middleware(mkBotReq('/pt/eventos/university-party-just-me-tuesday-july-14-2026-2026-07-14'));
  assert.equal(ptUni.status, 200);
  assert.equal(ptUni.headers.get('location'), null);
  const itUni = middleware(mkBotReq('/it/eventi/university-party-just-me-tuesday-july-14-2026-2026-07-14'));
  assert.equal(itUni.status, 308);
  assert.equal(
    new URL(itUni.headers.get('location')!).pathname,
    '/pt/eventos/university-party-just-me-tuesday-july-14-2026-2026-07-14',
  );

  // Past historical dated GSC event -> 1-hop 308 to localized active venue page
  const pastJustMe = middleware(mkBotReq('/it/events/andrea-damante-justme-milano-2026-09-18'));
  assert.equal(pastJustMe.status, 308);
  assert.equal(
    new URL(pastJustMe.headers.get('location')!).pathname,
    '/it/locali/just-me-milano-tavoli-vip',
  );

  // Genuinely fake club & fake event URLs -> 0 redirects (fall through directly to real HTTP 404)
  for (const fakeUrl of [
    '/clubs/non-existent-fake-club-xyz-999',
    '/it/clubs/non-existent-fake-club-xyz-999',
    '/it/locali/non-existent-fake-club-xyz-999',
    '/events/non-existent-fake-event-xyz-999',
    '/it/eventi/non-existent-fake-event-xyz-999',
  ]) {
    const fakeRes = middleware(mkBotReq(fakeUrl));
    assert.equal(fakeRes.status, 200, `Fake URL ${fakeUrl} must not redirect (${fakeRes.status})`);
    assert.equal(fakeRes.headers.get('location'), null, `Fake URL ${fakeUrl} must not have Location header`);
  }
});
