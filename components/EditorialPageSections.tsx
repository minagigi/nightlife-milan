import SeoAuthorityHub from './SeoAuthorityHub';
import React from 'react';
import Link from '@/components/LocalizedLink';
import { SITE_CONTACT } from '@/config/contact';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getVenueBySlug, mockVenues, mockZones } from '@/lib/data';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { getLocalizedVenueSlug35 } from '@/lib/i18n/localizedSlugs35';
import { localePrefix, type LocaleCode } from '@/lib/i18n/locales';
import { getLocalizedText } from '@/lib/seo';
import { getVenueAuthoritySpec } from '@/lib/venueAuthority33';
import { getV01SiteCopy } from '@/lib/i18n/v01SiteCopy35';

type Props = {
  locale: LocaleCode;
  path: string;
};

function stripLocalePrefix(path: string, locale: LocaleCode): string {
  const lp = localePrefix(locale);
  const raw = lp && path.startsWith(lp) ? path.slice(lp.length) || '/' : path || '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

// Club-specific acoustic, architectural, metro, VIP table & pre-clubbing metadata
const CLUB_DEEP_META: Record<string, {
  metro: string;
  parking: string;
  soundIt: string;
  soundEn: string;
  vipZonesIt: string;
  vipZonesEn: string;
  minSpend: string;
  preClubIt: string;
  preClubEn: string;
  bestNightsIt: string;
  bestNightsEn: string;
}> = {
  'pineta-club-milano': {
    metro: 'M5 Cenisio (250 m da Via Messina 38) / M2 Porta Garibaldi',
    parking: 'Parcheggio Via Messina / Via Procaccini (200 m)',
    soundIt: 'Live Singing Dinner Show, Commercial Dance, Vocal House & Reggaeton Luxury',
    soundEn: 'Live Singing Dinner Show, Commercial Dance, Vocal House & Luxury Reggaeton',
    vipZonesIt: 'Tavoli Dinner Show, Pista Centrale sotto i Lampadari di Cristallo, Privé Rialzato e Super Privé Console',
    vipZonesEn: 'Dinner Show Tables, Crystal Chandelier Main Floor, Elevated Privé, and Super Privé DJ Console',
    minSpend: 'Pista 300–450 € · Privé 500–900 € · Super Privé Console 1.000–2.500 €',
    preClubIt: 'Royal Aperitivo & Cena Cantata interna dalle 20:00 in Via Messina 38 o cocktail in zona Chinatown/Garibaldi',
    preClubEn: 'In-house Royal Aperitivo & Singing Dinner Show from 20:00 at Via Messina 38 or cocktails in Porta Garibaldi',
    bestNightsIt: 'Mercoledì, Venerdì, Sabato e Domenica · Luxury Clubbing & Format Internazionali',
    bestNightsEn: 'Wednesday, Friday, Saturday, and Sunday · Luxury Clubbing & International Formats',
  },
  'aria-club-milano': {
    metro: 'M5 San Siro Ippodromo / M1 Lotto (Piazzale dello Sport 14)',
    parking: 'Ampio Parcheggio Piazzale dello Sport / Via Caprilli (100 m)',
    soundIt: 'Hip-Hop, Reggaeton, Urban, Commercial Hits & Festival Show',
    soundEn: 'Hip-Hop, Reggaeton, Urban, Commercial Hits & Festival Show',
    vipZonesIt: 'Tavoli Arena Pista, Privé Bordo Console e Super Privé Stage nel Parco dell’Ippodromo',
    vipZonesEn: 'Main Arena Tables, Console-Side Privé, and Stage Super Privé inside the San Siro Park',
    minSpend: 'Pista 250–400 € · Privé 500–800 € · Stage Console 1.000–2.500 €',
    preClubIt: 'Aperitivo in zona Arco della Pace / Corso Sempione o pre-serata nei lounge di CityLife',
    preClubEn: 'Aperitivo around Arco della Pace / Corso Sempione or pre-drinks at CityLife lounges',
    bestNightsIt: 'Mercoledì Internazionale, Venerdì Urban/Reggaeton e Sabato Festival Night',
    bestNightsEn: 'Wednesday International Night, Friday Urban/Reggaeton, and Saturday Festival Night',
  },
  '55-milano': {
    metro: 'M5 Gerusalemme / Domodossola (300 m da Via Piero della Francesca 55)',
    parking: 'Garage Via Piero della Francesca / Piazza Gramsci (150 m)',
    soundIt: 'Royal Aperitivo, Live Dinner Show, Revival 80/90 & Commercial House',
    soundEn: 'Royal Aperitivo, Live Dinner Show, 80s/90s Revival & Commercial House',
    vipZonesIt: 'Grande Terrazza Riscaldata, Loft Industriale Centrale e Tavoli VIP Bordo Console',
    vipZonesEn: 'Heated Grand Terrace, Industrial Main Loft, and DJ Console VIP Tables',
    minSpend: 'Aperitivo Riservato · Tavoli Dopocena 250–600 € (100% credito bottiglie)',
    preClubIt: 'Maxi Royal Aperitivo e Cena in loco dalle 19:30 nel loft ex ferroviario di 1.000 mq',
    preClubEn: 'In-house Royal Aperitivo and Dinner from 19:30 inside the 1,000 sqm former railway loft',
    bestNightsIt: 'Dal Martedì alla Domenica · Venerdì Dinner Show, Sabato The Wall, Domenica Latino',
    bestNightsEn: 'Tuesday through Sunday · Friday Dinner Show, Saturday The Wall, Sunday Latin Night',
  },
  'voya-rooftop-milan': {
    metro: 'M5 Portello / M1 QT8 (Viale Achille Papa 30: 20° Piano World Join Center)',
    parking: 'Parcheggio World Join Center / Viale Achille Papa 30',
    soundIt: 'Skyline Dinner Show, Vocal House, Commercial Elegance & Sunset DJ Set',
    soundEn: 'Skyline Dinner Show, Vocal House, Commercial Elegance & Sunset DJ Set',
    vipZonesIt: 'Terrazza Panoramica Vetrata al 20° Piano, Ristorante Vista Skyline e Tavoli VIP Sky Lounge',
    vipZonesEn: '20th-Floor Glass-Enclosed Panoramic Terrace, Skyline Restaurant, and VIP Sky Lounge Tables',
    minSpend: 'Cena Panoramica alla Carta / Menu · Tavoli VIP Rooftop 300–1.000 € · Capodanno Menu Completo 300 €/persona',
    preClubIt: 'Sunset Aperitivo e Cena Panoramica direttamente al 20° piano a 85 metri d’altezza sullo skyline di Milano',
    preClubEn: 'Sunset Aperitivo and Panoramic Dinner right on the 20th floor, 85 meters above the Milan skyline',
    bestNightsIt: 'Venerdì, Sabato e Domenica + Il Capodanno Rooftop Numero 1 di Milano (Menu Completo 300 €)',
    bestNightsEn: 'Friday, Saturday, and Sunday + Milan’s #1 Rooftop New Year’s Eve (All-Inclusive Full Menu €300)',
  },
  'repvblic-milano': {
    metro: 'M3 Repubblica (50 m da Piazza della Repubblica 12) / M2 Gioia',
    parking: 'Autosilo Piazza della Repubblica / Via Vittor Pisani (100 m)',
    soundIt: 'International Hits, House, Hip-Hop & Dirty Monday Clubbing',
    soundEn: 'International Hits, House, Hip-Hop & Dirty Monday Clubbing',
    vipZonesIt: 'Tavoli Zona Dancefloor e Tavoli Zona Privé VIP in Piazza della Repubblica 12',
    vipZonesEn: 'Dancefloor Table Zone and Exclusive VIP Privé Tables on Piazza della Repubblica 12',
    minSpend: 'Capodanno 2027: Early Bird 45€ · Dancefloor 600€ (6 pax) · Privé 1.200€ (10 pax)',
    preClubIt: 'Aperitivi nei lounge di Porta Nuova e Piazza della Repubblica prima dell’apertura alle 23:00',
    preClubEn: 'Pre-drinks around Porta Nuova and Piazza della Repubblica before doors open at 23:00',
    bestNightsIt: 'Lunedì (Dirty Monday), Venerdì e Sabato dalle 23:00 al mattino + Capodanno 2027 (31 Dicembre)',
    bestNightsEn: 'Monday (Dirty Monday), Friday & Saturday from 23:00 till morning + NYE 2027 (Dec 31)',
  },
  'just-me-milano': {
    metro: 'M2 Lanza / M1 Cairoli / M5 Tre Torri (Parco Sempione: Torre Branca)',
    parking: 'Parcheggio Viale Alemagna / Piazzale Cadorna (300 m)',
    soundIt: 'Commercial Dance, Vocal House, Sing-Along & International Club Hits',
    soundEn: 'Commercial Dance, Vocal House, Sing-Along & International Club Hits',
    vipZonesIt: 'Tavoli Giardino Estivo, Pista Centrale, Privé Rialzato e Super Privé Console DJ sotto la Torre Branca',
    vipZonesEn: 'Summer Garden Tables, Main Dancefloor, Elevated Privé, and Super Privé DJ Console beneath Torre Branca',
    minSpend: 'Pista 350–500 € · Privé 700–1.200 € · Super Privé Console 1.500–5.000+ €',
    preClubIt: 'Royal Aperitivo interno dalle 19:30 con salita panoramica sulla Torre Branca, oppure cocktail pre-serata in Arco della Pace (Dazi Milano, Terrazza Triennale)',
    preClubEn: 'In-house Royal Aperitivo from 19:30 with panoramic Torre Branca elevator access, or pre-drinks at Arco della Pace (Dazi Milano, Terrazza Triennale)',
    bestNightsIt: 'Aperto 7 sere su 7 · Giovedì Fashion, Venerdì & Sabato Luxury Party, Domenica Internazionale',
    bestNightsEn: 'Open 7 Nights a Week · Thursday Fashion Night, Friday & Saturday Luxury Party, Sunday International',
  },
  'armani-prive-milano': {
    metro: 'M3 Montenapoleone (150 m) / M1 San Babila (Quadrilatero della Moda)',
    parking: 'Autosilo Via Borgonuovo / Piazza Meda (250 m)',
    soundIt: 'Deep House, Afro House, R&B & Luxury International DJ Sets',
    soundEn: 'Deep House, Afro House, R&B & Luxury International DJ Sets',
    vipZonesIt: 'Boutique Privé Armonizzato, Tavoli Bordo Pista e Tavoli Esclusivi Back-Console Giorgio Armani',
    vipZonesEn: 'Boutique Lounge Privé, Dancefloor Edge Banquettes, and Exclusive Back-Console Giorgio Armani Tables',
    minSpend: 'Tavolo Pista/Lounge 600–1.000 € · Privé & Console 1.500–5.000+ €',
    preClubIt: 'Cena da Nobu Milano al piano superiore (Via Pisoni 1) o aperitivo storico da Camparino in Galleria e nei lounge di Brera',
    preClubEn: 'Dinner upstairs at Nobu Milano (Via Pisoni 1) or classic aperitivo at Camparino in Galleria and Brera luxury lounges',
    bestNightsIt: 'Venerdì e Sabato (23:45–05:00) + Afterparty Ufficiali Milan Fashion Week',
    bestNightsEn: 'Friday and Saturday (23:45–05:00) + Official Milan Fashion Week Afterparties',
  },
  '11-clubroom-milano': {
    metro: 'M2 / M5 Porta Garibaldi (200 m da Via Alessio di Tocqueville 11)',
    parking: 'Parking Porta Nuova / Viale Monte Grappa (200 m)',
    soundIt: 'Hip-Hop, R&B, Afro House, Melodic House & International Urban',
    soundEn: 'Hip-Hop, R&B, Afro House, Melodic House & International Urban',
    vipZonesIt: 'Divani in Pelle Capitonnè Bordo Pista, Area Lounge Centrale e Super Privé dietro la Console',
    vipZonesEn: 'Tufted Leather Dancefloor Sofas, Central Lounge Banquettes, and Back-Console Super Privé',
    minSpend: 'Tavolo Lounge/Pista 350–600 € · Privé Console 800–2.500 €',
    preClubIt: 'Cocktail sartoriale in Corso Como, Radio Rooftop (Via Marco Polo 18) o Botanical Club in Isola',
    preClubEn: 'Craft cocktails on Corso Como, Radio Rooftop (Via Marco Polo 18), or Botanical Club in Isola',
    bestNightsIt: 'Mercoledì Internazionale, Venerdì Fashion Urban e Sabato Luxury Clubroom',
    bestNightsEn: 'Wednesday International Night, Friday Fashion Urban, and Saturday Luxury Clubroom',
  },
  'philipps-milano': {
    metro: 'M3 Turati (180 m da Via Daniele Manin 21) / M1 Palestro (Giardini Montanelli)',
    parking: 'Autosilo Piazza Cavour / Via Manin custodito 24h',
    soundIt: "The Philipp's Show Live Dinner Show, Luxury House, Afro-House, Hip-Hop & Guest DJ Internazionali",
    soundEn: "The Philipp's Show Live Dinner Show, Luxury House, Afro-House, Hip-Hop & International Guest DJs",
    vipZonesIt: 'Tavoli Velluto Dinner Show, Mezzanino Specchiato Privé, Tavoli Club sotto i Lampadari e Super VIP Console',
    vipZonesEn: 'Velvet Dinner Show Booths, Mirrored Mezzanine Privé, Crystal Chandelier Club Tables, and Super VIP Console',
    minSpend: "Cena Spettacolo Chef Roberto Conti (20:00) · Tavoli VIP Club 00:00-04:30 su quotazione Concierge (100% credito bottiglie)",
    preClubIt: 'Cena Spettacolo interna firmata Executive Chef Roberto Conti dentro The Plein Hotel (Via Daniele Manin 21)',
    preClubEn: 'In-house haute-cuisine Dinner Show by Executive Chef Roberto Conti inside The Plein Hotel (Via Daniele Manin 21)',
    bestNightsIt: "Mar From Brasil to Milan, Mer Tussy, Gio Saint, Ven ClubForLife, Sab Konekt, Dom Sweetie + The Philipp's Show",
    bestNightsEn: "Tue From Brasil to Milan, Wed Tussy, Thu Saint, Fri ClubForLife, Sat Konekt, Sun Sweetie + The Philipp's Show",
  },
  'the-club-milano': {
    metro: 'M2 Moscova (120 m da Corso Garibaldi 97) / M2 Lanza Brera',
    parking: 'Autosilo Largo La Foppa / Via Statuto (150 m)',
    soundIt: 'Hip-Hop, Trap, Reggaeton, House & International Party Hits',
    soundEn: 'Hip-Hop, Trap, Reggaeton, House & International Party Hits',
    vipZonesIt: 'Tavoli Pista Centrale, Privé Lato Consolle e Super VIP Backstage',
    vipZonesEn: 'Main Dancefloor Tables, Console-Side Privé, and Super VIP Backstage',
    minSpend: 'Tavolo Pista da 400 € (2 bott.) · Privé Lato Consolle da 440 € · VIP Console da 600-1.200 €',
    preClubIt: 'Aperitivo e cena nei locali di Corso Garibaldi, Largo La Foppa e Brera prima delle 23:30',
    preClubEn: 'Aperitivo and dinner along Corso Garibaldi, Largo La Foppa, and Brera before 23:30',
    bestNightsIt: 'Mer One Two, Gio Atlanta, Ven First Class, Sab Girls Republic, Dom Superbe + Sant’Ambrogio 7/12',
    bestNightsEn: 'Wed One Two, Thu Atlanta, Fri First Class, Sat Girls Republic, Sun Superbe + Sant’Ambrogio Dec 7',
  },
  'mib-milano': {
    metro: 'M1 Cordusio (150 m da Via Gaetano Negri 10) / M1-M3 Duomo (350 m)',
    parking: 'Autosilo Piazza Borromeo / Piazza Diaz (200 m)',
    soundIt: 'Cena Cantata Italiana, Live Sax & Vocalist, Commercial House, Hip-Hop & Reggaeton',
    soundEn: 'Italian Singing Dinner Show, Live Sax & Vocalists, Commercial House, Hip-Hop & Reggaeton',
    vipZonesIt: 'Sala Giardino d’Inverno Cena Spettacolo, Tavoli Pista e Privé Consolle Piazza Affari',
    vipZonesEn: 'Winter Garden Dinner Show Hall, Dancefloor Tables, and Piazza Affari Console Privé',
    minSpend: 'Cena Spettacolo & Royal Buffet (20:00) · Tavoli VIP Club da 250-800 €',
    preClubIt: 'Open Wine Bar & Cena Cantata interna dalle 20:00 in Piazza Affari a 300 m dal Duomo',
    preClubEn: 'In-house Open Wine Bar & Singing Dinner Show from 20:00 at Piazza Affari, 300 m from the Duomo',
    bestNightsIt: 'Mer International Week, Gio Justice, Ven Billions Dinner Show, Sab Love Affair + 6/12 Atlanta & 7/12 OneTwo',
    bestNightsEn: 'Wed International Week, Thu Justice, Fri Billions Dinner Show, Sat Love Affair + Dec 6 Atlanta & Dec 7 OneTwo',
  },
  'terrazza-21': {
    metro: 'M1 / M3 Duomo (uscita diretta su Piazza del Duomo 21, 1° e 5° Piano)',
    parking: 'Autosilo Piazza Diaz / Via Agnello (220 m)',
    soundIt: 'Skyline Sunset Lounge, Deep & Vocal House, Commercial Elegance vista Guglie del Duomo',
    soundEn: 'Skyline Sunset Lounge, Deep & Vocal House, and Commercial Elegance facing Duomo Spires',
    vipZonesIt: 'Balconata Esterna Fronte Duomo (1° Piano), Indoor Crystal Lounge e Terrazza MA.RE (5° Piano 2 Stelle Michelin)',
    vipZonesEn: 'Outdoor Duomo-Facing Terrace (1F), Indoor Crystal Lounge, and 5th-Floor Terrazza MA.RE (2 Michelin Stars)',
    minSpend: 'Sunset Aperitivo & Cocktail Bar (18:30) · Ristorante Chef Braschi · Tavoli VIP Serali da 250-1.200 €',
    preClubIt: 'Golden-hour aperitivo e cena panoramica direttamente affacciati sulla facciata del Duomo di Milano',
    preClubEn: 'Golden-hour aperitivo and panoramic dinner directly facing the marble facade of Milan Cathedral',
    bestNightsIt: 'Tutti i giorni Sunset Aperitivo, Giovedì-Sabato DJ Set Panoramico + Capodanno 2027 Vista Fuochi Duomo',
    bestNightsEn: 'Daily Sunset Aperitivo, Thu-Sat Panoramic DJ Sets + NYE 2027 Overlooking Duomo Fireworks',
  },
  'tocqueville-13': {
    metro: 'M2 / M5 Porta Garibaldi (200 m da Via Alessio di Tocqueville 13)',
    parking: 'Parking Porta Nuova / Piazza Freud (250 m)',
    soundIt: 'Tech-House, Afro House, Commercial Dance, Hip-Hop & Singing Dinner Show',
    soundEn: 'Tech-House, Afro House, Commercial Dance, Hip-Hop & Singing Dinner Show',
    vipZonesIt: 'Piano Superiore Ristorante/Dinner Show, Pista Centrale, Balconata VIP e Super Privé Console LED',
    vipZonesEn: 'Upper Level Dinner Show Room, Main Dancefloor, VIP Balcony, and LED Console Super Privé',
    minSpend: 'Pista 350–500 € · Balconata/Privé 600–1.200 € · Console 1.500–3.500 €',
    preClubIt: 'Cena Cantata interna dalle 21:00 (il tavolo resta tuo per il club) o aperitivo in Piazza Gae Aulenti',
    preClubEn: 'In-house Singing Dinner Show from 21:00 (keep your table for the club) or aperitivo on Piazza Gae Aulenti',
    bestNightsIt: 'Martedì, Venerdì, Sabato e Domenica con format Dinner Show + Club fino alle 05:00',
    bestNightsEn: 'Tuesday, Friday, Saturday, and Sunday featuring Dinner Show + Club until 05:00',
  },
  'hollywood-milano': {
    metro: 'M2 / M5 Porta Garibaldi o M2 Moscova (Corso Como 15)',
    parking: 'Garage Corso Como / Viale Pasubio (180 m)',
    soundIt: 'Commercial Hits, Hip-Hop, Reggaeton, House & International Party Anthems',
    soundEn: 'Commercial Hits, Hip-Hop, Reggaeton, House & International Party Anthems',
    vipZonesIt: 'Tavoli Pista Storica, Privé Rialzato e Super Privé Model & Celebrity Zone',
    vipZonesEn: 'Main Dancefloor Tables, Elevated Privé, and Model & Celebrity Super Privé Zone',
    minSpend: 'Pista 300–450 € · Privé 600–1.000 € · Super Privé 1.200–3.000 €',
    preClubIt: 'Aperitivo lungo la pedonale di Corso Como (Loolapaloosa) o cena nei ristoranti di Porta Nuova',
    preClubEn: 'Aperitivo along pedestrian Corso Como (Loolapaloosa) or dinner in Porta Nuova',
    bestNightsIt: 'Aperto 7 sere su 7 · Martedì & Mercoledì Erasmus/International, Weekend Fashion & Jet-Set',
    bestNightsEn: 'Open 7 Nights a Week · Tuesday & Wednesday Erasmus/International, Weekend Fashion & Jet-Set',
  },
  'loolapaloosa-milano': {
    metro: 'M2 / M5 Porta Garibaldi (Corso Como 15)',
    parking: 'Garage Viale Monte Grappa / Pasubio (180 m)',
    soundIt: 'Happy Music, Sing-Along Italiano, Party Hits & Feel-Good House',
    soundEn: 'Happy Music, Italian Sing-Along, Party Hits & Feel-Good House',
    vipZonesIt: 'Tavoli Dehor Corso Como, Tavoli Pista e Bancone Centrale High-Energy',
    vipZonesEn: 'Corso Como Terrace Tables, Dancefloor Tables, and High-Energy Central Bar Zone',
    minSpend: 'Aperitivo Riservato · Tavoli Serali 250–600 € (100% credito bottiglie)',
    preClubIt: 'Royal Aperitivo interno dalle 19:30 che si trasforma direttamente in party fino alle 04:30',
    preClubEn: 'In-house Royal Aperitivo from 19:30 transitioning directly into a late-night party until 04:30',
    bestNightsIt: 'Da Martedì a Domenica · Punto di riferimento per Lauree, Compleanni e Addii al Nubilato',
    bestNightsEn: 'Tuesday through Sunday · Top pick for Graduations, Birthdays, and Bachelorette Parties',
  },
  'old-fashion-milano': {
    metro: 'M1 / M2 Cadorna Triennale (300 m da Viale Emilio Alemagna 6)',
    parking: 'Parcheggio Viale Emilio Alemagna (di fronte all’ingresso)',
    soundIt: 'Commercial, House, Reggaeton, Hip-Hop & Format Universitari/Adulti',
    soundEn: 'Commercial, House, Reggaeton, Hip-Hop & University/Adult Formats',
    vipZonesIt: 'Giardino Estivo Dehor nel Parco Sempione, Sala Cristallo Interna e Privé Rialzato Console',
    vipZonesEn: 'Summer Park Garden Terrace, Indoor Crystal Room, and Elevated DJ Console Privé',
    minSpend: 'Pista 250–350 € · Privé 450–800 € · Super Privé 900–2.000 €',
    preClubIt: 'Royal Aperitivo interno dalle 19:30 nel giardino della Triennale o cena da Terrazza Triennale',
    preClubEn: 'In-house Royal Aperitivo from 19:30 in the Triennale garden or dinner at Terrazza Triennale',
    bestNightsIt: 'Mercoledì International/Erasmus, Venerdì & Sabato Clubbing, Domenica Aperitivo & Night',
    bestNightsEn: 'Wednesday International/Erasmus, Friday & Saturday Clubbing, Sunday Aperitivo & Night',
  },
  'volt-club-milano': {
    metro: 'M4 Vetra / M2 Sant’Ambrogio / M3 Missori (Via Molino delle Armi 16)',
    parking: 'Autosilo Via Santa Sofia / Piazza Vetra (250 m)',
    soundIt: 'Melodic Techno, Afro House, Indie Dance & Curated Underground Electronic',
    soundEn: 'Melodic Techno, Afro House, Indie Dance & Curated Underground Electronic',
    vipZonesIt: 'Tavoli Intimi Bordo Pista e Privé Esclusivo Dietro la Console DJ (Impianto Audio Audiophile)',
    vipZonesEn: 'Intimate Dancefloor-Edge Tables and Exclusive Back-Console VIP Tables (Audiophile Sound System)',
    minSpend: 'Tavolo Pista 400–600 € · Privé Console 800–2.500 €',
    preClubIt: 'Speakeasy sui Navigli o Colonne (MAG La Pusterla, Officina Milano, Backdoor 43) a 5 minuti',
    preClubEn: 'Speakeasies around Navigli and Colonne (MAG La Pusterla, Officina Milano, Backdoor 43) 5 minutes away',
    bestNightsIt: 'Venerdì e Sabato con guest DJ internazionali della scena Melodic Techno e Afro House',
    bestNightsEn: 'Friday and Saturday featuring international guest DJs from the Melodic Techno and Afro House circuit',
  },
  'the-sanctuary-milano': {
    metro: 'M2 Lambrate FS (500 m da Via Privata Ventura 14)',
    parking: 'Parcheggio Via Ventura / Via Console Flaminio (200 m)',
    soundIt: 'Afro House, Ethno-Electronic, Organic House & Melodic Techno',
    soundEn: 'Afro House, Ethno-Electronic, Organic House & Melodic Techno',
    vipZonesIt: 'Ristorante Tropico-Bohémien, Courtyard Lounge e Tavoli VIP attorno alla Console DJ',
    vipZonesEn: 'Tropical-Bohemian Restaurant, Courtyard Lounge, and VIP Tables surrounding the DJ Booth',
    minSpend: 'Cena + Club o Tavolo VIP 400–1.500 €',
    preClubIt: 'Cena fusion interna nel ristorante Tropic-Asian di The Sanctuary dalle 20:30',
    preClubEn: 'In-house Tropic-Asian fusion dinner at The Sanctuary restaurant from 20:30',
    bestNightsIt: 'Giovedì, Venerdì, Sabato e Domenica (Rituali Afro House & Electronic Showcase)',
    bestNightsEn: 'Thursday, Friday, Saturday, and Sunday (Afro House Rituals & Electronic Showcases)',
  },
  'fabrique-milano': {
    metro: 'M4 Repetti + Bus/Tram 27 (Via Gaudenzio Fantoli 9: Mecenate)',
    parking: 'Ampio Parcheggio Via Fantoli / Mecenate adiacente alla venue',
    soundIt: 'Big-Room Techno, Hard Techno, Tech-House Festivals & International Live Tours',
    soundEn: 'Big-Room Techno, Hard Techno, Tech-House Festivals & International Live Tours',
    vipZonesIt: 'Balconata VIP Panoramica Rialzata e Tavoli Backstage / Stage per grandi showcase elettronici',
    vipZonesEn: 'Elevated Panoramic VIP Balcony and Backstage / Stage Tables for major electronic showcases',
    minSpend: 'Tavolo Balconata VIP 400–800 € · Backstage/Stage 1.000–3.000 €',
    preClubIt: 'Cena o birra artigianale tra Porta Vittoria, Linate/Repetti e Lambrate',
    preClubEn: 'Dinner or craft cocktails around Porta Vittoria, Repetti, and Lambrate',
    bestNightsIt: 'Grandi eventi del Venerdì, Sabato e Festivi (Halloween, Capodanno, Fashion & Design Week)',
    bestNightsEn: 'Major Friday, Saturday, and Holiday Showcases (Halloween, NYE, Fashion & Design Week)',
  },
  'magazzini-generali-milano': {
    metro: 'M3 Lodi TIBB (600 m da Via Pietrasanta 16: Porta Romana)',
    parking: 'Parcheggio Via Pietrasanta / Viale Toscana (150 m)',
    soundIt: 'Techno, Electronic Showcases, Format 90s/2000s & International Club Nights',
    soundEn: 'Techno, Electronic Showcases, 90s/2000s Formats & International Club Nights',
    vipZonesIt: 'Galleria Soppalcata VIP con vista sull’intera navata industriale e Tavoli Stage/Console',
    vipZonesEn: 'Mezzanine VIP Gallery overlooking the industrial hall and Stage/Console VIP Tables',
    minSpend: 'Tavolo Galleria VIP 300–600 € · Tavolo Stage/Console 700–1.800 €',
    preClubIt: 'Cocktail da Officina Milano (Via Giovenale 7), 1930 Speakeasy o enoteche di Porta Romana',
    preClubEn: 'Cocktails at Officina Milano (Via Giovenale 7), 1930 Speakeasy, or Porta Romana wine bars',
    bestNightsIt: 'Venerdì (Party & University Formats) e Sabato (International Techno & Electronic Guest DJs)',
    bestNightsEn: 'Friday (Party & University Formats) and Saturday (International Techno & Electronic Guest DJs)',
  },
};

export default function EditorialPageSections({ locale, path }: Props) {
  const isIt = locale === 'it';
  const lp = localePrefix(locale);
  const waHref = getConciergeBookingUrl(locale, undefined, path);
  const cleanPath = stripLocalePrefix(path, locale);

  // ---------------------------------------------------------------------------
  // CASE 1: /guides/[slug] -> SharedArchivedGuideView already renders 2,000+ words.
  // Render only a concise, zero-duplication Concierge Action Box.
  // ---------------------------------------------------------------------------
  if (cleanPath.startsWith('/guides/') && cleanPath !== '/guides') {
    return (
    <>
      <aside className="w-full border-t border-[#F6F1E7]/14 bg-[#0B0A09] text-[#F6F1E7]" aria-label={isIt ? 'Assistenza Concierge Guida' : 'Guide Concierge Desk'}>
        <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-12 sm:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-[#EAE3D5]/32 bg-[#050505] p-7 text-[#F6F1E7]">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold uppercase text-[#F6F1E7] mb-2">
                {isIt ? 'Vuoi Applicare Questa Guida alla Tua Serata a Milano?' : 'Want to Apply This Guide to Your Night Out in Milan?'}
              </h2>
              <p className="font-sans text-[13px] font-bold uppercase tracking-[0.04em] text-[#EAE3D5] mb-2">
                {isIt ? 'DESK UFFICIALE NIGHTLIFE MILAN · SUPPORTO IMMEDIATO' : 'OFFICIAL NIGHTLIFE MILAN DESK · INSTANT SUPPORT'}
              </p>
              <p className="max-w-[48ch] font-sans text-base text-[#C2B9AA]">
                {isIt
                  ? `Scrivici su WhatsApp al ${SITE_CONTACT.whatsapp.number} indicando data, locale preferito e numero di persone per ricevere subito mappe Tavoli VIP, listino bottiglie e accredito in lista nominale.`
                  : `Message us on WhatsApp at ${SITE_CONTACT.whatsapp.number} with your date, preferred venue, and group size for instant VIP Table floorplans, bottle menus, and guest-list access.`}
              </p>
            </div>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#25D366] px-7 py-3.5 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#050505] hover:bg-[#2EE472]">
              WhatsApp {SITE_CONTACT.whatsapp.number} ↗
            </a>
          </div>
        </div>
      </aside>
      <SeoAuthorityHub lang={locale} pageKey={cleanPath} pagePath={path} />
    </>
  );
  }

  // ---------------------------------------------------------------------------
  // CASE 2: /clubs/[slug] -> 100% Entity-Specific Club Dossier (Unique per Club!)
  // ---------------------------------------------------------------------------
  if (cleanPath.startsWith('/clubs/') && cleanPath !== '/clubs') {
    const slug = cleanPath.replace('/clubs/', '').split('/')[0];
    const venue =
      getVenueBySlug(slug, locale) ||
      mockVenues.find((v) => v.slugs.en === slug || v.slugs.it === slug);
    const venueName = venue ? getLocalizedText(venue.localizedContent.name, locale) : slug.replace(/-/g, ' ');
    const street = venue?.address?.streetAddress || 'Milano';
    const postal = venue?.address?.postalCode || '20121';
    const locality = venue?.address?.addressLocality || 'Milano';
    const dress = venue
      ? getLocalizedText(venue.localizedContent.dressCode, locale).replace(/[\u2014–]/g, ' - ')
      : (isIt ? 'Smart Chic & Curato' : 'Smart Chic & Polished');
    const authSpec = venue ? getVenueAuthoritySpec(venue.id) : undefined;
    const meta = authSpec
      ? {
          metro: isIt ? authSpec.metroIt : authSpec.metroEn,
          parking: isIt ? authSpec.parkingIt : authSpec.parkingEn,
          soundIt: authSpec.soundIt,
          soundEn: authSpec.soundEn,
          vipZonesIt: authSpec.vipZonesIt,
          vipZonesEn: authSpec.vipZonesEn,
          minSpend: isIt ? authSpec.minSpendIt : authSpec.minSpendEn,
          preClubIt: authSpec.preClubIt,
          preClubEn: authSpec.preClubEn,
          bestNightsIt: authSpec.bestNightsIt,
          bestNightsEn: authSpec.bestNightsEn,
        }
      : CLUB_DEEP_META[venue?.slugs.en || slug] || {
          metro: isIt ? `Fermate Metro M1/M2/M3/M4/M5 e Radiotaxi (${street}, ${locality})` : `M1/M2/M3/M4/M5 Metro & Taxi Stand (${street}, ${locality})`,
          parking: isIt ? `Parcheggio custodito e stalli blu nelle vie adiacenti a ${street}` : `Guarded parking garage and street bays near ${street}`,
          soundIt: 'House, Commercial Dance, Hip-Hop, Afro House & Format Speciali',
          soundEn: 'House, Commercial Dance, Hip-Hop, Afro House & Special Formats',
          vipZonesIt: 'Tavoli Pista, Area Lounge Riservata, Privé Rialzato e Super Privé Console DJ',
          vipZonesEn: 'Dancefloor Tables, Reserved Lounge Area, Elevated Privé, and DJ Console Super Privé',
          minSpend: 'Tavolo Pista 250-400€ · Privé 500-1.000€ · Super Privé Console 1.200-3.000€',
          preClubIt: `Aperitivo o cena nei cocktail bar e speakeasy del quartiere intorno a ${street} dalle 19:30 alle 22:30`,
          preClubEn: `Aperitivo or dinner at cocktail bars and speakeasies around ${street} between 19:30 and 22:30`,
          bestNightsIt: 'Venerdì, Sabato e Vigilie di Festa + Serate Infrasettimanali su Prenotazione',
          bestNightsEn: 'Friday, Saturday, and Holiday Eves + Midweek Format Nights',
        };

    return (
    <>
      <aside className="w-full border-t border-[#F6F1E7]/14 bg-[#050505] text-[#F6F1E7]" aria-label={`Dossier ${venueName}`}>
        <div className="mx-auto max-w-[1280px] border-x border-[#F6F1E7]/14 divide-y divide-[#F6F1E7]/14">
          <section className="px-6 py-12 sm:px-12" data-aiso-direct-answer="true">
            <h2 className="mb-2 font-display text-3xl font-bold uppercase text-[#F6F1E7] sm:text-4xl">
              {isIt
                ? `Guida Completa a ${venueName} (${street}, ${locality}): Tavoli VIP, Bottiglie, Dress Code e Come Arrivare`
                : `Complete Guide to ${venueName} (${street}, ${locality}): VIP Tables, Bottle Prices, Dress Code & Transport`}
            </h2>
            <p className="mb-5 font-sans text-[13px] font-bold uppercase tracking-[0.04em] text-[#EAE3D5]">
              {isIt ? `DOSSIER TECNICO & VIP CONCIERGE · ${venueName.toUpperCase()}` : `TECHNICAL & VIP CONCIERGE DOSSIER · ${venueName.toUpperCase()}`}
            </p>
            <p className="max-w-[48ch] font-sans text-base leading-relaxed text-[#C2B9AA]">
              {isIt
                ? `Situato in ${street} (${postal} ${locality}), ${venueName} è uno degli indirizzi chiave ${locality.toLowerCase().includes('garda') ? 'del Lago di Garda e della Lombardia' : 'della vita notturna milanese'}. Il sound si articola su ${meta.soundIt}, con spazi suddivisi in ${meta.vipZonesIt}. I Tavoli VIP operano con formula 100% Credito Bottiglie (${meta.minSpend}) e ingresso prioritario salta-fila tramite il desk WhatsApp ${SITE_CONTACT.whatsapp.number}.`
                : `Located at ${street} (${postal} ${locality}), ${venueName} is a signature destination in ${locality.toLowerCase().includes('garda') ? 'Lake Garda and Lombardy nightlife' : 'Milan nightlife'}. The musical programming spans ${meta.soundEn}, with floor zones divided into ${meta.vipZonesEn}. VIP Tables operate on a 100% Bottle Credit basis (${meta.minSpend}) with skip-the-line VIP Host admission via WhatsApp ${SITE_CONTACT.whatsapp.number}.`}
            </p>
          </section>

          <section className="bg-[#0B0A09] px-6 py-12 text-[#F6F1E7] sm:px-12">
            <h2 className="mb-6 font-display text-2xl text-[#F6F1E7] sm:text-3xl">
              {isIt ? `Tabella Operativa ${venueName}: Zone Tavoli, Prezzi, Orari e Mobilità` : `${venueName} Operational Matrix: Table Zones, Pricing, Hours & Transport`}
            </h2>
            <div className="overflow-x-auto border border-[#EAE3D5]/28">
              <table className="w-full text-left border-collapse text-sm">
                <tbody className="divide-y divide-[#F6F1E7]/14">
                  <tr className="bg-[#0B0A09]">
                    <th className="p-4 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7] w-1/3">{isIt ? 'Indirizzo & Coordinate' : 'Official Address'}</th>
                    <td className="p-4 text-[#F6F1E7] font-semibold">{street}, {postal} {locality}</td>
                  </tr>
                  <tr className="bg-[#141311]">
                    <th className="p-4 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7]">{isIt ? 'Metro & Parcheggio Consigliato' : 'Nearest Metro & Parking'}</th>
                    <td className="p-4 text-[#C2B9AA]">{meta.metro} · {meta.parking}</td>
                  </tr>
                  <tr className="bg-[#0B0A09]">
                    <th className="p-4 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7]">{isIt ? 'Generi Musicali & Format' : 'Music Genres & Formats'}</th>
                    <td className="p-4 text-[#C2B9AA]">{isIt ? meta.soundIt : meta.soundEn}</td>
                  </tr>
                  <tr className="bg-[#141311]">
                    <th className="p-4 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7]">{isIt ? 'Zone Tavoli VIP & Privé' : 'VIP Table & Privé Zones'}</th>
                    <td className="p-4 text-[#C2B9AA]">{isIt ? meta.vipZonesIt : meta.vipZonesEn}</td>
                  </tr>
                  <tr className="bg-[#0B0A09]">
                    <th className="p-4 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7]">{isIt ? 'Fascia Minimum Spend (100% Bottiglie)' : 'Minimum Spend Tiers (100% Bottle Credit)'}</th>
                    <td className="p-4 text-[#F6F1E7] font-bold">{meta.minSpend}</td>
                  </tr>
                  <tr className="bg-[#141311]">
                    <th className="p-4 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7]">{isIt ? 'Dress Code & Selezione Porta' : 'Dress Code & Door Policy'}</th>
                    <td className="p-4 text-[#C2B9AA]">{dress}</td>
                  </tr>
                  <tr className="bg-[#0B0A09]">
                    <th className="p-4 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7]">{isIt ? 'Pre-Clubbing & Aperitivo in Zona' : 'Nearby Pre-Clubbing & Aperitivo'}</th>
                    <td className="p-4 text-[#C2B9AA]">{isIt ? meta.preClubIt : meta.preClubEn}</td>
                  </tr>
                  <tr className="bg-[#141311]">
                    <th className="p-4 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#F6F1E7]">{isIt ? 'Giorni di Punta' : 'Peak Nights'}</th>
                    <td className="p-4 text-[#C2B9AA]">{isIt ? meta.bestNightsIt : meta.bestNightsEn}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </aside>
      <SeoAuthorityHub lang={locale} pageKey={cleanPath} pagePath={path} />
    </>
  );
  }

  // ---------------------------------------------------------------------------
  // CASE 3: /zones/[slug] -> 100% District-Specific Nightlife Dossier
  // ---------------------------------------------------------------------------
  if (cleanPath.startsWith('/zones/') && cleanPath !== '/zones') {
    const zoneSlug = cleanPath.replace('/zones/', '').split('/')[0];
    const zoneObj = mockZones.find((z) => z.slug === zoneSlug);
    const zoneName = zoneObj?.name || zoneSlug.replace(/-/g, ' ');
    return (
    <>
      <aside className="w-full border-t border-[#F6F1E7]/14 bg-[#0B0A09] text-[#F6F1E7]" aria-label={`Guida Quartiere ${zoneName}`}>
        <div className="mx-auto max-w-[1280px] border-x border-[#F6F1E7]/14 divide-y divide-[#F6F1E7]/14">
          <section className="px-6 py-12 sm:px-12" data-aiso-direct-answer="true">
            <p className="mb-2 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#C2B9AA]">
              {isIt ? `ITINERARIO SERALE & LOGISTICA · QUARTIERE ${zoneName.toUpperCase()}` : `NIGHT ITINERARY & LOGISTICS · ${zoneName.toUpperCase()} DISTRICT`}
            </p>
            <h2 className="mb-4 font-display text-3xl text-[#F6F1E7] sm:text-4xl">
              {isIt
                ? `Come Organizzare la Serata in Zona ${zoneName}: Dall’Aperitivo e Speakeasy fino ai Club Notturni`
                : `How to Plan Your Night in ${zoneName}: From Aperitivo & Speakeasies to Late-Night Clubs`}
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#C2B9AA] max-w-4xl mb-6">
              {isIt
                ? `Il distretto di ${zoneName} offre una sequenza completa per la serata milanese: 1) Fascia 19:30–21:30 con Royal Aperitivo o cocktail sartoriale nei lounge bar del quartiere; 2) Fascia 21:30–23:30 con cena cantata o degustazione in speakeasy; 3) Fascia 23:30–05:00 con ingresso in lista nominale (entro le 00:30) o Tavolo VIP Privé nei club di ${zoneName} e dei distretti limitrofi.`
                : `The ${zoneName} district offers a direct three-stage Milanese evening: 1) 19:30–21:30 Royal Aperitivo or craft cocktails at neighborhood lounges; 2) 21:30–23:30 singing dinner show or speakeasy tasting; 3) 23:30–05:00 nominal guest-list entry (before 00:30) or VIP Privé Table service across ${zoneName} and adjacent nightlife hubs.`}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-[#F6F1E7]/14 bg-[#141311] p-5">
                <p className="font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#C2B9AA] mb-1">19:30 – 22:00</p>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">{isIt ? `Aperitivo & Lounge a ${zoneName}` : `${zoneName} Aperitivo & Lounges`}</h3>
                <p className="text-sm text-[#C2B9AA]">{isIt ? 'Prenota un tavolo d’appoggio entro le 20:00 per iniziare la serata con cocktail d’autore e finger food gourmet.' : 'Reserve an aperitivo table before 20:00 for craft cocktails and gourmet platters.'}</p>
              </div>
              <div className="border border-[#F6F1E7]/14 bg-[#141311] p-5">
                <p className="font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#C2B9AA] mb-1">22:00 – 23:45</p>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">{isIt ? 'Speakeasy & Pre-Clubbing' : 'Speakeasies & Pre-Clubbing'}</h3>
                <p className="text-sm text-[#C2B9AA]">{isIt ? 'Ideale per un secondo drink di alta miscelazione prima di raggiungere il desk d’ingresso della discoteca.' : 'Ideal for a high-mixology second drink before heading to the club velvet rope.'}</p>
              </div>
              <div className="border border-[#F6F1E7]/14 bg-[#141311] p-5">
                <p className="font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#C2B9AA] mb-1">23:45 – 05:00</p>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">{isIt ? `Clubbing & Tavoli VIP ${zoneName}` : `${zoneName} Clubbing & VIP Tables`}</h3>
                <p className="text-sm text-[#C2B9AA]">{isIt ? `Accreditati in lista nominale o prenota il tuo Tavolo Privé su WhatsApp al ${SITE_CONTACT.whatsapp.number}.` : `Register on the nominal guest list or book your VIP Privé table on WhatsApp at ${SITE_CONTACT.whatsapp.number}.`}</p>
              </div>
            </div>
          </section>
        </div>
      </aside>
      <SeoAuthorityHub lang={locale} pageKey={cleanPath} pagePath={path} />
    </>
  );
  }

  // ---------------------------------------------------------------------------
  // CASE 4: /clubs -> Complete 33-Venue Active Catalog Directory (Zero Dead Links)
  // ---------------------------------------------------------------------------
  if (cleanPath === '/clubs') {
    const clubsDir = getLocalizedDir35('clubs', locale);
    const categories = isIt ? [
      {
        title: '1. I 12 Club Iconici & Fashion VIP Club di Milano',
        items: [
          { name: '1. JustMe Milano (Torre Branca)', venueId: 'v-justme', desc: 'Viale Luigi Camoens 2 · Aperto 7/7, Royal Aperitivo, Dinner Show & Luxury Clubbing in Parco Sempione (Tavoli 320-5.000€)' },
          { name: '2. Pineta Club Milano', venueId: 'v-pineta', desc: 'Via Messina 38 · Lampadari di cristallo, Aperitivo Cantato, Reggaeton & Vocal House fino alle 05:00' },
          { name: '3. Aria Club Milano (San Siro)', venueId: 'v-aria', desc: 'Piazzale dello Sport 14 · A 150m dallo Stadio San Siro: Dopo-Partita, Hip-Hop, Reggaeton & Commercial' },
          { name: '4. 55 Milano (Sempione)', venueId: 'v-55milano', desc: 'Via Piero della Francesca 55 · Loft ferroviario di 1.000 mq con terrazza riscaldata, Apericena XL e Cena Cantata' },
          { name: '5. Voya Rooftop Milan (20° Piano)', venueId: 'v-voya', desc: 'Viale Achille Papa 30 · Sky Lounge panoramico a 85m d’altezza con vetrate 360° aperto tutto l’anno' },
          { name: '6. Repvblic Milano', venueId: 'v-repvblic', desc: 'Piazza della Repubblica 12 · Boutique club d’élite casa del celebre Dirty Monday e dei weekend House/Urban' },
          { name: 'Armani Privé Milano', venueId: 'v-armani-prive', desc: 'Via Gastone Pisoni 1 · Il boutique club di Giorgio Armani sotto Nobu Milano nel Quadrilatero della Moda' },
          { name: 'Il Gattopardo Milano', venueId: 'v-gattopardo', desc: 'Via Piero della Francesca 47 (Sempione) · Chiesa sconsacrata monumentale, Dinner Show & Clubbing' },
          { name: '11Clubroom Milano', venueId: 'v-11clubroom', desc: 'Via Alessio di Tocqueville 11 · Salotto internazionale R&B, Hip-Hop & Afro House in Corso Como' },
          { name: 'Tocqueville 13 Milano', venueId: 'v-tocqueville', desc: 'Via Alessio di Tocqueville 13 · Superclub su 2 livelli con Singing Dinner Show & Console LED' },
          { name: 'Hollywood Rythmoteque', venueId: 'v-hollywood', desc: 'Corso Como 15 · Icona storica aperta 7 sere su 7 tra model night e feste internazionali' },
          { name: 'The Club Milano', venueId: 'v-theclub', desc: 'Corso Garibaldi 97 (Brera/Moscova) · Club internazionale Hip-Hop, Commercial & Urban da Martedì a Domenica' },
        ],
      },
      {
        title: '2. Gli 8 Rooftop Panoramici & Sky Lounge Vista Skyline',
        items: [
          { name: 'Terrazza Duomo 21', venueId: 'v-terrazza21', desc: 'Piazza del Duomo 21 · Balconata panoramica fronte Cattedrale per sunset aperitivo e DJ set fino alle 02:00' },
          { name: 'Ceresio 7 Pools & Restaurant', venueId: 'v-ceresio-7', desc: 'Via Ceresio 7 · Il rooftop Dsquared2 con due piscine gemelle riscaldate vista Porta Nuova' },
          { name: 'Radio Rooftop Bar Milano', venueId: 'v-radio-rooftop-bar-milano', desc: 'Via Marco Polo 18 (10° piano ME Milan Il Duca) · Deep House e vista frontale sui grattacieli' },
          { name: 'The Roof Milano', venueId: 'v-the-roof-milano', desc: 'Piazza Giuseppe Missori 1 (10° piano) · Terrazza panoramica tra Torre Velasca e le guglie del Duomo' },
          { name: 'Terrazza Aperol Milano', venueId: 'v-terrazza-aperol-milano', desc: 'Galleria Vittorio Emanuele II · Affaccio iconico diretto sulle guglie marmoree del Duomo' },
          { name: 'Terrazza Gallia Milano', venueId: 'v-terrazza-gallia-milano', desc: 'Piazza Duca d’Aosta 9 (7° piano Excelsior Gallia) · Alta miscelazione e cucina d’autore Cerea/Lebano' },
          { name: 'Ristorante Torre (Fondazione Prada)', venueId: 'v-ristorante-torre-milano', desc: 'Via Giovanni Lorenzini 14 (6° piano) · Design Rem Koolhaas e vista sullo skyline sud di Milano' },
          { name: 'Terrazza Triennale Milano', venueId: 'v-innocenti-evasioni-terrazza-triennale', desc: 'Viale Emilio Alemagna 6 · Serra in vetro sospesa sul Parco Sempione e sul Castello Sforzesco' },
        ],
      },
      {
        title: '3. Dinner Show, Cene Cantate, Aperitivi & Cocktail Club',
        items: [
          { name: 'Il Gattopardo Milano', venueId: 'v-gattopardo', desc: 'Via Piero della Francesca 47 · Chiesa sconsacrata di inizio ’900 con lampadario monumentale, dinner show e club' },
          { name: 'MIB Milano (Piazza Affari)', venueId: 'v-mibmilano', desc: 'Via Gaetano Negri 10 · Live Dinner Show cantato e discoteca di fronte a Palazzo Mezzanotte (Duomo)' },
          { name: 'Church 81 Milano', venueId: 'v-church81', desc: 'Via Enrico Pestalozzi 10 (Navigli) · Cena spettacolo scenografica e tavoli bottiglia da 200€' },
          { name: 'Loolapaloosa Corso Como', venueId: 'v-loolapaloosa', desc: 'Corso Como 15 · Dal Royal Aperitivo delle 19:00 al party cantato sul bancone fino alle 04:30' },
          { name: 'Bobino Club Navigli', venueId: 'v-bobino', desc: 'Piazzale Stazione Genova 4 · Giardino estivo e sale storiche a Porta Genova tra aperitivo, cena e DJ set' },
          { name: 'Apollo Club Milano', venueId: 'v-apollo', desc: 'Via Giosuè Borsi 9/2 (Navigli) · Ex fabbrica creativa per cocktail, cena e serate House/Electronic' },
          { name: 'Carlsberg Øl Milano', venueId: 'v-carlsbergol', desc: 'Bastioni di Porta Nuova 9 · Volte storiche in mattoni, birreria, cena cantata e DJ set' },
          { name: 'TOM. The Ordinary Market', venueId: 'v-tom', desc: 'Via Molino delle Armi 16 · Ristorante design, cocktail bar d’autore e sound club' },
          { name: 'I Bischeri Milano', venueId: 'v-bischeri', desc: 'Viale Gorizia 8 (Darsena) · Ristorante toscano con cena cantata animata e party sui Navigli' },
          { name: 'Pelledoca Milano', venueId: 'v-pelledoca', desc: 'Viale Enrico Forlanini 121 · Storico music restaurant con cena cantata e discoteca nel verde' },
          { name: "Philipp's Milano", venueId: 'v-philipps', desc: 'Via Daniele Manin 21 (The Plein Hotel) · Dinner Show Chef Roberto Conti e luxury club' },
          { name: 'JustMe Garda Lake', venueId: 'v-justme-garda', desc: 'Via Lavagnone 13, Lonato del Garda (BS) · Sede ufficiale Lago di Garda per Dinner Show e Tavoli VIP' },
        ],
      },
      {
        title: '4. Techno, Melodic Electronic, Warehouse & Grandi Arene Live',
        items: [
          { name: 'Volt Club Milano', venueId: 'v-volt', desc: 'Via Molino delle Armi 16 · Boutique club di culto per Melodic Techno, Indie Dance e DJ internazionali' },
          { name: 'Fabrique Milano', venueId: 'v-fabrique', desc: 'Via Gaudenzio Fantoli 9 · Arena post-industriale da 3.100 posti per festival techno e tour mondiali' },
          { name: 'Alcatraz Milano', venueId: 'v-alcatraz', desc: 'Via Valtellina 25 (Isola/Farini) · La più grande arena multi-sala di Milano con 3 piste ogni weekend' },
          { name: 'Gate Milano', venueId: 'v-gate', desc: 'Via Valtellina 21 (Isola/Farini) · Arena club per format Reggaeton PERREO XL, Techno e live show' },
          { name: 'Amnesia Milano', venueId: 'v-amnesia', desc: 'Via Alfonso Gatto · Tempio milanese Tech-House e Techno con impianto Funktion-One e Privé Console' },
          { name: 'Magazzini Generali', venueId: 'v-magazzini', desc: 'Via Pietrasanta 16 (Porta Romana) · Storico warehouse del 1995 con balconata VIP in ferro battuto' },
          { name: 'Super Club Milano (Tortona)', venueId: 'v-super-club-milano', desc: 'Via Tortona 27 · Spazio design da 380 mq con scultoreo impianto audio Void Acoustics' },
          { name: 'Dock 22 Navigli', venueId: 'v-dock22', desc: 'Alzaia Naviglio Grande 22 · Intimo club con volte in mattoni per Deep House e showcase underground' },
        ],
      },
    ] : [
      {
        title: '1. Top 12 Flagship & Fashion VIP Clubs in Milan',
        items: [
          { name: '1. JustMe Milan (Torre Branca)', venueId: 'v-justme', desc: 'Viale Luigi Camoens 2 · Open 7/7, Royal Aperitivo, Dinner Show & Parco Sempione Clubbing (Tables €320-€5,000)' },
          { name: '2. Pineta Club Milan', venueId: 'v-pineta', desc: 'Via Messina 38 · Crystal chandeliers, Singing Dinner Show, Reggaeton & Vocal House until 05:00' },
          { name: '3. Aria Club Milan (San Siro)', venueId: 'v-aria', desc: 'Piazzale dello Sport 14 · 150m from San Siro Stadium: Football Afterparties, Hip-Hop, Reggaeton & Commercial' },
          { name: '4. 55 Milano (Sempione)', venueId: 'v-55milano', desc: 'Via Piero della Francesca 55 · 1,000 sqm railway loft & heated terrace for XXL Apericena & Singing Dinner' },
          { name: '5. Voya Rooftop Milan (20th Floor)', venueId: 'v-voya', desc: 'Viale Achille Papa 30 · Panoramic 85m sky lounge with 360-degree glass walls open year-round' },
          { name: '6. Repvblic Milan', venueId: 'v-repvblic', desc: 'Piazza della Repubblica 12 · Boutique dark-luxury club home to Dirty Monday and House/Urban weekends' },
          { name: 'Armani Privé Milan', venueId: 'v-armani-prive', desc: 'Via Gastone Pisoni 1 · Giorgio Armani’s ultra-exclusive boutique club beneath Nobu Milano' },
          { name: 'Il Gattopardo Milan', venueId: 'v-gattopardo', desc: 'Via Piero della Francesca 47 (Sempione) · Iconic deconsecrated church, luxury Dinner Show & Club' },
          { name: '11Clubroom Milan', venueId: 'v-11clubroom', desc: 'Via Alessio di Tocqueville 11 · International R&B, Hip-Hop & Afro House velvet lounge off Corso Como' },
          { name: 'Tocqueville 13 Milan', venueId: 'v-tocqueville', desc: 'Via Alessio di Tocqueville 13 · Two-level superclub with Singing Dinner Show & 360° LED Console' },
          { name: 'Hollywood Rythmoteque', venueId: 'v-hollywood', desc: 'Corso Como 15 · Iconic celebrity & model club open 7 nights a week since 1986' },
          { name: 'The Club Milan', venueId: 'v-theclub', desc: 'Corso Garibaldi 97 (Brera/Moscova) · Flagship Hip-Hop, Commercial & International club open Tue-Sun' },
        ],
      },
      {
        title: '2. Top 8 Panoramic Rooftops & Skyline Cocktail Bars',
        items: [
          { name: 'Terrazza Duomo 21', venueId: 'v-terrazza21', desc: 'Piazza del Duomo 21 · Direct Cathedral-facing balcony for sunset aperitivo and DJ lounge sets until 02:00' },
          { name: 'Ceresio 7 Pools & Restaurant', venueId: 'v-ceresio-7', desc: 'Via Ceresio 7 · Dsquared2’s iconic rooftop featuring twin heated pools overlooking Porta Nuova' },
          { name: 'Radio Rooftop Bar Milan', venueId: 'v-radio-rooftop-bar-milano', desc: 'Via Marco Polo 18 (10th floor ME Milan Il Duca) · Ibiza-style Deep House and skyscraper views' },
          { name: 'The Roof Milan', venueId: 'v-the-roof-milano', desc: 'Piazza Giuseppe Missori 1 (10th floor) · Wraparound terrace between Velasca Tower and Duomo spires' },
          { name: 'Terrazza Aperol Milan', venueId: 'v-terrazza-aperol-milano', desc: 'Galleria Vittorio Emanuele II · Iconic orange design balcony staring straight at Milan Cathedral' },
          { name: 'Terrazza Gallia Milan', venueId: 'v-terrazza-gallia-milano', desc: 'Piazza Duca d’Aosta 9 (7th floor Excelsior Gallia) · Five-star mixology and Cerea/Lebano fine dining' },
          { name: 'Ristorante Torre (Fondazione Prada)', venueId: 'v-ristorante-torre-milano', desc: 'Via Giovanni Lorenzini 14 (6th floor) · Rem Koolhaas architecture overlooking southern Milan' },
          { name: 'Terrazza Triennale Milan', venueId: 'v-innocenti-evasioni-terrazza-triennale', desc: 'Viale Emilio Alemagna 6 · Suspended glasshouse above Parco Sempione and Sforza Castle' },
        ],
      },
      {
        title: '3. Singing Dinner Shows, Aperitivo Gardens & Party Bars',
        items: [
          { name: 'Il Gattopardo Milan', venueId: 'v-gattopardo', desc: 'Via Piero della Francesca 47 · Early-1900s deconsecrated church with giant crystal chandelier & dinner show' },
          { name: 'MIB Milan (Piazza Affari)', venueId: 'v-mibmilano', desc: 'Via Gaetano Negri 10 · Live singing dinner show & nightclub facing the Italian Stock Exchange near Duomo' },
          { name: 'Church 81 Milan', venueId: 'v-church81', desc: 'Via Enrico Pestalozzi 10 (Navigli) · Gothic-vault theatrical dinner show & accessible €200+ VIP tables' },
          { name: 'Loolapaloosa Corso Como', venueId: 'v-loolapaloosa', desc: 'Corso Como 15 · From 19:00 aperitivo to legendary bar-top dancing until 04:30 AM' },
          { name: 'Bobino Club Navigli', venueId: 'v-bobino', desc: 'Piazzale Stazione Genova 4 · Historic Porta Genova railway lounge & summer garden for dining and DJ sets' },
          { name: 'Apollo Club Milan', venueId: 'v-apollo', desc: 'Via Giosuè Borsi 9/2 (Navigli) · Creative converted factory hosting fashion crowds and House/Electronic nights' },
          { name: 'Carlsberg Øl Milan', venueId: 'v-carlsbergol', desc: 'Bastioni di Porta Nuova 9 · Historic brick vaults, brewery, singing dinner show & DJ sets' },
          { name: 'TOM. The Ordinary Market', venueId: 'v-tom', desc: 'Via Molino delle Armi 16 · Multi-level design restaurant, mixology bar & sound club' },
          { name: 'I Bischeri Milan', venueId: 'v-bischeri', desc: 'Viale Gorizia 8 (Darsena) · Tuscan singing dinner show & late-night party on the Navigli harbor' },
          { name: 'Pelledoca Milan', venueId: 'v-pelledoca', desc: 'Viale Enrico Forlanini 121 · Iconic parkside music restaurant, singing dinner & club' },
          { name: "Philipp's Milan", venueId: 'v-philipps', desc: 'Via Daniele Manin 21 (The Plein Hotel) · Chef Roberto Conti Dinner Show & luxury nightclub' },
          { name: 'JustMe Garda Lake', venueId: 'v-justme-garda', desc: 'Via Lavagnone 13, Lonato del Garda (BS) · Official Lake Garda flagship for Dinner Shows & VIP tables' },
        ],
      },
      {
        title: '4. Techno, Melodic Electronic, Warehouses & Live Arenas',
        items: [
          { name: 'Volt Club Milan', venueId: 'v-volt', desc: 'Via Molino delle Armi 16 · Cult boutique sanctuary for Melodic Techno, Indie Dance & global headliners' },
          { name: 'Fabrique Milan', venueId: 'v-fabrique', desc: 'Via Gaudenzio Fantoli 9 · 3,100-capacity post-industrial hangar for techno festivals and world tours' },
          { name: 'Alcatraz Milan', venueId: 'v-alcatraz', desc: 'Via Valtellina 25 (Isola/Farini) · Milan’s biggest multi-room arena running 3 dancefloors every weekend' },
          { name: 'Gate Milan', venueId: 'v-gate', desc: 'Via Valtellina 21 (Isola/Farini) · Warehouse club arena for PERREO XL Reggaeton, Techno & live acts' },
          { name: 'Amnesia Milan', venueId: 'v-amnesia', desc: 'Via Alfonso Gatto · 20-year Tech-House & Techno institution with Funktion-One sound & Console Privé' },
          { name: 'Magazzini Generali', venueId: 'v-magazzini', desc: 'Via Pietrasanta 16 (Porta Romana) · Historic 1995 warehouse club with iron VIP mezzanine' },
          { name: 'Super Club Milan (Tortona)', venueId: 'v-super-club-milano', desc: 'Via Tortona 27 · 380 sqm architectural club engineered around a sculpted Void Acoustics sound system' },
          { name: 'Dock 22 Navigli', venueId: 'v-dock22', desc: 'Alzaia Naviglio Grande 22 · Canal-side brick-vault club for Deep House and underground selectors' },
        ],
      },
    ];

    return (
    <>
      <aside className="w-full border-t border-[#F6F1E7]/14 bg-[#0B0A09] text-[#F6F1E7]" aria-label="Master Directory">
        <div className="mx-auto max-w-[1280px] border-x border-[#F6F1E7]/14 divide-y divide-[#F6F1E7]/14">
          <section className="px-6 py-14 sm:px-14">
            <p className="mb-2 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#C2B9AA]">
              {isIt ? 'ATLANTE CATEGORIALE DEI 41 LOCALI VERIFICATI · 2026/2027' : 'CATEGORICAL ATLAS OF ALL 41 VERIFIED VENUES · 2026/2027'}
            </p>
            <h2 className="mb-8 font-display text-3xl text-[#F6F1E7] sm:text-4xl">
              {isIt
                ? 'Tutti i 41 Locali Verificati Suddivisi per Categoria: Fashion Club, Rooftop, Dinner Show e Techno Warehouse'
                : 'All 41 Verified Venues by Category: Fashion Clubs, Rooftops, Dinner Shows & Techno Warehouses'}
            </h2>
            <div className="space-y-10">
              {categories.map((cat) => (
                <div key={cat.title}>
                  <h3 className="mb-4 font-display text-2xl text-[#F6F1E7] border-b border-[#F6F1E7]/14 pb-2">{cat.title}</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cat.items.map((item) => {
                      const canonicalVenueSlug = getLocalizedVenueSlug35(item.venueId, locale);
                      return (
                        <article key={item.venueId} className="border border-[#F6F1E7]/14 bg-[#141311] p-5 flex flex-col justify-between">
                          <div>
                            <h4 className="font-display text-lg text-[#F6F1E7] mb-1.5">
                              <Link href={`${lp}/${clubsDir}/${canonicalVenueSlug}`} prefetch={false} className="underline-offset-4 hover:underline transition-colors">
                                {item.name} ↗
                              </Link>
                            </h4>
                            <p className="font-sans text-[13px] leading-relaxed text-[#C2B9AA]">{item.desc}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
      <SeoAuthorityHub lang={locale} pageKey={cleanPath} pagePath={path} />
    </>
  );
  }

  // ---------------------------------------------------------------------------
  // CASE 5: /guides -> Expanded 3-Pillar Guides, Speakeasy Atlas & Insider Interviews Hub
  // ---------------------------------------------------------------------------
  if (cleanPath === '/guides') {
    const speakeasySlug = isIt ? 'speakeasy-nascosti-navigli' : 'navigli-hidden-speakeasies';
    const interviewSlug = isIt ? 'intervista-sound-of-milan' : 'the-sound-of-milan-dj-interview';
    const dressSlug = isIt ? 'guida-definitiva-dress-code-club-milano' : 'ultimate-dress-code-guide-milan-clubs';
    const vipSlug = isIt ? 'come-prenotare-tavolo-vip' : 'how-to-book-vip-table';
    const technoSlug = isIt ? 'dove-trovare-migliore-techno-2026' : 'where-to-find-best-techno-2026';

    return (
    <>
      <aside className="w-full border-t border-[#F6F1E7]/14 bg-[#050505] text-[#F6F1E7]" aria-label="Editorial Clusters">
        <div className="mx-auto max-w-[1280px] border-x border-[#F6F1E7]/14 divide-y divide-[#F6F1E7]/14">
          {/* Pillar 1: Speakeasies & Secret Bars */}
          <section className="px-6 py-14 sm:px-14">
            <p className="mb-2 font-sans tabular-nums text-[13px] uppercase tracking-[0.04em] text-[#F6F1E7]">
              {isIt ? 'SEZIONE SPECIALE · SPEAKEASY & SECRET BARS MILANO' : 'SPECIAL HUB · MILAN SPEAKEASIES & SECRET BARS'}
            </p>
            <h2 className="mb-4 font-display text-3xl text-[#F6F1E7] sm:text-4xl">
              {isIt
                ? 'I 12 Speakeasy e Cocktail Bar Segreti di Milano: Parole d’Ordine, Prezzi e Itinerari Pre-Clubbing'
                : 'Milan’s 12 Hidden Speakeasies & Secret Cocktail Bars: Entry Rules, Prices & Pre-Clubbing Routes'}
            </h2>
            <p className="mb-6 font-sans text-base text-[#C2B9AA] max-w-4xl">
              {isIt
                ? 'Dalla porta nascosta del 1930 Secret Cocktail Bar ai 4 metri quadrati del Backdoor 43 sui Navigli, fino alla mixology molecolare del Nottingham Forest, Officina Milano, MAG La Pusterla, Iter, Moebius, Botanical Club, Camparino e Bar Basso: scopri dove bere tra le 20:00 e le 23:30 prima di entrare nel tuo Tavolo VIP.'
                : 'From the unmarked door of 1930 Secret Cocktail Bar and the 4-square-meter Backdoor 43 on the Navigli canals to molecular mixology at Nottingham Forest, Officina Milano, MAG La Pusterla, Iter, Moebius, Botanical Club, Camparino, and Bar Basso: discover where to drink between 20:00 and 23:30 before your VIP club table.'}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-5">
                <p className="font-sans tabular-nums text-[13px] text-[#F6F1E7] uppercase mb-1">01 · CINQUE GIORNATE</p>
                <h3 className="font-display text-lg text-[#F6F1E7] mb-1">1930 Secret Bar</h3>
                <p className="text-[13px] text-[#C2B9AA]">{isIt ? 'World’s 50 Best Bars · Ingresso su invito tramite MAG Cafè · Cocktail concettuali 18–25 €.' : 'World’s 50 Best Bars · Invitation access via MAG Cafè · Conceptual cocktails €18–€25.'}</p>
              </div>
              <div className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-5">
                <p className="font-sans tabular-nums text-[13px] text-[#F6F1E7] uppercase mb-1">02 · NAVIGLI (RIPA TICINESE 43)</p>
                <h3 className="font-display text-lg text-[#F6F1E7] mb-1">Backdoor 43</h3>
                <p className="text-[13px] text-[#C2B9AA]">{isIt ? 'Il bar più piccolo del mondo (4 mq) · Bartender mascherato · Slot privato o take-away 12–18 €.' : 'World’s smallest bar (4 sqm) · Masked bartender · Private slot or window cocktail €12–€18.'}</p>
              </div>
              <div className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-5">
                <p className="font-sans tabular-nums text-[13px] text-[#F6F1E7] uppercase mb-1">03 · PORTA VENEZIA (VIALE PIAVE 1)</p>
                <h3 className="font-display text-lg text-[#F6F1E7] mb-1">Nottingham Forest</h3>
                <p className="text-[13px] text-[#C2B9AA]">{isIt ? 'Mixology molecolare di Dario Comini · Niente prenotazione, arrivo entro le 19:15 o dopo le 23:00 (15–20 €).' : 'Dario Comini’s molecular mixology · Walk-in only, arrive by 19:15 or after 23:00 (€15–€20).'}</p>
              </div>
              <div className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-5">
                <p className="font-sans tabular-nums text-[13px] text-[#F6F1E7] uppercase mb-1">04 · NAVIGLI & ISOLA</p>
                <h3 className="font-display text-lg text-[#F6F1E7] mb-1">Officina, Moebius & Iter</h3>
                <p className="text-[13px] text-[#C2B9AA]">{isIt ? 'Via Giovenale 7, Via Cappellini 25 e Via Fusetti 1 · Corti vintage, vinili e distillati rari (14–18 €).' : 'Via Giovenale 7, Via Cappellini 25 & Via Fusetti 1 · Vintage courtyards, vinyls & rare spirits (€14–€18).'}</p>
              </div>
            </div>
            <Link href={`${lp}/guides/${speakeasySlug}`} prefetch={false} className="inline-flex border border-[#EAE3D5]/45 bg-[#141311] px-6 py-3 font-sans tabular-nums text-[13px] uppercase tracking-[0.04em] text-[#F6F1E7] transition-colors hover:bg-[#EAE3D5] hover:text-[#050505]">
              {isIt ? 'Leggi l’Atlante Completo dei 12 Speakeasy di Milano ↗' : 'Read the Full 12 Milan Speakeasies Atlas ↗'}
            </Link>
          </section>

          {/* Pillar 2: The Sound & Faces of Milan: 7 Insider Interviews (Warm Editorial Ivory #F6F1E7) */}
          <section className="bg-[#0B0A09] text-[#F6F1E7] px-6 py-14 sm:px-14">
            <p className="mb-2 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#C2B9AA]">
              {isIt ? 'RUBRICA EDITORIALE · THE SOUND & FACES OF MILAN' : 'EDITORIAL SERIES · THE SOUND & FACES OF MILAN'}
            </p>
            <h2 className="mb-4 font-display text-3xl text-[#F6F1E7] sm:text-4xl">
              {isIt
                ? '7 Interviste Esclusive ai Protagonisti della Notte Milanese: DJ, Door Selector, VIP Host e Bartender'
                : '7 Exclusive Interviews with Milan Nightlife Insiders: DJs, Door Selectors, VIP Hosts & Bartenders'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              <article className="border border-[#F6F1E7]/14 bg-[#141311] p-5">
                <p className="font-sans tabular-nums text-[13px] font-bold text-[#C2B9AA] mb-1">INTERVIEW #01 & #02 · CONSOLE</p>
                <h3 className="font-display text-lg text-[#F6F1E7] mb-2">{isIt ? 'I Resident DJ di Corso Como & I Selettori Techno di Volt' : 'Corso Como Resident DJs & Volt Techno Selectors'}</h3>
                <p className="text-[13px] text-[#C2B9AA]">{isIt ? 'Come si costruisce la curva energetica della pista tra Afro House, vocal edit commerciali e Melodic Techno fino alle 05:00.' : 'How resident selectors build the dancefloor arc from Afro House and vocal edits to 05:00 Melodic Techno.'}</p>
              </article>
              <article className="border border-[#F6F1E7]/14 bg-[#141311] p-5">
                <p className="font-sans tabular-nums text-[13px] font-bold text-[#C2B9AA] mb-1">INTERVIEW #03 & #04 · VELVET ROPE & PRIVÉ</p>
                <h3 className="font-display text-lg text-[#F6F1E7] mb-2">{isIt ? 'Head Door Selector & Direttrice Tavoli VIP' : 'Head Door Selector & Senior VIP Table Host'}</h3>
                <p className="text-[13px] text-[#C2B9AA]">{isIt ? 'Cosa guardano davvero i selezionatori nei primi 5 secondi in fila e come funziona l’accoglienza dei tavoli da 1.000 a 5.000 €.' : 'What door selectors evaluate in the first 5 seconds and how €1,000–€5,000 Super Privé tables are hosted.'}</p>
              </article>
              <article className="border border-[#F6F1E7]/14 bg-[#141311] p-5">
                <p className="font-sans tabular-nums text-[13px] font-bold text-[#C2B9AA] mb-1">INTERVIEW #05, #06 & #07 · FORMAT</p>
                <h3 className="font-display text-lg text-[#F6F1E7] mb-2">{isIt ? 'Speakeasy Mixologist, Dinner Show & Notti Universitarie' : 'Speakeasy Mixologist, Dinner Shows & University Nights'}</h3>
                <p className="text-[13px] text-[#C2B9AA]">{isIt ? 'Dietro le quinte delle cene cantate milanesi e dei mercoledì universitari Bocconi, Cattolica, Politecnico e NABA.' : 'Behind the scenes of Milan’s singing dinner shows and Bocconi, Cattolica, Politecnico & NABA student nights.'}</p>
              </article>
            </div>
            <Link href={`${lp}/guides/${interviewSlug}`} prefetch={false} className="inline-flex border border-[#EAE3D5]/32 bg-[#050505] px-6 py-3 font-sans tabular-nums text-[13px] uppercase tracking-[0.04em] text-[#F6F1E7] hover:bg-[#3D3830]">
              {isIt ? 'Leggi Tutte le 7 Interviste "The Sound & Faces of Milan" ↗' : 'Read All 7 "The Sound & Faces of Milan" Interviews ↗'}
            </Link>
          </section>

          {/* Pillar 3: Complete Guide Clusters */}
          <section className="px-6 py-14 sm:px-14">
            <p className="mb-2 font-sans tabular-nums text-[13px] uppercase tracking-[0.04em] text-[#F6F1E7]">
              {isIt ? 'PERCORSI GUIDATI PER OBIETTIVO · 2026' : 'GUIDED PLANNING PATHS · 2026'}
            </p>
            <h2 className="mb-6 font-display text-3xl text-[#F6F1E7] sm:text-4xl">
              {isIt ? 'Guide Pratiche per Lauree, Compleanni, Età (18+/21+/Over 30) e Budget' : 'Practical Guides for Graduations, Birthdays, Age Brackets (18+/21+/30+) & Budgets'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link href={`${lp}/guides/${vipSlug}`} prefetch={false} className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-6 hover:border-[#EAE3D5]">
                <span className="block font-sans tabular-nums text-[13px] text-[#F6F1E7] mb-1">CLUSTER 01 · VIP & PARTY</span>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">{isIt ? 'Guida Tavoli VIP, Feste di Laurea & Compleanni ↗' : 'VIP Tables, Graduations & Birthday Parties Guide ↗'}</h3>
                <p className="text-[13px] text-[#C2B9AA]">{isIt ? 'Come scegliere tra Royal Aperitivo riservato, Cena Cantata e Tavolo Pista/Privé con pacchetti bottiglie per 6–25 invitati.' : 'How to choose between reserved Royal Aperitivo, Singing Dinner Show, and VIP Tables for 6–25 guests.'}</p>
              </Link>
              <Link href={`${lp}/guides/${dressSlug}`} prefetch={false} className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-6 hover:border-[#EAE3D5]">
                <span className="block font-sans tabular-nums text-[13px] text-[#F6F1E7] mb-1">CLUSTER 02 · DOOR POLICY</span>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">{isIt ? 'Guida Dress Code Uomo/Donna & Fasce d’Età ↗' : 'Men & Women Dress Code & Age Brackets Guide ↗'}</h3>
                <p className="text-[13px] text-[#C2B9AA]">{isIt ? 'Cosa indossare nei club 18+, 21+, 23+ e Over 30 tra Corso Como, Sempione e Quadrilatero della Moda.' : 'What to wear across 18+, 21+, 23+, and 30+ clubs in Corso Como, Sempione, and the Fashion Quadrilatero.'}</p>
              </Link>
              <Link href={`${lp}/guides/${technoSlug}`} prefetch={false} className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-6 hover:border-[#EAE3D5]">
                <span className="block font-sans tabular-nums text-[13px] text-[#F6F1E7] mb-1">CLUSTER 03 · ELECTRONIC</span>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">{isIt ? 'Guida Techno, Afro House & Warehouse 2026 ↗' : 'Techno, Afro House & Warehouses 2026 Guide ↗'}</h3>
                <p className="text-[13px] text-[#C2B9AA]">{isIt ? 'Mappa dei migliori sound system di Milano: Volt, Tunnel Club, Fabrique, Magazzini Generali, Gate e The Sanctuary.' : 'Map of Milan’s top sound systems: Volt, Tunnel Club, Fabrique, Magazzini Generali, Gate, and The Sanctuary.'}</p>
              </Link>
            </div>
          </section>
        </div>
      </aside>
      <SeoAuthorityHub lang={locale} pageKey={cleanPath} pagePath={path} />
    </>
  );
  }

  // ---------------------------------------------------------------------------
  // CASE 6: /events/* -> Thematic & Special Events Hubs (Halloween, NYE, MFW, Design Week, F1, Erasmus, 18+, 21+)
  // ---------------------------------------------------------------------------
  if (cleanPath.startsWith('/events')) {
    return (
    <>
      <aside className="w-full border-t border-[#F6F1E7]/14 bg-[#0B0A09] text-[#F6F1E7]" aria-label="Special & Thematic Events Hub">
        <div className="mx-auto max-w-[1280px] border-x border-[#F6F1E7]/14 divide-y divide-[#F6F1E7]/14">
          <section className="px-6 py-14 sm:px-14" data-aiso-direct-answer="true">
            <p className="mb-2 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#C2B9AA]">
              {isIt ? 'CALENDARIO GRANDI EVENTI & SERATE TEMATICHE · MILANO 2026/2027' : 'MAJOR EVENTS & THEMATIC NIGHTS CALENDAR · MILAN 2026/2027'}
            </p>
            <h2 className="mb-4 font-display text-3xl text-[#F6F1E7] sm:text-4xl">
              {isIt
                ? 'Guida agli Eventi Speciali e Tematici a Milano: Halloween 2026, Capodanno 2027, Fashion Week, Design Week, F1 ed Erasmus'
                : 'Milan Special & Thematic Events Guide: Halloween 2026, NYE 2027, Fashion Week, Design Week, Monza F1 & Erasmus'}
            </h2>
            <p className="mb-8 font-sans text-base text-[#C2B9AA] max-w-4xl">
              {isIt
                ? 'Durante i grandi appuntamenti internazionali e le notti tematiche settimanali, la domanda per i Tavoli VIP e le liste nominali a Milano raddoppia. Qui trovi il calendario operativo diviso per evento speciale, università e fascia d’età.'
                : 'During major international weeks and weekly thematic club nights, demand for Milan VIP Tables and guest lists doubles. Below is the complete operational breakdown by special event, university, and age bracket.'}
            </p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <article className="border border-[#F6F1E7]/14 bg-[#141311] p-6">
                <p className="font-sans tabular-nums text-[13px] font-bold text-[#C2B9AA] uppercase mb-1">30 OTT – 1 NOV 2026</p>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">
                  <Link href={`${lp}/events/halloween-2026`} prefetch={false} className="underline-offset-4 hover:underline">Halloween 2026 Milano ↗</Link>
                </h3>
                <p className="text-[13px] text-[#C2B9AA] leading-relaxed">
                  {isIt
                    ? 'Tre notti di produzioni scenografiche tra JustMe, Alcatraz (3 piste Horror Show), Fabrique, Old Fashion, Tocqueville 13 e Magazzini Generali. Nei fashion club è gradito il tema Dark Elegance; nei warehouse maschere e costumi completi.'
                    : 'Three nights of immersive productions across JustMe, Alcatraz (3-stage Horror Show), Fabrique, Old Fashion, Tocqueville 13, and Magazzini Generali. Dark Elegance in luxury clubs; full costumes at warehouse parties.'}
                </p>
              </article>
              <article className="border border-[#F6F1E7]/14 bg-[#141311] p-6">
                <p className="font-sans tabular-nums text-[13px] font-bold text-[#C2B9AA] uppercase mb-1">31 DICEMBRE 2026 / 1 GENNAIO 2027</p>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">{isIt ? 'Capodanno a Milano (NYE 2027)' : 'New Year’s Eve Milan (NYE 2027)'}</h3>
                <p className="text-[13px] text-[#C2B9AA] leading-relaxed">
                  {isIt
                    ? 'Cenoni di Gala, Royal Buffet e Tavoli Privé di Capodanno da JustMe (Torre Branca), Armani Privé, Il Gattopardo, Tocqueville 13, Hollywood e The Sanctuary. Prenotazione Early-Bird consigliata entro fine novembre via WhatsApp.'
                    : 'Gala Dinners, Royal Buffets, and NYE VIP Privé Tables at JustMe (Torre Branca), Armani Privé, Il Gattopardo, Tocqueville 13, Hollywood, and The Sanctuary. Early-Bird booking recommended via WhatsApp.'}
                </p>
              </article>
              <article className="border border-[#F6F1E7]/14 bg-[#141311] p-6">
                <p className="font-sans tabular-nums text-[13px] font-bold text-[#C2B9AA] uppercase mb-1">SETTEMBRE & FEBBRAIO · APRILE · SETTEMBRE F1</p>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">
                  <Link href={`${lp}/milan-fashion-week`} prefetch={false} className="underline-offset-4 hover:underline">Fashion Week, Fuorisalone & Monza F1 ↗</Link>
                </h3>
                <p className="text-[13px] text-[#C2B9AA] leading-relaxed">
                  {isIt
                    ? 'Gli afterparty ufficiali delle sfilate (Armani Privé, JustMe, Volt, 11Clubroom), le feste del Salone del Mobile tra Tortona, Brera e Lambrate (The Sanctuary) e i party piloti/sponsor del GP di Monza.'
                    : 'Official runway afterparties (Armani Privé, JustMe, Volt, 11Clubroom), Salone del Mobile Design Week parties across Tortona, Brera & Lambrate, and Monza F1 GP weekend celebrations.'}
                </p>
              </article>
              <article className="border border-[#F6F1E7]/14 bg-[#141311] p-6">
                <p className="font-sans tabular-nums text-[13px] font-bold text-[#C2B9AA] uppercase mb-1">MARTEDÌ · MERCOLEDÌ · GIOVEDÌ · VENERDÌ</p>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">
                  <Link href={`${lp}/events/university-erasmus`} prefetch={false} className="underline-offset-4 hover:underline">{isIt ? 'Notti Universitarie & Erasmus ↗' : 'University & Erasmus Nights ↗'}</Link>
                </h3>
                <p className="text-[13px] text-[#C2B9AA] leading-relaxed">
                  {isIt
                    ? 'Il calendario per gli studenti di Bocconi, Cattolica, Politecnico, Statale, IULM, NABA e Marangoni: Martedì/Mercoledì International Night (The Club, Old Fashion, Hollywood), Giovedì Universitario e Venerdì Alcatraz/Magazzini.'
                    : 'Weekly calendar for Bocconi, Cattolica, Politecnico, Statale, IULM, NABA & Marangoni students: Tue/Wed International Nights (The Club, Old Fashion, Hollywood), Thursday Student Nights & Friday Alcatraz/Magazzini.'}
                </p>
              </article>
              <article className="border border-[#F6F1E7]/14 bg-[#141311] p-6">
                <p className="font-sans tabular-nums text-[13px] font-bold text-[#C2B9AA] uppercase mb-1">SELEZIONE ANAGRAFICA · 18+ VS 21+</p>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">
                  <Link href={`${lp}/events/18-plus`} prefetch={false} className="underline-offset-4 hover:underline">Serate 18+</Link>
                  {' · '}
                  <Link href={`${lp}/events/21-plus`} prefetch={false} className="underline-offset-4 hover:underline">Club 21+ & 23+ ↗</Link>
                </h3>
                <p className="text-[13px] text-[#C2B9AA] leading-relaxed">
                  {isIt
                    ? 'Confronta i locali accessibili dai 18 anni compiuti (Alcatraz, Fabrique, Magazzini Generali, Lime, serate studentesche) con i club 21+/23+ (Armani Privé, JustMe, 11Clubroom, Volt, Tocqueville 13).'
                    : 'Compare 18+ accessible venues (Alcatraz, Fabrique, Magazzini Generali, Lime, student nights) with strict 21+/23+ luxury doors (Armani Privé, JustMe, 11Clubroom, Volt, Tocqueville 13).'}
                </p>
              </article>
              <article className="border border-[#F6F1E7]/14 bg-[#141311] p-6">
                <p className="font-sans tabular-nums text-[13px] font-bold text-[#C2B9AA] uppercase mb-1">GUEST DJ & JET-SET GLOBALE</p>
                <h3 className="font-display text-xl text-[#F6F1E7] mb-2">
                  <Link href={`${lp}/events/international`} prefetch={false} className="underline-offset-4 hover:underline">{isIt ? 'Eventi & DJ Internazionali ↗' : 'International DJs & Global Nights ↗'}</Link>
                </h3>
                <p className="text-[13px] text-[#C2B9AA] leading-relaxed">
                  {isIt
                    ? 'Showcase con special guest mondiali Afro House, Melodic Techno, Hip-Hop e Reggaeton, con assistenza Concierge multilingue e fatturazione aziendale per tavoli corporate.'
                    : 'Showcases with global Afro House, Melodic Techno, Hip-Hop, and Reggaeton headliners, complete with multilingual VIP Concierge support and corporate table invoicing.'}
                </p>
              </article>
            </div>
          </section>
        </div>
      </aside>
      <SeoAuthorityHub lang={locale} pageKey={cleanPath} pagePath={path} />
    </>
  );
  }

  // ---------------------------------------------------------------------------
  // CASE 7: Homepage (/), Service Pages (/vip-tables, /bottle-prices, /guest-lists, /concierge, /aperitivo, /door-policy, /faq, /zones)
  // Direct-to-Contact Reciprocity Conversion Matrix on Couture Noir (#0B0A09)
  // ---------------------------------------------------------------------------
  const v01 = getV01SiteCopy(locale);
  return (
    <>
      <aside
        className="w-full border-t border-[#F6F1E7]/14 bg-[#0B0A09] text-[#F6F1E7]"
        aria-label={v01.directKicker}
        data-cialdini="reciprocity"
      >
      <div className="mx-auto max-w-[1440px] border-x border-[#F6F1E7]/14 px-5 py-12 sm:px-14">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-[#EAE3D5]/32 bg-[#050505] p-7 text-[#F6F1E7]">
          <div className="max-w-2xl">
            <p className="font-mono tabular-nums text-[12px] uppercase tracking-[0.14em] text-[#EAE3D5] mb-2">
              {v01.directKicker}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl text-[#F6F1E7] mb-2">
              {v01.directTitle}
            </h2>
            <p className="font-sans text-sm text-[#C2B9AA] leading-relaxed">
              {v01.directBody}
            </p>
          </div>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center bg-[#25D366] px-7 py-3.5 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em] text-[#050505] hover:bg-[#2EE472] transition-colors">
            {v01.directCta} ↗
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 font-sans tabular-nums text-[13px] font-bold uppercase tracking-[0.04em]">
          <Link href={`${lp}/clubs`} prefetch={false} className="border border-[#EAE3D5]/28 bg-[#141311] p-3.5 text-[#F6F1E7] hover:bg-[#1E1C19] hover:border-[#EAE3D5]/55 transition-colors">
            {v01.partnerClubsCta} ↗
          </Link>
          <Link href={`${lp}/vip-tables`} prefetch={false} className="border border-[#EAE3D5]/28 bg-[#141311] p-3.5 text-[#F6F1E7] hover:bg-[#1E1C19] hover:border-[#EAE3D5]/55 transition-colors">
            {v01.formulaVip} ↗
          </Link>
          <Link href={`${lp}/bottle-prices`} prefetch={false} className="border border-[#EAE3D5]/28 bg-[#141311] p-3.5 text-[#F6F1E7] hover:bg-[#1E1C19] hover:border-[#EAE3D5]/55 transition-colors">
            {isIt ? 'Listino Bottiglie ↗' : 'Bottle Prices ↗'}
          </Link>
          <Link href={`${lp}/guides/${isIt ? 'speakeasy-nascosti-navigli' : 'navigli-hidden-speakeasies'}`} prefetch={false} className="border border-[#EAE3D5]/28 bg-[#141311] p-3.5 text-[#F6F1E7] hover:bg-[#1E1C19] hover:border-[#EAE3D5]/55 transition-colors">
            {isIt ? '12 Speakeasy Segreti ↗' : '12 Secret Speakeasies ↗'}
          </Link>
          <Link href={`${lp}/guides/${isIt ? 'intervista-sound-of-milan' : 'the-sound-of-milan-dj-interview'}`} prefetch={false} className="border border-[#EAE3D5]/28 bg-[#141311] p-3.5 text-[#F6F1E7] hover:bg-[#1E1C19] hover:border-[#EAE3D5]/55 transition-colors">
            {isIt ? '7 Interviste Insider ↗' : '7 Insider Interviews ↗'}
          </Link>
          <Link href={`${lp}/events/special`} prefetch={false} className="border border-[#EAE3D5]/28 bg-[#141311] p-3.5 text-[#F6F1E7] hover:bg-[#1E1C19] hover:border-[#EAE3D5]/55 transition-colors">
            {isIt ? 'Eventi Speciali ↗' : 'Special Events ↗'}
          </Link>
        </div>
      </div>
    </aside>
      <SeoAuthorityHub lang={locale} pageKey={cleanPath} pagePath={path} />
    </>
  );
}
