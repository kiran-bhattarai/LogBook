import { Router } from "express";
import { noteSave, noteFetch, noteDelete, noteEdit } from "../controllers/note.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { isVerified } from "../middlewares/is-verified.js";
import { globalLimiter } from "../middlewares/rateLimit.js";

const router = Router()

router.use(authenticate, isVerified, globalLimiter)

router.post("/create", noteSave)
router.get("/fetch", noteFetch)
router.delete("/delete/:id", noteDelete)
router.post("/edit", noteEdit)

export default router