const focusRingDefault = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const features = [
  {
    title: 'Quick & Simple',
    description: 'Log your mood in under 30 seconds. No complicated forms or overwhelming questions.',
    icon: '📝',
    background: 'linear-gradient(to bottom right, #fce7f3, #fbcfe8)'
  },
  {
    title: 'Visual Insights',
    description: 'Beautiful charts reveal your emotional patterns and help you understand yourself better.',
    icon: '📊',
    background: 'linear-gradient(to bottom right, #dbeafe, #bfdbfe)'
  },
  {
    title: '100% Private',
    description: 'Your data never leaves your browser. No accounts, no servers, complete privacy.',
    icon: '🔒',
    background: 'linear-gradient(to bottom right, #e9d5ff, #d8b4fe)'
  }
];

export function FeatureGrid({ focusRing = focusRingDefault }) {
  return (
    <section className="mx-auto max-w-6xl px-3 sm:px-4 pb-16">
      <h3 className="text-3xl font-black text-center text-gray-900 mb-10 drop-shadow-sm animate-fade-up" style={{ animationDelay: '80ms' }}>
        Why Choose MoodBoard? 💭
      </h3>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <article
            key={feature.title}
            className="group rounded-2xl p-10 shadow-xl ring-1 ring-white/60 border-4 border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-200 animate-fade-up"
            style={{ background: feature.background, animationDelay: `${120 + idx * 80}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-6xl" aria-hidden="true">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="mt-3 text-gray-700 font-medium text-base leading-relaxed">{feature.description}</p>
            <button
              type="button"
              className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-700 group-hover:text-purple-900 transition-colors ${focusRing}`}
            >
              Learn more
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
