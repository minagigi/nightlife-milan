import { getLocaleDef, type LocaleCode } from '@/lib/i18n/localeRegistry';
import type { BergamoBresciaExplorerLabels } from '@/components/BergamoBresciaExplorer';
import type { BergamoBresciaHomeLabels } from '@/components/BergamoBresciaHomeSection';

export interface BergamoBresciaGuideChapter {
  id: string;
  eyebrow: string;
  h2: string;
  h3a: string;
  paragraphsA: string[];
  h3b: string;
  paragraphsB: string[];
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
}

export interface BergamoBresciaCorridorRow {
  clubName: string;
  cityProvince: string;
  address: string;
  highwayExit: string;
  driveFromMilan: string;
  targetAge: string;
  musicAndFormat: string;
  activeNightsSummary: string;
}

export interface BergamoBresciaHubCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  quickAnswer: string;
  bookWaCta: string;
  allCapodannoCta: string;
  tocTitle: string;
  tocExplorer: string;
  tocClubs: string;
  tocNye: string;
  tocMatrix: string;
  tocGuide: string;
  tocMapFaq: string;
  explorerHeading: string;
  explorerSubtitle: string;
  clubsHeading: string;
  clubsSubtitle: string;
  nyeHeading: string;
  nyeSubtitle: string;
  matrixHeading: string;
  matrixSubtitle: string;
  matrixHeaders: {
    club: string;
    city: string;
    exit: string;
    minutes: string;
    target: string;
    format: string;
    nights: string;
  };
  guideMainHeading: string;
  guideMainSubtitle: string;
  mapHeading: string;
  mapSubtitle: string;
  faqHeading: string;
  openClubProfileLabel: string;
  openNyeSheetLabel: string;
  uponRequestBadge: string;
  explorerLabels: BergamoBresciaExplorerLabels;
  corridorRows: BergamoBresciaCorridorRow[];
  chapters: BergamoBresciaGuideChapter[];
  faqs: Array<{ q: string; a: string }>;
}

const CORRIDOR_ROWS_IT: BergamoBresciaCorridorRow[] = [
  {
    clubName: 'Setai Club Bergamo',
    cityProvince: 'Orio al Serio (BG)',
    address: 'Località Portico, 21 · 24050',
    highwayExit: 'Casello A4 Bergamo / Orio BGY (4 min)',
    driveFromMilan: '35 min',
    targetAge: '18+ / 20+',
    musicAndFormat: 'Multisala Juice Tech-House, Commercial, Urban & Reggaeton',
    activeNightsSummary: 'Ven, Sab, Lun 7 Dic Immacolata, Ven 25 Dic Natale, Gio 31 Dic Capodanno 2027',
  },
  {
    clubName: 'Capogiro Joyclub',
    cityProvince: 'Curno (BG)',
    address: 'Via Trento, 14 · 24035',
    highwayExit: 'Casello A4 Dalmine / Bergamo via SS671 (8 min)',
    driveFromMilan: '35 min',
    targetAge: '25+ / Over 30',
    musicAndFormat: 'Cena Spettacolo Cantata (21:00), Voice Bar Live Karaoke & Main Room House/Revival',
    activeNightsSummary: 'Ven Feel Dinner, Sab Joyclub, Lun 7 Dic, Ven 25 Dic, Gio 31 Dic Capodanno 2027',
  },
  {
    clubName: 'Tiky Klub',
    cityProvince: 'Seriate (BG)',
    address: 'Via Nazionale, 93 · 24068',
    highwayExit: 'Casello A4 Seriate / Bergamo Est (5 min)',
    driveFromMilan: '40 min',
    targetAge: '18+ / 20+',
    musicAndFormat: 'Boutique Club House, Tech-House & Electronic Showcase',
    activeNightsSummary: 'Mer House, Ven Icon Tech-House, Sab Showcase, Gio 31 Dic Capodanno 2027',
  },
  {
    clubName: 'Zero Club',
    cityProvince: 'Bergamo Centro (BG)',
    address: 'Via Evaristo Baschenis, 9 · 24122',
    highwayExit: 'Casello A4 Bergamo (7 min) · Stazione FS (10 min a piedi)',
    driveFromMilan: '40 min',
    targetAge: '18+ / 20+ (Tessera Club)',
    musicAndFormat: 'Doppia Sala: Electronic Tech-House & Urban / Hip-Hop Downtown',
    activeNightsSummary: 'Mer Please, Ven Premiere, Sab Dual-Room, Gio 31 Dic Capodanno 2027',
  },
  {
    clubName: 'Qi Clubbing',
    cityProvince: 'Erbusco · Franciacorta (BS)',
    address: 'Via dell’Industria, 83 · 25030',
    highwayExit: 'Casello A4 Rovato (2 min reali dal casello)',
    driveFromMilan: '50 min',
    targetAge: '21+ / 25+',
    musicAndFormat: 'Dinner Show Gourmet Franciacorta, House, Tech-House & Luxury Privé',
    activeNightsSummary: 'Ven Dinner Show, Sab Gourmet & Club, Lun 7 Dic, Ven 25 Dic, Gio 31 Dic Capodanno 2027',
  },
  {
    clubName: 'Number One',
    cityProvince: 'Corte Franca · Franciacorta (BS)',
    address: 'Via Provinciale, 1/B · 25040',
    highwayExit: 'Casello A4 Rovato o Palazzolo -> SP XI Lago d’Iseo (12 min)',
    driveFromMilan: '55 min',
    targetAge: '18+ (Mar 22 Dic Studenti 16+)',
    musicAndFormat: 'Mega-Club Multisala EDM, Commercial, Tech-House, Urban & 90s/2000s',
    activeNightsSummary: 'Sab Multisala, Lun 7 Dic Immacolata, Mar 22 Dic Student Xmas, Gio 31 Dic Capodanno 2027',
  },
];

const CORRIDOR_ROWS_EN: BergamoBresciaCorridorRow[] = [
  {
    clubName: 'Setai Club Bergamo',
    cityProvince: 'Orio al Serio (BG)',
    address: 'Località Portico, 21 · 24050',
    highwayExit: 'A4 Bergamo exit / Milan Bergamo BGY Airport (4 min)',
    driveFromMilan: '35 min',
    targetAge: '18+ / 20+',
    musicAndFormat: 'Multi-Room Juice Tech-House, Commercial, Urban & Reggaeton Arena',
    activeNightsSummary: 'Fri, Sat, Mon Dec 7 Eve, Fri Dec 25 Xmas, Thu Dec 31 NYE 2027',
  },
  {
    clubName: 'Capogiro Joyclub',
    cityProvince: 'Curno (BG)',
    address: 'Via Trento, 14 · 24035',
    highwayExit: 'A4 Dalmine / Bergamo exit via SS671 (8 min)',
    driveFromMilan: '35 min',
    targetAge: '25+ / 30+ Adults',
    musicAndFormat: '21:00 Singing Dinner Party, Live Karaoke Voice Bar & Main Room House/Revival',
    activeNightsSummary: 'Fri Feel Dinner, Sat Joyclub, Mon Dec 7, Fri Dec 25, Thu Dec 31 NYE 2027',
  },
  {
    clubName: 'Tiky Klub',
    cityProvince: 'Seriate (BG)',
    address: 'Via Nazionale, 93 · 24068',
    highwayExit: 'A4 Seriate / Bergamo East exit (5 min)',
    driveFromMilan: '40 min',
    targetAge: '18+ / 20+',
    musicAndFormat: 'Intimate Boutique House, Tech-House & Electronic Showcase',
    activeNightsSummary: 'Wed House, Fri Icon Tech-House, Sat Showcase, Thu Dec 31 NYE 2027',
  },
  {
    clubName: 'Zero Club',
    cityProvince: 'Bergamo Center (BG)',
    address: 'Via Evaristo Baschenis, 9 · 24122',
    highwayExit: 'A4 Bergamo exit (7 min) · Bergamo Train Station (10 min walk)',
    driveFromMilan: '40 min',
    targetAge: '18+ / 20+ (Club Card)',
    musicAndFormat: 'Downtown Dual-Room: Tech-House Main Floor & Urban Second Room',
    activeNightsSummary: 'Wed Please, Fri Premiere, Sat Dual-Room, Thu Dec 31 NYE 2027',
  },
  {
    clubName: 'Qi Clubbing',
    cityProvince: 'Erbusco · Franciacorta (BS)',
    address: 'Via dell’Industria, 83 · 25030',
    highwayExit: 'A4 Rovato exit (2 min from toll booth)',
    driveFromMilan: '50 min',
    targetAge: '21+ / 25+',
    musicAndFormat: 'Franciacorta Gourmet Dinner Show, House, Tech-House & Luxury Privé',
    activeNightsSummary: 'Fri Dinner Show, Sat Gourmet & Club, Mon Dec 7, Fri Dec 25, Thu Dec 31 NYE 2027',
  },
  {
    clubName: 'Number One',
    cityProvince: 'Corte Franca · Franciacorta (BS)',
    address: 'Via Provinciale, 1/B · 25040',
    highwayExit: 'A4 Rovato or Palazzolo exit -> SP XI toward Lake Iseo (12 min)',
    driveFromMilan: '55 min',
    targetAge: '18+ (Tue Dec 22 Student Xmas 16+)',
    musicAndFormat: 'Monumental Multi-Arena Megaclub: EDM, Commercial, Tech-House & Urban',
    activeNightsSummary: 'Sat Multisala, Mon Dec 7 Eve, Tue Dec 22 Student Xmas, Thu Dec 31 NYE 2027',
  },
];

