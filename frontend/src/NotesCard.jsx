import { useEffect, useRef } from "react";

function NotesCard({ note, onRealClick, deleteNoteLogicMain }) {

    const textareaRef = useRef()


    useEffect(() => {
        const textareaElement = textareaRef.current;
        if (!textareaElement) return;

        textareaElement.style.height = "auto";
        textareaElement.style.height = Math.min(textareaElement.scrollHeight, 240) + "px";
    }, [note.body]);


    const deleteLogic = (e) => {
        e.stopPropagation()
        deleteNoteLogicMain(note._id)
    }



    return (

        < div className="flex justify-center flex-wrap relative group" >
                <div onClick={() => onRealClick(note)} className="flex flex-col min-w-56 max-w-140 w-full bg-neutral-800 justify-self-center p-1 border border-neutral-400 rounded relative hover:shadow-[0_0px_10px_rgba(255,255,255,0.35)] transition duration-300 justify-between">

                    {deleteNoteLogicMain && <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition duration-150">
                        <button className="cursor-pointer hover:scale-120 transition duration-200 m-1.5" onClick={(e) => deleteLogic(e)}>
                            <img src={"../src/assets/delete_dark.svg"} alt="" className="h-8 justify-self-center bg-transparent" />
                        </button>
                    </div>}

                    <input type="text" id="" placeholder={"(No Title)"} className={`justify-self-start border border-t-0 border-x-0 ${deleteNoteLogicMain && "w-[90%]"} px-2 text-2xl py-1 transition duration-200 text-white outline-none text-ellipsis border-b-neutral-600`} value={note.title} readOnly />

                    <textarea ref={textareaRef} maxLength={3000} placeholder={"(No Body)"} className={`resize-none w-full text-lg outline-none scrollbar text-white px-2 mt-0 py-1 max-h-60 overflow-y-auto`} value={note.body} readOnly></textarea>

                    <div className={`border border-x-0 border-b-0 border-t-neutral-600 flex w-full py-0.5 items-center ${deleteNoteLogicMain ? "justify-between" : "justify-center"}`}>

                        {deleteNoteLogicMain && <div className="flex items-center text-lg text-white">
                            <img src={note.isPublic ? "../src/assets/public_dark.svg" : "../src/assets/private_dark.svg"} alt="" className="ml-1.5 mr-1 justify-self-center bg-transparent hover:scale-110 duration-200 transition" />
                            {note.isPublic ? "Public" : "Private"}
                        </div>}

                        <span className={`text-[15px] px-2 text-neutral-300`}>{(note.body?.length || 0) + (note.title?.length || 0)}/3000</span>

                    </div>

                </div>
        </div >
    )

}

export default NotesCard