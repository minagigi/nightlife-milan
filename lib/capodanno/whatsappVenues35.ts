import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type {
  CapodannoEventTier,
  CapodannoLocalizedEventContent,
  CapodannoMenuCard,
  CapodannoScheduleStep,
} from '@/lib/capodanno/repvblic35';

const JUSTME_MENU_IMG = '/images/events/capodanno-2027-menus/justme-nye-2027-gala-menu-300.webp';
const PELLEDOCA_MENU_IMG = '/images/events/capodanno-2027-menus/pelledoca-nye-2027-menu-cenone-120.webp';
const MAGAZZINI_MENU_IMG = '/images/events/capodanno-2027-menus/magazzini-generali-nye-2027-menu-80.webp';
const MAGAZZINI_TABLES_IMG = '/images/events/capodanno-2027-menus/magazzini-generali-nye-2027-tavoli.webp';

export interface WaLocaleDict {
  nyePrefix: string;
  milano: string;
  dec31: string;
  confirmedTag: string;
  benchmarkTag: string;
  pendingTag: string;
  uponRequest: string;
  perPerson: string;
  fromWord: string;
  scheduleWord: string;
  menuWord: string;
  vipTablesWord: string;
  tablePista: string;
  tableBalcony: string;
  tableStage: string;
  minSpendShort: string;
  dressCodeElegant: string;
  dressCodeBlackTie: string;
  dressCodeSartorial: string;
  dressCodeCreative: string;
  whatsappBook: string;
  benchmarkDisclaimer: string;
  pendingProgramSummary: string;
  pendingProgramDesc: string;
  armaniTbaSub: string;
  armaniTbaDesc: string;
  armaniTbaTierLabel: string;
  armaniTbaSource: string;
  theClubSub: string;
  theClubDesc: string;
  theClubFormat: string;
  theClubEntryLabel: string;
  theClubEntryDesc: string;
  theClubBuffetLabel: string;
  theClubBuffetDesc: string;
  theClubPriveLabel: string;
  theClubPriveDesc: string;
  theClubTablesLabel: string;
  theClubTablesDesc: string;
  theClubSource: string;
  justMeSub: string;
  justMeDesc: string;
  justMeFormat: string;
  justMeClub: string;
  justMeClubDesc: string;
  justMeGala: string;
  justMeGalaDesc: string;
  justMeTables: string;
  justMeTablesDesc: string;
  justMeCombo: string;
  justMeComboDesc: string;
  justMeMenuHeading: string;
  justMeMenuTitle: string;
  justMeMenuSub: string;
  justMeCourses: [string, string][];
  justMeBev: string;
  justMeSteps: [string, string, string, string];
  justMeSource: string;
  pelledocaSub: string;
  pelledocaDesc: string;
  pelledocaFormat: string;
  pelledocaDinner: string;
  pelledocaDinnerDesc: string;
  pelledocaClub: string;
  pelledocaClubDesc: string;
  pelledocaMenuHeading: string;
  pelledocaMenuTitle: string;
  pelledocaMenuSub: string;
  pelledocaCourses: [string, string][];
  pelledocaBev: string;
  pelledocaSteps: [string, string, string, string];
  pelledocaSource: string;
  magazziniSub: string;
  magazziniDesc: string;
  magazziniFormat: string;
  magazziniClub: string;
  magazziniClubDesc: string;
  magazziniBuffet: string;
  magazziniBuffetDesc: string;
  magazziniPista: string;
  magazziniPistaDesc: string;
  magazziniBalc: string;
  magazziniBalcDesc: string;
  magazziniPalco: string;
  magazziniPalcoDesc: string;
  magazziniMenuHeading: string;
  magazziniMenuTitle: string;
  magazziniMenuSub: string;
  magazziniCourses: [string, string][];
  magazziniTablesTitle: string;
  magazziniTablesSub: string;
  magazziniTablesRows: [string, string][];
  magazziniTablesNote: string;
  magazziniSteps: [string, string, string, string];
  magazziniSource: string;
  gattopardoSub: string;
  gattopardoDesc: string;
  gattopardoFormat: string;
  gattopardoMinSpend: string;
  gattopardoMinSpendDesc: string;
  gattopardoDomes: string;
  gattopardoDomesDesc: string;
  gattopardoSteps: [string, string, string];
  gattopardoSource: string;
  gardaDesc: string;
  gardaFormat: string;
  gardaClub: string;
  gardaBuffet: string;
  gardaGala: string;
  gardaTables: string;
  ariaDesc: string;
  fiftyFiveDesc: string;
  tocquevilleDesc: string;
  hollywoodDesc: string;
  elevenDesc: string;
  afterDinnerLabel: string;
  buffetLabel: string;
  galaDinnerLabel: string;
  clubDetails: string;
  buffetDetails: string;
  galaDetails: string;
  vipTablesDetails: string;
}

const IT: WaLocaleDict = {
  nyePrefix: 'Capodanno 2027',
  milano: 'Milano',
  dec31: '31 dicembre 2026',
  confirmedTag: 'Prezzi ufficiali confermati 2027',
  benchmarkTag: 'Tariffe indicative passata edizione (da confermare)',
  pendingTag: 'Programma e prezzi 2027 in aggiornamento',
  uponRequest: 'Su richiesta',
  perPerson: 'a persona',
  fromWord: 'da',
  scheduleWord: 'Programma 31 Dicembre 2026',
  menuWord: 'Menù Ufficiale Capodanno 2027',
  vipTablesWord: 'Tavoli VIP Privé',
  tablePista: 'Tavolo Pista',
  tableBalcony: 'Tavolo Balconata',
  tableStage: 'Tavolo Privé Palco',
  minSpendShort: 'Min. spesa 600€',
  dressCodeElegant: 'Elegante / Abito da Sera',
  dressCodeBlackTie: 'Black Tie / Tema Il Grande Gatsby / Elegante Rigoroso',
  dressCodeSartorial: 'Alta Moda / Sartoriale Rigoroso',
  dressCodeCreative: 'Creativo / Clubwear Contemporaneo (18+)',
  whatsappBook: 'Prenotazioni e verifica disponibilità 24/7 su WhatsApp +39 351 912 7047',
  benchmarkDisclaimer: 'Riferimento listino passata edizione: importi e format soggetti a conferma del locale prima dell’emissione · WhatsApp +39 351 912 7047.',
  pendingProgramSummary: 'Programma e prezzi Capodanno 2027 in aggiornamento · Info su richiesta',
  pendingProgramDesc: 'La Fabbrica del Vapore in Via Giulio Cesare Procaccini 4 (18+) ospita grandi format audiovisivi e musica elettronica. Per il Capodanno 2027 il programma ufficiale e le fasce di prezzo sono in aggiornamento: nessuna tariffa non confermata viene pubblicata in anticipo. Scrivi al Concierge Nightlife Milan (+39 351 912 7047) per ricevere avviso immediato all’apertura.',
  armaniTbaSub: 'Via Gastone Pisoni 3 (Quadrilatero della Moda) · 23:00 – 05:00 · Programma in definizione',
  armaniTbaDesc: 'Capodanno 2027 ad Armani/Privé Milano (Via Gastone Pisoni 3): la direzione del club ha confermato che il programma e il listino ufficiali per il 31 dicembre 2026 sono in via di definizione. Nessuna tariffa anticipata prima del comunicato ufficiale: registrati nella lista prioritaria via WhatsApp +39 351 912 7047.',
  armaniTbaTierLabel: 'Ingressi & Tavoli VIP Armani/Privé (listino 2027 in definizione)',
  armaniTbaSource: 'Comunicazione ufficiale Armani/Privé Milano: programma e prezzi 2027 in via di definizione, lista d’attesa Concierge su WhatsApp +39 351 912 7047.',
  theClubSub: 'Corso Garibaldi 97 (Brera) · Gran Galà 20:30 – 06:00 · DJs Ale Bucci & Melos',
  theClubDesc: 'Capodanno 2027 al The Club Milano (Corso Garibaldi 97, Brera): Gran Galà ufficiale del 31 dicembre 2026 dalle 20:30 alle 06:00 con DJs Ale Bucci & Melos tra House, Hip-Hop e Commerciale. Ingressi serata 50€ / 70€ (1 drink, flûte e buffet dolci entro 00:00), Buffet + Serata 90€, Accesso Privé 150€ e Tavoli VIP 900€ – 2.000€ (max 10 ospiti).',
  theClubFormat: 'Gran Galà Brera · DJs Ale Bucci & Melos · House, Hip-Hop & Commerciale (20:30 – 06:00)',
  theClubEntryLabel: 'Ingresso Serata (22:30 – 04:00)',
  theClubEntryDesc: 'Quota 50€ / 70€ con 1 drink, flûte per il brindisi di mezzanotte e buffet dolci entro le 00:00.',
  theClubBuffetLabel: 'Cena a Buffet + Serata (dalle 20:30)',
  theClubBuffetDesc: 'Buffet con 1 drink, flûte brindisi, vino e acqua free refill fino alle 23:00 (senza tavolo riservato).',
  theClubPriveLabel: 'Accesso Area Privé + Buffet (20:30 – 04:00)',
  theClubPriveDesc: 'Buffet di San Silvestro, 2 drink, flûte di brindisi e accesso all’area Privé.',
  theClubTablesLabel: 'Tavoli VIP Pista / Gold / White / Super Privé (max 10 pax)',
  theClubTablesDesc: 'Pista 900€ · DJ Booth / Gold VIP 1.200€ · White VIP 1.500€ · Super Privé 2.000€ (+50€/pax buffet se dalle 20:30).',
  theClubSource: 'Listino ufficiale The Club Milano 2027 (Corso Garibaldi 97): Serata 50€/70€, Buffet 90€, Privé 150€, Tavoli 900€–2.000€.',
  justMeSub: 'Viale Luigi Camoens 2 (Torre Branca) · Red Carpet 19:30 · Gala 20:00 · Club 23:30',
  justMeDesc: 'Il Capodanno 2027 più iconico di Milano sotto la Torre Branca in Parco Sempione con tema The Great Gatsby x Dom Pérignon: dalle 19:30 Red Carpet e photocall, dalle 20:00 Gran Cenone di Gala (300€ a persona, 600€ a coppia) con musica dal vivo, dalle 23:30 Club Party (80€ con 1 drink) e fuochi di mezzanotte fino alle 05:30.',
  justMeFormat: 'The Great Gatsby · Red Carpet 19:30 · Gran Cenone Gala 20:00 · Club Party 23:30 – 05:30',
  justMeClub: 'Ingresso Club + 1 Drink (dalle 23:30)',
  justMeClubDesc: 'Accesso ufficiale al party The Great Gatsby sotto la Torre Branca con 1 drink e omaggi della serata.',
  justMeGala: 'Gran Cenone di Gala (dalle 20:00)',
  justMeGalaDesc: 'Red Carpet dalle 19:30, menu degustazione completo con vini bianchi e rossi, live music e accesso club (600€ a coppia).',
  justMeTables: 'Tavoli VIP Bronze / Silver / Gold / Platinum',
  justMeTablesDesc: 'Bronze 600€, Silver 800€, Gold 3.000€, Platinum 5.000€ (numero ospiti e posizione definiti alla prenotazione).',
  justMeCombo: 'Pacchetti Cena×2 + Tavolo Privé',
  justMeComboDesc: 'Cena per 2 persone + Tavolo Bronze 1.000€ oppure Cena per 2 persone + Tavolo Silver 1.200€.',
  justMeMenuHeading: 'Menù Ufficiale Gran Cenone · JustMe Milano 2027',
  justMeMenuTitle: 'Gala Dinner The Great Gatsby · Menù 300€',
  justMeMenuSub: '31 dicembre 2026 · Dalle 20:00 · Inclusi vini bianchi e rossi, acqua San Benedetto e caffè Segafredo',
  justMeCourses: [
    ['Antipasti', 'Rainbow Sashimi marinato ponzu e yuzu (tonno, salmone, ricciola, capasanta, gambero rosso, astice) · Croquetas di Patanegra · Ceviche di ricciola'],
    ['Primo Piatto', 'Risotto gamberi, burrata e caviale · seguito da Just Sorbetto'],
    ['Secondo Piatto', 'Black Cod al miso OPPURE Filetto di Chianina al tartufo'],
    ['Dessert', 'Parfait NYE al cioccolato'],
  ],
  justMeBev: 'Vini bianchi e rossi selezionati, acqua San Benedetto e caffè Segafredo inclusi, oltre a omaggi festivi di mezzanotte.',
  justMeSteps: [
    'Apertura Red Carpet e Photocall sotto la Torre Branca',
    'Inizio Gran Cenone di Gala The Great Gatsby con musica dal vivo (300€)',
    'Apertura ingressi Club Party (80€ con 1 drink) e Tavoli VIP',
    'Countdown e spettacolo pirotecnico di mezzanotte fino alle 05:30',
  ],
  justMeSource: 'Listino e menu ufficiali confermati 2027 JustMe Milano (Via Camoens, Torre Branca): Club 80€, Cena di Gala 300€ (600€ coppia), Tavoli Bronze 600€ / Silver 800€ / Gold 3.000€ / Platinum 5.000€, Cena×2 + Bronze 1.000€ / Silver 1.200€.',
  pelledocaSub: 'Viale Enrico Forlanini 121 · Gran Cenone 120€ · Apertura Discoteca 00:30',
  pelledocaDesc: 'Capodanno 2027 al Pelledoca Milano in Viale Forlanini 121: Gran Cenone di San Silvestro a menù fisso ufficiale 120€ a persona con antipasti crudi di mare e terra, risotto Carnaroli all’astice, filetto di manzo irlandese, vini Cantine Volpi e brindisi con cotechino e lenticchie. Apertura discoteca ore 00:30.',
  pelledocaFormat: 'Gran Cenone di San Silvestro (mare e terra) · Discoteca dalle 00:30',
  pelledocaDinner: 'Gran Cenone di San Silvestro (menù fisso)',
  pelledocaDinnerDesc: 'Antipasti Mare & Terra, Risotto all’astice Fedeli, Filetto irlandese, dolce, Gavi DOCG & Nebbiolo DOC Cantine Volpi, acqua, caffè, brindisi, cotechino e lenticchie + discoteca dalle 00:30.',
  pelledocaClub: 'Discoteca dopo le 00:30 & Tavoli',
  pelledocaClubDesc: 'Apertura discoteca ore 00:30 · quote ingresso o tavoli dopo cena su verifica con il Concierge WhatsApp.',
  pelledocaMenuHeading: 'Menù Ufficiale Gran Cenone · Pelledoca Milano 2027',
  pelledocaMenuTitle: 'Gran Cenone di San Silvestro · 120€ cad.',
  pelledocaMenuSub: '31 dicembre 2026 · Viale Enrico Forlanini 121 · Apertura Discoteca ore 00:30',
  pelledocaCourses: [
    ['Antipasti Mare', 'Ostriche Fine de Claire · Gamberi rossi di Mazara · Scampone imperiale · Tartare di tonno con avocado, stracciatella e tobiko nero · Tartare di salmone con mango e mandorle tostate'],
    ['Antipasti Terra', 'Battuta di Aberdeen Angus con pesto di pomodori secchi, burrata e nocciole · Culatello di Zibello e fiori di zucca ripieni di ricotta di bufala'],
    ['Primo Piatto', 'Riso Carnaroli Azienda Agricola Fedeli all’astice, fiori di zucca e crema di burrata'],
    ['Secondo & Dolce', 'Filetto di manzo irlandese alla griglia su vellutata di sedano rapa, cipolla caramellata e patate dorate · Delizie dello chef'],
  ],
  pelledocaBev: 'Gavi Cantine Volpi DOCG, Nebbiolo Langhe Cantine Volpi DOC, acqua, caffè, calice di spumante a mezzanotte e cotechino con lenticchie in tarda notte.',
  pelledocaSteps: [
    'Accoglienza ospiti per il Gran Cenone di San Silvestro (120€)',
    'Servizio completo Mare & Terra con abbinamento vini Cantine Volpi',
    'Calice di spumante per il brindisi di mezzanotte',
    'Apertura ufficiale discoteca Pelledoca Milano (cotechino e lenticchie in tarda notte)',
  ],
  pelledocaSource: 'Locandina e menù ufficiali confermati Capodanno 2027 Pelledoca Milano: menù fisso 120€ cad. (vini Cantine Volpi, brindisi, cotechino e lenticchie), apertura discoteca 00:30.',
  magazziniSub: 'Via Pietrasanta 16 · Ale Zeus Dinner Show (20:30, 80€) · We Love 2000 (23:00, 30€) · Tavoli 300–900€',
  magazziniDesc: 'Doppio appuntamento ai Magazzini Generali Milano il 31 dicembre 2026: dalle 20:30 New Year Casino Night & Dinner Show con Ale Zeus a 80€ (ricco buffet completo, 1 drink e flûte); dalle 23:00 We Love 2000 (la prima festa anni 2000 d’Italia) a 30€ con 1 drink, braccialetti e borse gadget. Tavoli Pista 300€ (max 5), Balconata 600€ (max 10), Privé Palco 900€ (max 10).',
  magazziniFormat: 'Dinner Show Ale Zeus (20:30) + We Love 2000 anni 2000 con gadget (23:00 – 05:00)',
  magazziniClub: 'Club We Love 2000 + 1 Drink (dalle 23:00)',
  magazziniClubDesc: 'La prima festa anni 2000 d’Italia dalle 23:00 con 1 drink incluso, braccialetti luminosi e borse gadget.',
  magazziniBuffet: 'New Year Casino Night Buffet + Club (dalle 20:30)',
  magazziniBuffetDesc: 'Dinner Show con Ale Zeus e menù completo Casino Night, 1 drink, flûte di mezzanotte e ingresso al party We Love 2000.',
  magazziniPista: 'Tavolo Pista (max 5 pax · 1 bottiglia)',
  magazziniPistaDesc: '60€ a persona fino a 5 ospiti inclusi con 1 bottiglia; eventuale 6ª persona paga la quota di 60€ (360€ sempre 1 bottiglia).',
  magazziniBalc: 'Tavolo Balconata (max 10 pax · 2 bottiglie)',
  magazziniBalcDesc: '60€ a persona fino a 10 ospiti inclusi nell’area panoramica Balconata con 2 bottiglie incluse.',
  magazziniPalco: 'Tavolo Privé Palco (max 10 pax · 3 bottiglie)',
  magazziniPalcoDesc: '90€ a persona fino a 10 ospiti inclusi sul Privé Palco con 3 bottiglie incluse.',
  magazziniMenuHeading: 'Menù Buffet Casino Night & Listino Tavoli · Magazzini Generali',
  magazziniMenuTitle: 'New Year Casino Night · Menù Buffet 80€',
  magazziniMenuSub: '31 dicembre 2026 · Dalle 20:30 con Dinner Show di Ale Zeus + Party We Love 2000',
  magazziniCourses: [
    ['Appetizer & Antipasti', 'Brioches salate, vol-au-vent, salmone affumicato, cocktail di gamberetti, caprese, grana, salumi e formaggi, pizza, fritti misti, salsiccette e patate'],
    ['Primi Caldi', 'Lasagne alla bolognese · Linguine vongole e bottarga'],
    ['Secondi Caldi', 'Arrosto di vitello con patate · Gamberoni argentini al forno'],
    ['Dolce', 'Pandoro alla crema pasticcera e Panettone'],
  ],
  magazziniTablesTitle: 'Listino Tavoli VIP Ufficiale · Magazzini Generali',
  magazziniTablesSub: 'Pista 300€ (5 pax) · Balconata 600€ (10 pax) · Privé Palco 900€ (10 pax)',
  magazziniTablesRows: [
    ['Tavolo Pista (300€ · 1 bottiglia)', '60€ a persona fino a 5 ospiti; ospite extra paga la quota di 60€'],
    ['Tavolo Balconata (600€ · 2 bottiglie)', '60€ a persona fino a 10 ospiti'],
    ['Tavolo Privé Palco (900€ · 3 bottiglie)', '90€ a persona fino a 10 ospiti'],
  ],
  magazziniTablesNote: 'Incluso nel ticket Club dalle 23:00: 1 drink, braccialetti e borse gadget We Love 2000.',
  magazziniSteps: [
    'Apertura New Year Casino Night Buffet & Dinner Show con Ale Zeus (80€)',
    'Apertura Club We Love 2000 con 1 drink, braccialetti e borse gadget (30€)',
    'Countdown di mezzanotte e brindisi in pista principale e balconata',
    'Gran finale anni 2000 con Dj set e tavoli Privé fino alle 05:00',
  ],
  magazziniSource: 'Locandine e menù ufficiali confermati Magazzini Generali (Via Pietrasanta 16): Buffet Casino Night & Ale Zeus 20:30 a 80€, Club We Love 2000 dalle 23:00 a 30€ (+ braccialetti/borse gadget), Tavoli Pista 300€, Balconata 600€, Privé Palco 900€.',
  gattopardoSub: 'Via Piero della Francesca 47 · Tavoli VIP 600€/persona · 22:30 – 05:00',
  gattopardoDesc: 'Il Capodanno 2027 più scenografico nell’ex chiesa sconsacrata de Il Gattopardo Milano (22:30–05:00): ingresso esclusivamente con tavolo a 600€ a persona di minimum spending (pagamento 100% anticipato comprensivo di prenotazione, biglietto, ingresso e intero budget in bottiglie dal menu). Tavoli Cupole e Centrale su richiesta.',
  gattopardoFormat: 'Luxury Club nell’Ex Chiesa Sconsacrata · Tavoli VIP 22:30 – 05:00',
  gattopardoMinSpend: 'Tavolo VIP Minimum Spending (22:30 – 05:00)',
  gattopardoMinSpendDesc: 'Prepagamento 100% richiesto: comprende già biglietto, ingresso prioritario e prenotazione tavolo, con il budget interamente spendibile in bottiglie dal menu.',
  gattopardoDomes: 'Tavoli nelle Cupole & Tavolo Centrale',
  gattopardoDomesDesc: 'Posizioni esclusive ad altissima visibilità nell’ex chiesa · disponibilità e quotazioni su richiesta.',
  gattopardoSteps: [
    'Apertura porte Il Gattopardo Milano e accoglienza Tavoli VIP',
    'Countdown di mezzanotte sotto gli affreschi e lo chandelier',
    'DJ set internazionale House & Commerciale fino alle 05:00',
  ],
  gattopardoSource: 'Listino ufficiale confermato Il Gattopardo Milano (22:30–05:00): tavoli a 600€ a persona di minimum spending con prepagamento 100% (prenotazione + biglietto + bottiglie); Cupole e Tavolo Centrale su richiesta.',
  gardaDesc: 'Capodanno sul Lago di Garda al JustMe Garda Lake (Via Lavagnone 13, Lonato del Garda / Desenzano · format Just Me in Rouge): dalle 20:30 Gran Cenone servito (130€) o Buffet in piedi (70€), dalle 22:30 Ticket Club con 1 drink (da 20€), oltre a tavoli Terrace (440€), Dance Floor (500€), Privé Ploom (700€), Stool (800€), Armand (900€) e VIP (2.000€). Tariffe di riferimento soggette a conferma.',
  gardaFormat: 'Just Me in Rouge · Dinner Live & Singing Show + Club fino alle 05:00 (21+)',
  gardaClub: 'Ingresso Club + 1 Drink (dalle 22:30)',
  gardaBuffet: 'Buffet di Gala in Piedi (dalle 20:30)',
  gardaGala: 'Gran Cenone Gala Live (dalle 20:30)',
  gardaTables: 'Tavoli VIP (Terrace / Ploom / Armand / VIP)',
  ariaDesc: 'Capodanno ad Aria Club Milano (Piazzale dello Sport 14 · Ippodromo San Siro, dalle 20:00 · Smart Chic): doppia atmosfera cena, royal buffet e club Urban/Reggaeton. Riferimenti passata edizione: dopocena 45€–55€, buffet 65€, cena di gala 130€ e tavoli 300€–1.000€ (da confermare).',
  fiftyFiveDesc: 'Capodanno 2027 al loft di 1.000 mq di 55 Milano (Via Piero della Francesca 55, Sempione, dalle 20:00): dopocena da 50€, Royal Buffet 70€–75€, Gran Cenone 130€–140€ e tavoli VIP 350€–1.200€ tra Live Dinner Show, anni 80/90 e Vocal House (riferimenti da confermare).',
  tocquevilleDesc: 'Capodanno su due livelli al Tocqueville 13 in Corso Como (Via Tocqueville 13, dalle 20:00): cena spettacolo al piano superiore e club al livello inferiore. Riferimenti passata edizione: dopocena 35€–45€, buffet 60€, cena 110€–120€ e tavoli 600€–2.000€ (da confermare).',
  hollywoodDesc: 'Il mito di Corso Como 15: Capodanno all’Hollywood Milano ("La Notte delle Stelle", 20:30–05:30). Riferimenti indicativi: ingresso dopocena da 40€ (1 drink), buffet da 60€, cenone da 130€ e tavoli pista/privé 300€–1.200€ (prezzi 2027 in attesa di conferma).',
  elevenDesc: 'Capodanno boutique nel salotto di velluto dell’11Clubroom (Via Alessio di Tocqueville 11, 21:00–05:00): atmosfere house e internazionali. Riferimenti indicativi passata edizione: dopocena dalle 23:30 da 40€ (1 drink), buffet da 65€ e tavoli privé 350€–1.000€ (da confermare).',
  afterDinnerLabel: 'Ingresso Dopocena + 1 Drink',
  buffetLabel: 'Buffet di Gala + Party',
  galaDinnerLabel: 'Gran Cenone Servito + Party',
  clubDetails: 'Accesso serale con 1 consumazione inclusa · tariffa indicativa da verificare.',
  buffetDetails: 'Buffet con drink di benvenuto, brindisi di mezzanotte e accesso club · da confermare.',
  galaDetails: 'Cena servita con vini inclusi e festa di mezzanotte · tariffa soggetta a conferma.',
  vipTablesDetails: 'Postazione riservata con credito bottiglie e accesso prioritario · disponibilità su richiesta.',
};

