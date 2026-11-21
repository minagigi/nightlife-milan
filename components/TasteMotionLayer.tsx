'use client';

import { useEffect } from 'react';

/**
 * Passive reading progress bar for Couture Noir editorial guide pages.
 * Keeps every element at full opacity on initial render with zero scroll-reveal hiding or mouse effects.
 */
export default function TasteMotionLayer() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('.taste-progress-bar');
    if (!bar) return;

    let scrollRaf = 0;
    const updateProgress = () => {
      scrollRaf = 0;
      const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / total));
      bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
    };
    const onScroll = () => {
      if (!scrollRaf) {
        scrollRaf = window.requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => {
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return <div className="taste-progress-bar" aria-hidden="true" />;
}
