import { useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { Link } from "react-router-dom"
import { changeNameRequest, changeRoleRequest, deleteUserRequest, removeAvatarRequest } from "../services/adminApi"


function AccessControlUserItem({ user }) {

    const { protectedFetch } = useAuth()

    const [name, setName] = useState(user.name)
    const [avatar, setAvatar] = useState(user.avatar)
    const [role, setRole] = useState(user.role)
    const [visible, setVisible] = useState(true)

    const changeName = async () => {


        let newName = prompt("Enter new name:")

        while (newName.trim().length < 3 || newName.trim().length > 20) {
            alert("Name should have 3-20 characters.")
            newName = prompt("Enter new name:")
        }

        const { res, data } = await changeNameRequest({ protectedFetch, userId: user._id, newName })

        if (!res.ok) {
            alert(data.message)
            return
        }

        setName(newName)
    }

    const removeAvatar = async () => {

        let ans = confirm("Are you sure?")
        if (!ans) {
            return
        }

        const { res, data } = await removeAvatarRequest({ protectedFetch, userId: user._id })

        if (!res.ok) {
            alert(data.message)
            return
        }

        setAvatar("")
    }

    const changeRole = async () => {

        let ans = confirm("Are you sure?")
        if (!ans) {
            return
        }

        const { res, data } = await changeRoleRequest({ protectedFetch, userId: user._id })

        if (!res.ok) {
            alert(data.message)
            return
        }

        setRole(role === "admin" ? "user" : "admin")
    }

    const deleteUserFunc = async () => {

        let ans = confirm("Are you sure?")
        if (!ans) {
            return
        }

        const { res, data } = await deleteUserRequest({ protectedFetch, userId: user._id })

        if (!res.ok) {
            alert(data.message)
            return
        }

        setVisible(false)
    }

    return (
        <div>
            {
                visible &&
                <div className="border-b border-neutral-500 flex flex-col rounded bg-[#202023]/30 pb-1 px-3 pr-2 sm:pr-3 items-center w-full text-white">

                    <Link to={`/profile?id=${user._id}`} className="flex justify-between  w-full">

                        <div className="sm:flex-row flex justify-between items-start sm:items-center flex-col w-full">
                            <div className="flex">
                                <div className="flex items-center font-poppins pt-1">
                                    <img src={avatar ? avatar : "../src/assets/user_profile.png"} referrerPolicy="no-referrer" alt="" className="bg-neutral-300 h-10 rounded-full mr-2" />
                                    <div className="">
                                        <h1 className="text-white text-2xl ">{name}</h1>
                                        <h3 className="text-neutral-400 text-sm">{user._id}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col text-[14.5px] mt-4 sm:mt-1">
                                <span><span className="text-neutral-400">Total notes: </span>{user.notesCount}</span>
                                <span><span className="text-neutral-400">Created on: </span>{new Date(user.createdAt).toISOString().split("T")[0] + "," + new Date(user.createdAt).toLocaleString().split(",")[1]}</span>
                            </div>
                        </div>
                        <div className="mt-2 md:ml-5 ml-2 h-min">
                            <span className={`text-white text-lg px-2 pb-1 pt-0.5 rounded-lg ${role === "admin" ? "bg-red-900" : "bg-green-900"} font-medium`}>{role[0].toUpperCase() + role.slice(1)}</span>
                        </div>
                    </Link>
                    <div className="w-full mt-3">
                        <div className="flex text-md font-medium gap-2 w-full whitespace-nowrap flex-wrap">
                            <div className="flex-1 flex items-center justify-center">

                                <button onClick={changeName} className="flex-1 rounded px-2 pb-1 py-0.5 cursor-pointer hover:scale-105 duration-200 text-blue-700 hover:bg-blue-800 hover:text-white">Change name</button>
                                <button onClick={removeAvatar} className="flex-1 rounded px-2 pb-1 py-0.5 cursor-pointer hover:scale-105 duration-200 text-purple-700 hover:bg-purple-800 hover:text-white">Remove pic</button>
                            </div>
                            <div className="flex-1 flex items-center justify-center">

                                <button onClick={changeRole} className="flex-1 rounded px-2 pb-1 py-0.5 cursor-pointer hover:scale-105 duration-200 text-yellow-600 hover:bg-yellow-700 hover:text-white">{role === "user" ? "Promote" : "Demote"}</button>
                                <button onClick={deleteUserFunc} className="flex-1 rounded px-2 pb-1 py-0.5 cursor-pointer hover:scale-105 duration-200 text-red-700 hover:bg-red-800 hover:text-white">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AccessControlUserItem