const EN: WaLocaleDict = {
  nyePrefix: 'New Year’s Eve 2027',
  milano: 'Milan',
  dec31: 'December 31, 2026',
  confirmedTag: 'Confirmed Official 2027 Rates',
  benchmarkTag: 'Prior-edition benchmark rates (pending confirmation)',
  pendingTag: '2027 Program & Prices Pending Update',
  uponRequest: 'Upon request',
  perPerson: 'per person',
  fromWord: 'from',
  scheduleWord: 'Dec 31, 2026 Schedule',
  menuWord: 'Official NYE 2027 Menu',
  vipTablesWord: 'VIP Privé Tables',
  tablePista: 'Dancefloor Table',
  tableBalcony: 'Balcony Table',
  tableStage: 'Stage Privé Table',
  minSpendShort: 'Min. Spend €600',
  dressCodeElegant: 'Evening Elegant / Formal Chic',
  dressCodeBlackTie: 'Black Tie / The Great Gatsby Theme / Strict Elegance',
  dressCodeSartorial: 'Strict Haute Couture / Tailored Evening Attire',
  dressCodeCreative: 'Creative / Contemporary Clubwear (18+)',
  whatsappBook: 'Bookings & 24/7 availability check on WhatsApp +39 351 912 7047',
  benchmarkDisclaimer: 'Prior-edition rate reference: final 2027 pricing and format pending venue confirmation prior to issuance · WhatsApp +39 351 912 7047.',
  pendingProgramSummary: '2027 NYE program & prices pending update · Information upon request',
  pendingProgramDesc: 'Fabbrica del Vapore on Via Giulio Cesare Procaccini 4 (18+) is one of Milan’s premier industrial-cultural landmarks for electronic music and audiovisual shows. For New Year’s Eve 2027 on December 31, 2026, official programming and ticket tiers are pending release: zero unverified rates are published ahead of announcement. Contact Nightlife Milan Concierge (+39 351 912 7047) for immediate release updates.',
  armaniTbaSub: 'Via Gastone Pisoni 3 (Fashion District) · 23:00 – 05:00 · Official program TBA',
  armaniTbaDesc: 'New Year’s Eve 2027 at Armani/Privé Milan (Via Gastone Pisoni 3): venue management has confirmed that the official December 31, 2026 program and rate card are still being finalized. Zero unverified prices are published in advance; join our priority alert waitlist on WhatsApp +39 351 912 7047.',
  armaniTbaTierLabel: 'Admissions & VIP Tables Armani/Privé (2027 program TBA)',
  armaniTbaSource: 'Official venue update for Armani/Privé Milan: 2027 NYE schedule and rates to be announced; priority waitlist via WhatsApp +39 351 912 7047.',
  theClubSub: 'Corso Garibaldi 97 (Brera) · Grand Gala 20:30 – 06:00 · DJs Ale Bucci & Melos',
  theClubDesc: 'New Year’s Eve 2027 at The Club Milano (Corso Garibaldi 97, Brera): official December 31, 2026 Grand Gala from 20:30 to 06:00 featuring DJs Ale Bucci & Melos (House, Hip-Hop & Commercial). Party admission €50 / €70 (1 drink, midnight flûte & dessert buffet before 00:00), Buffet + Party €90, Privé Access €150, VIP Tables €900 – €2,000 (max 10 guests).',
  theClubFormat: 'Brera Grand Gala · DJs Ale Bucci & Melos · House, Hip-Hop & Commercial (20:30 – 06:00)',
  theClubEntryLabel: 'Party Admission (22:30 – 04:00)',
  theClubEntryDesc: '€50 / €70 tier with 1 drink, midnight sparkling flûte & dessert buffet before 00:00.',
  theClubBuffetLabel: 'Buffet Dinner + Party (from 20:30)',
  theClubBuffetDesc: 'Gala buffet with 1 drink, midnight flûte & free-refill wine/water until 23:00 (unseated).',
  theClubPriveLabel: 'Privé Access + Buffet (20:30 – 04:00)',
  theClubPriveDesc: 'NYE buffet + 2 drinks + midnight flûte with Privé area access.',
  theClubTablesLabel: 'VIP Tables Dancefloor / Gold / White / Super Privé (max 10)',
  theClubTablesDesc: 'Dancefloor €900 · DJ Booth / Gold €1,200 · White VIP €1,500 · Super Privé €2,000 (+€50/pax buffet if from 20:30).',
  theClubSource: 'Official rate card for The Club Milano 2027 (Corso Garibaldi 97): Party €50/€70, Buffet €90, Privé €150, Tables €900–€2,000.',
  justMeSub: 'Viale Luigi Camoens 2 (Torre Branca) · Red Carpet 19:30 · Gala Dinner 20:00 · Club 23:30',
  justMeDesc: 'Milan’s most iconic New Year’s Eve celebration beneath Torre Branca in Parco Sempione featuring The Great Gatsby x Dom Pérignon: 19:30 Red Carpet & photocall, 20:00 served Gala Dinner (€300 per person, €600 per couple) with live show, 23:30 Club Party (€80 incl. 1 drink), and midnight fireworks until 05:30.',
  justMeFormat: 'The Great Gatsby · Red Carpet 19:30 · Gala Dinner 20:00 · Club Party 23:30 – 05:30',
  justMeClub: 'Club Admission + 1 Drink (from 23:30)',
  justMeClubDesc: 'Official entry to The Great Gatsby club party at Torre Branca with 1 drink and complimentary party treats.',
  justMeGala: 'Served Gala Dinner (from 20:00)',
  justMeGalaDesc: 'Red Carpet from 19:30, full gourmet tasting menu with white & red wine, live entertainment and full club night (€600/couple).',
  justMeTables: 'VIP Tables Bronze / Silver / Gold / Platinum',
  justMeTablesDesc: 'Bronze €600, Silver €800, Gold €3,000, Platinum €5,000 (table zone and guest quota assigned at booking).',
  justMeCombo: 'Dinner×2 + Privé Table Packages',
  justMeComboDesc: 'Gala Dinner for 2 guests + Bronze Table €1,000, or Dinner for 2 guests + Silver Table €1,200.',
  justMeMenuHeading: 'Official Gala Dinner Menu · JustMe Milan 2027',
  justMeMenuTitle: 'The Great Gatsby Gala Dinner · €300 Menu',
  justMeMenuSub: 'December 31, 2026 · From 20:00 · White & red wine, San Benedetto water & Segafredo coffee included',
  justMeCourses: [
    ['Appetizers', 'Marinated Rainbow Sashimi with ponzu & yuzu (tuna, salmon, yellowtail, scallop, red shrimp, lobster) · Patanegra ham croquettes · Yellowtail ceviche'],
    ['First Course & Sorbet', 'Shrimp, burrata and caviar risotto · followed by Just Sorbet'],
    ['Main Course (Choice)', 'Miso Black Cod OR Truffle Chianina Beef Fillet'],
    ['Dessert', 'NYE Chocolate Parfait'],
  ],
  justMeBev: 'Selected white and red wine, San Benedetto water, and Segafredo coffee included, plus midnight complimentary party treats.',
  justMeSteps: [
    'Red Carpet and Photocall opens beneath Torre Branca',
    'The Great Gatsby Gala Dinner begins with live entertainment (€300)',
    'Club Party doors open (€80 incl. 1 drink) & VIP Table check-in',
    'Midnight countdown and fireworks show continuing until 05:30',
  ],
  justMeSource: 'Confirmed 2027 official rate card & menu for JustMe Milan (Torre Branca): Club €80, Gala Dinner €300 (€600/couple), Tables Bronze €600 / Silver €800 / Gold €3,000 / Platinum €5,000, Dinner×2+Bronze €1,000 / Silver €1,200.',
  pelledocaSub: 'Viale Enrico Forlanini 121 · Gala Dinner €120 · Club Doors 00:30',
  pelledocaDesc: 'Celebrate New Year’s Eve 2027 at Pelledoca Milano (Viale Forlanini 121) with the official fixed-menu Gran Cenone di San Silvestro at €120 per person: raw seafood & land starters, lobster Carnaroli risotto, grilled Irish beef fillet, Cantine Volpi DOCG/DOC wines, midnight toast, and late-night cotechino & lentils. Club opens at 00:30.',
  pelledocaFormat: 'Surf & Turf New Year’s Eve Gala Dinner · Nightclub from 00:30',
  pelledocaDinner: 'New Year’s Eve Gala Dinner (fixed menu)',
  pelledocaDinnerDesc: 'Seafood & Land starters, Fedeli lobster risotto, Irish beef fillet, dessert, Gavi DOCG & Nebbiolo DOC Cantine Volpi, water, coffee, midnight toast, cotechino & lentils + nightclub access from 00:30.',
  pelledocaClub: 'Nightclub after 00:30 & VIP Tables',
  pelledocaClubDesc: 'Club opens at 00:30 · post-midnight entry and table availability verified via WhatsApp Concierge.',
  pelledocaMenuHeading: 'Official NYE Gala Menu · Pelledoca Milan 2027',
  pelledocaMenuTitle: 'Gran Cenone di San Silvestro · €120 p.p.',
  pelledocaMenuSub: 'December 31, 2026 · Viale Enrico Forlanini 121 · Nightclub opening 00:30',
  pelledocaCourses: [
    ['Seafood Starters', 'Fine de Claire oysters · Mazara del Vallo red prawns · Imperial scampo · Tuna tartare with avocado, stracciatella & black tobiko · Salmon tartare with mango & toasted almonds'],
    ['Land Starters', 'Aberdeen Angus tartare with sun-dried tomato pesto, burrata heart & hazelnuts · Culatello di Zibello & battered zucchini blossoms stuffed with buffalo ricotta'],
    ['First Course', 'Azienda Agricola Fedeli Carnaroli risotto with lobster, zucchini flowers & aromatic burrata cream'],
    ['Main & Dessert', 'Grilled Irish beef fillet over Verona celeriac velouté, caramelized onion & golden new potatoes · Chef’s dessert selection'],
  ],
  pelledocaBev: 'Gavi DOCG & Nebbiolo Langhe DOC by Cantine Volpi, water, coffee, sparkling midnight toast, and late-night cotechino & lentils.',
  pelledocaSteps: [
    'Welcome reception for the fixed-menu New Year’s Eve Gala Dinner (€120)',
    'Full Surf & Turf tasting courses paired with Cantine Volpi wines',
    'Sparkling wine glass served for the midnight countdown',
    'Pelledoca Milano nightclub official opening with late-night cotechino & lentils',
  ],
  pelledocaSource: 'Confirmed 2027 official poster & menu for Pelledoca Milano: €120 fixed Gala Dinner (wines, toast, cotechino & lentils included), club opening at 00:30.',
  magazziniSub: 'Via Pietrasanta 16 · Ale Zeus Dinner Show (20:30, €80) · We Love 2000 (23:00, €30) · Tables €300–€900',
  magazziniDesc: 'Dual celebration at Magazzini Generali Milan on December 31, 2026: from 20:30 New Year Casino Night Buffet & Dinner Show with Ale Zeus (€80 incl. full menu, 1 drink & flûte); from 23:00 Italy’s #1 2000s party We Love 2000 (€30 incl. 1 drink, wristbands & tote gadgets). VIP Tables: Dancefloor €300 (5 pax), Balcony €600 (10 pax), Stage Privé €900 (10 pax).',
  magazziniFormat: 'Ale Zeus Dinner Show (20:30) + We Love 2000 Party with gadgets (23:00 – 05:00)',
  magazziniClub: 'We Love 2000 Club + 1 Drink (from 23:00)',
  magazziniClubDesc: 'Club admission from 23:00 featuring 1 drink, complimentary LED wristbands, and branded tote bags.',
  magazziniBuffet: 'Casino Night Buffet + Club (from 20:30)',
  magazziniBuffetDesc: 'Ale Zeus Dinner Show & complete Casino Night buffet from 20:30 with 1 drink, midnight sparkling flûte & party access.',
  magazziniPista: 'Dancefloor Table (max 5 guests · 1 bottle)',
  magazziniPistaDesc: '€60 per person up to 5 guests with 1 bottle included; each extra guest adds €60 (e.g. 6 guests = €360, still 1 bottle).',
  magazziniBalc: 'Balcony Table (max 10 guests · 2 bottles)',
  magazziniBalcDesc: '€60 per person up to 10 guests in the elevated balcony area with 2 bottles included.',
  magazziniPalco: 'Stage Privé Table (max 10 guests · 3 bottles)',
  magazziniPalcoDesc: '€90 per person up to 10 guests in the exclusive Stage Privé with 3 bottles included.',
  magazziniMenuHeading: 'Casino Night Buffet Menu & VIP Tables · Magazzini Generali',
  magazziniMenuTitle: 'New Year Casino Night · Buffet Menu €80',
  magazziniMenuSub: 'December 31, 2026 · From 20:30 with Ale Zeus Dinner Show + We Love 2000',
  magazziniCourses: [
    ['Appetizers & Antipasti', 'Savory brioches, vol-au-vent, smoked salmon, shrimp cocktail, caprese skewers, aged Grana, cured meats & cheeses, pizza, mixed fried bites, baked sausages & potatoes'],
    ['Hot First Courses', 'Lasagne alla Bolognese · Linguine with clams and bottarga'],
    ['Hot Mains', 'Roast veal with potatoes · Oven-baked Argentine prawns'],
    ['Desserts', 'Pandoro with pastry cream and artisanal Panettone'],
  ],
  magazziniTablesTitle: 'Official VIP Table Rates · Magazzini Generali',
  magazziniTablesSub: 'Dancefloor €300 (5 pax) · Balcony €600 (10 pax) · Stage Privé €900 (10 pax)',
  magazziniTablesRows: [
    ['Dancefloor Table (€300 · 1 bottle)', '€60 per guest up to 5 guests; extra guests pay €60 per person share'],
    ['Balcony Table (€600 · 2 bottles)', '€60 per guest up to 10 guests'],
    ['Stage Privé Table (€900 · 3 bottles)', '€90 per guest up to 10 guests'],
  ],
  magazziniTablesNote: '23:00 Club admission includes 1 drink plus We Love 2000 wristbands and tote bag gadgets.',
  magazziniSteps: [
    'Casino Night Buffet & Dinner Show with Ale Zeus opens (€80)',
    'We Love 2000 Club doors open with 1 drink, wristbands & tote gadgets (€30)',
    'Midnight countdown and sparkling toast across main floor and balcony',
    '2000s hits finale & VIP table service through 05:00',
  ],
  magazziniSource: 'Confirmed 2027 posters & menu for Magazzini Generali (Via Pietrasanta 16): Ale Zeus Buffet 20:30 €80, We Love 2000 Club 23:00 €30 (+ gadgets), Tables Dancefloor €300, Balcony €600, Stage Privé €900.',
  gattopardoSub: 'Via Piero della Francesca 47 · VIP Tables €600/guest Min. Spend · 22:30 – 05:00',
  gattopardoDesc: 'Celebrate inside Milan’s iconic deconsecrated church Il Gattopardo (22:30–05:00): VIP tables strictly at €600 per person minimum spend with 100% prepayment (covers table reservation, admission ticket, priority entry, and full bottle budget from the menu). Dome & Center Altar tables on request.',
  gattopardoFormat: 'Iconic Deconsecrated Church Clubbing · VIP Tables 22:30 – 05:00',
  gattopardoMinSpend: 'VIP Table Minimum Spend (22:30 – 05:00)',
  gattopardoMinSpendDesc: '100% advance payment required: already includes entry ticket, table booking and full bottle spend budget.',
  gattopardoDomes: 'Dome VIP Tables & Center Altar Table',
  gattopardoDomesDesc: 'Signature prime architectural positions · custom quote and availability upon request.',
  gattopardoSteps: [
    'Il Gattopardo Milano doors open & VIP table check-in begins',
    'Midnight countdown beneath the central dome and crystal chandelier',
    'International House & Commercial DJ set through 05:00',
  ],
  gattopardoSource: 'Confirmed 2027 rate card for Il Gattopardo Milan (22:30–05:00): €600 per person minimum spend VIP tables (100% prepayment covering ticket, booking & bottles); Dome & Center tables upon request.',
  gardaDesc: 'Lake Garda New Year’s Eve at JustMe Garda Lake (Lonato / Desenzano · Just Me in Rouge): from 20:30 Gala Dinner (€130) or Standing Buffet (€70), from 22:30 Club Entry + 1 Drink (from €20), plus Terrace (€440), Dance Floor (€500), Privé Ploom (€700), Stool (€800), Armand (€900) and VIP (€2,000) tables. Benchmark rates subject to venue confirmation.',
  gardaFormat: 'Just Me in Rouge · Dinner Live & Singing Show + Club until 05:00 (21+)',
  gardaClub: 'Club Entry + 1 Drink (from 22:30)',
  gardaBuffet: 'Standing Gala Buffet (from 20:30)',
  gardaGala: 'Served Gala Dinner Live (from 20:30)',
  gardaTables: 'VIP Tables (Terrace / Ploom / Armand / VIP)',
  ariaDesc: 'New Year’s Eve at Aria Club Milano (Piazzale dello Sport 14, San Siro, from 20:00 · Smart Chic): Urban, Reggaeton & Dinner Show. Prior-edition benchmark rates: club €45–€55, buffet €65, gala dinner €130, tables €300–€1,000 (pending confirmation).',
  fiftyFiveDesc: 'New Year’s Eve inside 55 Milano’s 1,000 sqm Sempione loft (Via Piero della Francesca 55, from 20:00): after-dinner €50, Royal Buffet €70–€75, Gala Dinner €130–€140, VIP tables €350–€1,200 (benchmark rates subject to confirmation).',
  tocquevilleDesc: 'Two-floor New Year’s Eve Dinner Show & Club at Tocqueville 13 (Corso Como, from 20:00): prior-edition benchmark rates: after-dinner €35–€45, buffet €60, served dinner €110–€120, VIP tables €600–€2,000 (pending venue confirmation).',
  hollywoodDesc: 'Corso Como’s star nightclub Hollywood Rythmoteque (Corso Como 15, 20:30–05:30): benchmark references from €40 club entry, from €60 buffet, from €130 gala dinner, tables €300–€1,200 (2027 rates pending confirmation).',
  elevenDesc: 'Intimate velvet boutique lounge NYE at 11Clubroom (Via Tocqueville 11, 21:00–05:00): benchmark references from €40 after-dinner (23:30), from €65 buffet, privé tables €350–€1,000 (pending confirmation).',
  afterDinnerLabel: 'After-Dinner Entry + 1 Drink',
  buffetLabel: 'Gala Buffet + Club Party',
  galaDinnerLabel: 'Served Gala Dinner + Party',
  clubDetails: 'Club admission with 1 drink included · benchmark reference pending final confirmation.',
  buffetDetails: 'Evening buffet with welcome drink, midnight toast & party access · pending confirmation.',
  galaDetails: 'Plated dinner with wines included & midnight celebration · rate pending confirmation.',
  vipTablesDetails: 'Reserved bottle-service table with priority admission · availability upon request.',
};

interface NativeLocaleSeed {
  nyePrefix: string;
  milano: string;
  dec31: string;
  confirmedTag: string;
  benchmarkTag: string;
  pendingTag: string;
  tbaStatusTag: string;
  uponRequest: string;
  perPerson: string;
  fromWord: string;
  scheduleWord: string;
  menuWord: string;
  vipTablesWord: string;
  dressCodeElegant: string;
  dressCodeBlackTie: string;
  dressCodeSartorial: string;
  dressCodeCreative: string;
  whatsappBook: string;
  afterDinnerLabel: string;
  buffetLabel: string;
  galaDinnerLabel: string;
  startersHead: string;
  seafoodStarters: string;
  landStarters: string;
  firstCourseHead: string;
  mainCourseHead: string;
  dessertHead: string;
  tablePista: string;
  tableBalcony: string;
  tableStage: string;
  bottlesWord: string;
  bottleWord: string;
  justMeWines: string;
  pelledocaWines: string;
  justMeDishes: [string, string, string, string];
  pelledocaDishes: [string, string, string, string];
  magazziniDishes: [string, string, string, string];
  extraGuestNote: string;
  clubGadgetNote: string;
  minSpendShort: string;
  minSpendLabel: string;
  domesLabel: string;
  dinnerAndTable: string;
  priveAccessLabel: string;
  clubDetails: string;
  buffetDetails: string;
  galaDetails: string;
  vipTablesDetails: string;
}

