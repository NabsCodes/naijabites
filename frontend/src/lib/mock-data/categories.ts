import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "rice-grains",
    name: "Rice & Grains",
    slug: "rice-grains",
    description: "Premium rice varieties and grains",
  },
  {
    id: "noodles-pasta",
    name: "Noodles & Pasta",
    slug: "noodles-pasta",
    description: "Instant noodles and pasta varieties",
  },
  {
    id: "tomato-sauces",
    name: "Tomato & Sauces",
    slug: "tomato-sauces",
    description: "Tomato paste, sauces, and condiments",
  },
  {
    id: "seasonings-spices",
    name: "Seasonings & Spices",
    slug: "seasonings-spices",
    description: "Nigerian spices and seasonings",
  },
  {
    id: "cooking-oils-essentials",
    name: "Cooking Oils & Essentials",
    slug: "cooking-oils-essentials",
    description: "Cooking oils and kitchen essentials",
  },
  {
    id: "snacks-beverages",
    name: "Snacks & Beverages",
    slug: "snacks-beverages",
    description: "Snacks, drinks, and beverages",
  },
  {
    id: "breakfast-cereals",
    name: "Breakfast & Cereals",
    slug: "breakfast-cereals",
    description: "Breakfast cereals and morning essentials",
  },
  {
    id: "fresh-produce",
    name: "Fresh Produce",
    slug: "fresh-produce",
    description: "Fresh fruits, vegetables, and produce",
  },
  {
    id: "dairy-beverages",
    name: "Dairy & Beverages",
    slug: "dairy-beverages",
    description: "Milk, dairy products, and beverages",
  },
  {
    id: "meat",
    name: "Meat & Grills",
    slug: "meat",
    description: "Meat, grills and more",
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
    id: "seasonings-spices",
    name: "Seasonings & Spices",
    slug: "seasonings-spices",
  },
  {
    id: "cooking-oils-essentials",
    name: "Cooking Oils & Essentials",
    slug: "cooking-oils-essentials",
  },
  {
    id: "rice-grains",
    name: "Rice & Grains",
    slug: "rice-grains",
  },
  {
    id: "snacks-beverages",
    name: "Snacks & Beverages",
    slug: "snacks-beverages",
  },
];

// Get a category by slug
export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};

// Generate the correct URL for a header category (use routes for clean URLs)
export const getHeaderCategoryUrl = (category: {
  id: string;
  slug: string;
  name?: string;
}): string => {
  return category.id === "all-products"
    ? "/shop/products"
    : `/shop/categories/${category.slug}`;
};

// Check if a header category navigation item is active (route-based navigation)
export const isHeaderCategoryActive = (
  category: { id: string; slug: string },
  pathname: string,
): boolean => {
  if (category.id === "all-products") {
    return pathname === "/shop/products";
  }

  // Check if on category route
  const categoryPath = `/shop/categories/${category.slug}`;
  return pathname === categoryPath || pathname.startsWith(`${categoryPath}/`);
};
