import { Category } from '../types';

export const categories: Category[] = [
  {
    id: "cat-wheat-flour",
    slug: "wheat-flour",
    name: "Wheat Flour / Atta",
    description: "Daily staple milled wheat flours engineered for consistent dough texture, softness, and volume.",
    itemCount: 3
  },
  {
    id: "cat-retail-packs",
    slug: "retail-packs",
    name: "Retail Packs",
    description: "Consumer-ready retail packaging formatted for supermarket shelves, neighborhood grocery stores, and marts.",
    itemCount: 2
  },
  {
    id: "cat-bulk-packs",
    slug: "bulk-packs",
    name: "Bulk & Commercial Packs",
    description: "Heavy-duty commercial sacks (20kg, 50kg) designed for wholesale distributors, caterers, bakeries, and tandoors.",
    itemCount: 2
  },
  {
    id: "cat-future-products",
    slug: "specialty-flour",
    name: "Specialty & Fortified Mill Flours",
    description: "Upcoming specialized grains, whole bran blends, and institutional grade flour varieties.",
    itemCount: 2
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}
