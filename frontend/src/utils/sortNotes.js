export const getSortedNotes = (sortId, notes) => {
    if (!notes) return []

    const arr = [...notes]

    switch (sortId) {
        case 1:
            return arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        case 2:
            return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        case 3:
            return arr.sort((a, b) =>
                (a.title || a.body).localeCompare(b.title || b.body)
            )
        case 4:
            return arr.sort((a, b) =>
                (b.title || b.body).localeCompare(a.title || a.body)
            )
        case 5:
            return arr.sort((a, b) =>
                ((b.title?.length || 0) + (b.body?.length || 0)) -
                ((a.title?.length || 0) + (a.body?.length || 0))
            )
        case 6:
            return arr.sort((a, b) =>
                ((a.title?.length || 0) + (a.body?.length || 0)) -
                ((b.title?.length || 0) + (b.body?.length || 0))
            )
        default:
            return arr
    }
}