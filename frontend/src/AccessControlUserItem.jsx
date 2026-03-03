

function AccessControlUserItem({ user }) {

    return (
        <div className="border-b border-neutral-500 flex flex-col rounded bg-[#181818] pb-1 px-3 items-center max-w-180 w-full text-white">

            <div className="flex justify-between items-center w-full">
                <div className="flex">
                    <div className="flex items-center">
                        <img src={user.avatar ? user.avatar : "../src/assets/user_profile.png"} referrerPolicy="no-referrer" alt="" className="bg-neutral-300 h-10 rounded-full mr-2" />
                        <div className="">
                            <h1 className="text-white text-2xl">{user.name}</h1>
                            <h3 className="text-neutral-400 text-sm">{user._id}</h3>
                        </div>
                    </div>
                </div>
                    <div className="flex flex-col text-[14.5px] mt-1">
                        <span><span className="text-neutral-300">Total notes: </span>{user.notesCount}</span>
                        <span><span className="text-neutral-300">Created on: </span>{new Date(user.createdAt).toISOString().split("T")[0] + "," + new Date(user.createdAt).toLocaleString().split(",")[1]}</span>
                    </div>
                <div>
                    <span className={`text-white text-lg mt-2 ml-2 px-2 pb-1 pt-0.5 rounded-lg ${user.role === "admin" ? "bg-red-800" : "bg-green-800"} font-medium`}>{user.role[0].toUpperCase() + user.role.slice(1)}</span>
                </div>
            </div>
            <div className="w-full mt-3">
                <div className="flex text-md font-medium gap-2 w-full whitespace-nowrap">
                    <button className="rounded px-2 pb-1 py-0.5 w-full cursor-pointer hover:scale-105 duration-200 text-blue-700 hover:bg-blue-800 hover:text-white">Change name</button>
                    <button className="rounded px-2 pb-1 py-0.5 w-full cursor-pointer hover:scale-105 duration-200 text-purple-700 hover:bg-purple-800 hover:text-white">Remove pic</button>
                    <button className="rounded px-2 pb-1 py-0.5 w-full cursor-pointer hover:scale-105 duration-200 text-yellow-600 hover:bg-yellow-700 hover:text-white">{user.role === "user" ? "Promote" : "Demote"}</button>
                    <button className="rounded px-2 pb-1 py-0.5 w-full cursor-pointer hover:scale-105 duration-200 text-red-700 hover:bg-red-800 hover:text-white">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default AccessControlUserItem
