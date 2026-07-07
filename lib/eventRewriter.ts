import { getVenueMeta } from './seoRewrite';
import { getVenuePricing } from './venuePricing';
import type { ScoutedEvent } from './eventScout';

/**
 * Riscrittura SEO gold-standard di un evento scoutato — v3 (FASE G3). A
 * differenza di lib/seoRewrite.ts (title/desc/slug per gli eventi già nostri),
 * questo modulo genera il corpo lungo (~2.000+ parole), 25 FAQ, programma e
 * SEO tag, poi li assembla con i blocchi statici (contatti/legal/listino) in
 * un'unica description TESTO SEMPLICE.
 *
 * IMPORTANTE (scoperto nello spike G0, con un evento draft di prova poi
 * eliminato): l'API pubblica di Eventbrite HTML-escapa qualunque tag ricevuto
 * su description — non è un editor rich text, i tag <p>/<h2>/<img> arrivano
 * visibili come testo letterale. La structured_content (dove vive davvero il
 * corpo HTML ricco con galleria/FAQ native/agenda nativa dell'evento gold
 * fatto a mano) è leggibile ma NON scrivibile via API pubblica (add_module
 * risponde 404, il publish della pagina risponde 400 con un errore interno
 * "Unrecognized service name structured_content" — funzionalità riservata
 * all'editor web interno). Per questo l'intero corpo gold va scritto come
 * testo semplice con newline/emoji/bullet, non HTML. Eventbrite resta
 * EN-only (il sito genera le sue pagine bilingui in autonomia da
 * seoRewrite.ts, non toccato).
 */

const MODEL = 'claude-sonnet-5';

export interface ProgrammeSlot {
  start: string;
  end?: string;
  title: string;
}

