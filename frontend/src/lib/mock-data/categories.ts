import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "all-products",
    name: "All Products",
    slug: "all-products",
    description: "Browse our complete collection",
    productCount: 156,
  },
  {
    id: "rice-grains",
    name: "Rice & Grains",
    slug: "rice-grains",
    description: "Premium rice varieties and grains",
    productCount: 24,
  },
  {
    id: "noodles-pasta",
    name: "Noodles & Pasta",
    slug: "noodles-pasta",
    description: "Instant noodles and pasta varieties",
    productCount: 32,
  },
  {
    id: "tomato-sauces",
    name: "Tomato & Sauces",
    slug: "tomato-sauces",
    description: "Tomato paste, sauces, and condiments",
    productCount: 18,
  },
  {
    id: "seasonings-spices",
    name: "Seasonings & Spices",
    slug: "seasonings-spices",
    description: "Nigerian spices and seasonings",
    productCount: 28,
  },
  {
    id: "cooking-oils",
    name: "Cooking Oils & Essentials",
    slug: "cooking-oils",
    description: "Cooking oils and kitchen essentials",
    productCount: 15,
  },
  {
    id: "snacks-beverages",
    name: "Snacks & Beverages",
    slug: "snacks-beverages",
    description: "Snacks, drinks, and beverages",
    productCount: 39,
  },
];

export const headerCategories = [
  {
    id: "all-products",
    name: "All Products",
    slug: "all-products",
  },
  {
    id: "noodles-pasta",
    name: "Noodles & Pasta",
    slug: "noodles-pasta",
  },
  {
    id: "spices-seasonings",
    name: "Spices & Seasonings",
    slug: "seasonings-spices",
  },
  {
    id: "cooking-oils",
    name: "Cooking Oils",
    slug: "cooking-oils",
  },
  {
    id: "rice-grains",
    name: "Rice & Grains",
    slug: "rice-grains",
  },
  {
    id: "snacks",
    name: "Snacks",
    slug: "snacks-beverages",
  },
];

// Get a category by slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};

// Generate the correct URL for a header category
export const getHeaderCategoryUrl = (category: {
  id: string;
  slug: string;
}): string => {
  return category.id === "all-products"
    ? "/shop/products"
    : `/shop/categories/${category.slug}`;
};

// Check if a header category navigation item is active
export const isHeaderCategoryActive = (
  category: { id: string; slug: string },
  pathname: string,
): boolean => {
  if (category.id === "all-products") {
    return pathname === "/shop/products";
  }

  const categoryPath = `/shop/categories/${category.slug}`;
  return pathname === categoryPath || pathname.startsWith(`${categoryPath}/`);
};
