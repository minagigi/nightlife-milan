import { getEventLocaleLabels } from '@/lib/eventLocaleLabels';
import type { LocaleCode } from '@/lib/i18n/locales';

export async function getMfwCopy(locale: LocaleCode | string) {
  const labels = getEventLocaleLabels(locale);
  return {
    ui: {
      home: labels.home || 'Home',
      edition: 'Milan Fashion Week SS 2027',
      mfw: 'Milan Fashion Week',
    },
    calendar: {
      help: 'Official calendar and afterparty guide.',
    },
  };
}
