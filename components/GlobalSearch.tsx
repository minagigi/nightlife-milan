'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  MapPin,
  Calendar,
  BookOpen,
  Crown,
  Sparkles,
  Trophy,
  Wine,
  PartyPopper,
  QrCode,
  Music2,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockVenues, mockZones, mockGuides } from '@/lib/data';
import { CONTACT } from '@/config/contact';

const PRIORITY_CLUBS_QUICK = [
  {
    rank: 1,
    id: 'v-justme',
    slug: 'just-me-milano',
    name: 'Just Me Milano',
    zone: { en: 'Parco Sempione · Torre Branca', it: 'Parco Sempione · Torre Branca' },
    badge: { en: '#1 Priority · Open 7/7 · VIP €350+', it: 'Priorità #1 · Aperto 7/7 · VIP 350€+' },
    searchTerms: 'just me milano Italo Rota torre branca parco sempione royal aperitivo vip tables',
  },
  {
    rank: 2,
    id: 'v-pineta',
    slug: 'pineta-club-milano',
    name: 'Pineta Club',
    zone: { en: 'Corso Como · Via Messina 38', it: 'Corso Como · Via Messina 38' },
    badge: { en: '#2 Priority · Singing Aperitivo & Reggaeton', it: 'Priorità #2 · Aperitivo Cantato & Reggaeton' },
    searchTerms: 'pineta club milano via messina 38 corso como aperitivo cantato noche de perreo reggaeton',
  },
  {
    rank: 3,
    id: 'v-aria',
    slug: 'aria-club-milano',
    name: 'Aria Club Milano',
    zone: { en: 'San Siro · 150m from Stadium', it: 'San Siro · A 150m dallo Stadio' },
    badge: { en: '#3 Priority · San Siro Post-Match & Garden', it: 'Priorità #3 · Dopo-Partita San Siro & Giardino' },
    searchTerms: 'aria club milano piazzale dello sport 14 san siro stadio inter milan dopo partita garden',
  },
  {
    rank: 4,
    id: 'v-55milano',
    slug: '55-milano',
    name: '55 Milano',
    zone: { en: 'Sempione / CityLife · Via P. della Francesca 55', it: 'Sempione / CityLife · Via P. della Francesca 55' },
    badge: { en: '#4 Priority · 1,000 sqm Apericena & Dinner Show', it: 'Priorità #4 · 1.000 mq Apericena & Dinner Show' },
    searchTerms: '55 milano cinquantacinque via piero della francesca apericena buffet dinner show laurea compleanno',
  },
  {
    rank: 5,
    id: 'v-voya',
    slug: 'voya-rooftop-milan',
    name: 'Voya Rooftop',
    zone: { en: 'Portello / Isola · 20th Floor Skyline', it: 'Portello / Isola · 20° Piano Skyline' },
    badge: { en: '#5 Priority · 20th Floor Panoramic Sky Lounge', it: 'Priorità #5 · Sky Lounge 20° Piano Panoramico' },
    searchTerms: 'voya rooftop milan 20 piano ventesimo piano via achille papa 30 skyline sunset aperitivo',
  },
  {
    rank: 6,
    id: 'v-repvblic',
    slug: 'repvblic-milano',
    name: 'Repvblic Milano',
    zone: { en: 'Ripamonti / Mecenate · Via Fantoli 9', it: 'Ripamonti / Mecenate · Via Fantoli 9' },
    badge: { en: '#6 Priority · Dirty Monday Hip-Hop & House', it: 'Priorità #6 · Dirty Monday Hip-Hop & House' },
    searchTerms: 'repvblic milano republic via fantoli 9 dirty monday hip hop house urban fashion',
  },
] as const;

