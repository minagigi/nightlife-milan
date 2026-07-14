import crypto from 'crypto';
import { venuesData } from './venuesData';
import { MilanZone } from './types';

/**
 * Deterministic SEO fields for imported Eventbrite events.
 *
 * This module intentionally does not call any AI or translation API. Imported
 * listings that lack a canonical marker get stable rule-based title,
 * description and slug fields; rich copy/localization must be prepared locally
 * and submitted through the publishing routes.
 */

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

export function getVenueMeta(venueId: string): VenueMeta {
  const venue =
    venuesData.find((item) => item.id === venueId) ||
    venuesData.find((item) => item.slugs.en === venueId || item.slugs.it === venueId);

  if (!venue) return { name: 'Milano', zone: 'Milano', locality: 'Milano' };
  return {
    name: venue.localizedContent.name.en,
    zone: ZONE_LABELS[venue.zone] || 'Milano',
    locality: venue.address.addressLocality || 'Milano',
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 70)
    .replace(/-$/, '');
}

function clamp(value: string, max: number): string {
  const text = value.replace(/\s+/g, ' ').trim();
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}...`;
}

export function ruleBasedSEO(raw: RawEventSeoInput, meta: VenueMeta): SeoFields {
  const parsedDate = new Date(raw.dateISO);
  const validDate = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  const year = validDate.getFullYear();
  const datePart = `${String(validDate.getDate()).padStart(2, '0')}-${String(validDate.getMonth() + 1).padStart(2, '0')}-${year}`;
  const baseTitle = raw.title.replace(/\s+/g, ' ').trim();

  return {
    titleEn: clamp(`${meta.name} - ${baseTitle} | VIP Tables & Guestlist Milan ${year}`, 75),
    titleIt: clamp(`${meta.name} - ${baseTitle} | Tavoli VIP & Guestlist Milano ${year}`, 75),
    descEn: clamp(`${baseTitle} at ${meta.name}, ${meta.zone} Milan. Book VIP tables and guestlist. WhatsApp concierge replies in 10 min.`, 160),
    descIt: clamp(`${baseTitle} al ${meta.name}, ${meta.zone} Milano. Prenota tavoli VIP e guestlist. Concierge WhatsApp in 10 min.`, 160),
    slugEn: slugify(`${meta.name}-${baseTitle}-${datePart}`),
    slugIt: slugify(`${meta.name}-${baseTitle}-${datePart}`),
  };
}

const cache = new Map<string, SeoFields>();

export async function rewriteEventSEO(raw: RawEventSeoInput): Promise<SeoFields> {
  const meta = getVenueMeta(raw.venueId);
  const hash = crypto
    .createHash('sha1')
    .update(`${raw.title}|${raw.description.slice(0, 200)}|${raw.venueId}|${raw.dateISO}`)
    .digest('hex');

  const cached = cache.get(hash);
  if (cached) return cached;

  const result = ruleBasedSEO(raw, meta);
  cache.set(hash, result);
  return result;
}
