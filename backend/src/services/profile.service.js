import User from "../models/user.model.js"
import Note from "../models/note.model.js"
import mongoose from "mongoose"
import cloudinary from "../config/cloudinary.js"

export const profileFetch = async (userId) => {

    const foundUser = await User.findOne({ _id: userId })
    const name = foundUser?.name
    const avatar = foundUser?.avatar
    const publicNotes = await Note.find({ userId, isPublic: true })

    return { name, publicNotes, avatar }
}

export const profilesSearch = async (searchTerm) => {

    const query = [];

    query.push({ name: { $regex: searchTerm, $options: "i" } });

    if (mongoose.Types.ObjectId.isValid(searchTerm)) {
        query.push({ _id: searchTerm });
    }

    const foundUsers = await User.find({ $or: query }).select("name _id avatar").limit(10);

    return foundUsers
}

export const changeAvatar = async (userId, imageFile) => {

    const base64 = imageFile.buffer.toString("base64")

    const result = await cloudinary.uploader.upload(
        `data:${imageFile.mimetype};base64,${base64}`,
        {
            folder: "logbook_avatars",
            transformation: [
                { width: 96, height: 96, crop: "fill" },
                { quality: "auto" },
                { fetch_format: "auto" }
            ]
        }
    )

    const user = await User.findById(userId)
    user.avatar = result.secure_url
    user.save()
}