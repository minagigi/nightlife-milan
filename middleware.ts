import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { enabledLocaleCodes, LOCALES, type LocaleCode } from '@/lib/i18n/locales';
import { isEventBatchLocaleHttpIndexable } from '@/lib/eventBatchProfiles';
import { isRemovedCuratedSitePath } from '@/lib/eventVisibility';
import { ALL_EVENT_DIR_TOKENS } from '@/lib/i18n/dirTokens35';
import { localizeInternalHref, resolveSeoHubPathToCanonical } from '@/lib/i18n/localizedSlugs35';
import {
  capodannoCategoryPath,
  capodannoEventPath,
  resolveCapodannoCategoryIdByLocalizedSlug,
  resolveCapodannoEventBaseSlugByLocalizedSlug,
} from '@/lib/capodanno/routes';
import { halloweenPath } from '@/lib/halloween/routes';

// Lingue attive dal registry unico (lib/i18n/locales.ts): attivare una lingua lì
// la rende automaticamente instradabile qui, senza toccare il middleware.
const locales: string[] = enabledLocaleCodes;
// Lingue navigabili ma senza contenuto tradotto: noindex via header HTTP —
// vince su qualsiasi metadata di pagina (che altrimenti sovrascrive il layout).
const nonIndexedLocales = new Set(LOCALES.filter((l) => l.enabled && !l.indexed).map((l) => l.code as string));
const localePrefixPattern = `(?:${locales.map((l) => `\\/${l}`).join('|')})?`;
const eventDirGroup = ALL_EVENT_DIR_TOKENS.join('|');
const analyticsRe = new RegExp(`^${localePrefixPattern}\\/analytics(\\/|$)`);
const analyticsTypoRe = new RegExp(`^${localePrefixPattern}\\/analitycs(\\/|$)`);
const crmRe = new RegExp(`^${localePrefixPattern}\\/crm(\\/|$)`);
const localizedEventPageRe = new RegExp(`^\\/([^/]+)\\/(?:${eventDirGroup})\\/([^/]+)$`);
const capodannoDirectRe = new RegExp(`^\\/(?:(?:${eventDirGroup})\\/)?(?:capodanno-2027|new-years-eve-2027)\\/?$`, 'i');
const capodannoNestedRe = new RegExp(`^\\/(?:${eventDirGroup})\\/(?:capodanno-2027|new-years-eve-2027)\\/([^/]+)\\/?$`, 'i');
const halloweenDirectRe = new RegExp(`^\\/(?:(?:${eventDirGroup})\\/)?halloween-2026\\/?$`, 'i');
const mfwNestedGuideRe = /^\/(?:milan-fashion-week|settimana-della-moda-milano|[^/]*fashion-week[^/]*)\/guides\/[^/]+\/?$/i;
const deprecatedLocalePrefixRe = /^\/(zh-tw|zh-hk|pt-br|es-mx|es-ar|es-co|en-gb|en-us|ko-kr|ko|ja|jp|he|iw|hi)(?:\/(.*))?$/i;

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

function resolveLegacySubpathForLocale(subPath: string, targetLocale: LocaleCode): string | null {
  if (capodannoDirectRe.test(subPath)) {
    return capodannoCategoryPath('capodanno-2027', targetLocale);
  }
  const nestedCapMatch = subPath.match(capodannoNestedRe);
  if (nestedCapMatch) {
    const rawSubSlug = decodeURIComponent(nestedCapMatch[1]);
    const evBase = resolveCapodannoEventBaseSlugByLocalizedSlug(rawSubSlug, targetLocale);
    if (evBase) return capodannoEventPath(evBase, targetLocale);
    const catId = resolveCapodannoCategoryIdByLocalizedSlug(rawSubSlug, targetLocale);
    if (catId) return capodannoCategoryPath(catId, targetLocale);
    return capodannoCategoryPath('capodanno-2027', targetLocale);
  }
  if (halloweenDirectRe.test(subPath)) {
    return halloweenPath(targetLocale);
  }
  if (mfwNestedGuideRe.test(subPath)) {
    const mfwHref = targetLocale === 'en' ? '/milan-fashion-week' : `/${targetLocale}/milan-fashion-week`;
    return localizeInternalHref(mfwHref, targetLocale);
  }
  return null;
}

// Dashboard interna /analytics: Basic Auth con ANALYTICS_USER / ANALYTICS_PASSWORD.
// Protegge anche le Server Action della pagina (stesso path → il browser riallega
// l'header Authorization, cosa che NON farebbe verso /api/* fuori da questo prefisso).
function analyticsAuth(request: NextRequest): NextResponse | null {
  const user = process.env.ANALYTICS_USER;
  const pass = process.env.ANALYTICS_PASSWORD;
  const unauthorized = () =>
    new NextResponse(user && pass ? 'Authentication required' : 'Analytics not configured (set ANALYTICS_USER / ANALYTICS_PASSWORD)', {
      status: 401,
      headers: {
        'Cache-Control': 'private, no-store',
        'WWW-Authenticate': 'Basic realm="Nightlife Milan Analytics"',
      },
    });

  if (!user || !pass) return unauthorized();
  const expected = `Basic ${btoa(`${user}:${pass}`)}`;
  if (request.headers.get('authorization') !== expected) return unauthorized();
  return null;
}

