import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import valdidator from "validator"
import { useAuth } from "../../../context/AuthContext"
import useClickOutside from "../../../hooks/useClickOutside";

function LoginPage({ setSignupWindow, setItselfOff }) {

    const [passwordIcon, setPasswordIcon] = useState("");
    const [passwordType, setPasswordType] = useState("password")

    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    const [highlightEmail, setHighlightEmail] = useState(false)
    const [highlightPassword, setHighlightPassword] = useState(false)

    const [message, setMessage] = useState("")

    const { login } = useAuth()

    const containerRef = useRef()

    useClickOutside(containerRef, setItselfOff)

    const handlePasswordVisibility = () => {
        if (passwordType === "password") {
            setPasswordIcon("visible")
            setPasswordType("text")
        } else {
            setPasswordIcon("visible-off")
            setPasswordType("password")
        }
    }

    const handlePasswordIcon = (e) => {
        setPasswordValue(e.target.value);
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (emailValue === "" && passwordValue === "") {
            setHighlightEmail(true)
            setHighlightPassword(true)
            setMessage("Please enter your email and password.")
            return
        }


        if (emailValue === "") {
            setHighlightEmail(true)
            setMessage("Please enter your email.")
            return
        } else {
            setHighlightEmail(false)
        }

        if (passwordValue === "") {
            setHighlightPassword(true)
            setMessage("Please enter your password.")
            return
        } else {
            setHighlightPassword(false)
        }

        if (!valdidator.isEmail(emailValue)) {
            setHighlightEmail(true)
            setMessage("Please enter a valid email.")
            return
        }

        setMessage("")

        const data = await login(emailValue, passwordValue)

        const { message } = data

        if (!message.includes("success")) {
            setMessage(message)
        } else {
            setItselfOff()
        }
    }


    return (
        <div ref={containerRef}>
            <div className=" p-2 pb-3 bg-white dark:bg-[#202023] dark:text-white font-inter relative rounded-xl flex flex-col items-center w-[320px] ">

                <h1 className="text-3xl font-poppins text-[#444444] font-medium mb-6 dark:text-white">Login</h1>
                <span className={`absolute top-13 text-[14px] text-red-600 font-medium text-center leading-tight px-6`}>{message}</span>

                <form onSubmit={handleSubmit} noValidate className="w-full px-2 items-center flex flex-col">

                    <div className="w-full overflow-clip flex items-center justify-center relative max-w-114">
                        <img src="../src/assets/mail.svg" alt="" className="absolute h-6 left-4" />
                        <input placeholder="Email" className={`bg-[#dfdfdf] dark:bg-[#101010] dark:outline-[#101010] py-1 m-1 w-[99%] px-10 rounded-4xl  text-[19px] outline-[#dddddd] outline text-ellipsis ${highlightEmail ? "outline-red-600" : ""} mx-1 text-ellipsis transition duration-300`} onChange={(e) => { setEmailValue(e.target.value) }} />
                    </div>

                    <div className="w-full overflow-clip flex items-center relative justify-center max-w-114">
                        <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                        <input type={passwordType} placeholder="Password" className={`bg-[#dfdfdf] dark:bg-[#101010] dark:outline-[#101010] py-1 m-1 w-[99%] px-10 rounded-4xl outline-[#dddddd] outline text-[19px] text-ellipsis ${highlightPassword ? " outline-red-600" : ""} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handlePasswordIcon(e)} />

                        <img src={`../src/assets/${passwordIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordVisibility} />
                    </div>

                    <button type="submit" className="m-1.5 bg-linear-to-r from-indigo-500 to-green-600 hover:from-green-800 hover:to-indigo-700 transition duration-300 text-white 
                    text-[20px] pt-0.5 pb-1.5 font-semibold rounded-4xl cursor-pointer hover:scale-105 self-auto w-[40%] text-nowrap">Login</button>
                </form>

                <Link to={"/reset-password"} className="text-[16px] hover:underline hover:scale-105 text-[#666666] dark:text-[#aaaaaa] transition duration-300 font-semibold m-1">Forgot password?</Link>

                <div className="flex w-[90%] whitespace-nowrap items-center mt-[8px]">
                    <hr className="border-t border-gray-300 dark:border-gray-600 my-[10px] w-full" />
                    <span className="mx-2 text-[15px]">or continue with</span>
                    <hr className="border-t border-gray-300 dark:border-gray-600 my-[12px] w-full" />
                </div>


                <div className="text-lg font-semibold flex flex-col items-center">
                    <div className="flex">
                        <button onClick={async () => window.open("http://localhost:3000/auth/google", "_self")} className="transition duration-300 w-[40px] h-[40px] m-1 mx-2 bg-white dark:bg-[#202023] dark:shadow-black cursor-pointer hover:-translate-y-1 hover:shadow-md shadow-neutral-400 items-center justify-center flex rounded-xl">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/40px-Google_%22G%22_logo.svg.png?20230822192911" alt="" className="w-[30px]" />
                        </button>

                        <button onClick={async () => window.open("http://localhost:3000/auth/facebook", "_self")} className="transition duration-300 w-[40px] h-[40px] m-1 mx-2 bg-white dark:bg-[#202023] dark:shadow-black cursor-pointer hover:-translate-y-1 hover:shadow-md shadow-neutral-400 items-center justify-center flex rounded-xl">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/960px-2021_Facebook_icon.svg.png" alt="" className="w-[30px]" />
                        </button>
                    </div>
                </div>

                <div className="text-[16px] flex mt-1.5">
                    <span>Don't have an account?&nbsp;</span>
                    <button onClick={setSignupWindow} className="hover:underline hover:scale-105 dark:text-purple-600 text-purple-900 transition duration-300 font-semibold cursor-pointer">Register</button>

                </div>

            </div>
        </div>
    )

}

export default LoginPage