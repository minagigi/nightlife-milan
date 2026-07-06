import { CONTACT } from '@/config/contact';
import { venuesData } from './venuesData';

/**
 * Pipeline locandine — Fase 4B. Per ogni evento scoutato con `posterUrl`:
 * 1. Scarica la locandina originale.
 * 2. Claude vision ispeziona: contiene contatti/brand di terzi?
 * 3. Se sporca: editing generativo con Gemini (Nano Banana 2) — SOSTITUISCE
 *    (non solo rimuove) siti/numeri di terzi con i nostri, stesso stile
 *    grafico, poi ri-verifica con vision (max 2 tentativi).
 * 4. Se non ripulibile: fallback alla foto venue nostra.
 *
 * Modello Gemini verificato disponibile (2026-07-07): gemini-3.1-flash-image
 * ("Nano Banana 2") — supporta generateContent con input+output immagine.
 */

const VISION_MODEL = 'claude-sonnet-5';
const IMAGE_EDIT_MODEL = 'gemini-3.1-flash-image';
const MAX_POSTER_BYTES = 8 * 1024 * 1024;
const DOWNLOAD_TIMEOUT_MS = 15000;
const MAX_EDIT_ATTEMPTS = 2;

export type PosterSource = 'poster-clean' | 'poster-edited' | 'venue-fallback';

export interface PosterResult {
  buffer: Buffer;
  contentType: string;
  filename: string;
  source: PosterSource;
}

interface VisionInspection {
  hasPhoneNumbers: boolean;
  hasThirdPartyBranding: boolean;
  hasSocialHandles: boolean;
  textFound: string[];
}

async function downloadImage(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return null;
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) return null;
    const arrayBuf = await res.arrayBuffer();
    if (arrayBuf.byteLength > MAX_POSTER_BYTES) return null;
    return { buffer: Buffer.from(arrayBuf), contentType };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function inspectWithVision(imageBase64: string, mediaType: string, afterEdit = false): Promise<VisionInspection | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  // Il check post-editing deve sapere che nightlifemilan.com e il nostro numero
  // sono attesi (li abbiamo appena inseriti noi) — altrimenti ogni poster
  // editato con successo verrebbe rifiutato per la presenza dei NOSTRI contatti.
  const ownContactNote = afterEdit
    ? `\nNote: "nightlifemilan.com" and "${CONTACT.whatsapp.number}" (with a WhatsApp icon) are OUR OWN contact info, already correctly added — do NOT flag them as phone numbers or branding.`
    : '';

  const prompt = `Look at this event poster. The VENUE name and EVENT name/date printed on it are expected and fine — they are NOT third-party branding.${ownContactNote} Answer ONLY with a JSON object (no markdown, no prose):
{
  "hasPhoneNumbers": boolean (any THIRD-PARTY phone number printed on the poster, in any format),
  "hasThirdPartyBranding": boolean (any promoter/agency/sponsor logo or name that is NOT the venue itself and NOT Nightlife Milan),
  "hasSocialHandles": boolean (any @handle, hashtag, or social media icon with a handle, belonging to a third party),
  "textFound": ["list every piece of THIRD-PARTY contact-related text found, e.g. phone numbers, handles, URLs — do not list our own info"]
}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: VISION_MODEL,
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageBase64 } },
            { type: 'text', text: prompt },
          ],
        }],
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content: Array<{ type: string; text?: string }> };
    const text = data.content?.find((c) => c.type === 'text')?.text || '';
    const jsonStr = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    return JSON.parse(jsonStr) as VisionInspection;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

const EDIT_PROMPT = `Edit this event poster with minimal changes:
(1) Replace any website URL with "nightlifemilan.com" in the same font, size, color and position as the original text.
(2) Replace any phone number with "+39 351 912 7047" preceded by a small WhatsApp icon, matching the original font, size, color and position.
(3) Remove any third-party promoter logos and social media handles.
Keep the artwork, layout, composition, colors, venue name, event name, date and every other element pixel-identical. Do not redesign anything.`;

/**
 * Prompt di retry mirato — verificato che funzioni meglio del prompt generico
 * ripetuto identico: descrivere ESATTAMENTE cosa è rimasto (dal recheck vision
 * precedente) fa pulire a Nano Banana 2 anche loghi/testo residuo in background
 * che il primo passaggio generico aveva ignorato.
 */
function buildRetryPrompt(residualText: string[]): string {
  const items = residualText.length ? residualText.join(', ') : 'a third-party logo or contact still visible';
  return `This poster still has third-party branding visible: ${items}. Remove it completely — if it's on a small object (balloon, sign, banner), make that object plain/blank matching similar plain objects already in the scene. Do not change anything else: keep the "nightlifemilan.com" text and WhatsApp number already added exactly as they are, keep all people, lighting, and composition pixel-identical.`;
}

