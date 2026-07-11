import { Event, MusicGenre, LocalizedString } from './types';
import { rewriteEventSEO } from './seoRewrite';
import { matchVenueId } from './venueMatching';
import { getEventbriteToken } from './eventbriteToken';
import { getVenuePricing } from './venuePricing';

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';

// Map Eventbrite venue name → canonical internal venue id (matches venuesData ids).
// Eventi della NOSTRA org sono sempre in uno dei 18 venue: se il nome non matcha
// nessun alias noto (typo, nome leggermente diverso), il fallback a v-justme evita
// di scartare l'evento — comportamento invariato rispetto a prima del refactor.
function mapVenueId(venueName: string): string {
  return matchVenueId(venueName) || 'v-justme';
}

function detectGenre(text: string): MusicGenre[] {
  const t = text.toLowerCase();
  const genres: MusicGenre[] = [];
  if (t.includes('techno')) genres.push(MusicGenre.TECHNO);
  if (t.includes('house') || t.includes('afro house')) genres.push(MusicGenre.HOUSE);
  if (t.includes('hip hop') || t.includes('hiphop') || t.includes('rap') || t.includes('afrobeat') || t.includes('uptown')) genres.push(MusicGenre.HIP_HOP);
  if (t.includes('reggaeton') || t.includes('urban') || t.includes('latin') || t.includes('brasil')) genres.push(MusicGenre.REGGAETON);
  if (t.includes('commercial') || t.includes('pop') || t.includes('top 40')) genres.push(MusicGenre.COMMERCIAL);
  if (t.includes('edm') || t.includes('electronic')) genres.push(MusicGenre.EDM);
  if (t.includes(' live') || t.includes('concert')) genres.push(MusicGenre.LIVE_MUSIC);
  if (t.includes('indie') || t.includes('alternative')) genres.push(MusicGenre.INDIE);
  return genres.length > 0 ? genres : [MusicGenre.COMMERCIAL];
}

// FASE G4B: il publisher (eventRewriter.ts/assembleGoldDescription) incorpora
// nella description un marker (commento HTML) con lo slug canonico deciso
// PRIMA del publish (necessario per il backlink Eventbrite→sito: il link
// viene scritto nell'evento e va puntare a uno slug che il sito genererà
// IDENTICO). Se presente, va usato verbatim al posto della rigenerazione AI —
// coerenza garantita sito↔Eventbrite.
//
// Bug reale corretto: questo regex cercava ancora il vecchio formato testuale
// `[nlm:src=N;slug-en=...]` (con parentesi quadre, id solo numerico) di una
// versione precedente di assembleGoldDescription — MAI aggiornato quando il
// marker è diventato un commento HTML `<!-- nlm:src=X;slug-en=... -->` con id
// anche non numerico (es. "xc-220757" per gli eventi Xceed, FASE X4). Il
// meccanismo di backlink non ha mai effettivamente funzionato: ogni pagina
// sito veniva rigenerata con uno slug AI diverso da quello linkato su
// Eventbrite, e il poll "200 = pagina viva" del publisher risultava un falso
// positivo (una pagina ESISTENTE ma per uno slug diverso/inesistente veniva
// comunque scambiata per quella giusta).
//
// FASE F1 (2026-07-08): con l'architettura "eventi separati" (due listing
// Eventbrite per serata, uno EN uno IT) il marker include anche la lingua
// (`nlm:src={baseId}-{lang};slug-en=...`) — i marker dei 3 eventi legacy
// (pre-pivot) restano nel vecchio formato senza lingua. Bug reale riportato
// dall'utente con screenshot: senza distinguere per lingua, ogni serata
// produceva DUE card identiche su "Upcoming This Week" (una per listing) —
// la card IT mostrava comunque il titolo italiano ma affiancata alla EN,
// invece di essercene una sola che cambia lingua col sito.
// FASE L3 multilingua: il marker per-lingua ora usa QUALSIASI codice a 2 lettere
// (`nlm:src={baseId}-{lang};slug-en=...`), non più solo en|it — ogni serata ha
// fino a 35 listing Eventbrite tradotti. Tutti condividono lo stesso baseId e
// slug-en, così il sito li raggruppa in UNA sola card che mostra la lingua
// selezionata (vedi fetchEventbriteEvents).
export const NEW_MARKER_RE = /nlm:src=(.+?)-([a-z]{2});slug-en=([a-z0-9-]+)/;
export const LEGACY_MARKER_RE = /nlm:src=([^;]+);slug-en=([a-z0-9-]+)/;

