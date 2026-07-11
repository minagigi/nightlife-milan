import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import DiscoveryGrid from '@/components/DiscoveryGrid';

// ISR Configuration
export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const title = tr(locale, `Special & VIP Events in Milan | Nightlife Milan`, `Eventi Speciali e VIP a Milano | Nightlife Milan`);
  const description = tr(locale, `Discover the most exclusive events, VIP parties, and special nights in Milan. Book your table for an unforgettable experience.`, `Scopri gli eventi più esclusivi, i party VIP e le serate speciali a Milano. Prenota il tuo tavolo per un'esperienza indimenticabile.`);
  
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/events/special`;

  return {
    title,
    description,
    keywords: ['special events milan', 'vip events milan', 'exclusive parties milan', 'vip table milan', 'private events milan 2026', 'eventi speciali milano', 'serate esclusive milano'],
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/events/special'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: `${baseUrl}/images/milan-vip-event-luxury-nightclub-2026.webp` }],
    },
  };
}

export default async function SpecialEventsPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  // Filter special events: isSpecial === true OR tableMinSpend > 500.
  // Solo eventi di oggi o futuri (giorno di Roma) — mai eventi già passati.
  const allItems = await getAllCalendarEvents();
  const items = allItems.filter(({ event: e }) => {
    if (!isUpcomingRome(e.dateISO)) return false;
    const isSpecialFlag = e.isSpecial === true;
    const isHighSpend = e.pricing.tableMinSpend !== null && e.pricing.tableMinSpend > 500;
    return isSpecialFlag || isHighSpend;
  });

  const t = {
    title: tr(locale, `Special & VIP Events`, `Eventi Speciali & VIP`),
    intro: tr(locale, `The pinnacle of Milanese nightlife. This curated selection represents the absolute best the city has to offer. From exclusive private parties to nights with world-renowned international DJs, these events are designed for those seeking an uncompromising experience. Get ready to live unforgettable nights in the most prestigious venues, where luxury, music, and atmosphere blend to create indelible memories.`, `L'apice della vita notturna milanese. Questa selezione curata rappresenta il meglio assoluto che la città ha da offrire. Da party privati esclusivi a serate con DJ internazionali di fama mondiale, questi eventi sono pensati per chi cerca un'esperienza senza compromessi. Preparati a vivere notti indimenticabili nei locali più prestigiosi, dove il lusso, la musica e l'atmosfera si fondono per creare ricordi indelebili.`),
    gridTitle: tr(locale, `Exclusive Events`, `Eventi Esclusivi`),
    gridSubtitle: tr(locale, 'The premium selection for your nights', 'La selezione premium per le tue serate'),
  };

  return (
    <main className="flex-1 bg-[#131009] w-full pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-white/40" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href={lp || '/'} className="hover:text-champagne transition-colors">Home</a>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <a href={`${lp}/events`} className="hover:text-champagne transition-colors">{tr(locale, 'Events', 'Eventi')}</a>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">{tr(locale, 'Special', 'Speciali')}</li>
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
        <div className="max-w-2xl mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] text-left">
          <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
          <p className="font-sans text-white/70 text-sm leading-relaxed">
            {isIt
              ? `Gli eventi speciali e VIP a Milano includono serate con DJ internazionali, party privati esclusivi e bottle service di lusso. ${items.length} eventi premium disponibili. Prenota VIP table via WhatsApp +39 351 912 7047 — risposta garantita in 10 minuti.`
              : `Special and VIP events in Milan include nights with international DJs, exclusive private parties and luxury bottle service. ${items.length} premium events available. Book VIP table via WhatsApp +39 351 912 7047 — reply guaranteed in 10 minutes.`}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            tr(locale, 'Special Events Milan', 'Eventi Speciali Milano'),
            tr(locale, 'VIP Nights Milan', 'Serate VIP'),
            tr(locale, 'Exclusive Parties', 'Party Esclusivi'),
            'VIP Tables',
            tr(locale, 'Bottle Service Milan', 'Bottle Service'),
            tr(locale, 'International DJs Milan', 'DJ Internazionali'),
          ].map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        {/* H2: Why These Events Are Special */}
        <h2 className="font-serif text-3xl text-white mb-6">
          {tr(locale, 'Why These Events Are Different', 'Perché Questi Eventi Sono Unici')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, 'DJ & Lineup', 'DJ & Lineup')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(locale, 'Only selected artists: from resident DJs to the most important international headliners. Each night is a production of its own.', 'Solo artisti selezionati: da residenti ai più importanti DJ internazionali del momento. Ogni serata è una produzione a sé.')}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, 'Luxury Venues', 'Location di Lusso')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(locale, 'Just Me Milano, Voya Rooftop, Pineta Milano and the most exclusive clubs in the city. Environments curated to the smallest detail.', 'Just Me Milano, Voya Rooftop, Pineta Milano e i club più esclusivi della città. Ambienti curati nei minimi dettagli.')}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, 'Guaranteed VIP Table', 'VIP Table Garantita')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(locale, 'Priority booking, best position in the room, dedicated bottle service and reserved entry. Uncompromising experience.', 'Prenotazione prioritaria, migliore posizione in sala, bottle service dedicato e ingresso riservato. Esperienza senza compromessi.')}
            </p>
          </div>
        </div>
      </section>

      {/* Discovery Grid */}
      <DiscoveryGrid
        items={items}
        lang={locale}
        title={t.gridTitle}
        subtitle={t.gridSubtitle}
      />

      {/* H2: How to Book a Special Event */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <h2 className="font-serif text-3xl text-white mb-8">
          {tr(locale, 'How to Book a Special Event in Milan', 'Come Prenotare un Evento Speciale a Milano')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, '1. Contact Us', '1. Contattaci')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(locale, 'WhatsApp +39 351 912 7047 or email. Tell us the event, number of people and your preferences. Reply in 10 minutes.', 'WhatsApp +39 351 912 7047 o email. Dicci l\'evento, il numero di persone e le tue preferenze. Risposta in 10 minuti.')}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, '2. We Choose Together', '2. Scegliamo Insieme')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(locale, 'We propose the best options based on budget and type of evening. VIP tables, guestlist or complete packages.', 'Ti proponiamo le opzioni migliori in base al budget e al tipo di serata. Tavoli VIP, guestlist o pacchetti completi.')}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, '3. Enjoy the Night', '3. Vivi la Serata')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(locale, 'You arrive, your table is ready. The service is managed directly by the venue. We remain available for any need.', 'Arrivi, il tuo tavolo è pronto. Il servizio è gestito direttamente dal locale. Noi restiamo disponibili per qualsiasi necessità.')}
            </p>
          </div>
        </div>

        {/* Gallery: 5 images */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { src: '/images/milan-vip-event-luxury-nightclub-2026.webp', alt: 'Milan VIP event luxury nightclub 2026 exclusive party' },
            { src: '/images/milan-nightclub-bottle-service-vip-table.webp', alt: 'Milan nightclub bottle service VIP table special event' },
            { src: '/images/milan-just-me-vip-tables-nightclub-2026.webp', alt: 'Just Me Milano VIP tables special event 2026' },
            { src: '/images/milan-voya-rooftop-exclusive-party.webp', alt: 'Voya Rooftop Milan exclusive party special evening' },
            { src: '/images/milan-nightclub-luxury-vip-champagne.webp', alt: 'Milan luxury nightclub VIP champagne special night' },
          ].map((img, i) => (
            <div key={i} className="relative h-32 rounded-xl overflow-hidden border border-white/8">
              <Image src={img.src} alt={img.alt} fill quality={85} className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
            </div>
          ))}
        </div>
      </section>

      {/* H2: Who Attends VIP Events in Milan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/5">
        <h2 className="font-serif text-3xl text-white mb-6">
          {tr(locale, 'Who Attends VIP Events in Milan', 'Chi Frequenta gli Eventi VIP a Milano')}
        </h2>
        <p className="text-white/40 mb-8 max-w-3xl">
          {tr(locale, 'Milan\'s special events attract an international clientele: managers, entrepreneurs, models, celebrities and luxury tourists. The dress code is strict and the atmosphere is impeccable.', 'Gli eventi speciali di Milano attraggono una clientela internazionale: manager, imprenditori, modelle, celebrities e turisti di lusso. Il dress code è rigoroso e l\'ambiente è impeccabile.')}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: tr(locale, 'Nationalities', 'Nazionalità'), value: '30+' },
            { label: tr(locale, 'Average Age', 'Età Media'), value: '25–40' },
            { label: tr(locale, 'Dress Code', 'Dress Code'), value: tr(locale, 'Smart Elegant', 'Smart Elegante') },
            { label: tr(locale, 'Avg Table Spend', 'Spesa Media Tavolo'), value: '€500+' },
          ].map((stat, i) => (
            <div key={i} className="p-5 rounded-xl border border-white/8 bg-white/[0.02] text-center">
              <p className="font-serif text-2xl text-champagne mb-1">{stat.value}</p>
              <p className="font-sans text-white/40 text-xs tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={`${lp}/vip-tables`}
            className="px-6 py-3 rounded-full border border-champagne/30 text-champagne text-sm font-medium tracking-wider hover:bg-champagne hover:text-black transition-colors">
            {tr(locale, 'VIP Tables Guide', 'VIP Tables')}
          </Link>
          <Link href={`${lp}/concierge`}
            className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium tracking-wider hover:border-champagne hover:text-champagne transition-colors">
            {tr(locale, 'Concierge Service', 'Servizio Concierge')}
          </Link>
          <Link href={`${lp}/calendar/this-week`}
            className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium tracking-wider hover:border-champagne hover:text-champagne transition-colors">
            {tr(locale, 'All Events', 'Tutti gli Eventi')}
          </Link>
        </div>
      </section>
    </main>
  );
}
