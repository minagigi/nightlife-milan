'use client';

import { ArrowUp } from 'lucide-react';

export default function BackToTop({ label }: { label: string }) {
  const scrollToTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };

  return (
    <div className="border-t border-champagne/15 bg-[#131009] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl justify-center sm:justify-end">
        <button
          type="button"
          onClick={scrollToTop}
          className="group inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-champagne/30 bg-white/[0.03] px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-champagne shadow-xl transition-colors hover:bg-champagne hover:text-[#131009] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-[#131009]"
          aria-label={label}
        >
          <span>{label}</span>
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
