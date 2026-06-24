'use client';

import React from 'react';
import { FavoritesProvider } from './FavoritesContext';
import FavoritesDrawer from './FavoritesDrawer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      {children}
      <FavoritesDrawer lang="en" />
    </FavoritesProvider>
  );
}
