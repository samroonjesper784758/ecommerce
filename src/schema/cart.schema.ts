import { z } from "zod";

export const validateAddItemToCartSchema = z.object({
  productId: z.string({ required_error: "ProductId is required" }),
  quantity: z.coerce
    .number({ required_error: "Number is required" })
    .int()
    .positive(),
});

export const validateRemoveItemFromCartSchema = z.object({
    productId: z.string({ required_error: "Product id is required." }),
    quantity: z
      .coerce
      .number()
      .int("Quantity must be an integer")
      .positive("Quantity must be greater than 0")
      .optional(),
  });
