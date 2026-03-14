import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { isStrongPassword } from "validator"
import { changePasswordMainRequest, checkEmailRequest, checkResetCodeRequest } from "../services/authApi"
import BackgroundEffects from "../../../components/ui/BackgroundEffects"

function ResetPassword() {

    const navigate = useNavigate()

    const [emailValue, setEmailValue] = useState("")
    const [code, setCode] = useState("")


    const [nextStage, setNextStage] = useState(!false)
    const [resetStage, setResetStage] = useState(!false)

    const [message, setMessage] = useState("")


    const [passwordIcon, setPasswordIcon] = useState("");
    const [passwordType, setPasswordType] = useState("password")

    const [passwordRetypeIcon, setPasswordRetypeIcon] = useState("");
    const [passwordRetypeType, setPasswordRetypeType] = useState("password")

    const [passwordValue, setPasswordValue] = useState("")
    const [passwordRetypeValue, setPasswordRetypeValue] = useState("")

    const handlePasswordChange = (e) => {
        setPasswordValue(e.target.value);
        handlePasswordIcon(e)
    }


    const handlePasswordIcon = (e) => {
        if (e.target.value === "") {
            setPasswordIcon("")
            setPasswordType("password")
        }
        else {
            if (passwordType === "password") {
                setPasswordIcon("visible-off")
            }
            else {
                setPasswordIcon("visible")
            }
        }
    }


    const handlePasswordVisibility = () => {
        if (passwordType === "password") {
            setPasswordIcon("visible")
            setPasswordType("text")
        } else {
            setPasswordIcon("visible-off")
            setPasswordType("password")
        }
    }


    const handlePasswordRetypeChange = (e) => {
        setPasswordRetypeValue(e.target.value);
        handlePasswordRetypeIcon(e)
    }

    const handlePasswordRetypeVisibility = () => {
        if (passwordRetypeType === "password") {
            setPasswordRetypeIcon("visible")
            setPasswordRetypeType("text")
        } else {
            setPasswordRetypeIcon("visible-off")
            setPasswordRetypeType("password")
        }
    }


    const handlePasswordRetypeIcon = (e) => {
        if (e.target.value === "") {
            setPasswordRetypeIcon("")
            setPasswordRetypeType("password")
        }
        else {
            if (passwordRetypeType === "password") {
                setPasswordRetypeIcon("visible-off")
            }
            else {
                setPasswordRetypeIcon("visible")
            }
        }
    }

    const sendEmailFunc = async () => {

        if (!emailValue) {
            setMessage("Please enter a valid email address")
            return
        }

        const { res, data } = await checkEmailRequest(emailValue)

        if (!res.ok) {
            setMessage(data.message)
            return
        }

        setMessage("Email sent successfully")

        setNextStage(true)
    }

    const verifyCodeFunc = async () => {

        if (!code || code.length < 6) {
            setMessage("Please enter a valid code")
            return
        }

        const { res, data } = await checkResetCodeRequest({ email: emailValue, code })

        if (!res.ok) {
            setMessage(data.message)
            return
        }

        setMessage("")
        setResetStage(true)
    }


    const handleSubmit = async () => {

        if (passwordValue !== passwordRetypeValue) {
            setMessage("Passwords dont match")
            return
        }
        if (!isStrongPassword(passwordValue)) {
            setMessage("Password criteria invalid")
            return
        }

        if (!code || code.length < 6) {
            setMessage("Please enter a valid code")
            return
        }

        const { res, data } = await changePasswordMainRequest({ email: emailValue, code, password: passwordValue })

        if (!res.ok) {
            setMessage(data.message)
            return
        }

        setMessage("")
        alert("Password changed successfully. Please login again.")

        navigate("/")

    }

    return (
        <>
            <div className="flex items-center justify-center h-full min-h-screen p-2 sm:p-0 relative overflow-hidden bg-black/20 dark:bg-transparent">

                <BackgroundEffects />

                <div className="text-black bg-white dark:bg-[#202023] dark:text-white font-inter w-110 items-center flex-col flex rounded-2xl p-4 pb-7 relative self-center">

                    <h1 className="text-3xl font-medium mb-14 font-poppins">
                        Reset Password
                    </h1>
                    {
                        message &&
                        <p className={`absolute top-16 ${message.includes("uccess") ? "text-green-500" : "text-red-500"}`}>{message}</p>
                    }

                    {
                        !nextStage ?
                            <div className="flex-col flex items-center w-full">
                                <div className="w-full overflow-clip flex items-center justify-center relative max-w-90 text-black dark:text-white">
                                    <img src="../src/assets/mail.svg" alt="" className="absolute h-6 left-4" />
                                    <input value={emailValue} placeholder="Email" className={`bg-[#dfdfdf] dark:bg-[#101010] dark:outline-[#101010] py-[clamp(2px,(0.4vh),4px)] m-1 w-[99%] px-10 rounded-4xl  text-[clamp(19px,2.1vmin,23px)] outline-[#dfdfdf] outline-2 mx-1 text-ellipsis transition duration-300`} onChange={(e) => { setEmailValue(e.target.value) }} />
                                </div>
                                <p className="text-[15px] dark:text-neutral-300 text-neutral-700 m-2 ">
                                    A 6 digit code will be sent to your email.
                                </p>
                                <button onClick={sendEmailFunc} className="text-white px-3 py-1 pb-1.5 text-lg font-medium rounded-4xl bg-linear-to-r from-indigo-500 to-green-600 hover:from-green-800 hover:to-indigo-700  cursor-pointer hover:scale-105 transition  duration-300">Send Code</button>
                            </div>
                            :
                            !resetStage ?
                                <div className="flex-col flex items-center w-full">
                                    <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="- - - - - -" maxLength={6} type="text" className="dark:bg-[#101010] dark:outline-[#101010] dark:text-white text-black max-w-[55%] bg-neutral-200 text-3xl rounded-4xl px-4 text-center text-ellipsis" />
                                    <p className="text-[15px] dark:text-neutral-300 text-neutral-700 m-2">
                                        Enter the 6 digit code sent to your email.
                                    </p>
                                    <button onClick={verifyCodeFunc} className="text-white mb-8 px-3 py-1 pb-1.5 text-lg font-medium rounded-4xl bg-linear-to-r from-indigo-500 to-green-600 hover:from-green-800 hover:to-indigo-700  cursor-pointer hover:scale-105  transition duration-300">Verify Code</button>

                                    <div className="flex flex-col gap-1">
                                        <div className="p-0.5 hover:scale-105 transition duration-300 bg-linear-to-r from-indigo-500 to-green-600 hover:from-green-800 hover:to-indigo-700 rounded-4xl">
                                            <button onClick={sendEmailFunc} className=" px-3 py-0.5 pb-1 text-md font-medium rounded-4xl  cursor-pointer transition  duration-300 dark:bg-[#202023] bg-white">Resend Code</button>
                                        </div>
                                        <button onClick={() => setNextStage(false)} className="px-3 py-0.5 pb-1 md font-medium rounded-4xl bbg-linear-to-r from-indigo-600 to-green-700 hover:from-green-800 hover:to-indigo-700 cursor-pointer hover:scale-105 transition  duration-300">Edit email</button>
                                    </div>
                                </div>
                                :
                                <div className="flex-col flex items-center w-full">

                                    <div className="text-black dark:text-white">
                                        <div className="w-full overflow-clip flex items-center relative justify-center max-w-114">
                                            <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                                            <input type={passwordType} placeholder="Password" className={`dark:bg-[#101010] dark:outline-[#101010] bg-[#dfdfdf] py-[clamp(2px,(0.4vh),4px)] m-1 w-[99%] px-10 rounded-4xl  outline-2 outline-[#dddddd] text-[clamp(19px,2.1vmin,24px)] text-ellipsis mx-1 transition duration-300`} onChange={(e) => handlePasswordChange(e)} />

                                            <img src={`../src/assets/${passwordIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordVisibility} />
                                        </div>
                                        <div className="w-full overflow-clip flex items-center relative justify-center max-w-114">
                                            <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                                            <input type={passwordRetypeType} placeholder="Retype Password" className={`dark:bg-[#101010] dark:outline-[#101010] bg-[#dfdfdf] py-[clamp(2px,(0.4vh),4px)] m-1 w-[99%] px-10 rounded-4xl  outline-2 outline-[#dddddd] text-[clamp(19px,2.1vmin,24px)] text-ellipsis mx-1 transition duration-300`} onChange={(e) => handlePasswordRetypeChange(e)} />

                                            <img src={`../src/assets/${passwordRetypeIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordRetypeVisibility} />

                                        </div>
                                    </div>
                                    <p className="text-[14px] leading-4  dark:text-neutral-300 text-neutral-700 m-4 text-center">
                                        Password should be atleast 8 characters, including one uppercase letter, one lowercase letter, one number, and one special symbol.
                                    </p>
                                    <button onClick={handleSubmit} className="text-white px-3 py-1 pb-1.5 text-lg font-medium rounded-4xl bg-linear-60 transition from-indigo-600 to-green-700 hover:from-green-800 hover:to-indigo-700 cursor-pointer hover:scale-105 duration-300">Confirm</button>
                                </div>
                    }

                </div>
            </div>

        </>
    )
}

export default ResetPassword