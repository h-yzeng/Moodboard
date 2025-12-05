const steps = [
  {
    number: 1,
    title: 'Log Your Mood',
    description: 'Pick an emoji and write a quick note about your day.',
    icon: '📝'
  },
  {
    number: 2,
    title: 'Reflect Daily',
    description: 'Build a habit of checking in with your emotions.',
    icon: '🔁'
  },
  {
    number: 3,
    title: 'Discover Patterns',
    description: 'See trends and understand what affects your wellbeing.',
    icon: '📈'
  }
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-3 sm:px-4 pb-16">
      <div
        className="rounded-3xl p-12 shadow-xl border-4 border-white/50 relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff, #dbeafe)' }}
      >
        <div className="absolute -top-8 right-6 w-24 h-24 bg-white/40 blur-3xl rounded-full" aria-hidden="true" />
        <div className="absolute -bottom-10 left-10 w-28 h-28 bg-purple-100/50 blur-3xl rounded-full" aria-hidden="true" />

        <h3 className="text-4xl font-black text-center text-gray-900 mb-12 drop-shadow-sm animate-fade-up" style={{ animationDelay: '60ms' }}>
          How It Works 🌟
        </h3>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="text-center flex flex-col items-center gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/70 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-200 animate-fade-up"
              style={{ animationDelay: `${120 + idx * 80}ms` }}
            >
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl font-black text-white shadow-lg animate-float-tilt"
                style={{ background: 'linear-gradient(to bottom right, #c084fc, #f472b6)' }}
                aria-hidden="true"
              >
                {step.icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{step.title}</h4>
              <p className="text-gray-700 font-medium leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
