import jwt from "jsonwebtoken"

export const issueAccessToken = (userId) => {
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}
