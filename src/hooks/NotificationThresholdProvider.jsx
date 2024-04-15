import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const NotificationThresholdContext = createContext()

export const useNotificationThreshold = () => {
    return useContext(NotificationThresholdContext)
}

export const NotificationThresholdProvider = ({ children }) => {

    const [notificationThreshold, setNotificationThreshold] = useState(5)

    useEffect(() => {
        const storedNotificationThreshold = localStorage.getItem('notificationThreshold')
        if (storedNotificationThreshold) {
            setNotificationThreshold(parseInt(storedNotificationThreshold))
        }
    }, [])

    const toggleNotificationThreshold = (newThreshold) => {
        setNotificationThreshold(newThreshold)
        localStorage.setItem('notificationThreshold', newThreshold)

        toast.success('Notification threshold set to ' + newThreshold + '!', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const thresholds = [5, 10, 25, 50, 100, 250, 500, 1000, 1500, 2000, 3000, 5000, 7500, 10000]

    return (
        <NotificationThresholdContext.Provider value={{ notificationThreshold, toggleNotificationThreshold, thresholds }}>
            {children}
        </NotificationThresholdContext.Provider>
    )
}