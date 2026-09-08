import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileStickyCTA } from './components/MobileStickyCTA';
import { LeadVaultModal } from './components/LeadVaultModal';
import { ConfigModal } from './components/ConfigModal';
import { QuickInquiryModal } from './components/QuickInquiryModal';
import { AnalyticsDebugger } from './components/AnalyticsDebugger';

// Views
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ProductDetailView } from './views/ProductDetailView';
import { WholesaleView } from './views/WholesaleView';
import { BulkOrdersView } from './views/BulkOrdersView';
import { CampaignView } from './views/CampaignView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { FAQView } from './views/FAQView';
import { PrivacyPolicyView, TermsView } from './views/LegalViews';
import { NotFoundView } from './views/NotFoundView';

// Data & Helpers
import { getProductBySlug } from './data/products';
import { getCampaignBySlug } from './data/campaigns';
import { captureAttributionFromUrl } from './lib/attribution';
import { trackEvent } from './lib/analytics';
import { getStoredLeads } from './lib/leads';
import { generateOrganizationSchema, generateWebsiteSchema } from './data/seo';
import { Product } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hashPath = window.location.hash.replace(/^#/, '');
      return hashPath || window.location.pathname || '/';
    }
    return '/';
  });

  const [leadVaultOpen, setLeadVaultOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [inquiryModalProduct, setInquiryModalProduct] = useState<Product | null>(null);
  const [leadsCount, setLeadsCount] = useState(0);

  // Initialize attribution & lead counts on mount
  useEffect(() => {
    captureAttributionFromUrl();
    const leads = getStoredLeads();
    setLeadsCount(leads.length);

    const handleLeadChange = () => {
      setLeadsCount(getStoredLeads().length);
    };

    window.addEventListener('al-razzaque-lead-saved', handleLeadChange);
    window.addEventListener('al-razzaque-lead-updated', handleLeadChange);

    // Browser back/forward navigation support
    const handlePopState = () => {
      const hashPath = window.location.hash.replace(/^#/, '');
      const path = hashPath || window.location.pathname || '/';
      setCurrentPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('al-razzaque-lead-saved', handleLeadChange);
      window.removeEventListener('al-razzaque-lead-updated', handleLeadChange);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Track page_view event on route change and scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent('page_view', { page: currentPath });
  }, [currentPath]);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (window.history.pushState) {
      window.history.pushState({}, '', path);
    }
  };

  const handleSelectProduct = (product: Product) => {
    navigateTo(`/products/${product.slug}`);
  };

  const handleOpenInquiry = (product?: Product) => {
    if (product) {
      setInquiryModalProduct(product);
    } else {
      navigateTo('/bulk-orders');
    }
  };

  // Route matching logic
  const renderCurrentView = () => {
    const cleanPath = currentPath.split('?')[0];

    // Single Product Detail: /products/[slug]
    if (cleanPath.startsWith('/products/') && cleanPath.length > '/products/'.length) {
      const slug = cleanPath.replace('/products/', '');
      const product = getProductBySlug(slug);

      if (product) {
        return (
          <ProductDetailView
            product={product}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onOpenInquiry={handleOpenInquiry}
            onOpenConfig={() => setConfigOpen(true)}
          />
        );
      }
      return <NotFoundView onNavigate={navigateTo} onOpenConfig={() => setConfigOpen(true)} />;
    }

    // Campaign landing pages: /wholesale-atta or /marka-atta
    if (cleanPath === '/wholesale-atta' || cleanPath === '/marka-atta') {
      const campaignSlug = cleanPath.replace('/', '');
      const campaign = getCampaignBySlug(campaignSlug);

      if (campaign) {
        return (
          <CampaignView
            campaign={campaign}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onOpenInquiry={handleOpenInquiry}
            onOpenConfig={() => setConfigOpen(true)}
          />
        );
      }
    }

    switch (cleanPath) {
      case '/':
        return (
          <HomeView
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onOpenInquiry={handleOpenInquiry}
            onOpenConfig={() => setConfigOpen(true)}
          />
        );

      case '/products':
        return (
          <ProductsView
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onOpenInquiry={handleOpenInquiry}
            onOpenConfig={() => setConfigOpen(true)}
          />
        );

      case '/wholesale':
        return (
          <WholesaleView
            onNavigate={navigateTo}
            onOpenConfig={() => setConfigOpen(true)}
          />
        );

      case '/bulk-orders':
        return (
          <BulkOrdersView
            onNavigate={navigateTo}
            onOpenConfig={() => setConfigOpen(true)}
          />
        );

      case '/about':
        return (
          <AboutView
            onNavigate={navigateTo}
            onOpenConfig={() => setConfigOpen(true)}
          />
        );

      case '/contact':
        return (
          <ContactView
            onNavigate={navigateTo}
            onOpenConfig={() => setConfigOpen(true)}
          />
        );

      case '/faq':
        return (
          <FAQView
            onNavigate={navigateTo}
            onOpenConfig={() => setConfigOpen(true)}
          />
        );

      case '/privacy-policy':
        return <PrivacyPolicyView onNavigate={navigateTo} />;

      case '/terms':
        return <TermsView onNavigate={navigateTo} />;

      default:
        return <NotFoundView onNavigate={navigateTo} onOpenConfig={() => setConfigOpen(true)} />;
    }
  };

  const orgSchema = JSON.stringify(generateOrganizationSchema());
  const websiteSchema = JSON.stringify(generateWebsiteSchema());

  return (
    <div className="min-h-screen flex flex-col bg-white text-stone-900 font-sans antialiased selection:bg-amber-200 selection:text-amber-950">
      {/* Schema.org Global Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: websiteSchema }} />

      {/* Global Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenLeads={() => setLeadVaultOpen(true)}
        onOpenConfig={() => setConfigOpen(true)}
        leadsCount={leadsCount}
      />

      {/* Main Page Content */}
      <main className="flex-1 pb-16 lg:pb-0">
        {renderCurrentView()}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenConfig={() => setConfigOpen(true)}
      />

      {/* Mobile Sticky Bottom Conversion Bar */}
      <MobileStickyCTA
        onNavigate={navigateTo}
        onOpenConfig={() => setConfigOpen(true)}
      />

      {/* Quick Inquiry Modal for Cards */}
      <QuickInquiryModal
        product={inquiryModalProduct}
        isOpen={!!inquiryModalProduct}
        onClose={() => setInquiryModalProduct(null)}
      />

      {/* Lead Vault Modal */}
      <LeadVaultModal
        isOpen={leadVaultOpen}
        onClose={() => setLeadVaultOpen(false)}
      />

      {/* Configuration Override Modal */}
      <ConfigModal
        isOpen={configOpen}
        onClose={() => setConfigOpen(false)}
      />

      {/* Analytics & Conversion Event Monitor */}
      <AnalyticsDebugger />
    </div>
  );
}
