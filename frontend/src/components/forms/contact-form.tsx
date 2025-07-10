"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import {
  EnvelopeIcon,
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 4 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="mx-auto max-w-lg overflow-hidden rounded-2xl border bg-white shadow-sm">
        <CardContent className="p-8 text-center lg:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-dark to-green-deep">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-green-deep">
            Message Sent Successfully!
          </h3>
          <p className="mb-2 text-base text-gray-600">
            Thank you for contacting us. We appreciate you reaching out to
            NaijaBites.
          </p>
          <p className="text-sm font-medium text-lemon-deep">
            We'll get back to you within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-3xl overflow-hidden rounded-2xl border bg-white shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-green-deep lg:text-3xl">
          Get in Touch
        </CardTitle>
        <p className="mx-auto max-w-2xl text-base text-gray-600 lg:text-lg">
          Have questions about our products or need help with your order? We're
          here to help!
        </p>
      </CardHeader>
      <CardContent className="p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <PencilSquareIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="h-12 rounded-xl border-gray-300 bg-gray-50 pl-10 transition-colors focus:border-green-dark focus:bg-white focus:ring-1 focus:ring-green-dark"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="h-12 rounded-xl border-gray-300 bg-gray-50 pl-10 transition-colors focus:border-green-dark focus:bg-white focus:ring-1 focus:ring-green-dark"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="subject"
              className="text-sm font-medium text-gray-700"
            >
              Subject <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => handleChange("subject", value)}
              required
            >
              <SelectTrigger className="h-12 rounded-xl border-gray-300 bg-gray-50 transition-colors focus:border-green-dark focus:bg-white focus:ring-1 focus:ring-green-dark">
                <SelectValue placeholder="Choose what you need help with" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order-inquiry">
                  Order Inquiry & Status
                </SelectItem>
                <SelectItem value="product-question">
                  Product Questions
                </SelectItem>
                <SelectItem value="shipping-delivery">
                  Shipping & Delivery
                </SelectItem>
                <SelectItem value="returns-refunds">
                  Returns & Refunds
                </SelectItem>
                <SelectItem value="technical-support">
                  Website Technical Support
                </SelectItem>
                <SelectItem value="partnership">
                  Partnership & Wholesale
                </SelectItem>
                <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                <SelectItem value="other">Other Inquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="message"
              className="text-sm font-medium text-gray-700"
            >
              Message <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-3">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Tell us how we can help you. Please include any relevant details like order numbers, product names, or specific questions..."
                rows={6}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pl-10 text-sm transition-colors placeholder:text-gray-500 focus:border-green-dark focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-dark"
              />
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs text-gray-600">
              <strong>Privacy Notice:</strong> Your information is secure with
              us. We'll only use your contact details to respond to your inquiry
              and won't share them with third parties.
            </p>
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-green-dark font-medium text-white transition-colors duration-200 hover:bg-green-dark/90 lg:h-14 lg:text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Sending your message...
              </div>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
