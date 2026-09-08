import { Product } from '../types';

export const products: Product[] = [
  {
    id: "prod-marka-atta",
    slug: "marka-atta",
    name: "Marka Atta",
    brand: "Marka",
    category: "wheat-flour",
    status: "active",
    featured: true,
    shortDescription:
      "Reliable, balanced wheat flour milled for everyday rotis and chapatis. Ideal for household pantries, retail grocery shelves, and commercial marts.",
    description:
      "Marka Atta is Al Razzaque Enterprise's core wheat flour product, recognized for consistent milling standards, dependable water absorption, and pliable dough elasticity. Formulated for everyday home cooking as well as commercial foodservice operations requiring dependable flour performance day in and day out.",
    thumbnail: "/images/products/marka-atta.svg",
    images: [
      {
        src: "/images/products/marka-atta.svg",
        alt: "Marka Atta packaging pack",
        type: "primary"
      }
    ],
    packSizes: [
      { size: "5", unit: "kg", availability: "In Stock", minOrderQty: "Retail & Case lots", wholesalePriceNote: "Tiered rate on retail cartons" },
      { size: "10", unit: "kg", availability: "In Stock", minOrderQty: "5 Bags (Retail) / 50+ (Wholesale)", wholesalePriceNote: "Competitive wholesale tariff available" },
      { size: "20", unit: "kg", availability: "In Stock", minOrderQty: "Commercial lots", wholesalePriceNote: "Direct bulk wholesale quote" },
      { size: "50", unit: "kg", availability: "In Stock", minOrderQty: "Jute / Poly woven sack", wholesalePriceNote: "B2B commercial volume discount" }
    ],
    availability: "Available for immediate dispatch & wholesale booking",
    features: [
      "Consistent grain milling for pliable, tender chapatis",
      "High natural water retention aiding dough yield",
      "Standardized multi-layer packaging preventing moisture ingress",
      "Available across retail-friendly and heavy commercial packaging"
    ],
    specifications: {
      "Flour Type": "Wheat Atta / Chakki Blend",
      "Moisture Level": "Standard mill regulated",
      "Packaging Material": "Food-grade laminated poly woven / craft bag",
      "Primary Culinary Use": "Chapatis, Rotis, Parathas, Flatbreads",
      "Storage Recommendation": "Cool, dry, elevated ventilation away from direct ground contact"
    },
    usage: [
      "Household daily meal preparation",
      "Grocery and general stores retail re-sale",
      "Supermarket and mini-mart inventory",
      "Commercial kitchens, hotels, and restaurant catering"
    ],
    targetCustomers: ["household", "retailer", "mart", "wholesaler", "distributor", "bulk_buyer"],
    orderOptions: [
      { title: "Retail Purchase", description: "Individual consumer bags available via local stockists and retail partners.", type: "retail" },
      { title: "Store Consignment & Wholesale", description: "Weekly or bi-weekly restocking for retail stores and grocery marts.", type: "wholesale" },
      { title: "Bulk & Institutional Supply", description: "Contract supply, pallets, and full-truckload dispatches for distributors.", type: "bulk" }
    ],
    seo: {
      title: "Marka Atta Wholesale & Retail Supply | Al Razzaque Enterprise",
      description: "Order Marka Atta in 5kg, 10kg, 20kg, and 50kg bags. Reliable wheat flour supply for grocery stores, supermarkets, and bulk distributors.",
      keywords: ["Marka Atta", "Marka wheat flour", "wholesale atta", "retail flour supply", "bulk atta Karachi"]
    },
    createdAt: "2026-01-10",
    updatedAt: "2026-09-08"
  },
  {
    id: "prod-chakki-wheat-atta",
    slug: "chakki-wheat-atta",
    name: "Chakki Fresh Wheat Atta",
    brand: "Al Razzaque Select",
    category: "wheat-flour",
    status: "active",
    featured: true,
    shortDescription:
      "Traditional stone-ground style whole wheat flour preserving natural bran and earthy aroma for hearty, nutritious flatbreads.",
    description:
      "Chakki Fresh Wheat Atta combines stone-milled tradition with modern cleaning and packaging protocols. It retains wholesome bran content, giving rotis an authentic aroma, deeper color, and lasting softness throughout the day.",
    thumbnail: "/images/products/chakki-wheat-atta.svg",
    images: [
      {
        src: "/images/products/chakki-wheat-atta.svg",
        alt: "Chakki Fresh Wheat Atta sack",
        type: "primary"
      }
    ],
    packSizes: [
      { size: "10", unit: "kg", availability: "In Stock", minOrderQty: "10 Bags min for trade", wholesalePriceNote: "Wholesale quote upon request" },
      { size: "20", unit: "kg", availability: "In Stock", minOrderQty: "Pallet / Truckload options", wholesalePriceNote: "Direct distributor rates" }
    ],
    availability: "Regular production run in stock",
    features: [
      "Traditional chakki grind texture retaining dietary bran fiber",
      "Distinct natural wheat aroma and golden crumb",
      "Extended dough softness suitable for family kitchens and eateries",
      "Rigid quality sorting of source wheat grain"
    ],
    specifications: {
      "Flour Type": "Stone-ground style Whole Wheat Atta",
      "Grain Origin": "Select indigenous wheat varieties",
      "Texture": "Medium-coarse with visible bran flecks",
      "Packaging": "Moisture-resistant poly-woven pack"
    },
    usage: [
      "Traditional chapatis and phulkas",
      "Tandoori rotis and homestyle flatbreads",
      "Specialty organic and health-focused grocery aisles"
    ],
    targetCustomers: ["household", "retailer", "mart", "wholesaler", "bulk_buyer"],
    orderOptions: [
      { title: "Retail Stocks", description: "Convenient 10kg family packs for supermarkets.", type: "retail" },
      { title: "Commercial B2B", description: "Bulk lots for tandoor chains, canteens, and catering services.", type: "bulk" }
    ],
    seo: {
      title: "Chakki Fresh Wheat Atta | Al Razzaque Enterprise",
      description: "Wholesale and retail supply of Chakki Fresh Wheat Atta. Stone-ground texture for soft, wholesome rotis.",
      keywords: ["Chakki Atta", "fresh wheat atta", "whole wheat flour wholesale", "mart atta distributor"]
    },
    createdAt: "2026-01-15",
    updatedAt: "2026-09-08"
  },
  {
    id: "prod-fine-wheat-flour",
    slug: "fine-wheat-flour",
    name: "Fine Wheat Flour (Maida Grade)",
    brand: "Al Razzaque Commercial",
    category: "wheat-flour",
    status: "active",
    featured: false,
    shortDescription:
      "Refined fine wheat flour engineered for commercial bakeries, pastry kitchens, paratha shops, and institutional foodservice.",
    description:
      "Milled from selected wheat grains with high gluten stretch, our Fine Wheat Flour delivers the elasticity, puff, and crisp texture required for commercial naan baking, samosa crusts, paratha rolls, and artisanal confectionery.",
    thumbnail: "/images/products/fine-wheat-flour.svg",
    images: [
      {
        src: "/images/products/fine-wheat-flour.svg",
        alt: "Fine Wheat Flour Commercial Grade",
        type: "primary"
      }
    ],
    packSizes: [
      { size: "25", unit: "kg", availability: "In Stock", minOrderQty: "Commercial lots", wholesalePriceNote: "Tiered commercial contract" },
      { size: "50", unit: "kg", availability: "In Stock", minOrderQty: "50kg commercial bag", wholesalePriceNote: "Bakery volume pricing" }
    ],
    availability: "Available for continuous bakery & industrial contracts",
    features: [
      "High tensile gluten structure for superior dough stretch",
      "Clean sifted texture free from grit and impurities",
      "Excellent browning and oven spring in tandoors and deck ovens",
      "Consistent batch-to-batch moisture stability"
    ],
    specifications: {
      "Flour Type": "Refined White Wheat Flour (Maida Grade)",
      "Ash Content": "Controlled low-ash specification",
      "Packaging": "Heavy-duty industrial multi-wall sacks",
      "Recommended Applications": "Naans, paratha rolls, bakeries, snacks"
    },
    usage: [
      "Commercial bakeries and biscuit manufacturers",
      "Paratha, roll, and fast food franchises",
      "Hotel banquet catering and canteen kitchens"
    ],
    targetCustomers: ["wholesaler", "distributor", "bulk_buyer"],
    orderOptions: [
      { title: "Institutional Supply", description: "Regular scheduled delivery to commercial bakeries and kitchens.", type: "bulk" }
    ],
    seo: {
      title: "Fine Wheat Flour (Maida Grade) Bulk Supply | Al Razzaque",
      description: "High-grade fine wheat flour for commercial bakeries, paratha manufacturers, and wholesale food distributors.",
      keywords: ["fine wheat flour", "maida bulk supplier", "bakery flour wholesale", "commercial flour distributor"]
    },
    createdAt: "2026-02-01",
    updatedAt: "2026-09-08"
  },
  {
    id: "prod-commercial-bulk-wheat-flour",
    slug: "commercial-bulk-wheat-flour",
    name: "Commercial Bulk Wheat Flour (50kg Sacks)",
    brand: "Al Razzaque Enterprise",
    category: "bulk-packs",
    status: "active",
    featured: true,
    shortDescription:
      "Bulk commercial 50kg sacks optimized for wholesale traders, distributors, government/NGO rations, and heavy-use food processors.",
    description:
      "Tailored specifically for volume buyers, large distributors, and commercial institutional contracts. Packed in durable 50kg polypropylene woven sacks with internal liner protection for secure transit, warehouse stacking, and bulk vehicle loading.",
    thumbnail: "/images/products/commercial-bulk-flour.svg",
    images: [
      {
        src: "/images/products/commercial-bulk-flour.svg",
        alt: "Commercial Bulk 50kg Flour Sack",
        type: "primary"
      }
    ],
    packSizes: [
      { size: "50", unit: "kg", availability: "In Stock", minOrderQty: "1 Metric Ton (20 Sacks) minimum wholesale", wholesalePriceNote: "Volume truckload quotes provided on request" }
    ],
    availability: "Available for recurring contracts & large lot dispatches",
    features: [
      "Optimized for high-volume palletization and transit resistance",
      "Tested for consistent batch kneading in mechanical dough mixers",
      "Flexible formulations for bread factories, catering, and wholesale re-bagging",
      "Direct logistics dispatch coordination"
    ],
    specifications: {
      "Pack Weight": "50 Kilograms Net",
      "Bag Type": "Heavy-gauge woven polypropylene with anti-slip finish",
      "Dispatch Lot": "Metric ton lots / Pallets / Truckloads",
      "Lead Time": "Same-day booking, dispatch per logistics schedule"
    },
    usage: [
      "Grain and flour wholesale bazaars",
      "Industrial foodservice, canteens, and mess facilities",
      "Relief food packages, rations, and institutional programs",
      "Commercial tandoor clusters"
    ],
    targetCustomers: ["wholesaler", "distributor", "bulk_buyer"],
    orderOptions: [
      { title: "Wholesale Dispatch", description: "Dispatched from warehouse hubs or mill loading docks directly to trade warehouses.", type: "bulk" }
    ],
    seo: {
      title: "Commercial Bulk Wheat Flour 50kg Sacks | Al Razzaque Enterprise",
      description: "Procure 50kg bulk wheat flour sacks for wholesale distributors, caterers, and food manufacturers. Competitive bulk quotation.",
      keywords: ["50kg wheat flour bag", "bulk atta supplier", "wholesale flour trader", "commercial grain flour"]
    },
    createdAt: "2026-02-15",
    updatedAt: "2026-09-08"
  },
  {
    id: "prod-whole-wheat-flour-special",
    slug: "whole-wheat-flour-special",
    name: "Specialty Mill Whole Wheat Atta",
    brand: "Al Razzaque Reserve",
    category: "specialty-flour",
    status: "coming_soon",
    featured: false,
    shortDescription:
      "Upcoming high-fiber, low-glycemic wheat flour formulation developed for specialty wellness retailers and modern supermarts.",
    description:
      "Currently in product development, this premium mill selection focuses on unbleached, high-bran whole grain wheat for health-conscious consumers and boutique grocery stores. Pre-booking open for retail partners.",
    thumbnail: "/images/products/specialty-flour.svg",
    images: [
      {
        src: "/images/products/specialty-flour.svg",
        alt: "Specialty Whole Wheat Flours",
        type: "primary"
      }
    ],
    packSizes: [
      { size: "5", unit: "kg", availability: "Coming Soon", minOrderQty: "Pre-order inquiry", wholesalePriceNote: "Advance booking tariff" },
      { size: "10", unit: "kg", availability: "Coming Soon", minOrderQty: "Pre-order inquiry", wholesalePriceNote: "Advance booking tariff" }
    ],
    availability: "Coming soon – currently registering interested retail partners",
    features: [
      "100% whole grain milling preserving germ and aleurone layers",
      "Rich in natural wheat fiber and micronutrients",
      "Airtight premium shelf-ready packaging for modern retail displays"
    ],
    specifications: {
      "Status": "Formulation & Trial Phase",
      "Packaging": "Matte finish pouch with re-sealable zip",
      "Target Launch": "Contact for partner release dates"
    },
    usage: [
      "Specialty supermarket organic/health aisles",
      "Premium artisan bakeries"
    ],
    targetCustomers: ["household", "retailer", "mart"],
    orderOptions: [
      { title: "Partner Pre-Registration", description: "Be the first retail stockist in your commercial territory.", type: "wholesale" }
    ],
    seo: {
      title: "Specialty Whole Wheat Flour | Al Razzaque Enterprise",
      description: "Upcoming premium whole wheat flour from Al Razzaque Enterprise. Pre-register for wholesale distribution.",
      keywords: ["specialty wheat flour", "high fiber atta", "whole wheat flour Pakistan", "premium mart atta"]
    },
    createdAt: "2026-03-01",
    updatedAt: "2026-09-08"
  }
];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.status === "active");
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getRelatedProducts(currentSlug: string, limit = 3): Product[] {
  return products
    .filter((p) => p.slug !== currentSlug && p.status !== "discontinued")
    .slice(0, limit);
}

