import AccessControlUserItem from "./AccessControlUserItem"
import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { getUsersRequest } from "../services/adminApi"
import AccessControlSkeleton from "@/components/skeletons/AccessControlSkeleton"

function AccessControl() {

  const [userList, setUserList] = useState(null)

  const [debounceSearchData, setDebounceSearchData] = useState("")
  const [searchData, setSearchData] = useState("")
  const [sortId, setSortId] = useState(1)

  const { loading } = useAuth()

  useEffect(() => {
    setTimeout(() => setDebounceSearchData(searchData), 500)

  }, [searchData])

  useEffect(() => {
    console.log("The use effect is runnign")
    const asyncWrapper = async () => {
      if (loading) return
      const data = await getUsersRequest({ sortId, debounceSearchData })

      setUserList(data)
    }
    asyncWrapper()

  }, [sortId, debounceSearchData, loading])

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
          {
            !userList
              ? 
              Array.from({length: 5}).map((_, i) => 
                <AccessControlSkeleton key={i} />
              )

              : userList.length === 0
                ? <div className="text-black dark:text-white text-3xl text-center items-center flex h-[70%]">
                  <h1>No users found</h1>
                </div>
                : userList.map(user =>
                  <div className="w-full" key={user._id}>
                    <AccessControlUserItem user={user} />
                  </div>
                )
          }
        </div>
      </div>
    </div>
  )
}

export default AccessControl