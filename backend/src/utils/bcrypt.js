import bcrypt from "bcrypt"

export const generateHash = async (string) => {
    const hash = await bcrypt.hash(string, 10)
    return hash
}

export const compareHash = async (string, hash) => {
    const result = await bcrypt.compare(string, hash)
    return result
}