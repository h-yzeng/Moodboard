export function TopTags({ topTags, variant = 'card' }) {
  const tags = topTags.map((tag) =>
    typeof tag === 'string' ? { label: tag, count: null } : { label: tag.label ?? tag.tag, count: tag.count ?? null }
  );

  const isEmbedded = variant === 'embedded';
  const containerClass = isEmbedded
    ? 'rounded-2xl p-6 bg-white/70 border border-white/60 shadow-sm h-full'
    : 'rounded-3xl p-8 shadow-xl border-2 border-white/70 animate-fade-in';
  const containerStyle = isEmbedded ? undefined : { background: 'linear-gradient(135deg, #f6f7ff, #fff7fb)' };

  return (
    <div className={containerClass} style={containerStyle}>
      <p className="text-lg font-bold text-gray-900 mb-4">Top Tags</p>
      {tags.length === 0 ? (
        <div className="text-sm text-gray-700 bg-white/80 border border-dashed border-gray-200 rounded-2xl p-4">
          <p className="font-semibold">No tags yet.</p>
          <p>Add a few tags to your entries to see which themes stand out.</p>
        </div>
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
