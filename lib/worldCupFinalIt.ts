import type { LocalizedEventContent } from './localizedEventContent';

export const WORLD_CUP_FINAL_CANONICAL_SLUG = 'world-cup-final-big-screen-milan-just-me-july-19-2026';
export const WORLD_CUP_FINAL_IT_SLUG = 'finale-coppa-del-mondo-maxischermo-milano-just-me-19-luglio-2026';
export const WORLD_CUP_FINAL_IT_URL = `https://nightlifemilan.com/it/events/${WORLD_CUP_FINAL_IT_SLUG}`;
export const WORLD_CUP_FINAL_AFFILIATE_URL = 'https://xceed.me/en/milano/event/fifa-2026-final/238627/channel/nightlifemilan-1';
export const WORLD_CUP_FINAL_PHONE = '+39 351 912 7047';

export const WORLD_CUP_FINAL_COVER_IT = {
  src: '/images/events/generated/just-me-finale-coppa-mondo-cover-2x1-it-v4.jpg',
  title: 'Finale Coppa del Mondo su maxischermo al Just Me Milano',
  alt: 'Cover di Spagna-Argentina al Just Me Milano: domenica 19 luglio, apertura 19:30 e diretta alle 21:00',
  description: 'Cover 2:1 ricomposta dalla locandina originale con Just Me, i due giocatori, data e orari italiani verificati.',
  width: 2752,
  height: 1376,
} as const;

export const WORLD_CUP_FINAL_POSTER_IT = {
  src: '/images/events/generated/just-me-finale-coppa-mondo-poster-5x4-it-v5.jpg',
  title: 'Locandina finale Spagna-Argentina al Just Me Milano',
  alt: 'Locandina 5:4 di Spagna-Argentina al Just Me Milano con i due giocatori, Torre Branca, data, orari e contatti',
  description: 'Ricomposizione 5:4 della locandina originale, con artwork a pieno formato, data, orari, WhatsApp e sito corretti.',
  width: 1600,
  height: 1280,
} as const;

export const WORLD_CUP_FINAL_MOOD_IMAGES_IT = [
  {
    src: '/images/events/generated/just-me-finale-coppa-mondo-location-5x4-it-v5.jpg',
    title: 'Torre Branca accanto al Just Me Milano',
    alt: 'Torre Branca illuminata di rosa tra alberi e cielo serale nel Parco Sempione a Milano',
    description: 'Ricomposizione 5:4 da fotografia reale della Torre Branca illuminata nel Parco Sempione.',
    width: 1400,
    height: 1120,
  },
  {
    src: '/images/events/generated/just-me-finale-coppa-mondo-aperitivo-real-5x4-it-v5.jpg',
    title: 'Buffet aperitivo al Just Me Milano',
    alt: 'Buffet del Just Me Milano con pietanze, dessert e due addette al servizio',
    description: 'Ricomposizione 5:4 da fotografia reale del buffet aperitivo interno del Just Me Milano.',
    width: 1400,
    height: 1120,
  },
  {
    src: '/images/events/generated/just-me-finale-coppa-mondo-lounge-tavoli-real-5x4-it-v5.jpg',
    title: 'Lounge e tavoli del Just Me Milano',
    alt: 'Lounge del Just Me Milano con divani neri, tavolini, luci rosa e insegne del locale',
    description: 'Fotografia reale dell’area lounge e dei tavoli del Just Me Milano.',
    width: 1400,
    height: 1120,
  },
  {
    src: '/images/events/generated/just-me-finale-coppa-mondo-sala-musica-real-5x4-it-v5.jpg',
    title: 'Atmosfera serale sotto la Torre Branca',
    alt: 'Lounge esterna con ospiti, divani e tavolo apparecchiato davanti alla Torre Branca illuminata di rosa',
    description: 'Fotografia reale dell’atmosfera serale nella lounge esterna accanto alla Torre Branca.',
    width: 1400,
    height: 1120,
  },
] as const;

