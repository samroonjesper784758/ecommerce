import { Router } from "express";
import { handleCreateUser,handleSignIn } from "../controllers";

const router:Router = Router();

router.post("/sign-up", handleCreateUser);
router.post("/login", handleSignIn);

export default router;
