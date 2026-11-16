import type { LocaleCode } from '@/lib/i18n/locales';

export const SUPPORTED_CURRENCIES = [
  'EUR',
  'USD',
  'GBP',
  'CHF',
  'PLN',
  'SEK',
  'NOK',
  'DKK',
  'CZK',
  'HUF',
  'RON',
  'BGN',
  'ISK',
  'TRY',
  'AED',
  'SAR',
  'CAD',
  'AUD',
  'JPY',
  'CNY',
  'BRL',
  'RSD',
] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

const SUPPORTED_SET = new Set<string>(SUPPORTED_CURRENCIES);

/** True zero-decimal currencies where 1 major unit === 1 minor integer unit. */
export const ZERO_DECIMAL_CURRENCIES = new Set<string>(['JPY']);

/**
 * Currencies that require whole integer major units * 100 ending in `00`:
 * - ISK: backwards-compatible 2-decimal API multiplier requiring multiples of 100
 * - HUF: standard charge minor units * 100 but card networks reject fractional fillér
 */
export const WHOLE_UNIT_X100_CURRENCIES = new Set<string>(['ISK', 'HUF']);

const BASELINE_EUR_RATES: Record<SupportedCurrency, number> = {
  EUR: 1,
  USD: 1.07,
  GBP: 0.835,
  CHF: 0.94,
  PLN: 4.32,
  SEK: 11.55,
  NOK: 11.75,
  DKK: 7.46,
  CZK: 25.35,
  HUF: 407,
  RON: 4.98,
  BGN: 1.9558,
  ISK: 149,
  TRY: 36.8,
  AED: 3.93,
  SAR: 4.01,
  CAD: 1.49,
  AUD: 1.63,
  JPY: 164,
  CNY: 7.72,
  BRL: 6.18,
  RSD: 117.1,
};

export const CURRENCY_META: Record<SupportedCurrency, { label: string; symbol: string }> = {
  EUR: { label: 'Euro (EUR)', symbol: '€' },
  USD: { label: 'US Dollar (USD)', symbol: '$' },
  GBP: { label: 'British Pound (GBP)', symbol: '£' },
  CHF: { label: 'Swiss Franc (CHF)', symbol: 'CHF' },
  PLN: { label: 'Polish Złoty (PLN)', symbol: 'zł' },
  SEK: { label: 'Swedish Krona (SEK)', symbol: 'kr' },
  NOK: { label: 'Norwegian Krone (NOK)', symbol: 'kr' },
  DKK: { label: 'Danish Krone (DKK)', symbol: 'kr' },
  CZK: { label: 'Czech Koruna (CZK)', symbol: 'Kč' },
  HUF: { label: 'Hungarian Forint (HUF)', symbol: 'Ft' },
  RON: { label: 'Romanian Leu (RON)', symbol: 'lei' },
  BGN: { label: 'Bulgarian Lev (BGN)', symbol: 'лв' },
  ISK: { label: 'Icelandic Króna (ISK)', symbol: 'kr' },
  TRY: { label: 'Turkish Lira (TRY)', symbol: '₺' },
  AED: { label: 'UAE Dirham (AED)', symbol: 'AED' },
  SAR: { label: 'Saudi Riyal (SAR)', symbol: 'SAR' },
  CAD: { label: 'Canadian Dollar (CAD)', symbol: 'CA$' },
  AUD: { label: 'Australian Dollar (AUD)', symbol: 'A$' },
  JPY: { label: 'Japanese Yen (JPY)', symbol: '¥' },
  CNY: { label: 'Chinese Yuan (CNY)', symbol: '¥' },
  BRL: { label: 'Brazilian Real (BRL)', symbol: 'R$' },
  RSD: { label: 'Serbian Dinar (RSD)', symbol: 'дин' },
};

export function normalizeSupportedCurrency(raw: unknown): SupportedCurrency {
  const code = String(raw || 'EUR').trim().toUpperCase();
  return SUPPORTED_SET.has(code) ? (code as SupportedCurrency) : 'EUR';
}

