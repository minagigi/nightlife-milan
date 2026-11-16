import type { Metadata } from 'next';
import SinglePassAccountView from '@/components/single-pass/SinglePassAccountView';
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
    title: `${copy.navAccountLabel} | Nightlife Milan`,
    robots: { index: false, follow: false },
  };
}

export default async function SinglePassAccountPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const loc = (getLocaleDef(locale)?.code || DEFAULT_LOCALE) as LocaleCode;
  const checkoutState = typeof sp.checkout === 'string' ? sp.checkout : undefined;
  const orderId = typeof sp.order === 'string' ? sp.order : undefined;
  const sessionId = typeof sp.session_id === 'string' ? sp.session_id : undefined;

  return (
    <main className="min-h-screen bg-[#050505] text-[#F6F1E7]">
      <SinglePassAccountView
        locale={loc}
        initialCheckoutState={checkoutState}
        initialOrderId={orderId}
        initialSessionId={sessionId}
      />
    </main>
  );
}
