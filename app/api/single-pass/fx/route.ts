import { NextResponse } from 'next/server';
import {
  CURRENCY_META,
  SUPPORTED_CURRENCIES,
  defaultCurrencyForLocaleAndCountry,
  fetchEurExchangeRates,
} from '@/lib/single-pass/currency';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = (url.searchParams.get('locale') || 'en').trim().toLowerCase();
  const ipCountry =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    null;

  const fx = await fetchEurExchangeRates();
  const defaultCurrency = defaultCurrencyForLocaleAndCountry(locale, ipCountry);

  return NextResponse.json(
    {
      ok: true,
      base: 'EUR',
      defaultCurrency,
      country: ipCountry || undefined,
      updatedAt: fx.updatedAt,
      source: fx.source,
      currencies: SUPPORTED_CURRENCIES.map((code) => ({
        code,
        label: CURRENCY_META[code].label,
        symbol: CURRENCY_META[code].symbol,
        rate: fx.rates[code],
      })),
      rates: fx.rates,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    },
  );
}
