import { getWords35 } from '@/lib/capodanno/capodannoUi35';
import { getVoyaNyeContent } from '@/lib/capodanno/voya35';
import { getApricaSkuLocalized35 } from '@/lib/capodanno/apricaWinterWeek35';
import type { SinglePassCopyPack } from './i18n35';
import type { SinglePassPackageCategory, SinglePassSku, SinglePassVenueId, SinglePassVenueSpec } from './types';

export type LocaleSpSeed = {
  seoTitle?: string;
  seoDescription?: string;
  heroH1?: string;
  checkoutTitle?: string;
  nye: string;
  cart: string;
  acc: string;
  add: string;
  buy: string;
  ty: string;
  checkout: string;
  pay: string;
  remove: string;
  login: string;
  reg: string;
  lookup: string;
  logout: string;
  paid: string;
  pend: string;
  guest: string;
  guests: string;
  feeDetail: string;
  catLabels: Record<SinglePassPackageCategory, string>;
  embTitle: string;
  embCta: string;
  equalPrice: string;
  waFrom20: string;
  ageWord: string;
  targetAgeWord: string;
  emailLbl: string;
  waLbl: string;
  nameLbl: string;
  passLbl: string;
  termsLbl: string;
  privLbl: string;
  refLbl: string;
  countryLbl: string;
  langsLbl: string;
  dietaryLbl: string;
  fxNoticeLbl: string;
  currLbl: string;
  emptyCartLbl: string;
  processingLbl: string;
  detailsStepLbl: string;
  payStepLbl: string;
  voucherLbl: string;
  updateProfLbl: string;
  totalChargedLbl: string;
  tierQualifiers: {
    floor: string;
    balcony: string;
    stage: string;
    firstFloor: string;
    fifthFloor: string;
    terrace: string;
    earlyBird: string;
    regular: string;
    galaPrefix: string;
    couple: string;
    adult: string;
    child: string;
  };
};

function makePackFromSeed(loc: string, cfg: LocaleSpSeed): SinglePassCopyPack {
  const w = getWords35(loc);
  const shortVenues: Partial<Record<SinglePassVenueId, string>> = {
    gate: 'PERREO XL Gate (18–26)',
    pineta: 'Pineta Under 30 (18–29)',
    repvblic: 'REPVBLIC (22–40)',
    justme: 'Just Me Luxury (30–49)',
    bischeri: 'Bischeri (50+)',
    bobino: 'Bobino Navigli (25–45)',
    voya: 'Voya Rooftop (25–50)',
    'justme-garda': 'JustMe Garda (21+)',
    'terrazza-duomo-21': 'Terrazza Duomo 21 & MA.RE',
    'magazzini-generali': 'Magazzini Generali',
    pelledoca: 'Pelledoca Milano',
    'the-club': 'The Club Milano',
    'terrazza-gallia': 'Terrazza Gallia 5★L',
    'the-beach': 'The Beach Milano',
    'zelig-cabaret': 'Area Zelig Cabaret',
    'dazi-milano': 'Dazi Milano',
    'aprica-world-winter-week': 'World Winter Week Aprica',
    'club-event': `${w.eventsBreadcrumb} · Nightlife Milan`,
  };
  const h1 = cfg.heroH1 || `Single Pass ${cfg.nye}: ${w.lblVenueType.replace(/^1\.\s*/, '')} & ${w.verifiedEventsLabel}`;
  const seoTitle = cfg.seoTitle || `Single Pass ${cfg.nye} · Nightlife Milan`;
  const seoDesc = cfg.seoDescription || `${h1}. ${cfg.equalPrice}. ${cfg.waFrom20}.`;
  return {
    seoTitle,
    seoDescription: seoDesc,
    navShopLabel: 'SINGLE PASS',
    navCartLabel: cfg.cart,
    navAccountLabel: cfg.acc,
    heroEyebrow: `SINGLE PASS · ${cfg.nye.toUpperCase()}`,
    heroH1: h1,
    heroSubtitle: `${cfg.equalPrice}. ${cfg.waFrom20}. Nightlife Milan (31/12/2026).`,
    trustOnlinePayment: `${w.colPrices} · ${cfg.pay}`,
    trustEqualPrice: cfg.equalPrice,
    trustWhatsAppDate: cfg.waFrom20,
    trustConciergeHost: 'Nightlife Milan Concierge · WhatsApp +39 351 912 7047',
    filterHeading: w.filterEyebrow,
    filterAllVenues: w.venueTypes.all,
    filterAllCategories: w.formulas.all,
    categoryLabels: cfg.catLabels,
    basePriceLabel: w.colPrices,
    feeLabel: `Booking fee 20% · ${cfg.feeDetail}`,
    feeCalculatedAtCheckoutNote: `Booking fee 20% · ${cfg.feeDetail}`,
    totalLabel: cfg.totalChargedLbl,
    arrivalLabel: w.hoursLabel.replace(/:$/, ''),
    guestsLabel: cfg.guests,
    addToCartCta: cfg.add,
    buyNowCta: cfg.buy,
    addedFeedback: `${cfg.add} ✓`,
    viewVenueDetails: w.viewPackagesCta.replace(/\s*→$/, ''),
    howItWorksEyebrow: 'SINGLE PASS · NIGHTLIFE MILAN',
    howItWorksHeading: `${cfg.nye} · ${w.verifiedEventsLabel}`,
    howItWorksSteps: [
      {
        title: `1. ${cfg.ageWord} & ${w.lblVenueType.replace(/^1\.\s*/, '')}`,
        body: 'Gate (18–26), Pineta (18–29), REPVBLIC (22–40), Just Me (30–49), Voya (25–50), Garda (21+), Bischeri (50+).',
      },
      {
        title: `2. ${cfg.pay}`,
        body: 'Visa, Mastercard, Apple Pay, Google Pay · nightlifemilan.com.',
      },
      {
        title: `3. ${cfg.acc} & PIN`,
        body: `${cfg.voucherLbl} · NLM-SP PIN · nightlifemilan.com.`,
      },
      {
        title: '4. WhatsApp (20/12/2026)',
        body: `${cfg.waFrom20} (+39 351 912 7047).`,
      },
    ],
    drawerTitle: cfg.cart,
    drawerEmptyTitle: cfg.emptyCartLbl,
    drawerEmptyBody: cfg.embTitle,
    drawerExploreCta: cfg.embCta,
    drawerSubtotalLabel: w.colPrices,
    drawerCheckoutCta: cfg.checkout,
    drawerCartCta: cfg.cart,
    drawerAccountCta: cfg.acc,
    removeItemLabel: cfg.remove,
    checkoutTitle: cfg.checkoutTitle || `${cfg.checkout} · Nightlife Milan`,
    checkoutSubtitle: `nightlifemilan.com · ${cfg.emailLbl} & WhatsApp`,
    stepDetailsLabel: `1. ${cfg.detailsStepLbl}`,
    stepPaymentLabel: `2. ${cfg.payStepLbl}`,
    currencySelectorLabel: cfg.currLbl,
    fxRateNotice: cfg.fxNoticeLbl,
    eurOriginalLabel: 'EUR',
    billingTotalLabel: cfg.totalChargedLbl,
    chargedInCurrencyLabel: `${cfg.totalChargedLbl} (${cfg.currLbl})`,
    proceedToPaymentCta: cfg.pay,
    paySafelyCta: cfg.buy,
    paymentProcessingLabel: cfg.processingLbl,
    backToDetailsCta: `← ${cfg.cart}`,
    formFullName: cfg.nameLbl,
    formAge: `${cfg.ageWord} (31/12/2026)`,
    formCountry: cfg.countryLbl,
    formWhatsapp: cfg.waLbl,
    formWhatsappHint: cfg.waFrom20,
    formEmail: cfg.emailLbl,
    formCreateAccountToggle: cfg.reg,
    formPassword: `${cfg.passLbl} (8+)`,
    formPasswordHint: cfg.acc,
    formLanguages: cfg.langsLbl,
    formDietary: cfg.dietaryLbl,
    formTermsLabel: `Booking fee 20% · ${cfg.termsLbl}, ${cfg.privLbl}, ${cfg.refLbl} (nightlifemilan.com)`,
    termsPolicyLabel: cfg.termsLbl,
    privacyPolicyLabel: cfg.privLbl,
    refundPolicyLabel: cfg.refLbl,
    formPayNowCta: cfg.pay,
    pinetaUnder30Error: `Pineta Milano: 18–29 (${cfg.targetAgeWord}). Just Me 30–49 / Bischeri 50+.`,
    under18Error: '18+.',
    justme21PlusError: 'JustMe Milano: 21+.',
    bischeriAdvisory: 'Bischeri Milano (50+) & Voya Rooftop.',
    accountTitle: `${cfg.acc} · Nightlife Milan`,
    accountSubtitle: `${cfg.waFrom20} · ${cfg.emailLbl}`,
    tabLogin: cfg.login,
    tabRegister: cfg.reg,
    tabOrderLookup: cfg.lookup,
    loginCta: cfg.login,
    registerCta: cfg.reg,
    lookupCta: cfg.lookup,
    orderCodeLabel: 'NLM-SP-...',
    orderIdLabel: 'NLM-SP',
    logoutCta: cfg.logout,
    passStatusPaid: cfg.paid,
    passStatusPending: cfg.pend,
    completePaymentCta: cfg.pay,
    miniGroupHeading: 'WhatsApp Single Pass',
    miniGroupNoticeBody: cfg.waFrom20,
    miniGroupScheduledBody: cfg.waFrom20,
    miniGroupActiveBody: 'WhatsApp Single Pass ✓',
    openMiniGroupCta: 'WhatsApp →',
    updateProfileCta: cfg.updateProfLbl,
    viewVoucherCta: cfg.voucherLbl,
    thankYouEyebrow: `NIGHTLIFE MILAN · ${cfg.paid}`,
    thankYouHeading: cfg.ty,
    thankYouSubtitle: `${cfg.paid} · WhatsApp +39 351 912 7047`,
    customerContactsHeading: `${cfg.nameLbl} · ${cfg.emailLbl} · WhatsApp`,
    venueShortLabels: shortVenues,
    embeddedBannerTitle: cfg.embTitle,
    embeddedBannerBody: `${w.colPrices} · ${cfg.pay} · nightlifemilan.com`,
    embeddedBannerCta: cfg.embCta,
  };
}

