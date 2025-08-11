"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { type Address } from "@/types/addresses";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onSetDefault: (addressId: string) => void;
  isSaving: boolean;
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isSaving,
}: AddressCardProps) {
  return (
    <Card
      className={`group relative border bg-white transition-all hover:shadow-md ${
        address.isDefault
          ? "border-green-dark/5 bg-green-50/30 ring-1 ring-green-dark/50"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="font-medium text-gray-900">
                {address.firstName} {address.lastName}
              </h3>
              {address.isDefault && (
                <div className="flex items-center gap-1 rounded-full bg-[#E6F2ED] px-2 py-0.5 text-green-dark">
                  <StarIconSolid className="h-3 w-3" />
                  <span className="text-xs font-medium">Default</span>
                </div>
              )}
            </div>

            <div className="space-y-0.5 text-sm text-gray-600">
              <p className="leading-relaxed">{address.address1}</p>
              {address.address2 && (
                <p className="leading-relaxed">{address.address2}</p>
              )}
              <p className="leading-relaxed">
                {address.city}, {address.province} {address.postalCode}
              </p>
              <p className="text-gray-500">Canada</p>
              {address.phone && (
                <p className="pt-1 text-gray-700">{address.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t pt-4">
          <div className="flex items-center gap-2">
            {!address.isDefault && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSetDefault(address.id)}
                disabled={isSaving}
                className="h-8 px-2 text-xs text-green-dark hover:bg-green-dark/5 hover:text-green-dark"
              >
                <StarIcon className="mr-1 h-3 w-3" />
                Make Default
              </Button>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(address)}
              disabled={isSaving}
              className="h-8 px-2 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            >
              <PencilIcon className="mr-1 h-3 w-3" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(address)}
              disabled={isSaving}
              className="h-8 px-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <TrashIcon className="mr-1 h-3 w-3" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
