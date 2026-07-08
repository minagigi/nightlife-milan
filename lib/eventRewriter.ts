import { getVenueMeta } from './seoRewrite';
import { sanitize } from './brandSanitizer';
import type { ScoutedEvent } from './eventScout';
import type { XceedEvent } from './xceedScout';

/**
 * Riscrittura SEO gold-standard di un evento scoutato — v3/v5. A differenza di
 * lib/seoRewrite.ts (title/desc/slug per gli eventi già nostri), questo modulo
 * genera il corpo lungo (~2.000+ parole), 25 FAQ, programma e SEO tag, in
 * ENTRAMBE le lingue (regola permanente: bilingue EN+IT, SEO nativa in
 * ciascuna, mai traduzione letterale — vedi memoria "nightlife-bilingual-seo-always").
 *
 * FASE B "eventi separati" (2026-07-08, richiesta esplicita utente): non un
 * unico evento Eventbrite con description mista — DUE eventi Eventbrite
 * distinti per ogni serata reale, uno interamente EN uno interamente IT
 * (lib/eventPublisher.ts pubblica entrambi). Questo modulo produce quindi due
 * description COMPLETE e indipendenti (`descriptionEn`/`descriptionIt`), non
 * una sola mista.
 *
 * IMPORTANTE (scoperto nello spike G0, con eventi draft di prova poi
 * eliminati): la description ACCETTA HTML vero (h2/h3/p/ul/li/a href sono
 * confermati scritti e letti intatti, link cliccabili inclusi) — NON va
 * scritta come testo semplice. Le uniche eccezioni instabili sono `<img>`
 * (URL con query string complesse fanno collassare tutto il payload in testo
 * escapato) e `<br/>` self-closing — evitare entrambi, usare `<p>` separati
 * per gli a capo. La structured_content (dove vive davvero la galleria/FAQ
 * native/agenda nativa dell'evento gold fatto a mano) è leggibile ma NON
 * scrivibile via API pubblica (add_module risponde 404, il publish della
 * pagina risponde 400 con un errore interno "Unrecognized service name
 * structured_content" — funzionalità riservata all'editor web interno).
 *
 * FASE B0 (piano bilingual-everywhere, 2026-07-08): il "tetto ~1.300
 * caratteri" scoperto in FASE X4 era in realtà causato dalle EMOJI usate in
 * quei test, mai isolate dalla lunghezza — un evento draft ha retto INTATTO
 * fino a 23.288 caratteri di HTML emoji-free (bisezione reale, marker
 * incluso). Il vero vincolo è "niente emoji/<img>/<br/>", non la lunghezza:
 * ogni description (EN o IT) ospita quindi il corpo gold-standard COMPLETO
 * per quella lingua (hook, tutte le sezioni, programma, tutte le 25 FAQ).
 */

const MODEL = 'claude-sonnet-5';

export type Lang = 'en' | 'it';

export interface ProgrammeSlot {
  start: string;
  end?: string;
  title: string;
  titleIt: string;
}

export interface RewrittenEvent {
  titleEn: string;
  titleIt: string;
  summaryEn: string;
  summaryIt: string;
  hook: string;
  hookIt: string;
  sections: { emoji: string; title: string; titleIt: string; body: string; bodyIt: string }[];
  programme: ProgrammeSlot[];
  faqLong: { question: string; questionIt: string; answer: string; answerIt: string }[];
  seoTags: string[];
  seoTagsIt: string[];
  ebTags: string[];
  imageAltEn: string;
  imageAltIt: string;
  imageSlug: string;
  slugEn: string; // slug canonico del sito (usato per entrambe le pagine locale: /events/{slug} e /it/events/{slug})
  descriptionEn: string; // description COMPLETA per l'evento Eventbrite EN, già sanitizzata
  descriptionIt: string; // description COMPLETA per l'evento Eventbrite IT, già sanitizzata
  needsReview: boolean;
  debugError?: string;
}

// Esportate per scripts/prepare-event.ts (FASE L3, pipeline locale
// senza API): lo script deve produrre BYTE-PER-BYTE lo stesso output del
// server, mai una reimplementazione parallela.
export function clamp(s: string, max: number): string {
  const t = (s || '').replace(/\s+/g, ' ').trim();
  return t.length <= max ? t : t.slice(0, max - 1).trimEnd() + '…';
}

