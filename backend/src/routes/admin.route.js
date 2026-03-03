import { Router } from "express";
import { dashboard, users } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { requireAdmin } from "../middlewares/require-admin.js";


const router = Router()

router.get("/dashboard", authenticate, requireAdmin, dashboard)
router.get("/users", authenticate, requireAdmin, users)

export default router