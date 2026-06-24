'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useFavorites, FavoriteItem } from './FavoritesContext';

export default function FavoriteButton({ item }: { item: FavoriteItem }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const active = isFavorite(item.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (active) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.75 }}
      onClick={toggleFavorite}
      className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors"
      aria-label={active ? "Remove from My Night" : "Add to My Night"}
    >
      <motion.div
        animate={active ? { scale: [1, 1.45, 0.9, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <Heart
          className={`w-5 h-5 transition-colors duration-300 ${
            active ? 'fill-champagne text-champagne' : 'text-white'
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
