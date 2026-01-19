import { signup as signupService } from "../../services/auth/signup.service.js"

export const signup = async (req, res, next) => {
    try {
        const { name, email, password, passwordRetype } = req.body

        if (!(name && email && password && passwordRetype)) {
            return res.status(400).json({ message: "Missing data(s)" })
        }

        if (password !== passwordRetype) {
            return res.status(400).json({ message: "Please confirm your password" })
        }

        const { accessToken, refreshToken } = await signupService(name, email, password)

        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "lax" })

        return res.status(200).json({ message: "User registered successfully.", token: accessToken, refreshToken: refreshToken })
    }
    catch (err) {
        next(err)
    }
}