import { Metadata } from "next";
import { ProfileForm } from "@/components/account";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your personal information and notification preferences",
  keywords: ["profile", "settings", "account"],
  openGraph: {
    title: "Profile Settings",
    description:
      "Manage your personal information and notification preferences",
  },
};

export default function ProfilePage() {
  return <ProfileForm />;
}
