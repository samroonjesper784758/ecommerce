import { Request, Response } from "express";
import * as cartServices from "../services/cart.services";

export const handleAddItemToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product Id or quantity is required" });
  }

  const response = await cartServices.handleAddItemToCart(
    productId,
    quantity,
    req.user.id
  );

  return res.status(200).send(response);
};

export const removeItemFromCart = async (req: Request, res: Response) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Product id is required." });
  }

  const response = await cartServices.removeItemFromCart(
    productId,
    req.user.id
  );

  return res
    .status(200)
    .json({ message: "Item deleted successfully", deletedItem: response });
};
