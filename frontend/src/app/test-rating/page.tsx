"use client";

import React, { useState } from "react";
import { Rating } from "@/components/ui/rating";

export default function TestRatingPage() {
  const [userRating, setUserRating] = useState(0);
  const [reviewRating, setReviewRating] = useState(3);
  const [halfStarRating, setHalfStarRating] = useState(2.5);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Rating Component Test Page
        </h1>

        {/* Instructions */}
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-blue-900">
            🧪 How to Test the Rating Component
          </h2>
          <div className="grid grid-cols-1 gap-4 text-sm text-blue-800 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium">
                📱 Read-Only Ratings (Product Display):
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>Used in product cards, category pages</li>
                <li>Shows precise ratings (like 4.3 stars)</li>
                <li>Different sizes: compact, default, large</li>
                <li>Includes review count display</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-medium">
                ⭐ Interactive Ratings (User Input):
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  <strong>Click stars</strong> to set rating
                </li>
                <li>
                  <strong>Hover left side</strong> of star for half-star (e.g.,
                  3.5)
                </li>
                <li>
                  <strong>Hover right side</strong> of star for full star (e.g.,
                  4.0)
                </li>
                <li>Perfect for review forms and user feedback</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* Read-Only Ratings (For Products) */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              Read-Only Ratings (Product Display)
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">
                  Different Rating Values
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Perfect (5.0):
                    </span>
                    <Rating rating={5.0} count={156} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Excellent (4.8):
                    </span>
                    <Rating rating={4.8} count={89} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Very Good (4.5):
                    </span>
                    <Rating rating={4.5} count={124} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Good (4.2):</span>
                    <Rating rating={4.2} count={67} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Average (3.3):
                    </span>
                    <Rating rating={3.3} count={45} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Poor (2.1):</span>
                    <Rating rating={2.1} count={23} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">
                  Different Variants
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="mb-2 text-sm text-gray-600">Default Size:</p>
                    <Rating rating={4.5} count={124} variant="default" />
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-gray-600">Compact Size:</p>
                    <Rating rating={4.5} count={124} variant="compact" />
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-gray-600">Large Size:</p>
                    <Rating rating={4.5} count={124} size={20} />
                  </div>

                  <div>
                    <p className="mb-2 text-sm text-gray-600">No Count:</p>
                    <Rating rating={4.5} showCount={false} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Ratings (For Reviews) */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              Interactive Ratings (User Input)
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Rate This Product</h3>
                <p className="text-sm text-gray-600">
                  Click stars to rate (whole stars only)
                </p>

                <div className="flex items-center gap-4">
                  <Rating
                    rating={userRating}
                    onRatingChange={setUserRating}
                    variant="interactive"
                    size={24}
                  />
                  <span className="text-lg font-medium text-gray-700">
                    {userRating > 0 ? `${userRating}/5` : "No rating"}
                  </span>
                </div>

                <button
                  onClick={() => setUserRating(0)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear Rating
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Write a Review</h3>
                <p className="text-sm text-gray-600">
                  Click stars to rate (whole stars only)
                </p>

                <div className="flex items-center gap-4">
                  <Rating
                    rating={reviewRating}
                    onRatingChange={setReviewRating}
                    showCount={false}
                    size={20}
                  />
                  <span className="text-lg font-medium text-gray-700">
                    {reviewRating}/5
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Quick Rating Buttons:
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setReviewRating(rating)}
                        className="rounded-md bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200"
                      >
                        {rating} ⭐
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Half Star Testing */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              Half Star Support (Future Feature)
            </h2>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Currently showing precise percentage fills for half stars in
                read-only mode. Interactive half-star rating can be enabled with
                the <code className="rounded bg-gray-100 px-1">allowHalf</code>{" "}
                prop.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-8 py-4">
                <div className="text-center">
                  <Rating rating={4.1} showCount={false} />
                  <p className="mt-1 text-xs text-gray-600">4.1 stars</p>
                </div>
                <div className="text-center">
                  <Rating rating={4.3} showCount={false} />
                  <p className="mt-1 text-xs text-gray-600">4.3 stars</p>
                </div>
                <div className="text-center">
                  <Rating rating={4.7} showCount={false} />
                  <p className="mt-1 text-xs text-gray-600">4.7 stars</p>
                </div>
                <div className="text-center">
                  <Rating rating={4.9} showCount={false} />
                  <p className="mt-1 text-xs text-gray-600">4.9 stars</p>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <h3 className="mb-3 font-medium text-gray-700">
                  Interactive Half-Star Rating ⚡
                </h3>
                <div className="mb-4 rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 p-4">
                  <p className="mb-3 text-sm text-gray-700">
                    <strong>🎯 Try this:</strong> Move your mouse slowly across
                    each star below. Left side = half star (★½), right side =
                    full star (★). Click to set!
                  </p>

                  <div className="flex items-center justify-center gap-6 rounded-lg border-2 border-dashed border-orange-300 bg-white p-4">
                    <div className="text-center">
                      <div className="mb-2 text-sm text-gray-600">
                        Hover left/right of stars, then click:
                      </div>
                      <Rating
                        key={halfStarRating}
                        variant="interactive"
                        rating={halfStarRating}
                        onRatingChange={setHalfStarRating}
                        allowHalf={true}
                        size={36}
                      />
                    </div>
                    <div className="text-center">
                      <div className="mb-1 text-3xl font-bold text-orange-600">
                        {halfStarRating}
                      </div>
                      <div className="text-sm text-gray-600">out of 5</div>
                      <div className="mt-1 text-xs text-gray-500">
                        {halfStarRating % 1 === 0
                          ? "Whole stars"
                          : "Half-star precision!"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Quick test:</span>
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setHalfStarRating(rating)}
                      className={`rounded px-2 py-1 text-xs transition-colors ${
                        halfStarRating === rating
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                      }`}
                    >
                      {rating}★
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Product Card Simulation */}
          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-800">
              In Product Cards (Your Use Case)
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Maggi Star Seasoning Cubes",
                  price: "₦12,000",
                  rating: 4.5,
                  count: 124,
                },
                {
                  name: "Golden Morn Cereal",
                  price: "₦7,650",
                  rating: 4.2,
                  count: 89,
                },
                {
                  name: "Indomie Instant Noodles",
                  price: "₦15,000",
                  rating: 4.8,
                  count: 203,
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 h-32 rounded-md bg-gray-200"></div>
                  <h3 className="mb-1 font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="mb-2 text-sm text-gray-600">250g x 6 Cans</p>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {product.price}
                    </span>
                  </div>
                  <Rating
                    rating={product.rating}
                    count={product.count}
                    variant="compact"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
