export interface PromotionalBanner {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
  textColor: string;
  expiryDate?: string;
  productImages: string;
  discountType: "percentage" | "buy-x-get-y";
}

export const promotionalBanners: PromotionalBanner[] = [
  {
    id: "cooking-essentials-20",
    title: "Up to 20% Off Cooking Essentials!",
    description:
      "Get discounts on Devon King's Oil, Golden penny Spaghetti, and more.",
    ctaText: "Grab the Deals",
    ctaLink: "/shop/deals",
    backgroundColor: "bg-[#EDF2EE]",
    textColor: "text-gray-900",
    expiryDate: "July 30, 2025",
    productImages: "/images/nigerian-groceries.webp",
    discountType: "percentage",
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
    expiryDate: "July 30, 2025",
    productImages: "/images/indomie-noodles.webp",
    discountType: "percentage",
  },
  {
    id: "tomato-paste-bogo",
    title: "Buy 2, Get 1 Free on Tomato Pastes!",
    description: "Get more value on Gino, Tasty Tom, and other trusted brands",
    ctaText: "Claim This Deal",
    ctaLink: "/shop/deals",
    backgroundColor: "bg-[#E9CDBF]",
    textColor: "text-gray-900",
    expiryDate: "July 15, 2025",
    productImages: "/images/tomato-paste.webp",
    discountType: "buy-x-get-y",
  },
];

// For Shopify integration later, this could map to:
// - Shopify Collections with discount metafields
// - Promotional banners configured in admin
// - Automatic expiry handling
export const getActivePromotions = (): PromotionalBanner[] => {
  const now = new Date();
  return promotionalBanners.filter((banner) => {
    if (!banner.expiryDate) return true;
    return new Date(banner.expiryDate) > now;
  });
};