const STRATEGIC_HUBS = [
  {
    id: 'hub-football',
    href: '/football-afterparties',
    icon: 'trophy',
    title: {
      en: 'San Siro Football Afterparties (Inter & AC Milan)',
      it: 'Dopo-Partita Calcio San Siro (Inter & Milan)',
    },
    subtitle: {
      en: 'Serie A, Champions League, Derby & Coppa Italia · Aria Club 150m away',
      it: 'Serie A, Champions League, Derby & Coppa Italia · Aria Club a 150m',
    },
    searchTerms:
      'dopo partita calcio san siro inter ac milan serie a champions league derby della madonnina coppa italia stadio meazza terzo tempo aria club 150m',
  },
  {
    id: 'hub-nye',
    href: '/new-years-eve',
    icon: 'party',
    title: {
      en: "New Year's Eve 2027 in Milan (Capodanno Cenone & VIP Tables)",
      it: 'Capodanno 2027 a Milano (Cenone, Rooftop & Tavoli VIP)',
    },
    subtitle: {
      en: '31 Dec Gala Dinners, 20th Floor Fireworks at Voya, Just Me, Pineta, Aria & 55',
      it: '31 Dicembre Cenoni Cantati, Fuochi 20° Piano Voya, Just Me, Pineta, Aria & 55',
    },
    searchTerms:
      'capodanno 2027 milano new years eve nye 31 dicembre cenone veglione discoteca tavoli vip fuochi artificio just me voya pineta aria 55 milano repvblic',
  },
  {
    id: 'hub-concerts',
    href: '/concert-afterparties',
    icon: 'music',
    title: {
      en: 'Concert Afterparties (San Siro, Ippodromo La Maura & Unipol Forum)',
      it: 'Afterparty Concerti (San Siro, Ippodromo La Maura & Forum Assago)',
    },
    subtitle: {
      en: 'Official post-concert VIP tables & guest lists · Aria 150m from San Siro',
      it: 'Tavoli VIP e liste post-concerto · Aria Club a 150m da San Siro e Ippodromo',
    },
    searchTerms:
      'afterparty concerti milano dopo concerto san siro ippodromo la maura snai i-days unipol forum assago fabrique alcatraz aria club just me',
  },
  {
    id: 'hub-fashion-week',
    href: '/fashion-week',
    icon: 'crown',
    title: {
      en: 'Milan Fashion Week (MFW), Fuorisalone & Monza F1 GP Parties',
      it: 'Milano Fashion Week (MFW), Fuorisalone & Party Monza F1 GP',
    },
    subtitle: {
      en: 'VIP model tables, private brand afterparties & F1 drivers hospitality',
      it: 'Tavoli VIP sfilate, afterparty privati brand & ospitalità piloti F1 Monza',
    },
    searchTerms:
      'milan fashion week mfw settimana della moda sfilate fuorisalone salone del mobile design week formula 1 f1 gp monza afterparty modelli vip just me voya repvblic volt',
  },
  {
    id: 'hub-rooftops',
    href: '/rooftops',
    icon: 'wine',
    title: {
      en: 'Panoramic Rooftops & Sky Lounges',
      it: 'Rooftop & Sky Lounge Panoramici',
    },
    subtitle: {
      en: 'Voya 20th Floor, Terrazza Duomo 21, Ceresio 7 & MIB',
      it: 'Voya 20° Piano, Terrazza Duomo 21, Ceresio 7 & MIB',
    },
    searchTerms:
      'rooftop terrazze panoramiche sky lounge voya 20 piano ventesimo piano terrazza duomo 21 ceresio 7 mib tramonto skyline aperitivo vista',
  },
  {
    id: 'hub-private-parties',
    href: '/private-parties',
    icon: 'party',
    title: {
      en: 'Graduation, 18th, Birthday & Bachelorette Parties',
      it: 'Feste di Laurea, 18 Anni, Compleanni & Nubilato/Celibato',
    },
    subtitle: {
      en: 'Custom VIP packages at 55 Milano, Pineta, Aria, Voya & Just Me',
      it: 'Pacchetti VIP su misura da 55 Milano, Pineta, Aria, Voya & Just Me',
    },
    searchTerms:
      'feste di laurea 18 anni diciottesimo compleanno addio al nubilato celibato eventi privati aziendali pacchetti bottiglie torta',
  },
  {
    id: 'hub-guest-lists',
    href: '/guest-lists',
    icon: 'qr',
    title: {
      en: 'Official Guest Lists & Fast-Track QR Pass',
      it: 'Liste Ingresso & QR Salta-Fila Ufficiali',
    },
    subtitle: {
      en: 'Nominal accreditation, door selection & dress code rules',
      it: 'Accredito nominale, selezione porta & regole dress code',
    },
    searchTerms:
      'liste ingresso qr salta fila guest list accredito nominale riduzione omaggio donna selezione porta dress code',
  },
  {
    id: 'hub-bottle-prices',
    href: '/bottle-prices',
    icon: 'crown',
    title: {
      en: 'Official Bottle Service Price List 2026/2027',
      it: 'Listino Prezzi Bottiglie & Tavoli VIP 2026/2027',
    },
    subtitle: {
      en: 'Dom Pérignon, Belvedere, Don Julio 1942, Magnum & Mathusalem',
      it: 'Dom Pérignon, Belvedere, Don Julio 1942, Magnum & Mathusalem',
    },
    searchTerms:
      'listino prezzi bottiglie tavoli vip 2026 2027 minimum spend dom perignon belvedere grey goose azul don julio 1942 magnum jeroboam',
  },
  {
    id: 'hub-vip-tables',
    href: '/vip-tables',
    icon: 'sparkles',
    title: {
      en: 'VIP Table Booking & Console Privé Concierge',
      it: 'Prenotazione Tavoli VIP & Privé Console Concierge',
    },
    subtitle: {
      en: 'Direct floorplans, zero agency markup & instant WhatsApp confirmation',
      it: 'Planimetrie ufficiali, zero commissioni e conferma WhatsApp in 10 min',
    },
    searchTerms:
      'tavoli vip prive console backstage prenotazione tavolo discoteca milano concierge whatsapp',
  },
] as const;

