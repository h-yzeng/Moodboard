const tabs = [
  { id: 'stats', label: 'Overview', emoji: '📊' },
  { id: 'calendar', label: 'Calendar', emoji: '🗓️' }
];

const focusRingDefault = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export function ViewToggle({ viewMode, setViewMode, showFilters, setShowFilters, focusRing = focusRingDefault }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
      <div className="inline-flex bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-full p-1 shadow-md" role="tablist" aria-label="Trend view" aria-live="polite">
        {tabs.map((tab) => {
          const active = viewMode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setViewMode(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' : 'text-gray-700 hover:bg-white'
              } ${focusRing}`}
            >
              <span aria-hidden="true" className="mr-2">
                {tab.emoji}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setShowFilters((prev) => !prev)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 bg-white border-2 border-blue-600 text-blue-700 hover:bg-blue-50 shadow-md ${focusRing}`}
        aria-expanded={showFilters}
      >
        <span aria-hidden="true">🎯</span>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
    </div>
  );
}
