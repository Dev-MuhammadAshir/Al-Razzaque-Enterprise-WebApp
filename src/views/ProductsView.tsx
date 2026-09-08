import React from 'react';
import { Package, Shield, HelpCircle } from 'lucide-react';
import { getAllProducts } from '../data/products';
import { ProductGrid } from '../components/ProductGrid';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Product } from '../types';

interface ProductsViewProps {
  onNavigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenInquiry: (product?: Product) => void;
  onOpenConfig?: () => void;
  initialCategory?: string;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  onNavigate,
  onSelectProduct,
  onOpenInquiry,
  onOpenConfig,
  initialCategory
}) => {
  const products = getAllProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Products Catalog', url: '/products' }]}
        onNavigate={onNavigate}
      />

      {/* Header Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-10 border border-stone-800 relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Package className="w-3.5 h-3.5" />
            <span>Standardized Wheat Flour Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Wheat Flour &amp; Atta Products
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Engineered for daily rotis, consumer retail stocking, and commercial foodservice. Browse our standardized packaging options from 5kg family packs to 50kg industrial sacks.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <WhatsAppButton
              label="Request Rate Sheet via WhatsApp"
              variant="primary"
              size="sm"
              onOpenConfig={onOpenConfig}
            />
            <button
              type="button"
              onClick={() => onNavigate('/bulk-orders')}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Bulk 50kg Orders
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid with Search & Filters */}
      <ProductGrid
        products={products}
        onSelectProduct={onSelectProduct}
        onOpenInquiry={onOpenInquiry}
        onOpenConfig={onOpenConfig}
        initialCategory={initialCategory || 'all'}
      />

      {/* Bottom B2B Reassurance */}
      <div className="p-6 bg-stone-100 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
        <div className="flex items-center gap-2.5">
          <Shield className="w-5 h-5 text-amber-700 shrink-0" />
          <span>
            <strong>B2B Pricing Guarantee:</strong> All wholesale quotations are based on direct mill rates and current market grain indices without distributor markup.
          </span>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/faq')}
          className="text-amber-800 font-bold hover:underline shrink-0 flex items-center gap-1"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Check Packaging &amp; MOQ FAQs</span>
        </button>
      </div>
    </div>
  );
};
