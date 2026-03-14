import { Link } from "react-router-dom"

function Logo() {

    return (
        <Link to={"/"}>
            <div className="hover:scale-105 duration-200 text-2xl font-bold text-white font-poppins rounded bg-linear-60 dark:from-indigo-600 dark:to-green-600 from-indigo-500 to-green-500 px-1.5 py-0.5">
                <span className="">LB</span>
            </div>
        </Link>
    )
}

export default Logo