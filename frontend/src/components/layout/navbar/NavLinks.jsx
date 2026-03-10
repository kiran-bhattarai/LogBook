import { LineChart } from "recharts"
import { useAuth } from "../../../AuthProvider"
import { useState } from "react"
import SearchUsers from "../../../SearchUsers"

function NavLinks({ setLogin, setSignup }) {

    const { user } = useAuth()

    const [searchUsers, setSearchUsers] = useState(false)

    return (
        <>
            <div className="h-full">
                <ul className="flex gap-3 items-center h-full text-xl">

                    <li onClick={() => setSearchUsers(true)} className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105 whitespace-nowrap px-4 p-2 cursor-pointer">Search users</li>

                    {user === "admin" &&
                        <>
                            <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105">
                                <Link to={"/dashboard"} className="px-4 p-2">Dashboard</Link>
                            </li>
                            <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 whitespace-nowrap rounded hover:scale-105">
                                <Link to={"/access-control"} className="px-4 p-2">Access Control</Link>
                            </li>
                        </>
                    }
                    {
                        !user &&
                        <>
                            <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 rounded hover:scale-105"><button className="cursor-pointer px-4 p-2" onClick={setLogin}>Login</button></li>
                            <li className="h-[70%] flex items-center hover:bg-neutral-900 transition duration-300 whitespace-nowrap rounded hover:scale-105"><button className="cursor-pointer px-4 p-2" onClick={setSignup}>Sign up</button></li>
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