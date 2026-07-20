import { getBatchLocalizedEventContent } from './eventBatchContent';
import { getEventBatchProfile } from './eventBatchProfiles';
import { getEventLocalePack } from './eventLocalePacks';
import { getEventbriteConfirmationPlainText } from './eventbriteConfirmation';
import type { LocaleCode } from './i18n/locales';
import type { LocalizedEventContent } from './localizedEventContent';
import { BAD_BUNNY_ARIA_EDITORIAL_COPY } from './badBunnyAriaEditorialCopy';
import {
  BAD_BUNNY_ARIA_ADDRESS,
  BAD_BUNNY_ARIA_CANONICAL_SLUG,
  BAD_BUNNY_ARIA_PHONE,
} from './badBunnyAria';

const EXACT_FACTS = '18.07.2026 · Aria Club Milano · 19:30–05:00 · 18+';

function clamp(value: string, limit: number): string {
  const compact = value.replace(/\s+/gu, ' ').trim();
  return [...compact].length <= limit
    ? compact
    : `${[...compact].slice(0, limit - 1).join('').replace(/[\s,;:.-]+$/u, '')}…`;
}

export function getBadBunnyAriaLocalizedContent(locale: LocaleCode): LocalizedEventContent {
  const profile = getEventBatchProfile(BAD_BUNNY_ARIA_CANONICAL_SLUG);
  const pack = getEventLocalePack(locale);
  if (!profile || !pack) throw new Error(`Bad Bunny Aria content cannot render ${locale}`);

  const base = getBatchLocalizedEventContent(profile, locale, pack);
  const copy = BAD_BUNNY_ARIA_EDITORIAL_COPY[locale];
  const confirmation = getEventbriteConfirmationPlainText(locale, BAD_BUNNY_ARIA_PHONE);
  const faqs = base.faqs.map((faq) => ({ ...faq }));
  faqs[0] = { question: copy.performanceQuestion, answer: copy.independentNotice };

  return {
    ...base,
    title: copy.eventName,
    metaTitle: clamp(`${copy.eventName} | Aria Club`, 62),
    metaDescription: clamp(`${EXACT_FACTS}. ${copy.independentNotice}`, 158),
    seoSummary: clamp(`${copy.eventName}. 18.07.2026 · Aria Club Milano · 18+. WhatsApp ${BAD_BUNNY_ARIA_PHONE}.`, 140),
    answerFirst: `${EXACT_FACTS}. ${copy.independentNotice}`,
    bookingIntro: `${confirmation.notTicket} ${confirmation.purchase} ${confirmation.afterPurchase}`,
    venueDescription: `${BAD_BUNNY_ARIA_ADDRESS}. ${base.sections[2].body}`,
    leadPosterAfterBooking: true,
    programmeBeforeSections: true,
    sections: [
      { title: pack.eventbrite.importantTitle, body: copy.independentNotice },
      base.sections[0],
      base.sections[2],
    ],
    faqs,
  };
}
