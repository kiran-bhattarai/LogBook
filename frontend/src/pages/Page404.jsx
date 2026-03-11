import PageContainer from "../components/layout/PageContainer"
import { Link } from "react-router-dom"

function Page404() {

    return (
        <>
            <PageContainer>
                <div className="flex-1 bg-neutral-900 text-4xl text-white text-center justify-center flex items-center flex-col">
                    <span className="text-5xl">404</span>
                    <span className="py-10">This page doesn't exists</span>
                    <Link to={"/"} className="text-purple-900 hover:scale-110 underline text-lg font-medium transition duration-200">Go Back</Link>
                </div>
            </PageContainer>
        </>
    )
}

export default Page404