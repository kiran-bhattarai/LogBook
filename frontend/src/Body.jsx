import LoginPage from "./LoginPage"
import { Routes, Route } from "react-router-dom"
import ForgotPassword from "./ForgotPassword"
import SignupPage from "./SignupPage"
import NoteInput from "./NoteInput"
import NotesCard from "./NotesCard"
import NavBar from "./NavBar"
import NotesView from "./NotesView"
import Footer from "./Footer"
import SortBy from "./SortBy"
import NoteEditor from "./NoteEditor"
import { useState } from "react"


function Body() {

    const [editor, setEditor] = useState(false)

    const [selectedNote, setSelectedNote] = useState(null)


    return (
        <>
            <div className="min-h-screen flex flex-col bg-neutral-900">
                <NavBar />

                <div className="p-5 flex justify-center flex-col items-center">
                    <NoteInput />
                    <SortBy></SortBy>
                </div>

                <div className="flex justify-center flex-1">
                    <div className="flex-1 overflow-y-auto p-4 max-w-[95%]">
                        <NotesView onNoteClick={setSelectedNote} />
                    </div>
                </div>


                <Footer />
                {selectedNote && <div className="fixed h-full w-full bg-[#00000063] z-10">
                    <div>
                        <NoteEditor note={selectedNote}></NoteEditor>
                    </div>
                </div>}
            </div >
        </>
    );



}

export default Body