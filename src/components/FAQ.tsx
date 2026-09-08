import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQItem } from '../types';
import { faqs } from '../data/faqs';

interface FAQProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
  allowSearch?: boolean;
  className?: string;
}

export const FAQ: React.FC<FAQProps> = ({
  items = faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Answers regarding our wheat flour supply, minimum order quantities, packaging, and commercial delivery.',
  allowSearch = false,
  className = ''
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter((faq) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
  });

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
          Trade &amp; Order Guidance
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">{title}</h2>
        <p className="mt-2 text-sm text-stone-600 leading-relaxed">{subtitle}</p>
      </div>

      {allowSearch && (
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. MOQ, wholesale, packaging)..."
            className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto divide-y divide-stone-200 border-y border-stone-200">
        {filteredItems.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="py-4">
              <button
                type="button"
                onClick={() => toggleItem(faq.id)}
                className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-sm sm:text-base text-stone-900 group-hover:text-amber-800 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-amber-700' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-2.5 pr-8 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="py-8 text-center text-xs text-stone-500">
            No matching questions found for "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};
