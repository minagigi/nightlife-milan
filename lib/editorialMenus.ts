import { localePrefix, type LocaleCode } from './i18n/locales';
import { localizeInternalHref } from './i18n/localizedSlugs35';
import type { EditorialFields } from './editorialPresentation';

export type MenuRouteId =
  | 'clubs'
  | 'events'
  | 'mfw'
  | 'zones'
  | 'guides'
  | 'vip'
  | 'aperitivo'
  | 'bottles'
  | 'doorPolicy'
  | 'faq'
  | 'concierge'
  | 'pastEvents';

export type EditorialMenuItem = {
  id: MenuRouteId;
  label: string;
};

export type ResolvedMenuItem = EditorialMenuItem & {
  href: string;
  match: string;
  gold: boolean;
};

export type HeaderMenu = {
  version: number;
  primary: EditorialMenuItem[];
  mobileExtra: EditorialMenuItem[];
};

export type FooterMenu = {
  version: number;
  navigation: EditorialMenuItem[];
  zones: Array<{ id: 'brera' | 'navigli' | 'isola' | 'corsoComo' | 'portaVenezia'; label: string }>;
};

const ROUTES: Record<string, string> = {
  clubs: '/clubs',
  events: '/events',
  mfw: '/events/halloween-2026',
  zones: '/zones/corso-como',
  guides: '/guides',
  vip: '/vip-tables',
  aperitivo: '/aperitivo',
  bottles: '/bottle-prices',
  doorPolicy: '/door-policy',
  faq: '/faq',
  concierge: '/concierge',
  pastEvents: '/events',
  brera: '/zones/brera',
  navigli: '/zones/navigli',
  isola: '/zones/isola',
  corsoComo: '/zones/corso-como',
  portaVenezia: '/zones/porta-venezia',
};

export function headerMenuFromFields(_fields: EditorialFields, fallback: HeaderMenu): HeaderMenu {
  return fallback;
}

export function footerMenuFromFields(_fields: EditorialFields, fallback: FooterMenu): FooterMenu {
  return fallback;
}

export function resolveMenuItems(items: readonly { id: string; label: string }[], locale: string): ResolvedMenuItem[] {
  const prefix = localePrefix(locale);
  const loc = (locale || 'en') as LocaleCode;
  return items
    .filter((item) => item.id !== 'pastEvents' && item.id !== 'mfw')
    .map((item) => {
      const rawHref = `${prefix}${ROUTES[item.id] || '/events'}`;
      const localized = localizeInternalHref(rawHref, loc);
      return {
        id: item.id as MenuRouteId,
        label: item.label,
        href: localized,
        match: localized,
        gold: item.id === 'vip',
      };
    });
}
