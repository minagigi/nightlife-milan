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
  trustOnlinePayment: string;
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
  guestsLabel: string;
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
  drawerCartCta: string;
  drawerAccountCta: string;
  removeItemLabel: string;
  checkoutTitle: string;
  checkoutSubtitle: string;
  stepDetailsLabel: string;
  stepPaymentLabel: string;
  currencySelectorLabel: string;
  fxRateNotice: string;
  eurOriginalLabel: string;
  billingTotalLabel: string;
  chargedInCurrencyLabel: string;
  proceedToPaymentCta: string;
  paySafelyCta: string;
  paymentProcessingLabel: string;
  backToDetailsCta: string;
  formFullName: string;
  formAge: string;
  formCountry: string;
  formWhatsapp: string;
  formWhatsappHint: string;
  formEmail: string;
  formCreateAccountToggle: string;
  formPassword: string;
  formPasswordHint: string;
  formLanguages: string;
  formDietary: string;
  formTermsLabel: string;
  termsPolicyLabel: string;
  privacyPolicyLabel: string;
  refundPolicyLabel: string;
  formPayNowCta: string;
  pinetaUnder30Error: string;
  under18Error: string;
  justme21PlusError: string;
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
  orderIdLabel: string;
  logoutCta: string;
  passStatusPaid: string;
  passStatusPending: string;
  completePaymentCta: string;
  miniGroupHeading: string;
  miniGroupNoticeBody: string;
  miniGroupScheduledBody: string;
  miniGroupActiveBody: string;
  openMiniGroupCta: string;
  updateProfileCta: string;
  viewVoucherCta: string;
  thankYouEyebrow: string;
  thankYouHeading: string;
  thankYouSubtitle: string;
  customerContactsHeading: string;
  venueShortLabels: Record<SinglePassVenueId, string>;
  embeddedBannerTitle: string;
  embeddedBannerBody: string;
  embeddedBannerCta: string;
};