const CHAPTERS_IT: BergamoBresciaGuideChapter[] = [
  {
    id: 'capitolo-dorsale-a4',
    eyebrow: 'CAPITOLO 01 · GEOGRAFIA NOTTURNA DELL’ASSE A4',
    h2: 'Perché Bergamo, Brescia e la Franciacorta sono la seconda capitale del clubbing lombardo',
    h3a: 'Dai caselli autostradali A4 alle piste multisala senza ZTL né attese',
    paragraphsA: [
      'Chi vive la notte tra Milano Est, la Brianza orientale, Bergamo, la Franciacorta e il Lago d’Iseo conosce bene il vantaggio concreto della dorsale autostradale A4: in 35-55 minuti di scorrimento fluido si raggiungono arene multisala progettate espressamente per l’intrattenimento notturno, dotate di parcheggi dedicati a pochi passi dall’ingresso, impianti audio ad alta pressione acustica e aree Tavoli VIP Privé molto più spaziose rispetto ai seminterrati cittadini.',
      'Questa sezione ufficiale di Nightlife Milan riunisce in un unico calendario verificato i sei club chiave tra Bergamo e Brescia: Setai Club a Orio al Serio, Capogiro Joyclub a Curno, Tiky Klub a Seriate e Zero Club nel cuore di Bergamo Bassa per il versante orobico; Qi Clubbing a Erbusco e Number One a Corte Franca per il quadrante di Brescia e della Franciacorta. Ogni scheda locale, ogni serata settimanale, ogni appuntamento prefestivo di dicembre 2026 e ogni veglione di Capodanno 2027 è collegato direttamente al nostro Desk Concierge WhatsApp +39 351 912 7047.',
      'Scegliere in anticipo il club giusto lungo l’asse A4 evita errori di target, code inutili a mezzanotte e spostamenti improvvisati. Un gruppo adulto over 25 o over 30 in cerca di cena cantata con tavolo mantenuto tutta la notte troverà nel Capogiro di Curno o nel Qi Clubbing di Erbusco il proprio habitat naturale; chi desidera il grande impatto scenografico di un’arena tech-house o commerciale punterà sul Setai di Orio al Serio o sulla dimensione festival del Number One in Franciacorta; chi preferisce un suono house ravvicinato o un club urbano in pieno centro a Bergamo sceglierà invece Tiky Klub a Seriate o Zero Club in Via Baschenis.',
    ],
    h3b: 'Aeroporto di Orio al Serio (BGY), treni regionali e rientro agevole a fine serata',
    paragraphsB: [
      'Un elemento distintivo di questo corridoio è la vicinanza immediata allo scalo internazionale di Milano Bergamo Orio al Serio (BGY): il Setai Club dista appena quattro minuti di taxi dal terminal arrivi e dal casello A4 Bergamo, rendendolo la meta prediletta anche per chi atterra il venerdì o il sabato sera per un weekend in Lombardia o per i festeggiamenti di San Silvestro.',
      'Allo stesso modo, Zero Club in Via Evaristo Baschenis 9 si raggiunge in dieci minuti a piedi dalla stazione ferroviaria di Bergamo, mentre Qi Clubbing sorge letteralmente a due minuti dalla barriera autostradale A4 di Rovato, nel cuore dei vigneti della Franciacorta. Per i gruppi numerosi che desiderano festeggiare un compleanno, una laurea o il Capodanno 2027 senza guidare al ritorno, il Concierge WhatsApp coordina anche l’abbinamento tra orario di ingresso al tavolo VIP e servizio NCC o van dedicato da Milano, Monza, Bergamo e Brescia città.',
    ],
    imageSrc: '/images/seo-events/master/setai-01.webp',
    imageAlt: 'Setai Club Bergamo Orio al Serio arena principale luci architetturali e tavoli VIP Privé',
    imageCaption: 'Setai Club a Orio al Serio (BG): arena multisala a 4 minuti dal casello A4 Bergamo e dallo scalo BGY.',
  },
  {
    id: 'capitolo-bergamo-quattro-club',
    eyebrow: 'CAPITOLO 02 · I QUATTRO CLUB DI BERGAMO E PROVINCIA',
    h2: 'Guida ai 4 locali di Bergamo: Setai Club, Capogiro Curno, Tiky Klub Seriate e Zero Club',
    h3a: 'Setai Club (Orio al Serio) e Capogiro Joyclub (Curno): multisala internazionale e cena cantata 25+',
    paragraphsA: [
      'Setai Club (Località Portico 21, 24050 Orio al Serio) rappresenta l’ammiraglia ad alta capienza della notte bergamasca. Il venerdì sera accende il weekend con un format energico dedicato a sonorità Commercial, Urban, Hip-Hop e Reggaeton che richiama comitive miste da tutta la provincia e dall’est milanese; il sabato sera alza l’asticella elettronica con le celebri notti Juice Tech-House affiancate dalla sala commerciale e da postazioni Super Privé rialzate dietro la consolle DJ. A dicembre il calendario si arricchisce del prefestivo dell’Immacolata (lunedì 7 dicembre 2026), del tradizionale Christmas Night Party del 25 dicembre e del grande veglione multisala di Capodanno 2027.',
      'Sul versante occidentale di Bergamo, in Via Trento 14 a Curno, Capogiro Joyclub risponde a un’esigenza precisa: offrire una serata completa, curata e rigorosamente calibrata su un pubblico adulto 25+, 30+ e 40+. Qui la notte inizia alle 21:00 al tavolo ristorante con il Feel Dinner Party del venerdì e la Cena Spettacolo Joyclub del sabato, dove si canta tra portate servite e bottiglie selezionate. Dalle 23:30 il locale svela la sua tripla architettura: oltre alla Main Room house, commerciale e revival anni ’90/2000, si accende il Voice Bar dedicato al karaoke dal vivo, permettendo a ogni gruppo di alternare pista da ballo e canto corale senza mai cambiare indirizzo.',
    ],
    h3b: 'Tiky Klub (Seriate) e Zero Club (Bergamo Centro): cultura house intima e doppia sala cittadina',
    paragraphsB: [
      'A est del capoluogo, lungo Via Nazionale 93 a Seriate (cinque minuti dal casello A4 Seriate), Tiky Klub si è imposto come il salotto elettronico per chi mette al primo posto la qualità del suono House e Tech-House e il contatto ravvicinato con la consolle. Oltre all’appuntamento infrasettimanale del mercoledì notte, il venerdì Icon Tech-House e il sabato sera con guest DJ richiamano appassionati di club culture contemporanea. Essendo un boutique club dalla capienza raccolta, i divanetti Privé attorno al DJ booth vanno prenotati con anticipo su WhatsApp.',
      'Chi invece vuole vivere il centro di Bergamo Bassa trova il proprio punto fermo in Zero Club (Via Evaristo Baschenis 9, 24122 Bergamo). Strutturato su due sale distinte che permettono di passare dai groove Tech-House ed elettronici della sala principale alle vibrazioni Urban, Trap e Hip-Hop della seconda sala, Zero Club anima il mercoledì universitario e giovane con il format Please, il venerdì Premiere e il sabato Dual-Room, oltre alla notte di San Silvestro. Trattandosi di un circolo privato, è utile verificare sempre al momento della prenotazione su WhatsApp le modalità di tesseramento insieme al documento d’identità fisico originale.',
    ],
    imageSrc: '/images/seo-events/master/capogiro-01.webp',
    imageAlt: 'Capogiro Joyclub Curno Bergamo sala cena cantata tavoli conviviali e luci calde',
    imageCaption: 'Capogiro Joyclub a Curno (BG): cena spettacolo dalle 21:00, Voice Bar live karaoke e club adulto 25+.',
  },
  {
    id: 'capitolo-brescia-franciacorta',
    eyebrow: 'CAPITOLO 03 · BRESCIA E FRANCIACORTA',
    h2: 'Qi Clubbing (Erbusco) e Number One (Corte Franca): eleganza in Franciacorta e megaclub multisala',
    h3a: 'Qi Clubbing a Erbusco: Dinner Show gourmet, bollicine Franciacorta e Privé di design',
    paragraphsA: [
      'Uscendo al casello A4 di Rovato bastano centoventi secondi per raggiungere Via dell’Industria 83 a Erbusco, indirizzo storico di Qi Clubbing. Immerso nel territorio simbolo delle bollicine italiane, il Qi incarna il concetto di supperclub contemporaneo della provincia di Brescia: linee architettoniche minimaliste, illuminazione scenografica calda, accoglienza sartoriale e una selezione alla porta orientata a un pubblico elegante 21+ e 25+.',
      'Il venerdì e il sabato sera la serata si apre alle 21:00 con il Dinner Show servito al tavolo, ideale per compleanni importanti, cene tra coppie o gruppi di amici che desiderano abbinare cucina curata e calici di Franciacorta prima della trasformazione in club dalle 23:30 alle 04:30. Nei grandi appuntamenti di dicembre 2026 (lunedì 7 dicembre prefestivo dell’Immacolata, venerdì 25 dicembre Christmas Gala e giovedì 31 dicembre Gran Galà di Capodanno 2027), il mantenimento del tavolo dal cenone al privé dopocena rappresenta la formula più richiesta dell’intera Franciacorta.',
    ],
    h3b: 'Number One a Corte Franca: l’icona multisala verso il Lago d’Iseo e gli eventi speciali',
    paragraphsB: [
      'A pochi chilometri da Erbusco, lungo la direttrice che conduce alle rive del Lago d’Iseo (Via Provinciale 1/B, 25040 Corte Franca), sorge Number One, una vera istituzione della storia delle discoteche italiane capace di rinnovarsi in una moderna arena multisala da grandi numeri. Le sue ampie sale indipendenti permettono di far convivere nella stessa notte EDM ad alto impatto visivo, hit commerciali e urban, Tech-House e selezioni anni ’90/2000.',
      'Oltre al celebre Sabato Multisala (23:00 - 04:30) e alla maratona prefestiva del 7 dicembre, il calendario di fine anno di Number One include due date imperdibili: martedì 22 dicembre 2026 con THE END: Student Xmas Party (il grande raduno studentesco natalizio di Brescia e provincia con apertura anticipata alle 22:30 e controllo rigoroso del documento originale) e giovedì 31 dicembre 2026 con il monumentale Festival di Capodanno 2027 fino alle prime luci del mattino. Prenotare una postazione in Balconata VIP o Super Privé garantisce visuale panoramica sull’arena centrale e accesso dedicato senza attese ai varchi.',
    ],
    imageSrc: '/images/seo-events/master/qiclubbing-01.webp',
    imageAlt: 'Qi Clubbing Erbusco Franciacorta Brescia sala dinner show e tavoli privé contemporanei',
    imageCaption: 'Qi Clubbing a Erbusco (BS): supperclub e privé di design a 2 minuti reali dal casello A4 Rovato.',
  },
  {
    id: 'capitolo-capodanno-e-prenotazioni',
    eyebrow: 'CAPITOLO 04 · CAPODANNO 2027, TAVOLI VIP E REGOLE D’INGRESSO',
    h2: 'Come prenotare Tavoli VIP, Cene Spettacolo e Capodanno 2027 tra Bergamo e Brescia',
    h3a: 'Trasparenza sui listini, differenza tra schede ufficiali del club e veglioni in location esterne',
    paragraphsA: [
      'Durante il mese di dicembre e per la notte di San Silvestro (giovedì 31 dicembre 2026), la domanda di tavoli cena e postazioni Privé lungo la direttrice Bergamo-Brescia cresce rapidamente già dalla seconda metà di novembre. Sul portale Nightlife Milan adottiamo una regola editoriale rigorosa: ogni club dispone della propria scheda ufficiale di Capodanno 2027 all’indirizzo reale del locale (Setai a Orio al Serio, Capogiro a Curno, Tiky Klub a Seriate, Zero Club a Bergamo Centro, Qi Clubbing a Erbusco e Number One a Corte Franca), chiaramente distinta dalle eventuali produzioni in ville o club partner ospitate in altre sedi.',
      'Poiché le quote di ingresso, i menu del Gran Cenone e i minimali di spesa in bottiglie per i Tavoli VIP Privé variano in base alla data (serata ordinaria, prefestivo del 7 dicembre, notte di Natale del 25 dicembre o Capodanno del 31 dicembre), alla sala prescelta e alla composizione uomo/donna del gruppo, non pubblichiamo mai cifre ipotetiche: scrivendo al Concierge WhatsApp +39 351 912 7047 ricevi in tempo reale le formule ufficiali aggiornate per la tua serata specifica.',
    ],
    h3b: 'Tre consigli pratici per superare la selezione alla porta e godersi la serata',
    paragraphsB: [
      'Primo: porta sempre con te un documento d’identità fisico originale in corso di validità (carta d’identità, patente o passaporto); in tutti i club di Bergamo e Brescia foto sullo smartphone o fotocopie non vengono accettate dai responsabili della sicurezza. Secondo: calibra l’outfit sul locale scelto, privilegiando camicia o giacca per l’uomo e abito curato per la donna nei dinner club come Capogiro e Qi Clubbing, e uno stile clubwear pulito (mai tute sportive o borselli tecnici) nelle arene come Setai, Tiky Klub, Zero Club e Number One.',
      'Terzo: se siete un gruppo di sei o più persone, chiedete sempre il confronto tra ingressi singoli e Tavolo VIP Privé. Dividendo il credito bottiglie del tavolo tra gli amici del gruppo si ottiene una spesa a persona equilibrata, si entra subito dalla fila dedicata accompagnati dalla hostess e si dispone di un punto d’appoggio fisso per tutta la durata della notte.',
    ],
    imageSrc: '/images/seo-events/master/numberone-01.webp',
    imageAlt: 'Number One Corte Franca Brescia arena multisala balconata VIP e produzione luci',
    imageCaption: 'Number One a Corte Franca (BS): balconate VIP panoramiche e produzione multisala in Franciacorta.',
  },
];