const ALL_TEN_GENRES = [
  { slug: 'house', label: { en: 'House & Tech-House', it: 'House & Tech-House' }, terms: 'house tech house club' },
  { slug: 'afro-house', label: { en: 'Afro-House & Tribal', it: 'Afro-House & Tribal' }, terms: 'afro house tribal amapiano keinemusik' },
  { slug: 'dinner-show', label: { en: 'Dinner Show & Singing Aperitivo', it: 'Dinner Show & Aperitivo Cantato' }, terms: 'dinner show cena cantata aperitivo cantato pineta 55 milano' },
  { slug: 'techno', label: { en: 'Techno & Underground', it: 'Techno & Underground' }, terms: 'techno melodic underground industrial warehouse' },
  { slug: 'reggaeton', label: { en: 'Reggaeton & Urban Latin', it: 'Reggaeton & Urban Latin' }, terms: 'reggaeton perreo latin dembow pineta' },
  { slug: 'hip-hop', label: { en: 'Hip-Hop, Trap & R&B', it: 'Hip-Hop, Trap & R&B' }, terms: 'hip hop trap rnb urban afrobeats repvblic' },
  { slug: 'commercial', label: { en: 'Commercial & Hits', it: 'Commerciale & Hits' }, terms: 'commerciale hits party pop dance' },
  { slug: 'edm', label: { en: 'EDM & Mainstage', it: 'EDM & Mainstage' }, terms: 'edm mainstage festival progressive' },
  { slug: 'live-music', label: { en: 'Live Music & Concerts', it: 'Live Music & Concerti' }, terms: 'live music concerti band' },
  { slug: 'indie', label: { en: 'Indie & Alternative', it: 'Indie & Alternativa' }, terms: 'indie alternative elettronica' },
] as const;

const searchableEventbriteEvents = [
  {
    id: 'eb-1994392210790',
    dateISO: '2026-11-25T19:30:00+02:00',
    genre: ['HOUSE', 'HIP_HOP', 'COMMERCIAL'],
    searchTerms: 'gue guè gue pequeno guè pequeno just me milano live performance',
    localizedContent: {
      title: { en: 'Guè — Live performance', it: 'Guè — Performance live' },
      shortDescription: {
        en: 'Guè live at Just Me Milan.',
        it: 'Guè live al Just Me Milano.',
      },
      slug: {
        en: 'gue-live-performance-just-me-milan-july-25-2026',
        it: 'gue-live-performance-just-me-milan-july-25-2026',
      },
    },
  },
  {
    id: 'eb-1994228700727',
    dateISO: '2026-11-19T19:30:00+02:00',
    genre: ['HOUSE', 'HIP_HOP', 'REGGAETON', 'EDM', 'COMMERCIAL'],
    searchTerms: 'world cup coppa del mondo finale spagna argentina maxischermo just me milano',
    localizedContent: {
      title: {
        en: 'World Cup Final on the Big Screen at Just Me Milan',
        it: 'Finale Coppa del Mondo su maxischermo al Just Me Milano',
      },
      shortDescription: {
        en: 'Spain vs Argentina on the big screen at Just Me Milan.',
        it: 'Spagna-Argentina su maxischermo al Just Me Milano.',
      },
      slug: {
        en: 'world-cup-final-spain-argentina-big-screen-milan-just-me-july-19-2026',
        it: 'finale-coppa-del-mondo-maxischermo-milano-just-me-19-luglio-2026',
      },
    },
  },
] as const;

