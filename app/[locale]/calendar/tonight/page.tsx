import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { mockEvents, mockVenues } from '@/lib/data';
import type { Event, Venue } from '@/lib/types';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const title = locale === 'it' ? `Eventi di Stasera a Milano | Nightlife Milan` : `Events Tonight in Milan | Nightlife Milan`;
  const description = locale === 'it' 
    ? `Scopri i migliori eventi, party e serate in programma stasera a Milano. Prenota il tuo tavolo o mettiti in lista per i club più esclusivi.` 
    : `Discover the best events, parties, and nights out happening tonight in Milan. Book your table or get on the guestlist for the most exclusive clubs.`;
  
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${locale === 'it' ? '/it' : ''}/calendar/tonight`;

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
      languages: {
        'en': `${baseUrl}/calendar/tonight`,
        'it': `${baseUrl}/it/calendar/tonight`,
        'x-default': `${baseUrl}/calendar/tonight`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: isIt ? 'Eventi stasera Milano' : 'Events tonight Milan' }],
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

  // Filter events for tonight using dynamic date
  const now = new Date();
  const todayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
  const todayEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));

  const tonightEvents = mockEvents.filter(e => {
    const eventDate = new Date(e.dateISO);
    return eventDate >= todayStart && eventDate <= todayEnd;
  });

  const items = tonightEvents.map(event => {
    const venue = mockVenues.find(v => v.id === event.venueId)!;
    return { event, venue };
  });

  // Categorize events by time slot (using Milan local time)
  // Aperitivo (19:00 - 22:00)
  // Prime Time (23:00 - 01:00)
  // After Hours (02:00+)
  const getMilanHour = (dateISO: string) => {
    return parseInt(new Intl.DateTimeFormat('en-US', {
      hour: 'numeric', hour12: false, timeZone: 'Europe/Rome',
    }).format(new Date(dateISO)), 10);
  };

  const aperitivoEvents = items.filter(item => {
    const hour = getMilanHour(item.event.dateISO);
    return hour >= 19 && hour <= 22;
  });

  const primeTimeEvents = items.filter(item => {
    const hour = getMilanHour(item.event.dateISO);
    return hour === 23 || hour === 0 || hour === 1;
  });

  const afterHoursEvents = items.filter(item => {
    const hour = getMilanHour(item.event.dateISO);
    return hour >= 2 && hour < 19;
  });

  const hasEvents = items.length > 0;

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const lp = locale === 'it' ? '/it' : '';
  const eventSchemas = items.map(({ event, venue }) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': event.localizedContent?.title?.en || `${venue ? venue.localizedContent?.name?.en || 'Club' : 'Club'} Milan Tonight`,
    'startDate': event.dateISO,
    'endDate': (() => { const d = new Date(event.dateISO); d.setHours(d.getHours() + 5); return d.toISOString(); })(),
    'location': venue ? {
      '@type': 'Place',
      'name': venue.localizedContent?.name?.en || 'Milan Club',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': venue.address?.streetAddress,
        'addressLocality': 'Milan',
        'addressCountry': 'IT',
      },
    } : { '@type': 'Place', 'name': 'Milan', 'address': { '@type': 'PostalAddress', 'addressLocality': 'Milan', 'addressCountry': 'IT' } },
    'organizer': { '@type': 'Organization', 'name': 'Nightlife Milan', 'url': baseUrl },
    'url': `${baseUrl}${lp}/calendar/tonight`,
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
      'url': `https://wa.me/393519127047?text=${encodeURIComponent('Hi! I want to book for tonight in Milan.')}`,
      'seller': { '@type': 'Organization', 'name': 'Nightlife Milan' },
    },
  }));

  const t = {
    title: isIt ? `La Timeline` : `The Timeline`,
    intro: isIt 
      ? `Eventi curati in programma stasera a Milano.`
      : `Curated events happening tonight in Milan.`,
    today: isIt ? 'Oggi' : 'Today',
    tomorrow: isIt ? 'Domani' : 'Tomorrow',
    weekend: isIt ? 'Weekend' : 'Weekend',
    emptyTitle: isIt ? 'La notte riposa.' : 'The night is resting.',
    emptyDesc: isIt ? 'Torna a controllare per il weekend.' : 'Check back for the weekend.',
  };

  return (
    <>
      {eventSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
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
            {isIt
              ? 'Stasera a Milano: aperitivo dalle 19:00–22:00 (Pineta, Voya Rooftop, Navigli), club dalle 22:30 (Just Me, Play Club, Magazzini). Prenota tavolo VIP via WhatsApp +39 351 912 7047 — risposta in 10 minuti.'
              : 'Tonight in Milan: aperitivo 19:00–22:00 (Pineta, Voya Rooftop, Navigli bars), clubs from 22:30 (Just Me, Play Club, Magazzini). Book VIP table via WhatsApp +39 351 912 7047 — reply in 10 minutes.'}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            isIt ? 'Stasera Milano' : 'Tonight Milan',
            isIt ? 'Aperitivo' : 'Aperitivo Tonight',
            isIt ? 'Club Milano' : 'Milan Clubs Tonight',
            'VIP Tables',
            isIt ? 'Serate Milano' : 'Milan Events',
            isIt ? 'Prenotazione Tavolo' : 'Table Booking',
          ].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        {/* Interactive Calendar Selector */}
        {(() => {
          const lp = locale === 'it' ? '/it' : '';
          return (
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              <Link
                href={`${lp}/calendar/tonight`}
                className="flex-shrink-0 px-8 py-3 rounded-full bg-champagne text-black font-medium tracking-wider uppercase text-sm"
              >
                {t.today}
              </Link>
              <Link
                href={`${lp}/calendar/this-week`}
                className="flex-shrink-0 px-8 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
              >
                {t.tomorrow}
              </Link>
            </div>
          );
        })()}
      </section>

      {/* Timeline View */}
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
                    <EventCard key={item.event.id} item={item} locale={locale} />
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
                    <EventCard key={item.event.id} item={item} locale={locale} />
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
                    <EventCard key={item.event.id} item={item} locale={locale} />
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

function EventCard({ item, locale }: { item: { event: Event; venue: Venue }, locale: string }) {
  const { event, venue } = item;
  const lang = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';

  const eventDate = new Date(event.dateISO);
  const diffHours = (eventDate.getTime() - Date.now()) / (1000 * 60 * 60);
  const isLive = diffHours > 0 && diffHours <= 2;

  const timeStr = new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-US', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome',
  }).format(eventDate);

  const title = event.localizedContent.title[lang] || event.localizedContent.title.en;
  const venueName = venue.localizedContent.name[lang] || venue.localizedContent.name.en;
  const category = event.genre[0]?.replace(/_/g, ' ') ?? '';

  return (
    <div className="group relative flex flex-col md:flex-row bg-white/[0.03] rounded-lg overflow-hidden border border-white/5 hover:border-champagne/30 transition-colors duration-500">
      {/* Image */}
      <div className="w-full md:w-1/3 h-48 md:h-auto relative">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'})` }}
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
