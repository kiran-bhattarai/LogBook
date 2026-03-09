import { Router } from "express";
import { dashboard, users, changeName, removeAvatar, changeRole, deleteUser } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { requireAdmin } from "../middlewares/require-admin.js";
import { isVerified } from "../middlewares/is-verified.js";
import { globalLimiter } from "../middlewares/rateLimit.js";

const router = Router()

router.use(authenticate, requireAdmin, isVerified, globalLimiter)

router.get("/dashboard", dashboard)
router.get("/users", users)

router.post("/change-name", changeName)
router.post("/remove-avatar", removeAvatar)
router.post("/change-role", changeRole)
router.post("/delete-user", deleteUser)

export default router