import { EVENT_BATCH_LOCALE_FALLBACKS } from './eventBatchLocaleFallbacks';
import { getEventLocalePack } from './eventLocalePacks';
import type { LocaleCode } from './i18n/locales';
import { getWorldCupFinalLocaleCopy } from './worldCupFinalLocaleCopies';
import { getWorldCupFinalLocalizedContent } from './worldCupFinalLocales';

export const WORLD_CUP_FINAL_GALLERY_KINDS = [
  'programme',
  'target',
  'dress',
  'afterparty',
] as const;

export type WorldCupFinalGalleryKind = typeof WORLD_CUP_FINAL_GALLERY_KINDS[number];

export const WORLD_CUP_FINAL_VISUAL_REVISION = 'wc26-fullbleed-v3';

export function getWorldCupFinalGeneratedImagePath(
  locale: LocaleCode,
  kind: WorldCupFinalGalleryKind,
  version: 'v3' = 'v3',
): string {
  return `/images/events/generated/just-me-world-cup-final-${kind}-5x4-${locale}-${version}.jpg`;
}

export function getWorldCupFinalGalleryImageCopy(locale: LocaleCode): ReadonlyArray<{
  kind: WorldCupFinalGalleryKind;
  title: string;
  alt: string;
  description: string;
  width: 1600;
  height: 1280;
}> {
  const content = getWorldCupFinalLocalizedContent(locale);
  const copy = getWorldCupFinalLocaleCopy(locale);
  const pack = getEventLocalePack(locale);
  if (!pack) throw new Error(`Missing event locale pack for World Cup gallery: ${locale}`);

  const dress = EVENT_BATCH_LOCALE_FALLBACKS[locale].elegantDressLongTrousers;
  return [
    {
      kind: 'programme',
      title: `${pack.eventbrite.programmeTitle} - ${copy.eventName}`,
      alt: `${pack.eventbrite.programmeTitle}: ${copy.poster.doors}; ${copy.poster.live}; ${copy.poster.aperitif}. Just Me Milano.`,
      description: `${pack.eventbrite.programmeTitle}: ${copy.poster.doors}; ${copy.poster.live}; ${copy.poster.aperitif}.`,
      width: 1600,
      height: 1280,
    },
    {
      kind: 'target',
      title: `${content.sections[1].title} - ${copy.eventName}`,
      alt: `${content.sections[1].title}: 21+. ${copy.poster.teams}. Just Me Milano.`,
      description: `${content.sections[1].title}: 21+. ${copy.poster.teams}.`,
      width: 1600,
      height: 1280,
    },
    {
      kind: 'dress',
      title: `${content.sections[0].title} - ${copy.eventName}`,
      alt: `${content.sections[0].title}: ${dress}. ${copy.eventName}, Just Me Milano.`,
      description: dress,
      width: 1600,
      height: 1280,
    },
    {
      kind: 'afterparty',
      title: `${content.sections[3].title} - ${copy.eventName}`,
      alt: `${content.sections[3].title}: ${content.sections[3].body}. Just Me Milano.`,
      description: content.sections[3].body,
      width: 1600,
      height: 1280,
    },
  ];
}
