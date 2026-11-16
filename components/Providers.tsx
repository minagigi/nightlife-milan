'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { FavoritesProvider } from './FavoritesContext';
import { SinglePassCartProvider } from './single-pass/SinglePassCartContext';
import AttributionTracker from './single-pass/AttributionTracker';

// Code-split FavoritesDrawer & SinglePassCartDrawer (pulls in motion/react) out of the critical bundle —
// closed-by-default overlays, never needed for the initial paint.
const FavoritesDrawer = dynamic(() => import('./FavoritesDrawer'));
const SinglePassCartDrawer = dynamic(() => import('./single-pass/SinglePassCartDrawer'));

export function Providers({ children, lang }: { children: React.ReactNode; lang: string }) {
  return (
    <FavoritesProvider>
      <SinglePassCartProvider locale={lang}>
        <Suspense fallback={null}>
          <AttributionTracker />
        </Suspense>
        {children}
        <FavoritesDrawer lang={lang} />
        <SinglePassCartDrawer lang={lang} />
      </SinglePassCartProvider>
    </FavoritesProvider>
  );
}
