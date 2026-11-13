import { notFound } from 'next/navigation';
import { getLocaleDef, hreflangAlternates, localePrefix, indexedLocaleCodes } from '@/lib/i18n/locales';
import { resolveZoneSlug, getLocalizedZoneSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getZoneLocalized35 } from '@/lib/i18n/zonesAndGenres35';
import { getLocalizedText } from '@/lib/seo';
import GuideToc from '@/components/GuideToc';
import { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { mockZones, getVenues } from '@/lib/data';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import { MapPin, Calendar, GlassWater, Train, Car, Sparkles, MessageCircle } from 'lucide-react';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getAllCalendarEvents } from '@/lib/calendarEvents';
import { getEventbriteDiscoveryItems, slimDiscoveryItemsForClient } from '@/lib/eventbriteDiscovery';
import { VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';

export const revalidate = 3600;

const ZONE_HERO_MAP: Record<string, string> = {
  'brera': '/images/pillars/zone-hero-01.webp',
  'navigli': '/images/pillars/zone-hero-02.webp',
  'corso-como': '/images/pillars/zone-hero-03.webp',
  'isola': '/images/pillars/zone-hero-04.webp',
  'porta-venezia': '/images/pillars/zone-hero-05.webp',
  'arco-della-pace': '/images/pillars/zone-hero-06.webp',
  'ripamonti': '/images/pillars/zone-hero-07.webp',
  'nolo': '/images/pillars/zone-hero-08.webp',
  'porta-romana': '/images/pillars/zone-hero-09.webp',
  'lambrate': '/images/pillars/zone-hero-10.webp',
  'parco-sempione': '/images/pillars/zone-hero-11.webp',
  'duomo-san-babila': '/images/pillars/zone-hero-12.webp',
  'citylife-portello': '/images/pillars/zone-hero-13.webp',
  'san-siro': '/images/pillars/zone-hero-14.webp',
};

const ZONE_INLINE_MAP: Record<string, string[]> = {
  'brera': ['/images/pillars/zone-inline-01-a.webp', '/images/pillars/zone-inline-01-b.webp', '/images/pillars/zone-inline-01-c.webp', '/images/pillars/zone-inline-01-d.webp'],
  'navigli': ['/images/pillars/zone-inline-02-a.webp', '/images/pillars/zone-inline-02-b.webp', '/images/pillars/zone-inline-02-c.webp', '/images/pillars/zone-inline-02-d.webp'],
  'corso-como': ['/images/pillars/zone-inline-03-a.webp', '/images/pillars/zone-inline-03-b.webp', '/images/pillars/zone-inline-03-c.webp', '/images/pillars/zone-inline-03-d.webp'],
  'isola': ['/images/pillars/zone-inline-04-a.webp', '/images/pillars/zone-inline-04-b.webp', '/images/pillars/zone-inline-04-c.webp', '/images/pillars/zone-inline-04-d.webp'],
  'porta-venezia': ['/images/pillars/zone-inline-05-a.webp', '/images/pillars/zone-inline-05-b.webp', '/images/pillars/zone-inline-05-c.webp', '/images/pillars/zone-inline-05-d.webp'],
  'arco-della-pace': ['/images/pillars/zone-inline-06-a.webp', '/images/pillars/zone-inline-06-b.webp', '/images/pillars/zone-inline-06-c.webp', '/images/pillars/zone-inline-06-d.webp'],
  'ripamonti': ['/images/pillars/zone-inline-07-a.webp', '/images/pillars/zone-inline-07-b.webp', '/images/pillars/zone-inline-07-c.webp', '/images/pillars/zone-inline-07-d.webp'],
  'nolo': ['/images/pillars/zone-inline-08-a.webp', '/images/pillars/zone-inline-08-b.webp', '/images/pillars/zone-inline-08-c.webp', '/images/pillars/zone-inline-08-d.webp'],
  'porta-romana': ['/images/pillars/zone-inline-09-a.webp', '/images/pillars/zone-inline-09-b.webp', '/images/pillars/zone-inline-09-c.webp', '/images/pillars/zone-inline-09-d.webp'],
  'lambrate': ['/images/pillars/zone-inline-10-a.webp', '/images/pillars/zone-inline-10-b.webp', '/images/pillars/zone-inline-10-c.webp', '/images/pillars/zone-inline-10-d.webp'],
  'parco-sempione': ['/images/pillars/zone-inline-11-a.webp', '/images/pillars/zone-inline-11-b.webp', '/images/pillars/zone-inline-11-c.webp', '/images/pillars/zone-inline-11-d.webp'],
  'duomo-san-babila': ['/images/pillars/zone-inline-12-a.webp', '/images/pillars/zone-inline-12-b.webp', '/images/pillars/zone-inline-12-c.webp', '/images/pillars/zone-inline-12-d.webp'],
  'citylife-portello': ['/images/pillars/zone-inline-13-a.webp', '/images/pillars/zone-inline-13-b.webp', '/images/pillars/zone-inline-13-c.webp', '/images/pillars/zone-inline-13-d.webp'],
  'san-siro': ['/images/pillars/zone-inline-14-a.webp', '/images/pillars/zone-inline-14-b.webp', '/images/pillars/zone-inline-14-c.webp', '/images/pillars/zone-inline-14-d.webp'],
};


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
    flagshipClubs: ['Pineta Milano', 'Repvblic Milano', 'Hollywood Rythmoteque', '11 Clubroom', 'Tocqueville 13', 'Volt Club', 'The Club Milano'],
  },
  'parco-sempione': {
    metroEn: 'M1 Cadorna / Conciliazione, M2 Lanza, M5 Domodossola + Tram 1 & 10',
    metroIt: 'M1 Cadorna / Conciliazione, M2 Lanza, M5 Domodossola + Tram 1 e 10',
    parkingEn: 'Viale Alemagna / Piazza Sempione parking + dedicated VIP Valet at Torre Branca',
    parkingIt: 'Parcheggio Viale Alemagna / Arco della Pace + Valet VIP dedicato sotto Torre Branca',
    preDrinkEn: '55 Milano (Via Piero della Francesca 55), Just Me Royal Italo Rota Aperitivo, Arco della Pace lounges',
    preDrinkIt: '55 Milano (Via Piero della Francesca 55), Just Me Royal Aperitivo Italo Rota, lounge Arco della Pace',
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
    headlineEn: 'San Siro Football Afterparties (Inter & AC Milan) & Stadium Concerts - Aria Club 150m Away',
    headlineIt: 'Dopo-Partita Calcio a San Siro (Inter & Milan) e Grandi Concerti - Aria Club a 150 Metri',
    bodyEn:
      'Attending a Serie A, UEFA Champions League, Derby della Madonnina, or Coppa Italia match at Stadio Giuseppe Meazza (San Siro) or a summer stadium concert at San Siro / Ippodromo Snai? Skip the 75-minute post-match traffic jam and walk 150 meters across the square to Piazzale dello Sport 14 into Aria Club Milano (#3), or ride the M5 Purple Line / 10-minute taxi to Just Me (#1), Voya Rooftop (#5), 55 Milano (#4), and Pineta (#2).',
    bodyIt:
      'Assisti a una partita di Serie A, UEFA Champions League, Derby della Madonnina o Coppa Italia allo Stadio Giuseppe Meazza di San Siro oppure a un concerto estivo a San Siro / Ippodromo Snai? Evita un’ora di blocco nel traffico post-partita e cammina per soli 150 metri fino a Piazzale dello Sport 14 entrando da Aria Club Milano (#3), oppure raggiungi in 3-5 fermate di Metro M5 Lilla o 10 minuti di taxi Just Me (#1), Voya Rooftop (#5), 55 Milano (#4) e Pineta (#2).',
    bulletsEn: [
      'Aria Club Milano (Piazzale dello Sport 14): 150m from San Siro gates - Royal Aperitivo from 19:30 after 15:00/18:00 kickoffs & Official Third-Half Club Party (22:45-05:00) after 20:45/21:00 night matches.',
      'UEFA Champions League Tuesdays & Wednesdays + Sunday/Monday Post-Match: Just Me Milano (open 7 nights/week until 05:00), Voya Rooftop (20th floor, 3 M5 stops to Portello), 55 Milano & Repvblic Dirty Monday.',
      'Derby della Madonnina & Big Matches: Where players, Skybox Hospitality guests, and international fans book Privé Branca, Console DJ, and crystal-chandelier VIP tables.',
      'Stadium-to-Club Dress Code Rule: Team jerseys and scarves are blocked at club doors after 23:00 - wear a collared shirt under your coat and book a VIP Table via WhatsApp (+39 351 912 7047) to get all-male fan groups approved.',
    ],
    bulletsIt: [
      'Aria Club Milano (Piazzale dello Sport 14): a 150 metri dai cancelli di San Siro - Royal Aperitivo dalle 19:30 dopo i match delle 15:00/18:00 e Official Third-Half Party (22:45-05:00) dopo i posticipi delle 20:45/21:00.',
      'Martedì e Mercoledì di UEFA Champions League + Posticipi Domenica/Lunedì: Just Me Milano (aperto 7 sere su 7 fino alle 05:00), Voya Rooftop (20° piano a 3 fermate M5 Portello), 55 Milano e Repvblic Dirty Monday.',
      'Derby della Madonnina & Big Match: Dove festeggiano calciatori, ospiti degli Skybox Hospitality di San Siro e tifosi internazionali nei Privé e in Console DJ.',
      'Regola d’Oro Dress Code Stadio -> Discoteca: Maglie da calcio e sciarpe non passano la selezione dopo le 23:00 - indossa una camicia sotto il cappotto e prenota un Tavolo VIP su WhatsApp (+39 351 912 7047) per far entrare gruppi di soli uomini.',
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
  const loc = (locale as LocaleCode) || 'en';

  const canonicalZoneSlug = resolveZoneSlug(slug);
  const zone = mockZones.find((z) => z.slug === canonicalZoneSlug || z.slug === slug);

  if (!zone) return notFound();

  const zLoc = getZoneLocalized35(zone.slug, loc);
  const title = seoTitle(zLoc.seoTitle);
  const description = withWhatsApp(zLoc.seoDescription, loc);

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const localizedZoneSlug = getLocalizedZoneSlug35(zone.slug, loc);
  const canonical = `${baseUrl}${localePrefix(loc)}/${getLocalizedDir35('zones', loc)}/${localizedZoneSlug}`;
  const zoneLangAlternates: Record<string, string> = {
    'x-default': `${baseUrl}/${getLocalizedDir35('zones', 'en')}/${getLocalizedZoneSlug35(zone.slug, 'en')}`,
  };
  for (const l of indexedLocaleCodes) {
    zoneLangAlternates[getLocaleDef(l)!.hreflang] = `${baseUrl}${localePrefix(l)}/${getLocalizedDir35('zones', l)}/${getLocalizedZoneSlug35(zone.slug, l)}`;
  }

  const heroImg = ZONE_HERO_MAP[zone.slug] || zone.image || '/images/pillars/zone-hero-01.webp';
  const ogImage = `${baseUrl}${heroImg}`;

  return {
    title,
    description,
    robots: seoRobots(loc),
    alternates: {
      canonical,
      languages: zoneLangAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(loc)?.ogLocale || 'en_US',
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
  const loc = (locale as LocaleCode) || 'en';
  const isIt = loc === 'it';
  const lp = localePrefix(loc);

  const canonicalZoneSlug = resolveZoneSlug(slug);
  const zone = mockZones.find((z) => z.slug === canonicalZoneSlug || z.slug === slug);

  if (!zone) return notFound();

  const zLoc = getZoneLocalized35(zone.slug, loc);
  const allVenues = getVenues();
  const zoneVenues = allVenues.filter((v) => v.zone === zone.id);
  const displayedVenues = zoneVenues.length > 0 ? zoneVenues : allVenues.slice(0, 6);

  const venueIds = new Set(displayedVenues.map((v) => v.id));
  const items = getEventbriteDiscoveryItems(await getAllCalendarEvents(), loc).filter(
    ({ event }) => venueIds.has(event.venueId)
  );

  const eventsTonight = items.length;

  const logistics = ZONE_LOGISTICS[zone.slug] || ZONE_LOGISTICS[slug] || {
    metroEn: 'Served by M1/M2/M3/M5 Metro lines until 00:30 + ATM Night Bus network (NM1-NM4, N90/N91)',
    metroIt: 'Servito dalle linee Metro M1/M2/M3/M5 fino alle 00:30 + Rete Notturna ATM (NM1-NM4, N90/N91)',
    parkingEn: 'Guarded 24h municipal garages and official Radiotaxi / Uber Black drop-off points',
    parkingIt: 'Autorimesse custodite H24 e posteggi ufficiali Radiotaxi / Uber Black a meno di 150 metri',
    preDrinkEn: 'Start at 19:30 with a Royal Aperitivo or cocktail lounge before moving to the dancefloor at 23:30',
    preDrinkIt: 'Inizia alle 19:30 con un Royal Aperitivo o lounge bar prima di spostarti in pista alle 23:30',
    flagshipClubs: ['Just Me Milano', 'Pineta Milano', 'Aria Club', '55 Milano', 'Voya Rooftop', 'Repvblic Milano'],
  };

  const zoneFaqs = zLoc.faqs;

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const currentZoneUrl = `${baseUrl}${lp}/${getLocalizedDir35('zones', loc)}/${getLocalizedZoneSlug35(zone.slug, loc)}`;

  const waUrl = getConciergeBookingUrl(loc, zLoc.name, currentZoneUrl);

  return (
    <main className="flex-grow pt-24 pb-20 bg-[#050505]">
      <div data-zone-top-hero="true" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-champagne/30">
          <Image quality={92}
            src={ZONE_HERO_MAP[zone.slug] || ZONE_HERO_MAP[slug] || zone.image || '/images/pillars/zone-hero-01.webp'}
            alt={`${zLoc.name} - ${zLoc.vibe}`}
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
              <Link href={lp || '/'} className="hover:text-champagne transition-colors">
                {zLoc.ui.home}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link
                href={`${lp}/zones`}
                className="hover:text-champagne transition-colors"
              >
                {zLoc.ui.zonesHub}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">
              {zLoc.name}
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
                {zLoc.ui.verifiedBadge}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-champagne tracking-tighter mb-6">
              {zLoc.name}: {zLoc.vibe}
            </h1>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {[zLoc.metro.split('·')[0].trim(), zLoc.dressCode, zLoc.topClubs[0]].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full border border-champagne/30 text-champagne text-xs font-mono tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* AI & Concierge Verified Brief */}
            <div className="mb-8 p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04]">
              <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-2">
                {zLoc.ui.quickAnswerTitle}
              </p>
              <p className="font-sans text-white/80 text-sm leading-relaxed mb-2">
                {zLoc.lead}
              </p>
              <p className="font-sans text-white/55 text-xs leading-relaxed">
                {zLoc.ui.verifiedBody}
              </p>
            </div>

            {/* Clickable TOC (>= 5 anchors) */}
            <div className="mb-10">
              <GuideToc sections={zLoc.sections.map((s) => ({ id: s.id, title: s.heading }))} title={zLoc.ui.tocTitle} />
            </div>

            {/* Localized 5-Chapter District Guide */}
            <div className="text-white/75 leading-relaxed mb-12 space-y-8">
              {zLoc.sections.map((sec) => (
                <div key={sec.id} id={sec.id} className="scroll-mt-28">
                  <h2 className="text-2xl md:text-3xl font-serif text-champagne mb-3">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-base leading-relaxed mb-3">
                      {p}
                    </p>
                  ))}
                  {sec.bullets && (
                    <ul className="list-disc pl-5 space-y-1.5 text-sm text-white/75">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
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
                {zLoc.ui.metroLabel} · {zLoc.ui.priceRangeLabel}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="font-mono text-champagne text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                    <Train className="w-4 h-4" />
                    {zLoc.ui.metroLabel}
                  </h3>
                  <p className="font-sans text-white/60 text-sm leading-relaxed">
                    {isIt ? logistics.metroIt : zLoc.metro}
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="font-mono text-champagne text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    {zLoc.ui.priceRangeLabel}
                  </h3>
                  <p className="font-sans text-white/60 text-sm leading-relaxed">
                    {zLoc.priceRange}
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                  <h3 className="font-mono text-champagne text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                    <GlassWater className="w-4 h-4" />
                    {zLoc.ui.dressCodeLabel}
                  </h3>
                  <p className="font-sans text-white/60 text-sm leading-relaxed">
                    {zLoc.dressCode}
                  </p>
                </div>
              </div>
            </div>

            {/* District Atmosphere Gallery (4 Unique Images) */}
            <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(ZONE_INLINE_MAP[zone.slug] || ZONE_INLINE_MAP[slug] || ZONE_INLINE_MAP['brera']).map((imgSrc, idx) => (
                <div key={imgSrc} className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10">
                  <Image quality={92}
                    src={imgSrc}
                    alt={`${zLoc.name} Milan Nightlife Atmosphere ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {/* Venues in this District */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif text-white mb-6">
                {zLoc.ui.clubsInZone} ({zLoc.name})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayedVenues.slice(0, 6).map((v, idx) => {
                  const vName = getLocalizedText(v.localizedContent.name, loc);
                  const vDesc = getLocalizedText(v.localizedContent.description, loc);
                  const vSlug = getLocalizedText(v.slugs, loc);
                  return (
                    <Link
                      key={v.id}
                      href={`${lp}/clubs/${vSlug}`}
                      className="group flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-champagne/50 transition-all"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-champagne/40 bg-champagne/10 font-serif text-lg font-bold text-champagne">#{idx + 1}</div>
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
              {zLoc.name}
            </h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-champagne" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{zLoc.metro}</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    {zLoc.ui.metroLabel}
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
                    {zLoc.ui.upcomingEvents}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center flex-shrink-0">
                  <GlassWater className="w-5 h-5 text-champagne" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{zLoc.vibe}</p>
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    {zLoc.ui.dressCodeLabel}
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
                <span>{zLoc.ui.bookVipCta}</span>
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
          items={slimDiscoveryItemsForClient(items, loc, 24)}
          lang={loc}
          title={`${zLoc.ui.upcomingEvents} (${zLoc.name})`}
          subtitle={zLoc.lead}
        />
      </div>

      {/* Interactive VIP Table Quote Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <VipQuoteCalculator locale={loc} />
      </section>

      {/* District FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="font-serif text-3xl text-champagne mb-6">
          {zLoc.ui.faqTitle} ({zLoc.name})
        </h2>
        <div className="space-y-4">
          {zoneFaqs.map((f, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-lg text-white mb-2">{f.question}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-Linking SEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Link
          href={`${lp}/zones`}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-champagne hover:text-black hover:border-champagne transition-all duration-300 font-bold tracking-widest uppercase text-sm"
        >
          {zLoc.ui.otherZones}
        </Link>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: zLoc.ui.home, item: `${baseUrl}${lp || '/'}` },
                { '@type': 'ListItem', position: 2, name: zLoc.ui.zonesHub, item: `${baseUrl}${lp}/${getLocalizedDir35('zones', loc)}` },
                { '@type': 'ListItem', position: 3, name: zLoc.name, item: currentZoneUrl },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'TouristAttraction',
              name: `${zLoc.name} - ${zLoc.vibe}`,
              description: zLoc.lead,
              ...(zone.image
                ? {
                    image: zone.image.startsWith('http')
                      ? zone.image
                      : `https://nightlifemilan.com${ZONE_HERO_MAP[zone.slug] || zone.image}`,
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
              name: `${zLoc.ui.clubsInZone} (${zLoc.name})`,
              numberOfItems: displayedVenues.length,
              itemListElement: displayedVenues.map((venue, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                item: {
                  '@type': 'NightClub',
                  name: getLocalizedText(venue.localizedContent.name, loc),
                  ...(venue.image
                    ? {
                        image: venue.image.startsWith('http')
                          ? venue.image
                          : `https://nightlifemilan.com${venue.image}`,
                      }
                    : {}),
                  url: `https://nightlifemilan.com${lp}/clubs/${getLocalizedText(venue.slugs, loc)}`,
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
                name: f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.answer,
                },
              })),
            },
          ]),
        }}
      />
            <EditorialPageSections locale={loc} path={`${lp}/zones/${slug}`} />
      </main>
  );
}
