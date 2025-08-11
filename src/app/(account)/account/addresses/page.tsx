"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPinIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { type Address, type AddressFormValues } from "@/types/addresses";
import { AddressModal, AddressCard } from "@/components/account";
import { useAddresses } from "@/hooks/use-addresses";

export default function AddressesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  const {
    addresses,
    sortedAddresses,
    isSaving,
    handleSaveAddress,
    handleDeleteAddress,
    handleSetDefault,
  } = useAddresses();

  const handleSaveAddressWrapper = async (data: AddressFormValues) => {
    await handleSaveAddress(data, editingAddress);
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDeleteAddressWrapper = (address: Address) => {
    setAddressToDelete(address);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteAddress = async () => {
    if (!addressToDelete) return;
    await handleDeleteAddress(addressToDelete);
    setDeleteDialogOpen(false);
    setAddressToDelete(null);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">Addresses</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your delivery and billing addresses
          </p>
        </div>
        <Button
          onClick={handleAddNewAddress}
          className="bg-green-dark text-white hover:bg-green-dark/90 focus:ring-green-dark"
          disabled={isSaving}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {sortedAddresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddressWrapper}
              onSetDefault={handleSetDefault}
              isSaving={isSaving}
            />
          ))}

          {/* Add new address prompt */}
          <Card
            onClick={handleAddNewAddress}
            className="group flex cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50 transition-all hover:border-green-dark/50 hover:bg-green-50/30"
          >
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-3 rounded-full bg-white p-3 shadow-sm transition-all duration-300 group-hover:bg-green-dark/5">
                <PlusIcon className="h-6 w-6 text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-600">
                Add another address
              </span>
              <span className="mt-1 text-xs text-gray-500">
                Quick delivery setup
              </span>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Empty State */
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <MapPinIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No addresses yet
            </h3>
            <p className="mb-6 max-w-sm text-gray-600">
              Add your first delivery address to start ordering authentic
              Nigerian groceries
            </p>
            <Button
              onClick={handleAddNewAddress}
              className="bg-green-dark text-white hover:bg-green-dark/90"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Your First Address
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        address={editingAddress}
        onSave={handleSaveAddressWrapper}
        isSaving={isSaving}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <TrashIcon className="h-5 w-5" />
              Delete Address
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this address? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          {addressToDelete && (
            <div className="py-2">
              <div className="rounded-lg border bg-gray-50 p-4 text-sm">
                <p className="font-medium text-gray-900">
                  {addressToDelete.firstName} {addressToDelete.lastName}
                </p>
                <p className="mt-1 text-gray-600">
                  {addressToDelete.address1}
                  {addressToDelete.address2 && `, ${addressToDelete.address2}`}
                </p>
                <p className="text-gray-600">
                  {addressToDelete.city}, {addressToDelete.province}{" "}
                  {addressToDelete.postalCode}
                </p>
              </div>
            </div>
          )}

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
              onClick={confirmDeleteAddress}
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Deleting...
                </div>
              ) : (
                "Delete Address"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
