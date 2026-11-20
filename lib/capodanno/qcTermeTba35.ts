import { capodannoEventPath } from '@/lib/capodanno/routes';
import type { CapodannoLocalizedEventContent } from '@/lib/capodanno/repvblic35';
import { getLocalizedDir35 } from '@/lib/i18n/dirTokens35';
import { localePrefix, type LocaleCode } from '@/lib/i18n/localeRegistry';
import { getExistingGuideSlug35 } from '@/lib/i18n/localizedSlugs35';

type QcTermePack = {
  tbaStatus: string;
  waitlistBadge: string;
  priceTba: string;
  dressSpa: string;
  titleFmt: (venue: string) => string;
  subtitleFmt: (addr: string) => string;
  descFmt: (venue: string, addr: string) => string;
  tierLabel: string;
  tierDetails: string;
  highlight2: string;
  highlight3: string;
  sourceBasis: string;
  altHeading: string;
  altSubheading: string;
  bannerBadge: string;
  bannerTitle: string;
  bannerDesc: string;
  bannerCta: string;
  faqQ1Fmt: (venue: string) => string;
  faqA1Fmt: (venue: string) => string;
  faqQ2: string;
  faqA2: string;
  sirmioneTitle: string;
  sirmioneSub: string;
  sirmioneDesc: string;
  sirmioneFormat: string;
  sirmionePriceSummary: string;
  sirmioneTierLabel: string;
  sirmioneTierDetails: string;
  sirmioneHighlights: [string, string, string];
  sirmioneSource: string;
  sirmioneAltHeading: string;
  sirmioneAltSub: string;
  sirmioneBannerBadge: string;
  sirmioneBannerTitle: string;
  sirmioneBannerDesc: string;
  sirmioneBannerCta: string;
  sirmioneFaqQ: string;
  sirmioneFaqA: string;
};