const CHAPTERS_EN: BergamoBresciaGuideChapter[] = [
  {
    id: 'capitolo-dorsale-a4',
    eyebrow: 'CHAPTER 01 · THE A4 MOTORWAY NIGHTLIFE CORRIDOR',
    h2: 'Why Bergamo, Brescia & Franciacorta Form Lombardy’s Premier Multi-Room Clubbing Axis',
    h3a: 'Direct highway exits, spacious VIP Privé balconies, and zero city-center ZTL cameras',
    paragraphsA: [
      'Stretching east from Milan along the A4 motorway toward Milan Bergamo Airport (BGY), Lake Iseo, and the Franciacorta wine country lies Northern Italy’s powerhouse belt for high-capacity clubbing and singing dinner shows. Within 35 to 55 minutes by car from eastern Milan, clubbers reach purpose-built multi-room arenas equipped with dedicated adjacent parking lots, concert-grade sound systems, and expansive VIP Privé balconies.',
      'This official Nightlife Milan hub brings together all six flagship venues across Bergamo and Brescia in one verified live schedule: Setai Club in Orio al Serio, Capogiro Joyclub in Curno, Tiky Klub in Seriate, and Zero Club in downtown Bergamo on the Bergamo side; plus Qi Clubbing in Erbusco and Number One in Corte Franca across Brescia and Franciacorta. Every club profile, weekly party, December 2026 holiday event, and New Year’s Eve 2027 gala connects directly to our 7/7 WhatsApp Concierge desk at +39 351 912 7047.',
      'Matching your group to the right venue beforehand guarantees a seamless night out. Adult 25+ and 30+ groups looking for a 21:00 singing dinner show that flows directly into clubbing gravitate toward Capogiro in Curno or Qi Clubbing in Erbusco; fans of high-impact Tech-House, EDM, and multi-room arenas choose Setai Club near BGY Airport or Number One in Corte Franca; while house purists and downtown clubbers head to Tiky Klub in Seriate or Zero Club in central Bergamo.',
    ],
    h3b: 'Milan Bergamo Airport (BGY) proximity and smooth late-night group logistics',
    paragraphsB: [
      'International travelers landing at Milan Bergamo Airport (BGY) on a Friday, Saturday, or December holiday evening sit just four minutes by taxi from Setai Club in Orio al Serio and under ten minutes from downtown Bergamo’s Zero Club and Seriate’s Tiky Klub.',
      'Further east along the A4, Qi Clubbing stands literally two minutes off the Rovato motorway toll booth in the heart of Franciacorta, while Number One anchors the scenic road toward Lake Iseo in Corte Franca. For groups of six to fifteen guests celebrating a birthday, bachelor/bachelorette party, or New Year’s Eve 2027, our WhatsApp Concierge coordinates VIP table check-in times alongside private van or chauffeur transfers from Milan, Bergamo, Brescia, or Lake Garda.',
    ],
    imageSrc: '/images/seo-events/master/setai-01.webp',
    imageAlt: 'Setai Club Bergamo Orio al Serio main arena lighting and elevated VIP Privé booths',
    imageCaption: 'Setai Club in Orio al Serio (Bergamo): flagship multi-room arena 4 minutes from BGY Airport and the A4 exit.',
  },
  {
    id: 'capitolo-bergamo-quattro-club',
    eyebrow: 'CHAPTER 02 · BERGAMO’S FOUR FLAGSHIP CLUBS',
    h2: 'Bergamo Club Guide: Setai Club, Capogiro Curno, Tiky Klub Seriate & Zero Club',
    h3a: 'Setai Club (Orio al Serio) & Capogiro Joyclub (Curno): international showcase vs 25+ dinner party',
    paragraphsA: [
      'Setai Club (Località Portico 21, 24050 Orio al Serio) leads Bergamo’s big-room clubbing scene. Friday nights spotlight Commercial, Urban, Hip-Hop, and Reggaeton energy across a stylish crowd, while Saturday nights host the renowned Juice Tech-House showcase alongside a commercial room and elevated DJ Console Super Privé booths. December adds Monday, December 7 (Immaculate Conception Eve), Friday, December 25 (Christmas Night Party), and Thursday, December 31 (New Year’s Eve 2027 Gala & Arena Party).',
      'On the western side of Bergamo at Via Trento 14 in Curno, Capogiro Joyclub caters specifically to a polished 25+ and 30+ adult audience. Doors open at 21:00 for the Feel Friday Dinner Party and Saturday Joyclub Dinner Show, pairing seated Italian dining with live sing-along entertainment. From 23:30 onward, guests move freely across three distinct spaces: the Main Room (House, Commercial, and 90s/2000s Revival), the live karaoke Voice Bar, and reserved VIP Privé lounges.',
    ],
    h3b: 'Tiky Klub (Seriate) & Zero Club (Downtown Bergamo): boutique house grooves and dual-room energy',
    paragraphsB: [
      'Five minutes off the A4 Seriate exit at Via Nazionale 93, Tiky Klub is Bergamo East’s intimate temple for House and Tech-House enthusiasts. Running Wednesday midweek sessions, Friday Icon Tech-House nights, Saturday guest showcases, and a dedicated New Year’s Eve countdown, Tiky Klub pairs punchy low-end acoustics with boutique VIP booths right beside the DJ console.',
      'In downtown Bergamo Bassa at Via Evaristo Baschenis 9 (a ten-minute walk from Bergamo train station), Zero Club delivers a dynamic two-room urban clubbing experience: Tech-House and electronic sets in the main room, paired with Hip-Hop, Trap, and Urban rhythms in the second room across Wednesday Please, Friday Premiere, Saturday Dual-Room, and NYE 2027. Note that Zero Club operates with club membership registration alongside mandatory physical photo ID.',
    ],
    imageSrc: '/images/seo-events/master/capogiro-01.webp',
    imageAlt: 'Capogiro Joyclub Curno Bergamo singing dinner party tables and warm architectural lighting',
    imageCaption: 'Capogiro Joyclub in Curno (Bergamo): 21:00 singing dinner show, live Voice Bar, and 25+ clubbing.',
  },
  {
    id: 'capitolo-brescia-franciacorta',
    eyebrow: 'CHAPTER 03 · BRESCIA & FRANCIACORTA',
    h2: 'Qi Clubbing (Erbusco) & Number One (Corte Franca): Franciacorta Glamour and Festival Megaclub',
    h3a: 'Qi Clubbing in Erbusco: gourmet Dinner Show, Franciacorta sparkling wine & luxury Privé',
    paragraphsA: [
      'Just two minutes from the A4 Rovato exit at Via dell’Industria 83 in Erbusco, Qi Clubbing defines upscale nightlife across Brescia and the Franciacorta wine region. Designed as a contemporary architectural supperclub for a 21+ and 25+ crowd, Qi opens at 21:00 on Fridays and Saturdays with a seated Gourmet Dinner Show paired with Franciacorta sparkling wines, before transitioning at 23:30 into a high-energy House, Tech-House, and Commercial club until 04:30.',
      'Throughout December 2026, Qi Clubbing headlines three major holiday dates: Monday, December 7 (Immaculate Conception Eve), Friday, December 25 (Christmas Night Gala), and Thursday, December 31 (New Year’s Eve 2027 Gala Dinner & Club Party), where keeping your dinner table into the midnight VIP club session offers effortless comfort.',
    ],
    h3b: 'Number One in Corte Franca: multi-room festival scale near Lake Iseo',
    paragraphsB: [
      'Located at Via Provinciale 1/B in Corte Franca along the gateway to Lake Iseo, Number One stands among Italy’s most iconic multi-arena megaclubs. Its independent sound stages host EDM, Commercial, Tech-House, Urban, and 90s/2000s formats simultaneously under festival-scale lighting rigs and panoramic VIP balconies.',
      'Alongside its flagship Saturday Multisala nights and the December 7 pre-holiday marathon, Number One hosts Brescia’s largest Christmas student gathering on Tuesday, December 22, 2026 (THE END: Student Xmas Party, opening at 22:30 with strict physical ID verification) followed by its monumental New Year’s Eve 2027 Multi-Room Festival on Thursday, December 31.',
    ],
    imageSrc: '/images/seo-events/master/qiclubbing-01.webp',
    imageAlt: 'Qi Clubbing Erbusco Franciacorta Brescia dinner show room and contemporary VIP lounge',
    imageCaption: 'Qi Clubbing in Erbusco (Brescia): Franciacorta supperclub and luxury Privé 2 minutes off the A4 Rovato exit.',
  },
  {
    id: 'capitolo-capodanno-e-prenotazioni',
    eyebrow: 'CHAPTER 04 · NEW YEAR’S EVE 2027, VIP TABLES & DOOR ETIQUETTE',
    h2: 'How to Book VIP Privé Tables, Dinner Shows & New Year’s Eve 2027 in Bergamo and Brescia',
    h3a: 'Transparent real-time WhatsApp quotes and dedicated per-club NYE event sheets',
    paragraphsA: [
      'Every club featured in this hub has its own dedicated New Year’s Eve 2027 event page hosted at the club’s actual address (Setai in Orio al Serio, Capogiro in Curno, Tiky Klub in Seriate, Zero Club in Bergamo Center, Qi Clubbing in Erbusco, and Number One in Corte Franca), kept clearly distinct from any partner gala hosted at external villas or banquet venues.',
      'Because entry formulas, gala dinner menus, and VIP bottle-table minimums shift between regular weekends, December holiday dates (Dec 7, Dec 22, Dec 25), and December 31 New Year’s Eve, we never publish guesswork pricing. Messaging our Official Nightlife Milan Concierge on WhatsApp (+39 351 912 7047) gives your group verified live availability, exact bottle minimums, and fast-track VIP table confirmation.',
    ],
    h3b: 'Three essential tips for smooth door entry across all six venues',
    paragraphsB: [
      'First, every guest must carry an original physical government-issued photo ID (passport, national ID card, or driver’s license); phone screenshots are declined by security across Bergamo and Brescia. Second, match your attire to the venue: collared shirts, blazers, and cocktail attire for adult supperclubs like Capogiro and Qi Clubbing, and polished clubwear (never athletic tracksuits or gym shorts) at Setai, Tiky Klub, Zero Club, and Number One.',
      'Third, for groups of six or more friends, splitting a reserved VIP Privé or Balcony table delivers priority skip-the-line reception, dedicated seating all night, and full bottle service right at your booth.',
    ],
    imageSrc: '/images/seo-events/master/numberone-01.webp',
    imageAlt: 'Number One Corte Franca Brescia multi-room arena panoramic VIP balcony and lighting rig',
    imageCaption: 'Number One in Corte Franca (Brescia): panoramic VIP balconies and multi-arena production in Franciacorta.',
  },
];

