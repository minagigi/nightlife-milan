import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import Link from 'next/link';
import { getAllCalendarEvents, romeDayKey, romeDayKeyOffset, romeSundayKey } from '@/lib/calendarEvents';
import { buildOfferSchema } from '@/lib/seo';
import DiscoveryGrid from '@/components/DiscoveryGrid';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const title = tr(locale, `Upcoming Events in Milan | Nightlife Milan`, `Eventi in Arrivo a Milano | Nightlife Milan`);
  const description = tr(locale, `Discover all upcoming events, parties, and nights out in Milan. Book your table or get on the guestlist for the most exclusive clubs.`, `Scopri tutti gli eventi, party e serate in programma a Milano. Prenota il tuo tavolo o mettiti in lista per i club più esclusivi.`);
  
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/calendar/this-week`;

  const isIt = locale === 'it';
  const ogImage = `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`;

  return {
    title,
    description,
    keywords: isIt
      ? ['eventi questa settimana milano', 'serate milano settimana', 'club milano questa settimana', 'agenda vita notturna milano']
      : ['events this week milan', 'milan nightlife this week', 'clubs milan this week', 'milan party calendar'],
    robots: { index: true, follow: true },
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/calendar/this-week'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: tr(locale, 'Milan events this week', 'Eventi questa settimana Milano') }],
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

export default async function ThisWeekPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';

  // FASE C1/C3 (piano 2026-07-09-fix-calendar.md): sorgente dati unificata
  // (statici + Eventbrite/Xceed reali), finestra oggi→domenica nel fuso di
  // Roma — mai eventi mai passati per l'evento all'1:30 di notte italiana.
  const allItems = await getAllCalendarEvents();
  const todayKey = romeDayKeyOffset(0);
  const sundayKey = romeSundayKey();

  const items = allItems.filter(({ event }) => {
    const key = romeDayKey(event.dateISO);
    return key >= todayKey && key <= sundayKey;
  });

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const lp = localePrefix(locale);
  const eventSchemas = items.map(({ event, venue }) => {
    const bookingUrl = `https://wa.me/393519127047?text=${encodeURIComponent('Hi! I want to book for an upcoming event in Milan.')}`;
    const offer = buildOfferSchema(event.pricing, bookingUrl, event.dateISO);
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      'name': event.localizedContent?.title?.en || `${venue.localizedContent?.name?.en || 'Club'} Milan`,
      'startDate': event.dateISO,
      'endDate': (() => { const d = new Date(event.dateISO); d.setHours(d.getHours() + 5); return d.toISOString(); })(),
      'location': {
        '@type': 'Place',
        'name': venue.localizedContent?.name?.en || 'Milan Club',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': venue.address?.streetAddress,
          'addressLocality': 'Milan',
          'addressCountry': 'IT',
        },
      },
      'organizer': { '@type': 'Organization', 'name': 'Nightlife Milan', 'url': baseUrl },
      'url': (() => {
        const slug = locale === 'it' ? event.localizedContent?.slug?.it : event.localizedContent?.slug?.en;
        return slug ? `${baseUrl}${lp}/events/${slug}` : `${baseUrl}${lp}/calendar/this-week`;
      })(),
      'eventStatus': 'https://schema.org/EventScheduled',
      'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
      ...(offer ? { offers: { ...offer, seller: { '@type': 'Organization', name: 'Nightlife Milan' } } } : {}),
    };
  });

  const t = {
    title: tr(locale, `Upcoming Events`, `Eventi in Arrivo`),
    intro: tr(locale, `Discover all upcoming events in Milan. From underground clubs to luxury rooftops, we have curated the best experiences in the city for you.`, `Scopri tutti gli eventi in programma a Milano. Dai club underground ai rooftop di lusso, abbiamo curato per te le migliori esperienze della città.`),
    gridTitle: tr(locale, `Upcoming`, `In Programma`),
    gridSubtitle: tr(locale, 'The best parties selected for you', 'I migliori party selezionati per te'),
  };

  return (
    <>
      {eventSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    <main className="flex-1 bg-[#131009] w-full pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-white/40" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href={localePrefix(locale) || '/'} className="hover:text-champagne transition-colors">Home</a>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <a href={tr(locale, '/calendar', '/it/calendar')} className="hover:text-champagne transition-colors">{tr(locale, 'Calendar', 'Calendario')}</a>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">{tr(locale, 'This Week', 'Questa Settimana')}</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-champagne mb-6 tracking-tight">
          {t.title}
        </h1>
        <div className="max-w-3xl mb-8">
          <p className="text-white/70 leading-relaxed font-light">
            {t.intro}
          </p>
        </div>

        {/* AI Trafiletto */}
        <div className="max-w-2xl mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
          <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
          <p className="font-sans text-white/70 text-sm leading-relaxed">
            {isIt
              ? `Questa settimana a Milano: ${items.length} eventi in programma nei migliori club della città. Just Me, Pineta, Voya Rooftop, Play Club e altri. Prenota VIP table o guestlist via WhatsApp +39 351 912 7047.`
              : `This week in Milan: ${items.length} events scheduled at the city's best clubs. Just Me, Pineta, Voya Rooftop, Play Club and more. Book VIP tables or guestlist via WhatsApp +39 351 912 7047.`}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            tr(locale, 'This Week Milan', 'Questa Settimana Milano'),
            tr(locale, 'Upcoming Events', 'Serate in Arrivo'),
            tr(locale, 'Milan Clubs', 'Club Milano'),
            'VIP Tables',
            tr(locale, 'Guestlist Milan', 'Guestlist'),
            tr(locale, 'Aperitivo Events', 'Aperitivo'),
          ].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        {/* H2: This Week's Highlights */}
        <h2 className="font-serif text-3xl text-white mb-4">
          {isIt ? 'I Migliori Appuntamenti della Settimana' : "This Week's Best Events in Milan"}
        </h2>
        <p className="text-white/40 mb-8 text-base">
          {isIt
            ? 'Abbiamo selezionato per te le serate più esclusive, gli artisti più attesi e le venue imperdibili di questa settimana.'
            : "We've curated the most exclusive nights, most anticipated artists, and unmissable venues this week in Milan."}
        </p>

        {/* Calendar toggle — FASE C3: stesso selettore a 3 bottoni di /calendar/tonight */}
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          <Link
            href={`${localePrefix(locale)}/calendar/tonight`}
            className="flex-shrink-0 px-8 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
          >
            {tr(locale, 'Tonight', 'Stasera')}
          </Link>
          <Link
            href={`${localePrefix(locale)}/calendar/tonight#tomorrow`}
            className="flex-shrink-0 px-8 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
          >
            {tr(locale, 'Tomorrow', 'Domani')}
          </Link>
          <Link
            href={`${localePrefix(locale)}/calendar/this-week`}
            className="flex-shrink-0 px-8 py-3 rounded-full bg-champagne text-black font-medium tracking-wider uppercase text-sm"
          >
            {tr(locale, 'Full Week', 'Tutta la Settimana')}
          </Link>
        </div>
      </section>

      {/* Discovery Grid */}
      <DiscoveryGrid
        items={items}
        lang={locale}
        title={t.gridTitle}
        subtitle={t.gridSubtitle}
      />

      {/* H3 section: How to Book */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <h2 className="font-serif text-3xl text-white mb-8">
          {tr(locale, 'How to Book for This Week in Milan', 'Come Prenotare per Questa Settimana')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, 'Contact us via WhatsApp', 'Contattaci via WhatsApp')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(locale, 'Message +39 351 912 7047. Tell us your date, group size and preferences. Reply guaranteed in 10 minutes.', 'Scrivi a +39 351 912 7047. Dicci data, numero di persone e preferenze. Risposta garantita in 10 minuti.')}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, 'VIP Table or Guestlist?', 'VIP Table o Guestlist?')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(locale, 'Guestlist = free or reduced entry, standing. VIP table = reserved table, bottle service, best position. For groups of 4+, VIP table is often the best choice.', 'Guestlist = ingresso gratuito o ridotto, in piedi. VIP table = tavolo riservato, bottle service, migliore posizione. Per gruppi di 4+, il tavolo VIP è spesso la scelta migliore.')}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, 'Free Service', 'Servizio Gratuito')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(locale, 'Our concierge service is completely free. We earn a commission from partner venues. You pay nothing extra beyond the agreed price.', 'Il nostro servizio di concierge è completamente gratuito. Guadagniamo una commissione dai locali partner. Non paghi nulla di extra oltre al prezzo concordato.')}
            </p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
