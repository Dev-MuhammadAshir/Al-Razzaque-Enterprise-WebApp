import { CampaignPage } from '../types';

export const campaigns: Record<string, CampaignPage> = {
  "wholesale-atta": {
    slug: "wholesale-atta",
    title: "Wholesale Wheat Atta Supply for Retailers & Marts",
    headline: "Reliable Wholesale Wheat Flour & Atta Supply",
    subheadline:
      "Direct bulk grain and flour supply for grocery stores, supermarkets, mini marts, and wholesale grain stockists with consistent milling quality and scheduled delivery.",
    description:
      "Partner directly with Al Razzaque Enterprise for verified flour supply. We ensure uninterrupted inventory, retail-ready packaging, and competitive wholesale volume rates tailored for commercial buyers.",
    targetAudience: [
      "Retail Grocery Stores & Supermarkets",
      "Wholesale Grain Stockists & Traders",
      "Hotel, Restaurant & Commercial Catering (HoReCa)",
      "Institutional Food Services"
    ],
    productSlugs: ["marka-atta", "chakki-wheat-atta", "commercial-bulk-wheat-flour"],
    primaryCTA: "Request Wholesale Price",
    secondaryCTA: "WhatsApp for Bulk Orders",
    valueProps: [
      {
        title: "Dependable Supply Continuity",
        description: "Consistent milling volumes designed to keep your retail shelves stocked without seasonal interruptions."
      },
      {
        title: "Standardized Packaging",
        description: "Laminated, food-grade 5kg, 10kg, 20kg, and 50kg bags engineered for freight durability and consumer shelf appeal."
      },
      {
        title: "Direct B2B Pricing",
        description: "Volume-aligned commercial rates without unnecessary middlemen layers."
      },
      {
        title: "Dedicated Dispatch Coordination",
        description: "Organized dispatch tracking, bilty documentation, and scheduled logistics handling."
      }
    ],
    seo: {
      title: "Wholesale Wheat Atta Supply | Al Razzaque Enterprise",
      description: "Direct wholesale wheat atta and flour supply for retailers, grocery stores, and marts. Contact Al Razzaque Enterprise for wholesale pricing.",
      keywords: ["wholesale atta", "wheat flour supplier", "atta distributor", "bulk flour supply", "wholesale wheat atta Karachi"]
    }
  },
  "marka-atta": {
    slug: "marka-atta",
    title: "Marka Atta — Genuine Wholesale & Retail Supply",
    headline: "Stock Marka Atta for Your Grocery Store or Mart",
    subheadline:
      "The dependable household and commercial wheat flour trusted for softness, high water absorption, and pliable dough elasticity.",
    description:
      "Marka Atta by Al Razzaque Enterprise is available for retail stocking in 5kg, 10kg, and 20kg bags, as well as 50kg sacks for bulk kitchens. Get direct mill rates and prompt order fulfillment.",
    targetAudience: [
      "Neighborhood Kiryana & Grocery Stores",
      "Modern Supermarkets & Chain Marts",
      "Catering Companies & Tandoor Outlets"
    ],
    productSlugs: ["marka-atta"],
    primaryCTA: "Get Marka Atta Rates",
    secondaryCTA: "WhatsApp for Orders",
    valueProps: [
      {
        title: "Consistent Baking Performance",
        description: "Balanced gluten strength ensures soft chapatis that stay tender."
      },
      {
        title: "Recognized Shelf Presence",
        description: "Professional consumer packaging that builds customer loyalty in retail outlets."
      },
      {
        title: "Flexible Order Sizes",
        description: "Available in carton bundles, pallet lots, or full truck deliveries."
      }
    ],
    seo: {
      title: "Marka Atta Wholesale & Retail Supply | Al Razzaque Enterprise",
      description: "Official supply of Marka Atta in 5kg, 10kg, 20kg, and 50kg. Request wholesale quotes and retail stock for grocery stores.",
      keywords: ["Marka Atta", "Marka wheat flour", "Marka flour supplier", "buy Marka atta wholesale"]
    }
  },
  "bulk-orders": {
    slug: "bulk-orders",
    title: "Bulk Commercial Wheat Flour Supply",
    headline: "Bulk Wheat Flour & 50kg Atta Orders for Commercial Buyers",
    subheadline:
      "Commercial-grade supply for bakeries, food processors, institutional caterers, and wholesale grain stockists.",
    description:
      "Streamlined procurement for high-volume flour buyers. Submit your specific tonnage, pack size, and delivery schedule requirements to receive a fast, itemized wholesale quote.",
    targetAudience: [
      "Industrial & Commercial Bakeries",
      "Wholesale Market Stockists",
      "Hotel Banquets & Canteens",
      "Ration Packages & Institutional Programs"
    ],
    productSlugs: ["commercial-bulk-wheat-flour", "fine-wheat-flour", "marka-atta"],
    primaryCTA: "Submit Bulk Order Inquiry",
    secondaryCTA: "Direct WhatsApp Line",
    valueProps: [
      {
        title: "High-Volume Capacity",
        description: "Equipped to fulfill multi-ton contracts and recurring commercial deliveries."
      },
      {
        title: "Rigorous Weight & Moisture Control",
        description: "Every 50kg sack inspected for moisture parameters and standardized net weights."
      },
      {
        title: "Transparent Quotations",
        description: "Clear breakdown of mill-gate or delivered cost according to logistics requirements."
      }
    ],
    seo: {
      title: "Bulk Wheat Flour Orders (50kg Sacks) | Al Razzaque Enterprise",
      description: "Order bulk wheat flour and 50kg atta sacks for commercial bakeries, food services, and wholesale distributors.",
      keywords: ["bulk wheat flour", "50kg atta bags", "commercial flour supply", "bulk flour supplier"]
    }
  }
};

export function getCampaignBySlug(slug: string): CampaignPage | undefined {
  return campaigns[slug];
}
