import type { LocaleCode } from '@/lib/i18n/locales';

export type HalloweenNavigation = Readonly<{ h1: string; slug: string; menuLabel: string }>;
export type HalloweenSection = Readonly<{ heading: string; paragraphs: readonly string[] }>;
export type HalloweenContent = Readonly<{
  h1: string; metaTitle: string; metaDescription: string; intro: readonly string[];
  sections: readonly [HalloweenSection, HalloweenSection];
  imageAlts: readonly [string, string, string, string, string];
  editorialImageCaption: string;
  faqs: readonly Readonly<{ question: string; answer: string }>[];
}>;
export type HalloweenAsset = Readonly<{
  src: string; width: number; height: number; bytes: number;
  sha256: string; sourceRef: string;
  kind: 'programme-artwork' | 'editorial-illustration';
}>;
export type HalloweenMembership = Readonly<{
  eventId: string; sourceUrl: string; startISO: string; evidenceRef: string;
}>;
export type HalloweenNavigationPack = Readonly<Record<LocaleCode, HalloweenNavigation>>;
export type HalloweenContentPack = Readonly<Record<LocaleCode, HalloweenContent>>;
