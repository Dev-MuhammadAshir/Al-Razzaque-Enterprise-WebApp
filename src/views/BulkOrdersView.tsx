import React from 'react';
import {
  Truck,
  Building2,
  Scale,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  Phone,
  MessageCircle,
  Package
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { PhoneButton } from '../components/PhoneButton';
import { InquiryForm } from '../components/InquiryForm';
import { FAQ } from '../components/FAQ';
import { getCategoryFaqs } from '../data/faqs';
import { getBusinessConfig } from '../data/business';

interface BulkOrdersViewProps {
  onNavigate: (path: string) => void;
  onOpenConfig?: () => void;
}

export const BulkOrdersView: React.FC<BulkOrdersViewProps> = ({ onNavigate, onOpenConfig }) => {
  const business = getBusinessConfig();
  const bulkFaqs = getCategoryFaqs('bulk');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs
        items={[{ label: 'Commercial Bulk Orders', url: '/bulk-orders' }]}
        onNavigate={onNavigate}
      />

      {/* Hero Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-10 lg:p-12 border border-stone-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Truck className="w-3.5 h-3.5" />
            <span>Industrial &amp; High-Tonnage Wheat Procurement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Commercial Bulk Orders &amp; <span className="text-amber-500">50kg Sacks</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
            Reliable supply partnerships for commercial kitchens, large bakeries, roti plants, catering companies, and wholesale grain stockists requiring high-volume wheat flour consistency.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#bulk-inquiry-form"
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow transition-colors text-center cursor-pointer"
            >
              Get Bulk Order Quotation
            </a>

            <WhatsAppButton
              label="WhatsApp Bulk Desk"
              variant="outline"
              size="md"
              onOpenConfig={onOpenConfig}
            />

            <PhoneButton
              label="Call Direct Desk"
              variant="secondary"
              size="md"
              onOpenConfig={onOpenConfig}
            />
          </div>
        </div>
      </div>

      {/* Bulk Supply Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-stone-900">50kg Heavy-Duty Bagging</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Standard industrial 50kg bags reinforced with double-stitched closures to withstand multi-tier warehouse stacking and rugged transit.
          </p>
        </div>

        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-stone-900">Guaranteed Restock Schedules</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Lock in regular weekly or monthly dispatches to ensure your production floor or kitchen never faces wheat stockouts.
          </p>
        </div>

        <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-stone-900">Direct Transport &amp; Bilty</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Coordinated freight loading from mill gates to your facility or designated freight terminal with instantaneous bilty delivery tracking.
          </p>
        </div>
      </div>

      {/* Commercial Product Lineup Showcase */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800">
        <div className="max-w-2xl mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Bulk Wheat Products Available for Dispatch</h2>
          <p className="text-xs text-stone-400 mt-1">
            Standardized moisture, controlled gluten profile, and direct mill-gate billing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
            <span className="font-bold text-amber-400 text-sm block">Marka Atta (Bulk 50kg)</span>
            <p className="text-stone-300">
              Balanced wheat flour formulated for high water absorption, high chapati yield, and soft texture retention.
            </p>
            <span className="inline-block text-[11px] font-mono text-stone-400">MOQ: 10 Sacks (500kg)</span>
          </div>

          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
            <span className="font-bold text-amber-400 text-sm block">Commercial Maida / Fine Flour</span>
            <p className="text-stone-300">
              Refined endosperm flour for commercial parathas, samosa pastry sheets, and industrial snack food lines.
            </p>
            <span className="inline-block text-[11px] font-mono text-stone-400">MOQ: 10 Sacks (500kg)</span>
          </div>

          <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
            <span className="font-bold text-amber-400 text-sm block">Chakki Fresh Stone Ground (20kg/50kg)</span>
            <p className="text-stone-300">
              Traditional 100% whole grain milling with natural wheat bran retained for traditional roti makers and marts.
            </p>
            <span className="inline-block text-[11px] font-mono text-stone-400">MOQ: 10 Bags (200kg)</span>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div id="bulk-inquiry-form" className="max-w-3xl mx-auto">
        <InquiryForm
          title="Commercial Bulk Order Quotation Form"
          subtitle="Submit your tonnage or sack count requirements for direct mill quotation."
          initialBusinessType="Wholesaler"
          initialProductSlug="commercial-bulk-flour-50kg"
        />
      </div>

      {/* Bulk FAQs */}
      <FAQ
        items={bulkFaqs}
        title="Commercial Bulk Order FAQs"
        subtitle="Freight arrangements, payment security, sample inspections, and contract terms."
      />
    </div>
  );
};
