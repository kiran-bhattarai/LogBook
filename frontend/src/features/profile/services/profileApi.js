import api from "@/lib/axios"

export const fetchMyProfileRequest = async () => {
    const { data } = await api.get("/profile/fetch")
    return data
}

export const fetchProfileRequest = async (id) => {
    const { data } = await api.get(`/profile/fetch?id=${id}`)
    return data
}

export const changeAvatarRequest = async (formData) => {
    const { data } = await api.post("/profile/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return data
}

export const searchProfileRequest = async ({searchTerm, pageParam, limit=10}) => {
        const { data } = await api.get(`/profile/search`, {
        params: {
            page: pageParam,
            limit: limit,
            term: searchTerm
        }
    })
    return data
}