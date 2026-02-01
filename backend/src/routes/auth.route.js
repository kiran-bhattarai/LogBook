import { Router } from "express";
import { signup } from "../controllers/auth/signup.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import { refresh } from "../controllers/auth/refresh.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/refresh", refresh)
router.post("/logout", authenticate, logout)

export default router