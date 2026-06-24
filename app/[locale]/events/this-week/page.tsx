import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, MapPin, Calendar } from 'lucide-react';
import { mockEvents, mockVenues } from '@/lib/data';
import type { Event, Venue } from '@/lib/types';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${isIt ? '/it' : ''}/events/this-week`;

  const title = isIt
    ? 'Eventi Questa Settimana a Milano 2026 | Serate della Settimana'
    : 'Events This Week in Milan 2026 | Nightlife This Week';
  const description = isIt
    ? 'Tutti gli eventi e le serate in programma questa settimana a Milano. Club, aperitivo, live music e serate speciali. Prenota il tuo posto via WhatsApp.'
    : 'All events and nights happening this week in Milan. Clubs, aperitivo, live music and special nights. Book your spot via WhatsApp.';

  return {
    title,
    description,
    keywords: isIt
      ? ['eventi questa settimana milano', 'serate settimana milano', 'cosa fare questa settimana milano', 'club milano settimana']
      : ['events this week milan', 'milan nightlife this week', 'what to do this week milan', 'clubs milan this week'],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/events/this-week`,
        'it': `${baseUrl}/it/events/this-week`,
        'x-default': `${baseUrl}/events/this-week`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`, width: 1200, height: 630 }],
    },
  };
}

const DAYS_IT = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default async function EventsThisWeekPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = isIt ? '/it' : '';

  // Week: Monday to Sunday of current week
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const weekItems = mockEvents
    .filter(e => {
      const d = new Date(e.dateISO);
      return d >= monday && d <= sunday;
    })
    .flatMap(e => {
      const venue = mockVenues.find(v => v.id === e.venueId);
      return venue ? [{ event: e, venue }] : [];
    })
    .sort((a, b) => new Date(a.event.dateISO).getTime() - new Date(b.event.dateISO).getTime());

  // Group by day of week
  const byDay: Record<number, { event: Event; venue: Venue }[]> = {};
  weekItems.forEach(item => {
    const d = new Date(item.event.dateISO);
    const dow = d.getDay();
    if (!byDay[dow]) byDay[dow] = [];
    byDay[dow].push(item);
  });

  // Order: Mon(1) Tue(2) Wed(3) Thu(4) Fri(5) Sat(6) Sun(0)
  const orderedDays = [1, 2, 3, 4, 5, 6, 0].filter(d => byDay[d]?.length > 0);

  const weekLabel = `${monday.toLocaleDateString(isIt ? 'it-IT' : 'en-US', { day: 'numeric', month: 'short' })} – ${sunday.toLocaleDateString(isIt ? 'it-IT' : 'en-US', { day: 'numeric', month: 'short' })}`;

  return (
    <main className="flex-1 bg-[#131009] w-full pt-20 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs text-white/30 flex gap-2">
          <Link href={`${lp}/`} className="hover:text-champagne transition-colors">Home</Link>
          <span>/</span>
          <Link href={`${lp}/events`} className="hover:text-champagne transition-colors">{isIt ? 'Eventi' : 'Events'}</Link>
          <span>/</span>
          <span className="text-champagne">{isIt ? 'Questa Settimana' : 'This Week'}</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-champagne/50 text-xs font-mono uppercase tracking-[0.2em]">{weekLabel}</span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-4">
          {isIt ? 'Questa Settimana' : 'This Week'}
        </h1>
        <p className="text-lg text-white/40 font-light mb-8">
          {isIt
            ? `${weekItems.length} eventi selezionati questa settimana a Milano.`
            : `${weekItems.length} curated events in Milan this week.`}
        </p>

        {/* Quick Answer */}
        <div className="mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
          <p className="text-champagne/50 text-[9px] tracking-[0.3em] uppercase mb-2">Quick Answer</p>
          <p className="text-white/70 text-sm leading-relaxed">
            {isIt
              ? 'Questa settimana a Milano: Just Me apre ogni sera (lun–dom), Pineta venerdì e sabato, Aria Club giovedì–sabato. Serate speciali con DJ internazionali nel weekend. Prenota tavolo via WhatsApp +39 351 912 7047.'
              : 'This week in Milan: Just Me opens every night (Mon–Sun), Pineta on Friday and Saturday, Aria Club Thursday–Saturday. Special nights with international DJs on the weekend. Book your table via WhatsApp +39 351 912 7047.'}
          </p>
        </div>

        {/* Nav pills */}
        <div className="flex gap-3 flex-wrap">
          <Link href={`${lp}/events/tonight`} className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase">
            {isIt ? 'Stasera' : 'Tonight'}
          </Link>
          <span className="px-6 py-2.5 rounded-full bg-champagne text-black text-sm font-medium tracking-wider uppercase">
            {isIt ? 'Questa Settimana' : 'This Week'}
          </span>
          <Link href={`${lp}/events/best`} className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase">
            {isIt ? 'I Migliori' : 'Best Events'}
          </Link>
        </div>
      </section>

      {/* Events by day */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {weekItems.length === 0 ? (
          <div className="py-24 text-center border border-white/10 rounded-xl bg-white/[0.02]">
            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-white/60 mb-2">
              {isIt ? 'Nessun evento questa settimana.' : 'No events this week.'}
            </h3>
            <p className="text-white/30 text-sm mb-6">
              {isIt ? 'Controlla i migliori club sempre aperti.' : 'Check the best clubs always open.'}
            </p>
            <Link href={`${lp}/events/best`} className="inline-flex px-6 py-3 rounded-full border border-champagne/40 text-champagne text-sm hover:bg-champagne hover:text-black transition-colors">
              {isIt ? 'I Migliori Club →' : 'Best Clubs →'}
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orderedDays.map(dow => {
              const dayEvents = byDay[dow];
              const dayDate = new Date(monday);
              dayDate.setDate(monday.getDate() + (dow === 0 ? 6 : dow - 1));
              const dayName = isIt ? DAYS_IT[dow] : DAYS_EN[dow];
              const dateStr = dayDate.toLocaleDateString(isIt ? 'it-IT' : 'en-US', {
                day: 'numeric', month: 'long', timeZone: 'Europe/Rome',
              });
              const isToday = dayDate.toDateString() === now.toDateString();

              return (
                <div key={dow}>
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <h2 className="font-serif text-2xl text-white inline">
                        {dayName}
                      </h2>
                      {isToday && (
                        <span className="ml-3 text-[9px] font-bold uppercase tracking-wider text-black bg-champagne px-2 py-0.5 rounded align-middle">
                          {isIt ? 'Oggi' : 'Today'}
                        </span>
                      )}
                    </div>
                    <span className="text-white/30 text-xs font-mono">{dateStr}</span>
                    <div className="flex-grow h-px bg-white/8" />
                    <span className="text-white/30 text-xs">{dayEvents.length}</span>
                  </div>
                  <div className="space-y-4">
                    {dayEvents.map(({ event, venue }) => {
                      const lang = (isIt ? 'it' : 'en') as 'en' | 'it';
                      const title = event.localizedContent.title[lang] || event.localizedContent.title.en;
                      const slug = event.localizedContent.slug[lang] || event.localizedContent.slug.en;
                      const venueName = venue.localizedContent.name[lang] || venue.localizedContent.name.en;
                      const timeStr = new Intl.DateTimeFormat(isIt ? 'it-IT' : 'en-US', {
                        hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome',
                      }).format(new Date(event.dateISO));
                      const genre = event.genre[0]?.replace(/_/g, ' ') ?? '';

                      return (
                        <Link
                          key={event.id}
                          href={`${lp}/events/${slug}`}
                          className="group flex flex-col sm:flex-row bg-white/[0.03] rounded-lg overflow-hidden border border-white/5 hover:border-champagne/30 transition-all duration-300"
                        >
                          <div className="sm:w-[200px] h-36 sm:h-auto relative shrink-0">
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{ backgroundImage: `url(${event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#131009] via-[#131009]/40 to-transparent" />
                            {event.isSpecial && (
                              <span className="absolute top-3 left-3 bg-champagne text-black text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                {isIt ? 'Speciale' : 'Special'}
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
                            {event.pricing.entry > 0 && (
                              <p className="text-white/30 text-xs mt-2">
                                {isIt ? 'Ingresso' : 'Entry'} €{event.pricing.entry}
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

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-champagne/20 bg-champagne/[0.04] p-8 text-center">
          <h2 className="font-serif text-2xl text-white mb-3">
            {isIt ? 'Prenota per Questa Settimana' : 'Book for This Week'}
          </h2>
          <p className="text-white/40 text-sm mb-6">
            {isIt ? 'Tavolo VIP, guestlist o bottiglie — rispondiamo in 10 minuti.' : 'VIP table, guestlist or bottles — we reply in 10 minutes.'}
          </p>
          <a
            href={`https://wa.me/393519127047?text=${encodeURIComponent(isIt ? 'Ciao! Vorrei prenotare per questa settimana a Milano.' : 'Hi! I want to book for this week in Milan.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-champagne text-black font-bold rounded-full hover:bg-white transition-colors uppercase tracking-wider text-sm"
          >
            WhatsApp +39 351 912 7047
          </a>
        </div>
      </section>
    </main>
  );
}
