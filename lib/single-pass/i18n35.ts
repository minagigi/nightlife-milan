import { DEFAULT_LOCALE, type LocaleCode } from '@/lib/i18n/locales';
import type { SinglePassPackageCategory, SinglePassVenueId } from './types';

export type SinglePassCopyPack = {
  seoTitle: string;
  seoDescription: string;
  navShopLabel: string;
  navCartLabel: string;
  navAccountLabel: string;
  heroEyebrow: string;
  heroH1: string;
  heroSubtitle: string;
  trustStripe: string;
  trustEqualPrice: string;
  trustWhatsAppDate: string;
  trustConciergeHost: string;
  filterHeading: string;
  filterAllVenues: string;
  filterAllCategories: string;
  categoryLabels: Record<SinglePassPackageCategory, string>;
  basePriceLabel: string;
  feeLabel: string;
  totalLabel: string;
  arrivalLabel: string;
  addToCartCta: string;
  buyNowCta: string;
  addedFeedback: string;
  viewVenueDetails: string;
  howItWorksEyebrow: string;
  howItWorksHeading: string;
  howItWorksSteps: ReadonlyArray<{ title: string; body: string }>;
  drawerTitle: string;
  drawerEmptyTitle: string;
  drawerEmptyBody: string;
  drawerExploreCta: string;
  drawerSubtotalLabel: string;
  drawerCheckoutCta: string;
  drawerAccountCta: string;
  removeItemLabel: string;
  checkoutTitle: string;
  checkoutSubtitle: string;
  formFullName: string;
  formAge: string;
  formWhatsapp: string;
  formWhatsappHint: string;
  formEmail: string;
  formPassword: string;
  formPasswordHint: string;
  formLanguages: string;
  formDietary: string;
  formTermsLabel: string;
  formPayStripeCta: string;
  pinetaUnder30Error: string;
  under18Error: string;
  bischeriAdvisory: string;
  accountTitle: string;
  accountSubtitle: string;
  tabLogin: string;
  tabRegister: string;
  tabOrderLookup: string;
  loginCta: string;
  registerCta: string;
  lookupCta: string;
  orderCodeLabel: string;
  logoutCta: string;
  passStatusPaid: string;
  passStatusPending: string;
  completeStripePaymentCta: string;
  miniGroupHeading: string;
  miniGroupScheduledBody: string;
  miniGroupActiveBody: string;
  openMiniGroupCta: string;
  updateProfileCta: string;
  venueShortLabels: Record<SinglePassVenueId, string>;
  embeddedBannerTitle: string;
  embeddedBannerBody: string;
  embeddedBannerCta: string;
};

