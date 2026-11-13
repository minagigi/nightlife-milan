import { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { getLocaleDef, hreflangAlternates, canonicalPageUrl, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedGenreSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getHubSeoMeta35 } from '@/lib/i18n/hubSeoMeta35';
import { getGenreLocalized35, getTaxonomyHubUi35 } from '@/lib/i18n/zonesAndGenres35';
import GuideToc from '@/components/GuideToc';
import EditorialPageSections from '@/components/EditorialPageSections';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { genreData } from './[slug]/page';
import { Music, Sparkles, ArrowUpRight } from 'lucide-react';
import { VipQuoteCalculator, WeeklyNightlifeNavigator } from '@/components/NightlifeExpansionModules';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (locale as LocaleCode) || 'en';
  const canonical = canonicalPageUrl(baseUrl, loc, '/genres');
  const meta35 = getHubSeoMeta35('genres', loc);

  const title = seoTitle(meta35.title);
  const description = withWhatsApp(meta35.description, loc);
  const ogImage = `${baseUrl}/images/club-techno.webp`;

  return {
    title,
    description,
    robots: seoRobots(loc),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/genres'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(loc)?.ogLocale || 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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

const GENRE_IMAGES: Record<string, string> = {
  techno: '/images/club-techno.webp',
  house: '/images/milan-nightclub-luxury-vip-champagne.webp',
  'afro-house': '/images/venues/aria-club-milano/aria-club-milano-interior-01.webp',
  'hip-hop': '/images/milan-nightclub-dancefloor-vip.webp',
  reggaeton: '/images/milan-club-crowd-dancefloor-night.webp',
  commercial: '/images/venues/just-me-milano/just-me-milano-interior-01.webp',
  'dinner-show': '/images/aperitivo-milan-navigli-evening.webp',
  edm: '/images/venues/magazzini-generali/magazzini-generali-interior-01.webp',
  'live-music': '/images/venues/repvblic-milano/repvblic-milano-interior-01.webp',
  indie: '/images/venues/apollo-milano/apollo-milano-interior-01.webp',
};

export default async function GenresIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale as LocaleCode) || 'en';
  const lp = localePrefix(loc);
  const hubUi = getTaxonomyHubUi35('genres', loc);
  const genresHubUrl = `${baseUrl}${lp}/${getLocalizedDir35('genres', loc)}`;

  const entries = Object.entries(genreData);

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: hubUi.home, item: `${baseUrl}${lp || '/'}` },
        { '@type': 'ListItem', position: 2, name: hubUi.crumbLabel, item: genresHubUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: hubUi.h1,
      itemListElement: entries.map(([slug], i) => {
        const gLoc = getGenreLocalized35(slug, loc);
        return {
          '@type': 'ListItem',
          position: i + 1,
          name: gLoc.name,
          url: `${genresHubUrl}/${getLocalizedGenreSlug35(slug, loc)}`,
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
    <main className="flex-grow pt-24 pb-20 bg-[#050505]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
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

      <section id="genres-overview" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/10 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
            {hubUi.badge}
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
          {hubUi.h1}
        </h1>
        <p className="text-xl text-white/60 max-w-3xl mb-8">
          {hubUi.lead}
        </p>

        {/* AI Quick Answer */}
        <div className="max-w-3xl p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04] mb-8">
          <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-2">
            {hubUi.quickAnswerTitle}
          </p>
          <p className="text-sm text-white/75 leading-relaxed">
            {hubUi.quickAnswerBody}
          </p>
        </div>

        {/* Clickable TOC (>= 5 anchors) */}
        <div className="max-w-3xl">
          <GuideToc sections={hubUi.tocItems} title={hubUi.tocTitle} />
        </div>
      </section>

      {/* 10 Genres Grid */}
      <section id="all-genres-grid" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="font-serif text-3xl text-white mb-8">{hubUi.allItemsHeading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {entries.map(([slug]) => {
            const gLoc = getGenreLocalized35(slug, loc);
            return (
              <Link
                key={slug}
                href={`${lp}/genres/${getLocalizedGenreSlug35(slug, loc)}`}
                className="group relative h-[360px] rounded-2xl overflow-hidden border border-white/10 hover:border-champagne/50 transition-all duration-500 block"
              >
                <Image
                  src={GENRE_IMAGES[slug] || '/images/milan-nightclub-luxury-vip-champagne.webp'}
                  alt={gLoc.h1}
                  fill
                  quality={92}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne/15 border border-champagne/40 text-champagne text-xs font-mono uppercase tracking-wider">
                      <Music className="w-3.5 h-3.5" />
                      {gLoc.name}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-champagne transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-champagne transition-colors">
                    {gLoc.h1}
                  </h3>
                  <p className="text-sm text-white/70 line-clamp-2 mb-4">
                    {gLoc.lead}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {gLoc.topClubs.slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/15 text-[11px] text-white/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="weekly-sound-calendar" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <WeeklyNightlifeNavigator locale={loc} />
      </section>

      {/* Localized Pricing & Door Policy Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 space-y-6">
        {hubUi.sections.map((sec) => (
          <div key={sec.id} id={sec.id} className="scroll-mt-28 max-w-3xl">
            <h2 className="font-serif text-2xl text-champagne mb-2">{sec.heading}</h2>
            {sec.paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm text-white/70 leading-relaxed mb-2">{p}</p>
            ))}
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <VipQuoteCalculator locale={loc} />
      </section>

      <section id="genres-faq" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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

      <EditorialPageSections locale={loc} path={`${lp}/genres`} />
    </main>
  );
}
