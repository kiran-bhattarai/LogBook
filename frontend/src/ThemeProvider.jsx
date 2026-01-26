import { useState, createContext, useEffect, useContext } from "react"

const ThemeContext = createContext(null)

function ThemeProvider({ children }) {

    const [darkMode, setDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches)

    const toggleTheme = () => {
        setDarkMode(prev => !prev)
    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
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