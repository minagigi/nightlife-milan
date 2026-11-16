import type { LocaleCode } from '@/lib/i18n/localeRegistry';

export const MAGISTER_MIDA_COMPANY = {
  brandName: 'Nightlife Milan',
  domain: 'nightlifemilan.com',
  legalName: 'Magister Mida LLC',
  entityType: 'Wyoming Limited Liability Company (Active · Good Standing)',
  formationDate: '2023-06-22',
  filingId: '2023-001288676',
  ein: '36-5071848',
  principalAddress: '447 Broadway, 2nd Floor #2242, New York, NY 10013, United States',
  registeredAgent: 'FBRA LLC, 1023 E Lincolnway, Cheyenne, WY 82001, United States',
  corporateEmail: 'info@magistermidallc.com',
  conciergeEmail: 'concierge@nightlifemilan.com',
  phone: '+39 351 912 7047',
  lastUpdatedIso: '2026-11-16',
} as const;

export type LegalDocKind = 'terms' | 'privacy' | 'cookies' | 'refund';

export type LegalSection = {
  heading: string;
  body: string;
};

export type LegalDocumentPack = {
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  updatedLabel: string;
  brandOwnershipNotice: string;
  corporateBlockTitle: string;
  entityLabel: string;
  officeLabel: string;
  agentLabel: string;
  registryLabel: string;
  einLabel: string;
  contactLabel: string;
  crossLinksLabel: string;
  navLabels: {
    terms: string;
    privacy: string;
    cookies: string;
    refund: string;
  };
  sections: LegalSection[];
};

