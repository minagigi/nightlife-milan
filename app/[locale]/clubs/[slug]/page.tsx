import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Shirt, MessageCircle, Star, Calendar, ArrowLeft, Music, Wine, Utensils, ShieldCheck, Check, CreditCard } from 'lucide-react';
import { getDictionary } from '../../../../dictionaries/get-dictionary';
import { CONTACT } from '@/config/contact';
import { getVenueBySlug, getEventsByVenueId, mockVenues } from '@/lib/data';
import { VenueCategory } from '@/lib/types';
import { getLocalizedText } from '@/lib/seo';
import WeeklyProgram from '@/components/WeeklyProgram';

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
    en: 'Just Me Milan — VIP Tables, Prices & Dress Code 2026 | Roberto Cavalli Club',
    it: 'Just Me Milano — Tavoli VIP, Prezzi & Dress Code 2026 | Club Roberto Cavalli',
  },
  'v-voya': {
    en: 'Voya Rooftop Milan — Skyline Bar, Tables & Aperitivo 2026 | Isola',
    it: 'Voya Rooftop Milano — Bar Vista Skyline, Tavoli & Aperitivo 2026 | Isola',
  },
  'v-pineta': {
    en: 'Pineta Club Milan — Aperitivo Cantato, Prices & Table Booking 2026',
    it: 'Pineta Club Milano — Aperitivo Cantato, Prezzi & Prenotazione Tavoli 2026',
  },
  'v-playclub': {
    en: 'Play Club Milan — Hip Hop, Afrobeats & VIP Tables 2026 | Corso Como',
    it: 'Play Club Milano — Hip Hop, Afrobeats & Tavoli VIP 2026 | Corso Como',
  },
  'v-55milano': {
    en: '55 Milano — Singing Dinner, Apericena & Table Booking 2026 | Sempione',
    it: '55 Milano — Cena Cantata, Apericena & Prenotazione Tavoli 2026 | Sempione',
  },
  'v-repvblic': {
    en: 'Repvblic Milan — Dirty Monday, House & Hip-Hop Nights 2026',
    it: 'Repvblic Milano — Dirty Monday, House & Serate Hip-Hop 2026',
  },
  'v-11clubroom': {
    en: '11 Clubroom Milan — VIP Table Booking & Urban Nights 2026',
    it: '11 Clubroom Milano — Prenotazione Tavoli VIP & Serate Urban 2026',
  },
  'v-church81': {
    en: 'Church 81 Milan — Bottle Prices, Dress Code & Guestlist 2026 | Navigli',
    it: 'Church 81 Milano — Prezzi Bottiglie, Dress Code & Lista 2026 | Navigli',
  },
  'v-mibmilano': {
    en: 'MIB Milan — Dinner Show, VIP Tables & Booking 2026 | Piazza Affari',
    it: 'MIB Milano — Dinner Show, Tavoli VIP & Prenotazioni 2026 | Piazza Affari',
  },
  'v-gattopardo': {
    en: 'Gattopardo Milan — Club in a Church, Table Prices & Nights 2026',
    it: 'Gattopardo Milano — Club in una Chiesa, Prezzi Tavoli & Serate 2026',
  },
  'v-terrazza21': {
    en: 'Terrazza 21 Milan — Duomo View Aperitivo & Rooftop Reservations 2026',
    it: 'Terrazza 21 Milano — Aperitivo Vista Duomo & Prenotazioni Rooftop 2026',
  },
  'v-magazzini': {
    en: 'Magazzini Generali Milan — Techno, Live Music & Events 2026 | Porta Romana',
    it: 'Magazzini Generali Milano — Techno, Musica Live & Eventi 2026 | Porta Romana',
  },
  'v-armani-prive': {
    en: 'Armani Privé Milan — Exclusive Club, Prices & Guestlist 2026 | Brera',
    it: 'Armani Privé Milano — Club Esclusivo, Prezzi & Lista 2026 | Brera',
  },
  'v-volt': {
    en: 'Volt Club Milan — Techno, Electronic Music & Tickets 2026 | Porta Venezia',
    it: 'Volt Club Milano — Techno, Musica Elettronica & Biglietti 2026 | Porta Venezia',
  },
  'v-hollywood': {
    en: 'Hollywood Milan — VIP Tables, Guestlist & Prices 2026 | Corso Como',
    it: 'Hollywood Milano — Tavoli VIP, Lista & Prezzi 2026 | Corso Como',
  },
  'v-apollo': {
    en: 'Apollo Club Milan — Electronic Music, Tickets & Events 2026 | Navigli',
    it: 'Apollo Club Milano — Musica Elettronica, Biglietti & Serate 2026 | Navigli',
  },
  'v-ceresio-7': {
    en: 'Ceresio 7 Milan — Twin Pool Rooftop Bar, Aperitivo & Booking 2026',
    it: 'Ceresio 7 Milano — Rooftop Bar Piscine Gemelle, Aperitivo & Prenotazioni 2026',
  },
  'v-theclub': {
    en: 'The Club Milan — Commercial Nights, VIP Tables & Guestlist 2026 | Brera',
    it: 'The Club Milano — Serate Commercial, Tavoli VIP & Lista 2026 | Brera',
  },
};

