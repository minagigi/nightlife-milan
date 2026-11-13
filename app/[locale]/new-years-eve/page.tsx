import { Metadata } from 'next';

import EventVenueMap from '@/components/EventVenueMap';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import type { LocaleCode } from '@/lib/i18n/locales';import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { tr } from '@/lib/i18n/t';
import {
  INDEXED_LOCALES,
  getLocaleDef,
  hreflangAlternates, canonicalPageUrl,
  localePrefix,
} from '@/lib/i18n/locales';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getHubSeoMeta35 } from '@/lib/i18n/hubSeoMeta35';
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
  VipQuoteCalculator,
  EntryFormulaMatrix,
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
  const canonical = canonicalPageUrl(baseUrl, locale, '/new-years-eve');

  const meta35 = getHubSeoMeta35('new-years-eve', locale);
  const title = seoTitle(meta35.title);

  const description = withWhatsApp(meta35.description, locale);

  const languages = buildLanguageAlternates('/new-years-eve');

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
          url: `${baseUrl}/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp`,
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
      images: [`${baseUrl}/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp`],
    },
  };
}

const NYE_FORMULAS = [
  {
    id: 'gala-dinner',
    nameIt: '1. Gran Cenone Servito + Serata Club',
    nameEn: '1. Seated Gala Dinner + All-Night Club Party',
    hours: '20:30 - 05:00',
    priceIt: '€150 - €350 / persona',
    priceEn: '€150 - €350 / person',
    includedIt:
      'Menu degustazione gourmet a 4 o 5 portate, 1 bottiglia di vino o Champagne ogni 2/4 ospiti, brindisi di mezzanotte al tavolo, live show durante la cena e ingresso discoteca fino alle 05:00.',
    includedEn:
      '4 or 5-course gourmet tasting menu, 1 bottle of fine wine or Champagne per 2 to 4 guests, midnight countdown toast at your table, live dinner show entertainment, and clubbing until 05:00.',
    bestVenuesIt:
      '1. Just Me Milano (Ristorante Italo Rota), 4. 55 Milano (Gran Gala Show), 5. Voya Rooftop (20° Piano Skyline), Tocqueville 13',
    bestVenuesEn:
      '1. Just Me Milano (Italo Rota Restaurant), 4. 55 Milano (Grand Gala Show), 5. Voya Rooftop (20th Floor Skyline), Tocqueville 13',
  },
  {
    id: 'royal-buffet',
    nameIt: '2. Royal Buffet / Imperial Apericena + Party',
    nameEn: '2. Royal Buffet / Imperial Apericena + Party',
    hours: '21:00 - 05:00',
    priceIt: '€60 - €95 / persona',
    priceEn: '€60 - €95 / person',
    includedIt:
      'Accesso al Gran Buffet Imperiale di San Silvestro con isole gastronomiche calde e fredde, 1 o 2 drink premium inclusi, flûte di spumante o Champagne per il conto alla rovescia di mezzanotte e serata club.',
    includedEn:
      'Access to the New Years Eve Imperial Buffet with hot and cold gourmet stations, 1 or 2 premium drinks included, midnight sparkling wine or Champagne flute, and full club access until dawn.',
    bestVenuesIt:
      '2. Pineta Milano (Buffet Cantato di Capodanno), 3. Aria Club San Siro, 4. 55 Milano (Imperial Apericena), 1. Just Me Milano',
    bestVenuesEn:
      '2. Pineta Milano (NYE Singing Buffet), 3. Aria Club San Siro, 4. 55 Milano (Imperial Apericena), 1. Just Me Milano',
  },
  {
    id: 'after-midnight',
    nameIt: '3. Ingresso Disco Dopo Mezzanotte (Prevendita Salta-Fila)',
    nameEn: '3. After-Midnight Club Entry (Official Fast-Track Presale)',
    hours: '00:30 - 05:30',
    priceIt: '€50 - €90 / persona',
    priceEn: '€50 - €90 / person',
    includedIt:
      'Bracciale o QR code ufficiale in prevendita nominale con corsia prioritaria dopo il brindisi di mezzanotte, 1 drink incluso e accesso completo alle piste da ballo fino all’alba del 1 Gennaio 2027.',
    includedEn:
      'Official nominal presale QR pass with fast-track entry after midnight, 1 welcome drink included, and full access to the main dancefloors until sunrise on January 1, 2027.',
    bestVenuesIt:
      '3. Aria Club, 6. Repvblic Milano, Alcatraz Milano (3 Piste XL), Fabrique Milano, 2. Pineta Milano',
    bestVenuesEn:
      '3. Aria Club, 6. Repvblic Milano, Alcatraz Milano (3 XXL Stages), Fabrique Milano, 2. Pineta Milano',
  },
  {
    id: 'vip-table-console',
    nameIt: '4. Tavolo VIP Pista / Super Privé Console Capodanno',
    nameEn: '4. NYE VIP Dancefloor Table / DJ Console Super Privé',
    hours: '23:00 / 00:15 - 05:30',
    priceIt: '€600 - €5.000 (fino a 8-12 pass inclusi)',
    priceEn: '€600 - €5,000 (up to 8-12 VIP passes included)',
    includedIt:
      'Ingresso immediato zero-coda con Hostess VIP, divanetto riservato in Pista, Balconata o Console DJ, 100% dell’importo convertito in bottiglie premium e formati Magnum/Jeroboam (Dom Pérignon, Armand de Brignac, Belvedere Magnum, Moët Ice).',
    includedEn:
      'Immediate zero-queue escort with VIP Hostess, private booth on the Dancefloor, Balcony, or DJ Console, 100% of minimum spend converted into premium & Magnum/Jeroboam bottles (Dom Pérignon, Armand de Brignac, Belvedere Magnum, Moët Ice).',
    bestVenuesIt:
      '1. Just Me (Privé Branca), 2. Pineta Corso Como, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop (20° Piano), 6. Repvblic',
    bestVenuesEn:
      '1. Just Me (Privé Branca), 2. Pineta Corso Como, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop (20th Floor), 6. Repvblic',
  },
];

