export type ProductStatus =
  | 'active'
  | 'out_of_stock'
  | 'coming_soon'
  | 'discontinued';

export type CustomerType =
  | 'household'
  | 'retailer'
  | 'mart'
  | 'wholesaler'
  | 'distributor'
  | 'bulk_buyer';

export interface PackSize {
  size: string;
  unit: string;
  availability?: string;
  minOrderQty?: string;
  wholesalePriceNote?: string;
  sku?: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  type?: 'primary' | 'front' | 'back' | 'packaging' | 'detail';
}

export interface OrderOption {
  title: string;
  description: string;
  type: 'retail' | 'wholesale' | 'bulk';
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  category: string;
  status: ProductStatus;
  shortDescription: string;
  description: string;
  featured?: boolean;
  images: ProductImage[];
  thumbnail?: string;
  packSizes?: PackSize[];
  availability?: string;
  features?: string[];
  specifications?: Record<string, string>;
  usage?: string[];
  targetCustomers?: CustomerType[];
  orderOptions?: OrderOption[];
  seo?: SEOData;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  itemCount?: number;
}

export interface BusinessHours {
  day: string;
  hours: string;
}

export interface BusinessConfig {
  name: string;
  legalName: string;
  logo: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  serviceAreas: string[];
  businessHours: BusinessHours[];
  socialProfiles: {
    instagram: string;
    facebook: string;
    linkedin?: string;
  };
  currency: string;
  defaultWhatsAppMessage: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'wholesale' | 'bulk' | 'products' | 'ordering';
  productSlug?: string;
}

export interface BreadcrumbItem {
  label: string;
  url: string;
}

export interface CampaignPage {
  slug: string;
  title: string;
  headline: string;
  subheadline: string;
  description: string;
  targetAudience: string[];
  productSlugs?: string[];
  primaryCTA: string;
  secondaryCTA?: string;
  valueProps: { title: string; description: string; icon?: string }[];
  seo: SEOData;
  heroHeadline?: string;
  heroSubheadline?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  highlights?: string[];
  targetAudiences?: string[];
  targetProductSlug?: string;
  faqs?: FAQItem[];
}

export type BusinessType =
  | 'Retailer'
  | 'Mart'
  | 'Wholesaler'
  | 'Distributor'
  | 'Household / Individual'
  | 'Other';

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
}

export interface InquiryLead {
  id: string;
  createdAt: string;
  name: string;
  businessName: string;
  businessType: BusinessType;
  phone: string;
  city: string;
  productSlug: string;
  productName: string;
  packSize: string;
  estimatedQuantity: string;
  message: string;
  attribution?: AttributionData;
  status: 'new' | 'contacted' | 'qualified';
}
