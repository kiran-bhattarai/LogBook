import { noteSave as noteSaveService, noteFetch as noteFetchService, noteDelete as noteDeleteService } from "../services/note.service.js";

export const noteSave = async (req, res, next) => {
    try {
        const { title, body, isPublic } = req.body;
        const userId = req.user.sub

        if (title.trim().length === 0 && body.trim().length === 0) {
            return
        }
        const id = await noteSaveService(title, body, isPublic, userId)

        res.status(200).json({message: "Note created successfully", id: id})
    }
    catch (err) {
        next(err)
    }
}

export const noteFetch = async (req, res, next) => {
    try{
        const userId = req.user.sub
        const notes  = await noteFetchService(userId)
        
        res.status(200).json({notes: notes})

    }
    catch(err){
        next(err)
    }

}

export const noteDelete = async (req, res, next) => {
    try{
        const userId = req.user.sub
        const { id } = req.params
        await noteDeleteService(userId, id)

        res.status(200).json({message: "Note deleted successfully"})
    }
    catch(err){
        next(err)
    }
}