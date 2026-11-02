import OctoberEntry from '@/components/OctoberEntry';
import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { generateEventListSchema, getLocalizedText, jsonLdString } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { getAllCalendarEvents, romeDayKey, romeDayKeyOffset, dayOfWeekForKey } from '@/lib/calendarEvents';
import type { Event, Venue } from '@/lib/types';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { compareEventbriteDiscoveryItems, getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';
import { WeeklyNightlifeNavigator, VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/events/this-week`;
  const todayKey = romeDayKeyOffset(0);
  const todayDow = dayOfWeekForKey(todayKey);
  const daysToSunday = todayDow === 0 ? 0 : 7 - todayDow;
  const sundayKey = romeDayKeyOffset(daysToSunday);
  const intlLocale = getLocaleDef(locale)?.hreflang || 'en';
  const start = new Date(`${todayKey}T12:00:00Z`).toLocaleDateString(intlLocale, {
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/Rome',
  });
  const end = new Date(`${sundayKey}T12:00:00Z`).toLocaleDateString(intlLocale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Europe/Rome',
  });

  const title = seoTitle(
    `${tr(locale, 'Milan Events This Week (Autumn/Winter 2026 & NYE 2027)', 'Eventi a Milano Questa Settimana (Autunno/Inverno 2026 & Capodanno 2027)')} | ${start} - ${end}`,
  );
  const description = withWhatsApp(
    tr(
      locale,
      'All events and nights happening this week in Milan (Autumn/Winter 2026 & NYE 2027): Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop & Repvblic. Book your VIP table via WhatsApp +39 351 912 7047.',
      'Tutti gli eventi e le serate in programma questa settimana a Milano (Autunno/Inverno 2026 & Capodanno 2027): Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop e Repvblic. Prenota il tuo tavolo VIP via WhatsApp +39 351 912 7047.',
    ),
    locale,
  );

  return {
    title,
    description,
    keywords: isIt
      ? [
          'eventi questa settimana milano',
          'serate settimana milano autunno inverno 2026',
          'cosa fare questa settimana milano',
          'club milano settimana',
          'capodanno 2027 milano eventi',
        ]
      : [
          'events this week milan',
          'milan nightlife this week autumn winter 2026',
          'what to do this week milan',
          'clubs milan this week',
          'nye 2027 milan events',
        ],
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/events/this-week'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: `${baseUrl}/images/pillars/events-this-week-hero.webp`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/pillars/events-this-week-hero.webp`],
    },
  };
}

