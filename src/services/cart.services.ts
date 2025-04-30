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

export const removeItemFromCart = async (
  productId: string,
  userId: string,
  productQuantity: number
) => {
  const cartItem = await prisma.cart.findFirst({
    where: {
      productId,
      userId,
    },
  });

  if (!cartItem) {
    throw new NotFoundExceptions(
      "Product not found in cart",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  const newQuantity = cartItem.quantity - productQuantity;

  if (newQuantity <= 0) {
    const deletedItem = await prisma.cart.delete({
      where: {
        id: cartItem.id,
      },
    });

    return {
      action: "DELETED",
      deletedItem,
    };
  } else {
    const updatedItem = await prisma.cart.update({
      where: { id: cartItem.id },
      data: {
        quantity: newQuantity,
        totalPrice: cartItem.price * newQuantity,
      },
    });

    return {
      action: "UPDATED",
      updatedItem,
    };
  }
};

export const getUserCart = async (userId: string) => {
  const cartItems = await prisma.cart.findMany({
    where: { userId },
  });

  return {
    userCart: cartItems,
  };
};

export const handleChangeQuantity = async (
  cartId: string,
  quantity: number
) => {
  const cartItem = await prisma.cart.findFirst({
    where: { id: cartId },
  });

  if (!cartItem) {
    throw new NotFoundExceptions(
      "Cart item not found",
      ErrorCode.CART_ITEM_NOT_FOUND
    );
  }

  const updatedCart = await prisma.cart.update({
    where: { id: cartId },
    data: {
      quantity,
      totalPrice: cartItem.price * quantity,
    },
  });

  return updatedCart;
};
