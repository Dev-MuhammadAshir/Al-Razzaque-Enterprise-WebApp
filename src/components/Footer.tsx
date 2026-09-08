import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Shield, ArrowUpRight } from 'lucide-react';
import { getBusinessConfig } from '../data/business';
import { getAllProducts } from '../data/products';
import { WhatsAppButton } from './WhatsAppButton';
import { PhoneButton } from './PhoneButton';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenConfig?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConfig }) => {
  const [business, setBusiness] = useState(getBusinessConfig());
  const products = getAllProducts();

  useEffect(() => {
    const handleConfigChange = () => setBusiness(getBusinessConfig());
    window.addEventListener('business-config-updated', handleConfigChange);
    return () => window.removeEventListener('business-config-updated', handleConfigChange);
  }, []);

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Top Value Banner */}
      <div className="border-b border-stone-800/80 bg-stone-900/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-100">
              Need Continuous Wheat Atta Supply for Your Business?
            </h3>
            <p className="text-sm text-stone-400 mt-1 max-w-2xl">
              Al Razzaque Enterprise delivers dependable flour quality for neighborhood grocery stores, supermarkets, commercial tandoors, and wholesale distributors.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              id="footer-cta-bulk-order"
              onClick={() => onNavigate('/bulk-orders')}
              className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow transition-all cursor-pointer"
            >
              Request Wholesale Quote
            </button>
            <WhatsAppButton
              label="WhatsApp Bulk Desk"
              variant="outline"
              size="md"
              onOpenConfig={onOpenConfig}
            />
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center text-stone-950 font-black text-lg">
                AR
              </div>
              <span className="font-bold text-xl text-stone-100 tracking-wide">
                {business.name}
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed pr-4">
              Dedicated wheat flour supplier serving households, retailers, marts, wholesalers, and bulk food commercial buyers with consistent milling and reliable trade fulfillments.
            </p>
            <div className="p-3.5 bg-stone-900 rounded-lg border border-stone-800 text-xs text-stone-400 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                <Shield className="w-4 h-4" />
                <span>B2B Supply Assurance</span>
              </div>
              <p>Direct mill rates, standardized moisture control, and transparent order tracking.</p>
            </div>
          </div>

          {/* Product Catalog */}
          <div>
            <h4 className="text-sm font-bold text-stone-100 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Flour Products
            </h4>
            <ul className="space-y-2 text-sm">
              {products.map((product) => (
                <li key={product.slug}>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/products/${product.slug}`)}
                    className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center justify-between w-full group"
                  >
                    <span>{product.name}</span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-stone-900 text-stone-400 group-hover:text-amber-400">
                      {product.status === 'active' ? 'Available' : 'Coming'}
                    </span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/products')}
                  className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View Complete Catalog</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Commercial Solutions */}
          <div>
            <h4 className="text-sm font-bold text-stone-100 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Commercial Trade
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/wholesale')}
                  className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Wholesale for Retailers &amp; Marts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/bulk-orders')}
                  className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Commercial Bulk (50kg Sacks)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/wholesale-atta')}
                  className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Atta Wholesale Supply
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/marka-atta')}
                  className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Marka Atta Wholesale
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/faq')}
                  className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Commercial FAQs &amp; MOQ
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-stone-100 uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Inquiry Desk
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-stone-500 uppercase font-semibold">Direct Call</span>
                  {business.phone ? (
                    <a href={`tel:${business.phone}`} className="text-stone-200 hover:text-amber-400 font-medium">
                      {business.phone}
                    </a>
                  ) : (
                    <span className="text-xs text-stone-500 italic">Configuration pending</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-stone-500 uppercase font-semibold">WhatsApp Orders</span>
                  {business.whatsapp ? (
                    <span className="text-stone-200 font-medium">{business.whatsapp}</span>
                  ) : (
                    <span className="text-xs text-stone-500 italic">Configuration pending</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-stone-500 uppercase font-semibold">Email Orders</span>
                  {business.email ? (
                    <a href={`mailto:${business.email}`} className="text-stone-200 hover:text-amber-400">
                      {business.email}
                    </a>
                  ) : (
                    <span className="text-xs text-stone-500 italic">Configuration pending</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-stone-500 uppercase font-semibold">Commercial Hub</span>
                  <span className="text-stone-400 text-xs">
                    {business.address || "Dispatch across commercial trading hubs"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Compliance */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved. Wheat flour &amp; atta supplier.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate('/privacy-policy')}
              className="hover:text-stone-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/terms')}
              className="hover:text-stone-300 transition-colors"
            >
              Terms &amp; Wholesale Conditions
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="hover:text-stone-300 transition-colors"
            >
              Commercial Contact
            </button>
            {onOpenConfig && (
              <button
                type="button"
                onClick={onOpenConfig}
                className="text-amber-500 hover:underline"
              >
                Store Config
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
