"use client";

import { useState } from "react";
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
import { categories } from "@/lib/mock-data/categories";
import { brands } from "@/lib/mock-data/brands";
import { cn, formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface FilterDesktopProps {
  className?: string;
}

export function FilterDesktop({ className }: FilterDesktopProps) {
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedDiscount, setSelectedDiscount] = useState<string>("");
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [selectedRating, setSelectedRating] = useState<string>("");

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
    setBrandSearch("");
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
        defaultValue={[
          "categories",
          "brands",
          "price",
          "discounts",
          "stock",
          "ratings",
        ]}
        className="w-full"
      >
        <Separator className="w-full" />
        {/* Categories */}
        <AccordionItem value="categories" className="px-4">
          <AccordionTrigger className="text-lg font-semibold">
            Categories
          </AccordionTrigger>
          <AccordionContent className="overflow-visible px-1 pt-1">
            <div className="space-y-3">
              {categories
                .filter((cat) => cat.id !== "all-products")
                .map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category.id, checked as boolean)
                      }
                      className="rounded-full data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                    />
                    <Label
                      htmlFor={category.id}
                      className="flex-1 cursor-pointer text-sm"
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
                  <div key={brand.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={brand.id}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={(checked) =>
                        handleBrandChange(brand.id, checked as boolean)
                      }
                      className="data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                    />
                    <Label
                      htmlFor={brand.id}
                      className="cursor-pointer text-sm"
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
          <AccordionTrigger className="pb-2 text-lg font-semibold">
            Price
          </AccordionTrigger>
          <AccordionContent className="overflow-visible px-1 pt-4">
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100000}
                min={0}
                step={1000}
                className="w-full [&>span:first-child]:bg-green-dark"
              />
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0] === 0 ? "" : priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([
                      parseInt(e.target.value) || 0,
                      priceRange[1],
                    ])
                  }
                  className="text-sm"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] === 100000 ? "" : priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      parseInt(e.target.value) || 100000,
                    ])
                  }
                  className="text-sm"
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>

              <Button className="w-full bg-green-dark transition-all duration-300 hover:bg-green-dark/90">
                Apply
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Discounts */}
        <AccordionItem value="discounts" className="px-4">
          <AccordionTrigger className="text-lg font-semibold">
            Discounts
          </AccordionTrigger>
          <AccordionContent className="overflow-visible px-1 pt-1">
            <RadioGroup
              value={selectedDiscount}
              onValueChange={setSelectedDiscount}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="10"
                    id="discount-10"
                    className="border-gray-300 focus:ring-green-dark data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor="discount-10"
                    className="cursor-pointer text-sm"
                  >
                    10% and above
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="20"
                    id="discount-20"
                    className="border-gray-300 focus:ring-green-dark data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor="discount-20"
                    className="cursor-pointer text-sm"
                  >
                    20% and above
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="30"
                    id="discount-30"
                    className="border-gray-300 focus:ring-green-dark data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor="discount-30"
                    className="cursor-pointer text-sm"
                  >
                    30% and above
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="50"
                    id="discount-50"
                    className="border-gray-300 focus:ring-green-dark data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor="discount-50"
                    className="cursor-pointer text-sm"
                  >
                    50% and above
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="bogo"
                    id="discount-bogo"
                    className="border-gray-300 focus:ring-green-dark data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
                  />
                  <Label
                    htmlFor="discount-bogo"
                    className="cursor-pointer text-sm"
                  >
                    Buy 1 Get 1 Free
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* Stock Availability */}
        <AccordionItem value="stock" className="px-4">
          <AccordionTrigger className="text-lg font-semibold">
            Stock Availability
          </AccordionTrigger>
          <AccordionContent className="overflow-visible px-1 pt-1">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="in-stock"
                checked={showInStockOnly}
                onCheckedChange={(checked) =>
                  setShowInStockOnly(checked as boolean)
                }
                className="data-[state=checked]:bg-green-dark data-[state=checked]:text-white"
              />
              <Label htmlFor="in-stock" className="cursor-pointer text-sm">
                Show in-stock items only
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
              value={selectedRating}
              onValueChange={setSelectedRating}
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