const BRAND_NOTICE_35: Record<LocaleCode, string> = {
  en: 'nightlifemilan.com is an official brand owned and operated by Magister Mida LLC, a limited liability company incorporated in the State of Wyoming, United States.',
  it: 'nightlifemilan.com è un marchio di proprietà e gestito da Magister Mida LLC, società a responsabilità limitata costituita nello Stato del Wyoming, Stati Uniti.',
  es: 'nightlifemilan.com es una marca propiedad y operada por Magister Mida LLC, sociedad de responsabilidad limitada constituida en el Estado de Wyoming, Estados Unidos.',
  fr: 'nightlifemilan.com est une marque détenue et exploitée par Magister Mida LLC, société à responsabilité limitée constituée dans l’État du Wyoming, États-Unis.',
  de: 'nightlifemilan.com ist eine Marke im Eigentum und Betrieb von Magister Mida LLC, einer Limited Liability Company nach dem Recht des US-Bundesstaates Wyoming.',
  pt: 'nightlifemilan.com é uma marca de propriedade e operada pela Magister Mida LLC, sociedade de responsabilidade limitada constituída no Estado de Wyoming, Estados Unidos.',
  nl: 'nightlifemilan.com is een merk dat eigendom is van en wordt beheerd door Magister Mida LLC, een vennootschap opgericht naar het recht van Wyoming, Verenigde Staten.',
  ru: 'nightlifemilan.com является официальным брендом компании Magister Mida LLC, зарегистрированной в штате Вайоминг, США.',
  tr: 'nightlifemilan.com, Amerika Birleşik Devletleri Wyoming eyaletinde kurulu Magister Mida LLC şirketine ait olan ve onun tarafından işletilen bir markadır.',
  zh: 'nightlifemilan.com 为美国怀俄明州注册有限责任公司 Magister Mida LLC 拥有并运营的官方品牌。',
  ar: 'nightlifemilan.com هي علامة تجارية مملوكة وتُدار بالكامل بواسطة شركة Magister Mida LLC المسجلة في ولاية وايومنغ، الولايات المتحدة الأمريكية.',
  bg: 'nightlifemilan.com е марка, притежавана и управлявана от Magister Mida LLC, дружество с ограничена отговорност, регистрирано в Уайоминг, САЩ.',
  hr: 'nightlifemilan.com je robna marka u vlasništvu i pod upravljanjem tvrtke Magister Mida LLC registrirane u državi Wyoming, SAD.',
  cs: 'nightlifemilan.com je oficiální značka vlastněná a provozovaná společností Magister Mida LLC se sídlem a registrací ve státě Wyoming, USA.',
  da: 'nightlifemilan.com er et brand, der ejes og drives af Magister Mida LLC, et selskab registreret i Wyoming, USA.',
  et: 'nightlifemilan.com on kaubamärk, mis kuulub ettevõttele Magister Mida LLC (Wyoming, Ameerika Ühendriigid) ja mida haldab sama ettevõte.',
  fi: 'nightlifemilan.com on tuotemerkki, jonka omistaa ja jota hallinnoi Yhdysvaltain Wyomingin osavaltiossa rekisteröity Magister Mida LLC.',
  el: 'Το nightlifemilan.com είναι εμπορικό σήμα ιδιοκτησίας και διαχείρισης της Magister Mida LLC (Wyoming, ΗΠΑ).',
  hu: 'A nightlifemilan.com az Egyesült Államok Wyoming államában bejegyzett Magister Mida LLC tulajdonában álló és általa üzemeltetett márka.',
  ga: 'Is branda oifigiúil é nightlifemilan.com atá faoi úinéireacht agus faoi bhainistíocht Magister Mida LLC (Wyoming, SAM).',
  lv: 'nightlifemilan.com ir oficiāls zīmols, kas pieder un kuru pārvalda ASV Vaiomingas štatā reģistrētā sabiedrība Magister Mida LLC.',
  lt: 'nightlifemilan.com yra prekių ženklas, priklausantis ir valdomas Jungtinių Amerikos Valstijų Vajomingo valstijoje įsteigtos įmonės Magister Mida LLC.',
  mt: 'nightlifemilan.com hija marka kummerċjali proprjetà ta’ u mmexxija minn Magister Mida LLC, kumpanija rreġistrata f’Wyoming, l-Istati Uniti.',
  pl: 'nightlifemilan.com jest marką należącą do spółki Magister Mida LLC z siedzibą w USA i przez nią zarządzaną.',
  ro: 'nightlifemilan.com este o marcă deținută și operată de Magister Mida LLC, companie înregistrată în statul Wyoming, SUA.',
  sk: 'nightlifemilan.com je oficiálna značka vlastnená a prevádzkovaná spoločnosťou Magister Mida LLC registrovanou v štáte Wyoming, USA.',
  sl: 'nightlifemilan.com je blagovna znamka v lasti in upravljanju družbe Magister Mida LLC iz zvezne države Wyoming, ZDA.',
  sv: 'nightlifemilan.com är ett varumärke som ägs och drivs av Magister Mida LLC, registrerat i delstaten Wyoming, USA.',
  no: 'nightlifemilan.com er et merke som eies og driftes av Magister Mida LLC, et selskap registrert i Wyoming, USA.',
  is: 'nightlifemilan.com er opinbert vörumerki í eigu og rekstri Magister Mida LLC í Wyoming, Bandaríkjunum.',
  uk: 'nightlifemilan.com є офіційним брендом, який належить компанії Magister Mida LLC (штат Вайомінг, США) та управляється нею.',
  sq: 'nightlifemilan.com është një markë në pronësi dhe menaxhim të kompanisë Magister Mida LLC, e regjistruar në shtetin Wyoming, SHBA.',
  sr: 'nightlifemilan.com је званични бренд у власништву и под управом компаније Magister Mida LLC, регистроване у држави Вајоминг, САД.',
  bs: 'nightlifemilan.com je zvanični brend u vlasništvu i pod upravom kompanije Magister Mida LLC iz savezne države Wyoming, SAD.',
  mk: 'nightlifemilan.com е официјален бренд во сопственост и управуван од Magister Mida LLC, регистрирана во Вајоминг, САД.',
};

