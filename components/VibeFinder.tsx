'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Link from '@/components/LocalizedLink';
import {
  Zap,
  Sparkles,
  Martini,
  Ticket,
  Wallet,
  Crown,
  MapPin,
  RotateCcw,
  Trophy,
  PartyPopper,
  Music2,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { CONTACT } from '@/config/contact';

type Step = 1 | 2 | 3 | 4;

interface PriorityClubRec {
  rank: number;
  id: string;
  slug: string;
  name: string;
  zoneLabel: { en: string; it: string };
  dressCode: { en: string; it: string };
  priceInfo: { en: string; it: string };
  highlight: { en: string; it: string };
  bestForMoods: string[];
  bestForBudgets: string[];
  bestForZones: string[];
  hubHref: string;
  hubLabel: { en: string; it: string };
}

const SIX_PRIORITY_CLUBS: PriorityClubRec[] = [
  {
    rank: 1,
    id: 'v-justme',
    slug: 'just-me-milano',
    name: 'Just Me Milano',
    zoneLabel: {
      en: 'Parco Sempione · Under Torre Branca (Viale Luigi Camoens 2)',
      it: 'Parco Sempione · Sotto la Torre Branca (Viale Luigi Camoens 2)',
    },
    dressCode: {
      en: 'Strictly Elegant — Fashion-forward',
      it: 'Rigorosamente Elegante — Solo abbigliamento curato',
    },
    priceInfo: {
      en: 'Royal Aperitivo €20–30 · VIP Tables €350–€5,000+ (Open 7/7)',
      it: 'Royal Aperitivo 20–30€ · Tavoli VIP 350–5.000€+ (Aperto 7/7)',
    },
    highlight: {
      en: '#1 Priority Club in Milan by Italo Rota. Open 7 days a week with Royal Aperitivo, panoramic Torre Branca elevator, and international VIP console tables.',
      it: 'Club Priorità #1 a Milano firmato Italo Rota. Aperto 7 giorni su 7 con Royal Aperitivo, salita panoramica Torre Branca e tavoli VIP console internazionali.',
    },
    bestForMoods: ['glamour', 'vip-bottle', 'football', 'chill', 'graduation'],
    bestForBudgets: ['vip', 'standard', 'free'],
    bestForZones: ['sempione', 'brera', 'corsocomo'],
    hubHref: '/vip-tables',
    hubLabel: { en: 'VIP Tables & Bottle Service', it: 'Tavoli VIP & Bottle Service' },
  },
  {
    rank: 2,
    id: 'v-pineta',
    slug: 'pineta-club-milano',
    name: 'Pineta Club',
    zoneLabel: {
      en: 'Corso Como / Monumentale · Via Messina 38',
      it: 'Corso Como / Monumentale · Via Messina 38',
    },
    dressCode: {
      en: 'Chic & Fashion — Shirt / Smart outfit',
      it: 'Chic & Fashion — Camicia / Outfit curato',
    },
    priceInfo: {
      en: 'Singing Aperitivo €15–25 · VIP Tables €250–€600',
      it: 'Aperitivo Cantato 15–25€ · Tavoli VIP 250–600€',
    },
    highlight: {
      en: '#2 Priority Club: Corso Como’s legendary Singing Aperitivo from 19:30 and Noche De Perreo Reggaeton & Commercial party until 05:00.',
      it: 'Club Priorità #2: il celebre Aperitivo Cantato di Corso Como dalle 19:30 e i format Noche De Perreo Reggaeton & Commerciale fino alle 05:00.',
    },
    bestForMoods: ['aperitivo-cantato', 'glamour', 'graduation', 'techno'],
    bestForBudgets: ['free', 'standard', 'vip'],
    bestForZones: ['corsocomo', 'isola'],
    hubHref: '/private-parties',
    hubLabel: { en: 'Singing Aperitivo & Parties', it: 'Aperitivo Cantato & Feste' },
  },
  {
    rank: 3,
    id: 'v-aria',
    slug: 'aria-club-milano',
    name: 'Aria Club Milano',
    zoneLabel: {
      en: 'San Siro · Piazzale dello Sport 14 (150m from Stadium)',
      it: 'San Siro · Piazzale dello Sport 14 (a 150m dallo Stadio)',
    },
    dressCode: {
      en: 'Smart Elegant — No sportswear',
      it: 'Smart Elegant — No abbigliamento sportivo',
    },
    priceInfo: {
      en: 'Aperitivo €15–20 · Dancefloor & Privé DJ Tables €250–€600',
      it: 'Aperitivo 15–20€ · Tavoli Pista & Privé DJ 250–600€',
    },
    highlight: {
      en: '#3 Priority Club: 150 meters on foot from San Siro Stadium gates. The #1 destination for Inter & AC Milan post-match Third Half, concerts, and open-air garden nights.',
      it: 'Club Priorità #3: a 150 metri a piedi dai cancelli di San Siro. Meta n°1 per il Dopo-Partita di Inter e Milan, post-concerto e serate in giardino.',
    },
    bestForMoods: ['football', 'glamour', 'graduation', 'vip-bottle'],
    bestForBudgets: ['standard', 'vip', 'free'],
    bestForZones: ['sansiro', 'sempione'],
    hubHref: '/football-afterparties',
    hubLabel: { en: 'San Siro Post-Match Hub', it: 'Hub Dopo-Partita San Siro' },
  },
  {
    rank: 4,
    id: 'v-55milano',
    slug: '55-milano',
    name: '55 Milano',
    zoneLabel: {
      en: 'Sempione / CityLife · Via Piero della Francesca 55',
      it: 'Sempione / CityLife · Via Piero della Francesca 55',
    },
    dressCode: {
      en: 'Smart Casual & Chic',
      it: 'Smart Casual & Chic',
    },
    priceInfo: {
      en: 'Imperial Apericena €20 · Graduation & Birthday Tables from €200',
      it: 'Apericena Imperiale 20€ · Tavoli Laurea & Compleanno da 200€',
    },
    highlight: {
      en: '#4 Priority Club: 1,000 sqm converted railway depot with massive terrace, live Dinner Show, and Milan’s #1 setup for Graduation, 18th & Birthday celebrations.',
      it: 'Club Priorità #4: 1.000 mq di ex deposito storico con grande terrazza, Dinner Show e format n°1 a Milano per Feste di Laurea, 18 Anni e Compleanni.',
    },
    bestForMoods: ['graduation', 'aperitivo-cantato', 'chill', 'football'],
    bestForBudgets: ['free', 'standard', 'vip'],
    bestForZones: ['sempione', 'sansiro', 'brera'],
    hubHref: '/private-parties',
    hubLabel: { en: 'Graduation & Birthday Packages', it: 'Pacchetti Laurea & Compleanno' },
  },
  {
    rank: 5,
    id: 'v-voya',
    slug: 'voya-rooftop-milan',
    name: 'Voya Rooftop',
    zoneLabel: {
      en: 'Portello / Isola · Via Achille Papa 30 (20th Floor)',
      it: 'Portello / Isola · Via Achille Papa 30 (20° Piano)',
    },
    dressCode: {
      en: 'Smart Elegant — Panoramic Sky Lounge',
      it: 'Smart Elegant — Sky Lounge Panoramico',
    },
    priceInfo: {
      en: 'Skyline Aperitivo €20 · Window VIP Tables €250–€500',
      it: 'Aperitivo Skyline 20€ · Tavoli VIP Vetrata 250–500€',
    },
    highlight: {
      en: '#5 Priority Club: 20th-floor 360° glass sky lounge overlooking the Milan skyline. Sunset cocktails that seamlessly turn into a high-altitude DJ set.',
      it: 'Club Priorità #5: sky lounge panoramico al 20° piano con vetrate a 360° sullo skyline di Milano. Dal tramonto al DJ set ad alta quota.',
    },
    bestForMoods: ['chill', 'glamour', 'football', 'graduation'],
    bestForBudgets: ['standard', 'vip', 'free'],
    bestForZones: ['isola', 'sansiro', 'corsocomo'],
    hubHref: '/rooftops',
    hubLabel: { en: 'Panoramic Rooftops Guide', it: 'Guida Rooftop Panoramici' },
  },
  {
    rank: 6,
    id: 'v-repvblic',
    slug: 'repvblic-milano',
    name: 'Repvblic Milano',
    zoneLabel: {
      en: 'Ripamonti / Mecenate · Via Giovanni Fantoli 9',
      it: 'Ripamonti / Mecenate · Via Giovanni Fantoli 9',
    },
    dressCode: {
      en: 'Trendy & Urban Edgy',
      it: 'Trendy & Urban Audace',
    },
    priceInfo: {
      en: 'Guest List €15–20 · VIP Bottle Tables €250–€500',
      it: 'Lista Ingresso 15–20€ · Tavoli Bottiglia VIP 250–500€',
    },
    highlight: {
      en: '#6 Priority Club: Home of the legendary Dirty Monday (Hip-Hop, Trap, Afrobeats & House) and high-energy weekend club nights for fashion & music insiders.',
      it: 'Club Priorità #6: casa del leggendario Dirty Monday (Hip-Hop, Trap, Afrobeats & House) e dei weekend ad alta energia per gli amanti del clubbing.',
    },
    bestForMoods: ['techno', 'vip-bottle', 'glamour'],
    bestForBudgets: ['standard', 'vip', 'free'],
    bestForZones: ['navigli', 'corsocomo', 'isola'],
    hubHref: '/bottle-prices',
    hubLabel: { en: 'Bottle Prices & Dirty Monday', it: 'Listino Bottiglie & Dirty Monday' },
  },
];

export default function VibeFinder({ lang }: { lang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isIt = lang === 'it';
  const typedLang = isIt ? 'it' : 'en';
  const langPrefix = lang === 'en' ? '' : `/${lang}`;

  const MOODS = [
    {
      id: 'glamour',
      label: isIt ? 'VIP Glamour & Bottle Service' : 'VIP Glamour & Bottle Service',
      sub: isIt ? 'Just Me, Pineta, Voya 20° Piano' : 'Just Me, Pineta, Voya 20th Floor',
      icon: Sparkles,
    },
    {
      id: 'football',
      label: isIt ? 'Dopo-Partita San Siro (Inter/Milan)' : 'San Siro Post-Match (Inter/Milan)',
      sub: isIt ? 'Aria Club a 150m, Just Me, Voya' : 'Aria Club 150m, Just Me, Voya',
      icon: Trophy,
    },
    {
      id: 'graduation',
      label: isIt ? 'Festa di Laurea / Compleanno / 18°' : 'Graduation / Birthday / Private Party',
      sub: isIt ? '55 Milano, Pineta, Aria, Voya' : '55 Milano, Pineta, Aria, Voya',
      icon: PartyPopper,
    },
    {
      id: 'aperitivo-cantato',
      label: isIt ? 'Aperitivo Cantato & Dinner Show' : 'Singing Aperitivo & Dinner Show',
      sub: isIt ? 'Pineta Club, 55 Milano, Just Me' : 'Pineta Club, 55 Milano, Just Me',
      icon: Music2,
    },
    {
      id: 'chill',
      label: isIt ? 'Rooftop Aperitivo Vista Skyline' : 'Skyline Rooftop Aperitivo',
      sub: isIt ? 'Voya Rooftop 20° Piano, Duomo 21' : 'Voya Rooftop 20th Floor, Duomo 21',
      icon: Martini,
    },
    {
      id: 'techno',
      label: isIt ? 'Hip-Hop, Reggaeton, House & Club' : 'Hip-Hop, Reggaeton, House & Club',
      sub: isIt ? 'Repvblic Dirty Monday, Pineta, Aria' : 'Repvblic Dirty Monday, Pineta, Aria',
      icon: Zap,
    },
  ];

  const BUDGETS = [
    {
      id: 'free',
      label: isIt ? 'Lista QR / Royal Aperitivo (15–30€)' : 'QR Guest List / Royal Aperitivo (€15–30)',
      sub: isIt ? 'Ingresso in lista con drink e buffet reale' : 'Accredited entry with drink & buffet',
      icon: Ticket,
    },
    {
      id: 'standard',
      label: isIt ? 'Tavolo Aperitivo / Base (200–350€)' : 'Aperitivo / Base Table (€200–350)',
      sub: isIt ? 'Tavolo riservato per gruppi, lauree e compleanni' : 'Reserved table for groups & birthdays',
      icon: Wallet,
    },
    {
      id: 'vip',
      label: isIt ? 'Tavolo VIP Pista / Privé (350–1.500€+)' : 'VIP Dancefloor / Privé Table (€350–1,500+)',
      sub: isIt ? 'Salta-fila immediato, bottle service e console' : 'Fast-track entry, bottle service & console',
      icon: Crown,
    },
  ];

  const ZONES = [
    {
      id: 'sempione',
      label: isIt ? 'Parco Sempione & CityLife' : 'Parco Sempione & CityLife',
      sub: 'Just Me · 55 Milano',
      icon: MapPin,
    },
    {
      id: 'corsocomo',
      label: isIt ? 'Corso Como & Garibaldi' : 'Corso Como & Garibaldi',
      sub: 'Pineta Club · 11 Clubroom',
      icon: MapPin,
    },
    {
      id: 'sansiro',
      label: isIt ? 'San Siro & Stadio (150m)' : 'San Siro & Stadium (150m)',
      sub: 'Aria Club Milano',
      icon: MapPin,
    },
    {
      id: 'isola',
      label: isIt ? 'Portello / Isola 20° Piano' : 'Portello / Isola 20th Floor',
      sub: 'Voya Rooftop',
      icon: MapPin,
    },
    {
      id: 'navigli',
      label: isIt ? 'Ripamonti / Mecenate / Sud' : 'Ripamonti / Mecenate / South',
      sub: 'Repvblic Milano',
      icon: MapPin,
    },
  ];

  const [step, setStep] = useState<Step>(1);
  const [selections, setSelections] = useState({
    mood: '',
    budget: '',
    zone: '',
  });
  const [showAllSix, setShowAllSix] = useState(false);

  useEffect(() => {
    const mood = searchParams.get('mood');
    const budget = searchParams.get('budget');
    const zone = searchParams.get('zone');

    if (mood || budget || zone) {
      setTimeout(() => {
        setSelections({
          mood: mood || '',
          budget: budget || '',
          zone: zone || '',
        });
        setStep(4);
      }, 0);
    }
  }, [searchParams]);

  const handleSelect = (category: 'mood' | 'budget' | 'zone', value: string) => {
    const newSelections = { ...selections, [category]: value };
    setSelections(newSelections);

    if (category === 'mood') setStep(2);
    if (category === 'budget') setStep(3);
    if (category === 'zone') {
      setStep(4);
      applyFilters(newSelections);
    }
  };

  const applyFilters = (currentSelections: typeof selections) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentSelections.mood) params.set('mood', currentSelections.mood);
    else params.delete('mood');

    if (currentSelections.budget) params.set('budget', currentSelections.budget);
    else params.delete('budget');

    if (currentSelections.zone) params.set('zone', currentSelections.zone);
    else params.delete('zone');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setSelections({ mood: '', budget: '', zone: '' });
    setShowAllSix(false);
    setStep(1);

    const params = new URLSearchParams(searchParams.toString());
    params.delete('mood');
    params.delete('budget');
    params.delete('zone');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Compute recommended clubs, always keeping the 6 Priority Clubs in top priority order
  const getRecommendedPriorityClubs = (): PriorityClubRec[] => {
    if (showAllSix) return SIX_PRIORITY_CLUBS;

    const scored = SIX_PRIORITY_CLUBS.map((club) => {
      let matchPoints = 0;
      if (selections.mood && club.bestForMoods.includes(selections.mood)) matchPoints += 3;
      if (selections.zone && club.bestForZones.includes(selections.zone)) matchPoints += 2;
      if (selections.budget && club.bestForBudgets.includes(selections.budget)) matchPoints += 1;
      return { club, matchPoints };
    });

    // Sort by match score, breaking ties strictly by official priority rank (1 -> 6)
    scored.sort((a, b) => {
      if (b.matchPoints !== a.matchPoints) return b.matchPoints - a.matchPoints;
      return a.club.rank - b.club.rank;
    });

    return scored.map((item) => item.club);
  };

  const recommendedClubs = getRecommendedPriorityClubs();

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 text-center">
              {isIt ? 'Qual è la tua serata ideale a Milano?' : "What's your occasion or vibe tonight?"}
            </h3>
            <p className="text-center text-white/50 text-xs sm:text-sm mb-6">
              {isIt
                ? 'Seleziona l’occasione per scoprire i 6 Club Prioritari perfetti per il tuo gruppo'
                : 'Select your occasion to match with our Top 6 Priority Partner Clubs'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {MOODS.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.id}
                    onClick={() => handleSelect('mood', mood.id)}
                    className="group flex flex-col items-start text-left p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-champagne/10 hover:border-champagne/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(242,227,198,0.15)]"
                  >
                    <Icon className="w-6 h-6 text-champagne mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white font-serif text-base font-medium tracking-wide group-hover:text-champagne">
                      {mood.label}
                    </span>
                    <span className="text-white/50 text-xs mt-1">{mood.sub}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 text-center">
              {isIt ? 'Scegli la formula e il budget' : 'Select your formula & budget'}
            </h3>
            <p className="text-center text-white/50 text-xs sm:text-sm mb-6">
              {isIt
                ? 'Tutti i tavoli includono 100% credito bottiglie e ingresso salta-fila immediato'
                : 'All VIP tables include 100% bottle credit and immediate fast-track entry'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {BUDGETS.map((budget) => {
                const Icon = budget.icon;
                return (
                  <button
                    key={budget.id}
                    onClick={() => handleSelect('budget', budget.id)}
                    className="group flex flex-col items-center text-center justify-center p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-champagne/10 hover:border-champagne/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(242,227,198,0.15)]"
                  >
                    <Icon className="w-8 h-8 text-champagne mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white font-medium tracking-wide text-sm sm:text-base">
                      {budget.label}
                    </span>
                    <span className="text-white/50 text-xs mt-1.5">{budget.sub}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-2 text-center">
              {isIt ? 'In quale zona di Milano preferisci uscire?' : 'Which Milan district do you prefer?'}
            </h3>
            <p className="text-center text-white/50 text-xs sm:text-sm mb-6">
              {isIt
                ? 'Dal Parco Sempione e Corso Como fino a San Siro (150m dallo Stadio) e Isola 20° Piano'
                : 'From Parco Sempione & Corso Como to San Siro (150m from Stadium) and Isola 20th Floor'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {ZONES.map((zone) => {
                const Icon = zone.icon;
                return (
                  <button
                    key={zone.id}
                    onClick={() => handleSelect('zone', zone.id)}
                    className="group flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-champagne/10 hover:border-champagne/50 transition-all duration-300 text-center"
                  >
                    <Icon className="w-6 h-6 text-champagne mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white font-medium tracking-wide text-xs sm:text-sm">
                      {zone.label}
                    </span>
                    <span className="text-champagne/75 text-[11px] mt-1">{zone.sub}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-champagne text-xs uppercase tracking-widest font-bold mb-1">
                  <Sparkles className="w-4 h-4" />
                  {isIt ? 'I 6 Club Prioritari Consigliati per Te' : 'Your Top 6 Priority Club Recommendations'}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-white">
                  {isIt ? 'La Selezione Ufficiale del Concierge' : 'Official Concierge Selection'}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {selections.mood && (
                  <span className="px-3 py-1 rounded-full border border-champagne/30 bg-champagne/10 text-champagne text-xs font-medium">
                    {MOODS.find((m) => m.id === selections.mood)?.label}
                  </span>
                )}
                {selections.budget && (
                  <span className="px-3 py-1 rounded-full border border-champagne/30 bg-champagne/10 text-champagne text-xs font-medium">
                    {BUDGETS.find((b) => b.id === selections.budget)?.label}
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 text-white/60 hover:text-white text-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {isIt ? 'Ricomincia' : 'Reset'}
                </button>
              </div>
            </div>

            {/* Cards of the 6 Priority Clubs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {recommendedClubs.map((club) => {
                const waText = encodeURIComponent(
                  isIt
                    ? `Ciao Concierge Nightlife Milan! Ho usato il VibeFinder e vorrei prenotare da ${club.name} (Priorità #${club.rank}). Potete inviarmi prezzi tavoli e lista?`
                    : `Hi Nightlife Milan Concierge! I used VibeFinder and would like to book at ${club.name} (Priority #${club.rank}). Can you send me table prices and guest list info?`
                );
                return (
                  <div
                    key={club.id}
                    className="flex flex-col justify-between p-5 rounded-xl border border-champagne/25 bg-black/40 hover:border-champagne/60 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-champagne/15 text-champagne text-[11px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {isIt ? `Priorità #${club.rank}` : `#${club.rank} Priority`}
                        </span>
                        <Link
                          href={`${langPrefix}${club.hubHref}`}
                          className="text-[11px] text-white/50 hover:text-champagne underline"
                        >
                          {club.hubLabel[typedLang]}
                        </Link>
                      </div>

                      <Link href={`${langPrefix}/clubs/${club.slug}`}>
                        <h4 className="font-serif text-xl text-white hover:text-champagne transition-colors">
                          {club.rank}. {club.name}
                        </h4>
                      </Link>
                      <p className="text-xs text-white/55 mt-0.5">{club.zoneLabel[typedLang]}</p>

                      <p className="text-xs text-white/80 mt-3 leading-relaxed">{club.highlight[typedLang]}</p>

                      <div className="mt-3 pt-3 border-t border-white/10 space-y-1 text-[11px]">
                        <p className="text-champagne font-medium">{club.priceInfo[typedLang]}</p>
                        <p className="text-white/50">
                          <strong className="text-white/70">Dress Code:</strong> {club.dressCode[typedLang]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 flex items-center gap-2.5">
                      <a
                        href={`${CONTACT.whatsapp.link}?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-champagne text-black font-bold text-xs uppercase tracking-wider hover:bg-champagne/90 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        {isIt ? 'Prenota WhatsApp' : 'Book on WhatsApp'}
                      </a>
                      <Link
                        href={`${langPrefix}/clubs/${club.slug}`}
                        className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-lg border border-white/15 text-white hover:border-champagne hover:text-champagne text-xs uppercase tracking-wider transition-colors"
                      >
                        {isIt ? 'Scheda Club' : 'Club Guide'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Concierge Bar */}
            <div className="p-4 rounded-xl bg-champagne/10 border border-champagne/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-white/80 text-center sm:text-left">
                <strong className="text-champagne">
                  {isIt ? 'Assistenza Diretta Concierge 24/7:' : '24/7 Direct VIP Concierge Desk:'}
                </strong>{' '}
                WhatsApp <span className="text-white font-semibold">+39 351 912 7047</span> ·{' '}
                <a href="mailto:concierge@nightlifemilan.com" className="underline text-champagne">
                  concierge@nightlifemilan.com
                </a>
              </div>
              <a
                href={`${CONTACT.whatsapp.link}?text=${encodeURIComponent(
                  isIt
                    ? 'Ciao! Vorrei un consiglio personalizzato sui 6 Club Prioritari di Milano per stasera.'
                    : 'Hi! I would like a custom recommendation among the 6 Priority Clubs in Milan for tonight.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-champagne text-black font-bold uppercase tracking-wider whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                +39 351 912 7047
              </a>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#1C1810]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Progress Bar */}
      {step < 4 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
          <motion.div
            className="h-full bg-champagne"
            initial={{ width: '33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Step Indicators */}
      {step < 4 && (
        <div className="flex justify-center items-center space-x-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  s === step ? 'bg-champagne' : s < step ? 'bg-champagne/50' : 'bg-white/20'
                }`}
              />
              {s < 3 && (
                <div className={`w-10 h-[1px] mx-2 ${s < step ? 'bg-champagne/50' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="min-h-[260px] flex items-center justify-center">
        <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
      </div>
    </div>
  );
}
