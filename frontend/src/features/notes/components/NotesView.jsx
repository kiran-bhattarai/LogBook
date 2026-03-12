import { useState } from "react";
import NotesCard from "./NotesCard";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { getSortedNotes } from "../../../utils/sortNotes";
import { deleteNoteRequest, fetchNoteRequest } from "../services/notesApi";

function NotesView({ onNoteClick, newNoteCreated, sortId, searchingFor }) {

    const [notes, setNotes] = useState(null)
    const { protectedFetch, loading } = useAuth()

    useEffect(() => {
        if (loading) return;
        const getNotes = async () => {
            const { data } = await fetchNoteRequest({protectedFetch})
            console.log("The fetch notes response data", data)
            setNotes(data.notes);
        }
        getNotes();

    }, [protectedFetch, loading, setNotes, newNoteCreated]);

    const deleteNoteLogicMain = async (id) => {
        setNotes(prev => prev.filter(note => note._id !== id))
        await deleteNoteRequest({protectedFetch, id})
    }

    let sortedNotes = getSortedNotes(sortId, notes)

    sortedNotes = sortedNotes?.filter(note => (note.title.toLowerCase().includes(searchingFor?.toLowerCase()) || note.body.toLowerCase().includes(searchingFor?.toLowerCase())))

    if (notes === null) {
        return <div className="text-center mt-[14vh] text-neutral-200">Loading...</div>
    }

    if (notes.length === 0 || sortedNotes.length === 0) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl mt-[14vh] text-neutral-400 text-center">No notes</motion.div>
        )
    }

    return (
        <AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {/* <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:5 2xl:columns-6 gap-2 bg-neutral-900"> */}
                {sortedNotes.map(note => (
                    <motion.div initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        key={note._id} className="">
                        <NotesCard note={note} deleteNoteLogicMain={deleteNoteLogicMain} onRealClick={onNoteClick} />
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>

    )
}

export default NotesView