import { Router } from "express";
import { errorHandler } from "../errorHandler";
import * as addressController from "../controllers/address.controllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  errorHandler(addressController.handleCreateAddress)
);

router.get(
  "/list",
  authMiddleware,
  errorHandler(addressController.handleGetAllAddresses)
);

router.delete(
  "/:id",
  authMiddleware,
  errorHandler(addressController.handleDeleteAddressById)
);

router.patch("/update/:id", authMiddleware, errorHandler(addressController.handleUpdateAddressById))

export default router;