function buildNativeDict(s: NativeLocaleSeed): WaLocaleDict {
  return {
    nyePrefix: s.nyePrefix,
    milano: s.milano,
    dec31: s.dec31,
    confirmedTag: s.confirmedTag,
    benchmarkTag: s.benchmarkTag,
    pendingTag: s.pendingTag,
    uponRequest: s.uponRequest,
    perPerson: s.perPerson,
    fromWord: s.fromWord,
    scheduleWord: s.scheduleWord,
    menuWord: s.menuWord,
    vipTablesWord: s.vipTablesWord,
    tablePista: s.tablePista,
    tableBalcony: s.tableBalcony,
    tableStage: s.tableStage,
    minSpendShort: s.minSpendShort,
    dressCodeElegant: s.dressCodeElegant,
    dressCodeBlackTie: s.dressCodeBlackTie,
    dressCodeSartorial: s.dressCodeSartorial,
    dressCodeCreative: s.dressCodeCreative,
    whatsappBook: s.whatsappBook,
    benchmarkDisclaimer: `${s.benchmarkTag} · ${s.whatsappBook}.`,
    pendingProgramSummary: `${s.pendingTag} · ${s.uponRequest}`,
    pendingProgramDesc: `Fabbrica del Vapore (Via Giulio Cesare Procaccini 4, ${s.milano}, 18+): ${s.pendingTag}. ${s.whatsappBook}.`,
    armaniTbaSub: `Via Gastone Pisoni 3 · ${s.milano} · 23:00 – 05:00 · ${s.tbaStatusTag}`,
    armaniTbaDesc: `${s.nyePrefix} · Armani/Privé ${s.milano} (Via Gastone Pisoni 3, 23:00–05:00): ${s.tbaStatusTag}. ${s.whatsappBook}.`,
    armaniTbaTierLabel: `Armani/Privé ${s.milano} (${s.tbaStatusTag})`,
    armaniTbaSource: `Armani/Privé ${s.milano}: ${s.tbaStatusTag} · ${s.whatsappBook}.`,
    theClubSub: `Corso Garibaldi 97 (Brera, ${s.milano}) · 20:30 – 06:00 · Ale Bucci & Melos`,
    theClubDesc: `${s.nyePrefix} · The Club ${s.milano} (Corso Garibaldi 97, 20:30–06:00, Ale Bucci & Melos): 50€ / 70€ · ${s.buffetLabel} 90€ · ${s.priveAccessLabel} 150€ · ${s.vipTablesWord} 900€–2.000€.`,
    theClubFormat: `The Club ${s.milano} · Ale Bucci & Melos · House, Hip-Hop (20:30 – 06:00)`,
    theClubEntryLabel: `${s.afterDinnerLabel} (22:30 – 04:00)`,
    theClubEntryDesc: `${s.confirmedTag}: 50€ / 70€ (${s.dec31}).`,
    theClubBuffetLabel: `${s.buffetLabel} (20:30)`,
    theClubBuffetDesc: `${s.confirmedTag}: 90€ (${s.dec31}, 20:30–23:00).`,
    theClubPriveLabel: `${s.priveAccessLabel} (20:30 – 04:00)`,
    theClubPriveDesc: `${s.confirmedTag}: 150€ · ${s.vipTablesWord}.`,
    theClubTablesLabel: `${s.vipTablesWord} (max 10)`,
    theClubTablesDesc: `900€ · 1.200€ · 1.500€ · 2.000€ (+50€ / 20:30).`,
    theClubSource: `${s.confirmedTag} · The Club ${s.milano}: 50€/70€, 90€, 150€, 900€–2.000€.`,
    justMeSub: `JustMe ${s.milano} · Torre Branca · 19:30 / 20:00 / 23:30 – 05:30`,
    justMeDesc: `${s.nyePrefix} · JustMe ${s.milano} (Viale Luigi Camoens 2, Torre Branca): ${s.galaDinnerLabel} 300€ ${s.perPerson} (600€ / 2), ${s.afterDinnerLabel} 80€ (23:30), ${s.vipTablesWord} 600€ – 5.000€.`,
    justMeFormat: `The Great Gatsby · 19:30 / 20:00 ${s.galaDinnerLabel} · 23:30 – 05:30`,
    justMeClub: `${s.afterDinnerLabel} (23:30)`,
    justMeClubDesc: `${s.confirmedTag}: 80€ (${s.dec31}, 23:30).`,
    justMeGala: `${s.galaDinnerLabel} (20:00)`,
    justMeGalaDesc: `${s.confirmedTag}: 300€ ${s.perPerson} (600€ / 2), 19:30 · ${s.justMeWines}.`,
    justMeTables: `${s.vipTablesWord} · Bronze / Silver / Gold / Platinum`,
    justMeTablesDesc: 'Bronze 600€ · Silver 800€ · Gold 3.000€ · Platinum 5.000€.',
    justMeCombo: `${s.dinnerAndTable} ×2`,
    justMeComboDesc: `×2 + Bronze 1.000€ · ×2 + Silver 1.200€ (${s.confirmedTag}).`,
    justMeMenuHeading: `${s.menuWord} · JustMe ${s.milano}`,
    justMeMenuTitle: `JustMe ${s.milano} · The Great Gatsby 300€`,
    justMeMenuSub: `${s.dec31} · 20:00 · ${s.justMeWines}`,
    justMeCourses: [
      [s.startersHead, s.justMeDishes[0]],
      [s.firstCourseHead, s.justMeDishes[1]],
      [s.mainCourseHead, s.justMeDishes[2]],
      [s.dessertHead, s.justMeDishes[3]],
    ],
    justMeBev: s.justMeWines,
    justMeSteps: [
      `19:30 JustMe ${s.milano} · Torre Branca`,
      `20:00 ${s.galaDinnerLabel} (300€)`,
      `23:30 ${s.afterDinnerLabel} (80€)`,
      `00:00 – 05:30 · ${s.nyePrefix}`,
    ],
    justMeSource: `${s.confirmedTag} · JustMe ${s.milano}: Club 80€, 300€ (600€/2), Bronze 600€, Silver 800€, Gold 3.000€, Platinum 5.000€.`,
    pelledocaSub: `Pelledoca ${s.milano} · Viale Forlanini 121 · 120€ · 00:30`,
    pelledocaDesc: `${s.nyePrefix} · Pelledoca ${s.milano} (Viale Forlanini 121): ${s.galaDinnerLabel} 120€ ${s.perPerson} (${s.dec31}), Cantine Volpi DOCG/DOC, 00:30.`,
    pelledocaFormat: `${s.galaDinnerLabel} 120€ · 00:30`,
    pelledocaDinner: `${s.galaDinnerLabel} (120€)`,
    pelledocaDinnerDesc: `120€ ${s.perPerson}: ${s.pelledocaDishes[0]} · ${s.pelledocaDishes[2]} · ${s.pelledocaWines}.`,
    pelledocaClub: `00:30 · ${s.afterDinnerLabel}`,
    pelledocaClubDesc: `00:30 · ${s.uponRequest} (${s.whatsappBook}).`,
    pelledocaMenuHeading: `${s.menuWord} · Pelledoca ${s.milano}`,
    pelledocaMenuTitle: `Pelledoca ${s.milano} · 120€`,
    pelledocaMenuSub: `${s.dec31} · Viale Forlanini 121 · 00:30`,
    pelledocaCourses: [
      [s.seafoodStarters, s.pelledocaDishes[0]],
      [s.landStarters, s.pelledocaDishes[1]],
      [s.firstCourseHead, s.pelledocaDishes[2]],
      [s.mainCourseHead, s.pelledocaDishes[3]],
    ],
    pelledocaBev: s.pelledocaWines,
    pelledocaSteps: [
      `20:30 ${s.galaDinnerLabel} (120€)`,
      `22:00 Cantine Volpi DOCG / DOC`,
      `00:00 ${s.nyePrefix}`,
      `00:30 Pelledoca ${s.milano}`,
    ],
    pelledocaSource: `${s.confirmedTag} · Pelledoca ${s.milano}: 120€ ${s.perPerson}, 00:30.`,
    magazziniSub: `Magazzini Generali ${s.milano} · 20:30 (80€) · 23:00 (30€) · 300–900€`,
    magazziniDesc: `${s.nyePrefix} · Magazzini Generali ${s.milano} (Via Pietrasanta 16): 20:30 Ale Zeus ${s.buffetLabel} (80€), 23:00 We Love 2000 (30€, ${s.clubGadgetNote}), ${s.tablePista} 300€, ${s.tableBalcony} 600€, ${s.tableStage} 900€.`,
    magazziniFormat: `20:30 Ale Zeus · 23:00 We Love 2000 · ${s.clubGadgetNote}`,
    magazziniClub: `We Love 2000 · ${s.afterDinnerLabel} (23:00)`,
    magazziniClubDesc: `30€ (${s.dec31}, 23:00) · ${s.clubGadgetNote}.`,
    magazziniBuffet: `Casino Night ${s.buffetLabel} (20:30)`,
    magazziniBuffetDesc: `80€ (${s.dec31}, 20:30) · Ale Zeus.`,
    magazziniPista: `${s.tablePista} (max 5 · 1 ${s.bottleWord})`,
    magazziniPistaDesc: `300€ (60€ ${s.perPerson}) · ${s.extraGuestNote}.`,
    magazziniBalc: `${s.tableBalcony} (max 10 · 2 ${s.bottlesWord})`,
    magazziniBalcDesc: `600€ (60€ ${s.perPerson}).`,
    magazziniPalco: `${s.tableStage} (max 10 · 3 ${s.bottlesWord})`,
    magazziniPalcoDesc: `900€ (90€ ${s.perPerson}).`,
    magazziniMenuHeading: `${s.menuWord} & ${s.vipTablesWord} · Magazzini Generali`,
    magazziniMenuTitle: `Casino Night · ${s.buffetLabel} 80€`,
    magazziniMenuSub: `${s.dec31} · 20:30 Ale Zeus + 23:00 We Love 2000`,
    magazziniCourses: [
      [s.startersHead, s.magazziniDishes[0]],
      [s.firstCourseHead, s.magazziniDishes[1]],
      [s.mainCourseHead, s.magazziniDishes[2]],
      [s.dessertHead, s.magazziniDishes[3]],
    ],
    magazziniTablesTitle: `Magazzini Generali · ${s.vipTablesWord} (300€ / 600€ / 900€)`,
    magazziniTablesSub: `Via Pietrasanta 16 · ${s.dec31}`,
    magazziniTablesRows: [
      [`${s.tablePista} (300€ · 1 ${s.bottleWord})`, `60€ ${s.perPerson} (max 5) · ${s.extraGuestNote}`],
      [`${s.tableBalcony} (600€ · 2 ${s.bottlesWord})`, `60€ ${s.perPerson} (max 10)`],
      [`${s.tableStage} (900€ · 3 ${s.bottlesWord})`, `90€ ${s.perPerson} (max 10)`],
    ],
    magazziniTablesNote: s.clubGadgetNote,
    magazziniSteps: [
      `20:30 Casino Night ${s.buffetLabel} & Ale Zeus (80€)`,
      `23:00 We Love 2000 · ${s.afterDinnerLabel} (30€)`,
      `00:00 ${s.nyePrefix}`,
      `00:30 – 05:00 · Magazzini Generali`,
    ],
    magazziniSource: `${s.confirmedTag} · Magazzini Generali: 30€ / 80€ / 300€ / 600€ / 900€.`,
    gattopardoSub: `Il Gattopardo ${s.milano} · 600€ ${s.perPerson} · 22:30 – 05:00`,
    gattopardoDesc: `${s.nyePrefix} · Il Gattopardo ${s.milano} (Via Piero della Francesca 47, 22:30–05:00): ${s.minSpendLabel} 600€ ${s.perPerson}. ${s.domesLabel}: ${s.uponRequest}.`,
    gattopardoFormat: `Il Gattopardo ${s.milano} · 22:30 – 05:00`,
    gattopardoMinSpend: `${s.minSpendLabel} (22:30 – 05:00)`,
    gattopardoMinSpendDesc: `600€ ${s.perPerson} (100%). ${s.whatsappBook}.`,
    gattopardoDomes: s.domesLabel,
    gattopardoDomesDesc: `${s.uponRequest} · ${s.whatsappBook}.`,
    gattopardoSteps: [
      `22:30 Il Gattopardo ${s.milano} · ${s.vipTablesWord}`,
      `00:00 ${s.nyePrefix}`,
      `00:30 – 05:00 · House & Commercial`,
    ],
    gattopardoSource: `${s.confirmedTag} · Il Gattopardo ${s.milano}: 600€ ${s.perPerson}.`,
    gardaDesc: `${s.nyePrefix} · JustMe Garda Lake (Just Me in Rouge · ${s.dec31}): 20€ · 70€ · 130€ · 440€–2.000€. ${s.benchmarkTag}.`,
    gardaFormat: 'Just Me in Rouge · 20:30 – 05:00 (21+)',
    gardaClub: `${s.afterDinnerLabel} (22:30)`,
    gardaBuffet: `${s.buffetLabel} (20:30)`,
    gardaGala: `${s.galaDinnerLabel} (20:30)`,
    gardaTables: `${s.vipTablesWord} (440€ – 2.000€)`,
    ariaDesc: `${s.nyePrefix} · Aria Club ${s.milano} (San Siro): 45€–55€ / 65€ / 130€ / 300€–1.000€. ${s.benchmarkTag}.`,
    fiftyFiveDesc: `${s.nyePrefix} · 55 ${s.milano} (Sempione): 50€ / 70€–75€ / 130€–140€ / 350€–1.200€. ${s.benchmarkTag}.`,
    tocquevilleDesc: `${s.nyePrefix} · Tocqueville 13 ${s.milano}: 35€–45€ / 60€ / 110€–120€ / 600€–2.000€. ${s.benchmarkTag}.`,
    hollywoodDesc: `${s.nyePrefix} · Hollywood ${s.milano} (Corso Como 15): 40€ / 60€ / 130€ / 300€–1.200€. ${s.benchmarkTag}.`,
    elevenDesc: `${s.nyePrefix} · 11Clubroom ${s.milano} (Via Tocqueville 11): 40€ / 65€ / 350€–1.000€. ${s.benchmarkTag}.`,
    afterDinnerLabel: s.afterDinnerLabel,
    buffetLabel: s.buffetLabel,
    galaDinnerLabel: s.galaDinnerLabel,
    clubDetails: s.clubDetails,
    buffetDetails: s.buffetDetails,
    galaDetails: s.galaDetails,
    vipTablesDetails: s.vipTablesDetails,
  };
}

