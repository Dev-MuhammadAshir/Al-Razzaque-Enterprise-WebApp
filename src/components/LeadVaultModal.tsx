import React, { useState, useEffect } from 'react';
import { X, Download, Trash2, CheckCircle2, Clock, Phone, MapPin, Building, MessageCircle } from 'lucide-react';
import { InquiryLead } from '../types';
import { getStoredLeads, updateLeadStatus, clearStoredLeads, exportLeadsAsCSV } from '../lib/leads';
import { getWhatsAppAction } from '../lib/whatsapp';

interface LeadVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadVaultModal: React.FC<LeadVaultModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<InquiryLead[]>([]);

  const refreshLeads = () => {
    setLeads(getStoredLeads());
  };

  useEffect(() => {
    if (isOpen) {
      refreshLeads();
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = () => refreshLeads();
    window.addEventListener('al-razzaque-lead-saved', handler);
    window.addEventListener('al-razzaque-lead-updated', handler);
    return () => {
      window.removeEventListener('al-razzaque-lead-saved', handler);
      window.removeEventListener('al-razzaque-lead-updated', handler);
    };
  }, []);

  if (!isOpen) return null;

  const handleDownloadCSV = () => {
    const csvContent = exportLeadsAsCSV();
    if (!csvContent) return;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `al-razzaque-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 text-stone-900 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">Inquiry &amp; Lead Vault</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs">
                {leads.length} Received
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Local persistent storage preserving every B2B wholesale inquiry submitted across the platform.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Toolbar */}
        <div className="px-5 py-3 bg-stone-100 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-stone-600">
            Attribution parameters (UTM source, campaign, landing page) are attached to each record.
          </div>
          <div className="flex items-center gap-2">
            {leads.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleDownloadCSV}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Clear all stored leads from local browser vault?')) {
                      clearStoredLeads();
                      setLeads([]);
                    }
                  }}
                  className="px-3 py-1.5 bg-stone-200 hover:bg-red-100 text-stone-700 hover:text-red-700 font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {leads.length > 0 ? (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-stone-50 rounded-xl p-4 border border-stone-200 space-y-3 hover:border-amber-400 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-stone-900">{lead.businessName}</span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-stone-200 text-stone-800">
                        {lead.businessType}
                      </span>
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5">
                      Contact: <strong>{lead.name}</strong> • Ref: <code className="font-mono text-[11px]">{lead.id}</code>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                      className="text-xs bg-white border border-stone-300 rounded px-2 py-1 font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="new">Status: New</option>
                      <option value="contacted">Status: Contacted</option>
                      <option value="qualified">Status: Qualified</option>
                    </select>

                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello ${lead.name}, regarding your wholesale wheat flour inquiry (${lead.productName}, ${lead.packSize}) for ${lead.businessName} at Al Razzaque Enterprise:`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Reply WhatsApp
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-white p-3 rounded-lg border border-stone-200/80">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400">Phone / WA</span>
                    <span className="font-medium text-stone-800">{lead.phone}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400">City / Location</span>
                    <span className="font-medium text-stone-800">{lead.city}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400">Product &amp; Pack</span>
                    <span className="font-medium text-stone-800">{lead.productName} ({lead.packSize})</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-stone-400">Quantity</span>
                    <span className="font-medium text-amber-800 font-bold">{lead.estimatedQuantity}</span>
                  </div>
                </div>

                {lead.message && (
                  <div className="text-xs text-stone-600 bg-amber-50/50 p-2.5 rounded border border-amber-100">
                    <span className="font-semibold text-stone-800">Note: </span>
                    {lead.message}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-200">
                  <span>Logged: {new Date(lead.createdAt).toLocaleString()}</span>
                  <span>Attribution Source: {lead.attribution?.utm_source || 'Direct Traffic'}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-stone-500 space-y-2">
              <Clock className="w-8 h-8 mx-auto text-stone-300" />
              <p className="text-sm font-semibold text-stone-700">No leads recorded yet</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Submit an inquiry via the Wholesale or Bulk Orders form to test client validation and vault persistence.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-semibold"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};
