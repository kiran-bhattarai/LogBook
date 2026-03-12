import { createClient } from "redis"
import logger from "./logger"

export const redisClient = createClient({
    url: process.env.REDIS_URL
})

redisClient.on("error", (err) => {
    logger.error(err)
})

redisClient.on("connect", () => {
    logger.info("Redis connected")
})

redisClient.on("reconnecting", () => {
    logger.info("Redis reconnecting...")
})

redisClient.connect()