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

export const listProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
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
