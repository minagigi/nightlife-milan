import { Metadata } from 'next';
import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
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
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Crown,
  ArrowRight,
  Calendar,
  Building2,
  Users,
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
  const canonical = `${baseUrl}${localePrefix(locale)}/fashion-week`;

  const title = seoTitle(
    tr(
      locale,
      'Milan Fashion Week, Fuorisalone Design Week & Monza F1 VIP Afterparties 2026/2027 | Tables & Brand Buyouts',
      'Milano Fashion Week, Fuorisalone Design Week & Monza F1 Afterparty VIP 2026/2027 | Tavoli Console & Eventi Brand'
    )
  );

  const description = withWhatsApp(
    tr(
      locale,
      'Official Milan Fashion Week (MFW Feb/Sep/Jan/Jun), Salone del Mobile Fuorisalone (April) & Monza F1 Grand Prix VIP Afterparty Hub: book DJ Console tables, Brand Buyouts & Model Agency lists at 1. Just Me, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop & 6. Repvblic. WhatsApp +39 351 912 7047.',
      'Hub ufficiale Milano Fashion Week (Febbraio/Settembre/Gennaio/Giugno), Fuorisalone Design Week (Aprile) e GP F1 Monza: prenota Tavoli Console, Corporate Buyout e accrediti agenzie da 1. Just Me, 2. Pineta, 3. Aria, 4. 55 Milano, 5. Voya Rooftop e 6. Repvblic. WhatsApp +39 351 912 7047.'
    ),
    locale
  );

  const languages = buildLanguageAlternates('/milan-fashion-week');

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
          url: `${baseUrl}/images/pillars/mfw-01.webp`,
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
      images: [`${baseUrl}/images/pillars/mfw-01.webp`],
    },
  };
}

