import { useState, useRef } from "react"


function NoteInput() {

    const [expanded, setExpanded] = useState(false)

    const [inputTitleData, setInputTitleData] = useState("")
    const [inputBodyData, setInputBodyData] = useState("")

    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const textareaRef = useRef(null)


    const inputBodyHandler = (e) => {
        const eventTarget = e.target;
        setInputBodyData(eventTarget.value)
        eventTarget.style.height = "auto";
        eventTarget.style.height = Math.min(eventTarget.scrollHeight, 240) + "px"

    }

    const handleBlur = (e) => {
        if(!document.hasFocus()) return
        if (!e.relatedTarget || !containerRef.current.contains(e.relatedTarget)) {
            setExpanded(false)
            setInputBodyData("")
            setInputTitleData("")
        }
    }


    return (
                <div ref={containerRef} className="flex flex-col w-[40%]  bg-neutral-800 items-center justify-self-center m-4 p-1 border border-neutral-400 rounded shadow-[0px_0px_10px_black]" onBlur={handleBlur}>
                    <input type="text" ref={titleRef} name="" id="" value={inputTitleData} placeholder={expanded ? "Title" : "New note"} className={`border border-t-0 border-x-0 w-full px-2 text-2xl py-1 transition duration-200 text-white outline-none ${expanded ? "border-b-neutral-600 font-medium" : "border-b-transparent"}`} onFocus={() => setExpanded(true)} onChange={(e) => setInputTitleData(e.target.value)} />
                    {expanded && <textarea ref={textareaRef} name="" maxLength={3000} value={inputBodyData} id="" placeholder="Write your note..." className={`resize-none w-full text-lg outline-none scrollbar text-white px-2 mt-1 ${expanded ? "py-1 max-h-[240px] overflow-y-auto" : "h-0 p-0 overflow-hidden"}`} onChange={(e) => inputBodyHandler(e)}></textarea>}
                    {expanded && <div className="border border-x-0 border-b-0 border-t-neutral-600 flex w-full pt-2 pb-1 items-center justify-between">
                        <select name="" id="" className="text-white text-xl rounded bg-amber-700 font-medium py-0.5 cursor-pointer outline-none mx-2 px-1 hover:bg-amber-800 hover:scale-105 transition duration-300">
                            <option value="public" className="cursor-pointer">Public</option>
                            <option value="public" className="cursor-pointer">Private</option>
                        </select>
                        <span className={`text-lg ${inputBodyData.length >= 3000 ? "text-red-500": "text-neutral-300"}`}>{inputBodyData.length}/3000</span>
                        <button className="text-xl bg-amber-700 px-2 py-0.5 rounded font-medium text-white cursor-pointer hover:bg-amber-800 transition duration-300 hover:scale-105 mx-2">Done</button>
                    </div>}
                </div>
    )



}


export default NoteInput