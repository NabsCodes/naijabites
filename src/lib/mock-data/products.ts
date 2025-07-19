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
    price: 12000,
    slug: "maggi-cubes-250g",
    category: "Seasonings & Spices",
    brand: "Maggi",
    inStock: true,
    isOnSale: false,
    inventory: 5, // 5 in stock
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
    price: 8500,
    salePrice: 7650,
    discountPercentage: 10,
    slug: "golden-morn-1kg",
    category: "Breakfast & Cereals",
    brand: "Nestle",
    inStock: true,
    isOnSale: true,
    inventory: 5, // 5 in stock
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
    price: 19020, // Base price for smallest variant
    variants: [
      {
        id: "yam-small-2kg",
        title: "1 bag (2kg)",
        price: 19020,
        salePrice: 17118, // 10% off
        isAvailable: true,
        inventory: 5,
      },
      {
        id: "yam-medium-3tubes",
        title: "3 tubers",
        price: 39000,
        salePrice: 35100, // 10% off
        isAvailable: true,
        inventory: 10,
      },
      {
        id: "yam-large-dozen",
        title: "dozen",
        price: 109020,
        salePrice: 98118, // 10% off
        isAvailable: true,
        inventory: 20,
      },
    ],
    salePrice: 17118, // Sale price for base variant
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
    price: 1500, // Base price for single pack
    variants: [
      {
        id: "indomie-single",
        title: "1 pack",
        price: 1500,
        salePrice: 1200, // 20% off
        inventory: 0,
        isAvailable: false,
      },
      {
        id: "indomie-5pack",
        title: "5 packs",
        price: 7000,
        salePrice: 5600, // 20% off
        inventory: 10,
        isAvailable: true,
      },
      {
        id: "indomie-carton",
        title: "40 pack carton",
        price: 15000,
        salePrice: 12000, // 20% off
        inventory: 5,
        isAvailable: true,
      },
    ],
    salePrice: 1200, // Sale price for base variant
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
    price: 75000,
    variants: [
      {
        id: "dangote-rice-50kg",
        title: "50kg Bag",
        price: 75000,
        salePrice: 67500, // 10% off
        isAvailable: true,
        inventory: 5,
      },
      {
        id: "dangote-rice-100kg",
        title: "100kg Bag",
        price: 145000,
        salePrice: 130500, // 10% off
        isAvailable: true,
        inventory: 10,
      },
    ],
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

  // 6. Normal Card - Palm Oil
  {
    id: "devon-palm-oil-5l",
    name: "Devon King Palm Oil",
    shortDescription: "5 Liters Jerry Can",
    description:
      "Pure red palm oil extracted from fresh palm fruits. Rich in vitamins and perfect for cooking.",
    image: "/images/golden-morn.webp",
    price: 18000,
    slug: "devon-palm-oil-5l",
    category: "Cooking Oils & Essentials",
    brand: "Devon King",
    inStock: true,
    isOnSale: false,
    inventory: 20,
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
    price: 24000,
    salePrice: 21600,
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
    price: 6500,
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
    price: 4500,
    salePrice: 3825,
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
    price: 2800,
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
    price: 14500,
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
    price: 5200,
    salePrice: 4680,
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
