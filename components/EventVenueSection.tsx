import EventVenueMap from '@/components/EventVenueMap';
import React from 'react';
import {
  assertEventVenueSectionVenue,
  buildGoogleMapUrls,
  eventVenueMapId,
  formatEventVenueAddress,
  type EventVenueSectionVenue,
} from '@/lib/eventVenueSection';
import { getEventVenueCopy } from '@/lib/i18n/eventVenueCopy';

export type EventVenueSectionProps = Readonly<{
  locale: string;
  venue: EventVenueSectionVenue;
}>;

function renderDescriptionWithIsolatedVenueName(description: string, venueName: string) {
  const segments = description.split(venueName);
  if (segments.length === 1) return description;

  return segments.map((segment, index) => (
    <React.Fragment key={`${segment}-${index}`}>
      {segment}
      {index < segments.length - 1 ? <bdi dir="auto" data-event-venue-name-inline>{venueName}</bdi> : null}
    </React.Fragment>
  ));
}

/** SSR venue context for event pages; the optional Google frame remains click-to-load. */
export default function EventVenueSection({ locale, venue }: EventVenueSectionProps) {
  assertEventVenueSectionVenue(venue);
  const copy = getEventVenueCopy(locale as any);
  const maps = buildGoogleMapUrls(venue, locale);
  const mapId = eventVenueMapId(venue);
  const mapTitle = copy.mapTitle.replace('{venue}', venue.name);

  return (
    <section aria-label={copy.ariaLabel} className="mt-12 border-t border-white/10 pt-10" data-event-venue-section={locale}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
        <div>
          <p className="font-serif text-2xl font-bold text-champagne">{copy.heading}</p>
          <p className="mt-4 text-base leading-7 text-white/75" data-event-venue-description>
            {renderDescriptionWithIsolatedVenueName(venue.description, venue.name)}
          </p>

          <dl className="mt-6 space-y-4 text-base leading-7 text-white/80">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-champagne">{copy.location}</dt>
              <dd className="mt-1 font-semibold text-white"><bdi dir="auto" data-event-venue-name>{venue.name}</bdi></dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-[0.14em] text-champagne">{copy.address}</dt>
              <dd className="mt-1" data-event-venue-address><address className="not-italic">{formatEventVenueAddress(venue.address)}</address></dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-champagne px-5 py-2.5 text-base font-bold tracking-wide text-black transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              data-event-venue-directions
            >
              {copy.directions}
            </a>
            {venue.href ? (
              <a
                href={venue.href}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-champagne/70 px-5 py-2.5 text-base font-semibold tracking-wide text-champagne transition-colors hover:bg-champagne/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                data-event-venue-details
              >
                {copy.venueDetails}
              </a>
            ) : null}
          </div>
        </div>

        <EventVenueMap
          id={mapId}
          mapUrl={maps.embedUrl}
          labels={{ loadMap: copy.loadMap, mapTitle, privacyLoadNotice: copy.privacyLoadNotice }}
        />
      </div>
    </section>
  );
}
