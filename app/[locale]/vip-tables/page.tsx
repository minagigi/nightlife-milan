import EditorialPageSections from '@/components/EditorialPageSections';
import type { LocaleCode } from '@/lib/i18n/locales';
import type { Metadata } from 'next';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import TableConcierge from '@/components/TableConcierge';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { SITE_CONTACT } from '@/config/contact';
import { getLocaleDef, hreflangAlternates, canonicalPageUrl, isEnabledLocale, localePrefix } from '@/lib/i18n/locales';
import { notFound } from 'next/navigation';
import { seoRobots, seoTitle, withWhatsApp } from '@/lib/seoMetadata';
import { getHubSeoMeta35 } from '@/lib/i18n/hubSeoMeta35';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { getDateSensitiveCarouselInventory } from '@/lib/dateSensitiveInventory';
import { selectPriorityVenueEvents } from '@/lib/priorityVenueEvents';
import { getTableConciergeLead, getTableConciergeSharedCopy } from '@/lib/tableConciergePageCopy';
import { venuesData } from '@/lib/venuesData';
import { getLocalizedText } from '@/lib/seo';

export const revalidate = 3600;

const baseUrl = process.env.APP_URL || 'https://nightlifemilan.com';

type PageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  answerLabel: string;
  answer: string;
  cta: string;
  responseNote: string;
  tiersEyebrow: string;
  tiersTitle: string;
  tiers: ReadonlyArray<{
    badge: string;
    name: string;
    price: string;
    passes: string;
    detail: string;
  }>;
  matrixEyebrow: string;
  matrixTitle: string;
  matrixSub: string;
  colClub: string;
  colDancefloor: string;
  colPrive: string;
  colConsole: string;
  colAction: string;
  factorsEyebrow: string;
  factorsTitle: string;
  factorsLead: string;
  factors: string[];
  stepsEyebrow: string;
  stepsTitle: string;
  steps: Array<{ title: string; description: string }>;
  notice: string;
  finalEyebrow: string;
  finalTitle: string;
  finalText: string;
  clubsLink: string;
};

const VIP_TITLE_BY_LOCALE: Record<LocaleCode, string> = {
  en: 'Milan VIP Tables, Privé Zones & Bottle Service Guide 2026/2027',
  it: 'Tavoli VIP, Privé e Bottle Service nelle Discoteche di Milano 2026/2027',
  es: 'Mesas VIP, Zonas Privé y Bottle Service en Milán 2026/2027',
  fr: 'Tables VIP, Carrés Privé et Bottle Service à Milan 2026/2027',
  de: 'VIP-Tische, Privé-Bereiche & Bottle Service in Mailand 2026/2027',
  pt: 'Mesas VIP, Áreas Privé e Bottle Service em Milão 2026/2027',
  nl: 'VIP-Tafels, Privé-Zones & Bottle Service in Milaan 2026/2027',
  ru: 'VIP-столы, зоны Privé и Bottle Service в клубах Милана 2026/2027',
  tr: 'Milano Gece Kulüplerinde VIP Masalar, Privé ve Şişe Servisi 2026/2027',
  zh: '米兰夜店 VIP 卡座、私享包厢与开瓶指南 2026/2027',
  ar: 'طاولات VIP ومناطق Privé وخدمة الزجاجات في ميلانو 2026/2027',
  bg: 'VIP маси, Privé зони и Bottle Service в клубовете на Милано 2026/2027',
  hr: 'VIP stolovi, Privé zone i Bottle Service u klubovima Milana 2026/2027',
  cs: 'VIP stoly, zóny Privé a Bottle Service v klubech v Miláně 2026/2027',
  da: 'VIP-borde, Privé-zoner & Bottle Service i Milano 2026/2027',
  et: 'Milano ööklubide VIP-lauad, Privé-alad ja pudeliteenus 2026/2027',
  fi: 'Milanon yökerhojen VIP-pöydät, Privé-alueet ja pullopalvelu 2026/2027',
  el: 'VIP Τραπέζια, Ζώνες Privé & Bottle Service στο Μιλάνο 2026/2027',
  hu: 'VIP asztalok, Privé zónák és Bottle Service Milánóban 2026/2027',
  ga: 'Táblaí VIP, Criosanna Privé & Seirbhís Buidéal i Milano 2026/2027',
  lv: 'VIP galdiņi, Privé zonas un pudeļu serviss Milānā 2026/2027',
  lt: 'VIP staliukai, Privé zonos ir butelių aptarnavimas Milane 2026/2027',
  mt: 'Imwejjed VIP, Żoni Privé u Bottle Service f’Milan 2026/2027',
  pl: 'Stoliki VIP, strefy Privé i Bottle Service w Mediolanie 2026/2027',
  ro: 'Mese VIP, Zone Privé și Bottle Service în Cluburile din Milano 2026/2027',
  sk: 'VIP stoly, zóny Privé a Bottle Service v kluboch v Miláne 2026/2027',
  sl: 'VIP mize, Privé cone in Bottle Service v klubih v Milanu 2026/2027',
  sv: 'VIP-bord, Privé-zoner & Bottle Service i Milano 2026/2027',
  no: 'VIP-bord, Privé-soner & Bottle Service i Milano 2026/2027',
  is: 'VIP-borð, Privé-svæði & flöskuþjónusta í Mílanó 2026/2027',
  uk: 'VIP-столи, зони Privé та Bottle Service у клубах Мілана 2026/2027',
  sq: 'Tavolina VIP, Zona Privé & Bottle Service në Klubet e Milanos 2026/2027',
  sr: 'VIP stolovi, Privé zone i Bottle Service u klubovima Milana 2026/2027',
  bs: 'VIP stolovi, Privé zone i Bottle Service u klubovima Milana 2026/2027',
  mk: 'ВИП маси, Privé зони и Bottle Service во клубовите во Милано 2026/2027',
};

