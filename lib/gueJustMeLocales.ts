import {
  getBatchEventTemplateValues,
  getBatchLocalizedEventContent,
} from './eventBatchContent';
import { EVENT_BATCH_LOCALE_FALLBACKS } from './eventBatchLocaleFallbacks';
import { getEventLocalePack } from './eventLocalePacks';
import { getEventbriteConfirmationPlainText } from './eventbriteConfirmation';
import { GUE_JUST_ME_EDITORIAL_COPY, GUE_JUST_ME_MUSIC_COPY } from './gueJustMeEditorialCopy';
import type { LocaleCode } from './i18n/locales';
import {
  GUE_JUST_ME_CANONICAL_SLUG,
  GUE_JUST_ME_EVENT_PROFILE,
  GUE_JUST_ME_EVENT_NAMES,
  GUE_JUST_ME_PHONE,
} from './gueJustMe';

function clamp(value: string, limit: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if ([...normalized].length <= limit) return normalized;
  return `${[...normalized].slice(0, limit - 1).join('').replace(/[\s,;:.-]+$/u, '')}…`;
}

export function getGueJustMeLocalizedContent(locale: LocaleCode) {
  // The shared batch helper historically treated every non-Italian locale as
  // English.  Pin the requested native event name into both legacy slots so
  // this one-off package is deterministic on both the current and deployed
  // helper versions.
  const profile = {
    ...GUE_JUST_ME_EVENT_PROFILE,
    eventName: {
      ...GUE_JUST_ME_EVENT_PROFILE.eventName,
      en: GUE_JUST_ME_EVENT_NAMES[locale],
      it: GUE_JUST_ME_EVENT_NAMES[locale],
    },
  };
  const pack = getEventLocalePack(locale);
  if (!pack) throw new Error(`Guè at Just Me cannot render locale ${locale}`);

  const base = getBatchLocalizedEventContent(profile, locale, pack);
  const templateValues = getBatchEventTemplateValues(profile, locale, pack);
  const confirmation = getEventbriteConfirmationPlainText(locale, GUE_JUST_ME_PHONE);
  const editorial = GUE_JUST_ME_EDITORIAL_COPY[locale];
  const music = GUE_JUST_ME_MUSIC_COPY[locale];
  const localizedGenreSource = String(templateValues.genres);
  const localizeGenres = (value: string) => value
    .split(localizedGenreSource).join(music)
    .replace(/Guè live performance.*?hits/gu, music);
  const dressRule = EVENT_BATCH_LOCALE_FALLBACKS[locale].elegantDressLongTrousers;
  const exactFacts = `25.07.2026 · Just Me Milano · 19:30–05:00 · 21+`;
  // The listing must only make claims that are useful to a buyer of this event.
  // Historic crowd-size claims are neither needed nor stable editorial evidence.
  const answerFirst = `${exactFacts}. ${editorial.stageNotice}`;

  return {
    ...base,
    title: GUE_JUST_ME_EVENT_NAMES[locale],
    metaTitle: clamp(`${GUE_JUST_ME_EVENT_NAMES[locale]} | Just Me Milano`, 62),
    metaDescription: clamp(`${exactFacts}. ${GUE_JUST_ME_EVENT_NAMES[locale]}. ${music}.`, 158),
    seoSummary: clamp(`${GUE_JUST_ME_EVENT_NAMES[locale]}. Just Me Milano, 25.07.2026. WhatsApp ${GUE_JUST_ME_PHONE}.`, 140),
    answerFirst,
    bookingIntro: `${confirmation.notTicket} ${confirmation.purchase} ${confirmation.afterPurchase}`,
    venueDescription: base.sections[2].body,
    leadPosterAfterBooking: true,
    programmeBeforeSections: true,
    sections: [
      { title: editorial.headings.dressCode, body: dressRule },
      { title: editorial.headings.target, body: editorial.targetBody },
      { title: editorial.headings.mood, body: `${exactFacts}. ${editorial.stageNotice}` },
      { title: editorial.headings.music, body: music },
    ],
    programme: [
      base.programme[0],
      { start: '22:30', end: '05:00', title: editorial.stageNotice },
    ],
    faqs: base.faqs.map((faq, index) => {
      if ((locale === 'en' || locale === 'it') && index === 11) {
        return { ...faq, answer: editorial.stageNotice };
      }
      return { ...faq, answer: localizeGenres(faq.answer) };
    }),
  };
}
