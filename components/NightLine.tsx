'use client';
import { useEffect, useState } from 'react';

export default function NightLine() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setProgress(1); return; }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        setProgress(Math.min(1, h.scrollTop / (h.scrollHeight - h.clientHeight)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 h-[55vh] w-px z-30 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-white/8" />
      <div
        className="absolute top-0 left-0 w-full bg-gradient-to-b from-champagne/20 via-champagne to-champagne/40 origin-top"
        style={{ height: '100%', transform: `scaleY(${progress})` }}
      />
      {/* Fermate — 4 momenti della notte */}
      {[0, 0.33, 0.66, 1].map((stop, i) => (
        <span
          key={i}
          className={`absolute -left-[3.5px] w-2 h-2 rounded-full border transition-colors duration-500
            ${progress >= stop - 0.02 ? 'bg-champagne border-champagne' : 'bg-charcoal border-white/20'}`}
          style={{ top: `${stop * 100}%` }}
        />
      ))}
    </div>
  );
}
