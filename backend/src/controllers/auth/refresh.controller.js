import { refreshEndpoint } from "../../services/auth/refresh-token.service.js";

export const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies?.refreshToken

        if (!refreshToken || refreshToken[0] === null) {
            return res.status(401).json({ message: "No refresh token" })
        }
        const { newRefToken, newAccessToken } = await refreshEndpoint(refreshToken)

        res.cookie("refreshToken", newRefToken, { httpOnly: true, secure: false, sameSite: "lax" })
        res.status(200).json({ message: "Refresh completed successfully", token: newAccessToken })

    } catch (err) {
        next(err)
    }
}