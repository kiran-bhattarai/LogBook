import rateLimit from "express-rate-limit"
import { ipKeyGenerator } from "express-rate-limit"
import RedisStore from "rate-limit-redis"
import { redisClient } from "../config/redis.js"

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
        keyGenerator: (req) => {
        if (req.user) {
            return `user-${req.user.id}`;
        }
        return ipKeyGenerator(req);
    },
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args)
    }),
    handler: (req, res) => {
        res.status(429).json({
            status: false,
            message: "Too many requests. Try again in a while."
        })
    }
})

export const globalLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        if (req.user) {
            return `user-${req.user.id}`;
        }
        return ipKeyGenerator(req);
    },
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args)
    }),
    handler: (req, res) => {
        res.status(429).json({
            status: false,
            message: "Too many requests. Try again in a while."
        })
    }
})