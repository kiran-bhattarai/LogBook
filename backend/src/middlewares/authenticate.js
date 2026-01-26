import { verifyAccessToken } from "../utils/jwt.js"


export const authenticate = (req, res, next) => {
    try {

        const token = req.headers?.authorization.split(" ")[1]

        if (!token) return res.status(401).json({ message: "Invalid token" })
        req.user = verifyAccessToken(token)

        next()
    }
    catch (err) {
        res.status(401).json({ message: "Invalid token" })
    }
}