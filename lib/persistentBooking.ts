import { isEnabledLocale } from '@/lib/i18n/locales';

export function isPublicBookingPath(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean);
  if (isEnabledLocale(segments[0])) segments.shift();
  return !['crm', 'analytics', 'admin', 'api', 'auth', 'login', 'dashboard'].includes(segments[0] || '');
}

export function isConciergeBookingHref(href: string): boolean {
  try {
    const url = new URL(href);
    return url.protocol === 'https:' && url.hostname === 'wa.me' && url.pathname === '/393519127047'
      && !url.username && !url.password && !url.port && Boolean(url.searchParams.get('text')?.trim());
  } catch {
    return false;
  }
}
