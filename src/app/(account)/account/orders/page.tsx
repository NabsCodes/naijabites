import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBagIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
        <p className="mt-1 text-gray-600">View and track your past orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBagIcon className="h-5 w-5" />
            Recent Orders
          </CardTitle>
          <CardDescription>
            Your order history and current order status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sample Order */}
            <div className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Order #NB-2024-001</h4>
                  <p className="text-sm text-gray-600">
                    Placed on March 15, 2024
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Delivered
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">3 items • $45.99</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <EyeIcon className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>

            {/* Empty State */}
            <div className="py-8 text-center text-gray-500">
              <ShoppingBagIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 font-medium">No orders yet</h3>
              <p className="mb-4 text-sm">
                Start shopping to see your order history here
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
