import Note from "../models/note.model.js"
import AppError from "../errors/app-error.js"

export const noteSave = async (title, body, isPublic, userId) => {
    if ((title.length + body.length) > 3000) return
    const { _id } = await Note.create({
        title,
        body,
        isPublic,
        userId
    })

    return _id
}

export const noteFetch = async (userId) => {
    const notes = await Note.find({ "userId": userId })
    return notes
}

export const noteDelete = async (userId, noteId) => {
    await Note.deleteOne({ userId, _id: noteId })
}

export const noteEdit = async (userId, noteId, title, body, isPublic) => {

    const isValidNote = await Note.findOne({ _id: noteId, userId })
    if (!isValidNote) throw new AppError("Invalid note or user id", 400)

    isValidNote.title = title
    isValidNote.body = body
    isValidNote.isPublic = isPublic

    await isValidNote.save()

}