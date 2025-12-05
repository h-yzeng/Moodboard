const focusRing = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export function DataTrustNote({ className = '' }) {
  return (
    <div
      className={`hc-surface rounded-2xl border-2 border-white/70 shadow-md px-4 py-3 flex items-start gap-3 text-sm font-semibold text-gray-800 ${className}`}
      style={{ background: 'linear-gradient(135deg, #f6f7ff, #fff7fb)' }}
      role="status"
      aria-label="Privacy notice"
    >
      <span aria-hidden="true" className="text-lg">🔒</span>
      <div className="flex-1">
        <p className="text-gray-900">Your data stays on this device.</p>
        <p className="text-gray-700 font-medium">No accounts, no servers—entries live in your browser only.</p>
      </div>
      <a
        href="#privacy-details"
        className={`text-purple-700 font-bold hover:underline ${focusRing}`}
      >
        Learn more
      </a>
    </div>
  );
}
