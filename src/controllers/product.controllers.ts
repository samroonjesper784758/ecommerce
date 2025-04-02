import { NextFunction, Request, Response } from "express";
import { validateProductSchema } from "../schema/product.schema";
import * as productServices from "../services/product.services";

export const createProduct = async (
  req: Request,
  res: Response,
) => {
  const data = validateProductSchema.parse(req.body);
  const product = await productServices.createProduct(data);

  res.status(201).json({
    message: "Poduct created succesfully",
    product,
  });
};
