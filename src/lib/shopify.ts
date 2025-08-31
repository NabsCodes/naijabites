const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!;

export async function shopifyFetch<T = any>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    },
  );

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

// Function for authenticated customer requests
export async function shopifyCustomerFetch<T = any>(
  query: string,
  customerAccessToken: string,
  variables?: Record<string, any>,
): Promise<T> {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2024-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
        "X-Shopify-Customer-Access-Token": customerAccessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    },
  );

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

// Shopify Product Queries
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
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
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

// Get featured products (products tagged as featured or in a featured collection)
export async function getFeaturedProducts(limit: number = 8) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetFeaturedProducts($first: Int!) {
      products(first: $first, query: "tag:featured OR tag:homepage") {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { first: limit });
    return data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

// Get products by collection
export async function getProductsByCollection(
  collectionHandle: string,
  limit: number = 20,
) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductsByCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        products(first: $first) {
          edges {
            node {
              ...ProductFragment
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, {
      handle: collectionHandle,
      first: limit,
    });
    return data.collection?.products.edges.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error("Error fetching products by collection:", error);
    return [];
  }
}

// Get product by handle
export async function getProductByHandle(handle: string) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      product(handle: $handle) {
        ...ProductFragment
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { handle });
    return data.product;
  } catch (error) {
    console.error("Error fetching product by handle:", error);
    return null;
  }
}

// Get products on sale
// TODO: allow getProductsOnSale to be fetched by comparing minVariantPrice and maxVariantPrice
export async function getProductsOnSale(limit: number = 8) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductsOnSale($first: Int!) {
      products(first: $first, query: "tag:sale OR tag:discount") {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { first: limit });
    return data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Error fetching products on sale:", error);
    return [];
  }
}

// Get all products with pagination
export async function getAllProducts(first: number = 20, after?: string) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetAllProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { first, after });
    return {
      products: data.products.edges.map((edge: any) => edge.node),
      pageInfo: data.products.pageInfo,
    };
  } catch (error) {
    console.error("Error fetching all products:", error);
    return { products: [], pageInfo: null };
  }
}

// Get all products without pagination (for sections that need all products)
export async function getAllProductsList(limit: number = 100) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetAllProductsList($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch(query, { first: limit });
    return data.products.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Error fetching all products list:", error);
    return [];
  }
}

// Transform Shopify product to our Product type
export function transformShopifyProduct(shopifyProduct: any) {
  const firstImage = shopifyProduct.images?.edges?.[0]?.node;
  const firstVariant = shopifyProduct.variants?.edges?.[0]?.node;

  // Calculate pricing
  const minPrice = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(shopifyProduct.priceRange.maxVariantPrice.amount);
  const minComparePrice = parseFloat(
    shopifyProduct.compareAtPriceRange.minVariantPrice.amount,
  );

  // Determine if product is on sale
  const isOnSale = minComparePrice > minPrice;
  const discountPercentage = isOnSale
    ? Math.round(((minComparePrice - minPrice) / minComparePrice) * 100)
    : undefined;

  // Transform variants
  const variants =
    shopifyProduct.variants?.edges?.map((edge: any) => {
      const variant = edge.node;
      return {
        id: variant.id,
        title: variant.title,
        price: parseFloat(variant.price.amount), // Keep as dollars, not cents
        salePrice: variant.compareAtPrice
          ? parseFloat(variant.compareAtPrice.amount)
          : undefined,
        inventory: variant.quantityAvailable || 0,
        isAvailable: variant.availableForSale,
      };
    }) || [];

  return {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    shortDescription:
      shopifyProduct.description?.substring(0, 100) + "..." || "",
    description: shopifyProduct.description,
    image: firstImage?.url || "/images/product-placeholder.svg",
    images:
      shopifyProduct.images?.edges?.map((edge: any) => edge.node.url) || [],
    price: minPrice, // Keep as dollars, not cents
    salePrice: isOnSale ? minPrice : undefined,
    discountPercentage,
    variants: variants.length > 1 ? variants : undefined,
    slug: shopifyProduct.handle,
    category: shopifyProduct.productType || "General",
    brand: shopifyProduct.vendor || "Unknown",
    inStock: shopifyProduct.availableForSale,
    isOnSale,
    inventory: shopifyProduct.totalInventory || 0,
  };
}
