
import { useState, useEffect } from 'react'
import { useCategoryFunctions } from '../settings/useCategoryFunctions'

export const useProductFunctions = () => {

    const { categories } = useCategoryFunctions()
    const [categoryOptions, setCategoryOptions] = useState([]);

    const [product, setProduct] = useState({
        name: '',
        sku: '',
        category: '',
        purchaseCost: '',
        sellingPrice: '',
        cutOffPrice: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    const generateSKU = () => {
        setProduct({ ...product, sku: Math.floor(100000 + Math.random() * 90000000) });
    }

    useEffect(() => {
        
        setCategoryOptions(categories);
    }, [categories]);

    return {
        categoryOptions,
        product,
        generateSKU,
        handleChange
    }
}