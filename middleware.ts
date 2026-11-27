import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { enabledLocaleCodes, LOCALES, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getEventBatchProfile, isEventBatchLocaleHttpIndexable } from '@/lib/eventBatchProfiles';
import { isRemovedCuratedSitePath } from '@/lib/eventVisibility';
import { ALL_EVENT_DIR_TOKENS, getLocalizedDir35, resolveLocalizedDirToCanonical } from '@/lib/i18n/dirTokens35';
import {
  getExistingGuideSlug35,
  isConsolidatedNyeMasterGuideId,
  isKnownActiveVenueSlug,
  isLegacyHybridGuideSlug,
  isLegacyNewYearsEveHubSlug,
  isLegacyUnlistedClubSlug,
  localizeInternalHref,
  resolveExistingGuideId,
  resolveLegacyOrExpiredEventRedirect,
  resolveSeoHubPathToCanonical,
} from '@/lib/i18n/localizedSlugs35';
import {
  capodannoCategoryPath,
  capodannoEventPath,
  resolveCapodannoCategoryIdByLocalizedSlug,
  resolveCapodannoEventBaseSlugByLocalizedSlug,
} from '@/lib/capodanno/routes';
import { halloweenPath } from '@/lib/halloween/routes';
import { UNIVERSITY_PARTY_CANONICAL_SLUG } from '@/lib/universityPartyPt';
import {
  CRM_SESSION_COOKIE,
  crmLoginPath,
  resolveCrmSessionSecret,
  safeCrmRedirect,
  verifyCrmSessionToken,
} from '@/lib/crmSession';
import {
  ANALYTICS_MASTER_COOKIE,
  verifyAnalyticsMasterCookie,
  verifyAnalyticsMasterRawKey,
  verifyBasicAuthHeader,
} from '@/lib/analyticsMasterAuth';

// Lingue attive dal registry unico (lib/i18n/locales.ts): attivare una lingua li
// la rende automaticamente instradabile qui, senza toccare il middleware.
const locales: string[] = enabledLocaleCodes;
// Lingue navigabili ma senza contenuto tradotto: noindex via header HTTP -
// vince su qualsiasi metadata di pagina (che altrimenti sovrascrive il layout).
const nonIndexedLocales = new Set(LOCALES.filter((l) => l.enabled && !l.indexed).map((l) => l.code as string));
const localePrefixPattern = `(?:${locales.map((l) => `\\/${l}`).join('|')})?`;
const eventDirGroup = ALL_EVENT_DIR_TOKENS.join('|');
const analyticsRe = new RegExp(`^${localePrefixPattern}\\/analytics(\\/|$)`);
const analyticsTypoRe = new RegExp(`^${localePrefixPattern}\\/analitycs(\\/|$)`);
const crmRe = new RegExp(`^${localePrefixPattern}\\/crm(\\/|$)`);
const localizedEventPageRe = new RegExp(`^\\/([^/]+)\\/(?:${eventDirGroup})\\/([^/]+)$`);
const capodannoDirectRe = new RegExp(`^\\/(?:(?:${eventDirGroup})\\/)?(?:capodanno-202[67]|new-years-eve-202[67])\\/?$`, 'i');
const capodannoNestedRe = new RegExp(`^\\/(?:${eventDirGroup})\\/(?:capodanno-202[67]|new-years-eve-202[67])\\/([^/]+)\\/?$`, 'i');
const halloweenDirectRe = new RegExp(`^\\/(?:(?:${eventDirGroup})\\/)?halloween-2026\\/?$`, 'i');
const mfwNestedSubpathRe = /^\/(?:milan-fashion-week|milano-fashion-week|milano-fashion-week-eventi|settimana-della-moda-milano|[^/]*fashion-week[^/]*)\/(?:guides|events|guide|eventi)\/[^/]+\/?$/i;
const deprecatedLocalePrefixRe = /^\/(zh-tw|zh-hk|pt-br|es-mx|es-ar|es-co|en-gb|en-us|ko-kr|ko|ja|jp|he|iw|hi)(?:\/(.*))?$/i;

