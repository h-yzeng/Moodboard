import { useState, useEffect } from 'react';

export default function TrendsPage() {
  const [entries, setEntries] = useState([]);
  const [timeRange, setTimeRange] = useState('week'); 

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    setEntries(savedEntries);
  }, []);

  const getFilteredEntries = () => {
    const now = new Date();
    const filtered = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      if (timeRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return entryDate >= weekAgo;
      } else if (timeRange === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return entryDate >= monthAgo;
      }
      return true;
    });
    return filtered;
  };

  const filteredEntries = getFilteredEntries();

  const getMoodStats = () => {
    const moodCounts = {};
    filteredEntries.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    return moodCounts;
  };

  const moodStats = getMoodStats();

  const getMostCommonMood = () => {
    if (Object.keys(moodStats).length === 0) return null;
    return Object.entries(moodStats).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  const getMoodEmoji = (mood) => {
    const emojiMap = {
      happy: '😊',
      sad: '😢',
      neutral: '😐',
      angry: '😡',
      cool: '😎',
      sleepy: '😴',
      anxious: '😰',
      excited: '🥳'
    };
    return emojiMap[mood] || '😐';
  };

  const getAllTags = () => {
    const tagCounts = {};
    filteredEntries.forEach(entry => {
      entry.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  };

  const mostCommonMood = getMostCommonMood();
  const topTags = getAllTags().slice(0, 5);

  return (
    <main id="main" className="flex-1">
      <section className="mx-auto max-w-6xl px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 drop-shadow-md mb-3">
            Your Mood Trends 📊
          </h2>
          <p className="text-lg text-gray-700 font-medium">
            Discover patterns and insights about your emotional journey
          </p>
        </div>

        {/* Time Range Filter */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-200 ${
              timeRange === 'week'
                ? 'bg-purple-400 text-white shadow-lg scale-110'
                : 'bg-white border-4 border-purple-200 text-gray-900 hover:scale-105'
            }`}
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-200 ${
              timeRange === 'month'
                ? 'bg-purple-400 text-white shadow-lg scale-110'
                : 'bg-white border-4 border-purple-200 text-gray-900 hover:scale-105'
            }`}
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setTimeRange('all')}
            className={`px-6 py-3 rounded-full font-bold transition-all duration-200 ${
              timeRange === 'all'
                ? 'bg-purple-400 text-white shadow-lg scale-110'
                : 'bg-white border-4 border-purple-200 text-gray-900 hover:scale-105'
            }`}
          >
            All Time
          </button>
        </div>

        {/* Check if there are entries */}
        {filteredEntries.length === 0 ? (
          <div 
            className="rounded-3xl p-12 text-center shadow-xl border-4 border-white/50"
            style={{
              background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff, #dbeafe)'
            }}
          >
            <div className="text-8xl mb-6">📝</div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">No Mood Entries Yet</h3>
            <p className="text-xl text-gray-700 font-medium mb-8">
              Start logging your moods to see your trends and patterns!
            </p>
            <button
              onClick={() => window.navigate('/daily')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-lg font-bold shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
              style={{
                background: 'linear-gradient(to right, #c084fc, #f472b6)'
              }}
            >
              <span className="text-xl">✍️</span>
              Log Your First Mood
            </button>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid gap-6 md:grid-cols-3 mb-10">
              {/* Total Entries */}
              <div 
                className="rounded-2xl p-8 text-center shadow-lg border-4 border-white/60"
                style={{
                  background: 'linear-gradient(to bottom right, #fce7f3, #fbcfe8)'
                }}
              >
                <div className="text-5xl mb-3">📈</div>
                <div className="text-4xl font-black text-gray-900 mb-2">{filteredEntries.length}</div>
                <div className="text-lg font-semibold text-gray-700">Total Entries</div>
              </div>

              {/* Most Common Mood */}
              <div 
                className="rounded-2xl p-8 text-center shadow-lg border-4 border-white/60"
                style={{
                  background: 'linear-gradient(to bottom right, #dbeafe, #bfdbfe)'
                }}
              >
                <div className="text-5xl mb-3">{mostCommonMood ? getMoodEmoji(mostCommonMood) : '😐'}</div>
                <div className="text-2xl font-black text-gray-900 mb-2 capitalize">{mostCommonMood || 'N/A'}</div>
                <div className="text-lg font-semibold text-gray-700">Most Common Mood</div>
              </div>

              {/* Streak */}
              <div 
                className="rounded-2xl p-8 text-center shadow-lg border-4 border-white/60"
                style={{
                  background: 'linear-gradient(to bottom right, #e9d5ff, #d8b4fe)'
                }}
              >
                <div className="text-5xl mb-3">🔥</div>
                <div className="text-4xl font-black text-gray-900 mb-2">{Math.min(filteredEntries.length, 7)}</div>
                <div className="text-lg font-semibold text-gray-700">Day Streak</div>
              </div>
            </div>

            {/* Mood Breakdown */}
            <div 
              className="rounded-3xl p-10 shadow-xl border-4 border-white/50 mb-10"
              style={{
                background: 'linear-gradient(to bottom right, #e9d5ff, #fce7f3, #dbeafe)'
              }}
            >
              <h3 className="text-3xl font-black text-center text-gray-900 mb-8">Mood Breakdown</h3>
              <div className="space-y-4">
                {Object.entries(moodStats).map(([mood, count]) => {
                  const percentage = ((count / filteredEntries.length) * 100).toFixed(1);
                  return (
                    <div key={mood} className="flex items-center gap-4">
                      <div className="text-4xl">{getMoodEmoji(mood)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="font-bold text-gray-900 capitalize">{mood}</span>
                          <span className="font-bold text-gray-700">{count} times ({percentage}%)</span>
                        </div>
                        <div className="w-full bg-white/60 rounded-full h-4 border-2 border-white">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                              background: 'linear-gradient(to right, #c084fc, #f472b6)'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Tags */}
            {topTags.length > 0 && (
              <div 
                className="rounded-3xl p-10 shadow-xl border-4 border-white/50"
                style={{
                  background: 'linear-gradient(to bottom right, #e9d5ff, #fce7f3, #dbeafe)'
                }}
              >
                <h3 className="text-3xl font-black text-center text-gray-900 mb-8">Top Influences 🏷️</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {topTags.map(([tag, count]) => (
                    <div
                      key={tag}
                      className="px-6 py-3 rounded-full bg-white border-4 border-white/60 shadow-lg"
                    >
                      <span className="font-bold text-gray-900">{tag}</span>
                      <span className="ml-2 text-gray-600">({count})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}