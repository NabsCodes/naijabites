import { Metadata } from "next";
import { WishlistForm } from "@/components/account";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Save and organize your favorite products",
  keywords: ["wishlist", "favorites", "saved items"],
};

export default function WishlistPage() {
  return <WishlistForm />;
}
