import { dashboard as dashboardService, users as usersService } from "../services/admin.service.js"

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