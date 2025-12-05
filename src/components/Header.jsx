import { Link, NavLink } from 'react-router-dom';
import { UserPrefsBar } from './UserPrefsBar.jsx';

const focusRing = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export default function Header() {
  return (
    <>
      <a 
        href="#main" 
        className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 bg-white px-4 py-2 rounded-lg shadow-lg border-2 border-blue-300 font-medium text-gray-900 ${focusRing}`}
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
          <Link
            to="/"
            className={`inline-block ${focusRing}`}
          >
            <h1
              className="text-5xl font-black tracking-tight text-gray-900 drop-shadow-lg hover:scale-105 transition-transform duration-300"
              style={{
                textShadow: '3px 3px 6px rgba(0, 0, 0, 0.2), -1px -1px 2px rgba(255, 255, 255, 0.5)'
              }}
            >
              MoodBoard
            </h1>
          </Link>
          <p className="text-sm font-medium text-gray-700 mt-1">Your Daily Emotional Check-in 💭</p>
          
          <nav className="mt-4 flex justify-center gap-4 text-base" aria-label="Main navigation">
            {[
              { to: '/', label: 'Home', icon: '🏠', activeClasses: 'bg-yellow-300 border-yellow-400 scale-110 shadow-xl ring-2 ring-white/80', base: 'bg-yellow-100 border-white/60 hover:bg-yellow-200 opacity-90' },
              { to: '/daily', label: 'Daily', icon: '✍️', activeClasses: 'bg-purple-300 border-purple-400 scale-110 shadow-xl ring-2 ring-white/80', base: 'bg-purple-100 border-white/60 hover:bg-purple-200 opacity-90' },
              { to: '/trends', label: 'Trends', icon: '📊', activeClasses: 'bg-pink-300 border-pink-400 scale-110 shadow-xl ring-2 ring-white/80', base: 'bg-pink-100 border-white/60 hover:bg-pink-200 opacity-90' }
            ].map(({ to, label, icon, activeClasses, base }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-4 text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 ease-out ${focusRing} ${isActive ? activeClasses : base}`}
              >
                <span className="text-lg">{icon}</span>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <UserPrefsBar />
      </header>
    </>
  );
}