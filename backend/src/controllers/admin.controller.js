import { dashboard as dashboardService, users as usersService, changeName as changeNameService, removeAvatar as removeAvatarService, changeRole as changeRoleService, deleteUser as deleteUserService } from "../services/admin.service.js"

export const dashboard = async (req, res, next) => {
    try {
        const analytics = await dashboardService()

        return res.status(200).json(analytics)
    }
    catch (err) {
        next(err)
    }
}

export const users = async (req, res, next) => {
    try {
        const sortId = parseInt(req.query.sortId) || 1
        const name = req.query.name || ""

        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const users = await usersService(name, sortId, page, limit)
        return res.status(200).json(users)
    }
    catch (err) {
        next(err)
    }
}

export const changeName = async (req, res, next) => {
    try {
        const userId = req.query.userId
        const newName = req.body?.newName

        if (!(userId && newName)) {
            return res.status(400).json({ message: "Incomplete data" })
        }

        await changeNameService(userId, newName)
        return res.status(200).json({ message: "Name change successful" })

    }
    catch (err) {
        next(err)
    }
}

export const removeAvatar = async (req, res, next) => {
    try {
        const userId = req.query.userId
        if (!userId) {
            return res.status(400).json({ message: "User id not valid" })
        }

        await removeAvatarService(userId)
        return res.status(200).json({ message: "Avatar removed successfully" })
    }
    catch (err) {
        next(err)
    }
}

export const changeRole = async (req, res, next) => {
    try {

        const userId = req.query.userId
        const adminId = req.user.sub

        if (!userId) {
            return res.status(400).json({ message: "User id not valid" })
        }

        await changeRoleService(userId, adminId)
        return res.status(200).json({ message: "Role changed successfully" })
    }
    catch (err) {
        next(err)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.query.userId
        const adminId = req.user.sub

        if (!userId) {
            return res.status(400).json({ message: "User id not valid" })
        }

        await deleteUserService(userId, adminId)
        return res.status(200).json({ message: "User deleted successfully" })

    }
    catch (err) {
        next(err)
    }
}