const COUNTRY_TO_CURRENCY: Record<string, SupportedCurrency> = {
  US: 'USD',
  GB: 'GBP',
  UK: 'GBP',
  CH: 'CHF',
  LI: 'CHF',
  PL: 'PLN',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
  CZ: 'CZK',
  HU: 'HUF',
  RO: 'RON',
  BG: 'BGN',
  IS: 'ISK',
  TR: 'TRY',
  AE: 'AED',
  SA: 'SAR',
  CA: 'CAD',
  AU: 'AUD',
  JP: 'JPY',
  CN: 'CNY',
  BR: 'BRL',
  RS: 'RSD',
};

const EUROZONE_LOCALES = new Set<string>([
  'it',
  'es',
  'fr',
  'de',
  'pt',
  'nl',
  'hr',
  'et',
  'fi',
  'el',
  'ga',
  'lv',
  'lt',
  'mt',
  'sk',
  'sl',
]);

const LOCALE_TO_CURRENCY: Partial<Record<LocaleCode, SupportedCurrency>> = {
  en: 'EUR',
  pl: 'PLN',
  sv: 'SEK',
  no: 'NOK',
  da: 'DKK',
  cs: 'CZK',
  hu: 'HUF',
  ro: 'RON',
  bg: 'BGN',
  is: 'ISK',
  tr: 'TRY',
  zh: 'CNY',
  ar: 'AED',
  sr: 'RSD',
};

export function defaultCurrencyForLocaleAndCountry(
  locale: string,
  ipCountry?: string | null,
): SupportedCurrency {
  const country = (ipCountry || '').trim().toUpperCase();
  if (country && COUNTRY_TO_CURRENCY[country]) {
    return COUNTRY_TO_CURRENCY[country];
  }
  const loc = (locale || 'en').trim().toLowerCase() as LocaleCode;
  if (EUROZONE_LOCALES.has(loc)) return 'EUR';
  if (LOCALE_TO_CURRENCY[loc]) return LOCALE_TO_CURRENCY[loc]!;
  return 'EUR';
}

type FxCacheEntry = {
  rates: Record<SupportedCurrency, number>;
  updatedAt: string;
  source: 'ecb' | 'open-er-api' | 'baseline';
  fetchedMs: number;
};

let fxMemoryCache: FxCacheEntry | null = null;
const FX_CACHE_TTL_MS = 60 * 60 * 1000;

export function clearFxCacheForTests(): void {
  fxMemoryCache = null;
}

