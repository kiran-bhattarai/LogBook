import { useRef, useState } from "react"
import Spinner from "../../../components/ui/Spinner"
import { changeAvatarRequest } from "../services/profileApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function ChangePicture({ setHidden }) {

    const [image, setImage] = useState()
    const containerRef = useRef()

    const queryClient = useQueryClient()

    const avatarMutation = useMutation({
        mutationFn: changeAvatarRequest,

        onSuccess: () => {
            setHidden()
            setImage(null)
            queryClient.invalidateQueries(['profile', 'me'])
        },

        onError: (err) => {
            alert(err.response?.data?.message || "Something went wrong")
        }
    })

    const handleUpload = async () => {
        
        if (!image) {
            alert("Please select an image")
            return
        }
        
        if (image.size > (1024 * 1024 * 5)) {
            alert("Image size cannot be larger than 5MB")
            return
        }

        const formData = new FormData()
        formData.append("image", image)

        if(avatarMutation.isPending) return
        
        avatarMutation.mutate(formData)
    }

    const handleClick = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setHidden()
        }
    }

    return (
        <div onClick={(e) => handleClick(e)} className="fixed inset-0 z-10 flex h-screen items-center justify-center bg-[#0000005b] font-inter">
            <div ref={containerRef} className="bg-neutral-300 dark:bg-[#202023] text-black dark:text-white font-medium h-80 w-80 rounded-2xl flex flex-col justify-center items-center p-2 gap-6">
                <div className="h-40 w-40 border border-black dark:border-neutral-300 flex items-center justify-center relative text-sm">
                    {avatarMutation.isPending &&
                        <div className="absolute z-10">
                            < Spinner />
                        </div>
                    }
                    {
                        image ?
                            <img src={image ? URL.createObjectURL(image) : ""} alt="" className={`h-full w-full object-cover ${avatarMutation.isPending && "brightness-40"}`} />
                            :
                            <span>No image selected</span>
                    }
                </div>
                <input type="file" name="" id="fileUpload" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files[0])} />

                <div className="bg-linear-60 from-indigo-500 to-green-600 dark:from-indigo-700 dark:to-green-800 hover:from-green-700 hover:to-indigo-700 p-1 px-0.5 rounded-[20px] duration-200 hover:scale-105">

                    <label
                        htmlFor="fileUpload"
                        className=" px-3 py-1 rounded-2xl cursor-pointer bg-neutral-300 dark:bg-[#202023]"
                    >
                        Choose Image
                    </label>
                </div>
                <button onClick={handleUpload} className="text-white bg-linear-60 from-indigo-500 to-green-600 dark:from-indigo-700 dark:to-green-800 hover:from-green-700 hover:to-indigo-700 px-3 py-1.5 pt-1 cursor-pointer rounded-lg text-xl hover:scale-105 duration-200">Save</button>
            </div>
        </div>

    )
}

export default ChangePicture