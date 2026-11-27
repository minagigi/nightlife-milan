import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type { CapodannoLocalizedEventContent } from './repvblic35';
import { capodannoNavigation } from './routes';

export const BERGAMO_BRESCIA_NYE_SLUGS = [
  'capodanno-setai-club-bergamo',
  'capodanno-capogiro-curno-bergamo',
  'capodanno-tiky-klub-seriate-bergamo',
  'capodanno-zero-club-bergamo',
  'capodanno-qi-clubbing-brescia',
  'capodanno-number-one-brescia',
] as const;

export type BergamoBresciaNyeSlug = (typeof BERGAMO_BRESCIA_NYE_SLUGS)[number];

interface NyeVenueSeed {
  slug: BergamoBresciaNyeSlug;
  venueName: string;
  cityLabel: string;
  province: 'BG' | 'BS';
  address: string;
  hours: string;
  exitInfoIt: string;
  exitInfoEn: string;
  hasDinner: boolean;
  musicIt: string;
  musicEn: string;
  dressIt: string;
  dressEn: string;
  taglineByLoc: Partial<Record<LocaleCode, string>>;
}

const NYE_VENUE_SEEDS: Readonly<Record<BergamoBresciaNyeSlug, NyeVenueSeed>> = {
  'capodanno-setai-club-bergamo': {
    slug: 'capodanno-setai-club-bergamo',
    venueName: 'Setai Club Bergamo',
    cityLabel: 'Orio al Serio, Bergamo',
    province: 'BG',
    address: 'Località Portico 21, 24050 Orio al Serio (BG)',
    hours: '20:30 – 05:00',
    exitInfoIt: 'a 4 minuti dal casello A4 Bergamo e dall’Aeroporto di Orio al Serio (BGY)',
    exitInfoEn: '4 minutes from the A4 Bergamo exit and Milan Bergamo Airport (BGY)',
    hasDinner: true,
    musicIt: 'Multisala Juice Tech-House, Commercial, Urban & Countdown Arena',
    musicEn: 'Multi-Room Juice Tech-House, Commercial, Urban & Countdown Arena',
    dressIt: 'Elegante di San Silvestro (camicia/giacca uomo, abito da sera donna)',
    dressEn: 'New Year’s Eve Smart Elegant (collared shirt/jacket for men, evening dress for women)',
    taglineByLoc: {
      it: 'Veglione Multisala, Gran Cenone & Party fino alle 05:00',
      en: 'Multi-Room Gala Dinner, Countdown & Arena Party till 05:00',
      es: 'Cena de Gala, Cotillón Multisala y Fiesta hasta las 05:00',
      fr: 'Dîner de Gala, Réveillon Multi-Salles & Soirée jusqu’à 05h00',
      de: 'Silvester-Galadinner, Multi-Room-Arena & Party bis 05:00 Uhr',
      pt: 'Ceia de Réveillon, Arena Multi-Salas e Festa até às 05:00',
    },
  },
  'capodanno-capogiro-curno-bergamo': {
    slug: 'capodanno-capogiro-curno-bergamo',
    venueName: 'Capogiro Joyclub Bergamo',
    cityLabel: 'Curno, Bergamo',
    province: 'BG',
    address: 'Via Trento 14, 24035 Curno (BG)',
    hours: '20:30 – 04:30',
    exitInfoIt: 'a 8 minuti dal casello A4 Dalmine / Bergamo lungo la SS671 con ampio parcheggio',
    exitInfoEn: '8 minutes from the A4 Dalmine / Bergamo exit with spacious adjacent parking',
    hasDinner: true,
    musicIt: 'Gran Cenone Cantato, Voice Bar Live Karaoke & Main Room House / Commercial / Revival (Target Adulto 25+)',
    musicEn: 'Singing Gala Dinner, Live Karaoke Voice Bar & Main Room House / Commercial / Revival (Adult 25+ Crowd)',
    dressIt: 'Elegante Adulto 25+ / Over 30 (abito curato, giacca consigliata)',
    dressEn: 'Polished Adult 25+ / 30+ Evening Chic (blazer/tailored attire recommended)',
    taglineByLoc: {
      it: 'Gran Cenone Cantato, Voice Bar Karaoke & Disco Adulta 25+',
      en: 'Singing Gala Dinner, Live Voice Bar & 25+ Adult Nightclub',
      es: 'Cena Cantada de Nochevieja, Voice Bar en Vivo y Club 25+',
      fr: 'Dîner Chantant du Réveillon, Voice Bar Live & Club Adulte 25+',
      de: 'Singendes Silvester-Galadinner, Live-Voice-Bar & Ü25-Club',
      pt: 'Ceia Cantada de Réveillon, Voice Bar ao Vivo e Balada 25+',
    },
  },
  'capodanno-tiky-klub-seriate-bergamo': {
    slug: 'capodanno-tiky-klub-seriate-bergamo',
    venueName: 'Tiky Klub Seriate (Bergamo)',
    cityLabel: 'Seriate, Bergamo',
    province: 'BG',
    address: 'Via Nazionale 93, 24068 Seriate (BG)',
    hours: '23:00 – 05:00',
    exitInfoIt: 'a 5 minuti dal casello A4 Seriate lungo Via Nazionale 93',
    exitInfoEn: '5 minutes from the A4 Seriate motorway exit on Via Nazionale 93',
    hasDinner: false,
    musicIt: 'House, Tech-House & Electronic Boutique Countdown Showcase (18+)',
    musicEn: 'House, Tech-House & Electronic Boutique Countdown Showcase (18+)',
    dressIt: 'Contemporary Clubwear & Total Black Elegante di Capodanno (18+)',
    dressEn: 'Contemporary All-Black & Festive Clubwear (18+)',
    taglineByLoc: {
      it: 'Countdown House & Tech-House nel Boutique Club di Seriate',
      en: 'House & Tech-House NYE Countdown Showcase in Seriate',
      es: 'Nochevieja House y Tech-House en el Boutique Club de Seriate',
      fr: 'Réveillon House & Tech-House au Boutique Club de Seriate',
      de: 'House- & Tech-House-Silvester im Boutique-Club Seriate',
      pt: 'Réveillon House e Tech-House no Boutique Club de Seriate',
    },
  },
  'capodanno-zero-club-bergamo': {
    slug: 'capodanno-zero-club-bergamo',
    venueName: 'Zero Club Bergamo Centro',
    cityLabel: 'Bergamo Centro',
    province: 'BG',
    address: 'Via Evaristo Baschenis 9, 24122 Bergamo (BG)',
    hours: '23:00 – 05:00',
    exitInfoIt: 'in pieno centro a Bergamo (Via Baschenis 9, a 7 minuti dal casello A4 Bergamo e 10 minuti dalla stazione)',
    exitInfoEn: 'in downtown Bergamo (Via Baschenis 9, 7 min from A4 Bergamo exit and 10 min from Bergamo station)',
    hasDinner: false,
    musicIt: 'Dual-Room NYE: Main Room Urban, Hits & Electronic + Club Room Privé (Tessera Associativa)',
    musicEn: 'Dual-Room NYE: Main Room Urban, Hits & Electronic + Club Room Privé (Club Membership)',
    dressIt: 'Urban & Minimal Evening Chic (tessera associativa e documento fisico obbligatori)',
    dressEn: 'Urban & Minimal Evening Chic (club membership & physical ID required)',
    taglineByLoc: {
      it: 'Veglione Dual-Room in Pieno Centro a Bergamo (Main Room + Club Room)',
      en: 'Downtown Bergamo Dual-Room NYE Party (Main Room + Club Room)',
      es: 'Nochevieja Dual-Room en el Centro de Bérgamo',
      fr: 'Réveillon Double Salle au Cœur de Bergame',
      de: 'Dual-Room-Silvesterparty im Zentrum von Bergamo',
      pt: 'Réveillon Dual-Room no Centro de Bérgamo',
    },
  },
  'capodanno-qi-clubbing-brescia': {
    slug: 'capodanno-qi-clubbing-brescia',
    venueName: 'Qi Clubbing Franciacorta',
    cityLabel: 'Erbusco, Franciacorta (Brescia)',
    province: 'BS',
    address: "Via dell'Industria 83, 25030 Erbusco (BS)",
    hours: '20:30 – 05:00',
    exitInfoIt: 'a soli 2 minuti reali dal casello autostradale A4 Rovato nel cuore della Franciacorta',
    exitInfoEn: 'just 2 minutes from the A4 Rovato motorway exit in the heart of Franciacorta',
    hasDinner: true,
    musicIt: 'Gold Edition Gourmet Dinner Show, Franciacorta DOCG Toast & Luxury Night Club House / Commercial',
    musicEn: 'Gold Edition Gourmet Dinner Show, Franciacorta DOCG Toast & Luxury Night Club House / Commercial',
    dressIt: 'Gala Glamour & Haute Couture (abito lungo/paillettes donna, smoking o completo scuro uomo)',
    dressEn: 'Gala Glamour & Evening Couture (sequins/gown for women, dark suit or tuxedo for men)',
    taglineByLoc: {
      it: 'Gold Edition Dinner Show, Bollicine Franciacorta & Luxury Club',
      en: 'Gold Edition Gourmet Dinner Show, Franciacorta Toast & Luxury Club',
      es: 'Cena de Gala Gold Edition en Franciacorta y Club de Lujo',
      fr: 'Dîner Spectacle Gold Edition en Franciacorta & Club de Luxe',
      de: 'Gold Edition Silvester-Dinner-Show in der Franciacorta & Luxus-Club',
      pt: 'Dinner Show Gold Edition em Franciacorta e Luxury Club',
    },
  },
  'capodanno-number-one-brescia': {
    slug: 'capodanno-number-one-brescia',
    venueName: 'Number One Corte Franca (Brescia)',
    cityLabel: 'Corte Franca, Franciacorta (Brescia)',
    province: 'BS',
    address: 'Via Provinciale 1/B, 25040 Corte Franca (BS)',
    hours: '22:00 – 05:00',
    exitInfoIt: 'tra Franciacorta e Lago d’Iseo (uscita A4 Rovato / Palazzolo sull’Oglio, ampio parcheggio dedicato)',
    exitInfoEn: 'between Franciacorta and Lake Iseo (A4 Rovato / Palazzolo exit, vast dedicated club parking)',
    hasDinner: false,
    musicIt: 'Multisala NYE Festival: EDM, Commercial Hits, Tech-House, Urban & Hard/90s Rooms',
    musicEn: 'Multisala NYE Festival: EDM, Commercial Hits, Tech-House, Urban & 90s/2000s Arenas',
    dressIt: 'Festive Club Chic (documento fisico originale obbligatorio all’ingresso)',
    dressEn: 'Festive Club Chic (valid physical government photo ID mandatory)',
    taglineByLoc: {
      it: 'Il Grande Festival Multisala di Capodanno in Franciacorta',
      en: 'Franciacorta’s Grand Multi-Arena New Year’s Eve Festival',
      es: 'Gran Festival Multisala de Nochevieja en Franciacorta',
      fr: 'Le Grand Festival Multi-Salles du Nouvel An en Franciacorta',
      de: 'Das Große Multi-Arena-Silvesterfestival in der Franciacorta',
      pt: 'O Grande Festival Multi-Salas de Réveillon em Franciacorta',
    },
  },
};

