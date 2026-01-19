import AppError from "../../errors/app-error.js"
import { isValidName, isValidEmail, isValidPassword } from "../../utils/validator.js"
import Users from "../../models/user.model.js"
import { generateHash } from "../../utils/bcrypt.js"
import { issueAccessToken } from "../../utils/jwt.js"
import { generateRefreshToken } from "./refresh-token.service.js"


export const signup = async (name, email, password) => {

    if (!isValidName(name)) throw new AppError("Name must be 3–20 characters and can only include letters, numbers, and underscore.", 400)

    if (!isValidEmail(email)) throw new AppError("Invalid email.", 400)

    if (!isValidPassword(password)) throw new AppError("Password should be atleast 8 characters, including one uppercase letter, one lowercase letter, one number, and one special symbol.", 400)

    const prevUser = await Users.findOne({ email: email })
    if (prevUser) throw new AppError("Email already in use.", 400)

    const passwordHash = await generateHash(password)

    const user = await Users.create({
        name, email, password: passwordHash
    })

    console.log(user)
    const accessToken = issueAccessToken(user._id.toString(), user.role)
    const refreshToken = await generateRefreshToken(user._id.toString())
    
    return { accessToken, refreshToken }
}