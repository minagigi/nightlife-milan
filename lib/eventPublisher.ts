import { venuesData } from './venuesData';
import type { ScoutedEvent } from './eventScout';
import type { XceedEvent } from './xceedScout';
import type { RewrittenEvent, Lang } from './eventRewriter';
import { getTicketText } from './eventRewriter';
import type { PosterResult } from './posterPipeline';
import { getEventbriteToken } from './eventbriteToken';
import { getVenuePricing } from './venuePricing';
import { CONTACT } from '@/config/contact';

/**
 * Pubblicazione sulla nostra org Eventbrite. Non testabile in locale
 * (EVENTBRITE_TOKEN è una env "Sensitive" su Vercel, illeggibile fuori dal
 * runtime di produzione) — validato via `?dryRun=1` sulla route deployata.
 *
 * FASE B "eventi separati" (2026-07-08, richiesta esplicita utente): ogni
 * serata reale produce DUE eventi Eventbrite distinti (EN e IT), non un unico
 * evento con description mista — venue/immagine sono risolti/caricati UNA
 * volta sola e riusati per entrambi (contenuto visivo language-agnostic),
 * poi si crea/descrive/ticketta/pubblica/music_properties per ciascuna lingua.
 */

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const RATE_LIMIT_MS = 3000;

const LOCALE: Record<Lang, string> = { en: 'en_US', it: 'it_IT' };

export interface PublishResult {
  ok: boolean;
  ebEventId?: string;
  url?: string;
  reason?: string;
  imageSource?: string;
}

export type PublishResultByLang = Partial<Record<Lang, PublishResult>>;

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}`, 'content-type': 'application/json' };
}

/**
 * Converte un orario "wall-clock" di Milano (es. "2026-07-08T20:00:00", senza
 * offset esplicito) nel vero istante UTC richiesto dal campo event.start.utc /
 * event.end.utc dell'API Eventbrite (formato "YYYY-MM-DDThh:mm:ssZ").
 *
 * Bug reale riscontrato al primo publish di test: passare l'ora locale grezza
 * come se fosse già UTC (senza "Z" e senza conversione) veniva rifiutato da
 * Eventbrite con 400 "Datetime has wrong format" — e anche quando accettato
 * per errore avrebbe pubblicato l'evento 1-2 ore fuori orario. Calcola
 * l'offset reale di Europe/Rome per quella data specifica (gestisce CET/CEST
 * senza bisogno di una libreria timezone).
 */
function romeOffsetMinutesForDate(y: number, m: number, d: number): number {
  const utcNoon = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Rome',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(utcNoon);
  const romeHour = parseInt(parts.find((p) => p.type === 'hour')?.value || '12', 10);
  return (romeHour - 12) * 60;
}

export function toEventbriteUtc(dateISO: string): string {
  const [datePart, timePart] = dateISO.slice(0, 19).split('T');
  const [y, m, d] = datePart.split('-').map(Number);
  const [hh, mm, ss] = (timePart || '00:00:00').split(':').map(Number);
  const offsetMin = romeOffsetMinutesForDate(y, m, d);
  const utcMs = Date.UTC(y, m - 1, d, hh, mm, ss || 0) - offsetMin * 60000;
  return new Date(utcMs).toISOString().replace(/\.\d{3}Z$/, 'Z');
}

/**
 * Normalizza una data GIÀ in UTC vero (es. XceedEvent.startISO, che arriva dal
 * JSON-LD "startDate" con suffisso "Z" reale) al formato richiesto da
 * Eventbrite — SENZA applicare alcuna conversione di offset.
 *
 * Bug reale scoperto in FASE X4 (primo publish Xceed): passare startISO già-UTC
 * a `toEventbriteUtc` (pensata per orari "wall-clock" locali senza offset, vedi
 * sopra) sottrae l'offset di Roma UNA SECONDA VOLTA, pubblicando l'evento 2 ore
 * prima dell'orario reale (19:30 Rome → mostrato come 17:30 Rome su Eventbrite).
 */
export function normalizeAlreadyUtc(isoUtc: string): string {
  return new Date(isoUtc).toISOString().replace(/\.\d{3}Z$/, 'Z');
}

/**
 * Trova (o crea) il venue Eventbrite corrispondente al nostro venueId interno.
 * Cache in-memory per la durata della run — non ricreare lo stesso venue Eventbrite
 * ad ogni chiamata.
 */
const venueIdCache = new Map<string, string>();

async function resolveEventbriteVenueId(token: string, venueId: string, dryRun: boolean): Promise<string | null> {
  if (venueIdCache.has(venueId)) return venueIdCache.get(venueId)!;

  const venue = venuesData.find((v) => v.id === venueId);
  if (!venue) {
    console.error(`[eventPublisher] No internal venue data for "${venueId}"`);
    return null;
  }

  const name = venue.localizedContent.name.en;

  try {
    const listRes = await fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/venues/`, {
      headers: authHeaders(token),
    });
    if (!listRes.ok) {
      console.error(`[eventPublisher] Venue list fetch failed: HTTP ${listRes.status} ${(await listRes.text()).slice(0, 200)}`);
    } else {
      const data = await listRes.json();
      const match = (data.venues || []).find((v: { name?: string }) =>
        (v.name || '').toLowerCase().includes(name.toLowerCase())
      );
      if (match?.id) {
        venueIdCache.set(venueId, match.id);
        return match.id;
      }
    }
  } catch (e) {
    console.error(`[eventPublisher] Venue list fetch threw: ${(e as Error).message}`);
  }

  if (dryRun) {
    return `[dry-run] would create Eventbrite venue for "${name}"`;
  }

  try {
    const createRes = await fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/venues/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        venue: {
          name,
          address: {
            address_1: venue.address.streetAddress,
            city: venue.address.addressLocality,
            postal_code: venue.address.postalCode,
            country: venue.address.addressCountry,
            latitude: String(venue.coordinates.latitude),
            longitude: String(venue.coordinates.longitude),
          },
        },
      }),
    });
    if (!createRes.ok) {
      console.error(`[eventPublisher] Venue creation failed for "${name}": HTTP ${createRes.status} ${(await createRes.text()).slice(0, 200)}`);
      return null;
    }
    const created = await createRes.json();
    if (created?.id) {
      venueIdCache.set(venueId, created.id);
      return created.id;
    }
    console.error(`[eventPublisher] Venue creation response missing id for "${name}": ${JSON.stringify(created).slice(0, 200)}`);
  } catch (e) {
    console.error(`[eventPublisher] Venue creation threw for "${name}": ${(e as Error).message}`);
    return null;
  }

  return null;
}

