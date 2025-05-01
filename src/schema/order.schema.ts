import { z } from "zod";

export const validateCreateOrderSchema = z.object({
  address: z.string({ required_error: "Address is required" }),
});
