import type { Metadata } from 'next';
import SinglePassCartPageView from '@/components/single-pass/SinglePassCartPageView';
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
    robots: { index: false, follow: false },
  };
}

export default async function SinglePassCartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (getLocaleDef(locale)?.code || DEFAULT_LOCALE) as LocaleCode;

  return (
    <main className="min-h-screen bg-[#050505] text-[#F6F1E7]">
      <SinglePassCartPageView locale={loc} />
    </main>
  );
}
