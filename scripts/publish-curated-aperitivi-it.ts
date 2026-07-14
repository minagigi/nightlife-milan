import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { scoutXceedEvents, type XceedEvent } from '../lib/xceedScout';
import { publishOneLang } from '../lib/eventPublisher';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const PHONE = '+39 351 912 7047';
const SITE_URL = 'https://nightlifemilan.com';
const AFFILIATE_RE = /^https:\/\/xceed\.me\/en\/milano\/event\/[^/]+\/(\d+)\/channel\/nightlifemilan-1$/;
const GENERIC_EVENT_RE = /^(friday night|saturday night|sunday night|monday night|tuesday night|wednesday night|thursday night)$/i;

type Args = {
  execute: boolean;
  date: string;
  weekEnd: string;
  updateEventId?: string;
};

type CuratedEvent = XceedEvent & {
  localDate: string;
  venueName: string;
};

type Faq = { question: string; answer: string };

function parseArgs(argv: string[]): Args {
  const values = new Map<string, string>();
  for (const arg of argv) {
    if (arg === '--execute') values.set('execute', '1');
    else if (arg.startsWith('--date=')) values.set('date', arg.slice('--date='.length));
    else if (arg.startsWith('--week-end=')) values.set('weekEnd', arg.slice('--week-end='.length));
    else if (arg.startsWith('--update-event-id=')) values.set('updateEventId', arg.slice('--update-event-id='.length));
    else throw new Error(`Argomento sconosciuto: ${arg}`);
  }
  return {
    execute: values.get('execute') === '1',
    date: values.get('date') || '2026-07-16',
    weekEnd: values.get('weekEnd') || '2026-07-19',
    updateEventId: values.get('updateEventId'),
  };
}

async function loadLocalEnv(): Promise<void> {
  for (const file of ['.env.local', '.env.production.local']) {
    try {
      const raw = await fs.readFile(file, 'utf8');
      for (const line of raw.split(/\r?\n/)) {
        const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
        if (!match || process.env[match[1]]) continue;
        process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
      }
    } catch {
      // The production script may receive its environment directly.
    }
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function localDate(iso: string): string {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso));
}

