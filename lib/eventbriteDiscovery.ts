import { GUE_JUST_ME_EVENT_PROFILE } from './gueJustMe';
import { getLocalizedEventSeed } from './localizedEventContent';
import { type Event, type Venue } from './types';
import { mockVenues } from './data';
import { isUpcomingRome } from './calendarEvents';
import { WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS } from './worldCupEventbriteIt';
import { WORLD_CUP_FINAL_CANONICAL_SLUG } from './worldCupFinalIt';
import { getEventBatchProfile } from './eventBatchProfiles';

export type EventDiscoveryItem = { event: Event; venue: Venue };

/**
 * The two canonical master records are derived from explicit live Eventbrite
 * evidence and keep commercial priority at the head of every surface. Their
 * site CTA remains the exact Xceed link carried by the localized event seed.
 */
export const VERIFIED_EVENTBRITE_MASTERS = [
  {
    canonicalSlug: GUE_JUST_ME_EVENT_PROFILE.canonicalSlug,
    eventbriteIds: Object.values(GUE_JUST_ME_EVENT_PROFILE.eventbriteIds ?? {}),
    publicUrls: [
      'https://www.eventbrite.it/e/gue-pequeno-live-milan-tickets-just-me-milano-25-july-2026-tickets-1994392210790',
    ],
    priority: 1,
  },
  {
    canonicalSlug: WORLD_CUP_FINAL_CANONICAL_SLUG,
    eventbriteIds: WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS.map((listing) => listing.eventId),
    publicUrls: WORLD_CUP_EVENTBRITE_IT_LIVE_LISTINGS.map((listing) => listing.url),
    priority: 2,
  },
] as const;

function isBadBunny(event: Event): boolean {
  return /bad-bunny/i.test(`${event.id} ${Object.values(event.localizedContent.slug).join(' ')}`);
}

function masterFor(event: Event) {
  const slugs = Object.values(event.localizedContent.slug);
  return VERIFIED_EVENTBRITE_MASTERS.find((master) =>
    slugs.includes(master.canonicalSlug) ||
    slugs.some((slug) => getEventBatchProfile(slug)?.canonicalSlug === master.canonicalSlug) ||
    master.eventbriteIds.some((id) => event.id.includes(id)),
  );
}

function identity(event: Event): string {
  const master = masterFor(event);
  return master?.canonicalSlug || `${event.venueId}|${event.dateISO}|${event.localizedContent.slug.en}`;
}

function withLocalSiteImage(item: EventDiscoveryItem): EventDiscoveryItem {
  const image = item.event.image?.replace(/^https:\/\/(?:www\.)?nightlifemilan\.com(?=\/)/, '');
  return image && image !== item.event.image
    ? { ...item, event: { ...item.event, image } }
    : item;
}

/**
 * Returns the unified SITE-FIRST event inventory shared by every discovery
 * surface. REGOLA (20 lug 2026, decisione utente post-ban Eventbrite): il sito
 * è il punto cardine e non dipende da Eventbrite — l'inventario include TUTTO
 * ciò che il sito conosce (one-off curati, import Eventbrite/Xceed finché
 * esistono, serate ricorrenti settimanali materializzate con date reali),
 * deduplicato per identità fisica, solo eventi futuri. I master verificati
 * mantengono la priorità commerciale in testa. Resta esclusa solo la voce
 * Bad Bunny (rimozione editoriale deliberata).
 */
export function getEventbriteDiscoveryItems(
  baseItems: readonly EventDiscoveryItem[],
  locale: string,
  upcoming: (dateISO: string) => boolean = isUpcomingRome,
): EventDiscoveryItem[] {
  const masters = VERIFIED_EVENTBRITE_MASTERS.flatMap((master) => {
    const event = getLocalizedEventSeed(master.canonicalSlug, locale);
    const venue = event && mockVenues.find((candidate) => candidate.id === event.venueId);
    return event && venue && upcoming(event.dateISO) ? [{ event, venue }] : [];
  });

  const selected = [...baseItems, ...masters]
    .filter(({ event }) => upcoming(event.dateISO) && !isBadBunny(event))
    .map(withLocalSiteImage);
  const unique = new Map<string, EventDiscoveryItem>();
  for (const item of selected) {
    const key = identity(item.event);
    const existing = unique.get(key);
    if (!existing || masterFor(item.event)) unique.set(key, item);
  }

  return [...unique.values()].sort(compareEventbriteDiscoveryItems);
}

/** Preserve the approved commercial order on every discovery surface. */
export function compareEventbriteDiscoveryItems(a: EventDiscoveryItem, b: EventDiscoveryItem): number {
  const priorityA = masterFor(a.event)?.priority ?? 99;
  const priorityB = masterFor(b.event)?.priority ?? 99;
  if (priorityA !== priorityB) return priorityA - priorityB;
  return new Date(a.event.dateISO).getTime() - new Date(b.event.dateISO).getTime();
}
