import React from 'react';
import { ShieldCheck, Scale, CheckCircle2, Store, Truck, Building2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getBusinessConfig } from '../data/business';
import { WhatsAppButton } from '../components/WhatsAppButton';

interface AboutViewProps {
  onNavigate: (path: string) => void;
  onOpenConfig?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenConfig }) => {
  const business = getBusinessConfig();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: 'About Us', url: '/about' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-10 lg:p-12 border border-stone-800">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            About Our Milling &amp; Supply Business
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {business.name}
          </h1>
          <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
            {business.description}
          </p>
        </div>
      </div>

      {/* Grounded Business Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold text-stone-900 border-l-4 border-amber-600 pl-3">
            Our Business Purpose &amp; Supply Commitment
          </h2>
          <div className="text-sm text-stone-700 space-y-4 leading-relaxed">
            <p>
              At <strong>{business.name}</strong>, we are committed to one clear mission: supplying dependable, high-yield wheat atta and flour products to households, neighborhood grocery stores, supermarkets, and commercial food enterprises.
            </p>
            <p>
              Rather than making ungrounded claims or relying on marketing gimmicks, our operation focuses on the fundamentals of the grain trade: disciplined wheat grain selection, consistent milling roller adjustments, precise moisture monitoring, and durable packaging that resists transit wear and tear.
            </p>
            <p>
              Whether you are a neighborhood retailer seeking fast-moving 5kg and 10kg consumer packs or a wholesale trader ordering truckloads of 50kg sacks, we provide straightforward commercial quotations, reliable dispatch schedules, and transparent transaction terms.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/wholesale')}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-lg shadow transition-colors cursor-pointer"
            >
              Explore Wholesale Terms
            </button>
            <WhatsAppButton
              label="WhatsApp Trade Desk"
              variant="outline"
              size="md"
              onOpenConfig={onOpenConfig}
            />
          </div>
        </div>

        {/* Right Column: Operating Standards */}
        <div className="lg:col-span-5 bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
            Core Operating Standards
          </h3>

          <div className="space-y-4 text-xs sm:text-sm text-stone-700">
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">Calibrated Weight Bagging</strong>
                <span>Exact pack sizes from 5kg to 50kg with zero shortage tolerances.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">Moisture Stability</strong>
                <span>Maintained within standardized industry thresholds to ensure maximum shelf freshness.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block">Prompt Trade Logistics</strong>
                <span>Clear loading schedules, timely bilty generation, and continuous dispatch support.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