const SEEDS_33: Record<string, LocaleSpSeed> = {
  es: {
    seoTitle: 'Single Pass Nochevieja Milán 2027 · Tienda Oficial Online',
    seoDescription: 'Single Pass Nochevieja Milán 2027: 8 clubes confirmados por edad, precios oficiales de sala y mini-grupo WhatsApp desde el 20/12.',
    heroH1: 'Single Pass Nochevieja Milán 2027: elige tu club por edad y paga en el sitio',
    checkoutTitle: 'Checkout Seguro en el Sitio · Nightlife Milan',
    nye: 'Nochevieja Milán 2027', cart: 'Carrito', acc: 'Mi Cuenta', add: 'Añadir al Carrito', buy: 'Comprar Ahora',
    ty: 'Gracias, tu pedido está confirmado', checkout: 'Finalizar Compra', pay: 'Pagar con Tarjeta',
    remove: 'Eliminar', login: 'Iniciar Sesión', reg: 'Registrarse', lookup: 'Buscar Pedido', logout: 'Salir',
    paid: 'PAGADO · BONO CONFIRMADO', pend: 'PENDIENTE DE PAGO', guest: 'invitado', guests: 'invitados',
    feeDetail: 'asesoría concierge y pago electrónico',
    catLabels: {
      'all-night-combo': 'All-Night Cena + Mesa', 'vip-table-share': 'Mesa VIP Compartida',
      'vip-table-full': 'Mesa VIP Privada Completa', 'gala-dinner': 'Cena de Gala Servida',
      'royal-buffet': 'Royal Buffet Social', 'club-entry': 'Entrada Club Oficial', 'holiday-special': 'Menú Especial Festivo',
    },
    embTitle: 'Reserva entradas oficiales directamente online', embCta: 'Explorar Tienda Single Pass',
    equalPrice: 'Mismo precio exacto para hombres y mujeres en todos los paquetes',
    waFrom20: 'Mini-grupo oficial de WhatsApp activo desde el 20 de diciembre de 2026',
    ageWord: 'Edad', targetAgeWord: 'Edad objetivo', emailLbl: 'Correo electrónico', waLbl: 'Teléfono / WhatsApp',
    nameLbl: 'Nombre completo', passLbl: 'Contraseña', termsLbl: 'Términos y Condiciones', privLbl: 'Privacidad', refLbl: 'Reembolsos',
    countryLbl: 'País de residencia', langsLbl: 'Idiomas hablados', dietaryLbl: 'Preferencias o alergias',
    fxNoticeLbl: 'Conversión oficial BCE en tiempo real', currLbl: 'Moneda de pago',
    emptyCartLbl: 'Tu carrito está vacío', processingLbl: 'Procesando pago...', detailsStepLbl: 'Datos personales',
    payStepLbl: 'Pago seguro', voucherLbl: 'Ver bono y código PIN', updateProfLbl: 'Actualizar datos', totalChargedLbl: 'Total del pedido',
    tierQualifiers: {
      floor: 'Pista', balcony: 'Balcón', stage: 'Privé Palco', firstFloor: '1ª Planta', fifthFloor: '5ª Planta',
      terrace: 'Terraza', earlyBird: 'Preventa', regular: 'Entrada General', galaPrefix: 'Gala',
      couple: '2 pers.', adult: 'Adulto', child: 'Infantil',
    },
  },
  fr: {
    seoTitle: 'Single Pass Nouvel An Milan 2027 · Billetterie Officielle',
    seoDescription: 'Single Pass Nouvel An Milan 2027 : 8 clubs confirmés par âge, tarifs officiels et mini-groupe WhatsApp dès le 20/12.',
    heroH1: 'Single Pass Nouvel An Milan 2027 : choisissez votre club par âge et réservez ici',
    checkoutTitle: 'Paiement Sécurisé sur Place · Nightlife Milan',
    nye: 'Nouvel An Milan 2027', cart: 'Panier', acc: 'Mon Compte', add: 'Ajouter au Panier', buy: 'Acheter Maintenant',
    ty: 'Merci, votre commande est confirmée', checkout: 'Paiement', pay: 'Payer par Carte',
    remove: 'Retirer', login: 'Connexion', reg: 'Créer un compte', lookup: 'Suivre ma commande', logout: 'Déconnexion',
    paid: 'PAYÉ · PASS CONFIRMÉ', pend: 'EN ATTENTE DE PAIEMENT', guest: 'invité', guests: 'invités',
    feeDetail: 'conseil conciergerie et paiement électronique',
    catLabels: {
      'all-night-combo': 'Formule Dîner + Table', 'vip-table-share': 'Table VIP Partagée',
      'vip-table-full': 'Table VIP Privée Complète', 'gala-dinner': 'Dîner de Gala Assise',
      'royal-buffet': 'Royal Buffet Social', 'club-entry': 'Entrée Club Officielle', 'holiday-special': 'Menu Spécial Fêtes',
    },
    embTitle: 'Achetez vos forfaits officiels directement en ligne', embCta: 'Découvrir la Boutique Single Pass',
    equalPrice: 'Tarif strictement identique hommes et femmes sur chaque forfait',
    waFrom20: 'Mini-groupe WhatsApp officiel actif dès le 20 décembre 2026',
    ageWord: 'Âge', targetAgeWord: 'Tranche d’âge', emailLbl: 'Adresse e-mail', waLbl: 'Téléphone / WhatsApp',
    nameLbl: 'Nom et Prénom', passLbl: 'Mot de passe', termsLbl: 'Conditions Générales', privLbl: 'Confidentialité', refLbl: 'Remboursements',
    countryLbl: 'Pays de résidence', langsLbl: 'Langues parlées', dietaryLbl: 'Régime ou allergies',
    fxNoticeLbl: 'Taux de change officiel BCE en direct', currLbl: 'Devise de paiement',
    emptyCartLbl: 'Votre panier est vide', processingLbl: 'Confirmation en cours...', detailsStepLbl: 'Vos coordonnées',
    payStepLbl: 'Paiement crypté', voucherLbl: 'Voir pass & code PIN', updateProfLbl: 'Mettre à jour le profil', totalChargedLbl: 'Montant total',
    tierQualifiers: {
      floor: 'Piste', balcony: 'Balcon', stage: 'Privé Scène', firstFloor: '1er Étage', fifthFloor: '5e Étage',
      terrace: 'Terrasse', earlyBird: 'Prévente', regular: 'Standard', galaPrefix: 'Gala',
      couple: 'Duo', adult: 'Adulte', child: 'Enfant',
    },
  },
  de: {
    seoTitle: 'Single Pass Silvester Mailand 2027 · Offizieller Online-Shop',
    seoDescription: 'Single Pass Silvester Mailand 2027: 8 geprüfte Clubs nach Alter, Originalpreise und WhatsApp-Kleingruppe ab 20.12.',
    heroH1: 'Single Pass Silvester Mailand 2027: Club nach Alter wählen & direkt buchen',
    checkoutTitle: 'Sicherer On-Site Checkout · Nightlife Milan',
    nye: 'Silvester Mailand 2027', cart: 'Warenkorb', acc: 'Mein Konto', add: 'In den Warenkorb', buy: 'Jetzt Kaufen',
    ty: 'Vielen Dank, Ihre Buchung ist bestätigt', checkout: 'Zur Kasse', pay: 'Mit Karte Zahlen',
    remove: 'Entfernen', login: 'Anmelden', reg: 'Registrieren', lookup: 'Buchung Suchen', logout: 'Abmelden',
    paid: 'BEZAHLT · VOUCHER BESTÄTIGT', pend: 'ZAHLUNG AUSSTEHEND', guest: 'Gast', guests: 'Gäste',
    feeDetail: 'Concierge-Beratung & elektronische Zahlung',
    catLabels: {
      'all-night-combo': 'All-Night Dinner + Tisch', 'vip-table-share': 'Geteilter VIP-Tisch',
      'vip-table-full': 'Kompletter Privé-VIP-Tisch', 'gala-dinner': 'Serviertes Galadinner',
      'royal-buffet': 'Royal Buffet Social', 'club-entry': 'Offizieller Club-Eintritt', 'holiday-special': 'Feiertags-Spezialmenü',
    },
    embTitle: 'Bestätigte Pakete direkt online buchen', embCta: 'Zum Single Pass Shop',
    equalPrice: 'Identischer Preis für Frauen und Männer bei allen Paketen',
    waFrom20: 'Offizielle WhatsApp-Kleingruppen ab dem 20. Dezember 2026 aktiv',
    ageWord: 'Alter', targetAgeWord: 'Altersgruppe', emailLbl: 'E-Mail-Adresse', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Vollständiger Name', passLbl: 'Passwort', termsLbl: 'AGB', privLbl: 'Datenschutz', refLbl: 'Erstattungsrichtlinie',
    countryLbl: 'Wohnsitzland', langsLbl: 'Gesprochene Sprachen', dietaryLbl: 'Allergien / Menüwunsch',
    fxNoticeLbl: 'Offizieller EZB-Wechselkurs in Echtzeit', currLbl: 'Zahlungswährung',
    emptyCartLbl: 'Ihr Warenkorb ist leer', processingLbl: 'Zahlung wird bestätigt...', detailsStepLbl: 'Kundendaten',
    payStepLbl: 'Sichere Zahlung', voucherLbl: 'Voucher & PIN öffnen', updateProfLbl: 'Profil aktualisieren', totalChargedLbl: 'Gesamtbetrag',
    tierQualifiers: {
      floor: 'Dancefloor', balcony: 'Empore', stage: 'Bühnen-Privé', firstFloor: '1. Etage', fifthFloor: '5. Etage',
      terrace: 'Terrasse', earlyBird: 'Vorverkauf', regular: 'Regulär', galaPrefix: 'Gala',
      couple: 'Für 2', adult: 'Erwachsener', child: 'Kind',
    },
  },
  pt: {
    seoTitle: 'Single Pass Réveillon Milão 2027 · Loja Oficial Online',
    heroH1: 'Single Pass Réveillon Milão 2027: escolhe o clube pela idade e compra no site',
    checkoutTitle: 'Checkout Seguro no Site · Nightlife Milan',
    nye: 'Réveillon Milão 2027', cart: 'Carrinho', acc: 'Minha Conta', add: 'Adicionar ao Carrinho', buy: 'Comprar Agora',
    ty: 'Obrigado, o seu pedido está confirmado', checkout: 'Finalizar Compra', pay: 'Pagar com Cartão',
    remove: 'Remover', login: 'Entrar', reg: 'Registar', lookup: 'Procurar Pedido', logout: 'Sair',
    paid: 'PAGO · VOUCHER CONFIRMADO', pend: 'AGUARDANDO PAGAMENTO', guest: 'convidado', guests: 'convidados',
    feeDetail: 'consultoria concierge e pagamento eletrónico',
    catLabels: {
      'all-night-combo': 'All-Night Ceia + Mesa', 'vip-table-share': 'Mesa VIP Partilhada',
      'vip-table-full': 'Mesa VIP Privada Completa', 'gala-dinner': 'Ceia de Gala Servida',
      'royal-buffet': 'Royal Buffet Social', 'club-entry': 'Entrada Oficial no Clube', 'holiday-special': 'Menu Especial Festivo',
    },
    embTitle: 'Compre pacotes oficiais diretamente online', embCta: 'Explorar Loja Single Pass',
    equalPrice: 'Preço idêntico para homens e mulheres em todos os pacotes',
    waFrom20: 'Mini-grupo oficial no WhatsApp ativo a partir de 20 de dezembro de 2026',
    ageWord: 'Idade', targetAgeWord: 'Faixa etária', emailLbl: 'Email', waLbl: 'Telemóvel / WhatsApp',
    nameLbl: 'Nome Completo', passLbl: 'Palavra-passe', termsLbl: 'Termos e Condições', privLbl: 'Privacidade', refLbl: 'Reembolso',
    countryLbl: 'País de residência', langsLbl: 'Idiomas falados', dietaryLbl: 'Restrições alimentares',
    fxNoticeLbl: 'Câmbio oficial BCE em tempo real', currLbl: 'Moeda de pagamento',
    emptyCartLbl: 'O seu carrinho está vazio', processingLbl: 'A confirmar pagamento...', detailsStepLbl: 'Dados do cliente',
    payStepLbl: 'Pagamento seguro', voucherLbl: 'Ver voucher e PIN', updateProfLbl: 'Atualizar perfil', totalChargedLbl: 'Total do pedido',
    tierQualifiers: {
      floor: 'Pista', balcony: 'Varanda', stage: 'Camarote Palco', firstFloor: '1º Andar', fifthFloor: '5º Andar',
      terrace: 'Terraço', earlyBird: 'Antecipado', regular: 'Geral', galaPrefix: 'Gala',
      couple: '2 pessoas', adult: 'Adulto', child: 'Criança',
    },
  },
  nl: {
    heroH1: 'Single Pass Oud en Nieuw Milaan 2027: kies je club en betaal direct op de site',
    nye: 'Oud & Nieuw Milaan 2027', cart: 'Winkelwagen', acc: 'Mijn Account', add: 'In winkelwagen', buy: 'Nu kopen',
    ty: 'Bedankt, je bestelling is bevestigd', checkout: 'Afrekenen', pay: 'Veilig betalen met kaart',
    remove: 'Verwijderen', login: 'Inloggen', reg: 'Registreren', lookup: 'Bestelling zoeken', logout: 'Uitloggen',
    paid: 'BETAALD · VOUCHER BEVESTIGD', pend: 'WACHT OP BETALING', guest: 'gast', guests: 'gasten',
    feeDetail: 'conciërge-advies en elektronische betaling',
    catLabels: {
      'all-night-combo': 'Diner + VIP Tafel', 'vip-table-share': 'Gedeelde VIP Tafel',
      'vip-table-full': 'Privé VIP Tafel', 'gala-dinner': 'Galadiner aan tafel',
      'royal-buffet': 'Royal Buffet Social', 'club-entry': 'Clubtoegang', 'holiday-special': 'Feestdag Menu',
    },
    embTitle: 'Boek officiële pakketten direct online', embCta: 'Bekijk Single Pass Winkel',
    equalPrice: 'Gelijke prijs voor mannen en vrouwen in alle pakketten',
    waFrom20: 'Officiële WhatsApp mini-groep actief vanaf 20 december 2026',
    ageWord: 'Leeftijd', targetAgeWord: 'Leeftijdsgroep', emailLbl: 'E-mailadres', waLbl: 'Telefoon / WhatsApp',
    nameLbl: 'Volledige naam', passLbl: 'Wachtwoord', termsLbl: 'Voorwaarden', privLbl: 'Privacy', refLbl: 'Terugbetaling',
    countryLbl: 'Land van herkomst', langsLbl: 'Talen', dietaryLbl: 'Dieet / Allergieën',
    fxNoticeLbl: 'Actuele officiële ECB-wisselkoers', currLbl: 'Betaalvaluta',
    emptyCartLbl: 'Je winkelwagen is leeg', processingLbl: 'Betaling verwerken...', detailsStepLbl: 'Gegevens',
    payStepLbl: 'Veilig betalen', voucherLbl: 'Bekijk voucher & PIN', updateProfLbl: 'Profiel bijwerken', totalChargedLbl: 'Totaalbedrag',
    tierQualifiers: {
      floor: 'Dansvloer', balcony: 'Balkon', stage: 'Podium Privé', firstFloor: '1e Verdieping', fifthFloor: '5e Verdieping',
      terrace: 'Terras', earlyBird: 'Voorverkoop', regular: 'Standaard', galaPrefix: 'Gala',
      couple: '2 pers.', adult: 'Volwassene', child: 'Kind',
    },
  },
  ru: {
    seoTitle: 'Single Pass Новый год Милан 2027 · Официальный магазин',
    heroH1: 'Single Pass Новый год в Милане 2027: выберите клуб по возрасту и оплатите на сайте',
    checkoutTitle: 'Безопасная оплата на сайте · Nightlife Milan',
    nye: 'Новый год в Милане 2027', cart: 'Корзина', acc: 'Личный кабинет', add: 'В корзину', buy: 'Купить сейчас',
    ty: 'Спасибо, ваш заказ подтверждён', checkout: 'Оформление', pay: 'Оплатить картой',
    remove: 'Удалить', login: 'Войти', reg: 'Регистрация', lookup: 'Найти заказ', logout: 'Выйти',
    paid: 'ОПЛАЧЕНО · ВАУЧЕР ПОДТВЕРЖДЁН', pend: 'ОЖИДАЕТ ОПЛАТЫ', guest: 'гость', guests: 'гостей',
    feeDetail: 'консьерж-поддержка и электронная оплата',
    catLabels: {
      'all-night-combo': 'Ужин + VIP-стол', 'vip-table-share': 'Место за VIP-столом',
      'vip-table-full': 'Отдельный VIP-стол', 'gala-dinner': 'Гала-ужин',
      'royal-buffet': 'Фуршет Royal Buffet', 'club-entry': 'Вход в клуб', 'holiday-special': 'Праздничное меню',
    },
    embTitle: 'Бронируйте официальные билеты прямо на сайте', embCta: 'Открыть каталог Single Pass',
    equalPrice: 'Единая цена для мужчин и женщин без скрытых условий',
    waFrom20: 'Официальная мини-группа WhatsApp открывается с 20 декабря 2026 года',
    ageWord: 'Возраст', targetAgeWord: 'Возрастная группа', emailLbl: 'Email', waLbl: 'Телефон / WhatsApp',
    nameLbl: 'Имя и фамилия', passLbl: 'Пароль', termsLbl: 'Условия', privLbl: 'Конфиденциальность', refLbl: 'Возврат',
    countryLbl: 'Страна проживания', langsLbl: 'Языки общения', dietaryLbl: 'Меню и аллергии',
    fxNoticeLbl: 'Официальный курс ЕЦБ в реальном времени', currLbl: 'Валюта оплаты',
    emptyCartLbl: 'Корзина пуста', processingLbl: 'Подтверждение оплаты...', detailsStepLbl: 'Данные гостя',
    payStepLbl: 'Безопасная оплата', voucherLbl: 'Открыть ваучер и PIN', updateProfLbl: 'Обновить контакты', totalChargedLbl: 'Итого к оплате',
    tierQualifiers: {
      floor: 'Танцпол', balcony: 'Балкон', stage: 'VIP Сцена', firstFloor: '1 этаж', fifthFloor: '5 этаж',
      terrace: 'Терраса', earlyBird: 'Ранняя бронь', regular: 'Стандарт', galaPrefix: 'Гала',
      couple: 'На двоих', adult: 'Взрослый', child: 'Детский',
    },
  },
  tr: {
    heroH1: 'Milano Yılbaşı 2027 Single Pass: yaş grubuna göre kulüp seç ve siteden güvenle öde',
    nye: 'Yılbaşı Milano 2027', cart: 'Sepet', acc: 'Hesabım', add: 'Sepete ekle', buy: 'Hemen satın al',
    ty: 'Teşekkürler, siparişiniz onaylandı', checkout: 'Ödeme Adımı', pay: 'Kart ile Güvenli Öde',
    remove: 'Kaldır', login: 'Giriş Yap', reg: 'Kayıt Ol', lookup: 'Sipariş Sorgula', logout: 'Çıkış',
    paid: 'ÖDENDİ · BİLET ONAYLANDI', pend: 'ÖDEME BEKLİYOR', guest: 'kişi', guests: 'kişi',
    feeDetail: 'concierge danışmanlığı ve elektronik ödeme',
    catLabels: {
      'all-night-combo': 'Yemek + VIP Masa', 'vip-table-share': 'Paylaşımlı VIP Masa',
      'vip-table-full': 'Özel VIP Masa', 'gala-dinner': 'Gala Yemeği',
      'royal-buffet': 'Royal Büfe', 'club-entry': 'Resmi Kulüp Girişi', 'holiday-special': 'Özel Bayram Menüsü',
    },
    embTitle: 'Onaylı paketleri doğrudan online ayırtın', embCta: 'Single Pass Mağazasına Git',
    equalPrice: 'Tüm paketlerde kadın ve erkek konuklar için eşit tarife',
    waFrom20: 'Resmi WhatsApp mini grubu 20 Aralık 2026 tarihinden itibaren aktif',
    ageWord: 'Yaş', targetAgeWord: 'Yaş grubu', emailLbl: 'E-posta', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Ad Soyad', passLbl: 'Şifre', termsLbl: 'Şartlar', privLbl: 'Gizlilik', refLbl: 'İade Koşulları',
    countryLbl: 'Yaşadığınız Ülke', langsLbl: 'Konuşulan Diller', dietaryLbl: 'Menü Tercihi / Alerji',
    fxNoticeLbl: 'Anlık resmi ECB döviz kuru', currLbl: 'Ödeme Para Birimi',
    emptyCartLbl: 'Sepetiniz boş', processingLbl: 'Ödeme onaylanıyor...', detailsStepLbl: 'Konuk Bilgileri',
    payStepLbl: 'Güvenli Ödeme', voucherLbl: 'Bilet ve PIN Görüntüle', updateProfLbl: 'Bilgileri Güncelle', totalChargedLbl: 'Toplam Tutar',
    tierQualifiers: {
      floor: 'Pist', balcony: 'Balkon', stage: 'Sahne Privé', firstFloor: '1. Kat', fifthFloor: '5. Kat',
      terrace: 'Teras', earlyBird: 'Erken Kayıt', regular: 'Standart', galaPrefix: 'Gala',
      couple: '2 Kişi', adult: 'Yetişkin', child: 'Çocuk',
    },
  },
  zh: {
    heroH1: '2027 米兰跨年 Single Pass 独立通行证：按年龄筛选夜店并站内直接结账',
    checkoutTitle: '站内安全直付结账 · Nightlife Milan',
    nye: '2027米兰跨年夜', cart: '购物车', acc: '个人中心', add: '加入购物车', buy: '立即预订',
    ty: '感谢您，您的订单已确认', checkout: '结账', pay: '在线银行卡支付',
    remove: '移除', login: '登录', reg: '注册账号', lookup: '查询订单', logout: '退出',
    paid: '已支付 · 电子凭证已确认', pend: '等待付款', guest: '位宾客', guests: '位宾客',
    feeDetail: '礼宾咨询与电子支付服务',
    catLabels: {
      'all-night-combo': '晚宴+VIP卡座组合', 'vip-table-share': 'VIP共享卡座名额',
      'vip-table-full': '整桌VIP专属卡座', 'gala-dinner': '跨年正式晚宴',
      'royal-buffet': '皇家鸡尾酒自助', 'club-entry': '官方夜店入场券', 'holiday-special': '节庆特选菜单',
    },
    embTitle: '直接在线预订官方认证套餐', embCta: '进入 Single Pass 商店',
    equalPrice: '男女同价统一标准，透明官方价目表',
    waFrom20: '2026年12月20日起开通官方WhatsApp同行小组',
    ageWord: '年龄', targetAgeWord: '目标年龄段', emailLbl: '电子邮箱', waLbl: '手机号 / WhatsApp',
    nameLbl: '姓名', passLbl: '密码', termsLbl: '条款与细则', privLbl: '隐私政策', refLbl: '退款说明',
    countryLbl: '居住国家', langsLbl: '常用语言', dietaryLbl: '餐食偏好或忌口',
    fxNoticeLbl: '欧洲央行官方实时汇率折算', currLbl: '结算币种',
    emptyCartLbl: '您的购物车为空', processingLbl: '正在确认付款...', detailsStepLbl: '宾客资料',
    payStepLbl: '加密支付', voucherLbl: '查看凭证与PIN码', updateProfLbl: '更新联系方式', totalChargedLbl: '应付总额',
    tierQualifiers: {
      floor: '舞池区', balcony: '二楼看台', stage: '舞台VIP专席', firstFloor: '1楼', fifthFloor: '5楼露台',
      terrace: '露台', earlyBird: '早鸟票', regular: '标准票', galaPrefix: '跨年晚宴',
      couple: '双人', adult: '成人', child: '儿童',
    },
  },
  ar: {
    heroH1: 'بطاقة Single Pass رأس السنة في ميلانو 2027: اختر النادي وادفع مباشرة على الموقع',
    checkoutTitle: 'الدفع المباشر الآمن على الموقع · Nightlife Milan',
    nye: 'رأس السنة ميلانو 2027', cart: 'سلة التسوق', acc: 'حسابي', add: 'أضف إلى السلة', buy: 'اشترِ الآن',
    ty: 'شكراً لك، تم تأكيد طلبك', checkout: 'إتمام الدفع', pay: 'الدفع بالبطاقة بأمان',
    remove: 'إزالة', login: 'تسجيل الدخول', reg: 'إنشاء حساب', lookup: 'البحث عن الطلب', logout: 'خروج',
    paid: 'مدفوع · قسيمة مؤكدة', pend: 'بانتظار الدفع', guest: 'ضيف', guests: 'ضيوف',
    feeDetail: 'استشارة الكونسيرج والدفع الإلكتروني',
    catLabels: {
      'all-night-combo': 'عشاء + طاولة VIP', 'vip-table-share': 'مقعد طاولة VIP مشترك',
      'vip-table-full': 'طاولة VIP خاصة كاملة', 'gala-dinner': 'عشاء غالا رسمي',
      'royal-buffet': 'بوفيه ملكي', 'club-entry': 'دخول رسمي للنادي', 'holiday-special': 'قائمة احتفالية خاصة',
    },
    embTitle: 'احجز الباقات المؤكدة مباشرة عبر الإنترنت', embCta: 'تصفح متجر Single Pass',
    equalPrice: 'نفس السعر الموحد للرجال والنساء في جميع الباقات',
    waFrom20: 'تفتح مجموعة واتساب الرسمية ابتداءً من 20 ديسمبر 2026',
    ageWord: 'العمر', targetAgeWord: 'الفئة العمرية', emailLbl: 'البريد الإلكتروني', waLbl: 'رقم الهاتف / واتساب',
    nameLbl: 'الاسم الكامل', passLbl: 'كلمة المرور', termsLbl: 'الشروط والأحكام', privLbl: 'الخصوصية', refLbl: 'الاسترداد',
    countryLbl: 'بلد الإقامة', langsLbl: 'اللغات المتحدثة', dietaryLbl: 'تفضيلات الطعام',
    fxNoticeLbl: 'تحويل فوري وفق سعر الصرف الأوروبي الرسمي', currLbl: 'عملة الدفع',
    emptyCartLbl: 'سلة التسوق فارغة', processingLbl: 'جارٍ تأكيد الدفع...', detailsStepLbl: 'بيانات الضيف',
    payStepLbl: 'دفع إلكتروني آمن', voucherLbl: 'عرض التذكرة والرمز', updateProfLbl: 'تحديث البيانات', totalChargedLbl: 'المبلغ الإجمالي',
    tierQualifiers: {
      floor: 'الساحة الرئيسية', balcony: 'الشرفة العلوية', stage: 'منصة VIP', firstFloor: 'الطابق 1', fifthFloor: 'الطابق 5',
      terrace: 'التراس', earlyBird: 'الحجز المبكر', regular: 'دخول قياسي', galaPrefix: 'غالا',
      couple: 'لشخصين', adult: 'بالغ', child: 'طفل',
    },
  },
};

