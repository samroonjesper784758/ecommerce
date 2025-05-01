import { BadRequestException } from "../exceptions/badRequestException";
import { ErrorCode } from "../exceptions/root";
import { prisma } from "../prisma";

export const handleCreateOrder = async (userId: string, address: string) => {
  const userCart = await prisma.cart.findMany({
    where: { userId },
    select: {
      id: true,
      productId: true,
      quantity: true,
      totalPrice: true,
    },
  });

  if (userCart.length === 0) {
    throw new BadRequestException("Cart is empty", ErrorCode.CART_IS_EMPTY);
  }

  const netAmount = userCart.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);

  return await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId,
        netAmount,
        address,
      },
    });

    const orderProduct = userCart.map((item) => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
    }));

    await tx.orderProduct.createMany({ data: orderProduct });

    await tx.orderEvent.create({
      data: {
        orderId: newOrder.id,
        status: "PENDING",
      },
    });

    await tx.cart.deleteMany({ where: { userId } });

    return newOrder;
  });
};
