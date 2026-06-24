'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

interface VenuePin {
  id: string;
  name: string;
  address: string;
  slug: string;
  latitude: number;
  longitude: number;
  lang: string;
}

interface VenueMapProps {
  venues: VenuePin[];
}

export default function VenueMap({ venues }: VenueMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let L: typeof import('leaflet');
    let map: import('leaflet').Map;

    async function init() {
      L = (await import('leaflet')).default;

      if (!containerRef.current) return;

      map = L.map(containerRef.current, {
        center: [45.4654, 9.1859],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Custom gold pin icon
      const pinIcon = L.divIcon({
        className: '',
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 24 16 24S32 26.5 32 16C32 7.163 24.837 0 16 0z" fill="#F2D8A7"/>
          <circle cx="16" cy="16" r="6" fill="#131009"/>
        </svg>`,
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -42],
      });

      venues.forEach((venue) => {
        const gmUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address + ', Milan, Italy')}`;
        const clubUrl = `/${venue.lang === 'it' ? 'it/' : ''}clubs/${venue.slug}`;

        const popup = L.popup({ className: 'venue-popup', maxWidth: 220 }).setContent(`
          <div style="font-family:sans-serif;color:#fff;background:#1a1610;padding:12px 14px;border-radius:8px;min-width:180px">
            <div style="font-weight:700;font-size:14px;margin-bottom:4px">${venue.name}</div>
            <div style="font-size:11px;color:#999;margin-bottom:10px">${venue.address}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <a href="${clubUrl}" style="display:inline-block;padding:5px 10px;background:#F2D8A7;color:#131009;border-radius:20px;font-size:11px;font-weight:700;text-decoration:none">Info</a>
              <a href="${gmUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:5px 10px;background:#4285F4;color:#fff;border-radius:20px;font-size:11px;font-weight:700;text-decoration:none">Google Maps ↗</a>
            </div>
          </div>
        `);

        L.marker([venue.latitude, venue.longitude], { icon: pinIcon })
          .bindPopup(popup)
          .addTo(map);
      });
    }

    init();

    return () => {
      if (mapRef.current) {
        (mapRef.current as import('leaflet').Map).remove();
        mapRef.current = null;
      }
    };
  }, [venues]);

  return (
    <>
      <style>{`
        .leaflet-popup-content-wrapper,
        .leaflet-popup-tip {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
        .leaflet-container {
          background: #1a1610;
          font-family: inherit;
        }
        .leaflet-control-attribution {
          background: rgba(19,16,9,0.8) !important;
          color: #666 !important;
        }
        .leaflet-control-attribution a {
          color: #888 !important;
        }
        .leaflet-control-zoom a {
          background: #1a1610 !important;
          color: #F2D8A7 !important;
          border-color: rgba(255,255,255,0.1) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #2a2418 !important;
        }
      `}</style>
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
}
