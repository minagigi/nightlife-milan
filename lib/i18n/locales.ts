// Registry unico delle lingue del sito (piano .claude/plans/2026-07-10-multilingual-strategy.md).
// OGNI consumer (middleware, sitemap, indexing, layout, switcher, publisher Eventbrite)
// legge da qui: aggiungere/attivare una lingua = toccare SOLO questo file.
//
// Due livelli di attivazione (decisione utente 10 lug: sito live in tutte le lingue):
// `enabled`  = navigabile (routing, switcher, dir/font) — TUTTE le 35 lingue.
// `indexed`  = contenuto tradotto pronto → hreflang + sitemap + indicizzabile.
//   Finché false la lingua è servita con fallback EN e noindex (guardrail
//   anti-duplicati del piano); si porta a true lingua per lingua in FASE L1/L2.

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
  /** Codice ISO paese per la bandierina del selettore (flag-icons) */
  country: string;
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
  /** Lingua raggiungibile sul sito live (routing, switcher, dir/font) */
  enabled: boolean;
  /** Contenuto tradotto pronto → hreflang + sitemap + Google Indexing + index.
   *  Finché false la lingua è navigabile ma noindex (evita di indicizzare i
   *  fallback inglesi come duplicati sotto 33 URL — guardrail del piano). */
  indexed: boolean;
}

export const DEFAULT_LOCALE: LocaleCode = 'en';

