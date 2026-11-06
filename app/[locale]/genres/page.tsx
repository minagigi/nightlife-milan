import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedGenreSlug35 } from '@/lib/i18n/localizedSlugs35';
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
  const canonical = `${baseUrl}${localePrefix(locale)}/genres`;

  const title = seoTitle(
    tr(
      locale,
      'Milan Nightlife by Music Genre 2026/2027 | Techno, House, Afro House, Hip Hop, Reggaeton & Dinner Show',
      'Musica e Generi Discoteche Milano 2026/2027 | Techno, House, Afro House, Hip Hop, Reggaeton e Dinner Show'
    )
  );
  const description = withWhatsApp(
    tr(
      locale,
      'Explore all 10 music genres & club formats in Milan: House, Afro House, Techno, Hip Hop & Trap, Reggaeton, Commercial Sing-Along, Dinner Show, EDM, Live Music & Indie.',
      'Esplora tutti i 10 generi musicali e format delle serate milanesi: House, Afro House, Techno, Hip Hop & Trap, Reggaeton, Commerciale Cantata, Dinner Show, EDM, Live Music e Indie.'
    ),
    locale
  );

  return {
    title,
    description,
    robots: seoRobots(locale),
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
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [
        {
          url: `${baseUrl}/images/milan-nightclub-dancefloor-vip.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  const isIt = typedLocale === 'it';
  const lp = localePrefix(locale);

  const entries = Object.entries(genreData);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isIt
      ? 'Generi Musicali e Format Discoteche Milano 2026/2027'
      : 'Milan Nightlife Music Genres & Club Formats 2026/2027',
    itemListElement: entries.map(([slug, g], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.name,
      url: `${baseUrl}${lp}/genres/${slug}`,
    })),
  };

  return (
    <main className="flex-grow pt-24 pb-20 bg-[#131009]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/10 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-champagne" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
            {isIt ? '10 Generi Musicali & Format Ufficiali' : '10 Official Music Genres & Formats'}
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
          {isIt ? 'Scegli il Tuo Sound a Milano' : 'Find Your Sound in Milan'}
        </h1>
        <p className="text-xl text-white/60 max-w-3xl mb-8">
          {isIt
            ? 'Dalla Vocal & Afro House nei club d’élite sotto la Torre Branca e a San Siro, al Reggaeton in Corso Como, fino alla Techno industriale e alle Cene Spettacolo: esplora i 10 generi musicali della notte milanese.'
            : 'From Vocal & Afro House in luxury gardens under Torre Branca and San Siro, to Reggaeton in Corso Como, industrial Techno warehouses, and Dinner Shows: explore all 10 sonic worlds of Milan nightlife.'}
        </p>

        {/* AI Quick Answer */}
        <div className="max-w-3xl p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04]">
          <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-2">
            {isIt ? 'Risposta Rapida · Mappa Sonora di Milano' : 'Quick Answer · Milan Sonic Map'}
          </p>
          <p className="text-sm text-white/75 leading-relaxed">
            {isIt
              ? 'House & Afro House: Just Me, Aria Club, Voya Rooftop, 55 Milano, Armani Privé. Reggaeton & Hip Hop: Pineta Milano, Play Club, 11 Clubroom, Tocqueville 13, Hollywood. Techno & Underground: Volt Club, Magazzini Generali, Amnesia, Fabrique. Dinner Show & Aperitivo Cantato: 55 Milano, Just Me, Pineta, Voya Rooftop, Gattopardo, Church 81. Prenotazioni: WhatsApp +39 351 912 7047.'
              : 'House & Afro House: Just Me, Aria Club, Voya Rooftop, 55 Milano, Armani Privé. Reggaeton & Hip Hop: Pineta Milano, Play Club, 11 Clubroom, Tocqueville 13, Hollywood. Techno & Underground: Volt Club, Magazzini Generali, Amnesia, Fabrique. Dinner Show & Singing Aperitivo: 55 Milano, Just Me, Pineta, Voya Rooftop, Gattopardo, Church 81. Bookings: WhatsApp +39 351 912 7047.'}
          </p>
        </div>
      </section>

      {/* 10 Genres Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {entries.map(([slug, g]) => (
            <Link
              key={slug}
              href={`${lp}/genres/${getLocalizedGenreSlug35(slug, (locale as LocaleCode) || 'en')}`}
              className="group relative h-[360px] rounded-2xl overflow-hidden border border-white/10 hover:border-champagne/50 transition-all duration-500 block"
            >
              <Image
                src={GENRE_IMAGES[slug] || '/images/milan-nightclub-luxury-vip-champagne.webp'}
                alt={g.heroTitle[typedLocale]}
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
                    {g.name}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-champagne transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-champagne transition-colors">
                  {g.heroTitle[typedLocale]}
                </h2>
                <p className="text-sm text-white/70 line-clamp-2 mb-4">
                  {g.editorial[typedLocale]}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {g.topClubs.slice(0, 4).map((c) => (
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
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <WeeklyNightlifeNavigator locale={locale} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VipQuoteCalculator locale={locale} />
      </section>
    </main>
  );
}
