import { DEFAULT_LOCALE, type LocaleCode } from '@/lib/i18n/locales';
import type { SinglePassPackageCategory, SinglePassVenueId } from './types';
import {
  SP_PACKS_33,
  localizeSinglePassSku,
  localizeVenueAgeBand,
} from './i18n35Packs';

export { localizeSinglePassSku, localizeVenueAgeBand };

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
  feeCalculatedAtCheckoutNote: string;
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
  venueShortLabels: Partial<Record<SinglePassVenueId, string>>;
  embeddedBannerTitle: string;
  embeddedBannerBody: string;
  embeddedBannerCta: string;
};

const IT_PACK: SinglePassCopyPack = {
  seoTitle: 'Single Pass Capodanno Milano 2027 · Tavoli Condivisi Online',
  seoDescription:
    'Single Pass Capodanno Milano 2027 per chi festeggia da solo: 8 locali confermati per età, acquisto diretto sul sito con pagamento sicuro con carta, mini-gruppo WhatsApp dal 20/12.',
  navShopLabel: 'SINGLE PASS',
  navCartLabel: 'Carrello',
  navAccountLabel: 'Area Riservata',
  heroEyebrow: 'E-COMMERCE UFFICIALE · CAPODANNO 2027 PER CHI VIENE DA SOLO O IN PICCOLI GRUPPI',
  heroH1: 'Single Pass Capodanno Milano 2027: scegli il locale per età e acquista sul sito',
  heroSubtitle:
    'Vuoi festeggiare il 31 dicembre nei migliori club di Milano ma non hai una compagnia numerosa o vuoi unirti a un tavolo della tua stessa fascia d’età? Scegli tra Gate, Pineta, REPVBLIC, Just Me Torre Branca, Bobino Legends, Voya Rooftop, JustMe Garda e Bischeri Over 50, aggiungi il pacchetto al carrello e completa il pagamento direttamente su Nightlife Milan.',
  trustOnlinePayment:
    'Prezzi di listino del locale, pagamento sicuro con carta direttamente sul sito',
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
  basePriceLabel: 'Prezzo del locale (EUR)',
  feeLabel: 'Booking fee 20% · consulenza concierge e pagamento elettronico',
  feeCalculatedAtCheckoutNote: 'Booking & concierge fee calcolata al checkout',
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
      title: '2. Paga sul sito in sicurezza nella tua valuta',
      body: 'I prezzi di listino in Euro possono essere pagati direttamente con carta, Apple Pay o Google Pay nella tua valuta locale al tasso di cambio ufficiale del checkout.',
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
  drawerSubtotalLabel: 'Prezzo del locale (EUR)',
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
  formWhatsapp: 'Numero di Telefono / WhatsApp (es. +39 3...)',
  formWhatsappHint: 'Indispensabile per ricevere il pass, assistenza concierge 24/7 e accedere ai mini-gruppi dal 20/12.',
  formEmail: 'Indirizzo Email per voucher e codice PIN',
  formCreateAccountToggle: 'Crea ora un account per l’Area Riservata (consigliato)',
  formPassword: 'Password Area Riservata (minimo 8 caratteri)',
  formPasswordHint: 'Con la password potrai gestire i tuoi ordini e biglietti in qualsiasi momento dall’Area Riservata.',
  formLanguages: 'Lingue parlate',
  formDietary: 'Preferenze menù (Terra/Mare) o allergie alimentari',
  formTermsLabel:
    'Accetto Termini e Condizioni, Privacy Policy e Politica di Rimborso di nightlifemilan.com, confermo la Booking fee 20% (consulenza concierge e pagamento elettronico) e i requisiti d’età del locale.',
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
    'terrazza-duomo-21': 'Terrazza Duomo 21 & MA.RE (Piazza Duomo)',
    'club-event': 'Serata Club Milano',
  },
  embeddedBannerTitle: 'Acquista online i biglietti ufficiali confermati',
  embeddedBannerBody:
    'Prezzi di listino del locale, pagamento sicuro con carta direttamente sul sito nella tua valuta senza reindirizzamenti esterni.',
  embeddedBannerCta: 'Vedi Shop Single Pass',
};

