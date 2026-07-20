import type { EventBatchOfferProfile, EventBatchProfile } from './eventBatchProfiles';
import { getBatchLocalizedEventContent } from './eventBatchContent';
import type { EventLocalePack, EventOfferKey } from './eventBatchLocaleTypes';
import { getEventLocalePack } from './eventLocalePacks';
import { getEventbriteConfirmationPlainText } from './eventbriteConfirmation';
import { GUE_JUST_ME_EDITORIAL_COPY } from './gueJustMeEditorialCopy';
import { enabledLocaleCodes, type LocaleCode } from './i18n/locales';
import type { LocalizedEventContent, LocalizedEventOffer } from './localizedEventContent';
import { WEEKLY_JULY20_BATCH_EVENTS, WEEKLY_JULY20_PHONE, type WeeklyJuly20BatchEvent, type WeeklyLocale } from './weeklyJuly20Batch';

const SLUGS: Record<string, { en: string; it: string }> = {
  'justme-university-2026-07-21': {
    en: 'just-me-milano-university-party-tuesday-july-21-2026',
    it: 'just-me-milano-university-party-martedi-21-luglio-2026',
  },
  'justme-wednesday-2026-07-22': {
    en: 'just-me-milano-wednesday-night-july-22-2026',
    it: 'just-me-milano-mercoledi-22-luglio-2026',
  },
  'justme-thursday-2026-07-23': {
    en: 'just-me-milano-thursday-night-july-23-2026',
    it: 'just-me-milano-giovedi-23-luglio-2026',
  },
  'justme-friday-2026-07-24': {
    en: 'just-me-milano-friday-night-july-24-2026',
    it: 'just-me-milano-venerdi-24-luglio-2026',
  },
  'aria-friday-2026-07-24': {
    en: 'aria-club-milano-friday-night-july-24-2026',
    it: 'aria-club-milano-venerdi-24-luglio-2026',
  },
  'pineta-friday-2026-07-24': {
    en: 'pineta-club-milano-friday-night-july-24-2026',
    it: 'pineta-club-milano-venerdi-24-luglio-2026',
  },
  'aria-saturday-2026-07-25': {
    en: 'aria-club-milano-saturday-night-july-25-2026',
    it: 'aria-club-milano-sabato-25-luglio-2026',
  },
  'pineta-saturday-2026-07-25': {
    en: 'pineta-club-milano-saturday-night-july-25-2026',
    it: 'pineta-club-milano-sabato-25-luglio-2026',
  },
  'justme-sunday-2026-07-26': {
    en: 'just-me-milano-sunday-night-july-26-2026',
    it: 'just-me-milano-domenica-26-luglio-2026',
  },
};

const AREA_BY_VENUE: Record<WeeklyJuly20BatchEvent['venueId'], { en: string; it: string }> = {
  'v-justme': { en: 'Sempione, Milan', it: 'Sempione, Milano' },
  'v-aria': { en: 'San Siro, Milan', it: 'San Siro, Milano' },
  'v-pineta': { en: 'Via Messina, Milan', it: 'Via Messina, Milano' },
};

const VENUE_BY_ID: Record<WeeklyJuly20BatchEvent['venueId'], string> = {
  'v-justme': 'Just Me Milano',
  'v-aria': 'Aria Club Milano',
  'v-pineta': 'Pineta Club',
};

function dateIso(startUtc: string): string {
  return startUtc.slice(0, 10);
}

function offerKey(name: string): { key: EventOfferKey; category: EventBatchOfferProfile['category'] } {
  const lower = name.toLowerCase();
  if (lower.includes('pink pass') || lower.includes('woman')) return { key: 'womanOneDrink', category: 'guestlist' };
  if (lower.includes('open wine')) return { key: 'aperitifOpenWine', category: 'ticket' };
  if (lower.includes('aperitif') && lower.includes('2')) return { key: 'aperitifTwoDrinks', category: 'ticket' };
  if (lower.includes('aperitif')) return { key: 'aperitifOneDrink', category: 'ticket' };
  if ((lower.includes('club') || lower.includes('ticket') || lower.includes('man')) && lower.includes('2')) return { key: 'clubTwoDrinks', category: 'ticket' };
  if (lower.includes('club') || lower.includes('ticket') || lower.includes('man')) return { key: 'clubOneDrink', category: 'ticket' };
  if (lower.includes('prive dj')) return { key: 'priveDjTable', category: 'table' };
  if (lower.includes('prive aria')) return { key: 'priveAriaTable', category: 'table' };
  if (lower.includes('prive balcony')) return { key: 'priveBalconyTable', category: 'table' };
  if (lower.includes('vip prive')) return { key: 'vipPriveTable', category: 'table' };
  if (lower.includes('prive dance')) return { key: 'priveDanceFloorTable', category: 'table' };
  if (lower.includes('vip area')) return { key: 'vipAreaTable', category: 'table' };
  if (lower.includes('super vip') && lower.includes('front')) return { key: 'superVipFrontLineTable', category: 'table' };
  if (lower.includes('super vip')) return { key: 'superVipBackLineTable', category: 'table' };
  if (lower.includes('dj table')) return { key: 'djTable', category: 'table' };
  return { key: 'danceFloorTable', category: 'table' };
}

