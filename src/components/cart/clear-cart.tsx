import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

export function ClearCartDialog({
  clearCartDialog,
  setClearCartDialog,
}: {
  clearCartDialog: boolean;
  setClearCartDialog: (value: boolean) => void;
}) {
  const { clearCart } = useCart();
  const { toast } = useToast();

  const handleClearCartDialog = () => {
    clearCart();
    setClearCartDialog(false);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <Dialog open={clearCartDialog} onOpenChange={setClearCartDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Clear Shopping Cart
          </DialogTitle>
          <DialogDescription className="mt-2 text-gray-600">
            Are you sure you want to remove all items from your cart? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => setClearCartDialog(false)}
            className="flex items-center justify-center hover:bg-gray-100"
          >
            Keep Items
          </Button>
          <Button
            variant="destructive"
            onClick={handleClearCartDialog}
            className="flex items-center justify-center gap-2 bg-green-dark hover:bg-green-deep"
          >
            <TrashIcon className="h-4 w-4" />
            Clear Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
