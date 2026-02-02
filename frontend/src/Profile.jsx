function Profile({name="Name", userId="UserId"}) {

    return (
        <div className="h-full bg-neutral-800 border-b border-neutral-600">
            <div className="p-4 flex  items-center justify-center">
                <img src="../src/assets/user_profile.png" alt="" className="h-20 rounded-full bg-neutral-300 border-2 border-white mr-4" />
                <div className="">
                    <h1 className="text-white text-3xl mb-1">{name}</h1>
                    <h3 className="text-neutral-400 textlg">{userId}</h3>
                </div>
            </div>
        </div>
    )

}

export default Profile