const BOT_OR_AUDITOR_UA_RE =
  /bot|crawl|spider|slurp|bingpreview|yandex|baidu|duckduck|google-inspectiontool|googleother|adsbot|storebot-google|mediapartners-google|google-read-aloud|apis-google|chrome-lighthouse|lighthouse|pagespeed|ptst|gtmetrix|pingdom|headlesschrome|whatsapp|facebookexternalhit|facebot|instagram|twitterbot|linkedinbot|telegrambot|discordbot|slackbot|pinterest|applebot|gptbot|oai-searchbot|chatgpt-user|claudebot|perplexitybot|bytespider|amazonbot/i;

const DEPRECATED_LOCALE_MAP: Readonly<Record<string, LocaleCode>> = {
  'zh-tw': 'zh',
  'zh-hk': 'zh',
  'pt-br': 'pt',
  'es-mx': 'es',
  'es-ar': 'es',
  'es-co': 'es',
  'en-gb': 'en',
  'en-us': 'en',
  'ko-kr': 'en',
  ko: 'en',
  ja: 'en',
  jp: 'en',
  he: 'en',
  iw: 'en',
  hi: 'en',
};

function maybePersistLocaleCookie(
  request: NextRequest,
  response: NextResponse,
  localeValue: string,
  isBot: boolean,
): void {
  if (isBot) return;
  if (request.cookies.get('NEXT_LOCALE')?.value === localeValue) return;
  response.cookies.set('NEXT_LOCALE', localeValue, { path: '/', maxAge: 31536000, sameSite: 'lax' });
}

function safeDecodeSegment(seg: string): string {
  try {
    return decodeURIComponent(seg);
  } catch {
    return seg;
  }
}

