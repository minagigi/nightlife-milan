import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { scoutXceedEvents, type XceedEvent, type XceedOffer } from '../lib/xceedScout';
import { EVENT_LOCALE_PACKS_ALL } from '../lib/eventLocalePacks';
import type { EventLocalePack, EventOfferKey } from '../lib/eventBatchLocaleTypes';
import { getEventbriteToken } from '../lib/eventbriteToken';

const PHONE = '+39 351 912 7047';
const SITE_URL = 'https://nightlifemilan.com';
const PUBLISH_URL = `${SITE_URL}/api/events/publish-curated`;
const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const EVENTBRITE_ORG_ID = '2988002072164';
const PINETA_SCENE = 'https://cdn.evbuc.com/images/1188885890/2988002064108/1/original.20260715-005449';
const AFFILIATE_RE = /^https:\/\/xceed\.me\/en\/milano\/event\/[^/]+\/(\d+)\/channel\/nightlifemilan-1$/;

type Locale = 'it' | 'en' | 'es' | 'pt' | 'fr' | 'de';
type SeriesId = 'just-me-week' | 'pineta-week' | 'aria-week' | 'aperitivi-week' | 'discoteche-week' | 'international-week' | 'university-erasmus-week' | 'serate-18-plus-week' | 'serate-21-plus-week';
type CuratedEvent = XceedEvent & { localDate: string; localStart: string; localEnd: string };

interface Args {
  execute: boolean;
  from: string;
  through: string;
  locales: Locale[];
  series?: SeriesId[];
  limit?: number;
}

interface UiPack {
  dateLocale: string;
  thisWeek: string;
  overviewTitle: string;
  overviewBody: string;
  priorityBody: string;
  bookingTitle: string;
  bookingBody: string;
  importantBody: string;
  programmeTitle: string;
  agendaTitle: string;
  galleryTitle: string;
  tablesTitle: string;
  tablesBody: string;
  faqTitle: string;
  seoLabel: string;
  date: string;
  time: string;
  age: string;
  dressCode: string;
  music: string;
  services: string;
  offers: string;
  book: string;
  selectedVenues: string;
  linksBelow: string;
  guestAnswer: string;
  elegantDress: string;
  aperitif: string;
  dinner: string;
  showDinner: string;
  club: string;
  tables: string;
  imageLabels: readonly [string, string, string, string];
  ticketName: string;
  ticketDescription: string;
  summaryMiddle: string;
  summaryEnd: string;
}