function profileFor(event: WeeklyJuly20BatchEvent): EventBatchProfile {
  const slugs = SLUGS[event.eventKey];
  if (!slugs) throw new Error(`${event.eventKey}: missing site slug`);
  return {
    baseId: `nlm-${event.eventKey}`,
    canonicalSlug: slugs.en,
    localizedSlugs: slugs,
    // Every enabled locale has a native EventLocalePack with 25 FAQ entries
    // and a complete booking/programme template. Do not leave a translated
    // title attached to an English-only page: these are full locale variants.
    siteLocales: enabledLocaleCodes,
    indexedLocales: enabledLocaleCodes,
    eventName: event.name,
    venue: VENUE_BY_ID[event.venueId],
    area: AREA_BY_VENUE[event.venueId],
    dateISO: dateIso(event.startUtc),
    dates: {
      en: event.localized.en.summary.split(' — ')[1]?.replace(`. Booking: +39 351 912 7047.`, '') || dateIso(event.startUtc),
      it: event.localized.it.summary.split(' — ')[1]?.replace(`. Prenotazioni: +39 351 912 7047.`, '') || dateIso(event.startUtc),
    },
    start: '19:30',
    end: '05:00',
    minAge: Number(event.ageRestriction.replace('+', '')),
    dressCode: event.dressCode,
    kind: 'club',
    genres: event.genres,
    affiliateUrl: event.affiliateUrl,
    posterUrl: event.visualAssets.en.cover,
    programme: [{ key: 'clubMixed', start: '19:30', end: '05:00' }],
    offers: event.offers.map((offer) => ({ ...offerKey(offer.name), price: offer.price })),
    specialGuests: { en: [], it: [] },
    venueImages: event.visualAssets.en.body.slice(1) as [string, string, string, string],
  };
}

export const WEEKLY_JULY20_SITE_PROFILES: readonly EventBatchProfile[] = WEEKLY_JULY20_BATCH_EVENTS.map(profileFor);

export function getWeeklyJuly20SiteProfileBySlug(slug: string): EventBatchProfile | undefined {
  return WEEKLY_JULY20_SITE_PROFILES.find((profile) =>
    profile.canonicalSlug === slug || Object.values(profile.localizedSlugs || {}).includes(slug)
  );
}

export function getWeeklyJuly20EventByProfile(profile: EventBatchProfile): WeeklyJuly20BatchEvent | undefined {
  return WEEKLY_JULY20_BATCH_EVENTS.find((event) => profile.baseId === `nlm-${event.eventKey}`);
}

function localOfferName(name: string, locale: WeeklyLocale): string {
  if (locale === 'en') return name;
  return name
    .replace('Dance Floor Table', 'Tavolo dance floor')
    .replace('VIP Area Table', 'Tavolo area VIP')
    .replace('Super VIP Area Table [Back Line]', 'Tavolo Super VIP back line')
    .replace('Super VIP Area Table [Front Line]', 'Tavolo Super VIP front line')
    .replace('DJ Table', 'Tavolo DJ')
    .replace('Prive Aria Table', 'Tavolo prive Aria')
    .replace('Prive DJ Table', 'Tavolo prive DJ')
    .replace('Prive Dance Floor Table', 'Tavolo prive dance floor')
    .replace('Prive Balcony Table', 'Tavolo prive balconata')
    .replace('VIP Prive Table', 'Tavolo VIP prive')
    .replace('Aperitif', 'Aperitivo')
    .replace('Club', 'Club')
    .replace('Ticket', 'Biglietto')
    .replace('Drink', 'drink')
    .replace('Drinks', 'drink')
    .replace('Open Wine', 'open wine')
    .replace('Man', 'Uomo')
    .replace('Woman', 'Donna')
    .replace('Pink Pass [Girls Only]', 'Pink Pass solo ragazze');
}

