import { useState } from "react"
import NavBar from "./NavBar"
import Footer from "./Footer"
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"
import { TypeAnimation } from "react-type-animation"
import SearchUsers from "./SearchUsers"


function UnauthenticatedPage() {

    const [loginWindow, setLoginWindow] = useState(false)
    const [signupWindow, setSignupWindow] = useState(false)

    const [searchAccounts, setSearchAccounts] = useState(false)

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
            <NavBar setSearchUsers={setSearchAccounts} setLogin={setLoginWindowMain} setSignup={setSignupWindowMain}></NavBar>

            <div className="flex-1 flex-col flex justify-center">
                <div className="text-white text-5xl self-center max-w-[80%] text-center flex flex-col gap-[clamp(60px,14vh,140px)] p-6 whitespace-nowrap">
                    <TypeAnimation
                        sequence={[
                            'Capture ideas.',
                            1000,
                            'Organize thoughts.',
                            1000,
                            'Access anywhere.',
                            1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: 'clamp(40px,7vmin,60px)', display: 'inline-block' }}
                        repeat={Infinity}
                    />
                    <p className="text-[clamp(20px,3.6vmin,34px)] whitespace-normal">LogBook is a secure, multi-user note-taking app built with the MERN stack.</p>

                    <div className="flex flex-col items-center gap-2">
                        <div className="text-2xl flex gap-4">
                            <button className="border-amber-700 bg-amber-700 border-2 px-3 pb-1.5 rounded hover:bg-amber-700 hover:border-amber-700 duration-200 transition hover:scale-105 cursor-pointer" onClick={setLoginWindowMain}>Login</button>
                            <button className="border-amber-800  border-2 px-3 pb-1.5 rounded duration-200 transition hover:scale-105 cursor-pointer" onClick={setSignupWindowMain}>Sign up</button>
                        </div>
                        <p className="text-2xl"></p>
                    </div>

                </div>

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
                {searchAccounts && <div className="absolute h-full w-full bg-[#00000063] z-10">
                    <div>
                        <SearchUsers setSearchUsers={setSearchAccounts} />
                    </div>
                </div>}
            </div>

            <Footer></Footer>
        </div>
    )
}

export default UnauthenticatedPage