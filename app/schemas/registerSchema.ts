import { z } from "zod";

export const registerSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  personName: z.string().min(1, "Person name is required"),

  mobile: z
    .string()
    .min(10, "Mobile must be 10 digits")
    .max(10, "Mobile must be 10 digits"),

  altMobile: z.string().optional(),

  address: z.string().min(1, "Address is required"),

  website: z.string().optional(),

  // GST OPTIONAL
  gstNumber: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length === 15,
      "GST Number must be exactly 15 characters"
    ),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
