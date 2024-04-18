import { useState, useEffect, useRef } from 'react'
import { usePrefix } from '../../hooks/SKUPrefixProvider'
import { useOrganizationCredential } from '../../hooks/OrganizationCredentialProvider'
import axios from 'axios'
import { toast } from 'react-toastify'

export const useGeneralFunctions = () => {

    const { setOrgCreds } = useOrganizationCredential()
    const { prefix } = usePrefix()
    const [skuPrefix, setSKUPrefix] = useState(prefix)
    const [currencies, setCurrencies] = useState(null)
    const [serverResponse, setServerResponse] = useState(null)
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [copyOfSelectedFileName, setCopyOfSelectedFileName] = useState('');
    const [fileSizeError, setFileSizeError] = useState(false);
    const [orgInfo, setOrgInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        website: '',
    })

    const [copyOfOrgInfo, setCopyOfOrgInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        website: '',
    })

    const [isFormDirty, setIsFormDirty] = useState(false);

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
            setFileSizeError(`You can only upload ${maxFiles} file`);
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

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!orgInfo.name || !orgInfo.email || !orgInfo.phone || !orgInfo.address || !orgInfo.website) {
            toast.warn('Please fill in all fields', {
                position: "bottom-right",
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
            setServerResponse('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/organization`, {
                name: orgInfo.name,
                email: orgInfo.email,
                phone: orgInfo.phone,
                address: orgInfo.address,
                website: orgInfo.website,
            });

            if (response.data.status === 200) {

                toast.success('Organization details updated successfully', {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });

            } else {
                toast.warn(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log(error);
            setServerResponse(error.message);
        }

        // Reset the form
        setTimeout(() => {
            window.location.reload();
        }, 2000);
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

                setOrgCreds(response.data.data[0])

                setOrgInfo((prevOrgInfo) => ({
                    ...prevOrgInfo,
                    name: response.data.data[0].name,
                    email: response.data.data[0].email,
                    phone: response.data.data[0].phone,
                    address: response.data.data[0].address,
                    website: response.data.data[0].website,
                }))

                setCopyOfOrgInfo({
                    name: response.data.data[0].name,
                    email: response.data.data[0].email,
                    phone: response.data.data[0].phone,
                    address: response.data.data[0].address,
                    website: response.data.data[0].website,
                })

                setSelectedFileName(
                    response.data.data[0].logo 
                    && response.data.data[0].logo !== 'null'
                    && response.data.data[0].logo !== 'undefined'
                    && response.data.data[0].logo !== '' 
                    ? response.data.data[0].logo : ''
                );

                setCopyOfSelectedFileName(
                    response.data.data[0].logo 
                    && response.data.data[0].logo !== 'null'
                    && response.data.data[0].logo !== 'undefined'
                    && response.data.data[0].logo !== '' 
                    ? response.data.data[0].logo : ''
                )
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log('Error fetching organization details', error);
            setServerResponse(error.message);
        }
    }

    const handleFileSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        const file = fileInputRef.current.files[0];

        formData.append('logo', file);

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/logo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status === 200) {

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });

                setOrgCreds((prevOrgCreds) => ({
                    ...prevOrgCreds,
                    logo: selectedFileName
                }))
            } else {

                toast.warn(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {

        fetchOrganizationDetails()
        fetchCurrencies()

        if (serverResponse !== null) {
            setTimeout(() => {
                setServerResponse(null);
            }, 5000);
        }
    }, [serverResponse]);

    return {
        prefix,
        skuPrefix,
        currencies,
        serverResponse,
        orgInfo,
        copyOfOrgInfo,
        selectedFileName,
        copyOfSelectedFileName,
        fileSizeError,
        fileInputRef,
        handleFileChange,
        handleFileClick,
        handleOrgInfoChange,
        handlePrefixChange,
        handleFormSubmit,
        handleFileSubmit
    }
}