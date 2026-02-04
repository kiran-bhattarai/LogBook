import NavBar from "./NavBar"
import Profile from "./Profile"
import Footer from "./Footer"
import { useEffect, useState } from "react"
import { useAuth } from "./AuthProvider"
import { jwtDecode } from "jwt-decode"
import { useSearchParams, Link } from "react-router-dom"
import NotesCard from "./NotesCard"
import ProfileNoteViewer from "./ProfileNoteViewer"
import SortBy from "./SortBy"
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"
import SearchUsers from "./SearchUsers"
import { useLocation } from "react-router-dom"

function ProfilePage() {

    const location = useLocation()

    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")

    const [selectedNote, setSelectedNote] = useState(null)

    const [username, setUsername] = useState("loading...")
    const [userId, setUserId] = useState("loading...")
    const [notes, setNotes] = useState(null)

    const [sortId, setSortId] = useState(localStorage.getItem("sortId") || 1)
    const [searchingFor, setSearchingFor] = useState("")
    const [searchAccounts, setSearchAccounts] = useState(false)


    const [loginWindow, setLoginWindow] = useState(false)
    const [signupWindow, setSignupWindow] = useState(false)

    const setLoginWindowMain = () => {
        setLoginWindow(prev => !prev)
        setSignupWindow(false)
    }

    const setSignupWindowMain = () => {
        setSignupWindow(prev => !prev)
        setLoginWindow(false)
    }

    const setSortIdMain = (value) => {
        localStorage.setItem("sortId", value)
        setSortId(value)
    }


    const { protectedFetch, accessToken } = useAuth()

    useEffect(() => {

        const fetchNotes = async () => {

            let res

            if (id && accessToken) {
                res = await protectedFetch(`${import.meta.env.VITE_API_URL}/profile/fetch?id=${id}`)
            }
            else if (accessToken) {
                res = await protectedFetch(`${import.meta.env.VITE_API_URL}/profile/fetch`)
            }
            else if (id) {
                res = await fetch(`${import.meta.env.VITE_API_URL}/profile/fetch?id=${id}`)
            } else {
                res = await fetch(`${import.meta.env.VITE_API_URL}/profile/fetch`)
            }

            if (!res.ok) {
                setUsername(false)
                return
            }
            const data = await res.json()

            setUsername(data.name)
            setNotes(data.publicNotes)
            console.log(data)

            if (!id) {
                setUserId(jwtDecode(accessToken).sub)
            } else {
                setUserId(id)
            }
        }
        fetchNotes()

    }, [protectedFetch, accessToken, id])

    const getSortedNotes = () => {
        if (!notes) return []

        const arr = [...notes]

        switch (sortId) {
            case 1:
                return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            case 2:
                return arr.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            case 3:
                return arr.sort((a, b) =>
                    (a.title || a.body).localeCompare(b.title || b.body)
                )
            case 4:
                return arr.sort((a, b) =>
                    (b.title || b.body).localeCompare(a.title || a.body)
                )
            case 5:
                return arr.sort((a, b) =>
                    ((b.title?.length || 0) + (b.body?.length || 0)) -
                    ((a.title?.length || 0) + (a.body?.length || 0))
                )
            case 6:
                return arr.sort((a, b) =>
                    ((a.title?.length || 0) + (a.body?.length || 0)) -
                    ((b.title?.length || 0) + (b.body?.length || 0))
                )
            default:
                return arr
        }
    }

    let sortedNotes = getSortedNotes()

    sortedNotes = sortedNotes?.filter(note => (note.title.toLowerCase().includes(searchingFor?.toLowerCase()) || note.body.toLowerCase().includes(searchingFor?.toLowerCase())))

    if (location.pathname !== "/profile") {
        return (
            <div className="flex flex-col min-h-screen">
                <NavBar setSearchUsers={setSearchAccounts} setLogin={setLoginWindowMain} setSignup={setSignupWindowMain} setSearchingFor={setSearchingFor} ></NavBar>

                <div className="flex-1 bg-neutral-900 text-4xl text-white text-center justify-center flex items-center flex-col">
                    <span className="text-5xl">404</span>
                    <span className="py-10">This page doesn't exists</span>
                    <Link to={"/body"} className="text-purple-900 hover:scale-110 underline text-lg font-medium transition duration-200">Go Back</Link>
                </div>

                {selectedNote && <div className="fixed h-full w-full bg-[#00000063] z-10">
                    <div>
                        <ProfileNoteViewer note={selectedNote} setNoteOnScreen={setSelectedNote} />
                    </div>
                </div>}
                {(loginWindow || signupWindow) &&
                    <div className="absolute self-center flex items-center bg-[#00000040] h-screen w-screen justify-center z-1">
                        <div className="">
                            {loginWindow
                                && <div>
                                    <LoginPage setSignupWindow={setSignupWindowMain} setItselfOff={() => setLoginWindow(false)} />
                                </div>}
                            {signupWindow && <SignupPage setLoginWindow={setLoginWindowMain} setItselfOff={() => setSignupWindow(false)}></SignupPage>}
                        </div>
                    </div>}
                {searchAccounts && <div className="absolute h-full w-full bg-[#00000063] z-10">
                    <div>
                        <SearchUsers setSearchUsers={setSearchAccounts} />
                    </div>
                </div>}
                <Footer></Footer>
            </div>
        )
    }


    return (
        <div className="flex flex-col min-h-screen">
            <NavBar setSearchUsers={setSearchAccounts} setLogin={setLoginWindowMain} setSignup={setSignupWindowMain} setSearchingFor={setSearchingFor} ></NavBar>
            {username ?
                <>
                    <Profile name={username} userId={userId}></Profile>
                    <div className="text-white bg-neutral-900 text-lg px-8 items-center b w-full flex justify-between border-b border-neutral-600">
                        <span>
                            Notes: {notes?.length}
                        </span>
                        <div className="left-1/4 translate-x-1/4">
                            <SortBy sortId={sortId} setSortId={setSortIdMain}></SortBy>
                        </div>
                        <span className="text-sm">
                            ⓘ Only public notes are visible
                        </span>


                    </div>
                    <div className="flex-1 bg-neutral-900 w-full">
                        {notes === null ? <div className="text-center mt-[14vh] text-neutral-200">Loading...</div> : (notes.length === 0 || sortedNotes.length === 0) ? <div className="text-3xl mt-[14vh] text-neutral-400 text-center">No notes</div> : <div className="w-[95%] justify-self-center p-5">

                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                                {sortedNotes && sortedNotes.map(note => (
                                    <div key={note._id} className="break-inside-avoid">
                                        <NotesCard onRealClick={setSelectedNote} note={note} />
                                    </div>
                                ))}
                            </div>

                        </div>
                        }
                    </div>
                </>
                :
                <div className="flex-1 bg-neutral-900 text-5xl text-white text-center justify-center flex items-center"><span>The user doesn't exists</span></div>
            }
            {selectedNote && <div className="fixed h-full w-full bg-[#00000063] z-10">
                <div>
                    <ProfileNoteViewer note={selectedNote} setNoteOnScreen={setSelectedNote} />
                </div>
            </div>}
            {(loginWindow || signupWindow) &&
                <div className="absolute self-center flex items-center bg-[#00000040] h-screen w-screen justify-center z-1">
                    <div className="">
                        {loginWindow
                            && <div>
                                <LoginPage setSignupWindow={setSignupWindowMain} setItselfOff={() => setLoginWindow(false)} />
                            </div>}
                        {signupWindow && <SignupPage setLoginWindow={setLoginWindowMain} setItselfOff={() => setSignupWindow(false)}></SignupPage>}
                    </div>
                </div>}
            {searchAccounts && <div className="absolute h-full w-full bg-[#00000063] z-10">
                <div>
                    <SearchUsers setSearchUsers={setSearchAccounts} />
                </div>
            </div>}
            <Footer></Footer>

        </div>

    )


}

export default ProfilePage