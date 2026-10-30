import { Metadata } from 'next';
import OctoberEntry from '@/components/OctoberEntry';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { getLocalizedText, generateEventListSchema, jsonLdString } from '@/lib/seo';
import Link from 'next/link';
import Image from 'next/image';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';
import {
  WeeklyNightlifeNavigator,
  EntryFormulaMatrix,
  VipQuoteCalculator,
  PrioritySixShowcase,
} from '@/components/NightlifeExpansionModules';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isIt = locale === 'it';
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/events`;
  const title = seoTitle(
    tr(
      locale,
      'All Events in Milan Autumn/Winter 2026 & NYE 2027 | Nightlife Milan',
      'Tutti gli Eventi a Milano Autunno/Inverno 2026 & Capodanno 2027 | Nightlife Milan',
    ),
  );
  const description = withWhatsApp(
    tr(
      locale,
      'Discover all events, club nights and VIP experiences in Milan for Autumn/Winter 2026 & New Year’s Eve 2027: Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop & Repvblic. Book VIP table or guestlist via WhatsApp +39 351 912 7047.',
      'Scopri tutti gli eventi, serate ed esperienze VIP a Milano per Autunno/Inverno 2026 & Capodanno 2027: Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop e Repvblic. Prenota tavolo VIP o guestlist su WhatsApp +39 351 912 7047.',
    ),
    locale,
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, '/events'),
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`,
          width: 1200,
          height: 630,
          alt: tr(locale, 'Milan nightlife events Autumn/Winter 2026 & NYE 2027', 'Eventi Milano vita notturna Autunno/Inverno 2026 e Capodanno 2027'),
        },
      ],
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: isIt ? 'it_IT' : 'en_US',
    },
    keywords: isIt
      ? [
          'eventi milano',
          'serate milano autunno inverno 2026',
          'capodanno 2027 milano discoteche',
          'eventi club milano',
          'dopo partita san siro inter milan',
          'guestlist eventi milano',
          'tavoli vip milano',
        ]
      : [
          'milan events',
          'milan nightlife autumn winter 2026',
          'new years eve 2027 milan clubs',
          'club events milan',
          'san siro football afterparty inter ac milan',
          'guestlist events milan',
          'vip tables milan',
        ],
    robots: seoRobots(locale),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`],
      site: '@nightlifemilan',
    },
  };
}

export default async function EventsHubPage({ params }: Props) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  // Confine giorno nel fuso di Roma, non del server (UTC su Vercel):
  // mai mostrare eventi già passati.
  const allItems = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale);
  const items = allItems.filter(({ event }) => isUpcomingRome(event.dateISO));

  // Special events
  const specialItems = items.filter((i) => i.event.isSpecial);

  const eventListSchema =
    items.length > 0
      ? generateEventListSchema(
          items,
          locale,
          tr(
            locale,
            'Milan Events Autumn/Winter 2026 & NYE 2027',
            'Eventi Milano Autunno/Inverno 2026 & Capodanno 2027',
          ),
        )
      : null;

  const faqs = isIt
    ? [
        {
          q: 'Quali sono i 6 club prioritari per gli eventi a Milano in Autunno/Inverno 2026 e Capodanno 2027?',
          a: 'L’ordine ufficiale di priorità scelto dal Concierge Nightlife Milan è: 1. Just Me Milano (Parco Sempione, aperto 7/7), 2. Pineta Club Milano (Corso Como/Via Messina, celebre per l’Aperitivo Cantato del venerdì e sabato), 3. Aria Club Milano (San Siro Piazzale dello Sport 14, a 150m dallo Stadio), 4. 55 Milano (Arco della Pace/Sempione, Apericena XL e Dinner Show), 5. Voya Rooftop (20° piano vista skyline in zona Isola/Portello) e 6. Repvblic Milano (Piazza Repubblica, celebre per il Dirty Monday e i weekend House/Hip-Hop).',
        },
        {
          q: 'Qual è la differenza tra Lista Nominale QR, Royal Aperitivo, Dinner Show e Tavolo VIP?',
          a: 'Il Royal Aperitivo (19:30–22:30, 15–30€) include buffet o tapas con drink e tavolo d’appoggio fino alle 23:00. La Cena Cantata / Dinner Show (20:30–00:00, 50–90€) offre cena servita con spettacolo musicale e tavolo garantito. La Lista Nominale o QR (23:30–00:45, 15–25€) consente l’ingresso per ballare in pista con selezione alla porta. Il Tavolo VIP (da 250€ a 5.000€+, 100% convertito in bottiglie) garantisce ingresso salta-fila con Hostess VIP e divanetto riservato fino alle 05:00.',
        },
        {
          q: 'Dove uscire la sera dopo una partita di Serie A o Champions League di Inter e AC Milan a San Siro?',
          a: 'Per il Dopo-Partita di San Siro (Inter, AC Milan, Derby della Madonnina e Champions League), il club più vicino a piedi è Aria Club Milano (a soli 150 metri dallo stadio in Piazzale dello Sport 14, zero taxi e zero attesa). Con la metro M5 Lilla raggiungi in 4 minuti Voya Rooftop (20° piano, fermata Portello), in 6 minuti 55 Milano (Domodossola/Gerusalemme) e in 12 minuti Pineta Club (Garibaldi/Cenisio), mentre in 10 minuti d’auto sei da Just Me Milano sotto la Torre Branca (aperto 7 sere su 7, anche martedì e mercoledì di Champions).',
        },
        {
          q: 'Quali sono le regole di Dress Code per entrare agli eventi nei club di Milano?',
          a: 'Nei club esclusivi di Milano (Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic) vige un dress code Smart Elegant: camicia o polo curata per gli uomini, pantaloni lunghi e scarpe eleganti o sneaker di lusso pulite; abito o outfit ricercato per le donne. Dopo una partita a San Siro o un concerto, non sono ammesse maglie da calcio, sciarpe da tifoso o tute sportive dopo le 23:00.',
        },
        {
          q: 'Come funziona la prenotazione per Capodanno 2027, Fashion Week, Fuorisalone e Halloween?',
          a: 'Per i grandi eventi speciali (Halloween, Capodanno 2027, Milano Fashion Week, Fuorisalone Design Week, GP F1 Monza e Derby di Milano) la richiesta supera la capienza dei locali. Consigliamo di bloccare il Tavolo VIP o il Cenone con 7–21 giorni di anticipo scrivendo al Concierge WhatsApp +39 351 912 7047 o a concierge@nightlifemilan.com.',
        },
        {
          q: 'Il servizio Concierge di Nightlife Milan ha costi aggiuntivi?',
          a: 'No, il servizio ufficiale di Nightlife Milan è 100% gratuito per gli ospiti. Paghi esclusivamente il listino ufficiale direttamente alla cassa del locale, ricevendo in più assistenza prioritaria in meno di 10 minuti su WhatsApp (+39 351 912 7047), planimetria dei tavoli e consigli imparziali sulla serata più adatta al tuo gruppo.',
        },
      ]
    : [
        {
          q: 'What are the 6 priority clubs for events in Milan during Autumn/Winter 2026 & NYE 2027?',
          a: 'Nightlife Milan’s official priority ranking is: 1. Just Me Milano (Parco Sempione, open 7 nights a week), 2. Pineta Club Milano (Corso Como/Via Messina, famous for its Friday & Saturday Singing Aperitivo), 3. Aria Club Milano (San Siro Piazzale dello Sport 14, 150m from the Stadium), 4. 55 Milano (Arco della Pace/Sempione, XXL Apericena & Dinner Show), 5. Voya Rooftop (20th-floor skyline lounge in Isola/Portello), and 6. Repvblic Milano (Piazza Repubblica, iconic for Dirty Monday and House/Hip-Hop weekends).',
        },
        {
          q: 'What is the difference between QR Guestlist, Royal Aperitivo, Dinner Show, and VIP Table?',
          a: 'Royal Aperitivo (19:30–22:30, €15–€30) includes gourmet buffet/tapas, a drink, and a reserved support table until 23:00. Singing Dinner Show (20:30–00:00, €50–€90) offers a seated dinner with live show and guaranteed table. Nominal/QR Guestlist (23:30–00:45, €15–€25) grants standing club entry subject to door selection. A VIP Table (€250 to €5,000+, 100% converted into bottle credit) guarantees skip-the-line Hostess entry and a private booth until 05:00.',
        },
        {
          q: 'Where should we go after an Inter or AC Milan match or concert at San Siro Stadium?',
          a: 'For San Siro football afterparties (Inter, AC Milan, Derby della Madonnina, and Champions League), Aria Club Milano is just 150 meters on foot from the stadium gates in Piazzale dello Sport 14. Via the M5 Purple metro line you can reach Voya Rooftop (20th floor, Portello stop) in 4 minutes, 55 Milano in 6 minutes, and Pineta Club in 12 minutes, while Just Me Milano (open 7/7, including Tuesday/Wednesday Champions League nights) is 10 minutes away by taxi/NCC.',
        },
        {
          q: 'What is the Dress Code for Milan nightclubs and special events?',
          a: 'Milan’s top venues (Just Me, Pineta, Aria, 55 Milano, Voya Rooftop, Repvblic) enforce a Smart Elegant dress code: collared shirts or smart polos, tailored trousers, and dress shoes or clean luxury sneakers for men; chic eveningwear for women. On matchdays, football jerseys, team scarves, and tracksuits are strictly prohibited inside VIP clubs after 23:00.',
        },
        {
          q: 'How far in advance should we book for New Year’s Eve 2027, Fashion Week, or Design Week?',
          a: 'For major seasonal peaks (Halloween, New Year’s Eve 2027, Milan Fashion Week, Fuorisalone Design Week, Monza F1 GP, and Derby nights), VIP booths sell out early. Contact our VIP Concierge Desk 7–21 days ahead via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com.',
        },
        {
          q: 'Does the Nightlife Milan Concierge service charge any extra fees?',
          a: 'Never. Our official concierge service is 100% free of charge. You pay the exact official venue menu price directly at the club while enjoying <10-minute WhatsApp assistance (+39 351 912 7047), real-time floorplans, and priority door coordination.',
        },
      ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  const categoryLinks = [
    { href: `${lp}/events/tonight`, label: tr(locale, 'Tonight', 'Stasera'), highlight: true },
    { href: `${lp}/events/this-week`, label: tr(locale, 'This Week', 'Questa Settimana') },
    { href: `${lp}/events/special`, label: tr(locale, 'Special & VIP', 'Eventi Speciali & VIP') },
    { href: `${lp}/events/best`, label: tr(locale, 'Best 6 Clubs', 'I 6 Migliori Club') },
    { href: `${lp}/events/18-plus`, label: tr(locale, '18+ Nights', 'Serate 18+') },
    { href: `${lp}/events/21-plus`, label: tr(locale, '21+ & 25+ Clubbing', 'Serate 21+ & 25+') },
    { href: `${lp}/events/international`, label: tr(locale, 'International Crowd', 'Pubblico Internazionale') },
    { href: `${lp}/events/university-erasmus`, label: tr(locale, 'University & Erasmus', 'Università & Erasmus') },
    { href: `${lp}/football-afterparties`, label: tr(locale, 'San Siro Match Afterparties', 'Dopo-Partita Calcio San Siro') },
    { href: `${lp}/rooftops`, label: tr(locale, 'Rooftops & Sky Bars', 'Rooftop Panoramici') },
    { href: `${lp}/private-parties`, label: tr(locale, 'Graduations & Birthdays', 'Lauree & Compleanni') },
    { href: `${lp}/guest-lists`, label: tr(locale, 'Guest Lists & QR', 'Liste Nominali & QR') },
  ];

  const t = {
    hero: tr(
      locale,
      'All Events in Milan — Autumn/Winter 2026 & NYE 2027',
      'Tutti gli Eventi a Milano — Autunno/Inverno 2026 & Capodanno 2027',
    ),
    heroSub: isIt
      ? 'Il calendario ufficiale della vita notturna milanese dal Lunedì alla Domenica: Royal Aperitivo, Dinner Show, serate con DJ internazionali, Dopo-Partita San Siro (Inter & Milan) e Tavoli VIP nei 6 club prioritari di Milano.'
      : "Milan's official nightlife calendar from Monday to Sunday: Royal Aperitivo, Dinner Shows, international DJ headliners, San Siro Football Afterparties (Inter & AC Milan) and VIP Tables across Milan's top 6 priority clubs.",
    quickAnswer: isIt
      ? `A Milano sono attivi ${items.length} eventi verificati per la stagione Autunno/Inverno 2026 e Capodanno 2027 nei 6 club prioritari (1. Just Me 7/7, 2. Pineta Club, 3. Aria Club San Siro, 4. 55 Milano, 5. Voya Rooftop 20° piano, 6. Repvblic). Prenota Lista QR, Aperitivo o Tavolo VIP su WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com (risposta in 10 minuti).`
      : `Milan features ${items.length} verified upcoming events for Autumn/Winter 2026 & New Year's Eve 2027 across our 6 priority clubs (1. Just Me 7/7, 2. Pineta Club, 3. Aria Club San Siro, 4. 55 Milano, 5. Voya Rooftop 20th floor, 6. Repvblic). Book QR Guestlist, Aperitivo or VIP Table via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com (reply in 10 minutes).`,
    upcoming: tr(locale, 'Upcoming Events Calendar', 'Calendario Eventi in Programma'),
    special: tr(locale, 'Special & VIP Nights', 'Serate Speciali & VIP'),
  };

  return (
    <>
      {eventListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(eventListSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqSchema) }} />
      <main className="flex-1 bg-[#131009] w-full pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-white/40" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href={lp || '/'} className="hover:text-champagne transition-colors">
                  Home
                </Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-champagne" aria-current="page">
                {tr(locale, 'Events', 'Eventi')}
              </li>
            </ol>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/10 text-champagne text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
            <span>
              {tr(
                locale,
                'Autumn/Winter 2026 & NYE 2027 Official Calendar',
                'Calendario Ufficiale Autunno/Inverno 2026 & Capodanno 2027',
              )}
            </span>
          </div>
                    <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-8 border border-champagne/25">
            <Image
              src="/images/milan-nightclub-luxury-vip-champagne.webp"
              alt={t.hero}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-champagne tracking-tighter mb-6">
            {t.hero}
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mb-8 font-light leading-relaxed">{t.heroSub}</p>

          {/* AI Quick Answer */}
          <div className="max-w-3xl mb-10 p-6 rounded-xl border border-champagne/25 bg-champagne/[0.04]">
            <p className="font-sans text-champagne text-[10px] font-bold tracking-[0.3em] uppercase mb-2">
              Quick Answer · Concierge Desk
            </p>
            <p className="font-sans text-white/80 text-sm leading-relaxed">{t.quickAnswer}</p>
          </div>

          {/* Complete 12-Category Quick Navigation Bar */}
          <div className="mb-4">
            <p className="font-sans text-white/40 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
              {tr(
                locale,
                'Explore by Category, Age, Matchday & Formula',
                'Esplora per Categoria, Età, Dopo-Partita e Formula',
              )}
            </p>
            <div className="flex gap-2.5 flex-wrap">
              {categoryLinks.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className={
                    cat.highlight
                      ? 'px-5 py-2.5 rounded-full bg-champagne text-black font-bold tracking-wider uppercase text-xs hover:bg-white transition-colors'
                      : 'px-4 py-2.5 rounded-full border border-white/15 bg-white/[0.02] text-white/80 hover:border-champagne hover:text-champagne transition-colors font-medium tracking-wider uppercase text-xs'
                  }
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <OctoberEntry locale={locale} />

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
              {specialItems.slice(0, 3).map((item) => {
                const title = getLocalizedText(item.event.localizedContent.title, locale);
                const slug = getLocalizedText(item.event.localizedContent.slug, locale);
                const venueName = getLocalizedText(item.venue.localizedContent.name, locale);
                const date = new Date(item.event.dateISO).toLocaleDateString(locale, {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  timeZone: 'Europe/Rome',
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
                      <h3 className="font-serif text-lg text-white group-hover:text-champagne transition-colors leading-tight">
                        {title}
                      </h3>
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
          subtitle={tr(
            locale,
            'All curated upcoming events in Milan (Rome timezone verified)',
            'Tutti gli appuntamenti verificati in programma a Milano',
          )}
        />

        {/* Interactive Expansion Modules */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PrioritySixShowcase locale={locale} />
          <WeeklyNightlifeNavigator locale={locale} />
          <EntryFormulaMatrix locale={locale} />
          <VipQuoteCalculator locale={locale} />
        </div>

        {/* 21-Point Editorial SEO Guide + TOC + San Siro Matchday + FAQ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Clickable TOC Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 rounded-2xl border border-champagne/25 bg-white/[0.02] p-6">
                <p className="font-sans text-champagne text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
                  {tr(locale, 'Editorial Guide Index (TOC)', 'Indice Guida Editoriale (TOC)')}
                </p>
                <ol className="space-y-2.5 text-xs sm:text-sm text-white/75">
                  <li>
                    <a href="#guida-6-club-prioritari" className="hover:text-champagne transition-colors">
                      1. {tr(locale, 'The 6 Priority Clubs in Milan', 'I 6 Club Prioritari di Milano')}
                    </a>
                  </li>
                  <li>
                    <a href="#guida-formule-ingresso" className="hover:text-champagne transition-colors">
                      2. {tr(locale, 'Entry Formulas: QR List, Aperitivo, Dinner & VIP', 'Formule d’Ingresso: Lista QR, Aperitivo, Cena e VIP')}
                    </a>
                  </li>
                  <li>
                    <a href="#guida-dopo-partita-san-siro" className="hover:text-champagne transition-colors">
                      3. {tr(locale, 'San Siro Football (Inter & AC Milan) & Concert Afterparties', 'Dopo-Partita Calcio San Siro (Inter & Milan) e Concerti')}
                    </a>
                  </li>
                  <li>
                    <a href="#guida-stagione-2026-2027" className="hover:text-champagne transition-colors">
                      4. {tr(locale, 'Autumn/Winter 2026 & NYE 2027 Peaks', 'Grandi Eventi Autunno/Inverno 2026 & Capodanno 2027')}
                    </a>
                  </li>
                  <li>
                    <a href="#guida-faq-eventi" className="hover:text-champagne transition-colors">
                      5. {tr(locale, 'Frequently Asked Questions (6 Official FAQs)', 'Domande Frequenti (6 FAQ Ufficiali)')}
                    </a>
                  </li>
                </ol>
                <div className="mt-6 pt-5 border-t border-white/10 text-xs text-white/60 space-y-1.5">
                  <p className="text-champagne font-bold uppercase tracking-wider">
                    {tr(locale, 'Official VIP Desk', 'Desk Ufficiale VIP')}
                  </p>
                  <p>WhatsApp: +39 351 912 7047</p>
                  <p>Email: concierge@nightlifemilan.com</p>
                </div>
              </div>
            </aside>

            {/* Editorial Content */}
            <div className="lg:col-span-8 space-y-12">
              <article id="guida-6-club-prioritari" className="scroll-mt-28">
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-4">
                  {tr(
                    locale,
                    '1. Where to Go Out in Milan: The 6 Priority Clubs Selected by Our Concierge',
                    '1. Dove Le Serate nei Club a Milano: I 6 Club Prioritari Scelti dal Concierge',
                  )}
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4">
                  {isIt
                    ? 'Orientarsi tra centinaia di eventi a Milano richiede conoscere la gerarchia reale delle venue più affidabili per qualità del pubblico, sicurezza, impianto audio e gestione dei Tavoli VIP. Per la stagione Autunno/Inverno 2026 e Capodanno 2027 il nostro Concierge opera con accesso diretto nei 6 club prioritari della città:'
                    : 'Navigating hundreds of Milan nightlife events requires knowing the real hierarchy of venues that deliver the best crowd, sound, security, and VIP table hospitality. For Autumn/Winter 2026 and New Year’s Eve 2027, our Concierge operates direct VIP desks across Milan’s 6 priority clubs:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h3 className="font-serif text-lg text-champagne font-bold mb-1">1. Just Me Milano (Parco Sempione)</h3>
                    <p className="text-xs text-white/65 leading-relaxed">
                      {isIt
                        ? 'Aperto 7 sere su 7 sotto la Torre Branca. Firmato Italo Rota, unisce Royal Aperitivo dalle 19:30, cena di gala e club internazionale fino alle 05:00.'
                        : 'Open 7 nights a week beneath Torre Branca. Designed by Italo Rota, combining Royal Aperitivo from 19:30, gala dinner, and international clubbing until 05:00.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h3 className="font-serif text-lg text-champagne font-bold mb-1">2. Pineta Club (Via Messina / Corso Como)</h3>
                    <p className="text-xs text-white/65 leading-relaxed">
                      {isIt
                        ? 'Il re del Venerdì e Sabato con il leggendario Aperitivo Cantato dalle 19:30 seguito dalla notte reggaeton e commerciale più energica di Milano.'
                        : 'King of Friday and Saturday nights with its famous Singing Aperitivo from 19:30 followed by Milan’s highest-energy reggaeton and commercial party.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h3 className="font-serif text-lg text-champagne font-bold mb-1">3. Aria Club Milano (San Siro)</h3>
                    <p className="text-xs text-white/65 leading-relaxed">
                      {isIt
                        ? 'In Piazzale dello Sport 14 (a 150m dallo Stadio Meazza). Aperto da giovedì a sabato con aperitivo a buffet e 3 aree Privé (Pista, Privé Aria, Console DJ).'
                        : 'At Piazzale dello Sport 14 (150m from San Siro Stadium). Open Thursday to Saturday with buffet aperitivo and 3 VIP table zones (Dancefloor, Privé Aria, DJ Console).'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h3 className="font-serif text-lg text-champagne font-bold mb-1">4. 55 Milano (Arco della Pace / Sempione)</h3>
                    <p className="text-xs text-white/65 leading-relaxed">
                      {isIt
                        ? 'Ex deposito ferroviario di 1.000 mq in Via Piero della Francesca 55: imbattibile per Apericena XL, lauree, compleanni, Dinner Show e "The Wall" il sabato.'
                        : '1,000-sqm converted railway depot at Via Piero della Francesca 55: unbeatable for XXL Apericena, graduations, birthdays, Friday Dinner Shows, and Saturday "The Wall".'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h3 className="font-serif text-lg text-champagne font-bold mb-1">5. Voya Rooftop (20° Piano Skyline)</h3>
                    <p className="text-xs text-white/65 leading-relaxed">
                      {isIt
                        ? 'Sky lounge vetrata al 20° piano (Via Achille Papa 30, M5 Portello) con vista a 360° sui grattacieli di CityLife e Porta Nuova dal tramonto alle 04:00.'
                        : '20th-floor glass sky lounge (Via Achille Papa 30, M5 Portello) offering 360° views over CityLife and Porta Nuova skyscrapers from sunset until 04:00.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                    <h3 className="font-serif text-lg text-champagne font-bold mb-1">6. Repvblic Milano (Piazza Repubblica)</h3>
                    <p className="text-xs text-white/65 leading-relaxed">
                      {isIt
                        ? 'Design club contemporaneo celebre per la serata cult "Dirty Monday" del lunedì e per i weekend House, Urban e Hip-Hop ad alto tasso fashion.'
                        : 'Contemporary design club famous for its cult "Dirty Monday" industry night and fashion-forward House, Urban, and Hip-Hop weekends.'}
                    </p>
                  </div>
                </div>
              </article>

              <article id="guida-formule-ingresso" className="scroll-mt-28">
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-4">
                  {tr(
                    locale,
                    '2. Complete Guide to Milan Entry Formulas: QR Guestlist, Royal Aperitivo, Dinner Show & VIP Table',
                    '2. Guida alle Formule d’Ingresso: Lista QR, Royal Aperitivo, Dinner Show e Tavolo VIP',
                  )}
                </h2>
                <div className="space-y-4 text-white/70 text-sm sm:text-base leading-relaxed">
                  <h3 className="font-serif text-xl text-champagne font-semibold">
                    {tr(locale, 'Royal Aperitivo (19:30 – 22:30) & Singing Dinner Show (20:30 – 00:00)', 'Royal Aperitivo (19:30 – 22:30) e Cena Cantata / Dinner Show (20:30 – 00:00)')}
                  </h3>
                  <p>
                    {isIt
                      ? 'La formula più amata a Milano inizia alle 19:30: con 15–30€ a persona accedi al Royal Buffet con drink incluso e tavolo d’appoggio riservato per il tuo gruppo fino alle 22:30/23:00 (perfetto per feste di laurea, compleanni e pre-serata), con possibilità di restare gratuitamente a ballare. Se cerchi un’esperienza seduta più esclusiva, la Cena Cantata / Dinner Show (da Pineta, 55 Milano e Just Me, 50–90€) trasforma la cena in uno spettacolo corale prima del DJ set.'
                      : 'Milan’s signature ritual begins at 19:30: for €15–€30 per person you enjoy the Royal Buffet with a drink and a reserved support table until 22:30/23:00 (ideal for graduations, birthdays, and pre-clubbing), staying inside for the club night at no extra charge. For a full seated experience, the Singing Dinner Show (at Pineta, 55 Milano, and Just Me, €50–€90) turns dinner into a live musical celebration before the main DJ set.'}
                  </p>
                  <h3 className="font-serif text-xl text-champagne font-semibold">
                    {tr(locale, 'Nominal Guestlist / QR Pass vs. Reserved VIP Table (23:30 – 05:00)', 'Lista Nominale / Pass QR vs. Tavolo VIP Riservato (23:30 – 05:00)')}
                  </h3>
                  <p>
                    {isIt
                      ? 'Per chi entra dopo le 23:00 esistono due opzioni: la Lista Nominale o QR Code (cut-off rigoroso entro le 00:30/01:00, ideale per coppie e piccoli gruppi misti vestiti eleganti) oppure il Tavolo VIP con Bottle Service (da 250–350€ in Pista fino a 1.000–3.000€+ nei Super Privé Console). Con il Tavolo VIP il 100% dell’importo è convertito in bottiglie dal menù, salti la fila con Hostess dedicata e hai l’ingresso garantito anche per gruppi numerosi o di soli ragazzi.'
                      : 'For arrivals after 23:00 there are two routes: the Nominal/QR Guestlist (strict cut-off between 00:30 and 01:00, suited for smartly dressed couples and small mixed groups) or a Reserved VIP Table with Bottle Service (from €250–€350 on the Dancefloor up to €1,000–€3,000+ in DJ Console Super Privés). With a VIP Table, 100% of your minimum spend goes toward bottles, you skip the queue via a dedicated VIP Hostess, and door entry is guaranteed even for larger or all-male groups.'}
                  </p>
                </div>
              </article>

              <article id="guida-dopo-partita-san-siro" className="scroll-mt-28">
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-4">
                  {tr(
                    locale,
                    '3. San Siro Football Afterparties (Inter & AC Milan) & Stadium Concerts',
                    '3. Dopo-Partita Calcio San Siro (Inter & AC Milan) e Afterparty Concerti',
                  )}
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4">
                  {isIt
                    ? 'Quando 75.000 tifosi escono dallo Stadio Giuseppe Meazza dopo una sfida di Serie A, Champions League, Coppa Italia o il Derby della Madonnina (Inter vs Milan), trovare un taxi è quasi impossibile. La nostra strategia Dopo-Partita divide la notte in 3 fasce orarie collaudate:'
                    : 'When 75,000 fans exit Giuseppe Meazza Stadium after Serie A, UEFA Champions League, Coppa Italia, or the Derby della Madonnina (Inter vs AC Milan), finding a taxi is nearly impossible. Our Matchday Concierge structures the Third Half into 3 proven time slots:'}
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-white/75 mb-5">
                  <li className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10">
                    <strong className="text-champagne">
                      {tr(locale, 'Kick-off 15:00 / 18:00 → Royal Aperitivo & Dinner Show (19:30–22:30):', 'Partite ore 15:00 / 18:00 → Royal Aperitivo & Dinner Show (19:30–22:30):')}
                    </strong>{' '}
                    {isIt
                      ? 'Attraversa Piazzale dello Sport a piedi verso Aria Club (a 150 metri dai cancelli), oppure prendi la M5 Lilla per Voya Rooftop (3 fermate), 55 Milano (4 fermate) o Pineta Club (Cenisio/Garibaldi).'
                      : 'Walk 150 meters across Piazzale dello Sport to Aria Club, or hop on the M5 Purple Line to Voya Rooftop (3 stops), 55 Milano (4 stops), or Pineta Club (Cenisio/Garibaldi).'}
                  </li>
                  <li className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10">
                    <strong className="text-champagne">
                      {tr(locale, 'Night Match 20:45 → Third-Half VIP Clubbing (from 23:00):', 'Posticipo Serale ore 20:45 → Terzo Tempo VIP Club (dalle 23:00):')}
                    </strong>{' '}
                    {isIt
                      ? 'Fischio finale alle 22:40 e ingresso diretto al tuo Tavolo VIP prenotato da Aria Club (2 min a piedi), Just Me Torre Branca (10 min in auto) o Pineta Club.'
                      : 'Final whistle at 22:40 and straight into your reserved VIP booth at Aria Club (2-min walk), Just Me Torre Branca (10-min drive), or Pineta Club.'}
                  </li>
                  <li className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10">
                    <strong className="text-champagne">
                      {tr(locale, 'Tue/Wed Champions League 21:00 → Midweek VIP Party (until 05:00):', 'Champions League Mar/Mer ore 21:00 → Midweek VIP Party (fino alle 05:00):')}
                    </strong>{' '}
                    {isIt
                      ? 'Just Me Milano (aperto 7 sere su 7), Voya Rooftop e 55 Milano accolgono tifosi internazionali, sponsor, delegazioni UEFA e ospiti Skybox.'
                      : 'Just Me Milano (open 7/7), Voya Rooftop, and 55 Milano host visiting supporters, sponsors, UEFA delegations, and Skybox guests.'}
                  </li>
                </ul>
                <Link
                  href={`${lp}/football-afterparties`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-champagne/15 border border-champagne/40 text-champagne text-xs font-bold uppercase tracking-wider hover:bg-champagne hover:text-black transition-colors"
                >
                  {tr(locale, 'Open San Siro Match Afterparty Hub →', 'Apri Hub Dopo-Partita Calcio San Siro →')}
                </Link>
              </article>

              <article id="guida-stagione-2026-2027" className="scroll-mt-28">
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-4">
                  {tr(
                    locale,
                    '4. Major Seasonal Events: Autumn/Winter 2026, Halloween, NYE 2027, Fashion & Design Week',
                    '4. Grandi Eventi Stagionali: Autunno/Inverno 2026, Halloween, Capodanno 2027, Fashion & Design Week',
                  )}
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  {isIt
                    ? 'Il calendario Autunno/Inverno 2026 e Capodanno 2027 tocca i suoi picchi assoluti durante la Notte di Halloween (31 ottobre), la lunga maratona di Sant’Ambrogio e Immacolata (7–8 dicembre), il Gran Galà di Capodanno 2027 (31 dicembre, con formule Cenone + Club o solo Tavolo VIP dopocena), oltre alle settimane internazionali di Milano Fashion Week (settembre/febbraio), Fuorisalone Design Week e GP Formula 1 di Monza. Per tutte queste date speciali il nostro desk blocca i migliori tavoli in tempo reale su WhatsApp (+39 351 912 7047).'
                    : 'The Autumn/Winter 2026 & New Year’s Eve 2027 calendar reaches its highest peaks on Halloween Night (October 31), the Sant’Ambrogio holiday weekend (December 7–8), New Year’s Eve 2027 Gala Night (December 31, featuring Gala Dinner + Club or after-midnight VIP Table packages), alongside Milan Fashion Week, Fuorisalone Design Week, and the Monza Formula 1 Grand Prix. For all peak dates, our desk secures prime VIP tables in real time via WhatsApp (+39 351 912 7047).'}
                </p>
              </article>

              {/* Visible FAQ Section */}
              <article id="guida-faq-eventi" className="scroll-mt-28 pt-6 border-t border-white/10">
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold mb-6">
                  {tr(
                    locale,
                    '5. Frequently Asked Questions — Milan Events & VIP Booking',
                    '5. Domande Frequenti (FAQ) — Eventi Milano e Prenotazioni VIP',
                  )}
                </h2>
                <div className="space-y-4">
                  {faqs.map((f, i) => (
                    <div key={i} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                      <h3 className="font-serif text-lg text-champagne font-bold mb-2">{f.q}</h3>
                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CTA WhatsApp */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-lg border border-champagne/20 bg-champagne/[0.04] p-8 md:p-12 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              {tr(locale, 'Book for Any Event in Milan', 'Prenota per Qualsiasi Evento a Milano')}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-8 font-light">
              {tr(
                locale,
                'Our official VIP Concierge replies in under 10 minutes. VIP table, QR guestlist, Royal Aperitivo or San Siro post-match hospitality — handled for free at +39 351 912 7047 or concierge@nightlifemilan.com.',
                'Il nostro Concierge VIP ufficiale risponde in meno di 10 minuti. Tavolo VIP, lista QR, Royal Aperitivo o dopo-partita San Siro — gestito gratuitamente al +39 351 912 7047 o concierge@nightlifemilan.com.',
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/393519127047?text=Hi%2C%20I%20want%20to%20book%20for%20an%20event%20in%20Milan."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-champagne text-black font-bold rounded-full hover:bg-white transition-colors uppercase tracking-wider text-sm"
              >
                WhatsApp +39 351 912 7047
              </a>
              <a
                href="mailto:concierge@nightlifemilan.com"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/25 text-white font-bold rounded-full hover:border-champagne hover:text-champagne transition-colors uppercase tracking-wider text-sm"
              >
                concierge@nightlifemilan.com
              </a>
            </div>
          </div>
        </section>
              <EditorialPageSections locale={locale as LocaleCode} path={`${lp}/events`} />
      </main>
    </>
  );
}
