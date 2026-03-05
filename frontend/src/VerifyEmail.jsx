import { useEffect, useState } from "react"
import { useAuth } from "./AuthProvider"
import { useNavigate } from "react-router-dom"

function VerifyEmail() {

    const navigate = useNavigate()

    const [message, setMessage] = useState("")
    const [code, setCode] = useState("")

    const [userEmail, setUserEmail] = useState("")

    const { protectedFetch, logout } = useAuth()

    useEffect(() => {
        const asyncWrapper = async () => {
            const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/auth/get-email`)
            const data = await res.json()

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
            setMessage("Invalid Code fsa")
            return
        }

        const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/auth/verify-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        })
        const data = await res.json()

        if (!res.ok) {
            setMessage(data.message)
            return
        }

        window.location.assign("/body");
    }

    const resendCode = async () => {
        const res = await protectedFetch(`${import.meta.env.VITE_API_URL}/auth/send-code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        })
        const data = await res.json()

        if (!res.ok) {
            setMessage(data.messsage)
            return
        }

        setMessage("Code sent successfully")
    }

    const logoutFunc = async () => {
        await logout()
        navigate("/body")
    }

    return (
        <>
            <div className="flex items-center justify-center h-full min-h-screen bg-neutral-900">

                <div className="text-white bg-neutral-800 w-110 items-center flex-col flex rounded-2xl p-4 pb-7 relative">

                    <h1 className="text-3xl font-medium mb-14">
                        Email Verification
                    </h1>
                    {
                        message &&
                        <p className="absolute top-16 text-red-500">{message}</p>
                    }

                    <div className="flex-col flex items-center w-full">
                        <input onChange={(e) => setCode(e.target.value)} maxLength={6} type="text" className="text-black max-w-[55%] bg-neutral-200 text-3xl rounded-4xl px-4 text-center text-ellipsis" />
                        <p className="text-[15px] text-neutral-300 m-2 text-center">
                            Enter the 6 digit code sent to your email at {userEmail}.
                        </p>
                        <button onClick={verifyEmailCode} className="mb-8 px-3 py-1 pb-1.5 text-lg font-medium rounded-4xl bg-green-700 cursor-pointer hover:scale-105 hover:bg-green-900 duration-200">Verify Code</button>

                        <div className="flex flex-col gap-1">
                            <button onClick={resendCode} className="px-3 py-0.5 pb-1 text-md font-medium rounded-4xl bg-green-700 cursor-pointer hover:scale-105 hover:bg-green-900 duration-200">Resend Code</button>
                            <button onClick={logoutFunc} className="px-3 py-0.5 pb-1 text-md font-medium rounded-4xl bg-red-700 cursor-pointer hover:scale-105 hover:bg-red-900 duration-200">Logout</button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default VerifyEmail