function resolveLegacySubpathForLocale(
  subPath: string,
  targetLocale: LocaleCode,
  hasExplicitLocale = true,
): string | null {
  if (capodannoDirectRe.test(subPath)) {
    return capodannoCategoryPath('capodanno-2027', targetLocale);
  }
  const nestedCapMatch = subPath.match(capodannoNestedRe);
  if (nestedCapMatch) {
    const rawSubSlug = safeDecodeSegment(nestedCapMatch[1]);
    const evBase = resolveCapodannoEventBaseSlugByLocalizedSlug(rawSubSlug, targetLocale);
    if (evBase) return capodannoEventPath(evBase, targetLocale);
    const catId = resolveCapodannoCategoryIdByLocalizedSlug(rawSubSlug, targetLocale);
    if (catId) return capodannoCategoryPath(catId, targetLocale);
    return capodannoCategoryPath('capodanno-2027', targetLocale);
  }
  if (halloweenDirectRe.test(subPath)) {
    return halloweenPath(targetLocale);
  }
  if (mfwNestedSubpathRe.test(subPath)) {
    const mfwHref = targetLocale === 'en' ? '/milan-fashion-week' : `/${targetLocale}/milan-fashion-week`;
    return localizeInternalHref(mfwHref, targetLocale);
  }
  const cleanSub = subPath !== '/' && subPath.endsWith('/') ? subPath.slice(0, -1) : subPath;
  const segs = cleanSub.split('/').filter(Boolean);
  if (segs.length === 1) {
    const rawSeg = safeDecodeSegment(segs[0]).toLowerCase();
    if (isLegacyNewYearsEveHubSlug(rawSeg)) {
      return capodannoCategoryPath('capodanno-2027', targetLocale);
    }
    const naturalHubAliases: Record<string, string> = {
      zone: '/zones',
      'aperitivo-milano': '/aperitivo',
      'rooftop-milano': '/rooftops',
      'prezzi-bottiglie-milano': '/bottle-prices',
      'liste-discoteche-milano': '/guest-lists',
      'feste-private-milano': '/private-parties',
      carrello: '/cart',
      cassa: '/checkout',
      pagamento: '/checkout',
      grazie: '/thank-you',
      'ordine-confermato': '/thank-you',
      rimborsi: '/refund-policy',
      'area-riservata': '/account',
      'i-miei-pass': '/account',
      'capodanno-single-pass': '/single-pass',
      search: '/clubs',
      cerca: '/clubs',
    };
    const canonicalHub = naturalHubAliases[rawSeg];
    if (canonicalHub) {
      const hubDest = targetLocale === 'en' ? canonicalHub : `/${targetLocale}${canonicalHub}`;
      return localizeInternalHref(hubDest, targetLocale);
    }
  }
  if (segs.length === 2) {
    const rawFirst = safeDecodeSegment(segs[0]).toLowerCase();
    const rawLeaf = safeDecodeSegment(segs[1]);
    if (isLegacyNewYearsEveHubSlug(rawFirst)) {
      const evBase = resolveCapodannoEventBaseSlugByLocalizedSlug(rawLeaf, targetLocale);
      if (evBase) return capodannoEventPath(evBase, targetLocale);
      const catId = resolveCapodannoCategoryIdByLocalizedSlug(rawLeaf, targetLocale);
      if (catId) return capodannoCategoryPath(catId, targetLocale);
      const legacyEv = resolveLegacyOrExpiredEventRedirect(rawLeaf, targetLocale);
      if (legacyEv) return legacyEv;
      return capodannoCategoryPath('capodanno-2027', targetLocale);
    }
    const parentCanonical = resolveLocalizedDirToCanonical(rawFirst);
    if (parentCanonical === '/clubs') {
      if (!isKnownActiveVenueSlug(rawLeaf) && isLegacyUnlistedClubSlug(rawLeaf)) {
        const clubsHub = targetLocale === 'en' ? '/clubs' : `/${targetLocale}/clubs`;
        return localizeInternalHref(clubsHub, targetLocale);
      }
    } else if (parentCanonical === '/guides') {
      const guideId = resolveExistingGuideId(rawLeaf);
      if (guideId && isConsolidatedNyeMasterGuideId(guideId)) {
        return capodannoCategoryPath('capodanno-2027', targetLocale);
      }
      if (guideId) {
        const expectedSlug = getExistingGuideSlug35(guideId, targetLocale);
        if (rawLeaf !== expectedSlug && (hasExplicitLocale || isLegacyHybridGuideSlug(rawLeaf))) {
          return `${localePrefix(targetLocale)}/${getLocalizedDir35('guides', targetLocale)}/${expectedSlug}`;
        }
      }
    } else if (parentCanonical === '/events') {
      const eventDest = resolveLegacyOrExpiredEventRedirect(rawLeaf, targetLocale);
      if (eventDest) return eventDest;
    } else if (parentCanonical === '/zones') {
      const staleZoneAliases: Record<string, string> = {
        'moscova-garibaldi': 'corso-como',
        'tortona-solari': 'navigli',
        'colonne-san-lorenzo': 'duomo-san-babila',
        'mecenate-ripamonti': 'ripamonti',
      };
      const mappedZone = staleZoneAliases[rawLeaf.toLowerCase()];
      if (mappedZone) {
        const zoneDest = targetLocale === 'en' ? `/zones/${mappedZone}` : `/${targetLocale}/zones/${mappedZone}`;
        return localizeInternalHref(zoneDest, targetLocale);
      }
    }
  }
  return null;
}

// Dashboard interna /analytics: Basic Auth con ANALYTICS_USER / ANALYTICS_PASSWORD.
// Protegge anche le Server Action della pagina (stesso path → il browser riallega
// l'header Authorization, cosa che NON farebbe verso /api/* fuori da questo prefisso).
function applyAnalyticsPrivateHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

