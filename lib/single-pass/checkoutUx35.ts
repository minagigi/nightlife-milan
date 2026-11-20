import { DEFAULT_LOCALE, type LocaleCode } from '@/lib/i18n/locales';

export type CheckoutUxCopy = {
  requiredBadge: string;
  optionalBadge: string;
  conditionalBadge: string;
  requiredLegend: string;
  errorSummaryTitle: string;
  errorSummarySingleTitle: string;
  errorSummaryHint: string;
  fixFieldPrefix: string;
  allergiesOptionalNote: string;
  allergyChips: [string, string, string];
  createAccountHint: string;
  existingAccountHint: string;
  suggestedVenuesHeading: string;
  cartFixHeading: string;
  cartFixCta: string;
  guestsUnit: string;
  guestUnitSingular: string;
  whatsappPlaceholder: string;
  countryPlaceholder: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  errFullName: string;
  errAgeInvalid: string;
  errUnder18: string;
  errUnder21Justme: string;
  errPinetaUnder30: string;
  errCountry: string;
  errWhatsapp: string;
  errEmail: string;
  errPasswordShort: string;
  errInvalidCredentials: string;
  errTermsRequired: string;
  errEmptyCart: string;
  errTableRequiresFormula: string;
  errTableMaxGuests: string;
  errPaymentSession: string;
  errNetwork: string;
  fieldLabelFullName: string;
  fieldLabelAge: string;
  fieldLabelCountry: string;
  fieldLabelWhatsapp: string;
  fieldLabelEmail: string;
  fieldLabelPassword: string;
  fieldLabelTerms: string;
  fieldLabelCart: string;
  cardStepSecureNote: string;
};

const UX_EN: CheckoutUxCopy = {
  requiredBadge: 'Required',
  optionalBadge: 'Optional',
  conditionalBadge: 'Required if checked',
  requiredLegend: 'Fields marked with * are required. Everything else is optional.',
  errorSummaryTitle: 'Please check the following fields before continuing',
  errorSummarySingleTitle: 'Please fix 1 field before continuing',
  errorSummaryHint: 'Select any item below to jump straight to that field.',
  fixFieldPrefix: 'Go to',
  allergiesOptionalNote: 'Leave empty if you have no allergies or dietary requirements.',
  allergyChips: ['No allergies', 'Gluten-free', 'Vegetarian / Vegan'],
  createAccountHint: 'Tick this option only if you want a password login for the Reserved Area.',
  existingAccountHint:
    'If this email is already registered, enter your account password or leave this box unchecked to book as a returning guest.',
  suggestedVenuesHeading: 'Recommended compatible venues for your age group',
  cartFixHeading: 'Cart composition needs adjustment',
  cartFixCta: 'Review items in cart',
  guestsUnit: 'guests',
  guestUnitSingular: 'guest',
  whatsappPlaceholder: 'e.g. +39 340 123 4567',
  countryPlaceholder: 'e.g. Italy, UK, USA',
  emailPlaceholder: 'name@example.com',
  passwordPlaceholder: 'At least 8 characters',
  errFullName: 'Enter your full name (at least 2 characters).',
  errAgeInvalid: 'Enter a valid numeric age between 18 and 99.',
  errUnder18: 'All nightlife venues in Milan require attendees to be at least 18 years old.',
  errUnder21Justme: 'JustMe Milano requires guests to be at least 21 years old for this event.',
  errPinetaUnder30: 'Pineta Milano strictly admits guests aged 18 to 29 (Under 30 policy).',
  errCountry: 'Enter your country of residence (at least 2 characters).',
  errWhatsapp: 'Enter a valid mobile / WhatsApp number including international prefix (7 to 18 digits).',
  errEmail: 'Enter a valid email address so we can send your voucher and PIN.',
  errPasswordShort: 'Choose a password of at least 8 characters, or uncheck account creation.',
  errInvalidCredentials:
    'This password does not match the existing account for this email. Sign in, try again, or uncheck account password.',
  errTermsRequired: 'Tick the acceptance box above to confirm terms and venue admission rules.',
  errEmptyCart: 'Your cart is empty. Add a confirmed package before proceeding.',
  errTableRequiresFormula:
    'Add at least 1 per-person formula on the same floor to pair with your terrace table.',
  errTableMaxGuests:
    'The guest count in your per-person formulas exceeds your terrace table capacity.',
  errPaymentSession: 'Could not initialize the payment terminal right now. Please try again.',
  errNetwork: 'Connection issue while contacting the server. Check your internet and try again.',
  fieldLabelFullName: 'Full name',
  fieldLabelAge: 'Age',
  fieldLabelCountry: 'Country',
  fieldLabelWhatsapp: 'Phone / WhatsApp',
  fieldLabelEmail: 'Email address',
  fieldLabelPassword: 'Password',
  fieldLabelTerms: 'Terms acceptance',
  fieldLabelCart: 'Selected packages',
  cardStepSecureNote: 'Direct encrypted card, Apple Pay and Google Pay payment inside Nightlife Milan.',
};

