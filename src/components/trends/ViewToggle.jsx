import { FOCUS_RING } from '../../constants/moods.js';

const tabs = [
  { id: 'stats', label: 'Overview', emoji: '📊' },
  { id: 'heatmap', label: 'Heatmap', emoji: '🔥' },
  { id: 'compare', label: 'Compare', emoji: '⚖️' },
  { id: 'calendar', label: 'Calendar', emoji: '🗓️' }
];

export function ViewToggle({ viewMode, setViewMode, showFilters, setShowFilters, focusRing = FOCUS_RING }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
      <div className="inline-flex flex-wrap bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl sm:rounded-full p-1 shadow-md w-full sm:w-auto gap-1" role="tablist" aria-label="Trend view" aria-live="polite">
        {tabs.map((tab) => {
          const active = viewMode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setViewMode(tab.id)}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                active ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' : 'text-gray-700 hover:bg-white'
              } ${focusRing}`}
            >
              <span aria-hidden="true" className="mr-1 sm:mr-2">
                {tab.emoji}
              </span>
              <span className="hidden xs:inline sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setShowFilters((prev) => !prev)}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 bg-white border-2 border-blue-600 text-blue-700 hover:bg-blue-50 shadow-md ${focusRing}`}
        aria-expanded={showFilters}
      >
        <span aria-hidden="true">🎯</span>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
    </div>
  );
}