const LUXURY_WEEKS = [
  {
    id: 'mfw-womenswear',
    badgeIt: 'SETTIMANA #1 · FEBBRAIO (FW) & SETTEMBRE (SS) · CAMERA NAZIONALE DELLA MODA',
    badgeEn: 'LUXURY WEEK #1 · FEBRUARY (FW) & SEPTEMBER (SS) · WOMENSWEAR RUNWAYS',
    titleIt: '1. Milano Fashion Week Donna (Febbraio & Settembre): After-Show Party, Tavoli Backstage & Console DJ',
    titleEn: '1. Milan Fashion Week Womenswear (February & September): After-Show Parties, Backstage & DJ Console Tables',
    datesIt: 'Settembre 2026 (SS27) · Febbraio 2027 (FW27/28) · 7 Giorni Non-Stop',
    datesEn: 'September 2026 (SS27) · February 2027 (FW27/28) · 7 Non-Stop Days',
    minSpendIt: 'Tavoli Pista €800 - €1.500 · Privé Branca / Console DJ €2.000 - €10.000',
    minSpendEn: 'Dancefloor VIP €800 - €1,500 · Privé Branca / DJ Console €2,000 - €10,000',
    summaryIt:
      'Durante le due edizioni principali della Milano Fashion Week Donna (Febbraio e Settembre), la città accoglie oltre 150.000 buyer internazionali, supermodelle, direttori creativi, celebrity e stampa mondiale. Ogni sera, dal Martedì alla Domenica fino al Lunedì di chiusura, i 6 locali prioritari ospitano gli after-show party più esclusivi: 1. Just Me Milano (firmato Roberto Cavalli sotto la Torre Branca, aperto 7 notti su 7) è il cuore pulsante assoluto di MFW; 2. Pineta Corso Como accoglie le grandi cene cantate delle agenzie; 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop (20° piano) e 6. Repvblic ospitano international guest DJs di calibro mondiale.',
    summaryEn:
      'During the two flagship editions of Milan Fashion Week Womenswear (February and September), the city welcomes over 150,000 international buyers, supermodels, creative directors, celebrities, and global press. Every night from Tuesday through Monday, our 6 priority venues host the weeks flagship after-show parties: 1. Just Me Milano (designed by Roberto Cavalli beneath Torre Branca, open 7 nights a week) is the undisputed epicenter of MFW; 2. Pineta Corso Como hosts high-energy agency dinners; while 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop (20th floor), and 6. Repvblic feature global headliner DJs.',
    clubsIt:
      '1. Just Me Milano (7/7 Icona Roberto Cavalli) · 2. Pineta Corso Como · 5. Voya Rooftop 20° Piano · 6. Repvblic · 3. Aria Club · 4. 55 Milano · Tocqueville 13',
    clubsEn:
      '1. Just Me Milano (7/7 Roberto Cavalli Icon) · 2. Pineta Corso Como · 5. Voya Rooftop 20th Floor · 6. Repvblic · 3. Aria Club · 4. 55 Milano · Tocqueville 13',
  },
  {
    id: 'mfw-menswear',
    badgeIt: 'SETTIMANA #2 · GENNAIO (FW) & GIUGNO (SS) · MODA UOMO & SHOWROOM',
    badgeEn: 'LUXURY WEEK #2 · JANUARY (FW) & JUNE (SS) · MENSWEAR & SHOWROOMS',
    titleIt: '2. Milano Fashion Week Uomo (Gennaio & Giugno): Cocktail Party, Showroom Privé & Dinner Show',
    titleEn: '2. Milan Fashion Week Menswear (January & June): Cocktail Showcases, Showroom Privés & Dinner Shows',
    datesIt: 'Gennaio 2027 (FW27/28) · Giugno 2027 (SS28) · Venerdì - Martedì',
    datesEn: 'January 2027 (FW27/28) · June 2027 (SS28) · Friday - Tuesday',
    minSpendIt: 'Royal Cocktail & Dinner Show €50 - €120 · Tavoli VIP €500 - €3.000',
    minSpendEn: 'Royal Cocktail & Dinner Show €50 - €120 · VIP Tables €500 - €3,000',
    summaryIt:
      'La Milano Fashion Week Uomo di Gennaio e Giugno unisce presentazioni sartoriali, street-luxury brand, cocktail party al tramonto e clubbing d avanguardia. A Giugno brillano i giardini estivi di 1. Just Me Parco Sempione e 3. Aria Club San Siro insieme al tramonto panoramico al 20° piano di 5. Voya Rooftop; a Gennaio i Dinner Show di 4. 55 Milano, 2. Pineta Corso Como e il Dirty Monday del lunedì di chiusura da 6. Repvblic sono tappe fisse per buyer e talent.',
    summaryEn:
      'Milan Fashion Week Menswear in January and June blends luxury tailoring presentations, streetwear capsules, sunset cocktail receptions, and late-night clubbing. In June, the open-air gardens of 1. Just Me Parco Sempione and 3. Aria Club San Siro shine alongside sunset views on the 20th floor at 5. Voya Rooftop; in January, the Dinner Shows at 4. 55 Milano and 2. Pineta Corso Como plus the closing Monday party at 6. Repvblic draw buyers and talent.',
    clubsIt:
      '1. Just Me Garden & Dome · 5. Voya Rooftop (20° Piano) · 4. 55 Milano Dinner Show · 2. Pineta · 3. Aria Club · 6. Repvblic (Dirty Monday)',
    clubsEn:
      '1. Just Me Garden & Dome · 5. Voya Rooftop (20th Floor) · 4. 55 Milano Dinner Show · 2. Pineta · 3. Aria Club · 6. Repvblic (Dirty Monday)',
  },
  {
    id: 'fuorisalone-design-week',
    badgeIt: 'SETTIMANA #3 · APRILE · SALONE DEL MOBILE & FUORISALONE MILANO DESIGN WEEK',
    badgeEn: 'LUXURY WEEK #3 · APRIL · SALONE DEL MOBILE & FUORISALONE DESIGN WEEK',
    titleIt: '3. Salone del Mobile & Fuorisalone Design Week (Aprile): Rooftop Party, Afro-House & Super Privé',
    titleEn: '3. Salone del Mobile & Fuorisalone Design Week (April): Panoramic Rooftops, Afro-House & Super Privés',
    datesIt: 'Aprile 2027 (Martedì - Domenica) · Oltre 400.000 Visitatori Internazionali',
    datesEn: 'April 2027 (Tuesday - Sunday) · Over 400,000 International Visitors',
    minSpendIt: 'Sunset Rooftop Table €400 - €1.000 · Super Privé Club €1.000 - €6.000',
    minSpendEn: 'Sunset Rooftop Table €400 - €1,000 · Club Super Privé €1,000 - €6,000',
    summaryIt:
      'La settimana del Salone del Mobile e del Fuorisalone (Aprile) è la settimana con la più alta densità di eventi, collezionisti, architetti e VIP internazionali dell intero anno milanese. Quando alle 21:00 chiudono le installazioni di Brera, Tortona, Isola e Porta Venezia, il flusso VIP converge verso il 20° piano di 5. Voya Rooftop, i 1.000 mq di 4. 55 Milano in Sempione, i showcase Afro-House e Melodic Techno di 1. Just Me sotto la Torre Branca, 2. Pineta, 3. Aria Club e i grandi palchi di Fabrique e Alcatraz.',
    summaryEn:
      'Salone del Mobile and Fuorisalone Design Week in April is the single highest-demand week of the entire calendar year in Milan. When the design installations across Brera, Tortona, Isola, and Porta Venezia close at 21:00, the international crowd converges on the 20th floor of 5. Voya Rooftop, the 1,000-sqm industrial space of 4. 55 Milano, the Afro-House and Melodic Techno showcases at 1. Just Me under Torre Branca, 2. Pineta, 3. Aria Club, and the mega-stages of Fabrique and Alcatraz.',
    clubsIt:
      '5. Voya Rooftop (20° Piano Skyline) · 1. Just Me (7/7) · 4. 55 Milano (1.000 mq) · 2. Pineta · 3. Aria Club · 6. Repvblic · Fabrique · Alcatraz',
    clubsEn:
      '5. Voya Rooftop (20th Floor Skyline) · 1. Just Me (7/7) · 4. 55 Milano (1,000 sqm) · 2. Pineta · 3. Aria Club · 6. Repvblic · Fabrique · Alcatraz',
  },
  {
    id: 'monza-f1-grand-prix',
    badgeIt: 'SETTIMANA #4 · SETTEMBRE · FORMULA 1 GRAN PREMIO D ITALIA MONZA WEEKEND',
    badgeEn: 'LUXURY WEEK #4 · SEPTEMBER · FORMULA 1 ITALIAN GRAND PRIX MONZA WEEKEND',
    titleIt: '4. Gran Premio d Italia F1 Monza Weekend (Settembre): Official Drivers, Paddock Club & VIP Afterparties',
    titleEn: '4. Formula 1 Italian Grand Prix Monza Weekend (September): Drivers, Paddock Club & VIP Afterparties',
    datesIt: 'Primo Weekend di Settembre (Giovedì - Domenica Notte)',
    datesEn: 'First Weekend of September (Thursday - Sunday Night)',
    minSpendIt: 'Tavoli VIP Pista €600 - €1.200 · Privé Paddock / Console €1.500 - €8.000',
    minSpendEn: 'Dancefloor VIP €600 - €1,200 · Paddock Privé / Console €1,500 - €8,000',
    summaryIt:
      'Durante il weekend del Gran Premio d Italia di Formula 1 all Autodromo Nazionale di Monza, tutti i team F1, gli sponsor del Paddock Club, i piloti, gli armatori e i clienti UHNW alloggiano negli hotel 5 stelle di Milano. Dal Giovedì alla Domenica notte (celebrando il podio della gara domenicale), 1. Just Me Milano, 5. Voya Rooftop 20° Piano, 2. Pineta Corso Como, 3. Aria Club, 4. 55 Milano e 6. Repvblic mettono in scena sfilate di Jeroboam e Mathusalem di Dom Pérignon e Armand de Brignac.',
    summaryEn:
      'During the Formula 1 Italian Grand Prix weekend at Monza Circuit, F1 teams, Paddock Club sponsors, drivers, and UHNW guests stay across Milans 5-star hotels. From Thursday night through the Sunday Race Podium celebration, 1. Just Me Milano, 5. Voya Rooftop 20th Floor, 2. Pineta Corso Como, 3. Aria Club, 4. 55 Milano, and 6. Repvblic stage legendary bottle parades featuring Jeroboam and Methuselah formats of Dom Pérignon and Armand de Brignac.',
    clubsIt:
      '1. Just Me Milano (Domenica F1 Closing Party) · 5. Voya Rooftop 20° Piano · 2. Pineta Corso Como · 6. Repvblic · 3. Aria Club · 4. 55 Milano',
    clubsEn:
      '1. Just Me Milano (Sunday F1 Closing Party) · 5. Voya Rooftop 20th Floor · 2. Pineta Corso Como · 6. Repvblic · 3. Aria Club · 4. 55 Milano',
  },
];