const DICT: Record<LocaleCode, QcTermePack> = {
  it: {
    tbaStatus: 'Programma e prezzi 2027 in attesa di pubblicazione ufficiale',
    waitlistBadge: 'Lista d’attesa ufficiale gratuita su WhatsApp +39 351 912 7047',
    priceTba: 'In definizione',
    dressSpa: 'Costume da bagno, ciabatte e accappatoio termale',
    titleFmt: (v) => `Capodanno ${v} 2027 · Info & Lista d’Attesa`,
    subtitleFmt: (a) => `${a} · Listino 31 dicembre 2026 in attesa di uscita · Alternativa attiva: Terme di Sirmione 198€`,
    descFmt: (v, a) =>
      `Scheda informativa ufficiale per ${v} (${a}): la struttura non ha ancora pubblicato programma e tariffe per la notte del 31 dicembre 2026. Nessun prezzo inventato né formule discoteca fittizie vengono esposti prima dell’uscita ufficiale. Per chi desidera prenotare subito delle terme aperte a Capodanno 2027 segnaliamo Terme di Sirmione · SPA & Thermal Garden sul Lago di Garda con tariffa confermata 198€ fino alle 03:00, oppure la lista d’attesa WhatsApp +39 351 912 7047.`,
    tierLabel: 'Ingresso & Pacchetti Capodanno 2027 (listino non ancora pubblicato)',
    tierDetails:
      'Tariffe ufficiali di San Silvestro non ancora pubblicate dalla struttura. Scrivi su WhatsApp +39 351 912 7047 per ricevere notifica immediata all’uscita o prenota Terme di Sirmione (198€ confermati fino alle 03:00).',
    highlight2: 'Zero tariffe stimate o inventate: aggiornamento in tempo reale non appena esce il listino ufficiale',
    highlight3: 'Unica alternativa termale confermata e prenotabile subito: Terme di Sirmione (198€ fino alle 03:00)',
    sourceBasis:
      'Aggiornamento verificato 2026/2027: prezzi QC Terme Capodanno 2027 non ancora usciti (lista d’attesa gratuita su WhatsApp +39 351 912 7047). Alternativa confermata: Terme di Sirmione SPA New Year 198€.',
    altHeading: 'Terme & Location Confermate e Prenotabili per Capodanno 2027',
    altSubheading:
      'Scegli subito le Terme di Sirmione (198€ confermati fino alle 03:00 sul Lago di Garda) oppure le strutture partner di Lago di Como e Milano con listini ufficiali:',
    bannerBadge: 'GUIDA TERMALE LOMBARDIA 2027',
    bannerTitle: 'Capodanno alle Terme in Lombardia 2027: Confronto Verificato',
    bannerDesc: 'Terme di Sirmione 198€ confermate vs stato aggiornato QC Terme Milano, Bormio e San Pellegrino + combinazioni Garda e Lago di Como.',
    bannerCta: 'Leggi la Guida Terme 2027',
    faqQ1Fmt: (v) => `Sono già usciti i prezzi di Capodanno 2027 per ${v}?`,
    faqA1Fmt: (v) =>
      `No, per la notte del 31 dicembre 2026 ${v} non ha ancora pubblicato pacchetti o prezzi ufficiali. Non pubblichiamo importi stimati: puoi iscriverti gratuitamente agli avvisi via WhatsApp +39 351 912 7047.`,
    faqQ2: 'Quali terme in Lombardia hanno già prezzi verificati e prenotazione attiva a Capodanno 2027?',
    faqA2:
      'Le Terme di Sirmione · SPA & Thermal Garden (ex Aquaria) sul Lago di Garda hanno confermato il pacchetto ufficiale SPA New Year del 31 dicembre 2026 a 198€ a persona con ingresso fino alle 03:00, live music, DJ set, aufguss, scrub, brindisi e kit accoglienza.',
    sirmioneTitle: 'Capodanno Terme di Sirmione 2027 · SPA New Year sul Lago di Garda',
    sirmioneSub: 'Piazza Don A. Piatti 1, 25019 Sirmione (BS) · 31 Dicembre 19:00 – 03:00 · 198€ confermato',
    sirmioneDesc:
      'Unica proposta termale della Lombardia già confermata e prenotabile online per la notte del 31 dicembre 2026: alle Terme di Sirmione SPA & Thermal Garden (ex Aquaria) vivi SPA New Year dalle 19:00 alle 03:00 a 198€ a persona con piscine termali, saune, aufguss e scrub gratuiti, live music e DJ set, countdown in vasca, brindisi con panettone e pasticceria, New Year Gift e kit accoglienza incluso.',
    sirmioneFormat: 'SPA New Year fino alle 03:00 · Piscine termali, Aufguss & Scrub, Live Music & DJ Set, Countdown in Pool',
    sirmionePriceSummary: 'SPA New Year 198€ (Terme & Saune fino alle 03:00, Live Music & DJ Set, Brindisi in Vasca)',
    sirmioneTierLabel: 'SPA New Year (31 dicembre 2026 fino alle 03:00)',
    sirmioneTierDetails:
      'Ingresso Terme e Saune fino alle 03:00, live music & DJ set, scrub e aufguss gratuiti, countdown in piscina, brindisi di mezzanotte con pasticceria e panettone, New Year Gift e kit accoglienza termale inclusi.',
    sirmioneHighlights: [
      'Tariffa ufficiale confermata e prenotabile online: 198€ a persona tutto incluso fino alle 03:00',
      'Piscine termali sul Lago di Garda, saune, rituali Aufguss, scrub, live music e DJ set',
      'Comodo abbinamento sul Garda con JustMe Garda Lake (Lonato / Desenzano, 15 min) e hotel Lago di Como',
    ],
    sirmioneSource:
      'Listino ufficiale verificato Terme di Sirmione SPA & Thermal Garden (ex Aquaria · Piazza Don A. Piatti 1, Sirmione): pacchetto SPA New Year 198€ fino alle 03:00.',
    sirmioneAltHeading: 'Abbina il Tuo Capodanno sul Lago di Garda & Lago di Como',
    sirmioneAltSub:
      'Completa il weekend termale sul Garda con il club partner JustMe Garda Lake a Lonato/Desenzano o scopri i cenoni confermati sul Lago di Como:',
    sirmioneBannerBadge: 'ABBINAMENTO LAGO DI GARDA · 15 MIN DA SIRMIONE',
    sirmioneBannerTitle: 'JustMe Garda Lake · Capodanno Just Me in Rouge a Lonato / Desenzano',
    sirmioneBannerDesc:
      'Cerchi musica e festa dopo le terme sul Lago di Garda? Scopri i tavoli e l’after-dinner ufficiale di JustMe Garda Lake a soli 15 minuti da Sirmione.',
    sirmioneBannerCta: 'Scopri JustMe Garda Lake',
    sirmioneFaqQ: 'Cosa include l’ingresso Capodanno 2027 alle Terme di Sirmione da 198€?',
    sirmioneFaqA:
      'Include ingresso alle piscine termali e saune fino alle 03:00, live music e DJ set, aufguss e scrub gratuiti, countdown in vasca, brindisi con panettone e pasticceria, New Year Gift e kit accoglienza.',
  },
  en: {
    tbaStatus: '2027 NYE schedule & official pricing pending venue release',
    waitlistBadge: 'Free Priority WhatsApp Release Waitlist +39 351 912 7047',
    priceTba: 'TBA',
    dressSpa: 'Swimwear, thermal spa slippers & bathrobe',
    titleFmt: (v) => `${v} NYE 2027 · Status & Priority Waitlist`,
    subtitleFmt: (a) => `${a} · Official Dec 31, 2026 pricing TBA · Bookable alternative: Terme di Sirmione €198`,
    descFmt: (v, a) =>
      `Official status page for ${v} (${a}): management has not yet released its December 31, 2026 New Year’s Eve schedule or ticket rates. Zero unverified estimates or generic nightclub tiers are shown ahead of official publication. For an immediately confirmed NYE thermal spa experience in Lombardy, book Terme di Sirmione · SPA & Thermal Garden on Lake Garda at €198 until 03:00, or join our free WhatsApp waitlist (+39 351 912 7047).`,
    tierLabel: 'NYE 2027 Thermal Admission & Gala (official rate card TBA)',
    tierDetails:
      'Official Dec 31, 2026 rates have not yet been issued by the spa. Message WhatsApp +39 351 912 7047 for priority release alerts, or book Terme di Sirmione (€198 confirmed until 03:00).',
    highlight2: 'Zero placeholder pricing: real-time update as soon as official 2027 tickets drop',
    highlight3: 'Verified bookable thermal alternative right now: Terme di Sirmione (€198 until 03:00)',
    sourceBasis:
      'Verified 2026/2027 update: QC Terme NYE 2027 rates pending release (priority WhatsApp waitlist +39 351 912 7047). Confirmed bookable spa: Terme di Sirmione SPA New Year €198.',
    altHeading: 'Confirmed Thermal Spa & NYE Alternatives Bookable Now',
    altSubheading:
      'Book Terme di Sirmione (€198 confirmed until 03:00 on Lake Garda) or explore verified Lake Como and Milan NYE venues open Dec 31:',
    bannerBadge: 'LOMBARDY THERMAL SPA NYE 2027 GUIDE',
    bannerTitle: 'New Year’s Eve Thermal Spas in Lombardy 2027: Verified Comparison',
    bannerDesc: 'Compare confirmed Terme di Sirmione (€198) vs QC Terme Milan, Bormio & San Pellegrino waitlist status plus Lake Garda & Como pairings.',
    bannerCta: 'Read 2027 Spa Guide',
    faqQ1Fmt: (v) => `Are NYE 2027 ticket prices already out for ${v}?`,
    faqA1Fmt: (v) =>
      `No, ${v} has not yet published its official December 31, 2026 packages or ticket rates. We never invent placeholder figures; message WhatsApp +39 351 912 7047 for instant notification upon release.`,
    faqQ2: 'Which Lombardy thermal spa already has verified prices and active booking for NYE 2027?',
    faqA2:
      'Terme di Sirmione · SPA & Thermal Garden (formerly Aquaria) on Lake Garda has confirmed its official Dec 31 SPA New Year package at €198 per person until 03:00, including thermal pools, saunas, live music, DJ set, scrubs, aufguss, midnight toast, and welcome kit.',
    sirmioneTitle: 'Terme di Sirmione NYE 2027 · SPA New Year on Lake Garda',
    sirmioneSub: 'Piazza Don A. Piatti 1, 25019 Sirmione (BS) · Dec 31 19:00 – 03:00 · Verified €198',
    sirmioneDesc:
      'The only thermal spa in Lombardy already confirmed and immediately bookable online for December 31, 2026: celebrate SPA New Year at Terme di Sirmione · SPA & Thermal Garden (formerly Aquaria) from 19:00 to 03:00 at €198 per person featuring outdoor thermal pools, saunas, free aufguss and scrubs, live music, DJ set, pool countdown, festive toast with pastries & panettone, New Year gift, and welcome kit.',
    sirmioneFormat: 'SPA New Year until 03:00 · Thermal pools, Aufguss & Scrubs, Live Music & DJ Set, Pool Countdown',
    sirmionePriceSummary: 'SPA New Year €198 (Thermal Pools & Saunas until 03:00, Live Music & DJ Set, Pool Countdown)',
    sirmioneTierLabel: 'SPA New Year (December 31, 2026 until 03:00)',
    sirmioneTierDetails:
      'Thermal pool & sauna entry until 03:00, live music & DJ set, complimentary scrubs & aufguss rituals, midnight countdown in pool, pastries & panettone toast, New Year gift, and welcome kit included.',
    sirmioneHighlights: [
      'Confirmed official rate bookable online right now: €198 per person all-inclusive until 03:00',
      'Lakeside thermal pools on Lake Garda, saunas, Aufguss rituals, scrubs, live music & DJ set',
      'Easy Lake Garda weekend pairing with partner JustMe Garda Lake (Lonato/Desenzano, 15 min) & Lake Como hotels',
    ],
    sirmioneSource:
      'Confirmed official rate card from Terme di Sirmione SPA & Thermal Garden (formerly Aquaria · Piazza Don A. Piatti 1, Sirmione): SPA New Year €198 until 03:00.',
    sirmioneAltHeading: 'Pair Your Lake Garda & Lake Como New Year’s Eve Stay',
    sirmioneAltSub:
      'Extend your Garda wellness weekend at partner nightclub JustMe Garda Lake in Lonato/Desenzano or explore confirmed Lake Como & Milan gala dinners:',
    sirmioneBannerBadge: 'LAKE GARDA PAIRING · 15 MIN FROM SIRMIONE',
    sirmioneBannerTitle: 'JustMe Garda Lake · Just Me in Rouge NYE Party (Lonato / Desenzano)',
    sirmioneBannerDesc:
      'Combine Lake Garda thermal relaxation with VIP nightlife at JustMe Garda Lake just 15 minutes from Sirmione.',
    sirmioneBannerCta: 'Explore JustMe Garda Lake',
    sirmioneFaqQ: 'What is included in the €198 Terme di Sirmione NYE 2027 admission?',
    sirmioneFaqA:
      'It includes thermal pool & sauna access from 19:00 until 03:00, live music & DJ set, free scrubs and aufguss, countdown in pool, midnight toast with pastries & panettone, New Year gift, and welcome spa kit.',
  },
  es: buildShortPack('Programa y precios 2027 pendientes de confirmación oficial', 'Lista prioritaria gratuita WhatsApp +39 351 912 7047', 'Por definir', 'Bañador, zapatillas y albornoz termal', 'Nochevieja', 'Lista de Espera', 'Alternativa termal confirmada: Terme di Sirmione 198€ hasta las 03:00', 'Guía Termas Lombardía 2027', 'Ver Guía Termas 2027', 'Combina Lago de Garda con JustMe Garda Lake', 'Explorar JustMe Garda Lake'),
  fr: buildShortPack('Programme et tarifs 2027 en attente de publication officielle', 'Liste d’attente prioritaire gratuite WhatsApp +39 351 912 7047', 'À confirmer', 'Maillot de bain, sandales et peignoir thermal', 'Nouvel An', 'Liste d’Attente', 'Alternative thermale confirmée : Terme di Sirmione 198€ jusqu’à 03h00', 'Guide Thermes Lombardie 2027', 'Lire le Guide Thermes', 'Prolongez au Lac de Garde avec JustMe Garda Lake', 'Voir JustMe Garda Lake'),
  de: buildShortPack('Programm & Preise 2027 noch nicht offiziell veröffentlicht', 'Kostenlose Warteliste via WhatsApp +39 351 912 7047', 'Ausstehend', 'Badekleidung, Badeschlappen & Bademantel', 'Silvester', 'Warteliste', 'Bestätigte Alternative: Terme di Sirmione 198€ bis 03:00 Uhr', 'Thermen-Guide Lombardei 2027', 'Thermen-Guide öffnen', 'Gardasee-Kombi mit JustMe Garda Lake', 'JustMe Garda Lake ansehen'),
  pt: buildShortPack('Programa e tarifas 2027 aguardando publicação oficial', 'Lista de espera gratuita WhatsApp +39 351 912 7047', 'A definir', 'Traje de banho, chinelos e roupão termal', 'Réveillon', 'Lista de Espera', 'Alternativa termal confirmada: Terme di Sirmione 198€ até 03:00', 'Guia Termas Lombardia 2027', 'Ler Guia Termas 2027', 'Combine Lago de Garda com JustMe Garda Lake', 'Ver JustMe Garda Lake'),
  nl: buildShortPack('Programma en prijzen 2027 nog niet officieel vrijgegeven', 'Gratis wachtlijst via WhatsApp +39 351 912 7047', 'Nog te bepalen', 'Zwemkleding, badslippers & badjas', 'Oud & Nieuw', 'Wachtlijst', 'Bevestigd alternatief: Terme di Sirmione 198€ tot 03:00', 'Thermen Gids Lombardije 2027', 'Lees Thermen Gids', 'Combineer Gardameer met JustMe Garda Lake', 'Bekijk JustMe Garda Lake'),
  ru: buildShortPack('Программа и цены на 2027 год ожидают официального релиза', 'Бесплатный лист ожидания в WhatsApp +39 351 912 7047', 'Уточняется', 'Купальник, тапочки и термальный халат', 'Новый год', 'Лист ожидания', 'Подтвержденная альтернатива: Terme di Sirmione 198€ до 03:00', 'Гид по термам Ломбардии 2027', 'Открыть гид по термам', 'Совместите с JustMe Garda Lake на Гарде', 'Смотреть JustMe Garda Lake'),
  tr: buildShortPack('2027 Yılbaşı programı ve fiyatları resmi açıklamayı bekliyor', 'Ücretsiz WhatsApp bekleme listesi +39 351 912 7047', 'Belirlenecek', 'Mayo, terlik ve termal bornoz', 'Yılbaşı', 'Bekleme Listesi', 'Onaylı termal alternatif: Terme di Sirmione 03:00’e kadar 198€', 'Lombardiya Termal Rehberi 2027', 'Termal Rehberi Aç', 'Garda Gölü partneri JustMe Garda Lake', 'JustMe Garda Lake’i Gör'),
  zh: buildShortPack('2027年跨年方案与官方价格待公布', 'WhatsApp 免费优先候补通知 +39 351 912 7047', '待公布', '泳衣、防滑拖鞋及温泉浴袍', '跨年', '候补通知', '已确认可订温泉替代方案：Terme di Sirmione 198€ 至凌晨03:00', '2027 伦巴第温泉指南', '阅读温泉指南', '加尔达湖联动合作夜店 JustMe Garda Lake', '查看 JustMe Garda Lake'),
  ar: buildShortPack('البرنامج والأسعار الرسمية لعام 2027 بانتظار الإعلان الرسمي', 'قائمة الانتظار المجانية عبر واتساب +39 351 912 7047', 'قيد التحديد', 'ملابس السباحة، خف الحمام وبرنس حراري', 'رأس السنة', 'قائمة الانتظار', 'البديل المؤكد والحجز المتاح: Terme di Sirmione بسعر 198€ حتى 03:00', 'دليل ينابيع لومبارديا 2027', 'اقرأ دليل الينابيع', 'اجمع السهرة في غاردا مع JustMe Garda Lake', 'استكشف JustMe Garda Lake'),
  bg: buildShortPack('Програмата и цените за 2027 очакват официално обявяване', 'Безплатен списък на чакащи в WhatsApp +39 351 912 7047', 'Предстои', 'Бански, чехли и термален халат', 'Нова година', 'Списък чакащи', 'Потвърдена алтернатива: Terme di Sirmione 198€ до 03:00', 'Термален гид Ломбардия 2027', 'Виж термалния гид', 'Комбинирай с JustMe Garda Lake на езерото Гарда', 'Виж JustMe Garda Lake'),
  hr: buildShortPack('Program i cijene za 2027. čekaju službenu objavu', 'Besplatna lista čekanja na WhatsApp +39 351 912 7047', 'U najavi', 'Kupaći kostim, papuče i termalni ogrtač', 'Doček Nove godine', 'Lista čekanja', 'Potvrđena alternativa: Terme di Sirmione 198€ do 03:00', 'Terme Lombardija Vodič 2027', 'Otvori vodič za terme', 'Kombiniraj Gardu uz JustMe Garda Lake', 'Vidi JustMe Garda Lake'),
  cs: buildShortPack('Program a ceny na Silvestra 2027 čekají na oficiální vydání', 'Bezplatná čekací listina přes WhatsApp +39 351 912 7047', 'Upřesňuje se', 'Plavky, pantofle a termální župan', 'Silvestr', 'Čekací listina', 'Potvrzená alternativa: Terme di Sirmione 198€ do 03:00', 'Průvodce termály Lombardie 2027', 'Číst průvodce termály', 'Spojte Gardské jezero s JustMe Garda Lake', 'Zobrazit JustMe Garda Lake'),
  da: buildShortPack('Program og priser for 2027 afventer officiel offentliggørelse', 'Gratis venteliste via WhatsApp +39 351 912 7047', 'Afventer', 'Badetøj, badesandaler og badekåbe', 'Nytår', 'Venteliste', 'Bekræftet alternativ: Terme di Sirmione 198€ til kl. 03:00', 'Termisk Spa Guide Lombardiet 2027', 'Læs Termisk Guide', 'Kombinér Gardasøen med JustMe Garda Lake', 'Se JustMe Garda Lake'),
  et: buildShortPack('2027. aasta kava ja hinnad ootavad ametlikku avaldamist', 'Tasuta ootejärjekord WhatsAppis +39 351 912 7047', 'Kinnitamisel', 'Ujumisriided, plätud ja hommikumantel', 'Aastavahetus', 'Ootejärjekord', 'Kinnitatud alternatiiv: Terme di Sirmione 198€ kuni 03:00', 'Lombardia Termaalspaa Juhend 2027', 'Ava Termaaljuhend', 'Ühenda Garda järv JustMe Garda Lake klubiga', 'Vaata JustMe Garda Lake'),
  fi: buildShortPack('Vuoden 2027 ohjelma ja hinnat odottavat virallista julkaisua', 'Maksuton jonotuslista WhatsAppissa +39 351 912 7047', 'Vahvistamatta', 'Uimapuku, kylpytossut ja kylpytakki', 'Uusivuosi', 'Jonotuslista', 'Vahvistettu vaihtoehto: Terme di Sirmione 198€ klo 03:00 asti', 'Lombardian Kylpyläopas 2027', 'Lue Kylpyläopas', 'Yhdistä Gardajärven JustMe Garda Lake -ilta', 'Tutustu JustMe Garda Lake'),
  el: buildShortPack('Το πρόγραμμα και οι τιμές του 2027 αναμένουν επίσημη ανακοίνωση', 'Δωρεάν λίστα αναμονής στο WhatsApp +39 351 912 7047', 'Εκκρεμεί', 'Μαγιό, παντόφλες σπα και μπουρνούζι', 'Πρωτοχρονιά', 'Λίστα Αναμονής', 'Επιβεβαιωμένη εναλλακτική: Terme di Sirmione 198€ έως 03:00', 'Οδηγός Θερμών Λουτρών 2027', 'Δείτε τον Οδηγό Λουτρών', 'Συνδυάστε στη Γκάρντα με JustMe Garda Lake', 'Δείτε το JustMe Garda Lake'),
  hu: buildShortPack('A 2027-es program és árak hivatalos közzétételre várnak', 'Ingyenes várólista WhatsAppon +39 351 912 7047', 'Hamarosan', 'Fürdőruha, papucs és fürdőköpeny', 'Szilveszter', 'Várólista', 'Megerősített alternatíva: Terme di Sirmione 198€ 03:00-ig', 'Lombardiai Termálkalauz 2027', 'Termálkalauz megnyitása', 'Garda-tavi program JustMe Garda Lake klubbal', 'JustMe Garda Lake megtekintése'),
  ga: buildShortPack('Tá clár agus praghsanna 2027 ag fanacht le fógra oifigiúil', 'Liosta feithimh saor in aisce ar WhatsApp +39 351 912 7047', 'Le deimhniú', 'Éadaí snámha, slipéir agus róba teirmeach', 'Oíche Chinn Bhliana', 'Liosta Feithimh', 'Rogha dheimhnithe: Terme di Sirmione 198€ go 03:00', 'Treoir Spá Teirmeach 2027', 'Léigh an Treoir Spá', 'Ceangail le JustMe Garda Lake ar Loch Garda', 'Féach JustMe Garda Lake'),
  lv: buildShortPack('2027. gada programma un cenas gaida oficiālu paziņojumu', 'Bezmaksas gaidīšanas saraksts WhatsApp +39 351 912 7047', 'Tiks precizēts', 'Peldkostīms, čības un termālais halāts', 'Jaunais gads', 'Gaidīšanas saraksts', 'Apstiprināta alternatīva: Terme di Sirmione 198€ līdz 03:00', 'Lombardijas Termu Ceļvedis 2027', 'Atvērt termu ceļvedi', 'Apvieno Gardas ezeru ar JustMe Garda Lake', 'Skatīt JustMe Garda Lake'),
  lt: buildShortPack('2027 m. programa ir kainos laukia oficialaus paskelbimo', 'Nemokamas laukiančiųjų sąrašas WhatsApp +39 351 912 7047', 'Tikslinama', 'Maudymosi kostiumas, šlepetės ir chalatas', 'Naujieji metai', 'Laukimo sąrašas', 'Patvirtinta alternatyva: Terme di Sirmione 198€ iki 03:00', 'Lombardijos Terminių Pirčių Gidas 2027', 'Skaityti pirčių gidą', 'Suderinkite Gardos vakarą su JustMe Garda Lake', 'Žiūrėti JustMe Garda Lake'),
  mt: buildShortPack('Il-programm u l-prezzijiet tal-2027 qed jistennew ħruġ uffiċjali', 'Lista ta’ stennija b’xejn fuq WhatsApp +39 351 912 7047', 'Għadu ma ħariġx', 'Ilbies tal-għawm, papoċċi u ġagaga termali', 'Ewwel tas-Sena', 'Lista ta’ Stennija', 'Alternattiva kkonfermata: Terme di Sirmione 198€ sas-03:00', 'Gwida Termali tal-Lombardija 2027', 'Aqra l-Gwida Termali', 'Għaqqad ma’ JustMe Garda Lake fuq il-Lag Garda', 'Ara JustMe Garda Lake'),
  pl: buildShortPack('Program i ceny na Sylwestra 2027 oczekują na oficjalną publikację', 'Bezpłatna lista oczekujących na WhatsApp +39 351 912 7047', 'Wkrótce', 'Strój kąpielowy, klapki i szlafrok termalny', 'Sylwester', 'Lista Oczekujących', 'Potwierdzona alternatywa: Terme di Sirmione 198€ do 03:00', 'Przewodnik Termy Lombardia 2027', 'Czytaj przewodnik termalny', 'Połącz Jezioro Garda z JustMe Garda Lake', 'Zobacz JustMe Garda Lake'),
  ro: buildShortPack('Programul și prețurile de Revelion 2027 așteaptă anunțul oficial', 'Listă de așteptare gratuită pe WhatsApp +39 351 912 7047', 'Neconfirmat', 'Costum de baie, papuci și halat termal', 'Revelion', 'Listă Așteptare', 'Alternativă confirmată: Terme di Sirmione 198€ până la 03:00', 'Ghid Terme Lombardia 2027', 'Citește Ghidul Terme', 'Combină Garda cu JustMe Garda Lake', 'Vezi JustMe Garda Lake'),
  sk: buildShortPack('Program a ceny na Silvestra 2027 čakajú na oficiálne zverejnenie', 'Bezplatná čakacia listina cez WhatsApp +39 351 912 7047', 'Upresňuje sa', 'Plavky, šľapky a termálny župan', 'Silvester', 'Čakacia listina', 'Potvrdená alternatíva: Terme di Sirmione 198€ do 03:00', 'Sprievodca termálmi Lombardia 2027', 'Čítať sprievodcu termálmi', 'Spojte Gardské jazero s JustMe Garda Lake', 'Pozrieť JustMe Garda Lake'),
  sl: buildShortPack('Program in cene za silvestrovo 2027 čakajo na uradno objavo', 'Brezplačna čakalna lista prek WhatsApp +39 351 912 7047', 'V pripravi', 'Kopalke, natikači in termalni kopalni plašč', 'Silvestrovo', 'Čakalna lista', 'Potrjena alternativa: Terme di Sirmione 198€ do 03:00', 'Vodnik Terme Lombardija 2027', 'Preberi termalni vodnik', 'Združite Gardsko jezero z JustMe Garda Lake', 'Poglej JustMe Garda Lake'),
  sv: buildShortPack('Program och priser för nyår 2027 inväntar officiellt släpp', 'Gratis väntelista via WhatsApp +39 351 912 7047', 'Ej släppt', 'Badkläder, badtofflor och morgonrock', 'Nyårsafton', 'Väntelista', 'Bekräftat alternativ: Terme di Sirmione 198€ till 03:00', 'Spaguide Lombardiet 2027', 'Läs Spaguiden', 'Kombinera Gardasjön med JustMe Garda Lake', 'Se JustMe Garda Lake'),
  no: buildShortPack('Program og priser for nyttår 2027 avventer offisiell lansering', 'Gratis venteliste på WhatsApp +39 351 912 7047', 'Avventer', 'Badetøy, badesko og badekåpe', 'Nyttårsaften', 'Venteliste', 'Bekreftet alternativ: Terme di Sirmione 198€ til 03:00', 'Spaguide Lombardia 2027', 'Les Spaguiden', 'Kombiner Gardasjøen med JustMe Garda Lake', 'Se JustMe Garda Lake'),
  is: buildShortPack('Dagskrá og verð fyrir áramótin 2027 bíða opinberrar útgáfu', 'Ókeypis biðlisti á WhatsApp +39 351 912 7047', 'Óákveðið', 'Sundföt, inniskór og baðsloppur', 'Áramót', 'Biðlisti', 'Staðfestur kostur: Terme di Sirmione 198€ til kl. 03:00', 'Heilsulindaleiðarvísir 2027', 'Lesa leiðarvísirinn', 'Sameinaðu Garda og JustMe Garda Lake', 'Skoða JustMe Garda Lake'),
  uk: buildShortPack('Програма та ціни на 2027 рік очікують офіційного анонсу', 'Безкоштовний список очікування у WhatsApp +39 351 912 7047', 'Уточнюється', 'Купальник, капці та термальний халат', 'Новий рік', 'Список очікування', 'Підтверджена альтернатива: Terme di Sirmione 198€ до 03:00', 'Гід термами Ломбардії 2027', 'Читати гід термами', 'Поєднайте Гарду з JustMe Garda Lake', 'Переглянути JustMe Garda Lake'),
  sq: buildShortPack('Programi dhe çmimet për Vitin e Ri 2027 presin publikimin zyrtar', 'Listë pritjeje falas në WhatsApp +39 351 912 7047', 'Në konfirmim', 'Rroba banje, pantofla dhe robdishan termal', 'Viti i Ri', 'Listë Pritjeje', 'Alternativa e konfirmuar: Terme di Sirmione 198€ deri 03:00', 'Udhëzuesi Termal Lombardia 2027', 'Lexo Udhëzuesin Termal', 'Kombino Gardën me JustMe Garda Lake', 'Shiko JustMe Garda Lake'),
  sr: buildShortPack('Program i cene za Novu godinu 2027 čekaju zvaničnu objavu', 'Besplatna lista čekanja na WhatsApp +39 351 912 7047', 'Na čekanju', 'Kupaći kostim, papuče i termalni ogrtač', 'Nova godina', 'Lista čekanja', 'Potvrđena alternativa: Terme di Sirmione 198€ do 03:00', 'Vodič za Terme Lombardija 2027', 'Otvori Vodič za Terme', 'Spojite Gardu i JustMe Garda Lake', 'Pogledaj JustMe Garda Lake'),
  bs: buildShortPack('Program i cijene za Novu godinu 2027 čekaju zvaničnu objavu', 'Besplatna lista čekanja na WhatsApp +39 351 912 7047', 'U najavi', 'Kupaći kostim, papuče i termalni ogrtač', 'Nova godina', 'Lista čekanja', 'Potvrđena alternativa: Terme di Sirmione 198€ do 03:00', 'Vodič za Terme Lombardija 2027', 'Pročitaj Vodič za Terme', 'Kombinujte Gardu i JustMe Garda Lake', 'Vidi JustMe Garda Lake'),
  mk: buildShortPack('Програмата и цените за Нова година 2027 чекаат официјална објава', 'Бесплатна листа на чекање на WhatsApp +39 351 912 7047', 'Се утврдува', 'Костим за капење, влечки и термална бањарка', 'Нова година', 'Листа на чекање', 'Потврдена алтернатива: Terme di Sirmione 198€ до 03:00', 'Водич за Терми Ломбардија 2027', 'Отвори Водич за Терми', 'Комбинирај Гарда со JustMe Garda Lake', 'Види JustMe Garda Lake'),
};

