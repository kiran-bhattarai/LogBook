import { useState, useRef } from "react"

function ProfileNoteViewer({ note, setNoteOnScreen }) {

    const containerRef = useRef()

    const closeEditor = async (e) => {
        if ((containerRef.current && !containerRef.current.contains(e.target)) || e.target.value === "done") {
            setNoteOnScreen(null)
        }
    }



    return (
        <div className="h-screen w-screen" onClick={(e) => closeEditor(e)}>
            <div ref={containerRef} className="h-[80%] w-[80%] flex flex-col rounded-xl bg-neutral-800 absolute justify-self-center top-1/2 -translate-y-1/2 p-4 pb-3 shadow-[0px_0px_16px_black]">
                <input readOnly type="text" name="" value={note.title} maxLength={3000 - (note.body?.length || 0)} id="" placeholder={"(No Title)"} className={`border border-t-0 border-x-0 w-full px-2 text-2xl py-1 transition duration-200 text-white outline-none border-b-neutral-600 font-medium`} />
                <textarea readOnly name="" value={note.body} maxLength={3000 - (note.title?.length || 0)} id="" placeholder={"(No Body)"} className={` grow resize-none w-full text-lg outline-none scrollbar text-white px-2 mt-1 py-1 overflow-y-auto`} ></textarea>
                <div className="border border-x-0 border-b-0 border-t-neutral-600 flex w-full pt-2 items-center justify-between">
                    <span className={`text-lg ${((note.body?.length || 0) + (note.title?.length || 0)) >= 3000 ? "text-red-500" : "text-neutral-300"}`}>{((note.body?.length || 0) + (note.title?.length || 0))}/3000</span>
                    <button value={"done"} onClick={(e) => closeEditor(e)} className="text-xl bg-red-800 px-2 py-0.5 rounded font-medium text-white cursor-pointer hover:bg-red-900 transition duration-300 hover:scale-105 mx-2">Exit</button>
                </div>
            </div>
        </div>
    )



}

export default ProfileNoteViewer