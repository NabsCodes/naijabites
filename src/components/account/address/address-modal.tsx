"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { canadianProvinces } from "@/lib/mock-data/addresses";
import { type Address, type AddressFormValues } from "@/types/addresses";

const addressFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  address1: z.string().min(5, "Address must be at least 5 characters"),
  address2: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  province: z.string().min(2, "Province must be at least 2 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  isDefault: z.boolean(),
});

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address?: Address | null;
  onSave: (data: AddressFormValues) => Promise<void>;
  isSaving: boolean;
}

export function AddressModal({
  isOpen,
  onClose,
  address,
  onSave,
  isSaving,
}: AddressModalProps) {
  const { toast } = useToast();

  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
      isDefault: false,
    },
  });

  // Reset form when address changes or modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (address) {
        // Editing existing address
        addressForm.reset({
          firstName: address.firstName,
          lastName: address.lastName,
          address1: address.address1,
          address2: address.address2 || "",
          city: address.city,
          province: address.province,
          postalCode: address.postalCode,
          phone: address.phone,
          isDefault: address.isDefault,
        });
      } else {
        // Adding new address
        addressForm.reset({
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          province: "",
          postalCode: "",
          phone: "",
          isDefault: false,
        });
      }
    }
  }, [isOpen, address, addressForm]);

  const onSubmit = async (data: AddressFormValues) => {
    try {
      await onSave(data);
      // Don't reset form here - let the parent handle it
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save address. Please try again.",
        variant: "error",
      });
    }
  };

  const handleClose = () => {
    // Don't reset form here - let the useEffect handle it when modal opens again
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-green-dark" />
            {address ? "Edit Address" : "Add New Address"}
          </DialogTitle>
          <DialogDescription>
            {address
              ? "Update your address information"
              : "Add a new delivery address for faster checkout"}
          </DialogDescription>
        </DialogHeader>

        <Form {...addressForm}>
          <form
            onSubmit={addressForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <FormField
                control={addressForm.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          "transition-all duration-200",
                          fieldState.error &&
                            "border-red-300 focus:border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className={cn(
                          "transition-all duration-200",
                          fieldState.error &&
                            "border-red-300 focus:border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="address1"
                render={({ field, fieldState }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="text-gray-900">
                      Street Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="123 Main Street"
                        className={cn(
                          "transition-all duration-200",
                          fieldState.error &&
                            "border-red-300 focus:border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="address2"
                render={({ field, fieldState }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="text-gray-900">
                      Apartment, suite, etc. (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Apt 4B, Unit 12, etc."
                        className={cn(
                          "transition-all duration-200",
                          fieldState.error &&
                            "border-red-300 focus:border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="city"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Toronto"
                        className={cn(
                          "transition-all duration-200",
                          fieldState.error &&
                            "border-red-300 focus:border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Province</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {canadianProvinces.map((province) => (
                          <SelectItem key={province.code} value={province.code}>
                            {province.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="postalCode"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="M5V 2H1"
                        className={cn(
                          "transition-all duration-200",
                          fieldState.error &&
                            "border-red-300 focus:border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addressForm.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-gray-900">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className={cn(
                          "transition-all duration-200",
                          fieldState.error &&
                            "border-red-300 focus:border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={addressForm.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">
                      Set as default address
                    </FormLabel>
                    <p className="text-sm text-gray-600">
                      Use this address for future orders
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
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
                ) : address ? (
                  "Update Address"
                ) : (
                  "Add Address"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isSaving}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
