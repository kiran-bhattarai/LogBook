import { Router } from "express";
import { profileFetch, profilesSearch, changeAvatar } from "../controllers/profile.controller.js";
import { authenticate, authenticateButNotForced } from "../middlewares/authenticate.js";
import { upload } from "../config/multer.config.js";
import { isVerified } from "../middlewares/is-verified.js";
import { globalLimiter } from "../middlewares/rateLimit.js";

const router = Router()

router.get("/fetch", authenticateButNotForced, globalLimiter, profileFetch)
router.get("/search", globalLimiter, profilesSearch)
router.post("/avatar", authenticate, globalLimiter, isVerified, (req, res) => upload.single("image")(req, res, async (err) => {
    if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ message: "File size too large. Max 5MB allowed." });
        }

        return res.status(400).json({ message: err.message });
    }
    changeAvatar(req, res)
}));

export default router