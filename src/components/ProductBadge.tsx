import React from 'react';
import { ProductStatus } from '../types';

interface ProductBadgeProps {
  status: ProductStatus;
  className?: string;
}

export const ProductBadge: React.FC<ProductBadgeProps> = ({ status, className = '' }) => {
  switch (status) {
    case 'active':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          In Stock &amp; Supply Ready
        </span>
      );
    case 'out_of_stock':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 ${className}`}
        >
          Currently Unavailable
        </span>
      );
    case 'coming_soon':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300 ${className}`}
        >
          Coming Soon (Pre-Booking)
        </span>
      );
    case 'discontinued':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-200 text-stone-700 border border-stone-300 ${className}`}
        >
          Discontinued
        </span>
      );
    default:
      return null;
  }
};
