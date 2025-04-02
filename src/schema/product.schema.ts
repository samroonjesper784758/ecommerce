import { z } from "zod";

export const validateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  price: z.number(),
});
