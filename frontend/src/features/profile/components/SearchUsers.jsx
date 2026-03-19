import { searchProfileRequest } from "../services/profileApi"
import UserItem from "./UserItem"
import { useEffect, useRef, useState } from "react"
import SearchIcon from "@/assets/icons/search.svg"
import { useInfiniteQuery } from "@tanstack/react-query"


function SearchUsers({ setSearchUsers }) {

    const containerRef = useRef()

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({

        queryKey: ["searchUsers", debouncedSearch],

        queryFn: async ({ pageParam = 1 }) => {
            if (!debouncedSearch) return { foundUsers: [] };

            const data = await searchProfileRequest({
                searchTerm: debouncedSearch,
                pageParam: pageParam,
                limit: 10,
            });
            return data;
        },

        enabled: !!searchTerm && !!debouncedSearch,

        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.foundUsers.length < 10) return undefined;
            return allPages.length + 1;
        },
    });


    const users = data?.pages?.flatMap(p => p.foundUsers) || [];

    const handleClick = (e) => {
        if (containerRef && !containerRef.current.contains(e.target)) {
            setSearchUsers(false)
        }
    }


    return (
        <div onClick={(e) => handleClick(e)} className="h-screen w-screen">
            <div ref={containerRef} className="h-[80%] w-[50%] min-w-80 flex flex-col rounded-xl bg-neutral-300 dark:bg-[#202023] absolute justify-self-center top-1/2 -translate-y-1/2 p-4 shadow-[0px_0px_16px_black]">
                <div className="w-full">
                    <div className="w-full flex items-center justify-center relative text-black dark:text-white">
                        <img src={SearchIcon} alt="" className="absolute h-6 left-4" />
                        <input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" className={`bg-transparent py-1.5 m-1 w-full px-10 rounded-4xl text-xl border-neutral-600 border outline-none text-ellipsis mx-1`} />
                    </div>
                </div>

                <div className={`p-4 bg-neutral-400/50 dark:bg-[#1d1d1d] gap-2 flex flex-col h-full rounded mt-2 overflow-auto scrollbar ${!((users?.length !== 0) && (users !== null)) ? "items-center" : ""}`}>
                    {searchTerm &&
                        !((users?.length !== 0) && (users !== null)) ?
                        <div className="text-black dark:text-neutral-400 text-3xl top-1/2 translate-y-1/2 h-[60%]">No user found</div>
                        :
                        users?.map((user) => <UserItem setItselfOffOnFalse={setSearchUsers} key={user._id} user={user} />)}
                    {hasNextPage && (
                        <button className="cursor-pointer hover:scale-105 transition duration-200" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                            {isFetchingNextPage ? "Loading..." : "Load More"}
                        </button>
                    )}
                </div>


            </div>
        </div>
    )



}

export default SearchUsers