interface LocalePhrases {
  uponRequestBadge: string;
  priceSummaryDinner: string;
  priceSummaryClub: string;
  tierDinnerLabel: string;
  tierDinnerDesc: string;
  tierEntryLabel: string;
  tierEntryDesc: string;
  tierVipLabel: string;
  tierVipDesc: string;
  sourceNote: (venue: string, addr: string) => string;
  descTpl: (venue: string, addr: string, hours: string, music: string) => string;
  schedHeading: string;
  schedDinner: [string, string, string, string];
  schedClub: [string, string, string];
  faq1Q: (venue: string) => string;
  faq1A: (venue: string, addr: string, hours: string) => string;
  faq2Q: (venue: string) => string;
  faq2A: (venue: string) => string;
  faq3Q: (venue: string) => string;
  faq3A: (dress: string) => string;
}

const LOCALE_PHRASES_35: Readonly<Record<LocaleCode, LocalePhrases>> = (() => {
  const base6: Record<'it' | 'en' | 'es' | 'fr' | 'de' | 'pt', LocalePhrases> = {
    it: {
      uponRequestBadge: 'Su richiesta via WhatsApp',
      priceSummaryDinner: 'Gran Cenone, Dopocena & Tavoli VIP Privé: disponibilità e listino ufficiale su richiesta via WhatsApp +39 351 912 7047',
      priceSummaryClub: 'Prevendite Ingresso Countdown & Tavoli VIP Privé: disponibilità e listino ufficiale su richiesta via WhatsApp +39 351 912 7047',
      tierDinnerLabel: 'Gran Cenone di San Silvestro + Serata Club (dalle 20:30)',
      tierDinnerDesc: 'Menu completo di Capodanno con tavolo riservato, brindisi di mezzanotte e accesso diretto alla festa fino al mattino. Quotazione ufficiale aggiornata su WhatsApp.',
      tierEntryLabel: 'Ingresso Prevendita Countdown & Dopocena (dalle 23:00)',
      tierEntryDesc: 'Accesso prioritario in prevendita per il brindisi di mezzanotte e il DJ set fino all’alba. Disponibilità e release correnti via Concierge WhatsApp.',
      tierVipLabel: 'Tavolo VIP Privé / Console con Servizio Bottiglie',
      tierVipDesc: 'Ingresso salta-fila dedicato, tavolo riservato in area Privé o Balconata e credito in bottiglie premium/champagne per il tuo gruppo.',
      sourceNote: (v, a) => `Scheda ufficiale verificata per ${v} (${a}): nessun prezzo stimato o non confermato pubblicato; richiedi il listino ufficiale aggiornato e blocca tavolo o prevendita direttamente con il Concierge WhatsApp +39 351 912 7047.`,
      descTpl: (v, a, h, m) => `Festeggia il Capodanno 2027 (giovedì 31 dicembre 2026, orari ${h}) da ${v} in ${a}. Programmazione musicale e format: ${m}. Assistenza diretta per tavoli VIP Privé, cenoni e ingressi in prevendita tramite il Concierge Ufficiale Nightlife Milan su WhatsApp +39 351 912 7047 (zero costi di agenzia aggiuntivi e zero numeri telefonici intermedi).`,
      schedHeading: 'Programma Orario di San Silvestro (31 Dicembre 2026)',
      schedDinner: ['20:30 · Accoglienza & Gran Cenone di Gala', '23:00 · Apertura Ingressi Dopocena & Tavoli Privé', '00:00 · Countdown Ufficiale & Brindisi al 2027', '00:15 – 05:00 · Party e DJ Set fino all’alba'],
      schedClub: ['22:30 / 23:00 · Apertura Porte, Prevendite & Accoglienza Tavoli VIP', '00:00 · Countdown Scenografico di Mezzanotte & Brindisi 2027', '00:15 – 05:00 · Peak-Time DJ Set & Bottle Service'],
      faq1Q: (v) => `Dove si trova ${v} e quali sono gli orari di Capodanno 2027?`,
      faq1A: (v, a, h) => `${v} si trova in ${a}. Per la notte di giovedì 31 dicembre 2026 gli orari previsti sono ${h}, con comodo collegamento dall’autostrada A4 e aree parcheggio dedicate.`,
      faq2Q: (v) => `Come si prenotano tavoli VIP, cenone o prevendite per ${v}?`,
      faq2A: (v) => `Scrivi su WhatsApp al +39 351 912 7047 indicando "${v} Capodanno 2027", numero di partecipanti (uomini/donne) e formula desiderata per ricevere disponibilità e tariffe ufficiali in tempo reale.`,
      faq3Q: (v) => `Qual è il dress code richiesto a Capodanno da ${v}?`,
      faq3A: (d) => `${d}. È sempre obbligatorio esibire un documento d’identità fisico originale con foto all’ingresso.`,
    },
    en: {
      uponRequestBadge: 'Upon request via WhatsApp',
      priceSummaryDinner: 'Gala Dinner, After-Dinner Entry & VIP Privé Tables: official live rates upon request via WhatsApp +39 351 912 7047',
      priceSummaryClub: 'Countdown Pre-Sale Tickets & VIP Privé Tables: official live rates upon request via WhatsApp +39 351 912 7047',
      tierDinnerLabel: 'New Year’s Eve Gala Dinner + Club Party (from 20:30)',
      tierDinnerDesc: 'Full New Year’s Eve dinner menu with reserved table, midnight sparkling toast, and full club access till dawn. Live official quote via WhatsApp.',
      tierEntryLabel: 'Pre-Sale Countdown & After-Dinner Admission (from 23:00)',
      tierEntryDesc: 'Priority pre-sale admission for the midnight countdown toast and DJ sets until morning. Check current release tier via WhatsApp Concierge.',
      tierVipLabel: 'VIP Privé / Console Table with Bottle Service',
      tierVipDesc: 'Dedicated skip-the-line VIP reception, reserved Privé or Balcony booth, and bottle service credit for your group.',
      sourceNote: (v, a) => `Verified official listing for ${v} (${a}): zero unconfirmed or guessed prices are displayed; request the live official NYE 2027 rate card and table map via WhatsApp Concierge +39 351 912 7047.`,
      descTpl: (v, a, h, m) => `Celebrate New Year’s Eve 2027 (Thursday, December 31, 2026 · ${h}) at ${v}, ${a}. Music & format: ${m}. Direct VIP Privé table reservations, gala dinner bookings, and pre-sale access via Nightlife Milan Official WhatsApp Concierge +39 351 912 7047.`,
      schedHeading: 'New Year’s Eve Schedule (December 31, 2026)',
      schedDinner: ['20:30 · Doors Open & Served Gala Dinner', '23:00 · After-Dinner Entry & VIP Privé Check-In', '00:00 · Midnight Countdown & 2027 Sparkling Toast', '00:15 – 05:00 · Club Party & DJ Sets till Dawn'],
      schedClub: ['22:30 / 23:00 · Doors Open, Pre-Sale Entry & VIP Table Reception', '00:00 · Official Midnight Countdown & 2027 Toast', '00:15 – 05:00 · Peak-Time Arena DJ Sets & Bottle Service'],
      faq1Q: (v) => `Where is ${v} located and what are the NYE 2027 hours?`,
      faq1A: (v, a, h) => `${v} is located at ${a}. On Thursday, December 31, 2026, event hours run ${h}, easily reachable from the A4 motorway with dedicated club parking.`,
      faq2Q: (v) => `How do I book VIP tables, gala dinner, or tickets at ${v}?`,
      faq2A: (v) => `Message our Official Concierge on WhatsApp at +39 351 912 7047 with "${v} NYE 2027", your group size, and preferred formula for live availability and official rates.`,
      faq3Q: (v) => `What is the New Year’s Eve dress code at ${v}?`,
      faq3A: (d) => `${d}. A valid physical government-issued photo ID is mandatory at door security.`,
    },
    es: {
      uponRequestBadge: 'Consultar por WhatsApp',
      priceSummaryDinner: 'Cena de Gala, Entrada Cotillón y Mesas VIP Privé: tarifas oficiales por WhatsApp +39 351 912 7047',
      priceSummaryClub: 'Entradas Anticipadas y Mesas VIP Privé: tarifas oficiales en vivo por WhatsApp +39 351 912 7047',
      tierDinnerLabel: 'Cena de Gala de Nochevieja + Fiesta (desde las 20:30)',
      tierDinnerDesc: 'Menú completo de Nochevieja con mesa reservada, brindis de medianoche y acceso al club hasta el amanecer.',
      tierEntryLabel: 'Entrada Anticipada Countdown y Fiesta (desde las 23:00)',
      tierEntryDesc: 'Acceso prioritario para las campanadas de medianoche y sesiones DJ hasta la madrugada.',
      tierVipLabel: 'Mesa VIP Privé / Cabina DJ con Botellas',
      tierVipDesc: 'Entrada VIP sin cola, reservado exclusivo y crédito íntegro en botellas premium o champán.',
      sourceNote: (v, a) => `Ficha oficial verificada para ${v} (${a}): solicita la lista oficial actualizada de precios y plano de mesas VIP por WhatsApp +39 351 912 7047.`,
      descTpl: (v, a, h, m) => `Vive la Nochevieja 2027 (jueves 31 de diciembre de 2026 · ${h}) en ${v}, ${a}. Formato musical: ${m}. Reserva directa de mesas VIP Privé, cenas de gala y entradas por WhatsApp +39 351 912 7047.`,
      schedHeading: 'Horario Oficial de Nochevieja (31 de diciembre de 2026)',
      schedDinner: ['20:30 · Recepción y Cena de Gala', '23:00 · Apertura Fiesta Post-Cena y Mesas VIP', '00:00 · Cuenta Atrás y Brindis 2027', '00:15 – 05:00 · DJ Sets hasta el amanecer'],
      schedClub: ['22:30 / 23:00 · Apertura de Puertas y Recepción VIP', '00:00 · Cuenta Atrás de Medianoche y Brindis 2027', '00:15 – 05:00 · Fiesta y Servicio de Botellas VIP'],
      faq1Q: (v) => `¿Dónde está ${v} y cuál es el horario de Nochevieja 2027?`,
      faq1A: (v, a, h) => `${v} se encuentra en ${a}. El jueves 31 de diciembre de 2026 abre en horario ${h}, junto a la autopista A4 con aparcamiento.`,
      faq2Q: (v) => `¿Cómo reservar mesa VIP, cena o entrada en ${v}?`,
      faq2A: (v) => `Escribe por WhatsApp al +39 351 912 7047 indicando "${v} Nochevieja 2027", número de personas y fórmula deseada.`,
      faq3Q: (v) => `¿Cuál es el dress code de Nochevieja en ${v}?`,
      faq3A: (d) => `${d}. Documento de identidad físico original obligatorio en puerta.`,
    },
    fr: {
      uponRequestBadge: 'Sur demande via WhatsApp',
      priceSummaryDinner: 'Dîner de Gala, Soirée & Tables VIP Privé : tarifs officiels sur WhatsApp +39 351 912 7047',
      priceSummaryClub: 'Préventes Countdown & Tables VIP Privé : tarifs officiels sur WhatsApp +39 351 912 7047',
      tierDinnerLabel: 'Grand Dîner du Réveillon + Soirée Club (dès 20h30)',
      tierDinnerDesc: 'Menu complet de la Saint-Sylvestre avec table réservée, coupe de minuit et soirée dansante jusqu’à l’aube.',
      tierEntryLabel: 'Entrée Prévente Countdown & Soirée (dès 23h00)',
      tierEntryDesc: 'Accès prioritaire pour le décompte de minuit et les DJ sets jusqu’au matin.',
      tierVipLabel: 'Table Carré VIP Privé avec Bouteilles',
      tierVipDesc: 'Accueil coupe-file VIP, table réservée en espace Privé et crédit bouteilles premium/champagne.',
      sourceNote: (v, a) => `Fiche vérifiée pour ${v} (${a}) : demandez les tarifs officiels 2027 et le plan des tables VIP sur WhatsApp +39 351 912 7047.`,
      descTpl: (v, a, h, m) => `Célébrez le Nouvel An 2027 (jeudi 31 décembre 2026 · ${h}) chez ${v}, ${a}. Ambiance et musique : ${m}. Réservation directe de tables VIP, dîners et préventes via notre Concierge WhatsApp +39 351 912 7047.`,
      schedHeading: 'Programme de la Saint-Sylvestre (31 décembre 2026)',
      schedDinner: ['20h30 · Accueil & Dîner de Gala', '23h00 · Ouverture Club & Tables VIP', '00h00 · Décompte de Minuit & Toast 2027', '00h15 – 05h00 · DJ Sets jusqu’à l’aube'],
      schedClub: ['22h30 / 23h00 · Ouverture des Portes & Accueil Carré VIP', '00h00 · Compte à Rebours Officiel & Toast 2027', '00h15 – 05h00 · Soirée Club & Service Bouteilles'],
      faq1Q: (v) => `Où se situe ${v} et quels sont les horaires du Réveillon 2027 ?`,
      faq1A: (v, a, h) => `${v} est situé ${a}. Horaires du jeudi 31 décembre 2026 : ${h}, accès rapide depuis l’autoroute A4.`,
      faq2Q: (v) => `Comment réserver une table VIP ou un dîner chez ${v} ?`,
      faq2A: (v) => `Contactez notre Concierge sur WhatsApp au +39 351 912 7047 en précisant « ${v} Nouvel An 2027 » et la taille de votre groupe.`,
      faq3Q: (v) => `Quelle tenue est exigée au Nouvel An chez ${v} ?`,
      faq3A: (d) => `${d}. Pièce d’identité physique originale obligatoire à l’entrée.`,
    },
    de: {
      uponRequestBadge: 'Auf Anfrage per WhatsApp',
      priceSummaryDinner: 'Galadinner, Party-Einlass & VIP-Privé-Tische: offizielle Preise per WhatsApp +39 351 912 7047',
      priceSummaryClub: 'Silvester-Vorverkauf & VIP-Privé-Tische: offizielle Preise per WhatsApp +39 351 912 7047',
      tierDinnerLabel: 'Silvester-Galadinner + Clubnacht (ab 20:30 Uhr)',
      tierDinnerDesc: 'Komplettes Silvestermenü mit reserviertem Tisch, Mitternachtstoast und Club-Zugang bis zum Morgen.',
      tierEntryLabel: 'Vorverkauf-Ticket Countdown & Party (ab 23:00 Uhr)',
      tierEntryDesc: 'Bevorzugter Einlass für den Mitternachts-Countdown und DJ-Sets bis in die Früh.',
      tierVipLabel: 'VIP-Privé-Tisch mit Flaschenservice',
      tierVipDesc: 'Skip-the-Line-Empfang, reservierter VIP-Bereich und Flaschenguthaben für Ihre Gruppe.',
      sourceNote: (v, a) => `Geprüftes Profil für ${v} (${a}): aktuelle offizielle Silvesterpreise 2027 und VIP-Tischpläne direkt per WhatsApp +39 351 912 7047 anfragen.`,
      descTpl: (v, a, h, m) => `Feiern Sie Silvester 2027 (Donnerstag, 31. Dezember 2026 · ${h}) im ${v}, ${a}. Musik & Format: ${m}. Direkte Reservierung für VIP-Tische, Galadinner und Tickets über WhatsApp +39 351 912 7047.`,
      schedHeading: 'Silvester-Zeitplan (31. Dezember 2026)',
      schedDinner: ['20:30 · Empfang & Silvester-Galadinner', '23:00 · After-Dinner-Einlass & VIP-Check-in', '00:00 · Mitternachts-Countdown & Neujahrstoast', '00:15 – 05:00 · Clubnacht & DJ-Sets bis zum Morgen'],
      schedClub: ['22:30 / 23:00 · Einlass & VIP-Tisch-Empfang', '00:00 · Großer Mitternachts-Countdown 2027', '00:15 – 05:00 · Peak-Time DJ-Sets & Bottle-Service'],
      faq1Q: (v) => `Wo befindet sich ${v} und wie sind die Silvester-Öffnungszeiten?`,
      faq1A: (v, a, h) => `${v} liegt in ${a}. Am 31. Dezember 2026 geöffnet von ${h}, direkt an der Autobahn A4 mit Club-Parkplätzen.`,
      faq2Q: (v) => `Wie buche ich VIP-Tische oder Silvester-Tickets für ${v}?`,
      faq2A: (v) => `Schreiben Sie uns per WhatsApp unter +39 351 912 7047 mit „${v} Silvester 2027“ und Ihrer Gruppengröße.`,
      faq3Q: (v) => `Welcher Dresscode gilt an Silvester im ${v}?`,
      faq3A: (d) => `${d}. Gültiger physischer Lichtbildausweis am Einlass erforderlich.`,
    },
    pt: {
      uponRequestBadge: 'Sob consulta via WhatsApp',
      priceSummaryDinner: 'Ceia de Gala, Pista e Camarotes VIP: valores oficiais pelo WhatsApp +39 351 912 7047',
      priceSummaryClub: 'Ingressos Antecipados e Mesas VIP Privé: valores oficiais pelo WhatsApp +39 351 912 7047',
      tierDinnerLabel: 'Ceia de Gala de Réveillon + Festa (a partir das 20:30)',
      tierDinnerDesc: 'Menu completo de Ano Novo com mesa reservada, brinde da meia-noite e acesso à festa até o amanhecer.',
      tierEntryLabel: 'Ingresso Antecipado Contagem Regressiva (a partir das 23:00)',
      tierEntryDesc: 'Entrada prioritária para a virada de 2027 e DJ sets até de manhã.',
      tierVipLabel: 'Mesa VIP Privé com Serviço de Garrafas',
      tierVipDesc: 'Acesso VIP sem fila, mesa exclusiva reservada e consumação em garrafas premium/champanhe.',
      sourceNote: (v, a) => `Perfil oficial verificado para ${v} (${a}): solicite a tabela oficial atualizada de Réveillon 2027 e mapa de mesas VIP pelo WhatsApp +39 351 912 7047.`,
      descTpl: (v, a, h, m) => `Celebre o Réveillon 2027 (quinta-feira, 31 de dezembro de 2026 · ${h}) no ${v}, ${a}. Música e formato: ${m}. Reservas diretas de mesas VIP, ceia e ingressos no WhatsApp +39 351 912 7047.`,
      schedHeading: 'Programação de Réveillon (31 de dezembro de 2026)',
      schedDinner: ['20:30 · Recepção e Ceia de Gala', '23:00 · Abertura Pós-Ceia e Mesas VIP', '00:00 · Contagem Regressiva e Brinde 2027', '00:15 – 05:00 · Festa e DJ Sets até o amanhecer'],
      schedClub: ['22:30 / 23:00 · Abertura das Portas e Recepção VIP', '00:00 · Virada Oficial de Meia-Noite 2027', '00:15 – 05:00 · Pista Principal e Serviço de Garrafas'],
      faq1Q: (v) => `Onde fica o ${v} e qual o horário do Réveillon 2027?`,
      faq1A: (v, a, h) => `${v} fica em ${a}. Em 31 de dezembro de 2026 funciona das ${h}, com fácil acesso pela rodovia A4.`,
      faq2Q: (v) => `Como reservar mesa VIP ou ceia no ${v}?`,
      faq2A: (v) => `Envie mensagem no WhatsApp +39 351 912 7047 informando "${v} Réveillon 2027" e o número de convidados.`,
      faq3Q: (v) => `Qual é o traje exigido no Réveillon do ${v}?`,
      faq3A: (d) => `${d}. Documento oficial físico com foto obrigatório na entrada.`,
    },
  };

  const compact29: Record<
    Exclude<LocaleCode, 'it' | 'en' | 'es' | 'fr' | 'de' | 'pt'>,
    {
      req: string;
      nyeLabel: string;
      dinner: string;
      entry: string;
      vip: string;
      sched: string;
      whereQ: string;
      bookQ: string;
      dressQ: string;
    }
  > = {
    nl: { req: 'Op aanvraag via WhatsApp', nyeLabel: 'Oud en Nieuw 2027', dinner: 'Galadiner + Clubfeest (20:30)', entry: 'Countdown Entreeticket (23:00)', vip: 'VIP Privé-Tafel met Flessenservice', sched: 'Programma 31 december 2026', whereQ: 'Waar ligt deze club en wat zijn de tijden?', bookQ: 'Hoe boek ik een VIP-tafel of diner?', dressQ: 'Wat is de dresscode voor Oud en Nieuw?' },
    ru: { req: 'По запросу в WhatsApp', nyeLabel: 'Новый год 2027', dinner: 'Гала-ужин + Клубная ночь (20:30)', entry: 'Входной билет на Новый год (23:00)', vip: 'VIP-стол Privé с бутылками', sched: 'Программа вечера 31 декабря 2026', whereQ: 'Где находится клуб и время работы 31 декабря?', bookQ: 'Как забронировать VIP-стол или ужин?', dressQ: 'Какой дресс-код в новогоднюю ночь?' },
    tr: { req: 'WhatsApp ile sorunuz', nyeLabel: 'Yılbaşı 2027', dinner: 'Yılbaşı Gala Yemeği + Kulüp (20:30)', entry: 'Yılbaşı Parti Girişi (23:00)', vip: 'Şişe Servisli VIP Privé Masa', sched: '31 Aralık 2026 Yılbaşı Programı', whereQ: 'Mekan nerede ve yılbaşı saatleri nedir?', bookQ: 'VIP masa veya gala yemeği nasıl rezerve edilir?', dressQ: 'Yılbaşı kıyafet kodu nedir?' },
    zh: { req: '通过 WhatsApp 咨询', nyeLabel: '2027 跨年之夜', dinner: '跨年晚宴 + 派对通票 (20:30)', entry: '午夜倒计时预售票 (23:00)', vip: 'VIP 尊享卡座与香槟酒水套餐', sched: '2026年12月31日跨年日程', whereQ: '俱乐部地址及跨年夜营业时间？', bookQ: '如何预订 VIP 卡座或跨年晚宴？', dressQ: '跨年夜着装要求是什么？' },
    ar: { req: 'عند الطلب عبر واتساب', nyeLabel: 'رأس السنة 2027', dinner: 'عشاء الغالا + سهرة النادي (20:30)', entry: 'تذكرة العد التنازلي والسهرة (23:00)', vip: 'طاولة VIP Privé مع خدمة الزجاجات', sched: 'برنامج ليلة 31 ديسمبر 2026', whereQ: 'أين يقع النادي وما هي ساعات رأس السنة؟', bookQ: 'كيف أحجز طاولة VIP أو عشاء الغالا؟', dressQ: 'ما هو الزي المطلوب ليلة رأس السنة؟' },
    bg: { req: 'По запитване в WhatsApp', nyeLabel: 'Нова година 2027', dinner: 'Новогодишна гала вечеря + Парти (20:30)', entry: 'Вход за новогодишното парти (23:00)', vip: 'VIP Privé маса с бутилки', sched: 'Програма за 31 декември 2026', whereQ: 'Къде се намира клубът и работно време?', bookQ: 'Как да резервирам VIP маса?', dressQ: 'Какъв е дрес кодът за Нова година?' },
    hr: { req: 'Na upit putem WhatsAppa', nyeLabel: 'Doček Nove godine 2027', dinner: 'Svečana večera + Party (20:30)', entry: 'Ulaznica za doček (23:00)', vip: 'VIP Privé stol s bocama', sched: 'Program 31. prosinca 2026.', whereQ: 'Gdje se nalazi klub i koje je radno vrijeme?', bookQ: 'Kako rezervirati VIP stol ili večeru?', dressQ: 'Koji je dress code za Novu godinu?' },
    cs: { req: 'Na vyžádání přes WhatsApp', nyeLabel: 'Silvestr 2027', dinner: 'Silvestrovská galavečeře + Party (20:30)', entry: 'Silvestrovský vstup (23:00)', vip: 'VIP Privé stůl s lahvemi', sched: 'Program 31. prosince 2026', whereQ: 'Kde se klub nachází a jaká je otevírací doba?', bookQ: 'Jak rezervovat VIP stůl nebo večeři?', dressQ: 'Jaký platí silvestrovský dress code?' },
    da: { req: 'På forespørgsel via WhatsApp', nyeLabel: 'Nytårsaften 2027', dinner: 'Gallamiddag + Natklub (20:30)', entry: 'Nytårs-entrébillet (23:00)', vip: 'VIP Privé-bord med flaskeservice', sched: 'Program 31. december 2026', whereQ: 'Hvor ligger klubben og åbningstider?', bookQ: 'Hvordan booker jeg VIP-bord?', dressQ: 'Hvad er dresscoden nytårsaften?' },
    et: { req: 'Päringu alusel WhatsAppis', nyeLabel: 'Aastavahetus 2027', dinner: 'Pidulik õhtusöök + Klubi (20:30)', entry: 'Aastavahetuse pilet (23:00)', vip: 'VIP Privé laud pudelitega', sched: '31. detsembri 2026 ajakava', whereQ: 'Kus klubi asub ja mis on lahtiolekuajad?', bookQ: 'Kuidas broneerida VIP-laud?', dressQ: 'Milline on aastavahetuse riietusstiil?' },
    fi: { req: 'Kysy WhatsAppissa', nyeLabel: 'Uusivuosi 2027', dinner: 'Gaalaillallinen + Yökerho (20:30)', entry: 'Uudenvuoden sisäänpääsy (23:00)', vip: 'VIP Privé -pöytä pullopalvelulla', sched: 'Ohjelma 31.12.2026', whereQ: 'Missä klubi sijaitsee ja aukioloajat?', bookQ: 'Miten varaan VIP-pöydän?', dressQ: 'Mikä on uudenvuoden pukukoodi?' },
    el: { req: 'Κατόπιν αιτήματος στο WhatsApp', nyeLabel: 'Πρωτοχρονιά 2027', dinner: 'Ρεβεγιόν Δείπνο + Κλαμπ (20:30)', entry: 'Είσοδος Πρωτοχρονιάς (23:00)', vip: 'Τραπέζι VIP Privé με φιάλες', sched: 'Πρόγραμμα 31 Δεκεμβρίου 2026', whereQ: 'Πού βρίσκεται το κλαμπ και ωράριο;', bookQ: 'Πώς κάνω κράτηση VIP τραπεζιού;', dressQ: 'Ποιο είναι το dress code;' },
    hu: { req: 'Érdeklődés WhatsAppon', nyeLabel: 'Szilveszter 2027', dinner: 'Szilveszteri gálavacsora + Party (20:30)', entry: 'Szilveszteri belépő (23:00)', vip: 'VIP Privé asztal italcsomaggal', sched: '2026. december 31. program', whereQ: 'Hol található a klub és nyitvatartás?', bookQ: 'Hogyan foglalhatok VIP asztalt?', dressQ: 'Mi a szilveszteri dress code?' },
    ga: { req: 'Ar iarratas trí WhatsApp', nyeLabel: 'Oíche Chinn Bhliana 2027', dinner: 'Dinnéar Mór + Club (20:30)', entry: 'Ticéad Oíche Chinn Bhliana (23:00)', vip: 'Bord VIP Privé le Buidéil', sched: 'Clár 31 Nollaig 2026', whereQ: 'Cá bhfuil an club suite agus uaireanta?', bookQ: 'Conas bord VIP a chur in áirithe?', dressQ: 'Cén cód feistis atá i bhfeidhm?' },
    lv: { req: 'Pēc pieprasījuma WhatsApp', nyeLabel: 'Jaunais gads 2027', dinner: 'Svētku vakariņas + Klubs (20:30)', entry: 'Vecgada ieejas biļete (23:00)', vip: 'VIP Privé galdiņš ar pudelēm', sched: '2026. gada 31. decembra programma', whereQ: 'Kur atrodas klubs un darba laiks?', bookQ: 'Kā rezervēt VIP galdiņu?', dressQ: 'Kāds ir Jaungada dress-kods?' },
    lt: { req: 'Pagal užklausą per WhatsApp', nyeLabel: 'Naujieji metai 2027', dinner: 'Šventinė vakarienė + Klubas (20:30)', entry: 'Naujametinis įėjimas (23:00)', vip: 'VIP Privé staliukas su gėrimais', sched: '2026 m. gruodžio 31 d. programa', whereQ: 'Kur yra klubas ir darbo laikas?', bookQ: 'Kaip rezervuoti VIP staliuką?', dressQ: 'Koks Naujųjų metų aprangos kodas?' },
    mt: { req: 'Fuq talba permezz ta’ WhatsApp', nyeLabel: 'Ewwel tas-Sena 2027', dinner: 'Ikla Gala + Klabb (20:30)', entry: 'Biljett tad-Dħul (23:00)', vip: 'Mejda VIP Privé bil-Fliexken', sched: 'Programm 31 ta’ Diċembru 2026', whereQ: 'Fejn jinsab il-klabb u l-ħinijiet?', bookQ: 'Kif nibbukkja mejda VIP?', dressQ: 'X’inhu d-dress code?' },
    pl: { req: 'Na zapytanie przez WhatsApp', nyeLabel: 'Sylwester 2027', dinner: 'Kolacja Sylwestrowa + Klub (20:30)', entry: 'Wejściówka Sylwestrowa (23:00)', vip: 'Stolik VIP Privé z Butelkami', sched: 'Harmonogram 31 grudnia 2026', whereQ: 'Gdzie znajduje się klub i godziny otwarcia?', bookQ: 'Jak zarezerwować stolik VIP lub kolację?', dressQ: 'Jaki obowiązuje dress code sylwestrowy?' },
    ro: { req: 'La cerere pe WhatsApp', nyeLabel: 'Revelion 2027', dinner: 'Cină Festivă de Revelion + Club (20:30)', entry: 'Bilet Intrare Revelion (23:00)', vip: 'Masă VIP Privé cu Sticle', sched: 'Program 31 decembrie 2026', whereQ: 'Unde se află clubul și care este programul?', bookQ: 'Cum rezerv o masă VIP sau cina?', dressQ: 'Care este ținuta obligatorie de Revelion?' },
    sk: { req: 'Na vyžiadanie cez WhatsApp', nyeLabel: 'Silvester 2027', dinner: 'Silvestrovská galavečera + Klub (20:30)', entry: 'Silvestrovský vstup (23:00)', vip: 'VIP Privé stôl s fľašami', sched: 'Program 31. decembra 2026', whereQ: 'Kde sa klub nachádza a otváracie hodiny?', bookQ: 'Ako rezervovať VIP stôl?', dressQ: 'Aký je silvestrovský dress code?' },
    sl: { req: 'Po povpraševanju prek WhatsAppa', nyeLabel: 'Silvestrovanje 2027', dinner: 'Silvestrska večerja + Klub (20:30)', entry: 'Silvestrska vstopnica (23:00)', vip: 'VIP Privé miza s steklenicami', sched: 'Program 31. december 2026', whereQ: 'Kje je klub in obratovalni čas?', bookQ: 'Kako rezervirati VIP mizo?', dressQ: 'Kakšen je silvestrski dress code?' },
    sv: { req: 'På förfrågan via WhatsApp', nyeLabel: 'Nyårsafton 2027', dinner: 'Nyårsmiddag + Nattklubb (20:30)', entry: 'Nyårsbiljett vid tolvslaget (23:00)', vip: 'VIP Privé-bord med flaskservering', sched: 'Schema 31 december 2026', whereQ: 'Var ligger klubben och öppettider?', bookQ: 'Hur bokar jag VIP-bord?', dressQ: 'Vilken klädkod gäller på nyår?' },
    no: { req: 'På forespørsel via WhatsApp', nyeLabel: 'Nyttårsaften 2027', dinner: 'Gallamiddag + Nattklubb (20:30)', entry: 'Nyttårsbillett (23:00)', vip: 'VIP Privé-bord med flaskeservice', sched: 'Program 31. desember 2026', whereQ: 'Hvor ligger klubben og åpningstider?', bookQ: 'Hvordan bestiller jeg VIP-bord?', dressQ: 'Hva er kleskoden på nyttårsaften?' },
    is: { req: 'Eftir fyrirspurn á WhatsApp', nyeLabel: 'Gamlárskvöld 2027', dinner: 'Hátíðarkvöldverður + Klúbbur (20:30)', entry: 'Miði á miðnæturfögnuð (23:00)', vip: 'VIP Privé borð með flöskum', sched: 'Dagskrá 31. desember 2026', whereQ: 'Hvar er klúbburinn og opnunartími?', bookQ: 'Hvernig bóka ég VIP borð?', dressQ: 'Hver er klæðaburðurinn á gamlárskvöld?' },
    uk: { req: 'За запитом у WhatsApp', nyeLabel: 'Новий рік 2027', dinner: 'Гала-вечеря + Клубна ніч (20:30)', entry: 'Вхідний квиток на Новий рік (23:00)', vip: 'VIP-стіл Privé з пляшками', sched: 'Програма 31 грудня 2026', whereQ: 'Де знаходиться клуб та графік роботи?', bookQ: 'Як забронювати VIP-стіл?', dressQ: 'Який новорічний дрес-код?' },
    sq: { req: 'Me kërkesë në WhatsApp', nyeLabel: 'Viti i Ri 2027', dinner: 'Darkë Gala + Klub (20:30)', entry: 'Biletë Hyrjeje Viti i Ri (23:00)', vip: 'Tavolinë VIP Privé me Shishe', sched: 'Programi 31 Dhjetor 2026', whereQ: 'Ku ndodhet klubi dhe oraret?', bookQ: 'Si të rezervoni tavolinë VIP?', dressQ: 'Cili është kodi i veshjes?' },
    sr: { req: 'Na upit putem WhatsApp-a', nyeLabel: 'Doček Nove godine 2027', dinner: 'Svečana večera + Klub (20:30)', entry: 'Ulaznica za doček (23:00)', vip: 'VIP Privé sto sa flašama', sched: 'Program 31. decembar 2026.', whereQ: 'Gde se nalazi klub i radno vreme?', bookQ: 'Kako rezervisati VIP sto?', dressQ: 'Koji je novogodišnji dress code?' },
    bs: { req: 'Na upit putem WhatsAppa', nyeLabel: 'Doček Nove godine 2027', dinner: 'Svečana večera + Klub (20:30)', entry: 'Ulaznica za doček (23:00)', vip: 'VIP Privé sto sa bocama', sched: 'Program 31. decembar 2026.', whereQ: 'Gdje se nalazi klub i radno vrijeme?', bookQ: 'Kako rezervisati VIP sto?', dressQ: 'Koji je dress code za doček?' },
    mk: { req: 'По барање на WhatsApp', nyeLabel: 'Нова година 2027', dinner: 'Гала вечера + Клуб (20:30)', entry: 'Влезница за дочек (23:00)', vip: 'VIP Privé маса со шишиња', sched: 'Програма 31 декември 2026', whereQ: 'Каде се наоѓа клубот и работно време?', bookQ: 'Како да резервирам VIP маса?', dressQ: 'Кој е новогодишниот дрес код?' },
  };

  const out: Partial<Record<LocaleCode, LocalePhrases>> = { ...base6 };
  (Object.keys(compact29) as Array<keyof typeof compact29>).forEach((loc) => {
    const c = compact29[loc];
    out[loc] = {
      uponRequestBadge: c.req,
      priceSummaryDinner: `${c.dinner} · ${c.vip}: ${c.req} (+39 351 912 7047)`,
      priceSummaryClub: `${c.entry} · ${c.vip}: ${c.req} (+39 351 912 7047)`,
      tierDinnerLabel: c.dinner,
      tierDinnerDesc: `${c.nyeLabel} · ${c.req} · WhatsApp +39 351 912 7047.`,
      tierEntryLabel: c.entry,
      tierEntryDesc: `${c.nyeLabel} · ${c.req} · WhatsApp +39 351 912 7047.`,
      tierVipLabel: c.vip,
      tierVipDesc: `${c.nyeLabel} VIP Privé · WhatsApp +39 351 912 7047.`,
      sourceNote: (v, a) => `${v} (${a}) · ${c.nyeLabel}: ${c.req} (+39 351 912 7047 · concierge@nightlifemilan.com).`,
      descTpl: (v, a, h, m) => `${c.nyeLabel} @ ${v} (${a} · ${h}). ${m}. ${c.vip} & ${c.entry}: WhatsApp +39 351 912 7047.`,
      schedHeading: c.sched,
      schedDinner: [`20:30 · ${c.dinner}`, `23:00 · ${c.entry}`, `00:00 · ${c.nyeLabel}`, `00:15 – 05:00 · ${c.vip}`],
      schedClub: [`22:30 / 23:00 · ${c.entry}`, `00:00 · ${c.nyeLabel}`, `00:15 – 05:00 · ${c.vip}`],
      faq1Q: (v) => `${v} - ${c.whereQ}`,
      faq1A: (v, a, h) => `${v}: ${a} (31/12/2026 · ${h} · Autostrada A4).`,
      faq2Q: (v) => `${v} - ${c.bookQ}`,
      faq2A: (v) => `${v} (${c.nyeLabel}): WhatsApp +39 351 912 7047 · concierge@nightlifemilan.com.`,
      faq3Q: (v) => `${v} - ${c.dressQ}`,
      faq3A: (d) => `${d} (ID required).`,
    };
  });
  return out as Readonly<Record<LocaleCode, LocalePhrases>>;
})();

