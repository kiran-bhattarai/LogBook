import { useEffect } from "react"
import { useAuth } from "../../../context/AuthContext"
import { useNavSearch } from "../../../context/NavSearchContext"

function SearchBar() {

    const { user } = useAuth()
    const { searchValue, setSearchValue } = useNavSearch()

    useEffect(() => {
        setSearchValue("")
    }, [setSearchValue])

    if (!user) return null

    return (
        <div className="w-full min-w-48 font-inter">
            <div className="w-full flex items-center justify-center relative">
                <img src="../src/assets/search_dark.svg" alt="" className="absolute h-6 left-4 dark:invert" />
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" className="bg-transparent py-1.5 m-1 w-full px-10 rounded-4xl text-[18px] shadow-[0px_0px_3px_1px] shadow-[#646464] dark:shadow-neutral-400 border-neutral-600 dark:border-black border outline-none text-ellipsis mx-1 text-black dark:text-white" />
            </div>
        </div>
    )
}

export default SearchBar