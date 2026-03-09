import { Router } from "express";
import { signup } from "../controllers/auth/signup.controller.js";
import { login, oauthLogin } from "../controllers/auth/login.controller.js";
import { refresh } from "../controllers/auth/refresh.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import passport from "../config/passport.js";
import { changePasswordMain, checkEmail, generateEmailToken, getEmail, verifyEmail, verifyPasswordReset } from "../controllers/auth/email.controller.js";
import { authLimiter } from "../middlewares/rateLimit.js";

const router = Router()

router.post("/signup", authLimiter, signup)
router.post("/login", authLimiter, login)
router.post("/refresh", refresh)
router.post("/logout", authenticate, logout)

router.get("/get-email", authenticate, authLimiter, getEmail)
router.post("/verify-email", authenticate, authLimiter, verifyEmail)
router.post("/send-code", authenticate, authLimiter, generateEmailToken)

router.post("/send-reset-code", authLimiter, generateEmailToken)
router.post("/check-email", authLimiter, checkEmail)
router.post("/check-reset-code", authLimiter, verifyPasswordReset)
router.post("/change-password-main", authLimiter, changePasswordMain)


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