const UX_IT: CheckoutUxCopy = {
  requiredBadge: 'Obbligatorio',
  optionalBadge: 'Facoltativo',
  conditionalBadge: 'Richiesto se selezionato',
  requiredLegend: 'I campi con * sono obbligatori. Tutti gli altri sono facoltativi.',
  errorSummaryTitle: 'Controlla i campi indicati prima di procedere',
  errorSummarySingleTitle: 'Controlla il campo segnalato prima di procedere',
  errorSummaryHint: 'Clicca su una voce per andare subito al punto da correggere.',
  fixFieldPrefix: 'Vai a',
  allergiesOptionalNote: 'Lascia vuoto se non hai allergie o esigenze alimentari.',
  allergyChips: ['Nessuna allergia', 'Senza glutine', 'Vegetariano / Vegano'],
  createAccountHint: 'Spunta questa opzione solo se vuoi creare una password per accedere all’Area Riservata.',
  existingAccountHint:
    'Se questa email ha già un account, inserisci la tua password oppure togli la spunta per proseguire con questo ordine.',
  suggestedVenuesHeading: 'Locali compatibili consigliati per la tua fascia d’età',
  cartFixHeading: 'Regola la composizione del carrello',
  cartFixCta: 'Controlla i pacchetti nel carrello',
  guestsUnit: 'ospiti',
  guestUnitSingular: 'ospite',
  whatsappPlaceholder: 'es. +39 340 123 4567',
  countryPlaceholder: 'es. Italia, Svizzera, Francia',
  emailPlaceholder: 'nome@esempio.com',
  passwordPlaceholder: 'Minimo 8 caratteri',
  errFullName: 'Inserisci nome e cognome completi (almeno 2 caratteri).',
  errAgeInvalid: 'Inserisci un’età valida compresa tra 18 e 99 anni.',
  errUnder18: 'L’acquisto e l’ingresso nei locali di Milano richiedono almeno 18 anni compiuti.',
  errUnder21Justme: 'JustMe Milano richiede almeno 21 anni compiuti per questa serata.',
  errPinetaUnder30: 'Pineta Milano ammette solo ospiti tra 18 e 29 anni (policy Under 30).',
  errCountry: 'Indica il tuo paese di residenza (almeno 2 caratteri).',
  errWhatsapp: 'Inserisci un numero di telefono / WhatsApp valido con prefisso (da 7 a 18 cifre).',
  errEmail: 'Inserisci un indirizzo email valido per ricevere voucher e codice PIN.',
  errPasswordShort: 'Scegli una password di almeno 8 caratteri oppure disattiva la creazione account.',
  errInvalidCredentials:
    'La password non corrisponde all’account già esistente per questa email. Inserisci quella corretta o togli la spunta.',
  errTermsRequired: 'Spunta la casella di accettazione termini e regole d’ingresso per proseguire.',
  errEmptyCart: 'Il carrello è vuoto. Seleziona un pacchetto prima di andare al pagamento.',
  errTableRequiresFormula:
    'Abbina almeno 1 formula a persona dello stesso piano al tavolo in terrazza selezionato.',
  errTableMaxGuests:
    'Le formule a persona superano la capienza del tavolo in terrazza nel carrello.',
  errPaymentSession: 'Impossibile avviare il modulo di pagamento in questo momento. Riprova tra poco.',
  errNetwork: 'Errore di connessione verso il server. Controlla la rete e riprova.',
  fieldLabelFullName: 'Nome e cognome',
  fieldLabelAge: 'Età',
  fieldLabelCountry: 'Paese',
  fieldLabelWhatsapp: 'Telefono / WhatsApp',
  fieldLabelEmail: 'Email',
  fieldLabelPassword: 'Password',
  fieldLabelTerms: 'Accettazione termini',
  fieldLabelCart: 'Pacchetti nel carrello',
  cardStepSecureNote: 'Pagamento diretto crittografato con carta, Apple Pay e Google Pay dentro Nightlife Milan.',
};

