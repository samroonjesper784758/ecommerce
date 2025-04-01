import { Router } from "express";
import * as authController from "../controllers/auth.controllers"
import { errorHandler } from "../errorHandler";

const router = Router();

router.post("/signup", errorHandler(authController.signup))
router.post("/login", errorHandler(authController.login))

export default router
