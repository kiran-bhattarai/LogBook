import Profile from "../features/profile/components/Profile"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { jwtDecode } from "jwt-decode"
import { useSearchParams, Link } from "react-router-dom"
import NotesCard from "../features/notes/components/NotesCard"
import ProfileNoteViewer from "../features/profile/components/ProfileNoteViewer"
import SortBy from "../components/ui/SortBy"
import { getSortedNotes } from "../utils/sortNotes"
import PageContainer from "../components/layout/PageContainer"
import { useNavSearch } from "../context/NavSearchContext"
import Spinner from "../components/ui/Spinner"
import DefaultAvatar from "@/assets/default_avatar.png"

function ProfilePage() {

    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")

    const [selectedNote, setSelectedNote] = useState(null)

    const [avatar, setAvatar] = useState(DefaultAvatar)
    const [username, setUsername] = useState("loading...")
    const [userId, setUserId] = useState("loading...")
    const [notes, setNotes] = useState(null)

    const [sortId, setSortId] = useState(1)

    const { searchValue } = useNavSearch()

    const setSortIdMain = (value) => {
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
            setAvatar(data?.avatar)
            setNotes(data.publicNotes)

            if (!id) {
                setUserId(jwtDecode(accessToken).sub)
            } else {
                setUserId(id)
            }
        }
        fetchNotes()

    }, [protectedFetch, accessToken, id])

    let sortedNotes = getSortedNotes(sortId, notes)

    sortedNotes = sortedNotes?.filter(note => (note.title.toLowerCase().includes(searchValue?.toLowerCase()) || note.body.toLowerCase().includes(searchValue?.toLowerCase())))


    return (
        <>
            <PageContainer>
                {username ?
                    <>
                        <Profile name={username} userId={userId} avatar={avatar}></Profile>

                        <div className="bg-white/30 border-b dark:bg-black/30 border-neutral-600 flex justify-center font-inter">
                            <div className="text-black dark:text-white py-2 pt-1 max-w-7xl text-lg px-8 items-center w-full flex justify-between md:flex-row flex-col">

                                <span>
                                    Notes: {notes?.length}
                                </span>

                                <div className="md:left-1/4 md:translate-x-1/4 translate-0 right-0">
                                    <SortBy sortId={sortId} setSortId={setSortIdMain}></SortBy>
                                </div>

                                <span className="text-sm text-black dark:text-neutral-300">
                                    ⓘ Only public notes are visible
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 w-full">
                            {notes === null ? <div className="justify-self-center translate-y-15">
                                <Spinner />
                            </div> : (notes.length === 0 || sortedNotes.length === 0) ? <div className="text-3xl mt-[14vh] dark:text-neutral-400 text-black text-center">No notes</div> : <div className="w-[95%] justify-self-center p-5">

                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
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
                    <div className="flex-1 text-black text-5xl dark:text-white text-center justify-center flex items-center"><span>The user doesn't exists</span></div>
                }
                {selectedNote && <div className="fixed top-0 h-full w-full bg-[#00000063] z-10">
                    <div>
                        <ProfileNoteViewer note={selectedNote} setNoteOnScreen={setSelectedNote} />
                    </div>
                </div>}
            </PageContainer>
        </>

    )


}

export default ProfilePage