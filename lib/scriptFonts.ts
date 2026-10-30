import type { LocaleCode } from '@/lib/i18n/locales';

export function getScriptFont(locale: LocaleCode | string): string | null {
  if (locale === 'zh' || locale === 'ar') return null;
  return 'default';
}