const NAV_LABELS_35: Record<LocaleCode, LegalDocumentPack['navLabels']> = {
  en: { terms: 'Terms & Conditions', privacy: 'Privacy Policy', cookies: 'Cookie Policy', refund: 'Refund Policy' },
  it: { terms: 'Termini e Condizioni', privacy: 'Informativa Privacy', cookies: 'Cookie Policy', refund: 'Politica di Rimborso' },
  es: { terms: 'Términos y Condiciones', privacy: 'Política de Privacidad', cookies: 'Política de Cookies', refund: 'Política de Reembolso' },
  fr: { terms: 'Conditions Générales', privacy: 'Confidentialité', cookies: 'Politique de Cookies', refund: 'Politique de Remboursement' },
  de: { terms: 'AGB & Nutzungsbedingungen', privacy: 'Datenschutz', cookies: 'Cookie-Richtlinie', refund: 'Widerrufs- & Erstattungsrichtlinie' },
  pt: { terms: 'Termos e Condições', privacy: 'Política de Privacidade', cookies: 'Política de Cookies', refund: 'Política de Reembolso' },
  nl: { terms: 'Algemene Voorwaarden', privacy: 'Privacybeleid', cookies: 'Cookiebeleid', refund: 'Annulerings- & Restitutiebeleid' },
  ru: { terms: 'Условия использования', privacy: 'Политика конфиденциальности', cookies: 'Политика Cookie', refund: 'Правила возврата' },
  tr: { terms: 'Hüküm ve Koşullar', privacy: 'Gizlilik Politikası', cookies: 'Çerez Politikası', refund: 'İptal ve İade Politikası' },
  zh: { terms: '服务条款与条件', privacy: '隐私政策', cookies: 'Cookie 政策', refund: '退款与取消政策' },
  ar: { terms: 'الشروط والأحكام', privacy: 'سياسة الخصوصية', cookies: 'سياسة ملفات الارتباط', refund: 'سياسة الإلغاء والاسترداد' },
  bg: { terms: 'Общи условия', privacy: 'Поверителност', cookies: 'Политика за бисквитки', refund: 'Политика за възстановяване' },
  hr: { terms: 'Uvjeti korištenja', privacy: 'Pravila privatnosti', cookies: 'Politika kolačića', refund: 'Politika povrata' },
  cs: { terms: 'Obchodní podmínky', privacy: 'Ochrana soukromí', cookies: 'Zásady cookies', refund: 'Reklamační a storno řád' },
  da: { terms: 'Vilkår og betingelser', privacy: 'Privatlivspolitik', cookies: 'Cookiepolitik', refund: 'Refusionspolitik' },
  et: { terms: 'Kasutustingimused', privacy: 'Privaatsuspoliitika', cookies: 'Küpsiste poliitika', refund: 'Tagastamispoliitika' },
  fi: { terms: 'Käyttöehdot', privacy: 'Tietosuojaseloste', cookies: 'Evästekäytäntö', refund: 'Peruutus- ja palautusehdot' },
  el: { terms: 'Όροι & Προϋποθέσεις', privacy: 'Πολιτική Απορρήτου', cookies: 'Πολιτική Cookies', refund: 'Πολιτική Επιστροφών' },
  hu: { terms: 'Általános Szerződési Feltételek', privacy: 'Adatvédelmi tájékoztató', cookies: 'Cookie-szabályzat', refund: 'Visszatérítési szabályzat' },
  ga: { terms: 'Téarmaí agus Coinníollacha', privacy: 'Polasaí Príobháideachais', cookies: 'Polasaí Fianán', refund: 'Polasaí Aisíocaíochta' },
  lv: { terms: 'Noteikumi un nosacījumi', privacy: 'Privātuma politika', cookies: 'Sīkdatņu politika', refund: 'Atmaksas politika' },
  lt: { terms: 'Naudojimo sąlygos', privacy: 'Privatumo politika', cookies: 'Slapukų politika', refund: 'Grąžinimo politika' },
  mt: { terms: 'Termini u Kundizzjonijiet', privacy: 'Politika ta’ Privatezza', cookies: 'Politika tal-Cookies', refund: 'Politika ta’ Rifużjoni' },
  pl: { terms: 'Regulamin i Warunki', privacy: 'Polityka Prywatności', cookies: 'Polityka Cookies', refund: 'Polityka Zwrotów' },
  ro: { terms: 'Termeni și Condiții', privacy: 'Politica de Confidențialitate', cookies: 'Politica de Cookie-uri', refund: 'Politica de Rambursare' },
  sk: { terms: 'Obchodné podmienky', privacy: 'Ochrana súkromia', cookies: 'Zásady súborov cookie', refund: 'Reklamačný poriadok' },
  sl: { terms: 'Splošni pogoji', privacy: 'Politika zasebnosti', cookies: 'Politika piškotkov', refund: 'Politika vračil' },
  sv: { terms: 'Villkor och bestämmelser', privacy: 'Integritetspolicy', cookies: 'Cookiepolicy', refund: 'Återbetalningspolicy' },
  no: { terms: 'Vilkår og betingelser', privacy: 'Personvernregler', cookies: 'Informasjonskapsler', refund: 'Refusjonspolicy' },
  is: { terms: 'Skilmálar og skilyrði', privacy: 'Persónuverndarstefna', cookies: 'Vafrakökustefna', refund: 'Endurgreiðslustefna' },
  uk: { terms: 'Умови використання', privacy: 'Політика конфіденційності', cookies: 'Політика Cookie', refund: 'Умови повернення коштів' },
  sq: { terms: 'Termat dhe Kushtet', privacy: 'Politika e Privatësisë', cookies: 'Politika e Cookies', refund: 'Politika e Rimbursimit' },
  sr: { terms: 'Услови коришћења', privacy: 'Политика приватности', cookies: 'Политика колачића', refund: 'Политика повраћаја' },
  bs: { terms: 'Uslovi korištenja', privacy: 'Politika privatnosti', cookies: 'Politika kolačića', refund: 'Politika povrata' },
  mk: { terms: 'Услови за користење', privacy: 'Политика за приватност', cookies: 'Политика за колачиња', refund: 'Политика за рефундација' },
};

