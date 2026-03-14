import { useState } from "react"
import Footer from "./Footer"
import LoginPage from "../../features/auth/components/LoginPage"
import SignupPage from "../../features/auth/components/SignupPage"
import NavBar from "../layout/navbar/NavBar"
import BackgroundEffects from "../ui/BackgroundEffects"

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
        <div className="min-h-screen flex flex-col overflow-clip">
            <NavBar setLogin={setLoginWindowMain} setSignup={setSignupWindowMain}></NavBar>

            <div className="flex-1 flex-col flex justify-center self-center relative w-full">
                <BackgroundEffects />

                {children}

                {(loginWindow || signupWindow) &&
                    <div className="absolute self-center flex items-center bg-[#00000040] h-screen w-screen justify-center z-20">
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