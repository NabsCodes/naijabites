// Core Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  slug: string;
  sku: string;
  brand: string;
  category: Category;
  subcategory?: Subcategory;
  images: ProductImage[];
  variants: ProductVariant[];
  basePrice: number;
  salePrice?: number;
  discountPercentage?: number;
  currency: string;
  inStock: boolean;
  stockQuantity: number;
  minOrderQuantity: number;
  maxOrderQuantity?: number;
  weight?: number;
  dimensions?: ProductDimensions;
  nutritionalInfo?: NutritionalInfo;
  allergens?: string[];
  ingredients?: string[];
  countryOfOrigin: string;
  isOrganic: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  rating: ProductRating;
  reviews: Review[];
  tags: string[];
  seoMetadata: SeoMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  size?: string;
  color?: string;
  flavor?: string;
  weight?: string;
  unit?: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  isDefault: boolean;
  image?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
  order: number;
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface NutritionalInfo {
  servingSize: string;
  calories?: number;
  totalFat?: number;
  saturatedFat?: number;
  transFat?: number;
  cholesterol?: number;
  sodium?: number;
  totalCarbs?: number;
  dietaryFiber?: number;
  sugars?: number;
  protein?: number;
  vitamins?: Record<string, string>;
  minerals?: Record<string, string>;
}

export interface ProductRating {
  average: number;
  count: number;
  distribution: RatingDistribution;
}

export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
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
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description?: string;
  image?: string;
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

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "prefer-not-to-say";
  preferences: UserPreferences;
  addresses: Address[];
  defaultAddressId?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  loyaltyPoints: number;
  membershipTier: "bronze" | "silver" | "gold" | "platinum";
  createdAt: string;
  lastLoginAt?: string;
}

export interface UserPreferences {
  language: string;
  currency: string;
  dietaryRestrictions?: string[];
  allergies?: string[];
  preferredCategories?: string[];
  marketingOptIn: boolean;
  smsOptIn: boolean;
}

export interface Address {
  id: string;
  type: "home" | "work" | "other";
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  deliveryInstructions?: string;
}

// Cart & Order Types
export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  salePrice?: number;
  product: Product;
  variant?: ProductVariant;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  appliedCoupons?: CouponCode[];
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  appliedCoupons?: CouponCode[];
  estimatedDelivery: string;
  actualDelivery?: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  salePrice?: number;
  product: Product;
  variant?: ProductVariant;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "partially_refunded";

export interface PaymentMethod {
  type: "credit_card" | "debit_card" | "paypal" | "apple_pay" | "google_pay";
  provider: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  brand?: string;
}

// Coupon Types
export interface CouponCode {
  id: string;
  code: string;
  type: "percentage" | "fixed_amount" | "free_shipping";
  value: number;
  minimumOrderValue?: number;
  maximumDiscount?: number;
  description: string;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  userLimit?: number;
  validFrom: string;
  validTo: string;
  applicableCategories?: string[];
  applicableProducts?: string[];
}

// Location Types
export interface Location {
  id: string;
  city: string;
  province: string;
  country: string;
  postalCodes: string[];
  isServiceable: boolean;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFee: number;
  freeDeliveryThreshold?: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Search & Filter Types
export interface ProductFilter {
  categories?: string[];
  subcategories?: string[];
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  isOrganic?: boolean;
  dietaryRestrictions?: string[];
  sortBy?:
    | "relevance"
    | "price_asc"
    | "price_desc"
    | "rating"
    | "newest"
    | "popularity";
  query?: string;
}

export interface SearchResult {
  products: Product[];
  categories: Category[];
  brands: Brand[];
  totalCount: number;
  facets: SearchFacets;
  query: string;
  suggestions?: string[];
}

export interface SearchFacets {
  categories: FacetGroup;
  brands: FacetGroup;
  priceRanges: FacetGroup;
  ratings: FacetGroup;
}

export interface FacetGroup {
  name: string;
  values: FacetValue[];
}

export interface FacetValue {
  value: string;
  label: string;
  count: number;
  selected: boolean;
}

// SEO Types
export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  robots?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  acceptTerms: boolean;
  marketingOptIn: boolean;
  selectedLocation: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface NewsletterForm {
  email: string;
  preferences?: string[];
}

// Component Props Types
export interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "featured";
  showQuickAdd?: boolean;
  showCompare?: boolean;
  showWishlist?: boolean;
}

export interface ProductGridProps {
  products: Product[];
  columns?: number;
  loading?: boolean;
  variant?: "default" | "compact";
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: () => void;
  showFirstLast?: boolean;
  maxVisible?: number;
}

// Utility Types
export type Loading = boolean;
export type Error = string | null;

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
