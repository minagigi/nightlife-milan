/**
 * Verified Xceed source package for the remaining July 20 week events.
 *
 * This is deliberately independent from the historical Eventbrite batch: it is
 * the API publisher's single source of truth for the Jul 21--26 rollout.  The
 * Just Me Guè date (Jul 25) and every Bad Bunny record are intentionally absent.
 */

export const WEEKLY_JULY20_PHONE = '+39 351 912 7047';
export const WEEKLY_JULY20_VISUAL_ROOT = '/images/events/generated/weekly-2026-07-20';

export type WeeklyLocale = 'en' | 'it';
export type WeeklyOffer = { name: string; price: number; currency: 'EUR' };
export type WeeklyFaq = { question: string; answer: string };
export type WeeklyLocalizedPayload = {
  titles: [string, string, string, string, string, string, string, string, string, string];
  summary: string;
  answerFirst: string;
  contacts: string[];
  programme: readonly { start: string; title: string }[];
  sections: { target: string; dress: string; mood: string; music: string; location: string; offers: string; nonAdmission: string };
  faqs: [WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq, WeeklyFaq];
  seoClosing: string;
  keywordPermutations: [string, string, string, string, string, string, string, string, string, string];
  ticket: { name: string; description: string };
  confirmation: { heading: string; details: string };
};

export type WeeklyJuly20BatchEvent = {
  eventKey: string;
  xceedId: string;
  venueId: 'v-justme' | 'v-aria' | 'v-pineta';
  /** Empty when the publisher must resolve by normalized venue name + address. */
  venueEventbriteId: string;
  name: { en: string; it: string };
  startUtc: string;
  endUtc: string;
  doorTimeISO?: string;
  affiliateUrl: string;
  ageRestriction: '18+' | '21+';
  dressCode: { en: string; it: string };
  genres: { en: string; it: string };
  offers: readonly WeeklyOffer[];
  visualAssets: Record<WeeklyLocale, { cover: string; body: [string, string, string, string, string] }>;
  localized: Record<WeeklyLocale, WeeklyLocalizedPayload>;
};

type Source = Omit<WeeklyJuly20BatchEvent, 'visualAssets' | 'localized'> & {
  dateEn: string;
  dateIt: string;
  venueName: { en: string; it: string };
  location: { en: string; it: string };
  eventLabel: { en: string; it: string };
};

const offers = (rows: readonly [string, number][]): readonly WeeklyOffer[] => rows.map(([name, price]) => ({ name, price, currency: 'EUR' }));
const money = (value: number) => `EUR ${value}`;
const textOfferList = (rows: readonly WeeklyOffer[]) => rows.map((row) => `${row.name}: ${money(row.price)}`).join('; ');

function visuals(eventKey: string): Record<WeeklyLocale, { cover: string; body: [string, string, string, string, string] }> {
  const root = WEEKLY_JULY20_VISUAL_ROOT;
  const body = (locale: WeeklyLocale) => [
    `${root}/${eventKey}-${locale}-poster-5x4-v3.png`,
    `${root}/${eventKey}-mood-1-5x4-v3.png`,
    `${root}/${eventKey}-mood-2-5x4-v3.png`,
    `${root}/${eventKey}-mood-3-5x4-v3.png`,
    `${root}/${eventKey}-mood-4-5x4-v3.png`,
  ] as [string, string, string, string, string];
  return {
    en: { cover: `${root}/${eventKey}-en-cover-2x1-v3.png`, body: body('en') },
    it: { cover: `${root}/${eventKey}-it-cover-2x1-v3.png`, body: body('it') },
  };
}