function dateLabel(dateISO: string): string {
  const label = new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${dateISO}T12:00:00+02:00`));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function dateRangeLabel(from: string, through: string): string {
  const fromDate = new Date(`${from}T12:00:00+02:00`);
  const throughDate = new Date(`${through}T12:00:00+02:00`);
  const fromDay = new Intl.DateTimeFormat('it-IT', { day: 'numeric', timeZone: 'Europe/Rome' }).format(fromDate);
  const throughDay = new Intl.DateTimeFormat('it-IT', { day: 'numeric', timeZone: 'Europe/Rome' }).format(throughDate);
  const throughMonthYear = new Intl.DateTimeFormat('it-IT', { month: 'long', year: 'numeric', timeZone: 'Europe/Rome' }).format(throughDate);
  return `${fromDay}-${throughDay} ${throughMonthYear}`;
}

function venueName(venueId: string): string {
  if (venueId === 'v-justme') return 'Just Me Milano';
  if (venueId === 'v-pineta') return 'Pineta Milano';
  if (venueId === 'v-aria') return 'Aria Club Milano';
  throw new Error(`Locale non previsto: ${venueId}`);
}

function hasAperitif(event: XceedEvent): boolean {
  return event.offers.some((offer) => /aperitif/i.test(offer.name)) || /aperitif/i.test(event.description);
}

function validateAffiliate(event: XceedEvent): void {
  const match = event.affiliateUrl.match(AFFILIATE_RE);
  if (!match || match[1] !== event.xceedId) {
    throw new Error(`Link affiliato non valido per Xceed ${event.xceedId}`);
  }
}

function eventSpecificity(event: XceedEvent): number {
  if (GENERIC_EVENT_RE.test(event.name.trim())) return 0;
  if (/afterparty/i.test(event.name)) return -1;
  return 2;
}

function curate(events: XceedEvent[], from: string, through: string): CuratedEvent[] {
  const eligible = events
    .filter(hasAperitif)
    .map((event) => ({ ...event, localDate: localDate(event.startISO), venueName: venueName(event.venueId) }))
    .filter((event) => event.localDate >= from && event.localDate <= through);

  const bestByVenueDate = new Map<string, CuratedEvent>();
  for (const event of eligible) {
    validateAffiliate(event);
    const key = `${event.localDate}:${event.venueId}`;
    const existing = bestByVenueDate.get(key);
    if (!existing || eventSpecificity(event) > eventSpecificity(existing)) {
      bestByVenueDate.set(key, event);
    }
  }

  const venuePriority: Record<string, number> = { 'v-justme': 0, 'v-pineta': 1, 'v-aria': 2 };
  return [...bestByVenueDate.values()].sort((a, b) =>
    a.localDate.localeCompare(b.localDate) || venuePriority[a.venueId] - venuePriority[b.venueId]
  );
}

function euro(value: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}

function localizedOfferName(name: string): string {
  const exact: Record<string, string> = {
    'Aperitif + 1 Drink': 'Aperitivo + 1 drink',
    'Aperitif + 2 Drinks': 'Aperitivo + 2 drink',
    'Aperitif + 2 Drinks [Early Bird]': 'Aperitivo + 2 drink, tariffa Early Bird',
    'Aperitif + Open Wine': 'Aperitivo + vino illimitato',
    'Dance Floor Table': 'Tavolo in pista',
    'VIP Area Table': 'Tavolo area VIP',
    'Super VIP Area Table [Back Line]': 'Tavolo Super VIP, seconda fila',
    'Super VIP Area Table [Front Line]': 'Tavolo Super VIP, prima fila',
    'DJ Table': 'Tavolo DJ',
    'Prive Aria Table': 'Tavolo privé Aria',
    'Prive DJ Table': 'Tavolo privé DJ',
    'Prive Dance Floor Table': 'Tavolo privé pista',
    'Prive Balcony Table': 'Tavolo privé balconata',
    'VIP Prive Table': 'Tavolo privé VIP',
  };
  return exact[name] || name;
}

function venueArticle(venue: string): string {
  return venue === 'Aria Club Milano' ? "all'Aria Club Milano" : `al ${venue}`;
}

function offerRows(event: CuratedEvent): string {
  const aperitifs = event.offers.filter((offer) => /aperitif/i.test(offer.name));
  const tables = event.offers.filter((offer) => offer.category === 'table');
  const rows = [
    ...aperitifs.map((offer) => `<li>${escapeHtml(localizedOfferName(offer.name))}: <strong>${escapeHtml(euro(offer.price))}</strong></li>`),
    ...tables.map((offer) => `<li>${escapeHtml(localizedOfferName(offer.name))}: <strong>${escapeHtml(euro(offer.price))}</strong></li>`),
  ];
  if (tables.length === 0) {
    rows.push('<li>Tavoli pista, privé e super privé: disponibilità e prezzo da verificare su WhatsApp.</li>');
  }
  return rows.join('');
}

function eventCard(event: CuratedEvent): string {
  const age = event.ageRange || 'da verificare';
  return [
    `<h3>${escapeHtml(event.venueName)} - ${escapeHtml(event.name)}</h3>`,
    `<p><strong>Data:</strong> ${escapeHtml(dateLabel(event.localDate))}. <strong>Orario:</strong> aperitivo dalle 19:30; prosecuzione serale secondo il programma del locale. <strong>Età:</strong> ${escapeHtml(age)}. <strong>Dress code:</strong> ${escapeHtml(/elegant/i.test(event.dressCode || '') ? 'Elegante' : event.dressCode || 'Elegante')}.</p>`,
    `<ul>${offerRows(event)}</ul>`,
    `<p><a href="${escapeHtml(event.affiliateUrl)}">Prenota ${escapeHtml(event.name)} ${escapeHtml(venueArticle(event.venueName))} su Xceed</a></p>`,
  ].join('');
}

const FAQS: readonly Faq[] = [
  { question: 'Dove fare aperitivo a Milano questa settimana?', answer: 'La selezione comprende Just Me Milano, Pineta Milano e Aria Club Milano. Le date e le formule ancora disponibili sono indicate nel programma e vengono aggiornate ogni giorno.' },
  { question: 'Quali sono i migliori aperitivi con DJ set a Milano?', answer: 'Just Me, Pineta e Aria propongono aperitivo seguito da musica e serata. Il programma cambia secondo il giorno: controlla la scheda del locale e il relativo link Xceed.' },
  { question: 'Quanto costa un aperitivo a Milano in discoteca?', answer: 'Nelle serate selezionate le formule disponibili partono generalmente da 15 euro. Fa fede esclusivamente il prezzo mostrato nella pagina Xceed collegata al singolo evento.' },
  { question: "L'aperitivo include un drink?", answer: 'Dipende dalla serata. Le formule Xceed possono comprendere uno o due drink oppure open wine. Ogni inclusione è riportata accanto al prezzo della singola serata.' },
  { question: "L'aperitivo include il buffet?", answer: "Il buffet è previsto quando indicato dal locale o dalla pagina Xceed. Quantità, modalità di servizio e disponibilità possono cambiare; verifica la formula prima dell'acquisto." },
  { question: "Posso restare in discoteca dopo l'aperitivo?", answer: "Molte formule proseguono con il club, ma accesso e consumazioni dipendono dal biglietto acquistato. Controlla se la formula scelta include anche l'ingresso alla serata." },
  { question: "Qual è l'età minima per entrare?", answer: "Pineta e Aria sono normalmente 18+, mentre Just Me è normalmente 21+. L'età riportata nella pagina Xceed del singolo evento prevale sempre su questa guida." },
  { question: "Come prenoto l'aperitivo al Just Me Milano?", answer: 'Apri il link Xceed della data scelta, acquista la formula disponibile e invia la conferma su WhatsApp al +39 351 912 7047 con nome, data e numero di persone.' },
  { question: "Come prenoto l'aperitivo al Pineta Milano?", answer: "Usa esclusivamente il link Xceed associato alla serata Pineta presente nel programma. Dopo l'acquisto invia la conferma al nostro numero WhatsApp." },
  { question: "Come prenoto l'aperitivo all'Aria Club Milano?", answer: "Seleziona la data Aria nel programma e completa l'acquisto dal relativo link Xceed. Inoltra poi la conferma su WhatsApp per il controllo della prenotazione." },
  { question: "Posso prenotare un tavolo per l'aperitivo?", answer: 'Sì. Sono disponibili, secondo la serata, tavoli in pista, privé e super privé. Prezzi e disponibilità devono essere verificati per la data scelta.' },
  { question: 'Quanto costa un tavolo VIP a Milano?', answer: 'Il prezzo cambia per locale, posizione, data e numero di persone. Quando Xceed pubblica un prezzo lo riportiamo nel programma; negli altri casi chiedi una verifica su WhatsApp.' },
  { question: 'Il tavolo comprende bottiglie?', answer: 'Le inclusioni non sono uguali per tutti i tavoli. Prima del pagamento verifica nella pagina Xceed o su WhatsApp numero di bottiglie, ingressi inclusi e posizione del tavolo.' },
  { question: "Serve il dress code per l'aperitivo?", answer: 'Per Just Me, Pineta e Aria è consigliato un abbigliamento elegante. Per gli uomini possono essere richiesti pantaloni lunghi. La direzione mantiene il diritto di selezione.' },
  { question: 'Posso entrare senza prenotazione?', answer: "L'ingresso senza prenotazione non è garantito. Acquistare in anticipo su Xceed permette di controllare prezzo, disponibilità e condizioni della serata scelta." },
  { question: 'Il biglietto Eventbrite vale per entrare?', answer: 'No. Questa pagina raccoglie e confronta gli aperitivi disponibili. Il titolo valido è quello acquistato tramite il link Xceed della singola serata.' },
  { question: 'Perché devo inviare la conferma su WhatsApp?', answer: "La conferma ci permette di controllare locale, data, formula e nominativo. Invia il documento Xceed al +39 351 912 7047 subito dopo l'acquisto." },
  { question: 'Posso chiedere informazioni in italiano?', answer: 'Sì. Scrivi su WhatsApp al +39 351 912 7047 indicando data, locale, numero di persone, età dei partecipanti e servizio richiesto.' },
  { question: 'Gli aperitivi sono adatti a gruppi internazionali?', answer: 'Just Me e Pineta hanno un pubblico fortemente internazionale. Aria è più orientato al pubblico italiano, pur accogliendo anche gruppi stranieri.' },
  { question: 'Quale aperitivo scegliere per un pubblico 21+?', answer: "Just Me Milano è la proposta prioritaria per un pubblico internazionale 21+. Controlla sempre l'età minima pubblicata nella pagina Xceed della data selezionata." },
  { question: 'Quale aperitivo scegliere per un pubblico 18+?', answer: 'Pineta Milano e Aria Club Milano sono le proposte principali 18+. Pineta ha un taglio più internazionale, Aria un pubblico prevalentemente italiano.' },
  { question: 'I prezzi possono cambiare?', answer: 'Sì. Prezzi, disponibilità e formule possono essere modificati dal locale. Per questo ogni prenotazione deve essere completata dal link Xceed aggiornato della singola serata.' },
  { question: 'Cosa succede se una formula è esaurita?', answer: "Scegli un'altra formula disponibile nella stessa pagina Xceed oppure scrivi su WhatsApp per verificare tavoli, liste o un locale alternativo." },
  { question: 'Come arrivo ai locali?', answer: "Just Me si trova in zona Sempione, Pineta in Via Messina 38 e Aria in Via Ippodromo 115. Controlla sempre l'indirizzo riportato nel titolo Xceed acquistato." },
  { question: 'Questa guida viene aggiornata ogni giorno?', answer: 'Si. Ogni nuova pubblicazione giornaliera elimina le date trascorse e mantiene soltanto gli aperitivi ancora prenotabili fino alla fine della settimana.' },
] as const;

const BODY_IMAGES = [
  {
    title: 'Aperitivo al Just Me Milano in zona Sempione',
    src: `${SITE_URL}/images/venues/just-me-milano/just-me-milano-buffet-01.webp`,
    alt: 'Aperitivo Just Me Milano con buffet e cocktail in zona Sempione',
  },
  {
    title: 'Aperitivo e serata internazionale al Pineta Milano',
    src: `${SITE_URL}/images/venues/pineta-milano/pineta-milano-lounge-01.webp`,
    alt: 'Pineta Milano aperitivo internazionale e tavoli privé',
  },
  {
    title: "Aperitivo e discoteca all'Aria Club Milano",
    src: `${SITE_URL}/images/venues/aria-club-milano/aria-club-milano-buffet-01.webp`,
    alt: 'Aria Club Milano aperitivo buffet e discoteca 18+',
  },
  {
    title: 'Aperitivo con DJ set e nightlife a Milano',
    src: `${SITE_URL}/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp`,
    alt: 'Aperitivo con DJ set a Milano e nightlife in zona Sempione',
  },
] as const;

function buildHtml(events: CuratedEvent[], args: Args, marker: string): string {
  const byDate = new Map<string, CuratedEvent[]>();
  for (const event of events) {
    const list = byDate.get(event.localDate) || [];
    list.push(event);
    byDate.set(event.localDate, list);
  }

  const calendar = [...byDate.entries()]
    .map(([date, dayEvents]) => `<h2>${escapeHtml(dateLabel(date))}</h2>${dayEvents.map(eventCard).join('')}`)
    .join('');
  const agenda = [...byDate.entries()]
    .map(([date, dayEvents]) => `<li><strong>${escapeHtml(dateLabel(date))}:</strong> ${escapeHtml(dayEvents.map((event) => `${event.venueName} - ${event.name}`).join('; '))}</li>`)
    .join('');
  const gallery = BODY_IMAGES
    .map((image) => `<h3>${escapeHtml(image.title)}</h3><p><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" width="460" style="width:100%;max-width:460px;height:auto;display:block" /></p>`)
    .join('');
  const faqs = FAQS
    .map((faq) => `<div data-event-faq="true"><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></div>`)
    .join('');

  return [
    '<h2>Aperitivi a Milano: calendario aggiornato della settimana</h2>',
    `<p>Questa guida riunisce gli aperitivi ancora prenotabili da ${escapeHtml(dateLabel(args.date))} a ${escapeHtml(dateLabel(args.weekEnd))} nei locali selezionati da Nightlife Milan. Trovi formule, età minima, orari, tavoli e il link Xceed specifico di ogni serata.</p>`,
    '<p>Il calendario viene ripubblicato ogni giorno: le date trascorse vengono eliminate e restano soltanto le opzioni effettivamente disponibili. Just Me ha priorità per il pubblico internazionale 21+, Pineta per il pubblico internazionale 18+ e Aria per il pubblico italiano 18+.</p>',
    '<h2>Come prenotare senza errori</h2>',
    `<p>Scegli locale e data, apri il relativo link Xceed e controlla formula e prezzo prima del pagamento. Dopo l'acquisto inoltra la conferma d'ordine su WhatsApp al <a href="https://wa.me/393519127047">${PHONE}</a>, indicando nome, locale, data e numero di persone. Verificheremo sul portale l'esito della prenotazione e del pagamento e ti invieremo conferma.</p>`,
    '<p><strong>Importante:</strong> il biglietto gratuito Eventbrite non costituisce titolo di ingresso. L\'acquisto o la prenotazione valida deve essere completata tramite il link Xceed specifico riportato sotto ciascuna proposta.</p>',
    '<h2>Programma degli aperitivi disponibili</h2>',
    calendar,
    '<h2>Agenda della settimana</h2>',
    `<ul>${agenda}</ul>`,
    '<h2>Immagini dei locali e atmosfera</h2>',
    gallery,
    '<h2>Tavoli pista, privé e super privé</h2>',
    '<p>Le tre location possono offrire tavoli in pista, privé e super privé. Il prezzo dipende da data, posizione e numero di persone. Quando Xceed pubblica un prezzo viene riportato nella singola scheda; se manca, richiedi disponibilità e preventivo su WhatsApp senza assumere prezzi di altre serate.</p>',
    '<h2>Domande frequenti sugli aperitivi a Milano</h2>',
    faqs,
    '<p><strong>Parole chiave:</strong> aperitivo Milano, aperitivi Milano, aperitivo Milano questa settimana, aperitivo Milano giovedi, aperitivo Milano venerdi, aperitivo Milano sabato, aperitivo Milano domenica, aperitivo con DJ set Milano, aperitivo in discoteca Milano, aperitivo internazionale Milano, aperitivo 18+ Milano, aperitivo 21+ Milano, Just Me Milano aperitivo, Pineta Milano aperitivo, Aria Club Milano aperitivo, buffet aperitivo Milano, prezzi aperitivo Milano, tavolo aperitivo Milano, aperitivo Sempione Milano, aperitivo CityLife Milano, aperitivo Corso Como Milano, dove fare aperitivo a Milano.</p>',
    `<!-- ${marker} -->`,
  ].join('');
}