const CORE_COPY: Record<'en' | 'it' | 'es' | 'fr' | 'de' | 'pt', PageCopy> = {
  en: {
    metaTitle: 'VIP Tables Milan 2026/2027 | Club Privé & Bottle Prices',
    metaDescription: 'Compare VIP table prices in Milan clubs (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic): €250-€5,000+ 100% bottle credit & fast-track entry.',
    eyebrow: 'OFFICIAL VIP CONCIERGE · 100% BOTTLE CREDIT · ZERO AGENCY FEES',
    title: VIP_TITLE_BY_LOCALE.en,
    lead: 'Compare Dancefloor, Privé, and DJ Console minimum spends across Milan’s top nightclubs. 100% of your table spend goes toward bottles, with priority VIP Host entry and zero concierge markup.',
    answerLabel: 'DIRECT ANSWER · HOW VIP TABLES WORK IN MILAN',
    answer: 'Every VIP Table in Milan operates on a 100% Bottle Credit (Minimum Spend) formula: Dancefloor tables start at €250-€400 (5-6 passes included), Privé tables run €500-€1,000 (8-10 passes), and Super Privé / DJ Console tables start at €1,200-€5,000+ (10-15 passes), with skip-the-line VIP Host entry via WhatsApp +39 351 912 7047.',
    cta: 'Choose Club & Book VIP Table',
    responseNote: 'Reply in under 10 minutes · Official club prices · Payment at the club',
    tiersEyebrow: 'N° 01 · THREE VIP FORMULAS',
    tiersTitle: '100% Bottle Credit Across Three Table Tiers',
    tiers: [
      { badge: 'TIER 01 · DANCEFLOOR', name: 'Pista / Main Room', price: '€250 - €400', passes: '5-6 VIP Passes included', detail: 'Right beside the main dancefloor energy. Ideal for birthdays and groups of 4-6 guests with 1-2 premium spirit or champagne bottles.' },
      { badge: 'TIER 02 · PRIVÉ', name: 'Elevated VIP Privé', price: '€500 - €1,000', passes: '8-10 VIP Passes included', detail: 'Raised private banquette overlooking the room, dedicated waiter service, mixers, and custom bottle presentation.' },
      { badge: 'TIER 03 · SUPER PRIVÉ', name: 'DJ Console & Backstage', price: '€1,200 - €5,000+', passes: '10-15 VIP Passes included', detail: 'Steps from the international guest DJ booth. Designed for magnum champagne formats, corporate hospitality, and Fashion Week.' },
    ],
    matrixEyebrow: 'N° 02 · PRIORITY SIX BENCHMARK LIST',
    matrixTitle: 'VIP Table Minimum Spend at Milan’s 6 Flagship Clubs',
    matrixSub: 'Indicative 2026/2027 weekend ranges (100% redeemable in bottles from the club menu). Exact quote confirmed per date on WhatsApp.',
    colClub: 'Club & District',
    colDancefloor: 'Dancefloor (5-6 pax)',
    colPrive: 'VIP Privé (8-10 pax)',
    colConsole: 'Console / Super Privé',
    colAction: 'Profile',
    factorsEyebrow: 'N° 03 · INCLUDED WITH YOUR RESERVATION',
    factorsTitle: 'What Every Confirmed VIP Table Includes',
    factorsLead: 'Direct coordination with the club’s VIP Host desk from booking to table seating.',
    factors: [
      'Dedicated Skip-the-Line VIP Host lane at the entrance (zero general queue)',
      '100% of minimum spend converted into spirits and champagne from the official bottle list',
      'VIP entry passes included according to tier (5-6 Dancefloor, 8-10 Privé, 10-15 Console)',
      'Guaranteed group entry (recommended solution for groups of 4+ men)',
      'Complimentary soft drinks, tonic waters, ice buckets, and table service',
      'Written WhatsApp summary with arrival window, dress code, and table zone before you go',
    ],
    stepsEyebrow: 'N° 04 · FAST-TRACK PROTOCOL',
    stepsTitle: 'Book Your VIP Table in 3 Steps',
    steps: [
      { title: 'Select club, date & group size', description: 'Use the instant configurator above or message +39 351 912 7047 with male/female count and preferred zone.' },
      { title: 'Receive floor map & bottle list', description: 'Within 10 minutes we send live table availability, exact minimum spend for that night, and the official bottle menu.' },
      { title: 'Walk straight to the VIP Host desk', description: 'Arrive with smart dress code, give your reservation name at the VIP door, and pay directly at the club.' },
    ],
    notice: 'Minimum spends vary on special guest DJ nights, Fashion Week, Design Week, Monza F1, and New Year’s Eve. Final table placement and door selection remain under the club’s authority.',
    finalEyebrow: '7/7 CONCIERGE DESK',
    finalTitle: 'Ready to Lock In Your Table?',
    finalText: 'Send your date, group size, and preferred vibe on WhatsApp for an immediate comparison across Milan’s best clubs.',
    clubsLink: 'Explore all 20 Milan clubs',
  },
  it: {
    metaTitle: 'Tavoli VIP Discoteche Milano 2026/2027 | Prezzi Privé & Bottiglie',
    metaDescription: 'Prezzi tavoli VIP nei migliori club di Milano (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic): da 250 € a 5.000+ € in 100% credito bottiglie.',
    eyebrow: 'CONCIERGE UFFICIALE · 100% CREDITO BOTTIGLIE · ZERO COMMISSIONI',
    title: VIP_TITLE_BY_LOCALE.it,
    lead: 'Confronta i minimum spend di Pista, Privé e Console DJ nei club di riferimento di Milano. Il 100% dell’importo diventa credito bottiglie al tavolo, con ingresso salta-fila VIP Host e zero costi di agenzia.',
    answerLabel: 'RISPOSTA IMMEDIATA · COME FUNZIONANO I TAVOLI VIP A MILANO',
    answer: 'Tutti i Tavoli VIP nelle discoteche di Milano funzionano con formula 100% Credito Bottiglie (Minimum Spend): i tavoli Pista partono da 250-400 € (5-6 pass inclusi), i tavoli Privé da 500-1.000 € (8-10 pass) e i tavoli Super Privé / Console DJ da 1.200-5.000+ € (10-15 pass), con ingresso prioritario salta-fila tramite WhatsApp +39 351 912 7047.',
    cta: 'Scegli Club e Prenota Tavolo VIP',
    responseNote: 'Risposta entro 10 minuti · Prezzi ufficiali del locale · Pagamento al club',
    tiersEyebrow: 'N° 01 · LE TRE FASCE TAVOLO',
    tiersTitle: '100% Credito Bottiglie su Tre Livelli di Posizione',
    tiers: [
      { badge: 'FASCIA 01 · PISTA', name: 'Tavolo Pista / Main Room', price: '250 € - 400 €', passes: '5-6 Pass VIP inclusi', detail: 'A bordo pista nel cuore dell’energia del club. Ideale per compleanni e gruppi di 4-6 persone con 1-2 bottiglie premium o champagne.' },
      { badge: 'FASCIA 02 · PRIVÉ', name: 'Tavolo Privé Rialzato', price: '500 € - 1.000 €', passes: '8-10 Pass VIP inclusi', detail: 'Divanetto riservato in area rialzata con vista sulla sala, cameriere dedicato, soft drink inclusi e servizio bottle show.' },
      { badge: 'FASCIA 03 · SUPER PRIVÉ', name: 'Console DJ & Backstage', price: '1.200 € - 5.000+ €', passes: '10-15 Pass VIP inclusi', detail: 'A pochi passi dalla console dei guest DJ internazionali. Pensato per formati Magnum/Jeroboam, clienti corporate e Fashion Week.' },
    ],
    matrixEyebrow: 'N° 02 · LISTINO UFFICIALE TOP 6 CLUB',
    matrixTitle: 'Minimum Spend Tavoli VIP nei 6 Club Prioritari di Milano',
    matrixSub: 'Fasce indicative weekend 2026/2027 (100% spendibili in bottiglie da listino). Disponibilità e cifra esatta per data confermate su WhatsApp.',
    colClub: 'Locale & Quartiere',
    colDancefloor: 'Tavolo Pista (5-6 pax)',
    colPrive: 'Privé VIP (8-10 pax)',
    colConsole: 'Console / Super Privé',
    colAction: 'Scheda',
    factorsEyebrow: 'N° 03 · COSA INCLUDE IL TAVOLO VIP',
    factorsTitle: 'Tutti i Vantaggi della Prenotazione Ufficiale',
    factorsLead: 'Coordinamento diretto con il desk VIP Host del locale dall’arrivo fino al tavolo.',
    factors: [
      'Corsia prioritaria salta-fila VIP Host dedicata all’ingresso (zero coda ordinaria)',
      '100% del minimum spend convertito in distillati e champagne dal listino ufficiale',
      'Pass d’ingresso inclusi in base alla posizione (5-6 Pista, 8-10 Privé, 10-15 Console)',
      'Accesso agevolato per gruppi numerosi o gruppi di soli uomini (4+ ospiti)',
      'Servizio al tavolo con ghiaccio, toniche, soft drink e caraffe inclusi',
      'Riepilogo scritto su WhatsApp con orario limite, dress code e mappa posizione prima della serata',
    ],
    stepsEyebrow: 'N° 04 · PRENOTAZIONE IN 3 PASSI',
    stepsTitle: 'Come Bloccare il Tuo Tavolo in Meno di 10 Minuti',
    steps: [
      { title: 'Indica locale, data e gruppo', description: 'Compila il configuratore rapido qui sopra o scrivi al +39 351 912 7047 indicando numero di uomini/donne e zona preferita.' },
      { title: 'Ricevi mappa e listino bottiglie', description: 'Entro 10 minuti ricevi disponibilità reale per la data, minimum spend esatto e carta delle bottiglie del club.' },
      { title: 'Entra dalla corsia VIP Host', description: 'Presentati con dress code curato, comunica il nome del tavolo alla porta VIP e salda direttamente alla cassa del locale.' },
    ],
    notice: 'I minimum spend possono variare in occasione di special guest internazionali, Fashion Week, Fuorisalone, GP Monza e Capodanno. Posizione finale del tavolo e selezione all’ingresso restano di competenza della direzione del club.',
    finalEyebrow: 'DESK CONCIERGE ATTIVO 7/7',
    finalTitle: 'Pronto a Riservare il Tuo Privé?',
    finalText: 'Scrivici data, numero di ospiti e stile musicale su WhatsApp per ricevere subito il confronto tra i migliori tavoli disponibili.',
    clubsLink: 'Esplora tutti i 20 club di Milano',
  },
  es: {
    metaTitle: 'Mesas VIP Discotecas Milán 2026/2027 | Precios Privé y Botellas',
    metaDescription: 'Precios de mesas VIP en los mejores clubes de Milán (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic): 250 € a 5.000+ € en 100% crédito de botellas.',
    eyebrow: 'CONCIERGE OFICIAL · 100% CRÉDITO EN BOTELLAS · CERO COMISIONES',
    title: VIP_TITLE_BY_LOCALE.es,
    lead: 'Compara los consumos mínimos de Pista, Privé y Cabina DJ en los mejores clubes de Milán. El 100% del importe se canjea en botellas, con entrada sin cola VIP Host y sin recargos de agencia.',
    answerLabel: 'RESPUESTA DIRECTA · CÓMO FUNCIONAN LAS MESAS VIP EN MILÁN',
    answer: 'Todas las Mesas VIP en Milán funcionan con 100% Crédito en Botellas (Consumo Mínimo): mesas en Pista desde 250-400 € (5-6 pases), Privé desde 500-1.000 € (8-10 pases) y Super Privé / Cabina DJ desde 1.200-5.000+ € (10-15 pases), con acceso prioritario por WhatsApp +39 351 912 7047.',
    cta: 'Elegir Club y Reservar Mesa VIP',
    responseNote: 'Respuesta en menos de 10 min · Precios oficiales · Pago en el club',
    tiersEyebrow: 'N° 01 · TRES ZONAS VIP',
    tiersTitle: '100% Crédito en Botellas en Tres Niveles de Mesa',
    tiers: [
      { badge: 'NIVEL 01 · PISTA', name: 'Pista / Main Room', price: '250 € - 400 €', passes: '5-6 Pases VIP incluidos', detail: 'Junto a la pista principal. Ideal para cumpleaños y grupos de 4-6 personas con 1-2 botellas premium o champagne.' },
      { badge: 'NIVEL 02 · PRIVÉ', name: 'Privé VIP Elevado', price: '500 € - 1.000 €', passes: '8-10 Pases VIP incluidos', detail: 'Reservado elevado con vista panorámica de la sala, camarero exclusivo, refrescos y presentación de botellas.' },
      { badge: 'NIVEL 03 · SUPER PRIVÉ', name: 'Cabina DJ & Backstage', price: '1.200 € - 5.000+ €', passes: '10-15 Pases VIP incluidos', detail: 'Al lado del DJ invitado internacional. Pensado para formatos Magnum, eventos corporativos y Fashion Week.' },
    ],
    matrixEyebrow: 'N° 02 · TARIFAS TOP 6 CLUBES',
    matrixTitle: 'Consumo Mínimo VIP en los 6 Clubes Principales de Milán',
    matrixSub: 'Tarifas orientativas de fin de semana 2026/2027 (100% crédito en botellas). Presupuesto exacto por fecha vía WhatsApp.',
    colClub: 'Club y Zona',
    colDancefloor: 'Pista (5-6 pax)',
    colPrive: 'Privé VIP (8-10 pax)',
    colConsole: 'Cabina DJ / Super Privé',
    colAction: 'Ficha',
    factorsEyebrow: 'N° 03 · QUÉ INCLUYE TU MESA',
    factorsTitle: 'Ventajas Incluidas en Cada Reserva VIP',
    factorsLead: 'Coordinación directa con el VIP Host del club desde la reserva hasta tu mesa.',
    factors: [
      'Acceso prioritario sin cola por la puerta VIP Host',
      '100% del consumo mínimo convertible en destilados y champagne de la carta oficial',
      'Entradas VIP incluidas según zona (5-6 Pista, 8-10 Privé, 10-15 Cabina DJ)',
      'Acceso garantizado para grupos grandes o grupos masculinos (4+ personas)',
      'Refrescos, tónicas, hielo y servicio de camarero incluidos',
      'Confirmación por WhatsApp con horario, dress code y plano de mesas antes de salir',
    ],
    stepsEyebrow: 'N° 04 · RESERVA EN 3 PASOS',
    stepsTitle: 'Reserva tu Mesa VIP en Menos de 10 Minutos',
    steps: [
      { title: 'Elige club, fecha y grupo', description: 'Usa el configurador superior o escribe al +39 351 912 7047 indicando chicos/chicas y zona preferida.' },
      { title: 'Recibe mapa y carta de botellas', description: 'En menos de 10 minutos te enviamos disponibilidad real, consumo mínimo exacto y carta oficial.' },
      { title: 'Entra directo por VIP Host', description: 'Acude con dress code elegante, indica el nombre de tu reserva en puerta VIP y abona en el club.' },
    ],
    notice: 'El consumo mínimo varía en noches con DJs internacionales, Fashion Week, Fuorisalone y Nochevieja. La ubicación final y el criterio de admisión dependen del club.',
    finalEyebrow: 'ATENCIÓN CONCIERGE 7/7',
    finalTitle: '¿Listo para Reservar tu Mesa VIP?',
    finalText: 'Envíanos fecha y número de personas por WhatsApp para comparar al instante las mejores mesas disponibles.',
    clubsLink: 'Ver los 20 clubes de Milán',
  },
  fr: {
    metaTitle: 'Tables VIP Clubs Milan 2026/2027 | Tarifs Carré Privé & Bouteilles',
    metaDescription: 'Comparez les tarifs des tables VIP à Milan (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic) : 250 € à 5 000+ € en 100% crédit bouteilles.',
    eyebrow: 'CONCIERGERIE OFFICIELLE · 100% CRÉDIT BOUTEILLES · ZÉRO FRAIS',
    title: VIP_TITLE_BY_LOCALE.fr,
    lead: 'Comparez les minimum spends Piste, Carré Privé et Console DJ dans les clubs phares de Milan. 100% du montant est converti en bouteilles, avec accès coupe-file VIP Host et zéro commission.',
    answerLabel: 'RÉPONSE DIRECTE · FONCTIONNEMENT DES TABLES VIP À MILAN',
    answer: 'Toutes les tables VIP à Milan fonctionnent en 100% Crédit Bouteilles (Minimum Spend) : tables Piste dès 250-400 € (5-6 entrées), Carré Privé 500-1 000 € (8-10 entrées) et Super Privé / Console DJ 1 200-5 000+ € (10-15 entrées), avec accueil coupe-file via WhatsApp +39 351 912 7047.',
    cta: 'Choisir un Club & Réserver Table VIP',
    responseNote: 'Réponse en moins de 10 min · Tarifs officiels · Règlement au club',
    tiersEyebrow: 'N° 01 · TROIS FORMULES VIP',
    tiersTitle: '100% Crédit Bouteilles sur Trois Niveaux d’Emplacement',
    tiers: [
      { badge: 'NIVEAU 01 · PISTE', name: 'Table Piste / Main Room', price: '250 € - 400 €', passes: '5-6 Entrées VIP incluses', detail: 'Au cœur de l’énergie du dancefloor. Idéal pour anniversaires et groupes de 4-6 personnes avec 1-2 bouteilles premium.' },
      { badge: 'NIVEAU 02 · PRIVÉ', name: 'Carré VIP Surélevé', price: '500 € - 1 000 €', passes: '8-10 Entrées VIP incluses', detail: 'Banquette privée surélevée avec vue sur la salle, serveur dédié, softs inclus et service bouteille.' },
      { badge: 'NIVEAU 03 · SUPER PRIVÉ', name: 'Console DJ & Backstage', price: '1 200 € - 5 000+ €', passes: '10-15 Entrées VIP incluses', detail: 'Au plus près du DJ international. Conçu pour les magnums de champagne, groupes corporate et Fashion Week.' },
    ],
    matrixEyebrow: 'N° 02 · GRILLE TARIFAIRE TOP 6 CLUBS',
    matrixTitle: 'Minimum Spend Tables VIP dans les 6 Clubs Phares de Milan',
    matrixSub: 'Fourchettes indicatives week-end 2026/2027 (100% crédit bouteilles). Devis exact confirmé par date sur WhatsApp.',
    colClub: 'Club & Quartier',
    colDancefloor: 'Piste (5-6 pers.)',
    colPrive: 'Carré Privé (8-10 pers.)',
    colConsole: 'Console DJ / Super Privé',
    colAction: 'Fiche',
    factorsEyebrow: 'N° 03 · CE QUI EST INCLUS',
    factorsTitle: 'Prestations Incluses dans Chaque Table VIP',
    factorsLead: 'Coordination directe avec le VIP Host du club de la réservation jusqu’à votre table.',
    factors: [
      'File prioritaire coupe-file VIP Host dédiée à l’entrée',
      '100% du minimum spend converti en spiritueux et champagnes de la carte officielle',
      'Entrées VIP incluses selon la zone (5-6 Piste, 8-10 Privé, 10-15 Console)',
      'Admission sécurisée pour les groupes nombreux ou masculins (4+ personnes)',
      'Softs, tonics, glaçons et service à table inclus',
      'Récapitulatif WhatsApp avec créneau d’arrivée, dress code et plan des tables',
    ],
    stepsEyebrow: 'N° 04 · RÉSERVATION EN 3 ÉTAPES',
    stepsTitle: 'Réservez Votre Table VIP en Moins de 10 Minutes',
    steps: [
      { title: 'Indiquez club, date et groupe', description: 'Utilisez le configurateur ci-dessus ou écrivez au +39 351 912 7047 avec parité H/F et zone souhaitée.' },
      { title: 'Recevez plan et carte des bouteilles', description: 'Sous 10 minutes nous envoyons disponibilités, minimum spend exact et carte officielle.' },
      { title: 'Accédez par l’accueil VIP Host', description: 'Présentez-vous en tenue soignée, annoncez le nom de réservation et réglez directement sur place.' },
    ],
    notice: 'Les minimum spends évoluent lors des soirées guest DJ, Fashion Week, Design Week et Nouvel An. L’emplacement définitif et l’admission restent à la discrétion du club.',
    finalEyebrow: 'CONCIERGERIE ACTIVE 7J/7',
    finalTitle: 'Prêt à Réserver Votre Carré VIP ?',
    finalText: 'Envoyez votre date et la taille du groupe sur WhatsApp pour comparer immédiatement les meilleures tables disponibles.',
    clubsLink: 'Découvrir les 20 clubs de Milan',
  },
  de: {
    metaTitle: 'VIP-Tische Mailand Clubs 2026/2027 | Privé & Flaschenpreise',
    metaDescription: 'VIP-Tisch-Preise in Mailands Top-Clubs (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic): 250 € bis 5.000+ € als 100% Flaschenguthaben.',
    eyebrow: 'OFFIZIELLER VIP-CONCIERGE · 100% FLASCHENGUTHABEN · KEINE GEBÜHREN',
    title: VIP_TITLE_BY_LOCALE.de,
    lead: 'Vergleichen Sie Mindestverzehr für Dancefloor, Privé und DJ-Konsole in Mailands führenden Clubs. 100% des Betrags gelten als Flaschenguthaben inklusive Fast-Track-Einlass.',
    answerLabel: 'DIREKTANTWORT · SO FUNKTIONIEREN VIP-TISCHE IN MAILAND',
    answer: 'Jeder VIP-Tisch in Mailand basiert auf 100% Flaschenguthaben (Mindestverzehr): Dancefloor-Tische ab 250-400 € (5-6 Pässe), Privé-Tische 500-1.000 € (8-10 Pässe) und Super-Privé / DJ-Konsole ab 1.200-5.000+ € (10-15 Pässe) mit direktem VIP-Host-Empfang über WhatsApp +39 351 912 7047.',
    cta: 'Club wählen & VIP-Tisch buchen',
    responseNote: 'Antwort in unter 10 Min. · Offizielle Clubpreise · Zahlung im Club',
    tiersEyebrow: 'N° 01 · DREI TISCHKATEGORIEN',
    tiersTitle: '100% Flaschenguthaben in Drei VIP-Bereichen',
    tiers: [
      { badge: 'STUFE 01 · DANCEFLOOR', name: 'Dancefloor / Main Room', price: '250 € - 400 €', passes: '5-6 VIP-Pässe inklusive', detail: 'Direkt an der Haupttanzfläche. Ideal für Geburtstage und Gruppen von 4-6 Gästen mit 1-2 Premium-Flaschen.' },
      { badge: 'STUFE 02 · PRIVÉ', name: 'Erhöhtes VIP-Privé', price: '500 € - 1.000 €', passes: '8-10 VIP-Pässe inklusive', detail: 'Erhöhte Lounge-Sitzgruppe mit Blick über den Club, eigenem Kellner, Mixern und Bottle-Show.' },
      { badge: 'STUFE 03 · SUPER PRIVÉ', name: 'DJ-Konsole & Backstage', price: '1.200 € - 5.000+ €', passes: '10-15 VIP-Pässe inklusive', detail: 'Direkt neben internationalen Guest-DJs. Perfekt für Magnum-Champagner, Firmenkunden und Fashion Week.' },
    ],
    matrixEyebrow: 'N° 02 · PREISÜBERSICHT TOP 6 CLUBS',
    matrixTitle: 'VIP-Mindestverzehr in Mailands 6 Wichtigsten Clubs',
    matrixSub: 'Richtwerte Wochenende 2026/2027 (100% Flaschenguthaben). Exaktes Angebot pro Datum per WhatsApp.',
    colClub: 'Club & Viertel',
    colDancefloor: 'Dancefloor (5-6 Pers.)',
    colPrive: 'VIP-Privé (8-10 Pers.)',
    colConsole: 'DJ-Konsole / Super Privé',
    colAction: 'Profil',
    factorsEyebrow: 'N° 03 · INKLUSIVLEISTUNGEN',
    factorsTitle: 'Was Jeder Bestätigte VIP-Tisch Beinhaltet',
    factorsLead: 'Direkte Abstimmung mit dem VIP-Host-Desk des jeweiligen Clubs.',
    factors: [
      'Separater Fast-Track-Zugang über den VIP-Host-Schalter ohne Warteschlange',
      '100% Anrechnung des Mindestverzehrs auf Spirituosen und Champagner der offiziellen Karte',
      'Inklusive VIP-Eintrittspässe je nach Bereich (5-6 Dancefloor, 8-10 Privé, 10-15 Konsole)',
      'Empfohlene Lösung für größere Gruppen oder reine Männergruppen (ab 4 Gästen)',
      'Softdrinks, Tonic Water, Eis und Tischservice inklusive',
      'Schriftliche WhatsApp-Übersicht mit Ankunftszeit, Dresscode und Tischplan',
    ],
    stepsEyebrow: 'N° 04 · IN 3 SCHRITTEN ZUM TISCH',
    stepsTitle: 'VIP-Reservierung in Unter 10 Minuten',
    steps: [
      { title: 'Club, Datum & Gruppe wählen', description: 'Nutzen Sie den Konfigurator oben oder senden Sie Datum und Personenanzahl an +39 351 912 7047.' },
      { title: 'Tischplan & Flaschenkarte erhalten', description: 'Innerhalb von 10 Minuten senden wir Verfügbarkeit, Mindestverzehr und die aktuelle Flaschenliste.' },
      { title: 'Direkt zum VIP-Host-Empfang', description: 'Mit gepflegtem Dresscode erscheinen, Reservierungsnamen nennen und direkt im Club bezahlen.' },
    ],
    notice: 'An Abenden mit internationalen Guest-DJs, während der Fashion Week, Design Week und an Silvester gelten Sonderkonditionen. Tischzuweisung und Einlass obliegen dem Club.',
    finalEyebrow: '7/7 CONCIERGE-DESK',
    finalTitle: 'Bereit für Ihren VIP-Tisch?',
    finalText: 'Senden Sie uns Datum und Gruppengröße per WhatsApp für einen sofortigen Vergleich der besten freien Tische.',
    clubsLink: 'Alle 20 Mailänder Clubs ansehen',
  },
  pt: {
    metaTitle: 'Mesas VIP Discotecas Milão 2026/2027 | Preços Privé e Garrafas',
    metaDescription: 'Compare preços de mesas VIP nos melhores clubes de Milão (Just Me, Pineta, Aria, 55 Milano, Voya, Repvblic): 250 € a 5.000+ € em 100% crédito.',
    eyebrow: 'CONCIERGE OFICIAL · 100% CRÉDITO EM GARRAFAS · ZERO TAXAS',
    title: VIP_TITLE_BY_LOCALE.pt,
    lead: 'Compare a consumação mínima de Pista, Privé e Cabine DJ nos principais clubes de Milão. 100% do valor vira crédito em garrafas, com entrada sem fila VIP Host e zero taxa de agência.',
    answerLabel: 'RESPOSTA DIRETA · COMO FUNCIONAM AS MESAS VIP EM MILÃO',
    answer: 'Todas as Mesas VIP em Milão funcionam com 100% Crédito em Garrafas (Consumação Mínima): mesas de Pista de 250-400 € (5-6 entradas), Privé de 500-1.000 € (8-10 entradas) e Super Privé / Cabine DJ de 1.200-5.000+ € (10-15 entradas), com acesso prioritário pelo WhatsApp +39 351 912 7047.',
    cta: 'Escolher Clube e Reservar Mesa VIP',
    responseNote: 'Resposta em até 10 min · Preços oficiais · Pagamento no clube',
    tiersEyebrow: 'N° 01 · TRÊS NÍVEIS DE MESA',
    tiersTitle: '100% Crédito em Garrafas em Três Áreas VIP',
    tiers: [
      { badge: 'NÍVEL 01 · PISTA', name: 'Mesa Pista / Main Room', price: '250 € - 400 €', passes: '5-6 Entradas VIP incluídas', detail: 'Ao lado da pista principal. Ideal para aniversários e grupos de 4-6 pessoas com 1-2 garrafas premium.' },
      { badge: 'NÍVEL 02 · PRIVÉ', name: 'Camarote Privé Elevado', price: '500 € - 1.000 €', passes: '8-10 Entradas VIP incluídas', detail: 'Sofá reservado em área elevada com vista panorâmica, garçom dedicado, mixers e bottle show.' },
      { badge: 'NÍVEL 03 · SUPER PRIVÉ', name: 'Cabine DJ & Backstage', price: '1.200 € - 5.000+ €', passes: '10-15 Entradas VIP incluídas', detail: 'Ao lado do DJ convidado internacional. Indicado para garrafas Magnum, grupos corporativos e Fashion Week.' },
    ],
    matrixEyebrow: 'N° 02 · TABELA TOP 6 CLUBES',
    matrixTitle: 'Consumação Mínima VIP nos 6 Principais Clubes de Milão',
    matrixSub: 'Valores de referência fim de semana 2026/2027 (100% revertidos em garrafas). Cotação exata por data no WhatsApp.',
    colClub: 'Clube e Bairro',
    colDancefloor: 'Pista (5-6 pax)',
    colPrive: 'Privé VIP (8-10 pax)',
    colConsole: 'Cabine DJ / Super Privé',
    colAction: 'Perfil',
    factorsEyebrow: 'N° 03 · O QUE ESTÁ INCLUÍDO',
    factorsTitle: 'Benefícios Incluídos em Cada Reserva VIP',
    factorsLead: 'Coordenação direta com o VIP Host do clube da reserva até a mesa.',
    factors: [
      'Entrada prioritária sem fila pela recepção VIP Host',
      '100% da consumação mínima convertida em destilados e champagnes do cardápio oficial',
      'Entradas VIP incluídas conforme o setor (5-6 Pista, 8-10 Privé, 10-15 Cabine)',
      'Acesso recomendado para grupos grandes ou grupos masculinos (4+ convidados)',
      'Energéticos/tônicas, refrigerantes, gelo e serviço de garçom incluídos',
      'Resumo por WhatsApp com horário de chegada, dress code e mapa de mesas',
    ],
    stepsEyebrow: 'N° 04 · RESERVA EM 3 PASSOS',
    stepsTitle: 'Garanta sua Mesa VIP em Menos de 10 Minutos',
    steps: [
      { title: 'Informe clube, data e grupo', description: 'Use o configurador acima ou envie mensagem para +39 351 912 7047 com número de homens/mulheres.' },
      { title: 'Receba mapa e carta de garrafas', description: 'Em até 10 minutos enviamos disponibilidade real, consumação mínima exata e cardápio oficial.' },
      { title: 'Entre direto pelo VIP Host', description: 'Chegue com traje elegante, informe o nome da reserva na porta VIP e pague diretamente no clube.' },
    ],
    notice: 'Os valores mínimos variam em noites com DJs internacionais, Fashion Week, Design Week e Réveillon. A posição final da mesa e a seleção de porta cabem ao clube.',
    finalEyebrow: 'ATENDIMENTO CONCIERGE 7/7',
    finalTitle: 'Pronto para Reservar seu Camarote?',
    finalText: 'Envie a data e o tamanho do grupo no WhatsApp para comparar na hora as melhores mesas disponíveis.',
    clubsLink: 'Ver todos os 20 clubes de Milão',
  },
};

