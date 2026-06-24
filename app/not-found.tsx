import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#131009] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-champagne/40 font-sans text-[11px] tracking-[0.4em] uppercase mb-6">
          Error 404
        </p>
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-champagne mb-4">
          Not Found
        </h1>
        <p className="text-white/40 text-lg font-light mb-10 leading-relaxed">
          This page doesn&apos;t exist — or the event has moved to a new date.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-champagne text-zinc-950 font-sans font-bold text-sm tracking-[0.15em] uppercase hover:bg-white transition-colors duration-300"
          >
            Back to Home
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-8 py-4 border border-champagne/30 text-champagne font-sans font-bold text-sm tracking-[0.15em] uppercase hover:border-champagne transition-colors duration-300"
          >
            See All Events
          </Link>
        </div>
      </div>
    </main>
  );
}
