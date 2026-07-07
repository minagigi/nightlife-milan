import { getVenueMeta } from './seoRewrite';
import type { ScoutedEvent } from './eventScout';

/**
 * Riscrittura SEO completa di un evento scoutato — Fase 3. A differenza di
 * lib/seoRewrite.ts (che riscrive solo title/desc/slug per gli eventi già
 * nostri), questo modulo genera anche la description HTML completa bilingue
 * e i metadati SEO dell'immagine, e applica esplicitamente le regole di
 * rebrand + anti-AI-tells (skill humanizer/humanizer-pro) perché il testo
 * sorgente proviene da un promoter terzo e va ripulito, non solo tradotto.
 */

const MODEL = 'claude-sonnet-5';

export interface RewrittenEvent {
  titleEn: string;
  titleIt: string;
  descriptionHtmlEn: string;
  descriptionHtmlIt: string;
  summaryEn: string;
  summaryIt: string;
  tags: string[];
  imageAltEn: string;
  imageAltIt: string;
  imageSlug: string;
  needsReview: boolean;
}

function clamp(s: string, max: number): string {
  const t = (s || '').replace(/\s+/g, ' ').trim();
  return t.length <= max ? t : t.slice(0, max - 1).trimEnd() + '…';
}

function slugify(text: string): string {
  return (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 70)
    .replace(/-$/, '');
}

const SYSTEM_PROMPT = `You are the copywriter for "Nightlife Milan", a luxury insider guide to Milan nightlife.

VOICE: insider, exclusive, confident, never try-hard. Specific over generic. No exclamation marks.
Banned words: stunning, amazing, ultimate, epic, iconic, unforgettable, vibrant, elevate, dive into, delve into, journey, tapestry, testament, boasts, seamless.

ANTI-AI-TELL RULES (the output must read like a Milan insider wrote it by hand, never like a chatbot):
- No "rule of three" list padding (e.g. "music, energy, and unforgettable moments"). Use ONE concrete detail instead of three vague ones.
- No em-dash chains or overuse — max one em-dash per paragraph, prefer periods.
- No vague attribution ("known for", "renowned for", "one of the best") — state the concrete fact instead (address, DJ name, price, dress code).
- No filler transition phrases ("in the heart of", "when it comes to", "look no further", "whether you're... or...").
- No superficial -ing clauses tacked onto sentences for fake depth ("creating an unforgettable atmosphere", "ensuring a night to remember").
- No promotional inflation ("stands as a testament to", "plays a vital role", "represents the best of").
- Vary sentence length (burstiness) — mix short punchy sentences with longer ones. Never uniform sentence length.
- Prefer active voice. Avoid hedging ("might", "could potentially", "it's worth noting").

TASK: rewrite a raw third-party Eventbrite event (scraped from a promoter's listing) into clean, SEO-optimized, bilingual (English + Italian) content for OUR site.

REBRAND RULES (critical — the source text is from a third-party promoter, not us):
- Remove ANY mention of promoters, agencies, PR companies, other phone numbers, social media handles, third-party websites, hashtags. The ONLY brand in the output is "Nightlife Milan". The ONLY contact is the literal placeholder token {{WHATSAPP}} — NEVER write an actual phone number yourself, always use that exact placeholder where a contact/CTA belongs.
- The VENUE name (e.g. "Just Me", "Pineta Club") is NOT a third-party brand — keep it, it's the location.
- Rewrite integrally — never copy phrases longer than a few words from the raw source text.
- Keep all factual data (date, time, venue, music genre, price) exactly as given. If a detail is uncertain, omit it — never invent.

OUTPUT — return ONLY a JSON object with these exact keys, no markdown, no prose:
{
  "titleEn": "max 75 chars, format '[Venue] — [Night] | Table & Guestlist [year]'",
  "titleIt": "max 75 chars, Italian equivalent",
  "descriptionHtmlEn": "300-450 words HTML (use <h2>/<p>/<ul> tags): hook (2 sentences) -> The Night (music/dress code/hours) -> VIP Tables & Guestlist -> Getting there (zone) -> CTA with {{WHATSAPP}}",
  "descriptionHtmlIt": "same structure in Italian",
  "summaryEn": "max 140 chars",
  "summaryIt": "max 140 chars",
  "tags": ["max 10 lowercase tags, style: milano nightlife, club milano, ..."],
  "imageAltEn": "SEO alt text max 125 chars: venue + night type + Milan",
  "imageAltIt": "SEO alt text max 125 chars in Italian",
  "imageSlug": "ascii-lowercase-hyphenated slug for the image filename, e.g. just-me-milano-saturday-night-2026-07-11"
}`;