const PRIORITY_FASHION_VENUES = [
  {
    rank: 1,
    slug: 'just-me-milano',
    badgeIt: '#1 Priorità Assoluta · Fondato da Roberto Cavalli · Aperto 7/7',
    badgeEn: '#1 Top Priority · Founded by Roberto Cavalli · Open 7/7',
    name: '1. Just Me Milano (Torre Branca, Parco Sempione)',
    roleIt: 'Quartier Generale Ufficiale After-Show MFW, Fuorisalone & F1 Monza (Lun-Dom)',
    roleEn: 'Official Flagship Hub for MFW After-Shows, Fuorisalone & F1 Monza (Mon-Sun)',
    specsIt: 'Capacità Buyout: fino a 800 ospiti · Privé Branca + Giardino + Ristorante Cavalli',
    specsEn: 'Buyout Capacity: up to 800 guests · Privé Branca + Garden + Cavalli Restaurant',
    image: '/images/pillars/mfw-01.webp',
  },
  {
    rank: 2,
    slug: 'pineta-club-milano',
    badgeIt: '#2 Priorità · Corso Como / Porta Nuova Fashion District',
    badgeEn: '#2 Priority · Corso Como / Porta Nuova Fashion District',
    name: '2. Pineta Club Milano (Via Messina 38 / Corso Como)',
    roleIt: 'Cene Cantate per Showroom, Model Agencies & Party Reggaeton/Commercial',
    roleEn: 'Singing Dinners for Showrooms, Model Agencies & High-Energy Clubbing',
    specsIt: 'Capacità Buyout: fino a 650 ospiti · Brandizzazione LED Wall & Bottle Show',
    specsEn: 'Buyout Capacity: up to 650 guests · Custom LED Wall Branding & Bottle Shows',
    image: '/images/pillars/mfw-02.webp',
  },
  {
    rank: 3,
    slug: 'aria-club-milano',
    badgeIt: '#3 Priorità · San Siro Luxury Garden & Main Room',
    badgeEn: '#3 Priority · San Siro Luxury Garden & Main Room',
    name: '3. Aria Club Milano (Piazzale dello Sport 14, San Siro)',
    roleIt: 'Grandi Showcase Internazionali, Giardino Estivo Giugno/Settembre & 3 Privé',
    roleEn: 'Large-Scale International Showcases, Summer Garden (Jun/Sep) & 3 VIP Zones',
    specsIt: 'Capacità Buyout: fino a 1.200 ospiti · Parcheggio VIP & Super Privé Console',
    specsEn: 'Buyout Capacity: up to 1,200 guests · VIP Valet Parking & DJ Console Super Privé',
    image: '/images/pillars/mfw-03.webp',
  },
  {
    rank: 4,
    slug: '55-milano',
    badgeIt: '#4 Priorità · 1.000 mq Industrial-Chic in Sempione',
    badgeEn: '#4 Priority · 1,000 sqm Industrial-Chic Space in Sempione',
    name: '4. 55 Milano / FiftyFive (Via Piero della Francesca 55)',
    roleIt: 'Sfilate Indipendenti, Lanci Prodotto Fuorisalone, Corporate Cocktail & Dinner Show',
    roleEn: 'Independent Runways, Fuorisalone Product Launches, Corporate Cocktails & Dinner Shows',
    specsIt: 'Capacità Buyout: fino a 1.000 ospiti · Ex Deposito Storico + Terrazza',
    specsEn: 'Buyout Capacity: up to 1,000 guests · Historic Depot + Open-Air Terrace',
    image: '/images/pillars/mfw-04.webp',
  },
  {
    rank: 5,
    slug: 'voya-rooftop-milan',
    badgeIt: '#5 Priorità · 20° Piano Sky Lounge (85m d Altezza)',
    badgeEn: '#5 Priority · 20th-Floor Sky Lounge (85m High)',
    name: '5. Voya Rooftop Milan (Via Achille Papa 30, Portello/CityLife)',
    roleIt: 'Press Days, Sunset Cocktail per Brand del Lusso & Private Skyline Party',
    roleEn: 'Press Days, Luxury Brand Sunset Cocktails & Private 360° Skyline Parties',
    specsIt: 'Capacità Buyout: fino a 300 ospiti al 20° piano · Vista CityLife & Duomo/San Siro',
    specsEn: 'Buyout Capacity: up to 300 guests on the 20th floor · 360° Skyline Glass Walls',
    image: '/images/pillars/mfw-05.webp',
  },
  {
    rank: 6,
    slug: 'repvblic-milano',
    badgeIt: '#6 Priorità · Piazza della Repubblica Design Club',
    badgeEn: '#6 Priority · Piazza della Repubblica Design Club',
    name: '6. Repvblic Milano (Piazza della Repubblica / Mecenate)',
    roleIt: 'Afterparty Streetwear & Urban Capsule, Dirty Monday & Fashion Weekends',
    roleEn: 'Streetwear & Urban Capsule Afterparties, Dirty Monday & Fashion Weekends',
    specsIt: 'Capacità Buyout: fino a 600 ospiti · Lighting Rig Immersivo & Console Privé',
    specsEn: 'Buyout Capacity: up to 600 guests · Immersive Lighting Rig & Console Privé',
    image: '/images/pillars/mfw-06.webp',
  },
];

