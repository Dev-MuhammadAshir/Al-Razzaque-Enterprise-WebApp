import React, { useState } from 'react';
import { MessageCircle, Phone, X, ShoppingBag } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';
import { PhoneButton } from './PhoneButton';

interface MobileStickyCTAProps {
  onNavigate: (path: string) => void;
  onOpenConfig?: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onNavigate, onOpenConfig }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-stone-950/95 backdrop-blur-md border-t border-stone-800 px-3 py-2.5 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => onNavigate('/bulk-orders')}
          className="flex-1 py-2.5 px-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Bulk Inquiry</span>
        </button>

        <div className="flex-1">
          <WhatsAppButton
            label="WhatsApp Orders"
            variant="primary"
            size="sm"
            className="w-full text-xs py-2.5"
            onOpenConfig={onOpenConfig}
          />
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-2 text-stone-500 hover:text-stone-300 transition-colors"
          title="Dismiss quick bar"
          aria-label="Dismiss quick bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
