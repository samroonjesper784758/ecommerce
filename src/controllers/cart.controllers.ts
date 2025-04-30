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

export const getUserCart = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { userCart } = await cartServices.getUserCart(userId);

  return res.status(200).send(userCart);
};

export const handleChangeQuantity = async (req: Request, res: Response) => {
  const { cartId } = req.params;
  const { quantity } = req.body;

  if (typeof quantity !== "number" || quantity < 1) {
    return res.status(400).json({ message: "Invalid quantity value" });
  }
  const response = await cartServices.handleChangeQuantity(
    cartId,
    quantity
  );

  return res.status(201).json({
    message: "success",
    updatedCart: response,
  });
};
