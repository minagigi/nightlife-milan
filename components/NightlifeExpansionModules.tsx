'use client';

import React, { useState } from 'react';
import Link from '@/components/LocalizedLink';
import Image from 'next/image';
import {
  MessageCircle,
  Sparkles,
  Calendar,
  ShieldCheck,
  Users,
  GlassWater,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Crown,
} from 'lucide-react';
import { CONTACT } from '@/config/contact';
import { localePrefix } from '@/lib/i18n/locales';

type OccasionKey = 'club-vip' | 'graduation' | 'birthday-18-30' | 'bachelorette' | 'corporate-fashion';
type TierKey = 'luxury-flagship' | 'dinner-show-chic' | 'rooftop-skyline' | 'urban-warehouse';
type ZonePositionKey = 'aperitivo-table' | 'dancefloor-vip' | 'prive-balcony' | 'super-prive-console';

const OCCASIONS: Record<
  OccasionKey,
  { labelIt: string; labelEn: string; bonusIt: string; bonusEn: string }
> = {
  'club-vip': {
    labelIt: 'Serata Club & Tavolo VIP',
    labelEn: 'VIP Club Night & Bottle Service',
    bonusIt: '100% del minimum spend convertito in bottiglie dal listino + ingresso salta-fila con Hostess VIP',
    bonusEn: '100% of minimum spend converted into menu bottles + skip-the-line VIP Hostess entry',
  },
  graduation: {
    labelIt: 'Festa di Laurea (Aperitivo / Dopocena)',
    labelEn: 'Graduation Party (Aperitivo / Club Table)',
    bonusIt: 'Area riservata per il gruppo, brindisi con sparkler, possibilità di torta/foto e pacchetto drink dedicato',
    bonusEn: 'Reserved group area, sparkler toast, cake/photo coordination, and dedicated drink/bottle package',
  },
  'birthday-18-30': {
    labelIt: 'Festa di Compleanno / 18 Anni / 30 Anni',
    labelEn: '18th / 25th / 30th Birthday Celebration',
    bonusIt: 'Servizio torta al tavolo, bottle show con fontane luminose e ingresso prioritario per tutti gli invitati',
    bonusEn: 'Table cake service, sparkler bottle show, and priority velvet-rope entry for all guests',
  },
  bachelorette: {
    labelIt: 'Addio al Nubilato / Celibato',
    labelEn: 'Bachelorette / Bachelor Party',
    bonusIt: 'Combinazione Cena Cantata (Dinner Show) + Tavolo Club tutta la notte senza spostare la macchina',
    bonusEn: 'Singing Dinner Show + All-Night VIP Club Table combo in the same venue',
  },
  'corporate-fashion': {
    labelIt: 'Fashion Week / Fuorisalone / Evento Aziendale',
    labelEn: 'Fashion Week / Design Week / Corporate VIP',
    bonusIt: 'Fatturazione dedicata su richiesta, sicurezza privata, Super Privé Console e selezione champagne prestige',
    bonusEn: 'Dedicated invoicing on request, private security, DJ Console Super Privé, and prestige champagne selection',
  },
};

const TIERS: Record<
  TierKey,
  {
    labelIt: string;
    labelEn: string;
    venuesIt: string;
    venuesEn: string;
    basePrices: Record<ZonePositionKey, number>;
  }
> = {
  'luxury-flagship': {
    labelIt: 'Top Luxury & Icone di Milano',
    labelEn: 'Top Luxury & Milan Icons',
    venuesIt: '1. Just Me (Torre Branca) · Armani/Privé · Gattopardo',
    venuesEn: '1. Just Me (Torre Branca) · Armani/Privé · Gattopardo',
    basePrices: {
      'aperitivo-table': 250,
      'dancefloor-vip': 500,
      'prive-balcony': 900,
      'super-prive-console': 1600,
    },
  },
  'dinner-show-chic': {
    labelIt: 'Dinner Show, Giardini & Movida Chic',
    labelEn: 'Dinner Show, Gardens & Chic Clubbing',
    venuesIt: '2. Pineta Club · 3. Aria Club · 4. 55 Milano · Tocqueville 13 · 11Clubroom',
    venuesEn: '2. Pineta Club · 3. Aria Club · 4. 55 Milano · Tocqueville 13 · 11Clubroom',
    basePrices: {
      'aperitivo-table': 180,
      'dancefloor-vip': 320,
      'prive-balcony': 600,
      'super-prive-console': 1100,
    },
  },
  'rooftop-skyline': {
    labelIt: 'Rooftop Panoramici & Sky Lounge',
    labelEn: 'Panoramic Rooftops & Sky Lounges',
    venuesIt: '5. Voya Rooftop (20° Piano) · Terrazza Duomo 21 · Ceresio 7',
    venuesEn: '5. Voya Rooftop (20th Floor) · Terrazza Duomo 21 · Ceresio 7',
    basePrices: {
      'aperitivo-table': 200,
      'dancefloor-vip': 350,
      'prive-balcony': 600,
      'super-prive-console': 1000,
    },
  },
  'urban-warehouse': {
    labelIt: 'House, Hip-Hop, Techno & Warehouse',
    labelEn: 'House, Hip-Hop, Techno & Warehouses',
    venuesIt: '6. Repvblic · Tocqueville 13 · Volt Club · Magazzini Generali · Hollywood · The Club',
    venuesEn: '6. Repvblic · Tocqueville 13 · Volt Club · Magazzini Generali · Hollywood · The Club',
    basePrices: {
      'aperitivo-table': 150,
      'dancefloor-vip': 250,
      'prive-balcony': 450,
      'super-prive-console': 850,
    },
  },
};

const POSITIONS: Record<ZonePositionKey, { labelIt: string; labelEn: string; bottlesIt: string; bottlesEn: string }> = {
  'aperitivo-table': {
    labelIt: 'Tavolo Royal Aperitivo / Cena Cantata (19:30–23:30)',
    labelEn: 'Royal Aperitivo / Dinner Show Table (19:30–23:30)',
    bottlesIt: 'Drink premium o 1 bottiglia ogni 5–6 ospiti + Royal Buffet / Dinner Show',
    bottlesEn: 'Premium drinks or 1 bottle per 5–6 guests + Royal Buffet / Dinner Show',
  },
  'dancefloor-vip': {
    labelIt: 'Tavolo VIP Pista Centrale (23:30–05:00)',
    labelEn: 'Main Dancefloor VIP Table (23:30–05:00)',
    bottlesIt: '1–2 Bottiglie Premium (Belvedere / Grey Goose / Moët) + soft drink e ghiaccio',
    bottlesEn: '1–2 Premium Bottles (Belvedere / Grey Goose / Moët) + mixers & ice',
  },
  'prive-balcony': {
    labelIt: 'Tavolo Privé Rialzato / Balconata VIP',
    labelEn: 'Elevated Privé / VIP Balcony Table',
    bottlesIt: '2–3 Bottiglie Super Premium o Magnum + area cordone riservata e cameriere dedicato',
    bottlesEn: '2–3 Super Premium Bottles or Magnum + roped-off VIP area & dedicated waiter',
  },
  'super-prive-console': {
    labelIt: 'Super Privé Console DJ / Backstage',
    labelEn: 'DJ Console Super Privé / Backstage',
    bottlesIt: 'Dom Pérignon / Armand de Brignac / Clase Azul / Magnum + posizione n°1 a fianco del DJ',
    bottlesEn: 'Dom Pérignon / Armand de Brignac / Clase Azul / Magnums + #1 table next to the DJ booth',
  },
};

