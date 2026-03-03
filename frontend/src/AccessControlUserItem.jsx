import { useState } from "react"
import { useAuth } from "./AuthProvider"
import { Link } from "react-router-dom"


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

        const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/change-name?userId=${user._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newName })
        })
        const data = await res.json()

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

        const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/remove-avatar?userId=${user._id}`, {
            method: "POST",
        })
        const data = await res.json()

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

        const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/change-role?userId=${user._id}`, {
            method: "POST",
        })
        const data = await res.json()

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

        const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/delete-user?userId=${user._id}`, {
            method: "POST",
        })
        const data = await res.json()

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
                <div className="border-b border-neutral-500 flex flex-col rounded bg-[#181818] pb-1 px-3 items-center max-w-180 w-full text-white">
                    <Link to={`/profile?id=${user._id}`} className="flex justify-between items-center w-full">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex">
                                <div className="flex items-center">
                                    <img src={avatar ? avatar : "../src/assets/user_profile.png"} referrerPolicy="no-referrer" alt="" className="bg-neutral-300 h-10 rounded-full mr-2" />
                                    <div className="">
                                        <h1 className="text-white text-2xl">{name}</h1>
                                        <h3 className="text-neutral-400 text-sm">{user._id}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col text-[14.5px] mt-1">
                                <span><span className="text-neutral-300">Total notes: </span>{user.notesCount}</span>
                                <span><span className="text-neutral-300">Created on: </span>{new Date(user.createdAt).toISOString().split("T")[0] + "," + new Date(user.createdAt).toLocaleString().split(",")[1]}</span>
                            </div>
                            <div>
                                <span className={`text-white text-lg mt-2 ml-2 px-2 pb-1 pt-0.5 rounded-lg ${role === "admin" ? "bg-red-800" : "bg-green-800"} font-medium`}>{role[0].toUpperCase() + role.slice(1)}</span>
                            </div>
                        </div>
                    </Link>
                    <div className="w-full mt-3">
                        <div className="flex text-md font-medium gap-2 w-full whitespace-nowrap">
                            <button onClick={changeName} className="rounded px-2 pb-1 py-0.5 w-full cursor-pointer hover:scale-105 duration-200 text-blue-700 hover:bg-blue-800 hover:text-white">Change name</button>
                            <button onClick={removeAvatar} className="rounded px-2 pb-1 py-0.5 w-full cursor-pointer hover:scale-105 duration-200 text-purple-700 hover:bg-purple-800 hover:text-white">Remove pic</button>
                            <button onClick={changeRole} className="rounded px-2 pb-1 py-0.5 w-full cursor-pointer hover:scale-105 duration-200 text-yellow-600 hover:bg-yellow-700 hover:text-white">{role === "user" ? "Promote" : "Demote"}</button>
                            <button onClick={deleteUserFunc} className="rounded px-2 pb-1 py-0.5 w-full cursor-pointer hover:scale-105 duration-200 text-red-700 hover:bg-red-800 hover:text-white">Delete</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AccessControlUserItem