const FAQS_IT: Array<{ q: string; a: string }> = [
  {
    q: 'Quali sono i 6 migliori club e discoteche tra Bergamo e Brescia presenti su Nightlife Milan?',
    a: 'La sezione dedicata copre 4 club a Bergamo e provincia (Setai Club a Orio al Serio, Capogiro Joyclub a Curno, Tiky Klub a Seriate e Zero Club in Bergamo Centro) e 2 club a Brescia in Franciacorta (Qi Clubbing a Erbusco e Number One a Corte Franca).',
  },
  {
    q: 'Quanto distano da Milano i club di Bergamo e della Franciacorta lungo l’autostrada A4?',
    a: 'Partendo da Milano Est lungo l’autostrada A4, Setai Club (uscita Bergamo/Orio BGY) e Capogiro Curno (uscita Dalmine/Bergamo) distano circa 35 minuti; Tiky Klub Seriate e Zero Club Bergamo distano circa 40 minuti; Qi Clubbing Erbusco (uscita Rovato) 50 minuti e Number One Corte Franca 55 minuti.',
  },
  {
    q: 'Quali locali offrono Cena Cantata o Dinner Show prima della discoteca?',
    a: 'Capogiro Joyclub a Curno (BG) propone dalle 21:00 la Cena Party cantata seguita da Voice Bar karaoke e Main Room per un pubblico 25+, mentre Qi Clubbing a Erbusco (BS) offre dalle 21:00 il Dinner Show gourmet in Franciacorta con prosecuzione nel club dalle 23:30.',
  },
  {
    q: 'Tutti i 6 club organizzano il veglione di Capodanno 2027 (31 dicembre 2026)?',
    a: 'Sì: nella sezione Capodanno 2027 di questa pagina trovi le 6 schede ufficiali dedicate a Setai Club, Capogiro Curno, Tiky Klub Seriate, Zero Club Bergamo, Qi Clubbing Erbusco e Number One Corte Franca, con prenotazione tavoli cenone e privé su WhatsApp +39 351 912 7047.',
  },
  {
    q: 'Quali sono le serate speciali di dicembre 2026 oltre ai weekend regolari?',
    a: 'Il calendario include i prefestivi dell’Immacolata di lunedì 7 dicembre 2026 (Setai, Capogiro, Qi Clubbing, Number One), l’evento studentesco THE END: Student Xmas Party di martedì 22 dicembre al Number One, le notti di Natale di venerdì 25 dicembre (Setai, Capogiro, Qi Clubbing) e i 6 veglioni del 31 dicembre.',
  },
  {
    q: 'Qual è la differenza tra Capodanno al Setai Club di Orio al Serio e il format Setai x Bobadilla?',
    a: 'La scheda Capodanno Setai Club Bergamo riguarda il veglione nella sede multisala di Località Portico 21 a Orio al Serio (BG); la scheda separata Setai x Bobadilla riguarda invece la produzione ospitata presso il Bobadilla Club di Dalmine (Via Pascolo 34).',
  },
  {
    q: 'Qual è la differenza tra Capodanno al Number One di Corte Franca e il Gran Galà a Villa Fenaroli?',
    a: 'La scheda Capodanno Number One Brescia riguarda il festival multisala nella storica sede di Via Provinciale 1/B a Corte Franca (BS); la scheda Villa Fenaroli riguarda invece il galà in dimora storica a Rezzato (BS).',
  },
  {
    q: 'Serve la tessera associativa o un documento specifico per entrare?',
    a: 'In tutti i 6 club è obbligatorio esibire un documento d’identità fisico originale (niente foto sul telefono). Inoltre Zero Club in Via Baschenis 9 a Bergamo richiede la tessera club associativa secondo le indicazioni fornite in fase di accredito.',
  },
  {
    q: 'Quale club consigliate per un pubblico adulto over 25 e over 30?',
    a: 'Capogiro Joyclub a Curno (BG) è progettato specificamente per un pubblico adulto 25+ e over 30 con cena cantata e Voice Bar; anche Qi Clubbing a Erbusco (BS) mantiene una selezione elegante 21+/25+ molto apprezzata da coppie e gruppi adulti.',
  },
  {
    q: 'Come si prenota un Tavolo VIP Privé o la lista ingresso su WhatsApp?',
    a: 'Clicca su qualsiasi pulsante verde WhatsApp in questa pagina o scrivi direttamente al +39 351 912 7047 indicando nome del locale, data della serata, numero di partecipanti (uomini/donne) e preferenza tra cena, lista o Tavolo VIP Privé.',
  },
];