const venueKeywords: Record<string, { en: string[]; it: string[] }> = {
  'v-justme': {
    en: ['just me milan', 'just me club sempione', 'just me vip table prices', 'roberto cavalli club milan', 'just me dress code', 'torre branca nightclub milan', 'just me guestlist 2026'],
    it: ['just me milano', 'just me club sempione', 'prezzi tavoli just me', 'discoteca roberto cavalli milano', 'just me dress code', 'club torre branca milano', 'just me lista 2026'],
  },
  'v-voya': {
    en: ['voya rooftop milan', 'milan rooftop bar 2026', 'voya rooftop isola', 'skyline bar milan', 'voya rooftop aperitivo', 'milan rooftop restaurant reservation'],
    it: ['voya rooftop milano', 'bar terrazza milano 2026', 'voya rooftop isola', 'bar vista skyline milano', 'aperitivo voya rooftop', 'prenotazione rooftop milano'],
  },
  'v-pineta': {
    en: ['pineta club milan', 'pineta aperitivo cantato', 'pineta singing aperitivo milan', 'pineta table booking', 'pineta milan prices 2026', 'aperitivo milan corso como'],
    it: ['pineta club milano', 'aperitivo cantato pineta', 'pineta cena cantata milano', 'prenotazione tavolo pineta', 'pineta prezzi 2026', 'aperitivo corso como milano'],
  },
  'v-playclub': {
    en: ['play club milan', 'play club hip hop milan', 'play club afrobeats', 'play club corso como', 'milan hip hop club 2026', 'vip tables corso como milan'],
    it: ['play club milano', 'play club hip hop milano', 'play club afrobeats', 'play club corso como', 'discoteca hip hop milano 2026', 'tavoli vip corso como'],
  },
  'v-55milano': {
    en: ['55 milano', '55 milano apericena', '55 milano singing dinner', '55 milano vip table booking', 'cena cantata sempione milan', '55 milan aperitivo'],
    it: ['55 milano', 'apericena 55 milano', 'cena cantata 55 milano', 'prenotazione tavolo 55 milano', 'cena cantata sempione', 'aperitivo 55 milano'],
  },
  'v-repvblic': {
    en: ['repvblic milan', 'repvblic dirty monday', 'repvblic house music milan', 'milan underground club 2026', 'repvblic guestlist', 'house music club milan'],
    it: ['repvblic milano', 'repvblic dirty monday', 'repvblic musica house milano', 'club underground milano 2026', 'repvblic lista', 'discoteca house milano'],
  },
  'v-11clubroom': {
    en: ['11 clubroom milan', '11 clubroom vip table', '11 clubroom urban nights', 'corso como vip club milan', '11 clubroom prices 2026', 'urban club milan booking'],
    it: ['11 clubroom milano', '11 clubroom tavoli vip', '11 clubroom serate urban', 'club vip corso como milano', '11 clubroom prezzi 2026', 'prenotazione club urban milano'],
  },
  'v-church81': {
    en: ['church 81 milan', 'church 81 navigli', 'church 81 bottle service prices', 'navigli nightclub milan 2026', 'church 81 dress code', 'church 81 guestlist'],
    it: ['church 81 milano', 'church 81 navigli', 'prezzi bottiglie church 81', 'discoteca navigli milano 2026', 'church 81 dress code', 'church 81 lista'],
  },
  'v-mibmilano': {
    en: ['mib milan', 'mib milano dinner show', 'mib milan vip table', 'piazza affari nightclub milan', 'mib milan prices 2026', 'dinner show milan booking'],
    it: ['mib milano', 'mib dinner show', 'tavolo vip mib milano', 'discoteca piazza affari milano', 'prezzi mib 2026', 'prenotazione dinner show milano'],
  },
  'v-gattopardo': {
    en: ['gattopardo milan', 'gattopardo club church milan', 'gattopardo table prices', 'gattopardo sempione milan 2026', 'ex church nightclub milan', 'gattopardo dress code'],
    it: ['gattopardo milano', 'gattopardo club chiesa milano', 'prezzi tavoli gattopardo', 'gattopardo sempione 2026', 'discoteca ex chiesa milano', 'gattopardo dress code'],
  },
  'v-terrazza21': {
    en: ['terrazza 21 milan', 'terrazza 21 duomo view', 'terrazza 21 aperitivo milan', 'rooftop bar duomo milan 2026', 'terrazza 21 booking', 'milan rooftop aperitivo centro'],
    it: ['terrazza 21 milano', 'terrazza 21 vista duomo', 'aperitivo terrazza 21 milano', 'rooftop bar duomo milano 2026', 'prenotazione terrazza 21', 'aperitivo rooftop centro milano'],
  },
  'v-magazzini': {
    en: ['magazzini generali milan', 'magazzini generali techno', 'magazzini generali live music', 'porta romana club milan 2026', 'magazzini generali tickets', 'techno club milan'],
    it: ['magazzini generali milano', 'magazzini generali techno', 'magazzini generali musica live', 'club porta romana milano 2026', 'biglietti magazzini generali', 'discoteca techno milano'],
  },
  'v-armani-prive': {
    en: ['armani prive milan', 'armani hotel club milan', 'armani prive guestlist', 'brera luxury club milan 2026', 'armani prive prices', 'fashion week club milan'],
    it: ['armani privé milano', 'club armani hotel milano', 'lista armani privé', 'club lusso brera milano 2026', 'prezzi armani privé', 'club fashion week milano'],
  },
  'v-volt': {
    en: ['volt club milan', 'volt techno milan', 'volt porta venezia', 'milan techno underground 2026', 'volt club tickets', 'electronic music club milan'],
    it: ['volt club milano', 'volt techno milano', 'volt porta venezia', 'techno underground milano 2026', 'biglietti volt club', 'discoteca musica elettronica milano'],
  },
  'v-hollywood': {
    en: ['hollywood milan', 'hollywood corso como', 'hollywood club prices 2026', 'corso como nightlife milan', 'hollywood guestlist', 'commercial club corso como'],
    it: ['hollywood milano', 'hollywood corso como', 'prezzi hollywood club 2026', 'vita notturna corso como', 'lista hollywood milano', 'discoteca commercial corso como'],
  },
  'v-apollo': {
    en: ['apollo club milan', 'apollo navigli electronic', 'apollo milan tickets 2026', 'navigli club milan', 'apollo milan dj events', 'electronic music navigli milan'],
    it: ['apollo club milano', 'apollo navigli elettronica', 'biglietti apollo milano 2026', 'club navigli milano', 'eventi dj apollo milano', 'musica elettronica navigli'],
  },
  'v-ceresio-7': {
    en: ['ceresio 7 milan', 'ceresio 7 twin pools rooftop', 'ceresio 7 aperitivo booking', 'milan pool rooftop bar 2026', 'ceresio 7 isola milan', 'rooftop pool bar milan'],
    it: ['ceresio 7 milano', 'ceresio 7 piscine gemelle', 'prenotazione aperitivo ceresio 7', 'rooftop bar piscina milano 2026', 'ceresio 7 isola milano', 'bar piscina rooftop milano'],
  },
  'v-theclub': {
    en: ['the club milan', 'the club brera', 'the club milan commercial nights', 'brera nightclub milan 2026', 'the club guestlist prices', 'commercial club brera milan'],
    it: ['the club milano', 'the club brera', 'serate commercial the club milano', 'discoteca brera milano 2026', 'lista prezzi the club', 'discoteca commercial brera'],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const venue = getVenueBySlug(slug, locale);

  if (!venue) return {};

  const name = getLocalizedText(venue.localizedContent.name, locale);
  const rawDescription = getLocalizedText(venue.localizedContent.description, locale);
  const metaDescription = rawDescription.length > 158
    ? rawDescription.substring(0, 155) + '...'
    : rawDescription;

  const title = venueTitles[venue.id]?.[locale as 'en' | 'it']
    ?? (locale === 'it'
      ? `${name} Milano | Prezzi, Tavoli e Liste 2026`
      : `${name} Milan | Prices, Tables and Guestlists 2026`);

  const keywords = venueKeywords[venue.id]?.[locale as 'en' | 'it']
    ?? (locale === 'it'
      ? [`${name} milano`, 'prezzi tavoli', 'lista', 'vita notturna milano 2026']
      : [`${name} milan`, 'vip tables prices', 'guestlist', 'milan nightlife 2026']);

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const enSlug = venue.slugs.en;
  const itSlug = venue.slugs.it || enSlug;
  const ogImage = venue.image || venue.gallery?.[0] || '/images/milan-nightclub-luxury-vip-champagne.webp';
  const canonicalUrl = `${baseUrl}/${locale === 'it' ? 'it/' : ''}clubs/${slug}`;

  return {
    title,
    description: metaDescription,
    keywords,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/clubs/${enSlug}`,
        'it': `${baseUrl}/it/clubs/${itSlug}`,
        'x-default': `${baseUrl}/clubs/${enSlug}`,
      },
    },
    openGraph: {
      title,
      description: metaDescription,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Nightlife Milan',
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      images: [{
        url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`,
        width: 1200,
        height: 630,
        alt: locale === 'it'
          ? `${name} Milano — locale notturno, tavoli VIP`
          : `${name} Milan — nightclub, VIP tables`,
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
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">VIP Access Only</h1>
          <p className="text-white/40 text-lg">
            {locale === 'it' 
              ? "Questo locale è accessibile solo tramite prenotazione privata. Contattaci per verificare la disponibilità e i prezzi."
              : "This venue is accessible via private booking only. Contact us to check availability and pricing."}
          </p>
          <a
            href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(locale === 'it' ? "Ciao, vorrei informazioni per l'accesso VIP ad un locale esclusivo." : "Hi, I'm looking for VIP access to an exclusive venue.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-colors w-full sm:w-auto"
          >
            {locale === 'it' ? "Richiedi Accesso VIP" : "Request VIP Access"}
          </a>
        </div>
      </main>
    );
  }

  const dict = await getDictionary(locale as 'en' | 'it');
  const t = dict.club;
  
  // Map specific venues to dictionary keys for detailed content
  const dictKeyMap: Record<string, string> = {
    'v-justme': 'justme',
    'v-voya': 'voya',
    'v-pineta': 'pineta',
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

  const isWhatsAppOnlyVenue = [
    'v-voya', 'v-11clubroom', 'v-church81', 'v-mibmilano', 
    'v-gattopardo', 'v-terrazza21', 'v-theclub'
  ].includes(venue.id);

  const name = getLocalizedText(venue.localizedContent.name, locale);
  const description = getLocalizedText(venue.localizedContent.description, locale);
  const dressCode = getLocalizedText(venue.localizedContent.dressCode, locale) || "Smart Casual";
  const insiderTip = venue.localizedContent.insiderTip ? getLocalizedText(venue.localizedContent.insiderTip, locale) : '';
  const image = venue.gallery?.[0] || venue.image || '/images/milan-nightclub-luxury-vip-champagne.webp';
  const gallery = venue.gallery?.length ? venue.gallery : [image];
  
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
    : `${CONTACT.whatsapp.link}?text=Hi,%20I'd%20like%20to%20book%20at%20${encodeURIComponent(name)}`;
  const servicesTags = venue.tags || [venue.category];
  
  const events = getEventsByVenueId(venue.id);

  const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": venue.id === 'v-55milano' ? ["NightClub", "Restaurant"] : venue.category === VenueCategory.CLUB ? "NightClub" : "LocalBusiness",
    "name": name,
    "image": image,
    "description": description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": venue.address.streetAddress,
      "addressLocality": "Milan",
      "addressRegion": "MI",
      "postalCode": venue.address.postalCode,
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": venue.coordinates?.latitude || 45.4642,
      "longitude": venue.coordinates?.longitude || 9.1900
    },
    "url": `${baseUrl}/clubs/${venue.slugs.en}`,
    "telephone": "+393519127047",
    "priceRange": venue.priceRange || "€€€",
    "servesCuisine": "Italian",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Thursday", "Friday", "Saturday"],
        "opens": "23:00",
        "closes": "05:00"
      }
    ],
    ...(venue.sameAs?.length ? { "sameAs": venue.sameAs } : {}),
    ...(gallery.length > 1 ? { "image": gallery } : {}),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+39-351-912-7047",
      "contactType": "reservations",
      "availableLanguage": ["English", "Italian"],
      "contactOption": "TollFree"
    }
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}${locale === 'it' ? '/it' : ''}` },
      { "@type": "ListItem", "position": 2, "name": locale === 'it' ? "Club Milano" : "Milan Clubs", "item": `${baseUrl}${locale === 'it' ? '/it' : ''}/clubs` },
      { "@type": "ListItem", "position": 3, "name": name, "item": `${baseUrl}${locale === 'it' ? '/it' : ''}/clubs/${venue.slugs.en}` },
    ],
  };

  return (
    <main className="bg-[#131009] min-h-screen text-white font-sans selection:bg-champagne selection:text-white pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[600px] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131009] via-[#131009]/50 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="inline-flex items-center text-white/50 hover:text-champagne transition-colors mb-8 text-sm uppercase tracking-wider font-semibold">
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
                  {venue.category}
                </span>
              </div>
              <h1 className="font-serif text-6xl md:text-8xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
                {name}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 font-light tracking-wide">
                {c?.subtitle || description.substring(0, 100) + '...'}
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
                    {locale === 'it' ? 'Disponibile solo via WhatsApp' : 'Available via WhatsApp only'}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QuickInfoBar (4 Info Blocks) */}
      <section className="border-y border-white/10 bg-[#131009]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/10">
            <div className="flex flex-col px-4 first:pl-0">
              <MapPin className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{t.labels.address}</span>
              <span className="text-sm font-medium text-white/80">{c?.location || venue.address.streetAddress}</span>
              {venue.coordinates?.latitude && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${venue.coordinates.latitude},${venue.coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-xs text-champagne/70 hover:text-champagne underline underline-offset-2 transition-colors"
                >
                  {locale === 'it' ? 'Apri in Google Maps ↗' : 'Open in Google Maps ↗'}
                </a>
              )}
            </div>
            <div className="flex flex-col px-4">
              <Clock className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{t.labels.targetAge}</span>
              <span className="text-sm font-medium text-white/80">{c?.target || "18+"}</span>
            </div>
            <div className="flex flex-col px-4">
              <Shirt className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{t.labels.dressCode}</span>
              <span className="text-sm font-medium text-white/80">{dressCode}</span>
            </div>
            <div className="flex flex-col px-4">
              <Music className="w-6 h-6 text-champagne mb-2" />
              <span className="text-xs text-white/40 uppercase tracking-wider mb-1">{t.labels.music}</span>
              <span className="text-sm font-medium text-white/80">{c?.music || "Various"}</span>
            </div>
          </div>
        </div>
      </section>

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
                  ? `${name} si trova in ${venue.address.streetAddress}, Milano. ${description.substring(0, 180)}... Prenota via WhatsApp +39 351 912 7047.`
                  : `${name} is located at ${venue.address.streetAddress}, Milan. ${description.substring(0, 180)}... Book via WhatsApp +39 351 912 7047.`}
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

          {/* Weekly Schedule (Event Component) */}
          <WeeklyProgram venueId={venue.id} venueName={name} locale={locale as 'en' | 'it'} />

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
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#131009] ${isFirst ? 'bg-champagne text-black' : 'bg-white/[0.08] text-champagne'} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10`}>
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
                      {locale === 'it' ? 'Disponibile solo via WhatsApp' : 'Available via WhatsApp only'}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Venue Gallery & More Info — 3rd H2 */}
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
                      `${name} Milan — interior atmosphere and dance floor`,
                      `${name} Milan — VIP tables and bottle service`,
                      `${name} Milan — bar and lounge area`,
                      `${name} Milan — nightclub crowd and DJ set`,
                      `${name} Milan — private room and VIP area`,
                      `${name} Milan — venue entrance and facade`,
                      `${name} Milan — terrace and outdoor space`,
                    ][i] ?? `${name} Milan — venue photo ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.03]">
              <h3 className="font-serif text-lg text-white mb-3">
                {locale === 'it' ? 'Informazioni Pratiche' : 'Practical Information'}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                    {locale === 'it' ? 'Indirizzo' : 'Address'}
                  </p>
                  <p className="text-white/70">{venue.address.streetAddress}, Milan</p>
                  {venue.coordinates?.latitude && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${venue.coordinates.latitude},${venue.coordinates.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-champagne/70 hover:text-champagne underline underline-offset-2 transition-colors mt-1 inline-block"
                    >
                      {locale === 'it' ? 'Apri in Google Maps ↗' : 'Open in Google Maps ↗'}
                    </a>
                  )}
                </div>
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                    {locale === 'it' ? 'Dress Code' : 'Dress Code'}
                  </p>
                  <p className="text-white/70">{dressCode}</p>
                </div>
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                    {locale === 'it' ? 'Prenotazione' : 'Booking'}
                  </p>
                  <p className="text-white/70">WhatsApp +39 351 912 7047</p>
                </div>
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">
                    {locale === 'it' ? 'Servizio' : 'Service'}
                  </p>
                  <p className="text-white/70">{locale === 'it' ? 'Gratuito' : 'Free'}</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <div className="sticky top-32 space-y-8">
            
            {/* Pricing Table */}
            {c?.pricing && (
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
                        {locale === 'it' ? 'Disponibile solo via WhatsApp' : 'Available via WhatsApp only'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

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
    </main>
  );
}
