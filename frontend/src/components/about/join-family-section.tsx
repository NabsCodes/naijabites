import Image from "next/image";
import Link from "next/link";

export const JoinFamilySection = () => {
  return (
    <section
      style={{ backgroundImage: "url('/images/testimonial-bg.webp')" }}
      className="container-padding relative overflow-hidden bg-cover bg-center bg-no-repeat py-10 lg:py-20"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 gap-8 rounded-3xl bg-white p-6 sm:p-8 md:grid-cols-2 md:gap-12">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="relative h-[450px] w-full md:h-[370px]">
              <Image
                src="/images/testimonial-image.webp"
                alt="Happy customer shopping for groceries"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 50vw"
                priority
                quality={95}
                className="rounded-3xl object-cover object-center"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex max-w-lg flex-col justify-center space-y-8">
            <div className="flex flex-col space-y-4">
              <h2 className="text-3xl font-semibold leading-tight text-green-deep md:text-4xl">
                Join the Naijabites Family !
              </h2>
              <p className="text-base font-normal leading-relaxed text-gray-900 lg:text-lg">
                Discover how easy and affordable it is to get authentic Nigerian
                food brands delivered to your home in Canada. Shop now and enjoy
                a seamless shopping experience with fast delivery, trusted
                products, and unbeatable prices.
              </p>
            </div>
            <Link
              href="/categories"
              className="flex w-fit items-center gap-2 rounded-lg bg-green-deep px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-green-deep/90"
            >
              Start Shopping Today !
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
