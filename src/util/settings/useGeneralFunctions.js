import { useState, useEffect, useRef } from 'react'
import { usePrefix } from '../../hooks/SKUPrefixProvider'
import axios from 'axios'

export const useGeneralFunctions = () => {

    const { prefix } = usePrefix()

    const [skuPrefix, setSKUPrefix] = useState(prefix)
    const [currencies, setCurrencies] = useState(null)
    const [serverResponse, setServerResponse] = useState(null)
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [fileSizeError, setFileSizeError] = useState(false);

    const handleFileChange = () => {
      const file = fileInputRef.current.files[0]
      const maxFiles = 1
      if (file) {
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSizeInBytes) {
            setFileSizeError('File size exceeds the limit (5MB)');
          return;
        }
        if (file.length > maxFiles) {
            setErrorMessage(`You can only upload ${maxFiles} file`);
            return;
        }
        setSelectedFileName(file.name);
        setFileSizeError('');
      }
    };

    const handleFileClick = () => {
        fileInputRef.current.click()
    }

    const handlePrefixChange = (event) => {
        const { value } = event.target;
        setSKUPrefix(value);
    }

    const fetchCurrencies = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_CURRENCY_API}/currencies.json?app_id=${import.meta.env.VITE_APP_ID}`);
            
            if (response.data) {
                setCurrencies(response.data);
            } else {
                // Handle the case when response data is empty
                setCurrencies(null);
                setServerResponse("Empty response from the server.");
            }
        } catch (error) {
            // Handle errors from the API request
            console.error('Error fetching currencies:', error);
            setServerResponse(error.message);
        }
    }
    
    useEffect(() => {
        fetchCurrencies()
    }, [])

    return {
        prefix,
        skuPrefix,
        currencies,
        serverResponse,
        fileInputRef,
        selectedFileName,
        fileSizeError,
        handleFileChange,
        handleFileClick,
        handlePrefixChange,
    }
}