function validateContent(title: string, summary: string, html: string, events: CuratedEvent[]): void {
  if (title.length > 75) throw new Error(`Titolo troppo lungo: ${title.length}/75`);
  if (summary.length > 140) throw new Error(`Summary troppo lungo: ${summary.length}/140`);
  if (!summary.includes(PHONE)) throw new Error('Numero WhatsApp assente dal summary');
  if (FAQS.length !== 25) throw new Error(`FAQ non valide: ${FAQS.length}/25`);
  FAQS.forEach((faq, index) => {
    if (faq.answer.length > 300) throw new Error(`FAQ ${index + 1} supera 300 caratteri`);
  });
  if ((html.match(/data-event-faq="true"/g) || []).length !== 25) throw new Error('Il corpo non contiene 25 FAQ');
  if ((html.match(/<img /g) || []).length !== 4) throw new Error('Il corpo non contiene 4 immagini');
  if (/\p{Extended_Pictographic}/u.test(html)) throw new Error('Il corpo contiene emoji non supportate da Eventbrite');
  for (const event of events) {
    if (!html.includes(event.affiliateUrl)) throw new Error(`Link Xceed assente per ${event.xceedId}`);
  }
}

async function makeCover(output: string, range: string): Promise<void> {
  const width = 2160;
  const height = 1080;
  const sources = [
    'public/images/venues/just-me-milano/just-me-milano-buffet-01.webp',
    'public/images/venues/pineta-milano/pineta-milano-lounge-01.webp',
    'public/images/venues/aria-club-milano/aria-club-milano-buffet-01.webp',
  ];
  const panels = await Promise.all(sources.map((source) =>
    sharp(source).resize(720, height, { fit: 'cover', position: 'attention' }).jpeg({ quality: 90 }).toBuffer()
  ));
  const base = sharp({ create: { width, height, channels: 3, background: '#111111' } });
  const overlay = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="2160" height="1080" fill="#050508" fill-opacity="0.48"/>
      <rect x="0" y="0" width="2160" height="16" fill="#ef5b3f"/>
      <text x="108" y="110" fill="#ffffff" font-family="Arial, sans-serif" font-size="38" font-weight="700">MILAN NIGHTLIFE | EVENT SERVICE</text>
      <text x="1080" y="480" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="128" font-weight="800">APERITIVI A MILANO</text>
      <text x="1080" y="590" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="62" font-weight="700">${escapeHtml(range.toUpperCase().replace('-', ' - '))}</text>
      <rect x="525" y="650" width="1110" height="2" fill="#ffffff" fill-opacity="0.8"/>
      <text x="1080" y="735" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="50" font-weight="700">JUST ME | PINETA | ARIA</text>
      <text x="1080" y="995" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="600">WHATSAPP ${PHONE} | NIGHTLIFEMILAN.COM</text>
    </svg>
  `);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await base
    .composite([
      { input: panels[0], left: 0, top: 0 },
      { input: panels[1], left: 720, top: 0 },
      { input: panels[2], left: 1440, top: 0 },
      { input: overlay, left: 0, top: 0 },
    ])
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
    .toFile(output);
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
}

async function resolveCuratedVenue(token: string): Promise<string> {
  const name = 'Milano - sedi indicate nel programma';
  const list = await fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/venues/`, { headers: authHeaders(token) });
  if (!list.ok) throw new Error(`Lettura venue Eventbrite fallita: ${list.status}`);
  const body = await list.json();
  const existing = (body.venues || []).find((venue: { name?: string }) => venue.name === name);
  if (existing?.id) return existing.id;

  const create = await fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/venues/`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({
      venue: {
        name,
        address: {
          address_1: 'Milano',
          city: 'Milano',
          region: 'Lombardia',
          postal_code: '20121',
          country: 'IT',
          latitude: '45.4642',
          longitude: '9.1900',
        },
      },
    }),
  });
  if (!create.ok) throw new Error(`Creazione venue Eventbrite fallita: ${create.status} ${(await create.text()).slice(0, 200)}`);
  const created = await create.json();
  if (!created.id) throw new Error('Eventbrite non ha restituito l ID della venue');
  return created.id;
}

async function uploadCover(token: string, filename: string): Promise<string> {
  const infoRes = await fetch(`${EVENTBRITE_API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!infoRes.ok) throw new Error(`Preparazione upload fallita: ${infoRes.status}`);
  const info = await infoRes.json();
  const form = new FormData();
  for (const [key, value] of Object.entries(info.upload_data || {})) form.append(key, String(value ?? ''));
  const image = await fs.readFile(filename);
  form.append(info.file_parameter_name || 'file', new Blob([image], { type: 'image/jpeg' }), path.basename(filename));
  const uploadRes = await fetch(info.upload_url, { method: 'POST', body: form });
  if (!uploadRes.ok) throw new Error(`Upload cover fallito: ${uploadRes.status} ${(await uploadRes.text()).slice(0, 200)}`);
  const finalizeRes = await fetch(`${EVENTBRITE_API}/media/upload/`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify({ upload_token: info.upload_token }),
  });
  if (!finalizeRes.ok) throw new Error(`Finalizzazione cover fallita: ${finalizeRes.status}`);
  const media = await finalizeRes.json();
  if (!media.id) throw new Error('Eventbrite non ha restituito l ID della cover');
  return media.id;
}

