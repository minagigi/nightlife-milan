import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { getLocalizedText, buildOfferSchema } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import { weeklyEvents } from '@/lib/eventsConfig';
import DiscoveryGrid from '@/components/DiscoveryGrid';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/events`;

  return {
    title: tr(locale, 'All Events in Milan 2026 | Nightlife Milan', 'Tutti gli Eventi a Milano 2026 | Nightlife Milan'),
    description: tr(locale, 'Discover all events, nights and experiences in Milan. Clubs, aperitivo, live music, special nights. Book VIP table or guestlist via WhatsApp.', 'Scopri tutti gli eventi, serate ed esperienze in programma a Milano. Club, aperitivo, live music, serate speciali. Prenota tavolo VIP o guestlist via WhatsApp.'),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/events'),
    },
    openGraph: {
      title: tr(locale, 'All Events in Milan 2026', 'Tutti gli Eventi a Milano 2026'),
      description: tr(locale, 'The complete calendar of Milanese nightlife. VIP nights, aperitivo, live music and much more.', 'Il calendario completo della vita notturna milanese. Serate VIP, aperitivo, live music e molto altro.'),
      images: [{ url: `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`, width: 1200, height: 630, alt: tr(locale, 'Milan nightlife events', 'Eventi Milano vita notturna') }],
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
    },
    keywords: isIt
      ? ['eventi milano', 'serate milano', 'eventi club milano', 'vita notturna milano luglio 2026', 'guestlist eventi milano']
      : ['milan events', 'milan nightlife events', 'club events milan', 'milan nightlife july 2026', 'guestlist events milan'],
    robots: { index: true, follow: true },
    twitter: {
      card: 'summary_large_image',
      title: tr(locale, 'All Events in Milan 2026', 'Tutti gli Eventi a Milano 2026'),
      description: tr(locale, 'The complete calendar of Milanese nightlife. VIP nights, aperitivo, live music and much more.', 'Il calendario completo della vita notturna milanese. Serate VIP, aperitivo, live music e molto altro.'),
      images: [`${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`],
      site: '@nightlifemilan',
    },
  };
}

export default async function EventsHubPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  // Upcoming mock events — chronological, priority Just Me > Pineta > Aria
  const getVenuePriority = (venueId: string) => {
    if (venueId === 'v-justme') return 1;
    if (venueId === 'v-pineta') return 2;
    if (venueId === 'v-aria')   return 3;
    return 99;
  };

  // Confine giorno nel fuso di Roma, non del server (UTC su Vercel):
  // mai mostrare eventi già passati.
  const allItems = await getAllCalendarEvents();

  const items = allItems
    .filter(({ event }) => isUpcomingRome(event.dateISO))
    .sort((a, b) => {
      const dateA = new Date(a.event.dateISO).getTime();
      const dateB = new Date(b.event.dateISO).getTime();
      if (dateA !== dateB) return dateA - dateB;
      return getVenuePriority(a.event.venueId) - getVenuePriority(b.event.venueId);
    });

  // Special events
  const specialItems = items.filter(i => i.event.isSpecial);
  const trendingItems = items.filter(i => i.event.isTrending);

  // Weekly recurring events — group by club
  const weeklyByClub: Record<string, typeof weeklyEvents> = {};
  weeklyEvents.forEach(e => {
    if (!weeklyByClub[e.clubName]) weeklyByClub[e.clubName] = [];
    weeklyByClub[e.clubName].push(e);
  });

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

  const eventListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tr(locale, 'Milan Events 2026', 'Eventi Milano 2026'),
    description: tr(locale, 'Complete list of nightlife events in Milan', 'Lista completa degli eventi notturni a Milano'),
    numberOfItems: items.length,
    itemListElement: items.slice(0, 10).map((item, i) => {
      const eventUrl = `${baseUrl}${lp}/events/${getLocalizedText(item.event.localizedContent.slug, locale)}`;
      const offer = buildOfferSchema(item.event.pricing, eventUrl, item.event.dateISO);
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Event',
          name: getLocalizedText(item.event.localizedContent.title, locale),
          startDate: item.event.dateISO,
          location: {
            '@type': 'Place',
            name: getLocalizedText(item.venue.localizedContent.name, locale),
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Milan',
              addressCountry: 'IT',
            },
          },
          url: eventUrl,
          ...(offer ? { offers: offer } : {}),
        },
      };
    }),
  };

  const t = {
    hero: tr(locale, 'All Events', 'Tutti gli Eventi'),
    heroSub: isIt
      ? 'Il calendario completo della vita notturna milanese — serate speciali, eventi ricorrenti, aperitivo e molto altro.'
      : "Milan's complete nightlife calendar — special nights, recurring events, aperitivo and much more.",
    quickAnswer: isIt
      ? `A Milano ci sono ${items.length} eventi in programma: serate VIP (Just Me, Armani Privé, The Club), techno underground (Volt, Magazzini), aperitivo cantato (Pineta, 55 Milano), rooftop (Voya, Ceresio 7). Prenota via WhatsApp +39 351 912 7047.`
      : `Milan has ${items.length} upcoming events: VIP nights (Just Me, Armani Privé, The Club), underground techno (Volt, Magazzini), singing aperitivo (Pineta, 55 Milano), rooftop (Voya, Ceresio 7). Book via WhatsApp +39 351 912 7047.`,
    upcoming: tr(locale, 'Upcoming Events', 'In Programma'),
    special: tr(locale, 'Special Nights', 'Serate Speciali'),
    weekly: tr(locale, 'Weekly Recurring Nights', 'Serate Ricorrenti'),
    weeklyDesc: tr(locale, 'Every week, the same venues offer curated recurring experiences. Book your spot in advance.', 'Ogni settimana, gli stessi locali offrono esperienze ripetibili e selezionate. Prenota il tuo posto in anticipo.'),
    tonight: tr(locale, 'Tonight', 'Stasera'),
    thisWeek: tr(locale, 'This Week', 'Questa Settimana'),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }} />
      <main className="flex-1 bg-[#131009] w-full pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-white/40" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href={lp || '/'} className="hover:text-champagne transition-colors">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-champagne" aria-current="page">{tr(locale, 'Events', 'Eventi')}</li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
            {t.hero}
          </h1>
          <p className="text-xl text-white/40 max-w-3xl mb-8 font-light leading-relaxed">
            {t.heroSub}
          </p>

          {/* AI Quick Answer */}
          <div className="max-w-2xl mb-10 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
            <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
            <p className="font-sans text-white/70 text-sm leading-relaxed">{t.quickAnswer}</p>
          </div>

          {/* Calendar Nav */}
          <div className="flex gap-3 flex-wrap mb-12">
            <Link
              href={`${lp}/events/tonight`}
              className="px-6 py-3 rounded-full border border-champagne/40 text-champagne hover:bg-champagne hover:text-black transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {t.tonight}
            </Link>
            <Link
              href={`${lp}/events/this-week`}
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {t.thisWeek}
            </Link>
            <Link
              href={`${lp}/events/best`}
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {tr(locale, 'Best Clubs', 'I Migliori')}
            </Link>
            <Link
              href={`${lp}/events/special`}
              className="px-6 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
            >
              {tr(locale, 'Special Events', 'Speciali')}
            </Link>
          </div>
        </section>

        {/* Special Events highlight */}
        {specialItems.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-serif text-3xl text-white">{t.special}</h2>
              <div className="flex-grow h-px bg-champagne/20" />
              <Link href={`${lp}/events/special`} className="text-champagne text-sm tracking-wider hover:underline uppercase">
                {tr(locale, 'See all →', 'Vedi tutti →')}
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {specialItems.slice(0, 3).map(item => {
                const title = getLocalizedText(item.event.localizedContent.title, locale);
                const slug = getLocalizedText(item.event.localizedContent.slug, locale);
                const venueName = getLocalizedText(item.venue.localizedContent.name, locale);
                const date = new Date(item.event.dateISO).toLocaleDateString(locale, {
                  weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/Rome',
                });
                return (
                  <Link
                    key={item.event.id}
                    href={`${lp}/events/${slug}`}
                    className="group relative h-64 rounded-lg overflow-hidden border border-champagne/20 hover:border-champagne/60 transition-colors"
                  >
                    <Image
                      src={item.event.image || item.venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={85}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-champagne text-black text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {tr(locale, 'Special', 'Speciale')}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-champagne/70 text-xs font-mono mb-1">{date}</p>
                      <h3 className="font-serif text-lg text-white group-hover:text-champagne transition-colors leading-tight">{title}</h3>
                      <p className="text-white/40 text-sm mt-1">{venueName}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* All Upcoming Events Grid */}
        <DiscoveryGrid
          items={items}
          lang={locale}
          title={t.upcoming}
          subtitle={tr(locale, 'All curated upcoming events', 'Tutti gli appuntamenti selezionati per te')}
        />

        {/* Weekly Recurring Nights */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
          <h2 className="font-serif text-3xl text-white mb-3">{t.weekly}</h2>
          <p className="text-white/40 mb-10 font-light">{t.weeklyDesc}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(weeklyByClub).slice(0, 4).map(([clubName, events]) => (
              <div key={clubName} className="p-6 rounded-lg border border-white/8 bg-white/[0.02] hover:border-champagne/30 transition-colors">
                <h3 className="font-serif text-xl text-champagne mb-4">{clubName}</h3>
                <div className="space-y-2">
                  {events.map(e => {
                    const slug = `${e.clubSlug}-${e.day}-${e.eventSlug}`;
                    const dayLabel = isIt
                      ? { monday: 'Lunedì', tuesday: 'Martedì', wednesday: 'Mercoledì', thursday: 'Giovedì', friday: 'Venerdì', saturday: 'Sabato', sunday: 'Domenica' }[e.day]
                      : e.day.charAt(0).toUpperCase() + e.day.slice(1);
                    return (
                      <Link
                        key={e.id}
                        href={`${lp}/events/${slug}`}
                        className="flex items-center justify-between py-2 border-b border-white/5 hover:border-champagne/20 transition-colors group"
                      >
                        <div>
                          <span className="text-white/40 text-xs font-mono uppercase tracking-wider w-24 inline-block">{dayLabel}</span>
                          <span className="text-white/80 text-sm group-hover:text-champagne transition-colors">{e.name}</span>
                        </div>
                        <span className="text-white/30 text-xs">{e.genres.slice(0, 2).join(', ')}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA WhatsApp */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-lg border border-champagne/20 bg-champagne/[0.04] p-8 md:p-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              {tr(locale, 'Book for Any Event', 'Prenota per Qualsiasi Evento')}
            </h2>
            <p className="text-white/40 max-w-xl mx-auto mb-8 font-light">
              {tr(locale, 'Our concierge replies in 10 minutes. VIP table, guestlist, bottles — everything handled for you, for free.', 'Il nostro concierge risponde in 10 minuti. Tavolo VIP, guestlist, bottiglie — tutto gestito per te, gratis.')}
            </p>
            <a
              href="https://wa.me/393519127047?text=Hi%2C%20I%20want%20to%20book%20for%20an%20event%20in%20Milan."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black font-bold rounded-full hover:bg-white transition-colors uppercase tracking-wider text-sm"
            >
              WhatsApp +39 351 912 7047
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
