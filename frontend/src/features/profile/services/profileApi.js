export const changeAvatarRequest = async ({ protectedFetch, formData }) => {
    const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/profile/avatar`, {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    return { res, data }
}

export const searchProfileRequest = async (searchTerm) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/search?term=${searchTerm}`)
    const data = await res.json()
    return { res, data }
}