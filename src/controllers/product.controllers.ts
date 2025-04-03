import { NextFunction, Request, Response } from "express";
import { validateProductSchema } from "../schema/product.schema";
import * as productServices from "../services/product.services";
import { NotFoundExceptions } from "../exceptions/notFoudException";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async (req: Request, res: Response) => {
  const data = validateProductSchema.parse(req.body);
  const product = await productServices.createProduct(data);

  res.status(201).json({
    message: "Poduct created succesfully",
    product,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedData = await productServices.updateProduct(updateFields, id);
    return res.status(201).json({
      message: "Product is updated successfully",
      product: updatedData,
    });
  } catch (error) {
    throw new NotFoundExceptions(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const listProducts = async (req: Request, res: Response) => {
  const products = await productServices.listProducts();
  if (!products) {
    throw new NotFoundExceptions(
      "There are no products available",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
  return res.status(200).send(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productServices.getProductById(id);
  if (!product) {
    throw new NotFoundExceptions(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
  return res.status(200).send(product);
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await productServices.deleteProductById(id);
  if (!product) {
    throw new NotFoundExceptions(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
  return res
    .status(200)
    .json({ message: "Product deleted successfully", product });
};
