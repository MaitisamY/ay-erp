import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export const  ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')

        toast.success(`Theme set to ${theme === 'light' ? 'dark' : 'light'}!`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}