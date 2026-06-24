import { Metadata } from 'next';
import Link from 'next/link';
import { Star, Clock, MapPin, ExternalLink } from 'lucide-react';
import { mockEvents, mockVenues } from '@/lib/data';
import { weeklyEvents } from '@/lib/eventsConfig';

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${isIt ? '/it' : ''}/events/best`;

  const title = isIt
    ? 'I Migliori Club di Milano 2026 | Just Me, Pineta, Aria Club'
    : 'Best Clubs in Milan 2026 | Just Me, Pineta, Aria Club';
  const description = isIt
    ? 'I tre migliori club di Milano selezionati dal nostro concierge: Just Me Milano, Pineta Club e Aria Club. Serate garantite ogni settimana. Prenota tavolo VIP via WhatsApp.'
    : 'The three best clubs in Milan selected by our concierge: Just Me Milano, Pineta Club and Aria Club. Events guaranteed every week. Book VIP table via WhatsApp.';

  return {
    title,
    description,
    keywords: isIt
      ? ['migliori club milano', 'just me milano', 'pineta club milano', 'aria club milano', 'nightlife milano 2026', 'club esclusivi milano']
      : ['best clubs milan', 'just me milan', 'pineta club milan', 'aria club milan', 'milan nightlife 2026', 'exclusive clubs milan'],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        'en': `${baseUrl}/events/best`,
        'it': `${baseUrl}/it/events/best`,
        'x-default': `${baseUrl}/events/best`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: `${baseUrl}/images/venues/just-me-milano/just-me-milano-interior-01.webp`, width: 1200, height: 630 }],
    },
  };
}

const BEST_VENUES = [
  {
    id: 'v-justme',
    slug: 'justme',
    color: '#C9A86A',
    image: '/images/venues/just-me-milano/just-me-milano-interior-01.webp',
    name: { en: 'Just Me Milano', it: 'Just Me Milano' },
    zone: { en: 'Parco Sempione', it: 'Parco Sempione' },
    label: { en: 'Open 7 nights a week', it: 'Aperto 7 sere su 7' },
    why: {
      en: 'Designed by Roberto Cavalli, under Torre Branca. The city\'s high society, international jet-set, fashion models. Strictly elegant dress code enforced every night.',
      it: 'Progettato da Roberto Cavalli, sotto Torre Branca. L\'alta società milanese, il jet-set internazionale, modelle. Dress code strettamente elegante ogni sera.',
    },
    tags: ['VIP Tables', 'Dress Code', 'International DJ', 'Fashion Crowd'],
    priceFrom: { en: 'Entry from €15 · Tables from €320', it: 'Ingresso da €15 · Tavoli da €320' },
    openDays: { en: 'Mon – Sun', it: 'Lun – Dom' },
  },
  {
    id: 'v-pineta',
    slug: 'pineta',
    color: '#A8C9A0',
    image: '/images/venues/pineta-milano/pineta-milano-interior-01.webp',
    name: { en: 'Pineta Club', it: 'Pineta Club' },
    zone: { en: 'Sempione · Via Messina', it: 'Sempione · Via Messina' },
    label: { en: 'Friday & Saturday + Aperitivo', it: 'Venerdì e Sabato + Aperitivo Cantato' },
    why: {
      en: 'The Formentera legend, now in Milan. Aperitivo from 7:30 PM with live singing, then a premium club night. Biggest reggaeton and commercial crowd in Milan.',
      it: 'La leggenda di Formentera, ora a Milano. Aperitivo dalle 19:30 con canto dal vivo, poi notte club premium. Il pubblico reggaeton e commercial più grande di Milano.',
    },
    tags: ['Aperitivo Cantato', 'Reggaeton', 'Live Music', 'Buffet'],
    priceFrom: { en: 'Aperitivo from €20 · Tables from €300', it: 'Aperitivo da €20 · Tavoli da €300' },
    openDays: { en: 'Fri – Sat', it: 'Ven – Sab' },
  },
  {
    id: 'v-aria',
    slug: 'aria',
    color: '#A0B4C9',
    image: '/images/events/xceed-aria-friday-night.jpg',
    name: { en: 'Aria Club Milano', it: 'Aria Club Milano' },
    zone: { en: 'San Siro · Piazzale dello Sport', it: 'San Siro · Piazzale dello Sport' },
    label: { en: 'Thursday to Saturday', it: 'Giovedì, Venerdì e Sabato' },
    why: {
      en: 'New concept club in San Siro. Buffet aperitivo from 7:30 PM, dinner option, then full party until late. Dance Floor Tables, Privé Aria and Privé DJ areas.',
      it: 'Nuovo concept club a San Siro. Aperitivo a buffet dalle 19:30, opzione cena, poi party fino a tardi. Dance Floor Table, Privé Aria e Privé DJ.',
    },
    tags: ['Buffet Aperitivo', 'EDM', 'Hits', 'Dance Floor Tables'],
    priceFrom: { en: 'Entry from €15 · Tables from €200', it: 'Ingresso da €15 · Tavoli da €200' },
    openDays: { en: 'Thu – Sat', it: 'Gio – Sab' },
  },
];

export default async function EventsBestPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = isIt ? '/it' : '';
  const lang = (isIt ? 'it' : 'en') as 'en' | 'it';

  // Upcoming events for these 3 venues
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const venueIds = BEST_VENUES.map(v => v.id);

  const upcomingByVenue: Record<string, typeof mockEvents> = {};
  mockEvents
    .filter(e => venueIds.includes(e.venueId) && new Date(e.dateISO) >= today)
    .sort((a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime())
    .forEach(e => {
      if (!upcomingByVenue[e.venueId]) upcomingByVenue[e.venueId] = [];
      upcomingByVenue[e.venueId].push(e);
    });

  // Weekly recurring events for these clubs — sorted Mon(1)→Sun(0)
  const DOW_ORDER = [1, 2, 3, 4, 5, 6, 0];
  const weeklyByVenue: Record<string, typeof weeklyEvents> = {};
  weeklyEvents
    .filter(e => ['justme', 'pineta', 'aria'].includes(e.clubSlug))
    .sort((a, b) => DOW_ORDER.indexOf(a.dayOfWeek) - DOW_ORDER.indexOf(b.dayOfWeek))
    .forEach(e => {
      const key = `v-${e.clubSlug}`;
      if (!weeklyByVenue[key]) weeklyByVenue[key] = [];
      weeklyByVenue[key].push(e);
    });

  const DAYS_IT: Record<string, string> = { monday: 'Lunedì', tuesday: 'Martedì', wednesday: 'Mercoledì', thursday: 'Giovedì', friday: 'Venerdì', saturday: 'Sabato', sunday: 'Domenica' };

  return (
    <main className="flex-1 bg-[#131009] w-full pt-20 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs text-white/30 flex gap-2">
          <Link href={`${lp}/`} className="hover:text-champagne transition-colors">Home</Link>
          <span>/</span>
          <Link href={`${lp}/events`} className="hover:text-champagne transition-colors">{isIt ? 'Eventi' : 'Events'}</Link>
          <span>/</span>
          <span className="text-champagne">{isIt ? 'I Migliori' : 'Best'}</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-champagne fill-champagne" />
          <span className="text-champagne/60 text-xs uppercase tracking-[0.2em]">
            {isIt ? 'Selezione Concierge' : 'Concierge Selection'}
          </span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-4">
          {isIt ? 'I Migliori Club' : 'Best Clubs'}
        </h1>
        <p className="text-lg text-white/40 font-light mb-8 max-w-2xl">
          {isIt
            ? 'Tre locali, tre esperienze diverse. Sempre aperti, sempre selezionati. La scelta del nostro concierge per ogni sera della settimana.'
            : 'Three venues, three different experiences. Always open, always curated. Our concierge\'s choice for every night of the week.'}
        </p>

        {/* Quick Answer */}
        <div className="mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] max-w-2xl">
          <p className="text-champagne/50 text-[9px] tracking-[0.3em] uppercase mb-2">Quick Answer</p>
          <p className="text-white/70 text-sm leading-relaxed">
            {isIt
              ? 'I 3 migliori club di Milano: Just Me (aperto 7/7, dress code elegante, jet-set internazionale), Pineta (ven–sab, aperitivo cantato + reggaeton), Aria Club (gio–sab, aperitivo buffet, EDM e hits). Prenota via WhatsApp +39 351 912 7047.'
              : 'The 3 best clubs in Milan: Just Me (open 7 nights, elegant dress code, international jet-set), Pineta (Fri–Sat, singing aperitivo + reggaeton), Aria Club (Thu–Sat, buffet aperitivo, EDM and hits). Book via WhatsApp +39 351 912 7047.'}
          </p>
        </div>

        {/* Nav pills */}
        <div className="flex gap-3 flex-wrap">
          <Link href={`${lp}/events/tonight`} className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase">
            {isIt ? 'Stasera' : 'Tonight'}
          </Link>
          <Link href={`${lp}/events/this-week`} className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-champagne hover:text-champagne transition-colors text-sm tracking-wider uppercase">
            {isIt ? 'Questa Settimana' : 'This Week'}
          </Link>
          <span className="px-6 py-2.5 rounded-full bg-champagne text-black text-sm font-medium tracking-wider uppercase">
            {isIt ? 'I Migliori' : 'Best Events'}
          </span>
        </div>
      </section>

      {/* Venue cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
        {BEST_VENUES.map((v, index) => {
          const upcoming = upcomingByVenue[v.id] ?? [];
          const weekly = weeklyByVenue[v.id] ?? [];
          const venue = mockVenues.find(mv => mv.id === v.id);

          return (
            <div key={v.id} className="border border-white/8 rounded-xl overflow-hidden">
              {/* Hero image */}
              <div className="relative h-56 sm:h-72">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${v.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131009] via-[#131009]/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] uppercase tracking-[0.25em] font-bold px-2 py-1 rounded" style={{ color: v.color, border: `1px solid ${v.color}40`, background: `${v.color}10` }}>
                        #{index + 1} {isIt ? 'SCELTA CONCIERGE' : 'CONCIERGE PICK'}
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-tight">
                      {v.name[lang]}
                    </h2>
                    <p className="text-white/50 text-sm mt-1">{v.zone[lang]}</p>
                  </div>
                  <Link
                    href={`${lp}/clubs/${v.slug}`}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm hover:border-champagne hover:text-champagne transition-colors"
                  >
                    {isIt ? 'Vedi Club' : 'View Club'} <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 bg-[#1a1508]">
                {/* Why label */}
                <div className="flex flex-wrap gap-3 mb-5 items-center">
                  <span className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/50">
                    <Clock className="w-3 h-3 inline mr-1" />{v.openDays[lang]}
                  </span>
                  <span className="text-xs text-white/40">{v.label[lang]}</span>
                </div>

                <p className="text-white/60 text-sm leading-relaxed mb-5">{v.why[lang]}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {v.tags.map(tag => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 text-white/40 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-champagne/60 text-xs font-mono mb-6">{v.priceFrom[lang]}</p>

                {/* Weekly schedule */}
                {weekly.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-white/50 text-[10px] uppercase tracking-[0.25em] mb-3">
                      {isIt ? 'Serate Ricorrenti' : 'Weekly Schedule'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {weekly.map(we => {
                        const dayLabel = isIt
                          ? DAYS_IT[we.day] ?? we.day
                          : we.day.charAt(0).toUpperCase() + we.day.slice(1);
                        const eventSlug = `${we.clubSlug}-${we.day}-${we.eventSlug}`;
                        return (
                          <Link
                            key={we.id}
                            href={`${lp}/events/${eventSlug}`}
                            className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white/[0.03] border border-white/5 hover:border-champagne/30 hover:bg-white/[0.05] transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-white/30 text-xs font-mono w-20 shrink-0">{dayLabel}</span>
                              <span className="text-white/70 text-sm group-hover:text-champagne transition-colors">{we.name}</span>
                            </div>
                            <span className="text-white/25 text-[10px] hidden sm:block">{we.genres[0]}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Upcoming special events */}
                {upcoming.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-white/50 text-[10px] uppercase tracking-[0.25em] mb-3">
                      {isIt ? 'Prossimi Eventi Speciali' : 'Upcoming Special Events'}
                    </h3>
                    <div className="space-y-2">
                      {upcoming.slice(0, 3).map(event => {
                        const title = event.localizedContent.title[lang] || event.localizedContent.title.en;
                        const slug = event.localizedContent.slug[lang] || event.localizedContent.slug.en;
                        const dateStr = new Date(event.dateISO).toLocaleDateString(isIt ? 'it-IT' : 'en-US', {
                          weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/Rome',
                        });
                        return (
                          <Link
                            key={event.id}
                            href={`${lp}/events/${slug}`}
                            className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-champagne/[0.05] border border-champagne/15 hover:border-champagne/40 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-champagne/50 text-xs font-mono w-28 shrink-0">{dateStr}</span>
                              <span className="text-white/80 text-sm group-hover:text-champagne transition-colors">{title}</span>
                            </div>
                            {event.pricing.entry > 0 && (
                              <span className="text-champagne/50 text-xs shrink-0 ml-2">€{event.pricing.entry}</span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CTA row */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/393519127047?text=${encodeURIComponent(isIt ? `Ciao! Vorrei prenotare al ${v.name.it} a Milano.` : `Hi! I want to book at ${v.name.en} in Milan.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-champagne text-black font-bold rounded-full hover:bg-white transition-colors text-xs uppercase tracking-wider"
                  >
                    {isIt ? 'Prenota Tavolo' : 'Book Table'}
                  </a>
                  <Link
                    href={`${lp}/clubs/${v.slug}`}
                    className="px-5 py-2.5 border border-white/20 text-white/60 rounded-full hover:border-champagne hover:text-champagne transition-colors text-xs uppercase tracking-wider"
                  >
                    {isIt ? 'Scheda Club' : 'Club Info'}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Global CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-champagne/20 bg-champagne/[0.04] p-8 text-center">
          <h2 className="font-serif text-2xl text-white mb-3">
            {isIt ? 'Non sai dove andare?' : 'Not sure where to go?'}
          </h2>
          <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
            {isIt
              ? 'Dicci la data, quante persone siete e il budget. Ti troviamo il tavolo perfetto in 10 minuti, gratis.'
              : 'Tell us the date, group size and budget. We\'ll find the perfect table in 10 minutes, for free.'}
          </p>
          <a
            href={`https://wa.me/393519127047?text=${encodeURIComponent(isIt ? 'Ciao! Aiutami a scegliere il club giusto per stasera a Milano.' : 'Hi! Help me choose the right club for tonight in Milan.')}`}
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
