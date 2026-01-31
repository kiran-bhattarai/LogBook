import { useState } from "react";
import NotesCard from "./NotesCard";
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

function NotesView({ onNoteClick, newNoteCreated }) {

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