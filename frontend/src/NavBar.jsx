import { Link } from "react-router-dom"

function NavBar() {

    return (
        <div>
            <div className="bg-neutral-800 h-14 items-center flex justify-between px-4 text-white gap-5">
                <Link to={"/"}>
                    <div className="text-3xl font-bold text-white font-poppins rounded bg-neutral-900 px-2 py-1 ">
                        <span className="text-yellow-500 pr-0.5">
                            Log
                        </span>
                        <span className="">book</span>
                    </div>
                </Link>
                <div className="w-full">
                    <div className="w-full flex items-center justify-center relative">
                        <img src="../src/assets/search_dark.svg" alt="" className="absolute h-6 left-4" />
                        <input placeholder="Search" className={`bg-transparent py-1.5 m-1 w-full px-10 rounded-4xl  text-xl border-neutral-600 border outline-none text-ellipsis mx-1`} />
                    </div>
                </div>
                <div className="h-full">
                    <ul className="flex gap-3 items-center h-full text-xl">
                        <li className="h-[70%] flex items-center p-2 hover:bg-neutral-900 transition duration-300 px-4 rounded hover:scale-105">Login</li>
                        <li className="h-[70%] flex items-center p-2 hover:bg-neutral-900 transition duration-300 px-4 whitespace-nowrap rounded hover:scale-105">Sign up</li>
                    </ul>
                </div>

                <div className="flex items-center justify-center h-[70%]">
                    <button className="hover:bg-neutral-900 h-full p-1 w-10 rounded cursor-pointer hover:scale-105 transition duration-300">
                        <img src="../src/assets/dark_mode.svg" alt="" className="h-full justify-self-center"/>
                    </button>
                </div>

            </div>
        </div>
    )

}

export default NavBar