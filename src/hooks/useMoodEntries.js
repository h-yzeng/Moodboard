import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'moodEntries';

const sortEntries = (entries = []) =>
  [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

const readStoredEntries = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Unable to read mood entries', error);
    return [];
  }
};

export function useMoodEntries() {
  const [entries, setEntries] = useState(() => sortEntries(readStoredEntries()));

  const persist = useCallback((updater) => {
    setEntries((prev) => {
      const nextEntries = typeof updater === 'function' ? updater(prev) : updater;
      const sorted = sortEntries(nextEntries);

      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
        } catch (error) {
          console.error('Unable to save mood entries', error);
        }
      }

      return sorted;
    });
  }, []);

  const reload = useCallback(() => {
    setEntries(sortEntries(readStoredEntries()));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const addEntry = useCallback(
    (entry) => {
      persist((prev) => [...prev, entry]);
    },
    [persist],
  );

  const deleteEntry = useCallback(
    (id) => {
      persist((prev) => prev.filter((entry) => entry.id !== id));
    },
    [persist],
  );

  return { entries, addEntry, deleteEntry, reload };
}
