import { getFeaturedProducts, getProductsOnSale, getAllProductsList, transformShopifyProduct } from './shopify';
import { Product } from '@/types';

// Cache for Shopify products to avoid repeated API calls
let cachedFeaturedProducts: Product[] | null = null;
let cachedSaleProducts: Product[] | null = null;
let cachedAllProducts: Product[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Get featured products from Shopify with caching
export async function getShopifyFeaturedProducts(limit: number = 8): Promise<Product[]> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedFeaturedProducts && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedFeaturedProducts.slice(0, limit);
  }

  try {
    const shopifyProducts = await getFeaturedProducts(limit);
    const transformedProducts = shopifyProducts.map(transformShopifyProduct);
    
    // Update cache
    cachedFeaturedProducts = transformedProducts;
    cacheTimestamp = now;
    
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching Shopify featured products:', error);
    // Return empty array if Shopify fails
    return [];
  }
}

// Get products on sale from Shopify with caching
export async function getShopifySaleProducts(limit: number = 8): Promise<Product[]> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedSaleProducts && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedSaleProducts.slice(0, limit);
  }

  try {
    const shopifyProducts = await getProductsOnSale(limit);
    const transformedProducts = shopifyProducts.map(transformShopifyProduct);
    
    // Update cache
    cachedSaleProducts = transformedProducts;
    cacheTimestamp = now;
    
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching Shopify sale products:', error);
    // Return empty array if Shopify fails
    return [];
  }
}

// Get mixed products for home page (featured + sale products)
export async function getShopifyHomePageProducts(limit: number = 8): Promise<Product[]> {
  try {
    const [featuredProducts, saleProducts] = await Promise.all([
      getShopifyFeaturedProducts(Math.ceil(limit / 2)),
      getShopifySaleProducts(Math.ceil(limit / 2))
    ]);
    console.log('🟢 Featured products:', featuredProducts);
    console.log('🟢 Sale products:', saleProducts); 
    // Combine and shuffle products
    const allProducts = [...featuredProducts, ...saleProducts];
    const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);
    
    return shuffledProducts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching Shopify home page products:', error);
    return [];
  }
}

// Get all products from Shopify with caching (for shop sections)
export async function getShopifyAllProducts(limit: number = 100): Promise<Product[]> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (cachedAllProducts && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedAllProducts.slice(0, limit);
  }

  try {
    const shopifyProducts = await getAllProductsList(limit);
    const transformedProducts = shopifyProducts.map(transformShopifyProduct);
    
    // Update cache
    cachedAllProducts = transformedProducts;
    cacheTimestamp = now;
    
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching Shopify all products:', error);
    // Return empty array if Shopify fails
    return [];
  }
}

// Get product by slug (handle) from Shopify
export async function getShopifyProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { getProductByHandle, transformShopifyProduct } = await import('./shopify');
    const shopifyProduct = await getProductByHandle(slug);
    
    if (!shopifyProduct) {
      return null;
    }
    
    return transformShopifyProduct(shopifyProduct);
  } catch (error) {
    console.error('Error fetching Shopify product by slug:', error);
    return null;
  }
}

// Clear cache (useful for testing or manual refresh)
export function clearShopifyCache() {
  cachedFeaturedProducts = null;
  cachedSaleProducts = null;
  cacheTimestamp = 0;
} 