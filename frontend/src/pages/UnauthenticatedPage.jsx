import { useState } from "react"
import LoginPage from "../features/auth/components/LoginPage"
import SignupPage from "../features/auth/components/SignupPage"
import { TypeAnimation } from "react-type-animation"
import PageContainer from "../components/layout/PageContainer"

function UnauthenticatedPage() {

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
        <>
            <PageContainer>
                <div className="font-inter text-white text-5xl self-center max-w-[80%] text-center flex flex-col items-center gap-10 p-6 whitespace-nowrap">
                    <div className="font-poppins font-medium">
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
                            speed={30}
                            style={{ fontSize: 'clamp(34px,5vw,60px)', display: 'inline-block' }}
                            repeat={Infinity}
                        />
                    </div>
                    <p className="text-[clamp(18px,1.4vw,20px)] max-w-225 2xl:max-w-240 whitespace-normal font-light text-neutral-300">A powerful yet simple note-taking app built with the MERN stack. Easily create, organize, and manage your notes in a clean and distraction-free workspace. Whether you're saving quick ideas or detailed thoughts, everything stays accessible and organized in one place.</p>

                    <div className="flex flex-col items-center gap-2 font-poppins font-medium">
                        <div className="text-2xl flex gap-4">
                            <button className="bg-linear-60 from-indigo-600 to-green-800 hover:to-indigo-800 hover:from-green-900 px-3 pb-1 rounded duration-200 transition hover:scale-110 cursor-pointer" onClick={setLoginWindowMain}>Login</button>

                            <span className="p-0.5 bg-linear-60 from-indigo-600 to-green-700 hover:to-indigo-800 hover:from-green-900 rounded hover:scale-110 duration-200">
                            <button className="bg-neutral-900 px-3 pb-1 rounded duration-200 transition cursor-pointer" onClick={setSignupWindowMain}>Sign up</button>

                            </span>
                        </div>
                        <p className="text-2xl"></p>
                    </div>

                </div>
            </PageContainer>
            {
                (loginWindow || signupWindow) &&
                <div className="absolute self-center top-0 flex items-center bg-[#00000040] h-screen w-screen justify-center z-20">
                    <div className="">
                        {loginWindow
                            && <div>
                                <LoginPage setSignupWindow={setSignupWindowMain} setItselfOff={() => setLoginWindow(false)} />
                            </div>}
                        {signupWindow && <SignupPage setLoginWindow={setLoginWindowMain} setItselfOff={() => setSignupWindow(false)}></SignupPage>}
                    </div>
                </div>
            }
        </>
    )
}

export default UnauthenticatedPage