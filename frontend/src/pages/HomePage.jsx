import NoteInput from "../features/notes/components/NoteInput"
import PageContainer from "../components/layout/PageContainer"
import NotesView from "../features/notes/components/NotesView"
import SortBy from "../components/ui/SortBy"
import NoteEditor from "../features/notes/components/NoteEditor"
import { useState } from "react"
import SearchUsers from "../features/profile/components/SearchUsers"
import { useAuth } from "../context/AuthContext"
import UnauthenticatedPage from "./UnauthenticatedPage"

function HomePage() {

    const { user } = useAuth()

    const [sortId, setSortId] = useState(localStorage.getItem("sortId") || 1)

    const [selectedNote, setSelectedNote] = useState(null)

    const [newNoteCreated, setNewNoteCreated] = useState(0)

    const [searchAccounts, setSearchAccounts] = useState(false)

    const handleNewNoteCreated = (note) => {
        setNewNoteCreated(prev => prev + 1)
        return note
    }

    const setSortIdMain = (value) => {
        setSortId(value)
        localStorage.setItem("sortId", value)
    }

    const setSelectedNoteMain = (value) => {
        setNewNoteCreated(prev => prev + 1)
        setSelectedNote(value)
    }

    if (!user) {
        return (
            <>
                <UnauthenticatedPage></UnauthenticatedPage>
            </>
        )
    }


    return (
        <>
            <PageContainer>
                <div className="p-5 flex justify-center flex-col items-center">
                    <NoteInput onNoteCreated={handleNewNoteCreated} />
                    <SortBy sortId={sortId} setSortId={setSortIdMain} />
                </div>

                <div className="flex justify-center flex-1">
                    <div className="flex-1 overflow-y-auto p-4 max-w-[95%]">
                        <NotesView onNoteClick={setSelectedNote} newNoteCreated={newNoteCreated} sortId={sortId} />
                    </div>
                </div>

            </PageContainer>

            {selectedNote && <div className="fixed h-full w-full bg-[#00000063] z-10">
                <div>
                    <NoteEditor note={selectedNote} setNoteOnScreen={setSelectedNoteMain}></NoteEditor>
                </div>
            </div>}
            {searchAccounts && <div className="absolute h-full w-full bg-[#00000063] z-10">
                <div>
                    <SearchUsers setSearchUsers={setSearchAccounts} />
                </div>
            </div>}
        </>
    );



}

export default HomePage