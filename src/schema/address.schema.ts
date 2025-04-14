import { z } from "zod";

export const validateCreateAddressSchema = z.object({
  lineOne: z.string().min(1, "Address line one is required"),
  lineTwo: z.string().optional(),
  city: z.string().min(1, "City is required"),
  pinCode: z.string().min(1, "Pin code is required"),
  country: z.string().min(1, "Country is required"),
});

export const validateUpdateUser = z.object({
  defaultShippingAddressId: z.string()
})
