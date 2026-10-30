import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { tr } from '@/lib/i18n/t';
import { getLocaleDef, hreflangAlternates, localePrefix } from '@/lib/i18n/locales';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { CONTACT } from '@/config/contact';
import {
  Sparkles,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Crown,
  ArrowRight,
  Calendar,
  Users,
  GlassWater,
} from 'lucide-react';
import {
  SanSiroMatchAfterpartyFinder,
  VipQuoteCalculator,
  PrioritySixShowcase,
} from '@/components/NightlifeExpansionModules';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = `${baseUrl}${localePrefix(locale)}/football-afterparties`;

  const title = seoTitle(
    tr(
      locale,
      'San Siro Football Match Afterparties Milan 2026/2027: Best Clubs, VIP Tables & Aperitivo After Inter & AC Milan (Serie A, Champions League & Derby)',
      'Dopo Partita San Siro Milano 2026/2027: Dove Andare a Ballare, Fare Aperitivo e Prenotare Tavoli VIP Dopo Inter e Milan (Serie A, Champions e Derby)'
    )
  );

  const description = withWhatsApp(
    tr(
      locale,
      'Official San Siro post-match nightlife hub (2026/2027): book VIP tables, Royal Aperitivo & singing dinners after Inter & AC Milan matches. Aria Club (150m from San Siro), Just Me (open 7/7), Pineta, 55 Milano, Voya Rooftop (20th floor, 3 M5 stops) & Repvblic. WhatsApp +39 351 912 7047.',
      'Guida ufficiale Dopo-Partita San Siro Milano 2026/2027: prenota Tavoli VIP, Royal Aperitivo e Cena Cantata dopo le partite di Inter e Milan. Aria Club (a 150m dallo stadio), Just Me (aperto 7/7), Pineta, 55 Milano, Voya Rooftop (20° piano a 3 fermate M5) e Repvblic. WhatsApp +39 351 912 7047.'
    ),
    locale
  );

  const languages = hreflangAlternates(baseUrl, '/football-afterparties');

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
          url: `${baseUrl}/images/venues/aria-club-milano/aria-club-milano-interior-01.webp`,
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
      images: [`${baseUrl}/images/venues/aria-club-milano/aria-club-milano-interior-01.webp`],
    },
  };
}

