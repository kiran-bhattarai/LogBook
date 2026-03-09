import logger from "../config/logger.js";

const loggerMiddleware = (req, res, next) => {

    if (req.method === "OPTIONS") return next()

    const start = Date.now();
    res.on('finish', () => {
        const responseTime = Date.now() - start;
        logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${responseTime}ms`);
    });
    next();
}

export default loggerMiddleware