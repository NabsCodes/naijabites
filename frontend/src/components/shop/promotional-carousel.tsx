"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { PromotionalBanner } from "@/lib/mock-data/promotions";

interface PromotionalCarouselProps {
  banners: PromotionalBanner[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export function PromotionalCarousel({
  banners,
  autoplay = true,
  autoplayDelay = 5000,
}: PromotionalCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCanScrollPrev] = useState(false);
  const [, setCanScrollNext] = useState(true);

  // Debug: Check if banners are received
  console.log("Carousel received banners:", banners.length, banners);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);

  const plugins = autoplay
    ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })]
    : [];

  if (!banners || banners.length === 0) {
    return (
      <div className="w-full">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-lemon-light to-green-dark/20 p-8 md:p-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                  Amazing Deals Coming Soon!
                </h2>
                <p className="text-lg text-gray-600 md:text-xl">
                  We're preparing incredible offers just for you. Check back
                  soon for unbeatable deals on your favorite Nigerian groceries.
                </p>
                <p className="text-sm text-gray-500">
                  New promotions added weekly!
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="bg-green-deep transition-all duration-300 hover:bg-green-deep/90"
              >
                <Link href="/shop/products">Browse Products</Link>
              </Button>
            </div>

            {/* Placeholder Image  */}
            <div className="hidden items-center justify-center md:flex">
              <div className="relative h-64 w-64 md:h-72 md:w-72 lg:h-80 lg:w-80">
                <Image
                  src="/images/nigerian-groceries.webp"
                  alt="Featured product"
                  fill
                  priority
                  quality={95}
                  className="object-contain"
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1280px) 320px, 384px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={plugins}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <Card className="rounded-3xl shadow-sm">
                <div
                  style={{
                    backgroundImage: "url('/images/banner-bg.webp')",
                  }}
                  className={cn(
                    "relative h-[370px] overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat p-8 md:h-[480px]",
                    banner.backgroundColor,
                    banner.textColor,
                  )}
                >
                  <div className="grid h-full grid-cols-1 items-center gap-8 md:grid-cols-2">
                    {/* Left Side - Content */}
                    <div className="space-y-4 md:space-y-6">
                      <div className="space-y-4">
                        <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl xl:text-6xl">
                          {banner.title}
                        </h2>
                        <p className="text-base text-gray-600 md:text-lg lg:text-2xl">
                          {banner.description}
                        </p>
                        {banner.expiryDate && (
                          <p className="text-sm text-gray-500 md:text-base">
                            Hurry! Offer ends {banner.expiryDate}.
                          </p>
                        )}
                      </div>

                      <Button
                        asChild
                        size="lg"
                        className="bg-green-dark text-white transition-all duration-300 hover:bg-green-dark/90"
                      >
                        <Link href={banner.ctaLink}>{banner.ctaText}</Link>
                      </Button>
                    </div>

                    {/* Right Side - Single Product Image */}
                    <div className="hidden items-center justify-center md:flex">
                      <div className="relative h-64 w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
                        <Image
                          src={banner.productImages}
                          alt="Featured product"
                          fill
                          priority
                          quality={95}
                          className="object-contain"
                          sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, (max-width: 1280px) 320px, 384px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Visual Overlay Navigation - Responsive Safe */}
      <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 transform md:bottom-6">
        <div className="flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                current === index ? "w-6 bg-green-dark" : "bg-gray-300",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
