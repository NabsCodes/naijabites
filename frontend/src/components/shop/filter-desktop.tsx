"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ProductFilters } from "@/lib/product-filters";
import { useFilterState } from "@/hooks/use-filter-state";

interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: { min: number; max: number };
  ratings: number[];
}

interface FilterDesktopProps {
  className?: string;
  filterOptions: FilterOptions;
  appliedFilters: ProductFilters;
}

export function FilterDesktop({
  className,
  filterOptions,
  appliedFilters,
}: FilterDesktopProps) {
  const {
    brandSearch,
    setBrandSearch,
    priceRange,
    priceInputs,
    filteredBrands,
    hasActiveFilters,
    updateFilter,
    clearAllFilters,
    handlePriceSliderChange,
    handlePriceInputChange,
    applyPriceFilter,
    getDisplayPrice,
  } = useFilterState(filterOptions, appliedFilters);

  return (
    <div className={cn("w-full rounded-xl border bg-white", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-semibold text-gray-900">Filter</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-green-dark hover:text-green-dark/80"
          >
            Reset
          </button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={["categories", "brands", "price", "sale", "ratings"]}
        className="w-full"
      >
        <Separator className="w-full" />

        {/* Categories - Hide on category pages */}
        {filterOptions.categories.length > 0 && (
          <AccordionItem value="categories" className="px-4">
            <AccordionTrigger className="text-lg font-semibold">
              Categories
            </AccordionTrigger>
            <AccordionContent className="overflow-visible px-1 pt-1">
              <div className="max-h-64 space-y-3 overflow-y-auto">
                {filterOptions.categories.map((category) => (
                  <div key={category} className="flex items-center space-x-3">
                    <Checkbox
                      id={category}
                      checked={appliedFilters.category === category}
                      onCheckedChange={(checked) =>
                        updateFilter({
                          category: checked ? category : undefined,
                        })
                      }
                      className="rounded-full data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                    />
                    <Label
                      htmlFor={category}
                      className="flex-1 cursor-pointer text-sm"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Brands */}
        <AccordionItem value="brands" className="px-4">
          <AccordionTrigger className="text-lg font-semibold">
            Brands
          </AccordionTrigger>
          <AccordionContent className="overflow-visible p-1">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search brands"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Brands List */}
              <div className="max-h-64 space-y-3 overflow-y-auto">
                {filteredBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-3 pb-2">
                    <Checkbox
                      id={brand}
                      checked={appliedFilters.brand === brand}
                      onCheckedChange={(checked) =>
                        updateFilter({ brand: checked ? brand : undefined })
                      }
                      className="data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                    />
                    <Label htmlFor={brand} className="cursor-pointer text-sm">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price" className="px-4">
          <AccordionTrigger className="pb-2 text-lg font-semibold">
            Price
          </AccordionTrigger>
          <AccordionContent className="overflow-visible px-1 pt-4">
            <div className="space-y-4">
              {/* Price Range Slider */}
              <Slider
                value={priceRange}
                onValueChange={handlePriceSliderChange}
                max={filterOptions.priceRange.max}
                min={filterOptions.priceRange.min}
                step={100}
                className="w-full [&>span:first-child]:bg-green-dark/90"
              />

              {/* Price Input Fields */}
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceInputs.min}
                  onChange={(e) =>
                    handlePriceInputChange("min", e.target.value)
                  }
                  className="text-sm"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceInputs.max}
                  onChange={(e) =>
                    handlePriceInputChange("max", e.target.value)
                  }
                  className="text-sm"
                />
              </div>

              {/* Price Display */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{getDisplayPrice(priceRange[0], "min")}</span>
                <span>{getDisplayPrice(priceRange[1], "max")}</span>
              </div>

              {/* Apply Button */}
              <Button
                onClick={applyPriceFilter}
                className="w-full bg-green-dark transition-all duration-300 hover:bg-green-dark/90"
              >
                Apply
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* On Sale */}
        <AccordionItem value="sale" className="px-4">
          <AccordionTrigger className="text-lg font-semibold">
            Special Offers
          </AccordionTrigger>
          <AccordionContent className="overflow-visible px-1 pt-1">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="on-sale"
                checked={appliedFilters.onSale === true}
                onCheckedChange={(checked) =>
                  updateFilter({ onSale: checked ? true : undefined })
                }
                className="data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
              />
              <Label htmlFor="on-sale" className="cursor-pointer text-sm">
                Show items on sale only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Ratings */}
        <AccordionItem value="ratings" className="border-b-0 px-4">
          <AccordionTrigger className="text-lg font-semibold">
            Ratings
          </AccordionTrigger>
          <AccordionContent className="overflow-visible px-1 pt-1">
            <RadioGroup
              value={appliedFilters.rating?.toString() || ""}
              onValueChange={(value) =>
                updateFilter({ rating: value ? Number(value) : undefined })
              }
            >
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <RadioGroupItem
                      value={rating.toString()}
                      id={`rating-${rating}`}
                      className="border-gray-300 focus:ring-green-dark data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <Rating rating={rating} variant="compact" size={14} />
                      <span>and above</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