function makeEuroSp(
  loc: string,
  b: {
    nye: string; cart: string; acc: string; add: string; buy: string; ty: string;
    checkout: string; pay: string; remove: string; login: string; reg: string; lookup: string;
    logout: string; paid: string; pend: string; guest: string; guests: string;
    feeDetail: string; catLabels: Record<SinglePassPackageCategory, string>;
    embTitle: string; embCta: string; equalPrice: string; waFrom20: string;
    ageWord: string; targetAgeWord: string; emailLbl: string; waLbl: string; nameLbl: string;
    passLbl: string; termsLbl: string; privLbl: string; refLbl: string;
    countryLbl: string; langsLbl: string; dietaryLbl: string; voucherLbl: string; totalChargedLbl: string;
    seoTitle?: string; heroH1?: string;
    qual?: Partial<LocaleSpSeed['tierQualifiers']>;
  },
): LocaleSpSeed {
  const w = getWords35(loc);
  return {
    ...b,
    fxNoticeLbl: `${w.colPrices} · ECB`,
    currLbl: 'EUR / USD / CHF / GBP',
    emptyCartLbl: `${b.cart} · 0`,
    processingLbl: `${b.checkout}...`,
    detailsStepLbl: b.nameLbl,
    payStepLbl: b.pay,
    updateProfLbl: b.acc,
    tierQualifiers: {
      floor: b.qual?.floor || 'Pista',
      balcony: b.qual?.balcony || 'Balconata',
      stage: b.qual?.stage || 'VIP Palco',
      firstFloor: b.qual?.firstFloor || '1° Piano',
      fifthFloor: b.qual?.fifthFloor || '5° Piano',
      terrace: b.qual?.terrace || 'Rooftop',
      earlyBird: b.qual?.earlyBird || 'Early Bird',
      regular: b.qual?.regular || b.catLabels['club-entry'],
      galaPrefix: b.qual?.galaPrefix || 'Gala',
      couple: b.qual?.couple || `2 ${b.guests}`,
      adult: b.qual?.adult || b.guest,
      child: b.qual?.child || 'Junior',
    },
  };
}

