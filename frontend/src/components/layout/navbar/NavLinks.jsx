import { useAuth } from "../../../context/AuthContext"
import { useRef, useState } from "react"
import SearchUsers from "../../../features/profile/components/SearchUsers"
import { Link } from "react-router-dom"
import useClickOutside from "../../../hooks/useClickOutside"

function NavLinks({ setLogin, setSignup }) {

    const { user } = useAuth()

    const [searchUsers, setSearchUsers] = useState(false)

    const [menuVisible, setMenuVisible] = useState(false)

    const ref = useRef()

    const handleClick = () => {
        const btn = document.getElementById("btn")
        const menu = document.getElementById("menu")

        if (menuVisible) {
            menu.classList.add("hidden")
            menu.classList.remove("flex")
            btn.classList.remove("rotate-180")
            setMenuVisible(false)
        } else {
            menu.classList.remove("hidden")
            menu.classList.add("flex")
            btn.classList.add("rotate-180")
            setMenuVisible(true)
        }
    }

    useClickOutside(ref, () => {
        const btn = document.getElementById("btn")
        const menu = document.getElementById("menu")
        if (menuVisible) {
            menu.classList.add("hidden")
            menu.classList.remove("flex")
            btn.classList.remove("rotate-180")
            setMenuVisible(false)
        }
    })


    return (
        <>
            <div className="h-full font-poppins sm:translate-x-9.5 bg-gray-100 dark:bg-black text-black dark:text-white" ref={ref}>

                <button className="sm:hidden flex cursor-pointer -translate-x-1 overflow-hidden" onClick={handleClick}>
                    <svg className="duration-200 scale-180" id="btn" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#dddddd" /> </g>
                    </svg>
                </button>

                <ul id="menu" className="text-center sm:shadow-none shadow-[0px_0px_3px_1px] shadow-[#646464] dark:shadow-neutral-900 hidden w-max sm:w-min sm:flex flex-col sm:flex-row sm:relative absolute sm:top-0 top-14 right-9 rounded bg-gray-300 sm:bg-gray-100 dark:bg-black sm:dark:bg-black border-white gap-1.5 items-center text-[16px]">

                    <li onClick={() => setSearchUsers(true)} className="h-[70%] flex items-center hover:bg-neutral-300 dark:hover:bg-neutral-800 font-medium transition duration-300 rounded hover:scale-105 md:whitespace-nowrap md:leading-normal leading-4.5 px-2 p-1.5 cursor-pointer">Search users</li>

                    {user === "admin" &&
                        <>
                            <li className="h-[70%] flex items-center hover:bg-neutral-300 dark:hover:bg-neutral-800 font-medium transition duration-300 rounded hover:scale-105">
                                <Link to={"/dashboard"} className="px-2 p-1.5">Dashboard</Link>
                            </li>
                            <li className="h-[70%] flex items-center hover:bg-neutral-300 dark:hover:bg-neutral-800 font-medium transition duration-300 whitespace-normal lg:whitespace-nowrap lg:leading-normal leading-4.5 rounded hover:scale-105 ">
                                <Link to={"/access-control"} className="px-2 p-1.5">Access Control</Link>
                            </li>
                        </>
                    }
                    {
                        !user &&
                        <>
                            <li className="h-[70%] flex items-center hover:bg-neutral-300 dark:hover:bg-neutral-800 font-medium transition duration-300 rounded hover:scale-105"><button className="cursor-pointer px-2 p-1" onClick={setLogin}>Login</button></li>
                            <li className="h-[70%] flex items-center hover:bg-neutral-300 dark:hover:bg-neutral-800 font-medium transition duration-300 whitespace-nowrap rounded hover:scale-105"><button className="cursor-pointer px-2 p-1" onClick={setSignup}>Sign up</button></li>
                        </>
                    }

                </ul>
            </div>
            {searchUsers && <div className="fixed h-full min-h-screen bottom-0 left-0 scroll w-full bg-[#00000063] z-10">
                <SearchUsers setSearchUsers={setSearchUsers} />
            </div>}
        </>
    )
}

export default NavLinks