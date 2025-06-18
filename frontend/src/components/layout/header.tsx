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
  Home,
  Store,
  Info,
  Phone,
  ChevronRight,
  Settings,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { locations } from "@/lib/mock-data/locations";
// import { categories } from "@/lib/mock-data/categories";
import {
  HomeIcon,
  ShopIcon,
  CartIcon,
  AboutIcon,
  ContactIcon,
  LogoIcon,
} from "@/components/icons";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof locations)[0] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemsCount] = useState(3); // Mock cart count
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-green-deep/80 bg-green-deep text-white">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="container-padding">
          <div className="page-container py-4 lg:py-6">
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:gap-8">
              {/* Logo Section */}
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0">
                  <LogoIcon
                    width={115}
                    height={64}
                    // className="h-12 w-auto text-white lg:h-16"
                  />
                </Link>
              </div>

              {/* Center Section: Search Bar + Navigation (Grouped) */}
              <div className="flex w-full flex-col gap-4">
                {/* Search Bar */}
                <form
                  onSubmit={handleSearch}
                  className="mx-auto flex w-full overflow-hidden rounded-lg bg-white shadow-md"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex min-w-[120px] items-center gap-2 rounded-none border-0 border-r border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span className="truncate text-sm">
                          {selectedLocation ? (
                            `${selectedLocation.city}, ${selectedLocation.province}`
                          ) : (
                            <>
                              <span className="lg:hidden">Location</span>
                              <span className="hidden lg:inline">
                                Select location
                              </span>
                            </>
                          )}
                        </span>
                        {isMenuOpen ? (
                          <ChevronUp className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="max-h-[400px] w-full overflow-y-auto border-0 shadow-xl lg:w-[300px]"
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
                            {location.province} • ${location.deliveryFee}{" "}
                            delivery
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="flex flex-1">
                    <Input
                      type="text"
                      placeholder="Search for items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 rounded-none border-0 bg-white px-4 text-sm text-gray-700 placeholder:text-gray-400 lg:hidden placeholder:lg:hidden"
                    />
                    <Input
                      type="text"
                      placeholder="Search for products, categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="hidden flex-1 rounded-none border-0 bg-white px-4 text-sm text-gray-700 placeholder:text-gray-400 lg:block"
                    />
                    <Button
                      type="submit"
                      className="rounded-none border-0 bg-lemon-dark px-4 text-sm font-semibold text-white shadow-none transition-all duration-300 hover:bg-lemon-dark/80"
                    >
                      <Search className="h-4 w-4" />
                      <span className="hidden lg:inline">Search</span>
                    </Button>
                  </div>
                </form>

                {/* Navigation Links */}
                <nav className="flex items-center justify-between">
                  <Link
                    href="/"
                    className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                      pathname === "/"
                        ? "text-lemon-light"
                        : "text-white hover:text-lemon-light"
                    }`}
                  >
                    <HomeIcon size={18} color="currentColor" />
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
                    <ShopIcon size={18} color="currentColor" />
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
                    <AboutIcon size={18} color="currentColor" />
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
                    <ContactIcon size={18} color="currentColor" />
                    Contact Us
                  </Link>
                </nav>
              </div>

              {/* Right Side: Auth + Cart + Profile */}
              <div className="flex items-center gap-4">
                {/* Auth Buttons or User Profile */}
                {isUserLoggedIn ? (
                  <>
                    {/* Cart */}
                    <Link href="/cart" className="relative">
                      <Button
                        variant="outline"
                        className="relative h-11 rounded-md border-none bg-transparent px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10"
                      >
                        <div className="relative flex items-center gap-2">
                          <div className="relative">
                            <CartIcon size={18} color="currentColor" />
                            {cartItemsCount > 0 && (
                              <Badge
                                variant="destructive"
                                className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center bg-orange-dark p-0 text-xs hover:bg-orange-dark"
                              >
                                {cartItemsCount}
                              </Badge>
                            )}
                          </div>
                          <span className="hidden lg:inline">Cart</span>
                        </div>
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex h-auto items-center gap-2 rounded-full border border-solid border-white bg-white/5 p-1.5 pr-3 transition-colors hover:bg-white/10 focus:bg-white/10 md:gap-3 md:pr-4"
                        >
                          <Avatar className="h-8 w-8 md:h-10 md:w-10">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className="bg-lemon-dark text-xs font-semibold text-green-dark md:text-sm">
                              JD
                            </AvatarFallback>
                          </Avatar>

                          <span className="hidden max-w-[80px] truncate text-xs font-semibold text-white sm:inline md:text-sm lg:max-w-none">
                            Jill Doe
                          </span>

                          <ChevronDown className="h-4 w-4 flex-shrink-0 text-lemon-light md:h-5 md:w-5" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-56 border-0 bg-white shadow-xl"
                      >
                        <div className="border-b border-gray-100 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback className="bg-lemon-dark text-sm font-semibold text-green-dark">
                                JD
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-gray-900">
                                Jill Doe
                              </span>
                              <span className="text-xs text-gray-500">
                                jill.doe@example.com
                              </span>
                            </div>
                          </div>
                        </div>

                        <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-50">
                          <User className="mr-3 h-4 w-4" />
                          <span>My Profile</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-50">
                          <ShoppingCart className="mr-3 h-4 w-4" />
                          <span>My Orders</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-50">
                          <MapPin className="mr-3 h-4 w-4" />
                          <span>Addresses</span>
                        </DropdownMenuItem>

                        <div className="border-t border-gray-100">
                          <DropdownMenuItem
                            className="cursor-pointer p-3 text-red-600 hover:bg-gray-50 focus:text-red-600"
                            onClick={() => setIsUserLoggedIn(false)}
                          >
                            <span>Sign Out</span>
                          </DropdownMenuItem>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    {/* Register Button: Icon on small screens, text on md+ */}
                    <Button className="flex h-11 items-center justify-center rounded-md bg-lemon-dark px-3 py-2 text-sm font-semibold text-green-dark shadow-md transition-all duration-200 hover:bg-lemon-dark/90 md:px-6">
                      <span className="inline">Sign up</span>
                    </Button>

                    {/* Login Button: Icon on small screens, text on md+ */}
                    <Button
                      variant="outline"
                      className="flex h-11 items-center justify-center rounded-md border-2 border-white bg-transparent px-3 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-green-deep md:px-6"
                    >
                      <span className="inline">Log in</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="container-padding">
          {/* Top Row: Menu + Logo + Actions */}
          <div className="py-3">
            <div className="flex items-center justify-between">
              {/* Left: Menu + Logo */}
              <div className="flex items-center gap-3">
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-10 w-10 p-0 text-white hover:bg-white/10"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-80 border-0 bg-gradient-to-b from-green-deep to-green-700 p-0"
                  >
                    {/* Header Section */}
                    <div className="border-b border-green-600/30 bg-green-deep px-6 py-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <LogoIcon
                            width={80}
                            height={38}
                            className="h-8 w-auto text-white"
                          />
                          <div className="text-white">
                            <div className="text-lg font-bold">NaijaBites</div>
                            <div className="text-xs text-lemon-light">
                              Fresh • Authentic • Delivered
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex h-full flex-col">
                      {/* User Section */}
                      <div className="px-6 py-4">
                        {isUserLoggedIn ? (
                          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                            <div className="mb-3 flex items-center gap-3">
                              <Avatar className="h-12 w-12 ring-2 ring-lemon-light/50">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="bg-lemon-dark text-sm font-semibold text-green-dark">
                                  JD
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-base font-semibold text-white">
                                  Jill Doe
                                </span>
                                <span className="text-sm text-lemon-light/80">
                                  jill.doe@example.com
                                </span>
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                variant="ghost"
                                className="h-auto rounded-lg border border-white/20 p-3 text-white hover:bg-white/10"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <div className="flex flex-col items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span className="text-xs">Profile</span>
                                </div>
                              </Button>
                              <Button
                                variant="ghost"
                                className="h-auto rounded-lg border border-white/20 p-3 text-white hover:bg-white/10"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <div className="flex flex-col items-center gap-1">
                                  <ShoppingCart className="h-4 w-4" />
                                  <span className="text-xs">Orders</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-sm">
                            <div className="mb-3">
                              <h3 className="mb-1 font-semibold text-white">
                                Welcome to NaijaBites!
                              </h3>
                              <p className="text-sm text-lemon-light/80">
                                Sign in for the best experience
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Button
                                className="w-full rounded-lg bg-lemon-dark font-semibold text-green-dark hover:bg-lemon-dark/90"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Sign up
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full rounded-lg border-white/30 text-white hover:bg-white/10"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                Log in
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Navigation */}
                      <div className="flex-1 px-6">
                        <nav className="space-y-1">
                          <Link
                            href="/"
                            className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                              pathname === "/"
                                ? "border border-lemon-dark/30 bg-lemon-dark/20 text-lemon-light"
                                : "text-white hover:bg-white/10"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <Home className="h-5 w-5" />
                              Home
                            </div>
                            <ChevronRight className="h-4 w-4 opacity-60" />
                          </Link>
                          <Link
                            href="/shop"
                            className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                              pathname === "/shop"
                                ? "border border-lemon-dark/30 bg-lemon-dark/20 text-lemon-light"
                                : "text-white hover:bg-white/10"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <Store className="h-5 w-5" />
                              Shop
                            </div>
                            <ChevronRight className="h-4 w-4 opacity-60" />
                          </Link>
                          <Link
                            href="/about"
                            className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                              pathname === "/about"
                                ? "border border-lemon-dark/30 bg-lemon-dark/20 text-lemon-light"
                                : "text-white hover:bg-white/10"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <Info className="h-5 w-5" />
                              About Us
                            </div>
                            <ChevronRight className="h-4 w-4 opacity-60" />
                          </Link>
                          <Link
                            href="/contact"
                            className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                              pathname === "/contact"
                                ? "border border-lemon-dark/30 bg-lemon-dark/20 text-lemon-light"
                                : "text-white hover:bg-white/10"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <Phone className="h-5 w-5" />
                              Contact Us
                            </div>
                            <ChevronRight className="h-4 w-4 opacity-60" />
                          </Link>
                        </nav>
                      </div>

                      {/* Account Actions (when logged in) */}
                      {isUserLoggedIn && (
                        <div className="border-t border-white/20 px-6 py-4">
                          <div className="space-y-1">
                            <Button
                              variant="ghost"
                              className="w-full justify-between rounded-xl px-4 py-3 text-left text-white hover:bg-white/10"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5" />
                                <span>My Addresses</span>
                              </div>
                              <ChevronRight className="h-4 w-4 opacity-60" />
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-between rounded-xl px-4 py-3 text-left text-white hover:bg-white/10"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className="flex items-center gap-3">
                                <Settings className="h-5 w-5" />
                                <span>Settings</span>
                              </div>
                              <ChevronRight className="h-4 w-4 opacity-60" />
                            </Button>

                            {/* Sign Out Button */}
                            <div className="pt-2">
                              <Button
                                variant="ghost"
                                className="w-full justify-center rounded-xl border border-red-500/30 px-4 py-3 text-center text-red-300 hover:bg-red-500/20 hover:text-red-200"
                                onClick={() => {
                                  setIsUserLoggedIn(false);
                                  setIsMenuOpen(false);
                                }}
                              >
                                Sign Out
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>

                <Link href="/" className="flex-shrink-0">
                  <LogoIcon
                    width={100}
                    height={48}
                    className="h-10 w-auto text-white"
                  />
                </Link>
              </div>

              {/* Right: Cart + Profile */}
              <div className="flex items-center gap-1">
                {/* Cart */}
                <Link href="/cart" className="relative">
                  <Button
                    variant="ghost"
                    className="h-10 w-10 p-0 text-white hover:bg-white/10"
                  >
                    <div className="relative">
                      <CartIcon size={22} color="currentColor" />
                      {cartItemsCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center bg-orange-dark p-0 text-xs font-bold hover:bg-orange-dark"
                        >
                          {cartItemsCount}
                        </Badge>
                      )}
                    </div>
                  </Button>
                </Link>

                {/* User Profile/Auth */}
                {isUserLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-10 w-10 rounded-full p-0 text-white hover:bg-white/10"
                      >
                        <Avatar className="h-8 w-8 border border-white/30">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback className="bg-lemon-dark text-xs font-semibold text-green-dark">
                            JD
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="mr-2 w-64 overflow-hidden rounded-xl border-0 bg-white shadow-xl"
                    >
                      <div className="bg-gradient-to-r from-green-deep to-green-600 px-4 py-4 text-white">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 ring-2 ring-white/30">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback className="bg-lemon-dark text-sm font-semibold text-green-dark">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-base font-semibold">
                              Jill Doe
                            </span>
                            <span className="text-sm text-lemon-light/90">
                              jill.doe@example.com
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <DropdownMenuItem className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-green-50">
                          <User className="mr-3 h-5 w-5 text-green-600" />
                          <span className="text-base font-medium">
                            My Profile
                          </span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-green-50">
                          <ShoppingCart className="mr-3 h-5 w-5 text-green-600" />
                          <span className="text-base font-medium">
                            My Orders
                          </span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-green-50">
                          <MapPin className="mr-3 h-5 w-5 text-green-600" />
                          <span className="text-base font-medium">
                            Addresses
                          </span>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-green-50">
                          <Settings className="mr-3 h-5 w-5 text-green-600" />
                          <span className="text-base font-medium">
                            Settings
                          </span>
                        </DropdownMenuItem>
                      </div>

                      <div className="border-t border-gray-100 p-2">
                        <DropdownMenuItem
                          className="cursor-pointer rounded-lg p-3 text-red-600 transition-colors hover:bg-red-50 focus:text-red-600"
                          onClick={() => setIsUserLoggedIn(false)}
                        >
                          <span className="text-base font-medium">
                            Sign Out
                          </span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    variant="ghost"
                    className="h-10 w-10 p-0 text-white hover:bg-white/10"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Location + Search */}
          <div className="pb-3">
            <div className="flex items-center gap-2">
              {/* Location Selector - Compact */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex h-10 min-w-[100px] items-center gap-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-medium text-white hover:bg-white/10"
                  >
                    <MapPin className="h-3 w-3 text-lemon-light" />
                    <span className="truncate text-xs">
                      {selectedLocation ? selectedLocation.city : "Location"}
                    </span>
                    <ChevronDown className="ml-auto h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="max-h-[300px] w-72 overflow-y-auto border-0 shadow-xl"
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

              {/* Search Bar - Takes remaining space */}
              <form onSubmit={handleSearch} className="flex-1">
                <div className="flex overflow-hidden rounded-lg bg-white shadow-sm">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 flex-1 rounded-none border-0 bg-white px-3 text-sm text-gray-700 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button
                    type="submit"
                    className="h-10 rounded-none border-0 bg-lemon-dark px-3 text-sm font-semibold text-white shadow-none"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