const SEEDS_33: Record<Exclude<LocaleCode, 'it' | 'en'>, NativeLocaleSeed> = {
  es: {
    nyePrefix: 'Nochevieja 2027', milano: 'Milán', dec31: '31 de diciembre de 2026',
    confirmedTag: 'Tarifas Oficiales Confirmadas 2027', benchmarkTag: 'Tarifas orientativas edición anterior (por confirmar)', pendingTag: 'Programa y precios 2027 en actualización', tbaStatusTag: 'Programa y tarifas 2027 pendientes de anuncio oficial',
    uponRequest: 'Bajo consulta', perPerson: 'por persona', fromWord: 'desde', scheduleWord: 'Horario 31 Diciembre 2026', menuWord: 'Menú Oficial Nochevieja 2027', vipTablesWord: 'Mesas VIP Privé',
    dressCodeElegant: 'Elegante / Traje de Noche', dressCodeBlackTie: 'Black Tie / Gran Gatsby / Etiqueta Estricta', dressCodeSartorial: 'Alta Moda / Etiqueta Estricta', dressCodeCreative: 'Creativo / Clubwear Contemporáneo (18+)',
    whatsappBook: 'Reservas y disponibilidad 24/7 por WhatsApp +39 351 912 7047', afterDinnerLabel: 'Entrada Club + 1 Copa', buffetLabel: 'Buffet de Gala + Fiesta', galaDinnerLabel: 'Cena de Gala Servida + Fiesta',
    startersHead: 'Entrantes', seafoodStarters: 'Entrantes de Mar', landStarters: 'Entrantes de Tierra', firstCourseHead: 'Primer Plato', mainCourseHead: 'Plato Principal', dessertHead: 'Postre',
    tablePista: 'Mesa Pista', tableBalcony: 'Mesa Balcón', tableStage: 'Mesa Privé Escenario', bottlesWord: 'botellas', bottleWord: 'botella',
    justMeWines: 'Vinos blanco y tinto seleccionados, agua San Benedetto y café Segafredo incluidos',
    pelledocaWines: 'Vinos Cantine Volpi DOCG/DOC, agua, café, brindis de medianoche y cotechino con lentejas incluidos',
    justMeDishes: [
      'Rainbow Sashimi ponzu y yuzu (atún, salmón, pez limón, vieira, gamba roja, bogavante) · Croquetas Patanegra · Ceviche de pez limón',
      'Risotto de gambas, burrata y caviar · Just Sorbet',
      'Bacalao negro al miso O Solomillo de ternera Chianina a la trufa',
      'Parfait de chocolate de Nochevieja',
    ],
    pelledocaDishes: [
      'Ostras Fine de Claire, gambas rojas de Mazara, cigala imperial, tartar de atún con aguacate y tartar de salmón',
      'Tartar de Aberdeen Angus con burrata y avellanas, culatello di Zibello y flores de calabacín con ricotta',
      'Risotto Carnaroli Fedeli con bogavante, flores de calabacín y crema de burrata',
      'Solomillo irlandés a la brasa con crema de apionabo y patatas doradas · Delicias del chef · Cotechino y lentejas',
    ],
    magazziniDishes: [
      'Brioches salados, vol-au-vent, salmón ahumado, embutidos, quesos, pizza, fritos variados y salchichas',
      'Lasaña a la boloñesa · Linguine con almejas y bottarga',
      'Asado de ternera con patatas · Langostinos argentinos al horno',
      'Pandoro con crema pastelera y Panettone artesanal',
    ],
    extraGuestNote: 'cada invitado adicional abona 60€', clubGadgetNote: '1 copa, pulseras luminosas y bolsa tote de regalo incluidos',
    minSpendShort: 'Consumo mín. 600€', minSpendLabel: 'Mesa VIP Consumo Mínimo 600€', domesLabel: 'Mesas Cúpulas y Mesa Central', dinnerAndTable: 'Paquete Cena + Mesa VIP', priveAccessLabel: 'Acceso Privé + Buffet',
    clubDetails: 'Acceso nocturno con 1 consumación · tarifa orientativa por confirmar.', buffetDetails: 'Buffet festivo con bebida, brindis y fiesta · por confirmar.', galaDetails: 'Cena servida con vinos incluidos y fiesta · por confirmar.', vipTablesDetails: 'Mesa reservada con saldo en botellas · bajo solicitud.',
  },
  fr: {
    nyePrefix: 'Réveillon Nouvel An 2027', milano: 'Milan', dec31: '31 décembre 2026',
    confirmedTag: 'Tarifs Officiels Confirmés 2027', benchmarkTag: 'Tarifs indicatifs (à confirmer)', pendingTag: 'Programme et tarifs 2027 en cours de mise à jour', tbaStatusTag: 'Programme et tarifs 2027 en cours de finalisation',
    uponRequest: 'Sur demande', perPerson: 'par personne', fromWord: 'dès', scheduleWord: 'Programme du 31 Décembre 2026', menuWord: 'Menu Officiel Nouvel An 2027', vipTablesWord: 'Tables VIP Privé',
    dressCodeElegant: 'Élégant / Tenue de Soirée', dressCodeBlackTie: 'Black Tie / Thème Gatsby / Élégance Stricte', dressCodeSartorial: 'Haute Couture / Tenue de Soirée Stricte', dressCodeCreative: 'Créatif / Clubwear Contemporain (18+)',
    whatsappBook: 'Réservations 24/7 sur WhatsApp +39 351 912 7047', afterDinnerLabel: 'Entrée Club + 1 Verre', buffetLabel: 'Buffet de Gala + Soirée', galaDinnerLabel: 'Dîner de Gala Servi + Soirée',
    startersHead: 'Entrées', seafoodStarters: 'Entrées de la Mer', landStarters: 'Entrées de Terre', firstCourseHead: 'Premier Plat', mainCourseHead: 'Plat Principal', dessertHead: 'Dessert',
    tablePista: 'Table Piste', tableBalcony: 'Table Balcon', tableStage: 'Table Privé Scène', bottlesWord: 'bouteilles', bottleWord: 'bouteille',
    justMeWines: 'Vins blanc et rouge sélectionnés, eau San Benedetto et café Segafredo inclus',
    pelledocaWines: 'Vins Cantine Volpi DOCG/DOC, eau, café, coupe de minuit et cotechino aux lentilles inclus',
    justMeDishes: [
      'Sashimi Rainbow ponzu & yuzu (thon, saumon, sériole, Saint-Jacques, crevette rouge, homard) · Croquettes Patanegra · Ceviche de sériole',
      'Risotto crevettes, burrata et caviar · Just Sorbet',
      'Black Cod au miso OU Filet de bœuf Chianina à la truffe',
      'Parfait glacé au chocolat du Nouvel An',
    ],
    pelledocaDishes: [
      'Huîtres Fine de Claire, crevettes rouges de Mazara, langoustine impériale, tartare de thon et tartare de saumon',
      'Tartare d’Aberdeen Angus à la burrata et noisettes, culatello di Zibello et fleurs de courgette à la ricotta',
      'Risotto Carnaroli Fedeli au homard, fleurs de courgette et crème de burrata',
      'Filet de bœuf irlandais grillé, velouté de céleri-rave et pommes dorées · Douceurs du chef · Cotechino et lentilles',
    ],
    magazziniDishes: [
      'Brioches salées, vol-au-vent, saumon fumé, charcuterie, fromages, pizza, fritures et saucisses',
      'Lasagnes à la bolognaise · Linguine palourdes et poutargue',
      'Rôti de veau aux pommes de terre · Gambas argentines rôties',
      'Pandoro crème pâtissière et Panettone artisanal',
    ],
    extraGuestNote: 'chaque convive supplémentaire paie 60€', clubGadgetNote: '1 verre, bracelets lumineux et tote bag offerts inclus',
    minSpendShort: 'Minimum 600€', minSpendLabel: 'Table VIP Minimum Spend 600€', domesLabel: 'Tables Coupoles & Table Centrale', dinnerAndTable: 'Formule Dîner + Table VIP', priveAccessLabel: 'Accès Privé + Buffet',
    clubDetails: 'Entrée club avec 1 verre inclus · tarif indicatif à confirmer.', buffetDetails: 'Buffet festif avec boisson, coupe et soirée · à confirmer.', galaDetails: 'Dîner servi avec vins et soirée · à confirmer.', vipTablesDetails: 'Table réservée avec crédit bouteilles · sur demande.',
  },
  de: {
    nyePrefix: 'Silvester 2027', milano: 'Mailand', dec31: '31. Dezember 2026',
    confirmedTag: 'Offiziell bestätigte Preise 2027', benchmarkTag: 'Richtpreise Vorjahr (vorbehaltlich Bestätigung)', pendingTag: 'Programm & Preise 2027 in Aktualisierung', tbaStatusTag: 'Offizielles Silvesterprogramm 2027 noch offen',
    uponRequest: 'Auf Anfrage', perPerson: 'pro Person', fromWord: 'ab', scheduleWord: 'Zeitplan 31. Dezember 2026', menuWord: 'Offizielles Silvestermenü 2027', vipTablesWord: 'VIP-Privé-Tische',
    dressCodeElegant: 'Elegant / Abendgarderobe', dressCodeBlackTie: 'Black Tie / Great Gatsby Thema / Streng Elegant', dressCodeSartorial: 'Haute Couture / Streng Elegant', dressCodeCreative: 'Kreativ / Modern Clubwear (18+)',
    whatsappBook: 'Reservierung 24/7 per WhatsApp +39 351 912 7047', afterDinnerLabel: 'Club-Eintritt + 1 Drink', buffetLabel: 'Gala-Buffet + Clubparty', galaDinnerLabel: 'Serviertes Gala-Dinner + Party',
    startersHead: 'Vorspeisen', seafoodStarters: 'Fischvorspeisen', landStarters: 'Fleischvorspeisen', firstCourseHead: 'Erster Gang', mainCourseHead: 'Hauptgang', dessertHead: 'Dessert',
    tablePista: 'Dancefloor-Tisch', tableBalcony: 'Balkon-Tisch', tableStage: 'Stage-Privé-Tisch', bottlesWord: 'Flaschen', bottleWord: 'Flasche',
    justMeWines: 'Weiß- und Rotwein, San Benedetto Wasser & Segafredo Kaffee inklusive',
    pelledocaWines: 'Weine Cantine Volpi DOCG/DOC, Wasser, Kaffee, Mitternachtssekt & Cotechino mit Linsen inklusive',
    justMeDishes: [
      'Mariniertes Rainbow Sashimi mit Ponzu & Yuzu (Thunfisch, Lachs, Gelbschwanz, Jakobsmuschel, Garnele, Hummer) · Patanegra-Kroketten · Ceviche',
      'Risotto mit Garnelen, Burrata und Kaviar · Just Sorbet',
      'Miso Black Cod ODER Chianina-Rinderfilet mit Trüffel',
      'Silvester-Schokoladen-Parfait',
    ],
    pelledocaDishes: [
      'Fine de Claire Austern, Mazara rote Garnelen, Kaisergranat, Thunfischtatar & Lachstatar',
      'Aberdeen Angus Tatar mit Burrata & Haselnüssen, Culatello di Zibello & gefüllte Kürbisblüten',
      'Carnaroli-Risotto Fedeli mit Hummer, Kürbisblüten & Burrata-Creme',
      'Gegrilltes irisches Rinderfilet auf Sellerieschaum mit Kartoffeln · Chef-Dessert · Cotechino & Linsen',
    ],
    magazziniDishes: [
      'Herzhafte Brioches, Vol-au-vent, Räucherlachs, Aufschnitt, Käse, Pizza, Frittiertes & Würstchen',
      'Lasagne Bolognese · Linguine mit Venusmuscheln & Bottarga',
      'Kalbsbraten mit Kartoffeln · Argentinische Ofengarnelen',
      'Pandoro mit Vanillecreme & traditioneller Panettone',
    ],
    extraGuestNote: 'jeder weitere Gast zahlt 60€ Anteil', clubGadgetNote: '1 Drink, Leuchtarmbänder & We Love 2000 Stofftasche inklusive',
    minSpendShort: 'Mindestverzehr 600€', minSpendLabel: 'VIP-Tisch Mindestverzehr 600€', domesLabel: 'Kuppel-Tische & Zentraltisch', dinnerAndTable: 'Paket Dinner + VIP-Tisch', priveAccessLabel: 'Privé-Zugang + Buffet',
    clubDetails: 'Abendeinlass inkl. 1 Getränk · Richtpreis vorbehaltlich Bestätigung.', buffetDetails: 'Festbuffet mit Drink, Sekt & Clubzugang · Bestätigung vorbehalten.', galaDetails: 'Serviertes Dinner inkl. Wein · auf Bestätigung.', vipTablesDetails: 'Reservierter Tisch mit Flaschenguthaben · auf Anfrage.',
  },
  pt: {
    nyePrefix: 'Réveillon 2027', milano: 'Milão', dec31: '31 de dezembro de 2026',
    confirmedTag: 'Preços Oficiais Confirmados 2027', benchmarkTag: 'Tarifas indicativas (a confirmar)', pendingTag: 'Programa e preços 2027 em atualização', tbaStatusTag: 'Programa e tarifas 2027 em definição oficial',
    uponRequest: 'Sob consulta', perPerson: 'por pessoa', fromWord: 'desde', scheduleWord: 'Programa 31 Dezembro 2026', menuWord: 'Menu Oficial Réveillon 2027', vipTablesWord: 'Mesas VIP Privé',
    dressCodeElegant: 'Elegante / Traje de Gala', dressCodeBlackTie: 'Black Tie / O Grande Gatsby', dressCodeSartorial: 'Alta Moda / Traje de Gala Rigoroso', dressCodeCreative: 'Criativo / Clubwear Contemporâneo (18+)',
    whatsappBook: 'Reservas e disponibilidade 24/7 no WhatsApp +39 351 912 7047', afterDinnerLabel: 'Entrada Club + 1 Bebida', buffetLabel: 'Buffet de Gala + Festa', galaDinnerLabel: 'Jantar de Gala Servido + Festa',
    startersHead: 'Entradas', seafoodStarters: 'Entradas do Mar', landStarters: 'Entradas da Terra', firstCourseHead: 'Primeiro Prato', mainCourseHead: 'Prato Principal', dessertHead: 'Sobremesa',
    tablePista: 'Mesa Pista', tableBalcony: 'Mesa Varanda', tableStage: 'Mesa Privé Palco', bottlesWord: 'garrafas', bottleWord: 'garrafa',
    justMeWines: 'Vinhos branco e tinto selecionados, água San Benedetto e café Segafredo incluídos',
    pelledocaWines: 'Vinhos Cantine Volpi DOCG/DOC, água, café, espumante à meia-noite e cotechino com lentilhas incluídos',
    justMeDishes: [
      'Rainbow Sashimi marinado ponzu & yuzu (atum, salmão, lírio, vieira, camarão vermelho, lagosta) · Croquetes Patanegra · Ceviche',
      'Risotto de camarão, burrata e caviar · Just Sorbet',
      'Bacalhau negro ao miso OU Lombo de novilho Chianina com trufa',
      'Parfait de chocolate de Réveillon',
    ],
    pelledocaDishes: [
      'Ostras Fine de Claire, camarões vermelhos de Mazara, lagostim imperial, tártaro de atum e tártaro de salmão',
      'Tártaro Aberdeen Angus com burrata e avelãs, culatello di Zibello e flores de curgete com ricotta',
      'Risotto Carnaroli Fedeli de lagosta com flores de curgete e creme de burrata',
      'Filé irlandês grelhado sobre creme de aipo e batatas douradas · Doçaria do chef · Cotechino com lentilhas',
    ],
    magazziniDishes: [
      'Brioches salgados, vol-au-vent, salmão fumado, enchidos, queijos, pizza, fritos e salsichas',
      'Lasanha à bolonhesa · Linguine com amêijoas e botarga',
      'Vitela assada com batatas · Gambas argentinas no forno',
      'Pandoro com creme de pasteleiro e Panettone',
    ],
    extraGuestNote: 'convidado adicional paga 60€', clubGadgetNote: '1 bebida, pulseiras LED e saco tote de oferta incluídos',
    minSpendShort: 'Consumo mín. 600€', minSpendLabel: 'Mesa VIP Consumo Mínimo 600€', domesLabel: 'Mesas Cúpulas & Mesa Central', dinnerAndTable: 'Pacote Jantar + Mesa VIP', priveAccessLabel: 'Acesso Privé + Buffet',
    clubDetails: 'Entrada no clube com 1 bebida · preço orientativo sob confirmação.', buffetDetails: 'Buffet festivo com brinde e festa · sob confirmação.', galaDetails: 'Jantar servido com vinhos incluídos · sob confirmação.', vipTablesDetails: 'Mesa reservada com saldo em garrafas · sob consulta.',
  },
  nl: {
    nyePrefix: 'Oud en Nieuw 2027', milano: 'Milaan', dec31: '31 december 2026',
    confirmedTag: 'Officieel Bevestigde Prijzen 2027', benchmarkTag: 'Richtprijzen (onder voorbehoud)', pendingTag: 'Programma en prijzen 2027 worden bijgewerkt', tbaStatusTag: 'Officiële line-up en tarieven 2027 worden binnenkort bekendgemaakt',
    uponRequest: 'Op aanvraag', perPerson: 'per persoon', fromWord: 'vanaf', scheduleWord: 'Schema 31 December 2026', menuWord: 'Officieel Oudjaarsmenu 2027', vipTablesWord: 'VIP Privé Tafels',
    dressCodeElegant: 'Avondkleding / Chic', dressCodeBlackTie: 'Black Tie / The Great Gatsby', dressCodeSartorial: 'Haute Couture / Streng Elegant', dressCodeCreative: 'Creatief / Clubwear (18+)',
    whatsappBook: 'Reserveringen 24/7 via WhatsApp +39 351 912 7047', afterDinnerLabel: 'Clubtoegang + 1 Drankje', buffetLabel: 'Galabuffet + Clubfeest', galaDinnerLabel: 'Galadiner + Clubfeest',
    startersHead: 'Voorgerechten', seafoodStarters: 'Visgerechten', landStarters: 'Vleesgerechten', firstCourseHead: 'Tussengerecht', mainCourseHead: 'Hoofdgerecht', dessertHead: 'Nagerecht',
    tablePista: 'Dansvloertafel', tableBalcony: 'Balkontafel', tableStage: 'Stage Privé Tafel', bottlesWord: 'flessen', bottleWord: 'fles',
    justMeWines: 'Geselecteerde witte en rode wijnen, San Benedetto water en Segafredo koffie inbegrepen',
    pelledocaWines: 'Wijnen Cantine Volpi DOCG/DOC, water, koffie, middernachtstoast en cotechino met linzen inbegrepen',
    justMeDishes: [
      'Rainbow Sashimi ponzu & yuzu (tonijn, zalm, coquille, rode garnaal, kreeft) · Patanegra kroketten · Ceviche',
      'Risotto met garnalen, burrata en kaviaar · Just Sorbet',
      'Black Cod met miso OF Chianina ossenhaas met truffel',
      'Chocoladeparfait voor Oudjaar',
    ],
    pelledocaDishes: [
      'Fine de Claire oesters, Mazara rode garnalen, langoustine, tonijntartaar & zalmtartaar',
      'Aberdeen Angus tartaar met burrata & hazelnoot, culatello & gevulde courgettebloemen',
      'Carnaroli risotto met kreeft, courgettebloemen en burratacrème',
      'Gegrilde Ierse ossenhaas op knolselderijcrème & aardappelen · Chef-dessert · Cotechino & linzen',
    ],
    magazziniDishes: [
      'Hartige brioches, vol-au-vent, gerookte zalm, vleeswaren, kazen, pizza, gefrituurde hapjes',
      'Lasagne Bolognese · Linguine met venusschelpen & bottarga',
      'Kalfsgebraad met aardappelen · Argentijnse garnalen uit de oven',
      'Pandoro met banketbakkersroom & Panettone',
    ],
    extraGuestNote: 'extra gast betaalt 60€', clubGadgetNote: '1 drankje, LED-polsbandjes en tote bag inbegrepen',
    minSpendShort: 'Min. besteding 600€', minSpendLabel: 'VIP Tafel Minimum Spend 600€', domesLabel: 'Koepeltafels & Centrale Tafel', dinnerAndTable: 'Pakket Diner + VIP Tafel', priveAccessLabel: 'Privé-toegang + Buffet',
    clubDetails: 'Clubtoegang inclusief 1 drankje · richtprijs op aanvraag.', buffetDetails: 'Feestbuffet met welkomstdrankje & feest · onder voorbehoud.', galaDetails: 'Uitgeserveerd diner met wijnen · onder voorbehoud.', vipTablesDetails: 'Gereserveerde tafel met flesbudget · op aanvraag.',
  },
  ru: {
    nyePrefix: 'Новый год 2027', milano: 'Милан', dec31: '31 декабря 2026 года',
    confirmedTag: 'Официально подтверждённые цены 2027', benchmarkTag: 'Ориентировочные тарифы (требуют подтверждения)', pendingTag: 'Программа и цены 2027 обновляются', tbaStatusTag: 'Официальная программа и тарифы 2027 на этапе согласования',
    uponRequest: 'По запросу', perPerson: 'с человека', fromWord: 'от', scheduleWord: 'Расписание 31 декабря 2026', menuWord: 'Официальное новогоднее меню 2027', vipTablesWord: 'VIP-столы Privé',
    dressCodeElegant: 'Вечерний элегантный дресс-код', dressCodeBlackTie: 'Black Tie / Великий Гэтсби / Строгий вечерний', dressCodeSartorial: 'Высокая мода / Строгий вечерний стиль', dressCodeCreative: 'Креативный клубный стиль (18+)',
    whatsappBook: 'Бронирование 24/7 в WhatsApp +39 351 912 7047', afterDinnerLabel: 'Вход в клуб + 1 напиток', buffetLabel: 'Гала-буфет + Вечеринка', galaDinnerLabel: 'Гала-ужин + Вечеринка',
    startersHead: 'Закуски', seafoodStarters: 'Морские закуски', landStarters: 'Мясные закуски', firstCourseHead: 'Первое блюдо', mainCourseHead: 'Основное блюдо', dessertHead: 'Десерт',
    tablePista: 'Стол на танцполе', tableBalcony: 'Стол на балконе', tableStage: 'Стол Privé у сцены', bottlesWord: 'бутылки', bottleWord: 'бутылка',
    justMeWines: 'Белое и красное вино, вода San Benedetto и кофе Segafredo включены',
    pelledocaWines: 'Вина Cantine Volpi DOCG/DOC, вода, кофе, игристое в полночь и котекино с чечевицей включены',
    justMeDishes: [
      'Радужное сашими понзу и юдзу (тунец, лосось, лакедра, гребешок, красная креветка, лобстер) · Крокеты Патанегра · Севиче',
      'Ризотто с креветками, бурратой и икрой · Сорбет',
      'Чёрная треска мисо ИЛИ говяжье филе Кьянина с трюфелем',
      'Новогоднее шоколадное парфе',
    ],
    pelledocaDishes: [
      'Устрицы Fine de Claire, красные креветки Мазары, королевский лангустин, тартар из тунца и лосося',
      'Тартар Aberdeen Angus с бурратой и фундуком, кулателло ди Зибелло и фаршированные цветки цукини',
      'Ризотто Карнароли с лобстером, цветками цукини и кремом из бурраты',
      'Ирландское говяжье филе на гриле с пюре из сельдерея · Десерт шефа · Котекино с чечевицей',
    ],
    magazziniDishes: [
      'Солёные бриоши, волованы, копчёный лосось, мясная и сырная нарезка, пицца, горячие закуски',
      'Лазанья болоньезе · Лингвини с вонголе и боттаргой',
      'Жаркое из телятины с картофелем · Аргентинские креветки',
      'Пандоро с заварным кремом и панеттоне',
    ],
    extraGuestNote: 'дополнительный гость доплачивает 60€', clubGadgetNote: '1 напиток, светящиеся браслеты и фирменная сумка включены',
    minSpendShort: 'Мин. депозит 600€', minSpendLabel: 'VIP-стол с депозитом 600€', domesLabel: 'Столы в куполах и центральный стол', dinnerAndTable: 'Пакет Ужин + VIP-стол', priveAccessLabel: 'Зона Privé + Буфет',
    clubDetails: 'Вход с 1 напитком · ориентировочная цена требует подтверждения.', buffetDetails: 'Праздничный фуршет с напитком и вечеринкой · требует подтверждения.', galaDetails: 'Гала-ужин с вином и программой · требует подтверждения.', vipTablesDetails: 'Забронированный стол с бутылками · по запросу.',
  },
  tr: {
    nyePrefix: 'Yılbaşı 2027', milano: 'Milano', dec31: '31 Aralık 2026',
    confirmedTag: '2027 Resmi Onaylı Fiyatlar', benchmarkTag: 'Geçmiş dönem referans fiyatları (onaya tabi)', pendingTag: '2027 Programı ve Fiyatları Güncelleniyor', tbaStatusTag: '2027 resmi programı ve fiyatları açıklanacak',
    uponRequest: 'Talep üzerine', perPerson: 'kişi başı', fromWord: 'başlangıç', scheduleWord: '31 Aralık 2026 Programı', menuWord: '2027 Resmi Yılbaşı Menüsü', vipTablesWord: 'VIP Privé Masalar',
    dressCodeElegant: 'Şık Gece Kıyafeti', dressCodeBlackTie: 'Black Tie / Muhteşem Gatsby Konsepti', dressCodeSartorial: 'Haute Couture / Kesin Şık Giyim', dressCodeCreative: 'Modern Clubwear (18+)',
    whatsappBook: 'WhatsApp 7/24 rezervasyon: +39 351 912 7047', afterDinnerLabel: 'Kulüp Girişi + 1 İçecek', buffetLabel: 'Gala Büfesi + Parti', galaDinnerLabel: 'Gala Yemeği + Parti',
    startersHead: 'Başlangıçlar', seafoodStarters: 'Deniz Ürünleri Başlangıçları', landStarters: 'Et Başlangıçları', firstCourseHead: 'Ara Sıcak', mainCourseHead: 'Ana Yemek', dessertHead: 'Tatlı',
    tablePista: 'Pist Masası', tableBalcony: 'Balkon Masası', tableStage: 'Sahne Privé Masası', bottlesWord: 'şişe', bottleWord: 'şişe',
    justMeWines: 'Seçkin beyaz ve kırmızı şaraplar, San Benedetto su ve Segafredo kahve dahildir',
    pelledocaWines: 'Cantine Volpi DOCG/DOC şarapları, su, kahve, gece yarısı köpüklü şarap ve mercimek dahildir',
    justMeDishes: [
      'Ponzu ve yuzu soslu Rainbow Sashimi (orkinos, somon, sarıkuyruk, tarak, karides, ıstakoz) · Patanegra kroket · Ceviche',
      'Karides, burrata ve havyarlı risotto · Sorbe',
      'Miso soslu siyah morina VEYA Trüflü Chianina bonfile',
      'Yılbaşı çikolatalı parfe',
    ],
    pelledocaDishes: [
      'Fine de Claire istiridye, Mazara kırmızı karides, langoustine, ton ve somon tartar',
      'Aberdeen Angus tartar, culatello di Zibello ve ricotta dolgulu kabak çiçeği',
      'Istakozlu Carnaroli risotto ve burrata kreması',
      'Izgara İrlanda bonfile ve kereviz püresi · Şefin tatlısı · Cotechino ve mercimek',
    ],
    magazziniDishes: [
      'Tuzlu brioche, vol-au-vent, somon füme, şarküteri ve peynir, pizza, sıcak atıştırmalıklar',
      'Bolonez lazanya · Kum midyeli ve bottargalı linguine',
      'Fırın dana rosto ve patates · Fırınlanmış Arjantin karidesi',
      'Kremalı Pandoro ve Panettone',
    ],
    extraGuestNote: 'ek misafir 60€ öder', clubGadgetNote: '1 içecek, LED bileklik ve bez çanta dahildir',
    minSpendShort: 'Min. Harcama 600€', minSpendLabel: 'VIP Masa Minimum Harcama 600€', domesLabel: 'Kubbe Masaları ve Merkez Masa', dinnerAndTable: 'Akşam Yemeği + VIP Masa', priveAccessLabel: 'Privé Girişi + Büfe',
    clubDetails: '1 içecek dahil kulüp girişi · referans fiyat onaya tabidir.', buffetDetails: 'Büfe ve gece kulübü erişimi · onaya tabidir.', galaDetails: 'Şarap dahil oturmalı yemek · onaya tabidir.', vipTablesDetails: 'Şişe kredili rezerve masa · talep üzerine.',
  },
  zh: {
    nyePrefix: '2027 米兰跨年夜', milano: '米兰', dec31: '2026年12月31日',
    confirmedTag: '2027 官方确认价格', benchmarkTag: '往届参考价格（待场地最终确认）', pendingTag: '2027 活动日程与票价更新中', tbaStatusTag: '2027 官方跨年日程与票价待公布',
    uponRequest: '详询客服', perPerson: '每位', fromWord: '起', scheduleWord: '2026年12月31日时间表', menuWord: '2027 官方跨年晚宴菜单', vipTablesWord: 'VIP 卡座',
    dressCodeElegant: '优雅晚装 / 正装', dressCodeBlackTie: 'Black Tie / 了不起的盖茨比主题', dressCodeSartorial: '高级定制晚宴礼服', dressCodeCreative: '潮流时尚派对着装（18+）',
    whatsappBook: 'WhatsApp 24小时多语预订：+39 351 912 7047', afterDinnerLabel: '派对入场 + 1杯饮品', buffetLabel: '盛大自助餐 + 派对', galaDinnerLabel: '跨年晚宴 + 派对',
    startersHead: '前菜拼盘', seafoodStarters: '海鲜前菜', landStarters: '精选肉类前菜', firstCourseHead: '第一道主食', mainCourseHead: '主菜', dessertHead: '甜品',
    tablePista: '舞池卡座', tableBalcony: '二楼包厢卡座', tableStage: '舞台尊享卡座', bottlesWord: '瓶名酒', bottleWord: '瓶名酒',
    justMeWines: '含精选白红葡萄酒、San Benedetto 矿泉水与 Segafredo 咖啡',
    pelledocaWines: '含 Cantine Volpi DOCG/DOC 葡萄酒、矿泉水、咖啡及零点起泡酒祝酒',
    justMeDishes: [
      '柚子醋腌制彩虹刺身拼盘（金枪鱼、三文鱼、青甘、扇贝、红虾、龙虾）· 西班牙火腿炸丸子 · 柠檬腌鱼',
      '大虾布拉塔奶酪鱼子酱烩饭 · 青柠雪芭',
      '味噌烤黑鳕鱼 或 黑松露契安尼娜牛菲力',
      '跨年限定巧克力芭菲',
    ],
    pelledocaDishes: [
      'Fine de Claire 生蚝、西西里红虾、海鳌虾、金枪鱼塔塔与三文鱼塔塔',
      '安格斯牛肉塔塔配布拉塔与榛子、帕尔马火腿及水牛芝士炸南瓜花',
      'Carnaroli 龙虾配南瓜花与布拉塔奶香烩饭',
      '炭烤爱尔兰牛菲力配块根芹泥与烤土豆 · 主厨甜品 · 传统猪脚与扁豆',
    ],
    magazziniDishes: [
      '咸味布里欧修、酥盒、烟熏三文鱼、冷切芝士拼盘、披萨与香脆炸物',
      '意式肉酱千层面 · 蛤蜊乌鱼子扁面',
      '烤小牛肉配土豆 · 焗阿根廷红虾',
      '意式圣诞蛋糕配蛋奶酱与经典潘妮托尼',
    ],
    extraGuestNote: '额外增加宾客每人加付60€', clubGadgetNote: '含1杯饮品、发光手环及限量帆布袋',
    minSpendShort: '最低消费 600€', minSpendLabel: 'VIP卡座最低消费 600€', domesLabel: '穹顶卡座与中央尊位', dinnerAndTable: '双人晚宴 + VIP卡座', priveAccessLabel: 'VIP专属区 + 自助餐',
    clubDetails: '含1杯酒水 · 参考价以最终确认为准。', buffetDetails: '含欢迎饮品、祝酒及派对 · 待确认。', galaDetails: '含佐餐葡萄酒及倒数派对 · 待确认。', vipTablesDetails: '含名酒额度及优先通道 · 欢迎垂询。',
  },
  ar: {
    nyePrefix: 'رأس السنة 2027', milano: 'ميلانو', dec31: '31 ديسمبر 2026',
    confirmedTag: 'الأسعار الرسمية المؤكدة لعام 2027', benchmarkTag: 'أسعار استرشادية (تخضع للتأكيد)', pendingTag: 'تحديث برنامج وأسعار رأس السنة 2027', tbaStatusTag: 'سيتم الإعلان عن برنامج وأسعار 2027 قريباً',
    uponRequest: 'عند الطلب', perPerson: 'للشخص', fromWord: 'من', scheduleWord: 'جدول 31 ديسمبر 2026', menuWord: 'قائمة عشاء رأس السنة 2027', vipTablesWord: 'طاولات VIP',
    dressCodeElegant: 'أنيق / ملابس سهرة', dressCodeBlackTie: 'رسمي فاخر / ثيم غاتسبي العظيم', dressCodeSartorial: 'أزياء سهرة فاخرة جداً', dressCodeCreative: 'أنيق وعصري (+18)',
    whatsappBook: 'الحجز 24/7 على واتساب +39 351 912 7047', afterDinnerLabel: 'دخول النادي + مشروب واحد', buffetLabel: 'بوفيه احتفالي + سهرة', galaDinnerLabel: 'عشاء غالا + سهرة',
    startersHead: 'المقبلات', seafoodStarters: 'مقبلات بحرية', landStarters: 'مقبلات لحوم', firstCourseHead: 'الطبق الأول', mainCourseHead: 'الطبق الرئيسي', dessertHead: 'الحلوى',
    tablePista: 'طاولة الساحة الرئيسية', tableBalcony: 'طاولة الشرفة', tableStage: 'طاولة بجانب المسرح VIP', bottlesWord: 'زجاجات', bottleWord: 'زجاجة',
    justMeWines: 'يشمل مشروبات مختارة، مياه سان بينيديتو وقهوة سيغافريدو',
    pelledocaWines: 'يشمل مشروبات كانتيني فولبي الفاخرة، مياه، قهوة ونخب منتصف الليل',
    justMeDishes: [
      'ساشيمي ملون متبل باليوزو والبونزو (تونة، سلمون، جمبري أحمر، كركند) · كروكيت · سيفيتشي',
      'ريزوتو بالجمبري والبوراتا والكافيار · سوربيه منعش',
      'سمك القد الأسود بالميسو أو فيليه لحم بالكمأ',
      'بارفيه الشوكولاتة الفاخر لرأس السنة',
    ],
    pelledocaDishes: [
      'محار فاخر، جمبري مازارا الأحمر، لانغوستين، تارتار تونة بالأفوكادو وتارتار سلمون',
      'تارتار لحم أنغوس مع البوراتا والبندق وزهور الكوسا بالريكوتا',
      'ريزوتو الكركند وزهور الكوسا بكريمة البوراتا',
      'فيليه بقري إيرلندي مشوي مع مهروس الكرفس والبطاطا الذهبية · حلويات الشيف',
    ],
    magazziniDishes: [
      'معجنات مالحة، سلمون مدخن، أجبان، بيتزا، مقليات ونقانق مشوية',
      'لازانيا بولونيز · لينغويني بالمحار',
      'لحم عجل مشوي بالبطاطا · جمبري أرجنتيني بالفرن',
      'باندورو بالكريمة وبانيتوني تقليدي',
    ],
    extraGuestNote: 'يدفع الضيف الإضافي 60€', clubGadgetNote: 'يشمل مشروباً، أساور مضيئة وحقيبة هدية',
    minSpendShort: 'حد أدنى 600€', minSpendLabel: 'طاولة VIP حد أدنى 600€', domesLabel: 'طاولات القبة والطاولة المركزية', dinnerAndTable: 'باقة عشاء + طاولة VIP', priveAccessLabel: 'دخول منطقة Privé + بوفيه',
    clubDetails: 'دخول السهرة مع مشروب واحد · سعر استرشادي.', buffetDetails: 'بوفيه احتفالي مع دخول النادي · قيد التأكيد.', galaDetails: 'عشاء فاخر وسهرة · قيد التأكيد.', vipTablesDetails: 'طاولة محجوزة مع أولوية الدخول · عند الطلب.',
  },
  bg: {
    nyePrefix: 'Нова година 2027', milano: 'Милано', dec31: '31 декември 2026',
    confirmedTag: 'Официално потвърдени цени 2027', benchmarkTag: 'Ориентировъчни цени (подлежат на потвърждение)', pendingTag: 'Програмата и цените за 2027 се обновяват', tbaStatusTag: 'Програмата за 2027 се уточнява официално',
    uponRequest: 'По запитване', perPerson: 'на човек', fromWord: 'от', scheduleWord: 'Програма 31 декември 2026', menuWord: 'Официално меню Нова година 2027', vipTablesWord: 'VIP маси Privé',
    dressCodeElegant: 'Елегантно вечерно облекло', dressCodeBlackTie: 'Black Tie / Великият Гетсби', dressCodeSartorial: 'Висша мода / Строг вечерен стил', dressCodeCreative: 'Модерен клубен стил (18+)',
    whatsappBook: 'Резервации 24/7 в WhatsApp +39 351 912 7047', afterDinnerLabel: 'Вход клуб + 1 напитка', buffetLabel: 'Празничен бюфет + парти', galaDinnerLabel: 'Гала вечеря + парти',
    startersHead: 'Предястия', seafoodStarters: 'Морски предястия', landStarters: 'Месни предястия', firstCourseHead: 'Първо ястие', mainCourseHead: 'Основно ястие', dessertHead: 'Десерт',
    tablePista: 'Маса дансинг', tableBalcony: 'Маса балкон', tableStage: 'VIP маса до сцена', bottlesWord: 'бутилки', bottleWord: 'бутилка',
    justMeWines: 'Подбрани бели и червени вина, вода San Benedetto и кафе Segafredo включени',
    pelledocaWines: 'Селектирани вина Cantine Volpi DOCG/DOC, вода, кафе и наздравица в полунощ',
    justMeDishes: ['Мариновано сашими (тон, сьомга, миди, скариди, омар) · крокети · севиче', 'Ризото със скариди, бурата и хайвер · сорбе', 'Черна треска с мисо ИЛИ говеждо филе с трюфел', 'Новогодишно шоколадово парфе'],
    pelledocaDishes: ['Стриди Fine de Claire, червени скариди, лангустина, тартар от тон и сьомга', 'Тартар Angus с бурата и лешници, кулатело и тиквички с рикота', 'Ризото Карнароли с омар и крем бурата', 'Ирландско говеждо филе с целина и картофи · десерт · котекино с леща'],
    magazziniDishes: ['Солени бриоши, пушена сьомга, сирена, пица и топли хапки', 'Лазаня болонезе · лингуини с миди и ботарго', 'Печено телешко с картофи · аржентински скариди', 'Пандоро с крем и панетоне'],
    extraGuestNote: 'допълнителен гост доплаща 60€', clubGadgetNote: '1 напитка, светещи гривни и чанта подарък',
    minSpendShort: 'Мин. консумация 600€', minSpendLabel: 'VIP маса минимум 600€', domesLabel: 'Куполни и централни маси', dinnerAndTable: 'Пакет Вечеря + VIP маса', priveAccessLabel: 'Достъп Privé + Бюфет',
    clubDetails: 'Вход с 1 напитка · ориентировъчна цена.', buffetDetails: 'Бюфет с напитка и парти · очаква потвърждение.', galaDetails: 'Вечеря с вино и парти · очаква потвърждение.', vipTablesDetails: 'Резервирана маса с бутилки · по запитване.',
  },
  hr: {
    nyePrefix: 'Doček Nove godine 2027', milano: 'Milano', dec31: '31. prosinca 2026.',
    confirmedTag: 'Službeno potvrđene cijene 2027.', benchmarkTag: 'Informativne cijene (podložne potvrdi)', pendingTag: 'Program i cijene za 2027. u pripremi', tbaStatusTag: 'Službeni program za 2027. u pripremi',
    uponRequest: 'Na upit', perPerson: 'po osobi', fromWord: 'od', scheduleWord: 'Raspored 31. prosinca 2026.', menuWord: 'Službeni novogodišnji meni 2027.', vipTablesWord: 'VIP stolovi Privé',
    dressCodeElegant: 'Elegantna večernja odjeća', dressCodeBlackTie: 'Black Tie / Veliki Gatsby', dressCodeSartorial: 'Visoka moda / Strogi svečani stil', dressCodeCreative: 'Moderni klupski stil (18+)',
    whatsappBook: 'Rezervacije 24/7 na WhatsApp +39 351 912 7047', afterDinnerLabel: 'Ulaz u klub + 1 piće', buffetLabel: 'Svečani bife + party', galaDinnerLabel: 'Svečana večera + party',
    startersHead: 'Predjela', seafoodStarters: 'Morska predjela', landStarters: 'Mesna predjela', firstCourseHead: 'Prvo jelo', mainCourseHead: 'Glavno jelo', dessertHead: 'Desert',
    tablePista: 'Stol na podiju', tableBalcony: 'Stol na balkonu', tableStage: 'VIP stol kod pozornice', bottlesWord: 'boce', bottleWord: 'boca',
    justMeWines: 'Odabrana bijela i crna vina, voda San Benedetto i kava Segafredo uključeni',
    pelledocaWines: 'Vrhunska vina Cantine Volpi DOCG/DOC, voda, kava i ponoćni pjenušac uključeni',
    justMeDishes: ['Marinirani sashimi (tuna, losos, jakovske kapice, škampi, jastog) · kroketi · ceviche', 'Rižoto sa škampima, burratom i kavijarom · sorbet', 'Bakalar s misom ILI goveđi file s tartufima', 'Novogodišnji čokoladni parfait'],
    pelledocaDishes: ['Kamenice Fine de Claire, crveni škampi Mazara, carski škamp, tartar od tune i lososa', 'Angus tartar s burratom, culatello i cvjetovi tikvice s ricottom', 'Carnaroli rižoto s jastogom i kremom od burrate', 'Irski goveđi file na žaru s pireom od celera · desert · cotechino s lećom'],
    magazziniDishes: ['Slani brioši, dimljeni losos, sirevi, pršut, pizza i topli zalogaji', 'Lazanje Bolognese · linguine sa školjkama i botargom', 'Pečena teletina s krumpirom · pečeni argentinski škampi', 'Pandoro s kremom i panettone'],
    extraGuestNote: 'dodatni gost plaća 60€', clubGadgetNote: '1 piće, LED narukvice i platnena torba uključeni',
    minSpendShort: 'Min. potrošnja 600€', minSpendLabel: 'VIP stol min. potrošnja 600€', domesLabel: 'Kupolasti i središnji stolovi', dinnerAndTable: 'Paket Večera + VIP stol', priveAccessLabel: 'Pristup Privé + Bife',
    clubDetails: 'Ulaz s 1 pićem · informativna cijena.', buffetDetails: 'Svečani bife s pićem i klubom · na upit.', galaDetails: 'Poslužena večera s vinima · na upit.', vipTablesDetails: 'Rezervirani stol s bocama · na upit.',
  },
  cs: {
    nyePrefix: 'Silvestr 2027', milano: 'Milán', dec31: '31. prosince 2026',
    confirmedTag: 'Oficiálně potvrzené ceny 2027', benchmarkTag: 'Orientační ceny (vyžadují potvrzení)', pendingTag: 'Program a ceny 2027 se aktualizují', tbaStatusTag: 'Oficiální program na rok 2027 se připravuje',
    uponRequest: 'Na vyžádání', perPerson: 'na osobu', fromWord: 'od', scheduleWord: 'Harmonogram 31. prosince 2026', menuWord: 'Oficiální silvestrovské menu 2027', vipTablesWord: 'VIP stoly Privé',
    dressCodeElegant: 'Elegantní společenský oděv', dressCodeBlackTie: 'Black Tie / Velký Gatsby', dressCodeSartorial: 'Haute Couture / Přísně elegantní styl', dressCodeCreative: 'Moderní klubový styl (18+)',
    whatsappBook: 'Rezervace 24/7 na WhatsApp +39 351 912 7047', afterDinnerLabel: 'Vstup do klubu + 1 drink', buffetLabel: 'Slavnostní raut + párty', galaDinnerLabel: 'Gala večeře + párty',
    startersHead: 'Předkrmy', seafoodStarters: 'Mořské předkrmy', landStarters: 'Masové předkrmy', firstCourseHead: 'První chod', mainCourseHead: 'Hlavní chod', dessertHead: 'Dezert',
    tablePista: 'Stůl na parketu', tableBalcony: 'Stůl na balkoně', tableStage: 'VIP stůl u pódia', bottlesWord: 'lahve', bottleWord: 'lahev',
    justMeWines: 'Vybraná bílá a červená vína, voda San Benedetto a káva Segafredo v ceně',
    pelledocaWines: 'Vína Cantine Volpi DOCG/DOC, voda, káva a půlnoční přípitek v ceně',
    justMeDishes: ['Marinované sashimi (tuňák, losos, hřebenatka, krevety, humr) · krokety · ceviche', 'Risotto s krevetami, burratou a kaviárem · sorbet', 'Černá treska na misu NEBO hovězí svíčková s lanýžem', 'Silvestrovské čokoládové parfait'],
    pelledocaDishes: ['Ústřice Fine de Claire, červené krevety, humřík, tatarák z tuňáka a lososa', 'Angus tatarák s burratou, culatello a cuketové květy s ricottou', 'Carnaroli risotto s humrem a krémem z burraty', 'Grilovaná irská svíčková s celerovým pyré · dezert · cotechino s čočkou'],
    magazziniDishes: ['Slané briošky, uzený losos, uzeniny, sýry, pizza a teplé chuťovky', 'Lasagne Bolognese · linguine se škeblemi a bottargou', 'Pečené telecí s brambory · pečené argentinské krevety', 'Pandoro se žloutkovým krémem a panettone'],
    extraGuestNote: 'každý další host platí 60€', clubGadgetNote: '1 drink, svítící náramky a plátěná taška v ceně',
    minSpendShort: 'Min. útrata 600€', minSpendLabel: 'VIP stůl min. útrata 600€', domesLabel: 'Kupolové a centrální stoly', dinnerAndTable: 'Balíček Večeře + VIP stůl', priveAccessLabel: 'Vstup Privé + Raut',
    clubDetails: 'Vstup do klubu s 1 drinkem · orientační cena.', buffetDetails: 'Slavnostní raut a vstup do klubu · čeká na potvrzení.', galaDetails: 'Servírovaná večeře s vínem · čeká na potvrzení.', vipTablesDetails: 'Rezervovaný stůl s lahvemi · na vyžádání.',
  },
  da: {
    nyePrefix: 'Nytårsaften 2027', milano: 'Milano', dec31: '31. december 2026',
    confirmedTag: 'Bekræftede officielle priser 2027', benchmarkTag: 'Vejledende priser (afventer bekræftelse)', pendingTag: 'Program og priser for 2027 opdateres', tbaStatusTag: 'Officielt program for 2027 afventer offentliggørelse',
    uponRequest: 'På forespørgsel', perPerson: 'pr. person', fromWord: 'fra', scheduleWord: 'Program 31. december 2026', menuWord: 'Officiel nytårsmenu 2027', vipTablesWord: 'VIP Privé borde',
    dressCodeElegant: 'Elegant festtøj', dressCodeBlackTie: 'Black Tie / Den Store Gatsby', dressCodeSartorial: 'Haute Couture / Strengt Elegant', dressCodeCreative: 'Kreativ klubstil (18+)',
    whatsappBook: 'Reservation 24/7 via WhatsApp +39 351 912 7047', afterDinnerLabel: 'Klubadgang + 1 drink', buffetLabel: 'Galabuffet + fest', galaDinnerLabel: 'Galamiddag + fest',
    startersHead: 'Forretter', seafoodStarters: 'Fisk & Skaldyr', landStarters: 'Kødforretter', firstCourseHead: 'Første ret', mainCourseHead: 'Hovedret', dessertHead: 'Dessert',
    tablePista: 'Dansegulvsbord', tableBalcony: 'Altanbord', tableStage: 'VIP scenebord', bottlesWord: 'flasker', bottleWord: 'flaske',
    justMeWines: 'Udvalgte hvid- og rødvine, San Benedetto vand & Segafredo kaffe inkluderet',
    pelledocaWines: 'Udvalgte Cantine Volpi vine, vand, kaffe og midnatsskål inkluderet',
    justMeDishes: ['Marineret sashimi (tun, laks, kammusling, rejer, hummer) · kroketter · ceviche', 'Risotto med rejer, burrata og kaviar · sorbet', 'Sort torsk i miso ELLER oksemørbrad med trøffel', 'Nytårs chokoladeparfait'],
    pelledocaDishes: ['Østers Fine de Claire, røde rejer, jomfruhummer, tun- og laksetatar', 'Angus oksetatar med burrata, skinke og fyldte courgetteblomster', 'Carnaroli risotto med hummer og burratacreme', 'Grillet irsk oksemørbrad på selleripuré · dessert · cotechino & linser'],
    magazziniDishes: ['Salte briocher, røget laks, ost, skinke, pizza og varme snacks', 'Lasagne Bolognese · linguine med muslinger', 'Kalvesteg med kartofler · ovnbagte rejer', 'Pandoro med creme og panettone'],
    extraGuestNote: 'ekstra gæst betaler 60€', clubGadgetNote: '1 drink, armbånd og stofnet inkluderet',
    minSpendShort: 'Min. forbrug 600€', minSpendLabel: 'VIP bord minimumsforbrug 600€', domesLabel: 'Kuppelborde og centralt bord', dinnerAndTable: 'Middag + VIP bord', priveAccessLabel: 'Privé Adgang + Buffet',
    clubDetails: 'Adgang inkl. 1 drink · vejledende pris.', buffetDetails: 'Galabuffet & klub · afventer bekræftelse.', galaDetails: 'Serveret middag inkl. vin · afventer bekræftelse.', vipTablesDetails: 'Reserveret bord med flaskeservice · på forespørgsel.',
  },
  et: {
    nyePrefix: 'Aastavahetus 2027', milano: 'Milano', dec31: '31. detsember 2026',
    confirmedTag: 'Ametlikud kinnitatud hinnad 2027', benchmarkTag: 'Orienteeruvad hinnad (kinnitamisel)', pendingTag: '2027. aasta kava ja hinnad täpsustamisel', tbaStatusTag: 'Ametlik 2027. aasta programm selgumisel',
    uponRequest: 'Päringul', perPerson: 'inimese kohta', fromWord: 'alates', scheduleWord: '31. detsembri kava', menuWord: 'Aastavahetuse ametlik menüü 2027', vipTablesWord: 'VIP lauad Privé',
    dressCodeElegant: 'Pidulik õhturiietus', dressCodeBlackTie: 'Black Tie / Suur Gatsby', dressCodeSartorial: 'Kõrgmood / Pidulik õhtustiil', dressCodeCreative: 'Kaasaegne klubistiil (18+)',
    whatsappBook: 'Broneeringud 24/7 WhatsApp +39 351 912 7047', afterDinnerLabel: 'Klubipääse + 1 jook', buffetLabel: 'Pidulik buffet + pidu', galaDinnerLabel: 'Galaõhtusöök + pidu',
    startersHead: 'Eelroad', seafoodStarters: 'Mereanni eelroad', landStarters: 'Lihaeelroad', firstCourseHead: 'Esimene roog', mainCourseHead: 'Pearoog', dessertHead: 'Magustoit',
    tablePista: 'Tantsupõranda laud', tableBalcony: 'Rõdulaud', tableStage: 'Lavaäärne VIP laud', bottlesWord: 'pudelit', bottleWord: 'pudel',
    justMeWines: 'Valge ja punane vein, San Benedetto vesi ning Segafredo kohv hinna sees',
    pelledocaWines: 'Cantine Volpi DOCG/DOC veinid, vesi, kohv ja südaöine vahuvein hinnas',
    justMeDishes: ['Marineeritud sashimi (tuunikala, lõhe, kammkarp, krevett, homaar) · kroketid · ceviche', 'Risoto krevettide, burrata ja kaaviariga · sorbett', 'Must tursk misoga VÕI trühvliga veisefilee', 'Aastavahetuse šokolaadiparfee'],
    pelledocaDishes: ['Austrid Fine de Claire, punased krevetid, salehomaar, tuunikala ja lõhe tartar', 'Anguse veisetartar burrataga, sink ja täidetud suvikõrvitsaõied', 'Homaaririsoto burratakreemiga', 'Grillitud Iiri veisefilee selleripüreega · magustoit · cotechino ja läätsed'],
    magazziniDishes: ['Soolased brioched, suitsulõhe, juustud, sink, pitsa ja suupisted', 'Bolognese lasanje · linguine karpidega', 'Vasikapraad kartulitega · küpsetatud Argentiina krevetid', 'Pandoro kreemiga ja panettone'],
    extraGuestNote: 'lisakülaline maksab 60€', clubGadgetNote: '1 jook, helendavad käepaelad ja kinkekott hinna sees',
    minSpendShort: 'Min. kulu 600€', minSpendLabel: 'VIP laua miinimumkulu 600€', domesLabel: 'Kupli- ja kesklauad', dinnerAndTable: 'Õhtusöök + VIP laud', priveAccessLabel: 'Privé sissepääs + Buffet',
    clubDetails: 'Sissepääs 1 joogiga · orientiirhind.', buffetDetails: 'Pidulik buffet ja klubipääse · kinnitamisel.', galaDetails: 'Veiniõhtusöök ja pidu · kinnitamisel.', vipTablesDetails: 'Broneeritud pudelilaud · päringul.',
  },
  fi: {
    nyePrefix: 'Uusivuosi 2027', milano: 'Milano', dec31: '31. joulukuuta 2026',
    confirmedTag: 'Vahvistetut viralliset hinnat 2027', benchmarkTag: 'Ohjeelliset hinnat (vahvistetaan)', pendingTag: 'Vuoden 2027 ohjelma ja hinnat päivittyvät', tbaStatusTag: 'Vuoden 2027 virallinen ohjelma vahvistetaan pian',
    uponRequest: 'Tiedustelemalla', perPerson: 'henkilö', fromWord: 'alk.', scheduleWord: 'Ohjelma 31.12.2026', menuWord: 'Virallinen uudenvuoden menu 2027', vipTablesWord: 'VIP Privé -pöydät',
    dressCodeElegant: 'Juhlapukeutuminen', dressCodeBlackTie: 'Black Tie / Kultahattu-teema', dressCodeSartorial: 'Haute Couture / Juhlava ilta-asu', dressCodeCreative: 'Moderni klubiasu (18+)',
    whatsappBook: 'Varaukset 24/7 WhatsApp +39 351 912 7047', afterDinnerLabel: 'Klubisisäänpääsy + 1 juoma', buffetLabel: 'Juhlabuffet + bileet', galaDinnerLabel: 'Gaalaillallinen + bileet',
    startersHead: 'Alkuruoat', seafoodStarters: 'Merenantimet', landStarters: 'Liha-alkuruoat', firstCourseHead: 'Ensimmäinen ruoka', mainCourseHead: 'Pääruoka', dessertHead: 'Jälkiruoka',
    tablePista: 'Tanssilattian pöytä', tableBalcony: 'Parvekepöytä', tableStage: 'Lavan VIP-pöytä', bottlesWord: 'pulloa', bottleWord: 'pullo',
    justMeWines: 'Valitut valko- ja punaviinit, San Benedetto -vesi ja Segafredo-kahvi sisältyvät',
    pelledocaWines: 'Cantine Volpi -viinit, vesi, kahvi ja keskiyön kuohuviini sisältyvät',
    justMeDishes: ['Marinoitu sashimi (tonnikala, lohi, kampasimpukka, katkarapu, hummeri) · kroketit · ceviche', 'Katkarapu-, burrata- ja kaviaaririsotto · sorbetti', 'Misoturska TAI tryffelihäränfilee', 'Uudenvuoden suklaaparfait'],
    pelledocaDishes: ['Osterit, punakatkaravut, keisarihummeri, tonnikala- ja lohitartar', 'Angus-härkätartar, ilmakuivattu kinkku ja täytetyt kesäkurpitsankukat', 'Hummeririsotto burratakreemillä', 'Grillattu irlantilainen häränfilee selleripyreellä · jälkiruoka · cotechino ja linssit'],
    magazziniDishes: ['Suolaiset briossit, savulohi, juustot, leikkeleet, pizza ja lämpimät alkupalat', 'Lasagne Bolognese · linguine simpukoilla', 'Paistettu vasikka ja perunat · Argentiinan jättikatkaravut', 'Pandoro ja panettone'],
    extraGuestNote: 'lisävieras maksaa 60€', clubGadgetNote: '1 juoma, rannekkeet ja kangaskassi sisältyvät',
    minSpendShort: 'Minimikulutus 600€', minSpendLabel: 'VIP-pöydän minimikulutus 600€', domesLabel: 'Kupolipöydät ja keskipöytä', dinnerAndTable: 'Illallinen + VIP-pöytä', priveAccessLabel: 'Privé-pääsy + Buffet',
    clubDetails: 'Klubisisäänpääsy 1 juomalla · alustava hinta.', buffetDetails: 'Juhlabuffet ja klubi · vahvistetaan.', galaDetails: 'Illallinen viineineen · vahvistetaan.', vipTablesDetails: 'Varattu pullopöytä · tiedustelemalla.',
  },
  el: {
    nyePrefix: 'Πρωτοχρονιά 2027', milano: 'Μιλάνο', dec31: '31 Δεκεμβρίου 2026',
    confirmedTag: 'Επίσημες επιβεβαιωμένες τιμές 2027', benchmarkTag: 'Ενδεικτικές τιμές (προς επιβεβαίωση)', pendingTag: 'Το πρόγραμμα και οι τιμές 2027 ενημερώνονται', tbaStatusTag: 'Επίσημο πρόγραμμα Πρωτοχρονιάς 2027 υπό ανακοίνωση',
    uponRequest: 'Κατόπιν αιτήματος', perPerson: 'ανά άτομο', fromWord: 'από', scheduleWord: 'Πρόγραμμα 31 Δεκεμβρίου 2026', menuWord: 'Επίσημο εορταστικό μενού 2027', vipTablesWord: 'Τραπέζια VIP Privé',
    dressCodeElegant: 'Επίσημο βραδινό ένδυμα', dressCodeBlackTie: 'Black Tie / Θέμα Ο Μεγάλος Γκάτσμπι', dressCodeSartorial: 'Υψηλή Ραπτική / Πολυτελής Εμφάνιση', dressCodeCreative: 'Σύγχρονο clubwear (18+)',
    whatsappBook: 'Κρατήσεις 24/7 στο WhatsApp +39 351 912 7047', afterDinnerLabel: 'Είσοδος κλαμπ + 1 ποτό', buffetLabel: 'Εορταστικός μπουφές + πάρτι', galaDinnerLabel: 'Επίσημο δείπνο + πάρτι',
    startersHead: 'Ορεκτικά', seafoodStarters: 'Θαλασσινά ορεκτικά', landStarters: 'Ορεκτικά κρεατικών', firstCourseHead: 'Πρώτο πιάτο', mainCourseHead: 'Κύριο πιάτο', dessertHead: 'Επιδόρπιο',
    tablePista: 'Τραπέζι Πίστας', tableBalcony: 'Τραπέζι Εξώστη', tableStage: 'VIP Τραπέζι Σκηνής', bottlesWord: 'φιάλες', bottleWord: 'φιάλη',
    justMeWines: 'Επιλεγμένα λευκά & κόκκινα κρασιά, νερό San Benedetto και καφές Segafredo περιλαμβάνονται',
    pelledocaWines: 'Κρασιά Cantine Volpi DOCG/DOC, νερό, καφές και σαμπάνια μεσανύχτων περιλαμβάνονται',
    justMeDishes: ['Μαριναρισμένο sashimi (τόνος, σολομός, χτένια, γαρίδες, αστακός) · κροκέτες · ceviche', 'Ριζότο με γαρίδες, burrata και χαβιάρι · σορμπέ', 'Μαύρος μπακαλιάρος miso Ή φιλέτο Chianina με τρούφα', 'Παρφέ σοκολάτας Πρωτοχρονιάς'],
    pelledocaDishes: ['Στρείδια Fine de Claire, κόκκινες γαρίδες, καραβίδα, ταρτάρ τόνου & σολομού', 'Ταρτάρ Angus με μπουράτα, culatello και κολοκυθοανθοί με ρικότα', 'Ριζότο Carnaroli με αστακό και κρέμα μπουράτα', 'Ιρλανδικό φιλέτο στη σχάρα με πουρέ σελινόριζας · γλυκά σεφ · cotechino με φακές'],
    magazziniDishes: ['Αλμυρά μπριός, καπνιστός σολομός, αλλαντικά, τυριά, πίτσα και ζεστά ορεκτικά', 'Λαζάνια μπολονέζ · λιγκουίνι με μύδια και αυγοτάραχο', 'Ψητό μοσχάρι με πατάτες · γαρίδες Αργεντινής φούρνου', 'Pandoro με κρέμα και panettone'],
    extraGuestNote: 'κάθε επιπλέον άτομο πληρώνει 60€', clubGadgetNote: '1 ποτό, φωτιζόμενα βραχιόλια και τσάντα δώρο',
    minSpendShort: 'Ελάχιστο 600€', minSpendLabel: 'Ελάχιστη κατανάλωση τραπεζιού VIP 600€', domesLabel: 'Τραπέζια Θόλου & Κεντρικό Τραπέζι', dinnerAndTable: 'Πακέτο Δείπνο + VIP Τραπέζι', priveAccessLabel: 'Πρόσβαση Privé + Μπουφές',
    clubDetails: 'Είσοδος κλαμπ με 1 ποτό · ενδεικτική τιμή.', buffetDetails: 'Μπουφές με ποτό & είσοδο κλαμπ · προς επιβεβαίωση.', galaDetails: 'Σερβιρισμένο δείπνο με κρασί · προς επιβεβαίωση.', vipTablesDetails: 'Κρατημένο τραπέζι με φιάλες · κατόπιν αιτήματος.',
  },
  hu: {
    nyePrefix: 'Szilveszter 2027', milano: 'Milánó', dec31: '2026. december 31.',
    confirmedTag: 'Hivatalosan megerősített árak 2027', benchmarkTag: 'Tájékoztató árak (megerősítésre vár)', pendingTag: 'A 2027-es program és árak frissítés alatt', tbaStatusTag: 'A 2027-es hivatalos program előkészítés alatt',
    uponRequest: 'Kérésre', perPerson: 'fő', fromWord: 'tól', scheduleWord: '2026. december 31. program', menuWord: 'Hivatalos szilveszteri menü 2027', vipTablesWord: 'VIP Privé asztalok',
    dressCodeElegant: 'Elegáns esti viselet', dressCodeBlackTie: 'Black Tie / Nagy Gatsby téma', dressCodeSartorial: 'Haute Couture / Szigorú esti öltözet', dressCodeCreative: 'Modern klubstílus (18+)',
    whatsappBook: 'Foglalás 0–24 WhatsAppon: +39 351 912 7047', afterDinnerLabel: 'Klubbelépő + 1 ital', buffetLabel: 'Gálabüfé + buli', galaDinnerLabel: 'Gálavacsora + buli',
    startersHead: 'Előételek', seafoodStarters: 'Tengeri előételek', landStarters: 'Húsos előételek', firstCourseHead: 'Első fogás', mainCourseHead: 'Főétel', dessertHead: 'Desszert',
    tablePista: 'Táncparkett asztal', tableBalcony: 'Erkély asztal', tableStage: 'Színpadi Privé asztal', bottlesWord: 'üveg ital', bottleWord: 'üveg ital',
    justMeWines: 'Válogatott fehér- és vörösbor, San Benedetto víz és Segafredo kávé az árban',
    pelledocaWines: 'Cantine Volpi DOCG/DOC borok, víz, kávé és éjféli pezsgő az árban',
    justMeDishes: ['Pácolt sashimi (tonhal, lazac, fésűkagyló, garnéla, homár) · krokett · ceviche', 'Garnélás-kaviáros rizottó burratával · sorbet', 'Miso fekete tőkehal VAGY szarvasgombás marhabélszín', 'Szilveszteri csokoládéparfé'],
    pelledocaDishes: ['Fine de Claire osztriga, vörös garnéla, homár, tonhal és lazac tatár', 'Angus tatár burratával, culatello és töltött cukkinivirág', 'Homáros Carnaroli rizottó burratakrémmel', 'Grillezett ír bélszín zellerkrémmel · séf desszert · lencse cotechino-val'],
    magazziniDishes: ['Sós briós, füstölt lazac, sajtok, felvágottak, pizza és meleg falatkák', 'Bolognai lasagne · kagylós linguine', 'Sült borjú burgonyával · sült argentin garnéla', 'Krémes pandoro és panettone'],
    extraGuestNote: 'további vendég 60€ belépőt fizet', clubGadgetNote: '1 ital, világító karkötők és ajándéktáska',
    minSpendShort: 'Min. fogyasztás 600€', minSpendLabel: 'VIP asztal minimum fogyasztás 600€', domesLabel: 'Kupola és központi asztalok', dinnerAndTable: 'Vacsora + VIP asztal csomag', priveAccessLabel: 'Privé Belépő + Büfé',
    clubDetails: 'Belépő 1 itallal · tájékoztató ár.', buffetDetails: 'Ünnepi büfé és belépő · megerősítésre vár.', galaDetails: 'Ültetett vacsora borokkal · megerősítésre vár.', vipTablesDetails: 'Fenntartott VIP asztal italcsomaggal · kérésre.',
  },
  ga: {
    nyePrefix: 'Oíche Chinn Bliana 2027', milano: 'Milano', dec31: '31 Nollaig 2026',
    confirmedTag: 'Praghsanna Oifigiúla Deimhnithe 2027', benchmarkTag: 'Praghsanna tagartha (le deimhniú)', pendingTag: 'Clár agus praghsanna 2027 á nuashonrú', tbaStatusTag: 'Clár oifigiúil 2027 á fhoilsiú go luath',
    uponRequest: 'Ar iarratas', perPerson: 'an duine', fromWord: 'ó', scheduleWord: 'Clár 31 Nollaig 2026', menuWord: 'Biachlár Oifigiúil 2027', vipTablesWord: 'Boird VIP Privé',
    dressCodeElegant: 'Foirmiúil / Éide Tráthnóna', dressCodeBlackTie: 'Black Tie / Téama Gatsby', dressCodeSartorial: 'Sartorial / Só Foirmiúil', dressCodeCreative: 'Stíl Chlub Nua-Aimseartha (18+)',
    whatsappBook: 'Áirithintí 24/7 ar WhatsApp +39 351 912 7047', afterDinnerLabel: 'Cead isteach + 1 deoch', buffetLabel: 'Buifé Gala + Cóisir', galaDinnerLabel: 'Dinnéar Gala + Cóisir',
    startersHead: 'Tosaitheoirí', seafoodStarters: 'Tosaitheoirí Mara', landStarters: 'Tosaitheoirí Feola', firstCourseHead: 'Céad Chúrsa', mainCourseHead: 'Príomhchúrsa', dessertHead: 'Milseog',
    tablePista: 'Bord Urlár Rince', tableBalcony: 'Bord Balcóin', tableStage: 'Bord VIP Stáitse', bottlesWord: 'buidéal', bottleWord: 'buidéal',
    justMeWines: 'Fíon bán & dearg, uisce San Benedetto agus caife Segafredo san áireamh',
    pelledocaWines: 'Fíonta Cantine Volpi DOCG/DOC, uisce, caife agus gloine súilíneach san áireamh',
    justMeDishes: ['Sashimi mara (tuinnín, bradán, muirín, ribí róibéis, gliomach) · cróicéid · ceviche', 'Risotto ribí róibéis, burrata agus caibhéar · sorbet', 'Trosc dubh miso NÓ filléad mairteola le strufal', 'Parfait seacláide Bliain Nua'],
    pelledocaDishes: ['Oisrí Fine de Claire, ribí róibéis dearga, langústín, tartar tuinnín agus bradáin', 'Tartar Angus le burrata, culatello agus bláthanna cúirgéid', 'Risotto Carnaroli le gliomach agus uachtar burrata', 'Filléad mairteola Éireannach ar phuré soilire · milseog · linte'],
    magazziniDishes: ['Brioscaí saillte, bradán deataithe, cáis, píotsa agus bia te', 'Lasagne Bolognese · linguine le breallaigh', 'Laofheoil rósta le prátaí · ribí róibéis bácáilte', 'Pandoro agus panettone'],
    extraGuestNote: 'íocann aoi breise 60€', clubGadgetNote: '1 deoch, bandaí solais agus mála bronntanais san áireamh',
    minSpendShort: 'Íos-chaitheamh 600€', minSpendLabel: 'Íoschaitheamh Bord VIP 600€', domesLabel: 'Boird Cruinneacháin & Lárnach', dinnerAndTable: 'Dinnéar + Bord VIP', priveAccessLabel: 'Rochtain Privé + Buifé',
    clubDetails: 'Cead isteach le 1 deoch · praghas tagartha.', buffetDetails: 'Buifé gala agus club · le deimhniú.', galaDetails: 'Dinnéar iomlán le fíon · le deimhniú.', vipTablesDetails: 'Bord VIP le buidéil · ar iarratas.',
  },
  lv: {
    nyePrefix: 'Jaungada nakts 2027', milano: 'Milāna', dec31: '2026. gada 31. decembris',
    confirmedTag: 'Oficiāli apstiprinātas cenas 2027', benchmarkTag: 'Orientējošās cenas (nepieciešams apstiprinājums)', pendingTag: '2027. gada programma un cenas tiek atjauninātas', tbaStatusTag: '2027. gada programma tiks paziņota drīzumā',
    uponRequest: 'Pēc pieprasījuma', perPerson: 'no personas', fromWord: 'no', scheduleWord: '31. decembra programma', menuWord: 'Oficiālā Jaungada ēdienkarte 2027', vipTablesWord: 'VIP Privé galdi',
    dressCodeElegant: 'Elegants vakara apģērbs', dressCodeBlackTie: 'Black Tie / Lielais Getsbijs', dressCodeSartorial: 'Augstā mode / Stingra elegance', dressCodeCreative: 'Moderns kluba stils (18+)',
    whatsappBook: 'Rezervācijas 24/7 WhatsApp +39 351 912 7047', afterDinnerLabel: 'Kluba ieeja + 1 dzēriens', buffetLabel: 'Svētku bufete + ballīte', galaDinnerLabel: 'Gala vakariņas + ballīte',
    startersHead: 'Uzkodas', seafoodStarters: 'Jūras velšu uzkodas', landStarters: 'Gaļas uzkodas', firstCourseHead: 'Pirmais ēdiens', mainCourseHead: 'Pamatēdiens', dessertHead: 'Deserts',
    tablePista: 'Deju zāles galds', tableBalcony: 'Balkona galds', tableStage: 'VIP skatuves galds', bottlesWord: 'pudeles', bottleWord: 'pudele',
    justMeWines: 'Baltvīns un sarkanvīns, San Benedetto ūdens un Segafredo kafija cenā',
    pelledocaWines: 'Cantine Volpi DOCG/DOC vīni, ūdens, kafija un pusnakts šampanietis iekļauti',
    justMeDishes: ['Marinēts sašimi (tuncis, lasis, ķemmīšgliemene, garneles, omārs) · kroketes · seviče', 'Rizoto ar garnelēm, burratu un ikriem · sorbets', 'Melnā menca ar miso VAI liellopa fileja ar trifelēm', 'Jaungada šokolādes parfē'],
    pelledocaDishes: ['Austeres Fine de Claire, sarkanās garneles, langustīns, tunča un laša tartars', 'Angus tartars ar burratu, kulatello un cukīni ziedi ar rikotu', 'Omāra Carnaroli rizoto ar burratas krēmu', 'Grilēta īru liellopa fileja ar selerijas biezeni · šefa deserts'],
    magazziniDishes: ['Sāļās briošas, kūpināts lasis, sieri, gaļas izlase, pica un uzkodas', 'Boloņas lazanja · lingvīni ar gliemenēm', 'Teļa cepetis ar kartupeļiem · ceptas garneles', 'Pandoro ar krēmu un panetone'],
    extraGuestNote: 'papildu viesis maksā 60€', clubGadgetNote: '1 dzēriens, gaismas aproces un auduma soma iekļauti',
    minSpendShort: 'Min. tēriņš 600€', minSpendLabel: 'VIP galds min. tēriņš 600€', domesLabel: 'Kupola un centrālais galds', dinnerAndTable: 'Vakariņas + VIP galds', priveAccessLabel: 'Privé piekļuve + Bufete',
    clubDetails: 'Ieeja klubā ar 1 dzērienu · orientējošā cena.', buffetDetails: 'Svētku bufete un klubs · apstiprināšanā.', galaDetails: 'Vakariņas ar vīniem · apstiprināšanā.', vipTablesDetails: 'Rezervēts VIP galds ar dzērieniem · pēc pieprasījuma.',
  },
  lt: {
    nyePrefix: 'Naujieji metai 2027', milano: 'Milanas', dec31: '2026 m. gruodžio 31 d.',
    confirmedTag: 'Oficialiai patvirtintos 2027 kainos', benchmarkTag: 'Preliminarios kainos (tikslinama)', pendingTag: '2027 m. programa ir kainos atnaujinamos', tbaStatusTag: 'Oficiali 2027 m. programa netrukus bus paskelbta',
    uponRequest: 'Pagal užklausą', perPerson: 'asmeniui', fromWord: 'nuo', scheduleWord: 'Gruodžio 31 d. programa', menuWord: 'Oficialus Naujųjų metų meniu 2027', vipTablesWord: 'VIP Privé stalai',
    dressCodeElegant: 'Elegantiška vakarinė apranga', dressCodeBlackTie: 'Black Tie / Didysis Getsbis', dressCodeSartorial: 'Aukštoji mada / Prabangus vakarinis stilius', dressCodeCreative: 'Šiuolaikinis klubo stilius (18+)',
    whatsappBook: 'Rezervacijos 24/7 per WhatsApp +39 351 912 7047', afterDinnerLabel: 'Klubo bilietas + 1 gėrimas', buffetLabel: 'Šventinis furšetas + vakarėlis', galaDinnerLabel: 'Iškilminga vakarienė + vakarėlis',
    startersHead: 'Užkandžiai', seafoodStarters: 'Jūros gėrybių užkandžiai', landStarters: 'Mėsos užkandžiai', firstCourseHead: 'Pirmas patiekalas', mainCourseHead: 'Pagrindinis patiekalas', dessertHead: 'Desertas',
    tablePista: 'Šokių aikštelės stalas', tableBalcony: 'Balkono stalas', tableStage: 'VIP scenos stalas', bottlesWord: 'buteliai', bottleWord: 'butelis',
    justMeWines: 'Rinktinis baltasis ir raudonasis vynas, San Benedetto vanduo ir Segafredo kava įskaičiuoti',
    pelledocaWines: 'Cantine Volpi DOCG/DOC vynai, vanduo, kava ir vidurnakčio putojantis vynas',
    justMeDishes: ['Marinuotas sašimi (tunas, lašiša, šukutės, krevetės, omaras) · kroketai · sevičė', 'Risotto su krevetėmis, burrata ir ikrais · šerbetas', 'Juodoji menkė su miso ARBA jautienos išpjova su trumais', 'Naujametinis šokolado parfė'],
    pelledocaDishes: ['Austrės Fine de Claire, raudonosios krevetės, omarai, tuno ir lašišos tartaras', 'Angus jautienos tartaras su burrata, culatello ir įdaryti cukinijų žiedai', 'Carnaroli rizotas su omaru ir burratos kremu', 'Kepta airiška jautienos išpjova su salierų tyre · desertas'],
    magazziniDishes: ['Pikantiškos briošės, rūkyta lašiša, sūriai, dešrelės, pica ir šilti užkandžiai', 'Bolonijos lazanija · makaronai su moliuskais', 'Kepta veršiena su bulvėmis · keptos krevetės', 'Pandoro su kremu ir panettone'],
    extraGuestNote: 'papildomas svečias moka 60€', clubGadgetNote: '1 gėrimas, šviečiančios apyrankės ir krepšys',
    minSpendShort: 'Min. išlaidos 600€', minSpendLabel: 'VIP stalo min. išlaidos 600€', domesLabel: 'Kupolo ir centrinis stalai', dinnerAndTable: 'Vakarienė + VIP stalas', priveAccessLabel: 'Privé įėjimas + Furšetas',
    clubDetails: 'Bilietas su 1 gėrimu · orientacinė kaina.', buffetDetails: 'Šventinis furšetas ir vakarėlis · tikslinama.', galaDetails: 'Šventinė vakarienė su vynais · tikslinama.', vipTablesDetails: 'Rezervuotas stalas su gėrimais · pagal užklausą.',
  },
  mt: {
    nyePrefix: 'Lejliet l-Ewwel tas-Sena 2027', milano: 'Milan', dec31: '31 ta’ Diċembru 2026',
    confirmedTag: 'Prezzijiet Uffiċjali Konfermati 2027', benchmarkTag: 'Prezzijiet indikattivi (soġġetti għal konferma)', pendingTag: 'Programm u prezzijiet 2027 qed jiġu aġġornati', tbaStatusTag: 'Programm u prezzijiet uffiċjali 2027 għadhom qed jitħabbru',
    uponRequest: 'Fuq talba', perPerson: 'kull persuna', fromWord: 'minn', scheduleWord: 'Skeda 31 ta’ Diċembru 2026', menuWord: 'Menù Uffiċjali 2027', vipTablesWord: 'Mwejjed VIP Privé',
    dressCodeElegant: 'Eleganti / Ilbies ta’ Filgħaxija', dressCodeBlackTie: 'Black Tie / Great Gatsby', dressCodeSartorial: 'Moda Għolja / Eleganza Stretta', dressCodeCreative: 'Ilbies Kontemporanju (18+)',
    whatsappBook: 'Prenotazzjonijiet 24/7 fuq WhatsApp +39 351 912 7047', afterDinnerLabel: 'Dħul fil-klabb + xarba', buffetLabel: 'Buffet tal-Gala + Party', galaDinnerLabel: 'Pranzu tal-Gala + Party',
    startersHead: 'Antipasti', seafoodStarters: 'Antipasti tal-Baħar', landStarters: 'Antipasti tal-Laħam', firstCourseHead: 'L-Ewwel Platti', mainCourseHead: 'Platt Prinċipali', dessertHead: 'Deżerta',
    tablePista: 'Mejda Pista', tableBalcony: 'Mejda Gallarija', tableStage: 'Mejda VIP Palk', bottlesWord: 'fliexken', bottleWord: 'flixkun',
    justMeWines: 'Inbid abjad u aħmar magħżul, ilma San Benedetto u kafè Segafredo inklużi',
    pelledocaWines: 'Inbid Cantine Volpi DOCG/DOC, ilma, kafè u tazza spumante f’nofsillejl',
    justMeDishes: ['Sashimi immarinat (tonn, salamun, arzell, gambli, awwista) · kroketti · ceviche', 'Risotto bil-gambli, burrata u kavjar · sorbet', 'Bakkaljaw bil-miso JEW flett taċ-ċanga bit-tartuf', 'Parfait taċ-ċikkulata'],
    pelledocaDishes: ['Gajdri Fine de Claire, gambli ħomor, skampun, tartare tat-tonn u tas-salamun', 'Tartare Angus bil-burrata, culatello u fjuri tal-qarabagħli bir-rikotta', 'Risotto Carnaroli bl-awwista u krema tal-burrata', 'Flett taċ-ċanga Irlandiż mixwi fuq purè tal-karfus · ħelu tax-chef'],
    magazziniDishes: ['Brioches melħin, salamun affumikat, ġobnijiet, laħmijiet, pizza u snacks', 'Lasagna Bolognese · linguine bil-gandoffli', 'Vitella mixwija bil-patata · gambli fil-forn', 'Pandoro bil-krema u panettone'],
    extraGuestNote: 'kull mistieden żejjed iħallas 60€', clubGadgetNote: 'xarba waħda, brazzuletti u borża inklużi',
    minSpendShort: 'Nefqa min. 600€', minSpendLabel: 'VIP Nefqa Minima 600€', domesLabel: 'Mwejjed Koppli u Ċentrali', dinnerAndTable: 'Pranzu + Mejda VIP', priveAccessLabel: 'Aċċess Privé + Buffet',
    clubDetails: 'Dħul b’xarba waħda · referenza indikattiva.', buffetDetails: 'Buffet u dħul fil-klabb · fuq konferma.', galaDetails: 'Pranzu bl-inbid inkluż · fuq konferma.', vipTablesDetails: 'Mejda VIP riżervata · fuq talba.',
  },
  pl: {
    nyePrefix: 'Sylwester 2027', milano: 'Mediolan', dec31: '31 grudnia 2026',
    confirmedTag: 'Oficjalnie potwierdzone ceny 2027', benchmarkTag: 'Ceny orientacyjne z poprzedniej edycji (do potwierdzenia)', pendingTag: 'Program i ceny na 2027 w trakcie aktualizacji', tbaStatusTag: 'Oficjalny program na 2027 w przygotowaniu',
    uponRequest: 'Na zapytanie', perPerson: 'za osobę', fromWord: 'od', scheduleWord: 'Harmonogram 31 grudnia 2026', menuWord: 'Oficjalne menu sylwestrowe 2027', vipTablesWord: 'Stoliki VIP Privé',
    dressCodeElegant: 'Strój wieczorowy elegancki', dressCodeBlackTie: 'Black Tie / Wielki Gatsby / Strój oficjalny', dressCodeSartorial: 'Haute Couture / Ścisła elegancja wieczorowa', dressCodeCreative: 'Nowoczesny styl klubowy (18+)',
    whatsappBook: 'Rezerwacje 24/7 przez WhatsApp +39 351 912 7047', afterDinnerLabel: 'Wstęp do klubu + 1 drink', buffetLabel: 'Bufet galowy + impreza', galaDinnerLabel: 'Kolacja galowa + impreza',
    startersHead: 'Przystawki', seafoodStarters: 'Przystawki morskie', landStarters: 'Przystawki mięsne', firstCourseHead: 'Pierwsze danie', mainCourseHead: 'Danie główne', dessertHead: 'Deser',
    tablePista: 'Stolik na parkiecie', tableBalcony: 'Stolik na balkonie', tableStage: 'Stolik VIP przy scenie', bottlesWord: 'butelki', bottleWord: 'butelka',
    justMeWines: 'Wybrane wina białe i czerwone, woda San Benedetto i kawa Segafredo w cenie',
    pelledocaWines: 'Wina Cantine Volpi DOCG/DOC, woda, kawa oraz kieliszek wina musującego o północy w cenie',
    justMeDishes: ['Marynowane sashimi ponzu i yuzu (tuńczyk, łosoś, przegrzebki, krevety, homar) · krokiety · ceviche', 'Risotto z krewetkami, burratą i kawiorem · sorbet', 'Czarny dorsz w miso LUB polędwica wołowa z truflami', 'Sylwestrowy parfait czekoladowy'],
    pelledocaDishes: ['Ostrygi Fine de Claire, czerwone krewetki, langustynka, tatar z tuńczyka i łososia', 'Tatar Angus z burratą i orzechami, culatello oraz kwiaty cukinii z ricottą', 'Risotto Carnaroli z homarem i kremem z burraty', 'Grillowana irlandzka polędwica wołowa na musie z selera · deser szefa · cotechino z soczewicą'],
    magazziniDishes: ['Wytrawne brioszki, wędzony łosoś, wędliny, sery, pizza i przekąski na ciepło', 'Lasagne Bolognese · linguine z małżami i bottargą', 'Pieczeń cielęca z ziemniakami · pieczone krewetki', 'Pandoro z kremem i panettone'],
    extraGuestNote: 'każda dodatkowa osoba dopłaca 60€', clubGadgetNote: '1 drink, świecące opaski i torba na ramię w cenie',
    minSpendShort: 'Min. wydatki 600€', minSpendLabel: 'Stolik VIP min. wydatki 600€', domesLabel: 'Stoliki pod kopułą i centralny', dinnerAndTable: 'Pakiet Kolacja + Stolik VIP', priveAccessLabel: 'Wstęp Privé + Bufet',
    clubDetails: 'Wstęp z 1 drinkiem · stawka orientacyjna.', buffetDetails: 'Bufet sylwestrowy z napojem · do potwierdzenia.', galaDetails: 'Kolacja serwowana z winem · do potwierdzenia.', vipTablesDetails: 'Rezerwacja stolika z butelkami · na zapytanie.',
  },
  ro: {
    nyePrefix: 'Revelion 2027', milano: 'Milano', dec31: '31 decembrie 2026',
    confirmedTag: 'Tarife Oficiale Confirmate 2027', benchmarkTag: 'Tarife orientative (supuse confirmării)', pendingTag: 'Programul și prețurile 2027 în curs de actualizare', tbaStatusTag: 'Programul oficial 2027 urmează să fie anunțat',
    uponRequest: 'La cerere', perPerson: 'de persoană', fromWord: 'de la', scheduleWord: 'Program 31 decembrie 2026', menuWord: 'Meniu Oficial Revelion 2027', vipTablesWord: 'Mese VIP Privé',
    dressCodeElegant: 'Ținută elegantă de seară', dressCodeBlackTie: 'Black Tie / Marele Gatsby', dressCodeSartorial: 'Haute Couture / Eleganță strictă', dressCodeCreative: 'Stil club contemporan (18+)',
    whatsappBook: 'Rezervări 24/7 pe WhatsApp +39 351 912 7047', afterDinnerLabel: 'Intrare club + 1 băutură', buffetLabel: 'Bufet festiv + petrecere', galaDinnerLabel: 'Cină festivă + petrecere',
    startersHead: 'Aperitive', seafoodStarters: 'Aperitive fructe de mare', landStarters: 'Aperitive din carne', firstCourseHead: 'Primul fel', mainCourseHead: 'Fel principal', dessertHead: 'Desert',
    tablePista: 'Masă Ring de Dans', tableBalcony: 'Masă Balcon', tableStage: 'Masă Privé Scenă', bottlesWord: 'sticle', bottleWord: 'sticlă',
    justMeWines: 'Vinuri albe și roșii selecționate, apă San Benedetto și cafea Segafredo incluse',
    pelledocaWines: 'Vinuri Cantine Volpi DOCG/DOC, apă, cafea și șampanie la miezul nopții incluse',
    justMeDishes: ['Sashimi marinat ponzu și yuzu (ton, somon, scoici, creveți roșii, homar) · crochete · ceviche', 'Risotto cu creveți, burrata și caviar · sorbet', 'Cod negru miso SAU mușchi de vită Chianina cu trufe', 'Parfait de ciocolată de Revelion'],
    pelledocaDishes: ['Stridii Fine de Claire, creveți roșii, langustine, tartar de ton și de somon', 'Tartar Aberdeen Angus cu burrata, culatello și flori de dovlecel cu ricotta', 'Risotto Carnaroli cu homar și cremă de burrata', 'Mușchi de vită irlandeză la grătar pe piure de țelină · desertul bucătarului · cotechino'],
    magazziniDishes: ['Brioșe sărate, somon afumat, mezeluri, brânzeturi, pizza și preparate prăjite', 'Lasagna Bolognese · linguine cu scoici și bottarga', 'Friptură de vițel cu cartofi · creveți la cuptor', 'Pandoro cu cremă și panettone'],
    extraGuestNote: 'fiecare invitat suplimentar achită 60€', clubGadgetNote: '1 băutură, brățări LED și geantă cadou incluse',
    minSpendShort: 'Consum min. 600€', minSpendLabel: 'Masă VIP consum minim 600€', domesLabel: 'Mese în cupole și masa centrală', dinnerAndTable: 'Pachet Cină + Masă VIP', priveAccessLabel: 'Acces Privé + Bufet',
    clubDetails: 'Intrare cu 1 băutură inclusă · tarif orientativ.', buffetDetails: 'Bufet festiv și acces club · supus confirmării.', galaDetails: 'Cină servită cu vinuri · supus confirmării.', vipTablesDetails: 'Masă VIP rezervată · la cerere.',
  },
  sk: {
    nyePrefix: 'Silvester 2027', milano: 'Miláno', dec31: '31. decembra 2026',
    confirmedTag: 'Oficiálne potvrdené ceny 2027', benchmarkTag: 'Orientačné ceny (vyžadujú potvrzení)', pendingTag: 'Program a ceny na rok 2027 sa aktualizujú', tbaStatusTag: 'Oficiálny program na rok 2027 sa pripravuje',
    uponRequest: 'Na vyžiadanie', perPerson: 'na osobu', fromWord: 'od', scheduleWord: 'Program 31. decembra 2026', menuWord: 'Oficiálne silvestrovské menu 2027', vipTablesWord: 'VIP stoly Privé',
    dressCodeElegant: 'Elegantný večerný odev', dressCodeBlackTie: 'Black Tie / Veľký Gatsby', dressCodeSartorial: 'Haute Couture / Prísna elegancia', dressCodeCreative: 'Moderný klubový štýl (18+)',
    whatsappBook: 'Rezervácie 24/7 cez WhatsApp +39 351 912 7047', afterDinnerLabel: 'Vstup do klubu + 1 drink', buffetLabel: 'Slávnostný bufet + párty', galaDinnerLabel: 'Galavečera + párty',
    startersHead: 'Predjedlá', seafoodStarters: 'Morské predjedlá', landStarters: 'Mäsové predjedlá', firstCourseHead: 'Prvý chod', mainCourseHead: 'Hlavný chod', dessertHead: 'Dezert',
    tablePista: 'Stôl na parkete', tableBalcony: 'Stôl na balkóne', tableStage: 'VIP stôl pri pódiu', bottlesWord: 'fľaše', bottleWord: 'fľaša',
    justMeWines: 'Vybrané biele a červené vína, voda San Benedetto a káva Segafredo v cene',
    pelledocaWines: 'Vína Cantine Volpi DOCG/DOC, voda, káva a polnočný prípitok v cene',
    justMeDishes: ['Marinované sashimi (tuniak, losos, hrebenatka, krevety, homár) · krokety · ceviche', 'Rizoto s krevetami, burratou a kaviárom · sorbet', 'Čierna treska miso ALEBO hovädzia sviečkovica s hľuzovkou', 'Silvestrovské čokoládové parfait'],
    pelledocaDishes: ['Ustrice Fine de Claire, červené krevety, homár, tatarák z tuniaka a lososa', 'Angus tatarák s burratou, culatello a cuketové kvety s ricottou', 'Carnaroli rizoto s homárom a krémom burrata', 'Grilovaná írska sviečkovica so zelerovým pyré · dezert šéfkuchára · šošovica'],
    magazziniDishes: ['Slané briošky, údený losos, údeniny, syry, pizza a teplé chuťovky', 'Lasagne Bolognese · linguine s mušľami', 'Pečené teľacie so zemiakmi · argentínske krevety', 'Pandoro s krémom a panettone'],
    extraGuestNote: 'každý ďalší hosť platí 60€', clubGadgetNote: '1 drink, svietiace náramky a taška v cene',
    minSpendShort: 'Min. útrata 600€', minSpendLabel: 'VIP stôl min. útrata 600€', domesLabel: 'Kupolové a centrálne stoly', dinnerAndTable: 'Balíček Večera + VIP stôl', priveAccessLabel: 'Vstup Privé + Bufet',
    clubDetails: 'Vstup s 1 nápojom · orientačná cena.', buffetDetails: 'Slávnostný bufet a klub · čaká na potvrdenie.', galaDetails: 'Servírovaná večera s vínom · čaká na potvrdenie.', vipTablesDetails: 'Rezervovaný VIP stôl · na vyžiadanie.',
  },
  sl: {
    nyePrefix: 'Silvestrovo 2027', milano: 'Milano', dec31: '31. december 2026',
    confirmedTag: 'Uradno potrjene cene 2027', benchmarkTag: 'Okvirne cene (čakajo na potrditev)', pendingTag: 'Program in cene 2027 v posodabljanju', tbaStatusTag: 'Uradni program za leto 2027 v pripravi',
    uponRequest: 'Na povpraševanje', perPerson: 'na osebo', fromWord: 'od', scheduleWord: 'Urnik 31. decembra 2026', menuWord: 'Uradni silvestrski meni 2027', vipTablesWord: 'VIP mize Privé',
    dressCodeElegant: 'Elegantna večerna oprava', dressCodeBlackTie: 'Black Tie / Veliki Gatsby', dressCodeSartorial: 'Visoka moda / Stroga eleganca', dressCodeCreative: 'Sodobni klubski slog (18+)',
    whatsappBook: 'Rezervacije 24/7 na WhatsApp +39 351 912 7047', afterDinnerLabel: 'Vstop v klub + 1 pijača', buffetLabel: 'Svečani bife + zabava', galaDinnerLabel: 'Gala večerja + zabava',
    startersHead: 'Predjedi', seafoodStarters: 'Morske predjedi', landStarters: 'Mesne predjedi', firstCourseHead: 'Prva jed', mainCourseHead: 'Glavna jed', dessertHead: 'Sladica',
    tablePista: 'Miza na plesišču', tableBalcony: 'Miza na balkonu', tableStage: 'VIP miza ob odru', bottlesWord: 'steklenice', bottleWord: 'steklenica',
    justMeWines: 'Izbrana bela in rdeča vina, voda San Benedetto ter kava Segafredo vključeni',
    pelledocaWines: 'Vina Cantine Volpi DOCG/DOC, voda, kava in polnočna penina vključeni',
    justMeDishes: ['Mariniran sašimi (tuna, losos, pokrovača, kozice, jastog) · kroketi · ceviche', 'Rižota s kozicami, burrato in kaviarjem · sorbet', 'Črna trska miso ALI goveji file s tartufi', 'Silvestrski čokoladni parfait'],
    pelledocaDishes: ['Ostrige Fine de Claire, rdeče kozice, škampi, tatar tune in lososa', 'Angus tatar z burrato, culatello in bučkini cvetovi z rikoto', 'Carnaroli rižota z jastogom in kremo burrata', 'Irski goveji file na žaru s pirejem zelene · sladica · leča'],
    magazziniDishes: ['Slani brioši, dimljeni losos, mesnine, siri, pica in prigrizki', 'Lazanja Bolognese · testenine s školjkami', 'Pečena teletina s krompirjem · pečene kozice', 'Pandoro s kremo in panettone'],
    extraGuestNote: 'dodatni gost doplača 60€', clubGadgetNote: '1 pijača, zapestnice in darilna vrečka vključene',
    minSpendShort: 'Min. poraba 600€', minSpendLabel: 'VIP miza min. poraba 600€', domesLabel: 'Mize pod kupolo in osrednja miza', dinnerAndTable: 'Paket Večerja + VIP miza', priveAccessLabel: 'Dostop Privé + Bife',
    clubDetails: 'Vstop z 1 pijačo · okvirna cena.', buffetDetails: 'Svečani bife in zabava · čaka potrditev.', galaDetails: 'Strežena večerja z vini · čaka potrditev.', vipTablesDetails: 'Rezervirana VIP miza s steklenicami · na povpraševanje.',
  },
  sv: {
    nyePrefix: 'Nyårsafton 2027', milano: 'Milano', dec31: '31 december 2026',
    confirmedTag: 'Bekräftade officiella priser 2027', benchmarkTag: 'Riktpriser (i väntan på bekräftelse)', pendingTag: 'Program och priser för 2027 uppdateras', tbaStatusTag: 'Officiellt nyårsprogram 2027 meddelas snart',
    uponRequest: 'På förfrågan', perPerson: 'per person', fromWord: 'från', scheduleWord: 'Schema 31 december 2026', menuWord: 'Officiell nyårsmeny 2027', vipTablesWord: 'VIP Privé-bord',
    dressCodeElegant: 'Elegant kvällsklädsel', dressCodeBlackTie: 'Black Tie / Den store Gatsby', dressCodeSartorial: 'Haute Couture / Strikt gala', dressCodeCreative: 'Modern klubbstil (18+)',
    whatsappBook: 'Bokning 24/7 via WhatsApp +39 351 912 7047', afterDinnerLabel: 'Klubbentré + 1 drink', buffetLabel: 'Galabuffé + fest', galaDinnerLabel: 'Galamiddag + fest',
    startersHead: 'Förrätter', seafoodStarters: 'Skaldjursförrätter', landStarters: 'Köttförätter', firstCourseHead: 'Mellanrätt', mainCourseHead: 'Varmrätt', dessertHead: 'Dessert',
    tablePista: 'Dansgolvsbord', tableBalcony: 'Balkongbord', tableStage: 'VIP scenbord', bottlesWord: 'flaskor', bottleWord: 'flaska',
    justMeWines: 'Utvalda vita & röda viner, San Benedetto vatten och Segafredo kaffe ingår',
    pelledocaWines: 'Utvalda Cantine Volpi-viner, vatten, kaffe och midnattsskål ingår',
    justMeDishes: ['Marinerad sashimi (tonfisk, lax, pilgrimsmussla, räkor, hummer) · kroketter · ceviche', 'Risotto med räkor, burrata och kaviar · sorbet', 'Misotorsk ELLER oxfilé med tryffel', 'Chokladparfait till nyår'],
    pelledocaDishes: ['Ostron Fine de Claire, röda räkor, havskräfta, tonfisk- och laxtartar', 'Angus oxtartar med burrata, skinka och fyllda zucchiniblommor', 'Carnaroli-risotto med hummer och burratakräm', 'Grillad irländsk oxfilé med rotselleripuré · dessert · linser'],
    magazziniDishes: ['Salta briocher, rökt lax, chark, ostar, pizza och varma snittar', 'Lasagne Bolognese · linguine med hjärtmusslor', 'Kalvstek med potatis · ugnsbakade räkor', 'Pandoro med vaniljkräm och panettone'],
    extraGuestNote: 'extra gäst betalar 60€', clubGadgetNote: '1 drink, LED-armband och tygkasse ingår',
    minSpendShort: 'Minsta spend 600€', minSpendLabel: 'VIP-bord minimumspend 600€', domesLabel: 'Kupolbord och centralt bord', dinnerAndTable: 'Middag + VIP-bord', priveAccessLabel: 'Privé-entré + Buffé',
    clubDetails: 'Entré med 1 drink · riktpris i väntan på bekräftelse.', buffetDetails: 'Galabuffé & klubb · väntar på bekräftelse.', galaDetails: 'Serverad middag med vin · väntar på bekräftelse.', vipTablesDetails: 'Reserverat VIP-bord · på förfrågan.',
  },
  no: {
    nyePrefix: 'Nyttårsaften 2027', milano: 'Milano', dec31: '31. desember 2026',
    confirmedTag: 'Bekreftede offisielle priser 2027', benchmarkTag: 'Veiledende priser (avventer bekreftelse)', pendingTag: 'Program og priser for 2027 oppdateres', tbaStatusTag: 'Offisielt program for 2027 kunngjøres snart',
    uponRequest: 'På forespørsel', perPerson: 'per person', fromWord: 'fra', scheduleWord: 'Program 31. desember 2026', menuWord: 'Offisiell nyttårsmeny 2027', vipTablesWord: 'VIP Privé-bord',
    dressCodeElegant: 'Elegant aftenantrekk', dressCodeBlackTie: 'Black Tie / Den store Gatsby', dressCodeSartorial: 'Haute Couture / Strengt gallaantrekk', dressCodeCreative: 'Moderne klubbstil (18+)',
    whatsappBook: 'Bestilling 24/7 via WhatsApp +39 351 912 7047', afterDinnerLabel: 'Klubbinngang + 1 drink', buffetLabel: 'Gallabuffet + fest', galaDinnerLabel: 'Gallamiddag + fest',
    startersHead: 'Forretter', seafoodStarters: 'Sjømatforretter', landStarters: 'Kjøttforretter', firstCourseHead: 'Første rett', mainCourseHead: 'Hovedrett', dessertHead: 'Dessert',
    tablePista: 'Dansegulvbord', tableBalcony: 'Balkongbord', tableStage: 'VIP scenebord', bottlesWord: 'flasker', bottleWord: 'flaske',
    justMeWines: 'Utvalgte hvit- og rødviner, San Benedetto vann og Segafredo kaffe inkludert',
    pelledocaWines: 'Utvalgte Cantine Volpi-viner, vann, kaffe og midnattsskål inkludert',
    justMeDishes: ['Marinert sashimi (tunfisk, laks, kamskjell, reker, hummer) · kroketter · ceviche', 'Risotto med reker, burrata og kaviar · sorbet', 'Svart torsk med miso ELLER indrefilet med trøffel', 'Sjokoladeparfait til nyttår'],
    pelledocaDishes: ['Østers Fine de Claire, røde reker, sjøkreps, tunfisk- og laksetartar', 'Angus-tartar med burrata, skinke og fylte squashblomster', 'Carnaroli-risotto med hummer og burratakrem', 'Grillet irsk indrefilet på selleripuré · dessert · linser'],
    magazziniDishes: ['Salte briocher, røkt laks, spekemat, oster, pizza og varme biter', 'Lasagne Bolognese · linguine med skjell', 'Kalvestek med poteter · ovnsbakte argentinske reker', 'Pandoro med vaniljekrem og panettone'],
    extraGuestNote: 'ekstra gjest betaler 60€', clubGadgetNote: '1 drink, lysende armbånd og handlenett inkludert',
    minSpendShort: 'Minste forbruk 600€', minSpendLabel: 'VIP-bord minimumsforbruk 600€', domesLabel: 'Kuppelbord og sentralt bord', dinnerAndTable: 'Middag + VIP-bord', priveAccessLabel: 'Privé-inngang + Buffet',
    clubDetails: 'Klubbinngang med 1 drink · veiledende pris.', buffetDetails: 'Festbuffet og klubb · avventer bekreftelse.', galaDetails: 'Servert middag med vin · avventer bekreftelse.', vipTablesDetails: 'Reservert VIP-bord · på forespørsel.',
  },
  is: {
    nyePrefix: 'Gamlárskvöld 2027', milano: 'Mílanó', dec31: '31. desember 2026',
    confirmedTag: 'Staðfest opinber verð 2027', benchmarkTag: 'Viðmiðunarverð (háð staðfestingu)', pendingTag: 'Dagskrá og verð 2027 í uppfærslu', tbaStatusTag: 'Opinber dagskrá 2027 kynnt fljótlega',
    uponRequest: 'Eftir fyrirspurn', perPerson: 'á mann', fromWord: 'frá', scheduleWord: 'Dagskrá 31. desember 2026', menuWord: 'Opinber áramótaseðill 2027', vipTablesWord: 'VIP Privé borð',
    dressCodeElegant: 'Fínt kvöldklæðnaður', dressCodeBlackTie: 'Black Tie / Gatsby þema', dressCodeSartorial: 'Sérhannaður hátíðarklæðnaður', dressCodeCreative: 'Nútímalegur klúbbastíll (18+)',
    whatsappBook: 'Bókanir 24/7 á WhatsApp +39 351 912 7047', afterDinnerLabel: 'Klúbbmiði + 1 drykkur', buffetLabel: 'Hátíðarhlaðborð + partí', galaDinnerLabel: 'Hátíðarkvöldverður + partí',
    startersHead: 'Forréttir', seafoodStarters: 'Sjávarforréttir', landStarters: 'Kjötforréttir', firstCourseHead: 'Fyrsti réttur', mainCourseHead: 'Aðalréttur', dessertHead: 'Eftirréttur',
    tablePista: 'Dansgólfsborð', tableBalcony: 'Svalaborð', tableStage: 'VIP sviðsborð', bottlesWord: 'flöskur', bottleWord: 'flaska',
    justMeWines: 'Valið hvít- og rauðvín, San Benedetto vatn og Segafredo kaffi innifalið',
    pelledocaWines: 'Valin Cantine Volpi vín, vatn, kaffi og miðnæturskál innifalin',
    justMeDishes: ['Maríneraður sashimi (túnfiskur, lax, hörpudiskur, rækjur, humar) · krókettur · ceviche', 'Risotto með rækjum, burrata og kavíar · sorbet', 'Svartþorskur í miso EÐA nautalund með trufflum', 'Áramóta súkkulaðiparfait'],
    pelledocaDishes: ['Ostrur Fine de Claire, rauðar rækjur, leturhumar, túnfisk- og laxtartar', 'Angus nautatartar með burrata, hráskinku og blómum', 'Carnaroli risotto með humri og burratakremi', 'Grillað írskt nautalund með sellerímauki · eftirréttur'],
    magazziniDishes: ['Saltir brioche, reyktur lax, álegg, ostar, pizza og heitir réttir', 'Lasagne Bolognese · linguine með skelfiski', 'Kálfasteik með kartöflum · ofnbakaðar rækjur', 'Pandoro með kremi og panettone'],
    extraGuestNote: 'aukagestur greiðir 60€', clubGadgetNote: '1 drykkur, armbönd og gjafapoki innifalin',
    minSpendShort: 'Lágmarkseyðsla 600€', minSpendLabel: 'VIP borð lágmarkseyðsla 600€', domesLabel: 'Hvolfþaks- og miðborð', dinnerAndTable: 'Kvöldverður + VIP borð', priveAccessLabel: 'Privé Aðgangur + Hlaðborð',
    clubDetails: 'Aðgangur með 1 drykk · viðmiðunarverð.', buffetDetails: 'Hátíðarhlaðborð & klúbbur · háð staðfestingu.', galaDetails: 'Kvöldverður með víni · háð staðfestingu.', vipTablesDetails: 'Frátekið VIP borð · eftir fyrirspurn.',
  },
  uk: {
    nyePrefix: 'Новий рік 2027', milano: 'Мілан', dec31: '31 грудня 2026',
    confirmedTag: 'Офіційно підтверджені ціни 2027', benchmarkTag: 'Орієнтовні ціни (потребують підтвердження)', pendingTag: 'Програма та ціни 2027 оновлюються', tbaStatusTag: 'Офіційна програма на 2027 рік очікується',
    uponRequest: 'За запитом', perPerson: 'з особи', fromWord: 'від', scheduleWord: 'Розклад 31 грудня 2026', menuWord: 'Офіційне новорічне меню 2027', vipTablesWord: 'VIP столики Privé',
    dressCodeElegant: 'Елегантний вечірній дрес-код', dressCodeBlackTie: 'Black Tie / Великий Гетсбі', dressCodeSartorial: 'Висока мода / Суворий вечірній стиль', dressCodeCreative: 'Сучасний клубний стиль (18+)',
    whatsappBook: 'Бронювання 24/7 у WhatsApp +39 351 912 7047', afterDinnerLabel: 'Вхід у клуб + 1 напій', buffetLabel: 'Святковий фуршет + вечірка', galaDinnerLabel: 'Гала-вечеря + вечірка',
    startersHead: 'Закуски', seafoodStarters: 'Морські закуски', landStarters: 'М’ясні закуски', firstCourseHead: 'Перша страва', mainCourseHead: 'Основна страва', dessertHead: 'Десерт',
    tablePista: 'Столик на танцполі', tableBalcony: 'Столик на балконі', tableStage: 'VIP столик біля сцени', bottlesWord: 'пляшки', bottleWord: 'пляшка',
    justMeWines: 'Добірні білі та червоні вина, вода San Benedetto та кава Segafredo включені',
    pelledocaWines: 'Вина Cantine Volpi DOCG/DOC, вода, кава та опівнічний келих ігристого включені',
    justMeDishes: ['Мариноване сашимі (тунець, лосось, гребінець, креветка, омар) · крокети · севіче', 'Різотто з креветками, бурратою та ікрою · сорбет', 'Чорна тріска місо АБО філе яловичини К’яніна з трюфелем', 'Новорічне шоколадне парфе'],
    pelledocaDishes: ['Устриці Fine de Claire, червоні креветки, лангустин, тартар із тунця та лосося', 'Тартар Angus із бурратою, кулателло та квіти цукіні з рікоттою', 'Різотто Карнаролі з омаром та кремом із буррати', 'Ірландське яловиче філе на грилі з селеровим пюре · десерт · котекіно'],
    magazziniDishes: ['Солоні бріоші, копчений лосось, сири, делікатеси, піца та гарячі закуски', 'Лазанья болоньєзе · лінгвіні з мідіями та боттаргою', 'Печена телятина з картоплею · аргентинські креветки', 'Пандоро з заварним кремом та панеттоне'],
    extraGuestNote: 'додатковий гість доплачує 60€', clubGadgetNote: '1 напій, браслети та подарункова сумка в ціні',
    minSpendShort: 'Мін. депозит 600€', minSpendLabel: 'VIP столик мін. депозит 600€', domesLabel: 'Столики у куполах та центральний столик', dinnerAndTable: 'Пакет Вечеря + VIP столик', priveAccessLabel: 'Вхід Privé + Фуршет',
    clubDetails: 'Вхід із 1 напоєм · орієнтовна ціна.', buffetDetails: 'Святковий фуршет і вечірка · очікує підтвердження.', galaDetails: 'Гала-вечеря з вином · очікує підтвердження.', vipTablesDetails: 'Заброньований VIP столик · за запитом.',
  },
  sq: {
    nyePrefix: 'Viti i Ri 2027', milano: 'Milano', dec31: '31 dhjetor 2026',
    confirmedTag: 'Çmime Zyrtare të Konfirmuara 2027', benchmarkTag: 'Çmime referuese (në pritje të konfirmimit)', pendingTag: 'Programi dhe çmimet 2027 në përditësim', tbaStatusTag: 'Programi zyrtar 2027 në proces finalizimi',
    uponRequest: 'Me kërkesë', perPerson: 'për person', fromWord: 'nga', scheduleWord: 'Orari 31 dhjetor 2026', menuWord: 'Menuja Zyrtare Viti i Ri 2027', vipTablesWord: 'Tavolina VIP Privé',
    dressCodeElegant: 'Veshje elegante mbrëmjeje', dressCodeBlackTie: 'Black Tie / Tema Gatsby', dressCodeSartorial: 'Moda e Lartë / Elegancë Strikte', dressCodeCreative: 'Stil bashkëkohor klubi (18+)',
    whatsappBook: 'Rezervime 24/7 në WhatsApp +39 351 912 7047', afterDinnerLabel: 'Hyrja në klub + 1 pije', buffetLabel: 'Bufe gala + festë', galaDinnerLabel: 'Darkë gala + festë',
    startersHead: 'Antipasta', seafoodStarters: 'Antipasta deti', landStarters: 'Antipasta mishi', firstCourseHead: 'Pjata e parë', mainCourseHead: 'Pjata kryesore', dessertHead: 'Ëmbëlsira',
    tablePista: 'Tavolinë në pistë', tableBalcony: 'Tavolinë në ballkon', tableStage: 'Tavolinë VIP te skena', bottlesWord: 'shishe', bottleWord: 'shishe',
    justMeWines: 'Verë e bardhë dhe e kuqe e përzgjedhur, ujë San Benedetto dhe kafe Segafredo të përfshira',
    pelledocaWines: 'Verëra Cantine Volpi DOCG/DOC, ujë, kafe dhe dolli e mesnatës të përfshira',
    justMeDishes: ['Sashimi i marinuar (ton, salmon, midhje, karkalec, karavidhe) · kroketa · ceviche', 'Rizoto me karkaleca, burrata dhe havjar · sorbet', 'Merluc i zi me miso OSE fileto viçi me tartuf', 'Parfait çokollate për Vitin e Ri'],
    pelledocaDishes: ['Ostriga Fine de Claire, karkaleca të kuq, skampo, tartare toni dhe salmoni', 'Tartare Angus me burrata, kulatello dhe lule kungulli me gjizë', 'Rizoto Carnaroli me karavidhe dhe krem burrate', 'Fileto viçi irlandez në skarë me pure selinoje · ëmbëlsirë'],
    magazziniDishes: ['Brioshë të kripur, salmon i tymosur, proshutë, djathëra, pica dhe meze të ngrohta', 'Lazanja Bolonjeze · linguini me midhje', 'Mish viçi i pjekur me patate · karkaleca furre', 'Pandoro me krem dhe panetone'],
    extraGuestNote: 'mysafiri shtesë paguan 60€', clubGadgetNote: '1 pije, byzylykë ndriçues dhe çantë dhuratë të përfshira',
    minSpendShort: 'Konsum min. 600€', minSpendLabel: 'Tavolinë VIP konsumi min. 600€', domesLabel: 'Tavolina në kupola dhe tavolina qendrore', dinnerAndTable: 'Paketë Darkë + Tavolinë VIP', priveAccessLabel: 'Hyrja Privé + Bufe',
    clubDetails: 'Hyrje me 1 pije · çmim orientues.', buffetDetails: 'Bufe festive dhe klub · në pritje të konfirmimit.', galaDetails: 'Darkë e shtruar me verë · në pritje të konfirmimit.', vipTablesDetails: 'Tavolinë VIP e rezervuar · me kërkesë.',
  },
  sr: {
    nyePrefix: 'Doček Nove godine 2027', milano: 'Milano', dec31: '31. decembar 2026.',
    confirmedTag: 'Zvanično potvrđene cene 2027.', benchmarkTag: 'Okvirne cene (podložne potvrdi)', pendingTag: 'Program i cene za 2027. u pripremi', tbaStatusTag: 'Zvanični program i cene za 2027. uskoro',
    uponRequest: 'Na upit', perPerson: 'po osobi', fromWord: 'od', scheduleWord: 'Raspored 31. decembar 2026.', menuWord: 'Zvanični novogodišnji meni 2027.', vipTablesWord: 'VIP stolovi Privé',
    dressCodeElegant: 'Elegantna večernja garderoba', dressCodeBlackTie: 'Black Tie / Veliki Getsbi', dressCodeSartorial: 'Visoka moda / Stroga elegancija', dressCodeCreative: 'Moderni klupski stil (18+)',
    whatsappBook: 'Rezervacije 24/7 na WhatsApp +39 351 912 7047', afterDinnerLabel: 'Ulaz u klub + 1 piće', buffetLabel: 'Svečani bife + žurka', galaDinnerLabel: 'Svečana večera + žurka',
    startersHead: 'Predjela', seafoodStarters: 'Morska predjela', landStarters: 'Mesna predjela', firstCourseHead: 'Prvo jelo', mainCourseHead: 'Glavno jelo', dessertHead: 'Dezert',
    tablePista: 'Sto na podijumu', tableBalcony: 'Sto na balkonu', tableStage: 'VIP sto kod bine', bottlesWord: 'flaše', bottleWord: 'flaša',
    justMeWines: 'Odabrana bela i crvena vina, San Benedetto voda i Segafredo kafa uključeni',
    pelledocaWines: 'Vina Cantine Volpi DOCG/DOC, voda, kafa i ponoćni šampanjac uključeni',
    justMeDishes: ['Marinirani sašimi (tuna, losos, školjke, škampi, jastog) · kroketi · seviče', 'Rižoto sa škampima, buratom i kavijarom · sorbe', 'Crni bakalar miso ILI goveđi file sa tartufima', 'Novogodišnji čokoladni parfe'],
    pelledocaDishes: ['Ostrige Fine de Claire, crveni škampi, škampići, tatar tune i lososa', 'Angus tatar sa buratom, kulatelo i punjeni cvetovi tikvice', 'Karnaroli rižoto sa jastogom i burata kremom', 'Grilovani irski goveđi file sa pireom od celera · dezert'],
    magazziniDishes: ['Slani brioši, dimljeni losos, sirevi, pršuta, pica i topli zalogaji', 'Lazanje bolonjeze · lingvini sa školjkama', 'Pečena teletina sa krompirom · zapečeni škampi', 'Pandoro sa kremom i panetone'],
    extraGuestNote: 'dodatni gost plaća 60€', clubGadgetNote: '1 piće, svetleće narukvice i platnena torba uključeni',
    minSpendShort: 'Min. potrošnja 600€', minSpendLabel: 'VIP sto min. potrošnja 600€', domesLabel: 'Stolovi u kupolama i centralni sto', dinnerAndTable: 'Paket Večera + VIP sto', priveAccessLabel: 'Pristup Privé + Bife',
    clubDetails: 'Ulaz sa 1 pićem · okvirna cena.', buffetDetails: 'Svečani bife i klub · na potvrdi.', galaDetails: 'Servirana večera sa vinima · na potvrdi.', vipTablesDetails: 'Rezervisani VIP sto · na upit.',
  },
  bs: {
    nyePrefix: 'Doček Nove godine 2027', milano: 'Milano', dec31: '31. decembar 2026.',
    confirmedTag: 'Zvanično potvrđene cijene 2027.', benchmarkTag: 'Okvirne cijene (čekaju potvrdu)', pendingTag: 'Program i cijene za 2027. u pripremi', tbaStatusTag: 'Zvanični program i cijene za 2027. uskoro',
    uponRequest: 'Na upit', perPerson: 'po osobi', fromWord: 'od', scheduleWord: 'Raspored 31. decembar 2026.', menuWord: 'Zvanični novogodišnji meni 2027.', vipTablesWord: 'VIP stolovi Privé',
    dressCodeElegant: 'Elegantna večernja odjeća', dressCodeBlackTie: 'Black Tie / Veliki Gatsby', dressCodeSartorial: 'Visoka moda / Stroga elegancija', dressCodeCreative: 'Moderni klupski stil (18+)',
    whatsappBook: 'Rezervacije 24/7 na WhatsApp +39 351 912 7047', afterDinnerLabel: 'Ulaz u klub + 1 piće', buffetLabel: 'Gala švedski sto + zabava', galaDinnerLabel: 'Gala večera + zabava',
    startersHead: 'Predjela', seafoodStarters: 'Morska predjela', landStarters: 'Mesna predjela', firstCourseHead: 'Prvo jelo', mainCourseHead: 'Glavno jelo', dessertHead: 'Desert',
    tablePista: 'Sto na podiju', tableBalcony: 'Sto na balkonu', tableStage: 'VIP sto kod bine', bottlesWord: 'boce', bottleWord: 'boca',
    justMeWines: 'Odabrana bijela i crvena vina, San Benedetto voda i Segafredo kafa uključeni',
    pelledocaWines: 'Vina Cantine Volpi DOCG/DOC, voda, kafa i ponoćni pjenušac uključeni',
    justMeDishes: ['Marinirani sašimi (tuna, losos, školjke, škampi, jastog) · kroketi · seviče', 'Rižoto sa škampima, buratom i kavijarom · sorbet', 'Crni bakalar miso ILI goveđi file sa tartufima', 'Novogodišnji čokoladni parfe'],
    pelledocaDishes: ['Ostrige Fine de Claire, crveni škampi, tatar tune i lososa', 'Angus tatar sa buratom, culatello i punjeni cvjetovi tikvice', 'Carnaroli rižoto sa jastogom i burata kremom', 'Grilovani irski goveđi file s pireom od celera · desert'],
    magazziniDishes: ['Slani brioši, dimljeni losos, sirevi, suhomesnato, pizza i topli zalogaji', 'Lazanje Bolognese · linguini sa školjkama', 'Pečena teletina s krompirom · pečeni škampi', 'Pandoro s kremom i panettone'],
    extraGuestNote: 'dodatni gost plaća 60€', clubGadgetNote: '1 piće, narukvice i torba uključeni',
    minSpendShort: 'Min. potrošnja 600€', minSpendLabel: 'VIP sto min. potrošnja 600€', domesLabel: 'Stolovi u kupolama i centralni sto', dinnerAndTable: 'Paket Večera + VIP sto', priveAccessLabel: 'Pristup Privé + Švedski sto',
    clubDetails: 'Ulaz s 1 pićem · okvirna cijena.', buffetDetails: 'Gala švedski sto i klub · čeka potvrdu.', galaDetails: 'Poslužena večera s vinima · čeka potvrdu.', vipTablesDetails: 'Rezervisani VIP sto · na upit.',
  },
  mk: {
    nyePrefix: 'Нова година 2027', milano: 'Милано', dec31: '31 декември 2026',
    confirmedTag: 'Официјално потврдени цени 2027', benchmarkTag: 'Ориентациони цени (подлежат на потврда)', pendingTag: 'Програмата и цените за 2027 се ажурираат', tbaStatusTag: 'Официјалната програма за 2027 се подготвува',
    uponRequest: 'По барање', perPerson: 'по лице', fromWord: 'од', scheduleWord: 'Распоред 31 декември 2026', menuWord: 'Официјално новогодишно мени 2027', vipTablesWord: 'VIP маси Privé',
    dressCodeElegant: 'Елегантна вечерна облека', dressCodeBlackTie: 'Black Tie / Големиот Гетсби', dressCodeSartorial: 'Висока мода / Строга елеганција', dressCodeCreative: 'Модерен клубски стил (18+)',
    whatsappBook: 'Резервации 24/7 преку WhatsApp +39 351 912 7047', afterDinnerLabel: 'Влез во клуб + 1 пијалок', buffetLabel: 'Празнична шведска маса + забава', galaDinnerLabel: 'Гала вечера + забава',
    startersHead: 'Предјадења', seafoodStarters: 'Морски предјадења', landStarters: 'Месни предјадења', firstCourseHead: 'Прво јадење', mainCourseHead: 'Главно јадење', dessertHead: 'Десерт',
    tablePista: 'Маса на подиум', tableBalcony: 'Маса на балкон', tableStage: 'VIP маса до сцена', bottlesWord: 'шишиња', bottleWord: 'шише',
    justMeWines: 'Одбрани бели и црвени вина, вода San Benedetto и кафе Segafredo вклучени',
    pelledocaWines: 'Селектирани вина Cantine Volpi DOCG/DOC, вода, кафе и полноќен пенлив пијалок вклучени',
    justMeDishes: ['Мариниран сашими (туна, лосос, школки, ракчиња, јастог) · крокети · севиче', 'Ризото со ракчиња, бурата и кавијар · сорбе', 'Црн бакалар со мисо ИЛИ телешко филе со тартуфи', 'Новогодишно чоколадно парфе'],
    pelledocaDishes: ['Остриги Fine de Claire, црвени ракчиња, тартар од туна и лосос', 'Ангус тартар со бурата, кулатело и цветови од тиквица', 'Карнароли ризото со јастог и крем бурата', 'Ирско говедско филе со пире од целер · десерт'],
    magazziniDishes: ['Солени бриоши, чаден лосос, сирења, сувомеснато, пица и мезе', 'Лазања Болоњезе · лингвини со школки', 'Печено телешко со компири · печени ракчиња', 'Пандоро со крем и панетоне'],
    extraGuestNote: 'дополнителен гостин плаќа 60€', clubGadgetNote: '1 пијалок, нараквици и торба вклучени',
    minSpendShort: 'Мин. потрошувачка 600€', minSpendLabel: 'VIP маса мин. потрошувачка 600€', domesLabel: 'Куполни и централна маса', dinnerAndTable: 'Пакет Вечера + VIP маса', priveAccessLabel: 'Пристап Privé + Шведска маса',
    clubDetails: 'Влез со 1 пијалок · ориентациона цена.', buffetDetails: 'Празнична маса и клуб · подлежи на потврда.', galaDetails: 'Вечера со вино · подлежи на потврда.', vipTablesDetails: 'Резервирана VIP маса · по барање.',
  },
};

