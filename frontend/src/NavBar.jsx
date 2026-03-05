import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom"
import ChangePicture from "./ChangePicture"
import SearchUsers from "./SearchUsers"
import { jwtDecode } from "jwt-decode"

function NavBar({ setSearchingFor, setLogin, setSignup }) {

    const [profilePic, setProfilePic] = useState("../src/assets/user_profile.png")
    const [mode, setMode] = useState("dark")

    const [dropVisible, setDropVisible] = useState(false)
    const [searchAccounts, setSearchUsers] = useState(false)


    const dropdownRef = useRef()

    const navigate = useNavigate()

    const { logout, user, protectedFetch, accessToken } = useAuth()

    useEffect(() => {
        if (accessToken && !jwtDecode(accessToken).verified) {
            navigate("/verify-email")
        }
    }, [accessToken, navigate])

    const handleLogout = () => {
        logout()
        navigate("/body")
    }

    const toggleDrop = () => {
        setDropVisible(prev => !prev)
    }

    const handleClickOutsideDrop = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setDropVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideDrop)

        return () => document.removeEventListener("mousedown", handleClickOutsideDrop)
    }, [])

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

    const [changePic, setChangePic] = useState(false)

    const handlePic = () => {
        setChangePic(true)

    }


    return (
        <>
            <div className="sticky top-0 shadow-[0px_0px_10px_black] z-10">
                <div className="bg-neutral-800 h-14 items-center flex justify-between px-4 text-white gap-5">
                    <Link to={"/body"}>
                        <div className="text-3xl font-bold text-white font-poppins rounded bg-[#1d1d1d] px-2 py-1">
                            <span className="text-yellow-500 pr-0.5">
                                Log
                            </span>
                            <span className="">book</span>
                        </div>
                    </Link>

                    {user && <div className="w-full">
                        <div className="w-full flex items-center justify-center relative">
                            <img src="../src/assets/search_dark.svg" alt="" className="absolute h-6 left-4" />
                            <input onChange={(e) => setSearchingFor(e.target.value)} placeholder="Search" className={`bg-transparent py-1.5 m-1 w-full px-10 rounded-4xl  text-xl border-neutral-600 border outline-none text-ellipsis mx-1`} />
                        </div>
                    </div>}


                    <div className="flex h-full items-center gap-5">

                        <div className="flex items-center justify-center h-[60%] mt-0.5">
                            <button className="hover:bg-neutral-900 h-full p-1 w-9 rounded cursor-pointer hover:scale-105 transition duration-300">
                                <img src="../src/assets/dark_mode.svg" alt="" className="h-full justify-self-center" />
                            </button>
                        </div>

                        {user && (user === "admin") ?
                            <div className="h-full">
                                <ul className="flex gap-3 items-center h-full text-xl">
                                    <li onClick={() => setSearchUsers(true)} className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105 whitespace-nowrap px-4 p-2 cursor-pointer">Search users</li>
                                    <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105"><Link to={"/dashboard"} className="px-4 p-2">Dashboard</Link></li>
                                    <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 whitespace-nowrap rounded hover:scale-105"><Link to={"/access-control"} className="px-4 p-2">Access Control</Link></li>
                                </ul>
                            </div>
                            :
                            (user === "user") ?
                                <div className="h-full">
                                    <ul className="flex gap-3 items-center h-full text-xl">
                                        <li onClick={() => setSearchUsers(true)} className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105 whitespace-nowrap px-4 p-2 cursor-pointer">Search users</li>
                                    </ul>
                                </div>
                                :
                                <div className="h-full">
                                    <ul className="flex gap-3 items-center h-full text-xl">
                                        <li onClick={() => setSearchUsers(true)} className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105 whitespace-nowrap px-4 p-2 cursor-pointer">Search users</li>
                                        <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105"><button className="cursor-pointer px-4 p-2" onClick={setLogin}>Login</button></li>
                                        <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 whitespace-nowrap rounded hover:scale-105"><button className="cursor-pointer px-4 p-2" onClick={setSignup}>Sign up</button></li>
                                    </ul>
                                </div>
                        }
                        {user && <div className="relative" >
                            <div onClick={toggleDrop} className="h-[70%] flex flex-col items-center transition duration-300 whitespace-nowrap hover:scale-105 relative">
                                <button className=" h-full w-10 cursor-pointer hover:scale-105 transition duration-300">
                                    <img referrerPolicy="no-referrer" src={profilePic} alt="" className="justify-self-center bg-white rounded-[9999px] border-2 border-black" />
                                </button>
                            </div>

                            {dropVisible && <div ref={dropdownRef} className="border-neutral-600 border w-30 py-1.5 bg-[#1d1d1d] rounded absolute -right-3 mt-2">
                                <button className="w-full h-8 text-xl cursor-pointer hover:text-neutral-400 transition duration-200"><Link to={"/profile"}>Profile</Link></button>
                                <button className="w-full h-8 text-lg cursor-pointer hover:text-neutral-400 transition duration-200" onClick={handlePic}>Change Pic</button>
                                <button onClick={handleLogout} className="w-full h-8 text-xl text-red-600 cursor-pointer hover:text-red-800 transition duration-200">Logout</button>
                            </div>}


                        </div>}

                    </div>

                </div>
            </div>
            {
                changePic &&
                <ChangePicture setHidden={() => setChangePic(false)}></ChangePicture>
            }
            {searchAccounts && <div className="fixed h-full min-h-screen scroll w-full bg-[#00000063] z-10">
                <SearchUsers setSearchUsers={setSearchUsers} />
            </div>}
        </>
    )

}

export default NavBar