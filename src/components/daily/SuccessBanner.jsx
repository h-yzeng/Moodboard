export function SuccessBanner({ message }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mb-8 p-4 rounded-2xl border-4 border-white/60 text-center animate-bounce"
      style={{
        background: 'linear-gradient(to right, #d9f99d, #86efac)',
      }}
    >
      <p className="text-xl font-bold text-gray-900">{message}</p>
    </div>
  );
}
