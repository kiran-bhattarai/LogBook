import mongoose from "mongoose"
import { profileFetch as profileFetchService, profilesSearch as profilesSearchService, changeAvatar as changeAvatarService } from "../services/profile.service.js"


export const profileFetch = async (req, res, next) => {
    try {
        let id = req.query?.id
        const requestId = req.user?.sub

        if (id) {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid user id" });
            }
        }

        if (!requestId && !id) {
            return res.status(400).json({ message: "Please login or provide user id" })
        }

        if (!id) {
            id = requestId
        }

        const { name, publicNotes, avatar } = await profileFetchService(id)

        if (!name) {
            return res.status(400).json({ message: "User doesnt exists" })
        }

        res.status(200).json({ name, publicNotes, avatar })

    }
    catch (err) {
        next(err)
    }
}

export const profilesSearch = async (req, res, next) => {
    try {
        const searchTerm = req.query?.term

        if (!searchTerm || searchTerm.trim() === "") {
            return res.status(400).json({ message: "Nothing to search" })
        }

        const foundUsers = await profilesSearchService(searchTerm)

        res.status(200).json({ foundUsers })

    }
    catch (err) {
        next(err)
    }
}

export const changeAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        await changeAvatarService(req.user.sub, req.file)

        res.status(200).json({ message: "Upload success" })
    }
    catch (err) {
        next(err)
    }
}