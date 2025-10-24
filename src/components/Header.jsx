export default function Header() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 bg-white px-3 py-2 rounded shadow">
        Skip to content
      </a>

      <header className="w-full bg-gray-200/90 border-b border-gray-300">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">MoodBoard</h1>
          <nav className="mt-3 flex justify-center gap-8 text-gray-800">
            <a href="/" className="underline">Home</a>
            <a href="/daily" className="hover:underline">Daily</a>
            <a href="/trends" className="hover:underline">Trends</a>
          </nav>
        </div>
      </header>
    </>
  );
}
