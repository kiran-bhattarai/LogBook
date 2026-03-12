import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { useState, useRef, useEffect } from "react"
import useClickOutside from "../../../hooks/useClickOutside"
import { Link } from "react-router-dom"
import ChangePicture from "../../../features/profile/components/ChangePicture"

function UserMenu() {

    const { user, logout, protectedFetch } = useAuth()
    const navigate = useNavigate()

    const [profilePic, setProfilePic] = useState("../src/assets/user_profile.png")
    const [changePic, setChangePic] = useState(false)
    const [dropVisible, setDropVisible] = useState(false)

    const dropdownRef = useRef()

    useClickOutside(dropdownRef, () => setDropVisible(false))

    useEffect(() => {
        const getAvatar = async () => {
            if (user) {
                const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/profile/fetch`)
                if (!res.ok) {
                    setProfilePic("../src/assets/user_profile.png")
                    return
                }

                const data = await res.json()
                if (data.avatar) {
                    setProfilePic(data?.avatar)
                }
            }
        }
        getAvatar()
    }, [user, protectedFetch])

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

                {dropVisible && <div className="border-neutral-600 border w-30 py-1.5 bg-[#1d1d1d] rounded absolute -right-3 mt-2">
                    <button className="w-full h-8 text-xl cursor-pointer hover:text-neutral-400 transition duration-200"><Link to={"/profile"}>Profile</Link></button>
                    <button className="w-full h-8 text-lg cursor-pointer hover:text-neutral-400 transition duration-200" onClick={() => setChangePic(true)}>Change Pic</button>
                    <button onClick={handleLogout} className="w-full h-8 text-xl text-red-600 cursor-pointer hover:text-red-800 transition duration-200">Logout</button>
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