const NYE_CLUBS = [
  {
    rank: 1,
    anchorId: 'nye-just-me-milano',
    slug: 'just-me-milano',
    priorityBadgeIt: '#1 Priorità Assoluta · Fuochi sotto la Torre Branca',
    priorityBadgeEn: '#1 Top Priority · Fireworks Under Torre Branca',
    nameIt: '1. Just Me Milano (Torre Branca, Parco Sempione: Gran Cenone Italo Rota e Fuochi d Artificio)',
    nameEn: '1. Just Me Milano (Torre Branca, Parco Sempione: Gatsby Gala Dinner & Midnight Fireworks)',
    address: 'Viale Luigi Camoens, 2 (Parco Sempione / Torre Branca) - 20121 Milano',
    formulasIt:
      'Gran Cenone Servito €250 - €350 · Royal Buffet €80 - €95 · Ingresso Disco €60 - €80 · Tavoli VIP €800 - €5.000',
    formulasEn:
      'Seated Gala Dinner €250 - €350 · Royal Buffet €80 - €95 · Club Entry €60 - €80 · VIP Tables €800 - €5,000',
    fireworksVibeIt: 'Cupola di cristallo riscaldata sotto i 108 metri della Torre Branca illuminata a Parco Sempione',
    fireworksVibeEn: 'Heated crystal dome beneath the illuminated 108-meter Torre Branca in Parco Sempione',
    image: '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
    descriptionIt:
      'Just Me Milano (#1 Priorità Nightlife Milan), firmato da Italo Rota ai piedi della monumentale Torre Branca in Parco Sempione, ospita il Capodanno più iconico e fotografato d’Italia. La serata del 31 Dicembre 2026 inizia alle 20:30 con il Gran Cenone di Gala servito o alle 21:00 con il Royal Buffet Imperiale. Allo scoccare della mezzanotte la struttura vetrata permette di ammirare i fuochi d’artificio sopra Parco Sempione e la Torre Branca illuminata, prima di scatenarsi fino alle 05:30 con DJ set internazionali, sfilate di Dom Pérignon luminosi e il leggendario Privé Branca.',
    descriptionEn:
      'Just Me Milano (#1 Official Priority), designed by Italo Rota at the base of the 108-meter Torre Branca in Parco Sempione, hosts Italys most glamorous New Years Eve gala. On December 31, 2026, festivities begin at 20:30 with the Seated Italo Rota Gala Dinner or at 21:00 with the Imperial Royal Buffet. At midnight, guests watch the fireworks light up Parco Sempione and Torre Branca through the heated glass dome before partying until 05:30 with international guest DJs, Dom Pérignon sparkler parades, and the ultra-exclusive Privé Branca.',
  },
  {
    rank: 2,
    anchorId: 'nye-pineta-milano',
    slug: 'pineta-club-milano',
    priorityBadgeIt: '#2 Priorità · Gran Cenone & Buffet Cantato Corso Como',
    priorityBadgeEn: '#2 Priority · Corso Como Singing Gala & Club',
    nameIt: '2. Pineta Club Milano (Via Messina 38 / Corso Como: Cenone Cantato e Party Reggaeton & Hits)',
    nameEn: '2. Pineta Club Milano (Via Messina 38 / Corso Como: Singing Gala Buffet & Reggaeton/Hits Party)',
    address: 'Via Messina, 38 (Area Corso Como / Porta Garibaldi) - 20154 Milano',
    formulasIt:
      'Cenone Servito Cantato €160 - €210 · Royal Buffet con Tavolo €75 - €95 · Ingresso Disco €50 - €70 · Tavoli VIP €600 - €2.000',
    formulasEn:
      'Seated Singing Dinner €160 - €210 · Royal Buffet with Table €75 - €95 · Club Entry €50 - €70 · VIP Tables €600 - €2,000',
    fireworksVibeIt: 'Il Capodanno più cantato e coinvolgente di Milano a due passi da Porta Nuova e Corso Como',
    fireworksVibeEn: 'Milans most energetic sing-along New Years Eve party steps from Porta Nuova and Corso Como',
    image: '/images/venues/pineta-milano/pineta-milano-ingresso-01.webp',
    descriptionIt:
      'Per chi a Capodanno cerca un atmosfera esplosiva fin dalle 21:00, Pineta Club Milano (#2 Priorità) in zona Corso Como / Via Messina 38 trasforma il suo celebre format di Aperitivo e Cena Cantata in uno show di San Silvestro memorabile. Cori da stadio sulle migliori hit italiane e internazionali, vocalist dal vivo, cascate di coriandoli dorati a mezzanotte e, dalle 00:15 alle 05:30, una pista infuocata tra reggaeton, urban e musica commerciale con tavoli Privé ad altissima energia.',
    descriptionEn:
      'For groups seeking explosive energy from 21:00 onwards, Pineta Club Milano (#2 Priority) near Corso Como / Via Messina 38 elevates its famous Singing Dinner & Aperitivo into a full-scale New Years Eve spectacle. Expect live vocalists, entire-room sing-alongs, golden confetti blasts at midnight, and from 00:15 to 05:30 a packed reggaeton, urban, and commercial dancefloor with high-energy VIP bottle service.',
  },
  {
    rank: 3,
    anchorId: 'nye-aria-club-milano',
    slug: 'aria-club-milano',
    priorityBadgeIt: '#3 Priorità · San Siro Winter Dome & 3 Aree Privé',
    priorityBadgeEn: '#3 Priority · San Siro Winter Dome & 3 VIP Zones',
    nameIt: '3. Aria Club Milano (Piazzale dello Sport 14, San Siro: Winter Dome Gala & 3 Livelli di Privé)',
    nameEn: '3. Aria Club Milano (Piazzale dello Sport 14, San Siro: Winter Dome Gala & 3 VIP Table Tiers)',
    address: 'Piazzale dello Sport, 14 (Zona San Siro / Ippodromo) - 20151 Milano',
    formulasIt:
      'Royal Buffet €65 - €85 · Ingresso Dopo Mezzanotte €50 - €65 · Tavoli VIP Pista €600 · Privé Aria €900 · Super Privé Console €1.500+',
    formulasEn:
      'Royal Buffet €65 - €85 · After-Midnight Entry €50 - €65 · Dancefloor VIP €600 · Privé Aria €900 · DJ Console Super Privé €1,500+',
    fireworksVibeIt: 'Ampio parcheggio comodo a San Siro, 3 aree tavoli distinte e produzione audio-luci da festival',
    fireworksVibeEn: 'Convenient San Siro parking, 3 distinct VIP booth zones, and festival-grade lighting production',
    image: '/images/venues/aria-club-milano/aria-club-milano-interior-01.webp',
    descriptionIt:
      'Situato nel verde di San Siro in Piazzale dello Sport 14 (proprio di fronte allo Stadio Meazza), Aria Club Milano (#3 Priorità) offre per la notte del 31 Dicembre 2026 una produzione scenografica monumentale con laser show, CO2 cannon e tre fasce di tavoli VIP: Dancefloor Pista, Privé Aria rialzato e Super Privé dietro la Console DJ. La soluzione perfetta per gruppi di amici che desiderano spazi ampi, parcheggio immediato o arrivo diretto con M5 Lilla (San Siro Stadio).',
    descriptionEn:
      'Located in Piazzale dello Sport 14 in the San Siro district, Aria Club Milano (#3 Priority) delivers a monumental New Years Eve production featuring laser shows, CO2 cannons, and three distinct VIP table tiers: Dancefloor VIP, elevated Privé Aria, and back-of-house DJ Console Super Privé. Ideal for groups looking for spacious booths, easy parking, or direct M5 Purple Line access.',
  },
  {
    rank: 4,
    anchorId: 'nye-55-milano',
    slug: '55-milano',
    priorityBadgeIt: '#4 Priorità · 1.000 mq Sempione, Gran Cenone & Imperial Buffet',
    priorityBadgeEn: '#4 Priority · 1,000 sqm Sempione, Gala Dinner & Imperial Buffet',
    nameIt: '4. 55 Milano / FiftyFive (Via Piero della Francesca 55, Sempione: Gran Cenone Spettacolo e Imperial Buffet XL)',
    nameEn: '4. 55 Milano / FiftyFive (Via Piero della Francesca 55, Sempione: Grand Dinner Show & XXL Imperial Buffet)',
    address: 'Via Piero della Francesca, 55 (Arco della Pace / Corso Sempione) - 20154 Milano',
    formulasIt:
      'Gran Cenone Servito €150 - €190 · Imperial Buffet con Tavolo €65 - €85 · Ingresso Disco €50 · Tavoli VIP Dopocena €600 - €1.500',
    formulasEn:
      'Seated Gala Dinner €150 - €190 · Imperial Buffet with Table €65 - €85 · Club Entry €50 · Post-Dinner VIP Tables €600 - €1,500',
    fireworksVibeIt: 'Ex deposito storico di oltre 1.000 mq con soffitti alti, grande terrazza e doppia anima Dinner + Club',
    fireworksVibeEn: 'Historic 1,000+ sqm railway depot with soaring ceilings, heated terrace, and seamless Dinner-to-Club flow',
    image: '/images/55-milano.webp',
    descriptionIt:
      'Con oltre 1.000 metri quadri di spazio industrial-chic in Via Piero della Francesca 55 (zona Corso Sempione / Arco della Pace), 55 Milano (#4 Priorità) è il re incontrastato dei gruppi da 8 a 40 persone a Capodanno. Puoi scegliere tra il Gran Cenone Servito con live dinner show o l Imperial Buffet con divanetto riservato, con la comodità di mantenere la tua base privata nel locale quando a mezzanotte il 55 Milano si trasforma in un club scatenato fino alle 05:00.',
    descriptionEn:
      'Spanning over 1,000 square meters of industrial-chic space at Via Piero della Francesca 55 (Sempione / Arco della Pace), 55 Milano (#4 Priority) is the undisputed champion for groups of 8 to 40 guests on New Years Eve. Choose between the Seated Gala Dinner Show or the Imperial Buffet with a reserved sofa area, and keep your private base as the venue transforms at midnight into a full-scale club until 05:00.',
  },
  {
    rank: 5,
    anchorId: 'nye-voya-rooftop',
    slug: 'voya-rooftop-milan',
    priorityBadgeIt: '#5 Priorità · 20° Piano Vista Fuochi d Artificio a 360°',
    priorityBadgeEn: '#5 Priority · 20th Floor 360° Fireworks Skyline View',
    nameIt: '5. Voya Rooftop Milan (Via Achille Papa 30, 20° Piano: Capodanno a 85 Metri d’Altezza Vista Fuochi su Tutta Milano)',
    nameEn: '5. Voya Rooftop Milan (Via Achille Papa 30, 20th Floor: NYE at 85 Meters Overlooking All Milan Fireworks)',
    address: 'Viale Achille Papa, 30 (20° Piano, Portello / CityLife / Isola) - 20149 Milano',
    formulasIt:
      'Skyline Gala Dinner €190 - €280 · Royal Cocktail Buffet €80 - €95 · Ingresso Panoramico €60 - €80 · Tavoli Vetrata VIP €700 - €2.500',
    formulasEn:
      'Skyline Gala Dinner €190 - €280 · Royal Cocktail Buffet €80 - €95 · Panoramic Entry €60 - €80 · Glass-Wall VIP Tables €700 - €2,500',
    fireworksVibeIt: 'L unico 20° piano con vetrate a tutta altezza da cui vedere simultaneamente i fuochi di tutta Milano',
    fireworksVibeEn: 'The only 20th-floor floor-to-ceiling glass sky lounge with a 360-degree view of Milans midnight fireworks',
    image: '/images/voya-rooftop-milan.webp',
    descriptionIt:
      'Vivere il conto alla rovescia del 31 Dicembre al 20° piano di Voya Rooftop Milan (#5 Priorità, Viale Achille Papa 30) è un’esperienza visiva senza paragoni: a mezzanotte, dalle immense vetrate panoramiche a 85 metri d’altezza, vedi letteralmente esplodere sotto i tuoi occhi tutti i fuochi d’artificio dello skyline di Milano, dalle Tre Torri di CityLife a Porta Nuova fino a San Siro. Ideale per coppie eleganti, clientela internazionale e gruppi VIP che cercano alta mixology, Champagne Dom Pérignon e DJ set in quota.',
    descriptionEn:
      'Counting down to midnight on the 20th floor at Voya Rooftop Milan (#5 Priority, Viale Achille Papa 30) is an unmatched visual spectacle: at 00:00, through floor-to-ceiling glass walls 85 meters above the street, you watch the entire Milan skyline erupt in fireworks from CityLifes Three Towers to Porta Nuova and San Siro. Ideal for couples, international travelers, and VIP groups seeking fine dining, Dom Pérignon, and panoramic house DJ sets.',
  },
  {
    rank: 6,
    anchorId: 'nye-repvblic-milano',
    slug: 'repvblic-milano',
    priorityBadgeIt: '#6 Priorità · Design Club Piazza della Repubblica',
    priorityBadgeEn: '#6 Priority · Piazza della Repubblica Design Club',
    nameIt: '6. Repvblic Milano (#6 Priorità, Piazza della Repubblica: NYE Fashion Clubbing, House & Hip-Hop)',
    nameEn: '6. Repvblic Milano (#6 Priority, Piazza della Repubblica: NYE Fashion Clubbing, House & Hip-Hop)',
    address: 'Piazza della Repubblica / Via Mecenate - Milano',
    formulasIt:
      'Royal Buffet €65 - €85 · Ingresso Dopo Mezzanotte €50 - €75 · Tavoli VIP Pista €600 - €900 · Super Privé Console €1.200 - €3.000',
    formulasEn:
      'Royal Buffet €65 - €85 · After-Midnight Entry €50 - €75 · Dancefloor VIP €600 - €900 · Console Super Privé €1,200 - €3,000',
    fireworksVibeIt: 'Impianto luci immersivo vicino agli hotel 5 stelle di Porta Nuova e Repubblica',
    fireworksVibeEn: 'Immersive lighting architecture steps from the 5-star hotels of Porta Nuova and Repubblica',
    image: '/images/repvblic-milano.webp',
    descriptionIt:
      'Repvblic Milano (#6 Priorità) è il punto di riferimento per chi vuole festeggiare l arrivo del 2027 in un vero design club dal respiro internazionale, frequentato da modelli, PR e ospiti degli hotel 5 stelle di Piazza della Repubblica e Porta Nuova. Sound system potentissimo tra House, Tech-House, Hip-Hop e Urban, bottle show coreografici con Magnum illuminate e una selezione alla porta elegante e curata.',
    descriptionEn:
      'Repvblic Milano (#6 Priority) is the benchmark for celebrating the arrival of 2027 inside an international design club frequented by models, creatives, and guests of the 5-star hotels around Piazza della Repubblica and Porta Nuova. Expect a powerhouse House, Tech-House, Hip-Hop, and Urban sound system, Magnum sparkler shows, and a sharp fashion-forward crowd.',
  },
];

