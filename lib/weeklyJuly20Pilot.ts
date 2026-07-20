import type { EventBatchProfile } from './eventBatchProfiles';
import type { LocalizedEventContent, LocalizedEventFaq } from './localizedEventContent';
import type { LocaleCode } from './i18n/locales';

export const MONDAY_NIGHT_BASE_ID = 'nlm-justme-monday-2026-07-20';
export const MONDAY_NIGHT_CANONICAL_SLUG = 'just-me-milano-monday-night-july-20-2026';
export const MONDAY_NIGHT_IT_SLUG = 'just-me-milano-lunedi-20-luglio-2026';
export const MONDAY_NIGHT_AFFILIATE_URL = 'https://xceed.me/en/milano/event/monday-night-270/220707/channel/nightlifemilan-1';
export const MONDAY_NIGHT_PHONE = '+39 351 912 7047';
export const MONDAY_NIGHT_START_UTC = '2026-07-20T17:30:00Z';
export const MONDAY_NIGHT_END_UTC = '2026-07-21T03:00:00Z';

const VISUAL_ROOT = '/images/events/generated/weekly-2026-07-20';

export const MONDAY_NIGHT_VISUALS = {
  en: {
    cover: `${VISUAL_ROOT}/justme-monday-2026-07-20-cover-2x1-en-v1.png`,
    poster: `${VISUAL_ROOT}/justme-monday-2026-07-20-poster-5x4-en-v1.png`,
  },
  it: {
    cover: `${VISUAL_ROOT}/justme-monday-2026-07-20-cover-2x1-it-v1.png`,
    poster: `${VISUAL_ROOT}/justme-monday-2026-07-20-poster-5x4-it-v1.png`,
  },
  mood: [
    `${VISUAL_ROOT}/justme-monday-2026-07-20-arrival-5x4-v1.png`,
    `${VISUAL_ROOT}/justme-monday-2026-07-20-aperitivo-5x4-v1.png`,
    `${VISUAL_ROOT}/justme-monday-2026-07-20-lounge-5x4-v1.png`,
    `${VISUAL_ROOT}/justme-monday-2026-07-20-buffet-5x4-v1.png`,
  ] as const,
} as const;

export const MONDAY_NIGHT_PROFILE: EventBatchProfile = {
  baseId: MONDAY_NIGHT_BASE_ID,
  canonicalSlug: MONDAY_NIGHT_CANONICAL_SLUG,
  localizedSlugs: { en: MONDAY_NIGHT_CANONICAL_SLUG, it: MONDAY_NIGHT_IT_SLUG },
  siteLocales: ['en', 'it'],
  indexedLocales: ['en', 'it'],
  eventName: { en: 'Monday Night', it: 'Monday Night' },
  venue: 'Just Me Milano',
  area: { en: 'Sempione, Milan', it: 'Sempione, Milano' },
  dateISO: '2026-07-20',
  dates: { en: 'Monday, July 20, 2026', it: 'Lunedì 20 luglio 2026' },
  start: '19:30',
  end: '05:00',
  minAge: 21,
  dressCode: {
    en: 'Elegant dress code; long trousers required for men.',
    it: 'Dress code elegante; pantaloni lunghi obbligatori per gli uomini.',
  },
  kind: 'club',
  genres: {
    en: 'House, hip-hop, hits, EDM and reggaeton',
    it: 'House, hip-hop, hit, EDM e reggaeton',
  },
  affiliateUrl: MONDAY_NIGHT_AFFILIATE_URL,
  posterUrl: MONDAY_NIGHT_VISUALS.en.cover,
  programme: [{ key: 'clubMixed', start: '19:30', end: '05:00' }],
  offers: [
    { key: 'aperitifOneDrink', price: 15, category: 'ticket' },
    { key: 'clubOneDrink', price: 15, category: 'ticket' },
    { key: 'danceFloorTable', price: 320, category: 'table' },
    { key: 'vipAreaTable', price: 640, category: 'table' },
    { key: 'superVipBackLineTable', price: 1280, category: 'table' },
    { key: 'superVipFrontLineTable', price: 3200, category: 'table' },
    { key: 'djTable', price: 5000, category: 'table' },
  ],
  specialGuests: { en: [], it: [] },
  venueImages: MONDAY_NIGHT_VISUALS.mood,
};

