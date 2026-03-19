import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { useState, useRef, useEffect } from "react"
import useClickOutside from "../../../hooks/useClickOutside"
import { Link } from "react-router-dom"
import ChangePicture from "../../../features/profile/components/ChangePicture"
import DefaultAvatar from "@/assets/default_avatar.png"
import { fetchMyProfileRequest } from "@/features/profile/services/profileApi"
import { useQuery } from "@tanstack/react-query"

function UserMenu() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const [changePic, setChangePic] = useState(false)
    const [dropVisible, setDropVisible] = useState(false)

    const dropdownRef = useRef()

    useClickOutside(dropdownRef, () => setDropVisible(false))

    const { data, isLoading, error } = useQuery({
        queryKey: ['profile', 'me'],
        queryFn: fetchMyProfileRequest,
        enabled: !!user
    })

    const profilePic = data?.avatar || DefaultAvatar

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    if (!user) return null

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <div onClick={() => setDropVisible(prev => !prev)} className="h-[70%] flex flex-col items-center transition duration-300 whitespace-nowrap hover:scale-105 relative">
                    <button className=" h-full w-10 cursor-pointer hover:scale-105 transition duration-300">
                        <img referrerPolicy="no-referrer" src={profilePic} alt="" className="justify-self-center bg-white rounded-[9999px] border-2 border-black" />
                    </button>
                </div>

                {dropVisible && <div className="border-neutral-600 font-poppins border w-30 font-medium py-1.5 bg-neutral-200 dark:bg-[#101018] rounded absolute right-0 mt-2 shadow-[0px_0px_3px_1px] shadow-[#646464] dark:shadow-neutral-900 ">
                    <button className="w-full h-8 text-xl cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-400 transition duration-200"><Link to={"/profile"}>Profile</Link></button>
                    <button className="w-full h-8 text-lg cursor-pointer hover:text-neutral-800 dark:hover:text-neutral-400 transition duration-200" onClick={() => setChangePic(true)}>Change Pic</button>
                    <button onClick={handleLogout} className="w-full h-8 text-xl cursor-pointer text-red-600 hover:text-red-800 transition duration-200">Logout</button>
                </div>}
            </div>

            {
                changePic &&
                <ChangePicture setHidden={() => setChangePic(false)}></ChangePicture>
            }
        </>
    )
}

export default UserMenu