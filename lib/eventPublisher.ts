import { venuesData } from './venuesData';
import type { ScoutedEvent } from './eventScout';
import type { RewrittenEvent } from './eventRewriter';
import type { PosterResult } from './posterPipeline';

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

/** Formatta una data per l'API Eventbrite: "YYYY-MM-DDTHH:MM:SS" (no timezone, va nel campo utc/timezone separato). */
function toEventbriteLocal(dateISO: string): string {
  return dateISO.slice(0, 19);
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
    const uploadInfoRes = await fetch(
      `${EVENTBRITE_API}/media/upload/?type=image-event-logo`,
      { headers: authHeaders(token) }
    );
    if (!uploadInfoRes.ok) {
      console.error(`[eventPublisher] Media upload info failed: HTTP ${uploadInfoRes.status} ${(await uploadInfoRes.text()).slice(0, 200)}`);
      return null;
    }
    const uploadInfo = await uploadInfoRes.json();
    const { upload_url, file_parameters, upload_token } = uploadInfo;

    const form = new FormData();
    for (const [key, value] of Object.entries(file_parameters || {})) {
      form.append(key, value as string);
    }
    form.append('file', new Blob([new Uint8Array(poster.buffer)], { type: poster.contentType }), poster.filename);

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
 * Pubblica un evento riscritto+sanitizzato+con locandina pronta sulla nostra
 * org Eventbrite. Ritorna `ok: false` con `reason` su qualunque fallimento —
 * non lancia mai eccezioni verso il chiamante (la route gestisce N eventi in
 * sequenza, un fallimento non deve fermare gli altri).
 */
export async function publishEvent(
  scouted: ScoutedEvent,
  rewritten: RewrittenEvent,
  sanitizedHtmlIt: string,
  sanitizedHtmlEn: string,
  poster: PosterResult,
  dryRun: boolean
): Promise<PublishResult> {
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) return { ok: false, reason: 'EVENTBRITE_TOKEN not set' };

  const venueEbId = await resolveEventbriteVenueId(token, scouted.venueId, dryRun);
  if (!venueEbId) return { ok: false, reason: `Could not resolve/create Eventbrite venue for ${scouted.venueId}` };

  const description = `${sanitizedHtmlIt}\n<hr/>\n${sanitizedHtmlEn}\n<!-- src:${scouted.ebId} -->`;

  if (dryRun) {
    return {
      ok: true,
      reason: 'dry-run: not published',
      imageSource: poster.source,
      url: `[dry-run] ${rewritten.titleIt}`,
    };
  }

  // 1. Crea l'evento (draft)
  let eventId: string;
  let eventUrl: string;
  try {
    const createRes = await fetch(`${EVENTBRITE_API}/organizations/${ORG_ID}/events/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        event: {
          name: { html: rewritten.titleIt },
          summary: rewritten.summaryIt,
          start: { timezone: 'Europe/Rome', utc: toEventbriteLocal(scouted.dateISO) },
          end: { timezone: 'Europe/Rome', utc: toEventbriteLocal(scouted.endISO || scouted.dateISO) },
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
  try {
    await fetch(`${EVENTBRITE_API}/events/${eventId}/description/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ description: { html: description } }),
    });
  } catch {
    // non bloccante: l'evento resta pubblicabile con la sola summary
  }

  // 4. Ticket gratuito
  try {
    const ticketRes = await fetch(`${EVENTBRITE_API}/events/${eventId}/ticket_classes/`, {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({
        ticket_class: {
          name: 'Guestlist — Ingresso Omaggio',
          free: true,
          quantity_total: 50,
          minimum_quantity: 1,
          maximum_quantity: 4,
        },
      }),
    });
    if (!ticketRes.ok) {
      return { ok: false, reason: 'Ticket creation failed — not publishing without a ticket', ebEventId: eventId, imageSource: poster.source };
    }
  } catch (e) {
    return { ok: false, reason: `Ticket creation threw: ${(e as Error).message}`, ebEventId: eventId, imageSource: poster.source };
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
