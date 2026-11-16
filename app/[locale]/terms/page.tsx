import type { Metadata } from 'next';
import LegalDocumentPage from '@/components/LegalDocumentPage';
import { getMagisterMidaLegalDocument } from '@/lib/legal/magisterMidaLegal35';
import { canonicalPageUrl, getLocaleDef, hreflangAlternates } from '@/lib/i18n/locales';

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = canonicalPageUrl(baseUrl, locale, '/terms');
  const doc = getMagisterMidaLegalDocument(locale, 'terms');
  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
    robots: getLocaleDef(locale)?.indexed === false ? { index: false, follow: true } : { index: true, follow: true },
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/terms'),
    },
    openGraph: {
      title: doc.metaTitle,
      description: doc.metaDescription,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalDocumentPage locale={locale} kind="terms" />;
}
