import { BusinessConfig } from '../types';

/**
 * SINGLE SOURCE OF TRUTH — BUSINESS CONFIGURATION
 * Strict Rule 2: Never fabricate phone numbers, WhatsApp, emails, physical addresses,
 * certificates, or exaggerated claims. Missing verified fields remain safe empty strings.
 */
export const defaultBusinessConfig: BusinessConfig = {
  name: "Al Razzaque Enterprise",
  legalName: "Al Razzaque Enterprise",
  logo: "/logo.svg",
  tagline: "Quality Wheat Atta for Homes, Retailers & Marts",
  description:
    "Trusted supplier of quality wheat flour and atta products for households, grocery stores, marts, wholesalers, distributors, and bulk commercial buyers.",
  // Verified business contact details (leave as empty placeholder if not yet configured)
  phone: (import.meta.env.VITE_CONTACT_PHONE as string) || "",
  whatsapp: (import.meta.env.VITE_WHATSAPP_NUMBER as string) || "",
  email: (import.meta.env.VITE_CONTACT_EMAIL as string) || "",
  address: "",
  serviceAreas: [
    "Karachi & Regional Commercial Hubs",
    "Retail Stores & Supermarts",
    "Wholesale Markets & Distribution Centers"
  ],
  businessHours: [
    { day: "Monday – Saturday", hours: "Regular Business Hours (Inquire for dispatch schedule)" },
    { day: "Sunday", hours: "Inquiry desk via WhatsApp" }
  ],
  socialProfiles: {
    instagram: "",
    facebook: "",
    linkedin: ""
  },
  currency: "PKR",
  defaultWhatsAppMessage:
    "Hello, I am interested in wheat atta supply for my business from Al Razzaque Enterprise. Please share available products, pack sizes, and wholesale rates."
};

const STORAGE_KEY = "al_razzaque_business_config_override";

// Retrieve active business configuration (with optional client runtime overrides for testing)
export function getBusinessConfig(): BusinessConfig {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultBusinessConfig, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback to default
    }
  }
  return defaultBusinessConfig;
}

export function saveBusinessConfigOverride(overrides: Partial<BusinessConfig>): void {
  if (typeof window !== "undefined") {
    try {
      const current = getBusinessConfig();
      const updated = { ...current, ...overrides };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("business-config-updated"));
    } catch (e) {
      console.error("Failed to save config override", e);
    }
  }
}

export function resetBusinessConfigOverride(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("business-config-updated"));
  }
}
