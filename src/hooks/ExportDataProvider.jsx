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

    const [importData, setImportData] = useState(() => {
        const storedImportData = localStorage.getItem('importData');
        return storedImportData ? storedImportData === 'true' : false;
    })

    useEffect(() => {
        localStorage.setItem('exportData', exportData.toString());
        localStorage.setItem('importData', importData.toString());
    }, [exportData, importData]);

    const toggleExportData = () => {
        setExportData((prevExportData) => !prevExportData);
    
        toast.success(`Export data set to ${exportData ? 'off' : 'on'}`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const toggleImportData = () => {
        setImportData((prevImportData) => !prevImportData);

        toast.success(`Import data set to ${importData ? 'off' : 'on'}`, {
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
        <ExportDataContext.Provider value={{ exportData, importData, toggleExportData, toggleImportData }}>
            {children}
        </ExportDataContext.Provider>
    )
}

