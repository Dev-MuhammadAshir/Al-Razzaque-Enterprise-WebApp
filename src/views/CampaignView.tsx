import React from 'react';
import { CheckCircle2, ArrowRight, Package, ShieldCheck, Store, Building2 } from 'lucide-react';
import { CampaignPage, Product } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { PhoneButton } from '../components/PhoneButton';
import { InquiryForm } from '../components/InquiryForm';
import { FAQ } from '../components/FAQ';
import { getProductBySlug } from '../data/products';

interface CampaignViewProps {
  campaign: CampaignPage;
  onNavigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenInquiry: (product?: Product) => void;
  onOpenConfig?: () => void;
}

export const CampaignView: React.FC<CampaignViewProps> = ({
  campaign,
  onNavigate,
  onSelectProduct,
  onOpenInquiry,
  onOpenConfig
}) => {
  const targetSlug = campaign.targetProductSlug || campaign.productSlugs?.[0];
  const primaryProduct = targetSlug ? getProductBySlug(targetSlug) : undefined;

  const headline = campaign.heroHeadline || campaign.headline;
  const subheadline = campaign.heroSubheadline || campaign.subheadline;
  const primaryCta = campaign.primaryCtaText || campaign.primaryCTA || 'Request Wholesale Price';
  const secondaryCta = campaign.secondaryCtaText || campaign.secondaryCTA || 'WhatsApp for Bulk Orders';
  const highlights = campaign.highlights || campaign.valueProps?.map(v => `${v.title} — ${v.description}`) || [];
  const targetAudiences = campaign.targetAudiences || campaign.targetAudience || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs
        items={[{ label: campaign.title, url: `/${campaign.slug}` }]}
        onNavigate={onNavigate}
      />

      {/* Campaign Hero */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-10 lg:p-12 border border-stone-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Package className="w-3.5 h-3.5" />
            <span>Targeted Commercial Supply</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {headline}
          </h1>

          <p className="text-base sm:text-lg text-stone-300 leading-relaxed">
            {subheadline}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#campaign-inquiry"
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow transition-colors text-center cursor-pointer"
            >
              {primaryCta}
            </a>

            <WhatsAppButton
              label={secondaryCta}
              variant="outline"
              size="md"
              productName={primaryProduct?.name}
              onOpenConfig={onOpenConfig}
            />

            <PhoneButton
              label="Call Sales"
              variant="secondary"
              size="md"
              onOpenConfig={onOpenConfig}
            />
          </div>
        </div>
      </div>

      {/* Highlights & Target Audiences */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Core Highlights */}
        <div className="lg:col-span-7 bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-900 border-l-4 border-amber-600 pl-3">
            Why Source From Al Razzaque Enterprise
          </h2>
          <div className="space-y-3 pt-2">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-stone-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience Profile */}
        <div className="lg:col-span-5 bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-stone-100 border-l-4 border-amber-500 pl-3">
            Supplying Directly To:
          </h2>
          <div className="space-y-2.5 pt-2">
            {targetAudiences.map((audience, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-300">
                <Store className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{audience}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Card if linked */}
      {primaryProduct && (
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 bg-white rounded-xl border border-stone-200 p-2 flex items-center justify-center shrink-0">
              <img
                src={primaryProduct.images[0]?.src || '/images/products/marka-atta.svg'}
                alt={primaryProduct.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-amber-800">Featured Product</span>
              <h3 className="text-lg font-bold text-stone-900">{primaryProduct.name}</h3>
              <p className="text-xs text-stone-600 mt-1 max-w-lg">{primaryProduct.shortDescription}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onSelectProduct(primaryProduct)}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Full Specifications
            </button>
            <WhatsAppButton
              label="WhatsApp Quote"
              variant="primary"
              size="sm"
              productName={primaryProduct.name}
              onOpenConfig={onOpenConfig}
            />
          </div>
        </div>
      )}

      {/* Dedicated Inquiry Form */}
      <div id="campaign-inquiry" className="max-w-3xl mx-auto">
        <InquiryForm
          title={`Inquire About ${campaign.title}`}
          subtitle="Submit your required volume and delivery location for instant wholesale quotation."
          initialProductSlug={campaign.targetProductSlug}
        />
      </div>

      {/* FAQs */}
      {campaign.faqs && campaign.faqs.length > 0 && (
        <FAQ
          items={campaign.faqs}
          title={`${campaign.title} Trade FAQs`}
          subtitle="Direct answers on packing specifications, ordering, and delivery logistics."
        />
      )}
    </div>
  );
};
