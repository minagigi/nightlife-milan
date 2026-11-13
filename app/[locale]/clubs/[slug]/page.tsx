import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { hreflangAlternates, localePrefix, getLocaleDef, indexedLocaleCodes, canonicalPageUrl } from '@/lib/i18n/locales';
import { getLocalizedVenueSlug35, getLocalizedZoneSlug35 } from '@/lib/i18n/localizedSlugs35';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedGuideSlug35 } from '@/lib/guides100Catalog';
import { seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { buildClubHighCtrDescription, buildClubHighCtrTitle } from '@/lib/clubSeoMeta35';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { MapPin, Clock, Shirt, MessageCircle, Star, Calendar, ArrowLeft, Music, Wine, Utensils, ShieldCheck, Check, CreditCard, Sparkles, Train, Users, HelpCircle } from 'lucide-react';
import { getDictionary } from '../../../../dictionaries/get-dictionary';
import { CONTACT } from '@/config/contact';
import { getVenueBySlug, mockVenues, mockZones, mockGuides } from '@/lib/data';
import { VenueCategory } from '@/lib/types';
import { generateClubSchema, generateEventListSchema, getLocalizedText, jsonLdString } from '@/lib/seo';
import { getAllCalendarEvents, isUpcomingRome } from '@/lib/calendarEvents';
import { getEventbriteDiscoveryItems } from '@/lib/eventbriteDiscovery';
import { VipQuoteCalculator, EntryFormulaMatrix, SanSiroMatchAfterpartyFinder } from '@/components/NightlifeExpansionModules';
import EditorialPageSections from '@/components/EditorialPageSections';
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
    en: 'Just Me Milan | Open 7/7 VIP Tables, Prices & Dress Code 2026/2027 | Italo Rota Club',
    it: 'Just Me Milano | Aperto 7/7 Tavoli VIP, Prezzi & Dress Code 2026/2027 | Club Italo Rota',
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
};

