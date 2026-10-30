import { tr } from '@/lib/i18n/t';

export function isMfwPathname(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname.includes('/milan-fashion-week') || pathname.includes('/fashion-week');
}

export function getMfwBookingLabel(locale: string): string {
  return tr(locale, 'Fashion Week VIP Concierge · WhatsApp', 'Concierge VIP Fashion Week · WhatsApp');
}
