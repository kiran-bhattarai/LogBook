import api from "@/lib/axios"

export const getUsersRequest = async ({ pageParam = 1, sortId, name }) => {
    const { data } = await api.get(`/admin/users`, {
        params: {
            page: pageParam,
            limit: 10,
            sortId,
            name
        }
    })
    return data
}

export const changeNameRequest = async ({ userId, newName }) => {
    const { data } = await api.post(`/admin/change-name?userId=${userId}`, { newName })
    return data
}

export const removeAvatarRequest = async ({ userId }) => {
    const { data } = await api.post(`/admin/remove-avatar?userId=${userId}`)
    return data
}

export const changeRoleRequest = async ({ userId }) => {
    const { data } = await api.post(`/admin/change-role?userId=${userId}`)
    return data
}

export const deleteUserRequest = async ({ userId }) => {
    const { data } = await api.post(`/admin/delete-user?userId=${userId}`)
    return data
}

 export const dashboardDataRequest = async () => {
    const { data } = await api.get(`/admin/dashboard`)
    return data
}