/** Upload immagine via media upload API — ritorna l'image_id da assegnare come logo dell'evento. */
async function uploadEventImage(token: string, poster: PosterResult): Promise<string | null> {
  try {
    const uploadInfoRes = await fetch(
      `${EVENTBRITE_API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!uploadInfoRes.ok) {
      console.error(`[eventPublisher] Media upload info failed: HTTP ${uploadInfoRes.status} ${(await uploadInfoRes.text()).slice(0, 200)}`);
      return null;
    }
    const uploadInfo = await uploadInfoRes.json();
    const { upload_url, upload_data, upload_token, file_parameter_name } = uploadInfo;

    const form = new FormData();
    for (const [key, value] of Object.entries(upload_data || {})) {
      form.append(key, (value as string) ?? '');
    }
    form.append(file_parameter_name || 'file', new Blob([new Uint8Array(poster.buffer)], { type: poster.contentType }), poster.filename);

    const putRes = await fetch(upload_url, { method: 'POST', body: form });
    if (!putRes.ok) {
      console.error(`[eventPublisher] Media upload PUT failed: HTTP ${putRes.status} ${(await putRes.text()).slice(0, 200)}`);
      return null;
    }

    const finalizeRes = await fetch(`${EVENTBRITE_API}/media/upload/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ upload_token }),
    });
    if (!finalizeRes.ok) {
      console.error(`[eventPublisher] Media upload finalize failed: HTTP ${finalizeRes.status} ${(await finalizeRes.text()).slice(0, 200)}`);
      return null;
    }
    const finalized = await finalizeRes.json();
    if (!finalized?.id) console.error(`[eventPublisher] Media upload finalize response missing id: ${JSON.stringify(finalized).slice(0, 200)}`);
    return finalized?.id || null;
  } catch (e) {
    console.error(`[eventPublisher] Media upload threw: ${(e as Error).message}`);
    return null;
  }
}

/**
 * Sostituisce l'immagine di un evento GIÀ pubblicato — usato per correggere
 * un evento live la cui locandina è risultata sporca dopo il fatto (vision
 * check con falso negativo). Upload + riassegnazione logo, nessun'altra
 * modifica ai dati dell'evento.
 */