const FAQS_EN: Array<{ q: string; a: string }> = [
  {
    q: 'Which 6 clubs in Bergamo and Brescia are featured in this official hub?',
    a: 'We cover 4 flagship clubs in Bergamo (Setai Club in Orio al Serio, Capogiro Joyclub in Curno, Tiky Klub in Seriate, and Zero Club in Downtown Bergamo) plus 2 flagship clubs in Brescia and Franciacorta (Qi Clubbing in Erbusco and Number One in Corte Franca).',
  },
  {
    q: 'How far are Bergamo and Brescia clubs from Milan by car?',
    a: 'Via the A4 motorway from eastern Milan, Setai Club (4 min from BGY Airport) and Capogiro Curno take ~35 minutes; Tiky Klub Seriate and Zero Club Bergamo take ~40 minutes; Qi Clubbing Erbusco (2 min from A4 Rovato) takes ~50 minutes; and Number One Corte Franca takes ~55 minutes.',
  },
  {
    q: 'Which clubs offer a Singing Dinner Party or Gourmet Dinner Show?',
    a: 'Capogiro Joyclub in Curno (Bergamo) hosts a 21:00 Singing Dinner Party + live karaoke Voice Bar tailored to a 25+ adult crowd, while Qi Clubbing in Erbusco (Franciacorta, Brescia) hosts a 21:00 Gourmet Dinner Show before clubbing starts at 23:30.',
  },
  {
    q: 'Do all 6 clubs host dedicated New Year’s Eve 2027 events on December 31, 2026?',
    a: 'Yes: every single club has its own dedicated New Year’s Eve 2027 event page linked in this hub, with Gala Dinner and VIP Privé bottle table reservations managed via WhatsApp at +39 351 912 7047.',
  },
  {
    q: 'What December 2026 holiday events run alongside regular weekly nights?',
    a: 'Special dates include Monday, Dec 7 (Immaculate Conception Eve at Setai, Capogiro, Qi Clubbing, and Number One), Tuesday, Dec 22 (THE END: Student Xmas Party at Number One), Friday, Dec 25 (Christmas Night at Setai, Capogiro, and Qi Clubbing), and all 6 NYE 2027 galas on Dec 31.',
  },
  {
    q: 'What is the difference between Setai Club Bergamo NYE and the Setai x Bobadilla event?',
    a: 'The Capodanno Setai Club Bergamo page covers New Year’s Eve inside Setai Club’s multi-room arena in Orio al Serio (Località Portico 21), whereas the separate Bobadilla page covers the partner dinner gala hosted at Bobadilla Club in Dalmine.',
  },
  {
    q: 'What is the difference between Number One Corte Franca NYE and the Villa Fenaroli gala?',
    a: 'The Capodanno Number One Brescia page covers the multi-arena festival inside Number One megaclub in Corte Franca (Via Provinciale 1/B), whereas the Villa Fenaroli page covers the historic villa dinner gala in Rezzato (BS).',
  },
  {
    q: 'What ID and membership rules apply at the door?',
    a: 'All 6 clubs strictly require an original physical photo ID (photos on phones are not accepted). In addition, Zero Club in downtown Bergamo requires club membership card registration.',
  },
  {
    q: 'Which club is best suited for a 25+ or 30+ adult group?',
    a: 'Capogiro Joyclub in Curno (BG) enforces a dedicated 25+ adult door policy with singing dinner and Voice Bar, while Qi Clubbing in Erbusco (BS) attracts a stylish 21+/25+ Franciacorta dinner-and-club crowd.',
  },
  {
    q: 'How do I book a VIP Privé table or guest list via WhatsApp?',
    a: 'Tap any green WhatsApp button on this page or message +39 351 912 7047 with your chosen club, event date, group size, and whether you want dinner, guest list, or a VIP Privé bottle table.',
  },
];