const WA_DICTS_35: Record<LocaleCode, WaLocaleDict> = {
  it: IT,
  en: EN,
  es: buildNativeDict(SEEDS_33.es),
  fr: buildNativeDict(SEEDS_33.fr),
  de: buildNativeDict(SEEDS_33.de),
  pt: buildNativeDict(SEEDS_33.pt),
  nl: buildNativeDict(SEEDS_33.nl),
  ru: buildNativeDict(SEEDS_33.ru),
  tr: buildNativeDict(SEEDS_33.tr),
  zh: buildNativeDict(SEEDS_33.zh),
  ar: buildNativeDict(SEEDS_33.ar),
  bg: buildNativeDict(SEEDS_33.bg),
  hr: buildNativeDict(SEEDS_33.hr),
  cs: buildNativeDict(SEEDS_33.cs),
  da: buildNativeDict(SEEDS_33.da),
  et: buildNativeDict(SEEDS_33.et),
  fi: buildNativeDict(SEEDS_33.fi),
  el: buildNativeDict(SEEDS_33.el),
  hu: buildNativeDict(SEEDS_33.hu),
  ga: buildNativeDict(SEEDS_33.ga),
  lv: buildNativeDict(SEEDS_33.lv),
  lt: buildNativeDict(SEEDS_33.lt),
  mt: buildNativeDict(SEEDS_33.mt),
  pl: buildNativeDict(SEEDS_33.pl),
  ro: buildNativeDict(SEEDS_33.ro),
  sk: buildNativeDict(SEEDS_33.sk),
  sl: buildNativeDict(SEEDS_33.sl),
  sv: buildNativeDict(SEEDS_33.sv),
  no: buildNativeDict(SEEDS_33.no),
  is: buildNativeDict(SEEDS_33.is),
  uk: buildNativeDict(SEEDS_33.uk),
  sq: buildNativeDict(SEEDS_33.sq),
  sr: buildNativeDict(SEEDS_33.sr),
  bs: buildNativeDict(SEEDS_33.bs),
  mk: buildNativeDict(SEEDS_33.mk),
};

