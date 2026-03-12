import { useTheme } from "../../../context/ThemeContext"

function ThemeToggle() {

    const { toggleTheme } = useTheme()
    return (
        <div className="flex items-center justify-center h-[60%] mt-0.5">
            <button onClick={toggleTheme} className="hover:bg-neutral-900 h-full p-1 w-9 rounded cursor-pointer hover:scale-105 transition duration-300">
                <img src="../src/assets/dark_mode.svg" className="h-full justify-self-center" />
            </button>
        </div>
    )
}

export default ThemeToggle