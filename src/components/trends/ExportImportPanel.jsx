import { useRef, useState } from 'react';

const focusRingDefault = 'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export function ExportImportPanel({ onExport, onImport, focusRing = focusRingDefault, className = '' }) {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState('');
  const [statusTone, setStatusTone] = useState('');

  const handleExport = () => {
    try {
      const payload = onExport();
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'mood-entries.json';
      link.click();
      URL.revokeObjectURL(url);
      setStatus('Exported entries to mood-entries.json');
      setStatusTone('success');
    } catch (error) {
      console.error('Export failed', error);
      setStatus('Export failed. Please try again.');
      setStatusTone('error');
    }
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        const count = onImport(json);
        setStatus(`Imported ${count} entries.`);
        setStatusTone('success');
      } catch (error) {
        console.error('Import failed', error);
        setStatus('Import failed. Ensure the file is a valid export.');
        setStatusTone('error');
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className={`rounded-3xl p-6 shadow-xl border-2 border-white/70 animate-fade-in ${className}`}
      style={{ background: 'linear-gradient(135deg, #f6f7ff, #fff7fb)' }}
      aria-label="Export and import mood entries"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">Backup & Restore</p>
          <p className="text-sm text-gray-600">Export your moods to JSON or import a previous backup.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExport}
            className={`px-4 py-2 rounded-full bg-white border-2 border-purple-100 text-gray-900 font-semibold shadow-sm hover:-translate-y-0.5 transition-transform duration-150 ${focusRing}`}
          >
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`px-4 py-2 rounded-full bg-white border-2 border-blue-100 text-gray-900 font-semibold shadow-sm hover:-translate-y-0.5 transition-transform duration-150 ${focusRing}`}
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </div>

      {status && (
        <p className={`mt-3 text-sm font-semibold ${statusTone === 'success' ? 'text-green-700' : 'text-red-700'}`} aria-live="polite">
          {status}
        </p>
      )}
    </div>
  );
}