const EURO_24: Array<[string, Parameters<typeof makeEuroSp>[1]]> = [
  ['bg', {
    nye: 'Нова година 2027 Милано', cart: 'Количка', acc: 'Моят профил', add: 'Добави в количката', buy: 'Купи сега',
    ty: 'Благодарим ви, поръчката е потвърдена', checkout: 'Плащане', pay: 'Плати с карта',
    remove: 'Премахни', login: 'Вход', reg: 'Регистрация', lookup: 'Търси поръчка', logout: 'Изход',
    paid: 'ПЛАТЕНО · ПОТВЪРДЕНО', pend: 'ИЗЧАКВА ПЛАЩАНЕ', guest: 'гост', guests: 'гости',
    feeDetail: 'консиерж съдействие и електронно плащане',
    catLabels: { 'all-night-combo': 'Вечеря + VIP маса', 'vip-table-share': 'Споделена VIP маса', 'vip-table-full': 'Цяла VIP маса', 'gala-dinner': 'Гала вечеря', 'royal-buffet': 'Royal бюфет', 'club-entry': 'Официален вход', 'holiday-special': 'Празнично меню' },
    embTitle: 'Резервирайте официални пакети онлайн', embCta: 'Разгледай Single Pass',
    equalPrice: 'Еднаква цена за мъже и жени', waFrom20: 'WhatsApp мини-група активна от 20.12.2026',
    ageWord: 'Възраст', targetAgeWord: 'Възрастова група', emailLbl: 'Email', waLbl: 'Телефон / WhatsApp',
    nameLbl: 'Име и фамилия', passLbl: 'Парола', termsLbl: 'Условия', privLbl: 'Поверителност', refLbl: 'Възстановяване',
    countryLbl: 'Държава', langsLbl: 'Езици', dietaryLbl: 'Хранителни предпочитания', voucherLbl: 'Ваучер и PIN', totalChargedLbl: 'Обща сума',
  }],
  ['hr', {
    nye: 'Nova godina 2027 Milano', cart: 'Košarica', acc: 'Moj račun', add: 'Dodaj u košaricu', buy: 'Kupi sada',
    ty: 'Hvala vam, narudžba je potvrđena', checkout: 'Naplata', pay: 'Plati karticom',
    remove: 'Ukloni', login: 'Prijava', reg: 'Registracija', lookup: 'Pronađi narudžbu', logout: 'Odjava',
    paid: 'PLAĆENO · VAUČER POTVRĐEN', pend: 'ČEKA UPLATU', guest: 'gost', guests: 'gostiju',
    feeDetail: 'concierge savjetovanje i elektroničko plaćanje',
    catLabels: { 'all-night-combo': 'Večera + VIP stol', 'vip-table-share': 'Dijeljeni VIP stol', 'vip-table-full': 'Cijeli VIP stol', 'gala-dinner': 'Gala večera', 'royal-buffet': 'Royal švedski stol', 'club-entry': 'Službeni ulaz', 'holiday-special': 'Blagdanski jelovnik' },
    embTitle: 'Kupite potvrđene pakete izravno online', embCta: 'Istraži Single Pass',
    equalPrice: 'Jednaka cijena za muškarce i žene', waFrom20: 'WhatsApp mini-grupa aktivna od 20.12.2026',
    ageWord: 'Dob', targetAgeWord: 'Dobna skupina', emailLbl: 'Email', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Ime i prezime', passLbl: 'Lozinka', termsLbl: 'Uvjeti', privLbl: 'Privatnost', refLbl: 'Povrat',
    countryLbl: 'Država', langsLbl: 'Jezici', dietaryLbl: 'Prehrana i alergije', voucherLbl: 'Vaučer i PIN', totalChargedLbl: 'Ukupno',
  }],
  ['cs', {
    nye: 'Silvestr Milán 2027', cart: 'Košík', acc: 'Můj účet', add: 'Přidat do košíku', buy: 'Koupit nyní',
    ty: 'Děkujeme, vaše objednávka je potvrzena', checkout: 'Pokladna', pay: 'Zaplatit kartou',
    remove: 'Odebrat', login: 'Přihlásit', reg: 'Registrace', lookup: 'Najít objednávku', logout: 'Odhlásit',
    paid: 'ZAPLACENO · POTVRZENO', pend: 'ČEKÁ NA PLATBU', guest: 'host', guests: 'hostů',
    feeDetail: 'concierge poradenství a elektronická platba',
    catLabels: { 'all-night-combo': 'Večeře + VIP stůl', 'vip-table-share': 'Sdílený VIP stůl', 'vip-table-full': 'Celý VIP stůl', 'gala-dinner': 'Galavečeře', 'royal-buffet': 'Royal raut', 'club-entry': 'Oficiální vstup', 'holiday-special': 'Sváteční menu' },
    embTitle: 'Rezervujte potvrzené balíčky přímo online', embCta: 'Otevřít Single Pass',
    equalPrice: 'Stejná cena pro muže i ženy', waFrom20: 'WhatsApp mini-skupina aktivní od 20.12.2026',
    ageWord: 'Věk', targetAgeWord: 'Věková kategorie', emailLbl: 'E-mail', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Jméno a příjmení', passLbl: 'Heslo', termsLbl: 'Podmínky', privLbl: 'Soukromí', refLbl: 'Refundace',
    countryLbl: 'Země', langsLbl: 'Jazyky', dietaryLbl: 'Alergie / menu', voucherLbl: 'Voucher a PIN', totalChargedLbl: 'Celkem',
  }],
  ['da', {
    nye: 'Nytår Milano 2027', cart: 'Kurv', acc: 'Min konto', add: 'Læg i kurv', buy: 'Køb nu',
    ty: 'Tak, din bestilling er bekræftet', checkout: 'Gå til betaling', pay: 'Betal sikkert med kort',
    remove: 'Fjern', login: 'Log ind', reg: 'Opret konto', lookup: 'Find ordre', logout: 'Log ud',
    paid: 'BETALT · BEKRÆFTET', pend: 'AFVENTER BETALING', guest: 'gæst', guests: 'gæster',
    feeDetail: 'concierge-rådgivning og elektronisk betaling',
    catLabels: { 'all-night-combo': 'Middag + VIP Bord', 'vip-table-share': 'Delt VIP Bord', 'vip-table-full': 'Privat VIP Bord', 'gala-dinner': 'Gallamiddag', 'royal-buffet': 'Royal Buffet', 'club-entry': 'Officiel Klubentré', 'holiday-special': 'Særlig Helligdagsmenu' },
    embTitle: 'Book officielle pakker direkte online', embCta: 'Udforsk Single Pass',
    equalPrice: 'Ens pris for mænd og kvinder', waFrom20: 'WhatsApp-gruppe aktiv fra 20. december 2026',
    ageWord: 'Alder', targetAgeWord: 'Aldersgruppe', emailLbl: 'E-mail', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Fulde navn', passLbl: 'Adgangskode', termsLbl: 'Vilkår', privLbl: 'Privatliv', refLbl: 'Refusion',
    countryLbl: 'Land', langsLbl: 'Sprog', dietaryLbl: 'Allergier / menu', voucherLbl: 'Voucher & PIN', totalChargedLbl: 'Total pris',
  }],
  ['et', {
    nye: 'Aastavahetus Milano 2027', cart: 'Ostukorv', acc: 'Minu konto', add: 'Lisa korvi', buy: 'Osta kohe',
    ty: 'Aitäh, teie tellimus on kinnitatud', checkout: 'Kassa', pay: 'Maksa kaardiga',
    remove: 'Eemalda', login: 'Logi sisse', reg: 'Registreeru', lookup: 'Otsi tellimust', logout: 'Logi välja',
    paid: 'MAKSTUD · KINNITATUD', pend: 'OOTAB MAKSET', guest: 'külaline', guests: 'külalist',
    feeDetail: 'concierge-nõustamine ja elektrooniline makse',
    catLabels: { 'all-night-combo': 'Õhtusöök + VIP laud', 'vip-table-share': 'Jagatud VIP laud', 'vip-table-full': 'Privaatne VIP laud', 'gala-dinner': 'Galaõhtusöök', 'royal-buffet': 'Royal Buffet', 'club-entry': 'Ametlik sissepääs', 'holiday-special': 'Pühademenüü' },
    embTitle: 'Broneeri ametlikud paketid otse veebis', embCta: 'Ava Single Pass pood',
    equalPrice: 'Sama hind meestele ja naistele', waFrom20: 'WhatsAppi grupp avatud alates 20.12.2026',
    ageWord: 'Vanus', targetAgeWord: 'Vanusegrupp', emailLbl: 'E-post', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Täisnimi', passLbl: 'Parool', termsLbl: 'Tingimused', privLbl: 'Privaatsus', refLbl: 'Tagasimakse',
    countryLbl: 'Riik', langsLbl: 'Keeled', dietaryLbl: 'Toitumiseelistused', voucherLbl: 'Voucher ja PIN', totalChargedLbl: 'Kokku',
  }],
  ['fi', {
    nye: 'Uusivuosi Milano 2027', cart: 'Ostoskori', acc: 'Oma tili', add: 'Lisää koriin', buy: 'Osta nyt',
    ty: 'Kiitos, tilauksesi on vahvistettu', checkout: 'Kassa', pay: 'Maksa kortilla',
    remove: 'Poista', login: 'Kirjaudu', reg: 'Rekisteröidy', lookup: 'Etsi tilaus', logout: 'Kirjaudu ulos',
    paid: 'MAKSETTU · VAHVISTETTU', pend: 'ODOTTAA MAKSUA', guest: 'vieras', guests: 'vierasta',
    feeDetail: 'concierge-neuvonta ja sähköinen maksu',
    catLabels: { 'all-night-combo': 'Illallinen + VIP-pöytä', 'vip-table-share': 'Jaettu VIP-pöytä', 'vip-table-full': 'Yksityinen VIP-pöytä', 'gala-dinner': 'Gaalaillallinen', 'royal-buffet': 'Royal Buffet', 'club-entry': 'Virallinen klubilippu', 'holiday-special': 'Juhlamenu' },
    embTitle: 'Varaa vahvistetut paketit suoraan verkossa', embCta: 'Tutustu Single Pass -kauppaan',
    equalPrice: 'Sama hinta naisille ja miehille', waFrom20: 'Virallinen WhatsApp-ryhmä avautuu 20.12.2026',
    ageWord: 'Ikä', targetAgeWord: 'Ikäryhmä', emailLbl: 'Sähköposti', waLbl: 'Puhelin / WhatsApp',
    nameLbl: 'Koko nimi', passLbl: 'Salasana', termsLbl: 'Ehdot', privLbl: 'Tietosuoja', refLbl: 'Palautus',
    countryLbl: 'Maa', langsLbl: 'Kielet', dietaryLbl: 'Erityisruokavaliot', voucherLbl: 'Lippu ja PIN', totalChargedLbl: 'Yhteensä',
  }],
  ['el', {
    nye: 'Πρωτοχρονιά Μιλάνο 2027', cart: 'Καλάθι', acc: 'Ο λογαριασμός μου', add: 'Προσθήκη στο καλάθι', buy: 'Αγορά τώρα',
    ty: 'Ευχαριστούμε, η κράτησή σας επιβεβαιώθηκε', checkout: 'Ταμείο', pay: 'Πληρωμή με κάρτα',
    remove: 'Αφαίρεση', login: 'Σύνδεση', reg: 'Εγγραφή', lookup: 'Αναζήτηση παραγγελίας', logout: 'Έξοδος',
    paid: 'ΕΞΟΦΛΗΘΗΚΕ · ΕΠΙΒΕΒΑΙΩΜΕΝΟ', pend: 'ΑΝΑΜΟΝΗ ΠΛΗΡΩΜΗΣ', guest: 'άτομο', guests: 'άτομα',
    feeDetail: 'συμβουλευτική concierge και ηλεκτρονική πληρωμή',
    catLabels: { 'all-night-combo': 'Δείπνο + Τραπέζι VIP', 'vip-table-share': 'Κοινόχρηστο Τραπέζι VIP', 'vip-table-full': 'Ιδιωτικό Τραπέζι VIP', 'gala-dinner': 'Γκαλά Δείπνο', 'royal-buffet': 'Royal Μπουφές', 'club-entry': 'Επίσημη Είσοδος Club', 'holiday-special': 'Εορταστικό Μενού' },
    embTitle: 'Κλείστε επίσημα πακέτα απευθείας online', embCta: 'Δείτε το Single Pass Shop',
    equalPrice: 'Ίδια τιμή για άνδρες και γυναίκες', waFrom20: 'Επίσημη ομάδα WhatsApp ενεργή από 20/12/2026',
    ageWord: 'Ηλικία', targetAgeWord: 'Ηλικιακή ομάδα', emailLbl: 'Email', waLbl: 'Τηλέφωνο / WhatsApp',
    nameLbl: 'Ονοματεπώνυμο', passLbl: 'Κωδικός', termsLbl: 'Όροι Χρήσης', privLbl: 'Απόρρητο', refLbl: 'Επιστροφές',
    countryLbl: 'Χώρα', langsLbl: 'Γλώσσες', dietaryLbl: 'Διατροφικές προτιμήσεις', voucherLbl: 'Voucher & PIN', totalChargedLbl: 'Σύνολο',
  }],
  ['hu', {
    nye: 'Szilveszter Milánó 2027', cart: 'Kosár', acc: 'Fiókom', add: 'Kosárba', buy: 'Vásárlás most',
    ty: 'Köszönjük, rendelése megerősítve', checkout: 'Pénztár', pay: 'Kártyás fizetés',
    remove: 'Eltávolítás', login: 'Belépés', reg: 'Regisztráció', lookup: 'Rendelés keresése', logout: 'Kilépés',
    paid: 'FIZETVE · MEGERŐSÍTVE', pend: 'FIZETÉSRE VÁR', guest: 'vendég', guests: 'vendég',
    feeDetail: 'concierge tanácsadás és elektronikus fizetés',
    catLabels: { 'all-night-combo': 'Vacsora + VIP asztal', 'vip-table-share': 'Megosztott VIP asztal', 'vip-table-full': 'Teljes VIP asztal', 'gala-dinner': 'Gálavacsora', 'royal-buffet': 'Royal büfé', 'club-entry': 'Hivatalos klubbelépő', 'holiday-special': 'Ünnepi menü' },
    embTitle: 'Foglaljon hivatalos csomagokat közvetlenül online', embCta: 'Single Pass Bolt',
    equalPrice: 'Azonos ár férfiaknak és nőknek', waFrom20: 'WhatsApp mini-csoport 2026.12.20-tól aktív',
    ageWord: 'Életkor', targetAgeWord: 'Korcsoport', emailLbl: 'E-mail', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Teljes név', passLbl: 'Jelszó', termsLbl: 'Feltételek', privLbl: 'Adatvédelem', refLbl: 'Visszatérítés',
    countryLbl: 'Ország', langsLbl: 'Beszélt nyelvek', dietaryLbl: 'Étrendi igények', voucherLbl: 'Voucher és PIN', totalChargedLbl: 'Végösszeg',
  }],
  ['ga', {
    nye: 'Oíche Chinn Bliana Milano 2027', cart: 'Cairt', acc: 'Mo Chuntas', add: 'Cuir sa chairt', buy: 'Ceannaigh Anois',
    ty: 'Go raibh maith agat, tá d’ordú deimhnithe', checkout: 'Seiceáil Amach', pay: 'Íoc le Cárta',
    remove: 'Bain', login: 'Logáil isteach', reg: 'Cláraigh', lookup: 'Aimsigh Ordú', logout: 'Logáil amach',
    paid: 'ÍOCTHA · DEIMHNITHE', pend: 'AG FEITHEAMH LE HÍOCAÍOCHT', guest: 'aoi', guests: 'aíonna',
    feeDetail: 'comhairle concierge agus íocaíocht leictreonach',
    catLabels: { 'all-night-combo': 'Dinnéar + Tábla VIP', 'vip-table-share': 'Tábla VIP Roinnte', 'vip-table-full': 'Tábla VIP Príobháideach', 'gala-dinner': 'Dinnéar Gála', 'royal-buffet': 'Buifé Ríoga', 'club-entry': 'Cead Isteach Oifigiúil', 'holiday-special': 'Biachlár Féile' },
    embTitle: 'Cuir pacáistí deimhnithe in áirithe ar líne', embCta: 'Siopa Single Pass',
    equalPrice: 'An praghas céanna d’fhir agus do mhná', waFrom20: 'Mionghrúpa WhatsApp gníomhach ó 20/12/2026',
    ageWord: 'Aois', targetAgeWord: 'Aoisghrúpa', emailLbl: 'Ríomhphost', waLbl: 'Fón / WhatsApp',
    nameLbl: 'Ainm Iomlán', passLbl: 'Pasfhocal', termsLbl: 'Téarmaí', privLbl: 'Príobháideacht', refLbl: 'Aisíocaíocht',
    countryLbl: 'Tír', langsLbl: 'Teangacha', dietaryLbl: 'Ailléirgí bia', voucherLbl: 'Dearbhán & PIN', totalChargedLbl: 'Iomlán',
  }],
  ['lv', {
    nye: 'Jaungads Milānā 2027', cart: 'Grozs', acc: 'Mans konts', add: 'Pievienot grozam', buy: 'Pirkt tūlīt',
    ty: 'Paldies, jūsu pasūtījums ir apstiprināts', checkout: 'Apmaksa', pay: 'Maksāt ar karti',
    remove: 'Dzēst', login: 'Pieslēgties', reg: 'Reģistrēties', lookup: 'Meklēt pasūtījumu', logout: 'Iziet',
    paid: 'APMAKSĀTS · APSTIPRINĀTS', pend: 'GAIDA APMAKSU', guest: 'viesis', guests: 'viesi',
    feeDetail: 'konsjerža konsultācija un elektroniskais maksājums',
    catLabels: { 'all-night-combo': 'Vakariņas + VIP galds', 'vip-table-share': 'Dalīts VIP galds', 'vip-table-full': 'Privāts VIP galds', 'gala-dinner': 'Svētku vakariņas', 'royal-buffet': 'Royal bufete', 'club-entry': 'Kluba biļete', 'holiday-special': 'Svētku ēdienkarte' },
    embTitle: 'Rezervējiet oficiālās pakas tiešsaistē', embCta: 'Atvērt Single Pass veikalu',
    equalPrice: 'Vienāda cena sievietēm un vīriešiem', waFrom20: 'WhatsApp mini-grupa aktīva no 20.12.2026',
    ageWord: 'Vecums', targetAgeWord: 'Vecuma grupa', emailLbl: 'E-pasts', waLbl: 'Tālrunis / WhatsApp',
    nameLbl: 'Vārds, Uzvārds', passLbl: 'Parole', termsLbl: 'Noteikumi', privLbl: 'Privātums', refLbl: 'Atmaksa',
    countryLbl: 'Valsts', langsLbl: 'Valodas', dietaryLbl: 'Ēdienkartes piezīmes', voucherLbl: 'Biļete un PIN', totalChargedLbl: 'Kopā',
  }],
  ['lt', {
    nye: 'Naujieji Milane 2027', cart: 'Krepšelis', acc: 'Mano paskyra', add: 'Į krepšelį', buy: 'Pirkti dabar',
    ty: 'Ačiū, jūsų užsakymas patvirtintas', checkout: 'Apmokėjimas', pay: 'Mokėti kortele',
    remove: 'Pašalinti', login: 'Prisijungti', reg: 'Registruotis', lookup: 'Rasti užsakymą', logout: 'Atsijungti',
    paid: 'APMOKĖTA · PATVIRTINTA', pend: 'LAUKIA APMOKĖJIMO', guest: 'svečias', guests: 'svečių',
    feeDetail: 'konsjeržo konsultacija ir elektroninis mokėjimas',
    catLabels: { 'all-night-combo': 'Vakarienė + VIP stalas', 'vip-table-share': 'Bendras VIP stalas', 'vip-table-full': 'Privatus VIP stalas', 'gala-dinner': 'Gala vakarienė', 'royal-buffet': 'Royal švediškas stalas', 'club-entry': 'Oficialus įėjimas', 'holiday-special': 'Šventinis meniu' },
    embTitle: 'Užsisakykite oficialius paketus internetu', embCta: 'Single Pass parduotuvė',
    equalPrice: 'Vienoda kaina vyrams ir moterims', waFrom20: 'WhatsApp grupė veikia nuo 2026-12-20',
    ageWord: 'Amžius', targetAgeWord: 'Amžiaus grupė', emailLbl: 'El. paštas', waLbl: 'Telefonas / WhatsApp',
    nameLbl: 'Vardas Pavardė', passLbl: 'Slaptažodis', termsLbl: 'Sąlygos', privLbl: 'Privatumas', refLbl: 'Grąžinimas',
    countryLbl: 'Šalis', langsLbl: 'Kalbos', dietaryLbl: 'Mitybos pastabos', voucherLbl: 'Bilietas ir PIN', totalChargedLbl: 'Iš viso',
  }],
  ['mt', {
    nye: 'Ewwel tas-Sena Milan 2027', cart: 'Karrettun', acc: 'Kont Tiegħi', add: 'Żid mal-karrettun', buy: 'Ixtri Issa',
    ty: 'Grazzi, l-ordni tiegħek hija kkonfermata', checkout: 'Ħlas', pay: 'Ħallas b’Kard',
    remove: 'Neħħi', login: 'Idħol', reg: 'Irreġistra', lookup: 'Fittex Ordni', logout: 'Oħroġ',
    paid: 'IMĦALLAS · IKKONFERMAT', pend: 'JISTENNA L-ĦLAS', guest: 'mistieden', guests: 'mistednin',
    feeDetail: 'konsulenza concierge u pagament elettroniku',
    catLabels: { 'all-night-combo': 'Ikla + Mejda VIP', 'vip-table-share': 'Mejda VIP Maqsuma', 'vip-table-full': 'Mejda VIP Privata', 'gala-dinner': 'Gala Dinner', 'royal-buffet': 'Royal Buffet', 'club-entry': 'Dħul Uffiċjali', 'holiday-special': 'Menu Speċjali' },
    embTitle: 'Ibbukkja pakketti uffiċjali direttament online', embCta: 'Ħanut Single Pass',
    equalPrice: 'L-istess prezz għall-irġiel u n-nisa', waFrom20: 'Grupp WhatsApp attiv mill-20 ta’ Diċembru 2026',
    ageWord: 'Età', targetAgeWord: 'Grupp ta’ età', emailLbl: 'Email', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Isem Sħiħ', passLbl: 'Password', termsLbl: 'Termini', privLbl: 'Privatezza', refLbl: 'Rifużjoni',
    countryLbl: 'Pajjiż', langsLbl: 'Lingwi', dietaryLbl: 'Allerġiji', voucherLbl: 'Voucher u PIN', totalChargedLbl: 'Total',
  }],
  ['pl', {
    heroH1: 'Single Pass Sylwester Mediolan 2027: wybierz klub według wieku i kup online',
    nye: 'Sylwester Mediolan 2027', cart: 'Koszyk', acc: 'Moje konto', add: 'Dodaj do koszyka', buy: 'Kup teraz',
    ty: 'Dziękujemy, Twoje zamówienie zostało potwierdzone', checkout: 'Przejdź do kasy', pay: 'Zapłać kartą',
    remove: 'Usuń', login: 'Zaloguj się', reg: 'Rejestracja', lookup: 'Znajdź zamówienie', logout: 'Wyloguj',
    paid: 'OPŁACONO · VOUCHER POTWIERDZONY', pend: 'OCZEKUJE NA PŁATNOŚĆ', guest: 'gość', guests: 'gości',
    feeDetail: 'doradztwo concierge i płatność elektroniczna',
    catLabels: { 'all-night-combo': 'Kolacja + Stolik VIP', 'vip-table-share': 'Wspólny Stolik VIP', 'vip-table-full': 'Cały Stolik VIP', 'gala-dinner': 'Kolacja Galowa', 'royal-buffet': 'Royal Bufet', 'club-entry': 'Oficjalny Wstęp', 'holiday-special': 'Menu Świąteczne' },
    embTitle: 'Kup potwierdzone pakiety bezpośrednio online', embCta: 'Sklep Single Pass',
    equalPrice: 'Taka sama cena dla kobiet i mężczyzn', waFrom20: 'Oficjalna mini-grupa WhatsApp od 20 grudnia 2026',
    ageWord: 'Wiek', targetAgeWord: 'Grupa wiekowa', emailLbl: 'E-mail', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Imię i nazwisko', passLbl: 'Hasło', termsLbl: 'Regulamin', privLbl: 'Prywatność', refLbl: 'Zwroty',
    countryLbl: 'Kraj zamieszkania', langsLbl: 'Języki', dietaryLbl: 'Preferencje / alergie', voucherLbl: 'Voucher i PIN', totalChargedLbl: 'Razem do zapłaty',
    qual: { floor: 'Parkiet', balcony: 'Balkon', stage: 'VIP Scena', earlyBird: 'Przedsprzedaż' },
  }],
  ['ro', {
    heroH1: 'Single Pass Revelion Milano 2027: alege clubul după vârstă și plătește direct pe site',
    nye: 'Revelion Milano 2027', cart: 'Coș', acc: 'Contul meu', add: 'Adaugă în coș', buy: 'Cumpără acum',
    ty: 'Mulțumim, comanda ta este confirmată', checkout: 'Mergi la checkout', pay: 'Plătește cu cardul',
    remove: 'Șterge', login: 'Autentificare', reg: 'Înregistrare', lookup: 'Caută comanda', logout: 'Deconectare',
    paid: 'PLĂTIT · VOUCHER CONFIRMAT', pend: 'ÎN AȘTEPTAREA PLĂȚII', guest: 'persoană', guests: 'persoane',
    feeDetail: 'consultanță concierge și plată electronică',
    catLabels: { 'all-night-combo': 'Cină + Masă VIP', 'vip-table-share': 'Loc la Masă VIP', 'vip-table-full': 'Masă VIP Completă', 'gala-dinner': 'Cină de Gală', 'royal-buffet': 'Royal Bufet', 'club-entry': 'Intrare Oficială Club', 'holiday-special': 'Meniu Special' },
    embTitle: 'Rezervă pachete confirmate direct online', embCta: 'Explorează Single Pass',
    equalPrice: 'Preț identic pentru bărbați și femei', waFrom20: 'Mini-grup WhatsApp activ din 20 decembrie 2026',
    ageWord: 'Vârstă', targetAgeWord: 'Categorie de vârstă', emailLbl: 'Email', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Nume complet', passLbl: 'Parolă', termsLbl: 'Termeni', privLbl: 'Confidențialitate', refLbl: 'Rambursare',
    countryLbl: 'Țara', langsLbl: 'Limbi vorbite', dietaryLbl: 'Preferințe meniu', voucherLbl: 'Voucher și PIN', totalChargedLbl: 'Total de plată',
    qual: { floor: 'Ring', balcony: 'Balcon', stage: 'VIP Scenă', earlyBird: 'Early Bird' },
  }],
  ['sk', {
    nye: 'Silvester Miláno 2027', cart: 'Košík', acc: 'Môj účet', add: 'Pridať do košíka', buy: 'Kúpiť teraz',
    ty: 'Ďakujeme, vaša objednávka je potvrdená', checkout: 'Pokladňa', pay: 'Zaplatiť kartou',
    remove: 'Odstrániť', login: 'Prihlásiť sa', reg: 'Registrácia', lookup: 'Nájsť objednávku', logout: 'Odhlásiť sa',
    paid: 'ZAPLATENÉ · POTVRDENÉ', pend: 'ČAKÁ NA PLATBU', guest: 'hosť', guests: 'hostí',
    feeDetail: 'concierge poradenstvo a elektronická platba',
    catLabels: { 'all-night-combo': 'Večera + VIP stôl', 'vip-table-share': 'Zdieľaný VIP stôl', 'vip-table-full': 'Celý VIP stôl', 'gala-dinner': 'Galavečera', 'royal-buffet': 'Royal raut', 'club-entry': 'Oficiálny vstup', 'holiday-special': 'Sviatočné menu' },
    embTitle: 'Rezervujte potvrdené balíčky priamo online', embCta: 'Obchod Single Pass',
    equalPrice: 'Rovnaká cena pre mužov aj ženy', waFrom20: 'WhatsApp mini-skupina aktívna od 20.12.2026',
    ageWord: 'Vek', targetAgeWord: 'Veková kategória', emailLbl: 'E-mail', waLbl: 'Telefón / WhatsApp',
    nameLbl: 'Meno a priezvisko', passLbl: 'Heslo', termsLbl: 'Podmienky', privLbl: 'Súkromie', refLbl: 'Vrátenie platby',
    countryLbl: 'Krajina', langsLbl: 'Jazyky', dietaryLbl: 'Alergie', voucherLbl: 'Voucher a PIN', totalChargedLbl: 'Celkom',
  }],
  ['sl', {
    nye: 'Silvestrovo Milano 2027', cart: 'Košarica', acc: 'Moj račun', add: 'Dodaj v košarico', buy: 'Kupi zdaj',
    ty: 'Hvala, vaše naročilo je potrjeno', checkout: 'Blagajna', pay: 'Plačaj s kartico',
    remove: 'Odstrani', login: 'Prijava', reg: 'Registracija', lookup: 'Poišči naročilo', logout: 'Odjava',
    paid: 'PLAČANO · POTRJENO', pend: 'ČAKA NA PLAČILO', guest: 'gost', guests: 'gostov',
    feeDetail: 'concierge svetovanje in elektronsko plačilo',
    catLabels: { 'all-night-combo': 'Večerja + VIP miza', 'vip-table-share': 'Deljena VIP miza', 'vip-table-full': 'Zasebna VIP miza', 'gala-dinner': 'Gala večerja', 'royal-buffet': 'Royal bife', 'club-entry': 'Uradni vstop', 'holiday-special': 'Praznični meni' },
    embTitle: 'Rezervirajte potrjene pakete neposredno prek spleta', embCta: 'Trgovina Single Pass',
    equalPrice: 'Enaka cena za moške in ženske', waFrom20: 'WhatsApp mini skupina aktivna od 20.12.2026',
    ageWord: 'Starost', targetAgeWord: 'Starostna skupina', emailLbl: 'E-pošta', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Ime in priimek', passLbl: 'Geslo', termsLbl: 'Pogoji', privLbl: 'Zasebnost', refLbl: 'Vračilo',
    countryLbl: 'Država', langsLbl: 'Jeziki', dietaryLbl: 'Alergije', voucherLbl: 'Kupon in PIN', totalChargedLbl: 'Skupaj',
  }],
  ['sv', {
    nye: 'Nyår Milano 2027', cart: 'Varukorg', acc: 'Mitt konto', add: 'Lägg i varukorg', buy: 'Köp nu',
    ty: 'Tack, din bokning är bekräftad', checkout: 'Kassa', pay: 'Betala med kort',
    remove: 'Ta bort', login: 'Logga in', reg: 'Registrera', lookup: 'Hitta order', logout: 'Logga ut',
    paid: 'BETALD · BEKRÄFTAD', pend: 'VÄNTAR PÅ BETALNING', guest: 'gäst', guests: 'gäster',
    feeDetail: 'concierge-rådgivning och elektronisk betalning',
    catLabels: { 'all-night-combo': 'Middag + VIP-bord', 'vip-table-share': 'Delat VIP-bord', 'vip-table-full': 'Helt VIP-bord', 'gala-dinner': 'Galamiddag', 'royal-buffet': 'Royal Buffé', 'club-entry': 'Officiell Klubb-entré', 'holiday-special': 'Högtidsmeny' },
    embTitle: 'Boka officiella paket direkt online', embCta: 'Single Pass Butik',
    equalPrice: 'Samma pris för kvinnor och män', waFrom20: 'Officiell WhatsApp-grupp aktiv från 20 dec 2026',
    ageWord: 'Ålder', targetAgeWord: 'Åldersgrupp', emailLbl: 'E-post', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Fullständigt namn', passLbl: 'Lösenord', termsLbl: 'Villkor', privLbl: 'Integritet', refLbl: 'Återbetalning',
    countryLbl: 'Land', langsLbl: 'Språk', dietaryLbl: 'Allergier', voucherLbl: 'Biljett & PIN', totalChargedLbl: 'Totalt',
  }],
  ['no', {
    nye: 'Nyttår Milano 2027', cart: 'Handlekurv', acc: 'Min konto', add: 'Legg i handlekurv', buy: 'Kjøp nå',
    ty: 'Takk, bestillingen din er bekreftet', checkout: 'Kasse', pay: 'Betal med kort',
    remove: 'Fjern', login: 'Logg inn', reg: 'Registrer', lookup: 'Søk ordre', logout: 'Logg ut',
    paid: 'BETALT · BEKREFTET', pend: 'VENTER PÅ BETALING', guest: 'gjest', guests: 'gjester',
    feeDetail: 'concierge-rådgivning og elektronisk betaling',
    catLabels: { 'all-night-combo': 'Middag + VIP-bord', 'vip-table-share': 'Delt VIP-bord', 'vip-table-full': 'Privat VIP-bord', 'gala-dinner': 'Gallamiddag', 'royal-buffet': 'Royal Buffet', 'club-entry': 'Offisiell Inngang', 'holiday-special': 'Høytidsmeny' },
    embTitle: 'Bestill bekreftede pakker direkte på nett', embCta: 'Single Pass Butikk',
    equalPrice: 'Lik pris for kvinner og menn', waFrom20: 'Offisiell WhatsApp-gruppe aktiv fra 20. des 2026',
    ageWord: 'Alder', targetAgeWord: 'Aldersgruppe', emailLbl: 'E-post', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Fullt navn', passLbl: 'Passord', termsLbl: 'Vilkår', privLbl: 'Personvern', refLbl: 'Refusjon',
    countryLbl: 'Land', langsLbl: 'Språk', dietaryLbl: 'Allergier', voucherLbl: 'Billett & PIN', totalChargedLbl: 'Totalt',
  }],
  ['is', {
    nye: 'Gamlársnótt Mílanó 2027', cart: 'Karfa', acc: 'Minn reikningur', add: 'Setja í körfu', buy: 'Kaupa núna',
    ty: 'Takk, pöntunin þín er staðfest', checkout: 'Afgreiðsla', pay: 'Greiða með korti',
    remove: 'Fjarlægja', login: 'Innskrá', reg: 'Nýskrá', lookup: 'Leita að pöntun', logout: 'Útskrá',
    paid: 'GREITT · STAÐFEST', pend: 'BÍÐUR GREIÐSLU', guest: 'gestur', guests: 'gestir',
    feeDetail: 'concierge-ráðgjöf og rafræn greiðsla',
    catLabels: { 'all-night-combo': 'Kvöldverður + VIP-borð', 'vip-table-share': 'Deilt VIP-borð', 'vip-table-full': 'Heilt VIP-borð', 'gala-dinner': 'Hátíðarkvöldverður', 'royal-buffet': 'Royal Hlaðborð', 'club-entry': 'Opinber Aðgangur', 'holiday-special': 'Hátíðarmatseðill' },
    embTitle: 'Bókaðu staðfesta pakka beint á netinu', embCta: 'Single Pass Verslun',
    equalPrice: 'Sama verð fyrir karla og konur', waFrom20: 'Opinber WhatsApp hópur virkur frá 20. des 2026',
    ageWord: 'Aldur', targetAgeWord: 'Aldurshópur', emailLbl: 'Netfang', waLbl: 'Sími / WhatsApp',
    nameLbl: 'Fullt nafn', passLbl: 'Lykilorð', termsLbl: 'Skilmálar', privLbl: 'Persónuvernd', refLbl: 'Endurgreiðsla',
    countryLbl: 'Land', langsLbl: 'Tungumál', dietaryLbl: 'Ofnæmi', voucherLbl: 'Miði & PIN', totalChargedLbl: 'Samtals',
  }],
  ['uk', {
    heroH1: 'Single Pass Новий рік у Мілані 2027: вибір клубу за віком та оплата на сайті',
    nye: 'Новий рік у Мілані 2027', cart: 'Кошик', acc: 'Особистий кабінет', add: 'Додати в кошик', buy: 'Купити зараз',
    ty: 'Дякуємо, ваше замовлення підтверджено', checkout: 'Оформлення', pay: 'Оплатити карткою',
    remove: 'Видалити', login: 'Увійти', reg: 'Реєстрація', lookup: 'Знайти замовлення', logout: 'Вийти',
    paid: 'ОПЛАЧЕНО · ПІДТВЕРДЖЕНО', pend: 'ОЧІКУЄ ОПЛАТИ', guest: 'гість', guests: 'гостей',
    feeDetail: 'консьєрж-підтримка та електронна оплата',
    catLabels: { 'all-night-combo': 'Вечеря + VIP-стіл', 'vip-table-share': 'Місце за VIP-столом', 'vip-table-full': 'Приватний VIP-стіл', 'gala-dinner': 'Гала-вечеря', 'royal-buffet': 'Фуршет Royal', 'club-entry': 'Офіційний вхід', 'holiday-special': 'Святкове меню' },
    embTitle: 'Бронюйте офіційні пакети безпосередньо онлайн', embCta: 'Каталог Single Pass',
    equalPrice: 'Єдина ціна для чоловіків і жінок', waFrom20: 'Міні-група WhatsApp відкривається 20 грудня 2026',
    ageWord: 'Вік', targetAgeWord: 'Вікова група', emailLbl: 'Email', waLbl: 'Телефон / WhatsApp',
    nameLbl: 'Ім’я та прізвище', passLbl: 'Пароль', termsLbl: 'Умови', privLbl: 'Конфіденційність', refLbl: 'Повернення',
    countryLbl: 'Країна', langsLbl: 'Мови', dietaryLbl: 'Алергії', voucherLbl: 'Ваучер і PIN', totalChargedLbl: 'Разом',
  }],
  ['sq', {
    nye: 'Viti i Ri Milano 2027', cart: 'Shporta', acc: 'Llogaria ime', add: 'Shto në shportë', buy: 'Bli tani',
    ty: 'Faleminderit, porosia juaj u konfirmua', checkout: 'Arka', pay: 'Paguaj me kartë',
    remove: 'Hiq', login: 'Hyr', reg: 'Regjistrohu', lookup: 'Kërko porosinë', logout: 'Dil',
    paid: 'PAGUAR · KONFIRMUAR', pend: 'NË PRITJE TË PAGESËS', guest: 'mik', guests: 'miq',
    feeDetail: 'këshillim concierge dhe pagesë elektronike',
    catLabels: { 'all-night-combo': 'Darkë + Tavolinë VIP', 'vip-table-share': 'Tavolinë VIP e ndarë', 'vip-table-full': 'Tavolinë VIP Private', 'gala-dinner': 'Darkë Gala', 'royal-buffet': 'Bufe Mbretërore', 'club-entry': 'Hyrje Zyrtare', 'holiday-special': 'Menu Festive' },
    embTitle: 'Rezervoni paketa zyrtare direkt online', embCta: 'Dyqani Single Pass',
    equalPrice: 'Çmim i njëjtë për burra dhe gra', waFrom20: 'Grupi WhatsApp aktiv nga 20 dhjetori 2026',
    ageWord: 'Mosha', targetAgeWord: 'Grupmosha', emailLbl: 'Email', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Emri i plotë', passLbl: 'Fjalëkalimi', termsLbl: 'Kushtet', privLbl: 'Privatësia', refLbl: 'Rimbursimi',
    countryLbl: 'Shteti', langsLbl: 'Gjuhët', dietaryLbl: 'Alergjitë', voucherLbl: 'Kuponi dhe PIN', totalChargedLbl: 'Totali',
  }],
  ['sr', {
    nye: 'Nova godina Milano 2027', cart: 'Korpa', acc: 'Moj nalog', add: 'Dodaj u korpu', buy: 'Kupi odmah',
    ty: 'Hvala, vaša narudžbina je potvrđena', checkout: 'Plaćanje', pay: 'Plati karticom',
    remove: 'Ukloni', login: 'Prijava', reg: 'Registracija', lookup: 'Pronađi narudžbinu', logout: 'Odjava',
    paid: 'PLAĆENO · POTVRĐENO', pend: 'ČEKA UPLATU', guest: 'gost', guests: 'gostiju',
    feeDetail: 'concierge savetovanje i elektronsko plaćanje',
    catLabels: { 'all-night-combo': 'Večera + VIP sto', 'vip-table-share': 'Deljeni VIP sto', 'vip-table-full': 'Privatni VIP sto', 'gala-dinner': 'Gala večera', 'royal-buffet': 'Royal švedski sto', 'club-entry': 'Zvanični ulaz', 'holiday-special': 'Praznični meni' },
    embTitle: 'Rezervišite potvrđene pakete direktno online', embCta: 'Single Pass Prodavnica',
    equalPrice: 'Ista cena za muškarce i žene', waFrom20: 'Zvanična WhatsApp grupa aktivna od 20.12.2026',
    ageWord: 'Godine', targetAgeWord: 'Starosna grupa', emailLbl: 'Email', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Ime i prezime', passLbl: 'Lozinka', termsLbl: 'Uslovi', privLbl: 'Privatnost', refLbl: 'Povraćaj',
    countryLbl: 'Država', langsLbl: 'Jezici', dietaryLbl: 'Alergije', voucherLbl: 'Vaučer i PIN', totalChargedLbl: 'Ukupno',
  }],
  ['bs', {
    nye: 'Nova godina Milano 2027', cart: 'Korpa', acc: 'Moj račun', add: 'Dodaj u korpu', buy: 'Kupi odmah',
    ty: 'Hvala, vaš nalog je potvrđen', checkout: 'Naplata', pay: 'Plati karticom',
    remove: 'Ukloni', login: 'Prijava', reg: 'Registracija', lookup: 'Pronađi narudžbu', logout: 'Odjava',
    paid: 'PLAĆENO · POTVRĐENO', pend: 'ČEKA UPLATU', guest: 'gost', guests: 'gostiju',
    feeDetail: 'concierge savjetovanje i elektronsko plaćanje',
    catLabels: { 'all-night-combo': 'Večera + VIP sto', 'vip-table-share': 'Dijeljeni VIP sto', 'vip-table-full': 'Privatni VIP sto', 'gala-dinner': 'Gala večera', 'royal-buffet': 'Royal švedski sto', 'club-entry': 'Zvanični ulaz', 'holiday-special': 'Praznični meni' },
    embTitle: 'Rezervišite potvrđene pakete direktno online', embCta: 'Single Pass Prodavnica',
    equalPrice: 'Ista cijena za muškarce i žene', waFrom20: 'Zvanična WhatsApp grupa aktivna od 20.12.2026',
    ageWord: 'Dob', targetAgeWord: 'Dobna skupina', emailLbl: 'Email', waLbl: 'Telefon / WhatsApp',
    nameLbl: 'Ime i prezime', passLbl: 'Lozinka', termsLbl: 'Uslovi', privLbl: 'Privatnost', refLbl: 'Povrat',
    countryLbl: 'Država', langsLbl: 'Jezici', dietaryLbl: 'Alergije', voucherLbl: 'Vaučer i PIN', totalChargedLbl: 'Ukupno',
  }],
  ['mk', {
    nye: 'Нова година Милано 2027', cart: 'Кошничка', acc: 'Мој профил', add: 'Додај во кошничка', buy: 'Купи веднаш',
    ty: 'Ви благодариме, нарачката е потврдена', checkout: 'Наплата', pay: 'Плати со картичка',
    remove: 'Отстрани', login: 'Најава', reg: 'Регистрација', lookup: 'Најди нарачка', logout: 'Одјава',
    paid: 'ПЛАТЕНО · ПОТВРДЕНО', pend: 'ЧЕКА ПЛАЌАЊЕ', guest: 'гостин', guests: 'гости',
    feeDetail: 'консиерж советување и електронско плаќање',
    catLabels: { 'all-night-combo': 'Вечера + VIP маса', 'vip-table-share': 'Делена VIP маса', 'vip-table-full': 'Приватна VIP маса', 'gala-dinner': 'Гала вечера', 'royal-buffet': 'Royal шведска маса', 'club-entry': 'Официјален влез', 'holiday-special': 'Празнично мени' },
    embTitle: 'Резервирајте потврдени пакети директно онлајн', embCta: 'Single Pass Продавница',
    equalPrice: 'Иста цена за мажи и жени', waFrom20: 'WhatsApp мини-група активна од 20.12.2026',
    ageWord: 'Возраст', targetAgeWord: 'Возрасна група', emailLbl: 'Е-пошта', waLbl: 'Телефон / WhatsApp',
    nameLbl: 'Име и презиме', passLbl: 'Лозинка', termsLbl: 'Услови', privLbl: 'Приватност', refLbl: 'Рефундација',
    countryLbl: 'Држава', langsLbl: 'Јазици', dietaryLbl: 'Алергии', voucherLbl: 'Ваучер и PIN', totalChargedLbl: 'Вкупно',
  }],
];

