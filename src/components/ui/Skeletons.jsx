// Reusable loading skeleton components for MoodBoard

export function SkeletonPulse({ className = '' }) {
  return (
    <div className={`animate-pulse bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 bg-size-[200%_100%] rounded ${className}`} />
  );
}

export function StatsGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10" aria-label="Loading statistics">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-8 text-center shadow-xl ring-1 ring-white/60 border-4 border-white/60 animate-fade-in"
          style={{ background: 'linear-gradient(135deg, #f8f8f8, #f0f0f0)' }}
        >
          <SkeletonPulse className="w-12 h-12 rounded-full mx-auto mb-3" />
          <SkeletonPulse className="h-10 w-24 mx-auto mb-2 rounded-lg" />
          <SkeletonPulse className="h-5 w-32 mx-auto rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function MoodBreakdownSkeleton({ variant = 'card' }) {
  const isEmbedded = variant === 'embedded';
  const containerClass = isEmbedded
    ? 'rounded-2xl p-6 bg-white/70 border border-white/60 shadow-sm h-full'
    : 'rounded-3xl p-8 shadow-xl border-2 border-white/70 animate-fade-in';

  return (
    <div className={containerClass} style={isEmbedded ? undefined : { background: 'linear-gradient(135deg, #f7f4ff, #f0fbff)' }}>
      <SkeletonPulse className="h-6 w-40 mb-4 rounded-lg" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <SkeletonPulse className="h-4 w-24 rounded" />
                <SkeletonPulse className="h-4 w-10 rounded" />
              </div>
              <SkeletonPulse className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 border border-white/80 shadow-lg bg-linear-to-br from-gray-50 to-gray-100">
          <SkeletonPulse className="h-4 w-16 mb-3 rounded" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonPulse key={i} className="h-5 w-full rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CalendarViewSkeleton() {
  return (
    <div
      className="rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-white/70 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #f6f7ff, #f0fbff)' }}
      aria-label="Loading calendar"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div>
          <SkeletonPulse className="h-6 w-32 mb-2 rounded-lg" />
          <SkeletonPulse className="h-4 w-48 rounded" />
        </div>
        <SkeletonPulse className="h-4 w-40 rounded" />
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-3 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-400 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-3">
        {Array.from({ length: 35 }, (_, i) => (
          <div
            key={i}
            className="rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-white/70 bg-white/50"
          >
            <SkeletonPulse className="h-4 w-4 mb-1 sm:mb-2 rounded" />
            <SkeletonPulse className="h-6 sm:h-8 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function IntensitySectionSkeleton({ variant = 'card' }) {
  const isEmbedded = variant === 'embedded';
  const containerClass = isEmbedded
    ? 'rounded-2xl p-6 bg-white/70 border border-white/60 shadow-sm'
    : 'rounded-3xl p-8 shadow-xl border-2 border-white/70 animate-fade-in';

  return (
    <div className={containerClass} style={isEmbedded ? undefined : { background: 'linear-gradient(135deg, #f3f8ff, #f7f5ff)' }}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <SkeletonPulse className="h-6 w-36 mb-2 rounded-lg" />
          <SkeletonPulse className="h-4 w-44 rounded" />
        </div>
        <SkeletonPulse className="h-4 w-32 rounded" />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="rounded-2xl p-3 shadow-md border border-white/70 bg-gray-50">
            <SkeletonPulse className="h-4 w-8 mx-auto mb-2 rounded" />
            <SkeletonPulse className="h-6 w-12 mx-auto mb-2 rounded" />
            <SkeletonPulse className="h-3 w-14 mx-auto rounded" />
          </div>
        ))}
      </div>

      <SkeletonPulse className="h-4 w-40 mt-4 rounded" />
    </div>
  );
}

export function TopTagsSkeleton({ variant = 'card' }) {
  const isEmbedded = variant === 'embedded';
  const containerClass = isEmbedded
    ? 'rounded-2xl p-6 bg-white/70 border border-white/60 shadow-sm h-full'
    : 'rounded-3xl p-8 shadow-xl border-2 border-white/70 animate-fade-in';

  return (
    <div className={containerClass} style={isEmbedded ? undefined : { background: 'linear-gradient(135deg, #fff7fb, #f0fbff)' }}>
      <SkeletonPulse className="h-6 w-28 mb-4 rounded-lg" />
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonPulse key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export function TrendsContentSkeleton() {
  return (
    <div className="space-y-8">
      <StatsGridSkeleton />
      
      <div
        className="rounded-3xl p-8 shadow-xl border-2 border-white/70 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, #f4f7ff, #faf7ff)' }}
      >
        <div className="grid gap-6">
          <IntensitySectionSkeleton variant="embedded" />
          <div className="grid lg:grid-cols-2 gap-6">
            <MoodBreakdownSkeleton variant="embedded" />
            <TopTagsSkeleton variant="embedded" />
          </div>
        </div>
      </div>
    </div>
  );
}