export interface ParsedMarker {
  baseId: string;
  lang?: string;
  slug: string;
}

export function parseMarker(text: string | undefined): ParsedMarker | undefined {
  if (!text) return undefined;
  const fresh = text.match(NEW_MARKER_RE);
  if (fresh) return { baseId: fresh[1], lang: fresh[2], slug: fresh[3] };
  const legacy = text.match(LEGACY_MARKER_RE);
  if (legacy) return { baseId: legacy[1], slug: legacy[2] };
  return undefined;
}

/**
 * Contenuto gold-standard (sezioni + programma + 25 FAQ) di un evento, letto
 * DIRETTAMENTE dalla description HTML dei listing Eventbrite via API — NON dal
 * Vercel Blob (che è andato in 403/sospeso per overage quota, azzerando il
 * contenuto gold del sito). Riusa i listing tradotti: ritorna l'HTML nella
 * lingua richiesta, con fallback it→en. Idempotente e senza dipendenze a pagamento.
 *
 * `fetchOwnOrgEvents` (importLedger) pagina TUTTI i listing dell'org includendo
 * la description raw — necessario perché con ~200 listing la lingua giusta sta
 * spesso oltre la prima pagina.
 */
// Cache in-memory dei listing org (paginati, ~260 con description completa):
// senza, OGNI render di pagina evento rifà la fetch di ~3MB e sfora il tempo
// runtime sugli eventi generati on-demand. TTL breve: i contenuti cambiano solo
// all'import notturno.
type RawDesc = { description?: { html?: string; text?: string } };
const orgCache: Record<string, { at: number; events: RawDesc[] }> = {};
const ORG_EVENTS_TTL_MS = 5 * 60 * 1000;

async function fetchOrgCached(statuses: string): Promise<RawDesc[]> {
  const c = orgCache[statuses];
  if (c && Date.now() - c.at < ORG_EVENTS_TTL_MS) return c.events;
  const { fetchOwnOrgEvents } = await import('./importLedger');
  const events = await fetchOwnOrgEvents(statuses);
  orgCache[statuses] = { at: Date.now(), events };
  return events;
}

function pickGoldHtml(all: RawDesc[], slugEn: string, locale: string): string | null {
  const byLang = new Map<string, string>();
  for (const ev of all) {
    const html = ev.description?.html;
    if (!html) continue;
    const marker = parseMarker(ev.description?.text) || parseMarker(html);
    if (marker?.slug === slugEn && marker.lang) byLang.set(marker.lang, html);
  }
  return byLang.get(locale) || byLang.get('it') || byLang.get('en') || null;
}

