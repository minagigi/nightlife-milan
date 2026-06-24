'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { CONTACT } from '@/config/contact';

export default function WhatsAppFloating() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isIt = pathname?.startsWith('/it') || pathname === '/it';
  const label = isIt ? CONTACT.whatsapp.labels.it : CONTACT.whatsapp.labels.en;

  useEffect(() => {
    // Show button after a short delay to not distract immediately
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          href={CONTACT.whatsapp.link}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex fixed bottom-6 right-6 z-50 items-center justify-center gap-3 px-4 py-3 glass-dark border-champagne/30 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(201,168,106,0.15)] group cursor-pointer active:scale-95 transition-transform"
          aria-label={label}
        >
          <div className="absolute inset-0 rounded-full bg-champagne/10 animate-ping opacity-75 pointer-events-none"></div>
          <MessageCircle className="w-6 h-6 text-champagne relative z-10 group-hover:text-white transition-colors" />
          <span className="text-white text-xs font-medium tracking-wide hidden md:block relative z-10">
            {label}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
