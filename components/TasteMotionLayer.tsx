'use client';

import { useEffect } from 'react';

/**
 * Progressive-enhancement motion controller for Taste Editorial pages.
 * Keeps SSR HTML painted at full opacity and only animates elements on scroll
 * once JS mounts under prefers-reduced-motion: no-preference.
 */
export default function TasteMotionLayer() {
  useEffect(() => {
    const docEl = document.documentElement;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-taste-reveal], [data-taste-stagger], [data-taste-clip]'),
    );

    targets.forEach((node) => {
      if (node.hasAttribute('data-taste-stagger')) {
        Array.from(node.children).forEach((child, idx) => {
          (child as HTMLElement).style.setProperty('--i', String(Math.min(idx, 10)));
        });
      }
    });

    const markVisibleAboveOrInside = () => {
      const vh = window.innerHeight || 900;
      for (const el of targets) {
        if (el.classList.contains('is-in')) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.96) {
          el.classList.add('is-in');
        }
      }
    };

    if (reduced) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    // Mark above-the-fold items synchronously BEFORE enabling .taste-js so hero titles never flash opacity:0
    markVisibleAboveOrInside();
    docEl.classList.add('taste-js');
    const rafId = window.requestAnimationFrame(markVisibleAboveOrInside);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.02, rootMargin: '0px 0px -16px 0px' },
    );

    targets.forEach((el) => observer.observe(el));

    // Failsafe timer so scrolled or late sections never stay hidden
    const failsafe = window.setTimeout(markVisibleAboveOrInside, 750);

    // Reading progress bar (compositor-only transform: scaleX)
    const bar = document.querySelector<HTMLElement>('.taste-progress-bar');
    let scrollRaf = 0;
    const updateProgress = () => {
      scrollRaf = 0;
      markVisibleAboveOrInside();
      if (!bar) return;
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
      window.cancelAnimationFrame(rafId);
      if (scrollRaf) window.cancelAnimationFrame(scrollRaf);
      window.clearTimeout(failsafe);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
      docEl.classList.remove('taste-js');
    };
  }, []);

  return <div className="taste-progress-bar" aria-hidden="true" />;
}
