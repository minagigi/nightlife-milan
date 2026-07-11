'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { tr } from '@/lib/i18n/t';
import { useCallback } from 'react';
import { MusicGenre, MilanZone } from '@/lib/types';

interface EventFiltersProps {
  lang: string;
}

export default function EventFilters({ lang }: EventFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentGenre = searchParams.get('genre') || '';
  const currentZone = searchParams.get('zone') || '';
  const currentPrice = searchParams.get('price') || '';

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    const newUrl = `${pathname}?${createQueryString(name, value)}`;
    router.push(newUrl, { scroll: false });
  };

  const isIt = lang === 'it';

  // Format enum values for display (e.g., PORTA_VENEZIA -> PORTA VENEZIA)
  const formatEnum = (val: string) => val.replace(/_/g, ' ');

  const hasFilters = currentGenre || currentZone || currentPrice;

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-20 relative">
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-charcoal/50 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-xl">
        {/* Genre Filter */}
        <div className="relative w-full sm:w-auto flex-1">
          <select
            value={currentGenre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="w-full appearance-none bg-black/40 border border-white/10 text-white rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-champagne/50 transition-colors cursor-pointer text-sm tracking-wider uppercase"
            aria-label={tr(lang, 'Filter by Genre', 'Filtra per Genere')}
          >
            <option value="">{tr(lang, 'All Genres', 'Tutti i Generi')}</option>
            {Object.values(MusicGenre).map((genre) => (
              <option key={genre} value={genre}>
                {formatEnum(genre)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Zone Filter */}
        <div className="relative w-full sm:w-auto flex-1">
          <select
            value={currentZone}
            onChange={(e) => handleFilterChange('zone', e.target.value)}
            className="w-full appearance-none bg-black/40 border border-white/10 text-white rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-champagne/50 transition-colors cursor-pointer text-sm tracking-wider uppercase"
            aria-label={tr(lang, 'Filter by Zone', 'Filtra per Zona')}
          >
            <option value="">{tr(lang, 'All Zones', 'Tutte le Zone')}</option>
            {Object.values(MilanZone).map((zone) => (
              <option key={zone} value={zone}>
                {formatEnum(zone)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Price Filter */}
        <div className="relative w-full sm:w-auto flex-1">
          <select
            value={currentPrice}
            onChange={(e) => handleFilterChange('price', e.target.value)}
            className="w-full appearance-none bg-black/40 border border-white/10 text-white rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-champagne/50 transition-colors cursor-pointer text-sm tracking-wider uppercase"
            aria-label={tr(lang, 'Filter by Price', 'Filtra per Prezzo')}
          >
            <option value="">{tr(lang, 'All Prices', 'Tutti i Prezzi')}</option>
            <option value="free">{tr(lang, 'Free Entry', 'Ingresso Gratuito')}</option>
            <option value="under30">{tr(lang, 'Under 30€', 'Sotto i 30€')}</option>
            <option value="over30">{isIt ? '30€+' : '30€+'}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Reset Filters Button */}
        {hasFilters && (
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 font-serif text-champagne hover:text-white transition-colors text-sm tracking-wider uppercase whitespace-nowrap"
          >
            {tr(lang, 'Reset Filters', 'Azzera Filtri')}
          </button>
        )}
      </div>
    </section>
  );
}
