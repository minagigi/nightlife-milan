import {
  enabledLocaleCodes,
  getLocaleDef,
  localePrefix,
  type LocaleCode,
} from '@/lib/i18n/localeRegistry';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { RAIN_LOCALES_30, type CompactRainPack } from '@/lib/just-singing-rain/locales30';
import {
  JUST_SINGING_EVENTBRITE_URLS,
  JUST_SINGING_RAIN_EXTRA_ASSET_KEYS,
  JUST_SINGING_RAIN_FLOW_ASSET_KEYS,
  JUST_SINGING_RAIN_POSTER_SRC,
  resolveConfiguredEventbriteUrl,
} from '@/lib/just-singing-rain/linksAndMedia';

export {
  JUST_SINGING_EVENTBRITE_URLS,
  JUST_SINGING_RAIN_EXTRA_ASSET_KEYS,
  JUST_SINGING_RAIN_FLOW_ASSET_KEYS,
  JUST_SINGING_RAIN_POSTER_SRC,
};

export const JUST_SINGING_RAIN_START_ISO = '2026-11-25T19:30:00+01:00';
export const JUST_SINGING_RAIN_END_ISO = '2026-11-26T05:00:00+01:00';
export const JUST_SINGING_RAIN_START_MS = Date.parse(JUST_SINGING_RAIN_START_ISO);
export const JUST_SINGING_RAIN_END_MS = Date.parse(JUST_SINGING_RAIN_END_ISO);

export function isJustSingingRainActive(nowMs: number = Date.now()): boolean {
  return nowMs < JUST_SINGING_RAIN_END_MS;
}

export const JUST_SINGING_RAIN_REPLACED_XCEED_ID = '249169';
export const JUST_SINGING_RAIN_REPLACED_XCEED_SLUG =
  'wednesday-night-justme-milano-2026-11-25';

export const JUST_SINGING_RAIN_VENUE = {
  id: 'v-justme',
  name: 'Just Me Milano',
  address: 'Viale Luigi Camoens 2, Parco Sempione (Torre Branca)',
  streetAddress: 'Viale Luigi Camoens 2',
  city: 'Milano',
  postalCode: '20121',
  country: 'IT',
  latitude: 45.4729624,
  longitude: 9.1735598,
  whatsapp: '+39 351 912 7047',
  whatsappHref: 'https://wa.me/393519127047',
} as const;

export function getJustSingingEventbriteUrl(locale: string): string | null {
  const def = getLocaleDef(locale);
  const code = def ? def.code : 'en';
  return resolveConfiguredEventbriteUrl(code);
}

export function getJustSingingWhatsappConfirmUrl(locale: string): string {
  const def = getLocaleDef(locale);
  const code = def ? def.code : 'en';
  const hasEb = Boolean(getJustSingingEventbriteUrl(code));
  const msgWithEb: Record<string, string> = {
    it: 'Ciao Nightlife Milan, ho fatto la registrazione Eventbrite per Just Singing in the Rain stasera (Mer 25 Nov) al Just Me Milano. Siamo in [N] persone, arrivo previsto ore [ORA], per [Aperitivo / Serata].',
    en: 'Hi Nightlife Milan, I registered on Eventbrite for Just Singing in the Rain tonight (Wed 25 Nov) at Just Me Milano. We are [N] guests, arriving at [TIME], for [Aperitivo / Club Night].',
    es: 'Hola Nightlife Milan, ya me registré en Eventbrite para Just Singing in the Rain esta noche (Mié 25 Nov) en Just Me Milano. Somos [N] personas, llegamos a las [HORA], para [Aperitivo / Fiesta].',
    de: 'Hallo Nightlife Milan, ich habe mich auf Eventbrite für Just Singing in the Rain heute Abend (Mi. 25. Nov) im Just Me Milano registriert. Wir sind [N] Personen, Ankunft um [UHRZEIT], für [Aperitivo / Clubnacht].',
    fr: 'Bonjour Nightlife Milan, je suis inscrit sur Eventbrite pour Just Singing in the Rain ce soir (Mer 25 Nov) au Just Me Milano. Nous sommes [N] personnes, arrivée prévue à [HEURE], pour [Aperitivo / Soirée Club].',
  };
  const msgDirectWa: Record<string, string> = {
    it: 'Ciao Nightlife Milan, vorrei accreditarmi per Just Singing in the Rain (Ingresso Gratis + Drink Offerto entro le 00:30) stasera Mer 25 Nov al Just Me Milano. Siamo in [N] persone, arrivo previsto ore [ORA], per [Aperitivo / Serata].',
    en: 'Hi Nightlife Milan, I would like to confirm Free Entry + Free Drink (before 00:30) for Just Singing in the Rain tonight (Wed 25 Nov) at Just Me Milano. We are [N] guests, arriving at [TIME], for [Aperitivo / Club Night].',
    es: 'Hola Nightlife Milan, quiero confirmar Entrada Gratis + Copa Gratis (antes de las 00:30) para Just Singing in the Rain esta noche (Mié 25 Nov) en Just Me Milano. Somos [N] personas, llegamos a las [HORA], para [Aperitivo / Fiesta].',
    de: 'Hallo Nightlife Milan, ich möchte Freien Eintritt + Gratis-Drink (vor 00:30 Uhr) für Just Singing in the Rain heute Abend (Mi. 25. Nov) im Just Me Milano bestätigen. Wir sind [N] Personen, Ankunft um [UHRZEIT], für [Aperitivo / Clubnacht].',
    fr: 'Bonjour Nightlife Milan, je souhaite confirmer l’Entrée Gratuite + Verre Offert (avant 00h30) pour Just Singing in the Rain ce soir (Mer 25 Nov) au Just Me Milano. Nous sommes [N] personnes, arrivée prévue à [HEURE], pour [Aperitivo / Soirée Club].',
  };
  const dict = hasEb ? msgWithEb : msgDirectWa;
  const text = dict[code] || dict.en;
  return `${JUST_SINGING_RAIN_VENUE.whatsappHref}?text=${encodeURIComponent(text)}`;
}

export function getJustSingingDinnerWhatsappUrl(locale: string): string {
  const def = getLocaleDef(locale);
  const code = def ? def.code : 'en';
  const msgByLang: Record<string, string> = {
    it: 'Ciao Nightlife Milan, vorrei informazioni per la cena su richiesta stasera (Mer 25 Nov · Just Singing in the Rain) al Just Me Milano. Siamo in [N] persone, orario indicativo [ORA].',
    en: 'Hi Nightlife Milan, I would like to request dinner tonight (Wed 25 Nov · Just Singing in the Rain) at Just Me Milano. Party of [N] guests, preferred time [TIME].',
    es: 'Hola Nightlife Milan, quisiera solicitar cena a petición esta noche (Mié 25 Nov · Just Singing in the Rain) en Just Me Milano. Somos [N] personas, hora [HORA].',
    de: 'Hallo Nightlife Milan, ich möchte heute Abend (Mi. 25. Nov · Just Singing in the Rain) ein Abendessen auf Anfrage im Just Me Milano anfragen. [N] Personen, Uhrzeit [UHRZEIT].',
    fr: 'Bonjour Nightlife Milan, je souhaite demander un dîner sur réservation ce soir (Mer 25 Nov · Just Singing in the Rain) au Just Me Milano. Groupe de [N] personnes, heure [HEURE].',
  };
  const text = msgByLang[code] || msgByLang.en;
  return `${JUST_SINGING_RAIN_VENUE.whatsappHref}?text=${encodeURIComponent(text)}`;
}

