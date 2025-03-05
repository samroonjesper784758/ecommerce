import { Router } from "express";
import { handleCreateUser } from "../controllers";

const router:Router = Router();

router.post("/signup", handleCreateUser);

export default router;
