import { NextFunction, Request, Response } from "express";
import {
  validateDeleteManyProductsSchema,
  validateProductsArraySchema,
  validateProductSchema,
} from "../schema/product.schema";
import * as productServices from "../services/product.services";
import { NotFoundExceptions } from "../exceptions/notFoudException";
import { ErrorCode } from "../exceptions/root";
import { createProductDto } from "../interfaces/product.interfaces";

export const createProduct = async (req: Request, res: Response) => {
  const data = validateProductSchema.parse(req.body) as createProductDto;
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
  const page = req.query.page ? parseInt(req.query.page as string) : null;
  const pageSize = req.query.pageSize
    ? parseInt(req.query.pageSize as string)
    : null;

  const { products, total } = await productServices.listProducts(
    page,
    pageSize
  );
  if (!products) {
    throw new NotFoundExceptions(
      "There are no products available",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
  return res.status(200).send({
    products,
    total,
  });
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

export const createManyProducts = async (req: Request, res: Response) => {
  const data = validateProductsArraySchema.parse(req.body);
  const { count } = await productServices.createManyProducts(
    data.products as createProductDto[]
  );

  return res.status(201).json({
    message: "Successfully created products",
    numberOfRecords: count,
  });
};

export const deleteManyProducts = async (req: Request, res: Response) => {
  console.log("----------");
  const data = validateDeleteManyProductsSchema.parse(req.body);
  const { count } = await productServices.deleteManyProducts(data.ids);
  return res.status(200).json({
    message: "Records with ids deleted successfully",
    deletedCount: count,
  });
};
