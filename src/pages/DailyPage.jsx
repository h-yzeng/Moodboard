import { useState, useEffect } from 'react';

export default function DailyPage() {
  const [selectedMood, setSelectedMood] = useState('');
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState('');
  const [tags, setTags] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [entries, setEntries] = useState([]);
  const [viewMode, setViewMode] = useState('recent');
  const [selectedEntry, setSelectedEntry] = useState(null);

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

  const quickTags = ['Work', 'Family', 'Friends', 'Exercise', 'Health', 'Sleep', 'Hobby', 'Study'];

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

  const getMoodColor = (mood) => {
    const moodObj = moods.find(m => m.value === mood);
    return moodObj ? moodObj.color : '#E5E7EB';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
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

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Good Morning';
    if (hour < 17) return '☀️ Good Afternoon';
    if (hour < 21) return '🌆 Good Evening';
    return '🌙 Good Night';
  };

  const addQuickTag = (tag) => {
    const currentTags = tags.split(',').map(t => t.trim()).filter(t => t);
    if (!currentTags.includes(tag)) {
      setTags(currentTags.length > 0 ? `${tags}, ${tag}` : tag);
    }
  };

  const removeQuickTag = (tagToRemove) => {
    const currentTags = tags.split(',').map(t => t.trim()).filter(t => t);
    setTags(currentTags.filter(t => t !== tagToRemove).join(', '));
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

  const deleteEntry = (id) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      const existingEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
      const filtered = existingEntries.filter(entry => entry.id !== id);
      localStorage.setItem('moodEntries', JSON.stringify(filtered));
      loadEntries();
      setSelectedEntry(null);
    }
  };

  const displayedEntries = viewMode === 'recent' ? entries.slice(0, 5) : entries;
  const currentTags = tags.split(',').map(t => t.trim()).filter(t => t);

  return (
    <main id="main" className="flex-1">
      <section className="mx-auto max-w-[2000px] min-w-[400px] px-4 py-12 w-full overflow-x-hidden">
        {/* Page Header */}
        <div className="text-center mb-10">
          <p className="text-2xl font-bold text-purple-600 mb-2">{getTimeOfDay()}</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-7 w-full">
          {/* Mood Entry Form */}
          <div className="lg:col-span-7">
            <div 
              className="rounded-3xl p-8 shadow-xl border-4 border-white/50"
              style={{
                background: 'linear-gradient(to bottom right, #e9d5ff, #fce7f3, #dbeafe)'
              }}
            >
              {/* Mood Selection */}
              <div className="mb-8">
                <label className="block text-2xl font-bold text-gray-900 mb-6 text-center">
                  Select Your Mood
                </label>
                <div className="grid grid-cols-10 gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`p-4 rounded-2xl border-4 transition-all duration-200 ${
                        selectedMood === mood.value
                          ? 'border-purple-400 shadow-xl scale-110 bg-white'
                          : 'border-white/60 shadow-lg hover:scale-105 bg-white/80'
                      }`}
                      style={selectedMood === mood.value ? { backgroundColor: mood.color } : {}}
                    >
                      <div className="text-5xl mb-2">{mood.emoji}</div>
                      <div className="text-xs font-semibold text-gray-800">{mood.label}</div>
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
                  <p className="text-sm text-gray-600 mt-2 font-medium">
                    {rating <= 3 ? 'Low intensity' : rating <= 6 ? 'Moderate intensity' : 'High intensity'}
                  </p>
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
                  rows={4}
                />
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">{note.length} characters</span>
                  {note.length > 0 && (
                    <button
                      onClick={() => setNote('')}
                      className="text-sm text-purple-600 hover:text-purple-800 font-semibold"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Tags */}
              <div className="mb-4">
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Quick Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickTags.map((tag) => {
                    const isSelected = currentTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => isSelected ? removeQuickTag(tag) : addQuickTag(tag)}
                        className={`px-4 py-2 rounded-full border-2 font-semibold hover:scale-105 transition-all duration-200 ${
                          isSelected
                            ? 'bg-purple-400 border-purple-400 text-white'
                            : 'bg-white/80 border-purple-200 text-gray-800 hover:bg-purple-100'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tags Input */}
              <div className="mb-8">
                <label className="block text-xl font-bold text-gray-900 mb-3">
                  Custom Tags (Optional)
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

          {/* Entries History Sidebar */}
          <div className="lg:col-span-3">
            <div 
              className="rounded-3xl p-6 shadow-xl border-4 border-white/50 sticky top-4"
              style={{
                background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff)'
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900">
                  Your Entries 📝
                </h3>
              </div>
              
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setViewMode('recent')}
                  className={`flex-1 px-3 py-2 rounded-full text-sm font-bold transition-all ${
                    viewMode === 'recent'
                      ? 'bg-purple-400 text-white'
                      : 'bg-white/60 text-gray-700 hover:bg-white'
                  }`}
                >
                  Recent
                </button>
                <button
                  onClick={() => setViewMode('all')}
                  className={`flex-1 px-3 py-2 rounded-full text-sm font-bold transition-all ${
                    viewMode === 'all'
                      ? 'bg-purple-400 text-white'
                      : 'bg-white/60 text-gray-700 hover:bg-white'
                  }`}
                >
                  All ({entries.length})
                </button>
              </div>
              
              {entries.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-600 font-medium text-sm">No entries yet. Start logging!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
                  {displayedEntries.map((entry) => (
                    <div
                      key={entry.id}
                      onClick={() => setSelectedEntry(selectedEntry === entry.id ? null : entry.id)}
                      className={`p-4 rounded-2xl border-2 shadow-md hover:shadow-lg transition-all cursor-pointer ${
                        selectedEntry === entry.id ? 'border-purple-400 bg-white' : 'border-white bg-white/90'
                      }`}
                      style={{ borderLeftWidth: '6px', borderLeftColor: getMoodColor(entry.mood) }}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-4xl">{getMoodEmoji(entry.mood)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-bold text-gray-900 capitalize text-sm">{entry.mood}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteEntry(entry.id);
                              }}
                              className="text-red-500 hover:text-red-700 text-xl"
                              title="Delete entry"
                            >
                              ×
                            </button>
                          </div>
                          <div className="text-xs text-gray-600 mb-2">
                            {formatDate(entry.date)} • {formatTime(entry.date)}
                          </div>
                          <div className="inline-block px-2 py-1 rounded-full bg-purple-200 text-xs font-bold text-gray-900">
                            {entry.rating}/10
                          </div>
                        </div>
                      </div>
                      {selectedEntry === entry.id && entry.note && (
                        <p className="text-xs text-gray-700 mb-2 mt-3 p-2 bg-white/50 rounded-lg">{entry.note}</p>
                      )}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(selectedEntry === entry.id ? entry.tags : entry.tags.slice(0, 2)).map((tag, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 rounded-full bg-purple-100 text-gray-700">
                              {tag}
                            </span>
                          ))}
                          {selectedEntry !== entry.id && entry.tags.length > 2 && (
                            <span className="text-xs px-2 py-1 text-gray-600">+{entry.tags.length - 2}</span>
                          )}
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