export const isVerified = (req, res, next) => {
    try {

        if (!req.user.verified) return res.status(403).json({ message: "Account unverified" })

        next()
    }
    catch (err) {
        next(err)
    }
}