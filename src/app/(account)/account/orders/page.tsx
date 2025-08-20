import { Metadata } from "next";
import { OrdersForm } from "@/components/account";

export const metadata: Metadata = {
  title: "Order History",
  description: "View and track your recent purchases and order history",
  keywords: ["orders", "order history", "tracking", "purchases"],
};

export default function OrdersPage() {
  return <OrdersForm />;
}