const UI: Record<Locale, UiPack> = {
  it: {
    dateLocale: 'it-IT', thisWeek: 'Questa settimana', overviewTitle: 'Calendario aggiornato della settimana',
    overviewBody: '{series} raccoglie {count} serate ancora prenotabili da {from} a {to}. Il contenuto viene ridotto ogni giorno eliminando le date trascorse e mantenendo solo formule e link ancora utili.',
    priorityBody: 'La selezione dà priorità a Just Me per il pubblico internazionale 21+, Pineta per il pubblico internazionale 18+ e Aria per il pubblico italiano 18+. Età, formule e disponibilità della singola pagina Xceed hanno sempre la precedenza.',
    bookingTitle: 'Come prenotare e confermare il pagamento', bookingBody: 'Scegli la serata, apri il relativo link Xceed e controlla prezzo, inclusioni e disponibilità. Dopo l’acquisto invia la conferma su WhatsApp al {phone}, indicando nome, locale, data e numero di persone: controlleremo l’esito della prenotazione e del pagamento.',
    importantBody: 'La registrazione gratuita Eventbrite è una richiesta informativa e non vale come ingresso. Il titolo valido è quello acquistato tramite il link Xceed specifico della serata.',
    programmeTitle: 'Programma completo delle serate', agendaTitle: 'Agenda dettagliata della settimana', galleryTitle: 'Atmosfera dei locali',
    tablesTitle: 'Tavoli pista, privé e super privé', tablesBody: 'Just Me, Pineta e Aria possono offrire tavoli in pista, privé e super privé. Il prezzo varia per data, posizione e gruppo: usiamo solo gli importi pubblicati nella pagina Xceed della singola serata.',
    faqTitle: 'Domande frequenti', seoLabel: 'Parole chiave SEO', date: 'Data', time: 'Orario', age: 'Età', dressCode: 'Dress code', music: 'Musica', services: 'Servizi', offers: 'Formule e prezzi', book: 'Prenota su Xceed',
    selectedVenues: 'locali selezionati di Milano', linksBelow: 'i link Xceed specifici riportati nel programma', guestAnswer: 'Ospiti e performance vengono indicati solo quando compaiono nella scheda ufficiale della serata.',
    elegantDress: 'Abbigliamento elegante; pantaloni lunghi richiesti agli uomini quando indicato dal locale.', aperitif: 'aperitivo', dinner: 'cena su prenotazione', showDinner: 'show dinner del giovedì se confermata', club: 'discoteca', tables: 'tavoli pista, privé e super privé',
    imageLabels: ['aperitivo e cocktail', 'lounge e tavoli', 'atmosfera della serata', 'interni del locale'],
    ticketName: 'RICHIESTA INFORMAZIONI - NON VALIDA PER INGRESSO', ticketDescription: 'Questa registrazione non è un biglietto. Acquista la formula Xceed scelta e invia la conferma su WhatsApp al +39 351 912 7047.',
    summaryMiddle: 'Prezzi e tavoli Xceed.', summaryEnd: 'Conferma WhatsApp',
  },
  en: {
    dateLocale: 'en-GB', thisWeek: 'This Week', overviewTitle: 'Updated weekly calendar',
    overviewBody: '{series} brings together {count} bookable nights from {from} to {to}. The listing is reduced every day: past dates are removed and only useful current offers and links remain.',
    priorityBody: 'The selection prioritises Just Me for an international 21+ crowd, Pineta for an international 18+ crowd and Aria for an Italian 18+ crowd. The age, offer and availability shown on each Xceed page always take precedence.',
    bookingTitle: 'How to book and confirm payment', bookingBody: 'Choose the night, open its Xceed link and check price, inclusions and availability. After purchase, send the confirmation on WhatsApp to {phone} with name, venue, date and group size so we can verify the booking and payment.',
    importantBody: 'The free Eventbrite registration is an information request and does not provide entry. Valid admission must be purchased through the Xceed link for the selected night.',
    programmeTitle: 'Complete event programme', agendaTitle: 'Detailed weekly agenda', galleryTitle: 'Venue atmosphere',
    tablesTitle: 'Dance-floor, privé and super privé tables', tablesBody: 'Just Me, Pineta and Aria may offer dance-floor, privé and super privé tables. Prices depend on date, position and group size; only prices published on the relevant Xceed page are used.',
    faqTitle: 'Frequently asked questions', seoLabel: 'SEO keywords', date: 'Date', time: 'Time', age: 'Age', dressCode: 'Dress code', music: 'Music', services: 'Services', offers: 'Offers and prices', book: 'Book on Xceed',
    selectedVenues: 'selected Milan venues', linksBelow: 'the specific Xceed links shown in the programme', guestAnswer: 'Guests and performances are mentioned only when they appear in the official event listing.',
    elegantDress: 'Elegant dress code; long trousers for men when required by the venue.', aperitif: 'aperitivo', dinner: 'bookable dinner', showDinner: 'Thursday show dinner when confirmed', club: 'nightclub', tables: 'dance-floor, privé and super privé tables',
    imageLabels: ['aperitivo and cocktails', 'lounge and tables', 'party atmosphere', 'venue interior'],
    ticketName: 'INFORMATION REQUEST - NOT VALID FOR ENTRY', ticketDescription: 'This registration is not an entry ticket. Buy the selected Xceed offer and send confirmation on WhatsApp to +39 351 912 7047.',
    summaryMiddle: 'Xceed prices and VIP tables.', summaryEnd: 'Confirm on WhatsApp',
  },
  es: {
    dateLocale: 'es-ES', thisWeek: 'Esta semana', overviewTitle: 'Calendario semanal actualizado',
    overviewBody: '{series} reúne {count} noches reservables del {from} al {to}. Cada día se eliminan las fechas pasadas y quedan únicamente ofertas y enlaces todavía útiles.',
    priorityBody: 'La selección prioriza Just Me para público internacional 21+, Pineta para público internacional 18+ y Aria para público italiano 18+. Siempre prevalecen edad, oferta y disponibilidad publicadas en Xceed.',
    bookingTitle: 'Cómo reservar y confirmar el pago', bookingBody: 'Elige la noche, abre su enlace Xceed y comprueba precio, inclusiones y disponibilidad. Después de comprar, envía la confirmación por WhatsApp al {phone} con nombre, local, fecha y número de personas.',
    importantBody: 'El registro gratuito de Eventbrite es solo una solicitud de información y no permite la entrada. La entrada válida se compra mediante el enlace Xceed de la noche elegida.',
    programmeTitle: 'Programa completo de eventos', agendaTitle: 'Agenda semanal detallada', galleryTitle: 'Ambiente de los locales',
    tablesTitle: 'Mesas de pista, privé y super privé', tablesBody: 'Just Me, Pineta y Aria pueden ofrecer mesas de pista, privé y super privé. El precio depende de fecha, posición y grupo; usamos solo los importes publicados en Xceed.',
    faqTitle: 'Preguntas frecuentes', seoLabel: 'Palabras clave SEO', date: 'Fecha', time: 'Horario', age: 'Edad', dressCode: 'Código de vestimenta', music: 'Música', services: 'Servicios', offers: 'Opciones y precios', book: 'Reservar en Xceed',
    selectedVenues: 'locales seleccionados de Milán', linksBelow: 'los enlaces Xceed específicos del programa', guestAnswer: 'Los invitados y actuaciones se indican solo cuando aparecen en la ficha oficial.',
    elegantDress: 'Vestimenta elegante; pantalón largo para hombres cuando lo exija el local.', aperitif: 'aperitivo', dinner: 'cena con reserva', showDinner: 'show dinner del jueves si está confirmado', club: 'discoteca', tables: 'mesas de pista, privé y super privé',
    imageLabels: ['aperitivo y cócteles', 'lounge y mesas', 'ambiente de fiesta', 'interior del local'],
    ticketName: 'SOLICITUD DE INFORMACIÓN - NO VÁLIDA PARA ENTRAR', ticketDescription: 'Este registro no es una entrada. Compra la opción Xceed elegida y envía la confirmación por WhatsApp al +39 351 912 7047.',
    summaryMiddle: 'Precios Xceed y mesas VIP.', summaryEnd: 'Confirma por WhatsApp',
  },
  pt: {
    dateLocale: 'pt-PT', thisWeek: 'Esta semana', overviewTitle: 'Calendário semanal atualizado',
    overviewBody: '{series} reúne {count} noites ainda reserváveis de {from} a {to}. Todos os dias são removidas as datas passadas, mantendo apenas ofertas e ligações atuais.',
    priorityBody: 'A seleção dá prioridade ao Just Me para público internacional 21+, Pineta para público internacional 18+ e Aria para público italiano 18+. Prevalecem sempre idade, oferta e disponibilidade publicadas na Xceed.',
    bookingTitle: 'Como reservar e confirmar o pagamento', bookingBody: 'Escolha a noite, abra a ligação Xceed e confirme preço, inclusões e disponibilidade. Depois da compra, envie a confirmação por WhatsApp para {phone} com nome, local, data e número de pessoas.',
    importantBody: 'O registo gratuito Eventbrite é apenas um pedido de informação e não permite entrada. A entrada válida deve ser comprada na ligação Xceed da noite escolhida.',
    programmeTitle: 'Programa completo dos eventos', agendaTitle: 'Agenda semanal detalhada', galleryTitle: 'Ambiente dos locais',
    tablesTitle: 'Mesas de pista, privé e super privé', tablesBody: 'Just Me, Pineta e Aria podem oferecer mesas de pista, privé e super privé. O preço depende da data, posição e grupo; usamos apenas os valores publicados na Xceed.',
    faqTitle: 'Perguntas frequentes', seoLabel: 'Palavras-chave SEO', date: 'Data', time: 'Horário', age: 'Idade', dressCode: 'Dress code', music: 'Música', services: 'Serviços', offers: 'Opções e preços', book: 'Reservar na Xceed',
    selectedVenues: 'locais selecionados de Milão', linksBelow: 'as ligações Xceed específicas no programa', guestAnswer: 'Convidados e atuações são indicados apenas quando constam da página oficial.',
    elegantDress: 'Roupa elegante; calças compridas para homens quando exigidas pelo local.', aperitif: 'aperitivo', dinner: 'jantar com reserva', showDinner: 'show dinner de quinta-feira quando confirmado', club: 'discoteca', tables: 'mesas de pista, privé e super privé',
    imageLabels: ['aperitivo e cocktails', 'lounge e mesas', 'ambiente da festa', 'interior do local'],
    ticketName: 'PEDIDO DE INFORMAÇÕES - NÃO VÁLIDO PARA ENTRADA', ticketDescription: 'Este registo não é um bilhete. Compre a opção Xceed escolhida e envie a confirmação por WhatsApp para +39 351 912 7047.',
    summaryMiddle: 'Preços Xceed e mesas VIP.', summaryEnd: 'Confirme por WhatsApp',
  },
  fr: {
    dateLocale: 'fr-FR', thisWeek: 'Cette semaine', overviewTitle: 'Calendrier hebdomadaire actualisé',
    overviewBody: '{series} rassemble {count} soirées encore réservables du {from} au {to}. Les dates passées sont supprimées chaque jour afin de ne conserver que les offres et liens utiles.',
    priorityBody: 'La sélection privilégie Just Me pour un public international 21+, Pineta pour un public international 18+ et Aria pour un public italien 18+. L’âge, l’offre et la disponibilité indiqués sur Xceed prévalent toujours.',
    bookingTitle: 'Comment réserver et confirmer le paiement', bookingBody: 'Choisissez la soirée, ouvrez son lien Xceed et vérifiez prix, inclusions et disponibilité. Après l’achat, envoyez la confirmation par WhatsApp au {phone} avec nom, lieu, date et nombre de personnes.',
    importantBody: 'L’inscription gratuite Eventbrite est une demande d’information et ne donne pas accès. L’entrée valable doit être achetée via le lien Xceed de la soirée choisie.',
    programmeTitle: 'Programme complet des soirées', agendaTitle: 'Agenda hebdomadaire détaillé', galleryTitle: 'Ambiance des établissements',
    tablesTitle: 'Tables piste, privé et super privé', tablesBody: 'Just Me, Pineta et Aria peuvent proposer des tables piste, privé et super privé. Le prix dépend de la date, de la position et du groupe; seuls les montants publiés sur Xceed sont utilisés.',
    faqTitle: 'Questions fréquentes', seoLabel: 'Mots-clés SEO', date: 'Date', time: 'Horaire', age: 'Âge', dressCode: 'Dress code', music: 'Musique', services: 'Services', offers: 'Formules et prix', book: 'Réserver sur Xceed',
    selectedVenues: 'établissements sélectionnés à Milan', linksBelow: 'les liens Xceed spécifiques du programme', guestAnswer: 'Les invités et performances sont mentionnés uniquement lorsqu’ils figurent sur la fiche officielle.',
    elegantDress: 'Tenue élégante; pantalon long pour les hommes lorsque le lieu l’exige.', aperitif: 'aperitivo', dinner: 'dîner sur réservation', showDinner: 'show dinner du jeudi si confirmé', club: 'discothèque', tables: 'tables piste, privé et super privé',
    imageLabels: ['aperitivo et cocktails', 'lounge et tables', 'ambiance de soirée', 'intérieur du lieu'],
    ticketName: 'DEMANDE D’INFORMATION - NON VALABLE POUR ENTRER', ticketDescription: 'Cette inscription n’est pas un billet. Achetez la formule Xceed choisie et envoyez la confirmation WhatsApp au +39 351 912 7047.',
    summaryMiddle: 'Prix Xceed et tables VIP.', summaryEnd: 'Confirmez sur WhatsApp',
  },
  de: {
    dateLocale: 'de-DE', thisWeek: 'Diese Woche', overviewTitle: 'Aktualisierter Wochenkalender',
    overviewBody: '{series} bündelt {count} buchbare Nächte vom {from} bis {to}. Vergangene Termine werden täglich entfernt, sodass nur aktuelle Angebote und Links verbleiben.',
    priorityBody: 'Die Auswahl priorisiert Just Me für internationales Publikum 21+, Pineta für internationales Publikum 18+ und Aria für italienisches Publikum 18+. Alter, Angebot und Verfügbarkeit auf Xceed haben immer Vorrang.',
    bookingTitle: 'Buchung und Zahlungsbestätigung', bookingBody: 'Wähle die Nacht, öffne den Xceed-Link und prüfe Preis, Leistungen und Verfügbarkeit. Sende danach die Kaufbestätigung per WhatsApp an {phone} mit Name, Club, Datum und Gruppengröße.',
    importantBody: 'Die kostenlose Eventbrite-Registrierung ist nur eine Informationsanfrage und keine Eintrittskarte. Gültiger Eintritt wird über den Xceed-Link der gewählten Nacht gekauft.',
    programmeTitle: 'Vollständiges Veranstaltungsprogramm', agendaTitle: 'Detaillierte Wochenagenda', galleryTitle: 'Atmosphäre der Clubs',
    tablesTitle: 'Dancefloor-, Privé- und Super-Privé-Tische', tablesBody: 'Just Me, Pineta und Aria können Dancefloor-, Privé- und Super-Privé-Tische anbieten. Der Preis hängt von Datum, Position und Gruppe ab; es gelten nur die auf Xceed veröffentlichten Preise.',
    faqTitle: 'Häufig gestellte Fragen', seoLabel: 'SEO-Keywords', date: 'Datum', time: 'Uhrzeit', age: 'Alter', dressCode: 'Dresscode', music: 'Musik', services: 'Leistungen', offers: 'Angebote und Preise', book: 'Auf Xceed buchen',
    selectedVenues: 'ausgewählte Clubs in Mailand', linksBelow: 'die jeweiligen Xceed-Links im Programm', guestAnswer: 'Gäste und Shows werden nur genannt, wenn sie in der offiziellen Veranstaltungsseite stehen.',
    elegantDress: 'Elegante Kleidung; lange Hosen für Männer, wenn der Club dies verlangt.', aperitif: 'Aperitivo', dinner: 'Dinner mit Reservierung', showDinner: 'Donnerstag Show Dinner, wenn bestätigt', club: 'Clubnacht', tables: 'Dancefloor-, Privé- und Super-Privé-Tische',
    imageLabels: ['Aperitivo und Cocktails', 'Lounge und Tische', 'Partyatmosphäre', 'Innenbereich des Clubs'],
    ticketName: 'INFORMATIONSANFRAGE - NICHT ALS EINTRITT GÜLTIG', ticketDescription: 'Diese Registrierung ist kein Ticket. Kaufe das gewählte Xceed-Angebot und sende die Bestätigung per WhatsApp an +39 351 912 7047.',
    summaryMiddle: 'Xceed-Preise und VIP-Tische.', summaryEnd: 'Per WhatsApp bestätigen',
  },
};

