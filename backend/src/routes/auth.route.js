import { Router } from "express";
import { signup } from "../controllers/auth/signup.controller.js";
import { login, oauthLogin } from "../controllers/auth/login.controller.js";
import { refresh } from "../controllers/auth/refresh.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import passport from "../config/passport.js";

const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/refresh", refresh)
router.post("/logout", authenticate, logout)

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  oauthLogin
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
)

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false
  }),
  oauthLogin
);

export default router