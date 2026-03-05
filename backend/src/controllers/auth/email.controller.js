import {
    checkEmail as checkEmailService, verifyEmail as verifyEmailService, generateEmailToken as generateEmailTokenService,
    getEmail as getEmailService, verifyPasswordReset as verifyPasswordResetService, changePasswordMain as changePasswordMainService
} from "../../services/auth/email.service.js"

export const generateEmailToken = async (req, res, next) => {
    try {

        const userId = req.user.sub
        await generateEmailTokenService(userId)

        res.status(200).json({ message: "Code sent successfully" })
    }
    catch (err) {
        next(err)
    }
}

export const getEmail = async (req, res, next) => {
    try {

        const userId = req.user.sub

        const email = await getEmailService(userId)

        res.status(200).json({ email })
    }
    catch (err) {
        next(err)
    }
}

export const verifyEmail = async (req, res, next) => {
    try {

        const userId = req.user.sub
        const code = req.body.code

        await verifyEmailService(userId, code)

        res.status(200).json({ message: "Email verified successfully" })
    }
    catch (err) {
        next(err)
    }
}

export const checkEmail = async (req, res, next) => {
    try {

        const email = req.body.email

        await checkEmailService(email)

        res.status(200).json({ message: "Email check successful" })

    }
    catch (err) {
        next(err)
    }
}

export const verifyPasswordReset = async (req, res, next) => {
    try {

        const email = req.body.email
        const code = req.body.code

        await verifyPasswordResetService(email, code)

        res.status(200).json({ message: "Code check successful" })
    }
    catch (err) {
        next(err)
    }
}

export const changePasswordMain = async (req, res, next) => {
    try {

        const email = req.body.email
        const code = req.body.code
        const newPassword = req.body.password

        await changePasswordMainService(email, code, newPassword)

        res.status(200).json({ message: "Password change successful" })
    }
    catch (err) {
        next(err)
    }
}