const UX_OVERRIDES: Partial<Record<LocaleCode, Partial<CheckoutUxCopy>>> = {
  es: {
    requiredBadge: 'Obligatorio',
    optionalBadge: 'Opcional',
    conditionalBadge: 'Obligatorio si se marca',
    requiredLegend: 'Los campos con * son obligatorios. Los demás son opcionales.',
    errorSummaryTitle: 'Revisa estos campos antes de continuar',
    errorSummarySingleTitle: 'Corrige 1 campo antes de continuar',
    errorSummaryHint: 'Pulsa un elemento para ir directo al campo correspondiente.',
    fixFieldPrefix: 'Ir a',
    allergiesOptionalNote: 'Déjalo vacío si no tienes alergias ni preferencias alimentarias.',
    allergyChips: ['Sin alergias', 'Sin gluten', 'Vegetariano / Vegano'],
    guestsUnit: 'invitados',
    guestUnitSingular: 'invitado',
    errFullName: 'Introduce tu nombre completo (mínimo 2 caracteres).',
    errWhatsapp: 'Introduce un número WhatsApp válido con prefijo internacional (7 a 18 dígitos).',
    errEmail: 'Introduce un correo electrónico válido para recibir tu pase.',
    errCountry: 'Indica tu país de residencia.',
    errTermsRequired: 'Marca la casilla de términos y normas del local para continuar.',
    fieldLabelFullName: 'Nombre completo',
    fieldLabelAge: 'Edad',
    fieldLabelCountry: 'País',
    fieldLabelWhatsapp: 'Teléfono / WhatsApp',
    fieldLabelEmail: 'Correo electrónico',
    fieldLabelTerms: 'Aceptación de términos',
  },
  fr: {
    requiredBadge: 'Obligatoire',
    optionalBadge: 'Facultatif',
    conditionalBadge: 'Requis si coché',
    requiredLegend: 'Les champs marqués * sont obligatoires. Les autres sont facultatifs.',
    errorSummaryTitle: 'Veuillez vérifier les champs suivants avant de continuer',
    errorSummarySingleTitle: 'Veuillez corriger 1 champ avant de continuer',
    errorSummaryHint: 'Cliquez sur une ligne pour accéder directement au champ.',
    fixFieldPrefix: 'Aller à',
    allergiesOptionalNote: 'Laissez vide si vous n’avez aucune allergie ou restriction alimentaire.',
    allergyChips: ['Aucune allergie', 'Sans gluten', 'Végétarien / Végan'],
    guestsUnit: 'invités',
    guestUnitSingular: 'invité',
    errFullName: 'Indiquez votre nom complet (au moins 2 caractères).',
    errWhatsapp: 'Indiquez un numéro WhatsApp valide avec indicatif international (7 à 18 chiffres).',
    errEmail: 'Indiquez une adresse email valide pour recevoir votre billet.',
    errCountry: 'Indiquez votre pays de résidence.',
    errTermsRequired: 'Cochez la case d’acceptation des conditions pour continuer.',
    fieldLabelFullName: 'Nom complet',
    fieldLabelAge: 'Âge',
    fieldLabelCountry: 'Pays',
    fieldLabelWhatsapp: 'Téléphone / WhatsApp',
    fieldLabelEmail: 'Adresse email',
    fieldLabelTerms: 'Acceptation des conditions',
  },
  de: {
    requiredBadge: 'Pflichtfeld',
    optionalBadge: 'Optional',
    conditionalBadge: 'Erforderlich bei Auswahl',
    requiredLegend: 'Felder mit * sind Pflichtfelder. Alle weiteren Angaben sind optional.',
    errorSummaryTitle: 'Bitte prüfen Sie die folgenden Felder vor dem Fortfahren',
    errorSummarySingleTitle: 'Bitte korrigieren Sie 1 Feld vor dem Fortfahren',
    errorSummaryHint: 'Klicken Sie auf einen Eintrag, um direkt zum Feld zu springen.',
    fixFieldPrefix: 'Springen zu',
    allergiesOptionalNote: 'Leer lassen, falls keine Allergien oder Unverträglichkeiten vorliegen.',
    allergyChips: ['Keine Allergien', 'Glutenfrei', 'Vegetarisch / Vegan'],
    guestsUnit: 'Gäste',
    guestUnitSingular: 'Gast',
    errFullName: 'Bitte geben Sie Ihren vollständigen Namen ein (mind. 2 Zeichen).',
    errWhatsapp: 'Bitte geben Sie eine gültige Handy-/WhatsApp-Nummer mit Vorwahl ein.',
    errEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    errCountry: 'Bitte geben Sie Ihr Wohnsitzland an.',
    errTermsRequired: 'Bitte akzeptieren Sie die Bedingungen und Einlassregeln.',
    fieldLabelFullName: 'Vollständiger Name',
    fieldLabelAge: 'Alter',
    fieldLabelCountry: 'Land',
    fieldLabelWhatsapp: 'Telefon / WhatsApp',
    fieldLabelEmail: 'E-Mail-Adresse',
    fieldLabelTerms: 'AGB-Zustimmung',
  },
  pt: {
    requiredBadge: 'Obrigatório',
    optionalBadge: 'Opcional',
    requiredLegend: 'Campos com * são obrigatórios. Os demais são opcionais.',
    errorSummaryTitle: 'Verifique os campos abaixo antes de continuar',
    allergyChips: ['Sem alergias', 'Sem glúten', 'Vegetariano / Vegano'],
    guestsUnit: 'convidados',
    guestUnitSingular: 'convidado',
  },
  nl: {
    requiredBadge: 'Verplicht',
    optionalBadge: 'Optioneel',
    requiredLegend: 'Velden met * zijn verplicht. Alle andere velden zijn optioneel.',
    errorSummaryTitle: 'Controleer de onderstaande velden voordat u verdergaat',
    allergyChips: ['Geen allergieën', 'Glutenvrij', 'Vegetarisch / Vegan'],
    guestsUnit: 'gasten',
    guestUnitSingular: 'gast',
  },
  ru: {
    requiredBadge: 'Обязательно',
    optionalBadge: 'Необязательно',
    requiredLegend: 'Поля со звёздочкой * обязательны. Остальные поля не обязательны.',
    errorSummaryTitle: 'Проверьте указанные поля перед продолжением',
    allergyChips: ['Без аллергий', 'Без глютена', 'Вегетарианское / Веган'],
    guestsUnit: 'гостей',
    guestUnitSingular: 'гость',
  },
  tr: {
    requiredBadge: 'Zorunlu',
    optionalBadge: 'İsteğe bağlı',
    requiredLegend: 'Yıldızlı (*) alanlar zorunludur. Diğer alanlar isteğe bağlıdır.',
    errorSummaryTitle: 'Devam etmeden önce aşağıdaki alanları kontrol edin',
    allergyChips: ['Alerji yok', 'Glutensiz', 'Vejetaryen / Vegan'],
    guestsUnit: 'kişi',
    guestUnitSingular: 'kişi',
  },
  zh: {
    requiredBadge: '必填',
    optionalBadge: '选填',
    requiredLegend: '带 * 号为必填项，其余均为选填。',
    errorSummaryTitle: '请先检查并修正以下信息',
    allergyChips: ['无过敏', '无麸质', '素食 / 纯素'],
    guestsUnit: '位宾客',
    guestUnitSingular: '位宾客',
  },
  ar: {
    requiredBadge: 'إلزامي',
    optionalBadge: 'اختياري',
    requiredLegend: 'الحقول المميزة بـ * إلزامية، وما عداها اختياري.',
    errorSummaryTitle: 'يرجى مراجعة الحقول التالية قبل المتابعة',
    allergyChips: ['لا توجد حساسية', 'خالٍ من الغلوتين', 'نباتي'],
    guestsUnit: 'ضيوف',
    guestUnitSingular: 'ضيف',
  },
  pl: {
    requiredBadge: 'Wymagane',
    optionalBadge: 'Opcjonalne',
    requiredLegend: 'Pola oznaczone * są wymagane. Pozostałe są opcjonalne.',
    errorSummaryTitle: 'Sprawdź poniższe pola przed kontynuacją',
    allergyChips: ['Brak alergii', 'Bez glutenu', 'Wegetariańskie / Wegańskie'],
    guestsUnit: 'gości',
    guestUnitSingular: 'gość',
  },
  ro: {
    requiredBadge: 'Obligatoriu',
    optionalBadge: 'Opțional',
    requiredLegend: 'Câmpurile cu * sunt obligatorii. Restul sunt opționale.',
    errorSummaryTitle: 'Verifică câmpurile de mai jos înainte de a continua',
    allergyChips: ['Fără alergii', 'Fără gluten', 'Vegetarian / Vegan'],
    guestsUnit: 'invitați',
    guestUnitSingular: 'invitat',
  },
  el: {
    requiredBadge: 'Υποχρεωτικό',
    optionalBadge: 'Προαιρετικό',
    requiredLegend: 'Τα πεδία με * είναι υποχρεωτικά. Όλα τα υπόλοιπα είναι προαιρετικά.',
    errorSummaryTitle: 'Ελέγξτε τα παρακάτω πεδία πριν συνεχίσετε',
    allergyChips: ['Καμία αλλεργία', 'Χωρίς γλουτένη', 'Χορτοφαγικό / Vegan'],
    guestsUnit: 'άτομα',
    guestUnitSingular: 'άτομο',
  },
  uk: {
    requiredBadge: 'Обов’язково',
    optionalBadge: 'Необов’язково',
    requiredLegend: 'Поля з * обов’язкові. Усі інші поля необов’язкові.',
    errorSummaryTitle: 'Перевірте наведені поля перед продовженням',
    allergyChips: ['Без алергій', 'Без глютену', 'Вегетаріанське / Веган'],
    guestsUnit: 'гостей',
    guestUnitSingular: 'гість',
  },
  sv: {
    requiredBadge: 'Obligatoriskt',
    optionalBadge: 'Valfritt',
    allergyChips: ['Inga allergier', 'Glutenfri', 'Vegetariskt / Veganskt'],
    guestsUnit: 'gäster',
    guestUnitSingular: 'gäst',
  },
  no: {
    requiredBadge: 'Obligatorisk',
    optionalBadge: 'Valgfritt',
    allergyChips: ['Ingen allergier', 'Glutenfri', 'Vegetar / Vegansk'],
    guestsUnit: 'gjester',
    guestUnitSingular: 'gjest',
  },
  da: {
    requiredBadge: 'Påkrævet',
    optionalBadge: 'Valgfri',
    allergyChips: ['Ingen allergier', 'Glutenfri', 'Vegetar / Vegansk'],
    guestsUnit: 'gæster',
    guestUnitSingular: 'gæst',
  },
  fi: {
    requiredBadge: 'Pakollinen',
    optionalBadge: 'Valinnainen',
    allergyChips: ['Ei allergioita', 'Gluteeniton', 'Kasvis / Vegaani'],
    guestsUnit: 'vierasta',
    guestUnitSingular: 'vieras',
  },
  cs: {
    requiredBadge: 'Povinné',
    optionalBadge: 'Volitelné',
    allergyChips: ['Bez alergií', 'Bez lepku', 'Vegetariánské / Veganské'],
    guestsUnit: 'hostů',
    guestUnitSingular: 'host',
  },
  sk: {
    requiredBadge: 'Povinné',
    optionalBadge: 'Voliteľné',
    allergyChips: ['Bez alergií', 'Bez lepku', 'Vegetariánske / Vegánske'],
    guestsUnit: 'hostí',
    guestUnitSingular: 'hosť',
  },
  hu: {
    requiredBadge: 'Kötelező',
    optionalBadge: 'Opcionális',
    allergyChips: ['Nincs allergia', 'Gluténmentes', 'Vegetáriánus / Vegán'],
    guestsUnit: 'vendég',
    guestUnitSingular: 'vendég',
  },
  bg: {
    requiredBadge: 'Задължително',
    optionalBadge: 'По избор',
    allergyChips: ['Без алергии', 'Без глутен', 'Вегетарианско / Веган'],
    guestsUnit: 'гости',
    guestUnitSingular: 'гост',
  },
  hr: {
    requiredBadge: 'Obavezno',
    optionalBadge: 'Neobavezno',
    allergyChips: ['Bez alergija', 'Bez glutena', 'Vegetarijansko / Vegansko'],
    guestsUnit: 'gostiju',
    guestUnitSingular: 'gost',
  },
  sl: {
    requiredBadge: 'Obvezno',
    optionalBadge: 'Neobvezno',
    allergyChips: ['Brez alergij', 'Brez glutena', 'Vegetarijansko / Vegansko'],
    guestsUnit: 'gostov',
    guestUnitSingular: 'gost',
  },
  sr: {
    requiredBadge: 'Obavezno',
    optionalBadge: 'Opciona napomena',
    allergyChips: ['Nema alergija', 'Bez glutena', 'Vegetarijansko / Vegansko'],
    guestsUnit: 'gostiju',
    guestUnitSingular: 'gost',
  },
  bs: {
    requiredBadge: 'Obavezno',
    optionalBadge: 'Opcionalno',
    allergyChips: ['Nema alergija', 'Bez glutena', 'Vegetarijansko / Vegansko'],
    guestsUnit: 'gostiju',
    guestUnitSingular: 'gost',
  },
  mk: {
    requiredBadge: 'Задолжително',
    optionalBadge: 'По избор',
    allergyChips: ['Без алергии', 'Без глутен', 'Вегетаријанско / Веган'],
    guestsUnit: 'гости',
    guestUnitSingular: 'гостин',
  },
  sq: {
    requiredBadge: 'E detyrueshme',
    optionalBadge: 'Opsionale',
    allergyChips: ['Asnjë alergji', 'Pa gluten', 'Vegjetarian / Vegan'],
    guestsUnit: 'persona',
    guestUnitSingular: 'person',
  },
  et: {
    requiredBadge: 'Kohustuslik',
    optionalBadge: 'Valikuline',
    allergyChips: ['Allergiad puuduvad', 'Gluteenivaba', 'Taimetoit / Vegan'],
    guestsUnit: 'külalist',
    guestUnitSingular: 'külaline',
  },
  lv: {
    requiredBadge: 'Obligāti',
    optionalBadge: 'Neobligāti',
    allergyChips: ['Nav alerģiju', 'Bez glutēna', 'Veģetārs / Vegāns'],
    guestsUnit: 'viesi',
    guestUnitSingular: 'viesis',
  },
  lt: {
    requiredBadge: 'Privaloma',
    optionalBadge: 'Pasirinktinai',
    allergyChips: ['Nėra alergijų', 'Be glitimo', 'Vegetariškas / Veganiškas'],
    guestsUnit: 'svečiai',
    guestUnitSingular: 'svečias',
  },
  ga: {
    requiredBadge: 'Riachtanach',
    optionalBadge: 'Roghnach',
    allergyChips: ['Gan ailléirgí', 'Saor ó ghlútan', 'Veigeatórach / Véigeánach'],
    guestsUnit: 'aíonna',
    guestUnitSingular: 'aoi',
  },
  mt: {
    requiredBadge: 'Meħtieġ',
    optionalBadge: 'Fakultattiv',
    allergyChips: ['Ebda allerġija', 'Mingħajr glutina', 'Veġetarjan / Vegan'],
    guestsUnit: 'mistiedna',
    guestUnitSingular: 'mistieden',
  },
  is: {
    requiredBadge: 'Skylt',
    optionalBadge: 'Valkvætt',
    allergyChips: ['Engin ofnæmi', 'Glútenlaust', 'Grænmetis / Vegan'],
    guestsUnit: 'gestir',
    guestUnitSingular: 'gestur',
  },
};

