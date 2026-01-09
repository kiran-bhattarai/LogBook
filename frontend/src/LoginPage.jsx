import { useState } from "react"
import { Link } from "react-router-dom"

function LoginPage() {

    const [passwordIcon, setPasswordIcon] = useState("");
    const [passwordType, setPasswordType] = useState("password")

    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")

    const [highlightEmail, setHighlightEmail] = useState(false)
    const [highlightPassword, setHighlightPassword] = useState(false)


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

        if (emailValue === "") {
            setHighlightEmail(true)
        } else {
            setHighlightEmail(false)
        }

        if (passwordValue === "") {
            setHighlightPassword(true)
        } else {
            setHighlightPassword(false)
        }



    }



    return (
        <div className="flex align-middle justify-center items-center h-screen bg-gray-900">
            <div className=" p-2 py-4 bg-white rounded-xl flex flex-col items-center w-[clamp(350px,40vw,420px)] ">

                <h1 className="text-5xl font-inter text-[#444444] font-medium mb-15">Login</h1>

                <form onSubmit={handleSubmit} noValidate className="w-full px-4 items-center flex flex-col">

                    <div className="w-full overflow-clip flex items-center justify-center relative">
                        <img src="../src/assets/mail.svg" alt="" className="absolute h-6 left-4" />
                        <input type="email" placeholder="Email" className={`bg-[#eeeeee] py-2.5 m-2 w-[99%] px-10 rounded-4xl outline-amber-300 text-[clamp(19px,2.4vw,24px)] text-ellipsis ${highlightEmail ? "outline-3 outline-red-600" : ""} mx-1 text-ellipsis`} onChange={(e) => { setEmailValue(e.target.value) }} />
                    </div>

                    <div className="w-full overflow-clip flex items-center relative justify-center">
                        <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                        <input type={passwordType} placeholder="Password" className={`bg-[#eeeeee] py-2.5 m-2 w-[99%] px-10 rounded-4xl outline-amber-300 text-[clamp(19px,2.4vw,24px)] text-ellipsis ${highlightPassword ? "outline-3 outline-red-600" : ""} mx-1`} onChange={(e) => handlePasswordIcon(e)} />

                        <img src={`../src/assets/${passwordIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordVisibility} />
                    </div>

                    <button type="submit" className="m-3 mb-3 bg-linear-to-r from-yellow-400 to-red-500 hover:from-red-500 hover:to-yellow-400 transition duration-300 text-white 
                    text-3xl pt-1 pb-2 font-semibold rounded-3xl cursor-pointer hover:scale-105 self-auto px-14 w-[80%] mt-4">Log In</button>
                </form>
                <Link to={"/forgot-password"} className="text-xl hover:underline hover:scale-105 text-[#666666] transition duration-300 font-semibold m-1">Forgot password?</Link>

                <br />

                <div className="flex w-[90%] whitespace-nowrap items-center">
                    <hr className="border-t border-gray-300 my-5 w-full" />
                    <span className="mx-2 text-xl">or continue with</span>
                    <hr className="border-t border-gray-300 my-5 w-full" />
                </div>

                <div className="text-lg font-semibold flex flex-col items-center">

                    <div className="flex">
                        <button className="transition duration-300 w-14 h-14 m-1 mx-2 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-md shadow-neutral-400 items-center justify-center flex rounded-xl"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/40px-Google_%22G%22_logo.svg.png?20230822192911" alt="" className="w-11" /></button>

                        <button className="transition duration-300 w-14 h-14 m-1 mx-2 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-md shadow-neutral-400 items-center justify-center flex rounded-xl"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1024px-2023_Facebook_icon.svg.png" alt="" className="w-11" /></button>
                    </div>
                </div>
                <br />
                <div className="text-[clamp(18.5px,1.8vw,20px)] flex">
                    <span>Don't have an account?&nbsp;</span>
                    <Link to={"/signup"} className="hover:underline hover:scale-105  text-purple-900 transition duration-300 font-semibold">Register</Link>
                </div>

            </div>
        </div>
    )

}

export default LoginPage