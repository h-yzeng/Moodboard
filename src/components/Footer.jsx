export default function Footer() {
  const affirmations = [
    "You're doing better than you think 💜",
    "Every day is a fresh start 🌅",
    "Your feelings are valid ✨",
    "Progress, not perfection 🌱",
    "Be gentle with yourself 🤗"
  ];
  
  const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];

  return (
    <footer 
      className="w-full border-t-2 border-white/20 mt-auto"
      style={{
        background: 'linear-gradient(to right, #E8D5F2, #F5E6F1, #FFE5E5, #FFF0E6, #FFF8E1)'
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Affirmation */}
        <div className="text-center mb-4 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-purple-200 shadow-sm">
            <span className="w-1 h-6 bg-purple-300 rounded-full" aria-hidden="true" />
            <p className="text-sm font-bold text-purple-800 italic">{randomAffirmation}</p>
          </div>
        </div>

        {/* Privacy & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="text-lg">🔒</span>
            <p className="text-xs font-semibold text-gray-800">
              Your data never leaves your device
            </p>
          </div>
          
          <div className="text-xs font-medium text-gray-800">
            <p>
              © 2025 MoodBoard · Created with by Henry Zeng ·{" "}
              <a
                className="hover:text-purple-700 transition-colors underline decoration-2 font-bold"
                href="https://github.com/h-yzeng/moodboard"
                target="_blank" 
                rel="noreferrer"
              >
                GitHub
              </a>
            </p>
          </div>

          <div className="text-xs">
            <a 
              href="https://988lifeline.org" 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-800 hover:text-purple-700 font-semibold underline transition-colors"
            >
              Need support? 988 Lifeline
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}