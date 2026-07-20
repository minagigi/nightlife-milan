import { getLocaleDef, type LocaleCode } from './i18n/locales';
import { tr } from './i18n/t';
import { c_GoldEventContentDict } from './i18n/dicts/c-goldeventcontent';
import { c_BookingFormDict } from './i18n/dicts/c-bookingform';
import { eventsSlugDict } from './i18n/dicts/events-slug';

const EVENT_PAGE_DICT: Record<string, Partial<Record<LocaleCode, string>>> = {
  ...c_BookingFormDict,
  ...c_GoldEventContentDict,
  ...eventsSlugDict,
};

const EVENT_PAGE_CONTEXT_LABELS: Record<LocaleCode, {
  bookingSubtitle: string;
  moreVenueEvents: string;
  thisWeekAt: string;
  thisWeekInMilan: string;
}> = {
  en: { bookingSubtitle: 'Guestlist or table for {venue}', moreVenueEvents: 'More events at {venue}', thisWeekAt: 'This Week at {venue}', thisWeekInMilan: 'This Week in Milan' },
  it: { bookingSubtitle: 'Lista ospiti o tavolo per {venue}', moreVenueEvents: 'Altri eventi al {venue}', thisWeekAt: 'Questa settimana al {venue}', thisWeekInMilan: 'Questa settimana a Milano' },
  es: { bookingSubtitle: 'Lista de invitados o mesa para {venue}', moreVenueEvents: 'Más eventos en {venue}', thisWeekAt: 'Esta semana en {venue}', thisWeekInMilan: 'Esta semana en Milán' },
  fr: { bookingSubtitle: 'Liste invités ou table au {venue}', moreVenueEvents: 'Autres événements au {venue}', thisWeekAt: 'Cette semaine au {venue}', thisWeekInMilan: 'Cette semaine à Milan' },
  de: { bookingSubtitle: 'Gästeliste oder Tisch im {venue}', moreVenueEvents: 'Weitere Events im {venue}', thisWeekAt: 'Diese Woche im {venue}', thisWeekInMilan: 'Diese Woche in Mailand' },
  pt: { bookingSubtitle: 'Guest list ou mesa para o {venue}', moreVenueEvents: 'Mais eventos no {venue}', thisWeekAt: 'Esta semana no {venue}', thisWeekInMilan: 'Esta semana em Milão' },
  nl: { bookingSubtitle: 'Gastenlijst of tafel bij {venue}', moreVenueEvents: 'Meer evenementen bij {venue}', thisWeekAt: 'Deze week bij {venue}', thisWeekInMilan: 'Deze week in Milaan' },
  ru: { bookingSubtitle: 'Гостевой список или столик в {venue}', moreVenueEvents: 'Другие события в {venue}', thisWeekAt: 'На этой неделе в {venue}', thisWeekInMilan: 'На этой неделе в Милане' },
  tr: { bookingSubtitle: '{venue} için konuk listesi veya masa', moreVenueEvents: '{venue} mekanındaki diğer etkinlikler', thisWeekAt: 'Bu hafta {venue} mekanında', thisWeekInMilan: 'Bu hafta Milano’da' },
  zh: { bookingSubtitle: '{venue}宾客名单或卡座', moreVenueEvents: '{venue}的更多活动', thisWeekAt: '{venue}本周活动', thisWeekInMilan: '米兰本周活动' },
  ar: { bookingSubtitle: 'قائمة الضيوف أو طاولة في {venue}', moreVenueEvents: 'فعاليات أخرى في {venue}', thisWeekAt: 'هذا الأسبوع في {venue}', thisWeekInMilan: 'هذا الأسبوع في ميلانو' },
  bg: { bookingSubtitle: 'Гост лист или маса в {venue}', moreVenueEvents: 'Още събития в {venue}', thisWeekAt: 'Тази седмица в {venue}', thisWeekInMilan: 'Тази седмица в Милано' },
  hr: { bookingSubtitle: 'Popis gostiju ili stol u {venue}', moreVenueEvents: 'Više događaja u {venue}', thisWeekAt: 'Ovaj tjedan u {venue}', thisWeekInMilan: 'Ovaj tjedan u Milanu' },
  cs: { bookingSubtitle: 'Seznam hostů nebo stůl v {venue}', moreVenueEvents: 'Další akce v {venue}', thisWeekAt: 'Tento týden v {venue}', thisWeekInMilan: 'Tento týden v Miláně' },
  da: { bookingSubtitle: 'Gæsteliste eller bord på {venue}', moreVenueEvents: 'Flere events på {venue}', thisWeekAt: 'Denne uge på {venue}', thisWeekInMilan: 'Denne uge i Milano' },
  et: { bookingSubtitle: 'Külaliste nimekiri või laud klubis {venue}', moreVenueEvents: 'Rohkem üritusi klubis {venue}', thisWeekAt: 'Sel nädalal klubis {venue}', thisWeekInMilan: 'Sel nädalal Milanos' },
  fi: { bookingSubtitle: 'Vieraslista tai pöytä paikassa {venue}', moreVenueEvents: 'Lisää tapahtumia paikassa {venue}', thisWeekAt: 'Tällä viikolla paikassa {venue}', thisWeekInMilan: 'Tällä viikolla Milanossa' },
  el: { bookingSubtitle: 'Λίστα καλεσμένων ή τραπέζι στο {venue}', moreVenueEvents: 'Περισσότερες εκδηλώσεις στο {venue}', thisWeekAt: 'Αυτή την εβδομάδα στο {venue}', thisWeekInMilan: 'Αυτή την εβδομάδα στο Μιλάνο' },
  hu: { bookingSubtitle: 'Vendéglista vagy asztal itt: {venue}', moreVenueEvents: 'További események itt: {venue}', thisWeekAt: 'Ezen a héten itt: {venue}', thisWeekInMilan: 'Ezen a héten Milánóban' },
  ga: { bookingSubtitle: 'Liosta aíonna nó tábla ag {venue}', moreVenueEvents: 'Tuilleadh imeachtaí ag {venue}', thisWeekAt: 'An tseachtain seo ag {venue}', thisWeekInMilan: 'An tseachtain seo i Milano' },
  lv: { bookingSubtitle: 'Viesu saraksts vai galdiņš vietā {venue}', moreVenueEvents: 'Vairāk pasākumu vietā {venue}', thisWeekAt: 'Šonedēļ vietā {venue}', thisWeekInMilan: 'Šonedēļ Milānā' },
  lt: { bookingSubtitle: 'Svečių sąrašas arba staliukas vietoje {venue}', moreVenueEvents: 'Daugiau renginių vietoje {venue}', thisWeekAt: 'Šią savaitę vietoje {venue}', thisWeekInMilan: 'Šią savaitę Milane' },
  mt: { bookingSubtitle: 'Lista tal-mistednin jew mejda f’{venue}', moreVenueEvents: 'Aktar avvenimenti f’{venue}', thisWeekAt: 'Din il-ġimgħa f’{venue}', thisWeekInMilan: 'Din il-ġimgħa f’Milan' },
  pl: { bookingSubtitle: 'Lista gości lub stolik w {venue}', moreVenueEvents: 'Więcej wydarzeń w {venue}', thisWeekAt: 'W tym tygodniu w {venue}', thisWeekInMilan: 'W tym tygodniu w Mediolanie' },
  ro: { bookingSubtitle: 'Listă de invitați sau masă la {venue}', moreVenueEvents: 'Mai multe evenimente la {venue}', thisWeekAt: 'Săptămâna aceasta la {venue}', thisWeekInMilan: 'Săptămâna aceasta în Milano' },
  sk: { bookingSubtitle: 'Zoznam hostí alebo stôl v {venue}', moreVenueEvents: 'Ďalšie podujatia v {venue}', thisWeekAt: 'Tento týždeň v {venue}', thisWeekInMilan: 'Tento týždeň v Miláne' },
  sl: { bookingSubtitle: 'Seznam gostov ali miza v {venue}', moreVenueEvents: 'Več dogodkov v {venue}', thisWeekAt: 'Ta teden v {venue}', thisWeekInMilan: 'Ta teden v Milanu' },
  sv: { bookingSubtitle: 'Gästlista eller bord på {venue}', moreVenueEvents: 'Fler evenemang på {venue}', thisWeekAt: 'Den här veckan på {venue}', thisWeekInMilan: 'Den här veckan i Milano' },
  no: { bookingSubtitle: 'Gjesteliste eller bord på {venue}', moreVenueEvents: 'Flere arrangementer på {venue}', thisWeekAt: 'Denne uken på {venue}', thisWeekInMilan: 'Denne uken i Milano' },
  is: { bookingSubtitle: 'Gestalisti eða borð á {venue}', moreVenueEvents: 'Fleiri viðburðir á {venue}', thisWeekAt: 'Í þessari viku á {venue}', thisWeekInMilan: 'Í þessari viku í Mílanó' },
  uk: { bookingSubtitle: 'Гостьовий список або столик у {venue}', moreVenueEvents: 'Інші події в {venue}', thisWeekAt: 'Цього тижня в {venue}', thisWeekInMilan: 'Цього тижня в Мілані' },
  sq: { bookingSubtitle: 'Listë të ftuarish ose tavolinë në {venue}', moreVenueEvents: 'Më shumë evente në {venue}', thisWeekAt: 'Këtë javë në {venue}', thisWeekInMilan: 'Këtë javë në Milano' },
  sr: { bookingSubtitle: 'Lista gostiju ili sto u {venue}', moreVenueEvents: 'Još događaja u {venue}', thisWeekAt: 'Ove nedelje u {venue}', thisWeekInMilan: 'Ove nedelje u Milanu' },
  bs: { bookingSubtitle: 'Lista gostiju ili sto u {venue}', moreVenueEvents: 'Više događaja u {venue}', thisWeekAt: 'Ove sedmice u {venue}', thisWeekInMilan: 'Ove sedmice u Milanu' },
  mk: { bookingSubtitle: 'Листа на гости или маса во {venue}', moreVenueEvents: 'Повеќе настани во {venue}', thisWeekAt: 'Оваа недела во {venue}', thisWeekInMilan: 'Оваа недела во Милано' },
};

