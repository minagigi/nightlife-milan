import { Metadata } from 'next';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import { getLocaleDef, hreflangAlternates, canonicalPageUrl, localePrefix } from '@/lib/i18n/locales';
import { getLocalizedZoneSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getHubSeoMeta35 } from '@/lib/i18n/hubSeoMeta35';
import { getZoneLocalized35, getTaxonomyHubUi35 } from '@/lib/i18n/zonesAndGenres35';
import GuideToc from '@/components/GuideToc';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { mockZones } from '@/lib/data';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import {
  NeighborhoodCommutePlanner,
  VipQuoteCalculator,
  WeeklyNightlifeNavigator,
} from '@/components/NightlifeExpansionModules';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locale as LocaleCode) || 'en';
  const isIt = loc === 'it';
  const canonical = canonicalPageUrl(baseUrl, loc, '/zones');
  const meta35 = getHubSeoMeta35('zones', loc);

  const title = seoTitle(meta35.title);
  const description = withWhatsApp(meta35.description, loc);
  const ogImage = `${baseUrl}/images/pillars/zone-01.webp`;

  return {
    title,
    description,
    keywords: isIt
      ? ['zone vita notturna milano', 'quartieri notturni milano', 'corso como nightlife', 'bar navigli milano', 'brera nightlife', 'migliori zone milano notte']
      : ['milan nightlife zones', 'milan nightlife districts', 'corso como milan nightlife', 'navigli bars milan', 'brera nightlife milan', 'best areas nightlife milan'],
    robots: seoRobots(loc),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/zones'),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(loc)?.ogLocale || 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: '@nightlifemilan',
    },
  };
}

const zoneImages: Record<string, string> = {
  corso_como: '/images/pillars/zone-01.webp',
  navigli: '/images/pillars/zone-02.webp',
  brera: '/images/pillars/zone-03.webp',
  isola: '/images/pillars/zone-04.webp',
  sempione: '/images/pillars/zone-05.webp',
  porta_romana: '/images/pillars/zone-06.webp',
  citylife: '/images/pillars/zone-07.webp',
  centro: '/images/pillars/zone-08.webp',
  'parco-sempione': '/images/pillars/zone-09.webp',
  'citylife-portello': '/images/pillars/zone-10.webp',
  'duomo-san-babila': '/images/pillars/zone-11.webp',
  'san-siro': '/images/pillars/zone-12.webp',
};