function buildShortPack(
  tbaStatus: string,
  waitlistBadge: string,
  priceTba: string,
  dressSpa: string,
  nyeWord: string,
  waitlistShort: string,
  sirmioneAltNote: string,
  bannerTitle: string,
  bannerCta: string,
  gardaPairing: string,
  gardaCta: string,
): QcTermePack {
  return {
    tbaStatus,
    waitlistBadge,
    priceTba,
    dressSpa,
    titleFmt: (v) => `${nyeWord} ${v} 2027 · ${waitlistShort}`,
    subtitleFmt: (a) => `${a} · ${tbaStatus} · ${sirmioneAltNote}`,
    descFmt: (v, a) => `${v} (${a}): ${tbaStatus}. ${waitlistBadge}. ${sirmioneAltNote}.`,
    tierLabel: `${nyeWord} ${waitlistShort} (${priceTba})`,
    tierDetails: `${tbaStatus}. ${waitlistBadge}. ${sirmioneAltNote}.`,
    highlight2: tbaStatus,
    highlight3: sirmioneAltNote,
    sourceBasis: `${tbaStatus}. ${waitlistBadge}. ${sirmioneAltNote}.`,
    altHeading: `${sirmioneAltNote} · ${bannerTitle}`,
    altSubheading: `${sirmioneAltNote}. ${waitlistBadge}.`,
    bannerBadge: `${nyeWord} · SPA 2027`,
    bannerTitle,
    bannerDesc: `${sirmioneAltNote}. ${waitlistBadge}.`,
    bannerCta,
    faqQ1Fmt: (v) => `${v} · ${nyeWord} 2027 · ${waitlistShort}?`,
    faqA1Fmt: (v) => `${v}: ${tbaStatus}. ${waitlistBadge}. ${sirmioneAltNote}.`,
    faqQ2: `Terme di Sirmione SPA New Year 2027 (198€)?`,
    faqA2: `${sirmioneAltNote}. ${waitlistBadge}.`,
    sirmioneTitle: `${nyeWord} Terme di Sirmione 2027 · SPA New Year (198€)`,
    sirmioneSub: `Piazza Don A. Piatti 1, Sirmione (BS) · 19:00 – 03:00 · 198€`,
    sirmioneDesc: `${sirmioneAltNote}. SPA New Year (19:00 – 03:00): Live Music, DJ Set, Aufguss, Scrub, Countdown. ${waitlistBadge}.`,
    sirmioneFormat: `SPA New Year 19:00 – 03:00 · Live Music & DJ Set · Aufguss & Scrub`,
    sirmionePriceSummary: `SPA New Year 198€ (19:00 – 03:00)`,
    sirmioneTierLabel: `SPA New Year (31/12 · 19:00 – 03:00)`,
    sirmioneTierDetails: `Terme di Sirmione SPA New Year (19:00 – 03:00), Aufguss, Scrub, Live Music & DJ Set. ${waitlistBadge}.`,
    sirmioneHighlights: [
      `SPA New Year 198€ (19:00 – 03:00)`,
      sirmioneAltNote,
      `${gardaPairing} · WhatsApp +39 351 912 7047`,
    ],
    sirmioneSource: `${sirmioneAltNote}. ${waitlistBadge}.`,
    sirmioneAltHeading: gardaPairing,
    sirmioneAltSub: `${gardaPairing}. ${waitlistBadge}.`,
    sirmioneBannerBadge: `LAGO DI GARDA · 15 MIN`,
    sirmioneBannerTitle: `JustMe Garda Lake · ${nyeWord} 2027`,
    sirmioneBannerDesc: `${gardaPairing}. ${waitlistBadge}.`,
    sirmioneBannerCta: gardaCta,
    sirmioneFaqQ: `Terme di Sirmione SPA New Year 2027 (198€)?`,
    sirmioneFaqA: `${sirmioneAltNote}. 19:00 – 03:00 · Aufguss, Scrub, Live Music, DJ Set.`,
  };
}

