import { useState, createContext, useEffect, useContext } from "react"

const ThemeContext = createContext(null)

function ThemeProvider({ children }) {

    const getTheme = () => {
        const theme = localStorage.getItem("theme")
        if (!theme) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        if (theme === "light") return false
        return true
    }

    const [darkMode, setDarkMode] = useState(getTheme())

    const toggleTheme = () => {
        setDarkMode(prev => !prev)
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light")
        }
    }, [darkMode])

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

export const useTheme = () => useContext(ThemeContext)