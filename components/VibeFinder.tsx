'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, Sparkles, Martini, 
  Ticket, Wallet, Crown, 
  MapPin, RotateCcw
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4; // 4 is completed

const MOODS = [
  { id: 'techno', label: 'Techno / Underground', icon: Zap },
  { id: 'glamour', label: 'Glamour / Chic', icon: Sparkles },
  { id: 'chill', label: 'Chill / Aperitivo', icon: Martini },
];

const BUDGETS = [
  { id: 'free', label: 'Free Entry', icon: Ticket },
  { id: 'standard', label: 'Standard', icon: Wallet },
  { id: 'vip', label: 'VIP / Table', icon: Crown },
];

const ZONES = [
  { id: 'brera', label: 'Brera', icon: MapPin },
  { id: 'navigli', label: 'Navigli', icon: MapPin },
  { id: 'isola', label: 'Isola', icon: MapPin },
  { id: 'corsocomo', label: 'Corso Como', icon: MapPin },
];

export default function VibeFinder({ lang }: { lang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>(1);
  const [selections, setSelections] = useState({
    mood: '',
    budget: '',
    zone: ''
  });

  // Initialize from URL params if present
  useEffect(() => {
    const mood = searchParams.get('mood');
    const budget = searchParams.get('budget');
    const zone = searchParams.get('zone');
    
    if (mood || budget || zone) {
      // Use setTimeout to avoid synchronous setState during render/effect
      setTimeout(() => {
        setSelections({
          mood: mood || '',
          budget: budget || '',
          zone: zone || ''
        });
        setStep(4); // Show completed state
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
    setStep(1);
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete('mood');
    params.delete('budget');
    params.delete('zone');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

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
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-6 text-center">
              What&apos;s your vibe tonight?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MOODS.map((mood) => {
                const Icon = mood.icon;
                return (
                  <button
                    key={mood.id}
                    onClick={() => handleSelect('mood', mood.id)}
                    className="group flex flex-col items-center justify-center p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-champagne/10 hover:border-champagne/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(242,227,198,0.15)]"
                  >
                    <Icon className="w-8 h-8 text-champagne mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white font-medium tracking-wide">{mood.label}</span>
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
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-6 text-center">
              Select your budget
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {BUDGETS.map((budget) => {
                const Icon = budget.icon;
                return (
                  <button
                    key={budget.id}
                    onClick={() => handleSelect('budget', budget.id)}
                    className="group flex flex-col items-center justify-center p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-champagne/10 hover:border-champagne/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(242,227,198,0.15)]"
                  >
                    <Icon className="w-8 h-8 text-champagne mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white font-medium tracking-wide">{budget.label}</span>
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
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-6 text-center">
              Where do you want to go?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ZONES.map((zone) => {
                const Icon = zone.icon;
                return (
                  <button
                    key={zone.id}
                    onClick={() => handleSelect('zone', zone.id)}
                    className="group flex flex-col items-center justify-center p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-champagne/10 hover:border-champagne/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(242,227,198,0.15)]"
                  >
                    <Icon className="w-6 h-6 text-champagne mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-white font-medium tracking-wide text-sm">{zone.label}</span>
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-champagne/20 text-champagne mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
              Your Vibe is Set
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {selections.mood && (
                <span className="px-4 py-2 rounded-full border border-champagne/30 bg-champagne/10 text-champagne text-sm font-medium">
                  {MOODS.find(m => m.id === selections.mood)?.label}
                </span>
              )}
              {selections.budget && (
                <span className="px-4 py-2 rounded-full border border-champagne/30 bg-champagne/10 text-champagne text-sm font-medium">
                  {BUDGETS.find(b => b.id === selections.budget)?.label}
                </span>
              )}
              {selections.zone && (
                <span className="px-4 py-2 rounded-full border border-champagne/30 bg-champagne/10 text-champagne text-sm font-medium">
                  {ZONES.find(z => z.id === selections.zone)?.label}
                </span>
              )}
            </div>
            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-2 text-white/40 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wider font-medium">Reset Search</span>
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#1C1810]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
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
        <div className="flex justify-center items-center space-x-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${s === step ? 'bg-champagne' : s < step ? 'bg-champagne/50' : 'bg-white/20'}`} />
              {s < 3 && <div className={`w-8 h-[1px] mx-2 ${s < step ? 'bg-champagne/50' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="min-h-[250px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </div>
    </div>
  );
}