const FLAGSHIP_5: Record<'it' | 'en' | 'es' | 'de' | 'fr', CompactRainPack> = {
  it: {
    slug: 'just-singing-in-the-rain-ingresso-gratis-drink-offerto-justme-milano-25-novembre',
    offerPhrase: 'Ingresso Gratis + Drink Offerto',
    metaTitle: 'Just Singing in the Rain · Ingresso Gratis + Drink Offerto',
    metaDescription:
      'Mer 25 nov al Just Me Milano: Ingresso Gratis + Drink Offerto entro le 00:30 da Nightlife Milan (19:30-05:00). Eventbrite + WhatsApp +39 351 912 7047.',
    h1: 'Just Singing in the Rain · Ingresso Gratis + Drink Offerto al Just Me Milano',
    subtitle:
      'Ingresso Gratis + Drink Offerto fino alle 00:30 promosso e offerto da Nightlife Milan · Mercoledì 25 Novembre 2026 dalle 19:30 alle 05:00 · Aperitivo, Cena su richiesta via WhatsApp e Serata Commerciale, Hip Hop & R&B sotto la Torre Branca.',
    themeTag: 'Promosso e Offerto da Nightlife Milan · Parco Sempione · Torre Branca',
    dateBadge: 'Mercoledì 25 Novembre 2026 · 19:30 – 05:00',
    priceBadge: 'Ingresso Gratis fino alle 00:30 + 1 Drink Offerto · Cena su richiesta via WhatsApp',
    ageDressBadge: '18+ · Look curato da club (documento fisico obbligatorio)',
    homeLabel: 'Home',
    eventsLabel: 'Eventi Milano',
    specialLabel: 'Eventi Speciali',
    ctaEventbriteLabel: 'Registrati Gratis su Eventbrite',
    ctaWhatsappLabel: 'Conferma su WhatsApp +39 351 912 7047',
    ctaDinnerWhatsappLabel: 'Cena su Richiesta via WhatsApp',
    tocTitle: 'Guida Completa alla Serata · Just Singing in the Rain',
    tocLabels: [
      '1. Pioggia fuori, festa al caldo dentro: lo spirito della serata',
      '2. Come entrare gratis entro le 00:30 (Eventbrite + WhatsApp)',
      '3. Aperitivo dalle 19:30, Cena su richiesta e Serata fino alle 05:00',
      '4. Scaletta oraria di Mercoledì 25 Novembre 2026',
      '5. Età minima 18+ e consigli di stile per una sera di pioggia',
      '6. Come arrivare asciutti al Just Me Milano in Parco Sempione',
      '7. Domande frequenti (12 risposte rapide)',
    ],
    quickFacts: [
      { label: 'Data e Orario', value: 'Mercoledì 25 Novembre 2026 · 19:30 – 05:00' },
      { label: 'Locale', value: 'Just Me Milano · Viale Luigi Camoens 2 (Parco Sempione)' },
      { label: 'Formula Speciale', value: 'Ingresso Gratis fino alle 00:30 + 1 Drink Offerto da Nightlife Milan' },
      { label: 'Selezione Musicale', value: 'Commerciale · Hip Hop · R&B (il suono del Just Me)' },
      { label: 'Ristorante', value: 'Cena su richiesta via WhatsApp (+39 351 912 7047)' },
      { label: 'Ingresso e Contatto', value: '18+ · Eventbrite + conferma WhatsApp +39 351 912 7047' },
    ],
    overviewHeading: 'Pioggia su tutta Milano, cupola riscaldata sotto la Torre Branca: stasera si brinda insieme',
    overviewParagraphs: [
      'Ingresso Gratis + Drink Offerto fino alle 00:30 promosso e offerto da Nightlife Milan: dopo giorni interi di nuvole basse, ombrelli rovesciati dal vento e pozzanghere lungo i bastioni, mercoledì 25 novembre 2026 prendiamo con ironia la settimana più bagnata dell’autunno milanese e la trasformiamo nella festa più calda della città dentro il Just Me Milano, ai piedi della Torre Branca in Parco Sempione.',
      'Il richiamo gioca con il gusto cinematografico dei grandi classici hollywoodiani fatti di impermeabili eleganti, lampioni riflessi sull’asfalto lucido e voglia di ballare anche quando il meteo non collabora. Varcata la soglia coperta di Viale Luigi Camoens 2 chiudi l’ombrello al guardaroba ed entri nella celebre struttura in vetro e acciaio completamente chiusa e climatizzata: sopra la testa vedi le gocce scorrere sul cristallo illuminato e la sagoma della Torre Branca nella nebbia, mentre in sala ti accoglie il calore del club.',
      'Per ringraziare la community che vive le notti milanesi anche a metà settimana, Nightlife Milan promuove e offre direttamente l’ospitalità di questa serata speciale: tutti gli ospiti registrati entrano gratuitamente entro le ore 00:30 e ricevono un drink offerto da Nightlife Milan. Si parte già alle 19:30 con l’aperitivo serale, ideale per staccare dall’ufficio o ritrovarsi con gli amici senza fare tardi, e si prosegue senza interruzioni nella serata club fino alle 05:00 del mattino.',
      'In console risuona la colonna sonora identitaria del Just Me Milano: un intreccio curato di musica Commerciale, Hip Hop e R&B pensato per accompagnare prima il brindisi dell’aperitivo e poi accendere la pista centrale fino a notte fonda. Chi desidera cenare comodamente seduto prima della festa può richiedere la cena su richiesta via WhatsApp scrivendo al concierge ufficiale Nightlife Milan, che coordina gli arrivi di coppie, gruppi di amici e clientela internazionale.',
      'L’accredito è trasparente, immediato e senza alcun pagamento sul sito né commissioni: bastano la registrazione gratuita su Eventbrite e un rapido messaggio di conferma su WhatsApp al +39 351 912 7047 indicando in quanti siete, a che ora pensate di arrivare e se preferite l’aperitivo dalle 19:30 oppure l’ingresso in serata entro le 00:30.',
    ],
    timelineHeading: 'Scaletta Oraria · Mercoledì 25 Novembre 2026 (19:30 – 05:00)',
    timelineSubheading: 'Dall’aperitivo delle 19:30 sotto la cupola di vetro fino alla chiusura delle 05:00',
    timelineSteps: [
      {
        time: '19:30',
        title: 'Apertura Porte, Aperitivo al Caldo e Drink Offerto da Nightlife Milan',
        detail:
          'Accoglienza all’ingresso coperto di Viale Luigi Camoens 2 per gli ospiti accreditati su Eventbrite e confermati via WhatsApp: ingresso gratuito e drink offerto da Nightlife Milan nella cupola riscaldata del Just Me Milano.',
      },
      {
        time: '20:30',
        title: 'Cena su Richiesta via WhatsApp',
        detail:
          'Per chi vuole vivere il mercoledì sera a tavola prima che inizi il clubbing, la cena è disponibile su richiesta via WhatsApp al +39 351 912 7047 con assistenza diretta del concierge.',
      },
      {
        time: '22:30',
        title: 'Cambio di Ritmo in Pista · Commerciale, Hip Hop & R&B',
        detail:
          'Le luci si abbassano sotto la volta vetrata e prende quota il sound distintivo del Just Me Milano tra hit Commerciali, Hip Hop e R&B.',
      },
      {
        time: '00:30',
        title: 'Termine dell’Ingresso Gratuito con Drink Offerto',
        detail:
          'Le ore 00:30 segnano il limite orario entro cui varcare l’ingresso per usufruire dell’ingresso gratuito e del drink offerto da Nightlife Milan: ti consigliamo di arrivare con qualche minuto di anticipo.',
      },
      {
        time: '00:30 – 05:00',
        title: 'Cuore della Notte sotto la Torre Branca fino alle 05:00',
        detail:
          'La pista prosegue a pieno regime fino alle cinque del mattino di giovedì 26 novembre mentre fuori continua a piovere sul Parco Sempione.',
      },
    ],
    formatsHeading: 'Aperitivo, Cena su Richiesta e Serata Club: tre modi di viverla',
    formatsSubheading: 'Un unico invito promosso da Nightlife Milan per scegliere il tuo orario preferito',
    formats: [
      {
        id: 'aperitivo',
        badge: 'Dalle 19:30',
        title: 'Aperitivo · Ingresso Gratis + Drink Offerto',
        timing: '19:30 – 22:30 (ingresso omaggio valido fino alle 00:30)',
        summary:
          'Il modo migliore per dribblare il traffico sotto l’acqua dopo il lavoro: entri dalle 19:30 nella veranda riscaldata del Just Me Milano, ritiri il tuo drink offerto da Nightlife Milan e ti godi l’aperitivo e il proseguimento della serata senza costi d’ingresso.',
        bullets: [
          'Ingresso gratuito entrando entro le 00:30',
          '1 drink offerto da Nightlife Milan incluso nell’accredito',
          'Permanenza libera in sala anche per tutta la serata club',
          'Registrazione gratuita su Eventbrite + conferma WhatsApp',
        ],
        ctaKind: 'eventbrite',
        ctaLabel: 'Registrati per l’Aperitivo su Eventbrite',
      },
      {
        id: 'cena',
        badge: 'Su Richiesta',
        title: 'Cena su Richiesta via WhatsApp',
        timing: 'Fascia serale su prenotazione diretta',
        summary:
          'Vuoi cenare al coperto con il tuo gruppo prima che la pista entri nel vivo? La cena per Just Singing in the Rain è gestita esclusivamente su richiesta via WhatsApp direttamente con il concierge Nightlife Milan.',
        bullets: [
          'Cena su richiesta via WhatsApp al +39 351 912 7047',
          'Risposta rapida dal desk Nightlife Milan con disponibilità reale',
          'Ambiente interno chiuso e riscaldato sotto la Torre Branca',
          'Proseguimento diretto nella serata Commerciale, Hip Hop e R&B',
        ],
        ctaKind: 'whatsapp',
        ctaLabel: 'Richiedi la Cena su WhatsApp',
      },
      {
        id: 'serata',
        badge: 'Fino alle 05:00',
        title: 'Serata Discoteca · Commerciale, Hip Hop & R&B',
        timing: '22:30 – 05:00 (ingresso gratis + drink entro le 00:30)',
        summary:
          'Se preferisci uscire direttamente per ballare, presentati all’ingresso entro le 00:30 con registrazione Eventbrite e conferma WhatsApp: entri gratis, ricevi il drink offerto da Nightlife Milan e balli fino alle 05:00.',
        bullets: [
          'Ingresso gratuito fino alle 00:30 + 1 drink offerto',
          'Selezione musicale Commerciale, Hip Hop e R&B',
          'Pubblico 18+ internazionale e universitario selezionato',
          'Zero pagamenti online o commissioni aggiuntive',
        ],
        ctaKind: 'eventbrite',
        ctaLabel: 'Registrati per la Serata su Eventbrite',
      },
    ],
    howToHeading: 'Come Avere Ingresso Gratis + Drink Offerto (2 Passaggi Obbligatori)',
    howToSubheading: 'Nessun pagamento sul sito: accredito gratuito Eventbrite + messaggio di conferma WhatsApp',
    howToSteps: [
      {
        stepNumber: '01',
        title: 'Passo 1 · Registrati gratuitamente su Eventbrite',
        detail:
          'Clicca sul pulsante ufficiale Eventbrite di questa pagina e completa in trenta secondi la tua registrazione gratuita per Just Singing in the Rain di mercoledì 25 novembre 2026 al Just Me Milano.',
        ctaKind: 'eventbrite',
        ctaLabel: 'Vai alla Registrazione Eventbrite',
      },
      {
        stepNumber: '02',
        title: 'Passo 2 · Scrivici su WhatsApp al +39 351 912 7047 per confermare',
        detail:
          'Dopo esserti registrato su Eventbrite, invia un messaggio WhatsApp al +39 351 912 7047 indicando tre dati essenziali: in quanti siete, a che ora arrivate e se venite per l’aperitivo (dalle 19:30) o per la serata (entro le 00:30), oppure se desiderate informazioni per la cena su richiesta.',
        ctaKind: 'whatsapp',
        ctaLabel: 'Invia Conferma su WhatsApp',
      },
    ],
    whatsappTemplateNote:
      'Cosa scrivere su WhatsApp (+39 351 912 7047): nome di riferimento, numero totale di persone, orario previsto di arrivo (entro le 00:30 per l’ingresso gratuito + drink offerto) e scelta tra aperitivo, cena su richiesta o serata.',
    dressLogisticsHeading: 'Ingresso 18+, Stile Consigliato sotto la Pioggia e Come Arrivare',
    dressLogisticsSubheading: 'Documento fisico originale per maggiorenni (18+) e outfit curato adatto al Just Me Milano',
    dressCodeOkTitle: 'Cosa indossare (Consigliato)',
    dressCodeOkItems: [
      'Camicia, blazer o maglieria curata con pantalone lungo e scarpa pulita da sera',
      'Abito cocktail, completo elegante o trench/impermeabile da lasciare comodamente al guardaroba interno',
      'Stivaletti in pelle o calzature eleganti adatte sia alla pioggia esterna sia alla selezione del club',
      'Documento d’identità fisico originale in corso di validità (ingresso riservato 18+)',
    ],
    dressCodeNoTitle: 'Cosa evitare alla porta',
    dressCodeNoItems: [
      'Tute sportive, pantaloncini corti, canotte o maglie da calcio',
      'Ciabatte, abbigliamento tecnico da palestra o zaini ingombranti',
      'Minori di 18 anni o semplici fotografie del documento sullo smartphone',
      'Arrivo oltre le 00:30 pretendendo la formula ingresso gratuito + drink offerto',
    ],
    logisticsHeading: 'Come Arrivare Asciutti a Viale Luigi Camoens 2 (Parco Sempione)',
    logisticsParagraphs: [
      'Il Just Me Milano si trova in Viale Luigi Camoens 2 (20121 Milano), esattamente sotto i tralicci illuminati della Torre Branca sul lato Triennale del Parco Sempione. A differenza dei cortili estivi all’aperto, l’intero padiglione in vetro e acciaio è chiuso ermeticamente e riscaldato durante tutto l’autunno e l’inverno: una volta entrati non ci sono passaggi scoperti sotto la pioggia.',
      'Chi si muove con i mezzi pubblici può scendere alla fermata Cadorna FN (linee metropolitane M1 Rossa e M2 Verde più passante ferroviario, circa 6 minuti a piedi lungo il viale asfaltato accanto alla Triennale) oppure a Lanza Brera (linea M2 Verde, 7 minuti a piedi). In una sera di pioggia battente il taxi resta comodissimo: chiedendo Viale Luigi Camoens 2 si scende proprio davanti alla pensilina d’ingresso del locale.',
    ],
    logisticsFacts: [
      { label: 'Indirizzo Esatto', value: 'Just Me Milano · Viale Luigi Camoens 2, 20121 Milano' },
      { label: 'Orari Ufficiali', value: 'Mercoledì 25 Novembre 2026 · dalle 19:30 alle 05:00' },
      { label: 'Ospitalità Nightlife Milan', value: 'Ingresso Gratis fino alle 00:30 + 1 Drink Offerto' },
      { label: 'Cena', value: 'Cena su richiesta via WhatsApp (+39 351 912 7047)' },
      { label: 'Metro più Vicine', value: 'Cadorna FN (M1/M2, 6 min) · Lanza Brera (M2, 7 min)' },
      { label: 'Età Minima', value: '18+ con documento fisico originale valido' },
    ],
    mapHeading: 'Mappa Interattiva · Just Me Milano sotto la Torre Branca',
    mapLabels: {
      loadMap: 'Carica Mappa di Just Me Milano (Viale Camoens 2)',
      mapTitle: 'Posizione GPS Just Me Milano · Parco Sempione',
      privacyLoadNotice: 'Per tutelare la tua privacy la mappa Google viene caricata solo al tuo clic.',
    },
    heroLabels: [
      'Ospiti con ombrelli eleganti sotto la Torre Branca illuminata all’ingresso del Just Me Milano',
      'Aperitivo dalle 19:30 nella cupola in vetro riscaldata con drink offerto da Nightlife Milan',
      'Atmosfera conviviale e tavoli per la cena su richiesta al riparo dalla pioggia in Parco Sempione',
      'Pista Commerciale, Hip Hop e R&B accesa fino alle 05:00 al Just Me Milano',
    ],
    venueBannerEyebrow: 'Just Me Milano · Parco Sempione',
    venueBannerTitle: 'Scopri la Scheda Completa del Just Me Milano',
    venueBannerDesc: 'Storia del padiglione sotto la Torre Branca, regole di selezione e calendario completo delle serate.',
    venueCta: 'Scheda Locale',
    thanksgivingBannerEyebrow: 'Giovedì 26 Novembre 2026 · Domani Sera',
    thanksgivingBannerTitle: 'Happy Thanksgiving al Just Me Milano',
    thanksgivingBannerDesc: 'Scopri il programma di giovedì 26 novembre sotto la Torre Branca.',
    thanksgivingBannerCta: 'Vedi 26 Nov',
    partenopeaBannerEyebrow: 'Venerdì 27 Novembre 2026 · Just Me Milano',
    partenopeaBannerTitle: 'Cena Spettacolo Partenopea al Just Me',
    partenopeaBannerDesc: 'Live dinner show e party del venerdì sera al Just Me Milano.',
    partenopeaBannerCta: 'Vedi 27 Nov',
    dec31BannerEyebrow: '31 Dicembre 2026 · Capodanno',
    dec31BannerTitle: 'Capodanno al Just Me Milano',
    dec31BannerDesc: 'Scopri il Gran Galà di San Silvestro ai piedi della Torre Branca.',
    dec31BannerCta: 'Vedi 31 Dic',
    faqHeading: 'Domande Frequenti · Just Singing in the Rain (25 Novembre 2026)',
    faqs: [
      {
        q: 'Cosa comprende esattamente la formula Just Singing in the Rain di mercoledì 25 novembre?',
        a: 'Comprende l’ingresso gratuito fino alle ore 00:30 più 1 drink offerto da Nightlife Milan presso il Just Me Milano (Viale Luigi Camoens 2, Parco Sempione) nella serata di mercoledì 25 novembre 2026.',
      },
      {
        q: 'Come faccio ad avere l’ingresso gratis e il drink offerto?',
        a: 'Devi completare due passaggi gratuiti: prima registrarti su Eventbrite tramite il pulsante presente in pagina e poi inviare un messaggio WhatsApp al +39 351 912 7047 indicando quanti siete, l’orario di arrivo e se venite per aperitivo o per la serata.',
      },
      {
        q: 'Fino a che ora vale l’ingresso gratuito con drink offerto?',
        a: 'L’ingresso gratuito con drink offerto da Nightlife Milan è valido entrando entro le ore 00:30. Ti suggeriamo di presentarti all’ingresso con un po’ di anticipo per agevolare il controllo accrediti.',
      },
      {
        q: 'A che ora inizia l’aperitivo e fino a che ora dura la serata?',
        a: 'Le porte aprono alle ore 19:30 con l’aperitivo serale e la festa prosegue senza interruzioni fino alle ore 05:00 di giovedì 26 novembre 2026.',
      },
      {
        q: 'È possibile cenare al Just Me Milano durante la serata?',
        a: 'Sì, la cena è disponibile su richiesta via WhatsApp scrivendo direttamente al concierge Nightlife Milan al numero +39 351 912 7047.',
      },
      {
        q: 'Che genere di musica si balla mercoledì 25 novembre?',
        a: 'In sala suona la selezione musicale distintiva del Just Me Milano: Commerciale, Hip Hop e R&B.',
      },
      {
        q: 'Qual è l’età minima per entrare a Just Singing in the Rain?',
        a: 'L’evento è riservato ai maggiorenni 18+ muniti di documento d’identità fisico originale in corso di validità (carta d’identità, passaporto o patente).',
      },
      {
        q: 'Se piove forte il locale è al coperto e riscaldato?',
        a: 'Assolutamente sì: la cupola in vetro e acciaio del Just Me Milano sotto la Torre Branca è completamente chiusa, climatizzata e dotata di guardaroba interno per cappotti e ombrelli.',
      },
      {
        q: 'Devo pagare qualcosa online sul sito o ci sono commissioni?',
        a: 'No. Per questo evento non esiste alcun checkout a pagamento né alcuna maggiorazione: sia la registrazione Eventbrite sia la conferma via WhatsApp sono completamente gratuite.',
      },
      {
        q: 'Chi entra per l’aperitivo alle 19:30 può fermarsi anche a ballare dopo?',
        a: 'Sì, chi entra dall’apertura delle 19:30 per l’aperitivo può trattenersi liberamente all’interno del locale per tutta la serata fino alle 05:00.',
      },
      {
        q: 'Cosa devo scrivere nel messaggio WhatsApp al +39 351 912 7047?',
        a: 'Scrivi il nome con cui ti sei registrato su Eventbrite, il numero esatto di partecipanti, l’orario indicativo di arrivo e se parteciperete all’aperitivo, alla cena su richiesta o alla serata club.',
      },
      {
        q: 'Dove si trova esattamente il Just Me Milano e come ci arrivo?',
        a: 'Si trova in Viale Luigi Camoens 2, 20121 Milano, a fianco della Triennale e sotto la Torre Branca nel Parco Sempione, a 6 minuti a piedi dalla metro Cadorna FN (M1/M2) e a 7 minuti da Lanza (M2).',
      },
    ],
  },
  en: {
    slug: 'just-singing-in-the-rain-free-entry-free-drink-justme-milan-nov-25',
    offerPhrase: 'Free Entry + Free Drink',
    metaTitle: 'Just Singing in the Rain · Free Entry + Free Drink',
    metaDescription:
      'Wed 25 Nov at Just Me Milano: Free Entry + Free Drink until 00:30 courtesy of Nightlife Milan (19:30-05:00). Eventbrite + WhatsApp +39 351 912 7047.',
    h1: 'Just Singing in the Rain · Free Entry + Free Drink at Just Me Milano',
    subtitle:
      'Free Entry + Free Drink until 00:30 promoted and hosted by Nightlife Milan · Wednesday, November 25, 2026 from 19:30 to 05:00 · Aperitivo, Dinner on request via WhatsApp & Commercial, Hip Hop and R&B Club Night beneath Torre Branca.',
    themeTag: 'Promoted & Hosted by Nightlife Milan · Parco Sempione · Torre Branca',
    dateBadge: 'Wednesday, 25 Nov 2026 · 19:30 – 05:00',
    priceBadge: 'Free Entry until 00:30 + 1 Complimentary Drink · Dinner on request via WhatsApp',
    ageDressBadge: '18+ · Smart club attire (physical photo ID required)',
    homeLabel: 'Home',
    eventsLabel: 'Milan Events',
    specialLabel: 'Special Events',
    ctaEventbriteLabel: 'Register Free on Eventbrite',
    ctaWhatsappLabel: 'Confirm via WhatsApp +39 351 912 7047',
    ctaDinnerWhatsappLabel: 'Request Dinner via WhatsApp',
    tocTitle: 'Complete Night Guide · Just Singing in the Rain',
    tocLabels: [
      '1. Rainy Milan outside, heated glass dome inside: the Wednesday concept',
      '2. How to claim Free Entry + Free Drink before 00:30 (2 steps)',
      '3. 19:30 Aperitivo, Dinner on Request & Club Night until 05:00',
      '4. Full Schedule for Wednesday, November 25, 2026',
      '5. 18+ Door Policy & Rainy-Night Outfit Tips',
      '6. Getting to Just Me Milano Dry (Metro & Taxi)',
      '7. Frequently Asked Questions (12 quick answers)',
    ],
    quickFacts: [
      { label: 'Date & Hours', value: 'Wednesday, November 25, 2026 · 19:30 – 05:00' },
      { label: 'Venue', value: 'Just Me Milano · Viale Luigi Camoens 2 (Parco Sempione)' },
      { label: 'Special Hospitality', value: 'Free Entry until 00:30 + 1 Free Drink by Nightlife Milan' },
      { label: 'Music Policy', value: 'Commercial · Hip Hop · R&B (the signature Just Me sound)' },
      { label: 'Restaurant', value: 'Dinner on request via WhatsApp (+39 351 912 7047)' },
      { label: 'Age & Access', value: '18+ · Free Eventbrite + WhatsApp +39 351 912 7047' },
    ],
    overviewHeading: 'A week of Milanese rain turned into a warm midweek celebration under Torre Branca',
    overviewParagraphs: [
      'Free Entry + Free Drink until 00:30 promoted and offered by Nightlife Milan: after days of relentless November rain across Milan, upturned umbrellas along Corso Sempione, and neon reflections shimmering on wet cobblestones, Wednesday, November 25, 2026 turns bad weather into the best excuse to go out inside Just Me Milano beneath Torre Branca.',
      'Playfully inspired by the timeless silver-screen mood of umbrellas, glowing streetlamps, and dancing away a downpour, Just Singing in the Rain invites locals, international residents, university students, and midweek visitors to fold their umbrellas at the covered doors of Viale Luigi Camoens 2 and step inside Just Me Milano’s enclosed, climate-controlled glass pavilion from 19:30 right through to 05:00.',
      'Promoted and offered directly by Nightlife Milan, tonight’s hospitality grants every accredited guest free admission before 00:30 together with one complimentary drink courtesy of Nightlife Milan. Doors open at 19:30 for the Milanese aperitivo beneath the glass vault while raindrops streak down the lit steel arches overhead, then build seamlessly into a full club night until five in the morning.',
      'On the decks, resident DJs deliver the unmistakable Just Me Milano soundtrack: high-energy Commercial hits, Hip Hop, and R&B tailored first for early-evening drinks and conversation, then turned all the way up for the late-night dancefloor. Guests who want to sit down with friends for a full meal indoors can arrange dinner on request via WhatsApp directly with the Nightlife Milan concierge desk.',
      'There is no online checkout, no ticket fee, and zero markup on this event: claiming your free entry before 00:30 and complimentary drink simply requires two quick steps: register free on Eventbrite, then send a short WhatsApp confirmation to +39 351 912 7047 letting us know how many guests are in your group, what time you plan to arrive, and whether you are joining for aperitivo or the club night.',
    ],
    timelineHeading: 'Evening Schedule · Wednesday, November 25, 2026 (19:30 – 05:00)',
    timelineSubheading: 'From 19:30 aperitivo in the heated glass dome to 05:00 closing time',
    timelineSteps: [
      {
        time: '19:30',
        title: 'Doors Open, Heated Dome Aperitivo & Complimentary Drink',
        detail:
          'Check in at Viale Luigi Camoens 2 with your Eventbrite registration and WhatsApp confirmation to enjoy free entry and 1 free drink courtesy of Nightlife Milan.',
      },
      {
        time: '20:30',
        title: 'Dinner on Request via WhatsApp',
        detail:
          'Indoor dinner seating available upon prior request via WhatsApp at +39 351 912 7047 with the Nightlife Milan concierge team.',
      },
      {
        time: '22:30',
        title: 'Club Takeover · Commercial, Hip Hop & R&B',
        detail:
          'Club lighting and sound take center stage beneath Torre Branca with Just Me Milano’s signature Commercial, Hip Hop, and R&B rotation.',
      },
      {
        time: '00:30',
        title: 'Cut-Off for Free Entry + Complimentary Drink',
        detail:
          '00:30 is the door cut-off to redeem free admission and the complimentary drink offered by Nightlife Milan, so arrive a little earlier for smooth check-in.',
      },
      {
        time: '00:30 – 05:00',
        title: 'Late-Night Dancefloor until 05:00',
        detail:
          'Dance warm and dry inside Parco Sempione’s glass landmark until 05:00 on Thursday morning.',
      },
    ],
    formatsHeading: 'Aperitivo, Dinner on Request & Club Night: Three Ways to Join',
    formatsSubheading: 'Choose your arrival window with one seamless Nightlife Milan invitation',
    formats: [
      {
        id: 'aperitivo',
        badge: 'From 19:30',
        title: 'Aperitivo · Free Entry + Free Drink',
        timing: '19:30 – 22:30 (free entry valid until 00:30)',
        summary:
          'Skip the rainy commute and head straight into the warm glass pavilion from 19:30: enjoy Milanese aperitivo vibes, claim your complimentary drink from Nightlife Milan, and stay on for the party at zero extra cost.',
        bullets: [
          'Free admission when entering before 00:30',
          '1 complimentary drink offered by Nightlife Milan',
          'Full access to stay inside for the club night until 05:00',
          'Free Eventbrite registration + WhatsApp confirmation',
        ],
        ctaKind: 'eventbrite',
        ctaLabel: 'Register Free for Aperitivo on Eventbrite',
      },
      {
        id: 'cena',
        badge: 'On Request',
        title: 'Dinner on Request via WhatsApp',
        timing: 'Evening seating arranged directly with Concierge',
        summary:
          'Looking for a seated dinner under the glass dome with your group before the dancefloor heats up? Dinner tonight is available on request via WhatsApp with direct concierge assistance.',
        bullets: [
          'Dinner on request via WhatsApp at +39 351 912 7047',
          'Fast live coordination by the Nightlife Milan desk',
          'Enclosed, climate-controlled indoor setting under Torre Branca',
          'Seamless transition into the Commercial, Hip Hop & R&B party',
        ],
        ctaKind: 'whatsapp',
        ctaLabel: 'Request Dinner via WhatsApp',
      },
      {
        id: 'serata',
        badge: 'Until 05:00',
        title: 'Club Night · Commercial, Hip Hop & R&B',
        timing: '22:30 – 05:00 (free entry + free drink until 00:30)',
        summary:
          'Coming strictly to dance? Arrive before 00:30 with your free Eventbrite pass and WhatsApp confirmation to walk in free, collect your complimentary drink, and party until 05:00.',
        bullets: [
          'Free entry until 00:30 + 1 free drink courtesy of Nightlife Milan',
          'Signature Commercial, Hip Hop & R&B club soundtrack',
          'Curated 18+ international and Milanese crowd',
          'Zero online ticket fees or surcharges',
        ],
        ctaKind: 'eventbrite',
        ctaLabel: 'Register Free for Club Night on Eventbrite',
      },
    ],
    howToHeading: 'How to Get Free Entry + Free Drink Before 00:30 (2 Mandatory Steps)',
    howToSubheading: 'No payment required: free Eventbrite pass + quick WhatsApp confirmation',
    howToSteps: [
      {
        stepNumber: '01',
        title: 'Step 1 · Register for free on Eventbrite',
        detail:
          'Click the official Eventbrite button on this page and grab your free registration for Just Singing in the Rain on Wednesday, November 25, 2026 at Just Me Milano.',
        ctaKind: 'eventbrite',
        ctaLabel: 'Open Free Eventbrite Registration',
      },
      {
        stepNumber: '02',
        title: 'Step 2 · Confirm on WhatsApp at +39 351 912 7047',
        detail:
          'Right after registering on Eventbrite, message the Nightlife Milan concierge on WhatsApp (+39 351 912 7047) with three details: how many people are in your group, your expected arrival time, and whether you are coming for aperitivo or the club night (or inquiring about dinner on request).',
        ctaKind: 'whatsapp',
        ctaLabel: 'Send WhatsApp Confirmation',
      },
    ],
    whatsappTemplateNote:
      'What to include in your WhatsApp message to +39 351 912 7047: your name, exact number of guests, expected arrival time (before 00:30 for free entry + free drink), and whether you choose aperitivo, dinner on request, or club night.',
    dressLogisticsHeading: '18+ Age Policy, Rain-Ready Smart Attire & Getting There',
    dressLogisticsSubheading: 'Original physical photo ID (18+) and smart evening wear suited to Just Me Milano',
    dressCodeOkTitle: 'What to Wear (Recommended)',
    dressCodeOkItems: [
      'Collared shirt, blazer, or refined knitwear paired with tailored trousers and clean evening shoes',
      'Cocktail dress, chic evening separates, or a trench/raincoat checked easily at the indoor cloakroom',
      'Polished leather boots or smart footwear practical for wet streets and sharp for club entry',
      'Valid physical photo ID: passport, national ID card, or driving license (strictly 18+)',
    ],
    dressCodeNoTitle: 'Not Permitted at the Door',
    dressCodeNoItems: [
      'Tracksuits, athletic shorts, hoodies, or sports team jerseys',
      'Flip-flops, gym wear, or bulky travel backpacks',
      'Under-18 visitors or phone screenshots instead of a physical ID',
      'Arrivals after 00:30 expecting the free entry + free drink hospitality',
    ],
    logisticsHeading: 'Reaching Viale Luigi Camoens 2 Dry on a Rainy Night',
    logisticsParagraphs: [
      'Just Me Milano sits at Viale Luigi Camoens 2 (20121 Milan) right beneath the illuminated lattice of Torre Branca next to Triennale Milano in Parco Sempione. Throughout November, the glass-and-steel structure operates completely enclosed and heated, with an indoor cloakroom right past reception so umbrellas and coats are stored immediately.',
      'By public transit, ride Metro M1 Red or M2 Green to Cadorna FN (a 6-minute paved walk past Triennale) or M2 Green to Lanza Brera (7 minutes). When it is pouring rain, taxis and ride-hailing cars can pull right up to Viale Luigi Camoens 2 steps from the covered entrance.',
    ],
    logisticsFacts: [
      { label: 'Exact Address', value: 'Just Me Milano · Viale Luigi Camoens 2, 20121 Milano' },
      { label: 'Event Hours', value: 'Wednesday, 25 November 2026 · 19:30 – 05:00' },
      { label: 'Nightlife Milan Offer', value: 'Free Entry until 00:30 + 1 Free Drink' },
      { label: 'Dinner Option', value: 'Dinner on request via WhatsApp (+39 351 912 7047)' },
      { label: 'Nearest Metro', value: 'Cadorna FN (M1/M2, 6 min) · Lanza Brera (M2, 7 min)' },
      { label: 'Minimum Age', value: '18+ with original physical photo ID' },
    ],
    mapHeading: 'Interactive GPS Map · Just Me Milano (Torre Branca)',
    mapLabels: {
      loadMap: 'Load Just Me Milano Map (Viale Camoens 2)',
      mapTitle: 'Interactive Map of Just Me Milano · Parco Sempione',
      privacyLoadNotice: 'To protect your privacy, Google Maps loads only when you click.',
    },
    heroLabels: [
      'Guests arriving with umbrellas beneath illuminated Torre Branca at Just Me Milano',
      '19:30 aperitivo inside the heated glass dome with complimentary drink by Nightlife Milan',
      'Warm indoor atmosphere and dinner-on-request tables sheltered from the Milan rain',
      'Commercial, Hip Hop and R&B dancefloor in full swing until 05:00 at Just Me Milano',
    ],
    venueBannerEyebrow: 'Just Me Milano · Parco Sempione',
    venueBannerTitle: 'Explore the Full Just Me Milano Club Guide',
    venueBannerDesc: 'Glass dome architecture under Torre Branca, door policy, and weekly schedule.',
    venueCta: 'View Club Guide',
    thanksgivingBannerEyebrow: 'Thursday, 26 Nov 2026 · Tomorrow Night',
    thanksgivingBannerTitle: 'Happy Thanksgiving at Just Me Milano',
    thanksgivingBannerDesc: 'Also in Milan Thursday night? Check out Nov 26 at Just Me Milano.',
    thanksgivingBannerCta: 'See 26 Nov',
    partenopeaBannerEyebrow: 'Friday, 27 Nov 2026 · Just Me Milano',
    partenopeaBannerTitle: 'Cena Spettacolo Partenopea at Just Me',
    partenopeaBannerDesc: 'Live Italian dinner show and Friday club night on November 27.',
    partenopeaBannerCta: 'See 27 Nov',
    dec31BannerEyebrow: '31 December 2026 · New Year’s Eve',
    dec31BannerTitle: 'New Year’s Eve at Just Me Milano',
    dec31BannerDesc: 'Discover the official December 31st celebration beneath Torre Branca.',
    dec31BannerCta: 'See 31 Dec',
    faqHeading: 'Frequently Asked Questions · Just Singing in the Rain (Nov 25, 2026)',
    faqs: [
      {
        q: 'What is included in the Just Singing in the Rain offer on Wednesday, November 25?',
        a: 'Every accredited guest receives free entry until 00:30 plus 1 complimentary drink promoted and offered by Nightlife Milan at Just Me Milano on Wednesday, November 25, 2026.',
      },
      {
        q: 'How do I claim free entry and the complimentary drink?',
        a: 'Complete two quick steps: register for free on Eventbrite via the button on this page, then message +39 351 912 7047 on WhatsApp stating how many people are in your group, your arrival time, and whether you are joining for aperitivo or the club night.',
      },
      {
        q: 'What is the latest time to enter for free?',
        a: 'Free admission with the complimentary drink courtesy of Nightlife Milan applies to entries completed before 00:30. Arriving 15–20 minutes before 00:30 is recommended.',
      },
      {
        q: 'What time does the event start and finish?',
        a: 'Doors open at 19:30 for aperitivo, and the club night runs continuously until 05:00 on Thursday, November 26, 2026.',
      },
      {
        q: 'Can we book dinner at Just Me Milano tonight?',
        a: 'Yes. Dinner is available on request via WhatsApp by messaging the Nightlife Milan concierge directly at +39 351 912 7047.',
      },
      {
        q: 'What music is played during Just Singing in the Rain?',
        a: 'Expect the signature Just Me Milano sound all night: Commercial hits, Hip Hop, and R&B.',
      },
      {
        q: 'What is the minimum age to enter?',
        a: 'Entry is strictly 18+ with an original, valid physical photo ID (passport, national ID card, or driver’s license).',
      },
      {
        q: 'Is the venue completely indoor and heated when it rains?',
        a: 'Yes. Just Me Milano’s glass-and-steel dome beneath Torre Branca is fully enclosed, climate-controlled, and equipped with a cloakroom for coats and umbrellas.',
      },
      {
        q: 'Are there any online booking fees or site payments?',
        a: 'None at all. Both the Eventbrite registration and the WhatsApp confirmation are 100% free with zero online surcharges.',
      },
      {
        q: 'If I arrive at 19:30 for aperitivo, can I stay for the club party?',
        a: 'Yes. Guests entering from 19:30 for aperitivo are welcome to stay inside for the entire club night until 05:00 at no extra admission cost.',
      },
      {
        q: 'What exact details should I send on WhatsApp to +39 351 912 7047?',
        a: 'Include the name used on Eventbrite, total number of guests, expected arrival time, and whether you are coming for aperitivo, dinner on request, or the club night.',
      },
      {
        q: 'Where is Just Me Milano located?',
        a: 'At Viale Luigi Camoens 2, 20121 Milano, inside Parco Sempione right beneath Torre Branca (6 minutes on foot from Cadorna FN M1/M2 Metro).',
      },
    ],
  },
  es: {
    slug: 'just-singing-in-the-rain-entrada-gratis-copa-gratis-justme-milan-25-noviembre',
    offerPhrase: 'Entrada Gratis + Copa Gratis',
    metaTitle: 'Just Singing in the Rain · Entrada Gratis + Copa Gratis',
    metaDescription:
      'Mié 25 nov en Just Me Milano: Entrada Gratis + Copa Gratis hasta las 00:30 por Nightlife Milan (19:30-05:00). Eventbrite + WhatsApp +39 351 912 7047.',
    h1: 'Just Singing in the Rain · Entrada Gratis + Copa Gratis en Just Me Milano',
    subtitle:
      'Entrada Gratis + Copa Gratis hasta las 00:30 promovido y ofrecido por Nightlife Milan · Miércoles 25 de noviembre de 2026 de 19:30 a 05:00 · Aperitivo, Cena bajo petición por WhatsApp y Fiesta Comercial, Hip Hop y R&B bajo la Torre Branca.',
    themeTag: 'Promovido y Ofrecido por Nightlife Milan · Parco Sempione · Torre Branca',
    dateBadge: 'Miércoles 25 Noviembre 2026 · 19:30 – 05:00',
    priceBadge: 'Entrada Gratis hasta las 00:30 + 1 Copa Gratis · Cena bajo petición por WhatsApp',
    ageDressBadge: 'Mayores de 18 años (18+) · Look elegante de club',
    homeLabel: 'Inicio',
    eventsLabel: 'Eventos Milán',
    specialLabel: 'Eventos Especiales',
    ctaEventbriteLabel: 'Registro Gratis en Eventbrite',
    ctaWhatsappLabel: 'Confirmar por WhatsApp +39 351 912 7047',
    ctaDinnerWhatsappLabel: 'Solicitar Cena por WhatsApp',
    tocTitle: 'Guía Completa de la Noche · Just Singing in the Rain',
    tocLabels: [
      '1. Lluvia en todo Milán, cúpula climatizada dentro de Just Me Milano',
      '2. Cómo conseguir Entrada Gratis + Copa Gratis antes de las 00:30',
      '3. Aperitivo desde las 19:30, Cena bajo petición y Club hasta las 05:00',
      '4. Horarios paso a paso del miércoles 25 de noviembre',
      '5. Acceso 18+ y código de vestimenta para una noche de lluvia',
      '6. Cómo llegar sin mojarte a Viale Luigi Camoens 2',
      '7. Preguntas frecuentes (12 respuestas claras)',
    ],
    quickFacts: [
      { label: 'Fecha y Horario', value: 'Miércoles 25 de noviembre de 2026 · 19:30 – 05:00' },
      { label: 'Club', value: 'Just Me Milano · Viale Luigi Camoens 2 (Parco Sempione)' },
      { label: 'Invitación Especial', value: 'Entrada Gratis hasta las 00:30 + 1 Copa Gratis por Nightlife Milan' },
      { label: 'Música', value: 'Comercial · Hip Hop · R&B (el sonido de Just Me)' },
      { label: 'Restaurante', value: 'Cena bajo petición por WhatsApp (+39 351 912 7047)' },
      { label: 'Edad y Acceso', value: '18+ · Eventbrite + confirmación WhatsApp +39 351 912 7047' },
    ],
    overviewHeading: 'Una semana pasada por agua en Milán convertida en la mejor fiesta bajo la Torre Branca',
    overviewParagraphs: [
      'Entrada Gratis + Copa Gratis hasta las 00:30 promovido y ofrecido por Nightlife Milan: tras varios días seguidos de lluvia incesante sobre Milán, paraguas abiertos por cada avenida y farolas reflejadas en los adoquines mojados, este miércoles 25 de noviembre de 2026 le damos la vuelta al mal tiempo en el interior climatizado de Just Me Milano, en pleno Parco Sempione.',
      'Con un guiño irónico y alegre al imaginario clásico del cine de paraguas y gabardinas bajo los focos de la calle, Just Singing in the Rain reúne a milaneses, estudiantes internacionales, viajeros y grupos de amigos bajo la gran bóveda de cristal y acero diseñada a los pies de la Torre Branca. Dejas el paraguas en el guardarropa cubierto de Viale Luigi Camoens 2 y disfrutas a cubierto desde las 19:30 hasta las 05:00 de la madrugada.',
      'La invitación oficial promovida y ofrecida por Nightlife Milan incluye entrada gratuita hasta las 00:30 junto con una copa gratis invitada por Nightlife Milan para cada asistente acreditado. Las puertas abren a las 19:30 con el aperitivo italiano al calor de la cúpula iluminada y continúan sin pausa con la sesión de discoteca hasta el cierre.',
      'La cabina marca el ritmo con la selección musical característica de Just Me Milano: éxitos Comerciales, Hip Hop y R&B pensados tanto para calentar el ambiente durante el aperitivo como para llenar la pista central hasta las cinco de la mañana. Si tu grupo prefiere cenar sentado antes del baile, dispones de cena bajo petición por WhatsApp escribiendo directamente a nuestro equipo de concierge.',
      'No hay pagos en la web ni recargos de ningún tipo: para activar tu entrada gratis antes de las 00:30 con copa invitada solo tienes que completar el registro gratuito en Eventbrite y enviar un mensaje de confirmación por WhatsApp al +39 351 912 7047 indicando cuántos sois, vuestra hora aproximada de llegada y si venís al aperitivo o directamente a la fiesta.',
    ],
    timelineHeading: 'Programa de la Noche · Miércoles 25 de Noviembre de 2026',
    timelineSubheading: 'Desde el aperitivo a las 19:30 hasta el cierre de pista a las 05:00',
    timelineSteps: [
      {
        time: '19:30',
        title: 'Apertura de Puertas, Aperitivo Climatizado y Copa Gratis',
        detail:
          'Recepción en Viale Luigi Camoens 2 con tu registro de Eventbrite y confirmación de WhatsApp: entrada gratis y copa ofrecida por Nightlife Milan.',
      },
      {
        time: '20:30',
        title: 'Cena bajo Petición por WhatsApp',
        detail:
          'Mesas de cena disponibles bajo petición previa escribiendo al WhatsApp +39 351 912 7047 del concierge de Nightlife Milan.',
      },
      {
        time: '22:30',
        title: 'Sesión de Club · Comercial, Hip Hop & R&B',
        detail:
          'Sube la intensidad en la pista principal bajo la Torre Branca con lo mejor de la música Comercial, Hip Hop y R&B.',
      },
      {
        time: '00:30',
        title: 'Hora Límite para Entrada Gratis + Copa Gratis',
        detail:
          'Las 00:30 marcan el cierre del acceso gratuito con copa invitada por Nightlife Milan; recomendamos llegar unos minutos antes.',
      },
      {
        time: '00:30 – 05:00',
        title: 'Fiesta hasta el Amanecer en Parco Sempione',
        detail:
          'La pista sigue encendida hasta las 05:00 del jueves mientras fuera llueve sobre el parque.',
      },
    ],
    formatsHeading: 'Aperitivo, Cena bajo Petición y Noche de Discoteca',
    formatsSubheading: 'Elige tu plan ideal para este miércoles en Just Me Milano',
    formats: [
      {
        id: 'aperitivo',
        badge: 'Desde 19:30',
        title: 'Aperitivo · Entrada Gratis + Copa Gratis',
        timing: '19:30 – 22:30 (acceso gratuito válido hasta las 00:30)',
        summary:
          'Empieza la tarde-noche a resguardo de la lluvia desde las 19:30 en la cúpula calefactada de Just Me Milano con entrada gratis, 1 copa ofrecida por Nightlife Milan y acceso incluido para quedarte a bailar toda la noche.',
        bullets: [
          'Entrada gratuita entrando antes de las 00:30',
          '1 copa gratis ofrecida por Nightlife Milan',
          'Puedes quedarte a toda la fiesta hasta las 05:00 sin coste extra',
          'Registro gratuito en Eventbrite + confirmación WhatsApp',
        ],
        ctaKind: 'eventbrite',
        ctaLabel: 'Regístrate para el Aperitivo en Eventbrite',
      },
      {
        id: 'cena',
        badge: 'Bajo Petición',
        title: 'Cena bajo Petición por WhatsApp',
        timing: 'Turno de noche coordinado con Concierge',
        summary:
          '¿Quieres cenar con tu grupo en el interior de Just Me Milano antes de pasar a la pista? La cena está disponible bajo petición por WhatsApp hablando directamente con Nightlife Milan.',
        bullets: [
          'Cena bajo petición por WhatsApp en el +39 351 912 7047',
          'Atención directa en español, italiano e inglés',
          'Salón acristalado cerrado y climatizado bajo Torre Branca',
          'Conexión directa con la fiesta Comercial, Hip Hop y R&B',
        ],
        ctaKind: 'whatsapp',
        ctaLabel: 'Consultar Cena por WhatsApp',
      },
      {
        id: 'serata',
        badge: 'Hasta 05:00',
        title: 'Discoteca · Comercial, Hip Hop & R&B',
        timing: '22:30 – 05:00 (entrada gratis + copa hasta las 00:30)',
        summary:
          'Si vienes directo de fiesta, entra antes de las 00:30 con tu entrada gratuita de Eventbrite y tu confirmación de WhatsApp para disfrutar de acceso gratis y copa invitada hasta las 05:00.',
        bullets: [
          'Entrada gratis hasta las 00:30 + 1 copa ofrecida por Nightlife Milan',
          'Sonido Comercial, Hip Hop y R&B toda la noche',
          'Ambiente cosmopolita y universitario seleccionado (18+)',
          'Cero comisiones ni pagos anticipados en la web',
        ],
        ctaKind: 'eventbrite',
        ctaLabel: 'Regístrate para la Fiesta en Eventbrite',
      },
    ],
    howToHeading: 'Cómo Entrar Gratis con Copa hasta las 00:30 (2 Pasos Obligatorios)',
    howToSubheading: 'Sin pagos online: invitación gratuita en Eventbrite + mensaje de WhatsApp',
    howToSteps: [
      {
        stepNumber: '01',
        title: 'Paso 1 · Regístrate gratis en Eventbrite',
        detail:
          'Pulsa el botón oficial de Eventbrite en español y saca tu registro gratuito para Just Singing in the Rain del miércoles 25 de noviembre de 2026 en Just Me Milano.',
        ctaKind: 'eventbrite',
        ctaLabel: 'Ir al Registro Gratuito en Eventbrite',
      },
      {
        stepNumber: '02',
        title: 'Paso 2 · Confirma por WhatsApp en el +39 351 912 7047',
        detail:
          'Una vez registrado en Eventbrite, escríbenos por WhatsApp al +39 351 912 7047 indicando cuántos sois en el grupo, a qué hora llegaréis y si venís para el aperitivo o para la fiesta de club (o si queréis pedir cena).',
        ctaKind: 'whatsapp',
        ctaLabel: 'Enviar Confirmación por WhatsApp',
      },
    ],
    whatsappTemplateNote:
      'Qué indicar por WhatsApp (+39 351 912 7047): tu nombre, número exacto de asistentes, hora prevista de llegada (antes de las 00:30 para entrada gratis + copa gratis) y si eliges aperitivo, cena bajo petición o fiesta.',
    dressLogisticsHeading: 'Edad Mínima 18+, Vestimenta Recomendada y Cómo Llegar',
    dressLogisticsSubheading: 'Documento físico original para mayores de 18 años y estilo cuidado de noche',
    dressCodeOkTitle: 'Qué ponerse (Recomendado)',
    dressCodeOkItems: [
      'Camisa, americana o punto elegante con pantalón largo y calzado limpio de vestir',
      'Vestido cóctel, conjunto de noche cuidado o gabardina impermeable para dejar en guardarropa',
      'Botines de piel o zapatos cerrados elegantes cómodos para una noche de lluvia',
      'Documento de identidad o pasaporte físico original en vigor (acceso exclusivo 18+)',
    ],
    dressCodeNoTitle: 'No admitido en puerta',
    dressCodeNoItems: [
      'Chándal, pantalones cortos deportivos o camisetas de fútbol',
      'Chanclas, ropa de gimnasio o mochilas grandes',
      'Menores de 18 años o fotos del documento en el móvil sin original',
      'Llegadas después de las 00:30 reclamando la promoción gratuita',
    ],
    logisticsHeading: 'Cómo Llegar Seco a Just Me Milano en Parco Sempione',
    logisticsParagraphs: [
      'Just Me Milano está situado en Viale Luigi Camoens 2 (20121 Milán), justo debajo de la iluminada Torre Branca junto a la Triennale dentro de Parco Sempione. Todo el pabellón acristalado permanece completamente cerrado y calefactado durante el otoño y el invierno, con servicio de guardarropa nada más cruzar la entrada.',
      'En transporte público puedes bajar en Cadorna FN (líneas M1 Roja y M2 Verde de metro, a 6 minutos caminando por acera pavimentada) o en Lanza Brera (línea M2 Verde, 7 minutos). Si llueve con fuerza, un taxi hasta Viale Luigi Camoens 2 te deja exactamente frente a la marquesina de acceso.',
    ],
    logisticsFacts: [
      { label: 'Dirección Exacta', value: 'Just Me Milano · Viale Luigi Camoens 2, 20121 Milano' },
      { label: 'Horario Oficial', value: 'Miércoles 25 de noviembre de 2026 · 19:30 – 05:00' },
      { label: 'Cortesía Nightlife Milan', value: 'Entrada Gratis hasta las 00:30 + 1 Copa Gratis' },
      { label: 'Opción Cena', value: 'Cena bajo petición por WhatsApp (+39 351 912 7047)' },
      { label: 'Paradas de Metro', value: 'Cadorna FN (M1/M2, 6 min) · Lanza Brera (M2, 7 min)' },
      { label: 'Edad Mínima', value: '18+ con documento físico original' },
    ],
    mapHeading: 'Mapa GPS Interactivo · Just Me Milano (Torre Branca)',
    mapLabels: {
      loadMap: 'Cargar mapa de Just Me Milano (Viale Camoens 2)',
      mapTitle: 'Mapa interactivo de Just Me Milano · Parco Sempione',
      privacyLoadNotice: 'Para proteger tu privacidad, Google Maps solo se carga al hacer clic.',
    },
    heroLabels: [
      'Llegada con paraguas bajo la Torre Branca iluminada frente a Just Me Milano',
      'Aperitivo desde las 19:30 en la cúpula de cristal climatizada con copa gratis de Nightlife Milan',
      'Ambiente interior cálido y mesas de cena bajo petición resguardadas de la lluvia en Parco Sempione',
      'Pista Comercial, Hip Hop y R&B encendida hasta las 05:00 en Just Me Milano',
    ],
    venueBannerEyebrow: 'Just Me Milano · Parco Sempione',
    venueBannerTitle: 'Descubre la Ficha Completa de Just Me Milano',
    venueBannerDesc: 'Arquitectura bajo la Torre Branca, normativa de acceso y programación semanal.',
    venueCta: 'Ver Club',
    thanksgivingBannerEyebrow: 'Jueves 26 Noviembre 2026 · Mañana',
    thanksgivingBannerTitle: 'Happy Thanksgiving en Just Me Milano',
    thanksgivingBannerDesc: 'Descubre también el evento especial del jueves 26 de noviembre.',
    thanksgivingBannerCta: 'Ver 26 Nov',
    partenopeaBannerEyebrow: 'Viernes 27 Noviembre 2026 · Just Me',
    partenopeaBannerTitle: 'Cena Spettacolo Partenopea en Just Me',
    partenopeaBannerDesc: 'Cena espectáculo en vivo y fiesta de viernes en Just Me Milano.',
    partenopeaBannerCta: 'Ver 27 Nov',
    dec31BannerEyebrow: '31 Diciembre 2026 · Nochevieja',
    dec31BannerTitle: 'Nochevieja en Just Me Milano',
    dec31BannerDesc: 'Consulta la gala oficial de Fin de Año bajo la Torre Branca.',
    dec31BannerCta: 'Ver 31 Dic',
    faqHeading: 'Preguntas Frecuentes · Just Singing in the Rain (25 Noviembre 2026)',
    faqs: [
      {
        q: '¿Qué incluye exactamente la invitación de Just Singing in the Rain?',
        a: 'Incluye entrada gratis hasta las 00:30 más 1 copa gratis promovida y ofrecida por Nightlife Milan el miércoles 25 de noviembre de 2026 en Just Me Milano.',
      },
      {
        q: '¿Qué debo hacer para conseguir la entrada gratis y la copa?',
        a: 'Debes completar dos pasos gratuitos: registrarte en Eventbrite con el enlace oficial de esta página y escribir por WhatsApp al +39 351 912 7047 indicando cuántos sois, hora de llegada y si venís a aperitivo o fiesta.',
      },
      {
        q: '¿Hasta qué hora puedo entrar gratis con copa incluida?',
        a: 'El acceso gratuito con copa gratis es válido cruzando puerta antes de las 00:30. Conviene llegar unos 15 minutos antes.',
      },
      {
        q: '¿A qué hora empieza el aperitivo y cuándo termina la fiesta?',
        a: 'Las puertas se abren a las 19:30 para el aperitivo y la discoteca continúa hasta las 05:00 de la madrugada del jueves 26 de noviembre.',
      },
      {
        q: '¿Se puede cenar en Just Me Milano este miércoles?',
        a: 'Sí, la cena está disponible bajo petición por WhatsApp escribiendo directamente al concierge en el +39 351 912 7047.',
      },
      {
        q: '¿Qué música suena durante toda la noche?',
        a: 'La sesión oficial de Just Me Milano: música Comercial, Hip Hop y R&B.',
      },
      {
        q: '¿Cuál es la edad mínima para entrar?',
        a: 'El acceso es para mayores de 18 años (18+) presentando DNI, pasaporte o carné de conducir físico original.',
      },
      {
        q: '¿El local está cubierto y calefactado si llueve mucho?',
        a: 'Sí, toda la cúpula de cristal bajo la Torre Branca está cerrada herméticamente, climatizada y cuenta con guardarropa.',
      },
      {
        q: '¿Hay que pagar algo online o existen gastos de gestión?',
        a: 'No. Tanto el registro en Eventbrite como la confirmación por WhatsApp son totalmente gratuitos.',
      },
      {
        q: '¿Si entro a las 19:30 al aperitivo me puedo quedar luego a la discoteca?',
        a: 'Sí, quienes entran desde las 19:30 pueden quedarse toda la noche hasta las 05:00 sin pagar ningún suplemento.',
      },
      {
        q: '¿Qué datos debo poner en el mensaje de WhatsApp al +39 351 912 7047?',
        a: 'Tu nombre de registro en Eventbrite, número total de personas, hora estimada de llegada y si eliges aperitivo, cena bajo petición o noche de club.',
      },
      {
        q: '¿Dónde está exactamente Just Me Milano?',
        a: 'En Viale Luigi Camoens 2, 20121 Milán, dentro de Parco Sempione junto a la Triennale y bajo la Torre Branca (metros Cadorna FN y Lanza).',
      },
    ],
  },
  de: {
    slug: 'just-singing-in-the-rain-freier-eintritt-gratis-drink-justme-mailand-25-november',
    offerPhrase: 'Freier Eintritt + Gratis-Drink',
    metaTitle: 'Just Singing in the Rain · Freier Eintritt + Gratis-Drink',
    metaDescription:
      'Mi. 25. Nov im Just Me Milano: Freier Eintritt + Gratis-Drink bis 00:30 von Nightlife Milan (19:30-05:00). Eventbrite + WhatsApp +39 351 912 7047.',
    h1: 'Just Singing in the Rain · Freier Eintritt + Gratis-Drink im Just Me Milano',
    subtitle:
      'Freier Eintritt + Gratis-Drink bis 00:30 Uhr präsentiert und spendiert von Nightlife Milan · Mittwoch, 25. November 2026 von 19:30 bis 05:00 Uhr · Aperitivo, Abendessen auf Anfrage per WhatsApp & Clubnacht mit Commercial, Hip Hop & R&B unter der Torre Branca.',
    themeTag: 'Präsentiert & Spendiert von Nightlife Milan · Parco Sempione · Torre Branca',
    dateBadge: 'Mittwoch, 25. Nov. 2026 · 19:30 – 05:00 Uhr',
    priceBadge: 'Freier Eintritt bis 00:30 Uhr + 1 Gratis-Drink · Abendessen auf Anfrage via WhatsApp',
    ageDressBadge: 'Ab 18 Jahren (18+) · Gepflegter Club-Dresscode',
    homeLabel: 'Startseite',
    eventsLabel: 'Events Mailand',
    specialLabel: 'Special Events',
    ctaEventbriteLabel: 'Kostenlos auf Eventbrite registrieren',
    ctaWhatsappLabel: 'Per WhatsApp bestätigen +39 351 912 7047',
    ctaDinnerWhatsappLabel: 'Abendessen per WhatsApp anfragen',
    tocTitle: 'Kompletter Abend-Guide · Just Singing in the Rain',
    tocLabels: [
      '1. Dauerregen draußen, beheizte Glaskuppel drinnen im Just Me Milano',
      '2. So sicherst du dir Freien Eintritt + Gratis-Drink bis 00:30 Uhr',
      '3. Aperitivo ab 19:30 Uhr, Dinner auf Anfrage & Clubnacht bis 05:00 Uhr',
      '4. Zeitplan für Mittwoch, den 25. November 2026',
      '5. Einlass ab 18+ und Dresscode-Tipps bei Regenwetter',
      '6. Trocken ankommen an der Viale Luigi Camoens 2 (Metro & Taxi)',
      '7. Häufige Fragen (12 kompakte Antworten)',
    ],
    quickFacts: [
      { label: 'Datum & Uhrzeit', value: 'Mittwoch, 25. November 2026 · 19:30 – 05:00 Uhr' },
      { label: 'Location', value: 'Just Me Milano · Viale Luigi Camoens 2 (Parco Sempione)' },
      { label: 'Special von Nightlife Milan', value: 'Freier Eintritt bis 00:30 Uhr + 1 Gratis-Drink' },
      { label: 'Musikstil', value: 'Commercial · Hip Hop · R&B (der Just Me Sound)' },
      { label: 'Abendessen', value: 'Abendessen auf Anfrage via WhatsApp (+39 351 912 7047)' },
      { label: 'Mindestalter & Zugang', value: '18+ · Eventbrite + WhatsApp +39 351 912 7047' },
    ],
    overviewHeading: 'Eine verregnete Woche in Mailand wird zur warmen Clubnacht unter der Torre Branca',
    overviewParagraphs: [
      'Freier Eintritt + Gratis-Drink bis 00:30 Uhr präsentiert und spendiert von Nightlife Milan: Nach tagelangem Novemberregen über Mailand, nassen Pflastersteinen und bunten Lichtreflexen auf den Straßen drehen wir am Mittwoch, den 25. November 2026, den Spieß einfach um und feiern trocken und warm unter der beleuchteten Torre Branca im Just Me Milano.',
      'Mit einem charmanten Augenzwinkern in Richtung großer Kinoklassiker rund um Regenschirme, Trenchcoats und Straßenlaternen im Regen lädt Just Singing in the Rain dazu ein, den Schirm am überdachten Eingang der Viale Luigi Camoens 2 zuzuklappen und von 19:30 Uhr bis 05:00 Uhr morgens in den voll verglasten, angenehm beheizten Pavillon im Parco Sempione einzutauchen.',
      'Dieses Mittwoch-Special wird direkt von Nightlife Milan gefördert und eingeladen: Alle akkreditierten Gäste erhalten bis 00:30 Uhr freien Eintritt sowie einen kostenlosen Welcome-Drink von Nightlife Milan. Bereits um 19:30 Uhr startet der Mailänder Aperitivo in entspannter Atmosphäre, bevor der Abend nahtlos in eine ausgelassene Clubnacht übergeht.',
      'Musikalisch liefert das Resident-Team den unverwechselbaren Sound des Just Me Milano aus Commercial, Hip Hop und R&B. Wer den Abend mit seiner Gruppe bei einem gemütlichen Essen beginnen möchte, kann ein Abendessen auf Anfrage per WhatsApp direkt über den Nightlife Milan Concierge arrangieren.',
      'Es gibt keinerlei Online-Bezahlung oder Vorverkaufsgebühren auf der Website: Für den freien Eintritt bis 00:30 Uhr samt Gratis-Drink genügen zwei kurze Schritte: zuerst kostenlos auf Eventbrite registrieren und anschließend per WhatsApp unter +39 351 912 7047 kurz Personenzahl, geplante Ankunftszeit sowie Aperitivo oder Clubnacht bestätigen.',
    ],
    timelineHeading: 'Programmablauf · Mittwoch, 25. November 2026 (19:30 – 05:00 Uhr)',
    timelineSubheading: 'Vom Aperitivo um 19:30 Uhr bis zum Finale um 05:00 Uhr morgens',
    timelineSteps: [
      {
        time: '19:30',
        title: 'Einlassbeginn, Aperitivo in der Glaskuppel & Gratis-Drink',
        detail:
          'Empfang an der Viale Luigi Camoens 2 mit Eventbrite-Ticket und WhatsApp-Bestätigung: freier Eintritt und 1 Gratis-Drink von Nightlife Milan.',
      },
      {
        time: '20:30',
        title: 'Abendessen auf Anfrage per WhatsApp',
        detail:
          'Tischreservierung zum Abendessen im beheizten Innenbereich auf vorherige Anfrage per WhatsApp unter +39 351 912 7047.',
      },
      {
        time: '22:30',
        title: 'Club-Start · Commercial, Hip Hop & R&B',
        detail:
          'Die Haupttanzfläche unter der Torre Branca füllt sich zu den besten Commercial-, Hip-Hop- und R&B-Tracks.',
      },
      {
        time: '00:30',
        title: 'Einlassschluss für Freien Eintritt + Gratis-Drink',
        detail:
          'Bis 00:30 Uhr gilt der kostenfreie Zugang inklusive Gratis-Drink von Nightlife Milan; plane deine Ankunft idealerweise etwas früher ein.',
      },
      {
        time: '00:30 – 05:00',
        title: 'Party bis in den Donnerstagmorgen',
        detail:
          'Ausgelassenes Feiern im warmen Glaspavillon bis 05:00 Uhr morgens.',
      },
    ],
    formatsHeading: 'Aperitivo, Abendessen auf Anfrage & Clubnacht im Überblick',
    formatsSubheading: 'Drei Möglichkeiten für deinen Mittwochabend im Just Me Milano',
    formats: [
      {
        id: 'aperitivo',
        badge: 'Ab 19:30 Uhr',
        title: 'Aperitivo · Freier Eintritt + Gratis-Drink',
        timing: '19:30 – 22:30 Uhr (freier Eintritt gültig bis 00:30 Uhr)',
        summary:
          'Direkt nach Feierabend dem Regen entfliehen: Ab 19:30 Uhr genießt du den Aperitivo in der warmen Glaskuppel bei freiem Eintritt, 1 Gratis-Drink von Nightlife Milan und kannst ohne Aufpreis die ganze Nacht bleiben.',
        bullets: [
          'Freier Eintritt bei Ankunft vor 00:30 Uhr',
          '1 Gratis-Drink spendiert von Nightlife Milan',
          'Durchfeiern bis 05:00 Uhr ohne weiteres Ticket',
          'Kostenlose Eventbrite-Registrierung + WhatsApp-Bestätigung',
        ],
        ctaKind: 'eventbrite',
        ctaLabel: 'Für Aperitivo auf Eventbrite registrieren',
      },
      {
        id: 'cena',
        badge: 'Auf Anfrage',
        title: 'Abendessen auf Anfrage via WhatsApp',
        timing: 'Abendservice nach direkter Rücksprache',
        summary:
          'Möchtest du vor der Party entspannt mit deiner Gruppe im Club speisen? Das Abendessen ist heute exklusiv auf Anfrage per WhatsApp über unseren Concierge buchbar.',
        bullets: [
          'Abendessen auf Anfrage via WhatsApp an +39 351 912 7047',
          'Direkte Abstimmung mit dem Nightlife Milan Desk',
          'Geschlossener, voll beheizter Glasbau unter der Torre Branca',
          'Nahtloser Übergang in die Commercial-, Hip-Hop- & R&B-Nacht',
        ],
        ctaKind: 'whatsapp',
        ctaLabel: 'Abendessen per WhatsApp anfragen',
      },
      {
        id: 'serata',
        badge: 'Bis 05:00 Uhr',
        title: 'Clubnacht · Commercial, Hip Hop & R&B',
        timing: '22:30 – 05:00 Uhr (freier Eintritt + Drink bis 00:30 Uhr)',
        summary:
          'Komm vor 00:30 Uhr mit deiner kostenlosen Eventbrite-Registrierung und WhatsApp-Bestätigung vorbei, sichere dir freien Eintritt plus Gratis-Drink und tanze bis 05:00 Uhr.',
        bullets: [
          'Freier Eintritt bis 00:30 Uhr + 1 Gratis-Drink inklusive',
          'Commercial, Hip Hop & R&B die ganze Nacht',
          'Internationales Publikum ab 18 Jahren (18+)',
          'Keine Online-Gebühren oder Aufschläge',
        ],
        ctaKind: 'eventbrite',
        ctaLabel: 'Für die Clubnacht auf Eventbrite registrieren',
      },
    ],
    howToHeading: 'So erhältst du Freien Eintritt + Gratis-Drink bis 00:30 Uhr (2 Schritte)',
    howToSubheading: 'Keine Online-Zahlung: kostenloses Eventbrite-Ticket + kurze WhatsApp-Bestätigung',
    howToSteps: [
      {
        stepNumber: '01',
        title: 'Schritt 1 · Kostenlos auf Eventbrite registrieren',
        detail:
          'Klicke auf den deutschen Eventbrite-Button auf dieser Seite und sichere dir deine kostenlose Registrierung für Just Singing in the Rain am Mittwoch, 25. November 2026.',
        ctaKind: 'eventbrite',
        ctaLabel: 'Zur kostenlosen Eventbrite-Registrierung',
      },
      {
        stepNumber: '02',
        title: 'Schritt 2 · Kurz per WhatsApp unter +39 351 912 7047 bestätigen',
        detail:
          'Schreibe nach der Eventbrite-Anmeldung eine kurze Nachricht an +39 351 912 7047 mit drei Angaben: wie viele Personen ihr seid, wann ihr ankommt und ob ihr zum Aperitivo oder zur Clubnacht kommt (oder ein Abendessen anfragt).',
        ctaKind: 'whatsapp',
        ctaLabel: 'WhatsApp-Bestätigung senden',
      },
    ],
    whatsappTemplateNote:
      'Bitte in der WhatsApp an +39 351 912 7047 angeben: Name, genaue Personenzahl, geplante Ankunftszeit (vor 00:30 Uhr für freien Eintritt + Gratis-Drink) sowie Aperitivo, Abendessen auf Anfrage oder Clubnacht.',
    dressLogisticsHeading: 'Einlass ab 18+, Dresscode bei Regen & Anfahrt',
    dressLogisticsSubheading: 'Gültiger physischer Lichtbildausweis (18+) und gepflegte Abendgarderobe',
    dressCodeOkTitle: 'Empfohlenes Outfit',
    dressCodeOkItems: [
      'Hemd, Sakko oder feiner Strickpullover mit langer Hose und gepflegten Schuhen',
      'Cocktailkleid, elegantes Abend-Outfit oder schicker Trenchcoat für die Garderobe im Club',
      'Saubere Lederstiefeletten oder elegante geschlossene Schuhe für regnerisches Wetter',
      'Originaler physischer Personalausweis, Reisepass oder Führerschein (Einlass strikt 18+)',
    ],
    dressCodeNoTitle: 'Nicht gestattet an der Tür',
    dressCodeNoItems: [
      'Jogginganzüge, Sporthosen, Kapuzenpullis oder Fußballtrikots',
      'Badelatschen, Fitnesskleidung oder große Rucksäcke',
      'Minderjährige unter 18 Jahren oder bloße Handyfotos des Ausweises',
      'Ankunft nach 00:30 Uhr mit Anspruch auf das Gratis-Angebot',
    ],
    logisticsHeading: 'Trocken ans Ziel: Anfahrt zur Viale Luigi Camoens 2',
    logisticsParagraphs: [
      'Das Just Me Milano liegt an der Viale Luigi Camoens 2 (20121 Mailand) unmittelbar unter der beleuchteten Torre Branca neben der Triennale im Parco Sempione. Der gesamte Glas- und Stahlpavillon ist im Herbst und Winter geschlossen, angenehm beheizt und verfügt direkt am Eingang über eine bewachte Garderobe für Mäntel und Schirme.',
      'Mit der Metro erreichst du Cadorna FN (Linien M1 Rot und M2 Grün, 6 Gehminuten über befestigte Wege) oder Lanza Brera (M2 Grün, 7 Minuten). Bei starkem Regen hält das Taxi direkt vor dem überdachten Eingang an der Viale Luigi Camoens 2.',
    ],
    logisticsFacts: [
      { label: 'Adresse', value: 'Just Me Milano · Viale Luigi Camoens 2, 20121 Milano' },
      { label: 'Öffnungszeiten', value: 'Mittwoch, 25. November 2026 · 19:30 – 05:00 Uhr' },
      { label: 'Nightlife Milan Vorteil', value: 'Freier Eintritt bis 00:30 Uhr + 1 Gratis-Drink' },
      { label: 'Abendessen', value: 'Abendessen auf Anfrage via WhatsApp (+39 351 912 7047)' },
      { label: 'Metro-Stationen', value: 'Cadorna FN (M1/M2, 6 Min.) · Lanza Brera (M2, 7 Min.)' },
      { label: 'Mindestalter', value: '18+ mit physischem Originaldokument' },
    ],
    mapHeading: 'Interaktive GPS-Karte · Just Me Milano (Torre Branca)',
    mapLabels: {
      loadMap: 'Karte für Just Me Milano laden (Viale Camoens 2)',
      mapTitle: 'Standortkarte Just Me Milano · Parco Sempione',
      privacyLoadNotice: 'Zum Schutz deiner Daten wird Google Maps erst nach deinem Klick geladen.',
    },
    heroLabels: [
      'Gäste mit Regenschirmen unter der beleuchteten Torre Branca vor dem Just Me Milano',
      'Aperitivo ab 19:30 Uhr in der beheizten Glaskuppel mit Gratis-Drink von Nightlife Milan',
      'Stilvolles Ambiente und Tische für das Abendessen auf Anfrage im Parco Sempione',
      'Commercial-, Hip-Hop- und R&B-Dancefloor bis 05:00 Uhr morgens im Just Me Milano',
    ],
    venueBannerEyebrow: 'Just Me Milano · Parco Sempione',
    venueBannerTitle: 'Kompletter Club-Guide zum Just Me Milano',
    venueBannerDesc: 'Architektur unter der Torre Branca, Türpolitik und alle Wochentage.',
    venueCta: 'Club ansehen',
    thanksgivingBannerEyebrow: 'Donnerstag, 26. Nov. 2026 · Morgen Abend',
    thanksgivingBannerTitle: 'Happy Thanksgiving im Just Me Milano',
    thanksgivingBannerDesc: 'Entdecke auch das Donnerstag-Special am 26. November im Just Me.',
    thanksgivingBannerCta: '26. Nov. ansehen',
    partenopeaBannerEyebrow: 'Freitag, 27. Nov. 2026 · Just Me Milano',
    partenopeaBannerTitle: 'Cena Spettacolo Partenopea im Just Me',
    partenopeaBannerDesc: 'Live-Dinnershow und Freitagsparty am 27. November.',
    partenopeaBannerCta: '27. Nov. ansehen',
    dec31BannerEyebrow: '31. Dezember 2026 · Silvester',
    dec31BannerTitle: 'Silvester im Just Me Milano',
    dec31BannerDesc: 'Alle Infos zur großen Silvesternacht unter der Torre Branca.',
    dec31BannerCta: '31. Dez. ansehen',
    faqHeading: 'Häufig gestellte Fragen · Just Singing in the Rain (25. November 2026)',
    faqs: [
      {
        q: 'Was genau beinhaltet das Angebot von Just Singing in the Rain?',
        a: 'Du erhältst freien Eintritt bis 00:30 Uhr sowie 1 Gratis-Drink, präsentiert und spendiert von Nightlife Milan am Mittwoch, den 25. November 2026 im Just Me Milano.',
      },
      {
        q: 'Wie sichere ich mir den freien Eintritt und den Gratis-Drink?',
        a: 'Registriere dich zuerst kostenlos auf Eventbrite über den Button auf dieser Seite und bestätige danach kurz per WhatsApp an +39 351 912 7047 Personenzahl, Ankunftszeit und ob du zum Aperitivo oder zur Clubnacht kommst.',
      },
      {
        q: 'Bis wie viel Uhr gilt der freie Eintritt?',
        a: 'Der kostenfreie Einlass inklusive Gratis-Drink gilt für alle bestätigten Gäste, die vor 00:30 Uhr am Eingang einchecken.',
      },
      {
        q: 'Wann beginnt und endet das Event?',
        a: 'Einlass ist ab 19:30 Uhr zum Aperitivo; gefeiert wird durchgehend bis Donnerstagmorgen um 05:00 Uhr.',
      },
      {
        q: 'Kann man am Mittwochabend im Just Me Milano auch zu Abend essen?',
        a: 'Ja, das Abendessen ist auf Anfrage per WhatsApp direkt unter +39 351 912 7047 verfügbar.',
      },
      {
        q: 'Welche Musik läuft am Abend?',
        a: 'Gespielt wird der typische Just Me Milano Mix aus Commercial, Hip Hop und R&B.',
      },
      {
        q: 'Wie hoch ist das Mindestalter für den Einlass?',
        a: 'Der Einlass gilt ab 18 Jahren (18+) gegen Vorlage eines gültigen physischen Lichtbildausweises im Original.',
      },
      {
        q: 'Ist der Club bei starkem Regen komplett überdacht und beheizt?',
        a: 'Ja, die gesamte Glaskuppel unter der Torre Branca ist wetterfest geschlossen, beheizt und besitzt eine Innengarderobe.',
      },
      {
        q: 'Fallen auf der Website irgendwelche Gebühren oder Online-Zahlungen an?',
        a: 'Nein, sowohl die Eventbrite-Anmeldung als auch die WhatsApp-Bestätigung sind vollkommen kostenlos.',
      },
      {
        q: 'Darf ich nach dem Aperitivo ab 19:30 Uhr auch für die Party bleiben?',
        a: 'Ja, wer zum Aperitivo eintrifft, kann ohne weiteres Ticket die gesamte Nacht bis 05:00 Uhr im Club verbringen.',
      },
      {
        q: 'Welche Angaben gehören in die WhatsApp-Nachricht an +39 351 912 7047?',
        a: 'Dein Name von der Eventbrite-Registrierung, die Personenzahl, eure geplante Ankunftszeit und ob ihr Aperitivo, Abendessen auf Anfrage oder Clubnacht wählt.',
      },
      {
        q: 'Wo befindet sich das Just Me Milano genau?',
        a: 'In der Viale Luigi Camoens 2, 20121 Mailand, im Parco Sempione direkt unter der Torre Branca (ca. 6 Minuten Fußweg ab Metro Cadorna FN).',
      },
    ],
  },
  fr: {
    slug: 'just-singing-in-the-rain-entree-gratuite-verre-offert-justme-milan-25-novembre',
    offerPhrase: 'Entrée Gratuite + Verre Offert',
    metaTitle: 'Just Singing in the Rain · Entrée Gratuite + Verre Offert',
    metaDescription:
      'Mer 25 nov au Just Me Milano : Entrée Gratuite + Verre Offert avant 00h30 par Nightlife Milan (19h30-05h00). Eventbrite + WhatsApp +39 351 912 7047.',
    h1: 'Just Singing in the Rain · Entrée Gratuite + Verre Offert au Just Me Milano',
    subtitle:
      'Entrée Gratuite + Verre Offert jusqu’à 00h30 promu et offert par Nightlife Milan · Mercredi 25 novembre 2026 de 19h30 à 05h00 · Aperitivo, Dîner sur demande via WhatsApp et Soirée Commercial, Hip Hop & R&B sous la Torre Branca.',
    themeTag: 'Promu et Offert par Nightlife Milan · Parco Sempione · Torre Branca',
    dateBadge: 'Mercredi 25 Novembre 2026 · 19h30 – 05h00',
    priceBadge: 'Entrée Gratuite avant 00h30 + 1 Verre Offert · Dîner sur demande via WhatsApp',
    ageDressBadge: '18+ · Tenue chic de club (pièce d’identité physique requise)',
    homeLabel: 'Accueil',
    eventsLabel: 'Soirées Milan',
    specialLabel: 'Événements Spéciaux',
    ctaEventbriteLabel: 'Inscription Gratuite sur Eventbrite',
    ctaWhatsappLabel: 'Confirmer sur WhatsApp +39 351 912 7047',
    ctaDinnerWhatsappLabel: 'Demander un Dîner sur WhatsApp',
    tocTitle: 'Guide Complet de la Soirée · Just Singing in the Rain',
    tocLabels: [
      '1. Semaine pluvieuse à Milan, coupole chauffée au Just Me Milano',
      '2. Comment obtenir l’Entrée Gratuite + Verre Offert avant 00h30',
      '3. Aperitivo dès 19h30, Dîner sur demande et Club jusqu’à 05h00',
      '4. Programme horaire du mercredi 25 novembre 2026',
      '5. Accès 18+ et conseils vestimentaires par temps de pluie',
      '6. Venir au sec à Viale Luigi Camoens 2 (Métro & Taxi)',
      '7. Questions fréquentes (12 réponses détaillées)',
    ],
    quickFacts: [
      { label: 'Date et Horaires', value: 'Mercredi 25 novembre 2026 · 19h30 – 05h00' },
      { label: 'Lieu', value: 'Just Me Milano · Viale Luigi Camoens 2 (Parco Sempione)' },
      { label: 'Invitation Spéciale', value: 'Entrée Gratuite avant 00h30 + 1 Verre Offert par Nightlife Milan' },
      { label: 'Musique', value: 'Commercial · Hip Hop · R&B (la signature Just Me)' },
      { label: 'Restauration', value: 'Dîner sur demande via WhatsApp (+39 351 912 7047)' },
      { label: 'Âge et Accès', value: '18+ · Eventbrite + confirmation WhatsApp +39 351 912 7047' },
    ],
    overviewHeading: 'Une semaine d’averses sur Milan transformée en fête chaleureuse sous la Torre Branca',
    overviewParagraphs: [
      'Entrée Gratuite + Verre Offert jusqu’à 00h30 promu et offert par Nightlife Milan : après plusieurs jours consécutifs de pluie sur Milan, de parapluies retournés par les averses et de reflets dorés sur les pavés mouillés, ce mercredi 25 novembre 2026 prend la météo à contre-pied sous la verrière chauffée du Just Me Milano, au cœur du Parco Sempione.',
      'Clin d’œil malicieux à l’esthétique des grands classiques du cinéma où parapluies et réverbères transforment l’averse en décor de fête, Just Singing in the Rain vous invite à refermer votre parapluie devant l’entrée abritée de Viale Luigi Camoens 2 pour profiter d’un pavillon de verre et d’acier entièrement clos et chauffé, de 19h30 jusqu’à 05h00 du matin.',
      'Promue et offerte directement par Nightlife Milan, cette soirée accorde à chaque invité accrédité l’entrée gratuite avant 00h30 accompagnée d’un verre offert par Nightlife Milan. Les portes s’ouvrent dès 19h30 pour l’aperitivo milanais à l’abri des gouttes, avant de laisser place à une véritable nuit de club jusqu’à l’aube.',
      'Aux platines, la programmation fait résonner l’identité musicale du Just Me Milano : un mélange entraînant de sons Commercial, Hip Hop et R&B pensé pour accompagner l’apéritif puis enflammer la piste principale. Celles et ceux qui souhaitent partager un repas assis avant de danser peuvent réserver un dîner sur demande via WhatsApp directement auprès du concierge Nightlife Milan.',
      'Aucun paiement en ligne ni frais de billetterie ne s’appliquent sur cette soirée : pour valider votre entrée gratuite avant 00h30 et votre verre offert, il suffit d’effectuer votre inscription gratuite sur Eventbrite puis d’envoyer un court message WhatsApp au +39 351 912 7047 en précisant combien vous êtes, votre heure d’arrivée prévue et si vous venez pour l’aperitivo ou pour la soirée club.',
    ],
    timelineHeading: 'Déroulé de la Soirée · Mercredi 25 Novembre 2026 (19h30 – 05h00)',
    timelineSubheading: 'De l’aperitivo dès 19h30 sous la coupole chauffée jusqu’à la fermeture à 05h00',
    timelineSteps: [
      {
        time: '19:30',
        title: 'Ouverture des Portes, Aperitivo au Chaud & Verre Offert',
        detail:
          'Accueil au Viale Luigi Camoens 2 sur présentation de votre inscription Eventbrite et confirmation WhatsApp : entrée gratuite et verre offert par Nightlife Milan.',
      },
      {
        time: '20:30',
        title: 'Dîner sur Demande via WhatsApp',
        detail:
          'Possibilité de dîner sur place uniquement sur demande préalable via WhatsApp au +39 351 912 7047 auprès du concierge Nightlife Milan.',
      },
      {
        time: '22:30',
        title: 'Ambiance Club · Commercial, Hip Hop & R&B',
        detail:
          'Le dancefloor central monte en puissance sous la Torre Branca au rythme des sélections Commercial, Hip Hop et R&B.',
      },
      {
        time: '00:30',
        title: 'Fin de l’Entrée Gratuite + Verre Offert',
        detail:
          '00h30 correspond à l’heure limite d’arrivée pour bénéficier de l’entrée gratuite et du verre offert par Nightlife Milan ; prévoyez quelques minutes d’avance.',
      },
      {
        time: '00:30 – 05:00',
        title: 'Soirée Club jusqu’au Petit Matin',
        detail:
          'La fête se poursuit au sec sous la verrière illuminée jusqu’à 05h00 jeudi matin.',
      },
    ],
    formatsHeading: 'Aperitivo, Dîner sur Demande et Soirée Club : Trois Formules',
    formatsSubheading: 'Choisissez le moment qui correspond à votre mercredi soir au Just Me Milano',
    formats: [
      {
        id: 'aperitivo',
        badge: 'Dès 19h30',
        title: 'Aperitivo · Entrée Gratuite + Verre Offert',
        timing: '19h30 – 22h30 (entrée gratuite valable jusqu’à 00h30)',
        summary:
          'Idéal après le bureau pour éviter la pluie : rejoignez la coupole chauffée dès 19h30, profitez de l’entrée gratuite, savourez le verre offert par Nightlife Milan et prolongez librement la soirée sur la piste.',
        bullets: [
          'Entrée gratuite pour toute arrivée avant 00h30',
          '1 verre offert par Nightlife Milan inclus',
          'Accès libre pour rester danser jusqu’à 05h00',
          'Inscription gratuite Eventbrite + confirmation WhatsApp',
        ],
        ctaKind: 'eventbrite',
        ctaLabel: 'S’inscrire pour l’Aperitivo sur Eventbrite',
      },
      {
        id: 'cena',
        badge: 'Sur Demande',
        title: 'Dîner sur Demande via WhatsApp',
        timing: 'Service du soir organisé avec le Concierge',
        summary:
          'Envie de dîner au chaud avec votre groupe avant le début du clubbing ? Le dîner est proposé sur demande via WhatsApp directement avec l’équipe Nightlife Milan.',
        bullets: [
          'Dîner sur demande via WhatsApp au +39 351 912 7047',
          'Réponse rapide du service concierge Nightlife Milan',
          'Cadre intérieur vitré et chauffé sous la Torre Branca',
          'Poursuite directe avec la soirée Commercial, Hip Hop & R&B',
        ],
        ctaKind: 'whatsapp',
        ctaLabel: 'Demander un Dîner sur WhatsApp',
      },
      {
        id: 'serata',
        badge: 'Jusqu’à 05h00',
        title: 'Soirée Club · Commercial, Hip Hop & R&B',
        timing: '22h30 – 05h00 (entrée gratuite + verre offert avant 00h30)',
        summary:
          'Pour venir directement faire la fête, présentez-vous avant 00h30 muni de votre billet gratuit Eventbrite et de votre confirmation WhatsApp : entrée gratuite, verre offert et dancefloor jusqu’à 05h00.',
        bullets: [
          'Entrée gratuite avant 00h30 + 1 verre offert par Nightlife Milan',
          'Sélection musicale Commercial, Hip Hop et R&B',
          'Clientèle internationale et milanaise majeure (18+)',
          'Aucun paiement en ligne ni commission ajoutée',
        ],
        ctaKind: 'eventbrite',
        ctaLabel: 'S’inscrire pour la Soirée sur Eventbrite',
      },
    ],
    howToHeading: 'Comment Profiter de l’Entrée Gratuite + Verre Offert avant 00h30 (2 Étapes)',
    howToSubheading: 'Zéro paiement sur le site : billet gratuit Eventbrite + confirmation WhatsApp',
    howToSteps: [
      {
        stepNumber: '01',
        title: 'Étape 1 · Inscrivez-vous gratuitement sur Eventbrite',
        detail:
          'Cliquez sur le bouton Eventbrite en français sur cette page afin d’enregistrer votre invitation gratuite pour Just Singing in the Rain le mercredi 25 novembre 2026.',
        ctaKind: 'eventbrite',
        ctaLabel: 'Ouvrir l’Inscription Eventbrite',
      },
      {
        stepNumber: '02',
        title: 'Étape 2 · Confirmez sur WhatsApp au +39 351 912 7047',
        detail:
          'Une fois inscrit sur Eventbrite, envoyez un message WhatsApp au +39 351 912 7047 en indiquant le nombre de personnes, votre heure d’arrivée et si vous venez pour l’aperitivo ou pour la soirée club (ou pour un dîner sur demande).',
        ctaKind: 'whatsapp',
        ctaLabel: 'Envoyer la Confirmation WhatsApp',
      },
    ],
    whatsappTemplateNote:
      'À préciser dans votre message WhatsApp (+39 351 912 7047) : nom utilisé sur Eventbrite, nombre total d’invités, heure d’arrivée prévue (avant 00h30 pour l’entrée gratuite + verre offert) et formule choisie (aperitivo, dîner sur demande ou soirée club).',
    dressLogisticsHeading: 'Accès 18+, Tenue Conseillée sous la Pluie et Accès au Club',
    dressLogisticsSubheading: 'Pièce d’identité physique originale (18+) et tenue soignée adaptée au Just Me Milano',
    dressCodeOkTitle: 'Tenue conseillée',
    dressCodeOkItems: [
      'Chemise, blazer ou maille élégante avec pantalon long et chaussures de ville propres',
      'Robe de cocktail, ensemble chic de soirée ou trench imperméable à déposer au vestiaire intérieur',
      'Bottines en cuir ou chaussures fermées élégantes adaptées à une soirée pluvieuse',
      'Carte d’identité, passeport ou permis physique original en cours de validité (18+)',
    ],
    dressCodeNoTitle: 'Refusé à l’entrée',
    dressCodeNoItems: [
      'Survêtements, shorts de sport, sweats à capuche ou maillots de football',
      'Claquettes, tenues de sport ou sacs volumineux',
      'Mineurs de moins de 18 ans ou simple photo de pièce d’identité sur téléphone',
      'Arrivée après 00h30 pour l’offre entrée gratuite + verre offert',
    ],
    logisticsHeading: 'Rejoindre Viale Luigi Camoens 2 au Sec dans Parco Sempione',
    logisticsParagraphs: [
      'Le Just Me Milano est installé au Viale Luigi Camoens 2 (20121 Milan), juste sous la silhouette illuminée de la Torre Branca à côté de la Triennale dans le Parco Sempione. Toute la verrière est hermétiquement fermée et chauffée en automne-hiver, avec un vestiaire intérieur dès l’entrée pour vos manteaux et parapluies.',
      'En métro, descendez à Cadorna FN (lignes M1 Rouge et M2 Verte, 6 minutes à pied sur trottoir asphalté) ou à Lanza Brera (ligne M2 Verte, 7 minutes). En cas de forte averse, les taxis déposent directement devant l’auvent d’entrée du Viale Luigi Camoens 2.',
    ],
    logisticsFacts: [
      { label: 'Adresse Exacte', value: 'Just Me Milano · Viale Luigi Camoens 2, 20121 Milano' },
      { label: 'Horaires Officiels', value: 'Mercredi 25 novembre 2026 · 19h30 – 05h00' },
      { label: 'Offre Nightlife Milan', value: 'Entrée Gratuite avant 00h30 + 1 Verre Offert' },
      { label: 'Option Dîner', value: 'Dîner sur demande via WhatsApp (+39 351 912 7047)' },
      { label: 'Métros Proches', value: 'Cadorna FN (M1/M2, 6 min) · Lanza Brera (M2, 7 min)' },
      { label: 'Âge Minimum', value: '18+ avec pièce d’identité physique originale' },
    ],
    mapHeading: 'Carte GPS Interactive · Just Me Milano (Torre Branca)',
    mapLabels: {
      loadMap: 'Charger la carte du Just Me Milano (Viale Camoens 2)',
      mapTitle: 'Carte interactive Just Me Milano · Parco Sempione',
      privacyLoadNotice: 'Pour respecter votre vie privée, Google Maps ne se charge qu’après votre clic.',
    },
    heroLabels: [
      'Arrivée des invités sous leurs parapluies devant la Torre Branca illuminée au Just Me Milano',
      'Aperitivo dès 19h30 sous la coupole de verre chauffée avec verre offert par Nightlife Milan',
      'Ambiance feutrée et tables de dîner sur demande à l’abri de la pluie dans Parco Sempione',
      'Piste de danse Commercial, Hip Hop et R&B animée jusqu’à 05h00 au Just Me Milano',
    ],
    venueBannerEyebrow: 'Just Me Milano · Parco Sempione',
    venueBannerTitle: 'Découvrir le Dossier Complet du Just Me Milano',
    venueBannerDesc: 'Architecture sous la Torre Branca, dress code et calendrier hebdomadaire.',
    venueCta: 'Voir le Club',
    thanksgivingBannerEyebrow: 'Jeudi 26 Novembre 2026 · Demain Soir',
    thanksgivingBannerTitle: 'Happy Thanksgiving au Just Me Milano',
    thanksgivingBannerDesc: 'Découvrez aussi la soirée spéciale du jeudi 26 novembre.',
    thanksgivingBannerCta: 'Voir 26 Nov',
    partenopeaBannerEyebrow: 'Vendredi 27 Novembre 2026 · Just Me',
    partenopeaBannerTitle: 'Cena Spettacolo Partenopea au Just Me',
    partenopeaBannerDesc: 'Dîner-spectacle italien en live et soirée club du vendredi 27 novembre.',
    partenopeaBannerCta: 'Voir 27 Nov',
    dec31BannerEyebrow: '31 Décembre 2026 · Nouvel An',
    dec31BannerTitle: 'Réveillon du Nouvel An au Just Me Milano',
    dec31BannerDesc: 'Découvrez la soirée officielle de la Saint-Sylvestre sous la Torre Branca.',
    dec31BannerCta: 'Voir 31 Déc',
    faqHeading: 'Questions Fréquentes · Just Singing in the Rain (25 Novembre 2026)',
    faqs: [
      {
        q: 'Que comprend exactement l’offre Just Singing in the Rain du mercredi 25 novembre ?',
        a: 'Elle comprend l’entrée gratuite avant 00h30 ainsi qu’un verre offert par Nightlife Milan au Just Me Milano le mercredi 25 novembre 2026.',
      },
      {
        q: 'Comment bénéficier de l’entrée gratuite et du verre offert ?',
        a: 'Réalisez deux étapes gratuites : inscrivez-vous sur Eventbrite via le bouton officiel de la page puis confirmez sur WhatsApp au +39 351 912 7047 le nombre de personnes, votre heure d’arrivée et votre choix entre aperitivo ou soirée club.',
      },
      {
        q: 'Jusqu’à quelle heure l’entrée gratuite avec verre offert est-elle valable ?',
        a: 'L’entrée gratuite avec verre offert par Nightlife Milan s’applique à toute arrivée effectuée avant 00h30.',
      },
      {
        q: 'Quels sont les horaires d’ouverture et de fermeture ?',
        a: 'Les portes ouvrent à 19h30 pour l’aperitivo et la fête se poursuit sans interruption jusqu’à 05h00 jeudi matin.',
      },
      {
        q: 'Est-il possible de dîner sur place ce mercredi soir ?',
        a: 'Oui, le dîner est proposé sur demande via WhatsApp en écrivant directement au concierge Nightlife Milan au +39 351 912 7047.',
      },
      {
        q: 'Quel style de musique est diffusé pendant la soirée ?',
        a: 'Vous danserez sur le son emblématique du Just Me Milano : Commercial, Hip Hop et R&B.',
      },
      {
        q: 'Quel est l’âge minimum requis à l’entrée ?',
        a: 'L’accès est réservé aux personnes majeures (18+) munies d’une pièce d’identité physique originale en cours de validité.',
      },
      {
        q: 'Le club est-il entièrement couvert et chauffé s’il pleut fort ?',
        a: 'Oui, toute la coupole vitrée sous la Torre Branca est fermée, chauffée et équipée d’un vestiaire intérieur.',
      },
      {
        q: 'Y a-t-il des frais de réservation ou un paiement en ligne ?',
        a: 'Aucun : l’inscription sur Eventbrite comme la confirmation par WhatsApp sont intégralement gratuites.',
      },
      {
        q: 'Puis-je rester pour la soirée club si j’arrive à 19h30 pour l’aperitivo ?',
        a: 'Oui, toute personne entrée dès 19h30 pour l’aperitivo peut rester librement jusqu’à 05h00 sans supplément.',
      },
      {
        q: 'Que dois-je écrire dans mon message WhatsApp au +39 351 912 7047 ?',
        a: 'Indiquez votre nom d’inscription Eventbrite, le nombre exact d’invités, votre heure d’arrivée prévue et votre formule (aperitivo, dîner sur demande ou soirée club).',
      },
      {
        q: 'Où se trouve exactement le Just Me Milano ?',
        a: 'Au Viale Luigi Camoens 2, 20121 Milan, dans le Parco Sempione au pied de la Torre Branca (à 6 minutes à pied du métro Cadorna FN).',
      },
    ],
  },
};

