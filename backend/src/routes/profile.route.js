import { Router } from "express";
import { profileFetch } from "../controllers/profile.controller.js";
import { authenticate, authenticateButNotForced } from "../middlewares/authenticate.js";

const router = Router()

router.get("/fetch", authenticateButNotForced, profileFetch)

export default router