function buildSectionsEn(kind: LegalDocKind, brandNotice: string): LegalSection[] {
  const c = MAGISTER_MIDA_COMPANY;
  if (kind === 'terms') {
    return [
      {
        heading: '1. Legal Operator and Brand Ownership',
        body: `${brandNotice} All e-commerce transactions, Single Pass bookings, VIP table concierge reservations, and official hospitality allocations concluded on ${c.domain} create a binding service agreement with ${c.legalName} (Principal Office: ${c.principalAddress}; Registered Agent Office: ${c.registeredAgent}; Wyoming SOS Filing ID: ${c.filingId}; Federal EIN: ${c.ein}).`,
      },
      {
        heading: '2. Scope of Services and Confirmed Inventory Only',
        body: `${c.domain} markets and sells confirmed nightlife tickets, gala dinners, shared Single Pass placements, and VIP table allocations solely for venues and events with verified contractual pricing. Events displayed with prior-edition estimates or "price upon request" labels are editorial guides only and cannot be placed in the cart.`,
      },
      {
        heading: '3. EUR Pricing, +15% Booking/Concierge/Entry Fee and Currency Conversion',
        body: `Canonical contract prices are denominated in Euro (EUR). Each online Single Pass or event reservation transparently itemizes a 15% Booking, Concierge Service & Entry Fee covering priority list management, guest coordination, identity matching, and 24/7 WhatsApp concierge desk (${c.phone}). At checkout, the EUR total may be converted in real time to your preferred billing currency using official reference exchange rates displayed prior to authorization.`,
      },
      {
        heading: '4. Embedded On-Site Payment & Account Registration',
        body: 'Payments are processed natively on this website through PCI-DSS Level 1 encrypted payment tokenization via supported credit/debit cards and digital wallets (Apple Pay, Google Pay). Magister Mida LLC never stores raw card numbers on its servers. Completing an order requires valid full name, active email address, reachable mobile/WhatsApp telephone number, age confirmation, and account credentials or order pin.',
      },
      {
        heading: '5. Age Limits, Dress Code and Venue Admission Rules',
        body: 'All purchasers and attendees must be at least 18 years old (or 21+ / strict Under 30 18–29 where explicitly stated for specific venues such as Pineta Moulin Rouge Capodanno). Venues reserve door rights regarding smart-chic dress code compliance and sober conduct. Paid New Year’s Eve Single Pass WhatsApp Mini-Groups open progressively starting December 20, 2026.',
      },
      {
        heading: '6. Governing Law and Corporate Notices',
        body: `To the fullest extent permitted by mandatory consumer protection law in the customer’s country of residence, these Terms are governed by the laws of the State of Wyoming, United States. Official notices may be sent to ${c.corporateEmail} or ${c.conciergeEmail}.`,
      },
    ];
  }
  if (kind === 'privacy') {
    return [
      {
        heading: '1. Data Controller Identity',
        body: `${brandNotice} ${c.legalName} (${c.principalAddress}, Federal EIN ${c.ein}) acts as the Data Controller for personal data collected on ${c.domain}.`,
      },
      {
        heading: '2. Personal Data We Collect',
        body: 'During user registration, cart additions, embedded checkout, and concierge inquiries, we collect: full name, email address, mandatory telephone/WhatsApp number, age, country of residence, preferred spoken languages, dietary notes, and purchased items. For service analytics and fraud prevention, we also log first landing page, cart-source URL, session journey pages, referrer/UTM tags, IP country/city, and device type.',
      },
      {
        heading: '3. Card Security and Zero Card Storage',
        body: 'All payment card and wallet inputs typed inside our embedded checkout fields are tokenized directly within our PCI-DSS Level 1 certified gateway environment. Magister Mida LLC and nightlifemilan.com servers receive only a cryptographic Payment Intent reference, status, and amount/currency confirmation.',
      },
      {
        heading: '4. Legal Basis and Purposes of Processing',
        body: 'We process data to execute purchased nightlife admissions and table reservations (contract performance), transmit attendee nominal guestlists to partner venues, coordinate Dec 20+ Single Pass WhatsApp mini-groups (when applicable), dispatch transactional order vouchers, prevent unauthorized chargebacks, and comply with tax and accounting regulations.',
      },
      {
        heading: '5. Retention and Your Privacy Rights',
        body: `Transaction records are retained in compliance with U.S. tax and European accounting requirements. You may request access, rectification, portability, restriction, or erasure of your profile data (where legally permissible) by emailing ${c.corporateEmail} or ${c.conciergeEmail}.`,
      },
    ];
  }
  if (kind === 'cookies') {
    return [
      {
        heading: '1. About This Cookie Policy',
        body: `${brandNotice} This Cookie Policy explains how ${c.legalName} (${c.domain}) uses strictly necessary local storage tokens, first-party authentication cookies, and optional analytics tools.`,
      },
      {
        heading: '2. Strictly Necessary Authentication, Cart & Checkout Tokens',
        body: 'Essential cookies and browser storage keys remain active to guarantee functional e-commerce operation: `nlm_sp_session` (HMAC-signed Reserved Area login cookie), `nlm_single_pass_cart_v1` (persistent shopping cart and currency selection), `nlm_attribution_v1` (order source & referral attribution), and `NEXT_LOCALE` (language preference). Strictly necessary tokens for payment tokenization and fraud screening run exclusively inside the checkout flow.',
      },
      {
        heading: '3. Optional Traffic Measurement',
        body: 'Aggregated event-page and funnel telemetry helps measure capacity demand across Milan nightlife dates without selling personal profiles to third-party data brokers.',
      },
      {
        heading: '4. Managing Browser Preferences',
        body: `You may clear or restrict non-essential cookies via your browser settings at any time; disabling strictly necessary session or storage tokens may prevent cart persistence and authenticated access to your Reserved Area. Contact ${c.corporateEmail} with privacy inquiries.`,
      },
    ];
  }
  return [
    {
      heading: '1. Contracting Merchant & Support Desk',
      body: `${brandNotice} All purchases completed through ${c.domain} are billed by ${c.legalName} (${c.principalAddress}). Support operates 24/7 via ${c.conciergeEmail} and WhatsApp ${c.phone}.`,
    },
    {
      heading: '2. General Rule on Date-Specific Event & Hospitality Bookings',
      body: 'Because nightlife tickets, gala dinner seatings, and VIP table allocations commit venue capacity for a fixed calendar date and time, confirmed orders are generally final and non-refundable after issuance in accordance with distance-selling exceptions for date-specific leisure services.',
    },
    {
      heading: '3. Event Cancellation or Major Schedule Modification',
      body: 'Should an organizer or venue officially cancel the purchased event (for example due to force majeure or municipal closure) without rescheduling, Magister Mida LLC issues a full refund of the paid net amount and platform fee to the original payment method within 7–14 business days.',
    },
    {
      heading: '4. Name Transfers, Upgrade Assistance and Door Policy',
      body: `Where permitted by the partner venue, our Concierge can assist with nominal attendee name transfers up to 72 hours before event doors open via ${c.conciergeEmail} or ${c.phone}. No refunds apply to denied entry resulting from underage attendance (under 18 or over 29 at strict Under 30 venues like Pineta), visible intoxication, or breach of published venue dress code.`,
    },
    {
      heading: '5. How to Request Assistance Before Opening a Bank Dispute',
      body: `Please contact ${c.conciergeEmail} or WhatsApp ${c.phone} with your Order ID (NLM-SP-...) prior to initiating any card dispute so our corporate resolution team can resolve billing, currency, or attendee transfer questions immediately.`,
    },
  ];
}