function makeMenuSteps(times: string[], labels: string[]): CapodannoScheduleStep[] {
  return times.map((time, idx) => ({ time, label: labels[idx] ?? '' }));
}

function buildJustMe(t: WaLocaleDict): CapodannoLocalizedEventContent {
  const tiers: CapodannoEventTier[] = [
    { label: t.justMeClub, price: '80€', details: t.justMeClubDesc },
    { label: t.justMeGala, price: '300€ (600€ / 2)', details: t.justMeGalaDesc },
    { label: t.justMeTables, price: '600€ – 5.000€', details: t.justMeTablesDesc },
    { label: t.justMeCombo, price: '1.000€ / 1.200€', details: t.justMeComboDesc },
  ];
  const menus: CapodannoMenuCard[] = [
    {
      id: 'justme-gala-2027',
      title: t.justMeMenuTitle,
      price: '300€',
      subtitle: t.justMeMenuSub,
      courses: t.justMeCourses.map(([course, dish]) => ({ course, dish })),
      beverages: t.justMeBev,
      imageSrc: JUSTME_MENU_IMG,
      imageAlt: `${t.justMeMenuTitle} · JustMe ${t.milano}`,
    },
  ];
  return {
    title: `${t.nyePrefix} JustMe ${t.milano} · The Great Gatsby (Torre Branca)`,
    subtitle: t.justMeSub,
    description: t.justMeDesc,
    musicAndFormat: t.justMeFormat,
    dressCode: t.dressCodeBlackTie,
    priceSummary: 'Club 80€ · Gala 300€ (600€/2) · Bronze 600€ / Silver 800€ / Gold 3.000€ / Platinum 5.000€ · ×2 + Bronze 1.000€',
    tiers,
    highlights: [
      `JustMe ${t.milano} · Viale Luigi Camoens 2 (Torre Branca)`,
      t.justMeFormat,
      t.confirmedTag,
      t.whatsappBook,
    ],
    sourceBasis: t.justMeSource,
    scheduleHeading: `${t.scheduleWord} · JustMe ${t.milano}`,
    schedule: makeMenuSteps(['19:30', '20:00', '23:30', '00:00'], t.justMeSteps),
    menusHeading: t.justMeMenuHeading,
    menus,
    offerPricesEur: [80, 300, 600, 800, 1000, 1200, 3000, 5000],
  };
}

