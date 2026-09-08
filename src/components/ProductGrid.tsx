import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, PackageX } from 'lucide-react';
import { Product } from '../types';
import { categories } from '../data/categories';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenInquiry?: (product: Product) => void;
  onOpenConfig?: () => void;
  showFilters?: boolean;
  initialCategory?: string;
  initialQuery?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onOpenInquiry,
  onOpenConfig,
  showFilters = true,
  initialCategory = 'all',
  initialQuery = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'all' && p.status !== selectedStatus) {
        return false;
      }
      // Text search
      if (!q) return true;

      const inName = p.name.toLowerCase().includes(q);
      const inBrand = (p.brand || '').toLowerCase().includes(q);
      const inDesc = p.shortDescription.toLowerCase().includes(q);
      const inCategory = p.category.toLowerCase().includes(q);
      const inPacks = (p.packSizes || []).some(
        (pack) =>
          `${pack.size}${pack.unit}`.toLowerCase().includes(q) ||
          `${pack.size} ${pack.unit}`.toLowerCase().includes(q)
      );
      const matchesKeyword = ['atta', 'flour', 'wheat', 'marka', 'chakki', 'maida', 'bulk'].some(
        (kw) => q.includes(kw) && (p.name.toLowerCase().includes(kw) || p.description.toLowerCase().includes(kw))
      );

      return inName || inBrand || inDesc || inCategory || inPacks || matchesKeyword;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="bg-stone-50 p-4 sm:p-5 rounded-xl border border-stone-200/80 space-y-4">
          {/* Top Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="product-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search wheat flour products (e.g. Marka Atta, 50kg, Chakki, Maida)..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Category:
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                All Categories ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat.slug
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <select
                id="status-filter-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="all">All Availability</option>
                <option value="active">In Stock &amp; Supply Ready</option>
                <option value="coming_soon">Coming Soon</option>
              </select>

              {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-xs text-stone-500 hover:text-amber-700 font-medium px-2 py-1"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 font-medium px-1">
        <span>Showing {filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'}</span>
        {searchQuery && <span>Filter applied: "{searchQuery}"</span>}
      </div>

      {/* Grid Display */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onOpenInquiry={onOpenInquiry}
              onOpenConfig={onOpenConfig}
            />
          ))}
        </div>
      ) : (
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-stone-200/80 flex items-center justify-center mx-auto text-stone-500 mb-3">
            <PackageX className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">No matching wheat products found</h3>
          <p className="mt-1 text-sm text-stone-600">
            We couldn't find any products matching your search criteria. Try a different keyword or view our complete catalog.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-lg text-xs font-semibold"
          >
            Reset Search Filters
          </button>
        </div>
      )}
    </div>
  );
};
