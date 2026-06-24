'use client';

import { useState } from 'react';
import { Map, Grid } from 'lucide-react';
import VenueCard, { VenueProps } from './VenueCard';

interface VenueMapToggleProps {
  venues: VenueProps[];
  lang: string;
}

export default function VenueMapToggle({ venues, lang }: VenueMapToggleProps) {
  const [view, setView] = useState<'grid' | 'map'>('grid');

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
            All Venues
          </h2>
          <p className="text-white/40">
            Explore the complete directory of Milan&apos;s finest clubs.
          </p>
        </div>
        
        <button
          onClick={() => setView(view === 'grid' ? 'map' : 'grid')}
          className="flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors text-sm font-medium tracking-wider uppercase"
        >
          {view === 'grid' ? (
            <>
              <Map className="w-4 h-4 text-champagne" />
              <span>Switch to Map View</span>
            </>
          ) : (
            <>
              <Grid className="w-4 h-4 text-champagne" />
              <span>Switch to Grid View</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="relative min-h-[600px]">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {venues.map((venue) => (
              <VenueCard key={venue.id} {...venue} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[600px] rounded-lg overflow-hidden border border-white/10 relative animate-in fade-in duration-500 bg-white/[0.03]">
            {/* Elegant Map Placeholder */}
            <div 
              className="absolute inset-0 opacity-40 bg-cover bg-center"
              style={{ backgroundImage: 'url("https://picsum.photos/seed/milanmap/1600/900?grayscale&blur=1")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#131009]/50 to-[#131009]" />
            
            {/* Gold Pins */}
            {venues.map((venue, index) => {
              // Generate pseudo-random positions for the pins based on index
              const top = `${20 + (index * 15) % 60}%`;
              const left = `${10 + (index * 25) % 80}%`;
              
              return (
                <div 
                  key={venue.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ top, left }}
                >
                  <div className="relative">
                    <MapPinIcon className="w-8 h-8 text-champagne drop-shadow-[0_0_10px_rgba(242,216,167,0.5)]" />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md border border-white/10 text-white px-3 py-1.5 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {venue.name}
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full text-sm font-medium tracking-wide text-champagne">
              Interactive Map Active
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" fill="#131009" />
    </svg>
  );
}
