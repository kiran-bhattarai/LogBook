import validator from "validator"

export const isValidName = (name) => {
    return /^[a-zA-Z0-9_]{3,20}$/.test(name)
}

export const isValidEmail = (email) => {
    return validator.isEmail(email)
}

export const isValidPassword = (password) => {
    return validator.isStrongPassword(password)
}