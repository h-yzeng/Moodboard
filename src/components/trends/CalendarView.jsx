import { FOCUS_RING } from '../../constants/moods.js';

export function CalendarView({ calendarDays, getMoodEmoji, viewMode }) {
  if (viewMode !== 'calendar') return null;

  const handleKeyDown = (event, day) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
    }
  };

  return (
    <div
      className="rounded-3xl p-4 sm:p-8 shadow-xl border-2 border-white/70 animate-fade-in"
      style={{ background: 'linear-gradient(135deg, #f6f7ff, #f0fbff)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div>
          <p className="text-lg font-bold text-gray-900">Calendar View</p>
          <p className="text-sm text-gray-600">Click a day to see mood notes</p>
        </div>
        <div className="text-sm text-gray-700">Mood badges reflect intensity</div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-3 mb-2 text-center text-xs font-semibold text-gray-600" aria-hidden="true">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-3" role="grid" aria-label="Mood calendar">
        {calendarDays.map((day, idx) => {
          if (day.isPlaceholder) {
            return <div key={`placeholder-${idx}`} className="opacity-0 pointer-events-none" aria-hidden="true" />;
          }

          const label = `${day.date.toDateString()} ${day.mood ? day.mood.mood : 'No mood recorded'}`;

          return (
            <div
              key={day.date.toISOString()}
              role="gridcell"
              tabIndex={0}
              aria-label={label}
              onKeyDown={(e) => handleKeyDown(e, day)}
              className={`rounded-xl sm:rounded-2xl p-2 sm:p-3 border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${FOCUS_RING} ${
                day.isToday ? 'border-blue-400 shadow-blue-100' : 'border-white/70'
              } ${day.entries.length ? 'bg-linear-to-br from-blue-50 via-purple-50 to-pink-50' : 'bg-white/80'}`}
            >
<div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-xs font-semibold text-gray-600">{day.date.getDate()}</span>
                {day.isToday && <span className="text-[10px] font-bold text-blue-700">Today</span>}
              </div>
              <div className="min-h-7 sm:min-h-9 flex flex-col gap-1 sm:gap-2">
                {day.mood ? (
                  <div className="inline-flex items-center gap-1 sm:gap-2 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full bg-white border border-gray-100 text-xs sm:text-sm font-semibold shadow-sm">
                    <span aria-hidden="true">{getMoodEmoji(day.mood.mood)}</span>
                    <span className="capitalize hidden sm:inline">{day.mood.mood}</span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 hidden sm:block">No entry</span>
                )}
                {day.mood?.note && <p className="text-[11px] text-gray-600 line-clamp-2 hidden sm:block">"{day.mood.note}"</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
