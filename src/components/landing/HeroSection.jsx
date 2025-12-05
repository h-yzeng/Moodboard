const focusRingDefault = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const emojis = [
  { label: 'neutral', icon: '😐', delay: '0s', float: true },
  { label: 'happy', icon: '😊', delay: '0.15s', float: true },
  { label: 'sad', icon: '😢', delay: '0.25s', float: false },
  { label: 'cool', icon: '😎', delay: '0.35s', float: false },
  { label: 'angry', icon: '😡', delay: '0.45s', float: false },
  { label: 'sleepy', icon: '😴', delay: '0.55s', float: false }
];

export function HeroSection({ onPrimary, onSecondary, focusRing = focusRingDefault }) {
  return (
    <section className="mx-auto max-w-6xl px-3 sm:px-4 py-16 sm:py-18">
      <div
        className="relative overflow-hidden rounded-3xl p-12 text-center shadow-xl border-4 border-white/50"
        style={{ background: 'linear-gradient(135deg, #f4f1ff, #fdf4ff, #ebf4ff)' }}
      >
        <div
          className="absolute inset-0 opacity-70 rounded-3xl animate-gradient-slow"
          style={{ background: 'linear-gradient(120deg, #d8b4fe, #fbcfe8, #c7d2fe, #fde2e4)' }}
          aria-hidden="true"
        />
        <div className="absolute -top-10 -left-6 w-32 h-32 bg-white/50 blur-3xl rounded-full" aria-hidden="true" />
        <div className="absolute -bottom-16 -right-8 w-36 h-36 bg-purple-100/60 blur-3xl rounded-full" aria-hidden="true" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-white/60 text-sm font-semibold text-gray-700 shadow-sm animate-fade-up" style={{ animationDelay: '40ms' }}>
            <span aria-hidden="true">🌈</span>
            Feel it. Track it. Learn from it.
          </p>

          <h2
            className="text-4xl md:text-5xl font-black text-gray-900 drop-shadow-md mb-3 max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            Track your mood. Spot the patterns. ✨
          </h2>
          <h3
            className="text-3xl font-black text-gray-900 mb-4 drop-shadow-md animate-fade-up"
            style={{ animationDelay: '180ms' }}
          >
            Ready to start your journey? 🌱
          </h3>

          <p
            className="mt-5 text-xl text-gray-700 font-medium max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            Build self-awareness through daily emotional check-ins. Understand what influences your feelings and celebrate your growth.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <button
              type="button"
              onClick={onPrimary}
              className={`inline-flex items-center gap-3 justify-center rounded-full px-9 py-4 text-white text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 ${focusRing} animate-pulse-glow`}
              style={{ background: 'linear-gradient(120deg, #d8b4fe, #fbcfe8)' }}
            >
              <span className="text-xl">✍️</span>
              Log Your Mood Today
            </button>
            <button
              type="button"
              onClick={onSecondary}
              className={`inline-flex items-center gap-3 justify-center rounded-full bg-white border-4 border-purple-100 px-9 py-4 text-gray-900 text-lg font-bold shadow-xl hover:shadow-2xl hover:bg-purple-50/70 hover:scale-105 active:scale-95 transition-all duration-200 ${focusRing}`}
            >
              <span className="text-xl">📊</span>
              View Trends
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-10 text-7xl" aria-label="Mood emoji examples">
            {emojis.map((emoji) => (
              <span
                key={emoji.label}
                aria-label={emoji.label}
                role="img"
                className="hover:scale-125 transition-transform cursor-pointer animate-drift"
                style={{ animationDelay: emoji.delay }}
                title={emoji.label}
              >
                {emoji.icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