function buildSectionsIt(kind: LegalDocKind, brandNotice: string): LegalSection[] {
  const c = MAGISTER_MIDA_COMPANY;
  if (kind === 'terms') {
    return [
      {
        heading: '1. Titolare del Marchio e Soggetto Giuridico Contraente',
        body: `${brandNotice} Ogni ordine, Single Pass, biglietto d’ingresso, cena o prenotazione tavolo VIP conclusa su ${c.domain} instaura un rapporto contrattuale vincolante con ${c.legalName} (Sede Operativa e Postale: ${c.principalAddress}; Registered Agent: ${c.registeredAgent}; Wyoming SOS Filing ID: ${c.filingId}; Federal EIN: ${c.ein}).`,
      },
      {
        heading: '2. Ambito E-Commerce e Listini Esclusivamente Confermati',
        body: `Su ${c.domain} il carrello e l’acquisto diretto sono abilitati esclusivamente per locali, date speciali ed eventi dotati di tariffario ufficiale confermato (incluse le 7 strutture confermate di Capodanno 2027, Natale al Voya Rooftop, Capodanno Ortodosso al Just Me e le date di calendario con biglietti ufficiali disponibili). Le schede con prezzi indicativi di edizioni passate o "su richiesta" hanno valore puramente informativo.`,
      },
      {
        heading: '3. Prezzi in Euro, Commissione +15% e Conversione Valuta al Checkout',
        body: `I listini base sono espressi in Euro (EUR). Su ogni formula acquistabile viene applicata in modo trasparente la maggiorazione del +15% per Booking, Concierge Service e Entry Fee (coordinamento lista nominale Nightlife Milan, abbinamento età/tavolo, assistenza 24/7 su ${c.phone}). Al checkout il totale in EUR può essere convertito in tempo reale nella valuta scelta dal cliente secondo il tasso di cambio mostrato prima della conferma.`,
      },
      {
        heading: '4. Pagamento Integrato sul Sito e Registrazione Cliente',
        body: 'Il pagamento avviene interamente all’interno delle pagine di checkout di nightlifemilan.com mediante crittografia certificata PCI-DSS Livello 1 per carte di credito/debito e wallet digitali (Apple Pay, Google Pay). I server di Magister Mida LLC non memorizzano mai i numeri completi delle carte. Per completare l’ordine sono obbligatori nome, email valida, numero di telefono/WhatsApp raggiungibile, età anagrafica e accettazione dei presenti Termini.',
      },
      {
        heading: '5. Requisiti d’Età, Dress Code e Mini-Gruppi WhatsApp dal 20 Dicembre',
        body: 'L’acquisto è riservato ai maggiorenni (18+ o limiti superiori ove indicato, tra cui Under 30 rigoroso 18–29 al Pineta Moulin Rouge Capodanno). L’accesso resta subordinato al rispetto del dress code elegante indicato nella scheda evento. Per i possessori di Single Pass Capodanno, i mini-gruppi WhatsApp dedicati vengono attivati progressivamente dal 20 dicembre 2026 in poi utilizzando il numero salvato nell’ordine.',
      },
      {
        heading: '6. Legge Applicabile e Comunicazioni Legali',
        body: `Fatti salvi i diritti inderogabili del consumatore previsti dalla normativa applicabile, i presenti Termini sono regolati dalle leggi dello Stato del Wyoming, Stati Uniti d’America. Comunicazioni ufficiali: ${c.corporateEmail} · Concierge: ${c.conciergeEmail}.`,
      },
    ];
  }
  if (kind === 'privacy') {
    return [
      {
        heading: '1. Titolare del Trattamento',
        body: `${brandNotice} Il Titolare del trattamento dei dati personali raccolti su ${c.domain} è ${c.legalName} (${c.principalAddress}, Federal EIN ${c.ein}).`,
      },
      {
        heading: '2. Dati Raccolti durante Navigazione, Registrazione e Acquisto',
        body: 'Raccogliamo i dati conferiti volontariamente dal cliente al momento della registrazione, dell’aggiunta al carrello e del checkout: nome e cognome, email, numero di telefono/WhatsApp obbligatorio, età, Paese di residenza, lingue parlate, note alimentari e prodotti ordinati. Ai fini di attribuzione commerciale e sicurezza antifrode registriamo inoltre la prima pagina di atterraggio, la pagina di provenienza dell’aggiunta al carrello, il percorso di navigazione, i parametri UTM/referrer, il Paese IP e il tipo di dispositivo.',
      },
      {
        heading: '3. Sicurezza dei Pagamenti Digitali',
        body: 'I dati della carta inseriti nel modulo di pagamento integrato vengono cifrati direttamente dal circuito certificato PCI-DSS Livello 1. Magister Mida LLC riceve esclusivamente identificativi crittografici della transazione, stato di esito, importo e valuta contabilizzata.',
      },
      {
        heading: '4. Finalità del Trattamento e Comunicazione ai Locali',
        body: 'I dati sono utilizzati per emettere i voucher digitali, trasmettere i nominativi alle porte dei locali partner, gestire l’inserimento nei mini-gruppi WhatsApp dal 20 dicembre 2026 (ove previsto dal pacchetto), assistere il cliente prima dell’evento e adempiere agli obblighi fiscali e contabili societari.',
      },
      {
        heading: '5. Conservazione e Diritti dell’Interessato',
        body: `I documenti contabili degli ordini vengono conservati per il periodo previsto dalle normative fiscali statunitensi ed europee. Puoi richiedere accesso, rettifica, portabilità o cancellazione dei dati scrivendo a ${c.corporateEmail} o ${c.conciergeEmail}.`,
      },
    ];
  }
  if (kind === 'cookies') {
    return [
      {
        heading: '1. Oggetto della Cookie Policy',
        body: `${brandNotice} La presente informativa illustra l’impiego di cookie tecnici, chiavi di archiviazione locale e strumenti statistici su ${c.domain}, gestito da ${c.legalName}.`,
      },
      {
        heading: '2. Cookie Strettamente Necessari al Carrello, Sessione e Pagamento',
        body: 'Per garantire registrazione account, persistenza del carrello multivaluta e checkout sicuro utilizziamo identificatori essenziali: `nlm_sp_session` (cookie HttpOnly autenticato Area Riservata), `nlm_single_pass_cart_v1` (prodotti in carrello, pagina origine e valuta scelta), `nlm_attribution_v1` (provenienza e percorso acquisto) e `NEXT_LOCALE` (lingua interfaccia). Nella pagina checkout vengono inoltre utilizzati token tecnici antifrode del circuito di pagamento.',
      },
      {
        heading: '3. Statistiche di Traffico e Conversione',
        body: 'Utilizziamo rilevazioni aggregate interne e telemetria delle pagine per monitorare l’affluenza degli eventi e la qualità del servizio clienti senza cedere profili personali a broker pubblicitari.',
      },
      {
        heading: '4. Gestione delle Preferenze Browser',
        body: `È possibile limitare o rimuovere i cookie tramite le impostazioni del browser. La disattivazione dei token tecnici può impedire il mantenimento del carrello e il completamento del checkout. Contatti: ${c.corporateEmail}.`,
      },
    ];
  }
  return [
    {
      heading: '1. Ente Emittente e Assistenza Post-Vendita',
      body: `${brandNotice} Gli ordini confermati su ${c.domain} sono emessi da ${c.legalName} (${c.principalAddress}). Il supporto clienti risponde 24/7 via email (${c.conciergeEmail}) e WhatsApp (${c.phone}).`,
    },
    {
      heading: '2. Servizi a Data Specifica e Non Rimborsabilità Ordinaria',
      body: 'Poiché biglietti club, cenoni e quote tavolo vincolano posti a capacità limitata per una data ed ora specifica, gli ordini confermati sono definitivi e non rimborsabili su ripensamento del cliente, in linea con le esclusioni previste per i servizi legati al tempo libero con data determinata.',
    },
    {
      heading: '3. Annullamento dell’Evento da Parte del Locale',
      body: 'In caso di cancellazione integrale dell’evento da parte della struttura o per ordinanza delle autorità senza riprogrammazione, Magister Mida LLC provvede al rimborso integrale della quota pagata e della commissione di servizio sullo strumento di pagamento originario entro 7–14 giorni lavorativi.',
    },
    {
      heading: '4. Cambio Nominativo e Cause di Mancata Ammissione alla Porta',
      body: `Ove consentito dal locale, il Concierge può assistere nel cambio nominativo gratuito fino a 72 ore prima dell’orario d’apertura scrivendo a ${c.conciergeEmail} o ${c.phone}. Non spetta alcun rimborso in caso di respingimento alla porta dovuto a mancato rispetto dei requisiti di età (minori di 18 anni oppure 30+ su serate strettamente Under 30 come Pineta Capodanno), stato di ebbrezza o violazione del dress code ufficiale.`,
    },
    {
      heading: '5. Procedura di Segnalazione Diretta',
      body: `Per qualsiasi chiarimento su addebiti, conversione valuta o cambio nominativo, invita prima una richiesta con numero ordine (NLM-SP-...) a ${c.conciergeEmail} o WhatsApp ${c.phone}.`,
    },
  ];
}