interface CompactHubLocaleStrings {
  h1: string;
  lead: string;
  explorerHeading: string;
  clubsHeading: string;
  nyeHeading: string;
  matrixHeading: string;
  guideHeading: string;
  faqHeading: string;
  bookWa: string;
  hubCta: string;
  nyeBadge: string;
  weeklyBadge: string;
  datedBadge: string;
}

const COMPACT_HUB_STRINGS: Partial<Record<LocaleCode, CompactHubLocaleStrings>> = {
  es: {
    h1: 'Discotecas en Bérgamo y Brescia 2026/2027: 6 Clubes, Fiestas Activas y Nochevieja',
    lead: 'Guía oficial del corredor A4 (35-55 min desde Milán y aeropuerto Orio BGY): Setai Club, Capogiro, Tiky Klub, Zero Club, Qi Clubbing y Number One con todas las sesiones semanales, fechas de diciembre y Nochevieja 2027.',
    explorerHeading: 'Calendario Interactivo: Sesiones Activas y Nochevieja 2027',
    clubsHeading: 'Los 6 Clubes de Referencia en Bérgamo y Brescia (Franciacorta)',
    nyeHeading: 'Especial Nochevieja 2027 (31 Diciembre 2026) en los 6 Clubes',
    matrixHeading: 'Tabla Comparativa Autopista A4: Distancias, Salidas y Estilo Musical',
    guideHeading: 'Guía Completa de la Noche en Bérgamo, Brescia y Franciacorta',
    faqHeading: 'Preguntas Frecuentes sobre Clubes y Mesas VIP en Bérgamo y Brescia',
    bookWa: 'Reservar por WhatsApp',
    hubCta: 'Ver Guía Bérgamo y Brescia',
    nyeBadge: 'Nochevieja 2027',
    weeklyBadge: 'Sesión Semanal',
    datedBadge: 'Especial Dic 2026',
  },
  fr: {
    h1: 'Clubs & Discothèques Bergame et Brescia 2026/2027 : 6 Clubs, Soirées & Nouvel An',
    lead: 'Guide officiel de l’axe A4 (35-55 min de Milan et aéroport Bergame BGY) : Setai Club, Capogiro, Tiky Klub, Zero Club, Qi Clubbing et Number One avec toutes les soirées actives et les réveillons du Nouvel An 2027.',
    explorerHeading: 'Calendrier Interactif : Soirées Actives & Nouvel An 2027',
    clubsHeading: 'Les 6 Clubs Phares de Bergame et Brescia (Franciacorta)',
    nyeHeading: 'Réveillon du Nouvel An 2027 (31 Décembre 2026) dans les 6 Clubs',
    matrixHeading: 'Comparatif Autoroute A4 : Sorties, Temps de Trajet et Styles',
    guideHeading: 'Guide Éditorial : Sortir à Bergame, Brescia et en Franciacorta',
    faqHeading: 'Questions Fréquentes sur les Clubs de Bergame et Brescia',
    bookWa: 'Réserver sur WhatsApp',
    hubCta: 'Découvrir Bergame & Brescia',
    nyeBadge: 'Nouvel An 2027',
    weeklyBadge: 'Soirée Hebdo',
    datedBadge: 'Date Spéciale Déc',
  },
  de: {
    h1: 'Clubs & Nachtleben Bergamo und Brescia 2026/2027: 6 Top-Clubs, Partys & Silvester',
    lead: 'Offizieller Guide entlang der Autobahn A4 (35-55 Min. ab Mailand & Flughafen Bergamo BGY): Setai Club, Capogiro, Tiky Klub, Zero Club, Qi Clubbing und Number One inklusive aller Clubnächte und Silvester 2027.',
    explorerHeading: 'Interaktiver Party-Finder: Aktive Clubnächte & Silvester 2027',
    clubsHeading: 'Die 6 Wichtigsten Clubs in Bergamo und Brescia (Franciacorta)',
    nyeHeading: 'Silvester 2027 (31. Dezember 2026) in Allen 6 Clubs',
    matrixHeading: 'A4-Vergleichstabelle: Autobahnausfahrten, Fahrzeit & Musikstil',
    guideHeading: 'Redaktioneller Guide für Bergamo, Brescia & Franciacorta',
    faqHeading: 'Häufige Fragen zu VIP-Tischen in Bergamo & Brescia',
    bookWa: 'Per WhatsApp buchen',
    hubCta: 'Alle 6 Clubs Bergamo & Brescia',
    nyeBadge: 'Silvester 2027',
    weeklyBadge: 'Wöchentlich',
    datedBadge: 'Dezember-Special',
  },
  pt: {
    h1: 'Baladas e Clubes em Bérgamo e Brescia 2026/2027: 6 Clubes, Festas e Réveillon',
    lead: 'Guia oficial do eixo A4 (35-55 min de Milão e aeroporto Bérgamo BGY): Setai Club, Capogiro, Tiky Klub, Zero Club, Qi Clubbing e Number One com todas as noites ativas e Réveillon 2027.',
    explorerHeading: 'Calendário Interativo: Festas Ativas e Réveillon 2027',
    clubsHeading: 'Os 6 Principais Clubes de Bérgamo e Brescia (Franciacorta)',
    nyeHeading: 'Réveillon 2027 (31 de Dezembro de 2026) nos 6 Clubes',
    matrixHeading: 'Comparativo Rodovia A4: Saídas, Distâncias e Estilo Musical',
    guideHeading: 'Guia Completo da Vida Noturna em Bérgamo, Brescia e Franciacorta',
    faqHeading: 'Perguntas Frequentes sobre Mesas VIP em Bérgamo e Brescia',
    bookWa: 'Reservar no WhatsApp',
    hubCta: 'Ver Guia Bérgamo e Brescia',
    nyeBadge: 'Réveillon 2027',
    weeklyBadge: 'Noite Semanal',
    datedBadge: 'Especial Dez 2026',
  },
};