export interface RewrittenEvent {
  titleEn: string;
  summaryEn: string;
  hook: string;
  sections: { emoji: string; title: string; body: string }[];
  programme: ProgrammeSlot[];
  faqLong: { question: string; answer: string }[];
  seoTags: string[];
  ebTags: string[];
  imageAltEn: string;
  imageSlug: string;
  slugEn: string;
  descriptionPlainEn: string; // già assemblata + sanitizzata dal chiamante
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

const BODY_SYSTEM_PROMPT = `You are the copywriter for "Nightlife Milan", a luxury insider guide to Milan nightlife.

VOICE: insider, exclusive, confident, never try-hard. Specific over generic. No exclamation marks.
Banned words: stunning, amazing, ultimate, epic, iconic, unforgettable, vibrant, elevate, dive into, delve into, journey, tapestry, testament, boasts, seamless.

ANTI-AI-TELL RULES (must read like a Milan insider wrote it by hand, never like a chatbot):
- No "rule of three" list padding. Use ONE concrete detail instead of three vague ones.
- No em-dash chains — max one em-dash per paragraph, prefer periods.
- No vague attribution ("known for", "one of the best") — state the concrete fact (address, price, dress code, timing).
- No filler transitions ("in the heart of", "look no further", "whether you're... or...").
- No superficial -ing clauses tacked on for fake depth.
- Vary sentence length (burstiness). Prefer active voice. No hedging.

REBRAND RULES (source is a third-party promoter listing, not us):
- Remove ANY mention of promoters, agencies, other phone numbers, handles, third-party sites. The only brand is "Nightlife Milan". The only contact is the literal placeholder {{WHATSAPP}} — never invent a phone number.
- The VENUE name is not a third-party brand — keep it.
- Keep factual data (date, time, venue, music, price) exactly as given. Never invent details, DJ names, or experiences not present in the source.

TASK: produce the DYNAMIC content blocks of a long-form (gold-standard) English event listing — NOT the static blocks (contacts/legal/pricing are added separately by code). Base "sections" and "programme" ONLY on what the source material actually describes — if the source only mentions an aperitivo and a DJ set, write two sections, not four invented ones.

OUTPUT — return ONLY a JSON object with these exact keys, no markdown, no prose:
{
  "titleEn": "max 75 chars, format '[Experience] @ [Venue] - [Weekday] [Month Day] [Year]'",
  "summaryEn": "max 140 chars, with date + venue + {{WHATSAPP}}",
  "hook": "3-5 sentences, the experience in a nutshell, with proper nouns (venue, landmark, date)",
  "sections": [{"emoji": "🗼", "title": "SECTION TITLE", "body": "1-2 paragraphs, only real details from the source"}],
  "programme": [{"start": "19:30", "end": "22:00", "title": "practical, actionable description of this time slot"}],
  "seoTags": ["24 lowercase SEO keywords, e.g. milano nightlife, saturday night milan, ..."],
  "ebTags": ["18 snake_case tags, e.g. milan_nightlife, saturday_night, ..."],
  "imageAltEn": "SEO alt text max 125 chars: venue + night type + Milan",
  "imageSlug": "ascii-lowercase-hyphenated slug for the image filename"
}`;

const FAQ_SYSTEM_PROMPT = `You are the copywriter for "Nightlife Milan". Generate 25 SEO FAQ entries for a long-form Eventbrite event listing (the "gold standard" format).

Each answer: 50-70 words, keyword-rich, repeats the FULL date and venue name (this is deliberate SEO repetition, not padding). Cover these themes across the 25: night theme, location + transport, ticket link, aperitivo price, special-experience timing, club price, VIP table booking, table options, dinner, dress code, age policy, music, refunds, public transport, "Eventbrite is not a ticket" disclaimer, what the ticket includes, opening hours, VIP benefits, DJ, special experience, table drink policy, parking, concierge contact, birthdays/groups, why choose this venue.

Contact placeholder: use the literal token {{WHATSAPP}} wherever a phone/WhatsApp contact belongs — never invent a number. Never invent prices not given to you; if no table pricing was provided, keep that FAQ generic ("contact our concierge for options and pricing").

OUTPUT — return ONLY a JSON object: {"faqLong": [{"question": "...", "answer": "..."}, ... 25 items]}`;

interface BodyResult {
  titleEn: string; summaryEn: string; hook: string;
  sections: { emoji: string; title: string; body: string }[];
  programme: ProgrammeSlot[];
  seoTags: string[]; ebTags: string[];
  imageAltEn: string; imageSlug: string;
}
interface FaqResult { faqLong: { question: string; answer: string }[] }

async function callSonnetJSON<T>(system: string, userMsg: string, label: string): Promise<T | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  const controller = new AbortController();
  // 90s/8000 tok: il corpo gold-standard (~2000+ parole equivalenti tra le due
  // chiamate) richiede più budget della v2 (300-450 parole) — margini alzati
  // per evitare needsReview per semplice esaurimento token (visto in v2).
  const timeout = setTimeout(() => controller.abort(), 90000);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ model: MODEL, max_tokens: 8000, system, messages: [{ role: 'user', content: userMsg }] }),
    });
    if (!res.ok) {
      console.error(`[eventRewriter] Anthropic API ${res.status} (${label}): ${(await res.text()).slice(0, 300)}`);
      return null;
    }
    const data = (await res.json()) as { stop_reason?: string; content: Array<{ type: string; text?: string }> };
    if (data.stop_reason === 'max_tokens') {
      console.error(`[eventRewriter] Response truncated (max_tokens) for ${label} — output likely incomplete JSON`);
    }
    const text = data.content?.find((c) => c.type === 'text')?.text || '';
    const jsonStr = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    try {
      return JSON.parse(jsonStr) as T;
    } catch (parseErr) {
      console.error(`[eventRewriter] JSON parse failed (${label}): ${(parseErr as Error).message}. Raw (first 500): ${text.slice(0, 500)}`);
      return null;
    }
  } catch (e) {
    console.error(`[eventRewriter] Fetch/abort error (${label}): ${(e as Error).message}`);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/** Assembla la description finale (testo semplice) da parti statiche (codice) + dinamiche (AI). */
function assembleGoldDescription(
  body: BodyResult,
  faq: { question: string; answer: string }[],
  pricing: ReturnType<typeof getVenuePricing>,
  slugEn: string,
  ebId: string
): string {
  const lines: string[] = [];

  lines.push(body.hook, '');

  lines.push('CONTACTS & BOOKINGS');
  lines.push(`💬 WhatsApp: {{WHATSAPP}}`);
  lines.push(`✉️ Email: concierge@nightlifemilan.com`);
  lines.push(`🌐 Full event guide: https://nightlifemilan.com/events/${slugEn}`, '');

  lines.push('⚠️ IMPORTANT LEGAL NOTICE');
  lines.push('Online tickets are non-refundable. Refunds are only considered if admission is denied by club security at the entrance; requests must be submitted within 24 hours of the event. Eventbrite registrations represent information requests only and are not valid for entry on their own.', '');

  for (const s of body.sections) {
    lines.push(`${s.emoji} ${s.title.toUpperCase()}`);
    lines.push(s.body, '');
  }

  if (body.programme.length) {
    lines.push('🗓️ EVENING PROGRAMME');
    for (const slot of body.programme) {
      const time = slot.end ? `${slot.start}-${slot.end}` : slot.start;
      lines.push(`${time} — ${slot.title}`);
    }
    lines.push('');
  }

  if (pricing.ticketTiers?.length) {
    lines.push('🎟️ TICKETS');
    for (const t of pricing.ticketTiers) lines.push(`${t.name}: €${t.price} — ${t.includes}`);
    lines.push('');
  }

  lines.push('🍾 BOTTLE SERVICES / VIP TABLES');
  if (pricing.tableTiers?.length) {
    for (const t of pricing.tableTiers) lines.push(`${t.name}: €${t.price} (up to ${t.capacity} guests, ${t.includes})`);
  } else {
    lines.push('Contact our concierge for table options and pricing.');
  }
  lines.push('');

  lines.push(`👗 DRESS CODE: ${pricing.dressCode || 'Smart elegant. Management reserves the right to refuse entry.'}`);
  lines.push(`🚪 AGE: ${pricing.agePolicy}`);
  if (pricing.parking && pricing.parking !== 'none') {
    lines.push(`🅿️ PARKING: ${pricing.parking === 'free' ? 'Free onsite parking available.' : 'Paid parking available onsite.'}`);
  }
  lines.push('');

  lines.push('🔗 Link in bio • 💬 {{WHATSAPP}} • ✉️ concierge@nightlifemilan.com', '');

  lines.push('FAQ');
  faq.forEach((f, i) => lines.push(`Q${i + 1}: ${f.question}`, `A${i + 1}: ${f.answer}`));
  lines.push('');

  lines.push(`SEO TAGS: ${body.seoTags.join(', ')}`);
  lines.push(`EVENTBRITE TAGS: ${body.ebTags.join(', ')}`, '');

  // Marker canonico (testo semplice, basso peso visivo) — consumato da
  // eventbriteSync.ts per garantire lo stesso slug sito↔Eventbrite (FASE G4B).
  lines.push(`[nlm:src=${ebId};slug-en=${slugEn}]`);

  return lines.join('\n');
}

/**
 * Riscrive un evento scoutato al livello gold-standard. Se una delle due
 * chiamate AI fallisce o produce campi mancanti, ritorna `needsReview: true`
 * — l'evento NON va mai pubblicato in quel caso (vedi lib/eventPublisher.ts).
 */
export async function rewriteEvent(event: ScoutedEvent): Promise<RewrittenEvent> {
  const meta = getVenueMeta(event.venueId);
  const pricing = getVenuePricing(event.venueId);
  const dateSlugPart = event.dateISO.slice(0, 10);
  const year = new Date(event.dateISO).getFullYear() || new Date().getFullYear();

  const userMsg = `Venue: ${meta.name} (zone: ${meta.zone}, ${meta.locality})
Event date: ${event.dateISO} (year ${year})
Entry price: ${event.entryPrice > 0 ? `€${event.entryPrice}` : 'free/unknown'}

Raw title (from third-party promoter, needs full rewrite): ${event.rawTitle}

Raw description (from third-party promoter, needs full rewrite, strip any contacts/brands): ${event.rawDescription.slice(0, 2000)}`;

  const [bodyResult, faqResult] = await Promise.all([
    callSonnetJSON<BodyResult>(BODY_SYSTEM_PROMPT, userMsg, `body:${event.rawTitle}`),
    callSonnetJSON<FaqResult>(FAQ_SYSTEM_PROMPT, userMsg, `faq:${event.rawTitle}`),
  ]);

  const bodyRequired: (keyof BodyResult)[] = ['titleEn', 'summaryEn', 'hook', 'sections', 'programme', 'seoTags', 'ebTags', 'imageAltEn', 'imageSlug'];
  const bodyMissing = !bodyResult || bodyRequired.some((k) => {
    const v = bodyResult[k];
    return v === undefined || v === null || (Array.isArray(v) && v.length === 0) || v === '';
  });
  const faqMissing = !faqResult || !Array.isArray(faqResult.faqLong) || faqResult.faqLong.length < 15;

  if (bodyMissing || faqMissing) {
    console.error(`[eventRewriter] needsReview for "${event.rawTitle}" — bodyMissing=${bodyMissing} faqMissing=${faqMissing}`);
    return {
      titleEn: '', summaryEn: '', hook: '', sections: [], programme: [], faqLong: [],
      seoTags: [], ebTags: [], imageAltEn: '', imageSlug: slugify(`${meta.name}-${event.rawTitle}-${dateSlugPart}`),
      slugEn: '', descriptionPlainEn: '', needsReview: true,
    };
  }

  const titleEn = clamp(bodyResult!.titleEn, 75);
  const slugEn = slugify(`${titleEn}-${dateSlugPart}`) || slugify(`${meta.name}-${dateSlugPart}`);
  const descriptionPlainEn = assembleGoldDescription(bodyResult!, faqResult!.faqLong.slice(0, 25), pricing, slugEn, event.ebId);

  return {
    titleEn,
    summaryEn: clamp(bodyResult!.summaryEn, 140),
    hook: bodyResult!.hook,
    sections: bodyResult!.sections,
    programme: bodyResult!.programme,
    faqLong: faqResult!.faqLong.slice(0, 25),
    seoTags: bodyResult!.seoTags.slice(0, 24),
    ebTags: bodyResult!.ebTags.slice(0, 18),
    imageAltEn: clamp(bodyResult!.imageAltEn, 125),
    imageSlug: slugify(bodyResult!.imageSlug || `${meta.name}-${event.rawTitle}-${dateSlugPart}`),
    slugEn,
    descriptionPlainEn,
    needsReview: false,
  };
}
