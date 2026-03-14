import { useTheme } from "../../../context/ThemeContext"

function ThemeToggle() {

    const { toggleTheme, darkMode } = useTheme()

    return (
        <div className="flex items-center justify-center h-[60%] mt-0.5">
            <button onClick={toggleTheme} className="hover:bg-neutral-300 dark:hover:bg-neutral-700 h-full p-1 w-9 rounded cursor-pointer hover:scale-105 transition duration-300">
                <img src={darkMode ? "../src/assets/light_mode.svg" : "../src/assets/dark_mode.svg"} className="h-full justify-self-center" />
            </button>
        </div>
    )
}

export default ThemeToggle