export function getBergamoBresciaNyeContent(
  slug: string,
  rawLocale: string,
): CapodannoLocalizedEventContent | null {
  const seed = NYE_VENUE_SEEDS[slug as BergamoBresciaNyeSlug];
  if (!seed) return null;

  const loc = (LOCALE_PHRASES_35[rawLocale as LocaleCode] ? rawLocale : 'en') as LocaleCode;
  const p = LOCALE_PHRASES_35[loc];
  const nav = capodannoNavigation(loc);
  const music = loc === 'it' ? seed.musicIt : seed.musicEn;
  const dress = loc === 'it' ? seed.dressIt : seed.dressEn;
  const tagline = seed.taglineByLoc[loc] || (seed.hasDinner ? `${p.tierDinnerLabel} & ${p.tierVipLabel}` : `${p.tierEntryLabel} & ${p.tierVipLabel}`);

  const title =
    loc === 'it'
      ? `Capodanno ${seed.venueName} 2027 · ${tagline}`
      : loc === 'en'
        ? `${seed.venueName} New Year’s Eve 2027 · ${tagline}`
        : `${nav.menuLabel} 2027 ${seed.venueName} (${seed.cityLabel}) · ${tagline}`;

  const subtitle = `${seed.venueName} · ${seed.address} · 31/12/2026 (${seed.hours})`;

  const tiers = [
    ...(seed.hasDinner
      ? [
          {
            label: p.tierDinnerLabel,
            price: p.uponRequestBadge,
            details: p.tierDinnerDesc,
          },
        ]
      : []),
    {
      label: p.tierEntryLabel,
      price: p.uponRequestBadge,
      details: p.tierEntryDesc,
    },
    {
      label: p.tierVipLabel,
      price: p.uponRequestBadge,
      details: p.tierVipDesc,
    },
  ];

  const scheduleSteps = seed.hasDinner
    ? p.schedDinner.map((row) => {
        const [time, ...rest] = row.split(' · ');
        return { time, label: rest.join(' · ') };
      })
    : p.schedClub.map((row) => {
        const [time, ...rest] = row.split(' · ');
        return { time, label: rest.join(' · ') };
      });

  return {
    title,
    subtitle,
    description: p.descTpl(seed.venueName, seed.address, seed.hours, music),
    musicAndFormat: music,
    dressCode: dress,
    priceSummary: seed.hasDinner ? p.priceSummaryDinner : p.priceSummaryClub,
    tiers,
    highlights: [
      `${seed.venueName} · ${seed.address}`,
      `31/12/2026: ${seed.hours} (${loc === 'it' ? seed.exitInfoIt : seed.exitInfoEn})`,
      music,
      `WhatsApp Concierge: +39 351 912 7047`,
    ],
    sourceBasis: p.sourceNote(seed.venueName, seed.address),
    scheduleHeading: p.schedHeading,
    schedule: scheduleSteps,
    customFaqs: [
      { q: p.faq1Q(seed.venueName), a: p.faq1A(seed.venueName, seed.address, seed.hours) },
      { q: p.faq2Q(seed.venueName), a: p.faq2A(seed.venueName) },
      { q: p.faq3Q(seed.venueName), a: p.faq3A(dress) },
    ],
  };
}
