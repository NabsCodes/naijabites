import { OrderCardSkeleton } from "@/components/account/orders/order-card-skeleton";

export default function OrdersLoading() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 1 }).map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </div>
  );
}
