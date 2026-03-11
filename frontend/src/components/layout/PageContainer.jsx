import { useState } from "react"
import Footer from "./Footer"
import LoginPage from "../../features/auth/components/LoginPage"
import SignupPage from "../../features/auth/components/SignupPage"
import NavBar from "../layout/navbar/NavBar"

function PageContainer({ children }) {

    const [loginWindow, setLoginWindow] = useState(false)
    const [signupWindow, setSignupWindow] = useState(false)

    const setLoginWindowMain = () => {
        setLoginWindow(prev => !prev)
        setSignupWindow(false)
    }

    const setSignupWindowMain = () => {
        setSignupWindow(prev => !prev)
        setLoginWindow(false)
    }

    return (
        <div className="min-h-screen flex flex-col bg-neutral-900">
            <NavBar setLogin={setLoginWindowMain} setSignup={setSignupWindowMain}></NavBar>

            <div className="flex-1 flex-col flex justify-center">
                {children}

                {(loginWindow || signupWindow) &&
                    <div className="absolute self-center flex items-center bg-[#00000040] h-screen w-screen justify-center z-1">
                        <div className="">
                            {loginWindow
                                && <div>
                                    <LoginPage setSignupWindow={setSignupWindowMain} setItselfOff={() => setLoginWindow(false)} />
                                </div>}
                            {signupWindow && <SignupPage setLoginWindow={setLoginWindowMain} setItselfOff={() => setSignupWindow(false)}></SignupPage>}
                        </div>
                    </div>}
            </div>
            <Footer></Footer>
        </div>
    )
}

export default PageContainer