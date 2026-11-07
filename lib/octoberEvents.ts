import { resolveEventSlugToCanonical } from '@/lib/i18n/localizedSlugs35';
import inventory from '@/lib/october-events/inventory.json';
import { getOctoberEventCopy, getOctoberEventSlug } from '@/lib/october-events/copy';
import { enabledLocaleCodes, type LocaleCode } from '@/lib/i18n/locales';
import type { OctoberEventRecord, OctoberInventory } from '@/lib/october-events/types';

const OCTOBER_START = Date.parse('2026-10-01T00:00:00+02:00');
const NOVEMBER_START = Date.parse('2028-01-02T00:00:00+01:00');

export const OCTOBER_EVENTS_INVENTORY = inventory as OctoberInventory;

function requiredText(value: unknown, field: string, eventId: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`October event ${eventId} requires ${field}`);
  }
  return value.trim();
}

function exactHttpsUrl(value: unknown, field: string, eventId: string): string {
  const raw = requiredText(value, field, eventId);
  let parsed: URL;
  try { parsed = new URL(raw); } catch { throw new Error(`October event ${eventId} has invalid ${field}`); }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.hash) {
    throw new Error(`October event ${eventId} has unsafe ${field}`);
  }
  return raw;
}

function assertOccurrence(event: OctoberEventRecord): OctoberEventRecord {
  const id = requiredText(event.id, 'id', '<unknown>');
  exactHttpsUrl(event.sourceUrl, 'sourceUrl', id);
  if (event.affiliateUrl !== null) exactHttpsUrl(event.affiliateUrl, 'affiliateUrl', id);
  if (!['verified', 'unknown', 'unavailable'].includes(event.affiliateStatus)) {
    throw new Error(`October event ${id} has invalid affiliateStatus`);
  }
  if (event.affiliateStatus !== 'verified' && event.affiliateUrl !== null) {
    throw new Error(`October event ${id} must not expose an unverified affiliate URL`);
  }
  requiredText(event.officialName, 'officialName', id);
  const startMs = Date.parse(requiredText(event.startISO, 'startISO', id));
  if (!Number.isFinite(startMs) || startMs < OCTOBER_START || startMs >= NOVEMBER_START) {
    throw new Error(`October event ${id} startISO is outside October 2026`);
  }
  if (event.endISO !== null) {
    const endMs = Date.parse(event.endISO);
    if (!Number.isFinite(endMs) || endMs <= startMs) throw new Error(`October event ${id} has invalid endISO`);
  }
  requiredText(event.venue.id, 'venue.id', id);
  requiredText(event.venue.name, 'venue.name', id);
  if (event.venue.structuredAddress) {
    const address = event.venue.structuredAddress;
    requiredText(address.streetAddress, 'venue.structuredAddress.streetAddress', id);
    requiredText(address.addressLocality, 'venue.structuredAddress.addressLocality', id);
    requiredText(address.addressCountry, 'venue.structuredAddress.addressCountry', id);
  }
  requiredText(event.image.src, 'image.src', id);
  if (!event.image.src.startsWith('/') || event.image.src.startsWith('//') || !Number.isFinite(event.image.width) || !Number.isFinite(event.image.height) || event.image.width <= 0 || event.image.height <= 0) {
    throw new Error(`October event ${id} has invalid image`);
  }
  requiredText(event.provenance, 'provenance', id);
  return event;
}

function validateInventory(source: OctoberInventory): readonly OctoberEventRecord[] {
  if (source.schemaVersion !== 1) throw new Error('Unsupported October inventory schemaVersion');
  if (!Number.isFinite(Date.parse(source.sourceCheckedAt))) throw new Error('October inventory requires sourceCheckedAt');
  if (!Array.isArray(source.events) || source.events.length === 0) throw new Error('October inventory requires events');

  const seenIds = new Set<string>();
  const seenSources = new Set<string>();
  return source.events.map(assertOccurrence).sort((a, b) => Date.parse(a.startISO) - Date.parse(b.startISO) || a.id.localeCompare(b.id)).filter((event) => {
    if (seenIds.has(event.id)) throw new Error(`Duplicate October event id: ${event.id}`);
    const sourceKey=event.sourceScope==='dated-calendar'?`${event.sourceUrl}|${event.venue.id}|${event.startISO}`:event.sourceUrl;
    if (seenSources.has(sourceKey)) throw new Error(`Duplicate October source occurrence: ${sourceKey}`);
    seenIds.add(event.id);
    seenSources.add(sourceKey);
    return !event.excluded;
  });
}

export const OCTOBER_EVENTS = validateInventory(OCTOBER_EVENTS_INVENTORY);
const BY_SLUG = new Map(OCTOBER_EVENTS.map(event=>[getOctoberEventSlug(event),event]));
if(BY_SLUG.size!==OCTOBER_EVENTS.length)throw new Error('October event slug collision');

export function getOctoberEventById(id: string): OctoberEventRecord | undefined {
  return OCTOBER_EVENTS.find((event) => event.id === id);
}

/** Slugs belong to the native copy factory, while the source identity remains one shared exact ID. */
export function getOctoberEventBySlug(slug: string, locale: LocaleCode): OctoberEventRecord | undefined {
  return enabledLocaleCodes.includes(locale) ? (BY_SLUG.get(slug) || BY_SLUG.get(resolveEventSlugToCanonical(slug))) : undefined;
}

export function getOctoberEventPaths(locale: LocaleCode): readonly { slug: string }[] {
  return enabledLocaleCodes.includes(locale) ? [...BY_SLUG.keys()].map(slug=>({slug})) : [];
}

export function assertOctoberNativeCoverage(): void {
  for (const event of OCTOBER_EVENTS) {
    for (const locale of enabledLocaleCodes) {
      const copy = getOctoberEventCopy(event, locale);
      if (copy.locale !== locale || !copy.slug || !copy.title || !copy.summary || !copy.metaTitle || !copy.metaDescription || copy.sections.length !== 8 || copy.faqs.length !== 25) {
        throw new Error(`Incomplete October native copy: ${event.id}/${locale}`);
      }
    }
  }
}