for (const [k, raw] of EURO_24) {
  SEEDS_33[k] = makeEuroSp(k, raw);
}

export const SP_PACKS_33: Record<string, SinglePassCopyPack> = Object.fromEntries(
  Object.entries(SEEDS_33).map(([k, seed]) => [k, makePackFromSeed(k, seed)]),
);

function detectSkuQualifier(sku: SinglePassSku, loc: string): string {
  const seed = SEEDS_33[loc];
  const q = seed?.tierQualifiers;
  const hay = `${sku.id} ${sku.titleEn}`.toLowerCase();
  const tags: string[] = [];
  if (hay.includes('bronze')) tags.push('Bronze');
  else if (hay.includes('silver')) tags.push('Silver');
  else if (hay.includes('gold')) tags.push('Gold');
  else if (hay.includes('platinum')) tags.push('Platinum');
  if (hay.includes('pista') || hay.includes('dancefloor')) tags.push(q?.floor || 'Pista');
  else if (hay.includes('balcon') || hay.includes('balcony')) tags.push(q?.balcony || 'Balconata');
  else if (hay.includes('palco') || hay.includes('stage') || hay.includes('console')) tags.push(q?.stage || 'VIP Palco');
  if (hay.includes('f1') || hay.includes('1st floor') || hay.includes('1°')) tags.push(q?.firstFloor || '1° Piano');
  else if (hay.includes('f5') || hay.includes('5th floor') || hay.includes('5°') || hay.includes('panoramic terrace')) tags.push(q?.fifthFloor || '5° Piano');
  else if (hay.includes('terrace')) tags.push(q?.terrace || 'Rooftop');
  if (hay.includes('early')) tags.push(q?.earlyBird || 'Early Bird');
  if (hay.includes('combo') || (hay.includes('gala') && (hay.includes('bronze') || hay.includes('silver')))) tags.push(q?.galaPrefix || 'Gala');
  if (hay.includes('child') || hay.includes('kid')) tags.push(q?.child || 'Junior');
  else if (hay.includes('adult')) tags.push(q?.adult || 'Adult');
  if (tags.length === 0) {
    const cleanSuffix = sku.titleEn.includes('·')
      ? sku.titleEn.split('·').slice(1).join('·').trim()
      : sku.titleEn;
    if (cleanSuffix) {
      tags.push(cleanSuffix.replace(/\s*\(.*?\)/g, '').trim().slice(0, 34));
    }
  }
  return tags.join(' · ');
}