const EN_PACK: SinglePassCopyPack = {
  seoTitle: 'Milan New Year’s Eve 2027 Single Pass · Direct Online Storefront',
  seoDescription:
    'Official Milan NYE 2027 Single Pass e-commerce: 8 confirmed venues by age bracket, official venue list prices with secure on-site card payment, WhatsApp groups from Dec 20.',
  navShopLabel: 'SINGLE PASS',
  navCartLabel: 'Cart',
  navAccountLabel: 'Account',
  heroEyebrow: 'OFFICIAL E-COMMERCE · NYE 2027 FOR SOLO GUESTS & SMALL GROUPS',
  heroH1: 'Milan NYE 2027 Single Pass: pick your venue by age and book directly on-site',
  heroSubtitle:
    'Celebrating New Year’s Eve solo or in a duo without booking an entire private booth? Select from Gate, Pineta Under 30, REPVBLIC, Just Me Torre Branca, Bobino Legends, Voya Rooftop, JustMe Garda Lake, and Bischeri Over 50, add your package to the cart, and check out seamlessly on nightlifemilan.com in your preferred currency.',
  trustOnlinePayment:
    'Official venue list prices, secure card payment directly on site',
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
  basePriceLabel: 'Venue price (EUR)',
  feeLabel: 'Booking fee 20% · concierge & electronic payment',
  feeCalculatedAtCheckoutNote: 'Booking & concierge fee calculated at checkout',
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
      title: '2. Pay safely on site in your preferred currency',
      body: 'Official Euro venue prices can be paid directly by card, Apple Pay, or Google Pay in your selected currency at official reference exchange rates shown at checkout.',
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
  drawerSubtotalLabel: 'Venue price (EUR)',
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
  formWhatsapp: 'Mobile / WhatsApp Number (with prefix, e.g. +39 3...)',
  formWhatsappHint: 'Used for digital voucher delivery, 24/7 concierge support, and Dec 20 mini-groups.',
  formEmail: 'Email Address (for digital voucher & PIN)',
  formCreateAccountToggle: 'Register my Reserved Area account now (recommended)',
  formPassword: 'Account Password (minimum 8 characters)',
  formPasswordHint: 'Used to manage all bookings and download passes inside your Reserved Area.',
  formLanguages: 'Spoken Languages',
  formDietary: 'Menu selection (Land/Sea) or dietary notes',
  formTermsLabel:
    'I accept the Terms & Conditions, Privacy Policy, and Refund Policy of nightlifemilan.com, acknowledge the Booking fee 20% (concierge & electronic payment), and confirm venue age requirements.',
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
    'terrazza-duomo-21': 'Terrazza Duomo 21 & MA.RE (Piazza Duomo)',
    'club-event': 'Milan Official Club Event',
  },
  embeddedBannerTitle: 'Buy confirmed-price tickets directly online',
  embeddedBannerBody:
    'Official venue list prices, secure card payment directly on nightlifemilan.com in your preferred currency.',
  embeddedBannerCta: 'Explore Single Pass Shop',
};

export const SINGLE_PASS_COPY_35: Readonly<Record<LocaleCode, SinglePassCopyPack>> = {
  en: EN_PACK,
  it: IT_PACK,
  ...(SP_PACKS_33 as Record<Exclude<LocaleCode, 'en' | 'it'>, SinglePassCopyPack>),
};

export function getSinglePassCopy(locale: string): SinglePassCopyPack {
  return (
    (SINGLE_PASS_COPY_35 as Record<string, SinglePassCopyPack>)[locale] ||
    SINGLE_PASS_COPY_35[DEFAULT_LOCALE]
  );
}