export default async function FashionWeekPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const lp = localePrefix(locale);
  const canonicalUrl = `${baseUrl}${lp}/fashion-week`;

  const faqs = [
    {
      q: isIt
        ? 'Dove si tengono i migliori afterparty della Milano Fashion Week (Febbraio e Settembre)?'
        : 'Where are the best Milan Fashion Week afterparties held in February and September?',
      a: isIt
        ? 'Il punto di riferimento #1 assoluto durante tutta la Milano Fashion Week (dal Martedì al Lunedì, 7 notti su 7) è Just Me Milano sotto la Torre Branca in Parco Sempione (Viale Luigi Camoens 2), fondato dallo stilista Roberto Cavalli. Insieme al Just Me, gli eventi e tavoli VIP più ambiti si svolgono da 2. Pineta Club (Corso Como), 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop (20° piano vista skyline) e 6. Repvblic (Piazza della Repubblica).'
        : 'The #1 flagship venue throughout Milan Fashion Week (open Tuesday through Monday, 7 nights a week) is Just Me Milano beneath Torre Branca in Parco Sempione (Viale Luigi Camoens 2), founded by designer Roberto Cavalli. Alongside Just Me, the most sought-after VIP tables and after-shows take place at 2. Pineta Club (Corso Como), 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop (20th floor skyline), and 6. Repvblic.',
    },
    {
      q: isIt
        ? 'Come funziona la prenotazione di un Tavolo VIP o Console DJ durante Fashion Week, Fuorisalone e GP F1 Monza?'
        : 'How does booking a VIP Table or DJ Console booth work during Fashion Week, Fuorisalone, and Monza F1?',
      a: isIt
        ? 'Durante le 4 settimane mondiali del lusso a Milano i minimum spend dei tavoli subiscono l adeguamento "Special Event" (€600 - €1.500 in Pista, €1.500 - €10.000 nel Privé Branca / Console DJ, 100% convertito in bottiglie Dom Pérignon, Armand de Brignac, Cristal o Belvedere Magnum). Contatta il Desk Concierge su WhatsApp (+39 351 912 7047) per ricevere la mappa in tempo reale e bloccare la posizione con ingresso Hostess salta-fila.'
        : 'During Milans 4 global luxury weeks, VIP tables operate on Special Event minimum spends (€600 - €1,500 on the Dancefloor, €1,500 - €10,000 in the Privé Branca / DJ Console, 100% converted into Dom Pérignon, Armand de Brignac, Cristal, or Belvedere Magnum bottles). Message our Concierge Desk on WhatsApp (+39 351 912 7047) for live floor plans and fast-track VIP Hostess escort.',
    },
    {
      q: isIt
        ? 'Un brand di moda o design può affittare in esclusiva un intero locale o un intero Privé (Corporate Buyout)?'
        : 'Can a fashion house or design brand rent an entire club or private VIP room (Corporate Buyout)?',
      a: isIt
        ? 'Sì: tramite la divisione Corporate & Brand Privatization di Nightlife Milan (concierge@nightlifemilan.com · +39 351 912 7047) gestiamo l affitto in esclusiva totale o parziale di Voya Rooftop (20° piano per press day e sunset cocktail), 55 Milano (1.000 mq per sfilate ed esposizioni Fuorisalone), Just Me Torre Branca, Pineta Corso Como, Aria Club, Repvblic, Fabrique e Alcatraz, con fatturazione B2B, catering gourmet, security dedicata e personalizzazione LED/red carpet.'
        : 'Yes: through Nightlife Milans Corporate & Brand Privatization Desk (concierge@nightlifemilan.com · +39 351 912 7047), we manage full or partial venue buyouts at Voya Rooftop (20th floor for press days and sunset cocktails), 55 Milano (1,000 sqm for runway shows and Fuorisalone installations), Just Me Torre Branca, Pineta Corso Como, Aria Club, Repvblic, Fabrique, and Alcatraz, complete with corporate invoicing, bespoke catering, private security, and custom branding.',
    },
    {
      q: isIt
        ? 'Come funzionano gli accrediti per agenzie di moda (Model Agencies), PR, buyer e showroom?'
        : 'How does accreditation work for model agencies, bookers, buyers, and fashion showrooms?',
      a: isIt
        ? 'I booker di agenzie di moda (Women, Elite, Why Not, Monster, Next, IMG, D Management, Fashion Model), gli uffici stampa e gli showroom possono accreditare i propri talent o prenotare tavoli cena/dopocena dedicati scrivendo su WhatsApp al +39 351 912 7047 o via email a concierge@nightlifemilan.com.'
        : 'Model agency bookers, PR offices, and fashion showrooms can arrange model guestlist accreditation or reserve dedicated dinner and after-show VIP tables by contacting our Desk directly on WhatsApp (+39 351 912 7047) or via email at concierge@nightlifemilan.com.',
    },
    {
      q: isIt
        ? 'Quali sono i migliori rooftop e club per il Fuorisalone e Salone del Mobile ad Aprile?'
        : 'Which rooftops and clubs are best during Salone del Mobile & Fuorisalone Design Week in April?',
      a: isIt
        ? 'Durante la Design Week di Aprile, la combinazione perfetta inizia alle 18:30 al 20° piano di Voya Rooftop (#5 Priorità, vista skyline a 360 gradi) o negli spazi di 55 Milano (#4 Priorità, Sempione) e prosegue dalle 23:30 con i DJ set internazionali Afro-House e Melodic Techno da Just Me Torre Branca (#1 Priorità), Pineta Corso Como (#2), Aria Club (#3) e Repvblic (#6).'
        : 'During April Design Week, the ultimate itinerary starts at 18:30 on the 20th floor of Voya Rooftop (#5 Priority, 360-degree skyline views) or at 55 Milano (#4 Priority, Sempione), and continues from 23:30 with international Afro-House and Melodic Techno headliners at Just Me Torre Branca (#1 Priority), Pineta Corso Como (#2), Aria Club (#3), and Repvblic (#6).',
    },
    {
      q: isIt
        ? 'Dove festeggiare a Milano la Domenica sera del Gran Premio di Formula 1 di Monza?'
        : 'Where is the main Sunday night party in Milan after the Formula 1 Monza Grand Prix?',
      a: isIt
        ? 'La Domenica sera del GP d Italia di Monza, il Closing Party ufficiale più richiesto da team, sponsor Paddock e fan internazionali si tiene da Just Me Milano (#1 Priorità sotto la Torre Branca, aperto tutta la notte fino alle 05:00), affiancato dal Sunset & Skyline Party al 20° piano di Voya Rooftop (#5) e dalla serata di 55 Milano (#4).'
        : 'On the Sunday night of the Formula 1 Italian Grand Prix, the flagship Closing Party favored by F1 paddock guests, sponsors, and international travelers takes place at Just Me Milano (#1 Priority beneath Torre Branca, open until 05:00), alongside the 20th-floor skyline party at Voya Rooftop (#5) and Sunday night at 55 Milano (#4).',
    },
    {
      q: isIt
        ? 'Qual è il Dress Code richiesto durante la Milano Fashion Week e il Fuorisalone?'
        : 'What is the dress code at Milan VIP clubs during Fashion Week and Design Week?',
      a: isIt
        ? 'Durante MFW e Design Week la selezione estetica all ingresso è ai massimi livelli mondiali: è richiesto un look High-Fashion, Editoriale o Sartoriale Contemporaneo (total black chic, blazer di taglio sartoriale, abiti da cocktail, accessori di ricerca). Anche per chi ha un Tavolo VIP è fondamentale che tutti gli ospiti del gruppo rispettino uno standard estetico curato.'
        : 'During MFW and Design Week, aesthetic door selection is at its highest level: High-Fashion, Editorial, or Contemporary Tailored attire is required (sharp all-black ensembles, tailored blazers, cocktail dresses, statement designer pieces). Even with a confirmed VIP Table, every guest in your party must meet the venues dress code.',
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
          ? 'Milano Fashion Week, Fuorisalone Design Week & Monza F1 VIP Afterparty Hub 2026/2027'
          : 'Milan Fashion Week, Fuorisalone Design Week & Monza F1 VIP Afterparty Hub 2026/2027',
        description: isIt
          ? 'Calendario e guida ufficiale alle 4 Settimane Mondiali del Lusso a Milano (Fashion Week Donna/Uomo, Fuorisalone Salone del Mobile e GP F1 Monza): Tavoli Console, Corporate Buyout e 6 Club Prioritari.'
          : 'Official guide and calendar for Milans 4 Global Luxury Weeks (Womens & Mens Fashion Week, Salone del Mobile Fuorisalone, and Monza F1 GP): DJ Console Tables, Corporate Buyouts, and 6 Priority Clubs.',
        inLanguage: locale,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${baseUrl}#website`,
          name: 'Nightlife Milan',
          url: baseUrl,
        },
        provider: {
          '@type': 'Organization',
          name: 'Nightlife Milan Luxury & Corporate Concierge',
          telephone: '+39 351 912 7047',
          email: 'concierge@nightlifemilan.com',
          url: baseUrl,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#itemlist`,
        name: isIt
          ? 'I 6 Locali Prioritari di Milano per Fashion Week, Fuorisalone e Formula 1 Monza'
          : 'Top 6 Priority Venues in Milan for Fashion Week, Fuorisalone & Formula 1 Monza',
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        numberOfItems: PRIORITY_FASHION_VENUES.length,
        itemListElement: PRIORITY_FASHION_VENUES.map((v, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: v.name,
          url: `${baseUrl}${lp}/clubs/${v.slug}`,
          description: isIt ? `${v.roleIt} (${v.specsIt})` : `${v.roleEn} (${v.specsEn})`,
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
            name: isIt
              ? 'Milano Fashion Week, Fuorisalone & Monza F1'
              : 'Milan Fashion Week, Fuorisalone & Monza F1',
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

      {/* HERO CINEMATOGRAFICA FASHION WEEK, FUORISALONE & F1 MONZA */}
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
              {isIt ? 'Fashion Week, Fuorisalone & F1 Monza' : 'Fashion Week, Fuorisalone & Monza F1'}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-champagne/45 bg-champagne/15 mb-6">
            <Crown className="w-3.5 h-3.5 text-champagne" />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-champagne">
              MFW DONNA &amp; UOMO · SALONE DEL MOBILE FUORISALONE · F1 MONZA PADDOCK VIP
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            {isIt
              ? 'Milano Fashion Week, Fuorisalone Design Week & Monza F1 VIP Afterparty Hub 2026/2027: Tavoli Console, Sfilate & Corporate Buyout'
              : 'Milan Fashion Week, Fuorisalone Design Week & Monza F1 VIP Afterparty Hub 2026/2027: DJ Console Tables, After-Shows & Brand Buyouts'}
          </h1>

          <p className="text-base sm:text-xl text-white/75 leading-relaxed max-w-4xl mb-8">
            {isIt
              ? 'Accedi al circuito chiuso delle 4 Settimane Mondiali del Lusso a Milano: Milano Fashion Week Donna (Febbraio e Settembre), Fashion Week Uomo (Gennaio e Giugno), Salone del Mobile & Fuorisalone Design Week (Aprile) e Gran Premio d Italia F1 Monza (Settembre). Prenota Tavoli Backstage/Console, accrediti Model Agency o la privatizzazione completa del locale (Corporate Buyout) nei nostri 6 club prioritari: 1. Just Me Torre Branca, 2. Pineta Corso Como, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop 20° Piano e 6. Repvblic.'
              : 'Step inside Milans 4 Global Luxury Weeks: Milan Fashion Week Womenswear (February & September), Menswear (January & June), Salone del Mobile & Fuorisalone Design Week (April), and the Formula 1 Monza Italian Grand Prix (September). Reserve Backstage/DJ Console VIP booths, Model Agency accreditations, or full-venue Corporate Buyouts across our 6 priority clubs: 1. Just Me Torre Branca, 2. Pineta Corso Como, 3. Aria Club, 4. 55 Milano, 5. Voya Rooftop 20th Floor, and 6. Repvblic.'}
          </p>

          {/* 4 Hero Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-9">
            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? '#1 Icona Roberto Cavalli' : '#1 Roberto Cavalli Icon'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">Just Me (7/7 MFW Hub)</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Aperto 7 notti su 7 sotto la Torre Branca: il quartier generale di stilisti e top model.'
                  : 'Open 7 nights a week beneath Torre Branca: headquarters for designers & supermodels.'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? '4 Settimane Mondiali' : '4 Global Peak Weeks'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">MFW · Design · F1</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Gennaio, Febbraio, Aprile (Fuorisalone), Giugno e Settembre (MFW + GP Monza).'
                  : 'January, February, April (Fuorisalone), June, and September (MFW + Monza F1).'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'Privatizzazione Brand' : 'Full Venue Buyouts'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">200 - 2.500 Ospiti</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Affitto esclusivo di Rooftop 20° Piano, Privé o interi club con fatturazione B2B.'
                  : 'Exclusive buyouts of 20th-Floor Rooftops, VIP rooms, or full clubs with B2B invoicing.'}
              </p>
            </div>

            <div className="rounded-2xl border border-champagne/30 bg-black/55 p-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'Desk VIP & Agenzie' : 'VIP & Agency Desk'}
              </div>
              <div className="font-serif text-2xl font-bold text-white">+39 351 912 7047</div>
              <p className="text-xs text-white/60 mt-1">
                {isIt
                  ? 'Prenotazione diretta Super Privé Console, Jeroboam Dom Pérignon e liste showroom.'
                  : 'Direct booking for DJ Console Super Privés, Dom Pérignon Jeroboams & showroom lists.'}
              </p>
            </div>
          </div>

          {/* Dual CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/393519127047?text=${encodeURIComponent(
                isIt
                  ? 'Ciao Concierge Nightlife Milan! Vorrei prenotare un Tavolo VIP / Afterparty per Fashion Week / Fuorisalone / F1 Monza.'
                  : 'Hi Nightlife Milan Concierge! I would like to book a VIP Table / Afterparty for Fashion Week / Fuorisalone / Monza F1.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-champagne text-black font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.16em] hover:bg-white transition-all shadow-[0_0_35px_rgba(201,168,106,0.4)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {isIt
                  ? 'Prenota Tavolo MFW / Fuorisalone / F1 (+39 351 912 7047)'
                  : 'Book MFW / Fuorisalone / F1 Table (+39 351 912 7047)'}
              </span>
            </a>

            <a
              href="#corporate-buyout-brand-privatization"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl border border-champagne/40 bg-white/[0.04] text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] hover:border-champagne hover:text-champagne transition-colors"
            >
              <Building2 className="w-4 h-4 text-champagne" />
              <span>
                {isIt ? 'Corporate Buyout & Eventi Brand ↓' : 'Corporate Buyouts & Brand Privatization ↓'}
              </span>
            </a>

            <span className="text-xs text-white/55">
              {isIt ? 'Desk Brand, PR & Model Agencies: ' : 'Brand, PR & Model Agencies Desk: '}
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
          <h2 id="indice-fashion-week-milano" className="font-serif text-2xl sm:text-3xl font-bold text-champagne mb-4">
            {isIt
              ? 'Indice della Guida Ufficiale Fashion Week, Fuorisalone & Monza F1 2026/2027'
              : 'Table of Contents: Official Milan Fashion Week, Fuorisalone & Monza F1 Guide'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-champagne mb-2">
                {isIt ? 'Sezioni Principali (H2)' : 'Main Guide Sections (H2)'}
              </p>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a href="#quattro-settimane-mondiali-lusso-milano" className="hover:text-champagne transition-colors">
                    1. {isIt
                      ? 'Calendario e Guida alle 4 Settimane Mondiali del Lusso a Milano (MFW, Fuorisalone, F1)'
                      : 'Calendar & Guide to Milans 4 Global Luxury Weeks (MFW, Fuorisalone, F1)'}
                  </a>
                </li>
                <li>
                  <a href="#sei-club-prioritari-fashion-week" className="hover:text-champagne transition-colors">
                    2. {isIt
                      ? 'I 6 Club Prioritari per After-Show Party e Capacità Buyout'
                      : 'The 6 Priority Venues for After-Show Parties & Buyout Capacities'}
                  </a>
                </li>
                <li>
                  <a href="#corporate-buyout-brand-privatization" className="hover:text-champagne transition-colors">
                    3. {isIt
                      ? 'Corporate Buyout, Brand Privatization & Model Agency Accreditation'
                      : 'Corporate Buyout, Brand Privatization & Model Agency Accreditation'}
                  </a>
                </li>
                <li>
                  <a href="#calcolatore-vip-fashion-week" className="hover:text-champagne transition-colors">
                    4. {isIt
                      ? 'Calcolatore Preventivo Tavoli VIP & Matrice Formule d Ingresso'
                      : 'Interactive VIP Table Quote Calculator & Entry Formula Matrix'}
                  </a>
                </li>
                <li>
                  <a href="#mappa-e-faq-fashion-week" className="hover:text-champagne transition-colors">
                    5. {isIt
                      ? 'Mappa Quadrilatero / Parco Sempione / Corso Como, 7 FAQ e Silo Link'
                      : 'Fashion District / Parco Sempione / Corso Como Map, 7 FAQs & Silo Links'}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-champagne mb-2">
                {isIt ? 'Accesso Diretto alle 4 Settimane del Lusso (H3)' : 'Direct Jump to the 4 Luxury Weeks (H3)'}
              </p>
              <ul className="space-y-2 text-white/75">
                {LUXURY_WEEKS.map((w) => (
                  <li key={w.id}>
                    <a href={`#${w.id}`} className="hover:text-champagne transition-colors">
                      → {isIt ? w.titleIt : w.titleEn}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 1: LE 4 SETTIMANE MONDIALI DEL LUSSO A MILANO */}
      <section id="quattro-settimane-mondiali-lusso-milano" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
            {isIt
              ? 'SEZIONE 1 · CALENDARIO UFFICIALE MODA, DESIGN & MOTORSPORT 2026/2027'
              : 'SECTION 1 · OFFICIAL FASHION, DESIGN & MOTORSPORT CALENDAR 2026/2027'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isIt
              ? 'Le 4 Settimane Mondiali del Lusso a Milano: Fashion Week Donna, Moda Uomo, Fuorisalone & Monza F1'
              : 'Milans 4 Global Luxury Weeks: Womenswear MFW, Menswear MFW, Fuorisalone Design Week & Monza F1'}
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-4xl">
            {isIt
              ? 'Durante questi quattro appuntamenti mondiali la domanda di Tavoli Console, Super Privé e Rooftop supera di cinque volte la capienza dei locali milanesi. Ecco il calendario strategico e i club abbinati per ogni settimana:'
              : 'During these four global weeks, demand for DJ Console booths, Super Privés, and panoramic rooftops exceeds venue capacity fivefold. Here is the strategic breakdown and venue pairing for each week:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {LUXURY_WEEKS.map((w) => (
            <article
              key={w.id}
              id={w.id}
              className="rounded-3xl border border-champagne/30 bg-gradient-to-b from-[#18130b] to-[#0c0a06] p-7 sm:p-9 flex flex-col justify-between hover:border-champagne/60 transition-all"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-champagne/20 border border-champagne/40 text-champagne font-mono text-[10px] font-bold uppercase tracking-wider">
                    {isIt ? w.badgeIt : w.badgeEn}
                  </span>
                  <span className="text-xs font-mono text-white/60">
                    {isIt ? w.datesIt : w.datesEn}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug">
                  {isIt ? w.titleIt : w.titleEn}
                </h3>

                <div className="p-3.5 rounded-2xl bg-black/55 border border-champagne/30 text-champagne font-semibold text-xs sm:text-sm mb-4">
                  {isIt ? w.minSpendIt : w.minSpendEn}
                </div>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-5">
                  {isIt ? w.summaryIt : w.summaryEn}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-champagne mb-1">
                  {isIt ? 'I 6 Club Prioritari Abbinati:' : 'Paired Priority Venues:'}
                </div>
                <div className="text-xs font-bold text-white mb-4">
                  {isIt ? w.clubsIt : w.clubsEn}
                </div>
                <a
                  href={`https://wa.me/393519127047?text=${encodeURIComponent(
                    isIt
                      ? `Ciao! Vorrei prenotare un Tavolo VIP per ${w.titleIt.split(':')[0]}.`
                      : `Hi! I would like to book a VIP Table for ${w.titleEn.split(':')[0]}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-champagne text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>
                    {isIt ? 'Richiedi Mappa Tavoli & Line-Up su WhatsApp' : 'Request Floor Plan & Line-Up on WhatsApp'}
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SEZIONE 2: I 6 CLUB PRIORITARI PER AFTER-SHOW & CAPACITÀ BUYOUT */}
      <section id="sei-club-prioritari-fashion-week" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
            {isIt
              ? 'SEZIONE 2 · GERARCHIA UFFICIALE DEI 6 CLUB PRIORITARI'
              : 'SECTION 2 · OFFICIAL HIERARCHY OF THE 6 PRIORITY VENUES'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isIt
              ? 'I 6 Locali Prioritari di Milano per Sfilate, After-Show Party e Privatizzazioni'
              : 'Milans 6 Priority Venues for Runways, After-Show Parties & Brand Buyouts'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRIORITY_FASHION_VENUES.map((v) => (
            <article
              key={v.slug}
              className="rounded-3xl border border-white/15 bg-[#14100a] overflow-hidden flex flex-col justify-between hover:border-champagne/50 transition-all"
            >
              <div>
                <div className="relative h-56 w-full">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    quality={92}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14100a] via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-champagne text-black font-mono text-[10px] font-extrabold uppercase tracking-wider">
                    {isIt ? v.badgeIt : v.badgeEn}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">{v.name}</h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                    {isIt ? v.roleIt : v.roleEn}
                  </p>
                  <div className="p-3 rounded-xl bg-black/50 border border-champagne/25 text-xs text-champagne font-semibold">
                    {isIt ? v.specsIt : v.specsEn}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <Link
                  href={`${lp}/clubs/${v.slug}`}
                  className="text-xs font-semibold text-white hover:text-champagne transition-colors"
                >
                  {isIt ? 'Scheda Club →' : 'Venue Profile →'}
                </Link>
                <a
                  href={`https://wa.me/393519127047?text=${encodeURIComponent(
                    isIt
                      ? `Ciao! Vorrei prenotare un Tavolo VIP / evento Fashion Week da ${v.name}.`
                      : `Hi! I would like to book a VIP Table / Fashion Week event at ${v.name}.`
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

      {/* SEZIONE 3: CORPORATE BUYOUT, BRAND PRIVATIZATION & MODEL AGENCY ACCREDITATION */}
      <section id="corporate-buyout-brand-privatization" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl border border-champagne/40 bg-gradient-to-br from-[#1d160c] via-[#120e08] to-[#0a0805] p-7 sm:p-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
            {isIt
              ? 'SEZIONE 3 · DIVISIONE B2B MAISON MODA, DESIGN BRAND, F1 SPONSOR & AGENZIE'
              : 'SECTION 3 · B2B DIVISION FOR FASHION HOUSES, DESIGN BRANDS, F1 SPONSORS & AGENCIES'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            {isIt
              ? 'Corporate Buyout, Brand Privatization & Model Agency Accreditation'
              : 'Corporate Buyout, Brand Privatization & Model Agency Accreditation'}
          </h2>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-4xl mb-8">
            {isIt
              ? 'Oltre alla prenotazione dei singoli Tavoli VIP in Console e nei Super Privé, il Desk Corporate di Nightlife Milan assiste direttamente maison di moda, showroom, studi di architettura del Fuorisalone, team di Formula 1 e agenzie internazionali per la privatizzazione chiavi in mano di intere aree o interi club:'
              : 'Beyond individual DJ Console and Super Privé table reservations, the Nightlife Milan Corporate Desk partners directly with fashion houses, showrooms, Fuorisalone architecture studios, Formula 1 teams, and international agencies for turnkey buyouts of private rooms or entire venues:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-black/55 border border-white/15">
              <div className="flex items-center gap-2 text-champagne font-bold text-xs uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" />
                <span>{isIt ? '1. Full Venue & Rooftop Buyout' : '1. Full Venue & Rooftop Buyouts'}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                {isIt
                  ? 'Privatizzazione Totale Locale (200 - 2.500 Ospiti)'
                  : 'Exclusive Full-Venue Privatization (200 - 2,500 Guests)'}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {isIt
                  ? 'Affitto in esclusiva di Voya Rooftop (20° piano a 85m per cocktail stampa e sunset party), 55 Milano (1.000 mq per sfilate ed esposizioni), Just Me Torre Branca, Pineta, Aria Club, Repvblic, Tocqueville 13, Fabrique o Alcatraz, con regia audio-luci, LED wall personalizzati, red carpet e fatturazione aziendale.'
                  : 'Exclusive buyout of Voya Rooftop (20th floor at 85m for press previews and sunset parties), 55 Milano (1,000 sqm for runway shows and exhibitions), Just Me Torre Branca, Pineta, Aria Club, Repvblic, Tocqueville 13, Fabrique, or Alcatraz, complete with custom LED walls, red carpet, and B2B corporate invoicing.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/55 border border-white/15">
              <div className="flex items-center gap-2 text-champagne font-bold text-xs uppercase tracking-wider mb-2">
                <Crown className="w-4 h-4" />
                <span>{isIt ? '2. Semi-Privatization & Privé Room' : '2. Semi-Privatization & VIP Rooms'}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                {isIt
                  ? 'Riserva di un Intero Privé per Dopo-Sfilata (25 - 120 Ospiti)'
                  : 'Dedicated Privé Room Buyout for After-Shows (25 - 120 Guests)'}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {isIt
                  ? 'Vuoi l energia del club pieno ma con un area 100% riservata al tuo brand o al tuo team F1? Blocchiamo per voi l intero Privé Branca da Just Me, la Balconata VIP di Pineta/Repvblic o il Super Privé Console di Aria Club con bodyguard dedicato, bracciali personalizzati e servizio Magnum.'
                  : 'Want the electric energy of a packed club while keeping a 100% cordoned space for your brand or F1 team? We reserve the entire Privé Branca at Just Me, the VIP Balcony at Pineta/Repvblic, or the DJ Console Super Privé at Aria Club with dedicated security, custom wristbands, and Magnum service.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/55 border border-white/15">
              <div className="flex items-center gap-2 text-champagne font-bold text-xs uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>{isIt ? '3. Model Agencies & Press Accreditation' : '3. Model Agencies & Press Accreditation'}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                {isIt
                  ? 'Accrediti Booker, Model Agencies & Casting Dinner'
                  : 'Model Agency Bookers, Talent Lists & Casting Dinners'}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {isIt
                  ? 'Canale fast-track dedicato a booker, agenzie di moda milanesi e internazionali, talent manager e PR per l accredito di modelle/i, l organizzazione di tavoli Royal Aperitivo / Cena Cantata e l accesso prioritario ai party ufficiali.'
                  : 'Dedicated fast-track desk for Milanese and international model agency bookers, talent managers, and PR directors to arrange model accreditations, Royal Aperitivo / Singing Dinner hospitality tables, and priority entry to official after-shows.'}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black/70 border border-champagne/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-champagne mb-1">
                {isIt ? 'CONTATTO DIRETTO CORPORATE & VIP CONCIERGE' : 'DIRECT CORPORATE & VIP CONCIERGE DESK'}
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-white">
                WhatsApp: +39 351 912 7047 · Email: concierge@nightlifemilan.com
              </div>
              <p className="text-xs text-white/65 mt-1">
                {isIt
                  ? 'Preventivi B2B, planimetrie tecniche, rider audio/luci e disponibilità tavoli Console in meno di 15 minuti.'
                  : 'B2B quotes, technical floor plans, audio/lighting riders, and DJ Console table availability in under 15 minutes.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/393519127047?text=${encodeURIComponent(
                  isIt
                    ? 'Ciao Desk Corporate Nightlife Milan! Vorremmo richiedere un preventivo per Corporate Buyout / Tavolo Console VIP.'
                    : 'Hi Nightlife Milan Corporate Desk! We would like to request a quote for a Corporate Buyout / DJ Console VIP Table.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-champagne text-black font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
              >
                {isIt ? 'Scrivici su WhatsApp (+39 351 912 7047)' : 'Message WhatsApp (+39 351 912 7047)'}
              </a>
              <a
                href="mailto:concierge@nightlifemilan.com?subject=Corporate%20Buyout%20%2F%20Fashion%20Week%20VIP%20Request"
                className="px-6 py-3.5 rounded-xl border border-champagne/45 text-champagne font-sans text-xs font-bold uppercase tracking-wider hover:bg-champagne hover:text-black transition-colors"
              >
                concierge@nightlifemilan.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SEZIONE 4: VIP QUOTE CALCULATOR, ENTRY FORMULA MATRIX & PRIORITY SIX SHOWCASE */}
      <section id="calcolatore-vip-fashion-week" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <VipQuoteCalculator locale={locale} />
        <EntryFormulaMatrix locale={locale} />
        <PrioritySixShowcase locale={locale} />
      </section>

      {/* SEZIONE 5: GOOGLE MAPS, 7 FAQ STRATEGICHE & LINK INTERNI */}
      <section id="mappa-e-faq-fashion-week" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Google Maps */}
        <div className="rounded-3xl border border-white/15 bg-white/[0.02] p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-champagne block mb-2">
                {isIt
                  ? 'SEZIONE 5 · GEOLOCALIZZAZIONE PARCO SEMPIONE, TORRE BRANCA & CORSO COMO'
                  : 'SECTION 5 · GEOLOCATION OF PARCO SEMPIONE, TORRE BRANCA & CORSO COMO'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                {isIt
                  ? 'Mappa dei Club della Milano Fashion Week & Fuorisalone (Just Me Torre Branca, Corso Como e Skyline)'
                  : 'Map of Milan Fashion Week & Fuorisalone Clubs (Just Me Torre Branca, Corso Como & Skyline)'}
              </h2>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Just+Me+Milano+Viale+Luigi+Camoens+2+Parco+Sempione"
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
                  ? 'Mappa Milano Fashion Week e Fuorisalone: Just Me Torre Branca Parco Sempione'
                  : 'Map of Milan Fashion Week and Fuorisalone: Just Me Torre Branca Parco Sempione'
              }
              src="https://www.google.com/maps?q=Viale+Luigi+Camoens+2,+20121+Milano+MI,+Italy&output=embed"
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
              ? 'Domande Frequenti (FAQ) su Milano Fashion Week, Fuorisalone & Monza F1'
              : 'Frequently Asked Questions (FAQ): Milan Fashion Week, Fuorisalone & Monza F1'}
          </h2>
          <p className="text-white/65 text-sm sm:text-base mb-8">
            {isIt
              ? 'Risposte ufficiali del Desk Concierge Nightlife Milan (+39 351 912 7047 · concierge@nightlifemilan.com) per buyer, brand, agenzie e ospiti internazionali.'
              : 'Official answers from the Nightlife Milan Concierge Desk (+39 351 912 7047 · concierge@nightlifemilan.com) for buyers, brands, agencies, and international VIPs.'}
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
              ? 'Esplora il Silo Ufficiale Luxury Nightlife, Rooftop & Grandi Eventi Milano'
              : 'Explore the Official Milan Luxury Nightlife, Rooftops & Major Events Silo'}
          </h2>
          <p className="text-xs sm:text-sm text-white/65 mb-6">
            {isIt
              ? 'Approfondisci le schede dei 6 club prioritari, il listino Champagne Dom Pérignon, gli eventi privati aziendali e i grandi hub stagionali:'
              : 'Explore our 6 priority venue guides, Dom Pérignon Champagne menus, corporate private parties, and seasonal hubs:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs sm:text-sm">
            <Link
              href={`${lp}/clubs/just-me-milano`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? '1. Just Me Milano (7/7 MFW)' : '1. Just Me Milano (7/7 MFW)'}</span>
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
              href={`${lp}/rooftops`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? '5. Voya Rooftop 20° Piano' : '5. Voya Rooftop 20th Floor'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>

            <Link
              href={`${lp}/private-parties`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Eventi Aziendali & Buyout' : 'Corporate Events & Buyouts'}</span>
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
              <span>{isIt ? 'Listino Bottiglie & Magnum' : 'Champagne & Magnum Prices'}</span>
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
              href={`${lp}/concert-afterparties`}
              className="p-4 rounded-xl border border-white/10 bg-black/45 hover:border-champagne text-white font-semibold flex items-center justify-between transition-all"
            >
              <span>{isIt ? 'Afterparty Concerti Milano' : 'Milan Concert Afterparties'}</span>
              <ArrowRight className="w-4 h-4 text-champagne shrink-0" />
            </Link>
          </div>
        </div>
      </section>
      <VerticalHubsAndEventsSection locale={locale} initialTab="fairs" eventFocus="tradeFairs" />
            <EditorialPageSections locale={locale as LocaleCode} path={`${lp}/milan-fashion-week`} />
      </main>
  );
}