async function callSonnet(event: ScoutedEvent, meta: { name: string; zone: string; locality: string }): Promise<Partial<RewrittenEvent> | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  const year = new Date(event.dateISO).getFullYear() || new Date().getFullYear();
  const userMsg = `Venue: ${meta.name} (zone: ${meta.zone}, ${meta.locality})
Event date: ${event.dateISO} (year ${year})
Entry price: ${event.entryPrice > 0 ? `€${event.entryPrice}` : 'free/unknown'}

Raw title (from third-party promoter, needs full rewrite): ${event.rawTitle}

Raw description (from third-party promoter, needs full rewrite, strip any contacts/brands): ${event.rawDescription.slice(0, 2000)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
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
        model: MODEL,
        // 4500 invece di 2500: claude-sonnet-5 usa extended thinking di default
        // (verificato: ~900-1000 thinking_tokens consumati prima dell'output),
        // che condivide il budget di max_tokens — con 2500 la risposta troncava
        // a metà JSON (stop_reason: max_tokens) e ogni evento finiva needsReview.
        max_tokens: 4500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMsg }],
      }),
    });
    if (!res.ok) {
      console.error(`[eventRewriter] Anthropic API ${res.status} for "${event.rawTitle}": ${(await res.text()).slice(0, 300)}`);
      return null;
    }

    const data = (await res.json()) as { stop_reason?: string; content: Array<{ type: string; text?: string }> };
    if (data.stop_reason === 'max_tokens') {
      console.error(`[eventRewriter] Response truncated (max_tokens) for "${event.rawTitle}" — output likely incomplete JSON`);
    }
    const text = data.content?.find((c) => c.type === 'text')?.text || '';
    const jsonStr = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    try {
      return JSON.parse(jsonStr) as Partial<RewrittenEvent>;
    } catch (parseErr) {
      console.error(`[eventRewriter] JSON parse failed for "${event.rawTitle}": ${(parseErr as Error).message}. Raw text (first 500 chars): ${text.slice(0, 500)}`);
      return null;
    }
  } catch (e) {
    console.error(`[eventRewriter] Fetch/abort error for "${event.rawTitle}": ${(e as Error).message}`);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Riscrive un evento scoutato. Se la chiamata AI fallisce o produce campi
 * mancanti/vuoti, ritorna `needsReview: true` — l'evento NON va mai pubblicato
 * in quel caso (vedi lib/eventPublisher.ts), solo loggato.
 */
export async function rewriteEvent(event: ScoutedEvent): Promise<RewrittenEvent> {
  const meta = getVenueMeta(event.venueId);
  const dateSlugPart = event.dateISO.slice(0, 10);

  const result = await callSonnet(event, meta);

  const required: (keyof RewrittenEvent)[] = [
    'titleEn', 'titleIt', 'descriptionHtmlEn', 'descriptionHtmlIt',
    'summaryEn', 'summaryIt', 'imageAltEn', 'imageAltIt', 'imageSlug',
  ];
  const missing = !result || required.some((k) => !result[k]) || !Array.isArray(result.tags) || result.tags.length === 0;

  if (missing) {
    if (result) {
      const missingFields = required.filter((k) => !result[k]);
      console.error(`[eventRewriter] needsReview for "${event.rawTitle}" — missing fields: ${missingFields.join(', ') || 'none'}, tags: ${JSON.stringify(result.tags)}`);
    } else {
      console.error(`[eventRewriter] needsReview for "${event.rawTitle}" — callSonnet returned null (see error above)`);
    }
    return {
      titleEn: '', titleIt: '', descriptionHtmlEn: '', descriptionHtmlIt: '',
      summaryEn: '', summaryIt: '', tags: [], imageAltEn: '', imageAltIt: '',
      imageSlug: slugify(`${meta.name}-${event.rawTitle}-${dateSlugPart}`),
      needsReview: true,
    };
  }

  return {
    titleEn: clamp(result.titleEn!, 75),
    titleIt: clamp(result.titleIt!, 75),
    descriptionHtmlEn: result.descriptionHtmlEn!,
    descriptionHtmlIt: result.descriptionHtmlIt!,
    summaryEn: clamp(result.summaryEn!, 140),
    summaryIt: clamp(result.summaryIt!, 140),
    tags: result.tags!.slice(0, 10),
    imageAltEn: clamp(result.imageAltEn!, 125),
    imageAltIt: clamp(result.imageAltIt!, 125),
    imageSlug: slugify(result.imageSlug || `${meta.name}-${event.rawTitle}-${dateSlugPart}`),
    needsReview: false,
  };
}
