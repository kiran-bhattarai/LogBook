import User from "../models/user.model.js"
import Note from "../models/note.model.js"
import mongoose from "mongoose"

export const profileFetch = async (userId) => {

    const foundUser = await User.findOne({ _id: userId })
    const name = foundUser?.name
    const avatar = foundUser?.avatar
    console.log(avatar)
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