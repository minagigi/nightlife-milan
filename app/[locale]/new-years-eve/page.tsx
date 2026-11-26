import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { getLocaleDef, type LocaleCode } from '@/lib/i18n/locales';
import { seoRobots } from '@/lib/seoMetadata';
import { capodannoCategoryHreflangAlternates, capodannoCategoryPath } from '@/lib/capodanno/routes';
import { getCapodannoMasterSeo35 } from '@/lib/capodanno/capodannoMasterSeo35';

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const master = getCapodannoMasterSeo35(locale as LocaleCode);
  const canonical = `${baseUrl}${capodannoCategoryPath('capodanno-2027', locale)}`;

  return {
    title: master.metaTitle,
    description: master.metaDescription,
    robots: seoRobots(locale, true, true),
    alternates: {
      canonical,
      languages: capodannoCategoryHreflangAlternates(baseUrl, 'capodanno-2027'),
    },
    openGraph: {
      title: master.metaTitle,
      description: master.metaDescription,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
    },
  };
}

export default async function LegacyNewYearsEveRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(capodannoCategoryPath('capodanno-2027', locale));
}