export const worldCupFinalIt: LocalizedEventContent = {
  locale: 'it',
  canonicalSlug: WORLD_CUP_FINAL_CANONICAL_SLUG,
  title: 'Finale Coppa del Mondo su maxischermo al Just Me Milano',
  metaTitle: 'Finale Mondiale su maxischermo Milano | Just Me',
  metaDescription: 'Spagna-Argentina su maxischermo al Just Me Milano il 19 luglio, dalle 19:30. Prenota su WhatsApp +39 351 912 7047.',
  seoSummary: 'Spagna-Argentina su maxischermo al Just Me Milano il 19 luglio, dalle 19:30. Prenotazioni WhatsApp +39 351 912 7047.',
  answerFirst: 'Domenica 19 luglio 2026 il Just Me Milano trasmette Spagna-Argentina, finale della Coppa del Mondo 2026, su maxischermo nel garden ai piedi della Torre Branca. Apertura alle 19:30, calcio d’inizio alle 21:00, ingresso 21+ e dress code elegante con pantaloni lunghi obbligatori per gli uomini.',
  bookingIntro: 'Acquista il biglietto o il tavolo solo dal link Xceed affiliato Nightlife Milan. La registrazione Eventbrite non è un biglietto e non garantisce l’ingresso. Dopo il pagamento invia la conferma Xceed su WhatsApp al +39 351 912 7047 con nome, numero di persone, formula acquistata e orario di arrivo.',
  venueDescription: 'Il Just Me Milano si trova nel Parco Sempione, ai piedi della Torre Branca. Il garden ospita arrivo, aperitivo, maxischermo e tavoli; dopo la finale la serata continua con Uptown Nights.',
  leadPosterAfterBooking: true,
  programmeBeforeSections: true,
  sections: [
    {
      title: 'Dress code al Just Me Milano per la finale',
      body: 'Il dress code è elegante e coerente con aperitivo, tavoli e club. Per gli uomini i pantaloni lunghi sono obbligatori. Scegli un look curato e porta un documento valido: l’accesso resta soggetto alle regole e alla selezione del Just Me Milano.',
    },
    {
      title: 'Target della serata: pubblico 21+',
      body: 'La serata è riservata a un pubblico adulto 21+. All’ingresso è richiesto un documento valido; biglietto e prenotazione non sostituiscono il controllo dell’età e la selezione del Just Me Milano.',
    },
    {
      title: 'Mood e atmosfera: maxischermo, aperitivo e tavoli',
      body: 'Il mood passa dall’arrivo nel garden sotto la Torre Branca alla tensione della finale su maxischermo. Dalle 19:30 sono disponibili l’aperitivo con buffet e un drink e, su prenotazione, la cena servita indicata da Xceed. Gruppi e tavoli seguono la partita nella stessa atmosfera serale del Just Me.',
    },
    {
      title: 'Musica dopo la finale: Uptown Nights',
      body: 'Dopo Spagna-Argentina il Just Me continua con Uptown Nights fino alle 05:00. La programmazione verificata comprende house, hip-hop, hit, EDM e reggaeton. In caso di supplementari o rigori, il passaggio al DJ set si adatta alla durata effettiva della partita.',
    },
  ],
  programme: [
    { start: '19:30', end: '20:15', title: 'Apertura del garden, check-in e assegnazione dei tavoli' },
    { start: '20:15', end: '20:45', title: 'Aperitivo, cocktail e collegamento pre-partita sul maxischermo' },
    { start: '20:45', end: '21:00', title: 'Sistemazione del pubblico e ultimi ingressi consigliati' },
    { start: '21:00', title: 'Spagna-Argentina in diretta su maxischermo fino al termine, inclusi eventuali supplementari e rigori' },
    { start: 'Dopo il fischio finale', title: 'Passaggio dalla proiezione a Uptown Nights' },
    { start: 'Fino alle 05:00', title: 'DJ set con house, hip-hop, hit, EDM e reggaeton' },
  ],
  offers: [
    { name: 'Aperitivo + 1 drink', price: 15, category: 'ticket', details: 'Ingresso dalle 19:30, buffet aperitivo e un drink.' },
    { name: 'Club + 1 drink', price: 15, category: 'ticket', details: 'Ingresso club dalle 22:30 e un drink.' },
    { name: 'Tavolo Dance Floor', price: 320, category: 'table' },
    { name: 'Tavolo VIP Area', price: 640, category: 'table' },
    { name: 'Tavolo Super VIP - seconda fila', price: 1280, category: 'table' },
    { name: 'Tavolo Super VIP - prima fila', price: 3200, category: 'table' },
    { name: 'Tavolo DJ', price: 5000, category: 'table' },
  ],
  affiliateUrl: WORLD_CUP_FINAL_AFFILIATE_URL,
  faqs: [
    { question: 'Dove vedere la finale della Coppa del Mondo a Milano?', answer: 'La finale Spagna-Argentina viene trasmessa su maxischermo al Just Me Milano, nel garden ai piedi della Torre Branca, domenica 19 luglio 2026.' },
    { question: 'Quali squadre giocano la finale mondiale 2026?', answer: 'La finale è Spagna-Argentina. Il calcio d’inizio è alle 21:00, ora di Milano, domenica 19 luglio 2026.' },
    { question: 'Quando si gioca Spagna-Argentina a Milano?', answer: 'Spagna-Argentina si gioca domenica 19 luglio 2026. Il Just Me apre alle 19:30 e la diretta sul maxischermo comincia prima del calcio d’inizio delle 21:00.' },
    { question: 'A che ora inizia la finale della Coppa del Mondo?', answer: 'Il calcio d’inizio è previsto alle 21:00. Per check-in, aperitivo e tavoli è consigliato arrivare tra le 19:30 e le 20:30.' },
    { question: 'A che ora apre il Just Me per la finale?', answer: 'L’apertura è alle 19:30, come indicato dalla pagina Xceed della domenica. È l’orario previsto per check-in, aperitivo e assegnazione dei tavoli.' },
    { question: 'La finale viene trasmessa davvero su maxischermo?', answer: 'Sì. Spagna-Argentina è il contenuto principale della serata e viene proposta in diretta su maxischermo nel garden del Just Me Milano.' },
    { question: 'C’è l’aperitivo prima di Spagna-Argentina?', answer: 'Sì. Xceed indica Aperitivo + 1 drink a 15 EUR, con ingresso dalle 19:30 e accesso al buffet aperitivo.' },
    { question: 'Quanto costa l’aperitivo per la finale?', answer: 'La formula verificata su Xceed costa 15 EUR e include aperitivo e un drink. Prezzo e disponibilità vanno ricontrollati al momento dell’acquisto.' },
    { question: 'Quanto costa l’ingresso club al Just Me?', answer: 'Xceed mostra Club + 1 drink a 15 EUR, con ingresso dalle 22:30. La formula è distinta dall’aperitivo delle 19:30.' },
    { question: 'Si può cenare al Just Me prima della partita?', answer: 'La pagina Xceed indica la possibilità di prenotare una cena servita. Menu, orario e disponibilità devono essere confermati prima dell’acquisto.' },
    { question: 'Cosa succede dopo la finale Spagna-Argentina?', answer: 'Dopo il fischio finale continua Uptown Nights con DJ set, tavoli e bottle service fino alle 05:00.' },
    { question: 'Che musica c’è dopo la partita?', answer: 'L’afterparty propone house, hip-hop, hit, EDM e reggaeton, in linea con la programmazione Uptown Nights della domenica.' },
    { question: 'La serata al Just Me è 21+?', answer: 'Sì. La pagina Xceed indica 21+. Porta un documento valido: biglietto o prenotazione non sostituiscono il controllo dell’età all’ingresso.' },
    { question: 'Qual è il dress code per la finale al Just Me?', answer: 'Il dress code è elegante. È consigliato un look curato adatto ad aperitivo e club; l’ingresso resta soggetto alla selezione del locale.' },
    { question: 'Gli uomini possono entrare con pantaloncini corti?', answer: 'No. Xceed specifica pantaloni lunghi obbligatori per gli uomini. Il requisito resta valido anche durante la proiezione della finale.' },
    { question: 'Posso prenotare un tavolo per vedere la finale?', answer: 'Sì. Sono disponibili tavoli Dance Floor, VIP Area, Super VIP e DJ. Chiedi conferma della posizione e della visuale prima dell’acquisto.' },
    { question: 'Quanto costano i tavoli VIP al Just Me?', answer: 'Xceed mostra Dance Floor a 320 EUR, VIP Area a 640 EUR, Super VIP da 1.280 o 3.200 EUR e DJ Table a 5.000 EUR.' },
    { question: 'Il tavolo garantisce la visuale sul maxischermo?', answer: 'La visuale dipende dalla posizione assegnata. Prima di acquistare scrivi su WhatsApp al +39 351 912 7047 e chiedi conferma per il tavolo scelto.' },
    { question: 'Dove compro i biglietti per Spagna-Argentina al Just Me?', answer: 'Usa esclusivamente il link Xceed affiliato Nightlife Milan presente nella pagina e controlla data, formula e numero di persone prima del pagamento.' },
    { question: 'La registrazione Eventbrite vale come biglietto?', answer: 'No. Eventbrite raccoglie la richiesta di partecipazione ma non vale come ingresso. Biglietto o tavolo devono essere acquistati tramite Xceed.' },
    { question: 'Perché devo inviare la conferma Xceed su WhatsApp?', answer: 'Serve a verificare data, formula e pagamento. Invia la conferma al +39 351 912 7047 con nome e numero di persone.' },
    { question: 'Dove si trova il Just Me Milano?', answer: 'Il Just Me si trova in Viale Luigi Camoens 2, 20121 Milano, nel Parco Sempione accanto alla Torre Branca.' },
    { question: 'Come raggiungere il Just Me per la finale?', answer: 'L’indirizzo è Viale Luigi Camoens 2, 20121 Milano, nel Parco Sempione. Verifica il percorso aggiornato e i trasporti disponibili prima di partire.' },
    { question: 'Cosa succede in caso di supplementari o rigori?', answer: 'La proiezione continua fino al termine effettivo della finale. Il passaggio al DJ set si adatta alla durata della partita.' },
    { question: 'Come chiedo assistenza per biglietti e tavoli?', answer: 'Scrivi su WhatsApp al +39 351 912 7047 prima dell’acquisto, indicando nome, numero di persone e formula che stai valutando.' },
  ],
};

