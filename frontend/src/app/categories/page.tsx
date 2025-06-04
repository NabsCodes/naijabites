"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/mock-data/categories";
import Image from "next/image";

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="border-b bg-white">
        <div className="container-padding py-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="mb-4 text-h1 font-bold text-gray-900">
                Shop by Category
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
                Discover authentic Nigerian groceries organized by categories.
                From fresh produce to traditional spices, find everything you
                need to create delicious meals.
              </p>

              {/* Search Bar */}
              <div className="relative mx-auto max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-3 pl-10 pr-4 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-spacing">
        <div className="container-padding">
          <div className="mx-auto max-w-7xl">
            {searchTerm && (
              <div className="mb-8">
                <p className="text-gray-600">
                  {filteredCategories.length} categories found for "{searchTerm}
                  "
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => (
                <Card
                  key={category.id}
                  className="group cursor-pointer transition-all duration-200 hover:shadow-lg"
                >
                  <Link href={`/categories/${category.slug}`}>
                    <CardContent className="p-0">
                      {/* Category Image */}
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={
                            category.image ||
                            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80"
                          }
                          alt={category.name}
                          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                          width={400}
                          height={192}
                        />
                        <div className="absolute inset-0 bg-black/20 transition-colors duration-200 group-hover:bg-black/10"></div>
                        <div className="absolute left-4 top-4">
                          <div className="category-icon-large">
                            {category.icon}
                          </div>
                        </div>
                      </div>

                      {/* Category Content */}
                      <div className="p-6">
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-green-dark">
                            {category.name}
                          </h3>
                          <ChevronRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-green-dark" />
                        </div>

                        <p className="mb-4 line-clamp-2 text-gray-600">
                          {category.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {category.productCount} products
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-dark hover:bg-green-50 hover:text-green-deep"
                          >
                            Browse Products
                          </Button>
                        </div>

                        {/* Subcategories Preview */}
                        {category.subcategories &&
                          category.subcategories.length > 0 && (
                            <div className="mt-4 border-t border-gray-100 pt-4">
                              <div className="mb-2 text-sm text-gray-500">
                                Popular subcategories:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {category.subcategories
                                  .slice(0, 3)
                                  .map((subcategory) => (
                                    <span
                                      key={subcategory.id}
                                      className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                    >
                                      {subcategory.name}
                                    </span>
                                  ))}
                                {category.subcategories.length > 3 && (
                                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                                    +{category.subcategories.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <div className="py-16 text-center">
                <div className="mb-4 text-6xl">🔍</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  No categories found
                </h3>
                <p className="mb-6 text-gray-600">
                  Try searching with different keywords or browse all
                  categories.
                </p>
                <Button onClick={() => setSearchTerm("")} variant="outline">
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Categories CTA */}
      <section className="section-spacing bg-white">
        <div className="container-padding">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-4 text-h2 font-bold text-gray-900">
              Can't find what you're looking for?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Browse all our products or get in touch with our customer service
              team for assistance.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-green-dark hover:bg-green-deep"
                asChild
              >
                <Link href="/products">Browse All Products</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
