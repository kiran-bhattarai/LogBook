import { isValidPassword } from "../../utils/validator.js"
import AppError from "../../errors/app-error.js"
import Users from "../../models/user.model.js"
import { sendEmailVerificationCode } from "../../utils/email.js"
import { generateCode } from "../../utils/number-generator.js"
import { compareHash, generateHash } from "../../utils/bcrypt.js"

export const generateEmailToken = async (userId) => {
    const code = generateCode()

    const user = await Users.findById(userId)

    if (!user.providers?.local) {
        throw new AppError("Please login using Google or Facebook", 400)
    }

    user.verificationCode = code
    user.verificationExpires = Date.now() + 20 * 60 * 1000
    user.verificationTries = 0

    await user.save()

    await sendEmailVerificationCode(user.email, code)
}

export const getEmail = async (userId) => {
    const user = await Users.findById(userId).select("email")
    return user.email
}

export const verifyEmail = async (userId, code) => {

    const user = await Users.findById(userId)


    const now = new Date()
    const expiry = new Date(user.verificationExpires);

    if (!user.providers?.local) {
        throw new AppError("Please login using Google or Facebook", 400)
    }

    if (user.isVerified) {
        throw new AppError("User is already verified", 400)
    }

    if (now > expiry) {
        throw new AppError("Verification code expired", 400)
    }

    if (user.verificationTries > 3) {
        throw new AppError("Max retries limit (3) reached", 400)
    }

    if (user.verificationCode !== code) {
        user.verificationTries += 1
        user.save()
        throw new AppError("Invalid code", 400)
    }

    user.isVerified = true

    user.verificationTries = 0
    user.verificationCode = null
    user.verificationExpires = null

    user.save()

}

export const checkEmail = async (email) => {

    const user = await Users.findOne({ email })

    if (!user) {
        throw new AppError("Account doesn't exist", 400)
    }

    if (!user.providers?.local) {
        throw new AppError("Please login using Google or Facebook", 400)
    }
    if (!user.isVerified) {
        throw new AppError("Email not verified", 400)
    }
    await generateEmailToken(user._id)
}

export const verifyPasswordReset = async (email, code) => {

    const user = await Users.findOne({ email })


    if (!user) {
        throw new AppError("Please provide an valid email.", 400)
    }

    if (!user.providers?.local) {
        throw new AppError("Please login using Google or Facebook", 400)
    }

    if (!user.verificationExpires) {
        throw new AppError("No verification code was been sent to you.", 400)
    }

    const now = new Date()
    const expiry = new Date(user.verificationExpires);

    if (!user.isVerified) {
        throw new AppError("Email isn't verified", 400)
    }

    if (now > expiry) {
        throw new AppError("Verification code expired", 400)
    }

    if (user.verificationTries > 3) {
        throw new AppError("Max retries limit (3) reached", 400)
    }


    if (user.verificationCode !== code) {
        user.verificationTries += 1
        user.save()
        throw new AppError("Invalid code", 400)
    }

    user.verificationTries = 0
    user.save()

}


export const changePasswordMain = async (email, code, password) => {

    const user = await Users.findOne({ email })

    const now = new Date()
    const expiry = new Date(user.verificationExpires + 10 * 60 * 1000);


    if (!user.providers?.local) {
        throw new AppError("Please login using Google or Facebook", 400)
    }

    if (!user.isVerified) {
        throw new AppError("Email isn't verified", 400)
    }

    if (now > expiry) {
        throw new AppError("Verification code expired", 400)
    }

    if (user.verificationCode !== code) {
        user.verificationTries += 1
        user.save()
        throw new AppError("Invalid code", 400)
    }

    if (!isValidPassword(password)) {
        throw new AppError("Password should be atleast 8 characters, including one uppercase letter, one lowercase letter, one number, and one special symbol.", 400)
    }

    const isSamePassword = await compareHash(password, user.password)
    if (isSamePassword) {
        throw new AppError("New password cannot be same as old password", 400)
    }

    const passwordHash = await generateHash(password)

    user.password = passwordHash

    user.verificationTries = 0
    user.verificationCode = null
    user.verificationExpires = null

    user.save()
}
