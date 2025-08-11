"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  UserIcon,
  BellIcon,
  CameraIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

const preferencesSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  promotionalEmails: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PreferencesValues = z.infer<typeof preferencesSchema>;

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    promotionalEmails: false,
  });
  const { toast } = useToast();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: profileData,
  });

  const preferencesForm = useForm<PreferencesValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: preferences,
  });

  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setProfileData(data);
    setIsEditing(false);
    setIsSaving(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const onPreferencesSubmit = async (data: PreferencesValues) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    setPreferences(data);
    setIsSaving(false);
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file and get a URL back
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      });
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="min-w-0 flex-1">
        <h1 className="text-2xl font-semibold text-gray-900">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your personal information and notification preferences
        </p>
      </div>

      {/* Profile Picture & Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-green-dark" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Your profile information and contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="/images/avatar-placeholder.jpg"
                  alt="Profile"
                />
                <AvatarFallback className="bg-green-dark/10 text-lg font-semibold text-green-dark">
                  {getInitials(profileData.firstName, profileData.lastName)}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="profile-image"
                className="absolute -bottom-2 -right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-green-dark text-white hover:bg-green-dark/90"
              >
                <CameraIcon className="h-4 w-4" />
                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="text-gray-600">Customer since March 2024</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-green-dark/10 text-green-dark"
                >
                  <CheckCircleIcon className="mr-1 h-3 w-3" />
                  Verified Email
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Profile Form */}
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onProfileSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <FormField
                  control={profileForm.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing}
                          className={cn(
                            "transition-all duration-200",
                            !isEditing &&
                              "cursor-not-allowed bg-gray-50/80 text-gray-600",
                            fieldState.error &&
                              "border-red-300 focus:border-red-500",
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!isEditing}
                          className={cn(
                            "transition-all duration-200",
                            !isEditing &&
                              "cursor-not-allowed bg-gray-50/80 text-gray-600",
                            fieldState.error &&
                              "border-red-300 focus:border-red-500",
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          disabled={!isEditing}
                          className={cn(
                            "transition-all duration-200",
                            !isEditing &&
                              "cursor-not-allowed bg-gray-50/80 text-gray-600",
                            fieldState.error &&
                              "border-red-300 focus:border-red-500",
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          disabled={!isEditing}
                          className={cn(
                            "transition-all duration-200",
                            !isEditing &&
                              "cursor-not-allowed bg-gray-50/80 text-gray-600",
                            fieldState.error &&
                              "border-red-300 focus:border-red-500",
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                {isEditing ? (
                  <>
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="bg-green-dark shadow-sm transition-all duration-200 hover:bg-green-dark/90 hover:shadow-md"
                    >
                      {isSaving ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Saving...
                        </span>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isSaving}
                      onClick={() => {
                        setIsEditing(false);
                        profileForm.reset(profileData);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-green-dark shadow-sm transition-all duration-200 hover:bg-green-dark/90 hover:shadow-md"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Separator className="my-8" />

      {/* Notification Preferences */}
      <Card className="transition-all duration-200 hover:shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-green-dark" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Choose how you want to receive updates about your orders and
            promotions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...preferencesForm}>
            <form
              onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={preferencesForm.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-y-0">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <FormLabel className="text-sm font-medium">
                            Email Notifications
                          </FormLabel>
                          <Badge
                            variant="outline"
                            className="bg-[#E6F2ED] text-xs text-green-dark"
                          >
                            Recommended
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Receive order updates and important account
                          notifications via email
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={preferencesForm.control}
                  name="smsNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-y-0">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-medium">
                          SMS Notifications
                        </FormLabel>
                        <p className="text-sm text-gray-600">
                          Get delivery updates and urgent notifications via text
                          message
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={preferencesForm.control}
                  name="promotionalEmails"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between space-y-0">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-medium">
                          Promotional Emails
                        </FormLabel>
                        <p className="text-sm text-gray-600">
                          Receive special offers, discounts, and new product
                          announcements
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-green-dark shadow-sm transition-all duration-200 hover:bg-green-dark/90 hover:shadow-md"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Saving...
                    </span>
                  ) : (
                    "Save Preferences"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
