import React, { useState } from 'react';
import { MessageCircle, AlertCircle, ExternalLink, Settings } from 'lucide-react';
import { getWhatsAppAction } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';

interface WhatsAppButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  productName?: string;
  packSize?: string;
  quantity?: string;
  businessType?: string;
  customMessage?: string;
  pageContext?: string;
  className?: string;
  onOpenConfig?: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  label = 'WhatsApp for Bulk Orders',
  variant = 'primary',
  size = 'md',
  productName,
  packSize,
  quantity,
  businessType,
  customMessage,
  pageContext,
  className = '',
  onOpenConfig
}) => {
  const [showUnconfiguredModal, setShowUnconfiguredModal] = useState(false);

  const action = getWhatsAppAction({
    message: customMessage,
    productName,
    packSize,
    quantity,
    businessType
  });

  const handleClick = (e: React.MouseEvent) => {
    trackEvent('click_whatsapp', {
      product: productName,
      pack_size: packSize,
      quantity,
      page: pageContext || (typeof window !== 'undefined' ? window.location.pathname : ''),
      is_configured: action.isConfigured
    });

    if (!action.isConfigured) {
      e.preventDefault();
      setShowUnconfiguredModal(true);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 font-medium',
    md: 'px-4 py-2.5 text-sm gap-2 font-semibold',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-bold'
  }[size];

  const variantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm border border-emerald-500/30 active:scale-[0.99]',
    secondary: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200',
    outline: 'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-600',
    pill: 'bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-sm'
  }[variant];

  return (
    <>
      <a
        id={`btn-wa-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
        href={action.url}
        target={action.isConfigured ? '_blank' : undefined}
        rel={action.isConfigured ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
        className={`inline-flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      >
        <MessageCircle className={`${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} shrink-0`} />
        <span>{label}</span>
      </a>

      {showUnconfiguredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-stone-200 text-stone-900">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-700">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-stone-900">WhatsApp Number Pending</h3>
                <p className="mt-1 text-sm text-stone-600">
                  Per strict business data requirements, no fake phone numbers are used. The official WhatsApp number has not yet been set in <code className="bg-stone-100 px-1 py-0.5 rounded text-xs font-mono">data/business.ts</code> or <code className="bg-stone-100 px-1 py-0.5 rounded text-xs font-mono">.env</code>.
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700">
              <p className="font-semibold text-stone-900 mb-1">Prefilled Inquiry Ready for Dispatch:</p>
              <p className="italic text-stone-600 bg-white p-2 rounded border border-stone-200 break-words">
                "{action.rawMessage}"
              </p>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-end">
              {onOpenConfig && (
                <button
                  type="button"
                  onClick={() => {
                    setShowUnconfiguredModal(false);
                    onOpenConfig();
                  }}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-700 flex items-center justify-center gap-1.5"
                >
                  <Settings className="w-4 h-4" />
                  Set Verified Number
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowUnconfiguredModal(false)}
                className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
