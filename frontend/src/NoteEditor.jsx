import { useState } from "react"

function NoteEditor({ note }) {

    const [title, setTitle] = useState(note.title)
    const [body, setBody] = useState(note.body)

    return (
        <div className="h-[80%] w-[80%] flex flex-col rounded-xl bg-neutral-800 absolute justify-self-center top-1/2 -translate-y-1/2 p-4 shadow-[0px_0px_16px_black]">
            <input type="text" name="" value={note.title} id="" onChange={(e) => setTitle(e.target.value)} placeholder={"(No Title)"} className={`border border-t-0 border-x-0 w-full px-2 text-2xl py-1 transition duration-200 text-white outline-none border-b-neutral-600 font-medium`} />
            <textarea name="" value={note.body} maxLength={3000} onChange={(e) => setBody(e.target.value)} id="" placeholder={"(No Body)"} className={` grow resize-none w-full text-lg outline-none scrollbar text-white px-2 mt-1 py-1 overflow-y-auto`} ></textarea>
            <div className="border border-x-0 border-b-0 border-t-neutral-600 flex w-full pt-2 pb-1 items-center justify-between">
                <select name="" id="" className="text-white text-xl rounded bg-amber-700 font-medium py-0.5 cursor-pointer outline-none mx-2 px-1 hover:bg-amber-800 hover:scale-105 transition duration-300">
                    <option value="public" className="cursor-pointer">Public</option>
                    <option value="public" className="cursor-pointer">Private</option>
                </select>
                <span className={`text-lg ${body.length >= 3000 ? "text-red-500" : "text-neutral-300"}`}>{body.length}/3000</span>
                <button className="text-xl bg-amber-700 px-2 py-0.5 rounded font-medium text-white cursor-pointer hover:bg-amber-800 transition duration-300 hover:scale-105 mx-2">Done</button>
            </div>
        </div>
    )



}

export default NoteEditor