async function findExistingByMarker(token: string, marker: string): Promise<{ id: string; url?: string } | null> {
  const response = await fetch(
    `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&time_filter=current_future&page_size=100`,
    { headers: authHeaders(token) },
  );
  if (!response.ok) throw new Error(`Controllo duplicati Eventbrite fallito: ${response.status}`);
  const body = await response.json();
  return (body.events || []).find((event: { description?: { html?: string } }) =>
    event.description?.html?.includes(marker)
  ) || null;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  await loadLocalEnv();
  const days = Math.max(7, Math.ceil((Date.parse(`${args.weekEnd}T23:59:59+02:00`) - Date.now()) / 86_400_000) + 1);
  const events = curate(await scoutXceedEvents(days), args.date, args.weekEnd);
  if (events.length === 0) throw new Error('Nessun aperitivo Xceed disponibile nella finestra richiesta');

  const marker = `nlm:curated=aperitivi-it-${args.date}`;
  const range = dateRangeLabel(args.date, args.weekEnd);
  const title = `Aperitivi a Milano questa settimana | ${range}`;
  const summary = `Aperitivi a Milano ${range}: Just Me, Pineta e Aria. Prezzi e prenotazioni Xceed. WhatsApp ${PHONE}.`;
  const html = buildHtml(events, args, marker);
  validateContent(title, summary, html, events);

  const artifactDir = path.resolve('artifacts/curated-eventbrite');
  const cover = path.join(artifactDir, `aperitivi-milano-${args.date}-cover.jpg`);
  const preview = path.join(artifactDir, `aperitivi-milano-${args.date}-preview.json`);
  await makeCover(cover, range);
  await fs.writeFile(preview, `${JSON.stringify({ title, summary, html, marker, events: events.map((event) => ({
    xceedId: event.xceedId,
    date: event.localDate,
    venue: event.venueName,
    name: event.name,
    affiliateUrl: event.affiliateUrl,
    offers: event.offers,
  })) }, null, 2)}\n`, 'utf8');

  if (!args.execute) {
    console.log(JSON.stringify({ ok: true, execute: false, title, summaryLength: summary.length, htmlLength: html.length, eventCount: events.length, cover, preview }, null, 2));
    return;
  }

  if (args.updateEventId) {
    const secret = process.env.CRON_SECRET;
    if (!secret) throw new Error('CRON_SECRET non disponibile per l aggiornamento server');
    const response = await fetch(`${SITE_URL}/api/admin/update-event-copy`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${secret}`, 'content-type': 'application/json' },
      body: JSON.stringify({ eventId: args.updateEventId, title, summary, descriptionHtml: html }),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(`Aggiornamento server fallito: ${response.status} ${result.error || 'errore sconosciuto'}`);
    console.log(JSON.stringify({ ...result, execute: true, updatedEventId: args.updateEventId, eventCount: events.length, cover, preview }, null, 2));
    return;
  }

  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) {
    const secret = process.env.CRON_SECRET;
    if (!secret) throw new Error('CRON_SECRET non disponibile per la pubblicazione server');
    const response = await fetch(`${SITE_URL}/api/events/publish-curated`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${secret}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        title,
        summary,
        descriptionHtml: html,
        marker,
        date: args.date,
        coverBase64: (await fs.readFile(cover)).toString('base64'),
        coverContentType: 'image/jpeg',
        coverFilename: path.basename(cover),
      }),
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error(`Pubblicazione server fallita: ${response.status} ${result.error || 'errore sconosciuto'}`);
    console.log(JSON.stringify({ ...result, execute: true, eventCount: events.length, cover, preview }, null, 2));
    return;
  }
  const existing = await findExistingByMarker(token, marker);
  if (existing) {
    console.log(JSON.stringify({ ok: true, execute: true, skipped: true, reason: 'already-present', eventId: existing.id, url: existing.url }, null, 2));
    return;
  }
  const venueEbId = await resolveCuratedVenue(token);
  const imageId = await uploadCover(token, cover);
  const result = await publishOneLang({
    token,
    venueEbId,
    imageId,
    startUtc: new Date(`${args.date}T18:00:00+02:00`).toISOString().replace('.000Z', 'Z'),
    endUtc: new Date(`${args.date}T23:59:00+02:00`).toISOString().replace('.000Z', 'Z'),
    title,
    summary,
    description: html,
    locale: 'it_IT',
    lang: 'it',
    ageRestriction: '18+',
    doorTimeISO: `${args.date}T18:00:00`,
    ticketText: {
      name: 'Richiesta informazioni gratuita - non valida per ingresso',
      description: `Questa registrazione non è un biglietto di ingresso. Acquista la formula Xceed del locale scelto e invia la conferma su WhatsApp al ${PHONE}.`,
    },
    categoryId: '110',
  });
  if (!result.ok) throw new Error(result.reason || 'Pubblicazione Eventbrite fallita');
  console.log(JSON.stringify({ ok: true, execute: true, eventId: result.ebEventId, url: result.url, eventCount: events.length, cover, preview }, null, 2));
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) }));
  process.exitCode = 1;
});