function buildPelledoca(t: WaLocaleDict): CapodannoLocalizedEventContent {
  const tiers: CapodannoEventTier[] = [
    { label: t.pelledocaDinner, price: '120€', details: t.pelledocaDinnerDesc },
    { label: t.pelledocaClub, price: t.uponRequest, details: t.pelledocaClubDesc },
  ];
  const menus: CapodannoMenuCard[] = [
    {
      id: 'pelledoca-cenone-2027',
      title: t.pelledocaMenuTitle,
      price: '120€',
      subtitle: t.pelledocaMenuSub,
      courses: t.pelledocaCourses.map(([course, dish]) => ({ course, dish })),
      beverages: t.pelledocaBev,
      imageSrc: PELLEDOCA_MENU_IMG,
      imageAlt: `${t.pelledocaMenuTitle} · Pelledoca ${t.milano}`,
    },
  ];
  return {
    title: `${t.nyePrefix} Pelledoca ${t.milano} · ${t.galaDinnerLabel} 120€`,
    subtitle: t.pelledocaSub,
    description: t.pelledocaDesc,
    musicAndFormat: t.pelledocaFormat,
    dressCode: t.dressCodeElegant,
    priceSummary: `${t.pelledocaDinner} 120€ · 00:30 (${t.uponRequest})`,
    tiers,
    highlights: [
      `Pelledoca ${t.milano} · Viale Enrico Forlanini 121`,
      `${t.pelledocaDinner}: 120€`,
      t.confirmedTag,
      t.whatsappBook,
    ],
    sourceBasis: t.pelledocaSource,
    scheduleHeading: `${t.scheduleWord} · Pelledoca ${t.milano}`,
    schedule: makeMenuSteps(['20:30', '22:00', '00:00', '00:30'], t.pelledocaSteps),
    menusHeading: t.pelledocaMenuHeading,
    menus,
    offerPricesEur: [120],
  };
}

