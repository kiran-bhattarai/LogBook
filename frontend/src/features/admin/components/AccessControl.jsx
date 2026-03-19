import AccessControlUserItem from "./AccessControlUserItem"
import { useEffect, useState } from "react"
import { getUsersRequest } from "../services/adminApi"
import AccessControlSkeleton from "@/components/skeletons/AccessControlSkeleton"
import { useInfiniteQuery } from "@tanstack/react-query"

function AccessControl() {

  const [debounceSearchData, setDebounceSearchData] = useState("")
  const [searchData, setSearchData] = useState("")
  const [sortId, setSortId] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => setDebounceSearchData(searchData), 500);
    return () => clearTimeout(timer);
  }, [searchData]);


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({

    queryKey: ["access_control", sortId, debounceSearchData],

    queryFn: ({ pageParam = 1 }) => getUsersRequest({ pageParam, sortId, name: debounceSearchData }),

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length + 1;
    },

    keepPreviousData: true,
  });


  const allUsers = data ? data.pages.flat() : [];

  return (
    <div className="justify-self-center w-full h-full items-center flex flex-col justify-center font-inter px-2">
      <div className="max-w-210 w-full bg-black/5 dark:bg-black/30">

        <div className="w-full flex sm:flex-row flex-col items-center px-1 border border-black dark:border-neutral-700 border-b-0 rounded-[13px_13px_0px_0px]">
          <input
            placeholder="Enter username..."
            onChange={(e) => setSearchData(e.target.value)}
            type="text"
            className="w-full bg-transparent py-1 m-1 px-6 rounded-4xl text-xl text-black dark:text-white border dark:border-neutral-600 border-black outline-none text-ellipsis mx-1"
          />

          <select
            name=""
            id="sort"
            className="text-black dark:text-white text-md outline-none cursor-pointer m-2 sm:m-0"
            onChange={(e) => setSortId(parseInt(e.target.value))}
          >
            <option value="1" className="bg-white dark:bg-black">Newest first</option>
            <option value="2" className="bg-white dark:bg-black">Oldest first</option>
            <option value="3" className="bg-white dark:bg-black">Alphabetical</option>
            <option value="4" className="bg-white dark:bg-black">Alphabetical reverse</option>
            <option value="5" className="bg-white dark:bg-black">Most Notes</option>
            <option value="6" className="bg-white dark:bg-black">Least Notes</option>
          </select>
        </div>

        <div className="w-full max-h-[68vh] h-[68vh] overflow-y-auto scrollbar-thin scrollbar-thumb scrollbar flex flex-col items-center gap-0.5 border border-neutral-700">
          {!data
            ? Array.from({ length: 5 }).map((_, i) => <AccessControlSkeleton key={i} />)
            : allUsers.length === 0
              ? (
                <div className="text-black dark:text-white text-3xl text-center items-center flex h-[70%]">
                  <h1>No users found</h1>
                </div>
              )
              : allUsers.map((user) => (
                <div className="w-full" key={user._id}>
                  <AccessControlUserItem user={user} />
                </div>
              ))}

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

export default AccessControl