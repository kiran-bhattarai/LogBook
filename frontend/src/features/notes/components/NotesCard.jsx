import { useEffect, useRef } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { timeAgo } from "../../../utils/formatDate";

function NotesCard({ note, onRealClick, deleteNoteLogicMain }) {

    const textareaRef = useRef()

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const textareaElement = textareaRef.current;
        if (!textareaElement) return;

        textareaElement.style.height = "auto";
        textareaElement.style.height = Math.min(textareaElement.scrollHeight, 240) + "px";
    }, [note.body]);


    const deleteLogic = async (e) => {
        e.stopPropagation()
        setVisible(false)
        setTimeout(() => deleteNoteLogicMain(note._id), 300)
    }


    return (
        <motion.div animate={visible ? { y: 0, opacity: 1 } : { y: -300, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.8 }} className="flex justify-center flex-wrap relative group bg-white/2 backdrop-blur-sm " >
            <div onClick={() => onRealClick(note)} className="font-inter flex flex-col min-w-56 max-w-140 w-full bg-transparent justify-self-center p-1 border hover:border-neutral-100 hover:scale-101 border-neutral-500 rounded-2xl relative hover:shadow-[0_0px_10px_rgba(255,255,255,0.35)] transition duration-300 justify-between">

                {deleteNoteLogicMain && <div className="absolute right-0 top-0 transition duration-150">
                    <button className="cursor-pointer hover:scale-120 transition duration-200 m-2 mr-3 mt-2.5" onClick={(e) => deleteLogic(e)}>
                        <img src={"../src/assets/delete_dark.svg"} alt="" className="h-7 justify-self-center bg-transparent" />
                    </button>
                </div>}

                <input type="text" id="" placeholder={"(No Title)"} className={`justify-self-start border border-t-0 border-x-0 ${deleteNoteLogicMain && "w-[90%] duration-200"} px-2 text-2xl py-1 transition duration-200 text-white outline-none text-ellipsis border-b-neutral-600`} value={note.title} readOnly />

                <textarea ref={textareaRef} maxLength={3000} placeholder={"(No Body)"} className={`resize-none font-light w-full text-lg outline-none scrollbar text-white px-2 mt-0 py-1 max-h-60 overflow-y-auto`} value={note.body} readOnly></textarea>

                <div className={`border border-x-0 border-b-0 border-t-neutral-600 flex w-full py-0.5 items-center justify-between`}>

                    {deleteNoteLogicMain && <div className="flex items-center text-sm text-white">
                        <img src={note.isPublic ? "../src/assets/public_dark.svg" : "../src/assets/private_dark.svg"} alt="" width={"20px"} className="ml-1.5 mr-1 justify-self-center bg-transparent hover:scale-110 duration-200 transition" />
                        {note.isPublic ? "Public" : "Private"}
                    </div>}

                    <span className={`text-[14px] px-2 text-neutral-300`}>{(note.body?.length || 0) + (note.title?.length || 0)}/3000</span>

                    <span className={`text-[13.5px] px-2 text-neutral-300`}>Edited: {timeAgo(new Date(note.updatedAt))}</span>

                </div>

            </div>
        </motion.div >
    )

}

export default NotesCard