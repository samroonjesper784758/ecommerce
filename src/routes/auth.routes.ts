import { Router } from "express";
import * as authController from "../controllers/auth.controllers"
import { errorHandler } from "../errorHandler";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", errorHandler(authController.signup))
router.post("/login", errorHandler(authController.login))
router.get("/me",[authMiddleware], errorHandler(authController.me))

export default router