function contextualLabel(locale: string, key: keyof (typeof EVENT_PAGE_CONTEXT_LABELS)[LocaleCode], venueName?: string): string {
  const labels = EVENT_PAGE_CONTEXT_LABELS[(locale in EVENT_PAGE_CONTEXT_LABELS ? locale : 'en') as LocaleCode];
  return labels[key].replace('{venue}', venueName || '');
}

export function eventText(locale: string, en: string, it: string, pt?: string): string {
  if (locale === 'pt' && pt) return pt;
  if (locale !== 'en' && locale !== 'it') {
    const translated = EVENT_PAGE_DICT[en]?.[locale as LocaleCode];
    if (translated) return translated;
  }
  return tr(locale, en, it);
}

export function formatEventGenre(locale: string, genre: string): string {
  const normalized = genre.toLowerCase();
  if (locale === 'pt') {
    const pt: Record<string, string> = {
      commercial: 'comercial',
      electronic: 'música eletrônica',
      hip_hop: 'hip hop',
      house: 'house',
      latin: 'latina',
      pop: 'pop',
      reggaeton: 'reggaeton',
    };
    return pt[normalized] || genre.replace(/_/g, ' ');
  }
  return genre.replace(/_/g, ' ');
}

export function getIntlLocale(locale: string): string {
  return getLocaleDef(locale)?.hreflang || 'en-US';
}

