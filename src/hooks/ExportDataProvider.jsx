import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const ExportDataContext = createContext()

export const useExportData = () => {
    return useContext(ExportDataContext)
}

export const ExportDataProvider = ({ children }) => {

    const [exportData, setExportData] = useState(() => {
        const storedExportData = localStorage.getItem('exportData');
        return storedExportData ? storedExportData === 'true' : false;
    });

    useEffect(() => {
        localStorage.setItem('exportData', exportData.toString());
    }, [exportData]);

    const toggleExportData = () => {
        setExportData((prevExportData) => !prevExportData);
    
        toast.success(`Export data set to ${exportData}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    

    return (
        <ExportDataContext.Provider value={{ exportData, toggleExportData }}>
            {children}
        </ExportDataContext.Provider>
    )
}