export const JUST_SINGING_RAIN_ALL_35: Record<LocaleCode, CompactRainPack> = {
  ...RAIN_LOCALES_30,
  ...FLAGSHIP_5,
};

export const JUST_SINGING_RAIN_SLUGS_35: Record<LocaleCode, string> = (() => {
  const out = {} as Record<LocaleCode, string>;
  for (const code of enabledLocaleCodes) {
    out[code] = JUST_SINGING_RAIN_ALL_35[code].slug;
  }
  return out;
})();

export function justSingingRainSlug(locale: string): string {
  const def = getLocaleDef(locale);
  const code: LocaleCode = def ? def.code : 'en';
  return JUST_SINGING_RAIN_SLUGS_35[code] || JUST_SINGING_RAIN_SLUGS_35.en;
}

export function justSingingRainPath(locale: string): string {
  const prefix = localePrefix(locale);
  const eventsDir = getLocalizedDir35('events', locale as LocaleCode);
  return `${prefix}/${eventsDir}/${justSingingRainSlug(locale)}`;
}

export function justSingingRainHreflangAlternates(
  baseUrl = 'https://nightlifemilan.com',
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of enabledLocaleCodes) {
    const def = getLocaleDef(loc);
    const key = def?.hreflang || loc;
    languages[key] = `${baseUrl}${justSingingRainPath(loc)}`;
  }
  languages['x-default'] = `${baseUrl}${justSingingRainPath('en')}`;
  return languages;
}

