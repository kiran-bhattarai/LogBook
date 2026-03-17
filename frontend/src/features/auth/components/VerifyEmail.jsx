import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { getEmailRequest, sendCodeRequest, verifyEmailRequest } from "../services/authApi"
import { jwtDecode } from "jwt-decode"
import BackgroundEffects from "../../../components/ui/BackgroundEffects"

function VerifyEmail() {

    const navigate = useNavigate()

    const [message, setMessage] = useState("")
    const [code, setCode] = useState("")

    const [userEmail, setUserEmail] = useState("")

    const { logout, accessToken } = useAuth()

    useEffect(() => {
        if (jwtDecode(accessToken).verified) {
            navigate("/")
        }
        const asyncWrapper = async () => {

            try {
                const data = await getEmailRequest()
                setUserEmail(data.email)
            } catch (err) {
                setMessage(err.response?.data?.message || "Something went wrong")
                return
            }

        }

        asyncWrapper()
    }, [])

    const verifyEmailCode = async () => {

        if (code.length !== 6) {
            setMessage("Invalid Code")
            return
        }

        try {
            await verifyEmailRequest(code)
            window.location.assign("/");
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong")
            return
        }
    }

    const resendCode = async () => {

        try {
            await sendCodeRequest({ code })
            setMessage("Code sent successfully")
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong")
            return
        }

    }

    const logoutFunc = async () => {
        await logout()
        navigate("/")
    }

    return (
        <>
            <div className="flex items-center justify-center h-full min-h-screen bg-black/20 dark:bg-transparent p-2 sm:p-0 overflow-hidden relative">

                <BackgroundEffects />

                <div className="text-black bg-white dark:bg-[#202023] dark:text-white  w-110 min-w-90 items-center flex-col flex rounded-2xl p-4 pb-7 relative font-inter">

                    <h1 className="text-3xl font-medium mb-14 font-poppins">
                        Email Verification
                    </h1>
                    {
                        message &&
                        <p className="absolute top-16 text-red-500">{message}</p>
                    }

                    <div className="flex-col flex items-center w-full">
                        <input onChange={(e) => setCode(e.target.value)} maxLength={6} type="text" placeholder="- - - - - -" className="text-black max-w-[55%] dark:bg-[#101010] dark:outline-[#101010] py-1 dark:text-white bg-neutral-200 text-3xl rounded-4xl px-4 text-center text-ellipsis" />
                        <p className="text-[15px] dark:text-neutral-300 text-neutral-700 m-2 text-center ">
                            Enter the 6 digit code sent to your email at {userEmail}.
                        </p>
                        <button onClick={verifyEmailCode} className="mb-8 text-white px-3 py-1 pb-1.5 text-lg font-medium rounded-4xl bg-green-700 cursor-pointer hover:scale-105 hover:bg-green-900 bg-linear-to-r from-indigo-500 to-green-600 hover:from-green-800 hover:to-indigo-700 transition duration-300">Verify Code</button>

                        <div className="flex flex-col gap-1">
                            <div className="p-0.5 hover:scale-105 transition duration-300 bg-linear-to-r from-indigo-600 to-green-700 hover:from-green-800 hover:to-indigo-700 rounded-4xl">
                                <button onClick={resendCode} className="px-3 py-0.5 pb-1 text-md font-medium rounded-4xl  cursor-pointer transition  duration-300 dark:text-white bg-white  dark:bg-[#202023]">Resend Code</button>
                            </div>
                            <button onClick={logoutFunc} className="px-3 py-0.5 pb-1 text-lg text-red-600 cursor-pointer transition hover:scale-105 hover:text-red-700 duration-300">Logout</button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default VerifyEmail