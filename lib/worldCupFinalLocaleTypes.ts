import type { LocaleCode } from './i18n/locales';

export interface WorldCupFinalPosterCopy {
  worldCupFinal: string;
  final: string;
  teams: string;
  date: string;
  doors: string;
  live: string;
  aperitif: string;
  bookings: string;
}

export interface WorldCupFinalLocaleCopy {
  locale: LocaleCode;
  /** One canonical, native-language site slug for this locale. */
  slug: string;
  eventName: string;
  /** Five human search intents used in prose, headings and FAQ copy. */
  keywordIntents: readonly [string, string, string, string, string];
  poster: WorldCupFinalPosterCopy;
  gallery: {
    heading: string;
    posterTitle: string;
    /** Describe only the visible approved poster artwork. */
    posterAlt: string;
    moodTitles: readonly [string, string, string, string];
    /** Torre Branca, buffet, indoor lounge, outdoor lounge, in that order. */
    moodAlts: readonly [string, string, string, string];
  };
}

export type WorldCupFinalLocaleCopyMap = Record<LocaleCode, WorldCupFinalLocaleCopy>;
