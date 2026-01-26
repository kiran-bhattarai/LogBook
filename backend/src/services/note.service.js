import Note from "../models/note.model.js"

export const noteSave = async (title, body, isPublic, userId) => {
    if ((title.length + body.length) > 3000) return
    await Note.create({
        title,
        body,
        isPublic,
        userId
    })
}

export const noteFetch = async (userId) => {
    const notes = await Note.find({"userId": userId})
    return notes
}

export const noteDelete = async (userId, noteId) => {
    await Note.deleteOne({userId, _id: noteId})
}