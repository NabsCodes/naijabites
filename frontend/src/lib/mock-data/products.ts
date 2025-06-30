import { Product } from "@/types";

// 8 Test Products covering all card variations
export const products: Product[] = [
  // 1. Normal Card - Maggi Cubes
  {
    id: "maggi-cubes-250g",
    name: "Maggi Star Seasoning Cubes",
    shortDescription: "250g x 6 Cans",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80",
    price: 12000,
    slug: "maggi-cubes-250g",
    category: "Seasonings & Spices",
    brand: "Maggi",
    inStock: true,
    isOnSale: false,
  },

  // 2. Discount Card - Golden Morn
  {
    id: "golden-morn-1kg",
    name: "Nestle Golden Morn Cereal",
    shortDescription: "1kg Family Pack",
    image:
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80",
    price: 8500,
    salePrice: 7650,
    discountPercentage: 10,
    slug: "golden-morn-1kg",
    category: "Breakfast & Cereals",
    brand: "Nestle",
    inStock: true,
    isOnSale: true,
  },

  // 3. Rating Card - Indomie Noodles
  {
    id: "indomie-chicken-40pack",
    name: "Indomie Instant Noodles Chicken",
    shortDescription: "40 Pack Carton",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80",
    price: 15000,
    rating: {
      average: 4.5,
      count: 124,
    },
    slug: "indomie-chicken-40pack",
    category: "Noodles & Pasta",
    brand: "Indomie",
    inStock: true,
    isOnSale: false,
  },

  // 4. Discount + Rating Card - Dangote Rice
  {
    id: "dangote-rice-50kg",
    name: "Dangote Rice Premium Quality",
    shortDescription: "50kg Bag",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80",
    price: 75000,
    salePrice: 67500,
    discountPercentage: 10,
    rating: {
      average: 4.2,
      count: 89,
    },
    slug: "dangote-rice-50kg",
    category: "Rice & Grains",
    brand: "Dangote",
    inStock: true,
    isOnSale: true,
  },

  // 5. Normal Card - Palm Oil
  {
    id: "devon-palm-oil-5l",
    name: "Devon King Palm Oil",
    shortDescription: "5 Liters Jerry Can",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80",
    price: 18000,
    slug: "devon-palm-oil-5l",
    category: "Cooking Oils",
    brand: "Devon King",
    inStock: true,
    isOnSale: false,
  },

  // 6. Discount Card - Gino Tomatoes
  {
    id: "gino-tomato-paste-400g",
    name: "Gino Tomato Paste",
    shortDescription: "400g x 12 Cans",
    image:
      "https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80",
    price: 24000,
    salePrice: 21600,
    discountPercentage: 10,
    slug: "gino-tomato-paste-400g",
    category: "Tomato & Sauces",
    brand: "Gino",
    inStock: true,
    isOnSale: true,
  },

  // 7. Rating Card - Plantain Chips
  {
    id: "olu-olu-plantain-chips-500g",
    name: "Olu Olu Plantain Chips",
    shortDescription: "500g Family Pack",
    image:
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80",
    price: 3500,
    rating: {
      average: 4.8,
      count: 67,
    },
    slug: "olu-olu-plantain-chips-500g",
    category: "Snacks & Beverages",
    brand: "Olu Olu",
    inStock: true,
    isOnSale: false,
  },

  // 8. Normal Card - Honey
  {
    id: "rowland-honey-500ml",
    name: "Rowland Pure Honey",
    shortDescription: "500ml Natural Honey",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80",
    price: 6500,
    slug: "rowland-honey-500ml",
    category: "Cooking Oils & Essentials",
    brand: "Rowland",
    inStock: true,
    isOnSale: false,
  },
];

// Helper function to get featured products (for homepage)
export const getFeaturedProducts = () => products;

// Helper function to get products by category
export const getProductsByCategory = (category: string) =>
  products.filter((product) => product.category === category);

// Helper function to get product by slug
export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