const TITLES: Record<Locale, Record<SeriesId, string>> = {
  it: { 'just-me-week': 'Just Me Milano - Questa settimana', 'pineta-week': 'Pineta Milano - Questa settimana', 'aria-week': 'Aria Club Milano - Questa settimana', 'aperitivi-week': 'Aperitivi a Milano - Questa settimana', 'discoteche-week': 'Discoteche a Milano - Questa settimana', 'international-week': 'Serate internazionali a Milano', 'university-erasmus-week': 'Serate universitarie ed Erasmus Milano', 'serate-18-plus-week': 'Serate 18+ a Milano', 'serate-21-plus-week': 'Serate 21+ a Milano' },
  en: { 'just-me-week': 'Just Me Milano - This Week', 'pineta-week': 'Pineta Milano - This Week', 'aria-week': 'Aria Club Milano - This Week', 'aperitivi-week': 'Aperitivo in Milan - This Week', 'discoteche-week': 'Milan Nightclubs - This Week', 'international-week': 'International Parties Milan', 'university-erasmus-week': 'University & Erasmus Parties Milan', 'serate-18-plus-week': 'Milan 18+ Parties', 'serate-21-plus-week': 'Milan 21+ Parties' },
  es: { 'just-me-week': 'Just Me Milano - Esta semana', 'pineta-week': 'Pineta Milano - Esta semana', 'aria-week': 'Aria Club Milano - Esta semana', 'aperitivi-week': 'Aperitivos en Milán - Esta semana', 'discoteche-week': 'Discotecas en Milán - Esta semana', 'international-week': 'Fiestas internacionales en Milán', 'university-erasmus-week': 'Fiestas universitarias y Erasmus Milán', 'serate-18-plus-week': 'Fiestas 18+ en Milán', 'serate-21-plus-week': 'Fiestas 21+ en Milán' },
  pt: { 'just-me-week': 'Just Me Milano - Esta semana', 'pineta-week': 'Pineta Milano - Esta semana', 'aria-week': 'Aria Club Milano - Esta semana', 'aperitivi-week': 'Aperitivos em Milão - Esta semana', 'discoteche-week': 'Discotecas em Milão - Esta semana', 'international-week': 'Festas internacionais em Milão', 'university-erasmus-week': 'Festas universitárias e Erasmus Milão', 'serate-18-plus-week': 'Festas 18+ em Milão', 'serate-21-plus-week': 'Festas 21+ em Milão' },
  fr: { 'just-me-week': 'Just Me Milano - Cette semaine', 'pineta-week': 'Pineta Milano - Cette semaine', 'aria-week': 'Aria Club Milano - Cette semaine', 'aperitivi-week': 'Aperitivo à Milan - Cette semaine', 'discoteche-week': 'Discothèques à Milan - Cette semaine', 'international-week': 'Soirées internationales à Milan', 'university-erasmus-week': 'Soirées universitaires et Erasmus Milan', 'serate-18-plus-week': 'Soirées 18+ à Milan', 'serate-21-plus-week': 'Soirées 21+ à Milan' },
  de: { 'just-me-week': 'Just Me Milano - Diese Woche', 'pineta-week': 'Pineta Milano - Diese Woche', 'aria-week': 'Aria Club Milano - Diese Woche', 'aperitivi-week': 'Aperitivo in Mailand - Diese Woche', 'discoteche-week': 'Clubs in Mailand - Diese Woche', 'international-week': 'Internationale Partys in Mailand', 'university-erasmus-week': 'Studenten- und Erasmus-Partys Mailand', 'serate-18-plus-week': '18+ Partys in Mailand', 'serate-21-plus-week': '21+ Partys in Mailand' },
};

