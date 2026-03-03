import Users from "../models/user.model.js"
import Note from "../models/note.model.js"

export const dashboard = async () => {

    const totalUsers = await Users.countDocuments();
    const userRole = await Users.aggregate([
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 }
            }
        }
    ])
    const userRoleFormatted = userRole.map(item => ({ name: item._id[0].toUpperCase() + item._id.slice(1), value: item.count }))


    const authProvider = await Users.aggregate([
        {
            $group: {
                _id: "$providers",
                count: { $sum: 1 }
            }
        }
    ])
    const authProviderFormatted = authProvider.map(item => {
        const keys = Object.keys(item._id).filter(k => item._id[k]);
        return {
            name: keys.join(" + "),
            value: item.count
        };
    })


    const usersPerDay = await Users.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    const usersPerDayFormatted = usersPerDay.map(item => ({ date: item._id, "New users": item.count }))


    const totalNotes = await Note.countDocuments()

    const noteVisibility = await Note.aggregate([{
        $group: {
            _id: "$isPublic",
            count: {
                $sum: 1
            }
        }
    },
    { $sort: { _id: 1 } }

    ])
    const noteVisibilityFormatted = noteVisibility.map(item => item._id ? ({ name: "Public", value: item.count }) : ({ name: "Private", value: item.count }))

    const averageNotes = Math.round(totalNotes / totalUsers * 100) / 100
    const averagePrivateNotes = Math.round(noteVisibility[0].count / totalUsers * 100) / 100
    const averagePublicNotes = Math.round(noteVisibility[1].count / totalUsers * 100) / 100

    const notesPerDay = await Note.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    const notesPerDayFormatted = notesPerDay.map(item => ({ date: item._id, "New notes": item.count }))


    return ({
        totalUsers, userRoleFormatted, authProviderFormatted, usersPerDayFormatted, totalNotes, averageNotes, averagePrivateNotes, averagePublicNotes, noteVisibilityFormatted, notesPerDayFormatted
    })
}


export const users = async (name = "", sortId, page, limit) => {

    let feild = "createdAt"
    let sortBy = -1

    switch (sortId) {
        case (2):
            sortBy = 1
            break
        case (3):
            feild = "name"
            sortBy = 1
            break
        case (4):
            feild = "name"
            sortBy = -1
            break
        case (5):
            feild = "notesCount"
            sortBy = -1
            break
        case (6):
            feild = "notesCount"
            sortBy = 1
            break
        default:
            feild = "createdAt"
            sortBy = -1
    }

    const users = await Users.find({ name: { $regex: name, $options: "i"} }).skip((page - 1) * limit).limit(limit).sort({ [feild]: sortBy }).collation({ locale: "en", strength: 2 }).select("_id name role avatar notesCount createdAt")
    
    return users
}