function variants(source: Source, locale: WeeklyLocale): [string, string, string, string, string, string, string, string, string, string] {
  const event = source.eventLabel[locale];
  const venue = source.venueName[locale];
  const date = locale === 'en' ? source.dateEn : source.dateIt;
  const city = locale === 'en' ? 'Milan' : 'Milano';
  const pre = locale === 'en'
    ? [`${event} at ${venue} | ${date}`, `${venue} ${event} ${date}`, `${event} ${city} tickets | ${venue}`, `${venue} table booking | ${event}`, `${event} nightlife in ${city}`, `${event} aperitivo and club | ${venue}`, `${event} VIP table ${city}`, `${event} guest information | ${venue}`, `${venue} club night ${date}`, `${event} ${venue} ${city} night out`]
    : [`${event} al ${venue} | ${date}`, `${venue} ${event} ${date}`, `${event} ${city} biglietti | ${venue}`, `${venue} prenota tavolo | ${event}`, `${event} nightlife ${city}`, `${event} aperitivo e club | ${venue}`, `${event} tavolo VIP ${city}`, `${event} informazioni ingresso | ${venue}`, `${venue} serata club ${date}`, `${event} ${city} serata`];
  return pre as [string, string, string, string, string, string, string, string, string, string];
}

function faqs(source: Source, locale: WeeklyLocale): WeeklyLocalizedPayload['faqs'] {
  const event = source.eventLabel[locale]; const venue = source.venueName[locale];
  const date = locale === 'en' ? source.dateEn : source.dateIt;
  const genre = source.genres[locale]; const offersText = textOfferList(source.offers);
  const isEn = locale === 'en';
  const rows: WeeklyFaq[] = isEn ? [
    { question: `What is ${event}?`, answer: `${event} is the published ${date} event at ${venue}, running from ${source.startUtc.slice(11, 16)} UTC to ${source.endUtc.slice(11, 16)} UTC.` },
    { question: `Where is ${venue}?`, answer: source.location.en },
    { question: `When is ${event}?`, answer: `The verified Xceed date is ${date}.` },
    { question: 'What time does it start?', answer: `The verified event start is ${source.startUtc.slice(11, 16)} UTC (19:30 in Milan).` },
    { question: 'What time does it finish?', answer: `The verified event end is ${source.endUtc.slice(11, 16)} UTC (05:00 in Milan).` },
    { question: 'What is the minimum age?', answer: `The published minimum age is ${source.ageRestriction}; bring valid photo ID.` },
    { question: 'What is the dress code?', answer: source.dressCode.en },
    { question: 'What music is announced?', answer: `The published music genres are ${genre}.` },
    { question: 'Is there an aperitivo?', answer: 'The official event description opens with a buffet aperitif and premium cocktails from the evening start.' },
    { question: 'Is dinner included?', answer: 'A served dinner may be requested; it is not included unless the selected offer explicitly says so.' },
    { question: 'What offers are published?', answer: offersText },
    { question: 'How do I buy the actual ticket?', answer: `Use only the verified Nightlife Milan Xceed link: ${source.affiliateUrl}` },
    { question: 'Is an Eventbrite registration an admission ticket?', answer: 'No. It is an information registration and does not grant entry.' },
    { question: 'What should I do after purchase?', answer: `Send the Xceed purchase confirmation to WhatsApp ${WEEKLY_JULY20_PHONE}, with your name and group size.` },
    { question: 'Can I book a table?', answer: `Yes. Choose a currently listed table option on Xceed or contact WhatsApp ${WEEKLY_JULY20_PHONE}.` },
    { question: 'Can I reserve VIP?', answer: 'Use the current Xceed offer list; VIP availability is confirmed only at purchase or by the booking team.' },
    { question: 'Can a group book together?', answer: `Yes. Send date, event name, group size and preferred option to ${WEEKLY_JULY20_PHONE}.` },
    { question: 'Can I arrive later?', answer: 'Confirm the chosen entry formula and its current availability before arriving.' },
    { question: 'Is there a queue benefit online?', answer: 'The official source says an online ticket or table can secure entry and skip the queue, subject to venue conditions.' },
    { question: 'Are online tickets refundable?', answer: 'The published policy says tickets are non-refundable except if entry is denied by the club, with requests made by 05:00 on the event morning.' },
    { question: 'Is availability guaranteed?', answer: 'No. Availability must be checked on the exact Xceed purchase page at the time of booking.' },
    { question: 'What should I wear?', answer: source.dressCode.en },
    { question: 'Do I need ID?', answer: `Yes. The published minimum age is ${source.ageRestriction}; carry valid photo ID.` },
    { question: 'Where can I ask for help?', answer: `For booking assistance, WhatsApp Nightlife Milan at ${WEEKLY_JULY20_PHONE}.` },
    { question: 'Where is the current source of truth?', answer: `The verified current ticket page is ${source.affiliateUrl}` },
  ] : [
    { question: `Cos'è ${event}?`, answer: `${event} è l'evento pubblicato per ${date} al ${venue}, dalle ${source.startUtc.slice(11, 16)} UTC alle ${source.endUtc.slice(11, 16)} UTC.` },
    { question: `Dove si trova ${venue}?`, answer: source.location.it },
    { question: `Quando c'è ${event}?`, answer: `La data Xceed verificata è ${date}.` },
    { question: 'A che ora inizia?', answer: `L'inizio verificato è ${source.startUtc.slice(11, 16)} UTC, cioè 19:30 a Milano.` },
    { question: 'A che ora finisce?', answer: `La fine verificata è ${source.endUtc.slice(11, 16)} UTC, cioè 05:00 a Milano.` },
    { question: "Qual è l'età minima?", answer: `L'età minima pubblicata è ${source.ageRestriction}; porta un documento con foto valido.` },
    { question: 'Qual è il dress code?', answer: source.dressCode.it },
    { question: 'Che musica è annunciata?', answer: `I generi musicali pubblicati sono ${genre}.` },
    { question: "È previsto l'aperitivo?", answer: "La descrizione ufficiale apre con aperitivo buffet e cocktail premium dall'inizio della serata." },
    { question: 'La cena è inclusa?', answer: 'La cena servita può essere richiesta; non è inclusa salvo indicazione esplicita nella formula scelta.' },
    { question: 'Quali formule sono pubblicate?', answer: offersText },
    { question: 'Come compro il vero biglietto?', answer: `Usa solo il link Xceed Nightlife Milan verificato: ${source.affiliateUrl}` },
    { question: 'La registrazione Eventbrite vale come ingresso?', answer: "No. È una registrazione informativa e non dà diritto all'ingresso." },
    { question: "Cosa faccio dopo l'acquisto?", answer: `Invia la conferma di acquisto Xceed su WhatsApp al ${WEEKLY_JULY20_PHONE}, con nome e numero di persone.` },
    { question: 'Posso prenotare un tavolo?', answer: `Sì. Scegli una formula tavolo attualmente pubblicata su Xceed o contatta WhatsApp ${WEEKLY_JULY20_PHONE}.` },
    { question: 'Posso prenotare il VIP?', answer: "Usa la lista offerte Xceed aggiornata; la disponibilità VIP è confermata solo all'acquisto o dal booking." },
    { question: 'Un gruppo può prenotare insieme?', answer: `Sì. Invia data, nome evento, numero di persone e formula preferita al ${WEEKLY_JULY20_PHONE}.` },
    { question: 'Posso arrivare più tardi?', answer: "Conferma prima dell'arrivo la formula scelta e la disponibilità aggiornata." },
    { question: "L'acquisto online dà un vantaggio in coda?", answer: "La fonte ufficiale indica che biglietto o tavolo online possono garantire l'ingresso e saltare la coda, secondo le condizioni del locale." },
    { question: 'I biglietti online sono rimborsabili?', answer: "La policy pubblicata dice che non sono rimborsabili, salvo ingresso negato dal club e richiesta entro le 05:00 della mattina dell'evento." },
    { question: 'La disponibilità è garantita?', answer: 'No. Va verificata sul link Xceed esatto al momento della prenotazione.' },
    { question: 'Come mi devo vestire?', answer: source.dressCode.it },
    { question: 'Serve un documento?', answer: `Sì. L'età minima pubblicata è ${source.ageRestriction}; porta un documento con foto valido.` },
    { question: 'Dove chiedo assistenza?', answer: `Per assistenza alle prenotazioni, scrivi a Nightlife Milan su WhatsApp ${WEEKLY_JULY20_PHONE}.` },
    { question: 'Qual è la fonte aggiornata?', answer: `La pagina biglietti verificata è ${source.affiliateUrl}` },
  ];
  return rows as WeeklyLocalizedPayload['faqs'];
}

