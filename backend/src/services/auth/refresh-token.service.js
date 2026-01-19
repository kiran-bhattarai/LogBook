import { generateHash } from "../../utils/bcrypt.js"
import RefreshToken from "../../models/refesh-token.model.js"
import AppError from "../../errors/app-error.js"
import crypto from "crypto"

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

    const refreshTokenDb = await RefreshToken.findOne({ tokenId })
    if (!refreshTokenDb) {
        throw new AppError("Invalid refresh token", 403)
    }

    const isValid = await compareString(refreshToken, refreshTokenDb.tokenHash)
    if (!isValid) {
        throw new AppError("Invalid refresh token", 403)
    }

    if (refreshTokenDb.expiresAt < new Date()) {
        await RefreshToken.deleteOne({ tokenId: refreshTokenId })
        throw new AppError("Refresh token expired", 403)
    }

    await RefreshToken.deleteOne({ tokenId: refreshTokenId })

    const newTokenId = crypto.randomBytes(16).toString("hex")
    const newSecret = crypto.randomBytes(32).toString("hex")
    const newRefreshToken = `${newTokenId}.${newSecret}`

    const newTokenHash = await hashString(newRefreshToken)

    await RefreshToken.create({
        userId: refreshTokenDb.userId.toString(),
        tokenId: newTokenId,
        tokenHash: newTokenHash,
        device: refreshTokenDb.device,
        ip: refreshTokenDb.ip,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60 * 1000)
    })

    return newRefreshToken
}