const focusRingDefault = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export function FiltersPanel({
  showFilters,
  timeRanges,
  selectedRange,
  setSelectedRange,
  moods,
  selectedMood,
  setSelectedMood,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  setShowFilters,
  focusRing = focusRingDefault
}) {
  if (!showFilters) return null;

  return (
    <div
      className="rounded-3xl p-6 shadow-xl border-2 border-white/70 mb-8 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #f6f7ff, #fff7fb)' }}
      role="region"
      aria-label="Filters"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="font-bold text-gray-900">Filters</p>
          <p className="text-sm text-gray-600">Tune the lens on your mood data</p>
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(false)}
          className={`text-sm font-semibold text-blue-700 hover:text-blue-900 ${focusRing}`}
        >
          Close
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Time Range</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Time range">
            {timeRanges.map((range) => {
              const value = typeof range === 'string' ? range : range.value;
              const label = typeof range === 'string' ? range : range.label;
              const active = selectedRange === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedRange(value)}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-blue-600 text-white shadow-md scale-[1.02]'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${focusRing}`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {selectedRange === 'custom' && (
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm font-semibold text-gray-800">
              <label className="flex flex-col">
                Month
                <select
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(Number(event.target.value))}
                  className={`mt-1 px-3 py-2 rounded-full bg-white border-2 border-blue-200 font-semibold text-gray-900 ${focusRing}`}
                >
                  {["January","February","March","April","May","June","July","August","September","October","November","December"].map((month, idx) => (
                    <option key={month} value={idx}>
                      {month}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col">
                Year
                <select
                  value={selectedYear}
                  onChange={(event) => setSelectedYear(Number(event.target.value))}
                  className={`mt-1 px-3 py-2 rounded-full bg-white border-2 border-blue-200 font-semibold text-gray-900 ${focusRing}`}
                >
                  {[2024, 2025, 2026, 2027].map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Mood Filter</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Mood filter">
            {moods.map((mood) => {
              const value = mood.value ?? mood;
              const label = mood.label ?? mood;
              const emoji = mood.emoji ?? '';
              const active = selectedMood === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedMood(value)}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-purple-600 text-white shadow-md scale-[1.02]'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${focusRing}`}
                >
                  <span aria-hidden="true" className={emoji ? 'mr-1' : ''}>
                    {emoji}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