export const LOCALES: LocaleDef[] = [
  // ——— live ———
  { code: 'en', country: 'gb', hreflang: 'en', nativeName: 'English', englishName: 'English', dir: 'ltr', tier: 'native', ebLocale: 'en_GB', ogLocale: 'en_US', group: 'core', enabled: true, indexed: true },
  { code: 'it', country: 'it', hreflang: 'it', nativeName: 'Italiano', englishName: 'Italian', dir: 'ltr', tier: 'native', ebLocale: 'it_IT', ogLocale: 'it_IT', group: 'core', enabled: true, indexed: true },
  // ——— Tier A ———
  { code: 'es', country: 'es', hreflang: 'es', nativeName: 'Español', englishName: 'Spanish', dir: 'ltr', tier: 'A', ebLocale: 'es_ES', ogLocale: 'es_ES', group: 'west', enabled: true, indexed: true },
  { code: 'fr', country: 'fr', hreflang: 'fr', nativeName: 'Français', englishName: 'French', dir: 'ltr', tier: 'A', ebLocale: 'fr_FR', ogLocale: 'fr_FR', group: 'west', enabled: true, indexed: true },
  { code: 'de', country: 'de', hreflang: 'de', nativeName: 'Deutsch', englishName: 'German', dir: 'ltr', tier: 'A', ebLocale: 'de_DE', ogLocale: 'de_DE', group: 'west', enabled: true, indexed: true },
  { code: 'pt', country: 'pt', hreflang: 'pt', nativeName: 'Português', englishName: 'Portuguese', dir: 'ltr', tier: 'A', ebLocale: 'pt_PT', ogLocale: 'pt_PT', group: 'west', enabled: true, indexed: true },
  // Navigabili ma fuori indice finché il contenuto editoriale specifico dei
  // locali non è completo. Evita 29 copie con corpo inglese e title tradotto.
  { code: 'nl', country: 'nl', hreflang: 'nl', nativeName: 'Nederlands', englishName: 'Dutch', dir: 'ltr', tier: 'A', ebLocale: 'nl_NL', ogLocale: 'nl_NL', group: 'west', enabled: true, indexed: false },
  { code: 'ru', country: 'ru', hreflang: 'ru', nativeName: 'Русский', englishName: 'Russian', dir: 'ltr', tier: 'A', ebLocale: 'en_GB', ogLocale: 'ru_RU', group: 'east', enabled: true, indexed: false },
  { code: 'tr', country: 'tr', hreflang: 'tr', nativeName: 'Türkçe', englishName: 'Turkish', dir: 'ltr', tier: 'A', ebLocale: 'en_GB', ogLocale: 'tr_TR', group: 'east', enabled: true, indexed: false },
  { code: 'zh', country: 'cn', hreflang: 'zh-Hans', nativeName: '中文', englishName: 'Chinese (Simplified)', dir: 'ltr', tier: 'A', ebLocale: 'en_GB', ogLocale: 'zh_CN', group: 'world', enabled: true, indexed: false },
  { code: 'ar', country: 'sa', hreflang: 'ar', nativeName: 'العربية', englishName: 'Arabic', dir: 'rtl', tier: 'A', ebLocale: 'en_GB', ogLocale: 'ar_AR', group: 'world', enabled: true, indexed: false },
  // ——— Tier B: UE ———
  { code: 'bg', country: 'bg', hreflang: 'bg', nativeName: 'Български', englishName: 'Bulgarian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'bg_BG', group: 'east', enabled: true, indexed: false },
  { code: 'hr', country: 'hr', hreflang: 'hr', nativeName: 'Hrvatski', englishName: 'Croatian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'hr_HR', group: 'balkan', enabled: true, indexed: false },
  { code: 'cs', country: 'cz', hreflang: 'cs', nativeName: 'Čeština', englishName: 'Czech', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'cs_CZ', group: 'east', enabled: true, indexed: false },
  { code: 'da', country: 'dk', hreflang: 'da', nativeName: 'Dansk', englishName: 'Danish', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'da_DK', group: 'north', enabled: true, indexed: false },
  { code: 'et', country: 'ee', hreflang: 'et', nativeName: 'Eesti', englishName: 'Estonian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'et_EE', group: 'north', enabled: true, indexed: false },
  { code: 'fi', country: 'fi', hreflang: 'fi', nativeName: 'Suomi', englishName: 'Finnish', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'fi_FI', group: 'north', enabled: true, indexed: false },
  { code: 'el', country: 'gr', hreflang: 'el', nativeName: 'Ελληνικά', englishName: 'Greek', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'el_GR', group: 'balkan', enabled: true, indexed: false },
  { code: 'hu', country: 'hu', hreflang: 'hu', nativeName: 'Magyar', englishName: 'Hungarian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'hu_HU', group: 'east', enabled: true, indexed: false },
  { code: 'ga', country: 'ie', hreflang: 'ga', nativeName: 'Gaeilge', englishName: 'Irish', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'ga_IE', group: 'west', enabled: true, indexed: false },
  { code: 'lv', country: 'lv', hreflang: 'lv', nativeName: 'Latviešu', englishName: 'Latvian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'lv_LV', group: 'north', enabled: true, indexed: false },
  { code: 'lt', country: 'lt', hreflang: 'lt', nativeName: 'Lietuvių', englishName: 'Lithuanian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'lt_LT', group: 'north', enabled: true, indexed: false },
  { code: 'mt', country: 'mt', hreflang: 'mt', nativeName: 'Malti', englishName: 'Maltese', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'mt_MT', group: 'west', enabled: true, indexed: false },
  { code: 'pl', country: 'pl', hreflang: 'pl', nativeName: 'Polski', englishName: 'Polish', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'pl_PL', group: 'east', enabled: true, indexed: false },
  { code: 'ro', country: 'ro', hreflang: 'ro', nativeName: 'Română', englishName: 'Romanian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'ro_RO', group: 'east', enabled: true, indexed: false },
  { code: 'sk', country: 'sk', hreflang: 'sk', nativeName: 'Slovenčina', englishName: 'Slovak', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'sk_SK', group: 'east', enabled: true, indexed: false },
  { code: 'sl', country: 'si', hreflang: 'sl', nativeName: 'Slovenščina', englishName: 'Slovenian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'sl_SI', group: 'balkan', enabled: true, indexed: false },
  { code: 'sv', country: 'se', hreflang: 'sv', nativeName: 'Svenska', englishName: 'Swedish', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'sv_SE', group: 'north', enabled: true, indexed: false },
  // ——— Tier B: Europa extra-UE / Est / Balcani ———
  { code: 'no', country: 'no', hreflang: 'no', nativeName: 'Norsk', englishName: 'Norwegian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'nb_NO', group: 'north', enabled: true, indexed: false },
  { code: 'is', country: 'is', hreflang: 'is', nativeName: 'Íslenska', englishName: 'Icelandic', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'is_IS', group: 'north', enabled: true, indexed: false },
  { code: 'uk', country: 'ua', hreflang: 'uk', nativeName: 'Українська', englishName: 'Ukrainian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'uk_UA', group: 'east', enabled: true, indexed: false },
  { code: 'sq', country: 'al', hreflang: 'sq', nativeName: 'Shqip', englishName: 'Albanian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'sq_AL', group: 'balkan', enabled: true, indexed: false },
  { code: 'sr', country: 'rs', hreflang: 'sr', nativeName: 'Srpski', englishName: 'Serbian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'sr_RS', group: 'balkan', enabled: true, indexed: false },
  { code: 'bs', country: 'ba', hreflang: 'bs', nativeName: 'Bosanski', englishName: 'Bosnian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'bs_BA', group: 'balkan', enabled: true, indexed: false },
  { code: 'mk', country: 'mk', hreflang: 'mk', nativeName: 'Македонски', englishName: 'Macedonian', dir: 'ltr', tier: 'B', ebLocale: 'en_GB', ogLocale: 'mk_MK', group: 'balkan', enabled: true, indexed: false },
];

export const ENABLED_LOCALES: LocaleDef[] = LOCALES.filter((l) => l.enabled);

export const enabledLocaleCodes: LocaleCode[] = ENABLED_LOCALES.map((l) => l.code);

/** Lingue con contenuto pronto: le sole in hreflang, sitemap e Google Indexing */
export const INDEXED_LOCALES: LocaleDef[] = LOCALES.filter((l) => l.indexed);

export const indexedLocaleCodes: LocaleCode[] = INDEXED_LOCALES.map((l) => l.code);

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

/** Mappa hreflang → URL per alternates.languages (SOLO lingue indexed + x-default) */
export function hreflangAlternates(baseUrl: string, path: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of INDEXED_LOCALES) {
    out[l.hreflang] = `${baseUrl}${localePrefix(l.code)}${path}` || `${baseUrl}/`;
  }
  out['x-default'] = `${baseUrl}${path}` || `${baseUrl}/`;
  return out;
}
