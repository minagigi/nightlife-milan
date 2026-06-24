'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      setIsHovering(!!(t.closest('a, button, [role="button"], input, textarea, select, label')));
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-champagne pointer-events-none z-[9999] hidden lg:block"
        style={{ opacity: isVisible ? 1 : 0 }}
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: isHovering ? 0.4 : 1,
        }}
        transition={{ type: 'spring', damping: 35, stiffness: 500, mass: 0.4 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-champagne/35 pointer-events-none z-[9998] hidden lg:block"
        style={{ opacity: isVisible ? 1 : 0 }}
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: isHovering ? 1.6 : 1,
          borderColor: isHovering ? 'rgba(201,168,106,0.6)' : 'rgba(201,168,106,0.35)',
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 200, mass: 0.7 }}
      />
    </>
  );
}
