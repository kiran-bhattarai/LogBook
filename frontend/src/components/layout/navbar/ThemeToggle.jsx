import { useTheme } from "../../../context/ThemeContext"
import SunIcon from "@/assets/icons/sun.svg"
import MoonIcon from "@/assets/icons/moon.svg"

function ThemeToggle() {

    const { toggleTheme, darkMode } = useTheme()

    return (
        <div className="flex items-center justify-center h-[60%] mt-0.5">
            <button onClick={toggleTheme} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 h-full p-1 w-9 rounded cursor-pointer hover:scale-105 transition duration-300">
                <img src={darkMode ? SunIcon : MoonIcon} className="h-full justify-self-center" />
            </button>
        </div>
    )
}

export default ThemeToggle