import { useMemo } from 'react';
import { FOCUS_RING, getMoodColor } from '../../constants/moods.js';

/**
 * MoodHeatmap - A visual representation of mood intensity patterns over time
 * Shows a grid of days colored by average mood intensity
 */
export function MoodHeatmap({ entries, timeRange = 'month', getMoodEmoji }) {
  // Generate heatmap data for the selected time range
  const heatmapData = useMemo(() => {
    const now = new Date();
    let daysToShow = 30;
    
    if (timeRange === 'week') daysToShow = 7;
    else if (timeRange === 'month') daysToShow = 30;
    else if (timeRange === 'all') daysToShow = 90;
    
    const days = [];
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const dayEntries = entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === date.toDateString();
      });
      
      const avgIntensity = dayEntries.length > 0
        ? Math.round(dayEntries.reduce((sum, e) => sum + e.rating, 0) / dayEntries.length)
        : 0;
      
      const dominantMood = dayEntries.length > 0
        ? dayEntries.reduce((acc, entry) => {
            acc[entry.mood] = (acc[entry.mood] || 0) + 1;
            return acc;
          }, {})
        : null;
      
      const topMood = dominantMood
        ? Object.entries(dominantMood).sort((a, b) => b[1] - a[1])[0]?.[0]
        : null;
      
      days.push({
        date,
        entries: dayEntries,
        avgIntensity,
        topMood,
        entryCount: dayEntries.length,
        isToday: date.toDateString() === now.toDateString(),
      });
    }
    
    return days;
  }, [entries, timeRange]);

  const getIntensityStyle = (intensity, mood) => {
    if (intensity === 0) return { backgroundColor: '#f3f4f6' };
    
    if (mood) {
      const moodColor = getMoodColor(mood);
      if (moodColor) {
        const opacity = 0.4 + (intensity / 10) * 0.6;
        return { backgroundColor: moodColor, opacity };
      }
    }
    
    return {};
  };

  // Group days by week for display
  const weeks = useMemo(() => {
    const result = [];
    let currentWeek = [];
    
    heatmapData.forEach((day, idx) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || idx === heatmapData.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });
    
    return result;
  }, [heatmapData]);

  const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-white/70 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #f8faff, #fff5f9)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <p className="text-lg font-bold text-gray-900">Mood Intensity Heatmap</p>
          <p className="text-sm text-gray-600">
            Visualize your emotional patterns over time
          </p>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
          <span>Less</span>
          <div className="flex gap-0.5">
            <div className="w-3 h-3 rounded-sm bg-gray-100" title="No entry" />
            <div className="w-3 h-3 rounded-sm bg-emerald-200" title="Low (1-3)" />
            <div className="w-3 h-3 rounded-sm bg-yellow-200" title="Medium (4-5)" />
            <div className="w-3 h-3 rounded-sm bg-orange-200" title="High (6-7)" />
            <div className="w-3 h-3 rounded-sm bg-rose-200" title="Very High (8-10)" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="flex gap-1 mb-2 pl-8">
        {weekdayLabels.map((day, idx) => (
          <div
            key={idx}
            className="w-6 h-4 sm:w-8 sm:h-5 text-[10px] sm:text-xs font-semibold text-gray-500 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="space-y-1">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex items-center gap-1">
            {/* Week label */}
            <div className="w-6 sm:w-8 text-[9px] sm:text-xs font-medium text-gray-500 text-right pr-1">
              {weekIdx === 0 ? 'W' + (weeks.length - weekIdx) : ''}
            </div>
            
            {/* Days */}
            {week.map((day, dayIdx) => (
              <button
                key={dayIdx}
                type="button"
                tabIndex={0}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg border border-white/50 shadow-sm 
                  transition-all duration-200 hover:scale-110 hover:shadow-md cursor-pointer
                  flex items-center justify-center text-xs sm:text-sm
                  ${FOCUS_RING} ${day.isToday ? 'ring-2 ring-blue-400' : ''}`}
                style={getIntensityStyle(day.avgIntensity, day.topMood)}
                aria-label={`${day.date.toLocaleDateString()}: ${day.entryCount} entries, avg intensity ${day.avgIntensity}/10`}
                title={`${day.date.toLocaleDateString()}\n${day.entryCount} entries\nAvg: ${day.avgIntensity}/10`}
              >
                {day.topMood && getMoodEmoji && (
                  <span className="opacity-80" aria-hidden="true">
                    {getMoodEmoji(day.topMood)}
                  </span>
                )}
              </button>
            ))}
            
            {/* Fill empty spots in last week */}
            {week.length < 7 && Array.from({ length: 7 - week.length }).map((_, i) => (
              <div key={`empty-${i}`} className="w-6 h-6 sm:w-8 sm:h-8" />
            ))}
          </div>
        ))}
      </div>

      {/* Summary stats */}
      <div className="mt-6 pt-4 border-t border-white/40">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-white/60 shadow-sm">
            <p className="text-2xl font-black text-gray-900">
              {heatmapData.filter(d => d.entryCount > 0).length}
            </p>
            <p className="text-xs font-semibold text-gray-600">Days Logged</p>
          </div>
          <div className="p-3 rounded-xl bg-white/60 shadow-sm">
            <p className="text-2xl font-black text-gray-900">
              {heatmapData.reduce((sum, d) => sum + d.entryCount, 0)}
            </p>
            <p className="text-xs font-semibold text-gray-600">Total Entries</p>
          </div>
          <div className="p-3 rounded-xl bg-white/60 shadow-sm">
            <p className="text-2xl font-black text-gray-900">
              {(heatmapData.filter(d => d.avgIntensity > 0).reduce((sum, d) => sum + d.avgIntensity, 0) / 
                Math.max(1, heatmapData.filter(d => d.avgIntensity > 0).length)).toFixed(1)}
            </p>
            <p className="text-xs font-semibold text-gray-600">Avg Intensity</p>
          </div>
          <div className="p-3 rounded-xl bg-white/60 shadow-sm">
            <p className="text-2xl font-black text-gray-900">
              {Math.round((heatmapData.filter(d => d.entryCount > 0).length / heatmapData.length) * 100)}%
            </p>
            <p className="text-xs font-semibold text-gray-600">Logging Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
