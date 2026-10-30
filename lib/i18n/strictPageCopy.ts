import { isEnabledLocale, type LocaleCode } from './locales';

export type StrictPageCopyOptions = {
  trace?: string;
};

export function resolveStrictPageCopy<T>(
  locale: string,
  primary: Partial<Record<LocaleCode, T>>,
  extended?: Partial<Record<LocaleCode, T>>,
  _options: StrictPageCopyOptions = {},
): T {
  const code = (isEnabledLocale(locale) ? locale : 'en') as LocaleCode;
  if (code in primary && primary[code] !== undefined) {
    return primary[code] as T;
  }
  if (extended && code in extended && extended[code] !== undefined) {
    return extended[code] as T;
  }
  return (primary.en ?? extended?.en) as T;
}
