import { lazy, Suspense, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarView } from '../components/trends/CalendarView.jsx';
import { EmptyState } from '../components/trends/EmptyState.jsx';
import { FiltersPanel } from '../components/trends/FiltersPanel.jsx';
import { IntensitySection } from '../components/trends/IntensitySection.jsx';
import { MoodBreakdown } from '../components/trends/MoodBreakdown.jsx';
import { StatsGrid } from '../components/trends/StatsGrid.jsx';
import { TopTags } from '../components/trends/TopTags.jsx';
import { MoodHeatmap } from '../components/trends/MoodHeatmap.jsx';
import { MoodComparison } from '../components/trends/MoodComparison.jsx';
const TrendsCharts = lazy(() => import('../components/trends/TrendsCharts.jsx').then((m) => ({ default: m.TrendsCharts })));
import { ViewToggle } from '../components/trends/ViewToggle.jsx';
import { ExportImportPanel } from '../components/trends/ExportImportPanel.jsx';
import { useMoodEntries } from '../hooks/useMoodEntries.js';
import { MOODS, FOCUS_RING, getMoodEmoji } from '../constants/moods.js';
import { TrendsContentSkeleton, CalendarViewSkeleton } from '../components/ui/Skeletons.jsx';

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const buildCalendarDays = (entries, month, year) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i += 1) {
    days.push({ isPlaceholder: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const dayEntries = entries.filter((entry) => new Date(entry.date).toDateString() === date.toDateString());
    const latestEntry = dayEntries.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    days.push({
      date,
      entries: dayEntries,
      mood: latestEntry,
      isToday: new Date().toDateString() === date.toDateString(),
    });
  }

  return days;
};

export default function TrendsPage() {
  const navigate = useNavigate();
  const { entries, exportEntries, importEntries } = useMoodEntries();
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMood, setSelectedMood] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState('stats');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEntries = useMemo(() => {
    const now = new Date();
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      let matchesRange = true;

      if (timeRange === 'week') {
        matchesRange = entryDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (timeRange === 'month') {
        matchesRange = entryDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      } else if (timeRange === 'custom') {
        matchesRange = entryDate.getMonth() === selectedMonth && entryDate.getFullYear() === selectedYear;
      }

      const matchesMood = selectedMood === 'all' || entry.mood === selectedMood;
      return matchesRange && matchesMood;
    });
  }, [entries, timeRange, selectedMood, selectedMonth, selectedYear]);

  const moodStats = useMemo(() => filteredEntries.reduce((acc, entry) => ({
    ...acc,
    [entry.mood]: (acc[entry.mood] || 0) + 1,
  }), {}), [filteredEntries]);

  const averageRating = useMemo(() => {
    if (!filteredEntries.length) return '0.0';
    const total = filteredEntries.reduce((sum, entry) => sum + entry.rating, 0);
    return (total / filteredEntries.length).toFixed(1);
  }, [filteredEntries]);

  const mostCommonMood = useMemo(() => {
    const stats = Object.entries(moodStats);
    if (!stats.length) return null;
    return stats.reduce((prev, curr) => (curr[1] > prev[1] ? curr : prev))[0];
  }, [moodStats]);

  const topTags = useMemo(() => {
    const counts = filteredEntries.reduce((acc, entry) => {
      entry.tags?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [filteredEntries]);

  const calendarDays = useMemo(() => buildCalendarDays(entries, selectedMonth, selectedYear), [entries, selectedMonth, selectedYear]);
  const hasAnyEntries = entries.length > 0;
  const filteredCountLabel = filteredEntries.length === 1 ? 'entry' : 'entries';
  const weeklyEntryCount = useMemo(
    () =>
      entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      }).length,
    [entries]
  );

  const moodByDay = useMemo(() => {
    const map = dayLabels.reduce((acc, label) => ({ ...acc, [label]: [] }), {});
    filteredEntries.forEach((entry) => {
      const label = dayLabels[new Date(entry.date).getDay()];
      map[label].push(entry);
    });
    return map;
  }, [filteredEntries]);

  const moodPercentage = useMemo(() => {
    const total = filteredEntries.length || 1;
    return Object.entries(moodStats).reduce((acc, [mood, count]) => {
      acc[mood] = ((count / total) * 100).toFixed(1);
      return acc;
    }, {});
  }, [filteredEntries.length, moodStats]);

  const moodCounts = useMemo(
    () =>
      Object.entries(moodStats)
        .sort((a, b) => b[1] - a[1])
        .reduce((acc, [mood, count]) => ({ ...acc, [mood]: count }), {}),
    [moodStats]
  );

  const topTagsDetailed = useMemo(
    () => topTags.map(([tag, count]) => ({ label: tag, count })),
    [topTags]
  );

  const timeRanges = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'all', label: 'All Time' },
    { value: 'custom', label: 'Custom Month' },
  ];

  return (
    <main id="main" className="flex-1">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 drop-shadow-md mb-3">Your Mood Trends 📊</h2>
          <p className="text-lg text-gray-700 font-medium">Discover patterns and insights about your emotional journey</p>
        </div>

        {!hasAnyEntries ? (
          <div
            className="rounded-3xl p-12 text-center shadow-xl border-4 border-white/50 animate-fade-in"
            style={{ background: 'linear-gradient(to bottom right, #fce7f3, #e9d5ff, #dbeafe)' }}
          >
            <div className="text-8xl mb-6" aria-hidden="true">
              📝
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">No Mood Entries Yet</h3>
            <p className="text-xl text-gray-700 font-medium mb-8">Start logging your moods to see your trends and patterns!</p>
            <button
              type="button"
              onClick={() => navigate('/daily')}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-lg font-bold shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 ${FOCUS_RING}`}
              style={{ background: 'linear-gradient(to right, #c084fc, #f472b6)' }}
            >
              <span aria-hidden="true" className="text-xl">
                ✍️
              </span>
              Log Your First Mood
            </button>

            <div className="mt-8 max-w-3xl mx-auto">
              <ExportImportPanel
                onExport={exportEntries}
                onImport={importEntries}
                focusRing={FOCUS_RING}
              />
            </div>
          </div>
        ) : (
          <>
            <ViewToggle
              viewMode={viewMode}
              setViewMode={setViewMode}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              focusRing={FOCUS_RING}
            />

            <FiltersPanel
              showFilters={showFilters}
              timeRanges={timeRanges}
              selectedRange={timeRange}
              setSelectedRange={setTimeRange}
              moods={[{ value: 'all', label: 'All Moods' }, ...MOODS]}
              selectedMood={selectedMood}
              setSelectedMood={setSelectedMood}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              setShowFilters={setShowFilters}
              focusRing={FOCUS_RING}
            />

            <ExportImportPanel
              onExport={exportEntries}
              onImport={importEntries}
              focusRing={FOCUS_RING}
              className="mb-8"
            />
            {viewMode === 'calendar' ? (
              <CalendarView calendarDays={calendarDays} getMoodEmoji={getMoodEmoji} viewMode={viewMode} />
            ) : viewMode === 'heatmap' ? (
              entries.length === 0 ? (
                <EmptyState viewMode={viewMode} />
              ) : (
                <MoodHeatmap entries={entries} timeRange={timeRange} getMoodEmoji={getMoodEmoji} />
              )
            ) : viewMode === 'compare' ? (
              entries.length === 0 ? (
                <EmptyState viewMode={viewMode} />
              ) : (
                <div className="space-y-6">
                  <MoodComparison entries={entries} comparisonType="weekly" />
                  <MoodComparison entries={entries} comparisonType="monthly" />
                </div>
              )
            ) : filteredEntries.length === 0 ? (
              <EmptyState viewMode={viewMode} />
            ) : (
              <>
                <StatsGrid
                  filteredCount={filteredEntries.length}
                  filteredCountLabel={filteredCountLabel}
                  mostCommonMood={mostCommonMood}
                  getMoodEmoji={getMoodEmoji}
                  averageRating={averageRating}
                  entries={weeklyEntryCount}
                />

                <Suspense
                  fallback={
                    <div className="rounded-3xl p-6 shadow-xl border-2 border-white/70 animate-fade-in" style={{ background: 'linear-gradient(135deg, #f6f7ff, #fff7fb)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                        <div>
                          <p className="text-lg font-bold text-gray-900">Loading charts…</p>
                          <p className="text-sm text-gray-600">Fetching your mood visuals.</p>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <TrendsCharts filteredEntries={filteredEntries} moodStats={moodStats} />
                </Suspense>

                <div
                  className="rounded-3xl p-8 shadow-xl border-2 border-white/70 animate-fade-in"
                  style={{ background: 'linear-gradient(135deg, #f4f7ff, #faf7ff)' }}
                >
                  <div className="grid gap-6">
                    <IntensitySection
                      getMoodEmoji={getMoodEmoji}
                      moodByDay={moodByDay}
                      filteredEntries={filteredEntries}
                      variant="embedded"
                    />

                    <div className="grid lg:grid-cols-2 gap-6">
                      <MoodBreakdown
                        getMoodEmoji={getMoodEmoji}
                        moodPercentage={moodPercentage}
                        moodCounts={moodCounts}
                        variant="embedded"
                      />

                      <TopTags topTags={topTagsDetailed} variant="embedded" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}