const SERIES_IDS = Object.keys(TITLES.it) as SeriesId[];
const SERIES: Record<SeriesId, { age: string; category: string; background: string; venue?: string }> = {
  'just-me-week': { age: '21+', category: '103', background: 'public/images/venues/just-me-milano/just-me-milano-buffet-01.webp', venue: 'v-justme' },
  'pineta-week': { age: '18+', category: '103', background: 'public/images/events/curated/aperitivi-milano-pineta-scene-v2.png', venue: 'v-pineta' },
  'aria-week': { age: '18+', category: '103', background: 'public/images/venues/aria-club-milano/aria-club-milano-buffet-01.webp', venue: 'v-aria' },
  'aperitivi-week': { age: '18+', category: '110', background: 'public/images/events/curated/aperitivi-milano-pineta-scene-v2.png' },
  'discoteche-week': { age: '18+', category: '103', background: 'public/images/venues/pineta-milano/pineta-milano-party-01.webp' },
  'international-week': { age: '18+', category: '103', background: 'public/images/events/curated/aperitivi-milano-pineta-scene-v2.png' },
  'university-erasmus-week': { age: '18+', category: '103', background: 'public/images/venues/pineta-milano/pineta-milano-party-01.webp' },
  'serate-18-plus-week': { age: '18+', category: '103', background: 'public/images/venues/pineta-milano/pineta-milano-party-01.webp' },
  'serate-21-plus-week': { age: '21+', category: '103', background: 'public/images/venues/just-me-milano/just-me-milano-lounge-01.webp' },
};

const VENUE_NAMES: Record<string, string> = { 'v-justme': 'Just Me Milano', 'v-pineta': 'Pineta Milano', 'v-aria': 'Aria Club Milano' };

function parseArgs(argv: string[]): Args {
  const values = new Map<string, string>();
  for (const arg of argv) {
    if (arg === '--execute') values.set('execute', '1');
    else if (arg.startsWith('--from=')) values.set('from', arg.slice(7));
    else if (arg.startsWith('--through=')) values.set('through', arg.slice(10));
    else if (arg.startsWith('--locales=')) values.set('locales', arg.slice(10));
    else if (arg.startsWith('--series=')) values.set('series', arg.slice(9));
    else if (arg.startsWith('--limit=')) values.set('limit', arg.slice(8));
    else throw new Error(`Unknown argument: ${arg}`);
  }
  const locales = (values.get('locales') || 'it,en').split(',') as Locale[];
  if (locales.some((locale) => !UI[locale])) throw new Error('Unsupported locale');
  const series = values.get('series')?.split(',') as SeriesId[] | undefined;
  if (series?.some((id) => !SERIES_IDS.includes(id))) throw new Error('Unsupported series');
  return { execute: values.get('execute') === '1', from: values.get('from') || '2026-07-16', through: values.get('through') || '2026-07-19', locales, series, limit: values.get('limit') ? Number(values.get('limit')) : undefined };
}

async function loadLocalEnv(): Promise<void> {
  for (const file of ['.env.local', '.env.production.local']) {
    try {
      const raw = await fs.readFile(file, 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
      }
    } catch { /* optional local env */ }
  }
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function clean(value: string): string {
  return value.replace(/\p{Extended_Pictographic}/gu, '').replace(/\s+/g, ' ').trim();
}

function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{([a-zA-Z][a-zA-Z0-9]*)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

function localDate(iso: string): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(iso));
}