const normalizeSearchText = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function romeDayKey(value: string | Date): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(typeof value === 'string' ? new Date(value) : value);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((entry) => entry.type === type)?.value || '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

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
  const langPrefix = currentLocale === 'en' ? '' : `/${currentLocale}`;

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

  const prevPathname = useRef(pathname);
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 200);
    return () => clearTimeout(handler);
  }, [query]);

  const searchResults = () => {
    if (!debouncedQuery.trim()) {
      return { venues: [], hubs: [], genres: [], events: [], zones: [], guides: [] };
    }

    const q = normalizeSearchText(debouncedQuery);

    const priorityRankMap: Record<string, number> = {
      'v-justme': 1,
      'v-pineta': 2,
      'v-aria': 3,
      'v-55milano': 4,
      'v-voya': 5,
      'v-repvblic': 6,
    };

    const venues = [...mockVenues]
      .filter((v) => {
        const name = normalizeSearchText(v.localizedContent.name[typedLocale] || v.localizedContent.name.en);
        const desc = normalizeSearchText(v.localizedContent.description[typedLocale] || v.localizedContent.description.en);
        const dressCode = normalizeSearchText(v.localizedContent.dressCode[typedLocale] || v.localizedContent.dressCode.en);
        const zone = normalizeSearchText(v.zone);
        const category = normalizeSearchText(v.category);
        const extra = PRIORITY_CLUBS_QUICK.find((p) => p.id === v.id)?.searchTerms || '';
        return (
          name.includes(q) ||
          desc.includes(q) ||
          dressCode.includes(q) ||
          zone.includes(q) ||
          category.includes(q) ||
          normalizeSearchText(extra).includes(q)
        );
      })
      .sort((a, b) => {
        const rA = priorityRankMap[a.id] ?? 99;
        const rB = priorityRankMap[b.id] ?? 99;
        if (rA !== rB) return rA - rB;
        return (b.priorityScore || 0) - (a.priorityScore || 0);
      })
      .slice(0, 6);

    const hubs = STRATEGIC_HUBS.filter((h) => {
      const title = normalizeSearchText(h.title[typedLocale]);
      const sub = normalizeSearchText(h.subtitle[typedLocale]);
      const terms = normalizeSearchText(h.searchTerms);
      return title.includes(q) || sub.includes(q) || terms.includes(q);
    });

    const genres = ALL_TEN_GENRES.filter((g) => {
      const label = normalizeSearchText(g.label[typedLocale]);
      const terms = normalizeSearchText(g.terms);
      return label.includes(q) || terms.includes(q) || g.slug.includes(q);
    });

    const todayKey = romeDayKey(new Date());
    const events = searchableEventbriteEvents
      .filter((e) => {
        if (romeDayKey(e.dateISO) < todayKey) return false;
        const title = normalizeSearchText(e.localizedContent.title[typedLocale] || e.localizedContent.title.en);
        const desc = normalizeSearchText(e.localizedContent.shortDescription[typedLocale] || e.localizedContent.shortDescription.en);
        const gText = normalizeSearchText(e.genre.join(' '));
        return title.includes(q) || desc.includes(q) || gText.includes(q) || normalizeSearchText(e.searchTerms).includes(q);
      })
      .slice(0, 4);

    const zones = mockZones
      .filter((z) => {
        const name = normalizeSearchText(z.name);
        const vibe = normalizeSearchText(z.vibe);
        const desc = normalizeSearchText(z.description[typedLocale] || z.description.en);
        const tags = normalizeSearchText(z.tags.join(' '));
        return name.includes(q) || vibe.includes(q) || desc.includes(q) || tags.includes(q) || z.slug.includes(q);
      })
      .slice(0, 6);

    const guides = mockGuides
      .filter((g) => {
        const title = normalizeSearchText(g.title[typedLocale] || g.title.en);
        const excerpt = normalizeSearchText(g.excerpt[typedLocale] || g.excerpt.en);
        return title.includes(q) || excerpt.includes(q);
      })
      .slice(0, 4);

    return { venues, hubs, genres, events, zones, guides };
  };

  const results = searchResults();
  const hasResults =
    results.venues.length > 0 ||
    results.hubs.length > 0 ||
    results.genres.length > 0 ||
    results.events.length > 0 ||
    results.zones.length > 0 ||
    results.guides.length > 0;

  const renderHubIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="w-4 h-4 text-champagne" />;
      case 'wine':
        return <Wine className="w-4 h-4 text-champagne" />;
      case 'party':
        return <PartyPopper className="w-4 h-4 text-champagne" />;
      case 'music':
        return <Music2 className="w-4 h-4 text-champagne" />;
      case 'qr':
        return <QrCode className="w-4 h-4 text-champagne" />;
      case 'crown':
        return <Crown className="w-4 h-4 text-champagne" />;
      default:
        return <Sparkles className="w-4 h-4 text-champagne" />;
    }
  };

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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-2xl flex flex-col"
          >
            {/* Search Header */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex items-center gap-4 border-b border-white/10">
              <div className="flex-1 relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 text-champagne/60" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    typedLocale === 'it'
                      ? 'Cerca Just Me, San Siro, Capodanno 2027, Concerti, Fashion Week...'
                      : 'Search Just Me, San Siro, NYE 2027, Concerts, Fashion Week...'
                  }
                  className="w-full bg-transparent border-none text-xl sm:text-3xl md:text-4xl font-serif text-champagne placeholder:text-champagne/30 focus:outline-none focus:ring-0 pl-9 sm:pl-12 py-3"
                />
              </div>
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-2.5 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Close Search"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Search Results / Instant Discovery Index */}
            <div className="flex-1 overflow-y-auto w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
              {!debouncedQuery.trim() ? (
                <div className="space-y-10">
                  {/* 1. The 6 Priority Clubs */}
                  <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-4">
                      <h3 className="text-xs font-bold tracking-widest text-champagne uppercase flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        {typedLocale === 'it'
                          ? 'I 6 Club Prioritari Ufficiali (Ordine di Scelta)'
                          : 'Top 6 Priority Partner Clubs (Official Selection)'}
                      </h3>
                      <Link
                        href={`${langPrefix}/clubs`}
                        onClick={handleClose}
                        className="text-xs text-white/50 hover:text-champagne uppercase tracking-wider flex items-center gap-1"
                      >
                        {typedLocale === 'it' ? 'Tutti i 19 Club' : 'All 19 Clubs'}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {PRIORITY_CLUBS_QUICK.map((club) => (
                        <Link
                          key={club.id}
                          href={`${langPrefix}/clubs/${club.slug}`}
                          onClick={handleClose}
                          className="group flex flex-col justify-between p-3.5 rounded-xl border border-champagne/20 bg-white/[0.03] hover:bg-champagne/10 hover:border-champagne/50 transition-all"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-serif text-base text-white group-hover:text-champagne font-medium">
                              {club.rank}. {club.name}
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-champagne/15 text-champagne">
                              #{club.rank}
                            </span>
                          </div>
                          <span className="text-xs text-white/55">{club.zone[typedLocale]}</span>
                          <span className="text-[11px] text-champagne/80 mt-1.5 font-medium">
                            {club.badge[typedLocale]}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* 2. Strategic Nightlife Hubs */}
                  <div>
                    <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase flex items-center gap-2 border-b border-white/10 pb-2.5 mb-4">
                      <Sparkles className="w-4 h-4 text-champagne" />
                      {typedLocale === 'it'
                        ? 'Hub Strategici & Esperienze VIP 2026/2027'
                        : 'Strategic Hubs & VIP Experiences 2026/2027'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {STRATEGIC_HUBS.map((hub) => (
                        <Link
                          key={hub.id}
                          href={`${langPrefix}${hub.href}`}
                          onClick={handleClose}
                          className="group flex items-start gap-3.5 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-champagne/40 transition-all"
                        >
                          <div className="mt-0.5 p-2 rounded-lg bg-champagne/10 border border-champagne/20">
                            {renderHubIcon(hub.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-serif text-base text-white group-hover:text-champagne transition-colors">
                              {hub.title[typedLocale]}
                            </p>
                            <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                              {hub.subtitle[typedLocale]}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* 3. All 10 Music Genres & 14 Milan Zones */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                        <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase flex items-center gap-2">
                          <Music2 className="w-4 h-4 text-champagne" />
                          {typedLocale === 'it' ? 'Tutti i 10 Generi Musicali' : 'All 10 Music Genres'}
                        </h3>
                        <Link
                          href={`${langPrefix}/genres`}
                          onClick={handleClose}
                          className="text-xs text-champagne hover:underline"
                        >
                          /genres
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {ALL_TEN_GENRES.map((g) => (
                          <Link
                            key={g.slug}
                            href={`${langPrefix}/genres/${g.slug}`}
                            onClick={handleClose}
                            className="px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/[0.03] text-white/80 hover:text-champagne hover:border-champagne/40 transition-colors"
                          >
                            {g.label[typedLocale]}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                        <h3 className="text-xs font-bold tracking-widest text-white/50 uppercase flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-champagne" />
                          {typedLocale === 'it' ? 'Tutte le 14 Zone di Milano' : 'All 14 Milan Nightlife Zones'}
                        </h3>
                        <Link
                          href={`${langPrefix}/zones`}
                          onClick={handleClose}
                          className="text-xs text-champagne hover:underline"
                        >
                          /zones
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mockZones.map((z) => (
                          <Link
                            key={z.slug}
                            href={`${langPrefix}/zones/${z.slug}`}
                            onClick={handleClose}
                            className="px-3 py-1.5 rounded-full text-xs border border-white/10 bg-white/[0.03] text-white/80 hover:text-champagne hover:border-champagne/40 transition-colors"
                          >
                            {z.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 4. Direct Concierge Footer */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
                    <div>
                      {typedLocale === 'it'
                        ? 'Desk Ufficiale VIP Concierge Milano 24/7:'
                        : 'Official 24/7 Milan VIP Concierge Desk:'}{' '}
                      <span className="text-champagne font-medium">+39 351 912 7047</span> ·{' '}
                      <a href="mailto:concierge@nightlifemilan.com" className="text-white/70 hover:text-champagne underline">
                        concierge@nightlifemilan.com
                      </a>
                    </div>
                    <a
                      href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(
                        typedLocale === 'it'
                          ? 'Ciao Concierge Nightlife Milan! Vorrei informazioni su tavoli VIP e liste.'
                          : 'Hi Nightlife Milan Concierge! I would like info about VIP tables and guest lists.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-champagne text-black font-bold uppercase tracking-wider text-xs hover:bg-champagne/90 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp +39 351 912 7047
                    </a>
                  </div>
                </div>
              ) : !hasResults ? (
                <div className="flex flex-col items-center justify-center py-16 text-white/50 space-y-4">
                  <p className="text-xl font-serif">
                    {typedLocale === 'it' ? 'Nessun risultato trovato per' : 'No results found for'}{' '}
                    <span className="text-champagne">&quot;{debouncedQuery}&quot;</span>
                  </p>
                  <a
                    href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(
                      typedLocale === 'it'
                        ? `Ciao! Sto cercando "${debouncedQuery}" a Milano, potete aiutarmi?`
                        : `Hi! I'm looking for "${debouncedQuery}" in Milan, can you help me?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-champagne text-black font-bold uppercase tracking-wider text-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {typedLocale === 'it' ? 'Chiedi al Concierge (+39 351 912 7047)' : 'Ask Concierge (+39 351 912 7047)'}
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mt-4">
                  {/* Venues */}
                  {results.venues.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase flex items-center gap-2 border-b border-white/10 pb-2">
                        <MapPin className="w-4 h-4 text-champagne" />
                        {typedLocale === 'it' ? 'Locali & Rooftop' : 'Venues & Rooftops'}
                      </h3>
                      <ul className="space-y-3">
                        {results.venues.map((venue) => (
                          <li key={venue.id}>
                            <Link
                              href={`${langPrefix}/clubs/${venue.slugs[typedLocale] || venue.slugs.en}`}
                              onClick={handleClose}
                              className="w-full text-left group flex flex-col py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <span className="text-lg font-serif text-white group-hover:text-champagne transition-colors">
                                <HighlightText
                                  text={venue.localizedContent.name[typedLocale] || venue.localizedContent.name.en}
                                  query={debouncedQuery}
                                />
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

                  {/* Strategic Hubs & Genres */}
                  {(results.hubs.length > 0 || results.genres.length > 0) && (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold tracking-widest text-white/40 uppercase flex items-center gap-2 border-b border-white/10 pb-2">
                        <Sparkles className="w-4 h-4 text-champagne" />
                        {typedLocale === 'it' ? 'Hub Strategici & Generi' : 'Strategic Hubs & Genres'}
                      </h3>
                      <ul className="space-y-3">
                        {results.hubs.map((hub) => (
                          <li key={hub.id}>
                            <Link
                              href={`${langPrefix}${hub.href}`}
                              onClick={handleClose}
                              className="w-full text-left group flex flex-col py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <span className="text-lg font-serif text-white group-hover:text-champagne transition-colors">
                                <HighlightText text={hub.title[typedLocale]} query={debouncedQuery} />
                              </span>
                              <span className="text-xs text-white/50">
                                <HighlightText text={hub.subtitle[typedLocale]} query={debouncedQuery} />
                              </span>
                            </Link>
                          </li>
                        ))}
                        {results.genres.map((g) => (
                          <li key={g.slug}>
                            <Link
                              href={`${langPrefix}/genres/${g.slug}`}
                              onClick={handleClose}
                              className="w-full text-left group flex flex-col py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <span className="text-lg font-serif text-white group-hover:text-champagne transition-colors">
                                <HighlightText text={g.label[typedLocale]} query={debouncedQuery} />
                              </span>
                              <span className="text-xs text-white/50 uppercase tracking-wider">
                                {typedLocale === 'it' ? 'Genere Musicale' : 'Music Genre'} · /genres/{g.slug}
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
                        <Calendar className="w-4 h-4 text-champagne" />
                        {typedLocale === 'it' ? 'Eventi' : 'Events'}
                      </h3>
                      <ul className="space-y-3">
                        {results.events.map((event) => {
                          const dateObj = new Date(event.dateISO);
                          const formattedTime = new Intl.DateTimeFormat(typedLocale === 'it' ? 'it-IT' : 'en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: 'Europe/Rome',
                          }).format(dateObj);

                          return (
                            <li key={event.id}>
                              <Link
                                href={`${langPrefix}/events/${event.localizedContent.slug[typedLocale] || event.localizedContent.slug.en}`}
                                onClick={handleClose}
                                className="w-full text-left group flex flex-col py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors"
                              >
                                <span className="text-lg font-serif text-white group-hover:text-champagne transition-colors">
                                  <HighlightText
                                    text={event.localizedContent.title[typedLocale] || event.localizedContent.title.en}
                                    query={debouncedQuery}
                                  />
                                </span>
                                <span className="text-sm text-white/50 uppercase tracking-wider">
                                  {formattedTime} •{' '}
                                  <HighlightText
                                    text={event.genre.map((g) => g.replace('_', ' ')).join(', ')}
                                    query={debouncedQuery}
                                  />
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
                        <MapPin className="w-4 h-4 text-champagne" />
                        {typedLocale === 'it' ? 'Zone & Quartieri (14)' : 'Zones & Districts (14)'}
                      </h3>
                      <ul className="space-y-3">
                        {results.zones.map((zone) => (
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
                        <BookOpen className="w-4 h-4 text-champagne" />
                        {typedLocale === 'it' ? 'Guide Insider' : 'Insider Guides'}
                      </h3>
                      <ul className="space-y-3">
                        {results.guides.map((guide) => (
                          <li key={guide.id}>
                            <Link
                              href={`${langPrefix}/guides/${guide.slugs[typedLocale] || guide.slugs.en}`}
                              onClick={handleClose}
                              className="w-full text-left group flex flex-col py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <span className="text-lg font-serif text-white group-hover:text-champagne transition-colors">
                                <HighlightText
                                  text={guide.title[typedLocale] || guide.title.en}
                                  query={debouncedQuery}
                                />
                              </span>
                              <span className="text-sm text-white/50 uppercase tracking-wider line-clamp-1">
                                <HighlightText
                                  text={guide.excerpt[typedLocale] || guide.excerpt.en}
                                  query={debouncedQuery}
                                />
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