export function getWeeklyJuly20LocalizedContent(profile: EventBatchProfile, locale: LocaleCode): LocalizedEventContent | null {
  const event = getWeeklyJuly20EventByProfile(profile);
  if (!event) return null;

  if (locale !== 'en' && locale !== 'it') {
    const pack = getEventLocalePack(locale);
    if (!pack) return null;
    // The site stores local public assets as root-relative paths, whereas the
    // shared content validator intentionally requires an absolute HTTPS poster
    // URL for Eventbrite-capable profiles. Convert only for template validation.
    const base = getBatchLocalizedEventContent({
      ...profile,
      posterUrl: `https://nightlifemilan.com${profile.posterUrl}`,
    }, locale, pack);
    const confirmation = getEventbriteConfirmationPlainText(locale, WEEKLY_JULY20_PHONE);
    const headings = GUE_JUST_ME_EDITORIAL_COPY[locale].headings;
    const programme = base.programme.map((slot) => slot.title).join(' ');

    return {
      ...base,
      metaTitle: truncateMetadata(base.title, 62),
      metaDescription: truncateMetadata(base.seoSummary, 158),
      // Same answer-first conversion structure as the approved Guè English
      // pilot, while every statement below remains sourced from this event's
      // own profile and its locale pack.
      answerFirst: base.seoSummary,
      bookingIntro: `${confirmation.notTicket} ${confirmation.purchase} ${confirmation.afterPurchase}`,
      venueDescription: base.sections[0]?.body,
      leadPosterAfterBooking: true,
      programmeBeforeSections: true,
      sections: [
        { title: headings.target, body: base.sections[0]?.body || base.seoSummary },
        { title: headings.dressCode, body: base.sections[2]?.body || base.seoSummary },
        { title: headings.mood, body: base.sections[0]?.body || base.seoSummary },
        { title: headings.music, body: programme || base.sections[0]?.body || base.seoSummary },
      ],
    };
  }

  const copy = event.localized[locale];
  const isIt = locale === 'it';
  const headings = GUE_JUST_ME_EDITORIAL_COPY[locale].headings;
  const title = isIt
    ? `${event.name.it} al ${VENUE_BY_ID[event.venueId]} - ${profile.dates.it}`
    : `${event.name.en} at ${VENUE_BY_ID[event.venueId]} - ${profile.dates.en}`;
  const offers: LocalizedEventOffer[] = event.offers.map((offer) => ({
    name: localOfferName(offer.name, locale),
    price: offer.price,
    category: offerKey(offer.name).category,
    details: isIt ? 'Prezzo pubblicato su Xceed, salvo disponibilita aggiornata.' : 'Published Xceed price, subject to current availability.',
  }));
  return {
    locale,
    canonicalSlug: profile.canonicalSlug,
    title,
    metaTitle: title.length <= 62 ? title : isIt ? `${event.name.it} ${VENUE_BY_ID[event.venueId]} ${profile.dates.it}` : `${event.name.en} ${VENUE_BY_ID[event.venueId]} ${profile.dates.en}`,
    metaDescription: isIt
      ? `${event.name.it} a Milano: 19:30-05:00, ${event.ageRestriction}, ${event.genres.it}. Prenota su Xceed e conferma WhatsApp +39 351 912 7047.`
      : `${event.name.en} in Milan: 19:30-05:00, ${event.ageRestriction}, ${event.genres.en}. Book on Xceed and confirm on WhatsApp +39 351 912 7047.`,
    seoSummary: copy.summary,
    answerFirst: copy.answerFirst,
    bookingIntro: isIt
      ? `Biglietti e tavoli sono da acquistare solo dal link Xceed ufficiale. La registrazione Eventbrite non vale come ingresso. Dopo l'acquisto invia la conferma su WhatsApp al +39 351 912 7047.`
      : `Tickets and tables must be bought only from the official Xceed link. Eventbrite registration is not admission. After purchase, send the confirmation on WhatsApp to +39 351 912 7047.`,
    venueDescription: copy.sections.location,
    leadPosterAfterBooking: true,
    programmeBeforeSections: true,
    sections: [
      { title: headings.target, body: copy.sections.target },
      { title: headings.dressCode, body: copy.sections.dress },
      { title: headings.mood, body: copy.sections.mood },
      { title: headings.music, body: `${copy.sections.music} ${copy.sections.location}` },
    ],
    programme: copy.programme.map((slot) => ({ start: slot.start, title: slot.title })),
    offers,
    affiliateUrl: event.affiliateUrl,
    faqs: copy.faqs,
  };
}

