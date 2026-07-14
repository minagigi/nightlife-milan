import type { EventLocaleFaqTemplate, EventLocalePack } from './eventBatchLocaleTypes';

const EN_FAQS: readonly EventLocaleFaqTemplate[] = [
  ['What is {event} at {venue}?', '{event} takes place at {venue} on {date}, from {start} to {end}.'],
  ['Where is {venue} in Milan?', '{venue} is in {area}. Contact Nightlife Milan on WhatsApp {phone} for arrival help.'],
  ['What time do doors open for {event}?', 'Doors open at {start} on {date}; the event is scheduled until {end}.'],
  ['What music is played at {event}?', 'The published music for {event} is {genres}.'],
  ['What is the minimum age for {event}?', 'Entry to {event} is restricted to guests aged {minAge}+ and ID may be checked at the door.'],
  ['What is the dress code at {venue}?', '{dressCode}'],
  ['How much does entry to {event} cost?', 'Published entry starts from EUR {lowestPrice}; review the listed offer before booking.'],
  ['How do I buy official tickets for {event}?', 'Use the official booking link: {affiliateUrl}. Nightlife Milan can help on WhatsApp {phone}.'],
  ['Can I book a table at {venue}?', 'Published table offers are listed for this event where available. Confirm availability through {phone}.'],
  ['Is the Eventbrite registration my entry ticket?', 'No. Eventbrite registrations are information requests; use the official booking link for entry or table booking.'],
  ['Can I arrive for the aperitif?', 'Check the programme: the event begins at {start}, with the listed first programme phase.'],
  ['Does {event} run after midnight?', 'Yes. {event} is scheduled from {start} until {end}.'],
  ['What is included in the entry offers?', 'Each offer is shown with its price and name. Confirm the selected formula before booking.'],
  ['Can I book for a group at {venue}?', 'For groups and tables, send your group size and preferred offer to WhatsApp {phone}.'],
  ['Are special guests announced for {event}?', '{guestFaqAnswer}'],
  ['Is {venue} suitable for a late Milan night out?', '{event} runs at {venue} until {end}, subject to the published programme.'],
  ['Can I get help choosing an offer?', 'Yes. Nightlife Milan can clarify the published ticket and table offers on WhatsApp {phone}.'],
  ['What happens after the first programme phase?', 'The programme continues through its published slots until {end}; see the event guide for timings.'],
  ['Is a table price the same as an entry ticket?', 'No. Table and entry offers are listed separately; use the official booking link to choose the right option.'],
  ['What should I bring to {event}?', 'Bring valid ID for the {minAge}+ door policy and follow the venue dress code.'],
  ['Can I contact Nightlife Milan before booking?', 'Yes. Message WhatsApp {phone} for booking guidance and current availability.'],
  ['Which area of Milan is {venue} in?', '{venue} is located in {area}.'],
  ['Can I use the official link for tables and tickets?', 'Yes. The official event link is {affiliateUrl}.'],
  ['What is the latest published finish time?', 'The published finish time for {event} is {end}.'],
  ['Where can I find {event} updates?', 'Use the event guide at {siteUrl} or WhatsApp Nightlife Milan on {phone}.'],
].map(([question, answer]) => ({ question, answer }));

