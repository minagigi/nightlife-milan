import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix, getLocaleDef, indexedLocaleCodes, canonicalPageUrl } from '@/lib/i18n/locales';
import { getExistingGuideSlug35, getLocalizedVenueSlug35, getLocalizedZoneSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedGuideSlug35 } from '@/lib/guides100Catalog';
import { seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { buildClubHighCtrDescription, buildClubHighCtrTitle, getClubNyeBannerCopy35 } from '@/lib/clubSeoMeta35';
import { getCapodannoEventForClub } from '@/lib/capodannoEvents';
import { capodannoEventPath } from '@/lib/capodanno/routes';
import { getCapodannoLocalizedEventContent, getCapodannoLocalizedEventTitle } from '@/lib/capodanno/i18n';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { MapPin, Clock, Shirt, MessageCircle, Star, Calendar, ArrowLeft, Music, Wine, Utensils, ShieldCheck, Check, CreditCard, Sparkles, Train, Users, HelpCircle } from 'lucide-react';
import { getDictionary } from '../../../../dictionaries/get-dictionary';
import { CONTACT } from '@/config/contact';
import { getVenueBySlug, mockVenues, mockZones, mockGuides } from '@/lib/data';
import { VenueCategory } from '@/lib/types';
import { generateClubSchema, generateEventListSchema, getLocalizedText, jsonLdString } from '@/lib/seo';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import { getEventDiscoveryItems } from '@/lib/eventDiscovery';
import { VipQuoteCalculator, EntryFormulaMatrix, SanSiroMatchAfterpartyFinder } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
import TasteMotionLayer from '@/components/TasteMotionLayer';
import VenueEventsAutoCarousel from '@/components/VenueEventsAutoCarousel';
import EventVenueMap from '@/components/EventVenueMap';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';
import {
  getVenueAuthoritySpec,
  buildCityQualifiedVenueH1,
  buildVenueAuthorityFaqs,
  getRelatedNearbyVenues,
} from '@/lib/venueAuthority33';
import {
  getVenueUi35,
  getVenueTargetProfile,
  getVenueCelebrations,
  getVenueServices10,
  resolveVenueEventsForCarousel,
  getEnhancedVenueGallery,
} from '@/lib/venueDossiers35';
import type { LocaleCode } from '@/lib/i18n/locales';

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Generate Static Params for SEO Crawling
export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  
  mockVenues.forEach((venue) => {
    paths.push({ locale: 'en', slug: venue.slugs.en });
    paths.push({ 
      locale: 'it', 
      slug: venue.slugs.it || venue.slugs.en 
    });
  });

  return paths;
}

const venueTitles: Record<string, { en: string; it: string }> = {
  'v-justme': {
    en: 'Just Me Milan (ex Just Cavalli) | Open 7/7 VIP Tables, Dress Code & Prices 2026/2027',
    it: 'Just Me Milano (ex Just Cavalli) | Aperto 7/7 Tavoli VIP, Dress Code & Prezzi 2026/2027',
  },
  'v-voya': {
    en: 'Voya Rooftop Milan | 20th Floor Skyline Bar, Tables & Aperitivo 2026/2027 | Isola & Portello',
    it: 'Voya Rooftop Milano | Sky Lounge 20° Piano, Tavoli & Aperitivo 2026/2027 | Isola & Portello',
  },
  'v-pineta': {
    en: 'Pineta Club Milan | Aperitivo Cantato, Prices & VIP Table Booking 2026/2027',
    it: 'Pineta Club Milano | Aperitivo Cantato, Prezzi & Prenotazione Tavoli VIP 2026/2027',
  },
  'v-aria': {
    en: 'Aria Club Milan | 150m from San Siro Stadium, Aperitivo & VIP Tables 2026/2027',
    it: 'Aria Club Milano | A 150m da San Siro, Dopo-Partita, Aperitivo e Tavoli VIP 2026/2027',
  },
  'v-playclub': {
    en: 'Play Club Milan | Hip Hop, Afrobeats & VIP Tables 2026/2027 | Corso Como',
    it: 'Play Club Milano | Hip Hop, Afrobeats & Tavoli VIP 2026/2027 | Corso Como',
  },
  'v-55milano': {
    en: '55 Milano | Singing Dinner, XXL Apericena & Table Booking 2026/2027 | Sempione',
    it: '55 Milano | Cena Cantata, Apericena XL & Prenotazione Tavoli 2026/2027 | Sempione',
  },
  'v-repvblic': {
    en: 'Repvblic Milan | Dirty Monday, House & Hip-Hop Nights 2026/2027',
    it: 'Repvblic Milano | Dirty Monday, House & Serate Hip-Hop 2026/2027',
  },
  'v-11clubroom': {
    en: '11 Clubroom Milan | VIP Table Booking & Urban Nights 2026/2027 | Corso Como',
    it: '11 Clubroom Milano | Prenotazione Tavoli VIP & Serate Urban 2026/2027 | Corso Como',
  },
  'v-church81': {
    en: 'Church 81 Milan | Bottle Prices, Dress Code & Guestlist 2026/2027 | Navigli',
    it: 'Church 81 Milano | Prezzi Bottiglie, Dress Code & Lista 2026/2027 | Navigli',
  },
  'v-mibmilano': {
    en: 'MIB Milan | Dinner Show, VIP Tables & Booking 2026/2027 | Piazza Affari',
    it: 'MIB Milano | Dinner Show, Tavoli VIP & Prenotazioni 2026/2027 | Piazza Affari',
  },
  'v-dazi': {
    en: 'Dazi Milan | Arco della Pace Dinner Show, Mixology & VIP Tables 2026/2027 | Sempione',
    it: 'Dazi Milano | Dinner Show Arco della Pace, Mixology & Tavoli VIP 2026/2027 | Sempione',
  },
  'v-gattopardo': {
    en: 'Gattopardo Milan | Deconsecrated Church Club, Table Prices & Nights 2026/2027',
    it: 'Gattopardo Milano | Club in Ex Chiesa, Prezzi Tavoli & Serate 2026/2027',
  },
  'v-terrazza21': {
    en: 'Terrazza Duomo 21 Milan | Duomo View Aperitivo & Rooftop Reservations 2026/2027',
    it: 'Terrazza Duomo 21 Milano | Aperitivo Vista Duomo & Prenotazioni Rooftop 2026/2027',
  },
  'v-magazzini': {
    en: 'Magazzini Generali Milan | Techno, Live Music & VIP Balcony 2026/2027 | Porta Romana',
    it: 'Magazzini Generali Milano | Techno, Musica Live & Balconata VIP 2026/2027 | Porta Romana',
  },
  'v-armani-prive': {
    en: 'Armani Privé Milan | Exclusive Luxury Club, Prices & Tables 2026/2027 | Fashion District',
    it: 'Armani Privé Milano | Club Esclusivo, Prezzi Tavoli & Selezione 2026/2027 | Quadrilatero',
  },
  'v-volt': {
    en: 'Volt Club Milan | Melodic Techno, Electronic Music & Tables 2026/2027 | Porta Venezia',
    it: 'Volt Club Milano | Melodic Techno, Musica Elettronica & Tavoli 2026/2027 | Porta Venezia',
  },
  'v-hollywood': {
    en: 'Hollywood Rythmoteque Milan | VIP Tables, Guestlist & Prices 2026/2027 | Corso Como',
    it: 'Hollywood Rythmoteque Milano | Tavoli VIP, Lista & Prezzi 2026/2027 | Corso Como',
  },
  'v-apollo': {
    en: 'Apollo Club Milan | Electronic Music, Cocktails & Events 2026/2027 | Navigli',
    it: 'Apollo Club Milano | Musica Elettronica, Cocktail & Serate 2026/2027 | Navigli',
  },
  'v-ceresio-7': {
    en: 'Ceresio 7 Milan | Twin Pool Rooftop Bar, Aperitivo & Booking 2026/2027',
    it: 'Ceresio 7 Milano | Rooftop Bar Piscine Gemelle, Aperitivo & Prenotazioni 2026/2027',
  },
  'v-theclub': {
    en: 'The Club Milan | International & Urban Nights, VIP Tables & Guestlist 2026/2027 | Brera',
    it: 'The Club Milano | Serate Internazionali & Urban, Tavoli VIP & Lista 2026/2027 | Brera',
  },
  'v-tocqueville': {
    en: 'Tocqueville 13 Milan | Corso Como Dinner Show, Reggaeton & VIP Tables 2026/2027',
    it: 'Tocqueville 13 Milano | Dinner Show Corso Como, Reggaeton & Tavoli VIP 2026/2027',
  },
  'v-alcatraz': {
    en: 'Alcatraz Milan | 3-Room Mega Club, Live Concerts & VIP Balcony Tables 2026/2027',
    it: 'Alcatraz Milano | Mega Club a 3 Piste, Concerti Live & Tavoli Balconata VIP 2026/2027',
  },
  'v-fabrique': {
    en: 'Fabrique Milan | International Electronic Festivals, Live Arena & VIP Ring 2026/2027',
    it: 'Fabrique Milano | Festival Elettronici Internazionali, Arena Live & Ring VIP 2026/2027',
  },
  'v-amnesia': {
    en: 'Amnesia Milan | Tech-House & Techno Temple, Console Privé & Tickets 2026/2027',
    it: 'Amnesia Milano | Tempio Tech-House & Techno, Privé Console & Biglietti 2026/2027',
  },
  'v-philipps': {
    en: "Philipp's Milan (Philipp Plein Hotel) | Dinner Show, Luxury Club & VIP Tables 2026/2027",
    it: "Philipp's Milano (Philipp Plein) | Dinner Show, Luxury Club & Tavoli VIP 2026/2027",
  },
};

const venueKeywords: Record<string, { en: string[]; it: string[] }> = {
  'v-justme': {
    en: ['just me milan', 'ex just cavalli milan', 'just cavalli milano dress code', 'just me open 7 nights a week', 'just me vip table prices', 'Italo Rota club milan', 'just me dress code', 'torre branca nightclub milan'],
    it: ['just me milano', 'ex just cavalli milano', 'just cavalli milano dress code', 'just me aperto 7 su 7', 'prezzi tavoli just me', 'discoteca Italo Rota milano', 'just me dress code', 'club torre branca milano'],
  },
  'v-voya': {
    en: ['voya rooftop milan', 'milan rooftop bar 2026', 'voya rooftop 20th floor', 'skyline bar milan', 'voya rooftop aperitivo', 'milan rooftop vip table reservation'],
    it: ['voya rooftop milano', 'bar terrazza milano 2026', 'voya rooftop 20 piano', 'bar vista skyline milano', 'aperitivo voya rooftop', 'prenotazione tavolo rooftop milano'],
  },
  'v-pineta': {
    en: ['pineta club milan', 'pineta aperitivo cantato', 'pineta singing aperitivo milan', 'pineta table booking', 'pineta milan prices 2026', 'noche de perreo pineta milan'],
    it: ['pineta club milano', 'aperitivo cantato pineta', 'pineta cena cantata milano', 'prenotazione tavolo pineta', 'pineta prezzi 2026', 'noche de perreo pineta milano'],
  },
  'v-aria': {
    en: ['aria club milan', 'aria club 150m san siro', 'san siro football afterparty club', 'aria milan aperitivo', 'aria club vip tables', 'inter ac milan post match club', 'san siro concert afterparty'],
    it: ['aria club milano', 'aria club 150 metri san siro', 'discoteca dopo partita san siro', 'aperitivo aria milano', 'tavoli vip aria club', 'terzo tempo inter milan san siro', 'dopo concerto san siro discoteca'],
  },
  'v-playclub': {
    en: ['play club milan', 'play club hip hop milan', 'play club afrobeats', 'play club corso como', 'milan hip hop club 2026', 'vip tables viale monte grappa milan'],
    it: ['play club milano', 'play club hip hop milano', 'play club afrobeats', 'play club corso como', 'discoteca hip hop milano 2026', 'tavoli vip viale monte grappa'],
  },
  'v-55milano': {
    en: ['55 milano', '55 milano apericena', '55 milano singing dinner', '55 milano vip table booking', 'cena cantata sempione milan', 'graduation party 55 milano'],
    it: ['55 milano', 'apericena 55 milano', 'cena cantata 55 milano', 'prenotazione tavolo 55 milano', 'cena cantata sempione', 'festa di laurea 55 milano'],
  },
  'v-repvblic': {
    en: ['repvblic milan', 'repvblic dirty monday', 'repvblic house music milan', 'piazza della repubblica club milan', 'repvblic vip tables', 'house music club milan'],
    it: ['repvblic milano', 'repvblic dirty monday', 'repvblic musica house milano', 'discoteca piazza della repubblica milano', 'repvblic tavoli vip', 'discoteca house milano'],
  },
  'v-11clubroom': {
    en: ['11 clubroom milan', '11 clubroom vip table', '11 clubroom urban nights', 'corso como vip club milan', '11 clubroom prices 2026', 'via de tocqueville 11 milan'],
    it: ['11 clubroom milano', '11 clubroom tavoli vip', '11 clubroom serate urban', 'club vip corso como milano', '11 clubroom prezzi 2026', 'via de tocqueville 11 milano'],
  },
  'v-church81': {
    en: ['church 81 milan', 'church 81 navigli', 'church 81 dinner show', 'navigli nightclub milan 2026', 'church 81 dress code', 'deconsecrated church club milan'],
    it: ['church 81 milano', 'church 81 navigli', 'cena spettacolo church 81', 'discoteca navigli milano 2026', 'church 81 dress code', 'discoteca chiesa sconsacrata milano'],
  },
  'v-mibmilano': {
    en: ['mib milan', 'mib milano dinner show', 'mib milan vip table', 'piazza affari nightclub milan', 'mib milan prices 2026', 'dinner show duomo milan'],
    it: ['mib milano', 'mib dinner show', 'tavolo vip mib milano', 'discoteca piazza affari milano', 'prezzi mib 2026', 'cena spettacolo centro milano'],
  },
  'v-dazi': {
    en: ['dazi milan', 'dazi milano arco della pace', 'dazi milan dinner show', 'piazza sempione 1 cocktail bar', 'dazi milano vip tables', 'caselli daziari milan club'],
    it: ['dazi milano', 'dazi arco della pace', 'cena spettacolo dazi milano', 'cocktail bar piazza sempione 1', 'tavoli vip dazi milano', 'caselli daziari milano locale'],
  },
  'v-gattopardo': {
    en: ['gattopardo milan', 'gattopardo club church milan', 'gattopardo table prices', 'gattopardo piero della francesca', 'ex church nightclub milan', 'gattopardo dress code'],
    it: ['gattopardo milano', 'gattopardo club chiesa milano', 'prezzi tavoli gattopardo', 'gattopardo piero della francesca', 'discoteca ex chiesa milano', 'gattopardo dress code'],
  },
  'v-terrazza21': {
    en: ['terrazza duomo 21 milan', 'terrazza 21 duomo view', 'terrazza 21 aperitivo milan', 'rooftop bar duomo milan 2026', 'terrazza 21 booking', 'milan cathedral rooftop bar'],
    it: ['terrazza duomo 21 milano', 'terrazza 21 vista duomo', 'aperitivo terrazza 21 milano', 'rooftop bar duomo milano 2026', 'prenotazione terrazza 21', 'locale vista guglie duomo milano'],
  },
  'v-magazzini': {
    en: ['magazzini generali milan', 'magazzini generali techno', 'magazzini generali live music', 'via pietrasanta 16 club milan', 'magazzini generali vip balcony', 'techno warehouse milan'],
    it: ['magazzini generali milano', 'magazzini generali techno', 'magazzini generali musica live', 'via pietrasanta 16 milano', 'balconata vip magazzini generali', 'discoteca techno milano'],
  },
  'v-armani-prive': {
    en: ['armani prive milan', 'armani hotel club milan', 'via pisoni 1 nightclub', 'brera luxury club milan 2026', 'armani prive table prices', 'fashion week club milan'],
    it: ['armani prive milano', 'club armani hotel milano', 'via pisoni 1 discoteca', 'club lusso quadrilatero milano 2026', 'prezzi tavoli armani prive', 'club fashion week milano'],
  },
  'v-volt': {
    en: ['volt club milan', 'volt techno milan', 'volt porta venezia', 'milan melodic techno club 2026', 'volt club vip backstage table', 'electronic music club milan'],
    it: ['volt club milano', 'volt techno milano', 'volt porta venezia', 'melodic techno milano 2026', 'tavolo backstage volt club', 'discoteca musica elettronica milano'],
  },
  'v-hollywood': {
    en: ['hollywood milan', 'hollywood corso como 15', 'hollywood club prices 2026', 'corso como nightlife milan', 'hollywood vip table', 'model club corso como'],
    it: ['hollywood milano', 'hollywood corso como 15', 'prezzi hollywood club 2026', 'vita notturna corso como', 'tavolo vip hollywood milano', 'discoteca modelle corso como'],
  },
  'v-apollo': {
    en: ['apollo club milan', 'apollo navigli electronic', 'apollo milan cocktail bar', 'via giosue borsi 9 milan', 'apollo milan dj events', 'indie house club navigli'],
    it: ['apollo club milano', 'apollo navigli elettronica', 'cocktail bar apollo milano', 'via giosue borsi 9 milano', 'eventi dj apollo milano', 'club indie house navigli'],
  },
  'v-ceresio-7': {
    en: ['ceresio 7 milan', 'ceresio 7 twin pools rooftop', 'ceresio 7 aperitivo booking', 'dsquared2 rooftop bar milan', 'ceresio 7 isola milan', 'rooftop pool bar milan'],
    it: ['ceresio 7 milano', 'ceresio 7 piscine gemelle', 'prenotazione aperitivo ceresio 7', 'rooftop dsquared2 milano', 'ceresio 7 isola milano', 'bar piscina rooftop milano'],
  },
  'v-theclub': {
    en: ['the club milan', 'the club brera corso garibaldi 97', 'the club milan commercial hip hop', 'brera nightclub milan 2026', 'the club vip table prices', 'international student club milan'],
    it: ['the club milano', 'the club brera corso garibaldi 97', 'serate commercial hip hop the club', 'discoteca brera milano 2026', 'prezzi tavoli the club', 'discoteca internazionale milano'],
  },
  'v-tocqueville': {
    en: ['tocqueville 13 milan', 'tocqueville corso como', 'tocqueville 13 dinner show', 'tocqueville milan vip table prices', 'via alessio di tocqueville 13 club', 'reggaeton urban club corso como'],
    it: ['tocqueville 13 milano', 'tocqueville corso como', 'dinner show tocqueville 13', 'prezzi tavoli tocqueville milano', 'via alessio di tocqueville 13 discoteca', 'discoteca reggaeton corso como'],
  },
  'v-alcatraz': {
    en: ['alcatraz milan', 'alcatraz via valtellina 25', 'alcatraz 3 dancefloors party', 'alcatraz milan concert afterparty', 'alcatraz vip balcony table', 'biggest nightclub milan'],
    it: ['alcatraz milano', 'alcatraz via valtellina 25', 'alcatraz serata 3 piste', 'dopo concerto alcatraz milano', 'tavolo balconata vip alcatraz', 'discoteca piu grande di milano'],
  },
  'v-fabrique': {
    en: ['fabrique milan', 'fabrique via fantoli 9', 'fabrique electronic festival milan', 'fabrique milan vip ring table', 'mecenate linate club milan', 'international dj warehouse milan'],
    it: ['fabrique milano', 'fabrique via fantoli 9', 'festival musica elettronica fabrique', 'tavoli ring vip fabrique milano', 'discoteca mecenate linate milano', 'warehouse concerti dj milano'],
  },
  'v-amnesia': {
    en: ['amnesia milan', 'amnesia club via gatto milan', 'amnesia milan tech house techno', 'amnesia backstage console prive', 'top techno dj club milan 2026', 'forlanini electronic club milan'],
    it: ['amnesia milano', 'amnesia via alfonso gatto milano', 'amnesia milano tech house techno', 'prive console backstage amnesia', 'migliore discoteca techno milano 2026', 'club elettronica forlanini milano'],
  },
  'v-philipps': {
    en: ["philipp's milan", 'philipp plein club milan', 'the plein hotel club milan', "the philipp's show dinner show", 'via daniele manin 21 nightclub', "philipp's milano vip tables", 'chef roberto conti dinner show'],
    it: ["philipp's milano", 'philipp plein locale milano', 'the plein hotel discoteca milano', "the philipp's show cena spettacolo", 'via daniele manin 21 milano', "tavoli vip philipp's milano", 'cena cantata philipp plein milano'],
  },
};

export interface ClubEditorialData {
  tagline: string;
  highlights: string[];
  musicStyle: string;
  crowdProfile: string;
  bestNights: string;
  nearestMetro: string;
  pricingTable: { zone: string; price: string; details: string }[];
  insiderTips: string[];
  faqs: { q: string; a: string }[];
}

