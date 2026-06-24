import { Metadata } from 'next';
import Hero from '@/components/Hero';
import IntentCards from '@/components/IntentCards';
import EventTimeline from '@/components/EventTimeline';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import EventFilters from '@/components/EventFilters';
import { mockEvents, mockVenues } from '@/lib/data';
import { Venue } from '@/lib/types';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600; // ISR: revalidate every hour

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = isIt ? `${baseUrl}/it` : baseUrl;
  const ogImage = `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`;

  const title = isIt
    ? 'Vita Notturna Milano 2026 | Club, VIP Table & Aperitivo | Nightlife Milan'
    : 'Milan Nightlife 2026 | Best Clubs, VIP Tables & Aperitivo | Nightlife Milan';
  const description = isIt
    ? 'La guida definitiva alla vita notturna di Milano. I migliori club, tavoli VIP, aperitivo e serate luglio 2026. Prenota via WhatsApp in 10 minuti.'
    : 'The definitive guide to Milan nightlife. Best clubs, VIP tables, aperitivo and July 2026 events. Book via WhatsApp in under 10 minutes.';

  return {
    title,
    description,
    keywords: isIt
      ? ['vita notturna milano', 'migliori club milano', 'tavoli vip milano', 'aperitivo milano', 'nightlife milano 2026', 'guida vita notturna milano']
      : ['milan nightlife', 'best clubs milan', 'vip tables milan', 'aperitivo milan', 'milan nightclub 2026', 'nightlife milan guide'],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en': baseUrl,
        'it': `${baseUrl}/it`,
        'x-default': baseUrl,
      },
    },
    openGraph: {
      title: isIt ? 'Vita Notturna Milano 2026 — La Guida Definitiva' : 'Milan Nightlife 2026 — The Definitive Guide',
      description: isIt
        ? 'Club esclusivi, VIP table, aperitivo e serate private. La guida che usano i local.'
        : 'Exclusive clubs, VIP tables, aperitivo and private events. The guide locals actually use.',
      type: 'website',
      url: canonical,
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: isIt ? 'Vita notturna Milano 2026' : 'Milan nightlife 2026' }],
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';

  // JSON-LD Schema for LocalBusiness / Guide
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nightlife Milan",
    "image": "https://nightlifemilan.com/images/milan-nightclub-luxury-vip-champagne.webp",
    "description": lang === 'it' 
      ? "La guida definitiva alla vita notturna milanese. Esplora club esclusivi ed eventi." 
      : "The ultimate guide to Milan's nightlife. Explore exclusive clubs and events.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Milan",
      "addressCountry": "IT"
    },
    "url": lang === 'it' ? "https://nightlifemilan.com/it" : "https://nightlifemilan.com"
  };

  // Only show upcoming events (today or future) — filtering by genre/zone/price is handled client-side in DiscoveryGrid
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  let allEvents = mockEvents
    .filter(event => new Date(event.dateISO) >= todayMidnight)
    .map(event => {
      const venue = mockVenues.find(v => v.id === event.venueId);
      return { event, venue: venue as Venue };
    })
    .filter(item => item.venue !== undefined);

  // Helper to get absolute priority
  const getAbsolutePriority = (name: string) => {
    const upperName = name.toUpperCase();
    if (upperName.includes('JUSTME')) return 1;
    if (upperName.includes('PINETA')) return 2;
    if (upperName.includes('VOYA')) return 3;
    return 99; // Default for others
  };

  allEvents.sort((a, b) => new Date(a.event.dateISO).getTime() - new Date(b.event.dateISO).getTime());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="flex-1 flex flex-col w-full">
        {/* Passiamo la prop lang a tutti i componenti */}
        <Hero locale={lang} />
        <IntentCards locale={lang} />

        <Suspense fallback={<div className="h-20" />}>
          <EventFilters lang={lang} />
        </Suspense>

        <EventTimeline items={allEvents} lang={lang} />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-champagne/20 to-transparent" aria-hidden="true" />

        <Suspense fallback={<div className="h-64 flex items-center justify-center"><span className="text-champagne">Loading...</span></div>}>
          <DiscoveryGrid items={allEvents} lang={lang} />
        </Suspense>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-champagne/15 to-transparent" aria-hidden="true" />

        {/* AI Trafiletto — for AI search engines */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-b from-charcoal to-black">
          <div className="max-w-3xl mx-auto">
            <div className="p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] mb-12">
              <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
              <p className="font-sans text-white/70 text-sm leading-relaxed">
                {lang === 'it'
                  ? 'La vita notturna di Milano 2026: i migliori club sono Just Me (Sempione, VIP table da €500), Pineta (Corso Como, aperitivo cantato venerdì), Voya Rooftop (Isola, 20° piano). Club aperti dalle 22:00–23:30 fino alle 5:00. Prenota via WhatsApp +39 351 912 7047 — risposta in 10 minuti.'
                  : 'Milan nightlife 2026: top clubs are Just Me (Sempione, VIP tables from €500), Pineta (Corso Como, singing aperitivo Fridays), Voya Rooftop (Isola, 20th floor). Clubs open from 22:00–23:30 until 5:00 AM. Book via WhatsApp +39 351 912 7047 — reply in under 10 minutes.'}
              </p>
            </div>

            {/* H2: The Beating Heart of Milan */}
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[var(--ivory)] tracking-tight mb-6">
              {lang === 'it' ? 'Il Cuore Pulsante di Milano' : 'The Beating Heart of Milan'}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed font-light mb-10">
              {lang === 'it'
                ? 'Milano non è solo la capitale della moda, ma anche il centro nevralgico del divertimento italiano. Dai lussuosi club di Corso Como ai bar underground dei Navigli, la nostra guida ti porta alla scoperta dei luoghi più esclusivi.'
                : 'Milan is not just the fashion capital, but also the nerve center of Italian entertainment. From the luxurious clubs of Corso Como to the underground bars of the Navigli, our guide takes you to discover the most exclusive places.'}
            </p>
          </div>
        </section>

        {/* Photo Grid — asymmetric masonry layout */}
        <section className="py-4 px-4 sm:px-6 lg:px-8 w-full bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2" style={{ gridTemplateRows: 'auto auto' }}>
              {/* Large featured image — spans 2 rows on desktop */}
              <div className="relative col-span-2 lg:col-span-2 row-span-2 h-56 sm:h-72 lg:h-80 overflow-hidden rounded-xl">
                <Image
                  src="/images/vip-table-milan-nightclub-just-me.webp"
                  alt="Just Me Milano VIP tables — luxury nightclub in Sempione"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 66vw, 40vw"
                />
              </div>
              {/* Top-right small images */}
              <div className="relative col-span-1 lg:col-span-2 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image
                  src="/images/pineta-milano.webp"
                  alt="Pineta Club Milan — singing aperitivo at Corso Como"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 33vw, 40vw"
                />
              </div>
              <div className="relative col-span-1 lg:col-span-1 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image
                  src="/images/rooftop-bar-milan-voya-skyline.webp"
                  alt="Voya Rooftop Milan — cocktails with skyline view in Isola"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
              </div>
              {/* Bottom-right small images */}
              <div className="relative col-span-1 lg:col-span-2 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image
                  src="/images/milan-club-crowd-dancefloor-night.webp"
                  alt="Milan nightclub dancefloor — Friday night crowd 2026"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 33vw, 40vw"
                />
              </div>
              <div className="relative col-span-1 lg:col-span-1 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image
                  src="/images/bottle-service-milan-vip-nightclub.webp"
                  alt="Bottle service Milan — VIP champagne at exclusive nightclub"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How Milan Nightlife Works — staggered timeline */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 w-full bg-black border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[var(--ivory)] tracking-tight mb-16">
              {lang === 'it' ? 'Come Funziona la Notte a Milano' : 'How Milan Nightlife Works'}
            </h2>
            <div className="relative flex flex-col gap-0">
              {/* Vertical connector line */}
              <div className="absolute left-[22px] top-8 bottom-8 w-px bg-gradient-to-b from-champagne/40 via-champagne/15 to-transparent hidden sm:block" />
              {[
                {
                  num: '01',
                  time: '18:00 — 22:00',
                  title: lang === 'it' ? 'Aperitivo' : 'Aperitivo',
                  body: lang === 'it'
                    ? 'La serata milanese inizia sempre con l\'aperitivo. Navigli per il canalside, Brera per il luxury, Voya per il rooftop con vista skyline.'
                    : 'Every Milan night starts with aperitivo. Navigli for canal-side vibes, Brera for luxury, Voya for rooftop skyline views.',
                },
                {
                  num: '02',
                  time: '21:00 — 23:30',
                  title: lang === 'it' ? 'Cena & Pre-Club' : 'Dinner & Pre-Club',
                  body: lang === 'it'
                    ? 'La cena nei migliori ristoranti di Corso Como o Brera. I club aprono ma restano vuoti. Arriva dopo mezzanotte per trovare l\'atmosfera giusta.'
                    : 'Dinner at the top restaurants in Corso Como or Brera. Clubs open but stay quiet. Arrive after midnight for the right atmosphere.',
                },
                {
                  num: '03',
                  time: '00:00 — 05:00',
                  title: lang === 'it' ? 'Club & VIP' : 'Club & VIP',
                  body: lang === 'it'
                    ? 'Just Me, Pineta, Play Club raggiungono il picco tra l\'una e le tre. VIP table con bottle service consigliati per saltare la coda e vivere il meglio della serata.'
                    : 'Just Me, Pineta, Play Club peak between 1–3 AM. VIP tables with bottle service recommended to skip the queue and get the best of the night.',
                },
              ].map((item, i) => (
                <div key={item.num} className={`flex gap-6 sm:gap-10 items-start ${i < 2 ? 'pb-12' : ''}`}>
                  {/* Number node */}
                  <div className="relative flex-shrink-0 flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full border border-champagne/30 bg-champagne/[0.06] flex items-center justify-center">
                      <span className="font-sans text-champagne text-[11px] font-bold tracking-widest">{item.num}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-2.5">
                    <p className="font-sans text-champagne/50 text-[10px] tracking-[0.3em] uppercase mb-1">{item.time}</p>
                    <h3 className="font-serif text-xl text-white font-semibold mb-2">{item.title}</h3>
                    <p className="font-sans text-white/45 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* H2: Tags / Popular Searches */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-black border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[var(--ivory)] tracking-tight mb-6">
              {lang === 'it' ? 'Esplora per Categoria' : 'Explore by Category'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: lang === 'it' ? 'Club Techno' : 'Techno Clubs', href: `${lang === 'it' ? '/it' : ''}/zones` },
                { label: lang === 'it' ? 'VIP Table' : 'VIP Tables', href: `${lang === 'it' ? '/it' : ''}/vip-tables` },
                { label: lang === 'it' ? 'Aperitivo Milano' : 'Aperitivo Milan', href: `${lang === 'it' ? '/it' : ''}/aperitivo` },
                { label: lang === 'it' ? 'Zona Navigli' : 'Navigli Zone', href: `${lang === 'it' ? '/it' : ''}/zones/navigli` },
                { label: lang === 'it' ? 'Zona Corso Como' : 'Corso Como Zone', href: `${lang === 'it' ? '/it' : ''}/zones/corso-como` },
                { label: lang === 'it' ? 'Guida ai Club' : 'Club Guide', href: `${lang === 'it' ? '/it' : ''}/guides` },
                { label: lang === 'it' ? 'Concierge' : 'Concierge Service', href: `${lang === 'it' ? '/it' : ''}/concierge` },
                { label: lang === 'it' ? 'Fashion Week Milano' : 'Fashion Week Milan', href: `${lang === 'it' ? '/it' : ''}/clubs` },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="px-5 py-2.5 rounded-full border border-white/15 text-white/50 text-xs font-sans tracking-widest uppercase hover:border-champagne/40 hover:text-champagne transition-colors duration-300 min-h-[44px] flex items-center"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
