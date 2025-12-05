export function StatsGrid({ filteredCount, filteredCountLabel, mostCommonMood, getMoodEmoji, averageRating, entries }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10" aria-live="polite">
      <div
        className="rounded-2xl p-8 text-center shadow-xl ring-1 ring-white/60 border-4 border-white/60 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, #fbe7f5, #e7d8ff)' }}
      >
        <div className="text-5xl mb-3 animate-bob-soft" aria-hidden="true">
          📈
        </div>
        <p className="text-4xl font-black text-gray-900 mb-2">{filteredCount}</p>
        <p className="text-lg font-semibold text-gray-700">Filtered {filteredCountLabel}</p>
      </div>
      <div
        className="rounded-2xl p-8 text-center shadow-xl ring-1 ring-white/60 border-4 border-white/60 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, #e0ecff, #d8e3ff)' }}
      >
        <div className="text-5xl mb-3 animate-bob-soft" aria-hidden="true">
          {mostCommonMood ? getMoodEmoji(mostCommonMood) : '😐'}
        </div>
        <p className="text-2xl font-black text-gray-900 mb-2 capitalize">{mostCommonMood || 'N/A'}</p>
        <p className="text-lg font-semibold text-gray-700">Most Common Mood</p>
      </div>
      <div
        className="rounded-2xl p-8 text-center shadow-xl ring-1 ring-white/60 border-4 border-white/60 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, #e6ddff, #d4f1f9)' }}
      >
        <div className="text-5xl mb-3 animate-bob-soft" aria-hidden="true">
          ⭐
        </div>
        <p className="text-4xl font-black text-gray-900 mb-2">{averageRating}/10</p>
        <p className="text-lg font-semibold text-gray-700">Average Intensity</p>
      </div>
      <div
        className="rounded-2xl p-8 text-center shadow-xl ring-1 ring-white/60 border-4 border-white/60 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, #fff4d6, #ffe0e6)' }}
      >
        <div className="text-5xl mb-3 animate-bob-soft" aria-hidden="true">
          🔥
        </div>
        <p className="text-4xl font-black text-gray-900 mb-2">
          {entries}
        </p>
        <p className="text-lg font-semibold text-gray-700">Entries This Week</p>
      </div>
    </div>
  );
}
