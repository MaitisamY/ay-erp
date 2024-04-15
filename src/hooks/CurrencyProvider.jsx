import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const CurrencyContext = createContext()

export const useCurrency = () => {
    return useContext(CurrencyContext)
}

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'USD')

    const toggleCurrency = (newCurrency) => {
        setCurrency(newCurrency)
        localStorage.setItem('currency', newCurrency)

        toast.success('Currency set to ' + newCurrency + '!', {
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
        const storedCurrency = localStorage.getItem('currency')
        if (storedCurrency) {
            setCurrency(storedCurrency)
        }
    }, []) // Add empty dependency array to run only on mount

    return (
        <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
            {children}
        </CurrencyContext.Provider>
    )
}
