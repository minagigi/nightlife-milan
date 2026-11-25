import { GUE_JUST_ME_EVENT_PROFILE } from './gueJustMe';
import { getLocalizedEventSeed } from './localizedEventContent';
import { type Event, type Venue } from './types';
import { mockVenues } from './data';
import { isUpcomingRome } from './calendarEvents';
import { WORLD_CUP_FINAL_CANONICAL_SLUG } from './worldCupFinalIt';
import { getEventBatchProfile } from './eventBatchProfiles';
import { isJustSingingRainActive } from './just-singing-rain/justme35';

export type EventDiscoveryItem = { event: Event; venue: Venue };

/**
 * Editorial featured masters kept at the top of discovery surfaces.
 * Site CTAs always point directly to official Xceed links and WhatsApp concierge.
 */
export const VERIFIED_EDITORIAL_MASTERS = [
  {
    canonicalSlug: GUE_JUST_ME_EVENT_PROFILE.canonicalSlug,
    priority: 1,
  },
  {
    canonicalSlug: WORLD_CUP_FINAL_CANONICAL_SLUG,
    priority: 2,
  },
] as const;

function isBadBunny(event: Event): boolean {
  return /bad-bunny/i.test(`${event.id} ${Object.values(event.localizedContent.slug).join(' ')}`);
}

function masterFor(event: Event) {
  const slugs = Object.values(event.localizedContent.slug);
  return VERIFIED_EDITORIAL_MASTERS.find((master) =>
    slugs.includes(master.canonicalSlug) ||
    slugs.some((slug) => getEventBatchProfile(slug)?.canonicalSlug === master.canonicalSlug),
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

export function getEventDiscoveryItems(
  baseItems: readonly EventDiscoveryItem[],
  locale: string,
  upcoming: (dateISO: string) => boolean = isUpcomingRome,
): EventDiscoveryItem[] {
  const masters = VERIFIED_EDITORIAL_MASTERS.flatMap((master) => {
    const event = getLocalizedEventSeed(master.canonicalSlug, locale);
    const venue = event && mockVenues.find((candidate) => candidate.id === event.venueId);
    return event && venue && upcoming(event.dateISO) ? [{ event, venue }] : [];
  });

  const selected = [...baseItems, ...masters]
    .filter(({ event }) => {
      if (event.id === 'just-singing-in-the-rain-2026') return isJustSingingRainActive();
      return upcoming(event.dateISO) && !isBadBunny(event);
    })
    .map(withLocalSiteImage);
  const unique = new Map<string, EventDiscoveryItem>();
  for (const item of selected) {
    const key = identity(item.event);
    const existing = unique.get(key);
    if (!existing || masterFor(item.event)) unique.set(key, item);
  }

  return [...unique.values()].sort(compareEventDiscoveryItems);
}

export function compareEventDiscoveryItems(a: EventDiscoveryItem, b: EventDiscoveryItem): number {
  const rainActive = isJustSingingRainActive();
  const priorityA =
    rainActive && a.event.id === 'just-singing-in-the-rain-2026'
      ? 0
      : masterFor(a.event)?.priority ?? 99;
  const priorityB =
    rainActive && b.event.id === 'just-singing-in-the-rain-2026'
      ? 0
      : masterFor(b.event)?.priority ?? 99;
  if (priorityA !== priorityB) return priorityA - priorityB;
  return new Date(a.event.dateISO).getTime() - new Date(b.event.dateISO).getTime();
}

function pickLocaleField(
  map: Record<string, string | undefined> | undefined,
  locale: string,
): { en: string } & Record<string, string> {
  const enVal = (map?.en || '').toString();
  if (!locale || locale === 'en') {
    return { en: enVal };
  }
  const locVal = map?.[locale];
  if (locVal && locVal !== enVal) {
    return { en: enVal, [locale]: locVal };
  }
  return { en: enVal };
}

export function slimDiscoveryItemsForClient(
  items: EventDiscoveryItem[],
  locale: string,
  maxItems = 24,
): EventDiscoveryItem[] {
  return items.slice(0, maxItems).map(({ event, venue }) => ({
    event: {
      id: event.id,
      venueId: event.venueId,
      genre: event.genre,
      dateISO: event.dateISO,
      pricing: {
        entry: event.pricing.entry,
        currency: event.pricing.currency,
        tableMinSpend: null,
      },
      image: event.image,
      isTrending: event.isTrending,
      localizedContent: {
        title: pickLocaleField(event.localizedContent.title as Record<string, string>, locale) as Event['localizedContent']['title'],
        slug: pickLocaleField(event.localizedContent.slug as Record<string, string>, locale) as Event['localizedContent']['slug'],
        shortDescription: { en: '' },
      },
    },
    venue: {
      id: venue.id,
      slugs: pickLocaleField(venue.slugs as Record<string, string>, locale) as Venue['slugs'],
      address: venue.address,
      coordinates: venue.coordinates,
      category: venue.category,
      zone: venue.zone,
      sameAs: [],
      localizedContent: {
        name: pickLocaleField(venue.localizedContent.name as Record<string, string>, locale) as Venue['localizedContent']['name'],
        description: { en: '' },
        dressCode: { en: '' },
        altTextImg: pickLocaleField(venue.localizedContent.altTextImg as Record<string, string>, locale) as Venue['localizedContent']['altTextImg'],
      },
      image: venue.image,
      priorityScore: venue.priorityScore,
      isFeatured: venue.isFeatured,
    },
  }));
}
