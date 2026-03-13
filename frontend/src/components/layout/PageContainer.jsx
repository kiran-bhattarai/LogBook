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
        <div className="min-h-screen flex flex-col overflow-clip">
            <NavBar setLogin={setLoginWindowMain} setSignup={setSignupWindowMain}></NavBar>

            <div className="flex-1 flex-col flex justify-center self-center relative w-full">

                <div className="absolute inset-0 -z-10 max-w-full m-auto">
                    <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-500/15 rounded-full blur-[120px]"></div>

                    <div className="absolute top-[60%] left-[10%] w-80 h-80 bg-purple-500/10 rounded-full blur-[120px]"></div>

                    <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]"></div>

                    <div className="absolute bottom-[5%] right-[5%] w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px]"></div>

                    <div className="absolute top-[45%] left-[45%] w-96 h-96 bg-indigo-500/8 rounded-full blur-[140px]"></div>

                    <div className="absolute bottom-[30%] right-[30%] w-72 h-72 bg-green-400/10 rounded-full blur-[120px]"></div>
                </div>

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