import { notFound } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix, indexedLocaleCodes } from '@/lib/i18n/locales';
import { resolveGenreSlug, getLocalizedGenreSlug35 } from '@/lib/i18n/localizedSlugs35';
import { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import { MusicGenre } from '@/lib/types';
import DiscoveryGrid from '@/components/DiscoveryGrid';
import { Music, ArrowLeft, Calendar, MessageCircle } from 'lucide-react';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { generateEventListSchema, jsonLdString } from '@/lib/seo';
import { getAllCalendarEvents } from '@/lib/calendarEvents';
import { getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';
import { VipQuoteCalculator } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';

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
      en: 'As the undisputed capital of the Italian recording industry, Milan’s Hip Hop, R&B, Trap, and Afrobeats nights attract international athletes, recording artists, and fashion creatives. Pineta Milano (Milan8Mile), Aria Club, Play Club, 11 Clubroom, and Hollywood Rythmoteque deliver heavy 808s, live showcases, and electric bottle service energy.',
      it: 'Capitale indiscussa della discografia italiana, Milano offre serate Hip Hop, R&B, Trap e Afrobeats frequentate da calciatori di Serie A, rapper, producer e modelli internazionali. Pineta Milano (Milan8Mile), Aria Club, Play Club, 11 Clubroom e Hollywood Rythmoteque garantiscono 808 potenti, showcase dal vivo e bottle service spettacolare.',
    },
    soundOf: {
      en: 'Heavy 808s, US & Italian Rap, Afrobeats, luxury streetwear, and sparkler bottle parades.',
      it: '808 potenti, Rap USA & Italiano, Afrobeats, luxury streetwear e bottle parade scintillanti.',
    },
    topClubs: ['Pineta Milano', 'Aria Club', 'Play Club', '11 Clubroom', 'Hollywood Rythmoteque'],
    metaTitle: {
      en: 'Best Hip Hop, R&B & Afrobeats Clubs in Milan | 2026/2027 Guide',
      it: 'I Migliori Club Hip Hop, Trap e Afrobeats a Milano | Guida 2026/2027',
    },
    metaDescription: {
      en: 'Find the top hip hop, R&B, and Afrobeats clubs in Milan. VIP tables, urban vibes, and the best DJs at Pineta, Aria, Play Club, and 11 Clubroom.',
      it: 'Trova i migliori club hip hop, R&B e afrobeats a Milano. Tavoli VIP, vibrazioni urban e i migliori DJ da Pineta, Aria, Play Club e 11 Clubroom.',
    },
  },
  reggaeton: {
    id: MusicGenre.REGGAETON,
    name: 'Reggaeton & Latin',
    heroTitle: {
      en: 'Reggaeton: Caliente Nights & Latin Urban Clubbing',
      it: 'Reggaeton & Latin Urban: Le Notti Più Calienti di Milano',
    },
    editorial: {
      en: 'When Milan wants pure, uninhibited dancefloor heat, Reggaeton and Latin Urban take over. Led by Pineta Milano’s legendary Noche de Perreo on Fridays and Saturdays, alongside Tocqueville 13, Play Club, and Alcatraz’s Latin arena, these nights feature dembow beats, confetti showers, choreography dancers, and sold-out VIP tables.',
      it: 'Quando Milano vuole ballare senza freni fino all’alba, il Reggaeton e il Latin Urban dominano la scena. Guidate dalla leggendaria Noche de Perreo del Pineta Milano (venerdì e sabato), insieme a Tocqueville 13, Play Club e alla pista latina dell’Alcatraz, queste serate uniscono ritmi dembow, animazione, coriandoli e tavoli VIP sempre sold-out.',
    },
    soundOf: {
      en: 'Dembow rhythms, Bad Bunny & Karol G anthems, vibrant choreography, and electric dancefloors.',
      it: 'Ritmi dembow, hit di Bad Bunny, Feid e Karol G, animazione coreografica e piste incandescenti.',
    },
    topClubs: ['Pineta Milano', 'Tocqueville 13', 'Play Club', 'Alcatraz Milano', 'Hollywood Rythmoteque'],
    metaTitle: {
      en: 'Top Reggaeton & Latin Clubs in Milan | 2026/2027 Guide',
      it: 'I Migliori Club Reggaeton e Latini a Milano | Guida 2026/2027',
    },
    metaDescription: {
      en: "Dance the night away at Milan's best reggaeton and Latin urban clubs: Pineta Noche de Perreo, Tocqueville 13, Play Club, and Alcatraz.",
      it: 'Balla tutta la notte nei migliori club reggaeton e latin urban di Milano: Pineta Noche de Perreo, Tocqueville 13, Play Club e Alcatraz.',
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
    name: 'Dinner Show & Royal Aperitivo',
    heroTitle: {
      en: 'Dinner Show & Royal Aperitivo: From Fine Dining to Dancefloor',
      it: 'Dinner Show & Royal Aperitivo: Dalla Cena Spettacolo alla Pista',
    },
    editorial: {
      en: 'Milan’s most coveted formula combines gourmet dining or a monumental Royal Aperitivo with live vocalists, saxophonists, aerial performers, and a seamless midnight transition into a high-energy nightclub — without ever leaving your reserved table. Experience it at 55 Milano (1,600 sqm historic depot), Just Me under Torre Branca, Pineta’s Singing Aperitivo, Voya Rooftop on the 20th floor, Gattopardo, and Church 81.',
      it: 'La formula più amata a Milano unisce la Cena Spettacolo servita o il Royal Aperitivo monumentale a vocalist dal vivo, sassofonisti, performer acrobatici e trasformazione a mezzanotte in vera discoteca — mantenendo il proprio tavolo riservato tutta la notte. Provala da 55 Milano (ex deposito di 1.600 mq), Just Me sotto Torre Branca, Pineta (Aperitivo Cantato), Voya Rooftop al 20° piano, Il Gattopardo e Church 81.',
    },
    soundOf: {
      en: 'Live sax & vocalists during dinner, sing-along anthems at dessert, and full club DJ sets from midnight.',
      it: 'Sax e vocalist dal vivo durante la cena, cori al momento del dessert e DJ set club da mezzanotte alle 05:00.',
    },
    topClubs: ['55 Milano', 'Just Me Milano', 'Pineta Milano', 'Voya Rooftop', 'Il Gattopardo', 'Church 81'],
    metaTitle: {
      en: 'Best Dinner Shows & Singing Aperitivo in Milan | 2026/2027 Guide',
      it: 'Migliori Cene Spettacolo, Dinner Show e Aperitivo Cantato a Milano | 2026/2027',
    },
    metaDescription: {
      en: 'Book the best Dinner Shows and Royal Singing Aperitivos in Milan: 55 Milano, Just Me, Pineta, Voya Rooftop, Gattopardo, and Church 81.',
      it: 'Prenota le migliori Cene Spettacolo, Dinner Show e Aperitivi Cantati a Milano: 55 Milano, Just Me, Pineta, Voya Rooftop, Gattopardo e Church 81.',
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
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';

  const canonicalGenreSlug = resolveGenreSlug(slug);
  const genre = genreData[canonicalGenreSlug] || genreData[slug];

  if (!genre) return notFound();

  const title = seoTitle(genre.metaTitle[typedLocale]);
  const description = withWhatsApp(genre.metaDescription[typedLocale], locale);

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const localizedGenreSlug = getLocalizedGenreSlug35(canonicalGenreSlug, (locale as LocaleCode) || 'en');
  const canonical = `${baseUrl}${localePrefix(locale)}/genres/${localizedGenreSlug}`;
  const genreLangAlternates: Record<string, string> = {
    'x-default': `${baseUrl}/genres/${getLocalizedGenreSlug35(canonicalGenreSlug, 'en')}`,
  };
  for (const loc of indexedLocaleCodes) {
    genreLangAlternates[loc] = `${baseUrl}${localePrefix(loc)}/genres/${getLocalizedGenreSlug35(canonicalGenreSlug, loc)}`;
  }

  const isIt = locale === 'it';
  const ogImage = `${baseUrl}${GENRE_HERO_MAP[canonicalGenreSlug] || GENRE_HERO_MAP[slug] || '/images/pillars/genre-hero-01.webp'}`;

  return {
    title,
    description,
    robots: seoRobots(locale),
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
      locale: isIt ? 'it_IT' : 'en_US',
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
  const typedLocale = (locale === 'it' ? 'it' : 'en') as 'en' | 'it';
  const isIt = typedLocale === 'it';
  const lp = localePrefix(locale);
  const canonicalGenreSlug = resolveGenreSlug(slug);
  const genreHeroImg = GENRE_HERO_MAP[canonicalGenreSlug] || GENRE_HERO_MAP[slug] || '/images/pillars/genre-hero-01.webp';
  const genreInlineImgs = GENRE_INLINE_MAP[canonicalGenreSlug] || GENRE_INLINE_MAP[slug] || GENRE_INLINE_MAP.techno;

  const genre = genreData[canonicalGenreSlug] || genreData[slug];

  if (!genre) return notFound();

  const items = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale).filter(
    ({ event }) => event.genre.includes(genre.id)
  );

  const genreFaqs = [
    {
      q: isIt
        ? `Quali sono i migliori club per ballare ${genre.name} a Milano?`
        : `What are the best clubs for ${genre.name} in Milan?`,
      a: isIt
        ? `I locali di riferimento per ${genre.name} a Milano sono: ${genre.topClubs.join(', ')}. Contatta il Concierge su WhatsApp al +39 351 912 7047 per Tavoli VIP e Liste.`
        : `The top venues for ${genre.name} in Milan are: ${genre.topClubs.join(', ')}. Contact our WhatsApp Concierge at +39 351 912 7047 for VIP Tables and Guest Lists.`,
    },
    {
      q: isIt
        ? `Quanto costa un Tavolo VIP per una serata ${genre.name} a Milano?`
        : `How much does a VIP Table cost for a ${genre.name} night in Milan?`,
      a: isIt
        ? `I tavoli partono da €150–€250 per Royal Aperitivo / Pista fino a €500–€1.500 per i Privé Console e Backstage nei club di punta, 100% spendibili in bottiglie.`
        : `VIP tables start from €150–€250 for Royal Aperitivo / Dancefloor tables up to €500–€1,500 for Console and Backstage Privé tables, 100% spendable in bottles.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: genreFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <main className="flex-grow pt-24 pb-20 bg-[#131009]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="text-sm text-white/40" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href={lp || '/'} className="hover:text-champagne transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <Link href={`${lp}/genres`} className="hover:text-champagne transition-colors">
                {tr(locale, 'Music Genres', 'Generi Musicali')}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-champagne" aria-current="page">
              {genre.name}
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero Genre */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1">
            <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden border border-champagne/25 mb-8">
              <Image
                src={genreHeroImg}
                alt={genre.heroTitle[typedLocale]}
                title={genre.heroTitle[typedLocale]}
                fill
                priority
                quality={92}
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-champagne tracking-tighter mb-6">
              {genre.heroTitle[typedLocale]}
            </h1>

            {/* Top Clubs Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {genre.topClubs.map((club) => (
                <span
                  key={club}
                  className="px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/[0.06] text-champagne text-xs font-mono tracking-wide"
                >
                  ★ {club}
                </span>
              ))}
            </div>

            {/* AI Trafiletto */}
            <div className="mb-8 p-6 rounded-2xl border border-champagne/25 bg-champagne/[0.04]">
              <p className="font-mono text-champagne text-[10px] tracking-[0.3em] uppercase mb-3">
                {isIt ? 'Risposta Rapida · Sintesi Genere' : 'Quick Answer · Genre Summary'}
              </p>
              <p className="font-sans text-white/75 text-sm leading-relaxed">
                {isIt
                  ? `I migliori locali per ${genre.name} a Milano nel 2026/2027 sono: ${genre.topClubs.join(', ')}. ${items.length} serate in calendario. Prenotazione Tavoli VIP e Liste con risposta in 10 minuti via WhatsApp +39 351 912 7047.`
                  : `The best venues for ${genre.name} in Milan for 2026/2027 are: ${genre.topClubs.join(', ')}. ${items.length} scheduled nights. Direct VIP Table and Guestlist booking in under 10 minutes via WhatsApp +39 351 912 7047.`}
              </p>
            </div>

            {/* H2: About this genre */}
            <h2 className="font-serif text-2xl md:text-3xl text-white mb-4">
              {isIt
                ? `${genre.name} a Milano: Guida ai Locali e all'Atmosfera`
                : `${genre.name} in Milan: Venue & Atmosphere Guide`}
            </h2>
            <div className="text-white/75 leading-relaxed mb-10 text-base md:text-lg">
              <p>{genre.editorial[typedLocale]}</p>
            </div>
          </div>

          {/* The Sound Of Box */}
          <div className="w-full lg:w-80 bg-white/[0.03] border border-white/10 rounded-2xl p-6 sticky top-32">
            <h3 className="font-serif text-xl text-white mb-4 border-b border-white/10 pb-4 flex items-center gap-2">
              <Music className="w-5 h-5 text-champagne" />
              {isIt ? `Identità Sonora: ${genre.name}` : `Sonic Identity: ${genre.name}`}
            </h3>
            <p className="text-white/65 leading-relaxed italic mb-6 text-sm">
              &ldquo;{genre.soundOf[typedLocale]}&rdquo;
            </p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {[
                {
                  src: genreInlineImgs[0],
                  alt: `${genre.name} club Milan dancefloor crowd`,
                },
                {
                  src: genreInlineImgs[1],
                  alt: `${genre.name} night Milan club atmosphere`,
                },
                {
                  src: genreInlineImgs[2],
                  alt: `VIP bottle service ${genre.name} club Milan`,
                },
                {
                  src: genreInlineImgs[3],
                  alt: `${genre.name} event Milan luxury nightclub`,
                },
              ].map((img, i) => (
                <div
                  key={i}
                  className="relative h-20 rounded-lg overflow-hidden border border-white/10"
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
              href={`https://wa.me/393519127047?text=${encodeURIComponent(
                isIt
                  ? `Ciao Nightlife Milan! Vorrei prenotare una serata ${genre.name} a Milano.`
                  : `Hi Nightlife Milan! I'd like to book a ${genre.name} night in Milan.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-champagne text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp +39 351 912 7047</span>
            </a>
          </div>
        </div>
      </section>

      {/* Filtering Logic: DiscoveryGrid */}
      <div className="border-t border-white/5 bg-white/[0.03] pt-8">
        {items.length > 0 ? (
          <DiscoveryGrid
            items={items}
            lang={locale}
            title={typedLocale === 'it' ? `Eventi ${genre.name}` : `${genre.name} Events`}
            subtitle={tr(
              locale,
              `Upcoming nights and DJ sets for this sound`,
              `Le prossime serate e DJ set con questo sound`
            )}
          />
        ) : (
          <section className="max-w-3xl mx-auto px-4 py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-6">
              <Calendar className="w-8 h-8 text-champagne" />
            </div>
            <h2 className="font-serif text-3xl text-white mb-4">
              {isIt ? `Prenota la tua serata ${genre.name}` : `Book Your ${genre.name} Night`}
            </h2>
            <p className="text-white/50 mb-8 text-base">
              {tr(
                locale,
                'Message our WhatsApp concierge for the updated guest list and VIP table map.',
                'Contatta il nostro Concierge WhatsApp per la lista aggiornata e la mappa tavoli VIP.'
              )}
            </p>
            <Link
              href={`${lp}/events`}
              className="px-8 py-3 rounded-full bg-champagne text-black font-medium tracking-wider uppercase text-sm"
            >
              {tr(locale, 'See Full Events Calendar', 'Vedi Calendario Eventi Completo')}
            </Link>
          </section>
        )}
      </div>

      {/* Interactive VIP Quote Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <VipQuoteCalculator locale={locale} />
      </section>

      {/* Cross-Linking SEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center border-t border-white/10">
        <Link
          href={`${lp}/genres`}
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-champagne hover:text-black hover:border-champagne transition-all duration-300 font-bold tracking-widest uppercase text-sm gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {tr(locale, 'Explore All 10 Music Genres & Formats', 'Esplora Tutti i 10 Generi Musicali')}
        </Link>
      </section>

      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdString(
              generateEventListSchema(items, locale, genre.heroTitle[typedLocale])
            ),
          }}
        />
      )}
            <EditorialPageSections locale={locale as LocaleCode} path={`${lp}/genres/${slug}`} />
      </main>
  );
}
