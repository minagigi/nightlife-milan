'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from './FavoritesContext';

export default function FavoritesDrawer({ lang }: { lang: string }) {
  const { favorites, isDrawerOpen, setDrawerOpen, removeFavorite } = useFavorites();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-charcoal border-l border-white/10 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-serif text-2xl text-champagne">My Night</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {favorites.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-white/40">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <span className="text-3xl">🥂</span>
                  </div>
                  <p className="text-lg">Your night is empty.</p>
                  <p className="text-sm">Save your favorite clubs and events to plan your perfect night out.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((item) => (
                    <div key={item.id} className="group relative flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-champagne/30 transition-colors">
                      <Link href={item.url} onClick={() => setDrawerOpen(false)} className="absolute inset-0 z-10" />
                      
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate group-hover:text-champagne transition-colors">
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <p className="text-sm text-white/40 truncate">{item.subtitle}</p>
                        )}
                        <span className="text-[10px] uppercase tracking-wider text-champagne/70 mt-1 block">
                          {item.type}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeFavorite(item.id);
                        }}
                        className="relative z-20 p-2 text-white/40 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {favorites.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/20">
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="w-full py-3 rounded-full bg-champagne text-black font-bold tracking-wider uppercase text-sm hover:bg-white transition-colors"
                >
                  {lang === 'it' ? 'Chiudi' : 'Close'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