const EN_FAQS: LocalizedEventFaq[] = [
  ['What is Monday Night at Just Me Milano?', 'It is the Monday club night at Just Me Milano on July 20, 2026, with aperitivo from 19:30 and clubbing until 05:00.'],
  ['Where is Just Me Milano?', 'Just Me Milano is in Parco Sempione beside Torre Branca, at Viale Luigi Camoens 2, Milan.'],
  ['What time does Monday Night start?', 'The published start time is 19:30 on Monday, July 20, 2026.'],
  ['What time does Just Me Milano close?', 'The published end time for this event is 05:00 on Tuesday morning.'],
  ['Is Monday Night at Just Me Milano 21+?', 'Yes. Entry is 21+ and valid photo ID may be checked at the door.'],
  ['What is the dress code?', 'Elegant dress code applies; long trousers are required for men.'],
  ['What music is played?', 'The published genres are house, hip-hop, hits, EDM and reggaeton.'],
  ['Is there an aperitivo?', 'Yes. The evening starts at 19:30 with a buffet aperitivo and premium cocktails.'],
  ['Can I book dinner?', 'A served dinner can be requested subject to availability and confirmation.'],
  ['How much is the aperitivo offer?', 'The published Aperitif + 1 Drink offer is EUR 15.'],
  ['How much is club entry?', 'The published Club + 1 Drink offer is EUR 15.'],
  ['How do I buy the real ticket?', `Buy only through the official Nightlife Milan Xceed link: ${MONDAY_NIGHT_AFFILIATE_URL}.`],
  ['Is Eventbrite registration an admission ticket?', 'No. Eventbrite registration is an information request and does not provide admission.'],
  ['What should I do after buying on Xceed?', `Send the Xceed purchase confirmation on WhatsApp to ${MONDAY_NIGHT_PHONE}, with your name and group size.`],
  ['Can I book a dance-floor table?', 'Yes. The published Dance Floor Table price is EUR 320, subject to current availability.'],
  ['How much is a VIP Area Table?', 'The published VIP Area Table price is EUR 640.'],
  ['Are Super VIP tables available?', 'Published options are EUR 1,280 for back line and EUR 3,200 for front line, subject to availability.'],
  ['Is a DJ table listed?', 'Yes. The published DJ Table price is EUR 5,000, subject to availability.'],
  ['Can Nightlife Milan help with a group booking?', `Yes. Send the date, group size and preferred offer to WhatsApp ${MONDAY_NIGHT_PHONE}.`],
  ['What is the best arrival time for aperitivo?', 'Arrive for the published 19:30 opening if you want the aperitivo phase.'],
  ['Can I arrive later for the club?', 'Yes, but the selected entry formula and current availability must be confirmed before arrival.'],
  ['Is Just Me close to Torre Branca?', 'Yes. The venue is directly beside Torre Branca in Parco Sempione.'],
  ['Which metro stations are nearby?', 'Cadorna, Cairoli and Lanza are practical nearby stations; allow time to walk through Parco Sempione.'],
  ['Are online tickets refundable?', 'The published policy says online tickets are non-refundable except when entry is denied by venue security.'],
  ['Where can I check current availability?', `Use the exact Xceed link or ask Nightlife Milan on WhatsApp ${MONDAY_NIGHT_PHONE}.`],
].map(([question, answer]) => ({ question, answer }));

