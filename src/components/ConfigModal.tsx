import React, { useState, useEffect } from 'react';
import { X, Check, Settings, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { getBusinessConfig, saveBusinessConfigOverride, resetBusinessConfigOverride } from '../data/business';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState(getBusinessConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(getBusinessConfig());
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveBusinessConfigOverride({
      whatsapp: config.whatsapp.trim(),
      phone: config.phone.trim(),
      email: config.email.trim(),
      address: config.address.trim()
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    if (confirm('Reset contact settings to default codebase placeholders?')) {
      resetBusinessConfigOverride();
      setConfig(getBusinessConfig());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 text-stone-900 overflow-hidden">
        <div className="p-5 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold">Business Contact Configuration</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Single Source of Truth:</strong> Any verified number entered here immediately cascades to all Header, Footer, Product pages, and WhatsApp CTAs across the entire platform.
            </p>
          </div>

          <div>
            <label htmlFor="config-whatsapp" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Official WhatsApp Number
            </label>
            <input
              type="text"
              id="config-whatsapp"
              value={config.whatsapp}
              onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
              placeholder="e.g. 923001234567 (with country code)"
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            />
            <span className="text-[11px] text-stone-500 mt-1 block">
              Used for 1-click WhatsApp quotes and bulk order dispatches.
            </span>
          </div>

          <div>
            <label htmlFor="config-phone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Direct Phone Line
            </label>
            <input
              type="text"
              id="config-phone"
              value={config.phone}
              onChange={(e) => setConfig({ ...config, phone: e.target.value })}
              placeholder="e.g. +92 21 3241XXXX / 0300-XXXXXXX"
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            />
          </div>

          <div>
            <label htmlFor="config-email" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Official Email Address
            </label>
            <input
              type="email"
              id="config-email"
              value={config.email}
              onChange={(e) => setConfig({ ...config, email: e.target.value })}
              placeholder="e.g. sales@alrazzaqueenterprise.com"
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label htmlFor="config-address" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Dispatch Hub / Commercial Address
            </label>
            <input
              type="text"
              id="config-address"
              value={config.address}
              onChange={(e) => setConfig({ ...config, address: e.target.value })}
              placeholder="e.g. Wholesale Grain Market, Karachi"
              className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Configuration updated and propagated successfully!</span>
            </div>
          )}

          <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-stone-950 text-xs font-bold rounded-lg shadow-xs"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
