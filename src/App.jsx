export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <header className="w-full bg-gray-200 py-4 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">MoodBoard</h1>
        <nav className="mt-2 flex justify-center gap-6 text-gray-700">
          <a href="#" className="hover:underline font-medium">Home</a>
          <a href="#" className="hover:underline font-medium">Daily</a>
          <a href="#" className="hover:underline font-medium">Trends</a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold mb-2">Track your mood. Spot the patterns.</h2>
        <p className="text-gray-600 mb-6 max-w-lg">
          MoodBoard helps you reflect on emotions and visualize your growth.
        </p>

        <div className="flex gap-4 mb-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow">
            Start Logging
          </button>
          <button className="border border-gray-400 px-5 py-2 rounded-lg hover:bg-gray-100">
            View Trends
          </button>
        </div>

        <div className="flex gap-4 text-5xl">
          <span>😐</span>
          <span>😊</span>
          <span>😢</span>
          <span>😎</span>
          <span>😡</span>
          <span>😴</span>
        </div>
      </main>

      <footer className="w-full bg-gray-200 py-3 text-center text-sm text-gray-600 mt-auto">
        © 2025 MoodBoard | Created by Henry Zeng | GitHub
      </footer>
    </div>
  );
}