const DAYS_IT = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const PRIORITY_SIX_WEEK = [
  {
    rank: 1,
    name: 'Just Me Milano',
    slug: 'just-me-milano',
    zone: 'Parco Sempione (Torre Branca)',
    scheduleIt: 'Aperto 7 sere su 7 (Lun – Dom)',
    scheduleEn: 'Open 7 nights a week (Mon – Sun)',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 00:30 · Clubbing 23:30–05:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:30 · Clubbing 23:30–05:00',
    pricesIt: 'Royal Aperitivo 20–30€ · Tavoli VIP da 350–500€',
    pricesEn: 'Royal Aperitivo €20–30 · VIP Tables from €350–500',
  },
  {
    rank: 2,
    name: 'Pineta Club Milano',
    slug: 'pineta-club-milano',
    zone: 'Corso Como / Via Messina 38',
    scheduleIt: 'Venerdì, Sabato & Prefestivi (Aperitivo Cantato + Club)',
    scheduleEn: 'Friday, Saturday & Pre-Holidays (Singing Aperitivo + Club)',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 00:45 · Clubbing 23:30–05:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:45 · Clubbing 23:30–05:00',
    pricesIt: 'Aperitivo Cantato 20–25€ · Tavoli VIP 300–600€',
    pricesEn: 'Singing Aperitivo €20–25 · VIP Tables €300–600',
  },
  {
    rank: 3,
    name: 'Aria Club Milano',
    slug: 'aria-club-milano',
    zone: 'San Siro · Piazzale dello Sport 14 (150m Stadio Meazza)',
    scheduleIt: 'Giovedì, Venerdì, Sabato & Matchday San Siro',
    scheduleEn: 'Thursday, Friday, Saturday & San Siro Matchdays',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 01:00 · Clubbing 23:30–05:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 01:00 · Clubbing 23:30–05:00',
    pricesIt: 'Aperitivo 15–25€ · Tavoli Pista/Privé da 250€',
    pricesEn: 'Aperitivo €15–25 · Dancefloor/Privé Tables from €250',
  },
  {
    rank: 4,
    name: '55 Milano (FiftyFive)',
    slug: '55-milano',
    zone: 'Arco della Pace / Via Piero della Francesca 55',
    scheduleIt: 'Martedì – Domenica (Apericena XL, Dinner Show & The Wall)',
    scheduleEn: 'Tuesday – Sunday (XXL Apericena, Dinner Show & The Wall)',
    hoursIt: 'Apericena 19:30–22:30 · Cut-Off Liste 00:45 · Clubbing 23:30–04:30',
    hoursEn: 'Apericena 19:30–22:30 · Guestlist Cut-Off 00:45 · Clubbing 23:30–04:30',
    pricesIt: 'Apericena 20–30€ · Dinner Show 50€ · Tavoli da 250€',
    pricesEn: 'Apericena €20–30 · Dinner Show €50 · Tables from €250',
  },
  {
    rank: 5,
    name: 'Voya Rooftop Milan',
    slug: 'voya-rooftop-milan',
    zone: 'Isola / Portello — 20° Piano Vista Skyline',
    scheduleIt: 'Martedì – Domenica (Sunset & Sky Lounge DJ Set)',
    scheduleEn: 'Tuesday – Sunday (Sunset & Sky Lounge DJ Set)',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 00:30 · Clubbing 23:30–04:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:30 · Clubbing 23:30–04:00',
    pricesIt: 'Aperitivo Panoramico 20–30€ · Tavoli Vetrata da 250–350€',
    pricesEn: 'Panoramic Aperitivo €20–30 · Window Tables from €250–350',
  },
  {
    rank: 6,
    name: 'Repvblic Milano',
    slug: 'repvblic-milano',
    zone: 'Piazza della Repubblica / Mecenate',
    scheduleIt: 'Lunedì (Dirty Monday), Venerdì & Sabato',
    scheduleEn: 'Monday (Dirty Monday), Friday & Saturday',
    hoursIt: 'Ingresso 23:30 · Cut-Off Liste 01:00 · Clubbing 23:30–05:00',
    hoursEn: 'Doors 23:30 · Guestlist Cut-Off 01:00 · Clubbing 23:30–05:00',
    pricesIt: 'Tavoli Pista da 300€ · Privé da 500€',
    pricesEn: 'Dancefloor Tables from €300 · Privé from €500',
  },
];

