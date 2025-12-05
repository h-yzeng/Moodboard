/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'moodboard:user-prefs';
const UserPreferencesContext = createContext(null);

const getSystemReduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export function UserPreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(() => {
    if (typeof window === 'undefined') {
      return { reduceMotion: false, highContrast: false, textSize: 'base' };
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (error) {
      console.error('Unable to read user preferences', error);
    }

    return { reduceMotion: getSystemReduceMotion(), highContrast: false, textSize: 'base' };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (error) {
      console.error('Unable to save user preferences', error);
    }
  }, [prefs]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.dataset.reduceMotion = prefs.reduceMotion ? 'true' : 'false';
    root.dataset.highContrast = prefs.highContrast ? 'true' : 'false';
    root.dataset.textSize = prefs.textSize || 'base';
  }, [prefs]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event) => {
      setPrefs((prev) => ({ ...prev, reduceMotion: prev.reduceMotion || event.matches }));
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const value = useMemo(
    () => ({
      prefs,
      toggleReduceMotion: () => setPrefs((prev) => ({ ...prev, reduceMotion: !prev.reduceMotion })),
      toggleHighContrast: () => setPrefs((prev) => ({ ...prev, highContrast: !prev.highContrast })),
      setTextSize: (size) => setPrefs((prev) => ({ ...prev, textSize: size })),
    }),
    [prefs]
  );

  return <UserPreferencesContext.Provider value={value}>{children}</UserPreferencesContext.Provider>;
}

export function useUserPreferences() {
  const ctx = useContext(UserPreferencesContext);
  if (!ctx) {
    throw new Error('useUserPreferences must be used within UserPreferencesProvider');
  }
  return ctx;
}

