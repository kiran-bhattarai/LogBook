import express from 'express';
import cors from "cors"
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import noteRouter from "./routes/note.route.js"
import profileRouter from "./routes/profile.route.js"
import { globalErrorHandler } from './middlewares/global-error-handler.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))
app.use(cookieParser());

app.use("/auth", authRouter)
app.use("/note", noteRouter)
app.use("/profile", profileRouter)

app.use(globalErrorHandler)

export default app;