import { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with NaijaBites for support, questions, or partnership inquiries. We're here to help bring Nigerian flavors to your doorstep.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