export function getBergamoBresciaHubCopy35(rawLocale: string): BergamoBresciaHubCopy {
  const loc = (getLocaleDef(rawLocale)?.code || 'en') as LocaleCode;

  if (loc === 'it') {
    return {
      eyebrow: 'DORSALE AUTOSTRADALE A4 · ORIO BGY · BERGAMO · FRANCIACORTA · BRESCIA',
      h1: 'Discoteche Bergamo e Brescia 2026/2027: I 6 Migliori Club, Serate Attive e Capodanno',
      lead: 'Guida ufficiale ai 6 locali di riferimento tra Bergamo e Brescia (Setai Club, Capogiro, Tiky Klub, Zero Club, Qi Clubbing e Number One): calendario completo delle serate settimanali, prefestivi di dicembre 2026, veglioni di Capodanno 2027 e prenotazione Tavoli VIP Privé su WhatsApp +39 351 912 7047.',
      quickAnswer:
        'La sezione Bergamo e Brescia di Nightlife Milan raccoglie 6 club ufficiali lungo l’asse A4 (Setai Club Orio al Serio, Capogiro Curno, Tiky Klub Seriate, Zero Club Bergamo Centro, Qi Clubbing Erbusco e Number One Corte Franca), con 21 serate attive tra appuntamenti settimanali e date festive di dicembre 2026 più 6 schede dedicate al Capodanno 2027. Tutti i tavoli cena, liste e Privé si prenotano direttamente via WhatsApp al +39 351 912 7047.',
      bookWaCta: 'Prenota Tavolo / Lista su WhatsApp',
      allCapodannoCta: 'Tutti gli Eventi Capodanno 2027',
      tocTitle: 'Indice della Guida Bergamo & Brescia',
      tocExplorer: '1. Calendario Serate Attive & Filtri',
      tocClubs: '2. I 6 Club (4 Bergamo · 2 Brescia)',
      tocNye: '3. Speciale Capodanno 2027 (6 Veglioni)',
      tocMatrix: '4. Tabella Caselli A4, Tempi & Target',
      tocGuide: '5. Guida Editoriale Completa',
      tocMapFaq: '6. Mappa & 10 Domande Frequenti',
      explorerHeading: 'Tutte le Serate Attive e gli Eventi Speciali tra Bergamo e Brescia',
      explorerSubtitle:
        'Filtra in tempo reale per provincia (Bergamo o Brescia/Franciacorta), singolo club o tipologia di serata (Settimanale, Data Speciale Dicembre 2026 o Capodanno 2027).',
      clubsHeading: 'I 6 Club Ufficiali: 4 a Bergamo e 2 a Brescia & Franciacorta',
      clubsSubtitle:
        'Apri la scheda completa di ciascun locale per indirizzo esatto, dress code, galleria fotografica e collegamento diretto al suo Capodanno 2027.',
      nyeHeading: 'Capodanno 2027 a Bergamo e Brescia: Tutti i 6 Veglioni del 31 Dicembre',
      nyeSubtitle:
        'Gran Cenoni serviti, Dinner Show cantati e maratone multisala fino alle 05:00 nei 6 club del corridoio A4.',
      matrixHeading: 'Confronto Rapido Asse A4: Caselli, Minuti da Milano, Età e Musica',
      matrixSubtitle:
        'Scegli il locale ideale per il tuo gruppo confrontando uscita autostradale, distanza reale, fascia d’età e formula musicale.',
      matrixHeaders: {
        club: 'Club',
        city: 'Città / Zona',
        exit: 'Uscita Autostrada A4',
        minutes: 'Da Milano',
        target: 'Target Età',
        format: 'Musica & Formula',
        nights: 'Serate Attive & Capodanno',
      },
      guideMainHeading: 'Guida Completa alla Vita Notturna tra Bergamo, Brescia e Franciacorta',
      guideMainSubtitle:
        'Analisi sul campo di sale, acustica, selezione all’ingresso, cene cantate e logistica notturna lungo la direttrice A4.',
      mapHeading: 'Mappa Interattiva del Corridoio Bergamo - Franciacorta - Brescia',
      mapSubtitle:
        'Tutti i 6 club dispongono di accesso rapido dai caselli A4 (Dalmine, Bergamo/Orio BGY, Seriate, Rovato e Palazzolo).',
      faqHeading: 'Domande Frequenti su Discoteche, Tavoli VIP e Capodanno a Bergamo e Brescia',
      openClubProfileLabel: 'Scheda Club',
      openNyeSheetLabel: 'Capodanno 2027',
      uponRequestBadge: 'Su richiesta via WhatsApp',
      explorerLabels: {
        filterProvinceAll: 'Tutti (6 Club)',
        filterBergamo: 'Bergamo (4 Club)',
        filterBrescia: 'Brescia & Franciacorta (2 Club)',
        filterClubAll: 'Tutti i 6 Club',
        filterFormatAll: 'Tutte le Serate',
        filterFormatNye: 'Capodanno 2027 (6)',
        filterFormatWeekly: 'Serate Settimanali (13)',
        filterFormatDated: 'Date Speciali Dicembre (8)',
        liveCountPrefix: 'serate attive in programma',
        nyeBadge: 'Capodanno 2027',
        weeklyBadge: 'Settimanale Attiva',
        datedBadge: 'Speciale Dicembre',
        openEventCta: 'Dettagli',
        bookWaCta: 'WhatsApp',
        emptyState: 'Nessuna serata corrisponde al filtro selezionato. Prova a selezionare Tutti i 6 Club.',
      },
      corridorRows: CORRIDOR_ROWS_IT,
      chapters: CHAPTERS_IT,
      faqs: FAQS_IT,
    };
  }

  const cmp = COMPACT_HUB_STRINGS[loc];
  return {
    eyebrow: 'A4 MOTORWAY CORRIDOR · BGY AIRPORT · BERGAMO · FRANCIACORTA · BRESCIA',
    h1:
      cmp?.h1 ||
      'Bergamo & Brescia Nightlife 2026/2027: Best 6 Clubs, Active Nights & New Year’s Eve',
    lead:
      cmp?.lead ||
      'Official guide to the 6 flagship clubs across Bergamo and Brescia (Setai Club, Capogiro, Tiky Klub, Zero Club, Qi Clubbing & Number One): compare all active weekly nights, December 2026 holiday dates, and New Year’s Eve 2027 galas with direct WhatsApp VIP booking (+39 351 912 7047).',
    quickAnswer:
      'Nightlife Milan’s official Bergamo & Brescia hub unites 6 flagship venues along the A4 highway corridor (Setai Club Orio al Serio, Capogiro Curno, Tiky Klub Seriate, Zero Club Bergamo Center, Qi Clubbing Erbusco, and Number One Corte Franca), featuring 21 active weekly and December 2026 holiday nights plus 6 dedicated New Year’s Eve 2027 event sheets. Reserve VIP Privé tables, dinner shows, and guest lists on WhatsApp at +39 351 912 7047.',
    bookWaCta: cmp?.bookWa || 'Book VIP Table on WhatsApp',
    allCapodannoCta: 'All NYE 2027 Events',
    tocTitle: 'Bergamo & Brescia Quick Navigation',
    tocExplorer: '1. Live Events & Club Filter',
    tocClubs: '2. All 6 Clubs (4 Bergamo · 2 Brescia)',
    tocNye: '3. New Year’s Eve 2027 (6 Galas)',
    tocMatrix: '4. A4 Highway & Crowd Comparison',
    tocGuide: '5. In-Depth Editorial Guide',
    tocMapFaq: '6. Corridor Map & 10 FAQs',
    explorerHeading:
      cmp?.explorerHeading ||
      'All Active Club Nights, Holiday Parties & NYE 2027 in Bergamo and Brescia',
    explorerSubtitle:
      'Filter by province (Bergamo or Brescia/Franciacorta), individual club, or night format (Weekly, December Special Date, or New Year’s Eve 2027).',
    clubsHeading:
      cmp?.clubsHeading || 'The 6 Flagship Clubs: 4 in Bergamo & 2 in Brescia / Franciacorta',
    clubsSubtitle:
      'Open each official club profile for exact street address, dress code, real venue photography, and its dedicated NYE 2027 sheet.',
    nyeHeading:
      cmp?.nyeHeading || 'New Year’s Eve 2027 in Bergamo & Brescia: All 6 Official Club Galas',
    nyeSubtitle:
      'Seated Gala Dinners, Singing Dinner Shows, and multi-room countdown festivals running until 05:00.',
    matrixHeading:
      cmp?.matrixHeading || 'A4 Corridor Comparison Matrix: Exits, Drive Time, Age & Music',
    matrixSubtitle:
      'Compare motorway exits, drive minutes from Milan, target age, and music format side by side.',
    matrixHeaders: {
      club: 'Club',
      city: 'City / Area',
      exit: 'A4 Highway Exit',
      minutes: 'From Milan',
      target: 'Target Age',
      format: 'Music & Format',
      nights: 'Active Nights & NYE',
    },
    guideMainHeading:
      cmp?.guideHeading || 'Complete Editorial Guide to Bergamo, Brescia & Franciacorta Nightlife',
    guideMainSubtitle:
      'Insider breakdown of rooms, sound systems, door policies, singing dinners, and A4 highway logistics.',
    mapHeading: 'Interactive Map: Bergamo, Franciacorta & Brescia Nightlife Corridor',
    mapSubtitle:
      'Fast motorway access via A4 exits Dalmine, Bergamo / BGY Airport, Seriate, Rovato, and Palazzolo.',
    faqHeading: cmp?.faqHeading || 'Frequently Asked Questions: Bergamo & Brescia Clubs & VIP Tables',
    openClubProfileLabel: 'Club Profile',
    openNyeSheetLabel: cmp?.nyeBadge || 'NYE 2027',
    uponRequestBadge: 'Upon request via WhatsApp',
    explorerLabels: {
      filterProvinceAll: 'All (6 Clubs)',
      filterBergamo: 'Bergamo (4 Clubs)',
      filterBrescia: 'Brescia & Franciacorta (2 Clubs)',
      filterClubAll: 'All 6 Clubs',
      filterFormatAll: 'All Events',
      filterFormatNye: `${cmp?.nyeBadge || 'NYE 2027'} (6)`,
      filterFormatWeekly: `${cmp?.weeklyBadge || 'Weekly Nights'} (13)`,
      filterFormatDated: `${cmp?.datedBadge || 'Dec Special Dates'} (8)`,
      liveCountPrefix: 'live upcoming events',
      nyeBadge: cmp?.nyeBadge || 'NYE 2027',
      weeklyBadge: cmp?.weeklyBadge || 'Active Weekly',
      datedBadge: cmp?.datedBadge || 'Dec 2026 Special',
      openEventCta: 'Details',
      bookWaCta: 'WhatsApp',
      emptyState: 'No active events match this filter. Select All 6 Clubs to view the full lineup.',
    },
    corridorRows: CORRIDOR_ROWS_EN,
    chapters: CHAPTERS_EN,
    faqs: FAQS_EN,
  };
}

