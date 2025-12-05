import { useMemo } from 'react';
import { getMoodEmoji } from '../../constants/moods.js';

/**
 * MoodComparison - Compare mood patterns across different time periods
 * Shows side-by-side weekly or monthly comparisons
 */
export function MoodComparison({ entries, comparisonType = 'weekly' }) {
  const comparisonData = useMemo(() => {
    const now = new Date();
    
    if (comparisonType === 'weekly') {
      // Compare last 4 weeks
      const weeks = [];
      
      for (let i = 0; i < 4; i++) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (i * 7) - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        
        const weekEntries = entries.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= weekStart && entryDate <= weekEnd;
        });
        
        const moodCounts = weekEntries.reduce((acc, entry) => {
          acc[entry.mood] = (acc[entry.mood] || 0) + 1;
          return acc;
        }, {});
        
        const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
        const avgIntensity = weekEntries.length > 0
          ? (weekEntries.reduce((sum, e) => sum + e.rating, 0) / weekEntries.length).toFixed(1)
          : '0.0';
        
        weeks.push({
          label: i === 0 ? 'This Week' : i === 1 ? 'Last Week' : `${i + 1} Weeks Ago`,
          shortLabel: i === 0 ? 'This' : i === 1 ? 'Last' : `-${i + 1}w`,
          startDate: weekStart,
          endDate: weekEnd,
          entryCount: weekEntries.length,
          topMood: topMood ? topMood[0] : null,
          topMoodCount: topMood ? topMood[1] : 0,
          avgIntensity,
          moodCounts,
          entries: weekEntries,
        });
      }
      
      return weeks;
    } else {
      // Compare last 4 months
      const months = [];
      
      for (let i = 0; i < 4; i++) {
        const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
        
        const monthEntries = entries.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= monthStart && entryDate <= monthEnd;
        });
        
        const moodCounts = monthEntries.reduce((acc, entry) => {
          acc[entry.mood] = (acc[entry.mood] || 0) + 1;
          return acc;
        }, {});
        
        const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
        const avgIntensity = monthEntries.length > 0
          ? (monthEntries.reduce((sum, e) => sum + e.rating, 0) / monthEntries.length).toFixed(1)
          : '0.0';
        
        const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });
        
        months.push({
          label: i === 0 ? 'This Month' : monthName,
          shortLabel: monthName,
          startDate: monthStart,
          endDate: monthEnd,
          entryCount: monthEntries.length,
          topMood: topMood ? topMood[0] : null,
          topMoodCount: topMood ? topMood[1] : 0,
          avgIntensity,
          moodCounts,
          entries: monthEntries,
        });
      }
      
      return months;
    }
  }, [entries, comparisonType]);

  // Calculate trend (comparing first period to previous)
  const trend = useMemo(() => {
    if (comparisonData.length < 2) return null;
    
    const current = comparisonData[0];
    const previous = comparisonData[1];
    
    if (previous.entryCount === 0) return null;
    
    const intensityChange = parseFloat(current.avgIntensity) - parseFloat(previous.avgIntensity);
    const entryChange = current.entryCount - previous.entryCount;
    
    return {
      intensityChange: intensityChange.toFixed(1),
      intensityDirection: intensityChange > 0 ? 'up' : intensityChange < 0 ? 'down' : 'same',
      entryChange,
      entryDirection: entryChange > 0 ? 'up' : entryChange < 0 ? 'down' : 'same',
    };
  }, [comparisonData]);

  const maxEntries = Math.max(...comparisonData.map(d => d.entryCount), 1);

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-white/70 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #f5f8ff, #fef5ff)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <p className="text-lg font-bold text-gray-900">
            {comparisonType === 'weekly' ? 'Weekly' : 'Monthly'} Mood Comparison
          </p>
          <p className="text-sm text-gray-600">
            Compare your emotional patterns over time
          </p>
        </div>
        
        {/* Trend indicator */}
        {trend && (
          <div className="flex items-center gap-3 text-sm">
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-semibold ${
              trend.intensityDirection === 'up' 
                ? 'bg-amber-100 text-amber-800' 
                : trend.intensityDirection === 'down'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-gray-100 text-gray-700'
            }`}>
              <span aria-hidden="true">
                {trend.intensityDirection === 'up' ? '📈' : trend.intensityDirection === 'down' ? '📉' : '➡️'}
              </span>
              <span>
                {trend.intensityDirection === 'up' ? '+' : ''}{trend.intensityChange} intensity
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Comparison cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {comparisonData.map((period, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-4 sm:p-5 border-2 transition-all duration-200 hover:shadow-lg ${
              idx === 0 
                ? 'bg-white border-purple-200 shadow-md' 
                : 'bg-white/70 border-white/60 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs sm:text-sm font-bold ${idx === 0 ? 'text-purple-700' : 'text-gray-600'}`}>
                <span className="hidden sm:inline">{period.label}</span>
                <span className="sm:hidden">{period.shortLabel}</span>
              </span>
              {idx === 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-semibold">
                  Current
                </span>
              )}
            </div>
            
            {/* Top mood */}
            <div className="text-center mb-3">
              <div className="text-3xl sm:text-4xl mb-1">
                {period.topMood ? getMoodEmoji(period.topMood) : '😶'}
              </div>
              <p className="text-xs font-semibold text-gray-700 capitalize">
                {period.topMood || 'No data'}
              </p>
            </div>
            
            {/* Stats */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 font-medium">Entries</span>
                <span className="font-bold text-gray-900">{period.entryCount}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
                  style={{ width: `${(period.entryCount / maxEntries) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 font-medium">Avg Intensity</span>
                <span className="font-bold text-gray-900">{period.avgIntensity}/10</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed mood breakdown */}
      <div className="bg-white/60 rounded-2xl p-4 sm:p-5 border border-white/50">
        <p className="text-sm font-bold text-gray-800 mb-4">Mood Distribution by Period</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-semibold text-gray-600">Mood</th>
                {comparisonData.map((period, idx) => (
                  <th key={idx} className="text-center py-2 font-semibold text-gray-600 px-2">
                    <span className="hidden sm:inline">{period.label}</span>
                    <span className="sm:hidden">{period.shortLabel}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Get all unique moods across all periods */}
              {Array.from(new Set(comparisonData.flatMap(p => Object.keys(p.moodCounts))))
                .slice(0, 5)
                .map((mood) => (
                  <tr key={mood} className="border-b border-gray-100 last:border-0">
                    <td className="py-2 flex items-center gap-2">
                      <span aria-hidden="true">{getMoodEmoji(mood)}</span>
                      <span className="capitalize font-medium text-gray-800 hidden sm:inline">{mood}</span>
                    </td>
                    {comparisonData.map((period, idx) => (
                      <td key={idx} className="text-center py-2 font-semibold text-gray-700">
                        {period.moodCounts[mood] || 0}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick insights */}
      {trend && comparisonData[0].entryCount > 0 && (
        <div className="mt-4 p-4 rounded-xl bg-linear-to-r from-purple-50 to-pink-50 border border-purple-100">
          <p className="text-sm text-gray-700">
            <span className="font-bold">Quick Insight:</span>{' '}
            {trend.entryDirection === 'up' 
              ? `You logged ${Math.abs(trend.entryChange)} more entries this ${comparisonType === 'weekly' ? 'week' : 'month'}! Great job staying consistent. `
              : trend.entryDirection === 'down'
              ? `You logged ${Math.abs(trend.entryChange)} fewer entries compared to before. Try to check in more often! `
              : `You maintained the same logging frequency. `
            }
            {parseFloat(trend.intensityChange) > 1
              ? 'Your emotional intensity has increased—take time to decompress if needed.'
              : parseFloat(trend.intensityChange) < -1
              ? 'Your emotional intensity has decreased—you seem to be finding more balance.'
              : 'Your emotional intensity is staying stable.'}
          </p>
        </div>
      )}
    </div>
  );
}
