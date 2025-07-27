import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPinIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Delivery Addresses
          </h2>
          <p className="mt-1 text-gray-600">
            Manage your shipping and billing addresses
          </p>
        </div>
        <Button className="flex items-center gap-2 bg-green-deep hover:bg-green-dark">
          <PlusIcon className="h-4 w-4" />
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Sample Address */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPinIcon className="h-5 w-5" />
                Home Address
              </CardTitle>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Default
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 text-sm">
              <p className="font-medium">John Doe</p>
              <p className="text-gray-600">123 Main Street</p>
              <p className="text-gray-600">Apt 4B</p>
              <p className="text-gray-600">Toronto, ON M5V 2H1</p>
              <p className="text-gray-600">Canada</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <PencilIcon className="h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <TrashIcon className="h-4 w-4" />
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add New Address Card */}
        <Card className="border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <PlusIcon className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 font-medium text-gray-900">Add New Address</h3>
            <p className="mb-4 text-center text-sm text-gray-600">
              Add a new delivery address for faster checkout
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add Address
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