export async function replaceEventImage(eventId: string, poster: PosterResult): Promise<{ ok: boolean; reason?: string }> {
  const token = getEventbriteToken();
  if (!token) return { ok: false, reason: 'EVENTBRITE_TOKEN not set' };

  const imageId = await uploadEventImage(token, poster);
  if (!imageId) return { ok: false, reason: 'Image upload failed' };

  try {
    const res = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ event: { logo_id: imageId } }),
    });
    if (!res.ok) return { ok: false, reason: `Logo reassignment failed: HTTP ${res.status} ${(await res.text()).slice(0, 200)}` };
  } catch (e) {
    return { ok: false, reason: `Logo reassignment threw: ${(e as Error).message}` };
  }

  return { ok: true };
}

export interface PublishOneLangParams {
  token: string;
  venueEbId: string;
  imageId: string;
  startUtc: string;
  endUtc: string;
  title: string;
  summary: string;
  description: string;
  locale: string;
  /** Codice lingua del registry — en/it usano i ticket nativi di getTicketText,
   *  le altre lingue DEVONO passare `ticketText` tradotto (FASE L3). */
  lang: string;
  ageRestriction?: string;
  doorTimeISO?: string;
  poster?: PosterResult;
  /** Override ticket per le lingue oltre en/it: contenuto gia tradotto localmente. */
  ticketText?: { name: string; description: string };
  /** Copiati dal listing EN sorgente nel worker multilingua (FASE L3) */
  categoryId?: string;
  subcategoryId?: string;
  formatId?: string;
}

/** Pubblica UN evento Eventbrite in UNA lingua. Esportata per il worker
 *  multilingua FASE L3 (app/api/events/publish-locales), che la invoca con
 *  venue/logo già noti dal listing EN sorgente. */