const POST_MATCH_CLUBS = [
  {
    order: 1,
    priorityBadgeIt: '#3 Priorità · A 150m dai Cancelli di San Siro!',
    priorityBadgeEn: '#3 Priority · 150m from San Siro Gates!',
    anchorId: 'aria-club-san-siro',
    slug: 'aria-club-milano',
    name: '1. Aria Club Milano (#3 Priorità — Piazzale dello Sport 14, a 150 metri dai cancelli di San Siro!)',
    nameEn: '1. Aria Club Milano (#3 Priority — Piazzale dello Sport 14, 150 meters from San Siro gates!)',
    address: 'Piazzale dello Sport, 14 — 20151 Milano (Zona San Siro / Ippodromo)',
    distanceIt: '2 minuti a piedi (150 metri reali dai cancelli Est dello Stadio Meazza)',
    distanceEn: '2 minutes on foot (150 meters from the East Gates of Giuseppe Meazza Stadium)',
    transitIt: 'Zero Taxi · Zero Coda M5 Lilla · Attraversi Piazzale dello Sport a piedi',
    transitEn: 'Zero Taxi · Zero M5 Metro Queue · Walk straight across Piazzale dello Sport',
    hoursIt: 'Giovedì, Venerdì, Sabato e Notti Big Match (19:30 Royal Aperitivo · 23:00–05:00 Club)',
    hoursEn: 'Thursday, Friday, Saturday & Big Match Nights (19:30 Royal Aperitivo · 23:00–05:00 Club)',
    pricesIt: 'Royal Aperitivo 15–25€ · Tavoli VIP Pista da 250€ · Privé Aria 400€ · Super Privé Console DJ 600€',
    pricesEn: 'Royal Aperitivo €15–25 · Dancefloor VIP from €250 · Privé Aria €400 · DJ Console Super Privé €600',
    image: '/images/venues/aria-club-milano/aria-club-milano-interior-01.webp',
    descriptionIt:
      'Aria Club Milano è il quartier generale assoluto del Terzo Tempo calcistico a Milano. Situato letteralmente di fronte allo Stadio Giuseppe Meazza in Piazzale dello Sport 14, a soli 150 metri reali dai varchi di uscita e dall’Ippodromo Snai San Siro, permette agli ospiti delle tribune VIP, agli Skybox aziendali e ai gruppi di tifosi eleganti di evitare completamente i 90 minuti di paralisi del traffico post-partita. Per le gare delle 15:00 o delle 18:00 puoi entrare direttamente alle 19:30 per il Royal Aperitivo con isole buffet e drink; per i posticipi serali delle 20:45 (fischio finale ore 22:40) attraversi la piazza a piedi e alle 22:50 sei già seduto nel tuo divanetto riservato con bottiglie di vodka Belvedere, Grey Goose o Champagne Moët & Chandon servite al tavolo.',
    descriptionEn:
      'Aria Club Milano is the undisputed headquarters of San Siro’s Third Half. Located literally across from the Giuseppe Meazza Stadium at Piazzale dello Sport 14—just 150 meters from the stadium exit gates and Snai San Siro Hippodrome—it allows VIP hospitality guests, corporate Skybox attendees, and smartly dressed supporters to completely bypass the 90-minute post-match traffic gridlock. For 15:00 or 18:00 kick-offs, walk straight in at 19:30 for the Royal Aperitivo buffet; for 20:45 night matches (final whistle at 22:40), cross the square on foot and be seated at your private VIP booth by 22:50 with Belvedere, Grey Goose, or Moët & Chandon bottle service.',
  },
  {
    order: 2,
    priorityBadgeIt: '#1 Priorità Assoluta · Aperto 7 Sere su 7',
    priorityBadgeEn: '#1 Top Priority · Open 7 Nights a Week',
    anchorId: 'just-me-milano-torre-branca',
    slug: 'just-me-milano',
    name: '2. Just Me Milano (#1 Priorità — Viale Luigi Camoens 2, Parco Sempione — Aperto 7 sere su 7 inclusi Martedì/Mercoledì di Champions e Lunedì/Domenica sera!)',
    nameEn: '2. Just Me Milano (#1 Priority — Viale Luigi Camoens 2, Parco Sempione — Open 7/7 including Tue/Wed Champions League & Mon/Sun nights!)',
    address: 'Viale Luigi Camoens, 2 (Parco Sempione / Torre Branca) — 20121 Milano',
    distanceIt: '10 minuti da San Siro in NCC/Taxi o M5 Lilla (Domodossola) + 3 min',
    distanceEn: '10 minutes from San Siro by Chauffeur/Taxi or M5 Line (Domodossola) + 3 min',
    transitIt: '10 min lungo l’asse Piazzale Lotto -> Corso Sempione -> Parco Sempione',
    transitEn: '10 min along the Piazzale Lotto -> Corso Sempione -> Parco Sempione axis',
    hoursIt: 'Aperto 7 Giorni su 7 (Lun–Dom): Royal Aperitivo 19:30–22:30 · Luxury Club 23:30–05:00',
    hoursEn: 'Open 7 Days a Week (Mon–Sun): Royal Aperitivo 19:30–22:30 · Luxury Club 23:30–05:00',
    pricesIt: 'Royal Aperitivo 20–30€ (con salita Torre Branca) · Tavoli VIP Pista 350–500€ · Privé Branca 1.000–3.000€',
    pricesEn: 'Royal Aperitivo €20–30 (with Torre Branca lift) · Dancefloor VIP €350–500 · Privé Branca €1,000–3,000',
    image: '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
    descriptionIt:
      'Firmato dallo stilista Roberto Cavalli ai piedi della monumentale Torre Branca (108 metri d’altezza nel cuore del Parco Sempione), Just Me Milano è la Priorità #1 assoluta della vita notturna milanese e presenta un vantaggio decisivo per chi assiste alle partite a San Siro: è l’unico top club di lusso aperto 7 notti su 7, 365 giorni l’anno. Quando Inter o Milan giocano il Martedì o Mercoledì sera in UEFA Champions League (fischio finale ore 22:55), la Domenica sera alle 20:45 o il posticipo del Lunedì, mentre la maggior parte delle discoteche tradizionali è chiusa, il Just Me garantisce sempre il party internazionale più esclusivo della città, frequentato da calciatori, dirigenti UEFA, modelli, ospiti degli Skybox e tifosi VIP in trasferta.',
    descriptionEn:
      'Designed by fashion icon Roberto Cavalli beneath the 108-meter Torre Branca in Parco Sempione, Just Me Milano is our #1 Priority venue in Milan and offers a decisive advantage for San Siro matchgoers: it is the only flagship luxury club open 7 nights a week, 365 days a year. When Inter or AC Milan play on Tuesday or Wednesday nights in the UEFA Champions League (final whistle at 22:55), Sunday night at 20:45, or Monday night fixtures—when most conventional clubs are closed—Just Me always delivers Milan’s most exclusive international party, frequented by footballers, club executives, models, and Skybox VIP guests.',
  },
  {
    order: 3,
    priorityBadgeIt: '#2 Priorità · Re dell’Aperitivo Cantato & Corso Como',
    priorityBadgeEn: '#2 Priority · King of Singing Aperitivo & Corso Como',
    anchorId: 'pineta-club-corso-como',
    slug: 'pineta-club-milano',
    name: '3. Pineta Club Milano (#2 Priorità — Via Messina 38 / Corso Como — Aperitivo Cantato e Privé del Venerdì e Sabato)',
    nameEn: '3. Pineta Club Milano (#2 Priority — Via Messina 38 / Corso Como — Friday & Saturday Singing Aperitivo & VIP Privé)',
    address: 'Via Messina, 38 (Area Corso Como / Porta Garibaldi / Cenisio) — 20154 Milano',
    distanceIt: '12 min diretti con M5 Lilla (San Siro Stadio -> Cenisio / Garibaldi)',
    distanceEn: '12 min direct on M5 Purple Line (San Siro Stadio -> Cenisio / Garibaldi)',
    transitIt: 'Collegamento diretto metropolitana M5 senza cambi dallo Stadio',
    transitEn: 'Direct M5 subway connection with zero transfers from the stadium',
    hoursIt: 'Venerdì, Sabato e Prefestivi Big Match (19:30 Buffet Cantato · 23:30–05:00 Club)',
    hoursEn: 'Friday, Saturday & Pre-Holiday Big Matches (19:30 Singing Buffet · 23:30–05:00 Club)',
    pricesIt: 'Aperitivo Cantato con Tavolo 20–25€ · Tavoli VIP Pista 300–400€ · Privé Rialzato 500–800€',
    pricesEn: 'Singing Aperitivo with Table €20–25 · Dancefloor VIP €300–400 · Elevated Privé €500–800',
    image: '/images/venues/pineta-milano/pineta-milano-ingresso-01.webp',
    descriptionIt:
      'Situato in Via Messina 38 a pochi passi da Corso Como e collegato in linea retta dallo Stadio San Siro tramite la metropolitana M5 Lilla (fermata Cenisio o Garibaldi in soli 12 minuti), il Pineta Club Milano (#2 Priorità ufficiale) è la meta perfetta per festeggiare una vittoria negli anticipi del Venerdì e del Sabato. Dalle 19:30 alle 23:00 il locale esplode con il celebre Aperitivo Cantato: grandi tavolate conviviali, hit italiane e internazionali cantate a squarciagola da tutto il locale, show di bottiglie luminose e un’energia travolgente che a mezzanotte si trasforma in una vera discoteca reggaeton, urban e commerciale fino alle 05:00.',
    descriptionEn:
      'Located at Via Messina 38 near Corso Como and connected directly to San Siro Stadium via the M5 Purple Line (Cenisio or Garibaldi stop in just 12 minutes), Pineta Club Milano (#2 Official Priority) is the ultimate venue to celebrate a Friday or Saturday matchday victory. From 19:30 to 23:00, the club ignites with its famous Singing Aperitivo—convivial group tables, Italian and international anthems sung by the entire room, sparkler bottle shows, and infectious energy that transitions at midnight into a full-throttle reggaeton, urban, and commercial club night until 05:00.',
  },
  {
    order: 4,
    priorityBadgeIt: '#4 Priorità · 4 Fermate M5 da San Siro',
    priorityBadgeEn: '#4 Priority · 4 M5 Stops from San Siro',
    anchorId: '55-milano-sempione',
    slug: '55-milano',
    name: '4. 55 Milano (#4 Priorità — Via Piero della Francesca 55, Sempione — A 4 fermate M5 da San Siro per Apericena XL e Dinner Show)',
    nameEn: '4. 55 Milano (#4 Priority — Via Piero della Francesca 55, Sempione — 4 M5 stops from San Siro for XXL Apericena & Dinner Show)',
    address: 'Via Piero della Francesca, 55 (Arco della Pace / Corso Sempione) — 20154 Milano',
    distanceIt: '6 minuti in M5 Lilla (4 fermate: San Siro -> Domodossola / Gerusalemme)',
    distanceEn: '6 minutes on M5 Purple Line (4 stops: San Siro -> Domodossola / Gerusalemme)',
    transitIt: '6 min M5 Lilla diretta dallo Stadio · Ideale per gruppi di 8–30 persone',
    transitEn: '6 min direct M5 subway from Stadium · Ideal for groups of 8–30 guests',
    hoursIt: 'Martedì–Domenica (19:30 Apericena XL & Dinner Show · 23:30–04:30 Club)',
    hoursEn: 'Tuesday–Sunday (19:30 XXL Apericena & Dinner Show · 23:30–04:30 Club)',
    pricesIt: 'Apericena Riservata 20–30€ · Dinner Show 50€ · Tavoli Dopocena VIP da 250–350€',
    pricesEn: 'Reserved Apericena €20–30 · Dinner Show €50 · Post-Dinner VIP Tables from €250–350',
    image: '/images/55-milano.webp',
    descriptionIt:
      'Ricavato all’interno di uno storico deposito ferroviario di oltre 1.000 metri quadri con soffitti industrial-chic e una spettacolare terrazza all’aperto in Via Piero della Francesca 55, il 55 Milano (FiftyFive, #4 Priorità) dista appena 4 fermate di metropolitana M5 dallo Stadio San Siro (6 minuti esatti di treno fino a Domodossola o Gerusalemme). È la soluzione regina per i gruppi numerosi di tifosi, gli addii al celibato calcistici e le comitive post-partita delle ore 15:00 o 18:00 che cercano un’Apericena XL con tavolo riservato tutta la sera, il Dinner Show del venerdì, il grande party "The Wall" del sabato notte o la celebre Domenica sera dopo il posticipo.',
    descriptionEn:
      'Set inside a converted 1,000-square-meter historic railway depot with industrial-chic ceilings and a vast outdoor terrace at Via Piero della Francesca 55, 55 Milano (FiftyFive, #4 Priority) is just 4 stops on the M5 Purple Line from San Siro Stadium (6 minutes by metro to Domodossola or Gerusalemme). It is the premier choice for large groups of friends, football bachelor trips, and post-15:00/18:00 match crowds seeking an XXL reserved Apericena table, Friday Dinner Shows, Saturday’s flagship "The Wall" club party, or Sunday night festivities.',
  },
  {
    order: 5,
    priorityBadgeIt: '#5 Priorità · 20° Piano Vista San Siro a 3 Fermate M5',
    priorityBadgeEn: '#5 Priority · 20th Floor San Siro View, 3 M5 Stops',
    anchorId: 'voya-rooftop-portello',
    slug: 'voya-rooftop-milan',
    name: '5. Voya Rooftop Milan (#5 Priorità — Via Achille Papa 30, 20° Piano Portello/Isola — A 3 fermate M5 da San Siro Lotto/Portello)',
    nameEn: '5. Voya Rooftop Milan (#5 Priority — Via Achille Papa 30, 20th Floor Portello — 3 M5 stops from San Siro Lotto/Portello)',
    address: 'Viale Achille Papa, 30 (20° Piano — Portello / CityLife) — 20149 Milano',
    distanceIt: '4 min / 3 fermate M5 Lotto->Portello (1,8 km in linea d’aria da San Siro)',
    distanceEn: '4 min / 3 stops M5 Lotto->Portello (1.8 km from San Siro Stadium)',
    transitIt: '3 fermate M5 Lilla diretta da San Siro a Portello + ascensore rapido al 20° piano',
    transitEn: '3 direct M5 stops from San Siro to Portello + express lift to the 20th floor',
    hoursIt: 'Martedì–Domenica (18:30 Sunset & Post-Match Aperitivo · 22:30–02:30 Sky Lounge DJ Set)',
    hoursEn: 'Tuesday–Sunday (18:30 Sunset & Post-Match Aperitivo · 22:30–02:30 Sky Lounge DJ Set)',
    pricesIt: 'Aperitivo Panoramico 20–30€ · Tavoli VIP Vetrata Skyline 250–400€',
    pricesEn: 'Panoramic Aperitivo €20–30 · Skyline Glass Window VIP Tables €250–400',
    image: '/images/voya-rooftop-milan.webp',
    descriptionIt:
      'Sospeso al 20° piano a 85 metri d’altezza in Viale Achille Papa 30 (quartiere Portello/CityLife, a sole 3 fermate di M5 Lilla da San Siro), Voya Rooftop Milan (#5 Priorità) offre uno spettacolo visivo unico a Milano: dalle sue vetrate a 360 gradi puoi letteralmente ammirare dall’alto i fasci di luce rossa e blu dello Stadio Giuseppe Meazza illuminato e le Tre Torri di CityLife. È il salotto panoramico prediletto dagli ospiti Corporate Hospitality, dagli sponsor di Inter e Milan, dalle coppie e dai professionisti che dopo il fischio finale desiderano alta mixology, tapas gourmet e un DJ set deep-house in quota senza il caos della folla.',
    descriptionEn:
      'Perched on the 20th floor at 85 meters high on Viale Achille Papa 30 (Portello/CityLife district, just 3 stops on the M5 Purple Line from San Siro), Voya Rooftop Milan (#5 Priority) delivers a visual spectacle unmatched in Milan: through its 360-degree floor-to-ceiling windows, you look directly out over the glowing floodlights of San Siro Stadium and the Three Towers of CityLife. It is the preferred panoramic sky lounge for Corporate Hospitality guests, club sponsors, couples, and executives seeking craft mixology, gourmet tapas, and a deep-house DJ set above the city.',
  },
  {
    order: 6,
    priorityBadgeIt: '#6 Priorità · Dirty Monday & Grandi Weekend House/Urban',
    priorityBadgeEn: '#6 Priority · Dirty Monday & House/Urban Weekends',
    anchorId: 'repvblic-milano-repubblica',
    slug: 'repvblic-milano',
    name: '6. Repvblic Milano (#6 Priorità — Piazza della Repubblica — Dirty Monday dopo i posticipi del lunedì e grandi weekend House/Urban)',
    nameEn: '6. Repvblic Milano (#6 Priority — Piazza della Repubblica — Dirty Monday after Monday Night Football & House/Urban Weekends)',
    address: 'Piazza della Repubblica / Via Mecenate — Milano',
    distanceIt: '15 min da San Siro (M5 Lilla fino a Garibaldi + 1 fermata Repubblica o Taxi)',
    distanceEn: '15 min from San Siro (M5 Line to Garibaldi + 1 stop to Repubblica or Taxi)',
    transitIt: 'Asse diretto M5 Garibaldi -> Piazza della Repubblica (vicino agli hotel 5 stelle)',
    transitEn: 'Direct M5 Garibaldi -> Piazza della Repubblica axis (next to 5-star hotels)',
    hoursIt: 'Lunedì (Dirty Monday), Venerdì e Sabato (23:30–05:00)',
    hoursEn: 'Monday (Dirty Monday), Friday & Saturday (23:30–05:00)',
    pricesIt: 'Tavoli VIP Pista da 300€ · Tavoli Privé Rialzato 500–800€ · Super Privé Console da 1.000€',
    pricesEn: 'Dancefloor VIP from €300 · Elevated Privé €500–800 · Console Super Privé from €1,000',
    image: '/images/repvblic-milano.webp',
    descriptionIt:
      'Quando il calendario di Serie A programma il posticipo di Inter o Milan il Lunedì sera alle 20:45 (Monday Night), Repvblic Milano (#6 Priorità) insieme al Just Me è la risposta assoluta: la sua celebre serata "Dirty Monday" è l’appuntamento hip-hop, urban e house più famoso del lunedì milanese, frequentato da modelli, PR, calciatori e turisti internazionali alloggiati negli hotel 5 stelle di Porta Nuova e Piazza della Repubblica. Nel weekend (venerdì e sabato) Repvblic offre un impianto audio-luci d’avanguardia e tavoli Privé ad altissimo tasso scenografico.',
    descriptionEn:
      'Whenever Serie A schedules Inter or AC Milan for a Monday Night 20:45 fixture, Repvblic Milano (#6 Priority)—alongside Just Me—is the definitive destination: its legendary "Dirty Monday" is Milan’s premier Monday hip-hop, urban, and house night, drawing models, footballers, and international travelers staying at the 5-star hotels of Porta Nuova and Piazza della Repubblica. On Fridays and Saturdays, Repvblic delivers a cutting-edge lighting rig and high-impact VIP bottle service.',
  },
];

