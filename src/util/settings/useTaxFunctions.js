import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

export const useTaxFunctions = () => {

    const [taxInfo, setTaxInfo] = useState({
        name: '',
        rate: '',
        type: '',
        authority: '',
        calculation_method: '',
        effective_date: '',
        notes: '',
    })

    const [isLoadingName, setIsLoadingName] = useState(false)
    const [isLoadingRate, setIsLoadingRate] = useState(false)
    const [isLoadingType, setIsLoadingType] = useState(false)
    const [isLoadingAuthority, setIsLoadingAuthority] = useState(false)
    const [isLoadingCalculationMethod, setIsLoadingCalculationMethod] = useState(false)
    const [isLoadingEffectiveDate, setIsLoadingEffectiveDate] = useState(false)
    const [isLoadingNotes, setIsLoadingNotes] = useState(false)
    
    const [serverResponse, setServerResponse] = useState({
        name: { status: '', message: '' },
        rate: { status: '', message: '' },
        type: { status: '', message: '' },
        authority: { status: '', message: '' },
        calculation_method: { status: '', message: '' },
        effective_date: { status: '', message: '' },
        notes: { status: '', message: '' },
    })
    
    const fetchTaxInfo = async (e) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/get/tax`);

            if (response.data.status === 200) {
                setTaxInfo((prevTaxInfo) => ({
                  ...prevTaxInfo,
                    name: response.data.data[0].name,
                    rate: response.data.data[0].rate,
                    type: response.data.data[0].type,
                    authority: response.data.data[0].authority,
                    calculation_method: response.data.data[0].calculation_method,
                    effective_date: response.data.data[0].effective_date,
                    notes: response.data.data[0].notes,  
                }))
            } 
            else {
                // setServerResponse(response.data.message)
                console.log(response.data.message);
            }
        } catch (error) {
            // setServerResponse(error.message)
            console.log(error)
        }
    }

    const handleFieldChange = async (e) => {
        const { name, value } = e.target;

        setTaxInfo((prevTaxInfo) => ({
            ...prevTaxInfo,
            [name]: value
        }))
      
        if (name === 'name') {
            setIsLoadingName(true);
        
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/tax/name`, { 
                    [name]: value 
                });
        
                if (response.data.status === 200) {
                    setServerResponse({
                        ...serverResponse,
                        name: {
                            status: response.data.status,
                            message: response.data.message
                        }
                    });
        
                    // Show loader for 3 seconds
                    setIsLoadingName(true);

                    // Hide loader after 3 seconds
                    setTimeout(() => {
                        setIsLoadingName(false);
                    }, 3000);
        
                } else {
                    setServerResponse({
                        ...serverResponse,
                        name: {
                            status: response.data.status,
                            message: response.data.message
                        }
                    });
        
                    // Show loader for 3 seconds
                    setIsLoadingName(true);

                    // Hide loader after 3 seconds
                    setTimeout(() => {
                        setIsLoadingName(false);
                    }, 3000);
        
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error);
                setIsLoadingName(false);
            }
        }
        

        if (name === 'rate') {
            setIsLoadingRate(true);

            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/tax/rate`, { 
                    [name]: value 
                });

                if (response.data.status === 200) {
                    setServerResponse({
                        ...serverResponse,
                        rate: {
                            status: response.data.status,
                            message: response.data.message
                        }
                    });
        
                    // Show loader for 3 seconds
                    setIsLoadingRate(true);


                    // Hide loader after 3 seconds
                    setTimeout(() => {
                        setIsLoadingRate(false);
                    }, 3000);
        
                } else {
                    setServerResponse({
                        ...serverResponse,
                        rate: {
                            status: response.data.status,
                            message: response.data.message
                        }
                    });
        
                    // Show loader for 3 seconds
                    setIsLoadingRate(true);


                    // Hide loader after 3 seconds
                    setTimeout(() => {
                        setIsLoadingRate(false);
                    }, 3000);
        
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error);
                setIsLoadingRate(false);
            }
        }

        if (name === 'type') {
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/tax/type`, { 
                    [name]: value 
                });

                if (response.data.status === 200) {
                    toast.success(response.data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {
                    toast.warn(response.data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (name === 'authority') {
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/tax/authority`, { 
                    [name]: value 
                });

                if (response.data.status === 200) {
                    toast.success(response.data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {
                    toast.warn(response.data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (name === 'calculation_method') {
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/tax/calculation-method`, { 
                    [name]: value 
                });

                if (response.data.status === 200) {
                    toast.success(response.data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {
                    toast.warn(response.data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (name === 'effective_date') {
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/tax/effective-date`, { 
                    [name]: value 
                });

                if (response.data.status === 200) {
                    toast.success(response.data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                } else {
                    toast.warn(response.data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })

                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (name === 'notes') {
            setIsLoadingNotes(true)

            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/tax/notes`, { 
                    [name]: value 
                });

                if (response.data.status === 200) {
                    setServerResponse({
                        ...serverResponse,
                        notes: {
                            status: response.data.status,
                            message: response.data.message
                        }
                    })

                    // Show loader for 3 seconds
                    setIsLoadingNotes(true);

                    // Hide loader after 3 seconds
                    setTimeout(() => {
                        setIsLoadingNotes(false);
                    }, 3000);

                } else {
                    setServerResponse({
                        ...serverResponse,
                        notes: {
                            status: response.data.status,
                            message: response.data.message
                        }
                    })

                    // Show loader for 3 seconds
                    setIsLoadingNotes(true);

                    // Hide loader after 3 seconds
                    setTimeout(() => {
                        setIsLoadingNotes(false);
                    }, 3000);

                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error);
                setIsLoadingNotes(false)
            }
        }
    }
    
  
    useEffect(() => {
        fetchTaxInfo()
    })

    return {
        taxInfo,
        isLoadingName,
        isLoadingRate,
        isLoadingType,
        isLoadingAuthority,
        isLoadingCalculationMethod,
        isLoadingEffectiveDate,
        isLoadingNotes,
        serverResponse,
        handleFieldChange
    }
}