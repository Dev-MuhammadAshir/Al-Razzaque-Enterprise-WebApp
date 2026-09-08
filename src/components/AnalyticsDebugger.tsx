import React, { useState, useEffect } from 'react';
import { Activity, X, Trash2, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { getAnalyticsLogs, clearAnalyticsLogs, TrackedLogEntry } from '../lib/analytics';
import { getStoredAttribution } from '../lib/attribution';

export const AnalyticsDebugger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<TrackedLogEntry[]>([]);
  const attribution = getStoredAttribution();

  useEffect(() => {
    const handleUpdate = () => setLogs(getAnalyticsLogs());
    window.addEventListener('al-razzaque-analytics-event', handleUpdate);
    window.addEventListener('al-razzaque-analytics-cleared', handleUpdate);
    setLogs(getAnalyticsLogs());

    return () => {
      window.removeEventListener('al-razzaque-analytics-event', handleUpdate);
      window.removeEventListener('al-razzaque-analytics-cleared', handleUpdate);
    };
  }, []);

  const primaryCount = logs.filter((l) => l.isPrimaryConversion).length;

  return (
    <aside aria-label="Analytics & Conversion Monitor" className="fixed bottom-4 left-4 z-40">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 text-stone-200 hover:text-white border border-stone-700 shadow-lg text-xs font-mono backdrop-blur-xs transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>Events ({logs.length})</span>
          {primaryCount > 0 && (
            <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[10px] font-bold">
              {primaryCount} Converted
            </span>
          )}
        </button>
      ) : (
        <div className="bg-stone-950 text-stone-200 border border-stone-800 rounded-xl shadow-2xl w-80 sm:w-96 max-h-96 flex flex-col overflow-hidden text-xs font-mono">
          <div className="p-3 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-stone-100">GA4 &amp; Ads Conversion Stream</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={clearAnalyticsLogs}
                className="p-1 hover:text-red-400 text-stone-400"
                title="Clear logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:text-stone-100 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="px-3 py-1.5 bg-stone-900/60 border-b border-stone-800/80 text-[11px] text-stone-400 flex items-center justify-between">
            <span>Attribution: {attribution.utm_source || 'Direct'}</span>
            <span>Primary: {primaryCount}</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 divide-y divide-stone-900">
            {logs.length > 0 ? (
              logs.map((entry) => (
                <div key={entry.id} className="pt-2 first:pt-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                        entry.isPrimaryConversion
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                          : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {entry.eventName}
                    </span>
                    <span className="text-[10px] text-stone-500">{entry.timestamp}</span>
                  </div>

                  <div className="text-[10px] text-stone-400 bg-stone-900/80 p-1.5 rounded border border-stone-800/50 break-all space-y-0.5">
                    {entry.payload.product && (
                      <div>
                        <span className="text-amber-400">product:</span> {entry.payload.product}
                      </div>
                    )}
                    {entry.payload.page && (
                      <div>
                        <span className="text-stone-500">page:</span> {entry.payload.page}
                      </div>
                    )}
                    {entry.payload.customer_type && (
                      <div>
                        <span className="text-stone-500">type:</span> {entry.payload.customer_type}
                      </div>
                    )}
                    {entry.payload.quantity && (
                      <div>
                        <span className="text-emerald-400">qty:</span> {entry.payload.quantity}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-stone-500">
                No events triggered yet. Click WhatsApp, submit an inquiry, or switch pages to see events fire.
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
