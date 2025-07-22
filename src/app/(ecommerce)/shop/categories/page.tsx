import { redirect } from "next/navigation";

export default function ShopCategoriesPage() {
  redirect("/shop/products");
  return null;
}
