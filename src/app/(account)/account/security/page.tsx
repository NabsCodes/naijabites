import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheckIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Security Settings
        </h2>
        <p className="mt-1 text-gray-600">
          Manage your account security and privacy settings
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Password Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyIcon className="h-5 w-5" />
              Password
            </CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="h-10 rounded-md border bg-gray-50 px-3 py-2 text-gray-500">
                ••••••••
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="h-10 rounded-md border bg-gray-50 px-3 py-2 text-gray-500">
                Enter new password
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="h-10 rounded-md border bg-gray-50 px-3 py-2 text-gray-500">
                Confirm new password
              </div>
            </div>
            <Button className="w-full bg-green-deep hover:bg-green-dark">
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DevicePhoneMobileIcon className="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">SMS Authentication</h4>
                <p className="text-sm text-gray-600">
                  Receive codes via text message
                </p>
              </div>
              <div className="h-6 w-11 rounded-full bg-gray-200"></div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Authentication</h4>
                <p className="text-sm text-gray-600">Receive codes via email</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-gray-200"></div>
            </div>
            <Button variant="outline" className="w-full">
              Setup 2FA
            </Button>
          </CardContent>
        </Card>

        {/* Login Sessions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5" />
              Active Sessions
            </CardTitle>
            <CardDescription>Manage your active login sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <h4 className="font-medium">Current Session</h4>
                  <p className="text-sm text-gray-600">
                    Chrome on MacBook Pro • Toronto, Canada
                  </p>
                  <p className="text-xs text-gray-500">Last active: Just now</p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Current
                </Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <h4 className="font-medium">Mobile Session</h4>
                  <p className="text-sm text-gray-600">
                    Safari on iPhone • Toronto, Canada
                  </p>
                  <p className="text-xs text-gray-500">
                    Last active: 2 hours ago
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  Revoke
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
