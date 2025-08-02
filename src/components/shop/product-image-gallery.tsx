"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  className?: string;
}

export function ProductImageGallery({
  images,
  productName,
  className,
}: ProductImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeImage = images[activeImageIndex] || images[0];

  return (
    <div className={cn("", className)}>
      {/* Main Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border bg-[#F9F9F9] shadow-sm">
        <Image
          src={activeImage}
          alt={`${productName} - View ${activeImageIndex + 1}`}
          fill
          className="object-contain p-4 transition-opacity duration-300 sm:p-6 lg:p-8"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 45vw"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={cn(
              "relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-[#F9F9F9] transition-all duration-200",
              activeImageIndex === index
                ? "ring-2 ring-orange-500 ring-offset-1"
                : "hover:ring-2 hover:ring-orange-300 hover:ring-offset-1",
            )}
          >
            <Image
              src={image}
              alt={`${productName} view ${index + 1}`}
              fill
              className="object-contain p-1 sm:p-2"
              sizes="(max-width: 640px) 25vw, (max-width: 1024px) 12vw, 10vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