const IT_FAQS: readonly EventLocaleFaqTemplate[] = [
  ['Cos\'e {event} al {venue}?', '{event} si svolge al {venue} il {date}, dalle {start} alle {end}.'],
  ['Dove si trova {venue} a Milano?', '{venue} si trova in {area}. Per l\'arrivo scrivi a Nightlife Milan su WhatsApp {phone}.'],
  ['A che ora aprono le porte per {event}?', 'Le porte aprono alle {start} il {date}; la chiusura prevista e alle {end}.'],
  ['Che musica c\'e a {event}?', 'La musica annunciata per {event} e: {genres}.'],
  ['Qual e l\'eta minima per {event}?', 'L\'ingresso a {event} e riservato ai maggiori di {minAge} anni e puo essere richiesto un documento.'],
  ['Qual e il dress code al {venue}?', '{dressCode}'],
  ['Quanto costa l\'ingresso a {event}?', 'I prezzi pubblicati partono da EUR {lowestPrice}; verifica la formula scelta prima della prenotazione.'],
  ['Come acquisto i biglietti ufficiali per {event}?', 'Usa il link ufficiale: {affiliateUrl}. Nightlife Milan ti aiuta su WhatsApp {phone}.'],
  ['Posso prenotare un tavolo al {venue}?', 'Le formule tavolo pubblicate sono elencate quando disponibili. Conferma la disponibilita al {phone}.'],
  ['La registrazione Eventbrite vale come biglietto?', 'No. La registrazione Eventbrite e una richiesta di informazioni; usa il link ufficiale per ingresso o tavolo.'],
  ['Posso arrivare per l\'aperitivo?', 'Controlla il programma: l\'evento parte alle {start}, con la prima fase indicata.'],
  ['{event} continua dopo mezzanotte?', 'Si. {event} e programmato dalle {start} alle {end}.'],
  ['Cosa includono le formule di ingresso?', 'Ogni formula mostra prezzo e nome. Conferma la soluzione selezionata prima di prenotare.'],
  ['Posso prenotare per un gruppo al {venue}?', 'Per gruppi e tavoli, invia numero di persone e formula preferita su WhatsApp {phone}.'],
  ['Ci sono ospiti speciali a {event}?', '{guestFaqAnswer}'],
  ['{venue} e adatto per una serata fino a tardi?', '{event} prosegue al {venue} fino alle {end}, secondo il programma pubblicato.'],
  ['Posso ricevere aiuto per scegliere una formula?', 'Si. Nightlife Milan chiarisce biglietti e tavoli pubblicati su WhatsApp {phone}.'],
  ['Cosa succede dopo la prima fase del programma?', 'Il programma continua nelle fasce pubblicate fino alle {end}; consulta la guida dell\'evento per gli orari.'],
  ['Il prezzo del tavolo e uguale al biglietto?', 'No. Tavoli e ingressi sono elencati separatamente; usa il link ufficiale per scegliere la formula.'],
  ['Cosa devo portare a {event}?', 'Porta un documento valido per la politica {minAge}+ e rispetta il dress code del locale.'],
  ['Posso contattare Nightlife Milan prima di prenotare?', 'Si. Scrivi su WhatsApp {phone} per assistenza e disponibilita attuale.'],
  ['In quale zona di Milano si trova {venue}?', '{venue} si trova in {area}.'],
  ['Posso usare il link ufficiale per tavoli e biglietti?', 'Si. Il link ufficiale dell\'evento e {affiliateUrl}.'],
  ['Qual e l\'orario di chiusura pubblicato?', 'L\'orario di chiusura pubblicato per {event} e {end}.'],
  ['Dove trovo gli aggiornamenti di {event}?', 'Usa la guida dell\'evento su {siteUrl} o scrivi a Nightlife Milan su WhatsApp {phone}.'],
].map(([question, answer]) => ({ question, answer }));

