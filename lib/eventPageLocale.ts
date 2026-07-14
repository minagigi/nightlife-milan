import { getLocaleDef } from './i18n/locales';
import { tr } from './i18n/t';

export function eventText(locale: string, en: string, it: string, pt: string): string {
  if (locale === 'pt') return pt;
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
  if (locale === 'it') return `Altri eventi al ${venueName}`;
  if (locale === 'pt') return `Mais eventos no ${venueName}`;
  return `More events at ${venueName}`;
}

export function buildThisWeekAtHeading(locale: string, venueName: string): string {
  if (locale === 'it') return `Questa settimana al ${venueName}`;
  if (locale === 'pt') return `Esta semana no ${venueName}`;
  return `This Week at ${venueName}`;
}

export function getThisWeekInMilanHeading(locale: string): string {
  if (locale === 'it') return 'Questa settimana a Milano';
  if (locale === 'pt') return 'Esta semana em Milão';
  return 'This Week in Milan';
}

export function buildBookingSubtitle(locale: string, venueName: string): string {
  if (locale === 'it') return `Lista ospite o tavolo per ${venueName}`;
  if (locale === 'pt') return `Guest list ou mesa para o ${venueName}`;
  return `Guestlist or table for ${venueName}`;
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
