export function MoodBreakdown({ getMoodEmoji, moodPercentage, moodCounts }) {
  return (
    <div
      className="rounded-3xl p-8 shadow-xl border-2 border-white/70 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #f7f4ff, #f0fbff)' }}
    >
      <p className="text-lg font-bold text-gray-900 mb-4">Mood Breakdown</p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4" aria-label="Mood distribution">
          {Object.entries(moodPercentage).map(([mood, percentage]) => (
            <div key={mood}>
              <div className="flex justify-between text-sm font-semibold text-gray-800 mb-1">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="animate-bob-soft">{getMoodEmoji(mood)}</span>
                  <span className="capitalize">{mood}</span>
                </div>
                <span>{percentage}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden" aria-hidden="true">
                <div
                  className="h-full bg-linear-to-r from-sky-300 via-purple-300 to-pink-300 animate-pulse-glow"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-white/80 shadow-lg" aria-live="polite">
          <p className="text-sm font-semibold text-gray-700 mb-3">Totals</p>
          <div className="grid grid-cols-2 gap-3 text-sm font-semibold text-gray-800">
            {Object.entries(moodCounts).map(([mood, count]) => (
              <div key={mood} className="flex items-center gap-2">
                  <span aria-hidden="true" className="animate-bob-soft">{getMoodEmoji(mood)}</span>
                <span className="capitalize">{mood}</span>
                <span className="text-gray-500">· {count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
