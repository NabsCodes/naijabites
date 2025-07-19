import { Product } from "@/types";
import { products } from "../mock-data/products";

// Section type definitions
export type SectionType =
  | "hot-deals"
  | "recommended"
  | "deals-of-week"
  | "top-picks"
  | "similar";

export interface ShopSection {
  id: SectionType;
  title: string;
  description?: string;
  viewAllLink: string;
  getProducts: () => Product[];
}

// Smart filtering functions - All business logic for sections
export const sectionFilters = {
  // Products with discounts/sales
  "hot-deals": () =>
    products.filter((p) => p.isOnSale && p.discountPercentage).slice(0, 4),

  // Products with high ratings (4.0+)
  "top-picks": () =>
    products.filter((p) => p.rating && p.rating.average >= 4.0).slice(0, 4),

  // Featured sale products (subset of hot deals)
  "deals-of-week": () => products.filter((p) => p.isOnSale).slice(0, 4),

  // Mix of popular products (for now, random selection - would be algorithm-based in real app)
  recommended: () => [...products].sort(() => 0.5 - Math.random()).slice(0, 4),

  // Similar products (for product pages)
  similar: (productId: string, category: string, limit: number = 8) =>
    products
      .filter(
        (product) => product.id !== productId && product.category === category,
      )
      .slice(0, limit),
};

// Shop sections configuration for main shop page
export const shopSections: ShopSection[] = [
  {
    id: "hot-deals",
    title: "Hot deals you can't miss!",
    description: "Limited time offers on your favorite products",
    viewAllLink: "/shop/deals",
    getProducts: sectionFilters["hot-deals"],
  },
  {
    id: "top-picks",
    title: "Top Picks Nigerians Love",
    description: "Most loved by the Nigerian community in Canada",
    viewAllLink: "/shop/products?sort=rating-desc",
    getProducts: sectionFilters["top-picks"],
  },
  {
    id: "recommended",
    title: "Recommended for you",
    description: "Handpicked just for you based on your preferences",
    viewAllLink: "/shop/recommended",
    getProducts: sectionFilters["recommended"],
  },
];

// Helper to get products for specific section
export const getProductsForSection = (sectionId: SectionType): Product[] => {
  if (sectionId === "similar") {
    return []; // Similar products need parameters, use sectionFilters.similar() directly
  }
  return sectionFilters[sectionId]();
};

// Helper to get all active shop sections
export const getShopSections = (): ShopSection[] => {
  return shopSections.filter((section) => section.getProducts().length > 0);
};

// Helper for product pages - Creates a consistent similar products section
export const getSimilarProductsSection = (
  productId: string,
  category: string,
) => {
  const products = sectionFilters.similar(productId, category);

  return {
    id: "similar" as SectionType,
    products,
  };
};