export async function publishOneLang(p: PublishOneLangParams): Promise<PublishResult> {
  const { token, venueEbId, imageId, startUtc, endUtc, title, summary, description, locale, lang, ageRestriction, doorTimeISO, poster } = p;

  // 1. Crea l'evento (draft) — logo_id già noto, assegnato direttamente in creazione.
  // Resiliente sul locale: se Eventbrite rifiuta il locale mappato (es. sv_SE non
  // è un locale valido lato Eventbrite → 400 ARGUMENTS_ERROR event.locale INVALID),
  // ritenta UNA volta con en_GB. Il CONTENUTO resta nella lingua target: il locale
  // è solo la cornice UI del listing.
  let eventId: string;
  let eventUrl: string;
  const createEvent = async (loc: string) =>
    fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/events/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        event: {
          name: { html: title },
          summary,
          start: { timezone: 'Europe/Rome', utc: startUtc },
          end: { timezone: 'Europe/Rome', utc: endUtc },
          currency: 'EUR',
          venue_id: venueEbId,
          online_event: false,
          listed: true,
          shareable: true,
          locale: loc,
          logo_id: imageId,
          ...(p.categoryId && { category_id: p.categoryId }),
          ...(p.subcategoryId && { subcategory_id: p.subcategoryId }),
          ...(p.formatId && { format_id: p.formatId }),
        },
      }),
    });
  try {
    let createRes = await createEvent(locale);
    if (!createRes.ok) {
      const errBody = await createRes.text();
      if (createRes.status === 400 && /locale/i.test(errBody) && locale !== 'en_GB') {
        console.error(`[eventPublisher] locale "${locale}" rejected (${lang}) — retry con en_GB`);
        createRes = await createEvent('en_GB');
        if (!createRes.ok) {
          return { ok: false, reason: `Event creation failed (en_GB fallback): ${createRes.status} ${(await createRes.text()).slice(0, 200)}` };
        }
      } else {
        return { ok: false, reason: `Event creation failed: ${createRes.status} ${errBody.slice(0, 200)}` };
      }
    }
    const created = await createRes.json();
    eventId = created.id;
    eventUrl = created.url;
  } catch (e) {
    return { ok: false, reason: `Event creation threw: ${(e as Error).message}` };
  }

  // 2. Description completa — annidata nella POST generica /events/{id}/ (l'endpoint
  // dedicato /description/ dà sempre 405). Verify+retry: uno spike ha osservato un
  // caso di corruzione/troncamento apparentemente transitorio lato Eventbrite.
  try {
    let descOk = false;
    for (let attempt = 0; attempt < 2 && !descOk; attempt++) {
      const descRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
        method: 'POST',
        headers: authHeaders(token),
        // Eventbrite may regenerate summary from description when the two are
        // written separately. Keep both authoritative in the same request.
        body: JSON.stringify({ event: { summary, description: { html: description } } }),
      });
      if (!descRes.ok) {
        console.error(`[eventPublisher] Description write failed (${lang}, attempt ${attempt + 1}): HTTP ${descRes.status} ${(await descRes.text()).slice(0, 200)}`);
        continue;
      }
      const verifyRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, { headers: authHeaders(token) });
      const verifyBody = await verifyRes.json().catch(() => null);
      const savedLength = (verifyBody?.description?.html || '').length;
      descOk = savedLength >= description.length * 0.8;
      if (!descOk) {
        console.error(`[eventPublisher] Description write looks truncated (${lang}, attempt ${attempt + 1}): sent ${description.length} chars, saved ${savedLength}`);
      }
    }
    if (!descOk) {
      console.error(`[eventPublisher] Description write did not stick after retries (${lang}) — event published with partial/short description (needs manual review)`);
    }
  } catch (e) {
    console.error(`[eventPublisher] Description write threw (${lang}): ${(e as Error).message}`);
  }

  // 3. Ticket — formato ESATTO del gold standard per lingua (mai varianti inventate).
  // en/it: testi nativi da getTicketText; altre lingue: testo tradotto passato dal worker.
  try {
    let ticket = p.ticketText;
    if (!ticket) {
      const t = getTicketText(lang as Lang);
      ticket = { name: t.name, description: t.description(`☎️ ${CONTACT.whatsapp.number}`) };
    }
    const ticketRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/ticket_classes/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        ticket_class: {
          name: ticket.name,
          free: true,
          quantity_total: 500,
          minimum_quantity: 1,
          maximum_quantity: 10,
          hide_sale_dates: false,
          sales_end: endUtc,
          description: ticket.description,
        },
      }),
    });
    if (!ticketRes.ok) {
      return { ok: false, reason: 'Ticket creation failed — not publishing without a ticket', ebEventId: eventId, imageSource: poster?.source };
    }
  } catch (e) {
    return { ok: false, reason: `Ticket creation threw: ${(e as Error).message}`, ebEventId: eventId, imageSource: poster?.source };
  }

  // 4. Publish
  try {
    const publishRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/publish/`, {
      method: 'POST',
      headers: authHeaders(token),
    });
    if (!publishRes.ok) {
      const errBody = await publishRes.text();
      return { ok: false, reason: `Publish failed: ${publishRes.status} ${errBody.slice(0, 200)}`, ebEventId: eventId, imageSource: poster?.source };
    }
  } catch (e) {
    return { ok: false, reason: `Publish threw: ${(e as Error).message}`, ebEventId: eventId, imageSource: poster?.source };
  }

  // 5. music_properties DOPO il publish — scriverlo prima (draft) viene azzerato
  // dalla pubblicazione stessa (bug reale confermato in FASE X4). Non bloccante.
  try {
    if (ageRestriction || doorTimeISO) {
      const mpRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/music_properties/`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({ music_properties: { ...(ageRestriction && { age_restriction: ageRestriction }), ...(doorTimeISO && { door_time: doorTimeISO }) } }),
      });
      if (!mpRes.ok) {
        console.error(`[eventPublisher] music_properties write failed (${lang}): HTTP ${mpRes.status} ${(await mpRes.text()).slice(0, 200)}`);
      }
    }
  } catch (e) {
    console.error(`[eventPublisher] music_properties write threw (${lang}): ${(e as Error).message}`);
  }

  return { ok: true, ebEventId: eventId, url: eventUrl, imageSource: poster?.source };
}

interface PublishBothLangsParams {
  venueId: string;
  startUtc: string;
  endUtc: string;
  rewritten: RewrittenEvent;
  descriptionEn: string;
  descriptionIt: string;
  poster: PosterResult;
  ageRestriction?: string;
  doorTimeISO?: string;
  dryRun: boolean;
  /** Solo le lingue mancanti nel ledger (dedupe per-lingua, FASE B "eventi separati") */
  langsToPublish?: Lang[];
}

/**
 * Nucleo condiviso: risolve venue + carica l'immagine UNA sola volta (contenuto
 * visivo language-agnostic), poi pubblica un evento Eventbrite SEPARATO per
 * ciascuna lingua richiesta (`langsToPublish`, default entrambe).
 */
