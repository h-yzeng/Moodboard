export default function TrendsPage() {
  return (
    <main id="main" className="flex-1 flex items-center justify-center px-4 py-20">
      <div 
        className="rounded-3xl p-12 text-center shadow-xl border-4 border-white/50 max-w-2xl"
        style={{
          background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff, #dbeafe)'
        }}
      >
        <div className="text-8xl mb-6">📊</div>
        <h2 className="text-4xl font-black text-gray-900 mb-4 drop-shadow-md">
          Mood Trends & Analytics
        </h2>
        <p className="text-xl text-gray-700 font-medium mb-6">
          This feature is currently in development.
        </p>
        <button
          onClick={() => window.navigate('/')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-lg font-bold shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
          style={{
            background: 'linear-gradient(to right, #c084fc, #f472b6)'
          }}
        >
          <span className="text-xl">🏠</span>
          Back to Home
        </button>
      </div>
    </main>
  );
}