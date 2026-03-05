import AppError from "../../errors/app-error.js"
import { isValidName, isValidEmail, isValidPassword } from "../../utils/validator.js"
import Users from "../../models/user.model.js"
import { generateHash } from "../../utils/bcrypt.js"
import { issueAccessToken } from "../../utils/jwt.js"
import { generateRefreshToken } from "./refresh-token.service.js"
import { generateEmailToken } from "./email.service.js"


export const signup = async (name, email, password) => {

    if (!isValidName(name)) throw new AppError("Name must be 3–20 characters and can only include letters, numbers, and underscore.", 400)

    if (!isValidEmail(email)) throw new AppError("Invalid email.", 400)

    if (!isValidPassword(password)) throw new AppError("Password should be atleast 8 characters, including one uppercase letter, one lowercase letter, one number, and one special symbol.", 400)

    const prevUser = await Users.findOne({ email: email })

    if (prevUser) {
        if (prevUser.providers?.local) {
            throw new AppError("Email already in use.", 400)
        }
        throw new AppError("Account exists with Google/Facebook. Please login using OAuth.", 400)
    }

    let role = "user"
    const anyPrevUser = await Users.findOne()
    if (!anyPrevUser) {
        role = "admin"
    }

    const passwordHash = await generateHash(password)

    const user = await Users.create({
        name, email, password: passwordHash, role
    })

    user.providers.local = true

    await generateEmailToken(user._id)

    user.save()

    const accessToken = issueAccessToken(user._id.toString(), user.role, user.isVerified)
    const refreshToken = await generateRefreshToken(user._id.toString())

    return { accessToken, refreshToken }
}