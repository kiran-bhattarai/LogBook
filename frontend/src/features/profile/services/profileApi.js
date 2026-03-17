import api from "@/lib/axios"

export const changeAvatarRequest = async (formData) => {
    const { data } = await api.post("/profile/avatar", formData , {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return data
}

export const searchProfileRequest = async (searchTerm) => {
    const { data } = await api.get(`/profile/search?term=${searchTerm}`)
    return data
}