export function localizeSinglePassSku(
  sku: SinglePassSku,
  locale: string,
  pack: SinglePassCopyPack,
  venueName?: string,
): { title: string; description: string } {
  if (locale === 'it') {
    return { title: sku.titleIt, description: sku.descriptionIt };
  }
  if (locale === 'en') {
    return { title: sku.titleEn, description: sku.descriptionEn };
  }
  if (sku.venueId === 'aprica-world-winter-week') {
    const ap = getApricaSkuLocalized35(sku.id, locale);
    if (ap) return ap;
  }
  if (sku.id === 'voya-nye-gala-dinner') {
    const vc = getVoyaNyeContent(locale);
    return {
      title: vc.tiers[0]?.label || sku.titleEn,
      description: vc.tiers[0]?.details || sku.descriptionEn,
    };
  }
  const w = getWords35(locale);
  const catLabel = pack.categoryLabels[sku.category] || sku.category;
  const vName = sku.venueNameOverride || venueName || '';
  const qualifier = detectSkuQualifier(sku, locale);
  const gText = `${sku.guestsPerUnit} ${sku.guestsPerUnit === 1 ? w.guestSingular : w.guestPlural}`;
  const mid = qualifier ? `${catLabel} (${qualifier})` : catLabel;
  const title = vName ? `${vName} · ${mid} · ${gText}` : `${mid} · ${gText} · ${sku.arrivalTime}`;
  const datePart = sku.eventDateLabel ? `${sku.eventDateLabel} · ` : `${w.dateBadge} · `;
  const description = `${datePart}${mid} · ${gText} · ${w.hoursLabel} ${sku.arrivalTime} · ${w.freeAdviceTpl}`;
  return { title, description };
}

export function localizeVenueAgeBand(venue: SinglePassVenueSpec, locale: string): string {
  if (locale === 'it') return venue.ageBandLabelIt;
  if (locale === 'en') return venue.ageBandLabelEn;
  const min = venue.recommendedMinAge;
  const max = venue.strictMaxAge ?? venue.recommendedMaxAge;
  const range = venue.strictMaxAge ? `${min}–${max}` : `${min}+`;
  return `${venue.name} · ${range}`;
}
