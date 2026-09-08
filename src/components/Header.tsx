import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, FileText, Settings, ShieldCheck, ChevronRight } from 'lucide-react';
import { getBusinessConfig } from '../data/business';
import { WhatsAppButton } from './WhatsAppButton';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenLeads?: () => void;
  onOpenConfig?: () => void;
  leadsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenLeads,
  onOpenConfig,
  leadsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [business, setBusiness] = useState(getBusinessConfig());

  useEffect(() => {
    const handleConfigChange = () => setBusiness(getBusinessConfig());
    window.addEventListener('business-config-updated', handleConfigChange);
    return () => window.removeEventListener('business-config-updated', handleConfigChange);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Wholesale', path: '/wholesale' },
    { label: 'Bulk Orders', path: '/bulk-orders' },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' }
  ];

  const handleLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-md border-b border-stone-800">
      {/* Top micro-bar for B2B trade assurance & quick actions */}
      <div className="bg-stone-950 px-4 py-1.5 text-xs text-stone-400 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-stone-300">Official B2B Wheat Flour Supply Line</span>
            <span className="hidden md:inline text-stone-500">•</span>
            <span className="hidden md:inline text-stone-400">Homes, Grocery Stores, Marts &amp; Wholesale Traders</span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenLeads && (
              <button
                type="button"
                id="header-leads-vault-btn"
                onClick={onOpenLeads}
                className="flex items-center gap-1.5 text-stone-300 hover:text-amber-400 font-medium transition-colors cursor-pointer"
                title="View stored inquiries (Lead Vault)"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Inquiry Vault</span>
                {leadsCount > 0 && (
                  <span className="px-1.5 py-0.2 bg-amber-500 text-stone-950 font-bold rounded-full text-[10px]">
                    {leadsCount}
                  </span>
                )}
              </button>
            )}

            {onOpenConfig && (
              <button
                type="button"
                id="header-config-btn"
                onClick={onOpenConfig}
                className="flex items-center gap-1 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                title="Business Contact Configuration"
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Settings</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleLinkClick('/')}
          >
            <div className="w-11 h-11 rounded-lg bg-amber-600 flex items-center justify-center text-stone-950 font-black text-xl shadow-inner border border-amber-400/40 group-hover:bg-amber-500 transition-colors">
              AR
            </div>
            <div>
              <span className="block font-black text-lg tracking-wider text-stone-100 uppercase group-hover:text-amber-400 transition-colors leading-tight">
                {business.name}
              </span>
              <span className="block text-xs font-medium text-amber-500/90 tracking-wider uppercase">
                Wheat Flour &amp; Atta Supplier
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  id={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  type="button"
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-amber-400 bg-stone-800/80 font-semibold'
                      : 'text-stone-300 hover:text-stone-100 hover:bg-stone-800/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              id="header-cta-wholesale"
              onClick={() => handleLinkClick('/wholesale')}
              className="px-3.5 py-2 text-sm font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all cursor-pointer"
            >
              Wholesale Rates
            </button>
            <WhatsAppButton
              label="WhatsApp Inquiry"
              variant="primary"
              size="sm"
              onOpenConfig={onOpenConfig}
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 space-y-2">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleLinkClick(link.path)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-600/20 text-amber-400 font-bold border-l-4 border-amber-500'
                      : 'text-stone-200 hover:bg-stone-900'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-stone-500" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-800 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => handleLinkClick('/bulk-orders')}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-stone-950 font-bold rounded-lg text-sm text-center shadow transition-colors"
            >
              Get Wholesale Price &amp; Bulk Quote
            </button>
            <WhatsAppButton
              label="WhatsApp for Bulk Orders"
              variant="pill"
              size="md"
              className="w-full"
              onOpenConfig={onOpenConfig}
            />
          </div>
        </div>
      )}
    </header>
  );
};
