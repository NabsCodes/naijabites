"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

interface MarqueeSection {
  variant: "left-image" | "centered";
  heading: string;
  description: string;
  backgroundImage: string;
  className?: string;
}

const marqueeSections: MarqueeSection[] = [
  {
    variant: "left-image",
    heading: "Groceries You Love, Delivered to Your Door",
    description:
      "Get your groceries delivered quickly and at a price that fits your budget.",
    backgroundImage: "/images/marquee-1.webp",
  },
  {
    variant: "centered",
    heading: "Convenience at Your Fingertips, Shopping Made Easy",
    description:
      "Browse, select, and order your favourite Nigerian staples in just a few clicks.",
    className: "text-white",
    backgroundImage: "/images/marquee-2.webp",
  },
  {
    variant: "centered",
    heading: "Your Gateway to Affordable and Fresh Nigerian Groceries",
    description:
      "Enjoy unbeatable prices, fresh food, and fast delivery—all at your convenience.",
    backgroundImage: "/images/marquee-3.webp",
  },
];

interface AuthMarqueeProps {
  className?: string;
}

export function AuthMarquee({ className }: AuthMarqueeProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-label="NaijaBites features carousel"
    >
      <Marquee vertical pauseOnHover className="h-dvh">
        {marqueeSections.map((section, index) => (
          <MarqueeSection key={index} {...section} />
        ))}
      </Marquee>
    </div>
  );
}

function MarqueeSection({
  variant,
  heading,
  description,
  backgroundImage,
  className,
}: MarqueeSection) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-3xl bg-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={heading}
          fill
          className="object-cover"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {variant === "left-image" ? (
          // Left image layout
          <div className="flex w-full max-w-3xl items-center gap-6">
            {/* Image Section */}
            <div className="flex-1">
              <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/grocery.webp"
                  alt="Fresh Nigerian groceries"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="flex-1">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">
                {heading}
              </h2>
              <p className="text-base text-gray-700">{description}</p>
            </div>
          </div>
        ) : (
          // Centered layout
          <div className="mb-20 text-center">
            <h2 className={cn("mb-3 max-w-md text-2xl font-bold", className)}>
              {heading}
            </h2>
            <p
              className={cn(
                "mx-auto max-w-md text-base text-gray-700",
                className,
              )}
            >
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
