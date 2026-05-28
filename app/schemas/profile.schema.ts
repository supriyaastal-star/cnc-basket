import z from "zod";

export const profileSchema = z.object({
    name:z.string().min(2,"Name is required."),
    email:z.string().email("Invaid Email id"),
    phone: z.string().min(10,"phone number must be at least 10 digits"),
city:z.string().min(1,"city is required"),
state:z.string().min(1,"state is required."),
gst:z.string().optional().refine((val) => !val || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(val),
      { message: "Invalid GST number" } ),
});

export type ProfileFormData = z.infer<typeof profileSchema>;