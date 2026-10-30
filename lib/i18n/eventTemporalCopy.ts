import type { LocaleCode } from '@/lib/i18n/locales';

export function getEventTemporalCopy(locale: LocaleCode | string, _checkedAt?: string) {
  if (locale === 'it') {
    return {
      endedNotice: 'Questo evento datato si è concluso. Contatta il concierge su WhatsApp per le prossime date in programma.',
      historicalOffers: 'Le formule indicate si riferiscono alla data pubblicata.',
    };
  }
  return {
    endedNotice: 'This dated event has ended. Contact the concierge on WhatsApp for upcoming scheduled dates.',
    historicalOffers: 'Published offers apply to the stated event date.',
  };
}
