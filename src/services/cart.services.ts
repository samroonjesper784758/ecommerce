import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { NotFoundExceptions } from "../exceptions/notFoudException";
import { ErrorCode } from "../exceptions/root";

export const handleAddItemToCart = async (
  productId: string,
  quantity: number,
  userId: string
) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new NotFoundExceptions(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
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
    },
  });

  return newCartItem;
};

export const removeItemFromCart = async (productId: string, userId: string) => {
  const cartItem = await prisma.cart.findFirst({
    where: {
      productId,
      userId,
    },
  });

  if (!cartItem) {
    throw new NotFoundExceptions(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  return await prisma.cart.delete({
    where: {
      id: cartItem.id,
    },
  });
};