export function getQuickAnswerLabel(locale: string): string {
  if (locale === 'it') return 'Risposta rapida';
  if (locale === 'pt') return 'Resposta rápida';
  return 'Quick Answer';
}

export function buildEventQuickAnswer(input: {
  locale: string;
  title: string;
  venueName: string;
  formattedDate: string;
  pricePhrase?: string;
}): string {
  const { locale, title, venueName, formattedDate, pricePhrase } = input;
  const prices = pricePhrase ? ` ${pricePhrase}.` : '';
  if (locale === 'it') {
    return `${title} @ ${venueName} a Milano. Data: ${formattedDate}.${prices} Prenota via WhatsApp +39 351 912 7047.`;
  }
  if (locale === 'pt') {
    return `${title} no ${venueName}, em Milão. Data: ${formattedDate}.${prices} Reserve pelo WhatsApp +39 351 912 7047.`;
  }
  return `${title} @ ${venueName} in Milan. Date: ${formattedDate}.${prices} Book via WhatsApp +39 351 912 7047.`;
}

export function getVenueHeadingParts(locale: string): { prefix?: string; suffix?: string } {
  if (locale === 'it') return { suffix: ': La Venue' };
  if (locale === 'pt') return { prefix: 'Sobre o' };
  return { prefix: 'About' };
}

