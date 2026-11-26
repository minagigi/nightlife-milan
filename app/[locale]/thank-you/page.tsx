import type { Metadata } from 'next';
import SinglePassThankYouView from '@/components/single-pass/SinglePassThankYouView';
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
    title: `${copy.thankYouHeading} | Nightlife Milan`,
    robots: { index: false, follow: false },
  };
}

export default async function SinglePassThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams]);
  const loc = (getLocaleDef(locale)?.code || DEFAULT_LOCALE) as LocaleCode;
  const orderId = typeof sp.order === 'string' ? sp.order : undefined;
  const paymentIntentId = typeof sp.payment_intent === 'string' ? sp.payment_intent : undefined;
  const sessionId = typeof sp.session_id === 'string' ? sp.session_id : undefined;

  return (
    <main className="min-h-screen bg-[#F6F1E7] text-[#050505]">
      <SinglePassThankYouView
        locale={loc}
        orderId={orderId}
        paymentIntentId={paymentIntentId}
        sessionId={sessionId}
      />
    </main>
  );
}
