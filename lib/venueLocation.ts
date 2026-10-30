import type { Venue } from './types';

export type VenueGeoCoordinates = Readonly<{
  latitude: number;
  longitude: number;
}>;

/**
 * Returns the supported district taxonomy label when one is verified, and the
 * exact street address otherwise. The fallback is display-only and must never
 * be used as a district filter key.
 */
export function venueLocationLabel(venue: Pick<Venue, 'zone' | 'address'>): string {
  return venue.zone?.replace(/_/gu, ' ') || venue.address.streetAddress;
}

/** Reject absent or non-finite pins rather than asserting approximate coordinates. */
export function venueGeoCoordinates(
  venue: Pick<Venue, 'coordinates'>,
): VenueGeoCoordinates | undefined {
  const coordinates = venue.coordinates;
  if (!coordinates
    || !Number.isFinite(coordinates.latitude)
    || !Number.isFinite(coordinates.longitude)) return undefined;
  return { latitude: coordinates.latitude, longitude: coordinates.longitude };
}

/**
 * Preserve exact verified pins where available. Without one, Google Maps gets
 * an explicit venue-name + street + Milano search instead of a fabricated pin.
 */
export function venueMapsUrl(
  venue: Pick<Venue, 'coordinates' | 'address' | 'localizedContent'>,
): string {
  const coordinates = venueGeoCoordinates(venue);
  const query = coordinates
    ? `${coordinates.latitude},${coordinates.longitude}`
    : `${venue.localizedContent.name.en}, ${venue.address.streetAddress}, Milano`;
  const url = new URL('https://www.google.com/maps/search/');
  url.searchParams.set('api', '1');
  url.searchParams.set('query', query);
  return url.toString();
}
