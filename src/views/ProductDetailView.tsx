import React, { useState } from 'react';
import {
  Package,
  ShieldCheck,
  CheckCircle2,
  Scale,
  Building2,
  FileText,
  Clock,
  ArrowRight,
  Share2,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { getAllProducts } from '../data/products';
import { getProductFaqs } from '../data/faqs';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductBadge } from '../components/ProductBadge';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { PhoneButton } from '../components/PhoneButton';
import { ProductCard } from '../components/ProductCard';
import { FAQ } from '../components/FAQ';
import { generateProductSchema } from '../data/seo';

interface ProductDetailViewProps {
  product: Product;
  onNavigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenInquiry: (product: Product) => void;
  onOpenConfig?: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onNavigate,
  onSelectProduct,
  onOpenInquiry,
  onOpenConfig
}) => {
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const allProducts = getAllProducts();
  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug).slice(0, 3);
  const productFaqs = getProductFaqs(product.slug);

  const selectedPack = product.packSizes?.[selectedPackIndex] || product.packSizes?.[0];
  const schemaJson = JSON.stringify(generateProductSchema(product));

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Schema.org Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />

      {/* Breadcrumbs */}
      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: 'Products', url: '/products' },
            { label: product.name, url: `/products/${product.slug}` }
          ]}
          onNavigate={onNavigate}
        />

        <button
          type="button"
          onClick={handleShare}
          className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Column: Product Visuals */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-50 rounded-2xl border border-stone-200 aspect-4/3 flex items-center justify-center p-6 relative overflow-hidden">
            <img
              src={product.images[0]?.src || '/images/products/marka-atta.svg'}
              alt={product.images[0]?.alt || product.name}
              className="w-full h-full object-contain drop-shadow-md"
            />
            <div className="absolute top-4 left-4">
              <ProductBadge status={product.status} />
            </div>
            {product.brand && (
              <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded bg-stone-900/90 text-stone-200 text-xs font-semibold backdrop-blur-xs">
                Brand: {product.brand}
              </div>
            )}
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-2">
            <div className="flex items-center gap-2 font-bold text-stone-800">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Commercial Packaging Assurance</span>
            </div>
            <p>
              Packed in food-grade, moisture-resistant multi-wall bags with tamper-evident stitching to ensure shelf freshness during transit and store storage.
            </p>
          </div>
        </div>

        {/* Right Column: Product Overview & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              {product.category.replace(/-/g, ' ')}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mt-1">
              {product.name}
            </h1>
            <p className="mt-3 text-base text-stone-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Available Packaging Selector */}
          {product.packSizes && product.packSizes.length > 0 && (
            <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Select Pack Size to Inquire:
                </span>
                {selectedPack && (
                  <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
                    MOQ: {selectedPack.minOrderQty || 'Standard wholesale lot'}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {product.packSizes.map((pack, idx) => {
                  const isSelected = selectedPackIndex === idx;
                  return (
                    <button
                      key={pack.size + pack.unit}
                      type="button"
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-xs scale-102 ring-2 ring-amber-500/40'
                          : 'bg-white text-stone-700 border border-stone-300 hover:border-amber-400'
                      }`}
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>{pack.size}{pack.unit}</span>
                      <span className="text-[10px] opacity-80">({pack.packagingType})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="p-5 bg-stone-900 text-stone-100 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-400 pb-2 border-b border-stone-800">
              <span>Ready for immediate B2B dispatch</span>
              <span className="text-amber-400 font-medium">Direct Mill Wholesale Rates</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                id="pdp-quote-cta"
                onClick={() => onOpenInquiry(product)}
                className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Request Wholesale Price</span>
              </button>

              <WhatsAppButton
                label="WhatsApp for Current Rate"
                variant="primary"
                size="md"
                productName={product.name}
                packSize={selectedPack ? `${selectedPack.size}${selectedPack.unit}` : undefined}
                className="w-full"
                onOpenConfig={onOpenConfig}
              />
            </div>

            <div className="pt-2 flex items-center justify-center">
              <PhoneButton
                label="Call Sales Desk Directly"
                variant="outline"
                size="sm"
                onOpenConfig={onOpenConfig}
              />
            </div>
          </div>

          {/* Suitable Customers */}
          {product.suitableFor && product.suitableFor.length > 0 && (
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                Ideal For Commercial Buyers:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.suitableFor.map((target, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-stone-100 text-stone-700 text-xs font-semibold rounded-full border border-stone-200"
                  >
                    <Building2 className="w-3 h-3 text-amber-700" />
                    {target}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Technical Specifications & Features */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-stone-200">
        {/* Specifications Table */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-lg font-bold text-stone-900 border-l-4 border-amber-600 pl-3">
            Product Specifications
          </h2>
          <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden">
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-stone-200">
                {product.specifications?.flourType && (
                  <tr>
                    <th className="py-3 px-4 font-bold text-stone-700 bg-stone-100/70 w-1/3">Flour Type</th>
                    <td className="py-3 px-4 text-stone-800">{product.specifications.flourType}</td>
                  </tr>
                )}
                {product.specifications?.moistureLevel && (
                  <tr>
                    <th className="py-3 px-4 font-bold text-stone-700 bg-stone-100/70">Moisture Control</th>
                    <td className="py-3 px-4 text-stone-800">{product.specifications.moistureLevel}</td>
                  </tr>
                )}
                {product.specifications?.packagingMaterial && (
                  <tr>
                    <th className="py-3 px-4 font-bold text-stone-700 bg-stone-100/70">Packaging Material</th>
                    <td className="py-3 px-4 text-stone-800">{product.specifications.packagingMaterial}</td>
                  </tr>
                )}
                {product.specifications?.applications && (
                  <tr>
                    <th className="py-3 px-4 font-bold text-stone-700 bg-stone-100/70">Primary Applications</th>
                    <td className="py-3 px-4 text-stone-800">
                      {product.specifications.applications.join(', ')}
                    </td>
                  </tr>
                )}
                {product.specifications?.shelfLife && (
                  <tr>
                    <th className="py-3 px-4 font-bold text-stone-700 bg-stone-100/70">Shelf Stability</th>
                    <td className="py-3 px-4 text-stone-800">{product.specifications.shelfLife}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Milling Features & Quality Points */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-lg font-bold text-stone-900 border-l-4 border-amber-600 pl-3">
            Milling Standards &amp; Dough Performance
          </h2>
          <div className="bg-stone-50 rounded-xl border border-stone-200 p-5 space-y-3">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Specific FAQs */}
      {productFaqs.length > 0 && (
        <div className="pt-8 border-t border-stone-200">
          <FAQ
            items={productFaqs}
            title={`${product.name} Trade FAQs`}
            subtitle="Common inquiries regarding pack sizes, minimum order quantities, and delivery schedules for this product."
          />
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-stone-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900">
              Other Wheat Flour Products
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('/products')}
              className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onOpenInquiry={onOpenInquiry}
                onOpenConfig={onOpenConfig}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