export function slugify(text: string): string {
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

// Esportati per la skill locale (FASE L3): stessi prompt esatti che
// userebbe la chiamata server-side, seguiti a mano da Claude Code in
// sessione invece che da una richiesta HTTP ad Anthropic.
export const BODY_SYSTEM_PROMPT = `You are the copywriter for "Nightlife Milan", a luxury insider guide to Milan nightlife.

VOICE: insider, exclusive, confident, never try-hard. Specific over generic. No exclamation marks.
Banned words (English): stunning, amazing, ultimate, epic, iconic, unforgettable, vibrant, elevate, dive into, delve into, journey, tapestry, testament, boasts, seamless.
Banned words (Italian): imperdibile, esclusivo (se ripetuto ovunque), da non perdere, location, mozzafiato, nel cuore di, un'esperienza unica.

ANTI-AI-TELL RULES in BOTH languages (must read like a Milan insider wrote it by hand, never like a chatbot):
- No "rule of three" list padding. Use ONE concrete detail instead of three vague ones.
- No em-dash chains — max one em-dash per paragraph, prefer periods.
- No vague attribution ("known for" / "conosciuto per") — state the concrete fact (address, price, dress code, timing).
- No filler transitions ("in the heart of" / "nel cuore di", "look no further").
- Vary sentence length (burstiness). Prefer active voice. No hedging.

REBRAND RULES (source is a third-party promoter listing, not us):
- Remove ANY mention of promoters, agencies, other phone numbers, handles, third-party sites. The only brand is "Nightlife Milan". The only contact is the literal placeholder {{WHATSAPP}} — never invent a phone number.
- The VENUE name is not a third-party brand — keep it.
- Keep factual data (date, time, venue, music, price) exactly as given. Never invent details, DJ names, or experiences not present in the source.

BILINGUAL RULE (permanent, applies to every field with an "It" counterpart): the Italian field is a GENUINE, independently-written Italian version targeting native Italian search intent and keywords (e.g. "cosa fare a milano sabato sera", "discoteche milano", "tavoli vip milano", "aperitivo milano") — NOT a literal translation of the English. Same facts, same voice, own SEO logic per language.

TASK: produce the DYNAMIC content blocks of a long-form (gold-standard) event listing, in BOTH languages — NOT the static blocks (contacts/legal/pricing are added separately by code). Base "sections" and "programme" ONLY on what the source material actually describes.

OUTPUT — return ONLY a JSON object with these exact keys, no markdown, no prose:
{
  "titleEn": "max 75 chars, format '[Experience] @ [Venue] - [Weekday] [Month Day] [Year]'",
  "titleIt": "max 75 char, stesso formato in italiano ('[Esperienza] @ [Venue] - [Giorno] [Data]')",
  "summaryEn": "max 140 chars, with date + venue + {{WHATSAPP}}",
  "summaryIt": "max 140 caratteri, data + venue + {{WHATSAPP}}, in italiano",
  "hook": "3-5 sentences, the experience in a nutshell, with proper nouns (venue, landmark, date)",
  "hookIt": "3-5 frasi, la stessa esperienza in sintesi, in italiano nativo (non traduzione letterale)",
  "sections": [{"emoji": "🗼", "title": "SECTION TITLE (English)", "titleIt": "TITOLO SEZIONE (italiano)", "body": "1-2 paragraphs in English, only real details from the source", "bodyIt": "1-2 paragrafi in italiano nativo, stessi fatti, stessa voce"}],
  "programme": [{"start": "19:30", "end": "22:00", "title": "practical, actionable description of this time slot (English)", "titleIt": "stessa descrizione in italiano"}],
  "seoTags": ["24 lowercase English SEO keywords, e.g. milano nightlife, saturday night milan, ..."],
  "seoTagsIt": ["24 keyword italiane REALI di ricerca (non traduzioni letterali delle EN), es. discoteche milano, sabato sera milano, tavoli vip milano, cosa fare a milano stasera, ..."],
  "ebTags": ["18 snake_case tags, e.g. milan_nightlife, saturday_night, ..."],
  "imageAltEn": "SEO alt text max 125 chars: venue + night type + Milan",
  "imageAltIt": "alt text SEO max 125 caratteri in italiano",
  "imageSlug": "ascii-lowercase-hyphenated slug for the image filename"
}`;

export const FAQ_SYSTEM_PROMPT = `You are the copywriter for "Nightlife Milan". Generate 25 SEO FAQ entries for a long-form Eventbrite event listing (the "gold standard" format), in BOTH English and Italian.

VOICE: insider, exclusive, confident, never try-hard. No exclamation marks. No vague attribution.

Each answer: 50-70 words, keyword-rich, repeats the FULL date and venue name (deliberate SEO repetition). Cover these themes across the 25: night theme, location + transport, ticket link, aperitivo price, special-experience timing, club price, VIP table booking, table options, dinner, dress code, age policy, music, refunds, public transport, "Eventbrite is not a ticket" disclaimer, what the ticket includes, opening hours, VIP benefits, DJ, special experience, table drink policy, parking, concierge contact, birthdays/groups, why choose this venue.

Contact placeholder: use the literal token {{WHATSAPP}} wherever a phone/WhatsApp contact belongs — never invent a number. Never invent prices, DJ names, or details not given to you.

BILINGUAL RULE (permanent): questionIt/answerIt are a GENUINE Italian version with native Italian search-query phrasing and keywords, NOT a literal translation. Same length target (50-70 words), same {{WHATSAPP}} placeholder.

OUTPUT — return ONLY a JSON object: {"faqLong": [{"question": "... (English)", "questionIt": "... (italiano, ricerca nativa)", "answer": "... (English)", "answerIt": "... (italiano)"}, ... 25 items]}`;

export interface BodyResult {
  titleEn: string; titleIt: string; summaryEn: string; summaryIt: string; hook: string; hookIt: string;
  sections: { emoji: string; title: string; titleIt: string; body: string; bodyIt: string }[];
  programme: ProgrammeSlot[];
  seoTags: string[]; seoTagsIt: string[]; ebTags: string[];
  imageAltEn: string; imageAltIt: string; imageSlug: string;
}
export interface FaqResult { faqLong: { question: string; questionIt: string; answer: string; answerIt: string }[] }

interface SonnetResult<T> { data: T | null; error?: string }

async function callSonnetJSON<T>(system: string, userMsg: string, label: string): Promise<SonnetResult<T>> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { data: null, error: 'ANTHROPIC_API_KEY not set' };

  const controller = new AbortController();
  // 120s/16000 tok: l'output bilingue (corpo+FAQ raddoppiati) richiede più
  // margine del v3 EN-only — visto un troncamento reale (max_tokens) durante
  // FASE X3 con un budget più basso.
  const timeout = setTimeout(() => controller.abort(), 120000);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ model: MODEL, max_tokens: 16000, system, messages: [{ role: 'user', content: userMsg }] }),
    });
    if (!res.ok) {
      const errText = `Anthropic API ${res.status} (${label}): ${(await res.text()).slice(0, 300)}`;
      console.error(`[eventRewriter] ${errText}`);
      return { data: null, error: errText };
    }
    const data = (await res.json()) as { stop_reason?: string; content: Array<{ type: string; text?: string }> };
    if (data.stop_reason === 'max_tokens') {
      console.error(`[eventRewriter] Response truncated (max_tokens) for ${label} — output likely incomplete JSON`);
    }
    const text = data.content?.find((c) => c.type === 'text')?.text || '';
    const jsonStr = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    try {
      return { data: JSON.parse(jsonStr) as T };
    } catch (parseErr) {
      const errText = `JSON parse failed (${label}): ${(parseErr as Error).message}. Raw (first 500): ${text.slice(0, 500)}`;
      console.error(`[eventRewriter] ${errText}`);
      return { data: null, error: errText };
    }
  } catch (e) {
    const errText = `Fetch/abort error (${label}): ${(e as Error).message}`;
    console.error(`[eventRewriter] ${errText}`);
    return { data: null, error: errText };
  } finally {
    clearTimeout(timeout);
  }
}

