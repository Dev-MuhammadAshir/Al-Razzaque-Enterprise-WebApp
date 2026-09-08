import React from 'react';
import { ArrowRight, Package, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductBadge } from './ProductBadge';
import { WhatsAppButton } from './WhatsAppButton';
import { trackEvent } from '../lib/analytics';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onOpenInquiry?: (product: Product) => void;
  onOpenConfig?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onOpenInquiry,
  onOpenConfig
}) => {
  const handleCardClick = () => {
    trackEvent('view_product', {
      product: product.slug,
      product_name: product.name,
      category: product.category,
      status: product.status
    });
    onSelect(product);
  };

  const isAvailable = product.status === 'active';

  return (
    <div
      id={`product-card-${product.slug}`}
      className="group bg-white rounded-xl border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-400/80 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Product Image & Badges */}
      <div
        className="relative bg-stone-100 aspect-4/3 overflow-hidden cursor-pointer flex items-center justify-center p-4 border-b border-stone-100"
        onClick={handleCardClick}
      >
        <img
          src={product.thumbnail || product.images[0]?.src || '/images/products/marka-atta.svg'}
          alt={product.images[0]?.alt || product.name}
          loading="lazy"
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <ProductBadge status={product.status} />
          {product.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500 text-stone-950 uppercase tracking-wide shadow-xs">
              <Sparkles className="w-3 h-3" />
              Featured Mill Product
            </span>
          )}
        </div>

        {product.brand && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-stone-900/80 text-stone-200 text-[11px] font-medium backdrop-blur-xs">
            {product.brand}
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-amber-800">
              {product.category.replace(/-/g, ' ')}
            </span>
          </div>

          <h3
            onClick={handleCardClick}
            className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition-colors cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Pack sizes pills */}
          {product.packSizes && product.packSizes.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-stone-100">
              <span className="block text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                Available Packaging Sizes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.packSizes.map((pack) => (
                  <span
                    key={`${product.id}-${pack.size}${pack.unit}`}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium text-xs border border-stone-200"
                  >
                    <Package className="w-3 h-3 text-stone-500" />
                    {pack.size}{pack.unit}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action CTAs */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              id={`btn-details-${product.slug}`}
              onClick={handleCardClick}
              className="flex-1 py-2 px-3 text-xs font-bold rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Product Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {isAvailable && onOpenInquiry && (
              <button
                type="button"
                id={`btn-quote-${product.slug}`}
                onClick={() => onOpenInquiry(product)}
                className="py-2 px-3 text-xs font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
              >
                Wholesale Quote
              </button>
            )}
          </div>

          {isAvailable && (
            <WhatsAppButton
              label="WhatsApp for Rates"
              variant="outline"
              size="sm"
              productName={product.name}
              packSize={product.packSizes?.[0] ? `${product.packSizes[0].size}${product.packSizes[0].unit}` : undefined}
              onOpenConfig={onOpenConfig}
            />
          )}
        </div>
      </div>
    </div>
  );
};
