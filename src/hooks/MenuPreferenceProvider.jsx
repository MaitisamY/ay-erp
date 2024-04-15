import { createContext, useContext, useState, useEffect } from 'react'

const MenuPreferenceContext = createContext()

export const useMenuPreference = () => { 
    return useContext(MenuPreferenceContext)
}

export const MenuPreferenceProvider = ({ children }) => {

    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        const storedIsCollapsed = localStorage.getItem('isCollapsed')
        setIsCollapsed(storedIsCollapsed === 'true')
    }, [])
    

    const onSidebarToggle = () => {
        setIsCollapsed(prevIsCollapsed => {
            const newIsCollapsed = !prevIsCollapsed
            localStorage.setItem('isCollapsed', newIsCollapsed ? 'true' : 'false')
            return newIsCollapsed
        })
    }
    

    return (
        <MenuPreferenceContext.Provider value={{ isCollapsed, onSidebarToggle }}>
            {children}
        </MenuPreferenceContext.Provider>
    )
}