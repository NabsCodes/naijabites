import { EmptySection } from "@/components/common/empty-section";

export default function NotFound() {
  return (
    <EmptySection
      icon="order"
      title="Order not found"
      description="The order you are looking for does not exist or is no longer available. Please check your order number or contact support if you need assistance."
      actionText="Back to orders"
      actionHref="/account/orders"
      contactText="Need help?"
    />
  );
}
