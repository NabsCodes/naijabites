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
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useCart, type CartItem } from "@/contexts/cart-context";

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

  const handleRemoveItem = () => {
    if (removeItemDialog?.item) {
      removeItem(removeItemDialog.item.id);
      setRemoveItemDialog({ isOpen: false, item: null });
    }
  };

  const handleSaveForLater = () => {
    if (removeItemDialog?.item) {
      // TODO: Implement save for later functionality
      removeItem(removeItemDialog.item.id);
      setRemoveItemDialog({ isOpen: false, item: null });
      // Show toast notification that item was saved for later
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
          </DialogDescription>
        </DialogHeader>

        {removeItemDialog?.item && (
          <div className="flex items-center gap-3 rounded-lg border p-3">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src={
                  removeItemDialog.item.product.image ||
                  "/images/placeholder.png"
                }
                alt={removeItemDialog.item.product.name}
                className="h-full w-full rounded object-contain"
                width={64}
                height={64}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="line-clamp-2 text-sm font-medium">
                {removeItemDialog.item.product.name}
              </h4>
              <p className="text-sm text-gray-600">
                Quantity: {removeItemDialog.item.quantity}
              </p>
              <p className="text-sm font-medium text-green-dark">
                {formatPrice(
                  (removeItemDialog.item.salePrice ||
                    removeItemDialog.item.price) *
                    removeItemDialog.item.quantity,
                )}
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="grid grid-cols-2 gap-4 sm:gap-4">
          <Button
            variant="outline"
            onClick={handleSaveForLater}
            className="flex items-center justify-center rounded-lg border-2 border-green-dark text-green-dark hover:bg-gray-50"
          >
            <HeartIcon className="mr-2 h-5 w-5" />
            Save for later
          </Button>
          <Button
            variant="destructive"
            onClick={handleRemoveItem}
            className="flex items-center justify-center rounded-lg bg-green-dark text-white hover:bg-green-deep"
          >
            <TrashIcon className="mr-2 h-5 w-5" />
            Remove item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
