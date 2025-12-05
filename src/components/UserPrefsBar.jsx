import { useUserPreferences } from '../hooks/useUserPreferences.jsx';

const focusRing = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export function UserPrefsBar() {
  const { prefs, toggleReduceMotion, setTextSize } = useUserPreferences();

  return (
    <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm font-semibold text-gray-800">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Display preferences">
        <button
          type="button"
          onClick={toggleReduceMotion}
          aria-pressed={prefs.reduceMotion}
          className={`px-3 py-2 rounded-full border-2 ${prefs.reduceMotion ? 'bg-blue-100 border-blue-300 text-blue-900' : 'bg-white border-gray-200 text-gray-800'} shadow-sm transition-colors ${focusRing}`}
        >
          {prefs.reduceMotion ? 'Reduced motion on' : 'Reduced motion off'}
        </button>
      </div>

      <div className="flex items-center gap-2" aria-label="Text size">
        <span className="text-gray-700">Text size:</span>
        {['base', 'large'].map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setTextSize(size)}
            aria-pressed={prefs.textSize === size}
            className={`px-3 py-2 rounded-full border-2 shadow-sm capitalize ${
              prefs.textSize === size
                ? 'bg-purple-100 border-purple-300 text-purple-900'
                : 'bg-white border-gray-200 text-gray-800'
            } ${focusRing}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
