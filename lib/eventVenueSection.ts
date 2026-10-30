export type EventVenueAddress = Readonly<{
  streetAddress: string;
  addressLocality: string;
  postalCode?: string | null;
  addressCountry: string;
}>;

export type EventVenueSectionVenue = Readonly<{
  name: string;
  address: EventVenueAddress;
  description: string;
  href?: string;
  coordinates?: Readonly<{ latitude: number; longitude: number }>;
}>;

export function assertEventVenueSectionVenue(venue: EventVenueSectionVenue): void {
  if (!venue || !venue.name || !venue.address || !venue.address.streetAddress) {
    throw new Error('Invalid EventVenueSectionVenue');
  }
}

export function formatEventVenueAddress(address: EventVenueAddress): string {
  const parts = [
    address.streetAddress,
    [address.postalCode, address.addressLocality].filter(Boolean).join(' '),
    address.addressCountry,
  ].filter(Boolean);
  return parts.join(', ');
}

export function eventVenueMapId(venue: EventVenueSectionVenue): string {
  const slug = venue.name.toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-|-$/gu, '');
  return `event-venue-map-${slug || 'venue'}`;
}

export function buildGoogleMapUrls(venue: EventVenueSectionVenue, locale: string) {
  const query = venue.coordinates
    ? `${venue.coordinates.latitude},${venue.coordinates.longitude}`
    : `${venue.name}, ${formatEventVenueAddress(venue.address)}`;
  const encoded = encodeURIComponent(query);
  return {
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
    embedUrl: `https://www.google.com/maps?q=${encoded}&hl=${encodeURIComponent(locale)}&z=15&output=embed`,
  };
}