async function publishBothLangs(p: PublishBothLangsParams): Promise<PublishResultByLang> {
  const langs = p.langsToPublish && p.langsToPublish.length > 0 ? p.langsToPublish : (['en', 'it'] as Lang[]);
  const token = getEventbriteToken();
  if (!token) {
    const r: PublishResult = { ok: false, reason: 'EVENTBRITE_TOKEN not set' };
    return Object.fromEntries(langs.map((l) => [l, r]));
  }

  const venueEbId = await resolveEventbriteVenueId(token, p.venueId, p.dryRun);
  if (!venueEbId) {
    const r: PublishResult = { ok: false, reason: `Could not resolve/create Eventbrite venue for ${p.venueId}` };
    return Object.fromEntries(langs.map((l) => [l, r]));
  }

  if (p.dryRun) {
    const results: PublishResultByLang = {};
    for (const lang of langs) {
      results[lang] = {
        ok: true,
        reason: 'dry-run: not published',
        imageSource: p.poster.source,
        url: `[dry-run] ${lang === 'en' ? p.rewritten.titleEn : p.rewritten.titleIt}`,
      };
    }
    return results;
  }

  const imageId = await uploadEventImage(token, p.poster);
  if (!imageId) {
    const r: PublishResult = { ok: false, reason: 'Image upload failed — not published (needsReview)', imageSource: p.poster.source };
    return Object.fromEntries(langs.map((l) => [l, r]));
  }

  const results: PublishResultByLang = {};
  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    results[lang] = await publishOneLang({
      token, venueEbId, imageId,
      startUtc: p.startUtc, endUtc: p.endUtc,
      title: lang === 'en' ? p.rewritten.titleEn : p.rewritten.titleIt,
      summary: lang === 'en' ? p.rewritten.summaryEn : p.rewritten.summaryIt,
      description: lang === 'en' ? p.descriptionEn : p.descriptionIt,
      locale: LOCALE[lang],
      lang,
      ageRestriction: p.ageRestriction,
      doorTimeISO: p.doorTimeISO,
      poster: p.poster,
    });
    if (i < langs.length - 1) await sleep(RATE_LIMIT_MS);
  }
  return results;
}

/** Pubblica un evento dallo scout Eventbrite (v3) — età/check-in da venuePricing statico. */
export async function publishEvent(
  scouted: ScoutedEvent,
  rewritten: RewrittenEvent,
  sanitizedDescriptionEn: string,
  sanitizedDescriptionIt: string,
  poster: PosterResult,
  dryRun: boolean,
  langsToPublish?: Lang[]
): Promise<PublishResultByLang> {
  const pricing = getVenuePricing(scouted.venueId);
  const ageRestriction = pricing.ageLimit ? `${pricing.ageLimit}+` : undefined;
  const startUtc = toEventbriteUtc(scouted.dateISO);
  const endUtc = toEventbriteUtc(scouted.endISO || scouted.dateISO);

  let doorTimeISO: string | undefined;
  if (pricing.checkinMinutesBefore) {
    const startMs = new Date(startUtc).getTime() - pricing.checkinMinutesBefore * 60000;
    doorTimeISO = new Date(startMs).toISOString().replace(/\.\d{3}Z$/, 'Z');
  }

  return publishBothLangs({
    venueId: scouted.venueId, startUtc, endUtc, rewritten,
    descriptionEn: sanitizedDescriptionEn, descriptionIt: sanitizedDescriptionIt,
    poster, ageRestriction, doorTimeISO, dryRun, langsToPublish,
  });
}

/**
 * Pubblica un evento dalla pipeline Xceed (FASE X4) — età/check-in REALI
 * dell'evento (typicalAgeRange/doorsOpen ufficiali), non da venuePricing statico.
 */
export async function publishXceedEvent(
  xceed: XceedEvent,
  rewritten: RewrittenEvent,
  sanitizedDescriptionEn: string,
  sanitizedDescriptionIt: string,
  poster: PosterResult,
  dryRun: boolean,
  langsToPublish?: Lang[]
): Promise<PublishResultByLang> {
  // xceed.startISO/endISO sono GIÀ UTC vero (dal JSON-LD "startDate") — usare
  // normalizeAlreadyUtc, MAI toEventbriteUtc (che sottrarrebbe l'offset di Roma
  // una seconda volta, vedi bug reale documentato sopra la funzione).
  const startUtc = normalizeAlreadyUtc(xceed.startISO);
  const endUtc = normalizeAlreadyUtc(xceed.endISO || xceed.startISO);

  let doorTimeISO: string | undefined;
  if (xceed.doorsOpen) {
    const datePart = startUtc.slice(0, 10);
    doorTimeISO = `${datePart}T${xceed.doorsOpen}:00Z`;
  }

  return publishBothLangs({
    venueId: xceed.venueId, startUtc, endUtc, rewritten,
    descriptionEn: sanitizedDescriptionEn, descriptionIt: sanitizedDescriptionIt,
    poster, ageRestriction: xceed.ageRange, doorTimeISO, dryRun, langsToPublish,
  });
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const PUBLISH_RATE_LIMIT_MS = RATE_LIMIT_MS;
