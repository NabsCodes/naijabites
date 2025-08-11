"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const watchedSubject = watch("subject");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form data:", data);
      setIsSubmitted(true);

      // Reset form after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
      }, 4000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
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
                  {...register("name")}
                  placeholder="Enter your full name"
                  className={`h-12 rounded-xl border-gray-300 bg-gray-50 pl-10 transition-colors focus:border-green-dark focus:bg-white focus:ring-1 focus:ring-green-dark ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
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
                  {...register("email")}
                  placeholder="your.email@example.com"
                  className={`h-12 rounded-xl border-gray-300 bg-gray-50 pl-10 transition-colors focus:border-green-dark focus:bg-white focus:ring-1 focus:ring-green-dark ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="subject"
              className="text-sm font-medium text-gray-700"
            >
              Subject <span className="text-red-500">*</span>
            </Label>
            <Select
              value={watchedSubject}
              onValueChange={(value) => setValue("subject", value)}
            >
              <SelectTrigger
                className={`h-12 rounded-xl border-gray-300 bg-gray-50 transition-colors focus:border-green-dark focus:bg-white focus:ring-1 focus:ring-green-dark ${
                  errors.subject
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <SelectValue placeholder="Choose what you need help with" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border shadow-lg">
                <SelectItem
                  value="order-inquiry"
                  className="rounded-lg transition-colors duration-150 focus:bg-green-dark focus:text-white data-[highlighted]:bg-green-dark data-[highlighted]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-lemon-deep"></div>
                    Order Inquiry & Status
                  </div>
                </SelectItem>
                <SelectItem
                  value="product-question"
                  className="rounded-lg transition-colors duration-150 focus:bg-green-dark focus:text-white data-[highlighted]:bg-green-dark data-[highlighted]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-lemon-deep"></div>
                    Product Questions
                  </div>
                </SelectItem>
                <SelectItem
                  value="shipping-delivery"
                  className="rounded-lg transition-colors duration-150 focus:bg-green-dark focus:text-white data-[highlighted]:bg-green-dark data-[highlighted]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-lemon-deep"></div>
                    Shipping & Delivery
                  </div>
                </SelectItem>
                <SelectItem
                  value="returns-refunds"
                  className="rounded-lg transition-colors duration-150 focus:bg-green-dark focus:text-white data-[highlighted]:bg-green-dark data-[highlighted]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-lemon-deep"></div>
                    Returns & Refunds
                  </div>
                </SelectItem>
                <SelectItem
                  value="technical-support"
                  className="rounded-lg transition-colors duration-150 focus:bg-green-dark focus:text-white data-[highlighted]:bg-green-dark data-[highlighted]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-lemon-deep"></div>
                    Website Technical Support
                  </div>
                </SelectItem>
                <SelectItem
                  value="partnership"
                  className="rounded-lg transition-colors duration-150 focus:bg-green-dark focus:text-white data-[highlighted]:bg-green-dark data-[highlighted]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-lemon-deep"></div>
                    Partnership & Wholesale
                  </div>
                </SelectItem>
                <SelectItem
                  value="feedback"
                  className="rounded-lg transition-colors duration-150 focus:bg-green-dark focus:text-white data-[highlighted]:bg-green-dark data-[highlighted]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-lemon-deep"></div>
                    Feedback & Suggestions
                  </div>
                </SelectItem>
                <SelectItem
                  value="other"
                  className="rounded-lg transition-colors duration-150 focus:bg-green-dark focus:text-white data-[highlighted]:bg-green-dark data-[highlighted]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-lemon-deep"></div>
                    Other Inquiry
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>

          <div>
            <div className="flex flex-col gap-2">
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
                  {...register("message")}
                  placeholder="Tell us how we can help you. Please include any relevant details like order numbers, product names, or specific questions..."
                  rows={6}
                  className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pl-10 text-sm transition-colors placeholder:text-gray-500 focus:border-green-dark focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-dark ${
                    errors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
              </div>
            </div>
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
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
            className="h-12 w-full rounded-xl bg-green-dark font-medium text-white transition-all duration-300 hover:bg-green-dark/90 lg:h-14 lg:text-lg"
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
