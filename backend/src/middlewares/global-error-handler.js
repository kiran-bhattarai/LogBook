import logger from "../config/logger.js"

export const globalErrorHandler = (err, req, res, next) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({ message: err.message })
    }

    logger.error({
        message: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method
    })
    
    return res.status(500).json("Something went wrong")
}