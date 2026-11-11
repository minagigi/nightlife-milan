'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { getConciergeBookingUrl } from '@/lib/conciergeBooking';
import { capodannoCategoryPath, capodannoEventPath } from '@/lib/capodanno/routes';
import { getCapodannoLocalizedEventTitle, getCapodannoUiCopy } from '@/lib/capodanno/i18n';
import { getScarcityAndChatCopy } from '@/lib/i18n/scarcityAndChatCopy';
import type {
  CapodannoEventItem,
  CapodannoVenueType,
  CapodannoAudience,
  CapodannoFormula,
  CapodannoMusicTag,
  CapodannoZoneTag,
  CapodannoCategoryPageDef,
} from '@/lib/capodannoEvents';

type Props = {
  events: readonly CapodannoEventItem[];
  categoryPages: readonly CapodannoCategoryPageDef[];
  activeSlug: string;
  isIt: boolean;
  locale?: string;
  prefix: string;
};

export default function CapodannoInteractiveFilter({
  events,
  categoryPages,
  activeSlug,
  isIt,
  locale = isIt ? 'it' : 'en',
  prefix,
}: Props) {
  const [venueType, setVenueType] = useState<'all' | CapodannoVenueType>('all');
  const [audience, setAudience] = useState<'all' | CapodannoAudience>('all');
  const [formula, setFormula] = useState<'all' | CapodannoFormula>('all');
  const [musicTag, setMusicTag] = useState<'all' | CapodannoMusicTag>('all');
  const [zoneTag, setZoneTag] = useState<'all' | CapodannoZoneTag>('all');
  const [budget, setBudget] = useState<'all' | 'free' | 'low' | 'mid' | 'lux'>('all');
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((ev) => {
      if (venueType !== 'all' && ev.venueType !== venueType) return false;
      if (audience !== 'all' && !ev.audiences.includes(audience)) return false;
      if (formula !== 'all' && !ev.formulas.includes(formula)) return false;
      if (musicTag !== 'all' && ev.musicTag !== musicTag) return false;
      if (zoneTag !== 'all' && ev.zoneTag !== zoneTag) return false;
      if (budget === 'free' && ev.priceFromEur > 0) return false;
      if (budget === 'low' && ev.priceFromEur > 35) return false;
      if (budget === 'mid' && (ev.priceFromEur < 35 || ev.priceFromEur > 70)) return false;
      if (budget === 'lux' && ev.priceFromEur < 70) return false;
      if (q) {
        const hay = `${ev.venueName} ${ev.titleIt} ${ev.titleEn} ${ev.city} ${ev.address} ${ev.musicAndFormatIt} ${ev.priceSummaryIt}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [events, venueType, audience, formula, musicTag, zoneTag, budget, query]);

  const hasActiveFilter =
    venueType !== 'all' ||
    audience !== 'all' ||
    formula !== 'all' ||
    musicTag !== 'all' ||
    zoneTag !== 'all' ||
    budget !== 'all' ||
    query.trim() !== '';

  const resetFilters = () => {
    setVenueType('all');
    setAudience('all');
    setFormula('all');
    setMusicTag('all');
    setZoneTag('all');
    setBudget('all');
    setQuery('');
  };

  const venueTypeOptions: Array<{ value: 'all' | CapodannoVenueType; label: string }> = isIt
    ? [
        { value: 'all', label: 'Tutte le Tipologie' },
        { value: 'rooftop', label: 'Rooftop & Terrazze Panoramiche' },
        { value: 'discoteca', label: 'Discoteche & Club' },
        { value: 'locale-cenone', label: 'Locali con Cenone & Dinner Show' },
        { value: 'live-club', label: 'Live Club, Concerti & Circoli' },
        { value: 'hotel-villa-castello', label: 'Hotel 5★, Ville & Castelli' },
        { value: 'speakeasy', label: 'Speakeasy & Cocktail Bar' },
        { value: 'esperienza-speciale', label: 'Terme, Tram, Baita & Laghi' },
        { value: 'piazza', label: 'Capodanno in Piazza (Gratis)' },
      ]
    : [
        { value: 'all', label: 'All Venue Types' },
        { value: 'rooftop', label: 'Panoramic Rooftops & Terraces' },
        { value: 'discoteca', label: 'Nightclubs & Arenas' },
        { value: 'locale-cenone', label: 'Dinner Show & Lounge Venues' },
        { value: 'live-club', label: 'Live Music Clubs & Indie Hubs' },
        { value: 'hotel-villa-castello', label: '5★ Hotels, Villas & Castles' },
        { value: 'speakeasy', label: 'Speakeasies & Cocktail Bars' },
        { value: 'esperienza-speciale', label: 'Thermal Spas, Tram, Chalets & Lakes' },
        { value: 'piazza', label: 'Public Squares (Free)' },
      ];

  const audienceOptions: Array<{ value: 'all' | CapodannoAudience; label: string }> = isIt
    ? [
        { value: 'all', label: 'Per Tutti (Qualsiasi Target)' },
        { value: 'coppie', label: 'Coppie (Romantico & Riservato)' },
        { value: 'single', label: 'Single & Gruppi di Amici' },
        { value: 'famiglie', label: 'Famiglie con Bambini & Ragazzi' },
        { value: 'over30', label: 'Adulti Over 30 / Over 40 / 50' },
        { value: 'giovani', label: 'Giovani & Universitari (18–26)' },
        { value: 'vip', label: 'Luxury & Tavoli VIP Privé' },
      ]
    : [
        { value: 'all', label: 'All Crowds / Targets' },
        { value: 'coppie', label: 'Couples (Romantic)' },
        { value: 'single', label: 'Singles & Groups of Friends' },
        { value: 'famiglie', label: 'Families & Kids' },
        { value: 'over30', label: 'Adults 30+ / 40+ / 50+' },
        { value: 'giovani', label: 'Young Crowd & Students (18–26)' },
        { value: 'vip', label: 'Luxury & VIP Privé' },
      ];

  const formulaOptions: Array<{ value: 'all' | CapodannoFormula; label: string }> = isIt
    ? [
        { value: 'all', label: 'Tutte le Formule' },
        { value: 'cenone', label: 'Gran Cenone Servito + Serata' },
        { value: 'buffet', label: 'Royal Buffet / Apericena' },
        { value: 'dopocena', label: 'Solo Ingresso Dopocena' },
        { value: 'tavolo-vip', label: 'Tavolo VIP con Bottiglie' },
        { value: 'hotel-camera', label: 'Con Camera Hotel / Spa' },
        { value: 'gratis', label: 'Ingresso Gratuito (0€)' },
      ]
    : [
        { value: 'all', label: 'All Packages' },
        { value: 'cenone', label: 'Served Gala Dinner + Party' },
        { value: 'buffet', label: 'Royal Buffet / Apericena' },
        { value: 'dopocena', label: 'After-Dinner Entry Only' },
        { value: 'tavolo-vip', label: 'VIP Bottle Service Table' },
        { value: 'hotel-camera', label: 'With Hotel Room / Spa' },
        { value: 'gratis', label: 'Free Entry (€0)' },
      ];

  const musicOptions: Array<{ value: 'all' | CapodannoMusicTag; label: string }> = isIt
    ? [
        { value: 'all', label: 'Tutti i Generi Musicali' },
        { value: 'commerciale-house', label: 'Commerciale, Vocal House & Hits' },
        { value: 'cena-cantata-live', label: 'Cena Cantata, Show & Live Band' },
        { value: 'techno-elettronica', label: 'Techno, Tech-House & Afro-House' },
        { value: 'latino-urban', label: 'Reggaeton, Hip-Hop, Salsa & Bachata' },
        { value: 'rock-indie-90s', label: 'Rock, Indie, Pop & Revival 90/2000' },
        { value: 'swing-jazz-classica', label: 'Swing, Jazz, Piano Bar & Classica' },
      ]
    : [
        { value: 'all', label: 'All Music Genres' },
        { value: 'commerciale-house', label: 'Commercial, Vocal House & Hits' },
        { value: 'cena-cantata-live', label: 'Singing Dinner Show & Live Band' },
        { value: 'techno-elettronica', label: 'Techno, Tech-House & Afro-House' },
        { value: 'latino-urban', label: 'Reggaeton, Hip-Hop, Salsa & Bachata' },
        { value: 'rock-indie-90s', label: 'Rock, Indie, Pop & 90s/2000s' },
        { value: 'swing-jazz-classica', label: 'Swing, Jazz, Piano Bar & Classical' },
      ];

  const zoneOptions: Array<{ value: 'all' | CapodannoZoneTag; label: string }> = isIt
    ? [
        { value: 'all', label: 'Tutte le Zone (Milano + Lombardia)' },
        { value: 'duomo-centro-brera', label: 'Milano Centro, Duomo, San Babila & Brera' },
        { value: 'corso-como-sempione', label: 'Corso Como, Porta Nuova, Sempione & Arco' },
        { value: 'navigli-tortona-romana', label: 'Navigli, Tortona, Porta Romana & Bocconi' },
        { value: 'milano-arena-est-nord', label: 'San Siro, Forlanini, Idroscalo, Bicocca & Nord/Est' },
        { value: 'lombardia-laghi-alpi', label: 'Lombardia (12 Province, Laghi & Montagna)' },
      ]
    : [
        { value: 'all', label: 'All Zones (Milan + Lombardy)' },
        { value: 'duomo-centro-brera', label: 'Central Milan, Duomo, San Babila & Brera' },
        { value: 'corso-como-sempione', label: 'Corso Como, Porta Nuova, Sempione & Arco' },
        { value: 'navigli-tortona-romana', label: 'Navigli, Tortona & Porta Romana' },
        { value: 'milano-arena-est-nord', label: 'San Siro, Forlanini, Idroscalo, Bicocca & North/East' },
        { value: 'lombardia-laghi-alpi', label: 'Lombardy (12 Provinces, Lakes & Alps)' },
      ];

  const ui = getCapodannoUiCopy(locale);
  const scarcity = getScarcityAndChatCopy(locale);

  return (
    <div className="mt-10 space-y-10" data-capodanno-interactive-filter>
      {/* 16 Dedicated SEO Category Pages Grid */}
      <div id="categorie-capodanno" className="rounded-2xl border border-champagne/30 bg-[#18140c] p-5 sm:p-7">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-champagne">
              {ui.categoryBoxEyebrow}
            </p>
            <h2 className="mt-1 font-serif text-xl font-bold text-white sm:text-2xl">
              {ui.categoryBoxHeading}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {categoryPages.map((cat) => {
            const isCurrent = cat.slug === activeSlug;
            return (
              <Link
                key={cat.slug}
                href={capodannoCategoryPath(cat.slug, locale)}
                prefetch={false}
                className={`flex flex-col justify-between rounded-xl border p-3 transition ${
                  isCurrent
                    ? 'border-champagne bg-champagne text-black shadow-md'
                    : 'border-white/12 bg-black/40 text-white hover:border-champagne/60 hover:bg-white/[0.06]'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isCurrent ? 'text-black/75' : 'text-champagne'}`}>
                  {isIt ? cat.badgeIt : cat.badgeEn}
                </span>
                <span className="mt-1 text-xs font-bold leading-snug sm:text-sm">
                  {isIt ? cat.shortLabelIt : cat.shortLabelEn} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Interactive Multi-Filter Controls */}
      <div id="filtro-eventi" className="rounded-2xl border border-champagne/40 bg-gradient-to-b from-[#1f190e] to-[#141009] p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-champagne">
              {ui.filterEyebrow}
            </p>
            <h3 className="mt-1 font-serif text-xl font-bold text-white sm:text-2xl">
              {`${ui.filterHeadingPrefix} (${filtered.length} / ${events.length})`}
            </h3>
          </div>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start rounded-lg border border-champagne px-4 py-2 text-xs font-bold uppercase tracking-wider text-champagne transition hover:bg-champagne hover:text-black sm:self-auto"
            >
              {ui.resetFiltersBtn}
            </button>
          )}
        </div>

        {/* Quick Target Audience Pills */}
        <div className="mt-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/60">
            {isIt ? 'Con chi festeggi? (Filtro rapido Target):' : 'Who are you celebrating with? (Quick Target Filter):'}
          </p>
          <div className="flex flex-wrap gap-2">
            {audienceOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAudience(opt.value)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  audience === opt.value
                    ? 'bg-champagne text-black'
                    : 'border border-white/15 bg-black/40 text-white/85 hover:border-champagne/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Dropdown / Search Controls */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="cap-filter-type" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {isIt ? '1. Tipologia Locale' : '1. Venue Type'}
            </label>
            <select
              id="cap-filter-type"
              value={venueType}
              onChange={(e) => setVenueType(e.target.value as any)}
              className="min-h-[44px] w-full rounded-xl border border-white/15 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-champagne focus:outline-none"
            >
              {venueTypeOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cap-filter-formula" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {isIt ? '2. Formula Desiderata' : '2. Package / Formula'}
            </label>
            <select
              id="cap-filter-formula"
              value={formula}
              onChange={(e) => setFormula(e.target.value as any)}
              className="min-h-[44px] w-full rounded-xl border border-white/15 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-champagne focus:outline-none"
            >
              {formulaOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cap-filter-music" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {isIt ? '3. Musica & Atmosfera' : '3. Music & Vibe'}
            </label>
            <select
              id="cap-filter-music"
              value={musicTag}
              onChange={(e) => setMusicTag(e.target.value as any)}
              className="min-h-[44px] w-full rounded-xl border border-white/15 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-champagne focus:outline-none"
            >
              {musicOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cap-filter-zone" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {isIt ? '4. Zona di Milano / Provincia' : '4. Milan District / Province'}
            </label>
            <select
              id="cap-filter-zone"
              value={zoneTag}
              onChange={(e) => setZoneTag(e.target.value as any)}
              className="min-h-[44px] w-full rounded-xl border border-white/15 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-champagne focus:outline-none"
            >
              {zoneOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cap-filter-budget" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {isIt ? '5. Fascia di Prezzo (Partenza)' : '5. Starting Price Range'}
            </label>
            <select
              id="cap-filter-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value as any)}
              className="min-h-[44px] w-full rounded-xl border border-white/15 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-champagne focus:outline-none"
            >
              <option value="all">{isIt ? 'Tutti i Prezzi' : 'All Budgets'}</option>
              <option value="free">{isIt ? 'Gratis (0€ - Eventi in Piazza)' : 'Free (€0 - Public Squares)'}</option>
              <option value="low">{isIt ? 'Economico / Low Cost (fino a 35€)' : 'Budget / Low Cost (up to €35)'}</option>
              <option value="mid">{isIt ? 'Fascia Media (35€ - 70€)' : 'Mid-Range (€35 - €70)'}</option>
              <option value="lux">{isIt ? 'Top / Luxury / 5★ (oltre 70€)' : 'Luxury / Rooftop / 5★ (€70+)'}</option>
            </select>
          </div>

          <div>
            <label htmlFor="cap-filter-query" className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-champagne">
              {isIt ? '6. Cerca Locale, Quartiere o Format' : '6. Search Venue, Area or Format'}
            </label>
            <input
              id="cap-filter-query"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isIt ? 'Es. Just Me, Rooftop, Terme, Navigli, Salsa...' : 'E.g. Just Me, Rooftop, Spa, Navigli, Techno...'}
              className="min-h-[44px] w-full rounded-xl border border-white/15 bg-black/70 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-white/40 focus:border-champagne focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Filtered Results Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/15 bg-[#18140c] p-10 text-center">
          <p className="font-serif text-2xl font-bold text-white">
            {isIt ? 'Nessun evento corrisponde esattamente a tutti i filtri selezionati' : 'No events match all selected filters'}
          </p>
          <p className="mt-2 text-sm text-white/65">
            {isIt
              ? 'Prova ad allargare un filtro oppure clicca qui sotto per rivedere tutti gli eventi della pagina.'
              : 'Try broadening one filter or click below to view all events in this category.'}
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 rounded-xl bg-champagne px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-white"
          >
            {isIt ? 'Mostra Tutti gli Eventi' : 'Show All Events'}
          </button>
        </div>
      ) : (
        <>
          <div id="catalogo-eventi" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(!hasActiveFilter && !showAll ? filtered.slice(0, 24) : filtered).map((event) => {
              const title = getCapodannoLocalizedEventTitle(event, locale);
              const description = isIt ? event.descriptionIt : event.descriptionEn;
              const music = isIt ? event.musicAndFormatIt : event.musicAndFormatEn;
              const dress = isIt ? event.dressCodeIt : event.dressCodeEn;
              const tiers = isIt ? event.tiersIt : event.tiersEn;
              const detailHref = capodannoEventPath(event.slug, locale);
              return (
                <article
                  key={event.slug}
                  className="flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#18140c] shadow-lg transition hover:border-champagne/40"
                >
                  <div>
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image quality={92}
                        src={event.image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#18140c] via-[#18140c]/40 to-transparent" />
                      <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-champagne backdrop-blur-sm">
                          {event.city} ({event.province})
                        </span>
                        <span className="rounded-full bg-champagne px-3 py-1 text-xs font-bold text-black">
                          {event.priceFromEur === 0
                            ? isIt
                              ? 'INGRESSO GRATUITO'
                              : 'FREE ENTRY'
                            : isIt
                              ? `Da ${event.priceFromEur}€`
                              : `From €${event.priceFromEur}`}
                        </span>
                        <span className="rounded-full border border-amber-400/80 bg-black/85 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-300 backdrop-blur-sm" data-selling-fast-badge>
                          {scarcity.sellingFastBadge}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-xs font-medium text-champagne/90">{event.venueName}</p>
                        <h3 className="mt-0.5 font-serif text-xl font-bold leading-snug text-white">
                          <Link href={detailHref} className="hover:text-champagne">
                            {title}
                          </Link>
                        </h3>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-xs text-white/60">
                        <strong className="text-white/85">{isIt ? 'Indirizzo:' : 'Address:'}</strong> {event.address} ·{' '}
                        <strong className="text-white/85">{isIt ? 'Orari:' : 'Hours:'}</strong> {event.hours}
                      </p>
                      <p className="mt-2.5 text-sm leading-relaxed text-white/75">{description}</p>

                      <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3.5">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-champagne">
                          {isIt ? 'Formule e Prezzi Ufficiali / Storico:' : 'Official & Benchmark Price Tiers:'}
                        </p>
                        <ul className="space-y-2 text-xs">
                          {tiers.map((tier) => (
                            <li key={tier.label} className="border-b border-white/5 pb-1.5 last:border-0 last:pb-0">
                              <div className="flex items-baseline justify-between gap-2">
                                <span className="font-semibold text-white/90">{tier.label}</span>
                                <span className="shrink-0 font-bold text-champagne">{tier.price}</span>
                              </div>
                              <p className="mt-0.5 text-[11px] text-white/55">{tier.details}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/65">
                        <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1">
                          <strong className="text-white/85">Format:</strong> {music}
                        </span>
                        <span className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1">
                          <strong className="text-white/85">Dress Code:</strong> {dress}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 bg-black/20 px-5 py-3.5">
                    <Link
                      href={detailHref}
                      data-capodanno-open-event={event.slug}
                      className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-champagne px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white sm:text-sm"
                    >
                      {scarcity.openEventCardCta}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {!hasActiveFilter && !showAll && filtered.length > 24 && (
            <div className="mt-8 rounded-2xl border border-champagne/35 bg-[#120f0a] p-6 text-center">
              <p className="mb-3 font-sans text-sm text-white/75">
                {isIt
                  ? `Stai visualizzando i primi 24 eventi in evidenza su ${filtered.length} serate verificate di Capodanno.`
                  : `Showing the top 24 featured events out of ${filtered.length} verified New Year's Eve nights.`}
              </p>
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-champagne px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-black transition hover:bg-white"
              >
                {isIt
                  ? `Mostra tutti i ${filtered.length} eventi di Capodanno (+${filtered.length - 24})`
                  : `Show all ${filtered.length} New Year's Eve events (+${filtered.length - 24})`}
              </button>

              <details className="mt-5 text-left">
                <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.18em] text-champagne/80 hover:text-champagne">
                  {isIt
                    ? `Indice rapido completo (${filtered.length - 24} altri locali e veglioni)`
                    : `Full directory index (${filtered.length - 24} additional venues & galas)`}
                </summary>
                <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3 text-xs text-white/75">
                  {filtered.slice(24).map((ev) => (
                    <li key={ev.slug}>
                      <Link
                        href={capodannoEventPath(ev.slug, locale)}
                        prefetch={false}
                        className="block rounded px-2 py-1 hover:bg-white/5 hover:text-champagne"
                      >
                        {ev.venueName} · {getCapodannoLocalizedEventTitle(ev, locale)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          )}
        </>
      )}
    </div>
  );
}
