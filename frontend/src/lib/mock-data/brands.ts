import { Brand } from "@/types";

export const brands: Brand[] = [
  {
    id: "indomie",
    name: "Indomie",
    slug: "indomie",
    productCount: 12,
    description: "Nigeria's favorite instant noodles",
  },
  {
    id: "golden-penny",
    name: "Golden Penny",
    slug: "golden-penny",
    productCount: 8,
    description: "Quality pasta and noodles",
  },
  {
    id: "de-rica",
    name: "De Rica",
    slug: "de-rica",
    productCount: 6,
    description: "Premium tomato products",
  },
  {
    id: "dangote",
    name: "Dangote",
    slug: "dangote",
    productCount: 5,
    description: "Leading Nigerian conglomerate",
  },
  {
    id: "mamador",
    name: "Mamador",
    slug: "mamador",
    productCount: 4,
    description: "Quality cooking oils",
  },
  {
    id: "honeywell",
    name: "Honeywell",
    slug: "honeywell",
    productCount: 7,
    description: "Flour and baking essentials",
  },
  {
    id: "three-crowns",
    name: "Three Crowns",
    slug: "three-crowns",
    productCount: 3,
    description: "Dairy and milk products",
  },
  {
    id: "maggi",
    name: "Maggi",
    slug: "maggi",
    productCount: 9,
    description: "Premium seasoning cubes and spices",
  },
  {
    id: "peak",
    name: "Peak",
    slug: "peak",
    productCount: 6,
    description: "Quality milk and dairy products",
  },
  {
    id: "gino",
    name: "Gino",
    slug: "gino",
    productCount: 7,
    description: "Premium tomato paste and sauces",
  },
  {
    id: "cowbell",
    name: "Cowbell",
    slug: "cowbell",
    productCount: 4,
    description: "Powdered milk and dairy products",
  },
  {
    id: "knorr",
    name: "Knorr",
    slug: "knorr",
    productCount: 8,
    description: "Seasoning cubes and cooking essentials",
  },
  {
    id: "semovita",
    name: "Semovita",
    slug: "semovita",
    productCount: 3,
    description: "Quality semolina flour",
  },
  {
    id: "vitafoam",
    name: "Vitafoam",
    slug: "vitafoam",
    productCount: 2,
    description: "Home and lifestyle products",
  },
  {
    id: "dano",
    name: "Dano",
    slug: "dano",
    productCount: 5,
    description: "Instant full cream milk powder",
  },
];

// Helper functions
export const getBrandBySlug = (slug: string): Brand | undefined => {
  return brands.find((brand) => brand.slug === slug);
};

export const getBrandsByProductCount = (minCount: number = 5): Brand[] => {
  return brands.filter((brand) => brand.productCount >= minCount);
};
