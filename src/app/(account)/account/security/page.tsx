import { Metadata } from "next";
import { SecurityForm } from "@/components/account";

export const metadata: Metadata = {
  title: "Security Settings",
  description: "Manage your account security settings and password",
  keywords: ["security", "password", "account", "settings"],
};

export default function SecurityPage() {
  return <SecurityForm />;
}
