import { Request, Response } from "express";
import * as orderServices from "../services/order.services";
import { validateCreateOrderSchema } from "../schema/order.schema";

export const handleCreateOrder = async (req: Request, res: Response) => {
  const { address } = validateCreateOrderSchema.parse(req.body);
  const newOrder = await orderServices.handleCreateOrder(req.user.id, address);
  return res.status(201).json({
    message: "Order created successfully",
    order: newOrder,
  });
};