const IT_PACK: SinglePassCopyPack = {
  seoTitle: 'Single Pass Capodanno Milano 2027 · Tavoli Condivisi Online',
  seoDescription:
    'Single Pass Capodanno Milano 2027 per chi festeggia da solo: 8 locali confermati per età, acquisto diretto sul sito (+15% fee), mini-gruppo WhatsApp dal 20/12.',
  navShopLabel: 'SINGLE PASS',
  navCartLabel: 'Carrello',
  navAccountLabel: 'Area Riservata',
  heroEyebrow: 'E-COMMERCE UFFICIALE · CAPODANNO 2027 PER CHI VIENE DA SOLO O IN PICCOLI GRUPPI',
  heroH1: 'Single Pass Capodanno Milano 2027: scegli il locale per età e acquista sul sito',
  heroSubtitle:
    'Vuoi festeggiare il 31 dicembre nei migliori club di Milano ma non hai una compagnia numerosa o vuoi unirti a un tavolo della tua stessa fascia d’età? Scegli tra Gate, Pineta, REPVBLIC, Just Me Torre Branca, Bobino Legends, Voya Rooftop, JustMe Garda e Bischeri Over 50, aggiungi il pacchetto al carrello e completa il pagamento direttamente su Nightlife Milan.',
  trustOnlinePayment:
    'Checkout nativo direttamente sul sito (+15% Booking, Concierge Service & Entry Fee trasparente)',
  trustEqualPrice: 'Prezzo identico uomo e donna: nessuna tariffa ridotta o incentivo per genere',
  trustWhatsAppDate: 'Mini-gruppo WhatsApp ufficiale attivo dal 20 dicembre 2026 in poi',
  trustConciergeHost: 'Ingresso coordinato insieme al nostro referente in Lista o Tavolo NIGHTLIFE MILAN',
  filterHeading: 'Filtra per fascia d’età, locale e formula confermata',
  filterAllVenues: 'Tutti i locali confermati',
  filterAllCategories: 'Tutti i pacchetti',
  categoryLabels: {
    'all-night-combo': 'All-Night Cena + Tavolo',
    'vip-table-share': 'Quota Tavolo VIP Condiviso',
    'vip-table-full': 'Tavolo VIP Intero Riservato',
    'gala-dinner': 'Gran Cenone Servito',
    'royal-buffet': 'Royal Buffet Social',
    'club-entry': 'Ingresso Club Ufficiale',
    'holiday-special': 'Menu Speciale Festivo',
  },
  basePriceLabel: 'Tariffa ufficiale (EUR)',
  feeLabel: '+15% Booking, Concierge Service & Entry Fee',
  totalLabel: 'Totale Ordine',
  arrivalLabel: 'Orario ingresso consigliato',
  guestsLabel: 'Ospiti inclusi',
  addToCartCta: 'Aggiungi al Carrello',
  buyNowCta: 'Acquista Ora',
  addedFeedback: 'Aggiunto al carrello',
  viewVenueDetails: 'Scheda locale e dettagli',
  howItWorksEyebrow: 'COME FUNZIONA IL SINGLE PASS NIGHTLIFE MILAN',
  howItWorksHeading: 'Dall’acquisto online al brindisi di mezzanotte senza sentirti mai fuori posto',
  howItWorksSteps: [
    {
      title: '1. Scegli fascia d’età e pacchetto confermato',
      body: 'Ogni locale rispetta un target preciso: PERREO XL al Gate (18–26), Pineta Under 30 tassativo (18–29), REPVBLIC internazionale (22–40), Just Me Luxury (30–49), Voya Rooftop (25–50), JustMe Garda (21+) e Bischeri Navigli (Over 50).',
    },
    {
      title: '2. Paga sul sito nella tua valuta con +15% trasparente',
      body: 'I prezzi base in Euro vengono convertiti in tempo reale nella tua valuta locale al checkout. La maggiorazione fissa del +15% copre booking, assistenza concierge e lista nominale.',
    },
    {
      title: '3. Crea il tuo account e scarica il Pass',
      body: 'Completa la registrazione direttamente nel checkout o accedi alla tua Area Riservata per scaricare subito il codice ordine, il PIN d’ingresso e la ricevuta ufficiale.',
    },
    {
      title: '4. Mini-gruppo WhatsApp dal 20 dicembre 2026',
      body: 'Dal 20 dicembre in poi ti inseriamo nel mini-gruppo WhatsApp del tuo locale e della tua fascia d’età sul numero verificato nell’ordine per entrare insieme.',
    },
  ],
  drawerTitle: 'Il tuo Carrello',
  drawerEmptyTitle: 'Il carrello è vuoto',
  drawerEmptyBody: 'Aggiungi uno dei pacchetti con tariffa ufficiale confermata da qualsiasi scheda evento o dallo shop Single Pass.',
  drawerExploreCta: 'Esplora i pacchetti confermati',
  drawerSubtotalLabel: 'Subtotale pacchetti (EUR)',
  drawerCheckoutCta: 'Vai al Checkout',
  drawerCartCta: 'Rivedi Carrello',
  drawerAccountCta: 'Area Riservata',
  removeItemLabel: 'Rimuovi',
  checkoutTitle: 'Checkout Ufficiale · Nightlife Milan',
  checkoutSubtitle:
    'Completa registrazione e pagamento direttamente su nightlifemilan.com senza lasciare il sito. Telefono ed email sono obbligatori per il voucher e i mini-gruppi.',
  stepDetailsLabel: '1. Dati Cliente & Account',
  stepPaymentLabel: '2. Pagamento Crittografato sul Sito',
  currencySelectorLabel: 'Valuta di pagamento al checkout',
  fxRateNotice: 'Prezzo originale in Euro convertito in tempo reale al tasso ufficiale di riferimento',
  eurOriginalLabel: 'Equivalente listino originale (EUR)',
  billingTotalLabel: 'Totale addebitato',
  chargedInCurrencyLabel: 'Importo convertito addebitato',
  proceedToPaymentCta: 'Continua al Pagamento',
  paySafelyCta: 'Completa Ordine in Sicurezza',
  paymentProcessingLabel: 'Conferma pagamento in corso...',
  backToDetailsCta: 'Modifica dati ordine',
  formFullName: 'Nome e Cognome (come su documento)',
  formAge: 'Età al 31/12/2026',
  formCountry: 'Paese di residenza',
  formWhatsapp: 'Numero di Telefono / WhatsApp (obbligatorio, es. +39 3...)',
  formWhatsappHint: 'Indispensabile per ricevere il pass, assistenza concierge 24/7 e accedere ai mini-gruppi dal 20/12.',
  formEmail: 'Indirizzo Email (obbligatorio per voucher)',
  formCreateAccountToggle: 'Crea ora un account per l’Area Riservata (consigliato)',
  formPassword: 'Password Area Riservata (minimo 8 caratteri)',
  formPasswordHint: 'Con la password potrai gestire i tuoi ordini e biglietti in qualsiasi momento dall’Area Riservata.',
  formLanguages: 'Lingue parlate',
  formDietary: 'Preferenze menù (Terra/Mare) o allergie alimentari',
  formTermsLabel:
    'Accetto Termini e Condizioni, Privacy Policy e Politica di Rimborso di nightlifemilan.com, confermo il +15% di Booking, Concierge & Entry Fee e i requisiti d’età del locale.',
  termsPolicyLabel: 'Termini e Condizioni',
  privacyPolicyLabel: 'Privacy Policy',
  refundPolicyLabel: 'Politica di Rimborso',
  formPayNowCta: 'Procedi al Pagamento sul Sito',
  pinetaUnder30Error:
    'Pineta Milano ammette tassativamente solo pubblico Under 30 (18–29 anni). Per la tua età ti consigliamo Just Me (30–49), REPVBLIC (22–40), Voya Rooftop oppure Bischeri Over 50.',
  under18Error: 'L’acquisto e l’ingresso agli eventi serali in Italia sono riservati ai maggiorenni (18+ anni compiuti).',
  justme21PlusError:
    'JustMe Milano applica selezione 21+ per questa serata speciale: possono prenotare e accedere solo ospiti di età pari o superiore a 21 anni.',
  bischeriAdvisory: 'Per la fascia dai 50 anni in su consigliamo in particolare la tavolata Over 50 di Bischeri Milano oppure Voya Rooftop.',
  accountTitle: 'Area Riservata Clienti · Nightlife Milan',
  accountSubtitle:
    'Registrati, accedi ai tuoi biglietti confermati, controlla gli importi in EUR e valuta pagata e verifica il tuo mini-gruppo WhatsApp.',
  tabLogin: 'Accedi',
  tabRegister: 'Registrati',
  tabOrderLookup: 'Cerca Ordine',
  loginCta: 'Entra nell’Area Riservata',
  registerCta: 'Completa Registrazione',
  lookupCta: 'Trova Ordine',
  orderCodeLabel: 'Codice Ordine (es. NLM-SP-...)',
  orderIdLabel: 'Codice Ordine',
  logoutCta: 'Esci',
  passStatusPaid: 'PAGATO · VOUCHER CONFERMATO',
  passStatusPending: 'IN ATTESA DI PAGAMENTO',
  completePaymentCta: 'Completa Pagamento Ora',
  miniGroupHeading: 'Mini-Gruppo WhatsApp Single Pass',
  miniGroupNoticeBody:
    'Se hai acquistato un Single Pass Capodanno, il mini-gruppo WhatsApp dedicato apre progressivamente dal 20 dicembre 2026 sul tuo numero di telefono salvato.',
  miniGroupScheduledBody:
    'Attivazione dal 20 dicembre 2026 in poi sul numero verificato sopra per il tuo locale e la tua fascia d’età.',
  miniGroupActiveBody:
    'Il tuo mini-gruppo WhatsApp ufficiale è attivo. Clicca per entrare e conoscere gli altri partecipanti.',
  openMiniGroupCta: 'Apri Mini-Gruppo WhatsApp',
  updateProfileCta: 'Aggiorna Contatti e Lingue',
  viewVoucherCta: 'Apri Voucher & Dettagli',
  thankYouEyebrow: 'ORDINE CONFERMATO · NIGHTLIFE MILAN',
  thankYouHeading: 'Grazie, il tuo ordine è confermato',
  thankYouSubtitle:
    'Abbiamo registrato il pagamento sul nostro sistema sicuro e inviato il riepilogo ufficiale alla tua email. Qui sotto trovi tutti i dettagli d’ingresso.',
  customerContactsHeading: 'Dati Cliente & Contatti Registrati',
  venueShortLabels: {
    gate: 'PERREO XL Gate (18–26)',
    pineta: 'Pineta Under 30 (18–29)',
    repvblic: 'REPVBLIC Intl (22–40)',
    justme: 'Just Me Luxury (30–49)',
    bischeri: 'Bischeri Over 50 (50+)',
    bobino: 'Bobino Legends (Navigli)',
    voya: 'Voya Rooftop 20° Piano',
    'justme-garda': 'JustMe Garda Lake',
    'voya-christmas': 'Natale Voya Rooftop (25/12)',
    'justme-orthodox': 'Capodanno Ortodosso Just Me (13/01)',
    'justme-thanksgiving': 'JustMe · Thanksgiving & Vida Loca (26 Nov)',
    'justme-partenopea': 'JustMe · Cena Spettacolo Partenopea (27 Nov)',
    'club-event': 'Serata Club Milano',
  },
  embeddedBannerTitle: 'Acquista online i biglietti ufficiali confermati',
  embeddedBannerBody:
    'Tariffe ufficiali in Euro convertibili nella tua valuta al checkout (+15% Booking, Concierge Service & Entry Fee). Pagamento sicuro sul sito senza reindirizzamenti esterni.',
  embeddedBannerCta: 'Vedi Shop Single Pass',
};

