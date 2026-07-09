import { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import IntentCards from '@/components/IntentCards';
import NightLine from '@/components/NightLine';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Suspense } from 'react';
import { getAllCalendarEvents, romeDayKey, romeDayKeyOffset, romeSundayKey } from '@/lib/calendarEvents';
import { Venue, Event } from '@/lib/types';
import { CONTACT } from '@/config/contact';

const EventsCarousel = nextDynamic(() => import('@/components/EventsCarousel'));

export const revalidate = 300; // ISR 5 min — metadata bloccante nel <head>, HTML cacheato all'edge

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'it' }];
}

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

  // Sorgente unificata (statici + Eventbrite/Xceed + serate ricorrenti
  // settimanali) e confini di giorno nel fuso di Roma — non del server
  // (UTC su Vercel), stessa correzione già applicata a /calendar/* ed
  // /events/*. Prima la homepage usava la mezzanotte locale del server e
  // ignorava del tutto le serate ricorrenti (Just Me, Pineta, Aria, Voya,
  // 55 Milano, Play Club, Repvblic): se una venue non aveva un evento
  // one-off proprio quella sera, "Stasera" saltava al giorno successivo
  // anche se il locale era regolarmente aperto.
  const baseItems = await getAllCalendarEvents();

  const todayKey = romeDayKeyOffset(0);
  const tomorrowKey = romeDayKeyOffset(1);
  const sundayKey = romeSundayKey();

  // Priority: JustMe=1, Pineta=2, Aria=3, rest=99
  const getVenuePriority = (venueId: string) => {
    if (venueId === 'v-justme') return 1;
    if (venueId === 'v-pineta') return 2;
    if (venueId === 'v-aria')   return 3;
    return 99;
  };

  const sortEvents = (a: { event: Event; venue: Venue }, b: { event: Event; venue: Venue }) => {
    const dateA = new Date(a.event.dateISO).getTime();
    const dateB = new Date(b.event.dateISO).getTime();
    if (dateA !== dateB) return dateA - dateB;
    return getVenuePriority(a.event.venueId) - getVenuePriority(b.event.venueId);
  };

  const tonightEvents = baseItems
    .filter(({ event }) => romeDayKey(event.dateISO) === todayKey)
    .sort(sortEvents);

  const weekEvents = baseItems
    .filter(({ event }) => {
      const key = romeDayKey(event.dateISO);
      return key >= tomorrowKey && key <= sundayKey;
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
        <NightLine />

        {/* ── 1. Hero ───────────────────────────────────────────────────── */}
        <Hero locale={lang} />

        {/* ── 2. Intent cards ──────────────────────────────────────────── */}
        <IntentCards locale={lang} />

        {/* ── 3. How the night works (context before events) ───────────── */}
        <section className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 w-full border-t border-white/5 bg-surface-1">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-champagne/80 text-[10px] tracking-[0.3em] uppercase mb-3">
              {lang === 'it' ? 'La Notte Milanese' : 'The Milan Night'}
            </p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium italic text-white tracking-tight leading-tight mb-10 md:mb-16">
              {lang === 'it' ? 'Come Funziona la Notte a Milano' : 'How Milan Nightlife Works'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {NIGHT_STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`relative group py-10
                    ${i > 0 ? 'border-t md:border-t-0 md:border-l border-white/8 md:pl-10' : ''}
                    ${i < 2 ? 'md:pr-10' : ''}`}
                >
                  {/* Giant serif number — decorative, rendered via ::after (see .deco-number-lg) */}
                  <span
                    className="deco-number-lg absolute inset-0"
                    data-n={String(i + 1).padStart(2, '0')}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 mt-20">
                    <span className="flex items-center gap-2.5 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-champagne shrink-0" aria-hidden="true" />
                      <span className="h-px flex-1 bg-gradient-to-r from-champagne/40 to-transparent" aria-hidden="true" />
                    </span>
                    <p className="font-sans text-champagne/80 text-[10px] tracking-[0.3em] uppercase mb-4 tabular-nums">{step.time}</p>
                    <h3 className="font-serif text-2xl md:text-3xl text-white font-medium italic leading-snug mb-4">{step.title[lang]}</h3>
                    <p className="font-sans text-corpo text-sm leading-relaxed">{step.body[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Featured Venues strip ─────────────────────────────────── */}
        <section className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 w-full border-t border-white/5 overflow-hidden">
          {/* Ambient glow blobs — cinematic atmosphere */}
          <div className="blob-1 absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-champagne/[0.04] blur-[120px] pointer-events-none" aria-hidden="true" />
          <div className="blob-2 absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-champagne/[0.03] blur-[100px] pointer-events-none" aria-hidden="true" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-end justify-between mb-10 gap-4">
              <div>
                <p className="font-sans text-champagne/80 text-[10px] tracking-[0.3em] uppercase mb-3">
                  {lang === 'it' ? 'Selezione Curata' : 'Curated Selection'}
                </p>
                <h2 className="font-serif text-5xl md:text-6xl font-medium text-white tracking-tight leading-tight">
                  {lang === 'it' ? 'I Migliori Club di Milano' : 'Top Milan Clubs'}
                </h2>
              </div>
              <Link
                href={`${lp}/clubs`}
                className="hidden sm:flex items-center gap-2 text-xs font-sans text-champagne/80 hover:text-champagne tracking-widest uppercase transition-colors shrink-0"
              >
                {lang === 'it' ? 'Tutti i locali' : 'All venues'} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FEATURED_VENUES.map((v, i) => (
                <Link
                  key={v.id}
                  href={`${lp}/clubs/${v.slug}`}
                  className="animate-card-in group relative overflow-hidden rounded-xl border border-white/8 hover:border-champagne/30 transition-all duration-500 bg-depth flex flex-col"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  {/* Image — 4:5 portrait ratio */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={v.image}
                      alt={v.name[lang]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={85}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMxQzE4MTAiLz48L3N2Zz4="
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Warm tone overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Hover "luce interna" — luce che filtra dalla porta del club */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,106,0.18) 0%, transparent 65%)' }}
                    />
                    {/* Label badge — targa civica */}
                    <span className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-b from-[#2A2214] to-[#1C1810] border border-brass/40 text-champagne text-[10px] font-sans font-medium tracking-[0.2em] uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.5)]">
                      {v.label[lang]}
                    </span>
                    {/* Name overlay at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="font-sans text-champagne/80 text-[10px] tracking-[0.25em] uppercase mb-1">{v.zone[lang]}</p>
                      <h3 className="font-serif text-2xl text-white font-semibold group-hover:text-champagne transition-colors duration-300 leading-tight">
                        {v.name[lang]}
                      </h3>
                    </div>
                  </div>

                  {/* Content below image */}
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="font-sans text-corpo text-sm leading-relaxed mb-4 flex-1">{v.desc[lang]}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {v.tags[lang].map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full border border-white/10 text-white/60 text-[10px] font-sans tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 sm:hidden text-center">
              <Link href={`${lp}/clubs`} className="text-xs font-sans text-champagne/80 hover:text-champagne tracking-widest uppercase transition-colors">
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
                  <p className="font-sans text-champagne/80 text-[10px] tracking-[0.3em] uppercase">
                    {lang === 'it' ? 'Stasera' : 'Tonight'}
                  </p>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-white tracking-tight">
                  {lang === 'it' ? 'Eventi di Stasera' : "Tonight's Events"}
                </h2>
                <p className="font-serif italic text-lg text-ivory/50 mt-2">
                  {lang === 'it' ? 'In scena questa notte a Milano' : 'On stage tonight in Milan'}
                </p>
              </div>
              <Link
                href={`${lp}/events/tonight`}
                className="hidden sm:flex items-center gap-2 text-xs font-sans text-champagne/80 hover:text-champagne tracking-widest uppercase transition-colors shrink-0"
              >
                {lang === 'it' ? 'Vedi tutti' : 'See all'} →
              </Link>
            </div>
          </div>

          {tonightEvents.length > 0 ? (
            <Suspense fallback={<div className="h-[380px]" />}>
              <EventsCarousel items={tonightEvents} lang={lang} showTonightTag />
            </Suspense>
          ) : (
            <div className="px-4 sm:px-6 lg:px-8 pb-8">
              <div className="max-w-7xl mx-auto py-10 px-6 rounded-xl border border-white/8 bg-white/[0.02] text-center">
                <p className="font-sans text-white/60 text-sm mb-3">
                  {lang === 'it' ? 'Nessun evento programmato stasera.' : 'No events scheduled for tonight.'}
                </p>
                <Link href={`${lp}/events/best`} className="text-xs text-champagne/80 hover:text-champagne tracking-widest uppercase transition-colors">
                  {lang === 'it' ? 'Scopri i migliori club →' : 'Discover best clubs →'}
                </Link>
              </div>
            </div>
          )}

          <div className="pb-4 text-center sm:hidden px-4 mt-2">
            <Link href={`${lp}/events/tonight`} className="text-xs font-sans text-champagne/80 hover:text-champagne tracking-widest uppercase transition-colors">
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
        <section className="border-t border-white/5 pt-12 pb-8 bg-surface-1">
          <div className="px-4 sm:px-6 lg:px-8 mb-8">
            <div className="max-w-7xl mx-auto flex items-end justify-between gap-4">
              <div>
                <p className="font-sans text-champagne/80 text-[10px] tracking-[0.3em] uppercase mb-2">
                  {lang === 'it' ? 'Questa Settimana' : 'This Week'}
                </p>
                <h2 className="font-serif text-4xl md:text-5xl font-medium text-white tracking-tight">
                  {lang === 'it' ? 'Prossime Serate' : 'Upcoming This Week'}
                </h2>
              </div>
              <Link
                href={`${lp}/events/this-week`}
                className="hidden sm:flex items-center gap-2 text-xs font-sans text-champagne/80 hover:text-champagne tracking-widest uppercase transition-colors shrink-0"
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
                <p className="font-sans text-white/60 text-sm mb-3">
                  {lang === 'it' ? 'Nessun altro evento questa settimana.' : 'No more events this week.'}
                </p>
                <Link href={`${lp}/events/best`} className="text-xs text-champagne/80 hover:text-champagne tracking-widest uppercase transition-colors">
                  {lang === 'it' ? 'Scopri i migliori club →' : 'Discover best clubs →'}
                </Link>
              </div>
            </div>
          )}

          <div className="pb-6 text-center sm:hidden px-4 mt-2">
            <Link href={`${lp}/events/this-week`} className="text-xs font-sans text-champagne/80 hover:text-champagne tracking-widest uppercase transition-colors">
              {lang === 'it' ? 'Tutti gli eventi della settimana →' : 'All this week\'s events →'}
            </Link>
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-champagne/25 to-transparent" aria-hidden="true" />

        {/* ── 6. WhatsApp CTA strip ────────────────────────────────────── */}
        <section className="relative py-28 px-4 sm:px-6 lg:px-8 w-full overflow-hidden border-t border-white/5">
          {/* Background ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-[#1a1508] to-charcoal" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-champagne/[0.07] blur-[80px] rounded-full pointer-events-none" />

          <div className="relative max-w-3xl mx-auto text-center">
            {/* Live indicator */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
              <p className="font-sans text-champagne/80 text-[10px] tracking-[0.35em] uppercase">
                {lang === 'it' ? 'Disponibile Adesso' : 'Available Now'}
              </p>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-medium text-white tracking-tight mb-4 leading-tight">
              {lang === 'it' ? 'Il Tavolo Migliore\ndi Milano Stasera' : 'The Best Table\nin Milan Tonight'}
            </h2>
            <p className="font-sans text-corpo text-base leading-relaxed mb-3 max-w-md mx-auto">
              {lang === 'it'
                ? 'Scrivi ora. Rispondo in 10 minuti con disponibilità, prezzi e accesso diretto — senza coda, senza stress.'
                : 'Message now. I reply in 10 minutes with availability, pricing, and direct access — no queue, no hassle.'}
            </p>
            <p className="font-sans text-champagne/40 text-xs tracking-widest uppercase mb-10">
              {lang === 'it' ? 'Servizio gratuito · Nessuna commissione · 500+ prenotazioni' : 'Free service · No booking fee · 500+ bookings'}
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-champagne text-charcoal font-sans font-bold text-sm tracking-[0.12em] uppercase hover:bg-white transition-colors duration-300 shadow-[0_0_60px_rgba(201,168,106,0.25)] mb-6"
            >
              <MessageCircle className="w-4 h-4" />
              {lang === 'it' ? 'Prenota Ora via WhatsApp' : 'Book Now via WhatsApp'}
            </a>

            {/* Social proof row */}
            <div className="flex items-center justify-center gap-6 mt-6">
              {[
                { n: '10 min', label: lang === 'it' ? 'risposta' : 'reply time' },
                { n: '500+', label: lang === 'it' ? 'prenotazioni' : 'bookings' },
                { n: '18+', label: lang === 'it' ? 'club partner' : 'partner clubs' },
              ].map(({ n, label }) => (
                <div key={n} className="text-center">
                  <p className="font-serif text-champagne text-xl font-semibold">{n}</p>
                  <p className="font-sans text-white/45 text-[9px] tracking-widest uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. AI Trafiletto ─────────────────────────────────────────── */}
        <section className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 w-full bg-gradient-to-b from-charcoal to-depth border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="relative pl-6 border-l-2 border-champagne/35 mb-14">
              <p className="font-sans text-champagne/50 text-[9px] tracking-[0.35em] uppercase mb-2">Quick Answer</p>
              <p className="font-serif italic text-ivory/70 text-lg leading-relaxed">
                {lang === 'it'
                  ? 'La vita notturna di Milano 2026: i migliori club sono Just Me (Sempione, VIP table da €500), Pineta (Corso Como, aperitivo cantato venerdì), Voya Rooftop (Isola, 20° piano). Club aperti dalle 22:00–23:30 fino alle 5:00. Prenota via WhatsApp +39 351 912 7047 — risposta in 10 minuti.'
                  : 'Milan nightlife 2026: top clubs are Just Me (Sempione, VIP tables from €500), Pineta (Corso Como, singing aperitivo Fridays), Voya Rooftop (Isola, 20th floor). Clubs open from 22:00–23:30 until 5:00 AM. Book via WhatsApp +39 351 912 7047 — reply in under 10 minutes.'}
              </p>
            </div>

            <p className="font-sans text-champagne/80 text-[10px] tracking-[0.3em] uppercase mb-5 accent-line-gold">
              {lang === 'it' ? 'La Guida Definitiva' : 'The Definitive Guide'}
            </p>
            <h2 className="font-serif text-5xl md:text-6xl font-medium text-ivory tracking-tight leading-tight mb-6">
              {lang === 'it' ? 'Il Cuore Pulsante di Milano' : 'The Beating Heart of Milan'}
            </h2>
            <p className="text-corpo text-lg leading-relaxed font-light mb-10
              first-letter:font-serif first-letter:text-6xl first-letter:font-medium first-letter:text-champagne first-letter:float-left first-letter:mr-3 first-letter:leading-[0.8] first-letter:mt-1">
              {lang === 'it'
                ? 'Milano non è solo la capitale della moda, ma anche il centro nevralgico del divertimento italiano. Dai lussuosi club di Corso Como ai bar underground dei Navigli, la nostra guida ti porta alla scoperta dei luoghi più esclusivi.'
                : 'Milan is not just the fashion capital, but also the nerve center of Italian entertainment. From the luxurious clubs of Corso Como to the underground bars of the Navigli, our guide takes you to discover the most exclusive places.'}
            </p>
          </div>
        </section>

        {/* ── 8. Photo Grid ────────────────────────────────────────────── */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 w-full bg-depth border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2" style={{ gridTemplateRows: 'auto auto' }}>
              <div className="relative col-span-2 lg:col-span-2 row-span-2 h-56 sm:h-72 lg:h-80 overflow-hidden rounded-xl">
                <Image src="/images/vip-table-milan-nightclub-just-me.webp" alt="Just Me Milano VIP tables — luxury nightclub in Sempione" fill quality={85} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 66vw, 40vw" />
              </div>
              <div className="relative col-span-1 lg:col-span-2 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image src="/images/pineta-milano.webp" alt="Pineta Club Milan — singing aperitivo at Corso Como" fill quality={85} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 33vw, 40vw" />
              </div>
              <div className="relative col-span-1 lg:col-span-1 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image src="/images/rooftop-bar-milan-voya-skyline.webp" alt="Voya Rooftop Milan — cocktails with skyline view in Isola" fill quality={85} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 33vw, 20vw" />
              </div>
              <div className="relative col-span-1 lg:col-span-2 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image src="/images/milan-club-crowd-dancefloor-night.webp" alt="Milan nightclub dancefloor — Friday night crowd 2026" fill quality={85} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 33vw, 40vw" />
              </div>
              <div className="relative col-span-1 lg:col-span-1 h-28 sm:h-36 lg:h-[152px] overflow-hidden rounded-xl">
                <Image src="/images/bottle-service-milan-vip-nightclub.webp" alt="Bottle service Milan — VIP champagne at exclusive nightclub" fill quality={85} className="object-cover hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 33vw, 20vw" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 9. Tags / Popular Searches ───────────────────────────────── */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 w-full bg-depth border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <p className="font-sans text-champagne/80 text-[10px] tracking-[0.3em] uppercase mb-5 accent-line-gold">
              {lang === 'it' ? 'Naviga' : 'Discover'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-ivory tracking-tight mb-10">
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
                  className="px-6 py-3 border border-white/10 text-corpo text-[11px] font-sans tracking-[0.2em] uppercase hover:border-champagne/40 hover:text-champagne hover:bg-champagne/[0.04] transition-all duration-300 min-h-[44px] flex items-center"
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
