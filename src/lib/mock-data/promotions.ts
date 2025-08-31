export interface PromotionalBanner {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  productImages: string;
  expiryDate?: string;
  isActive: boolean;
  backgroundColor?: string;
  textColor?: string;
  discountType?: string;
}

export const promotionalBanners: PromotionalBanner[] = [
  {
    id: "summer-sale",
    title: "Summer Sale - Up to 50% Off!",
    description:
      "Get amazing deals on your favorite Nigerian groceries this summer",
    ctaText: "Shop Now",
    ctaLink: "/shop/deals",
    backgroundColor: "bg-[#EDF2EE]",
    textColor: "text-gray-900",
    expiryDate: "August 30, 2025",
    productImages: "/images/nigerian-groceries.webp",
    isActive: true,
  },
  {
    id: "indomie-noodles-10",
    title: "10% Off on All Indomie Noodles!",
    description:
      "Get discounts on Golden Penny Oil, Dangote Spaghetti, and more.",
    ctaText: "Explore Deals",
    ctaLink: "/shop/deals",
    backgroundColor: "bg-lemon-light",
    textColor: "text-gray-900",
    expiryDate: "August 30, 2025",
    productImages: "/images/indomie-noodles.webp",
    discountType: "percentage",
    isActive: true,
  },
  {
    id: "tomato-paste-bogo",
    title: "Buy 2, Get 1 Free on Tomato Pastes!",
    description: "Get more value on Gino, Tasty Tom, and other trusted brands",
    ctaText: "Claim This Deal",
    ctaLink: "/shop/deals",
    backgroundColor: "bg-[#E9CDBF]",
    textColor: "text-gray-900",
    expiryDate: "August 15, 2025",
    productImages: "/images/tomato-paste.webp",
    discountType: "buy-x-get-y",
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
  return promotionalBanners.filter((banner) => banner.isActive);
}
