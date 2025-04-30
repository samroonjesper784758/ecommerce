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
  const { productId, quantity } = req.body;
  const productQuantity: number = quantity ?? 1;

  if (!productId) {
    return res.status(400).json({ message: "Product id is required." });
  }

  const { action, deletedItem, updatedItem } =
    await cartServices.removeItemFromCart(
      productId,
      req.user.id,
      productQuantity
    );

  return res
    .status(200)
    .json(
      action === "DELETED"
        ? { message: "Deleted item successfully", deletedItem }
        : { message: "updated item successfully", updatedItem }
    );
};
