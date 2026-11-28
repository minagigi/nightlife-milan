import { type LocaleCode } from '@/lib/i18n/locales';
import {
  resolveContextualSiloCards,
  type ContextualSiloCard,
  type SiloClusterKey,
} from '@/lib/i18n/contextualSilo35';

export type SeoContextualSiloModel = {
  cluster: SiloClusterKey;
  isHomePage: boolean;
  isSingleGuidePage: boolean;
  eyebrow: string;
  heading: string;
  exploreCta: string;
  cards: readonly ContextualSiloCard[];
  homeOverviewTitle: string;
  homeOverviewLead: string;
  homeOverviewPillars: readonly { title: string; body: string }[];
};

export function slugifyHeadingForSeo(title: string, fallbackIndex: number): string {
  const normalized = title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  const ascii = normalized
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (ascii.length >= 6) {
    return ascii.slice(0, 88).replace(/-+$/g, '');
  }
  return `milano-nightlife-sezione-0${fallbackIndex}`;
}

export function getSeoStandard21Copy(
  lang: LocaleCode,
  pageKey?: string,
  pagePath?: string,
): SeoContextualSiloModel {
  const resolved = resolveContextualSiloCards(lang, pageKey, pagePath);
  const isSingleGuidePage = resolved.isSingleGuidePage;

  return {
    cluster: resolved.cluster,
    isHomePage: resolved.isHomePage,
    isSingleGuidePage,
    eyebrow: resolved.eyebrow,
    heading: resolved.heading,
    exploreCta: resolved.exploreCta,
    cards: isSingleGuidePage
      ? resolved.cards.map((c) => ({ ...c, imageSrc: '' }))
      : resolved.cards,
    homeOverviewTitle: resolved.pack.homeOverviewTitle,
    homeOverviewLead: resolved.pack.homeOverviewLead,
    homeOverviewPillars: resolved.pack.homeOverviewPillars,
  };
}
