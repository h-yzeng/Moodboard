export function EmptyState({ viewMode }) {
  return (
    <div className="text-center bg-white rounded-3xl p-10 shadow-xl border-2 border-dashed border-gray-200 animate-fade-in">
      <div className="text-5xl mb-3" aria-hidden="true">
        {viewMode === 'calendar' ? '🗓️' : '🌱'}
      </div>
      <p className="text-xl font-bold text-gray-900 mb-2">No entries yet</p>
      <p className="text-gray-600">Add a few mood check-ins to unlock trends and insights.</p>
    </div>
  );
}
