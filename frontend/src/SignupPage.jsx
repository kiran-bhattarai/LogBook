import { useState } from "react"
import { Link } from "react-router-dom"
import validator from 'validator'

function SignupPage() {

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

    const [message, setMessage] = useState("")

    const [nameLength, setNameLength] = useState(0)

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
        return validator ? "outline-green-500" : "outline-red-600";

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
            return setMessage("Please provide all the details.")
        }

        if(!isValidName()) return setMessage("Name must be 3–20 characters and can only include letters, numbers, and underscore.")       
        if(!isValidEmail()) return setMessage("Invalid email.")
        if(passwordValue !== passwordRetypeValue) return setMessage("Passwords do not match.")
        if(!isValidPassword()) return setMessage("Password criteria invalid.")

        setMessage("")

    }

    return (
        <div className="flex align-middle justify-center items-center h-screen bg-gray-900">
            <div className=" p-2 py-4 bg-white relative rounded-xl flex flex-col items-center w-[clamp(350px,30vw,520px)] ">

                <h1 className="text-5xl font-inter text-[#444444] font-medium mb-22 ">Sign up</h1>
                <span className={`absolute top-21 text-lg text-red-600 font-medium text-center leading-tight`}>{message}</span>

                <form onSubmit={handleSubmit} noValidate className="w-full px-4 items-center flex flex-col">

                    <div className="w-full overflow-clip flex items-center relative justify-center">
                        <img src="../src/assets/user.svg" alt="" className="absolute h-6 left-4" />

                        <input type="text" placeholder="Name" className={`bg-[#dfdfdf] py-[clamp(4px,(1vh),10px)] m-1 w-[99%] px-10 rounded-4xl  outline-3 outline-[#ffffff] text-[clamp(19px,2.1vmin,24px)] text-ellipsis  ${getOutlineColor(nameTouched, isValidName())} pr-15 mx-1 text-ellipsis transition duration-300`} onChange={(e) => handleNameChange(e)} onBlur={() => setNameTouched(true)} />

                        <span className={`absolute h-7 bottom-1.5 right-3.5 text-[clamp(15px,1.8vmin,19px)] font-medium ${nameLength === 0 ? "text-neutral-500" : (nameLength < 3 || nameLength > 20) ? "text-red-600" : "text-green-700"} `}>{nameLength}/20</span>
                    </div>
                    <div className="w-full overflow-clip flex items-center justify-center relative">
                        <img src="../src/assets/mail.svg" alt="" className="absolute h-6 left-4" />
                        <input placeholder="Email" className={`bg-[#dfdfdf] py-[clamp(4px,(1vh),10px)] m-1 w-[99%] px-10 rounded-4xl  text-[clamp(18px,2.1vmin,22px)] outline-[#ffffff] outline-3 text-ellipsis ${getOutlineColor(emailTouched, isValidEmail())} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handleEmailChange(e)} onBlur={() => setEmailTouched(true)} />
                    </div>

                    <div className="w-full overflow-clip flex items-center relative justify-center">
                        <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                        <input type={passwordType} placeholder="Password" className={`bg-[#dfdfdf] py-[clamp(4px,(1vh),10px)] m-1 w-[99%] px-10 rounded-4xl  outline-3 outline-[#ffffff] text-[clamp(19px,2.1vmin,24px)] text-ellipsis ${getOutlineColor(passwordTouched, isValidPassword())} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handlePasswordChange(e)} onBlur={() => { setPasswordRetypeTouched(true); setPasswordTouched(true) }} />

                        <img src={`../src/assets/${passwordIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordVisibility} />
                    </div>
                    <div className="w-full overflow-clip flex items-center relative justify-center">
                        <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                        <input type={passwordRetypeType} placeholder="Retype Password" className={`bg-[#dfdfdf] py-[clamp(4px,(1vh),10px)] m-1 w-[99%] px-10 rounded-4xl  outline-3 outline-[#ffffff] text-[clamp(19px,2.1vmin,24px)] text-ellipsis ${getOutlineColor(passwordRetypeTouched, isValidPasswordRetype())} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handlePasswordRetypeChange(e)} onBlur={() => { setPasswordRetypeTouched(true); setPasswordTouched(true) }} />

                        <img src={`../src/assets/${passwordRetypeIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordRetypeVisibility} />

                    </div>


                    <span className={`text-lg text-neutral-500 text-center leading-tight m-4`}>Password should be atleast 8 characters, including one uppercase letter, one lowercase letter, one number, and one special symbol.</span>

                    <button type="submit" className="m-3 mb-3 bg-linear-to-r from-yellow-400 to-red-500 hover:from-red-500 hover:to-yellow-400 transition duration-300 text-white 
                    text-[clamp(20px,3vmin,30px)] pt-1 pb-2 font-semibold rounded-3xl cursor-pointer hover:scale-105 self-auto w-[50%] text-nowrap mt-4">Sign up</button>
                </form>

                <div className="flex w-[90%] whitespace-nowrap items-center">
                    <hr className="border-t border-gray-300 my-5 w-full" />
                    <span className="mx-2 text-[clamp(15px,2vmin,20px)]">or continue with</span>
                    <hr className="border-t border-gray-300 my-5 w-full" />
                </div>

                <div className="text-lg font-semibold flex flex-col items-center">

                    <div className="flex">
                        <button className="transition duration-300 w-[clamp(40px,5.5vmin,56px)] h-[clamp(40px,5.5vmin,56px)] m-1 mx-2 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-md shadow-neutral-400 items-center justify-center flex rounded-xl"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/40px-Google_%22G%22_logo.svg.png?20230822192911" alt="" className="w-[clamp(30px,4vmin,44px)]" /></button>

                        <button className="transition duration-300 w-[clamp(40px,5.5vmin,56px)] h-[clamp(40px,5.5vmin,56px)] m-1 mx-2 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-md shadow-neutral-400 items-center justify-center flex rounded-xl"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/1024px-2023_Facebook_icon.svg.png" alt="" className="w-[clamp(30px,4vmin,44px)]" /></button>
                    </div>
                </div>
                <div className="text-[clamp(17px,1.8vmin,20px)] flex mt-[10px]">
                    <span>Already have an account?&nbsp;</span>
                    <Link to={"/login"} className="hover:underline hover:scale-105  text-purple-900 transition duration-300 font-semibold">Login</Link>
                </div>

            </div>
        </div>
    )

}

export default SignupPage