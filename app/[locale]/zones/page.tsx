import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { mockZones } from '@/lib/data';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const canonical = `${baseUrl}${isIt ? '/it' : ''}/zones`;

  const title = isIt
    ? 'Zone Vita Notturna Milano 2026 | Migliori Quartieri | Nightlife Milan'
    : 'Milan Nightlife Zones 2026 | Best Nightlife Districts & Areas | Nightlife Milan';
  const description = isIt
    ? 'Esplora i migliori quartieri della vita notturna milanese: Corso Como, Navigli, Brera, Isola, Sempione, Porta Romana. Scopri club, bar ed eventi per zona. Aggiornato 2026.'
    : 'Explore Milan\'s top nightlife districts: Corso Como, Navigli, Brera, Isola, Sempione, Porta Romana. Find the best clubs, bars and events by zone. Updated 2026.';
  const ogImage = `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`;

  return {
    title,
    description,
    keywords: isIt
      ? ['zone vita notturna milano', 'quartieri notturni milano', 'corso como nightlife', 'bar navigli milano', 'brera nightlife', 'migliori zone milano notte']
      : ['milan nightlife zones', 'milan nightlife districts', 'corso como milan nightlife', 'navigli bars milan', 'brera nightlife milan', 'best areas nightlife milan'],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/zones`,
        'it': `${baseUrl}/it/zones`,
        'x-default': `${baseUrl}/zones`,
      },
    },
    openGraph: {
      title: isIt ? 'Zone Vita Notturna Milano 2026 — Nightlife Milan' : 'Milan Nightlife Zones 2026 — Best Districts for a Night Out',
      description,
      type: 'website',
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: isIt ? 'Vita notturna Milano quartieri club' : 'Milan nightlife districts clubs and bars' }],
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
  corso_como: '/images/milan-nightlife-corso-como-district-clubs.webp',
  navigli: '/images/milan-navigli-nightlife-canal-bars.webp',
  brera: '/images/milan-brera-nightlife-luxury-bars.webp',
  isola: '/images/milan-isola-nightlife-rooftop-bars.webp',
  sempione: '/images/milan-sempione-nightlife-just-me-club.webp',
  porta_romana: '/images/milan-porta-romana-nightlife-magazzini.webp',
  citylife: '/images/milan-citylife-nightlife-clubs.webp',
  centro: '/images/milan-centro-nightlife-duomo-bars.webp',
};

export default async function ZonesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  const lp = locale === 'it' ? '/it' : '';

  const zonesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Milan Nightlife Districts 2026",
    "description": "Guide to the best nightlife zones in Milan, Italy",
    "itemListElement": mockZones.map((zone, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Place",
        "name": zone.name,
        "description": zone.description.en,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Milan",
          "addressRegion": "Lombardy",
          "addressCountry": "IT"
        }
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(zonesSchema) }} />
    <main className="flex-grow pt-24 pb-20 bg-[#131009]">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="text-sm text-white/40" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href={`/${locale}`} className="hover:text-champagne transition-colors">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">
              {typedLocale === 'it' ? 'Zone' : 'Zones'}
            </li>
          </ol>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
          {typedLocale === 'it' ? 'I Quartieri della Notte' : "Milan's Nightlife Districts"}
        </h1>
        <p className="text-xl text-white/40 max-w-2xl mb-8">
          {typedLocale === 'it'
            ? "Ogni quartiere di Milano pulsa con un ritmo diverso. Scopri l'atmosfera unica di ogni zona e trova la serata perfetta per te."
            : "Every neighborhood in Milan pulses with a different rhythm. Discover the unique vibe of each zone and find your perfect night out."}
        </p>

        {/* AI Trafiletto */}
        <div className="max-w-2xl p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
          <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
          <p className="font-sans text-white/70 text-sm leading-relaxed">
            {typedLocale === 'it'
              ? 'I migliori quartieri per la vita notturna a Milano sono: Corso Como (club esclusivi, moda), Navigli (canal-side bars, atmosfera bohémien), Brera (lounge di lusso), Isola (rooftop e cocktail bar), Sempione (mega-club come Just Me). I club aprono dalle 22:00 con picco tra mezzanotte e le 3:00.'
              : 'The best zones for nightlife in Milan are: Corso Como (exclusive clubs, fashion crowd), Navigli (canal-side bars, bohemian vibe), Brera (luxury lounges), Isola (rooftops and cocktail bars), Sempione (mega-clubs like Just Me). Clubs open from 22:00 with peak between midnight and 3 AM.'}
          </p>
        </div>
      </section>

      {/* How to Choose Your Zone — H2 section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-t border-white/5 pt-12">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">
          {typedLocale === 'it' ? 'Scegli la Zona Giusta per Te' : 'How to Choose the Right Zone'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              label: typedLocale === 'it' ? 'Per i Club di Lusso' : 'For Luxury Clubs',
              zone: typedLocale === 'it' ? 'Corso Como & Sempione' : 'Corso Como & Sempione',
              desc: typedLocale === 'it'
                ? 'I mega-club con VIP table, bottle service e le migliori line-up. Just Me, Pineta, Play Club.'
                : 'Mega-clubs with VIP tables, bottle service and top DJ line-ups. Just Me, Pineta, Play Club.',
            },
            {
              label: typedLocale === 'it' ? 'Per L\'Aperitivo' : 'For Aperitivo & Cocktails',
              zone: typedLocale === 'it' ? 'Navigli & Brera' : 'Navigli & Brera',
              desc: typedLocale === 'it'
                ? 'Canal-side terrazze, lounge ricercati e cocktail bar iconici. Atmosfera rilassata dal tramonto.'
                : 'Canal-side terraces, refined lounges and iconic cocktail bars. Relaxed vibe from sunset.',
            },
            {
              label: typedLocale === 'it' ? 'Per Le Viste Panoramiche' : 'For Rooftop Views',
              zone: 'Isola',
              desc: typedLocale === 'it'
                ? 'Voya Rooftop al 20° piano con vista sullo skyline di Milano. Sky lounge fino all\'alba.'
                : 'Voya Rooftop on the 20th floor with views over the Milan skyline. Sky lounge until dawn.',
            },
          ].map((item) => (
            <div key={item.label} className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
              <h3 className="font-sans text-champagne text-[10px] tracking-[0.3em] uppercase mb-2">{item.label}</h3>
              <p className="font-serif text-lg text-white mb-2">{item.zone}</p>
              <p className="font-sans text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zones Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="font-serif text-3xl text-white mb-8">
          {typedLocale === 'it' ? 'Tutti i Quartieri' : 'All Milan Nightlife Districts'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockZones.map((zone) => {
            const imgSrc = zone.image || zoneImages[zone.id] || zoneImages[zone.slug] || '';
            return (
              <Link
                key={zone.id}
                href={`/${locale}/zones/${zone.slug}`}
                className="group relative h-[400px] rounded-lg overflow-hidden border border-white/10 hover:border-champagne/50 transition-colors duration-500 block"
              >
                {/* Background Image or Gradient */}
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={`Nightlife in ${zone.name}, Milan — ${zone.vibe}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-champagne/10 via-gray-900 to-black" />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-4xl font-bold text-white group-hover:text-champagne transition-colors">
                      {zone.name}
                    </h3>
                    <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-champagne border border-white/10">
                      {zone.stats}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {zone.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-full border border-champagne/30 text-champagne/80 text-xs font-medium tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-lg font-medium text-white/70 mb-2 tracking-wide">
                    {zone.vibe}
                  </p>

                  <p className="text-white/40 line-clamp-2 group-hover:text-white/70 transition-colors text-sm">
                    {zone.description[typedLocale]}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Zone by Vibe — H3 section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 border-t border-white/5 pt-12">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl text-white mb-6">
            {typedLocale === 'it' ? 'Milan Nightlife per Zona: Guida Rapida' : "Milan Nightlife by Zone: Quick Guide"}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-sans text-champagne text-sm font-semibold tracking-widest uppercase mb-2">Corso Como</h3>
              <p className="font-sans text-white/50 text-sm leading-relaxed">
                {typedLocale === 'it'
                  ? 'La zona più glamour di Milano. Casa di Pineta Club (aperitivo cantato, venerdì), Play Club (hip hop, afrobeats), Volt (techno underground). Dress code rigoroso — total black o chic fashion.'
                  : 'The most glamorous zone in Milan. Home to Pineta Club (singing aperitivo, Fridays), Play Club (hip hop, afrobeats), Volt (underground techno). Strict dress code — total black or chic fashion.'}
              </p>
            </div>
            <div>
              <h3 className="font-sans text-champagne text-sm font-semibold tracking-widest uppercase mb-2">Sempione</h3>
              <p className="font-sans text-white/50 text-sm leading-relaxed">
                {typedLocale === 'it'
                  ? 'Quartiere esclusivo vicino al Castello Sforzesco. Just Me Milano è qui — il club più in voga della città con design Roberto Cavalli, VIP table da €500 e DJ set internazionali.'
                  : 'Exclusive district near the Castello Sforzesco. Just Me Milano is here — the city\'s most fashionable club with Roberto Cavalli design, VIP tables from €500 and international DJ sets.'}
              </p>
            </div>
            <div>
              <h3 className="font-sans text-champagne text-sm font-semibold tracking-widest uppercase mb-2">Navigli</h3>
              <p className="font-sans text-white/50 text-sm leading-relaxed">
                {typedLocale === 'it'
                  ? 'I canali di Milano di notte. Magazzini Generali (techno e live music), Hollywood Club (storico), decine di bar lungo i canali per l\'aperitivo. Atmosfera bohémien, crowd misto.'
                  : 'Milan\'s canals at night. Magazzini Generali (techno and live music), Hollywood Club (historic), dozens of canal-side bars for aperitivo. Bohemian atmosphere, mixed crowd.'}
              </p>
            </div>
            <div>
              <h3 className="font-sans text-champagne text-sm font-semibold tracking-widest uppercase mb-2">Isola</h3>
              <p className="font-sans text-white/50 text-sm leading-relaxed">
                {typedLocale === 'it'
                  ? 'Il quartiere più trendy di Milano con Voya Rooftop (sky lounge al 20° piano, vista skyline), cocktail bar nascosti e locali d\'autore. Aperitivo da sogno con vista sui grattacieli.'
                  : 'Milan\'s trendiest neighborhood with Voya Rooftop (sky lounge on the 20th floor, skyline view), hidden cocktail bars and design venues. Dream aperitivo with views of the skyscrapers.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Tables CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-lg border border-champagne/20 bg-champagne/[0.04] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-2">
              {typedLocale === 'it' ? 'Trovata la zona? Prenota il tavolo.' : 'Found your zone? Book the table.'}
            </h2>
            <p className="font-sans text-white/40 text-sm">
              {typedLocale === 'it'
                ? 'VIP table da €200. Concierge WhatsApp — risposta in 10 minuti. Servizio gratuito.'
                : 'VIP tables from €200. WhatsApp concierge — reply in 10 minutes. Free service.'}
            </p>
          </div>
          <Link
            href={`${lp}/vip-tables`}
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black
              font-sans font-bold text-sm tracking-[0.15em] uppercase
              hover:bg-white transition-colors duration-300"
          >
            {typedLocale === 'it' ? 'Prenota VIP Table' : 'Book VIP Table'}
          </Link>
        </div>
      </section>
    </main>
    </>
  );
}
