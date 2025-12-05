import { useCallback, useEffect, useState } from 'react';
import { parsePayload, sanitizeEntry, serializePayload } from '../schema/moodSchema.js';

const STORAGE_KEY = 'moodEntriesV1';

const sortEntries = (entries = []) =>
  [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

const readStoredEntries = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    const payload = parsePayload(parsed);
    return sortEntries(payload.entries);
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
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializePayload(sorted)));
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
      const cleanEntry = sanitizeEntry(entry);
      if (!cleanEntry) return;
      persist((prev) => [...prev, cleanEntry]);
    },
    [persist],
  );

  const deleteEntry = useCallback(
    (id) => {
      persist((prev) => prev.filter((entry) => entry.id !== id));
    },
    [persist],
  );

  const exportEntries = useCallback(() => serializePayload(entries), [entries]);

  const importEntries = useCallback(
    (payload) => {
      const parsed = parsePayload(payload);
      const cleaned = sortEntries(parsed.entries);
      persist(cleaned);
      return cleaned.length;
    },
    [persist],
  );

  return { entries, addEntry, deleteEntry, reload, exportEntries, importEntries };
}