const NYE_MEGA_CLUBS = [
  {
    name: 'Alcatraz Milano (Via Valtellina 25, Zona Isola / Farini)',
    slug: 'alcatraz-milano',
    tagIt: 'Il Mega-Festival di Capodanno su 3 Piste (fino a 3.000 persone)',
    tagEn: 'Milans Biggest 3-Stage NYE Indoor Festival (up to 3,000 guests)',
    pricesIt: 'Royal Buffet €60 - €75 · Prevendita Dopo Mezzanotte €45 - €65 · Tavoli Balconata VIP da €600',
    pricesEn: 'Royal Buffet €60 - €75 · After-Midnight Presale €45 - €65 · VIP Balcony Tables from €600',
    descIt:
      'La più grande arena indoor di Milano celebra il Capodanno 2027 con 3 sale musicali contemporanee (Main Room Commercial/Dance/90-2000, Sala 2 Reggaeton & Latin Urban, Sala 3 Tech-House), maxi-schermi LED per il countdown, live show e balconata VIP rialzata.',
    descEn:
      'Milans largest indoor venue celebrates NYE 2027 across 3 simultaneous music rooms (Main Stage Commercial/Dance/2000s, Room 2 Reggaeton & Urban, Room 3 Tech-House), giant LED countdown screens, live performers, and elevated VIP balcony tables.',
  },
  {
    name: 'Fabrique Milano (Via Gaudenzio Fantoli 9, Zona Mecenate / Linate)',
    slug: 'fabrique-milano',
    tagIt: 'Superospiti, Elettronica, Urban & Produzione da Grande Concerto',
    tagEn: 'Headliner DJs, Electronic/Urban & Concert-Scale Production',
    pricesIt: 'Prevendita Ufficiale Early Bird €45 - €75 · Tavoli Privé Rialzato da €700 - €1.500',
    pricesEn: 'Official Early Bird Presale €45 - €75 · Elevated VIP Privé Tables from €700 - €1,500',
    descIt:
      'Il tempio dei grandi concerti milanesi accende la notte del 31 Dicembre con un impianto audio L-Acoustics da festival, visual show monumentali e format dedicati ai giovani e agli amanti dei grandi eventi urban, dance ed elettronici.',
    descEn:
      'Milans premier live concert arena ignites December 31 with a festival-grade L-Acoustics sound system, monumental visual production, and high-energy urban, dance, and electronic showcases.',
  },
  {
    name: 'Tocqueville 13 Milano (Via Alessio di Tocqueville 13, Corso Como)',
    slug: 'tocqueville-13',
    tagIt: 'Dinner Show & Clubbing nel Cuore Pedonale di Corso Como',
    tagEn: 'Dinner Show & Luxury Clubbing in the Heart of Corso Como',
    pricesIt: 'Gran Cenone Spettacolo €180 - €240 · Ingresso Disco €60 - €80 · Tavoli VIP €800 - €2.500',
    pricesEn: 'Dinner Show Gala €180 - €240 · Club Entry €60 - €80 · VIP Tables €800 - €2,500',
    descIt:
      'Storica icona di Via Tocqueville a due passi da Piazza Gae Aulenti: offre una cena spettacolo ricercata al piano superiore e una main room su due livelli con tavoli Privé e clientela internazionale.',
    descEn:
      'A historic Corso Como icon steps from Piazza Gae Aulenti, offering a refined upstairs Dinner Show and a two-level club room with luxury VIP tables and an international crowd.',
  },
];