async function analyticsAuth(request: NextRequest): Promise<NextResponse | null> {
  const keyParam = request.nextUrl.searchParams.get('k');
  if (keyParam) {
    const cookieDigest = await verifyAnalyticsMasterRawKey(keyParam);
    if (cookieDigest) {
      const cleanUrl = request.nextUrl.clone();
      cleanUrl.searchParams.delete('k');
      const redirectRes = NextResponse.redirect(cleanUrl, 303);
      redirectRes.cookies.set(ANALYTICS_MASTER_COOKIE, cookieDigest, {
        httpOnly: true,
        secure: request.nextUrl.protocol === 'https:',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      });
      return applyAnalyticsPrivateHeaders(redirectRes);
    }
  }

  const cookieVal = request.cookies.get(ANALYTICS_MASTER_COOKIE)?.value;
  if (await verifyAnalyticsMasterCookie(cookieVal)) {
    return null;
  }

  if (verifyBasicAuthHeader(request.headers.get('authorization'))) {
    return null;
  }

  const hasAnyAuthConfigured =
    Boolean((process.env.ANALYTICS_MASTER_TOKEN || '').trim()) ||
    Boolean((process.env.ANALYTICS_USER || '').trim() && (process.env.ANALYTICS_PASSWORD || '').trim());

  return applyAnalyticsPrivateHeaders(
    new NextResponse(
      hasAnyAuthConfigured
        ? 'Accesso riservato. Apri il link personale completo oppure autenticati.'
        : 'Analytics non configurato',
      {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Nightlife Milan Analytics"',
        },
      },
    ),
  );
}

const crmPublicAuthRe = new RegExp(`^${localePrefixPattern}\\/crm\\/(?:login|recover)(\\/|$)`);
const crmLoginExactRe = new RegExp(`^${localePrefixPattern}\\/crm\\/login\\/?$`);

function applyCrmPrivateHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

