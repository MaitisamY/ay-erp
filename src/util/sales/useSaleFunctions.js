
import { useState, useEffect } from 'react'
import { useCategoryFunctions } from '../settings/useCategoryFunctions'

export const useSaleFunctions = () => {

    const { categories } = useCategoryFunctions()
    
    const [categoryOptions, setCategoryOptions] = useState([])

    const [sale, setSale] = useState({
        saleId: '',
        clientName: '',
        products: [],
        category: [],
        sellingPrice: [],
        cutOffPrice: [],
        quantity: [],
        tax: '',
        warehouse: [],
        remarks: '',
    })

    let constantPart = "009";

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

    function generateSaleId(previousSaleId) {
        let dynamicPart = "00001"; // Default value for the first saleId
    
        if (previousSaleId) {
            // Extract the dynamic part (last 5 digits) from the previous saleId
            const previousDynamicPart = previousSaleId.slice(-5);
            // Convert the dynamic part to a number, increment it by 1, and pad it with leading zeros to make it 5 digits long
            dynamicPart = String(Number(previousDynamicPart) + 1).padStart(5, '0');
        }
    
        // Concatenate the constant part and dynamic part to generate the saleId
        return constantPart + dynamicPart;
    }
    
    // Example usage:
    
    // If the previous saleId exists:
    const previousSaleId = "00900002";
    const newSaleId = generateSaleId(previousSaleId);
    // console.log(newSaleId); // Output: 00900003
    
    // If the previous saleId doesn't exist (for the first sale):
    const newSaleIdForFirstSale = generateSaleId();
    // console.log(newSaleIdForFirstSale); // Output: 00900001

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