import { useState, useEffect } from 'react';

export default function DailyPage() {
  const [selectedMood, setSelectedMood] = useState('');
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState('');
  const [tags, setTags] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [entries, setEntries] = useState([]);

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😢', label: 'Sad', value: 'sad' },
    { emoji: '😐', label: 'Neutral', value: 'neutral' },
    { emoji: '😡', label: 'Angry', value: 'angry' },
    { emoji: '😎', label: 'Cool', value: 'cool' },
    { emoji: '😴', label: 'Sleepy', value: 'sleepy' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '🥳', label: 'Excited', value: 'excited' },
  ];

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const savedEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    setEntries(savedEntries.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const getMoodEmoji = (mood) => {
    const moodObj = moods.find(m => m.value === mood);
    return moodObj ? moodObj.emoji : '😐';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTodaysDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleSubmit = () => {
    if (!selectedMood) {
      alert('Please select a mood!');
      return;
    }

    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      rating: rating,
      note: note,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
    };

    const existingEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    
    existingEntries.push(entry);
    
    localStorage.setItem('moodEntries', JSON.stringify(existingEntries));

    setShowSuccess(true);
    
    setSelectedMood('');
    setRating(5);
    setNote('');
    setTags('');
    
    loadEntries();

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <main id="main" className="flex-1">
      <section className="mx-auto max-w-7xl px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 drop-shadow-md mb-3">
            How are you feeling today? 💭
          </h2>
          <p className="text-xl text-gray-700 font-bold mb-2">
            {getTodaysDate()}
          </p>
          <p className="text-lg text-gray-700 font-medium">
            Take a moment to check in with yourself
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div 
            className="mb-8 p-4 rounded-2xl border-4 border-white/60 text-center animate-bounce"
            style={{
              background: 'linear-gradient(to right, #d9f99d, #86efac)'
            }}
          >
            <p className="text-xl font-bold text-gray-900">
              ✨ Mood logged successfully! Keep it up! ✨
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mood Entry Form */}
          <div className="lg:col-span-2">
            <div 
              className="rounded-3xl p-10 shadow-xl border-4 border-white/50"
              style={{
                background: 'linear-gradient(to bottom right, #e9d5ff, #fce7f3, #dbeafe)'
              }}
            >
              {/* Mood Selection */}
              <div className="mb-8">
                <label className="block text-2xl font-bold text-gray-900 mb-6 text-center">
                  Select Your Mood
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-6 rounded-2xl border-4 transition-all duration-200 ${
                        selectedMood === mood.value
                          ? 'border-purple-400 shadow-xl scale-110 bg-white'
                          : 'border-white/60 shadow-lg hover:scale-105 bg-white/80'
                      }`}
                    >
                      <div className="text-6xl mb-2">{mood.emoji}</div>
                      <div className="text-sm font-semibold text-gray-800">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Bar */}
              <div className="mb-8">
                <label className="block text-xl font-bold text-gray-900 mb-4 text-center">
                  Intensity Level
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-900">1</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="flex-1 h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #c084fc 0%, #c084fc ${(rating - 1) * 11.11}%, #e5e7eb ${(rating - 1) * 11.11}%, #e5e7eb 100%)`
                    }}
                  />
                  <span className="text-lg font-bold text-gray-900">10</span>
                </div>
                <div className="text-center mt-3">
                  <span className="inline-block px-6 py-2 rounded-full bg-white/80 border-2 border-purple-300 text-2xl font-black text-gray-900">
                    {rating}
                  </span>
                </div>
              </div>

              {/* Note Input */}
              <div className="mb-8">
                <label className="block text-xl font-bold text-gray-900 mb-3">
                  What's on your mind? (Optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Write about your day, what made you feel this way, or anything you'd like to remember..."
                  className="w-full p-4 rounded-2xl border-4 border-white/60 bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-300 resize-none font-medium"
                  rows={6}
                />
              </div>

              {/* Tags Input */}
              <div className="mb-8">
                <label className="block text-xl font-bold text-gray-900 mb-3">
                  Add Tags (Optional)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g., work, family, exercise (comma-separated)"
                  className="w-full p-4 rounded-2xl border-4 border-white/60 bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-300 font-medium"
                />
                <p className="mt-2 text-sm text-gray-700 font-medium">
                  💡 Tip: Use tags to track what influences your mood
                </p>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-white text-xl font-bold shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
                  style={{
                    background: 'linear-gradient(to right, #c084fc, #f472b6)'
                  }}
                >
                  <span className="text-2xl">💾</span>
                  Save Mood Entry
                </button>
              </div>
            </div>
          </div>

          {/* Recent Entries Sidebar */}
          <div className="lg:col-span-1">
            <div 
              className="rounded-3xl p-6 shadow-xl border-4 border-white/50 sticky top-4"
              style={{
                background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff)'
              }}
            >
              <h3 className="text-2xl font-black text-gray-900 mb-6 text-center">
                Recent Entries 📝
              </h3>
              
              {entries.length === 0 ? (
                <p className="text-center text-gray-600 font-medium">No entries yet. Start logging!</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {entries.slice(0, 10).map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-2xl bg-white/80 border-2 border-white shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-4xl">{getMoodEmoji(entry.mood)}</span>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 capitalize">{entry.mood}</div>
                          <div className="text-xs text-gray-600">{formatDate(entry.date)}</div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-purple-200 text-sm font-bold text-gray-900">
                          {entry.rating}/10
                        </div>
                      </div>
                      {entry.note && (
                        <p className="text-sm text-gray-700 line-clamp-2">{entry.note}</p>
                      )}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {entry.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 rounded-full bg-purple-100 text-gray-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}