import { Router } from "express";
import { errorHandler } from "../errorHandler";
import * as cartController from "../controllers/cart.controllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

router.post("/addItemToCart",[authMiddleware], errorHandler(cartController.handleAddItemToCart));

export default router;
