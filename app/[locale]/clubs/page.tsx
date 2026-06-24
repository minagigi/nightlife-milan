import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import VenueCard from '@/components/VenueCard';
import VenueMapToggle from '@/components/VenueMapToggle';
import { Suspense } from 'react';
import { getVenues } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const canonicalUrl = `${baseUrl}${isIt ? '/it' : ''}/clubs`;

  const title = isIt
    ? 'Migliori Club Milano 2026 | La Selezione Definitiva'
    : 'Best Clubs in Milan 2026 | The Definitive Clubbing Selection';
  const description = isIt
    ? 'Scopri i club più esclusivi di Milano 2026. Just Me, Pineta, Voya Rooftop, Play Club, Magazzini Generali e altri. Tavoli VIP, lista, dress code.'
    : 'Discover the most exclusive clubs in Milan 2026. Just Me, Pineta, Voya Rooftop, Play Club, Magazzini Generali and more. VIP tables, guestlist, dress code guide.';
  const keywords = isIt
    ? ['migliori club milano', 'discoteche milano 2026', 'club vip milano', 'guida club milano', 'just me milano', 'pineta club milano', 'vita notturna milano', 'tavoli vip milano']
    : ['best clubs milan', 'milan nightclubs 2026', 'clubs milan vip', 'milan club guide', 'just me milan', 'pineta club milan', 'milan nightlife', 'vip tables milan'];

  return {
    title,
    description,
    keywords,
    robots: { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/clubs`,
        'it': `${baseUrl}/it/clubs`,
        'x-default': `${baseUrl}/clubs`,
      },
    },
    openGraph: {
      title: isIt
        ? 'Migliori Club Milano 2026 — La Selezione Definitiva'
        : 'Best Clubs in Milan 2026 — The Definitive Selection',
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{
        url: `${baseUrl}/images/clubs-hero.webp`,
        width: 1200,
        height: 630,
        alt: isIt
          ? 'Migliori club di Milano 2026 — selezione curata'
          : 'Best clubs in Milan 2026 — curated selection',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/clubs-hero.webp`],
      site: '@nightlifemilan',
    },
  };
}

// Helper to map difficulty string to number
const mapDifficulty = (diff?: string) => {
  switch (diff) {
    case 'Easy': return 2;
    case 'Medium': return 3;
    case 'Hard': return 4;
    case 'Exclusive': return 5;
    default: return 3;
  }
};

