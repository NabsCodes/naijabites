import { Product } from "@/types";

// 18 Test Products covering all card variations
export const products: Product[] = [
  // 1. Normal Card - Maggi Cubes
  {
    id: "maggi-cubes-250g",
    name: "Maggi Star Seasoning Cubes",
    shortDescription: "250g x 6 Cans",
    description:
      "Premium quality seasoning cubes that add rich flavor to your meals. Perfect for soups, stews, and rice dishes.",
    image: "/images/maggi-star.webp",
    images: [
      "/images/maggi-star.webp",
      "/images/grocery.webp",
      "/images/nigerian-groceries.webp",
    ],
    price: 11.99,
    slug: "maggi-cubes-250g",
    category: "Seasonings & Spices",
    brand: "Maggi",
    inStock: true,
    isOnSale: false,
    inventory: 2, // Only 2 in stock - for testing
  },

  // 2. Discount Card - Golden Morn
  {
    id: "golden-morn-1kg",
    name: "Nestle Golden Morn Cereal",
    shortDescription: "1kg Family Pack",
    description:
      "Nutritious breakfast cereal fortified with essential vitamins and minerals for a healthy start to your day.",
    image: "/images/golden-morn.webp",
    images: [
      "/images/golden-morn.webp",
      "/images/grocery.webp",
      "/images/nigerian-groceries.webp",
    ],
    price: 8.49,
    salePrice: 7.64,
    discountPercentage: 10,
    slug: "golden-morn-1kg",
    category: "Breakfast & Cereals",
    brand: "Nestle",
    inStock: false,
    isOnSale: true,
    inventory: 0, // Out of stock - for testing
  },

  // 3. Product with Variants - Premium Nigerian Yam (Weekend Sale!)
  {
    id: "premium-nigerian-yam",
    name: "Premium Nigerian Yam",
    shortDescription: "Fresh quality yam from Nigerian farms",
    description:
      "High-quality Nigerian yam, freshly harvested and carefully selected. Available in different sizes to meet your needs.",
    image: "/images/yam-tuber.webp",
    images: [
      "/images/yam-tuber.webp",
      "/images/woman-farmer.webp",
      "/images/nigerian-groceries.webp",
      "/images/grocery.webp",
    ],
    price: 17.99, // Base price for smallest variant
    variants: [
      {
        id: "yam-small-2kg",
        title: "1 bag (2kg)",
        price: 17.99,
        salePrice: 16.19, // 10% off
        isAvailable: true,
        inventory: 15,
      },
      {
        id: "yam-medium-3tubes",
        title: "3 tubers",
        price: 35.99,
        salePrice: 32.39, // 10% off
        isAvailable: true,
        inventory: 0,
      },
      {
        id: "yam-large-dozen",
        title: "dozen",
        price: 99.99,
        salePrice: 89.99, // 10% off
        isAvailable: true,
        inventory: 10,
      },
    ],
    salePrice: 16.19, // Sale price for base variant
    discountPercentage: 10,
    rating: {
      average: 4.7,
      count: 89,
    },
    slug: "premium-nigerian-yam",
    category: "Fresh Produce",
    brand: "Farm Fresh",
    inStock: true,
    isOnSale: true,
  },

  // 4. Rating Card - Indomie Noodles with Variants (Flash Sale!)
  {
    id: "indomie-chicken-40pack",
    name: "Indomie Instant Noodles Chicken",
    shortDescription: "40 Pack Carton",
    description:
      "Delicious instant noodles with authentic chicken flavor. Quick and easy meal solution for busy days.",
    image: "/images/indomie.webp",
    images: [
      "/images/indomie.webp",
      "/images/indomie-noodles.webp",
      "/images/grocery.webp",
    ],
    price: 1.49, // Base price for single pack
    variants: [
      {
        id: "indomie-single",
        title: "1 pack",
        price: 1.49,
        salePrice: 1.19, // 20% off
        inventory: 0,
        isAvailable: false,
      },
      {
        id: "indomie-5pack",
        title: "5 packs",
        price: 6.99,
        salePrice: 5.59, // 20% off
        inventory: 10,
        isAvailable: true,
      },
      {
        id: "indomie-carton",
        title: "40 pack carton",
        price: 14.99,
        salePrice: 11.99, // 20% off
        inventory: 5,
        isAvailable: true,
      },
    ],
    salePrice: 1.19, // Sale price for base variant
    discountPercentage: 20,
    rating: {
      average: 4.5,
      count: 124,
    },
    slug: "indomie-chicken-40pack",
    category: "Noodles & Pasta",
    brand: "Indomie",
    inStock: true,
    isOnSale: true,
  },

  // 5. Discount + Rating Card - Dangote Rice
  {
    id: "dangote-rice-50kg",
    name: "Dangote Rice Premium Quality",
    shortDescription: "50kg Bag",
    description:
      "Premium quality parboiled rice from Dangote. Long grain rice perfect for all Nigerian dishes.",
    image: "/images/grocery.webp",
    price: 69.99,
    variants: [
      {
        id: "dangote-rice-50kg",
        title: "50kg Bag",
        price: 69.99,
        salePrice: 62.99, // 10% off
        isAvailable: true,
        inventory: 23,
      },
      {
        id: "dangote-rice-100kg",
        title: "100kg Bag",
        price: 134.99,
        salePrice: 121.49, // 10% off
        isAvailable: true,
        inventory: 18,
      },
    ],
    salePrice: 62.99,
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

  // 6. Normal Card - Palm Oil
  {
    id: "devon-palm-oil-5l",
    name: "Devon King Palm Oil",
    shortDescription: "5 Liters Jerry Can",
    description:
      "Pure red palm oil extracted from fresh palm fruits. Rich in vitamins and perfect for cooking.",
    image: "/images/golden-morn.webp",
    price: 16.99,
    slug: "devon-palm-oil-5l",
    category: "Cooking Oils & Essentials",
    brand: "Devon King",
    inStock: true,
    salePrice: 15.29,
    discountPercentage: 10,
    isOnSale: true,
    inventory: 10,
  },

  // 7. Discount Card - Gino Tomatoes
  {
    id: "gino-tomato-paste-400g",
    name: "Gino Tomato Paste",
    shortDescription: "400g x 12 Cans",
    description:
      "Rich and thick tomato paste made from carefully selected tomatoes. Essential for stews and sauces.",
    image: "/images/tin-tomato.webp",
    images: [
      "/images/tin-tomato.webp",
      "/images/tomato-paste.webp",
      "/images/grocery.webp",
    ],
    price: 22.99,
    salePrice: 20.69,
    discountPercentage: 10,
    slug: "gino-tomato-paste-400g",
    category: "Tomato & Sauces",
    brand: "Gino",
    inStock: true,
    isOnSale: true,
    inventory: 20,
  },

  // 8. Rating Card - Plantain Chips
  {
    id: "olu-olu-plantain-chips-500g",
    name: "Olu Olu Plantain Chips",
    shortDescription: "500g Family Pack",
    description:
      "Crispy plantain chips made from fresh plantains. Perfect snack for all occasions.",
    image: "/images/golden-morn.webp",
    price: 3.49,
    rating: {
      average: 4.8,
      count: 67,
    },
    slug: "olu-olu-plantain-chips-500g",
    category: "Snacks & Beverages",
    brand: "Olu Olu",
    inStock: true,
    isOnSale: false,
    inventory: 2,
  },

  // 9. Normal Card - Honey
  {
    id: "rowland-honey-500ml",
    name: "Rowland Pure Honey",
    shortDescription: "500ml Natural Honey",
    description:
      "100% pure natural honey with no artificial additives. Perfect for sweetening and health benefits.",
    image: "/images/tin-tomato.webp",
    price: 6.49,
    slug: "rowland-honey-500ml",
    category: "Cooking Oils & Essentials",
    brand: "Rowland",
    inStock: true,
    isOnSale: false,
    inventory: 10,
  },

  // 10. Discount Card - Peak Milk
  {
    id: "peak-milk-400g",
    name: "Peak Powdered Milk",
    shortDescription: "400g Tin",
    description:
      "Rich and creamy powdered milk fortified with essential vitamins. Perfect for tea, coffee, and cooking.",
    image: "/images/indomie.webp",
    price: 4.49,
    salePrice: 3.82,
    discountPercentage: 15,
    slug: "peak-milk-400g",
    category: "Dairy & Beverages",
    brand: "Peak",
    inStock: true,
    isOnSale: true,
    inventory: 10,
  },

  // 11. Normal Card - Golden Penny Semovita
  {
    id: "golden-penny-semovita-1kg",
    name: "Golden Penny Semovita",
    shortDescription: "1kg Pack",
    description: "Fine quality semovita for making delicious swallow meals.",
    image: "/images/yam-tuber.webp",
    price: 2.79,
    rating: {
      average: 4.3,
      count: 156,
    },
    slug: "golden-penny-semovita-1kg",
    category: "Rice & Grains",
    brand: "Golden Penny",
    inStock: true,
    isOnSale: false,
    inventory: 10,
  },

  // 12. Normal Card - Kings Groundnut Oil
  {
    id: "kings-groundnut-oil-3l",
    name: "Kings Groundnut Oil",
    shortDescription: "3 Liters Jerry Can",
    description: "Pure groundnut oil extracted from premium groundnuts.",
    image: "/images/golden-morn.webp",
    price: 13.99,
    slug: "kings-groundnut-oil-3l",
    category: "Cooking Oils & Essentials",
    brand: "Kings",
    inStock: true,
    isOnSale: false,
    inventory: 10,
  },

  // 13. Discount Card - Milo Chocolate Malt Drink
  {
    id: "milo-chocolate-drink-400g",
    name: "Milo Chocolate Malt Drink",
    shortDescription: "400g Tin",
    description:
      "Nutritious chocolate malt drink fortified with vitamins and minerals.",
    image: "/images/maggi-star.webp",
    price: 4.99,
    salePrice: 4.49,
    discountPercentage: 10,
    rating: {
      average: 4.7,
      count: 203,
    },
    slug: "milo-chocolate-drink-400g",
    category: "Breakfast & Cereals",
    brand: "Milo",
    inStock: true,
    isOnSale: true,
    inventory: 10,
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
