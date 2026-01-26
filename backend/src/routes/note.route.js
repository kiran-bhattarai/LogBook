import { Router } from "express";
import { noteSave, noteFetch } from "../controllers/note.controller.js";
import { authenticate } from "../middlewares/authenticate.js";


const router = Router()

router.post("/create", authenticate, noteSave)
router.get("/fetch", authenticate, noteFetch)

export default router