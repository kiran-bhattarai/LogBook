import { useRef, useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import Spinner from "../../../components/ui/Spinner"
import { changeAvatarRequest } from "../services/profileApi"

function ChangePicture({ setHidden }) {

    const [image, setImage] = useState()
    const containerRef = useRef()
    const [spinner, setSpinner] = useState(false)

    const { protectedFetch } = useAuth()

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("image", image)

        if (image.size > (1024 * 1024 * 5)) {
            alert("Image size cannot be larger than 5MB")
            return
        }

        setSpinner(true)
        const { res, data } = await changeAvatarRequest({ protectedFetch, formData })
        setSpinner(false)


        if (!res.ok) {
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
        <div onClick={(e) => handleClick(e)} className="fixed inset-0 z-10 flex h-screen items-center justify-center bg-[#0000005b] font-inter">
            <div ref={containerRef} className="bg-[#202023] text-white font-medium h-80 w-80 rounded-2xl flex flex-col justify-center items-center p-2 gap-6">
                <div className="h-40 w-40 border border-neutral-300 flex items-center justify-center relative text-sm">
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

                <div className="bg-linear-60 from-indigo-700 to-green-800 hover:from-green-700 hover:to-indigo-700 p-1 px-0.5 rounded-[20px] duration-200 hover:scale-105">

                    <label
                        htmlFor="fileUpload"
                        className=" px-3 py-1 rounded-2xl cursor-pointer bg-[#202023]"
                    >
                        Choose Image
                    </label>
                </div>
                <button onClick={handleUpload} className="bg-linear-60 from-indigo-700 to-green-800 hover:from-green-700 hover:to-indigo-700 px-3 py-1.5 pt-1 cursor-pointer rounded-lg text-xl hover:scale-105 duration-200">Save</button>
            </div>
        </div>

    )
}

export default ChangePicture