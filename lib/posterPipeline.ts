import { readFile } from 'fs/promises';
import path from 'path';
import { CONTACT } from '@/config/contact';
import { venuesData } from './venuesData';

/**
 * Pipeline locandine — Fase 4B, aggiornata FASE P1 (2026-07-09, standard
 * rebrand completo, memoria nightlife-poster-rebrand-standard). Per ogni
 * evento scoutato con `posterUrl`:
 * 1. Scarica la locandina originale.
 * 2. Claude vision ispeziona: contiene contatti/brand di terzi?
 * 3. Editing generativo con Gemini (Nano Banana 2) SEMPRE (non solo se
 *    "sporca"): badge Milan Nightlife + contatti/sito nostri sostituiscono
 *    SEMPRE quelli del venue, anche quando non c'era branding di terzi da
 *    rimuovere — poi ri-verifica con vision (max 2 tentativi).
 * 4. Se non ripulibile: fallback alla foto venue nostra (badge/contatti
 *    comunque applicati sopra).
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

  const prompt = `Look VERY CAREFULLY at every part of this event poster, including small text and watermarks in corners or centered at top/bottom edges — these are easy to miss but are the most common way third parties brand a poster. The VENUE name and EVENT name/date printed on it are expected and fine — they are NOT third-party branding.${ownContactNote}

Explicitly check for: a website domain (anything.it, anything.com), a wordmark/logo overlay (a stylized brand name, even if it doesn't sound like an agency), a small watermark in a corner or centered near an edge, an @handle, a hashtag, or a phone number. If you are not fully sure something is our own venue/brand, treat it as third-party and flag it — a false alarm here is cheap, missing a real brand leak is not.

Answer ONLY with a JSON object (no markdown, no prose):
{
  "hasPhoneNumbers": boolean (any THIRD-PARTY phone number printed on the poster, in any format),
  "hasThirdPartyBranding": boolean (any promoter/agency/sponsor logo, wordmark, or watermark that is NOT the venue itself and NOT Nightlife Milan — include website domains and stylized text logos),
  "hasSocialHandles": boolean (any @handle, hashtag, or social media icon with a handle, belonging to a third party),
  "textFound": ["list every piece of THIRD-PARTY text/logo/watermark found, including website domains — do not list our own info"]
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

// Standard rebrand completo (memoria nightlife-poster-rebrand-standard,
// 2026-07-09) — supera la vecchia regola "solo pulizia terzi": OGNI
// locandina pubblicata porta il badge e i contatti nostri, anche quando non
// c'era alcun branding di terzi da rimuovere. Il badge è la seconda
// immagine passata nella richiesta (vedi editWithNanoBanana).
const EDIT_PROMPT = `Edit this event poster with these changes:
(1) Replace any website URL with "nightlifemilan.com" in the same font, size, color and position as the original text (if there's no URL, add "www.nightlifemilan.com" in small text near where contact info appears).
(2) Replace ANY phone number — including the venue's own official reservation number, not just third-party promoters — with a small WhatsApp icon followed by "+39 351 912 7047" and small UK/Italy flag icons, matching the original font, size, color and position.
(3) Remove any third-party promoter logos, sponsor/liquor brand logos, and social media handles.
(4) Composite the second reference image (a circular "Milan Nightlife — Event Service" badge) into the top-left corner of the poster, sized proportionally, without covering existing text or the main subject.
Keep the artwork, layout, composition, colors, venue's own logo/wordmark, event title, date, lineup and every other element pixel-identical. Do not redesign anything else.`;

/**
 * Prompt di retry mirato — verificato che funzioni meglio del prompt generico
 * ripetuto identico: descrivere ESATTAMENTE cosa è rimasto (dal recheck vision
 * precedente) fa pulire a Nano Banana 2 anche loghi/testo residuo in background
 * che il primo passaggio generico aveva ignorato.
 */
function buildRetryPrompt(residualText: string[]): string {
  const items = residualText.length ? residualText.join(', ') : 'a third-party logo or contact still visible';
  return `This poster still has third-party branding visible: ${items}. Remove it completely — if it's on a small object (balloon, sign, banner), make that object plain/blank matching similar plain objects already in the scene. Do not change anything else: keep the "nightlifemilan.com" text, the WhatsApp number, and the Milan Nightlife badge already added exactly as they are, keep all people, lighting, and composition pixel-identical.`;
}

let cachedBadge: { base64: string; mediaType: string } | null | undefined;

/** Badge "Milan Nightlife — Event Service" (asset reale, mai generato
 * dall'AI — vedi memoria nightlife-poster-rebrand-standard). Cache
 * in-memory per la durata della run. */
async function loadBadge(): Promise<{ base64: string; mediaType: string } | null> {
  if (cachedBadge !== undefined) return cachedBadge;
  try {
    const buf = await readFile(path.join(process.cwd(), 'public/images/brand/milan-nightlife-badge.png'));
    cachedBadge = { base64: buf.toString('base64'), mediaType: 'image/png' };
  } catch (e) {
    console.error(`[posterPipeline] Badge asset not found: ${(e as Error).message}`);
    cachedBadge = null;
  }
  return cachedBadge;
}

