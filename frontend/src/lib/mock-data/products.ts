import {
  Product,
  ProductVariant,
  ProductImage,
  Review,
  Category,
  Brand,
  ProductRating,
} from "@/types";
import { categories } from "./categories";
import { brands } from "./brands";

// Helper function to generate product rating
const generateRating = (averageRating: number): ProductRating => {
  const count = Math.floor(Math.random() * 150) + 20;
  const distribution = {
    5: Math.floor(
      count * (averageRating >= 4.5 ? 0.6 : averageRating >= 4 ? 0.4 : 0.2),
    ),
    4: Math.floor(count * (averageRating >= 4 ? 0.3 : 0.25)),
    3: Math.floor(count * (averageRating >= 3 ? 0.15 : 0.3)),
    2: Math.floor(count * 0.1),
    1: Math.floor(count * 0.05),
  };
  // Adjust to match total count
  const total =
    distribution[5] +
    distribution[4] +
    distribution[3] +
    distribution[2] +
    distribution[1];
  if (total !== count) {
    distribution[5] += count - total;
  }

  return {
    average: averageRating,
    count,
    distribution,
  };
};

// Helper function to generate review
const generateReviews = (productId: string, count: number): Review[] => {
  const userNames = [
    "Chidi Okafor",
    "Adunni Fashola",
    "Kemi Johnson",
    "Tunde Adebayo",
    "Ngozi Ikenna",
    "Yemi Adeleke",
    "Folake Williams",
    "Segun Ogundimu",
    "Bisi Oladele",
    "Femi Ogunkoya",
  ];

  const reviewTemplates = [
    {
      rating: 5,
      title: "Excellent quality!",
      comment: "Exactly what I was looking for. Fresh and authentic taste.",
    },
    {
      rating: 4,
      title: "Good product",
      comment: "Good quality, arrived quickly. Reminds me of home.",
    },
    {
      rating: 5,
      title: "Highly recommend",
      comment: "Perfect for traditional Nigerian cooking. Very satisfied.",
    },
    {
      rating: 4,
      title: "Great value",
      comment: "Good price for the quality. Will definitely order again.",
    },
    {
      rating: 5,
      title: "Authentic taste",
      comment: "Tastes just like the ones from Nigeria. Excellent!",
    },
    {
      rating: 3,
      title: "Decent quality",
      comment: "Not bad, but I've had better. Still usable though.",
    },
    {
      rating: 4,
      title: "Fast delivery",
      comment: "Arrived quickly and in good condition. Happy with purchase.",
    },
    {
      rating: 5,
      title: "Perfect!",
      comment: "Everything I expected and more. Great Nigerian grocery store.",
    },
  ];

  return Array.from({ length: count }, (_, index) => {
    const review =
      reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
    return {
      id: `review-${productId}-${index + 1}`,
      productId,
      userId: `user-${index + 1}`,
      userName: userNames[index % userNames.length],
      userAvatar: `https://images.unsplash.com/photo-${1500000000000 + (index % 50) * 10000000}?w=100&h=100&fit=crop&crop=face&auto=format&q=80`,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      isVerifiedPurchase: Math.random() > 0.3,
      helpfulCount: Math.floor(Math.random() * 20),
      createdAt: new Date(
        Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      updatedAt: new Date(
        Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    };
  });
};

export const products: Product[] = [
  // Rice Products
  {
    id: "dangote-rice-50kg",
    name: "Dangote Rice 50kg",
    description:
      "Premium quality parboiled rice from Dangote, perfect for Nigerian households. Long grain rice that cooks perfectly for jollof, fried rice, and other Nigerian delicacies.",
    shortDescription:
      "Premium 50kg parboiled rice perfect for Nigerian cooking",
    slug: "dangote-rice-50kg",
    sku: "DANG-RICE-50KG",
    brand: "dangote",
    category: categories.find((c) => c.id === "grains-staples")!,
    subcategory: categories
      .find((c) => c.id === "grains-staples")
      ?.subcategories?.find((s) => s.id === "rice-varieties"),
    images: [
      {
        id: "img-1",
        url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
        alt: "Dangote Rice 50kg Main",
        isMain: true,
        order: 1,
      },
      {
        id: "img-2",
        url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
        alt: "Dangote Rice 50kg Side View",
        isMain: false,
        order: 2,
      },
    ],
    variants: [
      {
        id: "dangote-rice-50kg-default",
        name: "50kg Bag",
        sku: "DANG-RICE-50KG-DEFAULT",
        weight: "50kg",
        unit: "bag",
        price: 87.99,
        salePrice: 82.99,
        stockQuantity: 25,
        isDefault: true,
      },
      {
        id: "dangote-rice-25kg",
        name: "25kg Bag",
        sku: "DANG-RICE-25KG",
        weight: "25kg",
        unit: "bag",
        price: 44.99,
        salePrice: 42.99,
        stockQuantity: 35,
        isDefault: false,
      },
    ],
    basePrice: 87.99,
    salePrice: 82.99,
    discountPercentage: 6,
    currency: "CAD",
    inStock: true,
    stockQuantity: 60,
    minOrderQuantity: 1,
    maxOrderQuantity: 5,
    weight: 50,
    countryOfOrigin: "Nigeria",
    isOrganic: false,
    isFeatured: true,
    isOnSale: true,
    rating: generateRating(4.5),
    reviews: generateReviews("dangote-rice-50kg", 45),
    tags: ["rice", "staple", "Nigerian", "parboiled", "long-grain"],
    seoMetadata: {
      title: "Dangote Rice 50kg - Premium Nigerian Parboiled Rice | NaijaBites",
      description:
        "Buy premium Dangote Rice 50kg online. Perfect for jollof rice, fried rice and Nigerian cooking. Fast delivery across Canada.",
      keywords: [
        "dangote rice",
        "Nigerian rice",
        "parboiled rice",
        "50kg rice",
        "jollof rice",
      ],
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-12-01T15:30:00Z",
  },

  {
    id: "mama-gold-rice-25kg",
    name: "Mama Gold Rice 25kg",
    description:
      "High-quality parboiled rice brand trusted by Nigerian families worldwide. Perfectly milled for excellent cooking results every time.",
    shortDescription:
      "Trusted 25kg parboiled rice for authentic Nigerian meals",
    slug: "mama-gold-rice-25kg",
    sku: "MAMA-RICE-25KG",
    brand: "mama-gold",
    category: categories.find((c) => c.id === "grains-staples")!,
    subcategory: categories
      .find((c) => c.id === "grains-staples")
      ?.subcategories?.find((s) => s.id === "rice-varieties"),
    images: [
      {
        id: "img-3",
        url: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
        alt: "Mama Gold Rice 25kg",
        isMain: true,
        order: 1,
      },
    ],
    variants: [
      {
        id: "mama-gold-rice-25kg-default",
        name: "25kg Bag",
        sku: "MAMA-RICE-25KG-DEFAULT",
        weight: "25kg",
        unit: "bag",
        price: 46.99,
        stockQuantity: 20,
        isDefault: true,
      },
    ],
    basePrice: 46.99,
    currency: "CAD",
    inStock: true,
    stockQuantity: 20,
    minOrderQuantity: 1,
    maxOrderQuantity: 3,
    weight: 25,
    countryOfOrigin: "Nigeria",
    isOrganic: false,
    isFeatured: false,
    isOnSale: false,
    rating: generateRating(4.3),
    reviews: generateReviews("mama-gold-rice-25kg", 32),
    tags: ["rice", "staple", "Nigerian", "parboiled"],
    seoMetadata: {
      title: "Mama Gold Rice 25kg - Quality Nigerian Rice | NaijaBites",
      description:
        "Premium Mama Gold Rice 25kg for authentic Nigerian cooking. Order online with fast Canada-wide delivery.",
      keywords: [
        "mama gold rice",
        "Nigerian rice",
        "25kg rice",
        "parboiled rice",
      ],
    },
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-11-28T12:00:00Z",
  },

  // Beans and Legumes
  {
    id: "brown-beans-5kg",
    name: "Nigerian Brown Beans 5kg",
    description:
      "Premium quality Nigerian brown beans (honey beans) perfect for traditional dishes like moi moi, akara, and gbegiri soup. Rich in protein and essential nutrients.",
    shortDescription:
      "Premium 5kg Nigerian brown beans for traditional cooking",
    slug: "nigerian-brown-beans-5kg",
    sku: "BEANS-BROWN-5KG",
    brand: "grand-cereals",
    category: categories.find((c) => c.id === "grains-staples")!,
    subcategory: categories
      .find((c) => c.id === "grains-staples")
      ?.subcategories?.find((s) => s.id === "beans-legumes"),
    images: [
      {
        id: "img-4",
        url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
        alt: "Nigerian Brown Beans 5kg",
        isMain: true,
        order: 1,
      },
    ],
    variants: [
      {
        id: "brown-beans-5kg-default",
        name: "5kg Bag",
        sku: "BEANS-BROWN-5KG-DEFAULT",
        weight: "5kg",
        unit: "bag",
        price: 24.99,
        stockQuantity: 40,
        isDefault: true,
      },
      {
        id: "brown-beans-2kg",
        name: "2kg Bag",
        sku: "BEANS-BROWN-2KG",
        weight: "2kg",
        unit: "bag",
        price: 12.99,
        stockQuantity: 60,
        isDefault: false,
      },
    ],
    basePrice: 24.99,
    currency: "CAD",
    inStock: true,
    stockQuantity: 100,
    minOrderQuantity: 1,
    maxOrderQuantity: 10,
    weight: 5,
    nutritionalInfo: {
      servingSize: "100g",
      calories: 347,
      protein: 21.6,
      totalCarbs: 63,
      dietaryFiber: 15.5,
      totalFat: 1.2,
    },
    countryOfOrigin: "Nigeria",
    isOrganic: false,
    isFeatured: true,
    isOnSale: false,
    rating: generateRating(4.7),
    reviews: generateReviews("brown-beans-5kg", 28),
    tags: ["beans", "protein", "Nigerian", "legumes", "moi-moi", "akara"],
    seoMetadata: {
      title:
        "Nigerian Brown Beans 5kg - Honey Beans for Moi Moi & Akara | NaijaBites",
      description:
        "Premium Nigerian brown beans (honey beans) 5kg perfect for moi moi, akara, and traditional dishes. High protein content.",
      keywords: [
        "brown beans",
        "honey beans",
        "Nigerian beans",
        "moi moi",
        "akara",
        "protein",
      ],
    },
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-11-30T10:15:00Z",
  },

  // Yam and Tubers
  {
    id: "pounded-yam-flour-2kg",
    name: "Pounded Yam Flour 2kg",
    description:
      "Instant pounded yam flour made from premium Nigerian yam. Easy to prepare - just add hot water and enjoy authentic pounded yam without the traditional pounding process.",
    shortDescription:
      "Instant 2kg pounded yam flour for authentic Nigerian meals",
    slug: "pounded-yam-flour-2kg",
    sku: "YAM-FLOUR-2KG",
    brand: "honeywell",
    category: categories.find((c) => c.id === "grains-staples")!,
    subcategory: categories
      .find((c) => c.id === "grains-staples")
      ?.subcategories?.find((s) => s.id === "tubers"),
    images: [
      {
        id: "img-5",
        url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
        alt: "Pounded Yam Flour 2kg",
        isMain: true,
        order: 1,
      },
      {
        id: "img-6",
        url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
        alt: "Prepared Pounded Yam",
        isMain: false,
        order: 2,
      },
    ],
    variants: [
      {
        id: "pounded-yam-flour-2kg-default",
        name: "2kg Pack",
        sku: "YAM-FLOUR-2KG-DEFAULT",
        weight: "2kg",
        unit: "pack",
        price: 18.99,
        salePrice: 16.99,
        stockQuantity: 50,
        isDefault: true,
      },
      {
        id: "pounded-yam-flour-1kg",
        name: "1kg Pack",
        sku: "YAM-FLOUR-1KG",
        weight: "1kg",
        unit: "pack",
        price: 11.99,
        stockQuantity: 75,
        isDefault: false,
      },
    ],
    basePrice: 18.99,
    salePrice: 16.99,
    discountPercentage: 11,
    currency: "CAD",
    inStock: true,
    stockQuantity: 125,
    minOrderQuantity: 1,
    maxOrderQuantity: 8,
    weight: 2,
    countryOfOrigin: "Nigeria",
    isOrganic: false,
    isFeatured: false,
    isOnSale: true,
    rating: generateRating(4.2),
    reviews: generateReviews("pounded-yam-flour-2kg", 19),
    tags: ["yam", "flour", "instant", "Nigerian", "traditional", "swallow"],
    seoMetadata: {
      title: "Pounded Yam Flour 2kg - Instant Nigerian Yam Flour | NaijaBites",
      description:
        "Buy instant pounded yam flour 2kg online. Easy to prepare authentic Nigerian pounded yam. Fast delivery across Canada.",
      keywords: [
        "pounded yam flour",
        "instant yam",
        "Nigerian yam",
        "swallow food",
        "2kg yam flour",
      ],
    },
    createdAt: "2024-02-10T14:00:00Z",
    updatedAt: "2024-12-02T09:45:00Z",
  },

  // Seasonings and Spices
  {
    id: "maggi-chicken-cubes-100-pieces",
    name: "Maggi Chicken Seasoning Cubes (100 pieces)",
    description:
      "The most popular seasoning cubes in Nigeria. Maggi chicken cubes add rich, savory flavor to all your Nigerian dishes including jollof rice, stews, and soups.",
    shortDescription: "Popular 100-piece Maggi chicken seasoning cubes",
    slug: "maggi-chicken-cubes-100-pieces",
    sku: "MAGGI-CHICKEN-100PC",
    brand: "maggi",
    category: categories.find((c) => c.id === "pantry-essentials")!,
    subcategory: categories
      .find((c) => c.id === "pantry-essentials")
      ?.subcategories?.find((s) => s.id === "seasonings"),
    images: [
      {
        id: "img-7",
        url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
        alt: "Maggi Chicken Cubes 100 pieces",
        isMain: true,
        order: 1,
      },
    ],
    variants: [
      {
        id: "maggi-chicken-100pc-default",
        name: "100 pieces",
        sku: "MAGGI-CHICKEN-100PC-DEFAULT",
        size: "100 pieces",
        unit: "box",
        price: 12.99,
        stockQuantity: 80,
        isDefault: true,
      },
      {
        id: "maggi-chicken-50pc",
        name: "50 pieces",
        sku: "MAGGI-CHICKEN-50PC",
        size: "50 pieces",
        unit: "box",
        price: 7.99,
        stockQuantity: 100,
        isDefault: false,
      },
    ],
    basePrice: 12.99,
    currency: "CAD",
    inStock: true,
    stockQuantity: 180,
    minOrderQuantity: 1,
    maxOrderQuantity: 15,
    weight: 0.5,
    ingredients: [
      "Salt",
      "Monosodium glutamate",
      "Palm oil",
      "Chicken flavoring",
      "Spices",
    ],
    countryOfOrigin: "Nigeria",
    isOrganic: false,
    isFeatured: true,
    isOnSale: false,
    rating: generateRating(4.8),
    reviews: generateReviews("maggi-chicken-cubes-100-pieces", 67),
    tags: ["seasoning", "maggi", "chicken", "cubes", "Nigerian", "cooking"],
    seoMetadata: {
      title:
        "Maggi Chicken Seasoning Cubes 100pc - Nigerian Cooking Essential | NaijaBites",
      description:
        "Authentic Maggi chicken seasoning cubes 100 pieces. Essential for Nigerian cooking - jollof rice, stews, soups. Buy online.",
      keywords: [
        "maggi cubes",
        "chicken seasoning",
        "Nigerian seasoning",
        "cooking cubes",
        "100 pieces",
      ],
    },
    createdAt: "2024-01-05T08:00:00Z",
    updatedAt: "2024-11-25T16:20:00Z",
  },

  {
    id: "knorr-crayfish-seasoning-1kg",
    name: "Knorr Crayfish Seasoning 1kg",
    description:
      "Authentic Nigerian crayfish seasoning powder that adds the perfect seafood flavor to your soups, stews, and traditional dishes. A must-have for every Nigerian kitchen.",
    shortDescription: "Authentic 1kg Nigerian crayfish seasoning powder",
    slug: "knorr-crayfish-seasoning-1kg",
    sku: "KNORR-CRAYFISH-1KG",
    brand: "knorr",
    category: categories.find((c) => c.id === "pantry-essentials")!,
    subcategory: categories
      .find((c) => c.id === "pantry-essentials")
      ?.subcategories?.find((s) => s.id === "seasonings"),
    images: [
      {
        id: "img-8",
        url: "https://images.unsplash.com/photo-1607672632458-9eb56696346b?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
        alt: "Knorr Crayfish Seasoning 1kg",
        isMain: true,
        order: 1,
      },
    ],
    variants: [
      {
        id: "knorr-crayfish-1kg-default",
        name: "1kg Container",
        sku: "KNORR-CRAYFISH-1KG-DEFAULT",
        weight: "1kg",
        unit: "container",
        price: 32.99,
        stockQuantity: 30,
        isDefault: true,
      },
      {
        id: "knorr-crayfish-500g",
        name: "500g Container",
        sku: "KNORR-CRAYFISH-500G",
        weight: "500g",
        unit: "container",
        price: 18.99,
        stockQuantity: 45,
        isDefault: false,
      },
    ],
    basePrice: 32.99,
    currency: "CAD",
    inStock: true,
    stockQuantity: 75,
    minOrderQuantity: 1,
    maxOrderQuantity: 5,
    weight: 1,
    ingredients: ["Dried crayfish", "Salt", "Natural flavoring"],
    allergens: ["Crustaceans"],
    countryOfOrigin: "Nigeria",
    isOrganic: false,
    isFeatured: false,
    isOnSale: false,
    rating: generateRating(4.6),
    reviews: generateReviews("knorr-crayfish-seasoning-1kg", 23),
    tags: [
      "crayfish",
      "seasoning",
      "seafood",
      "Nigerian",
      "soup",
      "traditional",
    ],
    seoMetadata: {
      title:
        "Knorr Crayfish Seasoning 1kg - Authentic Nigerian Seafood Flavor | NaijaBites",
      description:
        "Premium Knorr crayfish seasoning 1kg for authentic Nigerian soups and stews. Essential seafood flavoring for traditional cooking.",
      keywords: [
        "crayfish seasoning",
        "Nigerian seasoning",
        "seafood flavor",
        "knorr",
        "1kg seasoning",
      ],
    },
    createdAt: "2024-02-15T13:00:00Z",
    updatedAt: "2024-11-29T11:30:00Z",
  },

  // Fresh Vegetables (Frozen/Preserved)
  {
    id: "frozen-ugu-leaves-500g",
    name: "Frozen Ugu Leaves 500g",
    description:
      "Fresh frozen Nigerian ugu (fluted pumpkin) leaves, carefully preserved to maintain nutrients and flavor. Perfect for ugu soup, egusi, and other traditional dishes.",
    shortDescription:
      "Fresh frozen 500g ugu leaves for traditional Nigerian soups",
    slug: "frozen-ugu-leaves-500g",
    sku: "FROZEN-UGU-500G",
    brand: "grand-cereals",
    category: categories.find((c) => c.id === "fresh-produce")!,
    subcategory: categories
      .find((c) => c.id === "fresh-produce")
      ?.subcategories?.find((s) => s.id === "fresh-vegetables"),
    images: [
      {
        id: "img-9",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
        alt: "Frozen Ugu Leaves 500g",
        isMain: true,
        order: 1,
      },
    ],
    variants: [
      {
        id: "frozen-ugu-500g-default",
        name: "500g Pack",
        sku: "FROZEN-UGU-500G-DEFAULT",
        weight: "500g",
        unit: "pack",
        price: 8.99,
        stockQuantity: 25,
        isDefault: true,
      },
    ],
    basePrice: 8.99,
    currency: "CAD",
    inStock: true,
    stockQuantity: 25,
    minOrderQuantity: 1,
    maxOrderQuantity: 10,
    weight: 0.5,
    nutritionalInfo: {
      servingSize: "100g",
      calories: 22,
      protein: 3.8,
      totalCarbs: 2.1,
      vitamins: { "Vitamin A": "8600 IU", "Vitamin C": "75mg" },
    },
    countryOfOrigin: "Nigeria",
    isOrganic: false,
    isFeatured: false,
    isOnSale: false,
    rating: generateRating(4.4),
    reviews: generateReviews("frozen-ugu-leaves-500g", 15),
    tags: ["ugu", "vegetables", "frozen", "Nigerian", "leaves", "soup"],
    seoMetadata: {
      title:
        "Frozen Ugu Leaves 500g - Nigerian Fluted Pumpkin Leaves | NaijaBites",
      description:
        "Fresh frozen ugu (fluted pumpkin) leaves 500g for authentic Nigerian soups. Nutrient-rich and perfectly preserved.",
      keywords: [
        "ugu leaves",
        "fluted pumpkin",
        "Nigerian vegetables",
        "frozen vegetables",
        "ugu soup",
      ],
    },
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-11-27T14:45:00Z",
  },

  // Beverages
  {
    id: "chivita-active-orange-1l",
    name: "Chivita Active Orange Juice 1L",
    description:
      "Premium orange juice with real fruit pulp, fortified with vitamins and minerals. A refreshing and nutritious beverage perfect for any time of day.",
    shortDescription:
      "Premium 1L orange juice with real fruit pulp and vitamins",
    slug: "chivita-active-orange-1l",
    sku: "CHIVITA-ORANGE-1L",
    brand: "chivita",
    category: categories.find((c) => c.id === "beverages")!,
    subcategory: categories
      .find((c) => c.id === "beverages")
      ?.subcategories?.find((s) => s.id === "juices"),
    images: [
      {
        id: "img-10",
        url: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80",
        alt: "Chivita Active Orange Juice 1L",
        isMain: true,
        order: 1,
      },
    ],
    variants: [
      {
        id: "chivita-orange-1l-default",
        name: "1L Bottle",
        sku: "CHIVITA-ORANGE-1L-DEFAULT",
        size: "1L",
        unit: "bottle",
        price: 5.99,
        stockQuantity: 60,
        isDefault: true,
      },
      {
        id: "chivita-orange-500ml",
        name: "500ml Bottle",
        sku: "CHIVITA-ORANGE-500ML",
        size: "500ml",
        unit: "bottle",
        price: 3.49,
        stockQuantity: 80,
        isDefault: false,
      },
    ],
    basePrice: 5.99,
    currency: "CAD",
    inStock: true,
    stockQuantity: 140,
    minOrderQuantity: 1,
    maxOrderQuantity: 20,
    weight: 1,
    nutritionalInfo: {
      servingSize: "250ml",
      calories: 110,
      totalCarbs: 26,
      sugars: 22,
      vitamins: { "Vitamin C": "60mg" },
    },
    ingredients: [
      "Orange juice",
      "Water",
      "Natural orange flavoring",
      "Vitamin C",
    ],
    countryOfOrigin: "Nigeria",
    isOrganic: false,
    isFeatured: false,
    isOnSale: false,
    rating: generateRating(4.1),
    reviews: generateReviews("chivita-active-orange-1l", 24),
    tags: ["juice", "orange", "beverage", "vitamin C", "chivita"],
    seoMetadata: {
      title:
        "Chivita Active Orange Juice 1L - Premium Nigerian Orange Juice | NaijaBites",
      description:
        "Refreshing Chivita Active orange juice 1L with real fruit pulp and vitamins. Premium Nigerian beverage brand.",
      keywords: [
        "chivita juice",
        "orange juice",
        "Nigerian juice",
        "1L juice",
        "vitamin C",
      ],
    },
    createdAt: "2024-02-20T12:00:00Z",
    updatedAt: "2024-11-26T13:15:00Z",
  },
];

export const featuredProducts = products.filter((p) => p.isFeatured);
export const saleProducts = products.filter((p) => p.isOnSale);

export const getProductsByCategory = (categoryId: string) => {
  return products.filter((p) => p.category.id === categoryId);
};

export const getProductsByBrand = (brandSlug: string) => {
  return products.filter((p) => p.brand === brandSlug);
};

export const getProductBySlug = (slug: string) => {
  return products.find((p) => p.slug === slug);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  );
};
