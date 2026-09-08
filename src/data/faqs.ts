import { FAQItem } from '../types';

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "wholesale",
    question: "How does Al Razzaque Enterprise supply retail stores and marts?",
    answer:
      "We partner with grocery shops, general stores, supermarkets, and marts with scheduled supply runs or lot-based dispatches. We provide retail-ready packaging (such as 5kg, 10kg, and 20kg bags) that is shelf-ready for direct consumer purchase."
  },
  {
    id: "faq-2",
    category: "wholesale",
    question: "How can businesses obtain wholesale rates?",
    answer:
      "Because wheat grain prices and transport logistics can fluctuate based on market conditions, volume, and destination, we provide specific wholesale quotations directly. You can submit our Wholesale Inquiry form or connect directly via WhatsApp/Call to receive an itemized quote for your required quantity."
  },
  {
    id: "faq-3",
    category: "bulk",
    question: "What is the minimum order quantity (MOQ) for bulk orders?",
    answer:
      "MOQs depend on whether you are requesting retail packs (carton/bundle lots) or industrial 50kg sacks. For commercial 50kg bags, our typical wholesale lot begins at 1 Metric Ton (20 sacks). For smaller retail trials, please reach out to discuss sample quantities."
  },
  {
    id: "faq-4",
    category: "products",
    question: "What pack sizes are available across your flour range?",
    answer:
      "Our wheat flour products are packaged in standard sizes including 5kg, 10kg, 20kg consumer bags, and 50kg heavy-duty woven sacks for commercial and wholesale trade. Custom batch packaging inquiries can be discussed for large institutional requirements."
  },
  {
    id: "faq-5",
    category: "general",
    question: "What areas do you supply and deliver to?",
    answer:
      "We supply primarily across commercial distribution hubs, retail networks, and wholesale grain markets. Delivery logistics can be arranged via designated freight or local dispatch, or buyers may coordinate pickup directly from designated loading hubs."
  },
  {
    id: "faq-6",
    category: "products",
    question: "What is the difference between Marka Atta and Chakki Fresh Atta?",
    answer:
      "Marka Atta is balanced for daily versatility, delivering high water absorption, elasticity, and dependable yield for both households and commercial foodservice. Chakki Fresh Atta retains a higher natural bran fiber ratio with a traditional stone-ground style texture, giving flatbreads an earthy aroma and deep golden tint."
  },
  {
    id: "faq-7",
    category: "ordering",
    question: "How can I track my bulk order or verify dispatch status?",
    answer:
      "Once an order is confirmed and booked through our sales team, a dedicated order reference and vehicle dispatch note/bilty receipt is shared via WhatsApp and phone."
  },
  {
    id: "faq-8",
    category: "general",
    question: "Can we request a sample before committing to a commercial contract?",
    answer:
      "Yes, legitimate commercial retailers, mart procurement managers, and wholesale distributors can request product samples for quality evaluation prior to bulk contractual commitments."
  }
];

export function getFAQsByCategory(category?: string): FAQItem[] {
  if (!category || category === "all") {
    return faqs;
  }
  return faqs.filter((f) => f.category === category);
}

export const getCategoryFaqs = getFAQsByCategory;

export function getProductFAQs(productSlug: string): FAQItem[] {
  // Return FAQs relevant to products or specifically matched
  return faqs.filter((f) => f.productSlug === productSlug || f.category === "products" || f.category === "wholesale");
}

export const getProductFaqs = getProductFAQs;

