import type { LocaleCode } from '@/lib/i18n/localeRegistry';
import type { CapodannoLocalizedEventContent } from './repvblic35';

type CeresioClosedPack = {
  title: string;
  subtitle: string;
  description: string;
  closureBannerTitle: string;
  closureBannerBody: string;
  alternativesHeading: string;
  alternativesSubheading: string;
  statusLabel: string;
  highlights: string[];
  sourceBasis: string;
  customFaqs: Array<{ q: string; a: string }>;
};

const IT_CLOSED: CeresioClosedPack = {
  title: 'Ceresio 7 Milano · Chiuso a Capodanno 2027 (31 Dic – 3 Gen)',
  subtitle: 'Via Ceresio 7, 20154 Milano · Chiusura ufficiale dal 31 dicembre 2026 al 3 gennaio 2027 · Riapertura 4 gennaio a cena',
  description:
    'Avviso ufficiale Capodanno 2027: Ceresio 7 Pools & Restaurant (Via Ceresio 7, Milano) rimane chiuso per le festività dal 31 dicembre 2026 al 3 gennaio 2027 inclusi e riapre regolarmente lunedì 4 gennaio 2027 per il servizio serale. Non è previsto alcun evento né vendita biglietti per la notte di San Silvestro al Ceresio 7. Per festeggiare Capodanno 2027 su un rooftop panoramico a Milano consigliamo le alternative ufficiali disponibili: Terrazza Duomo 21 / Terrazza MA.RE (Piazza del Duomo 21) e Voya Rooftop (20° piano).',
  closureBannerTitle: 'CHIUSURA UFFICIALE CAPODANNO 2027 · 31 DICEMBRE 2026 – 3 GENNAIO 2027',
  closureBannerBody:
    'Ceresio 7 Milano è chiuso dal 31 dicembre 2026 al 3 gennaio 2027 e riapre il 4 gennaio 2027 a cena. Nessun evento di San Silvestro è in vendita per questo locale. Scopri qui sotto i rooftop panoramici di Milano ufficialmente aperti e prenotabili per il 31 dicembre.',
  alternativesHeading: 'Alternative Rooftop Aperte e Prenotabili a Capodanno 2027',
  alternativesSubheading:
    'Scegli una delle terrazze panoramiche di Milano confermate per la notte del 31 dicembre 2026 con tariffe ufficiali e prenotazione online diretta:',
  statusLabel: 'Chiuso dal 31 dicembre 2026 al 3 gennaio 2027 (riapre il 4 gennaio a cena)',
  highlights: [
    'Chiusura ufficiale Ceresio 7: dal 31 dicembre 2026 al 3 gennaio 2027 inclusi',
    'Riapertura regolare: lunedì 4 gennaio 2027 per il servizio serale',
    'Nessun cenone, festa o biglietto in vendita per la notte del 31 dicembre al Ceresio 7',
    'Alternative rooftop confermate: Terrazza Duomo 21 / MA.RE (Piazza Duomo) e Voya Rooftop (20° piano)',
  ],
  sourceBasis:
    'Comunicazione ufficiale di chiusura festiva Ceresio 7 Milano (Via Ceresio 7): chiuso dal 31 dicembre 2026 al 3 gennaio 2027, riapertura 4 gennaio a cena. Assistenza rooftop alternativi: WhatsApp +39 351 912 7047.',
  customFaqs: [
    {
      q: 'Ceresio 7 Milano è aperto a Capodanno 2027 (31 dicembre 2026)?',
      a: 'No. Ceresio 7 Milano osserva chiusura ufficiale dal 31 dicembre 2026 al 3 gennaio 2027 inclusi. Non sono previsti cenoni, feste o ingressi per la notte di San Silvestro.',
    },
    {
      q: 'Quando riapre Ceresio 7 Milano dopo Capodanno?',
      a: 'Ceresio 7 Milano riapre regolarmente lunedì 4 gennaio 2027 per il servizio serale.',
    },
    {
      q: 'Quali rooftop panoramici di Milano sono aperti e prenotabili per Capodanno 2027?',
      a: 'Le migliori alternative rooftop confermate e prenotabili online su nightlifemilan.com sono Terrazza Duomo 21 (1° Piano Chef Valerio Braschi) e Terrazza MA.RE (5° Piano Chef Mario e Remo Capitaneo, 2 Stelle Michelin) in Piazza del Duomo 21, oltre a Voya Rooftop al 20° piano panoramico.',
    },
  ],
};

