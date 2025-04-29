import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export const handleAddItemToCart = async (
  productId: string,
  quantity: number,
  userId: string
) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const existingProduct = await prisma.cart.findFirst({
    where: {
      productId,
      userId,
    },
  });

  if (existingProduct) {
    const newQuantity = existingProduct.quantity + quantity;
    const updatedCartItem = await prisma.cart.update({
      where: { id: existingProduct.id },
      data: {
        quantity: newQuantity,
        totalPrice: newQuantity * existingProduct.price,
        price: existingProduct.price,
      },
    });

    return updatedCartItem;
  }

  const newCartItem = await prisma.cart.create({
    data: {
      productId,
      quantity,
      userId,
      price: product.price,
      totalPrice: product.price * quantity,
    } as Prisma.CartUncheckedCreateInput,
  });

  return newCartItem;
};