export default async function EventsThisWeekPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const todayKey = romeDayKeyOffset(0);
  const todayDow = dayOfWeekForKey(todayKey); // 0=Sun..6=Sat
  const daysSinceMonday = todayDow === 0 ? 6 : todayDow - 1;
  const sundayKey = romeDayKeyOffset(-daysSinceMonday + 6);
  const startDay = new Date(`${todayKey}T12:00:00Z`);
  const sunday = new Date(`${sundayKey}T12:00:00Z`);

  const allItems = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale);
  const weekItems = allItems
    .filter(({ event }) => {
      const key = romeDayKey(event.dateISO);
      return key >= todayKey && key <= sundayKey;
    })
    .sort((a, b) => romeDayKey(a.event.dateISO).localeCompare(romeDayKey(b.event.dateISO)) || compareEventbriteDiscoveryItems(a, b));

  // Group by day of week
  const byDay: Record<number, { event: Event; venue: Venue }[]> = {};
  weekItems.forEach((item) => {
    const dow = dayOfWeekForKey(romeDayKey(item.event.dateISO));
    if (!byDay[dow]) byDay[dow] = [];
    byDay[dow].push(item);
  });

  // Order: Mon(1) Tue(2) Wed(3) Thu(4) Fri(5) Sat(6) Sun(0)
  const orderedDays = [1, 2, 3, 4, 5, 6, 0].filter((d) => byDay[d]?.length > 0);

  const weekLabel = `${startDay.toLocaleDateString(isIt ? 'it-IT' : 'en-US', { day: 'numeric', month: 'short', timeZone: 'Europe/Rome' })} – ${sunday.toLocaleDateString(isIt ? 'it-IT' : 'en-US', { day: 'numeric', month: 'short', timeZone: 'Europe/Rome' })}`;

  const eventListSchema =
    weekItems.length > 0
      ? generateEventListSchema(
          weekItems,
          locale,
          tr(locale, 'Milan events this week', 'Eventi a Milano questa settimana'),
        )
      : null;

  return (
    <>
      {eventListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(eventListSchema) }} />
      )}
      <main className="flex-1 bg-[#131009] w-full pt-20 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <nav className="text-xs text-white/30 flex gap-2">
            <Link href={`${lp}/`} className="hover:text-champagne transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`${lp}/events`} className="hover:text-champagne transition-colors">
              {tr(locale, 'Events', 'Eventi')}
            </Link>
            <span>/</span>
            <span className="text-champagne">{tr(locale, 'This Week', 'Questa Settimana')}</span>
          </nav>
        </div>

        {/* Header */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-champagne/60 text-xs font-mono uppercase tracking-[0.2em]">
              {weekLabel} · {tr(locale, 'Autumn/Winter 2026 & NYE 2027', 'Autunno/Inverno 2026 & Capodanno 2027')}
            </span>
          </div>
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-champagne/25">
            <Image
              src="/images/pillars/events-this-week-hero.webp"
              alt={tr(locale, 'This Week in Milan', 'Questa Settimana a Milano')}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-4">
            {tr(locale, 'This Week in Milan', 'Questa Settimana a Milano')}
          </h1>
          <p className="text-lg text-white/50 font-light mb-8">
            {isIt
              ? `${weekItems.length} eventi selezionati questa settimana a Milano nei 6 club prioritari.`
              : `${weekItems.length} curated events in Milan this week across the 6 priority clubs.`}
          </p>

          {/* Quick Answer */}
          <div className="mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
            <p className="text-champagne/50 text-[9px] tracking-[0.3em] uppercase mb-2">Quick Answer</p>
            <p className="text-white/75 text-sm leading-relaxed">
              {tr(
                locale,
                'This week in Milan (Autumn/Winter 2026 & NYE 2027): 1. Just Me opens every night (Mon–Sun), 2. Pineta on Friday & Saturday, 3. Aria Club Thursday–Saturday, 4. 55 Milano Tue–Sun, 5. Voya Rooftop Tue–Sun, 6. Repvblic Mon/Fri/Sat. Book your table via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com.',
                'Questa settimana a Milano (Autunno/Inverno 2026 & Capodanno 2027): 1. Just Me apre ogni sera (lun–dom), 2. Pineta venerdì e sabato, 3. Aria Club giovedì–sabato, 4. 55 Milano mar–dom, 5. Voya Rooftop mar–dom, 6. Repvblic lun/ven/sab. Prenota tavolo via WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com.',
              )}
            </p>
          </div>

          {/* Nav pills */}
          <div className="flex gap-3 flex-wrap">
            <Link
              href={`${lp}/events/tonight`}
              className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase"
            >
              {tr(locale, 'Tonight', 'Stasera')}
            </Link>
            <span className="px-6 py-2.5 rounded-full bg-champagne text-black text-sm font-medium tracking-wider uppercase">
              {tr(locale, 'This Week', 'Questa Settimana')}
            </span>
            <Link
              href={`${lp}/events/special`}
              className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase"
            >
              {tr(locale, 'Special Events', 'Eventi Speciali')}
            </Link>
            <Link
              href={`${lp}/events/best`}
              className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase"
            >
              {tr(locale, 'Best 6 Clubs', 'I 6 Migliori Club')}
            </Link>
            <Link
              href={`${lp}/football-afterparties`}
              className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase"
            >
              {tr(locale, 'San Siro Afterparties', 'Dopo-Partita San Siro')}
            </Link>
          </div>
        </section>

        {/* Events by day */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {weekItems.length === 0 ? (
            <div className="py-24 text-center border border-white/10 rounded-xl bg-white/[0.02]">
              <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-white/60 mb-2">
                {tr(locale, 'Weekly Club Programming Active', 'Programmazione Settimanale Club Attiva')}
              </h3>
              <p className="text-white/40 text-sm mb-6">
                {tr(
                  locale,
                  'Discover the 6 Priority Clubs open every week below.',
                  'Scopri qui sotto i 6 Club Prioritari sempre aperti questa settimana.',
                )}
              </p>
              <Link
                href={`${lp}/events/best`}
                className="inline-flex px-6 py-3 rounded-full border border-champagne/40 text-champagne text-sm hover:bg-champagne hover:text-black transition-colors"
              >
                {tr(locale, 'Best Clubs →', 'I Migliori Club →')}
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {orderedDays.map((dow) => {
                const dayEvents = byDay[dow];
                const dayOffset = dow === 0 ? 6 : dow - 1;
                const dayDate = new Date(`${romeDayKeyOffset(-daysSinceMonday + dayOffset)}T12:00:00Z`);
                const dayName = isIt ? DAYS_IT[dow] : DAYS_EN[dow];
                const dateStr = dayDate.toLocaleDateString(isIt ? 'it-IT' : 'en-US', {
                  day: 'numeric',
                  month: 'long',
                  timeZone: 'Europe/Rome',
                });
                const isToday = romeDayKey(dayDate.toISOString()) === todayKey;

                return (
                  <div key={dow}>
                    <div className="flex items-center gap-4 mb-6">
                      <div>
                        <h2 className="font-serif text-2xl text-white inline">{dayName}</h2>
                        {isToday && (
                          <span className="ml-3 text-[9px] font-bold uppercase tracking-wider text-black bg-champagne px-2 py-0.5 rounded align-middle">
                            {tr(locale, 'Today', 'Oggi')}
                          </span>
                        )}
                      </div>
                      <span className="text-white/30 text-xs font-mono">{dateStr}</span>
                      <div className="flex-grow h-px bg-white/8" />
                      <span className="text-white/30 text-xs">{dayEvents.length}</span>
                    </div>
                    <div className="space-y-4">
                      {dayEvents.map(({ event, venue }) => {
                        const title = getLocalizedText(event.localizedContent.title, locale);
                        const slug = getLocalizedText(event.localizedContent.slug, locale);
                        const venueName = getLocalizedText(venue.localizedContent.name, locale);
                        const timeStr = new Intl.DateTimeFormat(locale, {
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: 'Europe/Rome',
                        }).format(new Date(event.dateISO));
                        const genre = event.genre[0]?.replace(/_/g, ' ') ?? '';

                        return (
                          <Link
                            key={event.id}
                            href={`${lp}/events/${slug}`}
                            className="group flex flex-col sm:flex-row bg-white/[0.03] rounded-lg overflow-hidden border border-white/5 hover:border-champagne/30 transition-all duration-300"
                          >
                            <div className="sm:w-[200px] h-36 sm:h-auto relative shrink-0">
                              <Image
                                src={event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
                                alt={title}
                                fill
                                sizes="(max-width: 640px) 100vw, 200px"
                                quality={85}
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#131009] via-[#131009]/40 to-transparent" />
                              {event.isSpecial && (
                                <span className="absolute top-3 left-3 bg-champagne text-black text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                  {tr(locale, 'Special', 'Speciale')}
                                </span>
                              )}
                              {event.isTrending && !event.isSpecial && (
                                <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider border border-white/20">
                                  Trending
                                </span>
                              )}
                            </div>
                            <div className="p-5 flex flex-col justify-center flex-grow">
                              <div className="flex items-center gap-2 text-champagne mb-2">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="font-mono text-xs">{timeStr}</span>
                                <span className="text-white/20 text-xs">·</span>
                                <span className="text-white/40 text-xs uppercase tracking-wider">{genre}</span>
                              </div>
                              <h3 className="font-serif text-xl text-white group-hover:text-champagne transition-colors leading-tight mb-2">
                                {title}
                              </h3>
                              <div className="flex items-center gap-1.5 text-white/40">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="text-sm">{venueName}</span>
                              </div>
                              {event.pricing.entry !== null && event.pricing.entry > 0 && (
                                <p className="text-white/30 text-xs mt-2">
                                  {tr(locale, 'Entry', 'Ingresso')} €{event.pricing.entry}
                                </p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Dove Ballare Questa Settimana nei 6 Club Prioritari */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
          <div className="mb-8">
            <p className="font-sans text-champagne text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
              {tr(
                locale,
                'OFFICIAL PRIORITY ORDER · REAL OPERATING HOURS',
                'ORDINE UFFICIALE DI PRIORITÀ · ORARI REALI VERIFICATI',
              )}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-3">
              {tr(
                locale,
                'Where to Dance This Week in Milan’s 6 Priority Clubs (Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic)',
                'Dove Ballare Questa Settimana nei 6 Club Prioritari (Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic)',
              )}
            </h2>
            <p className="text-white/60 text-sm sm:text-base">
              {tr(
                locale,
                'Verified schedules: Royal Aperitivo 19:30–22:30, Guestlist Cut-Off 00:30–01:00, and Clubbing 23:30–05:00.',
                'Orari reali verificati: Royal Aperitivo 19:30–22:30, Cut-Off Liste 00:30–01:00 e Clubbing 23:30–05:00.',
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PRIORITY_SIX_WEEK.map((club) => (
              <div
                key={club.slug}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between hover:border-champagne/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-champagne text-black text-[10px] font-bold uppercase tracking-wider">
                      #{club.rank} {tr(locale, 'Priority', 'Priorità')}
                    </span>
                    <span className="text-xs text-champagne/80 font-mono">
                      {isIt ? club.scheduleIt : club.scheduleEn}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-white font-bold mb-1">{club.name}</h3>
                  <p className="text-xs text-white/50 mb-3">{club.zone}</p>
                  <p className="text-xs text-champagne font-mono mb-2">
                    {isIt ? club.hoursIt : club.hoursEn}
                  </p>
                  <p className="text-xs text-white/75 mb-4">{isIt ? club.pricesIt : club.pricesEn}</p>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <Link
                    href={`${lp}/clubs/${club.slug}`}
                    className="text-xs font-semibold text-white/80 hover:text-champagne transition-colors"
                  >
                    {tr(locale, 'Club Guide →', 'Scheda Club →')}
                  </Link>
                  <a
                    href={`https://wa.me/393519127047?text=${encodeURIComponent(
                      isIt
                        ? `Ciao! Vorrei prenotare per questa settimana da ${club.name} a Milano.`
                        : `Hi! I want to book for this week at ${club.name} in Milan.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto px-4 py-2 rounded-full bg-champagne text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    WhatsApp +39 351 912 7047
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Modules */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <WeeklyNightlifeNavigator locale={locale} />
          <VipQuoteCalculator locale={locale} />
        </div>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-champagne/20 bg-champagne/[0.04] p-8 text-center">
            <h2 className="font-serif text-2xl text-white mb-3">
              {tr(locale, 'Book for This Week in Milan', 'Prenota per Questa Settimana a Milano')}
            </h2>
            <p className="text-white/50 text-sm mb-6">
              {tr(
                locale,
                'VIP table, QR guestlist or bottles — we reply in 10 minutes at +39 351 912 7047 or concierge@nightlifemilan.com.',
                'Tavolo VIP, lista QR o bottiglie — rispondiamo in 10 minuti al +39 351 912 7047 o concierge@nightlifemilan.com.',
              )}
            </p>
            <a
              href={`https://wa.me/393519127047?text=${encodeURIComponent(
                tr(locale, 'Hi! I want to book for this week in Milan.', 'Ciao! Vorrei prenotare per questa settimana a Milano.'),
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-champagne text-black font-bold rounded-full hover:bg-white transition-colors uppercase tracking-wider text-sm"
            >
              WhatsApp +39 351 912 7047
            </a>
          </div>
        </section>
              <OctoberEntry locale={locale} />
        <EditorialPageSections locale={locale as LocaleCode} path={`${lp}/events/this-week`} />
      </main>
    </>
  );
}
