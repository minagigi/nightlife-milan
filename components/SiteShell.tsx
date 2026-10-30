import MainContent from '@/components/MainContent';
import { Montserrat, Cormorant_Garamond, Bodoni_Moda, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import dynamic from 'next/dynamic';
import { getLocaleDef, DEFAULT_LOCALE, type LocaleCode } from '@/lib/i18n/locales';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { getFavoritesCopy } from '@/components/favoritesCopy';
import { Providers } from '@/components/Providers';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import IdleMount from '@/components/IdleMount';
import { jsonLdString } from '@/lib/seo';
import { SITE_CONTACT } from '@/config/contact';
import { getFooterCopy } from '@/lib/footerLocaleCopy';
import { editorialValue, type EditorialFields } from '@/lib/editorialPresentation';
import { getSkipToMainContent } from '@/lib/i18n/skipLink';
import { getBackToTopLabel } from '@/lib/i18n/backToTopCopy';
import { getScriptFont } from '@/lib/scriptFonts';
import '@/app/locale-flags.css';
import GlobalPriorityRecommendations from '@/components/GlobalPriorityRecommendations';
import { getDateSensitiveInventory } from '@/lib/dateSensitiveInventory';
import { selectPriorityVenueEvents } from '@/lib/priorityVenueEvents';
import { getEventSelectionCopy } from '@/lib/i18n/eventSelectionCopy';
import { getPriorityRecommendationsHeading } from '@/lib/i18n/priorityRecommendationsCopy';
import { getEventCalendarCopy } from '@/lib/eventCalendarCopy';
import { PRIORITY_VENUE_IDS } from '@/lib/priorityVenueEvents';
import { venuesData } from '@/lib/venuesData';
import { getLocalizedText } from '@/lib/seo';

import WhatsAppFloating from '@/components/WhatsAppFloating';
const CustomCursor = dynamic(() => import('@/components/CustomCursor'));

// `subsets` chooses preloads, not the glyphs included in the generated CSS.
// Preload only the common Latin files. Extended Latin/Cyrillic unicode ranges
// remain available and load when the actual native text requires their glyphs.
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});
export interface SiteShellProps {
  locale: LocaleCode;
  editorialFields: EditorialFields;
  copyrightYear?: number;
  publicPath?: string;
  children: React.ReactNode;
}

export default async function SiteShell({ locale, editorialFields, copyrightYear, publicPath, children }: SiteShellProps) {
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const localeDef = getLocaleDef(locale) || getLocaleDef(DEFAULT_LOCALE)!;
  const scriptFont = getScriptFont(locale);
  const initialNow = new Date();
  const recommendedEvents = selectPriorityVenueEvents(await getDateSensitiveInventory(locale), initialNow);
  const selectionCopy = getEventSelectionCopy(locale);
  const calendarCopy = getEventCalendarCopy(locale);
  const priorityClubSlugs = PRIORITY_VENUE_IDS.map(id => {
    const venue = venuesData.find(item => item.id === id);
    if (!venue) throw new Error(`Missing priority venue ${id}`);
    return getLocalizedText(venue.slugs, locale);
  });

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Nightlife Milan',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/organization-logo.svg`,
      width: 512,
      height: 512,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONTACT.whatsapp.number,
      contactType: 'customer service',
      availableLanguage: ['English', 'Italian', 'Spanish', 'French', 'German', 'Portuguese'],
    },
    areaServed: { '@type': 'City', name: 'Milan' },
    description: editorialValue(editorialFields, 'footer.desc', getFooterCopy(locale).desc),
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nightlife Milan',
    url: baseUrl,
  };

  return (
    <html lang={localeDef.hreflang} dir={localeDef.dir} className={`${montserrat.variable} ${cormorant.variable} ${bodoni.variable} ${jakarta.variable} ${jetbrains.variable} ${scriptFont?.variableClass ?? ''}`.trim()}>
      <head>
        {scriptFont ? <link rel="stylesheet" href={scriptFont.cssHref} /> : null}
        {/* GA loads on first interaction (see GoogleAnalytics.tsx) — dns-prefetch only, no premature preconnect */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(websiteSchema) }} />
      </head>
      <body className="grain font-sans antialiased bg-charcoal text-white min-h-screen flex flex-col pb-[calc(env(safe-area-inset-bottom)+6.5rem)]" suppressHydrationWarning>
        <Providers lang={locale}>
          <a className="skip-link" href="#main-content">{getSkipToMainContent(locale)}</a>
          <Header publicPath={publicPath} currentLocale={locale} editorialFields={editorialFields} favoritesTitle={getFavoritesCopy(locale).title} />
          <MainContent>{children}</MainContent>
          <GlobalPriorityRecommendations events={recommendedEvents} locale={locale} initialNow={initialNow.toISOString()}
            priorityClubSlugs={priorityClubSlugs}
            heading={getPriorityRecommendationsHeading(locale)} empty={calendarCopy.empty}
            viewEvent={selectionCopy.shared.viewEvent} scrollLeft={calendarCopy.scrollLeft} scrollRight={calendarCopy.scrollRight} />
          <BackToTop label={getBackToTopLabel(locale)} />
          <Footer lang={locale} editorialFields={editorialFields} copyrightYear={copyrightYear} />
          <WhatsAppFloating locale={locale} />
          <IdleMount>
            <CustomCursor />
          </IdleMount>
        </Providers>
        <GoogleAnalytics />
        <AnalyticsTracker />
      </body>
    </html>
  );
}

