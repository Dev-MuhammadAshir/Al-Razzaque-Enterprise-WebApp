import { SEOData, Product, FAQItem, BreadcrumbItem } from '../types';
import { defaultBusinessConfig, getBusinessConfig } from './business';

export const siteSeoDefaults: SEOData = {
  title: "Al Razzaque Enterprise | Wheat Flour & Atta Supplier",
  description:
    "Trusted supplier of quality wheat flour and atta products for households, retailers, marts, wholesalers, and bulk buyers.",
  keywords: [
    "Al Razzaque Enterprise",
    "wheat flour supplier",
    "atta supplier",
    "wholesale atta",
    "Marka Atta",
    "Chakki wheat flour",
    "50kg atta sacks",
    "retail flour packs",
    "wheat flour distributor"
  ],
  canonical: "https://alrazzaqueenterprise.com"
};

/**
 * Generate JSON-LD Structured Data for Organization / LocalBusiness
 * Strictly uses verified data; skips empty fields to avoid invalid schema.
 */
export function generateOrganizationSchema() {
  const business = getBusinessConfig();
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description
  };

  if (business.legalName) schema.legalName = business.legalName;
  if (business.phone) schema.telephone = business.phone;
  if (business.email) schema.email = business.email;
  if (business.address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: business.address
    };
  }
  if (business.serviceAreas.length > 0) {
    schema.areaServed = business.serviceAreas;
  }

  return JSON.stringify(schema);
}

/**
 * Generate JSON-LD Structured Data for Products
 */
export function generateProductSchema(product: Product) {
  const business = getBusinessConfig();
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: product.brand || business.name
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: business.currency || "PKR",
      availability:
        product.status === "active"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      price: "0",
      description: "Contact for wholesale pricing"
    }
  };

  return JSON.stringify(schema);
}

/**
 * Generate JSON-LD Structured Data for Breadcrumbs
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.url
    }))
  };

  return JSON.stringify(schema);
}

/**
 * Generate JSON-LD Structured Data for FAQPage
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return JSON.stringify(schema);
}

/**
 * Generate JSON-LD Structured Data for WebSite
 */
export function generateWebsiteSchema() {
  const business = getBusinessConfig();
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: business.name,
    url: siteSeoDefaults.canonical || "https://alrazzaqueenterprise.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://alrazzaqueenterprise.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return JSON.stringify(schema);
}