function localTime(iso?: string): string {
  if (!iso) return '05:00';
  return new Intl.DateTimeFormat('it-IT', { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso));
}

function dateLabel(date: string, locale: Locale, withYear = true): string {
  return new Intl.DateTimeFormat(UI[locale].dateLocale, { timeZone: 'Europe/Rome', weekday: 'long', day: 'numeric', month: 'long', ...(withYear ? { year: 'numeric' } : {}) }).format(new Date(`${date}T12:00:00+02:00`));
}

function rangeLabel(from: string, through: string, locale: Locale): string {
  const start = new Date(`${from}T12:00:00+02:00`);
  const end = new Date(`${through}T12:00:00+02:00`);
  const day = new Intl.DateTimeFormat(UI[locale].dateLocale, { day: 'numeric', timeZone: 'Europe/Rome' });
  const monthYear = new Intl.DateTimeFormat(UI[locale].dateLocale, { month: 'long', year: 'numeric', timeZone: 'Europe/Rome' });
  return `${day.format(start)}-${day.format(end)} ${monthYear.format(end)}`;
}

function daySequence(from: string, through: string): string[] {
  const out: string[] = [];
  for (let cursor = new Date(`${from}T12:00:00+02:00`); cursor <= new Date(`${through}T12:00:00+02:00`); cursor = new Date(cursor.getTime() + 86_400_000)) {
    out.push(cursor.toISOString().slice(0, 10));
  }
  return out;
}

function specificity(event: XceedEvent): number {
  if (/afterparty/i.test(event.name)) return 3;
  if (/^(friday|saturday|sunday|monday|tuesday|wednesday|thursday) night$/i.test(event.name.trim())) return 0;
  return 2;
}

function curate(raw: XceedEvent[], from: string, through: string): CuratedEvent[] {
  const mapped = raw.map((event) => ({ ...event, name: clean(event.name), description: clean(event.description), localDate: localDate(event.startISO), localStart: localTime(event.startISO), localEnd: localTime(event.endISO) }))
    .filter((event) => event.localDate >= from && event.localDate <= through);
  const best = new Map<string, CuratedEvent>();
  for (const event of mapped) {
    const affiliate = event.affiliateUrl.match(AFFILIATE_RE);
    if (!affiliate || affiliate[1] !== event.xceedId) throw new Error(`Invalid affiliate link for ${event.xceedId}`);
    const key = `${event.venueId}:${event.localDate}:${event.localStart}`;
    const current = best.get(key);
    if (!current || specificity(event) > specificity(current)) best.set(key, event);
  }
  return [...best.values()].sort((a, b) => a.startISO.localeCompare(b.startISO) || a.venueId.localeCompare(b.venueId));
}

function includesAperitif(event: CuratedEvent): boolean {
  return event.offers.some((offer) => /aperitif/i.test(offer.name)) || /aperitif|aperitivo/i.test(event.description);
}

function matchesSeries(event: CuratedEvent, id: SeriesId): boolean {
  const venue = SERIES[id].venue;
  if (venue) return event.venueId === venue;
  if (id === 'aperitivi-week') return includesAperitif(event);
  if (id === 'discoteche-week') return true;
  if (id === 'international-week') return event.venueId === 'v-justme' || event.venueId === 'v-pineta';
  if (id === 'university-erasmus-week') return event.venueId === 'v-justme' || event.ageRange?.startsWith('18') === true;
  if (id === 'serate-18-plus-week') return event.ageRange?.startsWith('18') === true;
  if (id === 'serate-21-plus-week') return event.ageRange?.startsWith('21') === true;
  return false;
}

function offerKey(name: string): EventOfferKey | null {
  const map: Record<string, EventOfferKey> = {
    'Aperitif + 1 Drink': 'aperitifOneDrink', 'Aperitif + 2 Drinks': 'aperitifTwoDrinks', 'Aperitif + 2 Drinks [Early Bird]': 'aperitifTwoDrinks', 'Aperitif + Open Wine': 'aperitifOpenWine',
    'Club + 1 Drink': 'clubOneDrink', 'Ticket + 1 Drink': 'clubOneDrink', 'Ticket + 2 Drinks': 'clubTwoDrinks', 'Woman + 1 Drink': 'womanOneDrink',
    'Dance Floor Table': 'danceFloorTable', 'Prive Dance Floor Table': 'priveDanceFloorTable', 'VIP Area Table': 'vipAreaTable', 'Super VIP Area Table [Back Line]': 'superVipBackLineTable',
    'Super VIP Area Table [Front Line]': 'superVipFrontLineTable', 'DJ Table': 'djTable', 'Prive Aria Table': 'priveAriaTable', 'Prive DJ Table': 'priveDjTable', 'Prive Balcony Table': 'priveBalconyTable', 'VIP Prive Table': 'vipPriveTable',
  };
  return map[name] || null;
}

function localizedOffer(offer: XceedOffer, pack: EventLocalePack): string {
  const key = offerKey(offer.name);
  return key ? pack.offers[key] : clean(offer.name);
}

