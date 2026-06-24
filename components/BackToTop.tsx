'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[calc(env(safe-area-inset-bottom)+5.5rem)] md:bottom-24 right-5 md:right-6 z-40 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 bg-white/[0.03] border border-champagne/30 rounded-full shadow-2xl hover:scale-110 hover:bg-champagne active:scale-95 group transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5 text-champagne group-hover:text-[#131009] transition-colors" />
    </button>
  );
}
