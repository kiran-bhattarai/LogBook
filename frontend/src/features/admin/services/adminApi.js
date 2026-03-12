export const getUsersRequest = async ({ protectedFetch, sortId, debounceSearchData }) => {
    const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/users?sortId=${sortId}&name=${debounceSearchData}`)
    const data = await res.json()
    return { res, data }
}

export const changeNameRequest = async ({ protectedFetch, userId, newName }) => {
    const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/change-name?userId=${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ newName })
    })
    const data = await res.json()
    return { res, data }
}

export const removeAvatarRequest = async ({ protectedFetch, userId }) => {
    const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/remove-avatar?userId=${userId}`, {
        method: "POST",
    })
    const data = await res.json()
    return { res, data }
}

export const changeRoleRequest = async ({ protectedFetch, userId }) => {
    const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/change-role?userId=${userId}`, {
        method: "POST",
    })
    const data = await res.json()
    return { res, data }
}

export const deleteUserRequest = async ({ protectedFetch, userId }) => {
    const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/delete-user?userId=${userId}`, {
        method: "POST",
    })
    const data = await res.json()
    return { res, data }
}