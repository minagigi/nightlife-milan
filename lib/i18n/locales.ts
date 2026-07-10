// Registry unico delle lingue del sito (piano .claude/plans/2026-07-10-multilingual-strategy.md).
// OGNI consumer (middleware, sitemap, indexing, layout, switcher, publisher Eventbrite)
// legge da qui: aggiungere/attivare una lingua = toccare SOLO questo file.
//
// `enabled: false` = la lingua è pronta a livello di infrastruttura ma non ancora
// esposta (niente route, hreflang, sitemap): si attiva in FASE L1/L2 dopo la review
// a campione del contenuto tradotto, come da guardrail anti scaled-content del piano.

export type LocaleCode =
  | 'en' | 'it'
  // Tier A — localizzazione Sonnet (keyword native)
  | 'es' | 'fr' | 'de' | 'pt' | 'nl' | 'ru' | 'tr' | 'zh' | 'ar'
  // Tier B — UE
  | 'bg' | 'hr' | 'cs' | 'da' | 'et' | 'fi' | 'el' | 'hu' | 'ga'
  | 'lv' | 'lt' | 'mt' | 'pl' | 'ro' | 'sk' | 'sl' | 'sv'
  // Tier B — Europa extra-UE / Est / Balcani
  | 'no' | 'is' | 'uk' | 'sq' | 'sr' | 'bs' | 'mk';

export type LocaleTier = 'native' | 'A' | 'B';

export interface LocaleDef {
  code: LocaleCode;
  /** Codice hreflang / attributo lang (BCP 47) */
  hreflang: string;
  nativeName: string;
  englishName: string;
  dir: 'ltr' | 'rtl';
  /** native = generato dal rewriter (en/it); A = localizzazione Sonnet; B = traduzione Haiku */
  tier: LocaleTier;
  /** Locale Eventbrite del listing: quello nativo se supportato, altrimenti il più vicino (en_GB). Il CONTENUTO del listing resta nella lingua target. */
  ebLocale: string;
  /** og:locale (formato Facebook ll_CC) */
  ogLocale: string;
  /** Gruppo per il language switcher */
  group: 'core' | 'west' | 'north' | 'east' | 'balkan' | 'world';
  /** Lingua esposta al pubblico (routing, hreflang, sitemap, switcher) */
  enabled: boolean;
}

export const DEFAULT_LOCALE: LocaleCode = 'en';

