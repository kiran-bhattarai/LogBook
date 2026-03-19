import { useState } from "react";
import NotesCard from "./NotesCard";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { getSortedNotes } from "../../../utils/sortNotes";
import { deleteNoteRequest, fetchNoteRequest } from "../services/notesApi";
import { useNavSearch } from "../../../context/NavSearchContext";
import NoteCardSkeleton from "@/components/skeletons/NoteCardSkeleton";

function NotesView({ onNoteClick, newNoteCreated, sortId }) {

    const [notes, setNotes] = useState(null)
    const { loading } = useAuth()

    const { searchValue } = useNavSearch()

    useEffect(() => {
        if (loading) return;
        const getNotes = async () => {
            const data = await fetchNoteRequest()
            setNotes(data.notes);
        }
        getNotes();

    }, [loading, setNotes, newNoteCreated]);

    const deleteNoteLogicMain = async (id) => {
        setNotes(prev => prev.filter(note => note._id !== id))
        await deleteNoteRequest(id)
    }

    let sortedNotes = getSortedNotes(sortId, notes)

    sortedNotes = sortedNotes?.filter(note => (note.title.toLowerCase().includes(searchValue?.toLowerCase()) || note.body.toLowerCase().includes(searchValue?.toLowerCase())))

    if (notes === null) {
        return (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 2xl:columns-5 relative ">

                {
                    Array.from({ length: 6 }).map((_, i) => (
                        <div  key={i} className="break-inside-avoid py-2">
                            <NoteCardSkeleton />
                        </div>
                    ))
                }
            </div>
        )
    }

    if (notes.length === 0 || sortedNotes.length === 0) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-3xl mt-[14vh] dark:text-neutral-400 text-black text-center">No notes</motion.div>
        )
    }

    return (
        <AnimatePresence>

            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 2xl:columns-5 relative ">
                {sortedNotes.map(note => (
                    <motion.div initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        key={note._id} className="">
                        <div className="break-inside-avoid py-2">
                            <NotesCard note={note} deleteNoteLogicMain={deleteNoteLogicMain} onRealClick={onNoteClick} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>

    )
}

export default NotesView