export default async function ZonesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale as LocaleCode) || 'en';
  const lp = localePrefix(loc);
  const hubUi = getTaxonomyHubUi35('zones', loc);
  const zonesHubUrl = `${baseUrl}${lp}/${getLocalizedDir35('zones', loc)}`;

  const zonesSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: hubUi.home, item: `${baseUrl}${lp || '/'}` },
        { '@type': 'ListItem', position: 2, name: hubUi.crumbLabel, item: zonesHubUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: hubUi.h1,
      description: hubUi.lead,
      itemListElement: mockZones.map((zone, i) => {
        const zLoc = getZoneLocalized35(zone.slug, loc);
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Place',
            name: zLoc.name,
            description: zLoc.lead,
            url: `${zonesHubUrl}/${getLocalizedZoneSlug35(zone.slug, loc)}`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Milan',
              addressRegion: 'Lombardy',
              addressCountry: 'IT',
            },
          },
        };
      }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: hubUi.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(zonesSchema) }} />
    <main className="flex-grow pt-24 pb-20 bg-[#050505]">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="text-sm text-white/40" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href={lp || '/'} className="hover:text-champagne transition-colors">{hubUi.home}</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">
              {hubUi.crumbLabel}
            </li>
          </ol>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne mb-4">
          {hubUi.badge}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
          {hubUi.h1}
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mb-8">
          {hubUi.lead}
        </p>

        {/* AI Trafiletto */}
        <div className="max-w-3xl p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] mb-8">
          <p className="font-sans text-champagne/80 text-[10px] tracking-[0.3em] uppercase mb-3">{hubUi.quickAnswerTitle}</p>
          <p className="font-sans text-white/75 text-sm leading-relaxed">
            {hubUi.quickAnswerBody}
          </p>
        </div>

        {/* Clickable TOC (>= 5 anchors) */}
        <div className="max-w-3xl">
          <GuideToc sections={hubUi.tocItems} title={hubUi.tocTitle} />
        </div>
      </section>

      {/* How to Choose Your Zone — H2 section */}
      <section id="choose-zone" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-t border-white/5 pt-12">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">
          {hubUi.featuredHeading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              label: getZoneLocalized35('corso-como', loc).vibe,
              zone: 'Corso Como · Sempione · San Siro',
              desc: 'Just Me Milano (7/7), Pineta Milano, Aria Club (150m San Siro), Repvblic Milano & Tocqueville 13.',
            },
            {
              label: getZoneLocalized35('navigli', loc).vibe,
              zone: 'Navigli · Brera · Arco della Pace',
              desc: '55 Milano (Via Piero della Francesca 55), Volt Club, Il Gattopardo & canal cocktail terraces.',
            },
            {
              label: getZoneLocalized35('citylife-portello', loc).vibe,
              zone: 'CityLife Portello · Isola · Duomo',
              desc: 'Voya Rooftop Milan (20th Floor panoramic skyline), Terrazza Duomo 21 & Alcatraz live arena.',
            },
          ].map((item) => (
            <div key={item.zone} className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
              <h3 className="font-sans text-champagne text-[10px] tracking-[0.3em] uppercase mb-2">{item.label}</h3>
              <p className="font-serif text-lg text-white mb-2">{item.zone}</p>
              <p className="font-sans text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zones Grid */}
      <section id="all-districts" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="font-serif text-3xl text-white mb-8">
          {hubUi.allItemsHeading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockZones.map((zone) => {
            const zLoc = getZoneLocalized35(zone.slug, loc);
            const imgSrc = zone.image || zoneImages[zone.id] || zoneImages[zone.slug] || '/images/pillars/zone-01.webp';
            return (
              <Link
                key={zone.id}
                href={`${lp}/zones/${getLocalizedZoneSlug35(zone.slug, loc)}`}
                className="group relative h-[400px] rounded-lg overflow-hidden border border-white/10 hover:border-champagne/50 transition-colors duration-500 block"
              >
                <Image
                  src={imgSrc}
                  alt={`${zLoc.name} - ${zLoc.vibe}`}
                  fill
                  quality={92}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-white group-hover:text-champagne transition-colors">
                      {zLoc.name}
                    </h3>
                    <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-champagne border border-white/10">
                      {zLoc.metro.split('·')[0].trim()}
                    </span>
                  </div>

                  <p className="text-lg font-medium text-white/80 mb-2 tracking-wide">
                    {zLoc.vibe}
                  </p>

                  <p className="text-white/55 line-clamp-2 group-hover:text-white/80 transition-colors text-sm">
                    {zLoc.lead}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Localized Pricing & Concierge Chapters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-t border-white/5 pt-12">
        <div className="max-w-3xl space-y-8">
          <h2 className="font-serif text-3xl text-white">
            {hubUi.editorialHeading}
          </h2>
          {hubUi.sections.map((sec) => (
            <div key={sec.id} id={sec.id} className="scroll-mt-28">
              <h3 className="font-serif text-xl text-champagne mb-2">{sec.heading}</h3>
              {sec.paragraphs.map((p, idx) => (
                <p key={idx} className="font-sans text-white/65 text-sm leading-relaxed mb-2">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Neighborhood Commute Planner (Metro M1-M5, Night Buses & Taxi to Top 6 Priority Clubs) */}
      <section id="metro-commute" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <NeighborhoodCommutePlanner locale={loc} />
      </section>

      {/* Interactive Weekly Nightlife Navigator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <WeeklyNightlifeNavigator locale={loc} />
      </section>

      {/* Interactive VIP Quote Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <VipQuoteCalculator locale={loc} />
      </section>

      {/* Localized FAQs */}
      <section id="zones-faq" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="font-serif text-3xl text-champagne mb-6">{hubUi.faqTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hubUi.faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-lg text-white mb-2">{faq.question}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VIP Tables CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-lg border border-champagne/20 bg-champagne/[0.04] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
              {hubUi.ctaTitle}
            </h2>
            <p className="font-sans text-white/55 text-sm">
              {hubUi.ctaDesc}
            </p>
          </div>
          <Link
            href={`${lp}/vip-tables`}
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black
              font-sans font-bold text-sm tracking-[0.15em] uppercase
              hover:bg-white transition-colors duration-300"
          >
            {hubUi.ctaBtn}
          </Link>
        </div>
      </section>
            <EditorialPageSections locale={loc} path={`${lp}/zones`} />
      </main>
    </>
  );
}