function buildMagazzini(t: WaLocaleDict): CapodannoLocalizedEventContent {
  const tiers: CapodannoEventTier[] = [
    { label: t.magazziniClub, price: '30€', details: t.magazziniClubDesc },
    { label: t.magazziniBuffet, price: '80€', details: t.magazziniBuffetDesc },
    { label: t.magazziniPista, price: `300€ (60€ ${t.perPerson})`, details: t.magazziniPistaDesc },
    { label: t.magazziniBalc, price: `600€ (60€ ${t.perPerson})`, details: t.magazziniBalcDesc },
    { label: t.magazziniPalco, price: `900€ (90€ ${t.perPerson})`, details: t.magazziniPalcoDesc },
  ];
  const menus: CapodannoMenuCard[] = [
    {
      id: 'magazzini-casino-night-80',
      title: t.magazziniMenuTitle,
      price: '80€',
      subtitle: t.magazziniMenuSub,
      courses: t.magazziniCourses.map(([course, dish]) => ({ course, dish })),
      beverages: t.magazziniBuffetDesc,
      imageSrc: MAGAZZINI_MENU_IMG,
      imageAlt: `${t.magazziniMenuTitle} · Magazzini Generali ${t.milano}`,
    },
    {
      id: 'magazzini-tavoli-300-900',
      title: t.magazziniTablesTitle,
      price: '300€ – 900€',
      subtitle: t.magazziniTablesSub,
      courses: t.magazziniTablesRows.map(([course, dish]) => ({ course, dish })),
      beverages: t.magazziniTablesNote,
      imageSrc: MAGAZZINI_TABLES_IMG,
      imageAlt: `${t.magazziniTablesTitle} · Magazzini Generali ${t.milano}`,
    },
  ];
  return {
    title: `${t.nyePrefix} Magazzini Generali ${t.milano} · Casino Night & We Love 2000`,
    subtitle: t.magazziniSub,
    description: t.magazziniDesc,
    musicAndFormat: t.magazziniFormat,
    dressCode: t.dressCodeElegant,
    priceSummary: `We Love 2000 30€ · Casino Night 80€ · ${t.tablePista} 300€ / ${t.tableBalcony} 600€ / ${t.tableStage} 900€`,
    tiers,
    highlights: [
      `Magazzini Generali · Via Pietrasanta 16, ${t.milano}`,
      t.magazziniFormat,
      t.confirmedTag,
      t.whatsappBook,
    ],
    sourceBasis: t.magazziniSource,
    scheduleHeading: `${t.scheduleWord} · Magazzini Generali`,
    schedule: makeMenuSteps(['20:30', '23:00', '00:00', '00:30'], t.magazziniSteps),
    menusHeading: t.magazziniMenuHeading,
    menus,
    offerPricesEur: [30, 80, 300, 600, 900],
  };
}

function buildGattopardo(t: WaLocaleDict): CapodannoLocalizedEventContent {
  const tiers: CapodannoEventTier[] = [
    { label: t.gattopardoMinSpend, price: `600€ ${t.perPerson}`, details: t.gattopardoMinSpendDesc },
    { label: t.gattopardoDomes, price: t.uponRequest, details: t.gattopardoDomesDesc },
  ];
  return {
    title: `${t.nyePrefix} Il Gattopardo ${t.milano} · ${t.minSpendShort}`,
    subtitle: t.gattopardoSub,
    description: t.gattopardoDesc,
    musicAndFormat: t.gattopardoFormat,
    dressCode: t.dressCodeBlackTie,
    priceSummary: `${t.vipTablesWord} 600€ ${t.perPerson} · ${t.gattopardoDomes}: ${t.uponRequest}`,
    tiers,
    highlights: [
      `Il Gattopardo ${t.milano} · Via Piero della Francesca 47`,
      `600€ ${t.perPerson} (22:30 – 05:00)`,
      t.confirmedTag,
      t.whatsappBook,
    ],
    sourceBasis: t.gattopardoSource,
    scheduleHeading: `${t.scheduleWord} · Il Gattopardo ${t.milano}`,
    schedule: makeMenuSteps(['22:30', '00:00', '00:30'], t.gattopardoSteps),
    offerPricesEur: [600],
  };
}

function buildTheClub(t: WaLocaleDict): CapodannoLocalizedEventContent {
  const tiers: CapodannoEventTier[] = [
    { label: t.theClubEntryLabel, price: '50€ / 70€', details: t.theClubEntryDesc },
    { label: t.theClubBuffetLabel, price: '90€', details: t.theClubBuffetDesc },
    { label: t.theClubPriveLabel, price: '150€', details: t.theClubPriveDesc },
    { label: t.theClubTablesLabel, price: '900€ – 2.000€', details: t.theClubTablesDesc },
  ];
  return {
    title: `${t.nyePrefix} The Club ${t.milano} · Corso Garibaldi 97`,
    subtitle: t.theClubSub,
    description: t.theClubDesc,
    musicAndFormat: t.theClubFormat,
    dressCode: t.dressCodeElegant,
    priceSummary: `50€ / 70€ · ${t.theClubBuffetLabel} 90€ · Privé 150€ · ${t.vipTablesWord} 900€–2.000€`,
    tiers,
    highlights: [
      `The Club ${t.milano} · Corso Garibaldi 97 (Brera)`,
      t.theClubFormat,
      t.confirmedTag,
      t.whatsappBook,
    ],
    sourceBasis: t.theClubSource,
    offerPricesEur: [50, 70, 90, 150, 900, 1200, 1500, 2000],
  };
}

function buildArmaniTba(t: WaLocaleDict): CapodannoLocalizedEventContent {
  return {
    title: `${t.nyePrefix} Armani/Privé ${t.milano}`,
    subtitle: t.armaniTbaSub,
    description: t.armaniTbaDesc,
    musicAndFormat: `Armani/Privé ${t.milano} · ${t.pendingTag}`,
    dressCode: t.dressCodeSartorial,
    priceSummary: t.armaniTbaTierLabel,
    tiers: [
      {
        label: t.armaniTbaTierLabel,
        price: t.uponRequest,
        details: t.armaniTbaDesc,
      },
    ],
    highlights: [
      `Armani/Privé ${t.milano} · Via Gastone Pisoni 3`,
      t.armaniTbaTierLabel,
      t.uponRequest,
      t.whatsappBook,
    ],
    sourceBasis: t.armaniTbaSource,
  };
}

function buildGarda(t: WaLocaleDict): CapodannoLocalizedEventContent {
  const tiers: CapodannoEventTier[] = [
    { label: t.gardaClub, price: `${t.fromWord} 20€`, details: t.clubDetails },
    { label: t.gardaBuffet, price: '70€', details: t.buffetDetails },
    { label: t.gardaGala, price: '130€', details: t.galaDetails },
    { label: t.gardaTables, price: '440€ – 2.000€', details: 'Terrace 440€ · Dance Floor 500€ · Privé Ploom 700€ · Stool 800€ · Armand 900€ · VIP 2.000€' },
  ];
  return {
    title: `${t.nyePrefix} JustMe Garda Lake · Just Me in Rouge`,
    subtitle: `Via Lavagnone 13, Lonato del Garda (BS) · 20:30 – 05:00 · ${t.benchmarkTag}`,
    description: t.gardaDesc,
    musicAndFormat: t.gardaFormat,
    dressCode: t.dressCodeElegant,
    priceSummary: `${t.fromWord} 20€ · 70€ · 130€ · VIP 440€–2.000€`,
    tiers,
    highlights: [
      'JustMe Garda Lake · Via Lavagnone 13, Lonato del Garda / Desenzano',
      t.gardaFormat,
      t.benchmarkTag,
      t.whatsappBook,
    ],
    sourceBasis: t.benchmarkDisclaimer,
    offerPricesEur: [20, 70, 130, 440, 500, 700, 800, 900, 2000],
  };
}

function buildFabbrica(t: WaLocaleDict): CapodannoLocalizedEventContent {
  return {
    title: `${t.nyePrefix} Fabbrica del Vapore ${t.milano}`,
    subtitle: `Via Giulio Cesare Procaccini 4, ${t.milano} · ${t.pendingTag}`,
    description: t.pendingProgramDesc,
    musicAndFormat: `Fabbrica del Vapore · ${t.pendingTag}`,
    dressCode: t.dressCodeCreative,
    priceSummary: t.pendingProgramSummary,
    tiers: [
      {
        label: `Fabbrica del Vapore · ${t.nyePrefix}`,
        price: t.uponRequest,
        details: t.pendingProgramDesc,
      },
    ],
    highlights: [
      `Fabbrica del Vapore · Via Giulio Cesare Procaccini 4, ${t.milano}`,
      t.pendingTag,
      t.uponRequest,
      t.whatsappBook,
    ],
    sourceBasis: `${t.pendingTag} · ${t.whatsappBook}.`,
  };
}

interface BenchmarkSpec {
  venueName: string;
  address: string;
  hours: string;
  dressKey: 'dressCodeElegant' | 'dressCodeSartorial';
  clubPrice: string;
  buffetPrice?: string;
  galaPrice?: string;
  tablesPrice: string;
  offerPricesEur: number[];
  descKey: keyof WaLocaleDict;
}

const BENCHMARK_SPECS: Record<string, BenchmarkSpec> = {
  'capodanno-aria-club-milano': {
    venueName: 'Aria Club Milano',
    address: 'Piazzale dello Sport 14 (San Siro)',
    hours: '20:00 – 05:30',
    dressKey: 'dressCodeElegant',
    clubPrice: '45€ – 55€',
    buffetPrice: '65€',
    galaPrice: '130€',
    tablesPrice: '300€ – 1.000€',
    offerPricesEur: [45, 65, 130, 300, 1000],
    descKey: 'ariaDesc',
  },
  'capodanno-55-milano': {
    venueName: '55 Milano (Cinquanta5)',
    address: 'Via Piero della Francesca 55 (Sempione)',
    hours: '20:00 – 05:00',
    dressKey: 'dressCodeElegant',
    clubPrice: '50€',
    buffetPrice: '70€ – 75€',
    galaPrice: '130€ – 140€',
    tablesPrice: '350€ – 1.200€',
    offerPricesEur: [50, 70, 130, 350, 1200],
    descKey: 'fiftyFiveDesc',
  },
  'capodanno-tocqueville-13-milano': {
    venueName: 'Tocqueville 13',
    address: 'Via Alessio di Tocqueville 13 (Corso Como)',
    hours: '20:00 – 05:30',
    dressKey: 'dressCodeElegant',
    clubPrice: '35€ – 45€',
    buffetPrice: '60€',
    galaPrice: '110€ – 120€',
    tablesPrice: '600€ – 2.000€',
    offerPricesEur: [35, 60, 110, 600, 2000],
    descKey: 'tocquevilleDesc',
  },
  'capodanno-hollywood-milano': {
    venueName: 'Hollywood Rythmoteque',
    address: 'Corso Como 15 (Garibaldi)',
    hours: '20:30 – 05:30',
    dressKey: 'dressCodeElegant',
    clubPrice: '40€',
    buffetPrice: '60€',
    galaPrice: '130€',
    tablesPrice: '300€ – 1.200€',
    offerPricesEur: [40, 60, 130, 300, 1200],
    descKey: 'hollywoodDesc',
  },
  'capodanno-11clubroom-milano': {
    venueName: '11Clubroom Milano',
    address: 'Via Alessio di Tocqueville 11 (Corso Como)',
    hours: '21:00 – 05:00',
    dressKey: 'dressCodeElegant',
    clubPrice: '40€',
    buffetPrice: '65€',
    tablesPrice: '350€ – 1.000€',
    offerPricesEur: [40, 65, 350, 1000],
    descKey: 'elevenDesc',
  },
};

function buildBenchmark(slug: string, t: WaLocaleDict): CapodannoLocalizedEventContent | null {
  const s = BENCHMARK_SPECS[slug];
  if (!s) return null;
  const tiers: CapodannoEventTier[] = [{ label: t.afterDinnerLabel, price: s.clubPrice, details: t.clubDetails }];
  if (s.buffetPrice) tiers.push({ label: t.buffetLabel, price: s.buffetPrice, details: t.buffetDetails });
  if (s.galaPrice) tiers.push({ label: t.galaDinnerLabel, price: s.galaPrice, details: t.galaDetails });
  tiers.push({ label: t.vipTablesWord, price: s.tablesPrice, details: t.vipTablesDetails });
  const parts = [
    s.clubPrice,
    s.buffetPrice ? s.buffetPrice : null,
    s.galaPrice ? s.galaPrice : null,
    `VIP ${s.tablesPrice}`,
  ].filter(Boolean);
  const desc = String(t[s.descKey]);
  return {
    title: `${t.nyePrefix} ${s.venueName}`,
    subtitle: `${s.address}, ${t.milano} · ${s.hours} · ${t.benchmarkTag}`,
    description: desc,
    musicAndFormat: `${s.venueName} · ${s.hours} · ${t.benchmarkTag}`,
    dressCode: t[s.dressKey],
    priceSummary: parts.join(' · '),
    tiers,
    highlights: [`${s.venueName} · ${s.address}`, `${t.dec31} · ${s.hours}`, t.benchmarkTag, t.whatsappBook],
    sourceBasis: t.benchmarkDisclaimer,
    offerPricesEur: s.offerPricesEur,
  };
}

export function getWhatsappVenueNyeContent(slug: string, locale: string): CapodannoLocalizedEventContent | null {
  const loc = (locale in WA_DICTS_35 ? locale : 'en') as LocaleCode;
  const t = WA_DICTS_35[loc];
  if (slug === 'capodanno-justme-milano-torre-branca') return buildJustMe(t);
  if (slug === 'capodanno-pelledoca-milano') return buildPelledoca(t);
  if (slug === 'capodanno-magazzini-generali-milano') return buildMagazzini(t);
  if (slug === 'capodanno-il-gattopardo-milano') return buildGattopardo(t);
  if (slug === 'capodanno-the-club-milano') return buildTheClub(t);
  if (slug === 'capodanno-armani-prive-milano') return buildArmaniTba(t);
  if (slug === 'capodanno-justme-garda-lake') return buildGarda(t);
  if (slug === 'capodanno-fabbrica-del-vapore-milano') return buildFabbrica(t);
  return buildBenchmark(slug, t);
}

export const WHATSAPP_35_LOCALE_COUNT = Object.keys(WA_DICTS_35).length;
