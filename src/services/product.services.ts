import { createProductDto } from "../interfaces/product.interfaces";
import { prisma } from "../prisma";

export const createProduct = async (data: createProductDto) => {
  const product = await prisma.product.create({
    data: {
      ...data,
    },
  });

  return product;
};
