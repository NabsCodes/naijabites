import { SearchSuggestion } from "@/types/search";
import { shopifyFetch, transformShopifyProduct } from "@/lib/shopify";

// Constants
export const SEARCH_VALIDATION = {
  DEBOUNCE_MIN_LENGTH: 2,
} as const;

// Validation functions
export function shouldTriggerSearch(query: string): boolean {
  return query.trim().length >= SEARCH_VALIDATION.DEBOUNCE_MIN_LENGTH;
}

export function prepareQueryForUrl(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}

// Product fragment reused from shopify.ts
const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    totalInventory
    vendor
    productType
    tags
    createdAt
    updatedAt
    publishedAt
    onlineStoreUrl
    seo {
      title
      description
    }
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

export async function searchProducts(
  query: string,
  limit: number = 5,
): Promise<SearchSuggestion[]> {
  if (!query.trim()) return [];

  const gqlQuery = `
    ${PRODUCT_FRAGMENT}
    query SearchProducts($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(gqlQuery, {
      query: `title:*${query.trim()}*`,
      first: limit,
    });

    return data.products.edges.map((edge: any): SearchSuggestion => {
      const product = transformShopifyProduct(edge.node);
      return {
        id: product.id,
        type: "product",
        title: product.name,
        subtitle: `${product.brand} • ${product.category}`,
        image: product.image,
        slug: product.slug,
        category: product.category,
      };
    });
  } catch (error) {
    console.error("Error searching Shopify products:", error);
    return [];
  }
}

export function searchCategories(
  query: string,
  limit: number = 3,
): SearchSuggestion[] {
  return []; // To be implemented (e.g., from collections or tags)
}

export function searchBrands(
  query: string,
  limit: number = 3,
): SearchSuggestion[] {
  return []; // To be implemented (e.g., from vendor field or metafields)
}

export async function getSearchSuggestions(
  query: string,
  options: {
    maxProducts?: number;
    maxCategories?: number;
    maxBrands?: number;
  } = {},
): Promise<SearchSuggestion[]> {
  if (!query.trim()) return [];

  const productResults = await searchProducts(query, options.maxProducts);
  const categoryResults: SearchSuggestion[] = [];
  const brandResults: SearchSuggestion[] = [];

  return [...productResults, ...categoryResults, ...brandResults];
}

export function getSearchUrl(
  query: string,
  filters?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  },
): string {
  const params = new URLSearchParams();

  const searchQuery = filters?.search || query.trim();
  if (searchQuery) {
    params.set("search", searchQuery);
  }

  if (filters?.category) {
    params.set("category", filters.category);
  }
  if (filters?.minPrice) {
    params.set("minPrice", filters.minPrice.toString());
  }
  if (filters?.maxPrice) {
    params.set("maxPrice", filters.maxPrice.toString());
  }
  if (filters?.sortBy) {
    params.set("sort", filters.sortBy);
  }

  const queryString = params.toString();
  return `/shop/products${queryString ? `?${queryString}` : ""}`;
}