const clubContent: Record<string, { en: ClubEditorialData; it: ClubEditorialData }> = {
  'v-justme': {
    en: {
      tagline: 'Priority #1 Flagship (ex Just Cavalli) | Open 7 Nights a Week Beneath Torre Branca in Parco Sempione',
      highlights: [
        'Formerly known as Just Cavalli Milan: same iconic Italo Rota crystal pavilion beneath the 108m Torre Branca',
        'Open 7 nights out of 7 (Monday to Sunday, 19:30 to 05:00 AM)',
        'Royal’Aperitivo with private panoramic elevator ticket to the top of Torre Branca',
        'Strict smart chic dress code: collared shirts & leather shoes/loafers (zero sportswear or ripped jeans)',
      ],
      musicStyle: 'Commercial Luxury House, Afro-House, Vocal House & International Hip-Hop/R&B Guest Sets',
      crowdProfile: '23-45 | Models, Serie A footballers, Fashion Week designers, international jet-set & corporate VIP hospitality',
      bestNights: 'Open 7/7: Tue/Wed Champions League & International Nights, Thu Fashion Night, Fri/Sat Gran Gala, Sun Sempione Aperitivo & Party',
      nearestMetro: 'M1 / M2 Cadorna FN (6 min walk) or M5 / Tram 1 & 10 Arco della Pace / Viale Camoens 2',
      pricingTable: [
        { zone: 'Royal’Aperitivo + Torre Branca Ascent (19:30-22:30)', price: '€25 - €35 / person', details: 'Includes gourmet buffet, 1 drink, reserved lounge seating & panoramic tower ticket' },
        { zone: 'Dancefloor VIP Table (Mon-Thu / Sun)', price: '€320 - €400 (6-8 guests)', details: '100% bottle credit, skip-the-line hostess escort & central dancefloor sofa' },
        { zone: 'Dancefloor VIP Table (Fri-Sat & Big Matches)', price: '€500 - €600 (6-8 guests)', details: 'Full bottle service credit in the main Italo Rota crystal pavilion' },
        { zone: 'Privé Branca Elevated VIP', price: '€800 - €1,200 (8-10 guests)', details: 'Roped-off luxury tier with dedicated security & premium magnum / Dom Pérignon service' },
        { zone: 'Super Privé DJ Console', price: '€1,500 - €5,000+ (10-15 guests)', details: 'Stage-level tables directly next to international guest DJs & celebrity performers' },
      ],
      insiderTips: [
        'Because Just Me is open 7 nights a week from Monday to Sunday, it is the undisputed #1 choice after Tuesday and Wednesday UEFA Champions League nights at San Siro (only 10 minutes away by taxi).',
        'Arrive between 19:30 and 21:00 for the Royal’Aperitivo to receive the complimentary ticket to ride the Torre Branca elevator 108 meters above the illuminated Milan skyline.',
        'Door selection is strictly sartorial: men must wear a collared shirt, dark blazer, and leather loafers or dress shoes (zero athletic sneakers or streetwear).',
      ],
      faqs: [
        {
          q: 'What is the dress code at Just Me Milan (ex Just Cavalli)?',
          a: 'Just Me Milan (ex Just Cavalli, Viale Luigi Camoens 2) enforces one of Milan’s strictest sartorial door policies: men must wear a collared shirt or fitted polo with dark blazer and leather shoes or smart clean sneakers; tracksuits, sportswear, shorts, hoodies, and athletic trainers are strictly refused.',
        },
        {
          q: 'Is Just Me Milano really open every night from Monday to Sunday?',
          a: 'Yes. Just Me Milano (ex Just Cavalli, Viale Luigi Camoens 2) operates 7 nights a week, 365 days a year, with Royal’Aperitivo from 19:30 and clubbing until 05:00 AM inside its heated winter glass dome or open-air summer garden.',
        },
        {
          q: 'How much is a VIP table at Just Me Milano in 2026/2027?',
          a: 'Midweek Dancefloor VIP tables start at €320-€400 for 6-8 guests; Friday and Saturday Dancefloor tables start at €500; Privé Branca tables range from €800 to €1,200; and Super Privé DJ Console tables start from €1,500 to €5,000+, 100% spendable in bottles.',
        },
        {
          q: 'Can we go to Just Me after a Champions League match or Derby at San Siro?',
          a: 'Absolutely. Just Me is a 10-minute taxi ride from San Siro and hosts players, Skybox guests, and visiting European supporters every Tuesday, Wednesday, and weekend match night. Note: football jerseys and scarves are forbidden at the door.',
        },
      ],
    },
    it: {
      tagline: 'Scelta Top N.1 a Milano (ex Just Cavalli) | Aperto 7 Notti su 7 Sotto la Torre Branca nel Parco Sempione',
      highlights: [
        'Storica sede dell’ex Just Cavalli Milano: iconico padiglione in cristallo firmato Italo Rota ai piedi della Torre Branca (108 m)',
        'Aperto 7 sere su 7 dal Lunedì alla Domenica (19:30 – 05:00 del mattino)',
        'Royal’Aperitivo con biglietto ascensore panoramico per salire in cima alla Torre Branca',
        'Dress code sartoriale rigoroso: camicia con colletto, blazer e scarpe eleganti per uomo (vietate tute, sneakers sportive e zaini)',
      ],
      musicStyle: 'Commercial Luxury House, Afro-House, Vocal House e Special Guest Internazionali Hip-Hop/R&B',
      crowdProfile: '23-45 anni | Modelle, calciatori di Serie A, stilisti della Fashion Week, jet-set internazionale e clientela VIP',
      bestNights: 'Aperto 7/7: Mar/Mer Champions League & International Night, Gio Fashion Night, Ven/Sab Gran Gala, Dom Royal’Aperitivo & Party',
      nearestMetro: 'M1 / M2 Cadorna FN (6 min a piedi) oppure M5 / Tram 1 e 10 Arco della Pace - Viale Luigi Camoens 2',
      pricingTable: [
        { zone: 'Royal’Aperitivo + Salita Torre Branca (19:30-22:30)', price: '€25 - €35 / persona', details: 'Include Royal Buffet, 1 drink premium, tavolo d appoggio riservato e salita panoramica' },
        { zone: 'Tavolo VIP Pista (Lun-Gio e Domenica)', price: '€320 - €400 (6-8 persone)', details: '100% spendibile in bottiglie, ingresso salta-fila con hostess e divanetto centrale' },
        { zone: 'Tavolo VIP Pista (Venerdi, Sabato e Big Match)', price: '€500 - €600 (6-8 persone)', details: 'Credito interamente convertito in bottiglie premium sotto la cupola di cristallo' },
        { zone: 'Tavolo Privé Branca Rialzato', price: '€800 - €1.200 (8-10 persone)', details: 'Area VIP transennata con sicurezza dedicata e servizio Magnum / Dom Pérignon' },
        { zone: 'Super Privé Console DJ', price: '€1.500 - €5.000+ (10-15 persone)', details: 'I tavoli piu esclusivi di Milano a contatto diretto con il DJ e gli ospiti internazionali' },
      ],
      insiderTips: [
        'Essendo aperto 7 notti su 7 dal lunedi alla domenica, il Just Me e la scelta n.1 assoluta dopo le partite di UEFA Champions League del martedi e mercoledi a San Siro (a soli 10 minuti di taxi).',
        'Prenota l’ingresso Royal’Aperitivo tra le 19:30 e le 21:00 per ricevere il pass gratuito per salire in ascensore a 108 metri d’altezza sulla Torre Branca.',
        'Selezione sartoriale rigorosa: per gli uomini sono obbligatori camicia con colletto, blazer scuro e mocassini o scarpe eleganti in pelle (vietate sneakers sportive e tute).',
      ],
      faqs: [
        {
          q: 'Qual è il dress code del Just Me Milano (ex Just Cavalli)?',
          a: 'Il Just Me Milano (ex Just Cavalli, Viale Luigi Camoens 2) applica una selezione sartoriale rigorosa alla porta: per gli uomini sono richieste camicia o polo curata, pantalone lungo scuro (no strappi) e scarpe eleganti o sneakers pulite in pelle; tute, abbigliamento sportivo, cappellini, felpe con cappuccio e zaini vengono respinti.',
        },
        {
          q: 'Il Just Me Milano e davvero aperto tutte le sere dal lunedi alla domenica?',
          a: 'Sì. Il Just Me Milano (ex Just Cavalli, Viale Luigi Camoens 2) è l’unico top club di Milano aperto 7 notti su 7, dalle 19:30 per il Royal’Aperitivo fino alle 05:00 del mattino.',
        },
        {
          q: 'Quanto costa un Tavolo VIP al Just Me Milano nel 2026/2027?',
          a: 'I tavoli Pista partono da 320-400€ in settimana e 500€ nel weekend (6-8 persone); il Privé Branca richiede 800-1.200€; il Super Privé Console DJ parte da 1.500€ fino a oltre 5.000€, sempre 100% spendibili in bottiglie.',
        },
        {
          q: 'Possiamo andare al Just Me dopo una partita di Champions League o il Derby a San Siro?',
          a: 'Certamente. A soli 10 minuti di taxi dallo Stadio Meazza, ospita calciatori, ospiti Skybox e tifosi internazionali ogni martedi, mercoledi e weekend. Ricorda che maglie da calcio e sciarpe sono vietate alla porta.',
        },
      ],
    },
  },
  'v-aria': {
    en: {
      tagline: 'Priority #3 Flagship | Just 150 Meters (2-Minute Walk) from San Siro Stadium & Ippodromo for Inter, AC Milan & Concert Afterparties',
      highlights: [
        'Located at Piazzale dello Sport 14: literally 150 meters (2 minutes on foot) from San Siro Stadium gates',
        '#1 Official Third-Half Afterparty venue after Inter, AC Milan, Serie A, Champions League, Derby & Coppa Italia',
        '#1 Immediate walk-in club after summer & stadium concerts at San Siro and Ippodromo Snai La Maura',
        'Three distinct VIP Table rings: Dancefloor Tables, Elevated Privé Aria & Super Privé DJ Console',
      ],
      musicStyle: 'Commercial Hits, Vocal House, Reggaeton, Urban & Sing-Along Italian/International Anthems',
      crowdProfile: '20-38 | Stylish Italian crowd, San Siro Tribuna Rossa & Skybox guests, university celebrations & concertgoers',
      bestNights: 'Thursday to Sunday + Special Match/Concert Openings: Post-Match Serie A/Champions League & Weekend Gala',
      nearestMetro: 'M5 Purple Line San Siro Ippodromo / San Siro Stadio / Lotto (2 min walk across Piazzale dello Sport 14)',
      pricingTable: [
        { zone: 'Post-Match & Pre-Club Royal’Aperitivo (19:30-22:30)', price: '€20 - €35 / person', details: 'Unlimited gourmet buffet islands, 1 premium cocktail & reserved lounge table' },
        { zone: 'Dancefloor VIP Table (Thu-Sun)', price: '€250 - €350 (6-8 guests)', details: '100% spendable in premium spirit/champagne bottles right on the main dancefloor' },
        { zone: 'Elevated Privé Aria Table', price: '€450 - €600 (8-10 guests)', details: 'Elevated VIP terrace overlooking the dancefloor with dedicated table waiter' },
        { zone: 'Super Privé Console DJ Table', price: '€700 - €1,200 (10-12 guests)', details: 'Prime booth directly next to the DJ console, ideal for Derby & Post-Concert VIP groups' },
      ],
      insiderTips: [
        'When 75,000 fans leave San Siro after an Inter or AC Milan match or a stadium concert, traffic freezes for 75 minutes. Walk 150 meters across Piazzale dello Sport straight into Aria Club at 22:45 to skip all queues and traffic.',
        'Going to San Siro first? Wear a collared shirt or smart dark knitwear under your coat and leave any football jersey or team scarf in your car trunk or bag before approaching Aria Club security.',
        'For graduation parties, 18th/25th birthdays, or supporter groups of 10-30 friends, combine the 19:30 Royal’Aperitivo table with an after-dinner bottle package.',
      ],
      faqs: [
        {
          q: 'How far is Aria Club Milano from San Siro Stadium and Ippodromo Snai?',
          a: 'Aria Club Milano is at Piazzale dello Sport 14, literally 150 meters on foot (a 2-minute walk across the square) from the gates of Stadio Giuseppe Meazza (San Siro) and right in front of Ippodromo Snai San Siro.',
        },
        {
          q: 'Can we walk straight into Aria Club after an Inter or AC Milan evening match or concert?',
          a: 'Yes! Evening Serie A and Champions League matches end around 22:40 and stadium concerts end at 23:15. You can walk 150 meters straight to your reserved VIP Table at Aria Club without taking a taxi or waiting at the M5 metro.',
        },
        {
          q: 'What is the dress code at Aria Club on match or concert nights?',
          a: 'Smart Elegant: collared shirt or smart polo/sweater, dark trousers or clean jeans, and dress shoes or clean leather sneakers. Football jerseys, team scarves, tracksuits, and athletic running shoes are strictly forbidden.',
        },
      ],
    },
    it: {
      tagline: 'Scelta Top N.3 a Milano | A Soli 150 Metri (2 Minuti a Piedi) dallo Stadio San Siro e Ippodromo per Dopo-Partita Inter, Milan e Concerti',
      highlights: [
        'Situato in Piazzale dello Sport 14: letteralmente a 150 metri (2 minuti a piedi) dai cancelli di San Siro',
        'Meta #1 per il Terzo Tempo dopo le partite di Inter e Milan (Serie A, Champions League, Derby e Coppa Italia)',
        'Punto di riferimento immediato a piedi dopo i grandi concerti a San Siro e all’Ippodromo Snai La Maura',
        'Tre livelli di Tavoli VIP: Dance Floor Table in pista, Privé Aria rialzato e Super Privé Console DJ',
      ],
      musicStyle: 'Commerciale, Vocal House, Reggaeton, Urban e Grandi Hit Italiane/Internazionali da cantare',
      crowdProfile: '20-38 anni | Elegante pubblico milanese, ospiti Tribuna Rossa/Skybox di San Siro, feste di laurea e pubblico concerti',
      bestNights: 'Dal Giovedi alla Domenica + Aperture Straordinarie Match/Concerti: Terzo Tempo San Siro & Weekend Gala',
      nearestMetro: 'M5 Lilla San Siro Ippodromo / San Siro Stadio / Lotto (2 minuti a piedi in Piazzale dello Sport 14)',
      pricingTable: [
        { zone: 'Royal’Aperitivo & Buffet Post-Partita (19:30-22:30)', price: '€20 - €35 / persona', details: 'Isole buffet gourmet illimitate, 1 drink premium e divanetto riservato' },
        { zone: 'Tavolo VIP Pista (Dance Floor Table)', price: '€250 - €350 (6-8 persone)', details: '100% convertito in bottiglie premium nel cuore dell’energia della pista' },
        { zone: 'Tavolo Privé Aria Rialzato', price: '€450 - €600 (8-10 persone)', details: 'Area VIP sopraelevata con visuale dominante sulla sala e cameriere dedicato' },
        { zone: 'Super Privé Console DJ', price: '€700 - €1.200 (10-12 persone)', details: 'I tavoli piu prestigiosi a fianco della console DJ per Derby, Champions e Dopo-Concerto' },
      ],
      insiderTips: [
        'Quando 75.000 persone escono da San Siro dopo Inter, Milan o un concerto, Piazzale Lotto e la metro M5 restano bloccati per oltre un ora: fai 150 metri a piedi fino a Piazzale dello Sport 14 ed entra subito al tuo Tavolo VIP da Aria Club alle 22:45.',
        'Vieni direttamente dallo stadio? Indossa una camicia o un dolcevita scuro sotto la giacca e lascia eventuali maglie da calcio o sciarpe nel bagagliaio o in borsa prima di presentarti alla selezione.',
        'Perfetto per feste di laurea, compleanni 18/25/30 anni e grandi tavolate di tifosi: puoi unire il tavolo Royal’Aperitivo delle 19:30 con le bottiglie del dopocena.',
      ],
      faqs: [
        {
          q: 'Quanto dista Aria Club Milano dallo Stadio di San Siro e dall’Ippodromo?',
          a: 'Aria Club Milano si trova in Piazzale dello Sport 14, a soli 150 metri reali a piedi (2 minuti attraversando il piazzale) dai cancelli dello Stadio Giuseppe Meazza di San Siro e di fronte all’Ippodromo Snai.',
        },
        {
          q: 'Possiamo entrare direttamente da Aria Club appena finisce la partita di Inter/Milan o un concerto?',
          a: 'Si! I posticipi delle 20:45 terminano alle 22:40 e i concerti verso le 23:15: in 2 minuti a piedi sei gia dentro Aria Club con il tuo Tavolo VIP riservato fino alle 05:00 del mattino, senza code e senza traffico.',
        },
        {
          q: 'Qual e il dress code da Aria Club nelle sere di partita o concerto?',
          a: 'Smart Elegant: camicia o polo/maglia curata, pantalone lungo o jeans scuro senza strappi e scarpe in pelle o sneakers eleganti pulite. Vietate maglie da calcio, sciarpe da tifoso, tute e scarpe da ginnastica tecniche.',
        },
      ],
    },
  },
  'v-tocqueville': {
    en: {
      tagline: 'Historic Corso Como Two-Story Icon | Singing Dinner Show Upstairs & LED-Ceiling Urban/House Club Downstairs',
      highlights: [
        'Located at Via Alessio di Tocqueville 13 in the pedestrian heart of Corso Como / Porta Nuova',
        'Two-level architectural layout: upscale Dinner Show restaurant & high-octane LED clubbing arena',
        'Seamless Dinner-to-Club formula: dine at 21:00 and keep your VIP booth past midnight until 05:00 AM',
        'Top destination during Milan Fashion Week, Fuorisalone & weekend bachelor/bachelorette celebrations',
      ],
      musicStyle: 'Reggaeton, Hip-Hop, Afrobeats, Commercial Hits & Vocal House across two levels',
      crowdProfile: '21-38 | Fashion showroom teams, Corso Como regulars, international models & celebratory VIP groups',
      bestNights: 'Friday (Urban & Reggaeton Show), Saturday (Corso Como Gran Gala Dinner Show & Club), Sunday (Fashion Night)',
      nearestMetro: 'M2 / M5 Porta Garibaldi FS (3 min walk to Via Alessio di Tocqueville 13)',
      pricingTable: [
        { zone: 'Singing Dinner Show Menu (21:00-23:30)', price: '€50 - €70 / person', details: 'Full seated multi-course dinner with wine/drinks & live vocal/artistic show' },
        { zone: 'Upper Ring VIP Table (After-Dinner)', price: '€300 - €400 (6-8 guests)', details: '100% bottle credit on the upper level overlooking the Corso Como crowd' },
        { zone: 'Main Dancefloor VIP Table', price: '€450 - €600 (8-10 guests)', details: 'Central sofa booth under the kinetic LED ceiling with skip-the-line hostess entry' },
        { zone: 'Super Privé Console Booth', price: '€800 - €1,500 (10-12 guests)', details: 'VIP sanctuary directly beside the DJ booth for Magnum & Dom Pérignon bottle parades' },
      ],
      insiderTips: [
        'Book the 21:00 Dinner Show + After-Dinner VIP Table combo so your group is already inside Corso Como before the midnight velvet-rope crowd builds up on Via de Tocqueville.',
        'Ideal for bachelorette and birthday groups who want a high-energy singing dinner followed immediately by reggaeton and hip-hop bottle service without changing venue.',
        'Dress code is Trendy Glamour: blazers and collared shirts for men, chic eveningwear for women.',
      ],
      faqs: [
        {
          q: 'Where is Tocqueville 13 located and how do I get there?',
          a: 'Tocqueville 13 is at Via Alessio di Tocqueville 13, right off Corso Como and Piazza Gae Aulenti. It is a 3-minute walk from Porta Garibaldi station (Metro M2 Green and M5 Purple lines).',
        },
        {
          q: 'How much does the Dinner Show and VIP Table cost at Tocqueville 13?',
          a: 'The seated Singing Dinner Show costs €50-€70 per person including wine. After-dinner VIP tables start at €300-€400 on the upper ring, €450-€600 on the main floor, and €800-€1,500 in the Console Privé.',
        },
        {
          q: 'Can we keep our dinner table for the nightclub party after midnight?',
          a: 'Yes, by booking the Dinner + VIP Table formula via WhatsApp (+39 351 912 7047), your dining booth converts into your private bottle service base until 05:00 AM.',
        },
      ],
    },
    it: {
      tagline: 'Storica Icona su Due Livelli in Corso Como | Ristorante Dinner Show & Pista Urban/House con Soffitto LED',
      highlights: [
        'Posizione strategica in Via Alessio di Tocqueville 13, nel cuore di Corso Como e Porta Nuova',
        'Struttura su 2 piani: ristorante Dinner Show cantato e arena clubbing con soffitto LED immersivo',
        'Formula Cena + Tavolo Discoteca: ceni alle 21:00 e mantieni la tua base VIP fino alle 05:00 del mattino',
        'Tappa fissa durante la Milano Fashion Week, il Fuorisalone e per addii al nubilato/celibato glamour',
      ],
      musicStyle: 'Reggaeton, Hip-Hop, Afrobeats, Commerciale e Vocal House su due livelli',
      crowdProfile: '21-38 anni | Habitué di Corso Como, showroom moda, modelle internazionali e gruppi in festa',
      bestNights: 'Venerdi (Urban & Reggaeton Show), Sabato (Gran Gala Dinner Show & Club), Domenica (Corso Como Night)',
      nearestMetro: 'M2 Verde / M5 Lilla Porta Garibaldi FS (3 minuti a piedi fino a Via Alessio di Tocqueville 13)',
      pricingTable: [
        { zone: 'Cena Cantata Dinner Show (21:00-23:30)', price: '€50 - €70 / persona', details: 'Menu servito completo con vino/drink inclusi e live performance artistica ai tavoli' },
        { zone: 'Tavolo VIP Ring Superiore (Dopocena)', price: '€300 - €400 (6-8 persone)', details: '100% spendibile in bottiglie al piano superiore con affaccio sul locale' },
        { zone: 'Tavolo VIP Pista Centrale', price: '€450 - €600 (8-10 persone)', details: 'Divanetto riservato sotto il soffitto LED cinetico con ingresso salta-fila hostess' },
        { zone: 'Super Privé Console DJ', price: '€800 - €1.500 (10-12 persone)', details: 'Area esclusiva a fianco del DJ per formati Magnum, Dom Pérignon e Don Julio 1942' },
      ],
      insiderTips: [
        'Prenota la formula combinata Dinner Show (ore 21:00) + Tavolo VIP Dopocena per entrare comodamente prima che si formi la ressa di mezzanotte in Via de Tocqueville.',
        'Perfetto per addii al nubilato, compleanni 25/30 anni e lauree che cercano cena cantata + discoteca urban/reggaeton nello stesso indirizzo iconico.',
        'Dress code Trendy Glamour: camicia e giacca per l uomo, abito da sera o completo chic per la donna.',
      ],
      faqs: [
        {
          q: 'Dove si trova il Tocqueville 13 e quale metro e piu vicina?',
          a: 'Il Tocqueville 13 si trova in Via Alessio di Tocqueville 13, a 100 metri da Corso Como e Piazza Gae Aulenti, a soli 3 minuti a piedi dalla fermata Metro M2/M5 Porta Garibaldi.',
        },
        {
          q: 'Quanto costa cenare o prenotare un Tavolo VIP al Tocqueville 13?',
          a: 'Il Dinner Show servito costa 50-70€ a persona vini inclusi. Nel dopocena i Tavoli VIP partono da 300-400€ nel ring superiore, 450-600€ in pista centrale e 800-1.500€ nel Privé Console.',
        },
        {
          q: 'Possiamo tenere lo stesso tavolo della cena anche per la discoteca dopo mezzanotte?',
          a: 'Si, prenotando la formula Cena + Tavolo Bottiglia su WhatsApp (+39 351 912 7047) il vostro tavolo resta riservato per tutta la notte fino alle 05:00.',
        },
      ],
    },
  },
  'v-alcatraz': {
    en: {
      tagline: 'Milan Largest Multi-Room Live Arena & 3-Dancefloor Weekend Mega-Club in Isola / Scalo Farini',
      highlights: [
        'Massive 3,000+ capacity industrial space at Via Valtellina 25 (Isola / Scalo Farini district)',
        'Two-part night: major international live concerts (20:30-23:00) followed by a 3-Room Mega Party until 05:00 AM',
        'Three simultaneous dancefloors: Main Room (90s/2000s/Commercial), Room 2 (Reggaeton/Latin), Room 3 (Rock/Indie)',
        'Elevated VIP Balcony tables overlooking the giant concert stage with private bar and zero queue',
      ],
      musicStyle: '3 Dancefloors: Commercial & 90s/2000s Pop Anthems (Main Stage) + Reggaeton/Urban (Room 2) + Rock/Alter (Room 3)',
      crowdProfile: '18-35 | Large groups of friends, university faculties (Politecnico/Bicocca/Statale), graduation parties & live music fans',
      bestNights: 'Friday (Notorius / 2000s Mega Party on 3 Floors), Saturday (All You Can Dance 3-Room Festival) & Special Holiday Events',
      nearestMetro: 'M3 Yellow Line Maciachini or M5 Purple Line Marche / Isola + Tram 3 & 4 (Via Valtellina 25)',
      pricingTable: [
        { zone: 'Guest List / Early Entry (23:00-00:30)', price: '€12 - €20 / person', details: 'Includes 1 drink and full access to all 3 dancefloors' },
        { zone: 'Side Arena VIP Table', price: '€200 - €280 (6-8 guests)', details: '100% bottle credit, skip-the-line VIP entrance & reserved seating for groups' },
        { zone: 'Elevated VIP Balcony Table (Main Stage View)', price: '€300 - €450 (8-10 guests)', details: 'Panoramic mezzanine balcony overlooking the 3,000-person main arena & stage show' },
        { zone: 'Stage / Console Super VIP Booth', price: '€500 - €800 (10-15 guests)', details: 'Best position for large graduation, 18th birthday, Halloween & NYE mega-groups' },
      ],
      insiderTips: [
        'Because Alcatraz has 3 separate dancefloors under one roof, it is the #1 stress-free venue in Milan for large groups of 10 to 40 friends with different musical tastes.',
        'With a VIP Table starting at just €200-€300 for up to 8 people (€25-€35 per person with bottle included), you completely bypass the 300-meter street queue on Via Valtellina.',
        'Attending a live concert at Alcatraz at 21:00? Book a Balcony VIP Table via WhatsApp (+39 351 912 7047) to stay inside seamlessly for the 23:30 club night.',
      ],
      faqs: [
        {
          q: 'How many dancefloors does Alcatraz Milano have on Friday and Saturday nights?',
          a: 'On Friday and Saturday nights after 23:00, Alcatraz opens 3 independent music rooms: Main Stage (Commercial, Dance & 90s/2000s hits), Room 2 (Reggaeton, Hip-Hop & Latin), and Room 3 (Rock & Alternative DJ sets).',
        },
        {
          q: 'How much is a VIP table at Alcatraz Milano?',
          a: 'Alcatraz offers the most accessible VIP table rates in Milan for large groups: €200-€280 in the side arena, €300-€450 on the elevated panoramic VIP Balcony, and €500-€800 near the main stage, 100% spendable in bottles.',
        },
        {
          q: 'Is Alcatraz suitable for 18th birthdays, university graduation parties, or New Year Eve?',
          a: 'Yes! Its huge capacity, relaxed smart-casual dress code, and €30-€40/person table math make Alcatraz a top choice for 18th birthdays, university graduations, Halloween, and Capodanno.',
        },
      ],
    },
    it: {
      tagline: 'La Piu Grande Arena Live e Mega-Club a 3 Piste di Milano in Via Valtellina 25 (Isola / Scalo Farini)',
      highlights: [
        'Arena monumentale da oltre 3.000 persone in Via Valtellina 25 (distretto Isola / Scalo Farini)',
        'Doppia anima: grandi concerti nazionali/internazionali (20:30-23:00) seguiti dal Mega Party su 3 Piste fino alle 05:00',
        '3 Piste musicali contemporanee: Main Stage (Commerciale/90-2000), Pista 2 (Reggaeton/Urban), Pista 3 (Rock/Indie)',
        'Balconata VIP rialzata con vista dominante sul palco centrale, bar dedicato e ingresso salta-fila immediato',
      ],
      musicStyle: '3 Piste: Commerciale, Dance & Hit 90/2000 (Main Stage) + Reggaeton/Hip-Hop (Sala 2) + Rock/Alternativa (Sala 3)',
      crowdProfile: '18-35 anni | Grandi compagnie di amici, feste di laurea (Politecnico, Statale, Bicocca), 18esimi e pubblico concerti',
      bestNights: 'Venerdi (Mega Party Anni 2000/Commerciale su 3 Piste), Sabato (All You Can Dance 3 Piste), Halloween e Capodanno',
      nearestMetro: 'M3 Gialla Maciachini oppure M5 Lilla Marche / Isola + Tram 3 e 4 (Via Valtellina 25)',
      pricingTable: [
        { zone: 'Ingresso in Lista / Prevendita (23:00-00:30)', price: '€12 - €20 / persona', details: 'Include 1 drink e libero accesso a tutte le 3 piste da ballo' },
        { zone: 'Tavolo VIP Arena Laterale', price: '€200 - €280 (6-8 persone)', details: '100% spendibile in bottiglie, ingresso salta-fila dedicato e base riservata' },
        { zone: 'Tavolo Balconata VIP Rialzata (Vista Main Stage)', price: '€300 - €450 (8-10 persone)', details: 'Affaccio panoramico dalla balconata superiore sulla pista centrale da 3.000 persone' },
        { zone: 'Super Privé Palco / Console', price: '€500 - €800 (10-15 persone)', details: 'Ideale per grandi feste di laurea, 18 anni, addii al celibato, Halloween e Capodanno' },
      ],
      insiderTips: [
        'Grazie alle 3 piste musicali diverse sotto lo stesso tetto, l Alcatraz e il locale n.1 a Milano per mettere d accordo compagnie numerose da 10 a 40 persone.',
        'Con un Tavolo VIP in Balconata da 250-350€ diviso in 8 amici (circa 35€ a testa con bottiglia inclusa) salti completamente la lunghissima coda esterna di Via Valtellina.',
        'Hai il biglietto per un concerto delle 21:00 all’Alcatraz? Prenota su WhatsApp (+39 351 912 7047) il tuo Tavolo VIP in Balconata per il dopo-concerto delle 23:30 senza mai uscire dal locale.',
      ],
      faqs: [
        {
          q: 'Quante piste da ballo ha l Alcatraz Milano il venerdi e il sabato sera?',
          a: 'Ogni venerdi e sabato dalle 23:00 l Alcatraz apre 3 sale indipendenti: Pista 1 Main Stage (Commerciale, Pop e Hit 90/2000), Pista 2 (Reggaeton, Latin e Urban) e Pista 3 (Rock e DJ set alternativo).',
        },
        {
          q: 'Quanto costa prenotare un Tavolo VIP in Balconata all’Alcatraz Milano?',
          a: 'I tavoli VIP partono da 200-280€ nell’arena laterale, 300-450€ sulla celebre Balconata VIP rialzata con vista palco e 500-800€ nell’area Palco/Console, sempre 100% convertiti in bottiglie.',
        },
        {
          q: 'L Alcatraz e adatto per feste dei 18 anni, feste di laurea o Capodanno?',
          a: 'Assolutamente si: e la piu grande arena multi-sala di Milano, con dress code casual curato e tavoli accessibili perfetti per 18esimi, lauree, Halloween e il veglione di Capodanno.',
        },
      ],
    },
  },
  'v-fabrique': {
    en: {
      tagline: 'Monumental 3,000-Capacity Post-Industrial Warehouse for International Electronic Festivals & World Tour Headliners',
      highlights: [
        'Located at Via Gaudenzio Fantoli 9 in the creative Mecenate / Linate East design & TV studio district',
        '3,000-capacity column-free industrial hangar with stadium-grade L-Acoustics line-array sound & laser rigs',
        'Hosts the biggest international Techno, Tech-House, EDM & Urban superstar tours in Northern Italy',
        'Elevated VIP Ring & Backstage tables with private security entrance, dedicated restrooms & bottle service',
      ],
      musicStyle: 'International Techno, Melodic Techno, Tech-House, Big-Room Electronic Showcases & Major Live World Tours',
      crowdProfile: '18-38 | Electronic music aficionados, international festival travelers, Fashion/Design Week ravers & VIP table groups',
      bestNights: 'Friday & Saturday International Headliner Showcases, Halloween, New Year Eve & Fuorisalone Electronic Marathons',
      nearestMetro: 'M4 Blue Line Repetti / Stazione Forlanini FS + Tram 27 (Via Gaudenzio Fantoli 9, 8 min from Linate Airport)',
      pricingTable: [
        { zone: 'Early Bird / Standard Arena Ticket', price: '€25 - €45 / person', details: 'Main warehouse floor admission (varies by international headliner tier)' },
        { zone: 'Elevated VIP Ring Table (Tier 1)', price: '€400 - €600 (6-8 guests)', details: 'Fast-track VIP gate, elevated platform view of the mega-stage & 100% bottle credit' },
        { zone: 'VIP Ring Gold Table (Front View)', price: '€700 - €1,000 (8-10 guests)', details: 'Prime sightline on the massive LED wall with premium spirits & champagne service' },
        { zone: 'Backstage / Stage Console Privé', price: '€1,200 - €2,500+ (10-12 guests)', details: 'Ultra-exclusive stage-side hospitality next to world-touring DJs & performers' },
      ],
      insiderTips: [
        'On international DJ nights (Peggy Gou, Paul Kalkbrenner, Fisher, Marco Carola, Deborah De Luca, or NYE marathons), general admission tickets sell out weeks ahead: booking an Elevated VIP Ring table via WhatsApp (+39 351 912 7047) guarantees immediate fast-track entry.',
        'Thanks to the M4 Blue Line (Repetti / Forlanini FS), you can reach Fabrique from San Babila in central Milan in just 12 minutes.',
        'Dress code is Contemporary Clubwear / Total Black: comfortable dark sneakers and streetwear are welcome.',
      ],
      faqs: [
        {
          q: 'Where is Fabrique Milano located and how do I reach it from the city center?',
          a: 'Fabrique is at Via Gaudenzio Fantoli 9 in the Mecenate district (East Milan). Take the M4 Blue metro line from San Babila to Repetti or Forlanini FS (12 minutes) plus a short taxi/tram ride.',
        },
        {
          q: 'How do VIP tables work at Fabrique Milano during electronic festivals and concerts?',
          a: 'VIP tables are located on the elevated VIP Ring overlooking the 3,000-capacity warehouse floor or in the Stage Backstage area. Prices start from €400-€600 up to €1,200-€2,500+ depending on the international headliner, with fast-track entrance and bottle service.',
        },
        {
          q: 'What is the dress code at Fabrique Milano?',
          a: 'Contemporary Clubwear & Dark Streetwear. Clean sneakers, black t-shirts, cargo pants, and festival clubwear are completely accepted; avoid team football jerseys.',
        },
      ],
    },
    it: {
      tagline: 'Monumentale Warehouse Post-Industriale da 3.000 Persone per Festival Elettronici Internazionali e Tour Mondiali',
      highlights: [
        'Situato in Via Gaudenzio Fantoli 9 nel distretto creativo degli studi televisivi e della moda di Mecenate / Linate',
        'Hangar industriale da 3.000 persone senza colonne con impianto L-Acoustics da festival e laser show monumentale',
        'Ospita i piu grandi superstar DJ mondiali Techno, Tech-House, Melodic Techno e i tour internazionali piu attesi',
        'Ring VIP Rialzato e Backstage Palco con ingresso fast-track separato, bar dedicato e servizio bottiglie',
      ],
      musicStyle: 'Techno Internazionale, Melodic Techno, Tech-House, Festival Elettronici e Grandi Concerti Live/Urban',
      crowdProfile: '18-38 anni | Appassionati di clubbing elettronico, pubblico internazionale, raver della Fashion/Design Week e gruppi VIP',
      bestNights: 'Venerdi e Sabato Special Guest Internazionali, Maratone Fuorisalone, Halloween e Capodanno Warehouse Festival',
      nearestMetro: 'M4 Blu Repetti / Stazione Forlanini FS + Tram 27 (Via Gaudenzio Fantoli 9, a 12 min da San Babila)',
      pricingTable: [
        { zone: 'Ticket Ingresso Parterre / Early Bird', price: '€25 - €45 / persona', details: 'Accesso al parterre principale (varia in base alla caratura del guest internazionale)' },
        { zone: 'Tavolo Ring VIP Rialzato (Fascia 1)', price: '€400 - €600 (6-8 persone)', details: 'Ingresso VIP salta-fila, pedana sopraelevata panoramica e 100% credito bottiglie' },
        { zone: 'Tavolo Ring VIP Gold (Prima Fila)', price: '€700 - €1.000 (8-10 persone)', details: 'Visuale frontale privilegiata sul mega palco LED con servizio spiriti e champagne' },
        { zone: 'Super Privé Backstage / Stage Console', price: '€1.200 - €2.500+ (10-12 persone)', details: 'Hospitality esclusiva a bordo palco accanto ai top DJ mondiali' },
      ],
      insiderTips: [
        'Nelle date con superstar DJ internazionali (da Marco Carola, Fisher e Peggy Gou fino a Paul Kalkbrenner e Indira Paganotto) i ticket parterre vanno sold-out in anticipo: prenotare un Tavolo sul Ring VIP via WhatsApp (+39 351 912 7047) assicura ingresso prioritario immediato.',
        'Con la nuova Metro M4 Blu (fermate Repetti / Forlanini FS) arrivi in zona Fabrique dal centro di Milano (San Babila) in soli 12 minuti.',
        'Dress code Clubwear Contemporaneo / Total Black: ammesse sneakers comode e streetwear curato.',
      ],
      faqs: [
        {
          q: 'Dove si trova il Fabrique Milano e come si raggiunge dal centro?',
          a: 'Il Fabrique si trova in Via Gaudenzio Fantoli 9 (zona Mecenate / Est Milano). Si raggiunge rapidamente da San Babila con la Metro M4 Blu (fermata Repetti o Forlanini FS) piu 4 minuti di taxi o Tram 27.',
        },
        {
          q: 'Come funzionano i Tavoli VIP al Fabrique durante i grandi eventi elettronici?',
          a: 'I Tavoli VIP sono posizionati sul Ring Rialzato che domina la pista da 3.000 persone oppure nel Backstage Stage. I minimum spend partono da 400-600€ fino a 1.200-2.500€+ per i grandi guest internazionali, con accesso salta-fila dedicato.',
        },
        {
          q: 'Qual e il dress code richiesto al Fabrique Milano?',
          a: 'Clubwear Contemporaneo e Streetwear Scuro: t-shirt nere, pantaloni comodi e sneakers sono perfetti per ballare fino al mattino.',
        },
      ],
    },
  },
  'v-amnesia': {
    en: {
      tagline: 'Milan 20-Year Temple of Tech-House & Techno | Custom L-Acoustics Sound System & Backstage DJ Console Privé',
      highlights: [
        'Located at Via Alfonso Gatto (corner Viale Forlanini), 5 minutes from M4 Repetti / Forlanini FS & Linate',
        'Over two decades as Milan #1 pure underground club for Tech-House, Melodic Techno & Minimal/Deep Tech',
        'Custom-calibrated L-Acoustics sound system, kinetic ceiling lighting & 360-degree DJ booth',
        'Legendary Backstage Console Privé placing your VIP table directly behind the world top selectors',
      ],
      musicStyle: 'Tech-House, Melodic Techno, Techno & Deep/Minimal Electronic by Resident & Global Headliner DJs',
      crowdProfile: '20-38 | Dedicated clubbers, DJs, fashion/design creatives & underground electronic music connoisseurs',
      bestNights: 'Saturday Night Flagship International Guest DJs, Friday Special Showcases, Fuorisalone & Capodanno Marathon',
      nearestMetro: 'M4 Blue Line Repetti / Stazione Forlanini FS (5 min walk to Via Alfonso Gatto / Viale Forlanini)',
      pricingTable: [
        { zone: 'Release Ticket / Guest List (23:30-01:00)', price: '€20 - €35 / person', details: 'Main dancefloor entry for international DJ nights' },
        { zone: 'Privé Pista / Side Dancefloor Table', price: '€350 - €500 (6-8 guests)', details: '100% bottle credit, skip-the-line VIP admission & dancefloor-level booth' },
        { zone: 'Privé Gold Elevated Balcony', price: '€600 - €900 (8-10 guests)', details: 'Elevated VIP zone with direct sightline to the LED wall and dedicated waiter' },
        { zone: 'Backstage Console Super Privé (Behind DJ)', price: '€1,000 - €2,000+ (10-12 guests)', details: 'The most coveted electronic table in Milan: party inside the DJ booth area' },
      ],
      insiderTips: [
        'At Amnesia Milano, the Backstage Console Privé is where the magic happens: you stand literally one meter behind headliners from Ibiza, Berlin, and London until 06:00 AM.',
        'Wear Total Black or minimalist dark clubwear with comfortable dark sneakers or boots; stiff corporate suits look out of place on this floor.',
        'Thanks to the M4 Blue metro line (Forlanini FS / Repetti), reaching Amnesia from Piazza San Babila takes just 10 minutes.',
      ],
      faqs: [
        {
          q: 'Where is Amnesia Milano and which metro stop is closest?',
          a: 'Amnesia Milano is located at Via Alfonso Gatto (at the corner with Viale Forlanini). It is a 5-minute walk from the Stazione Forlanini / Repetti stop on the M4 Blue Metro Line (10 minutes from San Babila).',
        },
        {
          q: 'How much does a Backstage Console VIP table cost at Amnesia Milano?',
          a: 'Side dancefloor VIP tables start at €350-€500 (6-8 guests), Privé Gold tables cost €600-€900, and Backstage Console tables directly behind the DJ range from €1,000 to €2,000+ depending on the guest artist.',
        },
        {
          q: 'What should I wear to Amnesia Milano?',
          a: 'Total Black & Contemporary Clubwear is the gold standard at Amnesia: black tees, dark trousers, and clean dark sneakers or boots built for dancing until 06:00 AM.',
        },
      ],
    },
    it: {
      tagline: 'Il Tempio Milanese della Tech-House e della Techno da Oltre 20 Anni | Impianto L-Acoustics & Privé Console Backstage',
      highlights: [
        'Situato in Via Alfonso Gatto (angolo Viale Forlanini), a 5 minuti dalla Metro M4 Blu Forlanini FS / Repetti',
        'Da oltre vent anni il club di riferimento a Milano per Tech-House, Melodic Techno e grandi guest da Ibiza e Berlino',
        'Impianto acustico L-Acoustics tarato al millimetro, architettura luminosa immersiva e console centrale',
        'Iconico Privé Console Backstage per vivere il DJ set a un metro dai migliori artisti elettronici del pianeta',
      ],
      musicStyle: 'Tech-House, Melodic Techno, Techno e Minimal/Deep Tech con Superstar DJ Internazionali',
      crowdProfile: '20-38 anni | Clubber esperti, creativi della moda e del design, producer e amanti della vera scena elettronica',
      bestNights: 'Sabato Notte International Guest DJ, Venerdi Showcase Speciali, Settimana del Fuorisalone e Maratona di Capodanno',
      nearestMetro: 'M4 Blu Stazione Forlanini FS / Repetti (5 minuti a piedi fino a Via Alfonso Gatto / Viale Forlanini)',
      pricingTable: [
        { zone: 'Ticket Early Bird / Lista (23:30-01:00)', price: '€20 - €35 / persona', details: 'Ingresso pista per le notti con guest DJ internazionale' },
        { zone: 'Tavolo Privé Pista Laterale', price: '€350 - €500 (6-8 persone)', details: '100% spendibile in bottiglie, ingresso VIP salta-fila e divanetto a bordo pista' },
        { zone: 'Tavolo Privé Gold Sopraelevato', price: '€600 - €900 (8-10 persone)', details: 'Area VIP rialzata con visuale perfetta su console e LED wall e servizio dedicato' },
        { zone: 'Super Privé Console Backstage (Dietro al DJ)', price: '€1.000 - €2.000+ (10-12 persone)', details: 'Il tavolo elettronico piu ambito di Milano: balli direttamente in console fino alle 06:00' },
      ],
      insiderTips: [
        'All’Amnesia il vero status symbol è il Tavolo Privé Console Backstage: vivi tutta la notte a un metro dai grandi headliner di Ibiza e Berlino fino alle 06:00 del mattino.',
        'Il dress code ideale e Total Black o clubwear contemporaneo scuro con sneakers nere comode; evita completi formali da ufficio.',
        'Con la linea Metro M4 Blu arrivi alla fermata Forlanini FS da San Babila in soli 10 minuti.',
      ],
      faqs: [
        {
          q: 'Dove si trova l Amnesia Milano e come si arriva in metro?',
          a: 'L Amnesia Milano si trova in Via Alfonso Gatto (angolo Viale Forlanini), a soli 5 minuti a piedi dalla fermata Forlanini FS / Repetti della Metro M4 Blu (10 minuti da Piazza San Babila).',
        },
        {
          q: 'Quanto costa un Tavolo VIP in Console Backstage all’Amnesia Milano?',
          a: 'I tavoli Privé Pista partono da 350-500€ (6-8 persone), il Privé Gold da 600-900€ e il celebre Privé Console Backstage dietro al DJ varia da 1.000€ a 2.000€+ in base all’ospite internazionale, 100% in bottiglie.',
        },
        {
          q: 'Qual e il dress code consigliato per l Amnesia Milano?',
          a: 'Total Black e Clubwear Contemporaneo: t-shirt o camicia nera, pantalone scuro e sneakers scure comode per ballare fino all’alba.',
        },
      ],
    },
  },
  'v-dazi': {
    en: {
      tagline: 'Historic Neoclassical Tollhouse Facing Arco della Pace | Gourmet Dining, Mixology Bar & Late-Night Dinner Show',
      highlights: [
        'Housed inside Luigi Cagnola 1838 neoclassical tollhouse directly on Piazza Sempione 1 beside Arco della Pace',
        'Open Tuesday to Friday 12:00 – 03:00 and Saturday to Sunday 11:00 – 03:00 (Weekend Brunch, Sunset Mixology, Dinner & Club)',
        'Seamless progression from contemporary Italian gourmet dining and botanical mixology into live Dinner Show & DJ sets',
        'Panoramic outdoor Sempione terrace and soaring double-height glass portico looking directly onto Arco della Pace',
      ],
      musicStyle: 'Live Singing Dinner Show, Vocal House, Commercial Hits & Mixology Lounge DJ Sets until 03:00',
      crowdProfile: '24-45 | Design & fashion crowd, Sempione regulars, international diners, corporate celebrations & VIP groups',
      bestNights: 'Friday & Saturday Dinner Show + DJ Set, Sunset Mixology Tue-Sun & Saturday-Sunday Sempione Brunch',
      nearestMetro: 'M5 Purple Line Domodossola / Tre Torri or Tram 1 & 10 right at Arco della Pace (Piazza Sempione 1)',
      pricingTable: [
        { zone: 'Sunset Mixology Aperitivo (18:00-21:00)', price: '€15 - €22 / person', details: 'Signature craft cocktail with gourmet bites facing Arco della Pace' },
        { zone: 'Gourmet Restaurant & Dinner Show', price: '€55 - €85 / person', details: 'Full à la carte or tasting dinner inside the neoclassical stone hall with live show' },
        { zone: 'After-Dinner Lounge & Dancefloor VIP Table', price: '€250 - €450 (4-6 guests)', details: '100% bottle service credit with reserved sofa and priority skip-the-line entry' },
        { zone: 'New Year Eve Red Carpet & Dinner Show (Dec 31)', price: '€160 Dinner / €40-€50 Party', details: 'Gala Menu + Live Show by EKI + DJ Set until 05:00 (Tables €250-€320)' },
      ],
      insiderTips: [
        'Request a table near the monumental glass colonnade at sunset to watch Arco della Pace light up over Parco Sempione.',
        'On Friday and Saturday nights, booking dinner guarantees you keep your spot inside without queuing when the DJ set starts at 23:00.',
        'Dress code is Smart Elegant: tailored blazers, silk shirts, and curated eveningwear blend right in with the Sempione crowd.',
      ],
      faqs: [
        {
          q: 'Where is Dazi Milano located and what are its opening hours?',
          a: 'Dazi Milano is located at Piazza Sempione 1 inside the historic neoclassical tollhouse beside Arco della Pace. It is open Tuesday to Friday from 12:00 to 03:00 and Saturday to Sunday from 11:00 to 03:00.',
        },
        {
          q: 'How much does dinner or a VIP table cost at Dazi Milano?',
          a: 'Signature sunset cocktails range from €15 to €22, gourmet dinner and Dinner Show evenings average €55-€85 per person, and after-dinner bottle service tables start from €250-€320 for 4-6 guests.',
        },
        {
          q: 'What is the dress code at Dazi Milano Arco della Pace?',
          a: 'Smart Elegant attire is recommended for dinner and night events: collared shirts or blazers for men and chic evening looks for women (avoid athletic sportswear).',
        },
      ],
    },
    it: {
      tagline: 'Storico Casello Daziario Neoclassico all’Arco della Pace | Ristorante Gourmet, Mixology Bar, Dinner Show & DJ Set',
      highlights: [
        'Ospitato nel monumentale casello daziario neoclassico del 1838 firmato Luigi Cagnola in Piazza Sempione 1',
        'Aperto Martedì – Venerdì 12:00 – 03:00 e Sabato – Domenica 11:00 – 03:00 (Brunch, Aperitivo, Ristorante e Dopocena)',
        'Evoluzione naturale dalla cucina gourmet contemporanea e mixology d’autore al Dinner Show dal vivo con DJ Set fino alle 03:00',
        'Dehors affacciato direttamente sull’Arco della Pace e salone vetrato a doppia altezza su Parco Sempione',
      ],
      musicStyle: 'Live Dinner Show Cantato, Vocal House, Hit Commerciali e DJ Set Mixology Lounge fino alle 03:00',
      crowdProfile: '24-45 anni | Pubblico elegante di Corso Sempione, professionisti, moda, cene aziendali, lauree e tavoli VIP',
      bestNights: 'Venerdì e Sabato Dinner Show + DJ Set, Aperitivo Mixology Mar-Dom e Brunch del Weekend dalle 11:00',
      nearestMetro: 'M5 Lilla Domodossola / Tre Torri oppure Tram 1 e 10 fermata Arco della Pace (Piazza Sempione 1)',
      pricingTable: [
        { zone: 'Aperitivo Mixology Vista Arco (18:00-21:00)', price: '€15 - €22 / persona', details: 'Signature cocktail d’autore con proposte gourmet in Piazza Sempione 1' },
        { zone: 'Ristorante Gourmet & Dinner Show', price: '€55 - €85 / persona', details: 'Cena servita alla carta o menù degustazione nel salone neoclassico con spettacolo live' },
        { zone: 'Tavolo VIP Dopocena & Pista', price: '€250 - €450 (4-6 persone)', details: '100% spendibile in bottiglie premium con ingresso prioritario salta-fila' },
        { zone: 'Capodanno 2027 Red Carpet & Dinner Show', price: '160€ Cenone / 40-50€ Serata', details: 'Menù Terra + Live Show EKI + DJ Set fino alle 05:00 (Tavoli 250€-320€)' },
      ],
      insiderTips: [
        'Chiedi un tavolo vicino alla vetrata monumentale al tramonto per goderti l’illuminazione serale dell’Arco della Pace.',
        'Il venerdì e il sabato prenotare la cena spettacolo permette di vivere anche il DJ set successivo senza rifare coda all’ingresso.',
        'Il dress code richiesto la sera è Smart Elegant: camicia o giacca curata per lui, look da sera ricercato per lei.',
      ],
      faqs: [
        {
          q: 'Dove si trova Dazi Milano e quali sono gli orari di apertura?',
          a: 'Dazi Milano si trova in Piazza Sempione 1, nello storico casello daziario accanto all’Arco della Pace. È aperto da martedì a venerdì dalle 12:00 alle 03:00 e sabato e domenica dalle 11:00 alle 03:00.',
        },
        {
          q: 'Quanto costa cenare o prenotare un tavolo dopocena da Dazi Milano?',
          a: 'I cocktail mixology all’aperitivo partono da 15-22€, la cena gourmet con Dinner Show varia tra 55€ e 85€ a persona, mentre i tavoli riservati dopocena partono da 250€-320€ in bottiglie.',
        },
        {
          q: 'Qual è il dress code serale di Dazi Milano all’Arco della Pace?',
          a: 'Per la cena spettacolo e il dopocena è richiesto un abbigliamento Smart Elegant curato; evitare tute e abbigliamento sportivo.',
        },
      ],
    },
  },
  'v-55milano': {
    en: {
      tagline: 'Priority #4 Flagship | 1,000 sqm Industrial-Chic Loft & 600 sqm Terrace for XXL Apericena, Singing Dinner Show & Clubbing',
      highlights: [
        'Located at Via Piero della Francesca 55 (Sempione / Portello) inside a historic converted railway depot',
        '1,000 sqm indoor open-space + 600 sqm garden terrace, open Tuesday to Sunday (19:30 to 03:00 AM)',
        '#1 venue in Milan for Graduation Parties (Festa di Laurea), 18th/30th Birthdays & Bachelorette Singing Dinners',
        'Only 6 minutes from San Siro Stadium for post-match group dinners and bottle service',
      ],
      musicStyle: 'Singing Dinner Live Show, Commercial Hits, 90s/2000s Dance, House & Sunday Latin Party',
      crowdProfile: '20-45 | University graduation groups (Bocconi/Cattolica/Politecnico), birthday parties & stylish Sempione crowd',
      bestNights: 'Tuesday to Sunday: Fri/Sat Singing Dinner Show & Studio 55 Club, Thu Graduation Nights, Sun Latin Party',
      nearestMetro: 'M5 Purple Line Domodossola FN or Gerusalemme (5 min walk to Via Piero della Francesca 55)',
      pricingTable: [
        { zone: 'XXL Royal Apericena Reserved Table (19:30-22:30)', price: '€20 - €35 / person', details: 'Reserved sofa area, unlimited gourmet buffet islands, 1 drink & cake service option' },
        { zone: 'Singing Dinner Show Seated Menu (20:30-23:30)', price: '€50 - €70 / person', details: 'Full seated dinner with wine + live vocal dinner show & club access' },
        { zone: 'After-Dinner VIP Bottle Table (23:00-03:00)', price: '€200 - €450 (6-10 guests)', details: '100% bottle credit for spirits or champagne with sparkler service' },
      ],
      insiderTips: [
        'Because 55 Milano offers 1,000 sqm of modular sofa areas, it is the #1 choice in Milan for Graduation Parties (15 to 80 guests) with custom cake storage and prosecco/bottle packages.',
        'Coming from an afternoon or evening match at San Siro? 55 Milano is just 4 stops on the M5 Purple Line (Domodossola/Gerusalemme) with late kitchen and generous buffet.',
      ],
      faqs: [
        {
          q: 'How much does a Graduation Party or Birthday package cost at 55 Milano?',
          a: 'Reserved Royal Apericena areas cost €20-€35 per person (19:30-22:30) including buffet and drinks; adding an after-dinner spirit/champagne bottle brings the full-night combo to €35-€50 per person.',
        },
        {
          q: 'Which nights is 55 Milano open?',
          a: '55 Milano is open 6 nights a week, from Tuesday to Sunday (19:30 to 03:00 AM), at Via Piero della Francesca 55.',
        },
      ],
    },
    it: {
      tagline: 'Scelta Top N.4 a Milano | 1.000 mq di Loft Industrial-Chic e 600 mq di Terrazza per Apericena XL, Cena Cantata e Feste di Laurea',
      highlights: [
        'Situato in Via Piero della Francesca 55 (Sempione / Arco della Pace) in uno storico ex deposito ferroviario',
        '1.000 mq di salone open-space + 600 mq di terrazza estiva, aperto dal Martedi alla Domenica (19:30-03:00)',
        'Location #1 a Milano per Feste di Laurea, Compleanni 18/25/30 Anni e Addii al Nubilato con Cena Cantata',
        'A soli 6 minuti da San Siro (Metro M5 Domodossola/Gerusalemme) per cene post-partita e tavoli bottiglia',
      ],
      musicStyle: 'Dinner Show Cantato Live, Commerciale, Hit 90/2000, Vocal House e Domenica Latino-Americana',
      crowdProfile: '20-45 anni | Feste di laurea (Bocconi, Cattolica, Politecnico, Statale), compleanni e pubblico chic di Sempione',
      bestNights: 'Dal Martedi alla Domenica: Ven/Sab Dinner Show & Studio 55, Gio Lauree & Compleanni, Dom Fiesta Latina',
      nearestMetro: 'M5 Lilla Domodossola FN oppure Gerusalemme (5 minuti a piedi fino a Via Piero della Francesca 55)',
      pricingTable: [
        { zone: 'Tavolo Riservato Apericena XL (19:30-22:30)', price: '€20 - €35 / persona', details: 'Area divanetti riservata, Royal Buffet illimitato, 1 drink o vino e gestione torta' },
        { zone: 'Cena Cantata Dinner Show Servita (20:30-23:30)', price: '€50 - €70 / persona', details: 'Menu servito completo con vino, live show musicale ai tavoli e serata inclusa' },
        { zone: 'Tavolo VIP Bottiglia Dopocena (23:00-03:00)', price: '€200 - €450 (6-10 persone)', details: '100% spendibile in bottiglie di superalcolico o champagne con fontane luminose' },
      ],
      insiderTips: [
        'Con i suoi 1.000 mq modulabili, il 55 Milano e il locale n.1 per organizzare Feste di Laurea da 15 a 80 invitati con area privata, buffet e taglio torta.',
        'Dopo una partita a San Siro arrivi in 6 minuti con la Metro M5 Lilla (fermata Domodossola o Gerusalemme) per cenare e brindare in compagnia.',
      ],
      faqs: [
        {
          q: 'Quanto costa organizzare una Festa di Laurea o Compleanno al 55 Milano?',
          a: 'La formula Area Riservata Royal Apericena costa 20-35€ a persona (19:30-22:30) con buffet e drink; la formula Combo Apericena + Bottiglie Dopocena costa circa 35-50€ a persona.',
        },
        {
          q: 'In quali giorni e aperto il 55 Milano?',
          a: 'Il 55 Milano e aperto 6 sere a settimana, dal Martedi alla Domenica dalle 19:30 alle 03:00, in Via Piero della Francesca 55.',
        },
      ],
    },
  },
  'v-repvblic': {
    en: {
      tagline: 'Piazza della Repubblica 12 | International Hits, House, Hip-Hop, Dirty Monday & Confirmed NYE 2027',
      highlights: [
        'Central location at Piazza della Repubblica, 12 (20124 Milano, steps from M3 Repubblica & Porta Nuova)',
        'Confirmed New Year’s Eve 2027 (Dec 31 from 23:00 till morning): Early Bird €45 (flûte + 1 drink), Dancefloor Table €600 (6 guests), Privé €1,200 (10 guests)',
        'Home of Milan’s iconic Monday night party: Dirty Monday (Rock n Roll, Hip-Hop & House)',
        'International crowd and DJ selection spanning International Hits, Hip Hop & House until morning',
      ],
      musicStyle: 'International Hits, House, Hip-Hop & Dirty Monday Mashups',
      crowdProfile: '21-36 | International guests, models, creatives & nocturnal clubbers',
      bestNights: 'Monday (Dirty Monday), Friday & Saturday (23:00 till morning) + New Year’s Eve Dec 31',
      nearestMetro: 'M3 Yellow Line Repubblica (1 min walk) or M2 Gioia',
      pricingTable: [
        { zone: 'NYE 2027 · Early Bird (Dec 31 from 23:00)', price: '€45 / person', details: 'Confirmed NYE admission with midnight countdown flûte + 1 drink included' },
        { zone: 'NYE 2027 · Dancefloor Table Zone', price: '€600 (6 guests)', details: 'Reserved table right in the heart of the party (confirmed Dec 31 rate)' },
        { zone: 'NYE 2027 · Privé Table Zone', price: '€1,200 (10 guests)', details: 'Reserved table in our exclusive VIP Privé area (confirmed Dec 31 rate)' },
        { zone: 'Weekly VIP Tables & Guest List', price: '€15–€25 Entry · €250–€900 Tables', details: 'Weekly Monday/Weekend admissions and bottle service in Piazza della Repubblica 12' },
      ],
      insiderTips: [
        'For New Year’s Eve (December 31, 2026), doors open at 23:00 with midnight countdown toast, international hits, hip hop, and house until morning.',
        'Book your Early Bird pass (€45) or VIP table (€600 Dancefloor / €1,200 Privé) via WhatsApp (+39 351 912 7047) for Piazza della Repubblica, 12.',
      ],
      faqs: [
        {
          q: 'Where is REPVBLIC Milano and what is planned for New Year’s Eve 2027?',
          a: 'REPVBLIC Milano is at Piazza della Repubblica, 12 (20124 Milano). On December 31 from 23:00 till morning it hosts NEW YEAR’S EVE AT REPVBLIC MILANO with international hits, hip hop & house, Early Bird €45 (flûte + 1 drink), Dancefloor Table €600 (6 guests) and Privé Table €1,200 (10 guests).',
        },
        {
          q: 'What is Dirty Monday at REPVBLIC Milano?',
          a: 'Dirty Monday is Milan’s signature Monday night party at REPVBLIC (Piazza della Repubblica 12), running from 23:00 with rock, hip-hop, and house music for models, creatives, and an international crowd.',
        },
      ],
    },
    it: {
      tagline: 'Piazza della Repubblica 12 | Hit Internazionali, House, Hip-Hop, Dirty Monday e Capodanno 2027 Ufficiale',
      highlights: [
        'Indirizzo ufficiale: Piazza della Repubblica, 12, 20124 Milano (1 minuto da M3 Repubblica e Porta Nuova)',
        'Capodanno 2027 confermato (31 dicembre dalle 23:00 al mattino): Early Bird 45€ (flûte + 1 drink), Tavolo Dancefloor 600€ (6 pax), Privé 1.200€ (10 pax)',
        'Casa della serata del lunedì più famosa d’Italia: Dirty Monday (Rock n Roll, Urban & Fashion Party)',
        'Selezione musicale tra hit internazionali, hip hop e house fino al mattino con pubblico da tutto il mondo',
      ],
      musicStyle: 'Hit Internazionali, House, Hip-Hop e Rock/Pop Mashup (Dirty Monday)',
      crowdProfile: '21-36 anni | Pubblico internazionale, modelle, addetti ai lavori della moda e clubber',
      bestNights: 'Lunedì (Dirty Monday), Venerdì, Sabato e Capodanno 2027 (dalle 23:00 al mattino)',
      nearestMetro: 'M3 Gialla Repubblica (1 minuto a piedi) oppure M2 Gioia',
      pricingTable: [
        { zone: 'Capodanno 2027 · Early Bird (31 Dic dalle 23:00)', price: '45€ a persona', details: 'Ingresso ufficiale con flûte per il brindisi di mezzanotte e un drink inclusi' },
        { zone: 'Capodanno 2027 · Tavolo Zona Dancefloor', price: '600€ per 6 persone', details: 'Tavolo riservato nel cuore della festa con servizio bottiglie' },
        { zone: 'Capodanno 2027 · Tavolo Zona Privé', price: '1.200€ per 10 persone', details: 'Tavolo riservato nella nostra esclusiva area VIP' },
        { zone: 'Serate Settimanali (Lista & Tavoli)', price: '15–25€ Lista · 250–900€ Tavoli', details: 'Programmazione Lunedì Dirty Monday e weekend in Piazza della Repubblica 12' },
      ],
      insiderTips: [
        'A Capodanno (31 dicembre), REPVBLIC ti aspetta dalle 23:00 per il countdown, i calici alzati a mezzanotte e poi in pista fino al mattino tra hit internazionali, hip hop e house.',
        'Prenota Early Bird (45€) o Tavoli (600€ Dancefloor / 1.200€ Privé) su WhatsApp (+39 351 912 7047) indicando l’ingresso in Piazza della Repubblica 12.',
      ],
      faqs: [
        {
          q: 'Dove si trova REPVBLIC Milano e cosa prevede il Capodanno 2027?',
          a: 'REPVBLIC Milano si trova in Piazza della Repubblica 12, Milano. Il 31 dicembre dalle 23:00 al mattino propone hit internazionali, hip hop e house: Early Bird 45€ (flûte + 1 drink), Tavolo Zona Dancefloor 600€ (6 persone) e Tavolo Zona Privé 1.200€ (10 persone).',
        },
        {
          q: 'Cos’è il Dirty Monday del REPVBLIC Milano?',
          a: 'Il Dirty Monday è la celebre serata del lunedì notte al REPVBLIC (Piazza della Repubblica 12): ogni lunedì dalle 23:00 ospita pubblico internazionale, creativi e addetti ai lavori tra rock, hip-hop e house.',
        },
      ],
    },
  },
  'v-gattopardo': {
    en: {
      tagline: 'Deconsecrated Church Club in Sempione | Royal Aperitivo, Dinner Show & Chandelier VIP Tables',
      highlights: [
        'Housed inside a historic early-1900s deconsecrated church at Via Piero della Francesca 47 crowned by a monumental crystal chandelier',
        'Two-level VIP table architecture: main nave dancefloor beneath the arches and elevated apse mezzanine privé',
        'Weekly aperitivo & club formats every Friday and Saturday plus university / corporate private events',
        'Confirmed New Year’s Eve 2027 VIP tables from €600 per person minimum spend (100% bottle spending credit inside the venue)',
      ],
      musicStyle: 'Theatrical Dinner Show, Vocal House, Commercial Dance & 90s/2000s Sing-Along Anthems',
      crowdProfile: '23-45 | Smart Milanese locals, university graduates, international guests & upscale group celebrations',
      bestNights: 'Friday & Saturday Theatrical Aperitivo (20:00), Dinner Show & Clubbing + New Year’s Eve Dec 31 Gala (22:30-05:00)',
      nearestMetro: 'M5 Purple Line Gerusalemme or Domodossola FN (3 min walk to Via Piero della Francesca 47)',
      pricingTable: [
        { zone: 'Royal Aperitivo Buffet (from 20:00)', price: '€20 - €25 / person', details: 'Reserved table for aperitivo beneath the frescoed church arches with 1 drink included' },
        { zone: 'Evening Club Admission (Guestlist / Door)', price: 'From €20 / €28 - €33', details: 'Weekend club entry with 1 drink included via nominal concierge accreditation' },
        { zone: 'Main Nave Dancefloor VIP Table', price: '€300 - €500 (5-8 guests)', details: '100% minimum spending credit in bottles directly under the central crystal chandelier' },
        { zone: 'Elevated Apse Mezzanine Privé', price: '€600 - €1,200 (8-12 guests)', details: 'Panoramic mezzanine VIP tables overlooking the entire deconsecrated nave' },
        { zone: 'New Year’s Eve 2027 (Dec 31 · 22:30-05:00)', price: '€600 / person min. spend', details: '100% prepayment covering priority entry and full venue bottle spending credit' },
      ],
      insiderTips: [
        'Door policy is strictly sartorial at Il Gattopardo: collared shirt recommended for men, no sportswear, hoodies, or ripped denim.',
        'For graduation parties or groups of 8-20 friends, combine the 20:00 Royal Aperitivo table with an Elevated Mezzanine Privé upgrade before 23:30.',
      ],
      faqs: [
        {
          q: 'How much are entry prices and VIP tables at Il Gattopardo Milan?',
          a: 'Weekly Royal Aperitivo starts at €20-€25 and club admission starts from €20; weekend Main Nave VIP tables run €300-€500 while Mezzanine Privé tables range €600-€1,200 (all 100% bottle credit). On New Year’s Eve (Dec 31), VIP tables are €600 per person minimum spend.',
        },
        {
          q: 'What is the dress code for Il Gattopardo Milan?',
          a: 'Smart Evening / Collared Chic: men are expected to wear a collared shirt or smart jacket with leather shoes or clean dress sneakers; athletic wear and shorts are refused at the door.',
        },
      ],
    },
    it: {
      tagline: 'Discoteca in Ex Chiesa Sconsacrata (Sempione) | Royal Aperitivo, Dinner Show & Tavoli sotto il Lampadario',
      highlights: [
        'Ospitato in una suggestiva chiesa sconsacrata di inizio Novecento in Via Piero della Francesca 47 con lampadario monumentale di cristallo',
        'Due livelli per i tavoli VIP: navata centrale in pista e balconata rialzata nell’abside',
        'Programmazione settimanale ogni Venerdì e Sabato tra aperitivo, dinner show e club fino alle 04:30',
        'Capodanno 2027 confermato: tavoli VIP ufficiali da 600€ a persona di minimum spending',
      ],
      musicStyle: 'Dinner Show Scenografico, Vocal House, Commercial Dance e Hit Cantate 90/2000',
      crowdProfile: '23-45 anni | Pubblico milanese curato, feste di laurea, compleanni eleganti e clientela internazionale',
      bestNights: 'Venerdì e Sabato (Aperitivo dalle 20:00, Cena Spettacolo e Club) + Capodanno 31 Dicembre (22:30-05:00)',
      nearestMetro: 'M5 Lilla Gerusalemme o Domodossola FN (3 minuti a piedi da Via Piero della Francesca 47)',
      pricingTable: [
        { zone: 'Royal Aperitivo & Tavolo d’Appoggio (dalle 20:00)', price: '20€ - 25€ / persona', details: 'Tavolo riservato sotto le volte affrescate con buffet curato e 1 drink incluso' },
        { zone: 'Ingresso Serata / Dopocena (Lista o Porta)', price: 'Da 20€ / 28€ - 33€', details: 'Accesso discoteca nel weekend con accredito nominale via Concierge' },
        { zone: 'Tavolo VIP Navata Centrale (Pista)', price: '300€ - 500€ (5-8 ospiti)', details: '100% credito spendibile al tavolo direttamente sotto il grande lampadario di cristallo' },
        { zone: 'Tavolo Balconata Privé Abside', price: '600€ - 1.200€ (8-12 ospiti)', details: 'Area panoramica rialzata con vista privilegiata su tutta la navata centrale' },
        { zone: 'Capodanno 2027 (31 Dicembre · 22:30-05:00)', price: '600€ a persona min. spending', details: 'Prepagamento 100% comprensivo di booking, ingresso prioritario e credito al tavolo' },
      ],
      insiderTips: [
        'Il dress code al Gattopardo è elegante con selezione curata: camicia con colletto per gli uomini, scarpe curate e niente abbigliamento sportivo.',
        'Per feste di laurea o gruppi da 8 a 20 ospiti, prenota il tavolo dalle 20:30 per l’aperitivo in navata mantenendo l’opzione bottiglia per il dopocena.',
      ],
      faqs: [
        {
          q: 'Quanto costano ingresso e tavoli VIP al Gattopardo Milano?',
          a: 'Nel weekend il Royal Aperitivo parte da 20-25€ e l’ingresso club da 20€; i tavoli in navata partono da 300-500€ mentre la Balconata Privé va da 600€ a 1.200€ spendibili in bottiglie. Per Capodanno 2027 il listino ufficiale partner è 600€ a persona di minimum spending.',
        },
        {
          q: 'Qual è il dress code richiesto al Gattopardo Milano?',
          a: 'Elegante / Smart Chic rigoroso: per uomo è consigliata camicia con colletto (niente felpe sportive, tute o jeans troppo strappati). La prenotazione nominale su WhatsApp +39 351 912 7047 accelera l’ingresso.',
        },
      ],
    },
  },
  'v-philipps': {
    en: {
      tagline: "Philipp Plein's Luxury Restaurant, Theatrical Dinner Show & Midnight Club Inside The Plein Hotel (Via Daniele Manin 21)",
      highlights: [
        "Set inside historic Palazzo Melzi d'Eril (The Plein Hotel, Via Daniele Manin 21) facing Giardini Montanelli between Brera and Porta Venezia",
        "The Philipp's Show (Wed-Sun from 20:00): Italian haute cuisine by Executive Chef Roberto Conti paired with live singers and choreographed performers at 21:45",
        'Full 6-night club calendar (00:00-04:30): Tue From Brasil to Milan, Wed Tussy, Thu Saint, Fri ClubForLife, Sat Konekt, Sun Sweetie',
        'Crystal chandeliers, hexagonal PP gold monograms, mirrored mezzanine privé, and luminous Dom Pérignon bottle parades',
      ],
      musicStyle: 'Theatrical Live Vocal Show during Dinner (20:00-00:00) · Luxury Vocal House, Afro-House, Hip-Hop & R&B (00:00-04:30)',
      crowdProfile: '23-45 | Fashion Week designers, international hotel guests, models, athletes & luxury VIP table clientele',
      bestNights: "Tue Brasilian Dinner & From Brasil to Milan · Wed Tussy · Thu Saint · Fri ClubForLife · Sat Konekt · Sun Sweetie",
      nearestMetro: 'M3 Yellow Line Turati (180 m, 2 min walk) or M1 Red Line Palestro (450 m) to Via Daniele Manin 21',
      pricingTable: [
        { zone: "The Philipp's Show · Fine Dining & Live Show (20:00)", price: 'Concierge Reservation', details: 'Executive Chef Roberto Conti menu with live theatrical show at 21:45 & direct midnight club transition' },
        { zone: 'Brasilian Dinner Show (Every Tuesday 20:00)', price: 'Concierge Reservation', details: 'Signature Tuesday Brazilian dining & live show followed by From Brasil to Milan club night' },
        { zone: 'Chandelier Floor VIP Table (00:00-04:30)', price: 'On Concierge Quote (100% bottle credit)', details: 'Central velvet booth under crystal chandeliers with skip-the-line hostess escort' },
        { zone: 'Mirrored Mezzanine & DJ Console Super VIP', price: 'On Concierge Quote (Magnum / Dom Pérignon)', details: 'Elevated private mezzanine & console-side tables inside The Plein Hotel' },
      ],
      insiderTips: [
        "Booking the 20:00 Dinner Show table is the smartest insider move at Philipp's Milano: you enjoy Chef Roberto Conti's cuisine and the 21:45 live show while already inside before the midnight velvet-rope selection.",
        'Door selection is strictly Haute Couture & Tailored Elegance: men must wear a collared shirt, blazer, and dress shoes (zero athletic sportswear or caps).',
      ],
      faqs: [
        {
          q: "Where is Philipp's Milano (Philipp Plein Club) located and how does the evening work?",
          a: "Philipp's Milano is located inside The Plein Hotel at Via Daniele Manin 21 (Palazzo Melzi d'Eril, 180 m from M3 Turati). Doors open at 20:00 for restaurant service and The Philipp's Show (live performance at 21:45), transforming from midnight until 04:30 into a luxury nightclub.",
        },
        {
          q: "What are the weekly events at Philipp's Milano in 2026/2027?",
          a: "Philipp's runs Tuesday (Brasilian Dinner Show + From Brasil to Milan), Wednesday (Tussy), Thursday (Saint), Friday (ClubForLife), Saturday (Konekt), and Sunday (Sweetie Urban Night), plus The Philipp's Show dinner performance Wednesday through Sunday.",
        },
        {
          q: "How do I book a Dinner Show table or VIP bottle table at Philipp's Milano?",
          a: "Message the Nightlife Milan Concierge on WhatsApp at +39 351 912 7047 with your preferred date, guest count, and formula (20:00 Dinner Show or 00:00 VIP Club Table) to receive live availability and floorplan options.",
        },
      ],
    },
    it: {
      tagline: 'Ristorante, Dinner Show Teatrale e Luxury Club di Philipp Plein dentro The Plein Hotel (Via Daniele Manin 21)',
      highlights: [
        "Ospitato nello storico Palazzo Melzi d'Eril (The Plein Hotel, Via Daniele Manin 21) di fronte ai Giardini Montanelli tra Brera e Porta Venezia",
        "The Philipp's Show (Mer-Dom dalle 20:00): alta cucina dell'Executive Chef Roberto Conti con cantanti e corpo di ballo live dalle 21:45",
        '6 notti di programmazione club (00:00-04:30): Mar From Brasil to Milan, Mer Tussy, Gio Saint, Ven ClubForLife, Sab Konekt, Dom Sweetie',
        'Lampadari di cristallo, monogrammi esagonali PP in oro, mezzanino specchiato privé e bottle parade Dom Pérignon',
      ],
      musicStyle: 'Live Show Vocale durante la Cena (20:00-00:00) · Luxury Vocal House, Afro-House, Hip-Hop e R&B (00:00-04:30)',
      crowdProfile: '23-45 anni | Stilisti e ospiti Fashion Week, clientela 5 stelle, modelle, calciatori e gruppi VIP internazionali',
      bestNights: "Mar Brasilian Dinner & From Brasil to Milan · Mer Tussy · Gio Saint · Ven ClubForLife · Sab Konekt · Dom Sweetie",
      nearestMetro: 'M3 Gialla Turati (180 m, 2 min a piedi) oppure M1 Rossa Palestro (450 m) fino a Via Daniele Manin 21',
      pricingTable: [
        { zone: "The Philipp's Show · Cena & Spettacolo Live (ore 20:00)", price: 'Prenotazione Concierge', details: 'Cucina Executive Chef Roberto Conti, live show ore 21:45 e passaggio diretto al club di mezzanotte' },
        { zone: 'Brasilian Dinner Show (Ogni Martedì ore 20:00)', price: 'Prenotazione Concierge', details: 'Cena spettacolo brasiliana seguita a mezzanotte dal party From Brasil to Milan' },
        { zone: 'Tavolo VIP Pista Lampadari (00:00-04:30)', price: 'Su quotazione Concierge (100% credito bottiglie)', details: 'Divanetto riservato in velluto sotto i lampadari di cristallo con accoglienza hostess' },
        { zone: 'Mezzanino Specchiato & Super VIP Console', price: 'Su quotazione Concierge (Magnum / Dom Pérignon)', details: 'Area privata sopraelevata e postazioni a contatto con la console DJ' },
      ],
      insiderTips: [
        "Prenotare il tavolo per The Philipp's Show alle 20:00 permette di godersi la cena firmata dallo Chef Roberto Conti e lo spettacolo delle 21:45 trovandosi già all'interno prima della selezione di mezzanotte.",
        'Selezione rigorosamente Haute Couture & Sartoriale: camicia, blazer e scarpe eleganti obbligatori per gli uomini.',
      ],
      faqs: [
        {
          q: "Dove si trova il Philipp's Milano di Philipp Plein e come si svolge la serata?",
          a: "Il Philipp's Milano si trova dentro The Plein Hotel in Via Daniele Manin 21 (Palazzo Melzi d'Eril, a 180 m da M3 Turati). Apre alle 20:00 per ristorante e cena spettacolo The Philipp's Show (live show alle 21:45) e da mezzanotte alle 04:30 diventa luxury club.",
        },
        {
          q: "Quali sono tutte le serate settimanali del Philipp's Milano?",
          a: "La programmazione ufficiale prevede Martedì (Brasilian Dinner Show + From Brasil to Milan), Mercoledì (Tussy), Giovedì (Saint), Venerdì (ClubForLife), Sabato (Konekt) e Domenica (Sweetie), oltre a The Philipp's Show dal mercoledì alla domenica.",
        },
        {
          q: "Come si prenota la cena spettacolo o un Tavolo VIP al Philipp's Milano?",
          a: "Scrivi al Concierge Nightlife Milan su WhatsApp al +39 351 912 7047 indicando data, numero di ospiti e formula scelta (Cena Spettacolo ore 20:00 o Tavolo VIP Club ore 00:00) per ricevere disponibilità in tempo reale.",
        },
      ],
    },
  },
  'v-theclub': {
    en: {
      tagline: 'Historic Brera & Moscova Nightlife Icon | 5 Weekly Formats (Wed-Sun), International Crowd & VIP Bottle Service Since 2005',
      highlights: [
        'Prime central location at Corso Garibaldi 97 (120 m from M2 Moscova) in the heart of Brera / Corso Como',
        '5 iconic weekly nights (23:30-05:30): Wed ONE TWO, Thu ATLANTA, Fri FIRST CLASS, Sat GIRLS REPUBLIC, Sun SUPERBE',
        'Special Holiday Opening on Monday 7 December 2026 (Sant’Ambrogio Night, pre-sale €15W / €25M, tables from €400)',
        'Three distinct VIP table tiers: Main Dancefloor, Privé Lato Consolle & Super VIP Backstage',
      ],
      musicStyle: 'Hip-Hop, Trap, Reggaeton, R&B, Vocal House & International Party Anthems',
      crowdProfile: '18-35 | International fashion models, university students, Erasmus crowd, athletes & VIP bottle groups',
      bestNights: 'Wed One Two (Hip-Hop) · Thu Atlanta · Fri First Class · Sat Girls Republic · Sun Superbe + Dec 7 Sant’Ambrogio & NYE 2027',
      nearestMetro: 'M2 Green Line Moscova (120 m, 2 min walk to Corso Garibaldi 97) or M2 Lanza Brera',
      pricingTable: [
        { zone: 'Pre-Sale / Accredited Entry (23:30-01:00)', price: '€15 Woman / €20 - €25 Man', details: 'Includes 1 drink; confirm weekly or holiday entry options via WhatsApp Concierge' },
        { zone: 'Dancefloor VIP Table (Pista)', price: 'From €400 (max 10-12 guests)', details: 'Includes 2 standard spirit bottles with mixers & priority skip-the-line admission' },
        { zone: 'Privé Lato Consolle Table', price: 'From €440 - €500 (max 10-12 guests)', details: 'Elevated console-side booth with 2 bottles included & dedicated table service' },
        { zone: 'Super VIP Backstage / Console', price: 'From €600 - €1,200', details: 'Prime stage-level booth right behind the DJ for Magnum & Champagne bottle parades' },
      ],
      insiderTips: [
        'Wednesday ONE TWO and Sunday SUPERBE are Milan’s two longest-running urban/hip-hop benchmarks, while Thursday ATLANTA draws the largest international student and model crowd in Brera.',
        'For groups of men on Friday (First Class), Saturday (Girls Republic), or Monday Dec 7 (Sant’Ambrogio), booking a €400-€440 table guarantees fast-track entry.',
      ],
      faqs: [
        {
          q: 'What are the weekly nights at The Club Milano (Corso Garibaldi 97)?',
          a: 'The Club Milano runs 5 flagship nights from 23:30 to 05:30: Wednesday ONE TWO (Hip-Hop), Thursday ATLANTA (International since 2005), Friday FIRST CLASS (Fashion & House/Hip-Hop), Saturday GIRLS REPUBLIC, and Sunday SUPERBE (Hip-Hop, Trap, Reggaeton), plus special holiday openings like Sant’Ambrogio (Mon Dec 7) and NYE 2027.',
        },
        {
          q: 'How much does a VIP table cost at The Club Milano in 2026/2027?',
          a: 'Verified table packages start at €400 on the Dancefloor (2 bottles included, up to 10-12 guests), €440 in Privé Lato Consolle (2 bottles), and €600-€1,200 in the Super VIP Console zone.',
        },
      ],
    },
    it: {
      tagline: 'Storica Icona di Brera e Moscova | 5 Format Settimanali (Mer-Dom), Pubblico Internazionale e Tavoli VIP dal 2005',
      highlights: [
        'Posizione centrale in Corso Garibaldi 97 (a 120 m da M2 Moscova) tra Brera, Largo La Foppa e Corso Como',
        '5 serate iconiche a settimana (23:30-05:30): Mer ONE TWO, Gio ATLANTA, Ven FIRST CLASS, Sab GIRLS REPUBLIC, Dom SUPERBE',
        'Apertura speciale Sant’Ambrogio Lunedì 7 Dicembre 2026 (prevendita 15€ Donna / 25€ Uomo, tavoli da 400€ con 2 bottiglie)',
        'Tre anelli VIP: Tavoli Pista, Privé Lato Consolle e Super VIP Backstage',
      ],
      musicStyle: 'Hip-Hop, Trap, Reggaeton, R&B, Vocal House e Hit Internazionali',
      crowdProfile: '18-35 anni | Modelle internazionali, universitari Bocconi/Cattolica/IULM, calciatori e gruppi Tavoli VIP',
      bestNights: 'Mer One Two · Gio Atlanta · Ven First Class · Sab Girls Republic · Dom Superbe + 7 Dicembre Sant’Ambrogio e Capodanno 2027',
      nearestMetro: 'M2 Verde Moscova (120 m, 2 min a piedi fino a Corso Garibaldi 97) oppure M2 Lanza Brera',
      pricingTable: [
        { zone: 'Ingresso Ridotto / Prevendita (23:30-01:00)', price: '15€ Donna / 20€ - 25€ Uomo', details: 'Con 1 drink incluso; verifica formula della serata su WhatsApp +39 351 912 7047' },
        { zone: 'Tavolo Pista (Dancefloor)', price: 'Da 400€ (max 10-12 ospiti)', details: 'Include 2 bottiglie di distillato base, soft drink e ingresso salta-fila prioritario' },
        { zone: 'Tavolo Privé Lato Consolle', price: 'Da 440€ - 500€ (max 10-12 ospiti)', details: 'Postazione rialzata lato console con 2 bottiglie incluse e cameriere dedicato' },
        { zone: 'Tavolo Super VIP Consolle', price: 'Da 600€ - 1.200€', details: 'I tavoli più esclusivi dietro al DJ per formati Magnum e Champagne' },
      ],
      insiderTips: [
        'Il mercoledì ONE TWO e la domenica SUPERBE sono i due format Hip-Hop/Urban più longevi di Milano, mentre il giovedì ATLANTA riunisce dal 2005 il pubblico internazionale di Brera.',
        'Per gruppi di soli ragazzi il venerdì, sabato o nella notte di Sant’Ambrogio (7 dicembre), prenotare un tavolo da 400-440€ garantisce ingresso prioritario.',
      ],
      faqs: [
        {
          q: 'Quali sono tutte le serate settimanali del The Club Milano in Corso Garibaldi 97?',
          a: 'Il The Club Milano è aperto 5 notti a settimana dalle 23:30 alle 05:30: Mercoledì ONE TWO (Hip-Hop), Giovedì ATLANTA (Internazionale), Venerdì FIRST CLASS, Sabato GIRLS REPUBLIC e Domenica SUPERBE (Hip-Hop, Trap, Reggaeton), oltre all’apertura speciale di Sant’Ambrogio (7 dicembre) e Capodanno 2027.',
        },
        {
          q: 'Quanto costa un Tavolo VIP al The Club Milano nel 2026/2027?',
          a: 'I tavoli Pista partono da 400€ (2 bottiglie incluse, fino a 10-12 persone), il Privé Lato Consolle parte da 440€ (2 bottiglie) e il Super VIP Consolle va da 600€ a 1.200€.',
        },
      ],
    },
  },
  'v-mibmilano': {
    en: {
      tagline: 'Piazza Affari Singing Dinner Show & Nightclub | 300 Meters from Piazza Duomo (Via Gaetano Negri 10)',
      highlights: [
        'Located at Via Gaetano Negri 10 directly opposite Palazzo Mezzanotte (Borsa Italiana) in Piazza Affari, 4 min walk from the Duomo',
        '4 weekly nights: Wed INTERNATIONAL WEEK & Open Wine Bar, Thu JUSTICE x Fastlife, Fri BILLIONS Dinner Show, Sat LOVE AFFAIR Cena Cantata',
        'Sant’Ambrogio Holiday Weekend: Sun 6 Dec ATLANTA @ MIB (DJ Set Babyciaga, €15 w/ 2 drinks) & Mon 7 Dec ONETWO @ MIB (€15 w/ 2 drinks)',
        'Seamless Dinner-to-Club architecture inside a glass-vaulted winter garden that transforms into a central dancefloor at 23:30',
      ],
      musicStyle: 'Live Singing Dinner Show (Fri-Sat 20:00-23:30), Commercial & Vocal House, plus Thu/Holiday Hip-Hop, Reggaeton & Trap',
      crowdProfile: '20-42 | Piazza Affari finance & legal professionals, birthday/bachelorette dinner groups & international students',
      bestNights: 'Wed International Week · Thu Justice · Fri Billions Dinner Show · Sat Love Affair Cena Cantata + Dec 6/7 Specials & NYE 2027 (€160 Gala)',
      nearestMetro: 'M1 Red Line Cordusio (150 m, 2 min walk) or M1 / M3 Duomo (350 m) to Via Gaetano Negri 10',
      pricingTable: [
        { zone: 'Wednesday Open Wine Bar & International Week (from 20:30)', price: '€15 - €20 / person', details: 'Aperitivo with open wine bar followed by international clubbing till 05:00' },
        { zone: 'Thursday JUSTICE Urban Night (from 23:00)', price: '€1 before 01:00 · €15W / €20M after 01:00', details: 'Pre-sale entry with 1 drink after 01:00; Hip-Hop, Reggaeton, Trap & R&B' },
        { zone: 'Fri BILLIONS & Sat LOVE AFFAIR Singing Dinner Show (20:00)', price: '€35 - €55 / person', details: 'Royal Dinner Buffet or Seated Singing Dinner with live performers + full club access' },
        { zone: 'Club VIP Bottle Table (Wed-Sat & Holidays)', price: '€250 - €800 (6-10 guests)', details: '100% bottle spending credit in Dancefloor or Console Privé with skip-the-line entry' },
      ],
      insiderTips: [
        'Want to dine, sing at your table, and dance steps from Piazza Duomo without moving cars at midnight? Book Saturday LOVE AFFAIR or Friday BILLIONS at 20:30.',
        'Don’t miss the double Sant’Ambrogio takeover on Sunday 6 December (ATLANTA @ MIB) and Monday 7 December (ONETWO @ MIB) with €15 pre-sale including 2 drinks.',
      ],
      faqs: [
        {
          q: 'Where is MIB Milano and what are its weekly nights?',
          a: 'MIB Milano is at Via Gaetano Negri 10 (Piazza Affari, 150 m from M1 Cordusio and 350 m from Duomo). Weekly nights: Wednesday INTERNATIONAL WEEK & Open Wine Bar, Thursday JUSTICE (Urban), Friday BILLIONS (Dinner Show & Club), and Saturday LOVE AFFAIR (Cena Cantata & Club).',
        },
        {
          q: 'How does the Cena Cantata (Singing Dinner Show) work at MIB Milano?',
          a: 'Every Friday (BILLIONS) and Saturday (LOVE AFFAIR) from 20:00 to 23:30, guests enjoy either a Royal Dinner Buffet or a multi-course seated dinner animated by live vocalists and saxophonists before the room converts into a club until 05:00.',
        },
      ],
    },
    it: {
      tagline: 'Cena Cantata Spettacolo e Club in Piazza Affari | A 300 Metri dal Duomo di Milano (Via Gaetano Negri 10)',
      highlights: [
        'Indirizzo iconico in Via Gaetano Negri 10 di fronte a Palazzo Mezzanotte (Borsa Italiana) in Piazza Affari, a 4 minuti a piedi dal Duomo',
        '4 serate settimanali: Mer INTERNATIONAL WEEK & Open Wine Bar, Gio JUSTICE x Fastlife, Ven BILLIONS Dinner Show, Sab LOVE AFFAIR Cena Cantata',
        'Ponte di Sant’Ambrogio: Dom 6 Dicembre ATLANTA @ MIB (DJ Set Babyciaga, 15€ con 2 drink) e Lun 7 Dicembre ONETWO @ MIB (15€ con 2 drink)',
        'Giardino d’inverno vetrato che dalle 23:30 si trasforma da ristorante spettacolo in discoteca fino alle 05:00',
      ],
      musicStyle: 'Cena Cantata Italiana Live (Ven-Sab 20:00-23:30), Commerciale & Vocal House, più Giovedì/Festivi Hip-Hop, Reggaeton e Trap',
      crowdProfile: '20-42 anni | Professionisti Piazza Affari, compleanni, lauree, addii al nubilato e pubblico internazionale',
      bestNights: 'Mer International Week · Gio Justice · Ven Billions · Sab Love Affair Cena Cantata + 6/7 Dicembre e Capodanno 2027 (Cenone 160€)',
      nearestMetro: 'M1 Rossa Cordusio (150 m, 2 min a piedi) oppure M1 / M3 Duomo (350 m) fino a Via Gaetano Negri 10',
      pricingTable: [
        { zone: 'Mercoledì Open Wine Bar & International Week (dalle 20:30)', price: '15€ - 20€ / persona', details: 'Aperitivo con formula Open Wine seguito da serata internazionale fino alle 05:00' },
        { zone: 'Giovedì JUSTICE x Fastlife (dalle 23:00)', price: '1€ entro 01:00 · 15€ D / 20€ U dopo 01:00', details: 'Dopo le 01:00 include 1 drink; selezione Hip-Hop, Reggaeton, Trap e R&B' },
        { zone: 'Ven BILLIONS & Sab LOVE AFFAIR Cena Cantata (ore 20:00)', price: '35€ - 55€ / persona', details: 'Royal Buffet riservato o Cena Servita Cantata con live show e discoteca inclusa' },
        { zone: 'Tavolo VIP Dopocena (Pista & Privé Consolle)', price: '250€ - 800€ (6-10 ospiti)', details: '100% credito bottiglie con ingresso prioritario salta-fila in Piazza Affari' },
      ],
      insiderTips: [
        'Per festeggiare compleanni, lauree o addii al nubilato in pieno centro senza spostare le auto a mezzanotte, prenota il sabato LOVE AFFAIR o il venerdì BILLIONS dalle 20:30.',
        'Per il ponte di Sant’Ambrogio doppio evento speciale: Domenica 6/12 ATLANTA @ MIB e Lunedì 7/12 ONETWO @ MIB con prevendita a 15€ e 2 drink inclusi.',
      ],
      faqs: [
        {
          q: 'Dove si trova il MIB Milano e quali sono le sue serate settimanali?',
          a: 'Il MIB Milano si trova in Via Gaetano Negri 10 (Piazza Affari, a 150 m da M1 Cordusio e 350 m dal Duomo). Serate: Mercoledì INTERNATIONAL WEEK & Open Wine Bar, Giovedì JUSTICE, Venerdì BILLIONS Dinner Show e Sabato LOVE AFFAIR Cena Cantata.',
        },
        {
          q: 'Come funziona la Cena Cantata del venerdì e sabato al MIB Milano?',
          a: 'Ogni venerdì (BILLIONS) e sabato (LOVE AFFAIR) dalle 20:00 alle 23:30 puoi scegliere tra Royal Buffet con appoggio o Cena Servita animata da vocalist e musicisti dal vivo, restando poi a ballare fino alle 05:00.',
        },
      ],
    },
  },
  'v-terrazza21': {
    en: {
      tagline: 'Piazza del Duomo #1 Cathedral-View Rooftop | 1st Floor Chef Valerio Braschi, 5th Floor Terrazza MA.RE (2 Michelin Stars) & Nightly DJ Sets',
      highlights: [
        'Unrivalled front-row terrace at Piazza del Duomo 21 overlooking the marble spires of Milan Cathedral and Galleria Vittorio Emanuele II',
        'Dual gastronomic identity: 1st Floor Lounge & Restaurant by Chef Valerio Braschi + 5th Floor Terrazza MA.RE by 2-Michelin-Star Chefs Mario & Remo Capitaneo',
        'Daily Golden-Hour Sunset Aperitivo (from 18:30) transitioning into late-night House & Commercial DJ sets until 02:00-03:30',
        'Confirmed New Year’s Eve 2027 packages from €70 (post-midnight) to €300 (1F Braschi Gala), €380 (5F MA.RE Michelin Gala) & €600-€1,200 private terrace tables',
      ],
      musicStyle: 'Sunset Chill-House & Skyline Lounge (18:30-22:00) · Vocal House & Commercial Elegance DJ Sets (22:30-03:30)',
      crowdProfile: '25-48 | International luxury travellers, couples, Fashion Week executives & celebratory VIP terrace groups',
      bestNights: 'Daily Sunset Aperitivo · Thu Duomo Sunset Lounge · Fri Over Duomo · Sat Skyline Night + NYE 2027 Overlooking Duomo Fireworks',
      nearestMetro: 'M1 Red / M3 Yellow Duomo (direct exit onto Piazza del Duomo 21, 30 meters from the elevator)',
      pricingTable: [
        { zone: 'Golden-Hour Sunset Aperitivo (from 18:30)', price: '€22 - €25 / person', details: 'Signature cocktail + gourmet finger food facing the illuminated Duomo facade' },
        { zone: '1st Floor Dinner (Chef Valerio Braschi)', price: '€85 - €140 / person', details: 'Contemporary Italian menu with Cathedral views and evening DJ transition' },
        { zone: 'Evening Lounge & Terrace VIP Bottle Table', price: '€250 - €1,000 (4-10 guests)', details: '100% bottle credit on the outdoor Duomo balcony or indoor crystal room' },
        { zone: 'New Year’s Eve 2027 (1F Braschi & 5F MA.RE)', price: '€70 - €380 / person', details: 'Official NYE tiers: €70 / €90 toast, €200 buffet, €300 1F Gala, €380 5F 2-Michelin-Star Gala' },
      ],
      insiderTips: [
        'Request an outdoor balustrade table at least 48 hours ahead via WhatsApp (+39 351 912 7047) to watch the sunset light hit the Madonnina spire.',
        'Strict Smart-Elegant dress code applies from 18:30 onwards: collared shirts/blazers for men, chic evening attire for women.',
      ],
      faqs: [
        {
          q: 'How do I book an outdoor Duomo-view table at Terrazza Duomo 21 Milan?',
          a: 'Contact the Nightlife Milan Concierge on WhatsApp at +39 351 912 7047 with your date, preferred time slot (18:30 Sunset Aperitivo, 20:30 Dinner, or 22:30 VIP DJ Table), and guest count.',
        },
        {
          q: 'What is the difference between 1st Floor Terrazza Duomo 21 and 5th Floor Terrazza MA.RE?',
          a: 'At Piazza del Duomo 21, the 1st Floor houses the iconic cocktail lounge, balcony terrace, and restaurant led by Chef Valerio Braschi, while the 5th Floor hosts Terrazza MA.RE curated by Two-Michelin-Star Chefs Mario and Remo Capitaneo.',
        },
      ],
    },
    it: {
      tagline: 'Il Rooftop N.1 in Piazza del Duomo 21 | 1° Piano Chef Valerio Braschi, 5° Piano Terrazza MA.RE (2 Stelle Michelin) e DJ Set Vista Guglie',
      highlights: [
        'Affaccio frontale impareggiabile in Piazza del Duomo 21 sulle guglie marmoree della Cattedrale e sull’ingresso della Galleria Vittorio Emanuele II',
        'Doppia anima gastronomica: 1° Piano Lounge & Ristorante Chef Valerio Braschi + 5° Piano Terrazza MA.RE dei fratelli Mario e Remo Capitaneo (2 Stelle Michelin)',
        'Sunset Aperitivo panoramico tutti i giorni dalle 18:30 seguito da DJ set House e Commerciale fino alle 02:00-03:30',
        'Capodanno 2027 ufficiale confermato da 70€ (dopocena) fino a 300€ (Cena Placé Braschi), 380€ (5° Piano MA.RE) e terrazzino privato 1.200€',
      ],
      musicStyle: 'Sunset Chill-House & Lounge Panoramico (18:30-22:00) · Vocal House e Commercial Elegance (22:30-03:30)',
      crowdProfile: '25-48 anni | Viaggiatori internazionali, coppie, manager, ospiti Fashion Week e tavoli VIP vista Duomo',
      bestNights: 'Tutti i giorni Sunset Aperitivo · Gio Sunset Lounge · Ven Over Duomo · Sab Skyline Night + Capodanno 2027 Vista Fuochi Duomo',
      nearestMetro: 'M1 Rossa / M3 Gialla Duomo (uscita diretta su Piazza del Duomo 21, a 30 metri dall’ingresso)',
      pricingTable: [
        { zone: 'Sunset Aperitivo Vista Guglie (dalle 18:30)', price: '22€ - 25€ / persona', details: 'Signature cocktail con finger food gourmet di fronte alla facciata illuminata del Duomo' },
        { zone: 'Cena Panoramica 1° Piano (Chef Valerio Braschi)', price: '85€ - 140€ / persona', details: 'Percorso contemporaneo vista Cattedrale con permanenza per il DJ set serale' },
        { zone: 'Tavolo VIP Serale Terrazza o Sala Vetrata', price: '250€ - 1.000€ (4-10 ospiti)', details: '100% spendibile in bottiglie premium tra balconata esterna e lounge interna' },
        { zone: 'Capodanno 2027 Ufficiale (1° Piano & 5° Piano MA.RE)', price: '70€ - 380€ / persona', details: 'Anno Nuovo 70€, Brindisi 90€, Buffet 200€, Placé Braschi 300€, 5° Piano MA.RE 380€' },
      ],
      insiderTips: [
        'Richiedi il tavolo sulla balconata esterna almeno 48 ore prima su WhatsApp (+39 351 912 7047) per assicurarti la prima fila sulle guglie al tramonto.',
        'Dress code Smart Elegant rigoroso fin dall’aperitivo: camicia o giacca per l’uomo, vietati shorts e abbigliamento sportivo.',
      ],
      faqs: [
        {
          q: 'Come si prenota un tavolo vista Duomo a Terrazza Duomo 21 Milano?',
          a: 'Scrivi su WhatsApp al +39 351 912 7047 indicando data, fascia oraria (Aperitivo 18:30, Cena 20:30 o Tavolo VIP Dopocena 22:30) e numero di ospiti per ricevere conferma prioritaria.',
        },
        {
          q: 'Qual è la differenza tra il 1° Piano Terrazza Duomo 21 e il 5° Piano Terrazza MA.RE?',
          a: 'In Piazza del Duomo 21 il 1° Piano ospita la storica terrazza cocktail bar con DJ set e la cucina dello Chef Valerio Braschi, mentre il 5° Piano ospita Terrazza MA.RE firmata dagli Chef 2 Stelle Michelin Mario e Remo Capitaneo.',
        },
      ],
    },
  },
  'v-pineta': {
    en: {
      tagline: 'Priority #2 Flagship | Crystal-Chandelier Singing Dinner Show, Dual-Room Clubbing (House & Urban) & Zero-Fee Partner Booking (Via Messina 38)',
      highlights: [
        'Iconic luxury hall at Via Messina 38 (Porta Garibaldi / M5 Cenisio) crowned by monumental crystal chandeliers',
        'Famous Italian Aperitivo Cantato & Singing Dinner Show every Friday and Saturday from 20:30 before midnight clubbing',
        'Two musical souls: Main Crystal Room (Vocal House, Commercial & Sing-Along) + Urban Room (Hip-Hop, Reggaeton & Tr3ndy Society)',
        'Official Moulin Rouge NYE 2027 Partner: €40 Royal Buffet, €40 Club Entry, €160 Seated Gala & €300-€1,500 VIP Tables (zero agency fees)',
      ],
      musicStyle: 'Italian Singing Aperitivo & Dinner Show (20:30-23:30) · Vocal House, Commercial, Reggaeton & Hip-Hop (23:30-05:00)',
      crowdProfile: '20-42 | Stylish Milanese crowd, birthday/graduation celebrations, fashion insiders & VIP bottle tables',
      bestNights: 'Thu Tr3ndy Society · Fri Aperitivo Cantato & Live · Sat Luxury Dinner Show & Club + Moulin Rouge NYE 2027',
      nearestMetro: 'M5 Purple Line Cenisio (180 m, 3 min walk) or Tram 12 & 14 right outside Via Messina 38',
      pricingTable: [
        { zone: 'Singing Aperitivo / Royal Buffet (from 20:30)', price: '€15 - €25 / person', details: 'Reserved table beneath the crystal chandeliers, gourmet buffet, 1 drink & live vocal show' },
        { zone: 'Club Entry via Official Xceed / Guestlist', price: 'From €15 - €20 w/ drink', details: 'Direct zero-fee fast-pass on Xceed (nightlifemilan-1) or WhatsApp accreditation' },
        { zone: 'Main Room & Elevated Privé VIP Tables', price: '€300 - €900 (6-10 guests)', details: '100% bottle spending credit with skip-the-line hostess admission' },
        { zone: 'Moulin Rouge NYE 2027 (Dec 31 · 20:30-05:00)', price: '€40 Buffet/Club · €160 Gala', details: 'Official partner rates: €40 Royal Buffet, €40 Club, €160 Gala (wine 1/3), VIP Tables €300-€1,500' },
      ],
      insiderTips: [
        'Pineta is Milan’s top venue when your group wants both an electric Italian singing dinner at 20:30 and two full dancefloors (Commercial/House + Reggaeton/Hip-Hop) till 05:00.',
        'Book directly via our official Xceed partner link or WhatsApp (+39 351 912 7047) with 0% agency markup.',
      ],
      faqs: [
        {
          q: 'How does the Aperitivo Cantato & Cena Cantata work at Pineta Milano?',
          a: 'Every Friday and Saturday from 20:30 at Via Messina 38, guests dine at reserved tables under crystal chandeliers while live vocalists lead Italian and international sing-along hits, seamlessly converting into a two-room nightclub at 23:30.',
        },
        {
          q: 'What are the official Moulin Rouge NYE 2027 prices at Pineta Club Milano?',
          a: 'Verified partner rates for December 31, 2026 are €40 Royal Buffet (20:30), €40 Club Entry (23:00), €160 Seated Gala Dinner (21:00, 1 wine bottle per 3 guests), and VIP tables from €300 to €1,500.',
        },
      ],
    },
    it: {
      tagline: 'Scelta Top N.2 Partner | Aperitivo e Cena Cantata sotto i Lampadari di Cristallo, Doppia Sala House/Urban e Zero Commissioni (Via Messina 38)',
      highlights: [
        'Salone monumentale in Via Messina 38 (Porta Garibaldi / M5 Cenisio) illuminato da iconici lampadari di cristallo',
        'Celebre Aperitivo Cantato e Cena Spettacolo ogni Venerdì e Sabato dalle 20:30 prima della discoteca',
        'Doppia anima musicale: Main Room (Vocal House, Commerciale e Hit Cantate) + Urban Room (Hip-Hop, Reggaeton e Tr3ndy Society)',
        'Capodanno 2027 Moulin Rouge Partner Ufficiale: Buffet 40€, Solo Club 40€, Cena di Gala 160€ e Tavoli VIP 300-1.500€ a zero commissioni',
      ],
      musicStyle: 'Aperitivo e Cena Cantata Italiana (20:30-23:30) · Vocal House, Commerciale, Reggaeton e Hip-Hop (23:30-05:00)',
      crowdProfile: '20-42 anni | Pubblico milanese elegante, compleanni, feste di laurea, addii al nubilato e tavoli VIP',
      bestNights: 'Gio Tr3ndy Society · Ven Aperitivo Cantato & Live · Sab Saturday Live & Club + Capodanno 2027 Moulin Rouge',
      nearestMetro: 'M5 Lilla Cenisio (180 m, 3 min a piedi) oppure Tram 12 e 14 davanti a Via Messina 38',
      pricingTable: [
        { zone: 'Aperitivo Cantato & Tavolo Riservato (dalle 20:30)', price: '15€ - 25€ / persona', details: 'Tavolo d’appoggio sotto i lampadari di cristallo, royal buffet, 1 drink e show cantato' },
        { zone: 'Ingresso Club Ufficiale Xceed / Lista', price: 'Da 15€ - 20€ con drink', details: 'Salta-fila ufficiale a zero commissioni su Xceed (nightlifemilan-1) o WhatsApp' },
        { zone: 'Tavoli VIP Pista & Privé Rialzato', price: '300€ - 900€ (6-10 ospiti)', details: '100% credito in bottiglie con accoglienza prioritaria hostess' },
        { zone: 'Capodanno 2027 Moulin Rouge (31/12 · 20:30-05:00)', price: '40€ Buffet/Club · 160€ Gala', details: 'Tariffe partner: Royal Buffet 40€, Club 40€, Gala 160€ (vino 1/3), Tavoli VIP 300-1.500€' },
      ],
      insiderTips: [
        'Il Pineta è la scelta n.1 a Milano quando il gruppo vuole unire l’energia della cena cantata italiana alle 20:30 e due vere piste da ballo (House/Commerciale + Urban/Reggaeton) fino alle 05:00.',
        'Prenotando tramite il canale ufficiale Nightlife Milan (Xceed o WhatsApp +39 351 912 7047) paghi il listino puro del locale con 0% commissioni.',
      ],
      faqs: [
        {
          q: 'Come funzionano l’Aperitivo Cantato e la Cena Spettacolo al Pineta Milano?',
          a: 'Ogni venerdì e sabato dalle 20:30 in Via Messina 38 si cena e si canta ai tavoli riservati sotto i lampadari di cristallo con vocalist dal vivo, per poi proseguire dalle 23:30 alle 05:00 nelle due sale club senza cambiare locale.',
        },
        {
          q: 'Quali sono i prezzi ufficiali di Capodanno 2027 Moulin Rouge al Pineta Milano?',
          a: 'Il listino partner confermato per il 31 dicembre 2026 prevede Royal Buffet 40€ (ore 20:30), Solo Club 40€ (ore 23:00), Cena di Gala servita 160€ (ore 21:00 con 1 bottiglia di vino ogni 3 ospiti) e Tavoli VIP da 300€ a 1.500€.',
        },
      ],
    },
  },
  'v-voya': {
    en: {
      tagline: 'Milan’s #1 20th-Floor Panoramic Rooftop (85m High) | Sunset Aperitivo, Skyline Dining & VIP Lounge Overlooking CityLife',
      highlights: [
        'Perched 85 meters high on the 20th floor of Torre WJC (Viale Achille Papa 30) with 360-degree glass walls facing CityLife skyscrapers',
        'Open Tuesday through Sunday for Sunset Aperitivo, À la Carte Skyline Dinner, Sunday Brunch, and panoramic DJ sets',
        'Confirmed Christmas Day Lunch/Dinner (Dec 25: €100 official menu / €120 online checkout)',
        'Confirmed #1 Rooftop New Year’s Eve 2027 (Dec 31: €300 6-course seafood gala + wine 1/4 + fireworks + DJ set till 05:00; €360 online checkout)',
      ],
      musicStyle: 'Panoramic Sunset Deep House, Soulful Vocal House & Upscale Commercial Lounge',
      crowdProfile: '25-48 | International executives, couples, CityLife & Portello residents, stylish birthday & corporate groups',
      bestNights: 'Tue-Sat Rooftop Experience (Sunset Aperitivo, Dinner & DJ Set) · Sun Skyline Brunch + Dec 25 Christmas & Dec 31 NYE Gala',
      nearestMetro: 'M5 Purple Line Portello (400 m, 5 min walk) or M1 Red Line Lotto / QT8 to Viale Achille Papa 30',
      pricingTable: [
        { zone: '20th-Floor Sunset Aperitivo (from 19:00)', price: '€20 - €30 / person', details: 'Reserved panoramic lounge seating, gourmet finger food & signature cocktail at 85m altitude' },
        { zone: 'Panoramic Skyline Dinner (À la Carte)', price: '€65 - €110 / person', details: 'Window-side dining overlooking the illuminated CityLife towers with live DJ transition' },
        { zone: 'Sky Lounge VIP Bottle Table', price: 'From €250 - €800 (6-10 guests)', details: '100% bottle spending credit with priority private-elevator hostess access' },
        { zone: 'NYE 2027 All-Inclusive 6-Course Gala (Dec 31)', price: '€300 (€360 online)', details: '6 seafood courses + lentils, 1 wine bottle per 4, midnight toast, 360° fireworks & DJ till 05:00' },
      ],
      insiderTips: [
        'Window tables facing the Three Towers of CityLife book out 2-3 days in advance on Fridays and Saturdays: message WhatsApp +39 351 912 7047 early to lock the glass-edge row.',
        'Because Voya is fully glass-enclosed and climate-controlled on the 20th floor, you enjoy uninterrupted 360° skyline and fireworks views even in mid-winter.',
      ],
      faqs: [
        {
          q: 'Where is Voya Rooftop Milan located and is it open in winter?',
          a: 'Voya Rooftop is on the 20th floor (85 meters high) at Viale Achille Papa 30 in the Portello / CityLife district (5 min from M5 Portello). Its floor-to-ceiling heated glass lounge operates year-round in every season.',
        },
        {
          q: 'How much is New Year’s Eve 2027 at Voya Rooftop Milan?',
          a: 'The confirmed official single rate is €300 per person including the 6-course gourmet menu, after-midnight cotechino and lentils, 1 bottle of wine every 4 guests, midnight toast, and DJ set until 05:00 (€360 per person via direct online checkout inclusive of Concierge Service & Transaction Fees).',
        },
      ],
    },
    it: {
      tagline: 'Il Rooftop Panoramico N.1 di Milano al 20° Piano (85m) | Aperitivo Vista Skyline, Cena e Tavoli VIP di Fronte a CityLife',
      highlights: [
        'Sospeso a 85 metri d’altezza al 20° piano della Torre WJC (Viale Achille Papa 30) con vetrate a tutta altezza a 360° sui grattacieli di CityLife',
        'Aperto da Martedì a Domenica tra Sunset Aperitivo, Cena Panoramica, Skyline Brunch domenicale e DJ set fino a tarda notte',
        'Pranzo/Cena di Natale confermato (25 Dicembre: menù ufficiale 100€ / acquisto diretto online 120€)',
        'Capodanno Rooftop N.1 di Milano 2027 (31 Dicembre: menù 6 portate di mare 300€ con vino 1/4, fuochi a 360° e DJ set fino alle 05:00; 360€ online)',
      ],
      musicStyle: 'Sunset Deep House, Soulful Vocal House e Commercial Lounge d’Alta Quota',
      crowdProfile: '25-48 anni | Coppie, manager internazionali, compleanni panoramici, lauree ed eventi aziendali',
      bestNights: 'Mar-Sab Rooftop Experience (Aperitivo, Cena & DJ Set) · Dom Skyline Brunch + 25 Dicembre Natale e 31 Dicembre Capodanno',
      nearestMetro: 'M5 Lilla Portello (400 m, 5 min a piedi) oppure M1 Rossa Lotto / QT8 fino a Viale Achille Papa 30',
      pricingTable: [
        { zone: 'Sunset Aperitivo al 20° Piano (dalle 19:00)', price: '20€ - 30€ / persona', details: 'Tavolo panoramico riservato a 85 metri d’altezza con finger food gourmet e 1 cocktail' },
        { zone: 'Cena Panoramica Vista Grattacieli', price: '65€ - 110€ / persona', details: 'Tavolo fronte vetrata sullo skyline illuminato di CityLife con prosecuzione DJ set' },
        { zone: 'Tavolo VIP Sky Lounge (Dopocena)', price: 'Da 250€ - 800€ (6-10 ospiti)', details: '100% credito in bottiglie con salita dedicata in ascensore veloce' },
        { zone: 'Capodanno 2027 Menù Completo 6 Portate (31/12)', price: '300€ (360€ online)', details: '6 portate di mare + cotechino e lenticchie, 1 vino ogni 4, brindisi, fuochi 360° e DJ fino alle 05:00' },
      ],
      insiderTips: [
        'I tavoli attaccati alla vetrata panoramica verso le Tre Torri di CityLife vanno esauriti con 2-3 giorni di anticipo nel weekend: scrivi su WhatsApp al +39 351 912 7047 per bloccare la prima fila.',
        'Essendo interamente vetrato e climatizzato al 20° piano, il Voya garantisce vista totale a 360° sullo skyline e sui fuochi d’artificio anche in pieno inverno.',
      ],
      faqs: [
        {
          q: 'Dove si trova il Voya Rooftop Milano ed è aperto anche in inverno?',
          a: 'Il Voya Rooftop si trova al 20° piano (85 metri d’altezza) in Viale Achille Papa 30, zona Portello / CityLife (a 5 minuti da M5 Portello). Grazie al salone panoramico interamente vetrato e riscaldato è aperto tutto l’anno.',
        },
        {
          q: 'Quanto costa il Capodanno 2027 al Voya Rooftop Milano?',
          a: 'La tariffa unica ufficiale è di 300€ a persona e comprende menù servito a 6 portate di mare, cotechino e lenticchie dopo mezzanotte, 1 bottiglia di vino ogni 4 ospiti, brindisi e DJ set fino alle 05:00 (360€ a persona con acquisto diretto online comprensivo di Servizio di Conciergerie & Transaction Fees).',
        },
      ],
    },
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const venue = getVenueBySlug(slug, locale);

  if (!venue) notFound();

  const name = getLocalizedText(venue.localizedContent.name, locale);
  const rawDescription = getLocalizedText(venue.localizedContent.description, locale);
  const metaDescription = buildClubHighCtrDescription(venue, locale, name, rawDescription);

  const title = buildClubHighCtrTitle(venue, locale, name);

  const authoritySpec = getVenueAuthoritySpec(venue.id);
  const baseKeywords = venueKeywords[venue.id]?.[locale as 'en' | 'it']
    ?? (locale === 'it'
      ? [`${name} milano`, 'prezzi tavoli', 'lista', 'vita notturna milano 2026']
      : [`${name} milan`, 'vip tables prices', 'guestlist', 'milan nightlife 2026']);
  const keywords = Array.from(new Set([...baseKeywords, ...(authoritySpec?.alternateNames || [])]));

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const enSlug = venue.slugs.en;
  const itSlug = venue.slugs.it || enSlug;
  const ogImage = venue.image || venue.gallery?.[0] || '/images/milan-nightclub-luxury-vip-champagne.webp';
  const canonicalSlug = getLocalizedVenueSlug35(venue.id, (locale as LocaleCode) || 'en');
  const canonicalUrl = `${baseUrl}${localePrefix(locale)}/${getLocalizedDir35('clubs', locale)}/${canonicalSlug}`;
  const clubLangAlternates: Record<string, string> = {
    'x-default': `${baseUrl}/${getLocalizedDir35('clubs', 'en')}/${getLocalizedVenueSlug35(venue.id, 'en')}`,
  };
  for (const loc of indexedLocaleCodes) {
    clubLangAlternates[getLocaleDef(loc)!.hreflang] = `${baseUrl}${localePrefix(loc)}/${getLocalizedDir35('clubs', loc)}/${getLocalizedVenueSlug35(venue.id, loc)}`;
  }

  return {
    title,
    description: metaDescription,
    keywords,
    robots: getLocaleDef(locale)?.indexed === false
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: canonicalUrl,
      languages: clubLangAlternates,
    },
    openGraph: {
      title,
      description: metaDescription,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [{
        url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
        width: 1200,
        height: 630,
        alt: locale === 'it'
          ? `${name} Milano | locale notturno, tavoli VIP`
          : `${name} Milan | nightclub, VIP tables`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription,
      images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`],
      site: '@nightlifemilan',
      creator: '@nightlifemilan',
    },
  };
}

export default async function ClubPage({ params }: Props) {
  const { locale, slug } = await params;
  const venue = getVenueBySlug(slug, locale);

  if (!venue) {
    notFound();
  }

  const dict = await getDictionary(locale as 'en' | 'it');
  const t = dict.club;
  
  // Map specific venues to dictionary keys for detailed content
  const dictKeyMap: Record<string, string> = {
    'v-justme': 'justme',
    'v-voya': 'voya',
    'v-pineta': 'pineta',
    'v-aria': 'aria',
    'v-playclub': 'playclub',
    'v-55milano': 'fiftyfive',
    'v-repvblic': 'repvblic',
    'v-11clubroom': '11clubroom',
    'v-church81': 'church81',
    'v-mibmilano': 'mibmilano',
    'v-gattopardo': 'gattopardo',
    'v-terrazza21': 'terrazza21',
    'v-theclub': 'theclub'
  };
  
  const dictKey = dictKeyMap[venue.id];
  const c = dictKey ? (t as any)[dictKey] : null;
  const authoritySpec = getVenueAuthoritySpec(venue.id);
  const name = getLocalizedText(venue.localizedContent.name, locale);
  const cityQualifiedH1 = buildCityQualifiedVenueH1(venue, locale, name);
  const description = getLocalizedText(venue.localizedContent.description, locale).replace(/[\u2014–]/g, ' - ');
  const dressCode = (getLocalizedText(venue.localizedContent.dressCode, locale) || "Smart Casual").replace(/[\u2014–]/g, ' - ');
  const insiderTip = (venue.localizedContent.insiderTip ? getLocalizedText(venue.localizedContent.insiderTip, locale) : '').replace(/[\u2014–]/g, ' - ');

  const editorial: ClubEditorialData | null =
    clubContent[venue.id]?.[locale === 'it' ? 'it' : 'en'] ||
    (authoritySpec
      ? locale === 'it'
        ? {
            tagline: `${authoritySpec.neighborhoodIt} · ${authoritySpec.signatureFactIt}`,
            highlights: [
              authoritySpec.signatureFactIt,
              `Zone & spazi VIP: ${authoritySpec.vipZonesIt}`,
              `Formule ingresso & aperitivo: ${authoritySpec.entryFormulaIt}`,
              `Mobilita rapida: ${authoritySpec.metroIt}`,
            ],
            musicStyle: authoritySpec.soundIt,
            crowdProfile: `${venue.ageRange || '20+'} · ${dressCode}`,
            bestNights: authoritySpec.bestNightsIt,
            nearestMetro: `${authoritySpec.metroIt} · ${authoritySpec.parkingIt}`,
            pricingTable: [
              {
                zone: 'Ingresso / Aperitivo & Formule Serali',
                price: authoritySpec.entryFormulaIt.split(' · ')[0] || authoritySpec.entryFormulaIt,
                details: authoritySpec.entryFormulaIt,
              },
              {
                zone: 'Tavoli VIP & Privé (100% Credito Bottiglie)',
                price: authoritySpec.minSpendIt,
                details: `${authoritySpec.vipZonesIt} · Ingresso prioritario salta-fila incluso`,
              },
            ],
            insiderTips: [
              `Pre-serata consigliato: ${authoritySpec.preClubIt}.`,
              `Prenota tavolo VIP o richiedi disponibilita lista su WhatsApp al +39 351 912 7047 indicando data e numero di persone.`,
            ],
            faqs: [],
          }
        : {
            tagline: `${authoritySpec.neighborhoodEn} · ${authoritySpec.signatureFactEn}`,
            highlights: [
              authoritySpec.signatureFactEn,
              `VIP & lounge zones: ${authoritySpec.vipZonesEn}`,
              `Entry & aperitivo formulas: ${authoritySpec.entryFormulaEn}`,
              `Fast transit access: ${authoritySpec.metroEn}`,
            ],
            musicStyle: authoritySpec.soundEn,
            crowdProfile: `${venue.ageRange || '20+'} · ${dressCode}`,
            bestNights: authoritySpec.bestNightsEn,
            nearestMetro: `${authoritySpec.metroEn} · ${authoritySpec.parkingEn}`,
            pricingTable: [
              {
                zone: 'Entry / Aperitivo & Evening Access',
                price: authoritySpec.entryFormulaEn.split(' · ')[0] || authoritySpec.entryFormulaEn,
                details: authoritySpec.entryFormulaEn,
              },
              {
                zone: 'VIP Tables & Privé (100% Bottle Credit)',
                price: authoritySpec.minSpendEn,
                details: `${authoritySpec.vipZonesEn} · Priority skip-the-line hostess entry included`,
              },
            ],
            insiderTips: [
              `Recommended warm-up: ${authoritySpec.preClubEn}.`,
              `Confirm VIP table floorplans or guestlist availability via WhatsApp at +39 351 912 7047 with your date and group size.`,
            ],
            faqs: [],
          }
      : null);

  const isWhatsAppOnlyVenue = [
    'v-voya', 'v-55milano', 'v-55', 'v-11clubroom', 'v-church81', 'v-mibmilano', 'v-dazi',
    'v-gattopardo', 'v-terrazza21', 'v-theclub', 'v-tocqueville', 'v-alcatraz', 'v-fabrique', 'v-amnesia', 'v-philipps'
  ].includes(venue.id);

  const image = venue.image || venue.gallery?.[0] || '/images/milan-nightclub-luxury-vip-champagne.webp';
  const enhancedGallery = getEnhancedVenueGallery(venue);
  const rawGallery = enhancedGallery.filter((g) => g !== image);
  const gallery = rawGallery.length >= 4 ? rawGallery : enhancedGallery;
  const venueUi = getVenueUi35(locale);
  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const currentVenueSlug = getLocalizedVenueSlug35(venue.slugs.en, (locale as LocaleCode) || 'en');
  const clubsDir = getLocalizedDir35('clubs', locale);
  const canonicalClubUrl = `${baseUrl}${localePrefix(locale)}/${clubsDir}/${currentVenueSlug}`;

  const venueCarouselEvents = resolveVenueEventsForCarousel(venue, locale, canonicalClubUrl);
  const venueTargetProfile = getVenueTargetProfile(venue, locale);
  const venueCelebrations = getVenueCelebrations(venue, locale);
  const venueServices = getVenueServices10(venue, locale);

  const waLink = getConciergeBookingUrl(locale, name, canonicalClubUrl);
  const servicesTags = venue.tags || [venue.category];
  
  const lp = localePrefix(locale);
  const venueEvents = getEventDiscoveryItems(await getAllCalendarEvents(), locale)
    .filter((item) => item.event.venueId === venue.id && !item.event.id.startsWith('weekly-'))
    .map((item) => item.event);
  const futureVenueEvents = venueEvents
    .filter((e) => isUpcomingRome(e.dateISO))
    .sort((a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime());
  const pastVenueEvents = venueEvents
    .filter((e) => !isUpcomingRome(e.dateISO))
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());
  const hasMapUrl = venue.coordinates?.latitude
    ? `https://www.google.com/maps/search/?api=1&query=${venue.coordinates.latitude},${venue.coordinates.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${venue.address.streetAddress} Milano`)}`;
  const embedMapUrl = venue.coordinates?.latitude
    ? `https://www.google.com/maps?q=${venue.coordinates.latitude},${venue.coordinates.longitude}&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(`${name} ${venue.address.streetAddress} Milano`)}&output=embed`;
  const venueMapCopy = getEventVenueCopy((locale as LocaleCode) || 'en');
  const nearbyVenues = getRelatedNearbyVenues(venue, mockVenues, 6);
  const allVenueFaqs = buildVenueAuthorityFaqs(venue, locale, name, dressCode, editorial?.faqs);
  const locCode = (locale as LocaleCode) || 'en';
  const zonesDir = getLocalizedDir35('zones', locCode);
  const guidesDir = getLocalizedDir35('guides', locCode);
  const priorityZoneByVenue: Record<string, string> = {
    'v-aria': 'san-siro',
    'v-voya': 'citylife-portello',
    'v-justme': 'parco-sempione',
    'v-55milano': 'parco-sempione',
    'v-pineta': 'corso-como',
    'v-repvblic': 'corso-como',
    'v-tocqueville': 'corso-como',
    'v-philipps': 'brera',
    'v-theclub': 'brera',
    'v-mibmilano': 'duomo-centro',
    'v-terrazza21': 'duomo-centro',
  };
  const canonicalZoneSlug =
    priorityZoneByVenue[venue.id] ||
    mockZones.find((z) => z.id === venue.zone)?.slug ||
    'corso-como';
  const canonicalZone = mockZones.find((z) => z.slug === canonicalZoneSlug) || mockZones[0];
  const localizedZoneSlug = getLocalizedZoneSlug35(canonicalZoneSlug, locCode);
  const venueDedicatedGuides: Record<string, string[]> = {
    'v-justme': ['g-15', 'g-60'],
    'v-pineta': ['g-16', 'g-60'],
    'v-voya': ['g-18', 'g-rooftops-milan'],
    'v-terrazza21': ['g-32', 'g-rooftops-milan'],
    'v-mibmilano': ['g-31', 'g-60'],
    'v-theclub': ['g-28', 'g-119'],
    'v-philipps': ['g-126', 'g-60'],
    'v-55milano': ['g-19', 'g-60'],
    'v-repvblic': ['g-20', 'g-119'],
    'v-radio-rooftop-bar-milano': ['g-129', 'g-rooftops-milan'],
  };
  const reciprocalGuideIds = Array.from(
    new Set([...(venueDedicatedGuides[venue.id] || []), 'g-dress-code', 'g-vip-bottle-prices', 'g-new-years-eve-2027', 'g-115', 'g-116', 'g-118']),
  ).slice(0, 6);
  const openCapEvent = (() => {
    const matched = getCapodannoEventForClub(venue.slugs.en, name);
    return matched && !matched.closedForNye && !matched.soldOutForNye ? matched : undefined;
  })();
  const nyeBannerCopy = getClubNyeBannerCopy35(locCode);
  const guide118Href = `${lp}/${guidesDir}/${getExistingGuideSlug35('g-118', locCode)}`;
  const reciprocalGuides = reciprocalGuideIds
    .map((gid) => mockGuides.find((g) => g.id === gid))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const jsonLd = generateClubSchema({
    venue,
    locale,
    canonicalUrl: canonicalClubUrl,
    name: cityQualifiedH1,
    description,
    schemaType: authoritySpec?.schemaType,
    alternateNames: authoritySpec?.alternateNames,
    neighborhoodName: locale === 'it' ? authoritySpec?.neighborhoodIt : authoritySpec?.neighborhoodEn,
    hasMapUrl,
    openingHoursSpec: authoritySpec?.openingHoursSpec,
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": canonicalPageUrl(baseUrl, locale, '') },
      { "@type": "ListItem", "position": 2, "name": locale === 'it' ? "Club Milano" : "Milan Clubs", "item": canonicalPageUrl(baseUrl, locale, '/clubs') },
      { "@type": "ListItem", "position": 3, "name": cityQualifiedH1, "item": `${baseUrl}${localePrefix(locale)}/${clubsDir}/${currentVenueSlug}` },
    ],
  };

  const faqLd = allVenueFaqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allVenueFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
      }
    : null;

  const venueEventsLd = futureVenueEvents.length > 0
    ? generateEventListSchema(
        futureVenueEvents.map((event) => ({ event, venue })),
        locale,
        `${tr(locale, 'Upcoming Events at', 'Prossimi Eventi da')} ${name}`,
      )
    : null;

  return (
    <main className="taste-pillar-root bg-[#050505] min-h-screen text-[#F6F1E7] font-sans pb-20">
      <TasteMotionLayer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      {venueEventsLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(venueEventsLd) }} />
      )}
      
      {/* Hero Section */}
      <section className="relative w-full min-h-[540px] lg:h-[68vh] lg:min-h-[560px] flex items-end pt-10 pb-14">
        <div data-hero-backdrop="true" data-no-lightbox="true" className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={name}
            fill
            unoptimized
            quality={92}
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="taste-hero-scrim absolute inset-0" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link href={localePrefix(locale) || '/'} className="inline-flex items-center text-[#EAE3D5] hover:text-[#25D366] transition-colors text-sm font-semibold min-h-[44px]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Link>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8" data-taste-reveal>
            <div className="max-w-3xl">
              <h1 className="font-display font-extrabold text-[#F6F1E7] mb-4 m-0">
                {cityQualifiedH1}
              </h1>
              <p className="text-lg md:text-2xl text-[#EAE3D5] font-light mb-4">
                {(editorial?.tagline || c?.subtitle || description.substring(0, 110) + '...').replace(/[\u2014–]/g, ' - ')}
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                {venue.isManaged && (
                  <span className="px-3 py-1 bg-[#141311] text-[#25D366] text-sm font-semibold inline-flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1.5" />
                    Official Partner
                  </span>
                )}
                <span className="px-3 py-1 bg-[#141311] text-[#EAE3D5] text-sm font-medium">
                  {venue.category.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
            
            <div className="shrink-0 flex flex-col items-start md:items-end gap-1.5">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="taste-btn-primary">
                <MessageCircle className="w-5 h-5" />
                <span>{t.vipAccess}</span>
              </a>
              {isWhatsAppOnlyVenue && (
                <span className="text-sm text-[#C2B9AA]">
                  {tr(locale, 'Available via WhatsApp only', 'Disponibile solo via WhatsApp')}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* QuickInfoBar (Architectural Horizontal Spec Strip — zero icon-cards) */}
      <section id="dress-code-hours" className="bg-[#0B0A09]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 m-0" data-taste-stagger>
            <div className="flex flex-col min-w-0">
              <dt className="text-sm font-semibold text-[#C2B9AA] mb-1.5">
                {t.labels.address}
              </dt>
              <dd className="text-[15px] font-medium text-[#F6F1E7] m-0">{venue.address.streetAddress}</dd>
              {venue.coordinates?.latitude && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${venue.coordinates.latitude},${venue.coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 text-sm text-[#25D366] hover:underline w-fit"
                >
                  {tr(locale, 'Open in Google Maps ↗', 'Apri in Google Maps ↗')}
                </a>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <dt className="text-sm font-semibold text-[#C2B9AA] mb-1.5">
                {t.labels.targetAge}
              </dt>
              <dd className="text-[15px] font-medium text-[#F6F1E7] m-0">{c?.target || venue.ageRange || "18+"}</dd>
            </div>
            <div className="flex flex-col min-w-0">
              <dt className="text-sm font-semibold text-[#C2B9AA] mb-1.5">
                {t.labels.dressCode}
              </dt>
              <dd className="text-[15px] font-medium text-[#F6F1E7] m-0">{dressCode}</dd>
            </div>
            <div className="flex flex-col min-w-0">
              <dt className="text-sm font-semibold text-[#C2B9AA] mb-1.5">
                {t.labels.music}
              </dt>
              <dd className="text-[15px] font-medium text-[#F6F1E7] m-0">{editorial?.musicStyle || c?.music || "House, Commercial & Urban"}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Quick-Jump SEO Anchor Navigation */}
      <nav
        aria-label={tr(locale, 'Venue Sections', 'Sezioni Locale')}
        className="bg-[#F6F1E7] text-[#050505]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-2.5 text-sm font-semibold">
          <a href="#prices-tables" className="px-4 py-2 bg-[#050505] text-[#F6F1E7] hover:bg-[#1F1C18] transition-colors">
            {tr(locale, 'VIP Tables & Prices', 'Tavoli VIP & Prezzi')}
          </a>
          <a href="#dress-code-hours" className="px-4 py-2 bg-[#EAE3D5] text-[#050505] hover:bg-[#050505] hover:text-[#F6F1E7] transition-colors">
            {tr(locale, 'Dress Code & Info', 'Dress Code & Info')}
          </a>
          <a href="#upcoming-events" className="px-4 py-2 bg-[#EAE3D5] text-[#050505] hover:bg-[#050505] hover:text-[#F6F1E7] transition-colors">
            {tr(locale, 'Events Calendar', 'Calendario Eventi')}
          </a>
          <a href="#map-directions" className="px-4 py-2 bg-[#EAE3D5] text-[#050505] hover:bg-[#050505] hover:text-[#F6F1E7] transition-colors">
            {tr(locale, 'Map & Metro', 'Mappa & Metro')}
          </a>
          <a href="#faq" className="px-4 py-2 bg-[#EAE3D5] text-[#050505] hover:bg-[#050505] hover:text-[#F6F1E7] transition-colors">
            {tr(locale, 'FAQ', 'Domande Frequenti')}
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 min-w-0 space-y-16">
          
          {/* Descrizione & Tags */}
          <section data-taste-reveal>
            {/* AI Trafiletto */}
            <div className="mb-6 p-5 bg-[#0B0A09]">
              <p className="font-sans text-[#F6F1E7] text-sm font-semibold mb-2">Quick Answer</p>
              <p className="font-sans text-[#EAE3D5] text-base leading-relaxed">
                {locale === 'it'
                  ? `${name} si trova in ${venue.address.streetAddress}, Milano. ${editorial?.tagline ? editorial.tagline + '. ' : ''}${description.substring(0, 180)}... Prenotazione Tavoli VIP e Liste su WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com.`
                  : `${name} is located at ${venue.address.streetAddress}, Milan. ${editorial?.tagline ? editorial.tagline + '. ' : ''}${description.substring(0, 180)}... Book VIP Tables & Guestlists via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com.`}
              </p>
            </div>

            <p className="text-lg text-[#EAE3D5] leading-relaxed font-light mb-6">
              {description}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {servicesTags.map((tag: string, idx: number) => (
                <span key={idx} className="px-3.5 py-1.5 bg-[#141311] text-[#EAE3D5] text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Editorial Deep-Dive Dossier — NYE 2027 Warm Ivory Architectural Feature */}
          {openCapEvent && (() => {
            const capContent = getCapodannoLocalizedEventContent(openCapEvent, locCode);
            const capTitle = getCapodannoLocalizedEventTitle(openCapEvent, locCode);
            const capSummary = capContent.priceSummary;
            const capHref = capodannoEventPath(openCapEvent.slug, locCode);
            const badgeText = openCapEvent.partner
              ? nyeBannerCopy.partnerBadge
              : nyeBannerCopy.eventBadge;
            return (
              <section className="p-6 sm:p-8 bg-[#F6F1E7] text-[#050505]" data-taste-reveal>
                <h2 className="text-xl md:text-2xl font-display font-bold text-[#050505] mb-2">
                  {capTitle}
                </h2>
                <p className="text-sm font-semibold text-[#3B362E] mb-3">
                  {badgeText}
                </p>
                <p className="text-[15px] text-[#1F1C18] leading-relaxed mb-6">
                  {capSummary}
                </p>
                {capContent.menus && capContent.menus.length > 0 && (
                  <div
                    data-official-menus
                    data-lightbox-group="club-capodanno-menus"
                    className="mb-6 border border-[#050505]/20 bg-[#0B0A09] p-5 text-[#F6F1E7]"
                  >
                    <h3 className="font-display text-xl font-bold text-[#F6F1E7]">
                      {capContent.menusHeading || capContent.menus[0].title}
                    </h3>
                    <div className="mt-4 space-y-6">
                      {capContent.menus.map((menu) => (
                        <div key={menu.id} className="grid gap-6 lg:grid-cols-2 lg:items-start">
                          <div>
                            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/15 pb-2.5">
                              <span className="font-semibold text-sm text-[#EAE3D5]">{menu.title}</span>
                              <span className="bg-[#EAE3D5] px-2.5 py-0.5 text-xs font-bold uppercase text-[#050505]">
                                {menu.price}
                              </span>
                            </div>
                            <dl className="mt-3 space-y-2 text-sm">
                              {menu.courses.map((c) => (
                                <div key={`${menu.id}-${c.course}`} className="border-b border-white/10 pb-1.5 last:border-0">
                                  <dt className="text-xs font-bold uppercase tracking-wider text-[#EAE3D5]">{c.course}</dt>
                                  <dd className="mt-0.5 text-sm leading-relaxed text-[#F6F1E7]">{c.dish}</dd>
                                </div>
                              ))}
                            </dl>
                            <p className="mt-3 border border-white/15 bg-[#050505] p-3 text-xs font-medium text-[#C2B9AA]">
                              {menu.beverages}
                            </p>
                          </div>
                          {menu.imageSrc && (
                            <div className="flex justify-center">
                              <img
                                src={menu.imageSrc}
                                alt={menu.imageAlt}
                                title={menu.title}
                                width={1080}
                                height={1350}
                                loading="lazy"
                                decoding="async"
                                className="aspect-[4/5] w-full max-w-[400px] object-cover"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={capHref}
                    locale={locCode}
                    className="taste-btn-dark text-sm"
                  >
                    {nyeBannerCopy.ctaEvent} →
                  </Link>
                  <Link
                    href={guide118Href}
                    locale={locCode}
                    className="taste-btn-outline-dark text-sm"
                  >
                    {nyeBannerCopy.ctaGuide} →
                  </Link>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="taste-btn-dark text-sm"
                  >
                    {nyeBannerCopy.ctaWa}
                  </a>
                </div>
              </section>
            );
          })()}

          {editorial && (
            <section className="space-y-8 p-6 sm:p-8 bg-[#0B0A09]">
              <div data-taste-reveal>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-[#F6F1E7]">
                  {locale === 'it'
                    ? `Perché Scegliere ${name}: Punti di Forza, Musica e Logistica`
                    : `Why Choose ${name}: Highlights, Music & Logistics`}
                </h2>
                <p className="text-sm font-semibold text-[#C2B9AA] mt-2">
                  {tr(locale, '2026/2027 Verified Club Dossier', 'Dossier Ufficiale Club 2026/2027')}
                </p>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 list-disc pl-5 m-0" data-taste-stagger>
                {editorial.highlights.map((item, i) => (
                  <li key={i} className="text-[15px] text-[#F6F1E7] leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>

              <dl className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 m-0" data-taste-stagger>
                <div className="min-w-0">
                  <dt className="text-[#C2B9AA] text-sm font-semibold mb-1.5">
                    {tr(locale, 'Crowd Profile & Target', 'Target & Pubblico')}
                  </dt>
                  <dd className="text-[15px] text-[#EAE3D5] leading-relaxed m-0">{editorial.crowdProfile}</dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-[#C2B9AA] text-sm font-semibold mb-1.5">
                    {tr(locale, 'Best Nights to Go', 'Serate Migliori')}
                  </dt>
                  <dd className="text-[15px] text-[#EAE3D5] leading-relaxed m-0">{editorial.bestNights}</dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-[#C2B9AA] text-sm font-semibold mb-1.5">
                    {tr(locale, 'Nearest Metro & Fast Arrival', 'Metro Più Vicina & Come Arrivare')}
                  </dt>
                  <dd className="text-[15px] text-[#EAE3D5] leading-relaxed m-0">{editorial.nearestMetro}</dd>
                </div>
              </dl>

              {/* Editorial Pricing Table */}
              <div id="prices-tables" className="scroll-mt-24">
                <h3 className="text-xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-champagne" />
                  {locale === 'it'
                    ? `Listino Ufficiale Tavoli VIP, Privé e Formule Ingresso (${name})`
                    : `Official VIP Table, Privé & Entry Price List (${name})`}
                </h3>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-white/[0.06] border-b border-white/10 text-champagne font-mono text-xs uppercase">
                        <th className="py-3 px-4">{tr(locale, 'Zone / Formula', 'Area / Formula')}</th>
                        <th className="py-3 px-4">{tr(locale, 'Price / Min Spend', 'Prezzo / Minimum Spend')}</th>
                        <th className="py-3 px-4">{tr(locale, 'What is Included', 'Cosa Include')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {editorial.pricingTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="py-3.5 px-4 font-semibold text-white">{row.zone}</td>
                          <td className="py-3.5 px-4 font-mono text-champagne font-bold">{row.price}</td>
                          <td className="py-3.5 px-4 text-white/70">{row.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Editorial Insider Tips */}
              <div className="space-y-2">
                <h3 className="text-lg font-serif font-bold text-champagne">
                  {tr(locale, 'Concierge Insider Tips', 'Consigli Insider del Concierge')}
                </h3>
                <ul className="space-y-2">
                  {editorial.insiderTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-white/75">
                      <Star className="w-4 h-4 text-champagne shrink-0 mt-1" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Insider Tip */}
          {insiderTip && (
            <div className="p-6 border-l-2 border-champagne bg-white/[0.03] rounded-r-xl">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-champagne" />
                <span className="text-champagne font-bold uppercase tracking-widest text-xs">Insider Tip</span>
              </div>
              <p className="text-lg text-white/70 italic font-light leading-relaxed">
                &quot;{insiderTip}&quot;
              </p>
            </div>
          )}

          {/* Upcoming Events at this venue */}
          {futureVenueEvents.length > 0 && (
            <section className="min-w-0">
              <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3" data-taste-reveal>
                <Calendar className="w-6 h-6 text-champagne" />
                {tr(locale, 'Upcoming Events at', 'Prossimi Eventi da')} {name}
              </h2>
              <div className="space-y-3" data-taste-stagger>
                {futureVenueEvents.map((ev) => {
                  const evTitle = getLocalizedText(ev.localizedContent.title, locale).replace(/[\u2014–]/g, ' - ');
                  const evSlug = getLocalizedText(ev.localizedContent.slug, locale);
                  const dateStr = new Intl.DateTimeFormat(locale, {
                    weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/Rome',
                  }).format(new Date(ev.dateISO));
                  const timeStr = new Intl.DateTimeFormat(locale, {
                    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Rome',
                  }).format(new Date(ev.dateISO));
                  return (
                    <Link
                      key={ev.id}
                      href={`${lp}/events/${evSlug}`}
                      className="flex items-center justify-between gap-3 py-3 px-4 bg-[#0B0A09] hover:bg-[#141311] transition-colors group min-w-0 overflow-hidden"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
                        <span className="text-[#EAE3D5] text-[13px] tabular-nums shrink-0">{dateStr}</span>
                        <span className="text-[#F6F1E7] text-sm font-medium truncate group-hover:text-[#25D366] transition-colors min-w-0 block">{evTitle}</span>
                      </div>
                      <span className="text-[#C2B9AA] text-[13px] tabular-nums shrink-0">{timeStr}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Past Events at this venue */}
          {pastVenueEvents.length > 0 && (
            <section className="min-w-0">
              <h2 className="text-2xl font-serif font-bold text-white/60 mb-6 flex items-center gap-3" data-taste-reveal>
                <Clock className="w-6 h-6 text-white/40" />
                {tr(locale, 'Past Events at', 'Eventi Passati da')} {name}
              </h2>
              <div className="space-y-2" data-taste-stagger>
                {pastVenueEvents.slice(0, 12).map((ev) => {
                  const evTitle = getLocalizedText(ev.localizedContent.title, locale).replace(/[\u2014–]/g, ' - ');
                  const evSlug = getLocalizedText(ev.localizedContent.slug, locale);
                  const dateStr = new Intl.DateTimeFormat(locale, {
                    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Rome',
                  }).format(new Date(ev.dateISO));
                  return (
                    <Link
                      key={ev.id}
                      href={`${lp}/events/${evSlug}`}
                      className="flex items-center justify-between gap-3 py-2.5 px-4 bg-[#0B0A09] hover:bg-[#141311] transition-colors group min-w-0 overflow-hidden"
                    >
                      <span className="text-[#C2B9AA] text-sm truncate group-hover:text-[#F6F1E7] transition-colors min-w-0 flex-1 block">{evTitle}</span>
                      <span className="text-[#C2B9AA] text-[13px] tabular-nums shrink-0">{dateStr}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* TheTimeline (3 Acts — Unboxed Couture Noir Time-Ledger) */}
          {c?.acts && (
            <section className="min-w-0">
              <h2 className="text-3xl font-display font-bold text-[#F6F1E7] mb-8" data-taste-reveal>
                {t.timelineTitle}
              </h2>
              <div className="divide-y divide-[#F6F1E7]/12" data-taste-stagger>
                
                {c.acts.map((act: any, idx: number) => {
                  return (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline py-5">
                      <div className="md:col-span-3">
                        <span className="text-sm font-semibold text-[#25D366] tabular-nums">{act.time}</span>
                      </div>
                      <div className="md:col-span-9 min-w-0">
                        <h3 className="font-display font-bold text-[#F6F1E7] text-xl mb-1.5">{act.title}</h3>
                        <p className="text-[#EAE3D5] mb-3 text-[15px] leading-relaxed">{act.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          {act.price.split(' | ').map((p: string, i: number) => (
                            <span key={i} className="inline-block px-3 py-1 bg-[#141311] text-sm text-[#F6F1E7]">{p}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
              
              <div className="mt-8 text-center">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="taste-btn-primary text-sm">
                  {t.bookWa}
                </a>
                {isWhatsAppOnlyVenue && (
                  <div className="text-center mt-2">
                    <span className="text-sm text-[#C2B9AA]">
                      {tr(locale, 'Available via WhatsApp only', 'Disponibile solo via WhatsApp')}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Venue Gallery & More Info */}
          <section className="min-w-0">
            <h2 className="text-2xl font-serif font-bold text-white mb-6" data-taste-reveal>
              {locale === 'it' ? `${name}: Foto & Atmosfera` : `${name}: Photos & Atmosphere`}
            </h2>
            <div data-venue-gallery="true" className="grid grid-cols-2 gap-3 mb-8" data-taste-stagger>
              {gallery.map((src, i) => (
                <div key={i} className="relative aspect-[4/5] w-full overflow-hidden bg-[#0B0A09]">
                  <Image
                    src={src}
                    alt={[
                      `${name} Milan - interior atmosphere and dance floor`,
                      `${name} Milan - VIP tables and bottle service`,
                      `${name} Milan - bar and lounge area`,
                      `${name} Milan - nightclub crowd and DJ set`,
                      `${name} Milan - private room and VIP area`,
                      `${name} Milan - venue entrance and facade`,
                      `${name} Milan - terrace and outdoor space`,
                    ][i] ?? `${name} Milan - venue photo ${i + 1}`}
                    fill
                    unoptimized
                    quality={92}
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 40vw"
                  />
                </div>
              ))}
            </div>
            <div className="p-5 bg-[#0B0A09]" data-taste-reveal>
              <h3 className="font-serif text-lg text-[#F6F1E7] mb-4">
                {tr(locale, 'Practical Information', 'Informazioni Pratiche')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-[15px]">
                <div>
                  <p className="text-[#C2B9AA] text-sm font-semibold mb-1">
                    {tr(locale, 'Address', 'Indirizzo')}
                  </p>
                  <p className="text-[#EAE3D5]">{venue.address.streetAddress}, Milan</p>
                  {venue.coordinates?.latitude && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${venue.coordinates.latitude},${venue.coordinates.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#25D366] hover:underline mt-1 inline-block"
                    >
                      {tr(locale, 'Open in Google Maps ↗', 'Apri in Google Maps ↗')}
                    </a>
                  )}
                </div>
                <div>
                  <p className="text-[#C2B9AA] text-sm font-semibold mb-1">
                    {tr(locale, 'Dress Code', 'Dress Code')}
                  </p>
                  <p className="text-[#EAE3D5]">{dressCode}</p>
                </div>
                <div>
                  <p className="text-[#C2B9AA] text-sm font-semibold mb-1">
                    {tr(locale, 'Booking Desk', 'Prenotazioni Ufficiali')}
                  </p>
                  <p className="text-[#EAE3D5]">WhatsApp +39 351 912 7047 · concierge@nightlifemilan.com</p>
                </div>
                <div>
                  <p className="text-[#C2B9AA] text-sm font-semibold mb-1">
                    {tr(locale, 'Concierge Service', 'Servizio Concierge')}
                  </p>
                  <p className="text-[#EAE3D5]">{tr(locale, 'Free Official Assistance', 'Assistenza Ufficiale Gratuita')}</p>
                </div>
              </div>
            </div>

            <div id="map-directions" className="mt-8 scroll-mt-24">
              <h3 className="font-serif text-xl font-bold text-white mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-champagne" />
                {locale === 'it'
                  ? `Mappa Interattiva & Indicazioni per ${name} (${venue.address.streetAddress})`
                  : `Interactive Map & Directions to ${name} (${venue.address.streetAddress})`}
              </h3>
              {authoritySpec && (
                <p className="text-sm text-white/65 mb-4">
                  {locale === 'it'
                    ? `${authoritySpec.metroIt} · ${authoritySpec.parkingIt}`
                    : `${authoritySpec.metroEn} · ${authoritySpec.parkingEn}`}
                </p>
              )}
              <EventVenueMap
                id={`club-venue-map-${venue.id}`}
                mapUrl={embedMapUrl}
                labels={{
                  loadMap: venueMapCopy.loadMap,
                  mapTitle: venueMapCopy.mapTitle.replace('{venue}', name),
                  privacyLoadNotice: venueMapCopy.privacyLoadNotice,
                }}
              />
            </div>
          </section>

          {/* Venue FAQs (All 33 Venues) */}
          {allVenueFaqs.length > 0 && (
            <section id="faq" className="space-y-4 scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2.5">
                <HelpCircle className="w-6 h-6 text-champagne" />
                {locale === 'it' ? `Domande Frequenti su ${name}` : `Frequently Asked Questions About ${name}`}
              </h2>
              <div className="space-y-4">
                {allVenueFaqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-white/10 bg-white/[0.025]">
                    <h3 className="font-serif text-lg font-semibold text-champagne mb-2">{faq.q}</h3>
                    <p className="text-sm text-white/75 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Sidebar Column */}
        <div className="min-w-0 space-y-8">
          <div className="sticky top-32 space-y-8">
            
            {/* Pricing Table */}
            {c?.pricing ? (
              <div className="bg-[#0B0A09] overflow-hidden" data-taste-reveal>
                <div className="bg-[#141311] p-6">
                  <h3 className="text-xl font-display font-bold text-[#F6F1E7] flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#25D366]" />
                    {t.pricingTitle}
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[#EAE3D5] font-medium">{c.pricing.dancefloor.title}</span>
                      <span className="text-xl font-bold text-[#F6F1E7] tabular-nums">{c.pricing.dancefloor.price}</span>
                    </div>
                    <p className="text-sm text-[#C2B9AA]">{c.pricing.dancefloor.desc}</p>
                  </div>
                  <div className="bg-[#141311] p-4">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[#25D366] font-semibold">
                        {c.pricing.priveGold.title}
                      </span>
                      <span className="text-xl font-bold text-[#F6F1E7] tabular-nums">{c.pricing.priveGold.price}</span>
                    </div>
                    <p className="text-sm text-[#C2B9AA]">{c.pricing.priveGold.desc}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[#F6F1E7] font-bold flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#25D366]" />
                        {c.pricing.priveDiamond.title}
                      </span>
                      <span className="text-xl font-bold text-[#25D366] tabular-nums">{c.pricing.priveDiamond.price}</span>
                    </div>
                    <p className="text-sm text-[#C2B9AA]">{c.pricing.priveDiamond.desc}</p>
                  </div>
                  
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="taste-btn-primary mt-4 w-full">
                    {t.bookWa}
                  </a>
                  {isWhatsAppOnlyVenue && (
                    <div className="text-center mt-2">
                      <span className="text-sm text-[#C2B9AA]">
                        {tr(locale, 'Available via WhatsApp only', 'Disponibile solo via WhatsApp')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : editorial?.pricingTable ? (
              <div className="bg-[#0B0A09] overflow-hidden" data-taste-reveal>
                <div className="bg-[#141311] p-6">
                  <h3 className="text-xl font-display font-bold text-[#F6F1E7] flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#25D366]" />
                    {t.pricingTitle}
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  {editorial.pricingTable.map((tier, idx) => (
                    <div key={idx} className="pb-4 border-b border-white/10 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-[#F6F1E7] font-medium text-[15px]">{tier.zone}</span>
                        <span className="text-base font-bold text-[#25D366] shrink-0 tabular-nums">{tier.price}</span>
                      </div>
                      <p className="text-sm text-[#C2B9AA]">{tier.details}</p>
                    </div>
                  ))}
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="taste-btn-primary mt-4 w-full">
                    {t.bookWa}
                  </a>
                </div>
              </div>
            ) : null}

            {/* Rules Box */}
            {c?.rules && (
              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-6">
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">{c.rules.title}</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-5 h-5 text-champagne shrink-0" />
                    <span>{c.dressCode}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-5 h-5 text-champagne shrink-0" />
                    <span>{c.rules.selection}</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-5 h-5 text-champagne shrink-0" />
                    <span>{c.target}</span>
                  </li>
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
      <div id="upcoming-events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12 scroll-mt-24">
        <VenueEventsAutoCarousel
          venueName={name}
          ui={venueUi}
          tonight={venueCarouselEvents.tonight}
          thisWeek={venueCarouselEvents.thisWeek}
          curatedProposals={venueCarouselEvents.curatedProposals}
          future={venueCarouselEvents.future}
          targetProfile={venueTargetProfile}
          celebrations={venueCelebrations}
          services={venueServices}
        />
        <EntryFormulaMatrix locale={locale} />
        {(slug.includes('aria') || slug.includes('just-me') || slug.includes('voya') || slug.includes('55-milano') || slug.includes('pineta') || slug.includes('repvblic')) && (
          <SanSiroMatchAfterpartyFinder locale={locale} />
        )}
        <VipQuoteCalculator locale={locale} initialVenueSlug={slug} />

        {/* Haversine Nearby Clubs & Rooftops Internal-Link Mesh */}
        {nearbyVenues.length > 0 && (
          <section className="pt-8 border-t border-white/10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
              {locale === 'it'
                ? `Altri Club e Rooftop Vicini a ${name} a Milano`
                : `Nearby Clubs & Rooftops Close to ${name} in Milan`}
            </h2>
            <p className="text-sm text-white/60 mb-6">
              {locale === 'it'
                ? 'Esplora i locali più vicini calcolati in linea d’aria per combinare aperitivo panoramico, cena cantata e tavolo VIP.'
                : 'Explore the closest verified Milan venues sorted by real distance to pair sunset aperitivo, dinner shows, and VIP clubbing.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-taste-stagger>
              {nearbyVenues.map(({ venue: near, distanceLabel }) => {
                const nearName = getLocalizedText(near.localizedContent.name, locale);
                const nearSlug = getLocalizedVenueSlug35(near.id, (locale as LocaleCode) || 'en');
                const nearSpec = getVenueAuthoritySpec(near.id);
                const nearHref = `${lp}/${clubsDir}/${nearSlug}`;
                return (
                  <Link
                    key={near.id}
                    href={nearHref}
                    prefetch={false}
                    className="group p-5 bg-[#0B0A09] hover:bg-[#141311] transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#F6F1E7] group-hover:text-[#25D366] transition-colors mb-1.5">
                        {nearName} ↗
                      </h3>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-sm font-semibold text-[#25D366]">
                          {distanceLabel}
                        </span>
                        <span className="text-sm text-[#C2B9AA] truncate">
                          {locale === 'it' ? nearSpec?.neighborhoodIt : nearSpec?.neighborhoodEn}
                        </span>
                      </div>
                      <p className="text-sm text-[#EAE3D5] mb-2">{near.address.streetAddress}</p>
                      {nearSpec && (
                        <p className="text-sm text-[#C2B9AA] line-clamp-2">
                          {locale === 'it' ? nearSpec.soundIt : nearSpec.soundEn}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Reciprocal District & Essential Insider Guides Silo */}
        <section className="pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4" data-taste-reveal>
            <h2 className="text-2xl font-display font-bold text-[#F6F1E7]">
              {locale === 'it'
                ? `Quartiere & Guide Ufficiali per ${name}`
                : `District & Official Insider Guides for ${name}`}
            </h2>
            <span className="text-sm font-semibold text-[#C2B9AA]">
              {locale === 'it'
                ? 'Listini Verificati Novembre 2026 · WhatsApp +39 351 912 7047'
                : 'Verified November 2026 · Official Concierge Desk (+39 351 912 7047)'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" data-taste-stagger>
            {canonicalZone && (
              <Link
                href={`${lp}/${zonesDir}/${localizedZoneSlug}`}
                locale={locCode}
                prefetch={false}
                className="p-5 bg-[#141311] hover:bg-[#1F1C18] transition-colors"
              >
                <span className="block font-serif text-base font-semibold text-[#F6F1E7] mb-1">
                  {canonicalZone.name} · Milano ↗
                </span>
                <span className="block text-sm text-[#25D366]">
                  {locale === 'it' ? 'Quartiere del Locale' : 'Venue District Guide'}
                </span>
              </Link>
            )}
            {reciprocalGuides.map((g) => (
              <Link
                key={g.id}
                href={`${lp}/${guidesDir}/${getLocalizedGuideSlug35(g, locCode)}`}
                locale={locCode}
                prefetch={false}
                className="p-5 bg-[#0B0A09] hover:bg-[#141311] transition-colors"
              >
                <span className="block font-serif text-base font-semibold text-[#F6F1E7] mb-1">
                  {getLocalizedText(g.title, locCode).replace(/[—–]/g, ' - ')} ↗
                </span>
                <span className="block text-sm text-[#C2B9AA]">
                  {locale === 'it' ? 'Guida Ufficiale' : 'Official Guide'}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
            <EditorialPageSections locale={locale as LocaleCode} path={`${lp}/clubs/${slug}`} />
      </main>
  );
}