const EN_CLOSED: CeresioClosedPack = {
  title: 'Ceresio 7 Milan · Closed for NYE 2027 (Dec 31 – Jan 3)',
  subtitle: 'Via Ceresio 7, 20154 Milan · Officially closed December 31, 2026 to January 3, 2027 · Reopens January 4 for evening service',
  description:
    'Official New Year’s Eve 2027 notice: Ceresio 7 Pools & Restaurant (Via Ceresio 7, Milan) is officially closed for the holiday break from December 31, 2026 through January 3, 2027, and reopens on Monday, January 4, 2027 for evening dinner service. There is no NYE party and no tickets on sale at Ceresio 7. For a panoramic New Year’s Eve rooftop celebration in Milan, explore our confirmed bookable alternatives: Terrazza Duomo 21 / Terrazza MA.RE (Piazza del Duomo 21) and Voya Rooftop (20th floor).',
  closureBannerTitle: 'OFFICIAL NYE 2027 CLOSURE · DECEMBER 31, 2026 – JANUARY 3, 2027',
  closureBannerBody:
    'Ceresio 7 Milan is closed from December 31, 2026 through January 3, 2027 and reopens on January 4, 2027 for evening service. No New Year’s Eve event is on sale here. Explore confirmed panoramic Milan rooftops open on December 31 below.',
  alternativesHeading: 'Confirmed Milan Rooftop Alternatives Open for NYE 2027',
  alternativesSubheading:
    'Book a verified panoramic Milan terrace open on December 31, 2026 with official rate cards and direct on-site booking:',
  statusLabel: 'Closed Dec 31, 2026 – Jan 3, 2027 (reopens Jan 4 evening service)',
  highlights: [
    'Official closure dates: December 31, 2026 through January 3, 2027',
    'Regular reopening: Monday, January 4, 2027 for evening service',
    'No New Year’s Eve dinner, party, or tickets on sale at Ceresio 7',
    'Confirmed rooftop alternatives: Terrazza Duomo 21 / MA.RE (Piazza Duomo) and Voya Rooftop (20th floor)',
  ],
  sourceBasis:
    'Official holiday closure notice for Ceresio 7 Milan (Via Ceresio 7): closed Dec 31, 2026 – Jan 3, 2027, reopening Jan 4 evening service. Alternative rooftop concierge: WhatsApp +39 351 912 7047.',
  customFaqs: [
    {
      q: 'Is Ceresio 7 Milan open for New Year’s Eve 2027 (December 31, 2026)?',
      a: 'No. Ceresio 7 Milan is officially closed from December 31, 2026 through January 3, 2027. No New Year’s Eve dinner or party tickets are on sale.',
    },
    {
      q: 'When does Ceresio 7 Milan reopen after New Year’s?',
      a: 'Ceresio 7 Milan reopens on Monday, January 4, 2027 for evening service.',
    },
    {
      q: 'Which panoramic rooftops in Milan are open and bookable for NYE 2027?',
      a: 'Confirmed panoramic rooftops open on December 31, 2026 with online booking on nightlifemilan.com include Terrazza Duomo 21 (1st Floor Chef Valerio Braschi) and Terrazza MA.RE (5th Floor Chefs Mario & Remo Capitaneo, 2 Michelin Stars) at Piazza del Duomo 21, plus Voya Rooftop on the 20th floor.',
    },
  ],
};

