import OctoberEntry from '@/components/OctoberEntry';
import { Metadata } from 'next';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import { generateEventListSchema, jsonLdString } from '@/lib/seo';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import { seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';
import { PrioritySixShowcase, VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';

// ISR Configuration
export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = seoTitle(
    tr(
      locale,
      `Special & VIP Events in Milan Autumn/Winter 2026 & NYE 2027 | Nightlife Milan`,
      `Eventi Speciali e VIP a Milano Autunno/Inverno 2026 & Capodanno 2027 | Nightlife Milan`,
    ),
  );
  const description = withWhatsApp(
    tr(
      locale,
      `Discover Milan's most exclusive VIP events for Autumn/Winter 2026 & New Year's Eve 2027: NYE 2027, Halloween, Fashion Week, Fuorisalone, F1 Monza, San Siro Inter & AC Milan Afterparties & Concerts. Book VIP table via WhatsApp +39 351 912 7047.`,
      `Scopri gli eventi speciali e VIP a Milano per Autunno/Inverno 2026 & Capodanno 2027: Capodanno 2027, Halloween, Fashion Week, Fuorisalone, GP F1 Monza, Dopo-Partita San Siro (Inter & Milan) e Concerti. Prenota tavolo VIP su WhatsApp +39 351 912 7047.`,
    ),
    locale,
  );

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/events/special`;

  return {
    title,
    description,
    keywords: [
      'special events milan',
      'vip events milan autumn winter 2026',
      'new years eve 2027 milan clubs',
      'capodanno 2027 milano discoteche',
      'halloween milano 2026',
      'milan fashion week parties',
      'fuorisalone design week parties',
      'f1 monza afterparty milan',
      'dopo partita san siro inter milan',
      'afterparty concerti san siro ippodromo aria club',
      'eventi speciali milano',
      'serate esclusive milano',
    ],
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/events/special'),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [{ url: `${baseUrl}/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp` }],
    },
  };
}

const MAJOR_SPECIAL_EVENTS = [
  {
    badgeIt: '31 Dicembre · Gran Galà',
    badgeEn: 'December 31 · Grand Gala',
    titleIt: 'Capodanno 2027 a Milano (Cenone + Tavolo VIP)',
    titleEn: 'New Year’s Eve 2027 in Milan (Gala Dinner + VIP Table)',
    venuesIt: '1. Just Me Torre Branca · 2. Pineta Club · 3. Aria Club · 4. 55 Milano · 5. Voya Rooftop 20° Piano · 6. Repvblic',
    venuesEn: '1. Just Me Torre Branca · 2. Pineta Club · 3. Aria Club · 4. 55 Milano · 5. Voya Rooftop 20th Floor · 6. Repvblic',
    descIt:
      'La notte più richiesta dell’anno con 3 formule ufficiali: Royal Buffet Imperiale (da 60–90€), Gran Cenone Servito con Live Show (da 130–250€) e Tavolo VIP Dopocena dalle 23:30 alle 06:00 (da 400€ a 5.000€+ con 100% in champagne e superalcolici).',
    descEn:
      'The most anticipated night of the year with 3 official packages: Imperial Buffet (€60–€90), Seated Gala Dinner Show (€130–€250), and After-Midnight VIP Table from 23:30 to 06:00 (€400 to €5,000+ with 100% champagne & spirits credit).',
  },
  {
    badgeIt: '31 Ottobre · Peak Autunnale',
    badgeEn: 'October 31 · Autumn Peak',
    titleIt: 'Halloween Night Milano 2026',
    titleEn: 'Halloween Night Milan 2026',
    venuesIt: 'Just Me · Pineta Club · Aria Club San Siro · 55 Milano · Voya Rooftop · Repvblic',
    venuesEn: 'Just Me · Pineta Club · Aria Club San Siro · 55 Milano · Voya Rooftop · Repvblic',
    descIt:
      'Allestimenti scenografici, performer internazionali, Dinner Show a tema e sold-out garantito in tutti i 6 club prioritari. Prenotazione Tavoli VIP consigliata con almeno 10 giorni di anticipo.',
    descEn:
      'Immersive stage production, international performers, themed Dinner Shows, and guaranteed sell-out across all 6 priority clubs. VIP Table booking recommended at least 10 days ahead.',
  },
  {
    badgeIt: 'Settembre & Febbraio',
    badgeEn: 'September & February',
    titleIt: 'Milano Fashion Week (MFW VIP Aftershows)',
    titleEn: 'Milan Fashion Week (MFW VIP Aftershows)',
    venuesIt: 'Just Me Milano · Armani/Privé · Voya Rooftop · Repvblic · Pineta',
    venuesEn: 'Just Me Milano · Armani/Privé · Voya Rooftop · Repvblic · Pineta',
    descIt:
      'Le settimane della moda trasformano Milano nella capitale mondiale del jet-set: afterparty di sfilate, modelle, buyer, designer e guest DJ internazionali ogni sera dal Lunedì alla Domenica.',
    descEn:
      'Fashion Week turns Milan into the global jet-set capital: runway afterparties, models, buyers, designers, and international guest DJs every single night from Monday to Sunday.',
  },
  {
    badgeIt: 'Aprile · Salone del Mobile',
    badgeEn: 'April · Salone del Mobile',
    titleIt: 'Fuorisalone & Milano Design Week',
    titleEn: 'Fuorisalone & Milan Design Week',
    venuesIt: '55 Milano Sempione · Voya Rooftop 20° Piano · Just Me Parco Sempione · Aria Club',
    venuesEn: '55 Milano Sempione · Voya Rooftop 20th Floor · Just Me Parco Sempione · Aria Club',
    descIt:
      'Installazioni artistiche, cocktail party al tramonto sui rooftop panoramici e showcase elettronici/house con oltre 400.000 visitatori internazionali in città.',
    descEn:
      'Art installations, sunset rooftop cocktail parties, and international electronic/house showcases with over 400,000 design visitors in town.',
  },
  {
    badgeIt: 'Settembre · Paddock & Drivers Night',
    badgeEn: 'September · Paddock & Drivers Night',
    titleIt: 'Gran Premio Formula 1 Monza — Official Weekend',
    titleEn: 'Formula 1 Italian Grand Prix Monza — VIP Weekend',
    venuesIt: 'Just Me Torre Branca · Voya Rooftop · Pineta Club · Repvblic',
    venuesEn: 'Just Me Torre Branca · Voya Rooftop · Pineta Club · Repvblic',
    descIt:
      'Il weekend del GP d’Italia porta team, sponsor, piloti e appassionati internazionali nei Super Privé Console di Milano con bottle show di Dom Pérignon e Armand de Brignac.',
    descEn:
      'The Italian Grand Prix weekend brings F1 teams, sponsors, drivers, and international hospitality guests into Milan’s DJ Console Super Privés with Dom Pérignon and Armand de Brignac bottle shows.',
  },
  {
    badgeIt: 'Serie A · Champions League · Derby',
    badgeEn: 'Serie A · Champions League · Derby',
    titleIt: 'Dopo-Partita Calcio San Siro (Inter & AC Milan)',
    titleEn: 'San Siro Football Afterparties (Inter & AC Milan)',
    venuesIt: 'Aria Club (a 150m dallo Stadio!) · Just Me 7/7 · Voya Rooftop (M5 Portello) · 55 Milano (M5) · Pineta · Repvblic',
    venuesEn: 'Aria Club (150m from Stadium!) · Just Me 7/7 · Voya Rooftop (M5 Portello) · 55 Milano (M5) · Pineta · Repvblic',
    descIt:
      'Terzo Tempo VIP per i big match di FC Internazionale e AC Milan (Serie A, Martedì/Mercoledì di Champions League, Coppa Italia e Derby della Madonnina): vai a piedi da Aria Club (150m) o in pochi minuti da Just Me 7/7 e Voya Rooftop.',
    descEn:
      'VIP Third Half for FC Internazionale and AC Milan fixtures (Serie A, Tue/Wed Champions League, Coppa Italia, and Derby della Madonnina): walk 150m to Aria Club or reach Just Me 7/7 and Voya Rooftop in minutes.',
  },
  {
    badgeIt: 'A 150 Metri dai Cancelli',
    badgeEn: '150 Meters from Stadium Gates',
    titleIt: 'Afterparty Concerti Stadio San Siro & Ippodromo La Maura / Snai',
    titleEn: 'San Siro Stadium & Ippodromo Concert Afterparties (Aria Club at 150m)',
    venuesIt: 'Aria Club Milano (Piazzale dello Sport 14 — 2 min a piedi) · 55 Milano · Just Me 7/7',
    venuesEn: 'Aria Club Milano (Piazzale dello Sport 14 — 2-min walk) · 55 Milano · Just Me 7/7',
    descIt:
      'Alla fine dei grandi concerti a San Siro e agli Ippodromi Snai/La Maura, evita 90 minuti di coda in metro o taxi: attraversa Piazzale dello Sport a piedi e continua la festa da Aria Club Milano (a 150 metri) fino alle 05:00.',
    descEn:
      'When major concerts end at San Siro Stadium or Ippodromo Snai/La Maura, skip the 90-minute metro and taxi bottleneck: walk 150 meters across Piazzale dello Sport and party at Aria Club Milano until 05:00.',
  },
];

export default async function SpecialEventsPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const allItems = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale);
  const items = allItems.filter(({ event: e }) => {
    if (!isUpcomingRome(e.dateISO)) return false;
    const isSpecialFlag = e.isSpecial === true;
    const isHighSpend = e.pricing.tableMinSpend !== null && e.pricing.tableMinSpend > 500;
    return isSpecialFlag || isHighSpend;
  });

  const t = {
    title: tr(
      locale,
      `Special & VIP Events — Autumn/Winter 2026 & NYE 2027`,
      `Eventi Speciali & VIP — Autunno/Inverno 2026 & Capodanno 2027`,
    ),
    intro: tr(
      locale,
      `The pinnacle of Milanese nightlife for Autumn/Winter 2026 and New Year's Eve 2027. From New Year's Eve 2027 Gala Nights, Halloween, Milan Fashion Week, Fuorisalone Design Week, and Monza F1 GP to San Siro Football Afterparties (Inter & AC Milan) and Stadium Concert Afterparties across our 6 priority clubs (1. Just Me, 2. Pineta, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic).`,
      `L'apice della vita notturna milanese per l'Autunno/Inverno 2026 e il Capodanno 2027. Dal Gran Galà di Capodanno 2027, Halloween, Milano Fashion Week, Fuorisalone Design Week e GP Formula 1 Monza fino al Dopo-Partita Calcio San Siro (Inter & AC Milan) e agli Afterparty dei Concerti allo Stadio e Ippodromo nei 6 club prioritari (1. Just Me, 2. Pineta, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic).`,
    ),
    gridTitle: tr(locale, `Exclusive & Special Events`, `Eventi Esclusivi in Programma`),
    gridSubtitle: tr(locale, 'The premium selection for your nights', 'La selezione premium per le tue serate'),
  };

  const eventListSchema =
    items.length > 0
      ? generateEventListSchema(
          items,
          locale,
          tr(
            locale,
            'Special & VIP Events in Milan Autumn/Winter 2026 & NYE 2027',
            'Eventi Speciali e VIP a Milano Autunno/Inverno 2026 & Capodanno 2027',
          ),
        )
      : null;

  return (
    <main className="flex-1 bg-[#131009] w-full pt-20">
      {eventListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(eventListSchema) }} />
      )}
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-white/40" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href={lp || '/'} className="hover:text-champagne transition-colors">
                Home
              </a>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <a href={`${lp}/events`} className="hover:text-champagne transition-colors">
                {tr(locale, 'Events', 'Eventi')}
              </a>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">
              {tr(locale, 'Special', 'Speciali')}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-champagne mb-6 tracking-tight">{t.title}</h1>
        <div className="max-w-3xl mb-8">
          <p className="text-white/70 leading-relaxed font-light">{t.intro}</p>
        </div>

        {/* AI Trafiletto */}
        <div className="max-w-3xl mb-8 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04] text-left">
          <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
          <p className="font-sans text-white/75 text-sm leading-relaxed">
            {isIt
              ? `Gli eventi speciali e VIP a Milano per Autunno/Inverno 2026 e Capodanno 2027 comprendono Capodanno 2027, Halloween, Milano Fashion Week, Fuorisalone Design Week, GP F1 Monza, Dopo-Partita Calcio San Siro (Inter & Milan) e Afterparty Concerti (Aria Club a 150m). ${items.length} eventi premium attivi nei 6 club prioritari. Prenota VIP table via WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com — risposta in 10 minuti.`
              : `Special and VIP events in Milan for Autumn/Winter 2026 & NYE 2027 include New Year's Eve 2027, Halloween, Milan Fashion Week, Fuorisalone Design Week, F1 Monza GP, San Siro Football Afterparties (Inter & AC Milan) and Concert Afterparties (Aria Club at 150m). ${items.length} premium events available across our 6 priority clubs. Book VIP table via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com — reply in 10 minutes.`}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            tr(locale, 'NYE 2027 Milan', 'Capodanno 2027 Milano'),
            tr(locale, 'Halloween 2026', 'Halloween 2026'),
            tr(locale, 'Milan Fashion Week', 'Milano Fashion Week'),
            tr(locale, 'Fuorisalone Design Week', 'Fuorisalone Design Week'),
            tr(locale, 'Monza F1 GP', 'GP Formula 1 Monza'),
            tr(locale, 'San Siro Inter & Milan Afterparty', 'Dopo-Partita San Siro Inter & Milan'),
            tr(locale, 'San Siro Concerts (Aria 150m)', 'Concerti San Siro (Aria a 150m)'),
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs font-sans tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Grandi Eventi Speciali di Milano 2026/2027 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-8">
          <p className="font-sans text-champagne text-[10px] font-bold uppercase tracking-[0.28em] mb-2">
            {tr(
              locale,
              'MAJOR MILAN PEAK DATES · 2026 / 2027 OFFICIAL GUIDE',
              'GRANDI EVENTI SPECIALI DI MILANO · GUIDA UFFICIALE 2026 / 2027',
            )}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
            {tr(
              locale,
              'Major Special Events in Milan 2026/2027: NYE 2027, Fashion Week, San Siro Football & Concerts',
              'I Grandi Eventi Speciali di Milano 2026/2027: Capodanno 2027, Fashion Week, Calcio San Siro e Concerti',
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MAJOR_SPECIAL_EVENTS.map((ev) => (
            <div
              key={ev.titleEn}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col justify-between hover:border-champagne/40 transition-colors"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-champagne/15 border border-champagne/30 text-champagne text-[10px] font-bold uppercase tracking-wider mb-3">
                  {isIt ? ev.badgeIt : ev.badgeEn}
                </span>
                <h3 className="font-serif text-2xl text-white font-bold mb-2">
                  {isIt ? ev.titleIt : ev.titleEn}
                </h3>
                <p className="text-xs text-champagne/85 font-medium mb-3">
                  {isIt ? ev.venuesIt : ev.venuesEn}
                </p>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-5">
                  {isIt ? ev.descIt : ev.descEn}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <Link
                  href={`${lp}/football-afterparties`}
                  className="text-xs font-semibold text-white/75 hover:text-champagne transition-colors"
                >
                  {tr(locale, 'San Siro & VIP Info →', 'Info San Siro & VIP →')}
                </Link>
                <a
                  href={`https://wa.me/393519127047?text=${encodeURIComponent(
                    isIt
                      ? `Ciao! Vorrei informazioni e prezzi Tavoli VIP per: ${ev.titleIt}`
                      : `Hi! I would like VIP Table info and pricing for: ${ev.titleEn}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-champagne text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  WhatsApp +39 351 912 7047
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Discovery Grid */}
      <DiscoveryGrid items={items} lang={locale} title={t.gridTitle} subtitle={t.gridSubtitle} />

      {/* Priority 6 Showcase & VIP Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PrioritySixShowcase locale={locale} />
        <VipQuoteCalculator locale={locale} />
      </div>

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
              {tr(
                locale,
                'WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com. Tell us the event, number of people and your preferences. Reply in 10 minutes.',
                "WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com. Dicci l'evento, il numero di persone e le tue preferenze. Risposta in 10 minuti.",
              )}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, '2. We Choose Together', '2. Scegliamo Insieme')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(
                locale,
                'We propose the best options across our 6 priority clubs based on budget and occasion. VIP tables, Gala Dinners or complete packages.',
                'Ti proponiamo le opzioni migliori nei 6 club prioritari in base al budget e al tipo di serata. Tavoli VIP, Cenoni o pacchetti completi.',
              )}
            </p>
          </div>
          <div className="p-6 rounded-lg border border-white/8 bg-white/[0.02]">
            <h3 className="font-sans text-champagne text-xs font-bold tracking-widest uppercase mb-3">
              {tr(locale, '3. Enjoy the Night', '3. Vivi la Serata')}
            </h3>
            <p className="font-sans text-white/50 text-sm leading-relaxed">
              {tr(
                locale,
                'You arrive, skip the line with the VIP Hostess and your table is ready. We remain available 7/7 for any need.',
                'Arrivi, salti la fila con la Hostess VIP e il tuo tavolo è pronto. Restiamo disponibili 7/7 per qualsiasi necessità.',
              )}
            </p>
          </div>
        </div>

        {/* Gallery: 5 images */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { src: '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp', alt: 'Milan VIP event luxury nightclub exclusive party' },
            { src: '/images/milan-nightclub-bottle-service-vip-table.webp', alt: 'Milan nightclub bottle service VIP table special event' },
            { src: '/images/milan-just-me-vip-tables-nightclub-2026.webp', alt: 'Just Me Milano VIP tables special event' },
            { src: '/images/milan-voya-rooftop-exclusive-party.webp', alt: 'Voya Rooftop Milan exclusive party special evening' },
            { src: '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp', alt: 'Milan luxury nightclub VIP champagne special night' },
          ].map((img, i) => (
            <div key={i} className="relative h-32 rounded-xl overflow-hidden border border-white/8">
              <Image src={img.src} alt={img.alt} fill quality={85} className="object-cover" sizes="(max-width: 768px) 50vw, 20vw" />
            </div>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`${lp}/football-afterparties`}
            className="px-6 py-3 rounded-full bg-champagne text-black text-sm font-bold tracking-wider hover:bg-white transition-colors"
          >
            {tr(locale, 'San Siro Match Afterparties', 'Dopo-Partita Calcio San Siro')}
          </Link>
          <Link
            href={`${lp}/vip-tables`}
            className="px-6 py-3 rounded-full border border-champagne/30 text-champagne text-sm font-medium tracking-wider hover:bg-champagne hover:text-black transition-colors"
          >
            {tr(locale, 'VIP Tables Guide', 'Guida Tavoli VIP')}
          </Link>
          <Link
            href={`${lp}/concierge`}
            className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium tracking-wider hover:border-champagne hover:text-champagne transition-colors"
          >
            {tr(locale, 'Concierge Service', 'Servizio Concierge')}
          </Link>
          <Link
            href={`${lp}/events`}
            className="px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium tracking-wider hover:border-champagne hover:text-champagne transition-colors"
          >
            {tr(locale, 'All Events', 'Tutti gli Eventi')}
          </Link>
        </div>
      </section>
            <OctoberEntry locale={locale} />
        <EditorialPageSections locale={locale as LocaleCode} path={`${lp}/events/special`} />
      </main>
  );
}
