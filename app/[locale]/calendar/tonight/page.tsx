import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, canonicalPageUrl, localePrefix } from '@/lib/i18n/locales';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { getAllCalendarEvents, romeDayKey, romeDayKeyOffset } from '@/lib/calendarEvents';
import { generateEventListSchema, jsonLdString } from '@/lib/seo';
import type { Event, Venue } from '@/lib/types';
import { getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';
import { WeeklyNightlifeNavigator, VipQuoteCalculator } from '@/components/NightlifeExpansionModules';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

function currentTimestamp() {
  return Date.now();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = tr(
    locale,
    `Events Tonight in Milan (Autumn/Winter 2026 & NYE 2027) | Nightlife Milan`,
    `Eventi di Stasera a Milano (Autunno/Inverno 2026 & Capodanno 2027) | Nightlife Milan`,
  );
  const description = tr(
    locale,
    `Discover the best events, parties, and nights out happening tonight in Milan (Autumn/Winter 2026 & NYE 2027): Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop & Repvblic. WhatsApp +39 351 912 7047.`,
    `Scopri i migliori eventi, party e serate in programma stasera a Milano (Autunno/Inverno 2026 & Capodanno 2027): Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop e Repvblic. WhatsApp +39 351 912 7047.`,
  );

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = canonicalPageUrl(baseUrl, locale, '/calendar/tonight');

  const isIt = locale === 'it';
  const ogImage = `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`;

  return {
    title,
    description,
    keywords: isIt
      ? [
          'eventi stasera milano',
          'cosa fare stasera milano',
          'club aperto stasera milano',
          'serate stasera milano autunno inverno 2026',
          'capodanno 2027 milano discoteche',
        ]
      : [
          'events tonight milan',
          'what to do tonight milan',
          'clubs open tonight milan',
          'parties tonight milan autumn winter 2026',
          'nye 2027 milan clubs',
        ],
    robots: { index: false, follow: true },
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/calendar/tonight'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: tr(locale, 'Events tonight Milan', 'Eventi stasera Milano') }],
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

const PRIORITY_SIX_TONIGHT = [
  {
    rank: 1,
    name: 'Just Me Milano',
    slug: 'just-me-milano',
    zone: 'Parco Sempione (Torre Branca)',
    daysIt: 'Aperto 7 sere su 7 (Lun – Dom)',
    daysEn: 'Open 7 nights a week (Mon – Sun)',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 00:30 · Clubbing 23:30–05:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:30 · Clubbing 23:30–05:00',
    priceIt: 'Royal Aperitivo 20–30€ · Tavoli VIP da 350–500€',
    priceEn: 'Royal Aperitivo €20–30 · VIP Tables from €350–500',
  },
  {
    rank: 2,
    name: 'Pineta Club Milano',
    slug: 'pineta-club-milano',
    zone: 'Corso Como / Via Messina 38',
    daysIt: 'Venerdì, Sabato & Prefestivi',
    daysEn: 'Friday, Saturday & Pre-Holidays',
    hoursIt: 'Aperitivo Cantato 19:30–22:30 · Cut-Off Liste 00:45 · Clubbing 23:30–05:00',
    hoursEn: 'Singing Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:45 · Clubbing 23:30–05:00',
    priceIt: 'Buffet Cantato 20–25€ · Tavoli VIP 300–600€',
    priceEn: 'Singing Buffet €20–25 · VIP Tables €300–600',
  },
  {
    rank: 3,
    name: 'Aria Club Milano',
    slug: 'aria-club-milano',
    zone: 'San Siro · Piazzale dello Sport 14 (150m Stadio)',
    daysIt: 'Giovedì, Venerdì, Sabato & Dopo-Partita San Siro',
    daysEn: 'Thursday, Friday, Saturday & San Siro Matchdays',
    hoursIt: 'Aperitivo 19:30–22:30 · Cut-Off Liste 01:00 · Clubbing 23:30–05:00',
    hoursEn: 'Aperitivo 19:30–22:30 · Guestlist Cut-Off 01:00 · Clubbing 23:30–05:00',
    priceIt: 'Aperitivo 15–25€ · Tavoli Pista/Privé da 250€',
    priceEn: 'Aperitivo €15–25 · Dancefloor/Privé Tables from €250',
  },
  {
    rank: 4,
    name: '55 Milano (FiftyFive)',
    slug: '55-milano',
    zone: 'Arco della Pace / Via Piero della Francesca 55',
    daysIt: 'Martedì – Domenica (Apericena XL, Dinner Show & The Wall)',
    daysEn: 'Tuesday – Sunday (XXL Apericena, Dinner Show & The Wall)',
    hoursIt: 'Apericena 19:30–22:30 · Cut-Off Liste 00:45 · Clubbing 23:30–04:30',
    hoursEn: 'Apericena 19:30–22:30 · Guestlist Cut-Off 00:45 · Clubbing 23:30–04:30',
    priceIt: 'Apericena 20–30€ · Dinner Show 50€ · Tavoli da 250€',
    priceEn: 'Apericena €20–30 · Dinner Show €50 · Tables from €250',
  },
  {
    rank: 5,
    name: 'Voya Rooftop Milan',
    slug: 'voya-rooftop-milan',
    zone: 'Isola / Portello — 20° Piano Vista Skyline',
    daysIt: 'Martedì – Domenica (Sunset & Sky Clubbing)',
    daysEn: 'Tuesday – Sunday (Sunset & Sky Clubbing)',
    hoursIt: 'Sunset Aperitivo 19:30–22:30 · Cut-Off Liste 00:30 · Clubbing 23:30–04:00',
    hoursEn: 'Sunset Aperitivo 19:30–22:30 · Guestlist Cut-Off 00:30 · Clubbing 23:30–04:00',
    priceIt: 'Aperitivo Panoramico 20–30€ · Tavoli Vetrata da 250–350€',
    priceEn: 'Panoramic Aperitivo €20–30 · Window Tables from €250–350',
  },
  {
    rank: 6,
    name: 'REPVBLIC Milano',
    slug: 'repvblic-milano',
    zone: 'Piazza della Repubblica, 12 · Porta Nuova',
    daysIt: 'Lunedì (Dirty Monday), Venerdì & Sabato',
    daysEn: 'Monday (Dirty Monday), Friday & Saturday',
    hoursIt: 'Ingresso 23:30 · Cut-Off Liste 01:00 · Clubbing 23:30–05:00',
    hoursEn: 'Doors 23:30 · Guestlist Cut-Off 01:00 · Clubbing 23:30–05:00',
    priceIt: 'Tavoli Pista da 300€ · Privé da 500€',
    priceEn: 'Dancefloor Tables from €300 · Privé from €500',
  },
];

export default async function TonightPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const renderedAtMs = currentTimestamp();

  const allItems = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale);
  const todayKey = romeDayKeyOffset(0);
  const tomorrowKey = romeDayKeyOffset(1);

  const items = allItems.filter(({ event }) => romeDayKey(event.dateISO) === todayKey);
  const tomorrowItems = allItems.filter(({ event }) => romeDayKey(event.dateISO) === tomorrowKey);

  const getMilanHour = (dateISO: string) => {
    return parseInt(
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: 'Europe/Rome',
      }).format(new Date(dateISO)),
      10,
    );
  };

  const categorize = (group: { event: Event; venue: Venue }[]) => ({
    aperitivo: group.filter((item) => {
      const hour = getMilanHour(item.event.dateISO);
      return hour >= 19 && hour <= 22;
    }),
    primeTime: group.filter((item) => {
      const hour = getMilanHour(item.event.dateISO);
      return hour === 23 || hour === 0 || hour === 1;
    }),
    afterHours: group.filter((item) => {
      const hour = getMilanHour(item.event.dateISO);
      return hour >= 2 && hour < 19;
    }),
  });

  const { aperitivo: aperitivoEvents, primeTime: primeTimeEvents, afterHours: afterHoursEvents } = categorize(items);
  const { aperitivo: tomorrowAperitivo, primeTime: tomorrowPrimeTime, afterHours: tomorrowAfterHours } = categorize(tomorrowItems);

  const hasEvents = items.length > 0;
  const hasTomorrowEvents = tomorrowItems.length > 0;

  const lp = localePrefix(locale);
  const calendarItems = [...items, ...tomorrowItems];
  const eventListSchema =
    calendarItems.length > 0
      ? generateEventListSchema(
          calendarItems,
          locale,
          tr(locale, 'Milan Events — Tonight & Tomorrow', 'Eventi Milano — Stasera e Domani'),
        )
      : null;

  const t = {
    title: tr(locale, `The Timeline — Tonight in Milan`, `La Timeline — Stasera a Milano`),
    intro: tr(
      locale,
      `Curated events happening tonight in Milan for Autumn/Winter 2026 & NYE 2027.`,
      `Eventi curati in programma stasera a Milano per Autunno/Inverno 2026 & Capodanno 2027.`,
    ),
    today: tr(locale, 'Today', 'Oggi'),
    tomorrow: tr(locale, 'Tomorrow', 'Domani'),
    weekend: tr(locale, 'Weekend', 'Weekend'),
    emptyTitle: tr(locale, 'Direct Concierge Desk Open Tonight', 'Desk Concierge Attivo Stasera'),
    emptyDesc: tr(
      locale,
      'Just Me Milano is open 7/7! Check the 6 Priority Clubs below or contact WhatsApp +39 351 912 7047.',
      'Just Me Milano è aperto 7/7! Consulta i 6 Club Prioritari qui sotto o scrivi su WhatsApp +39 351 912 7047.',
    ),
  };

  return (
    <>
      {eventListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(eventListSchema) }} />
      )}
      <main className="flex-1 bg-[#050505] w-full pt-20 pb-20">
        {/* Header */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">{t.title}</h1>
          <p className="text-xl text-white/50 mb-8">{t.intro}</p>

          {/* AI Trafiletto */}
          <div className="mb-10 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
            <p className="font-sans text-white/75 text-sm leading-relaxed">
              {tr(
                locale,
                'Tonight in Milan: Royal Aperitivo 19:30–22:30 (1. Just Me 7/7, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop), Guestlist Cut-Off 00:30–01:00, and Clubbing 23:30–05:00 (including 6. Repvblic). Book VIP table via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com — reply in 10 minutes.',
                'Stasera a Milano: Royal Aperitivo 19:30–22:30 (1. Just Me 7/7, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop), Cut-Off Liste 00:30–01:00 e Clubbing 23:30–05:00 (incluso 6. Repvblic). Prenota tavolo VIP su WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com — risposta in 10 minuti.',
              )}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              tr(locale, 'Tonight Milan', 'Stasera Milano'),
              tr(locale, 'Aperitivo 19:30–22:30', 'Aperitivo 19:30–22:30'),
              tr(locale, 'Milan Clubs Tonight', 'Club Milano'),
              'VIP Tables',
              tr(locale, 'Autumn/Winter 2026 & NYE 2027', 'Autunno/Inverno 2026 & Capodanno 2027'),
              tr(locale, 'Table Booking', 'Prenotazione Tavolo'),
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Interactive Calendar Selector */}
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            <Link
              href={`${lp}/calendar/tonight`}
              className="flex-shrink-0 px-8 py-3 rounded-full bg-champagne text-black font-medium tracking-wider uppercase text-sm"
            >
              {t.today}
            </Link>
            <a
              href="#tomorrow"
              className="flex-shrink-0 px-8 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {t.tomorrow}
            </a>
            <Link
              href={`${lp}/calendar/this-week`}
              className="flex-shrink-0 px-8 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {tr(locale, 'Full Week', 'Tutta la Settimana')}
            </Link>
          </div>
        </section>

        {/* Timeline View — Stasera */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!hasEvents ? (
            <div className="py-20 text-center border border-white/10 rounded-lg bg-white/[0.03]">
              <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-white mb-2">{t.emptyTitle}</h3>
              <p className="text-white/40">{t.emptyDesc}</p>
            </div>
          ) : (
            <div className="space-y-16">
              {aperitivoEvents.length > 0 && (
                <div>
                  <div className="flex items-center space-x-4 mb-8">
                    <h2 className="font-serif text-3xl text-white">Aperitivo</h2>
                    <span className="text-white/40 font-mono text-sm">19:30 - 22:30</span>
                    <div className="flex-grow h-px bg-white/10"></div>
                  </div>
                  <div className="space-y-6">
                    {aperitivoEvents.map((item) => (
                      <EventCard key={item.event.id} item={item} locale={locale} renderedAtMs={renderedAtMs} />
                    ))}
                  </div>
                </div>
              )}

              {primeTimeEvents.length > 0 && (
                <div>
                  <div className="flex items-center space-x-4 mb-8">
                    <h2 className="font-serif text-3xl text-white">Prime Time</h2>
                    <span className="text-white/40 font-mono text-sm">23:30 - 01:00</span>
                    <div className="flex-grow h-px bg-white/10"></div>
                  </div>
                  <div className="space-y-6">
                    {primeTimeEvents.map((item) => (
                      <EventCard key={item.event.id} item={item} locale={locale} renderedAtMs={renderedAtMs} />
                    ))}
                  </div>
                </div>
              )}

              {afterHoursEvents.length > 0 && (
                <div>
                  <div className="flex items-center space-x-4 mb-8">
                    <h2 className="font-serif text-3xl text-white">After Hours</h2>
                    <span className="text-white/40 font-mono text-sm">02:00 - 05:00</span>
                    <div className="flex-grow h-px bg-white/10"></div>
                  </div>
                  <div className="space-y-6">
                    {afterHoursEvents.map((item) => (
                      <EventCard key={item.event.id} item={item} locale={locale} renderedAtMs={renderedAtMs} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Timeline View — Domani */}
        <section id="tomorrow" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-white/10 scroll-mt-24">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-champagne tracking-tight mb-10">{t.tomorrow}</h2>
          {!hasTomorrowEvents ? (
            <div className="py-20 text-center border border-white/10 rounded-lg bg-white/[0.03]">
              <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-white mb-2">{t.emptyTitle}</h3>
              <p className="text-white/40">{t.emptyDesc}</p>
            </div>
          ) : (
            <div className="space-y-16">
              {tomorrowAperitivo.length > 0 && (
                <div>
                  <div className="flex items-center space-x-4 mb-8">
                    <h3 className="font-serif text-3xl text-white">Aperitivo</h3>
                    <span className="text-white/40 font-mono text-sm">19:30 - 22:30</span>
                    <div className="flex-grow h-px bg-white/10"></div>
                  </div>
                  <div className="space-y-6">
                    {tomorrowAperitivo.map((item) => (
                      <EventCard key={item.event.id} item={item} locale={locale} renderedAtMs={renderedAtMs} />
                    ))}
                  </div>
                </div>
              )}

              {tomorrowPrimeTime.length > 0 && (
                <div>
                  <div className="flex items-center space-x-4 mb-8">
                    <h3 className="font-serif text-3xl text-white">Prime Time</h3>
                    <span className="text-white/40 font-mono text-sm">23:30 - 01:00</span>
                    <div className="flex-grow h-px bg-white/10"></div>
                  </div>
                  <div className="space-y-6">
                    {tomorrowPrimeTime.map((item) => (
                      <EventCard key={item.event.id} item={item} locale={locale} renderedAtMs={renderedAtMs} />
                    ))}
                  </div>
                </div>
              )}

              {tomorrowAfterHours.length > 0 && (
                <div>
                  <div className="flex items-center space-x-4 mb-8">
                    <h3 className="font-serif text-3xl text-white">After Hours</h3>
                    <span className="text-white/40 font-mono text-sm">02:00 - 05:00</span>
                    <div className="flex-grow h-px bg-white/10"></div>
                  </div>
                  <div className="space-y-6">
                    {tomorrowAfterHours.map((item) => (
                      <EventCard key={item.event.id} item={item} locale={locale} renderedAtMs={renderedAtMs} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Dove Ballare Stasera nei 6 Club Prioritari */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-14 border-t border-white/10">
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
                'Where to Dance Tonight in Milan’s 6 Priority Clubs (Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic)',
                'Dove Ballare Stasera nei 6 Club Prioritari (Just Me 7/7, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic)',
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
            {PRIORITY_SIX_TONIGHT.map((club) => (
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
                      {isIt ? club.daysIt : club.daysEn}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-white font-bold mb-1">{club.name}</h3>
                  <p className="text-xs text-white/50 mb-3">{club.zone}</p>
                  <p className="text-xs text-champagne font-mono mb-2">
                    {isIt ? club.hoursIt : club.hoursEn}
                  </p>
                  <p className="text-xs text-white/75 mb-4">{isIt ? club.priceIt : club.priceEn}</p>
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
                        ? `Ciao! Vorrei prenotare per stasera da ${club.name} a Milano.`
                        : `Hi! I want to book for tonight at ${club.name} in Milan.`,
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
      </main>
    </>
  );
}

function EventCard({ item, locale, renderedAtMs }: { item: { event: Event; venue: Venue }; locale: string; renderedAtMs: number }) {
  const { event, venue } = item;
  const eventDate = new Date(event.dateISO);
  const diffHours = (eventDate.getTime() - renderedAtMs) / (1000 * 60 * 60);
  const isLive = diffHours > 0 && diffHours <= 2;

  const timeStr = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Rome',
  }).format(eventDate);

  const tLoc = event.localizedContent.title as Record<string, string | undefined>;
  const vLoc = venue.localizedContent.name as Record<string, string | undefined>;
  const title = tLoc[locale] || tLoc.en || '';
  const venueName = vLoc[locale] || vLoc.en || '';
  const category = event.genre[0]?.replace(/_/g, ' ') ?? '';

  return (
    <div className="group relative flex flex-col md:flex-row bg-white/[0.03] rounded-lg overflow-hidden border border-white/5 hover:border-champagne/30 transition-colors duration-500">
      <div className="w-full md:w-1/3 h-48 md:h-auto relative">
        <Image
          src={event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={92}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050505] via-transparent to-transparent" />

        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase">
          {category}
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col justify-center flex-grow relative">
        {isLive && (
          <div className="absolute top-6 right-6 flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-500 text-xs font-bold tracking-widest uppercase">Live Now</span>
          </div>
        )}

        <div className="flex items-center space-x-2 text-champagne mb-3">
          <Clock className="w-4 h-4" />
          <span className="font-mono text-sm">{timeStr}</span>
        </div>

        <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-champagne transition-colors">{title}</h3>

        <div className="flex items-center space-x-2 text-white/40">
          <MapPin className="w-4 h-4" />
          <span className="text-sm tracking-wide">{venueName}</span>
        </div>
      </div>
    </div>
  );
}
