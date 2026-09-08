import React from 'react';
import {
  Store,
  Building2,
  TrendingUp,
  Package,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageCircle,
  FileSpreadsheet
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { PhoneButton } from '../components/PhoneButton';
import { InquiryForm } from '../components/InquiryForm';
import { FAQ } from '../components/FAQ';
import { getCategoryFaqs } from '../data/faqs';
import { getBusinessConfig } from '../data/business';

interface WholesaleViewProps {
  onNavigate: (path: string) => void;
  onOpenConfig?: () => void;
}

export const WholesaleView: React.FC<WholesaleViewProps> = ({ onNavigate, onOpenConfig }) => {
  const business = getBusinessConfig();
  const wholesaleFaqs = getCategoryFaqs('wholesale');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs
        items={[{ label: 'Wholesale Supply', url: '/wholesale' }]}
        onNavigate={onNavigate}
      />

      {/* Hero Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-10 lg:p-12 border border-stone-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Store className="w-3.5 h-3.5" />
            <span>Retailer &amp; Mart Trade Program</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Wholesale Wheat Atta Supply for <span className="text-amber-500">Retailers &amp; Marts</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
            Stock quality wheat flour products for your business. Contact {business.name} for available products, bulk-order information, and wholesale pricing.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#wholesale-inquiry-form"
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow transition-colors text-center cursor-pointer"
            >
              Request Wholesale Pricing
            </a>

            <WhatsAppButton
              label="WhatsApp for Bulk Orders"
              variant="outline"
              size="md"
              onOpenConfig={onOpenConfig}
            />

            <PhoneButton
              label="Call Sales Line"
              variant="secondary"
              size="md"
              onOpenConfig={onOpenConfig}
            />
          </div>
        </div>
      </div>

      {/* Target Buyer Categories */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Trade Channels
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Tailored Commercial Terms For Every Business Scale
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-3">
            <Store className="w-6 h-6 text-amber-700" />
            <h3 className="font-bold text-base text-stone-900">Grocery Stores</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Steady weekly restocks of 5kg and 10kg Marka Atta bags with consumer-friendly packaging that moves fast off neighborhood shelves.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-3">
            <Building2 className="w-6 h-6 text-amber-700" />
            <h3 className="font-bold text-base text-stone-900">Supermarkets &amp; Marts</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Standardized carton assortments, barcode packaging ready for POS scanning, and reliable fulfillment to meet FMCG retail standards.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-3">
            <TrendingUp className="w-6 h-6 text-amber-700" />
            <h3 className="font-bold text-base text-stone-900">Grain Wholesalers</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              High-volume 20kg bags and 50kg sacks with volume-tier discounts, direct mill dispatches, and bilty documentation for inter-city traders.
            </p>
          </div>

          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-3">
            <Truck className="w-6 h-6 text-amber-700" />
            <h3 className="font-bold text-base text-stone-900">Regional Distributors</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Continuous contract supply agreements with priority allocation during high-demand festival and grain harvest seasons.
            </p>
          </div>
        </div>
      </div>

      {/* Packaging & Minimum Order Quantities Table */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            Wholesale Packaging Formats &amp; Minimum Order Guidelines
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Flexible lot sizes designed to keep retail capital efficient while ensuring volume pricing advantage.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-200/80 text-stone-800 uppercase font-bold text-[11px]">
              <tr>
                <th className="py-3 px-4 rounded-l-lg">Packaging Format</th>
                <th className="py-3 px-4">Bag Material</th>
                <th className="py-3 px-4">Standard Minimum Order</th>
                <th className="py-3 px-4">Primary Buyer Profile</th>
                <th className="py-3 px-4 rounded-r-lg">Dispatch Mode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-700">
              <tr>
                <td className="py-3 px-4 font-bold text-stone-900">5kg Consumer Pack</td>
                <td className="py-3 px-4">Polyethylene Food-Grade Pouch</td>
                <td className="py-3 px-4 font-mono font-semibold">20 Packs / Master Bale</td>
                <td className="py-3 px-4">Neighborhood Kiryana, Mini Marts</td>
                <td className="py-3 px-4">Local Van / Pickup</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-stone-900">10kg Retail Bag</td>
                <td className="py-3 px-4">Woven Polypropylene / Handle</td>
                <td className="py-3 px-4 font-mono font-semibold">10 Bags</td>
                <td className="py-3 px-4">Supermarkets, Marts, Departmental</td>
                <td className="py-3 px-4">Local Delivery / Bilty</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-stone-900">20kg Commercial Bag</td>
                <td className="py-3 px-4">High-Density Woven Sack</td>
                <td className="py-3 px-4 font-mono font-semibold">10 Bags</td>
                <td className="py-3 px-4">Wholesalers, Large Families</td>
                <td className="py-3 px-4">Direct Delivery / Freight</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-stone-900">50kg Heavy Bulk Sack</td>
                <td className="py-3 px-4">Double-Stitched Industrial Sack</td>
                <td className="py-3 px-4 font-mono font-semibold">10 Sacks (500kg)</td>
                <td className="py-3 px-4">Bakeries, Tandoors, Grain Traders</td>
                <td className="py-3 px-4">Truckload / Bilty Dispatch</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Embedded Wholesale Inquiry Form */}
      <div id="wholesale-inquiry-form" className="max-w-3xl mx-auto">
        <InquiryForm
          title="Direct Wholesale Supply Inquiry"
          subtitle="Tell us about your store or commercial operation to receive current wholesale quotation and delivery terms."
        />
      </div>

      {/* Wholesale FAQs */}
      <FAQ
        items={wholesaleFaqs}
        title="Wholesale Supply &amp; Trade FAQs"
        subtitle="Clear answers on invoicing, credit policies, delivery schedules, and order adjustments."
      />
    </div>
  );
};
