import { Metadata } from 'next';
import { getLocaleDef, hreflangAlternates, isEnabledLocale, localePrefix, DEFAULT_LOCALE, type LocaleCode } from '@/lib/i18n/locales';
import { getClubsHubCopy } from '@/lib/i18n/clubsHubCopy';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import VenueMapToggle from '@/components/VenueMapToggle';
import { getVenues } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { PrioritySixShowcase, WeeklyNightlifeNavigator, VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import VerticalHubsAndEventsSection from '@/components/VerticalHubsAndEventsSection';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const code = (isEnabledLocale(locale) ? locale : DEFAULT_LOCALE) as LocaleCode;
  const localeDef = getLocaleDef(code) || getLocaleDef(DEFAULT_LOCALE)!;
  const hubCopy = getClubsHubCopy(code);
  const canonicalUrl = `${baseUrl}${localePrefix(code)}/clubs`;

  const rawTitle = hubCopy.heroTitle.length < 44
    ? `${hubCopy.heroTitle} 2026/2027 | Nightlife Milan`
    : hubCopy.heroTitle;
  const title = seoTitle(rawTitle);
  const description = withWhatsApp(hubCopy.heroLead, code);

  return {
    title,
    description,
    robots: seoRobots(code),
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates(baseUrl, '/clubs'),
    },
    openGraph: {
      title: seoTitle(hubCopy.heroTitle),
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Nightlife Milan',
      locale: localeDef.ogLocale,
      images: [
        {
          url: `${baseUrl}/images/pillars/clubs-hero.webp`,
          width: 1200,
          height: 630,
          alt: hubCopy.heroImgAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/pillars/clubs-hero.webp`],
      site: '@nightlifemilan',
    },
  };
}

const mapDifficulty = (diff?: string) => {
  switch (diff) {
    case 'Easy':
      return 2;
    case 'Medium':
      return 3;
    case 'Hard':
      return 4;
    case 'Exclusive':
      return 5;
    default:
      return 3;
  }
};

export default async function ClubsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeCode = (isEnabledLocale(locale) ? locale : DEFAULT_LOCALE) as LocaleCode;
  const typedLocale = (localeCode === 'it' ? 'it' : 'en') as 'en' | 'it';
  const lp = localePrefix(localeCode);
  const copy = getClubsHubCopy(localeCode);

  const CLUB_SLUG_TO_VENUE_ID: Record<string, string> = {
    justme: 'v-justme',
    pineta: 'v-pineta',
    voya: 'v-voya',
    playclub: 'v-playclub',
    '55milano': 'v-55milano',
    repvblic: 'v-repvblic',
    magazzini: 'v-magazzini',
    hollywood: 'v-hollywood',
    apollo: 'v-apollo',
    ceresio7: 'v-ceresio-7',
    theclub: 'v-theclub',
    church81: 'v-church81',
    mibmilano: 'v-mibmilano',
    gattopardo: 'v-gattopardo',
    armani: 'v-armani-prive',
  };
  const todayDow = new Date().getDay();
  const openVenueIds = new Set(
    weeklyEvents
      .filter((e) => e.dayOfWeek === todayDow)
      .map((e) => CLUB_SLUG_TO_VENUE_ID[e.clubSlug])
      .filter(Boolean),
  );

  const sortedVenues = getVenues().map((v) => {
    const slug = v.slugs[localeCode] || v.slugs[typedLocale] || v.slugs.en;
    return {
      id: v.id,
      slug,
      name: v.localizedContent.name[localeCode] || v.localizedContent.name[typedLocale] || v.localizedContent.name.en,
      image: v.gallery?.[0] || v.image || '/images/milan-nightclub-luxury-vip-champagne.webp',
      zone: v.zone.replace(/_/g, ' '),
      mood: v.tags?.[0] || v.category,
      entryDifficulty: mapDifficulty(v.entryDifficulty),
      insiderTip:
        v.localizedContent.insiderTip?.[localeCode] ||
        v.localizedContent.insiderTip?.[typedLocale] ||
        v.localizedContent.insiderTip?.en ||
        '',
      isEditorChoice: v.isPriority,
      isManaged: v.isManaged,
      isPriority: v.isPriority,
      isFeatured: v.isFeatured,
      isOpenTonight: openVenueIds.has(v.id),
      priceRange: v.priceRange,
      customUrl: `${lp}/clubs/${slug}`,
    };
  });

  const allVenues = sortedVenues;

  const mapPins = getVenues()
    .filter((v) => v.coordinates?.latitude && v.coordinates?.longitude)
    .map((v) => ({
      id: v.id,
      name: v.localizedContent.name[localeCode] || v.localizedContent.name[typedLocale] || v.localizedContent.name.en,
      address: v.address.streetAddress,
      href: `${lp}/clubs/${v.slugs[localeCode] || v.slugs[typedLocale] || v.slugs.en}`,
      latitude: v.coordinates!.latitude,
      longitude: v.coordinates!.longitude,
    }));

  return (
    <main className="flex-grow pb-20">
      <section className="relative min-h-[75vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/pillars/clubs-hero.webp"
            alt={copy.heroImgAlt}
            fill
            quality={92}
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-8">
              {copy.heroTitle}
            </h1>
            <div className="text-white/75 leading-relaxed mb-10">
              <p>{copy.heroLead}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`${lp}/clubs?q=techno`}
                className="px-6 py-2 rounded-full border border-white/30 text-white hover:border-champagne hover:text-champagne transition-colors text-sm font-medium tracking-wider uppercase backdrop-blur-sm"
              >
                {copy.filterTechno}
              </Link>
              <Link
                href={`${lp}/clubs?q=vip`}
                className="px-6 py-2 rounded-full border border-white/30 text-white hover:border-champagne hover:text-champagne transition-colors text-sm font-medium tracking-wider uppercase backdrop-blur-sm"
              >
                {copy.filterGlamour}
              </Link>
              <Link
                href={`${lp}/clubs?q=underground`}
                className="px-6 py-2 rounded-full border border-white/30 text-white hover:border-champagne hover:text-champagne transition-colors text-sm font-medium tracking-wider uppercase backdrop-blur-sm"
              >
                {copy.filterUnderground}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <VenueMapToggle venues={allVenues} lang={localeCode} mapPins={mapPins} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10 space-y-16">
        <PrioritySixShowcase locale={localeCode} />
        <WeeklyNightlifeNavigator locale={localeCode} />
        <VipQuoteCalculator locale={localeCode} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        <div className="max-w-2xl mb-12 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
          <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">{copy.quickLabel}</p>
          <p className="font-sans text-white/75 text-sm leading-relaxed">{copy.quickBody}</p>
        </div>

        <article className="max-w-4xl text-white/60">
          <h2 className="text-2xl font-serif text-white mb-4">{copy.guideH2}</h2>
          <p>{copy.guideP1}</p>

          <h3 className="font-serif text-xl text-white mt-8 mb-3">{copy.rhythmH3}</h3>
          <p>{copy.rhythmP}</p>

          <h3 className="font-serif text-xl text-white mt-8 mb-3">{copy.bookingH3}</h3>
          <p>{copy.bookingP}</p>

          <h3 className="font-serif text-xl text-white mt-8 mb-3">{copy.dressH3}</h3>
          <p>{copy.dressP}</p>
        </article>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm font-medium tracking-wider uppercase">
          <span className="text-white/50">{copy.popularLabel}</span>
          <Link href={`${lp}/clubs?q=techno`} className="text-white/60 hover:text-champagne transition-colors">
            {copy.popTechno}
          </Link>
          <span className="hidden md:inline text-white/20">·</span>
          <Link href={`${lp}/clubs?q=vip`} className="text-white/60 hover:text-champagne transition-colors">
            {copy.popVip}
          </Link>
          <span className="hidden md:inline text-white/20">·</span>
          <Link href={`${lp}/clubs?q=underground`} className="text-white/60 hover:text-champagne transition-colors">
            {copy.popUnderground}
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: allVenues.map((venue, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'NightClub',
                name: venue.name,
                url: `${baseUrl}${venue.customUrl}`,
                image: venue.image.startsWith('http') ? venue.image : `${baseUrl}${venue.image}`,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Milan',
                  addressRegion: 'Lombardy',
                  addressCountry: 'IT',
                },
              },
            })),
          }),
        }}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-8">
        <div className="rounded-lg border border-champagne/20 bg-champagne/[0.04] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.35em] uppercase mb-2">{copy.ctaOverline}</p>
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">{copy.ctaTitle}</h2>
            <p className="font-sans text-white/60 text-sm">{copy.ctaSub}</p>
          </div>
          <Link
            href={`${lp}/vip-tables`}
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black font-sans font-bold text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors duration-300"
          >
            {copy.ctaButton}
          </Link>
        </div>
      </section>

      <VerticalHubsAndEventsSection locale={localeCode} initialTab="occasions" eventFocus="all" />
      <EditorialPageSections locale={localeCode} path={`${lp}/clubs`} />
    </main>
  );
}
