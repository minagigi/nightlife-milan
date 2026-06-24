'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#131009] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-8">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-champagne tracking-tighter">
          500
        </h1>
        
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif text-white">
            Something went wrong in the dark.
          </h2>
          <p className="text-white/40 text-lg font-light">
            Let&apos;s get you back to the party.
          </p>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-8 py-4 bg-champagne text-zinc-950 font-bold rounded-xl hover:bg-white transition-colors uppercase tracking-wider text-sm"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:border-champagne hover:text-champagne transition-colors uppercase tracking-wider text-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
