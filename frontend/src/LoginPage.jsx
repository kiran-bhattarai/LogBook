import { useState } from "react"
import { Link } from "react-router-dom"
import valdidator from "validator"
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate()

    const [passwordIcon, setPasswordIcon] = useState("");
    const [passwordType, setPasswordType] = useState("password")

    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    const [highlightEmail, setHighlightEmail] = useState(false)
    const [highlightPassword, setHighlightPassword] = useState(false)

    const [message, setMessage] = useState("")

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

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: emailValue, password: passwordValue })
        })

        const { message, token } = await response.json()

        if (response.ok) {
            navigate("/body")
        }
        else {
            setMessage(message)
        }

    }





    return (
        <div className="flex align-middle justify-center items-center h-screen bg-gray-900">
            <div className=" p-2 pb-3 bg-white relative rounded-xl flex flex-col items-center w-[clamp(350px,54vmin,420px)] ">

                <h1 className="text-5xl font-inter text-[#444444] font-medium mb-[clamp(44px,7.6vh,60px)]">Login</h1>
                <span className={`absolute top-20 text-[clamp(16px,2vmin,18px)] text-red-600 font-medium text-center leading-tight px-6`}>{message}</span>

                <form onSubmit={handleSubmit} noValidate className="w-full px-[clamp(8px,1vw,16px)] items-center flex flex-col">

                    <div className="w-full overflow-clip flex items-center justify-center relative max-w-114">
                        <img src="../src/assets/mail.svg" alt="" className="absolute h-6 left-4" />
                        <input placeholder="Email" className={`bg-[#dfdfdf] py-[clamp(8px,(1vmin),10px)] m-1 w-[99%] px-10 rounded-4xl  text-[clamp(19px,2.1vmin,23px)] outline-[#ffffff] outline-2 text-ellipsis ${highlightEmail ? "outline-red-600" : ""} mx-1 text-ellipsis transition duration-300`} onChange={(e) => { setEmailValue(e.target.value) }} />
                    </div>

                    <div className="w-full overflow-clip flex items-center relative justify-center max-w-114">
                        <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                        <input type={passwordType} placeholder="Password" className={`bg-[#dfdfdf] py-[clamp(8px,(1vmin),10px)] m-1 w-[99%] px-10 rounded-4xl outline-[#ffffff] text-[clamp(19px,2.1vmin,23px)] text-ellipsis ${highlightPassword ? "outline-2 outline-red-600" : ""} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handlePasswordIcon(e)} />

                        <img src={`../src/assets/${passwordIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordVisibility} />
                    </div>

                    <button type="submit" className="m-[clamp(6px,0.8vmin,12px)] bg-linear-to-r from-yellow-400 to-red-500 hover:from-red-500 hover:to-yellow-400 transition duration-300 text-white 
                    text-[clamp(20px,3vmin,26px)] mt-[clamp(8px,1.2vmin,16px)] pt-1 pb-2 font-semibold rounded-4xl cursor-pointer hover:scale-105 self-auto w-[50%] text-nowrap">Login</button>
                </form>

                <Link to={"/forgot-password"} className="text-[clamp(16px,2vmin,24px)] hover:underline hover:scale-105 text-[#666666] transition duration-300 font-semibold m-1">Forgot password?</Link>

                <div className="flex w-[90%] whitespace-nowrap items-center mt-[clamp(8px,1.2vmin,16px)]">
                    <hr className="border-t border-gray-300 my-[clamp(10px,1.6vmin,20px)] w-full" />
                    <span className="mx-2 text-[clamp(15px,2vmin,20px)]">or continue with</span>
                    <hr className="border-t border-gray-300 my-[clamp(12px,1.6vmin,20px)] w-full" />
                </div>


                <div className="text-lg font-semibold flex flex-col items-center">

                    <div className="flex">
                        <button className="transition duration-300 w-[clamp(40px,5.5vmin,56px)] h-[clamp(40px,5.5vmin,56px)] m-1 mx-2 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-md shadow-neutral-400 items-center justify-center flex rounded-xl"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/40px-Google_%22G%22_logo.svg.png?20230822192911" alt="" className="w-[clamp(30px,4vmin,44px)]" /></button>

                        <button className="transition duration-300 w-[clamp(40px,5.5vmin,56px)] h-[clamp(40px,5.5vmin,56px)] m-1 mx-2 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-md shadow-neutral-400 items-center justify-center flex rounded-xl"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1024px-2023_Facebook_icon.svg.png" alt="" className="w-[clamp(30px,4vmin,44px)]" /></button>
                    </div>
                </div>

                <div className="text-[clamp(16px,1.8vmin,19px)] flex mt-[clamp(6px,0.6vmin,12px)]">
                    <span>Don't have an account?&nbsp;</span>
                    <Link to={"/signup"} className="hover:underline hover:scale-105  text-purple-900 transition duration-300 font-semibold">Register</Link>
                </div>

            </div>
        </div>
    )

}

export default LoginPage