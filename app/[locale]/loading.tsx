export default function Loading() {
  return (
    <div className="min-h-screen bg-[#131009] animate-pulse">
      {/* Hero skeleton */}
      <div className="relative min-h-[60vh] bg-zinc-900/60" />

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="h-6 bg-zinc-800/60 rounded w-1/4" />
        <div className="h-10 bg-zinc-800/60 rounded w-2/3" />
        <div className="h-4 bg-zinc-800/40 rounded w-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[3/4] bg-zinc-800/50 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
