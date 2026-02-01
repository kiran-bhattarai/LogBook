import { logout as logoutService } from "../../services/auth/logout.service.js"

export const logout = async (req, res, next) => {
    const refreshTokenId = req.cookies.refreshToken.split(".")[0]
    const userId = req.user.sub

    res.clearCookie("refreshToken", { httpOnly: true, secure: false, sameSite: "lax" })
    
    await logoutService(userId, refreshTokenId)
    res.status(200).json({ message: "Logout successful" })
}