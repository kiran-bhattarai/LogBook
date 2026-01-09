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

    const [highlightName, setHighlightName] = useState(false)
    const [highlightEmail, setHighlightEmail] = useState(false)

    const [highlightPassword, setHighlightPassword] = useState(false)
    const [highlightPasswordRetype, setHighlightPasswordRetype] = useState(false)

    const [nameTouched, setNameTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [passwordRetypeTouched, setPasswordRetypeTouched] = useState(false)

    const [message, setMessage] = useState("")

    const [nameLength, setNameLength] = useState(0)

    const isValidName = (name) => /^[a-zA-Z0-9_]{3,20}$/.test(name)


    const getOutlineColor = (touched, validator) => {
        if(!touched) return "#ffffff";
        return validator ? "outline-green-500" : "outline-red-600";

    }


    const handleNameChange = (e) => {
        setNameLength(e.target.value.length)
        setNameValue(e.target.value)
        e.target.value.length < 3 || e.target.value.length > 20 ? setHighlightName(true) : setHighlightName(false)
    }

    const handleEmailChange = (e) => {
        setEmailValue(e.target.value)

        if (validator.isEmail(e.target.value)) {
            setHighlightEmail(false)
        }
        else {
            setHighlightEmail(true)
        }
    }

    const handlePasswordChange = (e) => {
        handlePasswordIcon(e)

        if (passwordRetypeValue === e.target.value && validator.isStrongPassword(e.target.value) && validator.isStrongPassword(passwordRetypeValue)) {
            setHighlightPassword(false)
            setHighlightPasswordRetype(false)

        }
        else {
            setHighlightPassword(true)
            setHighlightPasswordRetype(true)

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
        handlePasswordRetypeIcon(e)

        if (passwordValue === e.target.value && validator.isStrongPassword(e.target.value) && validator.isStrongPassword(passwordValue)) {
            setHighlightPassword(false)
            setHighlightPasswordRetype(false)
        }
        else {
            setHighlightPassword(true)
            setHighlightPasswordRetype(true)
        }


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
        setPasswordRetypeValue(e.target.value);
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


        if (emailValue === "" || passwordValue === "" || nameValue === "" || passwordRetypeValue === "") {
            setMessage("Please provide all the details.")
            setHighlightName(nameValue === "")
            setHighlightEmail(emailValue === "")
            setHighlightPassword(passwordValue === "")
            setHighlightPasswordRetype(passwordRetypeValue === "")
            return
        }
        
        if (!isValidName(nameValue)) {
            setMessage("Name must be 3–20 characters and can only include letters, numbers, and underscore.")
            
            return
        }

        if (!validator.isEmail(emailValue)) {
            setHighlightEmail(true)
            setMessage("Please provide a valid email")
            return
        } else {
            setHighlightEmail(false)
        }


        if (!validator.isStrongPassword(passwordValue)) {
            setHighlightPassword(true)
            setMessage("Please provide a strong password")
            return
        } else {
            setHighlightPassword(false)
        }




        setMessage("")
    }



    return (
        <div className="flex align-middle justify-center items-center h-screen bg-gray-900">
            <div className=" p-2 py-4 bg-white relative rounded-xl flex flex-col items-center w-[clamp(350px,40vw,420px)] ">

                <h1 className="text-5xl font-inter text-[#444444] font-medium mb-34 ">Sign up</h1>
                <span className={`absolute top-25 text-lg text-red-600 font-medium text-center leading-tight`}>{message}</span>

                <form onSubmit={handleSubmit} noValidate className="w-full px-4 items-center flex flex-col">

                    <div className="w-full overflow-clip flex items-center relative justify-center">
                        <img src="../src/assets/user.svg" alt="" className="absolute h-6 left-4" />

                        <input type="text" placeholder="Name" className={`bg-[#eeeeee] py-2.5 m-2 w-[99%] px-10 rounded-4xl  outline-3 outline-[#ffffff] text-[clamp(19px,2.4vw,24px)] text-ellipsis  ${getOutlineColor(nameTouched || highlightName, !(nameLength < 3 || nameLength > 20))} pr-15 mx-1 text-ellipsis transition duration-300`} onChange={(e) => handleNameChange(e)} onBlur={() => setNameTouched(true)}/>

                        <span className={`absolute h-7 bottom-3 right-3.5 cursor-pointer text-xl font-medium ${nameLength === 0 ? "text-neutral-500" : (nameLength < 3 || nameLength > 20) ? "text-red-600" : "text-green-700"} `}>{nameLength}/20</span>
                    </div>
                    <div className="w-full overflow-clip flex items-center justify-center relative">
                        <img src="../src/assets/mail.svg" alt="" className="absolute h-6 left-4" />
                        <input placeholder="Email" className={`bg-[#eeeeee] py-2.5 m-2 w-[99%] px-10 rounded-4xl  text-[clamp(19px,2.4vw,24px)] outline-[#ffffff] outline-3 text-ellipsis ${getOutlineColor(emailTouched || highlightEmail, validator.isEmail(emailValue))} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handleEmailChange(e)} onBlur={() => setEmailTouched(true)}/>
                    </div>

                    <div className="w-full overflow-clip flex items-center relative justify-center">
                        <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                        <input type={passwordType} placeholder="Password" className={`bg-[#eeeeee] py-2.5 m-2 w-[99%] px-10 rounded-4xl  outline-3 outline-[#ffffff] text-[clamp(19px,2.4vw,24px)] text-ellipsis ${getOutlineColor(passwordTouched || highlightPassword , (validator.isStrongPassword(passwordValue) && passwordValue==passwordRetypeValue))} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handlePasswordChange(e)} onBlur={() => {setPasswordRetypeTouched(true); setPasswordTouched(true)}}/>

                        <img src={`../src/assets/${passwordIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordVisibility} />
                    </div>
                    <div className="w-full overflow-clip flex items-center relative justify-center">
                        <img src="../src/assets/pass.svg" alt="" className="absolute h-6 left-4" />

                        <input type={passwordRetypeType} placeholder="Retype Password" className={`bg-[#eeeeee] py-2.5 m-2 w-[99%] px-10 rounded-4xl  outline-3 outline-[#ffffff] text-[clamp(19px,2.4vw,24px)] text-ellipsis ${getOutlineColor(passwordRetypeTouched || highlightPasswordRetype, (validator.isStrongPassword(passwordRetypeValue) && passwordValue==passwordRetypeValue))} mx-1 text-ellipsis transition duration-300`} onChange={(e) => handlePasswordRetypeChange(e)} onBlur={() => {setPasswordRetypeTouched(true); setPasswordTouched(true)}}/>

                        <img src={`../src/assets/${passwordRetypeIcon}.svg`} height="28px" alt="" className="absolute h-7 right-3.5 cursor-pointer" onClick={handlePasswordRetypeVisibility} />

                    </div>


                    <span className={`text-lg text-neutral-400 text-center leading-tight m-4`}>Password should be atleast 8 characters, including one uppercase letter, one lowercase letter, one number, and one special symbol.</span>

                    <button type="submit" className="m-3 mb-3 bg-linear-to-r from-yellow-400 to-red-500 hover:from-red-500 hover:to-yellow-400 transition duration-300 text-white 
                    text-3xl pt-1 pb-2 font-semibold rounded-3xl cursor-pointer hover:scale-105 self-auto px-14 w-[80%] mt-4">Sign up</button>
                </form>

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
                    <span>Already have an account?&nbsp;</span>
                    <Link to={"/login"} className="hover:underline hover:scale-105  text-purple-900 transition duration-300 font-semibold">Login</Link>
                </div>

            </div>
        </div>
    )

}

export default SignupPage