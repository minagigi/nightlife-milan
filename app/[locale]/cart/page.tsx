import type { Metadata } from 'next';
import SinglePassCheckoutView from '@/components/single-pass/SinglePassCheckoutView';
import { DEFAULT_LOCALE, getLocaleDef, type LocaleCode } from '@/lib/i18n/locales';
import { getSinglePassCopy } from '@/lib/single-pass/i18n35';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (getLocaleDef(locale)?.code || DEFAULT_LOCALE) as LocaleCode;
  const copy = getSinglePassCopy(loc);
  return {
    title: `${copy.navCartLabel} | Nightlife Milan`,
    robots: { index: false, follow: true },
  };
}

export default async function SinglePassCartPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const loc = (getLocaleDef(locale)?.code || DEFAULT_LOCALE) as LocaleCode;
  const cancelled = typeof sp.cancelled === 'string' && sp.cancelled === '1';
  const orderParam = typeof sp.order === 'string' ? sp.order : undefined;

  return (
    <main className="min-h-screen bg-[#050505] text-[#F6F1E7]">
      <SinglePassCheckoutView
        locale={loc}
        cancelledOrderId={cancelled ? orderParam : undefined}
      />
    </main>
  );
}