const venueKeywords: Record<string, { en: string[]; it: string[] }> = {
  'v-justme': {
    en: ['just me milan', 'just me club sempione', 'just me open 7 nights a week', 'just me vip table prices', 'Italo Rota club milan', 'just me dress code', 'torre branca nightclub milan', 'champions league afterparty milan'],
    it: ['just me milano', 'just me club sempione', 'just me aperto 7 su 7', 'prezzi tavoli just me', 'discoteca Italo Rota milano', 'just me dress code', 'club torre branca milano', 'dopo partita champions league milano'],
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
      tagline: 'Priority #1 Flagship | Open 7 Nights a Week (Monday to Sunday) Beneath the Illuminated Torre Branca in Parco Sempione',
      highlights: [
        'Open 7 nights out of 7 (Monday to Sunday, 19:30 to 05:00 AM)',
        'Designed by Italo Rota at the base of the 108m Torre Branca in Parco Sempione',
        'Royal’Aperitivo with private panoramic elevator ticket to the top of Torre Branca',
        '#1 destination for UEFA Champions League Tue/Wed afterparties, Fashion Week & international stars',
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
          q: 'Is Just Me Milano really open every night from Monday to Sunday?',
          a: 'Yes. Just Me Milano (Viale Luigi Camoens 2, Parco Sempione) operates 7 nights a week, 365 days a year, with Royal’Aperitivo from 19:30 and clubbing until 05:00 AM inside its heated winter glass dome or open-air summer garden.',
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
      tagline: 'Scelta Top N.1 a Milano | Aperto 7 Notti su 7 (Lunedì-Domenica) Sotto la Torre Branca Illuminata nel Parco Sempione',
      highlights: [
        'Aperto 7 sere su 7 dal Lunedi alla Domenica (19:30 - 05:00 del mattino)',
        'Architettura firmata Italo Rota ai piedi della Torre Branca (108 metri) in Parco Sempione',
        'Royal’Aperitivo con biglietto ascensore panoramico per salire in cima alla Torre Branca',
        'Meta #1 per Dopo-Partita UEFA Champions League (Mar/Mer), Derby, Milano Fashion Week e superstar mondiali',
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
          q: 'Il Just Me Milano e davvero aperto tutte le sere dal lunedi alla domenica?',
          a: 'Si. Il Just Me Milano (Viale Luigi Camoens 2, Parco Sempione) e l unico top club di Milano aperto 7 notti su 7, dalle 19:30 per il Royal’Aperitivo fino alle 05:00 del mattino, sia nel giardino estivo sia nella cupola invernale riscaldata.',
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
  'v-pineta': {
    en: {
      tagline: 'Priority #2 Flagship | Milan Iconic Crystal-Chandelier Singing Aperitivo & Reggaeton/Commercial VIP Club',
      highlights: [
        'Located at Via Messina 38 (Cenisio / Corso Como district), steps from M5 Purple Line Cenisio stop',
        'Home of Milan #1 Singing Aperitivo (Aperitivo Cantato) from 19:30 and Noche De Perreo Reggaeton nights',
        'Opulent crystal chandeliers, velvet VIP booths, and bottle parades until 05:00 AM',
        'Direct M5 metro connection from San Siro Stadium (10 minutes) for Saturday Serie A afterparties',
      ],
      musicStyle: 'Singing Italian/International Hits (Aperitivo), Reggaeton, Commercial Dance, Hip-Hop & Vocal House',
      crowdProfile: '20-38 | Fashion crowd, bachelorette/birthday celebrations, Corso Como regulars & Serie A Saturday guests',
      bestNights: 'Friday (Singing Aperitivo & Fashion Club), Saturday (Noche De Perreo & Gran Gala) & Holiday Specials',
      nearestMetro: 'M5 Purple Line Cenisio (2 min walk to Via Messina 38) + Tram 12 & 14',
      pricingTable: [
        { zone: 'Singing Aperitivo Reserved Table (19:30-22:30)', price: '€20 - €35 / person', details: 'Includes royal buffet or gourmet platters, 1 cocktail or wine bottle per 4 guests' },
        { zone: 'Dancefloor VIP Table (After-Dinner)', price: '€300 - €400 (6-8 guests)', details: '100% bottle credit on the main crystal-chandelier floor with hostess entry' },
        { zone: 'Elevated VIP Privé Booth', price: '€500 - €800 (8-10 guests)', details: 'Roped-off luxury velvet sofa area with dedicated waiter and premium bottles' },
        { zone: 'Super Privé Console DJ', price: '€900 - €1,500 (10-12 guests)', details: 'Exclusive booth beside the console for Dom Pérignon & Clase Azul parades' },
      ],
      insiderTips: [
        'Book the 19:30 Singing Aperitivo + After-Dinner VIP Table combo to keep your sofa all night as Pineta transitions from live sing-along dinner vibe to full nightclub.',
        'Because Cenisio is on the direct M5 Purple Line from San Siro, Pineta is a favorite after Saturday 18:00 and 20:45 Serie A matches.',
        'Dress code is Glamour & Smart Chic: collared shirt for men, elegant evening outfit for women.',
      ],
      faqs: [
        {
          q: 'How does the Singing Aperitivo (Aperitivo Cantato) work at Pineta Club Milano?',
          a: 'Doors open at 19:30 with reserved tables (€20-€35/person), gourmet buffet islands, wine/cocktails, and an interactive vocal DJ show where the whole room sings Italian and international classics before the club night starts at 23:00.',
        },
        {
          q: 'How much is a VIP table at Pineta Club Milano?',
          a: 'After-dinner Dancefloor VIP tables start at €300-€400 for 6-8 guests, Elevated VIP Privé tables cost €500-€800, and Console tables start from €900, 100% spendable in bottles.',
        },
        {
          q: 'How do I reach Pineta Club by metro?',
          a: 'Take the M5 Purple Metro Line to the Cenisio stop: Via Messina 38 is just a 2-minute walk from the station exit.',
        },
      ],
    },
    it: {
      tagline: 'Scelta Top N.2 a Milano | Il Tempio Milanese dell’Aperitivo Cantato e delle Notti Reggaeton/Commercial sotto i Lampadari di Cristallo',
      highlights: [
        'Situato in Via Messina 38 (Cenisio / Corso Como), a 2 minuti a piedi dalla fermata Metro M5 Lilla Cenisio',
        'Casa del celebre Aperitivo Cantato dalle 19:30 e del format Noche De Perreo Reggaeton & Commerciale',
        'Sontuosi lampadari di cristallo, divani in velluto e bottle show scenografici fino alle 05:00',
        'Collegamento diretto in Metro M5 Lilla dallo Stadio di San Siro (10 minuti) per il post-partita del sabato',
      ],
      musicStyle: 'Hit Italiane da Cantare (Aperitivo), Reggaeton, Commerciale, Hip-Hop e Vocal House',
      crowdProfile: '20-38 anni | Pubblico glamour milanese, addii al nubilato, feste di laurea/compleanno e ospiti Serie A',
      bestNights: 'Venerdi (Aperitivo Cantato & Club Night), Sabato (Noche De Perreo & Gran Gala) e Veglione di Capodanno',
      nearestMetro: 'M5 Lilla Cenisio (2 minuti a piedi fino a Via Messina 38) + Tram 12 e 14',
      pricingTable: [
        { zone: 'Tavolo Riservato Aperitivo Cantato (19:30-22:30)', price: '€20 - €35 / persona', details: 'Include Royal Buffet, 1 drink premium o 1 bottiglia di vino/prosecco ogni 4 ospiti' },
        { zone: 'Tavolo VIP Pista (Dopocena)', price: '€300 - €400 (6-8 persone)', details: '100% spendibile in bottiglie sotto i lampadari di cristallo con ingresso salta-fila' },
        { zone: 'Tavolo Privé VIP Rialzato', price: '€500 - €800 (8-10 persone)', details: 'Divano in velluto nell’area Privé riservata con cameriere dedicato' },
        { zone: 'Super Privé Console DJ', price: '€900 - €1.500 (10-12 persone)', details: 'Posizione dominante a fianco della console per Magnum, Dom Pérignon e Clase Azul' },
      ],
      insiderTips: [
        'Prenota la formula Combo Aperitivo Cantato (19:30) + Tavolo Bottiglia Dopocena per assicurarti lo stesso divanetto per tutta la notte senza mai fare fila.',
        'Grazie alla fermata M5 Cenisio sulla stessa linea dello stadio, il Pineta e perfetto dopo gli anticipi di Serie A del sabato a San Siro.',
        'Dress code Glamour & Smart Chic: camicia obbligatoria per gli uomini, outfit curato per le ragazze.',
      ],
      faqs: [
        {
          q: 'Come funziona l’Aperitivo Cantato del Pineta Club Milano?',
          a: 'Dalle 19:30 alle 22:30 accedi al tuo tavolo riservato (20-35€ a persona) con buffet gourmet, drink o bottiglie di vino al tavolo e uno show vocale coinvolgente prima che la sala diventi discoteca fino alle 05:00.',
        },
        {
          q: 'Quanto costa un Tavolo VIP dopocena al Pineta Club?',
          a: 'I tavoli Pista partono da 300-400€ per 6-8 persone, il Privé VIP richiede 500-800€ e il Super Privé Console parte da 900€, sempre 100% convertiti in bottiglie.',
        },
        {
          q: 'Qual e la fermata della metro piu vicina al Pineta Club?',
          a: 'La fermata Cenisio della linea M5 Lilla dista soli 150 metri (2 minuti a piedi) da Via Messina 38.',
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
  'v-voya': {
    en: {
      tagline: 'Priority #5 Flagship | 20th-Floor Panoramic Sky Lounge 85 Meters Above Milan with 360° CityLife & Porta Nuova Views',
      highlights: [
        'Perched on the 20th floor (85m high) at Viale Achille Papa 30 (Portello / CityLife district)',
        'Floor-to-ceiling 360-degree climate-controlled glass walls operating 12 months a year (autumn/winter/NYE included)',
        'Sunset Skyline Aperitivo (from 18:30) seamlessly transitioning into an upscale Deep House & Lounge DJ club night',
        'Only 3 stops on the direct M5 Purple Line from San Siro (Lotto -> Portello) for panoramic post-match drinks',
      ],
      musicStyle: 'Sunset Lounge, Deep House, Afro-House, Melodic Grooves & Chic Vocal Club Sets',
      crowdProfile: '23-48 | International business travelers, romantic dates, rooftop birthday/bachelorette groups & VIPs',
      bestNights: 'Tuesday to Sunday: Sunset Golden Hour Aperitivo (18:30-21:30) & Fri/Sat 20th-Floor Skyline DJ Party (22:00-02:30)',
      nearestMetro: 'M5 Purple Line Portello (4 min walk) + M1 Lotto (Viale Achille Papa 30, 20th Floor)',
      pricingTable: [
        { zone: 'Skyline Sunset Aperitivo Table (18:30-21:30)', price: '€20 - €35 / person', details: 'Panoramic window seating, gourmet finger food platter & signature cocktail' },
        { zone: 'After-Dinner Skyline Lounge Table', price: '€250 - €400 (6-8 guests)', details: '100% bottle credit at 85 meters altitude with private elevator access' },
        { zone: 'First-Row Glass Window VIP Privé', price: '€450 - €800 (8-10 guests)', details: 'Front-row panoramic sofa overlooking the illuminated Milan skyscrapers' },
      ],
      insiderTips: [
        'First-row window tables overlooking the CityLife and Porta Nuova towers sell out 48 hours ahead on Fridays and Saturdays: reserve early via WhatsApp (+39 351 912 7047).',
        'Because Voya Rooftop is enclosed in floor-to-ceiling heated glass on the 20th floor, you get the full 360-degree skyline view even in November, December, Capodanno, and February.',
      ],
      faqs: [
        {
          q: 'Is Voya Rooftop open during autumn and winter in Milan?',
          a: 'Yes! Voya Rooftop on the 20th floor (Viale Achille Papa 30) features an enclosed, climate-controlled 360-degree floor-to-ceiling glass sky lounge open 12 months a year.',
        },
        {
          q: 'How much is a panoramic window table at Voya Rooftop?',
          a: 'Sunset Aperitivo tables start at €20-€35 per person; after-dinner bottle service tables start from €250-€400 up to €450-€800 for first-row skyline window booths.',
        },
      ],
    },
    it: {
      tagline: 'Scelta Top N.5 a Milano | Sky Lounge Panoramico al 20° Piano (85 Metri d’Altezza) con Vista a 360° sullo Skyline di Milano',
      highlights: [
        'Sospeso al 20° piano (85 metri d’altezza) in Viale Achille Papa 30 (distretto Portello / CityLife)',
        'Salone panoramico climatizzato con vetrate a 360 gradi aperto 12 mesi l’anno (anche in autunno/inverno e Capodanno)',
        'Sunset Aperitivo al tramonto (dalle 18:30) seguito da elegante serata Lounge & Deep House con DJ set fino alle 02:30',
        'A sole 3 fermate di Metro M5 Lilla da San Siro (Lotto -> Portello) per il Terzo Tempo panoramico post-partita',
      ],
      musicStyle: 'Sunset Lounge, Deep House, Afro-House e DJ Set Panoramico Ricercato',
      crowdProfile: '23-48 anni | Pubblico internazionale, coppie, lauree/compleanni eleganti, addii al nubilato chic e manager',
      bestNights: 'Dal Martedi alla Domenica: Golden Hour Aperitivo (18:30-21:30) e Ven/Sab 20th Floor Skyline Party (22:00-02:30)',
      nearestMetro: 'M5 Lilla Portello (4 minuti a piedi) + M1 Rossa Lotto (Viale Achille Papa 30, 20° Piano)',
      pricingTable: [
        { zone: 'Tavolo Sunset Aperitivo Vista Skyline (18:30-21:30)', price: '€20 - €35 / persona', details: 'Tavolo riservato al 20° piano con finger food gourmet e signature cocktail' },
        { zone: 'Tavolo VIP Lounge Dopocena', price: '€250 - €400 (6-8 persone)', details: '100% spendibile in bottiglie a 85 metri d’altezza con ascensore diretto' },
        { zone: 'Tavolo Privé Prima Fila Vetrata 360°', price: '€450 - €800 (8-10 persone)', details: 'Divanetto fronte vetrata affacciato sui grattacieli illuminati di CityLife e Porta Nuova' },
      ],
      insiderTips: [
        'I tavoli in prima fila lungo la vetrata panoramica esauriscono i posti con 48 ore di anticipo nel weekend: bloccali su WhatsApp (+39 351 912 7047).',
        'Essendo interamente avvolto da vetrate panoramiche climatizzate al 20° piano, Voya Rooftop è perfetto tutto l’anno, inclusi autunno, inverno e la notte di Capodanno con vista fuochi d’artificio.',
      ],
      faqs: [
        {
          q: 'Voya Rooftop e aperto anche in autunno e in inverno?',
          a: 'Sì! Il 20° piano di Voya Rooftop (Viale Achille Papa 30) dispone di un salone interno climatizzato con vetrate a tutta altezza a 360 gradi aperto 12 mesi l’anno.',
        },
        {
          q: 'Quanto costa prenotare un tavolo vista skyline da Voya Rooftop?',
          a: 'I tavoli per il Sunset Aperitivo partono da 20-35€ a persona; nel dopocena i Tavoli VIP con bottiglia partono da 250-400€ fino a 450-800€ in prima fila vetrata.',
        },
      ],
    },
  },
  'v-repvblic': {
    en: {
      tagline: 'Priority #6 Flagship | Design-Forward Piazza della Repubblica Club Home to Dirty Monday & High-Energy House/Urban Weekends',
      highlights: [
        'Central location at Piazza della Repubblica / Via Vittor Pisani near Stazione Centrale & Porta Nuova',
        'Home of Milan #1 Monday night party: Dirty Monday (The Rock n Roll & Urban Industry Night)',
        'Cutting-edge kinetic LED lighting grid, dark-luxury interiors & international guest selectors',
        'Open Monday, Friday & Saturday until 04:30 AM with Dancefloor, Privé & Console VIP booths',
      ],
      musicStyle: 'House, Tech-House, Hip-Hop, Urban & Rock/Pop Mashups (Dirty Monday)',
      crowdProfile: '21-36 | Models, fashion industry insiders, international students & nocturnal clubbers',
      bestNights: 'Monday (Dirty Monday Iconic Party), Friday (Urban & House Showcase), Saturday (Repvblic Flagship Night)',
      nearestMetro: 'M3 Yellow Line Repubblica (1 min walk) or M2/M3 Centrale FS',
      pricingTable: [
        { zone: 'Guest List Entry (23:00-00:30)', price: '€15 - €25 / person', details: 'Includes 1 drink (mixed gender balance required at the door)' },
        { zone: 'Dancefloor VIP Table', price: '€250 - €350 (6-8 guests)', details: '100% bottle credit on the main floor with skip-the-line hostess entry' },
        { zone: 'Elevated VIP Privé Booth', price: '€500 - €900 (8-10 guests)', details: 'Reserved luxury booth overlooking the LED dancefloor' },
        { zone: 'Super Privé Console DJ', price: '€1,000 - €1,800 (10-12 guests)', details: 'Stage-level booth next to resident and international guest DJs' },
      ],
      insiderTips: [
        'In Milan on a Monday night (or after a Monday 20:45 Serie A match at San Siro)? Dirty Monday at Repvblic is the most famous Monday club party in Italy.',
        'Book your VIP table via WhatsApp (+39 351 912 7047) to bypass the strict Piazza della Repubblica velvet rope.',
      ],
      faqs: [
        {
          q: 'What is Dirty Monday at Repvblic Milano?',
          a: 'Dirty Monday is Milan legendary Monday night party at Repvblic (Piazza della Repubblica), running from 23:00 to 04:30 AM with rock, hip-hop, and house music for models, creatives, and international guests.',
        },
        {
          q: 'How much is a VIP table at Repvblic Milano?',
          a: 'Dancefloor VIP tables start at €250-€350, Elevated Privé tables range from €500 to €900, and DJ Console booths start at €1,000, 100% spendable in bottles.',
        },
      ],
    },
    it: {
      tagline: 'Scelta Top N.6 a Milano | Il Design Club di Piazza della Repubblica Casa del Celebre Dirty Monday e dei Weekend House/Urban',
      highlights: [
        'Posizione centralissima in Piazza della Repubblica (a 1 minuto dalla Metro M3 Repubblica e Porta Nuova)',
        'Casa della serata del lunedì più famosa d’Italia: Dirty Monday (Rock n Roll, Urban & Fashion Party)',
        'Architettura luminosa LED immersiva, estetica dark-luxury e DJ internazionali nel weekend',
        'Ideale anche per il Dopo-Partita dei posticipi del lunedi sera a San Siro e per la Fashion Week',
      ],
      musicStyle: 'House, Tech-House, Hip-Hop, Urban e Rock/Pop Mashup (Dirty Monday)',
      crowdProfile: '21-36 anni | Modelle, addetti ai lavori della moda, studenti internazionali e clubber esigenti',
      bestNights: 'Lunedi (Dirty Monday), Venerdi (Urban & House), Sabato (Repvblic Main Night) e Capodanno',
      nearestMetro: 'M3 Gialla Repubblica (1 minuto a piedi) oppure M2/M3 Centrale FS',
      pricingTable: [
        { zone: 'Ingresso in Lista Nominale (23:00-00:30)', price: '€15 - €25 / persona', details: 'Include 1 drink (richiesto equilibrio uomo/donna alla selezione)' },
        { zone: 'Tavolo VIP Pista', price: '€250 - €350 (6-8 persone)', details: '100% spendibile in bottiglie a bordo pista con ingresso salta-fila hostess' },
        { zone: 'Tavolo Privé VIP Rialzato', price: '€500 - €900 (8-10 persone)', details: 'Divanetto riservato nell’area VIP con visuale sull’intera sala' },
        { zone: 'Super Privé Console DJ', price: '€1.000 - €1.800 (10-12 persone)', details: 'Il tavolo piu esclusivo accanto alla console DJ' },
      ],
      insiderTips: [
        'Sei a Milano di lunedì sera (o dopo il posticipo di Serie A del lunedì a San Siro)? Il Dirty Monday del Repvblic è l’evento imperdibile del lunedì notte.',
        'Prenota il Tavolo VIP su WhatsApp (+39 351 912 7047) per saltare la selezione alla porta in Piazza della Repubblica.',
      ],
      faqs: [
        {
          q: 'Cos e il Dirty Monday del Repvblic Milano?',
          a: 'Il Dirty Monday e il party del lunedì notte piu famoso di Milano: ogni lunedi dalle 23:00 alle 04:30 il Repvblic (Piazza della Repubblica) ospita modelle, creativi e pubblico internazionale.',
        },
        {
          q: 'Quanto costa un Tavolo VIP al Repvblic Milano?',
          a: 'I tavoli Pista partono da 250-350€, il Privé rialzato da 500-900€ e il Super Privé Console da 1.000€, interamente convertiti in bottiglie.',
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
    'v-voya', 'v-11clubroom', 'v-church81', 'v-mibmilano', 
    'v-gattopardo', 'v-terrazza21', 'v-theclub', 'v-tocqueville', 'v-alcatraz', 'v-fabrique', 'v-amnesia'
  ].includes(venue.id);

  const image = venue.image || venue.gallery?.[0] || '/images/milan-nightclub-luxury-vip-champagne.webp';
  const enhancedGallery = getEnhancedVenueGallery(venue);
  const rawGallery = enhancedGallery.filter((g) => g !== image);
  const gallery = rawGallery.length >= 4 ? rawGallery : enhancedGallery;
  const venueUi = getVenueUi35(locale);
  const venueCarouselEvents = resolveVenueEventsForCarousel(venue, locale);
  const venueTargetProfile = getVenueTargetProfile(venue, locale);
  const venueCelebrations = getVenueCelebrations(venue, locale);
  const venueServices = getVenueServices10(venue, locale);
  
  const waLink = venue.id === 'v-pineta' 
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20informazioni%20per%20un%20tavolo%20al%20Pineta%20Club%20Milano`
    : venue.id === 'v-playclub'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20al%20Play%20Club`
    : venue.id === 'v-55milano'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20per%20il%2055%20Milano`
    : venue.id === 'v-repvblic'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20informazioni%20per%20il%20Repvblic%20Milano`
    : venue.id === 'v-11clubroom'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20all'11%20Clubroom`
    : venue.id === 'v-church81'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20al%20Church%2081`
    : venue.id === 'v-mibmilano'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20al%20MIB%20Milano`
    : venue.id === 'v-gattopardo'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20al%20Gattopardo`
    : venue.id === 'v-terrazza21'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20alla%20Terrazza%2021`
    : venue.id === 'v-theclub'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20al%20The%20Club`
    : venue.id === 'v-tocqueville'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20o%20cena%20al%20Tocqueville%2013%20Milano`
    : venue.id === 'v-alcatraz'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20VIP%20all'Alcatraz%20Milano`
    : venue.id === 'v-fabrique'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20VIP%20al%20Fabrique%20Milano`
    : venue.id === 'v-amnesia'
    ? `${CONTACT.whatsapp.link}?text=Ciao,%20vorrei%20prenotare%20un%20tavolo%20VIP%20all'Amnesia%20Milano`
    : `${CONTACT.whatsapp.link}?text=Hi,%20I'd%20like%20to%20book%20at%20${encodeURIComponent(name)}`;
  const servicesTags = venue.tags || [venue.category];
  
  const lp = localePrefix(locale);
  const venueEvents = getEventbriteDiscoveryItems(await getAllCalendarEvents(), locale)
    .filter((item) => item.event.venueId === venue.id && !item.event.id.startsWith('weekly-'))
    .map((item) => item.event);
  const futureVenueEvents = venueEvents
    .filter((e) => isUpcomingRome(e.dateISO))
    .sort((a, b) => new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime());
  const pastVenueEvents = venueEvents
    .filter((e) => !isUpcomingRome(e.dateISO))
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime());

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const currentVenueSlug = getLocalizedVenueSlug35(venue.slugs.en, (locale as LocaleCode) || 'en');
  const clubsDir = getLocalizedDir35('clubs', locale);
  const canonicalClubUrl = `${baseUrl}${localePrefix(locale)}/${clubsDir}/${currentVenueSlug}`;
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
  };
  const canonicalZoneSlug =
    priorityZoneByVenue[venue.id] ||
    mockZones.find((z) => z.id === venue.zone)?.slug ||
    'corso-como';
  const canonicalZone = mockZones.find((z) => z.slug === canonicalZoneSlug) || mockZones[0];
  const localizedZoneSlug = getLocalizedZoneSlug35(canonicalZoneSlug, locCode);
  const reciprocalGuideIds = ['g-dress-code', 'g-vip-bottle-prices', 'g-new-years-eve-2027', 'g-115', 'g-116'];
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
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-champagne selection:text-white pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      {venueEventsLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(venueEventsLd) }} />
      )}
      
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={name}
            fill
            quality={92}
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={localePrefix(locale) || '/'} className="inline-flex items-center text-white/50 hover:text-champagne transition-colors mb-8 text-sm uppercase tracking-wider font-semibold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                {venue.isManaged && (
                  <span className="px-3 py-1 bg-champagne/20 border border-champagne/50 text-champagne text-xs uppercase tracking-widest rounded-sm flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    OFFICIAL PARTNER
                  </span>
                )}
                <span className="px-3 py-1 border border-white/20 text-white/70 text-xs uppercase tracking-widest rounded-full">
                  {venue.category.replace(/_/g, ' ')}
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
                {cityQualifiedH1}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 font-light tracking-wide">
                {(editorial?.tagline || c?.subtitle || description.substring(0, 110) + '...').replace(/[\u2014–]/g, ' - ')}
              </p>
            </div>
            
            <div className="shrink-0">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex flex-col items-center justify-center px-8 py-4 bg-champagne text-zinc-950 font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors rounded-sm">
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t.vipAccess}
                </div>
                {isWhatsAppOnlyVenue && (
                  <span className="text-[10px] mt-1 opacity-80 normal-case font-medium">
                    {tr(locale, 'Available via WhatsApp only', 'Disponibile solo via WhatsApp')}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QuickInfoBar (4 Info Blocks) */}
      <section id="dress-code-hours" className="border-y border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/10">
            <div className="flex flex-col px-4 first:pl-0">
              <MapPin className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{t.labels.address}</span>
              <span className="text-sm font-medium text-white/80">{venue.address.streetAddress}</span>
              {venue.coordinates?.latitude && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${venue.coordinates.latitude},${venue.coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-xs text-champagne/70 hover:text-champagne underline underline-offset-2 transition-colors"
                >
                  {tr(locale, 'Open in Google Maps ↗', 'Apri in Google Maps ↗')}
                </a>
              )}
            </div>
            <div className="flex flex-col px-4">
              <Clock className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{t.labels.targetAge}</span>
              <span className="text-sm font-medium text-white/80">{c?.target || venue.ageRange || "18+"}</span>
            </div>
            <div className="flex flex-col px-4">
              <Shirt className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{t.labels.dressCode}</span>
              <span className="text-sm font-medium text-white/80">{dressCode}</span>
            </div>
            <div className="flex flex-col px-4">
              <Music className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{t.labels.music}</span>
              <span className="text-sm font-medium text-white/80">{editorial?.musicStyle || c?.music || "House, Commercial & Urban"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick-Jump SEO Anchor Navigation (Sitelinks Trigger) */}
      <nav
        aria-label={tr(locale, 'Venue Sections', 'Sezioni Locale')}
        className="border-b border-white/10 bg-[#0A0A0C]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono uppercase tracking-wider">
          <a href="#prices-tables" className="px-3 py-1.5 rounded-full border border-champagne/35 text-champagne hover:bg-champagne hover:text-black transition-colors">
            {tr(locale, 'VIP Tables & Prices', 'Tavoli VIP & Prezzi')}
          </a>
          <a href="#dress-code-hours" className="px-3 py-1.5 rounded-full border border-white/15 text-white/80 hover:border-champagne hover:text-champagne transition-colors">
            {tr(locale, 'Dress Code & Info', 'Dress Code & Info')}
          </a>
          <a href="#upcoming-events" className="px-3 py-1.5 rounded-full border border-white/15 text-white/80 hover:border-champagne hover:text-champagne transition-colors">
            {tr(locale, 'Events Calendar', 'Calendario Eventi')}
          </a>
          <a href="#map-directions" className="px-3 py-1.5 rounded-full border border-white/15 text-white/80 hover:border-champagne hover:text-champagne transition-colors">
            {tr(locale, 'Map & Metro', 'Mappa & Metro')}
          </a>
          <a href="#faq" className="px-3 py-1.5 rounded-full border border-white/15 text-white/80 hover:border-champagne hover:text-champagne transition-colors">
            {tr(locale, 'FAQ', 'Domande Frequenti')}
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* Descrizione & Tags */}
          <section>
            {/* AI Trafiletto */}
            <div className="mb-6 p-5 rounded-xl border border-champagne/20 bg-champagne/[0.04]">
              <p className="font-sans text-champagne/60 text-[9px] tracking-[0.3em] uppercase mb-3">Quick Answer</p>
              <p className="font-sans text-white/70 text-sm leading-relaxed">
                {locale === 'it'
                  ? `${name} si trova in ${venue.address.streetAddress}, Milano. ${editorial?.tagline ? editorial.tagline + '. ' : ''}${description.substring(0, 180)}... Prenotazione Tavoli VIP e Liste su WhatsApp +39 351 912 7047 o concierge@nightlifemilan.com.`
                  : `${name} is located at ${venue.address.streetAddress}, Milan. ${editorial?.tagline ? editorial.tagline + '. ' : ''}${description.substring(0, 180)}... Book VIP Tables & Guestlists via WhatsApp +39 351 912 7047 or concierge@nightlifemilan.com.`}
              </p>
            </div>

            <p className="text-lg text-white/70 leading-relaxed font-light mb-6">
              {description}
            </p>
            <div className="flex flex-wrap gap-3">
              {servicesTags.map((tag: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-transparent border border-champagne/30 text-champagne text-xs uppercase tracking-widest rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Editorial Deep-Dive Dossier (for v-justme, v-aria, v-tocqueville, v-alcatraz, v-fabrique, v-amnesia) */}
          {editorial && (
            <section className="space-y-8 p-7 rounded-2xl border border-champagne/25 bg-white/[0.02]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-champagne" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-champagne">
                    {tr(locale, '2026/2027 Verified Club Dossier', 'Dossier Ufficiale Club 2026/2027')}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
                  {locale === 'it'
                    ? `Perché Scegliere ${name}: Punti di Forza, Musica e Logistica`
                    : `Why Choose ${name}: Highlights, Music & Logistics`}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editorial.highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <Check className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
                    <span className="text-sm text-white/85 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center gap-2 text-champagne text-xs font-mono uppercase tracking-wider mb-1">
                    <Users className="w-4 h-4" />
                    <span>{tr(locale, 'Crowd Profile & Target', 'Target & Pubblico')}</span>
                  </div>
                  <p className="text-sm text-white/75">{editorial.crowdProfile}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <div className="flex items-center gap-2 text-champagne text-xs font-mono uppercase tracking-wider mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>{tr(locale, 'Best Nights to Go', 'Serate Migliori')}</span>
                  </div>
                  <p className="text-sm text-white/75">{editorial.bestNights}</p>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 md:col-span-2">
                  <div className="flex items-center gap-2 text-champagne text-xs font-mono uppercase tracking-wider mb-1">
                    <Train className="w-4 h-4" />
                    <span>{tr(locale, 'Nearest Metro & Fast Arrival', 'Metro Più Vicina & Come Arrivare')}</span>
                  </div>
                  <p className="text-sm text-white/75">{editorial.nearestMetro}</p>
                </div>
              </div>

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
            <section>
              <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-champagne" />
                {tr(locale, 'Upcoming Events at', 'Prossimi Eventi da')} {name}
              </h2>
              <div className="space-y-3">
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
                      className="flex items-center justify-between gap-4 py-3 px-4 rounded-lg bg-white/[0.03] border border-white/10 hover:border-champagne/40 transition-colors group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-champagne/70 text-xs font-mono shrink-0">{dateStr}</span>
                        <span className="text-white/90 text-sm font-medium truncate group-hover:text-champagne transition-colors">{evTitle}</span>
                      </div>
                      <span className="text-white/40 text-xs font-mono shrink-0">{timeStr}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Past Events at this venue */}
          {pastVenueEvents.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-white/60 mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-white/40" />
                {tr(locale, 'Past Events at', 'Eventi Passati da')} {name}
              </h2>
              <div className="space-y-2">
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
                      className="flex items-center justify-between gap-4 py-2 px-4 rounded-lg bg-transparent border border-white/5 hover:border-white/20 transition-colors group"
                    >
                      <span className="text-white/50 text-sm truncate group-hover:text-white/80 transition-colors">{evTitle}</span>
                      <span className="text-white/30 text-xs font-mono shrink-0">{dateStr}</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* TheTimeline (3 Acts) */}
          {c?.acts && (
            <section>
              <h2 className="text-3xl font-serif font-bold text-white mb-8 flex items-center gap-3">
                <Clock className="w-8 h-8 text-champagne" />
                {t.timelineTitle}
              </h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-champagne before:via-zinc-800 before:to-transparent">
                
                {c.acts.map((act: any, idx: number) => {
                  const icons = [Wine, Utensils, Music];
                  const Icon = icons[idx % icons.length];
                  const isFirst = idx === 0;
                  return (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#050505] ${isFirst ? 'bg-champagne text-black' : 'bg-white/[0.08] text-champagne'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-lg bg-white/[0.03] border border-white/10 hover:border-champagne/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-champagne text-xl">{act.title}</h3>
                          <span className="text-xs font-mono text-white/40">{act.time}</span>
                        </div>
                        <p className="text-white/70 mb-4">{act.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          {act.price.split(' | ').map((p: string, i: number) => (
                            <span key={i} className="inline-block px-3 py-1 bg-white/[0.08] rounded text-sm text-white/80">{p}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
              
              <div className="mt-8 text-center">
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-champagne text-champagne hover:bg-champagne hover:text-black transition-colors rounded-sm uppercase tracking-wider text-sm font-bold">
                  {t.bookWa}
                </a>
                {isWhatsAppOnlyVenue && (
                  <div className="text-center mt-2">
                    <span className="text-[10px] opacity-80 normal-case font-medium text-white/50">
                      {tr(locale, 'Available via WhatsApp only', 'Disponibile solo via WhatsApp')}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Venue Gallery & More Info */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-white mb-6">
              {locale === 'it' ? `${name}: Foto & Atmosfera` : `${name}: Photos & Atmosphere`}
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {gallery.map((src, i) => (
                <div key={i} className="relative h-40 rounded-xl overflow-hidden border border-white/10">
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
                    quality={92}
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 40vw"
                  />
                </div>
              ))}
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03]">
              <h3 className="font-serif text-lg text-white mb-3">
                {tr(locale, 'Practical Information', 'Informazioni Pratiche')}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                    {tr(locale, 'Address', 'Indirizzo')}
                  </p>
                  <p className="text-white/70">{venue.address.streetAddress}, Milan</p>
                  {venue.coordinates?.latitude && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${venue.coordinates.latitude},${venue.coordinates.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-champagne/70 hover:text-champagne underline underline-offset-2 transition-colors mt-1 inline-block"
                    >
                      {tr(locale, 'Open in Google Maps ↗', 'Apri in Google Maps ↗')}
                    </a>
                  )}
                </div>
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                    {tr(locale, 'Dress Code', 'Dress Code')}
                  </p>
                  <p className="text-white/70">{dressCode}</p>
                </div>
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                    {tr(locale, 'Booking Desk', 'Prenotazioni Ufficiali')}
                  </p>
                  <p className="text-white/70">WhatsApp +39 351 912 7047 · concierge@nightlifemilan.com</p>
                </div>
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                    {tr(locale, 'Concierge Service', 'Servizio Concierge')}
                  </p>
                  <p className="text-white/70">{tr(locale, 'Free Official Assistance', 'Assistenza Ufficiale Gratuita')}</p>
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
        <div className="space-y-8">
          <div className="sticky top-32 space-y-8">
            
            {/* Pricing Table */}
            {c?.pricing ? (
              <div className="bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-white/[0.05] p-6 border-b border-white/10">
                  <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-champagne" />
                    {t.pricingTitle}
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-white/70 font-medium">{c.pricing.dancefloor.title}</span>
                      <span className="text-xl font-bold text-white">{c.pricing.dancefloor.price}</span>
                    </div>
                    <p className="text-xs text-white/40">{c.pricing.dancefloor.desc}</p>
                  </div>
                  <div className="w-full h-px bg-white/10"></div>
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-champagne font-medium flex items-center gap-2">
                        {c.pricing.priveGold.title}
                      </span>
                      <span className="text-xl font-bold text-white">{c.pricing.priveGold.price}</span>
                    </div>
                    <p className="text-xs text-white/40">{c.pricing.priveGold.desc}</p>
                  </div>
                  <div className="w-full h-px bg-white/10"></div>
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-white font-bold flex items-center gap-2">
                        <Star className="w-4 h-4 text-champagne fill-champagne" />
                        {c.pricing.priveDiamond.title}
                      </span>
                      <span className="text-xl font-bold text-champagne">{c.pricing.priveDiamond.price}</span>
                    </div>
                    <p className="text-xs text-white/40">{c.pricing.priveDiamond.desc}</p>
                  </div>
                  
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-6 w-full flex items-center justify-center px-4 py-4 bg-champagne text-zinc-950 font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors rounded-sm">
                    {t.bookWa}
                  </a>
                  {isWhatsAppOnlyVenue && (
                    <div className="text-center mt-2">
                      <span className="text-[10px] opacity-80 normal-case font-medium text-white/50">
                        {tr(locale, 'Available via WhatsApp only', 'Disponibile solo via WhatsApp')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : editorial?.pricingTable ? (
              <div className="bg-white/[0.03] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-white/[0.05] p-6 border-b border-white/10">
                  <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-champagne" />
                    {t.pricingTitle}
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  {editorial.pricingTable.map((tier, idx) => (
                    <div key={idx} className="pb-4 border-b border-white/10 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="text-white font-medium text-sm">{tier.zone}</span>
                        <span className="text-base font-bold text-champagne shrink-0">{tier.price}</span>
                      </div>
                      <p className="text-xs text-white/50">{tier.details}</p>
                    </div>
                  ))}
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-4 w-full flex items-center justify-center px-4 py-4 bg-champagne text-zinc-950 font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors rounded-sm">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    className="group p-5 rounded-xl border border-white/10 bg-white/[0.025] hover:border-champagne/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-champagne">
                          {distanceLabel}
                        </span>
                        <span className="text-[11px] text-white/45 truncate">
                          {locale === 'it' ? nearSpec?.neighborhoodIt : nearSpec?.neighborhoodEn}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-champagne transition-colors mb-1.5">
                        {nearName} ↗
                      </h3>
                      <p className="text-xs text-white/65 mb-2">{near.address.streetAddress}</p>
                      {nearSpec && (
                        <p className="text-xs text-white/50 line-clamp-2">
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
        <section className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h2 className="text-2xl font-serif font-bold text-white">
              {locale === 'it'
                ? `Quartiere & Guide Ufficiali per ${name}`
                : `District & Official Insider Guides for ${name}`}
            </h2>
            <span className="text-[11px] font-mono uppercase tracking-wider text-champagne">
              {locale === 'it'
                ? 'Listini Verificati Novembre 2026 · WhatsApp +39 351 912 7047'
                : 'Verified November 2026 · Official Concierge Desk (+39 351 912 7047)'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {canonicalZone && (
              <Link
                href={`${lp}/${zonesDir}/${localizedZoneSlug}`}
                locale={locCode}
                prefetch={false}
                className="p-4 rounded-xl border border-champagne/35 bg-champagne/[0.06] hover:border-champagne transition-colors"
              >
                <span className="block text-[10px] font-mono uppercase tracking-wider text-champagne mb-1">
                  {locale === 'it' ? 'Quartiere del Locale' : 'Venue District Guide'}
                </span>
                <span className="block font-serif text-base font-semibold text-white">
                  {canonicalZone.name} · Milano ↗
                </span>
              </Link>
            )}
            {reciprocalGuides.map((g) => (
              <Link
                key={g.id}
                href={`${lp}/${guidesDir}/${getLocalizedGuideSlug35(g, locCode)}`}
                locale={locCode}
                prefetch={false}
                className="p-4 rounded-xl border border-white/10 bg-white/[0.025] hover:border-champagne/50 transition-colors"
              >
                <span className="block text-[10px] font-mono uppercase tracking-wider text-white/45 mb-1">
                  {locale === 'it' ? 'Guida Ufficiale' : 'Official Guide'}
                </span>
                <span className="block font-serif text-base font-semibold text-white">
                  {getLocalizedText(g.title, locCode).replace(/[—–]/g, ' - ')} ↗
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
