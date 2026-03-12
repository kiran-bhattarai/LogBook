export const editNoteRequest = async ({ protectedFetch, noteId, title, body, isPublic }) => {
    const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/note/edit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ noteId, title, body, isPublic })
    })
    const data = await res.json()
    return { res, data }
}

export const createNoteRequest = async ({ protectedFetch, title, body, isPublic }) => {
    const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/note/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            body,
            isPublic
        }),
    })
    const data = await res.json()
    return { res, data }
}

export const fetchNoteRequest = async ({ protectedFetch }) => {
    const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/note/fetch`);
    const data = await res.json();
    return { res, data }
}

export const deleteNoteRequest = async ({ protectedFetch, id }) => {
    await protectedFetch(`${import.meta.env.VITE_API_URL}/note/delete/${id}`, { method: "DELETE" })
}