const IT_FAQS: LocalizedEventFaq[] = [
  ['Cos’è Monday Night al Just Me Milano?', 'È la serata del lunedì al Just Me Milano del 20 luglio 2026, con aperitivo dalle 19:30 e club fino alle 05:00.'],
  ['Dove si trova il Just Me Milano?', 'Il Just Me Milano si trova nel Parco Sempione accanto alla Torre Branca, in Viale Luigi Camoens 2.'],
  ['A che ora inizia Monday Night?', 'L’orario di apertura pubblicato è 19:30 di lunedì 20 luglio 2026.'],
  ['A che ora chiude il Just Me Milano?', 'La chiusura pubblicata per questa serata è alle 05:00 di martedì mattina.'],
  ['Monday Night al Just Me è 21+?', 'Sì. L’ingresso è 21+ e alla porta può essere richiesto un documento valido.'],
  ['Qual è il dress code?', 'È richiesto un abbigliamento elegante; per gli uomini sono obbligatori i pantaloni lunghi.'],
  ['Che musica viene suonata?', 'I generi pubblicati sono house, hip-hop, hit, EDM e reggaeton.'],
  ['È previsto l’aperitivo?', 'Sì. La serata inizia alle 19:30 con aperitivo buffet e cocktail premium.'],
  ['Posso prenotare la cena?', 'La cena servita può essere richiesta, in base alla disponibilità e alla conferma.'],
  ['Quanto costa la formula aperitivo?', 'La formula pubblicata Aperitivo + 1 drink costa 15 EUR.'],
  ['Quanto costa l’ingresso club?', 'La formula pubblicata Club + 1 drink costa 15 EUR.'],
  ['Come compro il vero biglietto?', `Acquista solo dal link Xceed ufficiale Nightlife Milan: ${MONDAY_NIGHT_AFFILIATE_URL}.`],
  ['La registrazione Eventbrite vale come ingresso?', 'No. La registrazione Eventbrite è una richiesta di informazioni e non consente l’ingresso.'],
  ['Cosa devo fare dopo l’acquisto su Xceed?', `Invia la conferma di acquisto Xceed su WhatsApp al ${MONDAY_NIGHT_PHONE}, indicando nome e numero di persone.`],
  ['Posso prenotare un tavolo dance floor?', 'Sì. Il prezzo pubblicato del tavolo dance floor è 320 EUR, salvo disponibilità.'],
  ['Quanto costa un tavolo area VIP?', 'Il prezzo pubblicato del tavolo area VIP è 640 EUR.'],
  ['Sono disponibili tavoli Super VIP?', 'Le opzioni pubblicate sono 1.280 EUR back line e 3.200 EUR front line, salvo disponibilità.'],
  ['È previsto un tavolo DJ?', 'Sì. Il prezzo pubblicato del tavolo DJ è 5.000 EUR, salvo disponibilità.'],
  ['Nightlife Milan può aiutarmi con un gruppo?', `Sì. Invia data, numero di persone e formula desiderata al ${MONDAY_NIGHT_PHONE}.`],
  ['Qual è l’orario migliore per l’aperitivo?', 'Arriva per l’apertura pubblicata alle 19:30 se vuoi partecipare alla fase aperitivo.'],
  ['Posso arrivare più tardi per il club?', 'Sì, ma prima dell’arrivo devi confermare la formula scelta e la disponibilità attuale.'],
  ['Il Just Me è vicino alla Torre Branca?', 'Sì. Il locale si trova direttamente accanto alla Torre Branca nel Parco Sempione.'],
  ['Quali fermate metro sono vicine?', 'Cadorna, Cairoli e Lanza sono le fermate più pratiche; considera il tragitto a piedi nel Parco Sempione.'],
  ['I biglietti online sono rimborsabili?', 'La politica pubblicata indica che non sono rimborsabili, salvo ingresso negato dalla sicurezza del locale.'],
  ['Dove verifico la disponibilità aggiornata?', `Usa il link Xceed esatto oppure contatta Nightlife Milan su WhatsApp al ${MONDAY_NIGHT_PHONE}.`],
].map(([question, answer]) => ({ question, answer }));

const COMMON_OFFERS = [
  { name: 'Aperitif + 1 Drink', price: 15, category: 'ticket' as const },
  { name: 'Club + 1 Drink', price: 15, category: 'ticket' as const },
  { name: 'Dance Floor Table', price: 320, category: 'table' as const },
  { name: 'VIP Area Table', price: 640, category: 'table' as const },
  { name: 'Super VIP Area Table — Back Line', price: 1280, category: 'table' as const },
  { name: 'Super VIP Area Table — Front Line', price: 3200, category: 'table' as const },
  { name: 'DJ Table', price: 5000, category: 'table' as const },
];

