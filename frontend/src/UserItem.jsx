function UserItem({user}) {

    return (
        <div className="border-b border-neutral-500 flex items-center bg-black p-2 py-1">
            <img src={user.picture} alt="" className="bg-neutral-300 h-12 rounded-full mr-4" />
            <div className="">
                <h1 className="text-white text-2xl">{user.name}</h1>
                <h3 className="text-neutral-400">{user.id}</h3>
            </div>
        </div>
    )
}

export default UserItem