'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MapPin, Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockVenues, mockEvents, mockZones, mockGuides } from '@/lib/data';

// Helper to highlight text
const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="text-champagne font-bold" style={{ textShadow: '0 0 8px rgba(201,168,106,0.4)' }}>{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export default function GlobalSearch({ currentLocale }: { currentLocale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  
  const typedLocale = (currentLocale === 'it' ? 'it' : 'en') as 'en' | 'it';
  const langPrefix = typedLocale === 'it' ? '/it' : '';

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  // Close on route change
  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      // We don't setIsOpen(false) here directly to avoid setState in effect
      // The component will unmount or we can handle it via a route change listener
      // Actually, since it's an overlay, we can just let it be or handle it in the click handler
    }
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleOpen = () => {
    setIsOpen(true);
    setQuery('');
  };

  // Toggle with CMD+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) setQuery('');
          return !prev;
        });
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Perform search
  const searchResults = () => {
    if (!debouncedQuery.trim()) return { venues: [], events: [], zones: [], guides: [] };
    
    const q = debouncedQuery.toLowerCase();
    
    const venues = mockVenues.filter(v => {
      const name = (v.localizedContent.name[typedLocale] || v.localizedContent.name.en).toLowerCase();
      const desc = (v.localizedContent.description[typedLocale] || v.localizedContent.description.en).toLowerCase();
      const dressCode = (v.localizedContent.dressCode[typedLocale] || v.localizedContent.dressCode.en).toLowerCase();
      const zone = v.zone.toLowerCase();
      const category = v.category.toLowerCase();
      return name.includes(q) || desc.includes(q) || dressCode.includes(q) || zone.includes(q) || category.includes(q);
    }).slice(0, 4);

    const events = mockEvents.filter(e => {
      const title = (e.localizedContent.title[typedLocale] || e.localizedContent.title.en).toLowerCase();
      const desc = (e.localizedContent.shortDescription[typedLocale] || e.localizedContent.shortDescription.en).toLowerCase();
      const genres = e.genre.map(g => g.toLowerCase()).join(' ');
      return title.includes(q) || desc.includes(q) || genres.includes(q);
    }).slice(0, 4);

    const zones = mockZones.filter(z => {
      const name = z.name.toLowerCase();
      const vibe = z.vibe.toLowerCase();
      const desc = (z.description[typedLocale] || z.description.en).toLowerCase();
      const tags = z.tags.join(' ').toLowerCase();
      return name.includes(q) || vibe.includes(q) || desc.includes(q) || tags.includes(q);
    }).slice(0, 3);

    const guides = mockGuides.filter(g => {
      const title = (g.title[typedLocale] || g.title.en).toLowerCase();
      const excerpt = (g.excerpt[typedLocale] || g.excerpt.en).toLowerCase();
      return title.includes(q) || excerpt.includes(q);
    }).slice(0, 3);

    return { venues, events, zones, guides };
  };

  const results = searchResults();
  const hasResults = results.venues.length > 0 || results.events.length > 0 || results.zones.length > 0 || results.guides.length > 0;


  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-champagne transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
        aria-label="Open Global Search"
      >
        <Search className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-charcoal/80 backdrop-blur-xl flex flex-col"
          >
            {/* Search Header */}
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-champagne/50" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={typedLocale === 'it' ? "Cerca locali, eventi, zone..." : "Search venues, events, zones..."}
                  className="w-full bg-transparent border-none text-3xl sm:text-5xl md:text-6xl font-serif text-champagne placeholder:text-champagne/30 focus:outline-none focus:ring-0 pl-12 sm:pl-16 py-4"
                />
              </div>
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Close Search"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
              {!debouncedQuery.trim() ? (
                <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-4">
                  <Search className="w-16 h-16 opacity-20" />
                  <p className="text-lg font-light tracking-widest uppercase">
                    {typedLocale === 'it' ? "L'Oracolo è in ascolto" : "The Oracle is listening"}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <kbd className="px-2 py-1 rounded bg-white/10 font-mono text-xs">CMD</kbd>
                    <span>+</span>
                    <kbd className="px-2 py-1 rounded bg-white/10 font-mono text-xs">K</kbd>
                  </div>
                </div>
              ) : !hasResults ? (
                <div className="flex flex-col items-center justify-center h-full text-white/50">
                  <p className="text-xl font-serif">
                    {typedLocale === 'it' ? "Nessun risultato trovato per" : "No results found for"} <span className="text-champagne">&quot;{debouncedQuery}&quot;</span>
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-8">
                  
                  {/* Venues */}
                  {results.venues.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase flex items-center gap-2 border-b border-white/10 pb-2">
                        <MapPin className="w-4 h-4" />
                        {typedLocale === 'it' ? "Locali & Rooftop" : "Venues & Rooftops"}
                      </h3>
                      <ul className="space-y-3">
                        {results.venues.map(venue => (
                          <li key={venue.id}>
                            <Link
                              href={`${langPrefix}/clubs/${venue.slugs[typedLocale] || venue.slugs.en}`}
                              onClick={handleClose}
                              className="w-full text-left group flex flex-col py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <span className="text-lg font-serif text-white group-hover:text-champagne transition-colors">
                                <HighlightText text={venue.localizedContent.name[typedLocale] || venue.localizedContent.name.en} query={debouncedQuery} />
                              </span>
                              <span className="text-sm text-white/50 uppercase tracking-wider">
                                <HighlightText text={venue.zone.replace('_', ' ')} query={debouncedQuery} />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Events */}
                  {results.events.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase flex items-center gap-2 border-b border-white/10 pb-2">
                        <Calendar className="w-4 h-4" />
                        {typedLocale === 'it' ? "Eventi" : "Events"}
                      </h3>
                      <ul className="space-y-3">
                        {results.events.map(event => {
                          const dateObj = new Date(event.dateISO);
                          const formattedTime = new Intl.DateTimeFormat(typedLocale === 'it' ? 'it-IT' : 'en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'Europe/Rome'
                          }).format(dateObj);

                          return (
                            <li key={event.id}>
                              <Link
                                href={`${langPrefix}/events/${event.localizedContent.slug[typedLocale] || event.localizedContent.slug.en}`}
                                onClick={handleClose}
                                className="w-full text-left group flex flex-col py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <span className="text-lg font-serif text-white group-hover:text-champagne transition-colors">
                                  <HighlightText text={event.localizedContent.title[typedLocale] || event.localizedContent.title.en} query={debouncedQuery} />
                                </span>
                                <span className="text-sm text-white/50 uppercase tracking-wider">
                                  {formattedTime} • <HighlightText text={event.genre.map(g => g.replace('_', ' ')).join(', ')} query={debouncedQuery} />
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Zones */}
                  {results.zones.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase flex items-center gap-2 border-b border-white/10 pb-2">
                        <MapPin className="w-4 h-4" />
                        {typedLocale === 'it' ? "Zone & Generi" : "Zones & Genres"}
                      </h3>
                      <ul className="space-y-3">
                        {results.zones.map(zone => (
                          <li key={zone.id}>
                            <Link
                              href={`${langPrefix}/zones/${zone.slug}`}
                              onClick={handleClose}
                              className="w-full text-left group flex flex-col py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <span className="text-lg font-serif text-white group-hover:text-champagne transition-colors">
                                <HighlightText text={zone.name} query={debouncedQuery} />
                              </span>
                              <span className="text-sm text-white/50 uppercase tracking-wider">
                                <HighlightText text={zone.vibe} query={debouncedQuery} />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Guides */}
                  {results.guides.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase flex items-center gap-2 border-b border-white/10 pb-2">
                        <BookOpen className="w-4 h-4" />
                        {typedLocale === 'it' ? "Guide" : "Guides"}
                      </h3>
                      <ul className="space-y-3">
                        {results.guides.map(guide => (
                          <li key={guide.id}>
                            <Link
                              href={`${langPrefix}/guides/${guide.slugs[typedLocale] || guide.slugs.en}`}
                              onClick={handleClose}
                              className="w-full text-left group flex flex-col py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <span className="text-lg font-serif text-white group-hover:text-champagne transition-colors">
                                <HighlightText text={guide.title[typedLocale] || guide.title.en} query={debouncedQuery} />
                              </span>
                              <span className="text-sm text-white/50 uppercase tracking-wider line-clamp-1">
                                <HighlightText text={guide.excerpt[typedLocale] || guide.excerpt.en} query={debouncedQuery} />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
