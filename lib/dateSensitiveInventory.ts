import { dayOfWeekForKey, romeDayKeyOffset } from './calendarEvents';
import { weeklyEvents } from './eventsConfig';
import { getVenuePriorityRank } from './dateSensitiveView';
import { getLocalizedText } from './seo';
import type { Event } from './types';
import { formatEventPresentationLabels, type EventPresentationLabels } from './i18n/eventPresentationLabels';
import { isEnabledLocale } from './i18n/locales';
import { OCTOBER_EVENTS } from './octoberEvents';
import { readOctoberEventCard } from './octoberEditorial';
import { getOctoberPosterLabel } from './october-events/copy';
import { getVenueById } from './data';
import { venueLocationLabel } from './venueLocation';

export type DateSensitiveEventPresentation = {
  id: string;
  venueId?: string | null;
  dateISO: string;
  endDateISO: string | null;
  title: string;
  venueName: string;
  slug: string;
  image: string;
  price: number | null;
  currency: 'EUR';
  labels: EventPresentationLabels;
  verificationExpiresAt: string | null;
  affiliateUrl?: string | null;
};

export type DateSensitiveCarouselPresentation = DateSensitiveEventPresentation & {
  genre: string[];
  venueAltText: string;
  venueZone: string;
  venueZoneKey: string | null;
  venueFeatured: boolean;
};

const ACTIVE_FLOOR_ROME_DAY = '2026-11-02';
const MAX_SERIALIZED_EVENTS = 80;
const ROME_DAY_FMT = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Rome',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const inventoryCache = new Map<string, Promise<DateSensitiveEventPresentation[]>>();
const carouselCache = new Map<string, Promise<DateSensitiveCarouselPresentation[]>>();

function isCurrentOrUpcomingOccurrence(dateISO: string, endDateISO?: string | null): boolean {
  const startMs = Date.parse(dateISO);
  if (!Number.isFinite(startMs)) return false;
  const eventDay = ROME_DAY_FMT.format(new Date(startMs));
  const todayRome = ROME_DAY_FMT.format(new Date());
  const floorDay = todayRome > ACTIVE_FLOOR_ROME_DAY ? todayRome : ACTIVE_FLOOR_ROME_DAY;
  if (eventDay >= floorDay) return true;
  if (endDateISO) {
    const endMs = Date.parse(endDateISO);
    if (Number.isFinite(endMs) && endMs > Date.now() && eventDay >= ACTIVE_FLOOR_ROME_DAY) {
      return true;
    }
  }
  return false;
}

export const normVenueId = (id: string) => (id === 'v-55' ? 'v-55milano' : id);

export async function getOctoberDateSensitivePresentations(locale: string, venueId?: string): Promise<DateSensitiveEventPresentation[]> {
  if (!isEnabledLocale(locale)) return [];
  return Promise.all(
    OCTOBER_EVENTS
      .filter((event) => (!venueId || normVenueId(event.venue.id) === normVenueId(venueId)) && isCurrentOrUpcomingOccurrence(event.startISO, event.endISO))
      .map(async (event) => {
        const card = await readOctoberEventCard(event, locale);
        const lowestVerifiedTicket =
          event.affiliateStatus === 'verified' && event.affiliateUrl
            ? event.offers
                .filter((offer) => offer.category === 'ticket' && !offer.audience && offer.availability === 'available' && offer.url === event.affiliateUrl && offer.price !== null)
                .map((offer) => offer.price as number)
                .sort((a, b) => a - b)[0] ?? null
            : null;
        const normalizedVenueId = normVenueId(event.venue.id);
        let displayPrice = lowestVerifiedTicket;
        if (displayPrice === null && normalizedVenueId === 'v-55milano' && event.affiliateStatus === 'unavailable') {
          const paidTickets = event.offers
            .filter((offer) => offer.category === 'ticket' && offer.availability === 'available' && typeof offer.price === 'number' && offer.price > 0)
            .map((offer) => offer.price as number)
            .sort((a, b) => a - b);
          const paidGuestlists = event.offers
            .filter((offer) => offer.category === 'guestlist' && offer.availability === 'available' && typeof offer.price === 'number' && offer.price > 0)
            .map((offer) => offer.price as number)
            .sort((a, b) => a - b);
          displayPrice = paidTickets[0] ?? paidGuestlists[0] ?? null;
        }
        const formatted = formatEventPresentationLabels({ dateISO: event.startISO, price: displayPrice, currency: 'EUR', locale });
        const labels = event.startTimeKnown === false ? { ...formatted, time: card.noKnownValue, dateTime: formatted.longDate } : formatted;
        return {
          id: `october-${event.id}`,
          venueId: normalizedVenueId,
          dateISO: event.startISO,
          endDateISO: event.endISO,
          title: card.title,
          venueName: event.venue.name,
          slug: card.slug,
          image: event.image.src,
          price: displayPrice,
          currency: 'EUR' as const,
          labels,
          verificationExpiresAt: null,
          affiliateUrl: event.affiliateStatus === 'verified' ? event.affiliateUrl : null,
        };
      }),
  );
}