const BOOKING_TIMELINE = [
  {
    phaseIt: 'Fase 1: Early Bird (Ottobre - 20 Novembre 2026)',
    phaseEn: 'Phase 1: Early Bird (October - November 20, 2026)',
    statusIt: 'Tariffe Minime Garantite & 100% Scelta Posizione Tavolo',
    statusEn: 'Lowest Guaranteed Rates & 100% Prime Table Selection',
    detailIt:
      'Prenotando entro metà novembre blocchi le prevendite Cenone e Royal Buffet al prezzo di lancio (risparmiando il 25-35%) e puoi scegliere i migliori tavoli in prima fila (Privé Branca da Just Me, Vetrata 20° Piano da Voya Rooftop o Console da Pineta e Aria Club).',
    detailEn:
      'Booking by mid-November locks in launch pricing on Gala Dinners and Royal Buffets (saving 25-35%) and gives you first pick of prime tables (Privé Branca at Just Me, 20th-Floor Glass Wall at Voya Rooftop, or DJ Console at Pineta and Aria Club).',
  },
  {
    phaseIt: 'Fase 2: Second Release (21 Novembre - 18 Dicembre 2026)',
    phaseEn: 'Phase 2: Second Release (November 21 - December 18, 2026)',
    statusIt: 'Esaurimento Cenoni Serviti & Ultimi Tavoli Privé Rialzati',
    statusEn: 'Seated Dinners Filling Up & Final Elevated Privé Tables',
    detailIt:
      'I posti per il Gran Cenone Servito e i tavoli fronte-vetrata per i fuochi d’artificio vanno in rapido esaurimento. Le tariffe salgono allo scaglione intermedio e resta obbligatorio il versamento dell’acconto per emettere i voucher nominali.',
    detailEn:
      'Seated Gala Dinner spots and window tables for midnight fireworks sell out rapidly. Pricing moves to the second tier and deposit confirmation is required to issue nominal vouchers.',
  },
  {
    phaseIt: 'Fase 3: Last Minute & Sold Out (19 - 31 Dicembre 2026)',
    phaseEn: 'Phase 3: Last Minute & Sold Out (December 19 - 31, 2026)',
    statusIt: 'Liste Chiuse · Accesso Solo con Tavolo VIP o Prevendita Ufficiale',
    statusEn: 'Guest Lists Closed · Entry Only via VIP Table or Official Presale',
    detailIt:
      'Attenzione: la notte del 31 Dicembre a Milano NON esistono liste nominali gratuite o pagamenti improvvisati alla porta. Senza prevendita salta-fila o tavolo VIP confermato tramite il Desk (+39 351 912 7047) è impossibile entrare.',
    detailEn:
      'Important: on December 31 in Milan, regular guest lists and walk-up door tickets do NOT exist. Without a confirmed fast-track presale pass or VIP Table booked via our Desk (+39 351 912 7047), entry is impossible.',
  },
];