const QC_VENUES: Readonly<Record<string, { name: string; address: string }>> = {
  'capodanno-qc-terme-milano-porta-romana': {
    name: 'QC Terme Milano Porta Romana',
    address: "Piazzale Medaglie D'Oro 2, 20135 Milano",
  },
  'capodanno-qc-terme-san-pellegrino': {
    name: 'QC Terme San Pellegrino',
    address: 'Viale della Vittoria 53, 24016 San Pellegrino Terme (BG)',
  },
  'capodanno-qc-terme-bormio-bagni-nuovi-vecchi': {
    name: 'QC Terme Bormio (Bagni Nuovi & Bagni Vecchi)',
    address: 'Via Bagni Nuovi 7, 23038 Valdidentro / Bormio (SO)',
  },
};

const QC_ALTERNATIVES: string[] = [
  'capodanno-terme-di-sirmione-aquaria-lago-di-garda',
  'capodanno-justme-garda-lake',
  'capodanno-albergo-terminus-como',
  'capodanno-hotel-barchetta-excelsior-como',
  'capodanno-terrazza-duomo-21',
  'capodanno-voya-rooftop-milano',
  'capodanno-justme-milano-torre-branca',
  'capodanno-pineta-milano',
];

export function getQcTermeAndSirmioneOverride35(
  slug: string,
  locale: string,
): CapodannoLocalizedEventContent | null {
  const loc = (locale as LocaleCode) || 'en';
  const d = DICT[loc] || DICT.en;
  const lp = localePrefix(loc);
  const guidesDir = getLocalizedDir35('guides', loc);
  const g117Slug = getExistingGuideSlug35('g-117', loc);
  const guide117Href = `${lp}/${guidesDir}/${g117Slug}`;

  if (slug === 'capodanno-terme-di-sirmione-aquaria-lago-di-garda') {
    const justMeGardaHref = capodannoEventPath('capodanno-justme-garda-lake', loc);
    return {
      title: d.sirmioneTitle,
      subtitle: d.sirmioneSub,
      description: d.sirmioneDesc,
      musicAndFormat: d.sirmioneFormat,
      dressCode: d.dressSpa,
      priceSummary: d.sirmionePriceSummary,
      tiers: [
        {
          label: d.sirmioneTierLabel,
          price: '198€',
          details: d.sirmioneTierDetails,
        },
      ],
      highlights: [
        d.sirmioneHighlights[0],
        d.sirmioneHighlights[1],
        d.sirmioneHighlights[2],
      ],
      sourceBasis: d.sirmioneSource,
      offerPricesEur: [198],
      alternativesHeading: d.sirmioneAltHeading,
      alternativesSubheading: d.sirmioneAltSub,
      alternativeSlugs: [
        'capodanno-justme-garda-lake',
        'capodanno-albergo-terminus-como',
        'capodanno-hotel-barchetta-excelsior-como',
      ],
      relatedHolidayBanner: {
        badge: d.sirmioneBannerBadge,
        title: d.sirmioneBannerTitle,
        description: d.sirmioneBannerDesc,
        ctaLabel: d.sirmioneBannerCta,
        href: justMeGardaHref,
      },
      customFaqs: [
        { q: d.sirmioneFaqQ, a: d.sirmioneFaqA },
        { q: d.faqQ2, a: d.faqA2 },
      ],
    };
  }

  const meta = QC_VENUES[slug];
  if (!meta) return null;

  return {
    title: d.titleFmt(meta.name),
    subtitle: d.subtitleFmt(meta.address),
    description: d.descFmt(meta.name, meta.address),
    musicAndFormat: d.tbaStatus,
    dressCode: d.dressSpa,
    priceSummary: `${d.priceTba} · ${d.waitlistBadge}`,
    tiers: [
      {
        label: d.tierLabel,
        price: d.priceTba,
        details: d.tierDetails,
      },
    ],
    highlights: [
      `${meta.name} · ${meta.address}`,
      d.highlight2,
      d.highlight3,
    ],
    sourceBasis: d.sourceBasis,
    alternativesHeading: d.altHeading,
    alternativesSubheading: d.altSubheading,
    alternativeSlugs: QC_ALTERNATIVES,
    relatedHolidayBanner: {
      badge: d.bannerBadge,
      title: d.bannerTitle,
      description: d.bannerDesc,
      ctaLabel: d.bannerCta,
      href: guide117Href,
    },
    customFaqs: [
      { q: d.faqQ1Fmt(meta.name), a: d.faqA1Fmt(meta.name) },
      { q: d.faqQ2, a: d.faqA2 },
    ],
  };
}
