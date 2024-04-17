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

        } catch (error) {
            console.log(error);
        }
    }

    const handleFieldChange = async (e) => {
        const { name, value } = e.target;

        setTaxInfo((prevTaxInfo) => ({
            ...prevTaxInfo,
            [name]: value
        }))

        if (value === '') {
            return
        } else {
      
          if (name === 'name') {
              try {
                  const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/tax/name`, { 
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

          if (name === 'rate') {
              try {
                  const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/tax/rate`, { 
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
              try {
                  const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/update/tax/notes`, { 
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
        }
    }
    
  
    useEffect(() => {
        fetchTaxInfo()
    })

    return {
        taxInfo,
        handleFieldChange
    }
}