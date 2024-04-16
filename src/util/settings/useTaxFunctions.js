import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useTaxFunctions = () => {

    const [taxInfo, setTaxInfo] = useState({
        taxName: '',
        taxRate: '',
        taxType: '',
        taxAuthority: '',
        taxCalculationMethod: '',
        effectiveDate: '',
        additionalNotes: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaxInfo({ ...taxInfo, [name]: value });
      }
    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      toast.success('Successfully added tax')
      
      console.log(formData);
    }

    return {
        taxInfo,
        handleChange,
        handleSubmit
    }
}