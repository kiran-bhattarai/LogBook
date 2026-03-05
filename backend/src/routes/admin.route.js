import { Router } from "express";
import { dashboard, users, changeName, removeAvatar, changeRole, deleteUser } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { requireAdmin } from "../middlewares/require-admin.js";
import { isVerified } from "../middlewares/is-verified.js";

const router = Router()

router.get("/dashboard", authenticate, requireAdmin, isVerified, dashboard)
router.get("/users", authenticate, requireAdmin, isVerified, users)

router.post("/change-name", authenticate, requireAdmin, isVerified, changeName)
router.post("/remove-avatar", authenticate, requireAdmin, isVerified, removeAvatar)
router.post("/change-role", authenticate, requireAdmin, isVerified, changeRole)
router.post("/delete-user", authenticate, requireAdmin, isVerified, deleteUser)

export default router