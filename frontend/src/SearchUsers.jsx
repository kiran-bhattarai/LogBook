import UserItem from "./UserItem"


function SearchUsers() {

    //for testing
    const users = [
        {
            id: "1",
            name: "User1",
            picture: "../src/assets/user_profile.png"
        },
        {
            id: "2",
            name: "User2",
            picture: "../src/assets/user_profile.png"
        }
    ]


    return (
        <div>
            <div className="h-[80%] w-[50%] flex flex-col rounded-xl bg-neutral-800 absolute justify-self-center top-1/2 -translate-y-1/2 p-4 shadow-[0px_0px_16px_black]">
                <div className="w-full">
                    <div className="w-full flex items-center justify-center relative text-white">
                        <img src="../src/assets/search_dark.svg" alt="" className="absolute h-6 left-4" />
                        <input placeholder="Search" className={`bg-transparent py-1.5 m-1 w-full px-10 rounded-4xl  text-xl border-neutral-600 border outline-none text-ellipsis mx-1`} />
                    </div>
                </div>
                <div className="p-4 bg-neutral-900 gap-2 flex flex-col h-full rounded mt-2">
                    {users.map((user) => <UserItem user={user} />)}
                </div>
            </div>
        </div>
    )



}

export default SearchUsers