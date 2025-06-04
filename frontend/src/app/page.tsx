import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Truck, Shield, Clock, Users } from "lucide-react";
import { featuredCategories } from "@/lib/mock-data/categories";
import { featuredProducts } from "@/lib/mock-data/products";
import Image from "next/image";

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Adaora Okafor",
    location: "Toronto, ON",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    comment:
      "Finally found authentic Nigerian ingredients in Canada! The rice quality is exactly like back home, and delivery is always on time.",
  },
  {
    id: 2,
    name: "Chinedu Nwankwo",
    location: "Vancouver, BC",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    comment:
      "NaijaBites has made cooking Nigerian meals so much easier. Everything arrives fresh and the prices are very reasonable.",
  },
  {
    id: 3,
    name: "Fatima Abdullahi",
    location: "Calgary, AB",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face&auto=format&q=80",
    rating: 5,
    comment:
      "The customer service is excellent and they have brands I can't find anywhere else. Highly recommend for all Nigerians in Canada!",
  },
];

const stats = [
  { label: "Happy Customers", value: "15,000+", icon: Users },
  { label: "Products Available", value: "2,500+", icon: "📦" },
  { label: "Cities Served", value: "50+", icon: "🏙️" },
  { label: "Years of Service", value: "5+", icon: "⏰" },
];

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Free delivery on orders over $75. Same-day delivery available in select cities.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "All products are carefully selected and checked for freshness and authenticity.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Round-the-clock customer support to help with any questions or concerns.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container-padding section-spacing relative">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-display-md font-bold leading-tight lg:text-display-lg">
                    Authentic Nigerian Groceries
                    <span className="block text-lemon-light">
                      Delivered Fresh
                    </span>
                  </h1>
                  <p className="max-w-lg text-xl text-gray-100">
                    Shop the finest selection of Nigerian rice, spices,
                    vegetables, and traditional foods. Bringing the taste of
                    home to your doorstep across Canada.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-orange-dark px-8 py-4 text-lg text-white hover:bg-orange-dark/90"
                    asChild
                  >
                    <Link href="/categories">Shop Now</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white px-8 py-4 text-lg text-green-dark hover:bg-white hover:text-green-dark/80"
                    asChild
                  >
                    <Link href="/recipes">Nigerian Recipes</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">15,000+</div>
                    <div className="text-sm text-gray-200">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2,500+</div>
                    <div className="text-sm text-gray-200">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-gray-200">Cities Served</div>
                  </div>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative z-10">
                  <Image
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=entropy&auto=format&q=80"
                    alt="Fresh Nigerian groceries"
                    className="rounded-2xl shadow-2xl"
                    width={800}
                    height={600}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 h-72 w-72 rounded-full bg-lemon-light/20 blur-3xl"></div>
                <div className="absolute -left-6 -top-6 h-48 w-48 rounded-full bg-orange-dark/20 blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section-spacing bg-gray-50">
        <div className="container-padding">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-h2 font-bold text-gray-900">
                Shop by Category
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Discover authentic Nigerian groceries organized by categories
                for easy shopping
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
              {featuredCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="category-card group"
                >
                  <div className="category-icon transition-transform duration-200 group-hover:scale-110">
                    {category.icon}
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.productCount} items
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link href="/categories">View All Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-spacing">
        <div className="container-padding">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-4 text-h2 font-bold text-gray-900">
                  Featured Products
                </h2>
                <p className="text-lg text-gray-600">
                  Handpicked premium Nigerian groceries loved by our customers
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/products">View All Products</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.slice(0, 8).map((product) => (
                <Card key={product.id} className="product-card group">
                  <div className="relative">
                    <Image
                      src={
                        product.images[0]?.url ||
                        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=entropy&auto=format&q=80"
                      }
                      alt={product.name}
                      className="product-card-image"
                      width={400}
                      height={300}
                    />
                    {product.isOnSale && product.discountPercentage && (
                      <div className="product-discount-badge">
                        -{product.discountPercentage}%
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      {product.shortDescription}
                    </p>

                    <div className="mb-3 flex items-center gap-2">
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating.average)
                                ? "rating-star fill-current"
                                : "rating-star-empty"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.rating.count})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="product-price">
                          ${product.salePrice || product.basePrice}
                        </div>
                        {product.salePrice && (
                          <div className="product-price-sale">
                            ${product.basePrice}
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-green-dark hover:bg-green-deep"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-green-deep text-white">
        <div className="container-padding">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-h2 font-bold">Why Choose NaijaBites?</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-100">
                We're committed to providing the best Nigerian grocery shopping
                experience in Canada
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-lemon-dark">
                    <feature.icon className="h-8 w-8 text-green-deep" />
                  </div>
                  <h3 className="mb-4 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-gray-100">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing">
        <div className="container-padding">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-h2 font-bold text-gray-900">
                What Our Customers Say
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Join thousands of satisfied customers who trust NaijaBites for
                their Nigerian grocery needs
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="testimonial-card">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="rating-star h-5 w-5 fill-current"
                        />
                      ))}
                    </div>
                    <p className="mb-6 text-gray-700">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full bg-gray-200"
                        width={48}
                        height={48}
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-spacing bg-gray-50">
        <div className="container-padding">
          <div className="mx-auto max-w-7xl">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="mb-4 text-4xl">
                    {typeof stat.icon === "string" ? (
                      stat.icon
                    ) : (
                      <stat.icon className="mx-auto h-12 w-12 text-green-dark" />
                    )}
                  </div>
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-lemon-light">
        <div className="container-padding">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-4 text-h2 font-bold text-green-deep">
              Ready to Taste Home?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-green-dark">
              Start shopping for authentic Nigerian groceries today. Fresh
              ingredients, traditional flavors, delivered right to your door.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-green-dark px-8 py-4 text-lg hover:bg-green-deep"
                asChild
              >
                <Link href="/categories">Start Shopping</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-dark px-8 py-4 text-lg text-green-dark hover:bg-green-dark hover:text-white"
                asChild
              >
                <Link href="/auth/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
