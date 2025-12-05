export function EmptyState({ viewMode }) {
  const isCalendar = viewMode === 'calendar';

  return (
    <div
      className="text-center rounded-3xl p-10 shadow-xl border-2 border-dashed border-white/70 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #f6f7ff, #fff7fb)' }}
    >
      <div className="text-5xl mb-3" aria-hidden="true">
        {isCalendar ? '🗓️' : '🌱'}
      </div>
      <p className="text-2xl font-black text-gray-900 mb-2">
        {isCalendar ? 'No days to show' : 'No data for these filters'}
      </p>
      <p className="text-gray-700 font-semibold">
        {isCalendar
          ? 'Add entries this month or pick a different month to view your moods.'
          : 'Try a different time range or mood, or log a new entry to unlock insights.'}
      </p>
    </div>
  );
}
