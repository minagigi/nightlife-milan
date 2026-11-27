import { notFound } from 'next/navigation';
import { getLocaleDef, hreflangAlternates, localePrefix, indexedLocaleCodes } from '@/lib/i18n/locales';
import { resolveGenreSlug, getLocalizedGenreSlug35, getExistingGuideSlug35, getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getGenreLocalized35 } from '@/lib/i18n/zonesAndGenres35';
import { REGGAETON_35_PACKS, REGGAETON_PARTNER_VENUES } from '@/lib/i18n/reggaetonSeo35';
import { CENA_CANTATA_35_PACKS, CENA_CANTATA_VENUES } from '@/lib/i18n/cenaCantataSeo35';
import { capodannoCategoryPath, capodannoEventPath } from '@/lib/capodanno/routes';
import GuideToc from '@/components/GuideToc';
import { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { MusicGenre } from '@/lib/types';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import { Music, ArrowLeft, Calendar, MessageCircle } from 'lucide-react';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { generateEventListSchema, jsonLdString } from '@/lib/seo';
import { getAllCalendarEvents } from '@/lib/calendarEvents';
import { getEventDiscoveryItems, slimDiscoveryItemsForClient } from '@/lib/eventDiscovery';
import { VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import TasteMotionLayer from '@/components/TasteMotionLayer';
import TasteHeroCrossfade from '@/components/TasteHeroCrossfade';
import { getVenueCardPhoto4x5 } from '@/lib/siteCardAssets4x5';

// ISR Configuration
export const revalidate = 3600;

const GENRE_HERO_MAP: Record<string, string> = {
  techno: '/images/pillars/genre-hero-01.webp',
  house: '/images/pillars/genre-hero-02.webp',
  'afro-house': '/images/pillars/genre-hero-03.webp',
  'hip-hop': '/images/pillars/genre-hero-04.webp',
  reggaeton: '/images/pillars/genre-hero-05.webp',
  'dinner-show': '/images/pillars/genre-hero-06.webp',
  commercial: '/images/pillars/genre-hero-07.webp',
  latin: '/images/pillars/genre-hero-08.webp',
  afrobeats: '/images/pillars/genre-hero-09.webp',
  'open-format': '/images/pillars/genre-hero-10.webp',
};

const GENRE_INLINE_MAP: Record<string, string[]> = {
  techno: ['/images/pillars/genre-inline-01-a.webp', '/images/pillars/genre-inline-01-b.webp', '/images/pillars/genre-inline-01-c.webp', '/images/pillars/genre-inline-01-d.webp'],
  house: ['/images/pillars/genre-inline-02-a.webp', '/images/pillars/genre-inline-02-b.webp', '/images/pillars/genre-inline-02-c.webp', '/images/pillars/genre-inline-02-d.webp'],
  'afro-house': ['/images/pillars/genre-inline-03-a.webp', '/images/pillars/genre-inline-03-b.webp', '/images/pillars/genre-inline-03-c.webp', '/images/pillars/genre-inline-03-d.webp'],
  'hip-hop': ['/images/pillars/genre-inline-04-a.webp', '/images/pillars/genre-inline-04-b.webp', '/images/pillars/genre-inline-04-c.webp', '/images/pillars/genre-inline-04-d.webp'],
  reggaeton: ['/images/pillars/genre-inline-05-a.webp', '/images/pillars/genre-inline-05-b.webp', '/images/pillars/genre-inline-05-c.webp', '/images/pillars/genre-inline-05-d.webp'],
  'dinner-show': ['/images/pillars/genre-inline-06-a.webp', '/images/pillars/genre-inline-06-b.webp', '/images/pillars/genre-inline-06-c.webp', '/images/pillars/genre-inline-06-d.webp'],
  commercial: ['/images/pillars/genre-inline-07-a.webp', '/images/pillars/genre-inline-07-b.webp', '/images/pillars/genre-inline-07-c.webp', '/images/pillars/genre-inline-07-d.webp'],
  latin: ['/images/pillars/genre-inline-08-a.webp', '/images/pillars/genre-inline-08-b.webp', '/images/pillars/genre-inline-08-c.webp', '/images/pillars/genre-inline-08-d.webp'],
  afrobeats: ['/images/pillars/genre-inline-09-a.webp', '/images/pillars/genre-inline-09-b.webp', '/images/pillars/genre-inline-09-c.webp', '/images/pillars/genre-inline-09-d.webp'],
  'open-format': ['/images/pillars/genre-inline-10-a.webp', '/images/pillars/genre-inline-10-b.webp', '/images/pillars/genre-inline-10-c.webp', '/images/pillars/genre-inline-10-d.webp'],
};


type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const genreData: Record<
  string,
  {
    id: MusicGenre;
    name: string;
    heroTitle: { en: string; it: string };
    editorial: { en: string; it: string };
    soundOf: { en: string; it: string };
    topClubs: string[];
    metaTitle: { en: string; it: string };
    metaDescription: { en: string; it: string };
  }
> = {
  techno: {
    id: MusicGenre.TECHNO,
    name: 'Techno',
    heroTitle: {
      en: 'Techno: The Industrial Pulse of Milan',
      it: 'Techno: Il Battito Industriale di Milano',
    },
    editorial: {
      en: "Milan's techno scene has evolved from hidden underground raves to a globally recognized movement. Industrial warehouses in Pietrasanta, Forlanini, and Mecenate (Magazzini Generali, Amnesia, Fabrique) alongside intimate dark rooms in Corso Como (Volt Club) host local pioneers and international headliners. The crowd is dedicated, the dress code is contemporary total-black, and the sound systems (Funktion-One & L-Acoustics) deliver pure, hypnotic energy until 06:00.",
      it: "La scena techno di Milano si è evoluta dai rave underground a un movimento riconosciuto a livello mondiale. Gli spazi post-industriali tra Via Pietrasanta, Forlanini e Mecenate (Magazzini Generali, Amnesia, Fabrique) e le dark room intime in Corso Como (Volt Club) ospitano i pesi massimi internazionali della Melodic, Peak-Time e Hard Techno. Dress code rigorosamente total-black, impianti Funktion-One e L-Acoustics e set fino alle 06:00.",
    },
    soundOf: {
      en: '128–140 BPM, strobe matrices, Funktion-One & L-Acoustics sound systems, raw concrete, and total black dress code.',
      it: '128–140 BPM, matrici stroboscopiche, sound system Funktion-One e L-Acoustics, cemento grezzo e dress code total black.',
    },
    topClubs: ['Volt Club', 'Magazzini Generali', 'Amnesia Milano', 'Fabrique Milano', 'Repvblic Milano'],
    metaTitle: {
      en: 'The Best Techno Clubs in Milan | 2026/2027 Guide',
      it: 'I Migliori Club Techno a Milano | Guida 2026/2027',
    },
    metaDescription: {
      en: "Discover the ultimate guide to Milan's techno scene. Find the best underground clubs, industrial warehouses, and top DJ sets in 2026/2027.",
      it: 'Scopri la guida definitiva alla scena techno di Milano. Trova i migliori club underground, warehouse industriali e DJ set internazionali nel 2026/2027.',
    },
  },
  house: {
    id: MusicGenre.HOUSE,
    name: 'House',
    heroTitle: {
      en: 'House: The Soulful Groove of the City',
      it: 'House: Il Groove Elegante della Capitale della Moda',
    },
    editorial: {
      en: 'House music in Milan is synonymous with fashion-crowd elegance and infectious 4/4 grooves. From Just Me beneath Torre Branca and Aria Club in San Siro to panoramic sunset sets at Voya Rooftop, Ceresio 7, and Terrazza Duomo 21, Vocal House, Tech-House, and Deep House dominate the city’s most prestigious VIP tables and Fashion Week afterparties.',
      it: 'La musica House a Milano è sinonimo di eleganza fashion e groove in 4/4. Da Just Me sotto la Torre Branca e Aria Club a San Siro fino ai tramonti panoramici da Voya Rooftop, Ceresio 7 e Terrazza Duomo 21, la Vocal House, Tech-House e Deep House sono la colonna sonora dei tavoli VIP più esclusivi e degli afterparty della Fashion Week.',
    },
    soundOf: {
      en: 'Soulful vocals, driving tech-house basslines, champagne bottle parades, and fashion-forward crowds.',
      it: 'Voci soul, bassline tech-house avvolgenti, bottle parade di champagne e pubblico d’élite.',
    },
    topClubs: ['Just Me Milano', 'Aria Club', 'Voya Rooftop', '55 Milano', 'Armani Privé', 'Volt Club'],
    metaTitle: {
      en: 'The Best House Music Clubs in Milan | 2026/2027 Guide',
      it: 'I Migliori Club di Musica House a Milano | Guida 2026/2027',
    },
    metaDescription: {
      en: "Explore Milan's vibrant house music scene. Discover the best luxury clubs, rooftops, and lounges playing deep, tech, and soulful house.",
      it: 'Esplora la scena house di Milano. Scopri i migliori club di lusso, rooftop e lounge che suonano deep, tech e vocal house.',
    },
  },
  'afro-house': {
    id: MusicGenre.HOUSE,
    name: 'Afro House',
    heroTitle: {
      en: 'Afro House & Melodic: The Sound of Fashion Week 2026/2027',
      it: 'Afro House & Melodic: Il Suono della Milano Glamour 2026/2027',
    },
    editorial: {
      en: 'Inspired by Mykonos, Tulum, and Ibiza, Afro House and Tribal Melodic House have become the #1 sound of Milan’s luxury gardens, open-air amphitheaters, and skyline rooftops. Organic percussion, hypnotic piano riffs, and warm tribal vocals fill Aria Club’s garden in San Siro, Just Me in Parco Sempione, Voya Rooftop at 85 meters, and Volt’s Sunday rituals.',
      it: 'Ispirata ai beach club di Mykonos, Tulum e Ibiza, l’Afro House e la Melodic Tribal House sono diventate il genere #1 dei garden di lusso, degli anfiteatri open-air e dei rooftop panoramici milanesi. Percussioni organiche, riff ipnotici di pianoforte e vocalizzi tribali accendono il giardino di Aria Club a San Siro, Just Me nel Parco Sempione, Voya Rooftop a 85 metri e la domenica di Volt.',
    },
    soundOf: {
      en: 'Organic tribal percussion, Keinemusik-inspired melodic synths, open-air gardens, and high-fashion crowds.',
      it: 'Percussioni tribali organiche, synth melodici stile Keinemusik/Black Coffee, garden open-air e pubblico alta moda.',
    },
    topClubs: ['Aria Club', 'Just Me Milano', 'Voya Rooftop', 'Volt Club', 'Ceresio 7'],
    metaTitle: {
      en: 'Best Afro House & Melodic House Clubs in Milan | 2026/2027 Guide',
      it: 'Migliori Club e Serate Afro House a Milano | Guida 2026/2027',
    },
    metaDescription: {
      en: 'Where to dance to Afro House and Melodic House in Milan: Aria Club, Just Me, Voya Rooftop, and Volt. VIP tables and guestlist via WhatsApp.',
      it: 'Dove ballare Afro House e Melodic House a Milano: Aria Club, Just Me, Voya Rooftop e Volt. Prenota Tavoli VIP e Liste via WhatsApp.',
    },
  },
  'hip-hop': {
    id: MusicGenre.HIP_HOP,
    name: 'Hip Hop & Urban',
    heroTitle: {
      en: 'Hip Hop & Urban: The High-Energy Rhythm of Milan',
      it: 'Hip Hop, Trap & Afrobeats: Il Ritmo Urban di Milano',
    },
    editorial: {
      en: 'As the undisputed capital of the Italian recording industry, Milan’s Hip Hop, R&B, Trap, and Afrobeats nights attract international athletes, recording artists, and fashion creatives. Repvblic Milano (Dirty Monday), Pineta Milano, Aria Club, Tocqueville 13, and Hollywood Rythmoteque deliver heavy 808s, live showcases, and electric bottle service energy.',
      it: 'Capitale indiscussa della discografia italiana, Milano offre serate Hip Hop, R&B, Trap e Afrobeats frequentate da calciatori di Serie A, rapper, producer e modelli internazionali. Repvblic Milano (Dirty Monday), Pineta Milano, Aria Club, Tocqueville 13 e Hollywood Rythmoteque garantiscono 808 potenti, showcase dal vivo e bottle service spettacolare.',
    },
    soundOf: {
      en: 'Heavy 808s, US & Italian Rap, Afrobeats, luxury streetwear, and sparkler bottle parades.',
      it: '808 potenti, Rap USA & Italiano, Afrobeats, luxury streetwear e bottle parade scintillanti.',
    },
    topClubs: ['Repvblic Milano', 'Pineta Milano', 'Aria Club', 'Tocqueville 13', 'Hollywood Rythmoteque'],
    metaTitle: {
      en: 'Best Hip Hop, R&B & Afrobeats Clubs in Milan | 2026/2027 Guide',
      it: 'I Migliori Club Hip Hop, Trap e Afrobeats a Milano | Guida 2026/2027',
    },
    metaDescription: {
      en: 'Find the top hip hop, R&B, and Afrobeats clubs in Milan. VIP tables, urban vibes, and the best DJs at Repvblic, Pineta, Aria & Tocqueville 13.',
      it: 'Trova i migliori club hip hop, R&B e afrobeats a Milano. Tavoli VIP, vibrazioni urban e i migliori DJ da Repvblic, Pineta, Aria e Tocqueville 13.',
    },
  },
  reggaeton: {
    id: MusicGenre.REGGAETON,
    name: 'Reggaeton & Latin',
    heroTitle: {
      en: 'Reggaeton & Urban Latin Clubs in Milan',
      it: 'Discoteche Reggaeton & Urban Latin a Milano',
    },
    editorial: {
      en: 'When Milan wants pure dancefloor heat, Reggaeton and Latin Urban take over. Anchored by PERREO XL @ Gate Milano on New Year’s Eve 2027 (€20–€50 tickets, €500–€600 tables) and weekly parties at Pineta, Aria Club, Tocqueville 13, Hollywood, REPVBLIC, The Club, and Just Me.',
      it: 'Quando Milano cerca il ritmo del perreo fino all’alba, il Reggaeton domina tra PERREO XL @ Gate Milano (Capodanno 20–50€, tavoli 500–600€) e i club partner Pineta, Aria Club, Tocqueville 13, Hollywood, REPVBLIC, The Club e Just Me.',
    },
    soundOf: {
      en: 'Dembow beats, Bad Bunny & Karol G anthems, PERREO XL specials, and full-energy dancefloors.',
      it: 'Ritmi dembow, hit di Bad Bunny, Feid e Karol G, speciali PERREO XL e piste fino all’alba.',
    },
    topClubs: ['PERREO XL @ Gate Milano', 'Aria Club Milano', 'Pineta Milano', 'Tocqueville 13', 'Hollywood Rythmoteque', 'REPVBLIC Milano', 'The Club Milano', 'Just Me Milano'],
    metaTitle: {
      en: 'Reggaeton Clubs Milan 2026/2027: Best Parties & VIP Tables',
      it: 'Discoteche Reggaeton Milano 2026/2027: Locali, Date & Tavoli',
    },
    metaDescription: {
      en: 'Top reggaeton & perreo clubs in Milan: PERREO XL @ Gate, Pineta Noche de Perreo, Aria, Tocqueville 13 & Hollywood. WhatsApp +39 351 912 7047.',
      it: 'Migliori locali reggaeton a Milano: PERREO XL @ Gate, Pineta, Aria, Tocqueville 13, Hollywood e Repvblic. WhatsApp +39 351 912 7047.',
    },
  },
  commercial: {
    id: MusicGenre.COMMERCIAL,
    name: 'Commercial & Sing-Along',
    heroTitle: {
      en: 'Commercial & Sing-Along: The Glittering Heart of Milan',
      it: 'Commerciale, Hit & Cantato: Il Cuore Scintillante della Movida',
    },
    editorial: {
      en: 'Commercial and Italian/International Sing-Along nights are the signature of Milanese conviviality. Starting with the singing aperitivo at Pineta Milano, 55 Milano, and Loolapaloosa and peaking on the dancefloors of Just Me, Repvblic, and Alcatraz, everyone sings every chorus at the top of their lungs.',
      it: 'Le serate Commerciali, Hit Pop/Dance e Aperitivo Cantato sono il marchio di fabbrica della convivialità milanese. Si parte alle 20:00 cantando sui tavoli da Pineta Milano, 55 Milano e Loolapaloosa per poi esplodere in pista fino alle 05:00 da Just Me, Repvblic e Alcatraz.',
    },
    soundOf: {
      en: 'Chart-topping hits, 2000s/2010s anthems, Italian sing-alongs, sparklers, and glamorous VIP areas.',
      it: 'Hit in cima alle classifiche, inni anni 2000/2010, grandi classici italiani da cantare, stelline e privé glamour.',
    },
    topClubs: ['Just Me Milano', 'Pineta Milano', '55 Milano', 'Repvblic Milano', 'Loolapaloosa', 'Alcatraz Milano'],
    metaTitle: {
      en: 'Best Commercial & Sing-Along Clubs in Milan | 2026/2027 Guide',
      it: 'I Migliori Club Commerciali e Aperitivo Cantato a Milano | Guida 2026/2027',
    },
    metaDescription: {
      en: 'Experience the glamorous side of Milan. Discover the best commercial clubs, singing aperitivos, VIP tables, and exclusive parties.',
      it: 'Vivi il lato più festoso e glamour di Milano. Scopri i migliori club commerciali, aperitivi cantati, tavoli VIP e feste esclusive.',
    },
  },
  'dinner-show': {
    id: MusicGenre.COMMERCIAL,
    name: 'Cena Cantata & Dinner Show',
    heroTitle: {
      en: 'Singing Dinner (Cena Cantata) & Dinner Show: From Fine Dining to Dancefloor',
      it: 'Cena Cantata & Dinner Show a Milano: Dalla Cena Spettacolo alla Pista',
    },
    editorial: {
      en: 'Milan’s most coveted nightlife formula combines gourmet seated dining or a monumental Royal Singing Aperitivo with live vocalists, saxophonists, theatrical performers, and a seamless midnight transition into a high-energy nightclub while keeping your reserved table. Experience it at Pineta Milano, Carlsberg Øl (75 EUR all-in NYE Cena Cantata), MIB Milano (LOVE AFFAIR & BILLIONS), Philipp’s Milano at The Plein Hotel (The Philipp’s Show), 55 Milano, Just Me under Torre Branca (VIZIATISSIMA), Voya Rooftop on the 20th floor, Bischeri, and Il Gattopardo.',
      it: 'La formula più ricercata della notte milanese unisce la Cena Cantata servita o il Royal Aperitivo Cantato a vocalist dal vivo, sassofonisti, performer teatrali e trasformazione a mezzanotte in vera discoteca mantenendo il proprio tavolo riservato. Vivila da Pineta Milano, Carlsberg Øl Porta Nuova (Cenone + Cena Cantata 75€ tutto incluso), MIB Milano (LOVE AFFAIR e BILLIONS), Philipp’s Milano al The Plein Hotel (The Philipp’s Show ore 21:45), 55 Milano, Just Me sotto Torre Branca (VIZIATISSIMA), Voya Rooftop al 20° piano, Bischeri e Il Gattopardo.',
    },
    soundOf: {
      en: 'Live sax & vocalists during dinner, Italian & international sing-along anthems at dessert, and full club DJ sets from midnight to 05:00.',
      it: 'Sax e vocalist dal vivo durante la cena, grandi classici italiani e hit internazionali da cantare al dessert e DJ set club da mezzanotte alle 05:00.',
    },
    topClubs: ['Pineta Milano', 'Carlsberg Øl Milano', 'MIB Milano', "Philipp's Milano", '55 Milano', 'Just Me Milano', 'Voya Rooftop', 'Il Gattopardo'],
    metaTitle: {
      en: 'Dinner Show & Cena Cantata Milan 2026/2027: Top 10 Venues',
      it: 'Cena Cantata Milano 2026/2027: Migliori Locali, Prezzi e VIP',
    },
    metaDescription: {
      en: "Best Singing Dinner (Cena Cantata) & Dinner Show clubs in Milan 2026/2027: Pineta, 55 Milano, Carlsberg Øl (75€), Just Me, MIB & Philipp's. WA +39 351 912 7047.",
      it: "Migliori locali di Cena Cantata e Dinner Show a Milano 2026/2027: Pineta, 55 Milano, Carlsberg Øl (75€ NYE), Just Me, MIB e Philipp's. WA +39 351 912 7047.",
    },
  },
  edm: {
    id: MusicGenre.EDM,
    name: 'EDM & Festival Arena',
    heroTitle: {
      en: 'EDM: Electric Energy and Massive Festival Drops',
      it: 'EDM & Mainstage: Energia da Festival e Grandi Produzioni',
    },
    editorial: {
      en: "For those seeking festival-level production indoors, Milan's big-room arenas deliver massive LED walls, CO2 cannons, laser matrices, and international Top-100 DJs at Fabrique, Alcatraz, Aria Club, and Just Me.",
      it: 'Per chi cerca una produzione da grande festival in città, le arene mainstage di Milano offrono LED wall monumentali, cannoni CO2, laser show e guest DJ della Top-100 mondiale da Fabrique, Alcatraz, Aria Club e Just Me.',
    },
    soundOf: {
      en: 'Mainstage drops, laser shows, CO2 cannons, and festival vibes.',
      it: 'Drop da mainstage, spettacoli laser, cannoni a CO2 e vibrazioni da festival.',
    },
    topClubs: ['Fabrique Milano', 'Aria Club', 'Just Me Milano', 'Alcatraz Milano'],
    metaTitle: {
      en: 'Top EDM Clubs & Mainstage Events in Milan | 2026/2027 Guide',
      it: 'I Migliori Club ed Eventi EDM a Milano | Guida 2026/2027',
    },
    metaDescription: {
      en: 'Find the biggest EDM parties in Milan. Experience international DJs, massive sound systems, and unforgettable nights.',
      it: 'Trova le più grandi feste EDM a Milano. Vivi DJ internazionali, sound system enormi e notti indimenticabili.',
    },
  },
  'live-music': {
    id: MusicGenre.LIVE_MUSIC,
    name: 'Live Music & Concert Clubs',
    heroTitle: {
      en: 'Live Music: Concerts Followed by All-Night Clubbing',
      it: 'Musica dal Vivo & Concert Club: Dal Palco Live al DJ Set',
    },
    editorial: {
      en: 'Beyond pure DJ culture, Milan’s premier live arenas — Alcatraz in Isola/Farini, Fabrique in Mecenate, Magazzini Generali in Porta Romana, and Repvblic’s Dirty Monday Rock’n’Roll nights — host international tours from 21:00 and transform into multi-room clubs from 23:30 until 05:00.',
      it: 'Oltre ai DJ set, le grandi arene live di Milano — Alcatraz in zona Isola/Farini, Fabrique in Mecenate, Magazzini Generali in Porta Romana e il Dirty Monday Rock’n’Roll del Repvblic — ospitano tour internazionali dalle 21:00 per poi trasformarsi in club multi-sala dalle 23:30 alle 05:00.',
    },
    soundOf: {
      en: 'Live bands and touring artists until 23:00, followed by rock, 90s/2000s, and club DJ sets until dawn.',
      it: 'Concerti live e tour internazionali fino alle 23:00, seguiti da DJ set rock, 90/2000 e club fino all’alba.',
    },
    topClubs: ['Alcatraz Milano', 'Fabrique Milano', 'Magazzini Generali', 'Repvblic Milano'],
    metaTitle: {
      en: 'Best Live Music Venues & Concert Clubs in Milan | 2026/2027 Guide',
      it: 'I Migliori Locali di Musica dal Vivo e Concert Club a Milano | Guida 2026/2027',
    },
    metaDescription: {
      en: "Discover Milan's best live music venues and concert clubs: Alcatraz, Fabrique, Magazzini Generali, and Repvblic.",
      it: 'Scopri i migliori locali di musica dal vivo e concert club di Milano: Alcatraz, Fabrique, Magazzini Generali e Repvblic.',
    },
  },
  indie: {
    id: MusicGenre.INDIE,
    name: 'Indie, Nu-Disco & Alternative',
    heroTitle: {
      en: 'Indie & Nu-Disco: The Creative Beat of Milan',
      it: 'Indie, Nu-Disco & Alternative: Il Battito Creativo della Città',
    },
    editorial: {
      en: "Milan's indie, nu-disco, and alternative electronic scene thrives in design-forward spaces like Apollo Club in Navigli, Plastic in Ripamonti, and experimental venues across Isola and NoLo.",
      it: 'La scena indie, nu-disco ed elettronica alternativa di Milano vive in spazi dal design ricercato come Apollo Club sui Navigli, Plastic in zona Ripamonti e i club creativi tra Isola e NoLo.',
    },
    soundOf: {
      en: 'Nu-disco, indie dance, alternative electronics, retro design aesthetics, and creative crowds.',
      it: 'Nu-disco, indie dance, elettronica alternativa, estetica retrò e pubblico creativo.',
    },
    topClubs: ['Apollo Club Milano', 'Magazzini Generali', 'Alcatraz Milano'],
    metaTitle: {
      en: 'Top Indie, Nu-Disco & Alternative Clubs in Milan | 2026/2027 Guide',
      it: 'I Migliori Club Indie, Nu-Disco e Alternativi a Milano | Guida 2026/2027',
    },
    metaDescription: {
      en: 'Explore the alternative side of Milan. Find the best indie, nu-disco, and creative club nights.',
      it: 'Esplora il lato creativo e alternativo di Milano. Trova i migliori club indie, nu-disco e serate underground.',
    },
  },
};

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];

  Object.keys(genreData).forEach((slug) => {
    paths.push({ locale: 'en', slug });
    paths.push({ locale: 'it', slug });
  });

  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = (locale as LocaleCode) || 'en';

  const canonicalGenreSlug = resolveGenreSlug(slug);
  const genre = genreData[canonicalGenreSlug] || genreData[slug];

  if (!genre) return notFound();

  const gLoc = getGenreLocalized35(canonicalGenreSlug, loc);
  const title = seoTitle(gLoc.seoTitle);
  const description = withWhatsApp(gLoc.seoDescription, loc);

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const localizedGenreSlug = getLocalizedGenreSlug35(canonicalGenreSlug, loc);
  const canonical = `${baseUrl}${localePrefix(loc)}/${getLocalizedDir35('genres', loc)}/${localizedGenreSlug}`;
  const genreLangAlternates: Record<string, string> = {
    'x-default': `${baseUrl}/${getLocalizedDir35('genres', 'en')}/${getLocalizedGenreSlug35(canonicalGenreSlug, 'en')}`,
  };
  for (const l of indexedLocaleCodes) {
    genreLangAlternates[getLocaleDef(l)!.hreflang] = `${baseUrl}${localePrefix(l)}/${getLocalizedDir35('genres', l)}/${getLocalizedGenreSlug35(canonicalGenreSlug, l)}`;
  }

  const ogImage = `${baseUrl}${GENRE_HERO_MAP[canonicalGenreSlug] || GENRE_HERO_MAP[slug] || '/images/pillars/genre-hero-01.webp'}`;

  return {
    title,
    description,
    robots: seoRobots(loc),
    alternates: {
      canonical,
      languages: genreLangAlternates,
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

export default async function GenrePage({ params }: Props) {
  const { locale, slug } = await params;
  const loc = (locale as LocaleCode) || 'en';
  const isIt = loc === 'it';
  const lp = localePrefix(loc);
  const canonicalGenreSlug = resolveGenreSlug(slug);
  const genreHeroImg = GENRE_HERO_MAP[canonicalGenreSlug] || GENRE_HERO_MAP[slug] || '/images/pillars/genre-hero-01.webp';
  const genreInlineImgs = GENRE_INLINE_MAP[canonicalGenreSlug] || GENRE_INLINE_MAP[slug] || GENRE_INLINE_MAP.techno;

  const genre = genreData[canonicalGenreSlug] || genreData[slug];

  if (!genre) return notFound();

  const gLoc = getGenreLocalized35(canonicalGenreSlug, loc);
  const items = getEventDiscoveryItems(await getAllCalendarEvents(), loc).filter(
    ({ event }) => event.genre.includes(genre.id)
  );

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const currentGenreUrl = `${baseUrl}${lp}/${getLocalizedDir35('genres', loc)}/${getLocalizedGenreSlug35(canonicalGenreSlug, loc)}`;
  const genresHubUrl = `${baseUrl}${lp}/${getLocalizedDir35('genres', loc)}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: gLoc.ui.home, item: `${baseUrl}${lp || '/'}` },
      { '@type': 'ListItem', position: 2, name: gLoc.ui.genresHub, item: genresHubUrl },
      { '@type': 'ListItem', position: 3, name: gLoc.name, item: currentGenreUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: gLoc.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  const isTasteReggaeton = canonicalGenreSlug === 'reggaeton' || canonicalGenreSlug === 'dinner-show';

  if (isTasteReggaeton) {
    const isDinnerShow = canonicalGenreSlug === 'dinner-show';
    const cp = isDinnerShow ? (CENA_CANTATA_35_PACKS[loc] || CENA_CANTATA_35_PACKS.en) : null;
    const rp = cp || REGGAETON_35_PACKS[loc] || REGGAETON_35_PACKS.en;
    const partnerVenues = isDinnerShow ? CENA_CANTATA_VENUES : REGGAETON_PARTNER_VENUES;
    const clubsDir = getLocalizedDir35('clubs', loc);
    const guidesDir = getLocalizedDir35('guides', loc);
    const targetGuideSlug = getExistingGuideSlug35(isDinnerShow ? 'g-60' : 'g-118', loc);
    const waUrl = getConciergeBookingUrl(loc, gLoc.h1, currentGenreUrl);
    const shortDisplayTitle = cp ? cp.shortDisplayTitle : `${gLoc.name.split('&')[0].trim()} Milano 2027`;
    const crossfadeImgs = Array.from(new Set([genreHeroImg, ...genreInlineImgs]));

    return (
      <main className="taste-pillar-root flex-1 bg-[#050505] text-[#F6F1E7] w-full">
        <TasteMotionLayer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
        />

        {/* 1. Hero (#050505) */}
        <section className="bg-[#050505] text-[#F6F1E7] pt-8 sm:pt-12 pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-[14px] text-[#C2B9AA] mb-8" aria-label="Breadcrumb">
              <ol className="list-none p-0 flex flex-wrap items-center gap-2">
                <li>
                  <Link href={lp || '/'} className="hover:text-[#F6F1E7] transition-colors">
                    {gLoc.ui.home}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={`${lp}/genres`} className="hover:text-[#F6F1E7] transition-colors">
                    {gLoc.ui.genresHub}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#F6F1E7] font-semibold" aria-current="page">
                  {gLoc.name}
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
              <div className="lg:col-span-7" data-taste-reveal>
                <h1 className="font-display font-extrabold text-[#F6F1E7] m-0 mb-5">
                  {shortDisplayTitle}
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-[#EAE3D5] leading-snug mb-3 max-w-2xl">
                  {gLoc.h1}
                </p>
                <p className="text-base text-[#C2B9AA] leading-relaxed mb-6 max-w-xl">
                  {gLoc.lead} ({items.length} {gLoc.ui.upcomingEvents}).
                </p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {gLoc.topClubs.slice(0, 6).map((club) => (
                    <span
                      key={club}
                      className="px-3.5 py-2 bg-[#141311] text-[#EAE3D5] text-[14px] font-medium"
                    >
                      {club}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="taste-btn-primary"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span>{gLoc.ui.bookVipCta}</span>
                  </a>
                  <a href="#reggaeton-partners" className="taste-btn-outline-light">
                    <span>{rp.boxTitle}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <TasteHeroCrossfade
                  images={crossfadeImgs}
                  altPrimary={gLoc.h1}
                  altSecondary={gLoc.subtitle}
                  title={gLoc.h1}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Warm Ivory Quick Brief & TOC (#F6F1E7) */}
        <section className="bg-[#F6F1E7] text-[#050505] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-8 mb-8" data-taste-stagger>
              <div>
                <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{partnerVenues.length}</p>
                <p className="text-[14px] text-[#3B362E] mt-1 m-0">{rp.boxTitle}</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{items.length}</p>
                <p className="text-[14px] text-[#3B362E] mt-1 m-0">{gLoc.ui.upcomingEvents}</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">{gLoc.ui.verifiedBadge}</p>
                <p className="text-[14px] text-[#3B362E] mt-1 m-0">{gLoc.ui.quickAnswerTitle}</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-bold text-[#050505] tabular-nums m-0">24/7</p>
                <p className="text-[14px] text-[#3B362E] mt-1 m-0">WhatsApp +39 351 912 7047</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-3" data-taste-reveal>
                <h2 className="font-display font-bold text-[#050505] m-0">{gLoc.ui.tocTitle}</h2>
                <p className="text-[15px] text-[#3B362E] leading-relaxed m-0">
                  {gLoc.ui.verifiedBody}
                </p>
              </div>
              <nav aria-label={gLoc.ui.tocTitle} className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" data-taste-stagger>
                  <a
                    href="#reggaeton-partners"
                    className="flex items-center justify-between gap-4 bg-[#EAE3D5] hover:bg-[#050505] hover:text-[#F6F1E7] text-[#050505] px-5 py-4 text-[15px] font-semibold transition-colors"
                  >
                    <span>{rp.boxTitle}</span>
                    <span aria-hidden="true">→</span>
                  </a>
                  {gLoc.sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="flex items-center justify-between gap-4 bg-[#EAE3D5] hover:bg-[#050505] hover:text-[#F6F1E7] text-[#050505] px-5 py-4 text-[15px] font-medium transition-colors"
                    >
                      <span>{sec.heading}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </section>

        {/* 3. Gallery Strip (#050505) */}
        {genreInlineImgs.length >= 2 && (
          <section aria-label={gLoc.h1} className="bg-[#050505] py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-taste-stagger>
                {genreInlineImgs.slice(0, 4).map((src, idx) => (
                  <figure key={src} className="relative aspect-[4/5] w-full overflow-clip bg-[#141311] m-0">
                    <Image
                      src={src}
                      alt={`${gLoc.name} Milan club atmosphere ${idx + 1}`}
                      title={`${gLoc.name} Milan club ${idx + 1}`}
                      fill
                      unoptimized
                      quality={92}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover brightness-[0.88] hover:brightness-100 transition-[filter] duration-500"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. Partner Reggaeton Venues Ledger (#050505) */}
        <section id="reggaeton-partners" className="scroll-mt-24 bg-[#050505] text-[#F6F1E7] py-16 sm:py-20" data-no-lightbox="true">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10" data-taste-reveal>
              <div className="lg:col-span-7">
                <h2 className="taste-section-display font-bold text-[#F6F1E7] m-0">{rp.boxTitle}</h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-[15px] sm:text-base text-[#C2B9AA] leading-relaxed m-0">{rp.boxLead}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8" data-taste-stagger>
              {partnerVenues.map((v) => {
                const vPhoto = getVenueCardPhoto4x5({ id: v.clubSlug, slugs: { en: v.clubSlug } });
                return (
                  <div
                    key={v.name}
                    className="border border-[#F6F1E7]/14 bg-[#0B0A09] hover:border-[#EAE3D5]/45 overflow-hidden flex flex-col justify-between transition-colors"
                  >
                    <div>
                      <div data-no-lightbox="true" className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505] border-b border-[#F6F1E7]/14">
                        <Image
                          src={vPhoto}
                          alt={v.name}
                          width={1080}
                          height={1350}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                          quality={92}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg font-bold text-[#F6F1E7] m-0">{v.name}</h3>
                        <p className="text-[14px] text-[#C2B9AA] mt-1 m-0">{v.district}</p>
                        <p className="text-[14px] font-medium text-[#EAE3D5] mt-2 m-0">{v.nightTag}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 pt-3 border-t border-[#F6F1E7]/10 flex flex-wrap gap-2">
                      {v.clubSlug && (
                        <Link
                          href={`${lp}/${clubsDir}/${getLocalizedVenueSlug35(v.clubSlug, loc)}`}
                          locale={loc}
                          className="taste-btn-outline-light text-[13px] px-3.5 py-2 flex-1 text-center"
                        >
                          {rp.clubCta}
                        </Link>
                      )}
                      {v.eventSlug && (
                        <Link
                          href={capodannoEventPath(v.eventSlug, loc)}
                          locale={loc}
                          className="taste-btn-primary text-[13px] px-3.5 py-2 flex-1 text-center"
                        >
                          {rp.nyeCta}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`${lp}/${guidesDir}/${targetGuideSlug}`}
                locale={loc}
                className="taste-btn-outline-light"
              >
                <span>{rp.guideCta}</span>
              </Link>
              {cp && (
                <Link
                  href={capodannoCategoryPath('capodanno-locali-cenone-milano', loc)}
                  locale={loc}
                  className="taste-btn-primary"
                >
                  <span>{cp.nyeCatCta}</span>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* 5. Alternating Localized Reggaeton Chapters (#F6F1E7 / #050505) */}
        {gLoc.sections.map((sec, idx) => {
          const isLight = idx % 2 === 0;
          const chapterImg = genreInlineImgs[idx % Math.max(1, genreInlineImgs.length)] || genreHeroImg;
          return (
            <section
              key={sec.id}
              id={sec.id}
              className={`scroll-mt-24 py-14 sm:py-20 ${
                isLight ? 'bg-[#F6F1E7] text-[#050505]' : 'bg-[#050505] text-[#F6F1E7]'
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start" data-taste-reveal>
                  <div className="lg:col-span-4 lg:sticky lg:top-24">
                    <h2 className={`font-display font-bold m-0 mb-4 ${isLight ? 'text-[#050505]' : 'text-[#F6F1E7]'}`}>
                      {sec.heading}
                    </h2>
                    {idx === 0 ? (
                      <div className="bg-[#EAE3D5] p-6 mt-5">
                        <h3 className="font-display text-lg font-bold text-[#050505] flex items-center gap-2 mb-2">
                          <Music className="w-4 h-4 shrink-0" />
                          <span>{gLoc.name}</span>
                        </h3>
                        <p className="text-[15px] text-[#3B362E] leading-relaxed mb-5 m-0">
                          {gLoc.subtitle}
                        </p>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="taste-btn-dark w-full"
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" />
                          <span>{gLoc.ui.bookVipCta}</span>
                        </a>
                      </div>
                    ) : (
                      <figure className={`relative aspect-[4/5] w-full overflow-clip mt-4 ${isLight ? 'bg-[#EAE3D5]' : 'bg-[#0B0A09]'}`}>
                        <Image
                          src={chapterImg}
                          alt={sec.heading}
                          title={sec.heading}
                          fill
                          unoptimized
                          quality={92}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </figure>
                    )}
                  </div>

                  <div className={`lg:col-span-8 space-y-4 ${isLight ? 'taste-prose-light' : 'taste-prose-dark'}`}>
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="m-0">{p}</p>
                    ))}
                    {sec.bullets && (
                      <ul className="list-disc pl-5 space-y-2">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* 6. Upcoming Events Grid (#050505) */}
        <div id="upcoming-reggaeton" className="bg-[#050505] pt-8">
          {items.length > 0 ? (
            <DiscoveryGrid
              items={slimDiscoveryItemsForClient(items, loc, 24)}
              lang={loc}
              title={`${gLoc.ui.upcomingEvents} (${gLoc.name})`}
              subtitle={gLoc.lead}
            />
          ) : (
            <section className="max-w-3xl mx-auto px-4 py-16 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#141311] mb-5">
                <Calendar className="w-6 h-6 text-[#25D366]" />
              </div>
              <h2 className="taste-section-display text-[#F6F1E7] mb-3">{gLoc.ui.bookVipCta}</h2>
              <p className="text-[#C2B9AA] mb-7 text-base">{gLoc.ui.directDeskLabel}</p>
              <Link href={`${lp}/events`} className="taste-btn-primary">
                {gLoc.ui.upcomingEvents}
              </Link>
            </section>
          )}
        </div>

        {/* 7. Interactive VIP Quote Calculator (#050505) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <VipQuoteCalculator locale={loc} />
        </section>

        {/* 8. Split FAQ Accordion (#F6F1E7) */}
        {gLoc.faqs.length > 0 && (
          <section className="bg-[#F6F1E7] text-[#050505] py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                <div className="lg:col-span-7">
                  <h2 className="taste-section-display font-bold text-[#050505] mb-8" data-taste-reveal>
                    {gLoc.ui.faqTitle} ({gLoc.name})
                  </h2>
                  <div className="space-y-3" data-taste-stagger>
                    {gLoc.faqs.map((f, i) => (
                      <details
                        key={i}
                        open={i === 0}
                        className="taste-faq-item bg-[#EAE3D5] px-5 sm:px-6"
                      >
                        <summary className="text-base sm:text-lg font-bold text-[#050505]">
                          <span>{f.question}</span>
                          <span className="taste-faq-plus text-[#050505]" aria-hidden="true" />
                        </summary>
                        <p className="text-[15px] sm:text-base text-[#1F1C18] leading-relaxed pt-2 pb-3 m-0">
                          {f.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6" data-taste-reveal>
                  <figure className="relative aspect-[4/5] w-full overflow-clip bg-[#0B0A09]">
                    <Image
                      src={genreInlineImgs[2] || genreInlineImgs[0] || genreHeroImg}
                      alt={`${gLoc.name} Milan VIP`}
                      title={gLoc.h1}
                      fill
                      unoptimized
                      quality={92}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </figure>
                  <Link href={`${lp}/genres`} className="taste-btn-dark w-full">
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    <span>{gLoc.ui.otherGenres}</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {items.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: jsonLdString(generateEventListSchema(items, loc, gLoc.h1)),
            }}
          />
        )}
        <EditorialPageSections locale={loc} path={`${lp}/genres/${slug}`} />
      </main>
    );
  }

  return (
    <main className="flex-grow pt-24 pb-20 bg-[#050505]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="text-sm text-white/40" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href={lp || '/'} className="hover:text-champagne transition-colors">
                {gLoc.ui.home}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href={`${lp}/genres`} className="hover:text-champagne transition-colors">
                {gLoc.ui.genresHub}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">
              {gLoc.name}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Genre */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[540px] rounded-2xl overflow-hidden border border-champagne/25 mb-8">
              <Image
                src={genreHeroImg}
                alt={gLoc.h1}
                title={gLoc.h1}
                fill
                priority
                quality={92}
                sizes="(max-width: 768px) 100vw, 540px"
                className="object-cover"
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne mb-3">
              {gLoc.ui.verifiedBadge}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-champagne tracking-tighter mb-6">
              {gLoc.h1}
            </h1>

            {/* Top Clubs Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {gLoc.topClubs.map((club) => (
                <span
                  key={club}
                  className="px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/[0.06] text-champagne text-xs font-mono tracking-wide"
                >
                  ★ {club}
                </span>
              ))}
            </div>

            {/* AI Trafiletto & Concierge Verified */}
            <div className="mb-8 p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04]">
              <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-2">
                {gLoc.ui.quickAnswerTitle}
              </p>
              <p className="font-sans text-white/80 text-sm leading-relaxed mb-2">
                {gLoc.lead} ({items.length} {gLoc.ui.upcomingEvents}).
              </p>
              <p className="font-sans text-white/55 text-xs leading-relaxed">
                {gLoc.ui.verifiedBody}
              </p>
            </div>

            {/* Clickable TOC (>= 5 anchors) */}
            <div className="mb-10">
              <GuideToc sections={gLoc.sections.map((s) => ({ id: s.id, title: s.heading }))} title={gLoc.ui.tocTitle} />
            </div>

            {/* Localized 5-Chapter Genre Guide */}
            <div className="text-white/75 leading-relaxed mb-10 space-y-8">
              {gLoc.sections.map((sec) => (
                <div key={sec.id} id={sec.id} className="scroll-mt-28">
                  <h2 className="font-serif text-2xl md:text-3xl text-champagne mb-3">
                    {sec.heading}
                  </h2>
                  {sec.paragraphs.map((p, idx) => (
                    <p key={idx} className="text-base leading-relaxed mb-3">{p}</p>
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

            {canonicalGenreSlug === 'reggaeton' && (() => {
              const rp = REGGAETON_35_PACKS[loc] || REGGAETON_35_PACKS.en;
              const clubsDir = getLocalizedDir35('clubs', loc);
              const guidesDir = getLocalizedDir35('guides', loc);
              const g118Slug = getExistingGuideSlug35('g-118', loc);
              return (
                <section className="mb-10 rounded-2xl border border-champagne/25 bg-white/[0.03] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-champagne mb-1.5">
                    {rp.boxEyebrow}
                  </p>
                  <h2 className="font-serif text-2xl text-white mb-2">{rp.boxTitle}</h2>
                  <p className="text-sm text-white/70 mb-5">{rp.boxLead}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    {REGGAETON_PARTNER_VENUES.map((v) => {
                      const vPhoto = getVenueCardPhoto4x5({ id: v.clubSlug, slugs: { en: v.clubSlug } });
                      return (
                        <div key={v.name} className="rounded-xl border border-white/10 bg-black/40 overflow-hidden flex flex-col justify-between">
                          <div>
                            <div data-no-lightbox="true" className="relative aspect-[4/5] w-full overflow-hidden bg-[#050505] border-b border-white/10">
                              <Image
                                src={vPhoto}
                                alt={v.name}
                                width={1080}
                                height={1350}
                                sizes="(max-width: 768px) 100vw, 380px"
                                quality={92}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-serif text-base font-semibold text-white">{v.name}</h3>
                              <p className="text-xs text-white/55">{v.district}</p>
                              <p className="text-xs text-champagne font-mono mt-1">{v.nightTag}</p>
                            </div>
                          </div>
                          <div className="px-4 pb-4 flex flex-wrap gap-2 pt-2 border-t border-white/10">
                            {v.clubSlug && (
                              <Link
                                href={`${lp}/${clubsDir}/${getLocalizedVenueSlug35(v.clubSlug, loc)}`}
                                locale={loc}
                                className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-white/20 text-white/85 hover:border-champagne hover:text-champagne transition-colors"
                              >
                                {rp.clubCta} →
                              </Link>
                            )}
                            {v.eventSlug && (
                              <Link
                                href={capodannoEventPath(v.eventSlug, loc)}
                                locale={loc}
                                className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-champagne/40 text-champagne hover:bg-champagne hover:text-black transition-colors"
                              >
                                {rp.nyeCta} →
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Link
                    href={`${lp}/${guidesDir}/${g118Slug}`}
                    locale={loc}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-champagne hover:underline"
                  >
                    {rp.guideCta} →
                  </Link>
                </section>
              );
            })()}
          </div>

          {/* The Sound Of Box */}
          <div className="w-full lg:w-80 bg-white/[0.03] border border-white/10 rounded-2xl p-6 sticky top-32">
            <h3 className="font-serif text-xl text-white mb-4 border-b border-white/10 pb-4 flex items-center gap-2">
              <Music className="w-5 h-5 text-champagne" />
              {gLoc.name}
            </h3>
            <p className="text-white/65 leading-relaxed italic mb-6 text-sm">
              {gLoc.subtitle}
            </p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                {
                  src: genreInlineImgs[0],
                  alt: `${gLoc.name} club Milan dancefloor crowd`,
                },
                {
                  src: genreInlineImgs[1],
                  alt: `${gLoc.name} night Milan club atmosphere`,
                },
                {
                  src: genreInlineImgs[2],
                  alt: `VIP bottle service ${gLoc.name} club Milan`,
                },
                {
                  src: genreInlineImgs[3],
                  alt: `${gLoc.name} event Milan luxury nightclub`,
                },
              ].map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/5] w-full rounded-lg overflow-hidden border border-white/10"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    quality={92}
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 512px"
                  />
                </div>
              ))}
            </div>
            <a
              href={getConciergeBookingUrl(loc, gLoc.name, currentGenreUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-champagne text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{gLoc.ui.bookVipCta}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Filtering Logic: DiscoveryGrid */}
      <div className="border-t border-white/5 bg-white/[0.03] pt-8">
        {items.length > 0 ? (
          <DiscoveryGrid
            items={slimDiscoveryItemsForClient(items, loc, 24)}
            lang={loc}
            title={`${gLoc.ui.upcomingEvents} (${gLoc.name})`}
            subtitle={gLoc.lead}
          />
        ) : (
          <section className="max-w-3xl mx-auto px-4 py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
              <Calendar className="w-8 h-8 text-champagne" />
            </div>
            <h2 className="font-serif text-3xl text-white mb-4">
              {gLoc.ui.bookVipCta}
            </h2>
            <p className="text-white/50 mb-8 text-base">
              {gLoc.ui.directDeskLabel}
            </p>
            <Link
              href={`${lp}/events`}
              className="px-8 py-3 rounded-full bg-champagne text-black font-medium tracking-wider uppercase text-sm"
            >
              {gLoc.ui.upcomingEvents}
            </Link>
          </section>
        )}
      </div>

      {/* Interactive VIP Quote Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <VipQuoteCalculator locale={loc} />
      </section>

      {/* Genre FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="font-serif text-3xl text-champagne mb-6">
          {gLoc.ui.faqTitle} ({gLoc.name})
        </h2>
        <div className="space-y-4">
          {gLoc.faqs.map((f, i) => (
            <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <h3 className="font-serif text-lg text-white mb-2">{f.question}</h3>
              <p className="text-sm text-white/65 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-Linking SEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center border-t border-white/10">
        <Link
          href={`${lp}/genres`}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-champagne hover:text-black hover:border-champagne transition-all duration-300 font-bold tracking-widest uppercase text-sm gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {gLoc.ui.otherGenres}
        </Link>
      </section>

      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString(
              generateEventListSchema(items, loc, gLoc.h1)
            ),
          }}
        />
      )}
            <EditorialPageSections locale={loc} path={`${lp}/genres/${slug}`} />
      </main>
  );
}
