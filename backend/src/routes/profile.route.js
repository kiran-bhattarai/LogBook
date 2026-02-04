import { Router } from "express";
import { profileFetch,  profilesSearch } from "../controllers/profile.controller.js";
import { authenticate, authenticateButNotForced } from "../middlewares/authenticate.js";

const router = Router()

router.get("/fetch", authenticateButNotForced, profileFetch)
router.get("/search", profilesSearch)

export default router