import { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { tr } from '@/lib/i18n/t';
import {
  INDEXED_LOCALES,
  getLocaleDef,
  hreflangAlternates,
  localePrefix,
} from '@/lib/i18n/locales';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import {
  Sparkles,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Crown,
  ArrowRight,
  Music,
  Users,
} from 'lucide-react';
import {
  VipQuoteCalculator,
  WeeklyNightlifeNavigator,
  PrioritySixShowcase,
} from '@/components/NightlifeExpansionModules';
import VerticalHubsAndEventsSection from '@/components/VerticalHubsAndEventsSection';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

function buildLanguageAlternates(path: string): Record<string, string> {
  const languages = hreflangAlternates(baseUrl, path);
  for (const l of INDEXED_LOCALES) {
    if (!languages[l.hreflang]) {
      languages[l.hreflang] = `${baseUrl}${localePrefix(l.code)}${path}`;
    }
  }
  return languages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${baseUrl}${localePrefix(locale)}/concert-afterparties`;

  const title = seoTitle(
    tr(
      locale,
      'Milan Concert Afterparties 2026/2027: San Siro, Ippodromo I-Days, Unipol Forum Assago, Fabrique & Alcatraz',
      'Afterparty Concerti Milano 2026/2027: Dove Le Serate nei Club Dopo San Siro, Ippodromo I-Days, Forum Assago, Fabrique e Alcatraz'
    )
  );

  const description = withWhatsApp(
    tr(
      locale,
      'Official Milan Concert Afterparty Hub 2026/2027: walk 150m from San Siro & Ippodromo to 3. Aria Club, party 7/7 after midweek concerts at 1. Just Me, or ride M2/M5 from Unipol Forum Assago to 2. Pineta, 4. 55 Milano, 5. Voya Rooftop & 6. Repvblic. WhatsApp +39 351 912 7047.',
      'Guida ufficiale Afterparty Concerti Milano 2026/2027: vai a piedi in 150m da San Siro e Ippodromo da 3. Aria Club, balla 7 notti su 7 da 1. Just Me, o raggiungi in metro da Unipol Forum Assago 2. Pineta, 4. 55 Milano, 5. Voya Rooftop e 6. Repvblic. WhatsApp +39 351 912 7047.'
    ),
    locale
  );

  const languages = buildLanguageAlternates('/concert-afterparties');

  return {
    title,
    description,
    robots: seoRobots(locale),
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'it_IT',
      images: [
        {
          url: `${baseUrl}/images/pillars/concert-afterparties-01.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/pillars/concert-afterparties-01.webp`],
    },
  };
}

const CONCERT_ARENAS = [
  {
    id: 'arena-san-siro-ippodromo',
    badgeIt: 'ARENA #1 · 75.000 / 80.000 SPETTATORI · A PIEDI IN 150 METRI',
    badgeEn: 'ARENA #1 · 75,000 / 80,000 FANS · 150-METER WALK',
    titleIt:
      '1. Stadio San Siro (75.000 spettatori) & Ippodromo Snai San Siro / La Maura (I-Days, 80.000 spettatori)',
    titleEn:
      '1. San Siro Stadium (75,000 capacity) & Ippodromo Snai San Siro / La Maura (I-Days, 80,000 capacity)',
    endTimeIt: 'Fine concerto ore 23:00 - 23:30 · Ingresso Club 23:15 - 05:00',
    endTimeEn: 'Encore ends 23:00 - 23:30 · Club Entry 23:15 - 05:00',
    headlineClubIt:
      'Aria Club Milano (#3 Priorità, Piazzale dello Sport 14) è a soli 150 metri da San Siro e a pochi minuti a piedi dall Ippodromo!',
    headlineClubEn:
      'Aria Club Milano (#3 Priority, Piazzale dello Sport 14) is just 150 meters from San Siro and a short walk from the Hippodrome!',
    logisticsIt:
      'Zero attesa taxi, zero calca ai tornelli della M5 Lilla: quando finisce il bis (encore) a San Siro o all Ippodromo Snai, attraversi Piazzale dello Sport a piedi e in 120 secondi entri nell Official Concert Afterparty di Aria Club (#3 Priorità) con giardino estivo, main room climatizzata e 3 livelli di Tavoli VIP (da €250 a €600). In alternativa, in 3 fermate di M5 raggiungi il 20° piano di Voya Rooftop (#5 Priorità) o in 4 fermate 55 Milano (#4 Priorità) e Just Me (#1 Priorità).',
    logisticsEn:
      'Zero taxi wait, zero M5 subway crush: as soon as the final encore ends at San Siro or Snai Hippodrome, walk straight across Piazzale dello Sport and step into Aria Club (#3 Priority) in 120 seconds for the Official Concert Afterparty in its open-air garden and main room (VIP tables from €250 to €600). Or hop on the M5 Purple Line for 3 stops to Voya Rooftop (#5 Priority, 20th floor) and 4 stops to 55 Milano (#4 Priority) and Just Me (#1 Priority).',
    pairedClubsIt:
      '3. Aria Club Milano (a 150m a piedi) · 5. Voya Rooftop (3 fermate M5) · 4. 55 Milano (4 fermate M5) · 1. Just Me (7/7) · 2. Pineta Corso Como',
    pairedClubsEn:
      '3. Aria Club Milano (150m walk) · 5. Voya Rooftop (3 M5 stops) · 4. 55 Milano (4 M5 stops) · 1. Just Me (7/7) · 2. Pineta Corso Como',
  },
  {
    id: 'arena-midweek-concerts',
    badgeIt: 'ARENA #2 · CONCERTI INFRASETTIMANali (LUN, MAR, MER, GIO, DOM)',
    badgeEn: 'ARENA #2 · MIDWEEK & SUNDAY CONCERTS (MON, TUE, WED, THU, SUN)',
    titleIt:
      '2. Concerti Infrasettimanali (Lunedì, Martedì, Mercoledì, Giovedì e Domenica): Dove Andare Quando gli Altri Club Sono Chiusi',
    titleEn:
      '2. Midweek Concerts (Monday, Tuesday, Wednesday, Thursday & Sunday): Where to Party When Other Clubs Are Closed',
    endTimeIt: 'Aperto 7 Notti su 7 · 365 Giorni l Anno (fino alle 05:00)',
    endTimeEn: 'Open 7 Nights a Week · 365 Days a Year (until 05:00)',
    headlineClubIt:
      'Just Me Milano (#1 Priorità, Viale Luigi Camoens 2, Torre Branca) è aperto 7 notti su 7 fino alle 05:00!',
    headlineClubEn:
      'Just Me Milano (#1 Priority, Viale Luigi Camoens 2, Torre Branca) is open 7 nights a week until 05:00!',
    logisticsIt:
      ' oltre il 60% dei tour mondiali a San Siro, Ippodromo e Forum di Assago fa tappa a Milano il Lunedì, Martedì, Mercoledì o Domenica sera. In queste notti Just Me Milano (#1 Priorità assoluta sotto la Torre Branca in Parco Sempione) è il quartier generale incontrastato di artisti internazionali, tour crew, ballerini, VIP guest dell area Pit/Gold Circle e fan eleganti. Per il Lunedì notte (Monday Night) è imperdibile anche il leggendario Dirty Monday di Repvblic Milano (#6 Priorità).',
    logisticsEn:
      'Over 60% of world arena tours at San Siro, Ippodromo, and Unipol Forum play Milan on Monday, Tuesday, Wednesday, or Sunday nights. On these midweek dates, Just Me Milano (#1 Top Priority beneath Torre Branca in Parco Sempione) is the undisputed headquarters for international recording artists, tour crews, Gold Circle VIPs, and fans. On Monday nights, Repvblic Milano (#6 Priority) also hosts its iconic Dirty Monday hip-hop and house party.',
    pairedClubsIt:
      '1. Just Me Milano (Aperto 7/7 fino alle 05:00) · 6. Repvblic Milano (Dirty Monday) · 4. 55 Milano (Mar-Dom) · 5. Voya Rooftop (Mar-Dom)',
    pairedClubsEn:
      '1. Just Me Milano (Open 7/7 until 05:00) · 6. Repvblic Milano (Dirty Monday) · 4. 55 Milano (Tue-Sun) · 5. Voya Rooftop (Tue-Sun)',
  },
  {
    id: 'arena-unipol-forum-assago',
    badgeIt: 'ARENA #3 · UNIPOL FORUM ASSAGO (15.800 SPETTATORI) · DIRETTISSIMA M2 VERDE',
    badgeEn: 'ARENA #3 · UNIPOL FORUM ASSAGO (15,800 FANS) · DIRECT M2 GREEN LINE',
    titleIt:
      '3. Unipol Forum Assago (Mediolanum Forum): Collegamento Diretto M2 Verde verso Corso Como e Sempione',
    titleEn:
      '3. Unipol Forum Assago (Mediolanum Forum): Direct M2 Green Metro Line to Corso Como & Sempione',
    endTimeIt: 'Fine concerto ore 23:00 · 18-22 min su M2 Verde Assago -> Cadorna / Garibaldi',
    endTimeEn: 'Concert ends 23:00 · 18-22 min on M2 Green Line Assago -> Cadorna / Garibaldi',
    headlineClubIt:
      'Treno diretto M2 da Assago Milanofiori Forum a Cadorna (Parco Sempione) e Porta Garibaldi (Corso Como)!',
    headlineClubEn:
      'Direct M2 train from Assago Milanofiori Forum to Cadorna (Parco Sempione) & Porta Garibaldi (Corso Como)!',
    logisticsIt:
      'Uscendo dai concerti indoor dell Unipol Forum di Assago, la linea metropolitana M2 Verde (stazione Assago Milanofiori Forum con corse potenziate post-concerto) ti porta senza cambi in 18 minuti a Cadorna per raggiungere in 2 minuti Just Me Milano (#1 Priorità, Torre Branca) e 55 Milano (#4 Priorità, Sempione), oppure in 22 minuti a Porta Garibaldi / Moscova per il Pineta Club Milano (#2 Priorità, Via Messina 38 / Corso Como), Tocqueville 13, Repvblic (#6 Priorità) e Voya Rooftop (#5 Priorità).',
    logisticsEn:
      'Leaving indoor arena shows at Unipol Forum Assago, the M2 Green Metro Line (Assago Milanofiori Forum station with extended post-concert trains) takes you directly in 18 minutes to Cadorna for Just Me Milano (#1 Priority, Torre Branca) and 55 Milano (#4 Priority, Sempione), or in 22 minutes to Porta Garibaldi / Moscova for Pineta Club Milano (#2 Priority, Corso Como), Tocqueville 13, Repvblic (#6 Priority), and Voya Rooftop (#5 Priority).',
    pairedClubsIt:
      '2. Pineta Club (Garibaldi/Corso Como) · 1. Just Me (Cadorna/Sempione) · 4. 55 Milano · 5. Voya Rooftop · 6. Repvblic · Tocqueville 13',
    pairedClubsEn:
      '2. Pineta Club (Garibaldi/Corso Como) · 1. Just Me (Cadorna/Sempione) · 4. 55 Milano · 5. Voya Rooftop · 6. Repvblic · Tocqueville 13',
  },
  {
    id: 'arena-fabrique-alcatraz',
    badgeIt: 'ARENA #4 · FABRIQUE & ALCATRAZ · DA LIVE SHOW A CLUB FINO ALLE 05:00',
    badgeEn: 'ARENA #4 · FABRIQUE & ALCATRAZ · LIVE CONCERT TO CLUBBING UNTIL 05:00',
    titleIt:
      '4. Fabrique Milano & Alcatraz Milano: Prosecuzione Late-Night dal Concerto al Clubbing fino alle 05:00',
    titleEn:
      '4. Fabrique Milano & Alcatraz Milano: Seamless Transition from Live Gig to Clubbing Until 05:00',
    endTimeIt: 'Fine live ore 23:00 · Apertura piste clubbing 23:30 - 05:00',
    endTimeEn: 'Live set ends 23:00 · Club dancefloors open 23:30 - 05:00',
    headlineClubIt:
      'Resta nella stessa arena per la notte clubbing o spostati in 10 minuti nei 6 Club Prioritari!',
    headlineClubEn:
      'Stay inside the arena as it transforms into a mega-club or transfer in 10 minutes to our 6 Priority Venues!',
    logisticsIt:
      'Quando il concerto si tiene all Alcatraz (Via Valtellina 25, Isola/Farini) o al Fabrique (Via Fantoli 9, Mecenate), il venerdì e il sabato notte le strutture si trasformano a partire dalle 23:30 in enormi discoteche fino alle 05:00. Se invece desideri un vero Tavolo VIP di lusso o il concerto si svolge in settimana, da Alcatraz sei a soli 5 minuti da Pineta Corso Como (#2), Voya Rooftop (#5) e 55 Milano (#4), mentre da Fabrique raggiungi in 10 minuti Repvblic (#6) e Just Me (#1).',
    logisticsEn:
      'When your concert takes place at Alcatraz (Via Valtellina 25, Isola/Farini) or Fabrique (Via Fantoli 9, Mecenate), on Friday and Saturday nights the venues transform at 23:30 into massive clubs until 05:00. If you prefer an upscale luxury VIP Table or are attending a midweek gig, Alcatraz is just 5 minutes from Pineta Corso Como (#2), Voya Rooftop (#5), and 55 Milano (#4), while Fabrique is 10 minutes from Repvblic (#6) and Just Me (#1).',
    pairedClubsIt:
      'Alcatraz Milano (3 Piste) · Fabrique Milano · 2. Pineta Club (a 5 min da Alcatraz) · 6. Repvblic (a 10 min da Fabrique) · 1. Just Me',
    pairedClubsEn:
      'Alcatraz Milano (3 Rooms) · Fabrique Milano · 2. Pineta Club (5 min from Alcatraz) · 6. Repvblic (10 min from Fabrique) · 1. Just Me',
  },
];

const PRIORITY_CONCERT_CLUBS = [
  {
    rank: 1,
    slug: 'just-me-milano',
    badgeIt: '#1 Priorità Assoluta · Aperto 7/7 per Tutti i Tour Internazionali',
    badgeEn: '#1 Top Priority · Open 7/7 for All International Arena Tours',
    nameIt: '1. Just Me Milano (Torre Branca, Parco Sempione)',
    nameEn: '1. Just Me Milano (Torre Branca, Parco Sempione)',
    distanceIt: '10 min da San Siro/Ippodromo · 18 min diretti M2 da Forum Assago (Cadorna)',
    distanceEn: '10 min from San Siro/Ippodromo · 18 min direct M2 from Forum Assago (Cadorna)',
    pricesIt: 'Royal Aperitivo Pre-Concerto €20-30 · Tavoli VIP Post-Concerto €350 - €500 · Privé Branca €1.000+',
    pricesEn: 'Pre-Concert Royal Aperitivo €20-30 · Post-Concert VIP Tables €350 - €500 · Privé Branca €1,000+',
    image: '/images/pillars/concert-afterparties-01.webp',
    descIt:
      'Aperto 7 notti su 7 fino alle 05:00, il Just Me di Italo Rota sotto la Torre Branca è il locale scelto dalle produzioni internazionali per gli afterparty ufficiali e informali dopo gli show a San Siro, La Maura e Forum Assago.',
    descEn:
      'Open 7 nights a week until 05:00, Italo Rotas Just Me under Torre Branca is the #1 destination for artist entourages, VIP ticket holders, and fans after shows at San Siro, La Maura, and Forum Assago.',
  },
  {
    rank: 2,
    slug: 'pineta-club-milano',
    badgeIt: '#2 Priorità · Corso Como / Garibaldi · Diretto da San Siro (M5) e Assago (M2)',
    badgeEn: '#2 Priority · Corso Como / Garibaldi · Direct from San Siro (M5) & Assago (M2)',
    nameIt: '2. Pineta Club Milano (Via Messina 38 / Corso Como)',
    nameEn: '2. Pineta Club Milano (Via Messina 38 / Corso Como)',
    distanceIt: '12 min M5 da San Siro · 22 min M2 da Assago Forum · 3 min da Alcatraz',
    distanceEn: '12 min M5 from San Siro · 22 min M2 from Assago Forum · 3 min from Alcatraz',
    pricesIt: 'Aperitivo Cantato Pre-Show €20-25 · Tavoli VIP Post-Concerto €300 - €800 (100% in bottiglie)',
    pricesEn: 'Pre-Show Singing Aperitivo €20-25 · Post-Concert VIP Tables €300 - €800 (100% in bottles)',
    image: '/images/pillars/concert-afterparties-02.webp',
    descIt:
      'Il tempio del divertimento cantato e del clubbing reggaeton/commerciale in zona Corso Como: perfetto per continuare a cantare dopo un grande live del venerdì o sabato sera.',
    descEn:
      'Milans capital of sing-along energy and reggaeton/commercial clubbing near Corso Como: the ultimate spot to keep singing and dancing after a Friday or Saturday concert.',
  },
  {
    rank: 3,
    slug: 'aria-club-milano',
    badgeIt: '#3 Priorità · A 150 Metri a Piedi da San Siro e Ippodromo!',
    badgeEn: '#3 Priority · 150 Meters on Foot from San Siro & Ippodromo!',
    nameIt: '3. Aria Club Milano (Piazzale dello Sport 14, San Siro)',
    nameEn: '3. Aria Club Milano (Piazzale dello Sport 14, San Siro)',
    distanceIt: '2 minuti a piedi (150m reali dai cancelli dello Stadio San Siro e Ippodromo)',
    distanceEn: '2-minute walk (150m from San Siro Stadium & Snai Hippodrome gates)',
    pricesIt: 'Royal Aperitivo Pre-Live €15-25 · Tavoli VIP Pista €250 · Privé Aria €400 · Console €600',
    pricesEn: 'Pre-Live Royal Aperitivo €15-25 · Dancefloor VIP €250 · Privé Aria €400 · Console €600',
    image: '/images/pillars/concert-afterparties-03.webp',
    descIt:
      'Quando 75.000 persone escono da un concerto a San Siro o agli I-Days dell Ippodromo, Aria Club ti permette di entrare in discoteca a piedi in 120 secondi, saltando 90 minuti di paralisi del traffico.',
    descEn:
      'When 75,000 fans exit a stadium concert at San Siro or I-Days at the Hippodrome, Aria Club lets you walk straight into your VIP booth in 120 seconds, bypassing 90 minutes of traffic gridlock.',
  },
  {
    rank: 4,
    slug: '55-milano',
    badgeIt: '#4 Priorità · 4 Fermate M5 da San Siro · Ideale Gruppi Fan 8-30 Persone',
    badgeEn: '#4 Priority · 4 M5 Stops from San Siro · Ideal for Groups of 8-30 Fans',
    nameIt: '4. 55 Milano / FiftyFive (Via Piero della Francesca 55, Sempione)',
    nameEn: '4. 55 Milano / FiftyFive (Via Piero della Francesca 55, Sempione)',
    distanceIt: '6 min M5 da San Siro (Domodossola) · 18 min da Forum Assago',
    distanceEn: '6 min M5 from San Siro (Domodossola) · 18 min from Forum Assago',
    pricesIt: 'Apericena XL Pre-Concerto €20-30 · Tavoli VIP Dopocena da €250 - €400',
    pricesEn: 'Pre-Concert XXL Apericena €20-30 · Post-Concert VIP Tables from €250 - €400',
    image: '/images/pillars/concert-afterparties-04.webp',
    descIt:
      'Oltre 1.000 mq in zona Sempione: punto strategico sia per fare Apericena XL alle 18:30 prima di andare a San Siro in 4 fermate di metro, sia per tornare a ballare dopo il concerto.',
    descEn:
      'Over 1,000 sqm in the Sempione district: ideal both for a 18:30 pre-concert Apericena (4 metro stops from San Siro) and for late-night post-concert bottle service.',
  },
  {
    rank: 5,
    slug: 'voya-rooftop-milan',
    badgeIt: '#5 Priorità · 20° Piano Vista Luci San Siro a 3 Fermate M5',
    badgeEn: '#5 Priority · 20th Floor San Siro Lights View, 3 M5 Stops',
    nameIt: '5. Voya Rooftop Milan (Via Achille Papa 30, 20° Piano Portello/CityLife)',
    nameEn: '5. Voya Rooftop Milan (Via Achille Papa 30, 20th Floor Portello/CityLife)',
    distanceIt: '4 min (3 fermate M5 Lotto/Portello) da San Siro e Ippodromo La Maura',
    distanceEn: '4 min (3 M5 stops Lotto/Portello) from San Siro & La Maura Hippodrome',
    pricesIt: 'Sunset Drink Pre-Show €20-30 · Tavoli Vetrata Skyline Post-Concerto €250 - €450',
    pricesEn: 'Pre-Show Sunset Drinks €20-30 · Post-Concert Skyline Glass VIP Tables €250 - €450',
    image: '/images/pillars/concert-afterparties-05.webp',
    descIt:
      'Dal 20° piano vedi letteralmente il palco e i fasci di luce dello Stadio San Siro illuminato: il salotto panoramico perfetto per un drink pre-concerto o un afterparty raffinato lontano dalla calca.',
    descEn:
      'From the 20th floor you look directly out over the glowing stage lights of San Siro Stadium: the premier sky lounge for pre-concert cocktails or a refined post-show VIP table.',
  },
  {
    rank: 6,
    slug: 'repvblic-milano',
    badgeIt: '#6 Priorità · Piazza della Repubblica · Dirty Monday & House/Urban Weekend',
    badgeEn: '#6 Priority · Piazza della Repubblica · Dirty Monday & House/Urban Weekends',
    nameIt: '6. Repvblic Milano (Piazza della Repubblica / Mecenate)',
    nameEn: '6. Repvblic Milano (Piazza della Repubblica / Mecenate)',
    distanceIt: '15 min M5/M2 da San Siro e Assago · 10 min da Fabrique Milano',
    distanceEn: '15 min M5/M2 from San Siro & Assago · 10 min from Fabrique Milano',
    pricesIt: 'Tavoli VIP Pista da €300 · Privé Rialzato €500 - €800 · Console da €1.000',
    pricesEn: 'Dancefloor VIP from €300 · Elevated Privé €500 - €800 · Console from €1,000',
    image: '/images/pillars/concert-afterparties-06.webp',
    descIt:
      'Perfetto dopo i grandi concerti hip-hop, urban, pop ed elettronici del venerdì, sabato e lunedì sera (Dirty Monday), con impianto audio-luci da club internazionale.',
    descEn:
      'The top pick after major hip-hop, urban, pop, and electronic concerts on Friday, Saturday, and Monday nights (Dirty Monday), featuring cutting-edge sound and lighting.',
  },
];

export default async function ConcertAfterpartiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);
  const canonicalUrl = `${baseUrl}${lp}/concert-afterparties`;

  const faqs = [
    {
      q: isIt
        ? 'Qual è la discoteca più vicina per uscire la sera a piedi dopo un concerto allo Stadio San Siro o all Ippodromo Snai (I-Days)?'
        : 'Which nightclub is closest to walk to after a concert at San Siro Stadium or Ippodromo Snai (I-Days)?',
      a: isIt
        ? 'Aria Club Milano (#3 Priorità Nightlife Milan) si trova in Piazzale dello Sport 14, a soli 150 metri reali (2 minuti a piedi) dai cancelli dello Stadio San Siro e dell Ippodromo Snai San Siro, e a pochi minuti da La Maura. Dalle 23:00 alle 05:00 ospita l Official Concert Afterparty nel giardino estivo e nella main room: entri a piedi senza aspettare taxi e senza fare coda alla metro M5.'
        : 'Aria Club Milano (#3 Priority) is located at Piazzale dello Sport 14, just 150 meters (a 2-minute walk) from the gates of San Siro Stadium and Ippodromo Snai San Siro, and minutes from La Maura. From 23:00 to 05:00 it hosts the Official Concert Afterparty in its garden and main room, letting you walk straight in with zero taxi wait and zero M5 subway queues.',
    },
    {
      q: isIt
        ? 'Dove uscire la sera a Milano dopo un concerto infrasettimanale (Lunedì, Martedì, Mercoledì, Giovedì o Domenica)?'
        : 'Where to go clubbing in Milan after a midweek concert (Monday, Tuesday, Wednesday, Thursday, or Sunday)?',
      a: isIt
        ? 'Just Me Milano (#1 Priorità, Viale Luigi Camoens 2 sotto la Torre Branca in Parco Sempione) è aperto 7 notti su 7 fino alle 05:00 ed è il punto di ritrovo di artisti internazionali, tour crew, VIP guest e fan dopo ogni grande concerto infrasettimanale. Inoltre il Lunedì sera è attivo il celebre Dirty Monday di Repvblic (#6 Priorità), e dal Martedì alla Domenica sono aperti 55 Milano (#4) e Voya Rooftop 20° Piano (#5).'
        : 'Just Me Milano (#1 Priority, Viale Luigi Camoens 2 beneath Torre Branca in Parco Sempione) is open 7 nights a week until 05:00 and serves as the main gathering spot for international artists, tour crews, VIP guests, and fans after every midweek show. Additionally, Repvblic (#6 Priority) hosts Dirty Monday on Mondays, while 55 Milano (#4) and Voya Rooftop 20th Floor (#5) operate Tuesday through Sunday.',
    },
    {
      q: isIt
        ? 'Come raggiungere i migliori club di Milano dopo un concerto all Unipol Forum di Assago?'
        : 'How to reach Milans best clubs after an indoor concert at Unipol Forum Assago?',
      a: isIt
        ? 'Dalla stazione Assago Milanofiori Forum prendi la linea M2 Verde diretta: in 18 minuti scendi a Cadorna per arrivare in 2 minuti da Just Me Milano (#1 Priorità, Torre Branca) e 55 Milano (#4 Priorità, Sempione); oppure in 22 minuti scendi a Porta Garibaldi / Moscova per entrare da Pineta Club (#2 Priorità, Corso Como), Tocqueville 13, Repvblic (#6 Priorità) e Voya Rooftop (#5 Priorità).'
        : 'From Assago Milanofiori Forum station, hop on the direct M2 Green Line: in 18 minutes get off at Cadorna for Just Me Milano (#1 Priority, Torre Branca) and 55 Milano (#4 Priority, Sempione); or in 22 minutes get off at Porta Garibaldi / Moscova for Pineta Club (#2 Priority, Corso Como), Tocqueville 13, Repvblic (#6 Priority), and Voya Rooftop (#5 Priority).',
    },
    {
      q: isIt
        ? 'Posso entrare nei club VIP di Milano dopo il concerto indossando t-shirt del tour o abbigliamento da festival?'
        : 'Can I enter Milan VIP clubs after a concert wearing tour merch t-shirts or festival gear?',
      a: isIt
        ? 'Per superare la selezione alla porta dopo le 23:00 nei 6 club prioritari (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic) evita canotte, pantaloncini corti, tute sportive, scarpe infangate da prato e zaini voluminosi. Indossa un outfit Smart-Concert: camicia o t-shirt nera/bianca minimal sotto una giacca di pelle o blazer, jeans scuri o pantaloni lunghi e sneaker pulite o stivaletti; riponi eventuale merchandising acquistato in guardaroba.'
        : 'To pass door selection after 23:00 at our 6 priority clubs (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic), avoid tank tops, shorts, tracksuits, muddy pit shoes, and bulky backpacks. Wear a Smart-Concert outfit: a collared shirt or clean minimal dark tee under a leather jacket or blazer, dark jeans or trousers, and clean sneakers or boots, and check any merch bags at the cloakroom.',
    },
    {
      q: isIt
        ? 'Cosa succede alla prenotazione del Tavolo VIP se il concerto finisce dopo le 23:30 o il deflusso dallo stadio è lento?'
        : 'What happens to our VIP Table reservation if the concert encore runs past 23:30?',
      a: isIt
        ? 'Prenotando il tuo Tavolo VIP tramite il Desk Ufficiale Nightlife Milan su WhatsApp (+39 351 912 7047), la tua prenotazione gode della Garanzia Post-Concerto: conosciamo gli orari esatti di fine show a San Siro, La Maura e Forum Assago e manteniamo bloccato il tuo divanetto fino alle 00:30/01:00 finché non arrivate.'
        : 'When you book your VIP Table through the Official Nightlife Milan Desk on WhatsApp (+39 351 912 7047), your reservation includes our Post-Concert Hold Guarantee: we track exact encore end times at San Siro, La Maura, and Forum Assago and hold your private booth until 00:30/01:00.',
    },
    {
      q: isIt
        ? 'Dove fare Aperitivo o Cena vicino a San Siro o al Forum prima dell inizio del concerto?'
        : 'Where should we go for pre-concert Aperitivo or Dinner before a show at San Siro or Forum Assago?',
      a: isIt
        ? 'Per il Pre-Concerto dalle 18:30 alle 20:30 consigliamo: (1) Aria Club a 150m da San Siro (Royal Aperitivo dalle 19:30); (2) Voya Rooftop al 20° piano a 3 fermate M5 da San Siro (Sunset Aperitivo dalle 18:30); (3) 55 Milano a 4 fermate M5 da San Siro e collegato a Cadorna M2 per Assago (Apericena XL dalle 19:30); (4) Just Me Parco Sempione (Royal Aperitivo + salita Torre Branca).'
        : 'For Pre-Concert drinks and food between 18:30 and 20:30, we recommend: (1) Aria Club 150m from San Siro (Royal Aperitivo from 19:30); (2) Voya Rooftop 20th floor, 3 M5 stops from San Siro (Sunset Aperitivo from 18:30); (3) 55 Milano, 4 M5 stops from San Siro and near Cadorna M2 for Assago (XXL Apericena from 19:30); (4) Just Me Parco Sempione (Royal Aperitivo + Torre Branca lift).',
    },
    {
      q: isIt
        ? 'Quanto costa un Tavolo VIP post-concerto per un gruppo di amici a Milano?'
        : 'How much does a post-concert VIP Table cost for a group of friends in Milan?',
      a: isIt
        ? 'I Tavoli VIP post-concerto partono da €250 - €400 (per 6-8 persone, 100% inclusi in bottiglie di Vodka/Gin/Champagne e pass salta-fila) da Aria Club (a 150m da San Siro), 55 Milano e Voya Rooftop 20° Piano; e da €300 - €600 da Pineta Corso Como, Repvblic e Just Me Milano.'
        : 'Post-concert VIP Tables start from €250 - €400 (covering 6-8 guests, 100% converted into Vodka/Gin/Champagne bottles plus skip-the-line passes) at Aria Club (150m from San Siro), 55 Milano, and Voya Rooftop 20th Floor; and from €300 - €600 at Pineta Corso Como, Repvblic, and Just Me Milano.',
    },
  ];

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: isIt
          ? 'Afterparty Concerti Milano 2026/2027: Stadio San Siro, Ippodromo I-Days, Unipol Forum Assago, Fabrique & Alcatraz'
          : 'Milan Concert Afterparties 2026/2027: San Siro Stadium, Ippodromo I-Days, Unipol Forum Assago, Fabrique & Alcatraz',
        description: isIt
          ? 'Mappa e guida ufficiale post-concerto per le 4 grandi arene live di Milano: Aria Club a 150m da San Siro, Just Me aperto 7/7, Pineta Corso Como, 55 Milano, Voya Rooftop 20° Piano e Repvblic.'
          : 'Official post-concert nightlife hub for Milans 4 major live music arenas: Aria Club 150m from San Siro, Just Me open 7/7, Pineta Corso Como, 55 Milano, Voya Rooftop 20th Floor, and Repvblic.',
        inLanguage: locale,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}#website`,
          name: 'Nightlife Milan',
          url: baseUrl,
        },
        provider: {
          '@type': 'Organization',
          name: 'Nightlife Milan Concert Afterparty Desk',
          telephone: '+39 351 912 7047',
          email: 'concierge@nightlifemilan.com',
          url: baseUrl,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#itemlist`,
        name: isIt
          ? 'I 6 Club Prioritari per Afterparty Concerti a Milano (San Siro, Ippodromo, Forum Assago)'
          : 'Top 6 Priority Clubs for Concert Afterparties in Milan (San Siro, Ippodromo, Forum Assago)',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: PRIORITY_CONCERT_CLUBS.length,
        itemListElement: PRIORITY_CONCERT_CLUBS.map((club, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: isIt ? club.nameIt : club.nameEn,
          url: `${baseUrl}${lp}/clubs/${club.slug}`,
          description: isIt ? club.descIt : club.descEn,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Nightlife Milan',
            item: `${baseUrl}${lp || '/'}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: isIt ? 'Eventi & Guide Speciali' : 'Events & Special Guides',
            item: `${baseUrl}${lp}/events`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: isIt ? 'Afterparty Concerti Milano' : 'Milan Concert Afterparties',
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="flex-grow pt-24 pb-24 bg-[#0f0c07] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* HERO CINEMATOGRAFICA AFTERPARTY CONCERTI MILANO */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="rounded-3xl border border-champagne/35 bg-gradient-to-br from-[#1b150c] via-[#110d08] to-[#080604] p-7 sm:p-12 lg:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          {/* Breadcrumb visibile */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-5 flex flex-wrap items-center gap-2">
            <Link href={lp || '/'} className="hover:text-champagne transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`${lp}/events`} className="hover:text-champagne transition-colors">
              {isIt ? 'Grandi Eventi Milano' : 'Milan Major Events'}
            </Link>
            <span>/</span>
            <span className="text-champagne font-semibold">
              {isIt ? 'Afterparty Concerti Milano' : 'Milan Concert Afterparties'}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-champagne/45 bg-champagne/15 mb-6">
            <Music className="w-3.5 h-3.5 text-champagne" />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-champagne">
              SAN SIRO · IPPODROMO I-DAYS · UNIPOL FORUM ASSAGO · FABRIQUE &amp; ALCATRAZ
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            {isIt
              ? 'Afterparty Concerti Milano 2026/2027: Dove Le Serate nei Club Dopo Stadio San Siro, Ippodromo Snai (La Maura), Unipol Forum Assago, Fabrique & Alcatraz'
              : 'Milan Concert Afterparties 2026/2027: Where to Party After San Siro Stadium, Ippodromo Snai (I-Days), Unipol Forum Assago, Fabrique & Alcatraz'}
          </h1>

          <p className="text-base sm:text-xl text-white/75 leading-relaxed max-w-4xl mb-8">
            {isIt
              ? 'Quando si spengono i riflettori del palco alle 23:15 e fino a 80.000 fan escono dallo Stadio San Siro, dall Ippodromo Snai La Maura o dall Unipol Forum di Assago, la notte milanese è appena iniziata. Scopri la mappa strategica post-concerto: cammina 150 metri a piedi fino ad Aria Club (#3 Priorità, Piazzale dello Sport 14), festeggia 7 notti su 7 con artisti e tour crew da Just Me sotto la Torre Branca (#1 Priorità), o raggiungi in metro Pineta Corso Como (#2), 55 Milano (#4), Voya Rooftop 20° Piano (#5) e Repvblic (#6).'
              : 'When the stage lights go dark at 23:15 and up to 80,000 fans exit San Siro Stadium, Ippodromo Snai La Maura, or Unipol Forum Assago, the Milan night is just getting started. Explore our strategic post-concert blueprint: walk 150 meters straight into Aria Club (#3 Priority, Piazzale dello Sport 14), party 7 nights a week with artists and tour crews at Just Me under Torre Branca (#1 Priority), or ride the metro to Pineta Corso Como (#2), 55 Milano (#4), Voya Rooftop 20th Floor (#5), and Repvblic (#6).'}
          </p>

          {/* 4 Hero Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-9">
            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'San Siro & Ippodromo' : 'San Siro & Hippodrome'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">150m a Piedi: Aria Club</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Piazzale dello Sport 14 (#3 Priorità): Official Concert Afterparty a 2 min a piedi.'
                  : 'Piazzale dello Sport 14 (#3 Priority): Official Concert Afterparty 2 min on foot.'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'Live Infrasettimanali' : 'Midweek Arena Tours'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">7/7 Notti: Just Me</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Aperto Lun-Dom fino alle 05:00 sotto la Torre Branca (#1 Priorità): ritrovo VIP & artisti.'
                  : 'Open Mon-Sun until 05:00 beneath Torre Branca (#1 Priority): artist & VIP hangout.'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'Unipol Forum Assago' : 'Unipol Forum Assago'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">M2 Diretta: Pineta &amp; 55</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? '18-22 min su M2 Verde diretta verso Cadorna (Sempione) e Garibaldi (Corso Como).'
                  : '18-22 min on direct M2 Green Line to Cadorna (Sempione) & Garibaldi (Corso Como).'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'Garanzia Fine Show' : 'Late Encore Guarantee'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">Tavolo Bloccato 01:00</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Prenota al +39 351 912 7047: teniamo il tavolo VIP anche se il bis finisce tardi.'
                  : 'Book via +39 351 912 7047: we hold your VIP table even when encores run late.'}
              </p>
            </div>
          </div>

          {/* Dual CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/393519127047?text=${encodeURIComponent(
                isIt
                  ? 'Ciao Concierge Nightlife Milan! Siamo a Milano per il concerto e vorremmo prenotare un Tavolo VIP / Afterparty Post-Concerto.'
                  : 'Hi Nightlife Milan Concierge! We are in Milan for a concert and would like to book a Post-Concert VIP Table / Afterparty.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-champagne text-black font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.16em] hover:bg-white transition-all shadow-[0_0_35px_rgba(201,168,106,0.4)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {isIt
                  ? 'Prenota Afterparty Concerto su WhatsApp (+39 351 912 7047)'
                  : 'Book Concert Afterparty on WhatsApp (+39 351 912 7047)'}
              </span>
            </a>

            <a
              href="#mappa-quattro-arene-concerti"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl border border-champagne/40 bg-white/[0.04] text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] hover:border-champagne hover:text-champagne transition-colors"
            >
              <MapPin className="w-4 h-4 text-champagne" />
              <span>
                {isIt ? 'Scopri la Mappa delle 4 Arene Live ↓' : 'Explore the 4 Live Arenas Blueprint ↓'}
              </span>
            </a>

            <span className="text-xs text-white/55">
              {isIt ? 'Desk Tour Management & Artist Hospitality: ' : 'Tour Management & Artist Hospitality Desk: '}
              <a href="mailto:concierge@nightlifemilan.com" className="text-champagne underline">
                concierge@nightlifemilan.com
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* INDICE CLICCABILE (TOC) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl border border-white/15 bg-white/[0.02] p-6 sm:p-8">
          <h2 id="indice-afterparty-concerti" className="font-serif text-2xl sm:text-3xl font-bold text-champagne mb-4">
            {isIt
              ? 'Indice della Guida Ufficiale Afterparty Concerti Milano 2026/2027'
              : 'Table of Contents: Official Milan Concert Afterparties Guide 2026/2027'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-champagne mb-2">
                {isIt ? 'Sezioni Principali (H2)' : 'Main Guide Sections (H2)'}
              </p>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="#mappa-quattro-arene-concerti" className="hover:text-champagne transition-colors">
                    1. {isIt
                      ? 'Mappa Strategica Post-Concerto per le 4 Grandi Arene Live di Milano'
                      : 'Strategic Post-Concert Blueprint for Milans 4 Major Live Arenas'}
                  </a>
                </li>
                <li>
                  <a href="#sei-club-prioritari-post-concerto" className="hover:text-champagne transition-colors">
                    2. {isIt
                      ? 'I 6 Club Prioritari Dove Andare Dopo il Concerto (Distanze, Prezzi e Formule)'
                      : 'The 6 Priority Clubs After the Concert (Distances, Prices & Formulas)'}
                  </a>
                </li>
                <li>
                  <a href="#dress-code-concerto-club-vip" className="hover:text-champagne transition-colors">
                    3. {isIt
                      ? 'Guida Dress Code Concerto -> Club VIP (Come superare la selezione dopo il live)'
                      : 'Concert-to-VIP Club Dress Code Guide (Passing Door Selection After a Show)'}
                  </a>
                </li>
                <li>
                  <a href="#navigator-settimanale-e-preventivo-vip" className="hover:text-champagne transition-colors">
                    4. {isIt
                      ? 'Calendario Settimanale Lun-Dom & Calcolatore Preventivo Tavoli VIP'
                      : 'Mon-Sun Weekly Nightlife Navigator & VIP Table Quote Calculator'}
                  </a>
                </li>
                <li>
                  <a href="#mappa-google-e-faq-concerti" className="hover:text-champagne transition-colors">
                    5. {isIt
                      ? 'Mappa San Siro / Ippodromo / Forum, 7 FAQ Strategiche e Link Correlati'
                      : 'San Siro / Ippodromo / Forum Map, 7 Strategic FAQs & Internal Silo Links'}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-champagne mb-2">
                {isIt ? 'Accesso Diretto alle 4 Arene Live (H3)' : 'Direct Jump to the 4 Live Arenas (H3)'}
              </p>
              <ul className="space-y-2 text-white/75">
                {CONCERT_ARENAS.map((arena) => (
                  <li key={arena.id}>
                    <a href={`#${arena.id}`} className="hover:text-champagne transition-colors">
                      → {isIt ? arena.titleIt : arena.titleEn}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 1: MAPPA STRATEGICA POST-CONCERTO PER LE 4 GRANDI ARENE LIVE DI MILANO */}
      <section id="mappa-quattro-arene-concerti" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
            {isIt
              ? 'SEZIONE 1 · PIANO LOGISTICO POST-LIVE PER ARENA'
              : 'SECTION 1 · POST-LIVE LOGISTICS BLUEPRINT BY ARENA'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isIt
              ? 'Mappa Strategica Post-Concerto per le 4 Grandi Arene Live di Milano'
              : 'Strategic Post-Concert Blueprint for Milans 4 Major Live Music Arenas'}
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-4xl">
            {isIt
              ? 'Ogni arena milanese ha tempi di deflusso e collegamenti notturni specifici. Ecco esattamente dove uscire la sera o bere un drink dopo l ultima canzone a San Siro, agli I-Days dell Ippodromo, all Unipol Forum di Assago o dopo i live di Fabrique e Alcatraz:'
              : 'Every Milan concert venue has specific exit flows and late-night transit corridors. Here is exactly where to party or book bottle service after the final song at San Siro, I-Days at the Hippodrome, Unipol Forum Assago, or Fabrique and Alcatraz:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {CONCERT_ARENAS.map((arena) => (
            <article
              key={arena.id}
              id={arena.id}
              className="rounded-3xl border border-champagne/30 bg-gradient-to-b from-[#18130b] to-[#0c0a06] p-7 sm:p-9 flex flex-col justify-between hover:border-champagne/60 transition-all"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-champagne/20 border border-champagne/40 text-champagne font-mono text-[10px] font-bold uppercase tracking-wider">
                    {isIt ? arena.badgeIt : arena.badgeEn}
                  </span>
                  <span className="text-xs font-mono text-white/60">
                    {isIt ? arena.endTimeIt : arena.endTimeEn}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                  {isIt ? arena.titleIt : arena.titleEn}
                </h3>

                <div className="p-4 rounded-2xl bg-champagne/10 border border-champagne/35 text-champagne font-semibold text-xs sm:text-sm mb-4">
                  {isIt ? arena.headlineClubIt : arena.headlineClubEn}
                </div>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-5">
                  {isIt ? arena.logisticsIt : arena.logisticsEn}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                  {isIt ? 'Club Abbinati in Ordine di Priorità:' : 'Paired Priority Clubs:'}
                </div>
                <div className="text-xs font-bold text-white mb-4">
                  {isIt ? arena.pairedClubsIt : arena.pairedClubsEn}
                </div>
                <a
                  href={`https://wa.me/393519127047?text=${encodeURIComponent(
                    isIt
                      ? `Ciao! Siamo al concerto (${arena.titleIt.split(':')[0]}) e vorremmo prenotare un Tavolo VIP post-concerto.`
                      : `Hi! We are attending a concert (${arena.titleEn.split(':')[0]}) and would like to book a post-concert VIP Table.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-champagne text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>
                    {isIt ? 'Blocca Tavolo per Questa Arena su WhatsApp' : 'Lock In VIP Table for This Arena'}
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEZIONE 2: I 6 CLUB PRIORITARI POST-CONCERTO */}
      <section id="sei-club-prioritari-post-concerto" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
            {isIt
              ? 'SEZIONE 2 · GERARCHIA UFFICIALE DEI 6 CLUB PRIORITARI'
              : 'SECTION 2 · OFFICIAL HIERARCHY OF THE 6 PRIORITY CLUBS'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isIt
              ? 'I 6 Locali Prioritari di Milano per Pre-Concerto (Aperitivo) e Afterparty fino alle 05:00'
              : 'Milans 6 Priority Venues for Pre-Concert Aperitivo & Late-Night Afterparties Until 05:00'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRIORITY_CONCERT_CLUBS.map((club) => (
            <article
              key={club.slug}
              className="rounded-3xl border border-white/15 bg-[#14100a] overflow-hidden flex flex-col justify-between hover:border-champagne/50 transition-all"
            >
              <div>
                <div className="relative h-56 w-full">
                  <Image
                    src={club.image}
                    alt={isIt ? club.nameIt : club.nameEn}
                    fill
                    quality={92}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14100a] via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-champagne text-black font-mono text-[10px] font-extrabold uppercase tracking-wider">
                    {isIt ? club.badgeIt : club.badgeEn}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    {isIt ? club.nameIt : club.nameEn}
                  </h3>
                  <div className="text-xs text-champagne font-semibold flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{isIt ? club.distanceIt : club.distanceEn}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4">
                    {isIt ? club.descIt : club.descEn}
                  </p>
                  <div className="p-3 rounded-xl bg-black/50 border border-champagne/25 text-xs text-champagne font-semibold">
                    {isIt ? club.pricesIt : club.pricesEn}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <Link
                  href={`${lp}/clubs/${club.slug}`}
                  className="text-xs font-semibold text-white hover:text-champagne transition-colors"
                >
                  {isIt ? 'Scheda Completa →' : 'Venue Guide →'}
                </Link>
                <a
                  href={`https://wa.me/393519127047?text=${encodeURIComponent(
                    isIt
                      ? `Ciao! Vorrei prenotare il post-concerto da ${club.nameIt}.`
                      : `Hi! I would like to book a post-concert table at ${club.nameEn}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-champagne text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  WhatsApp VIP
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEZIONE 3: GUIDA DRESS CODE CONCERTO -> CLUB VIP */}
      <section id="dress-code-concerto-club-vip" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl border border-amber-500/35 bg-gradient-to-b from-[#1b1409] to-[#0e0b06] p-7 sm:p-10">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-300 block mb-2">
            {isIt ? 'SEZIONE 3 · SELEZIONE ALLA PORTA POST-LIVE' : 'SECTION 3 · POST-SHOW DOOR SELECTION'}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-4">
            {isIt
              ? 'Guida Dress Code Concerto -> Club VIP: Come Vestirsi per lo Show ed Entrare nei Privé senza Rimbalzi'
              : 'Concert-to-VIP Club Dress Code Guide: How to Dress for the Show & Enter Milan VIP Clubs Smoothly'}
          </h2>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-4xl mb-6">
            {isIt
              ? 'Dopo un grande concerto estivo a San Siro / Ippodromo La Maura o uno show al Forum di Assago, molti gruppi vengono respinti all ingresso dei club perché si presentano in tenuta da prato/festival (pantaloncini corti, canotte, marsupi sportivi, scarpe sporche di terra o zaini). Ecco le 3 regole d oro del Concierge per passare dal Golden Circle al Privé VIP senza tornare in hotel:'
              : 'After a major stadium show at San Siro / La Maura or an arena concert at Forum Assago, many concertgoers get turned away at club doors because they arrive in festival pit attire (shorts, tank tops, muddy shoes, or bulky backpacks). Follow these 3 Golden Rules to transition straight from the Golden Circle to your VIP booth without going back to your hotel:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-black/55 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isIt ? '1. Pantalone Lungo & Scarpa Pulita' : '1. Full-Length Trousers & Clean Footwear'}</span>
              </div>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {isIt
                  ? 'Per gli uomini è tassativo il pantalone lungo (jeans nero/scuro o pantalone cargo/chino sartoriale) anche a Giugno, Luglio e Agosto. Abbina sneaker in pelle pulite o stivaletti (evita scarpe da running tecniche o infangate nel prato dell Ippodromo).'
                  : 'For men, full-length trousers (dark jeans or tailored chinos) are mandatory at Milan VIP clubs even in June, July, and August. Pair them with clean leather sneakers or boots (avoid running shoes or muddy festival footwear).'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/55 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isIt ? '2. Layering Smart-Rock / Fashion' : '2. Smart-Rock / Fashion Layering'}</span>
              </div>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {isIt
                  ? 'Invece della t-shirt del tour oversize, indossa una camicia leggera (lino o cotone sbottonata sopra una t-shirt basic a tinta unita) o un giubbotto in pelle/blazer leggero. Per le ragazze: top elegante, mini-dress o jeans con body e stivaletto/tacco comodo.'
                  : 'Instead of an oversized tour merch shirt, wear a light linen/cotton collared shirt (buttoned or layered over a clean plain tee) or a sharp leather jacket/blazer. For women: chic top, mini-dress, or jeans with a bodysuit and ankle boots/heels.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/55 border border-white/10">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isIt ? '3. Merchandising & Corsia Hostess VIP' : '3. Merch Check & VIP Hostess Escort'}</span>
              </div>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {isIt
                  ? 'Consegna subito al guardaroba eventuali felpe/poster acquistati al concerto. Prenotando un Tavolo VIP via WhatsApp (+39 351 912 7047) avrai l accoglienza diretta della Hostess VIP senza fare la coda della lista generale.'
                  : 'Hand any concert merch bags straight to the club coat check upon arrival. By pre-booking a VIP Table via WhatsApp (+39 351 912 7047), your group enjoys direct VIP Hostess escort bypassing the general admission line.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 4: WEEKLY NIGHTLIFE NAVIGATOR, VIP QUOTE CALCULATOR & PRIORITY SIX SHOWCASE */}
      <section id="navigator-settimanale-e-preventivo-vip" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <WeeklyNightlifeNavigator locale={locale} />
        <VipQuoteCalculator locale={locale} />
        <PrioritySixShowcase locale={locale} />
      </section>

      {/* SEZIONE 5: GOOGLE MAPS, 7 FAQ STRATEGICHE & LINK INTERNI */}
      <section id="mappa-google-e-faq-concerti" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Google Maps */}
        <div className="rounded-3xl border border-white/15 bg-white/[0.02] p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
                {isIt
                  ? 'SEZIONE 5 · GEOLOCALIZZAZIONE STADIO SAN SIRO, IPPODROMO & ARIA CLUB (150M)'
                  : 'SECTION 5 · GEOLOCATION OF SAN SIRO, IPPODROMO & ARIA CLUB (150M)'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                {isIt
                  ? 'Mappa Ufficiale Stadio San Siro, Ippodromo Snai e Aria Club Milano (Piazzale dello Sport 14)'
                  : 'Official Map of San Siro Stadium, Ippodromo Snai & Aria Club Milano (Piazzale dello Sport 14)'}
              </h2>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Piazzale+dello+Sport+14+Milano+Aria+Club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-wider text-champagne hover:underline"
            >
              {isIt ? 'Apri in Google Maps →' : 'Open in Google Maps →'}
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/15 h-80 sm:h-96 w-full bg-black">
            <iframe
              title={
                isIt
                  ? 'Mappa Afterparty Concerti San Siro e Ippodromo Milano (Aria Club Piazzale dello Sport 14)'
                  : 'Map of San Siro and Hippodrome Concert Afterparties Milan (Aria Club Piazzale dello Sport 14)'
              }
              src="https://www.google.com/maps?q=Piazzale+dello+Sport+14,+20151+Milano+MI,+Italy&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* 7 FAQ Strategiche */}
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-champagne mb-3">
            {isIt
              ? 'Domande Frequenti (FAQ) sugli Afterparty Concerti a Milano (San Siro, I-Days, Forum Assago)'
              : 'Frequently Asked Questions (FAQ): Concert Afterparties in Milan (San Siro, I-Days, Forum Assago)'}
          </h2>
          <p className="text-white/65 text-sm sm:text-base mb-8">
            {isIt
              ? 'Risposte ufficiali del Desk Concierge Nightlife Milan (+39 351 912 7047 · concierge@nightlifemilan.com) per fan, gruppi e ospitalità VIP.'
              : 'Official answers from the Nightlife Milan Concierge Desk (+39 351 912 7047 · concierge@nightlifemilan.com) for concertgoers, groups, and VIP guests.'}
          </p>

          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-champagne/35 transition-colors"
              >
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2 flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
                  <span>{f.q}</span>
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed pl-7">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Silo di Link Interni */}
        <div className="rounded-3xl border border-champagne/30 bg-gradient-to-r from-[#18130a] to-[#0f0c07] p-7 sm:p-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            {isIt
              ? 'Esplora il Silo Ufficiale San Siro, Grandi Eventi & Tavoli VIP Milano'
              : 'Explore the Official San Siro, Major Events & VIP Tables Silo'}
          </h2>
          <p className="text-xs sm:text-sm text-white/65 mb-6">
            {isIt
              ? 'Scopri le schede dei 6 club prioritari, l hub Dopo-Partita Calcio San Siro, Capodanno 2027 e Fashion Week:'
              : 'Explore our 6 priority venue guides, the San Siro Football Afterparty hub, NYE 2027, and Fashion Week:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs sm:text-sm">
            <Link
              href={`${lp}/clubs/aria-club-milano`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? '3. Aria Club (150m San Siro)' : '3. Aria Club (150m San Siro)'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/clubs/just-me-milano`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? '1. Just Me Milano (Aperto 7/7)' : '1. Just Me Milano (Open 7/7)'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/clubs/pineta-club-milano`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? '2. Pineta Club Corso Como' : '2. Pineta Club Corso Como'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/football-afterparties`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Dopo-Partita Calcio San Siro' : 'San Siro Football Afterparties'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/zones/san-siro`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Guida Quartiere San Siro' : 'San Siro District Guide'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/vip-tables`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Prenotazione Tavoli VIP' : 'VIP Tables Booking'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/new-years-eve`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Capodanno Milano 2027 (NYE)' : 'New Years Eve Milan 2027'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/fashion-week`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Milano Fashion Week & F1' : 'Milan Fashion Week & F1'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>
          </div>
        </div>
      </section>
      <VerticalHubsAndEventsSection locale={locale} initialTab="occasions" eventFocus="concerts" />
    </main>
  );
}
