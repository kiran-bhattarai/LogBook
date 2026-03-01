import { useRef, useState } from "react"
import { useAuth } from "./AuthProvider"
import Spinner from "./Spinner"

function ChangePicture({ setHidden }) {

    const [image, setImage] = useState()
    const containerRef = useRef()
    const [spinner, setSpinner] = useState(false)

    const { protectedFetch } = useAuth()

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("image", image)

        if(image.size > (1024 * 1024 * 5)) {
            alert("Image size cannot be larger than 5MB")
            return
        }

        setSpinner(true)
        const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/profile/avatar`, {
            method: "POST",
            body: formData
        })
        setSpinner(false)
        
        const data = await res.json()

        if(!res.ok){
            alert(data.message)
            return
        }

        setHidden()
        setImage(null)
        window.location.reload()
    }

    const handleClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setHidden()
        }
    }

    return (
        <div onClick={(e) => handleClick(e)} className="fixed inset-0 z-10 flex h-screen items-center justify-center bg-[#0000005b]">
            <div ref={containerRef} className="bg-neutral-800 text-white font-medium h-80 w-80 rounded-2xl flex flex-col justify-center items-center p-2 gap-4">
                <div className="h-40 w-40 border flex items-center justify-center relative">
                    {spinner &&
                        <div className="absolute z-10">
                            < Spinner />
                        </div>
                    }
                    {
                        image ?
                            <img src={image ? URL.createObjectURL(image) : ""} alt="" className={`h-full w-full object-cover ${spinner && "brightness-40"}`} />
                            :
                            <span>No image selected</span>
                    }
                </div>
                <input type="file" name="" id="fileUpload" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
                <label
                    htmlFor="fileUpload"
                    className="bg-orange-600 px-3 py-1 rounded-2xl cursor-pointer hover:bg-orange-700 transition"
                >
                    Choose Image
                </label>
                <button onClick={handleUpload} className="bg-amber-700 px-4 py-2 pt-1 cursor-pointer rounded-2xl text-xl hover:scale-105 duration-200 hover:bg-amber-800">Change</button>
            </div>
        </div>

    )
}

export default ChangePicture