function getPriorityVenueSupplementalPresentations(locale: string, venueId?: string): DateSensitiveEventPresentation[] {
  if (!isEnabledLocale(locale)) return [];
  const supplementalClubs = new Set(['justme', 'pineta', 'aria', '55milano', 'voya', 'repvblic']);
  const out: DateSensitiveEventPresentation[] = [];
  const seenSlugs = new Set<string>();
  const octoberVenueDays = new Set(OCTOBER_EVENTS.map((e) => `${normVenueId(e.venue.id)}|${e.startISO.slice(0, 10)}`));
  for (let offset = 0; offset < 7; offset++) {
    const dayKey = romeDayKeyOffset(offset);
    const dow = dayOfWeekForKey(dayKey);
    const candidates = weeklyEvents.filter((we) => supplementalClubs.has(we.clubSlug) && we.dayOfWeek === dow);
    for (const we of candidates) {
      const resolvedVenueId = `v-${we.clubSlug}`;
      if (venueId && normVenueId(venueId) !== resolvedVenueId) continue;
      if (octoberVenueDays.has(`${resolvedVenueId}|${dayKey}`)) continue;
      const slug = `${we.clubSlug}-${we.day}-${we.eventSlug}`;
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      const venue = getVenueById(resolvedVenueId);
      const venueName = venue ? getLocalizedText(venue.localizedContent.name, locale) : we.clubName;
      const startHour = we.pricing.aperitif ? '19:30:00' : '23:00:00';
      const tz = dayKey >= '2026-10-25' ? '+01:00' : '+02:00';
      const dateISO = `${dayKey}T${startHour}${tz}`;
      const nextDay = romeDayKeyOffset(offset + 1);
      const nextTz = nextDay >= '2026-10-25' ? '+01:00' : '+02:00';
      const endDateISO = `${nextDay}T04:30:00${nextTz}`;
      if (!isCurrentOrUpcomingOccurrence(dateISO, endDateISO)) continue;
      const title = `${we.name} · ${venueName}`;
      const priceMatch = (we.pricing.club || we.pricing.aperitif || '').match(/(\d+)/);
      const price = priceMatch ? Number(priceMatch[1]) : null;
      const labels = formatEventPresentationLabels({ dateISO, price, currency: 'EUR', locale });
      out.push({
        id: `priority-${we.id}-${dayKey}`,
        venueId: resolvedVenueId,
        dateISO,
        endDateISO,
        title,
        venueName,
        slug,
        image: we.image,
        price,
        currency: 'EUR',
        labels,
        verificationExpiresAt: null,
        affiliateUrl: we.xceedLink ?? null,
      });
    }
  }
  return out;
}

export async function getDateSensitiveInventory(locale: string, venueId?: string): Promise<DateSensitiveEventPresentation[]> {
  const cacheKey = `${locale}|${venueId ? normVenueId(venueId) : ''}`;
  const cached = inventoryCache.get(cacheKey);
  if (cached) return cached;

  const promise = (async () => {
    const october = await getOctoberDateSensitivePresentations(locale, venueId);
    const supplemental = getPriorityVenueSupplementalPresentations(locale, venueId);
    return [...october, ...supplemental]
      .sort(
        (left, right) =>
          getVenuePriorityRank(left.venueId || left.venueName) - getVenuePriorityRank(right.venueId || right.venueName) ||
          Date.parse(left.dateISO) - Date.parse(right.dateISO) ||
          left.id.localeCompare(right.id),
      )
      .slice(0, MAX_SERIALIZED_EVENTS);
  })();

  inventoryCache.set(cacheKey, promise);
  return promise;
}

export async function getDateSensitiveCarouselInventory(
  locale: string,
  _matches?: (event: Event) => boolean,
  matchesOctober?: (event: typeof OCTOBER_EVENTS[number]) => boolean,
): Promise<DateSensitiveCarouselPresentation[]> {
  if (!matchesOctober) {
    const cached = carouselCache.get(locale);
    if (cached) return cached;
  }

  const compute = async (): Promise<DateSensitiveCarouselPresentation[]> => {
    const october: DateSensitiveCarouselPresentation[] = isEnabledLocale(locale)
      ? (await getOctoberDateSensitivePresentations(locale))
          .filter((card) => !matchesOctober || matchesOctober(OCTOBER_EVENTS.find((e) => `october-${e.id}` === card.id)!))
          .map((card) => {
            const event = OCTOBER_EVENTS.find((e) => `october-${e.id}` === card.id)!;
            const venue = getVenueById(normVenueId(event.venue.id));
            const genreKeys: Record<string, string> = {
              'hip-hop': 'HIP_HOP',
              hits: 'COMMERCIAL',
              house: 'HOUSE',
              techno: 'TECHNO',
              reggaeton: 'REGGAETON',
            };
            return {
              ...card,
              genre: event.genres.map((g) => genreKeys[g.toLowerCase()] || g.toUpperCase()),
              venueAltText: getOctoberPosterLabel(event, locale),
              venueZone: venue ? venueLocationLabel(venue) : '',
              venueZoneKey: venue?.zone ?? null,
              venueFeatured: venue?.isFeatured ?? false,
            };
          })
      : [];
    const supplementalCarousel: DateSensitiveCarouselPresentation[] = getPriorityVenueSupplementalPresentations(locale).map((card) => {
      const venue = card.venueId ? getVenueById(card.venueId) : undefined;
      const we = weeklyEvents.find((w) => card.id.startsWith(`priority-${w.id}-`));
      return {
        ...card,
        genre: we ? we.genres.map((g: string) => String(g).toUpperCase()) : ['COMMERCIAL'],
        venueAltText: card.title,
        venueZone: venue ? venueLocationLabel(venue) : 'Milano',
        venueZoneKey: venue?.zone ?? null,
        venueFeatured: venue?.isFeatured ?? true,
      };
    });
    return [...october, ...supplementalCarousel]
      .sort(
        (left, right) =>
          getVenuePriorityRank(left.venueId || left.venueName) - getVenuePriorityRank(right.venueId || right.venueName) ||
          Date.parse(left.dateISO) - Date.parse(right.dateISO) ||
          left.id.localeCompare(right.id),
      )
      .slice(0, MAX_SERIALIZED_EVENTS);
  };

  const promise = compute();
  if (!matchesOctober) {
    carouselCache.set(locale, promise);
  }
  return promise;
}
