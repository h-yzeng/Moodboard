export default function LandingPage() {
  return (
    <main id="main" className="flex-1">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-2xl bg-blue-50/80 p-8 text-center shadow-sm">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Track your mood. Spot the patterns.
          </h2>
          <p className="mt-3 text-gray-600">
            MoodBoard helps you reflect on emotions and visualize growth over time.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/daily"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Start Logging
            </a>
            <a
              href="/trends"
              className="inline-flex items-center justify-center rounded-lg border border-gray-400 px-5 py-3 text-gray-800 bg-white hover:bg-gray-100"
            >
              View Trends
            </a>
          </div>

          {/* Emoji row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-6xl">
            <span aria-label="neutral" role="img">😐</span>
            <span aria-label="happy" role="img">😊</span>
            <span aria-label="sad" role="img">😢</span>
            <span aria-label="cool" role="img">😎</span>
            <span aria-label="angry" role="img">😡</span>
            <span aria-label="sleepy" role="img">😴</span>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold">📝 Daily Reflections</h3>
            <p className="mt-2 text-gray-600">Log a mood, note, and tags in seconds.</p>
          </article>
          <article className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold">📊 Simple Insights</h3>
            <p className="mt-2 text-gray-600">See weekly and monthly mood patterns.</p>
          </article>
          <article className="rounded-xl bg-white p-6 shadow ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold">🔒 Private by Design</h3>
            <p className="mt-2 text-gray-600">All data stays in your browser (LocalStorage).</p>
          </article>
        </div>
      </section>
    </main>
  );
}
