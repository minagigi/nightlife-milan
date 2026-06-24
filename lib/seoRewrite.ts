import crypto from 'crypto';
import { venuesData } from './venuesData';
import { MilanZone } from './types';

/**
 * AI-powered SEO rewriting for imported Eventbrite events.
 *
 * Each raw event is rewritten in the Nightlife Milan "luxury insider" voice,
 * bilingual (EN/IT), with keyword-rich title / meta description / slug.
 *
 * - Calls the Anthropic Messages API directly (no SDK dependency).
 * - Requires ANTHROPIC_API_KEY env var. Without it, falls back to a
 *   deterministic rule-based rewrite so the sync never breaks.
 * - In-memory cache keyed by a content hash → an unchanged event is rewritten
 *   once per warm serverless instance, not on every revalidation.
 */

const MODEL = 'claude-haiku-4-5-20251001';
const ZONE_LABELS: Record<MilanZone, string> = {
  [MilanZone.NAVIGLI]: 'Navigli',
  [MilanZone.BRERA]: 'Brera',
  [MilanZone.ISOLA]: 'Isola',
  [MilanZone.SEMPIONE]: 'Sempione',
  [MilanZone.PORTA_VENEZIA]: 'Porta Venezia',
  [MilanZone.CORSO_COMO]: 'Corso Como',
  [MilanZone.TORTONA]: 'Tortona',
  [MilanZone.CITY_LIFE]: 'CityLife',
  [MilanZone.CENTRO_STORICO]: 'Centro Storico',
  [MilanZone.ARCO_DELLA_PACE]: 'Arco della Pace',
  [MilanZone.RIPAMONTI]: 'Ripamonti',
  [MilanZone.NOLO]: 'NoLo',
  [MilanZone.PORTA_ROMANA]: 'Porta Romana',
  [MilanZone.LAMBRATE]: 'Lambrate',
};

export interface VenueMeta {
  name: string;
  zone: string;
  locality: string;
}

export interface SeoFields {
  titleEn: string;
  titleIt: string;
  descEn: string;
  descIt: string;
  slugEn: string;
  slugIt: string;
}

export interface RawEventSeoInput {
  title: string;
  description: string;
  venueId: string;
  dateISO: string;
}

/** Resolve a synced venueId (canonical id or slug) to display metadata. */
export function getVenueMeta(venueId: string): VenueMeta {
  const v =
    venuesData.find((x) => x.id === venueId) ||
    venuesData.find((x) => x.slugs.en === venueId || x.slugs.it === venueId);
  if (!v) return { name: 'Milano', zone: 'Milano', locality: 'Milano' };
  return {
    name: v.localizedContent.name.en,
    zone: ZONE_LABELS[v.zone] || 'Milano',
    locality: v.address.addressLocality || 'Milano',
  };
}

function slugify(text: string): string {
  return text
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

function clamp(s: string, max: number): string {
  const t = s.replace(/\s+/g, ' ').trim();
  return t.length <= max ? t : t.slice(0, max - 1).trimEnd() + '…';
}

/** Deterministic fallback — used when AI is unavailable or fails. */
export function ruleBasedSEO(raw: RawEventSeoInput, meta: VenueMeta): SeoFields {
  const year = new Date(raw.dateISO).getFullYear() || new Date().getFullYear();
  const baseTitle = raw.title.replace(/\s+/g, ' ').trim();
  const datePart = (() => {
    const d = new Date(raw.dateISO);
    return Number.isNaN(d.getTime()) ? '' : `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${year}`;
  })();

  return {
    titleEn: clamp(`${meta.name} — ${baseTitle} | VIP Tables & Guestlist Milan ${year}`, 75),
    titleIt: clamp(`${meta.name} — ${baseTitle} | Tavoli VIP & Guestlist Milano ${year}`, 75),
    descEn: clamp(`${baseTitle} at ${meta.name}, ${meta.zone} Milan. Book VIP tables & guestlist — WhatsApp concierge replies in 10 min.`, 160),
    descIt: clamp(`${baseTitle} al ${meta.name}, ${meta.zone} Milano. Prenota tavoli VIP e guestlist — concierge WhatsApp risponde in 10 min.`, 160),
    slugEn: slugify(`${meta.name}-${baseTitle}-${datePart}`),
    slugIt: slugify(`${meta.name}-${baseTitle}-${datePart}`),
  };
}

const PROMPT_SYSTEM = `You are the copywriter for "Nightlife Milan", a luxury insider guide to Milan nightlife.
Voice: insider, exclusive, confident, never try-hard. Specific over generic. No buzzwords like "stunning/amazing/ultimate/epic/iconic". No exclamation marks.
You rewrite raw Eventbrite event data into SEO-optimized, bilingual (English + Italian) metadata.
Rules:
- title (EN and IT): max 75 characters each, keyword-first, format "[Venue] — [Night] | [VIP/Tables/Guestlist] Milan/Milano [year]".
- description (EN and IT): 150-160 characters, include venue + zone + a concrete value prop + WhatsApp concierge CTA.
- slug (EN and IT): lowercase, hyphenated, keyword-rich (venue + night + date), ASCII only, max 70 chars.
- Keep the real event identity (do not invent a different night/artist).
Return ONLY a JSON object with keys: titleEn, titleIt, descEn, descIt, slugEn, slugIt. No markdown, no prose.`;

async function aiRewrite(raw: RawEventSeoInput, meta: VenueMeta): Promise<SeoFields> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('no ANTHROPIC_API_KEY');

  const year = new Date(raw.dateISO).getFullYear() || new Date().getFullYear();
  const userMsg = `Venue: ${meta.name} (zone: ${meta.zone}, ${meta.locality})
Event date year: ${year}
Raw title: ${raw.title}
Raw description: ${raw.description.slice(0, 600)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
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
        max_tokens: 600,
        system: PROMPT_SYSTEM,
        messages: [{ role: 'user', content: userMsg }],
      }),
    });
    if (!res.ok) throw new Error(`anthropic ${res.status}`);
    const data = (await res.json()) as { content: Array<{ type: string; text?: string }> };
    const text = data.content?.find((c) => c.type === 'text')?.text || '';
    const jsonStr = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const parsed = JSON.parse(jsonStr) as Partial<SeoFields>;

    // Validate + enforce limits; fall back per-field if missing.
    const fb = ruleBasedSEO(raw, meta);
    return {
      titleEn: clamp(parsed.titleEn || fb.titleEn, 75),
      titleIt: clamp(parsed.titleIt || fb.titleIt, 75),
      descEn: clamp(parsed.descEn || fb.descEn, 160),
      descIt: clamp(parsed.descIt || fb.descIt, 160),
      slugEn: slugify(parsed.slugEn || fb.slugEn),
      slugIt: slugify(parsed.slugIt || fb.slugIt),
    };
  } finally {
    clearTimeout(timeout);
  }
}

// Module-level cache: hash(content) → rewritten fields.
const cache = new Map<string, SeoFields>();

export async function rewriteEventSEO(raw: RawEventSeoInput): Promise<SeoFields> {
  const meta = getVenueMeta(raw.venueId);
  const hash = crypto
    .createHash('sha1')
    .update(`${raw.title}|${raw.description.slice(0, 200)}|${raw.venueId}|${raw.dateISO}`)
    .digest('hex');

  const cached = cache.get(hash);
  if (cached) return cached;

  let result: SeoFields;
  try {
    result = await aiRewrite(raw, meta);
  } catch {
    result = ruleBasedSEO(raw, meta);
  }
  cache.set(hash, result);
  return result;
}
