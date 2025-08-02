import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { Testimonial } from "@/lib/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className = "",
}: TestimonialCardProps) {
  return (
    <div
      className={`flex flex-col justify-between gap-4 rounded-2xl border border-solid border-[#e7ebd2] bg-[#f5f8e1] px-4 py-6 ${className}`}
    >
      {/* Rating */}
      <div className="flex items-center gap-2">
        <Rating
          rating={testimonial.rating}
          variant="gray"
          size={16}
          showCount={false}
        />
      </div>

      {/* Comment */}
      <p className="text-base font-normal text-gray-900 md:text-lg">
        "{testimonial.comment}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-2">
        <Avatar className="h-7 w-7">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback className="bg-[#ff7733] text-xs text-white">
            {testimonial.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-normal text-black">
          – {testimonial.name}, {testimonial.location}
        </span>
      </div>
    </div>
  );
}
