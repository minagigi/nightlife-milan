'use client';

import { useEffect, useRef, useState } from 'react';
import React from 'react';

export type EventVenueMapProps = Readonly<{
  id: string;
  mapUrl: string;
  purpose?: 'venue' | 'city';
  labels: Readonly<{
    loadMap: string;
    mapTitle: string;
    privacyLoadNotice: string;
  }>;
}>;

/** Google is not requested until the visitor explicitly loads this frame. */
export default function EventVenueMap({ id, mapUrl, labels, purpose = 'venue' }: EventVenueMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const markers = purpose === 'city'
    ? { map: 'data-city-map', pending: 'data-city-map-pending', loaded: 'data-city-map-loaded', load: 'data-city-map-load' }
    : { map: 'data-event-venue-map', pending: 'data-event-venue-map-pending', loaded: 'data-event-venue-map-loaded', load: 'data-event-venue-map-load' };

  useEffect(() => {
    if (isLoaded) frameRef.current?.focus();
  }, [isLoaded]);

  if (isLoaded) {
    return (
      <div id={id} className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-champagne/25 bg-black sm:aspect-[16/10] lg:aspect-[16/9]" {...{ [markers.map]: true, [markers.loaded]: true }}>
        <iframe
          src={mapUrl}
          title={labels.mapTitle}
          className="h-full w-full border-0"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          ref={frameRef}
        />
      </div>
    );
  }

  return (
    <div id={id} className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-xl border border-[#EAE3D5]/28 bg-[#0B0A09] px-6 text-center sm:aspect-[16/10] lg:aspect-[16/9]" {...{ [markers.map]: true, [markers.pending]: true }}>
      <p className="max-w-md text-base leading-7 text-[#C2B9AA]">{labels.privacyLoadNotice}</p>
      <button
        type="button"
        onClick={() => setIsLoaded(true)}
        {...{ [markers.load]: true }}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-[#EAE3D5] bg-[#141311] px-5 py-2.5 text-base font-semibold tracking-wide text-[#F6F1E7] transition-colors hover:bg-[#EAE3D5] hover:text-[#050505] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EAE3D5] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0A09]"
      >
        {labels.loadMap}
      </button>
    </div>
  );
}
