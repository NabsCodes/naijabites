export interface Brand {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  isActive: boolean;
  isPopular?: boolean; // For featuring popular brands
  logoUrl?: string;
  description?: string;
}

// Brands matching your sidebar design
export const brands: Brand[] = [
  {
    id: "indomie",
    name: "Indomie",
    slug: "indomie",
    productCount: 12,
    isActive: true,
    isPopular: true,
    description: "Nigeria's favorite instant noodles",
  },
  {
    id: "golden-penny",
    name: "Golden Penny",
    slug: "golden-penny",
    productCount: 8,
    isActive: true,
    isPopular: true,
    description: "Quality pasta and noodles",
  },
  {
    id: "de-rica",
    name: "De Rica",
    slug: "de-rica",
    productCount: 6,
    isActive: true,
    isPopular: false,
    description: "Premium tomato products",
  },
  {
    id: "dangote",
    name: "Dangote",
    slug: "dangote",
    productCount: 5,
    isActive: true,
    isPopular: true,
    description: "Leading Nigerian conglomerate",
  },
  {
    id: "mamador",
    name: "Mamador",
    slug: "mamador",
    productCount: 4,
    isActive: true,
    isPopular: false,
    description: "Quality cooking oils",
  },
  {
    id: "honeywell",
    name: "Honeywell",
    slug: "honeywell",
    productCount: 7,
    isActive: true,
    isPopular: false,
    description: "Flour and baking essentials",
  },
  {
    id: "three-crowns",
    name: "Three Crowns",
    slug: "three-crowns",
    productCount: 3,
    isActive: true,
    isPopular: false,
    description: "Dairy and milk products",
  },
];

// Helper functions
export const getBrandBySlug = (slug: string): Brand | undefined => {
  return brands.find((brand) => brand.slug === slug);
};

export const getActiveBrands = (): Brand[] => {
  return brands.filter((brand) => brand.isActive);
};

export const getPopularBrands = (): Brand[] => {
  return brands.filter((brand) => brand.isActive && brand.isPopular);
};

export const getBrandsByProductCount = (minCount: number = 5): Brand[] => {
  return brands.filter(
    (brand) => brand.isActive && brand.productCount >= minCount,
  );
};