const PRIORITY_VIP_MATRIX = [
  {
    id: 'v-justme',
    zoneIt: 'Parco Sempione · Torre Branca',
    zoneEn: 'Parco Sempione · Torre Branca',
    dancefloor: '€320 - €500',
    prive: '€600 - €1.000',
    console: '€1.500 - €5.000+',
  },
  {
    id: 'v-pineta',
    zoneIt: 'Porta Garibaldi · Via Messina',
    zoneEn: 'Porta Garibaldi · Via Messina',
    dancefloor: '€300 - €400',
    prive: '€500 - €800',
    console: '€1.000 - €2.500',
  },
  {
    id: 'v-aria',
    zoneIt: 'San Siro · Parco Ippodromo (150m Stadio)',
    zoneEn: 'San Siro · Hippodrome Park (150m Stadium)',
    dancefloor: '€300 - €400',
    prive: '€600 - €1.000',
    console: '€1.200 - €3.000',
  },
  {
    id: 'v-55milano',
    zoneIt: 'Sempione · Arco della Pace',
    zoneEn: 'Sempione · Arco della Pace',
    dancefloor: '€250 - €350',
    prive: '€500 - €800',
    console: '€1.000 - €2.000',
  },
  {
    id: 'v-voya',
    zoneIt: 'Portello / CityLife · 20° Piano Skyline',
    zoneEn: 'Portello / CityLife · 20th Floor Skyline',
    dancefloor: '€300 - €400',
    prive: '€500 - €900',
    console: '€1.000 - €2.500',
  },
  {
    id: 'v-repvblic',
    zoneIt: 'Piazza della Repubblica · Porta Nuova',
    zoneEn: 'Piazza della Repubblica · Porta Nuova',
    dancefloor: '€300 - €400',
    prive: '€500 - €900',
    console: '€1.200 - €2.500',
  },
] as const;

