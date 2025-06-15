import { Router } from "express";
import auth_router from "./auth.js";
const router = Router();
router.post("/auth", auth_router);
export { router };
