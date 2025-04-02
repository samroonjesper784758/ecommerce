import { Router } from "express";
import * as productController from "../controllers/product.controllers";
import { errorHandler } from "../errorHandler";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();

router.post(
  "/create",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.createProduct)
);

export default router;
