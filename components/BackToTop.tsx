'use client';

import { ArrowUp } from 'lucide-react';

export default function BackToTop({ label }: { label: string }) {
  const scrollToTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };

  return (
    <div className="border-t border-white/14 bg-[#0A0A0C] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] justify-center sm:justify-end">
        <button
          type="button"
          onClick={scrollToTop}
          className="nlm-pressable group inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-white/25 bg-[#18181C] px-5 py-2.5 font-sans text-[13px] font-bold text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF] hover:text-[#0A0A0C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9381E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0C]"
          aria-label={label}
        >
          <span>{label}</span>
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
