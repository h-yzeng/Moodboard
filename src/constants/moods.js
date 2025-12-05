// Shared mood data and UI constants for the MoodBoard application

export const MOODS = [
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

export const QUICK_TAGS = ['Work', 'Family', 'Friends', 'Exercise', 'Health', 'Sleep', 'Hobby', 'Study'];

// Standardized focus ring utility for consistent accessibility styling
export const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

// Helper functions for mood data
export const getMoodEmoji = (mood) => MOODS.find((m) => m.value === mood)?.emoji ?? '😐';
export const getMoodColor = (mood) => MOODS.find((m) => m.value === mood)?.color ?? '#E5E7EB';
export const getMoodLabel = (mood) => MOODS.find((m) => m.value === mood)?.label ?? 'Unknown';

// Generate dynamic year range centered on current year
export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
};
