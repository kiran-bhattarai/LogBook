import { generateHash, compareHash } from "../../utils/bcrypt.js"
import RefreshToken from "../../models/refesh-token.model.js"
import AppError from "../../errors/app-error.js"
import crypto from "crypto"
import { issueAccessToken } from "../../utils/jwt.js"
import User from "../../models/user.model.js"

export const generateRefreshToken = async (userId, device = "Unknown", ip = "0.0.0.0") => {
    const tokenId = crypto.randomBytes(16).toString("hex")
    const tokenSecret = crypto.randomBytes(32).toString("hex")

    const refreshToken = `${tokenId}.${tokenSecret}`

    const tokenHash = await generateHash(refreshToken)

    const expiresAt = Date.now() + process.env.REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000

    await RefreshToken.create({
        userId,
        tokenId,
        tokenHash,
        ip,
        device,
        expiresAt
    }) 

    return refreshToken
}

export const validateRefreshToken = async (refreshToken) => {
    const tokenId = refreshToken.split(".")[0]

    const refreshTokenDb = await RefreshToken.findOneAndDelete({ tokenId })
    if (!refreshTokenDb) {
        throw new AppError("Invalid refresh token", 403)
    }

    const isValid = await compareHash(refreshToken, refreshTokenDb.tokenHash)
    if (!isValid) {
        throw new AppError("Invalid refresh token", 403)
    }

    if (refreshTokenDb.expiresAt < new Date()) {
        throw new AppError("Refresh token expired", 403)
    }

    const newTokenId = crypto.randomBytes(16).toString("hex")
    const newSecret = crypto.randomBytes(32).toString("hex")
    const newRefreshToken = `${newTokenId}.${newSecret}`

    const newTokenHash = await generateHash(newRefreshToken)

    await RefreshToken.create({
        userId: refreshTokenDb.userId.toString(),
        tokenId: newTokenId,
        tokenHash: newTokenHash,
        device: refreshTokenDb.device,
        ip: refreshTokenDb.ip,
        expiresAt: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
    })

    return newRefreshToken
}

export const refreshEndpoint = async (refreshToken) => {
    const newRefToken = await validateRefreshToken(refreshToken)

    const tokenId = newRefToken.split(".")[0]
    const refreshTokenDb = await RefreshToken.findOne({ tokenId })
    const { role } = await User.findOne({_id: refreshTokenDb.userId})

    const newAccessToken = issueAccessToken(refreshTokenDb.userId.toString(), role)

    return { newRefToken, newAccessToken }
}