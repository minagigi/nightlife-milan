'use client';
import { useEffect, useState } from 'react';

const PHASES = {
  it: [
    { from: 6,  to: 18, label: 'Milano si prepara' },
    { from: 18, to: 22, label: 'È ora di aperitivo' },
    { from: 22, to: 24, label: 'Cena & pre-club' },
    { from: 0,  to: 6,  label: 'Milano è in fase club' },
  ],
  en: [
    { from: 6,  to: 18, label: 'Milan is getting ready' },
    { from: 18, to: 22, label: 'Aperitivo hour' },
    { from: 22, to: 24, label: 'Dinner & pre-club' },
    { from: 0,  to: 6,  label: 'Milan is in club mode' },
  ],
};

export default function NightTicker({ lang }: { lang: 'en' | 'it' }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <div className="h-5" aria-hidden="true" />; // riserva spazio, no CLS

  const milanTime = new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', {
    timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit',
  }).format(now);
  const milanDate = new Intl.DateTimeFormat(lang === 'it' ? 'it-IT' : 'en-GB', {
    timeZone: 'Europe/Rome', weekday: 'short', day: 'numeric', month: 'short',
  }).format(now);
  const hour = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', hour: '2-digit', hour12: false }).format(now), 10);
  const phase = PHASES[lang].find(p => p.from <= p.to ? (hour >= p.from && hour < p.to) : (hour >= p.from || hour < p.to));

  return (
    <p className="flex items-center gap-3 font-sans text-[11px] tracking-[0.25em] uppercase text-ivory/70 tabular-nums">
      <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-campari" aria-hidden="true" />
      <span>{milanDate}</span>
      <span className="text-champagne/40">·</span>
      <span>{milanTime}</span>
      <span className="text-champagne/40">·</span>
      <span className="text-champagne">{phase?.label}</span>
    </p>
  );
}
