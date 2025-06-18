"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  SortAsc,
  Grid,
  List,
  Star,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/lib/mock-data/products";
import { categories } from "@/lib/mock-data/categories";
import { brands } from "@/lib/mock-data/brands";
import Image from "next/image";

type SortOption =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "newest"
  | "popularity";
type ViewMode = "grid" | "list";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showOnSaleOnly, setShowOnSaleOnly] = useState(false);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });

  const itemsPerPage = 12;

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || product.category.id === selectedCategory;

      // Brand filter
      const matchesBrand =
        selectedBrand === "all" || product.brand === selectedBrand;

      // Price filter
      const price = product.salePrice || product.basePrice;
      const matchesPrice = price >= priceRange.min && price <= priceRange.max;

      // On sale filter
      const matchesOnSale = !showOnSaleOnly || product.isOnSale;

      // In stock filter
      const matchesInStock = !showInStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesOnSale &&
        matchesInStock
      );
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return (a.salePrice || a.basePrice) - (b.salePrice || b.basePrice);
        case "price_desc":
          return (b.salePrice || b.basePrice) - (a.salePrice || a.basePrice);
        case "rating":
          return b.rating.average - a.rating.average;
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "popularity":
          return b.rating.count - a.rating.count;
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    sortBy,
    priceRange,
    showOnSaleOnly,
    showInStockOnly,
  ]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSortBy("relevance");
    setShowOnSaleOnly(false);
    setShowInStockOnly(false);
    setPriceRange({ min: 0, max: 1000 });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="border-b bg-white">
        <div className="container-padding py-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="mb-2 text-h1 font-bold text-gray-900">
                  All Products
                </h1>
                <p className="text-lg text-gray-600">
                  Discover our complete range of authentic Nigerian groceries
                </p>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col gap-4 sm:flex-row lg:w-full lg:max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="whitespace-nowrap">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Sort Bar */}
      <section className="border-b bg-white">
        <div className="container-padding py-4">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.name}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="onSale"
                    checked={showOnSaleOnly}
                    onChange={(e) => setShowOnSaleOnly(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="onSale" className="text-sm text-gray-700">
                    On Sale
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={showInStockOnly}
                    onChange={(e) => setShowInStockOnly(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="inStock" className="text-sm text-gray-700">
                    In Stock
                  </label>
                </div>

                {(searchTerm ||
                  selectedCategory !== "all" ||
                  selectedBrand !== "all" ||
                  showOnSaleOnly ||
                  showInStockOnly) && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4 text-gray-500" />
                  <Select
                    value={sortBy}
                    onValueChange={(value: SortOption) => setSortBy(value)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price_asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price_desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="popularity">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex rounded-lg border">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="border-b bg-gray-50">
        <div className="container-padding py-3">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm text-gray-600">
              Showing {paginatedProducts.length} of{" "}
              {filteredAndSortedProducts.length} products
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="section-spacing">
        <div className="container-padding">
          <div className="mx-auto max-w-7xl">
            {paginatedProducts.length > 0 ? (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {paginatedProducts.map((product) => (
                      <Card key={product.id} className="product-card group">
                        <Link href={`/products/${product.slug}`}>
                          <div className="relative">
                            <Image
                              src={
                                product.images[0]?.url ||
                                "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80"
                              }
                              alt={product.name}
                              width={500}
                              height={500}
                              className="product-card-image"
                            />
                            {product.isOnSale && product.discountPercentage && (
                              <div className="product-discount-badge">
                                -{product.discountPercentage}%
                              </div>
                            )}
                            <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 bg-white/80 p-0 hover:bg-white"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Link>
                        <CardContent className="p-4">
                          <Link href={`/products/${product.slug}`}>
                            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors hover:text-green-dark">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                            {product.shortDescription}
                          </p>

                          <div className="mb-3 flex items-center gap-2">
                            <div className="rating-stars">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating.average)
                                      ? "rating-star fill-current"
                                      : "rating-star-empty"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              ({product.rating.count})
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <div className="product-price">
                                ${product.salePrice || product.basePrice}
                              </div>
                              {product.salePrice && (
                                <div className="product-price-sale">
                                  ${product.basePrice}
                                </div>
                              )}
                            </div>
                            <Button
                              size="sm"
                              className="bg-green-dark hover:bg-green-deep"
                              disabled={!product.inStock}
                            >
                              <ShoppingCart className="mr-1 h-4 w-4" />
                              {product.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {paginatedProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative h-48 w-full sm:h-auto sm:w-64">
                              <Link href={`/products/${product.slug}`}>
                                <Image
                                  src={
                                    product.images[0]?.url ||
                                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80"
                                  }
                                  width={500}
                                  height={500}
                                  alt={product.name}
                                  className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                                />
                              </Link>
                              {product.isOnSale &&
                                product.discountPercentage && (
                                  <div className="product-discount-badge absolute left-3 top-3">
                                    -{product.discountPercentage}%
                                  </div>
                                )}
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex h-full flex-col sm:flex-row sm:justify-between">
                                <div className="flex-1">
                                  <Link href={`/products/${product.slug}`}>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors hover:text-green-dark">
                                      {product.name}
                                    </h3>
                                  </Link>
                                  <p className="mb-4 line-clamp-3 text-gray-600">
                                    {product.description}
                                  </p>
                                  <div className="mb-4 flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <div className="rating-stars">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                              i <
                                              Math.floor(product.rating.average)
                                                ? "rating-star fill-current"
                                                : "rating-star-empty"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm text-gray-600">
                                        ({product.rating.count} reviews)
                                      </span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      Brand: {product.brand}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col justify-between sm:ml-6 sm:items-end">
                                  <div className="mb-4">
                                    <div className="text-2xl font-bold text-gray-900">
                                      ${product.salePrice || product.basePrice}
                                    </div>
                                    {product.salePrice && (
                                      <div className="text-lg text-gray-500 line-through">
                                        ${product.basePrice}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <Button
                                      className="bg-green-dark hover:bg-green-deep"
                                      disabled={!product.inStock}
                                    >
                                      <ShoppingCart className="mr-2 h-4 w-4" />
                                      {product.inStock
                                        ? "Add to Cart"
                                        : "Out of Stock"}
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Heart className="mr-2 h-4 w-4" />
                                      Save for Later
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const page = i + 1;
                        return (
                          <Button
                            key={page}
                            variant={
                              currentPage === page ? "default" : "outline"
                            }
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        );
                      })}
                      {totalPages > 5 && <span className="px-2">...</span>}
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1),
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="py-16 text-center">
                <div className="mb-4 text-6xl">🛒</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  No products found
                </h3>
                <p className="mb-6 text-gray-600">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