function localized(source: Source, locale: WeeklyLocale): WeeklyLocalizedPayload {
  const event = source.eventLabel[locale]; const venue = source.venueName[locale]; const date = locale === 'en' ? source.dateEn : source.dateIt;
  const isEn = locale === 'en'; const titleSet = variants(source, locale);
  const summary = isEn
    ? `${event} at ${venue}, Milan — ${date}. Booking: ${WEEKLY_JULY20_PHONE}.`
    : `${event} al ${venue}, Milano — ${date}. Prenotazioni: ${WEEKLY_JULY20_PHONE}.`;
  if (summary.length > 140) throw new Error(`${source.eventKey}/${locale} summary exceeds Eventbrite limit`);
  const formats = textOfferList(source.offers);
  const contacts = isEn
    ? [`Tickets: ${source.affiliateUrl}`, `VIP tables and bookings: WhatsApp ${WEEKLY_JULY20_PHONE}`, `After purchase, send the Xceed confirmation on WhatsApp.`, 'Eventbrite registration is not an admission ticket.']
    : [`Biglietti: ${source.affiliateUrl}`, `Tavoli VIP e prenotazioni: WhatsApp ${WEEKLY_JULY20_PHONE}`, `Dopo l'acquisto invia la conferma Xceed su WhatsApp.`, "La registrazione Eventbrite non vale come biglietto d'ingresso."];
  const programme = isEn
    ? [{ start: '19:30', title: 'Buffet aperitif and premium cocktails' }, { start: 'After aperitif', title: `Club programme with ${source.genres.en}` }, { start: '05:00', title: 'Published event end' }]
    : [{ start: '19:30', title: 'Aperitivo buffet e cocktail premium' }, { start: 'Dopo l’aperitivo', title: `Programma club con ${source.genres.it}` }, { start: '05:00', title: 'Fine evento pubblicata' }];
  const target = isEn ? `For adults aged ${source.ageRestriction} who want the verified ${event} programme at ${venue}; group and table requests are handled through the official booking route.` : `Per adulti ${source.ageRestriction} interessati al programma verificato ${event} al ${venue}; richieste gruppi e tavoli passano dal booking ufficiale.`;
  const sections = isEn ? {
    target, dress: source.dressCode.en, mood: 'Aperitif followed by a club programme; the exact experience is determined by the selected official offer.', music: source.genres.en,
    location: source.location.en, offers: formats, nonAdmission: 'Eventbrite registration is an information request only. It is not an admission ticket; purchase via the exact Xceed link and send confirmation on WhatsApp.',
  } : {
    target, dress: source.dressCode.it, mood: 'Aperitivo seguito dal programma club; l’esperienza esatta dipende dalla formula ufficiale scelta.', music: source.genres.it,
    location: source.location.it, offers: formats, nonAdmission: 'La registrazione Eventbrite è solo una richiesta informativa. Non è un biglietto: acquista dal link Xceed esatto e invia la conferma su WhatsApp.',
  };
  const keywordPermutations = (isEn
    ? [`${event} tickets ${venue}`, `${event} Milan tickets`, `${venue} VIP table ${date}`, `${event} table booking Milan`, `${venue} nightlife ${date}`, `${event} aperitivo Milan`, `${event} club entry ${venue}`, `${venue} guest information`, `${event} ${source.genres.en} Milan`, `Milan nightlife ${event}`]
    : [`${event} biglietti ${venue}`, `${event} Milano biglietti`, `${venue} tavolo VIP ${date}`, `${event} prenota tavolo Milano`, `${venue} nightlife ${date}`, `${event} aperitivo Milano`, `${event} ingresso club ${venue}`, `${venue} informazioni ingresso`, `${event} ${source.genres.it} Milano`, `nightlife Milano ${event}`]) as [string, string, string, string, string, string, string, string, string, string];
  const seoClosing = isEn
    ? `Plan ${event} in Milan with the exact official Xceed purchase route, verified age and dress rules, and a WhatsApp confirmation step for your group.`
    : `Organizza ${event} a Milano dal percorso di acquisto Xceed ufficiale, con età e dress code verificati e conferma su WhatsApp per il tuo gruppo.`;
  return {
    titles: titleSet, summary,
    answerFirst: isEn ? `${event} takes place at ${venue} on ${date}, from 19:30 to 05:00 Milan time. Buy through the verified Xceed link; Eventbrite registration is not admission.` : `${event} si svolge al ${venue} ${date}, dalle 19:30 alle 05:00 ora di Milano. Acquista dal link Xceed verificato; la registrazione Eventbrite non è un ingresso.`,
    contacts, programme, sections, faqs: faqs(source, locale), seoClosing, keywordPermutations,
    ticket: isEn ? { name: `Information registration — ${event}`, description: `This Eventbrite registration is not admission. Buy only at ${source.affiliateUrl} and send purchase confirmation to WhatsApp ${WEEKLY_JULY20_PHONE}.` } : { name: `Registrazione informativa — ${event}`, description: `Questa registrazione Eventbrite non è un ingresso. Acquista solo su ${source.affiliateUrl} e invia la conferma su WhatsApp ${WEEKLY_JULY20_PHONE}.` },
    confirmation: isEn ? { heading: `${event}: complete your ticket purchase`, details: `This Eventbrite registration is not an admission ticket. Complete purchase only here: ${source.affiliateUrl}. Then send the Xceed confirmation to WhatsApp ${WEEKLY_JULY20_PHONE}.` } : { heading: `${event}: completa l'acquisto del biglietto`, details: `Questa registrazione Eventbrite non è un biglietto d'ingresso. Completa l'acquisto solo qui: ${source.affiliateUrl}. Poi invia la conferma Xceed su WhatsApp ${WEEKLY_JULY20_PHONE}.` },
  };
}

