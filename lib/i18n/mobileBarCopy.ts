import type { LocaleCode } from './locales';

type BarCopy = {
  nav: string;
  genericMessage: string;
  venueMessage: (name: string) => string;
  main: string;
  mainVenue: (name: string) => string;
  sub: string;
  aria: string;
  ariaVenue: (name: string) => string;
};

export const BAR_COPY: Partial<Record<LocaleCode, BarCopy>> & { en: BarCopy; it: BarCopy } = {
  en: {
    nav: 'Venue information and bookings',
    genericMessage: 'Hi! I would like current information and to request a booking for a venue or table in Milan.',
    venueMessage: (name) => `Hi! I would like current information and to request a booking at ${name}, including table options and conditions.`,
    main: 'Information and bookings',
    mainVenue: (name) => `Info and bookings: ${name}`,
    sub: 'Concierge 7/7 · VIP Tables & Guest Lists',
    aria: 'Request information and a booking on WhatsApp',
    ariaVenue: (name) => `Request information and a booking for ${name} on WhatsApp`,
  },
  it: {
    nav: 'Informazioni e prenotazioni locali',
    genericMessage: 'Ciao Nightlife Milan! Vorrei ricevere disponibilità, prezzi e prenotare un Tavolo VIP o lista a Milano.',
    venueMessage: (name) => `Ciao Nightlife Milan! Vorrei ricevere disponibilità, listino bottiglie e prenotare per ${name}.`,
    main: 'Informazioni e prenotazioni',
    mainVenue: (name) => `Info e prenotazioni: ${name}`,
    sub: 'Concierge 7/7 · Tavoli VIP e Liste',
    aria: 'Richiedi informazioni e prenotazione su WhatsApp',
    ariaVenue: (name) => `Richiedi informazioni e prenotazione per ${name} su WhatsApp`,
  },
  es: {
    nav: 'Información y reservas de locales',
    genericMessage: 'Hola. Quiero información actual y solicitar una reserva para un local o una mesa en Milán.',
    venueMessage: (name) => `Hola. Quiero información actual y solicitar una reserva para ${name}, incluidas mesas y condiciones.`,
    main: 'Información y reservas',
    mainVenue: (name) => `Info y reservas: ${name}`,
    sub: 'Concierge 7/7 · Mesas VIP y Listas',
    aria: 'Solicitar información y reserva por WhatsApp',
    ariaVenue: (name) => `Solicitar información y reserva para ${name} por WhatsApp`,
  },
  fr: {
    nav: 'Informations et réservations de lieux',
    genericMessage: "Bonjour. Je souhaite des informations actuelles et demander une réservation de lieu ou de table à Milan.",
    venueMessage: (name) => `Bonjour. Je souhaite des informations actuelles et demander une réservation pour ${name}, notamment sur les tables et conditions.`,
    main: 'Informations et réservations',
    mainVenue: (name) => `Infos et réservations : ${name}`,
    sub: 'Conciergerie 7j/7 · Tables VIP & Listes',
    aria: 'Demander des informations et une réservation sur WhatsApp',
    ariaVenue: (name) => `Demander des informations et une réservation pour ${name} sur WhatsApp`,
  },
  de: {
    nav: 'Informationen und Reservierungen',
    genericMessage: 'Hallo! Ich möchte aktuelle Informationen und eine Reservierung für eine Location oder einen Tisch in Mailand anfragen.',
    venueMessage: (name) => `Hallo! Ich möchte aktuelle Informationen und eine Reservierung für ${name} anfragen, einschließlich Tischoptionen und Bedingungen.`,
    main: 'Informationen und Reservierung',
    mainVenue: (name) => `Info und Reservierung: ${name}`,
    sub: 'Concierge 7/7 · VIP-Tische & Gästelisten',
    aria: 'Informationen und Reservierung über WhatsApp anfragen',
    ariaVenue: (name) => `Informationen und Reservierung für ${name} über WhatsApp anfragen`,
  },
  pt: {
    nav: 'Informações e reservas de locais',
    genericMessage: 'Olá! Quero informações atuais e pedir uma reserva de local ou mesa em Milão.',
    venueMessage: (name) => `Olá! Quero informações atuais e pedir uma reserva para ${name}, incluindo mesas e condições.`,
    main: 'Informações e reservas',
    mainVenue: (name) => `Info e reservas: ${name}`,
    sub: 'Concierge 7/7 · Mesas VIP e Listas',
    aria: 'Pedir informações e reserva pelo WhatsApp',
    ariaVenue: (name) => `Pedir informações e reserva para ${name} pelo WhatsApp`,
  },
  nl: {
    nav: 'Informatie en reserveringen voor locaties',
    genericMessage: 'Hallo! Ik wil actuele informatie en een reservering aanvragen voor een locatie of tafel in Milaan. Deze aanvraag bevestigt geen reservering.',
    venueMessage: (name) => `Hallo! Ik wil actuele informatie en een reservering aanvragen voor ${name}, inclusief tafelopties en voorwaarden. Deze aanvraag bevestigt geen reservering.`,
    main: 'Informatie en reserveringen',
    mainVenue: (name) => `Info en reserveringen: ${name}`,
    sub: 'Een aanvraag bevestigt geen reservering',
    aria: 'Informatie en een reservering aanvragen via WhatsApp',
    ariaVenue: (name) => `Informatie en een reservering voor ${name} aanvragen via WhatsApp`,
  },
  ru: {
    nav: 'Информация и бронирование заведений',
    genericMessage: 'Здравствуйте! Мне нужна актуальная информация, и я хочу отправить запрос на бронирование заведения или столика в Милане. Запрос не подтверждает бронирование.',
    venueMessage: (name) => `Здравствуйте! Мне нужна актуальная информация, и я хочу отправить запрос на бронирование в ${name}, включая столики и условия. Запрос не подтверждает бронирование.`,
    main: 'Информация и бронирование',
    mainVenue: (name) => `Информация и бронь: ${name}`,
    sub: 'Запрос не подтверждает бронирование',
    aria: 'Запросить информацию и бронирование в WhatsApp',
    ariaVenue: (name) => `Запросить информацию и бронирование в ${name} через WhatsApp`,
  },
  tr: {
    nav: 'Mekân bilgileri ve rezervasyonlar',
    genericMessage: 'Merhaba! Milano’da bir mekân veya masa için güncel bilgi almak ve rezervasyon talep etmek istiyorum. Bu talep rezervasyonu onaylamaz.',
    venueMessage: (name) => `Merhaba! ${name} için masa seçenekleri ve koşullar dâhil güncel bilgi almak ve rezervasyon talep etmek istiyorum. Bu talep rezervasyonu onaylamaz.`,
    main: 'Bilgi ve rezervasyon',
    mainVenue: (name) => `Bilgi ve rezervasyon: ${name}`,
    sub: 'Talep, rezervasyonu onaylamaz',
    aria: 'WhatsApp üzerinden bilgi ve rezervasyon talep et',
    ariaVenue: (name) => `${name} için WhatsApp üzerinden bilgi ve rezervasyon talep et`,
  },
  zh: {
    nav: '场所信息与预订',
    genericMessage: '您好！我想了解米兰夜店或餐桌的最新信息并提交预订申请。此申请不代表预订已确认。',
    venueMessage: (name) => `您好！我想了解${name}的最新信息并提交预订申请，包括餐桌选项和条件。此申请不代表预订已确认。`,
    main: '信息与预订',
    mainVenue: (name) => `信息与预订：${name}`,
    sub: '提交申请不代表预订已确认',
    aria: '通过 WhatsApp 咨询信息并申请预订',
    ariaVenue: (name) => `通过 WhatsApp 咨询${name}并申请预订`,
  },
};
