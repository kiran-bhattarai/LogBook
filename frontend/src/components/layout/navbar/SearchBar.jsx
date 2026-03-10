import { useAuth } from "../../../AuthProvider"

function SearchBar({ setSearchValue }) {

    const { user } = useAuth()

    if (!user) return null

        return (
            <div className="w-full">
                <div className="w-full flex items-center justify-center relative">
                    <img src="../src/assets/search_dark.svg" alt="" className="absolute h-6 left-4" />
                    <input onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" className="bg-transparent py-1.5 m-1 w-full px-10 rounded-4xl  text-xl border-neutral-600 border outline-none text-ellipsis mx-1" />
                </div>
            </div>
        )
}

export default SearchBar