export async function fetchEurExchangeRates(): Promise<FxCacheEntry> {
  const now = Date.now();
  if (fxMemoryCache && now - fxMemoryCache.fetchedMs < FX_CACHE_TTL_MS) {
    return fxMemoryCache;
  }

  const nextRates: Record<SupportedCurrency, number> = { ...BASELINE_EUR_RATES };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    clearTimeout(timer);
    if (res.ok) {
      const xml = await res.text();
      for (const m of xml.matchAll(/currency=['"]([A-Z]{3})['"]\s+rate=['"]([0-9.]+)['"]/g)) {
        const cur = m[1] as SupportedCurrency;
        const val = Number(m[2]);
        if (SUPPORTED_SET.has(cur) && Number.isFinite(val) && val > 0) {
          nextRates[cur] = val;
        }
      }
      nextRates.EUR = 1;
      fxMemoryCache = {
        rates: nextRates,
        updatedAt: new Date().toISOString(),
        source: 'ecb',
        fetchedMs: now,
      };
      return fxMemoryCache;
    }
  } catch {
    // Fallback below
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3500);
    const res = await fetch('https://open.er-api.com/v6/latest/EUR', {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    clearTimeout(timer);
    if (res.ok) {
      const data = (await res.json()) as { rates?: Record<string, number> };
      if (data?.rates) {
        for (const cur of SUPPORTED_CURRENCIES) {
          const val = Number(data.rates[cur]);
          if (Number.isFinite(val) && val > 0) {
            nextRates[cur] = val;
          }
        }
      }
      nextRates.EUR = 1;
      fxMemoryCache = {
        rates: nextRates,
        updatedAt: new Date().toISOString(),
        source: 'open-er-api',
        fetchedMs: now,
      };
      return fxMemoryCache;
    }
  } catch {
    // Fall back to baseline rates
  }

  fxMemoryCache = {
    rates: nextRates,
    updatedAt: new Date().toISOString(),
    source: 'baseline',
    fetchedMs: now,
  };
  return fxMemoryCache;
}

export function convertEurCentsSingle(
  eurCents: number,
  currency: SupportedCurrency,
  rate: number,
): number {
  const safeEur = Math.max(0, Math.round(eurCents)) / 100;
  if (currency === 'EUR') {
    return Math.max(0, Math.round(eurCents));
  }
  const safeRate = Number.isFinite(rate) && rate > 0 ? rate : BASELINE_EUR_RATES[currency] || 1;
  if (ZERO_DECIMAL_CURRENCIES.has(currency)) {
    return Math.round(safeEur * safeRate);
  }
  if (WHOLE_UNIT_X100_CURRENCIES.has(currency)) {
    return Math.round(safeEur * safeRate) * 100;
  }
  return Math.round(safeEur * safeRate * 100);
}

export type ConvertedQuote = {
  currency: SupportedCurrency;
  rate: number;
  subtotalMinor: number;
  feeMinor: number;
  totalMinor: number;
};

export function convertEurBreakdown(
  eurBaseCents: number,
  eurFeeCents: number,
  currency: SupportedCurrency,
  rate: number,
): ConvertedQuote {
  const cur = normalizeSupportedCurrency(currency);
  const effectiveRate = cur === 'EUR' ? 1 : (Number.isFinite(rate) && rate > 0 ? rate : BASELINE_EUR_RATES[cur] || 1);
  if (cur === 'EUR') {
    const sub = Math.max(0, Math.round(eurBaseCents));
    const fee = Math.max(0, Math.round(eurFeeCents));
    return {
      currency: 'EUR',
      rate: 1,
      subtotalMinor: sub,
      feeMinor: fee,
      totalMinor: sub + fee,
    };
  }
  const subtotalMinor = convertEurCentsSingle(eurBaseCents, cur, effectiveRate);
  const feeMinor = convertEurCentsSingle(eurFeeCents, cur, effectiveRate);
  return {
    currency: cur,
    rate: effectiveRate,
    subtotalMinor,
    feeMinor,
    totalMinor: subtotalMinor + feeMinor,
  };
}

export function minorUnitsToDisplayNumber(minorAmount: number, currency: string): number {
  const upper = currency.trim().toUpperCase();
  if (ZERO_DECIMAL_CURRENCIES.has(upper)) {
    return Math.round(minorAmount);
  }
  return minorAmount / 100;
}

export function formatMinorCurrency(
  minorAmount: number,
  currency = 'EUR',
  locale = 'en',
): string {
  const upper = normalizeSupportedCurrency(currency);
  const display = minorUnitsToDisplayNumber(minorAmount, upper);
  const isZeroDisplay =
    ZERO_DECIMAL_CURRENCIES.has(upper) || WHOLE_UNIT_X100_CURRENCIES.has(upper);
  const intlLocMap: Record<string, string> = {
    it: 'it-IT',
    en: 'en-US',
    fr: 'fr-FR',
    de: 'de-DE',
    es: 'es-ES',
  };
  const intlLocale = intlLocMap[locale] || locale || 'en-US';
  try {
    return new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency: upper,
      minimumFractionDigits: isZeroDisplay ? 0 : 2,
      maximumFractionDigits: isZeroDisplay ? 0 : 2,
    }).format(display);
  } catch {
    const sym = CURRENCY_META[upper]?.symbol || upper;
    return `${sym} ${isZeroDisplay ? Math.round(display) : display.toFixed(2)}`;
  }
}
