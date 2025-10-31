import { useState } from 'react';

export default function DailyPage() {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [tags, setTags] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleSubmit = () => {
    if (!selectedMood) {
      alert('Please select a mood!');
      return;
    }

    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      note: note,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
    };

    const existingEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    
    existingEntries.push(entry);
    
    localStorage.setItem('moodEntries', JSON.stringify(existingEntries));

    setShowSuccess(true);
    
    setSelectedMood('');
    setNote('');
    setTags('');

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <main id="main" className="flex-1">
      <section className="mx-auto max-w-4xl px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 drop-shadow-md mb-3">
            How are you feeling today? 💭
          </h2>
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

        {/* Mood Entry Form */}
        <div>
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
      </section>
    </main>
  );
}