import { getLocaleDef, type LocaleCode } from './i18n/locales';

/**
 * FASE L1/L3 (piano 2026-07-10-multilingual-strategy): traduzione/localizzazione
 * dei listing Eventbrite dal master EN verso qualsiasi lingua del registry.
 *
 * Un master, N localizzazioni: l'EN resta generato nativamente dal rewriter;
 * qui si traduce il listing GIÀ ASSEMBLATO (title + summary + description HTML),
 * preservando la struttura HTML e i token brand intoccabili.
 *
 * Modello per tier (lib/i18n/locales.ts): Tier A → Sonnet (localizzazione con
 * fraseggio di ricerca nativo), Tier B → Haiku (traduzione fedele, bulk economico).
 */

const SONNET = 'claude-sonnet-5';
const HAIKU = 'claude-haiku-4-5-20251001';

export interface ListingTranslation {
  title: string;
  summary: string;
  descriptionHtml: string;
  ticketName: string;
  ticketDescription: string;
}

interface TranslateListingInput {
  titleEn: string;
  summaryEn: string;
  /** Description HTML EN SENZA il marker nlm:src (va strippato prima e riappeso dopo dal chiamante) */
  descriptionHtmlEn: string;
  ticketNameEn: string;
  ticketDescriptionEn: string;
  targetLocale: LocaleCode;
}

const SYSTEM_PROMPT = `You are the professional translator-localizer for "Nightlife Milan", a luxury Milan nightlife guide. You translate Eventbrite event listings from English into a target language.

NON-NEGOTIABLE RULES:
1. Preserve ALL HTML tags, attributes and structure EXACTLY as in the source. Translate only the human-readable text between tags.
2. NEVER translate or alter: URLs and hrefs, the WhatsApp number +39 351 912 7047, venue names (Just Me, Aria Club, La Pineta, etc.), the brand "Nightlife Milan", prices and currency amounts, times and dates in numeric form, HTML comments.
3. NO emoji anywhere in the description HTML (hard technical constraint of the destination platform).
4. "title" max 75 characters. "summary" max 140 characters. Keep both punchy and natural in the target language — these are search-facing.
5. Tone: insider, confident, never salesy. Natural native phrasing for nightlife search intent in the target language (what a native would actually type and read), NOT literal word-by-word translation. Keep the same facts — never invent or drop information.
6. Nightlife terms: keep "aperitivo" and "guestlist" untranslated where natural in the target language; "VIP table" and "bottle service" use the standard native equivalent if one is widely used.

OUTPUT: return ONLY a JSON object, no prose:
{"title": "...", "summary": "...", "descriptionHtml": "...", "ticketName": "...", "ticketDescription": "..."}`;

function extractJson(text: string): Record<string, string> | null {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

/** Ultimo errore (diagnostica via route ?dryRun — mai in risposta pubblica) */
export let lastTranslatorError: string | null = null;

export async function translateListing(input: TranslateListingInput): Promise<ListingTranslation | null> {
  lastTranslatorError = null;
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    lastTranslatorError = 'ANTHROPIC_API_KEY not set';
    console.error('[contentTranslator] ANTHROPIC_API_KEY not set');
    return null;
  }
  const def = getLocaleDef(input.targetLocale);
  if (!def) {
    lastTranslatorError = `Unknown locale "${input.targetLocale}"`;
    console.error(`[contentTranslator] Unknown locale "${input.targetLocale}"`);
    return null;
  }

  const model = def.tier === 'A' ? SONNET : HAIKU;
  const userMsg =
    `TARGET LANGUAGE: ${def.englishName} (${def.code})\n\n` +
    `TITLE (EN):\n${input.titleEn}\n\n` +
    `SUMMARY (EN):\n${input.summaryEn}\n\n` +
    `TICKET NAME (EN):\n${input.ticketNameEn}\n\n` +
    `TICKET DESCRIPTION (EN):\n${input.ticketDescriptionEn}\n\n` +
    `DESCRIPTION HTML (EN):\n${input.descriptionHtmlEn}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model,
        max_tokens: 16000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMsg }],
      }),
    });
    if (!res.ok) {
      lastTranslatorError = `API ${res.status}: ${(await res.text()).slice(0, 300)}`;
      console.error(`[contentTranslator] ${lastTranslatorError} (${def.code})`);
      return null;
    }
    const data = await res.json();
    if (data.stop_reason === 'max_tokens') {
      lastTranslatorError = 'Truncated output (max_tokens)';
      console.error(`[contentTranslator] Truncated output (max_tokens) for ${def.code} — skipping`);
      return null;
    }
    const text = (data.content || []).map((b: { text?: string }) => b.text || '').join('');
    const parsed = extractJson(text);
    if (!parsed?.title || !parsed?.summary || !parsed?.descriptionHtml) {
      lastTranslatorError = `Incomplete JSON (text head: ${text.slice(0, 200)})`;
      console.error(`[contentTranslator] Incomplete JSON for ${def.code}`);
      return null;
    }

    // Guardrail duri: limiti campo + niente emoji nella description (bug reale
    // Eventbrite: un'emoja tronca tutto il contenuto successivo).
    const emojiRe = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
    if (emojiRe.test(parsed.descriptionHtml)) {
      parsed.descriptionHtml = parsed.descriptionHtml.replace(new RegExp(emojiRe, 'gu'), '');
    }
    return {
      title: parsed.title.slice(0, 75),
      summary: parsed.summary.slice(0, 140),
      descriptionHtml: parsed.descriptionHtml,
      ticketName: (parsed.ticketName || input.ticketNameEn).slice(0, 100),
      ticketDescription: parsed.ticketDescription || input.ticketDescriptionEn,
    };
  } catch (e) {
    lastTranslatorError = `threw: ${(e as Error).message}`;
    console.error(`[contentTranslator] Threw for ${def.code}: ${(e as Error).message}`);
    return null;
  }
}
