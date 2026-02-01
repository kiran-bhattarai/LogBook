import { useState } from "react";
import NotesCard from "./NotesCard";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

function NotesView({ onNoteClick, newNoteCreated, sortId, searchingFor }) {

    const [notes, setNotes] = useState(null)
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

    sortedNotes = sortedNotes.filter(note => (note.title.toLowerCase().includes(searchingFor.toLowerCase()) || note.body.toLowerCase().includes(searchingFor.toLowerCase())))

    if (notes === null) {
        return <div className="text-center mt-[14vh] text-neutral-200">Loading...</div>
    }

    if (notes.length === 0 || sortedNotes.length === 0) {
        return (
            <div className="text-3xl mt-[14vh] text-neutral-400 text-center">No notes</div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {sortedNotes.map(note => (
                <div key={note._id} className="break-inside-avoid">
                    <NotesCard note={note} deleteNoteLogicMain={deleteNoteLogicMain} onRealClick={onNoteClick} />
                </div>
            ))}
        </div>

    )
}

export default NotesView