const FEE_DETAIL_BY_LOCALE_35: Record<LocaleCode, string> = {
  en: 'concierge & electronic payment',
  it: 'consulenza concierge e pagamento elettronico',
  es: 'asesoría concierge y pago electrónico',
  fr: 'conseil conciergerie et paiement électronique',
  de: 'Concierge-Beratung & elektronische Zahlung',
  pt: 'consultoria concierge e pagamento eletrónico',
  nl: 'conciërge-advies en elektronische betaling',
  ru: 'консьерж-поддержка и электронная оплата',
  tr: 'concierge danışmanlığı ve elektronik ödeme',
  zh: '礼宾咨询与电子支付服务',
  ar: 'استشارة الكونسيرج والدفع الإلكتروني',
  bg: 'консиерж съдействие и електронно плащане',
  hr: 'concierge savjetovanje i elektroničko plaćanje',
  cs: 'concierge poradenství a elektronická platba',
  da: 'concierge-rådgivning og elektronisk betaling',
  et: 'concierge-nõustamine ja elektrooniline makse',
  fi: 'concierge-neuvonta ja sähköinen maksu',
  el: 'συμβουλευτική concierge και ηλεκτρονική πληρωμή',
  hu: 'concierge tanácsadás és elektronikus fizetés',
  ga: 'comhairle concierge agus íocaíocht leictreonach',
  lv: 'konsjerža konsultācija un elektroniskais maksājums',
  lt: 'konsjeržo konsultacija ir elektroninis mokėjimas',
  mt: 'konsulenza concierge u pagament elettroniku',
  pl: 'doradztwo concierge i płatność elektroniczna',
  ro: 'consultanță concierge și plată electronică',
  sk: 'concierge poradenstvo a elektronická platba',
  sl: 'concierge svetovanje in elektronsko plačilo',
  sv: 'concierge-rådgivning och elektronisk betalning',
  no: 'concierge-rådgivning og elektronisk betaling',
  is: 'concierge-ráðgjöf og rafræn greiðsla',
  uk: 'консьєрж-підтримка та електронна оплата',
  sq: 'këshillim concierge dhe pagesë elektronike',
  sr: 'concierge savetovanje i elektronsko plaćanje',
  bs: 'concierge savjetovanje i elektronsko plaćanje',
  mk: 'консиерж советување и електронско плаќање',
};

export function formatFeeLabel35(locale: string, feeRate: number, isMixed = false): string {
  const detail =
    (FEE_DETAIL_BY_LOCALE_35 as Record<string, string>)[locale] ||
    FEE_DETAIL_BY_LOCALE_35[DEFAULT_LOCALE];
  if (isMixed) {
    return `Booking fee 20% · ${detail}`;
  }
  const pct = Math.round(feeRate * 100);
  if (pct <= 0) {
    return `Booking fee 0% · ${detail}`;
  }
  return `Booking fee ${pct}% · ${detail}`;
}

export type TerrazzaCheckoutUiPack = {
  tableAddonBadge: string;
  tableRequiresFormulaError: string;
  tableMaxGuestsExceededError: string;
  allergiesLabel: string;
  allergiesHint: string;
  allergiesPlaceholder: string;
  noAllergiesQuickFill: string;
  allergiesRequiredError: string;
  termsNotice20: string;
  confirmationRefundNotice: string;
  entryCheckpointNotice: string;
};

const TERRAZZA_UI_EN: TerrazzaCheckoutUiPack = {
  tableAddonBadge: 'Terrace table add-on (bottles included)',
  tableRequiresFormulaError:
    'Every terrace table or private terrace must be paired with at least 1 per-person formula on the same floor (1st Floor or 5th Floor MA.RE).',
  tableMaxGuestsExceededError:
    'Selected per-person formulas exceed the maximum guest capacity of your terrace table (4 guests per terrace table, 8 guests per private terrace). Add another table or adjust guest count.',
  allergiesLabel: 'Allergies and dietary notes (optional)',
  allergiesHint:
    'Optional for Terrazza Duomo 21 and Terrazza MA.RE bookings. Leave blank if none, or share by December 28, 2026.',
  allergiesPlaceholder: 'Specify allergies/intolerances if any (optional)',
  noAllergiesQuickFill: 'No allergies or intolerances',
  allergiesRequiredError: '',
  termsNotice20:
    'I accept the Terms & Conditions, Privacy Policy, and Refund Policy of nightlifemilan.com, acknowledge the Booking fee 20% (concierge & electronic payment), and accept official venue rules.',
  confirmationRefundNotice:
    'Booking confirmed by Nightlife Milan after verifying availability with the venue; if the package is no longer available, full refund.',
  entryCheckpointNotice:
    'Access via Via Silvio Pellico 2 (Piazza del Duomo 21). Piazza Duomo has 9 security checkpoints manned by authorities on December 31: arrive at least 45 minutes early. Optional dietary notes can be updated until December 28.',
};

