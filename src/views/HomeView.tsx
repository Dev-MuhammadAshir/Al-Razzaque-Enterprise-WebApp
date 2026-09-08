import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Package,
  Store,
  Building2,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  TrendingUp,
  Scale
} from 'lucide-react';
import { getFeaturedProducts } from '../data/products';
import { categories } from '../data/categories';
import { getBusinessConfig } from '../data/business';
import { ProductCard } from '../components/ProductCard';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { PhoneButton } from '../components/PhoneButton';
import { FAQ } from '../components/FAQ';
import { InquiryForm } from '../components/InquiryForm';
import { Product } from '../types';
import { trackEvent } from '../lib/analytics';

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenInquiry: (product?: Product) => void;
  onOpenConfig?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProduct,
  onOpenInquiry,
  onOpenConfig
}) => {
  const business = getBusinessConfig();
  const featuredProducts = getFeaturedProducts();

  const handleHeroWholesaleClick = () => {
    trackEvent('click_wholesale_cta', { page: '/', label: 'Hero Wholesale Rate' });
    onNavigate('/wholesale');
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-stone-100 py-16 sm:py-24 border-b border-stone-800">
        {/* Subtle wheat texture / ambient background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Wholesale &amp; Retail Wheat Flour Supply</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-100 tracking-tight leading-tight">
                Quality Wheat Atta for <span className="text-amber-500">Homes, Retailers &amp; Marts</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Explore quality wheat flour products from <strong className="text-stone-100 font-semibold">{business.name}</strong>, with options for everyday household use, retail store supply, and bulk commercial orders.
              </p>

              {/* Conversion CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <button
                  type="button"
                  id="hero-primary-cta"
                  onClick={handleHeroWholesaleClick}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-900/20 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Get Wholesale Price</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  id="hero-secondary-cta"
                  onClick={() => onNavigate('/products')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 font-semibold text-sm sm:text-base transition-all cursor-pointer"
                >
                  View Products Catalog
                </button>
              </div>

              {/* Quick WhatsApp conversion line */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2">
                <WhatsAppButton
                  label="WhatsApp for Bulk Orders"
                  variant="primary"
                  size="sm"
                  onOpenConfig={onOpenConfig}
                />
                <PhoneButton
                  label="Call Orders"
                  variant="outline"
                  size="sm"
                  onOpenConfig={onOpenConfig}
                />
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xs uppercase font-bold text-stone-400">Target Sectors</div>
                  <div className="text-sm font-semibold text-stone-200 mt-0.5">Homes, Retail &amp; Marts</div>
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-stone-400">Pack Formats</div>
                  <div className="text-sm font-semibold text-stone-200 mt-0.5">5kg to 50kg Sacks</div>
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-stone-400">Trade Rates</div>
                  <div className="text-sm font-semibold text-stone-200 mt-0.5">Direct Mill Quotes</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-gradient-to-tr from-stone-800/90 to-stone-800/40 p-6 rounded-2xl border border-stone-700/80 shadow-2xl backdrop-blur-xs">
                <div className="absolute -top-3 -right-3 px-3 py-1 bg-amber-500 text-stone-950 text-xs font-black uppercase rounded-full shadow-md">
                  Core Mill Product
                </div>

                <div className="aspect-4/3 flex items-center justify-center bg-stone-950/60 rounded-xl p-4 border border-stone-700/50">
                  <img
                    src="/images/products/marka-atta.svg"
                    alt="Marka Atta Wheat Flour Pack"
                    className="h-56 w-auto object-contain drop-shadow-xl"
                  />
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-stone-100">Marka Atta</h2>
                      <p className="text-xs text-stone-400">Milled Wheat Atta for Daily Rotis &amp; Flatbreads</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      In Stock
                    </span>
                  </div>

                  <div className="p-3 bg-stone-900 rounded-lg border border-stone-800 text-xs text-stone-300 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                      <Scale className="w-3.5 h-3.5" />
                      <span>Available Sizes: 5kg, 10kg, 20kg, 50kg Sacks</span>
                    </div>
                    <p className="text-[11px] text-stone-400">
                      High water absorption, reliable dough elasticity, standard retail packaging.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('/products/marka-atta')}
                    className="w-full py-2.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 hover:text-amber-200 border border-amber-500/40 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Marka Atta Details &amp; Packaging Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Product Systems
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Wheat Flour Supply Categories
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/products')}
            className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 self-start md:self-auto cursor-pointer"
          >
            <span>Browse Complete Product Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onNavigate(`/products?category=${category.slug}`)}
              className="bg-stone-50 hover:bg-amber-50/40 p-5 rounded-xl border border-stone-200 hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-stone-900 group-hover:text-amber-900 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-amber-800">
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Current Mill Stock
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Featured Wheat Flour Products
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Milled and packaged for high dough yield, consumer shelf presence, and institutional food preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onOpenInquiry={onOpenInquiry}
              onOpenConfig={onOpenConfig}
            />
          ))}
        </div>
      </section>

      {/* 4. RETAILER & MART WHOLESALE SECTION */}
      <section className="bg-stone-900 text-stone-100 py-16 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Store className="w-3.5 h-3.5" />
                <span>Dedicated Retail Partner Program</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-100 leading-tight">
                Wholesale Wheat Atta Supply for <span className="text-amber-400">Grocery Stores &amp; Marts</span>
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                Stock quality wheat flour products for your business. Contact Al Razzaque Enterprise for available products, bulk-order information, and wholesale pricing.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Consistent grain milling standards to maintain customer repeat purchases',
                  'Multiple pack sizes (5kg, 10kg, 20kg) to match neighborhood grocery preferences',
                  'Standardized moisture control and food-grade packaging preventing shelf loss',
                  'Direct dispatch scheduling and transparent trade quotations'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  id="retailer-section-cta"
                  onClick={() => onNavigate('/wholesale')}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-xl shadow transition-colors cursor-pointer"
                >
                  Request Wholesale Pricing
                </button>
                <WhatsAppButton
                  label="WhatsApp for Bulk Orders"
                  variant="outline"
                  size="md"
                  onOpenConfig={onOpenConfig}
                />
              </div>
            </div>

            {/* Right Card: Commercial Highlights */}
            <div className="lg:col-span-6 bg-stone-950 p-6 sm:p-8 rounded-2xl border border-stone-800 space-y-6">
              <h3 className="text-lg font-bold text-stone-100 border-b border-stone-800 pb-3">
                Serving Diverse Commercial Trade Segments
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-900 rounded-xl border border-stone-800">
                  <Store className="w-5 h-5 text-amber-500 mb-2" />
                  <h4 className="font-bold text-sm text-stone-200">Retail Grocery Stores</h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Shelf-ready 5kg and 10kg consumer bags for steady neighborhood turnover.
                  </p>
                </div>

                <div className="p-4 bg-stone-900 rounded-xl border border-stone-800">
                  <Building2 className="w-5 h-5 text-amber-500 mb-2" />
                  <h4 className="font-bold text-sm text-stone-200">Supermarkets &amp; Marts</h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Carton assortments, barcode packaging, and scheduled restocking.
                  </p>
                </div>

                <div className="p-4 bg-stone-900 rounded-xl border border-stone-800">
                  <TrendingUp className="w-5 h-5 text-amber-500 mb-2" />
                  <h4 className="font-bold text-sm text-stone-200">Wholesale Stockists</h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Heavy-duty 50kg sacks and metric ton lots for grain bazaar traders.
                  </p>
                </div>

                <div className="p-4 bg-stone-900 rounded-xl border border-stone-800">
                  <Truck className="w-5 h-5 text-amber-500 mb-2" />
                  <h4 className="font-bold text-sm text-stone-200">Commercial Foodservice</h4>
                  <p className="text-xs text-stone-400 mt-1">
                    Consistent flour performance for bakeries, tandoors, and institutional caterers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US / SUPPLY ASSURANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Supply Continuity
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Built for Serious Commercial Buyers
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            No exaggerated claims or unrealistic promises. We focus on consistent grain selection, reliable milling, and disciplined logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">Standardized Weight &amp; Bagging</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every 5kg, 10kg, 20kg bag and 50kg commercial sack is packed using calibrated scales and durable multi-layer bags to minimize transit loss.
            </p>
          </div>

          <div className="p-6 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">Consistent Dough Performance</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Carefully regulated milling ensures dependable gluten strength and water absorption for rotis that stay soft and pliable.
            </p>
          </div>

          <div className="p-6 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900">Prompt B2B Inquiries</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Direct access to our commercial sales desk via WhatsApp and phone for immediate rate checks, availability confirmation, and bilty tracking.
            </p>
          </div>
        </div>
      </section>

      {/* 6. ORDER PROCESS */}
      <section className="bg-stone-100/80 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Straightforward Trade Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              How to Procure From Al Razzaque Enterprise
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              From initial product selection to final loading dock delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Select Products & Volumes',
                desc: 'Browse our wheat flour range (Marka Atta, Chakki Fresh, 50kg Sacks) and identify your pack requirements.'
              },
              {
                step: '02',
                title: 'Request Wholesale Quote',
                desc: 'Submit our bulk inquiry form or contact our WhatsApp desk for immediate current market quotation.'
              },
              {
                step: '03',
                title: 'Order Booking & Confirmation',
                desc: 'Confirm required bag counts, agreed wholesale rates, and delivery or pickup logistics arrangements.'
              },
              {
                step: '04',
                title: 'Dispatch & Bilty Tracking',
                desc: 'Order dispatched with bilty and weight verification documentation shared directly to your phone.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs relative">
                <span className="text-2xl font-black text-amber-600/30 block mb-2 font-mono">
                  {item.step}
                </span>
                <h3 className="font-bold text-sm text-stone-900">{item.title}</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DIRECT INQUIRY SECTION ON HOMEPAGE */}
      <section id="home-inquiry-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <InquiryForm
          title="Direct Wholesale &amp; Bulk Atta Inquiry"
          subtitle="Submit your required product, pack size, and volume to receive immediate wholesale pricing."
        />
      </section>

      {/* 8. FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQ />
      </section>
    </div>
  );
};
