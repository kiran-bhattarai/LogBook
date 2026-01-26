import { Router } from "express";
import { noteSave, noteFetch, noteDelete } from "../controllers/note.controller.js";
import { authenticate } from "../middlewares/authenticate.js";


const router = Router()

router.post("/create", authenticate, noteSave)
router.get("/fetch", authenticate, noteFetch)
router.delete("/delete/:id", authenticate, noteDelete)

export default router