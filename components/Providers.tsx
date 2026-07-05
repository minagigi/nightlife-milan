'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { FavoritesProvider } from './FavoritesContext';

// Code-split FavoritesDrawer (pulls in motion/react) out of the critical bundle —
// it's a closed-by-default overlay, never needed for the initial paint.
const FavoritesDrawer = dynamic(() => import('./FavoritesDrawer'));

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      {children}
      <FavoritesDrawer lang="en" />
    </FavoritesProvider>
  );
}
