import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { enabledLocaleCodes, LOCALES } from '@/lib/i18n/locales';

// Lingue attive dal registry unico (lib/i18n/locales.ts): attivare una lingua lì
// la rende automaticamente instradabile qui, senza toccare il middleware.
const locales: string[] = enabledLocaleCodes;
// Lingue navigabili ma senza contenuto tradotto: noindex via header HTTP —
// vince su qualsiasi metadata di pagina (che altrimenti sovrascrive il layout).
const nonIndexedLocales = new Set(LOCALES.filter((l) => l.enabled && !l.indexed).map((l) => l.code as string));
const localePrefixPattern = `(?:${locales.map((l) => `\\/${l}`).join('|')})?`;
const analyticsRe = new RegExp(`^${localePrefixPattern}\\/analytics(\\/|$)`);
const analyticsTypoRe = new RegExp(`^${localePrefixPattern}\\/analitycs(\\/|$)`);

// Dashboard interna /analytics: Basic Auth con ANALYTICS_USER / ANALYTICS_PASSWORD.
// Protegge anche le Server Action della pagina (stesso path → il browser riallega
// l'header Authorization, cosa che NON farebbe verso /api/* fuori da questo prefisso).
function analyticsAuth(request: NextRequest): NextResponse | null {
  const user = process.env.ANALYTICS_USER;
  const pass = process.env.ANALYTICS_PASSWORD;
  const unauthorized = () =>
    new NextResponse(user && pass ? 'Authentication required' : 'Analytics not configured (set ANALYTICS_USER / ANALYTICS_PASSWORD)', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Nightlife Milan Analytics"' },
    });

  if (!user || !pass) return unauthorized();
  const expected = `Basic ${btoa(`${user}:${pass}`)}`;
  if (request.headers.get('authorization') !== expected) return unauthorized();
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If it's the default locale (en), redirect to root to keep URLs clean
    if (pathname.startsWith('/en/') || pathname === '/en') {
      const newPath = pathname.replace(/^\/en/, '') || '/';
      const url = new URL(newPath, request.url);
      url.search = request.nextUrl.search;
      return NextResponse.redirect(url);
    }
    const firstSegment = pathname.split('/')[1];
    if (nonIndexedLocales.has(firstSegment)) {
      const res = NextResponse.next();
      res.headers.set('X-Robots-Tag', 'noindex, follow');
      return res;
    }
    return NextResponse.next();
  }

  // Rewrite to /en/pathname if no locale is present (so English is served on root)
  const rewriteUrl = new URL(`/en${pathname}`, request.url);
  rewriteUrl.search = request.nextUrl.search;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
