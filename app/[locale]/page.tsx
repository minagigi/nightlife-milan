import { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import IntentCards from '@/components/IntentCards';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Suspense } from 'react';
import { mockEvents, mockVenues } from '@/lib/data';
import { fetchEventbriteEvents } from '@/lib/eventbriteSync';
import { Venue } from '@/lib/types';
import { CONTACT } from '@/config/contact';

const EventsCarousel = nextDynamic(() => import('@/components/EventsCarousel'));

export const dynamic = 'force-dynamic';

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

// ─── Featured venues shown in the homepage strip ───────────────────────────
const FEATURED_VENUES = [
  {
    id: 'v-justme',
    slug: 'just-me-milano',
    image: '/images/just-me-milano.webp',
    name: { en: 'Just Me', it: 'Just Me' },
    zone: { en: 'Sempione', it: 'Sempione' },
    label: { en: 'Most Exclusive', it: 'Più Esclusivo' },
    desc: {
      en: 'Roberto Cavalli design, velvet booths, fashion crowd. The Milan door that reads the room.',
      it: 'Design Roberto Cavalli, velluto e acciaio, crowd fashion. La selezione che legge la sala.',
    },
    tags: { en: ['House', 'Luxury', 'VIP Tables'], it: ['House', 'Lusso', 'Tavoli VIP'] },
  },
  {
    id: 'v-pineta',
    slug: 'pineta-club-milano',
    image: '/images/pineta-milano.webp',
    name: { en: 'Pineta Club', it: 'Pineta Club' },
    zone: { en: 'Corso Como', it: 'Corso Como' },
    label: { en: 'Singing Aperitivo', it: 'Aperitivo Cantato' },
    desc: {
      en: 'Long shared tables, buffet from 19:30, everyone on their feet by midnight.',
      it: 'Tavoli lunghi condivisi, buffet dalle 19:30, tutti in piedi a mezzanotte.',
    },
    tags: { en: ['Reggaeton', 'Commercial', 'Aperitivo'], it: ['Reggaeton', 'Commerciale', 'Aperitivo'] },
  },
  {
    id: 'v-voya',
    slug: 'voya-rooftop-milan',
    image: '/images/voya-rooftop-milan.webp',
    name: { en: 'Voya Rooftop', it: 'Voya Rooftop' },
    zone: { en: 'Isola — 20th floor', it: 'Isola — 20° piano' },
    label: { en: 'Best Skyline View', it: 'Vista Skyline' },
    desc: {
      en: 'The Milan skyline runs the length of the glass. Aperitivo turns into a DJ set without anyone noticing.',
      it: 'Lo skyline di Milano lungo le vetrate. L\'aperitivo diventa DJ set senza che te ne accorga.',
    },
    tags: { en: ['Skyline', 'Lounge', 'Cocktails'], it: ['Skyline', 'Lounge', 'Cocktail'] },
  },
];

