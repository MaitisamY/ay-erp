
import { useState, useEffect } from 'react'
import { useCategoryFunctions } from '../settings/useCategoryFunctions'

export const useSaleFunctions = () => {

    const { categories } = useCategoryFunctions()
    
    const [categoryOptions, setCategoryOptions] = useState([])

    const [sale, setSale] = useState({
        saleId: '',
        clientName: '',
        product: '',
        category: '',
        sellingPrice: '',
        cutOffPrice: '',
        quantity: '',
        tax: '',
        remarks: '',
    })

    const [selectedItems, setSelectedItems] = useState([])

    const handleSelection = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale({ ...sale, [name]: value });
    }

    useEffect(() => {
        
        setCategoryOptions(categories);
    }, [categories]);

    return {
        categoryOptions,
        sale,
        selectedItems,
        setSelectedItems,
        handleSelection,
        handleChange,
    }
}