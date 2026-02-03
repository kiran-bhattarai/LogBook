import mongoose from "mongoose"
import { profileFetch as profileFetchService } from "../services/profile.service.js"


export const profileFetch = async (req, res, next) => {
    try {
        let id = req.query?.id
        const requestId = req.user?.sub

        if(id){
            if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({ message: "Invalid user id" });
            }            
        }

        if (!requestId && !id) {
            return res.status(400).json({ message: "Please login or provide user id" })
        }

        if (!id) {
            id = requestId
        }

        const { name, publicNotes } = await profileFetchService(id)

        if (!name) {
            return res.status(400).json({ message: "User doesnt exists" })
        }

        res.status(200).json({ name, publicNotes })

    }
    catch (err) {
        next(err)
    }
}