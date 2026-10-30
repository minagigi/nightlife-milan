import { addRomeDays, getDateSensitiveEvents, romeDayKeyAt, type DateSensitiveEvent } from './dateSensitiveView';
import { physicalEventKey } from './eventIdentity';

/** Only these verified venue identities may appear in public recommendations. */
export const PRIORITY_VENUE_IDS = ['v-justme', 'v-pineta', 'v-aria', 'v-55milano', 'v-voya', 'v-repvblic'] as const;
const priorityVenueIds = new Set<string>(PRIORITY_VENUE_IDS);
// Live public and exact affiliate Xceed pages rendered "404 - Event Not Found"
// on 2026-10-11. Preserve their dated source/archive; exclude these IDs only
// from new recommendations until a new verified source replaces this evidence.
export const UNVERIFIED_PRIORITY_EVENT_IDS = new Set(['october-242614', 'october-242615']);

/** The Halloween editorial selection uses short IDs; retain its full calendar while restricting its featured row. */
const HALLOWEEN_FEATURED_VENUES: Readonly<Record<string, string>> = {
  justme: 'v-justme', pineta: 'v-pineta', aria: 'v-aria', voya: 'v-voya',
};
export function isPriorityHalloweenFeaturedId(id: string): boolean {
  return isPriorityVenueId(HALLOWEEN_FEATURED_VENUES[id]);
}

export type VenueDatedEvent = DateSensitiveEvent & { venueId?: string | null; slug: string; title?: string; venueName?: string };

export function isPriorityVenueId(venueId: string | null | undefined): boolean {
  return Boolean(venueId && priorityVenueIds.has(venueId));
}

/** Compare URL-encoded localized event paths with the decoded canonical slug in the inventory. */
export function eventDetailExclusion(path: string): { excludeSlug?: string; invalid: boolean } {
  const encoded = /^\/events\/([^/]+)\/?$/u.exec(path)?.[1];
  if (!encoded) return { invalid: false };
  try {
    return { excludeSlug: decodeURIComponent(encoded).normalize('NFC'), invalid: false };
  } catch {
    return { invalid: true };
  }
}

export function selectPriorityVenueEvents<T extends VenueDatedEvent>(
  inventory: readonly T[], now: Date, options: { venueId?: string; nextRomeDays?: number; excludeEventId?: string; excludeSlug?: string } = {},
): T[] {
  const today = romeDayKeyAt(now);
  const lastDay = options.nextRomeDays === undefined ? null : addRomeDays(today, options.nextRomeDays - 1);
  const seen = new Set<string>();
  const seenPhysical = new Set<string>();
  return getDateSensitiveEvents(inventory, 'upcoming', now).filter(event => {
    if (!isPriorityVenueId(event.venueId) || (options.venueId && event.venueId !== options.venueId)) return false;
    if (UNVERIFIED_PRIORITY_EVENT_IDS.has(event.id)) return false;
    if (event.id === options.excludeEventId || event.slug === options.excludeSlug || seen.has(event.id)) return false;
    if (lastDay && romeDayKeyAt(new Date(event.dateISO)) > lastDay) return false;
    const physical = event.title
      ? physicalEventKey(event.venueId!, event.dateISO, event.title, event.venueName || '')
        .replace(/\b(?:at|the|al|alla|il|la|de|en)\b/gu, ' ').replace(/\s+/gu, ' ').trim()
      : event.id;
    if (seenPhysical.has(physical)) return false;
    seen.add(event.id);
    seenPhysical.add(physical);
    return true;
  });
}

