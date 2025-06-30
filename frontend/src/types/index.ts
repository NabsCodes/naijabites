export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  image?: string;
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
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parentId?: string;
  isActive: boolean;
  sortOrder: number;
  productCount: number;
}

// Brand Types
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  countryOfOrigin?: string;
  isActive: boolean;
  productCount: number;
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
