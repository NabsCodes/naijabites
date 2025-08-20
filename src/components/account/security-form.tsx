"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AccountContainer } from "@/components/account/account-container";
import { Separator } from "@/components/ui/separator";

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function SecurityForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAllPasswords, setShowAllPasswords] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handlePasswordChange = async (_data: PasswordFormValues) => {
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
        variant: "success",
      });

      // Reset form
      passwordForm.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
        variant: "default",
      });

      // In production, redirect to home page or logout
      // router.push('/');
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">Security</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your account security settings
          </p>
        </div>
      </div>

      <Separator className="sm:hidden" />

      <div className="grid grid-cols-1 gap-6">
        {/* Password Section */}
        <AccountContainer>
          <CardHeader className="mb-4 p-0 sm:mb-0 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg">
              <KeyIcon className="h-5 w-5 text-green-dark" />
              Change Password
            </CardTitle>
            <CardDescription>
              Update your account password to keep it secure
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Password visibility</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowAllPasswords(!showAllPasswords)}
                className="h-7 border-green-dark px-3 text-xs font-medium text-green-dark hover:bg-green-dark/10 hover:text-green-dark"
              >
                {showAllPasswords ? (
                  <>
                    <EyeSlashIcon className="mr-1.5 h-3 w-3" />
                    Hide All
                  </>
                ) : (
                  <>
                    <EyeIcon className="mr-1.5 h-3 w-3" />
                    Show All
                  </>
                )}
              </Button>
            </div>
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
                className="space-y-4"
              >
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">
                        Current Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={
                              showAllPasswords || showCurrentPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Enter current password"
                            className={cn(
                              "pr-10 transition-all duration-200",
                              fieldState.error &&
                                "border-red-300 focus:border-red-500 focus-visible:ring-red-500",
                            )}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeSlashIcon className="h-4 w-4 text-gray-500" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">
                        New Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={
                              showAllPasswords || showNewPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Enter new password"
                            className={cn(
                              "pr-10 transition-all duration-200",
                              fieldState.error &&
                                "border-red-300 focus:border-red-500 focus-visible:ring-red-500",
                            )}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeSlashIcon className="h-4 w-4 text-gray-500" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-gray-900">
                        Confirm New Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={
                              showAllPasswords || showConfirmPassword
                                ? "text"
                                : "password"
                            }
                            placeholder="Confirm new password"
                            className={cn(
                              "pr-10 transition-all duration-200",
                              fieldState.error &&
                                "border-red-300 focus:border-red-500 focus-visible:ring-red-500",
                            )}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeSlashIcon className="h-4 w-4 text-gray-500" />
                          ) : (
                            <EyeIcon className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSaving}
                  className="w-full bg-green-dark text-white hover:bg-green-dark/90 focus:ring-green-dark"
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Updating...
                    </span>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </AccountContainer>

        <Separator className="sm:hidden" />

        {/* Account Actions */}
        <AccountContainer className="rounded-xl border-red-200 sm:bg-red-50/30">
          <CardHeader className="mb-4 p-0 sm:mb-0 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg text-red-700">
              <ExclamationTriangleIcon className="h-5 w-5" />
              Account Actions
            </CardTitle>
            <CardDescription className="text-red-600">
              Irreversible actions that affect your account
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900">Delete Account</h4>
                <p className="text-sm text-gray-600">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(true)}
                className="border-red-300 text-red-700 hover:border-red-400 hover:bg-red-50 hover:text-red-600"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </AccountContainer>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <ShieldExclamationIcon className="h-8 w-8 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Delete Your Account?
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              This action cannot be undone. All your data will be permanently
              removed from our systems.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-red-200 bg-red-50/50 p-4">
            <h4 className="mb-3 font-medium text-red-800">
              What will be deleted:
            </h4>
            <ul className="space-y-2 text-sm text-red-700">
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                <span>All order history and receipts</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                <span>Saved addresses and preferences</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                <span>Account settings and profile data</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></div>
                <span>All associated customer data</span>
              </li>
            </ul>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Deleting Account...
                </div>
              ) : (
                "Delete Account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
