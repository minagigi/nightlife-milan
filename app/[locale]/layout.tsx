import '@/app/globals.css';
import 'flag-icons/css/flag-icons.min.css';
import type { Metadata, Viewport } from 'next';
import { tr } from '@/lib/i18n/t';
import { notFound } from 'next/navigation';
import {
  getLocaleDef,
  hreflangAlternates,
  localePrefix,
  DEFAULT_LOCALE,
  enabledLocaleCodes,
  isEnabledLocale,
} from '@/lib/i18n/locales';
import { seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { readEditorialFields } from '@/lib/editorialContent';

import SiteShell from '@/components/SiteShell';

export const viewport: Viewport = {
  themeColor: '#131009',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Pre-genera il segmento lingua per tutte le 35 lingue. In questo modo le
// visite e i crawler non trasformano gli hub pubblici in una Function per
// ogni richiesta; le route restano ferme fino a deploy o invalidazione.
export function generateStaticParams() {
  return enabledLocaleCodes.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const path = localePrefix(locale);
  const canonical = `${baseUrl}${path}` || baseUrl;
  const ogImage = `${baseUrl}/images/table-concierge/justme-night.webp`;
  const localeDef = getLocaleDef(locale) || getLocaleDef(DEFAULT_LOCALE)!;

  const title = seoTitle(tr(locale, 'Nightlife Milan — Best Clubs, VIP Tables & Aperitivo Guide Milan 2026', 'Nightlife Milan — Migliori Club, Tavoli VIP & Aperitivo Milano 2026'));
  const description = withWhatsApp(tr(locale, 'The guide to Milan nightlife: clubs, VIP tables, aperitivo and current events. Ask for availability on WhatsApp.', 'La guida alla vita notturna di Milano: club, tavoli VIP, aperitivo ed eventi attuali. Chiedi disponibilità su WhatsApp.'), locale);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: '%s',
    },
    description,
    keywords: isIt
      ? ['vita notturna milano', 'club milano', 'tavoli vip milano', 'aperitivo milano', 'bottle service milano', 'locali milano', 'discoteca milano', 'dove uscire a milano']
      : ['nightlife milan', 'best clubs milan', 'vip table milan', 'bottle service milan', 'aperitivo milan', 'milan nightclub guide', 'milan nightlife 2026', 'exclusive clubs milan'],
    alternates: {
      canonical,
      // hreflang generati dal registry: si estendono da soli quando una lingua
      // viene attivata in lib/i18n/locales.ts.
      languages: hreflangAlternates(baseUrl, ''),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: localeDef.ogLocale,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 900, alt: tr(locale, 'Nightlife Milan — Exclusive Clubs & VIP Tables', 'Nightlife Milano — Club Esclusivi') }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    // Tutte le 35 lingue abilitate sono indicizzabili per decisione editoriale.
    robots: localeDef.indexed
      ? {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        }
      : { index: false, follow: true },
    other: {
      'og:locale:alternate': isIt ? 'en_US' : 'it_IT',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Whitelist locale a livello route (fix bug #9): un /xx/ fuori dal registry non
  // deve renderizzare in inglese sotto un lang errato, ma dare 404.
  if (!isEnabledLocale(locale)) notFound();
  const sharedEditorialFields = await readEditorialFields('shared', locale);
  return <SiteShell locale={locale} editorialFields={sharedEditorialFields}>{children}</SiteShell>;
}
