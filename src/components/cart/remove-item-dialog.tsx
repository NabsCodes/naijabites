import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useCart, type CartItem } from "@/contexts/cart-context";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToast } from "@/hooks/use-toast";

interface RemoveItemDialogProps {
  removeItemDialog: {
    isOpen: boolean;
    item: CartItem | null;
  } | null;
  setRemoveItemDialog: (
    value: { isOpen: boolean; item: CartItem | null } | null,
  ) => void;
}

export function RemoveItemDialog({
  removeItemDialog,
  setRemoveItemDialog,
}: RemoveItemDialogProps) {
  const { removeItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const currentItem = removeItemDialog?.item;
  const isAlreadyWishlisted = currentItem
    ? isInWishlist(currentItem.product.id, currentItem.variant?.id)
    : false;

  const handleRemoveItem = () => {
    if (currentItem) {
      removeItem(currentItem.id);
      setRemoveItemDialog({ isOpen: false, item: null });
      toast({
        title: "Item removed from cart",
        description: `${currentItem.product.name} has been removed from your cart.`,
        variant: "success",
      });
    }
  };

  const handleSaveForLater = async () => {
    if (!currentItem) return;

    setIsSaving(true);
    try {
      // Small delay for better UX and to prevent rapid clicking
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (isAlreadyWishlisted) {
        // Item is already in wishlist, just remove from cart
        removeItem(currentItem.id);
        toast({
          title: "Item removed from cart",
          description: `${currentItem.product.name} is already in your wishlist and has been removed from your cart.`,
          variant: "success",
        });
      } else {
        // Add to wishlist and remove from cart
        toggleWishlist(currentItem.product, currentItem.variant);
        removeItem(currentItem.id);
        toast({
          title: "Item saved for later",
          description: `${currentItem.product.name} has been saved to your wishlist and removed from your cart.`,
          variant: "success",
        });
      }

      setRemoveItemDialog({ isOpen: false, item: null });
    } catch (error) {
      console.error("Failed to save item for later:", error);
      toast({
        title: "Error",
        description: "Failed to save item for later. Please try again.",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={removeItemDialog?.isOpen || false}
      onOpenChange={(open) => setRemoveItemDialog({ isOpen: open, item: null })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove item from cart</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this item from your cart?
            {isAlreadyWishlisted && (
              <span className="mt-1 block text-sm text-green-dark">
                This item is already in your wishlist.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {currentItem && (
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={currentItem.product.image || "/images/placeholder.png"}
                alt={currentItem.product.name}
                className="h-full w-full rounded object-contain"
                width={64}
                height={64}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="line-clamp-2 text-sm font-medium">
                {currentItem.product.name}
              </h4>
              <p className="text-sm text-gray-600">
                Quantity: {currentItem.quantity}
              </p>
              <p className="text-sm font-medium text-green-dark">
                {formatPrice(
                  (currentItem.salePrice || currentItem.price) *
                    currentItem.quantity,
                )}
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="grid grid-cols-2">
          <Button
            variant="outline"
            onClick={handleSaveForLater}
            disabled={isSaving}
            className={`flex items-center justify-center rounded-lg border-2 transition-all duration-300 ${
              isAlreadyWishlisted
                ? "border-gray-400 bg-gray-50"
                : "border-green-dark text-gray-600 hover:bg-gray-50 hover:text-green-dark"
            }`}
          >
            {isSaving ? (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border border-current border-t-transparent" />
            ) : isAlreadyWishlisted ? (
              <HeartIconSolid className="mr-2 h-5 w-5 text-gray-600" />
            ) : (
              <HeartIcon className="mr-2 h-5 w-5" />
            )}
            {isSaving
              ? "Saving..."
              : isAlreadyWishlisted
                ? "Already Saved"
                : "Save for later"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleRemoveItem}
            className="flex items-center justify-center rounded-lg bg-green-dark text-white transition-all duration-300 hover:bg-green-dark/90"
          >
            <TrashIcon className="mr-2 h-5 w-5" />
            Remove item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
