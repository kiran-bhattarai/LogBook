import { Router } from "express";
import { noteSave, noteFetch, noteDelete, noteEdit } from "../controllers/note.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import { isVerified } from "../middlewares/is-verified.js";

const router = Router()

router.post("/create", authenticate, isVerified, noteSave)
router.get("/fetch", authenticate, isVerified, noteFetch)
router.delete("/delete/:id", authenticate, isVerified, noteDelete)
router.post("/edit", authenticate, isVerified, noteEdit)

export default router