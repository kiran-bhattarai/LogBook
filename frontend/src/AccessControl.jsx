import NavBar from "./NavBar"
import Footer from "./Footer"
import AccessControlUserItem from "./AccessControlUserItem"
import { useEffect, useState } from "react"
import { useAuth } from "./AuthProvider"
import Spinner from "./Spinner"

function AccessControl() {

  const [userList, setUserList] = useState(null)

  const [debounceSearchData, setDebounceSearchData] = useState("")
  const [searchData, setSearchData] = useState("")
  const [sortId, setSortId] = useState(1)

  const { protectedFetch } = useAuth()

  useEffect(() => {
    setTimeout(() => setDebounceSearchData(searchData), 500)

  }, [searchData])

  useEffect(() => {
    console.log("The use effect is runnign")
    const asyncWrapper = async () => {
      const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/admin/users?sortId=${sortId}&name=${debounceSearchData}`)
      const data = await res.json()

      setUserList(data)
    }
    asyncWrapper()

  }, [protectedFetch, sortId, debounceSearchData])

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <NavBar></NavBar>
      <div className="bg-neutral-900 flex-1 mt-5">
        <div className="justify-self-center w-full h-full items-center flex flex-col justify-center">

          <div className="max-w-185 w-full ">
            <div className=" w-full flex items-center px-1 border border-neutral-700 rounded-[13px_13px_0px_0px]">
              <input placeholder="Enter username..." onChange={(e) => setSearchData(e.target.value)} type="text" className="w-full bg-transparent py-1 m-1 text-white px-6 rounded-4xl text-xl border-neutral-600 border outline-none text-ellipsis mx-1" />
              <select name="" id="sort" className="text-white text-md bg-neutral-900 outline-none" onChange={(e) => setSortId(parseInt(e.target.value))}>
                <option value="1">Newest first</option>
                <option value="2">Oldest first</option>
                <option value="3">Alphabetical</option>
                <option value="4">Alphabetical reverse</option>
                <option value="5">Most Notes</option>
                <option value="6">Least Notes</option>
              </select>
            </div>
            <div className="w-full max-h-[68vh] h-[68vh] overflow-y-auto flex flex-col items-center gap-0.5 border border-neutral-700">
              {
                !userList ?

                  <Spinner></Spinner>
                  :

                  userList.length === 0 ?

                    <div className="text-white text-3xl text-center items-center flex h-[70%]">
                      <h1>No users found</h1>
                    </div>
                    :

                    userList.map(user =>

                      <div className="w-full" key={user._id}>
                        <AccessControlUserItem user={user} />
                      </div>
                    )
              }
            </div>
          </div>

        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default AccessControl