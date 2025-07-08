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
import { categories } from "@/lib/mock-data/categories";
import { brands } from "@/lib/mock-data/brands";
import { cn, formatPrice } from "@/lib/utils";
import { Input } from "../ui/input";

export function FilterMobile() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedDiscount, setSelectedDiscount] = useState<string>("");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase()),
  );

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedDiscount ||
    showInStockOnly ||
    selectedRating ||
    priceRange[0] > 0 ||
    priceRange[1] < 100000;

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 100000]);
    setSelectedDiscount("");
    setShowInStockOnly(false);
    setSelectedRating("");
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId),
      );
    }
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId]);
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId));
    }
  };

  const handleApply = () => {
    // TODO: Apply filters logic here
    console.log("Applied filters:", {
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange,
      discount: selectedDiscount,
      inStockOnly: showInStockOnly,
      rating: selectedRating,
    });
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
                  {selectedCategories.length +
                    selectedBrands.length +
                    (selectedRating ? 1 : 0) +
                    (selectedDiscount ? 1 : 0) +
                    (priceRange[0] > 0 || priceRange[1] < 100000 ? 1 : 0)}
                </div>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-full p-0 sm:max-w-md">
            <div className="flex h-full flex-col">
              {/* Header */}
              <SheetHeader className="flex flex-row items-center justify-between border-b px-4 py-2">
                <SheetTitle className="text-left text-lg font-semibold">
                  Filter Products
                </SheetTitle>
                <SheetClose asChild>
                  <button
                    className="inline-flex items-center justify-center p-0"
                    aria-label="Close filter panel"
                  >
                    <X className="text-gray-600" aria-hidden="true" />
                  </button>
                </SheetClose>
              </SheetHeader>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto">
                <Accordion
                  type="multiple"
                  defaultValue={["categories", "brands", "price"]}
                  className="w-full"
                >
                  {/* Categories */}
                  <AccordionItem value="categories" className="px-4">
                    <AccordionTrigger className="py-6 text-lg font-semibold">
                      Categories
                    </AccordionTrigger>
                    <AccordionContent className="overflow-visible">
                      <div className="space-y-4">
                        {categories
                          .filter((cat) => cat.id !== "all-products")
                          .map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center space-x-3"
                            >
                              <Checkbox
                                id={`mobile-${category.id}`}
                                checked={selectedCategories.includes(
                                  category.id,
                                )}
                                onCheckedChange={(checked) =>
                                  handleCategoryChange(
                                    category.id,
                                    checked as boolean,
                                  )
                                }
                                className="h-5 w-5 rounded-full data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                              />
                              <Label
                                htmlFor={`mobile-${category.id}`}
                                className="flex-1 cursor-pointer py-2 text-base"
                              >
                                {category.name}
                              </Label>
                            </div>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Brands */}
                  <AccordionItem value="brands" className="px-4">
                    <AccordionTrigger className="py-6 text-lg font-semibold">
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
                            <div
                              key={brand.id}
                              className="flex items-center space-x-3"
                            >
                              <Checkbox
                                id={`mobile-${brand.id}`}
                                checked={selectedBrands.includes(brand.id)}
                                onCheckedChange={(checked) =>
                                  handleBrandChange(
                                    brand.id,
                                    checked as boolean,
                                  )
                                }
                                className="h-5 w-5 data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                              />
                              <Label
                                htmlFor={`mobile-${brand.id}`}
                                className="cursor-pointer py-2 text-base"
                              >
                                {brand.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Price */}
                  <AccordionItem value="price" className="px-4">
                    <AccordionTrigger className="py-6 text-lg font-semibold">
                      Price Range
                    </AccordionTrigger>
                    <AccordionContent className="overflow-visible px-1 pt-2">
                      <div className="space-y-6">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={100000}
                          min={0}
                          step={1000}
                          className="w-full [&>span:first-child]:bg-green-dark"
                        />
                        <div className="flex items-center justify-between text-base text-gray-600">
                          <span>{formatPrice(priceRange[0])}</span>
                          <span>{formatPrice(priceRange[1])}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Discounts */}
                  <AccordionItem value="discounts" className="px-4">
                    <AccordionTrigger className="py-6 text-lg font-semibold">
                      Discounts
                    </AccordionTrigger>
                    <AccordionContent className="overflow-visible">
                      <RadioGroup
                        value={selectedDiscount}
                        onValueChange={setSelectedDiscount}
                      >
                        <div className="space-y-4">
                          {[
                            { value: "10", label: "10% and above" },
                            { value: "20", label: "20% and above" },
                            { value: "30", label: "30% and above" },
                            { value: "50", label: "50% and above" },
                            { value: "bogo", label: "Buy 1 Get 1 Free" },
                          ].map((discount) => (
                            <div
                              key={discount.value}
                              className="flex items-center space-x-3"
                            >
                              <RadioGroupItem
                                value={discount.value}
                                id={`mobile-discount-${discount.value}`}
                                className="h-5 w-5 border-gray-300 focus:ring-green-dark data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                              />
                              <Label
                                htmlFor={`mobile-discount-${discount.value}`}
                                className="cursor-pointer py-2 text-base"
                              >
                                {discount.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Stock */}
                  <AccordionItem value="stock" className="px-4">
                    <AccordionTrigger className="py-6 text-lg font-semibold">
                      Availability
                    </AccordionTrigger>
                    <AccordionContent className="overflow-visible">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="mobile-in-stock"
                          checked={showInStockOnly}
                          onCheckedChange={(checked) =>
                            setShowInStockOnly(checked as boolean)
                          }
                          className="h-5 w-5 data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                        />
                        <Label
                          htmlFor="mobile-in-stock"
                          className="cursor-pointer py-2 text-base"
                        >
                          Show in-stock items only
                        </Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Ratings */}
                  <AccordionItem value="ratings" className="border-b-0 px-4">
                    <AccordionTrigger className="py-6 text-lg font-semibold">
                      Customer Ratings
                    </AccordionTrigger>
                    <AccordionContent className="overflow-visible">
                      <RadioGroup
                        value={selectedRating}
                        onValueChange={setSelectedRating}
                      >
                        <div className="space-y-4">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div
                              key={rating}
                              className="flex items-center space-x-3"
                            >
                              <RadioGroupItem
                                value={rating.toString()}
                                id={`mobile-rating-${rating}`}
                                className="h-5 w-5 border-gray-300 focus:ring-green-dark data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                              />
                              <Label
                                htmlFor={`mobile-rating-${rating}`}
                                className="flex cursor-pointer items-center gap-2 py-2 text-base"
                              >
                                <Rating
                                  rating={rating}
                                  variant="compact"
                                  size={16}
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

              {/* Footer */}
              <div className="border-t bg-white p-4">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={clearAllFilters}
                    className="h-10 flex-1 text-base transition-all duration-300 hover:bg-gray-100"
                    disabled={!hasActiveFilters}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleApply}
                    className="h-10 flex-1 bg-green-dark text-base transition-all duration-300 hover:bg-green-dark/90"
                  >
                    Show Results
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