const TERRAZZA_UI_IT: TerrazzaCheckoutUiPack = {
  tableAddonBadge: 'Supplemento tavolo terrazza (bottiglie incluse)',
  tableRequiresFormulaError:
    'Ogni tavolo in terrazza o terrazzino privato deve essere abbinato ad almeno 1 formula a persona dello stesso piano (1° Piano oppure 5° Piano MA.RE).',
  tableMaxGuestsExceededError:
    'Le formule a persona selezionate superano la capienza massima del tavolo in terrazza (max 4 ospiti per tavolo, max 8 ospiti per terrazzino privato). Aggiungi un altro tavolo o regola il numero di ospiti.',
  allergiesLabel: 'Allergie e intolleranze alimentari',
  allergiesHint:
    'Campo facoltativo per Terrazza Duomo 21 e Terrazza MA.RE. Lascia vuoto se non ne hai, oppure segnala entro il 28 dicembre 2026.',
  allergiesPlaceholder: 'Indica eventuali allergie/intolleranze solo se presenti (facoltativo)',
  noAllergiesQuickFill: 'Nessuna allergia o intolleranza',
  allergiesRequiredError: '',
  termsNotice20:
    'Accetto Termini e Condizioni, Privacy Policy e Politica di Rimborso di nightlifemilan.com, confermo la Booking fee 20% (consulenza concierge e pagamento elettronico) e le condizioni ufficiali del locale.',
  confirmationRefundNotice:
    'Prenotazione confermata da Nightlife Milan dopo la verifica della disponibilità col locale; se il pacchetto non è più disponibile, rimborso completo.',
  entryCheckpointNotice:
    'Ingresso da Via Silvio Pellico 2 (Piazza del Duomo 21). In Piazza Duomo saranno presenti 9 varchi presidiati dalle forze dell’ordine: presentarsi con almeno 45 minuti di anticipo. Eventuali preferenze o allergie facoltative si possono comunicare entro il 28 dicembre.',
};

