import { useState } from "react";
import NotesCard from "./NotesCard";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

function NotesView({ onNoteClick, newNoteCreated, sortId }) {

    const [notes, setNotes] = useState([])
    const { protectedFetch, loading } = useAuth()

    useEffect(() => {
        if (loading) return;
        const getNotes = async () => {
            const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/note/fetch`);
            const data = await res.json();
            console.log("The fetch notes response data", data)
            setNotes(data.notes);
        }
        getNotes();

    }, [protectedFetch, loading, setNotes, newNoteCreated]);

    const deleteNoteLogicMain = async (id) => {
        setNotes(prev => prev.filter(note => note._id !== id))
        await protectedFetch(`${import.meta.env.VITE_API_URL}/note/delete/${id}`, { method: "DELETE" })
    }


    const sortNotes = (sortId) => {

        const newFirst = [...notes].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        const oldFirst = [...notes].sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt)
        })

        const alpha = [...notes].sort((a, b) => {
            if (a.title && b.title) {
                return a.title.localeCompare(b.title)
            }
            if (a.title && !b.title) {
                return a.title.localeCompare(b.body)
            }
            if (!a.title && b.title) {
                return a.body.localeCompare(b.title)
            }
            if (!a.title && !b.title) {
                return a.body.localeCompare(b.body)
            }
            return 0
        })

        const alphaRev = [...notes].sort((a, b) => {
            if (a.title && b.title) {
                return b.title.localeCompare(a.title)
            }
            if (a.title && !b.title) {
                return b.body.localeCompare(a.title)
            }
            if (!a.title && b.title) {
                return b.title.localeCompare(a.body)
            }
            if (!a.title && !b.title) {
                return b.body.localeCompare(a.body)
            }
            return 0
        })

        const charMost = [...notes].sort((a, b) => {
            const aLen = (a.title ? a.title.length : 0) + (a.body ? a.body.length : 0)
            const bLen = (b.title ? b.title.length : 0) + (b.body ? b.body.length : 0)
            return bLen - aLen
        })

        const charLeast = [...notes].sort((a, b) => {
            const aLen = (a.title ? a.title.length : 0) + (a.body ? a.body.length : 0)
            const bLen = (b.title ? b.title.length : 0) + (b.body ? b.body.length : 0)
            return aLen - bLen
        })

        switch (sortId) {
            case 1:
                setTimeout(() => setNotes(newFirst), 0)
                break
            case 2:
                setTimeout(() => setNotes(oldFirst), 0)
                break
            case 3:
                setTimeout(() => setNotes(alpha), 0)
                break
            case 4:
                setTimeout(() => setNotes(alphaRev), 0)
                break
            case 5:
                setTimeout(() => setNotes(charMost), 0)
                break
            case 6:
                setTimeout(() => setNotes(charLeast), 0)
                break
            default:
                setTimeout(() => setNotes(newFirst), 0)
                break
        }
    }

    useEffect(() => {
        sortNotes(sortId)

    }, [sortId, notes])

    if (!notes || notes.length === 0) {
        return (
            <div className="text-3xl mt-[14vh] text-neutral-400 text-center">No notes</div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {notes.map(note => (
                <div key={note._id} className="break-inside-avoid">
                    <NotesCard note={note} deleteNoteLogicMain={deleteNoteLogicMain} onRealClick={onNoteClick} />
                </div>
            ))}
        </div>

    )
}

export default NotesView