function euro(value: number, locale: Locale): string {
  return new Intl.NumberFormat(UI[locale].dateLocale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}

function services(event: CuratedEvent, ui: UiPack): string[] {
  const out: string[] = [];
  if (includesAperitif(event)) out.push(ui.aperitif);
  if (event.venueId !== 'v-aria' && /served dinner|cena su prenotazione/i.test(event.description)) out.push(ui.dinner);
  if (event.venueId === 'v-justme' && new Date(event.startISO).getUTCDay() === 4 && /show dinner|cena cantata/i.test(event.description)) out.push(ui.showDinner);
  out.push(ui.club);
  if (event.offers.some((offer) => offer.category === 'table')) out.push(ui.tables);
  return [...new Set(out)];
}

function gallerySources(id: SeriesId): string[] {
  const justMe = [
    `${SITE_URL}/images/venues/just-me-milano/just-me-milano-buffet-01.webp`,
    `${SITE_URL}/images/venues/just-me-milano/just-me-milano-interior-03.webp`,
    `${SITE_URL}/images/venues/just-me-milano/just-me-milano-lounge-01.webp`,
    `${SITE_URL}/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp`,
  ];
  const pineta = [
    PINETA_SCENE,
    `${SITE_URL}/images/venues/pineta-milano/pineta-milano-lounge-01.webp`,
    `${SITE_URL}/images/venues/pineta-milano/pineta-milano-party-01.webp`,
    `${SITE_URL}/images/venues/pineta-milano/pineta-milano-ingresso-01.webp`,
  ];
  const aria = [
    `${SITE_URL}/images/venues/aria-club-milano/aria-club-milano-buffet-01.webp`,
    `${SITE_URL}/images/venues/aria-club-milano/aria-club-milano-bar-01.webp`,
    `${SITE_URL}/images/venues/aria-club-milano/aria-club-milano-garden-01.webp`,
    `${SITE_URL}/images/venues/aria-club-milano/aria-club-milano-interior-01.webp`,
  ];
  if (id === 'just-me-week' || id === 'serate-21-plus-week') return justMe;
  if (id === 'pineta-week' || id === 'international-week' || id === 'university-erasmus-week') return pineta;
  if (id === 'aria-week' || id === 'serate-18-plus-week') return aria;
  return [PINETA_SCENE, justMe[0], aria[0], pineta[2]];
}

function summaryFor(seriesTitle: string, range: string, locale: Locale): string {
  const ui = UI[locale];
  const suffix = `${ui.summaryMiddle} ${ui.summaryEnd} ${PHONE}.`;
  const available = 140 - suffix.length - 1;
  let core = `${seriesTitle}: ${range}.`;
  if (core.length > available) core = `${core.slice(0, Math.max(0, available - 1)).replace(/\s+\S*$/, '')}.`;
  return `${core} ${suffix}`;
}

function seriesVenueLabel(id: SeriesId, ui: UiPack): string {
  if (id === 'just-me-week' || id === 'serate-21-plus-week') return 'Just Me Milano';
  if (id === 'pineta-week') return 'Pineta Milano';
  if (id === 'aria-week') return 'Aria Club Milano';
  return ui.selectedVenues;
}

function buildHtml(id: SeriesId, locale: Locale, publicationDate: string, through: string, events: CuratedEvent[], marker: string, summary: string): string {
  const ui = UI[locale];
  const pack = EVENT_LOCALE_PACKS_ALL[locale];
  const seriesTitle = TITLES[locale][id];
  const fromLabel = dateLabel(publicationDate, locale);
  const toLabel = dateLabel(through, locale);
  const range = rangeLabel(publicationDate, through, locale);
  const grouped = new Map<string, CuratedEvent[]>();
  for (const event of events) grouped.set(event.localDate, [...(grouped.get(event.localDate) || []), event]);

  const programme = [...grouped.entries()].map(([date, dayEvents]) => {
    const cards = dayEvents.map((event) => {
      const offers = event.offers.map((offer) => `<li>${escapeHtml(localizedOffer(offer, pack))}: <strong>${escapeHtml(euro(offer.price, locale))}</strong></li>`).join('');
      const music = event.genres.length ? event.genres.join(', ') : 'House, Hip-hop, Hits, EDM, Reggaeton';
      return `<h3>${escapeHtml(VENUE_NAMES[event.venueId])} - ${escapeHtml(event.name)}</h3><p><strong>${escapeHtml(ui.date)}:</strong> ${escapeHtml(dateLabel(event.localDate, locale))}. <strong>${escapeHtml(ui.time)}:</strong> ${escapeHtml(event.localStart)}-${escapeHtml(event.localEnd)}. <strong>${escapeHtml(ui.age)}:</strong> ${escapeHtml(event.ageRange || SERIES[id].age)}. <strong>${escapeHtml(ui.dressCode)}:</strong> ${escapeHtml(ui.elegantDress)}</p><p><strong>${escapeHtml(ui.music)}:</strong> ${escapeHtml(music)}. <strong>${escapeHtml(ui.services)}:</strong> ${escapeHtml(services(event, ui).join(', '))}.</p><h3>${escapeHtml(ui.offers)}</h3><ul>${offers}</ul><p><a href="${escapeHtml(event.affiliateUrl)}" rel="nofollow noopener noreferrer">${escapeHtml(`${ui.book}: ${VENUE_NAMES[event.venueId]} - ${event.name}`)}</a></p>`;
    }).join('');
    return `<h2>${escapeHtml(dateLabel(date, locale))}</h2>${cards}`;
  }).join('');

  const agenda = events.map((event) => `<li><strong>${escapeHtml(dateLabel(event.localDate, locale, false))}, ${escapeHtml(event.localStart)}-${escapeHtml(event.localEnd)}:</strong> ${escapeHtml(VENUE_NAMES[event.venueId])} - ${escapeHtml(event.name)}; ${escapeHtml(services(event, ui).join(', '))}.</li>`).join('');
  const gallery = gallerySources(id).map((src, index) => `<h3>${escapeHtml(`${seriesTitle}: ${ui.imageLabels[index]}`)}</h3><p><img src="${escapeHtml(src)}" alt="${escapeHtml(`${seriesTitle}, ${ui.imageLabels[index]}, ${range}`)}" width="460" style="width:100%;max-width:460px;height:auto;display:block" /></p>`).join('');

  const prices = events.flatMap((event) => event.offers.map((offer) => offer.price));
  const tablePrices = events.flatMap((event) => event.offers.filter((offer) => offer.category === 'table').map((offer) => offer.price));
  const genres = [...new Set(events.flatMap((event) => event.genres))].join(', ') || 'House, Hip-hop, Hits, EDM, Reggaeton';
  const values: Record<string, string | number> = {
    event: seriesTitle, venue: seriesVenueLabel(id, ui), date: range, start: events[0]?.localStart || '19:30', end: events.at(-1)?.localEnd || '05:00', genres,
    phone: PHONE, address: 'Milano', area: 'Milano', minAge: SERIES[id].age.replace('+', ''), lowestPrice: Math.min(...prices), highestTable: tablePrices.length ? Math.max(...tablePrices) : 0,
    specialGuests: ui.guestAnswer, siteUrl: SITE_URL, affiliateUrl: ui.linksBelow, dressCode: ui.elegantDress, guestFaqAnswer: ui.guestAnswer, guestSentence: ui.guestAnswer,
  };
  const faqItems = pack.faqs.map((faq) => ({ question: clean(interpolate(faq.question, values)), answer: clean(interpolate(faq.answer, values)) }));
  for (const [index, faq] of faqItems.entries()) {
    if (faq.answer.length > 300) throw new Error(`${marker} FAQ ${index + 1} exceeds 300 characters`);
    if (/\{[a-zA-Z]/.test(`${faq.question}${faq.answer}`)) throw new Error(`${marker} unresolved FAQ placeholder`);
  }
  const faqs = faqItems.map((faq) => `<div data-event-faq="true"><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></div>`).join('');
  const keywords = [...new Set([...pack.seoKeywords.map((keyword) => clean(interpolate(keyword, values))), seriesTitle, `${seriesTitle} ${range}`, 'Xceed Milan', 'Nightlife Milan WhatsApp'])].join(', ');

  const html = [
    `<p>${escapeHtml(summary)}</p>`,
    `<h2>${escapeHtml(ui.overviewTitle)}</h2>`,
    `<p>${escapeHtml(interpolate(ui.overviewBody, { series: seriesTitle, count: events.length, from: fromLabel, to: toLabel }))}</p>`,
    `<p>${escapeHtml(ui.priorityBody)}</p>`,
    `<h2>${escapeHtml(ui.bookingTitle)}</h2>`,
    `<p>${escapeHtml(interpolate(ui.bookingBody, { phone: PHONE }))}</p>`,
    `<p><strong>${escapeHtml(ui.importantBody)}</strong></p>`,
    `<h2>${escapeHtml(ui.programmeTitle)}</h2>`,
    programme,
    `<h2>${escapeHtml(ui.agendaTitle)}</h2><ul>${agenda}</ul>`,
    `<h2>${escapeHtml(ui.galleryTitle)}</h2>`,
    gallery,
    `<h2>${escapeHtml(ui.tablesTitle)}</h2><p>${escapeHtml(ui.tablesBody)}</p>`,
    `<h2>${escapeHtml(ui.faqTitle)}</h2>`,
    faqs,
    `<p><strong>${escapeHtml(ui.seoLabel)}:</strong> ${escapeHtml(keywords)}</p>`,
    `<!-- ${marker} -->`,
  ].join('');

  validateHtml(html, marker, events);
  return html;
}

function validateHtml(html: string, marker: string, events: CuratedEvent[]): void {
  if (!html.includes(PHONE)) throw new Error(`${marker} missing phone`);
  if ((html.match(/data-event-faq="true"/g) || []).length !== 25) throw new Error(`${marker} must contain 25 FAQs`);
  if ((html.match(/<img /g) || []).length !== 4) throw new Error(`${marker} must contain 4 images`);
  if (/<br\s*\/?\s*>/i.test(html) || /\p{Extended_Pictographic}/u.test(html)) throw new Error(`${marker} contains unsupported HTML or emoji`);
  if (html.indexOf('<img ') < html.indexOf('Agenda')) throw new Error(`${marker} gallery must follow the agenda`);
  for (const event of events) {
    const match = event.affiliateUrl.match(AFFILIATE_RE);
    if (!match || match[1] !== event.xceedId || !html.includes(event.affiliateUrl)) throw new Error(`${marker} missing affiliate link ${event.xceedId}`);
  }
}

function coverLines(id: SeriesId, locale: Locale): [string, string] {
  const title = TITLES[locale][id];
  const separators = [' - ', ' | '];
  for (const separator of separators) {
    const parts = title.split(separator);
    if (parts.length > 1) return [parts[0], parts.slice(1).join(separator)];
  }
  if (title.length < 25) return [title, UI[locale].thisWeek];
  const words = title.split(' ');
  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')];
}

async function makeCover(output: string, id: SeriesId, locale: Locale, range: string): Promise<void> {
  const width = 2160;
  const height = 1080;
  const [lineOne, lineTwo] = coverLines(id, locale);
  const titleSize = lineOne.length > 25 ? 116 : lineOne.length > 18 ? 140 : 172;
  const background = await sharp(SERIES[id].background).resize(width, height, { fit: 'cover', position: 'attention' }).modulate({ saturation: 0.9, brightness: 0.82 }).linear(1.08, -8).toBuffer();
  const accentA = id === 'aria-week' || id === 'serate-18-plus-week' ? '#ff785e' : '#ff6b62';
  const accentB = id === 'just-me-week' || id === 'serate-21-plus-week' ? '#b693ff' : '#78d7ff';
  const serif = id === 'aperitivi-week';
  const overlay = Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="veil" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#050509" stop-opacity=".74"/><stop offset=".5" stop-color="#07070b" stop-opacity=".48"/><stop offset="1" stop-color="#050509" stop-opacity=".72"/></linearGradient><linearGradient id="accent"><stop offset="0" stop-color="${accentA}"/><stop offset="1" stop-color="${accentB}"/></linearGradient><filter id="shadow"><feGaussianBlur in="SourceAlpha" stdDeviation="10"/><feOffset dy="8"/><feComponentTransfer><feFuncA type="linear" slope=".7"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="2160" height="1080" fill="url(#veil)"/><rect x="58" y="54" width="2044" height="972" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="2"/><rect x="58" y="54" width="430" height="4" fill="${accentA}"/><rect x="1672" y="54" width="430" height="4" fill="${accentB}"/><text x="108" y="128" fill="#fff" font-family="Bahnschrift,Arial" font-size="31" font-weight="600" letter-spacing="6">MILAN NIGHTLIFE</text><text x="108" y="169" fill="#fff" fill-opacity=".72" font-family="Bahnschrift,Arial" font-size="20" letter-spacing="5">EVENT SERVICE</text><text x="2052" y="128" text-anchor="end" fill="#fff" font-family="Bahnschrift,Arial" font-size="23" letter-spacing="5">MILANO 2026</text><g filter="url(#shadow)"><text x="1080" y="470" text-anchor="middle" fill="#fff" font-family="${serif ? "Georgia,'Times New Roman',serif" : "Bahnschrift,'Arial Narrow',sans-serif"}" font-size="${titleSize}" font-style="${serif ? 'italic' : 'normal'}" font-weight="700">${escapeHtml(lineOne)}</text><text x="1080" y="575" text-anchor="middle" fill="#fff" font-family="Bahnschrift,Arial" font-size="66" font-weight="600" letter-spacing="12">${escapeHtml(lineTwo.toUpperCase())}</text></g><rect x="674" y="632" width="812" height="3" fill="url(#accent)"/><text x="1080" y="716" text-anchor="middle" fill="#fff" font-family="Bahnschrift,Arial" font-size="48" font-weight="600" letter-spacing="7">${escapeHtml(range.toUpperCase())}</text><text x="1080" y="800" text-anchor="middle" fill="#fff" fill-opacity=".88" font-family="Bahnschrift,Arial" font-size="30" font-weight="500" letter-spacing="6">JUST ME  /  PINETA  /  ARIA</text><rect x="550" y="858" width="1060" height="92" fill="#050509" fill-opacity=".68" stroke="#fff" stroke-opacity=".38" stroke-width="2"/><rect x="550" y="858" width="8" height="92" fill="${accentA}"/><rect x="1602" y="858" width="8" height="92" fill="${accentB}"/><text x="1080" y="904" text-anchor="middle" fill="#fff" font-family="Bahnschrift,Arial" font-size="27" font-weight="600" letter-spacing="3">WHATSAPP  ${PHONE}</text><text x="1080" y="937" text-anchor="middle" fill="#fff" fill-opacity=".76" font-family="Bahnschrift,Arial" font-size="20" letter-spacing="6">NIGHTLIFEMILAN.COM</text></svg>`);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await sharp(background).composite([{ input: overlay }]).sharpen({ sigma: 0.8, m1: 0.7, m2: 1.6 }).jpeg({ quality: 93, chromaSubsampling: '4:4:4' }).toFile(output);
}

async function publish(payload: Record<string, unknown>, secret: string): Promise<Record<string, unknown>> {
  const response = await fetch(PUBLISH_URL, { method: 'POST', headers: { Authorization: `Bearer ${secret}`, 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(`${response.status}: ${result.error || JSON.stringify(result)}`);
  return result;
}

interface ExistingCuratedEvent {
  id: string;
  url?: string;
  name?: { text?: string };
  description?: { html?: string };
}

async function fetchExistingCuratedEvents(token: string): Promise<ExistingCuratedEvent[]> {
  const base = `${EVENTBRITE_API}/organizations/${EVENTBRITE_ORG_ID}/events/?status=live&time_filter=current_future&order_by=start_asc&page_size=200`;
  const events: ExistingCuratedEvent[] = [];
  let continuation: string | undefined;
  let pages = 0;
  do {
    const url = continuation ? `${base}&continuation=${encodeURIComponent(continuation)}` : base;
    const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error(`Eventbrite preflight failed: ${response.status}`);
    const body = await response.json();
    events.push(...(body.events || []));
    continuation = body.pagination?.has_more_items ? body.pagination?.continuation : undefined;
    pages += 1;
  } while (continuation && pages < 20);
  if (continuation) throw new Error('Eventbrite preflight exceeded pagination guard');
  return events;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  await loadLocalEnv();
  const raw = await scoutXceedEvents(Math.max(7, daySequence(args.from, args.through).length + 1));
  const events = curate(raw, args.from, args.through);
  if (!events.length) throw new Error('No Xceed events available in the requested window');
  const artifactDir = path.resolve('artifacts/curated-weekly-series');
  await fs.mkdir(artifactDir, { recursive: true });
  await fs.writeFile(path.join(artifactDir, 'xceed-snapshot.json'), `${JSON.stringify({ capturedAt: new Date().toISOString(), events }, null, 2)}\n`, 'utf8');
  const manifest: Array<Record<string, unknown>> = [];
  const selectedSeries = args.series || SERIES_IDS;
  const secret = args.execute ? process.env.CRON_SECRET : undefined;
  const eventbriteToken = args.execute ? getEventbriteToken() : undefined;
  if (args.execute && !secret) throw new Error('CRON_SECRET is required for execution');
  if (args.execute && !eventbriteToken) throw new Error('EVENTBRITE_TOKEN is required for execution');
  const existingEvents = eventbriteToken ? await fetchExistingCuratedEvents(eventbriteToken) : [];
  const existingMarkers = new Map<string, ExistingCuratedEvent>();
  const existingTitles = new Map<string, ExistingCuratedEvent>();
  for (const event of existingEvents) {
    const html = event.description?.html || '';
    for (const match of html.matchAll(/nlm:curated=[a-z0-9-]+-(?:it|en|es|pt|fr|de)-\d{4}-\d{2}-\d{2}/g)) {
      existingMarkers.set(match[0], event);
    }
    if (event.name?.text) existingTitles.set(event.name.text, event);
  }
  let prepared = 0;

  for (const publicationDate of daySequence(args.from, args.through)) {
    for (const locale of args.locales) {
      for (const id of selectedSeries) {
        if (args.limit && prepared >= args.limit) break;
        const selected = events.filter((event) => event.localDate >= publicationDate && matchesSeries(event, id));
        if (!selected.length) continue;
        const range = rangeLabel(publicationDate, args.through, locale);
        const title = `${TITLES[locale][id]} | ${range}`;
        const summary = summaryFor(TITLES[locale][id], range, locale);
        const marker = `nlm:curated=${id}-${locale}-${publicationDate}`;
        const descriptionHtml = buildHtml(id, locale, publicationDate, args.through, selected, marker, summary);
        if (title.length > 75 || summary.length > 140) throw new Error(`${marker} title/summary exceeds Eventbrite limits: ${title.length}/${summary.length}`);
        const cover = path.join(artifactDir, `${publicationDate}-${id}-${locale}.jpg`);
        const htmlPath = path.join(artifactDir, 'html', `${publicationDate}-${id}-${locale}.html`);
        await makeCover(cover, id, locale, range);
        await fs.mkdir(path.dirname(htmlPath), { recursive: true });
        await fs.writeFile(htmlPath, `${descriptionHtml}\n`, 'utf8');
        const entry: Record<string, unknown> = { publicationDate, locale, series: id, title, summary, marker, eventCount: selected.length, xceedIds: selected.map((event) => event.xceedId), cover, htmlPath, descriptionLength: descriptionHtml.length };
        if (args.execute) {
          const existing = existingMarkers.get(marker) || existingTitles.get(title);
          if (existing) {
            entry.result = { ok: true, skipped: true, reason: 'already-present', eventId: existing.id, url: existing.url };
          } else {
            const result = await publish({
              title, summary, descriptionHtml, marker, date: publicationDate, lang: locale,
              ageRestriction: SERIES[id].age, categoryId: SERIES[id].category,
              ticketName: UI[locale].ticketName, ticketDescription: UI[locale].ticketDescription,
              coverBase64: (await fs.readFile(cover)).toString('base64'), coverContentType: 'image/jpeg', coverFilename: path.basename(cover),
              dedupePrechecked: true,
            }, secret!);
            entry.result = result;
            const created = { id: String(result.eventId || ''), url: typeof result.url === 'string' ? result.url : undefined };
            existingMarkers.set(marker, created);
            existingTitles.set(title, created);
          }
        }
        manifest.push(entry);
        prepared += 1;
      }
    }
  }
  const manifestPath = path.join(artifactDir, `manifest-${args.locales.join('-')}${args.execute ? '-published' : '-dry'}.json`);
  await fs.writeFile(manifestPath, `${JSON.stringify({ execute: args.execute, from: args.from, through: args.through, count: manifest.length, entries: manifest }, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ ok: true, execute: args.execute, count: manifest.length, manifest: manifestPath, byLocale: Object.fromEntries(args.locales.map((locale) => [locale, manifest.filter((entry) => entry.locale === locale).length])) }, null, 2));
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) }));
  process.exitCode = 1;
});
