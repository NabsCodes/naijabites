import { Brand } from "@/types";

export const brands: Brand[] = [
  {
    id: "indomie",
    name: "Indomie",
    slug: "indomie",
    description: "Nigeria's favorite instant noodles",
  },
  {
    id: "golden-penny",
    name: "Golden Penny",
    slug: "golden-penny",
    description: "Quality pasta and noodles",
  },
  {
    id: "dangote",
    name: "Dangote",
    slug: "dangote",
    description: "Leading Nigerian conglomerate",
  },
  {
    id: "maggi",
    name: "Maggi",
    slug: "maggi",
    description: "Premium seasoning cubes and spices",
  },
  {
    id: "peak",
    name: "Peak",
    slug: "peak",
    description: "Quality milk and dairy products",
  },
  {
    id: "gino",
    name: "Gino",
    slug: "gino",
    description: "Premium tomato paste and sauces",
  },
  // Missing brands found in products
  {
    id: "nestle",
    name: "Nestle",
    slug: "nestle",
    description: "International food and beverage company",
  },
  {
    id: "farm-fresh",
    name: "Farm Fresh",
    slug: "farm-fresh",
    description: "Fresh produce and organic products",
  },
  {
    id: "devon-king",
    name: "Devon King",
    slug: "devon-king",
    description: "Quality cooking oils and essentials",
  },
  {
    id: "olu-olu",
    name: "Olu Olu",
    slug: "olu-olu",
    description: "Snacks and processed foods",
  },
  {
    id: "rowland",
    name: "Rowland",
    slug: "rowland",
    description: "Natural honey and organic products",
  },
  {
    id: "kings",
    name: "Kings",
    slug: "kings",
    description: "Cooking oils and food essentials",
  },
  {
    id: "milo",
    name: "Milo",
    slug: "milo",
    description: "Chocolate malt drinks and beverages",
  },
  // Future brands (not yet in products)
  {
    id: "de-rica",
    name: "De Rica",
    slug: "de-rica",
    description: "Premium tomato products",
  },
  {
    id: "mamador",
    name: "Mamador",
    slug: "mamador",
    description: "Quality cooking oils",
  },
  {
    id: "honeywell",
    name: "Honeywell",
    slug: "honeywell",
    description: "Flour and baking essentials",
  },
  {
    id: "three-crowns",
    name: "Three Crowns",
    slug: "three-crowns",
    description: "Dairy and milk products",
  },
  {
    id: "cowbell",
    name: "Cowbell",
    slug: "cowbell",
    description: "Powdered milk and dairy products",
  },
  {
    id: "knorr",
    name: "Knorr",
    slug: "knorr",
    description: "Seasoning cubes and cooking essentials",
  },
  {
    id: "semovita",
    name: "Semovita",
    slug: "semovita",
    description: "Quality semolina flour",
  },
  {
    id: "vitafoam",
    name: "Vitafoam",
    slug: "vitafoam",
    description: "Home and lifestyle products",
  },
  {
    id: "dano",
    name: "Dano",
    slug: "dano",
    description: "Instant full cream milk powder",
  },
];

// Helper functions
export const getBrandBySlug = (slug: string): Brand | undefined => {
  return brands.find((brand) => brand.slug === slug);
};