export interface WorldCupKeywordEventIt {
  key: string;
  keyword: string;
  title: string;
  summary: string;
  faqLeads: readonly {
    question: string;
    answer: string;
  }[];
}

export const WORLD_CUP_KEYWORD_EVENTS_IT: readonly WorldCupKeywordEventIt[] = [
  {
    key: 'finale-coppa-mondo-maxischermo-milano',
    keyword: 'finale Coppa del Mondo su maxischermo a Milano',
    title: 'Finale Mondiale su maxischermo Milano | Just Me',
    summary: 'Finale su maxischermo al Just Me Milano, domenica 19 luglio dalle 19:30. WhatsApp +39 351 912 7047.',
    faqLeads: [
      { question: 'Dove vedere la finale Coppa del Mondo su maxischermo a Milano?', answer: 'La finale Coppa del Mondo su maxischermo a Milano è al Just Me, nel garden sotto la Torre Branca, domenica 19 luglio 2026. Apertura alle 19:30 e Spagna-Argentina in diretta alle 21:00.' },
      { question: 'La finale viene trasmessa su maxischermo al Just Me Milano?', answer: 'Sì. La proiezione di Spagna-Argentina su maxischermo è il centro della serata al Just Me Milano, domenica 19 luglio 2026, dalle 21:00 fino al termine della partita.' },
      { question: 'A che ora apre il Just Me per la finale su maxischermo?', answer: 'Il Just Me Milano apre alle 19:30 per check-in e aperitivo. La finale su maxischermo inizia alle 21:00 e prosegue fino al termine effettivo dell’incontro.' },
      { question: 'A che ora inizia la finale della Coppa del Mondo a Milano?', answer: 'Il calcio d’inizio di Spagna-Argentina è alle 21:00, ora di Milano, domenica 19 luglio 2026. L’apertura del Just Me è alle 19:30.' },
      { question: 'Cosa succede se la finale va ai supplementari o ai rigori?', answer: 'Il maxischermo resta sulla partita fino al termine, inclusi eventuali supplementari e rigori. Uptown Nights comincia dopo il fischio finale.' },
    ],
  },
  {
    key: 'dove-vedere-spagna-argentina-milano',
    keyword: 'dove vedere Spagna-Argentina a Milano',
    title: 'Dove vedere Spagna-Argentina a Milano | Just Me',
    summary: 'Spagna-Argentina su maxischermo al Just Me Milano, domenica 19 luglio. WhatsApp +39 351 912 7047.',
    faqLeads: [
      { question: 'Dove vedere Spagna-Argentina a Milano domenica 19 luglio?', answer: 'Per chi cerca dove vedere Spagna-Argentina a Milano, il Just Me trasmette la finale su maxischermo nel garden domenica 19 luglio 2026. Apertura alle 19:30 e calcio d’inizio alle 21:00.' },
      { question: 'Quando si gioca Spagna-Argentina a Milano?', answer: 'Spagna-Argentina è in programma domenica 19 luglio 2026 alle 21:00, ora di Milano. Il Just Me apre alle 19:30 per arrivo e aperitivo.' },
      { question: 'Posso vedere Spagna-Argentina durante l’aperitivo?', answer: 'L’aperitivo comincia dalle 19:30 e precede la diretta di Spagna-Argentina delle 21:00. La formula corrente Xceed comprende buffet aperitivo e un drink.' },
      { question: 'A che ora conviene arrivare per Spagna-Argentina?', answer: 'L’apertura è alle 19:30. Arrivare prima delle 21:00 lascia il tempo necessario per check-in e aperitivo prima di Spagna-Argentina.' },
      { question: 'Dove acquisto biglietti o tavoli per Spagna-Argentina?', answer: 'Usa soltanto il link Xceed affiliato Nightlife Milan presente nei contatti. Dopo il pagamento invia la conferma su WhatsApp al +39 351 912 7047.' },
    ],
  },
  {
    key: 'finale-mondiali-2026-milano',
    keyword: 'finale Mondiali 2026 Milano',
    title: 'Finale Mondiali 2026 Milano | Just Me, 19 luglio',
    summary: 'Finale Mondiali 2026: Spagna-Argentina su maxischermo al Just Me Milano. WhatsApp +39 351 912 7047.',
    faqLeads: [
      { question: 'Dove vedere la finale Mondiali 2026 a Milano?', answer: 'La finale Mondiali 2026 a Milano viene trasmessa su maxischermo al Just Me domenica 19 luglio. Il garden apre alle 19:30; Spagna-Argentina comincia alle 21:00 e la serata è 21+.' },
      { question: 'Quando si svolge la finale dei Mondiali 2026 a Milano?', answer: 'La finale si svolge domenica 19 luglio 2026. Al Just Me Milano l’apertura è alle 19:30 e la diretta su maxischermo comincia alle 21:00.' },
      { question: 'Quali squadre giocano la finale mondiale 2026?', answer: 'La finale indicata per la serata è Spagna-Argentina. La proiezione al Just Me Milano parte alle 21:00 e continua fino al termine della partita.' },
      { question: 'Cosa succede al Just Me dopo il fischio finale?', answer: 'Dopo la partita il Just Me continua con Uptown Nights. Il passaggio al DJ set si adatta all’eventuale presenza di supplementari e rigori.' },
      { question: 'Fino a che ora continua la serata del 19 luglio?', answer: 'Uptown Nights continua fino alle 05:00, orario verificato sulla pagina Xceed corrente. La proiezione della finale termina invece con il fischio finale.' },
    ],
  },
  {
    key: 'partita-maxischermo-milano',
    keyword: 'partita su maxischermo Milano',
    title: 'Partita su maxischermo Milano | Spagna-Argentina',
    summary: 'Partita su maxischermo al Just Me: Spagna-Argentina, apertura alle 19:30. WhatsApp +39 351 912 7047.',
    faqLeads: [
      { question: 'Quale partita su maxischermo vedere a Milano il 19 luglio?', answer: 'La partita su maxischermo a Milano è Spagna-Argentina, finale della Coppa del Mondo 2026, al Just Me. Domenica 19 luglio il garden apre alle 19:30 e la diretta comincia alle 21:00.' },
      { question: 'C’è l’aperitivo prima della partita su maxischermo?', answer: 'Sì. Il Just Me apre alle 19:30 con aperitivo; la partita su maxischermo comincia alle 21:00. La formula corrente Xceed comprende buffet e un drink.' },
      { question: 'Quanto costa l’aperitivo per la partita?', answer: 'Xceed mostra Aperitivo + 1 drink a 15 EUR. Prezzo e disponibilità devono essere ricontrollati nella pagina di acquisto al momento della prenotazione.' },
      { question: 'Si può cenare al Just Me prima della diretta?', answer: 'La pagina Xceed corrente indica la possibilità di prenotare una cena servita. Menu, orario e disponibilità vanno confermati prima dell’acquisto.' },
      { question: 'Posso prenotare un tavolo VIP per la finale?', answer: 'Xceed propone tavoli Dance Floor, VIP Area, Super VIP e DJ. Prima di acquistare, chiedi su WhatsApp conferma della formula e della posizione disponibile.' },
    ],
  },
  {
    key: 'just-me-finale-mondiale',
    keyword: 'Just Me Milano finale mondiale',
    title: 'Just Me Milano | Finale mondiale Spagna-Argentina',
    summary: 'Finale Spagna-Argentina su maxischermo e Uptown Nights al Just Me Milano. WhatsApp +39 351 912 7047.',
    faqLeads: [
      { question: 'Come vedere la finale mondiale al Just Me Milano?', answer: 'Il Just Me Milano ospita la finale mondiale Spagna-Argentina su maxischermo domenica 19 luglio 2026. Apertura alle 19:30, diretta alle 21:00 e Uptown Nights dopo la partita fino alle 05:00.' },
      { question: 'Qual è l’età minima per la finale al Just Me?', answer: 'La serata è 21+. Porta un documento valido: registrazione, biglietto o tavolo non sostituiscono il controllo dell’età all’ingresso.' },
      { question: 'Qual è il dress code per la finale al Just Me?', answer: 'Il dress code è elegante. L’abbigliamento deve essere curato e coerente con aperitivo e club; l’accesso resta soggetto alla selezione del locale.' },
      { question: 'Gli uomini possono entrare con pantaloncini corti?', answer: 'No. La pagina Xceed richiede pantaloni lunghi per gli uomini. La regola vale per tutta la serata, inclusa la proiezione della finale.' },
      { question: 'La registrazione Eventbrite vale come biglietto?', answer: 'No. La registrazione Eventbrite è una richiesta informativa e non consente l’ingresso. Biglietto o tavolo vanno acquistati tramite il link Xceed indicato.' },
    ],
  },
];

export const WORLD_CUP_ORDER_CONFIRMATION_IT = 'Spagna-Argentina al Just Me Milano, domenica 19 luglio 2026. Apertura alle 19:30, diretta alle 21:00, ingresso 21+ e dress code elegante; pantaloni lunghi obbligatori per gli uomini.';