const DATA: readonly Source[] = [
  { eventKey: 'justme-university-2026-07-21', xceedId: '220720', venueId: 'v-justme', venueEventbriteId: '295950971', name: { en: 'University Party', it: 'University Party' }, eventLabel: { en: 'University Party', it: 'University Party' }, venueName: { en: 'Just Me Milano', it: 'Just Me Milano' }, location: { en: 'Just Me Milano, Viale Luigi Camoens 2, Parco Sempione, Milan.', it: 'Just Me Milano, Viale Luigi Camoens 2, Parco Sempione, Milano.' }, dateEn: 'Tuesday, July 21, 2026', dateIt: 'Martedì 21 luglio 2026', startUtc: '2026-07-21T17:30:00Z', endUtc: '2026-07-22T03:00:00Z', doorTimeISO: '2026-07-21T17:30:00Z', affiliateUrl: 'https://xceed.me/en/milano/event/university-party-42/220720/channel/nightlifemilan-1', ageRestriction: '18+', dressCode: { en: 'Elegant dress code; long trousers required for men.', it: 'Dress code elegante; pantaloni lunghi obbligatori per gli uomini.' }, genres: { en: 'House, hip-hop, hits, EDM and reggaeton', it: 'House, hip-hop, hit, EDM e reggaeton' }, offers: offers([['Dance Floor Table', 200], ['Dance Floor Table', 640], ['VIP Area Table', 960], ['Pink Pass [Girls Only]', 0], ['Early Bird [Aperitif + 2 Drinks]', 13], ['Club + 2 Drinks', 15]]) },
  { eventKey: 'justme-wednesday-2026-07-22', xceedId: '220733', venueId: 'v-justme', venueEventbriteId: '295950971', name: { en: 'Wednesday Night', it: 'Wednesday Night' }, eventLabel: { en: 'Wednesday Night', it: 'Wednesday Night' }, venueName: { en: 'Just Me Milano', it: 'Just Me Milano' }, location: { en: 'Just Me Milano, Viale Luigi Camoens 2, Parco Sempione, Milan.', it: 'Just Me Milano, Viale Luigi Camoens 2, Parco Sempione, Milano.' }, dateEn: 'Wednesday, July 22, 2026', dateIt: 'Mercoledì 22 luglio 2026', startUtc: '2026-07-22T17:30:00Z', endUtc: '2026-07-23T03:00:00Z', doorTimeISO: '2026-07-22T17:30:00Z', affiliateUrl: 'https://xceed.me/en/milano/event/wednesday-night-215/220733/channel/nightlifemilan-1', ageRestriction: '21+', dressCode: { en: 'Elegant dress code; long trousers required for men.', it: 'Dress code elegante; pantaloni lunghi obbligatori per gli uomini.' }, genres: { en: 'House, hip-hop, hits, EDM and reggaeton', it: 'House, hip-hop, hit, EDM e reggaeton' }, offers: offers([['Dance Floor Table', 320], ['VIP Area Table', 640], ['Super VIP Area Table [Back Line]', 1280], ['Super VIP Area Table [Front Line]', 3200], ['DJ Table', 5000], ['Aperitif + 1 Drink', 15], ['Club + 1 Drink', 15]]) },
  { eventKey: 'justme-thursday-2026-07-23', xceedId: '220746', venueId: 'v-justme', venueEventbriteId: '295950971', name: { en: 'Thursday Night', it: 'Thursday Night' }, eventLabel: { en: 'Thursday Night', it: 'Thursday Night' }, venueName: { en: 'Just Me Milano', it: 'Just Me Milano' }, location: { en: 'Just Me Milano, Viale Luigi Camoens 2, Parco Sempione, Milan.', it: 'Just Me Milano, Viale Luigi Camoens 2, Parco Sempione, Milano.' }, dateEn: 'Thursday, July 23, 2026', dateIt: 'Giovedì 23 luglio 2026', startUtc: '2026-07-23T17:30:00Z', endUtc: '2026-07-24T03:00:00Z', doorTimeISO: '2026-07-23T17:30:00Z', affiliateUrl: 'https://xceed.me/en/milano/event/thursday-night-349/220746/channel/nightlifemilan-1', ageRestriction: '21+', dressCode: { en: 'Elegant dress code; long trousers required for men.', it: 'Dress code elegante; pantaloni lunghi obbligatori per gli uomini.' }, genres: { en: 'House, hip-hop, hits, EDM and reggaeton', it: 'House, hip-hop, hit, EDM e reggaeton' }, offers: offers([['Dance Floor Table', 320], ['VIP Area Table', 640], ['Super VIP Area Table [Back Line]', 1280], ['Super VIP Area Table [Front Line]', 3200], ['DJ Table', 5000], ['Aperitif + 1 Drink', 15], ['Club + 1 Drink', 15]]) },
  { eventKey: 'justme-friday-2026-07-24', xceedId: '220759', venueId: 'v-justme', venueEventbriteId: '295950971', name: { en: 'Friday Night', it: 'Friday Night' }, eventLabel: { en: 'Friday Night', it: 'Friday Night' }, venueName: { en: 'Just Me Milano', it: 'Just Me Milano' }, location: { en: 'Just Me Milano, Viale Luigi Camoens 2, Parco Sempione, Milan.', it: 'Just Me Milano, Viale Luigi Camoens 2, Parco Sempione, Milano.' }, dateEn: 'Friday, July 24, 2026', dateIt: 'Venerdì 24 luglio 2026', startUtc: '2026-07-24T17:30:00Z', endUtc: '2026-07-25T03:00:00Z', doorTimeISO: '2026-07-24T17:30:00Z', affiliateUrl: 'https://xceed.me/en/milano/event/friday-night-669/220759/channel/nightlifemilan-1', ageRestriction: '21+', dressCode: { en: 'Elegant dress code; long trousers required for men.', it: 'Dress code elegante; pantaloni lunghi obbligatori per gli uomini.' }, genres: { en: 'House, hip-hop, hits, EDM and reggaeton', it: 'House, hip-hop, hit, EDM e reggaeton' }, offers: offers([['Dance Floor Table', 320], ['VIP Area Table', 640], ['Super VIP Area Table [Back Line]', 1280], ['Super VIP Area Table [Front Line]', 3200], ['DJ Table', 5000], ['Aperitif + 1 Drink', 15], ['Club + 1 Drink', 20]]) },
  { eventKey: 'aria-friday-2026-07-24', xceedId: '229417', venueId: 'v-aria', venueEventbriteId: '298620553', name: { en: 'Friday Night', it: 'Friday Night' }, eventLabel: { en: 'Friday Night', it: 'Friday Night' }, venueName: { en: 'Aria Club Milano', it: 'Aria Club Milano' }, location: { en: 'Aria Club Milano, Piazzale dello Sport 14, Milan.', it: 'Aria Club Milano, Piazzale dello Sport 14, Milano.' }, dateEn: 'Friday, July 24, 2026', dateIt: 'Venerdì 24 luglio 2026', startUtc: '2026-07-24T17:30:00Z', endUtc: '2026-07-25T03:00:00Z', doorTimeISO: '2026-07-24T17:30:00Z', affiliateUrl: 'https://xceed.me/en/milano/event/friday-night-701/229417/channel/nightlifemilan-1', ageRestriction: '18+', dressCode: { en: 'Elegant dress code; long trousers required for men.', it: 'Dress code elegante; pantaloni lunghi obbligatori per gli uomini.' }, genres: { en: 'Hip-hop, dance, reggaeton, hits and EDM', it: 'Hip-hop, dance, reggaeton, hit ed EDM' }, offers: offers([['Dance Floor Table', 200], ['Prive Aria Table', 500], ['Prive DJ Table', 600], ['Aperitif + 1 Drink', 15], ['Ticket + 1 Drink', 20]]) },
  { eventKey: 'pineta-friday-2026-07-24', xceedId: '220811', venueId: 'v-pineta', venueEventbriteId: '298620677', name: { en: 'Friday Night', it: 'Friday Night' }, eventLabel: { en: 'Friday Night', it: 'Friday Night' }, venueName: { en: 'Pineta Club Milano', it: 'Pineta Club Milano' }, location: { en: 'Pineta Club Milano, Via Messina 38, Milan.', it: 'Pineta Club Milano, Via Messina 38, Milano.' }, dateEn: 'Friday, July 24, 2026', dateIt: 'Venerdì 24 luglio 2026', startUtc: '2026-07-24T17:30:00Z', endUtc: '2026-07-25T03:00:00Z', doorTimeISO: '2026-07-24T17:30:00Z', affiliateUrl: 'https://xceed.me/en/milano/event/friday-night-689/220811/channel/nightlifemilan-1', ageRestriction: '18+', dressCode: { en: 'Elegant dress code; long trousers required for men.', it: 'Dress code elegante; pantaloni lunghi obbligatori per gli uomini.' }, genres: { en: 'House, hip-hop and reggaeton', it: 'House, hip-hop e reggaeton' }, offers: offers([['Dance Floor Table', 250], ['Prive Dance Floor Table', 300], ['Prive Balcony Table', 750], ['VIP Prive Table', 1200], ['Aperitif + 1 Drink', 15], ['Ticket + 2 Drinks', 15], ['Aperitif + Open Wine', 20]]) },
  { eventKey: 'aria-saturday-2026-07-25', xceedId: '229437', venueId: 'v-aria', venueEventbriteId: '298620553', name: { en: 'Saturday Night', it: 'Saturday Night' }, eventLabel: { en: 'Saturday Night', it: 'Saturday Night' }, venueName: { en: 'Aria Club Milano', it: 'Aria Club Milano' }, location: { en: 'Aria Club Milano, Piazzale dello Sport 14, Milan.', it: 'Aria Club Milano, Piazzale dello Sport 14, Milano.' }, dateEn: 'Saturday, July 25, 2026', dateIt: 'Sabato 25 luglio 2026', startUtc: '2026-07-25T17:30:00Z', endUtc: '2026-07-26T03:00:00Z', doorTimeISO: '2026-07-25T17:30:00Z', affiliateUrl: 'https://xceed.me/en/milano/event/saturday-night-721/229437/channel/nightlifemilan-1', ageRestriction: '18+', dressCode: { en: 'Elegant dress code; long trousers required for men.', it: 'Dress code elegante; pantaloni lunghi obbligatori per gli uomini.' }, genres: { en: 'Hip-hop, dance, reggaeton, hits and EDM', it: 'Hip-hop, dance, reggaeton, hit ed EDM' }, offers: offers([['Dance Floor Table', 200], ['Prive Aria Table', 500], ['Prive DJ Table', 600], ['Aperitif + 1 Drink', 15], ['Man + 1 Drink', 20], ['Woman + 1 Drink', 15]]) },
  { eventKey: 'pineta-saturday-2026-07-25', xceedId: '220835', venueId: 'v-pineta', venueEventbriteId: '298620677', name: { en: 'Saturday Night', it: 'Saturday Night' }, eventLabel: { en: 'Saturday Night', it: 'Saturday Night' }, venueName: { en: 'Pineta Club Milano', it: 'Pineta Club Milano' }, location: { en: 'Pineta Club Milano, Via Messina 38, Milan.', it: 'Pineta Club Milano, Via Messina 38, Milano.' }, dateEn: 'Saturday, July 25, 2026', dateIt: 'Sabato 25 luglio 2026', startUtc: '2026-07-25T17:30:00Z', endUtc: '2026-07-26T03:00:00Z', doorTimeISO: '2026-07-25T17:30:00Z', affiliateUrl: 'https://xceed.me/en/milano/event/saturday-night-707/220835/channel/nightlifemilan-1', ageRestriction: '18+', dressCode: { en: 'Elegant dress code; long trousers required for men.', it: 'Dress code elegante; pantaloni lunghi obbligatori per gli uomini.' }, genres: { en: 'House, hip-hop and reggaeton', it: 'House, hip-hop e reggaeton' }, offers: offers([['Dance Floor Table', 250], ['Prive Dance Floor Table', 300], ['Prive Balcony Table', 750], ['VIP Prive Table', 1200], ['Aperitif + 1 Drink', 15], ['Ticket + 2 Drinks', 15], ['Aperitif + Open Wine', 20]]) },
  { eventKey: 'justme-sunday-2026-07-26', xceedId: '220785', venueId: 'v-justme', venueEventbriteId: '295950971', name: { en: 'Sunday Night', it: 'Sunday Night' }, eventLabel: { en: 'Sunday Night', it: 'Sunday Night' }, venueName: { en: 'Just Me Milano', it: 'Just Me Milano' }, location: { en: 'Just Me Milano, Viale Luigi Camoens 2, Parco Sempione, Milan.', it: 'Just Me Milano, Viale Luigi Camoens 2, Parco Sempione, Milano.' }, dateEn: 'Sunday, July 26, 2026', dateIt: 'Domenica 26 luglio 2026', startUtc: '2026-07-26T17:30:00Z', endUtc: '2026-07-27T03:00:00Z', doorTimeISO: '2026-07-26T17:30:00Z', affiliateUrl: 'https://xceed.me/en/milano/event/sunday-night-214/220785/channel/nightlifemilan-1', ageRestriction: '21+', dressCode: { en: 'Elegant dress code; long trousers required for men.', it: 'Dress code elegante; pantaloni lunghi obbligatori per gli uomini.' }, genres: { en: 'House, hip-hop, hits, EDM and reggaeton', it: 'House, hip-hop, hit, EDM e reggaeton' }, offers: offers([['Dance Floor Table', 320], ['VIP Area Table', 640], ['Super VIP Area Table [Back Line]', 1280], ['Super VIP Area Table [Front Line]', 3200], ['DJ Table', 5000], ['Aperitif + 1 Drink', 15], ['Club + 1 Drink', 15]]) },
];

export const WEEKLY_JULY20_BATCH_EVENTS: readonly WeeklyJuly20BatchEvent[] = DATA.map((source) => ({
  eventKey: source.eventKey, xceedId: source.xceedId, venueId: source.venueId, venueEventbriteId: source.venueEventbriteId,
  name: source.name, startUtc: source.startUtc, endUtc: source.endUtc, doorTimeISO: source.doorTimeISO,
  affiliateUrl: source.affiliateUrl, ageRestriction: source.ageRestriction, dressCode: source.dressCode,
  genres: source.genres, offers: source.offers, visualAssets: visuals(source.eventKey),
  localized: { en: localized(source, 'en'), it: localized(source, 'it') },
}));