export function buildVenueDescription(locale: string, venueName: string, address: string): string {
  if (locale === 'it') {
    return `${venueName} è uno dei locali più esclusivi di Milano, situato in ${address}. Prenota il tuo tavolo VIP o inserisciti in guestlist per garantirti la migliore esperienza.`;
  }
  if (locale === 'pt') {
    return `${venueName} é um dos clubes de referência da vida noturna de Milão, em ${address}. Reserve uma mesa VIP ou confirme a guest list antes de chegar.`;
  }
  return `${venueName} is one of Milan's most exclusive venues, located at ${address}. Book your VIP table or get on the guestlist to ensure the best experience.`;
}

export function buildMoreVenueEventsHeading(locale: string, venueName: string): string {
  return contextualLabel(locale, 'moreVenueEvents', venueName);
}

export function buildThisWeekAtHeading(locale: string, venueName: string): string {
  return contextualLabel(locale, 'thisWeekAt', venueName);
}

export function getThisWeekInMilanHeading(locale: string): string {
  return contextualLabel(locale, 'thisWeekInMilan');
}

export function buildBookingSubtitle(locale: string, venueName: string): string {
  return contextualLabel(locale, 'bookingSubtitle', venueName);
}

export function buildBookingMessage(input: {
  locale: string;
  eventName?: string;
  venueName?: string;
  date?: string;
  guests: string;
  name: string;
  email: string;
  fallbackContext: string;
}): string {
  const { locale, eventName, venueName, date, guests, name, email, fallbackContext } = input;
  if (locale === 'it') {
    const context = eventName ? `l'evento "${eventName}"` : venueName ? `un tavolo al ${venueName}` : fallbackContext;
    return `Ciao! Vorrei prenotare ${context}${date ? ` per il ${date}` : ''} per ${guests} persone. Mi chiamo ${name} (${email}). Potete aiutarmi?`;
  }
  if (locale === 'pt') {
    const context = eventName ? `o evento "${eventName}"` : venueName ? `uma mesa no ${venueName}` : fallbackContext;
    return `Olá! Gostaria de reservar ${context}${date ? ` para ${date}` : ''} para ${guests} pessoas. Chamo-me ${name} (${email}). Podem ajudar?`;
  }
  const context = eventName ? `the event "${eventName}"` : venueName ? `a table at ${venueName}` : fallbackContext;
  return `Hi! I'd like to book ${context}${date ? ` for ${date}` : ''} for ${guests} guests. My name is ${name} (${email}). Can you help?`;
}