export function getMondayNightLocalizedContent(locale: LocaleCode): LocalizedEventContent {
  const isIt = locale === 'it';
  return {
    locale: isIt ? 'it' : 'en',
    canonicalSlug: MONDAY_NIGHT_CANONICAL_SLUG,
    title: isIt ? 'Monday Night al Just Me Milano — 20 luglio 2026' : 'Monday Night at Just Me Milano — July 20, 2026',
    metaTitle: isIt ? 'Just Me Milano Lunedì 20 Luglio 2026' : 'Just Me Milano Monday Night — July 20, 2026',
    metaDescription: isIt
      ? 'Monday Night al Just Me Milano: aperitivo dalle 19:30, club fino alle 05:00, 21+. Prenotazioni WhatsApp +39 351 912 7047.'
      : 'Monday Night at Just Me Milano: aperitivo from 19:30, club until 05:00, 21+. Book on WhatsApp +39 351 912 7047.',
    seoSummary: isIt
      ? 'Just Me Milano, lunedì 20 luglio: aperitivo dalle 19:30, club fino alle 05:00, ingresso 21+ e dress code elegante.'
      : 'Just Me Milano on Monday, July 20: aperitivo from 19:30, club until 05:00, 21+ entry and elegant dress code.',
    answerFirst: isIt
      ? 'Monday Night è la serata del lunedì al Just Me Milano, nel Parco Sempione: aperitivo buffet e cocktail premium dalle 19:30, poi musica house, hip-hop, hit, EDM e reggaeton fino alle 05:00.'
      : 'Monday Night is Just Me Milano’s Monday event in Parco Sempione: buffet aperitivo and premium cocktails from 19:30, followed by house, hip-hop, hits, EDM and reggaeton until 05:00.',
    bookingIntro: isIt
      ? `Acquista biglietti o tavoli solo su Xceed. La registrazione Eventbrite non è un biglietto d’ingresso. Dopo l’acquisto invia la conferma Xceed su WhatsApp al ${MONDAY_NIGHT_PHONE}.`
      : `Buy tickets or tables only on Xceed. Eventbrite registration is not an admission ticket. After purchase, send the Xceed confirmation on WhatsApp to ${MONDAY_NIGHT_PHONE}.`,
    venueDescription: isIt
      ? 'Il Just Me Milano si trova nel Parco Sempione accanto alla Torre Branca, in Viale Luigi Camoens 2. Cadorna, Cairoli e Lanza sono le fermate metro più pratiche.'
      : 'Just Me Milano is in Parco Sempione beside Torre Branca, at Viale Luigi Camoens 2. Cadorna, Cairoli and Lanza are the most practical nearby metro stations.',
    leadPosterAfterBooking: true,
    programmeBeforeSections: true,
    sections: isIt ? [
      { title: 'Target e atmosfera', body: 'Pubblico 25–35, internazionale e curato; atmosfera elegante da aperitivo, lounge e club.' },
      { title: 'Dress code e ingresso', body: 'Ingresso 21+ con documento. Abbigliamento elegante; pantaloni lunghi obbligatori per gli uomini.' },
      { title: 'Musica e mood', body: 'House, hip-hop, hit, EDM e reggaeton, con energia crescente dalla fase aperitivo alla notte.' },
      { title: 'Location e arrivo', body: 'Just Me Milano, Parco Sempione, accanto alla Torre Branca. Pianifica l’arrivo in anticipo.' },
    ] : [
      { title: 'Target and atmosphere', body: 'A polished international 25–35 audience, moving from aperitivo and lounge conversation into the club night.' },
      { title: 'Dress code and entry', body: 'Entry is 21+ with valid ID. Elegant dress code; long trousers are required for men.' },
      { title: 'Music and mood', body: 'House, hip-hop, hits, EDM and reggaeton, building from aperitivo into late-night club energy.' },
      { title: 'Location and arrival', body: 'Just Me Milano, Parco Sempione, beside Torre Branca. Plan your arrival in advance.' },
    ],
    programme: isIt ? [
      { start: '19:30', title: 'Apertura, aperitivo buffet e cocktail premium' },
      { start: 'A seguire', title: 'Monday Night con house, hip-hop, hit, EDM e reggaeton' },
      { start: '05:00', title: 'Chiusura pubblicata' },
    ] : [
      { start: '19:30', title: 'Doors, buffet aperitivo and premium cocktails' },
      { start: 'Afterwards', title: 'Monday Night with house, hip-hop, hits, EDM and reggaeton' },
      { start: '05:00', title: 'Published closing time' },
    ],
    offers: isIt ? COMMON_OFFERS.map((offer) => ({ ...offer, name: ({
      'Aperitif + 1 Drink': 'Aperitivo + 1 drink',
      'Club + 1 Drink': 'Club + 1 drink',
      'Dance Floor Table': 'Tavolo dance floor',
      'VIP Area Table': 'Tavolo area VIP',
      'Super VIP Area Table — Back Line': 'Tavolo Super VIP — back line',
      'Super VIP Area Table — Front Line': 'Tavolo Super VIP — front line',
      'DJ Table': 'Tavolo DJ',
    } as Record<string, string>)[offer.name] })) : COMMON_OFFERS,
    affiliateUrl: MONDAY_NIGHT_AFFILIATE_URL,
    faqs: isIt ? IT_FAQS : EN_FAQS,
  };
}

export const MONDAY_NIGHT_EVENTBRITE_TITLES = {
  it: [
    'Just Me Milano Lunedì 20 Luglio 2026 | Biglietti',
    'Discoteca Milano Lunedì Sera | Just Me 20 Luglio',
    'Aperitivo Just Me Milano | Lunedì 20 Luglio 2026',
    'Tavoli VIP Just Me Milano | Monday Night 20 Luglio',
    'Serata Milano Lunedì 20 Luglio | Just Me Milano',
    'Nightlife Milano Lunedì | Just Me Biglietti e Tavoli',
    'Club Milano Lunedì Sera | Just Me 21+ 20 Luglio',
    'Aperitivo e Discoteca Milano | Just Me Monday Night',
    'Dove Uscire a Milano Lunedì | Just Me 20 Luglio',
    'Just Me Milano Prenotazioni | Lunedì Sera 20 Luglio',
  ],
  en: [
    'Just Me Milano Monday Night | July 20 2026 Tickets',
    'Milan Nightlife Monday | Just Me July 20',
    'Monday Nightclub Milan | Just Me Tickets & Tables',
    'Aperitivo Milan Monday | Just Me July 20',
    'VIP Tables Milan Monday | Just Me Milano',
    'Milan Club Monday Night | Just Me 21+',
    'Things to Do in Milan Monday Night | Just Me',
    'Where to Party in Milan Monday | Just Me Milano',
    'Milan Nightlife Tickets | Just Me Monday Night',
    'Just Me Milan Reservations | Monday July 20',
  ],
} as const;

