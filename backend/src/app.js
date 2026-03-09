import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import noteRouter from "./routes/note.route.js"
import profileRouter from "./routes/profile.route.js"
import { globalErrorHandler } from './middlewares/global-error-handler.js';
import cookieParser from 'cookie-parser';
import passport from "passport"
import adminRouter from "./routes/admin.route.js"
import loggerMiddleware from './middlewares/logger-middleware.js';

dotenv.config();

const app = express();

app.use(loggerMiddleware)

app.use(express.json());
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))
app.use(cookieParser());

app.use(passport.initialize())

app.use("/auth", authRouter)
app.use("/note", noteRouter)
app.use("/profile", profileRouter)
app.use("/admin", adminRouter)

app.use(globalErrorHandler)

export default app;