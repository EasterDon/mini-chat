import { Router } from "express";
import * as auth from "#services/auth.js";

const router: Router = Router();

router.post("/sign-up", auth.sign_up);
router.post("/sign-in", auth.sign_in);
router.post("/logout", auth.logout);

export default router;
