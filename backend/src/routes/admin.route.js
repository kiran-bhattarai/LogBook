import { Router } from "express";
import { dashboard } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { requireAdmin } from "../middlewares/require-admin.js";


const router = Router()

router.get("/dashboard", authenticate, requireAdmin, dashboard)

export default router