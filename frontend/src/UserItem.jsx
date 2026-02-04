import { Link } from "react-router-dom"

function UserItem({ user, setItselfOffOnFalse }) {

    return (
        <Link onClick={() => setItselfOffOnFalse(false)} to={`/profile?id=${user._id}`}>
            <div className="border-b border-neutral-500 flex items-center rounded bg-[#181818] pb-1 px-3">
                <img src={user.avatar ? user.avatar : "../src/assets/user_profile.png"} alt="" className="bg-neutral-300 h-10 rounded-full mr-2" />
                <div className="">
                    <h1 className="text-white text-2xl">{user.name}</h1>
                    <h3 className="text-neutral-400 text-sm">{user._id}</h3>
                </div>
            </div>
        </Link>
    )
}

export default UserItem