const IT_PACK: SinglePassCopyPack = {
  seoTitle: 'Single Pass Capodanno Milano 2027 · Tavoli Condivisi & Stripe',
  seoDescription: 'Single Pass Capodanno Milano 2027 per chi festeggia da solo: 6 locali per età, tutti i pacchetti su Stripe (+15% fee), mini-gruppo WhatsApp dal 20/12. +39 351 912 7047.',
  navShopLabel: 'SINGLE PASS',
  navCartLabel: 'Carrello Single Pass',
  navAccountLabel: 'Area Riservata',
  heroEyebrow: 'E-COMMERCE UFFICIALE · CAPODANNO 2027 PER CHI VIENE DA SOLO O IN PICCOLI GRUPPI',
  heroH1: 'Single Pass Capodanno Milano 2027: scegli il tuo locale per età e prenota via Stripe',
  heroSubtitle: 'Vuoi festeggiare il 31 dicembre nei migliori club di Milano ma non hai una compagnia numerosa o vuoi unirti a un tavolo selezionato della tua stessa fascia d’età? Seleziona il tuo locale tra Gate, Pineta, REPVBLIC, Just Me, 55 Milano e Bischeri Over 50, aggiungi il pacchetto al carrello e completa il pagamento su Stripe con gestione dedicata.',
  trustStripe: 'Pagamento 100% gestito su Stripe (+15% Booking, Concierge Service & Entry Fee trasparente)',
  trustEqualPrice: 'Prezzo identico uomo e donna: nessuna tariffa ridotta o incentivo per genere',
  trustWhatsAppDate: 'Mini-gruppo WhatsApp ufficiale attivo dal 20 dicembre 2026 per conoscersi prima',
  trustConciergeHost: 'Ingresso coordinato insieme al nostro referente in Lista o Tavolo NIGHTLIFE MILAN',
  filterHeading: 'Filtra per fascia d’età, locale e formula di Capodanno',
  filterAllVenues: 'Tutti i 6 locali',
  filterAllCategories: 'Tutti i pacchetti',
  categoryLabels: {
    'all-night-combo': 'All-Night Cena + Tavolo',
    'vip-table-share': 'Quota Tavolo VIP Condiviso',
    'gala-dinner': 'Gran Cenone Tavolo Social',
    'royal-buffet': 'Royal Buffet Social',
    'club-entry': 'Ingresso Club Gruppo Social',
  },
  basePriceLabel: 'Prezzo pacchetto locale',
  feeLabel: '+15% Booking, Concierge Service & Entry Fee',
  totalLabel: 'Totale su Stripe',
  arrivalLabel: 'Orario ritrovo consigliato',
  addToCartCta: 'Aggiungi al Carrello',
  buyNowCta: 'Acquista su Stripe',
  addedFeedback: 'Aggiunto al carrello',
  viewVenueDetails: 'Scheda locale e dettagli',
  howItWorksEyebrow: 'COME FUNZIONA IL SINGLE PASS NIGHTLIFE MILAN',
  howItWorksHeading: 'Dalla prenotazione su Stripe al brindisi di mezzanotte senza sentirti mai fuori posto',
  howItWorksSteps: [
    {
      title: '1. Scegli fascia d’età e pacchetto',
      body: 'Ogni locale rispetta un target preciso: PERREO XL al Gate per 18–26, Pineta rigorosamente Under 30 (18–29), REPVBLIC internazionale 22–40, Just Me Luxury 30–49, 55 Milano 30–50 e Bischeri dedicato Over 50.',
    },
    {
      title: '2. Paga su Stripe in totale chiarezza',
      body: 'Tutti i Single Pass passano esclusivamente tramite Stripe con l’aggiunta esplicita del +15% per Booking, Concierge Service & Entry Fee. Uomo e donna pagano la stessa identica quota su ogni pacchetto.',
    },
    {
      title: '3. Accedi subito alla tua Area Riservata',
      body: 'Subito dopo l’acquisto trovi il tuo Single Pass digitale, la ricevuta completa, gli orari, il dress code e il pannello dedicato ai tuoi contatti per la formazione dei tavoli.',
    },
    {
      title: '4. Mini-gruppo WhatsApp dal 20 dicembre 2026',
      body: 'Dal 20 dicembre a seguire ti inseriamo nel mini-gruppo WhatsApp del tuo locale e della tua fascia d’età per presentarti ai compagni di tavolo e arrivare insieme all’ingresso.',
    },
  ],
  drawerTitle: 'Il tuo Carrello Single Pass',
  drawerEmptyTitle: 'Il carrello è vuoto',
  drawerEmptyBody: 'Scegli uno o più pacchetti tra i 6 locali ufficiali di Capodanno 2027 per chi partecipa da solo.',
  drawerExploreCta: 'Esplora i 6 locali Single Pass',
  drawerSubtotalLabel: 'Subtotale pacchetti base',
  drawerCheckoutCta: 'Vai al Checkout Stripe',
  drawerAccountCta: 'Apri Area Riservata',
  removeItemLabel: 'Rimuovi',
  checkoutTitle: 'Carrello e Checkout Single Pass · Stripe',
  checkoutSubtitle: 'Compila i tuoi dati reali: età, lingua e numero WhatsApp servono dal 20 dicembre per abbinarti al gruppo giusto ed evitare respingimenti all’ingresso.',
  formFullName: 'Nome e Cognome (come su documento)',
  formAge: 'Età esatta al 31/12/2026',
  formWhatsapp: 'Numero WhatsApp (con prefisso, es. +39 3...)',
  formWhatsappHint: 'Usato dal 20 dicembre 2026 in poi per inserirti nel mini-gruppo ufficiale del locale.',
  formEmail: 'Email per pass e ricevuta Stripe',
  formPassword: 'Password per la tua Area Riservata (min. 8 caratteri)',
  formPasswordHint: 'Se hai già acquistato prima con questa email, inserisci la tua password o accedi dal portale.',
  formLanguages: 'Lingue parlate (per abbinamento internazionale o italiano)',
  formDietary: 'Scelta menù (Terra/Mare) o allergie alimentari',
  formTermsLabel: 'Confermo che il prezzo include +15% Booking, Concierge Service & Entry Fee su Stripe, accetto dress code/target età del locale e l’attivazione del mini-gruppo WhatsApp dal 20 dicembre.',
  formPayStripeCta: 'Paga ora su Stripe',
  pinetaUnder30Error: 'Pineta Milano ammette tassativamente solo pubblico Under 30 (18–29 anni). Per la tua età ti consigliamo Just Me (30–49), 55 Milano (30–50), REPVBLIC (22–40) oppure Bischeri Over 50.',
  under18Error: 'L’ingresso a tutti gli eventi di Capodanno 2027 è riservato ai maggiorenni (18+ anni compiuti).',
  bischeriAdvisory: 'Per la fascia dai 50 anni in su consigliamo in particolare la tavolata Over 50 di Bischeri Milano oppure 55 Milano.',
  accountTitle: 'Area Riservata Single Pass · Nightlife Milan',
  accountSubtitle: 'Consulta i tuoi pass pagati su Stripe, scarica i dettagli d’ingresso e controlla l’attivazione del mini-gruppo WhatsApp dal 20 dicembre 2026.',
  tabLogin: 'Accedi con Password',
  tabRegister: 'Crea Account',
  tabOrderLookup: 'Codice Ordine Rapido',
  loginCta: 'Entra in Area Riservata',
  registerCta: 'Attiva Area Riservata',
  lookupCta: 'Apri i miei Pass',
  orderCodeLabel: 'Codice Ordine (es. NLM-SP-...)',
  logoutCta: 'Esci',
  passStatusPaid: 'PAGATO SU STRIPE · PASS CONFERMATO',
  passStatusPending: 'ORDINE REGISTRATO · IN ATTESA PAGAMENTO STRIPE',
  completeStripePaymentCta: 'Completa Pagamento su Stripe',
  miniGroupHeading: 'Stato Mini-Gruppo WhatsApp Ufficiale',
  miniGroupScheduledBody: 'Programmazione attiva dal 20 dicembre 2026 in poi: il nostro concierge aprirà il gruppo WhatsApp dedicato per il tuo locale e la tua fascia d’età sul numero verificato qui sopra.',
  miniGroupActiveBody: 'Il tuo mini-gruppo WhatsApp ufficiale è pronto. Entra ora per conoscere il tuo gruppo prima del 31 dicembre.',
  openMiniGroupCta: 'Entra nel Mini-Gruppo WhatsApp',
  updateProfileCta: 'Aggiorna WhatsApp e Lingue',
  venueShortLabels: {
    gate: 'PERREO XL Gate (18–26)',
    pineta: 'Pineta Under 30 (18–29)',
    repvblic: 'REPVBLIC Intl (22–40)',
    justme: 'Just Me Luxury (30–49)',
    '55-milano': '55 Milano Loft (30–50)',
    bischeri: 'Bischeri Over 50 (50+)',
  },
  embeddedBannerTitle: 'Partecipi da solo o vuoi unirti a un tavolo selezionato?',
  embeddedBannerBody: 'Acquista tutti i pacchetti in versione Single Pass su Stripe (+15% Booking, Concierge Service & Entry Fee). Nessun incentivo o differenza di prezzo uomo/donna e mini-gruppo WhatsApp attivo dal 20 dicembre 2026.',
  embeddedBannerCta: 'Apri lo Shop Single Pass',
};