function getCopy(locale: string): PageCopy {
  if (locale === 'it' || locale === 'es' || locale === 'fr' || locale === 'de' || locale === 'pt') {
    return CORE_COPY[locale];
  }
  const code = (isEnabledLocale(locale) ? locale : 'en') as LocaleCode;
  const shared = getTableConciergeSharedCopy(code);
  const localizedTitle = VIP_TITLE_BY_LOCALE[code] || CORE_COPY.en.title;
  const localizedLead = getTableConciergeLead(code);
  return {
    ...CORE_COPY.en,
    metaTitle: localizedTitle,
    metaDescription: localizedLead,
    title: localizedTitle,
    lead: localizedLead,
    cta: shared.heroAnchorAction || shared.requestAction,
    finalTitle: shared.requestTitle,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) notFound();
  const copy = getCopy(locale);
  const canonicalUrl = canonicalPageUrl(baseUrl, locale, '/vip-tables');
  const meta35 = getHubSeoMeta35('vip-tables', locale);
  const title = seoTitle(meta35.title);
  const description = withWhatsApp(meta35.description, locale);

  return {
    title,
    description,
    robots: seoRobots(locale),
    alternates: { canonical: canonicalUrl, languages: hreflangAlternates(baseUrl, '/vip-tables') },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Nightlife Milan',
      locale: getLocaleDef(locale)?.ogLocale || 'en_US',
      images: [{
        url: `${baseUrl}/images/pillars/vip-tables-hero.webp`,
        width: 768,
        height: 1024,
        alt: copy.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/pillars/vip-tables-hero.webp`],
      site: '@nightlifemilan',
    },
  };
}

export default async function VipTablesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) notFound();
  const copy = getCopy(locale);
  const lp = localePrefix(locale);
  const canonicalUrl = canonicalPageUrl(baseUrl, locale, '/vip-tables');
  const whatsappUrl = getConciergeBookingUrl(locale, undefined, canonicalUrl);
  const stepIcons = [Send, ClipboardCheck, CheckCircle2];
  const initialNow = new Date();
  const datedEvents = selectPriorityVenueEvents(await getDateSensitiveCarouselInventory(locale), initialNow);

  const matrixRows = PRIORITY_VIP_MATRIX.map((row) => {
    const venue = venuesData.find((v) => v.id === row.id);
    const name = venue ? getLocalizedText(venue.localizedContent.name, locale) : row.id;
    const slug = venue ? getLocalizedText(venue.slugs, locale) : '';
    return {
      ...row,
      name,
      slug,
      zone: locale === 'it' ? row.zoneIt : row.zoneEn,
    };
  });

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Nightlife Milan', item: `${baseUrl}${lp || '/'}` },
          { '@type': 'ListItem', position: 2, name: copy.title, item: canonicalUrl },
        ],
      },
      {
        '@type': 'Service',
        name: copy.title,
        description: copy.answer,
        url: canonicalUrl,
        serviceType: 'VIP Nightclub Table & Bottle Service Reservation',
        areaServed: { '@type': 'City', name: 'Milan', addressCountry: 'IT' },
        provider: {
          '@type': 'Organization',
          name: 'Nightlife Milan',
          url: baseUrl,
          telephone: SITE_CONTACT.whatsapp.number,
          email: SITE_CONTACT.email,
        },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '250',
          highPrice: '5000',
          priceCurrency: 'EUR',
          offerCount: '20',
          availability: 'https://schema.org/InStock',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#F6F1E7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ── HERO COUTURE NOIR (1st Body Image == og:image) ───────────────── */}
      <section className="border-b border-[#F6F1E7]/14 px-5 pb-14 pt-20 sm:px-14 sm:pb-20 sm:pt-28">
        <div className="mx-auto max-w-[1328px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-[#EAE3D5]">
              {copy.eyebrow}
            </p>
            <h1 className="mb-5 font-serif text-4xl font-normal leading-[0.96] tracking-[-0.025em] text-[#F6F1E7] sm:text-6xl">
              {copy.title}
            </h1>
            <p className="mb-7 max-w-2xl font-sans text-base leading-relaxed text-[#C2B9AA] sm:text-lg">
              {copy.lead}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#tc-request-vip"
                className="inline-flex min-h-[48px] items-center justify-center gap-3 bg-[#25D366] px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#050505] transition-colors hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {copy.cta} ↓
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-[#EAE3D5]/50 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-[#F6F1E7] transition-colors hover:border-[#F6F1E7]"
              >
                WhatsApp {SITE_CONTACT.whatsapp.number} ↗
              </a>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#847C6F]">
              {copy.responseNote}
            </p>

            <div className="mt-8 border border-[#EAE3D5]/35 bg-[#0B0A09] p-6">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.26em] text-[#EAE3D5]">
                {copy.answerLabel}
              </p>
              <p className="font-sans text-sm leading-relaxed text-[#E4DDD0] sm:text-base">
                {copy.answer}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden border border-[#F6F1E7]/18 bg-[#0B0A09]">
              <Image
                src="/images/pillars/vip-tables-hero.webp"
                alt={copy.title}
                width={768}
                height={1024}
                quality={92}
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WARM IVORY CHAPTER: 3-TIER BOTTLE CREDIT BAND (#F6F1E7) ──────── */}
      <section className="border-b border-[#050505]/15 bg-[#F6F1E7] text-[#050505] px-5 py-14 sm:px-14 sm:py-20">
        <div className="mx-auto max-w-[1328px]">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.26em] text-[#3D372E]">
            {copy.tiersEyebrow}
          </p>
          <h2 className="mb-10 font-serif text-3xl font-normal tracking-[-0.02em] text-[#050505] sm:text-5xl">
            {copy.tiersTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#050505]/15">
            {copy.tiers.map((tier) => (
              <article
                key={tier.badge}
                className="border-r border-b border-[#050505]/15 p-7 sm:p-9 flex flex-col justify-between bg-[#F6F1E7]"
              >
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3D372E]">
                    {tier.badge}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-[#050505] sm:text-3xl">
                    {tier.name}
                  </h3>
                  <p className="mt-4 font-serif text-3xl font-bold text-[#050505] sm:text-4xl">
                    {tier.price}
                  </p>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#3D372E]">
                    {tier.passes}
                  </p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-[#2C2823]">
                    {tier.detail}
                  </p>
                </div>
                <a
                  href="#tc-request-vip"
                  className="mt-6 inline-flex min-h-[44px] items-center justify-between bg-[#050505] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F6F1E7] hover:bg-[#1C1915] transition-colors"
                >
                  <span>{copy.cta}</span>
                  <span aria-hidden="true">↓</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIORITY 6 VIP TABLE MINIMUM SPEND MATRIX (#F6F1E7 Avorio Caldo) ── */}
      <section className="border-b border-[#050505]/15 bg-[#F6F1E7] text-[#050505] px-5 py-16 sm:px-14">
        <div className="mx-auto max-w-[1328px]">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#3D3830]">
            {copy.matrixEyebrow}
          </p>
          <h2 className="mb-3 font-serif text-3xl text-[#050505] sm:text-5xl">
            {copy.matrixTitle}
          </h2>
          <p className="mb-8 max-w-3xl font-sans text-sm text-[#24201B] sm:text-base">
            {copy.matrixSub}
          </p>

          <div className="overflow-x-auto border border-[#050505]/15 bg-[#EFE9DC]">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#050505]/15 bg-[#050505] font-mono text-[11px] uppercase tracking-[0.14em] text-[#F6F1E7]">
                  <th className="py-4 px-5">{copy.colClub}</th>
                  <th className="py-4 px-5">{copy.colDancefloor}</th>
                  <th className="py-4 px-5">{copy.colPrive}</th>
                  <th className="py-4 px-5">{copy.colConsole}</th>
                  <th className="py-4 px-5 text-right">{copy.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#050505]/10 text-sm">
                {matrixRows.map((row) => (
                  <tr key={row.id} className="hover:bg-[#E7E0D0] transition-colors">
                    <td className="py-4 px-5">
                      <Link href={`${lp}/clubs/${row.slug}`} prefetch={false} className="font-serif text-xl text-[#050505] hover:underline transition-colors">
                        {row.name}
                      </Link>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#3D3830] mt-0.5">
                        {row.zone}
                      </p>
                    </td>
                    <td className="py-4 px-5 font-semibold text-[#050505]">{row.dancefloor}</td>
                    <td className="py-4 px-5 font-bold text-[#050505]">{row.prive}</td>
                    <td className="py-4 px-5 font-semibold text-[#050505]">{row.console}</td>
                    <td className="py-4 px-5 text-right">
                      <Link
                        href={`${lp}/clubs/${row.slug}`}
                        prefetch={false}
                        className="inline-flex min-h-[40px] items-center justify-center bg-[#050505] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#F6F1E7] hover:bg-[#1C1A17] transition-colors"
                      >
                        {copy.colAction} ↗
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE VIP CONCIERGE CONFIGURATOR ───────────────────────── */}
      <TableConcierge
        locale={locale}
        events={datedEvents}
        initialNow={initialNow.toISOString()}
        surface="vip"
        copy={{ ...getTableConciergeSharedCopy(locale), title: copy.title, lead: copy.lead }}
      />

      {/* ── WHAT EVERY VIP TABLE INCLUDES (#F6F1E7 Avorio Caldo) ─────────── */}
      <section className="px-5 py-16 sm:px-14 border-b border-[#050505]/15 bg-[#F6F1E7] text-[#050505]">
        <div className="mx-auto max-w-[1328px]">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#3D3830]">
            {copy.factorsEyebrow}
          </p>
          <h2 className="mb-3 font-serif text-3xl text-[#050505] sm:text-4xl">{copy.factorsTitle}</h2>
          <p className="mb-8 max-w-2xl font-sans text-base leading-relaxed text-[#24201B]">{copy.factorsLead}</p>
          <ul className="grid gap-4 md:grid-cols-2">
            {copy.factors.map((factor) => (
              <li key={factor} className="flex items-start gap-3 border border-[#050505]/15 bg-[#EFE9DC] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#050505]" aria-hidden="true" />
                <span className="font-sans text-sm leading-relaxed text-[#050505]">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3-STEP BOOKING PROTOCOL ──────────────────────────────────────── */}
      <section className="px-5 py-16 sm:px-14 border-b border-[#F6F1E7]/14 bg-[#050505]">
        <div className="mx-auto max-w-[1328px]">
          <p className="mb-3 text-center font-mono text-xs uppercase tracking-[0.14em] text-[#EAE3D5]">
            {copy.stepsEyebrow}
          </p>
          <h2 className="mb-10 text-center font-serif text-3xl text-[#F6F1E7] sm:text-4xl">{copy.stepsTitle}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {copy.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <article key={step.title} className="border border-[#F6F1E7]/14 bg-[#0B0A09] p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center border border-[#F6F1E7]/35 bg-[#050505]">
                      <Icon className="h-5 w-5 text-[#F6F1E7]" aria-hidden="true" />
                    </span>
                    <span className="font-serif italic text-3xl text-[#F6F1E7]">0{index + 1}</span>
                  </div>
                  <h3 className="mb-3 font-serif text-2xl text-[#F6F1E7]">{step.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{step.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-4 border border-[#F6F1E7]/20 bg-[#0B0A09] p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-[#F6F1E7]" aria-hidden="true" />
            <p className="font-sans text-sm leading-relaxed text-[#C2B9AA]">{copy.notice}</p>
          </div>
        </div>
      </section>

      {/* ── FINAL CONCIERGE CTA ──────────────────────────────────────────── */}
      <section className="px-5 py-20 sm:px-14 bg-[#050505]">
        <div className="mx-auto max-w-3xl border border-[#F6F1E7]/25 bg-[#0B0A09] p-8 text-center sm:p-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-[#EAE3D5]">
            {copy.finalEyebrow}
          </p>
          <h2 className="mb-4 font-serif text-3xl text-[#F6F1E7] sm:text-4xl">{copy.finalTitle}</h2>
          <p className="mx-auto mb-8 max-w-xl font-sans text-base leading-relaxed text-[#C2B9AA]">{copy.finalText}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-3 bg-[#25D366] px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#050505] transition-colors hover:bg-[#2EE472]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp {SITE_CONTACT.whatsapp.number}
            </a>
            <Link
              href={`${lp}/clubs`}
              prefetch={false}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-[#F6F1E7]/30 px-7 py-4 font-mono text-xs uppercase tracking-[0.12em] text-[#F6F1E7] transition-colors hover:bg-[#F6F1E7] hover:text-[#050505]"
            >
              {copy.clubsLink}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <EditorialPageSections locale={locale as LocaleCode} path={`${localePrefix(locale)}/vip-tables`} />
    </main>
  );
}
