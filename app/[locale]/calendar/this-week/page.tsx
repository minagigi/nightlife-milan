import { Metadata } from 'next';
import Link from 'next/link';
import { mockEvents, mockVenues } from '@/lib/data';
import DiscoveryGrid from '@/components/DiscoveryGrid';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const title = locale === 'it' ? `Eventi in Arrivo a Milano | Nightlife Milan` : `Upcoming Events in Milan | Nightlife Milan`;
  const description = locale === 'it' 
    ? `Scopri tutti gli eventi, party e serate in programma a Milano. Prenota il tuo tavolo o mettiti in lista per i club più esclusivi.` 
    : `Discover all upcoming events, parties, and nights out in Milan. Book your table or get on the guestlist for the most exclusive clubs.`;
  
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${locale === 'it' ? '/it' : ''}/calendar/this-week`;

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
      languages: {
        'en': `${baseUrl}/calendar/this-week`,
        'it': `${baseUrl}/it/calendar/this-week`,
        'x-default': `${baseUrl}/calendar/this-week`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: isIt ? 'Eventi questa settimana Milano' : 'Milan events this week' }],
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

  // Filter events for upcoming using dynamic date
  const today = new Date();
  const todayStart = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));

  const upcomingEvents = mockEvents.filter(e => {
    const eventDate = new Date(e.dateISO);
    return eventDate >= todayStart;
  });

  const items = upcomingEvents.flatMap(event => {
    const venue = mockVenues.find(v => v.id === event.venueId);
    if (!venue) return [];
    return [{ event, venue }];
  });

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const lp = locale === 'it' ? '/it' : '';
  const eventSchemas = items.map(({ event, venue }) => ({
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
    'url': `${baseUrl}${lp}/calendar/this-week`,
    'eventStatus': 'https://schema.org/EventScheduled',
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock',
      'url': `https://wa.me/393519127047?text=${encodeURIComponent('Hi! I want to book for an upcoming event in Milan.')}`,
      'seller': { '@type': 'Organization', 'name': 'Nightlife Milan' },
    },
  }));

  const t = {
    title: isIt ? `Eventi in Arrivo` : `Upcoming Events`,
    intro: isIt 
      ? `Scopri tutti gli eventi in programma a Milano. Dai club underground ai rooftop di lusso, abbiamo curato per te le migliori esperienze della città.`
      : `Discover all upcoming events in Milan. From underground clubs to luxury rooftops, we have curated the best experiences in the city for you.`,
    gridTitle: isIt ? `In Programma` : `Upcoming`,
    gridSubtitle: isIt ? 'I migliori party selezionati per te' : 'The best parties selected for you',
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
              <a href={isIt ? '/it' : '/'} className="hover:text-champagne transition-colors">Home</a>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <a href={isIt ? '/it/calendar' : '/calendar'} className="hover:text-champagne transition-colors">{isIt ? 'Calendario' : 'Calendar'}</a>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">{isIt ? 'Questa Settimana' : 'This Week'}</li>
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
            isIt ? 'Questa Settimana Milano' : 'This Week Milan',
            isIt ? 'Serate in Arrivo' : 'Upcoming Events',
            isIt ? 'Club Milano' : 'Milan Clubs',
            'VIP Tables',
            isIt ? 'Guestlist' : 'Guestlist Milan',
            isIt ? 'Aperitivo' : 'Aperitivo Events',
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

        {/* Calendar toggle */}
        <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          <Link
            href={`${isIt ? '/it' : ''}/calendar/tonight`}
            className="flex-shrink-0 px-8 py-3 rounded-full border border-white/20 text-white hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-sm"
          >
            {isIt ? 'Stasera' : 'Tonight'}
          </Link>
          <Link
            href={`${isIt ? '/it' : ''}/calendar/this-week`}
            className="flex-shrink-0 px-8 py-3 rounded-full bg-champagne text-black font-medium tracking-wider uppercase text-sm"
          >
            {isIt ? 'Questa Settimana' : 'This Week'}
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
          {isIt ? 'Come Prenotare per Questa Settimana' : 'How to Book for This Week in Milan'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {isIt ? 'Contattaci via WhatsApp' : 'Contact us via WhatsApp'}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {isIt
                ? 'Scrivi a +39 351 912 7047. Dicci data, numero di persone e preferenze. Risposta garantita in 10 minuti.'
                : 'Message +39 351 912 7047. Tell us your date, group size and preferences. Reply guaranteed in 10 minutes.'}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {isIt ? 'VIP Table o Guestlist?' : 'VIP Table or Guestlist?'}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {isIt
                ? 'Guestlist = ingresso gratuito o ridotto, in piedi. VIP table = tavolo riservato, bottle service, migliore posizione. Per gruppi di 4+, il tavolo VIP è spesso la scelta migliore.'
                : 'Guestlist = free or reduced entry, standing. VIP table = reserved table, bottle service, best position. For groups of 4+, VIP table is often the best choice.'}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {isIt ? 'Servizio Gratuito' : 'Free Service'}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {isIt
                ? 'Il nostro servizio di concierge è completamente gratuito. Guadagniamo una commissione dai locali partner. Non paghi nulla di extra oltre al prezzo concordato.'
                : 'Our concierge service is completely free. We earn a commission from partner venues. You pay nothing extra beyond the agreed price.'}
            </p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
