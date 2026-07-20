import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { getAllCalendarEvents, romeDayKey, romeDayKeyOffset } from '@/lib/calendarEvents';
import { generateEventListSchema, jsonLdString } from '@/lib/seo';
import type { Event, Venue } from '@/lib/types';
import { getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

function currentTimestamp() {
  return Date.now();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const title = tr(locale, `Events Tonight in Milan | Nightlife Milan`, `Eventi di Stasera a Milano | Nightlife Milan`);
  const description = tr(locale, `Discover the best events, parties, and nights out happening tonight in Milan. Book your table or get on the guestlist for the most exclusive clubs.`, `Scopri i migliori eventi, party e serate in programma stasera a Milano. Prenota il tuo tavolo o mettiti in lista per i club più esclusivi.`);
  
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/calendar/tonight`;

  const isIt = locale === 'it';
  const ogImage = `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`;

  return {
    title,
    description,
    keywords: isIt
      ? ['eventi stasera milano', 'cosa fare stasera milano', 'club aperto stasera milano', 'serate stasera milano']
      : ['events tonight milan', 'what to do tonight milan', 'clubs open tonight milan', 'parties tonight milan'],
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

export default async function TonightPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const renderedAtMs = currentTimestamp();

  // FASE C1/C2 (piano 2026-07-09-fix-calendar.md): sorgente dati unificata
  // (statici + Eventbrite/Xceed reali), confini di giorno nel fuso di Roma —
  // MAI i confini UTC (un evento all'1:30 di notte italiana finiva nel
  // giorno sbagliato con Date.UTC).
  const allItems = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale);
  const todayKey = romeDayKeyOffset(0);
  const tomorrowKey = romeDayKeyOffset(1);

  const items = allItems.filter(({ event }) => romeDayKey(event.dateISO) === todayKey);
  const tomorrowItems = allItems.filter(({ event }) => romeDayKey(event.dateISO) === tomorrowKey);

  // Categorize events by time slot (using Milan local time)
  // Aperitivo (19:00 - 22:00)
  // Prime Time (23:00 - 01:00)
  // After Hours (02:00+)
  const getMilanHour = (dateISO: string) => {
    return parseInt(new Intl.DateTimeFormat('en-US', {
      hour: 'numeric', hour12: false, timeZone: 'Europe/Rome',
    }).format(new Date(dateISO)), 10);
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
  // Event completi via il generatore condiviso (lib/seo.ts): titoli e URL nel
  // locale reale della pagina, immagini/geo inclusi, niente endDate fabbricato.
  const calendarItems = [...items, ...tomorrowItems];
  const eventListSchema = calendarItems.length > 0
    ? generateEventListSchema(calendarItems, locale, tr(locale, 'Milan Events — Tonight & Tomorrow', 'Eventi Milano — Stasera e Domani'))
    : null;

  const t = {
    title: tr(locale, `The Timeline`, `La Timeline`),
    intro: tr(locale, `Curated events happening tonight in Milan.`, `Eventi curati in programma stasera a Milano.`),
    today: tr(locale, 'Today', 'Oggi'),
    tomorrow: tr(locale, 'Tomorrow', 'Domani'),
    weekend: tr(locale, 'Weekend', 'Weekend'),
    emptyTitle: tr(locale, 'The night is resting.', 'La notte riposa.'),
    emptyDesc: tr(locale, 'Check back for the weekend.', 'Torna a controllare per il weekend.'),
  };

  return (
    <>
      {eventListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(eventListSchema) }} />
      )}
    <main className="flex-1 bg-[#131009] w-full pt-20 pb-20">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
          {t.title}
        </h1>
        <p className="text-xl text-white/40 mb-8">
          {t.intro}
        </p>

        {/* AI Trafiletto */}
        <div className="mb-10 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
          <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
          <p className="font-sans text-white/70 text-sm leading-relaxed">
            {tr(locale, 'Tonight in Milan: aperitivo 19:00–22:00 (Pineta, Voya Rooftop, Navigli bars), clubs from 22:30 (Just Me, Play Club, Magazzini). Book VIP table via WhatsApp +39 351 912 7047 — reply in 10 minutes.', 'Stasera a Milano: aperitivo dalle 19:00–22:00 (Pineta, Voya Rooftop, Navigli), club dalle 22:30 (Just Me, Play Club, Magazzini). Prenota tavolo VIP via WhatsApp +39 351 912 7047 — risposta in 10 minuti.')}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            tr(locale, 'Tonight Milan', 'Stasera Milano'),
            tr(locale, 'Aperitivo Tonight', 'Aperitivo'),
            tr(locale, 'Milan Clubs Tonight', 'Club Milano'),
            'VIP Tables',
            tr(locale, 'Milan Events', 'Serate Milano'),
            tr(locale, 'Table Booking', 'Prenotazione Tavolo'),
          ].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        {/* Interactive Calendar Selector — FASE C2: 3 bottoni corretti
            (prima "Domani" puntava a /calendar/this-week, e mancava il
            bottone per tutta la settimana). */}
        {(() => {
          const lp = localePrefix(locale);
          return (
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
          );
        })()}
      </section>

      {/* Timeline View — Stasera */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hasEvents ? (
          <div className="py-20 text-center border border-white/10 rounded-lg bg-white/[0.03]">
            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-white mb-2">{t.emptyTitle}</h3>
            <p className="text-white/40">{t.emptyDesc}</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Aperitivo Section */}
            {aperitivoEvents.length > 0 && (
              <div>
                <div className="flex items-center space-x-4 mb-8">
                  <h2 className="font-serif text-3xl text-white">Aperitivo</h2>
                  <span className="text-white/40 font-mono text-sm">19:00 - 22:00</span>
                  <div className="flex-grow h-px bg-white/10"></div>
                </div>
                <div className="space-y-6">
                  {aperitivoEvents.map((item) => (
                    <EventCard key={item.event.id} item={item} locale={locale} renderedAtMs={renderedAtMs} />
                  ))}
                </div>
              </div>
            )}

            {/* Prime Time Section */}
            {primeTimeEvents.length > 0 && (
              <div>
                <div className="flex items-center space-x-4 mb-8">
                  <h2 className="font-serif text-3xl text-white">Prime Time</h2>
                  <span className="text-white/40 font-mono text-sm">23:00 - 01:00</span>
                  <div className="flex-grow h-px bg-white/10"></div>
                </div>
                <div className="space-y-6">
                  {primeTimeEvents.map((item) => (
                    <EventCard key={item.event.id} item={item} locale={locale} renderedAtMs={renderedAtMs} />
                  ))}
                </div>
              </div>
            )}

            {/* After Hours Section */}
            {afterHoursEvents.length > 0 && (
              <div>
                <div className="flex items-center space-x-4 mb-8">
                  <h2 className="font-serif text-3xl text-white">After Hours</h2>
                  <span className="text-white/40 font-mono text-sm">02:00+</span>
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

      {/* Timeline View — Domani (FASE C2: mancava del tutto) */}
      <section id="tomorrow" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-16 border-t border-white/10 scroll-mt-24">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-champagne tracking-tight mb-10">
          {t.tomorrow}
        </h2>
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
                  <span className="text-white/40 font-mono text-sm">19:00 - 22:00</span>
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
                  <span className="text-white/40 font-mono text-sm">23:00 - 01:00</span>
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
                  <span className="text-white/40 font-mono text-sm">02:00+</span>
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
    </main>
    </>
  );
}

function EventCard({ item, locale, renderedAtMs }: { item: { event: Event; venue: Venue }, locale: string; renderedAtMs: number }) {
  const { event, venue } = item;
  const eventDate = new Date(event.dateISO);
  const diffHours = (eventDate.getTime() - renderedAtMs) / (1000 * 60 * 60);
  const isLive = diffHours > 0 && diffHours <= 2;

  const timeStr = new Intl.DateTimeFormat(locale, {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome',
  }).format(eventDate);

  // locale-aware su tutte le lingue (prima forzato a en/it → eventi in inglese su /es, ecc.)
  const tLoc = event.localizedContent.title as Record<string, string | undefined>;
  const vLoc = venue.localizedContent.name as Record<string, string | undefined>;
  const title = tLoc[locale] || tLoc.en || '';
  const venueName = vLoc[locale] || vLoc.en || '';
  const category = event.genre[0]?.replace(/_/g, ' ') ?? '';

  return (
    <div className="group relative flex flex-col md:flex-row bg-white/[0.03] rounded-lg overflow-hidden border border-white/5 hover:border-champagne/30 transition-colors duration-500">
      {/* Image */}
      <div className="w-full md:w-1/3 h-48 md:h-auto relative">
        <Image
          src={event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={85}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#131009] via-transparent to-transparent" />

        {/* Category Tag */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex flex-col justify-center flex-grow relative">
        {/* Urgency Badge */}
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

        <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-champagne transition-colors">
          {title}
        </h3>

        <div className="flex items-center space-x-2 text-white/40">
          <MapPin className="w-4 h-4" />
          <span className="text-sm tracking-wide">{venueName}</span>
        </div>
      </div>
    </div>
  );
}
