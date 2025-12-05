export function IntensitySection({ getMoodEmoji, moodByDay, filteredEntries }) {
  return (
    <div
      className="rounded-3xl p-8 shadow-xl border-2 border-white/70 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #f3f8ff, #f7f5ff)' }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-lg font-bold text-gray-900">Intensity by Day</p>
          <p className="text-sm text-gray-600">Hover to see exact scores</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700" aria-hidden="true">
          <span>Low</span>
          <div className="flex h-2 overflow-hidden rounded-full">
            <span className="w-10 bg-green-200" />
            <span className="w-10 bg-yellow-300" />
            <span className="w-10 bg-orange-300" />
            <span className="w-10 bg-red-300" />
          </div>
          <span>High</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 text-center" aria-live="polite">
        {Object.entries(moodByDay).map(([day, entries]) => {
          const avgIntensity = Math.round(entries.reduce((sum, e) => sum + e.rating, 0) / entries.length);
          const moodIcons = entries.slice(0, 3).map((entry, idx) => (
            <span key={idx} aria-hidden="true">
              {getMoodEmoji(entry.mood)}
            </span>
          ));

          const intensityClass =
            avgIntensity >= 8
              ? 'bg-gradient-to-b from-red-100 to-orange-200 text-red-800'
              : avgIntensity >= 6
              ? 'bg-gradient-to-b from-orange-100 to-amber-200 text-orange-800'
              : avgIntensity >= 4
              ? 'bg-gradient-to-b from-yellow-100 to-lime-200 text-yellow-800'
              : 'bg-gradient-to-b from-green-100 to-emerald-200 text-emerald-800';

          return (
            <div
              key={day}
              className={`rounded-2xl p-3 shadow-md border border-white/70 ${intensityClass} transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg`}
            >
              <p className="text-sm font-bold mb-1">{day}</p>
              <div className="flex justify-center gap-1 text-lg">{moodIcons}</div>
              <p className="text-xs font-semibold mt-2">Avg {avgIntensity}/10</p>
              <div className="sr-only">{entries.length} entries</div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-sm text-gray-600" aria-live="polite">
        {filteredEntries.length} entries shown this period
      </div>
    </div>
  );
}
