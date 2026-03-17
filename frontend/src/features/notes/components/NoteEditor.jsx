import { useState, useRef } from "react"
import { editNoteRequest } from "../services/notesApi"
import useClickOutside from "../../../hooks/useClickOutside"

function NoteEditor({ note, setNoteOnScreen }) {

    const [title, setTitle] = useState(note.title)
    const [body, setBody] = useState(note.body)
    const [isPublic, setIsPublic] = useState(note.isPublic)

    const containerRef = useRef()


    const saveChanges = async () => {
        const data = await editNoteRequest({ noteId: note._id, title, body, isPublic })
        if (!data.message.includes("success")) {
            alert(data.message)
        } else {
            setNoteOnScreen(null)
        }
    }

    useClickOutside(containerRef, saveChanges)


    return (
        <div className="h-screen w-screen font-inter">

            <div ref={containerRef} className="h-[80%] max-h-170 max-w-7xl w-[80%] flex flex-col rounded-xl bg-neutral-200 dark:bg-[#202023] absolute justify-self-center top-1/2 -translate-y-1/2 p-3 shadow-[0px_0px_16px_black]">

                <input
                    type="text"
                    name=""
                    value={title}
                    maxLength={3000 - (body?.length || 0)}
                    id=""
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="(No Title)"
                    className="text-black dark:text-white border border-t-0 border-x-0 w-full px-2 text-2xl py-1 transition duration-200 outline-none border-b-neutral-600 font-medium"
                />

                <textarea
                    name=""
                    value={body}
                    maxLength={3000 - (title?.length || 0)}
                    onChange={(e) => setBody(e.target.value)}
                    id=""
                    placeholder="(No Body)"
                    className="text-black dark:text-white grow resize-none w-full text-lg font-light outline-none scrollbar px-2 mt-1 py-1 overflow-y-auto"
                ></textarea>

                <div className="border border-x-0 border-b-0 border-t-neutral-600 flex w-full pt-2 items-center justify-between">

                    <select
                        onChange={e => setIsPublic(e.target.value === "public")}
                        value={isPublic ? "public" : "private"}
                        name=""
                        id=""
                        className="text-white rounded bg-linear-60 from-indigo-500 to-green-600 dark:from-indigo-700 dark:to-green-800 hover:from-green-700 hover:to-indigo-700 font-medium py-0.5 cursor-pointer outline-none px-1 transition duration-300"
                    >
                        <option value="public" className="cursor-pointer bg-white dark:bg-black text-black dark:text-white">Public</option>
                        <option value="private" className="cursor-pointer bg-white dark:bg-black text-black dark:text-white">Private</option>
                    </select>

                    <span className={`text-sm sm:text-[17px] ${((body?.length || 0) + (title?.length || 0)) >= 3000 ? "text-red-500" : "dark:text-neutral-300 text-neutral-900"}`}>
                        {((body?.length || 0) + (title?.length || 0))}/3000
                    </span>

                    <button
                        value="done"
                        onClick={saveChanges}
                        className="text-white bg-linear-60 from-indigo-500 to-green-600 dark:from-indigo-700 dark:to-green-800 hover:from-green-700 hover:to-indigo-700 px-2 py-0.5 rounded font-medium cursor-pointer transition duration-300 hover:scale-105"
                    >
                        Done
                    </button>

                </div>
            </div>
        </div>
    )
}

export default NoteEditor