const TERRAZZA_UI_OVERRIDES: Partial<Record<LocaleCode, Partial<TerrazzaCheckoutUiPack>>> = {
  es: {
    tableAddonBadge: 'Suplemento mesa terraza (botellas incluidas)',
    tableRequiresFormulaError:
      'Cada mesa en terraza o terraza privada debe combinarse con al menos 1 fórmula por persona de la misma planta (1ª Planta o 5ª Planta MA.RE).',
    tableMaxGuestsExceededError:
      'Las fórmulas por persona superan la capacidad máxima de la mesa (máx. 4 personas por mesa, máx. 8 por terraza privada).',
    allergiesLabel: 'Alergias e intolerancias alimentarias',
    noAllergiesQuickFill: 'Sin alergias ni intolerancias',
    allergiesRequiredError: '',
    confirmationRefundNotice:
      'Reserva confirmada por Nightlife Milan tras verificar la disponibilidad con el local; si el paquete ya no está disponible, reembolso completo.',
    entryCheckpointNotice:
      'Acceso por Via Silvio Pellico 2 (Piazza del Duomo 21). Hay 9 controles de acceso en Piazza Duomo: llegar al menos 45 minutos antes. Preferencias alimentarias opcionales hasta el 28 de diciembre.',
  },
  fr: {
    tableAddonBadge: 'Supplément table terrasse (bouteilles incluses)',
    tableRequiresFormulaError:
      'Chaque table en terrasse ou terrasse privée doit être associée à au moins 1 formule par personne du même étage (1er étage ou 5e étage MA.RE).',
    tableMaxGuestsExceededError:
      'Les formules par personne dépassent la capacité maximale de la table (max 4 personnes par table, max 8 pour la terrasse privée).',
    allergiesLabel: 'Allergies et intolérances alimentaires',
    noAllergiesQuickFill: 'Aucune allergie ni intolérance',
    allergiesRequiredError: '',
    confirmationRefundNotice:
      'Réservation confirmée par Nightlife Milan après vérification de la disponibilité auprès du lieu ; si la formule n’est plus disponible, remboursement intégral.',
    entryCheckpointNotice:
      'Entrée par Via Silvio Pellico 2 (Piazza del Duomo 21). 9 points de contrôle sécurisés sur la Piazza Duomo : arrivez au moins 45 minutes en avance. Notes alimentaires facultatives jusqu’au 28 décembre.',
  },
  de: {
    tableAddonBadge: 'Terrassentisch-Zuschlag (Flaschen inklusive)',
    tableRequiresFormulaError:
      'Jeder Terrassentisch oder die private Terrasse muss mit mindestens 1 Personen-Paket derselben Etage (1. OG oder 5. OG MA.RE) kombiniert werden.',
    tableMaxGuestsExceededError:
      'Die gewählten Personen-Pakete überschreiten die maximale Tischkapazität (max. 4 Gäste pro Terrassentisch, max. 8 für die private Terrasse).',
    allergiesLabel: 'Allergien und Unverträglichkeiten',
    noAllergiesQuickFill: 'Keine Allergien oder Unverträglichkeiten',
    allergiesRequiredError: '',
    confirmationRefundNotice:
      'Buchung von Nightlife Milan nach Verfügbarkeitsprüfung mit dem Lokal bestätigt; ist das Paket nicht mehr verfügbar, erfolgt eine vollständige Rückerstattung.',
    entryCheckpointNotice:
      'Zugang über Via Silvio Pellico 2 (Piazza del Duomo 21). Auf der Piazza Duomo gibt es 9 Sicherheitskontrollen: bitte mindestens 45 Minuten früher erscheinen. Optionale Ernährungshinweise bis 28. Dezember.',
  },
  pt: {
    tableAddonBadge: 'Suplemento mesa terraço (garrafas incluídas)',
    noAllergiesQuickFill: 'Sem alergias ou intolerâncias',
    confirmationRefundNotice:
      'Reserva confirmada pela Nightlife Milan após verificação de disponibilidade com o espaço; se o pacote já não estiver disponível, reembolso total.',
  },
  nl: {
    tableAddonBadge: 'Terrastafel toeslag (flessen inbegrepen)',
    noAllergiesQuickFill: 'Geen allergieën of intoleranties',
    confirmationRefundNotice:
      'Reservering bevestigd door Nightlife Milan na controle van de beschikbaarheid bij de locatie; indien het pakket niet meer beschikbaar is, volledige terugbetaling.',
  },
  ru: {
    tableAddonBadge: 'Доплата за стол на террасе (бутылки включены)',
    noAllergiesQuickFill: 'Нет аллергии и непереносимости',
    confirmationRefundNotice:
      'Бронирование подтверждается Nightlife Milan после проверки наличия мест с площадкой; если пакет больше недоступен, полный возврат средств.',
  },
  tr: {
    tableAddonBadge: 'Teras masası ek paketi (şişeler dahil)',
    noAllergiesQuickFill: 'Alerji veya intolerans yok',
    confirmationRefundNotice:
      'Rezervasyon mekanla müsaitlik doğrulandıktan sonra Nightlife Milan tarafından onaylanır; paket artık mevcut değilse tam iade yapılır.',
  },
  zh: {
    tableAddonBadge: '露台桌位附加项（含酒水）',
    noAllergiesQuickFill: '无食物过敏或不耐受',
    confirmationRefundNotice:
      'Nightlife Milan 在与场地确认余位后确认预订；如套餐已售罄，将提供全额退款。',
  },
  ar: {
    tableAddonBadge: 'إضافة طاولة التراس (تشمل الزجاجات)',
    noAllergiesQuickFill: 'لا توجد حساسية أو عدم تحمل غذائي',
    confirmationRefundNotice:
      'يتم تأكيد الحجز من قبل Nightlife Milan بعد التحقق من التوفر مع المكان؛ وفي حال عدم توفر الباقة يتم استرداد المبلغ بالكامل.',
  },
  pl: {
    noAllergiesQuickFill: 'Brak alergii i nietolerancji',
    confirmationRefundNotice:
      'Rezerwacja potwierdzana przez Nightlife Milan po sprawdzeniu dostępności w lokalu; jeśli pakiet nie jest już dostępny, pełny zwrot kosztów.',
  },
  ro: {
    noAllergiesQuickFill: 'Fără alergii sau intoleranțe',
    confirmationRefundNotice:
      'Rezervare confirmată de Nightlife Milan după verificarea disponibilității cu localul; dacă pachetul nu mai este disponibil, rambursare integrală.',
  },
  el: {
    noAllergiesQuickFill: 'Καμία αλλεργία ή δυσανεξία',
    confirmationRefundNotice:
      'Η κράτηση επιβεβαιώνεται από το Nightlife Milan μετά από έλεγχο διαθεσιμότητας με τον χώρο. Εάν το πακέτο δεν είναι πλέον διαθέσιμο, γίνεται πλήρης επιστροφή χρημάτων.',
  },
  uk: {
    noAllergiesQuickFill: 'Немає алергії або непереносимості',
    confirmationRefundNotice:
      'Бронювання підтверджується Nightlife Milan після перевірки наявності місць із закладом; якщо пакет більше недоступний, повне повернення коштів.',
  },
  sv: {
    noAllergiesQuickFill: 'Inga allergier eller intoleranser',
    confirmationRefundNotice:
      'Bokningen bekräftas av Nightlife Milan efter tillgänglighetskontroll med lokalen; om paketet inte längre är tillgängligt ges full återbetalning.',
  },
  no: {
    noAllergiesQuickFill: 'Ingen allergier eller intoleranser',
    confirmationRefundNotice:
      'Bestillingen bekreftes av Nightlife Milan etter kontroll av tilgjengelighet hos stedet; hvis pakken ikke lenger er tilgjengelig, gis full refusjon.',
  },
  da: {
    noAllergiesQuickFill: 'Ingen allergier eller intolerancer',
    confirmationRefundNotice:
      'Bookingen bekræftes af Nightlife Milan efter tjek af tilgængelighed hos stedet; hvis pakken ikke længere er tilgængelig, fuld refusion.',
  },
  fi: {
    noAllergiesQuickFill: 'Ei allergioita tai yliherkkyyksiä',
    confirmationRefundNotice:
      'Nightlife Milan vahvistaa varauksen tarkistettuaan saatavuuden paikan kanssa; jos paketti ei ole enää saatavilla, täysi hyvitys.',
  },
  cs: {
    noAllergiesQuickFill: 'Žádné alergie ani intolerance',
    confirmationRefundNotice:
      'Rezervaci potvrzuje Nightlife Milan po ověření dostupnosti s podnikem; pokud balíček již není dostupný, plná refundace.',
  },
  sk: {
    noAllergiesQuickFill: 'Žiadne alergie ani intolerancie',
    confirmationRefundNotice:
      'Rezerváciu potvrdzuje Nightlife Milan po overení dostupnosti s podnikom; ak balíček už nie je dostupný, plná refundácia.',
  },
  hu: {
    noAllergiesQuickFill: 'Nincs ételallergia vagy intolerancia',
    confirmationRefundNotice:
      'A foglalást a Nightlife Milan a helyszínnel való egyeztetés után erősíti meg; ha a csomag már nem elérhető, teljes visszatérítés jár.',
  },
  bg: {
    noAllergiesQuickFill: 'Без алергии или непоносимости',
    confirmationRefundNotice:
      'Резервацията се потвърждава от Nightlife Milan след проверка на наличността със заведението; ако пакетът вече не е наличен, пълно възстановяване на сумата.',
  },
  hr: {
    noAllergiesQuickFill: 'Bez alergija ili intolerancija',
    confirmationRefundNotice:
      'Rezervaciju potvrđuje Nightlife Milan nakon provjere raspoloživosti s lokalom; ako paket više nije dostupan, puni povrat novca.',
  },
  sl: {
    noAllergiesQuickFill: 'Brez alergij ali intoleranc',
    confirmationRefundNotice:
      'Rezervacijo potrdi Nightlife Milan po preverjanju razpoložljivosti pri lokalu; če paket ni več na voljo, sledi celotno vračilo.',
  },
  sr: {
    noAllergiesQuickFill: 'Nema alergija ni intolerancija',
    confirmationRefundNotice:
      'Rezervaciju potvrđuje Nightlife Milan nakon provere raspoloživosti sa lokalom; ako paket više nije dostupan, pun povraćaj novca.',
  },
  bs: {
    noAllergiesQuickFill: 'Nema alergija ni intolerancija',
    confirmationRefundNotice:
      'Rezervaciju potvrđuje Nightlife Milan nakon provjere raspoloživosti sa lokalom; ako paket više nije dostupan, puni povrat novca.',
  },
  mk: {
    noAllergiesQuickFill: 'Нема алергии или нетолеранции',
    confirmationRefundNotice:
      'Резервацијата ја потврдува Nightlife Milan по проверка на достапноста со локалот; ако пакетот веќе не е достапен, целосно враќање на средствата.',
  },
  sq: {
    noAllergiesQuickFill: 'Asnjë alergji ose intolerancë',
    confirmationRefundNotice:
      'Rezervimi konfirmohet nga Nightlife Milan pas verifikimit të disponueshmërisë me lokalin; nëse paketa nuk është më e disponueshme, rimbursim i plotë.',
  },
  et: {
    noAllergiesQuickFill: 'Allergiaid ja talumatusi ei ole',
    confirmationRefundNotice:
      'Nightlife Milan kinnitab broneeringu pärast saadavuse kontrollimist kohaga; kui pakett ei ole enam saadaval, tagastatakse kogu summa.',
  },
  lv: {
    noAllergiesQuickFill: 'Nav alerģiju vai nepanesību',
    confirmationRefundNotice:
      'Nightlife Milan apstiprina rezervāciju pēc pieejamības pārbaudes ar norises vietu; ja komplekts vairs nav pieejams, pilna atmaksa.',
  },
  lt: {
    noAllergiesQuickFill: 'Alergijų ar netoleravimo nėra',
    confirmationRefundNotice:
      'Nightlife Milan patvirtina rezervaciją patikrinus užimtumą su vieta; jei paketo nebėra, grąžinama visa suma.',
  },
  ga: {
    noAllergiesQuickFill: 'Gan ailléirgí ná éadulaingt',
    confirmationRefundNotice:
      'Deimhníonn Nightlife Milan an áirithint tar éis infhaighteacht a sheiceáil leis an ionad; mura bhfuil an pacáiste ar fáil a thuilleadh, aisíocaíocht iomlán.',
  },
  mt: {
    noAllergiesQuickFill: 'Ebda allerġija jew intolleranza',
    confirmationRefundNotice:
      'Il-prenotazzjoni tiġi kkonfermata minn Nightlife Milan wara verifika tad-disponibbiltà mal-post; jekk il-pakkett ma jkunx aktar disponibbli, rifużjoni sħiħa.',
  },
  is: {
    noAllergiesQuickFill: 'Engin ofnæmi eða óþol',
    confirmationRefundNotice:
      'Nightlife Milan staðfestir bókun eftir athugun á framboði hjá staðnum; ef pakkinn er ekki lengur í boði er full endurgreiðsla veitt.',
  },
};

export function getTerrazzaCheckoutUi35(locale: string): TerrazzaCheckoutUiPack {
  if (locale === 'it') return TERRAZZA_UI_IT;
  if (locale === 'en') return TERRAZZA_UI_EN;
  const ov = (TERRAZZA_UI_OVERRIDES as Record<string, Partial<TerrazzaCheckoutUiPack>>)[locale];
  return ov ? { ...TERRAZZA_UI_EN, ...ov } : TERRAZZA_UI_EN;
}

export { CHECKOUT_UX_COPY_35, getCheckoutUxCopy, type CheckoutUxCopy } from './checkoutUx35';
