import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const PrefixContext = createContext()

export const usePrefix = () => {
    return useContext(PrefixContext)
}

export const SKUPrefixProvider = ({ children }) => {
    const [prefix, setPrefix] = useState(() => localStorage.getItem('skuPrefix') || 'ON')

    const togglePrefix = (newPrefix) => {
        setPrefix(newPrefix)
        localStorage.setItem('skuPrefix', newPrefix)

        toast.success('SKU prefix set to ' + newPrefix + '!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    useEffect(() => {
        // Load currency from localStorage on component mount
        const storedPrefix = localStorage.getItem('skuPrefix')
        if (storedPrefix) {
            setPrefix(storedPrefix)
        }
    }, []) // Add empty dependency array to run only on mount

    return (
        <PrefixContext.Provider value={{ prefix, togglePrefix }}>
            {children}
        </PrefixContext.Provider>
    )
}
