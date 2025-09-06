export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description?: string;
  image?: string;
  images?: string[];
  price: number;
  salePrice?: number;
  discountPercentage?: number;
  rating?: {
    average: number;
    count: number;
  };
  slug: string;
  category: string;
  brand: string;
  inStock: boolean;
  isOnSale: boolean;
  inventory?: number;
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
