import {
  createProductDto,
  UpdateProductDto,
} from "../interfaces/product.interfaces";
import { prisma } from "../prisma";

export const createProduct = async (data: createProductDto) => {
  const product = await prisma.product.create({
    data: {
      ...data,
    },
  });

  return product;
};

export const updateProduct = async (data: UpdateProductDto, id: string) => {
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: data,
  });

  return updatedProduct;
};

export const listProducts = async (
  page: number | null,
  pageSize: number | null
) => {
  if (page && pageSize) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count(), // Get total product count
    ]);

    return { products, total };
  }

  // If no pagination, fetch all products and count them together
  const [products, total] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.product.count(),
  ]);

  return { products, total };
};

export const getProductById = async (id: string) => {
  const product = await prisma.product.findFirst({
    where: { id: id },
  });

  return product;
};

export const deleteProductById = async (id: string) => {
  const product = await prisma.product.delete({
    where: { id: id },
  });

  return product;
};

export const createManyProducts = async (data: createProductDto[]) => {
  const count = await prisma.product.createMany({
    data,
  });
  return count;
};

export const deleteManyProducts = async (ids: string[]) => {
  const count = await prisma.product.deleteMany({
    where: { id: { in: ids } },
  });

  return count;
};
