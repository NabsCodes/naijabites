export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  salePrice?: number;
  sku?: string;
  inventory?: number;
  weight?: string;
  isAvailable: boolean;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description?: string;
  image?: string;
  images?: string[];
  price: number; // Base price (for single variant products)
  salePrice?: number;
  discountPercentage?: number;
  variants?: ProductVariant[]; // Optional variants for products with options
  rating?: {
    average: number;
    count: number;
  };
  slug: string;
  category: string; // Category name (maps to categories.ts)
  brand: string; // Brand name (maps to brands.ts)
  inStock: boolean;
  isOnSale: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount?: number; // Optional, calculated dynamically when needed
}

// Brand Types
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount?: number; // Optional, calculated dynamically when needed
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other" | "prefer-not-to-say";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  lastLoginAt: string;
}
