export default function LandingPage() {
  return (
    <main id="main" className="flex-1">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div 
          className="rounded-3xl p-12 text-center shadow-xl border-4 border-white/50"
          style={{
            background: 'linear-gradient(to bottom right, #e9d5ff, #fce7f3, #dbeafe)'
          }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 drop-shadow-md mb-3">
            Track your mood. Spot the patterns. ✨
          </h2>
          <h3 className="text-3xl font-black text-gray-900 mb-4 drop-shadow-md">Ready to Start Your Journey? 🌱</h3>
            
          <p className="mt-5 text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            Build self-awareness through daily emotional check-ins. Understand what influences your feelings and celebrate your growth.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => window.navigate('/daily')}
              className="inline-flex items-center gap-2 justify-center rounded-full px-8 py-4 text-white text-lg font-bold shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
              style={{
                background: 'linear-gradient(to right, #c084fc, #f472b6)'
              }}
            >
              <span className="text-xl">✍️</span>
              Log Your First Mood
            </button>
            <button
              onClick={() => window.navigate('/trends')}
              className="inline-flex items-center gap-2 justify-center rounded-full bg-white border-4 border-purple-200 px-8 py-4 text-gray-900 text-lg font-bold shadow-lg hover:shadow-2xl hover:bg-purple-50 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              <span className="text-xl">📊</span>
              View Trends
            </button>
          </div>

          {/* Emoji row */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-10 text-7xl">
            <span aria-label="neutral" role="img" className="hover:scale-125 transition-transform cursor-pointer" title="Neutral">😐</span>
            <span aria-label="happy" role="img" className="hover:scale-125 transition-transform cursor-pointer" title="Happy">😊</span>
            <span aria-label="sad" role="img" className="hover:scale-125 transition-transform cursor-pointer" title="Sad">😢</span>
            <span aria-label="cool" role="img" className="hover:scale-125 transition-transform cursor-pointer" title="Cool">😎</span>
            <span aria-label="angry" role="img" className="hover:scale-125 transition-transform cursor-pointer" title="Angry">😡</span>
            <span aria-label="sleepy" role="img" className="hover:scale-125 transition-transform cursor-pointer" title="Sleepy">😴</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div 
          className="rounded-3xl p-12 shadow-xl border-4 border-white/50"
          style={{
            background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff, #dbeafe)'
          }}
        >
          <h3 className="text-4xl font-black text-center text-gray-900 mb-12 drop-shadow-sm">
            How It Works 🌟
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center flex-1">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl text-4xl font-black text-white mb-4 shadow-lg"
                style={{ background: 'linear-gradient(to bottom right, #c084fc, #f472b6)' }}
              >
                1
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Log Your Mood</h4>
              <p className="text-gray-700 font-medium">Pick an emoji and write a quick note about your day</p>
            </div>

            <div className="text-5xl text-gray-400 hidden md:block">→</div>

            <div className="text-center flex-1">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl text-4xl font-black text-white mb-4 shadow-lg"
                style={{ background: 'linear-gradient(to bottom right, #c084fc, #f472b6)' }}
              >
                2
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Reflect Daily</h4>
              <p className="text-gray-700 font-medium">Build a habit of checking in with your emotions</p>
            </div>

            <div className="text-5xl text-gray-400 hidden md:block">→</div>

            <div className="text-center flex-1">
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl text-4xl font-black text-white mb-4 shadow-lg"
                style={{ background: 'linear-gradient(to bottom right, #c084fc, #f472b6)' }}
              >
                3
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Discover Patterns</h4>
              <p className="text-gray-700 font-medium">See trends and understand what affects your wellbeing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h3 className="text-3xl font-black text-center text-gray-900 mb-10 drop-shadow-sm">
          Why Choose MoodBoard? 💭
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <article 
            className="rounded-2xl p-10 shadow-lg border-4 border-white/60 hover:shadow-2xl hover:scale-105 transition-all duration-200"
            style={{
              background: 'linear-gradient(to bottom right, #fce7f3, #fbcfe8)'
            }}
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Quick & Simple</h3>
            <p className="mt-3 text-gray-700 font-medium text-base leading-relaxed">Log your mood in under 30 seconds. No complicated forms or overwhelming questions.</p>
          </article>
          
          <article 
            className="rounded-2xl p-10 shadow-lg border-4 border-white/60 hover:shadow-2xl hover:scale-105 transition-all duration-200"
            style={{
              background: 'linear-gradient(to bottom right, #dbeafe, #bfdbfe)'
            }}
          >
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Visual Insights</h3>
            <p className="mt-3 text-gray-700 font-medium text-base leading-relaxed">Beautiful charts reveal your emotional patterns and help you understand yourself better.</p>
          </article>
          
          <article 
            className="rounded-2xl p-10 shadow-lg border-4 border-white/60 hover:shadow-2xl hover:scale-105 transition-all duration-200"
            style={{
              background: 'linear-gradient(to bottom right, #e9d5ff, #d8b4fe)'
            }}
          >
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">100% Private</h3>
            <p className="mt-3 text-gray-700 font-medium text-base leading-relaxed">Your data never leaves your browser. No accounts, no servers, complete privacy.</p>
          </article>
        </div>
      </section>
    </main>
  );
}