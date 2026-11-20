'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Taste v2 scroll choreography controller.
 * Keeps all above-the-fold sections visible on first frame, reveals entering sections
 * progressively on IntersectionObserver, and guards fast jumps so zero sections remain blank.
 */
export default function TasteMotionEngine() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (nodes.length === 0) return;

    if (reduced) {
      nodes.forEach((el) => el.setAttribute('data-revealed', 'true'));
      return;
    }

    const revealIfNearViewport = () => {
      const limit = window.innerHeight * 0.98;
      nodes.forEach((el) => {
        if (el.getAttribute('data-revealed') === 'true') return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= limit) {
          el.setAttribute('data-revealed', 'true');
        }
      });
    };

    revealIfNearViewport();
    document.documentElement.classList.add('nlm-motion-ready');

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.setAttribute('data-revealed', 'true');
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -3% 0px', threshold: 0.02 },
      );
      nodes.forEach((el) => {
        if (el.getAttribute('data-revealed') !== 'true') {
          observer?.observe(el);
        }
      });
    } else {
      nodes.forEach((el) => el.setAttribute('data-revealed', 'true'));
    }

    window.addEventListener('scroll', revealIfNearViewport, { passive: true });
    window.addEventListener('resize', revealIfNearViewport, { passive: true });

    const fallbackTimer = window.setTimeout(() => {
      revealIfNearViewport();
    }, 650);

    return () => {
      window.clearTimeout(fallbackTimer);
      window.removeEventListener('scroll', revealIfNearViewport);
      window.removeEventListener('resize', revealIfNearViewport);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
