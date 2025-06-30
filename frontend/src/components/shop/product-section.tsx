"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { EmptySection } from "./empty-section";

interface ProductSectionProps {
  title: string;
  description?: string;
  products: Product[];
  viewAllLink: string;
  className?: string;
}

export function ProductSection({
  title,
  description,
  products,
  viewAllLink,
  className,
}: ProductSectionProps) {
  // Show max 8 products in section preview
  const displayProducts = products.slice(0, 8);

  // Early return for empty state
  if (products.length === 0) {
    return (
      <section className={className}>
        <div className="container-padding">
          <div className="section-container">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {title}
              </h2>
              {description && (
                <p className="mt-2 text-gray-600">{description}</p>
              )}
            </div>
            <EmptySection />
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container-padding">
        <div className="section-container">
          {/* Section Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {title}
              </h2>
              {description && (
                <p className="mt-2 text-gray-600">{description}</p>
              )}
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href={viewAllLink} className="flex items-center gap-2">
                View All Items
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Products Grid/Scroll */}
          <div className="relative">
            {/* Desktop: Grid Layout */}
            <div className="hidden grid-cols-2 gap-4 sm:grid md:grid-cols-3 lg:grid-cols-4">
              {displayProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* Mobile: Simple Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto pb-4 sm:hidden">
              {displayProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  className="w-[280px] flex-shrink-0"
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile View All Button */}
          <motion.div
            className="mt-6 sm:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Button
              asChild
              className="w-full bg-green-deep transition-all duration-300 hover:bg-green-deep/90"
            >
              <Link href={viewAllLink}>View All Items</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
