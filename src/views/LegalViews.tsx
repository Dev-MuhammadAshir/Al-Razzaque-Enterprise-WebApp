import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getBusinessConfig } from '../data/business';

interface LegalViewProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyView: React.FC<LegalViewProps> = ({ onNavigate }) => {
  const business = getBusinessConfig();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy', url: '/privacy-policy' }]} onNavigate={onNavigate} />

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">Privacy Policy</h1>
        <p className="text-xs text-stone-500">Effective Date: January 1, 2025 • Last Updated: Current</p>
      </div>

      <div className="prose prose-stone text-sm text-stone-700 space-y-4 leading-relaxed">
        <p>
          At <strong>{business.name}</strong>, we respect the privacy of our business clients, retail shop owners, and household customers. This policy details how we handle inquiry information submitted through our website and digital communication channels.
        </p>

        <h2 className="text-base font-bold text-stone-900 pt-2">1. Information We Collect</h2>
        <p>
          When you submit a wholesale or bulk order inquiry through our website, we collect necessary business contact details including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your contact name and business/store name</li>
          <li>Phone and WhatsApp communication numbers</li>
          <li>Delivery location, city, or market area</li>
          <li>Requested product types, packaging sizes, and estimated order quantities</li>
        </ul>

        <h2 className="text-base font-bold text-stone-900 pt-2">2. How We Use Your Information</h2>
        <p>
          Information collected is strictly used for commercial communication:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Preparing and transmitting official wholesale price quotations</li>
          <li>Coordinating freight loading, bilty details, and delivery dispatches</li>
          <li>Answering inquiries related to packaging, minimum orders, and stock availability</li>
        </ul>

        <h2 className="text-base font-bold text-stone-900 pt-2">3. Third-Party Disclosures</h2>
        <p>
          We do not sell, rent, or trade your contact or business information to third-party marketing brokers. Information is only shared with verified logistics transport operators when necessary to execute authorized deliveries to your destination.
        </p>

        <h2 className="text-base font-bold text-stone-900 pt-2">4. Contact &amp; Corrections</h2>
        <p>
          If you wish to update or remove your business contact information from our trade contact records, please contact our administrative desk directly via WhatsApp or email.
        </p>
      </div>
    </div>
  );
};

export const TermsView: React.FC<LegalViewProps> = ({ onNavigate }) => {
  const business = getBusinessConfig();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms & Conditions', url: '/terms' }]} onNavigate={onNavigate} />

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">Commercial Terms &amp; Conditions</h1>
        <p className="text-xs text-stone-500">Commercial Wholesale Supply Agreement</p>
      </div>

      <div className="prose prose-stone text-sm text-stone-700 space-y-4 leading-relaxed">
        <p>
          These terms govern all commercial transactions, wholesale supply orders, and bulk wheat flour contracts provided by <strong>{business.name}</strong>.
        </p>

        <h2 className="text-base font-bold text-stone-900 pt-2">1. Wholesale Quotations &amp; Market Pricing</h2>
        <p>
          Because raw wheat grain commodities fluctuate based on market indices, official wholesale price quotations provided by our sales desk remain valid for the period explicitly stated on the quotation note (typically 24 to 48 hours unless contracted).
        </p>

        <h2 className="text-base font-bold text-stone-900 pt-2">2. Order Confirmation &amp; Minimum Order Quantities</h2>
        <p>
          Wholesale rates require adherence to published minimum order quantities (MOQs). Orders are formally booked once commercial confirmation is acknowledged by both parties.
        </p>

        <h2 className="text-base font-bold text-stone-900 pt-2">3. Inspection &amp; Delivery Verification</h2>
        <p>
          The buyer or receiving party agrees to inspect bag counts and packaging integrity upon truck unloading or freight receipt. Any discrepancies must be noted on the delivery receipt / bilty voucher and reported within 24 hours of arrival.
        </p>

        <h2 className="text-base font-bold text-stone-900 pt-2">4. Storage &amp; Quality Preservation</h2>
        <p>
          Wheat flour must be stored in cool, well-ventilated, dry conditions raised on wooden pallets away from direct moisture, damp floors, and aromatic substances. {business.name} is not liable for moisture absorption or spoilage resulting from improper buyer storage.
        </p>
      </div>
    </div>
  );
};
