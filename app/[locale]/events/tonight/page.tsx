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
  const canonical = `${baseUrl}${isIt ? '/it' : ''}/events/tonight`;

  const title = isIt
    ? 'Eventi Stasera a Milano 2026 | Cosa Fare Stasera'
    : 'Events Tonight in Milan 2026 | What to Do Tonight';
  const description = isIt
    ? 'Scopri i migliori eventi in programma stasera a Milano. Club aperti, serate speciali, aperitivo e party. Prenota tavolo VIP o guestlist via WhatsApp in 10 minuti.'
    : 'Discover the best events happening tonight in Milan. Open clubs, special nights, aperitivo and parties. Book VIP table or guestlist via WhatsApp in 10 minutes.';

  return {
    title,
    description,
    keywords: isIt
      ? ['eventi stasera milano', 'cosa fare stasera milano', 'club aperto stasera', 'serate stasera milano', 'aperitivo stasera milano']
      : ['events tonight milan', 'what to do tonight milan', 'clubs open tonight milan', 'parties tonight milan', 'aperitivo tonight milan'],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/events/tonight`,
        'it': `${baseUrl}/it/events/tonight`,
        'x-default': `${baseUrl}/events/tonight`,
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

export default async function EventsTonightPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = isIt ? '/it' : '';

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  const items = mockEvents
    .filter(e => {
      const d = new Date(e.dateISO);
      return d >= todayStart && d <= todayEnd;
    })
    .flatMap(e => {
      const venue = mockVenues.find(v => v.id === e.venueId);
      return venue ? [{ event: e, venue }] : [];
    })
    .sort((a, b) => new Date(a.event.dateISO).getTime() - new Date(b.event.dateISO).getTime());

  const getMilanHour = (iso: string) =>
    parseInt(new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: 'Europe/Rome' }).format(new Date(iso)), 10);

  const aperitivo = items.filter(i => { const h = getMilanHour(i.event.dateISO); return h >= 18 && h <= 21; });
  const primeTime = items.filter(i => { const h = getMilanHour(i.event.dateISO); return h === 22 || h === 23 || h === 0; });
  const afterHours = items.filter(i => { const h = getMilanHour(i.event.dateISO); return h >= 1 && h <= 6; });

  const dateLabel = now.toLocaleDateString(isIt ? 'it-IT' : 'en-US', {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Rome',
  });

  return (
    <main className="flex-1 bg-[#131009] w-full pt-20 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs text-white/30 flex gap-2">
          <Link href={`${lp}/`} className="hover:text-champagne transition-colors">Home</Link>
          <span>/</span>
          <Link href={`${lp}/events`} className="hover:text-champagne transition-colors">{isIt ? 'Eventi' : 'Events'}</Link>
          <span>/</span>
          <span className="text-champagne">{isIt ? 'Stasera' : 'Tonight'}</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
          <span className="text-champagne/60 text-xs font-mono uppercase tracking-[0.2em]">{dateLabel}</span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-4">
          {isIt ? 'Stasera a Milano' : 'Tonight in Milan'}
        </h1>
        <p className="text-lg text-white/40 font-light mb-8">
          {isIt
            ? `${items.length} eventi selezionati stasera — aperitivo, club e after hours.`
            : `${items.length} curated events tonight — aperitivo, clubs and after hours.`}
        </p>

        {/* Quick Answer */}
        <div className="mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
          <p className="text-champagne/50 text-[9px] tracking-[0.3em] uppercase mb-2">Quick Answer</p>
          <p className="text-white/70 text-sm leading-relaxed">
            {isIt
              ? 'Stasera a Milano: aperitivo dalle 18–21 (Voya, Pineta, Navigli), club dalle 22:30 (Just Me, Aria Club, Play Club). Tavolo VIP via WhatsApp +39 351 912 7047 — risposta in 10 min. Dress code elegante per i club premium.'
              : 'Tonight in Milan: aperitivo 18–21 (Voya, Pineta, Navigli), clubs from 22:30 (Just Me, Aria Club, Play Club). VIP table via WhatsApp +39 351 912 7047 — 10 min reply. Elegant dress code for premium clubs.'}
          </p>
        </div>

        {/* Nav pills */}
        <div className="flex gap-3 flex-wrap">
          <span className="px-6 py-2.5 rounded-full bg-champagne text-black text-sm font-medium tracking-wider uppercase">
            {isIt ? 'Stasera' : 'Tonight'}
          </span>
          <Link href={`${lp}/events/this-week`} className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase">
            {isIt ? 'Questa Settimana' : 'This Week'}
          </Link>
          <Link href={`${lp}/events/best`} className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase">
            {isIt ? 'I Migliori' : 'Best Events'}
          </Link>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {items.length === 0 ? (
          <div className="py-24 text-center border border-white/10 rounded-xl bg-white/[0.02]">
            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-white/60 mb-2">
              {isIt ? 'Nessun evento stasera.' : 'No events tonight.'}
            </h3>
            <p className="text-white/30 text-sm mb-6">
              {isIt ? 'Controlla questa settimana o i migliori club.' : 'Check this week or the best clubs.'}
            </p>
            <Link href={`${lp}/events/this-week`} className="inline-flex px-6 py-3 rounded-full border border-champagne/40 text-champagne text-sm hover:bg-champagne hover:text-black transition-colors">
              {isIt ? 'Questa Settimana →' : 'This Week →'}
            </Link>
          </div>
        ) : (
          <div className="space-y-14">
            <TimeSlot title="Aperitivo" time="18:00 – 21:00" items={aperitivo} locale={locale} lp={lp} />
            <TimeSlot title="Prime Time" time="22:00 – 01:00" items={primeTime} locale={locale} lp={lp} />
            <TimeSlot title="After Hours" time="01:00+" items={afterHours} locale={locale} lp={lp} />
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-champagne/20 bg-champagne/[0.04] p-8 text-center">
          <h2 className="font-serif text-2xl text-white mb-3">
            {isIt ? 'Prenota Stasera' : 'Book for Tonight'}
          </h2>
          <p className="text-white/40 text-sm mb-6">
            {isIt ? 'Tavolo VIP, guestlist o bottiglie — rispondiamo in 10 minuti.' : 'VIP table, guestlist or bottles — we reply in 10 minutes.'}
          </p>
          <a
            href={`https://wa.me/393519127047?text=${encodeURIComponent(isIt ? 'Ciao! Vorrei prenotare per stasera a Milano.' : 'Hi! I want to book for tonight in Milan.')}`}
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

function TimeSlot({ title, time, items, locale, lp }: {
  title: string; time: string; items: { event: Event; venue: Venue }[]; locale: string; lp: string;
}) {
  if (items.length === 0) return null;
  const isIt = locale === 'it';

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-serif text-2xl text-white">{title}</h2>
        <span className="text-white/30 font-mono text-xs">{time}</span>
        <div className="flex-grow h-px bg-white/8" />
      </div>
      <div className="space-y-4">
        {items.map(({ event, venue }) => {
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
              <div className="sm:w-1/3 h-40 sm:h-auto relative shrink-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${event.image || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#131009] via-[#131009]/40 to-transparent" />
                {event.isSpecial && (
                  <div className="absolute top-3 left-3 bg-champagne text-black text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {isIt ? 'Speciale' : 'Special'}
                  </div>
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
}