const CLOSED_OVERRIDES_35: Partial<Record<LocaleCode, Partial<CeresioClosedPack>>> = {
  es: {
    title: 'Ceresio 7 Milán · Cerrado en Nochevieja 2027 (31 Dic – 3 Ene)',
    subtitle: 'Via Ceresio 7, 20154 Milán · Cerrado del 31 de diciembre de 2026 al 3 de enero de 2027 · Reabre el 4 de enero por la noche',
    description:
      'Aviso oficial Nochevieja 2027: Ceresio 7 Milán permanece cerrado del 31 de diciembre de 2026 al 3 de enero de 2027 y reabre el lunes 4 de enero de 2027 para el servicio de cena. No hay fiesta ni entradas en venta. Como alternativas rooftop abiertas y reservables recomendamos Terrazza Duomo 21 / Terrazza MA.RE y Voya Rooftop.',
    closureBannerTitle: 'CIERRE OFICIAL NOCHEVIEJA 2027 · 31 DICIEMBRE 2026 – 3 ENERO 2027',
    closureBannerBody:
      'Ceresio 7 Milán cierra del 31 de diciembre de 2026 al 3 de enero de 2027 y reabre el 4 de enero por la noche. Descubre abajo los rooftops panorámicos de Milán confirmados para el 31 de diciembre.',
    alternativesHeading: 'Alternativas Rooftop Abiertas en Milán para Nochevieja 2027',
    statusLabel: 'Cerrado del 31 dic 2026 al 3 ene 2027 (reabre el 4 ene por la noche)',
  },
  fr: {
    title: 'Ceresio 7 Milan · Fermé au Nouvel An 2027 (31 Déc – 3 Jan)',
    subtitle: 'Via Ceresio 7, 20154 Milan · Fermeture officielle du 31 décembre 2026 au 3 janvier 2027 · Réouverture le 4 janvier au soir',
    description:
      'Avis officiel Saint-Sylvestre 2027 : Ceresio 7 Milan est fermé du 31 décembre 2026 au 3 janvier 2027 inclus et rouvre le lundi 4 janvier 2027 pour le service du soir. Aucun événement ni billet n’est en vente. Découvrez nos rooftops panoramiques ouverts et réservables : Terrazza Duomo 21 / Terrazza MA.RE et Voya Rooftop.',
    closureBannerTitle: 'FERMETURE OFFICIELLE NOUVEL AN 2027 · 31 DÉCEMBRE 2026 – 3 JANVIER 2027',
    closureBannerBody:
      'Ceresio 7 Milan est fermé du 31 décembre 2026 au 3 janvier 2027 et rouvre le 4 janvier au service du soir. Consultez ci-dessous les rooftops panoramiques ouverts pour le 31 décembre.',
    alternativesHeading: 'Alternatives Rooftop Ouvertes à Milan pour le Nouvel An 2027',
    statusLabel: 'Fermé du 31 déc. 2026 au 3 janv. 2027 (réouverture le 4 janv. au soir)',
  },
  de: {
    title: 'Ceresio 7 Mailand · Silvester 2027 Geschlossen (31.12 – 03.01)',
    subtitle: 'Via Ceresio 7, 20154 Mailand · Geschlossen vom 31. Dezember 2026 bis 3. Januar 2027 · Wiedereröffnung am 4. Januar abends',
    description:
      'Offizieller Hinweis zu Silvester 2027: Ceresio 7 Mailand bleibt vom 31. Dezember 2026 bis einschließlich 3. Januar 2027 geschlossen und öffnet am Montag, 4. Januar 2027, wieder zum Abendservice. Es findet keine Silvesterparty statt. Als geöffnete Rooftop-Alternativen empfehlen wir Terrazza Duomo 21 / Terrazza MA.RE und Voya Rooftop.',
    closureBannerTitle: 'OFFIZIELL GESCHLOSSEN ZU SILVESTER 2027 · 31. DEZ. 2026 – 3. JAN. 2027',
    closureBannerBody:
      'Ceresio 7 Mailand ist vom 31. Dezember 2026 bis 3. Januar 2027 geschlossen und öffnet am 4. Januar zum Abendservice. Entdecken Sie unten unsere geöffneten Mailänder Rooftop-Alternativen.',
    alternativesHeading: 'Geöffnete Rooftop-Alternativen in Mailand für Silvester 2027',
    statusLabel: 'Geschlossen 31.12.2026 – 03.01.2027 (öffnet 04.01. abends)',
  },
  pt: {
    title: 'Ceresio 7 Milão · Fechado no Réveillon 2027 (31 Dez – 3 Jan)',
    subtitle: 'Via Ceresio 7 · Encerrado de 31 de dezembro de 2026 a 3 de janeiro de 2027 · Reabre a 4 de janeiro ao jantar',
    closureBannerTitle: 'ENCERRAMENTO OFICIAL RÉVEILLON 2027 · 31 DEZ 2026 – 3 JAN 2027',
    closureBannerBody:
      'O Ceresio 7 Milão está fechado de 31 de dezembro de 2026 a 3 de janeiro de 2027 e reabre a 4 de janeiro para o serviço de jantar. Veja abaixo os rooftops alternativos abertos em Milão.',
    alternativesHeading: 'Alternativas Rooftop Abertas no Réveillon 2027',
  },
  nl: {
    title: 'Ceresio 7 Milaan · Gesloten Oud en Nieuw 2027 (31 Dec – 3 Jan)',
    subtitle: 'Via Ceresio 7 · Gesloten van 31 december 2026 t/m 3 januari 2027 · Heropent 4 januari voor diner',
    closureBannerTitle: 'OFFICIEEL GESLOTEN OUD EN NIEUW 2027 · 31 DEC 2026 – 3 JAN 2027',
    alternativesHeading: 'Geopende Rooftop-Alternatieven in Milaan voor Oud en Nieuw 2027',
  },
  ru: {
    title: 'Ceresio 7 Милан · Закрыт на Новый год 2027 (31 дек – 3 янв)',
    subtitle: 'Via Ceresio 7 · Закрыт с 31 декабря 2026 по 3 января 2027 · Открывается 4 января на ужин',
    closureBannerTitle: 'ОФИЦИАЛЬНО ЗАКРЫТ НА НОВЫЙ ГОД 2027 · 31 ДЕКАБРЯ – 3 ЯНВАРЯ',
    closureBannerBody:
      'Ceresio 7 в Милане закрыт с 31 декабря 2026 по 3 января 2027 и возобновляет работу вечером 4 января 2027. Ниже указаны открытые панорамные руфтопы Милана на 31 декабря.',
    alternativesHeading: 'Открытые руфтоп-альтернативы в Милане на Новый год 2027',
  },
  tr: {
    title: 'Ceresio 7 Milano · Yılbaşı 2027 Kapalı (31 Ara – 3 Oca)',
    subtitle: 'Via Ceresio 7 · 31 Aralık 2026 – 3 Ocak 2027 arası kapalı · 4 Ocak akşam servisiyle açılır',
    closureBannerTitle: 'RESMİ YILBAŞI KAPANIŞI · 31 ARALIK 2026 – 3 OCAK 2027',
    alternativesHeading: 'Yılbaşı 2027 İçin Açık Milano Rooftop Alternatifleri',
  },
  zh: {
    title: 'Ceresio 7 米兰 · 2027跨年停业通知（12月31日–1月3日）',
    subtitle: 'Via Ceresio 7 · 2026年12月31日至2027年1月3日暂停营业 · 1月4日晚餐恢复营业',
    closureBannerTitle: '官方跨年休业通知 · 2026年12月31日 – 2027年1月3日',
    closureBannerBody:
      'Ceresio 7 米兰将于2026年12月31日至2027年1月3日休业，并于1月4日晚餐时段恢复营业。无跨年门票发售。欢迎查看下方开放预订的米兰全景露台替代推荐。',
    alternativesHeading: '2027米兰跨年开放预订的全景露台替代推荐',
  },
  ar: {
    title: 'Ceresio 7 ميلانو · مغلق في رأس السنة 2027 (31 ديس – 3 ينا)',
    subtitle: 'Via Ceresio 7 · مغلق رسمياً من 31 ديسمبر 2026 حتى 3 يناير 2027 · يعيد الفتح مساء 4 يناير',
    closureBannerTitle: 'إغلاق رسمي ليلة رأس السنة 2027 · 31 ديسمبر 2026 – 3 يناير 2027',
    closureBannerBody:
      'يغلق Ceresio 7 ميلانو من 31 ديسمبر 2026 حتى 3 يناير 2027 ويعيد الفتح مساء 4 يناير 2027. لا توجد تذاكر معروضة للبيع. استكشف التراسات البانورامية المفتوحة أدناه.',
    alternativesHeading: 'بدائل التراسات المفتوحة للحجز في ميلانو ليلة رأس السنة 2027',
  },
  pl: {
    title: 'Ceresio 7 Mediolan · Zamknięte w Sylwestra 2027 (31.12–3.01)',
    subtitle: 'Via Ceresio 7 · Zamknięte od 31 grudnia 2026 do 3 stycznia 2027 · Ponowne otwarcie 4 stycznia wieczorem',
    closureBannerTitle: 'OFICJALNIE ZAMKNIĘTE W SYLWESTRA 2027 · 31 GRU – 3 STY',
    alternativesHeading: 'Otwarte alternatywy Rooftop w Mediolanie na Sylwestra 2027',
  },
  ro: {
    title: 'Ceresio 7 Milano · Închis de Revelion 2027 (31 Dec – 3 Ian)',
    subtitle: 'Via Ceresio 7 · Închis 31 decembrie 2026 – 3 ianuarie 2027 · Se redeschide pe 4 ianuarie la cină',
    closureBannerTitle: 'ÎNCHIS OFICIAL DE REVELION 2027 · 31 DEC 2026 – 3 IAN 2027',
    alternativesHeading: 'Alternative Rooftop Deschise în Milano de Revelion 2027',
  },
  el: {
    title: 'Ceresio 7 Μιλάνο · Κλειστό Πρωτοχρονιά 2027 (31 Δεκ – 3 Ιαν)',
    subtitle: 'Via Ceresio 7 · Κλειστό 31 Δεκεμβρίου 2026 έως 3 Ιανουαρίου 2027 · Επαναλειτουργία 4 Ιανουαρίου το βράδυ',
    closureBannerTitle: 'ΕΠΙΣΗΜΑ ΚΛΕΙΣΤΟ ΠΡΩΤΟΧΡΟΝΙΑ 2027 · 31 ΔΕΚ – 3 ΙΑΝ',
    alternativesHeading: 'Ανοιχτές Rooftop Εναλλακτικές στο Μιλάνο για την Πρωτοχρονιά 2027',
  },
  uk: {
    title: 'Ceresio 7 Мілан · Зачинено на Новий рік 2027 (31 гру – 3 січ)',
    subtitle: 'Via Ceresio 7 · Зачинено з 31 грудня 2026 до 3 січня 2027 · Відкриття 4 січня на вечерю',
    closureBannerTitle: 'ОФІЦІЙНО ЗАЧИНЕНО НА НОВИЙ РІК 2027 · 31 ГРУ – 3 СІЧ',
    alternativesHeading: 'Відкриті руфтоп-альтернативи у Мілані на Новий рік 2027',
  },
  sv: {
    title: 'Ceresio 7 Milano · Stängt Nyår 2027 (31 dec – 3 jan)',
    subtitle: 'Via Ceresio 7 · Stängt 31 dec 2026 – 3 jan 2027 · Öppnar igen 4 januari till middag',
  },
  no: {
    title: 'Ceresio 7 Milano · Stengt Nyttår 2027 (31. des – 3. jan)',
    subtitle: 'Via Ceresio 7 · Stengt 31. des 2026 – 3. jan 2027 · Åpner 4. januar til kveldsservering',
  },
  da: {
    title: 'Ceresio 7 Milano · Lukket Nytår 2027 (31. dec – 3. jan)',
    subtitle: 'Via Ceresio 7 · Lukket 31. dec 2026 – 3. jan 2027 · Genåbner 4. januar til aftenservering',
  },
  fi: {
    title: 'Ceresio 7 Milano · Suljettu Uusivuosi 2027 (31.12 – 3.1)',
    subtitle: 'Via Ceresio 7 · Suljettu 31.12.2026 – 3.1.2027 · Avataan 4. tammikuuta illalliselle',
  },
  cs: {
    title: 'Ceresio 7 Milán · Zavřeno na Silvestra 2027 (31.12 – 3.1)',
    subtitle: 'Via Ceresio 7 · Zavřeno 31. prosince 2026 – 3. ledna 2027 · Znovu otevřeno 4. ledna večer',
  },
  sk: {
    title: 'Ceresio 7 Miláno · Zatvorené na Silvestra 2027 (31.12 – 3.1)',
    subtitle: 'Via Ceresio 7 · Zatvorené 31. decembra 2026 – 3. januára 2027 · Otvára 4. januára večer',
  },
  hu: {
    title: 'Ceresio 7 Milánó · Zárva Szilveszterkor 2027 (Dec 31 – Jan 3)',
    subtitle: 'Via Ceresio 7 · Zárva 2026. dec. 31. – 2027. jan. 3. · Újranyitás január 4-én este',
  },
  bg: {
    title: 'Ceresio 7 Милано · Затворено за Нова година 2027 (31.12 – 3.01)',
    subtitle: 'Via Ceresio 7 · Затворено 31 дек 2026 – 3 ян 2027 · Отваря на 4 януари за вечеря',
  },
  hr: {
    title: 'Ceresio 7 Milano · Zatvoreno za Novu godinu 2027 (31.12 – 3.1)',
    subtitle: 'Via Ceresio 7 · Zatvoreno 31. prosinca 2026. – 3. siječnja 2027. · Otvara 4. siječnja navečer',
  },
  sl: {
    title: 'Ceresio 7 Milano · Zaprto za Silvestrovo 2027 (31.12 – 3.1)',
    subtitle: 'Via Ceresio 7 · Zaprto 31. decembra 2026 – 3. januarja 2027 · Ponovno odprto 4. januarja zvečer',
  },
  sr: {
    title: 'Ceresio 7 Milano · Zatvoreno za Novu godinu 2027 (31.12 – 3.1)',
    subtitle: 'Via Ceresio 7 · Zatvoreno 31. dec 2026 – 3. jan 2027 · Otvara 4. januara uveče',
  },
  bs: {
    title: 'Ceresio 7 Milano · Zatvoreno za Novu godinu 2027 (31.12 – 3.1)',
    subtitle: 'Via Ceresio 7 · Zatvoreno 31. dec 2026 – 3. jan 2027 · Otvara 4. januara navečer',
  },
  mk: {
    title: 'Ceresio 7 Милано · Затворено за Нова година 2027 (31.12 – 3.1)',
    subtitle: 'Via Ceresio 7 · Затворено 31 дек 2026 – 3 јан 2027 · Отвора на 4 јануари навечер',
  },
  sq: {
    title: 'Ceresio 7 Milano · Mbyllur për Vitin e Ri 2027 (31 Dhj – 3 Jan)',
    subtitle: 'Via Ceresio 7 · Mbyllur 31 dhjetor 2026 – 3 janar 2027 · Rihapet më 4 janar në mbrëmje',
  },
  et: {
    title: 'Ceresio 7 Milano · Suletud Aastavahetus 2027 (31.12 – 3.01)',
    subtitle: 'Via Ceresio 7 · Suletud 31. detsember 2026 – 3. jaanuar 2027 · Avatakse 4. jaanuari õhtul',
  },
  lv: {
    title: 'Ceresio 7 Milāna · Slēgts Jaungadā 2027 (31. dec – 3. jan)',
    subtitle: 'Via Ceresio 7 · Slēgts 2026. g. 31. dec – 2027. g. 3. jan · Atveras 4. janvāra vakarā',
  },
  lt: {
    title: 'Ceresio 7 Milanas · Uždaryta Naujiesiems 2027 (gruod. 31 – saus. 3)',
    subtitle: 'Via Ceresio 7 · Uždaryta 2026 gruod. 31 – 2027 saus. 3 · Atsidaro sausio 4 d. vakarą',
  },
  ga: {
    title: 'Ceresio 7 Milan · Dúnta Oíche Chinn Bliana 2027 (31 Noll – 3 Ean)',
    subtitle: 'Via Ceresio 7 · Dúnta 31 Nollaig 2026 – 3 Eanáir 2027 · Osclaíonn 4 Eanáir tráthnóna',
  },
  mt: {
    title: 'Ceresio 7 Milan · Magħluq għall-Ewwel tas-Sena 2027 (31 Diċ – 3 Jan)',
    subtitle: 'Via Ceresio 7 · Magħluq 31 ta’ Diċembru 2026 – 3 ta’ Jannar 2027 · Jiftaħ fl-4 ta’ Jannar filgħaxija',
  },
  is: {
    title: 'Ceresio 7 Mílanó · Lokað um Áramót 2027 (31. des – 3. jan)',
    subtitle: 'Via Ceresio 7 · Lokað 31. desember 2026 – 3. janúar 2027 · Opnar aftur 4. janúar að kvöldi',
  },
};

export function isCeresio7ClosedNyeSlug(slug: string): boolean {
  return slug === 'capodanno-ceresio-7-milano';
}

export function getCeresio7ClosedNyeContent(locale: string): CapodannoLocalizedEventContent {
  const pack: CeresioClosedPack =
    locale === 'it'
      ? IT_CLOSED
      : locale === 'en'
        ? EN_CLOSED
        : {
            ...EN_CLOSED,
            ...((CLOSED_OVERRIDES_35 as Record<string, Partial<CeresioClosedPack>>)[locale] || {}),
          };

  return {
    title: pack.title,
    subtitle: pack.subtitle,
    description: pack.description,
    musicAndFormat: pack.statusLabel,
    dressCode: pack.statusLabel,
    priceSummary: pack.statusLabel,
    tiers: [],
    highlights: pack.highlights,
    sourceBasis: pack.sourceBasis,
    closedForNye: true,
    closureBannerTitle: pack.closureBannerTitle,
    closureBannerBody: pack.closureBannerBody,
    alternativesHeading: pack.alternativesHeading,
    alternativesSubheading: pack.alternativesSubheading,
    customFaqs: pack.customFaqs,
  };
}
