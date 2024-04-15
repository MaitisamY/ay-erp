import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

export function useCategoryFunctions() {

    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const [serverResponse, setServerResponse] = useState(null)
    const [selectedItems, setSelectedItems] = useState([])

    const handleSelection = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const colorVariation = (status, color) => {
        if (status === 1) {
            return color === 'light' ? 'text-green' : 'text-lime-green'
        }
        else {
            return 'text-red'
        }
    }

    const handleChange = (e) => {
        setCategory(e.target.value)
    }

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/get/categories`)

            if (response.data.status === 200) {
                setCategories(response.data.data)
            }
            else {
                setServerResponse(response.data.message)
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/add/category`, { category: category })

            if (response.data.status === 200) {
                fetchCategories()
                setCategory('')

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            }
            else {
                setServerResponse(response.data.message)
                toast.warn(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            }
        } catch (error) {
            setServerResponse(error.message)
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete/category/${id}`)

            if (response.data.status === 200) {
                fetchCategories()

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            }
            else {
                toast.warn(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            }
        } catch (error) {
            toast.error(response.data.message, {
                position: "bottom-right",
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        }
    }

    const handleUpdate = async (id, status) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/update/category/${id}`, { status: status })

            if (response.data.status === 200) {
                fetchCategories()

                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            } else {
                toast.warn(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            }
        } catch (error) {
            toast.error(response.data.message, {
                position: "bottom-right",
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        }
    }

    const handleDeleteMultiple = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/delete/categories`, { data: { ids: selectedItems } })

            if (response.data.status === 200) {
                fetchCategories()

                setCategories([])
                setSelectedItems([])
                toast.success(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            } else {
                toast.warn(response.data.message, {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
            }
        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 6000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return {
        category,
        categories,
        serverResponse,
        selectedItems,
        setSelectedItems,
        handleSelection,
        colorVariation,
        handleChange,
        handleSubmit,
        handleDelete,
        handleUpdate,
        handleDeleteMultiple
    }
}