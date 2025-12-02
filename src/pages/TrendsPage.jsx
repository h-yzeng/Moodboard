import { useState, useEffect } from 'react';

export default function TrendsPage() {
  const [entries, setEntries] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState('stats');
  const [showFilters, setShowFilters] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy', color: '#FFD6A5' },
    { emoji: '😢', label: 'Sad', value: 'sad', color: '#A0C4FF' },
    { emoji: '😐', label: 'Neutral', value: 'neutral', color: '#E5E7EB' },
    { emoji: '😡', label: 'Angry', value: 'angry', color: '#FFC6FF' },
    { emoji: '😎', label: 'Cool', value: 'cool', color: '#BDB2FF' },
    { emoji: '😴', label: 'Sleepy', value: 'sleepy', color: '#D8B4FE' },
    { emoji: '😰', label: 'Anxious', value: 'anxious', color: '#FBCFE8' },
    { emoji: '🥳', label: 'Excited', value: 'excited', color: '#FDE047' },
    { emoji: '😭', label: 'Crying', value: 'crying', color: '#BAE6FD' },
    { emoji: '🤗', label: 'Grateful', value: 'grateful', color: '#FED7AA' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated', color: '#FECACA' },
    { emoji: '😌', label: 'Peaceful', value: 'peaceful', color: '#BBF7D0' },
    { emoji: '🤔', label: 'Thoughtful', value: 'thoughtful', color: '#E9D5FF' },
    { emoji: '😩', label: 'Tired', value: 'tired', color: '#D1D5DB' },
    { emoji: '🥰', label: 'Loved', value: 'loved', color: '#FBCFE8' },
    { emoji: '😬', label: 'Nervous', value: 'nervous', color: '#FEF3C7' },
    { emoji: '🤩', label: 'Amazed', value: 'amazed', color: '#A7F3D0' },
    { emoji: '😔', label: 'Disappointed', value: 'disappointed', color: '#CBD5E1' },
    { emoji: '😌', label: 'Content', value: 'content', color: '#D9F99D' },
    { emoji: '😵', label: 'Overwhelmed', value: 'overwhelmed', color: '#FCA5A5' },
  ];

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const savedEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    setEntries(savedEntries);
  };

  const getFilteredEntries = () => {
    const now = new Date();
    let filtered = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      let timeMatch = true;
      
      if (timeRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        timeMatch = entryDate >= weekAgo;
      } else if (timeRange === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        timeMatch = entryDate >= monthAgo;
      } else if (timeRange === 'custom') {
        timeMatch = entryDate.getMonth() === selectedMonth && entryDate.getFullYear() === selectedYear;
      }

      const moodMatch = selectedMood === 'all' || entry.mood === selectedMood;
      
      return timeMatch && moodMatch;
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

  const getIntensityStats = () => {
    const low = filteredEntries.filter(e => e.rating <= 3).length;
    const moderate = filteredEntries.filter(e => e.rating > 3 && e.rating <= 6).length;
    const high = filteredEntries.filter(e => e.rating > 6).length;
    return { low, moderate, high };
  };

  const getAverageRating = () => {
    if (filteredEntries.length === 0) return 0;
    const sum = filteredEntries.reduce((acc, entry) => acc + entry.rating, 0);
    return (sum / filteredEntries.length).toFixed(1);
  };

  const moodStats = getMoodStats();
  const intensityStats = getIntensityStats();
  const averageRating = getAverageRating();

  const getMostCommonMood = () => {
    if (Object.keys(moodStats).length === 0) return null;
    return Object.entries(moodStats).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  const getMoodEmoji = (mood) => {
    const moodObj = moods.find(m => m.value === mood);
    return moodObj ? moodObj.emoji : '😐';
  };

  const getMoodColor = (mood) => {
    const moodObj = moods.find(m => m.value === mood);
    return moodObj ? moodObj.color : '#E5E7EB';
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

  const getCalendarDays = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dayEntries = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === date.toDateString();
      });
      days.push({ day, entries: dayEntries });
    }
    
    return days;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const mostCommonMood = getMostCommonMood();
  const topTags = getAllTags().slice(0, 5);
  const calendarDays = getCalendarDays();

  const hasAnyEntries = entries.length > 0;

  return (
    <main id="main" className="flex-1">
      <section className="mx-auto max-w-7xl px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 drop-shadow-md mb-3">
            Your Mood Trends 📊
          </h2>
          <p className="text-lg text-gray-700 font-medium">
            Discover patterns and insights about your emotional journey
          </p>
        </div>

        {/* Only show "no entries" if there are NO entries in the entire system */}
        {!hasAnyEntries ? (
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
            {/* View Mode Toggle and Filters */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
              <button
                onClick={() => setViewMode('stats')}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-200 ${
                  viewMode === 'stats'
                    ? 'bg-purple-400 text-white shadow-lg'
                    : 'bg-white border-4 border-purple-200 text-gray-900 hover:scale-105'
                }`}
              >
                📊 Statistics
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-200 ${
                  viewMode === 'calendar'
                    ? 'bg-purple-400 text-white shadow-lg'
                    : 'bg-white border-4 border-purple-200 text-gray-900 hover:scale-105'
                }`}
              >
                📅 Calendar
              </button>
              {viewMode === 'stats' && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-3 rounded-full bg-white border-4 border-purple-200 text-gray-900 font-bold hover:bg-purple-50 hover:scale-105 transition-all duration-200"
                >
                  {showFilters ? '🔽 Hide Filters' : '🔼 Show Filters'}
                </button>
              )}
            </div>

            {/* Filters Section Content */}
            {viewMode === 'stats' && showFilters && (
              <div className="mb-8">
                <div
                  className="rounded-3xl p-6 shadow-xl border-4 border-white/50 animate-fade-in"
                  style={{
                    background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff)'
                  }}
                >
                  {/* Time Range Filter */}
                    <div className="mb-6">
                      <label className="block text-lg font-bold text-gray-900 mb-3">Time Range</label>
                      <div className="flex flex-wrap justify-center gap-3">
                        <button
                          onClick={() => setTimeRange('week')}
                          className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                            timeRange === 'week'
                              ? 'bg-purple-400 text-white shadow-lg scale-105'
                              : 'bg-white border-2 border-purple-200 text-gray-900 hover:scale-105'
                          }`}
                        >
                          Last 7 Days
                        </button>
                        <button
                          onClick={() => setTimeRange('month')}
                          className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                            timeRange === 'month'
                              ? 'bg-purple-400 text-white shadow-lg scale-105'
                              : 'bg-white border-2 border-purple-200 text-gray-900 hover:scale-105'
                          }`}
                        >
                          Last 30 Days
                        </button>
                        <button
                          onClick={() => setTimeRange('all')}
                          className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                            timeRange === 'all'
                              ? 'bg-purple-400 text-white shadow-lg scale-105'
                              : 'bg-white border-2 border-purple-200 text-gray-900 hover:scale-105'
                          }`}
                        >
                          All Time
                        </button>
                        <button
                          onClick={() => setTimeRange('custom')}
                          className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                            timeRange === 'custom'
                              ? 'bg-purple-400 text-white shadow-lg scale-105'
                              : 'bg-white border-2 border-purple-200 text-gray-900 hover:scale-105'
                          }`}
                        >
                          Custom Month
                        </button>
                      </div>

                      {/* Custom Month/Year Selector */}
                      {timeRange === 'custom' && (
                        <div className="mt-4 flex justify-center gap-4">
                          <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className="px-4 py-2 rounded-full bg-white border-2 border-purple-200 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          >
                            {monthNames.map((month, idx) => (
                              <option key={idx} value={idx}>{month}</option>
                            ))}
                          </select>
                          <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                            className="px-4 py-2 rounded-full bg-white border-2 border-purple-200 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          >
                            {[2024, 2025, 2026, 2027].map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Mood Filter */}
                    <div>
                      <label className="block text-lg font-bold text-gray-900 mb-3">Filter by Mood</label>
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => setSelectedMood('all')}
                          className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                            selectedMood === 'all'
                              ? 'bg-purple-400 text-white shadow-lg scale-105'
                              : 'bg-white border-2 border-purple-200 text-gray-900 hover:scale-105'
                          }`}
                        >
                          All Moods
                        </button>
                        {moods.slice(0, 10).map((mood) => (
                          <button
                            key={mood.value}
                            onClick={() => setSelectedMood(mood.value)}
                            className={`px-3 py-2 rounded-full font-semibold transition-all duration-200 border-2 ${
                              selectedMood === mood.value
                                ? 'shadow-lg scale-105 text-white'
                                : 'bg-white border-purple-200 text-gray-900 hover:scale-105'
                            }`}
                            style={selectedMood === mood.value ? { 
                              backgroundColor: mood.color,
                              borderColor: mood.color
                            } : {}}
                          >
                            {mood.emoji} {mood.label}
                          </button>
                        ))}
                      </div>
                    </div>
                </div>
              </div>
            )}

            {viewMode === 'calendar' ? (
              /* Calendar View */
              <div className="animate-fade-in">
                {/* Calendar Header */}
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={() => {
                      if (selectedMonth === 0) {
                        setSelectedMonth(11);
                        setSelectedYear(selectedYear - 1);
                      } else {
                        setSelectedMonth(selectedMonth - 1);
                      }
                    }}
                    className="px-5 py-3 rounded-full bg-white border-4 border-purple-200 font-bold hover:bg-purple-50 hover:scale-105 hover:shadow-lg transition-all duration-200"
                  >
                    ← Previous
                  </button>
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 px-4">
                    {monthNames[selectedMonth]} {selectedYear}
                  </h3>
                  <button
                    onClick={() => {
                      if (selectedMonth === 11) {
                        setSelectedMonth(0);
                        setSelectedYear(selectedYear + 1);
                      } else {
                        setSelectedMonth(selectedMonth + 1);
                      }
                    }}
                    className="px-5 py-3 rounded-full bg-white border-4 border-purple-200 font-bold hover:bg-purple-50 hover:scale-105 hover:shadow-lg transition-all duration-200"
                  >
                    Next →
                  </button>
                </div>

                {/* Calendar Grid */}
                <div 
                  className="rounded-3xl p-6 shadow-xl border-4 border-white/50"
                  style={{
                    background: 'linear-gradient(to bottom right, #e9d5ff, #fce7f3, #dbeafe)'
                  }}
                >
                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center font-bold text-gray-900 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days - Show ALL emojis */}
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((dayData, idx) => (
                      <div
                        key={idx}
                        className={`min-h-28 rounded-xl p-2 ${
                          dayData 
                            ? 'bg-white/80 border-2 border-white/60 hover:shadow-lg transition-all' 
                            : ''
                        }`}
                      >
                        {dayData && (
                          <>
                            <div className="font-bold text-gray-900 text-sm mb-1">{dayData.day}</div>
                            {dayData.entries.length > 0 && (
                              <div className="flex flex-wrap gap-1 justify-center">
                                {dayData.entries.map((entry, entryIdx) => (
                                  <span 
                                    key={entryIdx} 
                                    className="text-xl"
                                    title={`${entry.mood} - ${entry.rating}/10 at ${formatTime(entry.date)}`}
                                  >
                                    {getMoodEmoji(entry.mood)}
                                  </span>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : filteredEntries.length === 0 ? (
              /* No filtered results message (only in stats view) */
              <div 
                className="rounded-3xl p-12 text-center shadow-xl border-4 border-white/50"
                style={{
                  background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff, #dbeafe)'
                }}
              >
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">No Entries Match Your Filters</h3>
                <p className="text-xl text-gray-700 font-medium mb-8">
                  Try adjusting your time range or mood filter to see more data!
                </p>
                <button
                  onClick={() => {
                    setTimeRange('all');
                    setSelectedMood('all');
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-lg font-bold shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200"
                  style={{
                    background: 'linear-gradient(to right, #c084fc, #f472b6)'
                  }}
                >
                  <span className="text-xl">🔄</span>
                  Reset Filters
                </button>
              </div>
            ) : (
              /* Statistics View */
              <>
                {/* Stats Overview */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
                  <div
                    className="rounded-2xl p-8 text-center shadow-lg border-4 border-white/60 hover:scale-105 hover:shadow-2xl transition-all duration-200 animate-fade-in cursor-pointer"
                    style={{
                      background: 'linear-gradient(to bottom right, #fce7f3, #fbcfe8)',
                      animationDelay: '0s'
                    }}
                  >
                    <div className="text-5xl mb-3 animate-float" style={{animationDelay: '0s'}}>📈</div>
                    <div className="text-4xl font-black text-gray-900 mb-2">{filteredEntries.length}</div>
                    <div className="text-lg font-semibold text-gray-700">Total Entries</div>
                  </div>

                  <div
                    className="rounded-2xl p-8 text-center shadow-lg border-4 border-white/60 hover:scale-105 hover:shadow-2xl transition-all duration-200 animate-fade-in cursor-pointer"
                    style={{
                      background: 'linear-gradient(to bottom right, #dbeafe, #bfdbfe)',
                      animationDelay: '0.1s'
                    }}
                  >
                    <div className="text-5xl mb-3 animate-float" style={{animationDelay: '0.5s'}}>{mostCommonMood ? getMoodEmoji(mostCommonMood) : '😐'}</div>
                    <div className="text-2xl font-black text-gray-900 mb-2 capitalize">{mostCommonMood || 'N/A'}</div>
                    <div className="text-lg font-semibold text-gray-700">Most Common</div>
                  </div>

                  <div
                    className="rounded-2xl p-8 text-center shadow-lg border-4 border-white/60 hover:scale-105 hover:shadow-2xl transition-all duration-200 animate-fade-in cursor-pointer"
                    style={{
                      background: 'linear-gradient(to bottom right, #e9d5ff, #d8b4fe)',
                      animationDelay: '0.2s'
                    }}
                  >
                    <div className="text-5xl mb-3 animate-float" style={{animationDelay: '1s'}}>⭐</div>
                    <div className="text-4xl font-black text-gray-900 mb-2">{averageRating}/10</div>
                    <div className="text-lg font-semibold text-gray-700">Average Intensity</div>
                  </div>

                  <div
                    className="rounded-2xl p-8 text-center shadow-lg border-4 border-white/60 hover:scale-105 hover:shadow-2xl transition-all duration-200 animate-fade-in cursor-pointer"
                    style={{
                      background: 'linear-gradient(to bottom right, #fef9c3, #fde047)',
                      animationDelay: '0.3s'
                    }}
                  >
                    <div className="text-5xl mb-3 animate-float" style={{animationDelay: '1.5s'}}>🔥</div>
                    <div className="text-4xl font-black text-gray-900 mb-2">
                      {entries.filter(e => {
                        const entryDate = new Date(e.date);
                        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                        return entryDate >= weekAgo;
                      }).length}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">This Week</div>
                  </div>
                </div>

                {/* Intensity Breakdown */}
                <div 
                  className="rounded-3xl p-10 shadow-xl border-4 border-white/50 mb-10"
                  style={{
                    background: 'linear-gradient(to bottom right, #fef9c3, #d9f99d, #dbeafe)'
                  }}
                >
                  <h3 className="text-3xl font-black text-center text-gray-900 mb-8">Intensity Distribution</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-6xl mb-3">🟢</div>
                      <div className="text-3xl font-black text-gray-900 mb-2">{intensityStats.low}</div>
                      <div className="text-lg font-semibold text-gray-700">Low (1-3)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {filteredEntries.length > 0 ? ((intensityStats.low / filteredEntries.length) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl mb-3">🟡</div>
                      <div className="text-3xl font-black text-gray-900 mb-2">{intensityStats.moderate}</div>
                      <div className="text-lg font-semibold text-gray-700">Moderate (4-6)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {filteredEntries.length > 0 ? ((intensityStats.moderate / filteredEntries.length) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl mb-3">🔴</div>
                      <div className="text-3xl font-black text-gray-900 mb-2">{intensityStats.high}</div>
                      <div className="text-lg font-semibold text-gray-700">High (7-10)</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {filteredEntries.length > 0 ? ((intensityStats.high / filteredEntries.length) * 100).toFixed(1) : 0}%
                      </div>
                    </div>
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
                    {Object.entries(moodStats)
                      .sort((a, b) => b[1] - a[1])
                      .map(([mood, count]) => {
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
                                    backgroundColor: getMoodColor(mood)
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
                      className="px-6 py-3 rounded-full bg-white border-4 border-white/60 shadow-lg hover:scale-105 transition-transform"
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
        </>
      )}
      </section>
    </main>
  );
}