export const LOCALES: LocaleDef[] = [
  // ——— live ———
  { code: 'en', hreflang: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr', tier: 'native', ebLocale: 'en_GB', ogLocale: 'en_US', group: 'core', enabled: true },
  { code: 'it', hreflang: 'it', nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr', tier: 'native', ebLocale: 'it_IT', ogLocale: 'it_IT', group: 'core', enabled: true },
  // ——— Tier A ———
  { code: 'es', hreflang: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr', tier: 'A', ebLocale: 'es_ES', ogLocale: 'es_ES', group: 'west', enabled: false },
  { code: 'fr', hreflang: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr', tier: 'A', ebLocale: 'fr_FR', ogLocale: 'fr_FR', group: 'west', enabled: false },
  { code: 'de', hreflang: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr', tier: 'A', ebLocale: 'de_DE', ogLocale: 'de_DE', group: 'west', enabled: false },
  { code: 'pt', hreflang: 'pt', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr', tier: 'A', ebLocale: 'pt_PT', ogLocale: 'pt_PT', group: 'west', enabled: false },
  { code: 'nl', hreflang: 'nl', nativeName: 'Nederlands', englishName: 'Dutch', dir: 'ltr', tier: 'A', ebLocale: 'nl_NL', ogLocale: 'nl_NL', group: 'west', enabled: false },
  { code: 'ru', hreflang: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr', tier: 'A', ebLocale: 'en_GB', ogLocale: 'ru_RU', group: 'east', enabled: false },
  { code: 'tr', hreflang: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', dir: 'ltr', tier: 'A', ebLocale: 'en_GB', ogLocale: 'tr_TR', group: 'east', enabled: false },
  { code: 'zh', hreflang: 'zh-Hans', nativeName: '中文', englishName: 'Chinese (Simplified)', dir: 'ltr', tier: 'A', ebLocale: 'en_GB', ogLocale: 'zh_CN', group: 'world', enabled: false },
  { code: 'ar', hreflang: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl', tier: 'A', ebLocale: 'en_GB', ogLocale: 'ar_AR', group: 'world', enabled: false },
  // ——— Tier B: UE ———
  { code: 'bg', hreflang: 'bg', nativeName: 'Български', englishName: 'Bulgarian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'bg_BG', group: 'east', enabled: false },
  { code: 'hr', hreflang: 'hr', nativeName: 'Hrvatski', englishName: 'Croatian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'hr_HR', group: 'balkan', enabled: false },
  { code: 'cs', hreflang: 'cs', nativeName: 'Čeština', englishName: 'Czech', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'cs_CZ', group: 'east', enabled: false },
  { code: 'da', hreflang: 'da', nativeName: 'Dansk', englishName: 'Danish', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'da_DK', group: 'north', enabled: false },
  { code: 'et', hreflang: 'et', nativeName: 'Eesti', englishName: 'Estonian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'et_EE', group: 'north', enabled: false },
  { code: 'fi', hreflang: 'fi', nativeName: 'Suomi', englishName: 'Finnish', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'fi_FI', group: 'north', enabled: false },
  { code: 'el', hreflang: 'el', nativeName: 'Ελληνικά', englishName: 'Greek', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'el_GR', group: 'balkan', enabled: false },
  { code: 'hu', hreflang: 'hu', nativeName: 'Magyar', englishName: 'Hungarian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'hu_HU', group: 'east', enabled: false },
  { code: 'ga', hreflang: 'ga', nativeName: 'Gaeilge', englishName: 'Irish', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'ga_IE', group: 'west', enabled: false },
  { code: 'lv', hreflang: 'lv', nativeName: 'Latviešu', englishName: 'Latvian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'lv_LV', group: 'north', enabled: false },
  { code: 'lt', hreflang: 'lt', nativeName: 'Lietuvių', englishName: 'Lithuanian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'lt_LT', group: 'north', enabled: false },
  { code: 'mt', hreflang: 'mt', nativeName: 'Malti', englishName: 'Maltese', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'mt_MT', group: 'west', enabled: false },
  { code: 'pl', hreflang: 'pl', nativeName: 'Polski', englishName: 'Polish', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'pl_PL', group: 'east', enabled: false },
  { code: 'ro', hreflang: 'ro', nativeName: 'Română', englishName: 'Romanian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'ro_RO', group: 'east', enabled: false },
  { code: 'sk', hreflang: 'sk', nativeName: 'Slovenčina', englishName: 'Slovak', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'sk_SK', group: 'east', enabled: false },
  { code: 'sl', hreflang: 'sl', nativeName: 'Slovenščina', englishName: 'Slovenian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'sl_SI', group: 'balkan', enabled: false },
  { code: 'sv', hreflang: 'sv', nativeName: 'Svenska', englishName: 'Swedish', dir: 'ltr', tier: 'B', ebLocale: 'sv_SE', ogLocale: 'sv_SE', group: 'north', enabled: false },
  // ——— Tier B: Europa extra-UE / Est / Balcani ———
  { code: 'no', hreflang: 'no', nativeName: 'Norsk', englishName: 'Norwegian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'nb_NO', group: 'north', enabled: false },
  { code: 'is', hreflang: 'is', nativeName: 'Íslenska', englishName: 'Icelandic', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'is_IS', group: 'north', enabled: false },
  { code: 'uk', hreflang: 'uk', nativeName: 'Українська', englishName: 'Ukrainian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'uk_UA', group: 'east', enabled: false },
  { code: 'sq', hreflang: 'sq', nativeName: 'Shqip', englishName: 'Albanian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'sq_AL', group: 'balkan', enabled: false },
  { code: 'sr', hreflang: 'sr', nativeName: 'Srpski', englishName: 'Serbian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'sr_RS', group: 'balkan', enabled: false },
  { code: 'bs', hreflang: 'bs', nativeName: 'Bosanski', englishName: 'Bosnian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'bs_BA', group: 'balkan', enabled: false },
  { code: 'mk', hreflang: 'mk', nativeName: 'Македонски', englishName: 'Macedonian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'mk_MK', group: 'balkan', enabled: false },
];

export const ENABLED_LOCALES: LocaleDef[] = LOCALES.filter((l) => l.enabled);

export const enabledLocaleCodes: LocaleCode[] = ENABLED_LOCALES.map((l) => l.code);

const byCode = new Map(LOCALES.map((l) => [l.code as string, l]));

export function getLocaleDef(code: string): LocaleDef | undefined {
  return byCode.get(code);
}

export function isEnabledLocale(code: string): code is LocaleCode {
  return byCode.get(code)?.enabled === true;
}

/** Prefisso URL del locale: '' per en (root), '/xx' per gli altri */
export function localePrefix(code: string): string {
  return code === DEFAULT_LOCALE ? '' : `/${code}`;
}

/** Mappa hreflang → URL per alternates.languages (solo lingue enabled + x-default) */
export function hreflangAlternates(baseUrl: string, path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of ENABLED_LOCALES) {
    out[l.hreflang] = `${baseUrl}${localePrefix(l.code)}${path}` || `${baseUrl}/`;
  }
  out['x-default'] = `${baseUrl}${path}` || `${baseUrl}/`;
  return out;
}
