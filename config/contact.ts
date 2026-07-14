export const CONTACT = {
  whatsapp: {
    number: '+39 351 912 7047',
    link: 'https://wa.me/393519127047',
    labels: {
      en: 'Chat with us',
      it: 'Chatta con noi',
      pt: 'Fale conosco',
    },
  },
};

export function getWhatsAppLabel(locale: string): string {
  return CONTACT.whatsapp.labels[locale as keyof typeof CONTACT.whatsapp.labels] || CONTACT.whatsapp.labels.en;
}