const EN_PACK: SinglePassCopyPack = {
  seoTitle: 'Milan New Year’s Eve 2027 Single Pass · Shared VIP Tables & Stripe',
  seoDescription: 'Milan NYE 2027 Single Pass e-commerce for solo guests: 6 age-matched venues, all packages via Stripe (+15% fee), official WhatsApp mini-groups from Dec 20. +39 351 912 7047.',
  navShopLabel: 'SINGLE PASS',
  navCartLabel: 'Single Pass Cart',
  navAccountLabel: 'My Account',
  heroEyebrow: 'OFFICIAL E-COMMERCE · NEW YEAR’S EVE 2027 FOR SOLO GUESTS & SMALL GROUPS',
  heroH1: 'Milan NYE 2027 Single Pass: pick your age-matched club and pay via Stripe',
  heroSubtitle: 'Celebrating December 31 in Milan solo or looking to join a curated table in your exact age range? Pick from Gate PERREO XL, Pineta Under 30, REPVBLIC International, Just Me, 55 Milano and Bischeri Over 50, add your pass to the cart and pay securely through Stripe.',
  trustStripe: '100% handled via Stripe (+15% transparent Booking, Concierge Service & Entry Fee)',
  trustEqualPrice: 'Identical pricing for men and women on every package: zero gender discounts',
  trustWhatsAppDate: 'Official WhatsApp mini-groups open from December 20, 2026 onwards',
  trustConciergeHost: 'Coordinated arrival with our Nightlife Milan host at the dedicated Lista / Tavolo entrance',
  filterHeading: 'Filter by age bracket, venue and NYE package format',
  filterAllVenues: 'All 6 venues',
  filterAllCategories: 'All packages',
  categoryLabels: {
    'all-night-combo': 'All-Night Dinner + Table',
    'vip-table-share': 'Shared VIP Table Quota',
    'gala-dinner': 'Gala Dinner Social Table',
    'royal-buffet': 'Social Royal Buffet',
    'club-entry': 'Social Group Club Entry',
  },
  basePriceLabel: 'Venue package price',
  feeLabel: '+15% Booking, Concierge Service & Entry Fee',
  totalLabel: 'Total on Stripe',
  arrivalLabel: 'Recommended check-in time',
  addToCartCta: 'Add to Cart',
  buyNowCta: 'Pay with Stripe',
  addedFeedback: 'Added to cart',
  viewVenueDetails: 'Venue details and full guide',
  howItWorksEyebrow: 'HOW NIGHTLIFE MILAN SINGLE PASS WORKS',
  howItWorksHeading: 'From Stripe checkout to midnight champagne without arriving alone',
  howItWorksSteps: [
    {
      title: '1. Pick your venue by age and music',
      body: 'PERREO XL @ Gate covers 18–26 urban/reggaeton, Pineta is strictly Under 30 (18–29), REPVBLIC fits 22–40 international guests, Just Me caters to 30–49 luxury, 55 Milano welcomes 30–50 loft dinner show lovers, and Bischeri is tailored for Over 50.',
    },
    {
      title: '2. Pay via Stripe with +15% Concierge Fee',
      body: 'Every Single Pass is processed exclusively through Stripe with a clear +15% Booking, Concierge Service & Entry Fee breakdown. Equal pricing applies to men and women.',
    },
    {
      title: '3. Access your Customer Reserved Area',
      body: 'Immediately view your digital Single Pass order code, itemized Stripe receipt, venue arrival guidelines and dress code inside your private account portal.',
    },
    {
      title: '4. Official WhatsApp mini-group from December 20',
      body: 'From December 20 onwards, our concierge connects verified Single Pass holders per venue and age bracket in an official WhatsApp mini-group so you enter together.',
    },
  ],
  drawerTitle: 'Your Single Pass Cart',
  drawerEmptyTitle: 'Your cart is empty',
  drawerEmptyBody: 'Choose any Single Pass package across our 6 curated New Year’s Eve venues in Milan.',
  drawerExploreCta: 'Browse Single Pass Storefront',
  drawerSubtotalLabel: 'Packages base subtotal',
  drawerCheckoutCta: 'Proceed to Stripe Checkout',
  drawerAccountCta: 'Open Reserved Area',
  removeItemLabel: 'Remove',
  checkoutTitle: 'Single Pass Cart & Stripe Checkout',
  checkoutSubtitle: 'Provide accurate attendee details: age, spoken languages and WhatsApp number ensure proper venue matching starting December 20.',
  formFullName: 'Full Name (matching ID)',
  formAge: 'Exact Age on 31 Dec 2026',
  formWhatsapp: 'WhatsApp Number (with country code, e.g. +39 3...)',
  formWhatsappHint: 'Used from December 20, 2026 onwards to add you to your official venue mini-group.',
  formEmail: 'Email for pass & Stripe receipt',
  formPassword: 'Create Reserved Area Password (min. 8 chars)',
  formPasswordHint: 'Already registered with this email? Enter your existing password or sign in later.',
  formLanguages: 'Spoken Languages (for table & social matching)',
  formDietary: 'Dinner menu choice (Land/Sea) or dietary notes',
  formTermsLabel: 'I understand the total includes +15% Booking, Concierge Service & Entry Fee on Stripe, agree to equal M/F pricing, venue age/dress policy and Dec 20 WhatsApp group activation.',
  formPayStripeCta: 'Pay Securely on Stripe',
  pinetaUnder30Error: 'Pineta Milano strictly admits Under 30 guests only (ages 18–29). For ages 30+, please select Just Me (30–49), 55 Milano (30–50), REPVBLIC (22–40) or Bischeri Over 50.',
  under18Error: 'All New Year’s Eve 2027 events in Milan strictly require attendees to be 18 or older.',
  bischeriAdvisory: 'For guests aged 50 and above, our Bischeri Over 50 social table and 55 Milano offer the closest peer experience.',
  accountTitle: 'Single Pass Reserved Area · Nightlife Milan',
  accountSubtitle: 'Review your Stripe-paid passes, arrival details and official December 20 WhatsApp mini-group status.',
  tabLogin: 'Sign In',
  tabRegister: 'Create Account',
  tabOrderLookup: 'Quick Order Lookup',
  loginCta: 'Enter Reserved Area',
  registerCta: 'Create Account',
  lookupCta: 'Find My Pass',
  orderCodeLabel: 'Order Reference (e.g. NLM-SP-...)',
  logoutCta: 'Sign Out',
  passStatusPaid: 'PAID ON STRIPE · PASS CONFIRMED',
  passStatusPending: 'ORDER SAVED · AWAITING STRIPE PAYMENT',
  completeStripePaymentCta: 'Complete Stripe Payment',
  miniGroupHeading: 'Official WhatsApp Mini-Group Status',
  miniGroupScheduledBody: 'Scheduled from December 20, 2026 onwards: our concierge opens your venue and age-matched WhatsApp mini-group using the verified number above.',
  miniGroupActiveBody: 'Your official WhatsApp mini-group is live. Join now to meet your tablemates before New Year’s Eve.',
  openMiniGroupCta: 'Join WhatsApp Mini-Group',
  updateProfileCta: 'Update WhatsApp & Languages',
  venueShortLabels: {
    gate: 'PERREO XL Gate (18–26)',
    pineta: 'Pineta Under 30 (18–29)',
    repvblic: 'REPVBLIC Intl (22–40)',
    justme: 'Just Me Luxury (30–49)',
    '55-milano': '55 Milano Loft (30–50)',
    bischeri: 'Bischeri Over 50 (50+)',
  },
  embeddedBannerTitle: 'Joining solo or booking a shared VIP table?',
  embeddedBannerBody: 'Buy any official Single Pass package directly via Stripe (+15% Booking, Concierge Service & Entry Fee). Identical pricing for men and women, with official WhatsApp mini-groups opening from December 20.',
  embeddedBannerCta: 'Open Single Pass Shop',
};

