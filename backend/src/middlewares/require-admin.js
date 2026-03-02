export const requireAdmin = (req, res, next) => {
    try {

        if (req.user.role !== "admin") return res.status(403).json({ message: "Unauthorized" })

        next()
    }
    catch (err) {
        next(err)
    }
}