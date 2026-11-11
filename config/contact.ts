export const CONTACT = {
  email: 'concierge@nightlifemilan.com',
  whatsapp: {
    number: '+39 351 912 7047',
    link: 'https://wa.me/393519127047',
    labels: {
      en: 'Chat with us',
      it: 'Chatta con noi',
      es: 'Chatea con nosotros',
      fr: 'Écrivez-nous',
      de: 'Schreiben Sie uns',
      pt: 'Fale conosco',
    },
  },
};

export const SITE_CONTACT = CONTACT;

export function getWhatsAppLabel(locale: string): string {
  return CONTACT.whatsapp.labels[locale as keyof typeof CONTACT.whatsapp.labels] || CONTACT.whatsapp.labels.en;
}
