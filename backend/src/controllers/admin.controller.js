import { dashboard as dashboardService } from "../services/admin.service.js"

export const dashboard = async (req, res, next) => {
    try {
        const analytics = await dashboardService()

        return res.status(200).json(analytics)
    }
    catch (err) {
        next(err)
    }
}