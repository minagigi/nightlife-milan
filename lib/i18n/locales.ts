export * from './localeRegistry';
import {
  DEFAULT_LOCALE,
  INDEXED_LOCALES,
  getLocaleDef,
  localePrefix,
  type LocaleCode,
} from './localeRegistry';
import { localizeInternalHref } from './localizedSlugs35';

export function canonicalPageUrl(baseUrl: string, locale: string, canonicalInternalPath: string): string {
  const code = (getLocaleDef(locale)?.code || DEFAULT_LOCALE) as LocaleCode;
  const normPath = !canonicalInternalPath || canonicalInternalPath === '/' ? '' : canonicalInternalPath;
  const locFull = normPath
    ? localizeInternalHref(`${localePrefix(code)}${normPath}`, code)
    : localePrefix(code);
  return `${baseUrl}${locFull === '/' ? '' : locFull}` || `${baseUrl}/`;
}

export function hreflangAlternates(baseUrl: string, path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of INDEXED_LOCALES) {
    out[l.hreflang] = canonicalPageUrl(baseUrl, l.code, path);
  }
  out['x-default'] = canonicalPageUrl(baseUrl, 'en', path);
  return out;
}

export function hreflangAlternatesForLocales(
  baseUrl: string,
  path: string,
  locales: readonly LocaleCode[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const code of locales) {
    const locale = getLocaleDef(code);
    if (!locale) continue;
    out[locale.hreflang] = canonicalPageUrl(baseUrl, code, path);
  }
  out['x-default'] = canonicalPageUrl(baseUrl, 'en', path);
  return out;
}
