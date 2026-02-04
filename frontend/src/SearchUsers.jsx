import UserItem from "./UserItem"
import { useEffect, useRef, useState } from "react"


function SearchUsers({ setSearchUsers }) {

    const [searchTerm, setSearchTerm] = useState("")
    const [users, setUsers] = useState(null)

    const containerRef = useRef()

    useEffect(() => {

        const fetchUsers = async () => {
            if (!searchTerm) {
                setUsers(null)
                return
            }

            const timeout = setTimeout(async () => {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/search?term=${searchTerm}`)
                const data = await res.json()
                setUsers(data.foundUsers)
            }, 400)

            return () => clearTimeout(timeout)
        }

        fetchUsers()

    }, [searchTerm])

    const handleClick = (e) => {
        if (containerRef && !containerRef.current.contains(e.target)) {
            setSearchUsers(false)
        }
    }


    return (
        <div onClick={(e) => handleClick(e)} className="h-screen w-screen">
            <div ref={containerRef} className="h-[80%] w-[50%] flex flex-col rounded-xl bg-neutral-800 absolute justify-self-center top-1/2 -translate-y-1/2 p-4 shadow-[0px_0px_16px_black]">
                <div className="w-full">
                    <div className="w-full flex items-center justify-center relative text-white">
                        <img src="../src/assets/search_dark.svg" alt="" className="absolute h-6 left-4" />
                        <input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" className={`bg-transparent py-1.5 m-1 w-full px-10 rounded-4xl  text-xl border-neutral-600 border outline-none text-ellipsis mx-1`} />
                    </div>
                </div>

                <div className={`p-4 bg-[#1d1d1d] gap-2 flex flex-col h-full rounded mt-2 overflow-auto scrollbar ${!((users?.length !== 0) && (users !== null)) ? "items-center" : ""}`}>
                    {searchTerm &&
                        !((users?.length !== 0) && (users !== null)) ?
                            <div className="text-neutral-400 text-3xl top-1/2 translate-y-1/2 h-[60%]">No user found</div>
                            :
                            users?.map((user) => <UserItem setItselfOffOnFalse={setSearchUsers} key={user._id} user={user} />)}
                </div>

            </div>
        </div>
    )



}

export default SearchUsers