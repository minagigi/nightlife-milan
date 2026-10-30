import { SITE_CONTACT } from '@/config/contact';

const DEFAULT_MESSAGES: Record<string, string> = {
  it: 'Ciao Nightlife Milan! Vorrei informazioni e prenotare tavolo VIP o lista a Milano.',
  es: '¡Hola Nightlife Milan! Quisiera información y reservar mesa VIP o lista en Milán.',
  fr: 'Bonjour Nightlife Milan ! Je souhaite des informations pour réserver une table VIP ou guest list à Milan.',
  de: 'Hallo Nightlife Milan! Ich möchte Informationen und einen VIP-Tisch oder Gästeliste in Mailand reservieren.',
  pt: 'Olá Nightlife Milan! Gostaria de informações para reservar mesa VIP ou lista em Milão.',
  en: 'Hi Nightlife Milan! I would like info to book a VIP table or guest list in Milan.',
};

export function getConciergeBookingUrl(locale: string, context?: string): string {
  const baseMessage = DEFAULT_MESSAGES[locale] || DEFAULT_MESSAGES.en;
  const suffix = context ? ` (${context.trim()})` : '';
  return `${SITE_CONTACT.whatsapp.link}?text=${encodeURIComponent(`${baseMessage}${suffix}`)}`;
}
