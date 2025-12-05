export function TopTags({ topTags }) {
  const tags = topTags.map((tag) =>
    typeof tag === 'string' ? { label: tag, count: null } : { label: tag.label ?? tag.tag, count: tag.count ?? null }
  );

  return (
    <div
      className="rounded-3xl p-8 shadow-xl border-2 border-white/70 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #f6f7ff, #fff7fb)' }}
    >
      <p className="text-lg font-bold text-gray-900 mb-4">Top Tags</p>
      {tags.length === 0 ? (
        <p className="text-sm text-gray-600">No tags logged yet. Add tags to see insights!</p>
      ) : (
        <div className="flex flex-wrap gap-3" aria-live="polite">
          {tags.map((tag) => (
            <div
              key={tag.label}
              className="px-4 py-2 rounded-full bg-linear-to-r from-purple-50 via-pink-50 to-blue-50 border border-white/70 text-purple-700 font-semibold shadow-sm hover:-translate-y-0.5 transition-transform duration-150"
            >
              #{tag.label}
              {tag.count !== null && <span className="ml-2 text-purple-500 font-semibold">({tag.count})</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
