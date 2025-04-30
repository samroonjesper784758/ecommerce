import { Router } from "express";
import { errorHandler } from "../errorHandler";
import * as cartController from "../controllers/cart.controllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.post(
  "/addItemToCart",
  [authMiddleware],
  errorHandler(cartController.handleAddItemToCart)
);

router.patch(
  "/removeItemFromCart",
  [authMiddleware],
  errorHandler(cartController.removeItemFromCart)
);

router.patch(
  "/:cartId/change-quantity",
  [authMiddleware],
  errorHandler(cartController.handleChangeQuantity)
);

router.get("/user", [authMiddleware], errorHandler(cartController.getUserCart));

export default router;
