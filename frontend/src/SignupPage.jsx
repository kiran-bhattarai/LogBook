import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import validator from 'validator'

function SignupPage() {

    const navigate = useNavigate()

    const [passwordIcon, setPasswordIcon] = useState("");
    const [passwordType, setPasswordType] = useState("password")

    const [passwordRetypeIcon, setPasswordRetypeIcon] = useState("");
    const [passwordRetypeType, setPasswordRetypeType] = useState("password")

    const [nameValue, setNameValue] = useState("")
    const [emailValue, setEmailValue] = useState("")

    const [passwordValue, setPasswordValue] = useState("")
    const [passwordRetypeValue, setPasswordRetypeValue] = useState("")

    const [nameTouched, setNameTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [passwordRetypeTouched, setPasswordRetypeTouched] = useState(false)

    const [messageInfo, setMessageInfo] = useState("")

    const [nameLength, setNameLength] = useState(0)

    const [accessToken, setAccessToken] = useState(null)

    const isValidName = () => {
        return /^[a-zA-Z0-9_]{3,20}$/.test(nameValue)
    }


    const isValidEmail = () => {
        if (validator.isEmail(emailValue)) { return true }
        return false
    }

    const isValidPassword = () => {
        if (validator.isStrongPassword(passwordValue) && passwordValue === passwordRetypeValue) {
            return true
        }
        return false
    }

    const isValidPasswordRetype = () => {
        if (validator.isStrongPassword(passwordRetypeValue) && passwordValue === passwordRetypeValue) return true
        return false
    }


    const getOutlineColor = (touched, validator) => {
        if (!touched) return "#ffffff";
        return validator ? "outline-green-600" : "outline-red-600";

    }


    const handleNameChange = (e) => {
        setNameLength(e.target.value.length)
        setNameValue(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmailValue(e.target.value)
    }

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

    const handleSubmit = async (e) => {
        e.preventDefault()

        setNameTouched(true)
        setEmailTouched(true)
        setPasswordTouched(true)
        setPasswordRetypeTouched(true)

        if (emailValue === "" || passwordValue === "" || nameValue === "" || passwordRetypeValue === "") {
            return setMessageInfo("Please provide all the details.")
        }

        if (!isValidName()) return setMessageInfo("Name must be 3–20 characters and can only include letters, numbers, and underscore.")
        if (!isValidEmail()) return setMessageInfo("Invalid email.")
        if (passwordValue !== passwordRetypeValue) return setMessageInfo("Passwords do not match.")
        if (!isValidPassword()) return setMessageInfo("Password criteria invalid.")

        setMessageInfo("")

        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: nameValue, email: emailValue, password: passwordValue, passwordRetype: passwordRetypeValue })
        })

        const { message, token } = await res.json()

        if (res.ok) {
            setAccessToken(token)
            navigate("/body")
        }
        else {
            setMessageInfo(message)
        }


    }

    return (
        <div className="flex align-middle justify-center items-center h-screen bg-gray-900">
            <div className=" p-2 pb-3 bg-white relative rounded-xl flex flex-col items-center w-[clamp(350px,54vmin,460px)] ">

                <h1 className="text-5xl font-inter text-[#444444] font-medium mb-[clamp(78px,10vh,88px)] ">Sign up</h1>
                <span className={`absolute top-20 text-[clamp(16px,2vmin,18px)] text-red-600 font-medium text-center leading-tight px-6`}>{messageInfo}</span>

                <form onSubmit={handleSubmit} noValidate className="w-full px-[clamp(8px,1vw,16px)] items-center flex flex-col">

                    <div className="w-full overflow-clip flex items-center relative justify-center max-w-114">
                        <img src="../src/assets/user.svg" alt="" className="absolute h-6 left-4" />

                        <input type="text" placeholder="Name" className={`bg-[#dfdfdf] py-[clamp(4px,(0.8vh),8px)] m-1 w-[99%] px-10 rounded-4xl  outline-2 outline-[#ffffff] text-[clamp(19px,2.1vmin,24px)] text-ellipsis  ${getOutlineColor(nameTouched, isValidName())} pr-15 mx-1 text-ellipsis transition duration-300`} onChange={(e) => handleNameChange(e)} maxLength={20} minLength={3} onBlur={() => setNameTouched(true)} />

                        <span className={`absolute h-7 bottom-1.5 right-3.5 text-[clamp(15px,1.8vmin,19px)] font-medium ${nameLength === 0 ? "text-neutral-500" : (nameLength < 3 || nameLength > 20) ? "text-red-600" : "text-green-700"} `}>{nameLength}/20</span>
                    </div>
                    <div className="w-full overflow-clip flex items-center justify-center relative max-w-114">
                        <img src="../src/assets/mail.svg" alt="" className="absolute h-6 left-4" />
                        <input placeholder="Email" className={`bg-[#dfdfdf] py-[clamp(4px,(0.8vh),8px)] m-1 w-[99%] px-10 rounded-4xl  text-[clamp(18px,2.1vmin,22px)] outline-[#ffffff] outline-2 text-ellipsis ${getOutlineColor(emailTouched, isValidEmail())} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handleEmailChange(e)} onBlur={() => setEmailTouched(true)} />
                    </div>

                    <div className="w-full overflow-clip flex items-center relative justify-center max-w-114">
                        <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                        <input type={passwordType} placeholder="Password" className={`bg-[#dfdfdf] py-[clamp(4px,(0.8vh),8px)] m-1 w-[99%] px-10 rounded-4xl  outline-2 outline-[#ffffff] text-[clamp(19px,2.1vmin,24px)] text-ellipsis ${getOutlineColor(passwordTouched, isValidPassword())} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handlePasswordChange(e)} onBlur={() => { setPasswordRetypeTouched(true); setPasswordTouched(true) }} />

                        <img src={`../src/assets/${passwordIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordVisibility} />
                    </div>
                    <div className="w-full overflow-clip flex items-center relative justify-center max-w-114">
                        <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                        <input type={passwordRetypeType} placeholder="Retype Password" className={`bg-[#dfdfdf] py-[clamp(4px,(0.8vh),8px)] m-1 w-[99%] px-10 rounded-4xl  outline-2 outline-[#ffffff] text-[clamp(19px,2.1vmin,24px)] text-ellipsis ${getOutlineColor(passwordRetypeTouched, isValidPasswordRetype())} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handlePasswordRetypeChange(e)} onBlur={() => { setPasswordRetypeTouched(true); setPasswordTouched(true) }} />

                        <img src={`../src/assets/${passwordRetypeIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordRetypeVisibility} />

                    </div>


                    <span className={`text-[clamp(15px,2vmin,18px)] text-neutral-500 text-center leading-tight m-[clamp(8px,1.2vmin,16px)]`}>Password should be atleast 8 characters, including one uppercase letter, one lowercase letter, one number, and one special symbol.</span>

                    <button type="submit" className="m-[clamp(6px,0.8vmin,12px)] bg-linear-to-r from-yellow-400 to-red-500 hover:from-red-500 hover:to-yellow-400 transition duration-300 text-white 
                    text-[clamp(20px,3vmin,26px)] pt-1 pb-2 font-semibold rounded-4xl cursor-pointer hover:scale-105 self-auto w-[50%] text-nowrap">Sign up</button>
                </form>

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
                    <span>Already have an account?&nbsp;</span>
                    <Link to={"/login"} className="hover:underline hover:scale-105  text-purple-900 transition duration-300 font-semibold">Login</Link>
                </div>

            </div>
        </div>
    )

}

export default SignupPage