import { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import Hero from '@/components/seo-landing/Hero';
import { localePrefix } from '@/lib/i18n/locales';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import {
  VipQuoteCalculator,
  WeeklyNightlifeNavigator,
  EntryFormulaMatrix,
  PrioritySixShowcase,
  SanSiroMatchAfterpartyFinder,
} from '@/components/NightlifeExpansionModules';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Just Me Milano & Top 6 VIP Clubs | Prezzi, Eventi e Prenotazioni 2026/2027',
  description:
    'Guida ufficiale e prenotazione diretta Tavoli VIP, Royal Aperitivo e Dopo-Partita San Siro nei 6 Club Prioritari di Milano: Just Me, Pineta, Aria, 55 Milano, Voya Rooftop e Repvblic. WhatsApp +39 351 912 7047.',
  robots: { index: false, follow: true },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EntertainmentBusiness',
    name: 'Just Me Milano & Nightlife Milan VIP Concierge',
    image: 'https://nightlifemilan.com/images/pillars/seo-landing-01.webp',
    '@id': 'https://nightlifemilan.com/clubs/just-me-milano',
    url: 'https://nightlifemilan.com/clubs/just-me-milano',
    telephone: '+393519127047',
    email: 'concierge@nightlifemilan.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Viale Luigi Camoens, 2',
      addressLocality: 'Milano',
      postalCode: '20121',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.4746,
      longitude: 9.1729,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '19:30',
        closes: '05:00',
      },
    ],
    priceRange: '$$$',
  };

  return (
    <main id="main-content" className="flex-1 flex flex-col w-full bg-[#050505]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero
        title={isIt ? 'Just Me Milano & Top 6 Club VIP' : 'Just Me Milano & Top 6 VIP Clubs'}
        subtitle={
          isIt
            ? 'Prenotazione ufficiale Tavoli VIP, Royal Aperitivo, Feste di Laurea e Dopo-Partita San Siro (+39 351 912 7047).'
            : 'Official VIP Table, Royal Aperitivo, Graduation Party & San Siro Match Afterparty Desk (+39 351 912 7047).'
        }
        ctaText={isIt ? 'Prenota ora su WhatsApp +39 351 912 7047' : 'Book via WhatsApp +39 351 912 7047'}
        ctaLink={getConciergeBookingUrl(locale, 'Just Me Milano & Top 6 VIP Clubs', `${lp}/seo-landing`)}
        imageUrl="/images/pillars/seo-landing-01.webp"
      />

      <section id="eventi" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-14">
        <PrioritySixShowcase locale={locale} />
        <WeeklyNightlifeNavigator locale={locale} />
        <EntryFormulaMatrix locale={locale} />
        <SanSiroMatchAfterpartyFinder locale={locale} />
        <VipQuoteCalculator locale={locale} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <Link href={`${lp}/vip-tables`} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-champagne/40 text-sm font-bold text-white">
            {isIt ? 'Tavoli VIP & Privé →' : 'VIP Tables & Privé →'}
          </Link>
          <Link href={`${lp}/bottle-prices`} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-champagne/40 text-sm font-bold text-white">
            {isIt ? 'Listino Bottiglie 2026/27 →' : 'Bottle Price List 2026/27 →'}
          </Link>
          <Link href={`${lp}/football-afterparties`} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-champagne/40 text-sm font-bold text-white">
            {isIt ? 'Dopo-Partita San Siro →' : 'San Siro Afterparties →'}
          </Link>
          <Link href={`${lp}/private-parties`} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-champagne/40 text-sm font-bold text-white">
            {isIt ? 'Lauree, 18° & Compleanni →' : 'Graduations & Birthdays →'}
          </Link>
        </div>
      </section>
    </main>
  );
}
