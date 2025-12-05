const VERSION = 1;

const isIsoDate = (value) => {
  if (typeof value !== 'string') return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

export const sanitizeEntry = (entry) => {
  if (!entry || typeof entry !== 'object') return null;
  const { id, mood, rating, tags, note, date } = entry;

  const safeId = typeof id === 'string' ? id : typeof id === 'number' ? String(id) : null;
  if (!safeId || typeof mood !== 'string') return null;
  const numericRating = Number(rating);
  if (Number.isNaN(numericRating) || numericRating < 1 || numericRating > 10) return null;
  if (!isIsoDate(date)) return null;

  const safeTags = Array.isArray(tags) ? tags.filter((tag) => typeof tag === 'string').slice(0, 20) : [];
  const safeNote = typeof note === 'string' ? note : '';

  return {
    id: safeId,
    mood,
    rating: numericRating,
    tags: safeTags,
    note: safeNote,
    date,
  };
};

export const sanitizeEntries = (items) => {
  if (!Array.isArray(items)) return [];
  return items
    .map(sanitizeEntry)
    .filter(Boolean);
};

export const serializePayload = (entries) => ({
  version: VERSION,
  entries,
});

export const parsePayload = (raw) => {
  if (!raw) return { version: VERSION, entries: [] };
  if (Array.isArray(raw)) {
    return { version: 0, entries: sanitizeEntries(raw) };
  }
  if (typeof raw === 'object' && Array.isArray(raw.entries)) {
    return { version: raw.version ?? 0, entries: sanitizeEntries(raw.entries) };
  }
  return { version: VERSION, entries: [] };
};

export const STORAGE_VERSION = VERSION;