export async function getEventGoldHtml(slugEn: string, locale: string): Promise<string | null> {
  if (!slugEn) return null;
  let chosen: string | null;
  try {
    // Set LEGGERO (eventi correnti) → veloce, copre i futuri. Solo se lo slug
    // non c'è (evento passato) si tenta il set con ended/completed.
    chosen = pickGoldHtml(await fetchOrgCached('live,draft,started'), slugEn, locale);
    if (!chosen) chosen = pickGoldHtml(await fetchOrgCached('ended,completed'), slugEn, locale);
  } catch {
    return null;
  }
  if (!chosen) return null;

  // Togli il marker HTML e il blocco legale/affiliate in testa (Contacts + link
  // BUY TICKETS + IMPORTANT): il sito ha già la sua sidebar prenotazione e CTA.
  // Renderizza dalla prima sezione di contenuto in poi (primo <H2> DOPO Contacts).
  let body = chosen.replace(/<!--\s*nlm:src=[^>]*-->/gi, '');
  const h2s = [...body.matchAll(/<H2[^>]*>/gi)];
  if (h2s.length >= 2 && typeof h2s[1].index === 'number') {
    // il 1° <H2> è "Contacts/Contatti/…"; taglia da lì fino al 2° <H2> (prima sezione reale),
    // ma tieni il paragrafo introduttivo iniziale (prima del 1° <H2>).
    const intro = body.slice(0, h2s[0].index ?? 0);
    body = intro + body.slice(h2s[1].index);
  }
  return body.trim() || null;
}