export const EVENT_LOCALE_PACK_EN = {
  locale: 'en',
  titleTemplate: '{venue}: {event} - {date}',
  summaryTemplate: '{venue}: {event}, {date}, {start}-{end}. WhatsApp {phone}.',
  sectionTitles: { experience: 'The night', booking: 'Tickets and tables', access: 'Access and dress code' },
  experienceBodies: {
    club: '{venue} hosts {event} from {start} to {end} in {area}, with {genres}. {guestSentence}',
    match: '{venue} shows {event} from {start} to {end}, with venue screens, sound and a DJ set before, during and after the match.',
    showcase: '{venue} hosts {event} from {start} to {end}. {guestSentence} Music: {genres}.',
    afterparty: '{event} runs at {venue} from {start} to {end}, with {genres}.',
  },
  bookingBody: 'Published offers start from EUR {lowestPrice}. Use the official booking link or WhatsApp {phone} for current availability.',
  accessBody: '{venue} is in {area}. Entry is {minAge}+. {dressCode}',
  programme: {
    aperitif: 'Buffet aperitif and premium cocktails', aperitifDinner: 'Buffet aperitif and optional dinner', clubMixed: '{event}: {genres}', clubHouseLatin: '{event}: {genres}',
    matchAndDj: 'Match screening, half-time and post-match DJ set', showcase: '{event} DJ set: {specialGuests}', afterpartyArrival: 'Doors open and dress code check', afterpartyPeak: '{genres} until close', closing: 'Closing set',
  },
  offers: {
    aperitifOneDrink: 'Aperitif + 1 Drink', aperitifTwoDrinks: 'Aperitif + 2 Drinks', aperitifOpenWine: 'Aperitif + Open Wine', clubOneDrink: 'Club + 1 Drink', clubTwoDrinks: 'Ticket + 2 Drinks', womanOneDrink: 'Woman + 1 Drink',
    danceFloorTable: 'Dance Floor Table', priveDanceFloorTable: 'Prive Dance Floor Table', vipAreaTable: 'VIP Area Table', superVipBackLineTable: 'Super VIP Area Table - Back Line', superVipFrontLineTable: 'Super VIP Area Table - Front Line', djTable: 'DJ Table', priveAriaTable: 'Prive Aria Table', priveDjTable: 'Prive DJ Table', priveBalconyTable: 'Prive Balcony Table', vipPriveTable: 'VIP Prive Table',
  },
  faqs: EN_FAQS,
  gallery: {
    heading: '{venue} gallery', posterTitle: '{event} event poster', posterAlt: '{event} at {venue}',
    moodTitles: ['Venue entrance', 'Venue lounge', 'Venue party room', 'Venue interior'], moodAlts: ['{venue} entrance', '{venue} lounge', '{venue} party room', '{venue} interior'],
  },
  eventbrite: {
    contactsTitle: 'Contacts and booking', buyTickets: 'Buy tickets', bookTable: 'Book a table', fullGuide: 'Full event guide, programme and FAQ', importantTitle: 'Important', importantBody: 'Eventbrite registrations are information requests only and do not provide entry on their own.', programmeTitle: 'Programme', offersTitle: 'Offers and prices', faqTitle: 'FAQ', seoLabel: 'SEO keywords', ticketName: 'RESERVATION TICKET - PAY AT THE DOOR - NOT FREE', ticketDescription: 'This listing is a reservation request, not a ticket purchase. Contact Nightlife Milan on WhatsApp {phone} to confirm your booking.',
  },
  seoKeywords: [
    'Milan nightlife', 'nightlife Milan', 'best clubs in Milan', '{venue}', '{event}',
    'guest list Milan', 'VIP table Milan', 'bottle service Milan', 'aperitivo Milan', '{area}',
    'Milan nightclub entry', 'Milan club prices', 'where to go out in Milan', 'Milan nightlife concierge',
    '{event} {date}', '{event} tickets Milan', 'VIP club Milan', 'Milan club dress code',
    'international nightlife Milan', 'house music Milan', 'hip hop Milan', 'reggaeton Milan',
    'EDM Milan', 'late night Milan', '{genres}',
  ],
} satisfies EventLocalePack;

