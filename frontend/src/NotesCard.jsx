import { useEffect, useRef } from "react";

function NotesCard({ note }) {

    const textareaRef = useRef()


    useEffect(() => {
        const textareaElement = textareaRef.current;
        if (!textareaElement) return;

        textareaElement.style.height = "auto";
        textareaElement.style.height = Math.min(textareaElement.scrollHeight, 240) + "px";
    }, [note.body]);

    return (

        <div className="flex justify-start flex-wrap">
                    <div className="flex flex-col min-w-56 max-w-160 w-full bg-neutral-800 justify-self-center p-1 border border-neutral-400 rounded relative hover:shadow-[0_0px_10px_rgba(255,255,255,0.35)] transition duration-300 justify-between">

                        <div className="absolute right-0 top-0">
                            <button className="cursor-pointer hover:scale-120 transition duration-200 m-1.5">
                                <img src={"../src/assets/delete_dark.svg"} alt="" className="h-8 justify-self-center bg-transparent" />
                            </button>
                        </div>

                        <input type="text" id="" placeholder={"(No Title)"} className={`justify-self-start border border-t-0 border-x-0 w-[90%] px-2 text-2xl py-1 transition duration-200 text-white outline-none text-ellipsis border-b-neutral-600`} value={note.title} disabled />

                        <textarea ref={textareaRef} maxLength={3000} placeholder={"(No Body)"} className={`resize-none w-full text-lg outline-none scrollbar text-white px-2 mt-0 py-1 max-h-[240px] overflow-y-auto`} value={note.body} disabled></textarea>

                        <div className="border border-x-0 border-b-0 border-t-neutral-600 flex w-full py-0.5 items-center justify-between">

                            <div className="flex items-center text-lg text-white">
                                <img src={note.visibility === "public" ? "../src/assets/public_dark.svg" : "../src/assets/private_dark.svg"} alt="" className="ml-1.5 mr-1 justify-self-center bg-transparent hover:scale-110 duration-200 transition" />
                                {`P${note.visibility.slice(1)}`}
                            </div>

                            <span className={`text-lg px-2 text-neutral-300`}>{note.body.length}/3000</span>

                        </div>

                    </div>
                </div>
    )

}

export default NotesCard