async function editWithNanoBanana(
  imageBase64: string,
  mediaType: string,
  retryPrompt?: string,
  badge?: { base64: string; mediaType: string }
): Promise<{ buffer: Buffer; mediaType: string } | null> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [
      { text: retryPrompt || EDIT_PROMPT },
      { inline_data: { mime_type: mediaType, data: imageBase64 } },
    ];
    if (badge) parts.push({ inline_data: { mime_type: badge.mediaType, data: badge.base64 } });

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${IMAGE_EDIT_MODEL}:generateContent?key=${key}`,
      {
        method: 'POST',
        signal: controller.signal,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts }] }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const resultParts = data.candidates?.[0]?.content?.parts || [];
    const imagePart = resultParts.find((p: { inlineData?: { data?: string; mimeType?: string } }) => p.inlineData?.data);
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

/**
 * Le foto venue del sito sono .webp — formato rifiutato da Eventbrite
 * ("The image format is not allowed", scoperto correggendo un evento live
 * pubblicato con questo fallback). Conversione a JPEG con sharp (bundle
 * opzionale di Next.js, verificato disponibile anche nel runtime standalone
 * di Vercel). Se sharp non fosse disponibile per qualche motivo, meglio
 * fallire esplicitamente che pubblicare un'immagine in un formato rifiutato.
 */
async function toJpeg(buffer: Buffer): Promise<Buffer> {
  const sharp = (await import('sharp')).default;
  return sharp(buffer).jpeg({ quality: 85 }).toBuffer();
}

async function venueFallback(venueId: string, imageSlug: string): Promise<PosterResult | null> {
  const venue = venuesData.find((v) => v.id === venueId);
  if (!venue) return null;
  const imgPath = venue.gallery?.[0] || venue.image;
  if (!imgPath) return null;

  const downloaded = await downloadImage(`https://nightlifemilan.com${imgPath}`);
  if (!downloaded) return null;

  const jpegBuffer = await toJpeg(downloaded.buffer);
  const ext = 'jpg';
  return {
    buffer: jpegBuffer,
    contentType: 'image/jpeg',
    filename: `${imageSlug}-venue-fallback.${ext}`,
    source: 'venue-fallback',
  };
}

/** Applica SEMPRE il rebrand (badge + contatti/sito nostri), sulla venue
 * fallback compresa — vedi FASE P1: nessuna immagine pubblicata resta senza
 * badge, anche quando parte già pulita da branding di terzi. */
async function rebrand(buffer: Buffer, contentType: string, imageSlug: string): Promise<PosterResult | null> {
  const badge = await loadBadge();
  let currentBuffer = buffer;
  let currentMediaType = contentType;
  let retryPrompt: string | undefined;

  for (let attempt = 1; attempt <= MAX_EDIT_ATTEMPTS; attempt++) {
    const edited = await editWithNanoBanana(currentBuffer.toString('base64'), currentMediaType, retryPrompt, badge || undefined);
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
  return null;
}

/**
 * Processa la locandina di un evento — FASE P1: rebrand SEMPRE applicato
 * (badge + contatti/sito nostri), non solo quando c'è branding di terzi da
 * rimuovere. Irrecuperabile (es. persone reali con diritti d'immagine, o
 * editing fallito) → foto venue, con badge/contatti applicati comunque.
 */
export async function processPoster(posterUrl: string | undefined, venueId: string, imageSlug: string): Promise<PosterResult> {
  if (!posterUrl) {
    const rebranded = await rebrandVenueFallback(venueId, imageSlug);
    if (rebranded) return rebranded;
    throw new Error(`No poster and no venue fallback image for ${venueId}`);
  }

  const downloaded = await downloadImage(posterUrl);
  if (!downloaded) {
    const rebranded = await rebrandVenueFallback(venueId, imageSlug);
    if (rebranded) return rebranded;
    throw new Error(`Poster download failed and no venue fallback for ${venueId}`);
  }

  const base64 = downloaded.buffer.toString('base64');
  const inspection = await inspectWithVision(base64, downloaded.contentType);

  // Vision non disponibile (niente ANTHROPIC_API_KEY o errore) → non possiamo
  // garantire l'assenza di contatti terzi: fallback prudente, mai rischiare.
  if (!inspection) {
    const rebranded = await rebrandVenueFallback(venueId, imageSlug);
    if (rebranded) return rebranded;
    throw new Error(`Vision inspection unavailable and no venue fallback for ${venueId}`);
  }

  const rebranded = await rebrand(downloaded.buffer, downloaded.contentType, imageSlug);
  if (rebranded) return rebranded;

  const fallback = await rebrandVenueFallback(venueId, imageSlug);
  if (fallback) return fallback;
  throw new Error(`Poster unrecoverable and no venue fallback for ${venueId}`);
}

/** Foto venue passata comunque per il rebrand (badge + contatti nostri) — mai usata "nuda". */
async function rebrandVenueFallback(venueId: string, imageSlug: string): Promise<PosterResult | null> {
  const base = await venueFallback(venueId, imageSlug);
  if (!base) return null;
  const rebranded = await rebrand(base.buffer, base.contentType, imageSlug);
  return rebranded || base;
}

