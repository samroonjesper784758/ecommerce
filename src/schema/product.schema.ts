import { z } from "zod";

export const validateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  price: z.number().positive("Price must be a positive"),
});

export const validateProductsArraySchema = z.object({
  products: z.array(validateProductSchema).min(1, "Products array cannot be empty"),
});

export const validateDeleteManyProductsSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, "At least one product ID is required"),
});