export default async function ClubsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';

  // Compute "Open Tonight" — map clubSlugs from weeklyEvents to venueIds
  const CLUB_SLUG_TO_VENUE_ID: Record<string, string> = {
    'justme': 'v-justme',
    'pineta': 'v-pineta',
    'voya': 'v-voya',
    'playclub': 'v-playclub',
    '55milano': 'v-55milano',
    'repvblic': 'v-repvblic',
    'magazzini': 'v-magazzini',
    'hollywood': 'v-hollywood',
    'apollo': 'v-apollo',
    'ceresio7': 'v-ceresio-7',
    'theclub': 'v-theclub',
    'church81': 'v-church81',
    'mibmilano': 'v-mibmilano',
    'gattopardo': 'v-gattopardo',
    'armani': 'v-armani-prive',
  };
  const todayDow = new Date().getDay(); // 0=Sunday…6=Saturday
  const openVenueIds = new Set(
    weeklyEvents
      .filter(e => e.dayOfWeek === todayDow)
      .map(e => CLUB_SLUG_TO_VENUE_ID[e.clubSlug])
      .filter(Boolean)
  );

  const getCustomUrl = (id: string, slug: string) => {
    return `/${locale === 'en' ? '' : locale + '/'}clubs/${slug}`;
  };

  // Map getVenues() to VenueCard props
  const sortedVenues = getVenues().map(v => {
    const slug = v.slugs[typedLocale] || v.slugs.en;
    return {
      id: v.id,
      slug: slug,
      name: v.localizedContent.name[typedLocale] || v.localizedContent.name.en,
      image: v.gallery?.[0] || v.image || '/images/milan-nightclub-luxury-vip-champagne.webp',
      zone: v.zone.replace(/_/g, ' '),
      mood: v.tags?.[0] || v.category,
      entryDifficulty: mapDifficulty(v.entryDifficulty),
      insiderTip: v.localizedContent.insiderTip?.[typedLocale] || v.localizedContent.insiderTip?.en || '',
      isEditorChoice: v.isPriority,
      isManaged: v.isManaged,
      isPriority: v.isPriority,
      isFeatured: v.isFeatured,
      isOpenTonight: openVenueIds.has(v.id),
      priceRange: v.priceRange,
      customUrl: getCustomUrl(v.id, slug),
    };
  });

  const topVenues = sortedVenues.slice(0, 3);
  const allVenues = sortedVenues;

  const mapPins = getVenues()
    .filter((v) => v.coordinates?.latitude && v.coordinates?.longitude)
    .map((v) => ({
      id: v.id,
      name: v.localizedContent.name[typedLocale] || v.localizedContent.name.en,
      address: v.address.streetAddress,
      slug: v.slugs[typedLocale] || v.slugs.en,
      latitude: v.coordinates!.latitude,
      longitude: v.coordinates!.longitude,
      lang: typedLocale,
    }));

  return (
    <main className="flex-grow pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/clubs-hero.webp"
            alt="Milan clubbing scene — elite nightclubs and dancefloors"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16 md:pb-24">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-8">
              Milan&apos;s Clubbing Elite
            </h1>
            <div className="text-white/70 leading-relaxed mb-10">
              <p>
                Milan&apos;s nightlife scene has undergone a radical evolution, transforming from the classic &quot;Milano da bere&quot; era into a sophisticated, globally recognized clubbing destination. Today, the city offers a multifaceted experience that caters to the most discerning electronic music aficionados and luxury seekers alike.
              </p>
            </div>
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2 rounded-full border border-white/30 text-white hover:border-champagne hover:text-champagne transition-colors text-sm font-medium tracking-wider uppercase backdrop-blur-sm">
                Techno
              </button>
              <button className="px-6 py-2 rounded-full border border-white/30 text-white hover:border-champagne hover:text-champagne transition-colors text-sm font-medium tracking-wider uppercase backdrop-blur-sm">
                Glamour
              </button>
              <button className="px-6 py-2 rounded-full border border-white/30 text-white hover:border-champagne hover:text-champagne transition-colors text-sm font-medium tracking-wider uppercase backdrop-blur-sm">
                Underground
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured "Vibe Check" (Top 3) */}
      <section className="bg-[#131009] py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-champagne mb-4">
                The Weekend Radar
              </h2>
              <p className="text-white/40 text-lg">
                Our Editor&apos;s top picks for an unforgettable night.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topVenues.map((venue) => (
              <VenueCard key={venue.id} {...venue} lang={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Smart Grid & Interactive Map Toggle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <VenueMapToggle venues={allVenues} lang={locale} mapPins={mapPins} />
      </section>

      {/* SEO Copy + AI Trafiletto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
        {/* AI Trafiletto */}
        <div className="max-w-2xl mb-12 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
          <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
          <p className="font-sans text-white/70 text-sm leading-relaxed">
            The best clubs in Milan in 2026 are <strong className="text-white">Just Me</strong> (Sempione — luxury fashion club, VIP tables from €500), <strong className="text-white">Pineta Club</strong> (Corso Como — singing aperitivo Fridays, entry from €20), <strong className="text-white">Voya Rooftop</strong> (Isola — 20th floor sky lounge), <strong className="text-white">Play Club</strong> (Corso Como — hip hop &amp; afrobeats), and <strong className="text-white">Magazzini Generali</strong> (Porta Romana — techno &amp; live music). Book VIP tables via WhatsApp +39 351 912 7047.
          </p>
        </div>

        <article className="max-w-4xl text-white/40">
          <h2 className="text-2xl font-serif text-white mb-4">Best Clubs in Milan 2026: The Ultimate Guide</h2>
          <p>
            When searching for the <strong>best clubs in Milan 2026</strong>, the landscape is constantly shifting. Milan is not just Italy&apos;s fashion capital; it&apos;s a global epicenter for electronic music, luxury nightlife, and avant-garde entertainment. The venues listed in our directory represent the absolute pinnacle of the Milanese clubbing experience.
          </p>

          <h3 className="font-serif text-xl text-white mt-8 mb-3">What Makes Milan Clubs Different</h3>
          <p>
            Milanese clubs operate on a distinct rhythm: aperitivo from 18:00–22:00, dinner until midnight, then club sets peaking at 1–3 AM. The door policy is real — dress to impress, arrive with a guestlist or VIP table reservation, and be prepared for a fashion-conscious crowd. Smart-elegant is the minimum; at premium venues like Just Me, fashion-forward is expected.
          </p>

          <h3 className="font-serif text-xl text-white mt-8 mb-3">How to Book a Club in Milan</h3>
          <p>
            Whether you are looking for an exclusive VIP table at a high-end venue or an underground techno experience in the industrial outskirts of Ripamonti, our curated selection ensures you experience the authentic Milan. For VIP tables and guestlist, WhatsApp our concierge at +39 351 912 7047 — reply guaranteed in under 10 minutes, free service.
          </p>

          <h3 className="font-serif text-xl text-white mt-8 mb-3">Entry Requirements & Dress Code</h3>
          <p>
            Entry to Milan&apos;s elite clubs often requires being on a guestlist or booking a table in advance. Dress codes are enforced strictly — no sneakers, no shorts, no sportswear. For premium venues like Just Me, fashion-forward attire is expected. Our concierge service includes a personalized dress code briefing for every venue.
          </p>
        </article>
      </section>

      {/* SEO Long-tail Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm font-medium tracking-wider uppercase">
          <span className="text-white/40">Popular Searches:</span>
          <Link href={`/${locale}/search?q=techno-clubs`} className="text-white/40 hover:text-champagne transition-colors">
            Techno Clubs in Milan
          </Link>
          <span className="hidden md:inline text-white/20">•</span>
          <Link href={`/${locale}/search?q=vip-tables`} className="text-white/40 hover:text-champagne transition-colors">
            Best VIP Tables
          </Link>
          <span className="hidden md:inline text-white/20">•</span>
          <Link href={`/${locale}/search?q=underground-parties`} className="text-white/40 hover:text-champagne transition-colors">
            Underground Parties
          </Link>
        </div>
      </section>
      
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": allVenues.map((venue, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "LocalBusiness",
                "name": venue.name,
                "image": venue.image,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Milan",
                  "addressRegion": "Lombardy",
                  "addressCountry": "IT"
                }
              }
            }))
          })
        }}
      />

      {/* VIP Tables CTA Banner */}
      {(() => {
        const lp = locale === 'it' ? '/it' : '';
        return (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-8">
            <div className="rounded-lg border border-champagne/20 bg-champagne/[0.04] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-sans text-champagne/60 text-[9px] tracking-[0.35em] uppercase mb-2">Skip the queue</p>
                <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
                  Get a VIP Table at Any of These Clubs
                </h2>
                <p className="font-sans text-white/40 text-sm">
                  WhatsApp concierge — tables from €200, reply in 10 minutes. Free service.
                </p>
              </div>
              <Link
                href={`${lp}/vip-tables`}
                className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black
                  font-sans font-bold text-sm tracking-[0.15em] uppercase
                  hover:bg-white transition-colors duration-300"
              >
                Book VIP Table
              </Link>
            </div>
          </section>
        );
      })()}
    </main>
  );
}