export function searchProducts(query: string, categoryFilter?: string, statusFilter?: string): Product[] {
  const normalizedQuery = query.toLowerCase().trim();

  return products.filter((product) => {
    if (categoryFilter && categoryFilter !== "all" && product.category !== categoryFilter) {
      return false;
    }
    if (statusFilter && statusFilter !== "all" && product.status !== statusFilter) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }

    const inName = product.name.toLowerCase().includes(normalizedQuery);
    const inBrand = (product.brand || "").toLowerCase().includes(normalizedQuery);
    const inDesc = product.shortDescription.toLowerCase().includes(normalizedQuery);
    const inCategory = product.category.toLowerCase().includes(normalizedQuery);
    const inPacks = (product.packSizes || []).some((p) =>
      `${p.size}${p.unit}`.toLowerCase().includes(normalizedQuery) ||
      `${p.size} ${p.unit}`.toLowerCase().includes(normalizedQuery)
    );
    const inKeywords = ["atta", "flour", "wheat", "marka", "chakki", "maida", "bulk", "roti"].some(
      (keyword) => normalizedQuery.includes(keyword) && (
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.shortDescription.toLowerCase().includes(keyword)
      )
    );

    return inName || inBrand || inDesc || inCategory || inPacks || inKeywords;
  });
}