const SAN_SIRO_MATCH_CALENDAR = [
  {
    matchIt: 'Derby della Madonnina: Inter vs AC Milan / AC Milan vs Inter',
    matchEn: 'Derby della Madonnina: Inter vs AC Milan / AC Milan vs Inter',
    competition: 'Serie A Enilive / Coppa Italia / UEFA',
    kickoff: 'Domenica 20:45 (Fischio finale ~22:40)',
    whistleEn: 'Sunday 20:45 (Final Whistle ~22:40)',
    bestClubsIt: '#1 Just Me (7/7), #3 Aria Club (150m), #4 55 Milano, #5 Voya Rooftop',
    bestClubsEn: '#1 Just Me (7/7), #3 Aria Club (150m), #4 55 Milano, #5 Voya Rooftop',
    minSpend: '€350 – €1.500 (Prenota 7gg prima)',
    isoDate: '2026-11-22T20:45:00+01:00',
  },
  {
    matchIt: 'UEFA Champions League Night — FC Internazionale Milano in Casa',
    matchEn: 'UEFA Champions League Night — FC Internazionale Milano Home Fixture',
    competition: 'UEFA Champions League (League Phase & Knockout)',
    kickoff: 'Martedì o Mercoledì 21:00 (Fischio finale ~22:55)',
    whistleEn: 'Tuesday or Wednesday 21:00 (Final Whistle ~22:55)',
    bestClubsIt: '#1 Just Me Torre Branca (Aperto 7/7), #5 Voya Rooftop (20° Piano), #4 55 Milano',
    bestClubsEn: '#1 Just Me Torre Branca (Open 7/7), #5 Voya Rooftop (20th Floor), #4 55 Milano',
    minSpend: '€300 – €1.000 (100% in bottiglie)',
    isoDate: '2026-11-04T21:00:00+01:00',
  },
  {
    matchIt: 'UEFA Champions League Night — AC Milan in Casa a San Siro',
    matchEn: 'UEFA Champions League Night — AC Milan Home Fixture at San Siro',
    competition: 'UEFA Champions League (League Phase & Knockout)',
    kickoff: 'Martedì o Mercoledì 21:00 (Fischio finale ~22:55)',
    whistleEn: 'Tuesday or Wednesday 21:00 (Final Whistle ~22:55)',
    bestClubsIt: '#1 Just Me Milano (Aperto 7/7), #5 Voya Rooftop (3 fermate M5), #4 55 Milano',
    bestClubsEn: '#1 Just Me Milano (Open 7/7), #5 Voya Rooftop (3 M5 stops), #4 55 Milano',
    minSpend: '€300 – €1.000 (100% in bottiglie)',
    isoDate: '2026-11-25T21:00:00+01:00',
  },
  {
    matchIt: 'Big Match Sabato Sera (Inter/Milan vs Juventus, Napoli, Roma, Atalanta)',
    matchEn: 'Saturday Night Big Match (Inter/Milan vs Juventus, Napoli, Roma, Atalanta)',
    competition: 'Serie A — Anticipo Serale del Sabato',
    kickoff: 'Sabato 20:45 (Fischio finale ~22:40)',
    whistleEn: 'Saturday 20:45 (Final Whistle ~22:40)',
    bestClubsIt: '#3 Aria Club (150m a piedi), #1 Just Me, #2 Pineta Corso Como, #4 55 Milano, #5 Voya, #6 Repvblic',
    bestClubsEn: '#3 Aria Club (150m walk), #1 Just Me, #2 Pineta Corso Como, #4 55 Milano, #5 Voya, #6 Repvblic',
    minSpend: '€250 – €1.200 (Salta-Fila Hostess)',
    isoDate: '2026-11-14T20:45:00+01:00',
  },
  {
    matchIt: 'Partita Pomeridiana / Pre-Serale (Sabato o Domenica ore 15:00 / 18:00)',
    matchEn: 'Afternoon / Early Evening Match (Saturday or Sunday 15:00 / 18:00)',
    competition: 'Serie A — Slot Pomeridiano & Sunset',
    kickoff: '15:00 o 18:00 (Fischio finale 17:00 / 20:00)',
    whistleEn: '15:00 or 18:00 (Final Whistle 17:00 / 20:00)',
    bestClubsIt: 'Royal Aperitivo & Cena Cantata: #2 Pineta (19:30), #3 Aria (150m), #4 55 Milano, #5 Voya Rooftop, #1 Just Me',
    bestClubsEn: 'Royal Aperitivo & Singing Dinner: #2 Pineta (19:30), #3 Aria (150m), #4 55 Milano, #5 Voya Rooftop, #1 Just Me',
    minSpend: 'Aperitivo €20–30 · Tavolo Sera €250+',
    isoDate: '2026-11-08T18:00:00+01:00',
  },
  {
    matchIt: 'Monday Night Serie A (Posticipo del Lunedì Sera a San Siro)',
    matchEn: 'Serie A Monday Night Football at San Siro',
    competition: 'Serie A — Posticipo del Lunedì',
    kickoff: 'Lunedì 20:45 (Fischio finale ~22:40)',
    whistleEn: 'Monday 20:45 (Final Whistle ~22:40)',
    bestClubsIt: '#6 Repvblic Milano (Dirty Monday Hip-Hop/House) & #1 Just Me Torre Branca (Aperto 7/7)',
    bestClubsEn: '#6 Repvblic Milano (Dirty Monday Hip-Hop/House) & #1 Just Me Torre Branca (Open 7/7)',
    minSpend: '€300 – €600 (Ingresso VIP 23:15)',
    isoDate: '2026-11-30T20:45:00+01:00',
  },
  {
    matchIt: 'Quarti & Semifinali Coppa Italia (Notte Infrasettimanale a San Siro)',
    matchEn: 'Coppa Italia Quarter-Finals & Semi-Finals at San Siro',
    competition: 'Coppa Italia Frecciarossa',
    kickoff: 'Martedì / Mercoledì / Giovedì 21:00 (Fischio finale ~22:55)',
    whistleEn: 'Tuesday / Wednesday / Thursday 21:00 (Final Whistle ~22:55)',
    bestClubsIt: '#1 Just Me (7/7), #3 Aria Club (se Giovedì), #4 55 Milano, #5 Voya Rooftop',
    bestClubsEn: '#1 Just Me (7/7), #3 Aria Club (if Thursday), #4 55 Milano, #5 Voya Rooftop',
    minSpend: '€250 – €800 (Tavolo Garantito anche coi Supplementari)',
    isoDate: '2027-01-13T21:00:00+01:00',
  },
];

