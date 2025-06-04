"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locations } from "@/lib/mock-data/locations";
import { categories } from "@/lib/mock-data/categories";
import logo from "../../../public/images/logo.svg";
import homeIcon from "../../../public/icons/home-icon.svg";
import shopIcon from "../../../public/icons/shop-icon.svg";
import aboutIcon from "../../../public/icons/about-us-icon.svg";
import contactIcon from "../../../public/icons/contact-us-icon.svg";
import cartIcon from "../../../public/icons/cart-icon.svg";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof locations)[0] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemsCount] = useState(3); // Mock cart count

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-green-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-8">
          {/* Column 1: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={logo}
                alt="NaijaBites"
                width={135}
                height={64}
                priority
              />
            </Link>
          </div>

          {/* Column 2: Search Bar + Navigation (Grouped, Same Width) */}
          <div className="mx-auto flex w-full flex-col gap-4">
            {/* Search Bar - Reduced Height */}
            <form
              onSubmit={handleSearch}
              className="flex w-full overflow-hidden rounded-lg bg-white shadow-md"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex h-10 min-w-[180px] items-center gap-2 rounded-none border-0 border-r border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="truncate text-sm">
                      {selectedLocation
                        ? `${selectedLocation.city}, ${selectedLocation.province}`
                        : "Select location"}
                    </span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="max-h-[400px] w-[300px] overflow-y-auto border-0 shadow-xl"
                >
                  {locations.map((location) => (
                    <DropdownMenuItem
                      key={location.id}
                      onClick={() => setSelectedLocation(location)}
                      className={`flex cursor-pointer flex-col items-start p-4 hover:bg-green-50 ${
                        selectedLocation?.id === location.id
                          ? "bg-green-50"
                          : ""
                      }`}
                    >
                      <div className="font-semibold text-gray-900">
                        {location.city}
                      </div>
                      <div className="text-xs text-gray-500">
                        {location.province} • ${location.deliveryFee} delivery
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex flex-1">
                <Input
                  type="text"
                  placeholder="search for items"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 flex-1 rounded-none border-0 bg-white px-4 text-sm text-gray-700 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  className="h-10 rounded-none border-0 bg-lemon-dark px-8 text-sm font-semibold text-white shadow-none transition-all duration-300 hover:bg-lemon-dark/80"
                >
                  <Search className="mr-2 h-4 w-4" />
                  search
                </Button>
              </div>
            </form>

            {/* Navigation Links - Simple Active States */}
            <nav className="flex items-center justify-between gap-12">
              <Link
                href="/"
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  pathname === "/"
                    ? "text-lemon-light"
                    : "text-white hover:text-lemon-light"
                }`}
              >
                <Image
                  src={homeIcon}
                  alt="Home"
                  width={18}
                  height={18}
                  className="invert"
                />
                Home
              </Link>
              <Link
                href="/shop"
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  pathname === "/shop"
                    ? "text-lemon-light"
                    : "text-white hover:text-lemon-light"
                }`}
              >
                <Image
                  src={shopIcon}
                  alt="Shop"
                  width={18}
                  height={18}
                  className="invert"
                />
                Shop
              </Link>
              <Link
                href="/about"
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  pathname === "/about"
                    ? "text-lemon-light"
                    : "text-white hover:text-lemon-light"
                }`}
              >
                <Image
                  src={aboutIcon}
                  alt="About Us"
                  width={18}
                  height={18}
                  className="invert"
                />
                About Us
              </Link>
              <Link
                href="/contact"
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  pathname === "/contact"
                    ? "text-lemon-light"
                    : "text-white hover:text-lemon-light"
                }`}
              >
                <Image
                  src={contactIcon}
                  alt="Contact Us"
                  width={18}
                  height={18}
                  className="invert"
                />
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Column 3: User Actions */}
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative">
              <Button
                variant="outline"
                className="relative h-10 rounded-md border-none bg-transparent px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10"
              >
                <div className="relative flex items-center gap-2">
                  <div className="relative">
                    <Image
                      src={cartIcon}
                      alt="Cart"
                      width={18}
                      height={18}
                      className="invert"
                    />
                    {cartItemsCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-orange-dark p-0 text-xs hover:bg-orange-dark"
                      >
                        {cartItemsCount}
                      </Badge>
                    )}
                  </div>
                  <span>Cart</span>
                </div>
              </Button>
            </Link>

            <Button className="h-10 rounded-md bg-lemon-dark px-6 py-2 text-sm font-semibold text-green-dark shadow-md transition-all duration-200 hover:bg-lemon-dark/90">
              Register
            </Button>

            <Button
              variant="outline"
              className="duration-20 h-10 rounded-md border-2 border-white bg-transparent px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-green-deep"
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