export function getWeeklyJuly20GalleryCopy(profile: EventBatchProfile, locale: LocaleCode) {
  const event = getWeeklyJuly20EventByProfile(profile);
  if (!event) return null;
  const content = getWeeklyJuly20LocalizedContent(profile, locale);
  if (!content) return null;
  const isIt = locale === 'it';
  const assetLocale: WeeklyLocale = locale === 'it' ? 'it' : 'en';
  const venue = VENUE_BY_ID[event.venueId];
  const body = event.visualAssets[assetLocale].body;
  const fallbackTitles = isIt
    ? ['Locandina ufficiale', 'Arrivo alla location', 'Aperitivo e cocktail', 'Lounge e pubblico', 'Dancefloor']
    : ['Official poster', 'Arrival at the venue', 'Aperitivo and cocktails', 'Lounge and audience', 'Dancefloor'];
  const fallbackAlts = isIt
    ? [
        `Locandina ${content.title} con data, orario, dress code e contatti Nightlife Milan.`,
        `Ingresso e arrivo al ${venue} per ${content.title}.`,
        `Zona aperitivo e cocktail del ${venue} per ${content.title}.`,
        `Lounge del ${venue} con atmosfera elegante per ${content.title}.`,
        `Area club del ${venue} con atmosfera notturna per ${content.title}.`,
      ]
    : [
        `${content.title} poster with date, time, dress code and Nightlife Milan contacts.`,
        `Arrival area at ${venue} for ${content.title}.`,
        `Aperitivo and cocktail area at ${venue} for ${content.title}.`,
        `${venue} lounge with an elegant night atmosphere for ${content.title}.`,
        `${venue} club area with night atmosphere for ${content.title}.`,
      ];
  const pack = getEventLocalePack(locale);
  const nativeGallery = locale !== 'en' && locale !== 'it' && pack
    ? galleryLabels(pack.gallery, profile, locale, venue)
    : null;
  const titles = nativeGallery?.titles || fallbackTitles;
  const alts = nativeGallery?.alts || fallbackAlts;
  const useNativePoster = locale !== 'en' && locale !== 'it';
  const nativePosterBase = `/api/event-poster/${profile.baseId}/${locale}`;
  return {
    heading: galleryHeading(profile, locale, venue, content.title),
    hero: {
      src: useNativePoster ? `${nativePosterBase}?format=cover` : event.visualAssets[assetLocale].cover,
      title: content.title,
      alt: alts[0],
      description: content.seoSummary,
      aspect: 'landscape' as const,
    },
    images: body.map((src, index) => ({
      src: useNativePoster && index === 0 ? `${nativePosterBase}?format=poster` : src,
      title: titles[index],
      alt: alts[index],
      description: alts[index],
      aspect: 'five-four' as const,
    })),
  };
}

function truncateMetadata(value: string, limit: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if ([...normalized].length <= limit) return normalized;
  return `${[...normalized].slice(0, limit - 1).join('').replace(/[\s,;:.-]+$/u, '')}…`;
}

function galleryHeading(profile: EventBatchProfile, locale: LocaleCode, venue: string, fallback: string): string {
  const pack = getEventLocalePack(locale);
  if (!pack) return fallback;
  const eventName = profile.eventName[locale] || profile.eventName.en;
  return pack.gallery.heading
    .replace(/\{venue\}/g, venue)
    .replace(/\{event\}/g, eventName);
}

function galleryLabels(
  gallery: EventLocalePack['gallery'],
  profile: EventBatchProfile,
  locale: LocaleCode,
  venue: string,
): { titles: [string, string, string, string, string]; alts: [string, string, string, string, string] } {
  const eventName = profile.eventName[locale] || profile.eventName.en;
  const fill = (template: string) => template
    .replace(/\{venue\}/g, venue)
    .replace(/\{event\}/g, eventName);
  return {
    titles: [fill(gallery.posterTitle), ...gallery.moodTitles.map(fill)] as [string, string, string, string, string],
    alts: [fill(gallery.posterAlt), ...gallery.moodAlts.map(fill)] as [string, string, string, string, string],
  };
}
