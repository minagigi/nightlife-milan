'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
    venuesIt: '6. Repvblic · Play Club · Volt Club · Magazzini Generali · Hollywood · The Club',
    venuesEn: '6. Repvblic · Play Club · Volt Club · Magazzini Generali · Hollywood · The Club',
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
      className="my-14 rounded-2xl border border-champagne/30 bg-gradient-to-b from-[#1a150c] to-[#0d0b07] p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
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
                        ? 'bg-champagne text-black border-champagne font-bold shadow-[0_0_20px_rgba(201,168,106,0.3)]'
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
              className="w-full accent-[#C9A86A] cursor-pointer h-2 bg-white/15 rounded-lg"
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
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-champagne text-black font-sans font-bold text-xs sm:text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors shadow-[0_0_30px_rgba(201,168,106,0.35)]"
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
        rank: '#6 Priority',
        name: 'Repvblic Milano',
        slug: 'repvblic-milano',
        zone: 'Piazza Repubblica / Mecenate',
        music: 'Dirty Monday · Hip-Hop & House',
        formulaIt: 'Serata 23:30 · Tavoli Pista da 300€ · Privé da 500€',
        formulaEn: 'Club 23:30 · Dancefloor Tables from €300 · Privé from €500',
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
        zone: 'Isola / Portello — 20° Piano',
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
                  ? 'bg-champagne text-black shadow-[0_0_20px_rgba(201,168,106,0.35)]'
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
      className="my-14 rounded-2xl border border-white/10 bg-[#100d08] p-6 sm:p-10"
    >
      <div className="mb-8">
        <p className="font-sans text-champagne text-[10px] font-bold tracking-[0.28em] uppercase mb-2">
          {isIt ? 'TRASPARENZA TOTALE · SCEGLI LA FORMULA GIUSTA' : 'TOTAL TRANSPARENCY · CHOOSE THE RIGHT FORMULA'}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
          {isIt
            ? 'Le 5 Formule d’Ingresso a Milano: Lista, Aperitivo, Cena Cantata o Tavolo VIP?'
            : 'The 5 Milan Entry Formulas: Guest List, Aperitivo, Dinner Show or VIP Table?'}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="border-b border-champagne/30 text-[11px] font-bold uppercase tracking-wider text-champagne">
              <th className="py-3.5 pr-4">{isIt ? 'Formula' : 'Formula'}</th>
              <th className="py-3.5 px-4">{isIt ? 'Orario' : 'Hours'}</th>
              <th className="py-3.5 px-4">{isIt ? 'Fascia Prezzo' : 'Price Range'}</th>
              <th className="py-3.5 px-4">{isIt ? 'Fila & Selezione' : 'Queue & Door'}</th>
              <th className="py-3.5 px-4">{isIt ? 'Posto a Sedere' : 'Seating'}</th>
              <th className="py-3.5 pl-4">{isIt ? 'Ideale Per' : 'Best For'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-xs sm:text-sm text-white/80">
            {formulas.map((f) => (
              <tr key={f.nameEn} className="hover:bg-white/[0.02]">
                <td className="py-4 pr-4 font-serif font-bold text-white text-base">
                  {isIt ? f.nameIt : f.nameEn}
                </td>
                <td className="py-4 px-4 text-champagne font-mono text-xs whitespace-nowrap">{f.time}</td>
                <td className="py-4 px-4 font-semibold text-white whitespace-nowrap">
                  {isIt ? f.priceIt : f.priceEn}
                </td>
                <td className="py-4 px-4 text-white/70">{isIt ? f.queueIt : f.queueEn}</td>
                <td className="py-4 px-4 text-white/70">{isIt ? f.seatingIt : f.seatingEn}</td>
                <td className="py-4 pl-4 text-white/60 text-xs leading-relaxed">
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
      badgeIt: '#1 Priorità Assoluta · Design Roberto Cavalli',
      badgeEn: '#1 Top Priority · Roberto Cavalli Design',
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
      zone: 'Isola / Portello — 20° Piano (Via Achille Papa 30)',
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
      name: 'Repvblic Milano',
      slug: 'repvblic-milano',
      zone: 'Piazza della Repubblica / Mecenate',
      image: '/images/repvblic-milano.webp',
      badgeIt: '#6 Priorità · Design Club, House & Dirty Monday',
      badgeEn: '#6 Priority · Design Club, House & Dirty Monday',
      descIt:
        'Impianto luci e audio d’avanguardia, pubblico fashion internazionale e la celebre serata Dirty Monday insieme ai grandi weekend House, Hip-Hop e Commercial. Tavoli Pista e Privé da 300€.',
      descEn:
        'Cutting-edge lighting and sound architecture, international fashion crowd, and the famous Dirty Monday alongside high-energy House, Hip-Hop, and Commercial weekends. Dancefloor and Privé tables from €300.',
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
            className="group rounded-2xl overflow-hidden border border-white/10 bg-[#15110b] hover:border-champagne/50 transition-all flex flex-col"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={club.image}
                alt={club.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15110b] via-black/30 to-transparent" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-champagne text-black text-[10px] font-extrabold tracking-wider uppercase">
                {isIt ? club.badgeIt : club.badgeEn}
              </div>
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
                  className="ml-auto px-4 py-2 rounded-lg bg-champagne text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
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
      className="my-14 rounded-2xl border border-champagne/35 bg-gradient-to-b from-[#17130b] via-[#100d08] to-[#0a0805] p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.75)]"
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
                        ? 'bg-champagne text-black border-champagne font-bold shadow-[0_0_20px_rgba(201,168,106,0.3)]'
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
              className="w-full accent-[#C9A86A] cursor-pointer h-2 bg-white/15 rounded-lg"
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
            <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 mb-6">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  {isIt ? 'Regola Dress Code Post-Partita' : 'Mandatory Post-Match Dress Code Rule'}
                </span>
              </div>
              <p className="text-xs text-amber-100/90 leading-relaxed">
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
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-champagne text-black font-sans font-bold text-xs sm:text-sm tracking-[0.14em] uppercase hover:bg-white transition-colors shadow-[0_0_30px_rgba(201,168,106,0.35)]"
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
                  className="ml-auto px-3 py-1.5 rounded-lg bg-champagne text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
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

