import { venuesData } from './venuesData';
import type { ScoutedEvent } from './eventScout';
import type { RewrittenEvent } from './eventRewriter';
import type { PosterResult } from './posterPipeline';
import { getEventbriteToken } from './eventbriteToken';
import { getVenuePricing } from './venuePricing';
import { CONTACT } from '@/config/contact';

/**
 * Pubblicazione sulla nostra org Eventbrite — Fase 5. Non testabile in locale
 * (EVENTBRITE_TOKEN è una env "Sensitive" su Vercel, illeggibile fuori dal
 * runtime di produzione) — validato via `?dryRun=1` sulla route deployata
 * (Fase 6). Segue la sequenza documentata dell'API v3: risoluzione/creazione
 * venue → creazione evento → upload immagine → ticket gratuito → publish.
 */

const EVENTBRITE_API = 'https://www.eventbriteapi.com/v3';
const ORG_ID = '2988002072164';
const RATE_LIMIT_MS = 3000;

export interface PublishResult {
  ok: boolean;
  ebEventId?: string;
  url?: string;
  reason?: string;
  imageSource?: string;
}

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

function toEventbriteUtc(dateISO: string): string {
  const [datePart, timePart] = dateISO.slice(0, 19).split('T');
  const [y, m, d] = datePart.split('-').map(Number);
  const [hh, mm, ss] = (timePart || '00:00:00').split(':').map(Number);
  const offsetMin = romeOffsetMinutesForDate(y, m, d);
  const utcMs = Date.UTC(y, m - 1, d, hh, mm, ss || 0) - offsetMin * 60000;
  return new Date(utcMs).toISOString().replace(/\.\d{3}Z$/, 'Z');
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

  // 1. Cerca tra i venue Eventbrite già esistenti nella nostra org (sempre read-only,
  // sicuro anche in dry-run).
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

  // 2. Non trovato: crealo — MA MAI in dry-run (creare un venue non è un'operazione
  // reversibile senza costo, va evitata quando dryRun=1 deve garantire "zero effetti").
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
    // Bug reale riscontrato al primo publish: con header
    // 'content-type: application/json' su una GET senza body, Eventbrite
    // sembra cercare "type" in un body JSON inesistente invece che nella query
    // string ("type - This field is required" nonostante ?type=... nell'URL).
    // Fix: niente content-type su questa GET, e token anche come query param
    // (pattern documentato ufficialmente, oltre all'header Authorization).
    const uploadInfoRes = await fetch(
      `${EVENTBRITE_API}/media/upload/?type=image-event-logo&token=${encodeURIComponent(token)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!uploadInfoRes.ok) {
      console.error(`[eventPublisher] Media upload info failed: HTTP ${uploadInfoRes.status} ${(await uploadInfoRes.text()).slice(0, 200)}`);
      return null;
    }
    const uploadInfo = await uploadInfoRes.json();
    // Il servizio Eventbrite dietro questo endpoint ("ImageBFF") restituisce i
    // campi del presigned POST S3 sotto "upload_data" (non "file_parameters"
    // come nella vecchia documentazione/tutorial ancora in giro online) e il
    // nome del campo file sotto "file_parameter_name" — scoperto loggando la
    // risposta completa dopo un 400 "Key parameter is required".
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

/**
 * Pubblica un evento riscritto+sanitizzato+con locandina pronta sulla nostra
 * org Eventbrite. Ritorna `ok: false` con `reason` su qualunque fallimento —
 * non lancia mai eccezioni verso il chiamante (la route gestisce N eventi in
 * sequenza, un fallimento non deve fermare gli altri).
 */
export async function publishEvent(
  scouted: ScoutedEvent,
  rewritten: RewrittenEvent,
  sanitizedDescription: string,
  poster: PosterResult,
  dryRun: boolean
): Promise<PublishResult> {
  const token = getEventbriteToken();
  if (!token) return { ok: false, reason: 'EVENTBRITE_TOKEN not set' };

  const venueEbId = await resolveEventbriteVenueId(token, scouted.venueId, dryRun);
  if (!venueEbId) return { ok: false, reason: `Could not resolve/create Eventbrite venue for ${scouted.venueId}` };

  const description = sanitizedDescription;

  if (dryRun) {
    return {
      ok: true,
      reason: 'dry-run: not published',
      imageSource: poster.source,
      url: `[dry-run] ${rewritten.titleEn}`,
    };
  }

  // 1. Crea l'evento (draft) — EN-only (regola gold standard: pubblico internazionale,
  // il sito genera le sue pagine bilingui in autonomia da seoRewrite.ts).
  let eventId: string;
  let eventUrl: string;
  try {
    const createRes = await fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/events/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        event: {
          name: { html: rewritten.titleEn },
          summary: rewritten.summaryEn,
          start: { timezone: 'Europe/Rome', utc: toEventbriteUtc(scouted.dateISO) },
          end: { timezone: 'Europe/Rome', utc: toEventbriteUtc(scouted.endISO || scouted.dateISO) },
          currency: 'EUR',
          venue_id: venueEbId,
          online_event: false,
          listed: true,
          shareable: true,
        },
      }),
    });
    if (!createRes.ok) {
      const errBody = await createRes.text();
      return { ok: false, reason: `Event creation failed: ${createRes.status} ${errBody.slice(0, 200)}` };
    }
    const created = await createRes.json();
    eventId = created.id;
    eventUrl = created.url;
  } catch (e) {
    return { ok: false, reason: `Event creation threw: ${(e as Error).message}` };
  }

  // 2. Upload immagine → assegna come logo (obbligatorio: Lineup blocca senza immagine)
  const imageId = await uploadEventImage(token, poster);
  if (!imageId) {
    return { ok: false, reason: 'Image upload failed — event created as draft but not published (needsReview)', ebEventId: eventId, imageSource: poster.source };
  }

  try {
    await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ event: { logo_id: imageId } }),
    });
  } catch {
    return { ok: false, reason: 'Logo assignment failed', ebEventId: eventId, imageSource: poster.source };
  }

  // 3. Description completa
  // Bug reale scoperto (spike G0): POST/PUT su /events/{id}/description/ dà
  // sempre 405 METHOD_NOT_ALLOWED — l'evento reale pubblicato in precedenza è
  // rimasto con la sola summary perché questa chiamata falliva silenziosamente
  // (nessun controllo dell'esito). Il metodo che funziona davvero è annidare
  // "description" nel body della POST generica /events/{id}/. La description
  // accetta HTML vero (h2/h3/p/ul/li/a, vedi assembleGoldDescription) — ma lo
  // spike ha osservato un caso di corruzione/troncamento apparentemente
  // transitorio lato Eventbrite; verifica con un GET e un retry prima di
  // arrendersi (non bloccante: un fallimento qui non impedisce il resto).
  try {
    let descOk = false;
    for (let attempt = 0; attempt < 2 && !descOk; attempt++) {
      const descRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({ event: { description: { html: description } } }),
      });
      if (!descRes.ok) {
        console.error(`[eventPublisher] Description write failed (attempt ${attempt + 1}): HTTP ${descRes.status} ${(await descRes.text()).slice(0, 200)}`);
        continue;
      }
      const verifyRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/`, { headers: authHeaders(token) });
      const verifyBody = await verifyRes.json().catch(() => null);
      const savedLength = (verifyBody?.description?.html || '').length;
      // Soglia empirica: la description gold reale supera sempre qualche
      // migliaio di caratteri — una lunghezza molto più corta indica un
      // troncamento/corruzione lato Eventbrite (visto nello spike G0).
      descOk = savedLength >= description.length * 0.8;
      if (!descOk) {
        console.error(`[eventPublisher] Description write looks truncated (attempt ${attempt + 1}): sent ${description.length} chars, saved ${savedLength}`);
      }
    }
    if (!descOk) {
      console.error(`[eventPublisher] Description write did not stick after retries — event published with partial/short description (needs manual review)`);
    }
  } catch (e) {
    console.error(`[eventPublisher] Description write threw: ${(e as Error).message}`);
  }

  // 4. Ticket — formato ESATTO del gold standard (mai varianti inventate).
  // Il vero contatto viene sempre da CONTACT, mai hardcodato nel testo.
  try {
    const ticketRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/ticket_classes/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        ticket_class: {
          name: 'RESERVATION TICKET - PAY AT THE DOOR - NOT FREE',
          free: true,
          quantity_total: 500,
          minimum_quantity: 1,
          maximum_quantity: 10,
          hide_sale_dates: false,
          sales_end: toEventbriteUtc(scouted.endISO || scouted.dateISO),
          description: `This listing is only a reservation request and NOT a real ticket purchase.\nTo be accredited/confirmed, you must contact Luis Nightlife at ☎️ ${CONTACT.whatsapp.number}.`,
        },
      }),
    });
    if (!ticketRes.ok) {
      return { ok: false, reason: 'Ticket creation failed — not publishing without a ticket', ebEventId: eventId, imageSource: poster.source };
    }
  } catch (e) {
    return { ok: false, reason: `Ticket creation threw: ${(e as Error).message}`, ebEventId: eventId, imageSource: poster.source };
  }

  // 4b. music_properties — highlights nativi "Buono a sapersi" (età + check-in).
  // Scoperto scrivibile nello spike G0 (a differenza dei widget structured_content,
  // non scrivibili via API pubblica). Non bloccante: un fallimento qui non deve
  // impedire la pubblicazione del resto dell'evento.
  try {
    const pricing = getVenuePricing(scouted.venueId);
    const ageRestriction = pricing.ageLimit ? `${pricing.ageLimit}+` : undefined;
    let doorTime: string | undefined;
    if (pricing.checkinMinutesBefore) {
      const startMs = new Date(toEventbriteUtc(scouted.dateISO)).getTime() - pricing.checkinMinutesBefore * 60000;
      doorTime = new Date(startMs).toISOString().replace(/\.\d{3}Z$/, 'Z');
    }
    if (ageRestriction || doorTime) {
      const mpRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/music_properties/`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({ music_properties: { ...(ageRestriction && { age_restriction: ageRestriction }), ...(doorTime && { door_time: doorTime }) } }),
      });
      if (!mpRes.ok) {
        console.error(`[eventPublisher] music_properties write failed: HTTP ${mpRes.status} ${(await mpRes.text()).slice(0, 200)}`);
      }
    }
  } catch (e) {
    console.error(`[eventPublisher] music_properties write threw: ${(e as Error).message}`);
  }

  // 5. Publish
  try {
    const publishRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/publish/`, {
      method: 'POST',
      headers: authHeaders(token),
    });
    if (!publishRes.ok) {
      const errBody = await publishRes.text();
      return { ok: false, reason: `Publish failed: ${publishRes.status} ${errBody.slice(0, 200)}`, ebEventId: eventId, imageSource: poster.source };
    }
  } catch (e) {
    return { ok: false, reason: `Publish threw: ${(e as Error).message}`, ebEventId: eventId, imageSource: poster.source };
  }

  return { ok: true, ebEventId: eventId, url: eventUrl, imageSource: poster.source };
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const PUBLISH_RATE_LIMIT_MS = RATE_LIMIT_MS;