export default async function FootballAfterpartiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);
  const canonicalUrl = `${baseUrl}${lp}/football-afterparties`;

  const faqs = [
    {
      q: isIt
        ? 'Qual è la discoteca più vicina allo Stadio San Siro per andare a ballare a piedi dopo la partita?'
        : 'Which nightclub is closest to San Siro Stadium to walk to after an Inter or AC Milan match?',
      a: isIt
        ? 'Aria Club Milano (#3 Priorità Nightlife Milan) si trova in Piazzale dello Sport 14, a soli 150 metri reali (2 minuti a piedi) dai cancelli dello Stadio Giuseppe Meazza. Permette di fare il Royal Aperitivo dalle 19:30 o di entrare direttamente al proprio Tavolo VIP dopo il fischio finale delle 22:40 senza prendere taxi e senza fare coda alla metro M5.'
        : 'Aria Club Milano (#3 Priority) is located at Piazzale dello Sport 14, just 150 meters (a 2-minute walk) from the gates of Giuseppe Meazza Stadium. You can walk straight in for Royal Aperitivo from 19:30 or step into your reserved VIP Table after the 22:40 final whistle with zero taxi wait and zero M5 subway queues.',
    },
    {
      q: isIt
        ? 'Dove andare a ballare a Milano dopo una partita di Champions League il Martedì o Mercoledì sera?'
        : 'Where to go clubbing in Milan after a Champions League match on Tuesday or Wednesday night?',
      a: isIt
        ? 'Per le notti infrasettimanali di UEFA Champions League (fischio finale ore 22:55), la scelta #1 assoluta è Just Me Milano sotto la Torre Branca in Parco Sempione (Viale Luigi Camoens 2), l’unico top club di lusso aperto 7 sere su 7 fino alle 05:00. In alternativa, a sole 3 fermate di M5 da San Siro, Voya Rooftop (20° piano, Via Achille Papa 30) e 55 Milano (4 fermate M5, Via Piero della Francesca 55) offrono drink panoramici e serata.'
        : 'For midweek UEFA Champions League nights (final whistle around 22:55), the #1 choice is Just Me Milano beneath Torre Branca in Parco Sempione (Viale Luigi Camoens 2), the only luxury flagship club open 7 nights a week until 05:00. Alternatively, just 3 M5 stops from San Siro, Voya Rooftop (20th floor, Via Achille Papa 30) and 55 Milano (4 M5 stops) offer skyline drinks and late-night vibes.',
    },
    {
      q: isIt
        ? 'Posso entrare in discoteca a Milano dopo la partita indossando la maglia dell’Inter o del Milan?'
        : 'Can I enter Milan VIP clubs after the match wearing an Inter or AC Milan football jersey?',
      a: isIt
        ? 'Attenzione: dopo le ore 23:00 tutti i club VIP di Milano (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic) applicano una rigorosa selezione Dress Code alla porta che vieta maglie da calcio tecniche, sciarpe da tifoso, tute e cappellini. Il consiglio del Concierge è indossare per lo stadio una camicia, polo o maglia scura a tinta unita sotto il giubbotto o blazer, lasciando l’eventuale sciarpa in auto, in hotel o consegnandola al guardaroba.'
        : 'Important: after 23:00, all Milan VIP clubs (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic) enforce a strict smart-casual/elegant door policy that prohibits replica football jerseys, team scarves, tracksuits, and caps. Our Concierge tip: wear a collared shirt, polo, or plain dark knit under your jacket to the stadium, and leave any team scarf in your car, hotel, or coat check.',
    },
    {
      q: isIt
        ? 'Cosa succede alla prenotazione del Tavolo VIP se la partita finisce tardi o va ai tempi supplementari?'
        : 'What happens to our VIP Table reservation if the match finishes late or goes into extra time?',
      a: isIt
        ? 'Prenotando tramite il Desk Ufficiale Nightlife Milan su WhatsApp (+39 351 912 7047) o email (concierge@nightlifemilan.com), il tuo tavolo VIP è protetto da garanzia Matchday: monitoriamo in tempo reale l’orario del fischio finale, eventuali recuperi lunghi o tempi supplementari/rigori di Champions League e Coppa Italia, mantenendo bloccato il tuo divanetto fino al vostro arrivo.'
        : 'When you book through the Official Nightlife Milan Desk via WhatsApp (+39 351 912 7047) or email (concierge@nightlifemilan.com), your VIP table includes our Matchday Hold Guarantee: we track the live final whistle, injury time, and any Champions League or Coppa Italia extra time/penalties, keeping your booth secured until your group arrives.',
    },
    {
      q: isIt
        ? 'Quanto costa un Tavolo VIP post-partita nei 6 locali prioritari di Milano?'
        : 'How much does a post-match VIP Table cost across Milan’s 6 priority clubs?',
      a: isIt
        ? 'Il prezzo del Tavolo VIP (100% convertito in bottiglie dal listino ufficiale e comprensivo di 6–10 pass salta-fila) parte da: €250–€400 da Aria Club (a 150m da San Siro) e 55 Milano; €250–€400 al 20° piano di Voya Rooftop; €300–€600 da Pineta Club Corso Como e Repvblic; €350–€500 in pista e €1.000–€3.000 nel Privé Branca da Just Me Milano.'
        : 'VIP Table minimum spend (100% converted into menu bottles and including 6–10 skip-the-line passes) starts from: €250–€400 at Aria Club (150m from San Siro) and 55 Milano; €250–€400 on the 20th floor at Voya Rooftop; €300–€600 at Pineta Club Corso Como and Repvblic; €350–€500 on the dancefloor and €1,000–€3,000 in the Privé Branca at Just Me Milano.',
    },
    {
      q: isIt
        ? 'Qual è il modo più veloce per spostarsi da San Siro verso Corso Sempione, Portello e Corso Como dopo il fischio finale?'
        : 'What is the fastest way to get from San Siro to Sempione, Portello, and Corso Como after the final whistle?',
      a: isIt
        ? 'Evita i taxi fermi nel traffico dei 75.000 spettatori: (1) Vai a piedi in 2 minuti da Aria Club (150m in Piazzale dello Sport 14); oppure (2) Prendi la Metropolitana Linea M5 Lilla da San Siro Stadio/Ippodromo/Lotto che in 4 minuti (3 fermate) ti porta a Portello per Voya Rooftop, in 6 minuti (4 fermate) a Domodossola/Gerusalemme per 55 Milano e Just Me, e in 12 minuti a Cenisio/Garibaldi per Pineta Club e Repvblic.'
        : 'Avoid street taxis stuck in 75,000-fan gridlock: (1) Walk 2 minutes (150m) straight into Aria Club at Piazzale dello Sport 14; or (2) Hop on the automated M5 Purple Metro Line from San Siro Stadio/Lotto, which reaches Portello (Voya Rooftop) in 4 minutes (3 stops), Domodossola/Gerusalemme (55 Milano & Just Me) in 6 minutes (4 stops), and Cenisio/Garibaldi (Pineta Club & Repvblic) in 12 minutes.',
    },
    {
      q: isIt
        ? 'I gruppi di soli uomini (es. tifosi in trasferta o amici) possono entrare in discoteca dopo la partita?'
        : 'Can all-male groups of football fans get into Milan clubs after a match?',
      a: isIt
        ? 'Presentarsi in lista o senza prenotazione in gruppi di 5–10 soli uomini dopo la partita comporta quasi sempre il rimbalzo alla porta. La soluzione sicura al 100% è prenotare in anticipo un Tavolo VIP (da €250–€350 diviso tra i partecipanti) tramite WhatsApp al +39 351 912 7047: avrete ingresso dedicato salta-fila con Hostess e tavolo garantito (rispettando sempre il dress code con camicia/polo).'
        : 'Showing up on a regular guest list as a group of 5–10 men after a football match almost always results in door rejection. The 100% guaranteed solution is booking a reserved VIP Table in advance (starting from €250–€350 split across the group) via WhatsApp at +39 351 912 7047, giving you dedicated VIP Hostess entry (provided everyone wears smart attire without football jerseys).',
    },
    {
      q: isIt
        ? 'Dove fare Aperitivo o Cena Cantata dopo una partita delle 15:00 o delle 18:00 a San Siro?'
        : 'Where should we go for Aperitivo or a Singing Dinner after a 15:00 or 18:00 match at San Siro?',
      a: isIt
        ? 'Dopo le gare pomeridiane (fischio finale ore 17:00 o 20:00), le 5 migliori opzioni sono: (1) Aria Club a 150m dallo stadio (Royal Aperitivo dalle 19:30); (2) Voya Rooftop al 20° piano a 3 fermate M5 (Sunset & Skyline Aperitivo dalle 18:30); (3) 55 Milano a 4 fermate M5 (Apericena XL e Dinner Show); (4) Pineta Club Corso Como (il Re dell’Aperitivo Cantato del venerdì e sabato); (5) Just Me Parco Sempione (Royal Aperitivo + salita Torre Branca).'
        : 'After afternoon or 18:00 fixtures (final whistle at 17:00 or 20:00), the top 5 choices are: (1) Aria Club 150m from the stadium (Royal Aperitivo from 19:30); (2) Voya Rooftop 20th floor, 3 M5 stops away (Skyline Aperitivo from 18:30); (3) 55 Milano, 4 M5 stops away (XXL Apericena & Dinner Show); (4) Pineta Club Corso Como (Friday/Saturday Singing Aperitivo); (5) Just Me Parco Sempione (Royal Aperitivo + Torre Branca lift).',
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
          ? 'Dopo Partita San Siro Milano 2026/2027: Dove Andare a Ballare, Aperitivo e Tavoli VIP Dopo Inter e Milan'
          : 'San Siro Football Match Afterparties Milan 2026/2027: Best Clubs, VIP Tables & Aperitivo After Inter & AC Milan',
        description: isIt
          ? 'Hub ufficiale Dopo-Partita Stadio San Siro (Giuseppe Meazza) Milano: i 6 migliori club e rooftop per terzo tempo, cena cantata e tavoli VIP dopo Inter, Milan, Derby e Champions League.'
          : 'Official San Siro Stadium (Giuseppe Meazza) post-match nightlife hub in Milan: the 6 best clubs and rooftops for third-half drinks, singing dinners, and VIP tables after Inter, AC Milan, Derby, and Champions League.',
        inLanguage: locale,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}#website`,
          name: 'Nightlife Milan',
          url: baseUrl,
        },
        about: {
          '@type': 'StadiumOrArena',
          name: 'Stadio Giuseppe Meazza (San Siro)',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Piazzale Angelo Moratti',
            addressLocality: 'Milano',
            postalCode: '20151',
            addressCountry: 'IT',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 45.4781,
            longitude: 9.124,
          },
        },
        provider: {
          '@type': 'Organization',
          name: 'Nightlife Milan Official VIP Concierge',
          telephone: '+39 351 912 7047',
          email: 'concierge@nightlifemilan.com',
          url: baseUrl,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#itemlist`,
        name: isIt
          ? 'I 6 Migliori Locali e Discoteche Dove Andare Dopo la Partita a San Siro Milano'
          : 'Top 6 Best Post-Match Clubs & Rooftops Near San Siro Stadium Milan',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: POST_MATCH_CLUBS.length,
        itemListElement: POST_MATCH_CLUBS.map((club, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: isIt ? club.name : club.nameEn,
          url: `${baseUrl}${lp}/clubs/${club.slug}`,
          description: isIt ? club.descriptionIt : club.descriptionEn,
        })),
      },
      ...SAN_SIRO_MATCH_CALENDAR.slice(0, 4).map((m, idx) => ({
        '@type': 'SportsEvent',
        '@id': `${canonicalUrl}#sportsevent-${idx + 1}`,
        name: isIt ? m.matchIt : m.matchEn,
        startDate: m.isoDate,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'StadiumOrArena',
          name: 'Stadio Giuseppe Meazza (San Siro)',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Piazzale Angelo Moratti / Piazzale dello Sport',
            addressLocality: 'Milano',
            postalCode: '20151',
            addressCountry: 'IT',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'Nightlife Milan Afterparty Desk',
          telephone: '+39 351 912 7047',
          email: 'concierge@nightlifemilan.com',
        },
      })),
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
            name: isIt ? 'Zone di Milano: San Siro' : 'Milan Districts: San Siro',
            item: `${baseUrl}${lp}/zones/san-siro`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: isIt ? 'Dopo-Partita San Siro (Inter & Milan)' : 'San Siro Football Afterparties (Inter & Milan)',
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

      {/* HERO CINEMATOGRAFICA */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="rounded-3xl border border-champagne/35 bg-gradient-to-br from-[#1b150c] via-[#110d08] to-[#080604] p-7 sm:p-12 lg:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          {/* Breadcrumb visibile */}
          <nav aria-label="Breadcrumb" className="text-xs text-white/50 mb-5 flex flex-wrap items-center gap-2">
            <Link href={lp || '/'} className="hover:text-champagne transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`${lp}/zones/san-siro`} className="hover:text-champagne transition-colors">
              {isIt ? 'Zona San Siro' : 'San Siro District'}
            </Link>
            <span>/</span>
            <span className="text-champagne font-semibold">
              {isIt ? 'Dopo-Partita Calcio Inter & Milan' : 'Football Match Afterparties'}
            </span>
          </nav>

          {/* Live Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-champagne/45 bg-champagne/15 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-champagne">
              STADIO GIUSEPPE MEAZZA (SAN SIRO) · TERZO TEMPO &amp; VIP AFTERPARTY DESK
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            {isIt
              ? 'Dopo Partita San Siro Milano 2026/2027: Dove Andare a Ballare, Fare Aperitivo e Prenotare Tavoli VIP Dopo le Partite di Inter e Milan (Serie A, Champions League, Derby e Coppa Italia)'
              : 'San Siro Football Match Afterparties Milan 2026/2027: Where to Party, Enjoy Royal Aperitivo & Book VIP Tables After Inter & AC Milan Matches (Serie A, Champions League, Derby & Coppa Italia)'}
          </h1>

          <p className="text-base sm:text-xl text-white/75 leading-relaxed max-w-4xl mb-8">
            {isIt
              ? 'Quando l’arbitro fischia la fine allo Stadio Giuseppe Meazza e 75.000 spettatori si riversano su Piazzale dello Sport e Piazzale Lotto, avere già il tuo Tavolo VIP o Royal Aperitivo riservato trasforma il post-partita in una serata leggendaria. Scopri i 6 locali prioritari di Milano — da Aria Club a soli 150 metri a piedi dai cancelli di San Siro, a Just Me sotto la Torre Branca (aperto 7 sere su 7 anche il Martedì e Mercoledì di Champions League), fino a Voya Rooftop al 20° piano (3 fermate M5), 55 Milano (4 fermate M5), Pineta Corso Como e Repvblic.'
              : 'When the final whistle blows at Giuseppe Meazza Stadium and 75,000 fans pour into Piazzale dello Sport and Piazzale Lotto, having your VIP Table or Royal Aperitivo pre-reserved turns matchday into an unforgettable Milanese night. Compare our 6 priority venues—from Aria Club just 150 meters on foot from the stadium gates, to Just Me under Torre Branca (open 7 nights a week including Tuesday & Wednesday Champions League nights), Voya Rooftop on the 20th floor (3 M5 stops), 55 Milano (4 M5 stops), Pineta Corso Como, and Repvblic.'}
          </p>

          {/* 4 Hero Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-9">
            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'Zero Taxi · A Piedi' : 'Zero Taxi · Walk-In'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">150m da San Siro: Aria Club</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Piazzale dello Sport 14: 2 minuti a piedi dai cancelli dello stadio (#3 Priorità).'
                  : 'Piazzale dello Sport 14: 2-minute walk from the stadium gates (#3 Priority).'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'Champions & Domenica' : 'Champions & Sunday'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">7/7 Notti Aperte: Just Me</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Aperto Lunedì, Martedì, Mercoledì e Domenica sotto la Torre Branca (#1 Priorità).'
                  : 'Open Monday, Tuesday, Wednesday & Sunday beneath Torre Branca (#1 Priority).'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? '3 Fermate M5 Lilla' : '3 Stops on M5 Metro'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">
                20° Piano Vista Stadio/Skyline: Voya Rooftop
              </div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? '4 minuti in M5 (Portello): sky lounge a 85m con vista luci San Siro (#5 Priorità).'
                  : '4 minutes on M5 (Portello): 85m sky lounge overlooking San Siro lights (#5 Priority).'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'Garanzia Supplementari' : 'Extra-Time Hold'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">75.000 Tifosi a Partita</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Desk diretto +39 351 912 7047: teniamo il tavolo VIP fino al vostro arrivo.'
                  : 'Direct Desk +39 351 912 7047: we hold your VIP booth until you arrive.'}
              </p>
            </div>
          </div>

          {/* Dual CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/393519127047?text=${encodeURIComponent(
                isIt
                  ? 'Ciao Concierge Nightlife Milan! Siamo a San Siro per la partita e vorremmo prenotare un Tavolo VIP / Aperitivo Post-Partita.'
                  : 'Hi Nightlife Milan Concierge! We are attending a match at San Siro and would like to book a Post-Match VIP Table / Aperitivo.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-champagne text-black font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.16em] hover:bg-white transition-all shadow-[0_0_35px_rgba(201,168,106,0.4)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {isIt
                  ? 'Prenota Dopo-Partita su WhatsApp (+39 351 912 7047)'
                  : 'Book Post-Match Table on WhatsApp (+39 351 912 7047)'}
              </span>
            </a>

            <a
              href="#san-siro-match-finder"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl border border-champagne/40 bg-white/[0.04] text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] hover:border-champagne hover:text-champagne transition-colors"
            >
              <Clock className="w-4 h-4 text-champagne" />
              <span>
                {isIt
                  ? 'Usa il Pianificatore Terzo Tempo San Siro ↓'
                  : 'Use the Interactive San Siro Match Planner ↓'}
              </span>
            </a>

            <span className="text-xs text-white/55">
              {isIt ? 'Email Desk Corporate & Skybox: ' : 'Corporate & Skybox Email Desk: '}
              <a href="mailto:concierge@nightlifemilan.com" className="text-champagne underline">
                concierge@nightlifemilan.com
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* INDICE CLICCABILE (TOC) CON LINK #ANCORA AI SOTTOTITOLI H2 E H3 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="rounded-2xl border border-white/15 bg-white/[0.02] p-6 sm:p-8">
          <h2 id="indice-guida-san-siro" className="font-serif text-2xl sm:text-3xl font-bold text-champagne mb-4">
            {isIt
              ? 'Indice della Guida Ufficiale Dopo-Partita San Siro 2026/2027'
              : 'Table of Contents — Official San Siro Post-Match Guide 2026/2027'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-champagne mb-2">
                {isIt ? 'Sezioni Principali (H2)' : 'Main Guide Sections (H2)'}
              </p>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="#sei-migliori-locali-dopo-partita-san-siro" className="hover:text-champagne transition-colors">
                    1. {isIt
                      ? 'I 6 Migliori Locali Dove Andare Dopo la Partita a San Siro (Ordine di Priorità e Distanza)'
                      : 'The 6 Best Venues After a Match at San Siro (Priority Ranking & Distance)'}
                  </a>
                </li>
                <li>
                  <a href="#san-siro-match-finder" className="hover:text-champagne transition-colors">
                    2. {isIt
                      ? 'Configuratore Interattivo Dopo-Partita (Inter, Milan, Derby, Champions)'
                      : 'Interactive San Siro Match Afterparty Finder (Inter, Milan, Derby, UCL)'}
                  </a>
                </li>
                <li>
                  <a href="#calendario-big-match-san-siro" className="hover:text-champagne transition-colors">
                    3. {isIt
                      ? 'Calendario Completo Big Match San Siro 2026/2027 e Abbinamento Club'
                      : 'Full San Siro Big Match Calendar 2026/2027 & Paired Afterparties'}
                  </a>
                </li>
                <li>
                  <a href="#regole-dress-code-e-logistica-san-siro" className="hover:text-champagne transition-colors">
                    4. {isIt
                      ? 'Regole Dress Code Post-Partita & Logistica Anti-Ingorgo M5 / 150m'
                      : 'Post-Match Dress Code Rules & Anti-Traffic M5 / 150m Logistics'}
                  </a>
                </li>
                <li>
                  <a href="#calcolatore-preventivo-vip" className="hover:text-champagne transition-colors">
                    5. {isIt
                      ? 'Preventivo Tavoli VIP in Tempo Reale & Classifica Ufficiale 6 Club'
                      : 'Real-Time VIP Table Quote Calculator & Official Top 6 Showcase'}
                  </a>
                </li>
                <li>
                  <a href="#mappa-san-siro-e-faq" className="hover:text-champagne transition-colors">
                    6. {isIt
                      ? 'Mappa Piazzale dello Sport / San Siro, 8 FAQ e Collegamenti Rapidi'
                      : 'Piazzale dello Sport / San Siro Map, 8 FAQs & Internal Silo Links'}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-champagne mb-2">
                {isIt ? 'Accesso Diretto ai 6 Locali & Approfondimenti (H3)' : 'Direct Jump to the 6 Clubs & Deep Dives (H3)'}
              </p>
              <ul className="space-y-1.5 text-white/75">
                {POST_MATCH_CLUBS.map((c) => (
                  <li key={c.anchorId}>
                    <a href={`#${c.anchorId}`} className="hover:text-champagne transition-colors">
                      → {isIt ? c.name : c.nameEn}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#dress-code-stadio-discoteca" className="hover:text-champagne transition-colors">
                    → {isIt
                      ? 'Come Vestirsi per lo Stadio ed Entrare nei Privé senza Rimbalzi'
                      : 'How to Dress for the Stadium & Pass VIP Door Selection'}
                  </a>
                </li>
                <li>
                  <a href="#logistica-anti-ingorgo-m5" className="hover:text-champagne transition-colors">
                    → {isIt
                      ? 'Logistica Anti-Ingorgo: 150m a Piedi o Linea M5 Lilla (Zero Coda Taxi)'
                      : 'Anti-Gridlock Logistics: 150m Walk or M5 Purple Line (Zero Taxi Queue)'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 1: I 6 MIGLIORI LOCALI DOVE ANDARE DOPO LA PARTITA A SAN SIRO */}
      <section
        id="sei-migliori-locali-dopo-partita-san-siro"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
            {isIt
              ? 'SEZIONE 1 · DISTANZA REALE DALLO STADIO MEAZZA & ORDINE DI PRIORITÀ'
              : 'SECTION 1 · EXACT DISTANCE FROM SAN SIRO STADIUM & PRIORITY RANKING'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isIt
              ? 'I 6 Migliori Locali Dove Andare Dopo la Partita a San Siro (Ordine di Priorità e Distanza dallo Stadio)'
              : 'The 6 Best Clubs & Rooftops After a Match at San Siro (Priority Order & Distance from the Stadium)'}
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-4xl">
            {isIt
              ? 'La nostra classifica unisce l’Ordine di Priorità Ufficiale Nightlife Milan (1. Just Me Milano, 2. Pineta Club, 3. Aria Club Milano, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic Milano) con la vicinanza fisica e logistica ai cancelli dello Stadio Giuseppe Meazza. Che tu voglia camminare 150 metri a piedi subito dopo il triplice fischio o raggiungere in 4–12 minuti di M5 Lilla i templi della notte milanese, ecco l’analisi completa con indirizzi, tempi, prezzi e formule.'
              : 'Our guide combines the Official Nightlife Milan Priority Ranking (1. Just Me Milano, 2. Pineta Club, 3. Aria Club Milano, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic Milano) with exact physical proximity and subway connectivity from Giuseppe Meazza Stadium. Whether you want to walk 150 meters straight from the gates or ride the M5 Purple Line for 4–12 minutes into central Milan, here is the complete breakdown.'}
          </p>
        </div>

        <div className="space-y-10">
          {POST_MATCH_CLUBS.map((club) => (
            <article
              key={club.slug}
              id={club.anchorId}
              className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.04] to-black/60 overflow-hidden hover:border-champagne/50 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="relative h-72 lg:h-auto lg:col-span-4">
                  <Image
                    src={club.image}
                    alt={isIt ? club.name : club.nameEn}
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-champagne text-black font-mono text-xs font-extrabold uppercase tracking-wider shadow-lg">
                    {isIt ? club.priorityBadgeIt : club.priorityBadgeEn}
                  </div>
                </div>

                <div className="p-6 sm:p-9 lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                      {isIt ? club.name : club.nameEn}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                      <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                          {isIt ? 'Distanza da San Siro' : 'Distance from San Siro'}
                        </div>
                        <div className="text-xs font-semibold text-white">
                          {isIt ? club.distanceIt : club.distanceEn}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                          {isIt ? 'Collegamento & Orari' : 'Transit & Opening Hours'}
                        </div>
                        <div className="text-xs text-white/85">{isIt ? club.hoursIt : club.hoursEn}</div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/50 border border-champagne/25">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                          {isIt ? 'Prezzi Aperitivo & Tavoli VIP' : 'Aperitivo & VIP Table Prices'}
                        </div>
                        <div className="text-xs font-semibold text-champagne">
                          {isIt ? club.pricesIt : club.pricesEn}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-6">
                      {isIt ? club.descriptionIt : club.descriptionEn}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                    <a
                      href={`https://wa.me/393519127047?text=${encodeURIComponent(
                        isIt
                          ? `Ciao Nightlife Milan! Vorrei prenotare il Dopo-Partita San Siro da ${club.name.split('(')[0].trim()}.`
                          : `Hi Nightlife Milan! I'd like to book a San Siro Post-Match table at ${club.nameEn.split('(')[0].trim()}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-champagne text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>
                        {isIt ? 'Prenota Tavolo Post-Partita su WhatsApp' : 'Book Post-Match Table on WhatsApp'}
                      </span>
                    </a>

                    <Link
                      href={`${lp}/clubs/${club.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-xs font-semibold text-white hover:border-champagne hover:text-champagne transition-colors"
                    >
                      <span>{isIt ? 'Scheda Completa, Foto & Listino Bottiglie →' : 'Full Venue Guide, Photos & Bottle Menu →'}</span>
                    </Link>

                    <span className="text-xs text-white/50 ml-auto flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-champagne" />
                      {club.address}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEZIONE 2: COMPONENTE INTERATTIVO SAN SIRO MATCH AFTERPARTY FINDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <SanSiroMatchAfterpartyFinder locale={locale} />
      </section>

      {/* SEZIONE 3: CALENDARIO COMPLETO BIG MATCH SAN SIRO 2026/2027 */}
      <section id="calendario-big-match-san-siro" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl border border-white/15 bg-[#120e09] p-6 sm:p-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
            {isIt
              ? 'SEZIONE 3 · PROGRAMMAZIONE CALCIO & ABBINAMENTO NIGHTLIFE'
              : 'SECTION 3 · FOOTBALL FIXTURE SCHEDULE & NIGHTLIFE PAIRING'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            {isIt
              ? 'Calendario Completo Big Match San Siro 2026/2027 (Inter & AC Milan: Serie A, Champions League, Derby della Madonnina, Coppa Italia)'
              : 'Complete San Siro Big Match Calendar 2026/2027 (Inter & AC Milan: Serie A, Champions League, Derby della Madonnina & Coppa Italia)'}
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-4xl mb-8">
            {isIt
              ? 'Ogni fascia oraria dello Stadio Giuseppe Meazza richiede una strategia specifica per il Terzo Tempo. Nelle notti di UEFA Champions League (Martedì e Mercoledì ore 21:00) e nei posticipi della Domenica o del Lunedì, sapere esattamente quali club sono aperti e operativi fino alle 05:00 evita spostamenti a vuoto. Ecco la matrice ufficiale 2026/2027:'
              : 'Every kick-off slot at Giuseppe Meazza Stadium requires a tailored Third-Half strategy. On UEFA Champions League nights (Tuesday and Wednesday at 21:00) and Sunday or Monday night Serie A fixtures, knowing exactly which flagship clubs are open until 05:00 saves your group wasted trips. Here is the official 2026/2027 matchday matrix:'}
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse min-w-[820px]">
              <thead>
                <tr className="border-b border-champagne/35 text-[11px] font-mono uppercase tracking-wider text-champagne">
                  <th className="py-3.5 pr-4">{isIt ? 'Big Match / Tipologia Partita' : 'Big Match / Fixture Type'}</th>
                  <th className="py-3.5 px-4">{isIt ? 'Competizione' : 'Competition'}</th>
                  <th className="py-3.5 px-4">{isIt ? 'Orario & Fischio Finale' : 'Kick-Off & Final Whistle'}</th>
                  <th className="py-3.5 px-4">{isIt ? 'Afterparty Consigliato (Priorità)' : 'Paired Afterparty (Priority)'}</th>
                  <th className="py-3.5 pl-4">{isIt ? 'Budget Tavolo / Formula' : 'Table Spend / Formula'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs sm:text-sm text-white/85">
                {SAN_SIRO_MATCH_CALENDAR.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.03]">
                    <td className="py-4 pr-4 font-serif font-bold text-white text-base">
                      {isIt ? row.matchIt : row.matchEn}
                    </td>
                    <td className="py-4 px-4 text-white/70">{row.competition}</td>
                    <td className="py-4 px-4 font-mono text-xs text-champagne">
                      {isIt ? row.kickoff : row.whistleEn}
                    </td>
                    <td className="py-4 px-4 text-white/90 font-medium">
                      {isIt ? row.bestClubsIt : row.bestClubsEn}
                    </td>
                    <td className="py-4 pl-4 text-champagne font-semibold whitespace-nowrap">{row.minSpend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <h3 className="font-serif text-xl font-bold text-champagne mb-2">
                {isIt
                  ? 'Notti di Champions League (Martedì & Mercoledì)'
                  : 'Champions League Nights (Tuesday & Wednesday)'}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {isIt
                  ? 'Con il fischio finale alle 22:55, gli ospiti delle delegazioni europee, gli Skybox e i tifosi internazionali puntano dritti su Just Me Milano (#1 Priorità, aperto 7 notti su 7 fino alle 05:00) o salgono al 20° piano di Voya Rooftop (a 3 fermate M5) e da 55 Milano (a 4 fermate M5).'
                  : 'With the final whistle blowing at 22:55, European delegations, Skybox hosts, and visiting supporters head straight to Just Me Milano (#1 Priority, open 7 nights a week until 05:00) or ride 3 M5 stops to the 20th floor of Voya Rooftop and 4 stops to 55 Milano.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <h3 className="font-serif text-xl font-bold text-champagne mb-2">
                {isIt
                  ? 'Derby della Madonnina & Posticipi Domenica 20:45'
                  : 'Derby della Madonnina & Sunday 20:45 Fixtures'}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {isIt
                  ? 'Nelle notti del Derby Inter-Milan i tavoli Privé vanno in sold-out fino a 7 giorni prima. Prenota in anticipo al +39 351 912 7047 il tuo divanetto da Aria Club (150m dallo stadio), Just Me Torre Branca, 55 Milano o Voya Rooftop per saltare la fila.'
                  : 'On Inter vs AC Milan Derby nights, VIP tables sell out up to 7 days in advance. Lock in your booth early via WhatsApp at +39 351 912 7047 at Aria Club (150m from the stadium), Just Me Torre Branca, 55 Milano, or Voya Rooftop.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <h3 className="font-serif text-xl font-bold text-champagne mb-2">
                {isIt
                  ? 'Corporate Hospitality, Skybox & Gruppi Internazionali'
                  : 'Corporate Hospitality, Skyboxes & International Fans'}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {isIt
                  ? 'Per aziende sponsor, titolari di palchi Skybox a San Siro e clienti VIP organizziamo transfer NCC dedicati dallo stadio, fatturazione evento, bottiglie Magnum/Dom Pérignon personalizzate e accoglienza Hostess multilingua (scrivi a concierge@nightlifemilan.com).'
                  : 'For corporate sponsors, San Siro Skybox holders, and international VIPs, we coordinate dedicated chauffeur transfers from the stadium, corporate invoicing, custom Magnum/Dom Pérignon bottle shows, and multilingual Hostess escort (concierge@nightlifemilan.com).'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 4: REGOLE DRESS CODE POST-PARTITA + LOGISTICA ANTI-INGORGO */}
      <section
        id="regole-dress-code-e-logistica-san-siro"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* H2/H3 Dress Code */}
          <div
            id="dress-code-stadio-discoteca"
            className="rounded-3xl border border-amber-500/35 bg-gradient-to-b from-[#1b1409] to-[#0e0b06] p-7 sm:p-10"
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-300 block mb-2">
              {isIt ? 'SEZIONE 4A · SELEZIONE ALLA PORTA' : 'SECTION 4A · DOOR SELECTION POLICY'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {isIt
                ? 'Regole Dress Code Post-Partita (Come vestirsi per lo Stadio ed entrare nei Privé senza rimbalzi alla porta)'
                : 'Post-Match Dress Code Rules (How to Dress for the Stadium & Enter VIP Clubs Without Door Rejection)'}
            </h2>
            <h3 className="font-serif text-lg text-champagne mb-3">
              {isIt
                ? 'La Regola d’Oro del Tifoso VIP a Milano dopo le 23:00'
                : 'The Golden Rule for VIP Football Fans in Milan After 23:00'}
            </h3>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-5">
              {isIt
                ? 'Uno degli errori più frequenti commessi dai tifosi (specialmente chi arriva da fuori Milano o dall’estero per la Champions League) è presentarsi all’ingresso di Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop o Repvblic dopo le 23:00 indossando la maglia tecnica ufficiale di Inter o Milan, la sciarpa al collo o una tuta sportiva. A Milano i door-selector applicano inflessibilmente il regolamento anche nelle sere di grande festa calcistica.'
                : 'One of the most common mistakes made by visiting football fans is arriving at the velvet rope of Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, or Repvblic after 23:00 wearing a replica Inter or AC Milan jersey, a team scarf, or sportswear. In Milan, door selectors strictly enforce smart-casual and elegant dress codes even on major match nights.'}
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-white/85 mb-6">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isIt ? (
                    <>
                      <strong>L’Outfit Smart-Matchday Perfetto:</strong> Indossa per lo stadio una camicia (bianca, nera o azzurra), una polo o un dolcevita/maglione scuro a tinta unita sotto una giacca, blazer o piumino elegante, abbinati a jeans scuri senza strappi o pantaloni chino e sneaker pulite/mocassini.
                    </>
                  ) : (
                    <>
                      <strong>The Perfect Smart-Matchday Outfit:</strong> Wear a collared shirt, polo, or plain dark knit sweater under a blazer or smart coat to the stadium, paired with dark non-ripped jeans or chinos and clean leather sneakers or loafers.
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isIt ? (
                    <>
                      <strong>Gestione Maglia e Sciarpa da Stadio:</strong> Se porti una sciarpa o indossi la maglia sopra una camicia durante i 90 minuti sugli spalti, riponila nello zaino/auto prima di uscire da San Siro o consegnala immediatamente al guardaroba all’ingresso del club.
                    </>
                  ) : (
                    <>
                      <strong>How to Handle Jerseys &amp; Scarves:</strong> If you wear a team scarf or jersey over a collared shirt during the 90 minutes in the stands, pack it away before leaving San Siro or hand it straight to the coat check upon arrival.
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isIt ? (
                    <>
                      <strong>Gruppi di Amici Uomini:</strong> Per i gruppi da 4 a 15 ragazzi, la prenotazione del Tavolo VIP su WhatsApp (+39 351 912 7047) unita all’abbigliamento curato garantisce l’accesso diretto tramite la corsia Hostess VIP.
                    </>
                  ) : (
                    <>
                      <strong>All-Male Fan Groups:</strong> For groups of 4 to 15 men, pre-booking a VIP Table via WhatsApp (+39 351 912 7047) combined with smart attire guarantees smooth entry via the VIP Hostess lane.
                    </>
                  )}
                </span>
              </li>
            </ul>
          </div>

          {/* H2/H3 Logistica Anti-Ingorgo */}
          <div
            id="logistica-anti-ingorgo-m5"
            className="rounded-3xl border border-champagne/35 bg-gradient-to-b from-[#17130b] to-[#0c0a06] p-7 sm:p-10"
          >
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-champagne block mb-2">
              {isIt ? 'SEZIONE 4B · MOBILITÀ NOTTURNA SAN SIRO' : 'SECTION 4B · SAN SIRO NIGHT MOBILITY'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {isIt
                ? 'Logistica Anti-Ingorgo (Perché fermarsi da Aria Club a 150m o prendere la M5 verso Portello/Sempione/Garibaldi evita 90 minuti di coda taxi)'
                : 'Anti-Gridlock Logistics (Why Walking 150m to Aria Club or Riding the M5 Metro to Portello/Sempione/Garibaldi Saves 90 Minutes of Taxi Queues)'}
            </h2>
            <h3 className="font-serif text-lg text-champagne mb-3">
              {isIt
                ? 'Tempi Reali dal Fischio Finale al Primo Brindisi al Tavolo VIP'
                : 'Real Travel Times from the Final Whistle to Your First VIP Toast'}
            </h3>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-5">
              {isIt
                ? 'Al termine di ogni partita di Serie A o Champions League a San Siro, le vie attorno a Piazzale Angelo Moratti, Via Tesio e Piazzale Lotto vengono chiuse o rallentate dal deflusso pedonale di 75.000 persone: trovare un taxi libero sul posto può richiedere oltre un’ora. Ecco i 3 corridoi intelligenti usati dai milanesi:'
                : 'At the end of every Serie A or Champions League match at San Siro, the streets around Piazzale Angelo Moratti, Via Tesio, and Piazzale Lotto are restricted for the pedestrian exit of 75,000 spectators—hailing a street taxi on the spot can take over an hour. Here are the 3 insider corridors:'}
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-white/85 mb-6">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span>
                  {isIt ? (
                    <>
                      <strong>Opzione 1 — A Piedi in 120 Secondi (150 metri):</strong> Esci dai cancelli Est di San Siro, attraversa Piazzale dello Sport fino al civico 14 ed entra da <strong>Aria Club Milano (#3 Priorità)</strong>. Mentre gli altri aspettano in coda, tu sei già nel Privé.
                    </>
                  ) : (
                    <>
                      <strong>Option 1 — 120-Second Walk (150 meters):</strong> Exit the East Gates of San Siro, walk across Piazzale dello Sport to number 14, and step inside <strong>Aria Club Milano (#3 Priority)</strong>.
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span>
                  {isIt ? (
                    <>
                      <strong>Opzione 2 — Direttrice M5 Lilla (4–6 Minuti):</strong> Dalla stazione <em>San Siro Ippodromo</em> o <em>Lotto</em>, i treni automatici M5 partono ogni 3 minuti: in <strong>3 fermate (4 min)</strong> scendi a <em>Portello</em> per il 20° piano di <strong>Voya Rooftop (#5)</strong>; in <strong>4 fermate (6 min)</strong> scendi a <em>Domodossola/Gerusalemme</em> per <strong>55 Milano (#4)</strong> e <strong>Just Me Torre Branca (#1)</strong>.
                    </>
                  ) : (
                    <>
                      <strong>Option 2 — Automated M5 Purple Line (4–6 Minutes):</strong> From <em>San Siro Ippodromo</em> or <em>Lotto</em>, automated M5 trains depart every 3 minutes: reach <em>Portello</em> in <strong>3 stops (4 min)</strong> for <strong>Voya Rooftop (#5)</strong>, or <em>Domodossola/Gerusalemme</em> in <strong>4 stops (6 min)</strong> for <strong>55 Milano (#4)</strong> and <strong>Just Me (#1)</strong>.
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <span>
                  {isIt ? (
                    <>
                      <strong>Opzione 3 — Corso Como &amp; Repubblica (12–15 Minuti):</strong> Proseguendo sulla stessa linea M5 Lilla senza cambi arrivi in 12 minuti a <em>Cenisio / Porta Garibaldi</em> per il <strong>Pineta Club (#2 Priorità)</strong> e in 15 minuti a <strong>Repvblic Milano (#6 Priorità)</strong>.
                    </>
                  ) : (
                    <>
                      <strong>Option 3 — Corso Como &amp; Repubblica (12–15 Minutes):</strong> Stay on the same M5 Purple Line with zero transfers to reach <em>Cenisio / Porta Garibaldi</em> in 12 minutes for <strong>Pineta Club (#2 Priority)</strong> and 15 minutes for <strong>Repvblic Milano (#6 Priority)</strong>.
                    </>
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEZIONE 5: VIP QUOTE CALCULATOR & PRIORITY SIX SHOWCASE */}
      <section id="calcolatore-preventivo-vip" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <VipQuoteCalculator locale={locale} />
        <PrioritySixShowcase locale={locale} />
      </section>

      {/* SEZIONE 6: MAPPA GOOGLE MAPS PIAZZALE DELLO SPORT / SAN SIRO + 8 FAQ VISIBILI + SILO LINK INTERNI */}
      <section id="mappa-san-siro-e-faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Google Maps Piazzale dello Sport / San Siro */}
        <div className="rounded-3xl border border-white/15 bg-white/[0.02] p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
                {isIt
                  ? 'SEZIONE 6 · GEOLOCALIZZAZIONE STADIO MEAZZA & PIAZZALE DELLO SPORT'
                  : 'SECTION 6 · GIUSEPPE MEAZZA STADIUM & PIAZZALE DELLO SPORT MAP'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                {isIt
                  ? 'Mappa Ufficiale San Siro, Piazzale dello Sport 14 (Aria Club a 150m) e Asse M5'
                  : 'Official Map of San Siro Stadium, Piazzale dello Sport 14 (Aria Club 150m) & M5 Line'}
              </h2>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Piazzale+dello+Sport+14+Milano+San+Siro"
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
                  ? 'Mappa Stadio San Siro e Piazzale dello Sport 14 Milano (Aria Club)'
                  : 'Map of San Siro Stadium and Piazzale dello Sport 14 Milan (Aria Club)'
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

        {/* 8 FAQ Visibili */}
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-champagne mb-3">
            {isIt
              ? 'Domande Frequenti (FAQ) sul Dopo-Partita a San Siro Milano (Inter & Milan)'
              : 'Frequently Asked Questions (FAQ) — San Siro Match Afterparties in Milan'}
          </h2>
          <p className="text-white/65 text-sm sm:text-base mb-8">
            {isIt
              ? 'Risposte ufficiali del Desk Concierge Nightlife Milan (+39 351 912 7047 · concierge@nightlifemilan.com) per tifosi, gruppi e ospiti Hospitality.'
              : 'Official answers from the Nightlife Milan Concierge Desk (+39 351 912 7047 · concierge@nightlifemilan.com) for supporters, groups, and Hospitality guests.'}
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

        {/* Silo di Link Interni Obbligatori */}
        <div className="rounded-3xl border border-champagne/30 bg-gradient-to-r from-[#18130a] to-[#0f0c07] p-7 sm:p-10">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            {isIt
              ? 'Esplora il Silo Ufficiale San Siro, Tavoli VIP & Guide Correlate'
              : 'Explore the Official San Siro, VIP Tables & Related Nightlife Guides'}
          </h2>
          <p className="text-xs sm:text-sm text-white/65 mb-6">
            {isIt
              ? 'Approfondisci schede locali, listini bottiglie, terrazze panoramiche e guide dedicate allo Stadio Meazza:'
              : 'Explore venue profiles, bottle menus, panoramic rooftops, and dedicated San Siro matchday guides:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs sm:text-sm">
            <Link
              href={`${lp}/zones/san-siro`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Guida Quartiere San Siro' : 'San Siro District Guide'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/clubs/aria-club-milano`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Aria Club Milano (a 150m)' : 'Aria Club Milano (150m)'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/clubs/just-me-milano`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Just Me Milano (Aperto 7/7)' : 'Just Me Milano (Open 7/7)'}</span>
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
              href={`${lp}/bottle-prices`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Listino Prezzi Bottiglie 2026' : '2026 Club Bottle Prices'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/rooftops`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Rooftop & Voya 20° Piano' : 'Rooftops & Voya 20th Floor'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/private-parties`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Eventi Privati & Hospitality' : 'Private Parties & Hospitality'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/guides/san-siro-football-match-afterparties-inter-ac-milan`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Guida Editoriale Terzo Tempo' : 'Editorial Third-Half Guide'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
