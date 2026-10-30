import { notFound } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { mockZones, getVenues } from '@/lib/data';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import { MapPin, Calendar, GlassWater, Train, Car, Sparkles, MessageCircle } from 'lucide-react';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getAllCalendarEvents } from '@/lib/calendarEvents';
import { getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';
import { VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const ZONE_LOGISTICS: Record<
  string,
  {
    metroEn: string;
    metroIt: string;
    parkingEn: string;
    parkingIt: string;
    preDrinkEn: string;
    preDrinkIt: string;
    flagshipClubs: string[];
  }
> = {
  'corso-como': {
    metroEn: 'M2 / M5 Porta Garibaldi (2 min walk) + NM2 Night Bus every 30 min',
    metroIt: 'M2 / M5 Porta Garibaldi (2 min a piedi) + Bus Notturno NM2 ogni 30 min',
    parkingEn: 'Porta Nuova Varesine Underground Garage (24h guarded) + Taxi rank Piazza XXV Aprile',
    parkingIt: 'Parcheggio Sotterraneo Porta Nuova Varesine (custodito H24) + Taxi Piazza XXV Aprile',
    preDrinkEn: '10 Corso Como Café, Loolapaloosa Aperitivo, Tocqueville 13 Dinner Show',
    preDrinkIt: '10 Corso Como Café, Loolapaloosa Aperitivo, Tocqueville 13 Dinner Show',
    flagshipClubs: ['Pineta Milano', 'Repvblic Milano', 'Hollywood Rythmoteque', '11 Clubroom', 'Play Club', 'Volt Club', 'Tocqueville 13'],
  },
  'parco-sempione': {
    metroEn: 'M1 Cadorna / Conciliazione, M2 Lanza, M5 Domodossola + Tram 1 & 10',
    metroIt: 'M1 Cadorna / Conciliazione, M2 Lanza, M5 Domodossola + Tram 1 e 10',
    parkingEn: 'Viale Alemagna / Piazza Sempione parking + dedicated VIP Valet at Torre Branca',
    parkingIt: 'Parcheggio Viale Alemagna / Arco della Pace + Valet VIP dedicato sotto Torre Branca',
    preDrinkEn: '55 Milano (Via Piero della Francesca 55), Just Me Royal Cavalli Aperitivo, Arco della Pace lounges',
    preDrinkIt: '55 Milano (Via Piero della Francesca 55), Just Me Royal Aperitivo Cavalli, lounge Arco della Pace',
    flagshipClubs: ['Just Me Milano', '55 Milano', 'Old Fashion Garden'],
  },
  'san-siro': {
    metroEn: 'M5 Purple Line San Siro Stadio / San Siro Ippodromo / Segesta (direct access to Piazzale dello Sport 14 in 2 min)',
    metroIt: 'M5 Lilla fermata San Siro Stadio / San Siro Ippodromo / Segesta (accesso diretto a Piazzale dello Sport 14 in 2 min)',
    parkingEn: 'Wide dedicated VIP & guest parking right outside Piazzale dello Sport 14/16 + fast exit to A8/Tangenziale Ovest',
    parkingIt: 'Ampio parcheggio dedicato in Piazzale dello Sport 14/16 + raccordo rapido autostrade A8/Tangenziale Ovest',
    preDrinkEn: 'Aria Club Milano Royal Aperitivo (150m from San Siro gates), 55 Milano (6 min drive) or Voya Rooftop 20th Floor (3 M5 stops to Portello)',
    preDrinkIt: 'Aria Club Milano Royal Aperitivo (a 150m dai cancelli di San Siro), 55 Milano (a 6 min) o Voya Rooftop 20° Piano (3 fermate M5 Portello)',
    flagshipClubs: ['Aria Club Milano (150m from San Siro)', 'Just Me Milano (10 min taxi)', 'Voya Rooftop (3 M5 stops)', '55 Milano (6 min)', 'Pineta Milano (direct M5 Cenisio)'],
  },
  'citylife-portello': {
    metroEn: 'M5 Portello / Tre Torri + Tram 14 & 19',
    metroIt: 'M5 Lilla fermata Portello / Tre Torri + Tram 14 e 19',
    parkingEn: 'Viale Achille Papa 30 garage & CityLife Shopping District underground parking',
    parkingIt: 'Garage Viale Achille Papa 30 e Parcheggio sotterraneo CityLife Shopping District',
    preDrinkEn: 'Voya Rooftop 20th Floor (85m panoramic sunset aperitivo & dinner show)',
    preDrinkIt: 'Voya Rooftop 20° Piano (85m aperitivo panoramico al tramonto & dinner show)',
    flagshipClubs: ['Voya Rooftop', 'Just Me Milano (8 min taxi)', 'Aria Club Milano (6 min taxi)'],
  },
  'duomo-san-babila': {
    metroEn: 'M1 / M3 Duomo & M1 / M4 San Babila (direct Linate Airport connection)',
    metroIt: 'M1 / M3 Duomo e M1 / M4 San Babila (collegamento diretto Aeroporto di Linate)',
    parkingEn: 'Garage Diaz (Piazza Armando Diaz) & Garage Mascagni (Via Mascagni)',
    parkingIt: 'Garage Diaz (Piazza Armando Diaz) e Garage Mascagni (Via Mascagni)',
    preDrinkEn: 'Terrazza Duomo 21 (facing the Gothic spires), Camparino in Galleria, Armani Bamboo Bar',
    preDrinkIt: 'Terrazza Duomo 21 (fronte guglie del Duomo), Camparino in Galleria, Armani Bamboo Bar',
    flagshipClubs: ['Terrazza Duomo 21', 'Armani Privé'],
  },
  navigli: {
    metroEn: 'M2 Porta Genova / Romolo + Night Bus N90/N91 circular line',
    metroIt: 'M2 Porta Genova / Romolo + Filobus Notturno N90/N91 circolare',
    parkingEn: 'Parcheggio Darsena (Piazza XXIV Maggio) & Via Argelati Garage',
    parkingIt: 'Parcheggio Darsena (Piazza XXIV Maggio) e Garage Via Argelati',
    preDrinkEn: 'Secret Navigli Speakeasies, MAG Cafè, Apollo Club Cocktail Bar, Church 81 Dinner Show',
    preDrinkIt: 'Speakeasy segreti sui Navigli, MAG Cafè, Apollo Club Cocktail Bar, Church 81 Dinner Show',
    flagshipClubs: ['Apollo Club Milano', 'Church 81', 'Magazzini Generali'],
  },
  brera: {
    metroEn: 'M2 Lanza / Moscova & M3 Montenapoleone',
    metroIt: 'M2 Lanza / Moscova e M3 Montenapoleone',
    parkingEn: 'Garage Brera (Via Brera 30) & Garage Borgonuovo',
    parkingIt: 'Garage Brera (Via Brera 30) e Garage Borgonuovo',
    preDrinkEn: 'Via Fiori Chiari wine lounges, Bulgari Bar, Armani Bamboo Bar',
    preDrinkIt: 'Enoteche di Via Fiori Chiari, Bulgari Bar, Armani Bamboo Bar',
    flagshipClubs: ['Armani Privé', 'Just Me Milano', 'Pineta Milano'],
  },
  isola: {
    metroEn: 'M5 Isola, M2/M5 Porta Garibaldi, M3 Zara',
    metroIt: 'M5 Isola, M2/M5 Porta Garibaldi, M3 Zara',
    parkingEn: 'Parking Via De Castillia (Bosco Verticale) & Via Valtellina',
    parkingIt: 'Parcheggio Via De Castillia (Bosco Verticale) e Via Valtellina',
    preDrinkEn: 'Ceresio 7 Pools & Restaurant, Bob Isola, Frida, Deus Cafe',
    preDrinkIt: 'Ceresio 7 Pools & Restaurant, Bob Isola, Frida, Deus Cafe',
    flagshipClubs: ['Alcatraz Milano', 'Ceresio 7', 'Pineta Milano'],
  },
};

const ZONE_DEEP_META: Record<
  string,
  {
    headlineEn: string;
    headlineIt: string;
    bodyEn: string;
    bodyIt: string;
    bulletsEn: string[];
    bulletsIt: string[];
  }
> = {
  'san-siro': {
    headlineEn: 'San Siro Football Afterparties (Inter & AC Milan) & Stadium Concerts — Aria Club 150m Away',
    headlineIt: 'Dopo-Partita Calcio a San Siro (Inter & Milan) e Grandi Concerti — Aria Club a 150 Metri',
    bodyEn:
      'Attending a Serie A, UEFA Champions League, Derby della Madonnina, or Coppa Italia match at Stadio Giuseppe Meazza (San Siro)—or a summer stadium concert at San Siro / Ippodromo Snai? Skip the 75-minute post-match traffic jam and walk 150 meters across the square to Piazzale dello Sport 14 into Aria Club Milano (#3 Priority), or ride the M5 Purple Line / 10-minute taxi to Just Me (#1), Voya Rooftop (#5), 55 Milano (#4), and Pineta (#2).',
    bodyIt:
      'Assisti a una partita di Serie A, UEFA Champions League, Derby della Madonnina o Coppa Italia allo Stadio Giuseppe Meazza di San Siro—oppure a un concerto estivo a San Siro / Ippodromo Snai? Evita un’ora di blocco nel traffico post-partita e cammina per soli 150 metri fino a Piazzale dello Sport 14 entrando da Aria Club Milano (#3 Priorità), oppure raggiungi in 3–5 fermate di Metro M5 Lilla o 10 minuti di taxi Just Me (#1), Voya Rooftop (#5), 55 Milano (#4) e Pineta (#2).',
    bulletsEn: [
      'Aria Club Milano (#3 Priority, Piazzale dello Sport 14): 150m from San Siro gates — Royal Aperitivo from 19:30 after 15:00/18:00 kickoffs & Official Third-Half Club Party (22:45–05:00) after 20:45/21:00 night matches.',
      'UEFA Champions League Tuesdays & Wednesdays + Sunday/Monday Post-Match: Just Me Milano (#1 Priority, open 7 nights/week until 05:00), Voya Rooftop (#5 Priority, 20th floor, 3 M5 stops to Portello), 55 Milano (#4 Priority) & Repvblic Dirty Monday.',
      'Derby della Madonnina & Big Matches: Where players, Skybox Hospitality guests, and international fans book Privé Branca, Console DJ, and crystal-chandelier VIP tables.',
      'Stadium-to-Club Dress Code Rule: Team jerseys and scarves are blocked at club doors after 23:00 — wear a collared shirt under your coat and book a VIP Table via WhatsApp (+39 351 912 7047) to get all-male fan groups approved.',
    ],
    bulletsIt: [
      'Aria Club Milano (#3 Priorità, Piazzale dello Sport 14): a 150 metri dai cancelli di San Siro — Royal Aperitivo dalle 19:30 dopo i match delle 15:00/18:00 e Official Third-Half Party (22:45–05:00) dopo i posticipi delle 20:45/21:00.',
      'Martedì e Mercoledì di UEFA Champions League + Posticipi Domenica/Lunedì: Just Me Milano (#1 Priorità, aperto 7 sere su 7 fino alle 05:00), Voya Rooftop (#5 Priorità, 20° piano a 3 fermate M5 Portello), 55 Milano (#4 Priorità) e Repvblic Dirty Monday.',
      'Derby della Madonnina & Big Match: Dove festeggiano calciatori, ospiti degli Skybox Hospitality di San Siro e tifosi internazionali nei Privé e in Console DJ.',
      'Regola d’Oro Dress Code Stadio -> Discoteca: Maglie da calcio e sciarpe non passano la selezione dopo le 23:00 — indossa una camicia sotto il cappotto e prenota un Tavolo VIP su WhatsApp (+39 351 912 7047) per far entrare gruppi di soli uomini.',
    ],
  },
};

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];

  mockZones.forEach((zone) => {
    paths.push({ locale: 'en', slug: zone.slug });
    paths.push({ locale: 'it', slug: zone.slug });
  });

  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';

  const zone = mockZones.find((z) => z.slug === slug);

  if (!zone) return notFound();

  const title = seoTitle(zone.metaTitle[typedLocale] || zone.metaTitle.en);
  const description = withWhatsApp(
    zone.metaDescription[typedLocale] || zone.metaDescription.en,
    locale
  );

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const canonical = `${baseUrl}${localePrefix(locale)}/zones/${slug}`;

  const ogImage = zone.image
    ? `${baseUrl}${zone.image}`
    : `${baseUrl}/images/milan-nightclub-luxury-vip-champagne.webp`;

  return {
    title,
    description,
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages: hreflangAlternates(baseUrl, `/zones/${slug}`),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
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

export default async function ZonePage({ params }: Props) {
  const { locale, slug } = await params;
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  const isIt = typedLocale === 'it';

  const zone = mockZones.find((z) => z.slug === slug);

  if (!zone) return notFound();

  const allVenues = getVenues();
  const zoneVenues = allVenues.filter((v) => v.zone === zone.id);
  const displayedVenues = zoneVenues.length > 0 ? zoneVenues : allVenues.slice(0, 6);

  const venueIds = new Set(displayedVenues.map((v) => v.id));
  const items = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale).filter(
    ({ event }) => venueIds.has(event.venueId)
  );

  const venuesInZone = zoneVenues.length;
  const eventsTonight = items.length;

  const logistics = ZONE_LOGISTICS[slug] || {
    metroEn: 'Served by M1/M2/M3/M5 Metro lines until 00:30 + ATM Night Bus network (NM1–NM4, N90/N91)',
    metroIt: 'Servito dalle linee Metro M1/M2/M3/M5 fino alle 00:30 + Rete Notturna ATM (NM1–NM4, N90/N91)',
    parkingEn: 'Guarded 24h municipal garages and official Radiotaxi / Uber Black drop-off points',
    parkingIt: 'Autorimesse custodite H24 e posteggi ufficiali Radiotaxi / Uber Black a meno di 150 metri',
    preDrinkEn: 'Start at 19:30 with a Royal Aperitivo or cocktail lounge before moving to the dancefloor at 23:30',
    preDrinkIt: 'Inizia alle 19:30 con un Royal Aperitivo o lounge bar prima di spostarti in pista alle 23:30',
    flagshipClubs: ['Just Me Milano', 'Pineta Milano', 'Aria Club', '55 Milano', 'Voya Rooftop', 'Repvblic Milano'],
  };

  const zoneFaqs = [
    {
      q: isIt
        ? `Quali sono i migliori club e locali in zona ${zone.name} a Milano?`
        : `What are the best clubs and venues in ${zone.name}, Milan?`,
      a: isIt
        ? `Nel distretto ${zone.name} e nelle immediate adiacenze spiccano: ${logistics.flagshipClubs.join(', ')}. Prenota Tavolo VIP o Lista nominale via WhatsApp al +39 351 912 7047.`
        : `Top venues in and around ${zone.name} include: ${logistics.flagshipClubs.join(', ')}. Book your VIP Table or nominal Guest List via WhatsApp at +39 351 912 7047.`,
    },
    {
      q: isIt
        ? `Come arrivare e dove parcheggiare a ${zone.name} la sera?`
        : `How do I get to ${zone.name} at night and where can I park?`,
      a: isIt
        ? `Mezzi pubblici: ${logistics.metroIt}. Auto e Taxi: ${logistics.parkingIt}.`
        : `Public transit: ${logistics.metroEn}. Car & Taxi: ${logistics.parkingEn}.`,
    },
    {
      q: isIt
        ? `Qual è il dress code richiesto nei locali di ${zone.name}?`
        : `What is the dress code for clubs in ${zone.name}?`,
      a: isIt
        ? `L'atmosfera predominante a ${zone.name} è "${zone.vibe}". Nei club e rooftop premium è richiesto abbigliamento Smart Chic o Glamour (camicia per gli uomini, vietate tute o scarpe da ginnastica tecniche).`
        : `The dominant vibe in ${zone.name} is "${zone.vibe}". Premium clubs and rooftops enforce a Smart Chic or Glamour dress code (collared shirt for men, no athletic sneakers or sportswear).`,
    },
  ];

  const waUrl = `https://wa.me/393519127047?text=${encodeURIComponent(
    isIt
      ? `Ciao Nightlife Milan! Vorrei consigli e prenotare una serata in zona ${zone.name}.`
      : `Hi Nightlife Milan! I'd like advice and VIP Table / Guestlist booking in ${zone.name}.`
  )}`;

  return (
    <main className="flex-grow pt-24 pb-20 bg-[#131009]">
      <div data-zone-top-hero="true" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-champagne/30">
          <Image
            src={zone.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
            alt={`${zone.name} Milan Nightlife District`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="text-sm text-white/40" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href={localePrefix(locale) || '/'} className="hover:text-champagne transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link
                href={`${localePrefix(locale)}/zones`}
                className="hover:text-champagne transition-colors"
              >
                {tr(locale, 'Zones', 'Zone')}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">
              {zone.name}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero District */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-champagne/30 bg-champagne/10 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
                {isIt ? 'Guida Ufficiale di Quartiere 2026/2027' : 'Official District Guide 2026/2027'}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-champagne tracking-tighter mb-6">
              {zone.name}: {zone.vibe}
            </h1>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {zone.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-champagne/30 text-champagne text-xs font-mono tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* AI Trafiletto */}
            <div className="mb-8 p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04]">
              <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-3">
                {isIt ? 'Risposta Rapida · Sintesi del Quartiere' : 'Quick Answer · District Brief'}
              </p>
              <p className="font-sans text-white/75 text-sm leading-relaxed">
                {isIt
                  ? `${zone.name} (${zone.vibe}) è uno dei 14 distretti chiave della vita notturna di Milano. Locali di riferimento: ${logistics.flagshipClubs.join(', ')}. Come arrivare: ${logistics.metroIt}. Prenotazione Tavoli VIP e Liste: WhatsApp +39 351 912 7047.`
                  : `${zone.name} (${zone.vibe}) is one of Milan's 14 core nightlife districts. Key venues: ${logistics.flagshipClubs.join(', ')}. Transit: ${logistics.metroEn}. Direct VIP Table & Guestlist desk: WhatsApp +39 351 912 7047.`}
              </p>
            </div>

            {/* The Insider Guide */}
            <div className="text-white/75 leading-relaxed mb-12">
              <h2 className="text-2xl md:text-3xl font-serif text-champagne mb-4">
                {isIt
                  ? `Guida Insider a ${zone.name}: Atmosfera, Orari e Locali`
                  : `The Insider Guide to ${zone.name}: Vibe, Hours & Venues`}
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                {zone.description[typedLocale]}
              </p>
            </div>

            {/* San Siro Post-Match & Concert Deep-Dive Card */}
            {(ZONE_DEEP_META[slug] || slug === 'san-siro') && (
              <div className="mb-12 p-7 rounded-2xl border border-champagne/40 bg-gradient-to-br from-champagne/[0.08] via-white/[0.02] to-transparent">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne text-black text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
                  <Sparkles className="w-3 h-3" />
                  <span>
                    {isIt
                      ? 'Speciale Terzo Tempo San Siro · Serie A, Champions League & Concerti'
                      : 'San Siro Third-Half Special · Serie A, Champions League & Concerts'}
                  </span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
                  {isIt
                    ? ZONE_DEEP_META[slug]?.headlineIt ||
                      'Dopo-Partita Calcio a San Siro (Inter & Milan) e Grandi Concerti'
                    : ZONE_DEEP_META[slug]?.headlineEn ||
                      'San Siro Football Afterparties (Inter & AC Milan) & Stadium Concerts'}
                </h2>
                <p className="text-white/75 text-sm md:text-base leading-relaxed mb-5">
                  {isIt ? ZONE_DEEP_META[slug]?.bodyIt : ZONE_DEEP_META[slug]?.bodyEn}
                </p>
                <ul className="space-y-2.5 mb-6 text-sm text-white/75">
                  {(isIt ? ZONE_DEEP_META[slug]?.bulletsIt : ZONE_DEEP_META[slug]?.bulletsEn)?.map(
                    (bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    )
                  )}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`${localePrefix(locale)}/football-afterparties`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-champagne text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    <span>
                      {isIt
                        ? 'Hub Ufficiale Dopo-Partita San Siro (Inter & Milan) →'
                        : 'Official San Siro Football Afterparties Hub →'}
                    </span>
                  </Link>
                  <Link
                    href={`${localePrefix(locale)}/guides/san-siro-football-match-afterparties-inter-ac-milan`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-champagne/40 bg-white/[0.03] text-champagne font-mono text-xs font-bold uppercase tracking-wider hover:border-champagne hover:bg-champagne/10 transition-colors"
                  >
                    <span>
                      {isIt
                        ? 'Leggi la Guida Pillar #11 Post-Partita'
                        : 'Read Pillar Guide #11: Post-Match Clubs'}
                    </span>
                  </Link>
                </div>
              </div>
            )}

            {/* Logistics & Practical Guide */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif text-white mb-6">
                {tr(locale, 'District Logistics, Transit & Pre-Clubbing', 'Logistica, Metro Notturna, Parcheggi e Pre-Serata')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="font-mono text-champagne text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                    <Train className="w-4 h-4" />
                    {tr(locale, 'Metro & Night Bus', 'Metro & Mezzi Notturni')}
                  </h3>
                  <p className="font-sans text-white/60 text-sm leading-relaxed">
                    {isIt ? logistics.metroIt : logistics.metroEn}
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="font-mono text-champagne text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    {tr(locale, 'Parking & Taxi Stands', 'Parcheggi & Posteggi Taxi')}
                  </h3>
                  <p className="font-sans text-white/60 text-sm leading-relaxed">
                    {isIt ? logistics.parkingIt : logistics.parkingEn}
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="font-mono text-champagne text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                    <GlassWater className="w-4 h-4" />
                    {tr(locale, 'Best Pre-Clubbing Spots', 'Dove Fare Aperitivo / Pre-Drink')}
                  </h3>
                  <p className="font-sans text-white/60 text-sm leading-relaxed">
                    {isIt ? logistics.preDrinkIt : logistics.preDrinkEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Venues in this District */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif text-white mb-6">
                {isIt
                  ? `I Migliori Club e Rooftop per una Serata a ${zone.name}`
                  : `Top Clubs & Rooftops for a Night Out in ${zone.name}`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayedVenues.slice(0, 6).map((v) => {
                  const vName = v.localizedContent.name[typedLocale] || v.localizedContent.name.en;
                  const vDesc =
                    v.localizedContent.description[typedLocale] || v.localizedContent.description.en;
                  const vSlug = v.slugs[typedLocale] || v.slugs.en;
                  return (
                    <Link
                      key={v.id}
                      href={`${localePrefix(locale)}/clubs/${vSlug}`}
                      className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-champagne/50 transition-all"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={v.image || '/images/milan-nightclub-luxury-vip-champagne.webp'}
                          alt={vName}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-champagne mb-1">
                          {v.category.replace(/_/g, ' ')} · {v.priceRange}
                        </div>
                        <h3 className="font-serif text-lg text-white group-hover:text-champagne transition-colors truncate">
                          {vName}
                        </h3>
                        <p className="text-xs text-white/55 line-clamp-2 mt-1">{vDesc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* District Stats Sidebar */}
          <div className="w-full lg:w-80 bg-white/[0.03] border border-white/10 rounded-2xl p-6 sticky top-32 space-y-6">
            <h3 className="font-serif text-xl text-white border-b border-white/10 pb-4">
              {isIt ? `Scheda Tecnica · ${zone.name}` : `District Snapshot · ${zone.name}`}
            </h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-champagne" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{zone.stats}</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    {isIt ? 'Densità Locali' : 'Venue Density'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-champagne" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{eventsTonight}</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    {isIt ? 'Eventi Attivi' : 'Upcoming Events'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                  <GlassWater className="w-5 h-5 text-champagne" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{zone.vibe}</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    {isIt ? 'Atmosfera Dominante' : 'Signature Vibe'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-champagne text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isIt ? 'Prenota via WhatsApp' : 'Book via WhatsApp'}</span>
              </a>
              <p className="text-[11px] text-white/45 text-center mt-2">
                +39 351 912 7047 · concierge@nightlifemilan.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filtering Logic: DiscoveryGrid */}
      <div className="border-t border-white/5 bg-white/[0.03] pt-8">
        <DiscoveryGrid
          items={items}
          lang={locale}
          title={typedLocale === 'it' ? `Eventi a ${zone.name}` : `Events in ${zone.name}`}
          subtitle={tr(
            locale,
            `Discover what's happening in the district`,
            `Scopri gli eventi in programma nel quartiere`
          )}
        />
      </div>

      {/* Interactive VIP Table Quote Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <VipQuoteCalculator locale={locale} />
      </section>

      {/* District FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="font-serif text-3xl text-champagne mb-6">
          {isIt ? `Domande Frequenti su ${zone.name}` : `Frequently Asked Questions about ${zone.name}`}
        </h2>
        <div className="space-y-4">
          {zoneFaqs.map((f, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-lg text-white mb-2">{f.q}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-Linking SEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Link
          href={`${localePrefix(locale)}/zones`}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-champagne hover:text-black hover:border-champagne transition-all duration-300 font-bold tracking-widest uppercase text-sm"
        >
          {tr(locale, 'Explore All 14 Milan Nightlife Zones', 'Esplora tutti i 14 Quartieri della Notte')}
        </Link>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'TouristAttraction',
              name: `${zone.name} Nightlife District — Milan`,
              description: zone.description[typedLocale] || zone.description.en,
              ...(zone.image
                ? {
                    image: zone.image.startsWith('http')
                      ? zone.image
                      : `https://nightlifemilan.com${zone.image}`,
                  }
                : {}),
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Milan',
                addressRegion: 'Lombardy',
                addressCountry: 'IT',
              },
              touristType: 'Nightlife',
              keywords: zone.tags.join(', '),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name:
                typedLocale === 'it'
                  ? `Locali a ${zone.name}, Milano`
                  : `Venues in ${zone.name}, Milan`,
              numberOfItems: displayedVenues.length,
              itemListElement: displayedVenues.map((venue, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'NightClub',
                  name: venue.localizedContent.name[typedLocale] || venue.localizedContent.name.en,
                  ...(venue.image
                    ? {
                        image: venue.image.startsWith('http')
                          ? venue.image
                          : `https://nightlifemilan.com${venue.image}`,
                      }
                    : {}),
                  url: `https://nightlifemilan.com${localePrefix(locale)}/clubs/${venue.slugs[typedLocale] || venue.slugs.en}`,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Milan',
                    addressCountry: 'IT',
                  },
                },
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: zoneFaqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.a,
                },
              })),
            },
          ]),
        }}
      />
            <EditorialPageSections locale={locale as LocaleCode} path={`${localePrefix(locale)}/zones/${slug}`} />
      </main>
  );
}
