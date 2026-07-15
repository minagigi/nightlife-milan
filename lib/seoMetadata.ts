import { CONTACT } from '@/config/contact';
import { getLocaleDef } from '@/lib/i18n/locales';

const PHONE = CONTACT.whatsapp.number;

const WHATSAPP_CTA: Record<string, string> = {
  en: `Book on WhatsApp ${PHONE}.`,
  it: `Prenota su WhatsApp ${PHONE}.`,
  es: `Reserva por WhatsApp ${PHONE}.`,
  fr: `Reservez sur WhatsApp ${PHONE}.`,
  de: `Über WhatsApp buchen: ${PHONE}.`,
  pt: `Reserve pelo WhatsApp ${PHONE}.`,
  nl: `Boek via WhatsApp ${PHONE}.`,
  ru: `Бронь в WhatsApp: ${PHONE}.`,
  tr: `WhatsApp'tan rezervasyon: ${PHONE}.`,
  zh: `通过 WhatsApp 预订：${PHONE}。`,
  ar: `احجز عبر WhatsApp: ${PHONE}.`,
  bg: `Резервация чрез WhatsApp: ${PHONE}.`,
  hr: `Rezervirajte putem WhatsAppa: ${PHONE}.`,
  cs: `Rezervace pres WhatsApp: ${PHONE}.`,
  da: `Book via WhatsApp ${PHONE}.`,
  et: `Broneeri WhatsAppis: ${PHONE}.`,
  fi: `Varaa WhatsAppissa: ${PHONE}.`,
  el: `Κράτηση μέσω WhatsApp: ${PHONE}.`,
  hu: `Foglalas WhatsAppon: ${PHONE}.`,
  ga: `Cuir in airithe ar WhatsApp: ${PHONE}.`,
  lv: `Rezervacija WhatsApp: ${PHONE}.`,
  lt: `Rezervuokite per WhatsApp: ${PHONE}.`,
  mt: `Ibbukkja permezz ta' WhatsApp: ${PHONE}.`,
  pl: `Rezerwacja przez WhatsApp: ${PHONE}.`,
  ro: `Rezerva pe WhatsApp: ${PHONE}.`,
  sk: `Rezervacia cez WhatsApp: ${PHONE}.`,
  sl: `Rezervacija prek WhatsAppa: ${PHONE}.`,
  sv: `Boka via WhatsApp ${PHONE}.`,
  no: `Bestill via WhatsApp ${PHONE}.`,
  is: `Bokun i gegnum WhatsApp: ${PHONE}.`,
  uk: `Бронювання у WhatsApp: ${PHONE}.`,
  sq: `Rezervo ne WhatsApp: ${PHONE}.`,
  sr: `Rezervacija putem WhatsAppa: ${PHONE}.`,
  bs: `Rezervacija putem WhatsAppa: ${PHONE}.`,
  mk: `Резервација преку WhatsApp: ${PHONE}.`,
};

const MILAN_NAME: Record<string, string> = {
  it: 'Milano', es: 'Milán', fr: 'Milan', de: 'Mailand', pt: 'Milão',
  ru: 'Милан', tr: 'Milano', zh: '米兰', ar: 'ميلانو', bg: 'Милано',
  el: 'Μιλάνο', hu: 'Milano', pl: 'Mediolan', ro: 'Milano', uk: 'Мілан',
  mk: 'Милано',
};

function normalize(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function ensureSentence(value: string): string {
  const clean = value.replace(/[\s,;:|-]+$/u, '').trim();
  if (!clean) return '';
  return /[.!?。]$/u.test(clean) ? clean : `${clean}.`;
}

export function truncateSeoText(value: string, maxLength: number): string {
  const clean = normalize(value);
  if (clean.length <= maxLength) return clean;
  const slice = clean.slice(0, maxLength + 1);
  const boundary = slice.lastIndexOf(' ');
  return (boundary > maxLength * 0.7 ? slice.slice(0, boundary) : clean.slice(0, maxLength)).replace(/[\s,;:|-]+$/u, '');
}

function stripTrailingWhatsappSentence(value: string): string {
  if (value.includes(PHONE)) return value;
  return value.replace(/(?:[^.!?]{0,90}\bWhatsApp\b[^.!?]*[.!?]?\s*)$/iu, '').trim();
}

/** Adds one localized, measurable booking CTA without wasting title space. */
export function withWhatsApp(description: string, locale: string, maxLength = 158): string {
  const cta = WHATSAPP_CTA[locale] || WHATSAPP_CTA.en;
  const clean = normalize(description);
  if (clean.includes(PHONE) && clean.length <= maxLength) return ensureSentence(clean);

  const withoutPhoneSentence = clean.includes(PHONE)
    ? clean.replace(new RegExp(`[^.!?]{0,90}${PHONE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^.!?]*[.!?]?`, 'u'), ' ')
    : clean;
  const base = stripTrailingWhatsappSentence(normalize(withoutPhoneSentence));
  const available = Math.max(48, maxLength - cta.length - 1);
  return `${ensureSentence(truncateSeoText(base, available))} ${cta}`.trim();
}

export function seoTitle(value: string, maxLength = 62): string {
  let clean = normalize(value)
    .replace(/\s*\|\s*Nightlife Milan\s*\|\s*Nightlife Milan$/iu, ' | Nightlife Milan')
    .replace(/\s+([|:])/g, ' $1');
  if (clean.length > maxLength) {
    clean = clean.replace(/\s*[|—-]\s*Nightlife Milan$/iu, '').trim();
  }
  return truncateSeoText(clean, maxLength);
}

function localeTag(locale: string): string {
  return getLocaleDef(locale)?.hreflang || 'en';
}

export function formatSeoDate(locale: string, dateISO: string, long = false): string {
  return new Intl.DateTimeFormat(localeTag(locale), {
    weekday: long ? 'long' : 'short',
    day: 'numeric',
    month: long ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'Europe/Rome',
  }).format(new Date(dateISO));
}

function folded(value: string): string {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

export function buildEventSeoTitle(input: {
  locale: string;
  eventName: string;
  venueName: string;
  dateISO: string;
}): string {
  const { locale, eventName, venueName, dateISO } = input;
  const city = MILAN_NAME[locale] || 'Milan';
  const foldedVenue = folded(venueName);
  const nameHasVenue = foldedVenue.length > 0 && folded(eventName).includes(foldedVenue);
  const date = formatSeoDate(locale, dateISO);
  const context = nameHasVenue ? city : `${venueName}, ${city}`;
  const suffix = ` | ${context} | ${date}`;
  const eventPart = truncateSeoText(eventName, Math.max(28, 68 - suffix.length));
  return seoTitle(`${eventPart}${suffix}`);
}

export function buildEventSeoDescription(input: {
  locale: string;
  venueName: string;
  dateISO: string;
  summary: string;
}): string {
  const { locale, venueName, dateISO, summary } = input;
  const city = MILAN_NAME[locale] || 'Milan';
  const lead = `${venueName}, ${city}, ${formatSeoDate(locale, dateISO, true)}.`;
  return withWhatsApp(`${lead} ${summary}`, locale);
}

export function whatsappCta(locale: string): string {
  return WHATSAPP_CTA[locale] || WHATSAPP_CTA.en;
}

export function seoRobots(locale: string, allowIndex = true) {
  const canIndex = allowIndex && getLocaleDef(locale)?.indexed !== false;
  return canIndex ? { index: true, follow: true } : { index: false, follow: true };
}
