import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HeartIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">My Wishlist</h2>
        <p className="mt-1 text-gray-600">
          Save items for later and never miss out on your favorites
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartIcon className="h-5 w-5" />
            Saved Items
          </CardTitle>
          <CardDescription>
            Items you've saved for future purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sample Wishlist Item */}
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gray-200"></div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900">Indomie Noodles</h4>
                  <p className="mb-2 text-sm text-gray-600">
                    Classic Nigerian instant noodles
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-green-deep">₦1,200</span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex items-center gap-2 bg-green-deep hover:bg-green-dark"
                      >
                        <ShoppingCartIcon className="h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty State */}
            <div className="py-12 text-center text-gray-500">
              <HeartIcon className="mx-auto mb-4 h-16 w-16 text-gray-300" />
              <h3 className="mb-2 font-medium">Your wishlist is empty</h3>
              <p className="mb-4 text-sm">
                Start shopping and save items you love for later
              </p>
              <Button className="bg-green-deep hover:bg-green-dark">
                Start Shopping
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
