import { Router } from "express";
import { sign_up, sign_in, logout } from "./controllers/auth/index.js";

const router: Router = Router();

router.post("/auth/sign-up", sign_up);
router.post("/auth/sign-in", sign_in);
router.post("/auth/logout", logout);

export { router };
