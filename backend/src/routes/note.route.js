import { Router } from "express";
import { noteSave, noteFetch, noteDelete, noteEdit } from "../controllers/note.controller.js";
import { authenticate } from "../middlewares/authenticate.js";


const router = Router()

router.post("/create", authenticate, noteSave)
router.get("/fetch", authenticate, noteFetch)
router.delete("/delete/:id", authenticate, noteDelete)
router.post("/edit", authenticate, noteEdit)

export default router