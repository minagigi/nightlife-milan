import { tr } from '@/lib/i18n/t';
import { ALL_35_LOCALES, resolveSeoHubPathToCanonical } from '@/lib/i18n/localizedSlugs35';

export function isMfwPathname(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (pathname.includes('/milan-fashion-week') || pathname.includes('/fashion-week')) return true;
  const parts = pathname.split('/').filter(Boolean);
  const rest = parts.length > 1 && (ALL_35_LOCALES as readonly string[]).includes(parts[0])
    ? `/${parts.slice(1).join('/')}`
    : pathname;
  const canon = resolveSeoHubPathToCanonical(rest);
  return canon === '/milan-fashion-week' || canon === '/milan-fashion-week/calendar' || canon === '/fashion-week';
}

export function getMfwBookingLabel(locale: string): string {
  return tr(locale, 'Fashion Week VIP Concierge · WhatsApp', 'Concierge VIP Fashion Week · WhatsApp');
}
