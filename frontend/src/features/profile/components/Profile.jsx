function Profile({ name = "Name", userId = "UserId", avatar = "../src/assets/user_profile.png" }) {

    return (
        <div className="h-full bg-white/30 dark:bg-black/30">
            <div className="p-4 flex  items-center justify-center">
                <img src={avatar} referrerPolicy="no-referrer" alt="avatar" className="h-20 rounded-full bg-neutral-300 border-2 border-black dark:border-white mr-4" />
                <div className="">
                    <h1 className="text-black dark:text-white  text-3xl mb-1 font-poppins">{name}</h1>
                    <h3 className="text-neutral-800 dark:text-neutral-400 font-poppins">{userId}</h3>
                </div>
            </div>
        </div>
    )

}

export default Profile