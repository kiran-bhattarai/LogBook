import { useState, useRef } from "react"
import validator from 'validator'
import { useAuth } from "../../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";
import { signupRequest } from "../services/authApi";

function SignupPage({ setLoginWindow, setItselfOff }) {

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

    const { login } = useAuth()

    const containerRef = useRef()

    useClickOutside(containerRef, setItselfOff)

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
        return validator ? "outline-green-600 dark:outline-green-600" : "outline-red-600 dark:outline-red-600";

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

        const { res, data } = await signupRequest({ name: nameValue, email: emailValue, password: passwordValue, passwordRetype: passwordRetypeValue })
        
        console.log("The res dats is", res.ok)
        if (res.ok) {
            login(emailValue, passwordValue)
            setItselfOff()
            navigate("/verify-email")
        }
        else {
            setMessageInfo(data.message)
        }

    }

    return (
<div ref={containerRef}>
    <div className=" p-2 pb-3 bg-white dark:bg-[#202023] dark:text-white relative rounded-xl flex flex-col items-center w-[350px] font-inter">

        <h1 className="text-3xl font-poppins text-[#444444] font-medium mb-12 dark:text-white">Sign up</h1>
        <span className={`absolute top-13 text-[14px] text-red-600 font-medium text-center leading-tight px-6`}>{messageInfo}</span>

        <form onSubmit={handleSubmit} noValidate className="w-full px-[8px] items-center flex flex-col">

            <div className="w-full overflow-clip flex items-center relative justify-center max-w-114">
                <img src="../src/assets/user.svg" alt="" className="absolute h-6 left-4" />

                <input type="text" placeholder="Name" className={`bg-[#dfdfdf] dark:bg-[#101010] dark:outline-[#101010] py-[4px] m-1 w-[99%] px-10 rounded-4xl  outline outline-[#dddddd] text-[19px] text-ellipsis  ${getOutlineColor(nameTouched, isValidName())} pr-15 mx-1 text-ellipsis transition duration-300`} onChange={(e) => handleNameChange(e)} maxLength={20} minLength={3} onBlur={() => setNameTouched(true)} />

                <span className={`absolute h-7 bottom-1/2 translate-y-1/2 right-3.5 text-[15px] font-medium ${nameLength === 0 ? "text-neutral-500" : (nameLength < 3 || nameLength > 20) ? "text-red-600" : "text-green-700"} `}>{nameLength}/20</span>
            </div>

            <div className="w-full overflow-clip flex items-center justify-center relative max-w-114">
                <img src="../src/assets/mail.svg" alt="" className="absolute h-6 left-4" />
                <input placeholder="Email" className={`bg-[#dfdfdf] dark:bg-[#101010] dark:outline-[#101010] py-[4px] m-1 w-[99%] px-10 rounded-4xl  text-[18px] outline-[#dddddd] outline text-ellipsis ${getOutlineColor(emailTouched, isValidEmail())} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handleEmailChange(e)} onBlur={() => setEmailTouched(true)} />
            </div>
            <div className="w-full overflow-clip flex items-center relative justify-center max-w-114">
                <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                <input type={passwordType} placeholder="Password" className={`bg-[#dfdfdf] dark:bg-[#101010] dark:outline-[#101010] py-[4px] m-1 w-[99%] px-10 rounded-4xl  outline outline-[#dddddd] text-[19px] text-ellipsis ${getOutlineColor(passwordTouched, isValidPassword())} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handlePasswordChange(e)} onBlur={() => { setPasswordRetypeTouched(true); setPasswordTouched(true) }} />

                <img src={`../src/assets/${passwordIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordVisibility} />
            </div>

            <div className="w-full overflow-clip flex items-center relative justify-center max-w-114">
                <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                <input type={passwordRetypeType} placeholder="Retype Password" className={`bg-[#dfdfdf] dark:bg-[#101010] dark:outline-[#101010] py-[4px] m-1 w-[99%] px-10 rounded-4xl  outline outline-[#dddddd] text-[19px] text-ellipsis ${getOutlineColor(passwordRetypeTouched, isValidPasswordRetype())} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handlePasswordRetypeChange(e)} onBlur={() => { setPasswordRetypeTouched(true); setPasswordTouched(true) }} />

                <img src={`../src/assets/${passwordRetypeIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordRetypeVisibility} />
            </div>

            <span className={`text-[13px] text-neutral-500 text-center leading-tight m-[8px]`}>
                Password should be atleast 8 characters, including one uppercase letter, one lowercase letter, one number, and one special symbol.
            </span>

            <button type="submit" className="m-[6px] bg-linear-to-r from-indigo-500 to-green-600 hover:from-green-800 hover:to-indigo-700 transition duration-300 text-white 
            text-[20px] pt-0.5 pb-1.5 font-semibold rounded-4xl cursor-pointer hover:scale-105 self-auto w-[40%] text-nowrap">Sign up</button>
        </form>

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

        <div className="text-[16px] flex mt-[6px]">
            <span>Already have an account?&nbsp;</span>
            <button onClick={setLoginWindow} className="hover:underline hover:scale-105  text-purple-900 dark:text-purple-600 cursor-pointer transition duration-300 font-semibold">Login</button>
        </div>

    </div>
</div>
    )

}

export default SignupPage