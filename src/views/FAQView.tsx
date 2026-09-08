import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQ } from '../components/FAQ';
import { faqs } from '../data/faqs';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { HelpCircle } from 'lucide-react';

interface FAQViewProps {
  onNavigate: (path: string) => void;
  onOpenConfig?: () => void;
}

export const FAQView: React.FC<FAQViewProps> = ({ onNavigate, onOpenConfig }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'products', label: 'Flour Quality & Specs' },
    { id: 'wholesale', label: 'Wholesale & Retailers' },
    { id: 'bulk', label: 'Bulk Orders (50kg)' },
    { id: 'shipping', label: 'Shipping & Delivery' }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory === 'all') return true;
    return faq.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions', url: '/faq' }]} onNavigate={onNavigate} />

      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
          Buyer Support Knowledge Base
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          Clear answers on minimum order quantities, delivery terms, packaging integrity, and wholesale pricing.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Component */}
      <div className="max-w-4xl mx-auto bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-10">
        <FAQ items={filteredFaqs} allowSearch={true} />
      </div>

      {/* Direct Contact Reassurance */}
      <div className="max-w-xl mx-auto bg-stone-900 text-stone-100 p-6 rounded-2xl text-center space-y-4">
        <h3 className="font-bold text-base">Have a question not listed here?</h3>
        <p className="text-xs text-stone-400">
          Our sales desk answers product specifications and custom delivery queries directly over WhatsApp.
        </p>
        <div className="flex justify-center">
          <WhatsAppButton
            label="Ask Sales via WhatsApp"
            variant="primary"
            size="md"
            onOpenConfig={onOpenConfig}
          />
        </div>
      </div>
    </div>
  );
};
