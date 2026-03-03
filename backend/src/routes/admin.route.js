import { Router } from "express";
import { dashboard, users, changeName, removeAvatar, changeRole, deleteUser } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { requireAdmin } from "../middlewares/require-admin.js";


const router = Router()

router.get("/dashboard", authenticate, requireAdmin, dashboard)
router.get("/users", authenticate, requireAdmin, users)

router.post("/change-name", authenticate, requireAdmin, changeName)
router.post("/remove-avatar", authenticate, requireAdmin, removeAvatar)
router.post("/change-role", authenticate, requireAdmin, changeRole)
router.post("/delete-user", authenticate, requireAdmin, deleteUser)

export default router