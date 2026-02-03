import User from "../models/user.model.js"
import Note from "../models/note.model.js"

export const profileFetch = async (userId) => {

    const foundUser = await User.findOne({_id: userId})
    const name = foundUser?.name
    const notesPublic = await Note.find({userId, isPublic:true})
    
    return { name, notesPublic }
}