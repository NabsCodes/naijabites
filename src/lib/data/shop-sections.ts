import { Product } from "@/types";
import { getShopifyAllProducts } from "@/lib/shopify-products";

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
  getProducts: () => Promise<Product[]>;
  products?: Product[]; // Optional pre-loaded products
}

// Smart filtering functions - All business logic for sections
export const sectionFilters = {
  // Products with discounts/sales
  "hot-deals": async () => {
    const products = await getShopifyAllProducts();
    return products
      .filter((p: Product) => p.isOnSale && p.discountPercentage)
      .slice(0, 4);
  },

  // Products with high ratings (4.0+) - Note: Shopify doesn't have ratings, so this will be empty for now
  "top-picks": async () => {
    const products = await getShopifyAllProducts();
    return products
      .filter((p: Product) => p.rating && p.rating.average >= 4.0)
      .slice(0, 4);
  },

  // Featured sale products (subset of hot deals)
  "deals-of-week": async () => {
    const products = await getShopifyAllProducts();
    return products.filter((p: Product) => p.isOnSale).slice(0, 4);
  },

  // Mix of popular products (for now, random selection - would be algorithm-based in real app)
  recommended: async () => {
    const products = await getShopifyAllProducts();
    return [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
  },

  // Similar products (for product pages)
  similar: async (productId: string, category: string, limit: number = 8) => {
    const products = await getShopifyAllProducts();
    return products
      .filter(
        (product: Product) =>
          product.id !== productId && product.category === category,
      )
      .slice(0, limit);
  },
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
export const getProductsForSection = async (
  sectionId: SectionType,
): Promise<Product[]> => {
  if (sectionId === "similar") {
    return []; // Similar products need parameters, use sectionFilters.similar() directly
  }
  return await sectionFilters[sectionId]();
};

// Helper to get all active shop sections
export const getShopSections = async (): Promise<ShopSection[]> => {
  const sectionsWithProducts = await Promise.all(
    shopSections.map(async (section) => {
      const products = await section.getProducts();
      return { ...section, products };
    }),
  );

  return sectionsWithProducts.filter((section) => section.products.length > 0);
};

// Helper for product pages - Creates a consistent similar products section
export const getSimilarProductsSection = async (
  productId: string,
  category: string,
) => {
  const products = await sectionFilters.similar(productId, category);

  return {
    id: "similar" as SectionType,
    products,
  };
};
