
import { useState, useEffect } from 'react'
import { useCategoryFunctions } from '../settings/useCategoryFunctions'
import { useUOMFunctions } from '../settings/useUOMFunctions'

export const useProductFunctions = () => {

    const { categories } = useCategoryFunctions()
    const { uoms } = useUOMFunctions()
    
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [uomOptions, setUomOptions] = useState([]);

    const [product, setProduct] = useState({
        name: '',
        sku: '',
        category: '',
        purchaseCost: '',
        sellingPrice: '',
        cutOffPrice: '',
        uom: '',
        tax: '',
        description: '',
    });

    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }
    
    const handleChangeVariant = (id, name, value) => {
        setVariants((prevVariants) =>
        prevVariants.map((variant) =>
            variant.id === id
              ? {
                  ...variant,
                  [name]: value,
                }
              : variant
            )
        );
    };
        

    const generateSKU = () => {
        setProduct({ ...product, sku: Math.floor(100000 + Math.random() * 90000000) });
    }

    const createVariant = () => {
        setVariants([...variants, { id: variants.length + 1, name: '', price: '' }]);
    }

    const removeVariant = (id) => {
        setVariants(variants.filter((variant) => variant.id !== id));
    }

    const createImages = () => {
        setImages([...images, { id: images.length + 1, url: '' }]);
    }

    const removeImages = (id) => {
        setImages(images.filter((image) => image.id !== id));
    }

    useEffect(() => {
        
        setCategoryOptions(categories);
        setUomOptions(uoms);
    }, [categories, uoms]);

    return {
        categoryOptions,
        uomOptions,
        product,
        variants,
        images,
        generateSKU,
        handleChange,
        handleChangeVariant,
        createVariant,
        removeVariant,
        createImages,
        removeImages
    }
}