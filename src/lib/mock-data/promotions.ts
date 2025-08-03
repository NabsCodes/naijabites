export interface PromotionalBanner {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  productImages: string;
  expiryDate?: string;
  isActive: boolean;
}

export const promotionalBanners: PromotionalBanner[] = [
  {
    id: "summer-sale",
    title: "Summer Sale - Up to 50% Off!",
    description: "Get amazing deals on your favorite Nigerian groceries this summer",
    ctaText: "Shop Now",
    ctaLink: "/shop/deals",
    productImages: "/images/nigerian-groceries.webp",
    expiryDate: "July 31, 2024",
    isActive: true,
  },
  {
    id: "new-arrivals",
    title: "Fresh New Arrivals",
    description: "Discover the latest products from Nigeria",
    ctaText: "Explore",
    ctaLink: "/shop/products",
    productImages: "/images/nigerian-groceries.webp",
    isActive: true,
  },
];

export function getActivePromotions(): PromotionalBanner[] {
  return promotionalBanners.filter(banner => banner.isActive);
} 