export function getMagisterMidaLegalDocument(locale: string, kind: LegalDocKind): LegalDocumentPack {
  const loc = (BRAND_NOTICE_35[locale as LocaleCode] ? locale : 'en') as LocaleCode;
  const isIt = loc === 'it';
  const navLabels = NAV_LABELS_35[loc] || NAV_LABELS_35.en;
  const brandOwnershipNotice = BRAND_NOTICE_35[loc] || BRAND_NOTICE_35.en;

  const title = navLabels[kind === 'cookies' ? 'cookies' : kind];
  const eyebrow = isIt
    ? 'DOCUMENTO LEGALE UFFICIALE · MAGISTER MIDA LLC'
    : 'OFFICIAL LEGAL DISCLOSURE · MAGISTER MIDA LLC';
  const updatedLabel = isIt
    ? `Ultimo aggiornamento: 16 Novembre 2026`
    : `Last updated: November 16, 2026`;

  const metaTitle = `${title} · Magister Mida LLC | Nightlife Milan`;
  const metaDescription = `${title} — ${brandOwnershipNotice} (${MAGISTER_MIDA_COMPANY.principalAddress} · Filing ID ${MAGISTER_MIDA_COMPANY.filingId} · EIN ${MAGISTER_MIDA_COMPANY.ein}).`;

  return {
    eyebrow,
    title,
    metaTitle,
    metaDescription,
    updatedLabel,
    brandOwnershipNotice,
    corporateBlockTitle: isIt
      ? 'Soggetto Giuridico Titolare di Nightlife Milan'
      : 'Corporate Owner & Legal Operator',
    entityLabel: isIt ? 'Società Titolare' : 'Legal Entity',
    officeLabel: isIt ? 'Sede Operativa e Postale (USA)' : 'Principal & Mailing Address',
    agentLabel: isIt ? 'Sede Legale & Registered Agent (Wyoming)' : 'Registered Agent Office (Wyoming)',
    registryLabel: isIt ? 'Numero Registro Imprese Wyoming' : 'Wyoming SOS Filing ID',
    einLabel: isIt ? 'Tax ID Federale USA (EIN)' : 'Federal Employer ID (EIN)',
    contactLabel: isIt ? 'Contatti Ufficiali' : 'Official Contacts',
    crossLinksLabel: isIt ? 'Tutte le Pagine Legali Ufficiali' : 'All Official Legal Pages',
    navLabels,
    sections: isIt
      ? buildSectionsIt(kind, brandOwnershipNotice)
      : buildSectionsEn(kind, brandOwnershipNotice),
  };
}