export const EVENT_LOCALE_PACK_IT = {
  locale: 'it',
  titleTemplate: '{venue}: {event} - {date}',
  summaryTemplate: '{venue}: {event}, {date}, {start}-{end}. WhatsApp {phone}.',
  sectionTitles: { experience: 'La serata', booking: 'Biglietti e tavoli', access: 'Ingresso e dress code' },
  experienceBodies: {
    club: '{venue} ospita {event} dalle {start} alle {end} in {area}, con {genres}. {guestSentence}',
    match: '{venue} trasmette {event} dalle {start} alle {end}, con schermi, audio e DJ set prima, durante e dopo la partita.',
    showcase: '{venue} ospita {event} dalle {start} alle {end}. {guestSentence} Musica: {genres}.',
    afterparty: '{event} va in scena al {venue} dalle {start} alle {end}, con {genres}.',
  },
  bookingBody: 'Le formule pubblicate partono da EUR {lowestPrice}. Usa il link ufficiale o WhatsApp {phone} per la disponibilita attuale.',
  accessBody: '{venue} si trova in {area}. Ingresso {minAge}+. {dressCode}',
  programme: {
    aperitif: 'Aperitivo buffet e cocktail premium', aperitifDinner: 'Aperitivo buffet e cena su prenotazione', clubMixed: '{event}: {genres}', clubHouseLatin: '{event}: {genres}',
    matchAndDj: 'Diretta della partita, intervallo e DJ set dopo il match', showcase: 'DJ set {event}: {specialGuests}', afterpartyArrival: 'Apertura porte e controllo dress code', afterpartyPeak: '{genres} fino alla chiusura', closing: 'Set di chiusura',
  },
  offers: {
    aperitifOneDrink: 'Aperitivo + 1 drink', aperitifTwoDrinks: 'Aperitivo + 2 drink', aperitifOpenWine: 'Aperitivo + vino illimitato', clubOneDrink: 'Club + 1 drink', clubTwoDrinks: 'Ingresso + 2 drink', womanOneDrink: 'Donna + 1 drink',
    danceFloorTable: 'Tavolo dance floor', priveDanceFloorTable: 'Tavolo prive dance floor', vipAreaTable: 'Tavolo area VIP', superVipBackLineTable: 'Tavolo Super VIP - back line', superVipFrontLineTable: 'Tavolo Super VIP - front line', djTable: 'Tavolo DJ', priveAriaTable: 'Tavolo prive Aria', priveDjTable: 'Tavolo prive DJ', priveBalconyTable: 'Tavolo prive balconata', vipPriveTable: 'Tavolo VIP prive',
  },
  faqs: IT_FAQS,
  gallery: {
    heading: 'Gallery di {venue}', posterTitle: 'Locandina di {event}', posterAlt: '{event} al {venue}',
    moodTitles: ['Ingresso del locale', 'Lounge del locale', 'Sala della serata', 'Interno del locale'], moodAlts: ['Ingresso di {venue}', 'Lounge di {venue}', 'Sala della serata al {venue}', 'Interno di {venue}'],
  },
  eventbrite: {
    contactsTitle: 'Contatti e prenotazioni', buyTickets: 'Acquista biglietti', bookTable: 'Prenota un tavolo', fullGuide: 'Guida completa, programma e FAQ', importantTitle: 'Importante', importantBody: 'Le registrazioni Eventbrite sono richieste di informazioni e non valgono da sole come ingresso.', programmeTitle: 'Programma', offersTitle: 'Formule e prezzi', faqTitle: 'FAQ', seoLabel: 'Parole chiave SEO', ticketName: 'RICHIESTA DI PRENOTAZIONE - PAGA ALLA PORTA - NON GRATUITA', ticketDescription: 'Questa pagina e una richiesta di prenotazione, non un acquisto di biglietto. Contatta Nightlife Milan su WhatsApp {phone} per confermare.',
  },
  seoKeywords: [
    'vita notturna Milano', 'nightlife Milano', 'migliori discoteche Milano', 'discoteche Milano', '{venue}',
    '{event}', 'lista ospiti Milano', 'tavolo VIP Milano', 'servizio bottiglie Milano', 'aperitivo Milano',
    '{area}', 'ingresso discoteca Milano', 'prezzi discoteche Milano', 'dove uscire a Milano',
    'concierge nightlife Milano', '{event} {date}', 'biglietti {event} Milano', 'club VIP Milano',
    'dress code discoteche Milano', 'serate internazionali Milano', 'musica house Milano',
    'hip hop Milano', 'reggaeton Milano', 'EDM Milano', '{genres}',
  ],
} satisfies EventLocalePack;

export const EVENT_LOCALE_PACKS = {
  en: EVENT_LOCALE_PACK_EN,
  it: EVENT_LOCALE_PACK_IT,
} as const;
