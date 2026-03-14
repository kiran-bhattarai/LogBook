import { useState, useRef } from "react"
import { useAuth } from "../../../context/AuthContext"
import { createNoteRequest } from "../services/notesApi"


function NoteInput({ onNoteCreated }) {

    const [expanded, setExpanded] = useState(false)

    const [inputTitleData, setInputTitleData] = useState("")
    const [inputBodyData, setInputBodyData] = useState("")
    const [isPublic, setIsPublic] = useState(true)

    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const textareaRef = useRef(null)

    const { protectedFetch } = useAuth()


    const inputBodyHandler = (e) => {
        const eventTarget = e.target;
        setInputBodyData(eventTarget.value)
        eventTarget.style.height = "auto";
        eventTarget.style.height = Math.min(eventTarget.scrollHeight, 240) + "px"

    }

    const handleBlur = async (e) => {
        if (!document.hasFocus()) return
        if (!e.relatedTarget || !containerRef.current.contains(e.relatedTarget)) {
            if (inputBodyData !== "" || inputTitleData !== "") {
                await createNote()
                return
            }
            setExpanded(false)
            setInputBodyData("")
            setInputTitleData("")
            setIsPublic(true)
        }
    }

    const createNote = async () => {

        const { data } = await createNoteRequest({
            protectedFetch, title: inputTitleData,
            body: inputBodyData,
            isPublic: isPublic
        })

        if (data.message.includes("success")) {
            setExpanded(false)
            setInputBodyData("")
            setInputTitleData("")
            setIsPublic(true)
            onNoteCreated({ id: data.id, title: inputTitleData, body: inputBodyData, isPublic: isPublic })
        }
    }


    return (
        <div ref={containerRef} className="font-inter flex flex-col w-[40%] min-w-80 bg-neutral-100 dark:bg-neutral-900 items-center justify-self-center m-4 p-1 border border-neutral-400 rounded shadow-[0px_0px_4px_black] dark:shadow-[0px_0px_4px_white]" onBlur={handleBlur}>

            <input
                type="text"
                maxLength={3000 - inputBodyData.length}
                ref={titleRef}
                name=""
                id=""
                value={inputTitleData}
                placeholder={expanded ? "Title" : "New note"}
                className={`text-black dark:text-white border border-t-0 border-x-0 w-full px-2 text-2xl py-0.5 transition duration-200 outline-none ${expanded ? "border-b-neutral-600 font-medium" : "border-b-transparent"}`}
                onFocus={() => setExpanded(true)}
                onChange={(e) => setInputTitleData(e.target.value)}
            />

            {expanded &&
                <textarea
                    ref={textareaRef}
                    name=""
                    maxLength={3000 - inputTitleData.length}
                    value={inputBodyData}
                    id=""
                    placeholder="Write your note..."
                    className={`resize-none w-full text-lg outline-none scrollbar px-2 mt-1 ${expanded ? "py-1 max-h-60 overflow-y-auto text-black dark:text-white" : "h-0 p-0 overflow-hidden"}`}
                    onChange={(e) => inputBodyHandler(e)}
                ></textarea>
            }

            {expanded &&
                <div className="border border-x-0 border-b-0 border-t-neutral-700 flex w-full pt-1 items-center justify-between">

                    <select
                        onChange={e => setIsPublic(e.target.value === "public")}
                        value={isPublic ? "public" : "private"}
                        name=""
                        id=""
                        className="text-white rounded bg-linear-60 from-indigo-500 to-green-600 dark:from-indigo-700 dark:to-green-800 hover:from-green-700 hover:to-indigo-700 font-medium py-0.5 cursor-pointer outline-none mx-2 px-1 transition duration-300"
                    >
                        <option value="public" className="cursor-pointer bg-white dark:bg-black dark:text-white text-black">Public</option>
                        <option value="private" className="cursor-pointer bg-white dark:bg-black dark:text-white text-black">Private</option>
                    </select>

                    <span className={`text-md ${inputBodyData.length + inputTitleData.length >= 3000 ? "text-red-500" : "text-neutral-300 dark:text-neutral-900"}`}>
                        {inputBodyData.length + inputTitleData.length}/3000
                    </span>

                    <button
                        onClick={createNote}
                        className="text-xl bg-linear-60 text-white from-indigo-500 to-green-600 dark:from-indigo-700 dark:to-green-800 hover:from-green-700 hover:to-indigo-700 px-2 py-0.5 rounded font-medium cursor-pointer  transition duration-300 hover:scale-105 mx-2"
                    >
                        Done
                    </button>
                </div>
            }
        </div>
    )



}


export default NoteInput