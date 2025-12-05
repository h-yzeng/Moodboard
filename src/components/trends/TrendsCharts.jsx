import { useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  BarElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Filler, Title, Tooltip, Legend, BarElement);

const chartColors = {
  purple: '#d6bcfa',
  pink: '#f9c5d5',
  blue: '#cde7ff',
  lilac: '#e4d4ff'
};

export function TrendsCharts({ filteredEntries, moodStats }) {
  const moodBarData = useMemo(() => {
    const entries = Object.entries(moodStats).sort((a, b) => b[1] - a[1]).slice(0, 6);
    return {
      labels: entries.map(([mood]) => mood.charAt(0).toUpperCase() + mood.slice(1)),
      datasets: [
        {
          label: 'Mood counts',
          data: entries.map(([, count]) => count),
          backgroundColor: entries.map((_, idx) => (idx % 2 === 0 ? chartColors.purple : chartColors.pink)),
          borderRadius: 12,
        },
      ],
    };
  }, [moodStats]);

  const intensityLineData = useMemo(() => {
    const sorted = [...filteredEntries].sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = sorted.map((entry) => new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    const data = sorted.map((entry) => entry.rating);

    return {
      labels,
      datasets: [
        {
          label: 'Intensity',
          data,
          fill: true,
          backgroundColor: 'rgba(214, 188, 250, 0.18)',
          borderColor: chartColors.purple,
          pointBackgroundColor: chartColors.pink,
          tension: 0.35,
        },
      ],
    };
  }, [filteredEntries]);

  const barOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.raw} entries` } },
    },
    scales: {
      y: { beginAtZero: true, ticks: { precision: 0 } },
      x: { grid: { display: false } },
    },
  };

  const lineOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `Intensity ${ctx.raw}/10` } },
    },
    scales: {
      y: { min: 0, max: 10, ticks: { stepSize: 2 } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2 mb-10">
      <div
        className="rounded-3xl p-6 shadow-xl border-2 border-white/70 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, #f6f7ff, #fff7fb)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-bold text-gray-900">Top moods</p>
          <span className="text-sm text-gray-600">Last filter window</span>
        </div>
        {moodBarData.labels.length === 0 ? (
          <p className="text-sm text-gray-600">No data yet.</p>
        ) : (
          <Bar data={moodBarData} options={barOptions} aria-label="Mood counts bar chart" />
        )}
      </div>

      <div
        className="rounded-3xl p-6 shadow-xl border-2 border-white/70 animate-fade-in"
        style={{ background: 'linear-gradient(135deg, #f0fbff, #f7f4ff)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-bold text-gray-900">Intensity over time</p>
          <span className="text-sm text-gray-600">Rated 1-10</span>
        </div>
        {intensityLineData.labels.length === 0 ? (
          <p className="text-sm text-gray-600">No data yet.</p>
        ) : (
          <Line data={intensityLineData} options={lineOptions} aria-label="Mood intensity line chart" />
        )}
      </div>
    </div>
  );
}