const CANONICAL_SLUGS_SET = new Set(
  Object.values(JUST_SINGING_RAIN_SLUGS_35).map((s) => s.toLowerCase()),
);

export function resolveJustSingingRainSlug(rawSlug: string): boolean {
  const norm = rawSlug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  if (!norm) return false;
  if (CANONICAL_SLUGS_SET.has(norm)) return true;
  if (
    norm === JUST_SINGING_RAIN_REPLACED_XCEED_ID ||
    norm === JUST_SINGING_RAIN_REPLACED_XCEED_SLUG ||
    norm === 'wednesday-night-225-249169' ||
    norm === 'just-singing-in-the-rain' ||
    norm === 'just-singing-in-the-rain-2026' ||
    norm === 'just-singing-in-the-rain-2026-11-25' ||
    norm === 'just-singing-in-the-rain-justme-milano' ||
    norm === 'just-singing-in-the-rain-justme-milano-2026-11-25'
  ) {
    return true;
  }
  if (norm.includes('just-singing-in-the-rain')) return true;
  if (norm.includes('249169')) return true;
  return false;
}

export interface JustSingingRainContent extends CompactRainPack {
  description: string;
  tocItems: Array<{ id: string; label: string }>;
}

const TOC_IDS = [
  'overview',
  'how-to-enter',
  'three-formats',
  'evening-timeline',
  'dress-code-18plus',
  'getting-there-dry',
  'faqs',
] as const;

export function getJustSingingRainContent(locale: string): JustSingingRainContent {
  const def = getLocaleDef(locale);
  const code: LocaleCode = def ? def.code : 'en';
  const pack = JUST_SINGING_RAIN_ALL_35[code] || JUST_SINGING_RAIN_ALL_35.en;
  return {
    ...pack,
    description: pack.overviewParagraphs.join(' '),
    tocItems: TOC_IDS.map((id, idx) => ({
      id,
      label: pack.tocLabels[idx],
    })),
  };
}
