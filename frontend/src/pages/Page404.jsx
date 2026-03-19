import PageContainer from "../components/layout/PageContainer"
import { Link } from "react-router-dom"
import { useEffect } from "react"


function Page404() {

    useEffect(() => { document.title = "404 | LogBook" }, [])

    return (
        <>
            <PageContainer>
                <div className="flex-1 text-4xl dark:text-white text-black text-center justify-center flex items-center flex-col">
                    <span className="text-5xl">404</span>
                    <span className="py-10">This page doesn't exists</span>
                    <Link to={"/"} className="text-purple-900 hover:scale-110 underline text-lg font-medium transition dark:text-purple-700 duration-200">Go Back</Link>
                </div>
            </PageContainer>
        </>
    )
}

export default Page404