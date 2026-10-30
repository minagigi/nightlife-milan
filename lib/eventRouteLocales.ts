import { ENABLED_LOCALES, isEnabledLocale, type LocaleCode } from './i18n/locales';

export const EVENT_CALENDAR_LOCALES: readonly LocaleCode[] = ENABLED_LOCALES.map((l) => l.code);

export function isEventCalendarLocale(locale: string): locale is LocaleCode {
  return isEnabledLocale(locale);
}
