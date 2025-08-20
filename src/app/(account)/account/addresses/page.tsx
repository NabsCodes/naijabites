import { Metadata } from "next";
import { AddressesForm } from "@/components/account";

export const metadata: Metadata = {
  title: "Addresses",
  description: "Manage your shipping and billing addresses",
  keywords: ["addresses", "shipping", "billing", "delivery"],
};

export default function AddressesPage() {
  return <AddressesForm />;
}