export function getBergamoBresciaHomeLabels35(rawLocale: string): BergamoBresciaHomeLabels {
  const loc = (getLocaleDef(rawLocale)?.code || 'en') as LocaleCode;
  if (loc === 'it') {
    return {
      eyebrow: 'NUOVA SEZIONE · ASSE A4 ORIO BGY · BERGAMO (4 CLUB) · BRESCIA & FRANCIACORTA (2 CLUB)',
      heading: 'Bergamo & Brescia: Tutti i 6 Club, Serate Attive e Capodanno 2027',
      subtitle:
        'Setai Club, Capogiro, Tiky Klub e Zero Club a Bergamo + Qi Clubbing e Number One a Brescia (Franciacorta): esplora tutte le serate settimanali, i prefestivi di dicembre 2026 e i 6 veglioni ufficiali di Capodanno 2027 con prenotazione immediata Tavoli VIP su WhatsApp +39 351 912 7047.',
      hubCta: 'APRI SEZIONE BERGAMO & BRESCIA',
      waConciergeCta: 'TAVOLI VIP WHATSAPP',
      filterAll: 'Tutti (6 Club)',
      filterBergamo: 'Bergamo (4 Club)',
      filterBrescia: 'Brescia & Franciacorta (2)',
      clubsSubheading: 'I 6 Club Ufficiali di Bergamo e Brescia',
      nyeSubheading: 'Capodanno 2027: Tutti i 6 Veglioni Ufficiali (31 Dicembre)',
      activeSubheading: 'Tutte le Serate Attive (Settimanali & Date Speciali Dicembre 2026)',
      nyeBadge: 'Capodanno 2027',
      weeklyBadge: 'Settimanale Attiva',
      datedBadge: 'Speciale Dicembre',
      openClubCta: 'Scheda Club',
      openNyeCta: 'Capodanno 2027',
      openEventCta: 'Scopri Serata',
      bookWaCta: 'WhatsApp',
      liveEventsCountLabel: 'serate attive disponibili',
    };
  }

  const cmp = COMPACT_HUB_STRINGS[loc];
  return {
    eyebrow: 'A4 NIGHTLIFE CORRIDOR · BERGAMO (4 CLUBS) & BRESCIA FRANCIACORTA (2 CLUBS)',
    heading:
      cmp?.h1 || 'Bergamo & Brescia: All 6 Flagship Clubs, Active Nights & NYE 2027',
    subtitle:
      cmp?.lead ||
      'Setai Club, Capogiro, Tiky Klub & Zero Club in Bergamo + Qi Clubbing & Number One in Brescia (Franciacorta): browse every active weekly party, December 2026 special date, and all 6 official New Year’s Eve 2027 galas with direct WhatsApp VIP booking (+39 351 912 7047).',
    hubCta: cmp?.hubCta || 'EXPLORE BERGAMO & BRESCIA HUB',
    waConciergeCta: cmp?.bookWa || 'WHATSAPP VIP DESK',
    filterAll: 'All (6 Clubs)',
    filterBergamo: 'Bergamo (4 Clubs)',
    filterBrescia: 'Brescia & Franciacorta (2)',
    clubsSubheading: cmp?.clubsHeading || 'The 6 Flagship Clubs in Bergamo & Brescia',
    nyeSubheading: cmp?.nyeHeading || 'New Year’s Eve 2027: All 6 Official Club Galas (Dec 31)',
    activeSubheading:
      cmp?.explorerHeading || 'All Active Club Nights (Weekly & December 2026 Special Dates)',
    nyeBadge: cmp?.nyeBadge || 'NYE 2027',
    weeklyBadge: cmp?.weeklyBadge || 'Weekly Night',
    datedBadge: cmp?.datedBadge || 'Dec Special',
    openClubCta: 'Club Profile',
    openNyeCta: cmp?.nyeBadge || 'NYE 2027',
    openEventCta: 'View Event',
    bookWaCta: 'WhatsApp',
    liveEventsCountLabel: 'live events available',
  };
}
