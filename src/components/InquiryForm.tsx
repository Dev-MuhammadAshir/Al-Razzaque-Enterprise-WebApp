import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle, RefreshCw, Building2 } from 'lucide-react';
import { Product, BusinessType } from '../types';
import { getAllProducts } from '../data/products';
import { submitInquiryLead, LeadSubmissionInput } from '../lib/leads';
import { getWhatsAppAction } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';

interface InquiryFormProps {
  initialProductSlug?: string;
  initialBusinessType?: BusinessType;
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
  className?: string;
}

const BUSINESS_TYPES: BusinessType[] = [
  'Retailer',
  'Mart',
  'Wholesaler',
  'Distributor',
  'Household / Individual',
  'Other'
];

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialProductSlug,
  initialBusinessType = 'Retailer',
  title = 'Request Wholesale Pricing & Bulk Order Quote',
  subtitle = 'Provide your store or business details to receive immediate wholesale rates, pack availability, and dispatch logistics.',
  onSuccess,
  className = ''
}) => {
  const products = getAllProducts();
  const defaultProduct = products.find((p) => p.slug === initialProductSlug) || products[0];

  const [formData, setFormData] = useState<LeadSubmissionInput>({
    name: '',
    businessName: '',
    businessType: initialBusinessType,
    phone: '',
    city: '',
    productSlug: defaultProduct?.slug || '',
    productName: defaultProduct?.name || '',
    packSize: defaultProduct?.packSizes?.[0] ? `${defaultProduct.packSizes[0].size}${defaultProduct.packSizes[0].unit}` : '',
    estimatedQuantity: '',
    message: '',
    honeypot: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // When selected product changes, adapt pack size options dynamically
  const selectedProduct = products.find((p) => p.slug === formData.productSlug) || defaultProduct;

  useEffect(() => {
    if (initialProductSlug) {
      const match = products.find((p) => p.slug === initialProductSlug);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          productSlug: match.slug,
          productName: match.name,
          packSize: match.packSizes?.[0] ? `${match.packSizes[0].size}${match.packSizes[0].unit}` : ''
        }));
      }
    }
  }, [initialProductSlug]);

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    const prod = products.find((p) => p.slug === slug);
    if (prod) {
      setFormData((prev) => ({
        ...prev,
        productSlug: prod.slug,
        productName: prod.name,
        packSize: prod.packSizes?.[0] ? `${prod.packSizes[0].size}${prod.packSizes[0].unit}` : 'Standard lot'
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field error on edit
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleStartInteraction = () => {
    trackEvent('start_bulk_inquiry', {
      product: formData.productSlug,
      customer_type: formData.businessType
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    const result = await submitInquiryLead(formData);

    setSubmitting(false);

    if (result.success && result.lead) {
      setSubmittedLead(result.lead);
      if (onSuccess) onSuccess();
    } else {
      setFormError(result.error || 'Unable to process inquiry. Please check the fields or contact via WhatsApp.');
    }
  };

  // WhatsApp quick dispatch fallback
  const waAction = getWhatsAppAction({
    productName: formData.productName,
    packSize: formData.packSize,
    quantity: formData.estimatedQuantity,
    businessType: formData.businessType
  });

  if (submittedLead) {
    return (
      <div className={`bg-white rounded-2xl border border-emerald-200 p-6 sm:p-8 shadow-md text-stone-900 ${className}`}>
        <div className="flex items-center gap-3 text-emerald-700">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-stone-900">Inquiry Received &amp; Logged</h3>
            <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Reference ID: {submittedLead.id}
            </span>
          </div>
        </div>

        <div className="mt-5 p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-sm">
          <p className="text-stone-700">
            Thank you, <strong className="text-stone-900">{submittedLead.name}</strong> from{' '}
            <strong className="text-stone-900">{submittedLead.businessName}</strong>.
          </p>
          <p className="text-stone-600 text-xs leading-relaxed">
            Your inquiry for <strong>{submittedLead.productName}</strong> ({submittedLead.packSize}, Est: {submittedLead.estimatedQuantity}) for delivery to <strong>{submittedLead.city}</strong> has been safely recorded in our commercial supply pipeline.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-3">
          <a
            href={waAction.url}
            target={waAction.isConfigured ? '_blank' : undefined}
            rel={waAction.isConfigured ? 'noopener noreferrer' : undefined}
            className="w-full sm:w-auto flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Send Copy to WhatsApp for Faster Rate Confirmation</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmittedLead(null);
              setFormData((prev) => ({
                ...prev,
                estimatedQuantity: '',
                message: ''
              }));
            }}
            className="w-full sm:w-auto px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm text-stone-900 ${className}`}>
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 uppercase tracking-wide mb-2">
          <Building2 className="w-3.5 h-3.5 text-amber-700" />
          Direct Mill Supply Inquiry
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900">{title}</h2>
        <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">{subtitle}</p>
      </div>

      {formError && (
        <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} onFocus={handleStartInteraction} className="space-y-4">
        {/* Anti-spam honeypot */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Row 1: Contact Name & Business Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-name" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Your Name <span className="text-amber-600">*</span>
            </label>
            <input
              type="text"
              id="lead-name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Muhammad Aslam"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900"
            />
          </div>

          <div>
            <label htmlFor="lead-business" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Business / Store / Mart Name <span className="text-amber-600">*</span>
            </label>
            <input
              type="text"
              id="lead-business"
              name="businessName"
              required
              value={formData.businessName}
              onChange={handleInputChange}
              placeholder="e.g. Madina Super Mart"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900"
            />
          </div>
        </div>

        {/* Row 2: Business Type & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-businessType" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Business Type <span className="text-amber-600">*</span>
            </label>
            <select
              id="lead-businessType"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900"
            >
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lead-phone" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Phone / WhatsApp Number <span className="text-amber-600">*</span>
            </label>
            <input
              type="tel"
              id="lead-phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g. 0300 1234567"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900"
            />
          </div>
        </div>

        {/* Row 3: City & Product Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-city" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              City / Delivery Area <span className="text-amber-600">*</span>
            </label>
            <input
              type="text"
              id="lead-city"
              name="city"
              required
              value={formData.city}
              onChange={handleInputChange}
              placeholder="e.g. Karachi (Jodia Bazaar / Gulshan / Malir)"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900"
            />
          </div>

          <div>
            <label htmlFor="lead-product" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Product Interested In <span className="text-amber-600">*</span>
            </label>
            <select
              id="lead-product"
              name="productSlug"
              value={formData.productSlug}
              onChange={handleProductChange}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900 font-semibold"
            >
              {products.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.name} ({p.status === 'active' ? 'Available' : 'Pre-Order'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4: Pack Size & Estimated Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lead-packSize" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Required Pack Size
            </label>
            <select
              id="lead-packSize"
              name="packSize"
              value={formData.packSize}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900"
            >
              {selectedProduct?.packSizes && selectedProduct.packSizes.length > 0 ? (
                selectedProduct.packSizes.map((pack) => (
                  <option key={pack.size + pack.unit} value={`${pack.size}${pack.unit}`}>
                    {pack.size}{pack.unit} {pack.minOrderQty ? `(${pack.minOrderQty})` : ''}
                  </option>
                ))
              ) : (
                <option value="Standard Packaging">Standard Packaging</option>
              )}
              <option value="Mixed Pack Assortment">Mixed Pack Assortment</option>
            </select>
          </div>

          <div>
            <label htmlFor="lead-quantity" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Estimated Order Quantity <span className="text-amber-600">*</span>
            </label>
            <input
              type="text"
              id="lead-quantity"
              name="estimatedQuantity"
              required
              value={formData.estimatedQuantity}
              onChange={handleInputChange}
              placeholder="e.g. 50 Bags, 100 Cartons, 2 Metric Tons"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="lead-message" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Order Notes / Special Delivery Requirements
          </label>
          <textarea
            id="lead-message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Specify preferred dispatch timing, regular weekly restocking needs, or sample request..."
            className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-stone-900"
          ></textarea>
        </div>

        {/* Form Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            id="btn-submit-inquiry"
            disabled={submitting}
            className="w-full sm:flex-1 py-3 px-6 rounded-lg bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Processing Inquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Wholesale Inquiry</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-stone-500 text-center sm:text-left">
          * Inquiries are received directly by our sales desk. We respect your business privacy and do not share contact information.
        </p>
      </form>
    </div>
  );
};