/** Extract the first Xceed link from an Eventbrite event description (HTML or plain text). */
function extractXceedUrl(text: string): string | undefined {
  if (!text) return undefined;
  // href="https://xceed.me/..." (HTML anchor)
  const href = text.match(/href=["']?(https?:\/\/(?:www\.)?xceed\.me\/[^"'\s>]+)/i);
  if (href) return href[1].replace(/[.,;!?)]+$/, '');
  // plain URL in text
  const plain = text.match(/https?:\/\/(?:www\.)?xceed\.me\/[^\s"'<>\)\]]+/i);
  return plain?.[0]?.replace(/[.,;!?)]+$/, '');
}

function cleanTitle(raw: string): string {
  return raw
    .replace(/[·•–—·]/g, '-')
    .replace(/Â·|â|Ã¬|â¬/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/** Prezzo reale di ingresso per venue, MAI da Eventbrite: il nostro stesso
 * publisher (eventPublisher.ts) crea sempre un ticket_class `free: true` come
 * semplice RSVP — non è mai il prezzo vero (si paga alla porta o si prenota
 * via WhatsApp). Usare `ticket_classes` per il prezzo mostrerebbe "Gratis" su
 * OGNI evento importato (bug reale riportato dall'utente). L'unica fonte di
 * prezzo reale è il listino confermato in `venuePricing.ts`; se il venue non
 * ha ancora un listino confermato, il prezzo resta `null` (nessun prezzo
 * mostrato) invece di affermare "Gratis" o inventare una cifra. */
function realEntryPrice(venueId: string): number | null {
  const tiers = getVenuePricing(venueId).ticketTiers;
  return tiers?.length ? Math.min(...tiers.map(t => t.price)) : null;
}

function realTableMinSpend(venueId: string): number | null {
  const tiers = getVenuePricing(venueId).tableTiers;
  return tiers?.length ? Math.min(...tiers.map(t => t.price)) : null;
}

export async function debugEventbrite() {
  const token = getEventbriteToken();
  if (!token) return { error: 'EVENTBRITE_TOKEN not set', hasToken: false };

  const url = `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=live&expand=venue,logo&order_by=start_asc&time_filter=current_future`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  });

  const text = await res.text();
  let parsed: unknown;
  try { parsed = JSON.parse(text); } catch { parsed = text.slice(0, 500); }

  return {
    hasToken: true,
    tokenPrefix: token.slice(0, 6) + '...',
    status: res.status,
    ok: res.ok,
    url,
    responsePreview: parsed,
  };
}

interface RawEbEvent {
  id: string;
  name: { text: string };
  description?: { text: string; html?: string };
  start: { local: string; utc: string };
  end: { local: string; utc: string };
  status: string;
  logo?: { url: string; original?: { url: string } };
  venue?: { name: string };
  ticket_classes?: Array<{ free: boolean; cost?: { major_value: string } }>;
}

/** Costruisce l'Event condiviso da UN listing (venue/data/prezzo/immagine/xceedUrl —
 * identici tra i due listing EN/IT della stessa serata, quindi presi da uno qualsiasi).
 *
 * FASE C0 (2026-07-09, bug reale riportato dall'utente): `ev.start.local` NON ha
 * offset — costruire la data con un `+01:00` hardcoded (ora solare CET) fa
 * slittare di un'ora OGNI evento durante l'ora legale (CEST, marzo-ottobre),
 * mostrando sul sito orari sbagliati (es. un doors-open reale delle 19:30
 * mostrato come 20:30). `ev.start.utc`/`ev.end.utc` sono già UTC vero
 * dall'API — usarli sempre, mai ricostruire l'offset a mano. */
function buildSharedFields(ev: RawEbEvent, title: string, desc: string) {
  const venueId = mapVenueId(ev.venue?.name || '');
  return {
    venueId,
    genre: detectGenre(title + ' ' + desc),
    dateISO: ev.start.utc,
    endDateISO: ev.end.utc,
    pricing: { entry: realEntryPrice(venueId), currency: 'EUR' as const, tableMinSpend: realTableMinSpend(venueId) },
    image: ev.logo?.url || ev.logo?.original?.url,
    isSpecial: /live|special|vip/i.test(title),
    isTrending: ev.status === 'live',
    xceedUrl:
      extractXceedUrl(ev.description?.html || '') ||
      extractXceedUrl(ev.description?.text || '') ||
      `https://www.eventbrite.com/e/${ev.id}`,
  };
}

/** Prima frase/paragrafo in chiaro dalla description — usata SOLO per i listing
 * "eventi separati" (marker con lingua): sono già il nostro contenuto gold-standard,
 * riscriverli con l'AI generica sarebbe ridondante e, a credito API esaurito,
 * degraderebbe un testo già corretto al fallback rule-based. */
function shortDescFromText(text: string | undefined, fallback: string): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  return clean ? clean.slice(0, 200) : fallback;
}

/**
 * Fetch della lista eventi live con retry — un fallimento transitorio
 * dell'API Eventbrite (rate limit/hiccup) non deve tradursi in una lista
 * vuota indistinguibile da "nessun evento": la pagina evento farebbe
 * notFound() e Next CACHEREBBE quel 404 per l'intera finestra di
 * revalidate (fino a 1h) — bug reale riportato dall'utente (bandierina
 * italiana → 404 su una pagina che pochi minuti dopo rispondeva 200).
 * Dopo i retry, fallisce con throw: i chiamanti tolleranti (homepage,
 * sync) degradano a [], la pagina evento propaga l'errore (500 non
 * cacheato) invece di un 404 cacheabile.
 */
const FETCH_RETRIES = 1;
const FETCH_RETRY_DELAY_MS = 700;

/**
 * @param includePast  Se true NON applica time_filter=current_future → include
 *   anche gli eventi PASSATI. Serve alla risoluzione delle pagine evento
 *   (getEbEventBySlug) e alla sezione "Eventi passati": per SEO le pagine dei
 *   passati NON devono mai sparire/404. Le liste attive (home, tonight,
 *   this-week) usano il default (solo futuri).
 */
// Cache in-memory del risultato GIÀ raggruppato (Event[]). Con >250 listing la
// fetch+grouping costa ~10-20s: senza questa cache ogni render di pagina/lista
// la rifà (Next data-cache non affidabile su Vercel a questa dimensione) →
// timeout. Qui il lavoro pesante avviene UNA volta ogni 5min per lambda.
const ebEventsCache: Record<string, { at: number; events: Event[] }> = {};
const EB_EVENTS_TTL_MS = 5 * 60 * 1000;

export async function fetchEventbriteEvents(includePast = false, sinceDaysAgo?: number): Promise<Event[]> {
  const token = getEventbriteToken();
  if (!token) return [];

  // sinceDaysAgo (solo con includePast): segnala il caso d'uso "lista Eventi
  // passati", che mostra solo la serata di ieri. NON serve tutta la storia: qui
  // la fetch usa order_by=start_desc + poche pagine (i listing più recenti in
  // cima), poi il chiamante filtra per giorno. Il filtro server-side per data
  // (start_date.range_start) NON è affidabile su questo endpoint (400/ignorato),
  // quindi si limita via ordinamento+pagine. getEbEventBySlug (senza sinceDaysAgo)
  // resta start_asc completo, deve risolvere qualsiasi slug passato per SEO.
  const cacheKey = includePast ? (sinceDaysAgo ? `past-${sinceDaysAgo}` : 'past') : 'future';
  const cached = ebEventsCache[cacheKey];
  if (cached && Date.now() - cached.at < EB_EVENTS_TTL_MS) return cached.events;

  let lastError: unknown = null;
  let data: { events?: RawEbEvent[] } | null = null;

  for (let attempt = 1; attempt <= FETCH_RETRIES; attempt++) {
    try {
      // PAGINAZIONE (fix 2026-07-11): con le traduzioni multilingua l'org ha
      // >250 listing; una singola pagina (max 50) tagliava fuori gli eventi
      // futuri (order_by=start_asc → i passati riempiono la prima pagina) →
      // getEbEventBySlug non li trovava → pagine evento future in 404/stale.
      // Si sfogliano tutte le pagine (page_size=200) accumulando i listing.
      const acc: RawEbEvent[] = [];
      let continuation: string | undefined;
      let pages = 0;
      // Per la lista "Eventi passati" (sinceDaysAgo) NON serve tutta la storia:
      // order_by=start_desc mette i listing più RECENTI in cima, così la serata
      // di ieri sta nelle prime pagine (bug reale: con start_asc i listing più
      // vecchi riempivano le prime pagine → per arrivare a ieri si sfogliava
      // l'intera org, ~262 listing, ~60s → timeout → lista vuota). Poche pagine
      // bastano; getEbEventBySlug (senza sinceDaysAgo) resta start_asc completo.
      const orderBy = sinceDaysAgo ? 'start_desc' : 'start_asc';
      const maxPages = sinceDaysAgo ? 2 : 10;
      do {
        // includePast: Eventbrite marca gli eventi trascorsi come ended/completed,
        // quindi status=live da solo li escluderebbe → si aggiungono quegli stati.
        // Caso lista passati (sinceDaysAgo): SOLO ended,completed. Escludendo
        // live/started (i futuri) dalla query, con order_by=start_desc la serata
        // di ieri è in cima alla pagina 1 — altrimenti i molti listing futuri
        // (Jul 11/12 × 35 lingue) riempivano le 2 pagine e ieri restava fuori.
        const status = sinceDaysAgo
          ? 'ended,completed'
          : includePast
            ? 'live,started,ended,completed'
            : 'live';
        const url =
          `${EVENTBRITE_API}/organizations/${ORG_ID}/events/?status=${status}&expand=venue,logo&order_by=${orderBy}&page_size=200` +
          (includePast ? '' : '&time_filter=current_future') +
          (continuation ? `&continuation=${continuation}` : '');
        const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 300 } });
        if (!res.ok) throw new Error(`Eventbrite list HTTP ${res.status}`);
        const page = await res.json();
        acc.push(...((page.events || []) as RawEbEvent[]));
        continuation = page.pagination?.has_more_items ? page.pagination?.continuation : undefined;
      } while (continuation && ++pages < maxPages);
      data = { events: acc };
      break;
    } catch (e) {
      lastError = e;
    }
    if (attempt < FETCH_RETRIES) await new Promise((r) => setTimeout(r, FETCH_RETRY_DELAY_MS * attempt));
  }

  if (!data) {
    throw new Error(`Eventbrite events fetch failed after ${FETCH_RETRIES} attempts: ${(lastError as Error)?.message || 'unknown'}`);
  }

  try {
    const raw = (data.events || []) as RawEbEvent[];

    // FASE F1 (2026-07-08) + L3 multilingua (2026-07-10): raggruppare per baseId
    // del marker. Ogni serata reale pubblica FINO A 35 listing Eventbrite (uno per
    // lingua); senza raggruppare, ognuno diventava una Event a sé → 35 card
    // duplicate sullo stesso carosello. Qui diventano UNA sola card che mostra il
    // titolo/descrizione nella lingua selezionata dal sito (fallback EN).
    // Raggruppamento per IDENTITÀ FISICA dell'evento — NON per baseId del marker
    // (fragile). Due sorgenti reali di duplicati IT/EN sfuggivano al baseId:
    //   1) un listing che PERDE il marker (enrichment via browser) → orfano a sé;
    //   2) lo STESSO evento pubblicato come DUE listing con baseId e slug diversi
    //      (uno "…-july-11-2026", uno "…-11-luglio-2026") → due gruppi distinti.
    // La chiave è: venue normalizzata (mapVenueId unifica gli alias) + giorno di
    // inizio + NUCLEO del nome (tolte date/numeri/mesi/giorni, che cambiano tra
    // EN/IT). Stesso evento → stessa chiave → UNA card. Eventi DIVERSI stesso
    // locale/sera (es. Pineta: "Saturday Night" vs "Argentina vs Switzerland Watch
    // Party") hanno nucleo-nome diverso → restano DUE card separate.
    const DATE_WORDS = /\b(jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|may|jun(e)?|jul(y)?|aug(ust)?|sep(t|tember)?|oct(ober)?|nov(ember)?|dec(ember)?|gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre|monday|tuesday|wednesday|thursday|friday|saturday|sunday|luned|marted|mercoled|gioved|venerd|sabato|domenica)\b/gi;
    const nameCore = (t: string) =>
      cleanTitle(t).toLowerCase().replace(DATE_WORDS, ' ').replace(/[0-9]+/g, ' ')
        .replace(/[^a-zà-ù]+/gi, ' ').trim().replace(/\s+/g, ' ');
    const physKey = (ev: RawEbEvent) =>
      `${mapVenueId(ev.venue?.name || '')}|${(ev.start?.utc || '').slice(0, 10)}|${nameCore(ev.name.text)}`;

    interface Group { baseId: string; byLang: Map<string, RawEbEvent>; singles: RawEbEvent[] }
    const groups = new Map<string, Group>();
    for (const ev of raw) {
      const marker = parseMarker(ev.description?.text) || parseMarker(ev.description?.html);
      const key = physKey(ev);
      const group: Group =
        groups.get(key) || { baseId: marker?.baseId || ev.id, byLang: new Map<string, RawEbEvent>(), singles: [] };
      // baseId rappresentativo stabile: preferisci quello di un listing marcato.
      if (marker?.baseId && group.byLang.size === 0 && group.singles.length === 0) group.baseId = marker.baseId;
      if (marker?.lang) group.byLang.set(marker.lang, ev);
      else group.singles.push(ev);
      groups.set(key, group);
    }

    const events: Event[] = [];

    for (const group of groups.values()) {
      const allListings = [...group.byLang.values(), ...group.singles];
      const pickImage = () => {
        for (const ev of allListings) {
          const img = ev.logo?.url || ev.logo?.original?.url;
          if (img) return img;
        }
        return undefined;
      };

      if (group.byLang.size > 0) {
        // Serata gold multilingua — UNA sola card, titolo/descrizione per lingua,
        // niente riscrittura AI (il contenuto è già il nostro gold-standard).
        const primary = group.byLang.get('en') || group.byLang.get('it') || [...group.byLang.values()][0];
        // Slug per lingua dal marker di CIASCUN listing: se lo stesso evento è
        // stato pubblicato con slug diversi per EN/IT, ENTRAMBI gli URL restano
        // validi (getEbEventBySlug matcha slug.en O slug.it) → nessun 404, una card.
        const slugByLang: Record<string, string> = {};
        for (const [lang, ev] of group.byLang) {
          const m = parseMarker(ev.description?.text) || parseMarker(ev.description?.html);
          if (m?.slug) slugByLang[lang] = m.slug;
        }
        const slugEn = slugByLang.en || slugByLang.it || Object.values(slugByLang)[0] || '';
        const slugIt = slugByLang.it || slugEn;
        const primaryTitle = cleanTitle(primary.name.text);
        const shared = buildSharedFields(primary, primaryTitle, primary.description?.text || '');
        if (!shared.image) shared.image = pickImage();

        // Titolo/descrizione per OGNI lingua pubblicata → la card mostra quella
        // selezionata dal sito, con fallback automatico a EN (getLocalizedText).
        const title: Record<string, string> = {};
        const shortDescription: Record<string, string> = {};
        for (const [lang, ev] of group.byLang) {
          const t = cleanTitle(ev.name.text);
          title[lang] = t;
          shortDescription[lang] = shortDescFromText(ev.description?.text, t);
        }
        // Fold dei listing orfani (senza marker) della STESSA serata come lingua
        // mancante: la loro presenza NON deve mai creare una seconda card. Riempie
        // il primo slot vuoto tra en/it — di norma è la lingua dell'orfano, perché
        // il gruppo marcato ha già l'altra.
        for (const ev of group.singles) {
          const t = cleanTitle(ev.name.text);
          const lang = !title.en ? 'en' : !title.it ? 'it' : null;
          if (lang) {
            title[lang] = t;
            shortDescription[lang] = shortDescFromText(ev.description?.text, t);
          }
        }
        if (!title.en) title.en = primaryTitle;
        if (!shortDescription.en) shortDescription.en = shortDescFromText(primary.description?.text, primaryTitle);

        events.push({
          id: `eb-${group.baseId}`,
          ...shared,
          localizedContent: {
            title: title as LocalizedString,
            shortDescription: shortDescription as LocalizedString,
            // slug per lingua: entrambi gli URL EN/IT risolvono → una card, zero 404.
            slug: { en: slugEn, it: slugIt } as LocalizedString,
          },
        });
        continue;
      }

      // Gruppo di soli orfani (nessun marker-lingua): UNA sola card, MAI una per
      // listing — i singoli sono la stessa serata in lingue diverse. Primario: chi
      // ha un marker legacy (slug stabile), altrimenti il primo per id (deterministico).
      const singlesSorted = group.singles
        .slice()
        .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
      const primary =
        singlesSorted.find((s) => parseMarker(s.description?.text) || parseMarker(s.description?.html)) ||
        singlesSorted[0];
      const title = cleanTitle(primary.name.text);
      const desc = (primary.description?.text || title).slice(0, 600);
      const shared = buildSharedFields(primary, title, desc);
      if (!shared.image) shared.image = pickImage();

      const seo = await rewriteEventSEO({ title, description: desc, venueId: shared.venueId, dateISO: shared.dateISO });
      const marker = parseMarker(primary.description?.text) || parseMarker(primary.description?.html);
      const slugEn = marker?.slug || seo.slugEn;
      const slugIt = marker?.slug || seo.slugIt;
      // Se c'è un secondo orfano (l'altra lingua), usa il suo titolo umano invece
      // di quello riscritto — senza però creare una card extra.
      const other = singlesSorted.find((s) => s !== primary);
      const otherTitle = other ? cleanTitle(other.name.text) : '';

      events.push({
        id: `eb-${marker?.baseId || primary.id}`,
        ...shared,
        localizedContent: {
          title: { en: seo.titleEn, it: otherTitle || seo.titleIt },
          shortDescription: { en: seo.descEn, it: seo.descIt },
          slug: { en: slugEn, it: slugIt },
        },
      });
    }

    ebEventsCache[cacheKey] = { at: Date.now(), events };
    return events;
  } catch (e) {
    // Anche un errore di mapping post-fetch deve propagarsi, mai degradare a
    // lista vuota: stessa ragione del retry sopra (404 cacheato da ISR).
    throw new Error(`Eventbrite events mapping failed: ${(e as Error).message}`);
  }
}
