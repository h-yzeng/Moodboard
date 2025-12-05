const focusRingDefault = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export function MoodEntryForm({
  moods,
  quickTags,
  focusRing = focusRingDefault,
  selectedMood,
  onMoodSelect,
  rating,
  onRatingChange,
  note,
  onNoteChange,
  onClearNote,
  tagInput,
  onTagInputChange,
  currentTags,
  onQuickTagToggle,
  onSubmit,
  isHistoryOpen,
  toggleHistory,
  entryCount,
  formError,
}) {
  const intensityLabel = rating <= 3 ? 'Low intensity' : rating <= 6 ? 'Moderate intensity' : 'High intensity';
  const focusableMoodClass = `${focusRing} focus-visible:ring-purple-400/60`;

  return (
    <form onSubmit={onSubmit} className="rounded-3xl p-8 shadow-xl border-4 border-white/50" style={{ background: 'linear-gradient(to bottom right, #e9d5ff, #fce7f3, #dbeafe)' }}>
      <div className="mb-8">
        <label className="block text-2xl font-bold text-gray-900 mb-6 text-center" htmlFor="mood-grid">
          Select Your Mood
        </label>
        <p className="text-center text-sm text-gray-700 mb-4 font-medium">Pick how you feel right now—no wrong answers.</p>
        <div id="mood-grid" className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 max-w-full" role="radiogroup" aria-label="Mood options">
          {moods.map((mood) => {
            const isSelected = selectedMood === mood.value;
            return (
              <button
                key={mood.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onMoodSelect(mood.value)}
                className={`p-3 rounded-2xl border-4 transition-all duration-200 flex flex-col items-center justify-center min-h-[110px] ${focusableMoodClass} ${
                  isSelected ? 'border-purple-400 shadow-xl scale-110 bg-white' : 'border-white/60 shadow-lg hover:scale-105 bg-white/80'
                }`}
                style={isSelected ? { backgroundColor: mood.color } : {}}
              >
                <div className="text-4xl md:text-5xl mb-1" aria-hidden="true">
                  {mood.emoji}
                </div>
                <div className="text-xs font-semibold text-gray-800 text-center leading-tight">{mood.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <fieldset className="mb-8" aria-labelledby="intensity-label">
        <legend id="intensity-label" className="block text-xl font-bold text-gray-900 mb-4 text-center">
          Intensity Level
        </legend>
        <p className="text-center text-sm text-gray-700 mb-3">Think of 10 as the strongest feeling you’ve had today.</p>
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="text-lg font-bold text-gray-900">
            1
          </span>
          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => onRatingChange(Number(e.target.value))}
            className={`flex-1 h-3 rounded-full appearance-none cursor-pointer ${focusRing}`}
            style={{
              background: `linear-gradient(to right, #c084fc 0%, #c084fc ${(rating - 1) * 11.11}%, #e5e7eb ${(rating - 1) * 11.11}%, #e5e7eb 100%)`,
            }}
            aria-valuemin={1}
            aria-valuemax={10}
            aria-valuenow={rating}
            aria-label="Intensity level"
          />
          <span aria-hidden="true" className="text-lg font-bold text-gray-900">
            10
          </span>
        </div>
        <div className="text-center mt-3">
          <span className="inline-block px-6 py-2 rounded-full bg-white/80 border-2 border-purple-300 text-2xl font-black text-gray-900">{rating}</span>
          <p className="text-sm text-gray-600 mt-2 font-medium">{intensityLabel}</p>
        </div>
      </fieldset>

      <div className="mb-8">
        <label className="block text-xl font-bold text-gray-900 mb-3" htmlFor="daily-note">
          What's on your mind? (Optional)
        </label>
        <textarea
          id="daily-note"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Write about your day, what made you feel this way, or anything you'd like to remember..."
          className={`w-full p-4 rounded-2xl border-4 border-white/60 bg-white/80 text-gray-900 placeholder-gray-500 resize-none font-medium ${focusRing}`}
          rows={4}
        />
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium" aria-live="polite">
            {note.length} characters
          </span>
          {note.length > 0 && (
            <button type="button" onClick={onClearNote} className={`text-sm text-purple-600 hover:text-purple-800 font-semibold ${focusRing}`}>
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="block text-lg font-bold text-gray-900 mb-3">Quick Tags</p>
        <div className="flex flex-wrap gap-2">
          {quickTags.map((tag) => {
            const isSelected = currentTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onQuickTagToggle(tag)}
                aria-pressed={isSelected}
                className={`px-4 py-2 rounded-full border-2 font-semibold hover:scale-105 transition-all duration-200 ${focusRing} ${
                  isSelected ? 'bg-purple-500 border-purple-500 text-white' : 'bg-white/80 border-purple-200 text-gray-800 hover:bg-purple-100'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-xl font-bold text-gray-900 mb-3" htmlFor="custom-tags">
          Custom Tags (Optional)
        </label>
        <input
          id="custom-tags"
          type="text"
          value={tagInput}
          onChange={(e) => onTagInputChange(e.target.value)}
          placeholder="e.g., work, family, exercise (comma-separated)"
          className={`w-full p-4 rounded-2xl border-4 border-white/60 bg-white/80 text-gray-900 placeholder-gray-500 font-medium ${focusRing}`}
        />
        <p className="mt-2 text-sm text-gray-700 font-medium">💡 Tip: Use tags to track what influences your mood</p>
      </div>

      {formError && (
        <p role="alert" className="mb-4 text-sm font-semibold text-red-700">
          {formError}
        </p>
      )}

      <div className="text-center">
        <button
          type="submit"
          className={`inline-flex items-center gap-2 px-12 py-4 rounded-full text-white text-xl font-bold shadow-xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-200 ${focusRing}`}
          style={{
            background: 'linear-gradient(to right, #c084fc, #f472b6)',
          }}
        >
          <span aria-hidden="true" className="text-2xl">
            💾
          </span>
          Save Mood Entry
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={toggleHistory}
          aria-expanded={isHistoryOpen}
          className={`inline-flex items-center gap-2 px-9 py-3.5 rounded-full bg-white/80 border-3 border-purple-300 text-gray-900 text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-108 active:scale-95 transition-all duration-200 ${focusRing}`}
        >
          <span className="text-xl" aria-hidden="true">
            {isHistoryOpen ? '📝' : '📋'}
          </span>
          {isHistoryOpen ? 'Hide Past Entries' : `View Past Entries ${entryCount > 0 ? `(${entryCount})` : ''}`}
          <span className="text-xl" aria-hidden="true">
            {isHistoryOpen ? '◀' : '▶'}
          </span>
        </button>
      </div>
    </form>
  );
}