export const CHECKOUT_UX_COPY_35: Readonly<Record<LocaleCode, CheckoutUxCopy>> = {
  en: UX_EN,
  it: UX_IT,
  es: { ...UX_EN, ...(UX_OVERRIDES.es || {}) },
  fr: { ...UX_EN, ...(UX_OVERRIDES.fr || {}) },
  de: { ...UX_EN, ...(UX_OVERRIDES.de || {}) },
  pt: { ...UX_EN, ...(UX_OVERRIDES.pt || {}) },
  nl: { ...UX_EN, ...(UX_OVERRIDES.nl || {}) },
  ru: { ...UX_EN, ...(UX_OVERRIDES.ru || {}) },
  tr: { ...UX_EN, ...(UX_OVERRIDES.tr || {}) },
  zh: { ...UX_EN, ...(UX_OVERRIDES.zh || {}) },
  ar: { ...UX_EN, ...(UX_OVERRIDES.ar || {}) },
  bg: { ...UX_EN, ...(UX_OVERRIDES.bg || {}) },
  hr: { ...UX_EN, ...(UX_OVERRIDES.hr || {}) },
  cs: { ...UX_EN, ...(UX_OVERRIDES.cs || {}) },
  da: { ...UX_EN, ...(UX_OVERRIDES.da || {}) },
  et: { ...UX_EN, ...(UX_OVERRIDES.et || {}) },
  fi: { ...UX_EN, ...(UX_OVERRIDES.fi || {}) },
  el: { ...UX_EN, ...(UX_OVERRIDES.el || {}) },
  hu: { ...UX_EN, ...(UX_OVERRIDES.hu || {}) },
  ga: { ...UX_EN, ...(UX_OVERRIDES.ga || {}) },
  lv: { ...UX_EN, ...(UX_OVERRIDES.lv || {}) },
  lt: { ...UX_EN, ...(UX_OVERRIDES.lt || {}) },
  mt: { ...UX_EN, ...(UX_OVERRIDES.mt || {}) },
  pl: { ...UX_EN, ...(UX_OVERRIDES.pl || {}) },
  ro: { ...UX_EN, ...(UX_OVERRIDES.ro || {}) },
  sk: { ...UX_EN, ...(UX_OVERRIDES.sk || {}) },
  sl: { ...UX_EN, ...(UX_OVERRIDES.sl || {}) },
  sv: { ...UX_EN, ...(UX_OVERRIDES.sv || {}) },
  no: { ...UX_EN, ...(UX_OVERRIDES.no || {}) },
  is: { ...UX_EN, ...(UX_OVERRIDES.is || {}) },
  uk: { ...UX_EN, ...(UX_OVERRIDES.uk || {}) },
  sq: { ...UX_EN, ...(UX_OVERRIDES.sq || {}) },
  sr: { ...UX_EN, ...(UX_OVERRIDES.sr || {}) },
  bs: { ...UX_EN, ...(UX_OVERRIDES.bs || {}) },
  mk: { ...UX_EN, ...(UX_OVERRIDES.mk || {}) },
};

export function getCheckoutUxCopy(locale: string): CheckoutUxCopy {
  return (
    (CHECKOUT_UX_COPY_35 as Record<string, CheckoutUxCopy>)[locale] ||
    CHECKOUT_UX_COPY_35[DEFAULT_LOCALE]
  );
}
