import { Router } from "express";
import { sign_in, sign_up, logout } from "@/service/auth/index.js";

const router: Router = Router();

router.post("/sign-in", sign_in);
router.post("/sign-up", sign_up);
router.post("/logout", logout);

export default router;
