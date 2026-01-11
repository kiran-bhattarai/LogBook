import { Link } from "react-router-dom"
import { useState } from "react"

function NavBar() {

    const [user, setUser] = useState("user")
    const [mode, setMode] = useState("dark")
    const [profilePic, setProfilePic] = useState("../src/assets/user_profile.png")



    return (
        <div>
            <div className="bg-neutral-800 h-14 items-center flex justify-between px-4 text-white gap-5 sticky top-0">
                <Link to={"/"}>
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
                        <input placeholder="Search" className={`bg-transparent py-1.5 m-1 w-full px-10 rounded-4xl  text-xl border-neutral-600 border outline-none text-ellipsis mx-1`} />
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
                                <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105"><Link to={"/dashboard"} className="px-4 p-2">Dashboard</Link></li>
                                <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 whitespace-nowrap rounded hover:scale-105"><Link to={"/signup"} className="px-4 p-2">Users</Link></li>
                                <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 whitespace-nowrap rounded hover:scale-105"><Link to={"/settings"} className="px-4 p-2">Settings</Link></li>
                            </ul>
                        </div>
                        :
                        (user === "user") ?
                            <div className="h-full">
                                <ul className="flex gap-3 items-center h-full text-xl">
                                    <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105 whitespace-nowrap"><Link to={"/search-users"} className="px-4 p-2">Search users</Link></li>
                                </ul>
                            </div>
                            :
                            <div className="h-full">
                                <ul className="flex gap-3 items-center h-full text-xl">
                                    <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105"><Link to={"/login"} className="px-4 p-2">Login</Link></li>
                                    <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 whitespace-nowrap rounded hover:scale-105"><Link to={"/signup"} className="px-4 p-2">Sign up</Link></li>
                                </ul>
                            </div>
                    }
                    {user && <div className="h-[70%] flex items-center transition duration-300 whitespace-nowrap hover:scale-105">
                        <button className=" h-full w-10 cursor-pointer hover:scale-105 transition duration-300">
                            <img src={profilePic} alt="" className="justify-self-center bg-white rounded-[9999px] border-2 border-black" />
                        </button>
                    </div>}

                </div>

            </div>
        </div>
    )

}

export default NavBar