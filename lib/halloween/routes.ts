import { enabledLocaleCodes, localePrefix, type LocaleCode } from '@/lib/i18n/localeRegistry';
import { getLocalizedDir35, isLocalizedEventsDir } from '@/lib/i18n/dirTokens35';
import { HALLOWEEN_NAVIGATION } from './navigation';
import type { HalloweenNavigation, HalloweenNavigationPack } from './types';

export const HALLOWEEN_LEGACY_SLUG = 'halloween-2026';
const ALL_HALLOWEEN_SLUGS = new Set<string>([
  HALLOWEEN_LEGACY_SLUG,
  ...Object.values(HALLOWEEN_NAVIGATION).map((v) => v.slug),
]);
export function validateHalloweenNavigation(pack: Partial<HalloweenNavigationPack>): HalloweenNavigationPack {
  if (Object.keys(pack).length !== enabledLocaleCodes.length) throw new Error('Halloween requires all 35 native navigation entries');
  for (const locale of enabledLocaleCodes) {
    const entry = pack[locale];
    if (!entry || !entry.h1.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(entry.slug)
      || entry.slug === HALLOWEEN_LEGACY_SLUG || !entry.menuLabel.trim()
      || entry.menuLabel !== entry.menuLabel.trim() || entry.menuLabel.length > 60
      || /[<>\u0000-\u001f]/u.test(entry.menuLabel)) throw new Error(`Invalid native Halloween navigation: ${locale}`);
  }
  return pack as HalloweenNavigationPack;
}
export function halloweenNavigation(locale: string): HalloweenNavigation {
  const pack = validateHalloweenNavigation(HALLOWEEN_NAVIGATION);
  const value = pack[locale as LocaleCode];
  if (!value) throw new Error(`Unsupported Halloween locale: ${locale}`);
  return value;
}
export function halloweenPath(locale: string): string {
  return `${localePrefix(locale)}/${getLocalizedDir35('events', locale)}/${halloweenNavigation(locale).slug}`;
}
export function halloweenLanguagePaths(): Record<LocaleCode, string> {
  return Object.fromEntries(enabledLocaleCodes.map(locale => [locale, halloweenPath(locale)])) as Record<LocaleCode, string>;
}
/** Resolve only an exact native destination or the already published alias. */
export function isHalloweenPath(pathname: string): boolean {
  const clean = pathname.replace(/\/$/, '');
  const parts = clean.split('/').filter(Boolean);
  if (parts.length === 2 && isLocalizedEventsDir(parts[0]) && ALL_HALLOWEEN_SLUGS.has(parts[1])) {
    return true;
  }
  if (
    parts.length === 3
    && enabledLocaleCodes.includes(parts[0] as LocaleCode)
    && isLocalizedEventsDir(parts[1])
    && ALL_HALLOWEEN_SLUGS.has(parts[2])
  ) {
    return true;
  }
  return false;
}
export function halloweenAlternatePath(pathname: string, targetLocale: string): string | null {
  return enabledLocaleCodes.includes(targetLocale as LocaleCode) && isHalloweenPath(pathname)
    ? halloweenPath(targetLocale) : null;
}