async function guardCrmRoute(
  request: NextRequest,
  effectiveLocale: string,
): Promise<NextResponse | null> {
  const { pathname, search } = request.nextUrl;
  const cleanPath = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const hasValidSession = await verifyCrmSessionToken(
    request.cookies.get(CRM_SESSION_COOKIE)?.value,
    resolveCrmSessionSecret(),
  );

  if (crmPublicAuthRe.test(cleanPath)) {
    if (
      crmLoginExactRe.test(cleanPath)
      && hasValidSession
      && request.nextUrl.searchParams.get('loggedOut') !== '1'
    ) {
      const target = safeCrmRedirect(request.nextUrl.searchParams.get('next'), effectiveLocale);
      return applyCrmPrivateHeaders(NextResponse.redirect(new URL(target, request.url), 303));
    }
    return null;
  }

  if (!hasValidSession) {
    const loginUrl = new URL(crmLoginPath(effectiveLocale), request.url);
    loginUrl.searchParams.set('next', `${cleanPath}${search}`);
    return applyCrmPrivateHeaders(NextResponse.redirect(loginUrl, 303));
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cleanTopPathname = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const isBot = BOT_OR_AUDITOR_UA_RE.test(request.headers.get('user-agent') || '');

  if (/^\/sitemap(-[a-z0-9-]+)?\.xml$/i.test(pathname)) {
    return NextResponse.next();
  }

  // Le vecchie pagine generate dalle collection Eventbrite non appartengono al
  // sito. Un 410 esplicito evita il falso 200 del fallback App Router e accelera
  // la loro rimozione dagli indici di ricerca (precede i redirect legacy).
  if (isRemovedCuratedSitePath(pathname)) {
    return new NextResponse(null, {
      status: 410,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=86400',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  }

  // 1-hop HTTP 308 per prefissi lingua/regione deprecati o non attivi (es. /zh-tw/*, /pt-br/*, /es-mx/*, /ja/*, /he/*)
  const deprecatedLocaleMatch = pathname.match(deprecatedLocalePrefixRe);
  if (deprecatedLocaleMatch) {
    const rawTag = deprecatedLocaleMatch[1].toLowerCase();
    const mappedLocale: LocaleCode = DEPRECATED_LOCALE_MAP[rawTag] || 'en';
    const rawRemainder = deprecatedLocaleMatch[2] ? `/${deprecatedLocaleMatch[2].replace(/\/+$/, '')}` : '/';
    let destination: string;
    if (rawRemainder === '/' || rawRemainder === '') {
      destination = mappedLocale === 'en' ? '/' : `/${mappedLocale}`;
    } else {
      const legacyResolved = resolveLegacySubpathForLocale(rawRemainder, mappedLocale);
      if (legacyResolved) {
        destination = legacyResolved;
      } else {
        const canonicalRest = resolveSeoHubPathToCanonical(rawRemainder, mappedLocale) || rawRemainder;
        const targetHref = mappedLocale === 'en' ? canonicalRest : `/${mappedLocale}${canonicalRest}`;
        destination = localizeInternalHref(targetHref, mappedLocale);
      }
    }
    if (destination && destination !== cleanTopPathname) {
      const url = new URL(destination, request.url);
      url.search = request.nextUrl.search;
      return NextResponse.redirect(url, 308);
    }
  }

  // Redirect HTTP 308 diretto (1-hop, anti-loop) per gli alias legacy Capodanno 2027, Halloween 2026, MFW, club non listati ed eventi storici
  const rawFirstSeg = pathname.split('/')[1] || '';
  const hasLeadingActiveLocale = locales.includes(rawFirstSeg);
  const legacyTargetLocale: LocaleCode = hasLeadingActiveLocale
    ? (rawFirstSeg === 'en' ? 'en' : (rawFirstSeg as LocaleCode))
    : 'en';
  const legacySubPath = hasLeadingActiveLocale
    ? (pathname.slice(rawFirstSeg.length + 1) || '/')
    : pathname;
  const rootSegsForLegacy = !hasLeadingActiveLocale ? cleanTopPathname.split('/').filter(Boolean) : [];
  const isUnprefixedGuidePath =
    !hasLeadingActiveLocale &&
    rootSegsForLegacy.length === 2 &&
    resolveLocalizedDirToCanonical(safeDecodeSegment(rootSegsForLegacy[0]).toLowerCase()) === '/guides';
  const rawCookieLocForLegacy = request.cookies.get('NEXT_LOCALE')?.value;
  const effectiveHumanLoc = !isBot
    ? rawCookieLocForLegacy && locales.includes(rawCookieLocForLegacy)
      ? rawCookieLocForLegacy
      : rawCookieLocForLegacy
        ? 'en'
        : matchBrowserLocale(request.headers.get('accept-language')) || 'en'
    : 'en';
  const deferUnprefixedGuideToBrowserLocale = isUnprefixedGuidePath && !isBot && effectiveHumanLoc !== 'en';
  const legacyDestination = deferUnprefixedGuideToBrowserLocale
    ? null
    : resolveLegacySubpathForLocale(legacySubPath, legacyTargetLocale, hasLeadingActiveLocale);
  if (legacyDestination && legacyDestination !== cleanTopPathname) {
    const url = new URL(legacyDestination, request.url);
    url.search = request.nextUrl.search;
    const redirectRes = NextResponse.redirect(url, 308);
    if (hasLeadingActiveLocale) {
      maybePersistLocaleCookie(request, redirectRes, legacyTargetLocale, isBot);
    }
    return redirectRes;
  }

  // Typo comune -> path canonico
  if (analyticsTypoRe.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/analitycs', '/analytics');
    return NextResponse.redirect(url);
  }

  if (analyticsRe.test(pathname)) {
    const authRes = await analyticsAuth(request);
    if (authRes) return authRes;
    if (!locales.some((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)) {
      return applyAnalyticsPrivateHeaders(NextResponse.next());
    }
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If it's the default locale (en), redirect 1-hop to canonical root English path
    if (pathname.startsWith('/en/') || pathname === '/en') {
      const rawEnRest = pathname.replace(/^\/en/, '') || '/';
      const canonicalEnRest = rawEnRest === '/' ? '/' : (resolveSeoHubPathToCanonical(rawEnRest, 'en') || rawEnRest);
      const newPath = canonicalEnRest === '/' ? '/' : localizeInternalHref(canonicalEnRest, 'en');
      const url = new URL(newPath, request.url);
      url.search = request.nextUrl.search;
      const enRedirectRes = NextResponse.redirect(url, 308);
      maybePersistLocaleCookie(request, enRedirectRes, 'en', isBot);
      return enRedirectRes;
    }
    const firstSegment = pathname.split('/')[1] as LocaleCode;
    const rawRestPath = pathname.slice(firstSegment.length + 1) || '/';
    const cleanPathname = cleanTopPathname;
    const isInternalAdmin = analyticsRe.test(cleanPathname) || crmRe.test(cleanPathname);

    if (crmRe.test(cleanPathname)) {
      const crmRedirect = await guardCrmRoute(request, firstSegment);
      if (crmRedirect) return crmRedirect;
      const res = applyCrmPrivateHeaders(NextResponse.next());
      maybePersistLocaleCookie(request, res, firstSegment, isBot);
      return res;
    }

    if (!isInternalAdmin && rawRestPath !== '/') {
      const canonicalSeoPath = resolveSeoHubPathToCanonical(rawRestPath, firstSegment);
      const expectedLocalizedFull = localizeInternalHref(
        `/${firstSegment}${canonicalSeoPath || rawRestPath}`,
        firstSegment,
      );
      if (expectedLocalizedFull && expectedLocalizedFull !== cleanPathname) {
        const redirectUrl = new URL(expectedLocalizedFull, request.url);
        redirectUrl.search = request.nextUrl.search;
        const redirectRes = NextResponse.redirect(redirectUrl, 308);
        maybePersistLocaleCookie(request, redirectRes, firstSegment, isBot);
        return redirectRes;
      }
      let res: NextResponse;
      if (canonicalSeoPath && canonicalSeoPath !== rawRestPath) {
        const rewriteUrl = new URL(`/${firstSegment}${canonicalSeoPath}`, request.url);
        rewriteUrl.search = request.nextUrl.search;
        res = NextResponse.rewrite(rewriteUrl);
      } else {
        res = NextResponse.next();
      }
      maybePersistLocaleCookie(request, res, firstSegment, isBot);
      const localizedEventPage = cleanPathname.match(localizedEventPageRe);
      const hasEventScopedHttpIndexability = localizedEventPage
        && isEventBatchLocaleHttpIndexable(localizedEventPage[1], localizedEventPage[2]);
      if (nonIndexedLocales.has(firstSegment) && !hasEventScopedHttpIndexability) {
        res.headers.set('X-Robots-Tag', 'noindex, follow');
      }
      return res;
    }

    const res = NextResponse.next();
    maybePersistLocaleCookie(request, res, firstSegment, isBot);
    if (analyticsRe.test(cleanPathname)) {
      return applyAnalyticsPrivateHeaders(res);
    }
    if (nonIndexedLocales.has(firstSegment)) {
      res.headers.set('X-Robots-Tag', 'noindex, follow');
    }
    return res;
  }

  // Spazio EN (nessun prefisso): auto-switch alla lingua del browser al primo
  // accesso; una scelta manuale (cookie NEXT_LOCALE) vince per sempre. I bot,
  // gli auditor e gli unfurler social NON vengono mai rediretti.
  if (!isBot) {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    const target =
      cookieLocale && locales.includes(cookieLocale)
        ? cookieLocale
        : cookieLocale
          ? null
          : matchBrowserLocale(request.headers.get('accept-language'));
    if (target && target !== 'en') {
      const targetCode = target as LocaleCode;
      const rootSegs = cleanTopPathname.split('/').filter(Boolean);
      const rootParentDir = rootSegs.length === 2 ? resolveLocalizedDirToCanonical(rootSegs[0]) : undefined;
      const rootLeaf = rootSegs.length === 2 ? safeDecodeSegment(rootSegs[1]) : '';
      let skipLocaleSwitch = false;
      if (rootParentDir === '/clubs' && !isKnownActiveVenueSlug(rootLeaf)) {
        skipLocaleSwitch = true;
      } else if (rootParentDir === '/events') {
        if (rootLeaf === UNIVERSITY_PARTY_CANONICAL_SLUG && targetCode !== 'pt') {
          skipLocaleSwitch = true;
        } else {
          const evProfile = getEventBatchProfile(rootLeaf);
          if (evProfile?.siteLocales && !evProfile.siteLocales.includes(targetCode)) {
            skipLocaleSwitch = true;
          }
        }
      }
      if (!skipLocaleSwitch) {
        const destPath = pathname === '/'
          ? `/${targetCode}`
          : localizeInternalHref(`/${targetCode}${pathname}`, targetCode);
        const url = new URL(destPath, request.url);
        url.search = request.nextUrl.search;
        return NextResponse.redirect(url);
      }
    }
  }

  // Canonicalize non-EN localized paths visited without locale prefix on root EN
  if (pathname !== '/' && !analyticsRe.test(pathname) && !crmRe.test(pathname)) {
    const cleanRootPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const canonicalEnPath = resolveSeoHubPathToCanonical(cleanRootPath, 'en');
    if (canonicalEnPath) {
      const expectedEnPath = localizeInternalHref(canonicalEnPath, 'en');
      if (expectedEnPath !== cleanRootPath) {
        const redirectUrl = new URL(expectedEnPath, request.url);
        redirectUrl.search = request.nextUrl.search;
        return NextResponse.redirect(redirectUrl, 308);
      }
      if (canonicalEnPath !== cleanRootPath) {
        const rewriteUrl = new URL(`/en${canonicalEnPath}`, request.url);
        rewriteUrl.search = request.nextUrl.search;
        return NextResponse.rewrite(rewriteUrl);
      }
    }
  }

  if (crmRe.test(cleanTopPathname)) {
    const crmRedirect = await guardCrmRoute(request, 'en');
    if (crmRedirect) return crmRedirect;
    const rewriteUrl = new URL(`/en${pathname}`, request.url);
    rewriteUrl.search = request.nextUrl.search;
    return applyCrmPrivateHeaders(NextResponse.rewrite(rewriteUrl));
  }

  // Rewrite to /en/pathname if no locale is present (so English is served on root)
  const rewriteUrl = new URL(`/en${pathname}`, request.url);
  rewriteUrl.search = request.nextUrl.search;
  return NextResponse.rewrite(rewriteUrl);
}

/** Migliore lingua attiva dall'header Accept-Language (q-value desc, subtag primario) */
function matchBrowserLocale(header: string | null): string | null {
  if (!header) return null;
  const prefs = header
    .split(',')
    .map((part) => {
      const [tag, qPart] = part.trim().split(';');
      const q = qPart?.startsWith('q=') ? parseFloat(qPart.slice(2)) : 1;
      return { tag: tag.toLowerCase(), q: isNaN(q) ? 0 : q };
    })
    .sort((a, b) => b.q - a.q);
  for (const { tag } of prefs) {
    let primary = tag.split('-')[0];
    if (primary === 'nb' || primary === 'nn') primary = 'no';
    if (locales.includes(primary)) return primary;
  }
  return null;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files, and XML sitemaps)
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.*\\.xml|.*\\..*).*)',
  ],
};
