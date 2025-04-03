import { Router } from "express";
import * as productController from "../controllers/product.controllers";
import { errorHandler } from "../errorHandler";
import { authMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const router = Router();

router.post(    // create a product
  "/create",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.createProduct)
);

router.get(   // List all products  
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.listProducts)
);

router.get(   // Get product by id 
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.getProductById)
);

router.get(   // Delete product by id 
  "/delete/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.deleteProductById)
);

router.put(   // Update a product
  "/update/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(productController.updateProduct)
);

export default router;