// Il CRM contiene PII e usa credenziali dedicate quando presenti. Per evitare
// di bloccare il primo deploy, ripiega sulle credenziali analytics già attive.
function crmAuth(request: NextRequest): NextResponse | null {
  const user = process.env.CRM_USER || process.env.ANALYTICS_USER;
  const pass = process.env.CRM_PASSWORD || process.env.ANALYTICS_PASSWORD;
  const unauthorized = () =>
    new NextResponse(user && pass ? 'Authentication required' : 'CRM not configured (set CRM_USER / CRM_PASSWORD)', {
      status: 401,
      headers: {
        'Cache-Control': 'private, no-store',
        'WWW-Authenticate': 'Basic realm="Nightlife Milan CRM"',
      },
    });

  if (!user || !pass) return unauthorized();
  const expected = `Basic ${btoa(`${user}:${pass}`)}`;
  if (request.headers.get('authorization') !== expected) return unauthorized();
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (/^\/sitemap(-[a-z0-9-]+)?\.xml$/i.test(pathname)) {
    return NextResponse.next();
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
    if (destination && destination !== pathname) {
      const url = new URL(destination, request.url);
      url.search = request.nextUrl.search;
      return NextResponse.redirect(url, 308);
    }
  }

  // Redirect HTTP 308 diretto (1-hop, anti-loop) per gli alias legacy Capodanno 2027 (diretti + 553 annidati), Halloween 2026 e guide MFW
  const rawFirstSeg = pathname.split('/')[1] || '';
  const hasLeadingActiveLocale = locales.includes(rawFirstSeg);
  const legacyTargetLocale: LocaleCode = hasLeadingActiveLocale
    ? (rawFirstSeg === 'en' ? 'en' : (rawFirstSeg as LocaleCode))
    : 'en';
  const legacySubPath = hasLeadingActiveLocale
    ? (pathname.slice(rawFirstSeg.length + 1) || '/')
    : pathname;
  const legacyDestination = resolveLegacySubpathForLocale(legacySubPath, legacyTargetLocale);
  if (legacyDestination && legacyDestination !== pathname) {
    const url = new URL(legacyDestination, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 308);
  }

  // Le vecchie pagine generate dalle collection Eventbrite non appartengono al
  // sito. Un 410 esplicito evita il falso 200 del fallback App Router e accelera
  // la loro rimozione dagli indici di ricerca.
  if (isRemovedCuratedSitePath(pathname)) {
    return new NextResponse(null, {
      status: 410,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=86400',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  }

  // Typo comune → path canonico
  if (analyticsTypoRe.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace('/analitycs', '/analytics');
    return NextResponse.redirect(url);
  }

  if (analyticsRe.test(pathname)) {
    const denied = analyticsAuth(request);
    if (denied) return denied;
  }

  if (crmRe.test(pathname)) {
    const denied = crmAuth(request);
    if (denied) return denied;
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
      return NextResponse.redirect(url, 308);
    }
    const firstSegment = pathname.split('/')[1] as LocaleCode;
    const rawRestPath = pathname.slice(firstSegment.length + 1) || '/';
    const cleanPathname = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const isInternalAdmin = analyticsRe.test(cleanPathname) || crmRe.test(cleanPathname);

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
        redirectRes.cookies.set('NEXT_LOCALE', firstSegment, { path: '/', maxAge: 31536000, sameSite: 'lax' });
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
      res.cookies.set('NEXT_LOCALE', firstSegment, { path: '/', maxAge: 31536000, sameSite: 'lax' });
      const localizedEventPage = cleanPathname.match(localizedEventPageRe);
      const hasEventScopedHttpIndexability = localizedEventPage
        && isEventBatchLocaleHttpIndexable(localizedEventPage[1], localizedEventPage[2]);
      if (nonIndexedLocales.has(firstSegment) && !hasEventScopedHttpIndexability) {
        res.headers.set('X-Robots-Tag', 'noindex, follow');
      }
      return res;
    }

    const res = NextResponse.next();
    res.cookies.set('NEXT_LOCALE', firstSegment, { path: '/', maxAge: 31536000, sameSite: 'lax' });
    if (nonIndexedLocales.has(firstSegment)) {
      res.headers.set('X-Robots-Tag', 'noindex, follow');
    }
    return res;
  }

  // Spazio EN (nessun prefisso): auto-switch alla lingua del browser al primo
  // accesso; una scelta manuale (cookie NEXT_LOCALE) vince per sempre. I bot
  // NON vengono mai rediretti (SEO: ogni URL serve sempre lo stesso contenuto).
  const isBot = /bot|crawl|spider|slurp|bingpreview|yandex|baidu|duckduck/i.test(request.headers.get('user-agent') || '');
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
      const destPath = pathname === '/'
        ? `/${targetCode}`
        : localizeInternalHref(`/${targetCode}${pathname}`, targetCode);
      const url = new URL(destPath, request.url);
      url.search = request.nextUrl.search;
      return NextResponse.redirect(url);
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