// ─── How-the-night-works steps ─────────────────────────────────────────────
const NIGHT_STEPS = [
  {
    time: '18:00 — 22:00',
    title: { en: 'Aperitivo', it: 'Aperitivo' },
    body: {
      en: 'Every Milan night starts with aperitivo. Navigli for canal-side vibes, Brera for luxury, Voya for rooftop skyline views.',
      it: 'La serata milanese inizia sempre con l\'aperitivo. Navigli per il canalside, Brera per il luxury, Voya per il rooftop con vista skyline.',
    },
  },
  {
    time: '22:00 — 00:00',
    title: { en: 'Dinner & Pre-Club', it: 'Cena & Pre-Club' },
    body: {
      en: 'Dinner at the top restaurants in Corso Como or Brera. Clubs open but stay quiet. Arrive after midnight for the right atmosphere.',
      it: 'La cena nei migliori ristoranti di Corso Como o Brera. I club aprono ma restano vuoti. Arriva dopo mezzanotte.',
    },
  },
  {
    time: '00:00 — 05:00',
    title: { en: 'Club & VIP', it: 'Club & VIP' },
    body: {
      en: 'Just Me, Pineta, Play Club peak between 1–3 AM. VIP tables with bottle service to skip the queue and own the night.',
      it: 'Just Me, Pineta, Play Club al picco tra l\'una e le tre. Tavolo VIP con bottle service per saltare la fila.',
    },
  },
];

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Nightlife Milan',
    image: 'https://nightlifemilan.com/images/milan-nightclub-luxury-vip-champagne.webp',
    description: lang === 'it'
      ? 'La guida definitiva alla vita notturna milanese.'
      : "The ultimate guide to Milan's nightlife.",
    address: { '@type': 'PostalAddress', addressLocality: 'Milan', addressCountry: 'IT' },
    url: lang === 'it' ? 'https://nightlifemilan.com/it' : 'https://nightlifemilan.com',
  };

  // Upcoming events only
  const todayMidnight = new Date();
  todayMidnight.setHours(0, 0, 0, 0);

  const eventbriteEvents = await fetchEventbriteEvents();
  const allRawEvents = [
    ...mockEvents,
    ...eventbriteEvents.filter(eb => !mockEvents.some(m => m.id === eb.id)),
  ];

  // Priority: JustMe=1, Pineta=2, Aria=3, rest=99
  const getVenuePriority = (venueId: string) => {
    if (venueId === 'v-justme') return 1;
    if (venueId === 'v-pineta') return 2;
    if (venueId === 'v-aria')   return 3;
    return 99;
  };

  const sortEvents = (a: { event: typeof allRawEvents[0]; venue: Venue }, b: { event: typeof allRawEvents[0]; venue: Venue }) => {
    const dateA = new Date(a.event.dateISO).getTime();
    const dateB = new Date(b.event.dateISO).getTime();
    if (dateA !== dateB) return dateA - dateB;
    return getVenuePriority(a.event.venueId) - getVenuePriority(b.event.venueId);
  };

  const todayEnd = new Date(todayMidnight);
  todayEnd.setHours(23, 59, 59, 999);

  const tomorrow = new Date(todayMidnight);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const sunday = new Date(todayMidnight);
  const dow = sunday.getDay();
  sunday.setDate(sunday.getDate() + (dow === 0 ? 0 : 7 - dow));
  sunday.setHours(23, 59, 59, 999);

  const baseItems = allRawEvents
    .map(event => ({ event, venue: mockVenues.find(v => v.id === event.venueId) as Venue }))
    .filter(item => item.venue !== undefined);

  const tonightEvents = baseItems
    .filter(({ event }) => {
      const d = new Date(event.dateISO);
      return d >= todayMidnight && d <= todayEnd;
    })
    .sort(sortEvents);

  const weekEvents = baseItems
    .filter(({ event }) => {
      const d = new Date(event.dateISO);
      return d >= tomorrow && d <= sunday;
    })
    .sort(sortEvents);

  // Keep allEvents for any legacy usage
  const allEvents = [...tonightEvents, ...weekEvents];

  const lp = lang === 'it' ? '/it' : '';
  const waMsg = encodeURIComponent(
    lang === 'it'
      ? 'Ciao! Vorrei prenotare un tavolo VIP a Milano. Puoi aiutarmi?'
      : "Hi! I'd like to book a VIP table in Milan. Can you help me?"
  );
  const waLink = `${CONTACT.whatsapp.link}?text=${waMsg}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="flex-1 flex flex-col w-full">

        {/* ── 1. Hero ───────────────────────────────────────────────────── */}
        <Hero locale={lang} />

        {/* ── 2. Intent cards ──────────────────────────────────────────── */}
        <IntentCards locale={lang} />

        {/* ── 3. How the night works (context before events) ───────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 w-full border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-champagne/60 text-[10px] tracking-[0.3em] uppercase mb-3">
              {lang === 'it' ? 'La Notte Milanese' : 'The Milan Night'}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-white tracking-tight mb-10">
              {lang === 'it' ? 'Come Funziona la Notte a Milano' : 'How Milan Nightlife Works'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {NIGHT_STEPS.map((step, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-white/8 bg-white/[0.02] hover:border-champagne/20 transition-colors duration-300"
                >
                  <p className="font-sans text-champagne/60 text-[10px] tracking-[0.25em] uppercase mb-3">{step.time}</p>
                  <h3 className="font-serif text-xl text-white font-semibold mb-3">{step.title[lang]}</h3>
                  <p className="font-sans text-white/55 text-sm leading-relaxed">{step.body[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Featured Venues strip ─────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 w-full border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10 gap-4">
              <div>
                <p className="font-sans text-champagne/60 text-[10px] tracking-[0.3em] uppercase mb-3">
                  {lang === 'it' ? 'Selezione Curata' : 'Curated Selection'}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-white tracking-tight">
                  {lang === 'it' ? 'I Migliori Club di Milano' : 'Top Milan Clubs'}
                </h2>
              </div>
              <Link
                href={`${lp}/clubs`}
                className="hidden sm:flex items-center gap-2 text-xs font-sans text-champagne/60 hover:text-champagne tracking-widest uppercase transition-colors shrink-0"
              >
                {lang === 'it' ? 'Tutti i locali' : 'All venues'} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_VENUES.map((v) => (
                <Link
                  key={v.id}
                  href={`${lp}/clubs/${v.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-white/8 hover:border-champagne/25 transition-all duration-500 bg-black"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.name[lang]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={65}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    {/* Label badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-champagne/15 border border-champagne/30 text-champagne text-[10px] font-sans tracking-widest uppercase backdrop-blur-sm">
                      {v.label[lang]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="font-sans text-champagne/50 text-[10px] tracking-[0.25em] uppercase mb-1">{v.zone[lang]}</p>
                    <h3 className="font-serif text-xl text-white font-semibold mb-2 group-hover:text-champagne transition-colors duration-300">
                      {v.name[lang]}
                    </h3>
                    <p className="font-sans text-white/50 text-sm leading-relaxed mb-4">{v.desc[lang]}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {v.tags[lang].map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full border border-white/10 text-white/40 text-[10px] font-sans tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 sm:hidden text-center">
              <Link href={`${lp}/clubs`} className="text-xs font-sans text-champagne/60 hover:text-champagne tracking-widest uppercase transition-colors">
                {lang === 'it' ? 'Vedi tutti i locali →' : 'See all venues →'}
              </Link>
            </div>
          </div>
        </section>

        {/* ── 5a. Tonight's events ─────────────────────────────────────── */}
        <section className="border-t border-white/5 pt-16 pb-4">
          <div className="px-4 sm:px-6 lg:px-8 mb-8">
            <div className="max-w-7xl mx-auto flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
                  <p className="font-sans text-champagne/60 text-[10px] tracking-[0.3em] uppercase">
                    {lang === 'it' ? 'Stasera' : 'Tonight'}
                  </p>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-white tracking-tight">
                  {lang === 'it' ? 'Eventi di Stasera' : 'Tonight\'s Events'}
                </h2>
              </div>
              <Link
                href={`${lp}/events/tonight`}
                className="hidden sm:flex items-center gap-2 text-xs font-sans text-champagne/60 hover:text-champagne tracking-widest uppercase transition-colors shrink-0"
              >
                {lang === 'it' ? 'Vedi tutti' : 'See all'} →
              </Link>
            </div>
          </div>

          {tonightEvents.length > 0 ? (
            <Suspense fallback={<div className="h-[380px]" />}>
              <EventsCarousel items={tonightEvents} lang={lang} />
            </Suspense>
          ) : (
            <div className="px-4 sm:px-6 lg:px-8 pb-8">
              <div className="max-w-7xl mx-auto py-10 px-6 rounded-xl border border-white/8 bg-white/[0.02] text-center">
                <p className="font-sans text-white/40 text-sm mb-3">
                  {lang === 'it' ? 'Nessun evento programmato stasera.' : 'No events scheduled for tonight.'}
                </p>
                <Link href={`${lp}/events/best`} className="text-xs text-champagne/60 hover:text-champagne tracking-widest uppercase transition-colors">
                  {lang === 'it' ? 'Scopri i migliori club →' : 'Discover best clubs →'}
                </Link>
              </div>
            </div>
          )}

          <div className="pb-4 text-center sm:hidden px-4 mt-2">
            <Link href={`${lp}/events/tonight`} className="text-xs font-sans text-champagne/60 hover:text-champagne tracking-widest uppercase transition-colors">
              {lang === 'it' ? 'Tutti gli eventi di stasera →' : 'All tonight\'s events →'}
            </Link>
          </div>
        </section>

        {/* ── WhatsApp CTA (between the two rows) ──────────────────────── */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 px-6 py-4 rounded-xl border border-champagne/25 bg-champagne/[0.05] hover:bg-champagne/[0.09] hover:border-champagne/40 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-champagne shrink-0" />
                <span className="font-sans text-white/80 text-sm group-hover:text-white transition-colors">
                  {lang === 'it'
                    ? 'Prenota tavolo o guestlist — risposta in 10 minuti'
                    : 'Book table or guestlist — reply in 10 minutes'}
                </span>
              </div>
              <span className="font-sans text-champagne text-xs tracking-widest uppercase shrink-0 hidden sm:block">
                WhatsApp →
              </span>
            </a>
          </div>
        </div>

        {/* ── 5b. This week's events ───────────────────────────────────── */}
        <section className="border-t border-white/5 pt-12 pb-8">
          <div className="px-4 sm:px-6 lg:px-8 mb-8">
            <div className="max-w-7xl mx-auto flex items-end justify-between gap-4">
              <div>
                <p className="font-sans text-champagne/60 text-[10px] tracking-[0.3em] uppercase mb-2">
                  {lang === 'it' ? 'Questa Settimana' : 'This Week'}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-white tracking-tight">
                  {lang === 'it' ? 'Prossime Serate' : 'Upcoming This Week'}
                </h2>
              </div>
              <Link
                href={`${lp}/events/this-week`}
                className="hidden sm:flex items-center gap-2 text-xs font-sans text-champagne/60 hover:text-champagne tracking-widest uppercase transition-colors shrink-0"
              >
                {lang === 'it' ? 'Vedi tutti' : 'See all'} →
              </Link>
            </div>
          </div>

          {weekEvents.length > 0 ? (
            <Suspense fallback={<div className="h-[380px]" />}>
              <EventsCarousel items={weekEvents} lang={lang} />
            </Suspense>
          ) : (
            <div className="px-4 sm:px-6 lg:px-8 pb-8">
              <div className="max-w-7xl mx-auto py-10 px-6 rounded-xl border border-white/8 bg-white/[0.02] text-center">
                <p className="font-sans text-white/40 text-sm mb-3">
                  {lang === 'it' ? 'Nessun altro evento questa settimana.' : 'No more events this week.'}
                </p>
                <Link href={`${lp}/events/best`} className="text-xs text-champagne/60 hover:text-champagne tracking-widest uppercase transition-colors">
                  {lang === 'it' ? 'Scopri i migliori club →' : 'Discover best clubs →'}
                </Link>
              </div>
            </div>
          )}

          <div className="pb-6 text-center sm:hidden px-4 mt-2">
            <Link href={`${lp}/events/this-week`} className="text-xs font-sans text-champagne/60 hover:text-champagne tracking-widest uppercase transition-colors">
              {lang === 'it' ? 'Tutti gli eventi della settimana →' : 'All this week\'s events →'}
            </Link>
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-champagne/15 to-transparent" aria-hidden="true" />

        {/* ── 6. WhatsApp CTA strip ────────────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 w-full border-t border-white/5 bg-gradient-to-b from-transparent to-champagne/[0.03]">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-sans text-champagne/60 text-[10px] tracking-[0.3em] uppercase mb-4">
              {lang === 'it' ? 'Concierge Personale' : 'Personal Concierge'}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
              {lang === 'it' ? 'Prenota il Tuo Tavolo Stasera' : 'Book Your Table Tonight'}
            </h2>
            <p className="font-sans text-white/50 text-base leading-relaxed mb-8 max-w-lg mx-auto">
              {lang === 'it'
                ? 'Scrivi su WhatsApp. Ti rispondo entro 10 minuti con disponibilità, prezzi e accesso diretto senza coda.'
                : 'Message on WhatsApp. Reply within 10 minutes with availability, pricing and direct queue-free access.'}
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-champagne text-[#131009] font-sans font-semibold text-sm tracking-wider uppercase hover:bg-champagne/90 transition-colors duration-300 shadow-[0_0_40px_rgba(201,168,106,0.2)]"
            >
              <MessageCircle className="w-4 h-4" />
              {lang === 'it' ? 'WhatsApp — Rispondo in 10 min' : 'WhatsApp — Reply in 10 min'}
            </a>
            <p className="mt-4 font-sans text-white/25 text-xs tracking-wider">
              {lang === 'it' ? 'Servizio gratuito · Nessuna commissione' : 'Free service · No booking fee'}
            </p>
          </div>
        </section>

        {/* ── 7. AI Trafiletto ─────────────────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-b from-charcoal to-black border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] mb-12">
              <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
              <p className="font-sans text-white/70 text-sm leading-relaxed">
                {lang === 'it'
                  ? 'La vita notturna di Milano 2026: i migliori club sono Just Me (Sempione, VIP table da €500), Pineta (Corso Como, aperitivo cantato venerdì), Voya Rooftop (Isola, 20° piano). Club aperti dalle 22:00–23:30 fino alle 5:00. Prenota via WhatsApp +39 351 912 7047 — risposta in 10 minuti.'
                  : 'Milan nightlife 2026: top clubs are Just Me (Sempione, VIP tables from €500), Pineta (Corso Como, singing aperitivo Fridays), Voya Rooftop (Isola, 20th floor). Clubs open from 22:00–23:30 until 5:00 AM. Book via WhatsApp +39 351 912 7047 — reply in under 10 minutes.'}
              </p>
            </div>

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

        {/* ── 8. Photo Grid ────────────────────────────────────────────── */}
        <section className="py-4 px-4 sm:px-6 lg:px-8 w-full bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2" style={{ gridTemplateRows: 'auto auto' }}>
              <div className="relative col-span-2 lg:col-span-2 row-span-2 h-56 sm:h-72 lg:h-80 overflow-hidden rounded-xl">
                <Image src="/images/vip-table-milan-nightclub-just-me.webp" alt="Just Me Milano VIP tables — luxury nightclub in Sempione" fill quality={65} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 66vw, 40vw" />
              </div>
              <div className="relative col-span-1 lg:col-span-2 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image src="/images/pineta-milano.webp" alt="Pineta Club Milan — singing aperitivo at Corso Como" fill quality={65} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 33vw, 40vw" />
              </div>
              <div className="relative col-span-1 lg:col-span-1 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image src="/images/rooftop-bar-milan-voya-skyline.webp" alt="Voya Rooftop Milan — cocktails with skyline view in Isola" fill quality={65} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 33vw, 20vw" />
              </div>
              <div className="relative col-span-1 lg:col-span-2 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image src="/images/milan-club-crowd-dancefloor-night.webp" alt="Milan nightclub dancefloor — Friday night crowd 2026" fill quality={65} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 33vw, 40vw" />
              </div>
              <div className="relative col-span-1 lg:col-span-1 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image src="/images/bottle-service-milan-vip-nightclub.webp" alt="Bottle service Milan — VIP champagne at exclusive nightclub" fill quality={65} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 33vw, 20vw" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. Tags / Popular Searches ───────────────────────────────── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[var(--ivory)] tracking-tight mb-6">
              {lang === 'it' ? 'Esplora per Categoria' : 'Explore by Category'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: lang === 'it' ? 'Club Techno' : 'Techno Clubs', href: `${lp}/zones` },
                { label: lang === 'it' ? 'VIP Table' : 'VIP Tables', href: `${lp}/vip-tables` },
                { label: lang === 'it' ? 'Aperitivo Milano' : 'Aperitivo Milan', href: `${lp}/aperitivo` },
                { label: lang === 'it' ? 'Zona Navigli' : 'Navigli Zone', href: `${lp}/zones/navigli` },
                { label: lang === 'it' ? 'Zona Corso Como' : 'Corso Como Zone', href: `${lp}/zones/corso-como` },
                { label: lang === 'it' ? 'Guida ai Club' : 'Club Guide', href: `${lp}/guides` },
                { label: lang === 'it' ? 'Concierge' : 'Concierge Service', href: `${lp}/concierge` },
                { label: lang === 'it' ? 'Fashion Week Milano' : 'Fashion Week Milan', href: `${lp}/clubs` },
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
