import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';
import { InquiryForm } from './InquiryForm';

interface QuickInquiryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl border border-stone-200 text-stone-900 overflow-hidden">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-2 sm:p-4">
          <InquiryForm
            title={product ? `Wholesale Quote: ${product.name}` : 'Request Wholesale Pricing'}
            subtitle={
              product
                ? `Submit your estimated volume and store details for ${product.name} to receive current wholesale rates.`
                : 'Direct B2B supply rates and delivery terms.'
            }
            initialProductSlug={product?.slug}
            onSuccess={() => {
              // Stay for review or let user close
            }}
          />
        </div>
      </div>
    </div>
  );
};
