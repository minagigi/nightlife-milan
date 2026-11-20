'use client';

import { ArrowUp } from 'lucide-react';

export default function BackToTop({ label }: { label: string }) {
  const scrollToTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };

  return (
    <div className="border-t border-[#F6F1E7]/14 bg-[#050505] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] justify-center sm:justify-end">
        <button
          type="button"
          onClick={scrollToTop}
          className="nlm-pressable group inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-[#EAE3D5]/30 bg-[#0B0A09] px-5 py-2.5 font-sans text-[13px] font-bold text-[#F6F1E7] transition-colors hover:bg-[#F6F1E7] hover:text-[#050505] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
          aria-label={label}
        >
          <span>{label}</span>
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
