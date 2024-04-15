import { useState, useEffect, useRef } from 'react'
import { usePrefix } from '../../hooks/SKUPrefixProvider'
import axios from 'axios'
import { toast } from 'react-toastify'

export const useGeneralFunctions = () => {

    const { prefix } = usePrefix()

    const [skuPrefix, setSKUPrefix] = useState(prefix)
    const [currencies, setCurrencies] = useState(null)
    const [serverResponse, setServerResponse] = useState(null)
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [fileSizeError, setFileSizeError] = useState(false);
    const [orgInfo, setOrgInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        logo: selectedFileName ? selectedFileName : '',
    })

    const handleOrgInfoChange = (event) => {
        const { name, value } = event.target;
        setOrgInfo((prevOrgInfo) => ({
            ...prevOrgInfo,
            [name]: value
        }));
    }

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

    const fetchOrganizationDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/get/organization`);

            if (response.data.status === 200) {
                setOrgInfo({
                    name: response.data.data.name,
                    email: response.data.data.email,
                    phone: response.data.data.phone,
                    address: response.data.data.address,
                    website: response.data.data.website,
                    logo: response.data.data.logo,
                })
                console.log(response.data.data);
            } else {
                toast.error('You need to set your organization details', {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
                console.log(response.data.message);
            }
        } catch (error) {
            console.log('Error fetching organization details', error);
            setServerResponse(error.message);
        }
    }
    
    useEffect(() => {
        fetchOrganizationDetails()
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
        orgInfo,
        handleOrgInfoChange,
        handleFileChange,
        handleFileClick,
        handlePrefixChange,
    }
}