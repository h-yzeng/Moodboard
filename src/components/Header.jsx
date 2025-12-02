export default function Header({ currentPage = '/' }) {
  return (
    <>
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 bg-white px-4 py-2 rounded-lg shadow-lg border-2 border-blue-300 font-medium text-gray-900"
      >
        Skip to content
      </a>

      <header 
        className="w-full border-b-2 border-white/30 shadow-sm"
        style={{
          background: 'linear-gradient(to right, #E8D5F2, #F5E6F1, #FFE5E5, #FFF0E6, #FFF8E1)'
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-5 text-center">
          <h1 className="text-5xl font-black tracking-tight text-gray-900 drop-shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => window.navigate('/')}
              style={{
                textShadow: '3px 3px 6px rgba(0, 0, 0, 0.2), -1px -1px 2px rgba(255, 255, 255, 0.5)'
              }}>
            MoodBoard
          </h1>
          <p className="text-sm font-medium text-gray-700 mt-1">Your Daily Emotional Check-in 💭</p>
          
          <nav className="mt-4 flex justify-center gap-4 text-base" aria-label="Main navigation">
            <button
              onClick={() => window.navigate('/')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-4 text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 hover:bg-yellow-200 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
                currentPage === '/'
                  ? 'bg-yellow-300 border-yellow-400 scale-105'
                  : 'bg-yellow-100 border-white/60'
              }`}
            >
              <span className="text-lg">🏠</span>
              Home
            </button>
            <button
              onClick={() => window.navigate('/daily')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-4 text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 hover:bg-purple-200 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ${
                currentPage === '/daily'
                  ? 'bg-purple-300 border-purple-400 scale-105'
                  : 'bg-purple-100 border-white/60'
              }`}
            >
              <span className="text-lg">✍️</span>
              Daily
            </button>
            <button
              onClick={() => window.navigate('/trends')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-4 text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 hover:bg-pink-200 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 ${
                currentPage === '/trends'
                  ? 'bg-pink-300 border-pink-400 scale-105'
                  : 'bg-pink-100 border-white/60'
              }`}
            >
              <span className="text-lg">📊</span>
              Trends
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}