import { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import Hero from '@/components/seo-landing/Hero';
import { localePrefix } from '@/lib/i18n/locales';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { resolveCardImageByHref } from '@/lib/siteCardAssets4x5';
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          {[
            { href: `${lp}/vip-tables`, label: isIt ? 'Tavoli VIP & Privé →' : 'VIP Tables & Privé →' },
            { href: `${lp}/bottle-prices`, label: isIt ? 'Listino Bottiglie 2026/27 →' : 'Bottle Price List 2026/27 →' },
            { href: `${lp}/football-afterparties`, label: isIt ? 'Dopo-Partita San Siro →' : 'San Siro Afterparties →' },
            { href: `${lp}/private-parties`, label: isIt ? 'Lauree, 18° & Compleanni →' : 'Graduations & Birthdays →' },
          ].map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              className="group overflow-hidden rounded-xl bg-white/[0.03] border border-white/10 hover:border-champagne/45 flex flex-col justify-between transition-colors"
            >
              <div data-no-lightbox="true" className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505] border-b border-white/10">
                <Image
                  src={resolveCardImageByHref(item.href, idx)}
                  alt={item.label}
                  width={1080}
                  height={1350}
                  sizes="(max-width: 768px) 100vw, 300px"
                  quality={92}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 text-sm font-bold text-white group-hover:text-champagne transition-colors">
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
