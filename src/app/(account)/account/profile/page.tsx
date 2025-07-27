import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserIcon } from "@heroicons/react/24/outline";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Profile Information
        </h2>
        <p className="mt-1 text-gray-600">
          Update your personal information and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Your basic profile details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="h-10 rounded-md border bg-gray-50 px-3 py-2 text-gray-500">
                John
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="h-10 rounded-md border bg-gray-50 px-3 py-2 text-gray-500">
                Doe
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="h-10 rounded-md border bg-gray-50 px-3 py-2 text-gray-500">
                john.doe@example.com
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <div className="h-10 rounded-md border bg-gray-50 px-3 py-2 text-gray-500">
                +1 (555) 123-4567
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-green-deep hover:bg-green-dark">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Manage your shopping preferences and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-600">
                Receive updates about orders and promotions
              </p>
            </div>
            <div className="h-6 w-11 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-gray-600">
                Get delivery updates via text message
              </p>
            </div>
            <div className="h-6 w-11 rounded-full bg-gray-200"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
