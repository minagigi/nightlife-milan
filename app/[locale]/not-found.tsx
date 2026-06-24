import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-8">
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-champagne tracking-tighter">
          404
        </h1>
        
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-serif text-white">
            Lost in the night?
          </h2>
          <p className="text-white/40 text-lg font-light">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="pt-8 flex justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-champagne text-zinc-950 font-bold rounded-xl hover:bg-white transition-colors uppercase tracking-wider text-sm"
          >
            Back to the Party
          </Link>
        </div>
      </div>
    </div>
  );
}