const EN_PACK: SinglePassCopyPack = {
  seoTitle: 'Milan New Year’s Eve 2027 Single Pass · Direct Online Storefront',
  seoDescription:
    'Official Milan NYE 2027 Single Pass e-commerce: 8 confirmed venues by age bracket, direct on-site multi-currency checkout (+15% fee), WhatsApp groups from Dec 20.',
  navShopLabel: 'SINGLE PASS',
  navCartLabel: 'Cart',
  navAccountLabel: 'Account',
  heroEyebrow: 'OFFICIAL E-COMMERCE · NYE 2027 FOR SOLO GUESTS & SMALL GROUPS',
  heroH1: 'Milan NYE 2027 Single Pass: pick your venue by age and book directly on-site',
  heroSubtitle:
    'Celebrating New Year’s Eve solo or in a duo without booking an entire private booth? Select from Gate, Pineta Under 30, REPVBLIC, Just Me Torre Branca, Bobino Legends, Voya Rooftop, JustMe Garda Lake, and Bischeri Over 50, add your package to the cart, and check out seamlessly on nightlifemilan.com in your preferred currency.',
  trustOnlinePayment:
    '100% native on-site checkout with real-time currency conversion (+15% Booking & Concierge Fee)',
  trustEqualPrice: 'Identical male and female pricing: zero gender discounts or price differences',
  trustWhatsAppDate: 'Official WhatsApp mini-groups open progressively from December 20, 2026',
  trustConciergeHost: 'Priority coordinated entry under Lista / Tavolo NIGHTLIFE MILAN',
  filterHeading: 'Filter by age bracket, venue and confirmed package',
  filterAllVenues: 'All Confirmed Venues',
  filterAllCategories: 'All Packages',
  categoryLabels: {
    'all-night-combo': 'All-Night Dinner + Table Share',
    'vip-table-share': 'Shared VIP Table Quota',
    'vip-table-full': 'Full Private VIP Table',
    'gala-dinner': 'Served Gala Dinner',
    'royal-buffet': 'Social Royal Buffet',
    'club-entry': 'Official Club Entry',
    'holiday-special': 'Holiday Special Menu',
  },
  basePriceLabel: 'Official base rate (EUR)',
  feeLabel: '+15% Booking, Concierge Service & Entry Fee',
  totalLabel: 'Order Total',
  arrivalLabel: 'Recommended arrival',
  guestsLabel: 'Guests covered',
  addToCartCta: 'Add to Cart',
  buyNowCta: 'Buy Now',
  addedFeedback: 'Added to cart',
  viewVenueDetails: 'Venue details and full guide',
  howItWorksEyebrow: 'HOW NIGHTLIFE MILAN SINGLE PASS WORKS',
  howItWorksHeading: 'From direct on-site checkout to midnight toast without arriving alone',
  howItWorksSteps: [
    {
      title: '1. Choose a confirmed venue for your age band',
      body: 'PERREO XL @ Gate covers 18–26, Pineta enforces strict Under 30 (18–29), REPVBLIC hosts 22–40 international guests, Just Me leads 30–49 luxury, Voya Rooftop brings skyline dining, JustMe Garda offers lakefront glamour, and Bischeri welcomes Over 50.',
    },
    {
      title: '2. Pay natively in your currency with transparent +15% fee',
      body: 'Canonical Euro prices are converted live at checkout to your selected currency at official reference exchange rates, with a clear +15% Booking, Concierge & Entry Fee.',
    },
    {
      title: '3. Register your account and access instant digital passes',
      body: 'Create your Reserved Area account directly during checkout or sign in later to access your Order PIN, itemized receipt, and digital admission pass.',
    },
    {
      title: '4. Official WhatsApp mini-group from December 20',
      body: 'Starting December 20 onwards, our concierge connects verified Single Pass holders per venue and age band on WhatsApp so guests arrive together.',
    },
  ],
  drawerTitle: 'Your Shopping Cart',
  drawerEmptyTitle: 'Your cart is empty',
  drawerEmptyBody: 'Add any confirmed-price Single Pass, Gala Dinner, or Club Ticket from eligible event pages or our storefront.',
  drawerExploreCta: 'Browse Confirmed Packages',
  drawerSubtotalLabel: 'Packages base subtotal (EUR)',
  drawerCheckoutCta: 'Go to Checkout',
  drawerCartCta: 'View Full Cart',
  drawerAccountCta: 'Reserved Area',
  removeItemLabel: 'Remove',
  checkoutTitle: 'Secure On-Site Checkout · Nightlife Milan',
  checkoutSubtitle:
    'Register your account and pay directly inside nightlifemilan.com in your preferred currency. Phone number and email are required for guestlist matching.',
  stepDetailsLabel: '1. Guest Details & Registration',
  stepPaymentLabel: '2. Encrypted On-Site Payment',
  currencySelectorLabel: 'Checkout currency',
  fxRateNotice: 'Original Euro total converted live using the reference exchange rate shown below',
  eurOriginalLabel: 'Original Euro value (EUR)',
  billingTotalLabel: 'Amount due at checkout',
  chargedInCurrencyLabel: 'Converted amount billed',
  proceedToPaymentCta: 'Continue to Payment',
  paySafelyCta: 'Complete Secure Order',
  paymentProcessingLabel: 'Confirming payment...',
  backToDetailsCta: 'Edit guest details',
  formFullName: 'Full Name (as shown on ID)',
  formAge: 'Age on Dec 31, 2026',
  formCountry: 'Country of Residence',
  formWhatsapp: 'Mobile / WhatsApp Number (required, e.g. +39 3...)',
  formWhatsappHint: 'Required for digital voucher delivery, 24/7 concierge support, and Dec 20 mini-groups.',
  formEmail: 'Email Address (required)',
  formCreateAccountToggle: 'Register my Reserved Area account now (recommended)',
  formPassword: 'Account Password (minimum 8 characters)',
  formPasswordHint: 'Used to manage all bookings and download passes inside your Reserved Area.',
  formLanguages: 'Spoken Languages',
  formDietary: 'Menu selection (Land/Sea) or dietary notes',
  formTermsLabel:
    'I accept the Terms & Conditions, Privacy Policy, and Refund Policy of nightlifemilan.com, acknowledge the +15% Booking, Concierge & Entry Fee, and confirm venue age requirements.',
  termsPolicyLabel: 'Terms & Conditions',
  privacyPolicyLabel: 'Privacy Policy',
  refundPolicyLabel: 'Refund Policy',
  formPayNowCta: 'Continue to On-Site Payment',
  pinetaUnder30Error:
    'Pineta Milano strictly admits Under 30 guests only (ages 18–29). For ages 30+, please select Just Me (30–49), REPVBLIC (22–40), Voya Rooftop, or Bischeri Over 50.',
  under18Error: 'Online ticket purchases and nightlife admissions strictly require guests to be 18 years or older.',
  justme21PlusError:
    'JustMe Milano strictly enforces a 21+ age policy for this special event: online bookings require guests to be at least 21 years old.',
  bischeriAdvisory: 'For guests aged 50 and above, Bischeri Navigli Over 50 Social Table and Voya Rooftop provide the ideal peer atmosphere.',
  accountTitle: 'Customer Reserved Area · Nightlife Milan',
  accountSubtitle:
    'Register an account, sign in to view paid digital passes, inspect EUR and local currency totals, and check December 20 WhatsApp group status.',
  tabLogin: 'Sign In',
  tabRegister: 'Register',
  tabOrderLookup: 'Find Order',
  loginCta: 'Sign In to Account',
  registerCta: 'Create Account',
  lookupCta: 'Lookup Order',
  orderCodeLabel: 'Order Reference (e.g. NLM-SP-...)',
  orderIdLabel: 'Order Reference',
  logoutCta: 'Sign Out',
  passStatusPaid: 'PAID · PASS CONFIRMED',
  passStatusPending: 'AWAITING PAYMENT',
  completePaymentCta: 'Pay Now On-Site',
  miniGroupHeading: 'Official WhatsApp Mini-Group Status',
  miniGroupNoticeBody:
    'For New Year’s Eve Single Pass orders, dedicated WhatsApp mini-groups launch progressively from December 20, 2026 using your registered phone number.',
  miniGroupScheduledBody:
    'Activates from December 20, 2026 onwards on the phone number saved on this order.',
  miniGroupActiveBody:
    'Your official WhatsApp mini-group is ready. Open the link to meet your venue group.',
  openMiniGroupCta: 'Join WhatsApp Group',
  updateProfileCta: 'Save Phone & Languages',
  viewVoucherCta: 'Open Order Voucher',
  thankYouEyebrow: 'ORDER CONFIRMED · NIGHTLIFE MILAN',
  thankYouHeading: 'Thank you, your booking is confirmed',
  thankYouSubtitle:
    'Your on-site payment has been verified and your digital confirmation has been dispatched by email. Keep your PIN and Order Reference below.',
  customerContactsHeading: 'Registered Customer & Contacts',
  venueShortLabels: {
    gate: 'PERREO XL Gate (18–26)',
    pineta: 'Pineta Under 30 (18–29)',
    repvblic: 'REPVBLIC Intl (22–40)',
    justme: 'Just Me Luxury (30–49)',
    bischeri: 'Bischeri Over 50 (50+)',
    bobino: 'Bobino Legends (Navigli)',
    voya: 'Voya Rooftop 20th Floor',
    'justme-garda': 'JustMe Garda Lake',
    'voya-christmas': 'Voya Christmas Menu (Dec 25)',
    'justme-orthodox': 'Just Me Orthodox NYE (Jan 13)',
    'justme-thanksgiving': 'JustMe · Thanksgiving & Vida Loca (Nov 26)',
    'justme-partenopea': 'JustMe · Cena Spettacolo Partenopea (Nov 27)',
    'club-event': 'Milan Official Club Event',
  },
  embeddedBannerTitle: 'Buy confirmed-price tickets directly online',
  embeddedBannerBody:
    'Official Euro prices converted live at checkout into your currency (+15% Booking, Concierge Service & Entry Fee). Complete payment securely on nightlifemilan.com.',
  embeddedBannerCta: 'Explore Single Pass Shop',
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
    seoTitle: 'Single Pass Nochevieja Milán 2027 · Tienda Oficial Online',
    seoDescription:
      'Single Pass Nochevieja Milán 2027 para quienes van solos: 8 clubes confirmados por edad, pago directo en el sitio en tu moneda (+15% fee), mini-grupo WhatsApp desde el 20/12.',
    navCartLabel: 'Carrito',
    navAccountLabel: 'Mi Cuenta',
    heroH1: 'Single Pass Nochevieja Milán 2027: elige tu club por edad y paga en el sitio',
    trustOnlinePayment: 'Pago directo 100% en el sitio con conversión de moneda (+15% fee transparente)',
    trustEqualPrice: 'Mismo precio exacto para hombres y mujeres en todos los paquetes',
    trustWhatsAppDate: 'Mini-grupo oficial de WhatsApp activo desde el 20 de diciembre de 2026',
    addToCartCta: 'Añadir al Carrito',
    buyNowCta: 'Comprar Ahora',
    drawerTitle: 'Tu Carrito',
    drawerCheckoutCta: 'Ir al Checkout',
    drawerCartCta: 'Ver Carrito',
    drawerAccountCta: 'Área Privada',
    checkoutTitle: 'Checkout Seguro en el Sitio · Nightlife Milan',
    formPayNowCta: 'Continuar al Pago',
    paySafelyCta: 'Finalizar Compra Segura',
    thankYouHeading: 'Gracias, tu reserva está confirmada',
    accountTitle: 'Área Privada · Nightlife Milan',
    tabLogin: 'Iniciar Sesión',
    tabRegister: 'Registrarse',
    tabOrderLookup: 'Buscar Pedido',
  }),
  fr: makeLocalePack({
    seoTitle: 'Single Pass Nouvel An Milan 2027 · Billetterie Officielle',
    seoDescription:
      'Single Pass Saint-Sylvestre Milan 2027 pour personnes seules : 8 clubs par âge, paiement intégré sur le site (+15% frais), mini-groupe WhatsApp dès le 20/12.',
    navCartLabel: 'Panier',
    navAccountLabel: 'Mon Compte',
    heroH1: 'Single Pass Nouvel An Milan 2027 : choisissez votre club par âge et réservez ici',
    trustOnlinePayment: 'Paiement direct sécurisé sur le site avec conversion de devise (+15% frais)',
    trustEqualPrice: 'Tarif strictement identique femmes et hommes sur toutes les formules',
    trustWhatsAppDate: 'Mini-groupe WhatsApp officiel activé dès le 20 décembre 2026',
    addToCartCta: 'Ajouter au Panier',
    buyNowCta: 'Acheter Maintenant',
    drawerTitle: 'Votre Panier',
    drawerCheckoutCta: 'Passer au Paiement',
    drawerCartCta: 'Voir le Panier',
    drawerAccountCta: 'Espace Membre',
    checkoutTitle: 'Paiement Sécurisé sur Place · Nightlife Milan',
    formPayNowCta: 'Continuer vers le Paiement',
    paySafelyCta: 'Confirmer et Payer',
    thankYouHeading: 'Merci, votre réservation est confirmée',
    accountTitle: 'Espace Membre · Nightlife Milan',
    tabLogin: 'Connexion',
    tabRegister: 'Créer un Compte',
    tabOrderLookup: 'Trouver Commande',
  }),
  de: makeLocalePack({
    seoTitle: 'Single Pass Silvester Mailand 2027 · Offizieller Online-Shop',
    seoDescription:
      'Silvester Mailand 2027 Single Pass für Alleinreisende: 8 bestätigte Clubs nach Alter, direkte Zahlung auf der Website in Ihrer Währung (+15% Gebühr), WhatsApp-Gruppe ab 20.12.',
    navCartLabel: 'Warenkorb',
    navAccountLabel: 'Konto',
    heroH1: 'Single Pass Silvester Mailand 2027: Club nach Alter wählen & direkt buchen',
    trustOnlinePayment: 'Direkte Zahlung auf der Website inkl. Währungsumrechnung (+15% Servicegebühr)',
    trustEqualPrice: 'Einheitliche Preise für Frauen und Männer bei allen Paketen',
    trustWhatsAppDate: 'Offizielle WhatsApp-Minigruppen starten ab dem 20. Dezember 2026',
    addToCartCta: 'In den Warenkorb',
    buyNowCta: 'Jetzt Kaufen',
    drawerTitle: 'Warenkorb',
    drawerCheckoutCta: 'Zur Kasse',
    drawerCartCta: 'Warenkorb ansehen',
    drawerAccountCta: 'Kundenbereich',
    checkoutTitle: 'Sicherer On-Site Checkout · Nightlife Milan',
    formPayNowCta: 'Weiter zur Zahlung',
    paySafelyCta: 'Jetzt Sicher Bezahlen',
    thankYouHeading: 'Vielen Dank, Ihre Buchung ist bestätigt',
    accountTitle: 'Kundenbereich · Nightlife Milan',
    tabLogin: 'Anmelden',
    tabRegister: 'Registrieren',
    tabOrderLookup: 'Bestellung finden',
  }),
  pt: makeLocalePack({
    seoTitle: 'Single Pass Réveillon Milão 2027 · Loja Oficial Online',
    navCartLabel: 'Carrinho',
    navAccountLabel: 'Minha Conta',
    heroH1: 'Single Pass Réveillon Milão 2027: escolhe o clube pela idade e compra no site',
    addToCartCta: 'Adicionar ao Carrinho',
    buyNowCta: 'Comprar Agora',
    drawerTitle: 'Carrinho',
    drawerCheckoutCta: 'Finalizar Compra',
    drawerAccountCta: 'Área Reservada',
    checkoutTitle: 'Checkout Seguro no Site · Nightlife Milan',
    thankYouHeading: 'Obrigado, a tua reserva está confirmada',
    accountTitle: 'Área Reservada · Nightlife Milan',
  }),
  nl: makeLocalePack({
    navCartLabel: 'Winkelwagen',
    navAccountLabel: 'Mijn Account',
    heroH1: 'Single Pass Oud en Nieuw Milaan 2027: kies je club en betaal direct op de site',
    addToCartCta: 'In Winkelwagen',
    buyNowCta: 'Direct Kopen',
    drawerTitle: 'Winkelwagen',
    drawerCheckoutCta: 'Afrekenen',
    thankYouHeading: 'Bedankt, je reservering is bevestigd',
  }),
  ru: makeLocalePack({
    seoTitle: 'Single Pass Новый год Милан 2027 · Официальный магазин',
    navCartLabel: 'Корзина',
    navAccountLabel: 'Кабинет',
    heroH1: 'Single Pass Новый год в Милане 2027: выберите клуб по возрасту и оплатите на сайте',
    addToCartCta: 'В корзину',
    buyNowCta: 'Купить сейчас',
    drawerTitle: 'Корзина',
    drawerCheckoutCta: 'Оформить заказ',
    drawerAccountCta: 'Личный кабинет',
    thankYouHeading: 'Спасибо, ваш заказ подтверждён',
    accountTitle: 'Личный кабинет · Nightlife Milan',
  }),
  tr: makeLocalePack({
    navCartLabel: 'Sepet',
    navAccountLabel: 'Hesabım',
    heroH1: 'Milano Yılbaşı 2027 Single Pass: yaş grubuna göre kulüp seç ve siteden güvenle öde',
    addToCartCta: 'Sepete Ekle',
    buyNowCta: 'Hemen Al',
    drawerCheckoutCta: 'Ödemeye Geç',
    thankYouHeading: 'Teşekkürler, rezervasyonunuz onaylandı',
  }),
  zh: makeLocalePack({
    navCartLabel: '购物车',
    navAccountLabel: '我的账户',
    heroH1: '2027 米兰跨年 Single Pass 独立通行证：按年龄筛选夜店并站内直接结账',
    addToCartCta: '加入购物车',
    buyNowCta: '立即购买',
    drawerTitle: '购物车',
    drawerCheckoutCta: '前往结账',
    drawerAccountCta: '个人中心',
    thankYouHeading: '感谢预订，您的订单已确认',
    accountTitle: '会员专区 · Nightlife Milan',
  }),
  ar: makeLocalePack({
    navCartLabel: 'سلة التسوق',
    navAccountLabel: 'حسابي',
    heroH1: 'بطاقة Single Pass رأس السنة في ميلانو 2027: اختر النادي وادفع مباشرة على الموقع',
    addToCartCta: 'أضف إلى السلة',
    buyNowCta: 'اشترِ الآن',
    drawerTitle: 'سلة التسوق',
    drawerCheckoutCta: 'إتمام الدفع',
    drawerAccountCta: 'حسابي',
    thankYouHeading: 'شكراً لك، تم تأكيد حجزك',
    accountTitle: 'منطقة الأعضاء · Nightlife Milan',
  }),
  bg: makeLocalePack({ navCartLabel: 'Кошница', navAccountLabel: 'Профил', addToCartCta: 'Добави в кошницата', thankYouHeading: 'Благодарим ви, поръчката е потвърдена' }),
  hr: makeLocalePack({ navCartLabel: 'Košarica', navAccountLabel: 'Moj račun', addToCartCta: 'Dodaj u košaricu', thankYouHeading: 'Hvala, vaša rezervacija je potvrđena' }),
  cs: makeLocalePack({ navCartLabel: 'Košík', navAccountLabel: 'Můj účet', addToCartCta: 'Přidat do košíku', thankYouHeading: 'Děkujeme, vaše objednávka je potvrzena' }),
  da: makeLocalePack({ navCartLabel: 'Indkøbskurv', navAccountLabel: 'Min konto', addToCartCta: 'Læg i kurv', thankYouHeading: 'Tak, din bestilling er bekræftet' }),
  et: makeLocalePack({ navCartLabel: 'Ostukorv', navAccountLabel: 'Minu konto', addToCartCta: 'Lisa ostukorvi', thankYouHeading: 'Aitäh, teie broneering on kinnitatud' }),
  fi: makeLocalePack({ navCartLabel: 'Ostoskori', navAccountLabel: 'Oma tili', addToCartCta: 'Lisää ostoskoriin', thankYouHeading: 'Kiitos, varauksesi on vahvistettu' }),
  el: makeLocalePack({
    navCartLabel: 'Καλάθι',
    navAccountLabel: 'Λογαριασμός',
    addToCartCta: 'Προσθήκη στο καλάθι',
    buyNowCta: 'Αγορά Τώρα',
    thankYouHeading: 'Ευχαριστούμε, η κράτησή σας επιβεβαιώθηκε',
  }),
  hu: makeLocalePack({ navCartLabel: 'Kosár', navAccountLabel: 'Fiókom', addToCartCta: 'Kosárba', thankYouHeading: 'Köszönjük, rendelését visszaigazoltuk' }),
  ga: makeLocalePack({ navCartLabel: 'Cairt', navAccountLabel: 'Mo Chuntas', addToCartCta: 'Cuir sa chairt', thankYouHeading: 'Go raibh maith agat, tá d’ordú deimhnithe' }),
  lv: makeLocalePack({ navCartLabel: 'Grozs', navAccountLabel: 'Mans konts', addToCartCta: 'Pievienot grozam', thankYouHeading: 'Paldies, jūsu pasūtījums ir apstiprināts' }),
  lt: makeLocalePack({ navCartLabel: 'Krepšelis', navAccountLabel: 'Mano paskyra', addToCartCta: 'Į krepšelį', thankYouHeading: 'Ačiū, jūsų užsakymas patvirtintas' }),
  mt: makeLocalePack({ navCartLabel: 'Karrettun', navAccountLabel: 'Kont Tiegħi', addToCartCta: 'Żid mal-karrettun', thankYouHeading: 'Grazzi, l-ordni tiegħek hija kkonfermata' }),
  pl: makeLocalePack({
    navCartLabel: 'Koszyk',
    navAccountLabel: 'Moje konto',
    heroH1: 'Single Pass Sylwester Mediolan 2027: wybierz klub według wieku i kup online',
    addToCartCta: 'Dodaj do koszyka',
    buyNowCta: 'Kup Teraz',
    drawerCheckoutCta: 'Przejdź do Kasy',
    thankYouHeading: 'Dziękujemy, Twoje zamówienie zostało potwierdzone',
  }),
  ro: makeLocalePack({
    navCartLabel: 'Coș',
    navAccountLabel: 'Contul meu',
    heroH1: 'Single Pass Revelion Milano 2027: alege clubul după vârstă și plătește direct pe site',
    addToCartCta: 'Adaugă în coș',
    buyNowCta: 'Cumpără Acum',
    drawerCheckoutCta: 'Mergi la Checkout',
    thankYouHeading: 'Mulțumim, comanda ta este confirmată',
  }),
  sk: makeLocalePack({ navCartLabel: 'Košík', navAccountLabel: 'Môj účet', addToCartCta: 'Pridať do košíka', thankYouHeading: 'Ďakujeme, vaša objednávka je potvrdená' }),
  sl: makeLocalePack({ navCartLabel: 'Košarica', navAccountLabel: 'Moj račun', addToCartCta: 'Dodaj v košarico', thankYouHeading: 'Hvala, vaše naročilo je potrjeno' }),
  sv: makeLocalePack({ navCartLabel: 'Varukorg', navAccountLabel: 'Mitt konto', addToCartCta: 'Lägg i varukorg', thankYouHeading: 'Tack, din bokning är bekräftad' }),
  no: makeLocalePack({ navCartLabel: 'Handlekurv', navAccountLabel: 'Min konto', addToCartCta: 'Legg i handlekurv', thankYouHeading: 'Takk, bestillingen din er bekreftet' }),
  is: makeLocalePack({ navCartLabel: 'Karfa', navAccountLabel: 'Minn reikningur', addToCartCta: 'Setja í körfu', thankYouHeading: 'Takk, pöntunin þín er staðfest' }),
  uk: makeLocalePack({
    navCartLabel: 'Кошик',
    navAccountLabel: 'Особистий кабінет',
    heroH1: 'Single Pass Новий рік у Мілані 2027: вибір клубу за віком та оплата на сайті',
    addToCartCta: 'Додати в кошик',
    buyNowCta: 'Купити зараз',
    thankYouHeading: 'Дякуємо, ваше замовлення підтверджено',
  }),
  sq: makeLocalePack({ navCartLabel: 'Shporta', navAccountLabel: 'Llogaria ime', addToCartCta: 'Shto në shportë', thankYouHeading: 'Faleminderit, porosia juaj u konfirmua' }),
  sr: makeLocalePack({ navCartLabel: 'Korpa', navAccountLabel: 'Moj nalog', addToCartCta: 'Dodaj u korpu', thankYouHeading: 'Hvala, vaša narudžbina je potvrđena' }),
  bs: makeLocalePack({ navCartLabel: 'Korpa', navAccountLabel: 'Moj račun', addToCartCta: 'Dodaj u korpu', thankYouHeading: 'Hvala, vaša narudžba je potvrđena' }),
  mk: makeLocalePack({ navCartLabel: 'Кошничка', navAccountLabel: 'Мој профил', addToCartCta: 'Додај во кошничка', thankYouHeading: 'Ви благодариме, нарачката е потврдена' }),
};

export function getSinglePassCopy(locale: string): SinglePassCopyPack {
  return (
    (SINGLE_PASS_COPY_35 as Record<string, SinglePassCopyPack>)[locale] ||
    SINGLE_PASS_COPY_35[DEFAULT_LOCALE]
  );
}
