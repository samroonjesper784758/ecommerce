import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorHandler";
import * as orderControllers from "../controllers/order.controllers"

const router = Router()

router.post("/create-order",[authMiddleware], errorHandler(orderControllers.handleCreateOrder))

export default router