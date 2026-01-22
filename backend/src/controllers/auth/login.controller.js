import { login as loginService } from "../../services/auth/login.service.js"

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.status(400).json({ message: "Missing data(s)" })
        }

        const { accessToken, refreshToken } = await loginService(email, password)

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "lax" })

        return res.status(200).json({ message: "User logged in successfully.", token: accessToken, refreshToken: refreshToken })
    }
    catch (err) {
        next(err)
    }
}