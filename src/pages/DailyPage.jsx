import { useMemo, useState } from 'react';
import { useMoodEntries } from '../hooks/useMoodEntries.js';
import { SuccessBanner } from '../components/daily/SuccessBanner.jsx';
import { MoodEntryForm } from '../components/daily/MoodEntryForm.jsx';
import { HistoryPanel } from '../components/daily/HistoryPanel.jsx';

const focusRing = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

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
    day: 'numeric',
  });
};

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return '🌅 Good Morning';
  if (hour < 17) return '☀️ Good Afternoon';
  if (hour < 21) return '🌆 Good Evening';
  return '🌙 Good Night';
};

const getMoodEmoji = (mood) => moods.find((m) => m.value === mood)?.emoji ?? '😐';
const getMoodColor = (mood) => moods.find((m) => m.value === mood)?.color ?? '#E5E7EB';

export default function DailyPage() {
  const { entries, addEntry, deleteEntry } = useMoodEntries();
  const [selectedMood, setSelectedMood] = useState('');
  const [rating, setRating] = useState(5);
  const [note, setNote] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [viewMode, setViewMode] = useState('recent');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [formError, setFormError] = useState('');

  const currentTags = useMemo(() => tagInput.split(',').map((tag) => tag.trim()).filter(Boolean), [tagInput]);

  const resetForm = () => {
    setSelectedMood('');
    setRating(5);
    setNote('');
    setTagInput('');
  };

  const clearNote = () => setNote('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedMood) {
      setFormError('Select a mood to continue.');
      return;
    }

    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      rating,
      note: note.trim(),
      tags: currentTags,
    };

    addEntry(entry);
    setFormError('');
    setShowSuccess(true);
    resetForm();
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleQuickTagToggle = (tag) => {
    const tagsSet = new Set(currentTags);
    if (tagsSet.has(tag)) {
      tagsSet.delete(tag);
    } else {
      tagsSet.add(tag);
    }
    setTagInput(Array.from(tagsSet).join(', '));
  };

  return (
    <main id="main" className="flex-1">
      <section className="mx-auto max-w-[2000px] px-3 sm:px-4 py-12 w-full overflow-x-hidden">
        <div className="text-center mb-10">
          <p className="text-2xl font-bold text-purple-600 mb-2" aria-live="polite">
            {getTimeOfDay()}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 drop-shadow-md mb-3">How are you feeling today? 💭</h2>
          <p className="text-xl text-gray-700 font-bold mb-2">{getTodaysDate()}</p>
          <p className="text-lg text-gray-700 font-medium">Take a moment to check in with yourself</p>
        </div>

        {showSuccess && <SuccessBanner message="✨ Mood logged successfully! Keep it up! ✨" />}

        <div className={`grid grid-cols-1 gap-7 w-full transition-all duration-500 ${showHistory ? 'lg:grid-cols-10' : ''}`}>
          <div className={`transition-all duration-500 ${showHistory ? 'lg:col-span-7' : 'lg:col-span-1 max-w-8xl mx-auto'}`}>
            <MoodEntryForm
              moods={moods}
              quickTags={quickTags}
              focusRing={focusRing}
              selectedMood={selectedMood}
              onMoodSelect={setSelectedMood}
              rating={rating}
              onRatingChange={setRating}
              note={note}
              onNoteChange={setNote}
              onClearNote={clearNote}
              tagInput={tagInput}
              onTagInputChange={setTagInput}
              currentTags={currentTags}
              onQuickTagToggle={handleQuickTagToggle}
              onSubmit={handleSubmit}
              isHistoryOpen={showHistory}
              toggleHistory={() => setShowHistory((prev) => !prev)}
              entryCount={entries.length}
              formError={formError}
            />
          </div>

          <HistoryPanel
            isVisible={showHistory}
            entries={entries}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedEntry={selectedEntry}
            setSelectedEntry={setSelectedEntry}
            onDelete={(id) => {
              deleteEntry(id);
              setSelectedEntry((prev) => (prev === id ? null : prev));
            }}
            formatDate={formatDate}
            formatTime={formatTime}
            getMoodEmoji={getMoodEmoji}
            getMoodColor={getMoodColor}
            focusRing={focusRing}
          />
        </div>
      </section>
    </main>
  );
}