type LocalizedOverride = Partial<SinglePassCopyPack>;

function makeLocalePack(ov: LocalizedOverride): SinglePassCopyPack {
  return {
    ...EN_PACK,
    ...ov,
    categoryLabels: { ...EN_PACK.categoryLabels, ...(ov.categoryLabels || {}) },
    venueShortLabels: { ...EN_PACK.venueShortLabels, ...(ov.venueShortLabels || {}) },
    howItWorksSteps: ov.howItWorksSteps || EN_PACK.howItWorksSteps,
  };
}

export const SINGLE_PASS_COPY_35: Readonly<Record<LocaleCode, SinglePassCopyPack>> = {
  en: EN_PACK,
  it: IT_PACK,
  es: makeLocalePack({
    seoTitle: 'Single Pass Nochevieja Milán 2027 · Mesas VIP y Stripe',
    seoDescription: 'Single Pass Nochevieja Milán 2027 para quienes viajan o salen solos: 6 locales por edad, pago Stripe (+15% fee), mini-grupo WhatsApp desde el 20/12. +39 351 912 7047.',
    navShopLabel: 'SINGLE PASS',
    navCartLabel: 'Carrito Single Pass',
    navAccountLabel: 'Área Privada',
    heroH1: 'Single Pass Nochevieja Milán 2027: elige tu club por edad y reserva con Stripe',
    heroSubtitle: 'Compra cualquier paquete en formato Single Pass o cuota de mesa VIP compartida entre Gate PERREO XL, Pineta Under 30, REPVBLIC, Just Me, 55 Milano y Bischeri Over 50.',
    trustStripe: 'Pago 100% mediante Stripe (+15% Booking, Concierge Service & Entry Fee)',
    trustEqualPrice: 'Mismo precio exacto para hombres y mujeres en todos los paquetes',
    trustWhatsAppDate: 'Mini-grupo oficial de WhatsApp activo desde el 20 de diciembre de 2026',
    addToCartCta: 'Añadir al Carrito',
    buyNowCta: 'Pagar con Stripe',
    drawerTitle: 'Tu Carrito Single Pass',
    drawerCheckoutCta: 'Ir al Pago en Stripe',
    drawerAccountCta: 'Área Privada',
    checkoutTitle: 'Carrito y Pago Stripe · Single Pass',
    formPayStripeCta: 'Pagar en Stripe',
    accountTitle: 'Área Privada Single Pass · Nightlife Milan',
    tabLogin: 'Iniciar Sesión',
    tabRegister: 'Crear Cuenta',
    tabOrderLookup: 'Buscar Pedido',
  }),
  fr: makeLocalePack({
    seoTitle: 'Single Pass Nouvel An Milan 2027 · Tables VIP et Stripe',
    seoDescription: 'Single Pass Saint-Sylvestre Milan 2027 pour personnes seules : 6 clubs par âge, paiement Stripe (+15% de frais), mini-groupe WhatsApp dès le 20/12. +39 351 912 7047.',
    navShopLabel: 'SINGLE PASS',
    navCartLabel: 'Panier Single Pass',
    navAccountLabel: 'Espace Membre',
    heroH1: 'Single Pass Nouvel An Milan 2027 : choisissez votre club par âge sur Stripe',
    trustStripe: 'Paiement 100% géré via Stripe (+15% Booking, Concierge Service & Entry Fee)',
    trustEqualPrice: 'Tarif identique hommes et femmes sur toutes les formules',
    trustWhatsAppDate: 'Mini-groupe WhatsApp officiel activé à partir du 20 décembre 2026',
    addToCartCta: 'Ajouter au Panier',
    buyNowCta: 'Payer sur Stripe',
    drawerTitle: 'Votre Panier Single Pass',
    drawerCheckoutCta: 'Finaliser sur Stripe',
    drawerAccountCta: 'Espace Membre',
    checkoutTitle: 'Panier et Paiement Stripe · Single Pass',
    formPayStripeCta: 'Payer via Stripe',
    accountTitle: 'Espace Réservé Single Pass · Nightlife Milan',
    tabLogin: 'Connexion',
    tabRegister: 'Créer un Compte',
    tabOrderLookup: 'Accès Commande',
  }),
  de: makeLocalePack({
    seoTitle: 'Single Pass Silvester Mailand 2027 · VIP-Tische & Stripe',
    seoDescription: 'Silvester Mailand 2027 Single Pass für Alleinreisende & Solos: 6 Clubs nach Altersgruppe, Stripe-Checkout (+15% Gebühr), WhatsApp-Minigruppe ab 20.12. +39 351 912 7047.',
    navShopLabel: 'SINGLE PASS',
    navCartLabel: 'Warenkorb',
    navAccountLabel: 'Kundenbereich',
    heroH1: 'Single Pass Silvester Mailand 2027: Club nach Alter wählen und via Stripe zahlen',
    trustStripe: '100% Stripe-Abwicklung (+15% Booking, Concierge Service & Entry Fee)',
    trustEqualPrice: 'Einheitliche Preise für Frauen und Männer bei allen Paketen',
    trustWhatsAppDate: 'Offizielle WhatsApp-Minigruppen starten ab dem 20. Dezember 2026',
    addToCartCta: 'In den Warenkorb',
    buyNowCta: 'Mit Stripe zahlen',
    drawerTitle: 'Single Pass Warenkorb',
    drawerCheckoutCta: 'Zur Stripe-Kasse',
    drawerAccountCta: 'Kundenbereich',
    checkoutTitle: 'Warenkorb & Stripe-Checkout',
    formPayStripeCta: 'Sicher via Stripe zahlen',
    accountTitle: 'Kundenbereich Single Pass · Nightlife Milan',
    tabLogin: 'Anmelden',
    tabRegister: 'Konto erstellen',
    tabOrderLookup: 'Bestellung finden',
  }),
  pt: makeLocalePack({
    seoTitle: 'Single Pass Réveillon Milão 2027 · Mesas Partilhadas e Stripe',
    seoDescription: 'Single Pass Passagem de Ano Milão 2027 para quem vai sozinho: 6 clubes por idade, pagamento Stripe (+15% taxa), minigrupo WhatsApp desde 20/12. +39 351 912 7047.',
    navShopLabel: 'SINGLE PASS',
    navCartLabel: 'Carrinho Single Pass',
    navAccountLabel: 'Área Reservada',
    heroH1: 'Single Pass Réveillon Milão 2027: escolhe o clube pela idade e paga via Stripe',
    addToCartCta: 'Adicionar ao Carrinho',
    buyNowCta: 'Pagar no Stripe',
    drawerTitle: 'Carrinho Single Pass',
    drawerCheckoutCta: 'Ir para o Stripe',
    drawerAccountCta: 'Área Reservada',
    checkoutTitle: 'Carrinho e Checkout Stripe · Single Pass',
    accountTitle: 'Área Reservada Single Pass · Nightlife Milan',
  }),
  nl: makeLocalePack({
    navShopLabel: 'SINGLE PASS',
    navCartLabel: 'Winkelwagen',
    navAccountLabel: 'Mijn Account',
    heroH1: 'Single Pass Oud en Nieuw Milaan 2027: kies je club op leeftijd en betaal via Stripe',
    addToCartCta: 'In Winkelwagen',
    buyNowCta: 'Betaal met Stripe',
    drawerTitle: 'Single Pass Winkelwagen',
    drawerCheckoutCta: 'Naar Stripe Betaling',
  }),
  ru: makeLocalePack({
    seoTitle: 'Single Pass Новый год Милан 2027 · Общие VIP-столы и Stripe',
    navShopLabel: 'SINGLE PASS',
    navCartLabel: 'Корзина',
    navAccountLabel: 'Личный кабинет',
    heroH1: 'Single Pass Новый год в Милане 2027: выбор клуба по возрасту и оплата через Stripe',
    addToCartCta: 'В корзину',
    buyNowCta: 'Оплатить в Stripe',
    drawerTitle: 'Корзина Single Pass',
    drawerCheckoutCta: 'Перейти к оплате Stripe',
    drawerAccountCta: 'Личный кабинет',
    accountTitle: 'Личный кабинет Single Pass · Nightlife Milan',
  }),
  tr: makeLocalePack({
    navShopLabel: 'SINGLE PASS',
    navCartLabel: 'Sepet',
    navAccountLabel: 'Hesabım',
    heroH1: 'Milano Yılbaşı 2027 Single Pass: yaş grubuna göre kulüp seç ve Stripe ile öde',
    addToCartCta: 'Sepete Ekle',
    buyNowCta: 'Stripe ile Öde',
    drawerCheckoutCta: 'Stripe Ödemeye Geç',
  }),
  zh: makeLocalePack({
    navShopLabel: 'SINGLE PASS',
    navCartLabel: '购物车',
    navAccountLabel: '个人中心',
    heroH1: '2027 米兰跨年 Single Pass 独立通行证：按年龄选择夜店并用 Stripe 安全支付',
    addToCartCta: '加入购物车',
    buyNowCta: 'Stripe 立即支付',
    drawerTitle: 'Single Pass 购物车',
    drawerCheckoutCta: '前往 Stripe 结账',
    drawerAccountCta: '个人中心',
    accountTitle: 'Single Pass 会员专区 · Nightlife Milan',
  }),
  ar: makeLocalePack({
    navShopLabel: 'SINGLE PASS',
    navCartLabel: 'سلة التسوق',
    navAccountLabel: 'حسابي',
    heroH1: 'بطاقة Single Pass رأس السنة في ميلانو 2027: اختر النادي حسب الفئة العمرية وادفع عبر Stripe',
    addToCartCta: 'أضف إلى السلة',
    buyNowCta: 'ادفع عبر Stripe',
    drawerTitle: 'سلة Single Pass',
    drawerCheckoutCta: 'المتابعة للدفع عبر Stripe',
    drawerAccountCta: 'حسابي',
    accountTitle: 'منطقة الأعضاء Single Pass · Nightlife Milan',
  }),
  bg: makeLocalePack({ navCartLabel: 'Кошница', navAccountLabel: 'Профил', addToCartCta: 'Добави в кошницата' }),
  hr: makeLocalePack({ navCartLabel: 'Košarica', navAccountLabel: 'Moj račun', addToCartCta: 'Dodaj u košaricu' }),
  cs: makeLocalePack({ navCartLabel: 'Košík', navAccountLabel: 'Můj účet', addToCartCta: 'Přidat do košíku' }),
  da: makeLocalePack({ navCartLabel: 'Indkøbskurv', navAccountLabel: 'Min konto', addToCartCta: 'Læg i kurv' }),
  et: makeLocalePack({ navCartLabel: 'Ostukorv', navAccountLabel: 'Minu konto', addToCartCta: 'Lisa ostukorvi' }),
  fi: makeLocalePack({ navCartLabel: 'Ostoskori', navAccountLabel: 'Oma tili', addToCartCta: 'Lisää ostoskoriin' }),
  el: makeLocalePack({
    navCartLabel: 'Καλάθι',
    navAccountLabel: 'Λογαριασμός',
    addToCartCta: 'Προσθήκη στο καλάθι',
    buyNowCta: 'Πληρωμή μέσω Stripe',
  }),
  hu: makeLocalePack({ navCartLabel: 'Kosár', navAccountLabel: 'Fiókom', addToCartCta: 'Kosárba' }),
  ga: makeLocalePack({ navCartLabel: 'Cairt', navAccountLabel: 'Mo Chuntas', addToCartCta: 'Cuir sa chairt' }),
  lv: makeLocalePack({ navCartLabel: 'Grozs', navAccountLabel: 'Mans konts', addToCartCta: 'Pievienot grozam' }),
  lt: makeLocalePack({ navCartLabel: 'Krepšelis', navAccountLabel: 'Mano paskyra', addToCartCta: 'Į krepšelį' }),
  mt: makeLocalePack({ navCartLabel: 'Karrettun', navAccountLabel: 'Kont Tiegħi', addToCartCta: 'Żid mal-karrettun' }),
  pl: makeLocalePack({
    navCartLabel: 'Koszyk',
    navAccountLabel: 'Moje konto',
    heroH1: 'Single Pass Sylwester Mediolan 2027: wybierz klub dla swojej grupy wiekowej i zapłać przez Stripe',
    addToCartCta: 'Dodaj do koszyka',
    buyNowCta: 'Zapłać przez Stripe',
    drawerCheckoutCta: 'Przejdź do Stripe',
  }),
  ro: makeLocalePack({
    navCartLabel: 'Coș',
    navAccountLabel: 'Contul meu',
    heroH1: 'Single Pass Revelion Milano 2027: alege clubul după vârstă și plătește prin Stripe',
    addToCartCta: 'Adaugă în coș',
    buyNowCta: 'Plătește cu Stripe',
    drawerCheckoutCta: 'Finalizează pe Stripe',
  }),
  sk: makeLocalePack({ navCartLabel: 'Košík', navAccountLabel: 'Môj účet', addToCartCta: 'Pridať do košíka' }),
  sl: makeLocalePack({ navCartLabel: 'Košarica', navAccountLabel: 'Moj račun', addToCartCta: 'Dodaj v košarico' }),
  sv: makeLocalePack({ navCartLabel: 'Varukorg', navAccountLabel: 'Mitt konto', addToCartCta: 'Lägg i varukorg' }),
  no: makeLocalePack({ navCartLabel: 'Handlekurv', navAccountLabel: 'Min konto', addToCartCta: 'Legg i handlekurv' }),
  is: makeLocalePack({ navCartLabel: 'Karfa', navAccountLabel: 'Minn reikningur', addToCartCta: 'Setja í körfu' }),
  uk: makeLocalePack({
    navCartLabel: 'Кошик',
    navAccountLabel: 'Особистий кабінет',
    heroH1: 'Single Pass Новий рік у Мілані 2027: вибір клубу за віком та оплата через Stripe',
    addToCartCta: 'Додати в кошик',
    buyNowCta: 'Оплатити через Stripe',
  }),
  sq: makeLocalePack({ navCartLabel: 'Shporta', navAccountLabel: 'Llogaria ime', addToCartCta: 'Shto në shportë' }),
  sr: makeLocalePack({ navCartLabel: 'Korpa', navAccountLabel: 'Moj nalog', addToCartCta: 'Dodaj u korpu' }),
  bs: makeLocalePack({ navCartLabel: 'Korpa', navAccountLabel: 'Moj račun', addToCartCta: 'Dodaj u korpu' }),
  mk: makeLocalePack({ navCartLabel: 'Кошничка', navAccountLabel: 'Мој профил', addToCartCta: 'Додај во кошничка' }),
};

export function getSinglePassCopy(locale: string): SinglePassCopyPack {
  return (SINGLE_PASS_COPY_35 as Record<string, SinglePassCopyPack>)[locale] || SINGLE_PASS_COPY_35[DEFAULT_LOCALE];
}