async function editWithNanoBanana(imageBase64: string, mediaType: string, retryPrompt?: string): Promise<{ buffer: Buffer; mediaType: string } | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_EDIT_MODEL}:generateContent?key=${key}`,
      {
        method: 'POST',
        signal: controller.signal,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: retryPrompt || EDIT_PROMPT },
              { inline_data: { mime_type: mediaType, data: imageBase64 } },
            ],
          }],
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const parts = data.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p: { inlineData?: { data?: string; mimeType?: string } }) => p.inlineData?.data);
    if (!imagePart) return null;
    return {
      buffer: Buffer.from(imagePart.inlineData.data, 'base64'),
      mediaType: imagePart.inlineData.mimeType || 'image/png',
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function isClean(inspection: VisionInspection): boolean {
  return !inspection.hasPhoneNumbers && !inspection.hasThirdPartyBranding && !inspection.hasSocialHandles;
}

async function venueFallback(venueId: string, imageSlug: string): Promise<PosterResult | null> {
  const venue = venuesData.find((v) => v.id === venueId);
  if (!venue) return null;
  const path = venue.gallery?.[0] || venue.image;
  if (!path) return null;

  const downloaded = await downloadImage(`https://nightlifemilan.com${path}`);
  if (!downloaded) return null;

  const ext = downloaded.contentType.includes('png') ? 'png' : 'jpg';
  return {
    buffer: downloaded.buffer,
    contentType: downloaded.contentType,
    filename: `${imageSlug}-venue-fallback.${ext}`,
    source: 'venue-fallback',
  };
}

/**
 * Processa la locandina di un evento: pulita → usala; sporca → editing con
 * Nano Banana 2 + ri-verifica (max 2 tentativi); irrecuperabile → foto venue.
 */
export async function processPoster(posterUrl: string | undefined, venueId: string, imageSlug: string): Promise<PosterResult> {
  if (!posterUrl) {
    const fallback = await venueFallback(venueId, imageSlug);
    if (fallback) return fallback;
    throw new Error(`No poster and no venue fallback image for ${venueId}`);
  }

  const downloaded = await downloadImage(posterUrl);
  if (!downloaded) {
    const fallback = await venueFallback(venueId, imageSlug);
    if (fallback) return fallback;
    throw new Error(`Poster download failed and no venue fallback for ${venueId}`);
  }

  const base64 = downloaded.buffer.toString('base64');
  const inspection = await inspectWithVision(base64, downloaded.contentType);

  // Vision non disponibile (niente ANTHROPIC_API_KEY o errore) → non possiamo
  // garantire l'assenza di contatti terzi: fallback prudente, mai rischiare.
  if (!inspection) {
    const fallback = await venueFallback(venueId, imageSlug);
    if (fallback) return fallback;
    throw new Error(`Vision inspection unavailable and no venue fallback for ${venueId}`);
  }

  if (isClean(inspection)) {
    const ext = downloaded.contentType.includes('png') ? 'png' : 'jpg';
    return {
      buffer: downloaded.buffer,
      contentType: downloaded.contentType,
      filename: `${imageSlug}.${ext}`,
      source: 'poster-clean',
    };
  }

  // Sporca: prova l'editing generativo, max 2 tentativi con ri-verifica.
  // Il tentativo 2 usa un prompt mirato sui residui trovati dal recheck
  // precedente (verificato: molto più efficace del prompt generico ripetuto
  // identico su loghi/testo residuo in aree secondarie dell'immagine).
  let currentBuffer = downloaded.buffer;
  let currentMediaType = downloaded.contentType;
  let retryPrompt: string | undefined;

  for (let attempt = 1; attempt <= MAX_EDIT_ATTEMPTS; attempt++) {
    const edited = await editWithNanoBanana(currentBuffer.toString('base64'), currentMediaType, retryPrompt);
    if (!edited) break;

    currentBuffer = edited.buffer;
    currentMediaType = edited.mediaType;

    const recheck = await inspectWithVision(currentBuffer.toString('base64'), currentMediaType, /* afterEdit */ true);
    if (recheck && isClean(recheck)) {
      const ext = currentMediaType.includes('png') ? 'png' : 'jpg';
      return {
        buffer: currentBuffer,
        contentType: currentMediaType,
        filename: `${imageSlug}.${ext}`,
        source: 'poster-edited',
      };
    }
    if (recheck) retryPrompt = buildRetryPrompt(recheck.textFound);
  }

  const fallback = await venueFallback(venueId, imageSlug);
  if (fallback) return fallback;
  throw new Error(`Poster unrecoverable and no venue fallback for ${venueId}`);
}
