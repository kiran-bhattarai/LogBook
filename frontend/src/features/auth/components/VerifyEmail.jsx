import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { getEmailRequest, sendCodeRequest, verifyEmailRequest } from "../services/authApi"
import { jwtDecode } from "jwt-decode"

function VerifyEmail() {

    const navigate = useNavigate()

    const [message, setMessage] = useState("")
    const [code, setCode] = useState("")

    const [userEmail, setUserEmail] = useState("")

    const { protectedFetch, logout, accessToken } = useAuth()

    useEffect(() => {
        if (jwtDecode(accessToken).verified) {
            navigate("/")
        }
        const asyncWrapper = async () => {
            const { res, data } = await getEmailRequest({ protectedFetch })

            if (!res.ok) {
                setMessage(data.messsage)
                return
            }

            setUserEmail(data.email)
        }

        asyncWrapper()
    }, [protectedFetch])

    const verifyEmailCode = async () => {

        if (code.length !== 6) {
            setMessage("Invalid Code")
            return
        }

        const { res, data } = await verifyEmailRequest({ protectedFetch, code })

        if (!res.ok) {
            setMessage(data.message)
            return
        }

        window.location.assign("/");
    }

    const resendCode = async () => {

        const { res, data } = await sendCodeRequest({ protectedFetch, code })

        if (!res.ok) {
            setMessage(data.messsage)
            return
        }

        setMessage("Code sent successfully")
    }

    const logoutFunc = async () => {
        await logout()
        navigate("/")
    }

    return (
        <>
            <div className="flex items-center justify-center h-full min-h-screen bg-black/20 dark:bg-transparent p-2 sm:p-0 overflow-hidden relative">

                <div className="absolute inset-0 -z-10 max-w-full m-auto">
                    <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-500/45 dark:bg-blue-500/15 rounded-full blur-[120px]"></div>

                    <div className="absolute top-[60%] left-[10%] w-80 h-80 bg-purple-500/40 dark:bg-purple-500/10 rounded-full blur-[120px]"></div>

                    <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-cyan-500/40 dark:bg-cyan-500/10 rounded-full blur-[120px]"></div>

                    <div className="absolute bottom-[5%] right-[5%] w-72 h-72 bg-emerald-500/40 dark:bg-emerald-500/10 rounded-full blur-[120px]"></div>

                    <div className="absolute top-[45%] left-[45%] w-96 h-96 bg-indigo-500/38 dark:bg-indigo-500/8 rounded-full blur-[140px]"></div>

                    <div className="absolute bottom-[30%] right-[30%] w-72 h-72 bg-green-400/40 dark:bg-green-400/10 rounded-full blur-[120px]"></div>
                </div>

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