export default async function NewYearsEvePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const venueMapCopy = getEventVenueCopy(locale as LocaleCode);
  const lp = localePrefix(locale);
  const canonicalUrl = canonicalPageUrl(baseUrl, locale, '/new-years-eve');

  const faqs = [
    {
      q: isIt
        ? 'Quali sono le 4 formule per festeggiare il Capodanno 2027 nei club e rooftop di Milano?'
        : 'What are the 4 entry formulas for New Years Eve 2027 in Milan clubs and rooftops?',
      a: isIt
        ? 'Per la notte del 31 Dicembre 2026 a Milano esistono 4 formule ufficiali: (1) Gran Cenone Servito + Serata Club (20:30 - 05:00, €150 - €350/persona con vini e tavolo); (2) Royal Buffet / Imperial Apericena + Party (21:00 - 05:00, €60 - €95/persona con buffet, drink e brindisi di mezzanotte); (3) Ingresso Disco Dopo Mezzanotte in prevendita salta-fila (00:30 - 05:30, €50 - €90/persona); (4) Tavolo VIP Pista o Super Privé Console (€600 - €5.000 fino a 8-12 pass inclusi, 100% spendibile in bottiglie Dom Pérignon, Armand de Brignac o Belvedere Magnum).'
        : 'For December 31, 2026 in Milan, there are 4 official formulas: (1) Seated Gala Dinner + Club Night (20:30 - 05:00, €150 - €350/person including wine and table); (2) Royal Buffet / Imperial Apericena + Party (21:00 - 05:00, €60 - €95/person with buffet, drinks, and midnight toast); (3) After-Midnight Fast-Track Club Entry (00:30 - 05:30, €50 - €90/person); (4) VIP Dancefloor or DJ Console Super Privé Table (€600 - €5,000 including 8-12 passes, 100% spent on Dom Pérignon, Armand de Brignac, or Belvedere Magnum bottles).',
    },
    {
      q: isIt
        ? 'Qual è il miglior locale di Milano per vedere i fuochi d’artificio di mezzanotte a Capodanno?'
        : 'Which Milan venue offers the best view of the midnight fireworks on New Years Eve?',
      a: isIt
        ? 'Le due scelte regine per i fuochi d’artificio di mezzanotte sono: (1) Voya Rooftop Milan (#5 Priorità, Viale Achille Papa 30), situato al 20° piano a 85 metri d’altezza con vetrate a 360 gradi che dominano l’intero skyline di Milano da CityLife a San Siro; e (2) Just Me Milano (#1 Priorità, Viale Luigi Camoens 2), con la sua cupola di cristallo riscaldata ai piedi dei 108 metri della Torre Branca nel cuore di Parco Sempione.'
        : 'The top two choices for midnight fireworks are: (1) Voya Rooftop Milan (#5 Priority, Viale Achille Papa 30), perched on the 20th floor at 85 meters high with 360-degree glass walls overlooking the entire Milan skyline from CityLife to San Siro; and (2) Just Me Milano (#1 Priority, Viale Luigi Camoens 2), featuring a heated glass dome right beneath the 108-meter Torre Branca in Parco Sempione.',
    },
    {
      q: isIt
        ? 'Posso entrare in discoteca a Milano la notte del 31 Dicembre pagando direttamente alla porta o mettendomi in lista?'
        : 'Can I enter a Milan nightclub on December 31 by paying at the door or joining a normal guest list?',
      a: isIt
        ? 'No: a Capodanno a Milano tutte le liste nominali ordinarie sono sospese e i locali registrano il tutto esaurito (Sold Out) giorni prima del 31 Dicembre. L accesso è consentito esclusivamente a chi possiede un voucher nominale di Prevendita Ufficiale (Cenone, Buffet o Dopo-Mezzanotte) oppure una prenotazione Tavolo VIP confermata tramite il Desk Ufficiale WhatsApp (+39 351 912 7047).'
        : 'No: on New Years Eve in Milan, all standard guest lists are suspended and venues reach full capacity days before December 31. Entry is strictly reserved for guests holding an official nominal presale voucher (Gala Dinner, Royal Buffet, or After-Midnight ticket) or a confirmed VIP Table reservation via our Official WhatsApp Desk (+39 351 912 7047).',
    },
    {
      q: isIt
        ? 'Qual è il Dress Code richiesto per il Gran Cenone e i Club VIP di Milano a Capodanno?'
        : 'What is the dress code for New Years Eve Gala Dinners and VIP Clubs in Milan?',
      a: isIt
        ? 'Per la notte di San Silvestro i 6 club prioritari di Milano (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic) richiedono un abbigliamento Black Tie Optional o Cocktail Elegante: per gli uomini abito scuro, smoking o blazer sartoriale con camicia e mocassini/scarpa elegante (vietati abbigliamento sportivo, felpe, cappellini e jeans strappati); per le donne abito da sera, cocktail dress, paillettes o tailleur elegante.'
        : 'For New Years Eve, Milans 6 priority clubs (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop, Repvblic) enforce a Black Tie Optional or Cocktail Elegant dress code: dark suit, tuxedo, or tailored blazer with a collared shirt and dress shoes for men (no streetwear, hoodies, caps, or ripped jeans); evening gown, sequin cocktail dress, or chic formal Jumpsuit/suit for women.',
    },
    {
      q: isIt
        ? 'Entro quando conviene prenotare il Cenone o il Tavolo VIP per Capodanno 2027 a Milano?'
        : 'How far in advance should we book our NYE 2027 Dinner or VIP Table in Milan?',
      a: isIt
        ? 'Le tariffe Early Bird più vantaggiose e i tavoli in prima fila (Privé Branca da Just Me, tavoli vetrata al 20° piano di Voya Rooftop, tavoli Cenone Cantato da Pineta e 55 Milano) vengono assegnati tra Ottobre e il 20 Novembre 2026. Entro metà dicembre oltre l 85% dei tavoli VIP e dei posti a sedere per la cena è già sold out.'
        : 'The best Early Bird rates and prime tables (Privé Branca at Just Me, 20th-floor window tables at Voya Rooftop, Singing Dinner tables at Pineta and 55 Milano) are allocated between October and November 20, 2026. By mid-December, over 85% of VIP booths and seated dinner spots are completely sold out.',
    },
    {
      q: isIt
        ? 'Come funziona il pagamento e la conferma del Tavolo VIP di Capodanno?'
        : 'How do payment and confirmation work for a New Years Eve VIP Table?',
      a: isIt
        ? 'Scrivendo al Concierge Ufficiale su WhatsApp (+39 351 912 7047) o a concierge@nightlifemilan.com ricevi in tempo reale la mappa dei tavoli disponibili e il listino bottiglie (Dom Pérignon, Armand de Brignac, Cristal, Belvedere Magnum). Il tavolo viene bloccato con voucher ufficiale nominale e codice QR salta-fila; il 100% del minimum spend del tavolo è convertito in bottiglie servite al vostro divanetto.'
        : 'Message our Official Concierge on WhatsApp (+39 351 912 7047) or concierge@nightlifemilan.com to receive real-time floor plans and bottle menus (Dom Pérignon, Armand de Brignac, Cristal, Belvedere Magnum). Your booth is secured with an official nominal voucher and fast-track QR pass, and 100% of the table minimum spend goes toward your chosen bottles.',
    },
    {
      q: isIt
        ? 'Come muoversi a Milano la notte di Capodanno tra Cenone, Duomo, Sempione e San Siro?'
        : 'How to get around Milan on New Years Eve between Parco Sempione, Corso Como, and San Siro?',
      a: isIt
        ? 'La notte del 31 Dicembre la metropolitana ATM di Milano (incluse le linee M1, M2, M3, M4 e la M5 Lilla che collega Garibaldi/Corso Como, Sempione/Domodossola, Portello/Voya e San Siro/Aria Club) effettua orario prolungato notturno. Il consiglio d’oro è scegliere una formula Cenone o Royal Buffet + Serata nello stesso club così da non dover cercare un taxi a mezzanotte, oppure prenotare in anticipo un transfer NCC privato tramite il nostro Desk.'
        : 'On December 31, Milans ATM metro network (including the M5 Purple Line connecting Garibaldi/Corso Como, Sempione/Domodossola, Portello/Voya, and San Siro/Aria Club) runs extended late-night service. Our #1 insider tip is booking a Gala Dinner or Royal Buffet + Club package inside the same venue so you never have to hunt for a taxi at midnight, or pre-arranging a private chauffeur (NCC) through our Desk.',
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
          ? 'Capodanno Milano 2027 (NYE): Gran Cenone, Royal Buffet, Rooftop e Tavoli VIP in Discoteca'
          : 'New Years Eve Milan 2027 (NYE): Gala Dinner, Royal Buffet, Rooftops & VIP Tables',
        description: isIt
          ? 'Guida ufficiale Capodanno Milano 2027 (31 Dicembre 2026 - 1 Gennaio 2027): le 4 formule di ingresso e i 6 migliori club e rooftop (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop 20° Piano, Repvblic).'
          : 'Official New Years Eve Milan 2027 (Dec 31, 2026 - Jan 1, 2027) guide: the 4 entry formulas and 6 priority clubs & rooftops (Just Me, Pineta, Aria Club, 55 Milano, Voya Rooftop 20th Floor, Repvblic).',
        inLanguage: locale,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}#website`,
          name: 'Nightlife Milan',
          url: baseUrl,
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
        '@type': 'EventSeries',
        '@id': `${canonicalUrl}#eventseries`,
        name: isIt
          ? 'Capodanno Milano 2027: Gran Gala di San Silvestro nei 6 Club Prioritari'
          : 'New Years Eve Milan 2027: Official NYE Gala Across the 6 Priority Clubs',
        startDate: '2026-12-31T20:30:00+01:00',
        endDate: '2027-01-01T05:30:00+01:00',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Just Me Milano (Torre Branca), Pineta, Aria Club, 55 Milano, Voya Rooftop & Repvblic',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Viale Luigi Camoens 2 (Parco Sempione)',
            addressLocality: 'Milano',
            postalCode: '20121',
            addressCountry: 'IT',
          },
        },
        organizer: {
          '@type': 'Organization',
          name: 'Nightlife Milan NYE VIP Desk',
          telephone: '+39 351 912 7047',
          email: 'concierge@nightlifemilan.com',
          url: baseUrl,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#itemlist`,
        name: isIt
          ? 'I 6 Migliori Locali e Rooftop dove Festeggiare Capodanno 2027 a Milano'
          : 'Top 6 Best Clubs & Rooftops to Celebrate New Years Eve 2027 in Milan',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: NYE_CLUBS.length,
        itemListElement: NYE_CLUBS.map((club, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: isIt ? club.nameIt : club.nameEn,
          url: `${baseUrl}${lp}/clubs/${club.slug}`,
          description: isIt ? club.descriptionIt : club.descriptionEn,
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
            name: isIt ? 'Capodanno Milano 2027 (NYE)' : 'New Years Eve Milan 2027 (NYE)',
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

      {/* HERO CINEMATOGRAFICA CAPODANNO 2027 */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="rounded-3xl border border-champagne/35 bg-gradient-to-br from-[#1d160c] via-[#120d08] to-[#080604] p-7 sm:p-12 lg:p-14 shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
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
              {isIt ? 'Capodanno Milano 2027 (NYE)' : 'New Years Eve Milan 2027 (NYE)'}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-champagne/45 bg-champagne/15 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-champagne">
              31 DICEMBRE 2026 -&gt; 1 GENNAIO 2027 · OFFICIAL NYE CONCIERGE DESK
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            {isIt
              ? 'Capodanno Milano 2027 (NYE): Gran Cenone Servito, Royal Buffet, Rooftop Vista Fuochi e Tavoli VIP nei Migliori Club'
              : 'New Years Eve Milan 2027 (NYE): Seated Gala Dinner, Royal Buffet, Fireworks Rooftops & VIP Tables in Milans Best Clubs'}
          </h1>

          <p className="text-base sm:text-xl text-white/75 leading-relaxed max-w-4xl mb-8">
            {isIt
              ? 'Festeggia la notte di San Silvestro (31 Dicembre 2026 -> 1 Gennaio 2027) nei templi dell’intrattenimento milanese con voucher nominale garantito e corsia salta-fila. Confronta le 4 formule ufficiali di Capodanno e prenota il tuo tavolo nei 6 club di riferimento: 1. Just Me Milano sotto i fuochi della Torre Branca, 2. Pineta Corso Como Gala, 3. Aria Club San Siro Winter Dome, 4. 55 Milano Sempione, 5. Voya Rooftop al 20° piano con vista fuochi a 360 gradi su tutto lo skyline di Milano e 6. Repvblic.'
              : 'Celebrate New Years Eve (December 31, 2026 -> January 1, 2027) inside Milans flagship clubs and sky lounges with guaranteed nominal vouchers and fast-track VIP entry. Compare the 4 official NYE formulas and lock in your table across our 6 priority venues: 1. Just Me Milano under the Torre Branca fireworks, 2. Pineta Corso Como Gala, 3. Aria Club San Siro Winter Dome, 4. 55 Milano Sempione, 5. Voya Rooftop on the 20th floor overlooking the citywide midnight fireworks, and 6. Repvblic.'}
          </p>

          {/* 4 Hero Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-9">
            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? '#1 Priorità · Parco Sempione' : '#1 Priority · Parco Sempione'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">Just Me Torre Branca</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Gran Cenone Italo Rota, Royal Buffet e fuochi di mezzanotte sotto la Torre.'
                  : 'Italo Rota Gala Dinner, Royal Buffet & midnight fireworks under Torre Branca.'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? '#5 Priorità · 20° Piano (85m)' : '#5 Priority · 20th Floor (85m)'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">Voya Rooftop Fuochi 360°</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Vetrate panoramiche sul 20° piano per ammirare i fuochi d’artificio di tutta Milano.'
                  : 'Floor-to-ceiling 20th-floor glass overlooking all of Milans midnight fireworks.'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? '4 Formule Ufficiali NYE' : '4 Official NYE Formulas'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">Da €50 a €5.000 VIP</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Gran Cenone (€150-350), Royal Buffet (€60-95), Disco (€50-90) e Tavoli VIP (€600-5.000).'
                  : 'Gala Dinner (€150-350), Royal Buffet (€60-95), Club (€50-90) & VIP Tables (€600-5,000).'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'Tariffe Early Bird' : 'Early Bird Allocation'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">Zero Liste il 31/12</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Ingresso garantito solo con voucher prevendita o Tavolo VIP (+39 351 912 7047).'
                  : 'Guaranteed entry strictly via presale voucher or VIP Table (+39 351 912 7047).'}
              </p>
            </div>
          </div>

          {/* Dual CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/393519127047?text=${encodeURIComponent(
                isIt
                  ? 'Ciao Concierge Nightlife Milan! Vorrei ricevere disponibilità e prezzi per Capodanno 2027 (31 Dicembre) a Milano (Cenone / Royal Buffet / Tavolo VIP).'
                  : 'Hi Nightlife Milan Concierge! I would like to receive availability and pricing for New Years Eve 2027 (Dec 31) in Milan (Gala Dinner / Royal Buffet / VIP Table).'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-champagne text-black font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.16em] hover:bg-white transition-all shadow-[0_0_35px_rgba(201,168,106,0.4)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {isIt
                  ? 'Prenota Capodanno 2027 su WhatsApp (+39 351 912 7047)'
                  : 'Book NYE 2027 on WhatsApp (+39 351 912 7047)'}
              </span>
            </a>

            <a
              href="#quattro-formule-capodanno-milano"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl border border-champagne/40 bg-white/[0.04] text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] hover:border-champagne hover:text-champagne transition-colors"
            >
              <Calendar className="w-4 h-4 text-champagne" />
              <span>
                {isIt ? 'Confronta le 4 Formule di Capodanno ↓' : 'Compare the 4 NYE Entry Formulas ↓'}
              </span>
            </a>

            <span className="text-xs text-white/55">
              {isIt ? 'Desk Gruppi & Corporate NYE: ' : 'NYE Groups & Corporate Desk: '}
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
          <h2 id="indice-capodanno-milano" className="font-serif text-2xl sm:text-3xl font-bold text-champagne mb-4">
            {isIt
              ? 'Indice della Guida Ufficiale Capodanno Milano 2027 (31 Dicembre 2026)'
              : 'Table of Contents: Official New Years Eve Milan 2027 Guide'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-champagne mb-2">
                {isIt ? 'Sezioni Principali (H2)' : 'Main Guide Sections (H2)'}
              </p>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="#quattro-formule-capodanno-milano" className="hover:text-champagne transition-colors">
                    1. {isIt
                      ? 'Tabella Comparativa delle 4 Formule di Capodanno a Milano (Prezzi & Orari)'
                      : 'Comparative Table of the 4 NYE Entry Formulas in Milan (Prices & Hours)'}
                  </a>
                </li>
                <li>
                  <a href="#sei-club-prioritari-capodanno-2027" className="hover:text-champagne transition-colors">
                    2. {isIt
                      ? 'Schede Capodanno 2027 dei 6 Club Prioritari (+ Alcatraz, Fabrique, Tocqueville 13)'
                      : 'NYE 2027 Programs Across the 6 Priority Clubs (+ Alcatraz, Fabrique, Tocqueville 13)'}
                  </a>
                </li>
                <li>
                  <a href="#protocollo-early-bird-e-dress-code" className="hover:text-champagne transition-colors">
                    3. {isIt
                      ? 'Protocollo Prenotazione Early Bird (Ottobre/Novembre vs Sold Out) & Dress Code Black Tie'
                      : 'Early Bird Booking Protocol (Oct/Nov vs Dec Sold Out) & Black Tie Dress Code'}
                  </a>
                </li>
                <li>
                  <a href="#calcolatore-vip-capodanno" className="hover:text-champagne transition-colors">
                    4. {isIt
                      ? 'Calcolatore Preventivo Tavoli VIP & Matrice Formule d’Ingresso'
                      : 'Interactive VIP Table Quote Calculator & Entry Formula Matrix'}
                  </a>
                </li>
                <li>
                  <a href="#mappa-e-faq-capodanno-milano" className="hover:text-champagne transition-colors">
                    5. {isIt
                      ? 'Mappa dei Locali di Capodanno a Milano, 7 FAQ Strategiche e Link Interni'
                      : 'Milan NYE Venues Map, 7 Strategic FAQs & Internal Silo Links'}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-champagne mb-2">
                {isIt ? 'Accesso Diretto ai 6 Club Prioritari (H3)' : 'Direct Jump to the 6 Priority Clubs (H3)'}
              </p>
              <ul className="space-y-1.5 text-white/75">
                {NYE_CLUBS.map((c) => (
                  <li key={c.anchorId}>
                    <a href={`#${c.anchorId}`} className="hover:text-champagne transition-colors">
                      → {isIt ? c.nameIt : c.nameEn}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#grandi-arene-capodanno" className="hover:text-champagne transition-colors">
                    → {isIt
                      ? 'Grandi Club & Arene: Alcatraz, Fabrique e Tocqueville 13'
                      : 'Mega-Clubs & Arenas: Alcatraz, Fabrique & Tocqueville 13'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 1: TABELLA COMPARATIVA DELLE 4 FORMULE DI CAPODANNO A MILANO */}
      <section id="quattro-formule-capodanno-milano" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl border border-white/15 bg-[#120e09] p-6 sm:p-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
            {isIt
              ? 'SEZIONE 1 · MATRICE UFFICIALE 31 DICEMBRE 2026 -> 1 GENNAIO 2027'
              : 'SECTION 1 · OFFICIAL MATRIX DECEMBER 31, 2026 -> JANUARY 1, 2027'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
            {isIt
              ? 'Le 4 Formule di Capodanno a Milano 2027: Gran Cenone, Royal Buffet, Ingresso Disco o Tavolo VIP?'
              : 'The 4 New Years Eve 2027 Formulas in Milan: Gala Dinner, Royal Buffet, Club Ticket, or VIP Table?'}
          </h2>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-4xl mb-8">
            {isIt
              ? 'La notte del 31 Dicembre ogni locale strutturato di Milano suddivide gli ingressi in quattro fasce orarie e di servizio ben precise. Scegliere la formula corretta in base alla composizione del tuo gruppo (coppia, comitiva mista o gruppo di amici) garantisce zero attese al freddo e il tavolo assicurato per il brindisi di mezzanotte:'
              : 'On December 31, every major club and rooftop in Milan structures entry into four distinct time and service tiers. Choosing the right formula for your group size and style ensures zero waiting out in the cold and a guaranteed base for the midnight countdown toast:'}
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse min-w-[820px]">
              <thead>
                <tr className="border-b border-champagne/35 text-[11px] font-mono uppercase tracking-wider text-champagne">
                  <th className="py-3.5 pr-4">{isIt ? 'Formula Capodanno (NYE)' : 'NYE Entry Formula'}</th>
                  <th className="py-3.5 px-4">{isIt ? 'Fascia Oraria' : 'Time Slot'}</th>
                  <th className="py-3.5 px-4">{isIt ? 'Prezzo Ufficiale' : 'Official Price'}</th>
                  <th className="py-3.5 px-4">{isIt ? 'Cosa Include il Pacchetto' : 'What Is Included'}</th>
                  <th className="py-3.5 pl-4">{isIt ? 'Top Club Consigliati' : 'Recommended Priority Clubs'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs sm:text-sm text-white/85">
                {NYE_FORMULAS.map((f) => (
                  <tr key={f.id} className="hover:bg-white/[0.03]">
                    <td className="py-4 pr-4 font-serif font-bold text-white text-base">
                      {isIt ? f.nameIt : f.nameEn}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-champagne whitespace-nowrap">{f.hours}</td>
                    <td className="py-4 px-4 font-bold text-champagne whitespace-nowrap">
                      {isIt ? f.priceIt : f.priceEn}
                    </td>
                    <td className="py-4 px-4 text-white/80 leading-relaxed">
                      {isIt ? f.includedIt : f.includedEn}
                    </td>
                    <td className="py-4 pl-4 text-white/90 font-medium">
                      {isIt ? f.bestVenuesIt : f.bestVenuesEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <div className="flex items-center gap-2 text-champagne font-bold text-xs uppercase tracking-wider mb-2">
                <Crown className="w-4 h-4" />
                <span>{isIt ? 'Combo Cenone + Tavolo Dopocena' : 'Gala Dinner + VIP Club Table Combo'}</span>
              </div>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {isIt
                  ? 'La formula più richiesta dai gruppi VIP: inizi alle 20:30 con il Gran Cenone Servito e a mezzanotte mantieni o passi direttamente al tuo divanetto Privé nello stesso club con bottiglie di Dom Pérignon o Belvedere Magnum, senza mai uscire al freddo.'
                  : 'The #1 choice for VIP groups: begin at 20:30 with the Seated Gala Dinner and at midnight transition directly to your private VIP booth inside the same venue with Dom Pérignon or Belvedere Magnum service, without ever stepping out into the cold.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <div className="flex items-center gap-2 text-champagne font-bold text-xs uppercase tracking-wider mb-2">
                <GlassWater className="w-4 h-4" />
                <span>{isIt ? '100% Spendibile in Bottiglie' : '100% Bottle Spend Credit'}</span>
              </div>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {isIt
                  ? 'Nei Tavoli VIP di Capodanno (€600 - €5.000) l’intero importo include da 8 a 12 pass salta-fila ed è convertito al 100% in bottiglie dal listino ufficiale di San Silvestro (Champagne Prestige, Vodka Magnum 1.75L, Jeroboam 3L e Gin Premium).'
                  : 'For NYE VIP Tables (€600 - €5,000), the full table price includes 8 to 12 fast-track passes and is 100% credited toward official NYE bottle menu selections (Prestige Champagne, 1.75L Magnums, 3L Jeroboams, and Premium Spirits).'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
              <div className="flex items-center gap-2 text-champagne font-bold text-xs uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>{isIt ? 'Garanzia Gruppi Misti & Uomini' : 'All-Male & Large Group Guarantee'}</span>
              </div>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                {isIt
                  ? 'Per i gruppi di amici uomini o le comitive oltre le 8 persone, il Tavolo VIP o il tavolo riservato al Royal Buffet prenotato via WhatsApp (+39 351 912 7047) assicura l’ingresso prioritario con Hostess dedicata.'
                  : 'For all-male groups or parties of 8+ guests, pre-booking a VIP Table or reserved Royal Buffet booth via WhatsApp (+39 351 912 7047) guarantees smooth priority entry with a dedicated VIP Hostess.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 2: SCHEDE DETTAGLIATE CAPODANNO 2027 PER I 6 CLUB PRIORITARI + GRANDI CLUB */}
      <section id="sei-club-prioritari-capodanno-2027" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
            {isIt
              ? 'SEZIONE 2 · GERARCHIA UFFICIALE DEI 6 CLUB PRIORITARI DI MILANO'
              : 'SECTION 2 · OFFICIAL HIERARCHY OF MILANS 6 PRIORITY VENUES'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isIt
              ? 'Dove Festeggiare Capodanno 2027 a Milano: I 6 Locali Prioritari (Programma, Prezzi e Fuochi d Artificio)'
              : 'Where to Celebrate New Years Eve 2027 in Milan: The 6 Priority Venues (Programs, Prices & Fireworks)'}
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-4xl">
            {isIt
              ? 'Ecco le schede ufficiali di San Silvestro ordinate secondo la gerarchia dei 6 club prioritari Nightlife Milan (1. Just Me, 2. Pineta, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic), seguite dalle grandi arene live e club di Corso Como (Alcatraz, Fabrique e Tocqueville 13).'
              : 'Explore the official New Years Eve programs ranked by the Nightlife Milan 6 Priority Club hierarchy (1. Just Me, 2. Pineta, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop, 6. Repvblic), followed by Milans major arenas and Corso Como icons (Alcatraz, Fabrique, and Tocqueville 13).'}
          </p>
        </div>

        <div className="space-y-10 mb-14">
          {NYE_CLUBS.map((club) => (
            <article
              key={club.slug}
              id={club.anchorId}
              className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.04] to-black/60 overflow-hidden hover:border-champagne/50 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="relative h-72 lg:h-auto lg:col-span-4">
                  <Image
                    src={club.image}
                    alt={isIt ? club.nameIt : club.nameEn}
                    fill
                    quality={92}
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
                      {isIt ? club.nameIt : club.nameEn}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      <div className="p-3.5 rounded-xl bg-black/50 border border-champagne/25">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                          {isIt ? 'Formule & Prezzi Capodanno 2027' : 'NYE 2027 Formulas & Prices'}
                        </div>
                        <div className="text-xs font-semibold text-champagne">
                          {isIt ? club.formulasIt : club.formulasEn}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/50 border border-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                          {isIt ? 'Highlight Mezzanotte & Fuochi' : 'Midnight & Fireworks Highlight'}
                        </div>
                        <div className="text-xs text-white/85">
                          {isIt ? club.fireworksVibeIt : club.fireworksVibeEn}
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
                          ? `Ciao Nightlife Milan! Vorrei prenotare Capodanno 2027 da ${club.nameIt.split('(')[0].trim()}.`
                          : `Hi Nightlife Milan! I would like to book NYE 2027 at ${club.nameEn.split('(')[0].trim()}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-champagne text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>
                        {isIt ? 'Prenota Capodanno su WhatsApp' : 'Book NYE Table on WhatsApp'}
                      </span>
                    </a>

                    <Link
                      href={`${lp}/clubs/${club.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-xs font-semibold text-white hover:border-champagne hover:text-champagne transition-colors"
                    >
                      <span>{isIt ? 'Scheda Club, Foto & Listino Bottiglie →' : 'Full Venue Guide, Photos & Bottle Menu →'}</span>
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

        {/* GRANDI CLUB & ARENE: ALCATRAZ, FABRIQUE, TOCQUEVILLE 13 */}
        <div id="grandi-arene-capodanno" className="rounded-3xl border border-champagne/30 bg-[#141009] p-6 sm:p-10">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-champagne block mb-2">
            {isIt ? 'GRANDI CLUB & ARENE INDOOR' : 'MEGA-CLUBS & INDOOR ARENAS'}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-6">
            {isIt
              ? 'Grandi Eventi e Festival di Capodanno: Alcatraz, Fabrique e Tocqueville 13'
              : 'Mega-Arena NYE Events: Alcatraz, Fabrique & Tocqueville 13'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NYE_MEGA_CLUBS.map((mc) => (
              <div
                key={mc.slug}
                className="rounded-2xl border border-white/10 bg-black/50 p-6 flex flex-col justify-between hover:border-champagne/45 transition-colors"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-champagne/15 border border-champagne/35 text-champagne text-[10px] font-bold uppercase tracking-wider mb-3">
                    {isIt ? mc.tagIt : mc.tagEn}
                  </span>
                  <h4 className="font-serif text-xl font-bold text-white mb-2">{mc.name}</h4>
                  <p className="text-xs font-semibold text-champagne mb-3">
                    {isIt ? mc.pricesIt : mc.pricesEn}
                  </p>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-5">
                    {isIt ? mc.descIt : mc.descEn}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <Link
                    href={`${lp}/clubs/${mc.slug}`}
                    className="text-xs font-semibold text-white hover:text-champagne transition-colors"
                  >
                    {isIt ? 'Dettagli Locale →' : 'Venue Details →'}
                  </Link>
                  <a
                    href={`https://wa.me/393519127047?text=${encodeURIComponent(
                      isIt
                        ? `Ciao! Vorrei info e prevendite/tavoli Capodanno 2027 per ${mc.name}.`
                        : `Hi! I would like NYE 2027 tickets/VIP table info for ${mc.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-champagne text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    WhatsApp NYE
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE 3: PROTOCOLLO PRENOTAZIONE ANTICIPATA (EARLY BIRD VS SOLD OUT) & DRESS CODE BLACK TIE */}
      <section id="protocollo-early-bird-e-dress-code" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Early Bird vs Sold Out */}
          <div className="rounded-3xl border border-champagne/35 bg-gradient-to-b from-[#18130b] to-[#0c0a06] p-7 sm:p-10">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-champagne block mb-2">
              {isIt ? 'SEZIONE 3A · CRONOPROGRAMMA TARIFFE' : 'SECTION 3A · PRICING & ALLOCATION TIMELINE'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {isIt
                ? 'Protocollo Prenotazione Anticipata: Early Bird (Ottobre/Novembre) vs Sold Out Dicembre'
                : 'Advance Booking Protocol: Early Bird (Oct/Nov) vs December Sold Out'}
            </h2>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-6">
              {isIt
                ? 'A Milano i prezzi delle prevendite di Capodanno e il minimum spend dei Tavoli VIP funzionano a scaglioni progressivi (Release). Prenotare in anticipo significa pagare meno ed essere assegnati ai tavoli centrali:'
                : 'In Milan, New Years Eve presale tickets and VIP Table minimum spends operate on progressive release tiers. Booking early locks in lower rates and prime first-row booth locations:'}
            </p>

            <div className="space-y-4">
              {BOOKING_TIMELINE.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-black/55 border border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="font-serif text-lg font-bold text-white">
                      {isIt ? item.phaseIt : item.phaseEn}
                    </h3>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-champagne">
                      {isIt ? item.statusIt : item.statusEn}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {isIt ? item.detailIt : item.detailEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dress Code Black Tie / Cocktail Elegante */}
          <div className="border border-[#F6F1E7]/20 bg-[#0B0A09] p-7 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#EAE3D5] block mb-2">
                {isIt ? 'SEZIONE 3B · SELEZIONE DI GALA ALLA PORTA' : 'SECTION 3B · NYE GALA DOOR POLICY'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                {isIt
                  ? 'Dress Code Ufficiale Capodanno Milano: Black Tie Optional & Cocktail Elegante'
                  : 'Official Milan NYE Dress Code: Black Tie Optional & Cocktail Elegant'}
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-5">
                {isIt
                  ? 'La notte del 31 Dicembre i door-selector di 1. Just Me, 2. Pineta, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop e 6. Repvblic richiedono un look all’altezza del Gran Gala di San Silvestro. Anche con prevendita o tavolo riservato è indispensabile rispettare il codice di abbigliamento:'
                  : 'On December 31, door selectors at 1. Just Me, 2. Pineta, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop, and 6. Repvblic enforce a strict New Years Eve Gala dress code. Even with a presale voucher or VIP table, proper formal attire is mandatory:'}
              </p>

              <ul className="space-y-3.5 text-xs sm:text-sm text-white/85 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {isIt ? (
                      <>
                        <strong>Look Uomo (Black Tie / Formal Chic):</strong> Abito sartoriale scuro, smoking o spezzato con blazer elegante, camicia bianca o nera (con o senza papillon/cravatta) e scarpa stringata o mocassino in pelle.
                      </>
                    ) : (
                      <>
                        <strong>Gentlemen (Black Tie / Formal Chic):</strong> Dark tailored suit, tuxedo, or sharp blazer with a collared dress shirt (bow tie/tie optional) and leather dress shoes or loafers.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {isIt ? (
                      <>
                        <strong>Look Donna (Gala &amp; Sparkling):</strong> Abito lungo da sera, cocktail dress in velluto/seta/paillettes, jumpsuit sartoriale o tailleur pantalone di alta moda con tacco elegante.
                      </>
                    ) : (
                      <>
                        <strong>Ladies (Gala &amp; Sparkling):</strong> Evening gown, velvet/silk/sequin cocktail dress, tailored formal jumpsuit, or luxury pantsuit paired with heels.
                      </>
                    )}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#EAE3D5] shrink-0 mt-0.5" />
                  <span>
                    {isIt ? (
                      <>
                        <strong>Assolutamente Vietati il 31/12:</strong> Tute sportive, felpe con cappuccio, borselli a tracolla sportivi, jeans strappati, scarpe da ginnastica tecniche da corsa e cappellini da baseball.
                      </>
                    ) : (
                      <>
                        <strong>Strictly Prohibited on Dec 31:</strong> Tracksuits, hoodies, athletic crossbody bags, ripped jeans, running trainers, and baseball caps.
                      </>
                    )}
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-champagne/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-xs text-white/80">
                <strong className="text-champagne block uppercase tracking-wider mb-0.5">
                  {isIt ? 'Assistenza Diretta Concierge 24/7' : '24/7 Direct Concierge Assistance'}
                </strong>
                {isIt
                  ? 'Dubbi su quale locale scegliere per il tuo gruppo a Capodanno? Scrivici su WhatsApp.'
                  : 'Need help matching your group with the right NYE venue? Message us on WhatsApp.'}
              </div>
              <a
                href="https://wa.me/393519127047"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-champagne text-black font-bold text-xs uppercase tracking-wider whitespace-nowrap hover:bg-white transition-colors"
              >
                +39 351 912 7047
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 4: VIP QUOTE CALCULATOR, ENTRY FORMULA MATRIX & PRIORITY SIX SHOWCASE */}
      <section id="calcolatore-vip-capodanno" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <VipQuoteCalculator locale={locale} />
        <EntryFormulaMatrix locale={locale} />
        <PrioritySixShowcase locale={locale} />
      </section>

      {/* SEZIONE 5: MAPPA GOOGLE MAPS, 7 FAQ STRATEGICHE & SILO LINK INTERNI */}
      <section id="mappa-e-faq-capodanno-milano" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Google Maps */}
        <div className="rounded-3xl border border-white/15 bg-white/[0.02] p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
                {isIt
                  ? 'SEZIONE 5 · GEOLOCALIZZAZIONE TORRE BRANCA, SEMPIONE, CORSO COMO & SAN SIRO'
                  : 'SECTION 5 · GEOLOCATION OF TORRE BRANCA, SEMPIONE, CORSO COMO & SAN SIRO'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                {isIt
                  ? 'Mappa dei Locali di Capodanno 2027 a Milano (Parco Sempione, Corso Como, CityLife e San Siro)'
                  : 'Map of Milan New Years Eve 2027 Venues (Parco Sempione, Corso Como, CityLife & San Siro)'}
              </h2>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Just+Me+Milano+Viale+Luigi+Camoens+2+Torre+Branca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-wider text-champagne hover:underline"
            >
              {isIt ? 'Apri in Google Maps →' : 'Open in Google Maps →'}
            </a>
          </div>

          <EventVenueMap
            id="new-years-eve-milan-map"
            mapUrl="https://www.google.com/maps?q=Viale+Luigi+Camoens+2,+20121+Milano+MI,+Italy&output=embed"
            labels={{
              loadMap: venueMapCopy.loadMap,
              mapTitle: venueMapCopy.mapTitle.replace('{venue}', 'Capodanno Milano 2027 — Parco Sempione & Torre Branca'),
              privacyLoadNotice: venueMapCopy.privacyLoadNotice,
            }}
          />
        </div>

        {/* 7 FAQ Strategiche */}
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-champagne mb-3">
            {isIt
              ? 'Domande Frequenti (FAQ) sul Capodanno 2027 a Milano (31 Dicembre 2026)'
              : 'Frequently Asked Questions (FAQ): New Years Eve 2027 in Milan (Dec 31, 2026)'}
          </h2>
          <p className="text-white/65 text-sm sm:text-base mb-8">
            {isIt
              ? 'Risposte ufficiali del Desk Concierge Nightlife Milan (+39 351 912 7047 · concierge@nightlifemilan.com) su Cenoni, Royal Buffet, Fuochi d Artificio e Tavoli VIP.'
              : 'Official answers from the Nightlife Milan Concierge Desk (+39 351 912 7047 · concierge@nightlifemilan.com) covering Gala Dinners, Royal Buffets, Fireworks, and VIP Tables.'}
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
              ? 'Esplora il Silo Ufficiale Grandi Eventi, Tavoli VIP & Rooftop di Milano'
              : 'Explore the Official Milan Major Events, VIP Tables & Rooftops Silo'}
          </h2>
          <p className="text-xs sm:text-sm text-white/65 mb-6">
            {isIt
              ? 'Collegamenti rapidi ai 6 club prioritari, listini bottiglie, terrazze panoramiche e hub dei grandi eventi milanesi:'
              : 'Quick links to our 6 priority clubs, bottle price lists, panoramic rooftops, and Milan major event hubs:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs sm:text-sm">
            <Link
              href={`${lp}/clubs/just-me-milano`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? '1. Just Me Milano (Torre Branca)' : '1. Just Me Milano (Torre Branca)'}</span>
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
              href={`${lp}/clubs/aria-club-milano`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? '3. Aria Club San Siro' : '3. Aria Club San Siro'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/rooftops`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? '5. Voya Rooftop 20° Piano' : '5. Voya Rooftop 20th Floor'}</span>
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
              <span>{isIt ? 'Listino Bottiglie Dom Pérignon' : 'Dom Pérignon & Bottle Menu'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/concert-afterparties`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Afterparty Concerti Milano' : 'Milan Concert Afterparties'}</span>
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
      <VerticalHubsAndEventsSection locale={locale} initialTab="holidays" eventFocus="holidays" />
    </main>
  );
}
