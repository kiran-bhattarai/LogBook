import api from "@/lib/axios"

export const editNoteRequest = async ({ noteId, title, body, isPublic }) => {
    const { data } = await api.post("/note/edit", { noteId, title, body, isPublic })
    return data
}

export const createNoteRequest = async ({ title, body, isPublic }) => {
    const { data } = await api.post("/note/create", { title, body, isPublic })
    return data
}

export const fetchNoteRequest = async () => {
    const { data } = await api.get("/note/fetch");
    return data
}

export const deleteNoteRequest = async (id) => {
    await api.delete(`/note/delete/${id}`)
}