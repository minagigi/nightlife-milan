import type { Metadata, Viewport } from 'next';
import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import '@/app/globals.css';

const WhatsAppFloating = dynamic(() => import('@/components/WhatsAppFloating'));
const BackToTop = dynamic(() => import('@/components/BackToTop'));
const MobileBottomBar = dynamic(() => import('@/components/MobileBottomBar'));
const CustomCursor = dynamic(() => import('@/components/CustomCursor'));

export const viewport: Viewport = {
  themeColor: '#131009',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const path = isIt ? '/it' : '';
  const canonical = `${baseUrl}${path}`;
  const ogImage = `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`;

  const title = isIt
    ? 'Nightlife Milan — Migliori Club, Tavoli VIP & Aperitivo Milano 2026'
    : 'Nightlife Milan — Best Clubs, VIP Tables & Aperitivo Guide Milan 2026';
  const description = isIt
    ? 'La guida definitiva alla vita notturna milanese. Prenota tavoli VIP, scopri i migliori club, aperitivo e bottle service a Milano. Concierge WhatsApp h24.'
    : 'The ultimate guide to Milan nightlife. Book VIP tables, discover the best clubs, aperitivo spots and bottle service. WhatsApp concierge 24/7. Trusted by 50,000+ visitors.';

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
      languages: {
        'en': `${baseUrl}/`,
        'it': `${baseUrl}/it`,
        'x-default': `${baseUrl}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: isIt ? 'Nightlife Milano — Club Esclusivi' : 'Nightlife Milan — Exclusive Clubs & VIP Tables' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@nightlifemilan',
      creator: '@nightlifemilan',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
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
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const isIt = locale === 'it';

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Nightlife Milan',
    url: baseUrl,
    logo: `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`,
    sameAs: ['https://instagram.com/nightlifemilan', 'https://tiktok.com/@nightlifemilan'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+39-351-912-7047',
      contactType: 'customer service',
      availableLanguage: ['English', 'Italian'],
      contactOption: 'TollFree',
    },
    areaServed: { '@type': 'City', name: 'Milan', sameAs: 'https://www.wikidata.org/wiki/Q490' },
    description: isIt
      ? 'La guida definitiva alla vita notturna milanese. Tavoli VIP, aperitivo, concierge WhatsApp.'
      : 'The ultimate guide to Milan nightlife. VIP tables, aperitivo, WhatsApp concierge.',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nightlife Milan',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/clubs?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang={locale} className={`${montserrat.variable} ${cormorant.variable}`}>
      <head>
        {/* GA loads on first interaction (see GoogleAnalytics.tsx) — dns-prefetch only, no premature preconnect */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className="font-sans antialiased bg-charcoal text-white min-h-screen flex flex-col pb-[calc(env(safe-area-inset-bottom)+4.25rem)] md:pb-0" suppressHydrationWarning>
        <Providers>
          <Header currentLocale={locale} />
          {children}
          <Footer lang={locale} />
          <WhatsAppFloating />
          <BackToTop />
          <MobileBottomBar currentLocale={locale} />
          <CustomCursor />
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