function esc(s: string): string {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Rimuove emoji/simboli pittografici — scoperto nello spike G0 (bisezione su
// un evento reale già pubblicato, con immagine vera assegnata): un'emoji in
// QUALUNQUE punto della description rompe il parser di Eventbrite, che
// tronca silenziosamente tutto da lì in poi. Il sito (blob/pagina) non ha
// questo vincolo e mantiene le emoji per la UX.
function stripEmoji(s: string): string {
  return (s || '').replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, '').replace(/\s{2,}/g, ' ').trim();
}

// Budget di sicurezza per description (FASE B0): confermato che 23.288
// caratteri emoji-free sopravvivono intatti su un evento reale — questo
// budget resta al 70% di quella soglia misurata per margine, non perché
// serva davvero (una description gold-standard in una sola lingua, anche con
// 25 FAQ, entra comodamente ben sotto questo tetto).
const DESCRIPTION_SAFE_BUDGET = 16000;

const STATIC_TEXT: Record<Lang, {
  contactsLabel: string; emailLabel: string; buyTickets: string; bookTable: string; fullGuide: string;
  legal: string; ticketName: string; ticketDescription: (phone: string) => string;
}> = {
  en: {
    contactsLabel: 'WhatsApp',
    emailLabel: 'Email',
    buyTickets: 'BUY TICKETS — Official link',
    bookTable: 'BOOK A TABLE — VIP &amp; Bottle Service',
    fullGuide: 'Full event guide, programme and FAQ',
    legal: 'IMPORTANT: Eventbrite registrations are information requests only, not valid for entry on their own. Online tickets are non-refundable except if entry is denied by security.',
    ticketName: 'RESERVATION TICKET - PAY AT THE DOOR - NOT FREE',
    ticketDescription: (phone) => `This listing is only a reservation request and NOT a real ticket purchase.\nTo be accredited/confirmed, you must contact Luis Nightlife at ${phone}.`,
  },
  it: {
    contactsLabel: 'WhatsApp',
    emailLabel: 'Email',
    buyTickets: 'ACQUISTA I BIGLIETTI — Link ufficiale',
    bookTable: 'PRENOTA UN TAVOLO — VIP e Bottiglie',
    fullGuide: 'Guida completa, programma e FAQ',
    legal: 'IMPORTANTE: le iscrizioni Eventbrite sono solo richieste di informazioni, non valide da sole per l\'ingresso. I biglietti online non sono rimborsabili salvo negazione dell\'ingresso da parte della sicurezza.',
    ticketName: 'PRENOTAZIONE - PAGAMENTO IN LOCO - NON GRATUITO',
    ticketDescription: (phone) => `Questo annuncio è solo una richiesta di prenotazione e NON un vero acquisto di biglietto.\nPer essere accreditato/confermato devi contattare Luis Nightlife al ${phone}.`,
  },
};

export function getTicketText(lang: Lang) {
  return { name: STATIC_TEXT[lang].ticketName, description: STATIC_TEXT[lang].ticketDescription };
}

/**
 * Assembla la description COMPLETA in una sola lingua (hook, tutte le
 * sezioni, tutto il programma, tutte le 25 FAQ, contatti/legal/link/marker) —
 * ogni lingua è un evento Eventbrite SEPARATO (vedi lib/eventPublisher.ts),
 * mai un'unica description mista. Se il totale eccede DESCRIPTION_SAFE_BUDGET
 * (raro: solo con FAQ molto lunghe), si accorciano prima le FAQ in coda,
 * MAI l'hook o i blocchi statici (contatti/legal/marker sono innegoziabili).
 */
function assembleGoldDescriptionForLang(
  body: BodyResult,
  faq: { question: string; questionIt: string; answer: string; answerIt: string }[],
  slugEn: string,
  ebIdBase: string,
  lang: Lang,
  affiliateUrl?: string
): string {
  const t = STATIC_TEXT[lang];
  const marker = `<!-- nlm:src=${ebIdBase}-${lang};slug-en=${slugEn} -->`;
  const siteUrl = lang === 'en' ? `https://nightlifemilan.com/events/${slugEn}` : `https://nightlifemilan.com/it/events/${slugEn}`;

  const links = affiliateUrl
    ? `<p><a href="${affiliateUrl}">${t.buyTickets}</a></p>` +
      `<p><a href="${affiliateUrl}">${t.bookTable}</a></p>` +
      `<p><a href="${siteUrl}">${t.fullGuide}</a></p>`
    : `<p><a href="${siteUrl}">${t.fullGuide}: ${siteUrl}</a></p>`;

  const contacts = `<p>${t.contactsLabel}: {{WHATSAPP}} - ${t.emailLabel}: concierge@nightlifemilan.com</p>${links}`;
  const legal = `<p>${t.legal}</p>`;

  const hookText = lang === 'en' ? body.hook : body.hookIt;
  const hookBlock = `<p>${esc(stripEmoji(hookText))}</p>`;

  const sectionsBlock = body.sections.map((s) => {
    const title = lang === 'en' ? s.title : s.titleIt;
    const sBody = lang === 'en' ? s.body : s.bodyIt;
    return `<h2>${esc(stripEmoji(title))}</h2><p>${esc(stripEmoji(sBody))}</p>`;
  }).join('');

  const programmeItems = body.programme.map((slot) => {
    const title = lang === 'en' ? slot.title : slot.titleIt;
    const time = slot.end ? `${slot.start}-${slot.end}` : slot.start;
    return `<li>${esc(time)} - ${esc(stripEmoji(title))}</li>`;
  }).join('');
  const programmeHeading = lang === 'en' ? 'Evening Programme' : 'Programma della Serata';
  const programmeBlock = body.programme.length ? `<h2>${programmeHeading}</h2><ul>${programmeItems}</ul>` : '';

  const faqHeading = lang === 'en' ? 'FAQ' : 'Domande Frequenti';
  const buildFaqBlock = (items: typeof faq) => items.map((f) => {
    const q = lang === 'en' ? f.question : f.questionIt;
    const a = lang === 'en' ? f.answer : f.answerIt;
    return `<h3>${esc(stripEmoji(q))}</h3><p>${esc(stripEmoji(a))}</p>`;
  }).join('');

  const seoTags = lang === 'en' ? body.seoTags : body.seoTagsIt;
  const tagsBlock = `<p>SEO: ${esc(seoTags.join(', '))}</p>`;

  const fixedBlocks = hookBlock + `<h2>Contacts</h2>${contacts}` + legal + sectionsBlock + programmeBlock;
  const fixedLength = fixedBlocks.length + tagsBlock.length + marker.length + `<h2>${faqHeading}</h2>`.length;

  // Includi quante più FAQ possibile entro il budget, mai zero se ce n'è almeno una.
  let includedFaq = faq.length;
  let faqBlock = buildFaqBlock(faq);
  while (fixedLength + faqBlock.length > DESCRIPTION_SAFE_BUDGET && includedFaq > 1) {
    includedFaq -= 1;
    faqBlock = buildFaqBlock(faq.slice(0, includedFaq));
  }
  if (includedFaq < faq.length) {
    console.error(`[eventRewriter] FAQ troncate per budget (${lang}): ${includedFaq}/${faq.length} incluse nella description Eventbrite (tutte e 25 restano comunque sul sito).`);
  }

  return fixedBlocks + `<h2>${faqHeading}</h2>${faqBlock}` + tagsBlock + marker;
}

interface AssembledDescriptions { descriptionEn: string; descriptionIt: string }

export function assembleBothDescriptions(
  body: BodyResult,
  faq: { question: string; questionIt: string; answer: string; answerIt: string }[],
  slugEn: string,
  ebIdBase: string,
  affiliateUrl?: string
): AssembledDescriptions {
  return {
    descriptionEn: assembleGoldDescriptionForLang(body, faq, slugEn, ebIdBase, 'en', affiliateUrl),
    descriptionIt: assembleGoldDescriptionForLang(body, faq, slugEn, ebIdBase, 'it', affiliateUrl),
  };
}

const BODY_REQUIRED: (keyof BodyResult)[] = [
  'titleEn', 'titleIt', 'summaryEn', 'summaryIt', 'hook', 'hookIt', 'sections', 'programme',
  'seoTags', 'seoTagsIt', 'ebTags', 'imageAltEn', 'imageAltIt', 'imageSlug',
];

export function isBodyMissing(bodyResult: BodyResult | null): boolean {
  return !bodyResult || BODY_REQUIRED.some((k) => {
    const v = bodyResult[k];
    return v === undefined || v === null || (Array.isArray(v) && v.length === 0) || v === '';
  });
}

function emptyRewrittenEvent(imageSlug: string, debugError?: string): RewrittenEvent {
  return {
    titleEn: '', titleIt: '', summaryEn: '', summaryIt: '', hook: '', hookIt: '',
    sections: [], programme: [], faqLong: [], seoTags: [], seoTagsIt: [], ebTags: [],
    imageAltEn: '', imageAltIt: '', imageSlug, slugEn: '', descriptionEn: '', descriptionIt: '',
    needsReview: true,
    debugError,
  };
}

/**
 * Riscrive un evento scoutato al livello gold-standard, in ENTRAMBE le
 * lingue. Se una delle due chiamate AI fallisce o produce campi mancanti,
 * ritorna `needsReview: true` — l'evento NON va mai pubblicato in quel caso
 * (vedi lib/eventPublisher.ts).
 */
export async function rewriteEvent(event: ScoutedEvent, knownOrganizers: string[] = []): Promise<RewrittenEvent> {
  const meta = getVenueMeta(event.venueId);
  const dateSlugPart = event.dateISO.slice(0, 10);
  const year = new Date(event.dateISO).getFullYear() || new Date().getFullYear();

  const userMsg = `Venue: ${meta.name} (zone: ${meta.zone}, ${meta.locality})
Event date: ${event.dateISO} (year ${year})
Entry price: ${event.entryPrice > 0 ? `€${event.entryPrice}` : 'free/unknown'}

Raw title (from third-party promoter, needs full rewrite): ${event.rawTitle}

Raw description (from third-party promoter, needs full rewrite, strip any contacts/brands): ${event.rawDescription.slice(0, 2000)}`;

  const [bodyRes, faqRes] = await Promise.all([
    callSonnetJSON<BodyResult>(BODY_SYSTEM_PROMPT, userMsg, `body:${event.rawTitle}`),
    callSonnetJSON<FaqResult>(FAQ_SYSTEM_PROMPT, userMsg, `faq:${event.rawTitle}`),
  ]);
  const bodyResult = bodyRes.data;
  const faqResult = faqRes.data;

  const bodyMissing = isBodyMissing(bodyResult);
  const faqMissing = !faqResult || !Array.isArray(faqResult.faqLong) || faqResult.faqLong.length < 15;

  if (bodyMissing || faqMissing) {
    const debugError = [bodyMissing && (bodyRes.error || 'body fields missing'), faqMissing && (faqRes.error || 'faq fields missing')].filter(Boolean).join(' | ');
    console.error(`[eventRewriter] needsReview for "${event.rawTitle}" — bodyMissing=${bodyMissing} faqMissing=${faqMissing} — ${debugError}`);
    return emptyRewrittenEvent(slugify(`${meta.name}-${event.rawTitle}-${dateSlugPart}`), debugError);
  }

  const titleEn = clamp(bodyResult!.titleEn, 75);
  const slugEn = slugify(`${titleEn}-${dateSlugPart}`) || slugify(`${meta.name}-${dateSlugPart}`);
  // Sanitize SOLO gli hook (testo AI derivato da una fonte di terzi) PRIMA
  // dell'assemblaggio — mai sul risultato finale già assemblato (contatti/
  // link/legal/marker sono codice, sanitize() li corromperebbe, vedi
  // resolveWhatsappOnly in lib/brandSanitizer.ts).
  const sanitizedBody: BodyResult = {
    ...bodyResult!,
    hook: sanitize(bodyResult!.hook, knownOrganizers),
    hookIt: sanitize(bodyResult!.hookIt, knownOrganizers),
  };
  const faq25 = faqResult!.faqLong.slice(0, 25);
  const { descriptionEn, descriptionIt } = assembleBothDescriptions(sanitizedBody, faq25, slugEn, event.ebId);

  return {
    titleEn, titleIt: clamp(bodyResult!.titleIt, 75),
    summaryEn: clamp(bodyResult!.summaryEn, 140), summaryIt: clamp(bodyResult!.summaryIt, 140),
    hook: sanitizedBody.hook, hookIt: sanitizedBody.hookIt,
    sections: bodyResult!.sections,
    programme: bodyResult!.programme,
    faqLong: faq25,
    seoTags: bodyResult!.seoTags.slice(0, 24), seoTagsIt: bodyResult!.seoTagsIt.slice(0, 24),
    ebTags: bodyResult!.ebTags.slice(0, 18),
    imageAltEn: clamp(bodyResult!.imageAltEn, 125), imageAltIt: clamp(bodyResult!.imageAltIt, 125),
    imageSlug: slugify(bodyResult!.imageSlug || `${meta.name}-${event.rawTitle}-${dateSlugPart}`),
    slugEn,
    descriptionEn, descriptionIt,
    needsReview: false,
  };
}

/**
 * Riscrive un evento Xceed (dati UFFICIALI del venue: prezzi/orari/dress
 * code/età reali) al livello gold-standard, in ENTRAMBE le lingue — FASE X3/B.
 * A differenza di rewriteEvent (fonte scout Eventbrite, dati poveri/di
 * terzi), qui la sorgente è ricca e autorevole: sezioni/FAQ derivano da
 * offers/dress/age/doors REALI, mai inventati. Il marker usa il prefisso
 * "xc-{id}-{lang}" per distinguere il ledger di questa sorgente (per
 * lingua) da quello dello scout Eventbrite (lib/xceedLedger.ts vs
 * lib/importLedger.ts).
 */
export async function rewriteXceedEvent(event: XceedEvent): Promise<RewrittenEvent> {
  const meta = getVenueMeta(event.venueId);
  const dateSlugPart = event.startISO.slice(0, 10);
  const year = new Date(event.startISO).getFullYear() || new Date().getFullYear();

  const offersText = event.offers
    .map((o) => `- ${o.name} (${o.category}): ${o.price === 0 ? 'Free' : `€${o.price}`}`)
    .join('\n');

  const userMsg = `Venue: ${meta.name} (zone: ${meta.zone}, ${meta.locality})
Event date: ${event.startISO} (year ${year})
Official event name: ${event.name}
Age policy (official, real): ${event.ageRange || 'not specified'}
Dress code (official, real): ${event.dressCode || 'not specified'}
Doors open (official, real, UTC time): ${event.doorsOpen || 'not specified'}
Music genres (official): ${event.genres.join(', ') || 'not specified'}

Official tickets/guest lists/tables for THIS event (real prices, from the venue's own booking platform — use these EXACT names and prices, never invent others):
${offersText || '(no offers listed)'}

Official event description (from the venue's own booking platform, may be a shared venue blurb — do not copy verbatim, rewrite in our voice):
${event.description.slice(0, 2000)}`;

  const [bodyRes, faqRes] = await Promise.all([
    callSonnetJSON<BodyResult>(BODY_SYSTEM_PROMPT, userMsg, `xc-body:${event.name}`),
    callSonnetJSON<FaqResult>(FAQ_SYSTEM_PROMPT, userMsg, `xc-faq:${event.name}`),
  ]);
  const bodyResult = bodyRes.data;
  const faqResult = faqRes.data;

  const bodyMissing = isBodyMissing(bodyResult);
  const faqMissing = !faqResult || !Array.isArray(faqResult.faqLong) || faqResult.faqLong.length < 15;
  const xcEbIdBase = `xc-${event.xceedId}`;

  if (bodyMissing || faqMissing) {
    const debugError = [bodyMissing && (bodyRes.error || 'body fields missing'), faqMissing && (faqRes.error || 'faq fields missing')].filter(Boolean).join(' | ');
    console.error(`[eventRewriter] needsReview for Xceed "${event.name}" — bodyMissing=${bodyMissing} faqMissing=${faqMissing} — ${debugError}`);
    return emptyRewrittenEvent(slugify(`${meta.name}-${event.name}-${dateSlugPart}`), debugError);
  }

  const titleEn = clamp(bodyResult!.titleEn, 75);
  const slugEn = slugify(`${titleEn}-${dateSlugPart}`) || slugify(`${meta.name}-${dateSlugPart}`);
  const sanitizedBody: BodyResult = {
    ...bodyResult!,
    hook: sanitize(bodyResult!.hook, []),
    hookIt: sanitize(bodyResult!.hookIt, []),
  };
  const faq25 = faqResult!.faqLong.slice(0, 25);
  const { descriptionEn, descriptionIt } = assembleBothDescriptions(sanitizedBody, faq25, slugEn, xcEbIdBase, event.affiliateUrl);

  return {
    titleEn, titleIt: clamp(bodyResult!.titleIt, 75),
    summaryEn: clamp(bodyResult!.summaryEn, 140), summaryIt: clamp(bodyResult!.summaryIt, 140),
    hook: sanitizedBody.hook, hookIt: sanitizedBody.hookIt,
    sections: bodyResult!.sections,
    programme: bodyResult!.programme,
    faqLong: faq25,
    seoTags: bodyResult!.seoTags.slice(0, 24), seoTagsIt: bodyResult!.seoTagsIt.slice(0, 24),
    ebTags: bodyResult!.ebTags.slice(0, 18),
    imageAltEn: clamp(bodyResult!.imageAltEn, 125), imageAltIt: clamp(bodyResult!.imageAltIt, 125),
    imageSlug: slugify(bodyResult!.imageSlug || `${meta.name}-${event.name}-${dateSlugPart}`),
    slugEn,
    descriptionEn, descriptionIt,
    needsReview: false,
  };
}
