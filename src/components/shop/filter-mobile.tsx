"use client";

import { useState } from "react";
import { Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Rating } from "@/components/ui/rating";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ProductFilters } from "@/lib/product-filters";
import { useFilterState } from "@/hooks/use-filter-state";

interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: { min: number; max: number };
  ratings: number[];
  sortOptions: { value: string; label: string }[];
}

interface FilterMobileProps {
  filterOptions: FilterOptions;
  appliedFilters: ProductFilters;
}

export function FilterMobile({
  filterOptions,
  appliedFilters,
}: FilterMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    brandSearch,
    setBrandSearch,
    priceRange,
    priceInputs,
    filteredBrands,
    hasActiveFilters,
    activeFilterCount,
    updateFilter,
    clearAllFilters,
    handlePriceSliderChange,
    handlePriceInputChange,
    applyPriceFilter,
    getDisplayPrice,
  } = useFilterState(filterOptions, appliedFilters);

  // Quick filter update that closes sheet immediately (for single-choice filters)
  const updateAndClose = (newFilters: Partial<ProductFilters>) => {
    updateFilter(newFilters);
    setIsOpen(false);
  };

  // Mobile-specific clear that closes sheet
  const clearAllFiltersMobile = () => {
    clearAllFilters();
    setIsOpen(false);
  };

  // Apply price and close sheet
  const applyPriceAndClose = () => {
    applyPriceFilter();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Filter Button */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className={cn(
                "h-14 w-14 rounded-full bg-green-dark shadow-lg hover:bg-green-dark/90",
                hasActiveFilters && "relative",
              )}
            >
              <Filter className="h-6 w-6 text-white" />
              {hasActiveFilters && (
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {activeFilterCount}
                </div>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full p-0 sm:max-w-md">
            <div className="flex h-full flex-col">
              {/* Header */}
              <SheetHeader className="flex flex-row items-center justify-between border-b px-4 py-3">
                <SheetTitle className="text-left text-lg font-semibold">
                  Filter Products
                </SheetTitle>
                <SheetClose asChild>
                  <button
                    className="inline-flex items-center justify-center p-1"
                    aria-label="Close filter panel"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </SheetClose>
              </SheetHeader>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto">
                <Accordion
                  type="multiple"
                  defaultValue={[
                    "categories",
                    "brands",
                    "price",
                    "sale",
                    "ratings",
                  ]}
                  className="w-full"
                >
                  {/* Categories - Hide on category pages */}
                  {filterOptions.categories.length > 0 && (
                    <AccordionItem value="categories" className="px-4">
                      <AccordionTrigger className="py-4 text-base font-semibold">
                        Categories
                      </AccordionTrigger>
                      <AccordionContent className="overflow-visible">
                        <div className="max-h-48 space-y-3 overflow-y-auto py-2">
                          {filterOptions.categories.map((category) => (
                            <div
                              key={category}
                              className="flex items-center space-x-3"
                            >
                              <Checkbox
                                id={`mobile-${category}`}
                                checked={appliedFilters.category === category}
                                onCheckedChange={(checked) =>
                                  updateAndClose({
                                    category: checked ? category : undefined,
                                  })
                                }
                                className="h-5 w-5 rounded-full data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                              />
                              <Label
                                htmlFor={`mobile-${category}`}
                                className="flex-1 cursor-pointer py-1 text-sm"
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
                    <AccordionTrigger className="py-4 text-base font-semibold">
                      Brands
                    </AccordionTrigger>
                    <AccordionContent className="overflow-visible">
                      <div className="space-y-3 py-2">
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
                        <div className="max-h-48 space-y-3 overflow-y-auto">
                          {filteredBrands.map((brand) => (
                            <div
                              key={brand}
                              className="flex items-center space-x-3"
                            >
                              <Checkbox
                                id={`mobile-${brand}`}
                                checked={appliedFilters.brand === brand}
                                onCheckedChange={(checked) =>
                                  updateAndClose({
                                    brand: checked ? brand : undefined,
                                  })
                                }
                                className="h-5 w-5 data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                              />
                              <Label
                                htmlFor={`mobile-${brand}`}
                                className="cursor-pointer py-1 text-sm"
                              >
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
                    <AccordionTrigger className="py-4 text-base font-semibold">
                      Price
                    </AccordionTrigger>
                    <AccordionContent className="overflow-visible">
                      <div className="space-y-4 py-2">
                        {/* Price Range Slider */}
                        <Slider
                          value={priceRange}
                          onValueChange={handlePriceSliderChange}
                          max={filterOptions.priceRange.max}
                          min={filterOptions.priceRange.min}
                          step={100}
                          className="w-full [&>span:first-child]:bg-green-dark"
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
                          onClick={applyPriceAndClose}
                          className="w-full bg-green-dark hover:bg-green-dark/90"
                        >
                          Apply
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Special Offers */}
                  <AccordionItem value="sale" className="px-4">
                    <AccordionTrigger className="py-4 text-base font-semibold">
                      Special Offers
                    </AccordionTrigger>
                    <AccordionContent className="overflow-visible">
                      <div className="py-2">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id="mobile-on-sale"
                            checked={appliedFilters.onSale === true}
                            onCheckedChange={(checked) =>
                              updateAndClose({
                                onSale: checked ? true : undefined,
                              })
                            }
                            className="h-5 w-5 data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                          />
                          <Label
                            htmlFor="mobile-on-sale"
                            className="cursor-pointer text-sm"
                          >
                            Show items on sale only
                          </Label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Ratings - Single choice, close immediately */}
                  <AccordionItem value="ratings" className="border-b-0 px-4">
                    <AccordionTrigger className="py-4 text-base font-semibold">
                      Ratings
                    </AccordionTrigger>
                    <AccordionContent className="overflow-visible">
                      <RadioGroup
                        value={appliedFilters.rating?.toString() || ""}
                        onValueChange={(value) =>
                          updateAndClose({
                            rating: value ? Number(value) : undefined,
                          })
                        }
                        className="py-2"
                      >
                        <div className="space-y-3">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div
                              key={rating}
                              className="flex items-center space-x-3"
                            >
                              <RadioGroupItem
                                value={rating.toString()}
                                id={`mobile-rating-${rating}`}
                                className="border-gray-300 focus:ring-green-dark data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                              />
                              <Label
                                htmlFor={`mobile-rating-${rating}`}
                                className="flex cursor-pointer items-center gap-2 text-sm"
                              >
                                <Rating
                                  rating={rating}
                                  variant="compact"
                                  size={14}
                                />
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

              {/* Bottom Action Bar */}
              {hasActiveFilters && (
                <div className="border-t bg-white p-4">
                  <Button
                    onClick={clearAllFiltersMobile}
                    variant="outline"
                    className="w-full border-green-dark text-green-dark hover:bg-green-dark hover:text-white"
                  >
                    Reset All Filters
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
