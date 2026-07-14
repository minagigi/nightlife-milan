import type { EventLocalePack } from './eventBatchLocaleTypes';
import { EVENT_LOCALE_PACKS } from './eventLocalePacksNative';
import { eventLocalePacksWestWorld } from './eventLocalePacksWestWorld';
import { eventLocalePacksNorthEast } from './eventLocalePacksNorthEast';
import { eventLocalePacksBalkan } from './eventLocalePacksBalkan';
import { enabledLocaleCodes, type LocaleCode } from './i18n/locales';

export const EVENT_LOCALE_PACKS_ALL: Record<LocaleCode, EventLocalePack> = {
  ...EVENT_LOCALE_PACKS,
  ...eventLocalePacksWestWorld,
  ...eventLocalePacksNorthEast,
  ...eventLocalePacksBalkan,
};

export function getEventLocalePack(locale: string): EventLocalePack | undefined {
  return EVENT_LOCALE_PACKS_ALL[locale as LocaleCode];
}
export function validateEventLocalePackCoverage(): void {
  const missing = enabledLocaleCodes.filter((locale) => !EVENT_LOCALE_PACKS_ALL[locale]);
  if (missing.length > 0) throw new Error(`Missing event locale packs: ${missing.join(', ')}`);
}
