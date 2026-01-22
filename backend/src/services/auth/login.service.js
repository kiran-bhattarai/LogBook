import AppError from "../../errors/app-error.js"
import { isValidEmail, isValidPassword } from "../../utils/validator.js"
import Users from "../../models/user.model.js"
import { compareHash } from "../../utils/bcrypt.js"
import { issueAccessToken } from "../../utils/jwt.js"
import { generateRefreshToken } from "./refresh-token.service.js"


export const login = async (email, password) => {

    if (!isValidEmail(email) || !isValidPassword) throw new AppError("Invalid email or password.", 400)

    const prevUser = await Users.findOne({ email: email })
    if (!prevUser) throw new AppError("Invalid email or password.", 400)

    const isValid = await compareHash(password, prevUser.password)
    if (!isValid) throw new AppError("Invalid email or password.", 400)

    const accessToken = issueAccessToken(prevUser._id.toString(), prevUser.role)
    const refreshToken = await generateRefreshToken(prevUser._id.toString())
    
    return { accessToken, refreshToken }
}