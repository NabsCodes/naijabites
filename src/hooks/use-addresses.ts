import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { type Address, type AddressFormValues } from "@/types/addresses";
import { mockAddresses } from "@/lib/mock-data/addresses";

export function useAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Sort addresses to show default first
  const sortedAddresses = [...addresses].sort((a, b) => {
    if (a.isDefault && !b.isDefault) return -1;
    if (!a.isDefault && b.isDefault) return 1;
    return 0;
  });

  // Handle saving an address
  const handleSaveAddress = useCallback(
    async (data: AddressFormValues, editingAddress: Address | null) => {
      setIsSaving(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (editingAddress) {
          // Update existing address
          setAddresses((prev) =>
            prev.map((addr) =>
              addr.id === editingAddress.id
                ? {
                    ...data,
                    id: editingAddress.id,
                    createdAt: addr.createdAt,
                    updatedAt: new Date().toISOString(),
                  }
                : data.isDefault
                  ? { ...addr, isDefault: false }
                  : addr,
            ),
          );

          toast({
            title: "Address updated",
            description: "Your address has been updated successfully.",
            variant: "success",
          });
        } else {
          // Add new address
          const newAddress: Address = {
            ...data,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          setAddresses((prev) => [
            ...prev.map((addr) =>
              data.isDefault ? { ...addr, isDefault: false } : addr,
            ),
            newAddress,
          ]);

          toast({
            title: "Address added",
            description: "Your new address has been added successfully.",
            variant: "success",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save address. Please try again.",
          variant: "error",
        });
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [toast],
  );

  // Handle deleting an address
  const handleDeleteAddress = useCallback(
    async (addressToDelete: Address) => {
      setIsSaving(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        setAddresses((prev) =>
          prev.filter((addr) => addr.id !== addressToDelete.id),
        );

        toast({
          title: "Address removed",
          description: "Your address has been removed successfully.",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete address. Please try again.",
          variant: "error",
        });
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [toast],
  );

  // Handle setting a default address
  const handleSetDefault = useCallback(
    async (addressId: string) => {
      setIsSaving(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 600));

        setAddresses((prev) =>
          prev.map((addr) => ({
            ...addr,
            isDefault: addr.id === addressId,
            updatedAt:
              addr.id === addressId ? new Date().toISOString() : addr.updatedAt,
          })),
        );

        toast({
          title: "Default address updated",
          description: "Your default address has been updated.",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update default address. Please try again.",
          variant: "error",
        });
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [toast],
  );

  return {
    addresses,
    sortedAddresses,
    isSaving,
    handleSaveAddress,
    handleDeleteAddress,
    handleSetDefault,
  };
}
