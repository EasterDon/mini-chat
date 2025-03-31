import { Router } from "express";
import * as controller from "./controllers/auth/index.js";

const router: Router = Router();

router.post("/auth/sign-up", controller.sign_up_user);
router.post("/auth/sign-in", controller.sign_in_user);
router.post("/auth/logout", controller.logout_user);

export { router };
