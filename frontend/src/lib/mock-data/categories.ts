export interface Category {
  id: string;
  name: string;
  slug: string;
  handle: string; // For Shopify compatibility
  description?: string;
  productCount: number;
  isActive: boolean;
}

// Categories matching your sidebar design
export const categories: Category[] = [
  {
    id: "all-products",
    name: "All Products",
    slug: "all-products",
    handle: "all-products",
    description: "Browse our complete collection",
    productCount: 156,
    isActive: true,
  },
  {
    id: "rice-grains",
    name: "Rice & Grains",
    slug: "rice-grains",
    handle: "rice-grains",
    description: "Premium rice varieties and grains",
    productCount: 24,
    isActive: true,
  },
  {
    id: "noodles-pasta",
    name: "Noodles & Pasta",
    slug: "noodles-pasta",
    handle: "noodles-pasta",
    description: "Instant noodles and pasta varieties",
    productCount: 32,
    isActive: true,
  },
  {
    id: "tomato-sauces",
    name: "Tomato & Sauces",
    slug: "tomato-sauces",
    handle: "tomato-sauces",
    description: "Tomato paste, sauces, and condiments",
    productCount: 18,
    isActive: true,
  },
  {
    id: "seasonings-spices",
    name: "Seasonings & Spices",
    slug: "seasonings-spices",
    handle: "seasonings-spices",
    description: "Nigerian spices and seasonings",
    productCount: 28,
    isActive: true,
  },
  {
    id: "cooking-oils",
    name: "Cooking Oils & Essentials",
    slug: "cooking-oils",
    handle: "cooking-oils",
    description: "Cooking oils and kitchen essentials",
    productCount: 15,
    isActive: true,
  },
  {
    id: "snacks-beverages",
    name: "Snacks & Beverages",
    slug: "snacks-beverages",
    handle: "snacks-beverages",
    description: "Snacks, drinks, and beverages",
    productCount: 39,
    isActive: true,
  },
];

// Header navigation categories (top level)
export const headerCategories = [
  {
    id: "all-products",
    name: "All Products",
    href: "/shop/products",
  },
  {
    id: "noodles-pasta",
    name: "Noodles & Pasta",
    href: "/shop/categories/noodles-pasta",
  },
  {
    id: "spices-seasonings",
    name: "Spices & Seasonings",
    href: "/shop/categories/seasonings-spices",
  },
  {
    id: "cooking-oils",
    name: "Cooking Oils",
    href: "/shop/categories/cooking-oils",
  },
  {
    id: "rice-grains",
    name: "Rice & Grains",
    href: "/shop/categories/rice-grains",
  },
  {
    id: "snacks",
    name: "Snacks",
    href: "/shop/categories/snacks-beverages",
  },
];

// Helper functions
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};

export const getActiveCategories = (): Category[] => {
  return categories.filter((cat) => cat.isActive);
};
