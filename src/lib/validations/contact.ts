import { z } from "zod";

// Contact form validation schema - Relaxed version
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be less than 50 characters")
    .trim(),

  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .max(100, "Email must be less than 100 characters")
    .toLowerCase()
    .trim(),

  subject: z
    .string()
    .min(1, "Please select a subject")
    .refine((value) => {
      const validSubjects = [
        "order-inquiry",
        "product-question",
        "shipping-delivery",
        "returns-refunds",
        "technical-support",
        "partnership",
        "feedback",
        "other",
      ];
      return validSubjects.includes(value);
    }, "Please select a valid subject"),

  message: z
    .string()
    .min(5, "Message must be at least 5 characters long")
    .max(1000, "Message must be less than 1000 characters")
    .trim(),
});

// Type inference from the schema
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Validation error messages
export const contactFormErrors = {
  name: {
    required: "Full name is required",
    min: "Name must be at least 2 characters long",
    max: "Name must be less than 50 characters",
  },
  email: {
    required: "Email address is required",
    invalid: "Please enter a valid email address",
    max: "Email must be less than 100 characters",
  },
  subject: {
    required: "Please select a subject",
    invalid: "Please select a valid subject",
  },
  message: {
    required: "Message is required",
    min: "Message must be at least 5 characters long",
    max: "Message must be less than 1000 characters",
  },
} as const;
