import { FOCUS_RING } from '../../constants/moods.js';

export function HistoryPanel({
  isVisible,
  entries,
  viewMode,
  setViewMode,
  selectedEntry,
  setSelectedEntry,
  onDelete,
  formatDate,
  formatTime,
  getMoodEmoji,
  getMoodColor,
  focusRing = FOCUS_RING,
}) {
  const displayedEntries = viewMode === 'recent' ? entries.slice(0, 5) : entries;

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="lg:col-span-3 animate-fade-in">
      <div
        className="rounded-3xl p-6 shadow-xl border-4 border-white/50 sticky top-4"
        style={{
          background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff)',
        }}
        aria-label="Mood entry history"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-gray-900">Your Entries 📝</h3>
          <span className="text-sm font-semibold text-gray-700" aria-live="polite">
            {entries.length} total
          </span>
        </div>

        <div className="flex gap-2 mb-4" role="group" aria-label="History view mode">
          {[
            { label: 'Recent', value: 'recent' },
            { label: `All (${entries.length})`, value: 'all' },
          ].map(({ label, value }) => {
            const isActive = viewMode === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setViewMode(value)}
                className={`flex-1 px-3 py-2 rounded-full text-sm font-bold transition-all ${focusRing} ${
                  isActive ? 'bg-purple-500 text-white' : 'bg-white/60 text-gray-700 hover:bg-white'
                }`}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12" role="status" aria-live="polite">
            <div className="text-6xl mb-4" aria-hidden="true">
              📭
            </div>
            <p className="text-gray-600 font-medium text-sm">No entries yet. Start logging!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2" aria-live="polite">
            {displayedEntries.map((entry, idx) => {
              const isExpanded = selectedEntry === entry.id;
              return (
                <article
                  key={entry.id}
                  className={`p-4 rounded-2xl border-2 shadow-md transition-all cursor-pointer ${
                    isExpanded ? 'border-purple-400 bg-white' : 'border-white'
                  } ${idx % 2 === 0 ? 'bg-white/95' : 'bg-white/85'}`}
                  style={{ borderLeftWidth: '6px', borderLeftColor: getMoodColor(entry.mood) }}
                >
                  <button
                    type="button"
                    className={`w-full text-left ${focusRing}`}
                    onClick={() => setSelectedEntry(isExpanded ? null : entry.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-4xl" aria-hidden="true">
                        {getMoodEmoji(entry.mood)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-gray-900 capitalize text-sm">{entry.mood}</div>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              if (window.confirm('Delete this entry?')) {
                                onDelete(entry.id);
                              }
                            }}
                            className={`text-red-600 hover:text-red-800 text-xl ${focusRing}`}
                            title="Delete entry"
                            aria-label="Delete entry"
                          >
                            ×
                          </button>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                          {formatDate(entry.date)} • {formatTime(entry.date)}
                        </div>
                        <div className="inline-block px-2 py-1 rounded-full bg-purple-200 text-xs font-bold text-gray-900">
                          {entry.rating}/10
                        </div>
                      </div>
                    </div>
                  </button>
                  {isExpanded && entry.note && (
                    <p className="text-sm text-gray-700 mb-2 mt-3 p-2 bg-white/50 rounded-lg">{entry.note}</p>
                  )}
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2" aria-label="Tags">
                      {(isExpanded ? entry.tags : entry.tags.slice(0, 2)).map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-full bg-purple-100 text-gray-700">
                          {tag}
                        </span>
                      ))}
                      {!isExpanded && entry.tags.length > 2 && (
                        <span className="text-xs px-2 py-1 text-gray-600">+{entry.tags.length - 2}</span>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