export function VipQuoteCalculator({ locale = 'it', initialVenueSlug }: { locale?: string; initialVenueSlug?: string }) {
  void initialVenueSlug;
  const isIt = locale === 'it';
  const [occasion, setOccasion] = useState<OccasionKey>('club-vip');
  const [tier, setTier] = useState<TierKey>('luxury-flagship');
  const [position, setPosition] = useState<ZonePositionKey>('dancefloor-vip');
  const [guests, setGuests] = useState<number>(8);

  const baseMinSpend = TIERS[tier].basePrices[position];
  const extraGuests = Math.max(0, guests - 6);
  const perExtraGuest = position === 'aperitivo-table' ? 30 : position === 'dancefloor-vip' ? 50 : position === 'prive-balcony' ? 75 : 120;
  const totalEstimate = baseMinSpend + extraGuests * perExtraGuest;
  const perPerson = Math.round(totalEstimate / Math.max(1, guests));

  const occasionObj = OCCASIONS[occasion];
  const tierObj = TIERS[tier];
  const posObj = POSITIONS[position];

  const waText = isIt
    ? `Ciao Concierge Nightlife Milan! Vorrei un preventivo ufficiale per:\n• Occasione: ${occasionObj.labelIt}\n• Fascia Locali: ${tierObj.labelIt} (${tierObj.venuesIt})\n• Posizione: ${posObj.labelIt}\n• Numero Ospiti: ${guests} persone\n• Budget stimato: ~€${totalEstimate} (€${perPerson}/persona in 100% credito bottiglie)`
    : `Hi Nightlife Milan Concierge! I'd like an official quote for:\n• Occasion: ${occasionObj.labelEn}\n• Venue Tier: ${tierObj.labelEn} (${tierObj.venuesEn})\n• Table Area: ${posObj.labelEn}\n• Group Size: ${guests} guests\n• Estimated Spend: ~€${totalEstimate} (€${perPerson}/person in 100% bottle credit)`;

  const waHref = `${CONTACT.whatsapp.link}?text=${encodeURIComponent(waText)}`;

  return (
    <section
      aria-label={isIt ? 'Calcolatore Preventivo Tavolo VIP e Feste Private' : 'VIP Table & Private Party Quote Calculator'}
      className="my-14 rounded-2xl border border-champagne/30 bg-[#0B0A09] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/15 border border-champagne/40 text-champagne text-[11px] font-bold tracking-[0.22em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {isIt ? 'STRUMENTO INTERATTIVO CONCIERGE 2026/2027' : 'INTERACTIVE 2026/2027 CONCIERGE TOOL'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {isIt
              ? 'Configuratore Tavolo VIP, Laurea, 18 Anni & Eventi Privati'
              : 'VIP Table, Graduation, Birthday & Private Party Configurator'}
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2 max-w-2xl">
            {isIt
              ? 'Calcola in 5 secondi il minimum spend reale (100% convertito in bottiglie) e la quota a persona nei migliori club di Milano, poi invia il brief su WhatsApp per ricevere le mappe tavoli in 10 minuti.'
              : 'Calculate in 5 seconds the real minimum spend (100% converted into bottles) and per-person share across Milan’s top clubs, then send your brief via WhatsApp to receive floorplans within 10 minutes.'}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-champagne/90 bg-champagne/10 border border-champagne/25 px-4 py-2.5 rounded-xl shrink-0">
          <ShieldCheck className="w-4 h-4 text-champagne shrink-0" />
          <span>
            {isIt ? 'Zero commissioni d’agenzia · Prezzi ufficiali del locale' : 'Zero agency fees · Official venue prices'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Occasion */}
          <div>
            <label className="block font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne mb-2.5">
              {isIt ? '1. Seleziona il Tipo di Serata o Evento' : '1. Select Your Night or Celebration'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(OCCASIONS) as OccasionKey[]).map((k) => {
                const active = occasion === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setOccasion(k)}
                    className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      active
                        ? 'bg-[#25D366] text-[#050505] border-champagne font-bold shadow-[0_0_20px_rgba(201,168,106,0.3)]'
                        : 'bg-white/[0.03] text-white/80 border-white/10 hover:border-champagne/40'
                    }`}
                  >
                    {isIt ? OCCASIONS[k].labelIt : OCCASIONS[k].labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Venue Tier */}
          <div>
            <label className="block font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne mb-2.5">
              {isIt ? '2. Scegli la Categoria di Locale' : '2. Choose Venue Category'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(TIERS) as TierKey[]).map((k) => {
                const active = tier === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setTier(k)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      active
                        ? 'bg-champagne/15 border-champagne text-white'
                        : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-champagne/40'
                    }`}
                  >
                    <div className="font-semibold text-xs sm:text-sm text-champagne mb-1">
                      {isIt ? TIERS[k].labelIt : TIERS[k].labelEn}
                    </div>
                    <div className="text-[11px] text-white/60 leading-snug">
                      {isIt ? TIERS[k].venuesIt : TIERS[k].venuesEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Position */}
          <div>
            <label className="block font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne mb-2.5">
              {isIt ? '3. Scegli la Formula / Posizione Tavolo' : '3. Choose Table Formula / Zone'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(POSITIONS) as ZonePositionKey[]).map((k) => {
                const active = position === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setPosition(k)}
                    className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all ${
                      active
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-white/[0.03] text-white/80 border-white/10 hover:border-champagne/40'
                    }`}
                  >
                    {isIt ? POSITIONS[k].labelIt : POSITIONS[k].labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Guests Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="vip-guests-range"
                className="font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne"
              >
                {isIt ? '4. Numero di Persone nel Gruppo' : '4. Group Size (Guests)'}
              </label>
              <span className="font-serif text-2xl font-bold text-white">
                {guests} {isIt ? 'Ospiti' : 'Guests'}
              </span>
            </div>
            <input
              id="vip-guests-range"
              type="range"
              min={4}
              max={25}
              step={1}
              value={guests}
              onChange={(e: { target: { value: string } }) => setGuests(Number(e.target.value))}
              className="w-full accent-[#F6F1E7] cursor-pointer h-2 bg-white/15 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-white/40 mt-1">
              <span>4 {isIt ? 'ospiti (min)' : 'guests (min)'}</span>
              <span>10 {isIt ? 'ospiti (gruppo standard)' : 'guests (standard)'}</span>
              <span>25 {isIt ? 'ospiti (evento privato)' : 'guests (large party)'}</span>
            </div>
          </div>
        </div>

        {/* Right Summary Box */}
        <div className="lg:col-span-5 rounded-2xl border border-champagne/40 bg-black/60 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-[0.28em] uppercase text-champagne/70 mb-2">
              {isIt ? 'STIMA UFFICIALE CONCIERGE' : 'OFFICIAL CONCIERGE ESTIMATE'}
            </div>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-champagne">
                €{totalEstimate}
              </span>
              <span className="text-white/50 text-xs uppercase tracking-wider">
                {isIt ? 'Minimum Spend Totale' : 'Total Minimum Spend'}
              </span>
            </div>
            <div className="inline-block px-3 py-1 rounded-md bg-champagne/15 text-champagne text-xs font-semibold mb-6">
              {isIt
                ? `Circa €${perPerson} a persona (diviso in ${guests} ospiti)`
                : `Approx. €${perPerson} per person (split across ${guests} guests)`}
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-white/80 border-t border-white/10 pt-5 mb-6">
              <div className="flex items-start gap-2.5">
                <Crown className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/50 block text-[11px] uppercase tracking-wider">
                    {isIt ? 'Locali Consigliati (Priorità Top)' : 'Recommended Venues (Top Priority)'}
                  </span>
                  <strong className="text-white">{isIt ? tierObj.venuesIt : tierObj.venuesEn}</strong>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <GlassWater className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/50 block text-[11px] uppercase tracking-wider">
                    {isIt ? 'Cosa Include il Credito (100% Bottiglie)' : 'Included Bottle Credit (100%)'}
                  </span>
                  <span>{isIt ? posObj.bottlesIt : posObj.bottlesEn}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/50 block text-[11px] uppercase tracking-wider">
                    {isIt ? 'Vantaggio Esclusivo Occasione' : 'Occasion VIP Perk'}
                  </span>
                  <span>{isIt ? occasionObj.bonusIt : occasionObj.bonusEn}</span>
                </div>
              </div>
            </div>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] text-[#050505] font-sans font-bold text-xs sm:text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors shadow-[0_0_30px_rgba(201,168,106,0.35)]"
          >
            <MessageCircle className="w-4 h-4" />
            {isIt ? 'Ricevi Mappa Tavoli & Listino su WhatsApp' : 'Get Floorplan & Bottle Menu on WhatsApp'}
          </a>
          <p className="text-[11px] text-center text-white/40 mt-3">
            {isIt
              ? 'Risposta garantita in < 10 minuti al +39 351 912 7047 · Tutti i giorni 14:00–04:00'
              : 'Guaranteed reply in < 10 minutes at +39 351 912 7047 · Daily 14:00–04:00'}
          </p>
        </div>
      </div>
    </section>
  );
}

const WEEKLY_SCHEDULE = [
  {
    dayKey: 'mon',
    labelIt: 'Lunedì',
    labelEn: 'Monday',
    headlineIt: 'Dirty Monday & Luxury Tower Aperitivo',
    headlineEn: 'Dirty Monday & Luxury Tower Aperitivo',
    summaryIt:
      'Il lunedì notte a Milano ha due poli iconici: il Dirty Monday del Repvblic (la notte hip-hop/house più famosa tra modelli, PR e addetti ai lavori) e il Royal Aperitivo + Club 7/7 sotto la Torre Branca al Just Me.',
    summaryEn:
      'Monday night in Milan revolves around two iconic poles: Dirty Monday at Repvblic (the legendary hip-hop/house industry night) and the 7-nights-a-week Royal Aperitivo & Club under Torre Branca at Just Me.',
    clubs: [
      {
        rank: '#1 Priority',
        name: 'Just Me Milano',
        slug: 'just-me-milano',
        zone: 'Parco Sempione',
        music: 'Commercial House & Fashion Hits',
        formulaIt: 'Aperitivo 19:30 (20–30€) · Tavoli VIP da 350€',
        formulaEn: 'Aperitivo 19:30 (€20–30) · VIP Tables from €350',
      },
      {
        rank: 'Top Club',
        name: 'REPVBLIC Milano',
        slug: 'repvblic-milano',
        zone: 'Piazza della Repubblica, 12 · Porta Nuova',
        music: 'Dirty Monday · International Hits, House & Hip-Hop',
        formulaIt: 'Serata dalle 23:00 · Tavoli Pista da 300€ · Privé da 500€',
        formulaEn: 'Club from 23:00 · Dancefloor Tables from €300 · Privé from €500',
      },
      {
        rank: 'Iconic',
        name: 'Hollywood Milano',
        slug: 'hollywood-club-milano',
        zone: 'Corso Como 15',
        music: 'International Commercial & Hip-Hop',
        formulaIt: 'Lista 23:30 · Tavoli da 300€',
        formulaEn: 'Guest List 23:30 · Tables from €300',
      },
    ],
  },
  {
    dayKey: 'tue',
    labelIt: 'Martedì',
    labelEn: 'Tuesday',
    headlineIt: 'Notte Internazionale, Fashion & University',
    headlineEn: 'International, Fashion & University Night',
    summaryIt:
      'Il martedì accende Corso Garibaldi, Corso Como e CityLife/Isola: aperitivo panoramico al 20° piano da Voya Rooftop o apericena XL da 55 Milano, seguito dal martedì notte di The Club e Just Me.',
    summaryEn:
      'Tuesday lights up Corso Garibaldi, Corso Como, and Isola: skyline sunset aperitivo on the 20th floor at Voya Rooftop or XXL apericena at 55 Milano, followed by The Club and Just Me.',
    clubs: [
      {
        rank: '#1 Priority',
        name: 'Just Me Milano',
        slug: 'just-me-milano',
        zone: 'Parco Sempione',
        music: 'International House & Hits',
        formulaIt: 'Aperitivo & Club · Tavoli da 350€',
        formulaEn: 'Aperitivo & Club · Tables from €350',
      },
      {
        rank: '#4 Priority',
        name: '55 Milano',
        slug: '55-milano',
        zone: 'Arco della Pace / Sempione',
        music: 'Apericena XL & Lounge DJ Set',
        formulaIt: 'Apericena 19:30 (20–30€) · Tavolo Riservato',
        formulaEn: 'Apericena 19:30 (€20–30) · Reserved Table',
      },
      {
        rank: '#5 Priority',
        name: 'Voya Rooftop',
        slug: 'voya-rooftop-milan',
        zone: 'Isola / Portello · 20° Piano',
        music: 'Skyline Lounge & Deep House',
        formulaIt: 'Sunset Aperitivo 18:30 · Tavolo Vetrata da 250€',
        formulaEn: 'Sunset Aperitivo 18:30 · Window Table from €250',
      },
    ],
  },
  {
    dayKey: 'wed',
    labelIt: 'Mercoledì',
    labelEn: 'Wednesday',
    headlineIt: 'Erasmus, Bocconi/Cattolica Night & Corso Como',
    headlineEn: 'Erasmus, University & Corso Como Midweek Peak',
    summaryIt:
      'Il mercoledì è la grande notte universitaria e internazionale di Milano: Just Me, 11Clubroom in Corso Como, Voya Rooftop e The Club attirano studenti internazionali ed espatriati.',
    summaryEn:
      'Wednesday is Milan’s premier international and university club night: Just Me, 11Clubroom in Corso Como, Voya Rooftop, and The Club draw international students and young professionals.',
    clubs: [
      {
        rank: '#1 Priority',
        name: 'Just Me Milano',
        slug: 'just-me-milano',
        zone: 'Parco Sempione',
        music: 'International Midweek Party',
        formulaIt: 'Aperitivo 19:30 · Club 23:30 · Tavoli da 350€',
        formulaEn: 'Aperitivo 19:30 · Club 23:30 · Tables from €350',
      },
      {
        rank: '#5 Priority',
        name: 'Voya Rooftop',
        slug: 'voya-rooftop-milan',
        zone: '20° Piano Vista Skyline',
        music: 'Chill House & Cocktail Bar',
        formulaIt: 'Aperitivo Panoramico 20–30€ · Tavoli VIP da 300€',
        formulaEn: 'Panoramic Aperitivo €20–30 · VIP Tables from €300',
      },
      {
        rank: 'Corso Como',
        name: '11 Clubroom',
        slug: '11-clubroom',
        zone: 'Via Tocqueville 11',
        music: 'Hip-Hop, House & International',
        formulaIt: 'Lista 23:30 · Tavoli VIP da 300€',
        formulaEn: 'Guest List 23:30 · VIP Tables from €300',
      },
    ],
  },
  {
    dayKey: 'thu',
    labelIt: 'Giovedì',
    labelEn: 'Thursday',
    headlineIt: 'Il Pre-Weekend: Aria Club, Just Me, Pineta & 55 Milano',
    headlineEn: 'The Pre-Weekend: Aria Club, Just Me, Pineta & 55 Milano',
    summaryIt:
      'Il giovedì a Milano è già pieno weekend: Aria Club a San Siro inaugura il suo weekend con buffet e 3 aree tavoli, Just Me lancia il Thursday Fashion Party e 55 Milano ospita grandi feste di laurea e compleanni.',
    summaryEn:
      'Thursday in Milan feels like full weekend: Aria Club near San Siro opens its 3 VIP table zones, Just Me hosts its flagship Thursday Fashion Party, and 55 Milano shines for graduations and birthdays.',
    clubs: [
      {
        rank: '#1 Priority',
        name: 'Just Me Milano',
        slug: 'just-me-milano',
        zone: 'Parco Sempione',
        music: 'Fashion Thursday · House & Hits',
        formulaIt: 'Aperitivo 19:30 · Club 23:30 · Tavoli da 400€',
        formulaEn: 'Aperitivo 19:30 · Club 23:30 · Tables from €400',
      },
      {
        rank: '#3 Priority',
        name: 'Aria Club Milano',
        slug: 'aria-club-milano',
        zone: 'San Siro (Piazzale dello Sport 14)',
        music: 'Reggaeton, Commercial & Urban Hits',
        formulaIt: 'Aperitivo Buffet 19:30 · Tavoli Pista/Privé da 250€',
        formulaEn: 'Aperitivo Buffet 19:30 · Dancefloor/Privé Tables from €250',
      },
      {
        rank: '#4 Priority',
        name: '55 Milano',
        slug: '55-milano',
        zone: 'Via Piero della Francesca 55',
        music: 'Dinner Show & Lauree / Compleanni',
        formulaIt: 'Apericena Riservata 25€ · Tavoli Dopocena da 250€',
        formulaEn: 'Reserved Apericena €25 · Club Tables from €250',
      },
    ],
  },
  {
    dayKey: 'fri',
    labelIt: 'Venerdì',
    labelEn: 'Friday',
    headlineIt: 'Venerdì Iconico: Aperitivo Cantato Pineta, Just Me & Aria Club',
    headlineEn: 'Iconic Friday: Pineta Singing Aperitivo, Just Me & Aria Club',
    summaryIt:
      'Il venerdì sera vede il leggendario Aperitivo Cantato del Pineta Club in Corso Como, il Gran Venerdì del Just Me sotto la Torre Branca, il giardino/club di Aria a San Siro, il Friday Dinner Show di 55 Milano e lo skyline di Voya Rooftop.',
    summaryEn:
      'Friday night features the legendary Singing Aperitivo at Pineta Club in Corso Como, Friday Gala at Just Me, Aria Club in San Siro, Friday Dinner Show at 55 Milano, and sunset-to-clubbing at Voya Rooftop.',
    clubs: [
      {
        rank: '#1 Priority',
        name: 'Just Me Milano',
        slug: 'just-me-milano',
        zone: 'Parco Sempione',
        music: 'Luxury House & International Guest DJs',
        formulaIt: 'Aperitivo 19:30 · Tavoli VIP 500–1.500€',
        formulaEn: 'Aperitivo 19:30 · VIP Tables €500–€1,500',
      },
      {
        rank: '#2 Priority',
        name: 'Pineta Club Milano',
        slug: 'pineta-club-milano',
        zone: 'Corso Como (Via Messina 38)',
        music: 'Aperitivo Cantato + Reggaeton & Commercial',
        formulaIt: 'Buffet Cantato 19:30 · Tavoli VIP 300–600€',
        formulaEn: 'Singing Buffet 19:30 · VIP Tables €300–€600',
      },
      {
        rank: '#3 Priority',
        name: 'Aria Club Milano',
        slug: 'aria-club-milano',
        zone: 'San Siro / Ippodromo',
        music: 'Urban, Hits & Dancefloor Show',
        formulaIt: 'Aperitivo 19:30 · Tavoli Pista/Privé 250–600€',
        formulaEn: 'Aperitivo 19:30 · Dancefloor/Privé Tables €250–€600',
      },
    ],
  },
  {
    dayKey: 'sat',
    labelIt: 'Sabato',
    labelEn: 'Saturday',
    headlineIt: 'Il Sabato Gran Gala nei 6 Top Club Prioritari di Milano',
    headlineEn: 'Saturday Grand Gala Across Milan’s Top 6 Priority Clubs',
    summaryIt:
      'Il sabato notte è il picco assoluto della settimana milanese: selezione rigorosa alla porta, dress code elegante e altissima richiesta di Tavoli VIP da Just Me, Pineta, Aria Club, 55 Milano ("The Wall"), Voya Rooftop e Repvblic.',
    summaryEn:
      'Saturday night is the absolute peak of Milan nightlife: strict velvet-rope selection, sharp dress codes, and high demand for VIP Tables at Just Me, Pineta, Aria Club, 55 Milano ("The Wall"), Voya Rooftop, and Repvblic.',
    clubs: [
      {
        rank: '#1 Priority',
        name: 'Just Me Milano',
        slug: 'just-me-milano',
        zone: 'Parco Sempione',
        music: 'Saturday Luxury Gala · House & Hits',
        formulaIt: 'Tavoli VIP Pista 500€ · Privé Branca 1.000–3.000€',
        formulaEn: 'Dancefloor VIP €500 · Privé Branca €1,000–€3,000',
      },
      {
        rank: '#2 Priority',
        name: 'Pineta Club Milano',
        slug: 'pineta-club-milano',
        zone: 'Corso Como (Via Messina 38)',
        music: 'Perreo Saturday · Reggaeton & Hits',
        formulaIt: 'Aperitivo 19:30 · Tavoli VIP 400–800€',
        formulaEn: 'Aperitivo 19:30 · VIP Tables €400–€800',
      },
      {
        rank: '#3 Priority',
        name: 'Aria Club & #4 55 Milano & #5 Voya',
        slug: 'aria-club-milano',
        zone: 'San Siro · Sempione · Isola',
        music: 'Commercial, Dinner Show & Skyline DJ Set',
        formulaIt: 'Tavoli Riservati 300–800€ con Salta-Fila',
        formulaEn: 'Reserved VIP Tables €300–€800 with Skip-the-Line',
      },
    ],
  },
  {
    dayKey: 'sun',
    labelIt: 'Domenica',
    labelEn: 'Sunday',
    headlineIt: 'Domenica Milanese: Aperitivo XL, Latino & Fashion Sunday',
    headlineEn: 'Milanese Sunday: XXL Aperitivo, Latin Night & Fashion Sunday',
    summaryIt:
      'La domenica sera è il rituale preferito dai veri milanesi: dal Sunset Aperitivo al 20° piano di Voya Rooftop, alla Domenica Latino-Americana del 55 Milano, fino al Sunday Night internazionale del Just Me.',
    summaryEn:
      'Sunday night is the true Milanese insider ritual: from Sunset Aperitivo on the 20th floor at Voya Rooftop, to Sunday Latin Night at 55 Milano, to the international Sunday showcase at Just Me.',
    clubs: [
      {
        rank: '#1 Priority',
        name: 'Just Me Milano',
        slug: 'just-me-milano',
        zone: 'Parco Sempione',
        music: 'Fashion Sunday · Aperitivo & Club',
        formulaIt: 'Aperitivo 19:30 · Tavoli VIP da 350€',
        formulaEn: 'Aperitivo 19:30 · VIP Tables from €350',
      },
      {
        rank: '#4 Priority',
        name: '55 Milano',
        slug: '55-milano',
        zone: 'Via Piero della Francesca 55',
        music: 'Sunday Latino-Americano & Apericena',
        formulaIt: 'Apericena 19:30 · Tavoli Riservati da 200€',
        formulaEn: 'Apericena 19:30 · Reserved Tables from €200',
      },
      {
        rank: '#5 Priority',
        name: 'Voya Rooftop',
        slug: 'voya-rooftop-milan',
        zone: 'Isola — 20° Piano',
        music: 'Sunday Golden Hour & Lounge DJ Set',
        formulaIt: 'Sunset Drink & Tapas · Tavoli Vetrata da 250€',
        formulaEn: 'Sunset Drinks & Tapas · Window Tables from €250',
      },
    ],
  },
];

export function WeeklyNightlifeNavigator({ locale }: { locale: string }) {
  const isIt = locale === 'it';
  const lp = localePrefix(locale);
  const [activeDay, setActiveDay] = useState<string>('fri');
  const current = WEEKLY_SCHEDULE.find((d) => d.dayKey === activeDay) || WEEKLY_SCHEDULE[4];

  return (
    <section
      aria-label={isIt ? 'Calendario Settimanale Serate Milano dal Lunedì alla Domenica' : 'Milan Weekly Nightlife Calendar Monday to Sunday'}
      className="my-14 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="font-sans text-champagne text-[10px] font-bold tracking-[0.28em] uppercase mb-2">
            {isIt ? 'DOVE ANDARE OGNI SERA · 7 GIORNI SU 7' : 'WHERE TO GO EVERY NIGHT · 7 DAYS A WEEK'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            {isIt
              ? 'La Settimana della Notte a Milano: Dal Lunedì alla Domenica'
              : 'Milan Weekly Nightlife Matrix: Monday to Sunday'}
          </h2>
        </div>
        <Link
          href={`${lp}/guides/${isIt ? 'calendario-settimanale-serate-milano-lunedi-domenica' : 'weekly-nightlife-calendar-milan-monday-sunday'}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-champagne hover:text-white transition-colors"
        >
          <span>{isIt ? 'Leggi la Guida Completa Lun–Dom' : 'Read Full Mon–Sun Guide'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Day selector pills */}
      <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-white/10">
        {WEEKLY_SCHEDULE.map((day) => {
          const isSelected = day.dayKey === activeDay;
          return (
            <button
              key={day.dayKey}
              type="button"
              onClick={() => setActiveDay(day.dayKey)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all ${
                isSelected
                  ? 'bg-[#25D366] text-[#050505] shadow-[0_0_20px_rgba(201,168,106,0.35)]'
                  : 'bg-white/[0.04] text-white/70 border border-white/10 hover:border-champagne/40 hover:text-white'
              }`}
            >
              {isIt ? day.labelIt : day.labelEn}
            </button>
          );
        })}
      </div>

      {/* Active Day Details */}
      <div className="mb-6">
        <h3 className="font-serif text-2xl text-champagne mb-2">
          {isIt ? `${current.labelIt} Sera: ${current.headlineIt}` : `${current.labelEn} Night: ${current.headlineEn}`}
        </h3>
        <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-4xl">
          {isIt ? current.summaryIt : current.summaryEn}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {current.clubs.map((club) => (
          <div
            key={club.name}
            className="rounded-xl border border-white/10 bg-black/40 p-5 flex flex-col justify-between hover:border-champagne/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-champagne/15 border border-champagne/30 text-champagne text-[10px] font-bold tracking-wider uppercase">
                  {club.rank}
                </span>
                <span className="text-[11px] text-white/50 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-champagne" />
                  {club.zone}
                </span>
              </div>
              <h4 className="font-serif text-xl font-bold text-white mb-1">{club.name}</h4>
              <p className="text-xs text-champagne/90 font-medium mb-3">{club.music}</p>
              <p className="text-xs text-white/60 leading-relaxed mb-4">
                {isIt ? club.formulaIt : club.formulaEn}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              <Link
                href={`${lp}/clubs/${club.slug}`}
                className="text-xs font-semibold text-white hover:text-champagne transition-colors"
              >
                {isIt ? 'Scheda Club →' : 'Club Profile →'}
              </Link>
              <a
                href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(
                  isIt
                    ? `Ciao! Vorrei prenotare per ${current.labelIt} sera da ${club.name}.`
                    : `Hi! I'd like to book for ${current.labelEn} night at ${club.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs font-bold text-champagne hover:text-white transition-colors"
              >
                {isIt ? 'Prenota WhatsApp' : 'Book WhatsApp'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function EntryFormulaMatrix({ locale }: { locale: string }) {
  const isIt = locale === 'it';
  const formulas = [
    {
      nameIt: '1. Royal Aperitivo con Tavolo',
      nameEn: '1. Royal Aperitivo with Table',
      time: '19:30 – 22:30',
      priceIt: '€15 – €30 / persona',
      priceEn: '€15 – €30 / person',
      queueIt: 'Ingresso su prenotazione nominale',
      queueEn: 'Reserved nominal entry',
      seatingIt: 'Tavolo d’appoggio fino alle 22:30/23:00',
      seatingEn: 'Reserved table until 22:30/23:00',
      idealIt: 'Lauree, compleanni, coppie e gruppi che vogliono iniziare dal tramonto (Just Me, Pineta, Voya, 55 Milano, Aria)',
      idealEn: 'Graduations, birthdays, couples & groups starting at sunset (Just Me, Pineta, Voya, 55 Milano, Aria)',
    },
    {
      nameIt: '2. Cena Cantata / Dinner Show',
      nameEn: '2. Singing Dinner Show',
      time: '20:30 – 00:00 (+ Club)',
      priceIt: '€50 – €90 / persona',
      priceEn: '€50 – €90 / person',
      queueIt: 'Zero fila · Accoglienza dedicata',
      queueEn: 'Zero queue · Dedicated host',
      seatingIt: 'Tavolo garantito a cena + possibilità di tenerlo nel dopocena',
      seatingEn: 'Guaranteed dinner table + option to keep it for clubbing',
      idealIt: 'Addio al nubilato/celibato, compleanni 25–45 anni e gruppi misti (Pineta, 55 Milano, Just Me, Gattopardo)',
      idealEn: 'Bachelorette/bachelor parties, 25–45 birthdays & mixed groups (Pineta, 55 Milano, Just Me, Gattopardo)',
    },
    {
      nameIt: '3. Lista Nominale (Guestlist)',
      nameEn: '3. Nominal Guest List',
      time: '23:30 – 00:45',
      priceIt: '€15 – €25 (o ridotto/omaggio donna)',
      priceEn: '€15 – €25 (or reduced/free ladies)',
      queueIt: 'Coda standard con selezione alla porta',
      queueEn: 'Standard queue with door selection',
      seatingIt: 'Nessun tavolo (solo pista)',
      seatingEn: 'Standing only (no table)',
      idealIt: 'Coppie, piccoli gruppi misti (2–4 persone) vestiti eleganti che arrivano entro mezzanotte e mezza',
      idealEn: 'Couples & small balanced groups (2–4 guests) dressed smartly arriving before 00:30',
    },
    {
      nameIt: '4. Tavolo VIP Pista / Balconata',
      nameEn: '4. Dancefloor / Balcony VIP Table',
      time: '23:30 – 05:00',
      priceIt: '€250 – €600 (100% in bottiglie)',
      priceEn: '€250 – €600 (100% in bottles)',
      queueIt: 'Corsia VIP Salta-Fila con Hostess',
      queueEn: 'Skip-the-line VIP Hostess lane',
      seatingIt: 'Divanetto VIP riservato tutta la notte (6–10 pass)',
      seatingEn: 'Reserved VIP booth all night (6–10 passes)',
      idealIt: 'Gruppi di 5–10 amici (anche soli uomini) che vogliono ingresso garantito e servizio bottiglie al tavolo',
      idealEn: 'Groups of 5–10 friends (including all-male groups) wanting guaranteed entry & bottle service',
    },
    {
      nameIt: '5. Super Privé & Console DJ',
      nameEn: '5. DJ Console & Super Privé',
      time: '23:30 – 05:30',
      priceIt: '€800 – €5.000+ (100% in bottiglie)',
      priceEn: '€800 – €5,000+ (100% in bottles)',
      queueIt: 'Scorta immediata al tavolo con VIP Host',
      queueEn: 'Immediate VIP Host escort to booth',
      seatingIt: 'Posizione dominante in Console o Privé rialzato (8–15 pass)',
      seatingEn: 'Prime table next to the DJ booth or elevated Privé (8–15 passes)',
      idealIt: 'Clienti VIP internazionali, Fashion Week, grandi celebrazioni, Dom Pérignon & Magnum show',
      idealEn: 'International VIPs, Fashion Week, milestone celebrations, Dom Pérignon & Magnum shows',
    },
  ];

  return (
    <section
      aria-label={isIt ? 'Confronto Formule Ingresso Discoteche Milano' : 'Milan Nightclub Entry Formulas Comparison'}
      className="my-14 border border-[#050505]/15 bg-[#F6F1E7] text-[#050505] p-6 sm:p-10"
    >
      <div className="mb-8">
        <p className="font-mono text-[#3D372E] text-[10px] font-bold tracking-[0.28em] uppercase mb-2">
          {isIt ? 'TRASPARENZA TOTALE · SCEGLI LA FORMULA GIUSTA' : 'TOTAL TRANSPARENCY · CHOOSE THE RIGHT FORMULA'}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#050505]">
          {isIt
            ? 'Le 5 Formule d’Ingresso a Milano: Lista, Aperitivo, Cena Cantata o Tavolo VIP?'
            : 'The 5 Milan Entry Formulas: Guest List, Aperitivo, Dinner Show or VIP Table?'}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-[#050505]/25 font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505]">
              <th className="py-3.5 pr-4">{isIt ? 'Formula' : 'Formula'}</th>
              <th className="py-3.5 px-4">{isIt ? 'Orario' : 'Hours'}</th>
              <th className="py-3.5 px-4">{isIt ? 'Fascia Prezzo' : 'Price Range'}</th>
              <th className="py-3.5 px-4">{isIt ? 'Fila & Selezione' : 'Queue & Door'}</th>
              <th className="py-3.5 px-4">{isIt ? 'Posto a Sedere' : 'Seating'}</th>
              <th className="py-3.5 pl-4">{isIt ? 'Ideale Per' : 'Best For'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#050505]/14 text-xs sm:text-sm text-[#1F1C18]">
            {formulas.map((f) => (
              <tr key={f.nameEn} className="hover:bg-[#EFE9DC]/70">
                <td className="py-4 pr-4 font-serif font-semibold text-[#050505] text-base">
                  {isIt ? f.nameIt : f.nameEn}
                </td>
                <td className="py-4 px-4 text-[#3D372E] font-mono text-xs whitespace-nowrap">{f.time}</td>
                <td className="py-4 px-4 font-semibold text-[#050505] whitespace-nowrap">
                  {isIt ? f.priceIt : f.priceEn}
                </td>
                <td className="py-4 px-4 text-[#1F1C18]">{isIt ? f.queueIt : f.queueEn}</td>
                <td className="py-4 px-4 text-[#1F1C18]">{isIt ? f.seatingIt : f.seatingEn}</td>
                <td className="py-4 pl-4 text-[#3D372E] text-xs leading-relaxed">
                  {isIt ? f.idealIt : f.idealEn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function PrioritySixShowcase({ locale }: { locale: string }) {
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const priorityClubs = [
    {
      rank: 1,
      name: 'Just Me Milano',
      slug: 'just-me-milano',
      zone: 'Parco Sempione (Torre Branca)',
      image: '/images/venues/just-me-milano/just-me-milano-torre-branca-01.webp',
      badgeIt: '#1 Priorità Assoluta · Design Italo Rota',
      badgeEn: '#1 Top Priority · Italo Rota Design',
      descIt:
        'Il club più iconico ed esclusivo di Milano ai piedi della Torre Branca nel Parco Sempione. Royal Aperitivo dalle 19:30 con salita in cima alla torre e party internazionale fino alle 05:00 con tavoli VIP da 350–500€.',
      descEn:
        'Milan’s most iconic luxury club beneath Torre Branca in Parco Sempione. Royal Aperitivo from 19:30 with panoramic tower elevator access and international clubbing until 05:00 with VIP tables from €350–€500.',
    },
    {
      rank: 2,
      name: 'Pineta Club Milano',
      slug: 'pineta-club-milano',
      zone: 'Corso Como / Porta Garibaldi (Via Messina 38)',
      image: '/images/venues/pineta-milano/pineta-milano-ingresso-01.webp',
      badgeIt: '#2 Priorità · Il Re dell’Aperitivo Cantato',
      badgeEn: '#2 Priority · King of the Singing Aperitivo',
      descIt:
        'L’istituzione del venerdì e sabato a Milano: grandi tavolate conviviali dalle 19:30 con aperitivo cantato, cori a squarciagola e transizione fluida in discoteca reggaeton e commerciale fino all’alba. Tavoli VIP da 300€.',
      descEn:
        'Milan’s Friday and Saturday institution: convivial shared tables from 19:30 with live singing aperitivo, transitioning seamlessly into a high-energy reggaeton and commercial club night until dawn. VIP tables from €300.',
    },
    {
      rank: 3,
      name: 'Aria Club Milano',
      slug: 'aria-club-milano',
      zone: 'San Siro / Ippodromo (Piazzale dello Sport 14)',
      image: '/images/venues/aria-club-milano/aria-club-milano-interior-01.webp',
      badgeIt: '#3 Priorità · 3 Aree Privé & Afterparty San Siro',
      badgeEn: '#3 Priority · 3 VIP Zones & San Siro Afterparties',
      descIt:
        'A soli 150 metri dallo Stadio San Siro e dall’Ippodromo: grande giardino e sala interna con Royal Aperitivo dalle 19:30 e tre livelli di tavoli (Dancefloor, Privé Aria e Privé Console DJ) da 250€.',
      descEn:
        'Just 150 meters from San Siro Stadium and Ippodromo: expansive garden and main room with Royal Aperitivo from 19:30 and three distinct VIP table tiers (Dancefloor, Privé Aria, DJ Console) from €250.',
    },
    {
      rank: 4,
      name: '55 Milano (FiftyFive)',
      slug: '55-milano',
      zone: 'Arco della Pace / Sempione (Via Piero della Francesca 55)',
      image: '/images/55-milano.webp',
      badgeIt: '#4 Priorità · Ex Deposito ATM, Apericena XL & Dinner Show',
      badgeEn: '#4 Priority · Historic Tram Depot, XXL Apericena & Dinner Show',
      descIt:
        'Mille metri quadri ricavati da uno storico deposito ferroviario con grande terrazza: il punto di riferimento a Milano per Apericena riservata, feste di laurea, compleanni, Dinner Show del venerdì e "The Wall" il sabato.',
      descEn:
        'A 1,000-sqm converted historic railway depot with an expansive terrace: Milan’s premier hub for reserved Apericena, graduation parties, birthdays, Friday Dinner Shows, and Saturday "The Wall" club nights.',
    },
    {
      rank: 5,
      name: 'Voya Rooftop Milan',
      slug: 'voya-rooftop-milan',
      zone: 'Isola / Portello · 20° Piano (Via Achille Papa 30)',
      image: '/images/voya-rooftop-milan.webp',
      badgeIt: '#5 Priorità · Sky Lounge al 20° Piano Vista Skyline',
      badgeEn: '#5 Priority · 20th-Floor Sky Lounge & Skyline View',
      descIt:
        'Ventesimo piano con vetrate a 360 gradi sullo skyline di Milano: aperitivo al tramonto dalle 18:30 e DJ set elegante fino a tarda notte. Ideale per appuntamenti, compleanni chic, eventi aziendali e tavoli vista grattacieli.',
      descEn:
        'Twentieth-floor sky lounge with floor-to-ceiling glass overlooking the Milan skyline: sunset aperitivo from 18:30 and sophisticated DJ sets until late. Ideal for dates, chic birthdays, and window VIP tables.',
    },
    {
      rank: 6,
      name: 'REPVBLIC Milano',
      slug: 'repvblic-milano',
      zone: 'Piazza della Repubblica, 12 · Porta Nuova',
      image: '/images/repvblic-milano.webp',
      badgeIt: 'Piazza della Repubblica 12 · Hit Internazionali, House & Hip-Hop',
      badgeEn: 'Piazza della Repubblica 12 · International Hits, House & Hip-Hop',
      descIt:
        'Pubblico internazionale in Piazza della Repubblica 12, Dirty Monday e weekend House e Hip-Hop fino al mattino (Capodanno 2027 confermato dalle 23:00: Early Bird 45€, Dancefloor 600€, Privé 1.200€).',
      descEn:
        'International crowd in Piazza della Repubblica 12, Dirty Monday, and House & Hip-Hop weekends till morning (confirmed NYE 2027 from 23:00: Early Bird €45, Dancefloor €600, Privé €1,200).',
    },
  ];

  return (
    <section
      aria-label={isIt ? 'La Classifica Ufficiale dei 6 Club Prioritari di Milano' : 'Official Ranking of Milan’s Top 6 Priority Clubs'}
      className="my-14"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <p className="font-sans text-champagne text-[10px] font-bold tracking-[0.28em] uppercase mb-2">
            {isIt ? 'LA SELEZIONE UFFICIALE NIGHTLIFE MILAN · ORDINE DI PRIORITÀ' : 'NIGHTLIFE MILAN OFFICIAL SELECTION · PRIORITY RANKING'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            {isIt
              ? 'I 6 Locali Prioritari di Milano (Gestione Diretta Tavoli VIP & Liste)'
              : 'Milan’s Top 6 Priority Venues (Direct VIP Table & Guestlist Desk)'}
          </h2>
        </div>
        <Link
          href={`${lp}/clubs`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-champagne hover:text-white transition-colors"
        >
          <span>{isIt ? 'Esplora Tutti i Club' : 'Explore All Clubs'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {priorityClubs.map((club) => (
          <div
            key={club.slug}
            className="group rounded-2xl overflow-hidden border border-white/10 bg-[#0B0A09] hover:border-champagne/50 transition-all flex flex-col"
          >
            <div className="relative px-6 py-4 bg-gradient-to-r from-champagne/15 via-champagne/5 to-transparent border-b border-white/10 flex items-center justify-between gap-3">
              <div className="px-3 py-1 rounded-full bg-[#25D366] text-[#050505] text-[10px] font-extrabold tracking-wider uppercase">
                {isIt ? club.badgeIt : club.badgeEn}
              </div>
              <span className="font-serif italic text-2xl font-bold text-champagne">
                0{club.rank}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[11px] text-champagne/80 uppercase tracking-wider mb-1">{club.zone}</p>
                <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-champagne transition-colors">
                  {club.rank}. {club.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/65 leading-relaxed mb-5">
                  {isIt ? club.descIt : club.descEn}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <Link
                  href={`${lp}/clubs/${club.slug}`}
                  className="px-4 py-2 rounded-lg border border-white/15 text-xs font-semibold text-white hover:border-champagne hover:text-champagne transition-colors"
                >
                  {isIt ? 'Guida & Prezzi' : 'Guide & Prices'}
                </Link>
                <a
                  href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(
                    isIt
                      ? `Ciao! Vorrei prenotare un Tavolo VIP o Aperitivo da ${club.name}.`
                      : `Hi! I'd like to book a VIP Table or Aperitivo at ${club.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto px-4 py-2 rounded-lg bg-[#25D366] text-[#050505] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  WhatsApp VIP
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type MatchCompetitionKey = 'inter' | 'milan' | 'derby' | 'ucl';
type MatchWhistleKey = 'afternoon' | 'evening' | 'midweek';
type MatchFormulaKey = 'walk-150m' | 'skybox-vip' | 'group-dinner';

const MATCH_COMPETITIONS: Record<
  MatchCompetitionKey,
  { labelIt: string; labelEn: string; vibeIt: string; vibeEn: string; tagIt: string; tagEn: string }
> = {
  inter: {
    labelIt: 'FC Internazionale Milano — Serie A & Champions',
    labelEn: 'FC Internazionale Milano — Serie A & Champions',
    vibeIt: 'Pubblico Nerazzurro, Corporate Skybox e ospiti internazionali da 75.000 spettatori al Meazza.',
    vibeEn: 'Nerazzurri supporters, Corporate Skybox guests, and 75,000 international matchday attendees at San Siro.',
    tagIt: 'Matchday Nerazzurro · San Siro',
    tagEn: 'Nerazzurri Matchday · San Siro',
  },
  milan: {
    labelIt: 'AC Milan — Serie A & Champions',
    labelEn: 'AC Milan — Serie A & Champions',
    vibeIt: 'Tifosi Rossoneri, Club Settecento, tribuna autorità e fashion crowd internazionale.',
    vibeEn: 'Rossoneri supporters, Club Settecento hospitality, executive lounges, and international fashion crowd.',
    tagIt: 'Matchday Rossonero · San Siro',
    tagEn: 'Rossoneri Matchday · San Siro',
  },
  derby: {
    labelIt: 'Derby della Madonnina — Inter vs Milan VIP Night',
    labelEn: 'Derby della Madonnina — Inter vs Milan VIP Night',
    vibeIt: 'La notte calcistica più richiesta d’Europa: sold-out totale dei Privé a San Siro, Parco Sempione e Corso Como.',
    vibeEn: 'Europe’s most sought-after football night: complete sell-out across VIP booths in San Siro, Sempione, and Corso Como.',
    tagIt: 'Alta Richiesta · Prenota 7gg Prima',
    tagEn: 'High Demand · Book 7 Days Ahead',
  },
  ucl: {
    labelIt: 'UEFA Champions League — Martedì & Mercoledì Notte (21:00)',
    labelEn: 'UEFA Champions League — Tuesday & Wednesday Night (21:00)',
    vibeIt: 'Notti europee infrasettimanali con migliaia di tifosi ospiti, delegazioni UEFA, sponsor e VIP internazionali.',
    vibeEn: 'European midweek nights with thousands of visiting fans, UEFA delegations, sponsors, and international VIPs.',
    tagIt: 'Midweek Champions · Aperto 7/7',
    tagEn: 'Midweek Champions · Open 7/7',
  },
};

const MATCH_WHISTLES: Record<
  MatchWhistleKey,
  {
    labelIt: string;
    labelEn: string;
    arrivalWindow: string;
    planIt: string;
    planEn: string;
  }
> = {
  afternoon: {
    labelIt: 'Partita ore 15:00 / 18:00 -> Fischio finale 17:00/20:00 -> Royal Aperitivo & Dinner Show',
    labelEn: 'Kick-off 15:00 / 18:00 -> Final Whistle 17:00/20:00 -> Royal Aperitivo & Dinner Show',
    arrivalWindow: '19:30 – 21:00',
    planIt: 'Uscita dallo stadio e ingresso diretto per Royal Aperitivo con buffet/cena cantata + tavolo confermato per tutta la notte.',
    planEn: 'Walk out of the stadium straight into Royal Aperitivo with buffet/singing dinner + confirmed VIP table for the whole night.',
  },
  evening: {
    labelIt: 'Posticipo Serie A ore 20:45 -> Fischio finale 22:40 -> Terzo Tempo Club & Tavolo VIP dalle 23:00',
    labelEn: 'Serie A Night Match 20:45 -> Final Whistle 22:40 -> Third-Half Clubbing & VIP Table from 23:00',
    arrivalWindow: '23:00 – 00:15',
    planIt: 'Salta l’ingorgo post-partita: ingresso salta-fila con Hostess al tavolo VIP entro le 23:30 con 100% del budget in bottiglie.',
    planEn: 'Bypass the post-match traffic jam: skip-the-line Hostess entry to your VIP booth by 23:30 with 100% bottle credit.',
  },
  midweek: {
    labelIt: 'Champions League / Coppa Italia Martedì-Mercoledì ore 21:00 -> Fischio finale 22:55 -> Midweek VIP Party fino alle 05:00',
    labelEn: 'Champions League / Coppa Italia Tue-Wed 21:00 -> Final Whistle 22:55 -> Midweek VIP Party until 05:00',
    arrivalWindow: '23:15 – 00:30',
    planIt: 'Nelle notti infrasettimanali di coppa, Just Me (aperto 7/7), Voya Rooftop (20° piano) e 55 Milano garantiscono il vero afterparty.',
    planEn: 'On midweek European cup nights, Just Me (open 7/7), Voya Rooftop (20th floor), and 55 Milano guarantee the ultimate afterparty.',
  },
};

const MATCH_FORMULAS: Record<
  MatchFormulaKey,
  {
    labelIt: string;
    labelEn: string;
    focusIt: string;
    focusEn: string;
    recommendedSlugs: string[];
  }
> = {
  'walk-150m': {
    labelIt: 'A Piedi dallo Stadio (150m): Aria Club Milano — Zero Taxi, Zero Coda M5',
    labelEn: 'Walk from the Stadium (150m): Aria Club Milano — Zero Taxi, Zero M5 Queue',
    focusIt: 'Attraversi Piazzale dello Sport a piedi in 120 secondi e sei già al tuo tavolo VIP mentre 75.000 persone cercano un taxi.',
    focusEn: 'Cross Piazzale dello Sport on foot in 120 seconds and step into your VIP booth while 75,000 fans wait for a taxi.',
    recommendedSlugs: ['aria-club-milano', 'voya-rooftop-milan', '55-milano', 'just-me-milano', 'pineta-club-milano', 'repvblic-milano'],
  },
  'skybox-vip': {
    labelIt: 'Luxury Privé & Giocatori/VIP: Just Me Torre Branca (Aperto 7/7) & Voya Rooftop 20° Piano',
    labelEn: 'Luxury Privé & Players/VIPs: Just Me Torre Branca (Open 7/7) & Voya Rooftop 20th Floor',
    focusIt: 'La scelta n°1 per ospiti Corporate Hospitality, Skybox San Siro, calciatori, sponsor e clientela internazionale.',
    focusEn: 'The #1 choice for Corporate Hospitality, San Siro Skybox guests, footballers, sponsors, and international VIP clientele.',
    recommendedSlugs: ['just-me-milano', 'voya-rooftop-milan', 'aria-club-milano', 'pineta-club-milano', '55-milano', 'repvblic-milano'],
  },
  'group-dinner': {
    labelIt: 'Cena Cantata & Gruppi Tifosi: 55 Milano Sempione & Pineta Corso Como',
    labelEn: 'Singing Dinner & Fan Groups: 55 Milano Sempione & Pineta Corso Como',
    focusIt: 'Ideale per gruppi di amici, club organizzati e trasferte che vogliono cenare, cantare e poi ballare nello stesso locale.',
    focusEn: 'Ideal for groups of friends, supporter clubs, and away delegations wanting dinner, singing show, and clubbing in one venue.',
    recommendedSlugs: ['pineta-club-milano', '55-milano', 'aria-club-milano', 'just-me-milano', 'voya-rooftop-milan', 'repvblic-milano'],
  },
};

const SAN_SIRO_VENUES = [
  {
    priorityRank: 1,
    slug: 'just-me-milano',
    name: 'Just Me Milano (Torre Branca)',
    priorityBadgeIt: '#1 Priorità Assoluta · Aperto 7/7',
    priorityBadgeEn: '#1 Top Priority · Open 7/7',
    distanceIt: '10 min in auto/NCC (Parco Sempione, Viale Luigi Camoens 2)',
    distanceEn: '10 min by car/chauffeur (Parco Sempione, Viale Luigi Camoens 2)',
    transitIt: 'Taxi / NCC diretto da Piazzale Lotto o M5 Domodossola + 3 min',
    transitEn: 'Direct Taxi / Chauffeur from Lotto or M5 Domodossola + 3 min',
    pricesIt: 'Royal Aperitivo 20–30€ · Tavoli VIP Pista da 350–500€ · Privé Branca 1.000–3.000€',
    pricesEn: 'Royal Aperitivo €20–30 · Dancefloor VIP from €350–500 · Privé Branca €1,000–3,000',
    whyMatchIt:
      'L’unico top club di lusso aperto 7 sere su 7 (inclusi Martedì e Mercoledì di Champions League, Domenica sera e Lunedì). Punto d’incontro di giocatori, ospiti Skybox e clientela internazionale.',
    whyMatchEn:
      'The only luxury flagship club open 7 nights a week (including Tuesday & Wednesday Champions League nights, Sunday night, and Monday). Gathering spot for players, Skybox guests, and international VIPs.',
  },
  {
    priorityRank: 2,
    slug: 'pineta-club-milano',
    name: 'Pineta Club Milano',
    priorityBadgeIt: '#2 Priorità · Re dell’Aperitivo Cantato',
    priorityBadgeEn: '#2 Priority · King of Singing Aperitivo',
    distanceIt: '12 min M5 Garibaldi (Via Messina 38 / Corso Como)',
    distanceEn: '12 min M5 Garibaldi (Via Messina 38 / Corso Como)',
    transitIt: 'M5 Lilla diretta da San Siro Stadio a Cenisio / Garibaldi',
    transitEn: 'Direct M5 Purple Line from San Siro Stadio to Cenisio / Garibaldi',
    pricesIt: 'Buffet Cantato 20–25€ · Tavoli VIP Club 300–600€ (100% in bottiglie)',
    pricesEn: 'Singing Buffet €20–25 · VIP Club Tables €300–600 (100% in bottles)',
    whyMatchIt:
      'Perfetto per gli anticipi del Venerdì e Sabato: festa corale con aperitivo cantato dalle 19:30 e notte reggaeton/commerciale ad altissima energia fino alle 05:00.',
    whyMatchEn:
      'Perfect for Friday and Saturday fixtures: high-energy singing aperitivo from 19:30 followed by reggaeton and commercial clubbing until 05:00.',
  },
  {
    priorityRank: 3,
    slug: 'aria-club-milano',
    name: 'Aria Club Milano (San Siro)',
    priorityBadgeIt: '#3 Priorità · A 150 Metri dallo Stadio!',
    priorityBadgeEn: '#3 Priority · 150 Meters from Stadium!',
    distanceIt: '2 minuti a piedi (150m — Piazzale dello Sport 14)',
    distanceEn: '2 minutes on foot (150m — Piazzale dello Sport 14)',
    transitIt: 'A piedi dai cancelli di San Siro · Zero Taxi · Zero Coda M5',
    transitEn: 'Walk straight from San Siro gates · Zero Taxi · Zero M5 Queue',
    pricesIt: 'Royal Aperitivo 15–25€ · Tavoli Pista 250€ · Privé Aria 400€ · Console 600€',
    pricesEn: 'Royal Aperitivo €15–25 · Dancefloor VIP €250 · Privé Aria €400 · Console €600',
    whyMatchIt:
      'Il quartier generale naturale del Terzo Tempo a San Siro: letteralmente di fronte allo stadio in Piazzale dello Sport 14. Giardino estivo e club invernale con 3 livelli di Privé.',
    whyMatchEn:
      'The natural headquarters for San Siro’s Third Half: literally across from the stadium in Piazzale dello Sport 14. Summer garden and winter club with 3 VIP table tiers.',
  },
  {
    priorityRank: 4,
    slug: '55-milano',
    name: '55 Milano (FiftyFive Sempione)',
    priorityBadgeIt: '#4 Priorità · 4 Fermate M5 da San Siro',
    priorityBadgeEn: '#4 Priority · 4 M5 Stops from San Siro',
    distanceIt: '6 min M5 (Via Piero della Francesca 55, Sempione)',
    distanceEn: '6 min M5 (Via Piero della Francesca 55, Sempione)',
    transitIt: '4 fermate M5 Lilla (San Siro -> Domodossola / Gerusalemme)',
    transitEn: '4 stops on M5 Purple Line (San Siro -> Domodossola / Gerusalemme)',
    pricesIt: 'Apericena XL Riservata 20–30€ · Dinner Show 50€ · Tavoli Dopocena da 250–350€',
    pricesEn: 'Reserved XXL Apericena €20–30 · Dinner Show €50 · Club Tables from €250–350',
    whyMatchIt:
      'Mille metri quadri in un ex deposito ferroviario con terrazza: imbattibile per gruppi numerosi di tifosi, cene post-partita delle 18:00, feste del sabato ("The Wall") e domenica sera.',
    whyMatchEn:
      '1,000 sqm inside a historic railway depot with terrace: unbeatable for large fan groups, post-18:00 match dinners, Saturday "The Wall" parties, and Sunday nights.',
  },
  {
    priorityRank: 5,
    slug: 'voya-rooftop-milan',
    name: 'Voya Rooftop Milan (20° Piano)',
    priorityBadgeIt: '#5 Priorità · 20° Piano a 3 Fermate M5',
    priorityBadgeEn: '#5 Priority · 20th Floor, 3 M5 Stops Away',
    distanceIt: '4 min / 3 fermate M5 Lotto->Portello (Via Achille Papa 30)',
    distanceEn: '4 min / 3 stops M5 Lotto->Portello (Via Achille Papa 30)',
    transitIt: 'Linea M5 Lilla diretta (fermata Portello) + 3 min a piedi',
    transitEn: 'Direct M5 Purple Line (Portello stop) + 3 min walk',
    pricesIt: 'Sunset & Post-Match Aperitivo 20–30€ · Tavoli VIP Vetrata Skyline da 250–400€',
    pricesEn: 'Sunset & Post-Match Aperitivo €20–30 · Skyline Window VIP Tables from €250–400',
    whyMatchIt:
      'Sky lounge vetrata a 85 metri d’altezza con vista diretta sulle luci di San Siro e sulle Tre Torri di CityLife: la scelta più elegante per ospitalità aziendale e post-partita panoramico.',
    whyMatchEn:
      'Glass sky lounge 85 meters high with direct views of the San Siro floodlights and CityLife towers: the most sophisticated choice for corporate hospitality and panoramic post-match drinks.',
  },
  {
    priorityRank: 6,
    slug: 'repvblic-milano',
    name: 'Repvblic Milano',
    priorityBadgeIt: '#6 Priorità · Dirty Monday & House/Urban',
    priorityBadgeEn: '#6 Priority · Dirty Monday & House/Urban',
    distanceIt: '15 min da San Siro (Piazza della Repubblica)',
    distanceEn: '15 min from San Siro (Piazza della Repubblica)',
    transitIt: 'M5 Lilla fino a Garibaldi + 1 fermata M2/M3 Repubblica',
    transitEn: 'M5 Purple Line to Garibaldi + 1 stop to Repubblica',
    pricesIt: 'Tavoli VIP Pista da 300€ · Tavoli Privé da 500–800€',
    pricesEn: 'Dancefloor VIP Tables from €300 · Privé Tables from €500–800',
    whyMatchIt:
      'Tappa obbligata per i posticipi del Lunedì sera (Dirty Monday, la notte hip-hop/house più famosa di Milano) e per chi cerca un club dal sound internazionale nel weekend.',
    whyMatchEn:
      'Essential stop after Monday night football fixtures (Dirty Monday, Milan’s famous hip-hop/house industry night) and for fans seeking an international sound system on weekends.',
  },
];

export function SanSiroMatchAfterpartyFinder({ locale = 'it' }: { locale?: string }) {
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const [competition, setCompetition] = useState<MatchCompetitionKey>('inter');
  const [whistle, setWhistle] = useState<MatchWhistleKey>('evening');
  const [formula, setFormula] = useState<MatchFormulaKey>('walk-150m');
  const [guests, setGuests] = useState<number>(6);

  const compObj = MATCH_COMPETITIONS[competition];
  const whistleObj = MATCH_WHISTLES[whistle];
  const formulaObj = MATCH_FORMULAS[formula];

  const orderedVenues = [...SAN_SIRO_VENUES].sort((a, b) => {
    const idxA = formulaObj.recommendedSlugs.indexOf(a.slug);
    const idxB = formulaObj.recommendedSlugs.indexOf(b.slug);
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  const topPick = orderedVenues[0];

  const waText = isIt
    ? `Ciao Concierge Nightlife Milan! Siamo a San Siro e vorremmo prenotare il Dopo-Partita:\n• Partita: ${compObj.labelIt}\n• Fascia Fischio Finale: ${whistleObj.labelIt}\n• Formula scelta: ${formulaObj.labelIt}\n• Locale top consigliato: ${topPick.name}\n• Ospiti: ${guests} persone\n• Orario arrivo stimato: ${whistleObj.arrivalWindow}`
    : `Hi Nightlife Milan Concierge! We are attending a match at San Siro and would like to book our Afterparty:\n• Match: ${compObj.labelEn}\n• Final Whistle Slot: ${whistleObj.labelEn}\n• Preferred Formula: ${formulaObj.labelEn}\n• Top Recommended Venue: ${topPick.name}\n• Group Size: ${guests} guests\n• Estimated Arrival: ${whistleObj.arrivalWindow}`;

  const waHref = `${CONTACT.whatsapp.link}?text=${encodeURIComponent(waText)}`;

  return (
    <section
      id="san-siro-match-finder"
      aria-label={
        isIt
          ? 'Configuratore Interattivo Dopo-Partita San Siro Inter e Milan'
          : 'Interactive San Siro Inter & AC Milan Match Afterparty Finder'
      }
      className="my-14 rounded-2xl border border-champagne/35 bg-[#0B0A09] p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.75)]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/15 border border-champagne/40 text-champagne text-[11px] font-bold tracking-[0.22em] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            {isIt
              ? 'SAN SIRO MATCHDAY CONCIERGE · STADIO GIUSEPPE MEAZZA'
              : 'SAN SIRO MATCHDAY CONCIERGE · GIUSEPPE MEAZZA STADIUM'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {isIt
              ? 'Pianificatore Terzo Tempo & Afterparty Post-Partita San Siro'
              : 'San Siro Post-Match Third Half & VIP Afterparty Planner'}
          </h2>
          <p className="text-white/65 text-sm sm:text-base mt-2 max-w-3xl">
            {isIt
              ? 'Seleziona la partita (Inter, Milan, Derby o Champions League), l’orario del fischio finale e la tua formula ideale per scoprire in tempo reale dove andare a piedi (150m) o in M5, con tempi di percorrenza, prezzi tavoli VIP e regole Dress Code.'
              : 'Select your match (Inter, AC Milan, Derby, or Champions League), final whistle time, and preferred vibe to see real-time club recommendations within walking distance (150m) or M5 metro, complete with travel times, VIP table prices, and Dress Code rules.'}
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-champagne bg-champagne/10 border border-champagne/30 px-4 py-2.5 rounded-xl shrink-0">
          <Clock className="w-4 h-4 text-champagne shrink-0" />
          <span>
            {isIt
              ? `Ingresso Garantito ${whistleObj.arrivalWindow} · +39 351 912 7047`
              : `Guaranteed Entry ${whistleObj.arrivalWindow} · +39 351 912 7047`}
          </span>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-7 space-y-6">
          {/* a) Match / Competition */}
          <div>
            <label className="block font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne mb-2.5">
              {isIt ? 'A) Tipo di Partita / Competizione a San Siro' : 'A) Match Type / Competition at San Siro'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(MATCH_COMPETITIONS) as MatchCompetitionKey[]).map((k) => {
                const active = competition === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setCompetition(k)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      active
                        ? 'bg-[#25D366] text-[#050505] border-champagne font-bold shadow-[0_0_20px_rgba(201,168,106,0.3)]'
                        : 'bg-white/[0.03] text-white/85 border-white/10 hover:border-champagne/40'
                    }`}
                  >
                    <div className="text-xs sm:text-sm leading-snug">
                      {isIt ? MATCH_COMPETITIONS[k].labelIt : MATCH_COMPETITIONS[k].labelEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* b) Whistle Time */}
          <div>
            <label className="block font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne mb-2.5">
              {isIt ? 'B) Fascia Oraria del Fischio Finale' : 'B) Final Whistle Time Slot'}
            </label>
            <div className="space-y-2.5">
              {(Object.keys(MATCH_WHISTLES) as MatchWhistleKey[]).map((k) => {
                const active = whistle === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setWhistle(k)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all ${
                      active
                        ? 'bg-champagne/15 border-champagne text-white font-semibold'
                        : 'bg-white/[0.02] border-white/10 text-white/75 hover:border-champagne/40'
                    }`}
                  >
                    {isIt ? MATCH_WHISTLES[k].labelIt : MATCH_WHISTLES[k].labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* c) Formula */}
          <div>
            <label className="block font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne mb-2.5">
              {isIt ? 'C) Formula Post-Partita Desiderata' : 'C) Preferred Post-Match Formula'}
            </label>
            <div className="space-y-2.5">
              {(Object.keys(MATCH_FORMULAS) as MatchFormulaKey[]).map((k) => {
                const active = formula === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setFormula(k)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-all ${
                      active
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-white/[0.03] text-white/80 border-white/10 hover:border-champagne/40'
                    }`}
                  >
                    {isIt ? MATCH_FORMULAS[k].labelIt : MATCH_FORMULAS[k].labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guests slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="san-siro-guests-range"
                className="font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne"
              >
                {isIt ? 'D) Numero di Tifosi / Ospiti nel Gruppo' : 'D) Number of Fans / Guests in Your Group'}
              </label>
              <span className="font-serif text-2xl font-bold text-white">
                {guests} {isIt ? 'Ospiti' : 'Guests'}
              </span>
            </div>
            <input
              id="san-siro-guests-range"
              type="range"
              min={2}
              max={30}
              step={1}
              value={guests}
              onChange={(e: { target: { value: string } }) => setGuests(Number(e.target.value))}
              className="w-full accent-[#F6F1E7] cursor-pointer h-2 bg-white/15 rounded-lg"
            />
          </div>
        </div>

        {/* Right Live Matchday Brief & Dress Code Warning */}
        <div className="lg:col-span-5 rounded-2xl border border-champagne/40 bg-black/65 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-champagne/20 text-champagne text-[10px] font-bold uppercase tracking-widest">
                {isIt ? compObj.tagIt : compObj.tagEn}
              </span>
              <span className="text-xs font-mono text-white/60">
                {isIt ? `Arrivo: ${whistleObj.arrivalWindow}` : `Arrival: ${whistleObj.arrivalWindow}`}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              {isIt ? `Scelta #1: ${topPick.name}` : `#1 Match Pick: ${topPick.name}`}
            </h3>
            <p className="text-xs sm:text-sm text-champagne font-medium mb-4">
              {isIt ? topPick.distanceIt : topPick.distanceEn}
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-white/80 border-t border-white/10 pt-4 mb-5">
              <div>
                <span className="text-white/45 block text-[10px] uppercase tracking-wider">
                  {isIt ? 'Strategia Logistica Post-Fischio Finale' : 'Post-Whistle Logistics Strategy'}
                </span>
                <p className="text-white/90 mt-0.5">{isIt ? whistleObj.planIt : whistleObj.planEn}</p>
              </div>
              <div>
                <span className="text-white/45 block text-[10px] uppercase tracking-wider">
                  {isIt ? 'Prezzi Ufficiali Tavoli VIP & Aperitivo' : 'Official VIP Table & Aperitivo Pricing'}
                </span>
                <p className="text-champagne font-semibold mt-0.5">{isIt ? topPick.pricesIt : topPick.pricesEn}</p>
              </div>
            </div>

            {/* Mandatory Dress Code Warning Box */}
            <div className="rounded-xl border border-[#050505]/20 bg-[#F6F1E7] text-[#050505] p-4 mb-6">
              <div className="flex items-center gap-2 text-[#050505] font-bold text-xs uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  {isIt ? 'Regola Dress Code Post-Partita' : 'Mandatory Post-Match Dress Code Rule'}
                </span>
              </div>
              <p className="text-xs text-[#1F1C18] leading-relaxed">
                {isIt
                  ? 'Attenzione: niente maglie da calcio o sciarpe nei club VIP dopo le 23:00; indossa camicia/polo o maglia scura sotto la giacca per superare la selezione alla porta senza problemi (la sciarpa va lasciata in auto o al guardaroba).'
                  : 'Important: no football jerseys, team scarves, or tracksuits inside VIP clubs after 23:00; wear a collared shirt, polo, or dark smart knit under your jacket to pass door selection smoothly.'}
              </p>
            </div>
          </div>

          <div>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] text-[#050505] font-sans font-bold text-xs sm:text-sm tracking-[0.14em] uppercase hover:bg-white transition-colors shadow-[0_0_30px_rgba(201,168,106,0.35)]"
            >
              <MessageCircle className="w-4 h-4" />
              {isIt
                ? 'Blocca Tavolo Post-Partita su WhatsApp'
                : 'Lock In Post-Match VIP Table on WhatsApp'}
            </a>
            <p className="text-[11px] text-center text-white/45 mt-2.5">
              {isIt
                ? 'Desk Diretto San Siro: +39 351 912 7047 · Teniamo il tavolo anche in caso di tempi supplementari'
                : 'Direct San Siro Desk: +39 351 912 7047 · We hold your VIP table even during extra time'}
            </p>
          </div>
        </div>
      </div>

      {/* Live Ranked Venues Grid with Exact Travel Times from Stadio Meazza */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
            {isIt
              ? 'I 6 Club Consigliati in Tempo Reale (con Distanza Esatta dallo Stadio Meazza)'
              : 'Real-Time Recommended Clubs (with Exact Travel Time from San Siro Stadium)'}
          </h3>
          <span className="text-xs text-champagne/80 hidden sm:inline">
            {isIt ? 'Ordinati per la tua formula + Priorità Ufficiale' : 'Sorted by your formula + Official Priority'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderedVenues.map((v, idx) => (
            <div
              key={v.slug}
              className={`rounded-xl p-5 border transition-all flex flex-col justify-between ${
                idx === 0
                  ? 'border-champagne bg-champagne/[0.07] shadow-[0_0_25px_rgba(201,168,106,0.18)]'
                  : 'border-white/10 bg-black/40 hover:border-champagne/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-champagne/20 border border-champagne/40 text-champagne text-[10px] font-bold uppercase tracking-wider">
                    {isIt ? v.priorityBadgeIt : v.priorityBadgeEn}
                  </span>
                  {idx === 0 && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                      {isIt ? 'Top Match' : 'Best Match'}
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-xl font-bold text-white mb-1">{v.name}</h4>

                <div className="text-xs text-champagne font-semibold flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{isIt ? v.distanceIt : v.distanceEn}</span>
                </div>
                <p className="text-[11px] text-white/55 mb-3">{isIt ? v.transitIt : v.transitEn}</p>

                <p className="text-xs text-white/75 leading-relaxed mb-3">
                  {isIt ? v.whyMatchIt : v.whyMatchEn}
                </p>

                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-[11px] text-white/85 mb-4">
                  <strong className="text-champagne block uppercase tracking-wider text-[10px]">
                    {isIt ? 'Listino Post-Partita:' : 'Post-Match Pricing:'}
                  </strong>
                  {isIt ? v.pricesIt : v.pricesEn}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <Link
                  href={`${lp}/clubs/${v.slug}`}
                  className="text-xs font-semibold text-white/85 hover:text-champagne transition-colors"
                >
                  {isIt ? 'Scheda Club →' : 'Club Guide →'}
                </Link>
                <a
                  href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(
                    isIt
                      ? `Ciao! Siamo alla partita a San Siro (${compObj.labelIt}) e vorremmo prenotare da ${v.name} per ${guests} persone.`
                      : `Hi! We are at the San Siro match (${compObj.labelEn}) and would like to book at ${v.name} for ${guests} guests.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto px-3 py-1.5 rounded-lg bg-[#25D366] text-[#050505] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  WhatsApp VIP
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type CheckerVenueKey =
  | 'just-me'
  | 'pineta'
  | 'aria'
  | 'fiftyfive'
  | 'voya'
  | 'repvblic'
  | 'underground';

type CheckerGroupKey = 'balanced' | 'mixed-male' | 'all-male' | 'post-event';
type CheckerOutfitKey = 'smart-luxury' | 'smart-casual' | 'streetwear';

interface CheckerVenueDef {
  rankLabelIt: string;
  rankLabelEn: string;
  name: string;
  slug: string;
  zoneIt: string;
  zoneEn: string;
  minAge: string;
  strictnessLevel: 'strict-luxury' | 'smart-glam' | 'underground';
  dressRuleIt: string;
  dressRuleEn: string;
}

const CHECKER_VENUES: Record<CheckerVenueKey, CheckerVenueDef> = {
  'just-me': {
    rankLabelIt: '1. Just Me (#1)',
    rankLabelEn: '1. Just Me (#1)',
    name: 'Just Me Milano (Torre Branca)',
    slug: 'just-me-milano',
    zoneIt: 'Parco Sempione (Viale Luigi Camoens 2)',
    zoneEn: 'Parco Sempione (Viale Luigi Camoens 2)',
    minAge: '21+',
    strictnessLevel: 'strict-luxury',
    dressRuleIt: 'Camicia/Blazer o look sartoriale uomo, abito/tacco donna. Vietate tute, borselli, cappellini e sneakers sportive.',
    dressRuleEn: 'Collared shirt/Blazer or tailored look for men, chic dress/heels for women. No tracksuits, pouches, caps, or gym sneakers.',
  },
  pineta: {
    rankLabelIt: '2. Pineta (#2)',
    rankLabelEn: '2. Pineta (#2)',
    name: 'Pineta Club Milano',
    slug: 'pineta-club-milano',
    zoneIt: 'Corso Como / Garibaldi (Via Messina 38)',
    zoneEn: 'Corso Como / Garibaldi (Via Messina 38)',
    minAge: '20+',
    strictnessLevel: 'strict-luxury',
    dressRuleIt: 'Smart Elegance & Glamour per Aperitivo Cantato e Club. Camicia o polo sartoriale consigliata, zero abbigliamento sportivo.',
    dressRuleEn: 'Smart Elegance & Glamour for Singing Aperitivo and Club. Collared shirt or tailored polo recommended, zero sportswear.',
  },
  aria: {
    rankLabelIt: '3. Aria Club (#3)',
    rankLabelEn: '3. Aria Club (#3)',
    name: 'Aria Club Milano',
    slug: 'aria-club-milano',
    zoneIt: 'San Siro / Ippodromo (Piazzale dello Sport 14)',
    zoneEn: 'San Siro / Ippodromo (Piazzale dello Sport 14)',
    minAge: '19+',
    strictnessLevel: 'smart-glam',
    dressRuleIt: 'Smart Chic & Urban Curato. Nei dopo-partita da San Siro (150m) lasciare sciarpe e maglie da gara in auto o al guardaroba.',
    dressRuleEn: 'Smart Chic & Curated Urban. On San Siro match nights (150m away) leave team scarves and jerseys in your car or cloakroom.',
  },
  fiftyfive: {
    rankLabelIt: '4. 55 Milano (#4)',
    rankLabelEn: '4. 55 Milano (#4)',
    name: '55 Milano (FiftyFive)',
    slug: '55-milano',
    zoneIt: 'Arco della Pace / Sempione (Via Piero della Francesca 55)',
    zoneEn: 'Arco della Pace / Sempione (Via Piero della Francesca 55)',
    minAge: '20+',
    strictnessLevel: 'smart-glam',
    dressRuleIt: 'Smart Casual Curato & Elegante per Apericena XL, Lauree, Dinner Show e serata The Wall del sabato.',
    dressRuleEn: 'Curated Smart Casual & Elegant for XXL Apericena, Graduations, Dinner Show, and Saturday The Wall party.',
  },
  voya: {
    rankLabelIt: '5. Voya Rooftop (#5)',
    rankLabelEn: '5. Voya Rooftop (#5)',
    name: 'Voya Rooftop Milan (20° Piano)',
    slug: 'voya-rooftop-milan',
    zoneIt: 'Isola / Portello (Via Achille Papa 30)',
    zoneEn: 'Isola / Portello (Via Achille Papa 30)',
    minAge: '21+',
    strictnessLevel: 'strict-luxury',
    dressRuleIt: 'Sky Lounge Chic al 20° piano. Camicia, blazer o maglia fine scura; mocassino o sneaker in pelle minimal.',
    dressRuleEn: '20th-Floor Sky Lounge Chic. Collared shirt, blazer, or fine dark knitwear; loafers or minimal leather sneakers.',
  },
  repvblic: {
    rankLabelIt: '6. REPVBLIC',
    rankLabelEn: '6. REPVBLIC',
    name: 'REPVBLIC Milano',
    slug: 'repvblic-milano',
    zoneIt: 'Piazza della Repubblica 12 · Porta Nuova',
    zoneEn: 'Piazza della Repubblica 12 · Porta Nuova',
    minAge: '20+',
    strictnessLevel: 'smart-glam',
    dressRuleIt: 'Fashion Forward & Look Curato per Dirty Monday, weekend e Capodanno 2027 (dalle 23:00). Vietati borselli e tute.',
    dressRuleEn: 'Fashion Forward & Elevated Look for Dirty Monday, weekends & NYE 2027 (from 23:00). No crossbody bags or tracksuits.',
  },
  underground: {
    rankLabelIt: 'Club Underground (Tunnel/Volt/Amnesia)',
    rankLabelEn: 'Underground Clubs (Tunnel/Volt/Amnesia)',
    name: 'Tunnel / Volt / Amnesia Milano',
    slug: 'volt-club-milano',
    zoneIt: 'Stazione Centrale / Corso Como / Mecenate',
    zoneEn: 'Central Station / Corso Como / Mecenate',
    minAge: '18+',
    strictnessLevel: 'underground',
    dressRuleIt: 'Estetica Total Black, Minimal Industrial e Streetwear pulito. Vietate maglie da calcio e gruppi molesti.',
    dressRuleEn: 'Total Black aesthetic, Minimal Industrial, and clean Streetwear. Football jerseys and disruptive groups refused.',
  },
};

const CHECKER_GROUPS: Record<
  CheckerGroupKey,
  { labelIt: string; labelEn: string; subIt: string; subEn: string }
> = {
  balanced: {
    labelIt: 'Coppia / Misto Equilibrato (50%+ donne)',
    labelEn: 'Couple / Balanced Mixed Group (50%+ women)',
    subIt: 'Proporzione ideale per liste nominali e tavoli',
    subEn: 'Ideal ratio for nominal guestlists and VIP tables',
  },
  'mixed-male': {
    labelIt: 'Gruppo Misto (più uomini che donne)',
    labelEn: 'Mixed Group (more men than women)',
    subIt: 'Richiede arrivo entro le 00:15 o prenotazione tavolo',
    subEn: 'Requires arrival before 00:15 or table reservation',
  },
  'all-male': {
    labelIt: 'Gruppo Solo Uomini (3+ uomini)',
    labelEn: 'All-Male Group (3+ men)',
    subIt: 'Alto rischio rimbalzo in lista standard; consigliato Tavolo VIP o Aperitivo',
    subEn: 'High refusal risk on standard guestlist; VIP Table or Aperitivo recommended',
  },
  'post-event': {
    labelIt: 'Ospiti Post-Partita / Post-Concerto',
    labelEn: 'Post-Match / Post-Concert Guests',
    subIt: 'Arrivo da San Siro o Ippodromo dopo le 22:45',
    subEn: 'Arriving from San Siro or Ippodromo after 22:45',
  },
};

const CHECKER_OUTFITS: Record<
  CheckerOutfitKey,
  { labelIt: string; labelEn: string; detailIt: string; detailEn: string }
> = {
  'smart-luxury': {
    labelIt: 'Smart Luxury / Elegante (Camicia, Blazer, Abito/Tacco)',
    labelEn: 'Smart Luxury / Elegant (Collared Shirt, Blazer, Dress/Heels)',
    detailIt: 'Camicia con colletto, giacca/blazer, pantalone sartoriale, mocassini o abito elegante/tacchi',
    detailEn: 'Collared shirt, blazer/jacket, tailored trousers, loafers or cocktail dress/heels',
  },
  'smart-casual': {
    labelIt: 'Smart Casual Curato (Polo/T-shirt nera minimal, pantalone lungo, sneaker pulita)',
    labelEn: 'Curated Smart Casual (Polo/minimal black tee, long trousers, clean leather sneaker)',
    detailIt: 'Total black curato, polo o t-shirt premium senza maxi-loghi, jeans scuri, sneaker in pelle bianca o nera',
    detailEn: 'Curated total black, polo or logo-free premium tee, dark jeans, clean white or black leather sneakers',
  },
  streetwear: {
    labelIt: 'Streetwear / Sportivo (Tuta, borsello, felpa cappuccio, maglietta calcio, cappellino)',
    labelEn: 'Streetwear / Sporty (Tracksuit, crossbody bag, hoodie, football jersey, cap)',
    detailIt: 'Capi sportivi, scarpe da ginnastica tecniche, borsello a tracolla, cappellino o maglia da gara',
    detailEn: 'Athletic wear, running trainers, crossbody pouch, baseball cap, or team jersey',
  },
};

export function DressCodeInstantChecker({ locale }: { locale: string }) {
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const [venueKey, setVenueKey] = useState<CheckerVenueKey>('just-me');
  const [groupKey, setGroupKey] = useState<CheckerGroupKey>('balanced');
  const [outfitKey, setOutfitKey] = useState<CheckerOutfitKey>('smart-luxury');

  const venue = CHECKER_VENUES[venueKey];
  const group = CHECKER_GROUPS[groupKey];
  const outfit = CHECKER_OUTFITS[outfitKey];

  let score = 90;
  if (outfitKey === 'smart-luxury') {
    score = venue.strictnessLevel === 'underground' ? 88 : 96;
  } else if (outfitKey === 'smart-casual') {
    if (venue.strictnessLevel === 'strict-luxury') score = 74;
    else if (venue.strictnessLevel === 'smart-glam') score = 88;
    else score = 95;
  } else {
    if (venue.strictnessLevel === 'strict-luxury') score = 8;
    else if (venue.strictnessLevel === 'smart-glam') score = 18;
    else score = 68;
  }

  if (groupKey === 'mixed-male') {
    score -= venue.strictnessLevel === 'strict-luxury' ? 18 : 12;
  } else if (groupKey === 'all-male') {
    score -= venue.strictnessLevel === 'strict-luxury' ? 42 : venue.strictnessLevel === 'smart-glam' ? 32 : 20;
  } else if (groupKey === 'post-event') {
    score -= outfitKey === 'streetwear' ? 25 : 14;
  }

  const clampedScore = Math.max(5, Math.min(99, score));
  const vipTableScore = outfitKey === 'streetwear' && venue.strictnessLevel !== 'underground' ? 25 : Math.min(99, Math.max(94, clampedScore + 28));

  const statusTier: 'green' | 'amber' | 'red' =
    clampedScore >= 78 ? 'green' : clampedScore >= 45 ? 'amber' : 'red';

  const statusBadge = {
    green: {
      labelIt: 'Verde: Ingresso Fluido',
      labelEn: 'Green: Smooth Entry',
      classes: 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300',
      barClass: 'bg-emerald-400',
    },
    amber: {
      labelIt: 'Ambra: Rischio Selezione in Lista',
      labelEn: 'Amber: Guestlist Selection Risk',
      classes: 'bg-[#F6F1E7]/15 border-[#F6F1E7]/45 text-[#F6F1E7]',
      barClass: 'bg-[#F6F1E7]',
    },
    red: {
      labelIt: 'Rosso: Alto Rischio Rimbalzo in Lista',
      labelEn: 'Red: High Guestlist Refusal Risk',
      classes: 'bg-rose-500/20 border-rose-400/50 text-rose-300',
      barClass: 'bg-rose-500',
    },
  }[statusTier];

  const getInsiderDiagnosis = (): { titleIt: string; titleEn: string; bodyIt: string; bodyEn: string } => {
    if (outfitKey === 'streetwear' && venue.strictnessLevel !== 'underground') {
      return {
        titleIt: 'Allerta Porta: Abbigliamento Sportivo / Borsello / Maglia Calcio Rifiutati',
        titleEn: 'Door Alert: Sportswear / Crossbody Bag / Football Jersey Refused',
        bodyIt: `Da ${venue.name} i direttori di porta bloccano tassativamente tute, borselli a tracolla, cappellini, felpe con cappuccio e maglie da calcio, anche in presenza di prenotazione. Soluzione immediata: sostituisci con camicia o polo scura e pantalone lungo, lascia eventuali sciarpe in auto e richiedi l'accredito con il nostro Concierge.`,
        bodyEn: `At ${venue.name}, door directors strictly refuse tracksuits, crossbody bags, caps, hoodies, and football jerseys, even with a reservation. Immediate fix: switch to a collared shirt or dark smart polo with long trousers, leave scarves in your car, and get accredited via our Concierge.`,
      };
    }
    if (groupKey === 'all-male') {
      return {
        titleIt: 'Diagnosi Insider per Gruppi di Soli Uomini: Prenota Tavolo VIP o Royal Aperitivo',
        titleEn: 'Insider Diagnosis for All-Male Groups: Book a VIP Table or Royal Aperitivo',
        bodyIt: `A Parco Sempione, Corso Como e Isola (${venue.name}), un gruppo di 3 o più uomini in semplice Lista Nominale dopo le 23:30 rischia il rimbalzo alla corda per mantenere il bilanciamento uomo/donna in pista. Prenotare un Tavolo VIP (da 250-500 euro 100% in bottiglie) o un Tavolo Royal Aperitivo dalle 19:30 porta l'indice di ingresso al ${vipTableScore}% con accoglienza diretta della Hostess VIP.`,
        bodyEn: `In Parco Sempione, Corso Como, and Isola (${venue.name}), a group of 3+ men on the standard Guest List after 23:30 faces a high risk of refusal at the velvet rope due to gender-ratio rules. Booking a VIP Table (from EUR 250-500, 100% in bottles) or a Royal Aperitivo Table from 19:30 boosts your entry index to ${vipTableScore}% with direct VIP Hostess escort.`,
      };
    }
    if (groupKey === 'post-event') {
      return {
        titleIt: 'Protocollo Post-Partita San Siro / Post-Concerto Ippodromo',
        titleEn: 'San Siro Post-Match / Ippodromo Post-Concert Protocol',
        bodyIt: `In uscita dallo Stadio Meazza o dall'Ippodromo verso ${venue.name}, ricorda due regole d'oro: 1) nessuna maglia da gara o sciarpa visibile all'ingresso (indossa camicia o maglia nera sotto la giacca); 2) blocca in anticipo il Tavolo VIP o Royal Aperitivo su WhatsApp (+39 351 912 7047) per saltare la fila post-evento.`,
        bodyEn: `Heading from San Siro Stadium or Ippodromo to ${venue.name}, follow two golden rules: 1) no visible team jerseys or scarves at the door (wear a collared shirt or black knit under your jacket); 2) lock in your VIP Table or Royal Aperitivo on WhatsApp (+39 351 912 7047) to bypass the post-event queue.`,
      };
    }
    if (outfitKey === 'smart-casual' && venue.strictnessLevel === 'strict-luxury') {
      return {
        titleIt: 'Attenzione alle Scarpe e al Colletto nei Top Club di Lusso',
        titleEn: 'Watch Footwear & Collar Rules at Flagship Luxury Venues',
        bodyIt: `Da ${venue.name} il look Smart Casual passa in lista solo se estremamente curato (total black sartoriale e scarpa in pelle pulita) ed entro le 00:00. Con una camicia o un blazer e l'inserimento nominale del Concierge su WhatsApp azzeri ogni incertezza alla selezione.`,
        bodyEn: `At ${venue.name}, a Smart Casual look passes on the guestlist only if impeccably styled (tailored total black and clean leather footwear) before midnight. Adding a collared shirt or blazer plus nominal WhatsApp Concierge accreditation removes any door uncertainty.`,
      };
    }
    return {
      titleIt: 'Profilo Ottimale per Superare la Selezione alla Porta',
      titleEn: 'Optimal Profile to Pass Milan Velvet-Rope Selection',
      bodyIt: `La tua combinazione per ${venue.name} rispetta pienamente gli standard richiesti dal direttore di porta (età minima ${venue.minAge}). Presentati tra le 19:30 e le 20:30 per il Royal Aperitivo oppure entro le 00:15 per la serata club con il nome in Lista Concierge o Tavolo VIP riservato.`,
      bodyEn: `Your combination for ${venue.name} fully meets the door director's standards (minimum age ${venue.minAge}). Arrive between 19:30 and 20:30 for the Royal Aperitivo or before 00:15 for clubbing with your name on the Concierge Guestlist or a reserved VIP Table.`,
    };
  };

  const diagnosis = getInsiderDiagnosis();

  const waMessage = isIt
    ? `Ciao Concierge Nightlife Milan! Ho usato il Dress Code & Door Selection Checker:\n• Locale: ${venue.name}\n• Gruppo: ${group.labelIt}\n• Outfit: ${outfit.labelIt}\n• Indice Lista calcolato: ${clampedScore}% (con Tavolo VIP: ${vipTableScore}%)\nVorrei ricevere accredito in lista o bloccare un Tavolo VIP / Royal Aperitivo garantito!`
    : `Hi Nightlife Milan Concierge! I used the Dress Code & Door Selection Checker:\n• Venue: ${venue.name}\n• Group: ${group.labelEn}\n• Outfit: ${outfit.labelEn}\n• Calculated Guestlist Score: ${clampedScore}% (with VIP Table: ${vipTableScore}%)\nI would like guestlist accreditation or a guaranteed VIP Table / Royal Aperitivo!`;

  const waUrl = `${CONTACT.whatsapp.link}?text=${encodeURIComponent(waMessage)}`;

  return (
    <section
      id="dress-code-instant-checker"
      aria-label={
        isIt
          ? 'Verificatore Istantaneo Dress Code e Selezione alla Porta Milano'
          : 'Milan Instant Dress Code & Door Selection Checker'
      }
      className="my-14 rounded-2xl border border-champagne/35 bg-gradient-to-b from-[#18130b] via-[#110e09] to-[#0b0906] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/15 border border-champagne/40 text-champagne text-[11px] font-bold tracking-[0.22em] uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isIt ? 'SIMULATORE SELEZIONE ALLA PORTA 2026/2027' : '2026/2027 VELVET ROPE & DRESS CODE SIMULATOR'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {isIt
              ? 'Dress Code & Door Selection Instant Checker'
              : 'Dress Code & Door Selection Instant Checker'}
          </h2>
          <p className="text-white/65 text-sm sm:text-base mt-2 max-w-3xl">
            {isIt
              ? 'Seleziona il locale target, la composizione del tuo gruppo e l’outfit scelto per calcolare in tempo reale la probabilità di superare la selezione in lista o con Tavolo VIP nei 6 Club Prioritari di Milano.'
              : 'Select your target club, group composition, and outfit to calculate in real time your probability of passing velvet-rope selection on the guestlist vs. a VIP Table across Milan’s Top 6 Priority Clubs.'}
          </p>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-champagne bg-champagne/10 border border-champagne/30 px-4 py-2.5 rounded-xl shrink-0">
          <Users className="w-4 h-4 text-champagne shrink-0" />
          <span>
            {isIt
              ? 'Desk Accrediti Diretto: +39 351 912 7047'
              : 'Direct Accreditation Desk: +39 351 912 7047'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* A) Target Venue */}
          <div>
            <label className="block font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne mb-2.5">
              {isIt ? 'A) Seleziona il Locale Target' : 'A) Select Target Venue'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(CHECKER_VENUES) as CheckerVenueKey[]).map((k) => {
                const v = CHECKER_VENUES[k];
                const active = venueKey === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setVenueKey(k)}
                    className={`text-left px-4 py-3 rounded-xl border transition-all ${
                      active
                        ? 'bg-[#25D366] text-[#050505] border-champagne font-bold shadow-[0_0_20px_rgba(201,168,106,0.3)]'
                        : 'bg-white/[0.03] text-white/85 border-white/10 hover:border-champagne/40'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-semibold">
                      {isIt ? v.rankLabelIt : v.rankLabelEn}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${active ? 'text-black/75' : 'text-white/50'}`}>
                      {isIt ? v.zoneIt : v.zoneEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* B) Group Composition */}
          <div>
            <label className="block font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne mb-2.5">
              {isIt ? 'B) Composizione del Gruppo' : 'B) Group Composition'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(CHECKER_GROUPS) as CheckerGroupKey[]).map((k) => {
                const g = CHECKER_GROUPS[k];
                const active = groupKey === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setGroupKey(k)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      active
                        ? 'bg-champagne/15 border-champagne text-white font-semibold'
                        : 'bg-white/[0.02] border-white/10 text-white/75 hover:border-champagne/40'
                    }`}
                  >
                    <div className="text-xs sm:text-sm text-white">
                      {isIt ? g.labelIt : g.labelEn}
                    </div>
                    <div className="text-[11px] text-white/50 mt-1">
                      {isIt ? g.subIt : g.subEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* C) Chosen Outfit */}
          <div>
            <label className="block font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne mb-2.5">
              {isIt ? 'C) Outfit Scelto per la Serata' : 'C) Chosen Outfit for the Night'}
            </label>
            <div className="space-y-2.5">
              {(Object.keys(CHECKER_OUTFITS) as CheckerOutfitKey[]).map((k) => {
                const o = CHECKER_OUTFITS[k];
                const active = outfitKey === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setOutfitKey(k)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      active
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-white/[0.03] text-white/80 border-white/10 hover:border-champagne/40'
                    }`}
                  >
                    <div className="text-xs sm:text-sm">
                      {isIt ? o.labelIt : o.labelEn}
                    </div>
                    <div className={`text-[11px] mt-1 font-normal ${active ? 'text-black/75' : 'text-white/50'}`}>
                      {isIt ? o.detailIt : o.detailEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Live Diagnosis & Traffic-Light Output */}
        <div className="lg:col-span-5 rounded-2xl border border-champagne/40 bg-black/65 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-champagne/80">
                {isIt ? 'INDICE SUPERAMENTO SELEZIONE' : 'DOOR SELECTION PASS INDEX'}
              </span>
              <span className={`px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${statusBadge.classes}`}>
                {isIt ? statusBadge.labelIt : statusBadge.labelEn}
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-white">
                {clampedScore}%
              </span>
              <div className="text-xs text-white/60">
                <span className="block uppercase tracking-wider text-[10px] text-white/45">
                  {isIt ? 'In Lista Standard' : 'On Standard Guestlist'}
                </span>
                <span className="text-champagne font-semibold">
                  {isIt
                    ? `Fino al ${vipTableScore}% con Tavolo VIP / Aperitivo`
                    : `Up to ${vipTableScore}% with VIP Table / Aperitivo`}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden mb-6">
              <div
                className={`h-full transition-all duration-500 ${statusBadge.barClass}`}
                style={{ width: `${clampedScore}%` }}
              />
            </div>

            {/* Venue Standard Rule */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 mb-4 text-xs">
              <div className="flex items-center justify-between text-champagne font-bold uppercase tracking-wider text-[10px] mb-1">
                <span>{venue.name}</span>
                <span>{isIt ? `Età Minima: ${venue.minAge}` : `Min Age: ${venue.minAge}`}</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                {isIt ? venue.dressRuleIt : venue.dressRuleEn}
              </p>
            </div>

            {/* Insider Specific Diagnosis */}
            <div className="p-4 rounded-xl border border-champagne/30 bg-champagne/[0.06] mb-6">
              <div className="flex items-center gap-2 text-champagne font-bold text-xs uppercase tracking-wider mb-1.5">
                {statusTier === 'red' ? (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                )}
                <span>{isIt ? diagnosis.titleIt : diagnosis.titleEn}</span>
              </div>
              <p className="text-xs text-white/85 leading-relaxed">
                {isIt ? diagnosis.bodyIt : diagnosis.bodyEn}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] text-[#050505] font-sans font-bold text-xs sm:text-sm tracking-[0.14em] uppercase hover:bg-white transition-colors shadow-[0_0_30px_rgba(201,168,106,0.35)]"
            >
              <MessageCircle className="w-4 h-4" />
              {isIt
                ? 'Invia Profilo al Concierge (+39 351 912 7047)'
                : 'Send Profile to Concierge (+39 351 912 7047)'}
            </a>
            <div className="flex items-center justify-between text-[11px] text-white/45 px-1">
              <Link href={`${lp}/clubs/${venue.slug}`} className="text-champagne hover:underline">
                {isIt ? `Scheda ${venue.name} →` : `${venue.name} Guide →`}
              </Link>
              <span>concierge@nightlifemilan.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type CommuteOriginKey =
  | 'duomo'
  | 'san-siro'
  | 'centrale'
  | 'corso-como'
  | 'navigli'
  | 'brera'
  | 'citylife'
  | 'airports';

interface ClubCommuteRoute {
  priorityRank: number;
  name: string;
  slug: string;
  districtIt: string;
  districtEn: string;
  daytimeIt: string;
  daytimeEn: string;
  nightReturnIt: string;
  nightReturnEn: string;
  taxiEstimate: string;
}

interface CommuteOriginDef {
  labelIt: string;
  labelEn: string;
  hubTipIt: string;
  hubTipEn: string;
  routes: ClubCommuteRoute[];
}

const COMMUTE_ORIGINS: Record<CommuteOriginKey, CommuteOriginDef> = {
  duomo: {
    labelIt: '1. Piazza Duomo / Centro Storico',
    labelEn: '1. Piazza Duomo / Historic Center',
    hubTipIt: 'Snodo principale M1 Rossa e M3 Gialla; dopo le 00:30 attive le linee notturne NM1 e NM3 da Piazza Duomo.',
    hubTipEn: 'Main M1 Red and M3 Yellow hub; after 00:30 night buses NM1 and NM3 depart directly from Piazza Duomo.',
    routes: [
      {
        priorityRank: 1,
        name: '1. Just Me Milano',
        slug: 'just-me-milano',
        districtIt: 'Parco Sempione (Torre Branca)',
        districtEn: 'Parco Sempione (Torre Branca)',
        daytimeIt: '8 min con M1 Rossa (fermata Cadorna) + 6 min a piedi nel Parco Sempione',
        daytimeEn: '8 min via M1 Red Line (Cadorna stop) + 6 min walk to Torre Branca',
        nightReturnIt: 'Bus Notturno NM1 fino a Duomo · Taxi / Uber Black / NCC: 7 min',
        nightReturnEn: 'Night Bus NM1 to Duomo · Taxi / Uber Black / NCC: 7 min',
        taxiEstimate: '€12 - €16',
      },
      {
        priorityRank: 2,
        name: '2. Pineta Club Milano',
        slug: 'pineta-club-milano',
        districtIt: 'Corso Como / Via Messina 38',
        districtEn: 'Corso Como / Via Messina 38',
        daytimeIt: '11 min con M3 Gialla (Zara/Repubblica) + M5 Lilla (fermata Cenisio)',
        daytimeEn: '11 min via M3 Yellow Line + M5 Purple Line (Cenisio stop)',
        nightReturnIt: 'Filobus 90/91 h24 + NM3 da Repubblica · Taxi / NCC: 10 min',
        nightReturnEn: '24/7 Trolleybus 90/91 + NM3 from Repubblica · Taxi / NCC: 10 min',
        taxiEstimate: '€15 - €20',
      },
      {
        priorityRank: 3,
        name: '3. Aria Club Milano',
        slug: 'aria-club-milano',
        districtIt: 'San Siro (Piazzale dello Sport 14)',
        districtEn: 'San Siro (Piazzale dello Sport 14)',
        daytimeIt: '14 min con M1 Rossa diretta da Duomo a Lotto + 5 min a piedi',
        daytimeEn: '14 min via direct M1 Red Line from Duomo to Lotto + 5 min walk',
        nightReturnIt: 'Bus Notturno NM1 da Piazzale Lotto a Duomo · Taxi / NCC: 14 min',
        nightReturnEn: 'Night Bus NM1 from Piazzale Lotto to Duomo · Taxi / NCC: 14 min',
        taxiEstimate: '€18 - €24',
      },
      {
        priorityRank: 4,
        name: '4. 55 Milano (FiftyFive)',
        slug: '55-milano',
        districtIt: 'Arco della Pace / Sempione',
        districtEn: 'Arco della Pace / Sempione',
        daytimeIt: '12 min con M1 Rossa (Cadorna) + M2/M5 fino a Domodossola o Gerusalemme',
        daytimeEn: '12 min via M1 Red Line + M5 Purple Line (Domodossola / Gerusalemme)',
        nightReturnIt: 'Filobus 90/91 h24 o NM1 da Cadorna · Taxi / NCC: 9 min',
        nightReturnEn: '24/7 Trolleybus 90/91 or NM1 from Cadorna · Taxi / NCC: 9 min',
        taxiEstimate: '€14 - €18',
      },
      {
        priorityRank: 5,
        name: '5. Voya Rooftop Milan',
        slug: 'voya-rooftop-milan',
        districtIt: 'Isola / Portello (20° Piano)',
        districtEn: 'Isola / Portello (20th Floor)',
        daytimeIt: '13 min con M1 Rossa (Lotto) + 1 fermata M5 Lilla (Portello)',
        daytimeEn: '13 min via M1 Red Line (Lotto) + 1 stop M5 Purple Line (Portello)',
        nightReturnIt: 'Filobus 90/91 h24 da Viale Serra + NM1 · Taxi / NCC: 12 min',
        nightReturnEn: '24/7 Trolleybus 90/91 from Viale Serra + NM1 · Taxi / NCC: 12 min',
        taxiEstimate: '€16 - €22',
      },
      {
        priorityRank: 6,
        name: '6. Repvblic Milano',
        slug: 'repvblic-milano',
        districtIt: 'Piazza della Repubblica',
        districtEn: 'Piazza della Repubblica',
        daytimeIt: '5 min con M3 Gialla diretta da Duomo (fermata Repubblica)',
        daytimeEn: '5 min via direct M3 Yellow Line from Duomo (Repubblica stop)',
        nightReturnIt: 'Bus Notturno NM3 diretto verso Duomo · Taxi / NCC: 6 min',
        nightReturnEn: 'Direct Night Bus NM3 to Duomo · Taxi / NCC: 6 min',
        taxiEstimate: '€12 - €15',
      },
    ],
  },
  'san-siro': {
    labelIt: '2. Stadio San Siro / Ippodromo',
    labelEn: '2. San Siro Stadium / Ippodromo',
    hubTipIt: 'Dallo Stadio Meazza raggiungi Aria Club in 2 min a piedi (150m) oppure usi la M5 Lilla diretta verso Portello, Sempione e Garibaldi.',
    hubTipEn: 'From San Siro Stadium walk 2 min (150m) to Aria Club or take the direct M5 Purple Line to Portello, Sempione, and Garibaldi.',
    routes: [
      {
        priorityRank: 1,
        name: '1. Just Me Milano',
        slug: 'just-me-milano',
        districtIt: 'Parco Sempione (Torre Branca)',
        districtEn: 'Parco Sempione (Torre Branca)',
        daytimeIt: '10 min con M5 Lilla (fermata Domodossola) + 4 min in auto/piedi verso Torre Branca',
        daytimeEn: '10 min via M5 Purple Line (Domodossola stop) + 4 min to Torre Branca',
        nightReturnIt: 'Filobus 90/91 h24 fino a Lotto + NM1 · Taxi / Uber Black / NCC: 10 min',
        nightReturnEn: '24/7 Trolleybus 90/91 to Lotto + NM1 · Taxi / Uber Black / NCC: 10 min',
        taxiEstimate: '€15 - €20',
      },
      {
        priorityRank: 2,
        name: '2. Pineta Club Milano',
        slug: 'pineta-club-milano',
        districtIt: 'Corso Como / Via Messina 38',
        districtEn: 'Corso Como / Via Messina 38',
        daytimeIt: '12 min con M5 Lilla diretta da San Siro Stadio (fermata Cenisio)',
        daytimeEn: '12 min via direct M5 Purple Line from San Siro Stadio (Cenisio stop)',
        nightReturnIt: 'Filobus 90/91 h24 diretto fino a Piazzale Lotto · Taxi / NCC: 11 min',
        nightReturnEn: 'Direct 24/7 Trolleybus 90/91 to Piazzale Lotto · Taxi / NCC: 11 min',
        taxiEstimate: '€16 - €22',
      },
      {
        priorityRank: 3,
        name: '3. Aria Club Milano',
        slug: 'aria-club-milano',
        districtIt: 'San Siro (Piazzale dello Sport 14)',
        districtEn: 'San Siro (Piazzale dello Sport 14)',
        daytimeIt: '2 min a piedi / 150 metri dai cancelli dello Stadio San Siro (M5 San Siro Stadio / Lotto)',
        daytimeEn: '2 min walk / 150 meters from San Siro Stadium gates (M5 San Siro Stadio / Lotto)',
        nightReturnIt: 'A piedi in 2 min · Bus Notturno NM1 da Lotto verso il centro · Taxi / NCC: 2 min',
        nightReturnEn: '2 min on foot · Night Bus NM1 from Lotto to city center · Taxi / NCC: 2 min',
        taxiEstimate: '€12 - €14',
      },
      {
        priorityRank: 4,
        name: '4. 55 Milano (FiftyFive)',
        slug: '55-milano',
        districtIt: 'Arco della Pace / Sempione',
        districtEn: 'Arco della Pace / Sempione',
        daytimeIt: '8 min con M5 Lilla fermata Gerusalemme/Cenisio (oppure Domodossola)',
        daytimeEn: '8 min via M5 Purple Line to Gerusalemme/Cenisio (or Domodossola stop)',
        nightReturnIt: 'Filobus 90/91 h24 fino a Piazzale Lotto · Taxi / NCC: 8 min',
        nightReturnEn: '24/7 Trolleybus 90/91 to Piazzale Lotto · Taxi / NCC: 8 min',
        taxiEstimate: '€14 - €18',
      },
      {
        priorityRank: 5,
        name: '5. Voya Rooftop Milan',
        slug: 'voya-rooftop-milan',
        districtIt: 'Isola / Portello (20° Piano)',
        districtEn: 'Isola / Portello (20th Floor)',
        daytimeIt: '6 min con M5 Lilla fermata Portello + 3 min a piedi a Via Achille Papa 30',
        daytimeEn: '6 min via M5 Purple Line (Portello stop) + 3 min walk to Via Achille Papa 30',
        nightReturnIt: 'Filobus 90/91 h24 (Viale Serra / Lotto) · Taxi / NCC: 6 min',
        nightReturnEn: '24/7 Trolleybus 90/91 (Viale Serra / Lotto) · Taxi / NCC: 6 min',
        taxiEstimate: '€12 - €16',
      },
      {
        priorityRank: 6,
        name: '6. Repvblic Milano',
        slug: 'repvblic-milano',
        districtIt: 'Piazza della Repubblica',
        districtEn: 'Piazza della Repubblica',
        daytimeIt: '15 min con M5 Lilla fino a Garibaldi + 1 fermata M2/M3 (Repubblica)',
        daytimeEn: '15 min via M5 Purple Line to Garibaldi + 1 stop M2/M3 (Repubblica)',
        nightReturnIt: 'Filobus 90/91 h24 + NM1 da Lotto · Taxi / NCC: 15 min',
        nightReturnEn: '24/7 Trolleybus 90/91 + NM1 from Lotto · Taxi / NCC: 15 min',
        taxiEstimate: '€18 - €25',
      },
    ],
  },
  centrale: {
    labelIt: '3. Stazione Centrale / Repubblica',
    labelEn: '3. Central Station / Repubblica',
    hubTipIt: 'Collegamento diretto con M2 Verde, M3 Gialla e circolare 90/91 attiva 24 ore su 24 tutta la notte.',
    hubTipEn: 'Direct connection with M2 Green, M3 Yellow, and the 24/7 circular trolleybus 90/91 all night long.',
    routes: [
      {
        priorityRank: 1,
        name: '1. Just Me Milano',
        slug: 'just-me-milano',
        districtIt: 'Parco Sempione (Torre Branca)',
        districtEn: 'Parco Sempione (Torre Branca)',
        daytimeIt: '9 min con M2 Verde da Centrale (fermata Cadorna/Lanza) + 5 min',
        daytimeEn: '9 min via M2 Green Line from Centrale (Cadorna/Lanza stop) + 5 min',
        nightReturnIt: 'Bus Notturno NM2 fino a Centrale · Taxi / Uber Black / NCC: 9 min',
        nightReturnEn: 'Night Bus NM2 to Central Station · Taxi / Uber Black / NCC: 9 min',
        taxiEstimate: '€14 - €18',
      },
      {
        priorityRank: 2,
        name: '2. Pineta Club Milano',
        slug: 'pineta-club-milano',
        districtIt: 'Corso Como / Via Messina 38',
        districtEn: 'Corso Como / Via Messina 38',
        daytimeIt: '7 min con M2 Verde (Garibaldi) + M5 Lilla (Cenisio)',
        daytimeEn: '7 min via M2 Green Line (Garibaldi) + M5 Purple Line (Cenisio)',
        nightReturnIt: 'Filobus 90/91 h24 diretto a Stazione Centrale · Taxi / NCC: 7 min',
        nightReturnEn: 'Direct 24/7 Trolleybus 90/91 to Central Station · Taxi / NCC: 7 min',
        taxiEstimate: '€12 - €16',
      },
      {
        priorityRank: 3,
        name: '3. Aria Club Milano',
        slug: 'aria-club-milano',
        districtIt: 'San Siro (Piazzale dello Sport 14)',
        districtEn: 'San Siro (Piazzale dello Sport 14)',
        daytimeIt: '16 min con M2 Verde (Garibaldi) + M5 Lilla (Lotto / San Siro)',
        daytimeEn: '16 min via M2 Green Line (Garibaldi) + M5 Purple Line (Lotto / San Siro)',
        nightReturnIt: 'Filobus 90/91 h24 diretto da Lotto a Centrale · Taxi / NCC: 15 min',
        nightReturnEn: 'Direct 24/7 Trolleybus 90/91 from Lotto to Centrale · Taxi / NCC: 15 min',
        taxiEstimate: '€18 - €24',
      },
      {
        priorityRank: 4,
        name: '4. 55 Milano (FiftyFive)',
        slug: '55-milano',
        districtIt: 'Arco della Pace / Sempione',
        districtEn: 'Arco della Pace / Sempione',
        daytimeIt: '9 min con M2 Verde (Garibaldi) + M5 Lilla (Gerusalemme)',
        daytimeEn: '9 min via M2 Green Line (Garibaldi) + M5 Purple Line (Gerusalemme)',
        nightReturnIt: 'Filobus 90/91 h24 diretto a Centrale · Taxi / NCC: 9 min',
        nightReturnEn: 'Direct 24/7 Trolleybus 90/91 to Central Station · Taxi / NCC: 9 min',
        taxiEstimate: '€14 - €18',
      },
      {
        priorityRank: 5,
        name: '5. Voya Rooftop Milan',
        slug: 'voya-rooftop-milan',
        districtIt: 'Isola / Portello (20° Piano)',
        districtEn: 'Isola / Portello (20th Floor)',
        daytimeIt: '11 min con M2 Verde (Garibaldi) + M5 Lilla (fermata Portello)',
        daytimeEn: '11 min via M2 Green Line (Garibaldi) + M5 Purple Line (Portello stop)',
        nightReturnIt: 'Filobus 90/91 h24 diretto da Viale Serra a Centrale · Taxi / NCC: 10 min',
        nightReturnEn: 'Direct 24/7 Trolleybus 90/91 from Viale Serra to Centrale · Taxi / NCC: 10 min',
        taxiEstimate: '€15 - €20',
      },
      {
        priorityRank: 6,
        name: '6. Repvblic Milano',
        slug: 'repvblic-milano',
        districtIt: 'Piazza della Repubblica',
        districtEn: 'Piazza della Repubblica',
        daytimeIt: '3 min con 1 fermata M3 Gialla (Repubblica) o 6 min a piedi',
        daytimeEn: '3 min via 1 stop M3 Yellow Line (Repubblica) or 6 min walk',
        nightReturnIt: 'Bus Notturno NM3 / N25-N26 o 6 min a piedi · Taxi / NCC: 4 min',
        nightReturnEn: 'Night Bus NM3 / N25-N26 or 6 min walk · Taxi / NCC: 4 min',
        taxiEstimate: '€12 - €14',
      },
    ],
  },
  'corso-como': {
    labelIt: '4. Corso Como / Porta Garibaldi',
    labelEn: '4. Corso Como / Porta Garibaldi',
    hubTipIt: 'Epicentro della movida milanese con M2 Verde e M5 Lilla sotto Piazza Gae Aulenti e linee notturne N25/N26 + NM2.',
    hubTipEn: 'Epicenter of Milan nightlife with M2 Green and M5 Purple under Piazza Gae Aulenti plus night buses N25/N26 + NM2.',
    routes: [
      {
        priorityRank: 1,
        name: '1. Just Me Milano',
        slug: 'just-me-milano',
        districtIt: 'Parco Sempione (Torre Branca)',
        districtEn: 'Parco Sempione (Torre Branca)',
        daytimeIt: '6 min con M2 Verde (Lanza/Cadorna) + breve tratto nel Parco Sempione',
        daytimeEn: '6 min via M2 Green Line (Lanza/Cadorna) + short walk to Torre Branca',
        nightReturnIt: 'Bus Notturno NM2 / N25 fino a Garibaldi · Taxi / Uber Black / NCC: 6 min',
        nightReturnEn: 'Night Bus NM2 / N25 to Garibaldi · Taxi / Uber Black / NCC: 6 min',
        taxiEstimate: '€12 - €15',
      },
      {
        priorityRank: 2,
        name: '2. Pineta Club Milano',
        slug: 'pineta-club-milano',
        districtIt: 'Corso Como / Via Messina 38',
        districtEn: 'Corso Como / Via Messina 38',
        daytimeIt: '4 min con M5 Lilla (2 fermate fino a Cenisio) o 10 min a piedi',
        daytimeEn: '4 min via M5 Purple Line (2 stops to Cenisio) or 10 min walk',
        nightReturnIt: 'Notturna N25/N26 o 10 min a piedi · Taxi / NCC: 4 min',
        nightReturnEn: 'Night Bus N25/N26 or 10 min walk · Taxi / NCC: 4 min',
        taxiEstimate: '€12 - €14',
      },
      {
        priorityRank: 3,
        name: '3. Aria Club Milano',
        slug: 'aria-club-milano',
        districtIt: 'San Siro (Piazzale dello Sport 14)',
        districtEn: 'San Siro (Piazzale dello Sport 14)',
        daytimeIt: '12 min con M5 Lilla diretta da Garibaldi a Lotto / San Siro',
        daytimeEn: '12 min via direct M5 Purple Line from Garibaldi to Lotto / San Siro',
        nightReturnIt: 'Filobus 90/91 h24 + N25/N26 · Taxi / NCC: 12 min',
        nightReturnEn: '24/7 Trolleybus 90/91 + N25/N26 · Taxi / NCC: 12 min',
        taxiEstimate: '€16 - €22',
      },
      {
        priorityRank: 4,
        name: '4. 55 Milano (FiftyFive)',
        slug: '55-milano',
        districtIt: 'Arco della Pace / Sempione',
        districtEn: 'Arco della Pace / Sempione',
        daytimeIt: '5 min con M5 Lilla diretta da Garibaldi (fermata Gerusalemme)',
        daytimeEn: '5 min via direct M5 Purple Line from Garibaldi (Gerusalemme stop)',
        nightReturnIt: 'Notturna N25/N26 o Filobus 90/91 h24 · Taxi / NCC: 6 min',
        nightReturnEn: 'Night Bus N25/N26 or 24/7 Trolleybus 90/91 · Taxi / NCC: 6 min',
        taxiEstimate: '€12 - €15',
      },
      {
        priorityRank: 5,
        name: '5. Voya Rooftop Milan',
        slug: 'voya-rooftop-milan',
        districtIt: 'Isola / Portello (20° Piano)',
        districtEn: 'Isola / Portello (20th Floor)',
        daytimeIt: '8 min con M5 Lilla diretta da Garibaldi (fermata Portello)',
        daytimeEn: '8 min via direct M5 Purple Line from Garibaldi (Portello stop)',
        nightReturnIt: 'Filobus 90/91 h24 fino a Viale Marche/Zara · Taxi / NCC: 8 min',
        nightReturnEn: '24/7 Trolleybus 90/91 to Viale Marche/Zara · Taxi / NCC: 8 min',
        taxiEstimate: '€13 - €17',
      },
      {
        priorityRank: 6,
        name: '6. Repvblic Milano',
        slug: 'repvblic-milano',
        districtIt: 'Piazza della Repubblica',
        districtEn: 'Piazza della Repubblica',
        daytimeIt: '4 min a piedi da Corso Como o 1 fermata passante fino a Repubblica',
        daytimeEn: '4 min walk from Corso Como or 1 rail stop to Repubblica',
        nightReturnIt: 'A piedi in 5 min o Bus Notturno N25/N26 · Taxi / NCC: 3 min',
        nightReturnEn: '5 min walk or Night Bus N25/N26 · Taxi / NCC: 3 min',
        taxiEstimate: '€12 - €14',
      },
    ],
  },
  navigli: {
    labelIt: '5. Navigli / Porta Genova',
    labelEn: '5. Navigli / Porta Genova',
    hubTipIt: 'Partendo dall’aperitivo sui Navigli usa la M2 Verde da Porta Genova o Sant’Agostino per salire verso Sempione e Corso Como.',
    hubTipEn: 'Starting from aperitivo on the Navigli canals, take the M2 Green Line from Porta Genova or Sant’Agostino toward Sempione and Corso Como.',
    routes: [
      {
        priorityRank: 1,
        name: '1. Just Me Milano',
        slug: 'just-me-milano',
        districtIt: 'Parco Sempione (Torre Branca)',
        districtEn: 'Parco Sempione (Torre Branca)',
        daytimeIt: '7 min con M2 Verde diretta da Porta Genova a Cadorna + 5 min',
        daytimeEn: '7 min via direct M2 Green Line from Porta Genova to Cadorna + 5 min',
        nightReturnIt: 'Bus Notturno NM2 diretto da Cadorna a Porta Genova · Taxi / NCC: 9 min',
        nightReturnEn: 'Direct Night Bus NM2 from Cadorna to Porta Genova · Taxi / NCC: 9 min',
        taxiEstimate: '€14 - €18',
      },
      {
        priorityRank: 2,
        name: '2. Pineta Club Milano',
        slug: 'pineta-club-milano',
        districtIt: 'Corso Como / Via Messina 38',
        districtEn: 'Corso Como / Via Messina 38',
        daytimeIt: '14 min con M2 Verde fino a Garibaldi + 2 fermate M5 Lilla (Cenisio)',
        daytimeEn: '14 min via M2 Green Line to Garibaldi + 2 stops M5 Purple Line (Cenisio)',
        nightReturnIt: 'Filobus 90/91 h24 diretto fino a Viale Liguria/Romolo · Taxi / NCC: 14 min',
        nightReturnEn: 'Direct 24/7 Trolleybus 90/91 to Viale Liguria/Romolo · Taxi / NCC: 14 min',
        taxiEstimate: '€18 - €24',
      },
      {
        priorityRank: 3,
        name: '3. Aria Club Milano',
        slug: 'aria-club-milano',
        districtIt: 'San Siro (Piazzale dello Sport 14)',
        districtEn: 'San Siro (Piazzale dello Sport 14)',
        daytimeIt: '16 min con M2 Verde (Cadorna) + M1 Rossa (Lotto) + 5 min a piedi',
        daytimeEn: '16 min via M2 Green (Cadorna) + M1 Red (Lotto) + 5 min walk',
        nightReturnIt: 'Filobus 90/91 h24 diretto da Lotto ai Navigli · Taxi / NCC: 14 min',
        nightReturnEn: 'Direct 24/7 Trolleybus 90/91 from Lotto to Navigli · Taxi / NCC: 14 min',
        taxiEstimate: '€18 - €24',
      },
      {
        priorityRank: 4,
        name: '4. 55 Milano (FiftyFive)',
        slug: '55-milano',
        districtIt: 'Arco della Pace / Sempione',
        districtEn: 'Arco della Pace / Sempione',
        daytimeIt: '13 min con M2 Verde (Garibaldi) + M5 Lilla (Gerusalemme)',
        daytimeEn: '13 min via M2 Green Line (Garibaldi) + M5 Purple Line (Gerusalemme)',
        nightReturnIt: 'Filobus 90/91 h24 o NM2 da Cadorna · Taxi / NCC: 12 min',
        nightReturnEn: '24/7 Trolleybus 90/91 or NM2 from Cadorna · Taxi / NCC: 12 min',
        taxiEstimate: '€16 - €21',
      },
      {
        priorityRank: 5,
        name: '5. Voya Rooftop Milan',
        slug: 'voya-rooftop-milan',
        districtIt: 'Isola / Portello (20° Piano)',
        districtEn: 'Isola / Portello (20th Floor)',
        daytimeIt: '16 min con M2 Verde (Garibaldi) + M5 Lilla (fermata Portello)',
        daytimeEn: '16 min via M2 Green Line (Garibaldi) + M5 Purple Line (Portello stop)',
        nightReturnIt: 'Filobus 90/91 h24 diretto da Viale Serra ai Navigli · Taxi / NCC: 14 min',
        nightReturnEn: 'Direct 24/7 Trolleybus 90/91 from Viale Serra to Navigli · Taxi / NCC: 14 min',
        taxiEstimate: '€18 - €24',
      },
      {
        priorityRank: 6,
        name: '6. Repvblic Milano',
        slug: 'repvblic-milano',
        districtIt: 'Piazza della Repubblica',
        districtEn: 'Piazza della Repubblica',
        daytimeIt: '12 min con M2 Verde fino a Garibaldi/Centrale + 4 min a Repubblica',
        daytimeEn: '12 min via M2 Green Line to Garibaldi/Centrale + 4 min to Repubblica',
        nightReturnIt: 'Bus Notturno NM2 diretto verso Porta Genova · Taxi / NCC: 12 min',
        nightReturnEn: 'Direct Night Bus NM2 toward Porta Genova · Taxi / NCC: 12 min',
        taxiEstimate: '€16 - €22',
      },
    ],
  },
  brera: {
    labelIt: '6. Brera / Moscova',
    labelEn: '6. Brera / Moscova',
    hubTipIt: 'Posizione centrale perfetta tra Parco Sempione e Corso Como: molti club sono raggiungibili in 5-8 minuti.',
    hubTipEn: 'Prime central position between Parco Sempione and Corso Como: most clubs are 5-8 minutes away.',
    routes: [
      {
        priorityRank: 1,
        name: '1. Just Me Milano',
        slug: 'just-me-milano',
        districtIt: 'Parco Sempione (Torre Branca)',
        districtEn: 'Parco Sempione (Torre Branca)',
        daytimeIt: '4 min con 1 fermata M2 Verde (Moscova -> Lanza/Cadorna) o 12 min a piedi',
        daytimeEn: '4 min via 1 stop M2 Green Line (Moscova -> Lanza/Cadorna) or 12 min walk',
        nightReturnIt: 'Bus Notturno NM2 o 12 min a piedi · Taxi / Uber Black / NCC: 5 min',
        nightReturnEn: 'Night Bus NM2 or 12 min walk · Taxi / Uber Black / NCC: 5 min',
        taxiEstimate: '€12 - €14',
      },
      {
        priorityRank: 2,
        name: '2. Pineta Club Milano',
        slug: 'pineta-club-milano',
        districtIt: 'Corso Como / Via Messina 38',
        districtEn: 'Corso Como / Via Messina 38',
        daytimeIt: '7 min con M2 Verde (Garibaldi) + M5 Lilla (Cenisio)',
        daytimeEn: '7 min via M2 Green Line (Garibaldi) + M5 Purple Line (Cenisio)',
        nightReturnIt: 'Notturna N25/N26 fino a Moscova · Taxi / NCC: 6 min',
        nightReturnEn: 'Night Bus N25/N26 to Moscova · Taxi / NCC: 6 min',
        taxiEstimate: '€12 - €15',
      },
      {
        priorityRank: 3,
        name: '3. Aria Club Milano',
        slug: 'aria-club-milano',
        districtIt: 'San Siro (Piazzale dello Sport 14)',
        districtEn: 'San Siro (Piazzale dello Sport 14)',
        daytimeIt: '13 min con M2 Verde (Garibaldi) + M5 Lilla (Lotto / San Siro)',
        daytimeEn: '13 min via M2 Green (Garibaldi) + M5 Purple (Lotto / San Siro)',
        nightReturnIt: 'Bus Notturno NM1 fino a Cadorna + NM2 · Taxi / NCC: 12 min',
        nightReturnEn: 'Night Bus NM1 to Cadorna + NM2 · Taxi / NCC: 12 min',
        taxiEstimate: '€16 - €22',
      },
      {
        priorityRank: 4,
        name: '4. 55 Milano (FiftyFive)',
        slug: '55-milano',
        districtIt: 'Arco della Pace / Sempione',
        districtEn: 'Arco della Pace / Sempione',
        daytimeIt: '7 min con M2 Verde (Garibaldi) + M5 Lilla (Gerusalemme) o 15 min a piedi',
        daytimeEn: '7 min via M2 Green + M5 Purple (Gerusalemme) or 15 min walk',
        nightReturnIt: 'Notturna N25/N26 verso Moscova · Taxi / NCC: 6 min',
        nightReturnEn: 'Night Bus N25/N26 to Moscova · Taxi / NCC: 6 min',
        taxiEstimate: '€12 - €15',
      },
      {
        priorityRank: 5,
        name: '5. Voya Rooftop Milan',
        slug: 'voya-rooftop-milan',
        districtIt: 'Isola / Portello (20° Piano)',
        districtEn: 'Isola / Portello (20th Floor)',
        daytimeIt: '10 min con M2 Verde (Garibaldi) + M5 Lilla (Portello)',
        daytimeEn: '10 min via M2 Green Line (Garibaldi) + M5 Purple Line (Portello)',
        nightReturnIt: 'Filobus 90/91 h24 + NM2 · Taxi / NCC: 9 min',
        nightReturnEn: '24/7 Trolleybus 90/91 + NM2 · Taxi / NCC: 9 min',
        taxiEstimate: '€14 - €18',
      },
      {
        priorityRank: 6,
        name: '6. Repvblic Milano',
        slug: 'repvblic-milano',
        districtIt: 'Piazza della Repubblica',
        districtEn: 'Piazza della Repubblica',
        daytimeIt: '8 min a piedi lungo Via Turati / Bastioni di Porta Nuova',
        daytimeEn: '8 min walk along Via Turati / Bastioni di Porta Nuova',
        nightReturnIt: 'Notturna N25/N26 o 8 min a piedi · Taxi / NCC: 4 min',
        nightReturnEn: 'Night Bus N25/N26 or 8 min walk · Taxi / NCC: 4 min',
        taxiEstimate: '€12 - €14',
      },
    ],
  },
  citylife: {
    labelIt: '7. CityLife / Tre Torri',
    labelEn: '7. CityLife / Tre Torri',
    hubTipIt: 'Servito direttamente dalla M5 Lilla (fermata Tre Torri): in 2-5 minuti sei a Voya Rooftop, 55 Milano, Aria Club o Parco Sempione.',
    hubTipEn: 'Directly served by the M5 Purple Line (Tre Torri stop): reach Voya Rooftop, 55 Milano, Aria Club, or Sempione in 2-5 minutes.',
    routes: [
      {
        priorityRank: 1,
        name: '1. Just Me Milano',
        slug: 'just-me-milano',
        districtIt: 'Parco Sempione (Torre Branca)',
        districtEn: 'Parco Sempione (Torre Branca)',
        daytimeIt: '5 min con 1 fermata M5 Lilla (Domodossola) + 4 min a Torre Branca',
        daytimeEn: '5 min via 1 stop M5 Purple Line (Domodossola) + 4 min to Torre Branca',
        nightReturnIt: 'Notturna N25/N26 o 12 min a piedi da Sempione · Taxi / NCC: 5 min',
        nightReturnEn: 'Night Bus N25/N26 or 12 min walk from Sempione · Taxi / NCC: 5 min',
        taxiEstimate: '€12 - €15',
      },
      {
        priorityRank: 2,
        name: '2. Pineta Club Milano',
        slug: 'pineta-club-milano',
        districtIt: 'Corso Como / Via Messina 38',
        districtEn: 'Corso Como / Via Messina 38',
        daytimeIt: '5 min con M5 Lilla diretta (3 fermate fino a Cenisio)',
        daytimeEn: '5 min via direct M5 Purple Line (3 stops to Cenisio)',
        nightReturnIt: 'Filobus 90/91 h24 lungo la circolare · Taxi / NCC: 6 min',
        nightReturnEn: '24/7 Trolleybus 90/91 along the ring road · Taxi / NCC: 6 min',
        taxiEstimate: '€12 - €16',
      },
      {
        priorityRank: 3,
        name: '3. Aria Club Milano',
        slug: 'aria-club-milano',
        districtIt: 'San Siro (Piazzale dello Sport 14)',
        districtEn: 'San Siro (Piazzale dello Sport 14)',
        daytimeIt: '5 min con M5 Lilla diretta da Tre Torri a Lotto / San Siro Ippodromo',
        daytimeEn: '5 min via direct M5 Purple Line from Tre Torri to Lotto / San Siro',
        nightReturnIt: 'Bus Notturno NM1 da Lotto a Amendola/Buonarroti · Taxi / NCC: 6 min',
        nightReturnEn: 'Night Bus NM1 from Lotto to Amendola/Buonarroti · Taxi / NCC: 6 min',
        taxiEstimate: '€12 - €16',
      },
      {
        priorityRank: 4,
        name: '4. 55 Milano (FiftyFive)',
        slug: '55-milano',
        districtIt: 'Arco della Pace / Sempione',
        districtEn: 'Arco della Pace / Sempione',
        daytimeIt: '3 min con M5 Lilla (fermata Domodossola o Gerusalemme) o 10 min a piedi',
        daytimeEn: '3 min via M5 Purple Line (Domodossola / Gerusalemme) or 10 min walk',
        nightReturnIt: 'A piedi in 10 min o Filobus 90/91 h24 · Taxi / NCC: 4 min',
        nightReturnEn: '10 min walk or 24/7 Trolleybus 90/91 · Taxi / NCC: 4 min',
        taxiEstimate: '€12 - €14',
      },
      {
        priorityRank: 5,
        name: '5. Voya Rooftop Milan',
        slug: 'voya-rooftop-milan',
        districtIt: 'Isola / Portello (20° Piano)',
        districtEn: 'Isola / Portello (20th Floor)',
        daytimeIt: '2 min con 1 fermata M5 Lilla (Tre Torri -> Portello) o 8 min a piedi',
        daytimeEn: '2 min via 1 stop M5 Purple Line (Tre Torri -> Portello) or 8 min walk',
        nightReturnIt: 'A piedi in 8 min o Filobus 90/91 h24 · Taxi / NCC: 3 min',
        nightReturnEn: '8 min walk or 24/7 Trolleybus 90/91 · Taxi / NCC: 3 min',
        taxiEstimate: '€12 - €14',
      },
      {
        priorityRank: 6,
        name: '6. Repvblic Milano',
        slug: 'repvblic-milano',
        districtIt: 'Piazza della Repubblica',
        districtEn: 'Piazza della Repubblica',
        daytimeIt: '11 min con M5 Lilla (Garibaldi) + 1 fermata a Repubblica',
        daytimeEn: '11 min via M5 Purple Line (Garibaldi) + 1 stop to Repubblica',
        nightReturnIt: 'Notturna N25/N26 + NM1 · Taxi / NCC: 10 min',
        nightReturnEn: 'Night Bus N25/N26 + NM1 · Taxi / NCC: 10 min',
        taxiEstimate: '€15 - €20',
      },
    ],
  },
  airports: {
    labelIt: '8. Aeroporto Milano Linate (LIN) / Malpensa Express (Cadorna)',
    labelEn: '8. Milan Linate Airport (LIN) / Malpensa Express (Cadorna)',
    hubTipIt: 'Da Linate la nuova M4 Blu porta in centro (San Babila) in 12 minuti; il Malpensa Express arriva direttamente a Cadorna (a 400m da Just Me) e Garibaldi.',
    hubTipEn: 'From Linate the M4 Blue Line reaches downtown (San Babila) in 12 minutes; the Malpensa Express arrives directly at Cadorna (400m from Just Me) and Garibaldi.',
    routes: [
      {
        priorityRank: 1,
        name: '1. Just Me Milano',
        slug: 'just-me-milano',
        districtIt: 'Parco Sempione (Torre Branca)',
        districtEn: 'Parco Sempione (Torre Branca)',
        daytimeIt: 'Da Cadorna (Malpensa Express): 5 min a piedi · Da Linate: 18 min con M4 Blu (San Babila) + M1 Rossa (Cadorna)',
        daytimeEn: 'From Cadorna (Malpensa Express): 5 min walk · From Linate: 18 min via M4 Blue (San Babila) + M1 Red (Cadorna)',
        nightReturnIt: 'Bus Notturno NM1 + NM4 Linate · Taxi / Uber Black / NCC Concierge: 18 min da LIN',
        nightReturnEn: 'Night Bus NM1 + NM4 Linate · Taxi / Uber Black / NCC Concierge: 18 min from LIN',
        taxiEstimate: '€14 - €26',
      },
      {
        priorityRank: 2,
        name: '2. Pineta Club Milano',
        slug: 'pineta-club-milano',
        districtIt: 'Corso Como / Via Messina 38',
        districtEn: 'Corso Como / Via Messina 38',
        daytimeIt: 'Da Garibaldi (Malpensa Express): 4 min con M5 Lilla (Cenisio) · Da Linate: 22 min con M4 Blu + M1/M5',
        daytimeEn: 'From Garibaldi (Malpensa Express): 4 min via M5 Purple (Cenisio) · From Linate: 22 min via M4 Blue + M1/M5',
        nightReturnIt: 'Filobus 90/91 h24 + NM4 Linate · Taxi / NCC Concierge: 20 min da LIN',
        nightReturnEn: '24/7 Trolleybus 90/91 + NM4 Linate · Taxi / NCC Concierge: 20 min from LIN',
        taxiEstimate: '€16 - €28',
      },
      {
        priorityRank: 3,
        name: '3. Aria Club Milano',
        slug: 'aria-club-milano',
        districtIt: 'San Siro (Piazzale dello Sport 14)',
        districtEn: 'San Siro (Piazzale dello Sport 14)',
        daytimeIt: 'Da Cadorna: 9 min con M1 Rossa (Lotto) · Da Linate: 26 min con M4 Blu (San Babila) + M1 Rossa diretta (Lotto)',
        daytimeEn: 'From Cadorna: 9 min via M1 Red (Lotto) · From Linate: 26 min via M4 Blue (San Babila) + M1 Red (Lotto)',
        nightReturnIt: 'Bus Notturno NM1 da Lotto + NM4 · Taxi / NCC Concierge: 22 min da LIN',
        nightReturnEn: 'Night Bus NM1 from Lotto + NM4 · Taxi / NCC Concierge: 22 min from LIN',
        taxiEstimate: '€18 - €28',
      },
      {
        priorityRank: 4,
        name: '4. 55 Milano (FiftyFive)',
        slug: '55-milano',
        districtIt: 'Arco della Pace / Sempione',
        districtEn: 'Arco della Pace / Sempione',
        daytimeIt: 'Da Cadorna/Domodossola: 4 min · Da Linate: 22 min con M4 Blu + M1/M5 (Gerusalemme)',
        daytimeEn: 'From Cadorna/Domodossola: 4 min · From Linate: 22 min via M4 Blue + M1/M5 (Gerusalemme)',
        nightReturnIt: 'Filobus 90/91 h24 + NM4 · Taxi / NCC Concierge: 20 min da LIN',
        nightReturnEn: '24/7 Trolleybus 90/91 + NM4 · Taxi / NCC Concierge: 20 min from LIN',
        taxiEstimate: '€15 - €26',
      },
      {
        priorityRank: 5,
        name: '5. Voya Rooftop Milan',
        slug: 'voya-rooftop-milan',
        districtIt: 'Isola / Portello (20° Piano)',
        districtEn: 'Isola / Portello (20th Floor)',
        daytimeIt: 'Da Garibaldi/Cadorna: 8 min con M5 Lilla (Portello) · Da Linate: 24 min con M4 Blu + M1/M5',
        daytimeEn: 'From Garibaldi/Cadorna: 8 min via M5 Purple (Portello) · From Linate: 24 min via M4 Blue + M1/M5',
        nightReturnIt: 'Filobus 90/91 h24 + NM1/NM4 · Taxi / NCC Concierge: 20 min da LIN',
        nightReturnEn: '24/7 Trolleybus 90/91 + NM1/NM4 · Taxi / NCC Concierge: 20 min from LIN',
        taxiEstimate: '€16 - €28',
      },
      {
        priorityRank: 6,
        name: '6. Repvblic Milano',
        slug: 'repvblic-milano',
        districtIt: 'Piazza della Repubblica',
        districtEn: 'Piazza della Repubblica',
        daytimeIt: 'Da Garibaldi/Centrale: 4 min · Da Linate: 16 min con M4 Blu (San Babila/Tricolore) + collegamento a Repubblica',
        daytimeEn: 'From Garibaldi/Centrale: 4 min · From Linate: 16 min via M4 Blue (San Babila) + connection to Repubblica',
        nightReturnIt: 'Bus Notturno NM3 + NM4 Linate · Taxi / NCC Concierge: 15 min da LIN',
        nightReturnEn: 'Night Bus NM3 + NM4 Linate · Taxi / NCC Concierge: 15 min from LIN',
        taxiEstimate: '€14 - €24',
      },
    ],
  },
};

export function NeighborhoodCommutePlanner({ locale }: { locale: string }) {
  const isIt = locale === 'it';
  const lp = localePrefix(locale);

  const [originKey, setOriginKey] = useState<CommuteOriginKey>('duomo');
  const origin = COMMUTE_ORIGINS[originKey];

  return (
    <section
      id="neighborhood-commute-planner"
      aria-label={
        isIt
          ? 'Pianificatore Spostamenti Quartieri, Metro M1-M5 e Taxi Notturni verso i 6 Club Prioritari'
          : 'Milan Neighborhood Commute, Metro M1-M5 & Night Taxi Planner to Top 6 Priority Clubs'
      }
      className="my-14 rounded-2xl border border-champagne/30 bg-gradient-to-b from-[#16120b] to-[#0c0a07] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne/15 border border-champagne/40 text-champagne text-[11px] font-bold tracking-[0.22em] uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" />
            {isIt ? 'LOGISTICA NOTTURNA MILANO · METRO M1-M5 & NCC VIP' : 'MILAN NIGHTLIFE LOGISTICS · METRO M1-M5 & VIP CHAUFFEUR'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {isIt
              ? 'Calcolatore Spostamenti tra Quartieri, Metro & Taxi verso i 6 Club Prioritari'
              : 'Neighborhood Commute, Metro & Night Taxi Planner to Milan’s Top 6 Clubs'}
          </h2>
          <p className="text-white/65 text-sm sm:text-base mt-2 max-w-3xl">
            {isIt
              ? 'Seleziona il tuo punto di partenza a Milano per visualizzare istantaneamente tempi a piedi o in metropolitana diurna (fino alle 00:30), linee sostitutive notturne ATM (00:30 - 05:00) e tariffe stimate Taxi / Uber Black / NCC Concierge.'
              : 'Select your starting point in Milan to instantly view walking or daytime metro travel times (until 00:30), ATM night bus replacements (00:30 - 05:00), and estimated Taxi / Uber Black / Concierge Chauffeur fares.'}
          </p>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-champagne bg-champagne/10 border border-champagne/30 px-4 py-2.5 rounded-xl shrink-0">
          <Clock className="w-4 h-4 text-champagne shrink-0" />
          <span>
            {isIt
              ? 'Servizio Transfer NCC & Tavoli: +39 351 912 7047'
              : 'Chauffeur Transfer & VIP Tables: +39 351 912 7047'}
          </span>
        </div>
      </div>

      {/* Origin Selector Grid */}
      <div className="mb-8">
        <label className="block font-sans text-xs font-bold tracking-[0.18em] uppercase text-champagne mb-3">
          {isIt ? 'Seleziona il Tuo Punto di Partenza a Milano (8 Hub Principali)' : 'Select Your Starting Hub in Milan (8 Major Hubs)'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(COMMUTE_ORIGINS) as CommuteOriginKey[]).map((k) => {
            const item = COMMUTE_ORIGINS[k];
            const active = originKey === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setOriginKey(k)}
                className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  active
                    ? 'bg-[#25D366] text-[#050505] border-champagne font-bold shadow-[0_0_20px_rgba(201,168,106,0.3)]'
                    : 'bg-white/[0.03] text-white/80 border-white/10 hover:border-champagne/40'
                }`}
              >
                {isIt ? item.labelIt : item.labelEn}
              </button>
            );
          })}
        </div>
        <div className="mt-3 p-3.5 rounded-xl bg-champagne/[0.06] border border-champagne/25 text-xs text-white/80 flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-champagne shrink-0" />
          <span>{isIt ? origin.hubTipIt : origin.hubTipEn}</span>
        </div>
      </div>

      {/* 6 Priority Clubs Commute Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {origin.routes.map((route) => {
          const waTransferMsg = isIt
            ? `Ciao Concierge Nightlife Milan! Partiamo da "${origin.labelIt}" e vorremmo prenotare Tavolo VIP + eventuale Transfer NCC per ${route.name}.`
            : `Hi Nightlife Milan Concierge! We are departing from "${origin.labelEn}" and would like to book a VIP Table + optional Chauffeur Transfer to ${route.name}.`;

          return (
            <div
              key={route.slug}
              className="rounded-xl border border-white/10 bg-black/50 p-5 flex flex-col justify-between hover:border-champagne/45 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-champagne/20 border border-champagne/40 text-champagne text-[10px] font-bold uppercase tracking-wider">
                    {isIt ? `#${route.priorityRank} Club Prioritario` : `#${route.priorityRank} Priority Club`}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-white text-xs font-mono font-bold">
                    Taxi {route.taxiEstimate}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-0.5">{route.name}</h3>
                <p className="text-[11px] text-champagne/85 mb-4">
                  {isIt ? route.districtIt : route.districtEn}
                </p>

                <div className="space-y-3 text-xs border-t border-white/10 pt-3.5 mb-5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                      {isIt ? 'A Piedi / Metro Diurna (fino alle 00:30)' : 'Walk / Daytime Metro (until 00:30)'}
                    </span>
                    <p className="text-white/85 leading-relaxed">
                      {isIt ? route.daytimeIt : route.daytimeEn}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#EAE3D5] block mb-0.5">
                      {isIt ? 'Rientro Notturno (00:30 - 05:00) & Taxi' : 'Night Return (00:30 - 05:00) & Taxi'}
                    </span>
                    <p className="text-white/75 leading-relaxed">
                      {isIt ? route.nightReturnIt : route.nightReturnEn} ({route.taxiEstimate})
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <Link
                  href={`${lp}/clubs/${route.slug}`}
                  className="text-xs font-semibold text-white/85 hover:text-champagne transition-colors"
                >
                  {isIt ? 'Scheda Club →' : 'Club Profile →'}
                </Link>
                <a
                  href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(waTransferMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-[#050505] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{isIt ? 'Tavolo / NCC' : 'Table / NCC'}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function VelvetRopeChecklist({ locale = 'it' }: { locale?: string }) {
  const isIt = locale === 'it';
  const items = [
    {
      titleIt: '1. Documento Fisico Originale (18+ / 21+)',
      titleEn: '1. Physical Original ID (18+ / 21+)',
      descIt: 'Carta d’identità, passaporto o patente in originale. Nei top club come Just Me, Pineta e Voya Rooftop è preferita clientela 21+.',
      descEn: 'Original national ID, passport, or driving license. Flagship clubs like Just Me, Pineta, and Voya Rooftop prefer a 21+ crowd.',
    },
    {
      titleIt: '2. Camicia, Blazer o Smart Total Black',
      titleEn: '2. Collared Shirt, Blazer, or Smart Total Black',
      descIt: 'Evita tute, borselli a tracolla, cappellini, felpe sportive e maglie da calcio. Scarpa in pelle o sneaker minimal immacolata.',
      descEn: 'Avoid tracksuits, crossbody pouches, caps, athletic hoodies, and football jerseys. Wear leather shoes or immaculate minimal sneakers.',
    },
    {
      titleIt: '3. Orario d’Ingresso Strategico (19:30 o entro le 00:15)',
      titleEn: '3. Strategic Arrival Window (19:30 or before 00:15)',
      descIt: 'Entra dalle 19:30 per il Royal Aperitivo oppure entro mezzanotte e un quarto per la lista serale prima del picco di affluenza.',
      descEn: 'Arrive at 19:30 for the Royal Aperitivo or before 00:15 for the night guestlist ahead of peak door congestion.',
    },
    {
      titleIt: '4. Accredito Nominale o Tavolo VIP Riservato',
      titleEn: '4. Nominal Accreditation or Reserved VIP Table',
      descIt: 'I gruppi di soli uomini o numerosi superano la selezione con certezza prenotando un Tavolo VIP o Royal Aperitivo tramite WhatsApp (+39 351 912 7047).',
      descEn: 'All-male or large groups pass selection reliably by reserving a VIP Table or Royal Aperitivo via WhatsApp (+39 351 912 7047).',
    },
  ];

  return (
    <section
      aria-label={isIt ? 'Checklist Selezione alla Porta Milano' : 'Milan Velvet Rope Door Selection Checklist'}
      className="my-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <div className="mb-6">
        <p className="font-sans text-champagne text-[10px] font-bold tracking-[0.28em] uppercase mb-2">
          {isIt ? 'PROTOCOLLO VELVET ROPE · 4 REGOLE D’ORO' : 'VELVET ROPE PROTOCOL · 4 GOLDEN RULES'}
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          {isIt
            ? 'Checklist Anti-Rimbalzo prima di Arrivare al Locale'
            : 'Pre-Arrival Velvet Rope Checklist'}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.titleEn}
            className="p-4 rounded-xl border border-white/10 bg-black/40 flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-champagne shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif text-base font-bold text-white mb-1">
                {isIt ? item.titleIt : item.titleEn}
              </h4>
              <p className="text-xs text-white/65 leading-relaxed">
                {isIt ? item.descIt : item.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



